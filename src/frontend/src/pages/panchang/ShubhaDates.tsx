import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const PURPOSES = [
  { value: "vivah", label: "Marriage / Vivah", hindi: "विवाह / मंगनी" },
  { value: "travel", label: "Travel / Yatra", hindi: "यात्रा" },
  { value: "griha", label: "Griha Pravesh", hindi: "गृह प्रवेश" },
  { value: "business", label: "Business Start", hindi: "व्यापार शुरू" },
];

const MONTHS_2026 = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

// Static 2026 shubha dates per purpose
const SHUBHA_STATIC: Record<
  string,
  Array<{
    date: string;
    reason: string;
    muhurat: string;
    quality: "best" | "good" | "ok";
  }>
> = {
  vivah: [
    {
      date: "2026-01-16",
      reason: "Makar Sankranti auspicious period",
      muhurat: "11:30 AM - 1:30 PM",
      quality: "best",
    },
    {
      date: "2026-01-25",
      reason: "Shukla Panchami + Pushya",
      muhurat: "7:00 AM - 9:30 AM",
      quality: "best",
    },
    {
      date: "2026-02-06",
      reason: "Rohini Nakshatra + Shukla",
      muhurat: "9:00 AM - 12:00 PM",
      quality: "best",
    },
    {
      date: "2026-02-14",
      reason: "Magha Shukla Purnima",
      muhurat: "6:30 AM - 8:00 AM",
      quality: "good",
    },
    {
      date: "2026-03-08",
      reason: "Phalguna Shukla + Revati",
      muhurat: "10:00 AM - 1:00 PM",
      quality: "best",
    },
    {
      date: "2026-04-15",
      reason: "Chaitra Shukla + Rohini",
      muhurat: "8:00 AM - 11:00 AM",
      quality: "good",
    },
    {
      date: "2026-05-07",
      reason: "Vaishakha Shukla + Pushya",
      muhurat: "9:30 AM - 12:30 PM",
      quality: "best",
    },
    {
      date: "2026-06-19",
      reason: "Jyeshtha Shukla + Uttara Phalguni",
      muhurat: "7:00 AM - 10:00 AM",
      quality: "good",
    },
    {
      date: "2026-11-22",
      reason: "Kartika Shukla + Mrigashira",
      muhurat: "8:30 AM - 11:30 AM",
      quality: "best",
    },
    {
      date: "2026-12-07",
      reason: "Margashirsha Shukla + Rohini",
      muhurat: "9:00 AM - 12:00 PM",
      quality: "best",
    },
  ],
  travel: [
    {
      date: "2026-01-07",
      reason: "Pushya Nakshatra — ideal for travel",
      muhurat: "8:00 AM - 10:00 AM",
      quality: "best",
    },
    {
      date: "2026-01-20",
      reason: "Punarvasu + Shukla Panchami",
      muhurat: "10:00 AM - 12:00 PM",
      quality: "good",
    },
    {
      date: "2026-02-18",
      reason: "Hasta Nakshatra — travel yoga",
      muhurat: "9:00 AM - 11:00 AM",
      quality: "best",
    },
    {
      date: "2026-03-12",
      reason: "Shravana + Wednesday",
      muhurat: "7:30 AM - 9:30 AM",
      quality: "good",
    },
    {
      date: "2026-04-09",
      reason: "Rohini Nakshatra — Chandra bala",
      muhurat: "11:00 AM - 1:00 PM",
      quality: "best",
    },
    {
      date: "2026-05-14",
      reason: "Mrigashira + Thursday",
      muhurat: "8:00 AM - 10:00 AM",
      quality: "good",
    },
  ],
  griha: [
    {
      date: "2026-01-17",
      reason: "Makar Sankranti Shubh Lagna",
      muhurat: "10:00 AM - 12:30 PM",
      quality: "best",
    },
    {
      date: "2026-02-23",
      reason: "Rohini + Shukla Tritiya",
      muhurat: "8:30 AM - 11:00 AM",
      quality: "best",
    },
    {
      date: "2026-03-21",
      reason: "Chaitra Pratipada + Navratri",
      muhurat: "9:00 AM - 11:30 AM",
      quality: "best",
    },
    {
      date: "2026-04-22",
      reason: "Vaishakha Shukla + Pushya",
      muhurat: "10:30 AM - 1:00 PM",
      quality: "good",
    },
    {
      date: "2026-10-27",
      reason: "Diwali next day — Shubha",
      muhurat: "7:00 AM - 9:00 AM",
      quality: "best",
    },
    {
      date: "2026-11-15",
      reason: "Dev Uthani Ekadashi — highly auspicious",
      muhurat: "8:00 AM - 10:30 AM",
      quality: "best",
    },
  ],
  business: [
    {
      date: "2026-01-12",
      reason: "Monday + Rohini + Shukla",
      muhurat: "11:00 AM - 1:00 PM",
      quality: "best",
    },
    {
      date: "2026-02-04",
      reason: "Wednesday + Hasta Nakshatra",
      muhurat: "10:00 AM - 12:00 PM",
      quality: "best",
    },
    {
      date: "2026-03-18",
      reason: "Thursday + Pushya",
      muhurat: "9:00 AM - 11:00 AM",
      quality: "best",
    },
    {
      date: "2026-04-01",
      reason: "New month + Pratipada Shukla",
      muhurat: "8:00 AM - 10:00 AM",
      quality: "good",
    },
    {
      date: "2026-05-07",
      reason: "Guru Pushya Yoga",
      muhurat: "10:00 AM - 12:30 PM",
      quality: "best",
    },
    {
      date: "2026-06-10",
      reason: "Mercury in own sign + Hasta",
      muhurat: "9:30 AM - 11:30 AM",
      quality: "good",
    },
    {
      date: "2026-10-02",
      reason: "Gandhi Jayanti — auspicious starts",
      muhurat: "8:30 AM - 10:30 AM",
      quality: "good",
    },
  ],
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

interface DayInfo {
  day: number;
  dateStr: string;
  entry?: (typeof SHUBHA_STATIC.vivah)[0];
}

export default function ShubhaDates() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const [month, setMonth] = useState("5");
  const [purpose, setPurpose] = useState("vivah");
  const [results, setResults] = useState<DayInfo[]>([]);

  function calculate() {
    const yr = 2026;
    const mo = Number.parseInt(month);
    const days = getDaysInMonth(yr, mo);
    const shubha = SHUBHA_STATIC[purpose] ?? [];
    const dayInfos: DayInfo[] = [];
    for (let d = 1; d <= days; d++) {
      const dateStr = `${yr}-${String(mo).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const entry = shubha.find((s) => s.date === dateStr);
      dayInfos.push({ day: d, dateStr, entry });
    }
    setResults(dayInfos);
  }

  const qualityColors: Record<string, string> = {
    best: "bg-green-500",
    good: "bg-amber-500",
    ok: "bg-blue-400",
  };

  const selectedPurposeLabel = PURPOSES.find((p) => p.value === purpose);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-amber-200 mb-3 flex items-center gap-1">
            <Link to="/" className="hover:text-white">
              🏠
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/panchang" className="hover:text-white">
              {hi ? "पंचांग" : "Panchang"}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span>{hi ? "शुभा तिथियाँ" : "Shubha Dates"}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "शुभा तिथि कैलकुलेटर" : "Shubha Dates 2026"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "विवाह, यात्रा, गृह प्रवेश, व्यापार के लिए 2026 के शुभ मुहूर्त"
              : "Auspicious muhurats for marriage, travel, griha pravesh, business in 2026"}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800">
              {hi ? "विवरण दर्ज करें" : "Select Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-amber-700">
                  {hi ? "माह (2026)" : "Month (2026)"}
                </Label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger
                    className="border-amber-300"
                    data-ocid="shubha-dates.month_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS_2026.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-amber-700">
                  {hi ? "उद्देश्य" : "Purpose"}
                </Label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger
                    className="border-amber-300"
                    data-ocid="shubha-dates.purpose_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PURPOSES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {hi ? p.hindi : p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="shubha-dates.submit_button"
            >
              {hi ? "शुभा तिथि देखें" : "Find Auspicious Dates"}
            </Button>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                {hi ? "श्रेष्ठ" : "Best"}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                {hi ? "शुभ" : "Good"}
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-semibold text-amber-700 py-1"
                >
                  {d}
                </div>
              ))}
              {/* blank cells for start of month */}
              {["su", "mo", "tu", "we", "th", "fr", "sa"]
                .slice(
                  0,
                  new Date(
                    `2026-${String(Number.parseInt(month)).padStart(2, "0")}-01`,
                  ).getDay(),
                )
                .map((d) => (
                  <div key={`sp-${d}`} />
                ))}
              {results.map((info, idx) => (
                <div
                  key={info.dateStr}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs cursor-default border transition-transform ${
                    info.entry
                      ? `${info.entry.quality === "best" ? "bg-green-500" : "bg-amber-500"} text-white font-bold shadow-sm hover:scale-110`
                      : "bg-amber-50 border-amber-200 text-amber-700"
                  }`}
                  title={
                    info.entry
                      ? `${info.entry.reason} | ${info.entry.muhurat}`
                      : ""
                  }
                  data-ocid={
                    info.entry ? `shubha-dates.item.${idx + 1}` : undefined
                  }
                >
                  {info.day}
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-amber-800">
                {hi ? "शुभा तिथि विवरण" : "Auspicious Dates Detail"} —{" "}
                {hi ? selectedPurposeLabel?.hindi : selectedPurposeLabel?.label}
              </h3>
              {results
                .filter((r) => r.entry)
                .map((info, _idx) => (
                  <Card
                    key={info.dateStr}
                    className={`border ${
                      info.entry!.quality === "best"
                        ? "border-green-300 bg-green-50"
                        : "border-amber-300 bg-amber-50"
                    }`}
                  >
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-amber-900">
                            {new Date(info.dateStr).toLocaleDateString(
                              "en-IN",
                              { day: "numeric", month: "long" },
                            )}
                          </div>
                          <div className="text-sm text-amber-700">
                            {info.entry!.reason}
                          </div>
                          <div className="text-xs text-amber-600 mt-0.5">
                            ⏰ {info.entry!.muhurat}
                          </div>
                        </div>
                        <Badge
                          className={`${qualityColors[info.entry!.quality]} text-white`}
                        >
                          {hi
                            ? info.entry!.quality === "best"
                              ? "श्रेष्ठ"
                              : "शुभ"
                            : info.entry!.quality}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </>
        )}

        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-700">
              {hi ? "यह भी देखें" : "Try Also"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {[
              { to: "/panchang", label: hi ? "शुभ योग" : "Auspicious Yogas" },
              { to: "/muhurat", label: hi ? "मुहूर्त" : "Muhurat Calculator" },
            ].map((l) => (
              <Link key={l.to} to={l.to}>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer border border-amber-300">
                  {l.label}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
