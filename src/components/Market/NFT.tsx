'use client'

import { client } from "@/lib/constants";
import { PosseViewMarket } from "@/lib/types";
import { useRouter } from "next/navigation";
import { MediaRenderer, useActiveAccount } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { Spinner } from "../shared/Spinner";
import MarQuee from "react-fast-marquee";

export default function MarketNFT({
  item,
  isOperating,
  onBuy,
  onDelist,
}: {
  item: PosseViewMarket,
  isOperating: boolean,
  onBuy: (item: PosseViewMarket) => void,
  onDelist: (item: PosseViewMarket) => void,
}) {
  const router = useRouter();
  const account = useActiveAccount();

  return (
    <div className="relative group rounded-lg shadow-lg">
      <div
        className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg flex flex-col w-full h-full bg-golden-1000 justify-between border overflow-hidden border-white/10 rounded-lg"
      // onClick={() => router.push(`/contract/${item.contractAddr}/token/${item.tokenId}`)}
      >
        <div className="relative">
          {item.asset.image && (
            <MediaRenderer
              src={item.asset.image}
              client={client}
              className="object-cover object-center h-[160px]"
              style={{ objectFit: "cover" }}
            />
          )}
          {(item.currencyValuePerToken?.symbol === "ETH") ? (
            <img src="/currency/minato-eth.png" style={{ position: 'absolute', right: '0.5rem', top: '0.5rem' }} width="20" height="20" />
          ) : ((item.currencyValuePerToken?.symbol === "ASTR") ? (
            <img src="/currency/astr.png" style={{ position: 'absolute', right: '0.5rem', top: '0.5rem' }} width="20" height="20" />
          ) : null)}
          {item.asset.owner === account?.address && (
            <div className="bg-golden-1200 rounded-full border border-golden-1000 w-[20px] h-[20px] absolute left-2 top-2"> </div>
          )}
        </div>
        <div className="flex w-full px-3">
          <div className="flex flex-col w-full justify-center py-3">
            <div className="flex justify-between">
              <p className="text-sm text-white whitespace-nowrap">
                {item.asset?.contract?.name || shortenAddress(item.assetContractAddress)}
              </p>
              <p className="text-sm text-white whitespace-nowrap border-white">
                #{item.tokenId}
              </p>
            </div>
            <MarQuee speed={20} className="text-sm font-semibold text-white py-2">{item.asset.name}</MarQuee>
            <span className="flex w-full justify-between items-center">
              <p className="text-xs text-white">
                Price:
              </p>
              <p className="text-xs text-white">
                {`${item.currencyValuePerToken?.displayValue}`} {item.currencyValuePerToken?.symbol}
              </p>
            </span>
          </div>
        </div>
      </div>
      {(item.asset.owner === account?.address) ? (
        <button
          className="absolute bottom-0 left-0 w-full transform -translate-x-0 bg-black/[80%] text-white shadow-inner shadow-white/10 focus:outline-none py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs lg:text-md"
          onClick={() => onDelist(item)}
        >
          {isOperating && <Spinner />}
          Delist
        </button>
      ) : (
        <button
          className="absolute bottom-0 left-0 w-full transform -translate-x-0 bg-black/[80%] text-white shadow-inner shadow-white/10 focus:outline-none py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs lg:text-md"
          onClick={() => onBuy(item)}
        >
          {isOperating && <Spinner />}
          Buy
        </button>
      )}
    </div>
  );
}
