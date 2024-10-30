'use server'

import { PosseFormDrop } from "@/lib/types";
import { storeDrop } from "@/lib/db/drop";

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