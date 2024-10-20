import { NextResponse } from 'next/server';
import { setUserCookie } from '@/server-actions/user';

export async function POST(request: Request) {
  const { wallet } = await request.json();

  // if (!wallet) {
  //   return NextResponse.json({ success: false, message: 'Wallet address is missing' }, { status: 400 });
  // }

  // Call the server action to store the wallet address in cookies
  const result = await setUserCookie(wallet);

  return NextResponse.json(result);
}