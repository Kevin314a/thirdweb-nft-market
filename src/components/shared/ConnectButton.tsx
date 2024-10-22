'use client'

import { useEffect, useState } from 'react';
import { client } from "@/lib/constants";
import { ConnectButton as PrimaryConnectButton, darkTheme } from "thirdweb/react";

import { IconWallet } from "@/assets";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState('sm');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setScreenSize('md');
      } else {
        setScreenSize('sm');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export const ConnectButton = () => {
  const screenSize = useScreenSize();

  return (
    <PrimaryConnectButton
      theme={darkTheme({
        colors: {
          primaryButtonBg: "#C3976A",
          primaryButtonText: "#FFF",
        },
      })}
      connectButton={{
        label: (
          <>
            <img src={IconWallet.src} alt="" />
            <span className="ml-2 hidden md:block">Connect Wallet</span>
          </>
        ),
        style: {
          minWidth: screenSize === "md" ? "180px" : "0px",
          borderRadius: screenSize === "md" ? "0.5rem" : "50%",
          padding: screenSize === "md" ? "0.5rem" : "0.5rem",
          width: '2rem',
          height: screenSize === "md" ? '2.5rem' : '2rem',
          color: '#FFF',
          border: '1px solid #C3976A',
        },
        className: "text-sm whitespace-nowrap transition-all ease-out duration-500 font-semibold inline-flex justify-center items-center disabled:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed bg-golden-1000 hover:bg-golden-1100 ",
      }}
      client={client}
    />
  );
};