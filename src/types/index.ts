export interface Photo {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  date?: string;
  category?: string;
  featured?: boolean;
  isPublished?: boolean;
  orderIndex?: number;
  createdAt?: string;
}

export interface Letter {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  envelopeTheme?: 'rose' | 'lavender' | 'gold' | 'wine';
  orderIndex: number;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  romanticNote: string;
  iconName: 'Heart' | 'Sparkles' | 'Calendar' | 'Coffee' | 'Clock' | 'Moon' | 'BookOpen' | 'Flame';
  orderIndex: number;
}

export interface MemoryQuote {
  id: string;
  quote: string;
  context: string;
  heartsCount: number;
  orderIndex: number;
}

export interface ReasonItem {
  id: string;
  number: number;
  title: string;
  description: string;
  category: 'Everyday' | 'College' | 'Hostel' | 'Heart';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DarkFantasyQuestion {
  id: string;
  chapter: string;
  title: string;
  question: string;
  scenario: string;
  options: {
    text: string;
    affinity: 'moon' | 'rose' | 'starlight' | 'shadow';
    lore: string;
  }[];
}

export interface SiteSettings {
  birthdayTargetIso: string;
  timezone: string;
  girlfriendName: string;
  boyfriendName: string;
  relationshipStartDate: string;
  secretPreviewCode: string;
  unlockOverride: boolean;
  musicAutoPlayPrompt: boolean;
  bgMusicTitle: string;
  bgMusicUrl: string;
  showAge20?: boolean;
}

export interface PreviewAuthResponse {
  success: boolean;
  message: string;
  token?: string;
  remainingAttempts?: number;
  cooldownSeconds?: number;
}

