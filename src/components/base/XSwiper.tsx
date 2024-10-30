'use client'

import React, { ReactNode, useRef } from 'react';
import classNames from "classnames";
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const breakpoints = {
  large: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 1.7,
    },
    1024: {
      slidesPerView: 2.2,
    },
    1440: {
      slidesPerView: 2.7,
    },
    2560: {
      slidesPerView: 3.5,
    },
  },
  medium: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 1.7,
    },
    1024: {
      slidesPerView: 2.2,
    },
    1440: {
      slidesPerView: 2.7,
    },
    2560: {
      slidesPerView: 3.5,
    },
  },
  small: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 1.7,
    },
    1024: {
      slidesPerView: 2.2,
    },
    1440: {
      slidesPerView: 2.7,
    },
    2560: {
      slidesPerView: 3.5,
    },
  }
};

const XSwiper = ({
  children,
  slidesPerView,
  spaceBetween,
  breakpoint,
}: {
  children: ReactNode;
  slidesPerView?: number,
  spaceBetween?: number,
  breakpoint?: "large" | "medium" | "small",
}) => {
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
    <div className="max-w-full mx-auto relative pl-0">
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={spaceBetween || 26}
        slidesPerView={slidesPerView || 3}
        pagination={{ clickable: true }}
        breakpoints={breakpoint ? breakpoints[breakpoint] : breakpoints['medium']}
      >
        {children}
      </Swiper>
      <div className="lg:flex justify-between mt-4">
        <SwiperLeftIcon onPrev={handlePrev} />
        <SwiperRightIcon onNext={handleNext} />
      </div>
    </div>
  );
};


const SwiperLeftIcon = ({
  onPrev,
}: {
  onPrev: () => void,
}) => {
  return (
    <button
      onClick={onPrev}
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
  );
};

const SwiperRightIcon = ({
  onNext,
}: {
  onNext: () => void,
}) => {
  return (
    <button
      onClick={onNext}
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
  );
};

XSwiper.SwiperSlide = SwiperSlide;

export { XSwiper };
