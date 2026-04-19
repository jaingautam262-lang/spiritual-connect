import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Grade = "excellent" | "good" | "neutral" | "avoid" | "inauspicious";
type SlotGrade = "A" | "B" | "D" | "F";

interface MuhurtaSlot {
  name: string;
  nameHindi: string;
  startTime: string;
  endTime: string;
  grade: Grade;
  description: string;
}

interface TimelineSlot {
  start: string;
  end: string;
  grade: SlotGrade;
  duration: string;
  name?: string;
}

interface DayPanchang {
  date: string;
  weekday: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  masa: string;
  paksha: string;
  samvat: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
}

interface Planet {
  id: string;
  name: string;
  nameHindi: string;
  symbol: string;
  strength: number;
  color: string;
  insight: string;
}

// ─── Timeline data (73 slots for April 12, 2026) ─────────────────────────────
const TIMELINE_SLOTS: TimelineSlot[] = [
  { start: "00:00", end: "00:37", grade: "B", duration: "37m" },
  { start: "00:37", end: "01:40", grade: "B", duration: "1h 3m" },
  { start: "01:40", end: "03:21", grade: "B", duration: "1h 40m" },
  { start: "03:21", end: "04:24", grade: "B", duration: "1h 3m" },
  {
    start: "04:24",
    end: "04:46",
    grade: "A",
    duration: "21m",
    name: "Brahma Muhurta",
  },
  {
    start: "04:46",
    end: "05:12",
    grade: "A",
    duration: "26m",
    name: "Brahma Muhurta",
  },
  { start: "05:12", end: "06:09", grade: "B", duration: "56m" },
  { start: "06:09", end: "06:51", grade: "B", duration: "42m" },
  {
    start: "06:51",
    end: "07:42",
    grade: "D",
    duration: "51m",
    name: "Durmuhurta",
  },
  { start: "07:42", end: "08:30", grade: "B", duration: "48m" },
  { start: "08:30", end: "09:25", grade: "B", duration: "55m" },
  {
    start: "09:25",
    end: "10:16",
    grade: "A",
    duration: "51m",
    name: "Amrit Kaal",
  },
  { start: "10:16", end: "11:00", grade: "B", duration: "44m" },
  { start: "11:00", end: "11:59", grade: "B", duration: "59m" },
  {
    start: "11:59",
    end: "12:24",
    grade: "A",
    duration: "25m",
    name: "Abhijit Muhurta",
  },
  {
    start: "12:24",
    end: "12:50",
    grade: "B",
    duration: "25m",
    name: "Abhijit Muhurta",
  },
  {
    start: "12:50",
    end: "13:41",
    grade: "B",
    duration: "50m",
    name: "Vijaya Muhurta",
  },
  {
    start: "13:41",
    end: "14:00",
    grade: "D",
    duration: "19m",
    name: "Yamagandam",
  },
  { start: "14:00", end: "14:45", grade: "B", duration: "45m" },
  { start: "14:45", end: "15:21", grade: "B", duration: "36m" },
  {
    start: "15:21",
    end: "15:36",
    grade: "D",
    duration: "15m",
    name: "Durmuhurta",
  },
  {
    start: "15:36",
    end: "16:12",
    grade: "F",
    duration: "36m",
    name: "Durmuhurta",
  },
  { start: "16:12", end: "16:45", grade: "B", duration: "33m" },
  { start: "16:45", end: "17:12", grade: "B", duration: "27m" },
  {
    start: "17:12",
    end: "18:25",
    grade: "D",
    duration: "1h 12m",
    name: "Rahu Kaal",
  },
  { start: "18:25", end: "18:48", grade: "B", duration: "23m" },
  {
    start: "18:48",
    end: "19:13",
    grade: "A",
    duration: "24m",
    name: "Godhuli Muhurta",
  },
  { start: "19:13", end: "20:00", grade: "B", duration: "47m" },
  { start: "20:00", end: "21:13", grade: "B", duration: "1h 13m" },
  { start: "21:13", end: "22:15", grade: "B", duration: "1h 2m" },
  { start: "22:15", end: "23:33", grade: "B", duration: "1h 18m" },
  { start: "23:33", end: "23:59", grade: "B", duration: "26m" },
];

// ─── Named muhurta badge config ───────────────────────────────────────────────
const MUHURTA_BADGE: Record<
  string,
  { bg: string; color: string; border: string }
