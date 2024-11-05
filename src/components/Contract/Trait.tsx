'use client'

import { Button, Dialog, DialogPanel, DialogTitle, CloseButton, Field, Fieldset, Input, Label, Transition, TransitionChild } from "@/components/base";
import { Fragment, useEffect, useState } from "react";
import { MdClose, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";

export const ContractTraitDialog = ({
  isOpen,
  index,
  type,
  onCreateTraitType,
  onClose,
}: {
  isOpen: boolean,
  index: number,
  type: string,
  onCreateTraitType: (newType: string, isEdit: boolean, editIndex: number) => void;
  onClose: () => void;
}) => {

  const [traitType, setTraitType] = useState<string>("");

  useEffect(() => {
    setTraitType(index < 0 ? "" : type);
  }, [index, type]);

  const handleChange = (e: any) => {
    setTraitType(e.target.value);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1999] focus:outline-none" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-[1996] bg-black/[50%]" />
        </TransitionChild>

        <div className="fixed inset-0 z-[1999] overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="max-w-md rounded-xl bg-golden-1400 backdrop-blur-2xl">
                <DialogTitle as="h3" className="text-base/7 font-medium text-white border-b-2 border-black/[20%] p-4">
                  <div className="flex justify-between items-center">
                    Add New Trait Type
                    <CloseButton as="button"><MdClose color="white" /></CloseButton>
                  </div>
                </DialogTitle>
                <Fieldset className="mt-4 flex flex-row gap-2 px-4">
                  <Field>
                    <Label htmlFor="trait-type" className="block mb-2">Type *</Label>
                    <Input
                      type="text"
                      id="trait-type"
                      name="type"
                      value={traitType}
                      onChange={handleChange}
                      className="px-3 py-1"
                    />
                  </Field>
                </Fieldset>
                <div className="mt-4 p-4 border-t-2 border-black/[20%]">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    disabled={!traitType}
                    onClick={() => !!traitType && onCreateTraitType(traitType, index >= 0, index)}
                  >
                    Add
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const ContractTraitCard = ({
  index,
  traitType,
  onEditTraitType,
  onRemoveTraitType,
}: {
  index: number,
  traitType: string,
  onEditTraitType: (i: number) => void,
  onRemoveTraitType: (i: number) => void,
}) => {
  return (
    <div className="w-full flex justify-between items-center bg-golden-1300 rounded-lg text-base/4 text-white px-2 py-1 mb-2">
      {`${traitType}`}
      <div>
        <Button
          type="button"
          className="mr-1"
          variant="outline"
          onClick={() => onEditTraitType(index)}
        >
          <MdOutlineEdit color="white" />
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onRemoveTraitType(index)}
        >
          <RiDeleteBin2Line color="white" />
        </Button>
      </div>
    </div>
  )
};