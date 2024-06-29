"use client";

import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import NavButton from "@/components/NavButton";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

const Navigation = () => {
  const currentPath = usePathname();

  return (
    <nav className="hidden items-center gap-2 overflow-x-auto lg:flex">
      {routes.map((route) => (
        <NavButton key={route.href} href={route.href} label={route.label} isActive={currentPath === route.href} />
      ))}
    </nav>
  );
};

export default Navigation;
