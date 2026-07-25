# Maintenance & Operations Runbook

Practical steps for keeping the GCC Playbook healthy: fixing CI, resolving the
Dependabot alerts, keeping content fresh, and the single-source-of-truth rules.
Written July 2026 during the content-refresh audit (see PR #36).

---

## 1. Why CI was red — and the fix (resolved)

**Symptom:** every CI run failed at *Install dependencies* with dozens of
`npm error Missing: … from lock file` / `Invalid: … does not satisfy …`.

**Root cause:** the committed `package-lock.json` was out of sync with
`package.json`. The mismatch centred on the `@testing-library/dom` subtree —
`@testing-library/react@16` requires it as a **peer** dependency and it was never
declared, so different resolutions produced different trees. `npm ci` requires an
exact match and hard-fails on any drift.

**Resolved.** The lockfile has been regenerated from `package.json`, verified with
`npm ci` (exit 0), and CI is back on strict `npm ci`. An interim band-aid that ran
`npm install --legacy-peer-deps` has been removed.

If `npm ci` ever fails this way again, regenerate the lockfile (§2) rather than
loosening the install step — the loose install hides drift instead of fixing it.

## 2. Dependency health — regenerating the lockfile

Regenerate whenever `npm ci` reports drift, or after changing `package.json`:

```bash
rm -rf node_modules package-lock.json
npm install                 # resolves from package.json alone
npm ci                      # MUST exit 0 — this is the gate CI uses
npm run lint && npm test && npm run build
git add package-lock.json && git commit -m "chore(deps): regenerate lockfile"
```

### Current vulnerability status (measured, not estimated)

`npm audit` on the regenerated tree reports **15 vulnerabilities — 12 high,
3 moderate, 0 critical**. `npm audit fix` resolves **none** of them: every
remaining fix requires a major upgrade. The chains are:

| Chain | Severity | Fix requires |
| --- | --- | --- |
| `vite`, `esbuild` | high / moderate | `vite@8` (from 5.x — three majors) |
| `eslint`, `@eslint/config-array`, `@eslint/eslintrc`, `brace-expansion`, `minimatch` | high | `eslint@10` (from 9.x) |
| `vite-plugin-pwa`, `workbox-build`, `ejs`, `jake`, `filelist`, `rollup-plugin-off-main-thread` | high | `vite-plugin-pwa` major |
| `react-router`, `react-router-dom` | moderate | `react-router@7` (real CVEs: open redirect via backslash in `<Link>`; constructor injection in `deserializeErrors()`) |

Note the exposure is mostly **build-time and dev-time** (bundler, linter, PWA
generator) rather than shipped runtime code — with the exception of
`react-router`, which does ship. That does not make them ignorable, but it does
mean they are lower risk than the raw "12 high" count suggests.

These are deliberately **not** applied here: each is a major upgrade that can
change build output or lint behaviour, and they should land as their own reviewed
change with the full check suite plus a browser pass (§6). Suggested order,
smallest blast radius first:

```bash
npm i react-router-dom@latest          # ships to users; do this one first
npm i -D eslint@latest typescript-eslint@latest
npm i -D vite@latest @vitejs/plugin-react-swc@latest vite-plugin-pwa@latest
# after each: npm ci && npm run lint && npm test && npm run build
```

`vite@8` will likely need `vite.config.ts` review and a PWA-plugin bump in the
same step; expect that one to need real work rather than a version bump.

**Keep the bun lockfile in sync too** (bun is the primary package manager for
this Lovable project):

```bash
bun install
git add bun.lock bun.lockb && git commit -m "chore(deps): sync bun lockfile"
```

## 3. Recommended: align CI with bun

Because the project is bun-managed, the cleanest long-term CI is bun-native — it
validates against the *maintained* lockfile and matches how Lovable builds:

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main, dev]
  workflow_dispatch:
