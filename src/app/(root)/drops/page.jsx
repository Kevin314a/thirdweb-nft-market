'use client'
import React from "react";
import Image from "next/image";
import { XCarousel } from "@/components/XCarousel";

import { ImageNFT } from "@/assets";

export default function DropsPage() {
  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] lg:px-[42px] px-5 mx-auto z-10 relative">
        <h4 className="lg:text-[36px] lg:leading-[75px] text-2xl text-white font-bold">
          <span className="bg-heading-bg  bg-clip-text text-transparent">
            Drops
          </span>
        </h4>
      </div>
      <div className="max-w-[1920px] lg:px-[42px] px-5 mx-auto z-10 relative">
        <XCarousel />
      </div>
      <div className="max-w-[1920px] lg:px-[42px] px-5 pt-8 mx-auto z-10 relative">
        <div className="">
          <h2 className="text-[15px] sm:mb-3 font-bold text-white leading-normal sm:text-start text-center mb-10">
            <span className="bg-text-bg  bg-clip-text text-transparent">
              Active & upcoming
            </span>
          </h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 lg:gap-10 sm:max-w-full max-w-[300px] mx-auto">
            <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
              <div className="relative">
                <Image
                  width={240}
                  height={162}
                  src={ImageNFT}
                  className="w-full h-auto rounded-t-[9px]"
                  alt=""
                />
                <div className="absolute top-2 left-3">
                  <h4 className="text-base font-inter font-semibold leading-6 text-white">
                    Posse V1
                  </h4>
                </div>
              </div>
              <div className="py-[14px] ">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Mint
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      Soon
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Price
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      250 WILD
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Supply
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      3k
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href="#"
                    className="text-base text-center flex items-center justify-center text-white font-medium font-poppins h-[30px] max-w-[130px] mx-auto w-full mt-2.5 bg-golden-1200 rounded-[7px]"
                  >
                    Mint
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
              <div className="relative">
                <Image
                  width={240}
                  height={162}
                  src={ImageNFT}
                  className="w-full h-auto rounded-t-[9px]"
                  alt=""
                />
                <div className="absolute top-2 left-3">
                  <h4 className="text-base font-inter font-semibold leading-6 text-white">
                    Posse V1
                  </h4>
                </div>
              </div>
              <div className="py-[14px] ">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Mint
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      Soon
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Price
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      250 WILD
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Supply
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      3k
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href="#"
                    className="text-base text-center flex items-center justify-center text-white font-medium font-poppins h-[30px] max-w-[130px] mx-auto w-full mt-2.5 bg-golden-1200 rounded-[7px]"
                  >
                    Mint
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
              <div className="relative">
                <Image
                  width={240}
                  height={162}
                  src={ImageNFT}
                  className="w-full h-auto rounded-t-[9px]"
                  alt=""
                />
                <div className="absolute top-2 left-3">
                  <h4 className="text-base font-inter font-semibold leading-6 text-white">
                    Posse V1
                  </h4>
                </div>
              </div>
              <div className="py-[14px] ">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Mint
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      Soon
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Price
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      250 WILD
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Supply
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      3k
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href="#"
                    className="text-base text-center flex items-center justify-center text-white font-medium font-poppins h-[30px] max-w-[130px] mx-auto w-full mt-2.5 bg-golden-1200 rounded-[7px]"
                  >
                    Mint
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
              <div className="relative">
                <Image
                  width={240}
                  height={162}
                  src={ImageNFT}
                  className="w-full h-auto rounded-t-[9px]"
                  alt=""
                />
                <div className="absolute top-2 left-3">
                  <h4 className="text-base font-inter font-semibold leading-6 text-white">
                    Posse V1
                  </h4>
                </div>
              </div>
              <div className="py-[14px] ">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Mint
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      Soon
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Price
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      250 WILD
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Supply
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      3k
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href="#"
                    className="text-base text-center flex items-center justify-center text-white font-medium font-poppins h-[30px] max-w-[130px] mx-auto w-full mt-2.5 bg-golden-1200 rounded-[7px]"
                  >
                    Mint
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
              <div className="relative">
                <Image
                  width={240}
                  height={162}
                  src={ImageNFT}
                  className="w-full h-auto rounded-t-[9px]"
                  alt=""
                />
                <div className="absolute top-2 left-3">
                  <h4 className="text-base font-inter font-semibold leading-6 text-white">
                    Posse V1
                  </h4>
                </div>
              </div>
              <div className="py-[14px] ">
                <div className="flex items-center gap-4 justify-center">
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Mint
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      Soon
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Price
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      250 WILD
                    </p>
                  </div>
                  <div className="text-center">
                    <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                      Supply
                    </h6>
                    <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                      3k
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href="#"
                    className="text-base text-center flex items-center justify-center text-white font-medium font-poppins h-[30px] max-w-[130px] mx-auto w-full mt-2.5 bg-golden-1200 rounded-[7px]"
                  >
                    Mint
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[900px] bg-[#1D0B07] blur-[200px] absolute w-1/4 -top-2/3 right-0 z-0"></div>
    </section>
  );
}