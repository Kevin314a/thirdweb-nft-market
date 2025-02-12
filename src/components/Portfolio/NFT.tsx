'use client'

import { client } from "@/lib/constants";
import { PosseBridgeNFT } from "@/lib/types";
import { shortenString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MediaRenderer } from "thirdweb/react";
import MarQuee from "react-fast-marquee";

export default function PortfolioNFT({
  item,
  openListPanel,
  onDelist,
}: {
  item: PosseBridgeNFT,
  openListPanel: (item: PosseBridgeNFT) => void,
  onDelist: (item: PosseBridgeNFT) => void,
}) {
  const router = useRouter();
  return (
    <div className="relative group rounded-lg shadow-lg">
      <div
        className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg flex flex-col w-full h-full bg-golden-1000 justify-between border overflow-hidden border-white/10 rounded-lg"
      // onClick={() => router.push(`/contract/${item.contract.address}/token/${item.tokenId}`)}
      >
        <div className="relative">
          {item.image && (
            <MediaRenderer
              src={item.image}
              client={client}
              className="object-cover object-center h-[160px]"
              style={{ objectFit: "cover" }}
            />
          )}
          {item.listedId !== "0" && (
            <div className="bg-golden-1200 rounded-full border border-golden-1000 w-[20px] h-[20px] absolute left-2 top-2"> </div>
          )}
        </div>
        <div className="flex w-full px-3">
          <div className="flex flex-col w-full justify-center py-3">
            <div className="flex justify-between">
              <p className="text-sm text-white whitespace-nowrap">
                {shortenString(item.contract?.name, 8)}
              </p>
              <p className="text-sm text-white whitespace-nowrap">
                #{item.tokenId}
              </p>
            </div>
            <MarQuee speed={20} className="py-1"><span className="text-sm font-semibold text-white px-4">{item.name}</span></MarQuee>
            <span className="flex w-full justify-between items-center">
              <p className="text-xs text-white">
                {"Last sale:"}
              </p>
              <p className="text-xs text-white">
                {"N/A"}
              </p>
            </span>
          </div>
        </div>
      </div>
      {item.listedId === "0" ? (
        <button
          className="absolute bottom-0 left-0 w-full transform -translate-x-0 bg-black/[80%] text-white shadow-inner shadow-white/10 focus:outline-none py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs lg:text-md"
          onClick={() => openListPanel(item)}
        >
          List
        </button>
      ) : (
        <button
          className="absolute bottom-0 left-0 w-full transform -translate-x-0 bg-black/[80%] text-white shadow-inner shadow-white/10 focus:outline-none py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs lg:text-md"
          onClick={() => onDelist(item)}
        >
          DeList
        </button>
      )}
    </div>
  );
}
