
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { SoundLibrary } from "@/components/SoundLibrary";
import { sampleSounds, SoundType } from "@/utils/audioUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Music, Volume2, Timer, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Library = () => {
  const [activeTab, setActiveTab] = useState<SoundType>("bell");
  const { toast } = useToast();

  const handleAddSound = () => {
    toast({
      title: "Add Sound",
      description: "Sound upload functionality would be implemented here in the full application.",
    });
  };

  const handlePlaySound = (soundId: string) => {
    toast({
      title: "Playing Sound",
      description: `Playing sound: ${soundId}`,
    });
  };

  const handleDeleteSound = (soundId: string) => {
    toast({
      title: "Delete Sound",
      description: `Sound ${soundId} would be deleted in the full application.`,
    });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight mb-1">Sound Library</h1>
        <p className="text-muted-foreground">
          Manage and organize all your sound files
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="bell" className="w-full" onValueChange={(value) => setActiveTab(value as SoundType)}>
          <TabsList className="grid sm:grid-cols-4 grid-cols-2 mb-6">
            <TabsTrigger value="bell" className="flex gap-2 items-center">
              <Bell className="h-4 w-4" /> Bells
            </TabsTrigger>
            <TabsTrigger value="music" className="flex gap-2 items-center">
              <Music className="h-4 w-4" /> Music
            </TabsTrigger>
            <TabsTrigger value="voice" className="flex gap-2 items-center">
              <Volume2 className="h-4 w-4" /> Voice
            </TabsTrigger>
            <TabsTrigger value="alarm" className="flex gap-2 items-center">
              <Timer className="h-4 w-4" /> Alarms
            </TabsTrigger>
          </TabsList>

          <div className="flex justify-end mb-4">
            <Button 
              onClick={handleAddSound} 
              className="bg-harmony-secondary hover:bg-harmony-secondary/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Sound
            </Button>
          </div>
          
          <TabsContent value="bell">
            <SoundLibrary 
              sounds={sampleSounds.bell} 
              onPlay={handlePlaySound} 
              onDelete={handleDeleteSound} 
            />
          </TabsContent>
          <TabsContent value="music">
            <SoundLibrary 
              sounds={sampleSounds.music} 
              onPlay={handlePlaySound} 
              onDelete={handleDeleteSound} 
            />
          </TabsContent>
          <TabsContent value="voice">
            <SoundLibrary 
              sounds={sampleSounds.voice} 
              onPlay={handlePlaySound} 
              onDelete={handleDeleteSound} 
            />
          </TabsContent>
          <TabsContent value="alarm">
            <SoundLibrary 
              sounds={sampleSounds.alarm} 
              onPlay={handlePlaySound} 
              onDelete={handleDeleteSound} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Library;
