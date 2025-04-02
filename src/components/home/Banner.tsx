const Banner = () => {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-center">
      <div className="max-w-2xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to TypoTech</h1>
        <p className="mt-4 text-lg">
          Discover high-quality keyboards designed for professionals and
          enthusiasts.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
