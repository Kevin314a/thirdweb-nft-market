'use client'

import { PosseBridgeDrop } from "@/lib/types";
import { DropProgressingItem } from ".";
import { useRouter } from "next/navigation";

export const DropProgressing = ({
  items,
  cardType,
}: {
  items: PosseBridgeDrop[],
  cardType: "ACTIVE" | "PAST",
}) => {

  const router = useRouter();

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 lg:gap-4 sm:max-w-full max-w-[300px] mx-auto">
      {items.map((item, i) => (
        <DropProgressingItem drop={item} cardType={cardType} key={i} onClick={() => router.push(`/drops/${item.address}/${item.mintStages[0].startAt}`)} />
      ))}
    </div>
  )
};
