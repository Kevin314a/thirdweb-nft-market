'use client'

import { ImageNFT } from "@/assets";
import Image from "next/image";

export const DropProgressingItem = ({
}: {
  }) => {
  return (
    <div className="bg-golden-1000 drop-shadow-3xl rounded-[10px]">
      <div className="relative">
        <Image
          width={240}
          height={162}
          src={ImageNFT}
          className="w-full h-auto rounded-t-[10px]"
          alt=""
        />
      </div>
      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-base font-inter font-semibold leading-6 text-white">
            Posse V1
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
              Minting
            </h6>
            <p className="text-base font-inter text-white leading-[22.6px] font-normal">
              Now
            </p>
          </div>
          <div className="">
            <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
              Price
            </h6>
            <p className="text-base font-inter text-white leading-[22.6px] font-normal">
              0.89 WILD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
