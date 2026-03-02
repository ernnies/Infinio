import { useState } from 'react';

interface Props {
  onCompile: (steps: string[]) => void;
  disabled?: boolean;
}

export default function NaturalLanguagePanel({ onCompile, disabled = false }: Props) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const compile = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      // Phase 1: client-side simple parser (safe fallback)
      const lower = prompt.toLowerCase();
      const steps: string[] = [];
      if (lower.includes('buy') || lower.includes('purchase')) steps.push('Buy Token');
      if (lower.includes('sell')) steps.push('Sell Token');
      if (lower.includes('stake') || lower.includes('farm')) steps.push('Stake');
      if (lower.includes('rwa') || lower.includes('bond') || lower.includes('treasury')) steps.push('Invest in RWA Bond');
      if (lower.includes('optimize') || lower.includes('agent')) steps.push('AI Agent Optimize');

      // Phase 2: call backend if enabled
      if (import.meta.env.VITE_FEATURE_NL_COMPILER === 'true') {
        const res = await fetch('/api/compile-nl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
        if (res.ok) {
          const { steps: backendSteps } = await res.json();
          onCompile(backendSteps || steps);
        } else {
          onCompile(steps); // fallback
        }
      } else {
        onCompile(steps);
      }
      setPrompt('');
    } catch (err) {
      console.error(err);
      alert('Compilation failed');
    } finally {
      setLoading(false);
    }
  };

  if (disabled) return null;

  return (
    <div className="border p-4 rounded bg-gray-50 dark:bg-gray-800">
      <h3 className="font-semibold mb-2">Describe Strategy (Natural Language)</h3>
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="e.g. Buy ETH on dip, stake in vault, sell at 20% profit, use RWA if stable"
        className="w-full h-24 p-2 border rounded mb-2"
      />
      <button
        onClick={compile}
        disabled={loading || !prompt.trim()}
        className="bg-cyan-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Compiling...' : 'Compile to Workflow'}
      </button>
    </div>
  );
}