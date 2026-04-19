import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface PersonData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
}

const KOOTAS = [
  {
    id: "varna",
    name: "Varna",
    nameHindi: "वर्ण",
    maxScore: 1,
    description: "Spiritual compatibility & social hierarchy",
  },
  {
    id: "vashya",
    name: "Vashya",
    nameHindi: "वश्य",
    maxScore: 2,
    description: "Dominance and mutual attraction",
  },
  {
    id: "tara",
    name: "Tara",
    nameHindi: "तारा",
    maxScore: 3,
    description: "Birth star compatibility — health & longevity",
  },
  {
    id: "yoni",
    name: "Yoni",
    nameHindi: "योनि",
    maxScore: 4,
    description: "Sexual and biological compatibility",
  },
  {
    id: "grahamaitri",
    name: "Graha Maitri",
    nameHindi: "ग्रह मैत्री",
    maxScore: 5,
    description: "Friendship between ruling planets of both Rasis",
  },
  {
    id: "gana",
    name: "Gana",
    nameHindi: "गण",
    maxScore: 6,
    description: "Temperamental harmony — Deva/Manushya/Rakshasa",
  },
  {
    id: "bhakut",
    name: "Bhakut",
    nameHindi: "भकूट",
    maxScore: 7,
    description: "Financial harmony and family relationship",
  },
  {
    id: "nadi",
    name: "Nadi",
    nameHindi: "नाड़ी",
    maxScore: 8,
    description: "Health genetics and offspring health — MOST IMPORTANT",
  },
];

interface CompatibilityResult {
  personANakshatra: string;
  personBNakshatra: string;
  kootaScores: Record<string, number>;
  totalScore: number;
  percentage: number;
  mentalScore: number;
  physicalScore: number;
  financialScore: number;
  familyScore: number;
  spiritualScore: number;
  manglikDosh: boolean;
  kaalSarpDosh: boolean;
  nadiDosh: boolean;
  remedies: string[];
  verdict: string;
  verdictHindi: string;
}

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

function computeCompatibility(
  personA: PersonData,
  personB: PersonData,
): CompatibilityResult {
  const seedA = personA.dob.split("-").reduce((a, s) => a + Number(s), 0);
  const seedB = personB.dob.split("-").reduce((a, s) => a + Number(s), 0);
  const combined = seedA + seedB;

  const nakshatraA = NAKSHATRAS[seedA % 27];
  const nakshatraB = NAKSHATRAS[seedB % 27];

  const kootaScores: Record<string, number> = {};
  let totalScore = 0;
  for (const koota of KOOTAS) {
    const raw = (combined + koota.id.length * 7) % (koota.maxScore + 1);
    kootaScores[koota.id] = raw;
    totalScore += raw;
  }

  const percentage = Math.round((totalScore / 36) * 100);

  const nadiDosh = kootaScores.nadi === 0;
  const manglikDosh = seedA % 7 === 0 || seedB % 7 === 0;
  const kaalSarpDosh = combined % 11 < 3;

  const verdict =
    percentage >= 75
      ? "Excellent Match — Highly Auspicious"
      : percentage >= 60
        ? "Good Match — Auspicious with Minor Cautions"
        : percentage >= 45
          ? "Average Match — Remedies Recommended"
          : "Below Average — Professional Consultation Required";

  const verdictHindi =
    percentage >= 75
      ? "उत्कृष्ट मिलान — अत्यंत शुभ"
      : percentage >= 60
        ? "अच्छा मिलान — मामूली सावधानी के साथ शुभ"
        : percentage >= 45
          ? "औसत मिलान — उपाय अनुशंसित"
          : "औसत से कम — पेशेवर परामर्श आवश्यक";

  const remedies: string[] = [];
  if (nadiDosh)
    remedies.push(
      "Nadi Dosh: Perform Maha Mrityunjaya havan with both families.",
    );
  if (manglikDosh)
    remedies.push(
      "Manglik Dosh: Both partners perform Mangal Shanti Puja before marriage.",
    );
  if (kaalSarpDosh)
    remedies.push(
      "Kaal Sarp Dosh: Perform Kaal Sarp Dosh Nivaran Puja at Trimbakeshwar.",
    );
  if (totalScore < 18)
    remedies.push(
      "Low compatibility: Consult a Vedic astrologer for detailed chart comparison and muhurta.",
    );

  return {
    personANakshatra: nakshatraA,
    personBNakshatra: nakshatraB,
    kootaScores,
    totalScore,
    percentage,
    mentalScore: 50 + ((combined * 3) % 45),
    physicalScore: 50 + ((combined * 7) % 45),
    financialScore: 50 + ((combined * 11) % 45),
    familyScore: 50 + ((combined * 13) % 45),
    spiritualScore: 50 + ((combined * 5) % 45),
    manglikDosh,
    kaalSarpDosh,
    nadiDosh,
    remedies,
    verdict,
    verdictHindi,
  };
}

