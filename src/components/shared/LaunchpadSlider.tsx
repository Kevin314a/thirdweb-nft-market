'use client'
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LaunchpadSlider = () => {

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
    <div className="max-w-full mx-auto relative lg:pl-0 pl-3">
  
        <Swiper
           ref={swiperRef}
          spaceBetween={26}
          slidesPerView={3}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween:15,
            },
            480: {
              slidesPerView: 2.2,
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

export default LaunchpadSlider;
