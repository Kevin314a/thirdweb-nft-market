'use client'

import { ImageCreator } from '@/assets';
import { XSwiper } from '@/components/base';
import { useWindowResize } from '@/hooks/useWindowResize';
import Image from 'next/image';
import toast from 'react-hot-toast';

const MemecoinsSlider = () => {
  const { viewMode } = useWindowResize();
  return (
    <div className="w-full flex flex-col gap-2 md:gap-4 xl:gap-10">
      {viewMode === "card" ? (
        <>
          <div className="w-full flex flex-col md:flex-row justify-between gap-2 md:gap-4 xl:gap-10">
            <div className="max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-[15px]">
              <div className="relative md:w-1/2 w-full">
                <Image
                  width={222}
                  height={222}
                  src={ImageCreator}
                  className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
                  alt=""
                />
                <div className="absolute left-0 right-0 bottom-2.5">
                  <a
                    // href="#"
                    onClick={() => toast.error("coming soon")}
                    className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
                  Creator: 0a000b
                </span>
                <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
                  Market cap: 50k
                </span>
                <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
                  Ticker: Yeehaw
                </span>
                <p className="text-[15px] font-medium text-white leading-normal">
                  Description:
                  <span className="opacity-70">
                    {" "}
                    Yeehaw is on a mission to take over the Wild West one meme
                    at a time!
                  </span>
                </p>
              </div>
            </div>
            <div className="max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-[15px]">
              <div className="relative md:w-1/2 w-full">
                <Image
                  width={222}
                  height={222}
                  src={ImageCreator}
                  className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
                  alt=""
                />
                <div className="absolute left-0 right-0 bottom-2.5">
                  <a
                    // href="#"
                    onClick={() => toast.error("coming soon")}
                    className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
                  Creator: 0a000b
                </span>
                <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
                  Market cap: 50k
                </span>
                <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
                  Ticker: Yeehaw
                </span>
                <p className="text-[15px] font-medium text-white leading-normal">
                  Description:
                  <span className="opacity-70">
                    {" "}
                    Yeehaw is on a mission to take over the Wild West one meme
                    at a time!
                  </span>
                </p>
              </div>
            </div>
            <div className="max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-[15px]">
              <div className="relative md:w-1/2 w-full">
                <Image
                  width={222}
                  height={222}
                  src={ImageCreator}
                  className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
                  alt=""
                />
                <div className="absolute left-0 right-0 bottom-2.5">
                  <a
                    // href="#"
                    onClick={() => toast.error("coming soon")}
                    className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
                  Creator: 0a000b
                </span>
                <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
                  Market cap: 50k
                </span>
                <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
                  Ticker: Yeehaw
                </span>
                <p className="text-[15px] font-medium text-white leading-normal">
                  Description:
                  <span className="opacity-70">
                    {" "}
                    Yeehaw is on a mission to take over the Wild West one meme
                    at a time!
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between gap-2 md:gap-4 xl:gap-10">
            <div className="max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-[15px]">
              <div className="relative md:w-1/2 w-full">
                <Image
                  width={222}
                  height={222}
                  src={ImageCreator}
                  className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
                  alt=""
                />
                <div className="absolute left-0 right-0 bottom-2.5">
                  <a
                    // href="#"
                    onClick={() => toast.error("coming soon")}
                    className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
                  Creator: 0a000b
                </span>
                <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
                  Market cap: 50k
                </span>
                <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
                  Ticker: Yeehaw
                </span>
                <p className="text-[15px] font-medium text-white leading-normal">
                  Description:
                  <span className="opacity-70">
                    {" "}
                    Yeehaw is on a mission to take over the Wild West one meme
                    at a time!
                  </span>
                </p>
              </div>
            </div>
            <div className="max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-[15px]">
              <div className="relative md:w-1/2 w-full">
                <Image
                  width={222}
                  height={222}
                  src={ImageCreator}
                  className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
                  alt=""
                />
                <div className="absolute left-0 right-0 bottom-2.5">
                  <a
                    // href="#"
                    onClick={() => toast.error("coming soon")}
                    className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
                  Creator: 0a000b
                </span>
                <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
                  Market cap: 50k
                </span>
                <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
                  Ticker: Yeehaw
                </span>
                <p className="text-[15px] font-medium text-white leading-normal">
                  Description:
                  <span className="opacity-70">
                    {" "}
                    Yeehaw is on a mission to take over the Wild West one meme
                    at a time!
                  </span>
                </p>
              </div>
            </div>
            <div className="max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-[15px]">
              <div className="relative md:w-1/2 w-full">
                <Image
                  width={222}
                  height={222}
                  src={ImageCreator}
                  className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
                  alt=""
                />
                <div className="absolute left-0 right-0 bottom-2.5">
                  <a
                    // href="#"
                    onClick={() => toast.error("coming soon")}
                    className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
                  Creator: 0a000b
                </span>
                <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
                  Market cap: 50k
                </span>
                <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
                  Ticker: Yeehaw
                </span>
                <p className="text-[15px] font-medium text-white leading-normal">
                  Description:
                  <span className="opacity-70">
                    {" "}
                    Yeehaw is on a mission to take over the Wild West one meme
                    at a time!
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between gap-2 md:gap-4 xl:gap-10">
            <div className="max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-[15px]">
              <div className="relative md:w-1/2 w-full">
                <Image
                  width={222}
                  height={222}
                  src={ImageCreator}
                  className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
                  alt=""
                />
                <div className="absolute left-0 right-0 bottom-2.5">
                  <a
                    // href="#"
                    onClick={() => toast.error("coming soon")}
                    className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
                  Creator: 0a000b
                </span>
                <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
                  Market cap: 50k
                </span>
                <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
                  Ticker: Yeehaw
                </span>
                <p className="text-[15px] font-medium text-white leading-normal">
                  Description:
                  <span className="opacity-70">
                    {" "}
                    Yeehaw is on a mission to take over the Wild West one meme
                    at a time!
                  </span>
                </p>
              </div>
            </div>
            <div className="max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-[15px]">
              <div className="relative md:w-1/2 w-full">
                <Image
                  width={222}
                  height={222}
                  src={ImageCreator}
                  className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
                  alt=""
                />
                <div className="absolute left-0 right-0 bottom-2.5">
                  <a
                    // href="#"
                    onClick={() => toast.error("coming soon")}
                    className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
                  Creator: 0a000b
                </span>
                <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
                  Market cap: 50k
                </span>
                <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
                  Ticker: Yeehaw
                </span>
                <p className="text-[15px] font-medium text-white leading-normal">
                  Description:
                  <span className="opacity-70">
                    {" "}
                    Yeehaw is on a mission to take over the Wild West one meme
                    at a time!
                  </span>
                </p>
              </div>
            </div>
            <div className="max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-[15px]">
              <div className="relative md:w-1/2 w-full">
                <Image
                  width={222}
                  height={222}
                  src={ImageCreator}
                  className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-[9px] border border-golden-1000"
                  alt=""
                />
                <div className="absolute left-0 right-0 bottom-2.5">
                  <a
                    // href="#"
                    onClick={() => toast.error("coming soon")}
                    className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                  >
                    View
                  </a>
                </div>
              </div>
              <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                <span className="text-[15px] font-semibold block text-golden-1000 leading-[23px]">
                  Creator: 0a000b
                </span>
                <span className="text-[15px] font-semibold block text-golden-100 leading-[23px]">
                  Market cap: 50k
                </span>
                <span className="text-[15px] font-semibold block text-green-1000 leading-[23px]">
                  Ticker: Yeehaw
                </span>
                <p className="text-[15px] font-medium text-white leading-normal">
                  Description:
                  <span className="opacity-70">
                    {" "}
                    Yeehaw is on a mission to take over the Wild West one meme
                    at a time!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <XSwiper
          slidesPerView={{ xs: 1.5, sm: 1.5, md: 2, lg: 3, xl: 4, xxl: 5 }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <XSwiper.SwiperSlide key={i} className='rounded-lg'>
              <div className="md:max-h-[220px] bg-golden-1000/[50%] flex md:flex-row flex-col rounded-lg">
                <div className="relative md:w-1/2 w-full">
                  <Image
                    width={222}
                    height={222}
                    src={ImageCreator}
                    className="w-full h-full md:max-h-full max-h-[250px] bg-cover object-cover rounded-lg border border-golden-1000"
                    alt=""
                  />
                  <div className="absolute left-0 right-0 bottom-2.5">
                    <a
                      // href="#"
                      onClick={() => toast.error("coming soon")}
                      className="text-base h-[30px] mx-auto transition-all ease-out duration-500 hover:bg-golden-1100  max-w-[120px] text-center justify-center font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
                    >
                      View
                    </a>
                  </div>
                </div>
                <div className="px-2 py-3 md:w-1/2 w-full flex-1 md:p-4">
                  <span className="text-base font-semibold block text-golden-1000 pb-1">
                    Creator: 0a000b
                  </span>
                  <span className="text-base font-semibold block text-black-1000 pb-1">
                    Ticker: Yeehaw
                  </span>
                  <span className="text-base md:font-semibold block text-green-1000 pb-1">
                    Market cap: 50k
                  </span>
                  <p className="text-sm md:font-medium text-white leading-normal">
                    Description:
                    <span className="opacity-70">
                      {" "}
                      Yeehaw is on a mission to take over the Wild West one meme
                      at a time!
                    </span>
                  </p>
                </div>
              </div>
            </XSwiper.SwiperSlide>
          ))}
        </XSwiper>
      )}
    </div>
  );
};

export default MemecoinsSlider;
