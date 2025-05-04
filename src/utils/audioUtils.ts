
// Audio types and utilities for the Harmony Audio System

export type SoundType = 'bell' | 'chime' | 'music' | 'voice' | 'alarm';

export interface AudioSchedule {
  id: string;
  name: string;
  timeString: string; // Format: "HH:MM"
  soundType: SoundType;
  soundSource: string;
  duration: number; // in seconds
  daysActive: string[]; // ["Monday", "Tuesday", etc.]
  repetitions: number;
  isActive: boolean;
}

export interface AudioPlayer {
  play: () => void;
  stop: () => void;
  isPlaying: boolean;
}

const audioElements: Record<string, HTMLAudioElement> = {};

// Sample sounds for demonstration
export const sampleSounds = {
  bell: [
    { id: 'bell-1', name: 'Standard Bell', path: '/sounds/bell-1.mp3' },
    { id: 'bell-2', name: 'School Bell', path: '/sounds/bell-2.mp3' },
    { id: 'bell-3', name: 'Soft Chime', path: '/sounds/bell-3.mp3' },
  ],
  music: [
    { id: 'music-1', name: 'Ambient 1', path: '/sounds/ambient-1.mp3' },
    { id: 'music-2', name: 'Classical', path: '/sounds/classical.mp3' },
    { id: 'music-3', name: 'Focus', path: '/sounds/focus.mp3' },
  ],
  voice: [
    { id: 'voice-1', name: 'Class Change', path: '/sounds/voice-class-change.mp3' },
    { id: 'voice-2', name: 'Assembly', path: '/sounds/voice-assembly.mp3' },
  ],
  alarm: [
    { id: 'alarm-1', name: 'Fire Alarm', path: '/sounds/alarm-fire.mp3' },
    { id: 'alarm-2', name: 'Emergency', path: '/sounds/alarm-emergency.mp3' },
  ]
};

// For demo purposes, we'll simulate audio
export function playAudio(soundSource: string, volume = 1): AudioPlayer {
  // Check if we already have this audio element
  if (!audioElements[soundSource]) {
    // In a real app, we'd load the actual audio file
    // For now we'll create an Audio element but not set a real source
    audioElements[soundSource] = new Audio();
    console.log(`[AUDIO] Created new audio element for: ${soundSource}`);
  }
  
  const audio = audioElements[soundSource];
  
  // Set volume
  audio.volume = volume;
  
  // For demo purposes, we'll just log instead of actually playing
  console.log(`[AUDIO] Playing sound: ${soundSource} at volume ${volume}`);
  
  let isPlaying = true;
  
  // Simulate playing
  const playPromise = new Promise((resolve) => {
    setTimeout(resolve, 2000); // Simulate 2 second audio
  });
  
  return {
    play: () => {
      isPlaying = true;
      console.log(`[AUDIO] Playing ${soundSource}`);
    },
    stop: () => {
      isPlaying = false;
      console.log(`[AUDIO] Stopped ${soundSource}`);
    },
    isPlaying
  };
}

export function getFormattedTime(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Sample schedules for demonstration
export const sampleSchedules: AudioSchedule[] = [
  {
    id: "1",
    name: "Morning Bell",
    timeString: "08:00",
    soundType: "bell",
    soundSource: "bell-1",
    duration: 5,
    daysActive: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    repetitions: 1,
    isActive: true
  },
  {
    id: "2",
    name: "Lunch Break",
    timeString: "12:30",
    soundType: "bell",
    soundSource: "bell-2",
    duration: 8,
    daysActive: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    repetitions: 2,
    isActive: true
  },
  {
    id: "3",
    name: "Dismissal",
    timeString: "15:30",
    soundType: "bell",
    soundSource: "bell-3",
    duration: 10,
    daysActive: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    repetitions: 3,
    isActive: true
  },
  {
    id: "4",
    name: "Assembly Announcement",
    timeString: "09:45",
    soundType: "voice",
    soundSource: "voice-2",
    duration: 15,
    daysActive: ["Monday"],
    repetitions: 1,
    isActive: false
  }
];
