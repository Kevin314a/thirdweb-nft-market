import { PosseFormNFT } from "@/lib/types";
import { dbConnect } from "./connect";
import { getContract } from "./contract";
import NFTModel from "../model/NFT";

export const storeNFT = async (newNFT: PosseFormNFT) => {
  try {
    await dbConnect();

    const old = await getNFT(newNFT.collection, BigInt(newNFT.tokenId));
    if (old) {
      return;
    }

    const collection = await getContract(newNFT.collection);
    const nft = new NFTModel({
      collectionId: collection._id,
      tokenId: BigInt(newNFT.tokenId),
      type: newNFT.type,
      name: newNFT.name,
      owner: newNFT.owner,
      description: newNFT.description,
      image: newNFT.image,
      supply: BigInt(newNFT.supply || 0),
      externalLink: newNFT.externalLink,
      traits: newNFT.traits,
    });

    await nft.save();
  } catch (err) {
    console.error("[ERROR ON STORING NFT to DB]", err);
    throw new Error("Failed to store your NFT");
  }
};

export const getNFTs = async (
  conds: { [key: string]: any },
  sort: { [key: string]: any },
  page: number,
) => {
  try {
    await dbConnect();
    return await NFTModel.find(conds)
      .sort(sort)
      .select('-_id')
      .populate({
        path: 'collectionId',
        select: '-_id',
      });
  } catch (err) {
    console.error("[ERROR ON FINDING NFTS on DB]", err);
    throw new Error("Failed to fetch NFTs");
  }
};

export const getNFT = async (
  contractAddr: string,
  tokenId: bigint,
) => {
  try {
    await dbConnect();
    const contract = await getContract(contractAddr);
    return !contract ? null : await NFTModel.findOne({ tokenId, collectionId: contract._id });
  } catch (err) {
    console.error("[ERROR ON FIND AN NFT on DB]", err);
    throw new Error("Failed to fetch an NFT");
  }
};

export const markNFTisonMarket = async (
  contractAddr: string,
  tokenId: bigint,
) => {
  try {
    const oldOne = await getNFT(contractAddr, tokenId);
    if (!oldOne) {
      throw new Error("Failed to get an NFT to mark");
    }
    oldOne.isListed = true;
    await oldOne.save();
    return true;
  } catch (err) {
    console.error("[ERROR ON FIND AN NFT on DB]", err);
    throw new Error("Failed to fetch an NFT");
  }
};

export const updateNFT = async (
  filter: { [key: string]: any },
  data: { [key: string]: any },
) => {
  try {
    await dbConnect();
    if (data.tokenId) {
      data.tokenId = BigInt(data.tokenId);
    }
    if (data.supply) {
      data.supply = BigInt(data.supply);
    }
    await NFTModel.updateMany(filter, data);
  } catch (err) {
    console.error("[ERROR ON UPDATE YOUR NFT on DB]", err);
    throw new Error("Failed to update your NFT");
  }
};

export const deleteNFT = async (collectionAddr: string, tokenId: string, owner: string) => {
  try {
    await dbConnect();
    const contract = await getContract(collectionAddr);
    if (!contract) {
      return false;
    }
    await NFTModel.deleteOne({ tokenId, owner, collectionId: contract._id });
    return true;
  } catch (err) {
    console.error("[ERROR ON burn YOUR NFT on DB]", err);
    throw new Error("Failed to burn your NFT");
  }
};
