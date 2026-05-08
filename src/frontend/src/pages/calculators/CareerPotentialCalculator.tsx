import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
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

function calcExpression(name: string): number {
  const pyth: Record<string, number> = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 1,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    o: 6,
    p: 7,
    q: 8,
    r: 9,
    s: 1,
    t: 2,
    u: 3,
    v: 4,
    w: 5,
    x: 6,
    y: 7,
    z: 8,
  };
  let sum = name
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .split("")
    .reduce((a, c) => a + (pyth[c] ?? 0), 0);
  while (sum > 9)
    sum = String(sum)
      .split("")
      .reduce((a, b) => a + Number(b), 0);
  return sum;
}

interface CareerArchetype {
  number: number;
  title: string;
  titleHi: string;
  tagline: string;
  taglineHi: string;
  paths: { name: string; match: number }[];
  industries: string[];
  powerYear: string;
  gemstones: string[];
  mantra: string;
  color: string;
}

const ARCHETYPES: Record<number, CareerArchetype> = {
  1: {
    number: 1,
    title: "Leader / Pioneer",
    titleHi: "नेता / अग्रणी",
    tagline: "Born to lead, built to inspire",
    taglineHi: "नेतृत्व आपकी नियति है",
    paths: [
      { name: "CEO/Director", match: 95 },
      { name: "Government (IAS/IPS)", match: 90 },
      { name: "Entrepreneurship", match: 88 },
      { name: "Politics", match: 85 },
      { name: "Military Officer", match: 80 },
    ],
    industries: ["Government", "Corporate", "Defence", "Tech Startups"],
    powerYear: "Years ending in 1 or 10",
    gemstones: ["Ruby", "Red Coral"],
    mantra: "Om Suryaya Namah",
    color: "bg-red-50 border-red-300",
  },
  2: {
    number: 2,
    title: "Diplomat / Healer",
    titleHi: "राजनयज्ञ / चिकित्सक",
    tagline: "Nurture is your superpower",
    taglineHi: "सेवा आपकी शक्ति है",
    paths: [
      { name: "Healthcare/Nursing", match: 93 },
      { name: "Counselling/Psychology", match: 90 },
      { name: "HR Manager", match: 86 },
      { name: "Social Work", match: 84 },
      { name: "Diplomacy/Foreign Service", match: 80 },
    ],
    industries: ["Healthcare", "Social Services", "NGO", "Hospitality"],
    powerYear: "Years ending in 2",
    gemstones: ["Pearl", "Moonstone"],
    mantra: "Om Chandraya Namah",
    color: "bg-blue-50 border-blue-300",
  },
  3: {
    number: 3,
    title: "Creative / Artist",
    titleHi: "सृजनशील / कलाकार",
    tagline: "Words and art are your currency",
    taglineHi: "स्रजनात्मकता आपकी पहचान है",
    paths: [
      { name: "Writer/Journalist", match: 94 },
      { name: "Actor/Performer", match: 91 },
      { name: "Marketing/Advertising", match: 88 },
      { name: "Teacher/Trainer", match: 85 },
      { name: "Designer", match: 82 },
    ],
    industries: ["Media", "Entertainment", "Education", "Advertising"],
    powerYear: "Years ending in 3 or 12",
    gemstones: ["Yellow Sapphire", "Topaz"],
    mantra: "Om Gurave Namah",
    color: "bg-yellow-50 border-yellow-300",
  },
  4: {
    number: 4,
    title: "Builder / Engineer",
    titleHi: "निर्माता / इंजीनियर",
    tagline: "You build what others dream",
    taglineHi: "आप सपनों को हकीकत बनाते हैं",
    paths: [
      { name: "Engineering", match: 95 },
      { name: "Architecture", match: 91 },
      { name: "Accounting/Finance", match: 87 },
      { name: "Real Estate", match: 84 },
      { name: "IT/Systems", match: 82 },
    ],
    industries: ["Construction", "Finance", "Technology", "Manufacturing"],
    powerYear: "Years ending in 4",
    gemstones: ["Emerald", "Green Tourmaline"],
    mantra: "Om Budhaya Namah",
    color: "bg-green-50 border-green-300",
  },
  5: {
    number: 5,
    title: "Entrepreneur / Explorer",
    titleHi: "उद्यमी / खोजी",
    tagline: "Freedom and change are your fuel",
    taglineHi: "स्वतंत्रता आपका ईंधन है",
    paths: [
      { name: "Sales/Business Development", match: 94 },
      { name: "Travel/Tourism", match: 90 },
      { name: "Digital Marketing", match: 88 },
      { name: "Stock Trading", match: 85 },
      { name: "Freelancing", match: 82 },
    ],
    industries: ["Sales", "Travel", "Media", "Finance"],
    powerYear: "Years ending in 5 or 14",
    gemstones: ["Citrine", "Amber"],
    mantra: "Om Namah Shivaya",
    color: "bg-amber-50 border-amber-300",
  },
  6: {
    number: 6,
    title: "Nurturer / Advisor",
    titleHi: "पालनकर्ता / सलाहकार",
    tagline: "Service and harmony drive you",
    taglineHi: "सेवा और साथ्वना आपकी प्रेरणा है",
    paths: [
      { name: "Teacher/Professor", match: 93 },
      { name: "Counsellor/Therapist", match: 90 },
      { name: "Interior Designer", match: 86 },
      { name: "Chef/Hospitality", match: 84 },
      { name: "Doctor", match: 82 },
    ],
    industries: ["Education", "Healthcare", "Hospitality", "Arts"],
    powerYear: "Years ending in 6 or 15",
    gemstones: ["Diamond", "White Sapphire"],
    mantra: "Om Shukraya Namah",
    color: "bg-pink-50 border-pink-300",
  },
  7: {
    number: 7,
    title: "Analyst / Philosopher",
    titleHi: "विश्लेषक / दार्शनिक",
    tagline: "Truth and depth are your domain",
    taglineHi: "सत्य और गहराई आपका क्षेत्र है",
    paths: [
      { name: "Research Scientist", match: 94 },
      { name: "Analyst/Data Science", match: 91 },
      { name: "Doctor/Specialist", match: 88 },
      { name: "Spiritual Teacher", match: 85 },
      { name: "Writer", match: 82 },
    ],
    industries: ["Research", "Science", "Philosophy", "Spirituality"],
    powerYear: "Years ending in 7",
    gemstones: ["Blue Sapphire", "Cat's Eye"],
    mantra: "Om Shanaye Namah",
    color: "bg-indigo-50 border-indigo-300",
  },
  8: {
    number: 8,
    title: "Executive / Authority",
    titleHi: "अधिकारी / शासक",
    tagline: "Power and persistence define you",
    taglineHi: "शक्ति और दृढ़ता आपकी पहचान है",
    paths: [
      { name: "Business Owner", match: 95 },
      { name: "Finance/Banking", match: 91 },
      { name: "Law/Judiciary", match: 88 },
      { name: "Real Estate", match: 85 },
      { name: "Government (IAS)", match: 82 },
    ],
    industries: ["Finance", "Law", "Real Estate", "Corporate"],
    powerYear: "Years ending in 8 or 17",
    gemstones: ["Hessonite", "Blue Sapphire"],
    mantra: "Om Rahave Namah",
    color: "bg-slate-50 border-slate-300",
  },
  9: {
    number: 9,
    title: "Humanitarian / Warrior",
    titleHi: "सेवक / योद्धा",
    tagline: "Action and service are your calling",
    taglineHi: "सेवा और कार्य आपकी नियति है",
    paths: [
      { name: "Military/Defence", match: 94 },
      { name: "Doctor/Surgeon", match: 91 },
      { name: "Humanitarian/NGO", match: 88 },
      { name: "Sports/Athlete", match: 85 },
      { name: "Judge/Lawyer", match: 82 },
    ],
    industries: ["Defence", "Healthcare", "Sports", "Social Work"],
    powerYear: "Years ending in 9 or 18",
    gemstones: ["Red Coral", "Carnelian"],
    mantra: "Om Mangalaya Namah",
    color: "bg-rose-50 border-rose-300",
  },
};

