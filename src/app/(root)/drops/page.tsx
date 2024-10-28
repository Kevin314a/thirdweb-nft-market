'use server'

import { DropUpcoming, DropProgressing } from "@/components/Drop";

export default async function DropsPage() {
  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] lg:px-[42px] px-5 mx-auto z-10 relative">
        <h4 className="lg:text-[36px] lg:leading-[75px] text-2xl text-white font-bold">
          <span className="bg-heading-bg  bg-clip-text text-transparent">
            Drops
          </span>
        </h4>
      </div>
      <div className="max-w-[1920px] lg:px-[42px] px-5 mx-auto z-10 relative">
        <DropUpcoming />
      </div>
      <div className="max-w-[1920px] lg:px-[42px] px-5 pt-8 mx-auto z-10 relative">
        <div className="">
          <h2 className="text-[15px] sm:mb-3 font-bold text-white leading-normal sm:text-start text-center mb-10">
            <span className="bg-text-bg  bg-clip-text text-transparent">
              Active & upcoming
            </span>
          </h2>
          <DropProgressing />
        </div>
      </div>
      <div className="h-[900px] bg-[#1D0B07] blur-[200px] absolute w-1/4 -top-2/3 right-0 z-0"></div>
    </section>
  );
}