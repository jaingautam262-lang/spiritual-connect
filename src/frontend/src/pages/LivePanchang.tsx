import { useEffect, useState } from "react";

// ── Data ────────────────────────────────────────────────────────────────────

const LAGNA_SCHEDULE = [
  { sign: "Aries", startH: 0, startM: 0, endH: 1, endM: 30 },
  { sign: "Taurus", startH: 1, startM: 30, endH: 3, endM: 30 },
  { sign: "Gemini", startH: 3, startM: 30, endH: 5, endM: 30 },
  { sign: "Cancer", startH: 5, startM: 30, endH: 7, endM: 30 },
  { sign: "Leo", startH: 7, startM: 30, endH: 9, endM: 30 },
  { sign: "Virgo", startH: 9, startM: 30, endH: 11, endM: 30 },
  { sign: "Libra", startH: 11, startM: 30, endH: 13, endM: 30 },
  { sign: "Scorpio", startH: 13, startM: 30, endH: 15, endM: 30 },
  { sign: "Sagittarius", startH: 15, startM: 30, endH: 17, endM: 30 },
  { sign: "Capricorn", startH: 17, startM: 30, endH: 19, endM: 30 },
  { sign: "Aquarius", startH: 19, startM: 30, endH: 21, endM: 30 },
  { sign: "Pisces", startH: 21, startM: 30, endH: 24, endM: 0 },
] as const;

type LagnaEntry = (typeof LAGNA_SCHEDULE)[number];

const SUN_MOON_EVENTS = [
  {
    key: "moonrise",
    label: "Moon Rise",
    emoji: "🌙",
    time: "02:49",
    minutes: 2 * 60 + 49,
  },
  {
    key: "sunrise",
    label: "Sun Rise",
    emoji: "☀️",
    time: "06:00",
    minutes: 6 * 60,
  },
  {
    key: "moonset",
    label: "Moon Set",
    emoji: "🌒",
    time: "13:35",
    minutes: 13 * 60 + 35,
  },
  {
    key: "sunset",
    label: "Sun Set",
    emoji: "🔅",
    time: "18:49",
    minutes: 18 * 60 + 49,
  },
] as const;

// ── Helpers ─────────────────────────────────────────────────────────────────

function toMinutes(h: number, m: number) {
  return h * 60 + m;
}

function pct(minutes: number) {
  return `${((minutes / 1440) * 100).toFixed(2)}%`;
}

function lagnaToMinutes(entry: LagnaEntry) {
  return toMinutes(entry.startH, entry.startM);
}

function lagnaEndMinutes(entry: LagnaEntry) {
  return toMinutes(entry.endH, entry.endM);
}

// ── Sub-components ──────────────────────────────────────────────────────────

