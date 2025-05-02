"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateOrderMutation } from "@/hooks/Order.hooks";
import { useUser } from "@/context/userProvider";



// 🔵 Static proxy data
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
  const { user } = useUser();
  const [selectedItem, setSelectedItem] = useState<{
    proxyName: string;
    quantity: number;
    price: number;
  } | null>(null);

  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);
  const [cryptoPrice, setCryptoPrice] = useState<number | null>(50000); // Mock BTC price

  const { mutate: addOrders } = useCreateOrderMutation();

  const cryptoAddresses: Record<string, string> = {
    BTC: "1LXHFr2ApDzzkMByu8TX4295xW1PxLs2kH",
    LTC: "LRyyLAbTnzp7b5fwW5StuYWYW6561JCvjV",
    TRC20: "THBekq5yKPr5HwBhiPrHaHJ3hYkB6YB5zC",
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cryptoAddresses[selectedCrypto]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleConfirmOrder = () => {
    if (!selectedItem || !transactionId) return;

    const orderData = {
      userId: user!.id,
      totalAmount: selectedItem.price,
      paymentType: selectedCrypto,
      transactionId,
      products: `680d4183a986e84c27c2f0fe`,
      proxyAddress: selectedItem.proxyName,
    };

    addOrders(orderData);
  };

  const convertedAmount =
    cryptoPrice && selectedItem
      ? (selectedItem.price / cryptoPrice).toFixed(6)
      : null;

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
                      <DialogContent className="bg-[#04091d] text-white border border-white/20 rounded-xl">
                        <DialogHeader>
                          <DialogTitle>Confirm Purchase</DialogTitle>
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="block text-white mb-2">
                                Payment Method
                              </label>
                              <Select
                                value={selectedCrypto}
                                onValueChange={setSelectedCrypto}
                              >
                                <SelectTrigger className="bg-white/10 text-white border border-white/20">
                                  <SelectValue placeholder="Select crypto" />
                                </SelectTrigger>
                                <SelectContent className="text-white bg-white/10 border border-white/20">
                                  <SelectItem value="BTC">
                                    Bitcoin (BTC)
                                  </SelectItem>
                                  <SelectItem value="TRC20">
                                    TRC20 (USDT)
                                  </SelectItem>
                                  <SelectItem value="LTC">
                                    Litecoin (LTC)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <p className="text-sm text-white/80">
                                Send payment to:
                              </p>
                              <div className="flex items-center gap-2">
                                <p className="text-white break-all">
                                  {cryptoAddresses[selectedCrypto]}
                                </p>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCopy}
                                  className="text-xs px-2 py-1 bg-[#04091d]"
                                >
                                  {copied ? "Copied!" : "Copy"}
                                </Button>
                              </div>
                            </div>

                            {convertedAmount && (
                              <Card className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                <p className="text-white">
                                  You’ll pay:{" "}
                                  <span className="font-semibold">
                                    {convertedAmount} {selectedCrypto}
                                  </span>
                                </p>
                              </Card>
                            )}

                            <Input
                              placeholder="Enter your Transaction ID"
                              value={transactionId}
                              onChange={(e) => setTransactionId(e.target.value)}
                              className="mb-2"
                            />
                            <Button
                              onClick={handleConfirmOrder}
                              disabled={!transactionId}
                              className="w-full button-primary"
                            >
                              Confirm Order
                            </Button>
                          </div>
                        </DialogHeader>
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
