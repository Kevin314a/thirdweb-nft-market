import ContractModel from "@/lib/model/Contract";
import { PosseFormContract } from "@/lib/types";
import { dbConnect } from "./connect";

export const storeContract = async (newContract: PosseFormContract) => {
  try {
    await dbConnect();

    const oldOne = await getContract(newContract.address);
    if (oldOne) {
      return oldOne._id;
    }

    const contract = new ContractModel({
      type: newContract.type,
      address: newContract.address,
      name: newContract.name,
      description: newContract.description,
      symbol: newContract.symbol,
      image: newContract.image,
      royaltyBps: newContract.royaltyBps,
      owner: newContract.owner,
      traitTypes: newContract.traitTypes,
    });
    return await contract.save();
  } catch (err) {
    console.error("[ERROR ON STORING CONTRACT to DB]", err);
    throw new Error("Failed to store your contract");
  }
};

export const getContracts = async (owner: string) => {
  try {
    await dbConnect();
    return await ContractModel.find(!!owner ? { owner } : {}).sort({ '_id': -1 });
  } catch (err) {
    console.error("[ERROR ON FETCHING CONTRACTS on DB]", err);
    throw new Error("Failed to fetch Contracts");
  }
};

export const getContract = async (address: string) => {
  try {
    await dbConnect();
    const contract = await ContractModel.findOne({ address });
    return contract;
  } catch (err) {
    console.error("[ERROR ON FETCHING a CONTRACT on DB]", err);
    throw new Error("Failed to fetch a Contract");
  }
};

export const updateContract = async (filter: { [key: string]: any }, data: { [key: string]: any }) => {
  try {
    await dbConnect();
    await ContractModel.updateMany(filter, data);
  } catch (err) {
    console.error("[ERROR ON UPDATING a CONTRACT on DB]", err);
    throw new Error("Failed to update a Contract");
  }
};

export const deleteContract = async (ids: string | string[]) => {
  try {
    await dbConnect();
    typeof ids === 'string' ?
      await ContractModel.deleteOne({ address: ids }) :
      await ContractModel.deleteMany({ address: { $in: ids } });
  } catch (err) {
    console.error("[ERROR ON DELETEING a CONTRACT on DB]", err);
    throw new Error("Failed to delete a Contract");
  }
};
