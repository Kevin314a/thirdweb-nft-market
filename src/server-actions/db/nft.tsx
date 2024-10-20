import { PosseDBNFT } from "@/lib/types";
import { InsertOneResult } from "mongodb";
import { insertDocument, updateDocument } from ".";

export async function storeNFT(
  newNFT: PosseDBNFT,
): Promise<InsertOneResult<Document>> {
  try {
    return await insertDocument("nfts", newNFT);
  } catch (err) {
    console.error("[ERROR ON CREATE NFT TO DB]", err);
    throw new Error("[ERROR ON CREATE NFT TO DB]");
  }
}

export async function getNFTs(
  conds: { [key: string]: any },
  page: number,
  sort: { [key: string]: any },
  creator?: string,
  owner?: string,
  tokenId?: string,
): Promise<PosseDBNFT[]> {
  return [];
}

export async function updateNFT(
  filter: { [key: string]: any },
  data: { [key: string]: any },
): Promise<Boolean> {
  try {
    return await updateDocument("nfts", filter, data);
  } catch (err) {
    console.error("[ERROR ON UPDATE NFT TO DB]", err);
    throw new Error("[ERROR ON UPDATE NFT TO DB]");
  }
}

export async function deleteNFT(
  ids: string | string[],
): Promise<boolean> {

  return false;
}
