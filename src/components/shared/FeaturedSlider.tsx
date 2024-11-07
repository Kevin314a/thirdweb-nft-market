'use client'

import { ImagePosse, ImageVerifiedBadge } from '@/assets';
import { XSwiper } from '@/components/base';
import React from 'react';
import Link from 'next/link';
import { PosseBridgeDrop } from '@/lib/types';
import { shortenString } from '@/lib/utils';

const FeaturedSlider = ({
  drops,
}: {
  drops: PosseBridgeDrop[] | null,
}) => {

  return (
    <XSwiper
      slidesPerView={{ xs: 2.2, sm: 2.5, md: 3, lg: 3.2, xl: 4, xxl: 6 }}
      navigation={true}
    >
      {(drops || []).map((drop, i) => (
        <XSwiper.SwiperSlide key={i}>
          <div className="relative group w-full h-full overflow-hidden rounded-[15px] cursor-pointer">
            <div className="w-full">
              <img
                src={!drop.image ? ImagePosse.src : drop.image}
                className="w-full max-h-[299px] object-cover rounded-lg"
                alt="featured-item"
              />
              <div className="absolute bottom-0 w-full h-full group-hover:bg-black/[30%]"> </div>
            </div>
            <div className="absolute bottom-0 w-full p-4 transition-all duration-300 ease-in-out bg-gradient-to-t from-black/[80%] to-transparent">
              <span
                className="flex text-white text-sm sm:text-md md:text-lg md:font-medium flex items-center w-full translate-y-[100px] xl:translate-y-[60px] group-hover:translate-y-0 transition-all duration-300 ease-in-out"
              >
                {drop.name} <img className="ml-2" src={ImageVerifiedBadge.src} style={{ width: '1rem', height: '1rem' }} alt="verified" />
              </span>

              <span
                className="text-white text-sm sm:text-md md:text-lg md:font-medium flex items-center w-full translate-y-[100px] xl:translate-y-[60px] group-hover:translate-y-0 transition-all duration-300 ease-in-out"
              >
                Floor: {(drop.mintStages.length > 0 && drop.mintStages.filter(stage => !isNaN(Number(stage.price))).length > 0) ? (Math.min(...(drop.mintStages.filter(stage => !isNaN(Number(stage.price))).map(stage => Number(stage.price)))).toString()) : 'N/A'} ETH
              </span>

              <div
                className="opacity-0 translate-y-[200px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out gap-4"
              >
                <span className="hidden sm:block text-xs md:text-sm lg:text-md text-white">
                  {shortenString(drop.description, 128)}
                </span>
                <Link
                  href={drop.mintStages.filter(stage => !!stage.isActive).length > 0 ?
                    `/drops/${drop.address}/${drop.mintStages.filter(stage => !!stage.isActive)[0].startAt}` : '#'}
                  className="text-xs md:text-sm lg:text-md whitespace-nowrap text-ellipsis overflow-hidden transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-2"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        </XSwiper.SwiperSlide>
      ))}
    </XSwiper>
  );
};

export default FeaturedSlider;
