# User Interviews

Conducted via LinkedIn DM — May 23–25, 2026.
Outreach message: "Hey, got 10 minutes? Working on a project about AI 
tool spending — just wanted to ask which AI tools you use (ChatGPT, 
Cursor etc.), how much you spend, and how you decide which ones to get. 
Can be a quick call or text!"

---

## Interview 1 — JS, Founder & SEO Expert

**Role:** Founder, DOMIN8 (SEO/Google Ads agency)
**Team size:** Small team
**Date:** 2026-05-24
**Method:** LinkedIn DM

**What tools do you use?**
Multiple AI tools depending on the type of work and results needed — 
uses different tools for different roles.

**Key quotes:**
- "I use too many AI tools, it depends on our work, what kind of 
  results I need, so I use different roles for results"
- "Can you tell me what you want to do so I suggest you are the 
  best AI tool"

**Spending pattern:** Pays for multiple subscriptions simultaneously;
does not track which tool is being used for what purpose.

**Most surprising insight:** Even a founder who actively sells AI 
services does not have a clear picture of which tool costs what — 
he thinks in terms of "use cases" not "subscriptions."

**Design change:** Added use case selector (coding/writing/research/mixed)
to the form — this was directly inspired by Jespreet's framing that 
tool choice depends entirely on what you are trying to accomplish.

---

## Interview 2 — NC, Developer/Tech Professional

**Role:** Developer
**Team size:** Individual
**Date:** 2026-05-24
**Method:** LinkedIn DM

**What tools do you use?**
Deepseek, ChatGPT, Gemini Pro, Grok, and others.

**Key quotes:**
- Listed tools: "Deepseek, ChatGPT, Gemini Pro, Grok, etc."

**Spending pattern:** Uses multiple tools in parallel — classic 
redundancy pattern where similar tools overlap in functionality.

**Most surprising insight:** A developer using 4+ AI tools 
simultaneously, likely paying for multiple when one or two would cover 
all use cases. Deepseek + ChatGPT + Gemini Pro is significant overlap.

**Design change:** Reinforced the redundancy detection logic in the 
audit engine — if someone has both ChatGPT and Gemini Pro, the audit 
should flag this as potential overlap depending on use case.

---

## Interview 3 — SG, Full Stack Developer & ML/IoT Enthusiast

**Role:** Full Stack Developer, ECE Undergrad
**Team size:** Individual
**Date:** 2026-05-23
**Method:** LinkedIn DM

**What tools do you use?**
ChatGPT and Gemini for research. "Anti gravity" (Windsurf) for coding.

**Key quotes:**
- "Depends on what u are working on"
- "For any research purpose I generally use ChatGPT / gemini"
- "And for coding purpose Anti gravity"

**Spending pattern:** Splits tools by use case — research vs coding.
Does not appear to pay for premium plans.

**Most surprising insight:** Developers naturally segment their AI 
usage by task type without realizing this is exactly what should 
drive their plan decisions. The audit should reflect this.

**Design change:** The use case field in the form became more important 
after this interview — we now cross-reference use case with tool choice 
to detect mismatches (e.g. paying for Cursor Business for writing work).

---

## Interview 4 — VVD, Developer

**Role:** Developer
**Team size:** Individual
**Date:** 2026-05-23
**Method:** LinkedIn DM

**What tools do you use?**
Claude and Antigravity (Windsurf), plus a few other free tools.

**Key quotes:**
- "I mostly use Claude, Antigravity and a few other free AI tools"
- "I'm not really spending money on subscriptions right, mainly 
  just using the free tiers"

**Spending pattern:** Free tiers only — zero paid subscriptions.

**Most surprising insight:** A segment of developers has found ways 
to get most AI value from free tiers alone. The audit should handle 
this gracefully — not every user is overspending, and the tool should 
honestly tell them they are spending well.

**Design change:** Added the "You are spending well" state to the 
results page for users with low or zero identified savings. Honest 
results build more trust than pushing unnecessary recommendations.

---

## Interview 5 — SK, CSE Undergrad / Developer

**Role:** Computer Science student, MERN Stack developer
**Team size:** Individual
**Date:** 2026-05-23
**Method:** LinkedIn DM

**What tools do you use?**
Claude and ChatGPT — free versions only.

**Key quotes:**
- "Claude" and "chat gpt" and "free version"

**Spending pattern:** Uses two of the top AI assistants but 
exclusively on free tiers. No paid subscriptions.

**Most surprising insight:** Even developers building projects with 
MERN stack are not paying for AI tools — they are managing within 
free limits. This suggests the paid tier opportunity is strongest 
with employed developers and small teams, not students.

**Design change:** Clarified target user in GTM.md — students are 
not the primary audience. Focus on employed developers and 
early-stage startup teams who are already paying.

---

## Interview 6 — JR, Developer/Student

**Role:** Developer
**Team size:** Individual  
**Date:** 2026-05-23
**Method:** LinkedIn DM

**What tools do you use?**
Claude and Gemini. Spends around 2-3 hours per day using AI tools.

**Key quotes:**
- "Claude, Gemini..."
- "I spend around 2-3 hours a day"

**Spending pattern:** Heavy daily user (2-3 hrs/day) but not 
necessarily paying — usage intensity does not directly correlate 
with paid subscriptions at the individual level.

**Most surprising insight:** Someone spending 2-3 hours daily on AI 
tools is a prime candidate for a paid plan — they are likely hitting 
free tier limits regularly. The audit could flag heavy usage as a 
signal to upgrade strategically rather than randomly.

**Design change:** Future improvement — add a "daily usage hours" 
field to the form to catch heavy free-tier users who would benefit 
from a paid plan.

---

## Cross-Interview Patterns

1. **Tool overlap is universal** — every respondent uses 2+ AI tools,
   often with significant functional overlap (ChatGPT + Gemini + Claude).

2. **Use case drives tool choice** — developers naturally separate 
   coding tools from research/writing tools. The audit should respect 
   this mental model.

3. **Free tiers are surprisingly capable** — several respondents had 
   zero paid spend. The tool needs to handle this honestly.

4. **Nobody tracks spending** — not one person mentioned having a 
   spreadsheet or system to track AI tool costs. This is the core 
   problem the audit solves.

5. **Decision-making is ad hoc** — tools are picked based on word of 
   mouth or "trying it out," not systematic comparison. Nobody 
   mentioned comparing pricing pages before subscribing.