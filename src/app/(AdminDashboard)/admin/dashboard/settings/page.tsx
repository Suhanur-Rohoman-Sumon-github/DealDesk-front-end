"use client";

import React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table"; // Assuming these are from your UI components

const AdminSettingsPage = () => {
  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <Sidebar className="w-1/4 ">
        <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>
        <ul>
          <li>
            <Button variant="outline" size="sm" className="w-full text-left">
              User Management
            </Button>
          </li>
          <li>
            <Button variant="outline" size="sm" className="w-full text-left">
              System Settings
            </Button>
          </li>
          <li>
            <Button variant="outline" size="sm" className="w-full text-left">
              Security
            </Button>
          </li>
        </ul>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* User Management Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <div>
            <h3 className="text-xl mb-2">Manage Users</h3>
            <Button className="mb-4"  size="sm">
              Add New User
            </Button>
            {/* User Table */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Example user row */}
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john.doe@example.com</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>
                    <Link href={`/users/1`} className="text-blue-500">
                      View Details
                    </Link>
                  </TableCell>
                </TableRow>
                {/* Add more user rows here */}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* System Settings Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
          <div>
            <h3 className="text-xl mb-2">Site Settings</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Site Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter site title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Logo</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <Button  size="sm">
                Save Changes
              </Button>
            </form>
          </div>
        </section>

        {/* Security Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
          <div>
            <h3 className="text-xl mb-2">Password Policies</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Minimum Password Length
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter password length"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Enable 2FA
                </label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option value="false">Disabled</option>
                  <option value="true">Enabled</option>
                </select>
              </div>
              <Button  size="sm">
                Save Security Settings
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
