'use server'

import { PosseDBContract } from "@/lib/types";
import { storeContract } from "./db/contract";


export async function deployContract(newContract: PosseDBContract) {
  try {
    // insert token to db
    await storeContract(newContract);

    const res = {
      error: false,
      message: "Collection is created.",
      action: "Success, your own Contract has been deployed",
    };
    return res;

  } catch (err) {
    console.error('[ERROR ON CREATING NFT]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured deploying your Contract.",
      actions: "Please try again",
    };
    return res;
  }
}