export const dynamic = "force-dynamic";
export const revalidate = 0;
import { removeAllInvalidNFTs, updateAllValidNFTs } from "@/server-actions/market";
import { MARKETPLACE_CONTRACT } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { getAllValidListings, totalListings } from "thirdweb/extensions/marketplace";
import { removeDuplicatedNFTs } from "@/lib/db/nft";

// Define the server action to return the SSE stream
export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const accountAddr = cookieStore.get('userAddr')?.value;

    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const strStart = searchParams.get("start") || "-1";

    const iStart: number = isNaN(parseInt(strStart)) ? -1 : parseInt(strStart);

    if (!address || accountAddr !== address || address !== process.env.NEXT_PUBLIC_ADMIN_ID) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    if (iStart < 0) {
      return NextResponse.json({ message: "Bad Start Request" }, { status: 400 });
    }
    const validIds: string[] = [];

    const result = await getAllValidListings({
      contract: MARKETPLACE_CONTRACT,
      start: Number(iStart),
      count: 10n,
    });

    result.forEach((item) => validIds.push(item.id.toString()));

    await updateAllValidNFTs(address, result);
    await removeDuplicatedNFTs();

    return NextResponse.json({ validIds });

  } catch (err) {
    console.error("[MINATO_THIRDWEB_API_MARKET_ERROR]", err);
    return NextResponse.json({ validIds: [], message: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const {
      address, validIds,
    }: {
      address: string,
      validIds: string[],
    } = await request.json();

    if (!address) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await removeAllInvalidNFTs(validIds);

    return NextResponse.json({ result: true });
  } catch (err) {
    console.error("[MINATO_CHAIN_NET_API_MARKET_ERROR]", err);
    return NextResponse.json({ result: false, message: "Internal Error" }, { status: 500 });
  }
}