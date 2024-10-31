import DropModel from "@/lib/model/Drop";
import { PosseDBDrop, PosseBridgeDrop } from "@/lib/types";
import { dbConnect } from "./connect";
import { isAddress } from "thirdweb";

export const storeDrop = async (newDrop: PosseBridgeDrop) => {
  try {
    await dbConnect();
    const oldOne = await getDrop(newDrop.address);
    if (oldOne) {
      return oldOne._id;
    }
    const contract = new DropModel(newDrop);
    return await contract.save();
  } catch (err) {
    console.error("[ERROR ON STORING DROP to DB]", err);
    throw new Error("Failed to store your drop");
  }
};

export const getDrops = async (owner: string) => {
  try {
    await dbConnect();
    return await DropModel.find(!!owner ? { owner } : {}).sort({ '_id': -1 });
  } catch (err) {
    console.error("[ERROR ON FETCHING DROPS on DB]", err);
    throw new Error("Failed to fetch Drops");
  }
};

export const getUpcomingDrops = async (accountAddr: string | undefined) => {
  try {
    await dbConnect();

    const condsMintStageAllow = (!accountAddr || !isAddress(accountAddr)) ? [{ 'mintStages.allows': { $size: 0 } }] : [
      { 'mintStages.allows': { $elemMatch: { $eq: accountAddr } } },
      { 'mintStages.allows': { $size: 0 } },
    ];
    const currentDate = (new Date()).getTime();

    return await DropModel.aggregate([
      {
        $unwind: {
          path: '$mintStages',
          preserveNullAndEmptyArrays: true, // Keep documents without mintStages
        },
      },
      {
        $match: {
          $or: condsMintStageAllow,
          $expr: {
            $gt: [
              { $add: ['$mintStartAt', '$mintStages.duration'] },
              currentDate,
            ],
          },
        },
      },
      {
        $addFields: {
          totalMintTime: { $add: ['$mintStartAt', '$mintStages.duration'] }, // Create a temporary field
        },
      },
      {
        $sort: {
          totalMintTime: 1, // Sort by the new field in ascending order
        },
      },
      {
        $project: {
          _id: 0,
          group: 1,
          address: 1,
          name: 1,
          description: 1,
          image: 1,
          payToken: 1,
          numberOfItems: 1,
          mintStartAt: 1,
          'mintStages': 1, // Include the unwinded mintStages
          owner: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]).exec();

  } catch (err) {
    console.error("[ERROR ON FETCHING UPCOMING DROPS on DB]", err);
    throw new Error("Failed to fetch upcoming drops");
  }
};


export const getActiveDrops = async (accountAddr: string | undefined) => {
  try {
    await dbConnect();

    const condsMintStageAllow = (!accountAddr || !isAddress(accountAddr)) ? [{ 'mintStages.allows': { $size: 0 } }] : [
      { 'mintStages.allows': { $elemMatch: { $eq: accountAddr } } },
      { 'mintStages.allows': { $size: 0 } },
    ];
    const now = Date.now();

    return await DropModel.aggregate([
      {
        $unwind: {
          path: '$mintStages',
          preserveNullAndEmptyArrays: true, // Keep documents without mintStages
        },
      },
      {
        $match: {
          $or: condsMintStageAllow,
          $expr: {
            $and: [
              { $gte: [{ $add: ["$mintStartAt", "$mintStages.duration"] }, now] }, // Check if mintStartAt + duration is greater than now
              { $lte: ["$mintStartAt", now] } // Check if mintStartAt is less than or equal to now
            ],
          },
        },
      },
      {
        $addFields: {
          totalMintTime: { $add: ['$mintStartAt', '$mintStages.duration'] }, // Create a temporary field
        },
      },
      {
        $sort: {
          totalMintTime: 1, // Sort by the new field in ascending order
        },
      },
      {
        $project: {
          _id: 0,
          group: 1,
          address: 1,
          name: 1,
          description: 1,
          image: 1,
          payToken: 1,
          numberOfItems: 1,
          mintStartAt: 1,
          'mintStages': 1, // Include the unwinded mintStages
          owner: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      { $limit: 5 }
    ]).exec();

  } catch (err) {
    console.error("[ERROR ON FETCHING UPCOMING DROPS on DB]", err);
    throw new Error("Failed to fetch upcoming drops");
  }
};



export const getPastDrops = async (accountAddr: string | undefined) => {
  try {
    await dbConnect();

    const condsMintStageAllow = (!accountAddr || !isAddress(accountAddr)) ? [{ 'mintStages.allows': { $size: 0 } }] : [
      { 'mintStages.allows': { $elemMatch: { $eq: accountAddr } } },
      { 'mintStages.allows': { $size: 0 } },
    ];
    const now = Date.now();

    const yesterdayStart = new Date();
    yesterdayStart.setHours(0, 0, 0, 0);
    const yesterdayTimestamp = yesterdayStart.getTime();

    return await DropModel.aggregate([
      {
        $unwind: {
          path: '$mintStages',
          preserveNullAndEmptyArrays: true, // Keep documents without mintStages
        },
      },
      {
        $match: {
          $or: condsMintStageAllow,
          $expr: { $lt: [{ $add: ["$mintStartAt", "$mintStages.duration"] }, yesterdayTimestamp] },
        },
      },
      {
        $addFields: {
          totalMintTime: { $add: ['$mintStartAt', '$mintStages.duration'] }, // Create a temporary field
        },
      },
      {
        $sort: {
          totalMintTime: -1, // Sort by the new field in ascending order
        },
      },
      {
        $project: {
          _id: 0,
          group: 1,
          address: 1,
          name: 1,
          description: 1,
          image: 1,
          payToken: 1,
          numberOfItems: 1,
          mintStartAt: 1,
          'mintStages': 1, // Include the unwinded mintStages
          owner: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      { $limit: 5 }
    ]).exec();

  } catch (err) {
    console.error("[ERROR ON FETCHING UPCOMING DROPS on DB]", err);
    throw new Error("Failed to fetch upcoming drops");
  }
};


export const getDrop = async (address: string) => {
  try {
    await dbConnect();
    const drop = await DropModel.findOne({ address });
    return drop;
  } catch (err) {
    console.error("[ERROR ON FETCHING a CONTRACT on DB]", err);
    throw new Error("Failed to fetch a Contract");
  }
};

export const updateDrop = async (filter: { [key: string]: any }, data: { [key: string]: any }) => {
  try {
    await dbConnect();
    await DropModel.updateMany(filter, data);
  } catch (err) {
    console.error("[ERROR ON UPDATING a DROP on DB]", err);
    throw new Error("Failed to update a Drop");
  }
};

export const deleteDrop = async (ids: string | string[]) => {
  try {
    await dbConnect();
    typeof ids === 'string' ?
      await DropModel.deleteOne({ address: ids }) :
      await DropModel.deleteMany({ address: { $in: ids } });
  } catch (err) {
    console.error("[ERROR ON DELETEING a DROP on DB]", err);
    throw new Error("Failed to delete a Drop");
  }
};
