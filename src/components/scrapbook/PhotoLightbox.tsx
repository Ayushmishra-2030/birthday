'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types';
import { X, ChevronLeft, ChevronRight, Heart, Calendar, Tag, Sparkles } from 'lucide-react';
import { sound } from '@/lib/sound';

interface PhotoLightboxProps {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function PhotoLightbox({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: PhotoLightboxProps) {
  const [likes, setLikes] = useState(1);
  const [hasLiked, setHasLiked] = useState(false);

  const handleHeartClick = () => {
    sound.playHeartCatch();
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1));
    setHasLiked(!hasLiked);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      {/* Lightbox Wrapper */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row rounded-3xl bg-gradient-to-b from-[#1b1028] to-[#0c0614] border border-rose-500/40 shadow-[0_0_60px_rgba(255,77,136,0.4)] overflow-hidden text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Large Photo Presentation */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[320px] md:min-h-[500px] overflow-hidden group">
          <div className="relative w-full h-full min-h-[350px] md:min-h-[500px]">
            <Image
              src={photo.imageUrl}
              alt={photo.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          </div>

          {/* Previous / Next Arrow Overlays */}
          {hasPrev && (
            <button
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Right Side: Romantic Details & Caption */}
        <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between bg-[#150a22]/90 border-t md:border-t-0 md:border-l border-purple-500/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-950/80 border border-rose-500/40 text-rose-300 flex items-center gap-1.5">
                <Tag className="w-3 h-3" />
                <span>{photo.category || 'Memories'}</span>
              </span>
              {photo.date && (
                <span className="text-xs text-purple-300/70 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{photo.date}</span>
                </span>
              )}
            </div>

            <h3 className="text-xl md:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200">
              {photo.title}
            </h3>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/20">
              <p className="text-sm text-rose-100/90 leading-relaxed font-serif italic">
                &ldquo;{photo.caption}&rdquo;
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-purple-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleHeartClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  hasLiked
                    ? 'bg-rose-600 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.6)]'
                    : 'bg-purple-950/40 border-purple-500/30 text-rose-300 hover:bg-rose-950/60'
                }`}
              >
                <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white' : ''}`} />
                <span className="text-xs font-semibold">{likes} Ayush & Shree Love</span>
              </button>

              <div className="flex items-center gap-1 text-amber-300 text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fairytale Memory</span>
              </div>
            </div>

            <p className="text-[11px] text-purple-300/50 text-center">
              Use arrow keys or buttons to browse our scrapbook
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
