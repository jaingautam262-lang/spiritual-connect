import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";

// ── Lookup tables (shared from PanchangWidget) ───────────────────────────────

const TITHIS = [
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Purnima",
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
  "Amavasya",
];

const TITHIS_HI = [
  "प्रतिपदा",
  "द्वितीया",
  "तृतीया",
  "चतुर्थी",
  "पंचमी",
  "षष्ठी",
  "सप्तमी",
  "अष्टमी",
  "नवमी",
  "दशमी",
  "एकादशी",
  "द्वादशी",
  "त्रयोदशी",
  "चतुर्दशी",
  "पूर्णिमा",
  "प्रतिपदा",
  "द्वितीया",
  "तृतीया",
  "चतुर्थी",
  "पंचमी",
  "षष्ठी",
  "सप्तमी",
  "अष्टमी",
  "नवमी",
  "दशमी",
  "एकादशी",
  "द्वादशी",
  "त्रयोदशी",
  "चतुर्दशी",
  "अमावस्या",
];

const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "P.Phalguni",
  "U.Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "P.Ashadha",
  "U.Ashadha",
  "Shravana",
  "Dhanishtha",
  "Shatabhisha",
  "P.Bhadra",
  "U.Bhadra",
  "Revati",
];

const YOGAS = [
  "Vishkambha",
  "Priti",
  "Ayushman",
  "Saubhagya",
  "Shobhana",
  "Atiganda",
  "Sukarma",
  "Dhriti",
  "Shula",
  "Ganda",
  "Vriddhi",
  "Dhruva",
  "Vyaghata",
  "Harshana",
  "Vajra",
  "Siddhi",
  "Vyatipata",
  "Variyan",
  "Parigha",
  "Shiva",
  "Siddha",
  "Sadhya",
  "Shubha",
  "Shukla",
  "Brahma",
  "Indra",
  "Vaidhriti",
];

const KARANAS = [
  "Bava",
  "Balava",
  "Kaulava",
  "Taitila",
  "Garaja",
  "Vanija",
  "Vishti",
  "Bava",
  "Balava",
  "Kaulava",
  "Taitila",
];

const RAHU_KAAL: Record<number, string> = {
  0: "17:00–18:00",
  1: "07:30–09:00",
  2: "15:00–16:30",
  3: "12:00–13:30",
  4: "13:30–15:00",
  5: "10:30–12:00",
  6: "09:00–10:30",
};

const HINDI_MONTHS = [
  "Chaitra",
  "Vaishakh",
  "Jyestha",
  "Ashadh",
  "Shravan",
  "Bhadrapad",
  "Ashwin",
  "Kartik",
  "Margashirsha",
  "Paush",
  "Magh",
  "Phalgun",
];

// Festivals by month-day (month is 0-indexed)
const FESTIVALS: Record<string, string> = {
  "0-14": "Holi",
  "0-22": "Ram Navami",
  "1-2": "Akshaya Tritiya",
  "1-14": "Vaishakh Purnima",
  "2-10": "Ganga Dussehra",
  "3-4": "Guru Purnima",
  "4-11": "Nag Panchami",
  "4-15": "Shravan Purnima / Raksha Bandhan",
  "5-8": "Ganesh Chaturthi",
  "5-14": "Bhadrapad Purnima",
  "6-1": "Navratri Begins",
  "6-9": "Dussehra",
  "6-14": "Sharad Purnima",
  "7-1": "Dhanteras",
  "7-2": "Diwali",
  "7-4": "Bhai Dooj",
  "7-13": "Kartik Purnima",
  "8-5": "Vivah Panchami",
  "9-5": "Makar Sankranti",
  "10-1": "Basant Panchami",
  "11-13": "Maha Shivratri",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function getDayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000);
}

