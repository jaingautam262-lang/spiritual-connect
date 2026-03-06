import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RASHIS } from '../data/rashifalData';

export default function Rashifal() {
  const [selectedRashi, setSelectedRashi] = useState('aries');
  const rashi = RASHIS.find((r) => r.id === selectedRashi) || RASHIS[0];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>
          ♈ Rashifal — Your Horoscope
        </h2>
        <p className="font-body text-sm text-muted-foreground">Select your zodiac sign for predictions</p>
      </div>

      {/* Rashi Selector */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-8">
        {RASHIS.map((r) => (
          <button
            key={r.id}
            onClick={() => setSelectedRashi(r.id)}
            className="flex flex-col items-center p-2 rounded-xl border transition-all duration-200 hover:scale-105"
            style={{
              borderColor: selectedRashi === r.id ? 'oklch(0.68 0.20 48)' : 'oklch(0.78 0.14 75 / 0.2)',
              background: selectedRashi === r.id ? 'oklch(0.68 0.20 48 / 0.1)' : 'oklch(0.99 0.008 80)',
            }}
          >
            <span className="text-xl mb-0.5">{r.symbol}</span>
            <span className="font-heading text-xs font-semibold" style={{ color: selectedRashi === r.id ? 'oklch(0.68 0.20 48)' : 'oklch(0.35 0.12 25)' }}>
              {r.hindiName}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Rashi Info */}
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{rashi.symbol}</span>
          <div>
            <h3 className="font-heading font-bold text-xl" style={{ color: 'oklch(0.35 0.12 25)' }}>
              {rashi.name} ({rashi.hindiName})
            </h3>
            <p className="font-body text-sm text-muted-foreground">{rashi.dates} • {rashi.element} • {rashi.rulingPlanet}</p>
          </div>
        </div>

        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily" className="font-heading text-xs">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="font-heading text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="yearly" className="font-heading text-xs">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.30 0.06 30)' }}>{rashi.daily}</p>
          </TabsContent>
          <TabsContent value="weekly">
            <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.30 0.06 30)' }}>{rashi.weekly}</p>
          </TabsContent>
          <TabsContent value="yearly">
            <p className="font-body text-sm leading-relaxed" style={{ color: 'oklch(0.30 0.06 30)' }}>{rashi.yearly}</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
