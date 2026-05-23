'use client';

import { useState, useEffect } from 'react';
import { runAudit } from './auditEngine';
import AuditResults from './AuditResults';

const TOOLS = [
  { id: 'cursor', name: 'Cursor', icon: '⚡', plans: ['Hobby', 'Pro', 'Business', 'Enterprise'] },
  { id: 'github-copilot', name: 'GitHub Copilot', icon: '🤖', plans: ['Individual', 'Business', 'Enterprise'] },
  { id: 'claude', name: 'Claude', icon: '🧠', plans: ['Free', 'Pro', 'Max', 'Team', 'Enterprise', 'API'] },
  { id: 'chatgpt', name: 'ChatGPT', icon: '💬', plans: ['Free', 'Plus', 'Team', 'Enterprise', 'API'] },
  { id: 'gemini', name: 'Gemini', icon: '✨', plans: ['Free', 'Pro', 'Ultra', 'API'] },
  { id: 'windsurf', name: 'Windsurf', icon: '🏄', plans: ['Free', 'Pro', 'Team'] },
  { id: 'openai-api', name: 'OpenAI API', icon: '🔌', plans: ['Pay as you go'] },
  { id: 'anthropic-api', name: 'Anthropic API', icon: '🔮', plans: ['Pay as you go'] },
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
    TOOLS.map((t) => [t.id, { enabled: false, plan: t.plans[0], seats: 1, monthlySpend: 0 }])
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
      tools: { ...prev.tools, [id]: { ...prev.tools[id], enabled: !prev.tools[id].enabled } },
    }));
  }

  function updateTool(id: string, field: keyof ToolEntry, value: string | number | boolean) {
    setForm((prev) => ({
      ...prev,
      tools: { ...prev.tools, [id]: { ...prev.tools[id], [field]: value } },
    }));
  }

  const totalMonthly = Object.values(form.tools)
    .filter((t) => t.enabled)
    .reduce((sum, t) => sum + Number(t.monthlySpend), 0);

  const enabledCount = Object.values(form.tools).filter((t) => t.enabled).length;

  if (showResults) {
    const summary = runAudit(form);
    return <AuditResults summary={summary} useCase={form.useCase} onBack={() => setShowResults(false)} />;
  }

  return (
    <div style={{maxWidth: '600px', margin: '0 auto'}}>

      {/* Team Info */}
      <div style={{background: '#f8fafc', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', border: '1px solid #e2e8f0'}}>
        <p style={{fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Your Team</p>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
          <div>
            <label style={{fontSize: '13px', color: '#64748b', display: 'block', marginBottom: '6px'}}>Team Size</label>
            <input
              type="number"
              min={1}
              value={form.teamSize}
              onChange={(e) => setForm((p) => ({ ...p, teamSize: Number(e.target.value) }))}
              style={{width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#0f172a', background: '#ffffff', outline: 'none'}}
            />
          </div>
          <div>
            <label style={{fontSize: '13px', color: '#64748b', display: 'block', marginBottom: '6px'}}>Primary Use Case</label>
            <select
              value={form.useCase}
              onChange={(e) => setForm((p) => ({ ...p, useCase: e.target.value }))}
              style={{width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#0f172a', background: '#ffffff', outline: 'none'}}
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
      <p style={{fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>AI Tools You Pay For</p>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px'}}>
        {TOOLS.map((tool) => {
          const entry = form.tools[tool.id];
          return (
            <div
              key={tool.id}
              style={{
                background: entry.enabled ? '#f0f7ff' : '#ffffff',
                borderRadius: '14px',
                border: entry.enabled ? '1.5px solid #93c5fd' : '1.5px solid #e2e8f0',
                overflow: 'hidden',
                transition: 'all 0.2s',
              }}
            >
              <div
                style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', cursor: 'pointer'}}
                onClick={() => toggleTool(tool.id)}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <span style={{fontSize: '22px'}}>{tool.icon}</span>
                  <span style={{fontWeight: '500', fontSize: '15px', color: '#0f172a'}}>{tool.name}</span>
                </div>
                <div style={{
                  background: entry.enabled ? '#2563eb' : '#f1f5f9',
                  color: entry.enabled ? '#ffffff' : '#64748b',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: '500',
                }}>
                  {entry.enabled ? '✓ Added' : '+ Add'}
                </div>
              </div>

              {entry.enabled && (
                <div style={{padding: '0 20px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', borderTop: '1px solid #bfdbfe'}}>
                  <div style={{paddingTop: '12px'}}>
                    <label style={{fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '6px'}}>Plan</label>
                    <select
                      value={entry.plan}
                      onChange={(e) => updateTool(tool.id, 'plan', e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      style={{width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#0f172a', background: '#ffffff', outline: 'none'}}
                    >
                      {tool.plans.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div style={{paddingTop: '12px'}}>
                    <label style={{fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '6px'}}>Seats</label>
                    <input
                      type="number"
                      min={1}
                      value={entry.seats}
                      onChange={(e) => updateTool(tool.id, 'seats', Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      style={{width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#0f172a', background: '#ffffff', outline: 'none'}}
                    />
                  </div>
                  <div style={{paddingTop: '12px'}}>
                    <label style={{fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '6px'}}>Monthly ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={entry.monthlySpend}
                      onChange={(e) => updateTool(tool.id, 'monthlySpend', Number(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      style={{width: '100%', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 10px', fontSize: '13px', color: '#0f172a', background: '#ffffff', outline: 'none'}}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Total + CTA */}
      <div style={{background: '#f8fafc', borderRadius: '16px', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e2e8f0'}}>
        <div>
          <p style={{fontSize: '13px', color: '#64748b', marginBottom: '4px'}}>Total Monthly Spend</p>
          <p style={{fontSize: '36px', fontWeight: '700', color: '#0f172a', lineHeight: '1'}}>${totalMonthly.toLocaleString()}</p>
        </div>
        <button
          onClick={() => enabledCount > 0 && setShowResults(true)}
          disabled={enabledCount === 0}
          style={{
            background: enabledCount > 0 ? '#2563eb' : '#e2e8f0',
            color: enabledCount > 0 ? '#ffffff' : '#94a3b8',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: enabledCount > 0 ? 'pointer' : 'not-allowed',
          }}
        >
          Run Audit →
        </button>
      </div>
    </div>
  );
}