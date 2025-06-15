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
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/hooks/Products.hook";
import { useCreateOrderMutation } from "@/hooks/Order.hooks";
import { useUser } from "@/context/userProvider";
import { FaTelegramPlane } from "react-icons/fa";

import { Card } from "@/components/ui/card";
import StepIndicator from "@/components/marketplace/buy/StepIndicator";

import { useGetMychanelQuery } from "@/hooks/User.hook";

const BuyPageContent = () => {
  const cryptoAddresses: Record<string, string> = {
    BTC: "1BtJ6AxMExuryje93vwcwpprq1J578xGS3",
    LTC: "LTaDSKuFfb1miHB8GVAmzAjMsgGtdfbpDW",
    TRC20: "TGhhaFQNZJochD12v3s6i36R89PcfkkqmU",
  };
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const zip = searchParams.get("zip");
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(1800);
  const [step, setStep] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [transactionId, setTransactionId] = useState("");
  const [cryptoPrice, setCryptoPrice] = useState<number | null>(null);

  const { user } = useUser();

  const { data: singleProducts, isLoading } = useGetSingleProductQuery(
    productId || ""
  );

  console.log("Single Product Data:", singleProducts);
  const { mutate: updataProducts } = useUpdateProductMutation();
  const { mutate: addOrders } = useCreateOrderMutation();
  const { data } = useGetMychanelQuery(user?.email || "");

  const handleCopy = async () => {
    if (!selectedCrypto) return;
    try {
      await navigator.clipboard.writeText(cryptoAddresses[selectedCrypto]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

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
      case "LTC":
        return "litecoin";
      case "TRC20":
        return "tether";
      default:
        return "bitcoin";
    }
  };

  useEffect(() => {
    if (singleProducts?.totalPrice === 0 && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [singleProducts, countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleConfirmOrder = () => {
    if (transactionId && user?.id && productId) {
      const orderData = {
        userId: user.id,
        products: productId,
        totalAmount: singleProducts.sellprice,
        paymentType: selectedCrypto,
        transactionId,
        productId,
        ZipCode: zip,
      };
      addOrders(orderData);
      updataProducts({ productId, updateData: { totalPrice: 0 } });
      console.log("Order data:", orderData);
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

  const { images, description, name, totalPrice, status } = singleProducts;
  console.log(status);
  const convertedAmount = cryptoPrice
    ? (totalPrice / cryptoPrice).toFixed(6)
    : null;

  return (
    <div className="min-h-screen py-10 px-4">
      {singleProducts?.status === "outOfStock" && (
        <div className="absolute inset-0 z-50 bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">
            Product Currently Out of Stock
          </h2>
          <p className="text-white/80 mb-4">
            Please wait{" "}
            <span className="font-semibold">{formatTime(countdown)}</span>
          </p>
          <p className="text-white/70 text-sm">
            We'll be back soon. Thank you for your patience.
          </p>
        </div>
      )}
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
            <p className="text-gray-300 mb-2">{`Price: $${totalPrice}`}</p>
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
                <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4">
              <p className="text-sm text-white/80 mb-1">
                Send your payment to:
              </p>
              <div className="flex items-center gap-2">
                <p className="text-white">{cryptoAddresses[selectedCrypto]}</p>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="text-xs px-2 py-1"
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

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

          <div className="">
            <a
              href={data?.myChanel || "N/A"}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary w-full text-center flex items-center"
            >
              visit your Report chanel{" "}
              <FaTelegramPlane className="text-blue-400 " />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyPageContent;
