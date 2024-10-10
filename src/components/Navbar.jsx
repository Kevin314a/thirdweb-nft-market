'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react'

export const Navbar = () => {
    const [active, setActive] = useState(0);


    function toggleMenu() {
      setActive(pre=> !pre);
    }


  return (
    <>
  <header className="fixed py-2.5 w-full z-50 top-0 start-0 bg-black">
    <nav>
      <div className="max-w-[1920px] px-6 flex items-center justify-between mx-auto">
        <Link href="#" className="flex items-center relative z-20">
          <Image src="images/logo.svg"  
          width={120}
          height={64}       
          priority 
          className="min-w-[120px] h-auto bg-contain" alt="Logo" />
        </Link>
        <div className="flex w-full justify-end md:order-2 items-center space-x-3 md:space-x-0 rtl:space-x-reverse relative z-20">
          <div className="flex lg:w-full items-center xxl:gap-10 gap-5 justify-end">
            <div className="relative xxl:max-w-[507px] lg:max-w-[330px] md:w-full flex justify-center items-center w-8 h-8 border border-golden-1300 rounded-full bg-golden-1300">
              <input
                type="text"
                id="text"
                className="text-base md:block hidden w-full text-white hover:border-golden-1000 focus:border-golden-1000 outline-none font-poppins font-normal py-2 xl:px-10 pl-10 pr-6 placeholder:text-gray-1000 border border-golden-1300 rounded-lg bg-golden-1300 "
                placeholder="Search collections"
                required=""
              />
              <div className="absolute top-1/2 -translate-y-1/2  md:translate-x-auto -translate-x-1/2 left-1/2 -ml-0.5 md:left-5">
                <Image 
                width={24}
                height={24}
                priority
                className="w-6 h-6"
                src="images/magnify.svg" 
                alt="" />
              </div>
            </div>
            <Link href="#"
              className="xxl:text-base md:min-w-[180px] text-sm whitespace-nowrap transition-all ease-out duration-500 hover:bg-golden-1100 font-medium text-white inline-flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-3 gap-2">
              <img src="images/wallet.svg" alt="" />
              <span className="hidden md:block">Connect Wallet</span>
            </Link>
          </div>
          <button onClick={toggleMenu}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className={`${active && 'bg-gray-100'} inline-flex items-center !outline-none !ring-0 !ml-3 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div className={`${active?'active': ''} items-center xxl:pr-[54px] xl:pr-8 xl:pl-8 px-6 lg:h-auto h-screen justify-between w-3/4 transition-all z-10 duration-500 lg:static absolute -left-[100%] py-6 lg:py-0 top-20  lg:flex lg:w-auto md:order-1 lg:bg-transparent bg-black`} id="navbar-sticky">
          <ul className="flex flex-col rtl:space-x-reverse lg:flex-row gap-5 lg:gap-1 ">
            <li>
              <Link
                href="#"
                className="block px-2.5 transition-all hover:text-golden-1000 text-white font-medium xxl:text-lg text-base leading-[27px]"
                aria-current="page"
              >
                Marketplace
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-2.5 transition-all hover:text-golden-1000 text-white font-medium xxl:text-lg text-base leading-[27px]"
                aria-current="page"
              >
                DEX
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-2.5 transition-all hover:text-golden-1000 text-white font-medium xxl:text-lg text-base leading-[27px]"
                aria-current="page"
              >
                Yeehaw
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-2.5 transition-all hover:text-golden-1000 text-white font-medium xxl:text-lg text-base leading-[27px]"
                aria-current="page"
              >
                Drops
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block px-2.5 transition-all hover:text-golden-1000 text-white font-medium xxl:text-lg text-base leading-[27px]"
                aria-current="page"
              >
                Stats
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</>


  )
}
