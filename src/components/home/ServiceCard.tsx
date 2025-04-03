"use client";
import Image from "next/image";

const ServiceCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="w-full  border border-white/30 rounded-lg  backdrop-blur-lg overflow-hidden">
      {/* Image at the top */}
      <div className="relative w-full h-48">
        <Image src={image} alt={name} className="object-cover h-48" fill />
      </div>

      {/* Title below */}
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold text-white">{name}</h3>
      </div>
    </div>
  );
};

export default ServiceCard;
