const Title = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
  leftArrow?: string;
  rightArrow?: string;
}) => {
  return (
    <div className="my-24 text-center md:text-start px-4 flex flex-col items-center">
      {/* Title with Arrows */}
      <div className="flex items-center space-x-3">
        <p className="lg:text-4xl text-2xl font-bold bg-clip-text text-white">
          {title}
        </p>
      </div>

      {/* Subtitle */}
      <p className="text-center   text-[#a5a3ab] font-bold uppercase mt-2">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
