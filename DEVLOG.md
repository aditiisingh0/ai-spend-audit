## Day 1 — 2026-05-20

**Hours worked:** 2

**What I did:**
Set up the Next.js project with TypeScript and Tailwind. Created the GitHub repo and pushed the first commit. Added GitHub Actions CI — took a few tries to get it green because Node 20 was deprecated. Created all the required markdown files as empty placeholders. Started looking up pricing for Cursor, ChatGPT, Claude, and Copilot.

**What I learned:**
CI setup is worth doing on day one. Debugging a broken workflow on day six would have been painful. Also learned that Node version matters in GitHub Actions — switched from 20 to 22 and it worked.

**Blockers / what I'm stuck on:**
Pricing data is incomplete — need to go through official pages for each tool carefully.

**Plan for tomorrow:**
Build the spend input form with all 8 tools, plan dropdowns, seat count, and monthly spend. Make sure form state persists on page reload.

---

## Day 2 — 2026-05-21

**Hours worked:** 3

**What I did:**
Built the full spend input form — 8 tools, each with plan dropdown, seats, and monthly spend. Wired up localStorage so the form survives page reloads. Built the audit engine with hardcoded rules for each tool — things like "Team plan for 2 users is overkill, switch to Pro." Also built the results page showing per-tool breakdown and total savings. Wrote 6 automated tests for the audit engine — all passing.

**What I learned:**
Keeping the audit logic in a separate file made testing really easy. I could just import the function and test it directly without any browser setup.

**Blockers / what I'm stuck on:**
Need to add the AI-generated summary using the Anthropic API. Pricing data still needs verification.

**Plan for tomorrow:**
Connect Anthropic API for the personalized summary. Set up Supabase for lead capture. Start on the shareable URL feature.

---

## Day 3 — 2026-05-22

**Hours worked:** 3

**What I did:**
Added the AI summary feature — it calls the Anthropic API and falls back to a templated summary if the API fails or the key is missing. Set up Supabase, created the leads table, and built the email capture form with honeypot spam protection. Tested the full flow end to end — form fills, audit runs, results show, email saves to database.

**What I learned:**
Supabase is surprisingly fast to set up. The honeypot approach for spam is much simpler than captcha and doesn't annoy real users.

**Blockers / what I'm stuck on:**
Anthropic API key not added yet — using fallback summary. Shareable URL still pending.

**Plan for tomorrow:**
Build shareable URL with unique ID. Deploy to Vercel. Start UI polish and entrepreneurial files.

---

## Day 4 — 2026-05-23

**Hours worked:** 8

**What I did:**
Built the shareable audit URL — each audit gets a unique ID, stored in Supabase, accessible at /audit/[id]. Added OG tags and Twitter Card meta tags so links preview nicely when shared. Deployed to Vercel — took under 2 minutes. Then spent the rest of the day on UI polish — switched to white theme with gradient background, added blur circle effects, noise texture, card hover animations, glow on the Run Audit button, and fade-in animations on tool cards. Filled in all the markdown files — GTM, ECONOMICS, REFLECTION, PROMPTS, TESTS, LANDING_COPY, METRICS, ARCHITECTURE, README, PRICING_DATA.

**What I learned:**
Mixing Tailwind classes with inline styles causes weird conflicts. Switched to pure inline styles for the results page and everything became predictable. CSS animations defined in globals.css work more reliably than trying to do them inline.

**Blockers / what I'm stuck on:**
User interviews — sent messages to several people on LinkedIn, waiting for replies.

**Plan for tomorrow:**
Complete user interviews. Add Resend email. Fix any accessibility issues. Submit.

---

## Day 5 — 2026-05-25

**Hours worked:** 4

**What I did:**
Got responses from 6 people on LinkedIn — Jespreet, Nilesh, Sayan, Vishal, Suman, and Jiya. Wrote up USER_INTERVIEWS.md with quotes, design changes, and cross-interview patterns. Added Resend for transactional email — users now get a confirmation email with their audit summary when they submit their email. Fixed accessibility issues — added aria-labels and htmlFor to all form inputs. Ran Lighthouse on the live URL — Performance 100, Accessibility 100, Best Practices 100, SEO 100. Did a final review of all files and verified CI is green.

**What I learned:**
The Resend API key had to be added to Vercel environment variables separately — it wasn't enough to have it in .env.local. Aria-labels on form inputs pushed the Lighthouse accessibility score from 83 to 100.

**Blockers / what I'm stuck on:**
Nothing — everything is working end to end.

**Plan for tomorrow:**
Submit.