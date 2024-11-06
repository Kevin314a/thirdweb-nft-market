'use client'

import { NFTPricedBox } from "@/components/NFT";
import { ImageProfileBack, ImageHat, ImagePossef } from "@/assets";
import { MdLanguage, MdMoreHoriz } from "react-icons/md";
import { IoBarChart, IoStar, IoShareSocial } from "react-icons/io5";
import { useRouter, notFound } from "next/navigation";

export default function ContractPage({
  params,
}) {
  const { addr: accountAddress } = params;
  const router = useRouter();

  if (!accountAddress) return notFound();
  return (
    <>
      <section className="relative block h-[350px] lg:h-[500px]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${ImageProfileBack.src})` }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex lg:w-1/2 w-full md:justify-between items-center justify-center md:flex-row flex-col mx-16">
              <span className="md:text-6xl text-3xl text-white">Posse</span>
              <img src={ImageHat.src} className="md:w-[12rem] w-[8rem]" />
              <span className="md:text-6xl text-3xl text-white">Soneium</span>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-16">
        <div className="max-w-[1920px] px-6 lg:px-10 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full shadow-xl -mt-16">
            <div className="flex flex-wrap justify-center">
              <div className="w-full">
                <div className="relative">
                  <img
                    alt="..."
                    src={ImagePossef.src}
                    className="shadow-xl h-auto rounded-lg border-4 border-[#C3976A] absolute -m-16 -mt-16 lg:-mt-28 ml-0 max-w-[100px] lg:max-w-[150px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap mt-16">
              <div className="flex w-full flex-row justify-between items-center gap-2">
                <span className="text-white text-3xl font-medium">Posse</span>
                <div className="flex gap-3">
                  <MdLanguage color="white" />
                  <IoBarChart color="white" />
                  <IoStar color="white" />
                  <IoShareSocial color="white" />
                  <MdMoreHoriz color="white" />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-col md:flex-row mt-8 md:mt-4 gap-1 md:gap-6 flex-start">
                  <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
                    <span className="text-sm mr-1">Items</span>
                    <span className="font-medium">1,555</span>
                  </div>
                  <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
                    <span className="text-sm mr-1">Created</span>
                    <span className="font-medium">Jul,2023</span>
                  </div>
                  <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
                    <span className="text-sm mr-1">Creator earnings</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
                    <span className="text-sm mr-1">Chain</span>
                    <span className="font-medium">Cronos</span>
                  </div>
                  <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
                    <span className="text-sm mr-1">Category</span>
                    <span className="font-medium">PFP</span>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row mt-8 lg:mt-16 gap-1 md:gap-6 flex-start">
                  <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 items-center text-white text-xl">
                    <span className="text-sm md:text-lg font-medium whitespace-nowrap">20 CRO</span>
                    <span className="text-sm">Total volume</span>
                  </div>
                  <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
                    <span className="text-sm md:text-lg font-medium whitespace-nowrap">0.09 CRO</span>
                    <span className="text-sm">Floor price</span>
                  </div>
                  <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
                    <span className="text-sm md:text-lg font-medium whitespace-nowrap">0.08 CRO</span>
                    <span className="text-sm">Best offer</span>
                  </div>
                  <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
                    <span className="text-sm md:text-lg font-medium whitespace-nowrap">20%</span>
                    <span className="text-sm">Listed</span>
                  </div>
                  <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
                    <span className="text-sm md:text-lg font-medium whitespace-nowrap">821</span>
                    <span className="text-sm">Owners</span>
                  </div>
                  <div className="flex flex-row w-full justify-between md:justify-start md:flex-col gap-2 md:items-start items-center text-white text-xl">
                    <span className="text-sm md:text-lg font-medium whitespace-nowrap">10%</span>
                    <span className="text-sm">Unique owners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:mt-16">
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                <NFTPricedBox
                  key={i}
                  onDetail={() => router.push('/contract/0x1/token/0x1')}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
