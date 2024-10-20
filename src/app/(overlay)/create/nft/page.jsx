'use server'

import { NFTForm } from "@/components/NFT";
import { getOwnContracts } from "@/server-actions/db/contract";
import { createNFT } from "@/server-actions/nft";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default async function CreateNFTPage() {
  const cookieStore = cookies();
  const accountAddr = cookieStore.get('userAddr')?.value;
  if (!accountAddr) {
    toast.error("Please connect your wallet!");
    redirect('/create');
  }

  console.log('[accountAddr on COOKIE IS]', accountAddr);
  const collections = await getOwnContracts(accountAddr);

  return (
    <div className="max-w-[1920px] flex-col md:flex-row mx-auto xl:px-10 px-5">
      <div className="mb-4 flex flex-col">
        <span className="text-4xl text-white">Create an NFT</span>
        <span className="text-sm text-golden-1000">Remember, once you mint your NFT you won’t be able to <br />change any of it’s information.</span>
      </div>
      <NFTForm createNFT={createNFT} collections={collections} />
    </div>
  );
}