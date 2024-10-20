'use client'
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {useRouter} from "next/navigation";

import sImage from "./carousel.png";

export const XCarousel = () => {
  const router = useRouter();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2.5,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1.5,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 1.5,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      swipeable={true}
      // draggable={true}
      showDots={true}
      infinite={true}
      partialVisible={true}
      dotListClass="custom-dot-list-style"
    >
      {[1,2,3,4,5].map((i) => {
        return (
          <div className="slider cursor-pointer" key={i} onClick={() => router.push('/contract/0x1')}>
            <img src={sImage.src} alt="movie" />
          </div>
        );
      })}
    </Carousel>
  );
};
