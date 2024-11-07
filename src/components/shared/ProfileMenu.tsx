'use client'

import { client } from "@/lib/constants";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { useRouter } from 'next/navigation';
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { SiGoogledatastudio } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { soneiumMinato } from "thirdweb/chains";
import { useDisconnect, useWalletBalance } from 'thirdweb/react';
import type { Wallet } from "thirdweb/wallets";
import { ConnectButton } from './ConnectButton';
import { toNumber } from "@/lib/utils";

export const ProfileMenu = ({
  address,
  wallet,
}: {
  address: string;
  wallet: Wallet;
}) => {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useGetENSName({ address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });

  // TODO for serveral networks, if require the other balance of network, then tokenAddress is on to parameter.
  const { data: walletBalance, isLoading, isError } = useWalletBalance({
    chain: soneiumMinato,
    address,
    client,
  });

  return (
    <>
      <div className="group relative cursor-pointer rounded-md bg-golden-1300 px-3 shadow-inner shadow-white/10 border focus:outline-none data-[hover]:bg-golden-1300 border-golden-1300 hover:border-golden-1000 data-[open]:border-golden-1000 data-[focus]:outline-1 data-[focus]:outline-white">
        <a className="menu-hover w-full min-w-max text-base font-medium text-white flex justify-center items-center py-2 gap-2">
          <IoWalletOutline color="white" size="18" />
          {`${toNumber(walletBalance?.displayValue).toFixed(2)} ${walletBalance?.symbol}`}
        </a>
        <div
          className="invisible absolute right-0 flex w-auto flex-col bg-black-1300 text-white shadow-lg group-hover:visible rounded-xl bg-black transition duration-200 ease-out focus:outline-none z-[1999]">

          <div className="block p-2 font-semibold hover:bg-golden-1300 rounded-lg hover:text-gray-200">
            <ConnectButton />
          </div>

          <div className="block p-4 font-semibold hover:bg-golden-1300 rounded-lg hover:text-gray-200" onClick={() => router.push('/portfolio')}>
            <div className="flex items-center gap-4">
              <HiOutlineSquare2Stack color="white" className="size-4" />
              Portfolio
              {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘P</kbd> */}
            </div>
          </div>

          <div className="block p-4 font-semibold hover:bg-golden-1300 rounded-lg hover:text-gray-200" onClick={() => router.push('/studio')}>
            <div className="flex items-center gap-4">
              <SiGoogledatastudio color="white" className="size-4" />
              Studio
              {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘T</kbd> */}
            </div>
          </div>

          <div className="block p-4 font-semibold hover:bg-golden-1300 rounded-lg hover:text-gray-200" onClick={() => {
            if (wallet) {
              disconnect(wallet);
            }
            // router.push('/');
          }}>
            <div className="flex items-center gap-4">
              <MdLogout color="white" className="size-4" />
              Logout
              {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘X</kbd> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}