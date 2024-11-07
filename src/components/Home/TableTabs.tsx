'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { XSwiper } from '@/components/base';
import { ImageCowboy } from '@/assets';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useWindowResize } from '@/hooks/useWindowResize';

export const TableTabs = () => {

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { viewMode } = useWindowResize();

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <TabGroup className="w-full">
      <div className="w-full flex items-center md:flex-row flex-col gap-4 justify-between">
        <TabList className="flex rounded-[10px]">
          <Tab className="inline-block bg-bg-btn outline-none data-[selected]:bg-golden-1000 rounded-[10px] py-2 px-4 text-sm lg:text-lg md:font-medium text-white">
            Top
          </Tab>
          <Tab className="inline-block -ml-2.5 bg-bg-btn outline-none data-[selected]:bg-golden-1000 pl-5 rounded-[10px] py-2 px-4 text-sm lg:text-lg md:font-medium text-white">
            Trending
          </Tab>
          <select
            defaultValue={"Currency"}
            id="countries"
            className="text-sm lg:text-lg ml-[28px] md:hidden block md:font-semibold outline-none text-white rounded-[10px] bg-golden-1000 py-[7px] px-3 !pr-10"
          >
            <option disabled>Currency</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </TabList>
        <div className="flex items-center md:flex-row flex-col gap-4 overflow-auto">
          <div className="flex items-center w-full rounded-lg bg-golden-1000/[30%]">
            <a onClick={() => handleClick(0)}
              // href="#"
              className={`${activeIndex === 0 ? 'bg-golden-1000' : ''}` + " text-base transition-all hover:bg-golden-1000 rounded-lg font-inter  font-medium leading-6 block py-2 px-[13.5px] text-white"}
            >
              10m
            </a>
            <a onClick={() => handleClick(1)}
              // href="#"
              className={`${activeIndex === 1 ? 'bg-golden-1000' : ''}` + " text-base transition-all hover:bg-golden-1000 rounded-lg font-inter font-medium leading-6 block py-2 px-[13.5px] text-white"}
            >
              1h
            </a>
            <a onClick={() => handleClick(2)}
              // href="#"
              className={`${activeIndex === 2 ? 'bg-golden-1000' : ''}` + " text-base transition-all hover:bg-golden-1000 rounded-lg font-inter  font-medium leading-6 block py-2 px-[13.5px] text-white"}
            >
              6h
            </a>
            <a onClick={() => handleClick(3)}
              // href="#"
              className={`${activeIndex === 3 ? 'bg-golden-1000' : ''}` + " text-base transition-all hover:bg-golden-1000 rounded-lg font-inter  font-medium leading-6 block py-2 px-[13.5px] text-white"}
            >
              24h
            </a>
            <a onClick={() => handleClick(4)}
              // href="#"
              className={`${activeIndex === 4 ? 'bg-golden-1000' : ''}` + " text-base transition-all hover:bg-golden-1000 rounded-lg font-inter  font-medium leading-6 block py-2 px-[13.5px] text-white"}
            >
              7d
            </a>
            <a onClick={() => handleClick(5)}
              // href="#"
              className={`${activeIndex === 5 ? 'bg-golden-1000' : ''}` + " text-base transition-all hover:bg-golden-1000 rounded-lg font-inter  font-medium leading-6 block py-2 px-[13.5px] text-white"}
            >
              30d
            </a>
            <a onClick={() => handleClick(6)}
              // href="#"
              className={`${activeIndex === 6 ? 'bg-golden-1000' : ''}` + " text-base transition-all hover:bg-golden-1000 rounded-lg font-inter  font-medium leading-6 block py-2 px-[13.5px] text-white"}
            >
              All
            </a>
          </div>
          <select
            defaultValue={"Currency"}
            id="countries1"
            className="text-base md:block hidden font-semibold outline-none text-white rounded-[10px] bg-golden-1000 py-[7px] px-3 !pr-10"
          >
            <option disabled>Currency</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>

        </div>
      </div>
      <TabPanels>
        <TabPanel>
          <div className="w-full h-full py-4 lg:py-8 overflow-x-auto">
            {viewMode === "card" ? (
              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-16">
                <MockData type="TOP" page={0} />
                <MockData type="TOP" page={1} />
              </div>
            ) : (
              <XSwiper
                slidesPerView={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
              >
                {[0, 1].map(page => (
                  <XSwiper.SwiperSlide key={page} className='rounded-lg'>
                    <MockData key={page} type="TOP" page={page} />
                  </XSwiper.SwiperSlide>
                ))}
              </XSwiper>
            )}
            <a
              onClick={() => toast.error("coming soon")}
              className="mt-2 text-sm p-2 md:text-base transition-all whitespace-nowrap ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex lg:hidden items-center rounded-lg bg-golden-1000 border border-golden-1000 md:p-[7px] md:px-[14px] gap-2"
            >
              See All
            </a>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="w-full h-full py-4 lg:py-8 overflow-x-auto">
            {viewMode === "card" ? (
              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-16">
                <MockData type="TRENDING" page={0} />
                <MockData type="TRENDING" page={1} />
              </div>
            ) : (
              <XSwiper
                slidesPerView={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
              >
                {[0, 1].map(page => (
                  <XSwiper.SwiperSlide key={page} className='rounded-lg'>
                    <MockData key={page} type="TRENDING" page={page} />
                  </XSwiper.SwiperSlide>
                ))}
              </XSwiper>
            )}
            <a
              onClick={() => toast.error("coming soon")}
              className="mt-2 text-sm p-2 md:text-base transition-all whitespace-nowrap ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex lg:hidden items-center rounded-lg bg-golden-1000 border border-golden-1000 md:p-[7px] md:px-[14px] gap-2"
            >
              See All
            </a>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}

const MockData = ({
  type,
  page
}: {
  type: "TOP" | "TRENDING",
  page: number
}) => {

  return (
    <div className="w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-golden-1000 font-inter leading-5 font-normal">
          <tr>
            <th scope="col" className="lg:p-4 p-1 lg:text-center">
              Rank
            </th>
            <th scope="col" className="lg:p-4 p-1 text-center">
              Collection
            </th>
            <th scope="col" className="lg:p-4 p-1 text-center">
              Floor Price
            </th>
            <th scope="col" className="lg:p-4 p-1 text-center">
              Volume
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map(i => (
            <tr key={i} className="text-white text-base font-inter font-medium leading-6">
              <th scope="row" className="lg:p-3 p-1">
                <div className="flex items-center md:gap-[22px] gap-4">
                  <span className="font-semibold text-xl md:text-2xl leading-7 text-golden-1000  max-w-[16px] w-full">
                    {page * 5 + i}
                  </span>
                  <img
                    src={ImageCowboy.src}
                    width={40}
                    height={40}
                    className="w-[32px] lg:w-[40px] rounded-lg"
                    alt=""
                  />
                </div>
              </th>
              <td className="lg:p-4 p-1 text-sm lg:text-base text-center">Posse</td>
              <td className="lg:p-4 p-1 text-sm lg:text-base text-center">
                250 WILD
              </td>
              <td className="lg:p-4 p-1 text-sm lg:text-base text-center">
                1,200 ETH
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};