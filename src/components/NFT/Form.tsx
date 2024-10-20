'use client'

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { client } from "@/lib/constants";
import { PosseDBContract, PosseDBNFT, PossePreContract, PosseTrait } from "@/lib/types";
import { createNFT } from "@/server-actions/nft";
import { Button, Description, Field, Fieldset, Input, Label, Textarea } from "../base";
import { ContractSelect } from "../Contract";
import { XUpload } from "../XUpload";
import { NFTTraitCard, NFTTraitDialog } from ".";
import { LuLoader2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useActiveAccount, useConnectModal } from "thirdweb/react";
import JSONbig from "json-bigint";

export const NFTForm = (props: { createNFT: typeof createNFT, collections: string }) => {
  const account = useActiveAccount();
  const { connect } = useConnectModal();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit: useSubmit, formState: { errors }, reset, unregister } = useForm<PosseDBNFT>();
  const [file, setFile] = useState<File | null>(null);
  const [errorFile, setErrorFile] = useState<"none" | "exceed" | null>(null);
  const [traits, setTraits] = useState<PosseTrait[]>([]);
  const [isOpenTraitDialog, setIsOpenTraitDialog] = useState<boolean>(false);
  const [currentTraitIndex, setCurrentTraitIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mintStatus, setMintStatus] = useState<"idle" | "pending" | "finished" | "error">("idle");
  const router = useRouter();

  const handleSubmit = (newNFT: PosseDBNFT) => {
    if (!account) {
      connect({ client });
      return;
    }

    setIsLoading(true);

    let uri = "";
    // try {
    //   // upload image via thirdweb-ipfs, then change it to 
    //   uri = (!file) ? "" : await upload({ client, files: [file] });
    //   if (!uri) {
    //     // TODO: toast error, user must input a logo image for contract
    //     return;
    //   }
    // } catch (err) {
    //   // TODO: toast error, with uploading
    //   return;
    // }

    // change newNFT with responsed image-uri
    newNFT.image = uri;
    newNFT.traits = traits;

    // register nft to blockchain on server
    props.createNFT(newNFT, JSONbig.stringify(account)).then((res) => {
      setIsLoading(false);
      if (!res.error) {
        router.refresh();
        // TODO: toast an error to minting nft.
      }

      // TODO: toast mint an nft successfully.
      // toast({
      //   title: res.message,
      //   description: res.action,
      // });
    });
  };

  const handleCreateTrait = (newTrait: PosseTrait, isEdit: boolean, editIndex: number) => {
    if (!isEdit) {
      setTraits((prevTraits) => [...prevTraits, newTrait]);
    } else {
      setTraits((prevTraits) => [...prevTraits.slice(0, editIndex), newTrait, ...prevTraits.slice(editIndex + 1)]);
    }
    setCurrentTraitIndex(-1);
    setIsOpenTraitDialog(false);
  }

  const handleEditTrait = (index: number) => {
    setCurrentTraitIndex(index);
    setIsOpenTraitDialog(true);
  }

  const handleRemoveTrait = (index: number) => {
    const updatedTraits = [...traits];
    updatedTraits.splice(index, 1);
    setTraits(updatedTraits);

    // unregister(`traits.${index}`);
  }

  const collectionsFromDB: PosseDBContract[] = JSONbig.parse(props.collections);

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
          {errorFile === "none" && <span className="text-md mt-1 w-full text-right">Your artwork is missing.</span>}
          {errorFile === "exceed" && <span className="text-md mt-1 w-full text-right">Your artwork exceeds 500KB.</span>}
        </div>
        <Fieldset className="space-y-8 md:w-1/2">
          <Field>
            <Label as="p" className="block mb-2">Collection *</Label>
            <ContractSelect
              {...register('collection', { required: "Please select a collection" })}
              name="collection"
              items={collectionsFromDB.map(collect => {
                const temp: PossePreContract = {
                  type: collect.type,
                  address: collect.address || "",
                  name: collect.name,
                  description: collect.description,
                  image: collect.image,
                };
                return temp;
              }).filter(collect => !!collect.address)}
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
          <Field>
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
                  } finally {
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
          <Field>
            <Label htmlFor="description" className="block mb-2">Description</Label>
            <Textarea
              {...register('description')}
              id="description"
              rows={3}
              className="px-3 py-1 min-w-[25vw]"
            />
          </Field>
          <Field>
            <Label htmlFor="externalLink" className="block mb-2">External link</Label>
            <Input
              {...register('externalLink')}
              id="externalLink"
              type="text"
              className="px-3 py-1 min-w-[25vw]"
            />
          </Field>
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
      <div className="fixed py-2.5 w-full z-50 bottom-0 start-0 bg-black/[30%]">
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
              {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}