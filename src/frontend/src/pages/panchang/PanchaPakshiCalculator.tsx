import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Info } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

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
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishtha",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

const BIRDS = [
  {
    name: "Vulture",
    hindi: "गिद्ध",
    emoji: "🦅",
    color: "bg-slate-100 border-slate-300",
  },
  {
    name: "Owl",
    hindi: "उल्लू",
    emoji: "🦉",
    color: "bg-purple-100 border-purple-300",
  },
  {
    name: "Crow",
    hindi: "कौआ",
    emoji: "🐦",
    color: "bg-gray-100 border-gray-300",
  },
  {
    name: "Cock",
    hindi: "मुर्गा",
    emoji: "🐓",
    color: "bg-red-100 border-red-300",
  },
  {
    name: "Peacock",
    hindi: "मोर",
    emoji: "🦚",
    color: "bg-blue-100 border-blue-300",
  },
];

const ACTIVITIES = ["Ruling", "Eating", "Walking", "Sleeping", "Dying"];
const ACTIVITY_QUALITY: Record<string, { label: string; color: string }> = {
  Ruling: { label: "Very Good", color: "text-green-700 bg-green-50" },
  Eating: { label: "Good", color: "text-lime-700 bg-lime-50" },
  Walking: { label: "Average", color: "text-amber-700 bg-amber-50" },
  Sleeping: { label: "Bad", color: "text-orange-700 bg-orange-50" },
  Dying: { label: "Very Bad", color: "text-red-700 bg-red-50" },
};

// Nakshatra → Bird group (Vulture=0,Owl=1,Crow=2,Cock=3,Peacock=4)
const NAKSHATRA_BIRD_BASE = [
  0, 3, 1, 4, 2, 0, 3, 1, 4, 2, 0, 3, 1, 4, 2, 0, 3, 1, 4, 2, 0, 3, 1, 4, 2, 0,
  3,
];

// Day of week → activity starting position for first bird
const DAY_ACTIVITY_START: Record<number, number> = {
  0: 0,
  1: 2,
  2: 4,
  3: 1,
  4: 3,
  5: 0,
  6: 2,
};

interface BirdSlot {
  birdIdx: number;
  activityIdx: number;
  start: string;
  end: string;
}

function buildBirdCycle(
  date: string,
  nakshatra: string,
  sunrise: string,
  sunset: string,
): BirdSlot[] {
  const wd = new Date(date).getDay();
  const nakIdx = NAKSHATRAS.indexOf(nakshatra);
  const baseBird = NAKSHATRA_BIRD_BASE[nakIdx >= 0 ? nakIdx : 0];
  const actStart = DAY_ACTIVITY_START[wd] ?? 0;

  const srMins =
    Number.parseInt(sunrise.split(":")[0]) * 60 +
    Number.parseInt(sunrise.split(":")[1]);
  const ssMins =
    Number.parseInt(sunset.split(":")[0]) * 60 +
    Number.parseInt(sunset.split(":")[1]);
  const segDuration = (ssMins - srMins) / 5;

  return Array.from({ length: 5 }, (_, i) => ({
    birdIdx: (baseBird + i) % 5,
    activityIdx: (actStart + i) % 5,
    start: minsToTime(srMins + i * segDuration),
    end: minsToTime(srMins + (i + 1) * segDuration),
  }));
}

