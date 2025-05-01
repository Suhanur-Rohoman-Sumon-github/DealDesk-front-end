"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
// import ProductCard from "./ProductCard";
import ProductsBanner from "./ProductsBanner";
import { useGetAllProductsQuery } from "@/hooks/Products.hook";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";
import CustomPagination from "./products/CustomPgination";
// import { Product } from "@/types";
import Image from "next/image";
// import Categories from "@/app/(AdminDashboard)/admin/dashboard/products/category/page";
import Category from "./products/Category";
import TrendingProducts from "./category/TrendingProducts";

const Products = () => {
  const [sortOption, setSortOption] = useState("default");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isLoading } = useGetAllProductsQuery({
    sort: sortOption,
    searchTerm,
    categoryId: "680d40f9a986e84c27c2f0f4",
  });



  return (
    <div className="xl:w-11/12 mx-auto lg:px-5 2xl:w-full px-2">
      <ProductsBanner
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchSubmit={() => setCurrentPage(1)}
      />

      <Category name={category as string} />

      {isLoading ? (
        <div className="mt-24">
          <ProductCardSkeleton />
        </div>
      ) : (
        <div className="">
          {data.data.length === 0 ? (
            <div className="col-span-full text-center text-white flex items-center justify-center">
              <div>
                <Image
                  src="https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-illustration-download-in-svg-png-gif-file-formats--no-records-list-record-emply-data-user-interface-pack-design-development-illustrations-6430781.png?f=webp"
                  alt="no product found"
                  height={500}
                  width={500}
                />
                <h1 className="text-4xl">No product Found</h1>
              </div>
            </div>
          ) : (
            <TrendingProducts products={data?.data} />
          )}
        </div>
      )}

      {data?.data?.length === 12 ? (
        <div className="mt-6">
          <CustomPagination
            totalPages={data?.meta.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Products;
