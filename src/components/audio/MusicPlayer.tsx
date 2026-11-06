'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

interface MusicPlayerProps {
  initialTitle?: string;
}

export default function MusicPlayer({ initialTitle = 'Enchanted Fairytale Ambiance' }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showPrompt, setShowPrompt] = useState(true);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Soft romantic arpeggio notes (Pentatonic F# Major / Eb Minor: peaceful, dreamy romantic)
  const notes = [
    369.99, // F#4
    415.30, // G#4
    466.16, // A#4
    554.37, // C#5
    622.25, // D#5
    739.99, // F#5
    830.61, // G#5
  ];

  const playSynthNote = (freq: number) => {
    if (isMuted || !isPlaying) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const targetVol = volume * 0.12;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(targetVol, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    } catch (e) {}
  };

  const startAmbientLoop = () => {
    setIsPlaying(true);
    setShowPrompt(false);
    if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);

    // Play initial chime
    playSynthNote(notes[0]);

    let step = 0;
    synthIntervalRef.current = setInterval(() => {
      const note = notes[step % notes.length];
      playSynthNote(note);
      // occasional harmony note
      if (Math.random() < 0.4) {
        setTimeout(() => {
          playSynthNote(notes[(step + 3) % notes.length]);
        }, 300);
      }
      step++;
    }, 1800);
  };

  const stopAmbientLoop = () => {
    setIsPlaying(false);
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAmbientLoop();
    } else {
      startAmbientLoop();
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sound.setMuted(nextMute);
  };

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    };
  }, []);

  return (
    <>
      {/* Friendly first-interaction banner for browser autoplay */}
      {showPrompt && !isPlaying && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-40 animate-bounce">
          <button
            onClick={startAmbientLoop}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900 to-rose-900 border border-rose-400/50 text-white text-xs shadow-[0_0_20px_rgba(255,77,136,0.5)] hover:scale-105 transition-all cursor-pointer"
          >
            <Music className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>🎵 Tap to start the romantic music ambiance</span>
          </button>
        </div>
      )}

      {/* Persistent Floating Music Controller Widget */}
      <div className="fixed bottom-4 left-4 sm:left-6 z-40 flex items-center gap-2 p-2 px-3 rounded-full bg-gradient-to-r from-[#1b0d2a]/95 to-[#0e0618]/95 border border-purple-500/40 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-md text-white">
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-md"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
        </button>

        {/* Track Title & Animated Visualizer */}
        <div className="hidden sm:flex flex-col pr-2">
          <span className="text-[11px] font-serif text-rose-200 font-semibold line-clamp-1 max-w-[140px]">
            {initialTitle}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`w-0.5 bg-rose-400 rounded-full transition-all duration-300 ${
                  isPlaying ? 'animate-pulse' : 'h-1'
                }`}
                style={{
                  height: isPlaying ? `${Math.random() * 8 + 4}px` : '4px',
                  animationDelay: `${bar * 150}ms`,
                }}
              />
            ))}
            <span className="text-[9px] text-purple-300/60 font-mono ml-1">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-white/10 text-purple-300 hover:text-white transition-colors cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-14 sm:w-20 h-1 bg-purple-900 rounded-lg appearance-none cursor-pointer accent-rose-500"
          title="Volume"
        />
      </div>
    </>
  );
}

