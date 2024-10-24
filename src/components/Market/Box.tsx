'use client'

import { useMarket } from "@/hooks/useMarket";
import { deListNFT } from "@/server-actions/nft";
import { getAllValidNFTs, buyNFT } from "@/server-actions/market";
import { MarketFilter, MarketNFT } from ".";

export default function MarketBox(props: { getAllValidNFTs: typeof getAllValidNFTs, deListNFT: typeof deListNFT, buyNFT: typeof buyNFT }) {

  const { nfts, isLoading, currencies, onChangeFilter, /* onLoadMore,*/ onRefresh, onBuy, onDelist, isOperating } = useMarket(props);

  return (
    <>
      <MarketFilter onChangeFilter={onChangeFilter} onRefresh={onRefresh} isLoading={isLoading} currencies={currencies} />
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] py-4 gap-4"
      >
        {nfts.map((nft, i) => (
          <MarketNFT
            key={i}
            item={nft}
            isOperating={isOperating}
            onBuy={onBuy}
            onDelist={onDelist}
          />
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        {!isLoading && !nfts.length && (
          <span className="text-white">No NFTs in Marketplace.</span>
        )}
      </div>
    </>
  );
};
