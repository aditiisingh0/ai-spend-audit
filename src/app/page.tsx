import SpendForm from './components/SpendForm';

export default function Home() {
  return (
    <main style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f5f3ff 100%)', color: '#0f172a', position: 'relative', overflow: 'hidden'}}>

      {/* Blur circles + Wave effect */}
      <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>

        {/* Blur circles */}
        <div className="float1" style={{position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, #bfdbfe 0%, transparent 70%)', borderRadius: '50%', opacity: 0.6}}></div>
        <div className="float2" style={{position: 'absolute', top: '200px', right: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, #ddd6fe 0%, transparent 70%)', borderRadius: '50%', opacity: 0.5}}></div>
        <div className="float3" style={{position: 'absolute', bottom: '100px', left: '50px', width: '350px', height: '350px', background: 'radial-gradient(circle, #bfdbfe 0%, transparent 70%)', borderRadius: '50%', opacity: 0.4}}></div>

        {/* Wave */}
        <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%'}}>
          <svg viewBox="0 0 1440 320" style={{display: 'block', opacity: 0.07}}>
            <path fill="#2563eb" d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320L1344,320L1248,320L1152,320L1056,320L960,320L864,320L768,320L672,320L576,320L480,320L384,320L288,320L192,320L96,320L48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{position: 'relative', zIndex: 1}}>

        <nav style={{padding: '16px 24px'}}>
          <div style={{maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <div style={{width: '32px', height: '32px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{color: 'white', fontWeight: 'bold', fontSize: '12px'}}>AI</span>
              </div>
              <span style={{fontWeight: '600', color: '#0f172a'}}>SpendAudit</span>
            </div>
            <span style={{fontSize: '14px', color: '#6b7280'}}>By Credex</span>
          </div>
        </nav>

        <div style={{maxWidth: '800px', margin: '0 auto', padding: '60px 12px 2px', textAlign: 'center'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', fontSize: '14px', padding: '6px 16px', borderRadius: '999px', marginBottom: '32px'}}>
            <span style={{width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', display: 'inline-block'}}></span>
            Free • No login required • Instant results
          </div>

          <h1 style={{fontSize: '56px', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', color: '#0f172a'}}>
            Are you overpaying<br />
            <span style={{color: '#2563eb'}}>for AI tools?</span>
          </h1>

          <p style={{fontSize: '20px', color: '#6b7280', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px'}}>
            Most startups waste $200-$800/month on redundant AI subscriptions.
            Find out in 2 minutes — free.
          </p>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', marginBottom: '48px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', padding: '20px 40px', borderRadius: '16px', border: '1px solid #e2e8f0'}}>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '28px', fontWeight: '700', color: '#0f172a'}}>$1,440</p>
              <p style={{fontSize: '13px', color: '#9ca3af', marginTop: '4px'}}>avg annual savings</p>
            </div>
            <div style={{width: '1px', height: '40px', background: '#e5e7eb'}}></div>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '28px', fontWeight: '700', color: '#0f172a'}}>8</p>
              <p style={{fontSize: '13px', color: '#9ca3af', marginTop: '4px'}}>tools analyzed</p>
            </div>
            <div style={{width: '1px', height: '40px', background: '#e5e7eb'}}></div>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '28px', fontWeight: '700', color: '#0f172a'}}>2 min</p>
              <p style={{fontSize: '13px', color: '#9ca3af', marginTop: '4px'}}>to complete</p>
            </div>
          </div>
        </div>

        <div style={{padding: '0 24px 64px'}}>
          <div style={{maxWidth: '600px', margin: '0 auto'}}>
            <SpendForm />
          </div>
        </div>

        <div style={{padding: '32px', textAlign: 'center', color: '#9ca3af', fontSize: '14px'}}>
          Built by Credex — discounted AI credits for startups
        </div>

      </div>
    </main>
  );
}