import { useState } from 'react';
import { VRAT_CALENDAR_2026, VratDay } from '../data/vratCalendarData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TYPE_COLORS: Record<string, string> = {
  ekadashi: 'oklch(0.65 0.16 140)',
  pradosh: 'oklch(0.55 0.12 200)',
  purnima: 'oklch(0.78 0.14 75)',
  amavasya: 'oklch(0.45 0.08 280)',
  festival: 'oklch(0.68 0.20 48)',
  navratri: 'oklch(0.60 0.18 350)',
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function VratCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const year = 2026;

  const monthVrats = VRAT_CALENDAR_2026.filter((v) => {
    const d = new Date(v.date);
    return d.getMonth() === currentMonth && d.getFullYear() === year;
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold mb-1" style={{ color: 'oklch(0.35 0.12 25)' }}>
          🌙 Vrat & Festival Calendar {year}
        </h2>
        <p className="font-body text-sm text-muted-foreground">Fasting days, festivals & auspicious occasions</p>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center justify-between mb-6 ornamental-border rounded-xl p-4 bg-card">
        <button onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))} className="p-2 rounded-full hover:bg-muted transition-colors" disabled={currentMonth === 0}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="font-heading font-bold text-xl" style={{ color: 'oklch(0.35 0.12 25)' }}>
          {MONTHS[currentMonth]} {year}
        </h3>
        <button onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))} className="p-2 rounded-full hover:bg-muted transition-colors" disabled={currentMonth === 11}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full" style={{ background: color }} />
            <span className="text-xs font-heading capitalize" style={{ color: 'oklch(0.45 0.06 40)' }}>{type}</span>
          </div>
        ))}
      </div>

      {/* Vrat List */}
      {monthVrats.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground font-body">No major vrats this month</div>
      ) : (
        <div className="space-y-3">
          {monthVrats.map((vrat) => {
            const d = new Date(vrat.date);
            const color = TYPE_COLORS[vrat.type] || 'oklch(0.68 0.20 48)';
            return (
              <div key={vrat.date} className="flex gap-4 p-4 rounded-xl border bg-card" style={{ borderColor: `${color}30` }}>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                  <span className="font-heading font-bold text-lg leading-none" style={{ color }}>{d.getDate()}</span>
                  <span className="font-body text-xs" style={{ color }}>{MONTHS[d.getMonth()].slice(0, 3)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-heading font-bold text-sm" style={{ color: 'oklch(0.22 0.08 22)' }}>{vrat.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full font-heading capitalize" style={{ background: `${color}15`, color }}>
                      {vrat.type}
                    </span>
                  </div>
                  <p className="font-body text-xs text-muted-foreground">{vrat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
