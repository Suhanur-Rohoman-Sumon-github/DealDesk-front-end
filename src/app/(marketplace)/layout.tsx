import type { Metadata } from "next";
import { Providers } from "../providers";
import "../../styels/globals.css";
import Script from "next/script";
import MarketplaceNavbar from "@/components/navbars/marketplaceNavbar";
import Sidebar from "@/components/marketplace/Sidebar";
import LiveChat from "@/components/marketplace/LiveChat";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Live marketplace with products and live chat",
  icons: {
    icon: "/assets/Chat-GPT-Image-Apr-24-2025-02-07-44-PM-removebg-preview%20(2).webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-poppins bg-[#04091d]">
        <Providers>
          {/* Navbar at top */}
          <MarketplaceNavbar />

          {/* Layout container */}
          <div className="flex h-[calc(100vh-58px)]">
            {/* Sidebar hidden on small/mobile, visible from md screens */}
            <div className="relative md:block md:w-[250px] border-r border-white/10">
              <Sidebar />
            </div>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto px-4 md:px-8">
              {children}
            </main>

            {/* Live Chat */}
            <aside className="hidden lg:block w-[300px] border-l border-white/10">
              <LiveChat />
            </aside>
          </div>

          {/* Tawk.to chat script */}
          <Script
            id="tawk-to-script"
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
                (function () {
                  var s1 = document.createElement("script"),
                    s0 = document.getElementsByTagName("script")[0];
                  s1.async = true;
                  s1.src = "https://embed.tawk.to/6812c4cbcba56419020c08d8/1iq4l1f2o";
                  s1.charset = "UTF-8";
                  s1.setAttribute("crossorigin", "*");
                  s0.parentNode.insertBefore(s1, s0);
                })();
              `,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
