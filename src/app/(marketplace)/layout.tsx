import type { Metadata } from "next";
import { Providers } from "../providers";
import "../../styels/globals.css";

import { Poppins } from "next/font/google";
import MarketplaceNavbar from "@/components/navbars/marketplaceNavbar";
import Sidebar from "@/components/marketplace/Sidebar";
import LiveChat from "@/components/marketplace/LiveChat";
import FeedbackForm from "@/components/marketplace/FeedbackForm";

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
          <div className="flex flex-col min-h-screen pt-4">
            {/* Layout Container */}
            <div className="flex flex-col lg:flex-row gap-4 p-4">
              {/* Sidebar */}
              <aside className="w-full lg:w-[250px]">
                <Sidebar />
              </aside>

              {/* Main Content */}
              <section className="flex-1 w-full">
                <MarketplaceNavbar />
                <main className="mt-4">{children}</main>
              </section>

              {/* Live Chat */}
              <aside className="w-full lg:w-[300px]">
                <LiveChat />
                <FeedbackForm />
              </aside>
            </div>
          </div>

          <script
            dangerouslySetInnerHTML={{
              __html: `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/65cb25d40ff6374032cc8f5e/1hmgonj3q';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `,
            }}
          ></script>
        </Providers>
      </body>
    </html>
  );
}
