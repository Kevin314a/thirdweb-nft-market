'use client'

import { useMintNFT } from "@/hooks/useMintNFT";
import { PosseViewContract, PosseFormNFT } from "@/lib/types";
import { mintNFT } from "@/server-actions/nft";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LuLoader2 } from "react-icons/lu";
import { Button, Description, Field, Fieldset, Input, Label, Textarea } from "../base";
import { ContractSelect } from "../Contract";
import { XUpload } from "../XUpload";
import { NFTTraitCard, NFTTraitDialog } from ".";

export const NFTForm = (props: { mintNFT: typeof mintNFT, collections: PosseViewContract[] }) => {

  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit: useSubmit, formState: { errors }, watch, reset } = useForm<PosseFormNFT>({
    // defaultValues: {
    //   collection: props.collections[0]?.address,
    // }
  });
  const { showSupply, setShowSupply, errorFile, setFile, setErrorFile, traits, setTraits, isOpenTraitDialog, setIsOpenTraitDialog,
    currentTraitIndex, isLoading, handleSubmit, handleCreateTrait, handleEditTrait, handleRemoveTrait } = useMintNFT(props);

  const selectedContract = watch('collection');

  useEffect(() => {
    const current = props.collections.filter(col => col.address === selectedContract);
    if (current[0]?.type === "ERC-721") {
      setShowSupply(false);
    } else {
      setShowSupply(true);
    }
    setTraits(current[0]?.traitTypes?.map(tt => ({
      type: tt,
      name: "",
    })) ?? []);

  }, [selectedContract]);

  useEffect(() => {
    reset({ collection: props.collections[0]?.address });
  }, [reset]);

  return (
    <div className="w-full flex flex-col justify-between items-center">
      <form
        ref={formRef}
        onSubmit={useSubmit(handleSubmit)}
        className="flex flex-col gap-6 sm:gap-12 md:flex-row"
      >
        <div className="space-y-5 md:w-1/2">
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
          />
          {errorFile === "none" && <span className="text-white text-md mt-1">Your artwork is missing.</span>}
          {errorFile === "exceed" && <span className="text-white text-md mt-1">Your artwork exceeds 5MB.</span>}
          {errorFile === "invalid-ext" && <span className="text-white text-md mt-1">Your artwork's extension type is invalid.</span>}
        </div>
        <Fieldset className="space-y-8 md:w-1/2">
          <Field>
            <Label as="p" className="block mb-2">Collection *</Label>
            <ContractSelect
              {...register('collection', { required: "Please select a collection" })}
              name="collection"
              defaultValue={props.collections[0]?.address ?? ""}
              items={props.collections}
            />
            {errors.collection && (
              <p className="mt-1 text-xs text-red-600">{errors.collection.message}</p>
            )}
          </Field>
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
              className="px-3 py-1 min-w-[25vw]"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </Field>
          {showSupply && (<Field>
            <Label htmlFor="supply" className="block mb-2">Supply *</Label>
            <Input
              {...register('supply', {
                required: "Supply is required",
                validate: (value) => {
                  try {
                    const biValue = BigInt(value || 0);
                    if (biValue.toString().length === String(value).length) {
                      return true;
                    }
                  } catch (err) {
                    return "Supply is invalid";
                  }
                },
              })}
              id="supply"
              type="text"
              className="px-3 py-1 min-w-[25vw]"
            />
            {errors.supply && (
              <p className="mt-1 text-xs text-red-600">{errors.supply.message}</p>
            )}
          </Field>
          )}
          <Field>
            <Label htmlFor="description" className="block mb-2">Description</Label>
            <Textarea
              {...register('description')}
              id="description"
              rows={3}
              className="px-3 py-1 min-w-[25vw]"
            />
          </Field>
          {/* <Field>
            <Label htmlFor="externalLink" className="block mb-2">External link</Label>
            <Input
              {...register('externalLink')}
              id="externalLink"
              type="text"
              className="px-3 py-1 min-w-[25vw]"
            />
          </Field> */}
          <Field>
            <Label as="p" className="block mb-2">Trait</Label>
            <Description className="text-golden-1000 text-xs">Traits describe attributes of your item. They appear as filters inside your collection page and are also listed out inside your item page.</Description>
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
      </form>
      <div className="h-[80px]"> </div>
      <NFTTraitDialog
        isOpen={isOpenTraitDialog}
        index={currentTraitIndex}
        value={currentTraitIndex < 0 ? { type: '', name: '' } : traits[currentTraitIndex]}
        onClose={() => setIsOpenTraitDialog(false)}
        onCreateTrait={handleCreateTrait}
      />
      <div className="fixed py-2.5 w-[100vw] z-50 bottom-0 start-0 bg-black/[30%]">
        <div className="max-w-[1920px] flex items-center justify-between mx-auto xl:px-10 px-5 h-[64px]">
          <div className="flex lg:w-full items-center justify-end">
            <Button
              type="button"
              onClick={() => {
                if (formRef.current) {
                  formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                }
              }}
              disabled={isLoading}
            >
              {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Mint an NFT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}