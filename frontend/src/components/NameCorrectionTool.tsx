import { useState } from 'react';
import { calculateChaldeanNameNumber } from '../utils/chaldeanNumerology';
import { correctBusinessName } from '../utils/businessNumerology';

export default function NameCorrectionTool() {
  const [name, setName] = useState('');
  const [results, setResults] = useState<Array<{ name: string; number: number; improvement: string }> | null>(null);
  const [currentValue, setCurrentValue] = useState<number | null>(null);

  const handleCorrect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCurrentValue(calculateChaldeanNameNumber(name));
    setResults(correctBusinessName(name));
  };

  const FAVORABLE = [1, 5, 6, 9];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2 className="font-heading text-xl font-bold mb-4 text-center" style={{ color: 'oklch(0.35 0.12 25)' }}>
          ✏️ Name Correction Tool
        </h2>
        <form onSubmit={handleCorrect} className="flex gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter business name"
            className="flex-1 px-4 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }}
            required
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full font-heading font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))', color: 'white' }}
          >
            Correct
          </button>
        </form>
      </div>

      {results !== null && (
        <div className="space-y-4">
          <div className="ornamental-border rounded-xl p-4 bg-card flex items-center justify-between">
            <div>
              <p className="font-heading font-semibold text-sm" style={{ color: 'oklch(0.35 0.12 25)' }}>Current: {name}</p>
              <p className="text-xs font-body text-muted-foreground">Chaldean Value: {currentValue}</p>
            </div>
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center font-decorative font-bold text-xl"
              style={{
                background: FAVORABLE.includes(currentValue ?? 0) ? 'oklch(0.65 0.16 140 / 0.15)' : 'oklch(0.55 0.22 25 / 0.15)',
                color: FAVORABLE.includes(currentValue ?? 0) ? 'oklch(0.45 0.14 140)' : 'oklch(0.55 0.22 25)',
              }}
            >
              {currentValue}
            </div>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-6 font-body text-muted-foreground">
              No better alternatives found. Your name already has a favorable number!
            </div>
          ) : (
            <div className="space-y-3">
              <p className="font-heading font-semibold text-sm" style={{ color: 'oklch(0.35 0.12 25)' }}>
                Suggested Corrections ({results.length})
              </p>
              {results.map((r, i) => (
                <div key={i} className="ornamental-border rounded-xl p-4 bg-card flex items-center justify-between">
                  <div>
                    <p className="font-heading font-bold text-sm" style={{ color: 'oklch(0.22 0.08 22)' }}>{r.name}</p>
                    <p className="text-xs font-body text-muted-foreground">{r.improvement}</p>
                  </div>
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center font-decorative font-bold text-xl"
                    style={{ background: 'oklch(0.65 0.16 140 / 0.15)', color: 'oklch(0.45 0.14 140)' }}
                  >
                    {r.number}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
