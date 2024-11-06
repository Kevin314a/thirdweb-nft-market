import React from "react";
import { IconFooterLogo } from "@/assets";
import { IoLogoYoutube } from "react-icons/io5";
import { FaTelegramPlane, FaDiscord, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="md:pt-16 relative z-10">
      <div className="max-w-[1920px] px-6 lg:px-10 mx-auto">
        <div className="flex lg:flex-row flex-col align-items-center">
          <div className="lg:w-1/3 w-full lg:mr-6 lg:pr-4">
            <div className="">
              <img src={IconFooterLogo.src} alt="" className='-ml-5' />
              <div className="flex flex-col-reverse lg:flex-col -mt-20 lg:mt-0">
                <p className="xl:text-lg pt-4 md:pt-0 mt-4 lg:mt-2 mb-4 lg:mb-[60px] text-white font-normal leading-[27px]">
                  Posse Studios, the development arm behind the Posse ecosystem, is a
                  software company specializing in blockchain and gaming technologies.
                  The Posse mission is to expand decentralized technologies through
                  modern innovation, inclusivity, and, most importantly, fun!
                </p>
                <ul className="flex items-center lg:justify-start justify-between lg:gap-[52px] ml-20 md:ml-36 lg:ml-0">
                  <li>
                    <a
                      href="https://twitter.com/possestudio"
                      target="_blank"
                      className="md:scale-100 scale-75 bg-golden-1000 rounded-full flex items-center justify-center w-12 h-12 md:w-16 md:h-16"
                    >
                      <FaTwitter size="32" color="white" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/possestudios"
                      target="_blank"
                      className="md:scale-100 scale-75 bg-golden-1000 rounded-full flex items-center justify-center w-12 h-12 md:w-16 md:h-16"
                    >
                      <FaDiscord size="32" color="white" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://t.me/possestudiosannouncements"
                      target="_blank"
                      className="md:scale-100 scale-75 bg-golden-1000 rounded-full flex items-center justify-center w-12 h-12 md:w-16 md:h-16"
                    >
                      <FaTelegramPlane size="32" color="white" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://m.youtube.com/@possestudiohq"
                      target="_blank"
                      className="md:scale-100 scale-75 bg-golden-1000 rounded-full flex items-center justify-center w-12 h-12 md:w-16 md:h-16"
                    >
                      <IoLogoYoutube size="32" color="white" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 w-full">
            <div className="flex mt-0 lg:flex-nowrap flex-wrap justify-start md:justify-between xl:gap-12 lg:gap-8 space-y-8">
              <div className="w-1/2 md:w-auto lg:w-auto mt-8">
                <h4 className="lg:text-2xl text-lg lg:mb-20 md:mb-2 pb-4 leading-9 text-white font-medium ">
                  Marketplace
                </h4>
                <ul>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Partners
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Categories
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Collections
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Getting Listed
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 md:w-auto lg:w-auto">
                <h4 className="lg:text-2xl text-lg lg:mb-20 md:mb-2 pb-4 leading-9 text-white font-medium ">
                  Exchange
                </h4>
                <ul>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Swap
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Pools
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Farm
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Stake
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 md:w-auto lg:w-auto">
                <h4 className="lg:text-2xl text-lg lg:mb-20 md:mb-2 pb-4 leading-9 text-white font-medium ">
                  Community
                </h4>
                <ul>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Documents
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 md:w-auto lg:w-auto">
                <h4 className="lg:text-2xl text-lg lg:mb-20 md:mb-2 pb-4 leading-9 text-white font-medium ">
                  Learn
                </h4>
                <ul>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      What Is DeFi?
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      What Are NFTs?
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      What Is GameFi?
                    </a>
                  </li>
                  <li>
                    <a
                      // href="#"
                      className="block md:mb-4 mb-2 lg:text-lg text-base text-white leading-[27px] font-normal"
                    >
                      What is SocialFi?
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center lg:mt-[74px] mt-8 border-t md:py-9 py-5 border-white">
          <p className="lg:text-xl md:text-base text-sm  text-white font-light leading-[30px]">
            All Right Reserved © Posse Ltd 2024
          </p>
        </div>
      </div>
    </footer>
  )
}
