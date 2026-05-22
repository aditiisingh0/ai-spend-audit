import { Metadata } from 'next';

interface AuditData {
  id: string;
  use_case: string;
  total_monthly_spend: number;
  total_monthly_saving: number;
  total_annual_saving: number;
  results: Array<{
    toolId: string;
    toolName: string;
    currentPlan: string;
    currentSpend: number;
    recommendedAction: string;
    potentialSaving: number;
    reason: string;
    severity: string;
  }>;
}

async function getAudit(id: string): Promise<AuditData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/audit?id=${id}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) {
    return { title: 'Audit not found — AI Spend Audit' };
  }

  return {
    title: `Save $${audit.total_monthly_saving}/mo on AI tools — AI Spend Audit`,
    description: `This team is spending $${audit.total_monthly_spend}/mo on AI tools and could save $${audit.total_monthly_saving}/mo. See the full breakdown.`,
    openGraph: {
      title: `Save $${audit.total_monthly_saving}/mo on AI tools`,
      description: `Spending $${audit.total_monthly_spend}/mo → save $${audit.total_monthly_saving}/mo ($${audit.total_annual_saving}/year). Free audit by AI Spend Audit.`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Save $${audit.total_monthly_saving}/mo on AI tools`,
      description: `Spending $${audit.total_monthly_spend}/mo → could save $${audit.total_monthly_saving}/mo. Free audit.`,
    },
  };
}

const severityColors: Record<string, string> = {
  high: 'border-red-500 bg-red-500/10',
  medium: 'border-yellow-500 bg-yellow-500/10',
  low: 'border-blue-500 bg-blue-500/10',
  ok: 'border-green-500 bg-green-500/10',
};

const severityBadge: Record<string, string> = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low: 'bg-blue-500/20 text-blue-400',
  ok: 'bg-green-500/20 text-green-400',
};

const severityLabel: Record<string, string> = {
  high: 'High Savings',
  medium: 'Medium Savings',
  low: 'Low Savings',
  ok: 'Optimized',
};

export default async function AuditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Audit not found</h1>
          <p className="text-gray-400 mb-6">This audit link may have expired or is invalid.</p>
          <a href="/" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Run Your Own Audit →
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm mb-2">AI Spend Audit — Shared Report</p>
          <h1 className="text-3xl font-bold">This team could save</h1>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 mb-6 text-center">
          <p className="text-6xl font-bold mb-2">
            ${audit.total_monthly_saving.toLocaleString()}
            <span className="text-2xl font-normal text-blue-200">/mo</span>
          </p>
          <p className="text-blue-200">${audit.total_annual_saving.toLocaleString()} saved per year</p>
          <div className="mt-4 pt-4 border-t border-blue-500/40">
            <p className="text-sm text-blue-200">
              Current spend: <span className="text-white font-semibold">${audit.total_monthly_spend.toLocaleString()}/mo</span>
            </p>
          </div>
        </div>

        {/* Tool breakdown */}
        <h2 className="text-lg font-semibold mb-4">Tool-by-Tool Breakdown</h2>
        <div className="space-y-4 mb-8">
          {audit.results.map((result) => (
            <div key={result.toolId} className={`rounded-xl p-5 border ${severityColors[result.severity]}`}>
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
                <span className="text-gray-400">Current: <span className="text-white">${result.currentSpend}/mo</span></span>
                {result.potentialSaving > 0 && (
                  <>
                    <span className="text-gray-600">→</span>
                    <span className="text-green-400 font-medium">Save ${result.potentialSaving}/mo</span>
                  </>
                )}
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <p className="text-sm font-medium text-white mb-1">{result.recommendedAction}</p>
                <p className="text-xs text-gray-400">{result.reason}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-xl p-6 text-center border border-gray-700">
          <p className="font-semibold mb-2">How much could YOUR team save?</p>
          <p className="text-gray-400 text-sm mb-4">Free audit. No login required. Takes 2 minutes.</p>
          <a href="/" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors inline-block">
            Run Your Free Audit →
          </a>
        </div>
      </div>
    </main>
  );
}