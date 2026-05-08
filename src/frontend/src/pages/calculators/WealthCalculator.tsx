import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { ChevronRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

function calcMoolank(dob: string): number {
  const day = new Date(dob).getDate();
  let sum = day;
  while (sum > 9)
    sum = String(sum)
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  return sum;
}

function getLoShuFreq(dob: string): Record<number, number> {
  const digits = dob
    .replace(/-/g, "")
    .split("")
    .map(Number)
    .filter((n) => n >= 1 && n <= 9);
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
  for (const d of digits) freq[d]++;
  return freq;
}

// Practical plane = middle row of Lo Shu: positions 3, 5, 7
function getPracticalPlane(freq: Record<number, number>): {
  score: number;
  desc: string;
} {
  const total = freq[3] + freq[5] + freq[7];
  if (total === 0)
    return {
      score: 0,
      desc: "Practical plane empty — wealth may come through others' effort",
    };
  if (total <= 2)
    return { score: 40, desc: "Some practical energy — steady effort needed" };
  if (total <= 5)
    return {
      score: 70,
      desc: "Good practical foundation — consistent wealth is possible",
    };
  return { score: 95, desc: "Strong practical plane — natural wealth builder" };
}

interface WealthResult {
  moolank: number;
  silverYog: boolean;
  silverYogReason: string;
  practicalPlane: { score: number; desc: string };
  wealthType: string;
  wealthTypeHi: string;
  strategy: string;
  strategyHi: string;
  phases: string[];
  phasesHi: string[];
  remedies: { gemstone: string; ritual: string; vastu: string };
  peakPeriod: string;
  peakPeriodHi: string;
}

const WEALTH_TYPES: Record<
  number,
  { type: string; typeHi: string; strategy: string; strategyHi: string }
> = {
  1: {
    type: "Earned / Self-made",
    typeHi: "अर्जित / स्व-निर्मित",
    strategy: "Leadership roles and entrepreneurship create maximum wealth",
    strategyHi: "नेतृत्व और उद्यमशीलता अधिकतम धन सृजित करती है",
  },
  2: {
    type: "Partnership / Service",
    typeHi: "साझेदारी / सेवा",
    strategy: "Joint ventures and consulting amplify earnings",
    strategyHi: "साझेदारी और परामर्श से आय बढ़ती है",
  },
  3: {
    type: "Creative / Multiple Income",
    typeHi: "सृजनात्मक / बहुगुणी आय",
    strategy: "Diversify via content, media, IP and brand creation",
    strategyHi: "सामग्री, मीडिया और व्यापार से विविधता लाएं",
  },
  4: {
    type: "Steady / Investment-based",
    typeHi: "स्थिर / निवेश आधारित",
    strategy: "Real estate, SIPs, and systematic saving create lasting wealth",
    strategyHi: "अचल संपत्ति और नियमित निवेश से स्थायी धन",
  },
  5: {
    type: "Business / High Risk High Reward",
    typeHi: "व्यापार / उद्यम",
    strategy: "Trading, business ventures and innovation yield best returns",
    strategyHi: "व्यापार और नवाचार से श्रेष्ठ लाभ",
  },
  6: {
    type: "Inherited / Family Business",
    typeHi: "विरासत / पारिवारिक",
    strategy: "Family businesses and property management grow wealth",
    strategyHi: "पारिवारिक व्यापार और संपत्ति से धन वृद्धि",
  },
  7: {
    type: "Knowledge / Expertise",
    typeHi: "ज्ञान / विशेषज्ञता",
    strategy:
      "Deep specialization and intellectual property build wealth slowly but surely",
    strategyHi: "विशेषज्ञता से धन धीरे लेकिन सुरक्षित",
  },
  8: {
    type: "Power / Authority Wealth",
    typeHi: "शक्ति / अधिकार धन",
    strategy: "Corporate power and financial systems multiply wealth",
    strategyHi: "कॉर्पोरेट शक्ति से धन गुणित होता है",
  },
  9: {
    type: "Service / Social Capital",
    typeHi: "सेवा / सामाजिक पूंजी",
    strategy:
      "Institutional positions, government support and social impact create wealth",
    strategyHi: "संस्थागत पदों और सामाजिक प्रभाव से धन",
  },
};

const PHASES: Record<number, { phases: string[]; phasesHi: string[] }> = {
  1: {
    phases: [
      "Days 1-30: Set clear financial goals + open investment account",
      "Days 31-60: Start SIP + network with mentors",
      "Days 61-90: Apply for leadership role or start a side business",
    ],
    phasesHi: [
      "दिन 1-30: स्पष्ट वित्तीय लक्ष्य + निवेश खाता खोलें",
      "दिन 31-60: SIP शुरू + सलाहकार नेटवर्क",
      "दिन 61-90: नेतृत्व भूमिका या साइड बिजनेस शुरू करें",
    ],
  },
  2: {
    phases: [
      "Days 1-30: Build savings habit + identify partners",
      "Days 31-60: Explore joint ventures or freelancing",
      "Days 61-90: Formalize partnership or advisory contract",
    ],
    phasesHi: [
      "दिन 1-30: बचत आदत और साȦ ीदारों की पहचान",
      "दिन 31-60: साझेदारी खोजें",
      "दिन 61-90: समझौता लिखित करें",
    ],
  },
  3: {
    phases: [
      "Days 1-30: Create content or launch brand",
      "Days 31-60: Diversify income streams",
      "Days 61-90: Monetize skills with courses or consulting",
    ],
    phasesHi: [
      "दिन 1-30: सामग्री बनाएं या ब्रांड लॉच करें",
      "दिन 31-60: आय स्रोत विविध करें",
      "दिन 61-90: कौशल मुद्रीकरण करें",
    ],
  },
  4: {
    phases: [
      "Days 1-30: Review budget + cut wasteful spending",
      "Days 31-60: Open fixed deposit or real estate research",
      "Days 61-90: Automate savings and start SIP",
    ],
    phasesHi: [
      "दिन 1-30: बजट समीक्षा",
      "दिन 31-60: FD या अचल संपत्ति शोध",
      "दिन 61-90: SIP स्वचालित करें",
    ],
  },
  5: {
    phases: [
      "Days 1-30: Identify high ROI opportunity",
      "Days 31-60: Test with small capital",
      "Days 61-90: Scale what works, cut what doesn't",
    ],
    phasesHi: [
      "दिन 1-30: उच्च ROI अवसर खोजें",
      "दिन 31-60: छोटी पूंजी से परीक्षा",
      "दिन 61-90: सफल रणनीति बढ़ाएं",
    ],
  },
  6: {
    phases: [
      "Days 1-30: Family financial planning meeting",
      "Days 31-60: Review inherited assets and liabilities",
      "Days 61-90: Optimize existing family business revenue",
    ],
    phasesHi: [
      "दिन 1-30: पारिवारिक वित्त बैठक",
      "दिन 31-60: विरासती संपत्ति समीक्षा",
      "दिन 61-90: पारिवारिक व्यापार अनुकूलित करें",
    ],
  },
  7: {
    phases: [
      "Days 1-30: Upskill and certify in your domain",
      "Days 31-60: Write, teach or consult in your area",
      "Days 61-90: Publish research or launch online course",
    ],
    phasesHi: [
      "दिन 1-30: विशेषज्ञता विकसित करें",
      "दिन 31-60: लिखें, सिखाएं या सलाह दें",
      "दिन 61-90: ऑनलाइन कोर्स लॉच करें",
    ],
  },
  8: {
    phases: [
      "Days 1-30: Audit all income and debt",
      "Days 31-60: Restructure high-interest debt",
      "Days 61-90: Take a calculated risk in business or equity",
    ],
    phasesHi: [
      "दिन 1-30: आय और रिण ऑडिट",
      "दिन 31-60: उच्च ब्याज रिण पुनर्गठित",
      "दिन 61-90: व्यापार में सोचा-समझा जोखिम",
    ],
  },
  9: {
    phases: [
      "Days 1-30: Give and service (opens karma channels)",
      "Days 31-60: Apply for grants, government schemes or contracts",
      "Days 61-90: Expand through institutional or social networks",
    ],
    phasesHi: [
      "दिन 1-30: दान और सेवा",
      "दिन 31-60: अनुदान और सरकारी योजनाएं",
      "दिन 61-90: संस्थागत नेटवर्क",
    ],
  },
};

const REMEDIES: Record<
  number,
  { gemstone: string; ritual: string; vastu: string }
> = {
  1: {
    gemstone: "Ruby (Manik)",
    ritual: "Offer red flowers to Sun every Sunday",
    vastu: "Place money in East zone of home",
  },
  2: {
    gemstone: "Pearl (Moti)",
    ritual: "Offer white flowers to Moon every Monday",
    vastu: "Keep North-East corner clean and lit",
  },
  3: {
    gemstone: "Yellow Sapphire (Pukhraj)",
    ritual: "Recite Jupiter mantra on Thursdays",
    vastu: "Study/work table facing North-East",
  },
  4: {
    gemstone: "Emerald (Panna)",
    ritual: "Feed green vegetables to cows on Wednesdays",
    vastu: "No clutter in North zone",
  },
  5: {
    gemstone: "Citrine",
    ritual: "Light yellow lamp every Friday",
    vastu: "Keep center of home open and clean",
  },
  6: {
    gemstone: "Diamond or White Sapphire",
    ritual: "Perform Lakshmi puja on Fridays",
    vastu: "Place Kuber Yantra facing North",
  },
  7: {
    gemstone: "Cat's Eye (Lahsuniya)",
    ritual: "Fast on Saturdays and donate to elderly",
    vastu: "Northwest zone for study and research",
  },
  8: {
    gemstone: "Hessonite (Gomed)",
    ritual: "Donate black sesame to Saturn on Saturdays",
    vastu: "South-West area for business",
  },
  9: {
    gemstone: "Red Coral (Moonga)",
    ritual: "Hanuman Chalisa on Tuesdays",
    vastu: "South direction for authority and wealth",
  },
};

const PEAK_PERIODS: Record<number, { period: string; periodHi: string }> = {
  1: {
    period: "Years 1, 10, 19, 28 + post-age 32",
    periodHi: "वर्ष 1, 10, 19, 28 + 32 उम्र के बाद",
  },
  2: {
    period: "Years 2, 11, 20 + post-age 35",
    periodHi: "वर्ष 2, 11, 20 + 35 उम्र के बाद",
  },
  3: {
    period: "Years 3, 12, 21, 30 + post-age 27",
    periodHi: "वर्ष 3, 12, 21, 30 + 27 उम्र के बाद",
  },
  4: {
    period: "Years 4, 13, 22, 31 + post-age 42",
    periodHi: "वर्ष 4, 13, 22, 31 + 42 उम्र",
  },
  5: {
    period: "Years 5, 14, 23 + post-age 30 (dynamic)",
    periodHi: "वर्ष 5, 14, 23 + 30 उम्र के बाद",
  },
  6: {
    period: "Years 6, 15, 24, 33 + post-age 38",
    periodHi: "वर्ष 6, 15, 24, 33 + 38 उम्र",
  },
  7: {
    period: "Years 7, 16, 25, 34 + post-age 45",
    periodHi: "वर्ष 7, 16, 25, 34 + 45 उम्र",
  },
  8: {
    period: "Years 8, 17, 26, 35 + post-age 35 (peak power)",
    periodHi: "वर्ष 8, 17, 26, 35 + 35 उम्र",
  },
  9: {
    period: "Years 9, 18, 27, 36 + post-age 36",
    periodHi: "वर्ष 9, 18, 27, 36 + 36 उम्र",
  },
};

export default function WealthCalculator() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<WealthResult | null>(null);

  function calculate() {
    if (!dob) return;
    const moolank = calcMoolank(dob);
    const freq = getLoShuFreq(dob);
    const practicalPlane = getPracticalPlane(freq);
    const wt = WEALTH_TYPES[moolank] ?? WEALTH_TYPES[1];
    const ph = PHASES[moolank] ?? PHASES[1];
    const rem = REMEDIES[moolank] ?? REMEDIES[1];
    const pp = PEAK_PERIODS[moolank] ?? PEAK_PERIODS[1];
    // Silver Yog: moolank 2/7 or day+month = 2 or 7
    const d = new Date(dob);
    const dm = d.getDate() + (d.getMonth() + 1);
    let silverSum = dm;
    while (silverSum > 9)
      silverSum = String(silverSum)
        .split("")
        .reduce((a, b) => a + Number(b), 0);
    const silverYog =
      moolank === 2 || moolank === 7 || silverSum === 2 || silverSum === 7;
    setResult({
      moolank,
      silverYog,
      silverYogReason: silverYog
        ? "Birth date+month vibration resonates with Moon (2) or Neptune (7) — natural wealth magnetism"
        : "Silver Yog not present — build wealth through discipline and strategy",
      practicalPlane,
      wealthType: wt.type,
      wealthTypeHi: wt.typeHi,
      strategy: wt.strategy,
      strategyHi: wt.strategyHi,
      phases: ph.phases,
      phasesHi: ph.phasesHi,
      remedies: rem,
      peakPeriod: pp.period,
      peakPeriodHi: pp.periodHi,
    });
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
            <Link to="/astrology/calculators" className="hover:text-white">
              {hi ? "कैलकुलेटर" : "Calculators"}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span>{hi ? "धन योग" : "Wealth Calculator"}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "धन / समृद्धि कैलकुलेटर" : "Wealth & Money Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "अंकज्योतिष से रजत योग, धन प्रकार और सक्रियता योजना"
              : "Silver Yog, wealth type and 90-day activation plan from numerology"}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800">
              {hi ? "जन्म तिथि दर्ज करें" : "Enter Date of Birth"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-amber-700">
                {hi ? "जन्म तिथि" : "Date of Birth"}
              </Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="border-amber-300"
                data-ocid="wealth.dob_input"
              />
            </div>
            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="wealth.submit_button"
              disabled={!dob}
            >
              {hi ? "धन योग देखें" : "Analyse Wealth Potential"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            {/* Silver Yog */}
            <Card
              className={`border-2 ${result.silverYog ? "border-amber-400 shadow-lg" : "border-gray-200"}`}
            >
              <CardContent className="pt-5">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">
                    {result.silverYog ? "🥈" : "💰"}
                  </span>
                  <div>
                    <div
                      className={`text-xl font-bold ${result.silverYog ? "text-amber-700" : "text-gray-600"}`}
                    >
                      {result.silverYog
                        ? hi
                          ? "रजत योग सक्रिय है!"
                          : "Silver Yog Active!"
                        : hi
                          ? "रजत योग निष्क्रिय"
                          : "Silver Yog Inactive"}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.silverYogReason}
                    </p>
                    <div className="mt-1">
                      <Badge className="bg-amber-100 text-amber-800">
                        {hi ? "मूलांक" : "Moolank"}: {result.moolank}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Practical Plane */}
            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-800 text-base">
                  {hi
                    ? "व्यावहारिक तल विश्लेषण"
                    : "Practical Plane Analysis (3-5-7)"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 bg-amber-100 rounded-full h-3">
                    <div
                      className="h-3 bg-amber-500 rounded-full"
                      style={{ width: `${result.practicalPlane.score}%` }}
                    />
                  </div>
                  <span className="font-bold text-amber-700">
                    {result.practicalPlane.score}%
                  </span>
                </div>
                <p className="text-sm text-amber-800">
                  {result.practicalPlane.desc}
                </p>
              </CardContent>
            </Card>

            {/* Wealth Type & Strategy */}
            <Card className="border-amber-300 bg-amber-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-800">
                  {hi ? "धन प्रकार और रणनीति" : "Wealth Type & Strategy"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="bg-amber-500 text-white text-sm">
                  {hi ? result.wealthTypeHi : result.wealthType}
                </Badge>
                <p className="text-sm text-amber-800">
                  {hi ? result.strategyHi : result.strategy}
                </p>
              </CardContent>
            </Card>

            {/* 90-day plan */}
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {hi ? "90 दिनीय सक्रियता योजना" : "90-Day Activation Plan"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(hi ? result.phasesHi : result.phases).map((phase, i) => (
                  <div
                    key={phase}
                    className="flex gap-3 items-start"
                    data-ocid={`wealth.phase.${i + 1}`}
                  >
                    <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-green-900">{phase}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Remedies */}
            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-800 text-base">
                  {hi ? "धन उपाय" : "Wealth Remedies"}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💎</span>
                  <div>
                    <div className="text-xs font-semibold text-amber-700">
                      {hi ? "रत्न" : "Gemstone"}
                    </div>
                    <div className="text-sm">{result.remedies.gemstone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">📿</span>
                  <div>
                    <div className="text-xs font-semibold text-amber-700">
                      {hi ? "अनुष्ठान" : "Ritual"}
                    </div>
                    <div className="text-sm">{result.remedies.ritual}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lg">🏠</span>
                  <div>
                    <div className="text-xs font-semibold text-amber-700">
                      {hi ? "वास्तु" : "Vastu Tip"}
                    </div>
                    <div className="text-sm">{result.remedies.vastu}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Peak period */}
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌟</span>
                  <div>
                    <div className="font-bold text-amber-800">
                      {hi ? "शिखर धन काल" : "Peak Wealth Period"}
                    </div>
                    <div className="text-sm text-amber-700">
                      {hi ? result.peakPeriodHi : result.peakPeriod}
                    </div>
                  </div>
                </div>
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
              {
                to: "/astrology/calculators",
                label: hi ? "कैरियर संभावना" : "Career Potential",
              },
              {
                to: "/calculator/lo-shu-grid",
                label: hi ? "Lo Shu ग्रिड" : "Lo Shu Grid",
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
