import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const HOUSE_LABELS = [
  { house: "1st House", label: "Self / Personality", icon: "👤" },
  { house: "2nd House", label: "Finance / Wealth", icon: "💰" },
  { house: "4th House", label: "Home / Happiness", icon: "🏠" },
  { house: "5th House", label: "Children / Creativity", icon: "⭐" },
  { house: "7th House", label: "Relationships", icon: "💑" },
  { house: "10th House", label: "Career / Status", icon: "🏆" },
  { house: "11th House", label: "Gains / Networks", icon: "🌐" },
];

const DASHA_PERIODS = [
  { planet: "राहु", years: "Jun 2008 – Jun 2026" },
  { planet: "गुरु", years: "Jun 2026 – Jun 2042" },
  { planet: "शनि", years: "Jun 2042 – Jun 2061" },
];

const TRANSIT_NOTES = [
  "Shukra in Aries — शुक्र मेष में",
  "Guru in Gemini — गुरु मिथुन में",
  "Surya moves to Taurus — सूर्य वृषभ में",
  "Mangal in Pisces — मंगल मीन में",
  "Budha retrograde — बुध वक्री",
  "Shani in Pisces — शनि मीन में",
  "Surya-Guru 90° aspect",
  "Rahu in Aquarius — राहु कुंभ में",
  "Ketu in Leo — केतु सिंह में",
  "Chandra in Scorpio — चंद्र वृश्चिक में",
  "Venus conjunct Jupiter",
  "Mercury trine Saturn",
];

function getDayScore(year: number, month: number, day: number): number {
  const seed = (year * 400 + month * 31 + day) % 1009;
  const base = (seed * 37 + 17) % 100;
  // Add lunar cycle influence
  const lunarPhase = day % 30;
  const lunarBonus = lunarPhase > 10 && lunarPhase < 20 ? 8 : -5;
  // Add weekday influence
  const d = new Date(year, month - 1, day);
  const weekdayBonus = [
    d.getDay() === 1 || d.getDay() === 4 ? 10 : d.getDay() === 6 ? -8 : 0,
  ][0];
  return Math.max(10, Math.min(99, base + lunarBonus + weekdayBonus));
}

function getScoreColor(score: number): string {
  if (score >= 80) return "oklch(0.55 0.18 145)";
  if (score >= 60) return "oklch(0.68 0.20 48)";
  if (score >= 40) return "oklch(0.65 0.18 30)";
  return "oklch(0.55 0.22 20)";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Caution";
}

function getHouseScores(year: number, month: number, day: number): number[] {
  return HOUSE_LABELS.map((_, i) => {
    const seed = (year * 400 + month * 31 + day + i * 37) % 100;
    return Math.max(15, Math.min(99, seed + 15));
  });
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  // Returns 0=Sun ... 6=Sat, we want Mon=0
  const d = new Date(year, month - 1, 1).getDay();
  return (d + 6) % 7; // Shift so Mon=0
}

