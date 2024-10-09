'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MarketMoversSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023); 
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="max-w-full mx-auto">
      {isMobile ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },
            480: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 3.2,
            },
          }}
        >
          <SwiperSlide>
          <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
          </SwiperSlide>
    
        </Swiper>
      ) : (
        // Grid for desktop
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 lg:gap-10 sm:max-w-full max-w-[300px] mx-auto">
        <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-golden-1000 drop-shadow-3xl rounded-[9px]">
          <div className="relative">
            <Image
            width={240}
            height={162}
              src="/images/nft-img.png"
              className="w-full h-auto rounded-t-[9px]"
              alt=""
            />
            <div className="absolute top-2 left-3">
              <h4 className="text-base font-inter font-medium leading-6 text-white">
                Posse V1
              </h4>
            </div>
          </div>
          <div className="py-[14px] flex items-center gap-7 justify-center">
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                Floor
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                <span className="font-semibold">1k</span>
                WILD
              </p>
            </div>
            <div className="text-center">
              <h6 className="font-inter mb-0.5 text-sm font-normal leading-5 text-golden-1100">
                24h Vol
              </h6>
              <p className="text-base font-inter text-white leading-[22.6px] font-normal">
                300%
              </p>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default MarketMoversSlider;
