"use client";

import { useUser } from "@/context/userProvider";
import { useAddFavoritePostsMutations } from "@/hooks/Products.hook";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  id: string;
  category: string;
}

const SocialServiceCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  description,
  price,
  rating,
  category,
}) => {
  const { user } = useUser();

  const { mutate: addToFavorite } = useAddFavoritePostsMutations(id, user?.id);

  const handleAddfavorite = () => {
    addToFavorite(id);
  };

  return (
    <div className="group relative cursor-pointer backdrop-blur-md bg-white/5 border border-white/10 shadow-lg rounded-2xl p-3 transition-all duration-300 hover:scale-[1.015] hover:shadow-2x">
      <div className="l">
        {/* Frosted border glow */}
        <div className="absolute inset-0 z-0 rounded-2xl border border-white/10 pointer-events-none" />

        <Image
          width={300}
          height={200}
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-xl"
        />

        <div className="pt-2 space-y-2 z-10 relative">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-200">{description}</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill={index < rating ? "#ffd700" : "#555"}
                  viewBox="0 0 16 16"
                  className="mr-1"
                >
                  <path d="M8 12.293l3.708 2.052-1-4.236L14 6.708l-4.236-.364L8 2 6.236 6.344 2 6.708l3.292 3.401-1 4.236L8 12.293z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Bottom controls */}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handleAddfavorite()}
          className="flex items-center gap-1 rounded-full text-white text-xs bg-white/10 border border-white/20  px-3 py-1 hover:bg-white/20 transition cursor-pointer"
        >
          <MdFavorite className="text-sm" />
        </button>

        <a
          href="https://calendly.com/spprtdldsk/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-white/10 border flex items-center gap-4 border-white/20 rounded-full py-1 px-2 hover:bg-white/20 transition cursor-pointer"
          title="Book with Calendly"
        >
          Book now
        </a>
      </div>
    </div>
  );
};

export default SocialServiceCard;
