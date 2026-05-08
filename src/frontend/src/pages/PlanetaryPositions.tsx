import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const PLANETS: {
  planet: string;
  sign: string;
  degree: string;
  nakshatra: string;
  pada: string;
  house: number;
  retro: boolean;
  hi: { planet: string };
}[] = [
  {
    planet: "Ascendant",
    sign: "Scorpio",
    degree: "15°30'",
    nakshatra: "Anuradha",
    pada: "2nd",
    house: 1,
    retro: false,
    hi: { planet: "लग्न" },
  },
  {
    planet: "Sun",
    sign: "Libra",
    degree: "22°15'",
    nakshatra: "Vishakha",
    pada: "3rd",
    house: 12,
    retro: false,
    hi: { planet: "सूर्य" },
  },
  {
    planet: "Moon",
    sign: "Capricorn",
    degree: "8°45'",
    nakshatra: "Uttara Ashadha",
    pada: "1st",
    house: 3,
    retro: false,
    hi: { planet: "चंद्र" },
  },
  {
    planet: "Mars",
    sign: "Virgo",
    degree: "18°20'",
    nakshatra: "Hasta",
    pada: "3rd",
    house: 11,
    retro: false,
    hi: { planet: "मंगल" },
  },
  {
    planet: "Mercury",
    sign: "Scorpio",
    degree: "12°10'",
    nakshatra: "Anuradha",
    pada: "1st",
    house: 1,
    retro: true,
    hi: { planet: "बुध" },
  },
  {
    planet: "Jupiter",
    sign: "Gemini",
    degree: "25°05'",
    nakshatra: "Punarvasu",
    pada: "4th",
    house: 8,
    retro: false,
    hi: { planet: "गुरु" },
  },
  {
    planet: "Venus",
    sign: "Scorpio",
    degree: "5°30'",
    nakshatra: "Vishakha",
    pada: "1st",
    house: 1,
    retro: false,
    hi: { planet: "शुक्र" },
  },
  {
    planet: "Saturn",
    sign: "Aquarius",
    degree: "20°45'",
    nakshatra: "Purva Bhadrapada",
    pada: "3rd",
    house: 4,
    retro: true,
    hi: { planet: "शनि" },
  },
  {
    planet: "Rahu",
    sign: "Aries",
    degree: "10°20'",
    nakshatra: "Ashwini",
    pada: "2nd",
    house: 6,
    retro: false,
    hi: { planet: "राहु" },
  },
  {
    planet: "Ketu",
    sign: "Libra",
    degree: "10°20'",
    nakshatra: "Swati",
    pada: "2nd",
    house: 12,
    retro: false,
    hi: { planet: "केतु" },
  },
];

export default function PlanetaryPositions() {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="planetary-positions.page"
    >
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "ग्रह स्थिति" : "Planetary Positions"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isHi
              ? "सभी ग्रहों की राशि, नक्षत्र और भाव स्थिति"
              : "Sign, degree, nakshatra & house placement for all planets"}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isHi ? "ग्रह स्थिति तालिका" : "Planetary Positions Table"}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table
              className="w-full text-sm"
              data-ocid="planetary-positions.table"
            >
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "ग्रह" : "Planet"}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "राशि" : "Sign"}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "अंश" : "Degree"}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "नक्षत्र" : "Nakshatra"}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "पाद" : "Pada"}
                  </th>
                  <th className="text-right p-3 font-semibold">
                    {isHi ? "भाव" : "House"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLANETS.map((p, i) => (
                  <tr
                    key={p.planet}
                    className="border-b hover:bg-muted/20 transition-colors"
                    data-ocid={`planetary-positions.row.${i + 1}`}
                  >
                    <td className="p-3 font-medium">
                      {isHi ? p.hi.planet : p.planet}
                      {p.retro && (
                        <Badge
                          variant="outline"
                          className="ml-2 text-[10px] text-destructive border-destructive/40 py-0"
                        >
                          R
                        </Badge>
                      )}
                    </td>
                    <td className="p-3">{p.sign}</td>
                    <td className="p-3 font-mono text-xs">{p.degree}</td>
                    <td className="p-3">{p.nakshatra}</td>
                    <td className="p-3">{p.pada}</td>
                    <td className="p-3 text-right font-semibold text-primary">
                      {p.house}
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