> = {
  "Brahma Muhurta": {
    bg: "oklch(0.30 0.10 290 / 0.35)",
    color: "oklch(0.82 0.14 290)",
    border: "oklch(0.55 0.18 290 / 0.5)",
  },
  "Amrit Kaal": {
    bg: "oklch(0.22 0.10 145 / 0.35)",
    color: "oklch(0.80 0.16 145)",
    border: "oklch(0.55 0.18 145 / 0.5)",
  },
  "Abhijit Muhurta": {
    bg: "oklch(0.28 0.12 75 / 0.35)",
    color: "oklch(0.85 0.17 75)",
    border: "oklch(0.68 0.20 75 / 0.5)",
  },
  "Vijaya Muhurta": {
    bg: "oklch(0.22 0.09 240 / 0.35)",
    color: "oklch(0.75 0.14 240)",
    border: "oklch(0.55 0.16 240 / 0.5)",
  },
  "Godhuli Muhurta": {
    bg: "oklch(0.28 0.12 55 / 0.35)",
    color: "oklch(0.85 0.16 55)",
    border: "oklch(0.68 0.18 55 / 0.5)",
  },
  Durmuhurta: {
    bg: "oklch(0.28 0.12 30 / 0.35)",
    color: "oklch(0.82 0.14 30)",
    border: "oklch(0.58 0.18 30 / 0.5)",
  },
  "Rahu Kaal": {
    bg: "oklch(0.22 0.10 15 / 0.40)",
    color: "oklch(0.75 0.15 15)",
    border: "oklch(0.50 0.18 15 / 0.5)",
  },
  Yamagandam: {
    bg: "oklch(0.28 0.10 40 / 0.35)",
    color: "oklch(0.80 0.13 40)",
    border: "oklch(0.58 0.16 40 / 0.5)",
  },
};

