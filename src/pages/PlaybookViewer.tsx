import { useEffect, useRef, useState } from 'react';
import { PlaybookHeader } from '@/components/playbook/PlaybookHeader';
import { ContentBlocks } from '@/components/playbook/ContentBlock';
import { TOCSidebar } from '@/components/playbook/TOCSidebar';
import { ReadingProgress } from '@/components/playbook/ReadingProgress';
import { ResourcesTab } from '@/components/playbook/ResourcesTab';
import { useBookmarks, useReadingPosition, useFontSize } from '@/components/playbook/useBookmarks';
import GCCFooter from '@/components/GCCFooter';
import { Bookmark, BookmarkCheck, ArrowUp } from 'lucide-react';
import type { AppData, Chapter, Page } from '@/components/playbook/types';
import { PART_ORDER } from '@/components/playbook/types';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function highlightText(text: string, query: string): string {
  if (!text || !query) return escapeHtml(text || '');
  const escaped = escapeHtml(text);
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escaped.replace(re, '<mark class="bg-accent/30 text-foreground rounded px-0.5">$1</mark>');
}

function blocksToText(blocks?: { text?: string }[]): string {
  return (blocks || []).map(b => b.text || '').join(' ');
}

export default function PlaybookViewer() {
  const [appData, setAppData] = useState<AppData | null>(null);
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentChapterIdx, setCurrentChapterIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [glossaryFilter, setGlossaryFilter] = useState('');
  const [collapsedParts, setCollapsedParts] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const glossaryInputRef = useRef<HTMLInputElement>(null);

  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { savePosition, getLastPosition } = useReadingPosition();
  const { fontSize, setFontSize } = useFontSize();

  useEffect(() => {
    fetch('/data/gcc-content.json')
      .then(r => r.json())
      .then((data: AppData) => {
        setAppData(data);
        const chapters: Chapter[] = [];
        PART_ORDER.forEach(({ key, label }) => {
          const part = data.parts[key];
          if (!part) return;
          part.chapters.forEach(ch => {
            chapters.push({ ...ch, partKey: key, partLabel: label, partTitle: part.title, globalIndex: chapters.length });
          });
        });
        setAllChapters(chapters);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentPage === 'search' && searchInputRef.current) searchInputRef.current.focus();
    if (currentPage === 'glossary' && glossaryInputRef.current) glossaryInputRef.current.focus();
  }, [currentPage, currentChapterIdx]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTo = (page: Page, chapterIdx?: number) => {
    setCurrentPage(page);
    if (chapterIdx !== undefined) {
      setCurrentChapterIdx(chapterIdx);
      savePosition(chapterIdx);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading GCC Playbook…</p>
      </div>
    </div>
  );

  if (error || !appData) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-destructive mb-2">Failed to load content</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-primary underline text-sm">Reload</button>
      </div>
    </div>
  );

  const { stats } = appData;
  const lastPos = getLastPosition();

  // ---- Home Page ----
  if (currentPage === 'home') return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ReadingProgress />
      <PlaybookHeader currentPage={currentPage} onNavigate={navTo} fontSize={fontSize} onFontSizeChange={setFontSize} />
      <main className="max-w-5xl mx-auto px-4 py-10 flex-1">
        <section className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-4 py-1.5 rounded-full mb-4 border border-primary/20">
            📕 Open Access · 2026–2030 Edition
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">{appData.title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-2">{appData.subtitle}</p>
          <p className="text-muted-foreground text-sm mb-8">{appData.author}</p>
          <div className="flex justify-center gap-6 md:gap-10 mb-8">
            {[
              { v: stats.totalChapters, l: 'Chapters' },
              { v: Object.keys(appData.parts).length, l: 'Parts' },
              { v: stats.glossaryTerms, l: 'Glossary' },
              { v: stats.references, l: 'References' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-bold text-primary">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navTo('toc')} className="gradient-bg text-white px-6 py-2.5 rounded-lg font-medium transition hover:shadow-lg hover:shadow-primary/20">
              Explore Contents
            </button>
            <button onClick={() => navTo('resources')} className="border border-border text-foreground hover:bg-muted/50 px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2">
              📥 Download PDFs
            </button>
            <button onClick={() => navTo('search')} className="border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2">
              🔍 Search
            </button>
            {lastPos !== null && (
              <button onClick={() => navTo('chapter', lastPos)} className="border border-primary/30 text-primary hover:bg-primary/10 px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2">
                ▶ Continue reading
              </button>
            )}
          </div>
        </section>

        {PART_ORDER.map(({ key, cls, label }) => {
          const part = appData.parts[key];
          if (!part?.chapters.length) return null;
          const isCollapsed = collapsedParts[key] ?? false;
          return (
            <div key={key} className="mb-10">
              <button onClick={() => setCollapsedParts(prev => ({ ...prev, [key]: !isCollapsed }))}
                className="w-full flex items-center gap-3 mb-4 group">
                <div className={`${cls} w-9 h-9 rounded-lg inline-flex items-center justify-center text-white font-bold text-xs leading-none`}>
                  {label.replace('Part ', '')}
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-foreground">{part.title}</h3>
                  <p className="text-xs text-muted-foreground">{part.subtitle} · {part.chapters.length} chapters</p>
                </div>
                <span className={`text-muted-foreground text-sm transition-transform ${isCollapsed ? '' : 'rotate-90'}`}>▶</span>
              </button>
              {!isCollapsed && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {part.chapters.map(ch => {
                    const globalIdx = allChapters.findIndex(c => c.id === ch.id);
                    const bookmarked = isBookmarked(ch.id);
                    return (
                      <button key={ch.id} onClick={() => navTo('chapter', globalIdx)}
                        className="text-left bg-card hover:bg-muted/50 border border-border hover:border-primary/30 rounded-lg px-4 py-3 transition group/card">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm text-foreground font-medium leading-snug truncate">{ch.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{ch.sections?.length ?? 0} sections</p>
                          </div>
                          {bookmarked && <BookmarkCheck className="w-4 h-4 text-primary shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </main>
      <GCCFooter />
    </div>
  );

  // ---- Resources Page ----
  if (currentPage === 'resources') return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ReadingProgress />
      <PlaybookHeader currentPage={currentPage} onNavigate={navTo} fontSize={fontSize} onFontSizeChange={setFontSize} />
      <main className="max-w-5xl mx-auto px-4 py-10 flex-1">
        <ResourcesTab resources={appData.resourceDocs} />
      </main>
      <GCCFooter />
    </div>
  );

  // ---- TOC Page ----
  if (currentPage === 'toc') return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ReadingProgress />
      <PlaybookHeader currentPage={currentPage} onNavigate={navTo} fontSize={fontSize} onFontSizeChange={setFontSize} />
      <main className="max-w-3xl mx-auto px-4 py-10 flex-1">
        <h1 className="text-2xl font-bold mb-8 text-foreground">Table of contents</h1>
        {PART_ORDER.map(({ key, cls, label }) => {
          const part = appData.parts[key];
          if (!part?.chapters.length) return null;
          return (
            <div key={key} className="mb-8">
              <div className="bg-card border border-border rounded-lg px-4 py-3 mb-3 flex items-center gap-3">
                <span className={`${cls} text-white text-xs font-bold px-2 py-1 rounded`}>{label}</span>
                <span className="font-semibold text-foreground">{part.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">{part.chapters.length} ch.</span>
              </div>
              <div className="space-y-0.5 ml-2">
                {part.chapters.map(ch => {
                  const globalIdx = allChapters.findIndex(c => c.id === ch.id);
                  return (
                    <button key={ch.id} onClick={() => navTo('chapter', globalIdx)}
                      className="w-full text-left flex items-start justify-between px-4 py-2.5 rounded-lg hover:bg-muted/30 transition group">
                      <span className="text-sm text-muted-foreground group-hover:text-foreground">{ch.title}</span>
                      <span className="text-xs text-muted-foreground ml-4 shrink-0">{ch.sections?.length ?? 0} §</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
      <GCCFooter />
    </div>
  );

  // ---- Chapter Page ----
  if (currentPage === 'chapter' && currentChapterIdx !== null) {
    const ch = allChapters[currentChapterIdx];
    const prevCh = currentChapterIdx > 0 ? allChapters[currentChapterIdx - 1] : null;
    const nextCh = currentChapterIdx < allChapters.length - 1 ? allChapters[currentChapterIdx + 1] : null;
    const bookmarked = isBookmarked(ch.id);
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ReadingProgress />
        <PlaybookHeader currentPage={currentPage} onNavigate={navTo} fontSize={fontSize} onFontSizeChange={setFontSize} />
        <div className="flex flex-1">
          <TOCSidebar
            chapters={allChapters}
            currentChapterIdx={currentChapterIdx}
            onChapterSelect={(idx) => navTo('chapter', idx)}
          />
          <main className="flex-1 max-w-3xl mx-auto px-4 py-10">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
              <button onClick={() => navTo('home')} className="hover:text-foreground transition">Home</button>
              <span>›</span>
              <button onClick={() => navTo('toc')} className="hover:text-foreground transition">{ch.partLabel}</button>
              <span>›</span>
              <span className="text-foreground truncate max-w-[200px]">{ch.title}</span>
            </div>

            {/* Title + bookmark */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold leading-snug text-foreground">{ch.title}</h1>
              <button
                onClick={() => toggleBookmark(ch.id)}
                className={`p-2 rounded-lg border transition shrink-0 ${
                  bookmarked ? 'border-primary/40 bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
                aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
              >
                {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-muted-foreground text-sm mb-8">{ch.partTitle} · {ch.sections?.length ?? 0} sections</p>

            <ContentBlocks blocks={ch.blocks} fontSize={fontSize} />

            {(ch.sections || []).map((section, si) => (
              <div key={si} id={`section-${si}`}
                className={`mb-8 scroll-mt-20 ${section.isKeyTakeaway ? 'bg-primary/5 border border-primary/20 rounded-xl p-6' : ''}`}>
                <h2 className="text-lg font-semibold text-foreground mb-4">{section.isKeyTakeaway ? '🎯 ' : ''}{section.title}</h2>
                <ContentBlocks blocks={section.blocks} fontSize={fontSize} />
                {(section.subsections || []).map((sub, ssi) => (
                  <div key={ssi} className="mt-5 pl-4 border-l-2 border-border">
                    <h3 className="text-base font-semibold text-muted-foreground mb-2">{sub.title}</h3>
                    <ContentBlocks blocks={sub.blocks} fontSize={fontSize} />
                  </div>
                ))}
              </div>
            ))}

            {/* Prev / Next */}
            <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-border">
              {prevCh ? (
                <button onClick={() => navTo('chapter', currentChapterIdx - 1)}
                  className="text-left bg-card hover:bg-muted/30 border border-border hover:border-primary/30 rounded-xl p-4 transition">
                  <p className="text-xs text-muted-foreground mb-1">← Previous</p>
                  <p className="text-sm text-foreground font-medium leading-snug truncate">{prevCh.title}</p>
                </button>
              ) : <div />}
              {nextCh ? (
                <button onClick={() => navTo('chapter', currentChapterIdx + 1)}
                  className="text-right bg-card hover:bg-muted/30 border border-border hover:border-primary/30 rounded-xl p-4 transition">
                  <p className="text-xs text-muted-foreground mb-1">Next →</p>
                  <p className="text-sm text-foreground font-medium leading-snug truncate">{nextCh.title}</p>
                </button>
              ) : <div />}
            </div>
          </main>
        </div>

        {/* Scroll to top */}
        {showScrollTop && (
          <button onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full gradient-bg text-white shadow-lg hover:shadow-primary/30 transition z-50"
            aria-label="Scroll to top">
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
        <GCCFooter />
      </div>
    );
  }

  // ---- Glossary Page ----
  if (currentPage === 'glossary') {
    const terms = appData.glossary || [];
    const filtered = glossaryFilter
      ? terms.filter(t => t.term.toLowerCase().includes(glossaryFilter.toLowerCase()) || t.definition.toLowerCase().includes(glossaryFilter.toLowerCase()))
      : terms;
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ReadingProgress />
        <PlaybookHeader currentPage={currentPage} onNavigate={navTo} fontSize={fontSize} onFontSizeChange={setFontSize} />
        <main className="max-w-3xl mx-auto px-4 py-10 flex-1">
          <h1 className="text-2xl font-bold mb-6 text-foreground">Glossary ({terms.length} terms)</h1>
          <input ref={glossaryInputRef} type="text" value={glossaryFilter} onChange={e => setGlossaryFilter(e.target.value)}
            placeholder="Filter terms…" autoComplete="off"
            className="search-input-gcc w-full mb-8" />
          <div className="space-y-4">
            {filtered.map((t, i) => (
              <div key={i} className="border-b border-border pb-4">
                <dt className="font-semibold text-foreground mb-1">{t.term}</dt>
                <dd className="text-muted-foreground text-sm leading-relaxed">{t.definition}</dd>
              </div>
            ))}
            {!filtered.length && <p className="text-muted-foreground text-sm">No terms match your filter.</p>}
          </div>
        </main>
        <GCCFooter />
      </div>
    );
  }

  // ---- Search Page ----
  if (currentPage === 'search') {
    const q = searchQuery.toLowerCase().trim();
    const results: { chapterIdx: number | null; chapter: string; title: string; excerpt: string; score: number; isGlossary?: boolean }[] = [];
    if (q.length >= 2) {
      allChapters.forEach((ch, idx) => {
        if (ch.title.toLowerCase().includes(q)) {
          const firstText = blocksToText(ch.blocks).substring(0, 120) || blocksToText(ch.sections?.[0]?.blocks).substring(0, 120);
          results.push({ chapterIdx: idx, chapter: ch.partLabel || '', title: ch.title, excerpt: firstText, score: 10 });
        }
        (ch.sections || []).forEach(section => {
          if (section.title.toLowerCase().includes(q)) {
            results.push({ chapterIdx: idx, chapter: `${ch.partLabel} · ${ch.title.substring(0, 30)}`, title: section.title, excerpt: blocksToText(section.blocks).substring(0, 120), score: 8 });
          }
          (section.blocks || []).forEach(b => {
            const text = b.text || '';
            if (text.toLowerCase().includes(q)) {
              const ei = text.toLowerCase().indexOf(q);
              results.push({ chapterIdx: idx, chapter: section.title.substring(0, 30), title: ch.title, excerpt: '…' + text.substring(Math.max(0, ei - 60), ei + q.length + 60) + '…', score: 3 });
            }
          });
        });
      });
      (appData.glossary || []).forEach(t => {
        if (t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q))
          results.push({ chapterIdx: null, chapter: 'Glossary', title: t.term, excerpt: t.definition, score: 5, isGlossary: true });
      });
      results.sort((a, b) => b.score - a.score);
    }
    const seen = new Set<string>();
    const unique = results.filter(r => { const k = r.title + r.excerpt.substring(0, 30); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 30);
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ReadingProgress />
        <PlaybookHeader currentPage={currentPage} onNavigate={navTo} fontSize={fontSize} onFontSizeChange={setFontSize} />
        <main className="max-w-3xl mx-auto px-4 py-10 flex-1">
          <h1 className="text-2xl font-bold mb-6 text-foreground">Search</h1>
          <div className="relative mb-6">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input ref={searchInputRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search chapters, sections, content…" autoComplete="off"
              className="search-input-gcc w-full pl-9" />
          </div>
          {q.length >= 2 && <p className="text-xs text-muted-foreground mb-4">{unique.length} result{unique.length !== 1 ? 's' : ''} found</p>}
          <div className="space-y-3">
            {unique.map((r, i) => (
              <button key={i} onClick={() => r.chapterIdx !== null ? navTo('chapter', r.chapterIdx) : navTo('glossary')}
                className="w-full text-left bg-card hover:bg-muted/30 border border-border hover:border-primary/30 rounded-xl px-4 py-3 transition">
                <p className="text-xs text-muted-foreground mb-1">{r.chapter}</p>
                <p className="text-sm font-medium text-foreground mb-1">{r.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightText(r.excerpt, searchQuery) }} />
              </button>
            ))}
            {q.length >= 2 && !unique.length && <p className="text-muted-foreground text-sm">No results found. Try different keywords.</p>}
          </div>
        </main>
        <GCCFooter />
      </div>
    );
  }

  return null;
}
