'use server'

import { MarketBox } from "@/components/Market";
import { getAllValidNFTs } from "@/server-actions/market";

export default async function MarketPage() {
  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] px-6 lg:px-10 mx-auto z-10 relative">
        <h4 className="py-2 text-2xl text-golden-1000 font-bold">
          Marketplace
        </h4>
      </div>
      <div className="max-w-[1920px] min-h-[20vw] px-6 lg:px-10 mx-auto z-10 relative">
        <MarketBox getAllValidNFTs={getAllValidNFTs} />
      </div>
    </section>
  );
}
