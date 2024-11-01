'use client'

import { client } from "@/lib/constants";
import { PosseBridgeDrop, PosseBridgeLazyNFT } from "@/lib/types";
import { Button } from "@/components/base";
import { NFTBox } from "@/components/NFT";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { claimTo, isERC721 } from "thirdweb/extensions/erc721";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import toast from "react-hot-toast";

export const DetailLimited = ({
  drop,
  lazyNFTs,
}: {
  drop: PosseBridgeDrop,
  lazyNFTs: PosseBridgeLazyNFT[],
}) => {

  

  return (
    <div className="w-full mt-8 lg:mt-16">
      <div className="lg:w-full flex lg:items-center lg:flex-row flex-col justify-end lg:justify-between mt-4 lg:mt-0">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-1 md:gap-6 flex-start">
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm">total volume</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm">floor price</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm">best offer</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm">Listed</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm">Owners</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm">Unique owners</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4 lg:mt-0">
          <div> </div>
          <div> </div>
        </div>
      </div>
      <div className="mt-8 lg:mt-16">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6">
          {lazyNFTs.map((lazyNFT, i) => (
            <NFTBox
              key={i}
              nft={{
                tokenId: lazyNFT.tokenId,
                category: lazyNFT.category,
                image: lazyNFT.image,
                name: lazyNFT.name,
                listedId: '0',
                owner: '0x000',
                contractAddr: lazyNFT.contractAddr,
              }}
              onDetail={() => { }}
            />
          ))}
        </div>
      </div>
      {/* <div className="fixed py-2.5 w-[100vw] z-50 bottom-0 start-0 bg-black/[30%]">
        <div className="max-w-[1920px] flex items-center justify-between mx-auto xl:px-10 px-5 h-[64px]">
          <div className="flex lg:w-full items-center justify-end">
            <Button
              type="button"
              onClick={() => handleClaimTo()}
              disabled={isLoading}
            >
              {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Claim an NFT
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
};