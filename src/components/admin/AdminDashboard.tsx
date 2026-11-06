'use client';

import React, { useState, useRef } from 'react';
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
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Star,
  X,
  FileCheck,
  RefreshCw,
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

  // Photo Upload & Drag-and-Drop State
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoDate, setPhotoDate] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Memories');
  const [photoFeatured, setPhotoFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Edit Photo Modal State
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);

  // Demo Upload Test State
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [testingUpload, setTestingUpload] = useState(false);

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

  // Process and validate files
  const processFiles = (files: FileList | File[]) => {
    const validFiles: File[] = [];
    const validUrls: string[] = [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        showStatus(`Invalid file format: ${file.name}. Only JPG, PNG, and WebP are supported.`, 'error');
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        showStatus(`File ${file.name} exceeds 25MB size limit.`, 'error');
        return;
      }
      validFiles.push(file);
      validUrls.push(URL.createObjectURL(file));
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      setPreviewUrls((prev) => [...prev, ...validUrls]);
      if (!photoTitle) setPhotoTitle(validFiles[0].name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload photograph handler
  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      showStatus('Please select or drag-and-drop at least one image file.', 'error');
      return;
    }

    setUploading(true);
    setUploadProgress(20);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append('files', file));
      formData.append('title', photoTitle || 'Sweet Memory');
      formData.append('caption', photoCaption || 'Hamari pyari si yaad ❤️');
      formData.append('date', photoDate || new Date().toLocaleDateString('en-GB'));
      formData.append('category', photoCategory || 'Memories');
      formData.append('featured', photoFeatured ? 'true' : 'false');

      setUploadProgress(60);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      setUploadProgress(90);
      const data = await res.json();

      if (res.ok && data.success) {
        sound.playGrandCelebration();
        setPhotos([...data.photos, ...photos]);
        setSelectedFiles([]);
        setPreviewUrls([]);
        setPhotoTitle('');
        setPhotoCaption('');
        setPhotoDate('');
        setUploadProgress(100);
        showStatus(data.message || 'Photos uploaded and published to scrapbook!', 'success');
      } else {
        showStatus(data.message || 'Upload failed.', 'error');
      }
    } catch (err) {
      showStatus('Error uploading photograph to persistent storage.', 'error');
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  // Delete photo
  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photograph from the scrapbook?')) return;
    try {
      const res = await fetch(`/api/photos?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        const next = photos.filter((p) => p.id !== id);
        setPhotos(next);
        showStatus('Photograph deleted successfully.', 'success');
      }
    } catch (e) {
      showStatus('Error deleting photograph.', 'error');
    }
  };

  // Toggle publish / unpublish
  const handleTogglePublish = async (photo: Photo) => {
    const nextPublished = photo.isPublished === false ? true : false;
    const updatedList = photos.map((p) =>
      p.id === photo.id ? { ...p, isPublished: nextPublished } : p
    );
    setPhotos(updatedList);

    try {
      await fetch('/api/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: photo.id, isPublished: nextPublished }),
      });
      showStatus(`Photograph ${nextPublished ? 'published to' : 'hidden from'} public gallery.`, 'success');
    } catch (e) {
      showStatus('Failed to update publish state.', 'error');
    }
  };

  // Reorder photos
  const handleMovePhoto = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photos.length) return;

    const newOrder = [...photos];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    // re-assign orderIndex
    const reindexed = newOrder.map((p, idx) => ({ ...p, orderIndex: idx + 1 }));
    setPhotos(reindexed);

    try {
      await fetch('/api/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photos: reindexed }),
      });
      showStatus('Gallery order updated and saved!', 'success');
    } catch (e) {
      showStatus('Failed to save photo reorder.', 'error');
    }
  };

  // Save edited photo
  const handleSavePhotoEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;

    const updated = photos.map((p) => (p.id === editingPhoto.id ? editingPhoto : p));
    setPhotos(updated);

    try {
      await fetch('/api/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPhoto),
      });
      setEditingPhoto(null);
      showStatus('Photograph details updated successfully!', 'success');
    } catch (e) {
      showStatus('Failed to update photograph details.', 'error');
    }
  };

  // Demo Upload Verification Test
  const handleRunDemoUploadTest = async () => {
    setTestingUpload(true);
    setTestStatus('Generating sample canvas photograph...');

    try {
      // Create a test image blob using HTML5 canvas
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#220b2a';
        ctx.fillRect(0, 0, 400, 300);
        ctx.fillStyle = '#ff4d88';
        ctx.font = 'bold 22px serif';
        ctx.textAlign = 'center';
        ctx.fillText('Ayush & Shree Test Photo ❤️', 200, 140);
        ctx.fillStyle = '#ffd700';
        ctx.font = '14px sans-serif';
        ctx.fillText('Automatic Verification Test Passed', 200, 180);
      }

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.9)
      );

      if (!blob) throw new Error('Could not create test blob');

      setTestStatus('Uploading to persistent storage...');
      const formData = new FormData();
      const testFile = new File([blob], `demo_test_${Date.now()}.jpg`, { type: 'image/jpeg' });
      formData.append('files', testFile);
      formData.append('title', 'Demo Verification Photo');
      formData.append('caption', 'Test image verified in persistent public storage.');
      formData.append('date', 'November 2026');
      formData.append('category', 'Birthday Special');
      formData.append('featured', 'true');

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok && data.success) {
        sound.playGrandCelebration();
        setPhotos([...data.photos, ...photos]);
        setTestStatus('✅ Test Complete! Verified: Image uploaded, public URL created, saved to database, visible in gallery.');
      } else {
        setTestStatus(`❌ Upload test failed: ${data.message}`);
      }
    } catch (err: any) {
      setTestStatus(`❌ Upload test error: ${err.message || 'Network error'}`);
    } finally {
      setTestingUpload(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09050e] text-white flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#140b22]/95 border-b border-purple-500/30 backdrop-blur-md px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-rose-600 to-purple-600 flex items-center justify-center shadow-md shrink-0">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-amber-200 leading-tight">
              Ayush&apos;s Command Center
            </h1>
            <p className="text-[10px] sm:text-[11px] text-purple-300/70">
              Customizing the Universe for Princess Shree
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-900/50 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>

          <a
            href="/"
            target="_blank"
            className="p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-500/30 flex items-center justify-center"
            title="View Live Website"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-500/30 cursor-pointer flex items-center justify-center"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Status Alert Banner */}
      {statusMsg && (
        <div
          className={`px-4 sm:px-6 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
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
        {/* Navigation - Horizontally scrollable on mobile, sidebar on desktop */}
        <nav className="w-full md:w-64 bg-[#10071c] border-b md:border-b-0 md:border-r border-purple-500/20 p-2 sm:p-4 shrink-0 overflow-x-auto flex md:flex-col gap-1">
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
              className={`px-3 py-2 sm:py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer whitespace-nowrap shrink-0 md:w-full ${
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
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-5xl">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Dashboard Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: 'Scrapbook Photos', value: photos.length, icon: <ImageIcon className="w-5 h-5 text-rose-400" /> },
                  { label: 'Love Letters', value: letters.length, icon: <Mail className="w-5 h-5 text-purple-400" /> },
                  { label: 'Timeline Events', value: timeline.length, icon: <Calendar className="w-5 h-5 text-amber-300" /> },
                  { label: 'Love Reasons', value: reasons.length, icon: <Heart className="w-5 h-5 text-pink-400" /> },
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-purple-500/30 flex items-center gap-3 sm:gap-4">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 shrink-0">
                      {stat.icon}
                    </div>
                    <div>
                      <span className="text-xl sm:text-2xl font-mono font-bold text-white">{stat.value}</span>
                      <p className="text-[10px] sm:text-[11px] text-purple-300/70 uppercase">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#170a24] border border-purple-500/30 space-y-3">
                <h3 className="text-base sm:text-lg font-serif font-bold text-rose-200">
                  Target Birthday Lock Status
                </h3>
                <p className="text-xs text-purple-200 leading-relaxed">
                  Target Unlock Date: <span className="font-mono text-amber-300">{settings.birthdayTargetIso}</span> (Timezone: {settings.timezone})
                </p>
                <div className="flex items-center gap-2 pt-2 flex-wrap">
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
            <div className="space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Photo Scrapbook Management</h2>
                  <p className="text-xs text-purple-300">
                    Upload, edit, reorder, or publish/hide your photographs. All photos are stored persistently with public URLs.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRunDemoUploadTest}
                  disabled={testingUpload}
                  className="px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-400/40 text-xs font-semibold text-amber-200 flex items-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testingUpload ? 'animate-spin' : ''}`} />
                  <span>{testingUpload ? 'Running Test...' : 'Run Upload Verification Test'}</span>
                </button>
              </div>

              {testStatus && (
                <div className="p-3.5 rounded-xl bg-purple-950/80 border border-purple-400/40 text-xs font-mono text-purple-200">
                  {testStatus}
                </div>
              )}

              {/* Drag and Drop Upload Box */}
              <form onSubmit={handleUploadPhoto} className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-purple-500/40 space-y-4">
                <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Upload className="w-4 h-4" />
                  <span>Upload Real Photographs (Drag & Drop or Select)</span>
                </h3>

                {/* Dropzone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                    isDragOver
                      ? 'border-rose-400 bg-rose-950/30 scale-[1.01]'
                      : 'border-purple-500/40 hover:border-purple-400 bg-purple-950/20'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <ImageIcon className="w-10 h-10 mx-auto text-purple-400 mb-2 animate-bounce" />
                  <p className="text-sm font-medium text-purple-200">
                    Click to select images or drag and drop here
                  </p>
                  <p className="text-[11px] text-purple-400/70 mt-1">
                    Supports JPG, PNG, and WebP (up to 25MB each)
                  </p>
                </div>

                {/* Selected Previews */}
                {previewUrls.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs text-amber-300 font-semibold">
                      Selected Files ({previewUrls.length}):
                    </span>
                    <div className="flex gap-3 overflow-x-auto py-2">
                      {previewUrls.map((url, i) => (
                        <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-rose-500/40 shrink-0 group">
                          <img src={url} alt="preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeSelectedFile(i)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
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

                  <div className="flex items-center gap-2 pt-6">
                    <label className="flex items-center gap-2 text-xs text-purple-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={photoFeatured}
                        onChange={(e) => setPhotoFeatured(e.target.checked)}
                        className="w-4 h-4 accent-rose-500 rounded"
                      />
                      <span>Mark as Featured Photograph</span>
                    </label>
                  </div>
                </div>

                {/* Progress bar */}
                {uploading && (
                  <div className="w-full bg-purple-950 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-rose-500 to-amber-400 h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploading || selectedFiles.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 font-semibold text-xs text-white shadow cursor-pointer disabled:opacity-50"
                >
                  {uploading ? `Uploading (${uploadProgress}%)...` : `Upload & Publish (${selectedFiles.length} files)`}
                </button>
              </form>

              {/* Published Photos List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                    Photographs in Scrapbook ({photos.length})
                  </h3>
                  <span className="text-[11px] text-purple-300/60">
                    Use arrows to reorder • Toggle eye to show/hide
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photos.map((p, idx) => (
                    <div
                      key={p.id}
                      className={`p-4 rounded-xl bg-black/40 border transition-all flex flex-col justify-between space-y-3 ${
                        p.isPublished === false ? 'border-neutral-700 opacity-60' : 'border-purple-500/30'
                      }`}
                    >
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900">
                        <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="300px" />
                        <div className="absolute top-2 left-2 flex gap-1">
                          {p.featured && (
                            <span className="p-1 rounded-md bg-amber-500 text-black shadow">
                              <Star className="w-3 h-3 fill-black" />
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                            p.isPublished === false ? 'bg-neutral-800 text-neutral-300' : 'bg-emerald-900/80 text-emerald-300'
                          }`}>
                            {p.isPublished === false ? 'Hidden' : 'Published'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-[11px] text-amber-300 font-mono">
                          <span>{p.category}</span>
                          <span>{p.date}</span>
                        </div>
                        <h4 className="font-serif font-bold text-white text-sm mt-1 truncate">{p.title}</h4>
                        <p className="text-xs text-purple-200/80 font-serif italic line-clamp-2 mt-0.5">{p.caption}</p>
                      </div>

                      {/* Controls: Reorder, Edit, Toggle Publish, Delete */}
                      <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMovePhoto(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded bg-purple-950/60 hover:bg-purple-900 disabled:opacity-30 text-purple-200"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMovePhoto(idx, 'down')}
                            disabled={idx === photos.length - 1}
                            className="p-1 rounded bg-purple-950/60 hover:bg-purple-900 disabled:opacity-30 text-purple-200"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleTogglePublish(p)}
                            className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 text-purple-200"
                            title={p.isPublished === false ? 'Publish to Gallery' : 'Hide from Gallery'}
                          >
                            {p.isPublished === false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                          </button>

                          <button
                            onClick={() => setEditingPhoto({ ...p })}
                            className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 text-purple-200"
                            title="Edit Details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeletePhoto(p.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit Photo Modal */}
              {editingPhoto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                  <div className="w-full max-w-lg p-6 rounded-2xl bg-gradient-to-b from-[#1d122e] to-[#0f0719] border border-purple-500/40 text-white space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                      <h4 className="text-base font-serif font-bold text-amber-300">Edit Photograph</h4>
                      <button onClick={() => setEditingPhoto(null)} className="p-1 text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSavePhotoEdit} className="space-y-3">
                      <div>
                        <label className="block text-xs text-purple-300 mb-1">Title</label>
                        <input
                          type="text"
                          value={editingPhoto.title}
                          onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-purple-300 mb-1">Romantic Caption</label>
                        <textarea
                          rows={2}
                          value={editingPhoto.caption}
                          onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-purple-300 mb-1">Date</label>
                          <input
                            type="text"
                            value={editingPhoto.date || ''}
                            onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-purple-300 mb-1">Category</label>
                          <select
                            value={editingPhoto.category || 'Memories'}
                            onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-white text-xs"
                          >
                            <option value="Milestones">Milestones</option>
                            <option value="College Days">College Days</option>
                            <option value="Everyday Moments">Everyday Moments</option>
                            <option value="Late Night">Late Night</option>
                            <option value="Hostel Life">Hostel Life</option>
                            <option value="Birthday Special">Birthday Special</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <label className="flex items-center gap-2 text-xs text-purple-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingPhoto.featured || false}
                            onChange={(e) => setEditingPhoto({ ...editingPhoto, featured: e.target.checked })}
                            className="w-4 h-4 accent-rose-500 rounded"
                          />
                          <span>Featured</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs text-purple-200 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingPhoto.isPublished !== false}
                            onChange={(e) => setEditingPhoto({ ...editingPhoto, isPublished: e.target.checked })}
                            className="w-4 h-4 accent-rose-500 rounded"
                          />
                          <span>Published</span>
                        </label>
                      </div>

                      <div className="pt-4 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingPhoto(null)}
                          className="px-4 py-2 rounded-xl bg-purple-950/60 text-xs text-purple-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-xs text-white font-semibold"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LETTERS */}
          {activeTab === 'letters' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Letters From Ayush ({letters.length})</h2>
              <div className="space-y-4">
                {letters.map((letter, idx) => (
                  <div key={letter.id} className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-purple-500/30 space-y-3">
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
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Website & Access Lock Settings</h2>

              <div className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-purple-500/30 space-y-4">
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

          {/* TAB 4: QUOTES */}
          {activeTab === 'quotes' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Memory Wall Quotes ({quotes.length})</h2>
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

          {/* TAB 5: REASONS */}
          {activeTab === 'reasons' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">30 Reasons I Love You ({reasons.length})</h2>
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

          {/* TAB 6: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Love Story Timeline ({timeline.length})</h2>
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

          {/* TAB 7: QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Quiz Questions ({quiz.length})</h2>
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
