'use client'

import Image from "next/image";
import Link from "next/link";
import { IconChainAll, IconChainAstar, IconChainBase, IconChainCronos, IconChainSoneium, ImagePosse, ImageSwap, ImageSwapAstar1, ImageVerifiedBadge, Poly2, Poly3, Poly6, Poly7, Polygon, Polygon1, Polygon11 } from "@/assets";
import { TableTabs, LaunchpadSlider, MarketMoversSlider, TopSalesSlider, MemecoinsSlider, SwapPanel, FeaturedSlider } from "@/components/shared";
import { GradientText, Tab, TabGroup, TabList, XSwiper } from "@/components/base";

export default function PosseHome() {

  return (
    <>
      <section className="md:pt-20 pt-16 relative z-20">
        <div className="max-w-[1920px] px-6 lg:px-6 mx-auto relative z-10 flex flex-col xl:flex-row justify-between gap-4 items-center">
          <div className="flex flex-row gap-4 w-full overflow-x-scroll md:overflow-x-hidden">
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
      </section>
      <section className="md:pt-4 pt-8 relative">
        <div className="max-w-[1920px] px-6 lg:px-10 mx-auto relative z-10">
          <h1 className="text-[15px] md:flex gap-2 hidden sm:mb-3 font-semibold text-white leading-normal md:text-start lg:px-0 px-6 text-center mb-4">
            Featured
            <GradientText text="Collections" fontSize={16} />
          </h1>
          <FeaturedSlider />
        </div>
        <div className="absolute -bottom-4 right-0 z-1">
          <img
            src={Polygon1.src}
            alt=""
          />
        </div>
      </section>

      <section className="md:pt-10 pt-8 relative">
        <div className="max-w-[1920px] px-6 lg:px-10 mx-auto relative z-30">
          <h2 className="text-[15px] flex gap-2 mb-4 font-semibold text-white leading-normal sm:text-start">
            Token
            <GradientText text="Swap" fontSize={16} />
          </h2>
          <div className="flex flex-wrap justify-center gap-10 items-center mx-auto w-full">
            <div className="block mx-auto">
              <Link
                href="https://lfgm.astar.network/posse"
                target="_blank"
              >
                <Image
                  width={1280}
                  height={640}
                  src={ImageSwapAstar1}
                  className="rounded-2xl object-cover min-w-[400px] max-w-[400px] md:min-w-[720px] md:max-w-[720px] min-h-[200px] max-h-[200px] md:min-h-[360px] md:max-h-[360px] bg-cover"
                  alt=""
                  priority
                />
              </Link>
            </div>
            <SwapPanel />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 max-h-[312px] -z-10">
          <img
            className="w-[145px] h-full"
            src={Poly2.src}
            alt=""
          />
        </div>

        <div className="lg:h-[653.31px] h-[455px] w-[455px] lg:w-[645.18px] bg-[#200B07] blur-[250px] absolute -top-[50%] -left-1/3 lg:-left-44 -z-20"></div>
      </section>

      <section className="md:pt-10 pt-8 relative z-20">
        <div className="max-w-[1920px] px-6 lg:px-10 mx-auto z-10 relative">
          <div className="w-full flex items-center justify-between">
            <TableTabs />
          </div>
        </div>
        <div className="lg:h-[653.31px] lg:w-[645.18px]  h-[455px] w-[455px] bg-[#200B07] blur-[250px] absolute -top-[35%] -right-44 z-0"></div>
      </section>

      <section className="md:pt-10 pt-8 relative">
        <div className="max-w-[1920px] px-6 lg:px-10 mx-auto relative z-10">
          <h2 className="text-[15px] flex gap-2 mb-4 font-semibold text-white leading-normal whitespace-nowrap">
            Memecoins on
            <GradientText text="Yeehaw" fontSize={16} />
          </h2>
          <MemecoinsSlider />
        </div>
        <div className="absolute md:block hidden bottom-1/2 -mb-44 left-0 z-0">
          <img
            className="w-auto h-full max-h-[312px]"
            src={Poly6.src}
            alt=""
          />
        </div>

        <div className="h-[555px] w-[547px] bg-[#200B07]/[40%] blur-[250px] absolute -top-[0%] lg:-left-44 -left-[400px] z-0"></div>
        <div className="h-[966px] w-[952px] bg-[#200B07]/[40%] blur-[250px] absolute -bottom-[0%] lg:-right-44 -right-[650px]  z-0"></div>
      </section>

      <section className="lg:pt-10 pt-8 relative z-10">
        <div className="max-w-[1920px] px-6 lg:px-10 mx-auto relative z-10">
          <div className="lg:mb-10 mb-8 -mx-2">
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 font-semibold text-white whitespace-nowrap">
              Launchpad NFT
              <GradientText text="Collections" fontSize={16} />
            </h2>
            <LaunchpadSlider />
          </div>
          <div className="lg:mb-10 mb-8 -mx-2">
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 font-semibold text-white whitespace-nowrap">
              Top NFT
              <GradientText text="Sales" fontSize={16} />
            </h2>
            <TopSalesSlider />
          </div>
          <div className="lg:mb-10 mb-8 -mx-2">
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 font-semibold text-white whitespace-nowrap">
              NFT Market
              <GradientText text="Movers" fontSize={16} />
            </h2>
            <MarketMoversSlider />
          </div>
          <div className="lg:mb-10 mb-8 -mx-2">
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 font-semibold text-white whitespace-nowrap">
              Trending
              <GradientText text="Collections" fontSize={16} />
            </h2>
            <MarketMoversSlider />
          </div>
          <div className="lg:mb-10 mb-8 -mx-2">
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 font-semibold text-white whitespace-nowrap">
              404
              <GradientText text="Collections" fontSize={16} />
            </h2>
            <MarketMoversSlider />
          </div>
        </div>
        <div className="absolute -top-20 max-h-[312px] -right-2">
          <img
            className="w-auto h-full max-h-[312px]"
            src={Poly3.src}
            alt=""
          />
        </div>

        <div className="absolute -translate-y-1/2 top-1/2 -mt-36 left-0">
          <img
            className="max-h-[312px] bg-contain w-auto"
            src={Polygon.src}
            alt=""
          />
        </div>

        <div className="h-[237px] w-[237px] bg-[#200B07] blur-[250px] absolute -top-[0%] -left-10 z-0"></div>
        <div className="h-[555px] w-[547px] bg-[#200B07] blur-[250px] absolute -bottom-[0%] -right-44 z-0"></div>


        <div className="absolute -bottom-34 right-0">
          <img
            className="max-h-[312px] bg-contain w-auto"
            src={Polygon11.src}
            alt=""
          />
        </div>

        <div className="hlg:-[600px]  px-5bg-[#1D0B07] blur-[200px] absolute w-1/4 top-1/2 -right-[150px] z-0"></div>
      </section>

    </>
  );
}
