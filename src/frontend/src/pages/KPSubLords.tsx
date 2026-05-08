import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

const KP_ROWS: {
  planet: string;
  degree: string;
  sl: string;
  nl: string;
  sb: string;
  ss: string;
  retro: boolean;
  hi: { planet: string };
}[] = [
  {
    planet: "Ascendant",
    degree: "225°30'",
    sl: "Ma",
    nl: "Ke",
    sb: "Ra",
    ss: "Su",
    retro: false,
    hi: { planet: "लग्न" },
  },
  {
    planet: "Sun",
    degree: "202°15'",
    sl: "Ve",
    nl: "Vi",
    sb: "Mo",
    ss: "Ma",
    retro: false,
    hi: { planet: "सूर्य" },
  },
  {
    planet: "Moon",
    degree: "278°45'",
    sl: "Sa",
    nl: "Ut",
    sb: "Sa",
    ss: "Me",
    retro: false,
    hi: { planet: "चंद्र" },
  },
  {
    planet: "Mars",
    degree: "168°20'",
    sl: "Me",
    nl: "Ha",
    sb: "Ve",
    ss: "Ju",
    retro: false,
    hi: { planet: "मंगल" },
  },
  {
    planet: "Mercury",
    degree: "223°10'",
    sl: "Ma",
    nl: "Ke",
    sb: "Ju",
    ss: "Ve",
    retro: true,
    hi: { planet: "बुध" },
  },
  {
    planet: "Jupiter",
    degree: "95°05'",
    sl: "Me",
    nl: "Pu",
    sb: "Me",
    ss: "Ve",
    retro: false,
    hi: { planet: "गुरु" },
  },
  {
    planet: "Venus",
    degree: "215°30'",
    sl: "Ma",
    nl: "Vi",
    sb: "Sa",
    ss: "Sa",
    retro: false,
    hi: { planet: "शुक्र" },
  },
  {
    planet: "Saturn",
    degree: "320°45'",
    sl: "Sa",
    nl: "Pu",
    sb: "Ve",
    ss: "Ra",
    retro: true,
    hi: { planet: "शनि" },
  },
  {
    planet: "Rahu",
    degree: "10°20'",
    sl: "Ma",
    nl: "Ash",
    sb: "Ke",
    ss: "Mo",
    retro: false,
    hi: { planet: "राहु" },
  },
  {
    planet: "Ketu",
    degree: "190°20'",
    sl: "Ve",
    nl: "Chi",
    sb: "Mo",
    ss: "Ju",
    retro: false,
    hi: { planet: "केतु" },
  },
];

const COL_DESCS = [
  {
    col: "SL",
    en: "Sign Lord — the lord of the zodiac sign",
    hi: "राशिपति — राशि के स्वामी ग्रह",
  },
  {
    col: "NL",
    en: "Nakshatra Lord — the lord of the nakshatra",
    hi: "नक्षत्रपति — नक्षत्र के स्वामी ग्रह",
  },
  {
    col: "SB",
    en: "Sub Lord — the KP sub-division lord (most important)",
    hi: "सब-लॉर्ड — KP उपविभाजन स्वामी (सर्वाधिक महत्वपूर्ण)",
  },
  {
    col: "SS",
    en: "Sub Sub Lord — further KP sub-division",
    hi: "सब-सब लॉर्ड — आगे KP उपविभाजन",
  },
];

export default function KPSubLords() {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <div className="min-h-screen bg-background" data-ocid="kp-sublords.page">
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "KP सब-लॉर्ड्स तालिका" : "KP Sub-Lords Table"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            {isHi
              ? "KP (Krishnamurti Paddhati) सिस्टम में प्रत्येक ग्रह को राशिपति, नक्षत्रपति, सब-लॉर्ड और सब–सब लॉर्ड के माध्यम से विश्लेषित किया जाता है।"
              : "In the KP (Krishnamurti Paddhati) system, each planet is analyzed through Sign Lord, Nakshatra Lord, Sub-Lord, and Sub Sub Lord for precise event timing."}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Column explanation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {COL_DESCS.map((c) => (
            <Card key={c.col} className="bg-muted/40">
              <CardContent className="p-3">
                <div className="font-bold text-primary text-lg">{c.col}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {isHi ? c.hi : c.en}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {isHi ? "KP सब-लॉर्ड्स" : "KP Sub-Lords"}
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="kp-sublords.table">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "ग्रह" : "Planet"}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {isHi ? "अंश" : "Degree"}
                  </th>
                  <th className="text-left p-3 font-semibold">SL</th>
                  <th className="text-left p-3 font-semibold">NL</th>
                  <th className="text-left p-3 font-semibold">SB</th>
                  <th className="text-left p-3 font-semibold">SS</th>
                </tr>
              </thead>
              <tbody>
                {KP_ROWS.map((r, i) => (
                  <tr
                    key={r.planet}
                    className="border-b hover:bg-muted/20 transition-colors"
                    data-ocid={`kp-sublords.row.${i + 1}`}
                  >
                    <td className="p-3 font-medium">
                      {isHi ? r.hi.planet : r.planet}
                      {r.retro && (
                        <Badge
                          variant="outline"
                          className="ml-2 text-[10px] text-destructive border-destructive/40 py-0"
                        >
                          R
                        </Badge>
                      )}
                    </td>
                    <td className="p-3 font-mono text-xs">{r.degree}</td>
                    <td className="p-3 font-semibold text-primary">{r.sl}</td>
                    <td className="p-3">{r.nl}</td>
                    <td className="p-3 font-semibold text-primary">{r.sb}</td>
                    <td className="p-3">{r.ss}</td>
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
