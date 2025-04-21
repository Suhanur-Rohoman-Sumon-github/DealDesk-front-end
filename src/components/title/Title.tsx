const Title = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="my-24 text-center md:text-start px-4 flex flex-col items-center">
      {/* Title with SVGs */}
      <div className="flex items-center space-x-4">
        {/* Left SVG */}
        <svg
          className="hidden md:block"
          width="80"
          height="12"
          viewBox="0 0 80 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="leftGradient"
              x1="0"
              y1="0"
              x2="80"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9133df" />
              <stop offset="1" stopColor="#572c7c" />
            </linearGradient>
          </defs>
          <path
            d="M80 6H0M0 6L6 0M0 6L6 12"
            stroke="url(#leftGradient)"
            strokeWidth="2"
          />
        </svg>

        {/* Title */}
        <p className="lg:text-4xl text-2xl font-bold text-white whitespace-nowrap">
          {title}
        </p>

        {/* Right SVG */}
        <svg
          className="hidden md:block"
          width="80"
          height="12"
          viewBox="0 0 80 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="rightGradient"
              x1="0"
              y1="0"
              x2="80"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#572c7c" />
              <stop offset="1" stopColor="#9133df" />
            </linearGradient>
          </defs>
          <path
            d="M0 6H80M80 6L74 0M80 6L74 12"
            stroke="url(#rightGradient)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Subtitle */}
      <p className="text-center text-[#a5a3ab] font-bold uppercase mt-2">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
