import { DEFAULT_PLATFORMFEE, client } from "@/lib/constants";
import { SUPPORTED_CURRENCIES } from "@/lib/currencies";
import { PosseDropMintStage, PosseFormDrop } from "@/lib/types";
import { getDateTimeAfter } from "@/lib/utils";
import { type deployDrop } from "@/server-actions/drop";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getContract, sendTransaction } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage";
import { deployERC721Contract } from "thirdweb/deploys";
import { setClaimConditions } from "thirdweb/extensions/erc721";
import toast from "react-hot-toast";

interface DeployDropProps {
  deployDrop: typeof deployDrop
};

export function useDeployDrop(props: DeployDropProps) {

  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const activeWalletChain = useActiveWalletChain();
  const { connect } = useConnectModal();
  const [file, setFile] = useState<File | null>(null);
  const [dropGroup, setDropGroup] = useState<"limited" | "unlimited">("limited");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedPayToken, setSelectedPayToken] = useState<string[]>(["ETH"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { register, handleSubmit: useSubmit, formState: { errors }, setValue, reset } = useForm<PosseFormDrop>({
    defaultValues: {
      group: "limited",
      address: "",
      name: "",
      description: "",
      image: "",
      payToken: ['ETH'],
      numberOfItems: 0,
      mintStartAt: (new Date()).toISOString(),
      owner: "",
      mintStages: [],
    }
  });
  const [errorFile, setErrorFile] = useState<"none" | "exceed" | "invalid-ext" | "drop-fail" | null>(null);

  const [mintStages, setMintStages] = useState<PosseDropMintStage[]>([]);
  const [selectedStage, setSelectedStage] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (newDrop: PosseFormDrop) => {
    if (!account) {
      connect({ client });
      return;
    }

    if (!["limited", "unlimited"].includes(newDrop.group)) {
      toast.error("The type of Drop is invalid.");
      return;
    }

    setIsLoading(true);

    if (activeWalletChain?.id !== soneiumMinato.id) {
      await switchChain(soneiumMinato);
    }

    console.log('zzzzzzzzzzzzzzzzzzzzz', newDrop);

    try {

      let uri = "";
      try {
        // upload image via thirdweb-ipfs, then change it to 
        uri = (!file) ? "" : await upload({ client, files: [file] });
      } catch (err) {
        toast.error("Uploading icon file for your drop is failed.");
        setIsLoading(false);
        return;
      }
      newDrop.image = uri;

      const deployedContractAddress = newDrop.group === "limited" ?
        await deployERC721Contract({
          chain: soneiumMinato,
          client,
          account: account,
          type: "DropERC721",
          params: {
            name: newDrop.name,
            description: newDrop.description,
            contractURI: newDrop.image,
            platformFeeBps: DEFAULT_PLATFORMFEE,
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
            contractURI: newDrop.image,
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

          if (!res.error) {
            // toast.success(res.message);
            // router.back();
            // setTimeout(() => {
            //   router.refresh(); // This forces the current page to re-render
            // }, 100);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          console.log("[ERROR ON DEPLOY-DROP-FORM]", err);
          toast.error("store information of your drop is failed.");
        });

      // If he has some mit stages, then set claim
      if (!!newDrop.mintStages.length) {
        const transaction = setClaimConditions({
          contract: getContract({
            address: deployedContractAddress,
            client,
            chain: soneiumMinato,
          }),
          phases: newDrop.mintStages.map((stage) => ({
            maxClaimableSupply: BigInt(newDrop.numberOfItems || 100n),
            maxClaimablePerWallet: BigInt(stage.perlimit || 1n),
            currencyAddress: SUPPORTED_CURRENCIES.filter((currency) => currency.symbol === stage.currency).shift()?.address || "ETH",
            price: stage.price,
            startTime: getDateTimeAfter(new Date(newDrop.mintStartAt), stage.durationd, stage.durationh, stage.durationm),
          })),

        });

        await sendTransaction({ transaction, account });
      }

      toast.success("Your drop is successfully deployed");

      fnRefresh();
      setIsLoading(false);
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

  const fnRefresh = () => {
    reset();
    setSelectedDate(new Date());
    setDropGroup("limited");
    setSelectedPayToken(["ETH"]);
    setErrorFile(null);
    setFile(null);
    setMintStages([]);
    setSelectedStage(-1);
  };

  return {
    account,
    setFile,
    dropGroup, setDropGroup,
    selectedDate, setSelectedDate,
    selectedPayToken, setSelectedPayToken,
    isLoading,
    handleSubmit,
    register, useSubmit, errors, setValue, reset, errorFile, setErrorFile, mintStages, setMintStages, selectedStage, setSelectedStage, isOpen, setIsOpen,
  };
}