'use server'

import { PosseFormDrop, PosseBridgeDrop } from "@/lib/types";
import { getDrop, getUpcomingDrops, storeDrop } from "@/lib/db/drop";
import { toNumber } from "@/lib/utils";

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

export async function upcomingDrops() {
  try {
    //TODO upcoming drops db -> bridge
    const dbDrops = await getUpcomingDrops();

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
      mintStages: drop.mintStages.map((stage) => ({
        name: stage.name,
        price: stage.price,
        currency: stage.currency,
        duration: stage.duration,
        perlimit: stage.perlimit,
        allows: stage.allows,
      })),
    }));

    return resDrops;
  } catch (err) {
    console.error('[ERROR ON GETTING Upcoming Drops]', err);
    return [];
  }
}

export async function activeDrops() {
  try {
    return await getUpcomingDrops();
  } catch (err) {
    console.error('[ERROR ON GETTING Active Drops]', err);
    return [];
  }
}

export async function pastDrops() {
  try {
    return await getUpcomingDrops();
  } catch (err) {
    console.error('[ERROR ON GETTING Past Drops]', err);
    return [];
  }
}