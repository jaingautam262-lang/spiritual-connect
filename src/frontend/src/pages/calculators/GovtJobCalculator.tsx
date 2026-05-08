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
import { ChevronRight, Shield } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const EXAM_TYPES = [
  { value: "upsc", label: "UPSC (IAS/IPS/IFS)", hindi: "यूपीएससी" },
  { value: "ssc", label: "SSC (CGL/CHSL/MTS)", hindi: "एसएससी" },
  { value: "banking", label: "Banking (IBPS/SBI/RBI)", hindi: "बैंकिंग" },
  { value: "defence", label: "Defence (NDA/CDS/AFCAT)", hindi: "रक्षा" },
  { value: "state", label: "State PSC", hindi: "राज्य लोक सेवा" },
  { value: "railway", label: "Railway (RRB/NTPC/Group D)", hindi: "रेलवे" },
];

function calcMoolank(dob: string): number {
  const day = new Date(dob).getDate();
  let sum = day;
  while (sum > 9)
    sum = String(sum)
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  return sum;
}

function calcLifePath(dob: string): number {
  let sum = dob
    .replace(/-/g, "")
    .split("")
    .reduce((a, b) => a + Number(b), 0);
  while (sum > 9)
    sum = String(sum)
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  return sum;
}

interface SectorScore {
  sector: string;
  sectorHi: string;
  score: number;
  reason: string;
}
interface GovtResult {
  moolank: number;
  lifePath: number;
  overall: number;
  sectors: SectorScore[];
  timeline: string[];
  timelineHi: string[];
  salaryRange: string;
  pensonEstimate: string;
  interviewTip: string;
  interviewTipHi: string;
  luckyDates: string[];
  gemstones: string[];
}

