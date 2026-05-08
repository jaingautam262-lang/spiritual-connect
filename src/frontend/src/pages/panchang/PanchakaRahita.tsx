import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle, ChevronRight, Info } from "lucide-react";
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

// Panchaka occurs when Moon is in Dhanishtha (22), Shatabhisha (23), Purva Bhadrapada (24),
// Uttara Bhadrapada (25), or Revati (26) — indices 21-25 (0-based)
const PANCHAKA_NAKSHATRAS = [
  "Dhanishtha",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];
const _PANCHAKA_INDICES = [21, 22, 23, 24, 25];

const PANCHAKA_EFFECTS: Record<
  string,
  {
    effect: string;
    type: string;
    hindName: string;
    remedies: string[];
    avoid: string[];
  }
> = {
  Dhanishtha: {
    effect:
      "Agni Panchaka — Fire-related dangers; avoid construction work and fire-related activities",
    type: "Agni",
    hindName: "धनिष्ठा",
    remedies: [
      "Recite Hanuman Chalisa",
      "Donate red cloth",
      "Light a lamp continuously for 5 days",
    ],
    avoid: [
      "Construction",
      "Fire-related work",
      "Starting new ventures",
      "Marriages",
    ],
  },
  Shatabhisha: {
    effect:
      "Raja Panchaka — Government-related challenges; good for administrative work but avoid disputes",
    type: "Raja",
    hindName: "शतभिषा",
    remedies: [
      "Recite Shani Stotra",
      "Donate black sesame",
      "Perform Saturn puja",
    ],
    avoid: [
      "Legal disputes",
      "Arguments with authorities",
      "Major investments",
    ],
  },
  "Purva Bhadrapada": {
    effect:
      "Mrityu Panchaka — Death-related energies; avoid all auspicious activities and travel",
    type: "Mrityu",
    hindName: "पूर्व भाद्रपदा",
    remedies: [
      "Perform Mrityunjaya Homa",
      "Recite Mahamrityunjaya Mantra 108 times",
      "Donate white items",
    ],
    avoid: [
      "Travel",
      "Surgeries",
      "Starting new projects",
      "Marriages",
      "Purchasing vehicles",
    ],
  },
  "Uttara Bhadrapada": {
    effect:
      "Roga Panchaka — Health-related challenges; take extra care of health and avoid strain",
    type: "Roga",
    hindName: "उत्तर भाद्रपदा",
    remedies: [
      "Recite Dhanvantari Mantra",
      "Donate medicines",
      "Perform Ayurvedic rituals",
    ],
    avoid: [
      "Heavy exercise",
      "Medical procedures",
      "Fasting without guidance",
      "Long journeys",
    ],
  },
  Revati: {
    effect:
      "Chora Panchaka — Theft and loss-related period; secure valuables and avoid financial transactions",
    type: "Chora",
    hindName: "रेवती",
    remedies: [
      "Recite Lakshmi Stotra",
      "Keep home well-lit",
      "Donate gold or yellow items",
    ],
    avoid: [
      "Major purchases",
      "Financial transactions",
      "Travel alone at night",
      "Signing contracts",
    ],
  },
};

function getNakshatraForDate(dateStr: string): string {
  const d = new Date(dateStr).getDate();
  const m = new Date(dateStr).getMonth() + 1;
  const idx = (d + m * 3) % 27;
  return NAKSHATRAS[idx];
}

