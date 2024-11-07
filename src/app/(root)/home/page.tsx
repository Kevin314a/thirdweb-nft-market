'use server'

import Image from "next/image";
import Link from "next/link";
import { ImageSwapAstar1, Poly2, Poly3, Poly6, Polygon, Polygon1, Polygon11 } from "@/assets";
import { SubMenu, TableTabs, LaunchpadSlider, MarketMoversSlider, TopSalesSlider, MemecoinsSlider, SwapPanel, FeaturedSlider } from "@/components/Home";
import { GradientText } from "@/components/base";
import { fetchFeaturedDrops } from "@/server-actions/drop";

export default async function PosseHome() {
  const featuredDrops = await fetchFeaturedDrops();
  return (
    <>
      <section className="md:pt-20 pt-16 relative z-20">
        <div className="max-w-[1920px] px-6 lg:px-6 mx-auto relative z-10">
          <SubMenu />
        </div>
      </section>
      <section className="md:pt-4 pt-8 relative">
        <div className="max-w-[1920px] px-6 lg:px-10 mx-auto relative z-10">
          <h1 className="text-[15px] flex gap-2 mb-2 md:mb-4 font-semibold text-white md:text-start">
            Featured
            <GradientText text="Collections" fontSize={16} />
          </h1>
          <FeaturedSlider drops={featuredDrops} />
        </div>
        <div className="hidden md:absolute -bottom-4 right-0 z-1">
          <img
            src={Polygon1.src}
            alt=""
          />
        </div>
      </section>

      <section className="md:pt-10 pt-8 relative">
        <div className="max-w-[1920px] px-6 lg:px-10 mx-auto relative z-30">
          <h2 className="text-[15px] flex gap-2 mb-2 md:mb-4 font-semibold text-white sm:text-start">
            Token
            <GradientText text="Swap" fontSize={16} />
          </h2>
          <div className="flex flex-wrap justify-center gap-10 items-center mx-auto w-full">
            <div className="hidden lg:block mx-auto">
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
        <div className="hidden md:absolute bottom-0 left-0 max-h-[312px] -z-10">
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
          <h2 className="text-[15px] flex gap-2 mb-2 md:mb-4 font-semibold text-white whitespace-nowrap">
            Memecoins on
            <GradientText text="Yeehaw" fontSize={16} />
          </h2>
          <MemecoinsSlider />
        </div>
        <div className="hidden md:absolute md:block hidden bottom-1/2 -mb-44 left-0 z-0">
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
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 md:mb-4 font-semibold text-white whitespace-nowrap">
              Launchpad NFT
              <GradientText text="Collections" fontSize={16} />
            </h2>
            <LaunchpadSlider />
          </div>
          <div className="lg:mb-10 mb-8 -mx-2">
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 md:mb-4 font-semibold text-white whitespace-nowrap">
              Top NFT
              <GradientText text="Sales" fontSize={16} />
            </h2>
            <TopSalesSlider />
          </div>
          <div className="lg:mb-10 mb-8 -mx-2">
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 md:mb-4 font-semibold text-white whitespace-nowrap">
              NFT Market
              <GradientText text="Movers" fontSize={16} />
            </h2>
            <MarketMoversSlider />
          </div>
          <div className="lg:mb-10 mb-8 -mx-2">
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 md:mb-4 font-semibold text-white whitespace-nowrap">
              Trending
              <GradientText text="Collections" fontSize={16} />
            </h2>
            <MarketMoversSlider />
          </div>
          <div className="lg:mb-10 mb-8 -mx-2">
            <h2 className="text-[15px] mx-2 flex gap-2 mb-2 md:mb-4 font-semibold text-white whitespace-nowrap">
              404
              <GradientText text="Collections" fontSize={16} />
            </h2>
            <MarketMoversSlider />
          </div>
        </div>
        <div className="hidden md:absolute -top-20 max-h-[312px] -right-2">
          <img
            className="w-auto h-full max-h-[312px]"
            src={Poly3.src}
            alt=""
          />
        </div>

        <div className="hidden md:absolute -translate-y-1/2 top-1/2 -mt-36 left-0">
          <img
            className="max-h-[312px] bg-contain w-auto"
            src={Polygon.src}
            alt=""
          />
        </div>

        <div className="h-[237px] w-[237px] bg-[#200B07] blur-[250px] absolute -top-[0%] -left-10 z-0"></div>
        <div className="h-[555px] w-[547px] bg-[#200B07] blur-[250px] absolute -bottom-[0%] -right-44 z-0"></div>


        <div className="hidden md:absolute -bottom-34 right-0">
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
