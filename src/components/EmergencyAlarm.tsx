
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, AlertTriangle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { playAudio } from "@/utils/audioUtils";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function EmergencyAlarm() {
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState<string | null>(null);

  const emergencyTypes = [
    { id: "fire", name: "Fire Alarm", icon: "🔥" },
    { id: "earthquake", name: "Earthquake", icon: "🏢" },
    { id: "lockdown", name: "Lockdown", icon: "🔒" },
    { id: "evacuation", name: "Evacuation", icon: "🚪" },
  ];

  const triggerAlarm = (alarmId: string) => {
    setSelectedAlarm(alarmId);
    setShowConfirmDialog(true);
  };

  const confirmAlarm = () => {
    setShowConfirmDialog(false);
    setIsAlarmActive(true);
    
    // Simulate alarm sound
    playAudio('alarm-1', 1);
    
    // In a real app, this would trigger the actual alarm system
    console.log(`[EMERGENCY] ${selectedAlarm} alarm activated!`);
  };

  const stopAlarm = () => {
    setIsAlarmActive(false);
    setSelectedAlarm(null);
    // Stop alarm sound
    console.log("[EMERGENCY] Alarm deactivated");
  };

  return (
    <>
      <Card className={cn(
        "transition-all",
        isAlarmActive ? "alarm-pulse border-harmony-alert bg-harmony-alert/5" : ""
      )}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Timer className={cn(
              "h-5 w-5",
              isAlarmActive ? "text-harmony-alert" : "text-harmony-secondary"
            )} />
            <CardTitle className={isAlarmActive ? "text-harmony-alert" : ""}>
              Emergency Alerts
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {isAlarmActive ? (
            <div className="text-center py-6">
              <AlertTriangle className="h-16 w-16 text-harmony-alert mx-auto mb-4" />
              <h3 className="text-xl font-bold text-harmony-alert mb-1">
                Emergency Alert Active
              </h3>
              <p className="text-gray-600 mb-6">
                {emergencyTypes.find(e => e.id === selectedAlarm)?.name} protocol is now in effect
              </p>
              <Button 
                variant="destructive" 
                size="lg"
                onClick={stopAlarm}
                className="bg-harmony-alert hover:bg-harmony-alert/90"
              >
                Stop Emergency Alarm
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-4">
                Activate emergency protocols only in genuine emergency situations.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {emergencyTypes.map((emergency) => (
                  <Button
                    key={emergency.id}
                    variant="outline"
                    onClick={() => triggerAlarm(emergency.id)}
                    className="h-16 border-gray-200"
                  >
                    <div className="flex flex-col items-center">
                      <span className="text-xl mb-1">{emergency.icon}</span>
                      <span>{emergency.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        {!isAlarmActive && (
          <>
            <Separator />
            <CardFooter className="text-xs text-muted-foreground py-3">
              Emergency alarms will override all other scheduled sounds.
            </CardFooter>
          </>
        )}
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Emergency Alarm</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to activate the {emergencyTypes.find(e => e.id === selectedAlarm)?.name} alarm.
              This will trigger school-wide emergency protocols.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAlarm} className="bg-harmony-alert">
              Activate Alarm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
