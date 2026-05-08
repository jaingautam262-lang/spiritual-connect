import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Info, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const GHATI_DATA = [
  {
    name: "Pratah Sandhya",
    hindi: "प्रातः संध्या",
    lord: "Sun",
    meaning: "Dawn twilight",
    nature: "auspicious",
    activity: "Prayer, meditation, new beginnings",
  },
  {
    name: "Vaidhrita",
    hindi: "वैधृत",
    lord: "Saturn",
    meaning: "Upholding duty",
    nature: "neutral",
    activity: "Study, contemplation",
  },
  {
    name: "Amrit",
    hindi: "अमृत",
    lord: "Moon",
    meaning: "Divine nectar",
    nature: "auspicious",
    activity: "All auspicious works, healing, medicine",
  },
  {
    name: "Labha",
    hindi: "लाभ",
    lord: "Mercury",
    meaning: "Profit & gain",
    nature: "auspicious",
    activity: "Business, trade, investments",
  },
  {
    name: "Chara",
    hindi: "चर",
    lord: "Venus",
    meaning: "Movement",
    nature: "auspicious",
    activity: "Travel, change, creative work",
  },
  {
    name: "Roga",
    hindi: "रोग",
    lord: "Mars",
    meaning: "Disease",
    nature: "inauspicious",
    activity: "Avoid important works, rest",
  },
  {
    name: "Kala",
    hindi: "काल",
    lord: "Saturn",
    meaning: "Time/Death",
    nature: "inauspicious",
    activity: "Avoid auspicious events",
  },
  {
    name: "Udvega",
    hindi: "उद्वेग",
    lord: "Sun",
    meaning: "Anxiety",
    nature: "inauspicious",
    activity: "Avoid decisions, government work",
  },
];