function minsToTime(mins: number): string {
  const h = Math.floor((((mins % 1440) + 1440) % 1440) / 60);
  const m = (((mins % 1440) + 1440) % 1440) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function getCurrentSlot(slots: BirdSlot[], time: string): BirdSlot | null {
  const [h, m] = time.split(":").map(Number);
  const mins = h * 60 + m;
  const [_sh, _sm] = slots[0]?.start.split(":").map(Number) ?? [6, 0];
  return (
    slots.find((s) => {
      const st =
        Number.parseInt(s.start.split(":")[0]) * 60 +
        Number.parseInt(s.start.split(":")[1]);
      const en =
        Number.parseInt(s.end.split(":")[0]) * 60 +
        Number.parseInt(s.end.split(":")[1]);
      return mins >= st && mins < en;
    }) ?? null
  );
}

const NAKSHATRA_ADVICE: Record<string, string> = {
  Ashwini:
    "Focus on new beginnings; Ruling period is exceptionally powerful for you.",
  Rohini:
    "Creative and artistic works flourish; avoid confrontations during Dying phase.",
  Pushya: "Excellent day for spiritual practices and family matters.",
  Chitra:
    "Strong potential for artistic success; leverage Ruling and Eating periods.",
  Vishakha:
    "Competitive spirit is high; use Ruling period for important negotiations.",
  Shravana:
    "Learning and listening bring gains; be mindful during Dying phase.",
};

export default function PanchaPakshiCalculator() {
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
  const [nakshatra, setNakshatra] = useState("Rohini");
  const [sunrise, setSunrise] = useState("06:05");
  const [sunset, setSunset] = useState("18:30");
  const [slots, setSlots] = useState<BirdSlot[]>([]);
  const [current, setCurrent] = useState<BirdSlot | null>(null);

  function calculate() {
    const s = buildBirdCycle(date, nakshatra, sunrise, sunset);
    setSlots(s);
    setCurrent(getCurrentSlot(s, time));
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
            <span>Pancha Pakshi</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "पंच पक्षी कैलकुलेटर" : "Pancha Pakshi Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "दक्षिण भारतीय पक्षी प्रणाली — 5 पक्षी, 5 गतिविधियाँ"
              : "South Indian Bird System — 5 Birds, 5 Activities"}
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
                  ? "पंच पक्षी शास्त्र दक्षिण भारत की प्राचीन ज्योतिष पद्धति है। जन्म नक्षत्र के आधार पर दिन को 5 भागों में विभाजित किया जाता है, प्रत्येक में एक पक्षी सक्रिय रहता है।"
                  : "Pancha Pakshi Shastra is an ancient South Indian astrology system. Based on birth nakshatra, the day is divided into 5 segments, each with an active bird."}
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
              <div className="col-span-2">
                <Label className="text-amber-700">
                  {hi ? "जन्म नक्षत्र" : "Birth Nakshatra"}
                </Label>
                <Select value={nakshatra} onValueChange={setNakshatra}>
                  <SelectTrigger
                    className="border-amber-300"
                    data-ocid="pancha-pakshi.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NAKSHATRAS.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              data-ocid="pancha-pakshi.submit_button"
            >
              {hi ? "पक्षी देखें" : "Calculate Bird Cycle"}
            </Button>
          </CardContent>
        </Card>

        {slots.length > 0 && (
          <>
            {current && (
              <Card className="border-2 border-amber-500 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                  <CardTitle>{hi ? "अभी सक्रिय" : "Currently Active"}</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">
                      {BIRDS[current.birdIdx].emoji}
                    </span>
                    <div>
                      <div className="text-2xl font-bold text-amber-800">
                        {BIRDS[current.birdIdx].name} {hi ? "पक्षी" : "Bird"}
                      </div>
                      <div className="text-amber-600">
                        {BIRDS[current.birdIdx].hindi}
                      </div>
                      <Badge
                        className={`mt-1 ${ACTIVITY_QUALITY[ACTIVITIES[current.activityIdx]].color}`}
                      >
                        {ACTIVITIES[current.activityIdx]} —{" "}
                        {
                          ACTIVITY_QUALITY[ACTIVITIES[current.activityIdx]]
                            .label
                        }
                      </Badge>
                    </div>
                  </div>
                  {NAKSHATRA_ADVICE[nakshatra] && (
                    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                      <b>{hi ? "व्यक्तिगत सलाह:" : "Personal Advice:"}</b>{" "}
                      {NAKSHATRA_ADVICE[nakshatra]}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-800">
                  {hi ? "आज का पक्षी चक्र" : "Today's Bird Cycle"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {slots.map((slot, i) => {
                  const bird = BIRDS[slot.birdIdx];
                  const act = ACTIVITIES[slot.activityIdx];
                  const isActive =
                    current?.birdIdx === slot.birdIdx &&
                    current?.activityIdx === slot.activityIdx;
                  return (
                    <div
                      key={slot.birdIdx * 10 + slot.activityIdx}
                      className={`flex items-center gap-3 rounded-lg border p-3 ${isActive ? "border-amber-500 bg-amber-100" : bird.color}`}
                      data-ocid={`pancha-pakshi.item.${i + 1}`}
                    >
                      <span className="text-3xl">{bird.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-amber-900">
                          {bird.name} ({bird.hindi})
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {slot.start} – {slot.end}
                        </div>
                      </div>
                      <Badge
                        className={`${ACTIVITY_QUALITY[act].color} border text-xs`}
                      >
                        {act}
                      </Badge>
                      {isActive && (
                        <Badge className="bg-amber-500 text-white text-xs">
                          Now
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
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
              { to: "/panchang", label: hi ? "होरा" : "Hora" },
              { to: "/panchang", label: hi ? "दो घटी" : "Do Ghati" },
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
