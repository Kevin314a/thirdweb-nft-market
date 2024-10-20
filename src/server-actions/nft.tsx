'use server'

import { client } from "@/lib/admin/constants";
import { PosseDBNFT } from "@/lib/types";
import { getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { isERC1155, mintTo as mintTo1155, nextTokenIdToMint as nextTokenIdToMint1155 } from "thirdweb/extensions/erc1155";
import { isERC721, mintTo as mintTo721, nextTokenIdToMint as nextTokenIdToMint721 } from "thirdweb/extensions/erc721";
import { Account } from "thirdweb/wallets";
import { resolveScheme } from "thirdweb/storage";
import { storeNFT } from "./db/nft";
import JSONbig from "json-bigint";

export async function createNFT(newNFT: PosseDBNFT, strAccount: string) {
  try {
    const account: Account = JSONbig.parse(strAccount);

    // mint nft via thirdweb

    // first of all, check this contract is a valid NFT Collection.
    const masterContract = getContract({
      chain: soneiumMinato,
      client,
      address: newNFT.collection,
    });
    const { data: is721, isLoading: isChecking721 } = useReadContract(isERC721, {
      contract: masterContract, queryOptions: { enabled: true }
    });
    const { data: is1155, isLoading: isChecking1155 } = useReadContract(isERC1155, {
      contract: masterContract, queryOptions: { enabled: true }
    });
    const isNFTCollection = is1155 || is721;

    if (!isNFTCollection && !isChecking1155 && !isChecking721) {
      console.error("[YOU MINTED AN NFT TO INVALID COLLECTION]");
      throw new Error("[YOU MINTED AN NFT TO INVALID COLLECTION]");
    }

    // after check collection, then check about user can mint NFT to this collection.
    // TODO:


    // Minting NFT to the collection that user selected, via thirdweb-api
    const records = newNFT.traits?.map(trait => ({
      display_type: "string",
      trait_type: trait.type,
      value: trait.name,
    }));

    const transaction = !!is1155 ? mintTo1155({
      contract: masterContract,
      to: account.address,
      supply: BigInt(newNFT.supply || 0),
      nft: {
        name: newNFT.name,
        description: newNFT.description,
        image: newNFT.image,
        external_url: newNFT.externalLink,
        properties: records,
      }
    }) : mintTo721({
      contract: masterContract,
      to: account.address,
      nft: {
        name: newNFT.name,
        description: newNFT.description,
        image: newNFT.image,
        external_url: newNFT.externalLink,
        properties: records,
      }
    });

    const tx = await sendTransaction({ transaction, account });
    const receipt = await waitForReceipt(tx);

    newNFT.type = !is1155 ? "ERC-721" : "ERC-1155";

    newNFT.tokenId = ((!is1155 ?
      await nextTokenIdToMint1155({ contract: masterContract }) :
      await nextTokenIdToMint721({ contract: masterContract })) - 1n
    ).toString();

    const toDBNFT = newNFT;
    if (newNFT.image) {
      const url = resolveScheme({
        client,
        uri: newNFT.image,
      });
      toDBNFT.image = url;
    }

    // insert token to db
    await storeNFT(toDBNFT);

    const res = {
      error: false,
      message: "NFT created",
      action: "Success, your own NFT has been created",
    };

    return res;
  } catch (err) {
    console.error('[ERROR ON CREATING NFT]', err);
    const res = {
      error: true,
      message: "Sorry, an error occured creating your NFT.",
      actions: "Please try again",
    };
    return res;
  }
}