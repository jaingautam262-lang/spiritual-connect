import { useMemo, useState } from "react";
import type { MonthData, MuhuratDay } from "../data/vivahMuhurat2026Data";
import {
  CITIES_LIST,
  CITY_STATE_LABELS,
  CITY_SUNRISE_OFFSETS,
  TOTAL_AUSPICIOUS_DAYS_2026,
  VIVAH_MUHURAT_2026,
  adjustTimeByOffset,
} from "../data/vivahMuhurat2026Data";

// ── Quality config ────────────────────────────────────────────────────────────

const QUALITY_CONFIG = {
  excellent: {
    label: "Uttam",
    labelEn: "Excellent",
    bg: "oklch(0.22 0.10 145 / 0.35)",
    border: "oklch(0.55 0.18 145 / 0.6)",
    text: "oklch(0.75 0.18 145)",
    dot: "oklch(0.65 0.20 145)",
    icon: "✦",
  },
  good: {
    label: "Shubh",
    labelEn: "Good",
    bg: "oklch(0.24 0.08 75 / 0.30)",
    border: "oklch(0.60 0.16 75 / 0.5)",
    text: "oklch(0.80 0.16 75)",
    dot: "oklch(0.72 0.17 75)",
    icon: "✓",
  },
  moderate: {
    label: "Madhyam",
    labelEn: "Moderate",
    bg: "oklch(0.26 0.10 48 / 0.25)",
    border: "oklch(0.62 0.18 48 / 0.45)",
    text: "oklch(0.78 0.16 55)",
    dot: "oklch(0.68 0.20 48)",
    icon: "~",
  },
};

const DAY_SHORT: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

const MONTH_SHORT: Record<string, string> = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

// ── Quality Badge ─────────────────────────────────────────────────────────────

function QualityBadge({
  quality,
}: { quality: "excellent" | "good" | "moderate" }) {
  const cfg = QUALITY_CONFIG[quality];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border"
      style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}
    >
      <span>{cfg.icon}</span>
      {cfg.label} · {cfg.labelEn}
    </span>
  );
}

// ── Day Card ──────────────────────────────────────────────────────────────────

