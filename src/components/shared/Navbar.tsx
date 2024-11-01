'use client'

import { IconLogo, IconMagnify } from "@/assets";
import { Input } from "@/components/base";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

import { ConnectButton } from "./ConnectButton";
import { ProfileMenu } from "./ProfileMenu";
import toast from "react-hot-toast";

export const Navbar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(false);
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  // useEffect(() => {
  //   fetch('/api/save-user', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ wallet: account?.address || "" }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //     });
  // }, [account]);

  const toggleMenu = () => {
    setActive(pre => !pre);
  }

  return (
    <header className="fixed py-2.5 w-[100vw] pr-3 z-50 top-0 start-0 bg-black">
      <nav>
        <div className="max-w-[1920px] px-2 lg:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center relative z-20">
            <img src={IconLogo.src}
              width={120}
              height={64}
              className="min-w-[120px] h-auto bg-contain"
              alt="Logo"
            />
          </Link>
          <div className="flex w-full justify-end md:order-2 items-center space-x-3 md:space-x-0 rtl:space-x-reverse relative z-20">
            <div className="flex lg:w-full items-center xxl:gap-10 gap-3 justify-end">
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
              {account && wallet ? (
                <ProfileMenu address={account.address} wallet={wallet} />
              ) : (
                <ConnectButton />
              )}
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
              } items-center xxl:pr-[54px] xl:pr-8 xl:pl-8 px-6 lg:h-auto h-screen justify-between w-3/4 transition-all z-10 duration-500 lg:static absolute -left-[100%] py-6 lg:py-0 top-20 lg:flex lg:w-auto md:order-1 lg:bg-transparent bg-black`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col rtl:space-x-reverse lg:flex-row gap-5 lg:gap-1">
              {NAV_ITEMS.map((item, i) => (
                <li key={i} className="group relative py-4">
                  <Link
                    href={item.href}
                    onClick={() => item.href === "#" && toast.error("coming soon")}
                    className={`block px-2.5 transition-all font-medium xxl:text-lg text-base leading-[27px] ${item.href.split('/').at(1) === pathname.split('/').at(1)
                      ? 'text-golden-1100 xxl:text-xl'
                      : 'text-white'
                      } group-hover:text-golden-1000 hover:text-golden-1000`}
                    aria-current="page"
                  >
                    <div className="flex justify-center items-center whhitespace-nowrap gap-1">
                      {item.label}
                      {item.children && (
                        <FaChevronDown size={12} className={`${item.href.split('/').at(1) === pathname.split('/').at(1)
                        ? 'text-golden-1100' : 'text-white'
                        } group-hover:text-golden-1000 hover:text-golden-1000`} />
                      )}
                    </div>
                  </Link>
                  {item.children && (
                    <ul className="absolute left-0 mt-4 w-auto bg-black-1300 text-white shadow-lg rounded-lg hidden group-hover:block transition duration-300 ease-in-out">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex} className="border-b border-black-1200">
                          <Link
                            href={child.href}
                            className="block p-4 hover:bg-golden-1300 rounded-lg hover:text-gray-200 whitespace-nowrap"
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
        </div>
      </nav>
    </header>
  )
}

const NAV_ITEMS = [
  {
    label: 'Eldorado',
    href: '/market',
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
    label: 'Drops',
    href: '/drops',
    children: [
      {
        label: 'Create Drops',
        href: '/create/drop',
      },
      {
        label: 'Studio',
        href: '/studio',
      },
    ]
  },
  {
    label: 'Stats',
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
    ]
  },
]