import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Info } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

// Lo Shu Grid standard layout: [4][9][2] / [3][5][7] / [8][1][6]
const GRID_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

const DIGIT_INFO: Record<
  number,
  {
    plane: string;
    aspect: string;
    present: string;
    missing: string;
    remedy: string;
    gemstone: string;
    mantra: string;
    color: string;
  }
> = {
  1: {
    plane: "Practical",
    aspect: "Leadership & Communication",
    present: "Strong communicator, confident leader",
    missing: "Lacks confidence, difficulty expressing",
    remedy: "Wear red",
    gemstone: "Ruby",
    mantra: "Om Suryaya Namah",
    color: "bg-red-100 text-red-800",
  },
  2: {
    plane: "Intuitive",
    aspect: "Intuition & Sensitivity",
    present: "Highly intuitive, empathetic",
    missing: "Emotional imbalance, distrust of instincts",
    remedy: "Wear pearl or white",
    gemstone: "Pearl",
    mantra: "Om Chandraya Namah",
    color: "bg-blue-100 text-blue-800",
  },
  3: {
    plane: "Mental",
    aspect: "Action & Intellect",
    present: "Sharp mind, action-oriented",
    missing: "Lack of motivation, analysis paralysis",
    remedy: "Wear yellow",
    gemstone: "Yellow Sapphire",
    mantra: "Om Gurave Namah",
    color: "bg-yellow-100 text-yellow-800",
  },
  4: {
    plane: "Mental",
    aspect: "Organization & Memory",
    present: "Organized, disciplined, systematic",
    missing: "Disorganized, forgetful",
    remedy: "Wear green plants",
    gemstone: "Emerald",
    mantra: "Om Budhaya Namah",
    color: "bg-green-100 text-green-800",
  },
  5: {
    plane: "Both",
    aspect: "Balance & Freedom",
    present: "Balanced, adaptable",
    missing: "Emotional instability, scattered energy",
    remedy: "Wear yellow",
    gemstone: "Citrine",
    mantra: "Om Namah Shivaya",
    color: "bg-amber-100 text-amber-800",
  },
  6: {
    plane: "Intuitive",
    aspect: "Creativity & Home",
    present: "Creative, nurturing, family-oriented",
    missing: "Neglects home/family, lacks creativity",
    remedy: "Wear white",
    gemstone: "Diamond",
    mantra: "Om Shukraya Namah",
    color: "bg-pink-100 text-pink-800",
  },
  7: {
    plane: "Practical",
    aspect: "Sacrifices & Learning",
    present: "Deep learner, philosophical",
    missing: "Tendency to complain, difficulty learning",
    remedy: "Wear blue",
    gemstone: "Blue Sapphire",
    mantra: "Om Shanaye Namah",
    color: "bg-slate-100 text-slate-800",
  },
  8: {
    plane: "Intuitive",
    aspect: "Wisdom & Experience",
    present: "Wise through experience, persistent",
    missing: "Misjudgment, repeated mistakes",
    remedy: "Wear orange",
    gemstone: "Hessonite",
    mantra: "Om Rahave Namah",
    color: "bg-orange-100 text-orange-800",
  },
  9: {
    plane: "Mental",
    aspect: "Ambition & Idealism",
    present: "High ideals, humanitarian, ambitious",
    missing: "Frustration, unrealistic expectations",
    remedy: "Wear coral/red",
    gemstone: "Coral",
    mantra: "Om Mangalaya Namah",
    color: "bg-rose-100 text-rose-800",
  },
};

const LUCKY_DAYS: Record<number, string> = {
  1: "Sunday",
  2: "Monday",
  3: "Thursday",
  4: "Wednesday",
  5: "Multiple",
  6: "Friday",
  7: "Saturday",
  8: "Saturday",
  9: "Tuesday",
};

function buildLoShuGrid(digits: number[]): Record<number, number> {
  const freq: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };
  for (const d of digits) if (d >= 1 && d <= 9) freq[d]++;
  return freq;
}

function parseDigits(input: string): number[] {
  return input
    .replace(/\D/g, "")
    .split("")
    .map(Number)
    .filter((n) => n >= 1 && n <= 9);
}

function calcCompatibility(freq: Record<number, number>): number {
  const present = Object.values(freq).filter((v) => v > 0).length;
  const balanced = Object.values(freq).filter((v) => v === 1 || v === 2).length;
  return Math.round((present / 9) * 50 + (balanced / 9) * 50);
}

interface LoShuResult {
  freq: Record<number, number>;
  missing: number[];
  dominant: number[];
  compatibility: number;
  luckyDays: string[];
}

