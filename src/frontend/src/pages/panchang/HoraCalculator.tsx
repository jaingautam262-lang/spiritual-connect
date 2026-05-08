import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Info, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

// Chaldean order: Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars
const HORA_PLANET_ORDER = [
  "Sun",
  "Venus",
  "Mercury",
  "Moon",
  "Saturn",
  "Jupiter",
  "Mars",
];
// Day lords by weekday (0=Sun)
const WEEKDAY_LORDS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
];

const HORA_INFO: Record<
  string,
  {
    hindi: string;
    nature: string;
    favourable: string[];
    unfavourable: string[];
    color: string;
    emoji: string;
  }
> = {
  Sun: {
    hindi: "सूर्य",
    nature: "Power & Authority",
    favourable: [
      "Government work",
      "Leadership decisions",
      "Medical treatment",
      "Gold purchase",
    ],
    unfavourable: ["Borrowing money", "Submitting to others"],
    color: "bg-yellow-50 border-yellow-300",
    emoji: "☀️",
  },
  Venus: {
    hindi: "शुक्र",
    nature: "Love & Beauty",
    favourable: [
      "Marriage talks",
      "Art & music",
      "Purchase of vehicles/jewelry",
      "Romance",
    ],
    unfavourable: ["Confrontations", "Surgery"],
    color: "bg-pink-50 border-pink-300",
    emoji: "♀️",
  },
  Mercury: {
    hindi: "बुध",
    nature: "Business & Intellect",
    favourable: ["Trading", "Writing", "Education", "Communication", "Travel"],
    unfavourable: ["Emotional decisions", "Heavy physical work"],
    color: "bg-green-50 border-green-300",
    emoji: "☿",
  },
  Moon: {
    hindi: "चंद्र",
    nature: "Mind & Emotions",
    favourable: [
      "Social activities",
      "Creative work",
      "Travel",
      "Family matters",
    ],
    unfavourable: ["Starting new projects alone", "Mechanical repairs"],
    color: "bg-blue-50 border-blue-300",
    emoji: "🌙",
  },
  Saturn: {
    hindi: "शनि",
    nature: "Discipline & Karma",
    favourable: [
      "Hard physical work",
      "Legal matters",
      "Agriculture",
      "Real estate",
    ],
    unfavourable: ["New ventures", "Loans", "Celebrations"],
    color: "bg-slate-50 border-slate-300",
    emoji: "♄",
  },
  Jupiter: {
    hindi: "गुरु",
    nature: "Wisdom & Expansion",
    favourable: [
      "Religious ceremonies",
      "Wealth matters",
      "Education",
      "Consulting",
    ],
    unfavourable: ["Disputes", "Risky ventures"],
    color: "bg-amber-50 border-amber-300",
    emoji: "♃",
  },
  Mars: {
    hindi: "मंगल",
    nature: "Energy & Courage",
    favourable: [
      "Physical training",
      "Competitive activities",
      "Engineering",
      "Surgery",
    ],
    unfavourable: ["Peace negotiations", "Loans", "Marriage meetings"],
    color: "bg-red-50 border-red-300",
    emoji: "♂",
  },
};

