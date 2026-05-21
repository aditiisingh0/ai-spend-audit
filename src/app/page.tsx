import SpendForm from './components/SpendForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          AI Spend Audit
        </h1>
        <p className="text-gray-400 text-lg">
          Find out where you are overspending on AI tools — free, instant, no login required
        </p>
      </div>
      <SpendForm />
    </main>
  );
}