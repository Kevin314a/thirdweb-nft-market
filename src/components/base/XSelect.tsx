'use client'

import { cn } from "@/lib/utils";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import clsx from 'clsx'
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { GoTriangleDown , GoChevronDown } from "react-icons/go";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { HiOutlineChevronDown } from "react-icons/hi";

const XSelectVariants = cva(
  "w-full flex items-center border rounded-lg text-white",
  {
    variants: {
      variant: {
        default: "",
        inline: "bg-golden-1300 border-golden-1300 hover:border-golden-1000 focus:border-golden-1000",
        common: "bg-transparent border-golden-1000 hover:border-golden-1100 focus:border-golden-1100",
        mobile: "bg-golden-1300 border-golden-1000 hover:border-golden-1000 focus:border-golden-1000"
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
);


export function XSelect({
  items,
  value,
  onChange,
  variant,
  size,
  className,
}: VariantProps<typeof XSelectVariants> & {
  items: { key: string, title: string }[],
  value: string,
  onChange: (item: string) => void,
  className?: string,
}) {
  return (
    <Listbox
      as="div"
      className={cn(XSelectVariants({ variant, size, className }))}
      value={value} onChange={(v: string) => onChange(v)}
    >
      <ListboxButton
        className={clsx(
          'cursor-pointer relative block w-full rounded-lg bg-transparent py-2 pr-10 pl-3 text-left text-white',
          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
          'transition ease-in-out duration-150 sm:text-sm sm:leading-5'
        )}
      >
        <span className="block truncate text-white">
          {items.filter(item => item.key === value).shift()?.title}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          {variant === "mobile" ? (
            <HiOutlineChevronDown  color="white" size="18" />
          ) : (
            <GoTriangleDown color="white" size="18" />
          )}
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
            value={item.key}
            className="group flex cursor-pointer items-center gap-2 rounded-lg py-2 px-3 select-none data-[focus]:bg-white/10"
          >
            {({ selected }) => (
              <div className={`relative pl-8 pr-4`}>
                <span className={`${selected ? "text-golden-1000 font-semibold" : "text-white font-normal"} block truncate`}>
                  {item.title}
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