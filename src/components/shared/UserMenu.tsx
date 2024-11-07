'use client'

import { Button } from "@/components/base";
import { IconWallet } from "@/assets";
import { MdShoppingCart } from "react-icons/md";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { ConnectButton, ProfileMenu } from ".";

export const UserMenu = () => {
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  return (
    <div className="flex xxl:gap-8 gap-2 md:gap-4">
      {account && wallet ? (
        <ProfileMenu address={account.address} wallet={wallet} />
      ) : (
        <ConnectButton />
      )}
      <Button
        className="hidden md:flex py-2 bg-golden-1300 text-white border-golden-1300 hover:border-golden-1000 hover:bg-golden-1300"
      >
        <MdShoppingCart color="white" size="18" />
      </Button>
    </div>
  )
};