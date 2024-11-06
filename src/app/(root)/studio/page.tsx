'use server'

import { StudioBox } from "@/components/Studio";
import { ownedDrops } from "@/server-actions/drop";
import { lazyMintNFT } from "@/server-actions/lazynft";
import { cookies } from "next/headers";

export default async function StudioPage() {
  const cookieStore = cookies();
  const accountAddr = cookieStore.get('userAddr')?.value;
  const drops = !accountAddr ? [] : await ownedDrops(accountAddr);

  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] px-6 lg:px-10 mx-auto z-10 relative">
        <h4 className="py-2 text-2xl text-white font-bold">
          <span className="bg-heading-bg  bg-clip-text text-transparent">
            Studio
          </span>
        </h4>
      </div>
      <div className="max-w-[1920px] min-h-[20vw] px-6 lg:px-10 mx-auto z-10 relative">
        <StudioBox drops={drops} lazyMintNFT={lazyMintNFT} />
      </div>
    </section>
  );
}
