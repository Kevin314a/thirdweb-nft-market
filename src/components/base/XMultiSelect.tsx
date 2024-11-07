'use client'

import { cn } from "@/lib/utils"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from 'clsx'
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { GoTriangleDown } from "react-icons/go";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const MultiSelectVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex items-center border border-golden-1300 rounded-lg bg-golden-1300 text-white hover:border-golden-1000 focus:border-golden-1000",
        common: "flex items-center border border-golden-1000 rounded-lg bg-transparent text-white hover-border-golden-1100 focus:border-golden-1100",
      },
      size: {
        default: "",
        common: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export function XMultiSelect({
  items,
  selectedItems,
  onChangeSelectedItems,
  variant,
  size,
  className,
  placeholder,
}: VariantProps<typeof MultiSelectVariants> & {
  items: string[],
  selectedItems: string[],
  onChangeSelectedItems: (items: string[]) => void,
  className?: string,
  placeholder?: string,
}) {
  return (
    <Listbox
      as="div"
      className={cn(MultiSelectVariants({ variant, size, className }))}
      value={selectedItems} onChange={(v) => onChangeSelectedItems(v)} multiple
    >
      <ListboxButton
        className={clsx(
          'cursor-pointer relative block w-full rounded-lg bg-transparent py-2 pr-10 pl-3 text-left text-white',
          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
          'transition ease-in-out duration-150 sm:text-sm sm:leading-5'
        )}
      >
        <span className="block truncate text-white">
          {!!placeholder && (selectedItems.length < 1 ? placeholder : `${placeholder} (${selectedItems.length})`)}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <GoTriangleDown color="white" size="18" />
        </span>
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'rounded-xl mt-2 border border-golden-1000 bg-black-1300 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none z-[2010]',
          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
        )}
      >
        {items.map((item, i) => (
          <ListboxOption
            key={i}
            value={item}
            className="group flex cursor-pointer items-center gap-2 rounded-lg py-2 px-3 select-none data-[focus]:bg-white/10"
          >
            {({ selected }) => (
              <div className={`relative pl-8 pr-4`}>
                <span className={`${selected ? "text-golden-1000 font-semibold" : "text-white font-normal"} block truncate`}>
                  {item}
                </span>
                <span className={`${selected ? "text-golden-1000" : "text-white"} absolute inset-y-0 left-0 flex items-center`}>
                  {selected ? <IoMdCheckboxOutline size="18" /> : <MdCheckBoxOutlineBlank size="18" />}
                </span>
              </div>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
