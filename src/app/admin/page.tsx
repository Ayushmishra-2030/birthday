'use client';

import React, { useState, useEffect } from 'react';
import { Lock, User, Key, Heart, Sparkles, ArrowRight } from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { sound } from '@/lib/sound';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Loaded full database content for the dashboard
  const [dashboardData, setDashboardData] = useState<any>(null);

  // Check existing session
  useEffect(() => {
    async function checkAuth() {
      try {
        const checkRes = await fetch('/api/auth/check');
        const checkData = await checkRes.json();

        if (checkData.isAdmin) {
          await loadFullData();
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        setIsAuthenticated(false);
      }
    }

    checkAuth();
  }, []);

  const loadFullData = async () => {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      setDashboardData(data);
    } catch (e) {
      console.error('Failed to load dashboard content', e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        sound.playGrandCelebration();
        await loadFullData();
        setIsAuthenticated(true);
      } else {
        sound.playChime(250, 0.4);
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Connection failed. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/check', { method: 'POST' });
      setIsAuthenticated(false);
    } catch (e) {}
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#07040c] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
          <span className="text-xs text-purple-300 font-mono tracking-wider">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated && dashboardData) {
    return (
      <AdminDashboard
        initialSettings={dashboardData.settings}
        initialPhotos={dashboardData.photos || []}
        initialLetters={dashboardData.letters || []}
        initialTimeline={dashboardData.timeline || []}
        initialQuotes={dashboardData.quotes || []}
        initialReasons={dashboardData.reasons || []}
        initialQuiz={dashboardData.quiz || []}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#13091e] via-[#0b0512] to-[#050208] flex items-center justify-center p-4 text-white">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#1c102a] to-[#0c0614] border border-purple-500/40 shadow-[0_0_60px_rgba(168,85,247,0.3)]">
        {/* Glow corner decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-purple-600 to-rose-600 flex items-center justify-center text-white shadow-lg mb-3 shadow-purple-500/30">
            <Key className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-purple-100 to-amber-200">
            Ayush Admin Portal
          </h2>
          <p className="text-xs text-purple-200/70 mt-1 font-sans">
            Manage Shree&apos;s birthday universe, letters, photographs, and settings.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-purple-300 font-medium mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ayush"
                autoFocus
                className="w-full px-4 py-3 pl-11 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
              />
              <User className="w-5 h-5 absolute left-3.5 top-3.5 text-purple-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-purple-300 font-medium mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 pl-11 rounded-xl bg-black/60 border border-purple-500/30 text-white placeholder-purple-400/40 focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
              />
              <Lock className="w-5 h-5 absolute left-3.5 top-3.5 text-purple-400" />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-rose-600 to-amber-600 hover:from-purple-500 hover:via-rose-500 hover:to-amber-500 text-white shadow-lg shadow-rose-900/40 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-purple-500/20 text-center">
          <a
            href="/"
            className="text-xs text-purple-300 hover:text-rose-300 transition-colors inline-flex items-center gap-1"
          >
            <span>&larr; Back to Birthday Experience</span>
          </a>
        </div>
      </div>
    </div>
  );
}

