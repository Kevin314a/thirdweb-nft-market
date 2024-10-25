'use server'

import { client, ITEMS_PER_PAGE } from "@/lib/constants";
import { getContract as getContractDB, storeContract } from "@/lib/db/contract";
import { findOneAndUpdateNFT, getNFT, updateNFT } from "@/lib/db/nft";
import { getNFTfromMarketbyId, getValidNFTs, removeInvalidNFTs, removeNFTsfromMarket, storeNFTtoMarket } from "@/lib/db/market";
import { PosseViewMarket } from "@/lib/types";
import { getContract } from "thirdweb";
import { soneiumMinato } from "thirdweb/chains";
import { getContractMetadata, owner } from "thirdweb/extensions/common";
import { DirectListing } from "thirdweb/extensions/marketplace";
import { resolveScheme } from "thirdweb/storage";

export async function getAllValidNFTs(_search: string, _sort: string, _currency: string, _page: number) {
  try {
    let conds: { [key: string]: any } = {};

    if (!!_search) {
      conds = {
        ...conds,
        '$or': [
          { 'asset.name': { $regex: _search, $options: "i" } },
          { 'asset.description': { $regex: _search, $options: "i" } },
        ]
      };
    }

    if (!!_currency && _currency.length > 0 && _currency.toLowerCase() !== "all") {
      conds = {
        ...conds,
        "currencyValuePerToken.symbol": _currency.toUpperCase(),
      }
    }

    const sort = _sort === "NAME" ? { 'asset.name': 1 }
      : (_sort === "CREATEDAT" ? { mid: 1 }
        : (_sort === "LISTEDAT" ? { createdAt: 1 }
          : (_sort === "PRICEASC" ? { priceToSort: 1 }
            : (_sort === "PRICEDESC" ? { priceToSort: -1 }
              : { mid: 1 }))));

    const page = _page;

    const data = await getValidNFTs(conds, sort, page);

    const nfts: PosseViewMarket[] = data?.map((item: any) => ({
      mid: item.mid,
      creatorAddress: item.creatorAddress,
      assetContractAddress: item.assetContractAddress,
      tokenId: item.tokenId,
      quantity: item.quantity,
      currencyContractAddress: item.currencyContractAddress,
      startTimeInSeconds: item.startTimeInSeconds,
      endTimeInSeconds: item.endTimeInSeconds,
      asset: {
        contract: item.asset.contract,
        contractAddr: item.asset.contractAddr,
        tokenId: item.asset.tokenId,
        type: item.asset.type,
        name: item.asset.name,
        description: item.asset.description,
        image: item.asset.image,
        supply: item.asset.supply,
        traits: item.asset.traits,
        listedId: item.asset.listedId,
        owner: item.asset.owner,
      },
      status: item.status,
      type: item.type,
      currencyValuePerToken: {
        value: item.currencyValuePerToken.value,
        decimals: item.currencyValuePerToken.decimals,
        displayValue: item.currencyValuePerToken.displayValue,
        symbol: item.currencyValuePerToken.symbol,
        name: item.currencyValuePerToken.name,
      },
      pricePerToken: item.pricePerToken,
      isReservedListing: item.isReservedListing,
    }));

    const hasMore = nfts.length === ITEMS_PER_PAGE;

    return {
      nfts: JSON.stringify(nfts),
      hasMore,
      page: page + 1,
    }

  } catch (err) {
    console.error('[ERROR ON FETCHING OWN NFT]', err);
    return {
      nfts: JSON.stringify([]),
      hasMore: false,
      page: 0,
    }
  }
}

export async function removeAllInvalidNFTs(validIds: string[]) {
  try {
    return await removeInvalidNFTs(validIds);
  } catch (err) {
    console.error("[REMOVE INVALID NFTS ON MARKET]", err);
    return false;
  }
}

