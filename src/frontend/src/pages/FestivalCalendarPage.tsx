import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ALL_FESTIVALS_2026,
  COLOR_TAG_MAP,
  type FestivalCalendarEntry,
  type RegionKey,
  getFestivalsByRegion,
} from "../data/festivalCalendar";

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

const REGIONS: { key: RegionKey; label: string; flag: string }[] = [
  { key: "allIndia", label: "All India", flag: "🇮🇳" },
  { key: "tamilNadu", label: "Tamil Nadu", flag: "🌺" },
  { key: "karnataka", label: "Karnataka", flag: "🌼" },
  { key: "kerala", label: "Kerala", flag: "🌴" },
  { key: "gujarat", label: "Gujarat", flag: "🪔" },
  { key: "maharashtra", label: "Maharashtra", flag: "🐄" },
  { key: "bengal", label: "Bengal", flag: "🎨" },
  { key: "odisha", label: "Odisha", flag: "🏺" },
  { key: "punjab", label: "Punjab", flag: "⚔️" },
  { key: "upBihar", label: "UP / Bihar", flag: "🕉️" },
];

function formatFestivalDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  const day = d.getDate();
  const month = MONTH_NAMES[d.getMonth()].slice(0, 3);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${weekdays[d.getDay()]}, ${String(day).padStart(2, "0")} ${month} 2026`;
}

function getMonthFromDate(dateStr: string): number {
  return Number.parseInt(dateStr.split("-")[1], 10);
}

export default function FestivalCalendarPage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("allIndia");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFestivals: FestivalCalendarEntry[] = useMemo(() => {
    // Base: all-India + selected region (getFestivalsByRegion already includes allIndia)
    let list =
      selectedRegion === "allIndia"
        ? ALL_FESTIVALS_2026
        : getFestivalsByRegion(selectedRegion);

    if (selectedMonth !== null) {
      list = list.filter((f) => getMonthFromDate(f.date) === selectedMonth);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          (f.deity ?? "").toLowerCase().includes(q) ||
          f.significance.toLowerCase().includes(q),
      );
    }
    return list;
  }, [selectedRegion, selectedMonth, searchQuery]);

  // Group by month
  const byMonth = useMemo(() => {
    const map: Record<number, FestivalCalendarEntry[]> = {};
    for (let m = 1; m <= 12; m++) {
      const entries = filteredFestivals.filter(
        (f) => getMonthFromDate(f.date) === m,
      );
      if (entries.length > 0) map[m] = entries;
    }
    return map;
  }, [filteredFestivals]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="flex justify-center mb-3">
            <CalendarDays className="w-9 h-9 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Festival Calendar 2026
          </h1>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto">
            All major Hindu, Jain, Sikh & regional festivals across India — all
            12 months
          </p>
        </div>
      </div>

      {/* Region Tabs */}
      <div className="bg-muted/40 border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollArea
            className="w-full whitespace-nowrap"
            data-ocid="festival.region_tabs"
          >
            <div className="flex gap-1 py-3">
              {REGIONS.map((r) => (
                <button
                  type="button"
                  key={r.key}
                  onClick={() => setSelectedRegion(r.key)}
                  data-ocid={`festival.region.${r.key}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedRegion === r.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border text-foreground hover:bg-accent/20"
                  }`}
                >
                  <span>{r.flag}</span>
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Filter Row */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search festivals…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card border-border"
              data-ocid="festival.search_input"
            />
          </div>

          {/* Month quick-jump */}
          <div
            className="flex flex-wrap gap-1.5"
            data-ocid="festival.month_filters"
          >
            <Button
              size="sm"
              variant={selectedMonth === null ? "default" : "outline"}
              onClick={() => setSelectedMonth(null)}
              data-ocid="festival.month_all"
              className="h-8 text-xs"
            >
              All Months
            </Button>
            {MONTH_NAMES.map((mn, idx) => (
              <Button
                key={mn}
                size="sm"
                variant={selectedMonth === idx + 1 ? "default" : "outline"}
                onClick={() => setSelectedMonth(idx + 1)}
                data-ocid={`festival.month.${idx + 1}`}
                className="h-8 text-xs"
              >
                {mn.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-muted-foreground mt-2">
          Showing <strong>{filteredFestivals.length}</strong> festivals
        </p>
      </div>

      {/* Festival List by Month */}
      <div
        className="max-w-6xl mx-auto px-4 pb-12 space-y-10"
        data-ocid="festival.list"
      >
        {Object.keys(byMonth).length === 0 ? (
          <div className="text-center py-16" data-ocid="festival.empty_state">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              No festivals match your search.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setSelectedMonth(null);
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          Object.entries(byMonth).map(([monthNumStr, festivals]) => {
            const monthNum = Number.parseInt(monthNumStr, 10);
            return (
              <div key={monthNum} id={`month-${monthNum}`}>
                {/* Month heading */}
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-display font-bold text-foreground">
                    {MONTH_NAMES[monthNum - 1]}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                  <Badge variant="secondary" className="text-xs">
                    {festivals.length} festival
                    {festivals.length !== 1 ? "s" : ""}
                  </Badge>
                </div>

                {/* Festival cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {festivals.map((fest, idx) => {
                    const tag = COLOR_TAG_MAP[fest.colorTag] ?? {
                      bg: "bg-muted",
                      text: "text-muted-foreground",
                      label: fest.colorTag,
                    };
                    return (
                      <Card
                        key={`${fest.name}-${fest.date}`}
                        data-ocid={`festival.item.${idx + 1}`}
                        className="border border-border hover:border-primary/40 transition-colors hover:shadow-md bg-card"
                      >
                        <CardContent className="p-4">
                          {/* Tag + date */}
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${tag.bg} ${tag.text}`}
                            >
                              {tag.label}
                            </span>
                            <span className="text-xs text-muted-foreground font-mono">
                              {formatFestivalDate(fest.date)}
                            </span>
                          </div>

                          {/* Name */}
                          <h3 className="text-sm font-semibold text-foreground leading-snug mb-1">
                            {fest.name}
                          </h3>

                          {/* Deity */}
                          {fest.deity && (
                            <p className="text-xs text-primary font-medium mb-1">
                              🙏 {fest.deity}
                            </p>
                          )}

                          {/* Significance */}
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {fest.significance}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
