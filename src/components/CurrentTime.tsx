
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format time as HH:MM:SS
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  
  // Format date as Day, Month Date, Year
  const formattedDate = currentTime.toLocaleDateString([], { 
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <Card className="bg-harmony-primary text-white border-none overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center">
        <div className="text-5xl font-bold mb-2">{formattedTime}</div>
        <div className="text-white/70">{formattedDate}</div>
      </CardContent>
    </Card>
  );
}
