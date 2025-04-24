"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";

const mockData = [
  { country: "USA", zip: "10001", bank: "JPMORGAN CHASE", price: "16.00$" },
  { country: "USA", zip: "20001", bank: "BANK OF AMERICA", price: "16.00$" },
  { country: "USA", zip: "30301", bank: "WELLS FARGO", price: "16.00$" },
  { country: "USA", zip: "60601", bank: "CITIBANK", price: "16.00$" },
  { country: "USA", zip: "75201", bank: "US BANK", price: "16.00$" },
  { country: "USA", zip: "85001", bank: "PNC BANK", price: "16.00$" },
  { country: "USA", zip: "94101", bank: "NAVY FCU", price: "16.00$" },
  { country: "USA", zip: "98101", bank: "CHASE BANK USA", price: "16.00$" },
  { country: "USA", zip: "32225", bank: "REGIONS BANK", price: "16.00$" },
  { country: "USA", zip: "40220", bank: "TRUIST", price: "16.00$" },
  { country: "USA", zip: "73301", bank: "TD BANK", price: "16.00$" },
  { country: "USA", zip: "48201", bank: "ALLY BANK", price: "16.00$" },
  { country: "USA", zip: "55401", bank: "HUNTINGTON BANK", price: "16.00$" },
  { country: "USA", zip: "33101", bank: "FIFTH THIRD BANK", price: "16.00$" },
  { country: "USA", zip: "21201", bank: "KEYBANK", price: "16.00$" },
];

export default function Page() {
  const [filters, setFilters] = useState({
    priceFrom: "",
    priceTo: "",
    country: "",
    zip: "",
    bank: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredData = mockData.filter((item) => {
    return (
      (filters.country === "" ||
        item.country.toLowerCase().includes(filters.country.toLowerCase())) &&
      (filters.zip === "" || item.zip.includes(filters.zip)) &&
      (filters.bank === "" ||
        item.bank.toLowerCase().includes(filters.bank.toLowerCase()))
    );
  });

  return (
    <div className="max-w-7xl mx-auto p-6 text-white  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🏛 Full info+DL(SNIFF)
      </h1>

      <p className="text-sm text-gray-300 mb-6 bg-gray-800 p-4 rounded-md">
        <span className="font-bold">Description:</span> Full info BEST QUALITY
        only in 1 hand! After buy you get: Name, Email, Birth Date, Phone, Work,
        SSN, DL, Street, City, Country, ZIP, BANK, AN:RN, Download link. In
        download file you get more info + photo DL both sides + (70% docs with
        selfie/selfie with DL).
      </p>

      {/* Filters */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg p-4 rounded-lg mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <Input
            name="priceFrom"
            placeholder="Price from"
            value={filters.priceFrom}
            onChange={handleFilterChange}
          />
          <Input
            name="priceTo"
            placeholder="Price to"
            value={filters.priceTo}
            onChange={handleFilterChange}
          />
          <Input
            name="country"
            placeholder="Country"
            value={filters.country}
            onChange={handleFilterChange}
          />
          <Input
            name="zip"
            placeholder="ZIP"
            value={filters.zip}
            onChange={handleFilterChange}
          />
          <Input
            name="bank"
            placeholder="Bank"
            value={filters.bank}
            onChange={handleFilterChange}
          />
        </div>
        <div className="mt-4 text-right">
          <Button className="button-primary">Search</Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto  rounded-md shadow">
        <table className="min-w-full text-left">
          <thead className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg text-gray-300">
            <tr>
              <th className="p-3">Country</th>
              <th className="p-3">ZIP</th>
              <th className="p-3">Bank</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-800 hover:bg-gray-800"
              >
                <td className="p-3">{item.country}</td>
                <td className="p-3">{item.zip}</td>
                <td className="p-3">{item.bank}</td>
                <td className="p-3">{item.price}</td>
                <td className="p-3">
                  <Link
                    className="w-full"
                    href={`/marketplaces/buy?productId=${"6809af0b7a6ceb2b1e6b9fff"}`}
                  >
                    <button className="w-full button-primary">
                      <MdShoppingCart /> Buy Now
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
