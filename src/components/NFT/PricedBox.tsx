'use client'

import { TempImageNFT } from "@/assets";
import { client } from "@/lib/constants";
import { PossePricedNFT } from "@/lib/types";
import { formatToPowerNotation } from "@/lib/utils";
import { MediaRenderer } from "thirdweb/react";

export const NFTPricedBox = ({ nft, onDetail }: {
  nft: PossePricedNFT,
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
          className="object-cover object-center h-[180px]"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex justify-between flex-1 w-full px-3">
        <div className="flex flex-col w-full justify-center py-3">
          <div className="flex justify-between">
            <p className="text-xs text-white whitespace-nowrap">
              {nft.contract ?? "Posse #16754"}
            </p>
            <p className="text-sm text-white whitespace-nowrap border-white">
              {nft.tokenId ?? "3768"}
            </p>
          </div>
          <p className="text-xs font-bold text-white py-2">
            {`${!nft.price ? "?" : formatToPowerNotation(nft.price)} ${!nft.currency ? "ETH" : nft.currency}`}
          </p>
          <p className="text-xs text-white pb-2">
            {`Last sale:`} {!nft.lastSalePrice ? (
              `N/A`
            ) : (
              `${nft.lastSalePrice} ${nft.lastSaleCurrency}`
            )}
          </p>
        </div>
      </div>
    </div>
  );
};