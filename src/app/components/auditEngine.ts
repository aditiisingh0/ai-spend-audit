export interface ToolEntry {
  enabled: boolean;
  plan: string;
  seats: number;
  monthlySpend: number;
}

export interface FormData {
  tools: Record<string, ToolEntry>;
  teamSize: number;
  useCase: string;
}

export interface AuditResult {
  toolId: string;
  toolName: string;
  currentPlan: string;
  currentSpend: number;
  recommendedAction: string;
  recommendedTool?: string;
  potentialSaving: number;
  reason: string;
  severity: 'high' | 'medium' | 'low' | 'ok';
}

export interface AuditSummary {
  results: AuditResult[];
  totalMonthlySpend: number;
  totalMonthlySaving: number;
  totalAnnualSaving: number;
}

export function runAudit(form: FormData): AuditSummary {
  const results: AuditResult[] = [];
  let totalMonthlySpend = 0;

  // --- CURSOR ---
  if (form.tools['cursor']?.enabled) {
    const t = form.tools['cursor'];
    totalMonthlySpend += t.monthlySpend;

    if (t.plan === 'Business' && t.seats <= 2) {
      results.push({
        toolId: 'cursor',
        toolName: 'Cursor',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Downgrade to Cursor Pro',
        potentialSaving: t.monthlySpend - t.seats * 20,
        reason: 'Business plan is designed for 5+ users. With ' + t.seats + ' seat(s), Pro saves you money with the same core features.',
        severity: 'high',
      });
    } else if (t.plan === 'Business' && form.useCase === 'writing') {
      results.push({
        toolId: 'cursor',
        toolName: 'Cursor',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Switch to Claude Pro for writing',
        recommendedTool: 'Claude Pro',
        potentialSaving: t.monthlySpend - 20,
        reason: 'Cursor is optimized for coding. For writing workloads, Claude Pro at $20/month gives better results.',
        severity: 'medium',
      });
    } else {
      results.push({
        toolId: 'cursor',
        toolName: 'Cursor',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'No change needed',
        potentialSaving: 0,
        reason: 'Your Cursor plan fits your team size and use case well.',
        severity: 'ok',
      });
    }
  }

  // --- GITHUB COPILOT ---
  if (form.tools['github-copilot']?.enabled) {
    const t = form.tools['github-copilot'];
    totalMonthlySpend += t.monthlySpend;

    if (t.plan === 'Enterprise' && t.seats <= 5) {
      results.push({
        toolId: 'github-copilot',
        toolName: 'GitHub Copilot',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Downgrade to Business plan',
        potentialSaving: t.seats * (39 - 19),
        reason: 'Enterprise plan adds SSO and audit logs — unnecessary for teams under 5. Business plan at $19/seat covers all core features.',
        severity: 'high',
      });
    } else if (t.plan === 'Business' && form.tools['cursor']?.enabled) {
      results.push({
        toolId: 'github-copilot',
        toolName: 'GitHub Copilot',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Consider dropping Copilot — you already have Cursor',
        potentialSaving: t.monthlySpend,
        reason: 'Cursor and GitHub Copilot overlap heavily for coding assistance. Running both is redundant for most teams.',
        severity: 'high',
      });
    } else {
      results.push({
        toolId: 'github-copilot',
        toolName: 'GitHub Copilot',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'No change needed',
        potentialSaving: 0,
        reason: 'GitHub Copilot plan is appropriate for your team.',
        severity: 'ok',
      });
    }
  }

  // --- CLAUDE ---
  if (form.tools['claude']?.enabled) {
    const t = form.tools['claude'];
    totalMonthlySpend += t.monthlySpend;

    if (t.plan === 'Team' && t.seats <= 2) {
      results.push({
        toolId: 'claude',
        toolName: 'Claude',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Switch to Claude Pro (individual)',
        potentialSaving: t.monthlySpend - 20,
        reason: 'Claude Team plan starts at $30/seat and is built for 5+ users. With ' + t.seats + ' seat(s), Pro at $20/month is the better fit.',
        severity: 'high',
      });
    } else if (t.plan === 'Max' && form.useCase === 'coding') {
      results.push({
        toolId: 'claude',
        toolName: 'Claude',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Downgrade to Claude Pro',
        potentialSaving: 80,
        reason: 'Claude Max ($100/mo) is for heavy research and writing workflows. For coding, Claude Pro at $20/mo gives sufficient usage limits.',
        severity: 'medium',
      });
    } else {
      results.push({
        toolId: 'claude',
        toolName: 'Claude',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'No change needed',
        potentialSaving: 0,
        reason: 'Your Claude plan matches your usage well.',
        severity: 'ok',
      });
    }
  }

  // --- CHATGPT ---
  if (form.tools['chatgpt']?.enabled) {
    const t = form.tools['chatgpt'];
    totalMonthlySpend += t.monthlySpend;

    if (t.plan === 'Team' && t.seats <= 2) {
      results.push({
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Switch to ChatGPT Plus per person',
        potentialSaving: t.monthlySpend - t.seats * 20,
        reason: 'ChatGPT Team costs $30/seat. With only ' + t.seats + ' user(s), individual Plus plans at $20/seat saves money.',
        severity: 'high',
      });
    } else if (
      t.plan === 'Plus' &&
      form.tools['claude']?.enabled &&
      form.useCase === 'writing'
    ) {
      results.push({
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Drop ChatGPT — Claude covers writing better',
        potentialSaving: t.monthlySpend,
        reason: 'You already pay for Claude which outperforms ChatGPT for writing tasks. Running both is redundant.',
        severity: 'medium',
      });
    } else {
      results.push({
        toolId: 'chatgpt',
        toolName: 'ChatGPT',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'No change needed',
        potentialSaving: 0,
        reason: 'Your ChatGPT plan is appropriately sized.',
        severity: 'ok',
      });
    }
  }

  // --- GEMINI ---
  if (form.tools['gemini']?.enabled) {
    const t = form.tools['gemini'];
    totalMonthlySpend += t.monthlySpend;

    if (t.plan === 'Ultra' && form.useCase === 'coding') {
      results.push({
        toolId: 'gemini',
        toolName: 'Gemini',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Downgrade to Gemini Pro',
        potentialSaving: 10,
        reason: 'Gemini Ultra is built for multimodal and complex reasoning tasks, not coding. Pro at $20/mo is sufficient for coding assistance.',
        severity: 'medium',
      });
    } else {
      results.push({
        toolId: 'gemini',
        toolName: 'Gemini',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'No change needed',
        potentialSaving: 0,
        reason: 'Gemini plan looks appropriate for your use case.',
        severity: 'ok',
      });
    }
  }

  // --- WINDSURF ---
  if (form.tools['windsurf']?.enabled) {
    const t = form.tools['windsurf'];
    totalMonthlySpend += t.monthlySpend;

    if (form.tools['cursor']?.enabled) {
      results.push({
        toolId: 'windsurf',
        toolName: 'Windsurf',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Drop Windsurf — redundant with Cursor',
        potentialSaving: t.monthlySpend,
        reason: 'Windsurf and Cursor are both AI code editors. Pick one. Cursor has broader model support; Windsurf has Flows. Eliminate the overlap.',
        severity: 'high',
      });
    } else {
      results.push({
        toolId: 'windsurf',
        toolName: 'Windsurf',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'No change needed',
        potentialSaving: 0,
        reason: 'Windsurf is a solid choice if you are not using Cursor.',
        severity: 'ok',
      });
    }
  }

  // --- OPENAI API ---
  if (form.tools['openai-api']?.enabled) {
    const t = form.tools['openai-api'];
    totalMonthlySpend += t.monthlySpend;

    if (t.monthlySpend > 500) {
      results.push({
        toolId: 'openai-api',
        toolName: 'OpenAI API',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Consider Credex discounted credits',
        potentialSaving: Math.round(t.monthlySpend * 0.2),
        reason: 'At $' + t.monthlySpend + '/mo on OpenAI API, you qualify for bulk credits through Credex at up to 20% below retail pricing.',
        severity: 'high',
      });
    } else {
      results.push({
        toolId: 'openai-api',
        toolName: 'OpenAI API',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'No change needed',
        potentialSaving: 0,
        reason: 'Your OpenAI API spend is within a reasonable range.',
        severity: 'ok',
      });
    }
  }

  // --- ANTHROPIC API ---
  if (form.tools['anthropic-api']?.enabled) {
    const t = form.tools['anthropic-api'];
    totalMonthlySpend += t.monthlySpend;

    if (t.monthlySpend > 500) {
      results.push({
        toolId: 'anthropic-api',
        toolName: 'Anthropic API',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'Consider Credex discounted credits',
        potentialSaving: Math.round(t.monthlySpend * 0.2),
        reason: 'At $' + t.monthlySpend + '/mo on Anthropic API, you qualify for discounted credits through Credex — same API, lower cost.',
        severity: 'high',
      });
    } else {
      results.push({
        toolId: 'anthropic-api',
        toolName: 'Anthropic API',
        currentPlan: t.plan,
        currentSpend: t.monthlySpend,
        recommendedAction: 'No change needed',
        potentialSaving: 0,
        reason: 'Your Anthropic API spend is within a reasonable range.',
        severity: 'ok',
      });
    }
  }

  const totalMonthlySaving = results.reduce((sum, r) => sum + r.potentialSaving, 0);

  return {
    results,
    totalMonthlySpend,
    totalMonthlySaving,
    totalAnnualSaving: totalMonthlySaving * 12,
  };
}