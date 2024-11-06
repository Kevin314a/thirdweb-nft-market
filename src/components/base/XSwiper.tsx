'use client'

import React, { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const XSwiper = ({
  children,
  slidesPerView,
  spaceBetween,
  pagination,
  navigation,
}: {
  children: ReactNode;
  slidesPerView?: { xs: number, sm: number, md: number, lg: number, xl: number, xxl: number },
  spaceBetween?: { xs: number, sm: number, md: number, lg: number, xl: number, xxl: number },
  pagination?: boolean;
  navigation?: boolean;
}) => {

  const breakpoint = {
    320: {
      slidesPerView: slidesPerView?.xs || 1,
      spaceBetween: spaceBetween?.xs || 8,
    },
    480: {
      slidesPerView: slidesPerView?.sm || 1,
      spaceBetween: spaceBetween?.sm || 12,
    },
    768: {
      slidesPerView: slidesPerView?.md || 1.7,
      spaceBetween: spaceBetween?.md || 16,
    },
    1024: {
      slidesPerView: slidesPerView?.lg || 2.2,
      spaceBetween: spaceBetween?.lg || 20,
    },
    1440: {
      slidesPerView: slidesPerView?.xl || 12.7,
      spaceBetween: spaceBetween?.xl || 24,
    },
    2560: {
      slidesPerView: slidesPerView?.xxl || 3.5,
      spaceBetween: spaceBetween?.xxl || 32,
    },
  };

  return (
    <div className="max-w-full mx-auto relative pl-0">
      <Swiper
        navigation={!!navigation}
        pagination={{ clickable: true }}
        breakpoints={breakpoint}
        modules={[Navigation].concat(!!pagination ? [Pagination] : [])}
      >
        {children}
      </Swiper>
    </div>
  );
};


XSwiper.SwiperSlide = SwiperSlide;

export { XSwiper };
