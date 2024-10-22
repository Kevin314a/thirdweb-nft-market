export const dynamic = "force-dynamic";
export const revalidate = 0;
import { hasOwnAstrNFT } from '@/lib/db/market';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get("wallet");
    if (!wallet) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await hasOwnAstrNFT(wallet);

    return NextResponse.json({ result });

  } catch (err) {
    console.error("[ENDPOINT_INTERNAL_ERROR]", err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { wallet } = await request.json();

    if (!wallet) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }
    
    const result = await hasOwnAstrNFT(wallet);

    return NextResponse.json({ result });

  } catch (err) {
    console.error("[ENDPOINT_INTERNAL_ERROR]", err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}