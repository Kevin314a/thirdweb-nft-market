'use client'

import { ImageNFT } from '@/assets';
import { XSwiper } from '@/components/base';
import React from 'react';
import Image from 'next/image';

const LaunchpadSlider = () => {

  return (
    <XSwiper
      slidesPerView={{ xs: 1.5, sm: 1.5, md: 3, lg: 4, xl: 5, xxl: 6 }}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <XSwiper.SwiperSlide key={i} className='rounded-lg'>
          <div className="bg-golden-1000 m-2 shadow-lg shadow-golden-1000/[50%] rounded-lg">
            <div className="relative">
              <Image
                width={240}
                height={162}
                src={ImageNFT}
                className="w-full h-auto rounded-t-[9px]"
                alt=""
              />
              <div className="absolute top-2 left-3">
                <h4 className="text-base font-inter font-medium leading-6 text-white">
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
                  className="text-base text-center transition-all hover:bg-orange-800 flex items-center justify-center text-white font-medium font-poppins h-[30px] max-w-[130px] mx-auto w-full mt-2.5 bg-golden-1200 rounded-[7px]"
                >
                  Mint
                </a>
              </div>
            </div>
          </div>
        </XSwiper.SwiperSlide>
      ))}
    </XSwiper>
  );
};

export default LaunchpadSlider;
