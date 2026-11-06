'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Trophy, RotateCcw, Play, Sparkles, Timer } from 'lucide-react';
import { sound } from '@/lib/sound';
import confetti from 'canvas-confetti';

interface FallingObject {
  x: number;
  y: number;
  speed: number;
  type: 'roseHeart' | 'goldStar' | 'cloud';
  size: number;
}

export default function CatchHeartsGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  // Game internal state ref
  const gameStateRef = useRef({
    basketX: 200,
    basketWidth: 80,
    basketHeight: 20,
    score: 0,
    objects: [] as FallingObject[],
    animationFrameId: 0,
    isPlaying: false,
    speedMultiplier: 1,
  });

  const getDifficultyMultiplier = () => {
    switch (difficulty) {
      case 'easy':
        return 0.8;
      case 'hard':
        return 1.4;
      case 'medium':
      default:
        return 1.1;
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setIsPlaying(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    gameStateRef.current = {
      basketX: canvas.width / 2 - 40,
      basketWidth: 80,
      basketHeight: 22,
      score: 0,
      objects: [],
      animationFrameId: 0,
      isPlaying: true,
      speedMultiplier: getDifficultyMultiplier(),
    };

    sound.playSecretMystery();
    runGameLoop();
  };

  // Timer countdown
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    gameStateRef.current.isPlaying = false;
    cancelAnimationFrame(gameStateRef.current.animationFrameId);

    sound.playGrandCelebration();
    confetti({ particleCount: 120, spread: 80 });
  };

  const runGameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    function loop() {
      if (!gameStateRef.current.isPlaying) return;

      ctx!.clearRect(0, 0, width, height);

      // Spawn falling objects
      if (Math.random() < 0.05 * gameStateRef.current.speedMultiplier) {
        const rand = Math.random();
        let type: 'roseHeart' | 'goldStar' | 'cloud' = 'roseHeart';
        if (rand < 0.6) type = 'roseHeart';
        else if (rand < 0.85) type = 'goldStar';
        else type = 'cloud';

        gameStateRef.current.objects.push({
          x: Math.random() * (width - 30) + 15,
          y: -20,
          speed: (Math.random() * 2 + 2) * gameStateRef.current.speedMultiplier,
          type,
          size: type === 'goldStar' ? 14 : 18,
        });
      }

      // Draw Basket
      const basket = gameStateRef.current;
      ctx!.save();
      ctx!.fillStyle = '#ff4d88';
      ctx!.shadowBlur = 12;
      ctx!.shadowColor = '#ff4d88';
      ctx!.beginPath();
      ctx!.roundRect(basket.basketX, height - 35, basket.basketWidth, basket.basketHeight, 10);
      ctx!.fill();

      // Basket label
      ctx!.fillStyle = '#ffffff';
      ctx!.font = 'bold 10px sans-serif';
      ctx!.textAlign = 'center';
      ctx!.fillText('Shree\'s Heart', basket.basketX + basket.basketWidth / 2, height - 21);
      ctx!.restore();

      // Update & Draw Objects
      for (let i = basket.objects.length - 1; i >= 0; i--) {
        const obj = basket.objects[i];
        obj.y += obj.speed;

        // Collision Check with Basket
        const basketY = height - 35;
        if (
          obj.y + obj.size >= basketY &&
          obj.y <= basketY + basket.basketHeight &&
          obj.x >= basket.basketX - 10 &&
          obj.x <= basket.basketX + basket.basketWidth + 10
        ) {
          // Caught!
          if (obj.type === 'roseHeart') {
            sound.playHeartCatch();
            basket.score += 10;
          } else if (obj.type === 'goldStar') {
            sound.playChime(1100, 0.4);
            basket.score += 25;
          } else {
            sound.playChime(200, 0.3);
            basket.score = Math.max(0, basket.score - 10);
          }

          setScore(basket.score);
          basket.objects.splice(i, 1);
          continue;
        }

        // Draw Object
        ctx!.save();
        if (obj.type === 'roseHeart') {
          ctx!.fillStyle = '#ff4d88';
          ctx!.shadowBlur = 8;
          ctx!.shadowColor = '#ff4d88';
          ctx!.font = `${obj.size}px serif`;
          ctx!.fillText('❤️', obj.x, obj.y);
        } else if (obj.type === 'goldStar') {
          ctx!.fillStyle = '#fbbf24';
          ctx!.shadowBlur = 10;
          ctx!.shadowColor = '#fbbf24';
          ctx!.font = `${obj.size}px serif`;
          ctx!.fillText('⭐', obj.x, obj.y);
        } else {
          ctx!.fillStyle = '#94a3b8';
          ctx!.font = `${obj.size}px serif`;
          ctx!.fillText('🌧️', obj.x, obj.y);
        }
        ctx!.restore();

        // Remove if off-screen
        if (obj.y > height + 30) {
          basket.objects.splice(i, 1);
        }
      }

      gameStateRef.current.animationFrameId = requestAnimationFrame(loop);
    }

    loop();
  };

  // Track mouse / touch over canvas with proper coordinate scaling
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isPlaying) return;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    const x = (e.clientX - rect.left) * scale;
    const targetX = Math.max(0, Math.min(canvas.width - gameStateRef.current.basketWidth, x - gameStateRef.current.basketWidth / 2));
    gameStateRef.current.basketX = targetX;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#1c0f2a] to-[#0c0616] border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-purple-500/20 pb-4 mb-4">
        <div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200">
            Catch the Falling Hearts
          </h3>
          <p className="text-xs text-purple-200/80">
            Ayush ke dil se girte gulabi hearts aur sitaron ko pakdo!
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-950/80 border border-purple-500/30 font-mono text-xs text-amber-300">
            <Timer className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-950/80 border border-rose-500/30 font-mono text-xs text-rose-300">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>{score} pts</span>
          </div>
        </div>
      </div>

      {/* Difficulty selector when not playing */}
      {!isPlaying && !isGameOver && (
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xs text-purple-300">Difficulty:</span>
          {(['easy', 'medium', 'hard'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setDifficulty(lvl)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all cursor-pointer ${
                difficulty === lvl
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-purple-950/40 text-purple-300 hover:bg-purple-900/60'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      )}

      {/* Game Canvas */}
      <div className="relative w-full aspect-[4/3] max-h-[380px] bg-black/60 rounded-2xl border border-purple-500/30 overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={560}
          height={380}
          onPointerDown={handlePointerMove}
          onPointerMove={handlePointerMove}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />

        {/* Start Overlay */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-600/30 border border-rose-500 flex items-center justify-center">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400 animate-pulse" />
            </div>
            <h4 className="text-lg font-serif font-bold text-white">
              Ready to Catch Ayush&apos;s Love?
            </h4>
            <p className="text-xs text-purple-200/80 max-w-xs">
              Drag your basket or move your mouse to catch pink hearts (+10) and golden stars (+25). Avoid clouds!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(255,77,136,0.5)] flex items-center gap-2 cursor-pointer transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Game (30s)</span>
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn">
            <Trophy className="w-12 h-12 text-amber-300" />
            <h4 className="text-2xl font-serif font-bold text-white">
              Time&apos;s Up, My Princess!
            </h4>
            <p className="text-3xl font-mono font-extrabold text-amber-300">
              Final Score: {score}
            </p>
            <p className="text-xs md:text-sm text-rose-200/90 font-serif italic max-w-sm">
              {score >= 150
                ? 'Superhuman reflex! Shree caught almost every piece of Ayush\'s love! ❤️👑'
                : 'Tumne bohot pyara khela! Ayush ka dil ab puri tarah se tumhara hai! ✨'}
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

