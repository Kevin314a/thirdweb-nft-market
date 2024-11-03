export const dynamic = "force-dynamic";
export const revalidate = 0;
import { PosseBridgeDropMintStage } from '@/lib/types';
import { updateDropStage } from '@/server-actions/drop';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {

    const {
      dropAddr,
      strNewStages,
    }: {
      dropAddr: string;
      strNewStages: string;
    } = await request.json();

    if (!dropAddr) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const newStages: PosseBridgeDropMintStage[] = JSON.parse(strNewStages);

    const result = await updateDropStage(dropAddr, newStages);
    return NextResponse.json(result);
  }
  catch (err) {
    console.error("[API_UPDATE_DROP_STAGE_ERROR]", err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}