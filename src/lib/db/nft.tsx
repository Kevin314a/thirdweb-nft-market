import { PosseFormNFT, PosseViewNFT } from "@/lib/types";
import { dbConnect } from "./connect";
import { getContract, storeContract } from "./contract";
import NFTModel from "../model/NFT";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

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
      // externalLink: newNFT.externalLink,
      traits: newNFT.traits,
    });

    return await nft.save();
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

export const bulkUpdateNFTs = async (accountAddr: string, nfts: PosseViewNFT[]) => {

  try {
    await dbConnect();

    for (let i = 0; i < nfts.length; ++i) {
      const nft = nfts[i];

      let newContractId = null;
      if (!!nft.name) {
        // this nft is not minted via thirdweb!!!!
        // storeContract
        newContractId = await storeContract({
          type: nft.collectionId.type,
          address: nft.collectionId.address,
          name: nft.collectionId.name,
          description: nft.collectionId.description,
          symbol: nft.collectionId.symbol,
          image: nft.collectionId.image,
          royaltyBps: nft.collectionId.royaltyBps,
          owner: nft.collectionId.owner,
          traitTypes: nft.collectionId.traitTypes,
        });
      }
      else {
        const oldContract = await getContract(nft.collectionId.address);
        if (oldContract && oldContract.owner === accountAddr) {
          // update oldContract
          oldContract.type = nft.collectionId.type;
          oldContract.address = nft.collectionId.address;
          oldContract.name = nft.collectionId.name;
          oldContract.description = nft.collectionId.description;
          oldContract.symbol = nft.collectionId.symbol;
          oldContract.image = nft.collectionId.image;
          oldContract.royaltyBps = nft.collectionId.royaltyBps;
          oldContract.owner = nft.collectionId.owner;
          oldContract.traitTypes = nft.collectionId.traitTypes;
          oldContract.save();

          newContractId = oldContract._id;

        } else if (oldContract && oldContract.owner !== accountAddr) {
          // there is do nothing
          newContractId = oldContract._id;
        } else {
          // store contract from blockchain to db
          newContractId = await storeContract({
            type: nft.collectionId.type,
            address: nft.collectionId.address,
            name: nft.collectionId.name,
            description: nft.collectionId.description,
            symbol: nft.collectionId.symbol,
            image: nft.collectionId.image,
            royaltyBps: nft.collectionId.royaltyBps,
            owner: nft.collectionId.owner,
            traitTypes: nft.collectionId.traitTypes,
          });
        }
      }

      if (!newContractId) {
        continue;
      }

      await NFTModel.findOneAndUpdate(
        { collectionId: newContractId, tokenId: nft.tokenId },
        {
          $set: {
            collectionId: newContractId,
            tokenId: nft.tokenId,
            name: nft.name,
            description: nft.name,
            image: nft.image,
            owner: accountAddr,
            isListed: false,
          },
          $setOnInsert: {
            type: "ERC-721",
            history: [],
            traits: [],
          },
        },
        { new: true, upsert: true }
      );
    }
  } catch (err) {
    console.error("[ERROR ON STORING NFT to DB]", err);
    throw new Error("Failed to store your NFT");
  }

};