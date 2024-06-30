"use client";

import { NavButton } from "@components";
import { Button } from "@components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMedia } from "react-use";

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
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const isMobile = useMedia("(max-width: 1024px)", false);

  const handleMobileNavClick = (href: string) => {
    router.push(href);
    setIsOpened(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpened} onOpenChange={setIsOpened}>
        <SheetTrigger>
          <Button
            size="sm"
            variant="outline"
            className="border-none bg-white/10 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white focus-visible:ring-transparent focus-visible:ring-offset-0"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                size="sm"
                variant={route.href === currentPath ? "secondary" : "ghost"}
                onClick={() => handleMobileNavClick(route.href)}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden items-center gap-2 overflow-x-auto lg:flex">
      {routes.map((route) => (
        <NavButton key={route.href} href={route.href} label={route.label} isActive={currentPath === route.href} />
      ))}
    </nav>
  );
};

export default Navigation;