function getDayData(date: Date) {
  const dayOfYear = getDayOfYear(date);
  const weekday = date.getDay();
  const tithi = TITHIS[dayOfYear % 30];
  const tithiHi = TITHIS_HI[dayOfYear % 30];
  const nakshatra = NAKSHATRAS[dayOfYear % 27];
  const yoga = YOGAS[dayOfYear % 27];
  const karana = KARANAS[dayOfYear % 11];
  const rahuKaal = RAHU_KAAL[weekday];
  const paksha = dayOfYear % 30 < 15 ? "Shukla" : "Krishna";
  const festivalKey = `${date.getMonth()}-${date.getDate() - 1}`;
  const festival = FESTIVALS[festivalKey];
  return {
    tithi,
    tithiHi,
    nakshatra,
    yoga,
    karana,
    rahuKaal,
    paksha,
    festival,
  };
}

// ── Sub-components ───────────────────────────────────────────────────────────

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

function toMinutes(h: number, m: number) {
  return h * 60 + m;
}
function pct(minutes: number) {
  return `${((minutes / 1440) * 100).toFixed(2)}%`;
}
function lagnaToMinutes(e: LagnaEntry) {
  return toMinutes(e.startH, e.startM);
}
function lagnaEndMinutes(e: LagnaEntry) {
  return toMinutes(e.endH, e.endM);
}

