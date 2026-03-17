# GCCLeadership PWA Integration Guide

This document tracks the integration of the GCCLeadership PWA playbook navigator into the kr-gcc-playbook-hub Lovable app.

## What Was Added (via GitHub push)

| File | Purpose |
|------|---------|
| `src/pages/PlaybookViewer.tsx` | Full React port of the GCCLeadership PWA SPA — home, TOC, chapter, glossary, search pages |
| `src/components/PlaybookNavCard.tsx` | Entry card component to embed in any hub page |
| `INTEGRATION_GUIDE.md` | This file |

## What Lovable Needs to Do (use the Lovable Prompt below)

1. Add `/playbook` route in `src/App.tsx` pointing to `PlaybookViewer`
2. Embed `PlaybookNavCard` in the hub's main landing/index page
3. Copy `gcc-content.json` from GCCLeadership into `public/data/gcc-content.json`
4. Add PWA manifest + service worker support to `vite.config.ts`
5. Add install prompt UI (optional)

## Data File

The PlaybookViewer fetches `/data/gcc-content.json` at runtime.
Source: `https://raw.githubusercontent.com/kalilurrahman/GCCLeadership/main/pwa/public/data/content.json`

Copy this file to `public/data/gcc-content.json` in this repo.

## Route

`/playbook` → PlaybookViewer (full SPA with internal navigation)

## Lovable Prompt

See README or ask Perplexity for the ready-to-paste Lovable prompt.