export async function buyNFT(accountAddr: string, marketId: string, contractAddr: string, tokenId: string) {
  try {
    // TODO must compoare with cookie with accountAddr to verify 
    const oldOneMarket = await getNFTfromMarketbyId(marketId);

    const oldOne = await getNFT(contractAddr, tokenId);

    await updateNFT({
      contractAddr,
      tokenId,
    }, {
      $set: {
        owner: accountAddr,
        listedId: 0n,
      },
      $addToSet: {
        history: {
          seller: oldOne.owner,
          buyer: accountAddr,
          action: "DIRECT-LIST",
          orginPrice: oldOneMarket.currencyValuePerToken.value,
          nativePrice: oldOneMarket.currencyValuePerToken.displayValue,
          qty: 1,
          purchasedAt: new Date().toISOString(),
        }
      },
    });

    await removeNFTsfromMarket(contractAddr, tokenId);

    const res = {
      error: false,
      message: "Your new NFT is Delisted to POSSE market",
      actions: "Success, your own NFT has been delisted",
    };

    return res;
  } catch (err) {
    console.error('[ERROR ON DELISTING AN NFT]', contractAddr, "#", tokenId);
    const res = {
      error: true,
      message: "Sorry, an error occured deListing your NFT.",
      actions: "Please try again",
    };
    return res;
  }
}

export async function updateAllValidNFTs(accountAddress: string | undefined, listedItems: DirectListing[]) {
  try {

    for (const listedItem of listedItems) {
      if (listedItem.currencyValuePerToken.symbol !== "ETH" && listedItem.currencyValuePerToken.symbol !== "ASTR") {
        continue;
      }
      if (listedItem.status !== "ACTIVE") {
        continue;
      }

      // part of contract of this asset(NFT)
      const oldContract = await getContractDB(listedItem.assetContractAddress);
      let newContractId = null;
      try {
        if (oldContract) {
          newContractId = oldContract._id;
        }
        else {
          const contract3rd = getContract({
            client,
            chain: soneiumMinato,
            address: listedItem.assetContractAddress,
          });
          const contractOwner = await owner({ contract: contract3rd });
          const contractMetadata = await getContractMetadata({ contract: contract3rd });
          newContractId = await storeContract({
            type: "ERC-721",
            address: listedItem.assetContractAddress,
            name: contractMetadata?.name || "",
            symbol: contractMetadata?.symbol,
            owner: contractOwner,
          });
        }
      } catch (err) {
        console.error("[ERROR: GOT LISTEDITEM IS:]", listedItem);
        console.error("[ERROR ON GETTING DETAILS OF NFTS LISTED ON MARKET VIA THIRDWEB]", err);
        continue;
      }

      if (!newContractId) {
        continue;
      }

      // part of asset(NFT)
      let finalImageUrl: string = "";
      const imageUrl = listedItem.asset.metadata.image;
      try {
        if (!!imageUrl) {
          finalImageUrl = resolveScheme({
            client,
            uri: imageUrl,
          });
        }
      } catch (err) {
        finalImageUrl = imageUrl || "";
      }


      const newAsset = await findOneAndUpdateNFT(
        { contractAddr: listedItem.assetContractAddress, tokenId: listedItem.tokenId },
        {
          $set: {
            contract: newContractId,
            contractAddr: listedItem.assetContractAddress,
            tokenId: listedItem.tokenId,
            type: listedItem.asset.type === "ERC721" ? "ERC-721" : "ERC-1155",
            name: listedItem.asset.metadata.name || "",
            description: listedItem.asset.metadata.description,
            image: finalImageUrl,
            listedId: listedItem.id,
            owner: listedItem.creatorAddress,
          },
        },
        { new: true, upsert: true }
      );

      // part of market
      await storeNFTtoMarket({
        mid: listedItem.id.toString(),
        creatorAddress: listedItem.creatorAddress,
        assetContractAddress: listedItem.assetContractAddress,
        tokenId: listedItem.tokenId.toString(),
        quantity: listedItem.quantity.toString(),
        currencyContractAddress: listedItem.currencyContractAddress,
        startTimeInSeconds: listedItem.startTimeInSeconds.toString(),
        endTimeInSeconds: listedItem.endTimeInSeconds.toString(),
        asset: newAsset._id,
        status: listedItem.status,
        type: listedItem.type,
        //direct-listing
        currencyValuePerToken: {
          value: listedItem.currencyValuePerToken.value.toString(),
          decimals: listedItem.currencyValuePerToken.decimals,
          displayValue: listedItem.currencyValuePerToken.displayValue,
          symbol: listedItem.currencyValuePerToken.symbol,
          name: listedItem.currencyValuePerToken.name,
        },
        pricePerToken: listedItem.pricePerToken.toString(),
        isReservedListing: listedItem.isReservedListing,
      });
    }

  } catch (err) {
    console.error("[UPDATE VALID ALL NFTS ON MARKET]", err);
    return false;
  }
}