export default function PeriodAnalysis() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number | null>(
    today.getDate(),
  );

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOffset = getFirstDayOfMonth(currentYear, currentMonth);

  const allScores = Array.from({ length: daysInMonth }, (_, i) =>
    getDayScore(currentYear, currentMonth, i + 1),
  );

  const sortedScores = [...allScores.map((s, i) => ({ day: i + 1, score: s }))];
  const best5 = [...sortedScores].sort((a, b) => b.score - a.score).slice(0, 5);
  const worst5 = [...sortedScores]
    .sort((a, b) => a.score - b.score)
    .slice(0, 5);

  const countByCategory = {
    excellent: allScores.filter((s) => s >= 80).length,
    good: allScores.filter((s) => s >= 60 && s < 80).length,
    average: allScores.filter((s) => s >= 40 && s < 60).length,
    caution: allScores.filter((s) => s < 40).length,
  };

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else setCurrentMonth((m) => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else setCurrentMonth((m) => m + 1);
    setSelectedDay(null);
  };

  const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const selectedScore = selectedDay
    ? getDayScore(currentYear, currentMonth, selectedDay)
    : null;
  const selectedHouseScores = selectedDay
    ? getHouseScores(currentYear, currentMonth, selectedDay)
    : null;
  const transitNoteIdx = selectedDay
    ? (currentYear * 400 + currentMonth * 31 + selectedDay) %
      TRANSIT_NOTES.length
    : 0;
  const dashaPeriod = DASHA_PERIODS[0];

  return (
    <div className="space-y-6" data-ocid="period.section">
      {/* Calendar */}
      <Card
        style={{
          background: "oklch(0.16 0.04 20)",
          border: "1px solid oklch(0.28 0.06 25)",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={prevMonth}
              data-ocid="period.pagination_prev"
              className="rounded-lg px-3 py-2 font-heading font-semibold text-sm transition-colors"
              style={{
                background: "oklch(0.22 0.06 25)",
                color: "oklch(0.78 0.14 75)",
              }}
            >
              ← Prev
            </button>
            <CardTitle
              className="font-heading text-base"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              📊 {MONTH_NAMES[currentMonth - 1]} {currentYear}
            </CardTitle>
            <button
              type="button"
              onClick={nextMonth}
              data-ocid="period.pagination_next"
              className="rounded-lg px-3 py-2 font-heading font-semibold text-sm transition-colors"
              style={{
                background: "oklch(0.22 0.06 25)",
                color: "oklch(0.78 0.14 75)",
              }}
            >
              Next →
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className="text-center font-heading text-xs font-semibold py-1"
                style={{ color: "oklch(0.60 0.04 60)" }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDayOffset }, (_, i) => i).map(
              (offset) => (
                <div
                  key={`empty-${currentYear}-${currentMonth}-offset-${offset}`}
                />
              ),
            )}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const score = allScores[i];
              const color = getScoreColor(score);
              const isSelected = selectedDay === day;
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() + 1 &&
                currentYear === today.getFullYear();

              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  data-ocid={`period.item.${day}`}
                  className="relative rounded-lg p-1 text-center transition-all hover:opacity-90"
                  style={{
                    background: isSelected
                      ? `${color}33`
                      : "oklch(0.20 0.05 20)",
                    border: isSelected
                      ? `2px solid ${color}`
                      : isToday
                        ? "2px solid oklch(0.78 0.14 75)"
                        : "1px solid oklch(0.26 0.06 25)",
                    minHeight: "52px",
                  }}
                >
                  <div
                    className="font-heading text-xs font-semibold mb-0.5"
                    style={{
                      color: isSelected ? color : "oklch(0.85 0.04 60)",
                    }}
                  >
                    {day}
                  </div>
                  <div
                    className="mx-auto rounded-full text-xs font-bold"
                    style={{
                      width: "24px",
                      height: "24px",
                      lineHeight: "24px",
                      background: color,
                      color: "white",
                      fontSize: "9px",
                    }}
                  >
                    {score}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div
            className="flex flex-wrap gap-3 mt-4 pt-4"
            style={{ borderTop: "1px solid oklch(0.26 0.06 25)" }}
          >
            {[
              { color: "oklch(0.55 0.18 145)", label: "Excellent (80+)" },
              { color: "oklch(0.68 0.20 48)", label: "Good (60–79)" },
              { color: "oklch(0.65 0.18 30)", label: "Average (40–59)" },
              { color: "oklch(0.55 0.22 20)", label: "Caution (<40)" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div
                  className="rounded-full w-3 h-3"
                  style={{ background: item.color }}
                />
                <span
                  className="font-body text-xs"
                  style={{ color: "oklch(0.65 0.04 60)" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected day detail */}
      {selectedDay && selectedScore !== null && selectedHouseScores && (
        <Card
          style={{
            background: "oklch(0.16 0.04 20)",
            border: `2px solid ${getScoreColor(selectedScore)}`,
          }}
        >
          <CardHeader>
            <CardTitle
              className="font-heading text-base"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              📅 {MONTH_NAMES[currentMonth - 1]} {selectedDay}, {currentYear} —
              Day Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Overall Score */}
            <div className="flex items-center gap-4">
              <div
                className="rounded-full flex items-center justify-center text-3xl font-bold font-heading"
                style={{
                  width: "72px",
                  height: "72px",
                  background: `${getScoreColor(selectedScore)}22`,
                  border: `3px solid ${getScoreColor(selectedScore)}`,
                  color: getScoreColor(selectedScore),
                }}
              >
                {selectedScore}
              </div>
              <div>
                <p
                  className="font-heading font-bold text-lg"
                  style={{ color: getScoreColor(selectedScore) }}
                >
                  {getScoreLabel(selectedScore)}
                </p>
                <p
                  className="font-body text-sm"
                  style={{ color: "oklch(0.65 0.04 60)" }}
                >
                  Overall Day Score
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "oklch(0.60 0.04 60)" }}
                >
                  🪐 {TRANSIT_NOTES[transitNoteIdx]}
                </p>
              </div>
            </div>

            {/* House-wise bars */}
            <div>
              <p
                className="font-heading text-sm font-semibold mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🏠 House-wise Strength
              </p>
              <div className="space-y-2">
                {HOUSE_LABELS.map((h, i) => {
                  const s = selectedHouseScores[i];
                  return (
                    <div key={h.house} className="flex items-center gap-3">
                      <span className="text-sm w-4">{h.icon}</span>
                      <span
                        className="font-body text-xs w-32 shrink-0"
                        style={{ color: "oklch(0.70 0.04 60)" }}
                      >
                        {h.house} — {h.label}
                      </span>
                      <div
                        className="flex-1 h-2 rounded-full overflow-hidden"
                        style={{ background: "oklch(0.22 0.06 25)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${s}%`,
                            background: getScoreColor(s),
                          }}
                        />
                      </div>
                      <span
                        className="font-heading text-xs w-8 text-right"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {s}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dasha period */}
            <div
              className="rounded-lg p-3"
              style={{
                background: "oklch(0.20 0.06 25)",
                border: "1px solid oklch(0.30 0.08 25)",
              }}
            >
              <p
                className="font-heading text-xs font-semibold mb-1"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ⏳ Active Dasha Period
              </p>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.80 0.04 60)" }}
              >
                महादशा: <strong>{dashaPeriod.planet}</strong> ·{" "}
                {dashaPeriod.years}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Summary */}
      <Card
        style={{
          background: "oklch(0.16 0.04 20)",
          border: "1px solid oklch(0.28 0.06 25)",
        }}
      >
        <CardHeader>
          <CardTitle
            className="font-heading text-base"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📈 Monthly Summary — {MONTH_NAMES[currentMonth - 1]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Category counts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Excellent",
                count: countByCategory.excellent,
                color: "oklch(0.55 0.18 145)",
              },
              {
                label: "Good",
                count: countByCategory.good,
                color: "oklch(0.68 0.20 48)",
              },
              {
                label: "Average",
                count: countByCategory.average,
                color: "oklch(0.65 0.18 30)",
              },
              {
                label: "Caution",
                count: countByCategory.caution,
                color: "oklch(0.55 0.22 20)",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="text-center rounded-lg p-3"
                style={{
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}40`,
                }}
              >
                <div
                  className="font-heading text-2xl font-bold"
                  style={{ color: item.color }}
                >
                  {item.count}
                </div>
                <div
                  className="font-body text-xs"
                  style={{ color: "oklch(0.65 0.04 60)" }}
                >
                  {item.label} days
                </div>
              </div>
            ))}
          </div>

          {/* Best & worst days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p
                className="font-heading text-sm font-semibold mb-2"
                style={{ color: "oklch(0.55 0.18 145)" }}
              >
                🌟 Best 5 Days
              </p>
              <div className="space-y-1">
                {best5.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between rounded px-3 py-1.5"
                    style={{ background: "oklch(0.55 0.18 145 / 0.10)" }}
                  >
                    <span
                      className="font-heading text-sm"
                      style={{ color: "oklch(0.85 0.04 60)" }}
                    >
                      {MONTH_NAMES[currentMonth - 1].slice(0, 3)} {item.day}
                    </span>
                    <span
                      className="font-heading font-bold text-sm"
                      style={{ color: "oklch(0.55 0.18 145)" }}
                    >
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p
                className="font-heading text-sm font-semibold mb-2"
                style={{ color: "oklch(0.55 0.22 20)" }}
              >
                ⚠️ Caution Days
              </p>
              <div className="space-y-1">
                {worst5.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between rounded px-3 py-1.5"
                    style={{ background: "oklch(0.55 0.22 20 / 0.10)" }}
                  >
                    <span
                      className="font-heading text-sm"
                      style={{ color: "oklch(0.85 0.04 60)" }}
                    >
                      {MONTH_NAMES[currentMonth - 1].slice(0, 3)} {item.day}
                    </span>
                    <span
                      className="font-heading font-bold text-sm"
                      style={{ color: "oklch(0.55 0.22 20)" }}
                    >
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
