# Maintenance & Operations Runbook

Practical steps for keeping the GCC Playbook healthy: fixing CI, resolving the
Dependabot alerts, keeping content fresh, and the single-source-of-truth rules.
Written July 2026 during the content-refresh audit (see PR #36).

---

## 1. Why CI was red — and the applied fix

**Symptom:** every CI run failed at *Install dependencies* with dozens of
`npm error Missing: … from lock file` / `Invalid: … does not satisfy …`.

**Cause:** this is a **bun-managed (Lovable) project** — `bun.lockb` / `bun.lock`
are the maintained lockfiles. The committed `package-lock.json` has **drifted**
from `package.json`, and `npm ci` requires an *exact* match, so it hard-fails on
any drift. This was pre-existing and unrelated to content changes.

**Applied fix (`.github/workflows/ci.yml`):** the install step now uses a
reconciling install instead of the strict one:

```yaml
- name: Install dependencies
  run: npm install --no-audit --no-fund --legacy-peer-deps
```

This unblocks lint / citations / build. It is a pragmatic band-aid — the proper
fix is to regenerate the lockfile (§2) or move CI to bun (§3).

> **Note on the approval gate:** GitHub does not auto-run Actions on commits
> authored by a non-collaborator bot. Approve the pending run on the PR's
> **Checks / Actions** tab to see CI execute. `workflow_dispatch` is now enabled,
> so a maintainer can also trigger CI manually from the Actions tab.

---

## 2. Dependency health — regenerate the lockfile & clear the alerts

**Finding (from the audit):** the committed `package-lock.json` is *already
mostly patched*. A scan against a curated advisory table found only **three
still-vulnerable (moderate)** packages and **no critical**:

| Package | In lockfile | Fix | Advisory |
| --- | --- | --- | --- |
| `esbuild` | 0.21.5 (via `vite` 5.4.19) | ≥ 0.25.0 | GHSA-67mh-4wv8-2f99 (dev-server) |
| `vite` | 5.4.19 | ≥ 5.4.20 / 6 / 7 | fs / file-serving advisories |
| `jsdom` | 20.0.3 (dev, tests) | ≥ 25 | old transitive surface |

**Implication:** most of the 37 Dependabot alerts are very likely **stale** —
GitHub is scoring an older dependency-graph snapshot. Pushing a freshly
regenerated, in-sync lockfile lets Dependabot re-scan and auto-close the stale
ones. Do this in a **networked checkout** (the CI sandbox has no outbound network):

```bash
# 1) Regenerate a clean, in-sync npm lockfile
rm -rf node_modules package-lock.json
npm install                       # resolves current, mostly-patched versions
npm audit                         # ← the authoritative list of remaining alerts
npm audit fix                     # safe, in-range fixes
# npm audit fix --force           # only if needed; re-test afterwards

# 2) Targeted upgrades for the three concrete items above
npm i -D vite@^7 @vitejs/plugin-react-swc@latest   # brings esbuild ≥0.25
npm i -D jsdom@^25

# 3) Verify, then commit
npm run lint && npm run build && npm test
git add package-lock.json package.json && \
  git commit -m "chore(deps): regenerate lockfile and patch advisories"
```

> `vite` 6→7 is a major bump — re-check `vite.config.ts`, `vite-plugin-pwa`, and
> `@vitejs/plugin-react-swc` compatibility after upgrading. If anything breaks,
> `vite@^6` still clears the esbuild advisory.

**Keep the bun lockfile in sync too** (it is the primary one for this project):

```bash
bun install          # updates bun.lock / bun.lockb
git add bun.lock bun.lockb && git commit -m "chore(deps): sync bun lockfile"
```

---

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

## 4. Keep the content fresh (quarterly)

The site is anchored to the annual Nasscom-Zinnov **GCC Value Orbit** benchmark
(FY2026). Between annual reports, run a light quarterly refresh:

1. **Verify headline stats** against the newest Nasscom-Zinnov / ANSR release and
   update `src/data/gccData.ts` (dashboard) + `public/data/gcc-part*.json`.
2. **Refresh time-sensitive items:** the events card in `gccData.ts` (mark
   past/upcoming), new entrants, and the resource library.
3. **Link-health sweep** of `src/data/resourcesData.ts` — must run somewhere with
   network (CI or local); the offline sandbox cannot reach external hosts.
4. **Run the validators:** `npm run check:citations` and `node scripts/validate-jsonld.mjs`.

Optional automation — a scheduled CI job that opens a delta PR:

```yaml
on:
  schedule:
    - cron: '0 6 1 */3 *'   # 06:00 UTC, 1st of every 3rd month
```

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

## 6. Content-expansion backlog (from the audit)

Higher-effort items worth commissioning, in rough priority order:

- **Dedicated 2025–26 regulatory chapter** — DPDP Rules (compliance 13 May 2027),
  the four Labour Codes (in force 21 Nov 2025), Budget-2026 transfer-pricing safe
  harbour (₹2,000 cr / 15.5%), SEZ Amendment Rules 2025.
- **State GCC-policy matrix** — Karnataka, Tamil Nadu (scheme, not policy), UP,
  Andhra Pradesh, Telangana, Gujarat, Madhya Pradesh, Rajasthan, Odisha, with dates
  and headline incentives.
- **Confirm the flagged report figures** against the gated PDF: exact maturity-band
  split, and any revenue-CAGR figure (currently omitted as unverifiable).
- **Extend the Location Comparator** — add saved comparisons, more metrics
  (real-estate cost, English proficiency, IP-protection score), and export.
- **Trim remaining bloat** — superseded PDF/DOCX versions under `resources/docs`.
