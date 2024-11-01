import LazyNFTModel from "@/lib/model/LazyNFT";
import { PosseBridgeLazyNFT } from "@/lib/types";
import { dbConnect } from "./connect";

export const storeLazyNFT = async (
  newNFT: PosseBridgeLazyNFT
) => {
  try {
    await dbConnect();
    const oldOne = await getLazyNFT(newNFT.contractAddr, newNFT.tokenId);
    if (oldOne) {
      return oldOne._id;
    }
    const nft = new LazyNFTModel(newNFT);
    return await nft.save();
  } catch (err) {
    console.error("[ERROR ON STORING LAZY NFT to DB]", err);
    throw new Error("Failed to store lazy NFT");
  }
};

export const getLazyNFTs = async (
  conds: { [key: string]: any },
  sort: { [key: string]: any },
  page: number,
) => {
  try {
    await dbConnect();
    return await LazyNFTModel.find(conds)
      .sort(sort)
      .select('-_id')
      .populate({
        path: 'contract',
        select: '-_id',
      });
  } catch (err) {
    console.error("[ERROR ON FINDING LAZY NFTS on DB]", err);
    throw new Error("Failed to fetch LAZY NFTs");
  }
};

export const getLazyNFT = async (
  contractAddr: string,
  tokenId: string,
) => {
  try {
    await dbConnect();
    return await LazyNFTModel.findOne({ contractAddr, tokenId });
  } catch (err) {
    console.error("[ERROR ON FIND a LAZY NFT on DB]", err);
    throw new Error("Failed to fetch an LAZY NFT");
  }
};

export const updateLazyNFT = async (
  filter: { [key: string]: any },
  data: { [key: string]: any },
  options?: { [key: string]: any },
) => {
  try {
    await dbConnect();
    return await LazyNFTModel.updateMany(filter, data, options);
  } catch (err) {
    console.error("[ERROR ON UPDATE LAZY NFT on DB]", err);
    throw new Error("Failed to update lazy NFT");
  }
};

export const findOneAndUpdateLazyNFT = async (
  filter: { [key: string]: any },
  data: { [key: string]: any },
  options?: { [key: string]: any },
) => {
  try {
    await dbConnect();
    return await LazyNFTModel.findOneAndUpdate(filter, data, options);
  } catch (err) {
    console.error("[ERROR ON FINDONAND UPDATE LAZY NFT on DB]", err);
    throw new Error("Failed to updateone your LAZY NFT");
  }
};

