'use client';

import React, { useState } from 'react';
import { Lock, Unlock, Key, Mail, Sparkles, Heart } from 'lucide-react';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';

interface PuzzleEnvelope {
  id: string;
  title: string;
  puzzleQuestion: string;
  hint: string;
  validAnswers: string[];
  secretMessage: string;
}

export default function UnlockLettersGame() {
  const [envelopes] = useState<PuzzleEnvelope[]>([
    {
      id: 'env-1',
      title: 'The Sacred Dawn Envelope',
      puzzleQuestion: 'Woh pavitra tyohaar jiske din hamari kahani shuru hui thi... Ganesh _______ ?',
      hint: 'Type the word (e.g. Chaturthi)',
      validAnswers: ['chaturthi', 'ganesh chaturthi'],
      secretMessage: 'Secret Letter #1: "Shree, 14 September 2026 ko jab Bappa ne tumhe meri kismat mein likha, us din se lekar aaj tak maine ek pal bhi aisa nahi bitaya jab tumhare liye mera pyaar badha na ho. Tum meri zindagi ka sabse pavitra sach ho."',
    },
    {
      id: 'env-2',
      title: 'The Classroom Desk Envelope',
      puzzleQuestion: 'Classroom mein hum roz lagbhag kitne ghante saath baithte hain? (Enter the digit)',
      hint: 'A single number (Hint: between 6 and 9)',
      validAnswers: ['8', 'eight', '8 hours', '8 ghante'],
      secretMessage: 'Secret Letter #2: "Woh 8 ghante sirf padhai ke nahi hote. Wo 8 ghante meri duniya ke sabse khoobsurat pal hote hain jab main tumhare bagal mein baith kar bina kuch bole bhi khud ko sabse ameer mehsoos karta hoon."',
    },
    {
      id: 'env-3',
      title: 'The Princess Sovereign Envelope',
      puzzleQuestion: 'Unscramble Ayush\'s favorite royal name: "E E R H S"',
      hint: 'Rearrange the letters...',
      validAnswers: ['shree'],
      secretMessage: 'Secret Letter #3: "Shree, chahe girls hostel aur boys hostel ke beech kitni bhi deewarein hon, chahe 5 PM ke baad curfew ho... yeh dil hamesha tumhare kamre ki khidki par pehra deta rahega. Happy Birthday my angel!"',
    },
  ]);

  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (id: string, val: string) => {
    setInputs((prev) => ({ ...prev, [id]: val }));
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const handleUnlockAttempt = (env: PuzzleEnvelope) => {
    const val = (inputs[env.id] || '').trim().toLowerCase();
    const isCorrect = env.validAnswers.some((ans) => ans.toLowerCase() === val);

    if (isCorrect) {
      sound.playEnvelopeOpen();
      const nextUnlocked = [...unlockedIds, env.id];
      setUnlockedIds(nextUnlocked);
      confetti({ particleCount: 60, spread: 50 });

      if (nextUnlocked.length === envelopes.length) {
        sound.playGrandCelebration();
      }
    } else {
      sound.playChime(250, 0.4);
      setErrors((prev) => ({ ...prev, [env.id]: 'Galat jawaab! Thoda dhyan se socho...' }));
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#1b0f2a] to-[#0c0616] border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] text-white">
      <div className="text-center max-w-lg mx-auto mb-8 space-y-2">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200">
          Unlock My Hidden Love Letters
        </h3>
        <p className="text-xs text-purple-200/80">
          Solve each relationship riddle to unseal the secret letter inside.
        </p>
      </div>

      <div className="space-y-6">
        {envelopes.map((env, idx) => {
          const isUnlocked = unlockedIds.includes(env.id);

          return (
            <div
              key={env.id}
              className={`p-6 rounded-2xl border transition-all duration-300 ${
                isUnlocked
                  ? 'bg-rose-950/40 border-rose-500/50 shadow-[0_0_25px_rgba(255,77,136,0.3)]'
                  : 'bg-black/40 border-purple-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-full ${
                      isUnlocked ? 'bg-rose-600 text-white' : 'bg-purple-900/50 text-purple-300'
                    }`}
                  >
                    {isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-300 uppercase">
                      Mystery Envelope #{idx + 1}
                    </span>
                    <h4 className="text-base font-serif font-bold text-white">{env.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-purple-300/70">
                  <Key className="w-3.5 h-3.5" />
                  <span>{isUnlocked ? 'Decrypted' : 'Encrypted'}</span>
                </div>
              </div>

              {!isUnlocked ? (
                <div className="space-y-3 pt-2">
                  <p className="text-sm text-purple-200 font-medium">
                    {env.puzzleQuestion}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder={env.hint}
                      value={inputs[env.id] || ''}
                      onChange={(e) => handleInputChange(env.id, e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-sm placeholder-purple-400/40 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                    <button
                      onClick={() => handleUnlockAttempt(env)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs font-semibold shadow cursor-pointer transition-all"
                    >
                      Unseal Envelope
                    </button>
                  </div>
                  {errors[env.id] && (
                    <p className="text-xs text-rose-400 font-medium">{errors[env.id]}</p>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#1c0c24] border border-rose-500/30 animate-fadeIn">
                  <div className="flex items-center gap-2 text-rose-300 text-xs font-serif font-semibold mb-2">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span>Secret Letter Content:</span>
                  </div>
                  <p className="text-sm font-serif italic text-rose-100/95 leading-relaxed">
                    {env.secretMessage}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
