import { PosseFormMarket } from "@/lib/types";
import { dbConnect } from "./connect";
import { getNFT } from "./nft";
import MarketModel from "../model/Market";

export const storeNFTtoMarket = async (listedNFT: PosseFormMarket) => {
  try {
    await dbConnect();

    const old = await MarketModel.findOne({ assetContractAddress: listedNFT.assetContractAddress, tokenId: listedNFT.tokenId });
    if (old) {
      return;
    }

    const nft = await getNFT(listedNFT.assetContractAddress, listedNFT.tokenId);
    const listedOnMarket = new MarketModel({
      id: listedNFT.id,
      creatorAddress: listedNFT.creatorAddress,
      assetContractAddress: listedNFT.assetContractAddress,
      tokenId: listedNFT.tokenId,
      quantity: listedNFT.quantity,
      currencyContractAddress: listedNFT.currencyContractAddress,
      startTimeInSeconds: listedNFT.startTimeInSeconds,
      endTimeInSeconds: listedNFT.endTimeInSeconds,
      asset: nft._id,
      status: listedNFT.status,
      type: listedNFT.type,
      currencyValuePerToken: listedNFT.currencyValuePerToken,
      pricePerToken: listedNFT.pricePerToken,
      isReservedListing: listedNFT.isReservedListing,
    });
    await listedOnMarket.save();
  } catch (err) {
    console.error("[ERROR ON STORING NFTonMarket to DB]", err);
    throw new Error("Failed to store info about your NFT to POSSE Market");
  }
};

export const getNFTfromMarket = async (contractAddr: string, tokenId: string) => {
  try {
    await dbConnect();
    return await MarketModel.findOne({ assetContractAddress: contractAddr, tokenId });
  } catch (err) {
    console.error("[ERROR ON FETCHING NFTonMarket from DB]", err);
    throw new Error("Failed to fetching info about your NFT to POSSE Market");
  }
};

export const hasOwnAstrNFT = async (walletAddress: string) => {
  try {
    await dbConnect();
    const oldOne = await MarketModel.findOne({
      creatorAddress: walletAddress,
      status: "ACTIVE",
      'currencyValuePerToken.symbol': "ASTR"
    });
    return !!oldOne;
  } catch (err) {
    console.error("[ERROR ON RETRIEVE YOUR ASTR NFT from POSSE MARKET]", err);
    throw new Error("Failed to retrieve your ASTR NFT from the POSSE Market");
  }
};