'use client'

import { DropNoneBack, ImageCreator } from "@/assets";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MdNotifications } from "react-icons/md";
import { shortenString } from "@/lib/utils";


export const DropUpcomingItem = ({
}: {
  }) => {
  const router = useRouter();

  return (
    <div className="relative">
      <Image
        src={DropNoneBack}
        priority
        width={709}
        height={409}
        className="w-[calc(100vw)] h-[calc(100vw)] md:w-auto md:h-auto object-cover rounded-[15px]"
        alt="upcomingItem"
      />
      <div className="absolute bottom-0 p-4 w-full">
        <div className="mb-2">
          <Image
            src={ImageCreator}
            priority
            width={48}
            height={48}
            className="object-cover rounded-md"
            alt="upcomingItemIcon"
          />
        </div>
        <div className="flex flex-col w-full mb-8 md:mb-4">
          <div className="text-md text-white">{shortenString('Cowboys & Cowgirls by Chris Hat', 25)}</div>
          <span className="text-xs text-white">By Crowboy Master</span>
          <span className="text-xs text-white">Open edition 0.68 CRO</span>
        </div>
        <div className="text-white">
          <div className="flex flex-col md:flex-row w-full justify-between items-center gap-1">
            <div className="flex flex-row w-full justify-start gap-1">
              <div className="bg-gray-1100 rounded-md p-2 text-xs text-center">4<br />days</div>
              <div className="bg-gray-1100 rounded-md p-2 text-xs text-center">11<br />hours</div>
              <div className="bg-gray-1100 rounded-md p-2 text-xs text-center">41<br />mins</div>
              <div className="bg-gray-1200 rounded-md p-2 text-xs text-center">17<br />secs</div>
            </div>
            <div className="flex flex-row w-full justify-end gap-1">
              <div className="bg-gray-1200 hover:bg-gray-1000 rounded-md p-2 flex justify-center items-center cursor-pointer"><MdNotifications /></div>
              <div className="bg-gray-1300 hover:bg-gray-1000 rounded-md p-2 whitespace-nowrap text-sm cursor-pointer" onClick={() => router.push('/contract/0x1')}>Drop Info</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
