'use client'

import { useState, useRef, useEffect } from "react";
import { client } from "@/lib/constants";
import { PosseDBContract, PosseDBNFT, PossePreContract, PosseTrait } from "@/lib/types";
import { createNFT } from "@/server-actions/nft";
import { Button, Description, Field, Fieldset, Input, Label, Textarea } from "../base";
import { ContractSelect } from "../Contract";
import { XUpload } from "../XUpload";
import { NFTTraitCard, NFTTraitDialog } from ".";
import { useForm } from "react-hook-form";
import { LuLoader2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { isERC1155, mintTo as mintTo1155, nextTokenIdToMint as nextTokenIdToMint1155 } from "thirdweb/extensions/erc1155";
import { isERC721, mintTo as mintTo721, nextTokenIdToMint as nextTokenIdToMint721 } from "thirdweb/extensions/erc721";
import { useActiveAccount, useConnectModal } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage";
import toast from "react-hot-toast";

export const NFTForm = (props: { createNFT: typeof createNFT, collections: PosseDBContract[] }) => {
  const account = useActiveAccount();
  const { connect } = useConnectModal();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit: useSubmit, formState: { errors }, watch, reset, unregister } = useForm<PosseDBNFT>({
    defaultValues: {
      collection: props.collections[0]?.address,
    }
  });
  const [file, setFile] = useState<File | null>(null);
  const [errorFile, setErrorFile] = useState<"none" | "exceed" | "invalid-ext" | null>(null);
  const [traits, setTraits] = useState<PosseTrait[]>([]);
  const [isOpenTraitDialog, setIsOpenTraitDialog] = useState<boolean>(false);
  const [currentTraitIndex, setCurrentTraitIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mintStatus, setMintStatus] = useState<"idle" | "pending" | "finished" | "error">("idle");
  const router = useRouter();

  const [showSupply, setShowSupply] = useState<boolean>(false);
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

  const handleSubmit = async (newNFT: PosseDBNFT) => {
    if (!account) {
      connect({ client });
      return;
    }

    setIsLoading(true);

    let uri = "";
    try {
      // upload image via thirdweb-ipfs, then change it to 
      uri = (!file) ? "" : await upload({ client, files: [file] });
      if (!uri) {
        // TODO: toast error, user must input a logo image for contract
        toast.error("please insert the artwork of the NFT");
        return;
      }
    } catch (err) {
      // TODO: toast error, with uploading
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
          external_url: newNFT.externalLink,
          properties: records,
        }
      }) : mintTo721({
        contract: masterContract,
        to: account.address,
        nft: {
          name: newNFT.name,
          description: newNFT.description,
          image: newNFT.image,
          external_url: newNFT.externalLink,
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

      // const toDBNFT = newNFT;
      if (newNFT.image) {
        const url = resolveScheme({
          client,
          uri: newNFT.image,
        });
        newNFT.image = url;
      }

      props.createNFT(newNFT).then((res) => {
        setIsLoading(false);
        if (!res.error) {
          router.refresh();
          // TODO: toast an error to minting nft.
          toast.success(res.message);

          reset();
        } else {
          toast.error(res.message);
        }
      });
    } catch (err) {
      console.log("[ERROR ON MINT-AN-NFT]", err);
      setIsLoading(false);
      toast.error("Minting your NFT is failed.");
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
          {errorFile === "invalid-ext" && <span className="text-md mt-1 w-full text-right">Your artwork's extension type is invalid.</span>}
        </div>
        <Fieldset className="space-y-8 md:w-1/2">
          <Field>
            <Label as="p" className="block mb-2">Collection *</Label>
            <ContractSelect
              {...register('collection', { required: "Please select a collection" })}
              name="collection"
              defaultValue={props.collections[0]?.address ?? ""}
              items={props.collections.map(collect => {
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
              {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Mint an NFT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}