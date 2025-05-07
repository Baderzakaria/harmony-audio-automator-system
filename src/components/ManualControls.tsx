import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BellRing, Play, Pause } from "lucide-react";
import { playAudio, AudioPlayer } from "@/utils/audioUtils";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

/** =========================
 *  ManualControls Component
 *  ========================= */
export function ManualControls() {
  /* ---------- State & refs ---------- */
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<AudioPlayer | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const isPlaying = activeSound !== null; // derived flag

  /* ---------- Sound list (stable) ---------- */
  const sounds = useMemo(
    () => [
      { id: "bell-1", name: "Standard Bell", type: "bell" },
      { id: "bell-2", name: "School Bell", type: "bell" },
      { id: "bell-3", name: "Soft Chime", type: "bell" },
      { id: "voice-1", name: "Class Change", type: "voice" },
      { id: "voice-2", name: "Assembly", type: "voice" },
      { id: "alarm-1", name: "Fire Alarm", type: "alarm" },
    ],
    []
  );

  /* ---------- Helpers ---------- */
  const stopAll = useCallback(() => {
    currentPlayer?.stop();
    setCurrentPlayer(null);
    setActiveSound(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [currentPlayer]);

  /* ---------- Play / toggle ---------- */
  const handlePlay = useCallback(
    (soundId: string) => {
      // Toggle stop if the same sound is already playing
      if (activeSound === soundId) {
        stopAll();
        toast({
          title: "Sound Stopped",
          description:
            sounds.find((s) => s.id === soundId)?.name ?? "Sound stopped",
        });
        return;
      }

      // Stop whatever was playing
      stopAll();

      // Play the new sound
      const player = playAudio(soundId);
      player.play();
      setCurrentPlayer(player);
      setActiveSound(soundId);

      toast({
        title: "Sound Playing",
        description: `Playing ${
          sounds.find((s) => s.id === soundId)?.name ?? "sound"
        }`,
      });

      // Auto-stop after a demo duration
      const duration = soundId.startsWith("alarm") ? 5000 : 3000;
      timeoutRef.current = setTimeout(() => {
        stopAll();
        toast({
          title: "Sound Ended",
          description: `${
            sounds.find((s) => s.id === soundId)?.name ?? "Sound"
          } finished.`,
        });
      }, duration);
    },
    [activeSound, sounds, stopAll, toast]
  );

  /* ---------- Clean up on unmount ---------- */
  useEffect(() => stopAll, [stopAll]);

  /* ---------- UI ---------- */
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
          {sounds.map((sound) => {
            const isActive = activeSound === sound.id;
            return (
              <Button
                key={sound.id}
                aria-label={`Play ${sound.name}`}
                variant="outline"
                className={cn(
                  "flex justify-between items-center h-12",
                  isActive && "bg-harmony-light border-harmony-secondary"
                )}
                onClick={() => handlePlay(sound.id)}
              >
                <span>{sound.name}</span>
                {isActive ? (
                  /* Icône Pause quand ça joue */
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
