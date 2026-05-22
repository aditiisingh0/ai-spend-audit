import SpendForm from './components/SpendForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-block bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-6">
            Free • No login required • Instant results
          </div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Are you overpaying for
            <span className="text-blue-400"> AI tools?</span>
          </h1>
          <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
            Most startups waste $200–$800/month on redundant or wrong-sized AI subscriptions. 
            Find out where your money is going in 2 minutes.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-bold text-lg">$1,440</span>
              <span>avg annual savings found</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-bold text-lg">8</span>
              <span>AI tools analyzed</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-bold text-lg">2 min</span>
              <span>to complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <SpendForm />
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-12 py-8 text-center text-gray-600 text-sm">
        <p>Built by <span className="text-gray-400">Credex</span> — discounted AI infrastructure credits for startups</p>
      </div>
    </main>
  );
}