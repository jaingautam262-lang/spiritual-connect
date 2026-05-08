import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Info, Star } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const LAGNA_DATA = [
  {
    sign: "Aries",
    hindi: "मेष",
    lord: "Mars",
    nature: "Fiery, Active",
    activities: [
      "Starting new ventures",
      "Sports & exercise",
      "Leadership actions",
    ],
    degree: "0°",
  },
  {
    sign: "Taurus",
    hindi: "वृषभ",
    lord: "Venus",
    nature: "Earthy, Stable",
    activities: ["Finance & investment", "Art & luxury", "Real estate"],
    degree: "30°",
  },
  {
    sign: "Gemini",
    hindi: "मिथुन",
    lord: "Mercury",
    nature: "Airy, Dual",
    activities: ["Communication", "Writing & learning", "Short travel"],
    degree: "60°",
  },
  {
    sign: "Cancer",
    hindi: "कर्क",
    lord: "Moon",
    nature: "Watery, Emotional",
    activities: ["Family matters", "Home activities", "Emotional healing"],
    degree: "90°",
  },
  {
    sign: "Leo",
    hindi: "सिंह",
    lord: "Sun",
    nature: "Fiery, Royal",
    activities: ["Government work", "Public appearances", "Creative projects"],
    degree: "120°",
  },
  {
    sign: "Virgo",
    hindi: "कन्या",
    lord: "Mercury",
    nature: "Earthy, Analytical",
    activities: ["Health matters", "Detailed work", "Service & healing"],
    degree: "150°",
  },
  {
    sign: "Libra",
    hindi: "तुला",
    lord: "Venus",
    nature: "Airy, Balanced",
    activities: ["Partnerships", "Legal matters", "Social events"],
    degree: "180°",
  },
  {
    sign: "Scorpio",
    hindi: "वृश्चिक",
    lord: "Mars/Ketu",
    nature: "Watery, Intense",
    activities: ["Research", "Spiritual practices", "Transformation"],
    degree: "210°",
  },
  {
    sign: "Sagittarius",
    hindi: "धनु",
    lord: "Jupiter",
    nature: "Fiery, Expansive",
    activities: ["Long journeys", "Higher education", "Religious activities"],
    degree: "240°",
  },
  {
    sign: "Capricorn",
    hindi: "मकर",
    lord: "Saturn",
    nature: "Earthy, Disciplined",
    activities: ["Career moves", "Hard work", "Structure & discipline"],
    degree: "270°",
  },
  {
    sign: "Aquarius",
    hindi: "कुंभ",
    lord: "Saturn/Rahu",
    nature: "Airy, Innovative",
    activities: ["Social causes", "Technology", "Networking"],
    degree: "300°",
  },
  {
    sign: "Pisces",
    hindi: "मीन",
    lord: "Jupiter/Ketu",
    nature: "Watery, Spiritual",
    activities: ["Spiritual practices", "Meditation", "Charitable works"],
    degree: "330°",
  },
];

const DASHA_PLANETS = [
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
  "Ketu",
  "Venus",
];

function calculateLagna(
  time: string,
  sunriseTime = "06:00",
): { sign: (typeof LAGNA_DATA)[0]; degree: number; lagnaIdx: number } {
  const [sh, sm] = sunriseTime.split(":").map(Number);
  const [th, tm] = time.split(":").map(Number);
  const sunriseMins = sh * 60 + sm;
  const timeMins = th * 60 + tm;
  const minsAfterSunrise = (timeMins - sunriseMins + 1440) % 1440;
  // Each sign ~120 minutes (2 hours)
  const lagnaIdx = Math.floor(minsAfterSunrise / 120) % 12;
  const degreeWithinSign = ((minsAfterSunrise % 120) / 120) * 30;
  return { sign: LAGNA_DATA[lagnaIdx], degree: degreeWithinSign, lagnaIdx };
}

