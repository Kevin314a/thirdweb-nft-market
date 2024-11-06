'use client'

import { Button } from "@/components/base";
import { DEFAULT_PLATFORMFEE_DROP, client } from "@/lib/constants";
import { PosseBridgeDrop, PosseBridgeLazyNFT } from "@/lib/types";
import { formatDateIntl } from "@/lib/utils";
import { ImagePossef } from "@/assets";
import axios, { HttpStatusCode } from "axios";
import { notFound } from "next/navigation";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { MdLanguage, MdMoreHoriz } from "react-icons/md";
import { IoBarChart, IoStar, IoShareSocial } from "react-icons/io5";
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { claimTo, isERC721 } from "thirdweb/extensions/erc721";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import toast from "react-hot-toast";
import { LimitedDropDetail, UnLimitedDropDetail } from ".";

interface DropDetailProps {
  drop: PosseBridgeDrop;
  lazyNFTs: PosseBridgeLazyNFT[];
  stageId: string;
}

export function DropDetailBox(props: DropDetailProps) {

  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const activeWalletChain = useActiveWalletChain();
  const { connect } = useConnectModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClaimTo = async () => {
    if (isLoading) {
      return;
    }

    if (!account) {
      connect({ client });
      return;
    }
    setIsLoading(true);

    if (activeWalletChain?.id !== soneiumMinato.id) {
      await switchChain(soneiumMinato);
    }

    try {
      // register nft to blockchain on server, mint nft via thirdweb
      // first of all, check this contract is a valid NFT Collection.
      const masterContract = getContract({
        chain: soneiumMinato,
        client,
        address: props.drop.address,
      });
      const is721 = await isERC721({ contract: masterContract });
      if (!is721) {
        console.error("[YOU have REQUIRED CLAIM AN NFT TO INVALID COLLECTION]");
        toast.error("You are trying to request claim an NFT to an invalid collection.");
        throw new Error("[YOU REQUIRED CLAIM AN NFT TO INVALID COLLECTION]");
      }

      // after check collection, then check about user can mint NFT to this collection.
      // TODO:

      // Minting NFT to the collection that user selected, via thirdweb-api

      const transaction = claimTo({
        contract: masterContract,
        to: account.address,
        quantity: 1n,
      });

      const tx = await sendTransaction({ transaction, account });
      const receipt = await waitForReceipt(tx);

      const response = await axios.post(`/api/drop/claim`, {
        dropAddr: props.drop.address,
        accountAddr: account.address,
      });


      if (response.status === HttpStatusCode.Ok) {
        const res = response.data;
        if (res.error) {
          toast.error(res.message);
        } else {
          toast.success(res.message);
        }
      } else {
        toast.error("Failed to Claim an NFT with Server-Error");
      }

    } catch (err) {
      console.log("[ERROR ON CLAIM-AN-NFT]", err);
      const error = err as { code: number, message: string };
      if (!!error.code) {
        toast.error(error.message);
      } else {
        toast.error(typeof err === 'string' ? err : "Claiming an NFT is failed.");
      }
    }
    setIsLoading(false);
  };

  const drop = props.drop;

  const stage = drop.mintStages.filter(stage => stage.startAt.toString() === props.stageId).shift();
  if (!stage) {
    return notFound();
  }
  const now = Date.now();
  const stageStatus = stage.endAt < now ? 'past' : (stage.startAt > now ? 'future' : 'today');

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full shadow-xl -mt-16">
        <div className="flex flex-wrap justify-center">
          <div className="w-full">
            <div className="relative">
              <img
                src={!drop.image ? ImagePossef.src : drop.image}
                className="object-cover object-center shadow-xl rounded-lg border-4 border-[#C3976A] absolute -m-16 -mt-16 lg:-mt-28 ml-0 w-[100px] h-[100px] lg:w-[150px] lg:h-[150px]"
                alt="drop image"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap mt-16">
          <div className="flex w-full flex-row justify-between items-center gap-2">
            <span className="text-white text-3xl font-medium">{drop.name}</span>
            <div className="flex gap-3">
              <MdLanguage color="white" />
              <IoBarChart color="white" />
              <IoStar color="white" />
              <IoShareSocial color="white" />
              <MdMoreHoriz color="white" />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-col md:flex-row mt-8 md:mt-4 gap-1 md:gap-6 flex-start">
              <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
                <span className="text-sm mr-1">Items</span>
                <span className="font-medium">{drop.group === "UNLIMITED" ? 1 : props.lazyNFTs.length}</span>
              </div>
              <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
                <span className="text-sm mr-1">Created</span>
                <span className="font-medium">{formatDateIntl(drop.createdAt || 0)}</span>
              </div>
              <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
                <span className="text-sm mr-1">Creator earnings</span>
                <span className="font-medium">{Number(100n - (DEFAULT_PLATFORMFEE_DROP / 1000n)).toFixed(2)}%</span>
              </div>
              <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
                <span className="text-sm mr-1">Chain</span>
                <span className="font-medium">Soneium Minato</span>
              </div>
              {/* <div className="text-white text-lg flex justify-between md:justify-start items-center md:relative w-full md:w-auto">
              <span className="text-sm mr-1">Category</span>
              <span className="font-medium">PFP</span>
            </div> */}
            </div>
          </div>
        </div>

        {drop.group === 'UNLIMITED' && (
          <UnLimitedDropDetail
            drop={drop}
            stage={stage}
            isLoading={isLoading}
            stageStatus={stageStatus}
            onClaim={() => handleClaimTo()}
          />
        )}
        {drop.group === 'LIMITED' && (
          <LimitedDropDetail
            drop={drop}
            stage={stage}
            isLoading={isLoading}
            lazyNFTs={props.lazyNFTs}
            stageStatus={stageStatus}
            onClaim={() => handleClaimTo()}
          />
        )}
      </div>
      <div className="fixed py-2.5 w-[100vw] z-50 bottom-0 start-0 bg-black-1300/[70%]">
        <div className="max-w-[1920px] flex items-center justify-between mx-auto lg:px-10 px-6 h-[64px]">
          <div className="flex lg:w-full items-center justify-end gap-2">
            {stageStatus === 'past' ? (
              <span className="text-md text-red-700 font-medium">Minting Status: Over</span>
            ) : (stageStatus === 'today' ? (
              <span className="text-md text-blue-700 font-medium">Minting Status: Ongoing</span>
            ) : (
              <span className="text-md text-green-700 font-medium">Minting Status: Upcoming</span>
            ))}
            <Button
              type="button"
              onClick={() => handleClaimTo()}
              disabled={isLoading || stageStatus !== 'today'}
              variant={stageStatus === 'today' ? 'default' : 'common'}
              className="ml-4"
            >
              {!!isLoading && <LuLoader2 size={18} className="animate-spin" />}Claim an NFT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}