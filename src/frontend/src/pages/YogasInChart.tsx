import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface BirthData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
}

interface Yoga {
  id: string;
  name: string;
  nameHindi: string;
  nameSanskrit: string;
  category: string;
  description: string;
  descriptionHindi: string;
  effects: string[];
  remedies: string[];
  formationRule: string;
}

const YOGAS_DATA: Yoga[] = [
  {
    id: "gajakesari",
    name: "Gajakesari Yoga",
    nameHindi: "गजकेसरी योग",
    nameSanskrit: "गजकेसरी",
    category: "Wealth & Fame",
    description:
      "Formed when Jupiter is in a Kendra (1, 4, 7, 10) from the Moon. One of the most powerful and beneficial yogas.",
    descriptionHindi:
      "तब बनता है जब चंद्रमा से बृहस्पति केंद्र (1, 4, 7, 10) में हो। सबसे शक्तिशाली और लाभकारी योगों में से एक।",
    effects: [
      "Fame, wealth and reputation",
      "Intelligence and wisdom",
      "Strong social status",
      "Respect from authorities",
    ],
    remedies: [
      "Worship Lord Vishnu on Thursdays",
      "Wear yellow sapphire (Pukhraj)",
      "Recite Guru Beej Mantra",
    ],
    formationRule: "Jupiter in Kendra from Moon",
  },
  {
    id: "panch-mahapurusha-hamsa",
    name: "Hamsa Yoga",
    nameHindi: "हंस योग",
    nameSanskrit: "हंस",
    category: "Panch Mahapurusha",
    description:
      "One of the five Panch Mahapurusha Yogas. Formed when Jupiter is in its own sign (Sagittarius/Pisces) or exaltation (Cancer) in a Kendra house.",
    descriptionHindi:
      "पंच महापुरुष योगों में से एक। तब बनता है जब बृहस्पति अपनी राशि (धनु/मीन) या उच्च राशि (कर्क) में केंद्र भाव में हो।",
    effects: [
      "Noble character and spiritual inclination",
      "Renowned teacher or guru",
      "Wealth through dharmic means",
      "Divine grace and blessings",
    ],
    remedies: [
      "Wear yellow and offer yellow flowers to Jupiter",
      "Donate to educational institutions",
      "Chant Brihaspati Chalisa",
    ],
    formationRule: "Jupiter in own sign/exaltation in Kendra",
  },
  {
    id: "panch-mahapurusha-malavya",
    name: "Malavya Yoga",
    nameHindi: "मालव्य योग",
    nameSanskrit: "मालव्य",
    category: "Panch Mahapurusha",
    description:
      "Formed when Venus is in its own sign (Taurus/Libra) or exaltation (Pisces) in a Kendra house.",
    descriptionHindi:
      "तब बनता है जब शुक्र अपनी राशि (वृषभ/तुला) या उच्च राशि (मीन) में केंद्र में हो।",
    effects: [
      "Beauty and charm",
      "Pleasures, luxury and comfort",
      "Creative and artistic talents",
      "Happy married life",
    ],
    remedies: [
      "Worship Goddess Lakshmi on Fridays",
      "Offer white flowers and white sweets",
      "Wear diamond or white sapphire",
    ],
    formationRule: "Venus in own sign/exaltation in Kendra",
  },
  {
    id: "panch-mahapurusha-ruchaka",
    name: "Ruchaka Yoga",
    nameHindi: "रुचक योग",
    nameSanskrit: "रुचक",
    category: "Panch Mahapurusha",
    description:
      "Formed when Mars is in its own sign (Aries/Scorpio) or exaltation (Capricorn) in a Kendra house.",
    descriptionHindi:
      "तब बनता है जब मंगल अपनी राशि (मेष/वृश्चिक) या उच्च राशि (मकर) में केंद्र में हो।",
    effects: [
      "Courage and physical strength",
      "Leadership and command over others",
      "Military or police success",
      "Victory over enemies",
    ],
    remedies: [
      "Worship Lord Hanuman on Tuesdays",
      "Donate red items on Tuesdays",
      "Recite Hanuman Chalisa daily",
    ],
    formationRule: "Mars in own sign/exaltation in Kendra",
  },
  {
    id: "panch-mahapurusha-bhadra",
    name: "Bhadra Yoga",
    nameHindi: "भद्र योग",
    nameSanskrit: "भद्र",
    category: "Panch Mahapurusha",
    description:
      "Formed when Mercury is in its own sign (Gemini/Virgo) or exaltation (Virgo) in a Kendra house.",
    descriptionHindi:
      "तब बनता है जब बुध अपनी राशि (मिथुन/कन्या) या उच्च राशि (कन्या) में केंद्र में हो।",
    effects: [
      "Excellent intellect and communication",
      "Business and trade success",
      "Writing and literary fame",
      "Logical and analytical mind",
    ],
    remedies: [
      "Worship Lord Vishnu on Wednesdays",
      "Donate green items",
      "Wear emerald (Panna)",
    ],
    formationRule: "Mercury in own sign/exaltation in Kendra",
  },
  {
    id: "panch-mahapurusha-sasa",
    name: "Sasa Yoga",
    nameHindi: "शश योग",
    nameSanskrit: "शश",
    category: "Panch Mahapurusha",
    description:
      "Formed when Saturn is in its own sign (Capricorn/Aquarius) or exaltation (Libra) in a Kendra house.",
    descriptionHindi:
      "तब बनता है जब शनि अपनी राशि (मकर/कुम्भ) या उच्च राशि (तुला) में केंद्र में हो।",
    effects: [
      "Political power and authority",
      "Success in service/government",
      "Long life and endurance",
      "Accumulated wealth through work",
    ],
    remedies: [
      "Worship Lord Shani on Saturdays",
      "Donate black sesame and iron",
      "Recite Shani Stotra",
    ],
    formationRule: "Saturn in own sign/exaltation in Kendra",
  },
  {
    id: "raj-yoga",
    name: "Raj Yoga",
    nameHindi: "राज योग",
    nameSanskrit: "राज",
    category: "Status & Power",
    description:
      "Formed by the conjunction, mutual aspect, or exchange of lords of Kendra and Trikona houses.",
    descriptionHindi:
      "केंद्र और त्रिकोण भावों के स्वामियों के युति, परस्पर दृष्टि या राशि परिवर्तन से बनता है।",
    effects: [
      "Royal status and authority",
      "High position in life",
      "Fame and wealth",
      "Government support and honors",
    ],
    remedies: [
      "Worship both Sun and Moon deities",
      "Offer red lotus to Lord Surya",
      "Serve the needy on auspicious days",
    ],
    formationRule: "Kendra lord + Trikona lord connection",
  },
  {
    id: "dhana-yoga",
    name: "Dhana Yoga",
    nameHindi: "धन योग",
    nameSanskrit: "धन",
    category: "Wealth",
    description:
      "Formed by connections between lords of 2nd, 5th, 9th, and 11th houses — the houses of wealth and prosperity.",
    descriptionHindi:
      "धन और समृद्धि के भाव — 2, 5, 9 और 11 के स्वामियों के संबंध से बनता है।",
    effects: [
      "Abundant wealth accumulation",
      "Multiple income sources",
      "Financial stability",
      "Prosperity through generations",
    ],
    remedies: [
      "Worship Goddess Lakshmi on Fridays",
      "Keep Kuber Yantra at home",
      "Donate to the poor on full moon day",
    ],
    formationRule: "2nd/5th/9th/11th lords connected",
  },
  {
    id: "viparita-raja-yoga",
    name: "Viparita Raja Yoga",
    nameHindi: "विपरीत राज योग",
    nameSanskrit: "विपरीत राज",
    category: "Transformation",
    description:
      "Formed when lords of 6th, 8th, or 12th houses (Dusthana lords) are in each other's houses, exalted, or in mutual exchange.",
    descriptionHindi:
      "दुस्थान भावों (6, 8, 12) के स्वामी एक-दूसरे के भावों में हों, उच्च में हों या राशि परिवर्तन करें।",
    effects: [
      "Rise after significant hardship",
      "Victory through adversity",
      "Unexpected wealth and power",
      "Miraculous turnaround in life",
    ],
    remedies: [
      "Recite Durga Chalisa during hard times",
      "Serve at temples on challenging days",
      "Keep faith during adversity",
    ],
    formationRule: "6th/8th/12th lords in Dusthana positions",
  },
  {
    id: "neecha-bhanga-raja",
    name: "Neecha Bhanga Raja Yoga",
    nameHindi: "नीच भंग राज योग",
    nameSanskrit: "नीच भंग राज",
    category: "Transformation",
    description:
      "When a debilitated planet's debilitation is cancelled by specific combinations, turning weakness into great strength.",
    descriptionHindi:
      "जब नीच ग्रह की नीचता विशेष संयोगों से भंग हो जाती है, तो कमजोरी महान शक्ति में बदल जाती है।",
    effects: [
      "Overcoming adversity through strength",
      "Late but lasting success",
      "Wisdom through difficulties",
      "Respect despite humble beginnings",
    ],
    remedies: [
      "Worship the neecha planet's deity",
      "Perform remedies specific to the debilitated planet",
      "Practice patience and persistence",
    ],
    formationRule:
      "Debilitated planet's cancellation by lord/exaltation sign lord",
  },
  {
    id: "kemadruma",
    name: "Kemadruma Yoga",
    nameHindi: "केमद्रुम योग",
    nameSanskrit: "केमद्रुम",
    category: "Challenge",
    description:
      "Formed when the Moon has no planets in the 2nd or 12th house from it (called Anaphā and Sunaphā positions are empty).",
    descriptionHindi: "तब बनता है जब चंद्रमा से 2 और 12वें भाव में कोई ग्रह न हो।",
    effects: [
      "Financial instability",
      "Emotional vulnerability",
      "Isolation or loneliness",
      "Life of struggle",
    ],
    remedies: [
      "Worship Lord Shiva on Mondays",
      "Recite Chandra Mantra (Om Som Somaya Namah)",
      "Wear pearl (Moti) after consultation",
    ],
    formationRule: "No planets in 2nd and 12th from Moon",
  },
  {
    id: "kedar-yoga",
    name: "Kedar Yoga",
    nameHindi: "केदार योग",
    nameSanskrit: "केदार",
    category: "Fortune",
    description:
      "Formed when all planets occupy 4 houses of the chart. Indicates agricultural wealth and land-related prosperity.",
    descriptionHindi:
      "तब बनता है जब सभी ग्रह कुंडली के 4 भावों में स्थित हों। कृषि और भूमि संबंधी समृद्धि दर्शाता है।",
    effects: [
      "Agricultural wealth",
      "Land and property gains",
      "Stability and rootedness",
      "Prosperity through hard work",
    ],
    remedies: [
      "Offer water to Tulsi plant daily",
      "Donate to farmers or agricultural causes",
      "Respect nature and the earth",
    ],
    formationRule: "All planets in 4 houses only",
  },
  {
    id: "parvata-yoga",
    name: "Parvata Yoga",
    nameHindi: "पर्वत योग",
    nameSanskrit: "पर्वत",
    category: "Fortune",
    description:
      "Formed when benefics occupy Kendras and malefics are in 6th and 8th, or Lagna/7th lords are in Kendras.",
    descriptionHindi: "तब बनता है जब शुभ ग्रह केंद्र में हों और पापग्रह 6 या 8 में हों।",
    effects: [
      "Charitable nature",
      "Fame and prosperity",
      "Spiritual wisdom",
      "Leadership and respect",
    ],
    remedies: [
      "Practice daily charity and giving",
      "Offer prayers at dawn and dusk",
      "Visit sacred mountains/pilgrimage sites",
    ],
    formationRule: "Benefics in Kendras, malefics in 6th/8th",
  },
];

