"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { products } from "@/data/data";

const itemsPerPage = 12;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div
        className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-1
          xl:grid-cols-2 
          2xl:grid-cols-3
          gap-4 sm:gap-6 md:gap-6 lg:gap-8"
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

      {/* ShadCN Pagination with Glassmorphism */}
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
                        : "text-white "
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
