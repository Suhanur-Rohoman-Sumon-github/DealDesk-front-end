import { FaArrowUp, FaArrowDown, FaRegCircle } from "react-icons/fa";

interface CategoryProps {
  name?: string;
}

const Category: React.FC<CategoryProps> = ({ name }) => {
  return (
    <div className="flex items-center justify-center max-w-7xl relative gap-4 ">
      <div
        className={`${
          name ? "" : ""
        }    top-9 absolute w-[950px] ml-5 p-1 text-center text-white transition duration-300`}
      >
        {name ? (
          <p className="text-gray-300 text-lg">
            Explore everything under the{" "}
            <span className="text-[#8c33d7] font-semibold">{name}</span>{" "}
            category.
          </p>
        ) : (
          <div className="flex items-center justify-between px-6 mr-8">
            {/* Left Side: Market Up */}
            <div className="flex items-center gap-2 text-green-300 bg-green-600/20 px-3 py-1 rounded-full shadow-inner">
              <FaArrowUp className="animate-bounce" />
              <span className="text-sm font-medium">Market Up</span>
            </div>

            {/* Center Text */}
            <p className="text-white font-semibold tracking-wide drop-shadow flex items-center space-x-2 ml-4">
              <span className="text-red-400">
                <FaRegCircle className="animate-ping text-xs" />
              </span>
              <span>Trending Products</span>
            </p>

            {/* Right Side: Market Down */}
            <div className="flex items-center gap-2 text-red-400 bg-red-600/20 px-3 py-1 rounded-full shadow-inner ml-4">
              <span className="text-sm font-medium">Market Down</span>
              <FaArrowDown className="animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
