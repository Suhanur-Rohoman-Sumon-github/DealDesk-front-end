"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const BuyPageContent = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const zip = searchParams.get("zip");

  const [countdown, setCountdown] = useState(1800);
  const [step, setStep] = useState(1);

  const { user } = useUser();
  const { data: singleProducts, isLoading } = useGetSingleProductQuery(
    productId || ""
  );
  const { mutate: updataProducts } = useUpdateProductMutation();
  const { mutate: addOrders } = useCreateOrderMutation();

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
    setStep(3);

    if (user?.id && productId) {
      const orderData = {
        userId: user.id,
        products: productId,
        totalAmount: singleProducts.sellprice,
        paymentType: "stripe",
        transactionId: "STRIPE-PAID",
        productId,
        ZipCode: zip,
      };
      addOrders(orderData);
      updataProducts({ productId, updateData: { totalPrice: 0 } });
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

  return (
    <div className="min-h-screen py-10 px-4 max-w-7xl mx-auto">
      {status === "outOfStock" && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center rounded-2xl p-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            Product Currently Out of Stock
          </h2>
          <p className="text-white/80 mb-4">
            Please wait{" "}
            <span className="font-semibold">{formatTime(countdown)}</span>
          </p>
          <p className="text-white/70 text-sm">
            Well be back soon. Thank you for your patience.
          </p>
        </div>
      )}

      <StepIndicator currentStep={step} />

      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10">
          {/* Product Info */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg flex flex-col items-center justify-center">
            <Image
              src={images[0]}
              alt={name}
              width={400}
              height={400}
              className="mb-6 rounded-lg shadow-md object-contain max-h-[300px]"
            />
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              {name}
            </h2>
            <p className="text-gray-300 mb-2">{`Price: $${totalPrice}`}</p>
            <p className="text-gray-300 text-center px-4">
              {description.length > 100
                ? description.slice(0, 100) + "..."
                : description}
            </p>
          </div>

          {/* Checkout Section */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-4">Card Payment</h2>

            <Card className="px-4 py-6 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-white text-sm mb-4">Pay with your card</p>

              {/* Replace below with Stripe Elements if integrating */}
              <Input className="mb-4 text-white" placeholder="Card Number" />
              <div className="grid grid-cols-2 gap-4 mb-4 text-white">
                <Input placeholder="MM/YY" />
                <Input placeholder="CVC" />
              </div>
              <Input placeholder="Name on Card" className="mb-4 text-white" />
            </Card>

            <Button
              onClick={handleConfirmOrder}
              className="w-full mt-6 button-primary"
            >
              pay ${totalPrice}
            </Button>

            {/* Support Contact Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-white/70 mb-2">
                Any payment issue? Please contact support
              </p>
              <a
                href="https://t.me/dealdeskcomunity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center justify-center gap-1"
              >
                <FaTelegramPlane size={14} />
                @dealdeskcomunity
              </a>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-md p-10 rounded-xl border border-white/10 shadow-lg max-w-2xl mx-auto mt-14">
          <FaTelegramPlane size={48} className="text-blue-400 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Almost Done!</h2>
          <p className="text-white/80 mb-6">
            Please keep an eye on your Telegram channel and email. We&apos;ll
            deliver your product as fast as possible.
          </p>
          <a
            href="https://t.me/dealdeskcomunity"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary w-full text-center flex items-center justify-center gap-2"
          >
            Visit Telegram <FaTelegramPlane className="text-blue-400" />
          </a>
        </div>
      )}
    </div>
  );
};

export default BuyPageContent;
