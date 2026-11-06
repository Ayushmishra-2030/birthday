'use client';

import React, { useState, useEffect } from 'react';
import Starfield from '@/components/background/Starfield';
import FloatingPetals from '@/components/background/FloatingPetals';
import FloatingHearts from '@/components/background/FloatingHearts';
import CountdownWorld from '@/components/countdown/CountdownWorld';
import GrandBirthdayReveal from '@/components/reveal/GrandBirthdayReveal';
import LoveTimeline from '@/components/timeline/LoveTimeline';
import LettersSection from '@/components/letters/LettersSection';
import ScrapbookGallery from '@/components/scrapbook/ScrapbookGallery';
import GamesHub from '@/components/games/GamesHub';
import MemoryWall from '@/components/memory-wall/MemoryWall';
import ReasonsILoveYou from '@/components/reasons/ReasonsILoveYou';
import SpecialBirthdayMessage from '@/components/special-message/SpecialBirthdayMessage';
import FinalSurprise from '@/components/final-surprise/FinalSurprise';
import MusicPlayer from '@/components/audio/MusicPlayer';
import { Heart, Sparkles, Shield, RotateCcw, Menu, X, ArrowUp } from 'lucide-react';
import { sound } from '@/lib/sound';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>(null);
  const [enteredWorld, setEnteredWorld] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setContent(data);
    } catch (e) {
      console.error('Error fetching content', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // When preview code is verified or time reaches midnight
  const handleUnlocked = () => {
    fetchContent();
  };

  const handleEnterWorld = () => {
    sound.playGrandCelebration();
    setEnteredWorld(true);
    // Smooth scroll to timeline
    setTimeout(() => {
      const el = document.getElementById('our-story');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReplayReveal = () => {
    setEnteredWorld(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07040b] flex flex-col items-center justify-center text-white space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-rose-600/30 animate-ping absolute inset-0" />
          <Heart className="w-16 h-16 text-rose-500 fill-rose-500 animate-pulse relative z-10" />
        </div>
        <p className="text-sm font-serif text-rose-200 tracking-widest animate-pulse">
          Opening Shree&apos;s Little Universe...
        </p>
      </div>
    );
  }

  // Before 7 November and without preview code -> Show Countdown World only
  if (!content?.isUnlocked) {
    return (
      <main className="relative min-h-screen bg-[#07040c] text-white selection:bg-rose-500">
        <Starfield />
        <FloatingPetals />
        <FloatingHearts />
        <CountdownWorld
          targetIso={content?.targetIso || '2026-11-07T00:00:00+05:30'}
          onUnlocked={handleUnlocked}
        />
        <MusicPlayer />
      </main>
    );
  }

  // Unlocked experience!
  return (
    <main className="relative min-h-screen bg-[#07040c] text-white selection:bg-rose-500">
      {/* Live Animated Canvas Layers */}
      <Starfield />
      <FloatingPetals />
      <FloatingHearts />

      {/* Floating Music Player */}
      <MusicPlayer initialTitle={content?.settings?.bgMusicTitle} />

      {/* Admin / Preview Status Bar Banner */}
      {(content.isPreview || content.isAdmin) && (
        <div className="relative z-50 bg-gradient-to-r from-purple-950/95 via-rose-950/95 to-purple-950/95 border-b border-rose-500/40 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-rose-200 shadow-lg">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-semibold text-white">
              {content.isAdmin ? '👑 Admin Mode (Ayush)' : '✨ Secret Preview Mode Active'}
            </span>
            <span className="hidden sm:inline text-purple-300/80">
              — Public visitors without preview will see the locked countdown.
            </span>
          </div>

          <div className="flex items-center gap-2">
            {enteredWorld && (
              <button
                onClick={handleReplayReveal}
                className="px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 border border-purple-400/30 text-amber-300 text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                title="Re-play Birthday Reveal Animation"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Replay Birthday Reveal</span>
              </button>
            )}

            <a
              href="/admin"
              className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-[11px] shadow cursor-pointer transition-colors"
            >
              Open Admin Dashboard
            </a>
          </div>
        </div>
      )}

      {/* Grand Birthday Opening Sequence */}
      {!enteredWorld ? (
        <GrandBirthdayReveal
          onEnterWorld={handleEnterWorld}
          showAge20={content?.settings?.showAge20}
        />
      ) : (
        /* The Full Fairytale Universe */
        <div className="relative z-20 animate-fadeIn">
          {/* Main Navigation Bar */}
          <header className="sticky top-0 z-40 bg-[#0d0718]/90 border-b border-purple-500/20 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-purple-600 flex items-center justify-center shadow">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-base sm:text-lg font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200">
                Ayush & Shree
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-purple-200">
              <a href="#our-story" className="hover:text-rose-300 transition-colors">Our Story</a>
              <a href="#letters" className="hover:text-rose-300 transition-colors">15 Letters</a>
              <a href="#scrapbook" className="hover:text-rose-300 transition-colors">Scrapbook</a>
              <a href="#games" className="hover:text-rose-300 transition-colors">5 Games</a>
              <a href="#memory-wall" className="hover:text-rose-300 transition-colors">Memories</a>
              <a href="#reasons" className="hover:text-rose-300 transition-colors">30 Reasons</a>
              <a href="#special-letter" className="hover:text-rose-300 transition-colors">Special Epistle</a>
            </nav>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="fixed inset-x-0 top-14 z-40 bg-[#120820]/95 border-b border-purple-500/30 backdrop-blur-xl p-6 flex flex-col gap-4 text-sm font-medium text-purple-200 md:hidden animate-fadeIn">
              <a href="#our-story" onClick={() => setMobileMenuOpen(false)}>Our Story (Timeline)</a>
              <a href="#letters" onClick={() => setMobileMenuOpen(false)}>15 Romantic Letters</a>
              <a href="#scrapbook" onClick={() => setMobileMenuOpen(false)}>Photo Scrapbook</a>
              <a href="#games" onClick={() => setMobileMenuOpen(false)}>5 Romantic Games</a>
              <a href="#memory-wall" onClick={() => setMobileMenuOpen(false)}>Memory Wall</a>
              <a href="#reasons" onClick={() => setMobileMenuOpen(false)}>30 Reasons I Love You</a>
              <a href="#special-letter" onClick={() => setMobileMenuOpen(false)}>Special Birthday Epistle</a>
              <a href="#final-surprise" onClick={() => setMobileMenuOpen(false)}>Final Surprise 🗝️</a>
            </div>
          )}

          {/* Section C: Our Little Love Story (Timeline) */}
          <LoveTimeline events={content?.timeline || []} />

          {/* Section D: Letters From Ayush */}
          <LettersSection letters={content?.letters || []} />

          {/* Section E: Our Private-Looking Photo Scrapbook */}
          <ScrapbookGallery photos={content?.photos || []} />

          {/* Section F: Romantic Games & Quizzes (5 Games) */}
          <GamesHub quizQuestions={content?.quiz || []} />

          {/* Section G: The Memory Wall */}
          <MemoryWall quotes={content?.quotes || []} />

          {/* Section H: The Reasons I Love You (30 Reasons) */}
          <ReasonsILoveYou reasons={content?.reasons || []} />

          {/* Section I: A Special Birthday Message */}
          <SpecialBirthdayMessage />

          {/* Section J: The Final Surprise */}
          <FinalSurprise />

          {/* Romantic Fairytale Footer */}
          <footer className="relative py-16 px-4 border-t border-purple-500/20 text-center space-y-4 text-xs text-purple-300/70 font-sans z-20">
            <div className="flex items-center justify-center gap-2 text-rose-400">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span className="font-serif text-sm font-semibold text-rose-200">
                A World Made for Shree • Handcrafted with love by Ayush
              </span>
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>

            <p className="max-w-md mx-auto text-[11px] leading-relaxed">
              14 September 2026 (Ganesh Chaturthi) • 8 Hours in Class • 6 Hours on Calls • Same College Mentor • 5 PM Curfew • Infinite Love
            </p>

            <div className="pt-2 text-[10px] text-purple-400/50">
              © 2026 Ayush & Shree. All rights reserved in our little universe.
            </div>
          </footer>
        </div>
      )}
    </main>
  );
}

