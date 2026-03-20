import { ChevronRight } from 'lucide-react';
import type { Chapter, Section } from './types';

interface TOCSidebarProps {
  chapters: Chapter[];
  currentChapterIdx: number;
  onChapterSelect: (idx: number) => void;
  activeSectionIdx?: number;
}

export function TOCSidebar({ chapters, currentChapterIdx, onChapterSelect, activeSectionIdx }: TOCSidebarProps) {
  const ch = chapters[currentChapterIdx];
  if (!ch) return null;

  const partChapters = chapters.filter(c => c.partNumber === ch.partNumber);

  return (
    <aside className="hidden xl:block w-64 shrink-0 sticky top-[56px] h-[calc(100vh-56px)] overflow-y-auto border-r border-border p-4 scrollbar-hide">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Part {ch.partNumber}</p>
      <nav className="space-y-0.5">
        {partChapters.map(c => {
          const idx = c.globalIndex ?? 0;
          const isActive = idx === currentChapterIdx;
          return (
            <button
              key={c.id}
              onClick={() => onChapterSelect(idx)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all leading-snug ${
                isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <span className="line-clamp-2">{c.title}</span>
            </button>
          );
        })}
      </nav>

      {ch.sections && ch.sections.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground mb-2">In this chapter</p>
          <nav className="space-y-0.5">
            {ch.sections.map((s: Section, i: number) => (
              <a
                key={i}
                href={`#section-${i}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all ${
                  activeSectionIdx === i
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span className="line-clamp-1">{s.title}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </aside>
  );
}