// ─── Grade config for A/B/D/F ─────────────────────────────────────────────────
const SLOT_GRADE_CONFIG: Record<
  SlotGrade,
  {
    label: string;
    bg: string;
    border: string;
    leftBorder: string;
    text: string;
    dot: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  A: {
    label: "Excellent",
    bg: "oklch(0.20 0.07 145 / 0.25)",
    border: "oklch(0.50 0.15 145 / 0.35)",
    leftBorder: "oklch(0.65 0.20 145)",
    text: "oklch(0.78 0.16 145)",
    dot: "oklch(0.65 0.20 145)",
    badgeBg: "oklch(0.22 0.10 145 / 0.4)",
    badgeText: "oklch(0.82 0.16 145)",
  },
  B: {
    label: "Good",
    bg: "oklch(0.20 0.07 75 / 0.15)",
    border: "oklch(0.55 0.12 75 / 0.25)",
    leftBorder: "oklch(0.72 0.17 75)",
    text: "oklch(0.80 0.14 75)",
    dot: "oklch(0.72 0.17 75)",
    badgeBg: "oklch(0.24 0.08 75 / 0.4)",
    badgeText: "oklch(0.82 0.15 75)",
  },
  D: {
    label: "Poor",
    bg: "oklch(0.20 0.08 40 / 0.20)",
    border: "oklch(0.55 0.14 40 / 0.35)",
    leftBorder: "oklch(0.68 0.18 40)",
    text: "oklch(0.78 0.14 40)",
    dot: "oklch(0.68 0.18 40)",
    badgeBg: "oklch(0.24 0.09 40 / 0.4)",
    badgeText: "oklch(0.82 0.15 40)",
  },
  F: {
    label: "Avoid",
    bg: "oklch(0.20 0.08 20 / 0.22)",
    border: "oklch(0.50 0.16 20 / 0.40)",
    leftBorder: "oklch(0.62 0.20 20)",
    text: "oklch(0.78 0.14 20)",
    dot: "oklch(0.62 0.20 20)",
    badgeBg: "oklch(0.22 0.10 20 / 0.4)",
    badgeText: "oklch(0.80 0.16 20)",
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────
const RAHU_KAAL_BY_DAY: Record<number, [string, string]> = {
  0: ["16:30", "18:00"],
  1: ["07:30", "09:00"],
  2: ["15:00", "16:30"],
  3: ["12:00", "13:30"],
  4: ["13:30", "15:00"],
  5: ["10:30", "12:00"],
  6: ["09:00", "10:30"],
};

const GULIK_BY_DAY: Record<number, [string, string]> = {
  0: ["15:00", "16:30"],
  1: ["13:30", "15:00"],
  2: ["12:00", "13:30"],
  3: ["10:30", "12:00"],
  4: ["09:00", "10:30"],
  5: ["07:30", "09:00"],
  6: ["06:00", "07:30"],
};

const YAMAGANDA_BY_DAY: Record<number, [string, string]> = {
  0: ["12:00", "13:30"],
  1: ["10:30", "12:00"],
  2: ["09:00", "10:30"],
  3: ["07:30", "09:00"],
  4: ["06:00", "07:30"],
  5: ["15:00", "16:30"],
  6: ["13:30", "15:00"],
};

const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const PANCHANG_DATA: DayPanchang[] = [
  {
    date: "12 April 2026",
    weekday: "Sunday",
    tithi: "Panchami (5th)",
    nakshatra: "Pushya",
    yoga: "Siddhi",
    karana: "Bava",
    masa: "Chaitra",
    paksha: "Shukla (Waxing)",
    samvat: "Vikram Samvat 2083",
    sunrise: "6:00 AM",
    sunset: "6:49 PM",
    moonrise: "2:49 AM",
  },
  {
    date: "13 April 2026",
    weekday: "Monday",
    tithi: "Shashthi (6th)",
    nakshatra: "Ashlesha",
    yoga: "Sadhya",
    karana: "Balava",
    masa: "Chaitra",
    paksha: "Shukla (Waxing)",
    samvat: "Vikram Samvat 2083",
    sunrise: "5:59 AM",
    sunset: "6:49 PM",
    moonrise: "3:35 AM",
  },
  {
    date: "14 April 2026",
    weekday: "Tuesday",
    tithi: "Saptami (7th)",
    nakshatra: "Magha",
    yoga: "Shubha",
    karana: "Kaulava",
    masa: "Vaishakha",
    paksha: "Shukla (Waxing)",
    samvat: "Vikram Samvat 2083",
    sunrise: "5:58 AM",
    sunset: "6:50 PM",
    moonrise: "4:24 AM",
  },
];

const LAGNA_JOURNEY = [
  { hour: "05:42", sign: "Aries", symbol: "♈", color: "#e74c3c" },
  { hour: "07:48", sign: "Taurus", symbol: "♉", color: "#e67e22" },
  { hour: "09:54", sign: "Gemini", symbol: "♊", color: "#f1c40f" },
  { hour: "12:00", sign: "Cancer", symbol: "♋", color: "#1abc9c" },
  { hour: "14:06", sign: "Leo", symbol: "♌", color: "#e74c3c" },
  { hour: "16:12", sign: "Virgo", symbol: "♍", color: "#27ae60" },
  { hour: "18:18", sign: "Libra", symbol: "♎", color: "#3498db" },
  { hour: "20:24", sign: "Scorpio", symbol: "♏", color: "#8e44ad" },
];

const PLANETS: Planet[] = [
  {
    id: "surya",
    name: "Sun (Surya)",
    nameHindi: "सूर्य",
    symbol: "☀️",
    strength: 82,
    color: "#f97316",
    insight:
      "Surya is strong today — excellent for leadership decisions, government dealings, and asserting authority. Father figures benefit. Avoid conflict with authority.",
  },
  {
    id: "chandra",
    name: "Moon (Chandra)",
    nameHindi: "चंद्र",
    symbol: "🌙",
    strength: 65,
    color: "#94a3b8",
    insight:
      "Chandra is moderately placed in Pushya nakshatra. Emotions are steady. Good for creative pursuits, family matters, and nurturing activities. Avoid late night travel.",
  },
  {
    id: "mangal",
    name: "Mars (Mangal)",
    nameHindi: "मंगल",
    symbol: "🔴",
    strength: 74,
    color: "#ef4444",
    insight:
      "Mangal gains strength — ideal for bold ventures, physical activity, and removing obstacles. Athletes and warriors are favored. Channel energy constructively.",
  },
  {
    id: "budh",
    name: "Mercury (Budh)",
    nameHindi: "बुध",
    symbol: "💚",
    strength: 58,
    color: "#22c55e",
    insight:
      "Budh is average strength. Communication is functional but double-check important contracts or agreements. Good for learning, short trips, and trade.",
  },
  {
    id: "guru",
    name: "Jupiter (Guru)",
    nameHindi: "गुरु",
    symbol: "🟡",
    strength: 91,
    color: "#eab308",
    insight:
      "Guru is exceptionally powerful — the most auspicious planet today. Blessings flow in education, wisdom, spirituality, and long-term investments. An ideal day for rituals and prayers.",
  },
  {
    id: "shukra",
    name: "Venus (Shukra)",
    nameHindi: "शुक्र",
    symbol: "💗",
    strength: 47,
    color: "#ec4899",
    insight:
      "Shukra is in lower strength. Delay luxury purchases and romantic decisions. Focus on inner beauty and artistic expression rather than external adornment.",
  },
  {
    id: "shani",
    name: "Saturn (Shani)",
    nameHindi: "शनि",
    symbol: "🔵",
    strength: 63,
    color: "#6366f1",
    insight:
      "Shani is steady — discipline and hard work will yield results. Service, humility, and long-term planning are blessed. Avoid shortcuts and cutting corners today.",
  },
];

const GRADE_CONFIG: Record<
  Grade,
  {
    label: string;
    labelHindi: string;
    bg: string;
    border: string;
    text: string;
    dot: string;
  }
> = {
  excellent: {
    label: "Excellent",
    labelHindi: "उत्तम",
    bg: "rgba(22,163,74,0.12)",
    border: "rgba(22,163,74,0.5)",
    text: "#16a34a",
    dot: "#16a34a",
  },
  good: {
    label: "Good",
    labelHindi: "शुभ",
    bg: "rgba(34,197,94,0.10)",
    border: "rgba(34,197,94,0.4)",
    text: "#15803d",
    dot: "#4ade80",
  },
  neutral: {
    label: "Neutral",
    labelHindi: "सामान्य",
    bg: "rgba(250,204,21,0.10)",
    border: "rgba(250,204,21,0.4)",
    text: "#a16207",
    dot: "#facc15",
  },
  avoid: {
    label: "Avoid",
    labelHindi: "वर्जित",
    bg: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.5)",
    text: "#c2410c",
    dot: "#f97316",
  },
  inauspicious: {
    label: "Inauspicious",
    labelHindi: "अशुभ",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.5)",
    text: "#dc2626",
    dot: "#ef4444",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function slot(
  name: string,
  nameHindi: string,
  startTime: string,
  endTime: string,
  grade: Grade,
  description: string,
): MuhurtaSlot {
  return { name, nameHindi, startTime, endTime, grade, description };
}

function buildMuhurtaSlots(dayIndex: number): MuhurtaSlot[] {
  const rahu = RAHU_KAAL_BY_DAY[dayIndex];
  const gulik = GULIK_BY_DAY[dayIndex];
  const yamag = YAMAGANDA_BY_DAY[dayIndex];
  const yamagaFirst = yamag[0] < rahu[0];

  return [
    slot(
      "Brahma Muhurta",
      "ब्रह्म मुहूर्त",
      "04:24",
      "05:12",
      "excellent",
      "Most sacred time of day — meditation, prayer, study",
    ),
    slot(
      "Pratah Sandhya",
      "प्रातः संध्या",
      "05:12",
      "05:42",
      "good",
      "Dawn twilight — auspicious for rituals and new beginnings",
    ),
    slot(
      "Sunrise",
      "सूर्योदय",
      "05:42",
      "07:30",
      "good",
      "Sunrise to morning — gentle activity, family, travel",
    ),
    slot(
      yamagaFirst ? "Yamaganda" : "Morning Period",
      yamagaFirst ? "यमगण्ड" : "प्रातः काल",
      yamagaFirst ? yamag[0] : "07:30",
      yamagaFirst ? yamag[1] : "10:30",
      yamagaFirst ? "avoid" : "neutral",
      yamagaFirst ? "Avoid travel and new ventures" : "General work period",
    ),
    slot(
      "Abhijit Muhurta",
      "अभिजित मुहूर्त",
      "11:48",
      "12:36",
      "excellent",
      "Midday muhurta — highly auspicious for new work, business, ceremonies",
    ),
    slot(
      "Rahu Kaal",
      "राहु काल",
      rahu[0],
      rahu[1],
      "inauspicious",
      "Strictly avoid auspicious activities during this period",
    ),
    slot(
      "Gulik Kaal",
      "गुलिक काल",
      gulik[0],
      gulik[1],
      "avoid",
      "Avoid important new beginnings and major decisions",
    ),
    slot(
      "Amrit Siddhi Yoga",
      "अमृत सिद्धि योग",
      "16:00",
      "17:30",
      "excellent",
      "Nectar of success — propitious for long-term ventures",
    ),
    slot(
      "Saayam Sandhya",
      "सायं संध्या",
      "18:12",
      "18:48",
      "good",
      "Evening twilight — prayers, family, gratitude",
    ),
  ].sort((a, b) => a.startTime.localeCompare(b.startTime));
}

function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function GradeBadge({ grade }: { grade: Grade }) {
  const cfg = GRADE_CONFIG[grade];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border"
      style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.text }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full inline-block"
        style={{ background: cfg.dot }}
      />
      {cfg.labelHindi} · {cfg.label}
    </span>
  );
}

