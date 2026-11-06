'use client';

import React, { useState } from 'react';
import { Letter } from '@/types';
import LetterModal from './LetterModal';
import { Mail, Heart, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

interface LettersSectionProps {
  letters: Letter[];
}

export default function LettersSection({ letters }: LettersSectionProps) {
  const [selectedLetterIndex, setSelectedLetterIndex] = useState<number | null>(null);

  const handleOpenLetter = (index: number) => {
    sound.playEnvelopeOpen();
    setSelectedLetterIndex(index);
  };

  const getThemeClasses = (theme?: string) => {
    switch (theme) {
      case 'lavender':
        return {
          cardBg: 'from-[#221038] to-[#12071f]',
          border: 'border-purple-400/40 hover:border-purple-300',
          seal: 'bg-gradient-to-tr from-purple-700 to-indigo-600 border-purple-300',
          glow: 'group-hover:shadow-[0_0_35px_rgba(192,132,252,0.4)]',
          badge: 'text-purple-300 bg-purple-950/60',
        };
      case 'gold':
        return {
          cardBg: 'from-[#2b1f10] to-[#150d05]',
          border: 'border-amber-400/40 hover:border-amber-300',
          seal: 'bg-gradient-to-tr from-amber-600 to-yellow-500 border-amber-200',
          glow: 'group-hover:shadow-[0_0_35px_rgba(251,191,36,0.4)]',
          badge: 'text-amber-300 bg-amber-950/60',
        };
      case 'wine':
        return {
          cardBg: 'from-[#2c0916] to-[#130309]',
          border: 'border-rose-700/50 hover:border-rose-400',
          seal: 'bg-gradient-to-tr from-rose-900 to-pink-800 border-rose-300',
          glow: 'group-hover:shadow-[0_0_35px_rgba(225,29,72,0.4)]',
          badge: 'text-rose-300 bg-rose-950/60',
        };
      case 'rose':
      default:
        return {
          cardBg: 'from-[#261022] to-[#130711]',
          border: 'border-rose-500/40 hover:border-rose-400',
          seal: 'bg-gradient-to-tr from-rose-600 to-pink-500 border-rose-300',
          glow: 'group-hover:shadow-[0_0_35px_rgba(255,77,136,0.4)]',
          badge: 'text-pink-300 bg-pink-950/60',
        };
    }
  };

  return (
    <section id="letters" className="relative py-20 px-4 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs md:text-sm">
          <Mail className="w-4 h-4 text-rose-400" />
          <span>Letters From Ayush</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200">
          Meri Princess Ke Naam 15 Khat
        </h2>

        <p className="text-sm md:text-base text-purple-200/80 font-sans">
          Har ek khat mein Ayush ke dil ki sachchi aawaz hai. Click any envelope to unseal and read the letter.
        </p>
      </div>

      {/* Grid of 15 Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {letters.map((letter, idx) => {
          const theme = getThemeClasses(letter.envelopeTheme);

          return (
            <div
              key={letter.id}
              onClick={() => handleOpenLetter(idx)}
              className={`group relative p-6 rounded-2xl bg-gradient-to-b ${theme.cardBg} border ${theme.border} shadow-lg backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 ${theme.glow}`}
            >
              {/* Envelope Flap visual */}
              <div className="absolute top-0 inset-x-0 h-10 bg-white/5 rounded-t-2xl border-b border-white/10 pointer-events-none" />

              {/* Wax Seal Badge */}
              <div className="flex items-center justify-between mb-6">
                <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border border-white/10 ${theme.badge}`}>
                  Letter #{letter.orderIndex}
                </span>

                <div className={`w-8 h-8 rounded-full ${theme.seal} border flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg font-serif font-bold text-white group-hover:text-rose-200 transition-colors line-clamp-1 mb-1">
                {letter.title}
              </h3>

              <p className="text-xs text-purple-200/70 font-sans italic line-clamp-2 mb-4">
                &ldquo;{letter.subtitle}&rdquo;
              </p>

              {/* Tap to open prompt */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-rose-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Tap to Break Wax Seal</span>
                </span>
                <span className="text-[11px] text-purple-300/60 font-mono">Read &rarr;</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog */}
      {selectedLetterIndex !== null && (
        <LetterModal
          letter={letters[selectedLetterIndex]}
          onClose={() => setSelectedLetterIndex(null)}
          onPrev={() => setSelectedLetterIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onNext={() => setSelectedLetterIndex((prev) => (prev !== null && prev < letters.length - 1 ? prev + 1 : prev))}
          hasPrev={selectedLetterIndex > 0}
          hasNext={selectedLetterIndex < letters.length - 1}
        />
      )}
    </section>
  );
}
