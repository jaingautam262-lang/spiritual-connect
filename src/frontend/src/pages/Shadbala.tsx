import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const PLANETS_ORDER = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
];
const HI_PLANETS: Record<string, string> = {
  Sun: "सूर्य",
  Moon: "चंद्र",
  Mars: "मंगल",
  Mercury: "बुध",
  Jupiter: "गुरु",
  Venus: "शुक्र",
  Saturn: "शनि",
};

const SHADBALA_DATA: Record<
  string,
  {
    sthana: number;
    dig: number;
    kala: number;
    cheshta: number;
    naisargika: number;
    drik: number;
  }
> = {
  Sun: {
    sthana: 195,
    dig: 45,
    kala: 88,
    cheshta: 0,
    naisargika: 60,
    drik: -12,
  },
  Moon: {
    sthana: 120,
    dig: 10,
    kala: 102,
    cheshta: 25,
    naisargika: 51,
    drik: 8,
  },
  Mars: {
    sthana: 80,
    dig: 65,
    kala: 55,
    cheshta: 40,
    naisargika: 17,
    drik: -5,
  },
  Mercury: {
    sthana: 155,
    dig: 50,
    kala: 75,
    cheshta: 30,
    naisargika: 26,
    drik: 15,
  },
  Jupiter: {
    sthana: 175,
    dig: 20,
    kala: 95,
    cheshta: 0,
    naisargika: 34,
    drik: 20,
  },
  Venus: {
    sthana: 100,
    dig: 30,
    kala: 68,
    cheshta: 35,
    naisargika: 43,
    drik: 10,
  },
  Saturn: {
    sthana: 60,
    dig: 5,
    kala: 45,
    cheshta: 50,
    naisargika: 9,
    drik: -20,
  },
};

function total(p: (typeof SHADBALA_DATA)["Sun"]) {
  return (
    p.sthana + p.dig + p.kala + p.cheshta + p.naisargika + Math.max(0, p.drik)
  );
}

const MAX_TOTAL = 450;

export default function Shadbala() {
  const { language } = useLanguage();
  const isHi = language === "hi";

  const sorted = [...PLANETS_ORDER].sort(
    (a, b) => total(SHADBALA_DATA[b]) - total(SHADBALA_DATA[a]),
  );
  const strong = sorted.slice(0, 3);
  const weak = sorted.slice(-2);

  return (
    <div className="min-h-screen bg-background" data-ocid="shadbala.page">
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi
              ? "षड्बल — छ: शक्ति स्रोत"
              : "Shadbala — Six Sources of Strength"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            {isHi
              ? "षड्बल ग्रहों की शक्ति का मापन करने की वैदिक विधि है। छ: कारक — स्थान बल, दिग् बल, काल बल, चेष्टा बल, नैसर्गिक बल और दृक् बल।"
              : "Shadbala is the Vedic method of measuring planetary strength through six factors: Sthana, Dig, Kala, Cheshta, Naisargika, and Drik Bala."}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-primary/20">
            <CardContent className="pt-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                {isHi ? "शक्तिशाली ग्रह" : "Strong Planets"}
              </div>
              <div className="flex flex-wrap gap-2">
                {strong.map((p) => (
                  <Badge key={p} className="bg-green-100 text-green-800">
                    {isHi ? HI_PLANETS[p] : p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-destructive/20">
            <CardContent className="pt-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                {isHi ? "कमज़ोर ग्रह" : "Weaker Planets"}
              </div>
              <div className="flex flex-wrap gap-2">
                {weak.map((p) => (
                  <Badge key={p} variant="destructive">
                    {isHi ? HI_PLANETS[p] : p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isHi ? "षड्बल विवरण" : "Shadbala Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="shadbala.table">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "ग्रह" : "Planet"}
                  </th>
                  <th className="text-right p-2 text-xs">
                    {isHi ? "स्थान" : "Sthana"}
                  </th>
                  <th className="text-right p-2 text-xs">
                    {isHi ? "दिग्" : "Dig"}
                  </th>
                  <th className="text-right p-2 text-xs">
                    {isHi ? "काल" : "Kala"}
                  </th>
                  <th className="text-right p-2 text-xs">
                    {isHi ? "चेष्टा" : "Cheshta"}
                  </th>
                  <th className="text-right p-2 text-xs">
                    {isHi ? "नैसर्गिक" : "Naisa."}
                  </th>
                  <th className="text-right p-2 text-xs">
                    {isHi ? "द्ृक्" : "Drik"}
                  </th>
                  <th className="text-right p-3 font-semibold">
                    {isHi ? "कुल" : "Total"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLANETS_ORDER.map((p, i) => {
                  const d = SHADBALA_DATA[p];
                  const t = total(d);
                  const pct = (t / MAX_TOTAL) * 100;
                  return (
                    <tr
                      key={p}
                      className="border-b hover:bg-muted/20"
                      data-ocid={`shadbala.row.${i + 1}`}
                    >
                      <td className="p-3 font-medium">
                        {isHi ? HI_PLANETS[p] : p}
                      </td>
                      <td className="p-2 text-right text-xs">{d.sthana}</td>
                      <td className="p-2 text-right text-xs">{d.dig}</td>
                      <td className="p-2 text-right text-xs">{d.kala}</td>
                      <td className="p-2 text-right text-xs">{d.cheshta}</td>
                      <td className="p-2 text-right text-xs">{d.naisargika}</td>
                      <td
                        className={`p-2 text-right text-xs ${d.drik < 0 ? "text-destructive" : ""}`}
                      >
                        {d.drik}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-2 w-20 bg-muted rounded overflow-hidden">
                            <div
                              className="h-full bg-primary rounded"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="font-semibold w-8 text-right">
                            {t}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
