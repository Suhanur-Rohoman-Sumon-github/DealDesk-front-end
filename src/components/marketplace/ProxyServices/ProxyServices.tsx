"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const proxyData = [
  {
    name: "Generic Proxy",
    data: [
      { quantity: 10, price: 1 },
      { quantity: 25, price: 2.2 },
      { quantity: 50, price: 5 },
      { quantity: 100, price: 8 },
      { quantity: 200, price: 15 },
      { quantity: 300, price: 22 },
      { quantity: 400, price: 27 },
      { quantity: 800, price: 50 },
      { quantity: 1000, price: 63 },
      { quantity: 1200, price: 74 },
      { quantity: 1600, price: 95 },
      { quantity: 2200, price: 125 },
      { quantity: 3000, price: 170 },
    ],
  },
  {
    name: "PIA Proxy",
    data: [
      { quantity: 10, price: 1 },
      { quantity: 25, price: 2 },
      { quantity: 50, price: 5 },
      { quantity: 100, price: 8 },
      { quantity: 200, price: 16 },
      { quantity: 300, price: 22 },
      { quantity: 400, price: 28 },
      { quantity: 800, price: 53 },
      { quantity: 1000, price: 65 },
      { quantity: 1200, price: 75 },
      { quantity: 1600, price: 96 },
      { quantity: 2200, price: 126 },
      { quantity: 3000, price: 170 },
    ],
  },
  {
    name: "9Proxy",
    data: [
      { quantity: 10, price: 1 },
      { quantity: 25, price: 3 },
      { quantity: 50, price: 5.2 },
      { quantity: 100, price: 8 },
      { quantity: 200, price: 14 },
      { quantity: 400, price: 25 },
      { quantity: 800, price: 47 },
      { quantity: 1200, price: 70 },
      { quantity: 1600, price: 90 },
      { quantity: 2200, price: 120 },
      { quantity: 3000, price: 162 },
      { quantity: 4000, price: 210 },
      { quantity: 5000, price: 260 },
    ],
  },
];

export function ProxyTables() {
  const [selectedItem, setSelectedItem] = useState<{
    proxyName: string;
    quantity: number;
    price: number;
  } | null>(null);

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-10 text-white">
      {proxyData.map((proxy, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold mb-4">{proxy.name}</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Quantity</TableHead>
                <TableHead className="text-white">Price ($)</TableHead>
                <TableHead className="text-right text-white">Buy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proxy.data.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="button-primary"
                          variant="default"
                          size="sm"
                          onClick={() =>
                            setSelectedItem({
                              proxyName: proxy.name,
                              quantity: item.quantity,
                              price: item.price,
                            })
                          }
                        >
                          Buy
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Purchase</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2 text-sm ">
                          <p>
                            <strong>Proxy:</strong> {selectedItem?.proxyName}
                          </p>
                          <p>
                            <strong>Quantity:</strong> {selectedItem?.quantity}
                          </p>
                          <p>
                            <strong>Price:</strong> ${selectedItem?.price}
                          </p>
                        </div>
                        <Button className="mt-4 w-full button-primary">Confirm order</Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
}
