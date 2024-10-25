'use client'

import { client } from "@/lib/constants";
import { PosseViewNFT } from "@/lib/types";
import { shortenString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MediaRenderer } from "thirdweb/react";
import MarQuee from "react-fast-marquee";
import toast from "react-hot-toast";

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
        </div>
        <div className="flex w-full px-3">
          <div className="flex flex-col w-full justify-center py-3">
            <div className="flex justify-between">
              <p className="text-sm text-white whitespace-nowrap">
                {shortenString(item.contract.name, 8)}
              </p>
              <p className="text-sm text-white whitespace-nowrap">
                #{item.tokenId}
              </p>
            </div>
            <MarQuee speed={20} className="text-sm font-semibold text-white py-2">{item.name}</MarQuee>
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
      {!item.isListed ? (
        <button
          className="absolute bottom-0 left-0 w-full transform -translate-x-0 bg-black/[80%] text-white shadow-inner shadow-white/10 focus:outline-none py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs lg:text-md"
          onClick={() => openListPanel(item)}
        >
          List
        </button>
      ) : (
        <button
          className="absolute bottom-0 left-0 w-full transform -translate-x-0 bg-black/[80%] text-white shadow-inner shadow-white/10 focus:outline-none py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs lg:text-md"
          onClick={() => toast.error("comming soon")}
        >
          DeList
        </button>
      )}
    </div>
  );
}
