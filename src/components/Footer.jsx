import React from 'react'

export const Footer = () => {
  return (
    <footer className="md:pt-32 pt-20">
    <div className="max-w-[1920px] lg:px-[50px] px-5 mx-auto">
      <div className="flex lg:flex-row flex-col align-items-center">
        <div className="lg:w-1/3 w-full lg:mr-6 lg:pr-4">
          <img src="images/footer-logo.svg" alt="" />
          <p className="xl:text-lg mt-2 mb-[60px] text-white font-normal leading-[27px]">
            Posse Studios, the development arm behind the Posse ecosystem, is a
            software company specializing in blockchain and gaming technologies.
            The Posse mission is to expand decentralized technologies through
            modern innovation, inclusivity, and, most importantly, fun!
          </p>
          <ul className="flex items-center lg:justify-start justify-center lg:gap-[52px]">
            <li>
              <a
                href="#"
                className=" lg:scale-100 scale-75 bg-golden-1000 rounded-full flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16"
              >
                <img src="images/twiter.svg" alt="" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" lg:scale-100 scale-75 bg-golden-1000 rounded-full flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16"
              >
                <img src="images/discord.svg" alt="" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" lg:scale-100 scale-75 bg-golden-1000 rounded-full flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16"
              >
                <img src="images/telegram.svg" alt="" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" lg:scale-100 scale-75 bg-golden-1000 rounded-full flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16"
              >
                <img src="images/socail-icon.svg" alt="" />
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:w-2/3 w-full">
          <div className="flex mt-11 lg:flex-nowrap flex-wrap lg:justify-end xl:gap-12 lg:gap-8 gap-12">
            <div className="sm:w-1/4 w-[40%] lg:w-auto">
              <h4 className="lg:text-2xl text-lg lg:mb-20 md:mb-6 pb-3 leading-9 text-white font-medium ">
                Marketplace
              </h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Partners
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Categories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Getting Listed
                  </a>
                </li>
              </ul>
            </div>
            <div className="sm:w-1/4 w-[40%] lg:w-auto">
              <h4 className="lg:text-2xl text-lg lg:mb-20 md:mb-6 pb-3 leading-9 text-white font-medium ">
                Exchange
              </h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Swap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Pools
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Farm
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Stake
                  </a>
                </li>
              </ul>
            </div>
            <div className="sm:w-1/4 w-[40%] lg:w-auto">
              <h4 className="lg:text-2xl text-lg lg:mb-20 md:mb-6 pb-3 leading-9 text-white font-medium ">
                Community
              </h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Documents
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="sm:w-1/4 w-[40%] lg:w-auto">
              <h4 className="lg:text-2xl text-lg lg:mb-20 md:mb-6 pb-3 leading-9 text-white font-medium ">
                Learn
              </h4>
              <ul>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    What Is DeFi?
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    What Are NFTs?
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    What Is GameFi?
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block md:mb-4 mb-2 lg:text-lg text-base hover:underline text-white leading-[27px] font-normal"
                  >
                    What is SocialFi?
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center md:mt-[74px] mt-14 border-t md:py-9 py-5 border-white">
        <p className="lg:text-xl md:text-base text-sm  text-white font-light leading-[30px]">
          All Right Reserved © Posse Ltd 2024
        </p>
      </div>
    </div>
  </footer>
  )
}
