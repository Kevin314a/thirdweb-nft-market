import Image from "next/image";
import Link from "next/link";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { ImageAzuki, ImageBanner, ImageCollection3, ImageCollection4, ImageCowboy, ImageCreator, ImageDex, ImageFunia, ImageMarketplace, ImageNFT, ImagePosse, ImageSwap, Poly2, Poly3, Poly6, Poly7, Polygon, Polygon1, Polygon11, Polygon22, Polygon4, Polygon5 } from "@/assets";
import { Pagination } from "@/components/shared/Pagination";

import FeaturedSlider from "@/components/shared/FeaturedSlider";
import { TableTabs } from "@/components/shared/TableTabs";
import LaunchpadSlider from "@/components/shared/LaunchpadSlider";
import MarketMoversSlider from "@/components/shared/MarketMoversSlider";
import TopSalesSlider from "@/components/shared/TopSalesSlider";
import MemecoinsSlider from "@/components/shared/MemecoinsSlider";


export default function PosseHome() {

  return (
    <>
      <section className="lg:pt-20 pt-24 relative z-20">
        <div className="max-w-[1920px] px-2 lg:px-6 mx-auto">
          <h1 className="text-[15px] md:block hidden sm:mb-3 font-semibold text-white leading-normal md:text-start lg:px-0 px-6 text-center mb-4">
            Featured
            <span className="bg-text-bg  bg-clip-text text-transparent">
              {" "}
              Collections
            </span>
          </h1>
          <FeaturedSlider />
        </div>
        <div className="absolute -bottom-4 right-0 -z-10">
          <img
            src={Polygon1.src}
            alt=""
          />
        </div>
      </section>

      <section className="md:pt-10 pt-8 relative z-10">
        <div className="max-w-[1920px] px-2 lg:px-6 mx-auto relative z-10">
          <h2 className="text-[15px] mb-4 font-semibold text-white leading-normal sm:text-start">
            Token
            <span className="bg-text-bg  bg-clip-text text-transparent">
              {" "}
              Swap
            </span>
          </h2>
          <div className="flex lg:flex-nowrap flex-wrap justify-center gap-10">
            <div className="lg:w-[38%] hidden lg:block">
              <Image
                width={500}
                height={350}
                src={ImageFunia}
                className="rounded-[15px] h-full max-h-[424px] bg-cover w-full"
                alt=""
                priority
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="w-full bg-[#846a51] rounded-[25px] backdrop-blur-[8px] py-2 px-4">
                <div className="stacking-approve-heading flex items-center justify-between py-5">
                  <div>
                    <span
                      className="form-header__link-title"
                      style={{ color: "white", margin: 5 }}
                    >
                      <b>Swap</b>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button>
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.94764 5.72727C3.18341 3.06894 5.87732 1.22727 9.00001 1.22727C12.638 1.22727 15.6937 3.7272 16.5399 7.10373C16.6223 7.43246 16.9556 7.63216 17.2843 7.54977C17.6131 7.46738 17.8128 7.1341 17.7304 6.80536C16.7505 2.89587 13.2142 0 9.00001 0C5.68437 0 2.78859 1.79278 1.22727 4.46039V3.06818C1.22727 2.72928 0.952538 2.45455 0.613636 2.45455C0.274734 2.45455 0 2.72928 0 3.06818V6.13636C0 6.58823 0.366313 6.95455 0.818182 6.95455H3.88636C4.22527 6.95455 4.5 6.67981 4.5 6.34091C4.5 6.00201 4.22527 5.72727 3.88636 5.72727H1.94764Z"
                          fill="#fff"
                        />
                        <path
                          d="M1.46009 10.8963C1.3777 10.5675 1.04442 10.3678 0.715684 10.4502C0.38695 10.5326 0.187251 10.8659 0.269644 11.1946C1.2495 15.1041 4.78581 18 9.00001 18C12.3156 18 15.2114 16.2072 16.7727 13.5397V14.9318C16.7727 15.2707 17.0475 15.5455 17.3864 15.5455C17.7253 15.5455 18 15.2707 18 14.9318V11.8636C18 11.4118 17.6337 11.0455 17.1818 11.0455H14.1136C13.7747 11.0455 13.5 11.3202 13.5 11.6591C13.5 11.998 13.7747 12.2727 14.1136 12.2727H16.0524C14.8166 14.9311 12.1227 16.7727 9.00001 16.7727C5.36202 16.7727 2.30638 14.2728 1.46009 10.8963Z"
                          fill="#fff"
                        />
                      </svg>
                    </button>
                    <button>
                      <svg
                        width={27}
                        height={23}
                        viewBox="0 0 27 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1626_154)">
                          <path
                            d="M13.5 4.2085H25.1667"
                            stroke="#fff"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                          <path
                            d="M1.83325 4.2085H7.66661"
                            stroke="#fff"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                          <path
                            d="M20.7917 18.7915H25.1667"
                            stroke="#fff"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                          <path
                            d="M1.83325 18.7915H13.4999"
                            stroke="#fff"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                          <path
                            d="M10.5833 7.12483C12.1942 7.12483 13.5 5.81903 13.5 4.20813C13.5 2.59734 12.1942 1.2915 10.5833 1.2915C8.97255 1.2915 7.66675 2.59734 7.66675 4.20813C7.66675 5.81903 8.97255 7.12483 10.5833 7.12483Z"
                            stroke="#fff"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                          <path
                            d="M17.875 21.7083C19.4858 21.7083 20.7917 20.4025 20.7917 18.7917C20.7917 17.1808 19.4858 15.875 17.875 15.875C16.2642 15.875 14.9583 17.1808 14.9583 18.7917C14.9583 20.4025 16.2642 21.7083 17.875 21.7083Z"
                            stroke="#fff"
                            strokeWidth={2}
                            strokeLinecap="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1626_154">
                            <rect width={27} height={23} fill="#fff" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="stacking-approve-box bg-[#100e0e] overflow-hidden rounded-[25px]">
                  <div className="stacking-approve-box-minibox flex md:flex-row flex-col items-center justify-between md:gap-8 py-5  px-3">
                    <button
                      className="stacking-approve-box-minibox-btn flex items-center gap-2"
                      style={{ margin: 0, padding: "10px 3px" }}
                    >
                      <div className="stacking-approve-box-minibox-btn-images flex items-center">
                        <img
                          className="w-[50px] h-[50px]"
                          src="https://assets.rubic.exchange/assets/cronos/0x0000000000000000000000000000000000000000/logo.png"
                          alt="Cronos"
                          style={{
                            border: "5px solid transparent",
                            borderRadius: "50%",
                            padding: 0,
                            margin: 0
                          }}
                        />
                        <img
                          className="w-[50px] h-[50px]"
                          src="https://assets.rubic.exchange/assets/cronos/0x0000000000000000000000000000000000000000/logo.png"
                          alt="CRO"
                          style={{
                            border: "5px solid rgb(11, 9, 11)",
                            borderRadius: "50%",
                            padding: 0,
                            margin: 0
                          }}
                        />
                      </div>
                      <div className="stacking-approve-box-minibox-btn-content">
                        <p className="text-gray-500">cronos</p>
                        <h5 className="text-white font-semibold flex items-center gap-2">
                          CRO
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 2.12132L6.49339 8.61471L6.49976 8.60834L6.5066 8.61518L13 2.12179L10.8787 0.000469757L6.50023 4.37891L2.12132 0L0 2.12132Z" fill="white" />
                          </svg>
                        </h5>
                      </div>
                    </button>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                      }}
                    >
                      <input
                        disabled=""
                        id="amount"
                        type="number"
                        placeholder="Enter Amount"
                        className="stacking-approve-box-minibox-inputbox md:!text-end !text-center w-full md:max-w-[60%]"
                        style={{ marginLeft: "auto", padding: 6, textAlign: "right" }}
                      />
                    </div>
                  </div>
                  <div className="hr">
                    <div className="exchange-icons">
                      <svg xmlns="http://www.w3.org/2000/svg" className="rotate-180" width="11" height="7" viewBox="0 0 11 7" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.50001 6.49976C5.24401 6.49976 4.98801 6.40176 4.79301 6.20676L0.793006 2.20676C0.402006 1.81576 0.402006 1.18376 0.793006 0.792762C1.18401 0.401762 1.81601 0.401762 2.20701 0.792762L5.51201 4.09776L8.80501 0.917762C9.20401 0.534762 9.83501 0.545762 10.219 0.942762C10.603 1.33976 10.592 1.97376 10.195 2.35676L6.19501 6.21876C6.00001 6.40676 5.75001 6.49976 5.50001 6.49976Z" fill="#878787" />
                      </svg>
                      <svg className="" xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.50001 6.49976C5.24401 6.49976 4.98801 6.40176 4.79301 6.20676L0.793006 2.20676C0.402006 1.81576 0.402006 1.18376 0.793006 0.792762C1.18401 0.401762 1.81601 0.401762 2.20701 0.792762L5.51201 4.09776L8.80501 0.917762C9.20401 0.534762 9.83501 0.545762 10.219 0.942762C10.603 1.33976 10.592 1.97376 10.195 2.35676L6.19501 6.21876C6.00001 6.40676 5.75001 6.49976 5.50001 6.49976Z" fill="#878787" />
                      </svg>
                    </div>
                  </div>
                  <div className="stacking-approve-box-minibox  flex items-center md:flex-row flex-col justify-between md:gap-8 px-3 py-5 !pb-0">
                    <button
                      className="stacking-approve-box-minibox-btn flex items-center gap-2"
                      style={{ margin: 0, padding: 3 }}
                    >
                      <div className="stacking-approve-box-minibox-btn-images flex items-center">
                        <img
                          className="w-[50px]"
                          src="https://assets.rubic.exchange/assets/polygon/0x0000000000000000000000000000000000000000/logo.png"
                          alt="Polygon"
                          style={{
                            border: "5px solid transparent",
                            borderRadius: "50%",
                            padding: 0,
                            margin: 0
                          }}
                        />
                        <img
                          className="w-[50px]"
                          src="https://assets.rubic.exchange/assets/polygon/0x0169ec1f8f639b32eec6d923e24c2a2ff45b9dd6/logo.png"
                          alt="Algebra"
                          style={{
                            border: "5px solid rgb(11, 9, 11)",
                            borderRadius: "50%",
                            padding: 0,
                            margin: 0
                          }}
                        />
                      </div>
                      <div className="stacking-approve-box-minibox-btn-content">
                        <p className="text-gray-500">polygon</p>
                        <h5 className="flex items-center justify-center gap-3 text-white font-semibold">
                          ALGB
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M0 2.12132L6.49339 8.61471L6.49976 8.60834L6.5066 8.61518L13 2.12179L10.8787 0.000469757L6.50023 4.37891L2.12132 0L0 2.12132Z" fill="white"></path></svg>
                        </h5>
                      </div>
                    </button>
                    <input
                      type="number"
                      placeholder={0.0}
                      id="toamount"
                      className="stacking-approve-box-minibox-inputbox md:!text-end !text-center w-full md:max-w-[60%]"
                      disabled=""
                      defaultValue=""
                      style={{ margin: 0, padding: 3 }}
                    />
                  </div>
                  <div className="flex items-center w-full">
                    <input
                      className="w-full bg-transparent py-4 px-8 text-white outline-none ring-0"
                      type="text"
                      id="wallet_address"
                      placeholder="Wallet address or ENS name in target network"
                      defaultValue=""
                      style={{ border: "none" }}
                    />
                  </div>
                </div>


                <div className="btn-box flex items-center justify-between">
                  <div
                    className="trk-btn w-full text-center text-sm rounded-2xl transition-all duration-300 hover:bg-[#c3976a] py-3.5 md:px-8 border border-[#c3976a] text-white header-btn-btn w-100 justify-content-center"
                    style={{ margin: "20px 16px 20px 4px" }}
                  >
                    Connect wallet before proceeding!
                  </div>
                  <button
                    style={{
                      background: "black",
                      borderRadius: 12,
                      padding: 8,
                      border: "none",
                      margin: 0
                    }}
                  >
                    <svg
                      width={31}
                      height={25}
                      viewBox="0 0 31 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5.25 13.7517V3.86578L16.9855 0.931901C18.8789 0.458541 20.7131 1.91406 20.7131 3.86578H21.5789C23.2358 3.86578 24.5789 5.20892 24.5789 6.86578V13.7517C24.5789 15.4086 23.2357 16.7517 21.5789 16.7517H8.25C6.59314 16.7517 5.25 15.4086 5.25 13.7517Z" />
                      <path
                        d="M5.25 3.86578V13.7517C5.25 15.4086 6.59314 16.7517 8.25 16.7517H21.5789C23.2357 16.7517 24.5789 15.4086 24.5789 13.7517V6.86578C24.5789 5.20892 23.2358 3.86578 21.5789 3.86578H5.25ZM5.25 3.86578L16.9855 0.931901C18.8789 0.458541 20.7131 1.91406 20.7131 3.86578V3.86578"
                        stroke="#69686e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="20.7124" cy="10.3086" r="1.28859" fill="#69686e" />
                      <path
                        d="M1 9V15C1 18.3137 3.68629 21 7 21H29.25"
                        stroke="#69686e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M1 6.5L1 5"
                        stroke="#69686e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M1 2.5L1 1"
                        stroke="#69686e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M27.6529 18.6529L29.2929 20.2929C29.6834 20.6834 29.6834 21.3166 29.2929 21.7071L27.6529 23.3471"
                        stroke="#69686e"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

              </div>
            </div>


          </div>
        </div>
        <div className="absolute bottom-0 left-0 max-h-[312px] -z-10">
          <img
            className="w-[145px] h-full"
            src={Poly2.src}
            alt=""
          />
        </div>
        <div className="lg:h-[653.31px] h-[455px] w-[455px] lg:w-[645.18px] bg-[#200B07] blur-[250px] absolute -top-[50%] -left-1/3 lg:-left-44 -z-20"></div>

      </section>

      <section className="md:pt-4 pt-14 pb-[34px] relative">
        <div className="max-w-[1920px] px-2 lg:px-6 mx-auto z-10 relative">
          <div className="w-full flex items-center justify-between">
            <TableTabs />
          </div>
        </div>
        <div className="lg:h-[653.31px] lg:w-[645.18px]  h-[455px] w-[455px] bg-[#200B07] blur-[250px] absolute -top-[35%] -right-44 z-0"></div>
      </section>

      <section className="lg:pt-10 pt-5 relative">
        <div className="max-w-[1920px] px-2 lg:px-6 mx-auto relative z-10">
          <div className="lg:mb-14 mb-14">
            <h2 className="text-[15px] mb-4 font-semibold text-white leading-normal sm:text-start lg:px-0 px-6">
              Launchpad NFT
              <span className="bg-text-bg  bg-clip-text text-transparent">
                {" "}
                Collections
              </span>
            </h2>
            <LaunchpadSlider />
          </div>
          <div className="lg:mb-14 mb-14">
            <h2 className="text-[15px] mb-4 font-semibold text-white leading-normal sm:text-start lg:px-0 px-6">
              NFT Market
              <span className="bg-text-bg  bg-clip-text text-transparent">
                {" "}
                Movers
              </span>
            </h2>
            <MarketMoversSlider />
          </div>
          <div className="lg:mb-14 mb-14">
            <h2 className="text-[15px] mb-4 font-semibold text-white leading-normal sm:text-start lg:px-0 px-6">
              Top NFT
              <span className="bg-text-bg  bg-clip-text text-transparent">
                {" "}
                Sales
              </span>
            </h2>
            <TopSalesSlider />
          </div>
        </div>
        <div className="absolute -top-20 max-h-[312px] -right-2">
          <img
            className="w-auto h-full max-h-[312px]"
            src={Poly3.src}
            alt=""
          />
        </div>



        <div className="absolute -translate-y-1/2 top-1/2 -mt-36 left-0">
          <img
            className="max-h-[312px] bg-contain w-auto"
            src={Polygon.src}
            alt=""
          />
        </div>

        <div className="h-[237px] w-[237px] bg-[#200B07] blur-[250px] absolute -top-[0%] -left-10 z-0"></div>
        <div className="h-[555px] w-[547px] bg-[#200B07] blur-[250px] absolute -bottom-[0%] -right-44 z-0"></div>


        <div className="absolute -bottom-34 right-0">
          <img
            className="max-h-[312px] bg-contain w-auto"
            src={Polygon11.src}
            alt=""
          />
        </div>

        <div className="hlg:-[600px]  px-5bg-[#1D0B07] blur-[200px] absolute w-1/4 top-1/2 -right-[150px] z-0"></div>
      </section>

      <section className="md:pt-10 pt-3 relative">
        <div className="max-w-[1920px] px-2 lg:px-6 mx-auto relative z-10">
          <h2 className="text-[15px] mb-4 lg:px-0 px-6 font-semibold text-white leading-normal">
            Memecoins on
            <span className="bg-text-bg  bg-clip-text text-transparent">
              {" "}
              Yeehaw
            </span>
          </h2>
          <div className="text-center px-6 ">
            <h3 className="lg:text-[50px] lg:leading-[75px] mb-10 text-2xl text-white font-semibold">
              Begin your meme adventure with
              <span className="bg-heading-bg  bg-clip-text text-transparent">
                {" "}
                Yeehaw !
              </span>
            </h3>
          </div>
          <MemecoinsSlider />

          <div className="relative mb-16 md:mt-[70px] mt-14 lg:px-6 px-3">
            <Image
              width={1340}
              height={402}
              src={ImageBanner} className="w-full sm:min-h-[250px] min-h-[200px] object-cover h-auto rounded-[16px]" alt="" />
            <div className="absolute top-[22px] left-10 max-w-[150px] w-full">
              <a
                href="#"
                className="text-base transition-all justify-center ease-out duration-500 hover:bg-golden-1100 max-w-[150px] text-center w-full mx-auto font-medium text-white flex items-center rounded-lg bg-golden-1000 border border-golden-1000 p-[7px] px-[14px] gap-2"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div className="absolute md:block hidden bottom-1/2 -mb-44 left-0 z-0">
          <img
            className="w-auto h-full max-h-[312px]"
            src={Poly6.src}
            alt=""
          />
        </div>

        <div className="h-[555px] w-[547px] bg-[#200B07] blur-[250px] absolute -top-[0%] lg:-left-44 -left-[400px] z-0"></div>
        <div className="h-[966px] w-[952px] bg-[#200B07] blur-[250px] absolute -bottom-[0%] lg:-right-44 -right-[650px]  z-0"></div>

        <div className="absolute -bottom-20 right-0 z-0">
          <img
            className="w-auto h-full max-h-[312px]"
            src={Poly7.src}
            alt=""
          />
        </div>

      </section>


    </>
  );
}
