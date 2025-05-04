
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MainNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const items = [
    {
      title: "Dashboard",
      href: "/",
      active: currentPath === "/",
    },
    {
      title: "Schedules",
      href: "/schedules",
      active: currentPath === "/schedules",
    },
    {
      title: "Sound Library",
      href: "/library",
      active: currentPath === "/library",
    },
    {
      title: "Settings",
      href: "/settings",
      active: currentPath === "/settings",
    },
  ];

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {items.map((item) => (
        <Link
          key={item.title}
          to={item.href}
          className={cn(
            "transition-colors hover:text-harmony-secondary",
            item.active ? "text-harmony-secondary font-semibold" : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
