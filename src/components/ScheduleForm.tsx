import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AudioSchedule, SoundType, daysOfWeek, sampleSounds } from "@/utils/audioUtils";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Music, Timer, Volume2 } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  timeString: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Time must be in format HH:MM" }),
  soundType: z.enum(["bell", "music", "voice", "alarm"]),
  soundSource: z.string(),
  duration: z.coerce.number().min(1).max(300),
  daysActive: z.array(z.string()).min(1, { message: "Select at least one day" }),
  repetitions: z.coerce.number().min(1).max(10),
});

type FormValues = z.infer<typeof formSchema>;

interface ScheduleFormProps {
  onSubmit: (schedule: AudioSchedule) => void;
  initialData?: AudioSchedule;
}

export function ScheduleForm({ onSubmit, initialData }: ScheduleFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      timeString: "",
      soundType: "bell" as SoundType,
      soundSource: "",
      duration: 5,
      daysActive: [],
      repetitions: 1,
    },
  });
  
  const soundType = form.watch("soundType") as SoundType;
  const availableSounds = sampleSounds[soundType] || [];

  const handleSubmit = (values: FormValues) => {
    const newSchedule: AudioSchedule = {
      id: initialData?.id || uuidv4(),
      name: values.name,
      timeString: values.timeString,
      soundType: values.soundType as SoundType,
      soundSource: values.soundSource,
      duration: values.duration,
      daysActive: values.daysActive,
      repetitions: values.repetitions,
      isActive: initialData?.isActive || true,
    };

    onSubmit(newSchedule);
  };

  return (
    <div className="p-0 sm:p-2">
      <DialogHeader className="mb-4">
        <DialogTitle>{initialData ? "Edit Schedule" : "Add New Schedule"}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Morning Bell" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeString"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time (24-hour format)</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="soundType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sound Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sound type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="bell">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <span>Bell</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="music">
                        <div className="flex items-center gap-2">
                          <Music className="h-4 w-4" />
                          <span>Music</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="voice">
                        <div className="flex items-center gap-2">
                          <Volume2 className="h-4 w-4" />
                          <span>Voice</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="alarm">
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4" />
                          <span>Alarm</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="soundSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sound</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sound" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableSounds.map(sound => (
                        <SelectItem key={sound.id} value={sound.id}>
                          {sound.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (seconds)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repetitions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repetitions</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="daysActive"
            render={() => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel>Days Active</FormLabel>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {daysOfWeek.map((day) => (
                    <FormField
                      key={day}
                      control={form.control}
                      name="daysActive"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={day}
                            className="flex flex-row items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(day)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, day])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== day
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {day}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="submit">
              {initialData ? "Update Schedule" : "Add Schedule"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
