"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useGetAllOrdersQuery } from "@/hooks/Order.hooks";

// Mock data for the payments
const paymentData = [
  {
    product: "Garden Tools Set",
    transactionId: "TXN-12345",
    amount: 99.99,
    status: "Completed",
  },
  {
    product: "Seed Kit",
    transactionId: "TXN-12346",
    amount: 19.99,
    status: "Pending",
  },
  {
    product: "Watering Can",
    transactionId: "TXN-12347",
    amount: 25.5,
    status: "Processing",
  },
  {
    product: "Fertilizer Pack",
    transactionId: "TXN-12348",
    amount: 45.75,
    status: "Completed",
  },
  {
    product: "Compost Bin",
    transactionId: "TXN-12349",
    amount: 60.2,
    status: "Pending",
  },
];

const PaymentPage = () => {
  const [sortedData, setSortedData] = useState(paymentData);
  const [sortDirection, setSortDirection] = useState("asc");

  const { data: allOrder } = useGetAllOrdersQuery();

  // Sort function for Amount
  const handleSort = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);

    const sorted = [...paymentData].sort((a, b) => {
      if (newDirection === "asc") {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });

    setSortedData(sorted);
  };

  // Function to get badge color based on status
  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "Completed":
  //       return "bg-green-100 text-green-800";
  //     case "Pending":
  //       return "bg-yellow-100 text-yellow-800";
  //     case "Processing":
  //       return "bg-blue-100 text-blue-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  return (
    <div className="mt-4 flex items-center ">
      <Card className="w-full max-w-8xl ">
        <h2 className="text-xl font-semibold text-center mb-6">
          Recent Payments
        </h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>user id</TableHead>
              <TableHead>transaction id</TableHead>
              <TableHead>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={handleSort}
                >
                  Amount
                  {sortDirection === "asc" ? (
                    <FaArrowAltCircleUp className="ml-2 h-4 w-4" />
                  ) : (
                    <FaArrowAltCircleDown className="ml-2 h-4 w-4" />
                  )}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allOrder?.data?.length > 0 ? (
              allOrder.data?.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {payment?.products?.title}
                  </TableCell>
                  <TableCell>{payment?.userId?.username}</TableCell>
                  <TableCell>{payment.transactionId}</TableCell>
                  <TableCell>${payment.totalAmount}</TableCell>

                  <TableCell>{payment.orderStatus}</TableCell>
                  <TableCell>
                    {/* <Badge
                      className={getStatusColor(payment.status)}
                      variant="outline"
                    >
                      {payment.status}
                    </Badge> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-24">
                  No payments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default PaymentPage;
