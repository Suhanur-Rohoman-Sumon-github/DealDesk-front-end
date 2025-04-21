"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
  const pathname = usePathname();

  return (
    <div className="glass h-screen w-60 border-r flex flex-col p-4">
      <div className="space-y-2 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            )}
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
