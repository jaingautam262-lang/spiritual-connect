import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import {
  ALL_CITY_TIMINGS,
  type DailyTimings,
  getTimingsForMonth,
} from "../data/timingsData";

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

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00`);
  const day = d.getDate();
  const weekday = WEEKDAY_SHORT[d.getDay()];
  return `${weekday} ${String(day).padStart(2, "0")}`;
}

function isToday(dateStr: string): boolean {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return dateStr === todayStr;
}

export default function PanchangTimingsPage() {
  const [selectedCityId, setSelectedCityId] = useState("mumbai");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const year = 2026;

  const rows: DailyTimings[] = useMemo(
    () => getTimingsForMonth(selectedCityId, year, month),
    [selectedCityId, month],
  );

  const selectedCity = ALL_CITY_TIMINGS.find(
    (c) => c.cityId === selectedCityId,
  );

  function prevMonth() {
    setMonth((m) => (m === 1 ? 12 : m - 1));
  }
  function nextMonth() {
    setMonth((m) => (m === 12 ? 1 : m + 1));
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="flex justify-center gap-3 mb-3">
            <Sun className="w-8 h-8 text-primary" />
            <Moon className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Sunrise / Sunset & Moonrise / Moonset
          </h1>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl mx-auto">
            Monthly solar and lunar timings (IST) for major Indian cities — 2026
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-muted/40 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* City selector */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                City:
              </span>
              <Select value={selectedCityId} onValueChange={setSelectedCityId}>
                <SelectTrigger
                  className="w-48 bg-card border-border"
                  data-ocid="timings.city_select"
                >
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_CITY_TIMINGS.map((c) => (
                    <SelectItem key={c.cityId} value={c.cityId}>
                      {c.cityName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Month navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMonth}
                disabled={month === 1}
                data-ocid="timings.pagination_prev"
                className="h-8 w-8"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-base font-semibold text-foreground w-36 text-center">
                {MONTH_NAMES[month - 1]} {year}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
                disabled={month === 12}
                data-ocid="timings.pagination_next"
                className="h-8 w-8"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* City info */}
            {selectedCity && (
              <Badge variant="secondary" className="text-xs">
                {selectedCity.cityName} — {selectedCity.lat.toFixed(2)}°N{" "}
                {selectedCity.lng.toFixed(2)}°E
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="border-2 border-primary/20 shadow-md overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border-b border-primary/15">
            <CardTitle className="text-lg font-display text-foreground flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              {MONTH_NAMES[month - 1]} {year} — {selectedCity?.cityName ?? ""}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Horizontal scroll wrapper for mobile */}
            <div className="overflow-x-auto" data-ocid="timings.table">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="bg-primary/10 border-b border-primary/20">
                    <th className="text-left px-4 py-3 font-semibold text-foreground font-body">
                      Date
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground font-body">
                      <span className="flex items-center justify-center gap-1.5">
                        <Sun className="w-4 h-4 text-amber-500" /> Sunrise
                      </span>
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground font-body">
                      <span className="flex items-center justify-center gap-1.5">
                        <Sun className="w-4 h-4 text-orange-400" /> Sunset
                      </span>
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground font-body">
                      <span className="flex items-center justify-center gap-1.5">
                        <Moon className="w-4 h-4 text-blue-400" /> Moonrise
                      </span>
                    </th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground font-body">
                      <span className="flex items-center justify-center gap-1.5">
                        <Moon className="w-4 h-4 text-indigo-400" /> Moonset
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => {
                    const today = isToday(row.date);
                    return (
                      <tr
                        key={row.date}
                        data-ocid={`timings.row.${idx + 1}`}
                        className={
                          today
                            ? "bg-primary/20 border-l-4 border-primary font-semibold"
                            : idx % 2 === 0
                              ? "bg-card hover:bg-muted/30"
                              : "bg-background hover:bg-muted/30"
                        }
                      >
                        <td className="px-4 py-2.5 font-mono text-sm text-foreground whitespace-nowrap">
                          {formatDate(row.date)}
                          {today && (
                            <Badge className="ml-2 text-[10px] py-0 px-1.5 bg-primary text-primary-foreground">
                              Today
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center font-mono text-amber-700">
                          {row.sunrise} IST
                        </td>
                        <td className="px-4 py-2.5 text-center font-mono text-orange-600">
                          {row.sunset} IST
                        </td>
                        <td className="px-4 py-2.5 text-center font-mono text-blue-700">
                          {row.moonrise || "—"} {row.moonrise ? "IST" : ""}
                        </td>
                        <td className="px-4 py-2.5 text-center font-mono text-indigo-600">
                          {row.moonset || "—"} {row.moonset ? "IST" : ""}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 h-3 bg-primary/20 border-l-4 border-primary rounded-sm" />
            Today's row (highlighted gold)
          </span>
          <span>All times in IST (Indian Standard Time, UTC+5:30)</span>
          <span>Data year: 2026</span>
        </div>
      </div>
    </div>
  );
}
