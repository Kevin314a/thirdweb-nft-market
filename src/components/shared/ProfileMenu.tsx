import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import type { Wallet } from "thirdweb/wallets";
import { FiUser } from "react-icons/fi";
import { blo } from "blo";
import { useDisconnect } from 'thirdweb/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { ConnectButton } from './ConnectButton';

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

  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-golden-1000 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-golden-1100 data-[open]:bg-golden-1100 data-[focus]:outline-1 data-[focus]:outline-white">
        <FiUser size={30} />
        <Image
          src={ensAvatar ?? blo(address as `0x${string}`)}
          width={32}
          height={32}
          className="rounded-full"
          alt="avatar"
        />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-auto origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 z-[1999]"
      >
        <MenuItem>
          <ConnectButton />
        </MenuItem>
        <div className="my-1 h-px bg-white/[20%]" />
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            onClick={() => router.push('/portfolio')}
          >
            <HiOutlineSquare2Stack color="white" className="size-4" />
            Portfolio
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘P</kbd>
          </button>
        </MenuItem>
        <div className="my-1 h-px bg-white/[20%]" />
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            onClick={() => {
              if (wallet) {
                disconnect(wallet);
              }
              router.push('/');
            }}
          >
            <MdLogout color="white" className="size-4" />
            Logout
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘X</kbd>
          </button>
        </MenuItem>
      </MenuItems >
    </Menu >
  )
}