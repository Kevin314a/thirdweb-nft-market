import NFTModel from "@/lib/model/NFT";
import MarketModel from "@/lib/model/Market";
import { PosseFormNFT, PosseViewNFT } from "@/lib/types";
import { dbConnect } from "./connect";
import { getContract, storeContract } from "./contract";

export const storeNFT = async (
  newNFT: PosseFormNFT
) => {
  try {
    await dbConnect();

    const oldOne = await getNFT(newNFT.collection, newNFT.tokenId);
    if (oldOne) {
      return oldOne._id;
    }

    const myContract = await getContract(newNFT.collection);
    if (!myContract) {
      throw new Error("contract is not exist");
    }

    const nft = new NFTModel({
      contract: myContract._id,
      contractAddr: newNFT.collection,
      tokenId: newNFT.tokenId,
      type: newNFT.type,
      name: newNFT.name,
      description: newNFT.description,
      image: newNFT.image,
      supply: newNFT.supply,
      traits: newNFT.traits,
      listedId: newNFT.listedId,
      owner: newNFT.owner,
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
  tokenId: string,
) => {
  try {
    await dbConnect();
    return await NFTModel.findOne({ contractAddr, tokenId });
  } catch (err) {
    console.error("[ERROR ON FIND AN NFT on DB]", err);
    throw new Error("Failed to fetch an NFT");
  }
};

export const updateNFT = async (
  filter: { [key: string]: any },
  data: { [key: string]: any },
  options?: { [key: string]: any },
) => {
  try {
    await dbConnect();
    return await NFTModel.updateMany(filter, data, options);
  } catch (err) {
    console.error("[ERROR ON UPDATE YOUR NFT on DB]", err);
    throw new Error("Failed to update your NFT");
  }
};

export const findOneAndUpdateNFT = async (
  filter: { [key: string]: any },
  data: { [key: string]: any },
  options?: { [key: string]: any },
) => {
  try {
    await dbConnect();
    return await NFTModel.findOneAndUpdate(filter, data, options);
  } catch (err) {
    console.error("[ERROR ON FINDONAND UPDATE NFT on DB]", err);
    throw new Error("Failed to updateone your NFT");
  }
};

export const deleteNFT = async (
  contractAddr: string,
  tokenId: string,
  owner: string
) => {
  try {
    await dbConnect();
    await NFTModel.deleteOne({ contractAddr, tokenId, owner });
    return true;
  } catch (err) {
    console.error("[ERROR ON burn YOUR NFT on DB]", err);
    throw new Error("Failed to burn your NFT");
  }
};

export const bulkUpdateNFTs = async (
  accountAddr: string,
  nfts: PosseViewNFT[]
) => {
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
            traits: nft.traits,
            listedId: "0",
            owner: accountAddr,
          },
          $setOnInsert: {
            type: "ERC-721",
            history: [],
          },
        },
        { new: true, upsert: true }
      );

      const oldMarket = await MarketModel.findOne({
        assetContractAddress: nft.contract.address, tokenId: nft.tokenId
      });
      if (oldMarket) {
        await NFTModel.findOneAndUpdate(
          { contractAddr: nft.contract.address, tokenId: nft.tokenId },
          {
            $set: {
              listedId: oldMarket.mid,
            }
          }
        );
      }
    }
  } catch (err) {
    console.error("[ERROR ON STORING NFT to DB]", err);
    throw new Error("Failed to store your NFT");
  }

};

export const removeDuplicatedNFTs = async (
) => {
  try {
    await dbConnect();
    
    const duplicates = await NFTModel.aggregate([
      {
        $group: {
          _id: {
            field1: "$contractAddr", // Replace with your actual field names
            field2: "$tokenId"
          },
          idToKeep: { $first: "$_id" },  // Keep the first document's ID
          count: { $sum: 1 } // Count occurrences
        }
      },
      {
        $match: { count: { $gt: 1 } }  // Only keep groups with duplicates
      }
    ]);
    
    // Iterate through the duplicates and remove them
    for (const doc of duplicates) {
      await NFTModel.deleteMany({
        contractAddr: doc._id.field1,
        tokenId: doc._id.field2,
        _id: { $ne: doc.idToKeep }  // Keep the document we want to keep
      });
    }

  } catch (err) {
    console.error("[ERROR ON REMOVING DUPLICATED NFTs FROM DB]", err);
    throw new Error("Failed to removing duplicated NFTs");
  }
};