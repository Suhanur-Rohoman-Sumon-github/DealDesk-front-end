"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const AdminsNavbar = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const getBreadcrumbs = () =>
    segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);

      return (
        <React.Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={href}>{label}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {index < segments.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      );
    });

  return (
    <nav className="py-7.5 px-8 flex justify-between items-center border-b border-gray-200 bg-[#fafafa] mb-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {segments.length > 0 && <BreadcrumbSeparator />}
          {getBreadcrumbs()}
        </BreadcrumbList>
      </Breadcrumb>

      {/* User Avatar */}
      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9lRck6miglY0SZF_BZ_sK829yiNskgYRUg&s"
          alt="User Avatar"
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default AdminsNavbar;
