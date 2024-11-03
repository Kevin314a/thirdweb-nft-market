'use server'

import { MARKETPLACE_CONTRACT } from "@/lib/constants";
import { getContract } from "@/lib/db/contract";
import { getNFTfromMarket, getNFTfromMarketbyId, getNFTsfromMarket, removeNFTfromMarketbyId, storeNFTtoMarket } from "@/lib/db/market";
import { storeNFT, getNFTs, getNFT, updateNFT, findOneAndUpdateNFT } from "@/lib/db/nft";
import { PosseBridgeMarket, PosseFormNFT, PosseTrait, PosseBridgeNFT, PosseFormLazyNFT } from "@/lib/types";
import { cookies } from "next/headers";
import { DirectListing, getAllListings, totalListings } from "thirdweb/extensions/marketplace";

export async function mintNFT(newNFT: PosseFormNFT) {
  try {

    const oldOne = await getNFT(newNFT.collection, newNFT.tokenId);
    if (oldOne) {
      throw new Error("An NFT with the same infos is exist")
    }

    const parentContract = await getContract(newNFT.collection);
    if (!parentContract) {
      throw new Error("The Contract with the address is not exist");
    }

    await storeNFT({
      contract: parentContract._id,
      contractAddr: newNFT.collection,
      tokenId: newNFT.tokenId,
      category: newNFT.category,
      name: newNFT.name,
      description: newNFT.description,
      image: newNFT.image,
      supply: newNFT.supply,
      traits: newNFT.traits,
      listedId: newNFT.listedId,
      owner: newNFT.owner,
    });

    const res = {
      error: false,
      message: "Your new NFT is minted",
      actions: "Success, your own NFT has been created",
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

export async function listNFT(contractAddr: string, tokenId: string) {
  try {

    const resTotalListings = await totalListings({
      contract: MARKETPLACE_CONTRACT
    });

    const lastListings: DirectListing[] = await getAllListings({
      contract: MARKETPLACE_CONTRACT,
      start: resTotalListings > 31n ? Number(resTotalListings - 31n) : 0,
      count: 35n,
    });

    const lastListing = lastListings.filter((ll: DirectListing) => ll.assetContractAddress === contractAddr && ll.tokenId.toString() === tokenId && ll.status === "ACTIVE");

    const lastestNFT = lastListing.pop();
    if (!lastestNFT) {
      console.error('[ERROR ON FINDING THE LAST LISTED YOUR NFT]', contractAddr, "#", tokenId);
      return {
        error: true,
        message: "We cannot findout your Listed NFT",
        actions: "You can get correct information about your activity with clicking the `Refresh` button",
      }
    }

    await findOneAndUpdateNFT({ contractAddr, tokenId }, { $set: { listedId: lastestNFT.id } }, { new: true });

    const oldOne = await getNFTfromMarket(lastestNFT.assetContractAddress, lastestNFT.tokenId.toString());
    if (oldOne) {
      throw new Error("Your NFT is already on the Market");
    }
    const nft = await getNFT(lastestNFT.assetContractAddress, lastestNFT.tokenId.toString());
    const listedNFT: PosseBridgeMarket = {
      mid: lastestNFT.id.toString(),
      creatorAddress: lastestNFT.creatorAddress,
      assetContractAddress: lastestNFT.assetContractAddress,
      tokenId: lastestNFT.tokenId.toString(),
      quantity: lastestNFT.quantity.toString(),
      currencyContractAddress: lastestNFT.currencyContractAddress,
      startTimeInSeconds: lastestNFT.startTimeInSeconds.toString(),
      endTimeInSeconds: lastestNFT.endTimeInSeconds.toString(),
      asset: nft._id,
      status: lastestNFT.status,
      type: lastestNFT.type,
      //direct-listing
      currencyValuePerToken: {
        value: lastestNFT.currencyValuePerToken.value.toString(),
        decimals: lastestNFT.currencyValuePerToken.decimals,
        displayValue: lastestNFT.currencyValuePerToken.displayValue,
        symbol: lastestNFT.currencyValuePerToken.symbol,
        name: lastestNFT.currencyValuePerToken.name,
      },
      pricePerToken: lastestNFT.pricePerToken.toString(),
      isReservedListing: lastestNFT.isReservedListing,
    };
    await storeNFTtoMarket(listedNFT);

    const res = {
      error: false,
      message: "Your new NFT is Listed to POSSE market",
      actions: "Success, your own NFT has been listed",
    };

    return res;
  } catch (err) {
    console.error('[ERROR ON LISTING AN NFT]', contractAddr, "#", tokenId);
    const res = {
      error: true,
      message: "Sorry, an error occured listing your NFT.",
      actions: "Please try again",
    };
    return res;
  }
}

export async function deListNFT(marketId: string, contractAddr: string, tokenId: string) {
  try {

    const oldMarketItem = await getNFTfromMarketbyId(marketId);
    if (oldMarketItem.assetContractAddress !== contractAddr || oldMarketItem.tokenId !== tokenId) {
      throw new Error("conractAddr or tokenId of Your NFT is not invalid");
    }

    await removeNFTfromMarketbyId(marketId);

    const otherItems = await getNFTsfromMarket(contractAddr, tokenId);
    if (otherItems.length > 0) {
      await updateNFT({ contractAddr, tokenId }, { $set: { listedId: otherItems[0].mid } });
    } else {
      await updateNFT({ contractAddr, tokenId }, { $set: { listedId: "0" } });
    }

    const res = {
      error: false,
      message: "Your new NFT is Delisted to POSSE market",
      actions: "Success, your own NFT has been delisted",
    };

    return res;
  } catch (err) {
    console.error('[ERROR ON DELISTING AN NFT]', contractAddr, "#", tokenId, err);
    const res = {
      error: true,
      message: "Sorry, an error occured deListing your NFT.",
      actions: "Please try again",
    };
    return res;
  }
}

export async function verifyNFTtoList(contractAddr: string, tokenId: string) {
  try {

    const nft = await getNFTfromMarket(contractAddr, tokenId);

    if (!nft) {
      return {
        error: false,
        message: "You can List this NFT",
        actions: "Please List this NFT",
      };
    }

    const res = {
      error: true,
      message: "Sorry, Your NFT is already on POSSE Market",
      actions: "",
    };
    return res;

  } catch (err) {
    console.error('[ERROR ON VERIFYING NFT TO LIST]', contractAddr, "#", tokenId);
    const res = {
      error: true,
      message: "Sorry, an error occured verifying your NFT.",
      actions: "Please try again",
    };
    return res;
  }
}

export async function getToken(contractAddr: string, tokenId: string) {
  try {
    const item = await getNFT(contractAddr, tokenId);
    const token: PosseBridgeNFT = {
      contract: {
        category: item.contract.category,
        address: item.contract.address,
        name: item.contract.name,
        description: item.contract.description,
        symbol: item.contract.symbol,
        image: item.contract.image,
        royaltyBps: item.contract.royaltyBps,
        owner: item.contract.owner,
        traitTypes: item.contract.traitTypes,
      },
      contractAddr: item.contract.address,
      tokenId: item.tokenId,
      category: item.category,
      name: item.name,
      description: item.description,
      image: item.image,
      supply: item.supply,
      traits: item.traits,
      owner: item.owner,
    };

    return token;
  } catch (err) {
    console.error("[ERROR ON FETCHING TOKEN FOR TOKENPAGE]", err);
    return null;
    // const res = {
    //   error: true,
    //   message: "Sorry, an error occured fetching NFT for token page.",
    //   actions: "Please try again",
    // };
    // return res;
  }
}

export async function getOwnedNFTs(_search: string, _sort: string, _page: number) {
  try {
    const cookieStore = cookies();
    const accountAddr = cookieStore.get('userAddr')?.value;

    let conds: { [key: string]: any } = {
      owner: accountAddr,
    };
    if (!!_search) {
      conds = {
        ...conds,
        '$or': [
          { name: { $regex: _search, $options: "i" } },
          { description: { $regex: _search, $options: "i" } },
        ]
      };
    }

    const sort = _sort === "NAME" ? { name: 1 }
      : (_sort === "CREATEDASC" ? { createdAt: -1 }
        : { createdAt: -1 });

    const page = _page;

    const data = await getNFTs(conds, sort, page);

    const nfts: PosseBridgeNFT[] = data?.map(item => ({
      contract: {
        category: item.contract.category,
        address: item.contract.address,
        name: item.contract.name,
        description: item.contract.description,
        symbol: item.contract.symbol,
        image: item.contract.image,
        royaltyBps: item.contract.royaltyBps,
        owner: item.contract.owner,
        traitTypes: item.contract.traitTypes,
      },
      contractAddr: item.contract.address,
      tokenId: item.tokenId,
      category: item.category,
      name: item.name,
      description: item.description,
      image: item.image,
      supply: item.supply,
      traits: item.traits?.map((trait: PosseTrait) => ({
        type: trait.type,
        name: trait.name,
      })),
      listedId: item.listedId,
      owner: item.owner,
    }));

    return JSON.stringify(nfts);

  } catch (err) {
    console.error('[ERROR ON FETCHING OWN NFT]', err);
    return JSON.stringify([]);
  }
}