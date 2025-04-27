import MarketplaceFooter from "@/components/footer/MarketplaceFooter";
import Products from "@/components/marketplace/Products";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mt-14">
        <Products />
        <MarketplaceFooter />
      </div>
    </Suspense>
  );
};

export default page;
