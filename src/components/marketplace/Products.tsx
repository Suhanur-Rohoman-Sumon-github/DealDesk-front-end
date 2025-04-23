"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import ProductsBanner from "./ProductsBanner";
import { useGetAllProductsQuery } from "@/hooks/Products.hook";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";
import CustomPagination from "./products/CustomPgination";
import { Product } from "@/types";
import Image from "next/image";

const Products = () => {
  const [sortOption, setSortOption] = useState("default");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // ⬅️ Get category from URL

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isLoading } = useGetAllProductsQuery({
    sort: sortOption,
    searchTerm,
    category: category ?? undefined,
  });

  const totalPages = Math.ceil((data?.meta?.total || 0) / itemsPerPage);

  return (
    <div className="xl:w-11/12 mx-auto lg:px-5 2xl:w-full px-2">
      <ProductsBanner
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchSubmit={() => setCurrentPage(1)}
      />

      {isLoading ? (
        <ProductCardSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 md:gap-6 lg:gap-8 lg:px-8 xl:px-0">
          {data.data.length === 0 ? (
            <div className="col-span-full text-center text-white flex items-center justify-center pb-12">
              <div>
                <Image
                  src={
                    "https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-illustration-download-in-svg-png-gif-file-formats--no-records-list-record-emply-data-user-interface-pack-design-development-illustrations-6430781.png?f=webp"
                  }
                  alt="no product found"
                  height={500}
                  width={500}
                />
                <h1 className="text-4xl">No product Found</h1>
              </div>
            </div>
          ) : (
            data.data.map((product: Product, index: number) => (
              <ProductCard
                key={index}
                image={product?.images[0]}
                title={product.title}
                description={product.description}
                price={product.price}
                rating={product.numReviews}
                id={product._id}
              />
            ))
          )}
        </div>
      )}

      <div className="mt-6">
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;
