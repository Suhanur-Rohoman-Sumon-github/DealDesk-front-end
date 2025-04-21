
import dynamic from 'next/dynamic';
import React from 'react';

const MarketplaceComponent = dynamic(
  () => import("@/components/marketplace/Products"),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <div className="p-4  pt-6 flex flex-col gap-4">
      <MarketplaceComponent />
    </div>
  );
};

export default page;
