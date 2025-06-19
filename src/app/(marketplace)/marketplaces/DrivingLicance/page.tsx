"use client";


import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { useGetSingleProductQuery } from "@/hooks/Products.hook";
import { TbBrandCoinbase } from "react-icons/tb";
import { SiWebmoney } from "react-icons/si";
import Image from "next/image";

const COINBASE_ID = "68545fbbc8e72c978113323b";
const WEBULL_ID = "680d4536a986e84c27c2f119";

export default function DrivingLicense() {
  const { data: webull } = useGetSingleProductQuery("680d4536a986e84c27c2f119");
  const { data: coinbase } = useGetSingleProductQuery(
    "68545fbbc8e72c978113323b"
  );

  const mainProducts = [
    {
      id: COINBASE_ID,
      name: "Coinbase DL",
      replacement: "100% Replacement",
      price: coinbase?.sellprice,
      percent: 100,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6hcTTU1A8Ymi2VldXqCsPkBu_ltAhIKiRg&s",
    },
    {
      id: WEBULL_ID,
      name: "Webull DL",
      replacement: "70% Replacement",
      price: webull?.sellprice,
      percent: 40,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHW4iPgGU36wx8MBhKLKkbJ_o0qZKxV7X2YoQGMi8OPxXK4f6eR4cpH3mzQMPY2FRwwDs&usqp=CAU",
    },
  ];
  // const { mutate: updataProducts } = useUpdateProductMutation();

  return (
    <div className="max-w-7xl mx-auto p-6 text-white  min-h-screen mt-10">
      {/* Main Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {mainProducts.map((prod) => (
          <Link
            key={prod.id}
            href={`/marketplaces/${prod.id}`}
            className="block bg-white/10 border border-white/20 rounded-xl shadow-lg p-6 hover:bg-white/20 transition group"
          >
            <div className="flex flex-col items-center gap-4">
              <Image
                width={96}
                height={96}
                src={prod.image}
                alt={prod.name}
                className="w-24 h-24 object-contain rounded-full border border-white/20 mb-2"
              />
              <h2 className="text-2xl font-bold mb-1 group-hover:text-purple-300">
                {prod.name}
              </h2>
              <div className="text-lg font-semibold text-green-400 mb-1">
                {prod.replacement}
              </div>
              <div className="text-xl font-bold mb-2">${prod.price}</div>
              <Button className="button-primary w-full flex items-center justify-center gap-2">
                <MdShoppingCart /> Buy Now
              </Button>
            </div>
          </Link>
        ))}
      </div>

      {/* Centered Icons for Coinbase and Webull */}
      <div className="flex justify-center items-center gap-12 mt-8 mb-8">
        <div className="flex flex-col items-center">
          <TbBrandCoinbase
            className="text-6xl text-blue-400 mb-2"
            title="Coinbase"
          />
          <span className="text-white text-lg font-semibold">Coinbase</span>
        </div>
        <div className="flex flex-col items-center">
          <SiWebmoney className="text-6xl text-green-400 mb-2" title="Webull" />
          <span className="text-white text-lg font-semibold">Webull</span>
        </div>
      </div>
    </div>
  );
}
