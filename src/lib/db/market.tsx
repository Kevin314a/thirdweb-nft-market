import NFTModel from "@/lib/model/NFT";
import MarketModel from "@/lib/model/Market";
import { client } from "@/lib/constants";
import { ITEM_PER_PAGE } from "@/lib/constants";
import { PosseFormMarket } from "@/lib/types";
import { DirectListing } from "thirdweb/extensions/marketplace";
import { dbConnect } from "./connect";
import { getNFT, storeNFT } from "./nft";
import { resolveScheme } from "thirdweb/storage";
import { getContract } from "thirdweb";
import { getContract as getContractDB, storeContract } from "./contract";
import { getContractMetadata, owner } from "thirdweb/extensions/common";
import { soneiumMinato } from "thirdweb/chains";

export const storeNFTtoMarket = async (listedNFT: PosseFormMarket) => {
  try {
    await dbConnect();

    const old = await MarketModel.findOne({ assetContractAddress: listedNFT.assetContractAddress, tokenId: listedNFT.tokenId });
    if (old) {
      return old._id;
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
    return await listedOnMarket.save();
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

    for (const listedItem of listedItems) {
      
      // part of contract of this asset(NFT)
      const oldContract = await getContractDB(listedItem.assetContractAddress);
      if (!oldContract) {
        const contract3rd = getContract({
          client,
          chain: soneiumMinato,
          address: listedItem.assetContractAddress,
        });
        const contractOwner = await owner({ contract: contract3rd });
        const contractMetadata = await getContractMetadata({ contract: contract3rd });
        await storeContract({
          type: "ERC-721",
          address: listedItem.assetContractAddress,
          name: contractMetadata.name,
          symbol: contractMetadata.symbol,
          owner: contractOwner,
        });
      }

      // part of asset(NFT)
      let repairedImage: string = "";
      try {
        repairedImage = resolveScheme({
          client,
          uri: listedItem.asset.tokenURI,
        });
      } catch (err) {
        repairedImage = listedItem.asset.metadata.image ?? "";
      }

      const assetId = await storeNFT({
        collection: listedItem.assetContractAddress,
        tokenId: listedItem.tokenId.toString(),
        type: listedItem.asset.type === "ERC721" ? "ERC-721" : "ERC-1155",
        name: listedItem.asset.metadata.name || "",
        description: listedItem.asset.metadata.description,
        image: repairedImage,
        isListed: true,
        owner: listedItem.creatorAddress,
      });

      // part of market
      await storeNFTtoMarket({
        id: listedItem.id,
        creatorAddress: listedItem.creatorAddress,
        assetContractAddress: listedItem.assetContractAddress,
        tokenId: listedItem.tokenId,
        quantity: listedItem.quantity,
        currencyContractAddress: listedItem.currencyContractAddress,
        startTimeInSeconds: listedItem.startTimeInSeconds,
        endTimeInSeconds: listedItem.endTimeInSeconds,
        asset: assetId,
        status: listedItem.status,
        type: listedItem.type,
        //direct-listing
        currencyValuePerToken: listedItem.currencyValuePerToken,
        pricePerToken: listedItem.pricePerToken,
        isReservedListing: listedItem.isReservedListing,
      });
    }

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
          priceToSort: { $toDouble: "$currencyValuePerToken.displayValue" }
        }
      },
      { $sort: sort },
      { $skip: page * ITEM_PER_PAGE },
      { $limit: ITEM_PER_PAGE },
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