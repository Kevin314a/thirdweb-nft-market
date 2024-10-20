import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import type { ReactNode } from "react";

export default function WithFooterLayout({ children }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
