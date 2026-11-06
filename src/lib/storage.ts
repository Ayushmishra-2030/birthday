import fs from 'fs';
import path from 'path';
import {
  initialLetters,
  initialTimelineEvents,
  initialMemoryQuotes,
  initialReasons,
  initialQuizQuestions,
  initialSiteSettings,
  initialPhotos,
} from '@/data/initialData';
import { Letter, TimelineEvent, MemoryQuote, ReasonItem, QuizQuestion, SiteSettings, Photo } from '@/types';

export interface DatabaseState {
  settings: SiteSettings;
  letters: Letter[];
  timeline: TimelineEvent[];
  quotes: MemoryQuote[];
  reasons: ReasonItem[];
  quiz: QuizQuestion[];
  photos: Photo[];
  lastUpdated: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data folder exists
export function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getDatabase(): DatabaseState {
  ensureDataDir();
  if (!fs.existsSync(DB_FILE)) {
    const initialState: DatabaseState = {
      settings: initialSiteSettings,
      letters: initialLetters,
      timeline: initialTimelineEvents,
      quotes: initialMemoryQuotes,
      reasons: initialReasons,
      quiz: initialQuizQuestions,
      photos: initialPhotos,
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
    return initialState;
  }

  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content) as DatabaseState;
    // merge in any missing keys gracefully
    return {
      settings: { ...initialSiteSettings, ...(parsed.settings || {}) },
      letters: parsed.letters || initialLetters,
      timeline: parsed.timeline || initialTimelineEvents,
      quotes: parsed.quotes || initialMemoryQuotes,
      reasons: parsed.reasons || initialReasons,
      quiz: parsed.quiz || initialQuizQuestions,
      photos: parsed.photos || initialPhotos,
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
    };
  } catch (err) {
    console.error('Error reading db.json, returning initial data', err);
    return {
      settings: initialSiteSettings,
      letters: initialLetters,
      timeline: initialTimelineEvents,
      quotes: initialMemoryQuotes,
      reasons: initialReasons,
      quiz: initialQuizQuestions,
      photos: initialPhotos,
      lastUpdated: new Date().toISOString(),
    };
  }
}

export function saveDatabase(data: Partial<DatabaseState>): DatabaseState {
  ensureDataDir();
  const current = getDatabase();
  const updated: DatabaseState = {
    ...current,
    ...data,
    settings: data.settings ? { ...current.settings, ...data.settings } : current.settings,
    lastUpdated: new Date().toISOString(),
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}

// Server-side Preview Code Rate Limiting
interface RateLimitEntry {
  attempts: number;
  lastAttemptTime: number;
  cooldownUntil: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkPreviewRateLimit(ip: string): { allowed: boolean; remainingAttempts: number; cooldownSeconds: number } {
  const now = Date.now();
  const MAX_ATTEMPTS = 5;
  const COOLDOWN_DURATION_MS = 2 * 60 * 1000; // 2 minutes

  let entry = rateLimitStore.get(ip);
  if (!entry) {
    entry = { attempts: 0, lastAttemptTime: now, cooldownUntil: 0 };
    rateLimitStore.set(ip, entry);
  }

  if (entry.cooldownUntil > now) {
    const cooldownSeconds = Math.ceil((entry.cooldownUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, cooldownSeconds };
  }

  // Reset if last attempt was longer than cooldown period ago
  if (now - entry.lastAttemptTime > COOLDOWN_DURATION_MS) {
    entry.attempts = 0;
  }

  return { allowed: true, remainingAttempts: Math.max(0, MAX_ATTEMPTS - entry.attempts), cooldownSeconds: 0 };
}

export function recordPreviewAttempt(ip: string, success: boolean): { remainingAttempts: number; cooldownSeconds: number } {
  const now = Date.now();
  const MAX_ATTEMPTS = 5;
  const COOLDOWN_DURATION_MS = 2 * 60 * 1000;

  let entry = rateLimitStore.get(ip);
  if (!entry) {
    entry = { attempts: 0, lastAttemptTime: now, cooldownUntil: 0 };
    rateLimitStore.set(ip, entry);
  }

  entry.lastAttemptTime = now;

  if (success) {
    entry.attempts = 0;
    entry.cooldownUntil = 0;
    return { remainingAttempts: MAX_ATTEMPTS, cooldownSeconds: 0 };
  }

  entry.attempts += 1;
  if (entry.attempts >= MAX_ATTEMPTS) {
    entry.cooldownUntil = now + COOLDOWN_DURATION_MS;
    return { remainingAttempts: 0, cooldownSeconds: COOLDOWN_DURATION_MS / 1000 };
  }

  return { remainingAttempts: MAX_ATTEMPTS - entry.attempts, cooldownSeconds: 0 };
}

// Cloud Storage (Supabase) or Persistent Local Public Uploads
export async function uploadScrapbookImage(
  buffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)?.trim();
  const bucket = process.env.SUPABASE_BUCKET || 'birthday-photos';

  const ext = path.extname(fileName).toLowerCase() || '.jpg';
  const cleanBase = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const uniqueName = `${Date.now()}_${cleanBase}${ext}`;

  // If Supabase is configured, upload to Supabase Storage Bucket
  if (supabaseUrl && supabaseKey) {
    try {
      const baseUrl = supabaseUrl.replace(/\/+$/, '');
      
      // Auto-ensure bucket exists
      try {
        await fetch(`${baseUrl}/storage/v1/bucket`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${supabaseKey}`,
            apikey: supabaseKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: bucket,
            name: bucket,
            public: true,
            file_size_limit: 26214400, // 25MB
            allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
          }),
        });
      } catch (e) {
        // Bucket may already exist
      }

      const uploadEndpoint = `${baseUrl}/storage/v1/object/${bucket}/${uniqueName}`;
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${supabaseKey}`,
          apikey: supabaseKey,
          'Content-Type': contentType || 'image/jpeg',
          'x-upsert': 'true',
        },
        body: new Uint8Array(buffer),
      });

      if (response.ok) {
        // Return permanent public URL
        const publicUrl = `${baseUrl}/storage/v1/object/public/${bucket}/${uniqueName}`;
        return publicUrl;
      }
      console.warn('Supabase upload failed, falling back to local persistent upload', await response.text());
    } catch (err) {
      console.warn('Error uploading to Supabase, falling back to local file storage', err);
    }
  }

  // Persistent Local Public Storage
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, uniqueName);
  fs.writeFileSync(filePath, buffer);

  // Return public relative URL that works everywhere
  return `/uploads/${uniqueName}`;
}
