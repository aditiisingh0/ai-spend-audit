'use client';

import { AuditSummary } from './auditEngine';

interface Props {
  summary: AuditSummary;
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

export default function AuditResults({ summary, onBack }: Props) {
  const hasHighSavings = summary.totalMonthlySaving > 500;
  const hasLowSavings = summary.totalMonthlySaving < 100;

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

      {/* Credex CTA — only for high savings */}
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

      {/* Already optimized message */}
      {hasLowSavings && (
        <div className="bg-green-500/10 border border-green-500 rounded-xl p-5 mb-6">
          <p className="font-semibold text-green-400 mb-1">
            ✅ You are spending well
          </p>
          <p className="text-sm text-gray-300 mb-3">
            Your AI stack looks optimized. We will notify you when new savings opportunities apply to your tools.
          </p>
          <button className="bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm">
            Notify Me of New Savings →
          </button>
        </div>
      )}

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