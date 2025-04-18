"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // You can use your custom button component
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"; // Custom table components

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fake users data
  const fakeUsers: User[] = [
    {
      _id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
      createdAt: "2023-01-01T00:00:00Z",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "user",
      createdAt: "2023-02-01T00:00:00Z",
    },
    {
      _id: "3",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "user",
      createdAt: "2023-03-01T00:00:00Z",
    },
  ];

  // Simulating a fetch call with fake data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulating a delay like a real API call
        setTimeout(() => {
          setUsers(fakeUsers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Button variant="outline" size="sm" asChild>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <h1 className="text-3xl font-semibold mt-6 mb-4">All Users</h1>

      {loading ? (
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
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/users/${user._id}`} className="text-blue-500">
                      View Details
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AllUsers;
