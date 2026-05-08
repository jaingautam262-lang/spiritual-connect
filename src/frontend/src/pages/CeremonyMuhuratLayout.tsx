import { useMemo, useState } from "react";
import {
  CEREMONY_CITIES,
  CEREMONY_CITY_OFFSETS,
  CEREMONY_DATA,
  type CeremonyInterval,
} from "../data/ceremonyMuhuratData";
import { useLanguage } from "../hooks/useLanguage";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface CeremonyMuhuratLayoutProps {
  ceremonySlug: string;
}

type ClockMode = "12h" | "24h";
type ViewMonth = "may" | "june";

// ── Time utilities ─────────────────────────────────────────────────────────────

/** Parse "07:24 AM" format to total minutes */
function parseTime12h(timeStr: string): number {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;
  let h = Number.parseInt(match[1], 10);
  const m = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "AM" && h === 12) h = 0;
  if (period === "PM" && h !== 12) h += 12;
  return h * 60 + m;
}

/** Format total minutes to 12h string: "07:24 AM" */
function toDisplay12h(totalMins: number): string {
  const normalized = ((totalMins % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  const period = h < 12 ? "AM" : "PM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

/** Format total minutes to 24h string: "07:24" */
function toDisplay24h(totalMins: number): string {
  const normalized = ((totalMins % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Adjust a "07:24 AM"-format time string by offsetMinutes.
 * Returns in same "07:24 AM" format.
 */
export function adjustTime(timeStr: string, offsetMinutes: number): string {
  if (offsetMinutes === 0) return timeStr;
  const mins = parseTime12h(timeStr);
  return toDisplay12h(mins + offsetMinutes);
}

function formatTime(
  timeStr: string,
  mode: ClockMode,
  offsetMinutes: number,
): string {
  const adjusted = adjustTime(timeStr, offsetMinutes);
  if (mode === "12h") return adjusted;
  const mins = parseTime12h(adjusted);
  return toDisplay24h(mins);
}

// ── Quality config ─────────────────────────────────────────────────────────────────

const QUALITY = {
  auspicious: {
    en: "Auspicious",
    hi: "शुभ",
    bg: "oklch(0.22 0.10 145 / 0.35)",
    border: "oklch(0.55 0.18 145 / 0.6)",
    text: "oklch(0.75 0.18 145)",
    dot: "oklch(0.65 0.20 145)",
    icon: "✔",
  },
  mixed: {
    en: "Mixed",
    hi: "मिश्रित",
    bg: "oklch(0.26 0.10 75 / 0.25)",
    border: "oklch(0.62 0.18 75 / 0.45)",
    text: "oklch(0.78 0.16 78)",
    dot: "oklch(0.68 0.20 75)",
    icon: "~",
  },
  inauspicious: {
    en: "Inauspicious",
    hi: "अशुभ",
    bg: "oklch(0.22 0.12 20 / 0.30)",
    border: "oklch(0.52 0.18 20 / 0.5)",
    text: "oklch(0.75 0.16 22)",
    dot: "oklch(0.62 0.20 20)",
    icon: "✕",
  },
} as const;

// ── Sub-components ─────────────────────────────────────────────────────────────────

function QualityBadge({
  q,
  hi,
}: { q: CeremonyInterval["quality"]; hi: boolean }) {
  const cfg = QUALITY[q];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border"
      style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}
    >
      <span>{cfg.icon}</span>
      {hi ? cfg.hi : cfg.en}
    </span>
  );
}

function QualityLegend({ hi }: { hi: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(["auspicious", "mixed", "inauspicious"] as const).map((q) => {
        const cfg = QUALITY[q];
        return (
          <span
            key={q}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border"
            style={{
              background: cfg.bg,
              borderColor: cfg.border,
              color: cfg.text,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: cfg.dot }}
            />
            {hi ? cfg.hi : cfg.en}
          </span>
        );
      })}
    </div>
  );
}

function IntervalCard({
  interval,
  index,
  clockMode,
  offsetMinutes,
  hi,
}: {
  interval: CeremonyInterval;
  index: number;
  clockMode: ClockMode;
  offsetMinutes: number;
  hi: boolean;
}) {
  const cfg = QUALITY[interval.quality];
  const begins = formatTime(interval.beginsAt, clockMode, offsetMinutes);
  const ends = formatTime(interval.endsAt, clockMode, offsetMinutes);

  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ borderColor: cfg.border, background: cfg.bg }}
      data-ocid={`ceremony.interval.item.${index}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 px-4 py-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="font-heading font-bold text-sm"
              style={{ color: "oklch(0.88 0.06 65)" }}
            >
              {interval.date}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{
                background: "oklch(0.22 0.06 24)",
                borderColor: "oklch(0.30 0.08 28)",
                color: "oklch(0.62 0.04 55)",
              }}
            >
              {hi ? interval.dayOfWeekHindi : interval.dayOfWeek}
            </span>
          </div>
          {/* Time row */}
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col">
              <span
                className="text-xs mb-0.5"
                style={{ color: "oklch(0.52 0.05 50)" }}
              >
                {hi ? "शुरू" : "Begins"}
              </span>
              <span
                className="font-mono font-semibold text-sm"
                style={{ color: cfg.text }}
              >
                {begins}
              </span>
            </div>
            <div
              className="self-end text-xs pb-0.5"
              style={{ color: "oklch(0.45 0.04 50)" }}
            >
              →
            </div>
            <div className="flex flex-col">
              <span
                className="text-xs mb-0.5"
                style={{ color: "oklch(0.52 0.05 50)" }}
              >
                {hi ? "समाप्त" : "Ends"}
              </span>
              <span
                className="font-mono font-semibold text-sm"
                style={{ color: cfg.text }}
              >
                {ends}
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className="text-xs mb-0.5"
                style={{ color: "oklch(0.52 0.05 50)" }}
              >
                {hi ? "अवधि" : "Duration"}
              </span>
              <span
                className="font-mono text-sm"
                style={{ color: "oklch(0.72 0.10 60)" }}
              >
                {interval.duration}
              </span>
            </div>
          </div>
        </div>
        <QualityBadge q={interval.quality} hi={hi} />
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-4 pb-4">
        {[
          {
            label: hi ? "लग्न" : "Lagna",
            value: hi ? interval.lagnaHindi : interval.lagna,
            icon: "♌",
          },
          {
            label: hi ? "तिथि" : "Tithi",
            value: hi ? interval.tithiHindi : interval.tithi,
            icon: "🌙",
          },
          {
            label: hi ? "होरा" : "Hora",
            value: hi ? interval.horaHindi : interval.hora,
            icon: "☉",
          },
          {
            label: hi ? "नक्षत्र" : "Nakshatra",
            value: hi ? interval.nakshatraHindi : interval.nakshatra,
            icon: "⭐",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-2.5 border"
            style={{
              background: "oklch(0.16 0.05 22)",
              borderColor: "oklch(0.26 0.07 28)",
            }}
          >
            <p
              className="text-xs mb-0.5"
              style={{ color: "oklch(0.52 0.05 50)" }}
            >
              {item.icon} {item.label}
            </p>
            <p
              className="font-heading font-semibold text-sm truncate"
              style={{ color: "oklch(0.82 0.10 70)" }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pros/Cons if any */}
      {(interval.pros || interval.cons) && (
        <div className="px-4 pb-4 space-y-2">
          {interval.pros && (
            <div
              className="rounded-xl px-3 py-2 text-xs border"
              style={{
                background: "oklch(0.22 0.10 145 / 0.12)",
                borderColor: "oklch(0.55 0.18 145 / 0.30)",
                color: "oklch(0.75 0.12 145)",
              }}
            >
              ✔ {hi ? (interval.prosHindi ?? interval.pros) : interval.pros}
            </div>
          )}
          {interval.cons && (
            <div
              className="rounded-xl px-3 py-2 text-xs border"
              style={{
                background: "oklch(0.22 0.12 20 / 0.12)",
                borderColor: "oklch(0.52 0.18 20 / 0.30)",
                color: "oklch(0.75 0.12 22)",
              }}
            >
              ✕ {hi ? (interval.consHindi ?? interval.cons) : interval.cons}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RulesAccordion({
  ceremony,
  hi,
}: {
  ceremony: (typeof CEREMONY_DATA)[string];
  hi: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rules = ceremony.rules;
  const sections = [
    {
      key: "nakshatra",
      en: "\u2b50 Nakshatra Rules",
      hi: "\u2b50 \u0928\u0915\u094d\u0937\u0924\u094d\u0930 \u0928\u093f\u092f\u092e",
      text: hi ? rules.nakshatraRulesHindi : rules.nakshatraRules,
    },
    {
      key: "tithi",
      en: "\ud83c\udf19 Tithi Rules",
      hi: "\ud83c\udf19 \u0924\u093f\u0925\u093f \u0928\u093f\u092f\u092e",
      text: hi ? rules.tithiRulesHindi : rules.tithiRules,
    },
    {
      key: "day",
      en: "\ud83d\udcc5 Day Rules",
      hi: "\ud83d\udcc5 \u0935\u093e\u0930 \u0928\u093f\u092f\u092e",
      text: hi ? rules.dayRulesHindi : rules.dayRules,
    },
    {
      key: "lagna",
      en: "\u264c Lagna Rules",
      hi: "\u264c \u0932\u0917\u094d\u0928 \u0928\u093f\u092f\u092e",
      text: hi ? rules.lagnaRulesHindi : rules.lagnaRules,
    },
    {
      key: "general",
      en: "\ud83d\udccc General Rules",
      hi: "\ud83d\udccc \u0938\u093e\u092e\u093e\u0928\u094d\u092f \u0928\u093f\u092f\u092e",
      text: hi ? rules.generalRulesHindi : rules.generalRules,
    },
    {
      key: "notes",
      en: "\ud83d\udcdd Notes",
      hi: "\ud83d\udcdd \u0928\u094b\u091f\u094d\u0938",
      text: hi ? rules.notesHindi : rules.notes,
    },
  ].filter((s) => !!s.text);

  return (
    <section
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "oklch(0.28 0.08 30)" }}
      data-ocid="ceremony.rules.section"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:opacity-90"
        style={{
          background: open ? "oklch(0.22 0.09 25)" : "oklch(0.18 0.07 22)",
        }}
        onClick={() => setOpen((v) => !v)}
        data-ocid="ceremony.rules.toggle"
      >
        <div>
          <h2
            className="font-heading font-bold text-lg"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? "\ud83d\udcdc \u0935\u093f\u0927\u093f-\u0935\u093f\u0927\u093e\u0928 \u0914\u0930 \u0928\u093f\u092f\u092e"
              : "\ud83d\udcdc Rules & Guidelines"}
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            {hi
              ? "\u092e\u0941\u0939\u0942\u0930\u094d\u0924 \u0939\u0947\u0924\u0941 \u0935\u0948\u0926\u093f\u0915 \u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924"
              : "Vedic principles for auspicious timing"}
          </p>
        </div>
        <span
          className="text-xl transition-transform duration-200"
          style={{
            color: "oklch(0.68 0.20 48)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          \u25be
        </span>
      </button>

      {open && (
        <div
          className="px-6 pb-8 pt-4 space-y-5"
          style={{ background: "oklch(0.15 0.05 20)" }}
        >
          {sections.map((s) => (
            <div key={s.key}>
              <h4
                className="font-heading font-semibold text-sm mb-1.5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {hi ? s.hi : s.en}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0.04 55)" }}
              >
                {s.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ── Main layout ────────────────────────────────────────────────────────────────────

export function CeremonyMuhuratLayout({
  ceremonySlug,
}: CeremonyMuhuratLayoutProps) {
  const { language } = useLanguage();
  const hi = language === "hi";

  const ceremony = CEREMONY_DATA[ceremonySlug];

  const [clockMode, setClockMode] = useState<ClockMode>("12h");
  const [city, setCity] = useState("New Delhi");
  const [viewMonth, setViewMonth] = useState<ViewMonth>("may");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const offsetMinutes = CEREMONY_CITY_OFFSETS[city] ?? 0;

  const intervals = useMemo(() => {
    return viewMonth === "may" ? ceremony.mayIntervals : ceremony.juneIntervals;
  }, [ceremony, viewMonth]);

  // Get unique dates for date nav
  const uniqueDates = useMemo(() => {
    const seen = new Set<string>();
    return intervals
      .filter((iv) => {
        if (seen.has(iv.dateISO)) return false;
        seen.add(iv.dateISO);
        return true;
      })
      .map((iv) => ({ iso: iv.dateISO, display: iv.date }));
  }, [intervals]);

  const filteredIntervals = useMemo(() => {
    if (!selectedDate) return intervals;
    return intervals.filter((iv) => iv.dateISO === selectedDate);
  }, [intervals, selectedDate]);

  if (!ceremony) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.14 0.04 20)" }}
      >
        <p style={{ color: "oklch(0.65 0.04 55)" }}>
          Ceremony not found: {ceremonySlug}
        </p>
      </div>
    );
  }

  const titleHi = ceremony.nameHindi;
  const titleEn = ceremony.nameEnglish;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.06 22) 0%, oklch(0.12 0.04 20) 100%)",
      }}
      data-ocid="ceremony.page"
    >
      {/* ── Hero Banner ── */}
      <section
        className="relative py-10 px-4 text-center border-b overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.18 0.07 26) 100%)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
        data-ocid="ceremony.hero.section"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, oklch(0.78 0.14 75 / 0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-4xl mb-3">{ceremony.icon}</div>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-4"
            style={{
              background: "oklch(0.78 0.14 75 / 0.08)",
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            📍 {city}, India
          </div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-1"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {hi ? titleHi : titleEn}
          </h1>
          {!hi && (
            <p
              className="font-heading text-lg md:text-xl font-semibold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {titleHi}
            </p>
          )}
          {/* Quality legend */}
          <div className="flex justify-center mt-4">
            <QualityLegend hi={hi} />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* ── Controls bar ── */}
        <div
          className="rounded-2xl p-5 border space-y-4"
          style={{
            background: "oklch(0.19 0.07 24)",
            borderColor: "oklch(0.32 0.10 35)",
          }}
          data-ocid="ceremony.controls.panel"
        >
          {/* Clock toggle + City */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Clock */}
            <div className="flex items-center gap-1">
              {(["12h", "24h"] as ClockMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setClockMode(m)}
                  data-ocid={`ceremony.clock_${m}_button`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 ${
                    clockMode === m
                      ? "border-amber-500/60"
                      : "border-transparent hover:border-amber-500/30"
                  }`}
                  style={{
                    background:
                      clockMode === m
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.16 0.06 22)",
                    color: clockMode === m ? "white" : "oklch(0.68 0.08 55)",
                  }}
                >
                  {m === "12h"
                    ? hi
                      ? "12 घंटे"
                      : "12 Hour"
                    : hi
                      ? "24 घंटे"
                      : "24 Hour"}
                </button>
              ))}
            </div>

            {/* City */}
            <div className="flex-1 min-w-48">
              <label htmlFor="ceremony-city-select" className="sr-only">
                {hi ? "शहर" : "City"}
              </label>
              <select
                id="ceremony-city-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl px-3 py-2 text-sm border outline-none cursor-pointer"
                style={{
                  background: "oklch(0.16 0.06 22)",
                  borderColor: "oklch(0.38 0.12 40)",
                  color: "oklch(0.88 0.06 65)",
                }}
                data-ocid="ceremony.city.select"
              >
                {CEREMONY_CITIES.map((c) => (
                  <option
                    key={c}
                    value={c}
                    style={{
                      background: "oklch(0.16 0.06 22)",
                      color: "oklch(0.88 0.06 65)",
                    }}
                  >
                    📍 {c}
                    {c !== "New Delhi" ? " (India)" : ", India"}
                  </option>
                ))}
              </select>
            </div>

            {offsetMinutes !== 0 && (
              <span
                className="text-xs px-3 py-1.5 rounded-full border"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.12)",
                  borderColor: "oklch(0.68 0.20 48 / 0.35)",
                  color: "oklch(0.80 0.16 60)",
                }}
              >
                {offsetMinutes > 0 ? "+" : ""}
                {offsetMinutes}
                {hi ? " मिनट" : " min"}
              </span>
            )}
          </div>

          {/* Month tabs */}
          <div
            className="flex items-center gap-0 border rounded-xl overflow-hidden w-fit"
            style={{ borderColor: "oklch(0.32 0.10 40)" }}
            data-ocid="ceremony.month_nav"
          >
            <button
              type="button"
              onClick={() => {
                setViewMonth("may");
                setSelectedDate(null);
              }}
              data-ocid="ceremony.may_tab"
              className="px-5 py-2 text-sm font-semibold border-r transition-colors"
              style={{
                borderColor: "oklch(0.32 0.10 40)",
                background:
                  viewMonth === "may"
                    ? "oklch(0.68 0.20 48)"
                    : "oklch(0.16 0.06 22)",
                color: viewMonth === "may" ? "white" : "oklch(0.68 0.08 55)",
              }}
            >
              {hi ? "मई 2026" : "May 2026"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (ceremony.hasJuneData) {
                  setViewMonth("june");
                  setSelectedDate(null);
                }
              }}
              data-ocid="ceremony.june_tab"
              className="px-5 py-2 text-sm font-semibold transition-colors"
              style={{
                background:
                  viewMonth === "june"
                    ? "oklch(0.68 0.20 48)"
                    : "oklch(0.16 0.06 22)",
                color: ceremony.hasJuneData
                  ? viewMonth === "june"
                    ? "white"
                    : "oklch(0.68 0.08 55)"
                  : "oklch(0.38 0.04 50)",
                cursor: ceremony.hasJuneData ? "pointer" : "not-allowed",
              }}
              disabled={!ceremony.hasJuneData}
            >
              {hi ? "जून 2026" : "June 2026"}
              {!ceremony.hasJuneData && (
                <span className="ml-1 text-xs opacity-60">
                  {hi ? "(नहीं)" : "(n/a)"}
                </span>
              )}
            </button>
          </div>

          {/* Date navigation */}
          {uniqueDates.length > 0 && (
            <div className="flex flex-wrap gap-2" data-ocid="ceremony.date_nav">
              <button
                type="button"
                onClick={() => setSelectedDate(null)}
                data-ocid="ceremony.date_all_button"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                style={{
                  background: !selectedDate
                    ? "oklch(0.68 0.20 48)"
                    : "oklch(0.16 0.06 22)",
                  borderColor: !selectedDate
                    ? "oklch(0.68 0.20 48)"
                    : "oklch(0.32 0.08 40)",
                  color: !selectedDate ? "white" : "oklch(0.68 0.08 55)",
                }}
              >
                {hi ? "सभी" : "All"}
              </button>
              {uniqueDates.map((d) => (
                <button
                  key={d.iso}
                  type="button"
                  onClick={() =>
                    setSelectedDate(selectedDate === d.iso ? null : d.iso)
                  }
                  data-ocid={`ceremony.date.${d.iso}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all"
                  style={{
                    background:
                      selectedDate === d.iso
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.16 0.06 22)",
                    borderColor:
                      selectedDate === d.iso
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.32 0.08 40)",
                    color:
                      selectedDate === d.iso ? "white" : "oklch(0.68 0.08 55)",
                  }}
                >
                  {d.display.split(",")[0]}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Interval cards ── */}
        <div data-ocid="ceremony.intervals.section">
          <h2
            className="font-heading font-bold text-base mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? `शुभ मुहूर्त — ${viewMonth === "may" ? "मई 2026" : "जून 2026"}`
              : `Shubh Muhurat — ${viewMonth === "may" ? "May 2026" : "June 2026"}`}
          </h2>

          {filteredIntervals.length === 0 ? (
            <div
              className="rounded-2xl p-10 text-center border"
              style={{
                background: "oklch(0.18 0.06 20)",
                borderColor: "oklch(0.30 0.08 22)",
              }}
              data-ocid="ceremony.intervals.empty_state"
            >
              <div className="text-4xl mb-3">🌙</div>
              <p
                className="font-heading font-semibold"
                style={{ color: "oklch(0.68 0.08 55)" }}
              >
                {hi
                  ? "इस माह में कोई शुभ मुहूर्त नहीं"
                  : "No muhurat windows found for this selection"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredIntervals.map((iv, i) => (
                <IntervalCard
                  key={`${iv.dateISO}-${iv.beginsAt}-${i}`}
                  interval={iv}
                  index={i + 1}
                  clockMode={clockMode}
                  offsetMinutes={offsetMinutes}
                  hi={hi}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Description section ── */}
        <section
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.17 0.06 22)",
            borderColor: "oklch(0.28 0.08 28)",
          }}
          data-ocid="ceremony.description.section"
        >
          <h3
            className="font-heading font-bold text-base mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? `📖 ${ceremony.nameHindi} के बारे में`
              : `📖 About ${ceremony.nameEnglish.replace(" Muhurat 2026", "")}`}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.68 0.04 58)" }}
          >
            {hi ? ceremony.descriptionHindi : ceremony.descriptionEnglish}
          </p>
        </section>

        {/* ── Rules accordion ── */}
        <RulesAccordion ceremony={ceremony} hi={hi} />

        {/* ── Footer note ── */}
        <div
          className="text-center pb-4 text-xs"
          style={{ color: "oklch(0.42 0.04 50)" }}
        >
          {hi
            ? "* सभी समय नई दिल्ली, भारत (आईएसटी, UTC+5:30) के लिए हैं। अन्य शहरों के लिए सूर्योदय से समायोजित। व्यक्तिगत मार्गदर्शन के लिए योग्य ज्योतिषी से परामर्श करें।"
            : "* All timings are for New Delhi, India (IST, UTC+5:30). Timings for other cities are sunrise-adjusted. Consult a qualified Jyotishi for personalized guidance."}
        </div>
      </div>
    </div>
  );
}

export default CeremonyMuhuratLayout;
