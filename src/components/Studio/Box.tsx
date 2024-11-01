'use client'

import { ImageMarketplace } from "@/assets";
import { client } from "@/lib/constants";
import { PosseBridgeDrop } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { lazyMintNFT } from "@/server-actions/lazynft";
import { IoMdCloseCircle } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";
import { MediaRenderer } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { SlideOver } from "../XSlideOver/SlideOver";
import toast from "react-hot-toast";
import { useState } from "react";
import { StudioLazyMintForm, StudioShareMetadataForm } from ".";

interface StudioBoxProps {
  lazyMintNFT: typeof lazyMintNFT;
  drops: PosseBridgeDrop[];
}

export function StudioBox(props: StudioBoxProps) {
  const [isOperating, setIsOperating] = useState<boolean>(false);
  const [isMintSlideOpen, setIsMintSlideOpen] = useState<boolean>(false);
  const [isShareSlideOpen, setIsShareSlideOpen] = useState<boolean>(false);
  const [selecteddrop, setSelectedDrop] = useState<PosseBridgeDrop | null>(null);

  const handleOpenSingleLazyMintSlide = (drop: PosseBridgeDrop) => {
    if (isOperating) {
      return;
    }
    setSelectedDrop(drop);
    setIsMintSlideOpen(true);
  };

  const handleOpenBulkLazyMintSlide = (drop: PosseBridgeDrop) => {
    if (isOperating) {
      return;
    }
    setSelectedDrop(drop);
    toast.error('comming soon');
    // setIsMintSlideOpen(true);
  };

  const handleOpenSingleUploadMetadataSlide = (drop: PosseBridgeDrop) => {
    if (isOperating) {
      return;
    }
    setSelectedDrop(drop);
    setIsShareSlideOpen(true);
  };

  const handleOpenBulkUploadMetadataSlide = (drop: PosseBridgeDrop) => {
    if (isOperating) {
      return;
    }
    setSelectedDrop(drop);
    toast.error('comming soon');
    // setIsShareSlideOpen(true);
  };

  return (
    <>
      {props.drops.map((drop, i) => (
        <div key={i} className="relative min-w-[70vw] flex flex-col md:flex-row justify-center items-center border-2 border-golden-1000 shadow-xl rounded-lg p-2 md:p-4 gap-4 mb-2">
          <div className="flex flex-col justify-center items-center">
            <MediaRenderer
              src={!!drop.image ? drop.image : ImageMarketplace.src}
              client={client}
              className="object-cover object-center min-w-[240px] min-h-[160px] rounded-lg"
              style={{ objectFit: "cover" }}
            />
            <div className="w-full flex flex-row justify-center items-center mt-2 gap-4">
              <div className="flex w-full md:w-auto justify-end md:justify-center items-center">
                <div
                  className="flex w-auto justify-center items-center rounded-full lg:rounded-lg px-2 py-1 md:py-2 lg:py-1 text-white text-sm bg-golden-1000 hover:bg-golden-1100 gap-1 cursor-pointer"
                  onClick={() => drop.group === 'LIMITED' ?
                    handleOpenSingleLazyMintSlide(drop) : handleOpenSingleUploadMetadataSlide(drop)}
                >
                  <FaPlusCircle />
                  <span className="flex md:hidden lg:flex">Single</span>
                </div>
              </div>
              <div className="flex w-full md:w-auto justify-end md:justify-center items-center">
                <div
                  className="flex w-auto justify-center items-center rounded-full lg:rounded-lg px-2 py-1 md:py-2 lg:py-1 text-white text-sm bg-golden-1000 hover:bg-golden-1100 gap-1 cursor-pointer"
                  onClick={() => drop.group === 'LIMITED' ?
                    handleOpenBulkLazyMintSlide(drop) : handleOpenBulkUploadMetadataSlide(drop)}
                >
                  <FaPlusCircle />
                  <span className="flex md:hidden lg:flex">Bulk</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full flex flex-row justify-between items-center gap-8">
              <div className="w-full flex flex-col md:flex-row md:justify-between items-center">
                <div className="text-white text-sm md:text-base">Name: {drop.name}</div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-white text-sm">Type: {drop.group === 'LIMITED' ? 'Limited Edition' : drop.group === 'UNLIMITED' ? 'Open Edition' : 'N/A'}</div>
                  <div className="text-white text-sm">Network: {'Soneium Minato'}</div>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center bg-golden-1000 rounded-bl-[99px] w-12 h-12 absolute right-0 top-0"><IoMdCloseCircle className="-mt-2 -mr-2 " color="text-golden-1100" size="24" /></div>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center">
              <div className="text-gray-1300 text-xs md:text-sm">Contract Address: {shortenAddress(drop.address)}</div>
              <div className="text-gray-1300 text-xs md:text-sm">Owner: {shortenAddress(drop.owner)}</div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center my-2">
              <div className="text-white text-xs md:text-base">Total Supply: {drop.supplies?.totalSupply || 0}</div>
              <div className="text-white text-xs md:text-base">Claimed Supply: {drop.supplies?.claimedSupply || 0}</div>
              <div className="text-white text-xs md:text-base">Unclaimed Supply: {drop.supplies?.unclaimedSupply || 0}</div>
              <div className="flex w-full md:w-auto justify-end md:justify-center items-center">
                <div className="flex w-auto justify-center items-center rounded-full lg:rounded-lg px-2 py-1 md:py-2 lg:py-1 text-white text-sm bg-golden-1000 hover:bg-golden-1100 gap-1">
                  <FaPlusCircle />
                  <span className="flex md:hidden lg:flex">Phases</span>
                </div>
              </div>
            </div>
            {drop.mintStages.map((stage, j) => (
              <div key={j} className="w-full mt-2 flex flex-col lg:flex-row justify-between items-center border border-gray-1000 px-4 py-2 rounded-lg">
                <div className="flex flex-row lg:flex-col w-full lg:w-auto justify-between gap-2">
                  <span className="text-xs md:text-sm text-golden-1100">Phase start:</span>
                  <span className="text-sm md:text-base text-white">{formatDate(new Date(drop.mintStartAt + stage.duration))}</span>
                </div>
                <div className="flex flex-row lg:flex-col w-full lg:w-auto justify-between gap-2">
                  <span className="text-xs md:text-sm text-golden-1100">NFTs to drop:</span>
                  <span className="text-sm md:text-base text-white">{drop.numberOfItems || 'Unlimited'}</span>
                </div>
                <div className="flex flex-row lg:flex-col w-full lg:w-auto justify-between gap-2">
                  <span className="text-xs md:text-sm text-golden-1100">Default price:</span>
                  <span className="text-sm md:text-base text-white">{stage.price} {stage.currency}</span>
                </div>
                <div className="flex flex-row lg:flex-col w-full lg:w-auto justify-between gap-2">
                  <span className="text-xs md:text-sm text-golden-1100">Limit per wallet:</span>
                  <span className="text-sm md:text-base text-white">{stage.perlimit || 'Unlimited'}</span>
                </div>
                <div className="flex flex-row w-auto justify-end gap-6">
                  <div className="rounded-full p-2 bg-blue-600 hover:bg-blue-700">
                    <FaRegEdit color="white" size="14" />
                  </div>
                  <div className="rounded-full p-2 bg-red-600 hover:bg-red-700">
                    <RiDeleteBin2Line color="white" size="14" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {!!selecteddrop && (
        <SlideOver
          open={isMintSlideOpen}
          setOpen={() => !isOperating && setIsMintSlideOpen(false)}
          title="Mint NFT"
        >
          <StudioLazyMintForm
            drop={selecteddrop}
            lazyMintNFT={props.lazyMintNFT}
            onOperating={(b) => setIsOperating(b)}
            onClose={() => !isOperating && setIsShareSlideOpen(false)} 
            />
        </SlideOver>
      )}
      {!!selecteddrop && (
        <SlideOver
          open={isShareSlideOpen}
          setOpen={() => !isOperating && setIsShareSlideOpen(false)}
          title="Set NFT Metadata"
        >
          <StudioShareMetadataForm 
          drop={selecteddrop} 
          onOperating={(b) => setIsOperating(b)}
          onClose={() => !isOperating && setIsShareSlideOpen(false)} 
          />
        </SlideOver>
      )}
    </>
  );
}