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
  blocks?: Block[];
  sections?: Section[];
  partKey?: string;
  partLabel?: string;
  partTitle?: string;
  globalIndex?: number;
};

export type Part = {
  title: string;
  subtitle: string;
  chapters: Chapter[];
};

export type ResourceDoc = {
  id: string;
  title: string;
  filename: string;
  description: string;
  pages: string;
  fileSize: string;
  fileUrl: string;
  version: string;
  lastUpdated: string;
  partColor: string;
};

export type AppData = {
  title: string;
  subtitle: string;
  author: string;
  stats: { totalChapters: number; glossaryTerms: number; references: number };
  parts: Record<string, Part>;
  glossary: { term: string; definition: string }[];
  references: string[];
  resourceDocs?: ResourceDoc[];
};

export type Page = 'home' | 'toc' | 'chapter' | 'glossary' | 'search' | 'resources';

export const PART_ORDER = [
  { key: 'part1', label: 'Part I', cls: 'bg-blue-600' },
  { key: 'part2', label: 'Part II', cls: 'bg-purple-600' },
  { key: 'part3', label: 'Part III', cls: 'bg-emerald-600' },
  { key: 'appendices', label: 'Appendices', cls: 'bg-amber-600' },
] as const;
