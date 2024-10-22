import { PosseFormNFT } from "@/lib/types";
import { dbConnect } from "./connect";
import { getContract } from "./contract";
import NFTModel from "../model/NFT";

export const storeNFT = async (newNFT: PosseFormNFT) => {
  await dbConnect();
  const collection = await getContract(newNFT.collection);
  const nft = new NFTModel({
    collectionId: collection._id,
    tokenId: newNFT.tokenId,
    type: newNFT.type,
    name: newNFT.name,
    owner: newNFT.owner,
    description: newNFT.description,
    image: newNFT.image,
    supply: newNFT.supply,
    externalLink: newNFT.externalLink,
    traits: newNFT.traits,
  });

  await nft.save();
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

export const updateNFT = async (
  filter: { [key: string]: any },
  data: { [key: string]: any },
) => {
  await dbConnect();
  await NFTModel.updateMany(filter, data);
};

export const deleteNFT = async (collectionAddr: string, tokenId: string, owner: string) => {
  await dbConnect();
  const contract = await getContract(collectionAddr);
  if (!contract) {
    return false;
  }
  await NFTModel.deleteOne({ tokenId, owner, collectionId: contract._id });
  return true;
};