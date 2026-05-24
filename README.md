# AI Spend Audit

A free web app that audits your AI tool spending and tells you exactly
where you are overpaying — with specific recommendations and savings numbers.
Built as a lead generation tool for Credex, a discounted AI credits marketplace.

**Live:** https://ai-spend-audit-gules.vercel.app

## Screenshots

### Landing Page
Clean hero section with value proposition — free, instant, no login required. Gradient background with blur circle effects.

### Spend Input Form
Tool cards expand on click to show plan, seats, and monthly spend. LocalStorage persistence — form survives page reload.

### Results Page
Per-tool breakdown with severity badges, AI-generated audit summary, email lead capture, and shareable link generation.

## Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Run tests
npm test

# Deploy
# Push to main — Vercel auto-deploys
```

## Environment Variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
ANTHROPIC_API_KEY=your_anthropic_api_key
NEXT_PUBLIC_APP_URL=your_deployed_url

## Decisions

**1. Hardcoded audit rules instead of AI**
The audit engine uses deterministic if/else logic, not an LLM. Financial
recommendations need to be consistent and testable. AI is used only for
the summary paragraph where creativity adds value.

**2. Next.js over plain React**
Needed server-side rendering for the shareable audit page (OG tags require
server-rendered meta tags). Next.js App Router gives this out of the box.
API routes replace the need for a separate backend.

**3. Supabase over Firebase**
Postgres gives us proper relational queries. Supabase has a built-in
dashboard to view leads without building an admin panel. Free tier is
generous enough for an MVP.

**4. localStorage for form persistence**
Simple, zero-latency, no backend needed. The form data is not sensitive.
If the user clears their browser they lose their inputs — acceptable
tradeoff for the simplicity.

**5. Email gate after value, never before**
The audit results are shown immediately with no login required. Email is
only asked after the user has seen their savings number. This maximises
completion rate and trust.

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (serverless)
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Testing:** Jest + ts-jest

## Live URL

https://ai-spend-audit-gules.vercel.app