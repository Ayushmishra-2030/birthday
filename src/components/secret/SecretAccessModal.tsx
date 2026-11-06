'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, Key, Lock, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/sound';

interface SecretAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SecretAccessModal({ isOpen, onClose, onSuccess }: SecretAccessModalProps) {
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/preview/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sound.playGrandCelebration();
        setSuccessMsg(data.message || 'Universe Unlocked!');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1200);
      } else {
        sound.playChime(220, 0.4);
        setError(data.message || 'Invalid Secret Code.');
        setRemainingAttempts(data.remainingAttempts ?? null);
        setCooldownSeconds(data.cooldownSeconds ?? null);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 600);
      }
    } catch (err) {
      setError('Connection failed. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-[#1c122c] to-[#0c0816] border border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.3)] text-white transition-transform ${
          isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''
        }`}
      >
        {/* Glow corner decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          title="Close (Esc)"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-rose-600 text-white shadow-lg mb-3 shadow-purple-500/30">
            <Key className="w-7 h-7" />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-purple-200 to-amber-200">
            The Secret Realm of Ayush
          </h3>
          <p className="text-xs text-purple-200/70 mt-1 font-sans">
            Sirf wahi enter kar sakta hai jiske paas Shree ke dil ki chabi hai...
          </p>
        </div>

        {successMsg ? (
          <div className="flex flex-col items-center py-6 text-center text-emerald-400">
            <CheckCircle2 className="w-12 h-12 mb-2 animate-bounce" />
            <p className="text-lg font-medium">{successMsg}</p>
            <p className="text-xs text-emerald-300/80 mt-1">Shree ka digital universe khul raha hai...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-purple-300/80 font-medium mb-1.5">
                Secret Preview Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter secret access code..."
                  autoFocus
                  disabled={loading || Boolean(cooldownSeconds && cooldownSeconds > 0)}
                  className="w-full px-4 py-3 pl-11 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-purple-300/40 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-sm"
                />
                <Lock className="w-5 h-5 absolute left-3.5 top-3.5 text-purple-400" />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div>
                  <p>{error}</p>
                  {remainingAttempts !== null && remainingAttempts > 0 && (
                    <p className="mt-1 text-purple-300 font-semibold">
                      Remaining attempts before cooldown: {remainingAttempts}
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !code.trim() || Boolean(cooldownSeconds && cooldownSeconds > 0)}
              className="w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 hover:from-purple-500 hover:via-rose-500 hover:to-amber-500 text-white shadow-lg shadow-rose-900/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Secret Passcode...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Unlock Universe</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-purple-300/50">
              Note: Unlocked preview sessions remain validated securely on server.
            </p>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
