'use client'

import { Polygon1, Polygon22, TempImageCreateBack } from "@/assets";
import { ConnectButton, ProfileMenu } from "@/components/shared";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

export default function CreateLayout({ children }: { children: ReactNode }) {

  const router = useRouter();
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  useEffect(() => {
    fetch('/api/save-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet: account?.address || "" }),
    })
      .then((res) => res.json())
      .then((data) => {
      });
  }, [account]);

  return (
    <section className="pt-20 lg:pt-0 relative w-full h-full" style={{ zIndex: 1990, overflowX: 'hidden' }}>
      <div className="fixed py-2.5 w-[100vw] z-50 top-0 start-0 bg-transparent">
        <div className="max-w-[1920px] flex items-center justify-between mx-auto lg:px-10 px-6 h-[64px]">
          <button
            className="rounded-full bg-[#1e1e1e] hover:bg-[#3f3f3f] p-3 cursor-pointer"
            onClick={() => router.back()}
          >
            <FaArrowLeft color="white" />
          </button>
          <div className="flex w-full justify-end md:order-2 items-center space-x-3 md:space-x-0 rtl:space-x-reverse relative z-20">
            <div className="flex w-full items-center justify-end">
              {account && wallet ? (
                <ProfileMenu address={account.address} wallet={wallet} />
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{ backgroundImage: `url(${TempImageCreateBack.src})` }}
      >
        {/* <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span> */}
      </div>
      <div className="relative w-full h-full min-h-[calc(100vh)] flex items-center justify-center p-2 lg:p-20">
        {children}
      </div>
      <div className="absolute bottom-12 left-0 z-10">
        <Image
          width={145}
          height={312}
          className="w-[145px] h-auto"
          src={Polygon22}
          alt=""
          priority
        />
      </div>
      <div className="absolute top-24 right-0 z-10">
        <Image
          width={220}
          height={328}
          priority
          src={Polygon1}
          alt=""
        />
      </div>
    </section>
  );
}