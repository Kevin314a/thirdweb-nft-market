'use server'

import { PosseDBNFT } from "@/lib/types";
import { storeNFT } from "./db/nft";

export async function createNFT(newNFT: PosseDBNFT) {
  try {
    // insert token to db
    await storeNFT(newNFT);

    const res = {
      error: false,
      message: "Your new NFT is minted",
      action: "Success, your own NFT has been created",
    };

    return res;
  } catch (err) {
    console.error('[ERROR ON CREATING NFT]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured minting your NFT.",
      actions: "Please try again",
    };
    return res;
  }
}