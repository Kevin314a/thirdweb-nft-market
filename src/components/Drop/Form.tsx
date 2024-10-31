'use client'

import classNames from "classnames";
import { PosseFormDropMintStage } from "@/lib/types";
import { formatDate, getDateTimeAfter, isValidBigInt } from "@/lib/utils";
import { useDeployDrop } from "@/hooks/useDeployDrop";
import { type deployDrop } from "@/server-actions/drop";
import { useRef } from "react";
import { LuPlus, LuLoader2 } from "react-icons/lu";
import { MdCheckCircleOutline, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { Button, Field, Fieldset, Input, Label, MultiSelect, Radio, RadioGroup, Textarea, XDatePicker } from "../base";
import { XUpload } from "../XUpload";
import { StageDialog } from ".";
import toast from "react-hot-toast";

export const DropForm = (props: { deployDrop: typeof deployDrop }) => {

  const formRef = useRef<HTMLFormElement | null>(null);
  const { account, setFile, isLoading, handleSubmit,
    dropGroup, setDropGroup, selectedDate, setSelectedDate, selectedPayToken, setSelectedPayToken,
    register, useSubmit, errors, setValue, reset, errorFile, setErrorFile, mintStages, setMintStages, selectedStage, setSelectedStage, isOpen, setIsOpen,
  } = useDeployDrop(props);

  const handleToAddStage = () => {
    setSelectedStage(-1);
    setIsOpen(true);
  };

  const handleToEditStage = (idx: number) => {
    setSelectedStage(idx);
    setIsOpen(true);
  };

  const handleToDeleteStage = (idx: number) => {
    const newStages = mintStages.slice(0, idx).concat(mintStages.slice(idx + 1));
    setMintStages(newStages);
    setValue("mintStages", newStages);
  };

  const handleToClose = () => {
    setIsOpen(false);
  };

  const handleToDone = (v: PosseFormDropMintStage) => {
    if (selectedStage < 0) {
      const newStages = [...mintStages, v];
      setMintStages(newStages);
      setValue("mintStages", newStages);
    } else {
      const newStages = mintStages.slice(0, selectedStage).concat(v).concat(mintStages.slice(selectedStage + 1));
      setMintStages(newStages);
      setValue("mintStages", newStages);
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col justify-between items-center">
      <form
        ref={formRef}
        onSubmit={useSubmit(handleSubmit)}
        className="flex flex-col gap-6 sm:gap-12 md:flex-row"
      >
        <Fieldset className="space-y-8 md:w-1/2">
          <Field>
            <Label as="p" className="block text-sm font-medium">Select the Group of your Drop *</Label>
            <RadioGroup value={dropGroup} onChange={(v) => setDropGroup(v)}>
              <div className="mt-4 flex flex-row items-center gap-2">
                <Radio
                  value={"limited"}
                  className={({ checked }) =>
                    `${checked ? 'bg-golden-1300 text-white' : 'bg-golden-1400 text-gray'
                    } w-full relative rounded-lg shadow-md px-5 py-2 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className={classNames('whitespace-nowrap font-medium', checked ? 'text-white' : 'text-gray-900')}>Limited Edition</p>
                          <p className={classNames('hidden lg:flex text-xs whitespace-nowrap', checked ? 'text-white' : 'text-gray-900')}>A limited number<br />of items</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-white ml-1">
                        {checked && <MdCheckCircleOutline className="w-6 h-6" />}
                      </div>
                    </div>
                  )}
                </Radio>
                <Radio
                  value={"unlimited"}
                  className={({ checked }) =>
                    `${checked ? 'bg-golden-1300 text-white' : 'bg-golden-1400 text-gray'
                    } w-full relative rounded-lg shadow-md px-5 py-2 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p className={classNames('whitespace-nowrap font-medium', checked ? 'text-white' : 'text-gray-900')}>Open Edition</p>
                          <p className={classNames('hidden lg:flex text-xs whitespace-nowrap', checked ? 'text-white' : 'text-gray-900')}>An unlimited<br />number of items</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-white ml-1">
                        {checked && <MdCheckCircleOutline className="w-6 h-6" />}
                      </div>
                    </div>
                  )}
                </Radio>
              </div>
            </RadioGroup>
            <input
              {...register('group', { required: 'Please select a group of the drop.' })}
              id="group"
              type="hidden"
              value={dropGroup}
            />
            {errors.group && <span className="text-red-500">{errors.group.message}</span>}
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
            <Label htmlFor="description" className="block mb-2">Description</Label>
            <Textarea
              {...register('description')}
              id="description"
              rows={3}
              className="px-3 py-1 min-w-[25vw]"
            />
          </Field>
          <Field>
            <Label htmlFor="payToken" as="p" className="block mb-2">Payment Tokens</Label>
            <MultiSelect
              variant="inline"
              items={["ETH", "ASTR"]}
              selectedItems={selectedPayToken}
              onChangeSelectedItems={(v) => {
                setValue("payToken", v);
                setSelectedPayToken(v);
              }}
              placeholder="Add Token"
            />
            {errors.payToken && (
              <p className="mt-1 text-xs text-red-600">{errors.payToken.message}</p>
            )}
          </Field>
          {dropGroup === "LIMITED" && <Field>
            <Label htmlFor="numberOfItems" className="block mb-2">Number of items</Label>
            <Input
              {...register('numberOfItems', {
                required: "Number of items is required",
                validate: (v) => isValidBigInt(v, true) || "Number of items is invalid",
              })}
              id="numberOfItems"
              type="text"
              className="px-3 py-1 min-w-[25vw]"
            />
            {errors.numberOfItems && (
              <p className="mt-1 text-xs text-red-600">{errors.numberOfItems.message}</p>
            )}
          </Field>}
          <Field>
            <Label htmlFor="mintStartAt" as="p" className="block mb-2">Mint start date & time</Label>
            <XDatePicker
              className="px-3 py-1 min-w-[25vw]"
              variant="inline"
              xDate={selectedDate}
              onChangeDate={(d) => {
                setValue("mintStartAt", (!d) ? (new Date()).getTime() : d.getTime());
                setSelectedDate(d);
              }}
            />
          </Field>
        </Fieldset>
        <div className="space-y-5 md:w-1/2">
          <div>
            <p className="block text-white text-sm font-medium">Featured Image</p>
            <p className="block text-white/[60%] text-xs">This image will be used for featuring your collection on the category pages.</p>
          </div>
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
            className="min-h-[18vw]"
          />
          {errorFile === "none" && <span className="text-md mt-1 w-full text-right">Your artwork is missing.</span>}
          {errorFile === "exceed" && <span className="text-md mt-1 w-full text-right">Your artwork exceeds 500KB.</span>}
          {errorFile === "invalid-ext" && <span className="text-md mt-1 w-full text-right">Your artwork's extension type is invalid.</span>}

          <div className="w-full">
            <div className="w-full flex justify-between items-center">
              <p className="block text-white text-sm font-medium">Mint stages</p>
              <Button
                type="button"
                variant="secondary"
                onClick={handleToAddStage}
                className="text-white bg-blue-600 hover:bg-blue-700 border-none"
              >
                <LuPlus color="white" size="18" />
                Add a stage
              </Button>
            </div>
            {mintStages.map((stage, i) => (
              <div className="w-full flex flex-row border-golden-1000 border-2 bg-black-1100 py-2 px-4 mt-2">
                <div className="w-full flex items-start flex-col">
                  <span className="text-white text-sm font-medium whitespace-nowrap">{`${stage.name}`}</span>
                  <span className="text-white text-xs whitespace-nowrap">{`${formatDate(getDateTimeAfter(selectedDate, stage.durationd, stage.durationh, stage.durationm))}`}</span>
                  <span className="text-white text-xs whitespace-nowrap">{`${stage.price} ${stage.currency}`}</span>
                  <span className="text-white text-xs whitespace-nowrap">{`Limit per Wallet: ${stage.perlimit ?? "Unlimited"}`}</span>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleToEditStage(i)}
                  >
                    <MdOutlineEdit color="white" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleToDeleteStage(i)}
                  >
                    <RiDeleteBin2Line color="white" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
      <div className="h-[80px]"> </div>
      <StageDialog
        open={isOpen}
        onClose={handleToClose}
        title="Add a mint stage"
        stage={mintStages[selectedStage]}
        onCreate={handleToDone}
      />
      <div className="fixed py-2.5 w-[100vw] z-50 bottom-0 start-0 bg-black/[30%]">
        <div className="max-w-[1920px] flex items-center justify-between mx-auto xl:px-10 px-5 h-[64px]">
          <div className="flex lg:w-full items-center justify-end">
            <Button
              type="button"
              onClick={() => {
                if (!account) {
                  toast.error("Please Connect your wallet before deploy drop!");
                  return;
                }
                if (formRef.current) {
                  formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                }
              }}
              disabled={isLoading}
            >
              {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Deploy a Drop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}