export default function LagnaCalculator() {
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
  const [city, setCity] = useState("Delhi");
  const [sunrise, setSunrise] = useState("06:05");
  const [result, setResult] = useState<ReturnType<
    typeof calculateLagna
  > | null>(null);

  function calculate() {
    setResult(calculateLagna(time, sunrise));
  }

  const natureColors: Record<string, string> = {
    "Fiery, Active": "text-red-700 bg-red-50",
    "Fiery, Royal": "text-red-700 bg-red-50",
    "Fiery, Expansive": "text-orange-700 bg-orange-50",
    "Earthy, Stable": "text-green-700 bg-green-50",
    "Earthy, Analytical": "text-green-700 bg-green-50",
    "Earthy, Disciplined": "text-stone-700 bg-stone-50",
    "Airy, Dual": "text-blue-700 bg-blue-50",
    "Airy, Balanced": "text-sky-700 bg-sky-50",
    "Airy, Innovative": "text-indigo-700 bg-indigo-50",
    "Watery, Emotional": "text-cyan-700 bg-cyan-50",
    "Watery, Intense": "text-purple-700 bg-purple-50",
    "Watery, Spiritual": "text-violet-700 bg-violet-50",
  };

  const signEmojis = [
    "♈",
    "♉",
    "♊",
    "♋",
    "♌",
    "♍",
    "♎",
    "♏",
    "♐",
    "♑",
    "♒",
    "♓",
  ];

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
            <span>{hi ? "लग्न कैलकुलेटर" : "Lagna Calculator"}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "लग्न (उदय राशि) कैलकुलेटर" : "Lagna (Ascendant) Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "सूर्योदय से वर्तमान लग्न की गणना"
              : "Calculate current Lagna from sunrise offset"}
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
                  ? "लग्न वह राशि है जो पूर्वी क्षितिज पर उदय होती है। यह हर ~2 घंटे में बदलती है। सही लग्न में कार्य शुरू करने से उत्तम परिणाम मिलते हैं।"
                  : "Lagna is the zodiac sign rising on the eastern horizon. It changes every ~2 hours. Starting work in the right Lagna gives excellent results."}
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
                <Label className="text-amber-700">{hi ? "शहर" : "City"}</Label>
                <Input
                  placeholder="e.g. Delhi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
            </div>
            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="lagna.submit_button"
            >
              {hi ? "लग्न देखें" : "Calculate Lagna"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-2 border-amber-500 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                {hi ? "वर्तमान लग्न" : "Current Lagna"}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="text-center">
                <div className="text-5xl mb-2">
                  {signEmojis[result.lagnaIdx]}
                </div>
                <div className="text-3xl font-bold text-amber-800">
                  {result.sign.sign}
                </div>
                <div className="text-xl text-amber-600">
                  {result.sign.hindi}
                </div>
                <div className="text-amber-500 text-sm mt-1">
                  {result.degree.toFixed(1)}° in {result.sign.sign}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-muted-foreground">
                    {hi ? "स्वामी ग्रह" : "Ruling Planet"}
                  </div>
                  <div className="font-bold text-amber-800">
                    {result.sign.lord}
                  </div>
                </div>
                <div
                  className={`rounded-lg p-3 text-center ${natureColors[result.sign.nature] ?? "bg-amber-50"}`}
                >
                  <div className="text-xs text-muted-foreground">
                    {hi ? "प्रकृति" : "Nature"}
                  </div>
                  <div className="font-bold">{result.sign.nature}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-amber-700 mb-2">
                  {hi ? "अनुकूल कार्य" : "Favorable Activities"}
                </div>
                <ul className="space-y-1">
                  {result.sign.activities.map((a, _i) => (
                    <li key={a} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold text-amber-700 mb-2">
                  {hi ? "12 लग्न एवं समय" : "All 12 Lagnas & Timing"}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {LAGNA_DATA.map((l, i) => (
                    <div
                      key={l.sign}
                      className={`text-xs rounded p-1.5 text-center border ${
                        i === result.lagnaIdx
                          ? "bg-amber-500 text-white border-amber-600"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                      data-ocid={`lagna.item.${i + 1}`}
                    >
                      <div>
                        {signEmojis[i]} {l.sign}
                      </div>
                      <div className="text-[10px] opacity-75">{l.hindi}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                <b>{hi ? "लग्न दशा अवधि:" : "Lagna Dasha Period:"}</b>{" "}
                {hi ? "अभी" : "Currently"} {DASHA_PLANETS[result.lagnaIdx % 9]}{" "}
                {hi ? "दशा चल रही है" : "Dasha is active"}
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
              { to: "/panchang", label: hi ? "होरा" : "Hora" },
              { to: "/panchang", label: hi ? "पंचक रहित" : "Panchaka Rahita" },
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
