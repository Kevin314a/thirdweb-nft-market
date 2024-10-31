'use client'

import { ImageNFT } from "@/assets";
import { PosseBridgeDrop } from "@/lib/types";
import { parseRemainTime } from "@/lib/utils";
import Image from "next/image";

export const DropProgressingItem = ({
  drop,
  cardType,
}: {
  drop: PosseBridgeDrop,
  cardType: "ACTIVE" | "PAST",
}) => {

  const currentTime = Date.now();
  const difference = currentTime - (drop.mintStartAt + drop.mintStages[0].duration);
  const totalSeconds = Math.floor(difference / 1000); // Total seconds
  const pastDays = Math.floor(totalSeconds / (60 * 60 * 24)) + 1; // Days

  return (
    <div className="bg-golden-1000 drop-shadow-3xl rounded-[10px]">
      <div className="relative">
        <Image
          width={240}
          height={162}
          src={!drop.image ? ImageNFT : drop.image}
          className="w-full h-auto rounded-t-[10px]"
          alt="dropitem"
        />
      </div>
      <div className="p-4">
        <div className="mb-4">
          <h4 className="text-base font-inter font-semibold leading-6 text-white">
            {drop.name}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
              Minting
            </h6>
            {cardType === "ACTIVE" ? (
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">{`Now`}</p>
            ) : (
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">{`${pastDays} days ago`}</p>
            )}
          </div>
          <div className="">
            <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
              Price
            </h6>
            <p className="text-base font-inter text-white leading-[22.6px] font-normal">
              {`${drop.mintStages[0].price} ${drop.mintStages[0].currency}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
