"use client";

import ProductCard from "@/components/marketplace/ProductCard";
import { useGetAllProductsQuery } from "@/hooks/Products.hook";
import { useParams } from "next/navigation";
import React from "react";
import DrivingLicense from "../../DrivingLicance/page";
import { Product } from "@/types";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import Image from "next/image";

// const demoProducts = [
//   {
//     id: "1",
//     image: "/demo1.jpg", // Replace with your real images later
//     title: "USA Driving License",
//     description: "High quality USA DL with security features.",
//     price: "150",
//     rating: 5,
//     category: "USA DL",
//   },
//   {
//     id: "2",
//     image: "/demo2.jpg",
//     title: "Chime Bank Account",
//     description: "Fully verified Chime account ready to use.",
//     price: "200",
//     rating: 4,
//     category: "chime bank",
//   },
//   {
//     id: "3",
//     image: "/demo3.jpg",
//     title: "Go2 Bank Account",
//     description: "Secure and verified Go2 account.",
//     price: "180",
//     rating: 4,
//     category: "go2 bank",
//   },
//   {
//     id: "4",
//     image: "/demo4.jpg",
//     title: "CashApp Tags",
//     description: "Fresh cashapp tags available.",
//     price: "80",
//     rating: 3,
//     category: "cashapp tags",
//   },
//   {
//     id: "5",
//     image: "/demo5.jpg",
//     title: "Web Development Services",
//     description: "Professional web development services.",
//     price: "500",
//     rating: 5,
//     category: "web development",
//   },
// ];

const Page = () => {
  const { categoryId } = useParams();

  const { data, isLoading } = useGetAllProductsQuery({
    categoryId: categoryId as string,
  });

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <section className="">
      <div className="">
        {categoryId === "680d4117a986e84c27c2f0f6" && <DrivingLicense />}

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
            <div className="grid grid-cols-1 py-8 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-6">
              {data?.data?.map((product: Product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.images[0]}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  rating={product.numReviews}
                  category={product.category}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
