import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import TrendingProductsCard from "./TrendingProductsCard";

type TrendingProductsProps = {
  products: Product[];
};

interface TrendingProduct extends Product {
  percent: number;
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products }) => {
  const categoryPriority: { [key: string]: number } = {
    "usa dl": 100,
    "chime bank": 95,
    "go2 bank": 90,
    "cashapp tags": 85,
    "web development": 80,
    "number panel": 75,
    "ssn panel": 70,
    "all type email": 65,
    "paid subscriptions": 60,
    "token store": 50,
    "digital marketing": 50,
    "crypto services": 50,
    "money orders": 50,
    paypal: 50,
    textnow: 50,
  };

  const [trendingProducts, setTrendingProducts] = useState<TrendingProduct[]>(
    []
  );
  const [visibleCount, setVisibleCount] = useState<number>(12);

  useEffect(() => {
    if (products.length > 0) {
      const mapped = products
        .map((product) => {
          const basePriority =
            categoryPriority[product.category.toLowerCase()] || 40;
          return {
            ...product,
            percent: basePriority + parseFloat((Math.random() * 5).toFixed(2)),
          };
        })
        .sort((a, b) => b.percent - a.percent);

      setTrendingProducts(mapped);
    }
  }, [products]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingProducts((prev) =>
        prev
          .map((product) => {
            const randomChange = (Math.random() * 1 - 0.5).toFixed(2);
            let newPercent = parseFloat(
              (product.percent + parseFloat(randomChange)).toFixed(2)
            );
            newPercent = Math.max(0, Math.min(100, newPercent));
            return { ...product, percent: newPercent };
          })
          .sort((a, b) => b.percent - a.percent)
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setVisibleCount((prev) => {
          const next = prev + 12;
          return next > trendingProducts.length
            ? trendingProducts.length
            : next;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trendingProducts]);

  return (
    <section className="pt-24 w-full">
      <div className="grid grid-cols-2 w-full sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {trendingProducts.slice(0, visibleCount).map((product, index) => (
          <TrendingProductsCard
            key={index}
            image={product.images[0]}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.numReviews}
            id={product._id}
            category={product.category}
            percent={product.percent}
            subCategory={product.subCategory}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
