import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import React from "react";
import SocialServiceCard from "./SocialServiceCard";
import { useGetAllProductsQuery } from "@/hooks/Products.hook";
import { Product } from "@/types";

const SocialService = () => {
  const { data: SocialProducts, isLoading } = useGetAllProductsQuery({
    categoryId: "680d4220a986e84c27c2f109",
  });

  if (isLoading) {
    return (
      <div className="mt-24">
        <ProductCardSkeleton />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 px-4 py-8">
      {SocialProducts?.data?.map((product: Product, index: number) => (
        <SocialServiceCard
          key={index}
          image={product.images[0]}
          title={product.title}
          description={product.description}
          price={product.price}
          rating={product.numReviews}
          id={product._id}
          category={product.category}
        />
      ))}
    </div>
  );
};

export default SocialService;
