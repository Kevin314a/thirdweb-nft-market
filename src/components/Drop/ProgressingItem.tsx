'use client'
import { ImageNFT } from "@/assets";
import {client} from "@/lib/constants";
import { PosseBridgeDrop } from "@/lib/types";
import { parseRemainTime } from "@/lib/utils";
import { MediaRenderer } from "thirdweb/react";

export const DropProgressingItem = ({
  drop,
  cardType,
  onClick,
}: {
  drop: PosseBridgeDrop,
  cardType: "ACTIVE" | "PAST",
  onClick: () => void,
}) => {

  let strPast = "";
  if (cardType !== "ACTIVE") {
    const { remainDays, remainHours, remainMins, remainSecs } = parseRemainTime(drop.mintStages[0].endAt);
    strPast = remainDays > 0 ? remainDays.toString().concat(" days ") : (remainHours > 0 ? remainHours.toString().concat(" hours ") : (remainMins > 0 ? remainMins.toString().concat(" mins ") : remainSecs.toString().concat(" secs ")));
  }

  return (
    <div className="bg-golden-1000 drop-shadow-3xl rounded-[10px] cursor-pointer" onClick={onClick}>
      <div className="relative">
        {/* <Image
          width={240}
          height={162}
          src={!drop.image ? ImageNFT : drop.image}
          className="w-full h-auto rounded-t-[10px]"
          alt="dropitem"
        /> */}
        <MediaRenderer
          src={!drop.image ? ImageNFT.src : drop.image}
          client={client}
          className="object-cover rounded-lg min-w-[240px] min-h-[162px]"
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
              {cardType === "ACTIVE" ? 'Minting' : 'Minting Over'}
            </h6>
            {cardType === "ACTIVE" ? (
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">{`Now`}</p>
            ) : (
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">{`${strPast} ago`}</p>
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
