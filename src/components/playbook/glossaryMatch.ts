import type { GlossaryTerm } from './types';

export type TermEntry = {
  /** The alias matched in prose, e.g. "BOT" for "BOT (Build-Operate-Transfer)". */
  alias: string;
  /** The canonical glossary term. */
  term: string;
  definition: string;
};

export type Segment =
  | { kind: 'text'; value: string }
  | { kind: 'term'; value: string; term: string; definition: string };

/** Aliases shorter than this are ignored to avoid noisy matches. */
const MIN_ALIAS_LENGTH = 3;

/**
 * Aliases that are too generic to annotate in running prose — they would match
 * constantly and clutter the page rather than help the reader.
 */
const ALIAS_STOPLIST = new Set(['gcc', 'gccs']);

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Derive the prose aliases for a glossary term. A term like
 * "GCCaaS (GCC as a Service)" is written as "GCCaaS" in prose, so the leading
 * segment before a parenthetical is used alongside the full term.
 */
export function aliasesFor(term: string): string[] {
  const trimmed = term.trim();
  const out = new Set<string>();
  if (trimmed) out.add(trimmed);

  const parenIdx = trimmed.indexOf(' (');
  if (parenIdx > 0) {
    const head = trimmed.slice(0, parenIdx).trim();
    if (head) out.add(head);
  }

  return [...out].filter(
    (a) => a.length >= MIN_ALIAS_LENGTH && !ALIAS_STOPLIST.has(a.toLowerCase()),
  );
}

/**
 * Build the alias lookup used when annotating prose. Longer aliases are ordered
 * first so that the most specific term wins (e.g. "BOT 2.0" before "BOT").
 */
export function buildTermEntries(terms: GlossaryTerm[]): TermEntry[] {
  const entries: TermEntry[] = [];
  const seen = new Set<string>();

  for (const t of terms) {
    for (const alias of aliasesFor(t.term)) {
      const key = alias.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      entries.push({ alias, term: t.term, definition: t.definition });
    }
  }

  return entries.sort((a, b) => b.alias.length - a.alias.length);
}

/**
 * Split `text` into plain and glossary-term segments.
 *
 * Only the FIRST occurrence of each term is annotated, keeping long chapters
 * readable instead of underlining every repetition.
 */
type CompiledIndex = { re: RegExp; byAlias: Map<string, TermEntry> };

/**
 * The compiled pattern depends only on the entry list, but annotateText runs
 * once per prose block — a long chapter renders well over a hundred. Cache the
 * compiled form against the entries array so it is built once per glossary
 * rather than once per block. Keyed by reference, so callers should pass a
 * stable (memoised) array.
 */
const indexCache = new WeakMap<TermEntry[], CompiledIndex>();

function compileIndex(entries: TermEntry[]): CompiledIndex {
  const cached = indexCache.get(entries);
  if (cached) return cached;

  const pattern = entries.map((e) => escapeRegExp(e.alias)).join('|');
  // Require a non-word char (or string edge) around the match so "BOT" does not
  // match inside "ROBOT". Uses lookaround rather than \b because several
  // aliases end in non-word characters such as ")".
  // Safe to reuse across calls: String.matchAll clones the regex via its species
  // constructor, so this instance's lastIndex is never mutated.
  const compiled: CompiledIndex = {
    re: new RegExp(`(?<![\\w-])(${pattern})(?![\\w-])`, 'gi'),
    byAlias: new Map(entries.map((e) => [e.alias.toLowerCase(), e])),
  };
  indexCache.set(entries, compiled);
  return compiled;
}

export function annotateText(text: string, entries: TermEntry[]): Segment[] {
  if (!text || !entries.length) return text ? [{ kind: 'text', value: text }] : [];

  const { re, byAlias } = compileIndex(entries);
  const usedTerms = new Set<string>();
  const segments: Segment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(re)) {
    const idx = match.index ?? 0;
    const matched = match[0];
    const entry = byAlias.get(matched.toLowerCase());
    if (!entry || usedTerms.has(entry.term)) continue;
    usedTerms.add(entry.term);

    if (idx > lastIndex) {
      segments.push({ kind: 'text', value: text.slice(lastIndex, idx) });
    }
    segments.push({
      kind: 'term',
      value: matched,
      term: entry.term,
      definition: entry.definition,
    });
    lastIndex = idx + matched.length;
  }

  if (lastIndex < text.length) {
    segments.push({ kind: 'text', value: text.slice(lastIndex) });
  }

  return segments;
}
