'use client'

import { client } from "@/lib/constants";
import { PosseBridgeDrop, PosseFormLazyNFT, PosseTrait } from "@/lib/types";
import { lazyMintNFT } from "@/server-actions/lazynft";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { isERC1155, lazyMint as lazyMint1155, nextTokenIdToMint as nextTokenIdToMint1155 } from "thirdweb/extensions/erc1155";
import { isERC721, lazyMint as lazyMint721, nextTokenIdToMint as nextTokenIdToMint721 } from "thirdweb/extensions/erc721";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage";
import toast from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import { Button, Description, Field, Fieldset, Input, Label, Textarea } from "../base";
import { NFTTraitCard, NFTTraitDialog } from "../NFT";
import { XUpload } from "../XUpload";

interface LazyMintNFTProps {
  lazyMintNFT: typeof lazyMintNFT;
  drop: PosseBridgeDrop;
  onOperating: (b: boolean) => void;
  onClose: () => void;
}

export function LazyMintForm(props: LazyMintNFTProps) {

  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit: useSubmit, formState: { errors }, watch, reset } = useForm<PosseFormLazyNFT>({
    defaultValues: {
      collection: props.drop.address,
      tokenId: "",
      category: "ERC-721",
      name: "",
      description: "",
      image: "",
      traits: [],
    }
  });

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
  const router = useRouter();

  const handleSubmit = async (newNFT: PosseFormLazyNFT) => {
    if (isLoading) {
      return;
    }
    
    if (!account) {
      connect({ client });
      return;
    }

    setIsLoading(true);
    props.onOperating(true);
    if (activeWalletChain?.id !== soneiumMinato.id) {
      await switchChain(soneiumMinato);
    }

    let uri = "";
    try {
      // upload image via thirdweb-ipfs, then change it to 
      uri = (!file) ? "" : await upload({ client, files: [file] });
      if (!uri) {
        toast.error("please insert the artwork of the NFT");
        setIsLoading(false);
        props.onOperating(false);
        return;
      }
    } catch (err) {
      toast.error("Uploading icon file for collection is failed.");
      setIsLoading(false);
      props.onOperating(false);
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
        address: props.drop.address,
      });
      const is721 = await isERC721({ contract: masterContract });
      // const is1155 = await isERC1155({ contract: masterContract });
      // const isNFTCollection = is1155 || is721;
      const isNFTCollection = is721;

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

      const transaction = lazyMint721({
        contract: masterContract,
        nfts: [{
          name: newNFT.name,
          description: newNFT.description,
          image: newNFT.image,
          properties: records,
        }]
      });

      const tx = await sendTransaction({ transaction, account });
      const receipt = await waitForReceipt(tx);

      // newNFT.category = !is1155 ? "ERC-721" : "ERC-1155";
      newNFT.category = "ERC-721";

      // newNFT.tokenId = ((!is1155 ?
      //   await nextTokenIdToMint1155({ contract: masterContract }) :
      //   await nextTokenIdToMint721({ contract: masterContract })) - 1n
      // ).toString();
      newNFT.tokenId = ((await nextTokenIdToMint721({ contract: masterContract })) - 1n).toString();

      if (newNFT.image) {
        const url = resolveScheme({
          client,
          uri: newNFT.image,
        });
        newNFT.image = url;
      }

      props.lazyMintNFT(newNFT).then((res) => {
        setIsLoading(false);
        if (!res.error) {
          setErrorFile(null);
          setFile(null);
          reset();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
        props.onOperating(false);
      });
    } catch (err) {
      console.log("[ERROR ON MINT-AN-NFT]", err);
      const error = err as { code: number, message: string };
      if (!!error.code) {
        toast.error(error.message);
      } else {
        toast.error(typeof err === 'string' ? err : "Minting your NFT is failed.");
      }
    }
    setIsLoading(false);
    props.onOperating(false);
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
          <Field>
            <Label as="p" className="block mb-2">Trait</Label>
            <div className="mt-2">
              {!!traits.length && traits.map((trait, i) => (
                <NFTTraitCard
                  key={i}
                  index={i}
                  trait={trait}
                  onEditTraitCard={handleEditTrait}
                  onRemoveTraitCard={handleRemoveTrait}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-2"
              onClick={() => setIsOpenTraitDialog(true)}
            >
              Add trait
            </Button>
          </Field>
        </Fieldset>
        <div className="flex lg:w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => props.onClose()}
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
            {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Lazy Mint
          </Button>
        </div>
      </form>
      <NFTTraitDialog
        isOpen={isOpenTraitDialog}
        index={currentTraitIndex}
        value={currentTraitIndex < 0 ? { type: '', name: '' } : traits[currentTraitIndex]}
        onClose={() => setIsOpenTraitDialog(false)}
        onCreateTrait={handleCreateTrait}
      />
    </div>
  );
}