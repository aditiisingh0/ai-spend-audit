'use client';

import { useState, useEffect } from 'react';
import { runAudit } from './auditEngine';
import AuditResults from './AuditResults';

const TOOLS = [
  {
    id: 'cursor',
    name: 'Cursor',
    icon: '⚡',
    plans: ['Hobby', 'Pro', 'Business', 'Enterprise'],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    icon: '🤖',
    plans: ['Individual', 'Business', 'Enterprise'],
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: '🧠',
    plans: ['Free', 'Pro', 'Max', 'Team', 'Enterprise', 'API'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '💬',
    plans: ['Free', 'Plus', 'Team', 'Enterprise', 'API'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '✨',
    plans: ['Free', 'Pro', 'Ultra', 'API'],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    icon: '🏄',
    plans: ['Free', 'Pro', 'Team'],
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    icon: '🔌',
    plans: ['Pay as you go'],
  },
  {
    id: 'anthropic-api',
    name: 'Anthropic API',
    icon: '🔮',
    plans: ['Pay as you go'],
  },
];

interface ToolEntry {
  enabled: boolean;
  plan: string;
  seats: number;
  monthlySpend: number;
}

interface FormData {
  tools: Record<string, ToolEntry>;
  teamSize: number;
  useCase: string;
}

const DEFAULT_FORM: FormData = {
  tools: Object.fromEntries(
    TOOLS.map((t) => [
      t.id,
      { enabled: false, plan: t.plans[0], seats: 1, monthlySpend: 0 },
    ])
  ),
  teamSize: 1,
  useCase: 'coding',
};

export default function SpendForm() {
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ai-audit-form');
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ai-audit-form', JSON.stringify(form));
  }, [form]);

  function toggleTool(id: string) {
    setForm((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        [id]: { ...prev.tools[id], enabled: !prev.tools[id].enabled },
      },
    }));
  }

  function updateTool(id: string, field: keyof ToolEntry, value: string | number | boolean) {
    setForm((prev) => ({
      ...prev,
      tools: {
        ...prev.tools,
        [id]: { ...prev.tools[id], [field]: value },
      },
    }));
  }

  const totalMonthly = Object.values(form.tools)
    .filter((t) => t.enabled)
    .reduce((sum, t) => sum + Number(t.monthlySpend), 0);

  const enabledCount = Object.values(form.tools).filter((t) => t.enabled).length;

  if (showResults) {
    const summary = runAudit(form);
    return (
      <AuditResults
        summary={summary}
        useCase={form.useCase}
        onBack={() => setShowResults(false)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Team Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Your Team</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1.5 block">Team Size</label>
            <input
              type="number"
              min={1}
              value={form.teamSize}
              onChange={(e) => setForm((p) => ({ ...p, teamSize: Number(e.target.value) }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1.5 block">Primary Use Case</label>
            <select
              value={form.useCase}
              onChange={(e) => setForm((p) => ({ ...p, useCase: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="coding">Coding</option>
              <option value="writing">Writing</option>
              <option value="data">Data Analysis</option>
              <option value="research">Research</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          AI Tools You Pay For
        </h2>
        <div className="space-y-3">
          {TOOLS.map((tool) => {
            const entry = form.tools[tool.id];
            return (
              <div
                key={tool.id}
                className={`bg-white rounded-2xl border transition-all shadow-sm ${
                  entry.enabled
                    ? 'border-blue-300 ring-2 ring-blue-100'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="font-medium text-gray-900">{tool.name}</span>
                  </div>
                  <button
                    onClick={() => toggleTool(tool.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      entry.enabled
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {entry.enabled ? '✓ Added' : '+ Add'}
                  </button>
                </div>

                {entry.enabled && (
                  <div className="px-4 pb-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Plan</label>
                      <select
                        value={entry.plan}
                        onChange={(e) => updateTool(tool.id, 'plan', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {tool.plans.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Seats</label>
                      <input
                        type="number"
                        min={1}
                        value={entry.seats}
                        onChange={(e) => updateTool(tool.id, 'seats', Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Monthly ($)</label>
                      <input
                        type="number"
                        min={0}
                        value={entry.monthlySpend}
                        onChange={(e) => updateTool(tool.id, 'monthlySpend', Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Total + CTA */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm text-gray-400">Total Monthly Spend</p>
          <p className="text-4xl font-bold text-gray-900">${totalMonthly.toLocaleString()}</p>
        </div>
        <button
          onClick={() => enabledCount > 0 && setShowResults(true)}
          disabled={enabledCount === 0}
          className={`font-semibold px-8 py-4 rounded-2xl transition-all text-base ${
            enabledCount > 0
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Run Audit →
        </button>
      </div>
    </div>
  );
}