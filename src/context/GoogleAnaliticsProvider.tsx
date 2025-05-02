import Script from "next/script";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GoogleAnalyticsProvider = ({ children }: Props) => {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-9NZLRYV3XV"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9NZLRYV3XV');
        `}
      </Script>
      {children}
    </>
  );
};

export default GoogleAnalyticsProvider;
