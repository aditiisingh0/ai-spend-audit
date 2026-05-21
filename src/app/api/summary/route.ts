import { NextRequest, NextResponse } from 'next/server';
import { AuditSummary } from '../../components/auditEngine';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const summary: AuditSummary = body.summary;
  const useCase: string = body.useCase;

  const prompt = `You are an AI spending advisor. A startup has completed an AI tool audit with these results:

Total monthly spend: $${summary.totalMonthlySpend}
Total potential monthly savings: $${summary.totalMonthlySaving}
Total potential annual savings: $${summary.totalAnnualSaving}
Primary use case: ${useCase}

Tool breakdown:
${summary.results.map(r => `- ${r.toolName} (${r.currentPlan}): $${r.currentSpend}/mo → ${r.recommendedAction} → saves $${r.potentialSaving}/mo`).join('\n')}

Write a personalized 80-100 word summary paragraph for this startup. Be specific about their situation, mention their biggest saving opportunity by name, and end with one clear action they should take today. Be direct and helpful, not salesy.`;

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey || apiKey === 'dummy_key_for_now') {
      throw new Error('No API key');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';

    return NextResponse.json({ summary: text, source: 'ai' });

  } catch {
    // Fallback templated summary
    const biggest = summary.results
      .filter(r => r.potentialSaving > 0)
      .sort((a, b) => b.potentialSaving - a.potentialSaving)[0];

    const fallback = biggest
      ? `Your AI stack is costing $${summary.totalMonthlySpend}/month, but you could trim that by $${summary.totalMonthlySaving}/month — saving $${summary.totalAnnualSaving} this year. Your biggest opportunity is ${biggest.toolName}: ${biggest.reason} Start there today and you will see the savings immediately.`
      : `Your AI stack of $${summary.totalMonthlySpend}/month looks well optimized. You are on the right plans for your team size and use case. Keep an eye on usage as your team grows — that is usually when overspend creeps in.`;

    return NextResponse.json({ summary: fallback, source: 'fallback' });
  }
}