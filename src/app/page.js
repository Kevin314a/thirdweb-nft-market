import Image from "next/image";
import Link from "next/link";
import { TableTabs } from "@/components/TableTabs";
import FeaturedSlider from "@/components/FeaturedSlider";
import LaunchpadSlider from "@/components/LaunchpadSlider";
import MarketMoversSlider from "@/components/MarketMoversSlider";
import TopSalesSlider from "@/components/TopSalesSlider";
import MemecoinsSlider from "@/components/MemecoinsSlider";



export const metadata = {
  title: "Homepage",
  description: "Generated by create next app",
};

export default function Home() {


  return (
    <>
      <section className="lg:pt-20 pt-24 relative z-10">
        <div className="max-w-[1440px] lg:px-[50px] px-5 mx-auto">
          <h2 className="text-[15px] sm:mb-3 font-semibold text-white leading-normal sm:text-start text-center mb-6">
            Featured
            <span className="bg-text-bg  bg-clip-text text-transparent">
              {" "}
              Collections
            </span>
          </h2>
        <FeaturedSlider/> 
        </div>
        <div className="absolute -bottom-4 right-0 -z-10">
          <img
            src="/images/polygon-1.png"
            alt=""
          />
        </div>
      </section>

      <section className="pt-10 relative z-10">
        <div className="max-w-[1440px] lg:px-[50px] px-5 mx-auto">
          <h2 className="text-[15px] sm:mb-3 font-semibold text-white leading-normal sm:text-start text-center mb-10">
            Token
            <span className="bg-text-bg  bg-clip-text text-transparent">
              {" "}
              Swap
            </span>
          </h2>
          <div className="flex lg:flex-nowrap flex-wrap justify-center gap-6">
            <div className="lg:w-[38%] md:w-1/2 w-full">
              <Image
                width={500}
                height={350}
                src="/images/funia-img.png"
                className="rounded-[15px] w-full"
                alt=""
                priority
              />
            </div>
            <div className="lg:w-[62%] md:w-1/2 w-full">
              <Image
                width={815}
                height={350}
                src="/images/swap.png"
                className="rounded-[15px] w-full"
                alt=""
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 -z-10">
           <img
            src="/images/poly-2.png"
            alt=""
          />
        </div>
      </section>

      <section className="md:pt-4 pt-10 pb-[34px] relative">
        <div className="max-w-[1440px] lg:px-[42px] px-5 mx-auto z-10 relative">
          <div className="w-full flex items-center justify-between">
          <TableTabs/>
          </div>
        </div>
        <div className="h-[900px] bg-[#1D0B07] blur-[200px] absolute w-1/4 -top-2/3 right-0 z-0"></div>
      </section>

      <section className="pt-10 relative">
        <div className="max-w-[1440px] lg:px-[42px] px-5 mx-auto relative z-10">
          <div className="mb-14">
            <h2 className="text-[15px] sm:mb-3 font-semibold text-white leading-normal sm:text-start text-center mb-10">
              Launchpad NFT
              <span className="bg-text-bg  bg-clip-text text-transparent">
                {" "}
                Collections
              </span>
            </h2>
            <LaunchpadSlider/>
          </div>
          <div className="mb-14">
            <h2 className="text-[15px] sm:mb-3 font-semibold text-white leading-normal sm:text-start text-center mb-10">
              NFT Market
              <span className="bg-text-bg  bg-clip-text text-transparent">
                {" "}
                Movers
              </span>
            </h2>
            <MarketMoversSlider/>
          </div>
          <div className="mb-14">
            <h2 className="text-[15px] sm:mb-3 font-semibold text-white leading-normal sm:text-start text-center mb-10">
              Top NFT
              <span className="bg-text-bg  bg-clip-text text-transparent">
                {" "}
                Sales
              </span>
            </h2>
            <TopSalesSlider/>
          </div>
        </div>
        <div className="absolute -top-20 -right-2">
         <img
            src="/images/polygon-1.png"
            alt=""
          />
        </div>

        <div className="absolute -translate-y-1/2 top-1/2 -mt-36 left-0">
          <img
            className="max-h-[312px] bg-contain w-auto"
            src="/images/polygon.png"
            alt=""
          />
        </div>

        <div className="absolute -bottom-34 right-0">
          <img
            className="max-h-[312px] bg-contain w-auto"
            src="/images/polygon-11.png"
            alt=""
          />
        </div>

        <div className="hlg:-[600px]  px-5bg-[#1D0B07] blur-[200px] absolute w-1/4 top-1/2 right-0 z-0"></div>
      </section>

      <section className="pt-10 relative">
        <div className="max-w-[1440px] lg:px-[50px] px-5 mx-auto relative z-10">
          <h2 className="text-[15px] sm:mb-3 font-semibold text-white leading-normal sm:text-start text-center mb-6">
            Memecoins on
            <span className="bg-text-bg  bg-clip-text text-transparent">
              {" "}
              Yeehaw
            </span>
          </h2>
          <div className="text-center">
            <h3 className="lg:text-[50px] lg:leading-[75px] mb-10 text-4xl text-white font-semibold">
              Begin your meme adventure with
              <span className="bg-heading-bg  bg-clip-text text-transparent">
                {" "}
                Yeehaw !
              </span>
            </h3>
          </div>
          <MemecoinsSlider/>

          <div className="grid md:grid-cols-2 grid-cols-1 mb-16 mt-[70px] md:gap-12 gap-5">
            <div className="relative">
              <Image
               width={646}
               height={291}
                src="/images/marketplace-img.png"
                className="w-full h-auto rounded-[16px]"
                alt=""
              />
              <div className="absolute bottom-[18px] left-5 max-w-[150px] w-full">
                <a
                  href="#"
                  className="text-base transition-all justify-center ease-out duration-500 hover:bg-golden-1100 max-w-[150px] text-center w-full mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                >
                  Marketplace
                </a>
              </div>
            </div>
            <div className="relative">
              <Image
                width={646}
                height={291}
              src="/images/dex-img.png" className="rounded-[16px]" alt="" />
              <div className="absolute w-full h-auto bottom-[18px] left-5 max-w-[150px]">
                <a
                  href="#"
                  className="text-base transition-all justify-center ease-out duration-500 hover:bg-golden-1100 max-w-[150px] w-full text-center mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                >
                  Dex
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              width={1340}
              height={402}
            src="/images/banner.png" className="w-full sm:min-h-[250px] min-h-[150px] object-cover h-auto rounded-[16px]" alt="" />
            <div className="absolute top-[22px] left-5 max-w-[150px] w-full">
              <a
                href="#"
                className="text-base transition-all justify-center ease-out duration-500 hover:bg-golden-1100 max-w-[150px] text-center w-full mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div className="absolute md:block hidden bottom-1/2 -mb-44 left-0 z-0">
          <img
            className="max-h-[312px] bg-contain w-auto"
            src="/images/polygon-4.png"
            alt=""
          />  
        </div>

        <div className="absolute -bottom-20 right-0 z-0">
          <img
            className="max-h-[312px] bg-contain w-auto"
            src="/images/polygon-5.png"
            alt=""
          />
        </div>

      </section>


    </>
  );
}

