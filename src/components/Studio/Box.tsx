'use client'

import { ImageMarketplace } from "@/assets";
import { Button } from "@/components/base";
import { client } from "@/lib/constants";
import { SUPPORTED_CURRENCIES } from "@/lib/currencies";
import { PosseBridgeDrop, PosseBridgeDropMintStage, PosseStageInput } from "@/lib/types";
import { formatDate, generateUuid, isValidBigInt } from "@/lib/utils";
import { XSlideOver } from "@/components/shared";
import { lazyMintNFT } from "@/server-actions/lazynft";
import axios, { HttpStatusCode } from "axios";
import { useState } from "react";
import { FaRegEdit, FaPlusCircle } from "react-icons/fa";
import { IoMdCloseCircle, IoMdDoneAll } from "react-icons/io";
import { LuLoader2 } from "react-icons/lu";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MediaRenderer } from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import { NATIVE_TOKEN_ADDRESS, getContract, sendTransaction } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { setClaimConditions } from "thirdweb/extensions/erc721";
import { useActiveAccount, useConnectModal, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { StudioLazyMintForm, StudioPhaseForm, StudioShareMetadataForm } from ".";
import toast from "react-hot-toast";

interface StudioBoxProps {
  lazyMintNFT: typeof lazyMintNFT;
  drops: PosseBridgeDrop[];
}

export function StudioBox(props: StudioBoxProps) {
  const account = useActiveAccount();
  const switchChain = useSwitchActiveWalletChain();
  const activeWalletChain = useActiveWalletChain();
  const { connect } = useConnectModal();
  const [isOperating, setIsOperating] = useState<boolean>(false);
  const [isMintSlideOpen, setIsMintSlideOpen] = useState<boolean>(false);
  const [isShareSlideOpen, setIsShareSlideOpen] = useState<boolean>(false);
  const [selectedDrop, setSelectedDrop] = useState<PosseBridgeDrop | null>(null);
  const [selectedStageId, setSelectedStageId] = useState<string>("none");   // "none": none, "create": add, !"": drop.mintStages.did
  const [oldDrops, setOldDrops] = useState<PosseBridgeDrop[]>(props.drops);

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
    // setSelectedDrop(drop);
    // setIsMintSlideOpen(true);
    toast.error('Coming soon...');
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
    // setSelectedDrop(drop);
    // setIsShareSlideOpen(true);
    toast.error('Coming soon...');
  };

  const handleAddPhase = (drop: PosseBridgeDrop) => {
    if (isOperating) {
      return;
    }
    setSelectedDrop(drop);
    setSelectedStageId("create");
  };

  const handleEditPhase = (drop: PosseBridgeDrop, index: string) => {
    if (isOperating) {
      return;
    }
    setSelectedDrop(drop);
    setSelectedStageId(index);
  };

  const handleDeletePhase = (drop: PosseBridgeDrop, index: string) => {
    if (isOperating) {
      return;
    }
    // update drop's mintSTage with removing selected phase
    setSelectedDrop(drop);
    drop.mintStages = drop.mintStages.filter(stage => stage.did !== index);
  };

  const handleEditPhaseDone = (stage: PosseBridgeDropMintStage) => {
    if (selectedDrop && !!selectedStageId) {
      if (selectedStageId === "none") {

      }
      else if (selectedStageId === "create") {
        selectedDrop.mintStages.push({...stage, did: generateUuid()});
      }
      else if (selectedStageId.length > 7) {
        // selectedDrop.mintStages[selectedStageId] = stage;
        selectedDrop.mintStages = selectedDrop.mintStages.map(s => {
          if (s.did === selectedStageId) {
            return stage;
          } else {
            return s;
          }
        });
      }
    }
    setSelectedStageId("none");
  };

  const handleSaveAllStages = async () => {
    if (isOperating) {
      return;
    }
    if (!selectedDrop) {
      return;
    }
    if (!account) {
      connect({ client });
      return;
    }

    setIsOperating(true);

    if (activeWalletChain?.id !== soneiumMinato.id) {
      await switchChain(soneiumMinato);
    }

    try {

      const smartContract = getContract({
        address: selectedDrop.address,
        chain: soneiumMinato,
        client,
      });

      const transaction = setClaimConditions({
        contract: smartContract,
        phases: selectedDrop.mintStages.map((stage) => {
          const conStage : PosseStageInput = {
            // currencyAddress: SUPPORTED_CURRENCIES.filter((currency) => currency.symbol === stage.currency).shift()?.address || "ETH",
            currencyAddress: NATIVE_TOKEN_ADDRESS,
            price: stage.price,
            startTime: new Date(stage.startAt),
          };
          
          if (isValidBigInt(stage.numberOfItems, true)) {
            conStage.maxClaimableSupply = BigInt(stage.numberOfItems);
          }
          if (isValidBigInt(stage.perlimit, true)) {
            conStage.maxClaimablePerWallet = BigInt(stage.perlimit);
          }
          return conStage;
        }),
      });

      await sendTransaction({ transaction, account });

      // updating all stages via api

      const response = await axios.post(`/api/studio`, {
        dropAddr: selectedDrop.address,
        strNewStages: JSON.stringify(selectedDrop.mintStages),
      });

      if (response.status === HttpStatusCode.Ok) {
        toast.success("Successfully updated");
      } else {
        toast.error("Failed to update Phases");
      }

    } catch (err) {
      console.log("error on updating phases", err);
      toast.error("Failed to update Phases");
    }

    fnRefreshStage(false);
  };

  const fnRefreshStage = (loadOld: boolean) => {
    if (loadOld) {
      props.drops = oldDrops;
    }
    setSelectedDrop(null);
    setIsOperating(false);
    setSelectedStageId("none");
    setIsMintSlideOpen(false);
    setIsShareSlideOpen(false);
  };

  const handleRestoreStages = () => {
    fnRefreshStage(true);
  }

  return (
    <>
      {props.drops.map((drop, i) => (
        <div key={i} className="relative min-w-[70vw] flex flex-col md:flex-row justify-center items-center border-2 border-golden-1000 shadow-xl rounded-lg p-2 md:p-4 gap-4 mb-2">
          {!!selectedDrop && selectedDrop.address !== drop.address && (
            <div className="absolute w-full h-full left-0 top-0 bg-black/[50%] backdrop-filter backdrop-blur-[20px] flex justify-center items-center"> </div>
          )}
          <div className="flex flex-col justify-center items-center">
            <MediaRenderer
              src={!!drop.image ? drop.image : ImageMarketplace.src}
              client={client}
              className="object-cover object-center max-w-[240px] min-h-[160px] rounded-lg"
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
              <div className="hidden lg:flex items-center justify-center bg-golden-1000 rounded-bl-[99px] w-12 h-12 absolute right-0 top-0 cursor-pointer"><IoMdCloseCircle className="-mt-2 -mr-2 " color="text-golden-1100" size="24" /></div>
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
                <div
                  className="flex w-auto justify-center items-center rounded-full lg:rounded-lg px-2 py-1 md:py-2 lg:py-1 text-white text-sm bg-golden-1000 hover:bg-golden-1100 gap-1 cursor-pointer"
                  onClick={() => handleAddPhase(drop)}
                >
                  <FaPlusCircle />
                  <span className="flex md:hidden lg:flex">Phases</span>
                </div>
              </div>
            </div>
            {!drop.mintStages.length && (
              <div className="w-full mt-2 flex flex-col justify-center items-center border border-red-700 px-4 py-2 rounded-lg">
                <span className="text-xs md:text-sm text-golden-1100">Missing Claim Phases</span>
                <span className="text-sm md:text-base text-white">You need to set at least one claim phase for people to claim this drop.</span>
              </div>
            )}
            {drop.mintStages.map((stage, j) => (
              <div key={j} className="w-full mt-2 flex flex-col lg:flex-row justify-between items-center border border-gray-1000 px-4 py-2 rounded-lg">
                <div className="flex flex-row lg:flex-col w-full lg:w-auto justify-between gap-2">
                  <span className="text-xs md:text-sm text-golden-1100">Phase start:</span>
                  <span className="text-sm md:text-base text-white">{formatDate(new Date(stage.startAt))}</span>
                </div>
                <div className="flex flex-row lg:flex-col w-full lg:w-auto justify-between gap-2">
                  <span className="text-xs md:text-sm text-golden-1100">NFTs to drop:</span>
                  <span className="text-sm md:text-base text-white">{(!stage.numberOfItems || stage.numberOfItems === "0") ? 'Unlimited' : stage.numberOfItems}</span>
                </div>
                <div className="flex flex-row lg:flex-col w-full lg:w-auto justify-between gap-2">
                  <span className="text-xs md:text-sm text-golden-1100">Default price:</span>
                  <span className="text-sm md:text-base text-white">{stage.price} {stage.currency}</span>
                </div>
                <div className="flex flex-row lg:flex-col w-full lg:w-auto justify-between gap-2">
                  <span className="text-xs md:text-sm text-golden-1100">Limit per wallet:</span>
                  <span className="text-sm md:text-base text-white">{(!stage.perlimit || stage.perlimit === "0") ? 'Unlimited' : stage.perlimit}</span>
                </div>
                <div className="flex flex-row w-auto justify-end gap-6">
                  <div className="rounded-full p-2 bg-blue-600 hover:bg-blue-700 cursor-pointer" onClick={() => handleEditPhase(drop, stage.did || j.toString())}>
                    <FaRegEdit color="white" size="14" />
                  </div>
                  <div className="rounded-full p-2 bg-red-600 hover:bg-red-700 cursor-pointer" onClick={() => handleDeletePhase(drop, stage.did || j.toString())}>
                    <RiDeleteBin2Line color="white" size="14" />
                  </div>
                </div>
              </div>
            ))}
            {!!selectedDrop && selectedDrop.address === drop.address && (
              <div className="w-full flex justify-end mt-2 gap-2">
                <Button
                  type="button"
                  variant="common"
                  onClick={handleRestoreStages}
                  disabled={isOperating}
                >
                  {!!isOperating ? (
                    <LuLoader2 size={18} className="animate-spin" />
                  ) : (
                    <IoMdDoneAll color="white" size="18" />
                  )}
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSaveAllStages}
                  disabled={isOperating}
                  className="text-white bg-blue-600 hover:bg-blue-700 border-none"
                >
                  {!!isOperating ? (
                    <LuLoader2 size={18} className="animate-spin" />
                  ) : (
                    <IoMdDoneAll color="white" size="18" />
                  )}
                  Save Stages All
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
      {!!selectedDrop && (
        <>
          <XSlideOver
            open={isMintSlideOpen}
            setOpen={(b) => {
              !isOperating && setIsMintSlideOpen(!!b);
              !isOperating && !b && setSelectedDrop(null);
            }}
            title="Mint NFT"
          >
            <StudioLazyMintForm
              drop={selectedDrop}
              lazyMintNFT={props.lazyMintNFT}
              onOperating={(b) => setIsOperating(b)}
              onClose={() => {
                !isOperating && setIsMintSlideOpen(false);
                !isOperating && setSelectedDrop(null);
              }}
            />
          </XSlideOver>
          <XSlideOver
            open={isShareSlideOpen}
            setOpen={(b) => {
              !isOperating && setIsShareSlideOpen(!!b);
              !isOperating && !b && setSelectedDrop(null);
            }}
            title="Set NFT Metadata"
          >
            <StudioShareMetadataForm
              drop={selectedDrop}
              onOperating={(b) => setIsOperating(b)}
              onClose={() => {
                !isOperating && setIsShareSlideOpen(false);
                !isOperating && setSelectedDrop(null);
              }}
            />
          </XSlideOver>
          <XSlideOver
            open={!!selectedStageId && selectedStageId !== "none"}
            setOpen={() => !isOperating && setSelectedStageId("none")}
            title="Update a Mint Stage"
          >
            <StudioPhaseForm
              drop={selectedDrop}
              stageId={selectedStageId}
              onEditDone={(stage) => handleEditPhaseDone(stage)}
              onClose={() => !isOperating && setSelectedStageId("none")}
            />
          </XSlideOver>
        </>
      )}
    </>
  );
}