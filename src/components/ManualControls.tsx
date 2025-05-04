
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Play, Square } from "lucide-react";
import { playAudio } from "@/utils/audioUtils";
import { cn } from "@/lib/utils";

export function ManualControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const sounds = [
    { id: "bell-1", name: "Standard Bell", type: "bell" },
    { id: "bell-2", name: "School Bell", type: "bell" },
    { id: "bell-3", name: "Soft Chime", type: "bell" },
    { id: "voice-1", name: "Class Change", type: "voice" },
    { id: "voice-2", name: "Assembly", type: "voice" },
  ];

  const handlePlay = (soundId: string) => {
    // If already playing, stop first
    if (isPlaying) {
      setIsPlaying(false);
      setActiveSound(null);
      // In a real app we'd stop the actual audio
      return;
    }

    // Play the selected sound
    setIsPlaying(true);
    setActiveSound(soundId);
    playAudio(soundId);
    
    // Auto stop after 3 seconds for demo
    setTimeout(() => {
      setIsPlaying(false);
      setActiveSound(null);
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-harmony-secondary" />
          <CardTitle>Manual Bell Controls</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sounds.map((sound) => (
            <Button
              key={sound.id}
              variant="outline"
              className={cn(
                "flex justify-between items-center h-12",
                activeSound === sound.id && isPlaying
                  ? "bg-harmony-light border-harmony-secondary"
                  : ""
              )}
              onClick={() => handlePlay(sound.id)}
            >
              <span>{sound.name}</span>
              {activeSound === sound.id && isPlaying ? (
                <div className="playing-wave text-harmony-secondary">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
