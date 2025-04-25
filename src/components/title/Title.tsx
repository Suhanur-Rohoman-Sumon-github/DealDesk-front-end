import Image from "next/image";
import lineLeft from "../../../public/assets/title--left.svg";
import lineRight from "../../../public/assets/title--right.svg";

const Title = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="my-24 px-4 flex flex-col items-center">
      {/* Title with Images (inline) */}
      <div className="flex items-center justify-center gap-2 md:gap-4 leading-none">
        {/* Left Line */}
        <div className="hidden md:flex items-center">
          <Image src={lineLeft} alt="left-line" width={40} height={12} />
        </div>

        {/* Title */}
        <p className="text-primary text-white">{title}</p>

        {/* Right Line */}
        <div className="hidden md:flex items-center">
          <Image
            src={lineRight}
            alt="right-line"
            width={40}
            height={12}
            className="mt-2.5"
          />
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-secondary text-center">{subTitle}</p>
    </div>
  );
};

export default Title;