// Sector fit by moolank
const SECTOR_SCORES: Record<number, SectorScore[]> = {
  1: [
    {
      sector: "IAS/IPS",
      sectorHi: "आईएएस/आईपीएस",
      score: 95,
      reason: "Sun-ruled, natural authority",
    },
    {
      sector: "Defence",
      sectorHi: "रक्षा सेवा",
      score: 88,
      reason: "Leadership in uniform suits #1",
    },
    {
      sector: "Banking",
      sectorHi: "बैंकिंग",
      score: 75,
      reason: "Administration and authority",
    },
    {
      sector: "Railways",
      sectorHi: "रेलवे",
      score: 70,
      reason: "Government management",
    },
    {
      sector: "State PSC",
      sectorHi: "राज्य सेवा",
      score: 80,
      reason: "Regional leadership",
    },
  ],
  2: [
    {
      sector: "IAS/IPS",
      sectorHi: "आईएएस/आईपीएस",
      score: 72,
      reason: "Diplomatic service suits Moon",
    },
    {
      sector: "Defence",
      sectorHi: "रक्षा सेवा",
      score: 65,
      reason: "Support roles in defence",
    },
    {
      sector: "Banking",
      sectorHi: "बैंकिंग",
      score: 88,
      reason: "Finance and public dealing",
    },
    {
      sector: "Railways",
      sectorHi: "रेलवे",
      score: 85,
      reason: "Social service commitment",
    },
    {
      sector: "State PSC",
      sectorHi: "राज्य सेवा",
      score: 82,
      reason: "Community service",
    },
  ],
  3: [
    {
      sector: "IAS/IPS",
      sectorHi: "आईएएस/आईपीएस",
      score: 78,
      reason: "Jupiter gives wisdom for administration",
    },
    {
      sector: "Defence",
      sectorHi: "रक्षा सेवा",
      score: 72,
      reason: "Strategic mind",
    },
    {
      sector: "Banking",
      sectorHi: "बैंकिंग",
      score: 80,
      reason: "Financial analysis",
    },
    {
      sector: "Railways",
      sectorHi: "रेलवे",
      score: 70,
      reason: "Broad-based service",
    },
    {
      sector: "State PSC",
      sectorHi: "राज्य सेवा",
      score: 85,
      reason: "Teaching/Education services",
    },
  ],
  4: [
    {
      sector: "IAS/IPS",
      sectorHi: "आईएएस/आईपीएस",
      score: 68,
      reason: "Rahu gives unconventional path",
    },
    {
      sector: "Defence",
      sectorHi: "रक्षा सेवा",
      score: 82,
      reason: "Technical engineering roles",
    },
    {
      sector: "Banking",
      sectorHi: "बैंकिंग",
      score: 78,
      reason: "Systematic financial work",
    },
    {
      sector: "Railways",
      sectorHi: "रेलवे",
      score: 90,
      reason: "Engineering in railways",
    },
    {
      sector: "State PSC",
      sectorHi: "राज्य सेवा",
      score: 75,
      reason: "Disciplined state service",
    },
  ],
  5: [
    {
      sector: "IAS/IPS",
      sectorHi: "आईएएस/आईपीएस",
      score: 82,
      reason: "Mercury rules communication",
    },
    {
      sector: "Defence",
      sectorHi: "रक्षा सेवा",
      score: 75,
      reason: "Intelligence and tech roles",
    },
    {
      sector: "Banking",
      sectorHi: "बैंकिंग",
      score: 88,
      reason: "Excellent for finance",
    },
    {
      sector: "Railways",
      sectorHi: "रेलवे",
      score: 72,
      reason: "Administrative roles",
    },
    {
      sector: "State PSC",
      sectorHi: "राज्य सेवा",
      score: 78,
      reason: "Versatile state roles",
    },
  ],
  6: [
    {
      sector: "IAS/IPS",
      sectorHi: "आईएएस/आईपीएस",
      score: 75,
      reason: "Diplomatic foreign service",
    },
    {
      sector: "Defence",
      sectorHi: "रक्षा सेवा",
      score: 68,
      reason: "Medical/welfare in defence",
    },
    {
      sector: "Banking",
      sectorHi: "बैंकिंग",
      score: 85,
      reason: "Venus in wealth and value",
    },
    {
      sector: "Railways",
      sectorHi: "रेलवे",
      score: 78,
      reason: "Service-oriented role",
    },
    {
      sector: "State PSC",
      sectorHi: "राज्य सेवा",
      score: 82,
      reason: "Education/health departments",
    },
  ],
  7: [
    {
      sector: "IAS/IPS",
      sectorHi: "आईएएस/आईपीएस",
      score: 80,
      reason: "Analytical mind for policy",
    },
    {
      sector: "Defence",
      sectorHi: "रक्षा सेवा",
      score: 78,
      reason: "Research and intelligence",
    },
    {
      sector: "Banking",
      sectorHi: "बैंकिंग",
      score: 82,
      reason: "Deep financial analysis",
    },
    {
      sector: "Railways",
      sectorHi: "रेलवे",
      score: 72,
      reason: "Technical research roles",
    },
    {
      sector: "State PSC",
      sectorHi: "राज्य सेवा",
      score: 75,
      reason: "Specialist departments",
    },
  ],
  8: [
    {
      sector: "IAS/IPS",
      sectorHi: "आईएएस/आईपीएस",
      score: 88,
      reason: "Saturn gives authority",
    },
    {
      sector: "Defence",
      sectorHi: "रक्षा सेवा",
      score: 90,
      reason: "Discipline and endurance",
    },
    {
      sector: "Banking",
      sectorHi: "बैंकिंग",
      score: 85,
      reason: "Financial power and regulation",
    },
    {
      sector: "Railways",
      sectorHi: "रेलवे",
      score: 80,
      reason: "Infrastructure management",
    },
    {
      sector: "State PSC",
      sectorHi: "राज्य सेवा",
      score: 82,
      reason: "Administrative power",
    },
  ],
  9: [
    {
      sector: "IAS/IPS",
      sectorHi: "आईएएस/आईपीएस",
      score: 90,
      reason: "Mars energy for law and order",
    },
    {
      sector: "Defence",
      sectorHi: "रक्षा सेवा",
      score: 95,
      reason: "Highest fit — warrior energy",
    },
    {
      sector: "Banking",
      sectorHi: "बैंकिंग",
      score: 75,
      reason: "Financial enforcement",
    },
    {
      sector: "Railways",
      sectorHi: "रेलवे",
      score: 70,
      reason: "Security and operations",
    },
    {
      sector: "State PSC",
      sectorHi: "राज्य सेवा",
      score: 82,
      reason: "Social justice roles",
    },
  ],
};

const SALARY_MAP: Record<string, string> = {
  upsc: "₹56,100 – ₹2,50,000/month (Grade Pay 5400+)",
  ssc: "₹25,500 – ₹81,100/month (Pay Level 4-8)",
  banking: "₹35,000 – ₹1,05,000/month (PO to AGM)",
  defence: "₹56,100 – ₹2,50,000/month + allowances",
  state: "₹20,000 – ₹1,44,200/month (State Grade)",
  railway: "₹18,000 – ₹77,500/month + DA",
};

const PENSION_MAP: Record<string, string> = {
  upsc: "50% of last basic pay + DA (after 10 years)",
  ssc: "50% of last basic pay under NPS",
  banking: "NPS/OPS based on joining year",
  defence: "50-75% of last pay + gratuity",
  state: "State OPS/NPS provisions",
  railway: "NPS + gratuity up to ₹20L",
};

