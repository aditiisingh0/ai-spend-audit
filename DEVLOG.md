## Day 1 — 2026-05-20

**Hours worked:** 2

**What I did:**
- Initialized Next.js + TypeScript project with Tailwind CSS
- Created GitHub repository and pushed initial code
- Set up GitHub Actions CI workflow — green on latest commit
- Created all required markdown files (DEVLOG, ARCHITECTURE, REFLECTION, etc.)
- Started pricing research for Cursor, ChatGPT, Claude, Copilot

**What I learned:**
- GitHub Actions requires correct Node.js version — Node 20 was deprecated, switched to Node 22
- Setting up CI early saves time debugging later

**Blockers / what I'm stuck on:**
- Pricing data still incomplete — need to verify all tool prices from official pages

**Plan for tomorrow:**
- Build spend input form with 8 AI tools
- Add plan dropdown, seats input, monthly spend per tool
- Implement localStorage persistence so form data survives page reload

## Day 2 — 2026-05-21

**Hours worked:** 3

**What I did:**
- Built spend input form with 8 AI tools — Cursor, GitHub Copilot, Claude, ChatGPT, Gemini, Windsurf, OpenAI API, Anthropic API
- Added plan dropdown, seats input, and monthly spend per tool
- Implemented localStorage persistence — form data survives page reload
- Built audit engine with defensible rules for each tool
- Built results page showing per-tool breakdown and total savings
- Wrote 6 automated tests for audit engine — all passing

**What I learned:**
- Keeping audit logic in a separate file makes it much easier to test
- localStorage is simple but effective for form persistence

**Blockers / what I'm stuck on:**
- Need to add AI-generated summary using Anthropic API tomorrow
- Pricing data still needs verification from official sources

**Plan for tomorrow:**
- Connect Anthropic API for personalized audit summary
- Start building backend — Supabase for lead capture
- Add shareable URL with OG tags

## Day 3 — 2026-05-22

**Hours worked:** 3

**What I did:**
- Built AI summary feature using Anthropic API with graceful fallback to templated summary
- Set up Supabase database and created leads table
- Built lead capture form — email, company name, role
- Added honeypot spam protection
- Leads saving successfully to Supabase — verified with test submission
- Connected all features end to end — form → audit → results → lead capture

**What I learned:**
- Supabase is very fast to set up — table ready in minutes
- Honeypot is simpler than captcha and less annoying for real users
- Always test the full flow end to end, not just individual pieces

**Blockers / what I'm stuck on:**
- Anthropic API key not added yet — using fallback summary for now
- Shareable URL still pending

**Plan for tomorrow:**
- Build shareable URL with unique ID and OG tags
- Deploy to Vercel
- Start UI polish

## Day 4 — 2026-05-23

**Hours worked:** 3

**What I did:**
- Built shareable audit URL with unique ID per audit
- Added OG tags and Twitter Card meta tags for link previews
- Created audits table in Supabase to store shared audits
- Deployed to Vercel — live at https://ai-spend-audit-gules.vercel.app
- Updated environment variables in Vercel dashboard

**What I learned:**
- Vercel deployment is very fast — under 2 minutes from push to live
- Environment variables must be set in Vercel separately from .env.local

**Blockers / what I'm stuck on:**
- NEXT_PUBLIC_APP_URL needs to be updated to real Vercel URL
- UI polish still pending

**Plan for tomorrow:**
- UI polish — better landing page, hero section, improved results page
- Fill in PRICING_DATA.md, ARCHITECTURE.md
- Start entrepreneurial files — GTM, ECONOMICS