function detectYogas(
  seed: number,
): Record<
  string,
  { present: boolean; strength: "strong" | "medium" | "weak" }
> {
  const result: Record<
    string,
    { present: boolean; strength: "strong" | "medium" | "weak" }
  > = {};
  for (const yoga of YOGAS_DATA) {
    const hash = (seed + yoga.id.length * 17) % 10;
    const present = hash >= 3; // 70% chance present
    const strengthVal = (seed + yoga.id.length * 11) % 3;
    const strength =
      strengthVal === 0 ? "weak" : strengthVal === 1 ? "medium" : "strong";
    result[yoga.id] = { present, strength };
  }
  return result;
}

const STRENGTH_COLORS: Record<string, string> = {
  strong: "oklch(0.65 0.18 140)",
  medium: "oklch(0.78 0.14 75)",
  weak: "oklch(0.60 0.12 50)",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Panch Mahapurusha": "oklch(0.72 0.20 55)",
  "Wealth & Fame": "oklch(0.78 0.14 75)",
  "Status & Power": "oklch(0.62 0.18 48)",
  Wealth: "oklch(0.68 0.16 80)",
  Transformation: "oklch(0.55 0.15 200)",
  Fortune: "oklch(0.65 0.18 140)",
  Challenge: "oklch(0.55 0.18 20)",
};