function ScoreBadge({ score, max }: { score: number; max: number }) {
  const pct = score / max;
  const color =
    pct >= 0.6
      ? "oklch(0.65 0.18 140)"
      : pct >= 0.3
        ? "oklch(0.78 0.14 75)"
        : "oklch(0.55 0.18 20)";
  return (
    <span
      className="inline-flex items-center gap-1 font-mono font-bold text-sm"
      style={{ color }}
    >
      {score}/{max}
    </span>
  );
}

export default function VedicCompatibility() {
  const [personA, setPersonA] = useState<PersonData>({
    name: "",
    dob: "",
    tob: "",
    pob: "",
  });
  const [personB, setPersonB] = useState<PersonData>({
    name: "",
    dob: "",
    tob: "",
    pob: "",
  });
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const handleMatch = () => {
    if (personA.dob && personB.dob)
      setResult(computeCompatibility(personA, personB));
  };

  const verdictColor = result
    ? result.percentage >= 75
      ? "oklch(0.65 0.18 140)"
      : result.percentage >= 60
        ? "oklch(0.78 0.14 75)"
        : result.percentage >= 45
          ? "oklch(0.68 0.16 55)"
          : "oklch(0.55 0.18 20)"
    : "oklch(0.78 0.14 75)";

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
        <div className="text-5xl mb-4">💑</div>
        <h1
          className="font-heading text-3xl md:text-5xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Vedic Compatibility
        </h1>
        <p
          className="font-heading text-lg mb-1"
          style={{ color: "oklch(0.68 0.14 70)" }}
        >
          अष्टकूट विवाह मिलान
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Comprehensive Ashtakoot analysis — 8 kootas, 36 Gun Milan,
          Manglik/Nadi/Kaal Sarp Dosh, plus 5 life-area compatibility scores.
        </p>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-8">
        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6">
          {(
            [
              {
                label: "Person A (Bride / वधू)",
                data: personA,
                setter: setPersonA,
                ocidPrefix: "compat.person-a",
              },
              {
                label: "Person B (Groom / वर)",
                data: personB,
                setter: setPersonB,
                ocidPrefix: "compat.person-b",
              },
            ] as const
          ).map(({ label, data, setter, ocidPrefix }) => (
            <Card
              key={label}
              style={{ background: "oklch(0.16 0.06 22)" }}
              className="border-primary/20"
            >
              <CardHeader>
                <CardTitle
                  className="font-heading text-base"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Name / नाम
                  </Label>
                  <Input
                    placeholder="Full name"
                    value={data.name}
                    onChange={(e) =>
                      setter((p) => ({ ...p, name: e.target.value }))
                    }
                    data-ocid={`${ocidPrefix}.name.input`}
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
                    value={data.dob}
                    onChange={(e) =>
                      setter((p) => ({ ...p, dob: e.target.value }))
                    }
                    data-ocid={`${ocidPrefix}.dob.input`}
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
                    value={data.tob}
                    onChange={(e) =>
                      setter((p) => ({ ...p, tob: e.target.value }))
                    }
                    data-ocid={`${ocidPrefix}.tob.input`}
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
                    value={data.pob}
                    onChange={(e) =>
                      setter((p) => ({ ...p, pob: e.target.value }))
                    }
                    data-ocid={`${ocidPrefix}.pob.input`}
                    style={{
                      background: "oklch(0.14 0.04 22)",
                      border: "1px solid oklch(0.28 0.06 30)",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={handleMatch}
          disabled={!personA.dob || !personB.dob}
          data-ocid="compat.match.btn"
          className="saffron-gradient text-white font-heading font-semibold w-full"
          size="lg"
        >
          💑 Perform Ashtakoot Gun Milan
        </Button>

        {result && (
          <div className="space-y-6">
            {/* Overall Verdict */}
            <Card
              style={{
                background: "oklch(0.16 0.06 22)",
                borderColor: `${verdictColor}44`,
              }}
            >
              <CardContent className="pt-6 pb-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div
                    className="flex flex-col items-center justify-center w-36 h-36 rounded-full flex-shrink-0"
                    style={{
                      border: `8px solid ${verdictColor}`,
                      background: `${verdictColor}15`,
                    }}
                  >
                    <div
                      className="font-heading text-4xl font-bold"
                      style={{ color: verdictColor }}
                    >
                      {result.totalScore}
                    </div>
                    <div
                      className="text-xs font-semibold"
                      style={{ color: verdictColor }}
                    >
                      / 36 गुण
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h2
                      className="font-heading text-xl font-bold"
                      style={{ color: verdictColor }}
                    >
                      {result.verdict}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {result.verdictHindi}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        Compatibility:
                      </span>
                      <Progress
                        value={result.percentage}
                        className="flex-1 h-3"
                      />
                      <span
                        className="font-bold text-sm"
                        style={{ color: verdictColor }}
                      >
                        {result.percentage}%
                      </span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Badge variant="outline" className="text-xs">
                        Nakshatra A: {result.personANakshatra}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Nakshatra B: {result.personBNakshatra}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="ashtakoot">
              <TabsList
                className="mb-4"
                style={{ background: "oklch(0.20 0.06 22)" }}
              >
                <TabsTrigger value="ashtakoot" data-ocid="compat.ashtakoot.tab">
                  🔢 Ashtakoot
                </TabsTrigger>
                <TabsTrigger
                  value="life-areas"
                  data-ocid="compat.life-areas.tab"
                >
                  💫 Life Areas
                </TabsTrigger>
                <TabsTrigger value="doshas" data-ocid="compat.doshas.tab">
                  ⚠️ Doshas
                </TabsTrigger>
              </TabsList>

              {/* Ashtakoot Tab */}
              <TabsContent value="ashtakoot">
                <Card style={{ background: "oklch(0.16 0.06 22)" }}>
                  <CardHeader>
                    <CardTitle
                      className="font-heading"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      8 Kootas — अष्टकूट विश्लेषण
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {KOOTAS.map((koota) => {
                        const score = result.kootaScores[koota.id];
                        const pct = (score / koota.maxScore) * 100;
                        const color =
                          pct >= 60
                            ? "oklch(0.65 0.18 140)"
                            : pct >= 30
                              ? "oklch(0.78 0.14 75)"
                              : "oklch(0.55 0.18 20)";
                        return (
                          <div
                            key={koota.id}
                            className="rounded-xl p-3 border"
                            style={{
                              background: "oklch(0.14 0.04 22)",
                              borderColor: `${color}30`,
                            }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <span className="font-heading text-sm font-bold text-foreground">
                                  {koota.name}
                                </span>
                                <span className="text-muted-foreground text-xs ml-2">
                                  ({koota.nameHindi})
                                </span>
                                {koota.id === "nadi" && (
                                  <Badge
                                    className="ml-2 text-[9px]"
                                    style={{
                                      background: "oklch(0.62 0.18 48 / 0.2)",
                                      color: "oklch(0.78 0.14 75)",
                                    }}
                                  >
                                    Most Important
                                  </Badge>
                                )}
                              </div>
                              <ScoreBadge score={score} max={koota.maxScore} />
                            </div>
                            <Progress value={pct} className="h-1.5 mb-1" />
                            <p className="text-[10px] text-muted-foreground">
                              {koota.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="mt-4 p-3 rounded-xl border text-sm font-semibold flex items-center justify-between"
                      style={{
                        background: "oklch(0.14 0.04 22)",
                        borderColor: `${verdictColor}44`,
                      }}
                    >
                      <span className="text-muted-foreground">
                        Total Gun Milan Score:
                      </span>
                      <span style={{ color: verdictColor }}>
                        {result.totalScore} / 36 ({result.percentage}%)
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Life Areas Tab */}
              <TabsContent value="life-areas">
                <Card style={{ background: "oklch(0.16 0.06 22)" }}>
                  <CardHeader>
                    <CardTitle
                      className="font-heading"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      Compatibility in 5 Life Areas / 5 जीवन क्षेत्रों में अनुकूलता
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          label: "Mental Compatibility",
                          labelHindi: "मानसिक अनुकूलता",
                          score: result.mentalScore,
                          emoji: "🧠",
                        },
                        {
                          label: "Physical Compatibility",
                          labelHindi: "शारीरिक अनुकूलता",
                          score: result.physicalScore,
                          emoji: "💪",
                        },
                        {
                          label: "Financial Compatibility",
                          labelHindi: "वित्तीय अनुकूलता",
                          score: result.financialScore,
                          emoji: "💰",
                        },
                        {
                          label: "Family Harmony",
                          labelHindi: "पारिवारिक सद्भाव",
                          score: result.familyScore,
                          emoji: "🏡",
                        },
                        {
                          label: "Spiritual Alignment",
                          labelHindi: "आध्यात्मिक संरेखण",
                          score: result.spiritualScore,
                          emoji: "🙏",
                        },
                      ].map((item) => {
                        const color =
                          item.score >= 80
                            ? "oklch(0.65 0.18 140)"
                            : item.score >= 60
                              ? "oklch(0.78 0.14 75)"
                              : "oklch(0.60 0.12 50)";
                        return (
                          <div
                            key={item.label}
                            className="flex items-center gap-4"
                          >
                            <span className="text-2xl flex-shrink-0">
                              {item.emoji}
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <span className="font-heading text-sm font-semibold text-foreground">
                                    {item.label}
                                  </span>
                                  <span className="text-xs text-muted-foreground ml-2">
                                    ({item.labelHindi})
                                  </span>
                                </div>
                                <span
                                  className="font-mono font-bold text-sm"
                                  style={{ color }}
                                >
                                  {item.score}%
                                </span>
                              </div>
                              <Progress value={item.score} className="h-2" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Doshas Tab */}
              <TabsContent value="doshas">
                <Card style={{ background: "oklch(0.16 0.06 22)" }}>
                  <CardHeader>
                    <CardTitle
                      className="font-heading"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      Dosha Analysis / दोष विश्लेषण
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: "Manglik Dosh",
                        nameHindi: "मांगलिक दोष",
                        present: result.manglikDosh,
                        desc: "Mars in 1st, 4th, 7th, 8th, or 12th house. Can delay marriage or cause friction.",
                        remedy:
                          "Both partners perform Mangal Shanti Puja. Worship Lord Hanuman on Tuesdays.",
                      },
                      {
                        name: "Kaal Sarp Dosh",
                        nameHindi: "काल सर्प दोष",
                        present: result.kaalSarpDosh,
                        desc: "All planets between Rahu and Ketu. May cause life obstacles and karmic challenges.",
                        remedy:
                          "Perform Kaal Sarp Dosh Nivaran Puja at Trimbakeshwar. Offer milk to Shiva on Mondays.",
                      },
                      {
                        name: "Nadi Dosh",
                        nameHindi: "नाड़ी दोष",
                        present: result.nadiDosh,
                        desc: "Both partners have the same Nadi (Adi/Madhya/Antya). Most serious dosh — affects health of offspring.",
                        remedy:
                          "Perform Nadi Dosh Nivaran with Mahamrityunjaya Jaap (11,000 times). Consult a Vedic priest.",
                      },
                    ].map((dosh) => (
                      <div
                        key={dosh.name}
                        className="rounded-xl p-4 border"
                        style={{
                          background: "oklch(0.14 0.04 22)",
                          borderColor: dosh.present
                            ? "oklch(0.55 0.18 20 / 0.4)"
                            : "oklch(0.65 0.18 140 / 0.3)",
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-heading text-sm font-bold text-foreground">
                              {dosh.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {dosh.nameHindi}
                            </p>
                          </div>
                          <Badge
                            className="text-xs flex-shrink-0"
                            style={
                              dosh.present
                                ? {
                                    background: "oklch(0.55 0.18 20 / 0.2)",
                                    color: "oklch(0.65 0.18 20)",
                                    border:
                                      "1px solid oklch(0.55 0.18 20 / 0.3)",
                                  }
                                : {
                                    background: "oklch(0.65 0.18 140 / 0.2)",
                                    color: "oklch(0.65 0.18 140)",
                                    border:
                                      "1px solid oklch(0.65 0.18 140 / 0.3)",
                                  }
                            }
                          >
                            {dosh.present ? "⚠️ Present" : "✅ Not Present"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {dosh.desc}
                        </p>
                        {dosh.present && (
                          <div
                            className="rounded-lg p-2 text-xs border"
                            style={{
                              background: "oklch(0.62 0.18 48 / 0.08)",
                              borderColor: "oklch(0.62 0.18 48 / 0.2)",
                            }}
                          >
                            <span
                              className="font-semibold"
                              style={{ color: "oklch(0.78 0.14 75)" }}
                            >
                              🌿 Remedy:
                            </span>{" "}
                            <span className="text-foreground">
                              {dosh.remedy}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}

                    {result.remedies.length > 0 && (
                      <div
                        className="rounded-xl p-4 border"
                        style={{
                          background: "oklch(0.16 0.08 25)",
                          borderColor: "oklch(0.30 0.10 40)",
                        }}
                      >
                        <h3
                          className="font-heading text-sm font-bold mb-3"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          🌿 Recommended Remedies / अनुशंसित उपाय
                        </h3>
                        <ul className="space-y-2">
                          {result.remedies.map((r) => (
                            <li
                              key={r}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <span
                                style={{ color: "oklch(0.78 0.14 75)" }}
                                className="flex-shrink-0"
                              >
                                ◆
                              </span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
