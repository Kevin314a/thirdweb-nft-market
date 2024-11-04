'use client'

import { client } from "@/lib/constants";
import { PosseBridgeDrop, PosseBridgeDropMintStage, PosseBridgeLazyNFT } from "@/lib/types";
import { Button } from "@/components/base";
import { NFTPricedBox } from "@/components/NFT";
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
  stage,
  stageStatus,
}: {
  drop: PosseBridgeDrop,
  lazyNFTs: PosseBridgeLazyNFT[],
  stage: PosseBridgeDropMintStage,
  stageStatus: 'past' | 'today' | 'future',
}) => {


  return (
    <div className="w-full mt-8 lg:mt-16">
      <div className="lg:w-full flex lg:items-center lg:flex-row flex-col justify-end lg:justify-between mt-4 lg:mt-0">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row gap-1 md:gap-6 flex-start">
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm whitespace-nowrap">Total volume</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm whitespace-nowrap">Floor price</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm whitespace-nowrap">Best offer</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm whitespace-nowrap">Listed</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm whitespace-nowrap">Owners</span>
            </div>
            <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
              <span className="text-sm md:text-lg font-medium whitespace-nowrap">{'N/A'}</span>
              <span className="text-sm whitespace-nowrap">Unique owners</span>
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
            <NFTPricedBox
              key={i}
              nft={{
                // category: lazyNFT.category,
                name: lazyNFT.name,
                image: lazyNFT.image,
                contractAddr: drop.address,
                contract: drop.name,
                tokenId: lazyNFT.tokenId,
                price: stage.price,
                currency: stage.currency,
              }}
              onDetail={() => { }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};