const INCOME_BY_MOOLANK: Record<number, string[]> = {
  1: [
    "Year 1-2: Foundation (₹2-4L)",
    "Year 3: Growth (₹5-8L)",
    "Year 4: Acceleration (₹10-15L)",
    "Year 5: Peak (₹20-30L+)",
  ],
  2: [
    "Year 1-2: Learning (₹1.5-3L)",
    "Year 3: Stability (₹4-6L)",
    "Year 4: Growth (₹8-12L)",
    "Year 5: Flourishing (₹15-20L)",
  ],
  3: [
    "Year 1: Exploration (₹1-3L)",
    "Year 2-3: Building (₹4-8L)",
    "Year 4: Recognition (₹10-15L)",
    "Year 5: Fame (₹20L+)",
  ],
  4: [
    "Year 1-2: Structure (₹2-4L)",
    "Year 3: Steady (₹6-10L)",
    "Year 4: Reliable (₹12-18L)",
    "Year 5: Solid (₹20-25L)",
  ],
  5: [
    "Year 1: Variable (₹1-5L)",
    "Year 2: Opportunity (₹5-10L)",
    "Year 3: Breakthrough (₹12-20L)",
    "Year 4-5: Freedom (₹25L+)",
  ],
  6: [
    "Year 1-2: Service (₹1.5-3L)",
    "Year 3: Recognition (₹5-8L)",
    "Year 4: Stability (₹10-15L)",
    "Year 5: Abundance (₹18L+)",
  ],
  7: [
    "Year 1-2: Research (₹2-4L)",
    "Year 3: Depth (₹6-10L)",
    "Year 4: Expertise (₹12-18L)",
    "Year 5: Authority (₹22L+)",
  ],
  8: [
    "Year 1: Low (₹2-4L)",
    "Year 2-3: Rising (₹8-15L)",
    "Year 4: Power (₹18-25L)",
    "Year 5: Empire (₹35L+)",
  ],
  9: [
    "Year 1: Cause-driven (₹1-3L)",
    "Year 2-3: Growth (₹5-10L)",
    "Year 4: Impact (₹12-18L)",
    "Year 5: Legacy (₹22L+)",
  ],
};

