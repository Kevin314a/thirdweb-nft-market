'use client'

import { client } from "@/lib/constants";
import { PosseViewNFT } from "@/lib/types";
import { useRouter } from "next/navigation";
import { MediaRenderer } from "thirdweb/react";

export default function PortfolioNFT({
  item,
  openListPanel,
}: {
  item: PosseViewNFT,
  openListPanel: (item: PosseViewNFT) => void,
}) {
  const router = useRouter();
  return (
    <div className="relative group rounded-lg shadow-lg">
      <div
        className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg flex flex-col w-full h-full bg-golden-1000 justify-between border overflow-hidden border-white/10 rounded-lg"
        onClick={() => router.push(`/contract/${item.collectionId.address}/token/${item.tokenId}`)}
      >
        <div className="relative">
          {item.image && (
            <MediaRenderer
              src={item.image}
              client={client}
              className="object-cover object-center h-[160px]"
            />
          )}
        </div>
        <div className="flex w-full px-3">
          <div className="flex flex-col w-full justify-center py-3">
            <div className="flex justify-between">
              <p className="text-xs text-white whitespace-nowrap">
                {item.collectionId.name}
              </p>
              <p className="text-sm text-white whitespace-nowrap border-white">
                #{item.tokenId}
              </p>
            </div>
            <p className="text-xs font-bold text-white py-2 overflow-x-hidden">
              {item.name}
            </p>
            <span className="flex w-full justify-between items-center">
              <p className="text-xs text-white">
                {"Last sale:"}
              </p>
              <p className="text-xs text-white">
                {"unknown"}
              </p>
            </span>
          </div>
        </div>
      </div>
      <button
        className="absolute bottom-0 left-0 w-full transform -translate-x-0 bg-black/[80%] text-white shadow-inner shadow-white/10 focus:outline-none py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs lg:text-md"
        onClick={() => openListPanel(item)}
      >
        List
      </button>
    </div>
  );
}
