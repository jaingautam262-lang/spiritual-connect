import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';
import BirthChartWheel from './BirthChartWheel';
import { SAMPLE_PLANETARY_POSITIONS } from '../data/reportOutputData';

// TODO: Integrate AstrologyAPI.com or Prokerala for live Kundli calculations:
// POST https://json.astrologyapi.com/v1/planets
// Headers: Authorization: Basic base64(USER_ID:API_KEY)
// Body: { day, month, year, hour, min, lat, lon, tzone }
// Replace SAMPLE_PLANETARY_POSITIONS with live API response

export default function KundliGenerator() {
  const { identity } = useInternetIdentity();
  const saveProfile = useSaveCallerUserProfile();
  const [form, setForm] = useState({ name: '', dob: '', tob: '', pob: '' });
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.dob || !form.tob || !form.pob) {
      toast.error('Please fill all fields');
      return;
    }
    if (identity) {
      try {
        await saveProfile.mutateAsync({
          name: form.name,
          email: '',
          birthDate: form.dob,
          birthTime: form.tob,
          birthPlace: form.pob,
          gotra: '',
          createdAt: BigInt(Date.now()) * BigInt(1_000_000),
        });
      } catch {
        // Non-critical
      }
    }
    setGenerated(true);
    toast.success('Kundli generated!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>
          ⭐ Kundli Generator
        </h2>
        <p className="font-body text-sm text-muted-foreground">Generate your birth chart with planetary positions</p>
        <p className="text-xs font-body mt-1 px-3 py-1 rounded-full inline-block" style={{ background: 'oklch(0.78 0.14 75 / 0.1)', color: 'oklch(0.55 0.16 60)' }}>
          📍 Placeholder chart — Connect AstrologyAPI.com for live calculations
        </p>
      </div>

      {!generated ? (
        <div className="ornamental-border rounded-2xl p-6 md:p-8 bg-card max-w-lg mx-auto">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-sm font-heading font-semibold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>Full Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your full name" className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-heading font-semibold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>Date of Birth *</label>
                <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                  style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }} required />
              </div>
              <div>
                <label className="block text-sm font-heading font-semibold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>Time of Birth *</label>
                <input type="time" value={form.tob} onChange={(e) => setForm({ ...form, tob: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                  style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-heading font-semibold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>Place of Birth *</label>
              <input type="text" value={form.pob} onChange={(e) => setForm({ ...form, pob: e.target.value })}
                placeholder="City, State, Country" className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: 'oklch(0.78 0.14 75 / 0.3)' }} required />
            </div>
            <button type="submit" disabled={saveProfile.isPending}
              className="w-full py-3 rounded-full font-heading font-bold text-sm tracking-wide transition-all disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))', color: 'white' }}>
              {saveProfile.isPending ? 'Generating...' : '⭐ Generate Kundli'}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="ornamental-border rounded-2xl p-6 bg-card">
            <h3 className="font-heading font-bold text-lg mb-4 text-center" style={{ color: 'oklch(0.35 0.12 25)' }}>
              Birth Chart — {form.name}
            </h3>
            <p className="text-center text-sm font-body text-muted-foreground mb-6">
              {form.dob} at {form.tob} • {form.pob}
            </p>
            <BirthChartWheel />
          </div>

          {/* Planetary Positions Table */}
          <div className="ornamental-border rounded-2xl p-6 bg-card">
            <h3 className="font-heading font-bold text-lg mb-4" style={{ color: 'oklch(0.35 0.12 25)' }}>
              Planetary Positions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr style={{ borderBottom: '1px solid oklch(0.78 0.14 75 / 0.2)' }}>
                    {['Planet', 'Sign', 'Degree', 'House', 'Status'].map((h) => (
                      <th key={h} className="text-left py-2 px-3 font-heading font-semibold text-xs uppercase tracking-wider" style={{ color: 'oklch(0.68 0.20 48)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_PLANETARY_POSITIONS.map((p) => (
                    <tr key={p.planet} style={{ borderBottom: '1px solid oklch(0.78 0.14 75 / 0.1)' }}>
                      <td className="py-2 px-3 font-heading font-semibold" style={{ color: 'oklch(0.35 0.12 25)' }}>{p.planet}</td>
                      <td className="py-2 px-3">{p.sign}</td>
                      <td className="py-2 px-3">{p.degree}</td>
                      <td className="py-2 px-3">{p.house}</td>
                      <td className="py-2 px-3">
                        {p.retrograde ? <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'oklch(0.55 0.22 25 / 0.1)', color: 'oklch(0.55 0.22 25)' }}>Retrograde</span> : <span className="text-xs" style={{ color: 'oklch(0.65 0.16 140)' }}>Direct</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center">
            <button onClick={() => setGenerated(false)}
              className="px-6 py-2 rounded-full font-heading font-semibold text-sm border transition-all"
              style={{ borderColor: 'oklch(0.68 0.20 48)', color: 'oklch(0.68 0.20 48)' }}>
              Generate New Kundli
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
