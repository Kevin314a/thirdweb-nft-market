'use client'

import { SwiperLeftIcon, SwiperRightIcon } from "@/components/base/Button";
import { DropUpcomingItem } from ".";
import React, { useRef } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const breakpoints = {
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
};

export const DropUpcoming = ({
}: {
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
        spaceBetween={26}
        // slidesPerView={3}
        pagination={{ clickable: true }}
        breakpoints={breakpoints}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <SwiperSlide key={i}>
            <DropUpcomingItem />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="lg:flex justify-between mt-4">
        <SwiperLeftIcon onPrev={handlePrev} />
        <SwiperRightIcon onNext={handleNext} />
      </div>
    </div>
  );
};



