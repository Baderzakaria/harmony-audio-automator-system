
import React from "react";
import { 
  Bell, 
  Music, 
  AlarmClock, 
  Timer, 
  Clock, 
  BellRing,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function SoundMenu() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const menuItems = [
    {
      title: "Sound Scheduler",
      icon: AlarmClock,
      href: "/",
      active: currentPath === "/",
    },
    {
      title: "Manage Schedules",
      icon: Clock,
      href: "/schedules",
      active: currentPath === "/schedules",
    },
    {
      title: "Sound Library",
      icon: Music,
      href: "/library",
      active: currentPath === "/library",
    },
    {
      title: "Voice Notifications",
      icon: Bell,
      href: "/library?type=voice",
      active: currentPath.includes("voice"),
    },
    {
      title: "Manual Controls",
      icon: BellRing,
      href: "/#manual-controls",
      active: false,
    },
    {
      title: "Emergency Alerts",
      icon: Timer,
      href: "/#emergency",
      active: false,
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      active: currentPath === "/settings",
    },
  ];

  return (
    <nav className="space-y-1 px-2 py-4">
      {menuItems.map((item) => (
        <Link
          key={item.title}
          to={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
            item.active
              ? "bg-white/10 text-white"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          )}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