export default function CareerPotentialCalculator() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{
    moolank: number;
    expr: number;
    archetype: CareerArchetype;
  } | null>(null);

  function calculate() {
    if (!dob) return;
    const moolank = calcMoolank(dob);
    const expr = name ? calcExpression(name) : moolank;
    const archetype = ARCHETYPES[moolank] ?? ARCHETYPES[1];
    setResult({ moolank, expr, archetype });
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
            <span>{hi ? "कैरियर संभावना" : "Career Potential"}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "कैरियर संभावना कैलकुलेटर" : "Career Potential Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "अंकज्योतिष से आपके सर्वश्रेष्ठ कैरियर और आय की गणना"
              : "Numerology-based career archetype and income projection"}
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
                {hi ? "नाम" : "Full Name"}
              </Label>
              <Input
                placeholder={hi ? "आपका पूरा नाम" : "Your full name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-amber-300"
              />
            </div>
            <div>
              <Label className="text-amber-700">
                {hi ? "जन्म तिथि" : "Date of Birth"}
              </Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="border-amber-300"
                data-ocid="career.dob_input"
              />
            </div>
            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="career.submit_button"
              disabled={!dob}
            >
              {hi ? "कैरियर देखें" : "Analyse Career Potential"}
            </Button>
          </CardContent>
        </Card>

        {result &&
          (() => {
            const a = result.archetype;
            const income =
              INCOME_BY_MOOLANK[result.moolank] ?? INCOME_BY_MOOLANK[1];
            return (
              <>
                <Card className={`border-2 shadow-lg ${a.color}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center text-2xl font-bold">
                        {result.moolank}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-amber-900">
                          {hi ? a.titleHi : a.title}
                        </CardTitle>
                        <div className="text-amber-600 text-sm italic">
                          {hi ? a.taglineHi : a.tagline}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-amber-700 mb-2">
                        {hi ? "शीर्ष 5 कैरियर पथ" : "Top 5 Career Paths"}
                      </div>
                      {a.paths.map((p, i) => (
                        <div
                          key={p.name}
                          className="flex items-center gap-3 mb-2"
                          data-ocid={`career.path.${i + 1}`}
                        >
                          <span className="text-xs font-bold text-amber-600 w-4">
                            {i + 1}.
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {p.name}
                              </span>
                              <span className="text-xs font-bold text-amber-700">
                                {p.match}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-amber-100 rounded-full mt-1">
                              <div
                                className="h-1.5 bg-amber-500 rounded-full transition-all"
                                style={{ width: `${p.match}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-amber-700 mb-2">
                        {hi ? "अनुशंसित उद्योग" : "Recommended Industries"}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {a.industries.map((ind) => (
                          <Badge
                            key={ind}
                            className="bg-amber-100 text-amber-800 border border-amber-300"
                          >
                            {ind}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-amber-700 mb-2">
                        {hi ? "पांच वर्षीय आय अनुमान" : "5-Year Income Projection"}
                      </div>
                      {income.map((inc, i) => (
                        <div
                          key={inc}
                          className="text-sm bg-amber-50 rounded px-3 py-1.5 mb-1 border-l-4 border-amber-400"
                          data-ocid={`career.income.${i + 1}`}
                        >
                          {inc}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center bg-amber-50 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground">
                          {hi ? "रत्न" : "Gemstones"}
                        </div>
                        <div className="text-xs font-semibold text-amber-800">
                          {a.gemstones.join(", ")}
                        </div>
                      </div>
                      <div className="text-center bg-amber-50 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground">
                          {hi ? "शक्ति वर्ष" : "Power Year"}
                        </div>
                        <div className="text-xs font-semibold text-amber-800">
                          {a.powerYear}
                        </div>
                      </div>
                      <div className="text-center bg-amber-50 rounded-lg p-2">
                        <div className="text-xs text-muted-foreground">
                          {hi ? "मंत्र" : "Mantra"}
                        </div>
                        <div className="text-xs font-semibold text-amber-800">
                          {a.mantra}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            );
          })()}

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
                label: hi ? "सरकारी नौकरी" : "Govt Job Success",
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
