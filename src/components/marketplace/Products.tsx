import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    image: "https://via.placeholder.com/150",
    title: "Mechanical Keyboard",
    description: "A high-quality mechanical keyboard with RGB lights.",
    price: "$99.99",
    rating: 4,
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Gaming Mouse",
    description: "Precision mouse designed for gamers with adjustable DPI.",
    price: "$59.99",
    rating: 5,
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  // Add more products as needed
];

const Products = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
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
  );
};

export default Products;
