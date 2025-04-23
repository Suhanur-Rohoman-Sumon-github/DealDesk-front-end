"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/hooks/Products.hook";
import { useCreateOrderMutation } from "@/hooks/Order.hooks";
import { useUser } from "@/context/userProvider";
import { FaShoppingCart, FaTruck, FaTelegramPlane } from "react-icons/fa";
import { RiBtcFill } from "react-icons/ri";
import { Card } from "@/components/ui/card";
import StepIndicator from "@/components/marketplace/buy/StepIndicator";

const BuyPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [step, setStep] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [transactionId, setTransactionId] = useState("");
  const [cryptoPrice, setCryptoPrice] = useState<number | null>(null);

  const { user } = useUser();
  const { data: singleProducts, isLoading } = useGetSingleProductQuery(
    productId || ""
  );
  const { mutate: addOrders } = useCreateOrderMutation();

  useEffect(() => {
    fetchCryptoPrice(selectedCrypto);
  }, [selectedCrypto]);

  const fetchCryptoPrice = async (crypto: string) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${getCoinGeckoId(
          crypto
        )}&vs_currencies=usd`
      );
      const data = await res.json();
      const price = data[getCoinGeckoId(crypto)].usd;
      setCryptoPrice(price);
    } catch (error) {
      console.error("Error fetching price:", error);
      setCryptoPrice(null);
    }
  };

  const getCoinGeckoId = (symbol: string) => {
    switch (symbol) {
      case "BTC":
        return "bitcoin";
      case "ETH":
        return "ethereum";
      case "TRC20":
        return "tether";
      default:
        return "bitcoin";
    }
  };

  const handleConfirmOrder = () => {
    if (transactionId && user?.id && productId) {
      const orderData = {
        userId: user.id,
        products: productId,
        totalAmount: singleProducts.price,
        paymentType: selectedCrypto,
        transactionId,
        productId,
      };
      addOrders(orderData);
      setStep(3);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const { images, description, name, price } = singleProducts;
  const convertedAmount = cryptoPrice ? (price / cryptoPrice).toFixed(6) : null;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="">
        <StepIndicator currentStep={step} />
      </div>
      {step === 1 && (
        <div className="grid lg:grid-cols-2 gap-12 w-full max-w-4xl mx-auto mt-14 ">
          {/* Product Info */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-lg flex flex-col items-center justify-center">
            <Image
              src={images[0]}
              alt={name}
              width={500}
              height={500}
              className="mb-6 rounded-lg shadow-md"
            />
            <h2 className="text-2xl font-bold text-white mb-4">{name}</h2>
            <p className="text-gray-300 mb-2">{`Price: $${price}`}</p>
            <p className="text-gray-300 text-center">
              {description.length > 100
                ? description.slice(0, 100) + "..."
                : description}
            </p>
          </div>

          {/* Checkout Section */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Select Payment Method
            </h2>
            <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
              <SelectTrigger className="bg-white/10 text-white border border-white/20">
                <SelectValue placeholder="Select a crypto" />
              </SelectTrigger>
              <SelectContent className="text-white bg-white/10 border border-white/20">
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="TRC20">Tron (TRC20 / USDT)</SelectItem>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
              </SelectContent>
            </Select>

            <a
              href={`https://coinmarketcap.com/currencies/${getCoinGeckoId(
                selectedCrypto
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-purple-400 text-sm mt-2 block"
            >
              View live price on CoinMarketCap
            </a>

            <h2 className="text-2xl font-bold text-white mt-6 mb-4">
              Order Details
            </h2>
            <Card className="px-4 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-white">{name}</p>
              {convertedAmount && (
                <p className="text-white">
                  You’ll pay:{" "}
                  <span className="font-semibold">
                    {convertedAmount} {selectedCrypto}
                  </span>
                </p>
              )}
            </Card>

            <div className="mt-6">
              <Input
                placeholder="Enter your Transaction ID"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="mb-4"
              />
              <Button
                onClick={handleConfirmOrder}
                disabled={!transactionId}
                className="w-full button-primary"
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 - Confirmation */}
      {step === 3 && (
        <div className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/10 shadow-lg max-w-2xl mx-auto mt-14">
          <FaTelegramPlane size={48} className="text-blue-400 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Almost Done!</h2>
          <p className="text-white/80 mb-6">
            Please keep an eye on your Telegram channel and email. We’ll deliver
            your product as fast as possible.
          </p>
          <a
            href="https://t.me/+gyYVulBrJIk4N2Nl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full button-primary">Go to Telegram</Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default BuyPage;