const INTERVIEW_TIPS: Record<number, { tip: string; tipHi: string }> = {
  1: {
    tip: "Project confidence and decisive thinking. Use STAR method. Sit straight, speak clearly.",
    tipHi: "आत्मविश्वास दिखाएं। STAR विधि अपनाएं।",
  },
  2: {
    tip: "Be empathetic and calm. Show teamwork examples. Avoid being indecisive.",
    tipHi: "सहूधरिता और शांति दिखाएं। टीमवर्क उदाहरण दें।",
  },
  3: {
    tip: "Show enthusiasm and broad knowledge. Jupiter confidence helps.",
    tipHi: "उत्साह और विस्तृत न्लेज दिखाएं।",
  },
  4: {
    tip: "Use structured answers. Show technical knowledge and discipline.",
    tipHi: "संरचित उत्तर दें। तकनीकी ज्ञान दिखाएं।",
  },
  5: {
    tip: "Communicate fluently. Show versatility and adaptability.",
    tipHi: "स्पष्ट वक्ताबने दिखाएं।",
  },
  6: {
    tip: "Emphasize service motivation. Show care for community.",
    tipHi: "सेवा भावना जाहिर करें।",
  },
  7: {
    tip: "Analytical answers with data. Show research orientation.",
    tipHi: "डेटा-आधारित विश्लेषणात्मक उत्तर दें।",
  },
  8: {
    tip: "Show discipline and long-term vision. Saturn energy: punctual and firm.",
    tipHi: "अनुशासन और दीर्घकालीन दृष्टि दिखाएं।",
  },
  9: {
    tip: "Show patriotism and problem-solving ability. Strong and assertive.",
    tipHi: "देशभक्ति और समस्या-समाधान क्षमता दिखाएं।",
  },
};

const LUCKY_DATES_MAP: Record<number, string[]> = {
  1: ["1st, 10th, 19th, 28th of month", "Sundays"],
  2: ["2nd, 11th, 20th, 29th", "Mondays"],
  3: ["3rd, 12th, 21st, 30th", "Thursdays"],
  4: ["4th, 13th, 22nd, 31st", "Saturdays"],
  5: ["5th, 14th, 23rd", "Wednesdays"],
  6: ["6th, 15th, 24th", "Fridays"],
  7: ["7th, 16th, 25th", "Saturdays"],
  8: ["8th, 17th, 26th", "Saturdays"],
  9: ["9th, 18th, 27th", "Tuesdays"],
};

const GEMSTONE_MAP: Record<number, string[]> = {
  1: ["Ruby", "Red Coral"],
  2: ["Pearl", "Moonstone"],
  3: ["Yellow Sapphire", "Citrine"],
  4: ["Hessonite", "Cat's Eye"],
  5: ["Emerald", "Green Tourmaline"],
  6: ["Diamond", "White Sapphire"],
  7: ["Cat's Eye", "Blue Sapphire"],
  8: ["Blue Sapphire", "Hessonite"],
  9: ["Red Coral", "Carnelian"],
};

