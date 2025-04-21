/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useGetAllProductsQuery } from "@/hooks/Products.hook";

const mockProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    sku: "HD-100",
    price: 129.99,
    stock: 45,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Wireless Keyboard",
    sku: "KB-200",
    price: 79.99,
    stock: 28,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    sku: "MS-300",
    price: 59.99,
    stock: 13,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "4K Monitor",
    sku: "MN-400",
    price: 349.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    sku: "SP-500",
    price: 89.99,
    stock: 32,
    status: "In Stock",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Stock":
      return "bg-green-100 text-green-800";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800";
    case "Out of Stock":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ProductTable = () => {
  const { data: allProduct } = useGetAllProductsQuery({
    sort: "",
    searchTerm: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Product Inventory</h1>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="in-stock">In Stock</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
          </TabsList>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all">
          <Table className="border rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProduct?.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Filtered Tab: In Stock */}
        <TabsContent value="in-stock">
          <Table className="border rounded-md">
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts
                .filter((p) => p.status === "In Stock")
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(product.status)}
                        variant="outline"
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* More filtered tabs (Low Stock, Out of Stock) can be added similarly */}
      </Tabs>
    </div>
  );
};

export default ProductTable;
