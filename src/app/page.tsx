import SpendForm from './components/SpendForm';

export default function Home() {
  return (
    <main style={{minHeight: '100vh', background: '#ffffff', color: '#0f172a'}}>

      <nav style={{borderBottom: '1px solid #e5e7eb', padding: '16px 24px'}}>
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

      <div style={{maxWidth: '800px', margin: '0 auto', padding: '48px 24px 80px', textAlign: 'center'}}>
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

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', marginBottom: '64px'}}>
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

      <div style={{background: '#f8fafc', borderTop: '1px solid #e5e7eb', padding: '64px 24px'}}>
        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <SpendForm />
        </div>
      </div>

      <div style={{borderTop: '1px solid #e5e7eb', padding: '32px', textAlign: 'center', color: '#9ca3af', fontSize: '14px'}}>
        Built by Credex — discounted AI credits for startups
      </div>
    </main>
  );
}