function timeToMins(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function minsToTime(mins: number): string {
  const h = Math.floor((((mins % 1440) + 1440) % 1440) / 60);
  const m = (((mins % 1440) + 1440) % 1440) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

interface HoraSlot {
  idx: number;
  planet: string;
  start: string;
  end: string;
  isNight: boolean;
}

function buildHoraSchedule(
  date: string,
  sunrise: string,
  sunset: string,
): HoraSlot[] {
  const wd = new Date(date).getDay();
  const dayLord = WEEKDAY_LORDS[wd];
  const startIdx = HORA_PLANET_ORDER.indexOf(dayLord);
  const sr = timeToMins(sunrise);
  const ss = timeToMins(sunset);
  const dayHora = (ss - sr) / 12;
  const nightHora = (1440 - (ss - sr)) / 12;
  const slots: HoraSlot[] = [];
  let currentIdx = startIdx;
  // 12 day horas
  for (let i = 0; i < 12; i++) {
    slots.push({
      idx: i,
      planet: HORA_PLANET_ORDER[currentIdx % 7],
      start: minsToTime(sr + i * dayHora),
      end: minsToTime(sr + (i + 1) * dayHora),
      isNight: false,
    });
    currentIdx++;
  }
  // 12 night horas
  for (let i = 0; i < 12; i++) {
    slots.push({
      idx: i + 12,
      planet: HORA_PLANET_ORDER[currentIdx % 7],
      start: minsToTime(ss + i * nightHora),
      end: minsToTime(ss + (i + 1) * nightHora),
      isNight: true,
    });
    currentIdx++;
  }
  return slots;
}

function formatCountdown(target: string, current: string): string {
  const diff = timeToMins(target) - timeToMins(current);
  if (diff <= 0) return "Passed";
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function HoraCalculator() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");

  const [date, setDate] = useState(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
  );
  const [time, setTime] = useState(
    `${pad(now.getHours())}:${pad(now.getMinutes())}`,
  );
  const [sunrise, setSunrise] = useState("06:05");
  const [sunset, setSunset] = useState("18:30");
  const [slots, setSlots] = useState<HoraSlot[]>([]);
  const [currentSlot, setCurrentSlot] = useState<HoraSlot | null>(null);
  const [, setTicker] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTicker((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  function calculate() {
    const s = buildHoraSchedule(date, sunrise, sunset);
    setSlots(s);
    const tm = timeToMins(time);
    const cur =
      s.find((sl) => tm >= timeToMins(sl.start) && tm < timeToMins(sl.end)) ??
      null;
    setCurrentSlot(cur);
  }

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
            <span>{hi ? "होरा" : "Hora"}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "होरा कैलकुलेटर" : "Hora (Planetary Hour) Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "प्रत्येक दिन 24 होरा, हर होरा का एक ग्रह स्वामी"
              : "24 Horas per day, each ruled by a planet"}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Card className="border-amber-200 bg-amber-50/70">
          <CardContent className="pt-4">
            <div className="flex gap-2">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                {hi
                  ? "होरा एक ग्रह घंटे की वैदिक प्रणाली है। दिन के 12 और रात के 12 होरा होते हैं। प्रत्येक होरा का एक ग्रह स्वामी होता है जो उस समय की प्रकृति निर्धारित करता है।"
                  : "Hora is the Vedic planetary hour system. There are 12 day horas and 12 night horas. Each hora's planet lord determines the nature of that period."}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800 text-lg">
              {hi ? "विवरण दर्ज करें" : "Enter Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-amber-700">
                  {hi ? "तारीख" : "Date"}
                </Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-amber-300"
                />
              </div>
              <div>
                <Label className="text-amber-700">{hi ? "समय" : "Time"}</Label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="border-amber-300"
                />
              </div>
              <div>
                <Label className="text-amber-700">
                  {hi ? "सूर्योदय" : "Sunrise"}
                </Label>
                <Input
                  type="time"
                  value={sunrise}
                  onChange={(e) => setSunrise(e.target.value)}
                  className="border-amber-300"
                />
              </div>
              <div>
                <Label className="text-amber-700">
                  {hi ? "सूर्यास्त" : "Sunset"}
                </Label>
                <Input
                  type="time"
                  value={sunset}
                  onChange={(e) => setSunset(e.target.value)}
                  className="border-amber-300"
                />
              </div>
            </div>
            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="hora.submit_button"
            >
              {hi ? "होरा देखें" : "Calculate Hora"}
            </Button>
          </CardContent>
        </Card>

        {currentSlot &&
          (() => {
            const info = HORA_INFO[currentSlot.planet];
            return (
              <Card className="border-2 border-amber-500 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    {hi ? "वर्तमान होरा" : "Current Hora"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{info.emoji}</span>
                    <div>
                      <div className="text-2xl font-bold text-amber-800">
                        {currentSlot.planet} {hi ? "होरा" : "Hora"}
                      </div>
                      <div className="text-amber-600">
                        {info.hindi} | {info.nature}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {currentSlot.start} – {currentSlot.end}
                      </div>
                      <div className="flex items-center gap-1 text-sm mt-1">
                        <Clock className="w-4 h-4 text-amber-600" />
                        {hi ? "अगली होरा:" : "Next Hora:"}{" "}
                        <b className="text-amber-700">
                          {formatCountdown(currentSlot.end, time)}
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-xs font-semibold text-green-700 mb-1">
                        {hi ? "✅ अनुकूल" : "✅ Favourable"}
                      </div>
                      <ul className="text-xs space-y-0.5">
                        {info.favourable.map((f, _i) => (
                          <li key={f}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-xs font-semibold text-red-700 mb-1">
                        {hi ? "❌ प्रतिकूल" : "❌ Unfavourable"}
                      </div>
                      <ul className="text-xs space-y-0.5">
                        {info.unfavourable.map((f, _i) => (
                          <li key={f}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

        {slots.length > 0 && (
          <Card className="border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-800">
                {hi ? "संपूर्ण होरा तालिका" : "Full Hora Schedule"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-amber-100">
                    <tr>
                      <th className="px-3 py-2 text-left text-amber-800">#</th>
                      <th className="px-3 py-2 text-left text-amber-800">
                        {hi ? "समय" : "Time"}
                      </th>
                      <th className="px-3 py-2 text-left text-amber-800">
                        {hi ? "ग्रह" : "Planet"}
                      </th>
                      <th className="px-3 py-2 text-left text-amber-800">
                        {hi ? "प्रकृति" : "Nature"}
                      </th>
                      <th className="px-3 py-2 text-left text-amber-800">
                        {hi ? "काल" : "Period"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-100">
                    {slots.map((slot) => {
                      const info = HORA_INFO[slot.planet];
                      const active = currentSlot?.idx === slot.idx;
                      return (
                        <tr
                          key={slot.idx}
                          className={active ? "bg-amber-100 font-semibold" : ""}
                          data-ocid={`hora.item.${slot.idx + 1}`}
                        >
                          <td className="px-3 py-2 text-amber-600">
                            {slot.idx + 1}
                          </td>
                          <td className="px-3 py-2">
                            {slot.start}–{slot.end}
                          </td>
                          <td className="px-3 py-2">
                            {info.emoji} {slot.planet}{" "}
                            <span className="text-xs text-muted-foreground">
                              ({info.hindi})
                            </span>
                          </td>
                          <td className="px-3 py-2 text-xs">{info.nature}</td>
                          <td className="px-3 py-2">
                            <Badge className="text-xs" variant="outline">
                              {slot.isNight
                                ? hi
                                  ? "रात"
                                  : "Night"
                                : hi
                                  ? "दिन"
                                  : "Day"}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-700">
              {hi ? "यह भी देखें" : "Try Also"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {[
              { to: "/panchang", label: hi ? "दो घटी" : "Do Ghati" },
              { to: "/panchang", label: hi ? "लग्न" : "Lagna" },
              { to: "/panchang", label: hi ? "शुभ योग" : "Auspicious Yogas" },
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
