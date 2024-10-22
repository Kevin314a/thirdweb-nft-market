'use server'

import { PosseFormNFT, PosseViewNFT } from "@/lib/types";
import { cookies } from "next/headers";
import { storeNFT, getNFTs } from "../lib/db/nft";

export async function createNFT(newNFT: PosseFormNFT) {
  try {
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

export async function getPortfolioNFTs(_search: string, _sort: string, _page: number){//: Promise<PosseViewNFT[]> {
  try {
    const cookieStore = cookies();
    const accountAddr = cookieStore.get('userAddr')?.value;

    let conds: { [key: string]: any } = {
      owner: accountAddr,
    };
    if (!!_search) {
      conds = {
        ...conds,
        '$or': {
          name: { $regex: _search, $options: "i" },
          description: { $regex: _search, $options: "i" },
        }
      };
    }

    const sort = _sort === "NAME" ? { name: 1 }
      : (_sort === "CREATEDASC" ? { _id: 1 }
        : { _id: 1 });

    const page = _page;

    const data = await getNFTs(conds, sort, page);

    const nfts: PosseViewNFT[] = data.map(item => ({
      collectionId: item.collectionId,
      tokenId: item.tokenId,
      type: item.type,
      name: item.name,
      description: item.description,
      image: item.image,
      supply: item.supply,
      externalLink: item.externalLink,
      traits: item.traits,
      owner: item.owner,
    }));
    return JSON.stringify(nfts);

  } catch (err) {
    console.error('[ERROR ON FETCHING OWN NFT]', err);
    return JSON.stringify([]);
  }
};