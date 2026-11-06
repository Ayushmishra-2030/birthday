'use client';

import React, { useState, useEffect } from 'react';
import { Letter } from '@/types';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, Feather } from 'lucide-react';
import { sound } from '@/lib/sound';

interface LetterModalProps {
  letter: Letter;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function LetterModal({
  letter,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: LetterModalProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect on letter change
  useEffect(() => {
    sound.playEnvelopeOpen();
    setDisplayedText('');
    setIsTyping(true);

    let currentIndex = 0;
    const fullText = letter.content;
    const speed = 12; // fast enough to be smooth and pleasurable

    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex += 2; // two chars per tick for smooth pacing
      } else {
        setDisplayedText(fullText);
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [letter]);

  const handleSkipTyping = () => {
    setDisplayedText(letter.content);
    setIsTyping(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-gradient-to-b from-[#241334] to-[#11071c] border-2 border-rose-500/40 shadow-[0_0_60px_rgba(255,77,136,0.35)] text-white overflow-hidden">
        {/* Top Ornate Header */}
        <div className="relative p-6 border-b border-purple-500/30 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-rose-600/20 border border-rose-400/40">
              <Feather className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Letter #{letter.orderIndex} for Shree</span>
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                {letter.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Letter Body with parchment styling */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 font-serif text-rose-100/90 leading-relaxed text-sm md:text-base select-text">
          <div className="p-6 md:p-8 rounded-2xl bg-[#170a24]/80 border border-purple-500/20 shadow-inner space-y-4">
            <div className="text-right text-xs text-amber-300/80 font-mono tracking-wider italic">
              From: Ayush (Boys&apos; Hostel) • To: My Princess Shree (Girls&apos; Hostel)
            </div>

            <div className="whitespace-pre-line leading-relaxed text-slate-100">
              {displayedText}
            </div>

            {isTyping && (
              <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
                <div className="flex items-center gap-2 text-xs text-purple-300 animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  <span>Ayush is penning down his feelings...</span>
                </div>
                <button
                  onClick={handleSkipTyping}
                  className="text-xs text-amber-300 hover:text-amber-200 underline font-sans cursor-pointer"
                >
                  Show full letter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation controls */}
        <div className="p-4 md:p-5 border-t border-purple-500/30 bg-black/40 flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium flex items-center gap-1.5 bg-purple-950/60 hover:bg-purple-900 border border-purple-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Letter</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-rose-300">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span className="hidden sm:inline">With endless love, Ayush</span>
          </div>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className="px-4 py-2 rounded-xl text-xs md:text-sm font-medium flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 border border-rose-400/30 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <span>Next Letter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
