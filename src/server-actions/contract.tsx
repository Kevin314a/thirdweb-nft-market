'use server'

import { client } from "@/lib/admin/constants";
import { PossePreContract, PosseDBContract } from "@/lib/types";
import { soneiumMinato } from "thirdweb/chains";
import { deployERC721Contract, deployERC1155Contract } from "thirdweb/deploys";
import { resolveScheme } from "thirdweb/storage";
import { Account } from "thirdweb/wallets";
import { storeContract } from "./db/contract";
import JSONbig from "json-bigint";


export async function deployContract(newContract: PosseDBContract, strAccount: string) {
  try {

    const account: Account = JSONbig.parse(strAccount);

    if (!["ERC-1155", "ERC-721"].includes(newContract.type)) {
      const res = {
        error: true,
        message: "The type of Contract is invalid.",
        actions: "Please try again",
      };
      return res;
    }

    // deploy collection via thirdweb

    const deployedContractAddress = newContract.type === "ERC-1155" ?
      await deployERC1155Contract({
        chain: soneiumMinato,
        client,
        account: account,
        type: "TokenERC1155",
        params: {
          name: newContract.name,
          symbol: newContract.symbol,
          description: newContract.description,
          platformFeeBps: BigInt(newContract.platformFeeBps || 0),
          royaltyBps: BigInt(newContract.royaltyBps || 0),
        },
      })
      :
      await deployERC721Contract({
        chain: soneiumMinato,
        client,
        account: account,
        type: "TokenERC721",
        params: {
          name: newContract.name,
          symbol: newContract.symbol,
          description: newContract.description,
          platformFeeBps: BigInt(newContract.platformFeeBps || 0),
          royaltyBps: BigInt(newContract.royaltyBps || 0),
        },
      });

    newContract.owner = account.address;
    
    const toDBContract = newContract;
    if (newContract.image) {
      const url = resolveScheme({
        client,
        uri: newContract.image,
      });
      toDBContract.image = url;
    }
    toDBContract.address = deployedContractAddress;

    // insert token to db
    await storeContract(toDBContract);

    const res = {
      error: false,
      message: "Contract deployed",
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