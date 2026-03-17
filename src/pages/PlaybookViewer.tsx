import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================
// GCC Leadership Playbook Viewer
// Ported from GCCLeadership/pwa — vanilla JS SPA converted to
// a self-contained React page. Data loaded from /data/gcc-content.json
// ============================================================

type Section = {
  title: string;
  content?: string[];
  subsections?: { title: string; content?: string[] }[];
  isKeyTakeaway?: boolean;
};

type Chapter = {
  id: string;
  title: string;
  number?: string;
  content?: string[];
  sections?: Section[];
  partKey?: string;
  partLabel?: string;
  partTitle?: string;
  globalIndex?: number;
};

type Part = {
  title: string;
  subtitle: string;
  chapters: Chapter[];
};

type AppData = {
  stats: { totalChapters: number; glossaryTerms: number; references: number };
  parts: { part1: Part; part2: Part; part3: Part };
  glossary: { term: string; definition: string }[];
};

type Page = 'home' | 'toc' | 'chapter' | 'glossary' | 'search';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlightText(text: string, query: string): string {
  if (!text || !query) return escapeHtml(text || '');
  const escaped = escapeHtml(text);
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escaped.replace(re, '<mark class="bg-yellow-200 text-gray-900 rounded px-0.5">$1</mark>');
}