const SUN_MOON_EVENTS = [
  {
    key: "moonrise",
    label: "Moon Rise",
    emoji: "🌙",
    time: "02:49",
    minutes: 169,
  },
  {
    key: "sunrise",
    label: "Sun Rise",
    emoji: "☀️",
    time: "06:00",
    minutes: 360,
  },
  {
    key: "moonset",
    label: "Moon Set",
    emoji: "🌒",
    time: "13:35",
    minutes: 815,
  },
  {
    key: "sunset",
    label: "Sun Set",
    emoji: "🔅",
    time: "18:49",
    minutes: 1129,
  },
] as const;

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
  return (
    <div className="rounded-xl border border-amber-500/30 bg-card p-5 shadow-md">
      <h3 className="font-heading text-lg font-semibold gold-text mb-1">
        Lagna Journey Across the Day
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Hover to reveal precise lagna change timings.
      </p>
      <div className="flex gap-0">
        <div className="flex flex-col justify-around pr-2 text-right min-w-[82px]">
          {LAGNA_SCHEDULE.map((s) => (
            <span
              key={s.sign}
              className="text-[10px] text-muted-foreground leading-none py-0.5"
            >
              {s.sign}
            </span>
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-[2px] relative">
          {LAGNA_SCHEDULE.map((entry) => {
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
                  className={`absolute top-0 h-full rounded-sm transition-all ${isCurrent ? "saffron-gradient ring-1 ring-amber-400" : isHovered ? "bg-amber-500/40" : "bg-amber-500/20"}`}
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
          <div
            className="absolute top-0 bottom-0 w-px bg-amber-400/70 pointer-events-none"
            style={{ left: pct(nowMinutes) }}
          />
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
      {hovered && (
        <div className="mt-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-foreground">
          <span className="font-semibold gold-text">{hovered.sign}</span> rises
          at{" "}
          <span className="font-mono">
            {String(hovered.startH).padStart(2, "0")}:
            {String(hovered.startM).padStart(2, "0")}
          </span>{" "}
          until{" "}
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
        <div className="absolute inset-0 rounded-full border border-amber-500/20" />
        <div
          className="absolute top-0 h-full rounded-full"
          style={{
            left: pct(360),
            width: `calc(${pct(1129)} - ${pct(360)})`,
            background:
              "linear-gradient(90deg, oklch(0.72 0.2 55 / 0.25), oklch(0.78 0.14 75 / 0.15), oklch(0.55 0.18 40 / 0.25))",
          }}
        />
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
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-amber-400 rounded-full"
          style={{ left: pct(nowMinutes), transform: "translateX(-50%)" }}
        >
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400" />
        </div>
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-muted-foreground px-2">
        <span>00:00</span>
        <div className="flex gap-4">
          {SUN_MOON_EVENTS.map((ev) => (
            <span key={ev.key} className="flex items-center gap-1">
              {ev.emoji} {ev.label}
            </span>
          ))}
        </div>
        <span>24:00</span>
      </div>
    </div>
  );
}

// ── Monthly Calendar ─────────────────────────────────────────────────────────

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

function MonthlyCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startOffset = firstDay.getDay(); // 0=Sun
  const daysInMonth = lastDay.getDate();

  const hindiMonth = HINDI_MONTHS[viewMonth];

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  }
  function goToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedDate(today);
  }

  type CalendarCell = { key: string; date: Date | null };
  const cells: CalendarCell[] = [
    ...Array.from({ length: startOffset }, (_, i) => ({
      key: `pre-${i}`,
      date: null,
    })),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      key: `day-${viewYear}-${viewMonth}-${i + 1}`,
      date: new Date(viewYear, viewMonth, i + 1),
    })),
  ];
  while (cells.length % 7 !== 0)
    cells.push({ key: `post-${cells.length}`, date: null });

  const selectedData = selectedDate ? getDayData(selectedDate) : null;

  return (
    <div className="space-y-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={prevMonth}
          data-ocid="panchang.calendar.prev_month"
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-105"
          style={{
            background: "oklch(0.78 0.14 75 / 0.15)",
            color: "oklch(0.78 0.14 75)",
          }}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="text-center">
          <h3 className="font-heading text-xl font-bold gold-text">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          <p className="text-xs text-muted-foreground">
            {hindiMonth} माह — Hindu Calendar
          </p>
        </div>

        <button
          type="button"
          onClick={nextMonth}
          data-ocid="panchang.calendar.next_month"
          className="flex items-center justify-center w-9 h-9 rounded-full transition-all hover:scale-105"
          style={{
            background: "oklch(0.78 0.14 75 / 0.15)",
            color: "oklch(0.78 0.14 75)",
          }}
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Today button */}
      <div className="text-center">
        <button
          type="button"
          onClick={goToday}
          data-ocid="panchang.calendar.today_button"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-heading font-semibold transition-all hover:scale-105"
          style={{
            background: "oklch(0.68 0.20 48 / 0.15)",
            color: "oklch(0.68 0.20 48)",
            border: "1px solid oklch(0.68 0.20 48 / 0.3)",
          }}
        >
          <Calendar className="h-3 w-3" /> Today
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="text-center py-1.5 text-xs font-heading font-semibold"
            style={{
              color:
                d === "Sun"
                  ? "oklch(0.62 0.20 25)"
                  : d === "Sat"
                    ? "oklch(0.55 0.18 260)"
                    : "oklch(0.78 0.14 75)",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map(({ key, date }) => {
          if (!date) return <div key={key} className="aspect-square" />;
          const data = getDayData(date);
          const isToday = date.toDateString() === today.toDateString();
          const isSelected =
            selectedDate?.toDateString() === date.toDateString();
          const isSunday = date.getDay() === 0;
          const isSaturday = date.getDay() === 6;
          const hasFestival = !!data.festival;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDate(date)}
              data-ocid={`panchang.calendar.day.${date.getDate()}`}
              className="relative aspect-square rounded-lg p-1 flex flex-col items-center transition-all duration-150 hover:scale-105 group"
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                  : isToday
                    ? "oklch(0.78 0.14 75 / 0.20)"
                    : "oklch(0.20 0.06 28 / 0.6)",
                border: isToday
                  ? "1px solid oklch(0.78 0.14 75 / 0.6)"
                  : isSelected
                    ? "1px solid oklch(0.78 0.14 75 / 0.4)"
                    : "1px solid oklch(0.35 0.08 30 / 0.4)",
              }}
              title={data.festival ?? `${data.tithi} · ${data.nakshatra}`}
            >
              {/* Date number */}
              <span
                className="font-heading font-bold text-sm leading-none mt-0.5"
                style={{
                  color: isSelected
                    ? "white"
                    : isToday
                      ? "oklch(0.78 0.14 75)"
                      : isSunday
                        ? "oklch(0.68 0.20 28)"
                        : isSaturday
                          ? "oklch(0.65 0.16 260)"
                          : "oklch(0.88 0.06 72)",
                }}
              >
                {date.getDate()}
              </span>

              {/* Tithi */}
              <span
                className="text-[8px] leading-none mt-0.5 text-center line-clamp-1 w-full px-0.5"
                style={{
                  color: isSelected
                    ? "rgba(255,255,255,0.85)"
                    : "oklch(0.65 0.05 60)",
                }}
              >
                {data.tithiHi}
              </span>

              {/* Nakshatra */}
              <span
                className="text-[7px] leading-none mt-0.5 text-center line-clamp-1 w-full px-0.5 hidden sm:block"
                style={{
                  color: isSelected
                    ? "rgba(255,255,255,0.7)"
                    : "oklch(0.55 0.04 55)",
                }}
              >
                {data.nakshatra.split(" ")[0]}
              </span>

              {/* Festival dot */}
              {hasFestival && (
                <div
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    background: isSelected ? "white" : "oklch(0.78 0.14 75)",
                  }}
                  title={data.festival}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day detail panel */}
      {selectedDate && selectedData && (
        <div
          className="rounded-xl border border-amber-500/30 bg-card p-4 mt-4"
          data-ocid="panchang.calendar.day_detail"
        >
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-heading text-base font-bold gold-text">
              {selectedDate.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h4>
            {selectedData.festival && (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.15)",
                  color: "oklch(0.68 0.20 48)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                }}
              >
                🎉 {selectedData.festival}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              {
                icon: "🌙",
                label: "Tithi",
                value: selectedData.tithi,
                sub: selectedData.tithiHi,
              },
              { icon: "⭐", label: "Nakshatra", value: selectedData.nakshatra },
              { icon: "🔯", label: "Yoga", value: selectedData.yoga },
              { icon: "📿", label: "Karana", value: selectedData.karana },
              { icon: "🚫", label: "Rahu Kaal", value: selectedData.rahuKaal },
              { icon: "🌊", label: "Paksha", value: selectedData.paksha },
              { icon: "🌅", label: "Sunrise", value: "~06:00 AM" },
              { icon: "🌇", label: "Sunset", value: "~06:30 PM" },
              { icon: "🪔", label: "Abhijit", value: "11:48–12:36" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg p-2.5 text-center"
                style={{
                  background: "oklch(0.20 0.06 28)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                }}
              >
                <div className="text-xl mb-1">{item.icon}</div>
                <p
                  className="text-[10px] font-heading uppercase tracking-wider mb-0.5"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-xs font-heading font-bold"
                  style={{ color: "oklch(0.92 0.06 72)" }}
                >
                  {item.value}
                </p>
                {item.sub && (
                  <p
                    className="text-[9px] mt-0.5"
                    style={{ color: "oklch(0.65 0.05 60)" }}
                  >
                    {item.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Festival legend */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "oklch(0.78 0.14 75)" }}
        />
        <span>Gold dot = Festival day</span>
        <div
          className="w-3 h-3 rounded-sm ml-3"
          style={{
            background: "oklch(0.78 0.14 75 / 0.20)",
            border: "1px solid oklch(0.78 0.14 75 / 0.6)",
          }}
        />
        <span>Today</span>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function LivePanchang() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<"calendar" | "today">("calendar");

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
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* ── Header ── */}
        <div className="rounded-2xl border border-amber-500/30 bg-card px-6 py-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold gold-text">
                Live Panchang
              </h1>
              <p className="text-muted-foreground mt-1">
                Vedic calendar — Monthly view + real-time details
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
                {currentTime.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · India
              </div>
              {currentLagna && (
                <div className="text-xs px-2 py-0.5 rounded-full border border-amber-500/30 saffron-text">
                  Current Lagna: {currentLagna.sign}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Tab Switcher ── */}
        <div className="flex gap-2" role="tablist">
          {(
            [
              { id: "calendar", icon: "📅", label: "Monthly Calendar" },
              { id: "today", icon: "🕐", label: "Today's Detail" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-ocid={`panchang.${tab.id}.tab`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading text-sm font-semibold transition-all duration-200"
              style={{
                background:
                  activeTab === tab.id
                    ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                    : "oklch(0.20 0.05 30)",
                color: activeTab === tab.id ? "white" : "oklch(0.65 0.04 55)",
                border:
                  activeTab === tab.id
                    ? "none"
                    : "1px solid oklch(0.35 0.08 30 / 0.4)",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ── Calendar Tab ── */}
        {activeTab === "calendar" && (
          <div
            className="rounded-2xl border border-amber-500/30 bg-card p-5 shadow-md"
            data-ocid="panchang.calendar.panel"
          >
            <MonthlyCalendar />
          </div>
        )}

        {/* ── Today's Detail Tab ── */}
        {activeTab === "today" && (
          <div className="space-y-6" data-ocid="panchang.today.panel">
            {/* Panchang Cards */}
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

            <LagnaJourneyChart nowMinutes={nowMinutes} />

            {/* Sun & Moon Cards */}
            <div className="grid md:grid-cols-2 gap-4">
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
                  {[
                    ["Sign", "Pisces"],
                    ["Degrees", "28.33°"],
                    ["Nakshatra", "Revati"],
                    ["Pada", "Pada 4"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-muted-foreground text-xs">{l}</p>
                      <p className="font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-sm">
                  {[
                    ["☀️", "Sunrise", "06:00"],
                    ["🌇", "Sunset", "18:49"],
                    ["", "Solar Noon", "12:25"],
                    ["", "Day Length", "12h 48m"],
                  ].map(([e, l, v]) => (
                    <div key={l} className="flex items-center gap-1.5">
                      {e && <span>{e}</span>}
                      <div>
                        <p className="text-[10px] text-muted-foreground">{l}</p>
                        <p className="font-semibold font-mono">{v}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
                  {[
                    ["Sign", "Capricorn"],
                    ["Degrees", "24.11°"],
                    ["Nakshatra", "Dhanishtha"],
                    ["Pada", "Pada 1"],
                  ].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-muted-foreground text-xs">{l}</p>
                      <p className="font-semibold">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-2 text-sm">
                  {[
                    ["🌙", "Moonrise", "02:49"],
                    ["🌒", "Moonset", "13:35"],
                  ].map(([e, l, v]) => (
                    <div key={l} className="flex items-center gap-1.5">
                      <span>{e}</span>
                      <div>
                        <p className="text-[10px] text-muted-foreground">{l}</p>
                        <p className="font-semibold font-mono">{v}</p>
                      </div>
                    </div>
                  ))}
                  <div className="col-span-2">
                    <p className="text-[10px] text-muted-foreground">
                      Moon Phase
                    </p>
                    <p className="font-semibold">Waning Crescent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tithi Progress */}
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

            <SunMoonTimeline nowMinutes={nowMinutes} />

            {/* Location Info */}
            <div className="rounded-xl border border-amber-500/30 bg-muted/40 p-5">
              <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Location Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {[
                  ["Date", "2026-04-25"],
                  ["Reference Time", "12:00"],
                  ["Location", "India"],
                  ["Coordinates", "28.6°N, 77.2°E"],
                ].map(([l, v]) => (
                  <div key={l}>
                    <p className="text-xs text-muted-foreground">{l}</p>
                    <p className="font-semibold font-mono">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Today summary always visible at bottom of calendar view */}
        {activeTab === "calendar" && (
          <div className="rounded-xl border border-amber-500/30 bg-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock
                className="h-4 w-4"
                style={{ color: "oklch(0.78 0.14 75)" }}
              />
              <h3 className="font-heading text-sm font-semibold gold-text">
                Today's Quick Panchang
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(() => {
                const d = getDayData(new Date());
                return [
                  { icon: "🌙", l: "Tithi", v: d.tithi },
                  { icon: "⭐", l: "Nakshatra", v: d.nakshatra },
                  { icon: "🚫", l: "Rahu Kaal", v: d.rahuKaal },
                  { icon: "🔯", l: "Yoga", v: d.yoga },
                ].map((item) => (
                  <div
                    key={item.l}
                    className="text-center rounded-lg p-2"
                    style={{
                      background: "oklch(0.20 0.06 28)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                    }}
                  >
                    <div className="text-lg">{item.icon}</div>
                    <p
                      className="text-[9px] font-heading uppercase tracking-wider"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {item.l}
                    </p>
                    <p
                      className="text-xs font-heading font-semibold"
                      style={{ color: "oklch(0.92 0.06 72)" }}
                    >
                      {item.v}
                    </p>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
