'use client';

import { useEffect, useState } from 'react';
import { AuditSummary } from './auditEngine';

interface Props {
  summary: AuditSummary;
  useCase: string;
  onBack: () => void;
}

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

  const severityStyle: Record<string, {border: string, bg: string, badge: string, badgeText: string}> = {
    high: {border: '#fca5a5', bg: '#fff5f5', badge: '#fee2e2', badgeText: '#dc2626'},
    medium: {border: '#fcd34d', bg: '#fffbeb', badge: '#fef3c7', badgeText: '#d97706'},
    low: {border: '#93c5fd', bg: '#eff6ff', badge: '#dbeafe', badgeText: '#2563eb'},
    ok: {border: '#86efac', bg: '#f0fdf4', badge: '#dcfce7', badgeText: '#16a34a'},
  };

  const severityLabel: Record<string, string> = {
    high: 'High Savings',
    medium: 'Medium Savings',
    low: 'Low Savings',
    ok: 'Optimized',
  };

  return (
    <div className="page-transition" style={{maxWidth: '600px', margin: '0 auto'}}>

      {/* Hero */}
      <div style={{background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '20px', padding: '32px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 20px 40px rgba(37,99,235,0.2)'}}>
        <p style={{color: '#bfdbfe', fontSize: '13px', marginBottom: '8px'}}>Total Potential Savings</p>
        <p style={{color: '#ffffff', fontSize: '64px', fontWeight: '800', lineHeight: '1', marginBottom: '4px'}}>
          ${summary.totalMonthlySaving.toLocaleString()}
          <span style={{fontSize: '24px', fontWeight: '400', color: '#bfdbfe'}}>/mo</span>
        </p>
        <p style={{color: '#bfdbfe', fontSize: '14px', marginBottom: '16px'}}>${summary.totalAnnualSaving.toLocaleString()} saved per year</p>
        <div style={{borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '16px'}}>
          <p style={{color: '#bfdbfe', fontSize: '13px'}}>Current spend: <span style={{color: '#ffffff', fontWeight: '600'}}>${summary.totalMonthlySpend.toLocaleString()}/mo</span></p>
        </div>
      </div>

      {/* AI Summary */}
      <div style={{background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
        <p style={{fontSize: '11px', fontWeight: '600', color: '#94a3b8', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
          {summarySource === 'loading' ? 'Generating summary...' : summarySource === 'ai' ? 'AI Summary' : 'Audit Summary'}
        </p>
        {summarySource === 'loading' ? (
          <div>
            <div style={{height: '14px', background: '#f1f5f9', borderRadius: '6px', marginBottom: '8px', width: '100%'}}></div>
            <div style={{height: '14px', background: '#f1f5f9', borderRadius: '6px', marginBottom: '8px', width: '85%'}}></div>
            <div style={{height: '14px', background: '#f1f5f9', borderRadius: '6px', width: '70%'}}></div>
          </div>
        ) : (
          <p style={{color: '#475569', fontSize: '14px', lineHeight: '1.6'}}>{aiSummary}</p>
        )}
      </div>

      {/* Credex CTA */}
      {hasHighSavings && (
        <div style={{background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '16px', padding: '20px', marginBottom: '16px'}}>
          <p style={{fontWeight: '600', color: '#92400e', marginBottom: '6px'}}>You qualify for Credex savings</p>
          <p style={{fontSize: '13px', color: '#a16207', marginBottom: '12px'}}>With ${summary.totalMonthlySaving.toLocaleString()}/mo in savings, Credex can get you discounted AI credits.</p>
          <button style={{background: '#f59e0b', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}>
            Book a Free Credex Consultation
          </button>
        </div>
      )}

      {/* Optimized */}
      {hasLowSavings && (
        <div style={{background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '16px', padding: '20px', marginBottom: '16px'}}>
          <p style={{fontWeight: '600', color: '#14532d', marginBottom: '6px'}}>You are spending well</p>
          <p style={{fontSize: '13px', color: '#166534'}}>Your AI stack looks optimized for your team size and use case.</p>
        </div>
      )}

      {/* Lead capture */}
      <div style={{background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}>
        {leadSubmitted ? (
          <div style={{textAlign: 'center', padding: '16px'}}>
            <p style={{color: '#16a34a', fontWeight: '600', fontSize: '16px', marginBottom: '4px'}}>Report saved!</p>
            <p style={{color: '#94a3b8', fontSize: '13px'}}>We will send your audit report to {email}</p>
          </div>
        ) : (
          <>
            <p style={{fontWeight: '600', color: '#0f172a', marginBottom: '4px'}}>Get your full report by email</p>
            <p style={{fontSize: '13px', color: '#94a3b8', marginBottom: '16px'}}>Free. No spam. Unsubscribe anytime.</p>
            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} style={{display: 'none'}} tabIndex={-1} autoComplete="off" />
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', fontSize: '14px', color: '#0f172a', outline: 'none', boxSizing: 'border-box'}} />
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                <input type="text" placeholder="Company (optional)" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#0f172a', outline: 'none'}} />
                <input type="text" placeholder="Role (optional)" value={role} onChange={(e) => setRole(e.target.value)} style={{border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: '#0f172a', outline: 'none'}} />
              </div>
              <button
                onClick={handleLeadSubmit}
                disabled={leadLoading || !email}
                style={{background: email ? '#2563eb' : '#e2e8f0', color: email ? '#ffffff' : '#94a3b8', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: email ? 'pointer' : 'not-allowed'}}
              >
                {leadLoading ? 'Saving...' : 'Send me the report'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Tool breakdown */}
      <p style={{fontWeight: '600', color: '#0f172a', fontSize: '16px', marginBottom: '12px'}}>Tool-by-Tool Breakdown</p>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px'}}>
        {summary.results.map((result) => {
          const s = severityStyle[result.severity];
          return (
            <div key={result.toolId} style={{background: s.bg, borderRadius: '14px', border: `1.5px solid ${s.border}`, padding: '16px 20px'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px'}}>
                <div>
                  <span style={{fontWeight: '600', color: '#0f172a', fontSize: '15px'}}>{result.toolName}</span>
                  <span style={{color: '#94a3b8', fontSize: '13px', marginLeft: '8px'}}>{result.currentPlan}</span>
                </div>
                <span style={{background: s.badge, color: s.badgeText, padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '600'}}>
                  {severityLabel[result.severity]}
                </span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', fontSize: '13px'}}>
                <span style={{color: '#64748b'}}>Current: <span style={{color: '#0f172a', fontWeight: '500'}}>${result.currentSpend}/mo</span></span>
                {result.potentialSaving > 0 && (
                  <>
                    <span style={{color: '#cbd5e1'}}>→</span>
                    <span style={{color: '#16a34a', fontWeight: '600'}}>Save ${result.potentialSaving}/mo</span>
                  </>
                )}
              </div>
              <div style={{background: 'rgba(255,255,255,0.7)', borderRadius: '10px', padding: '12px'}}>
                <p style={{fontWeight: '600', color: '#0f172a', fontSize: '13px', marginBottom: '4px'}}>{result.recommendedAction}</p>
                <p style={{color: '#64748b', fontSize: '12px'}}>{result.reason}</p>
              </div>
            </div>
          );
        })}
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
        style={{width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', marginBottom: '10px'}}
      >
        🔗 Copy Shareable Link
      </button>

      {/* Back button */}
      <button
        onClick={onBack}
        style={{width: '100%', background: '#ffffff', border: '1px solid #e2e8f0', color: '#64748b', padding: '12px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
      >
        ← Edit My Tools
      </button>
    </div>
  );
}