import { getTodayPanchang } from '../data/panchangData';

// TODO: Replace static data with live AstrologyAPI.com call:
// POST https://json.astrologyapi.com/v1/panchang
// Headers: Authorization: Basic base64(USER_ID:API_KEY)
// Body: { day, month, year, hour, min, lat, lon, tzone }

export default function DailyPanchang() {
  const panchang = getTodayPanchang();

  const cards = [
    { label: 'Tithi', value: panchang.tithi.name, sub: panchang.tithi.paksha, icon: '🌙' },
    { label: 'Nakshatra', value: panchang.nakshatra.name, sub: `Lord: ${panchang.nakshatra.lord}`, icon: '⭐' },
    { label: 'Yoga', value: panchang.yoga.name, sub: `Ends: ${panchang.yoga.endTime}`, icon: '🔯' },
    { label: 'Karan', value: panchang.karan.name, sub: `Ends: ${panchang.karan.endTime}`, icon: '📿' },
    { label: 'Sunrise', value: panchang.sunrise, sub: 'Suryoday', icon: '🌅' },
    { label: 'Sunset', value: panchang.sunset, sub: 'Suryast', icon: '🌇' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl font-bold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>
          📅 Aaj Ka Panchang
        </h2>
        <p className="font-body text-muted-foreground">{panchang.day}, {panchang.date}</p>
        <p className="text-xs font-body mt-1 px-3 py-1 rounded-full inline-block" style={{ background: 'oklch(0.78 0.14 75 / 0.1)', color: 'oklch(0.55 0.16 60)' }}>
          📍 Placeholder data — Connect AstrologyAPI.com for live calculations
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="ornamental-border rounded-xl p-4 bg-card text-center">
            <div className="text-3xl mb-2">{card.icon}</div>
            <p className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{card.label}</p>
            <p className="font-heading font-bold text-base" style={{ color: 'oklch(0.35 0.12 25)' }}>{card.value}</p>
            <p className="text-xs font-body text-muted-foreground">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Shubh Muhurat */}
      <div className="ornamental-border rounded-xl p-6 bg-card mb-4">
        <h3 className="font-heading font-bold text-lg mb-4" style={{ color: 'oklch(0.35 0.12 25)' }}>
          ✨ Shubh Muhurat
        </h3>
        <div className="space-y-3">
          {panchang.shubhMuhurat.map((m) => (
            <div key={m.name} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'oklch(0.65 0.16 140 / 0.08)', border: '1px solid oklch(0.65 0.16 140 / 0.2)' }}>
              <span className="font-heading font-semibold text-sm" style={{ color: 'oklch(0.35 0.12 25)' }}>{m.name}</span>
              <span className="font-body text-sm text-muted-foreground">{m.startTime} – {m.endTime}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Inauspicious Times */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Rahukaal', ...panchang.rahukaal, icon: '⚠️', color: 'oklch(0.55 0.22 25)' },
          { label: 'Yamaganda', ...panchang.yamaganda, icon: '🚫', color: 'oklch(0.55 0.18 40)' },
          { label: 'Gulika Kaal', ...panchang.gulika, icon: '⛔', color: 'oklch(0.50 0.15 30)' },
        ].map((t) => (
          <div key={t.label} className="rounded-xl p-4 text-center border" style={{ background: `${t.color}10`, borderColor: `${t.color}30` }}>
            <div className="text-2xl mb-1">{t.icon}</div>
            <p className="font-heading font-bold text-sm mb-1" style={{ color: t.color }}>{t.label}</p>
            <p className="font-body text-xs text-muted-foreground">{t.startTime} – {t.endTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
