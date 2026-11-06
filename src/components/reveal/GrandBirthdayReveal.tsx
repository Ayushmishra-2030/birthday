'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Mic, MicOff, Heart, Flame, ArrowDown, Star } from 'lucide-react';
import { sound } from '@/lib/sound';
import BirthdayCake from './BirthdayCake';

interface GrandBirthdayRevealProps {
  onEnterWorld: () => void;
  showAge20?: boolean;
}

export default function GrandBirthdayReveal({ onEnterWorld, showAge20 = false }: GrandBirthdayRevealProps) {
  // Reveal stages:
  // 1: Dark intro with expanding glowing heart
  // 2: Magic particles & gift box presentation
  // 3: Gift opened -> Birthday message & Cake reveal
  // 4: Candle blown -> Full Fireworks, Confetti & "Enter My World"
  const [stage, setStage] = useState<number>(1);
  const [isCandleBlown, setIsCandleBlown] = useState<boolean>(false);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneStreamRef = useRef<MediaStream | null>(null);
  const micIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto transition from dark screen (Stage 1) to Gift Presentation (Stage 2) after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(2);
      sound.playSecretMystery();
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  // Gift box click handler
  const handleOpenGift = () => {
    sound.playGrandCelebration();
    // Confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d88', '#ffd700', '#c084fc', '#ffffff'],
    });
    setStage(3);
  };

  // Blow candle handler
  const handleBlowCandle = () => {
    if (isCandleBlown) return;
    sound.playBlowCandle();
    setIsCandleBlown(true);

    // Stop microphone if running
    stopMicrophone();

    setTimeout(() => {
      sound.playGrandCelebration();
      // Massive Confetti Celebration
      const duration = 3.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const interval: NodeJS.Timeout = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
          colors: ['#ff4d88', '#f5c344', '#c084fc', '#f43f5e', '#ffffff'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
          colors: ['#ff4d88', '#f5c344', '#c084fc', '#f43f5e', '#ffffff'],
        });
      }, 250);

      setStage(4);
    }, 500);
  };

  // Microphone toggle for blowing out candle
  const toggleMicrophone = async () => {
    if (isListeningMic) {
      stopMicrophone();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListeningMic(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      micIntervalRef.current = setInterval(() => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        setMicVolume(avg);

        // If average volume exceeds blow threshold (puff of breath)
        if (avg > 55) {
          handleBlowCandle();
        }
      }, 100);
    } catch (err) {
      console.warn('Microphone permission denied or unsupported:', err);
      setIsListeningMic(false);
    }
  };

  const stopMicrophone = () => {
    if (micIntervalRef.current) clearInterval(micIntervalRef.current);
    if (microphoneStreamRef.current) {
      microphoneStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListeningMic(false);
    setMicVolume(0);
  };

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 text-center text-white z-20 overflow-hidden">
      {/* Stage 1: Cinematic Dark Screen with Pulsing Glowing Heart */}
      {stage === 1 && (
        <div className="flex flex-col items-center justify-center animate-fadeIn space-y-6">
          <div className="relative">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-rose-600/30 blur-3xl animate-ping" />
            <Heart className="w-24 h-24 md:w-36 md:h-36 text-rose-500 fill-rose-500 animate-pulse drop-shadow-[0_0_35px_rgba(255,77,136,0.9)]" />
          </div>
          <p className="font-serif text-lg md:text-2xl text-rose-200/90 tracking-widest animate-pulse">
            The universe is awakening for Shree...
          </p>
        </div>
      )}

      {/* Stage 2: Mystery Gift Box Awaiting Tap */}
      {stage === 2 && (
        <div className="flex flex-col items-center justify-center max-w-lg mx-auto space-y-6 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-amber-300 text-xs md:text-sm shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>A Royal Surprise for Princess Shree</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200">
            A Gift From Ayush
          </h2>

          <p className="text-sm md:text-base text-purple-200/80">
            Click on the magical box below to open your birthday surprise.
          </p>

          <button
            onClick={handleOpenGift}
            className="group relative p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#25153a] to-[#12081d] border-2 border-rose-500/50 shadow-[0_0_60px_rgba(255,77,136,0.4)] hover:shadow-[0_0_90px_rgba(255,77,136,0.8)] hover:scale-105 transition-all duration-500 cursor-pointer"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider shadow">
              Tap to Open ✨
            </div>
            <Gift className="w-24 h-24 md:w-32 md:h-32 text-rose-400 group-hover:text-amber-300 transition-colors animate-float-medium drop-shadow" />
            <div className="mt-4 flex items-center justify-center gap-2 text-rose-300 font-serif font-semibold text-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Khologe tabhi pata chalega...</span>
            </div>
          </button>
        </div>
      )}

      {/* Stage 3 & 4: Opened Gift, Glowing Text, Birthday Cake & Candles */}
      {(stage === 3 || stage === 4) && (
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto space-y-6 animate-fadeIn">
          {/* Glowing Birthday Greeting */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-rose-900/60 to-purple-900/60 border border-rose-400/40 text-amber-200 text-xs md:text-sm font-semibold tracking-wider uppercase shadow-xl animate-pulse">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>7 November 2026</span>
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-amber-200 to-purple-200 drop-shadow-[0_0_35px_rgba(255,77,136,0.8)] px-2 leading-tight">
              HAPPY BIRTHDAY, MY PRINCESS SHREE!
            </h1>

            <p className="text-base sm:text-xl md:text-2xl font-serif text-rose-200/95 italic px-2">
              From Ayush, with all the love in my little universe. ❤️
            </p>
          </div>

          {/* Interactive Handcrafted Birthday Cake */}
          <div className="relative my-2 sm:my-4 flex flex-col items-center w-full">
            <BirthdayCake
              isCandleBlown={isCandleBlown}
              onBlowCandle={handleBlowCandle}
              showAge20={showAge20}
            />

            {!isCandleBlown && (
              <div className="mt-3 flex items-center justify-center">
                <button
                  onClick={toggleMicrophone}
                  className={`px-4 py-2 rounded-full border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                    isListeningMic
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 animate-pulse'
                      : 'bg-purple-950/50 border-purple-400/30 text-purple-200 hover:bg-purple-900/60'
                  }`}
                  title="Toggle Microphone to blow candles with real breath"
                >
                  {isListeningMic ? (
                    <>
                      <Mic className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Listening... blow into mic ({Math.round(micVolume)}%)</span>
                    </>
                  ) : (
                    <>
                      <MicOff className="w-3.5 h-3.5 text-purple-300" />
                      <span>Or Blow into Microphone 🎙️</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Shown when candle is blown */}
          {isCandleBlown && (
            <div className="space-y-5 animate-fadeIn mt-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 to-purple-950/60 border border-rose-500/40 max-w-md mx-auto">
                <p className="text-base md:text-lg text-amber-200 font-serif font-bold">
                  Wish Made! May every dream of yours come true ❤️
                </p>
                <p className="text-xs text-rose-200/80 mt-1">
                  Har saans, har din, aur har pal tumhara sath... Happy Birthday Shree!
                </p>
              </div>

              {/* Enter My World Button */}
              <button
                onClick={onEnterWorld}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-bold text-base md:text-lg shadow-[0_0_40px_rgba(255,77,136,0.6)] hover:shadow-[0_0_60px_rgba(255,77,136,0.9)] hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-90 transition-transform" />
                <span>Enter My World (Hamari Duniya Mein Chalein ✨)</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

