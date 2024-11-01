'use client'

import React from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const MultiSelectVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        inline: "flex items-center border border-golden-1300 rounded-lg bg-golden-1300 text-white hover:border-golden-1000 focus:border-golden-1000",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export function MultiSelectListbox({
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
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full pt-1 text-sm text-white">
        <>Selected Tokens: {selectedItems.join(", ")}</>
      </div>
      <Listbox
        as="div"
        className={cn(MultiSelectVariants({ variant, size, className }))}
        value={selectedItems}
        onChange={(v) => onChangeSelectedItems(v)}
        multiple
      >
        <div className="relative w-full">
          <span className="inline-block w-full rounded-md shadow-sm">
            <ListboxButton
              className="cursor-default relative w-full rounded-md border border-none bg-transparent pl-3 pr-10 py-2 text-left focus:outline-none transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <span className="block truncate text-white">
                {!!placeholder && (selectedItems.length < 1
                  ? placeholder
                  : `${placeholder} (${selectedItems.length})`)}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </ListboxButton>
          </span>
          <ListboxOptions
            transition
            className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
          >
            {items.map((item, i) => (
              <ListboxOption key={i} value={item}>
                {({ selected }) => (
                  <div
                    className={`${selected ? "text-white bg-golden-1400" : "text-white"} cursor-default select-none relative py-2 pl-8 pr-4`}
                  >
                    <span className={`${selected ? "font-semibold" : "font-normal"} block truncate`}>
                      {item}
                    </span>
                    {selected && (
                      <span className={`${selected ? "text-white" : "text-golden-1400"} absolute inset-y-0 left-0 flex items-center pl-1.5`}>
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
