'use client';

import React, { useState } from 'react';
import { ReasonItem } from '@/types';
import { Heart, Sparkles, Shuffle, Eye, ChevronDown } from 'lucide-react';
import { sound } from '@/lib/sound';

interface ReasonsILoveYouProps {
  reasons: ReasonItem[];
}

export default function ReasonsILoveYou({ reasons }: ReasonsILoveYouProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [spotlightReason, setSpotlightReason] = useState<ReasonItem | null>(null);

  const categories = ['All', 'Everyday', 'College', 'Hostel', 'Heart'];

  const filtered = activeCategory === 'All'
    ? reasons
    : reasons.filter((r) => r.category === activeCategory);

  const displayed = filtered.slice(0, visibleCount);

  const handleShuffle = () => {
    sound.playHeartCatch();
    const random = reasons[Math.floor(Math.random() * reasons.length)];
    setSpotlightReason(random);
  };

  const handleShowMore = () => {
    sound.playChime(600, 0.3);
    setVisibleCount((prev) => Math.min(filtered.length, prev + 12));
  };

  return (
    <section id="reasons" className="relative py-20 px-4 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs md:text-sm">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>30 Reasons Why I Love You</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200">
          Main Tumhe Kyun Itna Chahta Hoon
        </h2>

        <p className="text-sm md:text-base text-purple-200/80 font-sans">
          Har din ek nayi wajah milti hai tumse pyaar karne ki. Click any card to read why Shree is Ayush&apos;s universe.
        </p>

        {/* Shuffle Button */}
        <div className="pt-2">
          <button
            onClick={handleShuffle}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-700 to-rose-700 hover:from-purple-600 hover:to-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-900/40 inline-flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle Random Reason ✨</span>
          </button>
        </div>
      </div>

      {/* Spotlight Reason Modal */}
      {spotlightReason && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#221034] to-[#11071c] border-2 border-rose-500/60 shadow-[0_0_60px_rgba(255,77,136,0.5)] text-center text-white space-y-4">
            <span className="w-12 h-12 mx-auto rounded-full bg-rose-600/30 border border-rose-400 flex items-center justify-center font-mono font-bold text-rose-300">
              #{spotlightReason.number}
            </span>
            <h3 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200">
              {spotlightReason.title}
            </h3>
            <p className="text-base text-rose-100 font-serif italic leading-relaxed">
              &ldquo;{spotlightReason.description}&rdquo;
            </p>
            <button
              onClick={() => setSpotlightReason(null)}
              className="mt-4 px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(12);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(255,77,136,0.5)]'
                : 'bg-black/40 text-purple-200 border border-purple-500/20 hover:bg-purple-950/40'
            }`}
          >
            {cat === 'All' ? 'All 30 Reasons' : cat}
          </button>
        ))}
      </div>

      {/* Reasons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((r) => (
          <div
            key={r.id}
            onClick={() => setSpotlightReason(r)}
            className="group relative p-6 rounded-2xl bg-gradient-to-b from-[#1b102b]/90 to-[#0e0819]/95 border border-purple-500/30 hover:border-rose-400/60 shadow-lg backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,77,136,0.25)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-xs font-mono font-bold text-amber-300 group-hover:scale-110 transition-transform">
                  #{r.number}
                </span>
                <span className="text-[10px] uppercase font-mono text-purple-300/60 bg-purple-950/40 px-2 py-0.5 rounded-md border border-purple-500/20">
                  {r.category}
                </span>
              </div>

              <h4 className="text-base font-serif font-bold text-white group-hover:text-rose-200 transition-colors mb-2">
                {r.title}
              </h4>

              <p className="text-xs md:text-sm text-purple-200/80 font-sans leading-relaxed">
                {r.description}
              </p>
            </div>

            <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between text-xs text-rose-300/80 mt-4">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                <span>Reason #{r.number}</span>
              </span>
              <span className="text-[11px] text-purple-300/50">Read &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {displayed.length < filtered.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 rounded-full bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs md:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
          >
            <span>Show More Reasons ({filtered.length - displayed.length} left)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
