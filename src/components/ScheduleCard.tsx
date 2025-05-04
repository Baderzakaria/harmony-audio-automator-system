
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AudioSchedule, daysOfWeek } from "@/utils/audioUtils";
import { AlarmClock, Bell, Check, Music, Pencil, Timer, Volume2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ScheduleCardProps {
  schedule: AudioSchedule;
  onToggle: (id: string, isActive: boolean) => void;
  onEdit: (schedule: AudioSchedule) => void;
  onDelete: (id: string) => void;
}

export function ScheduleCard({ schedule, onToggle, onEdit, onDelete }: ScheduleCardProps) {
  // State for editing button labels
  const [isEditingDelete, setIsEditingDelete] = useState(false);
  const [isEditingEdit, setIsEditingEdit] = useState(false);
  const [deleteButtonText, setDeleteButtonText] = useState("Delete");
  const [editButtonText, setEditButtonText] = useState("Edit");
  
  // Get icon based on sound type
  const renderIcon = () => {
    switch (schedule.soundType) {
      case "bell":
        return <Bell className="h-5 w-5" />;
      case "music":
        return <Music className="h-5 w-5" />;
      case "voice":
        return <Volume2 className="h-5 w-5" />;
      case "alarm":
        return <Timer className="h-5 w-5" />;
      default:
        return <AlarmClock className="h-5 w-5" />;
    }
  };

  // Handle toggle switch change
  const handleToggleChange = (checked: boolean) => {
    onToggle(schedule.id, checked);
  };
  
  // Button edit handlers
  const handleEditDeleteButton = () => {
    setIsEditingDelete(true);
  };
  
  const handleEditEditButton = () => {
    setIsEditingEdit(true);
  };
  
  const saveDeleteButtonText = () => {
    setIsEditingDelete(false);
  };
  
  const saveEditButtonText = () => {
    setIsEditingEdit(false);
  };
  
  const cancelEditDelete = () => {
    setIsEditingDelete(false);
  };
  
  const cancelEditEdit = () => {
    setIsEditingEdit(false);
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      schedule.isActive ? "border-l-4 border-l-harmony-secondary" : "border-l-4 border-l-gray-200 opacity-80"
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-1.5 rounded-full",
              schedule.isActive ? "bg-harmony-secondary/10 text-harmony-secondary" : "bg-gray-100 text-gray-500"
            )}>
              {renderIcon()}
            </div>
            <CardTitle className="text-lg">{schedule.name}</CardTitle>
          </div>
          <Switch 
            checked={schedule.isActive}
            onCheckedChange={handleToggleChange}
          />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-muted-foreground">Time</div>
            <div className="font-medium">{schedule.timeString}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Duration</div>
            <div className="font-medium">{schedule.duration} seconds</div>
          </div>
          <div>
            <div className="text-muted-foreground">Sound</div>
            <div className="font-medium capitalize">{schedule.soundType}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Repetition</div>
            <div className="font-medium">{schedule.repetitions}×</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-muted-foreground text-xs mb-1.5">Days Active</div>
          <div className="flex flex-wrap gap-1.5">
            {daysOfWeek.map((day) => (
              <Badge 
                key={day} 
                variant={schedule.daysActive.includes(day) ? "default" : "outline"}
                className={cn(
                  "text-xs px-2 py-0.5",
                  schedule.daysActive.includes(day) 
                    ? "bg-harmony-secondary hover:bg-harmony-secondary/90" 
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                )}
              >
                {day.substring(0, 3)}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-end gap-2">
        {isEditingDelete ? (
          <div className="flex items-center gap-1">
            <Input
              value={deleteButtonText}
              onChange={(e) => setDeleteButtonText(e.target.value)}
              className="h-9 text-sm w-24"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={saveDeleteButtonText}
              className="p-1"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={cancelEditDelete}
              className="p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(schedule.id)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 group relative"
          >
            {deleteButtonText}
            <Pencil 
              className="h-3 w-3 opacity-0 group-hover:opacity-100 absolute -top-1 -right-1 bg-white rounded-full p-0.5 text-harmony-secondary"
              onClick={(e) => {
                e.stopPropagation();
                handleEditDeleteButton();
              }}
            />
          </Button>
        )}
        
        {isEditingEdit ? (
          <div className="flex items-center gap-1">
            <Input
              value={editButtonText}
              onChange={(e) => setEditButtonText(e.target.value)}
              className="h-9 text-sm w-24"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={saveEditButtonText}
              className="p-1"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={cancelEditEdit}
              className="p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(schedule)}
            className="text-harmony-secondary hover:text-harmony-secondary hover:bg-harmony-light group relative"
          >
            {editButtonText}
            <Pencil 
              className="h-3 w-3 opacity-0 group-hover:opacity-100 absolute -top-1 -right-1 bg-white rounded-full p-0.5 text-harmony-secondary"
              onClick={(e) => {
                e.stopPropagation();
                handleEditEditButton();
              }}
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
