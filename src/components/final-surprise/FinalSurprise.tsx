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
    <section id="final-surprise" className="relative py-24 px-4 max-w-4xl mx-auto text-center z-20">
      {/* Glow background ring */}
      <div className="absolute inset-0 max-w-lg mx-auto bg-gradient-to-r from-rose-600/20 via-purple-600/20 to-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-rose-300 text-xs md:text-sm">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>The Grand Finale Surprise</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200">
          Princess, tumhare liye ek last surprise hai...
        </h2>

        {!isOpen ? (
          <div className="pt-6">
            <button
              onClick={handleOpenChest}
              className="group relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#231238] to-[#0e0717] border-2 border-amber-400/50 shadow-[0_0_60px_rgba(251,191,36,0.3)] hover:shadow-[0_0_90px_rgba(251,191,36,0.6)] hover:scale-105 transition-all duration-500 cursor-pointer max-w-xs mx-auto flex flex-col items-center gap-4"
            >
              <div className="absolute -top-3 px-4 py-1 rounded-full bg-amber-500 text-purple-950 font-bold text-xs uppercase tracking-wider shadow">
                Enchanted Treasure Chest
              </div>

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                <Gift className="w-10 h-10 text-purple-950" />
              </div>

              <div className="space-y-1 text-center">
                <span className="text-sm font-serif font-bold text-white flex items-center justify-center gap-1.5">
                  <Key className="w-4 h-4 text-amber-300" />
                  <span>Click to Unlock Final Note</span>
                </span>
                <p className="text-[11px] text-purple-200/60 font-sans">
                  Sirf Shree ke haathon se khulega...
                </p>
              </div>
            </button>
          </div>
        ) : (
          /* Unlocked Message */
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#251032]/95 to-[#100619]/95 border-2 border-rose-500/60 shadow-[0_0_80px_rgba(255,77,136,0.5)] text-center space-y-6 max-w-xl mx-auto animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center shadow-lg">
              <Crown className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-200 to-purple-200">
                Happy Birthday, Shree. ❤️
              </h3>

              <div className="p-6 rounded-2xl bg-black/40 border border-purple-500/30">
                <p className="text-base md:text-lg font-serif italic text-rose-100 leading-relaxed">
                  &ldquo;Aaj ka din tumhara hai, lekin meri life mein tumhara hona mere liye har din ko special bana deta hai.&rdquo;
                </p>
              </div>

              <p className="text-sm font-serif text-amber-200 font-semibold tracking-wider">
                With endless love,<br />
                Ayush.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-rose-400 text-xs font-mono">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>14 September 2026 • 7 November 2026 • Always & Forever</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
