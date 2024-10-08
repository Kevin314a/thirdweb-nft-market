import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ['latin'], variable: '--inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--poppins' });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <main className="font-poppins overflow-hidden bg-black w-full">
        <Navbar/>
        {children}
        <Footer/>
        </main>
        </body>
    </html>
  );
}
