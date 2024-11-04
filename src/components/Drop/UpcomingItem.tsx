'use client'

import { DropNoneBack, ImageCreator } from "@/assets";
import { client } from "@/lib/constants";
import { PosseBridgeDrop } from "@/lib/types";
import { parseRemainTime, shortenString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MdNotifications } from "react-icons/md";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MediaRenderer } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";

export const DropUpcomingItem = ({
  drop,
}: {
  drop: PosseBridgeDrop
}) => {
  const router = useRouter();

  const [remains, setRemains] = useState<{ days: number, hours: number, mins: number, secs: number }>({ days: -1, hours: -1, mins: -1, secs: -1 });

  useEffect(() => {

    const calculate = () => {
      const { remainDays, remainHours, remainMins, remainSecs } = parseRemainTime(drop.mintStages[0].startAt);
      setRemains({
        days: remainDays,
        hours: remainHours,
        mins: remainMins,
        secs: remainSecs
      });
    };

    calculate();
    const intervalId = setInterval(calculate, 1000);
    return () => clearInterval(intervalId);

  }, [drop]);

  const handleDetailDrop = () => {
    router.push(`/drops/${drop.address}/${drop.mintStages[0].startAt}`);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleDetailDrop}>
      {/* <MediaRenderer
        src={!drop.image ? DropNoneBack.src : drop.image}
        client={client}
        className="object-cover object-center min-w-[709px] min-h-[409px] rounded-lg"
        alt="upcomingItem"
        style={{ objectFit: 'cover' }}
      /> */}
      <img
        src={!drop.image ? DropNoneBack.src : drop.image}
        className="w-[calc(100vw)] h-[calc(100vw)] md:w-full md:h-[409px] object-cover rounded-lg"
        alt="upcomingItem"
      />
      <div className="absolute bottom-0 p-4 lg:py-8 w-full">
        <div className="mb-2 lg:mb-4">
          <Image
            src={ImageCreator}
            priority
            width={48}
            height={48}
            className="object-cover rounded-md w-12 h-12 xl:w-16 xl:h-16"
            alt="upcomingItemIcon"
          />
        </div>
        <div className="flex flex-col w-full mb-4 lg:mb-8">
          <span className="text-md lg:text-xl text-white text-stroke-2">{shortenString(drop.name, 25)}</span>
          <span className="text-xs lg:text-md text-white text-stroke-2">{shortenAddress(drop.owner)}</span>
          <span className="text-xs lg:text-md text-white text-stroke-2">{`${drop.group === 'LIMITED' ? "Limited Edition" : "Open Edition"}: ${drop.mintStages[0].price} ${drop.mintStages[0].currency}`}</span>
        </div>
        <div className="text-white">
          <div className="flex flex-col md:flex-row w-full justify-between items-center gap-1">
            <div className="flex flex-row w-full justify-start gap-1">
              <div className="bg-gray-1100 rounded-md p-2 text-xs text-center">{remains.days === -1 ? "N/A" : remains.days}<br />{'days'}</div>
              <div className="bg-gray-1100 rounded-md p-2 text-xs text-center">{remains.hours === -1 ? "N/A" : remains.hours}<br />{'hours'}</div>
              <div className="bg-gray-1100 rounded-md p-2 text-xs text-center">{remains.mins === -1 ? "N/A" : remains.mins}<br />{'mins'}</div>
              <div className="bg-gray-1200 rounded-md p-2 text-xs text-center">{remains.secs === -1 ? "N/A" : remains.secs}<br />{'secs'}</div>
            </div>
            <div className="flex flex-row w-full justify-end gap-1">
              <div className="bg-gray-1200 hover:bg-gray-1000 rounded-md p-2 flex justify-center items-center cursor-pointer"><MdNotifications /></div>
              <div
                className="bg-gray-1300 hover:bg-gray-1000 rounded-md p-2 whitespace-nowrap text-sm cursor-pointer"
                onClick={handleDetailDrop}
              >
                Drop Info
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