export default function LoShuGridCalculator() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<LoShuResult | null>(null);

  function calculate() {
    const digits = parseDigits(mobile + dob.replace(/-/g, ""));
    if (digits.length === 0) return;
    const freq = buildLoShuGrid(digits);
    const missing = Object.entries(freq)
      .filter(([, v]) => v === 0)
      .map(([k]) => Number.parseInt(k));
    const dominant = Object.entries(freq)
      .filter(([, v]) => v >= 3)
      .map(([k]) => Number.parseInt(k));
    const compatibility = calcCompatibility(freq);
    const luckyDays = [
      ...new Set(dominant.map((d) => LUCKY_DAYS[d]).filter(Boolean)),
    ];
    setResult({ freq, missing, dominant, compatibility, luckyDays });
  }

  const planeNames: Record<string, string> = {
    Mental: hi ? "मानसिक तल" : "Mental Plane",
    Practical: hi ? "व्यावहारिक तल" : "Practical Plane",
    Intuitive: hi ? "आध्यात्मिक तल" : "Intuitive Plane",
    Both: hi ? "केंद्र" : "Center",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-amber-200 mb-3 flex items-center gap-1">
            <Link to="/" className="hover:text-white">
              🏠
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/astrology/calculators" className="hover:text-white">
              {hi ? "कैलकुलेटर" : "Calculators"}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span>Lo Shu Grid</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "लो शु ग्रिड कैलकुलेटर" : "Lo Shu Grid Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "मोबाइल / डोब से व्यक्तित्व विश्लेषण"
              : "Mobile/DOB number personality analysis"}
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
                  ? "लो शु ग्रिड प्राचीन चीनी यिन-यांग नंबर विश्लेषण है। आपके मोबाइल नंबर के अंक 3×3 ग्रिड में रखे जाते हैं।"
                  : "Lo Shu Grid is an ancient Chinese numerology system. Digits from your mobile/DOB are placed in a 3×3 grid to reveal personality patterns."}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800">
              {hi ? "विवरण दर्ज करें" : "Enter Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-amber-700">
                {hi ? "मोबाइल नंबर (10 अंक)" : "Mobile Number (10 digits)"}
              </Label>
              <Input
                placeholder="9876543210"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="border-amber-300"
                data-ocid="lo-shu.mobile_input"
              />
            </div>
            <div>
              <Label className="text-amber-700">
                {hi ? "नाम (वैकल्पिक)" : "Name (optional)"}
              </Label>
              <Input
                placeholder={hi ? "आपका नाम" : "Your name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-amber-300"
              />
            </div>
            <div>
              <Label className="text-amber-700">
                {hi ? "जन्म तिथि (वैकल्पिक)" : "Date of Birth (optional)"}
              </Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="border-amber-300"
              />
            </div>
            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="lo-shu.submit_button"
              disabled={!mobile}
            >
              {hi ? "ग्रिड देखें" : "Generate Lo Shu Grid"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card className="border-2 border-amber-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle>
                  {name ? `${name} — ` : ""}
                  {hi ? "Lo Shu ग्रिड" : "Lo Shu Grid"}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-6">
                  <div className="grid grid-cols-3 gap-2">
                    {GRID_LAYOUT.map((row, ri) =>
                      row.map((num, _ci) => {
                        const count = result.freq[num];
                        const isMissing = count === 0;
                        const isDominant = count >= 3;
                        return (
                          <div
                            key={`${ri}-${num}`}
                            className={`w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 font-bold transition-all ${
                              isMissing
                                ? "border-dashed border-red-300 bg-red-50 text-red-400"
                                : isDominant
                                  ? "border-amber-500 bg-amber-500 text-white shadow-md"
                                  : "border-amber-300 bg-amber-50 text-amber-800"
                            }`}
                            data-ocid={`lo-shu.grid.${num}`}
                          >
                            <div className="text-2xl">
                              {isMissing
                                ? ""
                                : num.toString().repeat(Math.min(count, 4))}
                            </div>
                            <div
                              className={`text-xs mt-1 ${isMissing ? "text-red-400" : isDominant ? "text-amber-100" : "text-amber-500"}`}
                            >
                              {isMissing
                                ? hi
                                  ? "अनुपस्थित"
                                  : "Missing"
                                : `×${count}`}
                            </div>
                          </div>
                        );
                      }),
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center mb-4">
                  <div className="bg-amber-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-amber-700">
                      {result.compatibility}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {hi ? "संगतता" : "Compatibility"}
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-red-700">
                      {result.missing.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {hi ? "अनुपस्थित अंक" : "Missing Digits"}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-xl font-bold text-green-700">
                      {result.dominant.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {hi ? "प्रभावी अंक" : "Dominant Digits"}
                    </div>
                  </div>
                </div>

                {result.luckyDays.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-amber-700">
                      {hi ? "शुभ दिन:" : "Lucky Days:"}
                    </span>
                    {result.luckyDays.map((d) => (
                      <Badge
                        key={d}
                        className="bg-amber-100 text-amber-800 border border-amber-300"
                      >
                        {d}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {result.missing.length > 0 && (
              <Card className="border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-700 text-base">
                    {hi ? "अनुपस्थित अंकों के उपाय" : "Remedies for Missing Digits"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {result.missing.map((d) => {
                    const info = DIGIT_INFO[d];
                    return (
                      <div
                        key={d}
                        className={`rounded-lg border p-3 ${info.color}`}
                        data-ocid={`lo-shu.missing.${d}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-lg">{d}</span>
                          <span className="font-semibold">{info.aspect}</span>
                          <Badge variant="outline" className="text-xs">
                            {planeNames[info.plane]}
                          </Badge>
                        </div>
                        <div className="text-xs opacity-80">{info.missing}</div>
                        <div className="flex gap-3 mt-2 text-xs">
                          <span>💎 {info.gemstone}</span>
                          <span>📖 {info.mantra}</span>
                          <span>🎨 {info.remedy}</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {result.dominant.length > 0 && (
              <Card className="border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-amber-700 text-base">
                    {hi ? "प्रमुख शक्तियाँ" : "Dominant Strengths"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {result.dominant.map((d) => {
                    const info = DIGIT_INFO[d];
                    return (
                      <div
                        key={d}
                        className={`rounded-lg border p-3 ${info.color}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold">
                            {d} (x{result.freq[d]})
                          </span>
                          <span>{info.aspect}</span>
                        </div>
                        <div className="text-xs opacity-80">{info.present}</div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}
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
              {
                to: "/moolank-calculator",
                label: hi ? "मूलांक कैलकुलेटर" : "Moolank Calculator",
              },
              {
                to: "/astrology/calculators",
                label: hi ? "कैरियर संभावना" : "Career Potential",
              },
              {
                to: "/astrology/calculators",
                label: hi ? "धन योग" : "Wealth Calculator",
              },
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
