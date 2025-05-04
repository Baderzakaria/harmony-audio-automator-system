
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MainNav() {
  const items = [
    {
      title: "Dashboard",
      href: "/",
      active: true,
    },
    {
      title: "Schedules",
      href: "/schedules",
      active: false,
    },
    {
      title: "Sound Library",
      href: "/library",
      active: false,
    },
    {
      title: "Settings",
      href: "/settings",
      active: false,
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
