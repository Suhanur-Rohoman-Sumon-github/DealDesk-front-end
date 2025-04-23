"use client";

import ProductCard from "@/components/marketplace/ProductCard";
import ProductCardSkeleton from "@/components/skeleton/ProductCardSkeleton";
import { useUser } from "@/context/userProvider";
import { useGetAllFavoriteProductQuery } from "@/hooks/Products.hook";
import { Product } from "@/types";

const Favorites = () => {
  const { user } = useUser();

  const { data: myFavorite, isLoading } = useGetAllFavoriteProductQuery(
    user?.id || ""
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
        <p className="text-muted-foreground">
          Products you have saved for later
        </p>
      </div>

      <div>
        {isLoading && <ProductCardSkeleton />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {myFavorite?.map((product: Product) => (
            <ProductCard
              key={product._id}
              image={product.images[1]}
              title={product.title}
              description={product.description}
              price={product.price}
              rating={5}
              id={product._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
