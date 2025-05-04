
import React from "react";
import { 
  Bell, 
  Music, 
  AlarmClock, 
  Timer, 
  Clock, 
  BellRing
} from "lucide-react";
import { cn } from "@/lib/utils";

export function SoundMenu() {
  const menuItems = [
    {
      title: "Sound Scheduler",
      icon: AlarmClock,
      href: "/",
      active: true,
    },
    {
      title: "Voice Notifications",
      icon: Bell,
      href: "/voice-notifications",
      active: false,
    },
    {
      title: "Ambient Music",
      icon: Music,
      href: "/ambient-music",
      active: false,
    },
    {
      title: "Broadcast Content",
      icon: Clock,
      href: "/broadcast",
      active: false,
    },
    {
      title: "Manual Controls",
      icon: BellRing,
      href: "/manual",
      active: false,
    },
    {
      title: "Emergency Alerts",
      icon: Timer,
      href: "/emergency",
      active: false,
    },
  ];

  return (
    <nav className="space-y-1 px-2 py-4">
      {menuItems.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
            item.active
              ? "bg-white/10 text-white"
              : "text-white/70 hover:bg-white/10 hover:text-white"
          )}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.title}
        </a>
      ))}
    </nav>
  );
}
