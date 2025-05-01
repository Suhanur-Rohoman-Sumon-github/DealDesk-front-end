"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/hooks/Order.hooks";

const OrdersList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allOrder } = useGetAllOrdersQuery();
  const { mutate: updateOrderMutation } = useUpdateOrderMutation();

  const updtareOrder = (orderId: string) => {
    updateOrderMutation({
      orderId: orderId,
      updateData: {
        orderStatus: "completed",
      },
    });
  };

  // const handleFilterAndSearch = (searchValue: string, statusValue: string) => {
  //   let filtered = [...mockOrders];

  //   if (searchValue.trim() !== "") {
  //     filtered = filtered.filter(
  //       (order) =>
  //         order.id.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         order.customer.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //   }

  //   if (statusValue !== "all") {
  //     filtered = filtered.filter(
  //       (order) => order.status.toLowerCase() === statusValue.toLowerCase()
  //     );
  //   }

  //   setFilteredOrders(filtered);
  // };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  // const handleStatusChange = (value: string) => {
  //   setStatusFilter(value);
  //   handleFilterAndSearch(searchQuery, value);
  // };

  // const getStatusColor = (status: string) => {
  //   switch (status.toLowerCase()) {
  //     case "completed":
  //       return "bg-green-100 text-green-800 hover:bg-green-100";
  //     case "processing":
  //       return "bg-blue-100 text-blue-800 hover:bg-blue-100";
  //     case "pending":
  //       return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
  //     case "shipped":
  //       return "bg-purple-100 text-purple-800 hover:bg-purple-100";
  //     case "cancelled":
  //       return "bg-red-100 text-red-800 hover:bg-red-100";
  //     default:
  //       return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  //   }
  // };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Orders</h2>
        <p className="text-muted-foreground">View and manage recent orders.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID or customer name..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Transaction ID</TableHead>
              {allOrder?.data[0]?.ZipCode && <TableHead>Zip Code</TableHead>}
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allOrder?.data.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              allOrder?.data.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell>{order?.userId?.username}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order?.products?.title}</TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>{order.transactionId}</TableCell>
                  {order.ZipCode && <TableCell>{order.ZipCode}</TableCell>}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updtareOrder(order._id)}
                        >
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
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
      </div>
    </div>
  );
};

export default OrdersList;
