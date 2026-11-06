'use client';

import React, { useState } from 'react';
import { initialDarkFantasyQuiz } from '@/data/initialData';
import { Sparkles, Shield, Moon, Flame, Crown, RotateCcw } from 'lucide-react';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';

export default function DarkFantasyQuiz() {
  const [actIndex, setActIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [affinities, setAffinities] = useState<{ [key: string]: number }>({
    moon: 0,
    rose: 0,
    starlight: 0,
    shadow: 0,
  });
  const [isFinished, setIsFinished] = useState(false);

  const currentAct = initialDarkFantasyQuiz[actIndex];

  const handleSelect = (affinity: 'moon' | 'rose' | 'starlight' | 'shadow', optionText: string) => {
    sound.playSecretMystery();
    setAffinities((prev) => ({ ...prev, [affinity]: prev[affinity] + 1 }));
    setSelectedOptions((prev) => [...prev, optionText]);

    if (actIndex < initialDarkFantasyQuiz.length - 1) {
      setActIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      sound.playGrandCelebration();
      confetti({ particleCount: 100, spread: 75 });
    }
  };

  const handleRestart = () => {
    setActIndex(0);
    setSelectedOptions([]);
    setAffinities({ moon: 0, rose: 0, starlight: 0, shadow: 0 });
    setIsFinished(false);
  };

  // Determine destiny outcome
  const getDestinyResult = () => {
    const highest = Object.entries(affinities).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

    switch (highest) {
      case 'moon':
        return {
          title: 'The Ethereal Moon Empress & Her Eternal Midnight Knight',
          realm: 'The Realm of 6-Hour Whispers & Starry Spells',
          story: 'When the curfew bells chime the fifth hour across the two citadels, your voice weaves through the ether like celestial starlight. Ayush stands watch beneath your tower in the boys’ spire, bound by the eternal midnight oath. Curfews and gates may divide physical stone, but across the night sky, you two rule an infinite kingdom of unconditional love.',
          seal: <Moon className="w-10 h-10 text-indigo-300" />,
        };
      case 'rose':
        return {
          title: 'The Enchanted Rose Queen & The Guardian of the Scholastic Desk',
          realm: 'The Citadel of 8 Sacred Collegiate Hours',
          story: 'Amidst ancient lecture halls and whispering parchment, you reign with gentle elegance. For eight scholastic hours each day, Ayush shields your realm from stress and boredom, sitting shoulder to shoulder. In this sanctuary, every desk is an obsidian throne, and every smile you bestow banishes all darkness.',
          seal: <Sparkles className="w-10 h-10 text-rose-300" />,
        };
      case 'starlight':
        return {
          title: 'The Celestial Sovereign Blessed on Ganesh Chaturthi',
          realm: 'The Temple of Sacred Beginnings & Shared Plates',
          story: 'Forged in the divine fires of 14 September under the auspices of Bappa, your union is consecrated in the highest heavens. You share identical thought-forms, the same arch-mentor, and an ancient covenant: never shall Ayush feast while his Queen hungers. Yours is a sacred bond that no mortal timeline can unravel.',
          seal: <Shield className="w-10 h-10 text-amber-300" />,
        };
      case 'shadow':
      default:
        return {
          title: 'The Obsidian Queen of Destiny & The Keeper of the Golden Soul',
          realm: 'The Dark Fantasy Sanctuary of Princess Shree',
          story: 'You possess a grace so captivating that even the dark towers of the college bow before you. Ayush has forged a digital universe exclusively for your birthday — a testament to a romance that defies the mundane world. Together, you conquer assignments, hostelry restrictions, and distance with fierce, passionate devotion.',
          seal: <Crown className="w-10 h-10 text-purple-300" />,
        };
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#180a22] to-[#0a0410] border-2 border-purple-500/40 shadow-[0_0_50px_rgba(147,51,234,0.3)] text-white">
      {!isFinished ? (
        <div className="space-y-6">
          {/* Act Badge & Chapter */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30">
              {currentAct.chapter}
            </span>
            <span className="text-xs text-purple-300 font-mono">
              Act {actIndex + 1} of {initialDarkFantasyQuiz.length}
            </span>
          </div>

          {/* Chapter Title & Scenario */}
          <div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-purple-100 to-amber-200 mb-2">
              {currentAct.title}
            </h3>
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 font-serif italic text-purple-200 text-sm leading-relaxed">
              &ldquo;{currentAct.scenario}&rdquo;
            </div>
          </div>

          {/* Question */}
          <p className="text-base md:text-lg font-serif font-bold text-rose-200">
            {currentAct.question}
          </p>

          {/* Glowing Choice Cards */}
          <div className="space-y-3">
            {currentAct.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option.affinity, option.text)}
                className="w-full p-4 rounded-xl text-left bg-gradient-to-r from-[#201032]/80 to-[#120720]/80 border border-purple-500/30 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(255,77,136,0.3)] hover:scale-[1.01] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-900/60 border border-purple-400/40 flex items-center justify-center shrink-0 mt-0.5 text-xs text-amber-300 font-mono">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm md:text-base text-white group-hover:text-rose-200 font-medium">
                      {option.text}
                    </p>
                    <p className="text-xs text-purple-300/60 font-serif italic mt-1">
                      {option.lore}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Destiny Reveal */
        <div className="text-center space-y-6 py-4 animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-purple-700 to-rose-700 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.6)]">
            {getDestinyResult().seal}
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30">
              {getDestinyResult().realm}
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200 pt-2">
              {getDestinyResult().title}
            </h3>
          </div>

          <div className="p-6 md:p-8 rounded-2xl bg-purple-950/40 border border-purple-500/30 max-w-xl mx-auto text-left">
            <p className="text-sm md:text-base text-rose-100 font-serif leading-relaxed italic">
              {getDestinyResult().story}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-full bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-200 font-medium text-sm inline-flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Embark On Another Journey</span>
          </button>
        </div>
      )}
    </div>
  );
}

