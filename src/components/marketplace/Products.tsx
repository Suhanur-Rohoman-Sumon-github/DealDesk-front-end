"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { products as allProducts } from "@/data/data";

import ProductsBanner from "./ProductsBanner";

import { useGetAllProductsQuery } from "@/hooks/Products.hook";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";

const itemsPerPage = 12;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");

  const sortProducts = (products: typeof allProducts) => {
    if (sortOption === "low-to-high") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-to-low") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  const { data, isLoading, isError } = useGetAllProductsQuery();
  if (isLoading) {
    return <ProductCardSkeleton />;
  }
  console.log(data, "data from products");

  // const sortProducts = (products: typeof allProducts) => {
  //   if (sortOption === "low-to-high") {
  //     return [...products].sort((a, b) => a.price - b.price);
  //   } else if (sortOption === "high-to-low") {
  //     return [...products].sort((a, b) => b.price - a.price);
  //   }
  //   return products;
  // };

  // const sortedProducts = sortProducts(allProducts);
  // const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  // const currentProducts = sortedProducts.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className=" xl:w-11/12 mx-auto lg:px-5 2xl:w-full px-2 ">
      {/* 🔮 Glassmorphism Header */}
      <ProductsBanner />

      <div
        className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-1
          xl:grid-cols-2 
          2xl:grid-cols-3
          gap-4 sm:gap-6 md:gap-6 lg:gap-8
           lg:px-8 xl:px-0
          "
      >
        {Array.from({ length: 12 })
          .flatMap(() => data)
          .map((product, index) => (
            <ProductCard
              key={index}
              image={product?.images[0]}
              title={product.title}
              description={product.description}
              price={product.price}
              rating={product.numReviews}
              id={product._id}
            />
          ))}
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-center mt-10">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl p-4">
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`cursor-pointer rounded-md px-4 py-2 ${
                      currentPage === i + 1
                        ? 'bg-transparent text-white'
                        : 'text-white'
                    } transition-colors duration-200`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div> */}
    </div>
  );
};

export default Products;
