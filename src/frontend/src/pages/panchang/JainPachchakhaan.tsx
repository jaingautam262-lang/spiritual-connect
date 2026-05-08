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
import { BookOpen, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const JAIN_FAST_TYPES = [
  { value: "paushadh", label: "Paushadh Vrat", hindi: "पौषध व्रत" },
  { value: "ekasana", label: "Ekasana (One meal)", hindi: "एकासन" },
  { value: "ayambil", label: "Ayambil", hindi: "आयंबिल" },
  { value: "upavasa", label: "Upavasa (Full fast)", hindi: "उपवास" },
  { value: "nivi", label: "Nivi (Partial fast)", hindi: "निवि" },
  { value: "chauvihar", label: "Chauvihar Upavasa", hindi: "चौविहार उपवास" },
];

interface PachchakhaaanResult {
  fastType: string;
  fastHindi: string;
  description: string;
  duration: string;
  samayikTimes: string[];
  pratikramanSchedule: string[];
  kaundaPhal: string;
  vows: string[];
  reference: string;
  referenceHindi: string;
}

const PACHCHAKHAAN_DATA: Record<string, PachchakhaaanResult> = {
  paushadh: {
    fastType: "Paushadh Vrat",
    fastHindi: "पौषध व्रत",
    description:
      "Complete abstinence from worldly activities for 24 hours. This is one of the highest forms of Jain fasting, observed on Parva days (8th, 14th, Full & New moon).",
    duration: "24 hours (sunset to sunset)",
    samayikTimes: [
      "Sunrise: 5:30 AM – 6:30 AM",
      "Midday: 11:45 AM – 12:45 PM",
      "Sunset: 6:15 PM – 7:15 PM",
    ],
    pratikramanSchedule: [
      "Devvandan: 5:30 AM",
      "Samayik: 6:00 AM",
      "Pratikraman (morning): 6:30 AM",
      "Midday Pratikraman: 12:00 PM",
      "Evening Pratikraman: 6:30 PM",
      "Kayotsarga: 7:00 PM",
    ],
    kaundaPhal:
      "Liberation of past karma, 48-hour karmic purification, attainment of Samadhi state",
    vows: [
      "No food or water from sunset",
      "Complete celibacy",
      "No worldly conversation",
      "Avoid all sins (Papasthan)",
      "Continuous Samayik",
      "Pradakshina of Jinalaya",
    ],
    reference: "Uttaradhyayana Sutra, Chapter 30 — Paushadh Pratikraman",
    referenceHindi: "उत्तराध्ययन सूत्र, अध्याय 30 — पौषध प्रतिक्रमण",
  },
  ekasana: {
    fastType: "Ekasana",
    fastHindi: "एकासन",
    description:
      "One sitting meal per day, taken without rising from seat. No water after meal. Commonly observed during Paryushana Parva.",
    duration: "Midday meal only — one sitting",
    samayikTimes: [
      "Sunrise: 5:45 AM – 6:45 AM",
      "Pre-meal: 11:00 AM – 12:00 PM",
      "Evening: 6:30 PM – 7:30 PM",
    ],
    pratikramanSchedule: [
      "Morning Pratikraman: 6:00 AM",
      "Devvandan: 6:30 AM",
      "Meal: 12:00 PM (one sitting)",
      "Evening Pratikraman: 7:00 PM",
    ],
    kaundaPhal:
      "Purification of Indriyas (senses), reduces attachment to taste (Rasna)",
    vows: [
      "One meal, one sitting only",
      "No eating after rising",
      "No water after meal",
      "Evening Samayik mandatory",
    ],
    reference: "Acharanga Sutra, Shloka 2.15 — Ekasana Vidhana",
    referenceHindi: "आचारांग सूत्र, श्लोक 2.15 — एकासन विधान",
  },
  ayambil: {
    fastType: "Ayambil",
    fastHindi: "आयंबिल",
    description:
      "One boiled meal per day, taken without any spices, oil, milk, butter, or sweets. Considered very effective for karmic purification.",
    duration: "Daytime only — one plain boiled meal",
    samayikTimes: [
      "Dawn: 5:00 AM – 6:00 AM",
      "Midday: 11:30 AM – 12:30 PM",
      "Dusk: 6:00 PM – 7:00 PM",
    ],
    pratikramanSchedule: [
      "Dawn Pratikraman: 5:30 AM",
      "Devvandan: 6:00 AM",
      "Meal: 12:00 PM (plain, no flavour)",
      "Dusk Pratikraman: 6:30 PM",
    ],
    kaundaPhal:
      "Burning of Sanchit karma, purification of 5 senses, attainment of Vairagya",
    vows: [
      "No spices, oil, or seasonings",
      "No milk, curd, ghee, or sugar",
      "One meal only",
      "Complete silence during meal",
    ],
    reference: "Dashavaikalika Sutra, Chapter 5 — Ayambil Kalpa",
    referenceHindi: "दशवैकालिक सूत्र, अध्याय 5 — आयंबिल कल्प",
  },
  upavasa: {
    fastType: "Upavasa",
    fastHindi: "उपवास",
    description:
      "Complete fast — no food or water. The highest tapasya. Observed on Parva tithis by advanced sadhakas.",
    duration: "Full 24 hours — no food, no water",
    samayikTimes: [
      "Brahma Muhurta: 4:30 AM – 5:30 AM",
      "Sunrise: 5:45 AM – 6:45 AM",
      "Midday: 12:00 PM – 1:00 PM",
      "Sunset: 6:30 PM – 7:30 PM",
    ],
    pratikramanSchedule: [
      "Brahma Muhurta Samayik: 4:30 AM",
      "Devvandan: 6:00 AM",
      "Morning Pratikraman: 6:30 AM",
      "Midday Kayotsarga: 12:00 PM",
      "Evening Pratikraman: 6:30 PM",
      "Night Samayik: 9:00 PM",
    ],
    kaundaPhal:
      "Complete Ghati karma dissolution, Moksha proximity, Atma shuddhi at highest level",
    vows: [
      "No food",
      "No water",
      "Complete celibacy and silence",
      "Continuous meditation",
      "No worldly involvement",
    ],
    reference: "Kalpa Sutra, Parva Tapasya Section — Upavasa Vidhi",
    referenceHindi: "कल्प सूत्र, पर्व तपस्या खंड — उपवास विधि",
  },
  nivi: {
    fastType: "Nivi",
    fastHindi: "निवि",
    description:
      "Partial fast — one item of food allowed. Minimum consumption for sustaining the body while engaged in tapasya.",
    duration: "Daytime only — one food item",
    samayikTimes: ["Sunrise: 6:00 AM – 7:00 AM", "Evening: 6:00 PM – 7:00 PM"],
    pratikramanSchedule: [
      "Morning Pratikraman: 6:30 AM",
      "Evening Pratikraman: 6:30 PM",
    ],
    kaundaPhal: "Reduction in Tamas (Darkness/Lethargy), increase in Sattva",
    vows: [
      "One food item only",
      "No eating after sunset",
      "Evening Samayik compulsory",
    ],
    reference: "Uttaradhyayana Sutra, Shloka 15.12 — Nivi Tapasya",
    referenceHindi: "उत्तराध्ययन सूत्र, श्लोक 15.12",
  },
  chauvihar: {
    fastType: "Chauvihar Upavasa",
    fastHindi: "चौविहार उपवास",
    description:
      "No food after sunset the night before, and no food the entire next day. A 36-48 hour extended tapasya.",
    duration: "36-48 hours (sunset to sunrise next day)",
    samayikTimes: [
      "Evening before: 7:00 PM",
      "Dawn: 5:00 AM – 6:00 AM",
      "Midday: 12:00 PM – 1:00 PM",
    ],
    pratikramanSchedule: [
      "Night Samayik: 9:00 PM (previous evening)",
      "Dawn Pratikraman: 5:30 AM",
      "Midday Kayotsarga: 12:00 PM",
      "Evening Pratikraman: 6:30 PM",
      "Night Samayik: 9:00 PM",
    ],
    kaundaPhal:
      "Simultaneous purification of body and mind, reduction of 4 Ghati karmas",
    vows: [
      "No food or water after previous sunset",
      "Full fast next day",
      "No root vegetables",
      "Complete non-violence (Ahimsa)",
    ],
    reference: "Acharanga Sutra, Chapter 9 — Chauvihar Tapasya",
    referenceHindi: "आचारांग सूत्र, अध्याय 9 — चौविहार तपस्या",
  },
};

export default function JainPachchakhaan() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const [date, setDate] = useState(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
  );
  const [fastType, setFastType] = useState("paushadh");
  const [result, setResult] = useState<PachchakhaaanResult | null>(null);

  function calculate() {
    setResult(PACHCHAKHAAN_DATA[fastType] ?? null);
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
            <span>Jain Pachchakhaan</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "जैन पच्चखाण कैलकुलेटर" : "Jain Pachchakhaan Calculator"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi
              ? "व्रत, समयिक, प्रतिक्रमण और कौंडा फल"
              : "Vrat types, Samayik times, Pratikraman schedule & Kaunda Phal"}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800">
              {hi ? "व्रत प्रकार चुनें" : "Select Fast Type"}
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
                <Label className="text-amber-700">
                  {hi ? "व्रत का प्रकार" : "Fast Type"}
                </Label>
                <Select value={fastType} onValueChange={setFastType}>
                  <SelectTrigger
                    className="border-amber-300"
                    data-ocid="jain-pachchakhaan.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {JAIN_FAST_TYPES.map((f) => (
                      <SelectItem key={f.value} value={f.value}>
                        {hi ? f.hindi : f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="jain-pachchakhaan.submit_button"
            >
              {hi ? "पच्चखाण देखें" : "Get Pachchakhaan Details"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-4">
            <Card className="border-2 border-amber-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle>{hi ? result.fastHindi : result.fastType}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <p className="text-sm text-amber-800">{result.description}</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800 border border-amber-300">
                    ⏱ {result.duration}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">
                    {hi ? "समयिक समय" : "Samayik Times"}
                  </h4>
                  <ul className="space-y-1">
                    {result.samayikTimes.map((t, _i) => (
                      <li key={t} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">
                    {hi ? "प्रतिक्रमण तालिका" : "Pratikraman Schedule"}
                  </h4>
                  <ul className="space-y-1">
                    {result.pratikramanSchedule.map((s, i) => (
                      <li
                        key={s}
                        className="flex items-center gap-2 text-sm bg-amber-50 rounded px-2 py-1"
                      >
                        <span className="text-amber-600 font-semibold w-4">
                          {i + 1}.
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-semibold text-green-700 mb-1">
                    {hi ? "कौंडा फल" : "Kaunda Phal (Benefit)"}
                  </h4>
                  <p className="text-sm text-green-800">{result.kaundaPhal}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">
                    {hi ? "व्रत नियम" : "Vows"}
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {result.vows.map((v, _i) => (
                      <Badge
                        key={v}
                        className="bg-amber-100 text-amber-800 border border-amber-200 text-xs"
                      >
                        {v}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-800">
                    <b>{hi ? "आगम संदर्भ:" : "Scripture Reference:"}</b>
                    <br />
                    {hi ? result.referenceHindi : result.reference}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
              {
                to: "/jain-content-index",
                label: hi ? "जैन लाइब्रेरी" : "Jain Library",
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
