"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  useGetPendingUserDataQuery,
  useUpdateMyTeligramChanelMutations,
} from "@/hooks/User.hook";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  telegram: string;
};

const AllUsers = () => {
  const { data: PendingUserData, isLoading: isPendingLoading } =
    useGetPendingUserDataQuery();

  const { mutate: updateProductMutation } =
    useUpdateMyTeligramChanelMutations();

  // Removed incorrect usage of mutate from a query hook
  // State for managing the Telegram channel input and selected user ID

  const [telegramChannel, setTelegramChannel] = useState("");
  const [selectUserEmail, setSelectUserEmail] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // You need to import and use the mutation hook for approving accounts
  // For example, if you have a hook called useApproveAccountMutation:
  // import { useApproveAccountMutation } from "@/hooks/User.hook";
  // Uncomment and adjust the following line according to your actual hook:
  // const [approveAccount, { isLoading: isApproving }] = useApproveAccountMutation();

  // Placeholder, replace with actual hook

  const handleApproveClick = (email: string) => {
    setSelectUserEmail(email);
    setOpen(true);
  };

  const handleApproveAccount = async () => {
    if (!selectUserEmail || !telegramChannel) return;
    updateProductMutation({ email: selectUserEmail, chanel: telegramChannel });
    setOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Button variant="outline" size="sm" asChild>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <h1 className="text-3xl font-semibold mt-6 mb-4">Pending Users</h1>

      {isPendingLoading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {PendingUserData?.data?.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.telegram}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleApproveClick(user.email)}
                  >
                    Approve Account
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Approve Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve User Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="text-sm font-medium">
              Enter Telegram Channel
            </label>
            <Input
              type="text"
              placeholder="@yourchannel"
              value={telegramChannel}
              onChange={(e) => setTelegramChannel(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={ handleApproveAccount}>
              Approve Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllUsers;
