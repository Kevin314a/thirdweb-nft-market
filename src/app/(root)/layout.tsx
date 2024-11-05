import type { ReactNode } from "react";
import { Navbar, Footer } from "@/components/shared";

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
