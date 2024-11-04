import { DEFAULT_PLATFORMFEE_DROP, client } from "@/lib/constants";
import { SUPPORTED_CURRENCIES } from "@/lib/currencies";
import { PosseFormDropMintStage, PosseFormDrop, PosseStageInput } from "@/lib/types";
import { getDateTimeAfter, isValidBigInt } from "@/lib/utils";
import { type deployDrop } from "@/server-actions/drop";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NATIVE_TOKEN_ADDRESS, getContract, sendTransaction } from "thirdweb";
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
  const [dropGroup, setDropGroup] = useState<"LIMITED" | "UNLIMITED">("LIMITED");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedPayToken, setSelectedPayToken] = useState<string[]>(["ETH"]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const { register, handleSubmit: useSubmit, formState: { errors }, setValue, reset } = useForm<PosseFormDrop>({
    defaultValues: {
      group: "LIMITED",
      address: "",
      name: "",
      description: "",
      image: "",
      payToken: ['ETH'],
      owner: "",
      mintStages: [],
    }
  });
  const [errorFile, setErrorFile] = useState<"none" | "exceed" | "invalid-ext" | "drop-fail" | null>(null);

  const [mintStages, setMintStages] = useState<PosseFormDropMintStage[]>([]);
  const [selectedStage, setSelectedStage] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (newDrop: PosseFormDrop) => {
    if (isLoading) {
      return;
    }
    if (!account) {
      connect({ client });
      return;
    }

    if (!["LIMITED", "UNLIMITED"].includes(newDrop.group)) {
      toast.error("The type of Drop is invalid.");
      return;
    }

    setIsLoading(true);

    if (activeWalletChain?.id !== soneiumMinato.id) {
      await switchChain(soneiumMinato);
    }

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

      const deployedContractAddress = newDrop.group === "LIMITED" ?
        await deployERC721Contract({
          chain: soneiumMinato,
          client,
          account: account,
          type: "DropERC721",
          params: {
            name: newDrop.name,
            description: newDrop.description,
            image: newDrop.image,
            platformFeeBps: DEFAULT_PLATFORMFEE_DROP,
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
            image: newDrop.image,
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

      // If he has some mit stages, then set claim
      if (!!newDrop.mintStages.length) {
        const transaction = setClaimConditions({
          contract: getContract({
            address: deployedContractAddress,
            client,
            chain: soneiumMinato,
          }),
          phases: newDrop.mintStages.map((stage) => {
            const conStage: PosseStageInput = {
              // currencyAddress: SUPPORTED_CURRENCIES.filter((currency) => currency.symbol === stage.currency).shift()?.address || "ETH",
              currencyAddress: NATIVE_TOKEN_ADDRESS,
              price: stage.price,
              startTime: new Date(stage.startAt),
            };

            if (isValidBigInt(stage.numberOfItems, true)) {
              conStage.maxClaimableSupply = BigInt(stage.numberOfItems);
            }
            if (isValidBigInt(stage.perlimit, true)) {
              conStage.maxClaimablePerWallet = BigInt(stage.perlimit);
            }
            return conStage;
          }),
        });

        await sendTransaction({ transaction, account });
      }

      props.deployDrop(newDrop)
        .then((res) => {
          setIsLoading(false);
          if (!res.error) {
            toast.success("Your drop is successfully deployed");
            router.push('/studio');
          } else {
            toast.error(res.message);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("[ERROR ON DEPLOY-DROP-FORM]", err);
          toast.error("store information of your drop is failed.");
        });

      fnRefresh();
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
    setDropGroup("LIMITED");
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
    selectedPayToken, setSelectedPayToken,
    isLoading,
    handleSubmit,
    register, useSubmit, errors, setValue, reset, errorFile, setErrorFile, mintStages, setMintStages, selectedStage, setSelectedStage, isOpen, setIsOpen,
  };
}