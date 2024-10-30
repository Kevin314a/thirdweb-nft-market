import DropModel from "@/lib/model/Drop";
import { PosseDBDrop, PosseBridgeDrop } from "@/lib/types";
import { dbConnect } from "./connect";

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

export const getUpcomingDrops = async (): Promise<PosseDBDrop[]> => {
  try {
    await dbConnect();
    return await DropModel.find({});
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
