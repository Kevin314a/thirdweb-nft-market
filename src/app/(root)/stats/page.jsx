'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Pagination } from "@/components/shared/Pagination";
import { useRouter } from "next/navigation";

import { ImageCreator, ImageVerifiedBadge } from "@/assets";


export default function StatsPage() {
  const router = useRouter();
  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] lg:px-[42px] px-5 mx-auto z-10 relative">
        <h4 className="lg:text-[36px] lg:leading-[75px] text-2xl text-white font-bold">
          <span className="bg-heading-bg  bg-clip-text text-transparent">
            Collection Stats
          </span>
        </h4>
      </div>
      <div className="max-w-[1920px] lg:px-[42px] px-5 mx-auto z-10 relative">
        <div className="w-full flex items-center justify-between">
          <TabGroup className="w-full">
            <div className="w-full flex items-center md:flex-row flex-col gap-4 justify-between mt-4 lg:mt-0">
              <TabList className="flex rounded-[10px] bg-bg-btn">
                <Tab className="inline-block outline-none data-[selected]:bg-golden-1000  rounded-[10px] py-2 px-4 text-base font-bold text-white">
                  Trending
                </Tab>
                <Tab className="inline-block outline-none data-[selected]:bg-golden-1000 pl-5 rounded-[10px] py-2 px-4 text-base font-bold text-white">
                  Top
                </Tab>
                <Tab className="inline-block outline-none data-[selected]:bg-golden-1000 pl-5 rounded-[10px] py-2 px-4 text-base font-bold text-white">
                  Watchlist
                </Tab>
              </TabList>
              <Pagination />
            </div>
            <TabPanels>
              <TabPanel>
                <div className="w-full h-full">
                  <div className="flex md:flex-row flex-col md:gap-4">
                    <div className="w-full">
                      <div className="relative mt-5 mb-4 overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <thead className="text-sm text-golden-1000 font-inter leading-5 font-normal">
                            <tr>
                              <th scope="col" className="px-4 py-3">
                                #
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-center"
                              >
                                Collection
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-center"
                              >
                                Volume
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-center"
                              >
                                % Change
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-center"
                              >
                                Floor price
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-center"
                              >
                                Sales
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3 text-center"
                              >
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                              <tr key={i} className="text-white text-base font-inter font-semibold leading-6">
                                <td scope="row" className="lg:p-4 p-2 text-sm lg:text-base text-center w-[24px]">
                                  {i}
                                </td>
                                <td className="lg:p-4 p-2 text-sm lg:text-base text-center min-w-[160px]">
                                  <div className="flex justify-center items-center cursor-pointer" onClick={() => router.push('/contract/0x1') }>
                                    <img src={ImageCreator.src} width={60} height={60} className="bg-golden-1200 rounded-lg mr-2" />
                                    <span>Cowboys Wild West</span>
                                    <img className="ml-2" src={ImageVerifiedBadge.src} width={20} height={20} alt="verified" />
                                  </div>
                                </td>
                                <td className="lg:p-4 p-2 text-sm lg:text-base text-center">
                                  11.9 WILD
                                </td>
                                <td className="lg:p-4 p-2 text-sm lg:text-base text-center">
                                  -
                                </td>
                                <td className="lg:p-4 p-2 text-sm lg:text-base text-center">
                                  6.37 WILD
                                </td>
                                <td className="lg:p-4 p-2 text-sm lg:text-base text-center">
                                  1
                                </td>
                                <td className="lg:p-4 p-2 text-sm lg:text-base text-center">
                                  ☆
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

            </TabPanels>
          </TabGroup>
        </div>
      </div>
      <div className="h-[900px] bg-[#1D0B07] blur-[200px] absolute w-1/4 -top-2/3 right-0 z-0"></div>
    </section>
  );
}