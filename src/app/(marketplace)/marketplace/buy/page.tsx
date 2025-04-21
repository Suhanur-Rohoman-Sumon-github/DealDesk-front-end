"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  FaTelegramPlane,
  FaCheckCircle,
  FaTruck,
  FaShoppingCart,
} from "react-icons/fa";
import { RiBtcFill } from "react-icons/ri";

import Image from "next/image";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { useSearchParams } from "next/navigation";
import { useGetSingleProductQuery } from "@/hooks/Products.hook";
import { useCreateOrderMutation } from "@/hooks/Order.hooks";
import { useUser } from "@/context/userProvider";

const BuyPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [step, setStep] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [transactionId, setTransactionId] = useState("");
  const [cryptoPrice, setCryptoPrice] = useState<number | null>(null);
  const icons = [FaShoppingCart, RiBtcFill, FaTruck];
  const { user } = useUser();
  const { data: singleProducts, isLoading } = useGetSingleProductQuery(
    productId ? productId : ""
  );

  const { mutate: addOrders } = useCreateOrderMutation();

  useEffect(() => {
    fetchCryptoPrice(selectedCrypto);
  }, [selectedCrypto]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const { images, description, name, price } = singleProducts;

  const getPercentage = (step: number) => {
    return step * 25;
  };

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
        return "tether"; // TRC20 is USDT, same as "tether"
      default:
        return "bitcoin";
    }
  };

  const handleConfirmOrder = () => {
    
    if (transactionId) {
      const orderData = {
        userId: user?.id as string,
        products: productId ? productId : "",
        totalAmount: price,
        paymentType: selectedCrypto,
        transactionId: transactionId,
        productId: productId || "",
      };
      addOrders(orderData);
      setStep(3);
    }
  };



  const convertedAmount = cryptoPrice ? (price / cryptoPrice).toFixed(6) : null;

  const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    const radius = 24;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const progress = getPercentage(currentStep);
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="w-full fixed top-14 left-0 right-0 z-20">
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto  ">
          {/* Step Indicator */}
          <div className="flex items-center flex-grow gap-0">
            {[0, 1, 2].map((stepIndex) => {
              const Icon = icons[stepIndex];
              const stepNumber = stepIndex + 1;

              return (
                <div
                  key={stepNumber}
                  className="relative flex items-center w-full"
                >
                  {/* Step Icon */}
                  <div
                    className={` h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 w-full
                    ${
                      currentStep > stepNumber
                        ? "bg-[#5b2d82] text-white border-[#5b2d82]"
                        : currentStep === stepNumber
                        ? "bg-[#9033de] text-white  animate-pulse border-[#5b2d82]"
                        : "bg-white/10 text-white border-white/30"
                    }`}
                  >
                    {currentStep > stepNumber ? (
                      <FaCheckCircle className="text-white" />
                    ) : (
                      <Icon />
                    )}
                  </div>

                  {/* Connecting Line */}
                  {stepIndex < 2 && (
                    <div
                      className={`h-1 w-10 transition-all duration-300 ${
                        currentStep > stepNumber
                          ? "bg-[#5b2d82]"
                          : "bg-[#9033de]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Circular Progress Bar */}
          <div className="w-20 h-20 relative ml-4 pt-4">
            <svg height="100%" width="100%">
              <circle
                stroke="#ffffff30"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke="#9033de"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
            <div className="absolute inset-0 flex  text-white text-[10px] font-bold top-8   left-3.5 text-center">
              {progress}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
      {/* Step Indicator */}
      <StepIndicator currentStep={step} />

      {/* Step 1: Product Details */}
      {step === 1 && (
        <div className="grid lg:grid-cols-2 gap-12 w-full max-w-4xl mt-6">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl  border border-white/20 shadow-lg flex flex-col items-center justify-center">
            <Image
              src={images[0]}
              alt={name}
              width={500}
              height={500}
              className="mb-6 rounded-lg shadow-md"
            />
            <h2 className="text-2xl font-bold text-white mb-4">
              TypoTech Premium Keyboard
            </h2>
            <p className="text-gray-300 mb-2">{`Price: ${price}`}</p>
            <p className="text-gray-300 text-center">
              {description.length > 100
                ? description.slice(0, 100) + "..."
                : description}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              Order Summary
            </h2>

            {/* Coupon Section */}
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter coupon code"
                className="flex-1 bg-white/5 border border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                variant="secondary"
                className="bg-white/20 backdrop-blur text-white hover:bg-green-500 hover:text-white"
              >
                Apply
              </Button>
            </div>

            {/* Order Breakdown */}
            <div className="text-white space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span>Tax</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2">
                <span>Total</span>
                <span>{price}</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => setStep(2)}
              className="w-full button-primary mt-6"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Payment Method */}
      {step === 2 && (
        <div className="grid lg:grid-cols-2 gap-12 w-full max-w-4xl">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
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
              className="underline text-purple-400 text-sm"
            >
              Visit {selectedCrypto} Info
            </a>
          </div>

          <div className="bg-white/10 text-white backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Order Details
            </h2>
            <Card className="px-4  bg-white/5 border border-white/10 rounded-xl">
              <p className="text-white">{name}</p>
              {convertedAmount && (
                <div className=" text-white">
                  <p>
                    You’ll pay:{" "}
                    <span className="font-semibold">
                      {convertedAmount} {selectedCrypto}
                    </span>
                  </p>
                </div>
              )}
            </Card>
            <div className="mt-6">
              <Input
                placeholder="Enter Transaction ID"
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

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/10 shadow-lg max-w-2xl mx-auto">
          <FaTelegramPlane size={48} className="text-blue-400 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Almost Done!</h2>
          <p className="text-white/80 mb-6">
            Please keep an eye on your Telegram channel and email. Well deliver
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
