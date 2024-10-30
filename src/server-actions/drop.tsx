'use server'

import { PosseFormDrop, PosseViewDrop } from "@/lib/types";
import { getUpcomingDrops, storeDrop } from "@/lib/db/drop";

export async function deployDrop(newDrop: PosseFormDrop) {
  try {
    await storeDrop(newDrop);

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

    const resDrops: PosseViewDrop[] = dbDrops.map((drop) => ({
      group: drop.group,
      address: drop.address,
      name: drop.name,
      description: drop.description,
      image: drop.image,
      payToken: drop.payToken,
      numberOfItems: drop.numberOfItems,
      mintStartAt: drop.mintStartAt.toISOString(),
      owner: drop.owner,
      mintStages: drop.mintStages.map((stage) => ({
        name: stage.name,
        price: stage.price,
        currency: stage.currency,
        durationd: stage.durationd,
        durationh: stage.durationh,
        durationm: stage.durationm,
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