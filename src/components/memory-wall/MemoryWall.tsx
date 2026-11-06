'use client';

import React, { useState } from 'react';
import { MemoryQuote } from '@/types';
import { Heart, Quote, Sparkles, MessageSquareHeart } from 'lucide-react';
import { sound } from '@/lib/sound';

interface MemoryWallProps {
  quotes: MemoryQuote[];
}

export default function MemoryWall({ quotes }: MemoryWallProps) {
  const [likesState, setLikesState] = useState<{ [id: string]: number }>({});

  const handleLike = (id: string, initialLikes: number) => {
    sound.playHeartCatch();
    setLikesState((prev) => {
      const current = prev[id] !== undefined ? prev[id] : initialLikes;
      return { ...prev, [id]: current + 1 };
    });
  };

  return (
    <section id="memory-wall" className="relative py-16 sm:py-24 px-4 max-w-6xl mx-auto z-20 overflow-x-clip">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-rose-300 text-xs sm:text-sm shadow-md">
          <MessageSquareHeart className="w-4 h-4 text-rose-400" />
          <span>Little Things, Infinite Memories</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200">
          Hamari Chhoti Chhoti Baatein
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-purple-200/80 font-sans max-w-xl mx-auto">
          Classroom ke kone se lekar hostel ki calls tak, wo lamhe jo hamare dilon par hamesha ke liye chhap gaye.
        </p>
      </div>

      {/* Masonry / Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {quotes.map((q, idx) => {
          const count = likesState[q.id] !== undefined ? likesState[q.id] : q.heartsCount;

          return (
            <div
              key={q.id || idx}
              className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#1c102c]/90 to-[#0e081a]/95 border border-purple-500/30 hover:border-rose-400/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(255,77,136,0.2)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-500/30">
                    {q.context || 'College Memory'}
                  </span>
                  <Quote className="w-6 h-6 text-purple-400/30 group-hover:text-rose-400/50 transition-colors" />
                </div>

                <p className="text-base md:text-lg font-serif italic text-rose-100/95 leading-relaxed">
                  &ldquo;{q.quote}&rdquo;
                </p>
              </div>

              {/* Card Footer with Heart Reaction */}
              <div className="pt-6 border-t border-purple-500/20 flex items-center justify-between mt-4">
                <span className="text-xs text-purple-300/60 font-sans">
                  Ayush & Shree
                </span>

                <button
                  onClick={() => handleLike(q.id, q.heartsCount)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 hover:text-white transition-all cursor-pointer group-hover:scale-105"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span className="text-xs font-mono font-semibold">{count}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

