"use client";

import SingleProducts from "@/components/marketplace/products/SingleProducts";
import { useParams } from "next/navigation";
import React from "react";

const ProductPage = () => {
  const { productId } = useParams();

  const productIdString = Array.isArray(productId) ? productId[0] : productId;

  return (
    <div>
      {productIdString ? (
        <SingleProducts productId={productIdString} />
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default ProductPage;
