'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Sparkles, Heart, Moon as MoonIcon, Star } from 'lucide-react';
import SecretAccessModal from '../secret/SecretAccessModal';
import { sound } from '@/lib/sound';

interface CountdownWorldProps {
  targetIso: string;
  onUnlocked: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function CountdownWorld({ targetIso, onUnlocked }: CountdownWorldProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  const [secretClicks, setSecretClicks] = useState(0);
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);

  // Calculate time remaining to 7 Nov 2026 00:00:00 Asia/Kolkata
  useEffect(() => {
    function calculate() {
      const target = new Date(targetIso).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        onUnlocked();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetIso, onUnlocked]);

  // Secret trigger handler
  const handleSecretClick = () => {
    sound.playChime(1200 + secretClicks * 200, 0.4);
    const newCount = secretClicks + 1;
    setSecretClicks(newCount);

    if (newCount >= 3) {
      sound.playSecretMystery();
      setIsSecretModalOpen(true);
      setSecretClicks(0);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12 text-center overflow-x-hidden">
      {/* Secret Star Trigger: Subtle floating star in top corner with 44px touch area */}
      <button
        onClick={handleSecretClick}
        aria-label="A tiny glowing star"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-purple-400/50 hover:text-amber-300 transition-all duration-500 hover:scale-125 focus:outline-none cursor-pointer group z-30"
        title="✨"
      >
        <Star className="w-5 h-5 group-hover:rotate-45 transition-transform" />
        <span className="sr-only">Secret Portal</span>
      </button>

      {/* Romantic Moon with subtle lunar glow */}
      <div className="relative mb-6 sm:mb-8">
        <div className="absolute -inset-8 bg-gradient-to-r from-amber-300/20 via-rose-500/20 to-purple-600/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-rose-200 shadow-[0_0_60px_rgba(251,191,36,0.35)] flex items-center justify-center border border-amber-200/50">
          <MoonIcon className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 text-purple-950/40 fill-purple-900/20 transform -rotate-12" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/40 via-transparent to-black/20" />
        </div>
      </div>

      {/* Main Fairytale Poetry and Messages */}
      <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-rose-300 text-xs sm:text-sm font-medium tracking-wide shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span className="truncate">Someone very special is about to enter her universe...</span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-purple-100 to-amber-200 drop-shadow-md leading-tight">
          Princess Shree, your special day is approaching.
        </h1>

        <p className="text-sm sm:text-lg md:text-xl text-rose-200/90 font-sans italic max-w-xl mx-auto px-2">
          &ldquo;Thoda sa patience, princess... your surprise is getting ready. ❤️&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-purple-300/70 font-sans max-w-lg mx-auto pt-1 px-2">
          Dear Shree, your little universe is being prepared with endless love. Every second brings you closer to something made just for you.
        </p>
      </div>

      {/* Live Glowing Countdown */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-xl w-full mb-8 sm:mb-10 px-1">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#1c122e]/80 to-[#0e0919]/90 border border-purple-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-sm group hover:border-rose-500/50 transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-rose-200 to-purple-300 drop-shadow">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] md:text-xs uppercase tracking-widest text-purple-300/70 mt-1 font-semibold">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mysterious Locked Gift Box */}
      <div className="relative group cursor-pointer max-w-sm mx-auto p-4 sm:p-5 rounded-2xl bg-[#130b20]/60 border border-purple-500/20 backdrop-blur-sm hover:border-rose-500/40 transition-all duration-500">
        <div className="flex items-center justify-center gap-3 mb-2 text-rose-300">
          <div className="p-2 sm:p-2.5 rounded-full bg-purple-900/50 border border-purple-400/30">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 animate-pulse" />
          </div>
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500/30" />
        </div>
        <p className="text-xs sm:text-sm text-purple-200/90 font-medium">
          A secret digital realm locked until midnight on 7th November.
        </p>
        <p className="text-[10px] sm:text-[11px] text-purple-300/50 mt-1">
          Made exclusively by Ayush with infinite love for his princess.
        </p>
      </div>

      {/* Secret Access Modal */}
      <SecretAccessModal
        isOpen={isSecretModalOpen}
        onClose={() => setIsSecretModalOpen(false)}
        onSuccess={onUnlocked}
      />
    </div>
  );
}
