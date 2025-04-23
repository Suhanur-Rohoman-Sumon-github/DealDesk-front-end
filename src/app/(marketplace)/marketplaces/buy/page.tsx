import BuyPageContent from "@/components/marketplace/buy/BuyPageContent";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <BuyPageContent />
    </Suspense>
  );
};

export default page;
