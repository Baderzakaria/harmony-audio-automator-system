
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioSchedule } from "@/utils/audioUtils";
import { AlarmClock, Bell, Music, Timer, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpcomingSchedulesProps {
  schedules: AudioSchedule[];
}

export function UpcomingSchedules({ schedules }: UpcomingSchedulesProps) {
  // Only show active schedules, sorted by time
  const activeSchedules = schedules
    .filter(schedule => schedule.isActive)
    .sort((a, b) => {
      const timeA = a.timeString.split(':').map(Number);
      const timeB = b.timeString.split(':').map(Number);
      
      if (timeA[0] !== timeB[0]) {
        return timeA[0] - timeB[0];
      }
      return timeA[1] - timeB[1];
    });
  
  const getIcon = (soundType: string) => {
    switch (soundType) {
      case "bell":
        return <Bell className="h-4 w-4" />;
      case "music":
        return <Music className="h-4 w-4" />;
      case "voice":
        return <Volume2 className="h-4 w-4" />;
      case "alarm":
        return <Timer className="h-4 w-4" />;
      default:
        return <AlarmClock className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlarmClock className="h-5 w-5 text-harmony-secondary" />
          Upcoming Schedules
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeSchedules.length > 0 ? (
          <ul className="space-y-3">
            {activeSchedules.map((schedule) => (
              <li key={schedule.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-1.5 rounded-full bg-harmony-light text-harmony-secondary"
                  )}>
                    {getIcon(schedule.soundType)}
                  </div>
                  <div>
                    <div className="font-medium">{schedule.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {schedule.daysActive.slice(0, 3).map(d => d.substring(0, 3)).join(", ")}
                      {schedule.daysActive.length > 3 ? ` +${schedule.daysActive.length - 3} more` : ""}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-semibold">
                  {schedule.timeString}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No active schedules found
          </div>
        )}
      </CardContent>
    </Card>
  );
}
