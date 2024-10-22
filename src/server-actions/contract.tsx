'use server'

import { PosseFormContract, PosseViewContract } from "@/lib/types";
import { getContracts, storeContract } from "../lib/db/contract";

export async function deployContract(newContract: PosseFormContract) {
  try {
    await storeContract(newContract);

    const res = {
      error: false,
      message: "Collection is created.",
      action: "Success, your own Contract has been deployed",
    };
    return res;

  } catch (err) {
    console.error('[ERROR ON DEPLOYING CONTRACT]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured deploying your Contract.",
      actions: "Please try again",
    };
    return res;
  }
}

export async function getOwnContracts(owner: string) { //: Promise<PosseViewContract[]> {
  try {
    const data = await getContracts(owner);

    const contracts: PosseViewContract[] = data.map(item => ({
      type: item.type,
      address: item.address,
      name: item.name,
      description: item.description,
      symbol: item.symbol,
      image: item.image,
      platformFeeBps: item.platformFeeBps,
      royaltyBps: item.royaltyBps,
      owner: item.owner,
      traitTypes: item.traitTypes,
    }));
    return JSON.stringify(contracts);

  } catch (err) {
    console.error('[ERROR ON FETCHING OWN CONTRACT]', err);
    return JSON.stringify([]);
  }
}