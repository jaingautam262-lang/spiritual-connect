import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const MAHADASHA_SEQUENCE = [
  {
    planet: "Sun",
    years: 6,
    startAge: 0,
    color: "bg-amber-100 text-amber-800",
    hi: "सूर्य",
  },
  {
    planet: "Moon",
    years: 10,
    startAge: 6,
    color: "bg-blue-100 text-blue-800",
    hi: "चंद्र",
  },
  {
    planet: "Mars",
    years: 7,
    startAge: 16,
    color: "bg-red-100 text-red-800",
    hi: "मंगल",
  },
  {
    planet: "Rahu",
    years: 18,
    startAge: 23,
    color: "bg-gray-100 text-gray-800",
    hi: "राहु",
  },
  {
    planet: "Jupiter",
    years: 16,
    startAge: 41,
    color: "bg-yellow-100 text-yellow-800",
    hi: "गुरु",
  },
  {
    planet: "Saturn",
    years: 19,
    startAge: 57,
    color: "bg-indigo-100 text-indigo-800",
    hi: "शनि",
  },
  {
    planet: "Mercury",
    years: 17,
    startAge: 76,
    color: "bg-green-100 text-green-800",
    hi: "बुध",
  },
  {
    planet: "Ketu",
    years: 7,
    startAge: 93,
    color: "bg-purple-100 text-purple-800",
    hi: "केतु",
  },
  {
    planet: "Venus",
    years: 20,
    startAge: 100,
    color: "bg-pink-100 text-pink-800",
    hi: "शुक्र",
  },
];

const CURRENT_DASHA = {
  mahadasha: "Saturn",
  antardasha: "Venus",
  pratyantar: "Jupiter",
};
const BIRTH_YEAR = 1985;

export default function KundliDasha() {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - BIRTH_YEAR;

  return (
    <div className="min-h-screen bg-background" data-ocid="kundli-dasha.page">
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "विंशोत्तरी दशा" : "Vimshottari Dasha"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            {isHi
              ? "विंशोत्तरी दशा 120 वर्षों कॎ चक्र है जो जन्म नक्षत्र से शुरू होता है। प्रत्येक ग्रह एक निश्चित अवधि तक जीवन को प्रभावित करता है।"
              : "Vimshottari Dasha is a 120-year cycle beginning from the birth nakshatra. Each planet rules a specific period, deeply influencing life events during that time."}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Current Dasha Indicator */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-4 pb-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              {isHi ? "वर्तमान दशा" : "Current Dasha"}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge className="text-sm px-3 py-1">
                {isHi ? "शनि" : CURRENT_DASHA.mahadasha}{" "}
                {isHi ? "महादशा" : "Mahadasha"}
              </Badge>
              <span className="text-muted-foreground text-sm">→</span>
              <Badge variant="secondary" className="text-sm px-3">
                {isHi ? "शुक्र" : CURRENT_DASHA.antardasha}{" "}
                {isHi ? "अंतरदशा" : "Antardasha"}
              </Badge>
              <span className="text-muted-foreground text-sm">→</span>
              <Badge variant="outline" className="text-sm px-3">
                {isHi ? "गुरु" : CURRENT_DASHA.pratyantar}{" "}
                {isHi ? "प्रत्यंतर" : "Pratyantar"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isHi ? "दशा समयरेखा" : "Dasha Timeline"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MAHADASHA_SEQUENCE.map((d, i) => {
                const startYear = BIRTH_YEAR + d.startAge;
                const endYear = startYear + d.years;
                const isCurrent =
                  currentAge >= d.startAge && currentAge < d.startAge + d.years;
                const barWidth = (d.years / 120) * 100;
                return (
                  <div
                    key={d.planet}
                    data-ocid={`dasha.row.${i + 1}`}
                    className={`rounded-lg p-3 ${isCurrent ? "ring-2 ring-primary" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">
                        {isHi ? d.hi : d.planet}{" "}
                        {isCurrent && (
                          <Badge className="ml-1 text-xs">
                            {isHi ? "वर्तमान" : "Current"}
                          </Badge>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {startYear}–{endYear} ({d.years} {isHi ? "वर्ष" : "yrs"})
                      </span>
                    </div>
                    <div className="h-5 bg-muted rounded overflow-hidden">
                      <div
                        className={`h-full rounded ${d.color}`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Mahadasha Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isHi ? "महादशा क्रम" : "Mahadasha Sequence"}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "ग्रह" : "Planet"}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "वर्ष" : "Years"}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "आयु" : "Age"}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "सन" : "Year"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {MAHADASHA_SEQUENCE.map((d, _i) => (
                  <tr
                    key={d.planet}
                    className={`border-b ${d.planet === CURRENT_DASHA.mahadasha ? "bg-primary/5 font-semibold" : "hover:bg-muted/20"}`}
                  >
                    <td className="p-3">{isHi ? d.hi : d.planet}</td>
                    <td className="p-3">{d.years}</td>
                    <td className="p-3">
                      {d.startAge}–{d.startAge + d.years}
                    </td>
                    <td className="p-3 font-mono text-xs">
                      {BIRTH_YEAR + d.startAge}–
                      {BIRTH_YEAR + d.startAge + d.years}
                    </td>
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
