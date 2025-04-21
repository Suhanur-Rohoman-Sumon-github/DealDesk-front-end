const ProductCardSkeleton = () => {
  return (
    <div className="w-full px-2">
      {/* Product Skeleton Cards */}
      <div
        className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-1
          xl:grid-cols-2 
          2xl:grid-cols-3 
          gap-4 sm:gap-6 md:gap-6 lg:gap-8"
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="bg-[#ffffff0a] border border-white/10 rounded-xl p-4 animate-pulse space-y-4"
          >
            <div className="w-full h-48 bg-white/10 rounded-lg" />
            <div className="h-4 w-3/4 bg-white/20 rounded-md" />
            <div className="h-3 w-full bg-white/10 rounded-md" />
            <div className="h-3 w-2/3 bg-white/10 rounded-md" />
            <div className="flex items-center justify-between">
              <div className="h-4 w-16 bg-white/20 rounded-md" />
              <div className="h-4 w-10 bg-white/20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
