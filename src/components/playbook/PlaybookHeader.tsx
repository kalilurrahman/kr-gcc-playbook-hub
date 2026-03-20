import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import {
  Home, List, Search, Download, BookOpen, Sun, Moon, Menu, X,
  ExternalLink, FileText, ChevronDown, ChevronRight,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import type { Page, MasterIndex } from './types';

interface PlaybookHeaderProps {
  currentPage: Page;
  onNavigate: (page: Page, chapterIdx?: number) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  masterIndex?: MasterIndex | null;
  chaptersByPart?: Record<number, { title: string; globalIdx: number }[]>;
}

const NAV_ITEMS: { page: Page; label: string; icon: typeof Home }[] = [
  { page: 'home', label: 'Home', icon: Home },
  { page: 'toc', label: 'Contents', icon: List },
  { page: 'resources', label: 'Downloads', icon: Download },
  { page: 'search', label: 'Search', icon: Search },
];

export function PlaybookHeader({
  currentPage,
  onNavigate,
  fontSize,
  onFontSizeChange,
  masterIndex,
  chaptersByPart,
}: PlaybookHeaderProps) {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: Page, chapterIdx?: number) => {
    onNavigate(page, chapterIdx);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 header-glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">KR</span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="font-bold text-foreground text-sm leading-tight">Kalilur Rahman</div>
                <div className="text-[10px] text-muted-foreground leading-tight">GCC Playbook 2026–2030</div>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(({ page, label, icon: Icon }) => (
                <button
                  key={page}
                  onClick={() => handleNav(page)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    currentPage === page
                      ? 'gradient-bg text-white'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
              <a
                href="https://kalilurrahman.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Portfolio
              </a>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Font size (desktop) */}
              <div className="hidden lg:flex items-center gap-0.5 border border-border rounded-lg overflow-hidden">
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

              {/* Theme */}
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
                className="hidden md:inline-flex px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border transition whitespace-nowrap"
              >
                ← Hub
              </button>

              {/* Mobile hamburger */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button
                    className="md:hidden p-2 rounded-lg border border-border transition hover:bg-muted/50"
                    aria-label="Toggle menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 bg-card border-r border-border">
                  <div className="h-full overflow-y-auto">
                    {/* Mobile header */}
                    <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xs">KR</span>
                      </div>
                      <span className="font-bold text-foreground text-sm">GCC Playbook</span>
                    </div>

                    {/* Nav links */}
                    <div className="p-4 space-y-1">
                      {NAV_ITEMS.map(({ page, label, icon: Icon }) => (
                        <button
                          key={page}
                          onClick={() => handleNav(page)}
                          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            currentPage === page
                              ? 'gradient-bg text-white'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Collapsible parts */}
                    {masterIndex && chaptersByPart && (
                      <div className="px-4 pb-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Chapters</p>
                        <Accordion type="single" collapsible>
                          {masterIndex.parts.map(part => {
                            const chapters = chaptersByPart[part.partNumber] || [];
                            return (
                              <AccordionItem key={part.partNumber} value={`part-${part.partNumber}`} className="border-none">
                                <AccordionTrigger className="hover:no-underline px-2 py-2.5 text-sm">
                                  <div className="text-left">
                                    <div className="font-semibold text-foreground text-xs">Part {part.partNumber}</div>
                                    <div className="text-[10px] text-muted-foreground">
                                      Ch {part.chapterRange.start}–{part.chapterRange.end} · {part.totalChapters} chapters
                                    </div>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-0.5 pl-2 max-h-60 overflow-y-auto">
                                    {chapters.map(ch => (
                                      <button
                                        key={ch.globalIdx}
                                        onClick={() => handleNav('chapter', ch.globalIdx)}
                                        className="block w-full text-left px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded transition truncate"
                                      >
                                        {ch.title}
                                      </button>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </div>
                    )}

                    {/* Quick actions */}
                    <div className="p-4 border-t border-border space-y-2">
                      <button
                        onClick={() => handleNav('resources')}
                        className="flex items-center gap-2 w-full px-4 py-3 gradient-bg text-white rounded-lg text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download all PDFs
                      </button>
                      <a
                        href="https://kalilurrahman.lovable.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 w-full px-4 py-3 bg-muted/30 text-foreground rounded-lg text-sm font-medium hover:bg-muted/50 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View portfolio
                      </a>
                      <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 w-full px-4 py-3 bg-muted/30 text-foreground rounded-lg text-sm font-medium hover:bg-muted/50 transition"
                      >
                        <Home className="w-4 h-4" />
                        Back to Hub
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
