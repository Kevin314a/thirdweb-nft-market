import { client } from "@/lib/constants";
import { PosseViewContract, PosseFormNFT, PosseTrait } from "@/lib/types";
import { mintNFT } from "@/server-actions/nft";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { isERC1155, mintTo as mintTo1155, nextTokenIdToMint as nextTokenIdToMint1155 } from "thirdweb/extensions/erc1155";
import { isERC721, mintTo as mintTo721, nextTokenIdToMint as nextTokenIdToMint721 } from "thirdweb/extensions/erc721";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage";
import toast from "react-hot-toast";

interface MintNFTProps {
  mintNFT: typeof mintNFT;
  collections: PosseViewContract[];
}

export function useMintNFT(props: MintNFTProps) {
  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const activeWalletChain = useActiveWalletChain();
  const { connect } = useConnectModal();
  const [file, setFile] = useState<File | null>(null);
  const [errorFile, setErrorFile] = useState<"none" | "exceed" | "invalid-ext" | "drop-fail" | null>(null);
  const [traits, setTraits] = useState<PosseTrait[]>([]);
  const [isOpenTraitDialog, setIsOpenTraitDialog] = useState<boolean>(false);
  const [currentTraitIndex, setCurrentTraitIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [mintStatus, setMintStatus] = useState<"idle" | "pending" | "finished" | "error">("idle");
  const [showSupply, setShowSupply] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (newNFT: PosseFormNFT) => {
    if (!account) {
      connect({ client });
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
      if (!uri) {
        toast.error("please insert the artwork of the NFT");
        return;
      }
    } catch (err) {
      toast.error("Uploading icon file for collection is failed.");
      return;
    }

    try {
      // change newNFT with responsed image-uri
      newNFT.image = uri;
      newNFT.traits = traits;

      // register nft to blockchain on server, mint nft via thirdweb
      // first of all, check this contract is a valid NFT Collection.
      const masterContract = getContract({
        chain: soneiumMinato,
        client,
        address: newNFT.collection,
      });
      const is721 = await isERC721({ contract: masterContract });
      const is1155 = await isERC1155({ contract: masterContract });
      const isNFTCollection = is1155 || is721;

      if (!isNFTCollection) {
        console.error("[YOU MINTED AN NFT TO INVALID COLLECTION]");
        toast.error("You are trying to mint an NFT to an invalid collection.");
        throw new Error("[YOU MINTED AN NFT TO INVALID COLLECTION]");
      }

      // after check collection, then check about user can mint NFT to this collection.
      // TODO:

      // Minting NFT to the collection that user selected, via thirdweb-api
      const records = newNFT.traits?.map(trait => ({
        display_type: "string",
        trait_type: trait.type,
        value: trait.name,
      }));

      const transaction = !!is1155 ? mintTo1155({
        contract: masterContract,
        to: account.address,
        supply: BigInt(newNFT.supply || 0),
        nft: {
          name: newNFT.name,
          description: newNFT.description,
          image: newNFT.image,
          // external_url: newNFT.externalLink,
          properties: records,
        }
      }) : mintTo721({
        contract: masterContract,
        to: account.address,
        nft: {
          name: newNFT.name,
          description: newNFT.description,
          image: newNFT.image,
          // external_url: newNFT.externalLink,
          properties: records,
        }
      });

      const tx = await sendTransaction({ transaction, account });
      const receipt = await waitForReceipt(tx);

      newNFT.type = !is1155 ? "ERC-721" : "ERC-1155";

      newNFT.tokenId = ((!is1155 ?
        await nextTokenIdToMint1155({ contract: masterContract }) :
        await nextTokenIdToMint721({ contract: masterContract })) - 1n
      ).toString();

      if (newNFT.image) {
        const url = resolveScheme({
          client,
          uri: newNFT.image,
        });
        newNFT.image = url;
      }

      newNFT.owner = account.address;

      props.mintNFT(newNFT).then((res) => {
        setIsLoading(false);
        if (!res.error) {
          // router.refresh();
          setErrorFile("none");
          setFile(null);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
    } catch (err) {
      console.log("[ERROR ON MINT-AN-NFT]", err);
      const error = err as { code: number, message: string };
      if (!!error.code) {
        toast.error(error.message);
      } else {
        toast.error(typeof err === 'string' ? err : "Minting your NFT is failed.");
      }
      setIsLoading(false);
    }
  };

  const handleCreateTrait = (newTrait: PosseTrait, isEdit: boolean, editIndex: number) => {
    if (!isEdit) {
      setTraits((prevTraits) => [...prevTraits, newTrait]);
    } else {
      setTraits((prevTraits) => [...prevTraits.slice(0, editIndex), newTrait, ...prevTraits.slice(editIndex + 1)]);
    }
    setCurrentTraitIndex(-1);
    setIsOpenTraitDialog(false);
  };

  const handleEditTrait = (index: number) => {
    setCurrentTraitIndex(index);
    setIsOpenTraitDialog(true);
  };

  const handleRemoveTrait = (index: number) => {
    const updatedTraits = [...traits];
    updatedTraits.splice(index, 1);
    setTraits(updatedTraits);

    // unregister(`traits.${index}`);
  };

  return {
    showSupply,
    setShowSupply,
    errorFile,
    setFile,
    setErrorFile,
    traits,
    setTraits,
    isOpenTraitDialog,
    setIsOpenTraitDialog,
    currentTraitIndex,
    isLoading,
    handleSubmit,
    handleCreateTrait,
    handleEditTrait,
    handleRemoveTrait,
  }
}
