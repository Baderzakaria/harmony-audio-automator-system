
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Home, Calendar, Music, Settings } from "lucide-react";

export function MainNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  const items = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      active: currentPath === "/",
    },
    {
      title: "Schedules",
      href: "/schedules",
      icon: Calendar,
      active: currentPath === "/schedules",
    },
    {
      title: "Sound Library",
      href: "/library",
      icon: Music,
      active: currentPath === "/library",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      active: currentPath === "/settings",
    },
  ];

  return (
    <nav className="flex items-center space-x-2 sm:space-x-6 text-sm font-medium">
      {items.map((item) => (
        <Link
          key={item.title}
          to={item.href}
          className={cn(
            "transition-colors hover:text-harmony-secondary flex items-center gap-1.5 py-1 px-2",
            item.active ? "text-harmony-secondary font-semibold" : "text-muted-foreground"
          )}
        >
          {isMobile ? (
            <item.icon className="h-5 w-5" />
          ) : (
            <>
              {item.title}
            </>
          )}
        </Link>
      ))}
    </nav>
  );
}
