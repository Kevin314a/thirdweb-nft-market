'use client'

import React, { useEffect, useRef } from 'react';

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import type { ReactNode } from "react";
import Scrollbar from 'smooth-scrollbar';

export default function WithFooterLayout({ children }: Readonly<{
  children: ReactNode;
}>) {

  const scrollbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && scrollbarRef.current) {
      const scrollbar = Scrollbar.init(scrollbarRef.current);
      return () => {
        scrollbar.destroy();
      };
    }
  }, []);

  return (
    <>
      <Navbar />
      <div ref={scrollbarRef} style={{ height: '100vh', overflow: 'hidden' }}>
        {children}
        <Footer />
      </div>
    </>
  );
}
