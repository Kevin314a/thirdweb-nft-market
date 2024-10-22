'use client'

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { PosseFormContract } from "@/lib/types";
import { client } from "@/lib/constants";
import { type deployContract } from "@/server-actions/contract";
import { Button, Description, Field, Fieldset, Input, Label, Radio, RadioGroup, Textarea } from "../base";
import { XUpload } from "../XUpload";
import { ContractTraitCard, ContractTraitDialog } from ".";
import { LuLoader2 } from "react-icons/lu";
import { MdCheckCircleOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import { soneiumMinato } from "thirdweb/chains";
import { useActiveAccount, useConnectModal } from "thirdweb/react";
import { resolveScheme, upload } from "thirdweb/storage";
import { deployERC1155Contract, deployERC721Contract } from "thirdweb/deploys";
import toast from "react-hot-toast";

export const ContractForm = (props: { deployContract: typeof deployContract }) => {
  const account = useActiveAccount();
  const { connect } = useConnectModal();
  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit: useSubmit, setValue, formState: { errors }, reset, unregister } = useForm<PosseFormContract>();
  const [contractType, setContractType] = useState<"ERC-721" | "ERC-1155">("ERC-721");
  const [file, setFile] = useState<File | null>(null);
  const [errorFile, setErrorFile] = useState<"none" | "exceed" | "invalid-ext" | null>(null);
  const [traitTypes, setTraitTypes] = useState<string[]>([]);
  const [isOpenTraitDialog, setIsOpenTraitDialog] = useState<boolean>(false);
  const [currentTraitIndex, setCurrentTraitIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onContractTypeChange = (type: "ERC-721" | "ERC-1155") => {
    setContractType(type);
    setValue('type', type);
  }

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

    let uri = "";
    try {
      // upload image via thirdweb-ipfs, then change it to 
      uri = (!file) ? "" : await upload({ client, files: [file] });
      // if (!uri) {
      //   // TODO: toast error, user must input a logo image for contract
      //   return;
      // }
    } catch (err) {
      // TODO: toast error, with uploading
      toast.error("Uploading icon file for collection is failed.");
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
            platformFeeBps: BigInt(newCollection.platformFeeBps || 0),
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
            platformFeeBps: BigInt(newCollection.platformFeeBps || 0),
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
      setIsLoading(false);
      toast.error("creating a collection is failed.");
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
  }

  const handleEditTraitType = (index: number) => {
    setCurrentTraitIndex(index);
    setIsOpenTraitDialog(true);
  }

  const handleRemoveTraitType = (index: number) => {
    const updatedTraits = [...traitTypes];
    updatedTraits.splice(index, 1);
    setTraitTypes(updatedTraits);

    // unregister(`traitTypes.${index}`);
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
            <Label as="p" className="block text-sm font-medium">Select the type of your Contract:</Label>
            <RadioGroup value={contractType} onChange={onContractTypeChange}>
              <div className="mt-4 flex flex-row items-center gap-2">
                <Radio
                  value={"ERC-721"}
                  className={({ checked }) =>
                    `${checked ? 'bg-golden-1300 text-white' : 'bg-golden-1400 text-gray'
                    } w-full relative rounded-lg shadow-md px-5 py-2 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className={checked ? 'text-white font-medium' : 'text-gray-900 font-medium'}>ERC-721</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-white">
                        {checked && <MdCheckCircleOutline className="w-6 h-6" />}
                      </div>
                    </div>
                  )}
                </Radio>
                <Radio
                  value={"ERC-1155"}
                  className={({ checked }) =>
                    `${checked ? 'bg-golden-1300 text-white' : 'bg-golden-1400 text-gray'
                    } w-full relative rounded-lg shadow-md px-5 py-2 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className={checked ? 'text-white font-medium' : 'text-gray-900 font-medium'}>ERC-1155</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-white">
                        {checked && <MdCheckCircleOutline className="w-6 h-6" />}
                      </div>
                    </div>
                  )}
                </Radio>
              </div>
            </RadioGroup>
            <input
              {...register('type', { required: 'Please select a type of the smart contract.' })}
              id="type"
              type="hidden"
              value={contractType}
            />
            {errors.type && <span className="text-red-500">{errors.type.message}</span>}
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
            <Label htmlFor="symbol" className="block mb-2">Token symbol *</Label>
            <Input
              {...register('symbol', {
                required: "MCU is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 charaters long",
                }
              })}
              id="symbol"
              type="text"
              className="px-3 py-1 min-w-[25vw]"
            />
            {errors.symbol && (
              <p className="mt-1 text-xs text-red-600">{errors.symbol.message}</p>
            )}
          </Field>
          <Field>
            <Label htmlFor="royaltyBps" className="block mb-2">Roylaties</Label>
            <Input
              {...register('royaltyBps', {
                min: {
                  value: 0,
                  message: "royalties is between 0.0% ~ 100.0%",
                },
                max: {
                  value: 100.0,
                  message: "royalties is between 0.0% ~ 100.0%",
                }
              })}
              id="royaltyBps"
              type="number"
              className="px-3 py-1 min-w-[25vw]"
            />
            {errors.royaltyBps && (
              <p className="mt-1 text-xs text-red-600">{errors.royaltyBps.message}</p>
            )}
          </Field>
          <Field>
            <Label htmlFor="platformFeeBps" className="block mb-2">Platform Fee</Label>
            <Input
              {...register('platformFeeBps', {
                min: {
                  value: 0,
                  message: "platform fee is between 0.0% ~ 100.0%",
                },
                max: {
                  value: 100.0,
                  message: "platform fee is between 0.0% ~ 100.0%",
                }
              })}
              id="platformFeeBps"
              type="number"
              className="px-3 py-1 min-w-[25vw]"
            />
            {errors.platformFeeBps && (
              <p className="mt-1 text-xs text-red-600">{errors.platformFeeBps.message}</p>
            )}
          </Field>
          <Field>
            <Label as="p" className="block mb-2">Trait Type</Label>
            <Description id="traitd" className="text-golden-1000 text-xs">You can set the default types of traits before the NFTs are minted here.</Description>
            <div className="mt-2">
              {!!traitTypes.length && traitTypes.map((trait, i) => (
                <ContractTraitCard
                  key={i}
                  index={i}
                  traitType={trait}
                  onEditTraitType={handleEditTraitType}
                  onRemoveTraitType={handleRemoveTraitType}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-2"
              onClick={() => setIsOpenTraitDialog(true)}
            >
              Add Trait Type
            </Button>
          </Field>
        </Fieldset>
      </form>
      <div className="h-[80px]"> </div>
      <ContractTraitDialog
        isOpen={isOpenTraitDialog}
        index={currentTraitIndex}
        type={currentTraitIndex < 0 ? "" : traitTypes[currentTraitIndex]}
        onClose={() => setIsOpenTraitDialog(false)}
        onCreateTraitType={handleCreateTraitType}
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
              {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Deploy a Collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}