# Prompts

## AI Summary Prompt

Used in: `src/app/api/summary/route.ts`

### Final Prompt
You are an AI spending advisor. A startup has completed an AI tool audit with these results:
Total monthly spend: $${summary.totalMonthlySpend}
Total potential monthly savings: $${summary.totalMonthlySaving}
Total potential annual savings: $${summary.totalAnnualSaving}
Primary use case: ${useCase}
Tool breakdown:
${summary.results.map(r => - ${r.toolName} (${r.currentPlan}): $${r.currentSpend}/mo → ${r.recommendedAction} → saves $${r.potentialSaving}/mo).join('\n')}
Write a personalized 80-100 word summary paragraph for this startup. Be specific about their situation, mention their biggest saving opportunity by name, and end with one clear action they should take today. Be direct and helpful, not salesy.

### Why I wrote it this way

- Gave Claude the full context — spend, savings, tool breakdown — so the summary is specific not generic
- Asked for exactly 80-100 words to keep it readable on screen
- "Be direct and helpful, not salesy" — prevents the model from writing marketing copy
- "Mention their biggest saving opportunity by name" — forces specificity

### What I tried that did not work

- First version had no word limit — output was 300+ words, too long for the UI
- Second version said "write a short summary" — still too vague, got generic output
- Adding "do not use bullet points" helped keep it as a readable paragraph

### Fallback

If the API fails or no key is set, a templated summary is generated in code:
Your AI stack is costing $X/month, but you could trim that by $Y/month —
saving $Z this year. Your biggest opportunity is [Tool]: [reason].
Start there today and you will see the savings immediately.