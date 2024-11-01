'use server'

import { PosseBridgeDrop } from "@/lib/types";
import { StudioBox } from "@/components/Studio";
import { ownedDrops } from "@/server-actions/drop";
import { lazyMintNFT } from "@/server-actions/lazynft";
import { cookies } from "next/headers";

export default async function StudioPage() {
  const cookieStore = cookies();
  const accountAddr = cookieStore.get('userAddr')?.value;
  // const drops = await ownedDrops(accountAddr);

  const drops: PosseBridgeDrop[] = [
    {
      group: "LIMITED",
      address: '0xBF789AD6889e896F6693B7d6b0bD00DcdfF64a4a',
      name: 'PosseLimitedDrop',
      description: '',
      image: '',
      payToken: ['ETH'],
      numberOfItems: '150',
      mintStartAt: 1730287131604,
      owner: '0xBF789AD6889e896F6693B7d6b0bD00DcdfF64a4a',
      visible: true,
      mintStages: [
        {
          name: 'For my client',
          price: '0.01',
          currency: 'ETH',
          duration: 14400000,
          perlimit: '10',
          allows: ['0x1234'],
        },
        {
          name: 'For my dear',
          price: '0.04',
          currency: 'ETH',
          duration: 7400000,
          perlimit: '5',
          allows: ['0x1234'],
        },
        {
          name: 'For my all around',
          price: '0.2',
          currency: 'ETH',
          duration: 5400000,
          perlimit: '50',
          allows: [],
        },
      ]
    },
    {
      group: "UNLIMITED",
      address: '0xBF789AD6889e896F6693B7d6b0bD00DcdfF64a4a',
      name: 'PosseUnLimitedDrop',
      description: '',
      image: '',
      payToken: ['ETH'],
      // numberOfItems: '1500',
      mintStartAt: 1730287131604,
      owner: '0xBF789AD6889e896F6693B7d6b0bD00DcdfF64a4a',
      visible: true,
      mintStages: [
        {
          name: 'For my client',
          price: '0.015',
          currency: 'ETH',
          duration: 3400000,
          perlimit: '10',
          allows: ['0x1234'],
        },
        {
          name: 'For my dear',
          price: '0.08',
          currency: 'ETH',
          duration: 9400000,
          perlimit: '5',
          allows: ['0x1234'],
        },
        {
          name: 'For my all around',
          price: '0.3',
          currency: 'ETH',
          duration: 14400000,
          perlimit: '50',
          allows: [],
        },
      ]
    },
    {
      group: "LIMITED",
      address: '0xBF789AD6889e896F6693B7d6b0bD00DcdfF64a4a',
      name: 'PosseLimitedDrop888',
      description: '',
      image: '',
      payToken: ['ETH'],
      numberOfItems: '615',
      mintStartAt: 1730287131604,
      owner: '0xBF789AD6889e896F6693B7d6b0bD00DcdfF64a4a',
      visible: true,
      mintStages: [
        {
          name: 'For my client',
          price: '0.01',
          currency: 'ETH',
          duration: 600000,
          perlimit: '100',
          allows: ['0x1234'],
        },
        {
          name: 'box',
          price: '1.01',
          currency: 'ETH',
          duration: 800000,
          perlimit: '10',
          allows: [],
        }
      ]
    },
  ];

  return (
    <section className="lg:pt-24 pt-20 relative z-10">
      <div className="max-w-[1920px] px-2 lg:px-6 mx-auto z-10 relative">
        <h4 className="py-2 text-2xl text-white font-bold">
          <span className="bg-heading-bg  bg-clip-text text-transparent">
            My Drops
          </span>
        </h4>
      </div>
      <div className="max-w-[1920px] min-h-[20vw] px-2 lg:px-6 mx-auto z-10 relative">
        <StudioBox drops={drops} lazyMintNFT={lazyMintNFT} />
      </div>
    </section>
  );
}
