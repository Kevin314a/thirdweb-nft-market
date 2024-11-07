'use client'

import { IconChainAll, IconChainAstar, IconChainBase, IconChainCronos, IconChainSoneium } from "@/assets";
import { Tab, TabGroup, TabList, XSelect, XSwiper } from "@/components/base";
import { useState } from "react";

const SubMenu = () => {
  const [chain, setChain] = useState<"ALL" | "SONEIUM" | "ASTAR" | "BASE" | "CRONOS">("ALL");
  const [hole, setHole] = useState<"NFT" | "COIN">("NFT");

  return (
    <div className="flex flex-col-reverse md:flex-col xl:flex-row justify-between gap-4 items-center">
      <div className="w-full hidden md:flex flex-row gap-4 overflow-x-scroll md:overflow-x-hidden">
        <div className="flex flex-row items-center cursor-pointer gap-2 min-w-max">
          <img width="24" height="24" src={IconChainAll.src} alt="chain-icon" />
          <span className="whitespace-nowrap text-white font-medium">All Chains</span>
        </div>
        <div className="flex flex-row items-center cursor-pointer gap-2 min-w-max">
          <img width="24" height="24" src={IconChainSoneium.src} alt="chain-icon" />
          <span className="whitespace-nowrap text-white font-medium">Soneium</span>
        </div>
        <div className="flex flex-row items-center cursor-pointer gap-2 min-w-max">
          <img width="24" height="24" src={IconChainAstar.src} alt="chain-icon" />
          <span className="whitespace-nowrap text-white font-medium">Astar</span>
        </div>
        <div className="flex flex-row items-center cursor-pointer gap-2 min-w-max">
          <img width="24" height="24" src={IconChainBase.src} alt="chain-icon" />
          <span className="whitespace-nowrap text-white font-medium">Base</span>
        </div>
        <div className="flex flex-row items-center cursor-pointer gap-2 min-w-max">
          <img width="24" height="24" src={IconChainCronos.src} alt="chain-icon" />
          <span className="whitespace-nowrap text-white font-medium">Cronos</span>
        </div>
      </div>

      <div className="w-full flex md:hidden justify-center items-center gap-10">
        <XSelect
          items={[
            { key: 'ALL', title: 'All Chains' },
            { key: 'SONEIUM', title: 'Soneium' },
            { key: 'ASTAR', title: 'Astar' },
            { key: 'BASE', title: 'Base' },
            { key: 'CRONOS', title: 'Cronos' },
          ]}
          value={chain}
          variant="mobile"
          onChange={(v: string) => setChain(v === 'ALL' ? v : (v === 'SONEIUM' ? v : (v === 'ASTAR' ? v : (v === 'BASE' ? v : (v === 'CRONOS' ? v : 'ALL')))))}
        />
        <XSelect
          items={[{ key: 'NFT', title: 'NFTs' }, { key: 'COIN', title: 'Coin' }]}
          value={hole}
          variant="mobile"
          onChange={(v: string) => setHole(v === 'NFT' ? v : (v === 'COIN' ? v : 'NFT'))}
        />
      </div>
      
      <TabGroup className="w-full">
        <TabList className="flex lg:justify-end flex-row w-full bg-transparent overflow-x-scroll md:overflow-x-hidden">
          <Tab className="bg-transparent py-2 px-4 text-base font-regular text-white">
            All
          </Tab>
          <Tab className="bg-transparent pl-5 py-2 px-4 text-base font-regular text-white">
            Gaming
          </Tab>
          <Tab className="bg-transparent pl-5 py-2 px-4 text-base font-regular text-white">
            Derivatives
          </Tab>
          <Tab className="bg-transparent pl-5 py-2 px-4 text-base font-regular text-white">
            Video
          </Tab>
          <Tab className="bg-transparent pl-5 py-2 px-4 text-base font-regular text-white">
            Art
          </Tab>
          <Tab className="bg-transparent pl-5 py-2 px-4 text-base font-regular text-white">
            Memes
          </Tab>
          <Tab className="bg-transparent pl-5 py-2 px-4 text-base font-regular text-white">
            PFPs
          </Tab>
          <Tab className="bg-transparent pl-5 py-2 px-4 text-base font-regular text-white">
            Generative
          </Tab>
        </TabList>
      </TabGroup>

    </div>
  )
}

export default SubMenu;