"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

const UserNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here, e.g. removing tokens, clearing user data, etc.
    console.log("User logged out");
    router.push("/login"); // Redirect to login
  };

  return (
    <div className="glass-navbar px-6 py-3 flex items-center justify-between border-b">
      <div className="flex items-center space-x-2">
        <Link href="/dashboard" className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="ml-2 font-semibold text-lg">GlassUI</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 p-2">
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 cursor-pointer"
              >
                <User size={16} />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Settings size={16} />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserNavbar;
