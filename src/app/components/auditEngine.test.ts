import { runAudit } from './auditEngine';

// Test 1: Cursor Business with 2 seats should recommend downgrade
test('Cursor Business with 2 seats recommends downgrade to Pro', () => {
  const result = runAudit({
    teamSize: 2,
    useCase: 'coding',
    tools: {
      'cursor': { enabled: true, plan: 'Business', seats: 2, monthlySpend: 80 },
      'github-copilot': { enabled: false, plan: 'Individual', seats: 1, monthlySpend: 0 },
      'claude': { enabled: false, plan: 'Pro', seats: 1, monthlySpend: 0 },
      'chatgpt': { enabled: false, plan: 'Plus', seats: 1, monthlySpend: 0 },
      'gemini': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'windsurf': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'openai-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
      'anthropic-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
    },
  });
  const cursorResult = result.results.find(r => r.toolId === 'cursor');
  expect(cursorResult?.severity).toBe('high');
  expect(cursorResult?.potentialSaving).toBeGreaterThan(0);
});

// Test 2: Cursor + Windsurf together should flag redundancy
test('Windsurf flagged as redundant when Cursor is also enabled', () => {
  const result = runAudit({
    teamSize: 2,
    useCase: 'coding',
    tools: {
      'cursor': { enabled: true, plan: 'Pro', seats: 2, monthlySpend: 40 },
      'github-copilot': { enabled: false, plan: 'Individual', seats: 1, monthlySpend: 0 },
      'claude': { enabled: false, plan: 'Pro', seats: 1, monthlySpend: 0 },
      'chatgpt': { enabled: false, plan: 'Plus', seats: 1, monthlySpend: 0 },
      'gemini': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'windsurf': { enabled: true, plan: 'Pro', seats: 2, monthlySpend: 30 },
      'openai-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
      'anthropic-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
    },
  });
  const windsurfResult = result.results.find(r => r.toolId === 'windsurf');
  expect(windsurfResult?.severity).toBe('high');
  expect(windsurfResult?.potentialSaving).toBe(30);
});

// Test 3: GitHub Copilot Enterprise with 3 seats should downgrade to Business
test('Copilot Enterprise with small team recommends Business plan', () => {
  const result = runAudit({
    teamSize: 3,
    useCase: 'coding',
    tools: {
      'cursor': { enabled: false, plan: 'Hobby', seats: 1, monthlySpend: 0 },
      'github-copilot': { enabled: true, plan: 'Enterprise', seats: 3, monthlySpend: 117 },
      'claude': { enabled: false, plan: 'Pro', seats: 1, monthlySpend: 0 },
      'chatgpt': { enabled: false, plan: 'Plus', seats: 1, monthlySpend: 0 },
      'gemini': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'windsurf': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'openai-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
      'anthropic-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
    },
  });
  const copilotResult = result.results.find(r => r.toolId === 'github-copilot');
  expect(copilotResult?.severity).toBe('high');
  expect(copilotResult?.potentialSaving).toBe(60);
});

// Test 4: Claude Team with 1 seat should recommend Pro
test('Claude Team with 1 seat recommends switching to Pro', () => {
  const result = runAudit({
    teamSize: 1,
    useCase: 'writing',
    tools: {
      'cursor': { enabled: false, plan: 'Hobby', seats: 1, monthlySpend: 0 },
      'github-copilot': { enabled: false, plan: 'Individual', seats: 1, monthlySpend: 0 },
      'claude': { enabled: true, plan: 'Team', seats: 1, monthlySpend: 30 },
      'chatgpt': { enabled: false, plan: 'Plus', seats: 1, monthlySpend: 0 },
      'gemini': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'windsurf': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'openai-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
      'anthropic-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
    },
  });
  const claudeResult = result.results.find(r => r.toolId === 'claude');
  expect(claudeResult?.severity).toBe('high');
  expect(claudeResult?.potentialSaving).toBe(10);
});

// Test 5: Annual savings should be 12x monthly savings
test('Annual saving is exactly 12x monthly saving', () => {
  const result = runAudit({
    teamSize: 2,
    useCase: 'coding',
    tools: {
      'cursor': { enabled: true, plan: 'Business', seats: 2, monthlySpend: 80 },
      'github-copilot': { enabled: false, plan: 'Individual', seats: 1, monthlySpend: 0 },
      'claude': { enabled: false, plan: 'Pro', seats: 1, monthlySpend: 0 },
      'chatgpt': { enabled: false, plan: 'Plus', seats: 1, monthlySpend: 0 },
      'gemini': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'windsurf': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'openai-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
      'anthropic-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
    },
  });
  expect(result.totalAnnualSaving).toBe(result.totalMonthlySaving * 12);
});

// Test 6: OpenAI API over $500 should recommend Credex
test('OpenAI API spend over $500 recommends Credex credits', () => {
  const result = runAudit({
    teamSize: 5,
    useCase: 'mixed',
    tools: {
      'cursor': { enabled: false, plan: 'Hobby', seats: 1, monthlySpend: 0 },
      'github-copilot': { enabled: false, plan: 'Individual', seats: 1, monthlySpend: 0 },
      'claude': { enabled: false, plan: 'Pro', seats: 1, monthlySpend: 0 },
      'chatgpt': { enabled: false, plan: 'Plus', seats: 1, monthlySpend: 0 },
      'gemini': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'windsurf': { enabled: false, plan: 'Free', seats: 1, monthlySpend: 0 },
      'openai-api': { enabled: true, plan: 'Pay as you go', seats: 1, monthlySpend: 800 },
      'anthropic-api': { enabled: false, plan: 'Pay as you go', seats: 1, monthlySpend: 0 },
    },
  });
  const openaiResult = result.results.find(r => r.toolId === 'openai-api');
  expect(openaiResult?.severity).toBe('high');
  expect(openaiResult?.potentialSaving).toBeGreaterThan(0);
});