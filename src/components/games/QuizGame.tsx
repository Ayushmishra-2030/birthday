'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/types';
import { CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles, Heart } from 'lucide-react';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';

interface QuizGameProps {
  questions: QuizQuestion[];
}

export default function QuizGame({ questions }: QuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sound.playHeartCatch();
      setScore((prev) => prev + 1);
    } else {
      sound.playChime(300, 0.4);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      sound.playGrandCelebration();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  // Personalized Romantic Result based on score
  const getRomanticFeedback = () => {
    const percentage = Math.round((score / questions.length) * 100);
    if (percentage >= 80) {
      return {
        title: 'Shree, You Know Ayush Like Nobody Else! ❤️👑',
        message: '100% Soulmate Connection! Tumhe hamari 14 September ki shuruaat, 8 ghante ki class, 6 ghante ki calls aur hostel ke unsaid rules sab kuch yaad hain. Ayush is the luckiest guy in the world!',
        badge: 'Soulmate Royal Tier',
      };
    } else if (percentage >= 50) {
      return {
        title: 'Very Close, My Princess! ✨',
        message: 'Bohot khoob! Hamari pyari yaadein tumhare dil mein basi hain. Lekin agli baar Ayush se call par 15 minute extra baat karke revision kar lena!',
        badge: 'Sweet Romantic Tier',
      };
    } else {
      return {
        title: 'Thoda Sa Punishment Due Hai! 😉',
        message: 'Lagta hai classroom mein padhai pe dhyan tha aur Ayush pe thoda kam! Lekin koi baat nahi, aaj tumhara birthday hai toh Ayush tumhe sab maaf karta hai!',
        badge: 'Cute Nakhrebaaz Tier',
      };
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#1c102a] to-[#0d0716] border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] text-white">
      {!isFinished ? (
        <div className="space-y-6">
          {/* Header & Progress */}
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Question {currentIndex + 1} of {questions.length}</span>
            </span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300">
              Score: {score}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-purple-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-100 min-h-[60px]">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let optionStyle = 'bg-black/40 border-purple-500/20 hover:border-rose-400 hover:bg-purple-950/40 text-purple-100';

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200';
                } else if (idx === selectedOption) {
                  optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  optionStyle = 'bg-black/20 border-transparent text-purple-300/40';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm md:text-base font-medium flex items-center justify-between transition-all duration-200 cursor-pointer ${optionStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs md:text-sm text-purple-200 space-y-3 animate-fadeIn">
              <p className="font-serif italic">&ldquo;{currentQ.explanation}&rdquo;</p>
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-semibold shadow-md transition-all cursor-pointer"
              >
                {currentIndex < questions.length - 1 ? 'Next Question →' : 'See My Romantic Score ✨'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Finished State */
        <div className="text-center space-y-6 py-4 animate-fadeIn">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-[0_0_35px_rgba(251,191,36,0.5)]">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-300 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30">
              {getRomanticFeedback().badge}
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200 pt-2">
              {getRomanticFeedback().title}
            </h3>
            <p className="text-4xl font-mono font-extrabold text-amber-300 py-1">
              {score} / {questions.length}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/30 max-w-lg mx-auto">
            <p className="text-sm md:text-base text-rose-100 font-serif italic leading-relaxed">
              &ldquo;{getRomanticFeedback().message}&rdquo;
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-full bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-200 font-medium text-sm inline-flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Quiz Again</span>
          </button>
        </div>
      )}
    </div>
  );
}
