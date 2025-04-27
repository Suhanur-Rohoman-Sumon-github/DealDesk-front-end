"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useUser } from "@/context/userProvider";

const UserNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const { user } = useUser();

  return (
    <div className="glass-navbar px-6 py-2 flex items-center justify-between border-b">
      <div className="flex items-center space-x-2">
        <div className="">
          <Link className="" href="/">
            <Image
              src={
                "https://i.ibb.co.com/rGrLVCZs/Chat-GPT-Image-Apr-24-2025-02-07-44-PM-removebg-preview.png"
              }
              alt="logo"
              height={80}
              width={80}
            />
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/"
            className="text-white hidden sm:block hover:text-purple-400 text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/marketplaces"
            className="text-white hidden sm:block hover:text-purple-400 text-sm font-medium"
          >
            marketplaces
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profilePicture || "/avatar.png"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mt-2">
              <DropdownMenuItem onClick={() => (location.href = "/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
