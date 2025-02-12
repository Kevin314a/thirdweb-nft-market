'use server'

import { ImageHat, ImageProfileBack } from "@/assets";
import { DropDetailBox } from "@/components/Drop";
import { PosseBridgeDrop, PosseBridgeLazyNFT } from "@/lib/types";
import { fetchDrop } from "@/server-actions/drop";
import { notFound } from "next/navigation";

export default async function DropDetailPage({
  params,
}: {
  params: { addr: string, stageId: string };
}) {

  if (!params.addr) return notFound();

  const result: { drop: PosseBridgeDrop, lazyNFTs: PosseBridgeLazyNFT[] } | null = await fetchDrop(params.addr);
  const { drop, lazyNFTs } = result || {};

  if (!drop || !drop.mintStages.filter(stage => stage.startAt.toString() === params.stageId).length) return notFound();

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
        <div className="max-w-[1920px] px-6 lg:px-10 mx-auto">
          <DropDetailBox drop={drop} lazyNFTs={!lazyNFTs ? [] : lazyNFTs} stageId={params.stageId} />
        </div>
      </section>
    </>
  );
}
