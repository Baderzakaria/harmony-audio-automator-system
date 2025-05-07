
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Play, Pause } from "lucide-react";
import { playAudio, AudioPlayer } from "@/utils/audioUtils";
import { cn } from "@/lib/utils";

export function ManualControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<AudioPlayer | null>(null);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (currentPlayer) {
        currentPlayer.stop();
      }
    };
  }, [currentPlayer]);

  const sounds = [
    { id: "bell-1", name: "Standard Bell", type: "bell" },
    { id: "bell-2", name: "School Bell", type: "bell" },
    { id: "bell-3", name: "Soft Chime", type: "bell" },
    { id: "voice-1", name: "Class Change", type: "voice" },
    { id: "voice-2", name: "Assembly", type: "voice" },
  ];

  const handlePlay = (soundId: string) => {
    // If already playing this sound, stop it
    if (isPlaying && activeSound === soundId) {
      if (currentPlayer) {
        currentPlayer.stop();
      }
      setIsPlaying(false);
      setActiveSound(null);
      setCurrentPlayer(null);
      return;
    }

    // If playing a different sound, stop the current one
    if (isPlaying && currentPlayer) {
      currentPlayer.stop();
    }

    // Play the selected sound
    const player = playAudio(soundId);
    player.play();
    
    setIsPlaying(true);
    setActiveSound(soundId);
    setCurrentPlayer(player);
    
    // Auto stop after 3 seconds for demo
    setTimeout(() => {
      if (player) {
        player.stop();
      }
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
