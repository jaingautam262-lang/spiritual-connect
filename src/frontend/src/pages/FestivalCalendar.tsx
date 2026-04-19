import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  List,
  Search,
  Sun,
} from "lucide-react";
import { useMemo, useState } from "react";
import type {
  FaithType,
  FestivalEvent,
  KalyanakaType,
} from "../data/festival-calendar-data";
import {
  FAITH_COLORS,
  KALYANAKA_COLORS,
  allFestivalEvents,
  getEventsByFaith,
  getEventsByMonth,
  jainKalyanaks2026,
  rahuKaalTimings,
  sunTimingsData,
} from "../data/festival-calendar-data";

const MONTHS = [
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

const FAITHS: { value: FaithType | "All"; label: string; emoji: string }[] = [
  { value: "All", label: "सभी / All", emoji: "🕉️" },
  { value: "Hindu", label: "हिंदू / Hindu", emoji: "🔱" },
  { value: "Jain", label: "जैन / Jain", emoji: "☸️" },
  { value: "Sikh", label: "सिख / Sikh", emoji: "🪯" },
  { value: "Tamil", label: "Tamil", emoji: "🌺" },
  { value: "Malayalam", label: "Malayalam", emoji: "🪔" },
];

const KALYANAKA_LABELS: Record<KalyanakaType, string> = {
  Garbha: "गर्भ (Garbha)",
  Janma: "जन्म (Janma)",
  Tapa: "तप (Tapa)",
  Jnana: "ज्ञान (Jnana)",
  Moksha: "मोक्ष (Moksha)",
};

function EventCard({ event }: { event: FestivalEvent }) {
  const faithClass = FAITH_COLORS[event.faith] ?? "";
  const kalyanakaClass = event.kalyanakaType
    ? KALYANAKA_COLORS[event.kalyanakaType]
    : "";
  const date = new Date(event.date);
  const dayName = date.toLocaleDateString("en-IN", { weekday: "short" });
  const dayNum = date.getDate();
  const monthName = MONTHS[date.getMonth()];

  return (
    <div
      className="rounded-xl p-4 border transition-all hover:border-amber-600/40 hover:bg-white/3"
      style={{
        background: "oklch(0.18 0.06 22 / 0.8)",
        borderColor: "oklch(0.78 0.14 75 / 0.12)",
      }}
      data-ocid="festival.event_card"
    >
      <div className="flex gap-3">
        {/* Date block */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-lg flex flex-col items-center justify-center text-center"
          style={{
            background: "oklch(0.78 0.14 75 / 0.1)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <span
            className="text-xs font-body"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            {dayName}
          </span>
          <span
            className="text-2xl font-bold leading-none"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {dayNum}
          </span>
          <span
            className="text-xs font-body"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            {monthName.slice(0, 3)}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            <Badge className={`text-xs border ${faithClass}`}>
              {event.faith}
            </Badge>
            {event.kalyanakaType && (
              <Badge className={`text-xs border ${kalyanakaClass}`}>
                {KALYANAKA_LABELS[event.kalyanakaType]}
              </Badge>
            )}
            {event.tirthankar && (
              <Badge className="text-xs border border-amber-700/40 text-amber-300 bg-amber-900/20">
                {event.tirthankar}
              </Badge>
            )}
          </div>
          <h3
            className="font-heading font-semibold text-sm leading-tight"
            style={{ color: "oklch(0.92 0.06 75)" }}
          >
            {event.title}
          </h3>
          <p
            className="text-xs mt-0.5 font-body"
            style={{ color: "oklch(0.65 0.04 60)" }}
          >
            {event.titleHindi}
          </p>
          {event.tithi && (
            <p
              className="text-xs mt-1 italic"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              📅 {event.tithi}
            </p>
          )}
          <p
            className="text-xs mt-1.5 line-clamp-2"
            style={{ color: "oklch(0.70 0.04 58)" }}
          >
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function JainKalyanakaSection() {
  const [filterType, setFilterType] = useState<KalyanakaType | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let events = jainKalyanaks2026;
    if (filterType !== "All")
      events = events.filter((e) => e.kalyanakaType === filterType);
    if (search.trim()) {
      const q = search.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.tirthankar ?? "").toLowerCase().includes(q),
      );
    }
    return events;
  }, [filterType, search]);

  const byMonth = useMemo(() => {
    const groups: Record<number, FestivalEvent[]> = {};
    for (const e of filtered) {
      const m = new Date(e.date).getMonth();
      if (!groups[m]) groups[m] = [];
      groups[m].push(e);
    }
    return groups;
  }, [filtered]);

  return (
    <div>
      {/* Header */}
      <div
        className="rounded-2xl p-5 mb-6 border"
        style={{
          background: "oklch(0.16 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <h2
          className="text-xl font-heading font-bold mb-1"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          ☸️ जैन कल्याणक 2026 — सभी 93 घटनाएं
        </h2>
        <p
          className="text-sm font-body"
          style={{ color: "oklch(0.65 0.04 60)" }}
        >
          24 तीर्थंकरों के पांच कल्याणक: गर्भ, जन्म, तप, ज्ञान और मोक्ष
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {(["All", "Garbha", "Janma", "Tapa", "Jnana", "Moksha"] as const).map(
            (type) => (
              <button
                type="button"
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full text-xs font-heading transition-all border ${
                  filterType === type
                    ? "border-amber-500"
                    : "border-transparent hover:border-amber-700/40"
                }`}
                style={{
                  background:
                    filterType === type
                      ? "oklch(0.78 0.14 75 / 0.2)"
                      : "oklch(0.20 0.06 22)",
                  color:
                    filterType === type
                      ? "oklch(0.78 0.14 75)"
                      : "oklch(0.65 0.04 60)",
                }}
                data-ocid="jain_kalyanaka.filter"
              >
                {type === "All" ? "सभी / All" : KALYANAKA_LABELS[type]}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
          style={{ color: "oklch(0.55 0.04 50)" }}
        />
        <Input
          placeholder="Search by Tirthankar name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-border text-foreground"
          data-ocid="jain_kalyanaka.search"
        />
      </div>

      {/* Summary count */}
      <p className="text-xs mb-4" style={{ color: "oklch(0.55 0.04 50)" }}>
        {filtered.length} events found
      </p>

      {/* Events by month */}
      {Object.entries(byMonth)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([monthIdx, events]) => (
          <div key={monthIdx} className="mb-6">
            <h3
              className="text-sm font-heading font-semibold mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.15)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                {MONTHS[Number(monthIdx)]}
              </span>
              <span style={{ color: "oklch(0.55 0.04 50)" }}>
                — {events.length} events
              </span>
            </h3>
            <div className="space-y-2">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

function SunriseSunsetSection() {
  return (
    <div>
      <div
        className="rounded-2xl p-5 mb-6 border"
        style={{
          background: "oklch(0.16 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <h2
          className="text-xl font-heading font-bold mb-1 flex items-center gap-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          <Sun className="h-5 w-5" /> सूर्योदय/सूर्यास्त — 2026
        </h2>
        <p
          className="text-sm font-body"
          style={{ color: "oklch(0.65 0.04 60)" }}
        >
          Major Indian cities — approximate timings (IST)
        </p>
      </div>

      <div
        className="overflow-x-auto rounded-xl border"
        style={{ borderColor: "oklch(0.78 0.14 75 / 0.15)" }}
      >
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: "oklch(0.20 0.07 22)" }}>
              <th
                className="text-left px-4 py-3 font-heading font-semibold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                City
              </th>
              {["Jan", "Mar", "Jun", "Sep", "Dec"].map((m) => (
                <th
                  key={m}
                  className="px-3 py-3 font-heading font-semibold text-center"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {m}
                  <br />
                  <span
                    className="text-xs font-normal"
                    style={{ color: "oklch(0.55 0.04 50)" }}
                  >
                    Rise / Set
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sunTimingsData.map((city, idx) => (
              <tr
                key={city.city}
                style={{
                  background:
                    idx % 2 === 0
                      ? "oklch(0.17 0.06 22)"
                      : "oklch(0.19 0.07 22)",
                  borderBottom: "1px solid oklch(0.78 0.14 75 / 0.08)",
                }}
              >
                <td
                  className="px-4 py-3 font-heading font-medium"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {city.city}
                  <span
                    className="block text-xs font-body"
                    style={{ color: "oklch(0.55 0.04 50)" }}
                  >
                    {city.cityHindi}
                  </span>
                </td>
                {[city.jan, city.mar, city.jun, city.sep, city.dec].map(
                  (timing, i) => (
                    <td
                      key={["jan", "mar", "jun", "sep", "dec"][i]}
                      className="px-3 py-3 text-center font-body"
                    >
                      <span
                        className="block"
                        style={{ color: "oklch(0.82 0.12 65)" }}
                      >
                        🌅 {timing.sunrise}
                      </span>
                      <span
                        className="block"
                        style={{ color: "oklch(0.65 0.08 50)" }}
                      >
                        🌇 {timing.sunset}
                      </span>
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RahuKaalSection() {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long" });
  return (
    <div>
      <div
        className="rounded-2xl p-5 mb-6 border"
        style={{
          background: "oklch(0.16 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <h2
          className="text-xl font-heading font-bold mb-1"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          🐉 राहु काल Reference — 2026
        </h2>
        <p
          className="text-sm font-body"
          style={{ color: "oklch(0.65 0.04 60)" }}
        >
          Inauspicious time period — avoid new works during Rahu Kaal
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rahuKaalTimings.map((entry) => {
          const isToday = today.startsWith(entry.day);
          return (
            <div
              key={entry.day}
              className="rounded-xl p-4 border transition-all"
              style={{
                background: isToday
                  ? "oklch(0.50 0.15 30 / 0.15)"
                  : "oklch(0.18 0.06 22)",
                borderColor: isToday
                  ? "oklch(0.68 0.20 48 / 0.5)"
                  : "oklch(0.78 0.14 75 / 0.12)",
              }}
              data-ocid="rahu_kaal.day_card"
            >
              <div className="flex items-center justify-between mb-2">
                <h3
                  className="font-heading font-bold text-base"
                  style={{
                    color: isToday
                      ? "oklch(0.78 0.14 75)"
                      : "oklch(0.88 0.06 75)",
                  }}
                >
                  {entry.day}
                </h3>
                {isToday && (
                  <Badge className="text-xs bg-amber-900/40 text-amber-300 border-amber-700">
                    Today
                  </Badge>
                )}
              </div>
              <p
                className="text-xs font-body mb-1"
                style={{ color: "oklch(0.65 0.04 60)" }}
              >
                {entry.dayHindi}
              </p>
              <div
                className="rounded-lg px-3 py-2 text-center mt-2"
                style={{
                  background: "oklch(0.50 0.12 30 / 0.2)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.2)",
                }}
              >
                <p
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.80 0.12 65)" }}
                >
                  {entry.timing}
                </p>
                <p
                  className="text-xs font-body mt-0.5"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  {entry.duration}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="rounded-xl p-4 border mt-6"
        style={{
          background: "oklch(0.16 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.12)",
        }}
      >
        <p
          className="text-xs font-body"
          style={{ color: "oklch(0.65 0.04 60)" }}
        >
          <strong style={{ color: "oklch(0.78 0.14 75)" }}>Note:</strong> These
          timings are calculated for a 6 AM to 6 PM daytime (12 hours), divided
          into 8 parts. Actual timings vary by city based on local sunrise and
          sunset. Use a local Panchang for precise timings.
        </p>
      </div>
    </div>
  );
}

export default function FestivalCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedFaith, setSelectedFaith] = useState<FaithType | "All">("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const todayEvents = useMemo(
    () => allFestivalEvents.filter((e) => e.date === todayStr),
    [todayStr],
  );

  const upcomingEvents = useMemo(() => {
    const nowDate = new Date(todayStr);
    const future = new Date(todayStr);
    future.setDate(future.getDate() + 14);
    return allFestivalEvents
      .filter((e) => {
        const d = new Date(e.date);
        return d > nowDate && d <= future;
      })
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  }, [todayStr]);

  const filteredEvents = useMemo(() => {
    let events = getEventsByMonth(allFestivalEvents, selectedMonth);
    if (selectedFaith !== "All")
      events = getEventsByFaith(events, selectedFaith);
    if (search.trim()) {
      const q = search.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.titleHindi.includes(q) ||
          (e.tirthankar ?? "").toLowerCase().includes(q),
      );
    }
    return events;
  }, [selectedMonth, selectedFaith, search]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 20)" }}>
      {/* Hero */}
      <div
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22) 0%, oklch(0.22 0.10 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📅</span>
            <div>
              <h1
                className="text-2xl sm:text-3xl font-heading font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Festival Calendar 2026
              </h1>
              <p
                className="text-sm font-body mt-0.5"
                style={{ color: "oklch(0.65 0.04 60)" }}
              >
                हिंदू • जैन • सिख • तमिल • मलयालम — सभी पर्व और कल्याणक
              </p>
            </div>
          </div>

          {/* Today's panchang widget */}
          {todayEvents.length > 0 ? (
            <div
              className="mt-4 rounded-xl p-3 border flex flex-wrap gap-2 items-center"
              style={{
                background: "oklch(0.20 0.08 25 / 0.6)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <span
                className="text-sm font-heading font-semibold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ✨ आज का पर्व:
              </span>
              {todayEvents.map((e) => (
                <Badge
                  key={e.id}
                  className={`text-xs border ${FAITH_COLORS[e.faith]}`}
                >
                  {e.title}
                </Badge>
              ))}
            </div>
          ) : (
            upcomingEvents.length > 0 && (
              <div
                className="mt-4 rounded-xl p-3 border"
                style={{
                  background: "oklch(0.20 0.08 25 / 0.6)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                }}
              >
                <span
                  className="text-sm font-heading font-semibold mr-2"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  🔜 Upcoming:
                </span>
                {upcomingEvents.slice(0, 3).map((e) => (
                  <span
                    key={e.id}
                    className="text-sm font-body mr-3"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {e.title}{" "}
                    <span style={{ color: "oklch(0.55 0.04 50)" }}>
                      (
                      {new Date(e.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                      )
                    </span>
                  </span>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="bg-card border border-border mb-6 flex flex-wrap h-auto gap-1 p-1">
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-primary/20"
              data-ocid="festival.tab_calendar"
            >
              📅 Calendar
            </TabsTrigger>
            <TabsTrigger
              value="jain-kalyanaks"
              className="data-[state=active]:bg-primary/20"
              data-ocid="festival.tab_jain"
            >
              ☸️ जैन कल्याणक (93)
            </TabsTrigger>
            <TabsTrigger
              value="sunrise"
              className="data-[state=active]:bg-primary/20"
              data-ocid="festival.tab_sunrise"
            >
              🌅 Sunrise/Sunset
            </TabsTrigger>
            <TabsTrigger
              value="rahu"
              className="data-[state=active]:bg-primary/20"
              data-ocid="festival.tab_rahu"
            >
              🐉 Rahu Kaal
            </TabsTrigger>
          </TabsList>

          {/* ─── Calendar Tab ─────────────────────────────────────────── */}
          <TabsContent value="calendar">
            {/* Controls */}
            <div className="flex flex-wrap gap-3 mb-6">
              {/* Month navigation */}
              <div
                className="flex items-center gap-1 rounded-xl border p-1"
                style={{
                  background: "oklch(0.18 0.06 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedMonth((m) => Math.max(1, m - 1))}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="bg-transparent text-sm font-heading px-1 focus:outline-none cursor-pointer"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                  data-ocid="festival.month_select"
                >
                  {MONTHS.map((m, i) => (
                    <option
                      key={m}
                      value={i + 1}
                      style={{ background: "oklch(0.20 0.08 22)" }}
                    >
                      {m} 2026
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setSelectedMonth((m) => Math.min(12, m + 1))}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Faith filter */}
              <div className="flex flex-wrap gap-1.5">
                {FAITHS.map((f) => (
                  <button
                    type="button"
                    key={f.value}
                    onClick={() =>
                      setSelectedFaith(f.value as FaithType | "All")
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-heading transition-all border ${
                      selectedFaith === f.value
                        ? "border-amber-600/60"
                        : "border-transparent hover:border-amber-800/40"
                    }`}
                    style={{
                      background:
                        selectedFaith === f.value
                          ? "oklch(0.78 0.14 75 / 0.15)"
                          : "oklch(0.18 0.06 22)",
                      color:
                        selectedFaith === f.value
                          ? "oklch(0.78 0.14 75)"
                          : "oklch(0.65 0.04 60)",
                    }}
                    data-ocid="festival.faith_filter"
                  >
                    {f.emoji} {f.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                />
                <Input
                  placeholder="Search festival..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-card border-border text-foreground text-sm"
                  data-ocid="festival.search"
                />
              </div>

              {/* View toggle */}
              <div
                className="flex gap-1 rounded-lg border p-1"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.15)",
                  background: "oklch(0.18 0.06 22)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white/10" : ""}`}
                  aria-label="List view"
                  style={{
                    color:
                      viewMode === "list"
                        ? "oklch(0.78 0.14 75)"
                        : "oklch(0.55 0.04 50)",
                  }}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white/10" : ""}`}
                  aria-label="Grid view"
                  style={{
                    color:
                      viewMode === "grid"
                        ? "oklch(0.78 0.14 75)"
                        : "oklch(0.55 0.04 50)",
                  }}
                >
                  <Calendar className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Results count */}
            <p
              className="text-xs mb-4 font-body"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              {filteredEvents.length} festivals in {MONTHS[selectedMonth - 1]}{" "}
              2026
              {selectedFaith !== "All" && ` — ${selectedFaith}`}
            </p>

            {/* Events */}
            {filteredEvents.length === 0 ? (
              <div
                className="rounded-xl p-8 text-center border"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.1)",
                  background: "oklch(0.17 0.06 22)",
                }}
              >
                <span className="text-4xl block mb-3">📭</span>
                <p
                  className="font-heading font-semibold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  No events found
                </p>
                <p
                  className="text-sm font-body mt-1"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  Try changing the month or faith filter
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-3"
                    : "space-y-3"
                }
              >
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ─── Jain Kalyanaks Tab ──────────────────────────────────────── */}
          <TabsContent value="jain-kalyanaks">
            <JainKalyanakaSection />
          </TabsContent>

          {/* ─── Sunrise/Sunset Tab ──────────────────────────────────────── */}
          <TabsContent value="sunrise">
            <SunriseSunsetSection />
          </TabsContent>

          {/* ─── Rahu Kaal Tab ────────────────────────────────────────────── */}
          <TabsContent value="rahu">
            <RahuKaalSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
