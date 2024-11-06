'use client'

import { ImageLaunchBoy, ImageOverallBack, TempImageCreateBack } from "@/assets";
import { Button } from "@/components/base";
import { Launchbar } from "@/components/shared/Launchbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";

export default function LandingPage() {
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => { 
    if (!!account) {
      router.push('/home');
    }
  }, [account]);

  return (
    <>
      <Launchbar />
      <section className="pt-16 lg:pt-20 relative z-20 min-h-[100vh] md:h-[100vh]">
        <div className="max-w-[1920px] px-2 lg:px-6 md:mx-10 lg:mx-0 pb-8 h-full flex justify-center items-center">
          <div className="w-full h-full flex flex-col-reverse md:flex-row justify-between lg:justify-center items-center gap-8 lg:gap-16 xl:gap-24">
            <div className="flex flex-col items-center text-center md:items-start md:text-left md:gap-2 lg:gap-3 xl:gap-6">
              <span className="text-white whitespace-nowrap flex font-semibold text-xl lg:text-3xl xl:text-4xl">Explore the "Wild West" of</span>
              <span className="text-white whitespace-nowrap flex font-semibold text-xl lg:text-3xl xl:text-4xl">Digital <p className="text-golden-1000 px-4">ART</p> & Decentralized</span>
              <span className="text-white whitespace-nowrap flex font-semibold text-xl lg:text-3xl xl:text-4xl"><p className="text-golden-1000 pr-4">Finance</p> with Posse's GameFi</span>
              <span className="text-white whitespace-nowrap flex font-semibold text-xl lg:text-3xl xl:text-4xl">Marketplace & SocialFi <p className="text-golden-1000 pl-4">DEX</p>!</span>

              <span className="text-golden-1000 text-xs md:text-sm lg:text-lg md:max-w-[35vw] mt-4 md:mt-8">Posse Finance is the "Wild West" of the Soneium world, where the allure of the frontier merges seamlessly with cutting-edge technology.</span>
              <Link href="https://docs.possehq.org/" target="_blank">
                <Button
                  type="button"
                  className="mt-4 md:mt-8 lg:mt-16 text-md lg:text-lg px-8"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="">
              <img src={ImageLaunchBoy.src}
                width={543}
                height={650}
                className="min-w-[120px] px-10 md:px-0 md:max-w-[40vw] w-auto h-auto max-h-[50vh] lg:max-h-[70vh] xl:max-h-[85vh] min-h-[120px] bg-contain"
                alt="Launchboy"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Main content in dark area */}
      <div className="absolute top-0 w-full h-full bg-black bg-cover z-0"
        style={{ backgroundImage: `url(${ImageOverallBack.src})` }}
      >
        <div
          className="absolute inset-0 bg-black z-1"
          style={{
            maskImage: `radial-gradient(circle at 0 0, transparent 20%, rgba(0,0,0,0.8) 35%)`,
            WebkitMaskImage: `radial-gradient(circle at 0 0, transparent 20%, rgba(0,0,0,0.8) 35%)`,
          }}
        >
        </div>
        <div
          className="absolute inset-0 bg-black z-1"
          style={{
            maskImage: `radial-gradient(circle at 100% 100%, transparent 20%, rgba(0,0,0,0.8) 35%)`,
            WebkitMaskImage: `radial-gradient(circle at 100% 100%, transparent 20%, rgba(0,0,0,0.8) 35%)`,
          }}
        >
        </div>
        {/* <div
        className="absolute inset-0 bg-black z-1"
        style={{
          maskImage: `radial-gradient(circle at 0 0, transparent 20%, black 70%)`,
          WebkitMaskImage: `radial-gradient(circle at 0 0, transparent 20%, black 70%)`,
          // animation: `moveTorch 5s ease-in-out infinite`,
        }}
      >
      </div> */}
      </div>
    </>
  )
}
