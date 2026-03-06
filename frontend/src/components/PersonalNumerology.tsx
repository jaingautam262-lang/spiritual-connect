import { useState } from 'react';
import { calculateChaldeanNameNumber, calculateMoolank, calculateBhagyank, getRulingPlanet, extractLoShuNumbers } from '../utils/chaldeanNumerology';
import { NUMBER_INTERPRETATIONS, LO_SHU_GRID_LAYOUT, LO_SHU_INTERPRETATIONS } from '../data/numerologyInterpretations';
import LoShuGrid from './LoShuGrid';

export default function PersonalNumerology() {
  const [form, setForm] = useState({ name: '', dob: '' });
  const [result, setResult] = useState<{ moolank: number; bhagyank: number; nameNumber: number; loShuNumbers: number[] } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.dob) return;
    setResult({
      moolank: calculateMoolank(form.dob),
      bhagyank: calculateBhagyank(form.dob),
      nameNumber: calculateChaldeanNameNumber(form.name),
      loShuNumbers: extractLoShuNumbers(form.dob),
    });
  };

  const getInterp = (num: number) => NUMBER_INTERPRETATIONS.find((n) => n.number === num);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2 className="font-heading text-xl font-bold mb-4 text-center" style={{ color: 'oklch(0.35 0.12 25)' }}>
          👤 Personal Numerology
        </h2>
        <form onSubmit={handleCalculate} className="flex flex-col md:flex-row gap-4">
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full Name" className="flex-1 px-4 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }} required />
          <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })}
            className="flex-1 px-4 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }} required />
          <button type="submit" className="px-6 py-2 rounded-full font-heading font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))', color: 'white' }}>
            Calculate
          </button>
        </form>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Moolank (Driver)', value: result.moolank, desc: 'Life Path Number' },
              { label: 'Bhagyank (Destiny)', value: result.bhagyank, desc: 'Destiny Number' },
              { label: 'Name Number', value: result.nameNumber, desc: 'Chaldean Name Value' },
            ].map((item) => {
              const interp = getInterp(item.value);
              return (
                <div key={item.label} className="ornamental-border rounded-xl p-5 bg-card text-center">
                  <p className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{item.label}</p>
                  <div className="text-5xl font-decorative font-bold mb-2" style={{ color: 'oklch(0.68 0.20 48)' }}>{item.value}</div>
                  <p className="font-heading font-semibold text-sm mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>{interp?.name}</p>
                  <p className="text-xs font-body text-muted-foreground mb-2">{interp?.planet}</p>
                  <p className="text-xs font-body" style={{ color: 'oklch(0.30 0.06 30)' }}>{interp?.description.slice(0, 100)}...</p>
                </div>
              );
            })}
          </div>

          <div className="ornamental-border rounded-2xl p-6 bg-card">
            <h3 className="font-heading font-bold text-lg mb-4 text-center" style={{ color: 'oklch(0.35 0.12 25)' }}>
              Lo Shu Grid
            </h3>
            <LoShuGrid numbers={result.loShuNumbers} />
          </div>
        </div>
      )}
    </div>
  );
}
