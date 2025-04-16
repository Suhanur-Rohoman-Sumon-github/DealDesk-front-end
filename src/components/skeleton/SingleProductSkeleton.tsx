"use client";

const SingleProductSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 border-b border-white/10 pb-8">
        {/* Left: Image & Tabs */}
        <div className="lg:w-[50%] flex flex-col items-center mt-4">
          <div className="w-full p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 animate-pulse">
            <div className="w-full h-[400px] bg-gradient-to-r from-gray-700 to-transparent rounded-2xl" />
          </div>

          <div className="w-full mt-6 space-y-4">
            {/* Specs */}
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/20  space-y-3 animate-pulse">
              <div className="w-full h-10 bg-gradient-to-r from-gray-700 to-transparent rounded-md" />
              <div className="w-full h-36 bg-gradient-to-r from-gray-700 to-transparent rounded-2xl" />
            </div>

            {/* Reviews */}
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/20  space-y-3 animate-pulse">
              <div className="w-full h-10 bg-gradient-to-r from-gray-700 to-transparent rounded-md" />
              <div className="w-full h-36 bg-gradient-to-r from-gray-700 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Right: Info Area */}
        <div className="md:w-1/2 p-4 h-full text-white space-y-4">
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20 space-y-6 animate-pulse">
            <div className="w-1/3 h-4 bg-gradient-to-r from-gray-700 to-transparent rounded" />
            <div className="w-3/4 h-8 bg-gradient-to-r from-gray-700 to-transparent rounded" />
          </div>

          {/* Price and Info */}
          <div className="p-4 bg-white/10 rounded-xl border border-white/20 space-y-2 animate-pulse">
            <div className="w-1/4 h-6 bg-gradient-to-r from-gray-700 to-transparent rounded" />
            <div className="w-1/3 h-4 bg-gradient-to-r from-gray-700 to-transparent rounded" />
          </div>

          {/* Quantity Selector */}
          <div className="flex justify-between items-center">
            <div className="w-1/2 h-5 bg-gradient-to-r from-gray-700 to-transparent rounded" />
            <div className="w-32 h-10 bg-gradient-to-r from-gray-700 to-transparent rounded-xl" />
          </div>

          {/* Add to Cart buttons */}
          <div className="w-full mt-4">
            <div className="h-10 bg-gradient-to-r from-gray-700 to-transparent rounded-xl mb-2" />
            <div className="h-10 bg-gradient-to-r from-gray-700 to-transparent rounded-xl" />
          </div>

          {/* Related Items */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4 animate-pulse">
            <div className="w-full h-24 bg-gradient-to-r from-gray-700 to-transparent rounded-xl" />
            <div className="w-full h-24 bg-gradient-to-r from-gray-700 to-transparent rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
