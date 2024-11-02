'use server'

import { ImageHat, ImageProfileBack } from "@/assets";
import { DropDetailBox } from "@/components/Drop";
import { PosseBridgeDrop, PosseBridgeLazyNFT } from "@/lib/types";
import { fetchDrop, claimNFT } from "@/server-actions/drop";
import { notFound } from "next/navigation";

export default async function ContractPage({
  params,
}: {
  params: { addr: string };
}) {

  if (!params.addr) return notFound();

  const result: { drop: PosseBridgeDrop, lazyNFTs: PosseBridgeLazyNFT[] } | null = await fetchDrop(params.addr);
  const { drop, lazyNFTs } = result || {};

  if (!drop) return notFound();

  return (
    <>
      <section className="relative block h-[350px] lg:h-[500px]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: `url(${ImageProfileBack.src})` }}
        >
          <div className="w-full h-full flex justify-center items-center">
            <div className="flex lg:w-1/2 w-full md:justify-between items-center justify-center md:flex-row flex-col mx-16">
              <span className="md:text-6xl text-3xl text-white">Posse</span>
              <img src={ImageHat.src} className="md:w-[12rem] w-[8rem]" />
              <span className="md:text-6xl text-3xl text-white">Soneium</span>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-16">
        <div className="max-w-[1920px] px-2 lg:px-6 mx-auto">
          <DropDetailBox drop={drop} lazyNFTs={!lazyNFTs ? [] : lazyNFTs} claimNFT={claimNFT} />
        </div>
      </section>
    </>
  );
}
