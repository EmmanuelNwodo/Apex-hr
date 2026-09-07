# Apex HR Website

Employer-first HR, recruitment and people-consulting platform for Apex HR.
See [CLAUDE.md](./CLAUDE.md) for the full operating brief and
[DESIGN.md](./DESIGN.md) for the design system this build implements.

## Stack

Next.js (App Router) · React · TypeScript (strict) · Tailwind CSS 4 · npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # start the dev server
npm run build      # production build
npm run start      # run the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values as integrations
are confirmed. No live credentials are required for the frontend to render —
see `src/lib/sanity/` and `src/lib/supabase/` for the typed integration
boundaries.
