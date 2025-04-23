"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetMyOrderQuery } from "@/hooks/Order.hooks";
import { useUser } from "@/context/userProvider";

// Sample order data

const Orders = () => {
  const { user } = useUser();
  const { data: recentOrders } = useGetMyOrderQuery(user?.id || "");
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
