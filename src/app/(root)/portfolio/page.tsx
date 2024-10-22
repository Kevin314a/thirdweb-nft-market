'use server'

import { PortfolioBox } from "@/components/Portfolio";
import { getOwnedNFTs, listNFT, verifyNFTtoList } from "@/server-actions/nft";

export default async function PortfolioPage() {
  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] lg:px-[42px] px-5 mx-auto z-10 relative">
        <h4 className="lg:text-[36px] lg:leading-[75px] text-2xl text-white font-bold">
          <span className="bg-heading-bg  bg-clip-text text-transparent">
            Portfolio
          </span>
        </h4>
      </div>
      <div className="max-w-[1920px] lg:px-[42px] min-h-[20vw] px-5 mx-auto z-10 relative">
        <PortfolioBox getOwnedNFTs={getOwnedNFTs} listNFT={listNFT} verifyNFTtoList={verifyNFTtoList} />
      </div>
    </section>
  );
}
