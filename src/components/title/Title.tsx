import Image from "next/image";

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
    <div className="my-24 px-4 flex flex-col items-center">
      {/* Title with Arrows */}
      <div className="flex items-center space-x-3">
        <Image
          src={"https://centure.volkovdesign.com/img/dodgers/title--left.svg"}
          alt="Left Arrow"
          className="w-8 h-8 md:w-10 md:h-10"
          width={40}
          height={40}
        />
        <p className="text-4xl ext-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#3B82F6] to-[#6EE7B7] text-center">
          {title}
        </p>
        <Image
          src={"https://centure.volkovdesign.com/img/dodgers/title--right.svg"}
          alt="Right Arrow"
          className="w-8 h-8 md:w-10 md:h-10"
          width={40}
          height={40}
        />
      </div>

      {/* Subtitle */}
      <p className="text-center   text-[#a5a3ab] font-bold uppercase mt-2">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
