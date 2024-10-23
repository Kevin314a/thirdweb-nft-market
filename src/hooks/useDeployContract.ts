import { useState } from "react";
import { PosseFormContract } from "@/lib/types";
import { client } from "@/lib/constants";
import { type deployContract } from "@/server-actions/contract";
import { useRouter } from "next/navigation";
import { soneiumMinato } from "thirdweb/chains";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage";
import { deployERC1155Contract, deployERC721Contract } from "thirdweb/deploys";
import toast from "react-hot-toast";

interface DeployContractProps {
  deployContract: typeof deployContract
}

export function useDeployContract(props: DeployContractProps) {

  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const activeWalletChain = useActiveWalletChain();
  const { connect } = useConnectModal();
  const [file, setFile] = useState<File | null>(null);
  const [traitTypes, setTraitTypes] = useState<string[]>([]);
  const [isOpenTraitDialog, setIsOpenTraitDialog] = useState<boolean>(false);
  const [currentTraitIndex, setCurrentTraitIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (newCollection: PosseFormContract) => {
    if (!account) {
      connect({ client });
      return;
    }

    if (!["ERC-1155", "ERC-721"].includes(newCollection.type)) {
      toast.error("The type of Contract is invalid.");
      return;
    }

    setIsLoading(true);

    if (activeWalletChain?.id !== soneiumMinato.id) {
      await switchChain(soneiumMinato);
    }
    
    let uri = "";
    try {
      // upload image via thirdweb-ipfs, then change it to 
      uri = (!file) ? "" : await upload({ client, files: [file] });
      // collection might has no icon
      // if (!uri) {
      //   return;
      // }
    } catch (err) {
      toast.error("Uploading icon file for your collection is failed.");
      return;
    }

    try {

      newCollection.image = uri;
      newCollection.traitTypes = traitTypes;

      // deploy collection to blockchain on server  via thirdweb
      const deployedContractAddress = newCollection.type === "ERC-1155" ?
        await deployERC1155Contract({
          chain: soneiumMinato,
          client,
          account: account,
          type: "TokenERC1155",
          params: {
            name: newCollection.name,
            symbol: newCollection.symbol,
            description: newCollection.description,
            // platformFeeBps: BigInt(newCollection.platformFeeBps || 0),
            royaltyBps: BigInt(newCollection.royaltyBps || 0),
          },
        })
        :
        await deployERC721Contract({
          chain: soneiumMinato,
          client,
          account: account,
          type: "TokenERC721",
          params: {
            name: newCollection.name,
            symbol: newCollection.symbol,
            description: newCollection.description,
            // platformFeeBps: BigInt(newCollection.platformFeeBps || 0),
            royaltyBps: BigInt(newCollection.royaltyBps || 0),
          },
        });

      newCollection.address = deployedContractAddress;
      newCollection.owner = account.address;

      if (!!newCollection.image) {
        const url = resolveScheme({
          client,
          uri: newCollection.image,
        });
        newCollection.image = url;
      }

      props.deployContract(newCollection)
        .then((res) => {

          setIsLoading(false);
          if (!res.error) {
            // TODO: show succesfully deploy toast
            toast.success(res.message);
            router.back();
            setTimeout(() => {
              router.refresh(); // This forces the current page to re-render
            }, 100);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log("[ERROR ON DEPLOY-CONTRACT-FORM]", err);
          setIsLoading(false);
          // TODO: toast error
          toast.error("store information of your collection is failed.");
        });

    } catch (err) {
      console.log("[ERROR ON DEPLOY-CONTRACT]", err);
      const error = err as { code: number, message: string };
      if (!!error.code) {
        toast.error(error.message);
      } else {
        toast.error(typeof err === 'string' ? err : "Deploying a collection is failed.");
      }
      setIsLoading(false);
    }
  };

  const handleCreateTraitType = (newTraitType: string, isEdit: boolean, editIndex: number) => {
    if (!isEdit) {
      setTraitTypes((prevTraits) => [...prevTraits, newTraitType]);
    } else {
      setTraitTypes((prevTraits) => [...prevTraits.slice(0, editIndex), newTraitType, ...prevTraits.slice(editIndex + 1)]);
    }
    setCurrentTraitIndex(-1);
    setIsOpenTraitDialog(false);
  };

  const handleEditTraitType = (index: number) => {
    setCurrentTraitIndex(index);
    setIsOpenTraitDialog(true);
  };

  const handleRemoveTraitType = (index: number) => {
    const updatedTraits = [...traitTypes];
    updatedTraits.splice(index, 1);
    setTraitTypes(updatedTraits);

    // unregister(`traitTypes.${index}`);
  };

  return {
    traitTypes,
    setFile,
    isOpenTraitDialog,
    currentTraitIndex,
    isLoading,
    handleSubmit,
    handleCreateTraitType,
    handleEditTraitType,
    handleRemoveTraitType,
    setIsOpenTraitDialog,
  };
}