function MuhurtaCard({ slot: s }: { slot: MuhurtaSlot }) {
  const cfg = GRADE_CONFIG[s.grade];
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-xl border transition-all hover:scale-[1.01]"
      style={{ background: cfg.bg, borderColor: cfg.border }}
      data-ocid="muhurta.slot_card"
    >
      <div className="text-right shrink-0 w-28">
        <p className="text-sm font-bold font-mono" style={{ color: cfg.text }}>
          {fmt(s.startTime)}
        </p>
        <p className="text-xs font-mono opacity-70" style={{ color: cfg.text }}>
          – {fmt(s.endTime)}
        </p>
      </div>
      <div className="flex flex-col items-center gap-0.5 pt-1">
        <div
          className="h-3 w-3 rounded-full border-2"
          style={{ background: cfg.dot, borderColor: cfg.text }}
        />
        <div
          className="flex-1 w-0.5 min-h-[20px]"
          style={{ background: cfg.border }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h4
            className="font-heading font-semibold text-sm"
            style={{ color: "oklch(0.90 0.06 60)" }}
          >
            {s.name}
          </h4>
          <span
            className="text-xs font-devanagari"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {s.nameHindi}
          </span>
        </div>
        <p
          className="text-xs font-body leading-relaxed"
          style={{ color: "oklch(0.70 0.04 60)" }}
        >
          {s.description}
        </p>
        <div className="mt-2">
          <GradeBadge grade={s.grade} />
        </div>
      </div>
    </div>
  );
}

