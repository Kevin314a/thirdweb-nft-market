'use server'

import { getValidNFTs } from "@/lib/db/market";
import { PosseViewMarket } from "@/lib/types";

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
      : (_sort === "CREATEDAT" ? { id: 1 }
        : (_sort === "LISTEDAT" ? { createdAt: 1 }
          : (_sort === "PRICEASC" ? { priceToSort: 1 }
            : (_sort === "PRICEDESC" ? { priceToSort: -1 }
              : { id: 1 }))));

    const page = _page;

    const data = await getValidNFTs(conds, sort, page);

    const nfts: PosseViewMarket[] = data?.map((item: any) => ({
      id: item.id,
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
        isListed: item.asset.isListed,
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

    return JSON.stringify(nfts);

  } catch (err) {
    console.error('[ERROR ON FETCHING OWN NFT]', err);
    return JSON.stringify([]);
  }
}

export async function buyNFT(marketId: string) {

}