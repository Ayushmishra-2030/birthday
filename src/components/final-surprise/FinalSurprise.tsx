'use client';

import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Key, Crown } from 'lucide-react';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';

export default function FinalSurprise() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChest = () => {
    sound.playGrandCelebration();
    setIsOpen(true);

    // Huge Fireworks celebration
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d88', '#f5c344', '#c084fc', '#ffffff'],
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d88', '#f5c344', '#c084fc', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section id="final-surprise" className="relative py-16 sm:py-24 px-4 max-w-4xl mx-auto text-center z-20 overflow-x-clip">
      {/* Glow background ring */}
      <div className="absolute inset-0 max-w-lg mx-auto bg-gradient-to-r from-rose-600/20 via-purple-600/20 to-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-rose-300 text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>The Grand Finale Surprise</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200">
          Princess, tumhare liye ek last surprise hai...
        </h2>

        {!isOpen ? (
          <div className="pt-4 sm:pt-6">
            <button
              onClick={handleOpenChest}
              className="group relative p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#231238] to-[#0e0717] border-2 border-amber-400/50 shadow-[0_0_60px_rgba(251,191,36,0.3)] hover:shadow-[0_0_90px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer max-w-xs mx-auto flex flex-col items-center gap-4"
            >
              <div className="absolute -top-3 px-3 sm:px-4 py-1 rounded-full bg-amber-500 text-purple-950 font-bold text-[10px] sm:text-xs uppercase tracking-wider shadow">
                Enchanted Treasure Chest
              </div>

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-purple-950" />
              </div>

              <div className="space-y-1 text-center">
                <span className="text-xs sm:text-sm font-serif font-bold text-white flex items-center justify-center gap-1.5">
                  <Key className="w-4 h-4 text-amber-300" />
                  <span>Click to Unlock Final Note</span>
                </span>
                <p className="text-[10px] sm:text-[11px] text-purple-200/60 font-sans">
                  Sirf Shree ke haathon se khulega...
                </p>
              </div>
            </button>
          </div>
        ) : (
          /* Unlocked Message */
          <div className="relative p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#251032]/95 to-[#100619]/95 border-2 border-rose-500/60 shadow-[0_0_80px_rgba(255,77,136,0.5)] text-center space-y-4 sm:space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-200 to-purple-200">
                Happy Birthday, Shree. ❤️
              </h3>

              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-black/40 border border-purple-500/30">
                <p className="text-sm sm:text-base md:text-lg font-serif italic text-rose-100 leading-relaxed">
                  &ldquo;Aaj ka din tumhara hai, lekin meri life mein tumhara hona mere liye har din ko special bana deta hai.&rdquo;
                </p>
              </div>

              <p className="text-xs sm:text-sm font-serif text-amber-200 font-semibold tracking-wider">
                With endless love,<br />
                Ayush.
              </p>
            </div>

            <div className="pt-2 sm:pt-4 flex items-center justify-center gap-2 text-rose-400 text-[10px] sm:text-xs font-mono">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>14 September 2026 • 7 November 2026 • Always & Forever</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

