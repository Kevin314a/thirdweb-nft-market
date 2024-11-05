'use client'

import { type PosseBridgeContract } from "@/lib/types";
import { ImagePosse as defImage } from "@/assets";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@/components/base";
import React, { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";
import { LuCheck, LuChevronsUpDown, LuPlus } from "react-icons/lu";

export const ContractSelect = forwardRef(({
  onChange, onBlur, name, label, items, defaultValue
}: {
  onChange: (e: any) => void,
  onBlur: (e: any) => void,
  name: string,
  label?: string,
  items: PosseBridgeContract[],
  defaultValue: string,
}, ref: React.Ref<HTMLInputElement>) => {

  const [contractAddr, setContractAddr] = useState<string>(defaultValue);
  const router = useRouter();

  const handleOnChange = (value: string) => {
    if (!value) {
      router.push('/create/collection');
    } else {
      setContractAddr(value);
      onChange({
        target: {
          name, value
        }
      })
    }
  };

  const handleBoxClick = () => {
    if (!items.length) {
      router.push('/create/collection');
    }
  };

  const collection = items.filter((item: PosseBridgeContract) => item.address === contractAddr)[0];

  return (
    <>
      <Listbox
        value={contractAddr}
        onChange={handleOnChange}
      >
        <div className="relative mt-2">
          <ListboxButton
            className="relative w-full cursor-pointer rounded-md bg-golden-1300 p-4 pr-10 text-left text-white shadow-sm focus:outline-none md:text-xs md:leading-6"
            onClick={handleBoxClick}
          >
            <span className="flex items-center">
              {!!collection?.address ? (
                <img src={collection?.image || defImage.src} className="h-12 w-12" alt="contract image" />
              ) : (
                <LuPlus className="h-12 w-12 bg-golden-1300 text-golden-1000 border-2 border-golden-1000 rounded-lg" />
              )}
              <span className="ml-3 block truncate text-xs md:text-lg">
                {collection?.name ?? "Create a new Collection"}{!!collection?.category ? ` (${collection.category})` : ""}
              </span>
            </span>
            {!!items.length && (
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <LuChevronsUpDown aria-hidden="true" className="h-10 w-10 text-gray-400" />
              </span>
            )}
          </ListboxButton>
          {!!items.length && (
            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-md bg-golden-1300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {!!items.length && items.map((item: PosseBridgeContract, i) => (
                <ListboxOption
                  key={i}
                  value={item.address}
                  className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-white data-[focus]:bg-gray-600 data-[focus]:text-white"
                >
                  <div className="flex items-center">
                    <img src={item?.image || defImage.src} className="h-12 w-12" alt="contract image" />
                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">{item.name}{!!item?.category ? ` (${item.category})` : ""}</span>
                  </div>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                    <LuCheck />
                  </span>
                </ListboxOption>
              ))}
              <ListboxOption
                value={null}
                className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-white data-[focus]:bg-gray-600 data-[focus]:text-white"
              >
                <div className="flex items-center">
                  <LuPlus className="h-12 w-12 bg-golden-1300 text-golden-1000 border-2 border-golden-1000 rounded-lg" />
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    Create a new contract
                  </span>
                </div>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <LuCheck />
                </span>
              </ListboxOption>
            </ListboxOptions>
          )}
        </div>
      </Listbox>
      <input
        type="hidden"
        name={name}
        ref={ref}
        value={contractAddr}
        onChange={() => { }}  // This is here to meet react-hook-form requirements
        onBlur={onBlur}
      />
    </>
  );
});