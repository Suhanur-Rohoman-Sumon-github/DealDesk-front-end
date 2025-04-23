"use client";

import React, { useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LightGelary from "./LightGelary";

import Link from "next/link";
import { useGetSingleProductQuery } from "@/hooks/Products.hook";
import SingleProductSkeleton from "@/components/skeleton/SingleProductSkeleton";
// make sure this exists

const SingleProducts = ({ productId }: { productId: string }) => {
  const [quantity, setQuantity] = useState(1);

  const { data: singleProducts, isLoading } = useGetSingleProductQuery(
    productId ? productId : ""
  );

  if (isLoading) {
    return (
      <div>
        {" "}
        <SingleProductSkeleton />
      </div>
    );
  }

  // Dummy product data
  // const singleProducts = {
  //   name: "Ergo Mechanical Keyboard Pro",
  //   description:
  //     "A premium ergonomic mechanical keyboard with customizable RGB backlighting and hot-swappable switches. Ideal for both gaming and typing.",
  //   images: ["/keyboard1.jpg", "/keyboard2.jpg", "/keyboard3.jpg"],
  //   price: 199,
  //   reviews: [
  //     {
  //       userName: "John Doe",
  //       userProfilePicture:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s",
  //       timestamp: new Date().toISOString(),
  //       comment: "Amazing keyboard, great tactile feedback!",
  //       ratings: 5,
  //     },
  //     {
  //       userName: "Jane Smith",
  //       userProfilePicture:
  //         "https://media.istockphoto.com/id/951331682/photo/caucasian-unsure-man-make-gestures-doubtfully-with-hands-with-copy-space-uncertain-young.jpg?s=612x612&w=0&k=20&c=eYmt_-5OxHVK41xZcO0Z0yVa2_GiEmfc5Pc696c_C1A=",
  //       timestamp: new Date().toISOString(),
  //       comment: "Feels premium and looks stunning.",
  //       ratings: 4,
  //     },
  //   ],
  // };

  // Dummy related products

  const {
    images,
    description,
    name,

    price,

    shippingAndReturns,
    category,
  } = singleProducts;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-8 border-b pb-8">
        <div className="lg:w-[50%] flex flex-col items-center mt-4">
          <div className="w-full p-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            <LightGelary images={images} />
          </div>

          <Tabs defaultValue="description" className="w-full mt-6">
            <TabsList className="flex space-x-4 w-full bg-transparent text-white">
              <TabsTrigger
                value="description"
                className="w-full py-4 mt-2 border border-white flex items-center justify-center space-x-2 rounded-md text-white text-xs sm:text-sm transition-all
          data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#572c7c] data-[state=active]:to-[#9133df]
          data-[state=active]:border-2 data-[state=active]:border-[#572c7c] hover:bg-gradient-to-r hover:from-[#572c7c] hover:to-[#9133df]"
              >
                Product Description
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="w-full py-4 mt-2 border border-white flex items-center justify-center space-x-2 rounded-md text-white text-xs sm:text-sm transition-all
          data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#572c7c] data-[state=active]:to-[#9133df]
          data-[state=active]:border-2 data-[state=active]:border-[#572c7c] hover:bg-gradient-to-r hover:from-[#572c7c] hover:to-[#9133df]"
              >
                Shipping Info
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="description"
              className="mt-4 p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl"
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                Product Description
              </h3>
              <p className="text-white/90">{description}</p>
            </TabsContent>

            <TabsContent
              value="shipping"
              className="mt-4 p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-2xl"
            >
              <h3 className="font-bold text-xl mb-2 text-white">
                Shipping Information
              </h3>
              <p className="text-white/90">{shippingAndReturns}</p>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/2 p-4 h-full text-white space-y-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20">
            <p className="text-sm">{`Category : ${category}`}</p>
            <h1 className="text-2xl font-bold mt-1">{name}</h1>

            <div className="flex justify-between items-center my-4 p-4 bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/20">
              <p className="text-xl font-semibold">${price}</p>
              <p className="flex items-center">
                <FaCheck className="mr-2 text-green-400" />
                In Stock
              </p>
            </div>

            <div className="mt-4 w-full flex items-center justify-between">
              <p className="text-xl font-bold text-white mb-2">Quantity</p>
              <div className="flex items-center w-32 rounded-xl overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-sm">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-2 text-white hover:bg-white/20 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, Math.min(99, parseInt(e.target.value) || 1))
                    )
                  }
                  className="w-full text-center bg-transparent text-white outline-none py-2"
                  min={1}
                  max={99}
                />
                <button
                  onClick={() => setQuantity((prev) => Math.min(99, prev + 1))}
                  className="px-3 py-2 text-white hover:bg-white/20 transition"
                >
                  +
                </button>
              </div>
            </div>

            <p className="mt-2 text-center border border-white/20 bg-white/10 backdrop-blur-md rounded p-2 text-xs">
              Pay faster, and we deliver faster — your convenience is our
              priority.
            </p>

            <div className="flex space-x-4 my-4">
              <Link
                className="w-full"
                href={`/marketplaces/buy?productId=${productId}`}
              >
                <button className="w-full button-primary">
                  <MdShoppingCart /> Buy Now
                </button>
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row justify-between mt-4 gap-4">
              <div className="p-4 border border-white/20 bg-white/10 backdrop-blur-md w-full rounded-xl shadow-md">
                <p className="font-bold flex items-center gap-2 mb-1 text-white">
                  <FaLocationDot className="text-red-500" />
                  Find Us
                </p>
                <p className="text-white/90 text-sm">
                  Our services are available locally. Reach out to us to know if
                  we serve your area.
                </p>
              </div>

              <div className="p-4 border border-white/20 bg-white/10 backdrop-blur-md w-full rounded-xl shadow-md">
                <p className="font-bold flex items-center gap-2 mb-1 text-white">
                  <IoMdHome className="text-red-500" />
                  Get Service
                </p>
                <p className="text-white/90 text-sm">
                  We provide personalized service directly at your doorstep or
                  preferred location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 border-b pb-8">
        {/* Reviews */}
        {/* <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Customer Reviews
          </h2>
          {reviews.rating > 0 ? (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl shadow-lg backdrop-blur-md bg-white/5 border border-white/10 text-white"
                >
                  <div className="flex items-center mb-3">
                    <Image
                      src={review.userProfilePicture}
                      alt={review.userName}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full mr-3 border border-white/20"
                    />
                    <div>
                      <p className="font-bold text-base">{review.userName}</p>
                      <p className="text-xs text-white/50">
                        {new Date(review.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="ml-12">
                    <p className="text-white/90 text-sm">{review.comment}</p>
                    <div className="mt-2 flex items-center">
                      <span className="text-yellow-400 text-sm">
                        {"⭐".repeat(review.ratings)}
                      </span>
                      <span className="ml-2 text-sm text-white/60">
                        {review.ratings}/5
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60 italic">
              No reviews available for this product.
            </p>
          )}
        </div> */}
      </div>

      {/* Related Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          More you should like
        </h2>
        <div className="">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleProducts;
