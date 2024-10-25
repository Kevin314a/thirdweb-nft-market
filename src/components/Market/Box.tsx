'use client'

import { useMarket } from "@/hooks/useMarket";
import { getAllValidNFTs } from "@/server-actions/market";
import { Button } from "../base";
import { MarketFilter, MarketNFT } from ".";

export default function MarketBox(props: { getAllValidNFTs: typeof getAllValidNFTs }) {

  const { nfts, isLoading, currencies, filters, onChangeFilter, onLoadMore, onRefresh, onBuy, onDelist, isOperating } = useMarket(props);

  return (
    <>
      <MarketFilter onChangeFilter={onChangeFilter} onRefresh={onRefresh} isLoading={isLoading} currencies={currencies} />
      {!!nfts && (
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
      )}
      <div className="flex justify-center items-center w-full">
        {!!nfts ? (!isLoading && (!filters.hasMore ? (
          <span className="text-white">{nfts.length > 0 ? "There is no more of NFTs here." : "Nothing in Marketplace."}</span>
        ) : (
          <Button onClick={onLoadMore}>{'Load More'}</Button>
        ))) : (
          <span className="text-white py-4">Loading...</span>
        )}
      </div>
    </>
  );
};