jobs:
  verify:
    name: Lint, citations, build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with: { bun-version: latest }
      - run: bun install                 # add --frozen-lockfile once bun.lock is confirmed in sync
      - run: bun run lint
      - run: bun run check:citations
      - uses: actions/upload-artifact@v4
        if: always()
        with: { name: citation-report, path: reports/, if-no-files-found: warn }
      - run: bun run build
```

Swap this in once you can run it locally to confirm green.

---

## 4. Keep the content fresh (quarterly) — partly automated

The site is anchored to the annual Nasscom-Zinnov **GCC Value Orbit** benchmark
(FY2026), so the risk between releases is quiet rot.

**Automated.** `.github/workflows/freshness.yml` runs quarterly (and on manual
dispatch) and does the machine-checkable half: the full link sweep via
`npm run check:links` plus the citation check. It publishes both reports as
artifacts and in the run summary, and comments on a single rolling `link-health`
issue when links genuinely break. Trigger it any time from
**Actions → Content freshness → Run workflow**.

`scripts/check-links.mjs` classifies rather than reporting raw status codes —
`ok` / `blocked` (401/403/429 bot walls, not actionable) / `broken` (404/410) /
`error` (DNS, TLS, timeout). That distinction matters: many authoritative sources
(BCG, Zinnov, NASSCOM, Invest India, MCA) refuse automated clients while being
perfectly healthy in a browser, and several Indian government sites fail TLS
verification from GitHub runners specifically. Only `broken` and `error` warrant
action. It can be run locally too, but only from an environment with outbound
network — the authoring sandbox has none.

**Still manual** — the judgement half:

1. **Verify headline stats** against the newest Nasscom-Zinnov / ANSR release and
   update `src/data/gccData.ts` (dashboard) + `public/data/gcc-part*.json`.
2. **Refresh time-sensitive items:** the events card in `gccData.ts` (each entry is
   tagged UPCOMING/CONCLUDED — re-tag them), new entrants, and new reports.
3. **Re-verify anything marked indicative**, especially the comparator's banded
   English/IP ratings and office-cost figures.

---

## 5. Single source of truth for playbook content

The Playbook Viewer loads **only** these at runtime:

```
public/data/gcc-master-index.json   →   public/data/gcc-part1..4.json
```

Those are canonical. The drifted aggregates (`src/data/content.json`,
`public/data/gcc-content.json`, `gcc-content_old.json`) were removed in this
refresh. If a single full-text export is ever needed, **generate** it from the
part files in a build step — never hand-maintain a second copy, or facts drift.

Headline stats are duplicated in a few display spots that must be updated together:
`src/data/gccData.ts` (`stats`), `src/components/OverviewSection.tsx`,
`index.html` `<meta>` / JSON-LD, and the page `<meta>` in `src/pages/Index.tsx`.

---

## 6. Content-expansion backlog

**Delivered since the audit:**

- ~~Dedicated 2025-26 regulatory chapter~~ — shipped as Part III Ch 16 (DPDP Rules,
  four Labour Codes, Budget-2026 safe harbour, ten-state policy matrix).
- ~~State GCC-policy matrix~~ — included in that chapter.
- ~~Extend the Location Comparator~~ — office cost, English band, IP posture and
  setup time added behind a "More metrics" toggle, plus CSV export.
- ~~Glossary~~ — built as a real page (44 terms) with inline prose tooltips.
- ~~Sector playbooks~~ — shipped as Part III Ch 17 (BFSI, healthcare & life
  sciences, retail & FMCG).

**Remaining:**

- **Confirm the flagged report figures** against the gated Nasscom-Zinnov PDF: the
  exact four-way maturity-band split (only the ~46% aggregate is publicly
  verifiable) and any revenue-CAGR figure (currently omitted as unverifiable).
  These are the only numbers on the site not independently corroborated.
- **Dependency majors** — see §2; `react-router` first since it ships to users.
- **Comparator depth** — saved/side-by-side comparisons; more Tier-2 India city
  granularity rather than country-level only.
- **Trim remaining bloat** — superseded PDF/DOCX versions under `resources/docs`.
- **Consider bun-native CI** (§3) now that the npm lockfile is healthy — optional.
