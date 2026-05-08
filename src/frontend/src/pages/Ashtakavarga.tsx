import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const SIGNS = [
  "Ar",
  "Ta",
  "Ge",
  "Ca",
  "Le",
  "Vi",
  "Li",
  "Sc",
  "Sg",
  "Cp",
  "Aq",
  "Pi",
];
const SIGN_NAMES = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

// Sarvashtakavarga totals (0-56)
const SARVA: number[] = [27, 34, 28, 29, 38, 25, 24, 33, 30, 22, 35, 31];

// Bhinnashtakavarga per planet (7 planets × 12 signs)
const BHINNA: Record<string, number[]> = {
  Sun: [4, 6, 3, 4, 5, 3, 3, 5, 4, 2, 5, 4],
  Moon: [5, 5, 4, 4, 6, 3, 3, 4, 5, 3, 5, 4],
  Mars: [3, 4, 3, 3, 5, 3, 2, 4, 4, 2, 5, 3],
  Mercury: [4, 5, 4, 4, 5, 4, 3, 5, 4, 3, 5, 4],
  Jupiter: [5, 6, 4, 5, 6, 3, 4, 5, 5, 3, 5, 5],
  Venus: [4, 5, 5, 4, 5, 4, 4, 5, 4, 4, 5, 4],
  Saturn: [2, 3, 5, 5, 6, 5, 5, 5, 4, 5, 5, 7],
};

const HI_PLANETS: Record<string, string> = {
  Sun: "सूर्य",
  Moon: "चंद्र",
  Mars: "मंगल",
  Mercury: "बुध",
  Jupiter: "गुरु",
  Venus: "शुक्र",
  Saturn: "शनि",
};

function getColor(v: number): string {
  if (v <= 3) return "bg-red-100 text-red-800 border-red-200";
  if (v <= 5) return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-green-100 text-green-800 border-green-200";
}

function getSarvaColor(v: number): string {
  if (v < 25) return "bg-red-100 text-red-700";
  if (v < 30) return "bg-amber-100 text-amber-700";
  return "bg-green-100 text-green-700";
}

const BEST_TRANSIT = SIGN_NAMES.filter((_, i) => SARVA[i] >= 30);

export default function Ashtakavarga() {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="min-h-screen bg-background" data-ocid="ashtakavarga.page">
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "अष्टकवर्ग सिस्टम" : "Ashtakavarga System"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            {isHi
              ? "अष्टकवर्ग ग्रह गोचर विश्लेषण की वैदिक विधि है। प्रत्येक राशि को 0-8 अंक मिलते हैं जो ग्रह गोचर की अनुकूलता दर्शाते हैं।"
              : "Ashtakavarga is the Vedic method of transit analysis. Each sign receives 0-8 points from each planet, indicating favorable or unfavorable transit periods."}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Best Transit */}
        <Card className="border-primary/20">
          <CardContent className="pt-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              {isHi ? "श्रेष्ठ गोचर राशियां" : "Best Transit Signs (30+ points)"}
            </div>
            <div className="flex flex-wrap gap-2">
              {BEST_TRANSIT.map((s) => (
                <Badge key={s} className="bg-green-100 text-green-800">
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Color legend */}
        <div className="flex gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-200 inline-block" />
            {isHi ? "निम्न (0-3)" : "Low (0-3)"}
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-amber-200 inline-block" />
            {isHi ? "मध्यम (4-5)" : "Medium (4-5)"}
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-200 inline-block" />
            {isHi ? "उच्च (6-8)" : "High (6-8)"}
          </div>
        </div>

        {/* Sarvashtakavarga */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isHi ? "सर्वाष्टकवर्ग" : "Sarvashtakavarga"}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table
              className="w-full text-xs"
              data-ocid="ashtakavarga.sarva.table"
            >
              <thead>
                <tr className="border-b">
                  {SIGNS.map((s) => (
                    <th key={s} className="p-2 font-semibold text-center">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {SARVA.map((v, i) => (
                    <td
                      key={`sarva-sign-${SIGNS[i]}`}
                      className={`p-2 text-center font-bold rounded ${getSarvaColor(v)}`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Bhinnashtakavarga */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isHi ? "भिन्नाष्टकवर्ग" : "Bhinnashtakavarga"}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table
              className="w-full text-xs"
              data-ocid="ashtakavarga.bhinna.table"
            >
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">{isHi ? "ग्रह" : "Planet"}</th>
                  {SIGNS.map((s) => (
                    <th key={s} className="p-2 font-semibold text-center">
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(BHINNA).map(([planet, vals], pi) => (
                  <tr
                    key={planet}
                    className="border-b"
                    data-ocid={`ashtakavarga.row.${pi + 1}`}
                  >
                    <td className="p-2 font-semibold text-left">
                      {isHi ? HI_PLANETS[planet] : planet}
                    </td>

                    {vals.map((v, i) => (
                      <td
                        key={`${planet}-sign-${SIGNS[i]}`}
                        className={`p-2 text-center rounded ${getColor(v)}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
