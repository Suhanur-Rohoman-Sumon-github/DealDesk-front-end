"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, EyeIcon, MoreHorizontal } from "lucide-react";
import { useGetMyOrderQuery } from "@/hooks/Order.hooks";
import { useUser } from "@/context/userProvider";
import { Order } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample order data
const orders = [
  {
    id: "ORD-42069",
    date: "2025-04-15",
    status: "delivered",
    product: "Nike Air Max 270",
    price: "$129.99",
    quantity: 1,
  },
  {
    id: "ORD-98765",
    date: "2025-04-14",
    status: "processing",
    product: "Apple AirPods Pro",
    price: "$249.99",
    quantity: 1,
  },
  {
    id: "ORD-54321",
    date: "2025-04-12",
    status: "delivered",
    product: "Samsung Galaxy S25",
    price: "$1099.99",
    quantity: 1,
  },
  {
    id: "ORD-13579",
    date: "2025-04-10",
    status: "shipped",
    product: "Kindle Paperwhite",
    price: "$139.99",
    quantity: 1,
  },
  {
    id: "ORD-24680",
    date: "2025-04-05",
    status: "delivered",
    product: "Bose QuietComfort Headphones",
    price: "$329.99",
    quantity: 1,
  },
  {
    id: "ORD-11223",
    date: "2025-04-01",
    status: "delivered",
    product: "Dyson V12 Vacuum",
    price: "$599.99",
    quantity: 1,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return <Badge className="bg-green-500">Delivered</Badge>;
    case "processing":
      return <Badge className="bg-yellow-500">Processing</Badge>;
    case "shipped":
      return <Badge className="bg-blue-500">Shipped</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Orders = () => {
  const { user } = useUser();
  const { data: recentOrders, isLoading } = useGetMyOrderQuery(user?.id || "");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">
          View and manage your order history
        </p>
      </div>

      <Card className="glass-card backdrop-blur-md bg-opacity-30 text-white">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#8b33d5] text-white">
                <TableHead className="text-white">Order ID</TableHead>

                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Items</TableHead>
                <TableHead className="text-white">Total</TableHead>
                <TableHead className="text-white">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders?.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                recentOrders?.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order._id}</TableCell>

                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order?.products?.category}</TableCell>
                    <TableCell>${order.totalAmount}</TableCell>
                    <TableCell>{order.orderStatus}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
