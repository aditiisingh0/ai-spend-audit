'use client';

import { useState, useEffect } from 'react';
import { runAudit } from './auditEngine';
import AuditResults from './AuditResults';

const TOOLS = [
  {
    id: 'cursor',
    name: 'Cursor',
    plans: ['Hobby', 'Pro', 'Business', 'Enterprise'],
    prices: { Hobby: 0, Pro: 20, Business: 40, Enterprise: 60 },
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    plans: ['Individual', 'Business', 'Enterprise'],
    prices: { Individual: 10, Business: 19, Enterprise: 39 },
  },
  {
    id: 'claude',
    name: 'Claude',
    plans: ['Free', 'Pro', 'Max', 'Team', 'Enterprise', 'API'],
    prices: { Free: 0, Pro: 20, Max: 100, Team: 30, Enterprise: 0, API: 0 },
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    plans: ['Free', 'Plus', 'Team', 'Enterprise', 'API'],
    prices: { Free: 0, Plus: 20, Team: 30, Enterprise: 0, API: 0 },
  },
  {
    id: 'gemini',
    name: 'Gemini',
    plans: ['Free', 'Pro', 'Ultra', 'API'],
    prices: { Free: 0, Pro: 20, Ultra: 30, API: 0 },
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    plans: ['Free', 'Pro', 'Team'],
    prices: { Free: 0, Pro: 15, Team: 35 },
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    plans: ['Pay as you go'],
    prices: { 'Pay as you go': 0 },
  },
  {
    id: 'anthropic-api',
    name: 'Anthropic API',
    plans: ['Pay as you go'],
    prices: { 'Pay as you go': 0 },
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
        onBack={() => setShowResults(false)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Team Info */}
      <div className="bg-gray-900 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Your Team</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Team Size</label>
            <input
              type="number"
              min={1}
              value={form.teamSize}
              onChange={(e) => setForm((p) => ({ ...p, teamSize: Number(e.target.value) }))}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Primary Use Case</label>
            <select
              value={form.useCase}
              onChange={(e) => setForm((p) => ({ ...p, useCase: e.target.value }))}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
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
      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold">AI Tools You Pay For</h2>
        {TOOLS.map((tool) => {
          const entry = form.tools[tool.id];
          return (
            <div
              key={tool.id}
              className={`bg-gray-900 rounded-xl p-4 border transition-all ${
                entry.enabled ? 'border-blue-500' : 'border-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">{tool.name}</span>
                <button
                  onClick={() => toggleTool(tool.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    entry.enabled
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {entry.enabled ? 'Added' : '+ Add'}
                </button>
              </div>

              {entry.enabled && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Plan</label>
                    <select
                      value={entry.plan}
                      onChange={(e) => updateTool(tool.id, 'plan', e.target.value)}
                      className="w-full bg-gray-800 rounded-lg px-2 py-1.5 text-sm text-white"
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
                      className="w-full bg-gray-800 rounded-lg px-2 py-1.5 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Monthly Spend ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={entry.monthlySpend}
                      onChange={(e) => updateTool(tool.id, 'monthlySpend', Number(e.target.value))}
                      className="w-full bg-gray-800 rounded-lg px-2 py-1.5 text-sm text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Total + CTA */}
      <div className="bg-gray-900 rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Total Monthly Spend</p>
          <p className="text-3xl font-bold">${totalMonthly.toLocaleString()}</p>
        </div>
        <button
          onClick={() => enabledCount > 0 && setShowResults(true)}
          disabled={enabledCount === 0}
          className={`font-semibold px-6 py-3 rounded-xl transition-colors ${
            enabledCount > 0
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Run Audit →
        </button>
      </div>
    </div>
  );
}