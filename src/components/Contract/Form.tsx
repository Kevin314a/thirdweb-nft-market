'use client'

import { PosseFormContract } from "@/lib/types";
import { useDeployContract } from "@/hooks/useDeployContract";
import { type deployContract } from "@/server-actions/contract";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { LuLoader2 } from "react-icons/lu";
import { MdCheckCircleOutline } from "react-icons/md";
import { Button, Description, Field, Fieldset, Input, Label, Radio, RadioGroup, Textarea } from "../base";
import { XUpload } from "../XUpload";
import { ContractTraitCard, ContractTraitDialog } from ".";

export const ContractForm = (props: { deployContract: typeof deployContract }) => {

  const formRef = useRef<HTMLFormElement | null>(null);
  const { traitTypes, setFile, isOpenTraitDialog, currentTraitIndex, isLoading, handleSubmit,
    handleCreateTraitType, handleEditTraitType, handleRemoveTraitType, setIsOpenTraitDialog } = useDeployContract(props);
  const { register, handleSubmit: useSubmit, setValue, formState: { errors }, reset, unregister } = useForm<PosseFormContract>();
  const [errorFile, setErrorFile] = useState<"none" | "exceed" | "invalid-ext" | "drop-fail" | null>(null);
  const [category, setCategory] = useState<"ERC-721" | "ERC-1155">("ERC-721");

  const onCategoryChange = (category: "ERC-721" | "ERC-1155") => {
    setCategory(category);
    setValue('category', category);
  };

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
          {errorFile === "exceed" && <span className="text-md mt-1 w-full text-right">Your artwork exceeds 5MB.</span>}
          {errorFile === "invalid-ext" && <span className="text-md mt-1 w-full text-right">Your artwork's extension type is invalid.</span>}
        </div>
        <Fieldset className="space-y-8 md:w-1/2">
          <Field>
            <Label as="p" className="block text-sm font-medium">Select the type of your Contract:</Label>
            <RadioGroup value={category} onChange={onCategoryChange}>
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
                {/* <Radio
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
                </Radio> */}
              </div>
            </RadioGroup>
            <input
              {...register('category', { required: 'Please select a type of the smart contract.' })}
              id="category"
              type="hidden"
              value={category}
            />
            {errors.category && <span className="text-red-500">{errors.category.message}</span>}
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
            <Label htmlFor="description" className="block mb-2">Description</Label>
            <Textarea
              {...register('description')}
              id="description"
              rows={3}
              className="px-3 py-1 min-w-[25vw]"
            />
          </Field>
          <Field>
            <Label htmlFor="royaltyBps" className="block mb-2">Roylaties</Label>
            <Input
              {...register('royaltyBps', {
                min: {
                  value: 0,
                  message: "royalties is between 0.0% ~ 10.0%",
                },
                max: {
                  value: 10.0,
                  message: "royalties is between 0.0% ~ 10.0%",
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
          {/* <Field>
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
          </Field> */}
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
              {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Deploy a Collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}