// ─── Timeline slot card (new detailed timeline) ───────────────────────────────
function TimelineSlotCard({
  slot: s,
  isFiltered,
}: { slot: TimelineSlot; isFiltered: boolean }) {
  const cfg = SLOT_GRADE_CONFIG[s.grade];
  const badgeCfg = s.name ? MUHURTA_BADGE[s.name] : null;
  const isRahu = s.name === "Rahu Kaal";

  if (isFiltered) return null;
  return (
    <div
      className="flex items-stretch gap-0 rounded-xl overflow-hidden border transition-all hover:scale-[1.005]"
      style={{ background: cfg.bg, borderColor: cfg.border }}
      data-ocid="timeline.slot_card"
    >
      {/* Left accent border */}
      <div
        className="w-1 shrink-0 rounded-l-xl"
        style={{ background: cfg.leftBorder }}
      />

      <div className="flex items-center gap-3 px-3 py-3 flex-1 min-w-0">
        {/* Time */}
        <div className="text-right shrink-0 w-24">
          <p
            className="text-xs font-bold font-mono"
            style={{ color: cfg.text }}
          >
            {fmt(s.start)}
          </p>
          <p
            className="text-xs font-mono opacity-60"
            style={{ color: cfg.text }}
          >
            – {fmt(s.end)}
          </p>
          <p
            className="text-xs font-mono mt-0.5 opacity-50"
            style={{ color: cfg.text }}
          >
            {s.duration}
          </p>
        </div>

        {/* Dot + connector */}
        <div className="flex flex-col items-center self-stretch justify-center gap-1">
          <div
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{ background: cfg.dot }}
          />
        </div>

        {/* Name + badges */}
        <div className="flex-1 min-w-0 flex items-center flex-wrap gap-2">
          {/* Grade badge */}
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: cfg.badgeBg,
              color: cfg.badgeText,
              border: `1px solid ${cfg.leftBorder}55`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: cfg.dot }}
            />
            {s.grade} · {cfg.label}
          </span>

          {/* Named muhurta badge */}
          {s.name && badgeCfg && (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border"
              style={{
                background: badgeCfg.bg,
                color: badgeCfg.color,
                borderColor: badgeCfg.border,
              }}
            >
              {isRahu
                ? "⚠️"
                : s.grade === "A"
                  ? "✨"
                  : s.grade === "F"
                    ? "🚫"
                    : s.grade === "D"
                      ? "⚡"
                      : ""}
              {s.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Summary counter badges ───────────────────────────────────────────────────
function SummaryCounters({ slots }: { slots: TimelineSlot[] }) {
  const counts = { A: 0, B: 0, D: 0, F: 0 };
  for (const s of slots) {
    counts[s.grade]++;
  }
  const items = [
    {
      label: "Excellent",
      grade: "A" as const,
      count: counts.A,
      bg: "oklch(0.20 0.09 145 / 0.35)",
      color: "oklch(0.80 0.18 145)",
      border: "oklch(0.55 0.18 145 / 0.5)",
    },
    {
      label: "Good",
      grade: "B" as const,
      count: counts.B,
      bg: "oklch(0.22 0.09 75 / 0.35)",
      color: "oklch(0.82 0.16 75)",
      border: "oklch(0.60 0.16 75 / 0.5)",
    },
    {
      label: "Poor",
      grade: "D" as const,
      count: counts.D,
      bg: "oklch(0.24 0.09 40 / 0.35)",
      color: "oklch(0.80 0.15 40)",
      border: "oklch(0.58 0.16 40 / 0.5)",
    },
    {
      label: "Avoid",
      grade: "F" as const,
      count: counts.F,
      bg: "oklch(0.22 0.09 20 / 0.35)",
      color: "oklch(0.78 0.16 20)",
      border: "oklch(0.50 0.18 20 / 0.5)",
    },
  ];
  return (
    <div
      className="flex flex-wrap gap-2 mb-4"
      data-ocid="timeline.summary_counters"
    >
      {items.map((item) => (
        <span
          key={item.grade}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold"
          style={{
            background: item.bg,
            color: item.color,
            borderColor: item.border,
          }}
        >
          <span className="text-lg font-bold leading-none">{item.count}</span>
          {item.label}
        </span>
      ))}
    </div>
  );
}

// ─── Sunrise / Sunset marker ──────────────────────────────────────────────────
function SolarMarker({
  type,
  time,
}: { type: "sunrise" | "sunset"; time: string }) {
  const isSunrise = type === "sunrise";
  return (
    <div
      className="flex items-center gap-3 my-1"
      data-ocid={`timeline.${type}_marker`}
    >
      <div
        className="flex-1 h-px"
        style={{
          background: isSunrise
            ? "oklch(0.78 0.18 75 / 0.5)"
            : "oklch(0.68 0.18 40 / 0.5)",
        }}
      />
      <span
        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shrink-0"
        style={{
          background: isSunrise
            ? "oklch(0.25 0.10 75 / 0.4)"
            : "oklch(0.24 0.10 40 / 0.4)",
          color: isSunrise ? "oklch(0.85 0.18 75)" : "oklch(0.82 0.16 40)",
          borderColor: isSunrise
            ? "oklch(0.68 0.18 75 / 0.5)"
            : "oklch(0.62 0.16 40 / 0.5)",
        }}
      >
        {isSunrise ? "🌅" : "🌇"} {isSunrise ? "Sunrise" : "Sunset"} {time}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background: isSunrise
            ? "oklch(0.78 0.18 75 / 0.5)"
            : "oklch(0.68 0.18 40 / 0.5)",
        }}
      />
    </div>
  );
}

function PanchangWidget({ data }: { data: DayPanchang }) {
  const fields = [
    { label: "Tithi", labelHindi: "तिथि", value: data.tithi },
    { label: "Nakshatra", labelHindi: "नक्षत्र", value: data.nakshatra },
    { label: "Yoga", labelHindi: "योग", value: data.yoga },
    { label: "Karana", labelHindi: "करण", value: data.karana },
    { label: "Var (Day)", labelHindi: "वार", value: data.weekday },
    { label: "Masa", labelHindi: "मास", value: data.masa },
  ];

  return (
    <Card
      className="border overflow-hidden"
      style={{
        background: "oklch(0.20 0.07 22)",
        borderColor: "oklch(0.78 0.14 75 / 0.25)",
      }}
    >
      <CardHeader
        className="pb-3 border-b"
        style={{ borderColor: "oklch(0.78 0.14 75 / 0.15)" }}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle
            className="font-heading text-base"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            आज का पंचांग — Aaj Ka Panchang
          </CardTitle>
          <div className="text-right">
            <p
              className="text-xs font-body"
              style={{ color: "oklch(0.65 0.08 60)" }}
            >
              {data.samvat}
            </p>
            <p
              className="text-xs font-bold font-body"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {data.date}
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-1 flex-wrap">
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.4)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            {data.paksha}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs"
            style={{
              borderColor: "oklch(0.68 0.20 48 / 0.5)",
              color: "oklch(0.78 0.12 50)",
            }}
          >
            {data.masa} Maas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {fields.map((f) => (
            <div
              key={f.label}
              className="rounded-lg p-3 border"
              style={{
                background: "oklch(0.16 0.06 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <p
                className="text-xs mb-0.5"
                style={{ color: "oklch(0.55 0.06 55)" }}
              >
                {f.labelHindi} · {f.label}
              </p>
              <p
                className="font-heading font-semibold text-sm"
                style={{ color: "oklch(0.90 0.05 65)" }}
              >
                {f.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { icon: "🌅", label: "Sunrise", value: data.sunrise },
            { icon: "🌇", label: "Sunset", value: data.sunset },
            { icon: "🌕", label: "Moonrise", value: data.moonrise },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center rounded-lg p-3 border"
              style={{
                background: "oklch(0.16 0.06 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-xs" style={{ color: "oklch(0.55 0.06 55)" }}>
                {item.label}
              </p>
              <p
                className="font-heading font-bold text-sm"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h4
            className="text-xs font-bold uppercase tracking-wider mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🌐 Lagna Journey — राशि परिवर्तन
          </h4>
          <div className="relative overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {LAGNA_JOURNEY.map((l, i) => (
                <div
                  key={l.hour}
                  className="flex flex-col items-center"
                  style={{ width: 72 }}
                >
                  <div
                    className="w-full flex flex-col items-center py-2 border-r last:border-r-0 cursor-default transition-all hover:opacity-90"
                    style={{
                      background: `${l.color}22`,
                      borderColor: `${l.color}44`,
                      borderTopLeftRadius: i === 0 ? 8 : 0,
                      borderBottomLeftRadius: i === 0 ? 8 : 0,
                      borderTopRightRadius:
                        i === LAGNA_JOURNEY.length - 1 ? 8 : 0,
                      borderBottomRightRadius:
                        i === LAGNA_JOURNEY.length - 1 ? 8 : 0,
                    }}
                  >
                    <span className="text-lg mb-0.5">{l.symbol}</span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: l.color }}
                    >
                      {l.sign}
                    </span>
                    <span
                      className="text-xs font-mono opacity-60"
                      style={{ color: "oklch(0.70 0.04 60)" }}
                    >
                      {l.hour}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p
            className="text-xs mt-2 font-body"
            style={{ color: "oklch(0.50 0.04 55)" }}
          >
            * Lagna changes every ~2 hours. Times are approximate for Delhi
            (IST).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function PlanetBar({ planet }: { planet: Planet }) {
  return (
    <div
      className="rounded-xl p-4 border transition-all hover:scale-[1.01]"
      style={{
        background: `${planet.color}11`,
        borderColor: `${planet.color}33`,
      }}
      data-ocid="shadbala.planet_card"
    >
      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xl">{planet.symbol}</span>
          <div>
            <span
              className="font-heading font-bold text-sm"
              style={{ color: "oklch(0.90 0.05 65)" }}
            >
              {planet.name}
            </span>
            <span
              className="ml-2 text-xs font-devanagari"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {planet.nameHindi}
            </span>
          </div>
        </div>
        <span
          className="font-bold text-sm font-mono"
          style={{ color: planet.color }}
        >
          {planet.strength}%
        </span>
      </div>
      <div
        className="h-2 rounded-full mb-3 overflow-hidden"
        style={{ background: "oklch(0.14 0.04 22)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${planet.strength}%`,
            background: `linear-gradient(90deg, ${planet.color}aa, ${planet.color})`,
            boxShadow: `0 0 8px ${planet.color}66`,
          }}
        />
      </div>
      <p
        className="text-xs font-body leading-relaxed"
        style={{ color: "oklch(0.65 0.04 58)" }}
      >
        {planet.insight}
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AuspiciousTimes() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [gradeFilter, setGradeFilter] = useState<"all" | SlotGrade>("all");
  const [viewMode, setViewMode] = useState<"today" | "3days">("today");

  const currentDate = new Date();
  const dayOfWeek = (currentDate.getDay() + selectedDay) % 7;

  const muhurtaSlots = useMemo(() => buildMuhurtaSlots(dayOfWeek), [dayOfWeek]);
  const panchang = PANCHANG_DATA[selectedDay] ?? PANCHANG_DATA[0];

  // For "3 Days" view, just show a message — same timeline data repeated
  const showTimeline = viewMode === "today" || selectedDay === 0;

  // Build timeline items: slots + sunrise/sunset markers interleaved
  const timelineItems = useMemo(() => {
    type Item =
      | { type: "slot"; slot: TimelineSlot }
      | { type: "solar"; solarType: "sunrise" | "sunset"; time: string };

    const items: Item[] = [];
    let sunriseInserted = false;
    let sunsetInserted = false;

    for (const s of TIMELINE_SLOTS) {
      // Insert sunrise marker before slot that starts at or after 06:00
      if (!sunriseInserted && s.start >= "06:00") {
        items.push({ type: "solar", solarType: "sunrise", time: "06:00" });
        sunriseInserted = true;
      }
      // Insert sunset marker before slot that starts at or after 18:49
      if (!sunsetInserted && s.start >= "18:49") {
        items.push({ type: "solar", solarType: "sunset", time: "18:49" });
        sunsetInserted = true;
      }
      items.push({ type: "slot", slot: s });
    }
    if (!sunsetInserted) {
      items.push({ type: "solar", solarType: "sunset", time: "18:49" });
    }
    return items;
  }, []);

  const gradeFilterOptions: {
    value: "all" | SlotGrade;
    label: string;
    color: string;
  }[] = [
    { value: "all", label: "All", color: "oklch(0.78 0.14 75)" },
    { value: "A", label: "Excellent (A)", color: "oklch(0.75 0.18 145)" },
    { value: "B", label: "Good (B)", color: "oklch(0.78 0.16 75)" },
    { value: "D", label: "Poor (D)", color: "oklch(0.75 0.16 40)" },
    { value: "F", label: "Avoid (F)", color: "oklch(0.72 0.18 20)" },
  ];

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
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, oklch(0.78 0.14 75 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-body mb-4"
            style={{
              background: "oklch(0.78 0.14 75 / 0.08)",
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            🌟 Vedic Muhurta & Panchang
          </div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            शुभ मुहूर्त
          </h1>
          <h2
            className="font-heading text-xl md:text-2xl font-semibold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Auspicious Times
          </h2>
          <p
            className="font-body text-sm md:text-base"
            style={{ color: "oklch(0.65 0.05 58)" }}
          >
            Find the best times for your important activities
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-10">
        {/* ── Day Toggle ── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div
            className="flex items-center gap-2 flex-wrap"
            data-ocid="auspicious.day_toggle"
          >
            {PANCHANG_DATA.map((d, i) => (
              <button
                key={d.date}
                type="button"
                onClick={() => setSelectedDay(i)}
                className="px-5 py-2 rounded-full text-sm font-heading font-semibold border transition-all duration-200"
                style={
                  selectedDay === i
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                        borderColor: "oklch(0.68 0.20 48)",
                        color: "white",
                      }
                    : {
                        background: "oklch(0.16 0.06 22)",
                        borderColor: "oklch(0.78 0.14 75 / 0.25)",
                        color: "oklch(0.75 0.06 60)",
                      }
                }
              >
                {i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.weekday}
              </button>
            ))}
          </div>
          {/* Today / 3 Days toggle */}
          <div
            className="flex items-center gap-1 rounded-full border p-1"
            style={{
              background: "oklch(0.16 0.06 22)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
            }}
            data-ocid="auspicious.view_toggle"
          >
            {(["today", "3days"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setViewMode(v)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={
                  viewMode === v
                    ? { background: "oklch(0.68 0.20 48)", color: "white" }
                    : { color: "oklch(0.65 0.06 58)" }
                }
              >
                {v === "today" ? "Today" : "3 Days"}
              </button>
            ))}
          </div>
        </div>

        {/* Selected day heading */}
        <div className="text-center -mt-4">
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.60 0.05 55)" }}
          >
            {panchang.weekday}, {panchang.date}
          </p>
        </div>

        {/* ── Section 1: Detailed Timeline ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-8 w-1 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
              }}
            />
            <div>
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.90 0.05 65)" }}
              >
                Today's Timeline
              </h2>
              <p
                className="text-xs font-body"
                style={{ color: "oklch(0.60 0.05 55)" }}
              >
                Muhurta Timeline · {TIMELINE_SLOTS.length} periods for{" "}
                {WEEKDAY_NAMES[dayOfWeek]}
              </p>
            </div>
          </div>

          {/* Grade filter */}
          <div
            className="flex flex-wrap gap-2 mb-4"
            data-ocid="auspicious.grade_filter"
          >
            {gradeFilterOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setGradeFilter(opt.value)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={
                  gradeFilter === opt.value
                    ? {
                        background: "oklch(0.68 0.20 48)",
                        borderColor: "oklch(0.68 0.20 48)",
                        color: "white",
                      }
                    : {
                        background: "oklch(0.18 0.06 22)",
                        borderColor: "oklch(0.78 0.14 75 / 0.2)",
                        color: opt.color,
                      }
                }
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Summary counters */}
          <SummaryCounters slots={TIMELINE_SLOTS} />

          {/* Timeline */}
          <div className="space-y-1.5" data-ocid="muhurta.timeline">
            {showTimeline ? (
              timelineItems.map((item) => {
                if (item.type === "solar") {
                  return (
                    <SolarMarker
                      key={`solar-${item.solarType}`}
                      type={item.solarType}
                      time={item.time}
                    />
                  );
                }
                const isFiltered =
                  gradeFilter !== "all" && item.slot.grade !== gradeFilter;
                return (
                  <TimelineSlotCard
                    key={`${item.slot.start}-${item.slot.end}`}
                    slot={item.slot}
                    isFiltered={isFiltered}
                  />
                );
              })
            ) : (
              <div
                className="text-center py-10 rounded-xl border"
                style={{
                  background: "oklch(0.18 0.06 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <p
                  className="text-sm font-body"
                  style={{ color: "oklch(0.65 0.05 58)" }}
                >
                  3-day view shows today + next 2 days. Select a day above to
                  view its full timeline.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs font-body"
            style={{ color: "oklch(0.50 0.04 55)" }}
          >
            <span>📍 Calculations for: Mohali, Punjab, India</span>
            <span>
              {TIMELINE_SLOTS.length} periods • Last updated: 16:49:57
            </span>
          </div>
        </section>

        {/* ── Section 2: Muhurta Cards (traditional) ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-8 w-1 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
              }}
            />
            <div>
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.90 0.05 65)" }}
              >
                मुहूर्त Timeline
              </h2>
              <p
                className="text-xs font-body"
                style={{ color: "oklch(0.60 0.05 55)" }}
              >
                Traditional Muhurta · Key auspicious periods for{" "}
                {WEEKDAY_NAMES[dayOfWeek]}
              </p>
            </div>
          </div>

          {/* Grade legend */}
          <div className="flex flex-wrap gap-2 mb-5">
            {(
              Object.entries(GRADE_CONFIG) as [
                Grade,
                (typeof GRADE_CONFIG)[Grade],
              ][]
            ).map(([grade, cfg]) => (
              <span
                key={grade}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border"
                style={{
                  background: cfg.bg,
                  borderColor: cfg.border,
                  color: cfg.text,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: cfg.dot }}
                />
                {cfg.labelHindi} · {cfg.label}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            {muhurtaSlots.map((s) => (
              <MuhurtaCard key={`${s.name}-${s.startTime}`} slot={s} />
            ))}
          </div>
        </section>

        {/* ── Section 3: Live Panchang Widget ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-8 w-1 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.65 0.18 200), oklch(0.55 0.15 220))",
              }}
            />
            <div>
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.90 0.05 65)" }}
              >
                आज का पंचांग
              </h2>
              <p
                className="text-xs font-body"
                style={{ color: "oklch(0.60 0.05 55)" }}
              >
                Aaj Ka Panchang · Daily Vedic Calendar
              </p>
            </div>
          </div>
          <PanchangWidget data={panchang} />
        </section>

        {/* ── Section 4: Shadbala Energy Panel ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div
              className="h-8 w-1 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.75 0.18 280), oklch(0.55 0.15 260))",
              }}
            />
            <div>
              <h2
                className="font-heading font-bold text-xl"
                style={{ color: "oklch(0.90 0.05 65)" }}
              >
                ग्रह शक्ति — Shadbala
              </h2>
              <p
                className="text-xs font-body"
                style={{ color: "oklch(0.60 0.05 55)" }}
              >
                Shadbala Graha Shakti · Planetary Strength Analysis
              </p>
            </div>
          </div>

          <div
            className="p-1 rounded-2xl border"
            style={{
              background: "oklch(0.18 0.07 22)",
              borderColor: "oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3"
              data-ocid="shadbala.panel"
            >
              {PLANETS.map((planet) => (
                <PlanetBar key={planet.id} planet={planet} />
              ))}
            </div>
            <div
              className="mx-3 mb-3 p-4 rounded-xl border"
              style={{
                background: "oklch(0.16 0.06 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ✨ Today's Planetary Highlight
              </p>
              <p
                className="text-sm font-body leading-relaxed"
                style={{ color: "oklch(0.75 0.05 60)" }}
              >
                <strong style={{ color: "oklch(0.78 0.14 75)" }}>
                  Guru (Jupiter)
                </strong>{" "}
                dominates today with 91% Shadbala strength. Combined with{" "}
                <strong style={{ color: "oklch(0.78 0.14 75)" }}>
                  Surya's
                </strong>{" "}
                82% — this is a powerful day for spiritual growth, education,
                and bold leadership. Conduct prayers, begin new learning
                journeys, or seek blessings from elders during Brahma Muhurta or
                Abhijit Muhurta for maximum impact.
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer note ── */}
        <div
          className="text-center pb-4 text-xs font-body"
          style={{ color: "oklch(0.45 0.04 50)" }}
        >
          * Muhurta timings are calculated for Delhi, India (IST, UTC+5:30).
          Consult a qualified Jyotishi for personalized guidance.
        </div>
      </div>
    </div>
  );
}
