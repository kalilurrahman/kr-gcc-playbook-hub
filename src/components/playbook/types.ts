export type Block = {
  type: string;
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: Record<string, string>[];
  style?: 'info' | 'warning' | 'success';
  level?: number;
  language?: string;
  code?: string;
};

export type Subsection = {
  title: string;
  blocks?: Block[];
};

export type Section = {
  title: string;
  isKeyTakeaway?: boolean;
  blocks?: Block[];
  subsections?: Subsection[];
};

export type Chapter = {
  id: string;
  title: string;
  chapterNumber?: number;
  displayTitle?: string;
  blocks?: Block[];
  sections?: Section[];
  partNumber?: number;
  partTitle?: string;
  globalIndex?: number;
};

export type PdfResource = {
  filename: string;
  fileUrl: string;
  fileSize: string;
  pages: string;
  version?: string;
};

export type PartData = {
  title: string;
  subtitle: string;
  partNumber: number;
  author: string;
  version: string;
  lastUpdated: string;
  pdfResource: PdfResource;
  chapters: Chapter[];
};

export type MasterIndexPart = {
  partNumber: number;
  title: string;
  subtitle: string;
  dataFile: string;
  chapterRange: { start: number; end: number };
  totalChapters: number;
  pdfResource: PdfResource;
};

export type MasterIndex = {
  title: string;
  subtitle: string;
  author: string;
  version: string;
  lastUpdated: string;
  parts: MasterIndexPart[];
  stats: {
    totalParts: number;
    totalChapters: number;
    totalPages: string;
  };
  branding: {
    portfolioUrl: string;
    playbookUrl: string;
    githubUrl: string;
    authorName: string;
    authorTitle: string;
  };
};

export type Page = 'home' | 'toc' | 'chapter' | 'glossary' | 'search' | 'resources';

export const PART_COLORS: Record<number, { bg: string; text: string; border: string; badge: string }> = {
  1: {
    bg: 'bg-blue-600',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  2: {
    bg: 'bg-purple-600',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  3: {
    bg: 'bg-emerald-600',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  4: {
    bg: 'bg-amber-600',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
};
