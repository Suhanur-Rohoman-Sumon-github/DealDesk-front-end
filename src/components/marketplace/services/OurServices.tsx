import { useGetAllProductsQuery } from '@/hooks/Products.hook';
import React from 'react';
import TrendingProducts from '../category/TrendingProducts';
import ProductCardSkeleton from '@/components/skeleton/ProductCardSkeleton';

const OurServices = () => {
     const { data, isLoading } = useGetAllProductsQuery({
        
        categoryId: "680d40f9a986e84c27c2f0f4",
      });

    if (isLoading) {
        return (
          <div className="mt-24">
            <ProductCardSkeleton />
          </div>
        );
      }
    
    return (
      <div>
        <TrendingProducts products={data?.data} />
      </div>
    );
};

export default OurServices;