'use client'

import { TempImageNFT } from "@/assets";
import { client } from "@/lib/constants";
import { PosseBridgeNFT } from "@/lib/types";
import { MediaRenderer } from "thirdweb/react";

export const NFTBox = ({ nft, onDetail }: {
  nft: PosseBridgeNFT,
  onDetail: () => void;
}) => {
  return (
    <div
      className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg flex flex-col w-full h-full bg-golden-1000 justify-stretch border overflow-hidden border-white/10 rounded-lg"
      onClick={onDetail}
    >
      <div className="relative w-full bg-white/[.04]">
        <MediaRenderer
          src={!nft.image ? TempImageNFT.src : nft.image}
          client={client}
          className="object-cover object-center"
        />
      </div>
      <div className="flex justify-between flex-1 w-full px-3">
        <div className="flex flex-col w-full justify-center py-3">
          <div className="flex justify-between">
            <p className="text-xs text-white whitespace-nowrap">
              {"Posse #16754"}
            </p>
            <p className="text-sm text-white whitespace-nowrap border-white">
              {"#3,768"}
            </p>
          </div>
          <p className="text-xs font-bold text-white py-2">
            {"0.239 WILD"}
          </p>
          <p className="text-xs text-white pb-2">
            {"Last sale: 0.26 CRO"}
          </p>
        </div>
      </div>
    </div>
  );
};