function PanchangCard({
  label,
  current,
  from,
  to,
  extra,
  color,
}: {
  label: string;
  current: string;
  from: string;
  to: string;
  extra?: string;
  color: string;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-amber-500/30 bg-card overflow-hidden shadow-md">
      <div
        className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-100 ${color}`}
      >
        {label}
      </div>
      <div className="flex-1 px-4 py-3">
        <p className="text-2xl font-bold font-heading gold-text">{current}</p>
        {extra && (
          <p className="text-xs text-muted-foreground mt-0.5">{extra}</p>
        )}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-xs text-muted-foreground">{from}</span>
          <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-1/2 rounded-full saffron-gradient" />
          </div>
          <span className="text-xs font-medium saffron-text">{to}</span>
        </div>
      </div>
    </div>
  );
}

function LagnaJourneyChart({ nowMinutes }: { nowMinutes: number }) {
  const [hovered, setHovered] = useState<LagnaEntry | null>(null);
  const SIGNS = LAGNA_SCHEDULE;

  return (
    <div className="rounded-xl border border-amber-500/30 bg-card p-5 shadow-md">
      <h3 className="font-heading text-lg font-semibold gold-text mb-1">
        Lagna Journey Across the Day
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Hover to reveal precise lagna change timings. The step line holds each
        rising sign until the next transition.
      </p>

      {/* Chart grid */}
      <div className="flex gap-0">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-around pr-2 text-right min-w-[82px]">
          {SIGNS.map((s) => (
            <span
              key={s.sign}
              className="text-[10px] text-muted-foreground leading-none py-0.5"
            >
              {s.sign}
            </span>
          ))}
        </div>

        {/* Bars */}
        <div className="flex-1 flex flex-col gap-[2px] relative">
          {SIGNS.map((entry) => {
            const startPct = ((lagnaToMinutes(entry) / 1440) * 100).toFixed(2);
            const widthPct = (
              ((lagnaEndMinutes(entry) - lagnaToMinutes(entry)) / 1440) *
              100
            ).toFixed(2);
            const isCurrent =
              nowMinutes >= lagnaToMinutes(entry) &&
              nowMinutes < lagnaEndMinutes(entry);
            const isHovered = hovered?.sign === entry.sign;

            return (
              <div
                key={entry.sign}
                className="relative h-5 w-full bg-muted/30 rounded-sm cursor-pointer"
                onMouseEnter={() => setHovered(entry)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`absolute top-0 h-full rounded-sm transition-all ${
                    isCurrent
                      ? "saffron-gradient ring-1 ring-amber-400"
                      : isHovered
                        ? "bg-amber-500/40"
                        : "bg-amber-500/20"
                  }`}
                  style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                />
                {isCurrent && (
                  <div
                    className="absolute top-0 h-full w-0.5 bg-amber-300 rounded-full z-10"
                    style={{ left: pct(nowMinutes) }}
                  />
                )}
              </div>
            );
          })}

          {/* Current time vertical line over entire chart */}
          <div
            className="absolute top-0 bottom-0 w-px bg-amber-400/70 pointer-events-none"
            style={{ left: pct(nowMinutes) }}
          />

          {/* X-axis ticks (rendered as overlay at bottom) */}
          <div className="flex justify-between mt-1 pt-1 border-t border-border/50">
            {[
              "00:00",
              "03:00",
              "06:00",
              "09:00",
              "12:00",
              "15:00",
              "18:00",
              "21:00",
              "24:00",
            ].map((t) => (
              <span key={t} className="text-[9px] text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hovered && (
        <div className="mt-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-foreground">
          <span className="font-semibold gold-text">{hovered.sign}</span> rises
          at{" "}
          <span className="font-mono">
            {String(hovered.startH).padStart(2, "0")}:
            {String(hovered.startM).padStart(2, "0")}
          </span>{" "}
          and holds until{" "}
          <span className="font-mono">
            {String(hovered.endH).padStart(2, "0")}:
            {String(hovered.endM).padStart(2, "0")}
          </span>
        </div>
      )}
    </div>
  );
}

function SunMoonTimeline({ nowMinutes }: { nowMinutes: number }) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-card p-5 shadow-md">
      <h3 className="font-heading text-lg font-semibold gold-text mb-4">
        Sun &amp; Moon Timeline
      </h3>
      <div className="relative h-10 bg-muted/40 rounded-full overflow-visible mx-2">
        {/* Track */}
        <div className="absolute inset-0 rounded-full border border-amber-500/20" />

        {/* Sunrise/sunset gradient fill */}
        <div
          className="absolute top-0 h-full rounded-full"
          style={{
            left: pct(6 * 60),
            width: `calc(${pct(18 * 60 + 49)} - ${pct(6 * 60)})`,
            background:
              "linear-gradient(90deg, oklch(0.72 0.2 55 / 0.25), oklch(0.78 0.14 75 / 0.15), oklch(0.55 0.18 40 / 0.25))",
          }}
        />

        {/* Event markers */}
        {SUN_MOON_EVENTS.map((ev) => (
          <div
            key={ev.key}
            className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{
              left: pct(ev.minutes),
              transform: "translate(-50%, -50%)",
            }}
            data-ocid={`timeline-${ev.key}`}
          >
            <span className="text-lg leading-none">{ev.emoji}</span>
            <span className="text-[9px] text-muted-foreground whitespace-nowrap mt-0.5">
              {ev.time}
            </span>
          </div>
        ))}

        {/* Current time marker */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 rounded-full"
          style={{ left: pct(nowMinutes), transform: "translateX(-50%)" }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400" />
        </div>
      </div>

      {/* Labels row */}
      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground px-2">
        <span>00:00</span>
        <div className="flex gap-4">
          {SUN_MOON_EVENTS.map((ev) => (
            <span key={ev.key} className="flex items-center gap-1">
              {ev.emoji} <span>{ev.label}</span>
            </span>
          ))}
        </div>
        <span>24:00</span>
      </div>
    </div>
  );
}

function CrescentMoon() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* CSS crescent */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-full"
          style={{
            background: "oklch(0.55 0.04 220)",
            boxShadow: "inset -12px -4px 0 0 oklch(0.92 0.02 80)",
          }}
        />
      </div>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span>Waning Crescent</span>
        <span className="text-amber-400">•</span>
        <span>28% illuminated</span>
        <span className="text-amber-400">•</span>
        <span>Dashami</span>
      </div>
      <div className="flex gap-6 text-xs">
        <div className="text-center">
          <p className="text-muted-foreground">Distance</p>
          <p className="font-semibold text-foreground">391,322 km</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Parallactic</p>
          <p className="font-semibold text-foreground">63.3°</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function LivePanchang() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString("en-IN", { hour12: false });
  const nowMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  const currentLagna = LAGNA_SCHEDULE.find(
    (e) => nowMinutes >= lagnaToMinutes(e) && nowMinutes < lagnaEndMinutes(e),
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* ── 1. Page Header ── */}
        <div className="rounded-2xl border border-amber-500/30 bg-card px-6 py-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold gold-text">
                Live Panchang
              </h1>
              <p className="text-muted-foreground mt-1">
                Real-time vedic calendar information
              </p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="flex items-center gap-2" data-ocid="live-badge">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-600 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  LIVE
                </span>
                <span
                  className="font-mono text-lg font-bold gold-text tabular-nums"
                  data-ocid="live-clock"
                >
                  {timeStr}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Apr 12, 2026 &nbsp;·&nbsp; Mohali, India
              </div>
              {currentLagna && (
                <div className="text-xs px-2 py-0.5 rounded-full border border-amber-500/30 saffron-text">
                  Current Lagna: {currentLagna.sign}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── 2. Panchang Timeline Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <PanchangCard
            label="Tithi"
            current="Dashami"
            from="Navami"
            to="Dashami"
            extra="Day 10 of 15 (Krishna Paksha)"
            color="bg-amber-600"
          />
          <PanchangCard
            label="Nakshatra"
            current="Dhanishtha"
            from="Shravana"
            to="Dhanishtha"
            color="bg-orange-600"
          />
          <PanchangCard
            label="Yoga"
            current="Shubha"
            from="Sadhya"
            to="Shubha"
            color="bg-yellow-600"
          />
          <PanchangCard
            label="Karana"
            current="Vanija"
            from="Garaja"
            to="Vishti"
            extra="Garaja → Vanija → Vishti"
            color="bg-amber-700"
          />
        </div>

        {/* ── 3. Lagna Journey Chart ── */}
        <LagnaJourneyChart nowMinutes={nowMinutes} />

        {/* ── 4. Sun & Moon Position Cards ── */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Sun */}
          <div
            className="rounded-xl border border-amber-500/30 bg-card p-5 shadow-md"
            data-ocid="sun-position-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">☀️</span>
              <h3 className="font-heading text-lg font-semibold gold-text">
                Sun Position
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Sign</p>
                <p className="font-semibold">Pisces</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Degrees</p>
                <p className="font-semibold font-mono">28.33°</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Nakshatra</p>
                <p className="font-semibold">Revati</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Pada</p>
                <p className="font-semibold">Pada 4</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1.5">
                <span>☀️</span>
                <div>
                  <p className="text-[10px] text-muted-foreground">Sunrise</p>
                  <p className="font-semibold font-mono">06:00</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🌇</span>
                <div>
                  <p className="text-[10px] text-muted-foreground">Sunset</p>
                  <p className="font-semibold font-mono">18:49</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Solar Noon</p>
                <p className="font-semibold font-mono">12:25</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Day Length</p>
                <p className="font-semibold">12h 48m</p>
              </div>
            </div>
          </div>

          {/* Moon */}
          <div
            className="rounded-xl border border-amber-500/30 bg-card p-5 shadow-md"
            data-ocid="moon-position-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌙</span>
              <h3 className="font-heading text-lg font-semibold gold-text">
                Moon Position
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Sign</p>
                <p className="font-semibold">Capricorn</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Degrees</p>
                <p className="font-semibold font-mono">24.11°</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Nakshatra</p>
                <p className="font-semibold">Dhanishtha</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Pada</p>
                <p className="font-semibold">Pada 1</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1.5">
                <span>🌙</span>
                <div>
                  <p className="text-[10px] text-muted-foreground">Moonrise</p>
                  <p className="font-semibold font-mono">02:49</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🌒</span>
                <div>
                  <p className="text-[10px] text-muted-foreground">Moonset</p>
                  <p className="font-semibold font-mono">13:35</p>
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] text-muted-foreground">Moon Phase</p>
                <p className="font-semibold">Waning Crescent</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5. Tithi Progress ── */}
        <div
          className="rounded-xl border border-amber-500/30 bg-card p-5 shadow-md"
          data-ocid="tithi-progress"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h3 className="font-heading text-lg font-semibold gold-text">
                Current Tithi — Dashami
              </h3>
              <p className="text-sm text-muted-foreground">
                Day 10 of 15 (Krishna Paksha)
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-medium saffron-text">
              Moderate / Variable energy
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Lunar Month Progress</span>
              <span className="font-semibold gold-text">67%</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full saffron-gradient transition-all"
                style={{ width: "67%" }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Shukla Paksha 1</span>
              <span>Amavasya</span>
            </div>
          </div>
        </div>

        {/* ── 6. Moon Visualization ── */}
        <div
          className="rounded-xl border border-amber-500/30 bg-card p-5 shadow-md"
          data-ocid="moon-visualization"
        >
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-heading text-lg font-semibold gold-text">
              Moon Visualization
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 text-xs font-medium">
              Below Horizon
            </span>
          </div>
          <div className="flex justify-center">
            <CrescentMoon />
          </div>
        </div>

        {/* ── 7. Sun & Moon Timeline ── */}
        <SunMoonTimeline nowMinutes={nowMinutes} />

        {/* ── 8. Location Information ── */}
        <div className="rounded-xl border border-amber-500/30 bg-muted/40 p-5">
          <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Location Information
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="font-semibold font-mono">2026-04-12</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Reference Time</p>
              <p className="font-semibold font-mono">16:42</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-semibold">Mohali, Punjab, India</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Coordinates</p>
              <p className="font-semibold font-mono">30.70, 76.72</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
