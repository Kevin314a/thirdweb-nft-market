import { PosseDBContract } from "@/lib/types";
import { InsertOneResult } from "mongodb";
import { insertDocument, updateDocument } from ".";
import { connectToDB } from "@/lib/db";

export async function storeContract(
  newContract: PosseDBContract,
): Promise<InsertOneResult<Document>> {
  try {
    return await insertDocument("contracts", newContract);
  } catch (err) {
    console.error("[ERROR ON CREATE CONTRACT TO DB]", err);
    throw new Error("[ERROR ON CREATE CONTRACT TO DB]");
  }
}

export async function getOwnContracts(
  owner: string,
): Promise<PosseDBContract[]> {
  try {
    const db = await connectToDB();
    const collection = db.collection<PosseDBContract>("contracts");
    const result = await collection.find({owner}).toArray();
    return result;
  } catch (err) {
    console.error("[ERROR ON `getOwnContracts`]", err);
    return [];
  }
}

export async function getContracts(
  conds: { [key: string]: any },
  page: number,
  sort: { [key: string]: any },
  creator?: string,
  owner?: string,
  tokenId?: string,
): Promise<PosseDBContract[]> {
  return [];
}

export async function updateContract(
  filter: { [key: string]: any },
  data: { [key: string]: any },
): Promise<Boolean> {
  try {
    return await updateDocument("contracts", filter, data);
  } catch (err) {
    console.error("[ERROR ON UPDATE CONTRACT TO DB]", err);
    throw new Error("[ERROR ON UPDATE CONTRACT TO DB]");
  }
}

export async function deleteContract(
  ids: string | string[],
): Promise<boolean> {

  return false;
}
