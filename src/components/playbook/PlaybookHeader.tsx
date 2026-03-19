import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { BookOpen, Home, List, Search, FileText, Download, Sun, Moon } from 'lucide-react';
import type { Page } from './types';

interface PlaybookHeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
}

const NAV_ITEMS: { page: Page; label: string; icon: typeof Home }[] = [
  { page: 'home', label: 'Home', icon: Home },
  { page: 'toc', label: 'Contents', icon: List },
  { page: 'resources', label: 'Downloads', icon: Download },
  { page: 'glossary', label: 'Glossary', icon: BookOpen },
  { page: 'search', label: 'Search', icon: Search },
];

export function PlaybookHeader({ currentPage, onNavigate, fontSize, onFontSizeChange }: PlaybookHeaderProps) {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 header-glass border-b border-border px-4 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <button
          onClick={() => onNavigate('home')}
          className="font-bold text-foreground text-sm md:text-base tracking-tight flex items-center gap-2 shrink-0"
        >
          <FileText className="w-5 h-5 text-primary" />
          <span className="hidden sm:inline gradient-text">GCC Playbook</span>
        </button>

        <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
          {NAV_ITEMS.map(({ page, label, icon: Icon }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                currentPage === page
                  ? 'gradient-bg text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Font size controls */}
          <div className="hidden md:flex items-center gap-0.5 border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => onFontSizeChange(Math.max(12, fontSize - 1))}
              className="px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
              aria-label="Decrease font size"
            >
              A−
            </button>
            <span className="px-1.5 py-1.5 text-xs text-muted-foreground border-x border-border">{fontSize}</span>
            <button
              onClick={() => onFontSizeChange(Math.min(20, fontSize + 1))}
              className="px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition"
              aria-label="Increase font size"
            >
              A+
            </button>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg border border-border text-xs transition hover:bg-muted/50"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Back to Hub */}
          <button
            onClick={() => navigate('/')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border transition whitespace-nowrap"
          >
            ← Hub
          </button>
        </div>
      </div>
    </header>
  );
}
