import { Inter, Poppins } from "next/font/google";
import { Providers } from "@/components/shared/Provider";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { MainBack } from '@/assets';

const inter = Inter({ subsets: ['latin'], variable: '--inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--poppins' });

export const metadata: Metadata = {
  title: "POSSE's GameFi Marketplace",
  description: `Posse Finance is the "Wild West" of the Soneium world, where the allure of the frontier merges seamlessly with cutting-edge technology.`,
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <Providers>
          <main className="font-poppins overflow-hidden bg-black w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${MainBack.src})` }}>
            {children}
          </main>
        </Providers>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
