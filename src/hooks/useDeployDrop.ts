import { useState } from "react";
import { PosseFormDrop } from "@/lib/types";
import { client } from "@/lib/constants";
import { type deployDrop } from "@/server-actions/drop";
import { useRouter } from "next/navigation";
import { soneiumMinato } from "thirdweb/chains";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage";
import { deployERC721Contract } from "thirdweb/deploys";
import toast from "react-hot-toast";

interface DeployDropProps {
  deployDrop: typeof deployDrop
}

export function useDeployDrop(props: DeployDropProps) {

  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const activeWalletChain = useActiveWalletChain();
  const { connect } = useConnectModal();
  const [file, setFile] = useState<File | null>(null);
  const [dropType, setDropType] = useState<"limited" | "unlimited">("unlimited");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedPayToken, setSelectedPayToken] = useState<string[]>(["ETH"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (newDrop: PosseFormDrop) => {
    if (!account) {
      connect({ client });
      return;
    }

    if (!["limited", "unlimited"].includes(newDrop.type)) {
      toast.error("The type of Drop is invalid.");
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
      toast.error("Uploading icon file for your drop is failed.");
      return;
    }

    try {

      newDrop.image = uri;

      // deploy collection to blockchain on server  via thirdweb
      const deployedContractAddress = newDrop.type === "limited" ?
        await deployERC721Contract({
          chain: soneiumMinato,
          client,
          account: account,
          type: "DropERC721",
          params: {
            name: newDrop.name,
            description: newDrop.description,
            // payToken: newDrop.payToken,
          },
        })
        :
        await deployERC721Contract({
          chain: soneiumMinato,
          client,
          account: account,
          type: "OpenEditionERC721",
          params: {
            name: newDrop.name,
            description: newDrop.description,
            // payToken: newDrop.payToken,
          },
        });

      newDrop.address = deployedContractAddress;
      newDrop.owner = account.address;

      if (!!newDrop.image) {
        const url = resolveScheme({
          client,
          uri: newDrop.image,
        });
        newDrop.image = url;
      }

      props.deployDrop(newDrop)
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
          console.log("[ERROR ON DEPLOY-DROP-FORM]", err);
          setIsLoading(false);
          // TODO: toast error
          toast.error("store information of your drop is failed.");
        });

    } catch (err) {
      console.log("[ERROR ON DEPLOY-DROP]", err);
      const error = err as { code: number, message: string };
      if (!!error.code) {
        toast.error(error.message);
      } else {
        toast.error(typeof err === 'string' ? err : "Deploying a DROP is failed.");
      }
      setIsLoading(false);
    }
  };

  return {
    account,
    setFile,
    dropType, setDropType,
    selectedDate, setSelectedDate,
    selectedPayToken, setSelectedPayToken,
    isLoading,
    handleSubmit,
  };
}