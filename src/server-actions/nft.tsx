'use server'

import { MARKETPLACE_CONTRACT } from "@/lib/constants";
import { getNFTfromMarket, getNFTfromMarketbyId, getNFTsfromMarket, removeNFTfromMarketbyId, storeNFTtoMarket } from "@/lib/db/market";
import { storeNFT, getNFTs, getNFT, updateNFT, markNFTisonMarket, bulkUpdateNFTs } from "@/lib/db/nft";
import { PosseFormMarket, PosseFormNFT, PosseTrait, PosseViewNFT } from "@/lib/types";
import { cookies } from "next/headers";
import { DirectListing, getAllListings, totalListings } from "thirdweb/extensions/marketplace";

export async function mintNFT(newNFT: PosseFormNFT) {
  try {
    await storeNFT(newNFT);

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

    const lastListing = lastListings.filter((ll: DirectListing) => String(ll.assetContractAddress) === String(contractAddr) && String(ll.tokenId) === String(tokenId));
    if (!lastListing.length) {
      console.error('[ERROR ON FINDING THE LAST LISTED YOUR NFT]', contractAddr, "#", tokenId);
      return {
        error: true,
        message: "We cannot findout your Listed NFT",
        actions: "You can get correct information about your activity with clicking the `Refresh` button",
      }
    }

    await markNFTisonMarket(contractAddr, BigInt(tokenId), true);

    const listedNFT: PosseFormMarket = {
      id: lastListing[0].id,
      creatorAddress: lastListing[0].creatorAddress,
      assetContractAddress: lastListing[0].assetContractAddress,
      tokenId: lastListing[0].tokenId,
      quantity: lastListing[0].quantity,
      currencyContractAddress: lastListing[0].currencyContractAddress,
      startTimeInSeconds: lastListing[0].startTimeInSeconds,
      endTimeInSeconds: lastListing[0].endTimeInSeconds,
      asset: "",
      status: lastListing[0].status,
      type: lastListing[0].type,
      //direct-listing
      currencyValuePerToken: lastListing[0].currencyValuePerToken,
      pricePerToken: lastListing[0].pricePerToken,
      isReservedListing: lastListing[0].isReservedListing,
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
    if (oldMarketItem.assetContractAddress !== contractAddr || oldMarketItem.tokenId !== BigInt(tokenId)) {
      throw new Error("conractAddr or tokenId of Your NFT is not invalid");
    }

    await removeNFTfromMarketbyId(marketId);

    const otherItems = await getNFTsfromMarket(contractAddr, tokenId);
    if (otherItems) {

    } else {
      await markNFTisonMarket(contractAddr, BigInt(tokenId), false);
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
    const item = await getNFT(contractAddr, BigInt(tokenId));
    const token: PosseViewNFT = {
      contract: {
        type: item.contract.type,
        address: item.contract.address,
        name: item.contract.name,
        description: item.contract.description,
        symbol: item.contract.symbol,
        image: item.contract.image,
        royaltyBps: String(item.contract.royaltyBps),
        owner: item.contract.owner,
        traitTypes: item.contract.traitTypes,
      },
      contractAddr: item.contract.address,
      tokenId: String(item.tokenId),
      type: item.type,
      name: item.name,
      description: item.description,
      image: item.image,
      supply: String(item.supply),
      // externalLink: item.externalLink,
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

export async function getOwnedNFTs(_search: string, _sort: string, _page: number) { //: Promise<PosseViewNFT[]> {
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
      : (_sort === "CREATEDASC" ? { createdAt: 1 }
        : { createdAt: 1 });

    const page = _page;

    const data = await getNFTs(conds, sort, page);

    const nfts: PosseViewNFT[] = data?.map(item => ({
      contract: {
        type: item.contract.type,
        address: item.contract.address,
        name: item.contract.name,
        description: item.contract.description,
        symbol: item.contract.symbol,
        image: item.contract.image,
        royaltyBps: String(item.contract.royaltyBps),
        owner: item.contract.owner,
        traitTypes: item.contract.traitTypes,
      },
      contractAddr: item.contract.address,
      tokenId: String(item.tokenId),
      type: item.type,
      name: item.name,
      description: item.description,
      image: item.image,
      supply: String(item.supply),
      // externalLink: item.externalLink,
      traits: item.traits?.map((trait: PosseTrait) => ({
        type: trait.type,
        name: trait.name,
      })),
      isListed: item.isListed,
      owner: item.owner,
    }));

    return JSON.stringify(nfts);

  } catch (err) {
    console.error('[ERROR ON FETCHING OWN NFT]', err);
    return JSON.stringify([]);
  }
}