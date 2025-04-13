import type { Metadata } from "next";
import { Providers } from "../providers";
import "../../styels/globals.css";

import { Poppins } from "next/font/google";
import MarketplaceNavbar from "@/components/navbars/marketplaceNavbar";
import Sidebar from "@/components/marketplace/Sidebar";
import LiveChat from "@/components/marketplace/LiveChat";
import MarketplaceBanner from "@/components/marketplace/MarketplaceBanner";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Live marketplace with products and live chat",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="antialiased font-poppins bg-[#16142a]">
        <Providers>
          <div className="flex flex-col min-h-screen py-16">
            <MarketplaceBanner />
            <div className="flex min-h-screen pt-8">
              {/* Sidebar */}
              <div className="w-[250px]  p-4">
                <Sidebar />
              </div>

              {/* Main content area (products) */}
              <div className="flex-1 overflow-auto p-6">
                <MarketplaceNavbar />
                <main>{children}</main>
              </div>

              {/* Live Chat on the right */}
              <div className="w-[300px]  p-4">
                <LiveChat />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