function timeToMins(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minsToTime(mins: number): string {
  const h = Math.floor((((mins % 1440) + 1440) % 1440) / 60);
  const m = (((mins % 1440) + 1440) % 1440) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

interface GhatiSlot {
  idx: number;
  name: string;
  hindi: string;
  lord: string;
  meaning: string;
  nature: string;
  activity: string;
  start: string;
  end: string;
}

function buildGhatiTimeline(sunrise: string, sunset: string): GhatiSlot[] {
  const sr = timeToMins(sunrise);
  const ss = timeToMins(sunset);
  const duration = (ss - sr) / 8;
  return GHATI_DATA.map((g, i) => ({
    ...g,
    idx: i,
    start: minsToTime(sr + i * duration),
    end: minsToTime(sr + (i + 1) * duration),
  }));
}

function getCurrentGhati(
  slots: GhatiSlot[],
  inputTime: string,
): GhatiSlot | null {
  const tm = timeToMins(inputTime);
  return (
    slots.find((s) => tm >= timeToMins(s.start) && tm < timeToMins(s.end)) ??
    null
  );
}

function formatCountdown(target: string, current: string): string {
  const diff = timeToMins(target) - timeToMins(current);
  if (diff <= 0) return "Passed";
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function DoGhatiCalculator() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const defaultTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  const defaultDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);
  const [location, setLocation] = useState("Delhi");
  const [sunrise, setSunrise] = useState("06:05");
  const [result, setResult] = useState<{
    slots: GhatiSlot[];
    current: GhatiSlot | null;
  } | null>(null);
  const [_ticker, setTicker] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTicker((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  function calculate() {
    const sunset = "18:30";
    const slots = buildGhatiTimeline(sunrise, sunset);
    const current = getCurrentGhati(slots, time);
    setResult({ slots, current });
  }

  const natureColor: Record<string, string> = {
    auspicious: "bg-green-100 text-green-800 border-green-300",
    inauspicious: "bg-red-100 text-red-800 border-red-300",
    neutral: "bg-amber-100 text-amber-800 border-amber-300",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
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
            <span>{hi ? "दो घटी" : "Do Ghati"}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "दो घटी कैलकुलेटर" : "Do Ghati Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "वैदिक दिन के 8 घटी खंडों का विश्लेषण"
              : "Vedic analysis of the 8 Ghati segments of the day"}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Info box */}
        <Card className="border-amber-200 bg-amber-50/70">
          <CardContent className="pt-4 pb-3">
            <div className="flex gap-2">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <b>{hi ? "दो घटी क्या है?" : "What is Do Ghati?"}</b>{" "}
                {hi
                  ? "वैदिक ज्योतिष में दिन को 8 घटी (प्रत्येक ~1.5 घंटे) में विभाजित किया जाता है। प्रत्येक घटी का एक ग्रह स्वामी होता है और वह शुभ, अशुभ या तटस्थ हो सकती है। सही घटी में कार्य करने से सफलता बढ़ती है।"
                  : "In Vedic astrology, the day is divided into 8 Ghatis (each ~1.5 hours). Each Ghati has a planetary lord and is auspicious, inauspicious, or neutral. Acting in the right Ghati increases success."}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input form */}
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
                  {hi ? "स्थान" : "Location"}
                </Label>
                <Input
                  placeholder="e.g. Delhi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border-amber-300"
                />
              </div>
              <div>
                <Label className="text-amber-700">
                  {hi ? "सूर्योदय (HH:MM)" : "Sunrise (HH:MM)"}
                </Label>
                <Input
                  type="time"
                  value={sunrise}
                  onChange={(e) => setSunrise(e.target.value)}
                  className="border-amber-300"
                />
              </div>
            </div>
            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="do-ghati.submit_button"
            >
              {hi ? "घटी देखें" : "Calculate Ghati"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <>
            {result.current && (
              <Card className="border-2 border-amber-500 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    {hi ? "वर्तमान घटी" : "Current Ghati"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-2xl font-bold text-amber-800">
                      {result.current.name}
                    </span>
                    <span className="text-lg text-amber-600">
                      {result.current.hindi}
                    </span>
                    <Badge
                      className={`${natureColor[result.current.nature]} border`}
                    >
                      {hi
                        ? result.current.nature === "auspicious"
                          ? "शुभ"
                          : result.current.nature === "inauspicious"
                            ? "अशुभ"
                            : "तटस्थ"
                        : result.current.nature}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        {hi ? "ग्रह स्वामी:" : "Planet Lord:"}
                      </span>{" "}
                      <b>{result.current.lord}</b>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        {hi ? "अर्थ:" : "Meaning:"}
                      </span>{" "}
                      <b>
                        {hi ? result.current.hindi : result.current.meaning}
                      </b>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        {hi ? "समय:" : "Time:"}
                      </span>{" "}
                      <b>
                        {result.current.start} – {result.current.end}
                      </b>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-muted-foreground">
                        {hi ? "अगली घटी:" : "Next Ghati:"}
                      </span>{" "}
                      <b>{formatCountdown(result.current.end, time)}</b>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
                    <b>{hi ? "सुझाई गतिविधि:" : "Recommended Activity:"}</b>{" "}
                    {result.current.activity}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Full timeline */}
            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-800">
                  {hi ? "दिन की संपूर्ण घटी समय-रेखा" : "Full Day Ghati Timeline"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-amber-100">
                  {result.slots.map((slot, i) => {
                    const active = result.current?.idx === i;
                    return (
                      <div
                        key={slot.name}
                        className={`flex items-center gap-3 px-4 py-3 ${active ? "bg-amber-100" : ""}`}
                        data-ocid={`do-ghati.item.${i + 1}`}
                      >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-amber-200 text-amber-800">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-amber-900">
                              {slot.name}
                            </span>
                            <span className="text-amber-600 text-xs">
                              {slot.hindi}
                            </span>
                            {active && (
                              <Badge className="bg-amber-500 text-white text-xs">
                                Now
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {slot.start} – {slot.end} | {slot.lord}
                          </div>
                        </div>
                        <Badge
                          className={`${natureColor[slot.nature]} border text-xs`}
                        >
                          {hi
                            ? slot.nature === "auspicious"
                              ? "शुभ"
                              : slot.nature === "inauspicious"
                                ? "अशुभ"
                                : "तटस्थ"
                            : slot.nature}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Try Also */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-700">
              {hi ? "यह भी देखें" : "Try Also"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {[
              {
                to: "/panchang",
                label: hi ? "होरा कैलकुलेटर" : "Hora Calculator",
              },
              {
                to: "/panchang",
                label: hi ? "लग्न कैलकुलेटर" : "Lagna Calculator",
              },
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
