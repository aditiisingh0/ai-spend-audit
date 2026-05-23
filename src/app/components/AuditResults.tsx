'use client';

import { useEffect, useState } from 'react';
import { AuditSummary } from './auditEngine';

interface Props {
  summary: AuditSummary;
  useCase: string;
  onBack: () => void;
}

const severityColors = {
  high: 'border-red-200 bg-red-50',
  medium: 'border-yellow-200 bg-yellow-50',
  low: 'border-blue-200 bg-blue-50',
  ok: 'border-green-200 bg-green-50',
};

const severityBadge = {
  high: 'bg-red-100 text-red-600',
  medium: 'bg-yellow-100 text-yellow-600',
  low: 'bg-blue-100 text-blue-600',
  ok: 'bg-green-100 text-green-600',
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
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [website, setWebsite] = useState('');
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
          email, companyName, role, website,
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
      setLeadSubmitted(true);
    }
    setLeadLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Hero savings */}
      <div className="bg-blue-600 rounded-2xl p-8 mb-6 text-center shadow-lg shadow-blue-100">
        <p className="text-blue-100 text-sm mb-1">Total Potential Savings</p>
        <p className="text-6xl font-bold text-white mb-2">
          ${summary.totalMonthlySaving.toLocaleString()}
          <span className="text-2xl font-normal text-blue-200">/mo</span>
        </p>
        <p className="text-blue-100">
          ${summary.totalAnnualSaving.toLocaleString()} saved per year
        </p>
        <div className="mt-4 pt-4 border-t border-blue-500">
          <p className="text-sm text-blue-100">
            Current spend: <span className="text-white font-semibold">${summary.totalMonthlySpend.toLocaleString()}/mo</span>
          </p>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6 shadow-sm">
        <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">
          {summarySource === 'loading' ? 'Generating summary...' : summarySource === 'ai' ? 'AI Summary' : 'Audit Summary'}
        </p>
        {summarySource === 'loading' ? (
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            <div className="h-4 bg-gray-100 rounded w-4/6"></div>
          </div>
        ) : (
          <p className="text-gray-600 text-sm leading-relaxed">{aiSummary}</p>
        )}
      </div>

      {/* Credex CTA */}
      {hasHighSavings && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <p className="font-semibold text-amber-800 mb-1">
            You qualify for Credex savings
          </p>
          <p className="text-sm text-amber-700 mb-3">
            With ${summary.totalMonthlySaving.toLocaleString()}/mo in savings identified,
            Credex can get you discounted AI credits — same tools, lower cost.
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-5 py-2 rounded-xl transition-colors text-sm">
            Book a Free Credex Consultation
          </button>
        </div>
      )}

      {/* Already optimized */}
      {hasLowSavings && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
          <p className="font-semibold text-green-800 mb-1">
            You are spending well
          </p>
          <p className="text-sm text-green-700">
            Your AI stack looks optimized for your team size and use case.
          </p>
        </div>
      )}

      {/* Lead capture */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
        {leadSubmitted ? (
          <div className="text-center py-4">
            <p className="text-green-600 font-semibold text-lg mb-1">Report saved!</p>
            <p className="text-gray-400 text-sm">We will send your audit report to {email}</p>
          </div>
        ) : (
          <>
            <h3 className="font-semibold text-gray-900 mb-1">Get your full report by email</h3>
            <p className="text-gray-400 text-sm mb-4">Free. No spam. Unsubscribe anytime.</p>
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
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Role (optional)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleLeadSubmit}
                disabled={leadLoading || !email}
                className={`w-full font-semibold py-3 rounded-xl transition-all ${
                  email
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-100'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {leadLoading ? 'Saving...' : 'Send me the report'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Tool breakdown */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Tool-by-Tool Breakdown</h2>
      <div className="space-y-3 mb-8">
        {summary.results.map((result) => (
          <div
            key={result.toolId}
            className={`rounded-2xl p-5 border ${severityColors[result.severity]}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-semibold text-gray-900">{result.toolName}</span>
                <span className="text-gray-400 text-sm ml-2">{result.currentPlan}</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${severityBadge[result.severity]}`}>
                {severityLabel[result.severity]}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3 text-sm">
              <span className="text-gray-500">
                Current: <span className="text-gray-900 font-medium">${result.currentSpend}/mo</span>
              </span>
              {result.potentialSaving > 0 && (
                <>
                  <span className="text-gray-300">→</span>
                  <span className="text-green-600 font-medium">
                    Save ${result.potentialSaving}/mo
                  </span>
                </>
              )}
            </div>
            <div className="bg-white/60 rounded-xl p-3">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {result.recommendedAction}
              </p>
              <p className="text-xs text-gray-500">{result.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Share button */}
      <button
        onClick={async () => {
          const res = await fetch('/api/audit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ summary, useCase, toolsData: summary.results }),
          });
          const data = await res.json();
          if (data.id) {
            const url = `${window.location.origin}/audit/${data.id}`;
            await navigator.clipboard.writeText(url);
            alert('Share link copied!');
          }
        }}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-2xl transition-colors mb-3"
      >
        Copy Shareable Link
      </button>

      {/* Back button */}
      <button
        onClick={onBack}
        className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold py-3 rounded-2xl transition-colors"
      >
        Edit My Tools
      </button>
    </div>
  );
}