import { PosseFormContract } from "@/lib/types";
import { dbConnect } from "./connect";
import ContractModel from "../model/Contract";

export const storeContract = async (newContract: PosseFormContract) => {
  await dbConnect();
  const contract = new ContractModel(newContract);
  await contract.save();
};

export const getContracts = async (owner: string) => {
  try {
    await dbConnect();
    return await ContractModel.find(!!owner ? { owner } : {}).sort({ '_id': -1 }).lean();
  } catch (err) {
    console.error("[ERROR ON FETCHING CONTRACTS on DB]", err);
    throw new Error("Failed to fetch Contracts");
  }
};

export const getContract = async (address: string) => {
  await dbConnect();
  const contract = await ContractModel.findOne({ address });
  return contract;
};

export const updateContract = async (filter: { [key: string]: any }, data: { [key: string]: any }) => {
  await dbConnect();
  await ContractModel.updateMany(filter, data);
};

export const deleteContract = async (ids: string | string[]) => {
  await dbConnect();
  typeof ids === 'string' ?
    await ContractModel.deleteOne({ address: ids }) :
    await ContractModel.deleteMany({ address: { $in: ids } });
};
