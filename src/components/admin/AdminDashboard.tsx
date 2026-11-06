'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Photo,
  Letter,
  TimelineEvent,
  MemoryQuote,
  ReasonItem,
  QuizQuestion,
  SiteSettings,
} from '@/types';
import {
  Upload,
  Image as ImageIcon,
  Mail,
  Calendar,
  MessageSquareHeart,
  Heart,
  Gamepad2,
  Settings,
  Trash2,
  Edit3,
  Plus,
  Save,
  LogOut,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { sound } from '@/lib/sound';

interface AdminDashboardProps {
  initialSettings: SiteSettings;
  initialPhotos: Photo[];
  initialLetters: Letter[];
  initialTimeline: TimelineEvent[];
  initialQuotes: MemoryQuote[];
  initialReasons: ReasonItem[];
  initialQuiz: QuizQuestion[];
  onLogout: () => void;
}

export default function AdminDashboard({
  initialSettings,
  initialPhotos,
  initialLetters,
  initialTimeline,
  initialQuotes,
  initialReasons,
  initialQuiz,
  onLogout,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'photos' | 'letters' | 'timeline' | 'quotes' | 'reasons' | 'quiz' | 'settings'
  >('overview');

  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [letters, setLetters] = useState<Letter[]>(initialLetters);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(initialTimeline);
  const [quotes, setQuotes] = useState<MemoryQuote[]>(initialQuotes);
  const [reasons, setReasons] = useState<ReasonItem[]>(initialReasons);
  const [quiz, setQuiz] = useState<QuizQuestion[]>(initialQuiz);

  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);

  // Photo Upload State
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoDate, setPhotoDate] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Memories');
  const [photoFeatured, setPhotoFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const showStatus = (text: string, type: 'success' | 'error') => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Save full state to server
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings,
          letters,
          timeline,
          quotes,
          reasons,
          quiz,
          photos,
        }),
      });

      if (res.ok) {
        sound.playGrandCelebration();
        showStatus('All changes saved and live immediately!', 'success');
      } else {
        const err = await res.json();
        showStatus(err.error || 'Failed to save changes.', 'error');
      }
    } catch (e) {
      showStatus('Network error while saving.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Handle Photo selection for upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFiles(e.target.files);
      const urls: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        urls.push(URL.createObjectURL(e.target.files[i]));
      }
      setPreviewUrls(urls);
    }
  };

  // Upload photograph handler
  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFiles || uploadFiles.length === 0) {
      showStatus('Please select at least one photograph to upload.', 'error');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < uploadFiles.length; i++) {
        formData.append('files', uploadFiles[i]);
      }
      formData.append('title', photoTitle || 'Sweet Memory');
      formData.append('caption', photoCaption || 'Hamari pyari si yaad ❤️');
      formData.append('date', photoDate || new Date().toLocaleDateString('en-GB'));
      formData.append('category', photoCategory || 'Memories');
      formData.append('featured', photoFeatured ? 'true' : 'false');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        sound.playGrandCelebration();
        setPhotos([...data.photos, ...photos]);
        setUploadFiles(null);
        setPreviewUrls([]);
        setPhotoTitle('');
        setPhotoCaption('');
        showStatus(data.message || 'Photos uploaded successfully!', 'success');
      } else {
        showStatus(data.message || 'Upload failed.', 'error');
      }
    } catch (err) {
      showStatus('Error uploading photo.', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Delete photo
  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photograph from the scrapbook?')) return;
    try {
      const res = await fetch(`/api/photos?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPhotos(photos.filter((p) => p.id !== id));
        showStatus('Photograph deleted successfully.', 'success');
      }
    } catch (e) {
      showStatus('Error deleting photograph.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#09050e] text-white flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#140b22]/90 border-b border-purple-500/30 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-purple-600 flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200">
              Ayush&apos;s Command Center
            </h1>
            <p className="text-[11px] text-purple-300/70">
              Customizing the Digital Universe for Princess Shree
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-900/50 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>

          <a
            href="/"
            target="_blank"
            className="p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-500/30"
            title="View Live Website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-500/30 cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Status Alert Banner */}
      {statusMsg && (
        <div
          className={`px-6 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            statusMsg.type === 'success'
              ? 'bg-emerald-950 border-b border-emerald-500 text-emerald-200'
              : 'bg-rose-950 border-b border-rose-500 text-rose-200'
          }`}
        >
          {statusMsg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <nav className="w-full md:w-64 bg-[#10071c] border-r border-purple-500/20 p-4 space-y-1 shrink-0">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'photos', label: 'Photo Scrapbook', icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'letters', label: 'Letters Management', icon: <Mail className="w-4 h-4" /> },
            { id: 'timeline', label: 'Love Story Timeline', icon: <Calendar className="w-4 h-4" /> },
            { id: 'quotes', label: 'Memory Wall Quotes', icon: <MessageSquareHeart className="w-4 h-4" /> },
            { id: 'reasons', label: '30 Reasons I Love You', icon: <Heart className="w-4 h-4" /> },
            { id: 'quiz', label: 'Quiz & Games', icon: <Gamepad2 className="w-4 h-4" /> },
            { id: 'settings', label: 'Birthday & Lock Settings', icon: <Settings className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-3 transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-rose-600/30 to-purple-600/30 border border-rose-500/50 text-white font-semibold'
                  : 'text-purple-300 hover:bg-purple-950/40 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-5xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white">Dashboard Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Scrapbook Photos', value: photos.length, icon: <ImageIcon className="w-5 h-5 text-rose-400" /> },
                  { label: 'Love Letters', value: letters.length, icon: <Mail className="w-5 h-5 text-purple-400" /> },
                  { label: 'Timeline Events', value: timeline.length, icon: <Calendar className="w-5 h-5 text-amber-300" /> },
                  { label: 'Love Reasons', value: reasons.length, icon: <Heart className="w-5 h-5 text-pink-400" /> },
                ].map((stat, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-purple-500/30 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30">
                      {stat.icon}
                    </div>
                    <div>
                      <span className="text-2xl font-mono font-bold text-white">{stat.value}</span>
                      <p className="text-[11px] text-purple-300/70 uppercase">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Status Box */}
              <div className="p-6 rounded-2xl bg-[#170a24] border border-purple-500/30 space-y-3">
                <h3 className="text-lg font-serif font-bold text-rose-200">
                  Target Birthday Lock Status
                </h3>
                <p className="text-xs text-purple-200 leading-relaxed">
                  Target Unlock Date: <span className="font-mono text-amber-300">{settings.birthdayTargetIso}</span> (Timezone: {settings.timezone})
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    settings.unlockOverride
                      ? 'bg-amber-950 border border-amber-500 text-amber-200'
                      : 'bg-rose-950 border border-rose-500 text-rose-200'
                  }`}>
                    {settings.unlockOverride ? '🔓 Admin Testing Override: UNLOCKED FOR ALL' : '🔒 Strict Mode: Locked until midnight Nov 7'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-white">Photo Scrapbook Management</h2>
                  <p className="text-xs text-purple-300">
                    Upload images from your device. They are stored persistently with public URLs so Shree can see them from anywhere!
                  </p>
                </div>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleUploadPhoto} className="p-6 rounded-2xl bg-black/40 border border-purple-500/40 space-y-4">
                <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>Upload New Photographs</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-purple-300 mb-1">Select Image(s)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="w-full text-xs text-purple-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-purple-300 mb-1">Memory Title</label>
                    <input
                      type="text"
                      value={photoTitle}
                      onChange={(e) => setPhotoTitle(e.target.value)}
                      placeholder="e.g. Lunch in College Campus"
                      className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-purple-300 mb-1">Romantic Caption (Hinglish)</label>
                    <textarea
                      value={photoCaption}
                      onChange={(e) => setPhotoCaption(e.target.value)}
                      placeholder="e.g. Saath mein baith kar khana khana... agar Shree na khaye toh Ayush ka bhi mann nahi karta ❤️"
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-purple-300 mb-1">Date</label>
                    <input
                      type="text"
                      value={photoDate}
                      onChange={(e) => setPhotoDate(e.target.value)}
                      placeholder="e.g. October 2026"
                      className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-purple-300 mb-1">Category</label>
                    <select
                      value={photoCategory}
                      onChange={(e) => setPhotoCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-xs"
                    >
                      <option value="Milestones">Milestones (14 Sept)</option>
                      <option value="College Days">College Days (8 Hours)</option>
                      <option value="Everyday Moments">Everyday Moments (Lunch)</option>
                      <option value="Late Night">Late Night (6 Hour Calls)</option>
                      <option value="Hostel Life">Hostel Life (Curfew)</option>
                      <option value="Birthday Special">Birthday Special</option>
                    </select>
                  </div>
                </div>

                {/* Previews */}
                {previewUrls.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {previewUrls.map((url, i) => (
                      <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-rose-500/40 shrink-0">
                        <img src={url} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 font-semibold text-xs text-white shadow cursor-pointer disabled:opacity-50"
                >
                  {uploading ? 'Uploading to Persistent Public Storage...' : 'Upload & Publish to Scrapbook'}
                </button>
              </form>

              {/* Existing Photos List */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-white">
                  Published Scrapbook Photos ({photos.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photos.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl bg-black/40 border border-purple-500/30 flex flex-col justify-between space-y-3">
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900">
                        <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="300px" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono">
                          <span>{p.category}</span>
                          <span>{p.date}</span>
                        </div>
                        <h4 className="font-serif font-bold text-white text-sm mt-1">{p.title}</h4>
                        <p className="text-xs text-purple-200/80 font-serif italic line-clamp-2 mt-0.5">{p.caption}</p>
                      </div>
                      <div className="pt-2 border-t border-purple-500/20 flex items-center justify-end">
                        <button
                          onClick={() => handleDeletePhoto(p.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LETTERS */}
          {activeTab === 'letters' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white">Letters From Ayush ({letters.length})</h2>
              <div className="space-y-4">
                {letters.map((letter, idx) => (
                  <div key={letter.id} className="p-5 rounded-2xl bg-black/40 border border-purple-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-amber-300">
                        Letter #{idx + 1} ({letter.envelopeTheme} envelope)
                      </span>
                    </div>
                    <input
                      type="text"
                      value={letter.title}
                      onChange={(e) => {
                        const updated = [...letters];
                        updated[idx].title = e.target.value;
                        setLetters(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-white text-sm font-bold font-serif"
                    />
                    <input
                      type="text"
                      value={letter.subtitle}
                      onChange={(e) => {
                        const updated = [...letters];
                        updated[idx].subtitle = e.target.value;
                        setLetters(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs italic"
                    />
                    <textarea
                      rows={5}
                      value={letter.content}
                      onChange={(e) => {
                        const updated = [...letters];
                        updated[idx].content = e.target.value;
                        setLetters(updated);
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-purple-950/40 border border-purple-500/30 text-rose-100 text-xs font-serif leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS & LOCK */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-white">Website & Access Lock Settings</h2>

              <div className="p-6 rounded-2xl bg-black/40 border border-purple-500/30 space-y-4">
                <h3 className="text-base font-serif font-bold text-amber-300">
                  Secret Preview Mode Configuration
                </h3>
                <div>
                  <label className="block text-xs text-purple-300 mb-1">
                    Secret Preview Access Code (Ayush&apos;s 3-Click Code)
                  </label>
                  <input
                    type="text"
                    value={settings.secretPreviewCode}
                    onChange={(e) => setSettings({ ...settings, secretPreviewCode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-sm font-mono"
                  />
                  <p className="text-[11px] text-purple-400 mt-1">
                    Entering this code in the secret modal unlocks the entire website before Nov 7.
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-500/20">
                  <h3 className="text-base font-serif font-bold text-rose-300 mb-2">
                    Testing Mode (Override Birthday Lock)
                  </h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.unlockOverride}
                      onChange={(e) => setSettings({ ...settings, unlockOverride: e.target.checked })}
                      className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
                    />
                    <span className="text-xs text-white font-medium">
                      Unlock Website Globally (Bypass Countdown for Testing)
                    </span>
                  </label>
                  <p className="text-[11px] text-purple-400 mt-1">
                    When checked, anyone opening the site sees the unlocked birthday experience. When unchecked, visitors before 7 Nov 2026 see ONLY the Countdown World.
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-500/20">
                  <label className="block text-xs text-purple-300 mb-1">
                    Target Birthday ISO Timestamp (Asia/Kolkata)
                  </label>
                  <input
                    type="text"
                    value={settings.birthdayTargetIso}
                    onChange={(e) => setSettings({ ...settings, birthdayTargetIso: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4, 5, 6, 7: Quotes, Reasons, Timeline, Quiz */}
          {activeTab === 'quotes' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white">Memory Wall Quotes ({quotes.length})</h2>
              {quotes.map((q, i) => (
                <div key={q.id} className="p-4 rounded-xl bg-black/40 border border-purple-500/30 space-y-2">
                  <input
                    type="text"
                    value={q.context}
                    onChange={(e) => {
                      const updated = [...quotes];
                      updated[i].context = e.target.value;
                      setQuotes(updated);
                    }}
                    className="px-3 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-amber-300 text-xs font-mono"
                  />
                  <textarea
                    rows={2}
                    value={q.quote}
                    onChange={(e) => {
                      const updated = [...quotes];
                      updated[i].quote = e.target.value;
                      setQuotes(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded bg-purple-950/40 border border-purple-500/30 text-rose-100 text-xs font-serif"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reasons' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white">30 Reasons I Love You ({reasons.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reasons.map((r, i) => (
                  <div key={r.id} className="p-4 rounded-xl bg-black/40 border border-purple-500/30 space-y-1">
                    <span className="text-xs font-mono text-amber-300">Reason #{r.number}</span>
                    <input
                      type="text"
                      value={r.title}
                      onChange={(e) => {
                        const updated = [...reasons];
                        updated[i].title = e.target.value;
                        setReasons(updated);
                      }}
                      className="w-full px-2 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-white text-xs font-serif font-bold"
                    />
                    <textarea
                      rows={2}
                      value={r.description}
                      onChange={(e) => {
                        const updated = [...reasons];
                        updated[i].description = e.target.value;
                        setReasons(updated);
                      }}
                      className="w-full px-2 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white">Love Story Timeline ({timeline.length})</h2>
              {timeline.map((evt, i) => (
                <div key={evt.id} className="p-4 rounded-xl bg-black/40 border border-purple-500/30 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={evt.date}
                      onChange={(e) => {
                        const updated = [...timeline];
                        updated[i].date = e.target.value;
                        setTimeline(updated);
                      }}
                      className="px-2 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-amber-300 text-xs font-mono"
                    />
                    <input
                      type="text"
                      value={evt.title}
                      onChange={(e) => {
                        const updated = [...timeline];
                        updated[i].title = e.target.value;
                        setTimeline(updated);
                      }}
                      className="flex-1 px-2 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-white text-xs font-bold font-serif"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={evt.description}
                    onChange={(e) => {
                      const updated = [...timeline];
                      updated[i].description = e.target.value;
                      setTimeline(updated);
                    }}
                    className="w-full px-2 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs"
                  />
                  <textarea
                    rows={2}
                    value={evt.romanticNote}
                    onChange={(e) => {
                      const updated = [...timeline];
                      updated[i].romanticNote = e.target.value;
                      setTimeline(updated);
                    }}
                    className="w-full px-2 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-rose-200 text-xs italic font-serif"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-white">Quiz Questions ({quiz.length})</h2>
              {quiz.map((q, i) => (
                <div key={q.id} className="p-4 rounded-xl bg-black/40 border border-purple-500/30 space-y-2">
                  <span className="text-xs text-amber-300 font-mono">Question {i + 1}</span>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...quiz];
                      updated[i].question = e.target.value;
                      setQuiz(updated);
                    }}
                    className="w-full px-2 py-1 rounded bg-purple-950/40 border border-purple-500/30 text-white text-xs font-bold"
                  />
                  <p className="text-[11px] text-emerald-400">Correct Option: {q.options[q.correctIndex]}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
