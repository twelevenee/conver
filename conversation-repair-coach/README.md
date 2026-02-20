# Conversation Repair Coach

A full-stack AI-powered tool that helps people rewrite emotionally charged messages with empathy and clarity. Built on Nonviolent Communication (NVC) principles.

## What it does

Paste a message or conversation thread. The app uses Claude to:

- **Flag harmful patterns** — "you always/never", blame language, contempt, stonewalling, mind-reading
- **Break down the subtext** — maps the message to NVC components: Observation → Feeling → Need → Request
- **Generate three rewrites** in different tones: direct but gentle, vulnerable and open, de-escalating

A **Couples mode** analyzes both sides of a conversation simultaneously, identifies shared underlying needs, and suggests one concrete action to move toward each other.

## Why I built it this way

The app started as a single `index.html` file that called the Anthropic API directly from the browser — functional, but the API key was exposed in client-side code. The decision to migrate to Next.js was driven by two concerns:

**Security**: Moving the API call into a Next.js Route Handler (`app/api/analyze/route.ts`) means the key lives exclusively in the server environment. It never appears in the JS bundle, network requests, or browser DevTools. The env variable deliberately omits the `NEXT_PUBLIC_` prefix to enforce this.

**Maintainability**: A 947-line monolithic HTML file is hard to extend. Splitting into typed components (`SoloPanel`, `CouplesPanel`, `PersonResults`, etc.) with shared hooks (`useAnalyzeSolo`, `useAnalyzeCouples`) makes the data flow and responsibilities explicit.

## Architecture

```
Browser                     Server (Next.js)
  │                               │
  │  POST /api/analyze            │
  │  { mode, text, ... }  ──────► │  route.ts
  │                               │    │
  │                               │    ▼
  │                               │  Anthropic SDK
  │                               │  (API key server-only)
  │                               │    │
  │  { flags, nvc, rewrites }     │    ▼
  │ ◄─────────────────────────────│  JSON response
```

The single `/api/analyze` route handles both modes via a `mode` discriminator field in the request body, keeping the Anthropic client instantiated at module level (not per-request) for connection reuse.

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 16 (App Router) | API routes + React in one project, no separate backend |
| Language | TypeScript | Shared types between API route and client components |
| Styling | Tailwind CSS v4 | Design tokens defined in CSS `@theme` block, no config file needed |
| AI | Anthropic Claude (`claude-sonnet-4-20250514`) | NVC analysis requires nuanced language understanding |
| Fonts | `next/font/google` | Eliminates FOUT, no external stylesheet request |

## Project structure

```
app/
  api/analyze/route.ts   # Server-side API handler
  layout.tsx             # Fonts, metadata, global styles
  page.tsx               # Root client component, mode state
components/
  solo/                  # SoloPanel, SoloResults
  couples/               # CouplesPanel, PersonInput, CouplesResults, PersonResults, InsightCard
  ui/                    # FlagsSection, NvcCard, RewriteCard, LoadingSpinner, ErrorMessage
hooks/
  useAnalyzeSolo.ts      # fetch + state for solo mode
  useAnalyzeCouples.ts   # fetch + state for couples mode
lib/
  prompts.ts             # System prompt + user prompt builders
  types.ts               # Shared TypeScript interfaces
```

## Running locally

```bash
npm install
```

Create `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
