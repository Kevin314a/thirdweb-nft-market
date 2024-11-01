'use server'

import { getDrop } from "@/lib/db/drop";
import { storeLazyNFT, getLazyNFTs, getLazyNFT } from "@/lib/db/lazynft";
import { PosseFormLazyNFT } from "@/lib/types";

export async function lazyMintNFT(newNFT: PosseFormLazyNFT) {
  try {

    const oldOne = await getLazyNFT(newNFT.collection, newNFT.tokenId);
    if (oldOne) {
      throw new Error("An Lazy NFT with the same infos is exist")
    }

    const parentDrop = await getDrop(newNFT.collection);
    if (!parentDrop) {
      throw new Error("The Contract with the address is not exist");
    }

    await storeLazyNFT({
      contract: parentDrop._id,
      contractAddr: newNFT.collection,
      tokenId: newNFT.tokenId,
      category: newNFT.category,
      name: newNFT.name,
      description: newNFT.description,
      image: newNFT.image,
      traits: newNFT.traits,
    });

    const res = {
      error: false,
      message: "Lazy NFT is minted",
      actions: "Success, Lazy NFT has been created",
    };
    return res;

  } catch (err) {
    console.error('[ERROR ON CREATING NFT]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured minting Lazy NFT.",
      actions: "Please try again",
    };
    return res;
  }
}
