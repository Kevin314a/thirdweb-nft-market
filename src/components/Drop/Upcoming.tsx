'use client'

import { PosseViewDrop } from "@/lib/types";
import { XSwiper } from "@/components/base";
import { DropUpcomingItem } from ".";

export const DropUpcoming = ({
  items,
}: {
  items: PosseViewDrop[],
}) => {
  
  return (
    <XSwiper>
      {items.map((item, i) => (
        <XSwiper.SwiperSlide key={i}>
          <DropUpcomingItem
            drop={item}
          />
        </XSwiper.SwiperSlide>
      ))}
    </XSwiper>
  );
};