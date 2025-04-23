import Products from "@/components/marketplace/Products";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mt-14">
        <Products />
      </div>
    </Suspense>
  );
};

export default page;
