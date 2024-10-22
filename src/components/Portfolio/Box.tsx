'use client'

import { PosseViewNFT } from "@/lib/types";
import { getPortfolioNFTs } from "@/server-actions/nft";
import { useState } from "react";
import { PortfolioFilter, PortfolioNFT } from ".";

export default function PortfolioBox(props: { getPortfolioNFTs: typeof getPortfolioNFTs }) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nfts, setNfts] = useState<PosseViewNFT[]>([]);
  const [filters, setFilters] = useState<{ search: string, sort: string, page: number }>({ search: "", sort: "", page: 0 });

  const onChangeFilter = async (_search: string, _sort: string) => {
    setIsLoading(true);
    setFilters({
      search: _search,
      sort: _sort,
      page: 0,
    });
    const json_nfts = await props.getPortfolioNFTs(_search, _sort, 0);
    setNfts(JSON.parse(json_nfts));
    setIsLoading(false);
  }

  const onLoadMore = async () => {
    setFilters({
      ...filters,
      page: filters.page + 1,
    });
    const _nfts = await props.getPortfolioNFTs(filters.search, filters.sort, filters.page + 1);
    // setNfts(_nfts);
  }

  return (
    <>
      <PortfolioFilter onChangeFilter={onChangeFilter} />
      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] py-4 gap-4"
      >
        {nfts.map((nft, i) => (
          <PortfolioNFT
            key={i}
            item={nft}
          />
        ))}
      </div>
      <div className="flex justify-center items-center w-full">
        {!isLoading && !nfts.length && (
          <>No NFTs.</>
        )}
      </div>
    </>
  );
}
