import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import ProductCard from "../ProductCard";
import TrendingProductsCard from "./TrendingProductsCard";

type TrendingProductsProps = {
  products: Product[];
};

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products }) => {
  return (
    <section className="pt-24 w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {products.map((product, index) => (
          <TrendingProductsCard
            key={index}
            image={product.images[0]}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.numReviews}
            id={product._id}
            category={product.category.name}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
