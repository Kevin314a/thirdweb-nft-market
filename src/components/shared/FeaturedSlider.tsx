'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SwiperCore, { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ImageAzuki, ImageCollection3, ImageCollection4, ImagePosse } from '@/assets';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedSlider = () => {

  const swiperRef = useRef<SwiperCore | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="max-w-full mx-auto relative lg:pl-0 pl-3">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={26}
        slidesPerView={3}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 2.2,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 2.8,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3.2,
          },
          1024: {
            slidesPerView: 4.2,
          },
          1440: {
            slidesPerView: 5.2,
          },
        }}
      >
        <SwiperSlide>
          <div className="relative">
            <Image
              src={ImagePosse}
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="md:text-base text-xs transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image
              src={ImageAzuki}
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="md:text-base text-xs transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image
              src={ImageCollection3}
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="md:text-base text-xs transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image
              src={ImageCollection4}
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="md:text-base text-xs transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image
              src={ImageCollection4}
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="md:text-base text-xs transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image
              src={ImageCollection4}
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="md:text-base text-xs transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image
              src={ImageCollection4}
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="md:text-base text-xs transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <Image
              src={ImageCollection4}
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="md:text-base text-xs transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>


      <div className="lg:flex hidden justify-between mt-4">
        <button
          onClick={handlePrev}
          className="bg-golden-1000 text-white px-2.5 py-2 rounded-full hover:bg-golden-1100 transition absolute -translate-y-1/2 top-1/2 -left-4 z-10 duration-300"
        >
          <svg
            stroke="currentColor"
            className="-ml-1"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            color="#f5f3f7"
            width={24}
            height={24}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="bg-golden-1000 text-white px-2.5 py-2 rounded-full hover:bg-golden-1100 transition duration-300 absolute -translate-y-1/2 top-1/2 -right-4 z-10 "
        >
          <svg
            stroke="currentColor"
            className="rotate-180 -mr-1"
            fill="none"
            strokeWidth={2}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            color="#f5f3f7"
            width={24}
            height={24}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>

        </button>
      </div>

    </div>
  );
};

export default FeaturedSlider;
