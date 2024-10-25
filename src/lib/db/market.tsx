import MarketModel from "@/lib/model/Market";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { PosseFormMarket } from "@/lib/types";
import { DirectListing } from "thirdweb/extensions/marketplace";
import { dbConnect } from "./connect";
import { getNFT } from "./nft";

export const storeNFTtoMarket = async (
  listedNFT: PosseFormMarket
) => {
  try {
    await dbConnect();

    const oldOne = await MarketModel.findOne({
      assetContractAddress: listedNFT.assetContractAddress,
      tokenId: listedNFT.tokenId
    });

    if (oldOne) {
      return oldOne._id;
    }

    const nft = await getNFT(listedNFT.assetContractAddress, listedNFT.tokenId);

    const listedOnMarket = new MarketModel({
      mid: listedNFT.mid,
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

    return await listedOnMarket.save();
  } catch (err) {
    console.error("[ERROR ON STORING NFTonMarket to DB]", err);
    throw new Error("Failed to store info about your NFT to POSSE Market");
  }
};

export const getNFTsfromMarket = async (
  assetContractAddress: string,
  tokenId: string
) => {
  try {
    await dbConnect();
    return await MarketModel.find({ assetContractAddress, tokenId, status: "ACTIVE" });
  } catch (err) {
    console.error("[ERROR ON FETCHING NFTonMarket from DB]", err);
    throw new Error("Failed to fetching info about your NFT to POSSE Market");
  }
};

export const getNFTfromMarket = async (
  assetContractAddress: string,
  tokenId: string
) => {
  try {
    await dbConnect();
    return await MarketModel.findOne({ assetContractAddress, tokenId,  status: "ACTIVE" });
  } catch (err) {
    console.error("[ERROR ON FETCHING NFTonMarket from DB]", err);
    throw new Error("Failed to fetching info about your NFT to POSSE Market");
  }
};

export const getNFTfromMarketbyId = async (
  mid: string
) => {
  try {
    await dbConnect();
    return await MarketModel.findOne({ mid });
  } catch (err) {
    console.error("[ERROR ON FETCHING NFTonMarket from DB]", err);
    throw new Error("Failed to fetching info about your NFT to POSSE Market");
  }
};

export const removeNFTfromMarketbyId = async (
  mid: string
) => {
  try {
    await dbConnect();
    return await MarketModel.deleteOne({ mid });
  } catch (err) {
    console.error("[ERROR ON REMOVING NFTonMarket from DB]", err);
    throw new Error("Failed to removing info about your NFT from POSSE Market");
  }
};

export const removeNFTsfromMarket = async (
  assetContractAddress: string,
  tokenId: string
) => {
  try {
    await dbConnect();
    return await MarketModel.deleteMany({ assetContractAddress, tokenId });
  } catch (err) {
    console.error("[ERROR ON REMOVING NFTonMarket from DB]", err);
    throw new Error("Failed to removing info about your NFT from POSSE Market");
  }
};

export const hasOwnAstrNFT = async (
  walletAddress: string
) => {
  try {
    await dbConnect();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const oldOne = await MarketModel.findOne({
      creatorAddress: { $regex: new RegExp(walletAddress, 'i') },
      status: "ACTIVE",
      'currencyValuePerToken.symbol': "ASTR",
      createdAt: {
        $gte: startOfToday,
        $lt: endOfToday,
      },
    });
    return !!oldOne;
  } catch (err) {
    console.error("[ERROR ON RETRIEVE YOUR ASTR NFT from POSSE MARKET]", err);
    throw new Error("Failed to retrieve your ASTR NFT from the POSSE Market");
  }
};

export const bulkUpdateMarket = async (accountAddress: string | undefined, listedItems: DirectListing[]) => {
  try {
    await dbConnect();

  } catch (err) {
    console.error("[ERROR ON BULK UPDATING LISTED ITEMS ON MARKET]", err);
    throw new Error("Failed to bulk sync NFTs on Marketplace with DB");
  }
};

export const getValidNFTs = async (
  conds: { [key: string]: any },
  sort: { [key: string]: any },
  page: number,
) => {
  try {
    await dbConnect();
    return await MarketModel.aggregate([
      {
        $lookup: {
          from: "nfts",
          localField: "asset",
          foreignField: "_id",
          as: "asset"
        }
      },
      {
        $unwind: {
          path: "$asset",
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: conds },
      {
        $addFields: {

          priceToSort: { $toDouble: "$currencyValuePerToken.displayValue" },
          quantity: { $toString: "$quantity" },
          startTimeInSeconds: { $toDouble: "$startTimeInSeconds" },
          endTimeInSeconds: { $toDouble: "$endTimeInSeconds" },
          "currencyValuePerToken.value": { $toString: "$currencyValuePerToken.value" },
          "currencyValuePerToken.displayValue": { $toString: "$currencyValuePerToken.displayValue" },
        }
      },
      { $sort: sort },
      { $skip: page * ITEMS_PER_PAGE },
      { $limit: ITEMS_PER_PAGE },
      {
        $project: {
          _id: 0,
        }
      }
    ]).exec();
  } catch (err) {
    console.error("[ERROR ON FINDING valid NFTS of Marketplace on DB]", err);
    throw new Error("Failed to fetching valid NFTs on Marketplace");
  }
};

export const removeInvalidNFTs = async (
  ids: string[]
) => {
  try {
    await dbConnect();
    await MarketModel.deleteMany({ mid: { $nin: ids } });
  } catch (err) {
    console.error("[ERROR ON REMOVING INVALID NFTS of Marketplace on DB]", err);
    throw new Error("Failed to removing invalid NFTs on Marketplace");
  }
};