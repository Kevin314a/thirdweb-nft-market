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
      return old._id;
    }

    const myContract = await getContract(newNFT.collection);
    if (!myContract) {
      throw new Error("contract is not exist");
    }
    const nft = new NFTModel({
      contract: myContract._id,
      contractAddr: newNFT.collection,
      tokenId: BigInt(newNFT.tokenId),
      type: newNFT.type,
      name: newNFT.name,
      owner: newNFT.owner,
      description: newNFT.description,
      image: newNFT.image,
      supply: BigInt(newNFT.supply || 0),
      // externalLink: newNFT.externalLink,
      traits: newNFT.traits,
      isListed: newNFT.isListed,
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
        path: 'contract',
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
    // const contract = await getContract(contractAddr);
    // return !contract ? null : await NFTModel.findOne({ tokenId, contract: contract._id });
    return await NFTModel.findOne({ contractAddr, tokenId });
  } catch (err) {
    console.error("[ERROR ON FIND AN NFT on DB]", err);
    throw new Error("Failed to fetch an NFT");
  }
};

export const markNFTisonMarket = async (
  contractAddr: string,
  tokenId: bigint,
  flag: boolean,
) => {
  try {
    await dbConnect();
    const result = await NFTModel.updateOne(
      {
        contractAddr, tokenId
      },
      {
        $set: {
          isListed: flag,
        }
      }
    );
    return result.modifiedCount > 0;
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

export const deleteNFT = async (contractAddr: string, tokenId: string, owner: string) => {
  try {
    await dbConnect();
    // const contract = await getContract(collectionAddr);
    // if (!contract) {
    //   return false;
    // }
    await NFTModel.deleteOne({ contractAddr, tokenId, owner });
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
          type: nft.contract.type,
          address: nft.contract.address,
          name: nft.contract.name,
          description: nft.contract.description,
          symbol: nft.contract.symbol,
          image: nft.contract.image,
          royaltyBps: nft.contract.royaltyBps,
          owner: nft.contract.owner,
          traitTypes: nft.contract.traitTypes,
        });
      }
      else {
        const oldContract = await getContract(nft.contract.address);
        if (oldContract && oldContract.owner === accountAddr) {
          // update oldContract
          oldContract.type = nft.contract.type;
          oldContract.address = nft.contract.address;
          oldContract.name = nft.contract.name;
          oldContract.description = nft.contract.description;
          oldContract.symbol = nft.contract.symbol;
          oldContract.image = nft.contract.image;
          oldContract.royaltyBps = nft.contract.royaltyBps;
          oldContract.owner = nft.contract.owner;
          oldContract.traitTypes = nft.contract.traitTypes;
          oldContract.save();

          newContractId = oldContract._id;

        } else if (oldContract && oldContract.owner !== accountAddr) {
          // there is do nothing
          newContractId = oldContract._id;
        } else {
          // store contract from blockchain to db
          newContractId = await storeContract({
            type: nft.contract.type,
            address: nft.contract.address,
            name: nft.contract.name,
            description: nft.contract.description,
            symbol: nft.contract.symbol,
            image: nft.contract.image,
            royaltyBps: nft.contract.royaltyBps,
            owner: nft.contract.owner,
            traitTypes: nft.contract.traitTypes,
          });
        }
      }

      if (!newContractId) {
        continue;
      }

      await NFTModel.findOneAndUpdate(
        { contract: newContractId, tokenId: nft.tokenId },
        {
          $set: {
            contract: newContractId,
            contractAddr: nft.contract.address,
            tokenId: nft.tokenId,
            name: nft.name,
            description: nft.name,
            image: nft.image,
            owner: accountAddr,
            isListed: false,
            traits: nft.traits,
          },
          $setOnInsert: {
            type: "ERC-721",
            history: [],
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