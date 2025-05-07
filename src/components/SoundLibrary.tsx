
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { playAudio, AudioPlayer } from "@/utils/audioUtils";

interface SoundItem {
  id: string;
  name: string;
  path: string;
}

interface SoundLibraryProps {
  sounds: SoundItem[];
  onPlay: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SoundLibrary({ sounds, onPlay, onDelete }: SoundLibraryProps) {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [audioPlayers, setAudioPlayers] = useState<Record<string, AudioPlayer>>({});
  
  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      Object.values(audioPlayers).forEach(player => player.stop());
    };
  }, [audioPlayers]);
  
  const handlePlay = (id: string) => {
    if (playingSound === id) {
      // Stop current sound
      if (audioPlayers[id]) {
        audioPlayers[id].stop();
      }
      setPlayingSound(null);
    } else {
      // Stop previous sound if any
      if (playingSound && audioPlayers[playingSound]) {
        audioPlayers[playingSound].stop();
      }
      
      // Play new sound
      const player = playAudio(id);
      player.play();
      
      // Update state
      setPlayingSound(id);
      setAudioPlayers(prev => ({ ...prev, [id]: player }));
      onPlay(id);
      
      // For demo purposes, auto-stop after 3 seconds
      setTimeout(() => {
        if (player) player.stop();
        setPlayingSound(null);
      }, 3000);
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
            <CardFooter className="flex justify-between pt-2">
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
