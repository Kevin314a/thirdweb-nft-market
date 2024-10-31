'use server'

import { PosseFormContract, PosseBridgeContract } from "@/lib/types";
import { getContract, getContracts, storeContract } from "@/lib/db/contract";

export async function deployContract(newContract: PosseFormContract) {
  try {
    const oldOne = await getContract(newContract.address);
    if (oldOne) {
      throw new Error("A Collection with the same infos is already exist")
    }

    await storeContract({
      category: newContract.category,
      address: newContract.address,
      name: newContract.name,
      description: newContract.description,
      symbol: newContract.symbol,
      image: newContract.image,
      royaltyBps: newContract.royaltyBps,
      owner: newContract.owner,
      traitTypes: newContract.traitTypes,
    });

    const res = {
      error: false,
      message: "Collection is created.",
      actions: "Success, your own Contract has been deployed",
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

export async function getOwnContracts(owner: string) {
  try {
    const data = await getContracts(owner);
    const contracts: PosseBridgeContract[] = data.map(item => ({
      category: item.category,
      address: item.address,
      name: item.name,
      description: item.description,
      symbol: item.symbol,
      image: item.image,
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