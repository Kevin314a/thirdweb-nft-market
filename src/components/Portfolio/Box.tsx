'use client'

import { useListingPortfolio } from "@/hooks/useListingPortfolio";
import { PosseFormListing, PosseViewNFT, PosseCurrency } from "@/lib/types";
import { getOwnedNFTs, listNFT, verifyNFTtoList } from "@/server-actions/nft";
import { useState, useRef, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";
import { Button, Field, Fieldset, Input, Label, Menu, MenuButton, MenuItems, MenuItem } from "../base";
import { Spinner } from "../shared/Spinner";
import { SlideOver } from "../XSlideOver/SlideOver";
import { PortfolioFilter, PortfolioNFT } from ".";

export default function PortfolioBox(props: { getOwnedNFTs: typeof getOwnedNFTs, listNFT: typeof listNFT, verifyNFTtoList: typeof verifyNFTtoList }) {

  const formRef = useRef<HTMLFormElement | null>(null);
  const { register, handleSubmit: useSubmit, formState: { errors } } = useForm<PosseFormListing>({});
  const { nfts, isLoading, currencies, filters, onChangeFilter, /* onLoadMore,*/ onRefresh,
    listingItem, setListingItem, handleList, handleDelist, isOperating, isListPanelOpen, setIsListPanelOpen } = useListingPortfolio(props);

  // useEffect(() => {
  //   account && onChangeFilter(filters.search, filters.sort);
  // }, [account]);

  return (
    <>
      <PortfolioFilter onChangeFilter={onChangeFilter} onRefresh={onRefresh} isLoading={isLoading} />
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] py-4 gap-4"
      >
        {nfts.map((nft, i) => (
          <PortfolioNFT
            key={i}
            item={nft}
            openListPanel={(item: PosseViewNFT) => {
              setListingItem(item);
              setIsListPanelOpen(true);
            }}
            onDelist={(item: PosseViewNFT) => {
              handleDelist(item);
            }}
          />
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        {!isLoading && !nfts.length && (
          <span className="text-white">No NFTs.</span>
        )}
      </div>
      <SlideOver
        open={isListPanelOpen}
        setOpen={() => !isOperating && setIsListPanelOpen(false)}
        title="List Details"
      >
        <div className="flex flex-col">
          <form
            ref={formRef}
            onSubmit={useSubmit(handleList)}
            className="flex flex-col gap-6 sm:gap-12"
          >
            <Fieldset className="flex flex-col md:flex-row gap-4">
              <Field>
                <Label htmlFor="price" className="block mb-2">Price *</Label>
                <Input
                  {...register('price', { required: "Price is required" })}
                  id="price"
                  type="number"
                  step="any"
                  className="px-3 py-1 bg-gray-600/[30%] focus:border-gray-300 border-gray-300"
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
                )}
              </Field>
              <Field>
                <Label htmlFor="currency" as="p" className="block mb-2">Currency *</Label>
                <CurrencySelect
                  {...register('currency', { required: "Please select a currency" })}
                  name="currency"
                  defaultValue={currencies[0]?.address ?? ""}
                  items={currencies}
                />
                {errors.currency && (
                  <p className="mt-1 text-xs text-red-600">{errors.currency.message}</p>
                )}

              </Field>
            </Fieldset>
            <Button
              className="mt-4"
              onClick={() => {
                if (formRef.current && !isOperating) {
                  formRef.current.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                }
              }}
            >
              {isOperating && <Spinner />}
              Direct List
            </Button>
          </form>
        </div>
      </SlideOver>
    </>
  );
};


const CurrencySelect = forwardRef(({
  onChange, onBlur, name, label, items, defaultValue
}: {
  onChange: (e: any) => void,
  onBlur: (e: any) => void,
  name: string,
  label?: string,
  items: PosseCurrency[],
  defaultValue: string,
}, ref: React.Ref<HTMLInputElement>) => {

  const [currency, setCurrency] = useState<string>(defaultValue);
  const selectedCurrency = items.filter((item: PosseCurrency) => item.address === currency)[0];

  if (!items.length) {
    return null;
  }
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex justify-between items-center px-4 py-1 bg-gray-600/[30%] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600/[70%] text-white rounded-md whitespace-nowrap">
          <img src={selectedCurrency.icon} width="24" height="24" className="mr-2" />
          {selectedCurrency.symbol}
          <FaChevronDown className="ml-2" />
        </MenuButton>

        <MenuItems className="absolute right-0 mt-2 w-auto origin-top-right bg-gray-800 border border-gray-300 rounded-md shadow-lg focus:outline-none">
          {items.map((item, i) => (
            <MenuItem key={i}>
              {({ focus }) => (
                <button
                  className={`${focus ? 'bg-gray-600' : ''} group flex w-full items-center px-6 py-2 text-sm text-white whitespace-nowrap`}
                  onClick={() => {
                    setCurrency(item.address);
                    onChange({ target: { name, value: item.address } });
                  }}
                >
                  <img src={item.icon} width="24" height="24" className="mr-2" />
                  {item.symbol}
                </button>
              )}
            </MenuItem>
          ))}

        </MenuItems>
      </Menu>
      <input
        type="hidden"
        name={name}
        ref={ref}
        value={currency}
        onChange={() => { }}  // This is here to meet react-hook-form requirements
        onBlur={onBlur}
      />
    </>
  );
});