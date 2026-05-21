'use client';

import { useEffect, useState } from 'react';
import { AuditSummary } from './auditEngine';

interface Props {
  summary: AuditSummary;
  useCase: string;
  onBack: () => void;
}

const severityColors = {
  high: 'border-red-500 bg-red-500/10',
  medium: 'border-yellow-500 bg-yellow-500/10',
  low: 'border-blue-500 bg-blue-500/10',
  ok: 'border-green-500 bg-green-500/10',
};

const severityBadge = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low: 'bg-blue-500/20 text-blue-400',
  ok: 'bg-green-500/20 text-green-400',
};

const severityLabel = {
  high: 'High Savings',
  medium: 'Medium Savings',
  low: 'Low Savings',
  ok: 'Optimized',
};

export default function AuditResults({ summary, useCase, onBack }: Props) {
  const hasHighSavings = summary.totalMonthlySaving > 500;
  const hasLowSavings = summary.totalMonthlySaving < 100;
  const [aiSummary, setAiSummary] = useState<string>('');
  const [summarySource, setSummarySource] = useState<'ai' | 'fallback' | 'loading'>('loading');

  // Lead capture state
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch('/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ summary, useCase }),
        });
        const data = await res.json();
        setAiSummary(data.summary);
        setSummarySource(data.source);
      } catch {
        setAiSummary('Could not load summary. Please try again.');
        setSummarySource('fallback');
      }
    }
    fetchSummary();
  }, [summary, useCase]);

  async function handleLeadSubmit() {
    if (!email || !email.includes('@')) return;
    setLeadLoading(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          companyName,
          role,
          website, // honeypot
          teamSize: summary.results.length,
          monthlySpend: summary.totalMonthlySpend,
          monthlySaving: summary.totalMonthlySaving,
          annualSaving: summary.totalAnnualSaving,
          useCase,
          toolsUsed: summary.results.map(r => r.toolName).join(', '),
        }),
      });
      setLeadSubmitted(true);
    } catch {
      setLeadSubmitted(true); // Still show success to user
    }
    setLeadLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Hero savings */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 mb-6 text-center">
        <p className="text-blue-200 text-sm mb-1">Total Potential Savings</p>
        <p className="text-6xl font-bold mb-2">
          ${summary.totalMonthlySaving.toLocaleString()}
          <span className="text-2xl font-normal text-blue-200">/mo</span>
        </p>
        <p className="text-blue-200">
          ${summary.totalAnnualSaving.toLocaleString()} saved per year
        </p>
        <div className="mt-4 pt-4 border-t border-blue-500/40">
          <p className="text-sm text-blue-200">
            Current spend: <span className="text-white font-semibold">${summary.totalMonthlySpend.toLocaleString()}/mo</span>
          </p>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gray-900 rounded-xl p-5 mb-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-gray-400">
            {summarySource === 'loading' ? '⏳ Generating your summary...' : summarySource === 'ai' ? '✨ AI-Powered Summary' : '📋 Your Audit Summary'}
          </span>
        </div>
        {summarySource === 'loading' ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
            <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
          </div>
        ) : (
          <p className="text-gray-300 text-sm leading-relaxed">{aiSummary}</p>
        )}
      </div>

      {/* Credex CTA */}
      {hasHighSavings && (
        <div className="bg-yellow-500/10 border border-yellow-500 rounded-xl p-5 mb-6">
          <p className="font-semibold text-yellow-400 mb-1">
            💰 You qualify for Credex savings
          </p>
          <p className="text-sm text-gray-300 mb-3">
            With ${summary.totalMonthlySaving.toLocaleString()}/mo in identified savings,
            Credex can help you get discounted AI credits — same tools, lower cost.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-lg transition-colors text-sm">
            Book a Free Credex Consultation →
          </button>
        </div>
      )}

      {/* Already optimized */}
      {hasLowSavings && (
        <div className="bg-green-500/10 border border-green-500 rounded-xl p-5 mb-6">
          <p className="font-semibold text-green-400 mb-1">
            ✅ You are spending well
          </p>
          <p className="text-sm text-gray-300 mb-3">
            Your AI stack looks optimized. We will notify you when new savings opportunities apply to your tools.
          </p>
        </div>
      )}

      {/* Lead capture — shown after results */}
      <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-700">
        {leadSubmitted ? (
          <div className="text-center py-4">
            <p className="text-green-400 font-semibold text-lg mb-1">✅ Report saved!</p>
            <p className="text-gray-400 text-sm">We will send your full audit report to {email}</p>
          </div>
        ) : (
          <>
            <h3 className="font-semibold mb-1">Get your full report by email</h3>
            <p className="text-gray-400 text-sm mb-4">Free. No spam. Unsubscribe anytime.</p>

            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company name (optional)"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Your role (optional)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-gray-800 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500"
                />
              </div>
              <button
                onClick={handleLeadSubmit}
                disabled={leadLoading || !email}
                className={`w-full font-semibold py-3 rounded-xl transition-colors ${
                  email
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {leadLoading ? 'Saving...' : 'Send me the report →'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Per tool breakdown */}
      <h2 className="text-lg font-semibold mb-4">Tool-by-Tool Breakdown</h2>
      <div className="space-y-4 mb-8">
        {summary.results.map((result) => (
          <div
            key={result.toolId}
            className={`rounded-xl p-5 border ${severityColors[result.severity]}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-semibold">{result.toolName}</span>
                <span className="text-gray-400 text-sm ml-2">{result.currentPlan}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${severityBadge[result.severity]}`}>
                {severityLabel[result.severity]}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3 text-sm">
              <span className="text-gray-400">
                Current: <span className="text-white">${result.currentSpend}/mo</span>
              </span>
              {result.potentialSaving > 0 && (
                <>
                  <span className="text-gray-600">→</span>
                  <span className="text-green-400 font-medium">
                    Save ${result.potentialSaving}/mo
                  </span>
                </>
              )}
            </div>

            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-sm font-medium text-white mb-1">
                {result.recommendedAction}
              </p>
              <p className="text-xs text-gray-400">{result.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        ← Edit My Tools
      </button>
    </div>
  );
}