export default function GovtJobCalculator() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const [dob, setDob] = useState("");
  const [examType, setExamType] = useState("upsc");
  const [result, setResult] = useState<GovtResult | null>(null);

  function calculate() {
    if (!dob) return;
    const moolank = calcMoolank(dob);
    const lifePath = calcLifePath(dob);
    const sectors = (SECTOR_SCORES[moolank] ?? SECTOR_SCORES[1]).sort(
      (a, b) => b.score - a.score,
    );
    const overall = Math.round(
      (sectors.reduce((a, s) => a + s.score, 0) / sectors.length +
        lifePath * 3) /
        2,
    );
    const timeline = [
      "Phase 1 (Month 1-3): Foundation — NCERT basics + current affairs",
      "Phase 2 (Month 4-6): Deep study — standard books + previous papers",
      "Phase 3 (Month 7-9): Revision + mock tests + weak area focus",
      "Phase 4 (Month 10-12): Final revision + interview prep + health focus",
      "Phase 5 (Post selection): Training + posting preparation",
    ];
    const timelineHi = [
      "क्रम 1 (1-3 माह): आधार — NCERT + सामायिक घटनाएं",
      "क्रम 2 (4-6 माह): गहन अध्ययन + पिछले प्रश्न पत्र",
      "क्रम 3 (7-9 माह): दोहरान + मॉक टेस्ट",
      "क्रम 4 (10-12 माह): अंतिम दोहरान + साक्षात्कार तैयारी",
      "क्रम 5 (.चयन अनुबंध): प्रशिक्षण + तैनाती",
    ];
    setResult({
      moolank,
      lifePath,
      overall: Math.min(overall, 99),
      sectors,
      timeline,
      timelineHi,
      salaryRange: SALARY_MAP[examType] ?? SALARY_MAP.upsc,
      pensonEstimate: PENSION_MAP[examType] ?? PENSION_MAP.upsc,
      interviewTip: INTERVIEW_TIPS[moolank]?.tip ?? INTERVIEW_TIPS[1].tip,
      interviewTipHi: INTERVIEW_TIPS[moolank]?.tipHi ?? INTERVIEW_TIPS[1].tipHi,
      luckyDates: LUCKY_DATES_MAP[moolank] ?? LUCKY_DATES_MAP[1],
      gemstones: GEMSTONE_MAP[moolank] ?? GEMSTONE_MAP[1],
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
            <span>{hi ? "सरकारी नौकरी" : "Govt Job Success"}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "सरकारी नौकरी सफलता कैलकुलेटर" : "Govt Job Success Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "अंकज्योतिष से सर्वश्रेष्ठ सरकारी क्षेत्र, वेतन और रणनीति"
              : "Numerology-based govt sector fit, salary & preparation strategy"}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800">
              {hi ? "विवरण दर्ज करें" : "Enter Details"}
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
                data-ocid="govt-job.dob_input"
              />
            </div>
            <div>
              <Label className="text-amber-700">
                {hi ? "परीक्षा प्रकार" : "Exam Type"}
              </Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger
                  className="border-amber-300"
                  data-ocid="govt-job.exam_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EXAM_TYPES.map((e) => (
                    <SelectItem key={e.value} value={e.value}>
                      {hi ? e.hindi : e.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="govt-job.submit_button"
              disabled={!dob}
            >
              {hi ? "सफलता देखें" : "Analyse Success Potential"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            {/* Overall score */}
            <Card className="border-2 border-amber-500 shadow-lg">
              <CardContent className="pt-5">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full border-4 border-amber-500 flex flex-col items-center justify-center">
                    <div className="text-2xl font-black text-amber-700">
                      {result.overall}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {hi ? "सफलता" : "Success"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-amber-800">
                      {hi ? "मूलांक:" : "Moolank:"} {result.moolank} |{" "}
                      {hi ? "जीवन पथ:" : "Life Path:"} {result.lifePath}
                    </div>
                    <div className="text-sm text-amber-600">
                      {hi
                        ? "समग्र सरकारी सेवा संभावना"
                        : "Overall Government Service Potential"}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.gemstones.map((g) => (
                        <Badge
                          key={g}
                          className="bg-amber-100 text-amber-800 border border-amber-300"
                        >
                          💎 {g}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sector scores */}
            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-800 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {hi ? "क्षेत्र संगतता" : "Sector Fit Scores"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.sectors.map((s, i) => (
                  <div key={s.sector} data-ocid={`govt-job.sector.${i + 1}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">
                        {hi ? s.sectorHi : s.sector}
                      </span>
                      <span className="text-sm font-bold text-amber-700">
                        {s.score}%
                      </span>
                    </div>
                    <div className="h-2 bg-amber-100 rounded-full">
                      <div
                        className="h-2 bg-amber-500 rounded-full"
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {s.reason}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-amber-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-800 text-base">
                  {hi ? "6 माह तैयारी योजना" : "Preparation Timeline"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(hi ? result.timelineHi : result.timeline).map((phase, i) => (
                  <div
                    key={phase}
                    className="flex gap-3 items-start"
                    data-ocid={`govt-job.timeline.${i + 1}`}
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm">{phase}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Salary */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-800 text-base">
                  {hi ? "वेतन और पेंशन" : "Salary & Pension"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <b className="text-green-700">
                    {hi ? "वेतन श्रेणी:" : "Salary Range:"}
                  </b>{" "}
                  {result.salaryRange}
                </div>
                <div>
                  <b className="text-green-700">{hi ? "पेंशन:" : "Pension:"}</b>{" "}
                  {result.pensonEstimate}
                </div>
              </CardContent>
            </Card>

            {/* Interview tip */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-800 text-base">
                  {hi ? "साक्षात्कार रणनीति" : "Interview Strategy"}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-800">
                {hi ? result.interviewTipHi : result.interviewTip}
              </CardContent>
            </Card>

            {/* Lucky dates */}
            <Card className="border-amber-200">
              <CardContent className="pt-4">
                <div className="font-semibold text-amber-700 mb-2">
                  {hi ? "शुभ तिथि/दिन" : "Lucky Exam Dates"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.luckyDates.map((d) => (
                    <Badge
                      key={d}
                      className="bg-amber-100 text-amber-800 border border-amber-300"
                    >
                      {d}
                    </Badge>
                  ))}
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
              { to: "/calculator/lo-shu-grid", label: "Lo Shu Grid" },
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
