import Image from "next/image";
import React from "react";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  description,
  price,
  rating,
}) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-md  rounded-2xl  p-3">
      {/* Optional frosted border glow */}
      <div className="absolute inset-0 z-0 rounded-2xl border border-white/10 pointer-events-none" />

      <Image
        width={300}
        height={200}
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-xl"
      />
      <div className="p-4 space-y-2 z-10 relative">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-white">{price}</span>
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
      </div>
    </div>
  );
};

export default ProductCard;
