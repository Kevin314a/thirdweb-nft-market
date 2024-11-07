'use client'

import { IconLogo, IconMagnify } from "@/assets";
import { Button, Input } from "@/components/base";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";
import { UserMenu } from ".";
import { MdClose, MdMenu } from "react-icons/md";

export const Navbar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(false);
  const account = useActiveAccount();

  useEffect(() => {
    fetch('/api/save-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountAddr: account?.address || "" }),
    })
      .then((res) => res.json())
      .then((data) => {
      });
  }, [account]);

  const toggleMenu = () => {
    setActive(pre => !pre);
  }

  return (
    <header className="fixed py-2.5 w-[100vw] pr-0 md:pr-3 z-50 top-0 start-0 bg-transparent">
      <nav>
        <div className="max-w-[1920px] px-2 lg:px-6 flex items-center justify-between mx-auto">
          <div className="flex min-w-[120px]">
            <Link href="/home" className="flex items-center relative z-20">
              <img src={IconLogo.src}
                width={175}
                height={64}
                className="w-auto h-[32px] md:min-h-[48px] xl:min-h-[60px] bg-contain px-2 lg:px-0 py-0 md:py-2 lg:-mt-4"
                // className="min-w-[120px] h-auto bg-contain p-2 md:-mt-4"
                alt="Logo"
              />
            </Link>
          </div>
          <div
            className={`${active ? 'active' : ''
              } items-center xxl:pr-[54px] xl:px-8 p-2 lg:px-6 lg:h-auto h-screen justify-between w-full lg:w-3/4 transition-all z-[4998] duration-500 
              lg:static absolute -left-[100%] lg:py-0 top-0 lg:flex lg:w-auto md:order-1 lg:bg-transparent bg-black`}
            id="navbar-sticky"
          >
            <div className="w-full flex justify-between items-center lg:hidden mb-4">
              <img src={IconLogo.src}
                width={175}
                height={64}
                className="w-auto h-[32px] md:min-h-[48px] bg-contain px-2 py-0 md:py-2"
                alt="Logo"
              />
              <Button variant="common" className="border-none" onClick={toggleMenu}><MdClose color="white" size="18" /></Button>
            </div>
            <ul className="flex flex-col rtl:space-x-reverse lg:flex-row p-1 lg:p-0 lg:gap-1">
              {NAV_ITEMS.map((item, i) => (
                <li key={i} className="group relative px-0 py-2 lg:py-4">
                  <Link
                    href={!item.children ? item.href : ""}
                    onClick={() => item.href === "#" ? toast.error("Coming soon...") : toggleMenu()}
                    className={`block px-2.5 transition-all font-medium xxl:text-lg text-base leading-[27px] ${item.href.split('/').at(1) === pathname.split('/').at(1)
                      ? 'text-golden-1100 xxl:text-xl'
                      : 'text-white'
                      } lg:group-hover:text-golden-1000 hover:text-golden-1000`}
                    aria-current="page"
                  >
                    <div className="flex lg:justify-center items-center whitespace-nowrap lg:gap-1">
                      {item.label}
                      {item.children && (
                        <FaChevronDown size={12} className={`${item.href.split('/').at(1) === pathname.split('/').at(1)
                          ? 'text-golden-1100' : 'text-white'
                          } lg:group-hover:text-golden-1000 hover:text-golden-1000`} />
                      )}
                    </div>
                  </Link>
                  {item.children && (
                    <ul className="lg:absolute lg:left-0 lg:mt-4 w-auto ml-4 lg:ml-0 lg:bg-black-1300 text-white shadow-lg lg:rounded-lg text-sm lg:text-base
                    lg:hidden lg:group-hover:block transition duration-300 ease-in-out border-l-2 border-black-1000 lg:border-0">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex} className="lg:border-b lg:border-black-1200 px-4 py-2 lg:p-0">
                          <Link
                            href={child.href}
                            onClick={() => child.href === "#" ? toast.error("Coming soon...") : toggleMenu()}
                            className="block lg:p-4 lg:hover:bg-golden-1300 rounded-lg hover:text-black-1000 lg:hover:text-gray-200 whitespace-nowrap"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full justify-end md:order-2 items-center space-x-1 md:space-x-4 lg:space-x-0 rtl:space-x-reverse relative z-20">
            <div className="flex lg:w-full items-center xxl:gap-8 md:gap-4 gap-2 justify-end">
              <div className="relative xxl:max-w-[507px] lg:max-w-[330px] md:w-full flex justify-center items-center w-8 h-8 border border-golden-1300 rounded-full bg-golden-1300">
                <Input
                  type="text"
                  id="text"
                  className="text-base md:block hidden xl:px-10 pl-10 pr-6"
                  placeholder="Search collections on POSSE"
                  required={true}
                />
                <div className="absolute top-1/2 -translate-y-1/2  md:translate-x-auto -translate-x-1/2 left-1/2 -ml-0.5 md:left-5">
                  <Image
                    width={24}
                    height={24}
                    priority
                    className="w-6 h-6"
                    src={IconMagnify}
                    alt="" />
                </div>
              </div>
              <UserMenu />
            </div>
            <button onClick={toggleMenu}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className={`text-white ${active && 'border-golden-1000 text-golden-1000'} inline-flex items-center focus:text-black !outline-none !ring-0 p-2 justify-center text-sm rounded-lg lg:hidden hover:border-golden-1000 hover:text-golden-1000 focus:outline-none focus:ring-2 focus:ring-gray-200`}
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <MdMenu className="" color="white" size="20" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

const NAV_ITEMS = [
  {
    label: 'Eldorado',
    href: '/market',
    children: [
      {
        label: 'Market',
        href: '/market',
      },
      {
        label: 'NFT Drops',
        href: '/drops',
      },
      {
        label: 'NFT Stats',
        href: '#',
      },
    ],
  },
  {
    label: 'Roundup',
    href: '#',
  },
  {
    label: 'Yeehaw',
    href: '#',
  },
  {
    label: 'Create',
    href: '/create',
    children: [
      {
        label: 'Create an NFT',
        href: '/create/nft',
      },
      {
        label: 'Create a Collection',
        href: '/create/collection',
      },
      {
        label: 'Create an NFT Drop',
        href: '/create/drop',
      },
      {
        label: 'Create a Coin',
        href: '#',
      }
    ]
  },
]