'use client'

import { Button } from "@/components/base";
import { IconWallet } from "@/assets";
import { MdShoppingCart } from "react-icons/md";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ConnectButton, ProfileMenu } from ".";
import { IoWallet } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";

export const UserMenu = () => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  return (
    <div className="flex xxl:gap-8 gap-2 md:gap-4">
      <Button
        className="hidden md:flex py-2 bg-golden-1000/[30%] text-white border-golden-1000/[30%] hover:border-golden-1000 hover:bg-golden-1000[30%]"
      >
        <IoWalletOutline color="white" size="18" />
        0.50 ETH
      </Button>
      {account && wallet ? (
        <ProfileMenu address={account.address} wallet={wallet} />
      ) : (
        <ConnectButton />
      )}
      <Button
        className="hidden md:flex py-2 bg-golden-1000/[30%] text-white border-golden-1000/[30%] hover:border-golden-1000 hover:bg-golden-1000[30%]"
      >
        <MdShoppingCart color="white" size="18" />
      </Button>
    </div>
  )
};