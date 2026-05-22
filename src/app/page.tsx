import SpendForm from './components/SpendForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold text-gray-900">SpendAudit</span>
          </div>
          <span className="text-sm text-gray-500">By Credex</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Free • No login required • Instant results
        </div>

        <h1 className="text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
          Are you overpaying
          <br />
          <span className="text-blue-600">for AI tools?</span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Most startups waste $200-$800/month on redundant or wrong-sized AI subscriptions.
          Find out where your money is going in 2 minutes.
        </p>

        <div className="flex items-center justify-center gap-12 mb-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">$1,440</p>
            <p className="text-sm text-gray-400 mt-1">avg annual savings</p>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-400 mt-1">tools analyzed</p>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">2 min</p>
            <p className="text-sm text-gray-400 mt-1">to complete</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <SpendForm />
        </div>
      </div>

      <div className="border-t border-gray-100 py-8 text-center text-gray-400 text-sm">
        <p>Built by Credex — discounted AI credits for startups</p>
      </div>
    </main>
  );
}