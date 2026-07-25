# Playbook Viewer Integration (completed)

Historical record of how the GCCLeadership PWA playbook navigator was integrated into
this app, plus the **current** data architecture. The migration described here is
**complete** — nothing in this document is an outstanding task.

> If you are looking for how to maintain the playbook content, see
> [`MAINTENANCE.md`](MAINTENANCE.md) §5 (single source of truth).

## What was added

| File | Purpose |
|------|---------|
| `src/pages/PlaybookViewer.tsx` | React port of the playbook SPA — home, TOC, chapter, resources, and search pages |
| `src/components/playbook/` | Supporting components (header, footer, TOC sidebar, content blocks, bookmarks, reading progress) |
| `src/components/PlaybookNavCard.tsx` | Entry card embedded on the hub landing page |

All integration steps are done: the `/playbook/*` route is wired in `src/App.tsx`,
`PlaybookNavCard` is embedded in `src/pages/Index.tsx`, PWA support is configured via
`vite-plugin-pwa`, and the install prompt lives in `src/components/InstallPrompt.tsx`.

## Current data architecture

The viewer **lazy-loads a master index and one file per part** at runtime — it does
*not* read a single combined content file:

```
public/data/gcc-master-index.json     ← parts, chapter ranges, stats, branding
  ├── public/data/gcc-part1.json      ← Part I   (Ch 1–62)
  ├── public/data/gcc-part2.json      ← Part II  (Ch 63–128)
  ├── public/data/gcc-part3.json      ← Part III (Ch 129–144)
  └── public/data/gcc-part4.json      ← Part IV  (Ch 145–152)
```

`PlaybookViewer` fetches `/data/gcc-master-index.json` first, then fetches each part's
`dataFile` on demand (Part I eagerly, the rest when opened). Chapter counts and ranges
in the master index must stay in sync with the part files.

**Do not reintroduce a combined `gcc-content.json` / `content.json`.** Earlier copies of
this repo carried aggregate duplicates that drifted out of sync with the part files
(143 chapters vs. 151) and were removed. If a single full-text export is ever needed,
**generate** it from the part files in a build step rather than hand-maintaining a
second copy.

## Route

`/playbook/*` → `PlaybookViewer` (internal navigation for home, TOC, chapters, resources, search)
