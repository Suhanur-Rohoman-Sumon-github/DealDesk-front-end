"use client";

import Link from "next/link";
import { Heart, Home, Settings, ShoppingBasket, User } from "lucide-react";

type SidebarLink = {
  icon: React.ElementType;
  href: string;
  label: string;
};

const links: SidebarLink[] = [
  {
    icon: Home,
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: ShoppingBasket,
    href: "/dashboard/orders",
    label: "My Orders",
  },
  {
    icon: Heart,
    href: "/dashboard/favorites",
    label: "Favorites",
  },
  {
    icon: User,
    href: "/dashboard/profile",
    label: "Profile",
  },
  {
    icon: Settings,
    href: "/dashboard/settings",
    label: "Settings",
  },
];

const Sidebar = () => {
  return (
    <div className="glass h-screen w-60 border-r flex flex-col p-4">
      <div className="space-y-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              " backdrop-blur-md bg-[#1f1b37]/90 lg:bg-white/5 border-r border-white/10 shadow-xl text-white transition-all duration-300 flex items-center gap-4 py-4 px-4"
            }
          >
            <link.icon size={18} />
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
