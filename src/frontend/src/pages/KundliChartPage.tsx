import { KundliChartSVG } from "@/components/KundliChartSVG";
import type { HouseData } from "@/components/KundliChartSVG";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useParams } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

const SIGNS = [
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
const SIGN_ABBR: Record<string, string> = {
  Aries: "Ar",
  Taurus: "Ta",
  Gemini: "Ge",
  Cancer: "Ca",
  Leo: "Le",
  Virgo: "Vi",
  Libra: "Li",
  Scorpio: "Sc",
  Sagittarius: "Sg",
  Capricorn: "Cp",
  Aquarius: "Aq",
  Pisces: "Pi",
};

// D1 sample data — Ascendant: Scorpio (house 1)
const D1_PLANETS: {
  planet: string;
  abbr: string;
  sign: string;
  house: number;
}[] = [
  { planet: "Ascendant", abbr: "Asc", sign: "Scorpio", house: 1 },
  { planet: "Sun", abbr: "Su", sign: "Libra", house: 12 },
  { planet: "Moon", abbr: "Mo", sign: "Capricorn", house: 3 },
  { planet: "Mars", abbr: "Ma", sign: "Virgo", house: 11 },
  { planet: "Mercury", abbr: "Me", sign: "Scorpio", house: 1 },
  { planet: "Jupiter", abbr: "Ju", sign: "Gemini", house: 8 },
  { planet: "Venus", abbr: "Ve", sign: "Scorpio", house: 1 },
  { planet: "Saturn", abbr: "Sa", sign: "Aquarius", house: 4 },
  { planet: "Rahu", abbr: "Ra", sign: "Aries", house: 6 },
  { planet: "Ketu", abbr: "Ke", sign: "Libra", house: 12 },
];

function buildD1Houses(): HouseData[] {
  const ascIdx = SIGNS.indexOf("Scorpio");
  return SIGNS.map((sign, i) => {
    const house = ((i - ascIdx + 12) % 12) + 1;
    const planets = D1_PLANETS.filter((p) => p.sign === sign).map(
      (p) => p.abbr,
    );
    return {
      house,
      sign,
      signAbbr: SIGN_ABBR[sign] ?? sign.slice(0, 2),
      planets,
    };
  });
}

function buildDivisionalHouses(divisor: number): HouseData[] {
  // Simple redistribution for demo: rotate planets around the wheel
  const base = buildD1Houses();
  return base.map((h) => ({
    ...h,
    house: ((h.house + divisor - 1) % 12) + 1,
    planets: h.planets,
  }));
}

const CHART_META: Record<
  string,
  {
    name: string;
    desc: string;
    reveals: string;
    hi: { name: string; reveals: string };
  }
> = {
  d1: {
    name: "D1 — Lagna / Birth Chart",
    desc: "The primary birth chart showing all life events",
    reveals:
      "The D1 chart is the foundation of Vedic astrology. It reveals your overall personality, health, family, career, relationships, and major life events through the 12 houses and planetary placements.",
    hi: {
      name: "D1 — लग्न / जन्म कुंडली",
      reveals:
        "D1 चार्ट वैदिक ज्योतिष की नींव है। यह 12 भावों और ग्रह स्थितियों के माध्यम से आपके संपूर्ण व्यक्तित्व, स्वास्थ्य, परिवार, करियर और जीवन के प्रमुख घटनाओं को दर्शाता है।",
    },
  },
  d2: {
    name: "D2 — Hora",
    desc: "Wealth and financial prosperity",
    reveals:
      "The Hora chart divides each sign into two equal parts showing solar (male) and lunar (female) energies. It reveals your innate capacity to accumulate wealth and the sources of your financial gains.",
    hi: {
      name: "D2 — होरा",
      reveals: "होरा चार्ट आपकी धन संचय क्षमता और वित्तीय स्रोतों को दर्शाता है।",
    },
  },
  d3: {
    name: "D3 — Drekkana",
    desc: "Siblings, courage and co-born",
    reveals:
      "The Drekkana chart governs siblings, valor, and short journeys. Strong planets here indicate supportive siblings and natural courage in facing life's challenges.",
    hi: {
      name: "D3 — द्रेक्काण",
      reveals: "यह चार्ट भाई-बहन, साहस और छोटी यात्राओं को दर्शाता है।",
    },
  },
  d4: {
    name: "D4 — Chaturthamsha",
    desc: "Property, home and fixed assets",
    reveals:
      "The Chaturthamsha chart shows your fortune regarding real estate, vehicles, and fixed assets. It also indicates general happiness and comfort in domestic life.",
    hi: {
      name: "D4 — चतुर्थांश",
      reveals: "यह चार्ट संपत्ति, वाहन और स्थायी संपदा को दर्शाता है।",
    },
  },
  d7: {
    name: "D7 — Saptamsha",
    desc: "Children and creative progeny",
    reveals:
      "The Saptamsha chart focuses on progeny, children, and creative output. Strong Jupiter and 5th house lords here support good fortune with children.",
    hi: {
      name: "D7 — सप्तांश",
      reveals: "यह चार्ट संतान सुख और रचनात्मक उत्पादन को दर्शाता है।",
    },
  },
  d9: {
    name: "D9 — Navamsa",
    desc: "Marriage, spouse and dharma",
    reveals:
      "The Navamsa is considered the most important divisional chart after D1. It reveals the quality of marriage, spouse's characteristics, and your spiritual dharma in this lifetime.",
    hi: {
      name: "D9 — नवांश",
      reveals:
        "नवांश विवाह की गुणवत्ता, पति/पत्नी के गुण और आपके आध्यात्मिक धर्म को दर्शाता है।",
    },
  },
  d10: {
    name: "D10 — Dashamsha",
    desc: "Career, fame and professional success",
    reveals:
      "The Dashamsha chart is the primary tool for analyzing career and professional achievements. Strong planets here indicate success, fame, and advancement in one's chosen profession.",
    hi: {
      name: "D10 — दशांश",
      reveals: "यह करियर, प्रसिद्धि और पेशेवर सफलता का प्रमुख विश्लेषण उपकरण है।",
    },
  },
  d12: {
    name: "D12 — Dwadashamsha",
    desc: "Parents, ancestry and lineage",
    reveals:
      "The Dwadashamsha chart reveals the karma inherited from parents and ancestors. It shows the nature of parental support and the influence of family heritage on your life.",
    hi: {
      name: "D12 — द्वादशांश",
      reveals: "यह माता-पिता, पूर्वजों और वंशावली के कर्म को दर्शाता है।",
    },
  },
  d16: {
    name: "D16 — Shodashamsha",
    desc: "Vehicles, comforts and luxury",
    reveals:
      "The Shodashamsha chart governs vehicles, comforts, luxuries, and mental happiness. Strong Venus and 4th house indicate good fortune with vehicles and material comforts.",
    hi: {
      name: "D16 — षोडशांश",
      reveals: "यह वाहन, सुख-सुविधा और विलासिता को दर्शाता है।",
    },
  },
  d20: {
    name: "D20 — Vimshamsha",
    desc: "Spiritual progress and worship",
    reveals:
      "The Vimshamsha chart is the primary indicator of spiritual development, religious practices, and devotional activities. It shows your path to liberation and enlightenment.",
    hi: {
      name: "D20 — विंशांश",
      reveals: "यह आध्यात्मिक प्रगति और पूजा-उपासना को दर्शाता है।",
    },
  },
  d24: {
    name: "D24 — Chaturvimshamsha",
    desc: "Education, learning and wisdom",
    reveals:
      "The Chaturvimshamsha chart governs all forms of education, learning, and acquisition of knowledge. Strong Mercury and Jupiter here indicate scholarly success and academic achievement.",
    hi: {
      name: "D24 — चतुर्विंशांश",
      reveals: "यह शिक्षा, ज्ञान और विद्या को दर्शाता है।",
    },
  },
  d27: {
    name: "D27 — Saptavimshamsha",
    desc: "Strength, vitality and power",
    reveals:
      "The Saptavimshamsha chart reveals your physical and mental strength, vitality, and overall power. It shows innate capabilities and the ability to overcome obstacles.",
    hi: {
      name: "D27 — सप्तविंशांश",
      reveals: "यह शक्ति, जीवन शक्ति और समग्र बल को दर्शाता है।",
    },
  },
  d30: {
    name: "D30 — Trimshamsha",
    desc: "Misfortunes, evils and challenges",
    reveals:
      "The Trimshamsha chart identifies potential areas of difficulty, health challenges, and karmic obstacles. It is used to predict evil influences and remedial measures.",
    hi: {
      name: "D30 — त्रिंशांश",
      reveals: "यह दुर्भाग्य, बाधाओं और कर्म चुनौतियों को दर्शाता है।",
    },
  },
  d40: {
    name: "D40 — Khavedamsha",
    desc: "Maternal karma and lineage",
    reveals:
      "The Khavedamsha chart shows maternal lineage karma and auspicious/inauspicious influences inherited from the mother's side of the family.",
    hi: { name: "D40 — खवेदांश", reveals: "यह मातृ कर्म और वंश प्रभाव को दर्शाता है।" },
  },
  d45: {
    name: "D45 — Akshavedamsha",
    desc: "Paternal karma and character",
    reveals:
      "The Akshavedamsha chart reveals paternal karma and character influences. It shows the deep moral character and ethical inclinations inherited from the paternal lineage.",
    hi: {
      name: "D45 — अक्षवेदांश",
      reveals: "यह पितृ कर्म और चरित्र गुणों को दर्शाता है।",
    },
  },
  d60: {
    name: "D60 — Shashtyamsha",
    desc: "Past life karma and overall fortune",
    reveals:
      "The Shashtyamsha is considered the most subtle and important divisional chart representing past-life karma. Each of the 60 positions has a specific name indicating karmic quality.",
    hi: {
      name: "D60 — षष्ट्यांश",
      reveals: "यह पिछले जन्म के कर्म और समग्र भाग्य को दर्शाता है।",
    },
  },
  moon: {
    name: "Moon Chart",
    desc: "Emotional patterns and mind",
    reveals:
      "The Moon chart treats the Moon sign as the ascendant. It reveals emotional patterns, mental tendencies, and mother's influence. Widely used in South Indian and KP astrology.",
    hi: {
      name: "चंद्र कुंडली",
      reveals:
        "चंद्र कुंडली भावनात्मक पैटर्न, मानसिक प्रवृत्तियों और माता के प्रभाव को दर्शाती है।",
    },
  },
  sun: {
    name: "Sun Chart",
    desc: "Soul purpose and life force",
    reveals:
      "The Sun chart places the Sun sign as the ascendant. It reveals the soul's purpose, life force, and the father's influence. Particularly useful in solar return readings.",
    hi: {
      name: "सूर्य कुंडली",
      reveals: "सूर्य कुंडली आत्मा के उद्देश्य, जीवन शक्ति और पिता के प्रभाव को दर्शाती है।",
    },
  },
  "kp-transit": {
    name: "KP Transit Chart",
    desc: "KP system transit analysis",
    reveals:
      "The KP Transit chart uses Krishnamurti Paddhati system to analyze current planetary transits through sub-lord divisions. It provides highly precise timing predictions for events.",
    hi: {
      name: "KP ट्रांजिट चार्ट",
      reveals: "यह KP सिस्टम के अनुसार वर्तमान ग्रह गोचर का विश्लेषण करता है।",
    },
  },
};

const PLANET_TABLE: {
  planet: string;
  abbr: string;
  sign: string;
  degree: string;
  nakshatra: string;
  pada: string;
  house: number;
  retro: boolean;
}[] = [
  {
    planet: "Ascendant",
    abbr: "Asc",
    sign: "Scorpio",
    degree: "15°30'",
    nakshatra: "Anuradha",
    pada: "2nd",
    house: 1,
    retro: false,
  },
  {
    planet: "Sun",
    abbr: "Su",
    sign: "Libra",
    degree: "22°15'",
    nakshatra: "Vishakha",
    pada: "3rd",
    house: 12,
    retro: false,
  },
  {
    planet: "Moon",
    abbr: "Mo",
    sign: "Capricorn",
    degree: "8°45'",
    nakshatra: "Uttara Ashadha",
    pada: "1st",
    house: 3,
    retro: false,
  },
  {
    planet: "Mars",
    abbr: "Ma",
    sign: "Virgo",
    degree: "18°20'",
    nakshatra: "Hasta",
    pada: "3rd",
    house: 11,
    retro: false,
  },
  {
    planet: "Mercury",
    abbr: "Me",
    sign: "Scorpio",
    degree: "12°10'",
    nakshatra: "Anuradha",
    pada: "1st",
    house: 1,
    retro: true,
  },
  {
    planet: "Jupiter",
    abbr: "Ju",
    sign: "Gemini",
    degree: "25°05'",
    nakshatra: "Punarvasu",
    pada: "4th",
    house: 8,
    retro: false,
  },
  {
    planet: "Venus",
    abbr: "Ve",
    sign: "Scorpio",
    degree: "5°30'",
    nakshatra: "Vishakha",
    pada: "1st",
    house: 1,
    retro: false,
  },
  {
    planet: "Saturn",
    abbr: "Sa",
    sign: "Aquarius",
    degree: "20°45'",
    nakshatra: "Purva Bhadrapada",
    pada: "3rd",
    house: 4,
    retro: true,
  },
  {
    planet: "Rahu",
    abbr: "Ra",
    sign: "Aries",
    degree: "10°20'",
    nakshatra: "Ashwini",
    pada: "2nd",
    house: 6,
    retro: false,
  },
  {
    planet: "Ketu",
    abbr: "Ke",
    sign: "Libra",
    degree: "10°20'",
    nakshatra: "Swati",
    pada: "2nd",
    house: 12,
    retro: false,
  },
];

export default function KundliChartPage() {
  const { chartId } = useParams({ strict: false }) as { chartId?: string };
  const id = chartId ?? "d1";
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isHi = language === "hi";

  const meta = CHART_META[id] ?? CHART_META.d1;
  const divisorMap: Record<string, number> = {
    d1: 0,
    d2: 1,
    d3: 2,
    d4: 3,
    d7: 6,
    d9: 8,
    d10: 9,
    d12: 11,
    d16: 15,
    d20: 19,
    d24: 23,
    d27: 26,
    d30: 29,
    d40: 39,
    d45: 44,
    d60: 59,
    moon: 2,
    sun: 4,
    "kp-transit": 6,
  };
  const divisor = divisorMap[id] ?? 0;
  const houses: HouseData[] =
    divisor === 0 ? buildD1Houses() : buildDivisionalHouses(divisor);

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid={`kundli-chart.${id}.page`}
    >
      <div className="bg-card border-b py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/kundli" })}
                className="text-xs px-2"
              >
                ← {isHi ? "वापस" : "Back"}
              </Button>
              <Badge variant="outline">{id.toUpperCase()}</Badge>
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">
              {isHi ? meta.hi.name : meta.name}
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">{meta.desc}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">
                {isHi ? "कुंडली चार्ट" : "Kundli Chart"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <KundliChartSVG houses={houses} showToggle />
            </CardContent>
          </Card>

          {/* Right side */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  {isHi
                    ? "यह चार्ट क्या प्रकट करता है?"
                    : "What this chart reveals"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isHi ? meta.hi.reveals : meta.reveals}
                </p>
              </CardContent>
            </Card>

            {/* Planet positions mini-table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  {isHi ? "ग्रह स्थिति" : "Planet Positions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="text-left pb-2">
                        {isHi ? "ग्रह" : "Planet"}
                      </th>
                      <th className="text-left pb-2">
                        {isHi ? "राशि" : "Sign"}
                      </th>
                      <th className="text-left pb-2">
                        {isHi ? "भाव" : "House"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLANET_TABLE.map((p) => (
                      <tr key={p.planet} className="border-b/50">
                        <td className="py-1 font-medium">
                          {p.planet}
                          {p.retro && (
                            <span className="text-destructive ml-1">(R)</span>
                          )}
                        </td>
                        <td className="py-1">{p.sign}</td>
                        <td className="py-1">{p.house}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
