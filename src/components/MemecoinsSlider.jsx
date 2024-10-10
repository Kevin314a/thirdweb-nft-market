'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MemecoinsSlider = () => {

  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="max-w-full mx-auto relative">
  
        <Swiper
          ref={swiperRef}
          spaceBetween={26}
          slidesPerView={3}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },
            480: {
              slidesPerView: 2.2,
            },
          
            1440: {
              slidesPerView: 4.2,
            },
          
          }}
        >
          <SwiperSlide>
          <div className="bg-golden-1000/[50%] flex md:flex-row flex-col  rounded-[15px]">
          <div className="relative md:w-1/2 w-full">
            <Image
             width={222}
             height={222}
              src="/images/creator-img.png"
              className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
              alt=""
            />
            <div className="absolute left-0 right-0 bottom-2.5">
              <a
                href="#"
                className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                View
              </a>
            </div>
          </div>
          <div className="pl-[14px] md:w-1/2 w-full flex-1 pt-[18px] pb-5 md:pb-14 pr-2.5">
            <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
              Creator: 0a000b
            </span>
            <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
              Market cap: 50k
            </span>
            <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
              Ticker: Yeehaw
            </span>
            <p className="text-[15px] font-medium text-white leading-normal">
              Description:
              <span className="opacity-70">
                {" "}
                Yeehaw is on a mission to take over the Wild West one meme
                at a time!
              </span>
            </p>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000/[50%] flex md:flex-row flex-col  rounded-[15px]">
          <div className="relative md:w-1/2 w-full">
            <Image
             width={222}
             height={222}
              src="/images/creator-img.png"
              className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
              alt=""
            />
            <div className="absolute left-0 right-0 bottom-2.5">
              <a
                href="#"
                className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                View
              </a>
            </div>
          </div>
          <div className="pl-[14px] md:w-1/2 w-full flex-1 pt-[18px] pb-5 md:pb-14 pr-2.5">
            <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
              Creator: 0a000b
            </span>
            <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
              Market cap: 50k
            </span>
            <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
              Ticker: Yeehaw
            </span>
            <p className="text-[15px] font-medium text-white leading-normal">
              Description:
              <span className="opacity-70">
                {" "}
                Yeehaw is on a mission to take over the Wild West one meme
                at a time!
              </span>
            </p>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000/[50%] flex md:flex-row flex-col  rounded-[15px]">
          <div className="relative md:w-1/2 w-full">
            <Image
             width={222}
             height={222}
              src="/images/creator-img.png"
              className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
              alt=""
            />
            <div className="absolute left-0 right-0 bottom-2.5">
              <a
                href="#"
                className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                View
              </a>
            </div>
          </div>
          <div className="pl-[14px] md:w-1/2 w-full flex-1 pt-[18px] pb-5 md:pb-14 pr-2.5">
            <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
              Creator: 0a000b
            </span>
            <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
              Market cap: 50k
            </span>
            <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
              Ticker: Yeehaw
            </span>
            <p className="text-[15px] font-medium text-white leading-normal">
              Description:
              <span className="opacity-70">
                {" "}
                Yeehaw is on a mission to take over the Wild West one meme
                at a time!
              </span>
            </p>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000/[50%] flex md:flex-row flex-col  rounded-[15px]">
          <div className="relative md:w-1/2 w-full">
            <Image
             width={222}
             height={222}
              src="/images/creator-img.png"
              className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
              alt=""
            />
            <div className="absolute left-0 right-0 bottom-2.5">
              <a
                href="#"
                className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                View
              </a>
            </div>
          </div>
          <div className="pl-[14px] md:w-1/2 w-full flex-1 pt-[18px] pb-5 md:pb-14 pr-2.5">
            <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
              Creator: 0a000b
            </span>
            <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
              Market cap: 50k
            </span>
            <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
              Ticker: Yeehaw
            </span>
            <p className="text-[15px] font-medium text-white leading-normal">
              Description:
              <span className="opacity-70">
                {" "}
                Yeehaw is on a mission to take over the Wild West one meme
                at a time!
              </span>
            </p>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000/[50%] flex md:flex-row flex-col  rounded-[15px]">
          <div className="relative md:w-1/2 w-full">
            <Image
             width={222}
             height={222}
              src="/images/creator-img.png"
              className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
              alt=""
            />
            <div className="absolute left-0 right-0 bottom-2.5">
              <a
                href="#"
                className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                View
              </a>
            </div>
          </div>
          <div className="pl-[14px] md:w-1/2 w-full flex-1 pt-[18px] pb-5 md:pb-14 pr-2.5">
            <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
              Creator: 0a000b
            </span>
            <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
              Market cap: 50k
            </span>
            <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
              Ticker: Yeehaw
            </span>
            <p className="text-[15px] font-medium text-white leading-normal">
              Description:
              <span className="opacity-70">
                {" "}
                Yeehaw is on a mission to take over the Wild West one meme
                at a time!
              </span>
            </p>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000/[50%] flex md:flex-row flex-col  rounded-[15px]">
          <div className="relative md:w-1/2 w-full">
            <Image
             width={222}
             height={222}
              src="/images/creator-img.png"
              className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
              alt=""
            />
            <div className="absolute left-0 right-0 bottom-2.5">
              <a
                href="#"
                className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                View
              </a>
            </div>
          </div>
          <div className="pl-[14px] md:w-1/2 w-full flex-1 pt-[18px] pb-5 md:pb-14 pr-2.5">
            <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
              Creator: 0a000b
            </span>
            <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
              Market cap: 50k
            </span>
            <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
              Ticker: Yeehaw
            </span>
            <p className="text-[15px] font-medium text-white leading-normal">
              Description:
              <span className="opacity-70">
                {" "}
                Yeehaw is on a mission to take over the Wild West one meme
                at a time!
              </span>
            </p>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000/[50%] flex md:flex-row flex-col  rounded-[15px]">
          <div className="relative md:w-1/2 w-full">
            <Image
             width={222}
             height={222}
              src="/images/creator-img.png"
              className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
              alt=""
            />
            <div className="absolute left-0 right-0 bottom-2.5">
              <a
                href="#"
                className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                View
              </a>
            </div>
          </div>
          <div className="pl-[14px] md:w-1/2 w-full flex-1 pt-[18px] pb-5 md:pb-14 pr-2.5">
            <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
              Creator: 0a000b
            </span>
            <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
              Market cap: 50k
            </span>
            <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
              Ticker: Yeehaw
            </span>
            <p className="text-[15px] font-medium text-white leading-normal">
              Description:
              <span className="opacity-70">
                {" "}
                Yeehaw is on a mission to take over the Wild West one meme
                at a time!
              </span>
            </p>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000/[50%] flex md:flex-row flex-col  rounded-[15px]">
          <div className="relative md:w-1/2 w-full">
            <Image
             width={222}
             height={222}
              src="/images/creator-img.png"
              className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
              alt=""
            />
            <div className="absolute left-0 right-0 bottom-2.5">
              <a
                href="#"
                className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                View
              </a>
            </div>
          </div>
          <div className="pl-[14px] md:w-1/2 w-full flex-1 pt-[18px] pb-5 md:pb-14 pr-2.5">
            <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
              Creator: 0a000b
            </span>
            <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
              Market cap: 50k
            </span>
            <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
              Ticker: Yeehaw
            </span>
            <p className="text-[15px] font-medium text-white leading-normal">
              Description:
              <span className="opacity-70">
                {" "}
                Yeehaw is on a mission to take over the Wild West one meme
                at a time!
              </span>
            </p>
          </div>
        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="bg-golden-1000/[50%] flex md:flex-row flex-col  rounded-[15px]">
          <div className="relative md:w-1/2 w-full">
            <Image
             width={222}
             height={222}
              src="/images/creator-img.png"
              className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
              alt=""
            />
            <div className="absolute left-0 right-0 bottom-2.5">
              <a
                href="#"
                className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                View
              </a>
            </div>
          </div>
          <div className="pl-[14px] md:w-1/2 w-full flex-1 pt-[18px] pb-5 md:pb-14 pr-2.5">
            <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
              Creator: 0a000b
            </span>
            <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
              Market cap: 50k
            </span>
            <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
              Ticker: Yeehaw
            </span>
            <p className="text-[15px] font-medium text-white leading-normal">
              Description:
              <span className="opacity-70">
                {" "}
                Yeehaw is on a mission to take over the Wild West one meme
                at a time!
              </span>
            </p>
          </div>
        </div>
          </SwiperSlide>
          
    
     
    
        </Swiper>

   
        <div className="flex justify-between mt-4">
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

export default MemecoinsSlider;
