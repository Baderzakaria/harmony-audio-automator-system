
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { CurrentTime } from "@/components/CurrentTime";
import { UpcomingSchedules } from "@/components/UpcomingSchedules";
import { ScheduleCard } from "@/components/ScheduleCard";
import { ManualControls } from "@/components/ManualControls";
import { EmergencyAlarm } from "@/components/EmergencyAlarm";
import { AudioSchedule, sampleSchedules } from "@/utils/audioUtils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [schedules, setSchedules] = useState<AudioSchedule[]>(sampleSchedules);
  const { toast } = useToast();

  const handleToggleSchedule = (id: string, isActive: boolean) => {
    setSchedules(currentSchedules =>
      currentSchedules.map(schedule =>
        schedule.id === id ? { ...schedule, isActive } : schedule
      )
    );
    
    toast({
      title: isActive ? "Schedule Activated" : "Schedule Deactivated",
      description: `The schedule has been ${isActive ? "activated" : "deactivated"} successfully.`,
      variant: isActive ? "default" : "destructive",
    });
  };
  
  const handleEditSchedule = (schedule: AudioSchedule) => {
    // In a real app, this would open an edit form
    console.log("Edit schedule:", schedule);
    toast({
      title: "Edit Schedule",
      description: "Schedule editing would open here in the full application.",
    });
  };
  
  const handleDeleteSchedule = (id: string) => {
    // In a real app, this would confirm deletion
    setSchedules(currentSchedules => 
      currentSchedules.filter(schedule => schedule.id !== id)
    );
    
    toast({
      title: "Schedule Deleted",
      description: "The schedule has been deleted successfully.",
      variant: "destructive",
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Audio System Dashboard V1</h1>
        <p className="text-muted-foreground">
          Manage all your automated audio schedules and manual controls
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <CurrentTime />
        </div>
        <div className="md:col-span-2">
          <UpcomingSchedules schedules={schedules} />
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Scheduled Sounds</h2>
        <Button className="bg-harmony-secondary hover:bg-harmony-secondary/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Schedule
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {schedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onToggle={handleToggleSchedule}
            onEdit={handleEditSchedule}
            onDelete={handleDeleteSchedule}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ManualControls />
        <EmergencyAlarm />
      </div>
    </Layout>
  );
};

export default Index;