export default function PlaybookViewer() {
  const navigate = useNavigate();
  const [appData, setAppData] = useState<AppData | null>(null);
  const [allChapters, setAllChapters] = useState<Chapter[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentChapterIdx, setCurrentChapterIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [glossaryFilter, setGlossaryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const glossaryInputRef = useRef<HTMLInputElement>(null);

  // Load data
  useEffect(() => {
    fetch('/data/gcc-content.json')
      .then(r => r.json())
      .then((data: AppData) => {
        setAppData(data);
        const chapters: Chapter[] = [];
        const partKeys = ['part1', 'part2', 'part3'] as const;
        const partLabels = ['Part I', 'Part II', 'Part III'];
        partKeys.forEach((key, pi) => {
          const part = data.parts[key];
          if (!part) return;
          part.chapters.forEach(ch => {
            chapters.push({ ...ch, partKey: key, partLabel: partLabels[pi], partTitle: part.title, globalIndex: chapters.length });
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

  const navTo = (page: Page, chapterIdx?: number) => {
    setCurrentPage(page);
    if (chapterIdx !== undefined) setCurrentChapterIdx(chapterIdx);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading GCC Playbook…</p>
      </div>
    </div>
  );

  if (error || !appData) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-2">Failed to load content.json</p>
        <p className="text-gray-400 text-sm">Ensure /public/data/gcc-content.json exists in the repository.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-500 underline text-sm">← Back to Hub</button>
      </div>
    </div>
  );

  const { stats } = appData;
  const partConfigs = [
    { key: 'part1' as const, cls: 'bg-blue-600', label: 'I' },
    { key: 'part2' as const, cls: 'bg-purple-600', label: 'II' },
    { key: 'part3' as const, cls: 'bg-emerald-600', label: 'III' },
  ];

  // ---- Shared Header ----
  const Header = () => (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <button onClick={() => navTo('home')} className="font-bold text-white text-sm md:text-base tracking-tight">
          📕 GCC Playbook
        </button>
        <nav className="hidden md:flex gap-1">
          {(['home','toc','glossary','search'] as Page[]).map(p => (
            <button key={p} onClick={() => navTo(p)}
              className={`px-3 py-1.5 rounded text-sm font-medium capitalize transition ${
                currentPage === p ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}>
              {p === 'toc' ? 'Contents' : p === 'home' ? 'Home' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <button onClick={() => navigate('/')} className="px-3 py-1.5 rounded text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 ml-2 border border-gray-600">
            ← Hub
          </button>
        </nav>
        <button onClick={() => navigate('/')} className="md:hidden text-gray-400 text-xs border border-gray-600 rounded px-2 py-1">← Hub</button>
      </div>
    </header>
  );

  // ---- Home Page ----
  if (currentPage === 'home') return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Hero */}
        <section className="text-center mb-12">
          <span className="inline-block bg-blue-900/50 text-blue-300 text-xs font-medium px-3 py-1 rounded-full mb-4">📕 Open Access · 2026–2030 Edition</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">The Complete India <span className="text-blue-400">GCC Reference</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">A comprehensive playbook covering India's Global Capability Centres — from landscape and maturity models to AI, deep tech, M&A, and 2030 scenarios.</p>
          <div className="flex justify-center gap-6 md:gap-10 mb-8">
            {[{v: stats.totalChapters, l:'Chapters'},{v:3,l:'Parts'},{v:stats.glossaryTerms,l:'Glossary Terms'},{v:stats.references,l:'References'}].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-2xl font-bold text-blue-400">{s.v}</div>
                <div className="text-xs text-gray-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-3">
            <button onClick={() => navTo('toc')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition">Explore Contents</button>
            <button onClick={() => navTo('search')} className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Search
            </button>
          </div>
        </section>
        {/* Parts */}
        {partConfigs.map(({ key, cls, label }) => {
          const part = appData.parts[key];
          if (!part?.chapters.length) return null;
          return (
            <div key={key} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${cls} w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm`}>{label}</div>
                <div>
                  <h3 className="font-semibold text-white">{part.title}</h3>
                  <p className="text-xs text-gray-400">{part.subtitle}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {part.chapters.map(ch => {
                  const globalIdx = allChapters.findIndex(c => c.id === ch.id);
                  return (
                    <button key={ch.id} onClick={() => navTo('chapter', globalIdx)}
                      className="text-left bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 rounded-lg px-4 py-3 transition">
                      <p className="text-sm text-white font-medium leading-snug">{ch.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{ch.sections?.length ?? 0} sections</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );

  // ---- TOC Page ----
  if (currentPage === 'toc') return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">Table of Contents</h1>
        {partConfigs.map(({ key, cls, label }) => {
          const part = appData.parts[key];
          if (!part?.chapters.length) return null;
          return (
            <div key={key} className="mb-8">
              <div className={`${cls} bg-opacity-20 border border-gray-700 rounded-lg px-4 py-3 mb-3 flex items-center gap-3`}>
                <span className={`${cls} text-white text-xs font-bold w-6 h-6 rounded flex items-center justify-center`}>{label}</span>
                <span className="font-semibold text-white">{part.title}</span>
                <span className="ml-auto text-xs text-gray-400">{part.chapters.length} chapters</span>
              </div>
              <div className="space-y-1 ml-2">
                {part.chapters.map(ch => {
                  const globalIdx = allChapters.findIndex(c => c.id === ch.id);
                  return (
                    <button key={ch.id} onClick={() => navTo('chapter', globalIdx)}
                      className="w-full text-left flex items-start justify-between px-4 py-2.5 rounded-lg hover:bg-gray-800 transition group">
                      <span className="text-sm text-gray-200 group-hover:text-white">{ch.title}</span>
                      <span className="text-xs text-gray-500 ml-4 shrink-0">{ch.sections?.length ?? 0} §</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );

  // ---- Chapter Page ----
  if (currentPage === 'chapter' && currentChapterIdx !== null) {
    const ch = allChapters[currentChapterIdx];
    const prevCh = currentChapterIdx > 0 ? allChapters[currentChapterIdx - 1] : null;
    const nextCh = currentChapterIdx < allChapters.length - 1 ? allChapters[currentChapterIdx + 1] : null;
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
            <button onClick={() => navTo('home')} className="hover:text-gray-300">Home</button>
            <span>›</span>
            <button onClick={() => navTo('toc')} className="hover:text-gray-300">{ch.partLabel}</button>
            <span>›</span>
            <span className="text-gray-400">{ch.title.substring(0, 50)}…</span>
          </div>
          {/* Chapter Hero */}
          <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-snug">{ch.title}</h1>
          <p className="text-gray-500 text-sm mb-8">{ch.partTitle} · {ch.sections?.length ?? 0} sections</p>
          {/* Direct content */}
          {(ch.content || []).map((p, i) => <p key={i} className="text-gray-300 leading-relaxed mb-4">{p}</p>)}
          {/* Sections */}
          {(ch.sections || []).map((section, si) => (
            <div key={si} className={`mb-8 ${ section.isKeyTakeaway ? 'bg-blue-900/20 border border-blue-700/40 rounded-xl p-6' : '' }`}>
              <h2 className="text-lg font-semibold text-white mb-4">{section.isKeyTakeaway ? '🎯 ' : ''}{section.title}</h2>
              {(section.content || []).map((p, i) => <p key={i} className="text-gray-300 leading-relaxed mb-3">{p}</p>)}
              {(section.subsections || []).map((sub, ssi) => (
                <div key={ssi} className="mt-4">
                  <h3 className="text-base font-semibold text-gray-200 mb-2">{sub.title}</h3>
                  {(sub.content || []).map((p, i) => <p key={i} className="text-gray-300 leading-relaxed mb-3">{p}</p>)}
                </div>
              ))}
            </div>
          ))}
          {/* Chapter navigation */}
          <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-800">
            {prevCh ? (
              <button onClick={() => navTo('chapter', currentChapterIdx - 1)}
                className="text-left bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 transition">
                <p className="text-xs text-gray-500 mb-1">← Previous</p>
                <p className="text-sm text-white font-medium leading-snug">{prevCh.title.substring(0, 60)}</p>
              </button>
            ) : <div />}
            {nextCh ? (
              <button onClick={() => navTo('chapter', currentChapterIdx + 1)}
                className="text-right bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 transition">
                <p className="text-xs text-gray-500 mb-1">Next →</p>
                <p className="text-sm text-white font-medium leading-snug">{nextCh.title.substring(0, 60)}</p>
              </button>
            ) : <div />}
          </div>
        </main>
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
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-6">Glossary</h1>
          <input ref={glossaryInputRef} type="text" value={glossaryFilter} onChange={e => setGlossaryFilter(e.target.value)}
            placeholder="Filter terms…" autoComplete="off"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 mb-8" />
          <div className="space-y-4">
            {filtered.map((t, i) => (
              <div key={i} className="border-b border-gray-800 pb-4">
                <dt className="font-semibold text-white mb-1">{t.term}</dt>
                <dd className="text-gray-400 text-sm leading-relaxed">{t.definition}</dd>
              </div>
            ))}
            {!filtered.length && <p className="text-gray-500 text-sm">No terms match your filter.</p>}
          </div>
        </main>
      </div>
    );
  }

  // ---- Search Page ----
  if (currentPage === 'search') {
    const q = searchQuery.toLowerCase().trim();
    const results: { chapterIdx: number | null; chapter: string; title: string; excerpt: string; score: number; isGlossary?: boolean }[] = [];
    if (q.length >= 2) {
      allChapters.forEach((ch, idx) => {
        if (ch.title.toLowerCase().includes(q)) results.push({ chapterIdx: idx, chapter: ch.partLabel || '', title: ch.title, excerpt: ch.content?.[0] || ch.sections?.[0]?.content?.[0] || '', score: 10 });
        (ch.sections || []).forEach(section => {
          if (section.title.toLowerCase().includes(q)) results.push({ chapterIdx: idx, chapter: `${ch.partLabel} · ${ch.title.substring(0,30)}`, title: section.title, excerpt: section.content?.[0] || '', score: 8 });
          (section.content || []).forEach(p => {
            if (p.toLowerCase().includes(q)) {
              const ei = p.toLowerCase().indexOf(q);
              results.push({ chapterIdx: idx, chapter: section.title.substring(0,30), title: ch.title, excerpt: '…' + p.substring(Math.max(0, ei-60), ei + q.length + 60) + '…', score: 3 });
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
    const unique = results.filter(r => { const k = r.title + r.excerpt.substring(0,30); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 30);
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold mb-6">Search</h1>
          <div className="relative mb-6">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input ref={searchInputRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search chapters, sections, content…" autoComplete="off"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
          </div>
          {q.length >= 2 && <p className="text-xs text-gray-500 mb-4">{unique.length} result{unique.length !== 1 ? 's' : ''} found</p>}
          <div className="space-y-3">
            {unique.map((r, i) => (
              <button key={i} onClick={() => r.chapterIdx !== null ? navTo('chapter', r.chapterIdx) : navTo('glossary')}
                className="w-full text-left bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-4 py-3 transition">
                <p className="text-xs text-gray-500 mb-1">{r.chapter}</p>
                <p className="text-sm font-medium text-white mb-1">{r.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: highlightText(r.excerpt, searchQuery) }} />
              </button>
            ))}
            {q.length >= 2 && !unique.length && <p className="text-gray-500 text-sm">No results found. Try different keywords.</p>}
          </div>
        </main>
      </div>
    );
  }

  return null;
}
