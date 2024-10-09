'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedSlider = () => {
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
              slidesPerView: 1,
            },
            425: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <div className="relative">
              <Image
                src="/images/posse.png"
                width={299}
                height={299}
                priority
                className="w-full rounded-[15px]"
                alt=""
              />
              <div className="absolute bottom-7 left-0 right-0">
                <Link
                  href="#"
                  className="text-base transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <Image
                src="/images/azuki.png"
                width={299}
                height={299}
                priority
                className="w-full rounded-[15px]"
                alt=""
              />
              <div className="absolute bottom-7 left-0 right-0">
                <Link
                  href="#"
                  className="text-base transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <Image
                src="/images/collection-3.png"
                width={299}
                height={299}
                priority
                className="w-full rounded-[15px]"
                alt=""
              />
              <div className="absolute bottom-7 left-0 right-0">
                <Link
                  href="#"
                  className="text-base transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <Image
                src="/images/collection-4.png"
                width={299}
                height={299}
                priority
                className="w-full rounded-[15px]"
                alt=""
              />
              <div className="absolute bottom-7 left-0 right-0">
                <Link
                  href="#"
                  className="text-base transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        // Grid for desktop
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 sm:max-w-[700px] grid-cols-1 lg:gap-12 gap-6 lg:max-w-full max-w-[300px] mx-auto">
          <div className="relative">
            <Image
              src="/images/posse.png"
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="text-base transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/azuki.png"
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="text-base transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/collection-3.png"
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="text-base transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/collection-4.png"
              width={299}
              height={299}
              priority
              className="w-full rounded-[15px]"
              alt=""
            />
            <div className="absolute bottom-7 left-0 right-0">
              <Link
                href="#"
                className="text-base transition-all ease-out duration-500 hover:bg-golden-1100 max-w-fit mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedSlider;
