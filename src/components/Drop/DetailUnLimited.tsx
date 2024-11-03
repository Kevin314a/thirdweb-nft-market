'use client'

import { DEFAULT_PLATFORMFEE_DROP, client } from "@/lib/constants";
import { NFTPricedBox } from "@/components/NFT";
import { PosseBridgeDrop, PosseBridgeDropMintStage } from "@/lib/types";
import { formatDateIntl } from "@/lib/utils";
import { ImagePossef } from "@/assets";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { MdLanguage, MdMoreHoriz } from "react-icons/md";
import { IoBarChart, IoStar, IoShareSocial } from "react-icons/io5";
import { notFound, useRouter } from "next/navigation";
import { MediaRenderer } from "thirdweb/react";
import { sharedMetadata } from "thirdweb/extensions/erc721";
import { useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";

export const DetailUnLimited = ({
  drop,
  stage,
  stageStatus,
}: {
  drop: PosseBridgeDrop,
  stage: PosseBridgeDropMintStage,
  stageStatus: 'past' | 'today' | 'future',
}) => {
  const router = useRouter();

  const [sharedData, setSharedData] = useState<[string, string, string, string]>(["", "", "", ""]);

  useEffect(() => {
    const fnLoadSharedData = async () => {
      const [ret1, ret2, ret3, ret4] = await sharedMetadata({
        contract: getContract({
          address: drop.address,
          client,
          chain: soneiumMinato,
        })
      });
      setSharedData([ret1, ret2, ret3, ret4]);
    }
    fnLoadSharedData();
  }, [drop]);

  console.log('sharedData', sharedData);
  return (
    <TabGroup className="w-full mt-8 lg:mt-16">
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
          <TabList className="flex rounded-[10px] bg-bg-btn">
            <Tab className="inline-block outline-none data-[selected]:bg-golden-1000  rounded-[10px] py-2 px-4 text-base font-bold text-white">
              Overview
            </Tab>
            <Tab className="inline-block outline-none data-[selected]:bg-golden-1000 pl-5 rounded-[10px] py-2 px-4 text-base font-bold text-white">
              Items
            </Tab>
          </TabList>
        </div>
      </div>
      <TabPanels className="mt-8 lg:mt-16">
        <TabPanel>
          <div className="w-full h-full flex md:flex-row flex-col gap-4">
            <div className="md:w-1/2">
              <MediaRenderer
                src={!sharedData[2] ? ImagePossef.src : sharedData[2]}
                client={client}
                className="object-cover object-center w-[calc(100vw-20px)] h-[calc(100vw-20px)] md:w-[45vw] md:h-[45vw]"
                style={{ objectFit: "cover" }}
                alt="drop claim image"
              />
            </div>
            <div className="md:w-1/2 flex flex-col gap-4">
              {stageStatus === 'past' ? (
                <span className="text-2xl text-red-700 font-medium">Current Status: Minting over</span>
              ) : (stageStatus === 'today' ? (
                <span className="text-2xl text-blue-700 font-medium">Current Status: Minting underway</span>
              ) : (
                <span className="text-2xl text-green-700 font-medium">Current Status: Minting upcoming</span>
              ))}
              <span className="text-white text-lg">Name: {sharedData[0]}</span>
              <span className="text-white text-lg">Description: {sharedData[1]}</span>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
              <NFTPricedBox
                key={i}
                nft={{
                  name: sharedData[0],
                  image: sharedData[2],
                  contractAddr: '',
                  contract: '',
                  tokenId: '',
                  price: stage.price,
                  currency: stage.currency,
                }}
                // onDetail={() => router.push('/contract/0x1/token/0x1')}
                onDetail={() => { }}
              />
            ))}
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};