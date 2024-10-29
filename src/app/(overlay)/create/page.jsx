'use client'

import { ImageHat } from "@/assets";
import { Button } from "@/components/base";
import { useRouter } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import toast from "react-hot-toast";

export default function CreatePage() {
  const router = useRouter();
  const account = useActiveAccount();

  const gotoCreateNFT = () => {
    if (!account) {
      // TODO: TOAST HERE TO LOGIN
      console.log('[YOU MUST LOGIN]');
      toast.error("Please connect your wallet!");
      return;
    }
    router.push('/create/nft');
  };

  const gotoCreateCoin = () => {
    // if (!account) {
    //   // TODO: TOAST HERE TO LOGIN
    //   return;
    // }
    // router.push('/create/coin');

    toast.error("Coming Soon...");
  };

  return (
    <div className="flex flex-col xl:px-10 px-5 max-w-[1920px]">
      <div className="flex justify-center lg:justify-start">
        <div className="mb-4">
          <img src={ImageHat.src} width={60} className="-ml-2" />
          <span className="text-2xl lg:text-5xl text-white">Create</span>
        </div>
      </div>
      <div className="w-full gap-8 xl:gap-32 flex flex-col lg:flex-row justify-between items-center">
        <div className="bg-golden-1400 min-w-[25vw] max-w-[600px] min-h-[20vw] rounded-lg flex flex-col justify-center items-center p-4 lg:p-8">
          <span className="text-center text-white text-xl lg:text-3xl mb-4">
            Collection or Item
          </span>
          <span className="text-center mt-2 text-white text-xs lg:text-sm xxl:text-lg">Create a new NFT or collection! Your items will</span>
          <span className="text-center text-white text-xs lg:text-sm xxl:text-lg">be visible right away. List them for sale</span>
          <span className="text-center mb-2 text-white text-xs lg:text-sm xxl:text-lg">whenever you're ready!</span>
          <Button
            type="button"
            variant="secondary"
            className="mt-4 rounded-lg text-white text-sm lg:text-sm xxl:text-lg px-6 py-1 bg-golden-1200"
            onClick={gotoCreateNFT}
          >
            Start
          </Button>
        </div>
        <div className="bg-golden-1400 min-w-[25vw] max-w-[600px] min-h-[20vw] rounded-lg flex flex-col justify-center items-center p-4 lg:p-8">
          <span className="text-center text-white text-xl lg:text-3xl mb-4">
            New Coin
          </span>
          <span className="text-center mt-2 text-white text-xs lg:text-sm xxl:text-lg">Create a new coin! Your coin will be visible right</span>
          <span className="text-center text-white text-xs lg:text-sm xxl:text-lg">away. Build a community and watch it grow!</span>
          <span className="text-center mb-2 text-white text-xs lg:text-sm xxl:text-lg">&nbsp;</span>
          <Button
            type="button"
            variant="secondary"
            className="mt-4 rounded-lg text-white text-sm lg:text-sm xxl:text-lg px-6 py-1 bg-golden-1200"
            onClick={gotoCreateCoin}
          >
            Start
          </Button>
        </div>
      </div>
      <div className="h-[80px]"> </div>
    </div>
  );
};