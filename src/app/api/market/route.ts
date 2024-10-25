export const dynamic = "force-dynamic";
export const revalidate = 0;
import { buyNFT, getAllValidNFTs } from "@/server-actions/market";
import { deListNFT } from "@/server-actions/nft";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const _search = searchParams.get("search") || "";
    const _sort = searchParams.get("sort") || "Name";
    const _currency = searchParams.get("currency") || "ALL";
    const _page = parseInt(searchParams.get("page") || "0");

    if (!address) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await getAllValidNFTs(_search, _sort, _currency, _page);
    return NextResponse.json(result);

  } catch (err) {
    console.error("[MINATO_CHAIN_NET_API_MARKET_ERROR]", err);
    return NextResponse.json({ nfts: JSON.stringify([]), message: "Internal Error" }, { status: 500 });
  }
}

// for buy an NFT
export async function PUT(request: Request) {
  try {
    const {
      address, marketId, contractAddr, tokenId,
    }: {
      address: string,
      marketId: string,
      contractAddr: string,
      tokenId: string,
    } = await request.json();

    if (!address) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await buyNFT(address, marketId, contractAddr, tokenId);

    return NextResponse.json({ result });
  } catch (err) {
    console.error("[MINATO_CHAIN_NET_API_MARKET_ERROR]", err);
    return NextResponse.json({ nfts: JSON.stringify({}), message: "Internal Error" }, { status: 500 });
  }
}

// for delist
export async function DELETE(request: Request) {
  try {
    const {
      address, marketId, contractAddr, tokenId
    }: {
      address: string,
      marketId: string,
      contractAddr: string,
      tokenId: string,
    } = await request.json();

    if (!address) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }
    
    const result = await deListNFT(marketId, contractAddr, tokenId);

    return NextResponse.json({ result });
  } catch (err) {
    console.error("[MINATO_CHAIN_NET_API_MARKET_ERROR]", err);
    return NextResponse.json({ nfts: JSON.stringify({}), message: "Internal Error" }, { status: 500 });
  }
}