export default function PanchakaRahita() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const [date, setDate] = useState(
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
  );
  const [result, setResult] = useState<{
    active: boolean;
    nakshatra: string;
    info?: typeof PANCHAKA_EFFECTS.Dhanishtha;
  } | null>(null);

  function calculate() {
    const nak = getNakshatraForDate(date);
    const isActive = PANCHAKA_NAKSHATRAS.includes(nak);
    setResult({
      active: isActive,
      nakshatra: nak,
      info: isActive ? PANCHAKA_EFFECTS[nak] : undefined,
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
            <Link to="/panchang" className="hover:text-white">
              {hi ? "पंचांग" : "Panchang"}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span>{hi ? "पंचक रहित" : "Panchaka Rahita"}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-1">
            {hi ? "पंचक रहित जांच" : "Panchaka Rahita Checker"}
          </h1>
          <p className="text-amber-100 text-sm">
            {hi ? "इस दिन पंचक सक्रिय है या नहीं?" : "Is Panchaka active today?"}
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
                  ? "पंचक वह पांच-दिनीय अवधि है जब चंद्रमा धनिष्ठा, शतभिषा, पूर्व भाद्रपदा, उत्तर भाद्रपदा या रेवती नक्षत्र में होती है। इस दौरान शुभ कार्य वर्जित हैं।"
                  : "Panchaka is a 5-day period when the Moon transits Dhanishtha, Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, or Revati nakshatras. Auspicious work is discouraged during this period."}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800">
              {hi ? "तारीख चुनें" : "Select Date"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4 items-end">
            <div className="flex-1">
              <Label className="text-amber-700">{hi ? "तारीख" : "Date"}</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border-amber-300"
              />
            </div>
            <Button
              onClick={calculate}
              className="bg-amber-600 hover:bg-amber-700 text-white"
              data-ocid="panchaka-rahita.submit_button"
            >
              {hi ? "जांचें" : "Check"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <>
            <Card
              className={`border-2 ${result.active ? "border-red-400" : "border-green-400"} shadow-lg`}
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center gap-4">
                  {result.active ? (
                    <AlertTriangle className="w-12 h-12 text-red-500" />
                  ) : (
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  )}
                  <div>
                    <div
                      className={`text-2xl font-bold ${result.active ? "text-red-700" : "text-green-700"}`}
                    >
                      {result.active
                        ? hi
                          ? "पंचक सक्रिय है"
                          : "Panchaka is Active"
                        : hi
                          ? "पंचक सक्रिय नहीं"
                          : "Panchaka Not Active"}
                    </div>
                    <div className="text-muted-foreground">
                      {hi ? "नक्षत्र:" : "Nakshatra:"}{" "}
                      <b className="text-amber-800">{result.nakshatra}</b>
                    </div>
                    {result.active && result.info && (
                      <Badge className="mt-1 bg-red-100 text-red-800 border border-red-300">
                        {result.info.type} Panchaka
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {result.active && result.info && (
              <div className="space-y-4">
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-red-800 text-base">
                      {hi ? "पंचक प्रभाव" : "Panchaka Effect"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-red-700">
                    {result.info.effect}
                  </CardContent>
                </Card>

                <Card className="border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-800 text-base">
                      {hi ? "इन कार्यों से बचें" : "Activities to Avoid"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {result.info.avoid.map((a, i) => (
                      <Badge
                        key={a}
                        className="bg-red-100 text-red-800 border border-red-200"
                        data-ocid={`panchaka-rahita.avoid.${i + 1}`}
                      >
                        {a}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-green-800 text-base">
                      {hi ? "उपाय" : "Remedies"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {result.info.remedies.map((r, _i) => (
                      <div
                        key={r}
                        className="flex items-center gap-2 text-sm text-green-800"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {r}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {!result.active && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-4">
                  <p className="text-green-800 text-sm">
                    {hi
                      ? "इस दिन पंचक सक्रिय नहीं है। आप कोई भी शुभ कार्य निर्भय होकर कर सकते हैं। शुभा तिथि कैलकुलेटर से अनुकूल मुहूर्त चंुनें।"
                      : "Panchaka is not active on this date. You can proceed with auspicious activities without concern. Use the Shubha Dates calculator for the best muhurat."}
                  </p>
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
              { to: "/panchang", label: hi ? "शुभ योग" : "Auspicious Yogas" },
              { to: "/panchang", label: hi ? "शुभा तिथियाँ" : "Shubha Dates" },
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