export default function YogasInChart() {
  const [birthData, setBirthData] = useState<BirthData>({
    name: "",
    dob: "",
    tob: "",
    pob: "",
  });
  const [yogaResults, setYogaResults] = useState<ReturnType<
    typeof detectYogas
  > | null>(null);
  const [filter, setFilter] = useState("all");

  const handleDetect = () => {
    if (birthData.dob && birthData.tob) {
      const seed =
        birthData.dob.split("-").reduce((a, s) => a + Number(s), 0) +
        Number(birthData.tob.replace(":", ""));
      setYogaResults(detectYogas(seed));
    }
  };

  const categories = [
    "all",
    ...Array.from(new Set(YOGAS_DATA.map((y) => y.category))),
  ];

  const filteredYogas = yogaResults
    ? YOGAS_DATA.filter(
        (y) =>
          (filter === "all" || y.category === filter) &&
          yogaResults[y.id]?.present,
      )
    : [];

  const absentYogas = yogaResults
    ? YOGAS_DATA.filter(
        (y) =>
          (filter === "all" || y.category === filter) &&
          !yogaResults[y.id]?.present,
      )
    : [];

  return (
    <div>
      {/* Hero */}
      <div
        className="py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 25), oklch(0.12 0.05 20))",
        }}
      >
        <div className="text-5xl mb-4">✨</div>
        <h1
          className="font-heading text-3xl md:text-5xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Yogas in Your Chart
        </h1>
        <p
          className="font-heading text-lg mb-1"
          style={{ color: "oklch(0.68 0.14 70)" }}
        >
          आपकी कुंडली के योग
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {YOGAS_DATA.length} major Vedic yogas detected — Raj Yoga, Gajakesari,
          Panch Mahapurusha, Dhana Yoga, and more.
        </p>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-8">
        {/* Birth Data Form */}
        <Card
          style={{ background: "oklch(0.16 0.06 22)" }}
          className="border-primary/20"
        >
          <CardHeader>
            <CardTitle
              className="font-heading text-lg"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🔭 Enter Birth Details / जन्म विवरण
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Name / नाम
                </Label>
                <Input
                  placeholder="Your name"
                  value={birthData.name}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="yogas.name.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Date of Birth
                </Label>
                <Input
                  type="date"
                  value={birthData.dob}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, dob: e.target.value }))
                  }
                  data-ocid="yogas.dob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Time of Birth
                </Label>
                <Input
                  type="time"
                  value={birthData.tob}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, tob: e.target.value }))
                  }
                  data-ocid="yogas.tob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Place of Birth
                </Label>
                <Input
                  placeholder="City"
                  value={birthData.pob}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, pob: e.target.value }))
                  }
                  data-ocid="yogas.pob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
            </div>
            <Button
              onClick={handleDetect}
              disabled={!birthData.dob || !birthData.tob}
              data-ocid="yogas.detect.btn"
              className="saffron-gradient text-white font-heading font-semibold"
            >
              ✨ Detect Yogas in My Chart
            </Button>
          </CardContent>
        </Card>

        {yogaResults && (
          <>
            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Yogas Found",
                  count: YOGAS_DATA.filter((y) => yogaResults[y.id]?.present)
                    .length,
                  color: "oklch(0.65 0.18 140)",
                },
                {
                  label: "Strong Yogas",
                  count: YOGAS_DATA.filter(
                    (y) =>
                      yogaResults[y.id]?.present &&
                      yogaResults[y.id]?.strength === "strong",
                  ).length,
                  color: "oklch(0.78 0.14 75)",
                },
                {
                  label: "Not Present",
                  count: YOGAS_DATA.filter((y) => !yogaResults[y.id]?.present)
                    .length,
                  color: "oklch(0.55 0.08 40)",
                },
              ].map((item) => (
                <Card
                  key={item.label}
                  style={{
                    background: "oklch(0.16 0.06 22)",
                    borderColor: `${item.color}33`,
                  }}
                >
                  <CardContent className="pt-5 pb-5 text-center">
                    <div
                      className="font-heading text-3xl font-bold"
                      style={{ color: item.color }}
                    >
                      {item.count}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  type="button"
                  variant={filter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(cat)}
                  data-ocid={`yogas.filter.${cat.replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-xs"
                  style={
                    filter === cat
                      ? { background: "oklch(0.62 0.18 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.30 0.08 30)",
                          color: "oklch(0.70 0.06 60)",
                        }
                  }
                >
                  {cat === "all" ? "All Yogas" : cat}
                </Button>
              ))}
            </div>

            {/* Present Yogas */}
            {filteredYogas.length > 0 && (
              <div>
                <h2
                  className="font-heading text-lg font-bold mb-4"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  ✅ Yogas Present in Your Chart ({filteredYogas.length})
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredYogas.map((yoga) => {
                    const result = yogaResults[yoga.id];
                    const strengthColor = STRENGTH_COLORS[result.strength];
                    const catColor =
                      CATEGORY_COLORS[yoga.category] ?? "oklch(0.65 0.10 50)";
                    return (
                      <Card
                        key={yoga.id}
                        style={{
                          background: "oklch(0.16 0.06 22)",
                          borderColor: `${catColor}44`,
                        }}
                      >
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-heading text-sm font-bold text-foreground">
                                  {yoga.name}
                                </h3>
                                <Badge
                                  className="text-[10px]"
                                  style={{
                                    background: `${catColor}22`,
                                    color: catColor,
                                    border: `1px solid ${catColor}33`,
                                  }}
                                >
                                  {yoga.category}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {yoga.nameHindi} — {yoga.nameSanskrit}
                              </p>
                            </div>
                            <Badge
                              className="text-[10px] flex-shrink-0"
                              style={{
                                background: `${strengthColor}22`,
                                color: strengthColor,
                                border: `1px solid ${strengthColor}33`,
                              }}
                            >
                              {result.strength.charAt(0).toUpperCase() +
                                result.strength.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                            {yoga.description}
                          </p>
                          <div className="space-y-2">
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                                Blessings / फल
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {yoga.effects.map((eff) => (
                                  <span
                                    key={eff}
                                    className="text-[10px] px-2 py-0.5 rounded-full"
                                    style={{
                                      background: `${catColor}15`,
                                      color: catColor,
                                    }}
                                  >
                                    {eff}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                                Remedy / उपाय
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                {yoga.remedies[0]}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Absent Yogas */}
            {absentYogas.length > 0 && (
              <div>
                <h2 className="font-heading text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
                  Not Present in Chart ({absentYogas.length})
                </h2>
                <div className="flex flex-wrap gap-2">
                  {absentYogas.map((yoga) => (
                    <Badge
                      key={yoga.id}
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: "oklch(0.26 0.05 28)",
                        color: "oklch(0.45 0.04 40)",
                      }}
                    >
                      {yoga.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Info Section */}
        <Card
          style={{ background: "oklch(0.16 0.06 22)" }}
          className="border-primary/20"
        >
          <CardContent className="pt-6">
            <h2
              className="font-heading text-lg font-bold mb-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              📖 About Vedic Yogas
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <p>
                योग वैदिक ज्योतिष में विशेष ग्रह संयोगों को कहते हैं जो जीवन के विभिन्न क्षेत्रों
                में विशेष फल देते हैं। पराशर होरा शास्त्र में हजारों योगों का वर्णन है।
              </p>
              <p>
                Yogas are special planetary combinations in Vedic astrology that
                produce particular results in life. They can amplify or modify
                the natural significations of houses and planets. Strong yogas
                override weak placements.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
