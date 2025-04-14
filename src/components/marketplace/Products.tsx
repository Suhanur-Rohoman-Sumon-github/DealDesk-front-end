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

  const sortedProducts = sortProducts(allProducts);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full px-2 ">
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
        
          "
      >
        {currentProducts.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10">
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
                        ? "bg-transparent text-white"
                        : "text-white"
                    } transition-colors duration-200`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Products;
