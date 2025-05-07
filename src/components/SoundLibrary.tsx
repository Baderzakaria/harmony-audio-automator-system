import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { playAudio } from "@/utils/audioUtils";
import { useToast } from "@/hooks/use-toast";

interface SoundItem {
  id: string;
  name: string;
  path: string;
}

interface SoundLibraryProps {
  sounds: SoundItem[];
  onDelete: (id: string) => void;
}

export function SoundLibrary({ sounds, onDelete }: SoundLibraryProps) {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an audio file",
        variant: "destructive"
      });
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        const newId = `custom-${Date.now()}`;
        localSoundStorage.setSound(newId, base64);
        
        sounds[newId] = new Howl({
          src: [base64],
          format: file.type.split('/')[1]
        });

        toast({
          title: "Sound Uploaded",
          description: "New sound added to library",
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload sound file",
        variant: "destructive"
      });
    }
  };
  
  useEffect(() => {
    return () => {
      if (audioPlayer) {
        audioPlayer.stop();
      }
    };
  }, [audioPlayer]);

        <div className="flex justify-between items-center mb-4">
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
            id="sound-upload"
          />
          <label
            htmlFor="sound-upload"
            className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-harmony-secondary text-white hover:bg-harmony-secondary/90 h-10 px-4 py-2"
          >
            <Plus className="mr-2 h-4 w-4" /> Upload Sound
          </label>
        </div>

  
  const handlePlay = (id: string) => {
    if (playingSound === id) {
      if (audioPlayer) {
        audioPlayer.stop();
      }
      setPlayingSound(null);
      setAudioPlayer(null);
    } else {
      if (audioPlayer) {
        audioPlayer.stop();
      }
      const player = playAudio(id);
      player.play();
      setPlayingSound(id);
      setAudioPlayer(player);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sounds.length > 0 ? (
        sounds.map((sound) => (
          <Card key={sound.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Music className="h-4 w-4 text-harmony-secondary" />
                {sound.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow pb-2">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                {playingSound === sound.id && (
                  <div 
                    className="h-full bg-harmony-secondary animate-pulse" 
                    style={{ width: '100%' }}
                  ></div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "gap-1",
                  playingSound === sound.id && "bg-harmony-light text-harmony-secondary border-harmony-secondary"
                )}
                onClick={() => handlePlay(sound.id)}
              >
                {playingSound === sound.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {playingSound === sound.id ? "Stop" : "Play"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-harmony-alert hover:bg-red-50"
                onClick={() => onDelete(sound.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <Music className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-gray-600">No sounds available</h3>
          <p className="text-gray-400">Upload sounds to your library</p>
        </div>
      )}
    </div>
  );
}
