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
import { Download, EyeIcon } from "lucide-react";

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
              <TableRow>
                <TableHead className="text-white">Order ID</TableHead>
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Product</TableHead>
                <TableHead className="text-white">Price</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2 text-green-600">
                      <Button variant="outline" size="icon">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
