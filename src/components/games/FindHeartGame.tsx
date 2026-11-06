'use client';

import React, { useState } from 'react';
import { Heart, Sparkles, BookOpen, Music, Crown, Flower2, Lamp, Coffee, Moon, Compass, CheckCircle } from 'lucide-react';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';

interface ChamberItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  hasHeart: boolean;
  message?: string;
  clue: string;
}

export default function FindHeartGame() {
  const [items] = useState<ChamberItem[]>([
    {
      id: 'book',
      name: 'Classroom Notebook',
      icon: <BookOpen className="w-8 h-8 text-rose-300" />,
      hasHeart: true,
      message: 'Chhupe hue dil mein likha hai: "Roz class ke 8 ghante sirf tumhare sath jeene ka naam hai!" ❤️',
      clue: 'Desk ke kone mein rakhi diary...',
    },
    {
      id: 'music',
      name: 'Midnight Music Box',
      icon: <Music className="w-8 h-8 text-indigo-300" />,
      hasHeart: true,
      message: 'Suron mein goonjti aawaz: "Hamari 6 ghante lambi calls ka har second ek pyara sa gaana hai." 🎵',
      clue: 'Raat ke suron ki chabi...',
    },
    {
      id: 'crown',
      name: 'Princess Shree Crown',
      icon: <Crown className="w-8 h-8 text-amber-300" />,
      hasHeart: true,
      message: 'Crown par chamakta heera: "Meri poori universe par sirf tumhara raaj hai, Princess!" 👑',
      clue: 'Shree ke aashiyane ka taaj...',
    },
    {
      id: 'flower',
      name: '14 September Blossom',
      icon: <Flower2 className="w-8 h-8 text-pink-400" />,
      hasHeart: true,
      message: 'Ganesh Chaturthi ke phool: "Bappa ke aashirwad se shuru hua hamara rishta hamesha mehekta rahega." 🌸',
      clue: 'Bappa ke pavitra charan...',
    },
    {
      id: 'lamp',
      name: 'Hostel Gate Lantern',
      icon: <Lamp className="w-8 h-8 text-yellow-300" />,
      hasHeart: true,
      message: '5 PM ke deepak ki roshni: "Girls\' hostel aur Boys\' hostel door sahi, par roshni ek hi dil se aati hai." 🏮',
      clue: 'Curfew ke gate ka pahredar...',
    },
    {
      id: 'coffee',
      name: 'Shared Lunch Tiffin',
      icon: <Coffee className="w-8 h-8 text-amber-200" />,
      hasHeart: false,
      clue: 'Khaali tiffin... "Yahan dil nahi, bas Shree ki pasand ka khana tha!"',
    },
    {
      id: 'moon',
      name: 'Observatory Sphere',
      icon: <Moon className="w-8 h-8 text-purple-300" />,
      hasHeart: false,
      clue: 'Aasman ka aaina... "Chand dekh raha hai, dil dusri jagah dhoondho!"',
    },
    {
      id: 'compass',
      name: 'College Campus Compass',
      icon: <Compass className="w-8 h-8 text-teal-300" />,
      hasHeart: false,
      clue: 'Compass ki sui... "Direction sahi hai, bas thoda aur aage dekho!"',
    },
  ]);

  const [inspectedItems, setInspectedItems] = useState<string[]>([]);
  const [foundHearts, setFoundHearts] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const totalHearts = items.filter((i) => i.hasHeart).length;

  const handleInspect = (item: ChamberItem) => {
    if (!inspectedItems.includes(item.id)) {
      setInspectedItems((prev) => [...prev, item.id]);
    }

    if (item.hasHeart) {
      if (!foundHearts.includes(item.id)) {
        sound.playHeartCatch();
        const updated = [...foundHearts, item.id];
        setFoundHearts(updated);
        if (updated.length === totalHearts) {
          sound.playGrandCelebration();
          confetti({ particleCount: 100, spread: 70 });
        }
      }
      setActiveMessage(item.message || 'You found a piece of Ayush\'s heart!');
    } else {
      sound.playChime(350, 0.3);
      setActiveMessage(item.clue);
    }
  };

  const handleReset = () => {
    setInspectedItems([]);
    setFoundHearts([]);
    setActiveMessage(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#1b0f2a] to-[#0c0616] border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-purple-500/20 pb-4 mb-6">
        <div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200">
            Find My Hidden Hearts
          </h3>
          <p className="text-xs text-purple-200/70">
            Enchanted objects ke peeche Ayush ne apne dil ke tukde chhupaye hain. Find all 5!
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-rose-300 font-mono text-xs">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>Found: {foundHearts.length} / {totalHearts}</span>
        </div>
      </div>

      {/* Grid of Chamber Objects */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {items.map((item) => {
          const isInspected = inspectedItems.includes(item.id);
          const isHeart = foundHearts.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleInspect(item)}
              className={`relative p-5 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                isHeart
                  ? 'bg-rose-950/80 border-2 border-rose-400 shadow-[0_0_20px_rgba(255,77,136,0.5)] scale-105'
                  : isInspected
                  ? 'bg-purple-950/30 border border-purple-500/20 opacity-70'
                  : 'bg-black/40 border border-purple-500/30 hover:border-amber-300/60 hover:scale-105 hover:bg-purple-950/40'
              }`}
            >
              {isHeart && (
                <div className="absolute top-2 right-2">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-bounce" />
                </div>
              )}
              <div className="p-2 rounded-xl bg-purple-900/30">
                {item.icon}
              </div>
              <span className="text-xs font-medium text-purple-200 text-center">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Inspection Note Box */}
      {activeMessage && (
        <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/30 text-sm text-rose-100 font-serif italic text-center animate-fadeIn">
          &ldquo;{activeMessage}&rdquo;
        </div>
      )}

      {/* Victory Celebration */}
      {foundHearts.length === totalHearts && (
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-rose-950/80 to-purple-950/80 border border-rose-500/50 text-center space-y-3 animate-fadeIn">
          <div className="inline-flex items-center gap-2 text-amber-300 font-serif font-bold text-lg">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>All 5 Hearts Discovered! You Own Ayush&apos;s Soul!</span>
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <p className="text-xs text-rose-200/90 font-sans max-w-md mx-auto">
            Ayush ka dil hamesha se tumhare paas hi tha, Princess. Aaj bas ek baar phir tumne ise dhoondh nikala! Happy Birthday Shree ❤️
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/30 cursor-pointer"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
