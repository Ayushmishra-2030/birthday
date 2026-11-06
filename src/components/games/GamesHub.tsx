'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/types';
import QuizGame from './QuizGame';
import FindHeartGame from './FindHeartGame';
import UnlockLettersGame from './UnlockLettersGame';
import DarkFantasyQuiz from './DarkFantasyQuiz';
import CatchHeartsGame from './CatchHeartsGame';
import { Gamepad2, Heart, Search, Lock, Shield, Sparkles } from 'lucide-react';

interface GamesHubProps {
  quizQuestions: QuizQuestion[];
}

export default function GamesHub({ quizQuestions }: GamesHubProps) {
  const [activeTab, setActiveTab] = useState<'quiz' | 'find' | 'unlock' | 'fantasy' | 'catch'>('quiz');

  const games = [
    {
      id: 'quiz',
      title: 'How Well Do You Know Us?',
      desc: '15 Personalized Relationship Questions',
      icon: <Heart className="w-4 h-4 text-rose-400" />,
    },
    {
      id: 'find',
      title: 'Find My Heart',
      desc: 'Enchanted Hidden Object Search',
      icon: <Search className="w-4 h-4 text-amber-300" />,
    },
    {
      id: 'unlock',
      title: 'Unlock My Letters',
      desc: 'Solve Puzzles to Open Envelopes',
      icon: <Lock className="w-4 h-4 text-purple-300" />,
    },
    {
      id: 'fantasy',
      title: 'Dark Fantasy Love Realm',
      desc: 'Atmospheric Interactive Story Tale',
      icon: <Shield className="w-4 h-4 text-indigo-300" />,
    },
    {
      id: 'catch',
      title: 'Catch Falling Hearts',
      desc: 'Fast-Paced Romantic Arcade Game',
      icon: <Sparkles className="w-4 h-4 text-pink-400" />,
    },
  ];

  return (
    <section id="games" className="relative py-20 px-4 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-rose-300 text-xs md:text-sm">
          <Gamepad2 className="w-4 h-4 text-rose-400" />
          <span>Romantic Games & Quizzes</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200">
          5 Khel Sirf Hamare Pyaar Ke
        </h2>

        <p className="text-sm md:text-base text-purple-200/80 font-sans">
          Har ek game mein Ayush aur Shree ki real college story, 8 ghante classroom, 6 ghante calls aur hostel memories chhupe hain.
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 max-w-4xl mx-auto">
        {games.map((g) => (
          <button
            key={g.id}
            onClick={() => setActiveTab(g.id as typeof activeTab)}
            className={`px-4 py-2.5 rounded-2xl flex items-center gap-2 text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab === g.id
                ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-[0_0_25px_rgba(255,77,136,0.5)] scale-105 border border-rose-400/50'
                : 'bg-black/40 hover:bg-purple-950/50 text-purple-200 border border-purple-500/30'
            }`}
          >
            {g.icon}
            <span>{g.title}</span>
          </button>
        ))}
      </div>

      {/* Active Game Display */}
      <div className="transition-all duration-500">
        {activeTab === 'quiz' && <QuizGame questions={quizQuestions} />}
        {activeTab === 'find' && <FindHeartGame />}
        {activeTab === 'unlock' && <UnlockLettersGame />}
        {activeTab === 'fantasy' && <DarkFantasyQuiz />}
        {activeTab === 'catch' && <CatchHeartsGame />}
      </div>
    </section>
  );
}
