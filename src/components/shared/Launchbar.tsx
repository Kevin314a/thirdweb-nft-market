'use client'

import { IconLogo, IconWallet } from "@/assets";
import { Button } from "@/components/base";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export const Launchbar = () => {
  const [active, setActive] = useState<boolean>(false);

  const toggleMenu = () => {
    setActive(pre => !pre);
  }

  return (
    <header className="fixed md:px-10 lg:px-0 xl:px-20 py-2.5 w-[100vw] z-50 top-0 start-0 bg-transparent">
      <nav>
        <div className="max-w-[1920px] px-2 lg:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center relative z-20">
            <img src={IconLogo.src}
              width={175}
              height={64}
              className="w-auto h-[40px] sm:h-[48px] lg:h-[60px] bg-contain p-1"
              alt="Logo"
            />
          </Link>
          <div className="flex flex-row gap-2">
            <div className="flex justify-end md:order-2 items-center space-x-3 md:space-x-0 rtl:space-x-reverse relative z-20">
              <div className="flex lg:w-full items-center xxl:gap-10 gap-3 justify-end">
                <Link href="/home">
                  <Button
                    type="button"
                  >
                    <img src={IconWallet.src} alt="" />
                    Launch App
                  </Button>
                </Link>
              </div>
              <button onClick={toggleMenu}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className={`${active && 'bg-gray-100 text-black'} inline-flex items-center  focus:text-black !outline-none  text-white !ring-0 !ml-3 p-2 w-8 h-8 justify-center text-sm rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
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
            <div
              className={`${active ? 'active' : ''
                } items-center xxl:pr-[54px] xl:pr-8 xl:pl-8 px-6 lg:h-auto h-screen justify-end w-3/4 transition-all z-10 duration-500 lg:static absolute -left-[100%] py-6 lg:py-0 top-16 lg:flex lg:w-auto md:order-1 lg:bg-transparent bg-black`}
              id="navbar-sticky"
            >
              <ul className="flex flex-col rtl:space-x-reverse lg:flex-row gap-5 lg:gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <li key={i} className="group relative py-4">
                    <Link
                      href={item.href}
                      target="_blank"
                      onClick={() => item.href === "#" && toast.error("Coming soon...")}
                      className={`block px-2.5 transition-all font-medium xxl:text-lg text-base leading-[27px] text-white group-hover:text-golden-1000 hover:text-golden-1000`}
                      aria-current="page"
                    >
                      <div className="flex justify-center items-center whitespace-nowrap gap-1">
                        {item.label}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

const NAV_ITEMS = [
  {
    label: 'Community',
    href: 'https://discord.gg/possestudios',
  },
  {
    label: 'Merch',
    href: 'https://possehq.shop/',
  },
  {
    label: 'Docs',
    href: 'https://docs.possehq.org/',
  },
  {
    label: 'Info',
    href: 'https://possestudios.info/ ',
  },
]