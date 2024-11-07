import { Polygon1, Polygon22 } from "@/assets";
import { ReactNode } from "react";
import Image from "next/image";

export default function CreateLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      <div className="relative w-full h-full min-h-[calc(100vh)] pt-24 lg:pt-28 flex items-center justify-center p-2 lg:p-20">
        {children}
      </div>
      <div className="absolute bottom-12 left-0 z-10">
        <Image
          width={145}
          height={312}
          className="w-[145px] h-auto"
          src={Polygon22}
          alt=""
          priority
        />
      </div>
      <div className="absolute top-24 right-0 z-10">
        <Image
          width={220}
          height={328}
          priority
          src={Polygon1}
          alt=""
        />
      </div>
    </>
  );
}