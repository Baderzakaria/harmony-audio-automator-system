// Audio types and utilities for the Harmony Audio System

import { Howl } from 'howler';
import * as Tone from 'tone';

export type SoundType = 'bell' | 'music' | 'voice' | 'alarm';

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

// Initialize Howler for bell and alarm sounds
const bellSounds = {
  'bell-1': new Howl({ src: ['/sounds/bell-1.mp3'] }),
  'bell-2': new Howl({ src: ['/sounds/bell-2.mp3'] }),
  'bell-3': new Howl({ src: ['/sounds/bell-3.mp3'] }),
  'bell-4': new Howl({ src: ['/sounds/bell-4.mp3'] }),
  'bell-5': new Howl({ src: ['/sounds/bell-5.mp3'] }),
};

const alarmSounds = {
  'alarm-1': new Howl({ src: ['/sounds/alarm-fire.mp3'] }),
  'alarm-2': new Howl({ src: ['/sounds/alarm-emergency.mp3'] }),
  'alarm-3': new Howl({ src: ['/sounds/alarm-evacuation.mp3'] }),
  'alarm-4': new Howl({ src: ['/sounds/alarm-earthquake.mp3'] }),
};

// Initialize Tone.js for music
const musicPlayers = {
  'music-1': new Tone.Player('/sounds/ambient-1.mp3').toDestination(),
  'music-2': new Tone.Player('/sounds/classical.mp3').toDestination(),
  'music-3': new Tone.Player('/sounds/focus.mp3').toDestination(),
  'music-4': new Tone.Player('/sounds/relaxing.mp3').toDestination(),
  'music-5': new Tone.Player('/sounds/nasheed.mp3').toDestination(),
  'music-6': new Tone.Player('/sounds/quran.mp3').toDestination(),
};

// Voice notifications using Web Speech API
const voiceMessages = {
  'voice-1': "Class change",
  'voice-2': "Assembly time",
  'voice-3': "Break time",
  'voice-4': "Prayer time",
  'voice-5': "Daily hadith",
  'voice-6': "Daily wisdom",
};

// Sample sounds for demonstration
export const sampleSounds = {
  bell: [
    { id: 'bell-1', name: 'Standard Bell', path: '/sounds/bell-1.mp3' },
    { id: 'bell-2', name: 'School Bell', path: '/sounds/bell-2.mp3' },
    { id: 'bell-3', name: 'Soft Chime', path: '/sounds/bell-3.mp3' },
    { id: 'bell-4', name: 'Double Ring', path: '/sounds/bell-4.mp3' },
    { id: 'bell-5', name: 'Long Bell', path: '/sounds/bell-5.mp3' },
  ],
  music: [
    { id: 'music-1', name: 'Ambient 1', path: '/sounds/ambient-1.mp3' },
    { id: 'music-2', name: 'Classical', path: '/sounds/classical.mp3' },
    { id: 'music-3', name: 'Focus', path: '/sounds/focus.mp3' },
    { id: 'music-4', name: 'Relaxing', path: '/sounds/relaxing.mp3' },
    { id: 'music-5', name: 'Islamic Nasheed', path: '/sounds/nasheed.mp3' },
    { id: 'music-6', name: 'Quran Recitation', path: '/sounds/quran.mp3' },
  ],
  voice: [
    { id: 'voice-1', name: 'Class Change', path: '/sounds/voice-class-change.mp3' },
    { id: 'voice-2', name: 'Assembly', path: '/sounds/voice-assembly.mp3' },
    { id: 'voice-3', name: 'Break Time', path: '/sounds/voice-break.mp3' },
    { id: 'voice-4', name: 'Prayer Time', path: '/sounds/voice-prayer.mp3' },
    { id: 'voice-5', name: 'Daily Hadith', path: '/sounds/voice-hadith.mp3' },
    { id: 'voice-6', name: 'Daily Wisdom', path: '/sounds/voice-wisdom.mp3' },
  ],
  alarm: [
    { id: 'alarm-1', name: 'Fire Alarm', path: '/sounds/alarm-fire.mp3' },
    { id: 'alarm-2', name: 'Emergency', path: '/sounds/alarm-emergency.mp3' },
    { id: 'alarm-3', name: 'Evacuation', path: '/sounds/alarm-evacuation.mp3' },
    { id: 'alarm-4', name: 'Earthquake', path: '/sounds/alarm-earthquake.mp3' },
  ]
};

export function playAudio(soundSource: string, volume = 1): AudioPlayer {
  let isPlaying = false;
  
  const play = () => {
    // Determine sound type from the source
    if (soundSource.startsWith('bell-') || soundSource.startsWith('alarm-')) {
      const sound = bellSounds[soundSource] || alarmSounds[soundSource];
      if (sound) {
        sound.volume(volume);
        sound.play();
        isPlaying = true;
      }
    } else if (soundSource.startsWith('music-')) {
      const player = musicPlayers[soundSource];
      if (player) {
        Tone.start();
        player.volume.value = volume * 100;
        player.start();
        isPlaying = true;
      }
    } else if (soundSource.startsWith('voice-')) {
      const message = voiceMessages[soundSource];
      if (message) {
        const speech = new SpeechSynthesisUtterance(message);
        speech.volume = volume;
        window.speechSynthesis.speak(speech);
        isPlaying = true;
      }
    }
  };

  const stop = () => {
    if (soundSource.startsWith('bell-') || soundSource.startsWith('alarm-')) {
      const sound = bellSounds[soundSource] || alarmSounds[soundSource];
      if (sound) {
        sound.stop();
      }
    } else if (soundSource.startsWith('music-')) {
      const player = musicPlayers[soundSource];
      if (player) {
        player.stop();
      }
    } else if (soundSource.startsWith('voice-')) {
      window.speechSynthesis.cancel();
    }
    isPlaying = false;
  };

  return {
    play,
    stop,
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
  },
  {
    id: "5",
    name: "Prayer Time",
    timeString: "13:15",
    soundType: "voice",
    soundSource: "voice-4",
    duration: 10,
    daysActive: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    repetitions: 1,
    isActive: true
  },
  {
    id: "6",
    name: "Daily Hadith",
    timeString: "09:00",
    soundType: "voice",
    soundSource: "voice-5",
    duration: 30,
    daysActive: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    repetitions: 1,
    isActive: true
  },
  {
    id: "7",
    name: "Ambient Music",
    timeString: "10:30",
    soundType: "music",
    soundSource: "music-1",
    duration: 300,
    daysActive: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    repetitions: 1,
    isActive: false
  }
];
