'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Letter } from '@/types';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, Feather, Volume2, FastForward } from 'lucide-react';
import { sound } from '@/lib/sound';

interface LetterModalProps {
  letter: Letter;
  totalLetters: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export default function LetterModal({
  letter,
  totalLetters,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: LetterModalProps) {
  const [mounted, setMounted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [animStage, setAnimStage] = useState<'envelope' | 'opening' | 'letter'>('envelope');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Mount check for React Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Handle letter change & envelope opening sequence
  useEffect(() => {
    setAnimStage('envelope');
    setDisplayedText('');
    setIsTyping(true);

    // Stage 1 -> Stage 2: break seal and open flap
    const timer1 = setTimeout(() => {
      sound.playEnvelopeOpen();
      setAnimStage('opening');
    }, 450);

    // Stage 2 -> Stage 3: reveal letter paper
    const timer2 = setTimeout(() => {
      setAnimStage('letter');
    }, 1100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [letter.id]);

  // Typewriter animation once letter is visible
  useEffect(() => {
    if (animStage !== 'letter') return;

    let currentIndex = 0;
    const fullText = letter.content;
    const speed = 10; // smooth and readable

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 2));
        currentIndex += 2;
      } else {
        setDisplayedText(fullText);
        setIsTyping(false);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [animStage, letter.content]);

  const handleSkipAnimation = () => {
    setAnimStage('letter');
    setDisplayedText(letter.content);
    setIsTyping(false);
  };

  const handleSkipTyping = () => {
    setDisplayedText(letter.content);
    setIsTyping(false);
  };

  if (!mounted) return null;

  // The modal UI rendered directly into document.body
  const modalContent = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn select-none"
      style={{ isolation: 'isolate' }}
      role="dialog"
      aria-modal="true"
      aria-label={letter.title}
    >
      {/* Click propagation boundary */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#221033] via-[#150a22] to-[#0d0516] border-2 border-rose-500/50 shadow-[0_0_70px_rgba(255,77,136,0.4)] text-white overflow-hidden"
      >
        {/* Top Pinned Header */}
        <div className="relative px-4 sm:px-6 py-3.5 sm:py-4 border-b border-purple-500/30 flex items-center justify-between bg-black/40 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div className="p-2 sm:p-2.5 rounded-full bg-rose-600/30 border border-rose-400/40 shrink-0">
              <Feather className="w-4 h-4 sm:w-5 sm:h-5 text-rose-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-amber-300 font-semibold font-mono">
                <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                <span>Letter #{letter.orderIndex} of {totalLetters}</span>
              </div>
              <h3 className="text-base sm:text-xl font-serif font-bold text-white truncate">
                {letter.title}
              </h3>
            </div>
          </div>

          {/* Close button with large touch target */}
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 text-slate-300 hover:text-white rounded-xl bg-white/5 hover:bg-rose-600/80 transition-colors cursor-pointer shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
            title="Close Letter (Esc)"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Envelope Unfolding Sequence OR Full Letter Parchment */}
        {animStage !== 'letter' ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 min-h-[300px] text-center space-y-6">
            <div className="relative w-64 sm:w-80 h-44 sm:h-52 bg-gradient-to-b from-[#381640] to-[#1c0824] rounded-2xl border-2 border-rose-400/60 shadow-[0_0_40px_rgba(255,77,136,0.3)] flex flex-col items-center justify-center overflow-hidden">
              {/* Envelope Flap animation */}
              <div
                className={`absolute top-0 inset-x-0 h-24 bg-rose-900/40 border-b border-rose-400/50 origin-top transition-transform duration-700 ease-in-out ${
                  animStage === 'opening' ? '-rotate-180 opacity-40' : 'rotate-0'
                }`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              {/* Wax Seal */}
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500 border-2 border-amber-200 flex items-center justify-center shadow-xl transition-all duration-500 z-10 ${
                  animStage === 'opening' ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
              </div>

              <div className="absolute bottom-3 text-center">
                <span className="text-[11px] font-mono text-amber-200/90 tracking-widest uppercase">
                  {animStage === 'opening' ? 'Breaking Wax Seal...' : 'Opening Envelope...'}
                </span>
              </div>
            </div>

            <button
              onClick={handleSkipAnimation}
              className="text-xs text-rose-300 hover:text-white underline font-sans flex items-center gap-1 cursor-pointer"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Skip directly to letter</span>
            </button>
          </div>
        ) : (
          /* Scrollable Letter Content */
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 font-serif text-rose-100/90 leading-relaxed text-sm sm:text-base select-text"
          >
            <div className="p-4 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl bg-[#150820]/90 border border-purple-500/30 shadow-inner space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] sm:text-xs text-amber-300/80 font-mono tracking-wider italic pb-3 border-b border-purple-500/20 gap-1">
                <span>From: Ayush (Boys&apos; Hostel)</span>
                <span>To: Princess Shree (Girls&apos; Hostel)</span>
              </div>

              {/* Letter Text */}
              <div className="whitespace-pre-line leading-relaxed sm:leading-loose text-slate-100 text-sm sm:text-base font-serif">
                {displayedText}
              </div>

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center justify-between pt-3 border-t border-purple-500/20">
                  <div className="flex items-center gap-2 text-xs text-purple-300">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                    <span className="italic">Ayush is writing from the heart...</span>
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
        )}

        {/* Bottom Pinned Navigation Controls */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-purple-500/30 bg-black/50 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 text-purple-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Previous Letter</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <div className="text-center">
            <span className="text-[11px] sm:text-xs text-rose-300 font-serif font-medium block">
              With endless love, Ayush ❤️
            </span>
            <span className="text-[10px] text-purple-400/60 font-mono">
              {letter.orderIndex} of {totalLetters}
            </span>
          </div>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 border border-rose-400/40 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-rose-950/50"
          >
            <span className="hidden sm:inline">Next Letter</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
