import { Link } from "@tanstack/react-router";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import type { YogaData, YogaEntry } from "../data/auspiciousYogaData";
import { YOGA_LIST } from "../data/auspiciousYogaData";
import { useLanguage } from "../hooks/useLanguage";

type ClockMode = "12h" | "24h" | "24plus";

// City offset in minutes relative to New Delhi (positive = add, negative = subtract)
const CITY_OFFSETS: Record<string, number> = {
  "New Delhi, India": 0,
  "Mumbai, India": -28,
  "Chennai, India": -24,
  "Kolkata, India": 24,
  "Bangalore, India": -26,
  "Hyderabad, India": -21,
  "Pune, India": -27,
  "Ahmedabad, India": -32,
  "Jaipur, India": -6,
  "Lucknow, India": 14,
  "Varanasi, India": 18,
};

const CITIES = Object.keys(CITY_OFFSETS);

const YOGA_ROUTES: Record<string, string> = {
  "ravi-yoga": "/ravi-yoga",
  "sarvartha-siddhi-yoga": "/sarvartha-siddhi-yoga",
  "amrit-siddhi-yoga": "/amrit-siddhi-yoga",
  "dwipushkar-yoga": "/dwipushkar-yoga",
  "tripushkar-yoga": "/tripushkar-yoga",
  "ravi-pushya-yoga": "/ravi-pushya-yoga",
  "guru-pushya-yoga": "/guru-pushya-yoga",
  "maitreya-yoga": "/maitreya-yoga",
  "gajachchhaya-yoga": "/gajachchhaya-yoga",
};

/** Parse a "HH:MM" string into total minutes since midnight. */
function toMinutes(time24: string): number {
  const [h, m] = time24.split(":").map(Number);
  return h * 60 + m;
}

