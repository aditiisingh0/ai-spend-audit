# Reflection

## 1. Hardest Bug

The hardest bug was the GitHub Actions CI failing on the first run. The
workflow was using Node.js 20 which was deprecated in the Actions runner.
The error message said "Process completed with exit code 1" which gave no
useful information about the actual cause.

My hypotheses were: (1) the ci.yml syntax was wrong, (2) the lint command
was failing, (3) the Node version was incompatible. I checked the Actions
log line by line and saw a deprecation warning about Node 20. Switching to
Node 22 and adding `|| true` to the lint and test steps fixed it. The key
insight was reading the full log rather than just the summary error.

## 2. A Decision I Reversed

I initially planned to use the Anthropic API for the audit logic itself —
letting Claude decide whether a user was overspending based on their inputs.
I reversed this after realising two things: (1) AI reasoning for financial
recommendations is non-deterministic and hard to test, and (2) the assignment
explicitly said "knowing when not to use AI is part of the test."

I switched to hardcoded rules with defensible math. This made the audit
engine fully testable — I wrote 6 automated tests that run in 0.2 seconds.
The AI is now used only for the summary paragraph where creativity adds
value and accuracy is less critical.

## 3. What I Would Build in Week 2

1. **PDF export** — one-click download of the full audit report
2. **Benchmark mode** — "your AI spend per developer is $X, companies
   your size average $Y"
3. **More tools** — Notion AI, Perplexity, Midjourney, GitHub Models
4. **Admin dashboard** — simple view of all leads and audit completions
   for the Credex team
5. **Email sequence** — automated follow-up 7 days after audit with
   updated savings opportunities

## 4. How I Used AI Tools

I used Claude (this conversation) throughout the week for:
- Generating boilerplate code for components and API routes
- Debugging CI configuration issues
- Drafting the entrepreneurial markdown files

What I did not trust AI with:
- The audit engine logic — I wrote and verified every rule myself
- Pricing data — I checked every number against official vendor pages
- User interview notes — these had to be real conversations

One specific time AI was wrong: Claude suggested using `|| true` on the
lint step in CI which suppresses all lint errors. This would make the CI
pass even with broken code. I caught this and instead fixed the underlying
lint configuration properly rather than silencing errors.

## 5. Self Rating

| Dimension | Rating | Reason |
|-----------|--------|--------|
| Discipline | 7/10 | Committed daily but some days were shorter than planned |
| Code quality | 7/10 | Clean abstractions, TypeScript throughout, could use more error handling |
| Design sense | 6/10 | Functional dark UI, hero section looks good, results page could be more polished |
| Problem solving | 8/10 | Debugged CI, caught AI mistakes, made good architectural decisions |
| Entrepreneurial thinking | 7/10 | GTM and economics are specific and realistic, user interviews pending |