'use client'

import { ImageNFT, Polygon, Polygon1, Polygon11, Polygon22, TempImageNFTMore, ImageVerifiedBadge } from "@/assets";
import { PosseBridgeNFT } from "@/lib/types";
import { XCard, XGraphCard, XTableCard } from "@/components/XCard";
import { FaRegListAlt, FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";
import { PiTagSimple } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbChartDots2 } from "react-icons/tb";
import { CiHeart, CiSaveUp2 } from "react-icons/ci";
import Image from "next/image";

export const NFTDetail = ({ nft }) => {
  return (
    <>
      <section className="lg:pt-24 pt-20 relative z-10">
        <div className="max-w-[1920px] lg:px-[50px] px-5 mx-auto">
          <div className="flex lg:flex-nowrap flex-wrap justify-center gap-6">
            <div className="lg:w-[38%] md:w-1/2 w-full rounded-lg">
              <div className="w-full flex flex-col">
                <div className="flex flex-row justify-end items-center gap-1 p-1 bg-golden-1000 rounded-t-lg">
                  <span className="text-white text-xs">{9}</span>
                  <CiHeart color="white" size={28} />
                  <CiSaveUp2 color="white" size={28} />
                </div>
                <Image
                  width={600}
                  height={350}
                  src={nft.image ?? ImageNFT.src}
                  className="w-full rounded-b-lg"
                  alt=""
                  priority
                />
              </div>
            </div>
            <div className="lg:w-[62%] md:w-1/2 w-full">
              <div className="w-full flex flex-col">
                <span className="w-full flex flex-row text-golden-1000 text-sm">{'Posse'}{<img className="ml-2" src={ImageVerifiedBadge.src} style={{ width: '1rem', height: '1rem' }} alt="verified" />}</span>
                <span className="mt-2 text-white text-2xl font-bold">{`${nft.contract.name} #${nft.tokenId}`}</span>
                <span className="mt-2 text-golden-1000 text-sm">{nft.description}</span>
                <div className="mt-8 w-full flex flex-row gap-4">
                  <div className="text-white text-sm flex items-center justify-center">Owned by<span className="ml-2 font-semibold text-golden-1000">{'2B543'}</span></div>
                  <div className="text-white text-sm flex items-center justify-center"><FiEye color="white" size={24} className="mr-2" />{'1,720'} views</div>
                  <div className="text-white text-sm flex items-center justify-center"><FaRegHeart color="white" size={24} className="mr-2" />{'6'} favorites</div>
                  <div className="text-white text-sm flex items-center justify-center"><span className="border border-white rounded-md px-3 py-1 mr-2">{'# 31,324'}</span>Rarity</div>
                </div>
                <XCard className="mt-4 p-4">
                  <div className="w-full flex flex-row justify-between items-center">
                    <span className="text-sm text-white/[70%]">Current price</span>
                    <span className="text-sm text-white/[70%]">Sale ends {'November 11, 2024 at 3:40 AM'}</span>
                  </div>
                  <div className="text-sm font-bold text-white/[70%] mt-2"><span className="text-2xl text-white mr-2">{'4000 WILD'}</span> {'$303.50'}</div>
                  <div className="mt-4 w-full space-x-2">
                    <button className="xxl:text-md md:w-[calc(50%-0.25rem)] text-md whitespace-nowrap transition-all ease-out duration-500 hover:bg-golden-1100 text-white inline-flex justify-center items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-3 gap-2"><MdOutlineShoppingCart color="white" size={24} className="mr-2" />Buy Now</button>
                    <button className="xxl:text-md md:w-[calc(50%-0.25rem)] text-md whitespace-nowrap transition-all ease-out duration-500 hover:bg-golden-1100 text-white inline-flex justify-center items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-3 gap-2"><HiOutlineReceiptPercent color="white" size={24} className="mr-2" />Make Offer</button>
                  </div>
                </XCard>
                <XGraphCard
                  className="mt-4"
                  title={
                    <div className="p-4 text-sm text-white/[70%] flex items-center">
                      <TbChartDots2 color="white" size={24} className="mr-2" />Price History
                    </div>
                  }
                  data={[]}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex lg:flex-nowrap flex-wrap justify-center gap-6">
            <div className="lg:w-[38%] md:w-1/2 w-full">
              <XCard
                header={<div className="p-4 text-sm font-bold text-white flex items-center"><PiTagSimple color="white" size={24} className="mr-2" />Properties</div>}
              >
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:max-w-full gap-2 pb-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-golden-1000 rounded-lg flex flex-col justify-center items-center p-4 gap-1">
                      <span className="text-white text-xs font-semibold">FACIAL HAIR</span>
                      <span className="text-white text-xs font-semibold">Epic Beard <span className="text-golden-1200">12%</span></span>
                      <span className="text-white text-xs font-semibold">Floor: 1000 WILD</span>
                    </div>
                  ))}
                </div>
              </XCard>
              <XCard
                header={<div className="p-4 text-sm font-bold text-white flex items-center"><FaRegListAlt color="white" size={24} className="mr-2" />Details</div>}
                className="mt-8"
              >
                <div className="flex flex-col p-4 pt-0 gap-1">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-white text-sm font-semibold">Contract Address</span>
                    <span className="text-white text-sm font-semibold">0xhdgh...8uhl</span>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="text-white text-sm font-semibold">Token ID</span>
                    <span className="text-white text-sm font-semibold">4111</span>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="text-white text-sm font-semibold">Token Standard</span>
                    <span className="text-white text-sm font-semibold">ERC-721</span>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="text-white text-sm font-semibold">Chain</span>
                    <span className="text-white text-sm font-semibold">Soneium</span>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <span className="text-white text-sm font-semibold">Royalties</span>
                    <span className="text-white text-sm font-semibold">5%</span>
                  </div>
                </div>
              </XCard>
            </div>
            <div className="lg:w-[62%] md:w-1/2 w-full">
              <XTableCard
                title={<div className="p-4 text-sm font-bold text-white flex items-center"><HiOutlineReceiptPercent color="white" size={24} className="mr-2" />Offers</div>}
                data={{
                  header: ['Price', 'USD Price', 'Quantity', 'Floor Difference', 'Expiration', 'From'],
                  body: [
                    ['2500 WILD', '$267.10', 1, '14% below', 'in 9 minutes', 'BadgerBot'],
                    ['2500 WILD', '$267.10', 1, '14% below', 'in 9 minutes', 'BadgerBot'],
                    ['2500 WILD', '$267.10', 1, '14% below', 'in 9 minutes', 'BadgerBot'],
                    ['2500 WILD', '$267.10', 1, '14% below', 'in 9 minutes', 'BadgerBot'],
                    ['2500 WILD', '$267.10', 1, '14% below', 'in 9 minutes', 'BadgerBot'],
                    ['2500 WILD', '$267.10', 1, '14% below', 'in 9 minutes', 'BadgerBot'],
                    ['2500 WILD', '$267.10', 1, '14% below', 'in 9 minutes', 'BadgerBot'],
                  ]
                }}
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 -z-10">
          <Image 
            width={145}
            height={312}
            className="w-[145px] h-auto"
            src={Polygon22}
            alt=""
            priority
          />
        </div>
      </section>

      <section className="pt-10 relative">
        <div className="max-w-[1920px] px-2 lg:px-6 mx-auto relative z-10">
          <div className="mb-14">
            <XCard
              header={
                <div className="p-4 text-sm font-bold text-white flex items-center">
                  <RxDashboard color="white" size={24} className="mr-2" />More From This Collection
                </div>
              }
              border={true}
            >
              <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 lg:gap-4 sm:max-w-full max-w-[300px] p-4">
                <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
                  <div className="relative">
                    <Image
                      width={240}
                      height={162}
                      src={TempImageNFTMore}
                      className="w-full h-auto rounded-t-[9px]"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between flex-1 w-full px-3">
                    <div className="flex flex-col w-full justify-center py-3">
                      <div className="flex justify-between">
                        <p className="text-xs text-white whitespace-nowrap">
                          {"Posse #16754"}
                        </p>
                        <p className="text-sm text-white whitespace-nowrap border-white">
                          {"#3,768"}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-white py-2">
                        {"0.239 WILD"}
                      </p>
                      <p className="text-xs text-white pb-2">
                        {"Last sale: 0.26 CRO"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
                  <div className="relative">
                    <Image
                      width={240}
                      height={162}
                      src={TempImageNFTMore}
                      className="w-full h-auto rounded-t-[9px]"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between flex-1 w-full px-3">
                    <div className="flex flex-col w-full justify-center py-3">
                      <div className="flex justify-between">
                        <p className="text-xs text-white whitespace-nowrap">
                          {"Posse #16754"}
                        </p>
                        <p className="text-sm text-white whitespace-nowrap border-white">
                          {"#3,768"}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-white py-2">
                        {"0.239 WILD"}
                      </p>
                      <p className="text-xs text-white pb-2">
                        {"Last sale: 0.26 CRO"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
                  <div className="relative">
                    <Image
                      width={240}
                      height={162}
                      src={TempImageNFTMore}
                      className="w-full h-auto rounded-t-[9px]"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between flex-1 w-full px-3">
                    <div className="flex flex-col w-full justify-center py-3">
                      <div className="flex justify-between">
                        <p className="text-xs text-white whitespace-nowrap">
                          {"Posse #16754"}
                        </p>
                        <p className="text-sm text-white whitespace-nowrap border-white">
                          {"#3,768"}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-white py-2">
                        {"0.239 WILD"}
                      </p>
                      <p className="text-xs text-white pb-2">
                        {"Last sale: 0.26 CRO"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
                  <div className="relative">
                    <Image
                      width={240}
                      height={162}
                      src={TempImageNFTMore}
                      className="w-full h-auto rounded-t-[9px]"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between flex-1 w-full px-3">
                    <div className="flex flex-col w-full justify-center py-3">
                      <div className="flex justify-between">
                        <p className="text-xs text-white whitespace-nowrap">
                          {"Posse #16754"}
                        </p>
                        <p className="text-sm text-white whitespace-nowrap border-white">
                          {"#3,768"}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-white py-2">
                        {"0.239 WILD"}
                      </p>
                      <p className="text-xs text-white pb-2">
                        {"Last sale: 0.26 CRO"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
                  <div className="relative">
                    <Image
                      width={240}
                      height={162}
                      src={TempImageNFTMore}
                      className="w-full h-auto rounded-t-[9px]"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-between flex-1 w-full px-3">
                    <div className="flex flex-col w-full justify-center py-3">
                      <div className="flex justify-between">
                        <p className="text-xs text-white whitespace-nowrap">
                          {"Posse #16754"}
                        </p>
                        <p className="text-sm text-white whitespace-nowrap border-white">
                          {"#3,768"}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-white py-2">
                        {"0.239 WILD"}
                      </p>
                      <p className="text-xs text-white pb-2">
                        {"Last sale: 0.26 CRO"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-center">
                <button className="xxl:text-md text-sm font-bold whitespace-nowrap transition-all ease-out duration-500 hover:bg-golden-1100 text-white inline-flex justify-center items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-6 gap-2">View Collection</button>
              </div>
            </XCard>
          </div>
        </div>
        <div className="absolute -top-20 -right-2">
          <Image
            width={220}
            height={328}
            priority
            src={Polygon1}
            alt=""
          />
        </div>

        <div className="absolute -translate-y-1/2 top-1/2 -mt-36 left-0">
          <Image
            width={220}
            height={312}
            priority
            className="max-h-[312px] bg-contain w-auto"
            src={Polygon}
            alt=""
          />
        </div>

        <div className="absolute -bottom-34 right-0">
          <Image
            width={220}
            height={312}
            priority
            className="max-h-[312px] bg-contain w-auto"
            src={Polygon11}
            alt=""
          />
        </div>

        <div className="hlg:-[600px]  px-5bg-[#1D0B07] blur-[200px] absolute w-1/4 top-1/2 right-0 z-0"></div>
      </section>
    </>
  );
};