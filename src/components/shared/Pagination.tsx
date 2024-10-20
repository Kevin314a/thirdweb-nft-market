import React from "react";

export const Pagination = ({
  hideCurrency = true,
}: {
  hideCurrency: boolean,
}) => {
  return (
    <div className="flex items-center md:flex-row flex-col gap-4 overflow-auto">
      <div className="flex items-center w-full rounded-lg bg-golden-1000/[30%]">
        <a
          href="#"
          className="text-xs lg:text-base rounded-lg font-inter  font-semibold leading-6 block py-2 px-3 lg:px-[13.5px] text-white"
        >
          10m
        </a>
        <a
          href="#"
          className="text-xs lg:text-base rounded-lg font-inter bg-golden-1000 leading-6 block py-2 px-3 lg:px-[13.5px] text-white"
        >
          1h
        </a>
        <a
          href="#"
          className="text-xs lg:text-base rounded-lg font-inter  font-semibold leading-6 block py-2 px-3 lg:px-[13.5px] text-white"
        >
          6h
        </a>
        <a
          href="#"
          className="text-xs lg:text-base rounded-lg font-inter  font-semibold leading-6 block py-2 px-3 lg:px-[13.5px] text-white"
        >
          24h
        </a>
        <a
          href="#"
          className="text-xs lg:text-base rounded-lg font-inter  font-semibold leading-6 block py-2 px-3 lg:px-[13.5px] text-white"
        >
          7d
        </a>
        <a
          href="#"
          className="text-xs lg:text-base rounded-lg font-inter  font-semibold leading-6 block py-2 px-3 lg:px-[13.5px] text-white"
        >
          30d
        </a>
        <a
          href="#"
          className="text-xs lg:text-base rounded-lg font-inter  font-semibold leading-6 block py-2 px-3 lg:px-[13.5px] text-white"
        >
          All
        </a>
      </div>
      {!hideCurrency && (
        <select
          defaultValue={"Currency"}
          id="countries"
          className="text-base font-bold outline-none text-white rounded-[10px] bg-golden-1000 py-[7px] px-3"
        >
          <option disabled>Currency</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      )}
    </div>
  );
};