function DayCard({
  day,
  index,
  isExpanded,
  onToggle,
}: {
  day: MuhuratDay;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const quality = day.quality ?? "good";
  const cfg = QUALITY_CONFIG[quality];
  const dateNum = day.date.split("-")[2];
  const monthStr = day.dateDisplay.split(" ")[0];
  const monthShort = MONTH_SHORT[monthStr] ?? monthStr.slice(0, 3);

  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{
        borderColor: isExpanded ? cfg.border : "oklch(0.28 0.08 30)",
        background: isExpanded ? cfg.bg : "oklch(0.17 0.05 22)",
      }}
      data-ocid={`vivah.day.item.${index}`}
    >
      <button
        type="button"
        className="w-full flex items-center gap-4 px-4 py-4 text-left hover:opacity-90 transition-opacity"
        onClick={onToggle}
        data-ocid={`vivah.day.toggle.${index}`}
        aria-expanded={isExpanded}
      >
        {/* Date badge */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center border"
          style={{
            background: "oklch(0.68 0.20 48 / 0.15)",
            borderColor: "oklch(0.68 0.20 48 / 0.40)",
          }}
        >
          <span
            className="font-heading font-bold text-xl leading-none"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {dateNum}
          </span>
          <span
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.06 55)" }}
          >
            {monthShort}
          </span>
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="font-heading font-bold text-sm"
              style={{ color: "oklch(0.88 0.06 65)" }}
            >
              {day.dateDisplay}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full border"
              style={{
                background: "oklch(0.22 0.06 24)",
                borderColor: "oklch(0.30 0.08 28)",
                color: "oklch(0.62 0.04 55)",
              }}
            >
              {DAY_SHORT[day.day] ?? day.day}
            </span>
          </div>
          <div
            className="flex items-center gap-3 flex-wrap text-xs"
            style={{ color: "oklch(0.60 0.04 55)" }}
          >
            <span>🌟 {day.nakshatra}</span>
            <span>📅 {day.tithi}</span>
            {day.muhuratStart && day.muhuratEnd && (
              <span style={{ color: "oklch(0.68 0.20 48)" }}>
                ⏰ {day.muhuratStart} – {day.muhuratEnd}
              </span>
            )}
          </div>
        </div>

        {/* Quality badge + expand arrow */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <QualityBadge quality={quality} />
          <span
            className="text-sm transition-transform duration-200"
            style={{
              color: "oklch(0.68 0.20 48)",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▾
          </span>
        </div>
      </button>

      {/* Expanded details */}
      {isExpanded && (
        <div
          className="px-5 pb-5 pt-1 space-y-3 border-t"
          style={{ borderColor: cfg.border }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
            {[
              { label: "Nakshatra", value: day.nakshatra, icon: "🌟" },
              { label: "Tithi", value: day.tithi, icon: "🌙" },
              { label: "Vara", value: day.day, icon: "📆" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-3 border"
                style={{
                  background: "oklch(0.16 0.05 22)",
                  borderColor: "oklch(0.26 0.07 28)",
                }}
              >
                <p
                  className="text-xs mb-1"
                  style={{ color: "oklch(0.52 0.05 50)" }}
                >
                  {item.icon} {item.label}
                </p>
                <p
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.82 0.10 70)" }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {day.muhuratStart && day.muhuratEnd && (
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "oklch(0.68 0.20 48 / 0.08)",
                borderColor: "oklch(0.68 0.20 48 / 0.35)",
              }}
            >
              <p
                className="text-xs font-semibold mb-2"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                ⏰ Shubh Muhurat Window
              </p>
              <p
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.88 0.06 65)" }}
              >
                {day.muhuratStart} – {day.muhuratEnd}
              </p>
            </div>
          )}

          {day.lagnaTime && (
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "oklch(0.16 0.05 22)",
                borderColor: "oklch(0.26 0.07 28)",
              }}
            >
              <p
                className="text-xs font-semibold mb-1"
                style={{ color: "oklch(0.55 0.06 55)" }}
              >
                ♈ Lagna (Rising Sign)
              </p>
              <p className="text-sm" style={{ color: "oklch(0.78 0.14 75)" }}>
                {day.lagnaTime}
              </p>
            </div>
          )}

          {day.notes && (
            <div
              className="rounded-xl px-4 py-3 border text-sm"
              style={{
                background: "oklch(0.78 0.14 75 / 0.07)",
                borderColor: "oklch(0.78 0.14 75 / 0.20)",
                color: "oklch(0.72 0.08 62)",
              }}
            >
              📝 {day.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── No Dates Banner ───────────────────────────────────────────────────────────

function NoDatesBanner({ month }: { month: MonthData }) {
  return (
    <div
      className="rounded-2xl p-8 text-center border"
      style={{
        background: "oklch(0.18 0.06 20)",
        borderColor: "oklch(0.30 0.08 22)",
      }}
      data-ocid="vivah.no_dates.empty_state"
    >
      <div className="text-5xl mb-4">🚫</div>
      <h3
        className="font-heading font-bold text-xl mb-2"
        style={{ color: "oklch(0.78 0.10 40)" }}
      >
        No Shubh Vivah Dates in {month.month}
      </h3>
      <p
        className="text-sm leading-relaxed max-w-lg mx-auto"
        style={{ color: "oklch(0.58 0.04 50)" }}
      >
        {month.inauspiciousReason}
      </p>
    </div>
  );
}

// ── Month Summary Card ────────────────────────────────────────────────────────

function MonthSummaryCard({ month }: { month: MonthData }) {
  if (!month.hasAuspiciousDays) return null;
  const excellent = month.days.filter((d) => d.quality === "excellent").length;
  const good = month.days.filter((d) => d.quality === "good").length;
  const moderate = month.days.filter((d) => d.quality === "moderate").length;

  return (
    <div
      className="rounded-2xl p-5 border mb-6"
      style={{
        background: "oklch(0.20 0.07 22)",
        borderColor: "oklch(0.32 0.10 35)",
      }}
      data-ocid="vivah.month.summary_card"
    >
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h3
            className="font-heading font-bold text-lg"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {month.month} 2026 — {month.monthHindi}
          </h3>
          <p className="text-sm" style={{ color: "oklch(0.58 0.04 50)" }}>
            {month.auspiciousCount} Shubh Vivah{" "}
            {month.auspiciousCount === 1 ? "Date" : "Dates"}
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border"
          style={{
            background: "oklch(0.68 0.20 48 / 0.12)",
            borderColor: "oklch(0.68 0.20 48 / 0.35)",
          }}
        >
          <span className="text-xl">💍</span>
          <span
            className="font-bold text-lg"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {month.auspiciousCount}
          </span>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        {excellent > 0 && (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{
              background: "oklch(0.22 0.10 145 / 0.30)",
              borderColor: "oklch(0.55 0.18 145 / 0.50)",
              color: "oklch(0.75 0.18 145)",
            }}
          >
            ✦ {excellent} Uttam
          </span>
        )}
        {good > 0 && (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{
              background: "oklch(0.24 0.08 75 / 0.25)",
              borderColor: "oklch(0.60 0.16 75 / 0.45)",
              color: "oklch(0.80 0.16 75)",
            }}
          >
            ✓ {good} Shubh
          </span>
        )}
        {moderate > 0 && (
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
            style={{
              background: "oklch(0.26 0.10 48 / 0.20)",
              borderColor: "oklch(0.62 0.18 48 / 0.40)",
              color: "oklch(0.78 0.16 55)",
            }}
          >
            ~ {moderate} Madhyam
          </span>
        )}
      </div>
    </div>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "oklch(0.28 0.08 30)" }}
      data-ocid="vivah.about.section"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:opacity-90"
        style={{
          background: expanded ? "oklch(0.22 0.09 25)" : "oklch(0.18 0.07 22)",
        }}
        onClick={() => setExpanded((v) => !v)}
        data-ocid="vivah.about.toggle"
      >
        <div>
          <h2
            className="font-heading font-bold text-lg"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📖 About Vivah Muhurat
          </h2>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            How Hindu marriage muhurat is calculated
          </p>
        </div>
        <span
          className="text-xl transition-transform duration-200"
          style={{
            color: "oklch(0.68 0.20 48)",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▾
        </span>
      </button>

      {expanded && (
        <div
          className="px-6 pb-8 pt-5 space-y-6 text-sm leading-relaxed"
          style={{
            background: "oklch(0.15 0.05 20)",
            color: "oklch(0.68 0.04 58)",
          }}
        >
          {[
            {
              title: "The Five Vedic Pillars of Vivah Muhurat",
              emoji: "🏛️",
              content:
                "A Vivah Muhurat is determined by five key factors from the Panchang: (1) Tithi (lunar day) — Dwitiya, Tritiya, Panchami, Saptami, Dashami, Dwadashi and Trayodashi are auspicious; (2) Nakshatra (lunar mansion) — Rohini, Mrigashira, Mula, Uttara Phalguni, Uttara Ashadha, Uttara Bhadrapada, Anuradha, Hasta, and Swati are favorable; (3) Vara (weekday) — Monday, Wednesday, Thursday, and Friday are auspicious for marriage; (4) Lagna (rising sign) — fixed Lagnas like Taurus and Leo are preferred; (5) Yoga — auspicious yogas like Siddhi and Amrita increase the Muhurat quality.",
            },
            {
              title: "Shukra Tara Asta — Venus Combust",
              emoji: "✨",
              content:
                "When Venus (Shukra) comes too close to the Sun and becomes invisible, it is called Shukra Tara Asta or Venus combust. Venus governs love, beauty, and marital happiness. During this period, Hindu tradition considers marriages inauspicious as the planet ruling conjugal bliss is weakened. Marriages are avoided until Venus re-emerges in the sky.",
            },
            {
              title: "Guru Tara Asta — Jupiter Combust",
              emoji: "🪐",
              content:
                "Similarly, when Jupiter (Guru or Brihaspati) becomes combust, it is called Guru Tara Asta. Jupiter is the karaka (significator) of husband in a woman's chart, and its strength is essential for a prosperous married life. Marriage during Jupiter's combust period is believed to diminish the blessings of the ceremony.",
            },
            {
              title: "Kharmas — Sun in Sagittarius or Pisces",
              emoji: "☀️",
              content:
                "Kharmas occurs when the Sun transits through Sagittarius (Dhanur) or Pisces (Meena) Rashi. These months — roughly mid-December to mid-January and mid-March to mid-April — are considered inauspicious for all Manglik activities including marriages. The solar energy is believed to be in a transitional state, making auspicious ceremonies less effective.",
            },
            {
              title: "Chaturmas — The Four Sacred Months",
              emoji: "🛌",
              content:
                "Chaturmas literally means 'four months.' Beginning with Dev Shayani Ekadashi (usually in July) when Lord Vishnu enters his cosmic sleep, and ending with Dev Uthani Ekadashi (usually in November) when he awakens, all Manglik works including marriages are suspended for four months. This is observed from Ashadha Shukla Ekadashi to Kartik Shukla Ekadashi.",
            },
            {
              title: "Dev Uthani Ekadashi — Marriages Resume",
              emoji: "🎉",
              content:
                "Dev Uthani Ekadashi (also called Prabodhini Ekadashi or Devotthan Ekadashi) marks Lord Vishnu's awakening from his four-month cosmic sleep. From this day, all auspicious activities including marriages resume. It falls on Kartik Shukla Ekadashi — typically in November. The marriage season picks up immediately with a flurry of ceremonies in November and December.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h4
                className="font-heading font-semibold mb-2 flex items-center gap-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                <span>{item.emoji}</span>
                {item.title}
              </h4>
              <p>{item.content}</p>
            </div>
          ))}

          <div
            className="rounded-xl p-4 border text-xs mt-2"
            style={{
              background: "oklch(0.18 0.06 22)",
              borderColor: "oklch(0.30 0.08 28)",
              color: "oklch(0.52 0.04 50)",
            }}
          >
            ⚠️ All timings are in IST (UTC+5:30) for New Delhi, India. These
            dates are calculated using traditional Vedic Panchang principles.
            Consult a qualified Jyotishi (Vedic astrologer) for personalized
            guidance specific to the couple's horoscope and Kundali Milaan
            (horoscope matching).
          </div>
        </div>
      )}
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const MONTHS = VIVAH_MUHURAT_2026.map((m) => m.month);

function applyOffsetToDay(day: MuhuratDay, offset: number): MuhuratDay {
  if (offset === 0) return day;
  const adjustTime = (t?: string) => (t ? adjustTimeByOffset(t, offset) : t);
  // Adjust lagnaTime — it may contain multiple time ranges separated by " · "
  const adjustLagna = (lagna?: string) => {
    if (!lagna || offset === 0) return lagna;
    return lagna.replace(/(\d{1,2}:\d{2}\s*(?:AM|PM))/gi, (m) =>
      adjustTimeByOffset(m.trim(), offset),
    );
  };
  return {
    ...day,
    muhuratStart: adjustTime(day.muhuratStart),
    muhuratEnd: adjustTime(day.muhuratEnd),
    lagnaTime: adjustLagna(day.lagnaTime),
  };
}

function CitySelector({
  selectedCity,
  onChange,
}: { selectedCity: string; onChange: (city: string) => void }) {
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{
        background: "oklch(0.19 0.07 24)",
        borderColor: "oklch(0.32 0.10 35)",
      }}
      data-ocid="vivah.city.selector_panel"
    >
      <label
        htmlFor="vivah-city-select"
        className="block text-xs font-semibold uppercase tracking-wider mb-2"
        style={{ color: "oklch(0.68 0.20 48)" }}
      >
        📍 Select City / State
      </label>
      <select
        id="vivah-city-select"
        value={selectedCity}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm border outline-none cursor-pointer appearance-none"
        style={{
          background: "oklch(0.16 0.06 22)",
          borderColor: "oklch(0.38 0.12 40)",
          color: "oklch(0.88 0.06 65)",
        }}
        data-ocid="vivah.city.select"
      >
        {CITIES_LIST.map((city) => (
          <option
            key={city}
            value={city}
            style={{
              background: "oklch(0.16 0.06 22)",
              color: "oklch(0.88 0.06 65)",
            }}
          >
            {city} ({CITY_STATE_LABELS[city] ?? "India"})
          </option>
        ))}
      </select>
      {selectedCity !== "New Delhi" && (
        <p
          className="mt-2.5 text-xs flex items-center gap-1.5"
          style={{ color: "oklch(0.68 0.16 70)" }}
        >
          <span>⏱</span>
          Timings adjusted for {selectedCity} — offset{" "}
          {CITY_SUNRISE_OFFSETS[selectedCity] > 0 ? "+" : ""}
          {CITY_SUNRISE_OFFSETS[selectedCity]} min from New Delhi
        </p>
      )}
    </div>
  );
}

export default function VivahMuhuratPage() {
  // Default to first month with auspicious days (February)
  const defaultMonth =
    VIVAH_MUHURAT_2026.find((m) => m.hasAuspiciousDays)?.month ?? "February";
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState("New Delhi");

  const offset = CITY_SUNRISE_OFFSETS[selectedCity] ?? 0;

  // Apply city offset to all data
  const adjustedData = useMemo(
    () =>
      VIVAH_MUHURAT_2026.map((month) => ({
        ...month,
        days: month.days.map((d) => applyOffsetToDay(d, offset)),
      })),
    [offset],
  );

  const currentMonthData = adjustedData.find((m) => m.month === selectedMonth)!;

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setExpandedDay(null);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.06 22) 0%, oklch(0.12 0.04 20) 100%)",
      }}
    >
      {/* Hero Banner */}
      <section
        className="relative py-12 px-4 text-center border-b overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.18 0.07 26) 100%)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
        data-ocid="vivah.hero.section"
      >
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, oklch(0.78 0.14 75 / 0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Location badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold mb-5"
            style={{
              background: "oklch(0.78 0.14 75 / 0.08)",
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            <span>📍</span>
            {selectedCity}, India
          </div>

          <h1
            className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            विवाह मुहूर्त 2026
          </h1>
          <h2
            className="font-heading text-xl md:text-2xl font-semibold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            2026 Vivah Muhurat
          </h2>
          <p
            className="text-sm md:text-base mb-6"
            style={{ color: "oklch(0.65 0.05 58)" }}
          >
            Shubh Marriage Dates for {selectedCity}, India · IST (UTC+5:30)
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { value: `${TOTAL_AUSPICIOUS_DAYS_2026}`, label: "Shubh Dates" },
              { value: "7", label: "Active Months" },
              { value: "5", label: "No-Muhurat Months" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-5 py-3 rounded-xl border text-center"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.10)",
                  borderColor: "oklch(0.68 0.20 48 / 0.30)",
                }}
              >
                <p
                  className="font-heading font-bold text-2xl"
                  style={{ color: "oklch(0.88 0.12 75)" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.60 0.04 55)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* City Selector */}
        <CitySelector
          selectedCity={selectedCity}
          onChange={(city) => {
            setSelectedCity(city);
            setExpandedDay(null);
          }}
        />

        {/* Month Filter */}
        <div data-ocid="vivah.month.filter">
          <p
            className="text-xs font-semibold mb-3 uppercase tracking-wider"
            style={{ color: "oklch(0.55 0.06 55)" }}
          >
            Select Month
          </p>
          <div className="flex flex-wrap gap-2">
            {MONTHS.map((month) => {
              const mData = VIVAH_MUHURAT_2026.find((m) => m.month === month)!;
              const isActive = selectedMonth === month;
              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => handleMonthChange(month)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 relative"
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                          borderColor: "oklch(0.68 0.20 48)",
                          color: "white",
                        }
                      : mData.hasAuspiciousDays
                        ? {
                            background: "oklch(0.18 0.06 22)",
                            borderColor: "oklch(0.34 0.10 40)",
                            color: "oklch(0.75 0.06 60)",
                          }
                        : {
                            background: "oklch(0.15 0.04 20)",
                            borderColor: "oklch(0.24 0.05 22)",
                            color: "oklch(0.42 0.04 50)",
                          }
                  }
                  data-ocid={`vivah.month.tab.${month.toLowerCase()}`}
                >
                  {MONTH_SHORT[month]}
                  {mData.hasAuspiciousDays && (
                    <span
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold"
                      style={{
                        background: isActive
                          ? "oklch(1 0 0 / 0.25)"
                          : "oklch(0.68 0.20 48 / 0.20)",
                        color: isActive ? "white" : "oklch(0.68 0.20 48)",
                      }}
                    >
                      {mData.auspiciousCount}
                    </span>
                  )}
                  {!mData.hasAuspiciousDays && (
                    <span
                      className="ml-1 text-xs"
                      style={{
                        color: isActive ? "white" : "oklch(0.42 0.08 20)",
                      }}
                    >
                      🚫
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Month Content */}
        <div>
          {currentMonthData.hasAuspiciousDays ? (
            <>
              <MonthSummaryCard month={currentMonthData} />
              <div className="space-y-3">
                {currentMonthData.days.map((day: MuhuratDay, i: number) => (
                  <DayCard
                    key={day.date}
                    day={day}
                    index={i + 1}
                    isExpanded={expandedDay === i}
                    onToggle={() =>
                      setExpandedDay(expandedDay === i ? null : i)
                    }
                  />
                ))}
              </div>
            </>
          ) : (
            <NoDatesBanner month={currentMonthData} />
          )}
        </div>

        {/* Inauspicious Months Overview */}
        <section
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.17 0.06 22)",
            borderColor: "oklch(0.28 0.08 28)",
          }}
          data-ocid="vivah.inauspicious.section"
        >
          <h3
            className="font-heading font-bold text-base mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📋 Inauspicious Periods in 2026
          </h3>
          <div className="space-y-3">
            {VIVAH_MUHURAT_2026.filter((m) => !m.hasAuspiciousDays).map((m) => (
              <div
                key={m.month}
                className="flex gap-3 items-start rounded-xl p-4 border"
                style={{
                  background: "oklch(0.50 0.15 20 / 0.07)",
                  borderColor: "oklch(0.50 0.15 20 / 0.25)",
                }}
                data-ocid={`vivah.inauspicious.month.${m.month.toLowerCase()}`}
              >
                <div
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold border"
                  style={{
                    background: "oklch(0.50 0.15 20 / 0.15)",
                    borderColor: "oklch(0.50 0.15 20 / 0.35)",
                    color: "oklch(0.72 0.14 28)",
                    minWidth: "72px",
                    textAlign: "center",
                  }}
                >
                  {m.month}
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.58 0.04 50)" }}
                >
                  {m.inauspiciousReason}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Footer note */}
        <div
          className="text-center pb-4 text-xs"
          style={{ color: "oklch(0.42 0.04 50)" }}
        >
          * Vivah Muhurat base timings calculated for New Delhi, India (IST,
          UTC+5:30) using Vedic Panchang. Timings for other cities are
          sunrise-adjusted approximations. Consult a qualified Jyotishi for
          Kundali Milaan and personalized guidance.
        </div>
      </div>
    </div>
  );
}
