
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { ScheduleCard } from "@/components/ScheduleCard";
import { ScheduleForm } from "@/components/ScheduleForm";
import { AudioSchedule, sampleSchedules } from "@/utils/audioUtils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Schedules = () => {
  const [schedules, setSchedules] = useState<AudioSchedule[]>(sampleSchedules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<AudioSchedule | null>(null);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);
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
    setCurrentSchedule(schedule);
    setIsEditDialogOpen(true);
  };
  
  const handleUpdateSchedule = (updatedSchedule: AudioSchedule) => {
    setSchedules(currentSchedules =>
      currentSchedules.map(schedule =>
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      )
    );
    setIsEditDialogOpen(false);
    
    toast({
      title: "Schedule Updated",
      description: "The schedule has been updated successfully.",
    });
  };
  
  const confirmDeleteSchedule = (id: string) => {
    setScheduleToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteSchedule = () => {
    if (scheduleToDelete) {
      setSchedules(currentSchedules => 
        currentSchedules.filter(schedule => schedule.id !== scheduleToDelete)
      );
      
      toast({
        title: "Schedule Deleted",
        description: "The schedule has been deleted successfully.",
        variant: "destructive",
      });
      
      setIsDeleteDialogOpen(false);
      setScheduleToDelete(null);
    }
  };

  const handleAddSchedule = (newSchedule: AudioSchedule) => {
    setSchedules(currentSchedules => [...currentSchedules, newSchedule]);
    setIsDialogOpen(false);
    
    toast({
      title: "Schedule Added",
      description: "The new schedule has been added successfully.",
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Sound Schedules</h1>
        <p className="text-muted-foreground">
          Manage all audio schedules and notifications
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">All Schedules</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-harmony-secondary hover:bg-harmony-secondary/90">
              <Plus className="mr-2 h-4 w-4" /> Add New Schedule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
            <ScheduleForm onSubmit={handleAddSchedule} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {schedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            schedule={schedule}
            onToggle={handleToggleSchedule}
            onEdit={handleEditSchedule}
            onDelete={confirmDeleteSchedule}
          />
        ))}
      </div>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
          {currentSchedule && (
            <ScheduleForm 
              onSubmit={handleUpdateSchedule} 
              initialData={currentSchedule} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected schedule.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteSchedule}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Schedules;
