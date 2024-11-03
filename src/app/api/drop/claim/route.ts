export const dynamic = "force-dynamic";
export const revalidate = 0;
import { claimNFT } from '@/server-actions/drop';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {

    const {
      dropAddr,
      accountAddr,
    }: {
      dropAddr: string;
      accountAddr: string;
    } = await request.json();

    if (!dropAddr || !accountAddr) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const result = await claimNFT(dropAddr, accountAddr);
    return NextResponse.json(result);
  }
  catch (err) {
    console.error("[API_UPDATE_DROP_STAGE_ERROR]", err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}