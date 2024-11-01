'use server'

import { PosseFormDrop, PosseBridgeDrop, PosseBridgeDropMintStage, PosseDBDrop, PosseBridgeLazyNFT } from "@/lib/types";
import { getActiveDrops, getDrop, getDrops, getPastDrops, getUpcomingDrops, storeDrop } from "@/lib/db/drop";
import { toNumber } from "@/lib/utils";
import { getLazyNFTs } from "@/lib/db/lazynft";

export async function deployDrop(newDrop: PosseFormDrop) {
  try {

    const oldOne = await getDrop(newDrop.address);
    if (oldOne) {
      throw new Error("A Drop with the same infos is already exist");
    }
    await storeDrop({
      group: newDrop.group,
      address: newDrop.address,
      name: newDrop.name,
      description: newDrop.description,
      image: newDrop.image,
      payToken: newDrop.payToken,
      owner: newDrop.owner,
      numberOfItems: newDrop.numberOfItems,
      mintStartAt: new Date(newDrop.mintStartAt).getTime(),
      mintStages: newDrop.mintStages?.map((stage) => ({
        name: stage.name,
        price: stage.price,
        currency: stage.currency,
        duration: toNumber(stage.durationd) * 24 * 60 * 60 * 1000 + toNumber(stage.durationh) * 60 * 60 * 1000 + toNumber(stage.durationm) * 60 * 1000,
        perlimit: stage.perlimit,
        allows: stage.allows?.map((allow) => allow.address),
      })),
    });

    const res = {
      error: false,
      message: "Drop is created.",
      actions: "Success, your own Drop has been deployed",
    };
    return res;

  } catch (err) {
    console.error('[ERROR ON DEPLOYING DROP]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured deploying your Drop.",
      actions: "Please try again",
    };
    return res;
  }
}

export async function ownedDrops(accountAddr?: string) {
  try {
    const dbDrops = await getDrops(accountAddr);
    const ownDrops: PosseBridgeDrop[] = dbDrops.map(dbDrop => ({
      group: dbDrop.group,
      address: dbDrop.address,
      name: dbDrop.name,
      description: dbDrop.description,
      image: dbDrop.image,
      payToken: dbDrop.payToken,
      numberOfItems: dbDrop.numberOfItems,
      mintStartAt: dbDrop.mintStartAt,
      owner: dbDrop.owner,
      visible: dbDrop.visible,
      mintStages: dbDrop.mintStages.map((stage: PosseBridgeDropMintStage) => ({
        name: stage.name,
        price: stage.price,
        currency: stage.currency,
        duration: stage.duration,
        perlimit: stage.perlimit,
        allows: stage.allows,
      })),
    }));

    return ownDrops;
  } catch (err) {
    console.error('[ERROR ON GETTING Upcoming Drops]', err);
    return [];
  }
}

export async function fetchDrop(dropAddr: string) {
  try {
    const dbDrop: PosseDBDrop = await getDrop(dropAddr);

    const dbLazyNFTs = dbDrop.group === "LIMITED" ? await getLazyNFTs(
      {
        contractAddr: dropAddr,
      },
      {
        tokenId: -1
      },
      20
    ) : [];

    // TODO getting shared data from here,
    // const sharedData = [];
    // if (dbDrop.group === "UNLIMITED") {
    // }

    const drop: PosseBridgeDrop = {
      group: dbDrop.group,
      address: dbDrop.address,
      name: dbDrop.name,
      description: dbDrop.description,
      image: dbDrop.image,
      payToken: dbDrop.payToken,
      numberOfItems: dbDrop.numberOfItems,
      mintStartAt: dbDrop.mintStartAt,
      owner: dbDrop.owner,
      visible: dbDrop.visible,
      mintStages: dbDrop.mintStages.map((stage: PosseBridgeDropMintStage) => ({
        name: stage.name,
        price: stage.price,
        currency: stage.currency,
        duration: stage.duration,
        perlimit: stage.perlimit,
        allows: stage.allows,
      })),
      createdAt: (new Date(!dbDrop.createdAt ? new Date().getTime() : dbDrop.createdAt)).getTime(),
    };

    const lazyNFTs: PosseBridgeLazyNFT[] = dbLazyNFTs.map((nft) => ({
      contractAddr: nft.contractAddr,
      tokenId: nft.tokenId,
      category: nft.category,
      name: nft.name,
      description: nft.description,
      image: nft.image,
      traits: nft.traits,
    }));

    return { drop, lazyNFTs };
  } catch (err) {
    console.error('[ERROR ON FETCHING DROP]', err);
    return null;
  }
}

export async function upcomingDrops(accountAddr?: string) {
  try {
    const dbDrops = await getUpcomingDrops(accountAddr);
    const resDrops: PosseBridgeDrop[] = dbDrops.map((drop) => ({
      group: drop.group,
      address: drop.address,
      name: drop.name,
      description: drop.description,
      image: drop.image,
      payToken: drop.payToken,
      numberOfItems: drop.numberOfItems,
      mintStartAt: drop.mintStartAt,
      owner: drop.owner,
      mintStages: [{
        name: drop.mintStages.name,
        price: drop.mintStages.price,
        currency: drop.mintStages.currency,
        duration: drop.mintStages.duration,
        perlimit: drop.mintStages.perlimit,
        allows: drop.mintStages.allows,
      }]
    }));

    return resDrops;
  } catch (err) {
    console.error('[ERROR ON GETTING Upcoming Drops]', err);
    return [];
  }
}

export async function activeDrops(accountAddr?: string) {
  try {
    const dbDrops = await getActiveDrops(accountAddr);
    const resDrops: PosseBridgeDrop[] = dbDrops.map((drop) => ({
      group: drop.group,
      address: drop.address,
      name: drop.name,
      description: drop.description,
      image: drop.image,
      payToken: drop.payToken,
      numberOfItems: drop.numberOfItems,
      mintStartAt: drop.mintStartAt,
      owner: drop.owner,
      mintStages: [{
        name: drop.mintStages.name,
        price: drop.mintStages.price,
        currency: drop.mintStages.currency,
        duration: drop.mintStages.duration,
        perlimit: drop.mintStages.perlimit,
        allows: drop.mintStages.allows,
      }]
    }));

    return resDrops;
  } catch (err) {
    console.error('[ERROR ON GETTING Active Drops]', err);
    return [];
  }
}

export async function pastDrops(accountAddr?: string) {
  try {
    const dbDrops = await getPastDrops(accountAddr);
    const resDrops: PosseBridgeDrop[] = dbDrops.map((drop) => ({
      group: drop.group,
      address: drop.address,
      name: drop.name,
      description: drop.description,
      image: drop.image,
      payToken: drop.payToken,
      numberOfItems: drop.numberOfItems,
      mintStartAt: drop.mintStartAt,
      owner: drop.owner,
      mintStages: [{
        name: drop.mintStages.name,
        price: drop.mintStages.price,
        currency: drop.mintStages.currency,
        duration: drop.mintStages.duration,
        perlimit: drop.mintStages.perlimit,
        allows: drop.mintStages.allows,
      }]
    }));

    return resDrops;
    return [];
  } catch (err) {
    console.error('[ERROR ON GETTING Past Drops]', err);
    return [];
  }
}