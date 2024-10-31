'use client'

import { PosseBridgeDrop } from "@/lib/types";
import { XSwiper } from "@/components/base";
import { DropUpcomingItem } from ".";

export const DropUpcoming = ({
  items,
}: {
  items: PosseBridgeDrop[],
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