"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3,
  ShoppingBag,
  Package,
  Tags,
  Users,
  Settings,
  PieChart,
  TrendingUp,
  MessageSquare,
  CreditCard,
  Truck,
  Gift,
  ShoppingCart,
  Percent,
  BarChartHorizontal,
  Flag,
  Globe,
  HelpCircle,
  Bell,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  return (
    <Sidebar className=" border-r border border-red-50 ">
      <SidebarHeader className="px-6 py-5 border-b flex items-center">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-red-800"
        >
          <ShoppingBag className="h-6 w-6 " />
          <span>Deal desk</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/" className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                {
                  icon: <TrendingUp />,
                  label: "Sales Analytics",
                  path: "/analytics/sales",
                },
                {
                  icon: <PieChart />,
                  label: "Traffic Sources",
                  path: "/analytics/traffic",
                },
                {
                  icon: <BarChartHorizontal />,
                  label: "Customer Behavior",
                  path: "/analytics/behavior",
                },
              ].map(({ icon, label, path }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild>
                    <Link href={path} className="flex items-center">
                      {React.cloneElement(icon, { className: "h-5 w-5 mr-3" })}
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Product Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <DropdownMenu
              icon={<Package className="h-5 w-5 mr-3" />}
              label="Products"
              items={[
                { label: "All Products", path: "/products" },
                {
                  label: "Add New Product",
                  path: "/admin/dashboard/products/new",
                },
                {
                  label: "Categories",
                  path: "/admin/dashboard/products/category",
                },
                { label: "Inventory", path: "/products/inventory" },
              ]}
            />
            <DropdownMenu
              icon={<Tags className="h-5 w-5 mr-3" />}
              label="Catalog"
              items={[
                { label: "Collections", path: "/catalog/collections" },
                { label: "Attributes", path: "/catalog/attributes" },
                { label: "Tags", path: "/catalog/tags" },
                { label: "Brands", path: "/catalog/brands" },
              ]}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Order Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <DropdownMenu
              icon={<ShoppingCart className="h-5 w-5 mr-3" />}
              label="Orders"
              items={[
                { label: "All Orders", path: "/orders" },
                { label: "Pending", path: "/orders/pending" },
                { label: "Processing", path: "/orders/processing" },
                { label: "Completed", path: "/orders/completed" },
                { label: "Cancelled", path: "/orders/cancelled" },
              ]}
            />
            <SidebarMenu>
              {[
                { icon: <Truck />, label: "Shipments", path: "/shipments" },
                { icon: <CreditCard />, label: "Payments", path: "/payments" },
              ].map(({ icon, label, path }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild>
                    <Link href={path} className="flex items-center">
                      {React.cloneElement(icon, { className: "h-5 w-5 mr-3" })}
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Customer Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <DropdownMenu
              icon={<Users className="h-5 w-5 mr-3" />}
              label="Users"
              items={[
                { label: "All Users", path: "/users" },
                { label: "Add New User", path: "/users/new" },
                { label: "User Roles", path: "/users/roles" },
                { label: "Permissions", path: "/users/permissions" },
              ]}
            />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/reviews" className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-3" />
                    <span>Reviews</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Marketing</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                {
                  icon: <Percent />,
                  label: "Discounts",
                  path: "/marketing/discounts",
                },
                {
                  icon: <Flag />,
                  label: "Campaigns",
                  path: "/marketing/campaigns",
                },
                {
                  icon: <Gift />,
                  label: "Gift Cards",
                  path: "/marketing/gift-cards",
                },
              ].map(({ icon, label, path }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild>
                    <Link href={path} className="flex items-center">
                      {React.cloneElement(icon, { className: "h-5 w-5 mr-3" })}
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { icon: <Settings />, label: "Settings", path: "/settings" },
                { icon: <Globe />, label: "Store Setup", path: "/store" },
              ].map(({ icon, label, path }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild>
                    <Link href={path} className="flex items-center">
                      {React.cloneElement(icon, { className: "h-5 w-5 mr-3" })}
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3">
        <div className="flex justify-around">
          {[
            { icon: <Users />, path: "/profile" },
            { icon: <Bell />, path: "/notifications" },
            { icon: <HelpCircle />, path: "/help" },
            { icon: <LogOut />, path: "/logout" },
          ].map(({ icon, path }) => (
            <Link
              key={path}
              href={path}
              className="p-2 rounded-md hover:bg-sidebar-accent"
            >
              {React.cloneElement(icon, { className: "h-5 w-5" })}
            </Link>
          ))}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

interface DropdownMenuProps {
  icon: React.ReactNode;
  label: string;
  items: { label: string; path: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ icon, label, items }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-md">
          {icon}
          <span>{label}</span>
          <svg
            className={cn(
              "h-4 w-4 ml-auto transition-transform",
              isOpen ? "rotate-180" : ""
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="ml-9 mt-1 overflow-hidden">
        <div className="flex flex-col space-y-1">
          {items.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default AdminSidebar;
