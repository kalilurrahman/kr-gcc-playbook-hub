import { useMemo, useState } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { annotateText, type TermEntry } from './glossaryMatch';

interface GlossaryTextProps {
  text?: string;
  entries?: TermEntry[];
}

function GlossaryTermMark({
  value,
  term,
  definition,
}: {
  value: string;
  term: string;
  definition: string;
}) {
  // Controlled so the definition is reachable by pointer, touch, and keyboard —
  // an uncontrolled tooltip does not open on tap.
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button
            type="button"
            onPointerEnter={() => setOpen(true)}
            onPointerLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onClick={() => setOpen((o) => !o)}
            aria-label={`${term} — show definition`}
            // `font`/`color` inherit inline: buttons do not inherit prose
            // typography by default, which would break the surrounding text.
            style={{ font: 'inherit', color: 'inherit', textAlign: 'inherit' }}
            className="inline underline decoration-dotted decoration-primary/60 underline-offset-2 hover:decoration-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm cursor-help bg-transparent p-0 m-0"
          >
            {value}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" align="start" className="max-w-xs text-left">
          <span className="block text-xs font-semibold text-foreground mb-1">{term}</span>
          <span className="block text-xs text-muted-foreground leading-relaxed">{definition}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * Renders prose with the first mention of each glossary term wrapped in a
 * tooltip. Falls back to plain text when no glossary is loaded.
 */
export function GlossaryText({ text, entries }: GlossaryTextProps) {
  const segments = useMemo(
    () => (entries?.length ? annotateText(text || '', entries) : null),
    [text, entries],
  );

  if (!segments) return <>{text}</>;

  return (
    <>
      {segments.map((seg, i) =>
        seg.kind === 'term' ? (
          <GlossaryTermMark
            key={i}
            value={seg.value}
            term={seg.term}
            definition={seg.definition}
          />
        ) : (
          seg.value
        ),
      )}
    </>
  );
}
