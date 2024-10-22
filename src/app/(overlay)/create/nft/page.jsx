'use server'

import { NFTForm } from "@/components/NFT";
import { mintNFT } from "@/server-actions/nft";
import { getOwnContracts } from "@/server-actions/contract";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreateNFTPage() {
  const cookieStore = cookies();
  const accountAddr = cookieStore.get('userAddr')?.value;
  if (!accountAddr) {
    redirect('/create');
  }

  console.log('[accountAddr on COOKIE IS]', accountAddr);
  const json_collections = await getOwnContracts(accountAddr);

  return (
    <div className="max-w-[1920px] flex-col md:flex-row mx-auto xl:px-10 px-5">
      <div className="mb-4 flex flex-col">
        <span className="text-4xl text-white">Create an NFT</span>
        <span className="text-sm text-golden-1000">Remember, once you mint your NFT you won’t be able to <br />change any of it’s information.</span>
      </div>
      <NFTForm mintNFT={mintNFT} collections={JSON.parse(json_collections)} />
    </div>
  );
}