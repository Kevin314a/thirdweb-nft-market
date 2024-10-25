export const dynamic = "force-dynamic";
export const revalidate = 0;
import { getOwnedNFTs } from "@/server-actions/nft";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const _search = searchParams.get("search") || "";
    const _sort = searchParams.get("sort") || "";
    const _page = parseInt(searchParams.get("page") || "0");

    if (!address) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const json_nfts = await getOwnedNFTs(_search, _sort, _page);
    return NextResponse.json({ nfts: json_nfts });

  } catch (err) {
    console.error("[MINATO_CHAIN_NET_API_NFT_ERROR]", err);
    return NextResponse.json({ nfts: JSON.stringify([]), message: "Internal Error" }, { status: 500 });
  }
}