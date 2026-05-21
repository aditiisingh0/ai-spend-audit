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