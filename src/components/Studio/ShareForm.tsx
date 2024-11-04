'use client'

import { client } from "@/lib/constants";
import { PosseBridgeDrop, PosseFormShareMetadata, PosseTrait } from "@/lib/types";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { isERC721, setSharedMetadata } from "thirdweb/extensions/erc721";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import { Button, Field, Fieldset, Input, Label, Textarea } from "../base";
import { XUpload } from "../XUpload";

export function ShareMetadataForm({
  drop,
  onOperating,
  onClose,
}: {
  drop: PosseBridgeDrop;
  onOperating: (b: boolean) => void,
  onClose: () => void,
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit: useSubmit, formState: { errors }, watch, reset } = useForm<PosseFormShareMetadata>({
    defaultValues: {
      category: "ERC-721",
      name: "",
      description: "",
      image: "",
    }
  });

  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const activeWalletChain = useActiveWalletChain();
  const { connect } = useConnectModal();
  const [file, setFile] = useState<File | null>(null);
  const [errorFile, setErrorFile] = useState<"none" | "exceed" | "invalid-ext" | "drop-fail" | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (newNFT: PosseFormShareMetadata) => {
    if (isLoading) {
      return;
    }

    if (!account) {
      connect({ client });
      return;
    }

    if (!file) {
      toast.error("please insert the artwork of the NFT");
      return;
    }

    setIsLoading(true);
    onOperating(true);
    if (activeWalletChain?.id !== soneiumMinato.id) {
      await switchChain(soneiumMinato);
    }

    try {

      // register nft to IPFS on server, to setSharedMetadata for Open-Edition via thirdweb
      // first of all, check this contract is a valid NFT Collection.
      const masterContract = getContract({
        chain: soneiumMinato,
        client,
        address: drop.address,
      });
      const is721 = await isERC721({ contract: masterContract });
      // const is1155 = await isERC1155({ contract: masterContract });
      // const isNFTCollection = is1155 || is721;
      const isNFTCollection = is721;

      if (!isNFTCollection) {
        console.error("[YOU TRIED TO SET SHAREDMETADATA TO INVALID COLLECTION]");
        toast.error("You are trying to setting sharedMetadata to an invalid collection.");
        throw new Error("[YOU TRIED TO SET SHAREDMETADATA TO INVALID COLLECTION]");
      }

      // after check collection, then check about user can mint NFT to this collection.
      // TODO:

      const transaction = setSharedMetadata({
        contract: masterContract,
        nft: {
          name: newNFT.name,
          description: newNFT.description,
          image: file,
        }
      });

      const tx = await sendTransaction({ transaction, account });
      const receipt = await waitForReceipt(tx);

      toast.success("Sucessfully changed the shared Metadata");
    } catch (err) {
      console.log("[ERROR ON SETSHARED-METADATA-OF-NFT]", err);
      const error = err as { code: number, message: string };
      if (!!error.code) {
        toast.error(error.message);
      } else {
        toast.error(typeof err === 'string' ? err : "Setting sharedMetadata is failed.");
      }
    }
    setIsLoading(false);
    onOperating(false);
  };

  return (
    <div className="flex flex-col">
      <form
        ref={formRef}
        onSubmit={useSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <Fieldset className="flex flex-col gap-4">
          <Field>
            <Label htmlFor="name" className="block mb-2">Name *</Label>
            <Input
              {...register('name', {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 charaters long",
                }
              })}
              id="name"
              type="text"
              className="px-3 py-1"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </Field>
          <div className="">
            <XUpload
              onFileChange={(file) => {
                if (!file) {
                  setErrorFile("none");
                }
                setFile(file);
              }}
              onError={(err) => {
                setErrorFile(err);
              }}
              isError={!errorFile}
              className="w-full min-w-[80px] min-h-[80px]"
            />
            {errorFile === "none" && <span className="text-white text-md mt-1">Your artwork is missing.</span>}
            {errorFile === "exceed" && <span className="text-white text-md mt-1">Your artwork exceeds 5MB.</span>}
            {errorFile === "invalid-ext" && <span className="text-white text-md mt-1">Your artwork's extension type is invalid.</span>}
          </div>
          <Field>
            <Label htmlFor="description" className="block mb-2">Description</Label>
            <Textarea
              {...register('description')}
              id="description"
              rows={3}
              className="px-3 py-1"
            />
          </Field>
        </Fieldset>
        <div className="flex lg:w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => onClose()}
            disabled={isLoading}
          >
            {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (formRef.current) {
                formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
              }
            }}
            disabled={isLoading}
          >
            {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Set NFT Metadata
          </Button>
        </div>
      </form>
    </div>
  );
}