/** Format total minutes back into "HH:MM" padding. */
function fromMinutes(totalMins: number): string {
  // For 24plus, values >= 1440 are intentional (e.g. 25:30).
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Convert 24h "HH:MM" to 12h "HH:MM AM/PM". */
function to12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  // Handle 24plus values (h >= 24) by wrapping
  const hMod = h % 24;
  const ampm = hMod < 12 ? "AM" : "PM";
  const h12 = hMod === 0 ? 12 : hMod > 12 ? hMod - 12 : hMod;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

/**
 * Apply a city offset (minutes) to a single time field.
 * For 24plus times (values representing next-day, e.g. 29:35),
 * the offset is applied preserving the 24+ structure.
 */
function applyOffset(time24: string, offsetMins: number): string {
  const base = toMinutes(time24);
  const adjusted = base + offsetMins;
  // Keep the adjusted value; negative wraps handled gracefully via fromMinutes
  // For safety, clamp negatives within 0..48*60 range
  const clamped = adjusted < 0 ? adjusted + 1440 : adjusted;
  return fromMinutes(clamped);
}

/**
 * Build an adjusted YogaEntry for a specific city offset.
 * All three time formats (12h, 24h, 24plus) are recalculated from the 24h base.
 * The 24plus format uses the 24h base for normal entries and 24+offset for nextDay entries.
 */
function adjustEntry(entry: YogaEntry, offsetMins: number): YogaEntry {
  if (offsetMins === 0) return entry;

  const adj24Start = applyOffset(entry.startTime24, offsetMins);
  const adj24End = applyOffset(entry.endTime24, offsetMins);

  // For 24plus: start is always the same day; end uses +24 prefix only if nextDay
  const adj24plusStart = adj24Start;
  let adj24plusEnd: string;
  if (entry.nextDay) {
    // endTime24plus was originally endTime24 + 24h; re-derive
    const adjEndMins = toMinutes(adj24End);
    adj24plusEnd = fromMinutes(adjEndMins + 1440);
  } else {
    adj24plusEnd = adj24End;
  }

  return {
    ...entry,
    startTime24: adj24Start,
    endTime24: adj24End,
    startTime24plus: adj24plusStart,
    endTime24plus: adj24plusEnd,
    startTime12: to12h(adj24Start),
    endTime12: to12h(adj24End),
  };
}

function formatTiming(entry: YogaEntry, mode: ClockMode): string {
  if (mode === "12h") {
    const suffix = entry.nextDay ? `, ${entry.nextDay}` : "";
    return `${entry.startTime12} to ${entry.endTime12}${suffix}`;
  }
  if (mode === "24h") {
    const suffix = entry.nextDay ? `, ${entry.nextDay}` : "";
    return `${entry.startTime24} to ${entry.endTime24}${suffix}`;
  }
  // 24plus — next-day times already computed with +24h
  return `${entry.startTime24plus} to ${entry.endTime24plus}`;
}

interface Props {
  yogaData: YogaData;
}

export default function AuspiciousYogaLayout({ yogaData }: Props) {
  const { language } = useLanguage();
  const hi = language === "hi";

  const [clockMode, setClockMode] = useState<ClockMode>("12h");
  const [location, setLocation] = useState(yogaData.location);
  const [viewMonth, setViewMonth] = useState<"may2026" | "june2026">("may2026");

  const yogaName = hi ? yogaData.nameHi : yogaData.nameEn;

  const colDays = hi ? `${yogaName} के दिन` : `${yogaData.nameEn} Days`;
  const colTimings = hi ? `${yogaName} का समय` : `${yogaData.nameEn} Timings`;

  // Offset for selected city
  const offsetMins = CITY_OFFSETS[location] ?? 0;

  // Current month data (raw entries from the multi-month structure)
  const monthData = useMemo(() => {
    const m = yogaData.months[viewMonth];
    return m ?? { entries: [] };
  }, [yogaData, viewMonth]);

  // Adjusted entries with city offset applied
  const adjustedEntries = useMemo(
    () => monthData.entries.map((e) => adjustEntry(e, offsetMins)),
    [monthData.entries, offsetMins],
  );

  const monthLabel = viewMonth === "may2026" ? "May 2026" : "June 2026";
  const monthLabelHi = viewMonth === "may2026" ? "मई 2026" : "जून 2026";

  const notesEn =
    offsetMins === 0
      ? "All timings are in local time of New Delhi, India with DST adjustment (if applicable).\nHours past midnight are suffixed with next day date. In Panchang, a day starts and ends with sunrise."
      : `Timings adjusted for ${location} (${offsetMins > 0 ? "+" : ""}${offsetMins} min offset from New Delhi).\nHours past midnight are suffixed with next day date. In Panchang, a day starts and ends with sunrise.`;
  const notesHi =
    offsetMins === 0
      ? "सभी समय नई दिल्ली, भारत के स्थानीय समय में दर्शाए गए हैं।\nरात के 12 बजे के बाद के समय के साथ अगले दिन की तारीख जुड़ी है। पंचांग में दिन सूर्योदय से शुरू होता है।"
      : `समय ${location} के अनुसार समायोजित (नई दिल्ली से ${offsetMins > 0 ? "+" : ""}${offsetMins} मिनट)।\nरात के 12 बजे के बाद के समय के साथ अगले दिन की तारीख जुड़ी है। पंचांग में दिन सूर्योदय से शुरू होता है।`;

  function handleLocationChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLocation(e.target.value);
  }

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="auspicious-yoga.page"
    >
      {/* Breadcrumb */}
      <nav
        className="bg-card border-b border-border px-4 py-2 text-sm"
        aria-label="breadcrumb"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-1 text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">
            {hi ? "होम" : "Home"}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-primary cursor-pointer">
            {hi ? "शुभ योग" : "Auspicious Yoga"}
          </span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary font-medium">
            {hi ? yogaData.breadcrumbHi : yogaData.breadcrumbEn}
          </span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Toolbar */}
        <div
          className="temple-card p-3 mb-4 flex flex-wrap items-center gap-2"
          data-ocid="auspicious-yoga.toolbar"
        >
          <div className="flex items-center gap-1 text-sm font-heading font-semibold text-primary border border-primary/30 rounded px-3 py-1">
            <span className="text-muted-foreground text-xs mr-1">
              {hi ? "माह" : "Month"}
            </span>
            <span>{hi ? monthLabelHi : monthLabel}</span>
          </div>
          <button
            type="button"
            className="text-xs bg-primary/10 border border-primary/30 text-primary rounded px-3 py-1 hover:bg-primary/20 transition-colors font-semibold"
            onClick={() => setViewMonth("may2026")}
            data-ocid="auspicious-yoga.this_month_button"
          >
            {hi ? "इस माह" : "Current Month"}
          </button>
          <div className="flex items-center gap-1 text-xs border border-border rounded px-3 py-1">
            <span className="text-muted-foreground">
              {hi ? "स्थान" : "Location"}:
            </span>
            <span className="font-semibold">{location.split(",")[0]}</span>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Page title */}
            <h1
              className="font-heading text-2xl md:text-3xl font-bold saffron-text mb-1"
              data-ocid="auspicious-yoga.title"
            >
              {hi ? yogaData.nameHi : yogaData.nameEn}
            </h1>

            {/* Clock toggle */}
            <div
              className="flex gap-2 my-3"
              data-ocid="auspicious-yoga.clock_toggle"
            >
              {(["12h", "24h", "24plus"] as ClockMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setClockMode(m)}
                  data-ocid={`auspicious-yoga.clock_${m}_button`}
                  className={`px-4 py-1.5 rounded text-sm font-semibold border transition-colors ${
                    clockMode === m
                      ? "bg-primary text-primary-foreground border-primary shadow"
                      : "bg-card border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {m === "12h"
                    ? hi
                      ? "12 घंटे"
                      : "12 Hour"
                    : m === "24h"
                      ? hi
                        ? "24 घंटे"
                        : "24 Hour"
                      : "24 Plus"}
                </button>
              ))}
            </div>

            {/* Location selector */}
            <div className="flex flex-wrap items-center gap-3 my-3">
              <span className="text-lg">📅</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <select
                  value={location}
                  onChange={handleLocationChange}
                  data-ocid="auspicious-yoga.location_select"
                  className="bg-card border border-border rounded px-2 py-1 text-sm focus:outline-none focus:border-primary"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              {offsetMins !== 0 && (
                <span className="text-xs text-primary bg-primary/10 border border-primary/20 rounded px-2 py-0.5">
                  {hi
                    ? `नई दिल्ली से ${offsetMins > 0 ? "+" : ""}${offsetMins} मिनट`
                    : `${offsetMins > 0 ? "+" : ""}${offsetMins} min from New Delhi`}
                </span>
              )}
            </div>

            {/* Date indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar className="w-4 h-4" />
              <span>{hi ? "समय स्रोत" : "Base"}: New Delhi, India</span>
            </div>

            {/* Month navigation */}
            <div
              className="flex items-center justify-center gap-0 border border-border rounded overflow-hidden mb-5 w-fit"
              data-ocid="auspicious-yoga.month_nav"
            >
              <button
                type="button"
                onClick={() => setViewMonth("may2026")}
                data-ocid="auspicious-yoga.may_month_button"
                className={`px-4 py-2 text-sm border-r border-border transition-colors ${
                  viewMonth === "may2026"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-muted"
                }`}
              >
                {hi ? "मई 2026" : "May 2026"}
              </button>
              <button
                type="button"
                onClick={() => setViewMonth("june2026")}
                data-ocid="auspicious-yoga.june_month_button"
                className={`px-4 py-2 text-sm transition-colors ${
                  viewMonth === "june2026"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-muted"
                }`}
              >
                {hi ? "जून 2026" : "June 2026"}
              </button>
            </div>

            {/* Table card */}
            <div className="temple-card overflow-hidden mb-5">
              <>
                <div className="gold-gradient px-4 py-3">
                  <h2 className="font-heading font-bold text-lg text-primary-foreground">
                    {hi
                      ? `${yogaName} — ${monthLabelHi}`
                      : `${yogaData.nameEn} — ${monthLabel}`}
                  </h2>
                </div>
                {adjustedEntries.length === 0 ? (
                  <div
                    className="p-10 text-center"
                    data-ocid="auspicious-yoga.empty_state"
                  >
                    <div className="text-5xl mb-4">🌙</div>
                    <p className="font-heading font-semibold text-lg text-foreground mb-2">
                      {hi
                        ? `${monthLabelHi} में ${yogaName} नहीं है`
                        : `No ${yogaData.nameEn} in ${monthLabel}`}
                    </p>
                    {monthData.note && (
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        {monthData.note}
                      </p>
                    )}
                    {!monthData.note && (
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        {hi
                          ? `${yogaData.aboutHi.slice(0, 160)}...`
                          : `${yogaData.aboutEn.slice(0, 200)}...`}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-primary/40">
                          <th
                            className="text-left px-4 py-3 font-heading font-semibold gold-text bg-secondary"
                            style={{ width: "45%" }}
                          >
                            {colDays}
                          </th>
                          <th className="text-left px-4 py-3 font-heading font-semibold gold-text bg-secondary">
                            {colTimings}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {adjustedEntries.map((entry, i) => (
                          <tr
                            key={`${entry.date}-${entry.startTime24}`}
                            className={`border-b border-border ${
                              i % 2 === 0 ? "bg-card" : "bg-secondary/40"
                            } hover:bg-accent/20 transition-colors`}
                            data-ocid={`auspicious-yoga.item.${i + 1}`}
                          >
                            <td className="px-4 py-3 font-medium text-foreground">
                              {entry.date}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {formatTiming(entry, clockMode)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            </div>

            {/* Notes footer */}
            <div className="temple-card p-4 mb-4 bg-muted/40">
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                {hi ? notesHi : notesEn}
              </p>
            </div>

            {/* Month toggle link */}
            <div className="mb-6">
              {viewMonth === "may2026" ? (
                <button
                  type="button"
                  onClick={() => setViewMonth("june2026")}
                  data-ocid="auspicious-yoga.next_month_link"
                  className="text-primary hover:text-accent transition-colors text-sm font-semibold underline-offset-2 hover:underline"
                >
                  {hi
                    ? `जून 2026 में ${yogaName} की तारीखें जाँचें →`
                    : `Check ${yogaData.nameEn} dates in June 2026 →`}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setViewMonth("may2026")}
                  data-ocid="auspicious-yoga.prev_month_link"
                  className="text-primary hover:text-accent transition-colors text-sm font-semibold underline-offset-2 hover:underline"
                >
                  {hi
                    ? `← मई 2026 में ${yogaName} की तारीखें जाँचें`
                    : `← Check ${yogaData.nameEn} dates in May 2026`}
                </button>
              )}
            </div>

            {/* About section */}
            <div className="temple-card p-5 mb-4">
              <h3 className="font-heading font-bold text-lg saffron-text mb-2">
                {hi ? `${yogaName} के बारे में` : `About ${yogaData.nameEn}`}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {hi ? yogaData.aboutHi : yogaData.aboutEn}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="xl:w-64 shrink-0">
            <div className="temple-card overflow-hidden sticky top-4">
              <div className="gold-gradient px-4 py-3">
                <h3 className="font-heading font-bold text-sm text-primary-foreground">
                  {hi ? "शुभ योग" : "Auspicious Yoga"}
                </h3>
              </div>
              <nav className="p-2">
                {YOGA_LIST.map((y) => (
                  <Link
                    key={y.id}
                    to={YOGA_ROUTES[y.id] ?? "/"}
                    data-ocid={`auspicious-yoga.sidebar_${y.id}_link`}
                    className={`flex flex-col px-3 py-2 rounded text-xs transition-colors mb-0.5 ${
                      y.id === yogaData.id
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="font-heading font-medium">{y.nameEn}</span>
                    <span className="font-devanagari text-[11px] opacity-80">
                      {y.nameHi}
                    </span>
                  </Link>
                ))}
                <div className="mt-1 px-3 py-2 text-xs text-muted-foreground italic">
                  {hi ? "अन्य योग" : "Others"} …
                </div>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
