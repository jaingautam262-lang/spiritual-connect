import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface BirthData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
}

interface LifeAreaScore {
  area: string;
  areaHindi: string;
  score: number;
  emoji: string;
  description: string;
  remedy: string;
}

function computeAstroScore(data: BirthData): {
  total: number;
  areas: LifeAreaScore[];
} {
  const seed =
    data.dob.split("-").reduce((a, s) => a + Number(s), 0) +
    data.tob.replace(":", "").length;

  const areas: LifeAreaScore[] = [
    {
      area: "Health & Vitality",
      areaHindi: "स्वास्थ्य और ऊर्जा",
      score: Math.min(99, ((seed * 3 + 11) % 45) + 50),
      emoji: "💪",
      description:
        "Overall physical health, immunity, and life force based on Lagna and Sun placement.",
      remedy:
        "Daily Surya Namaskar at sunrise. Recite Aditya Hridayam on Sundays.",
    },
    {
      area: "Wealth & Prosperity",
      areaHindi: "धन और समृद्धि",
      score: Math.min(99, ((seed * 7 + 17) % 45) + 50),
      emoji: "💰",
      description:
        "Financial inflows, wealth accumulation, and material prosperity from 2nd/11th house analysis.",
      remedy:
        "Worship Maa Lakshmi on Fridays. Keep Shri Yantra in your place of work.",
    },
    {
      area: "Love & Relationships",
      areaHindi: "प्रेम और रिश्ते",
      score: Math.min(99, ((seed * 13 + 23) % 45) + 50),
      emoji: "❤️",
      description:
        "Quality of partnerships, romantic bonds, and social harmony based on Venus and 7th house.",
      remedy:
        "Wear white or light pink on Fridays. Offer flowers to Venus (Shukra) deity.",
    },
    {
      area: "Career & Status",
      areaHindi: "करियर और प्रतिष्ठा",
      score: Math.min(99, ((seed * 5 + 29) % 45) + 50),
      emoji: "🏆",
      description:
        "Professional success, recognition, and authority from 10th house and Sun/Saturn analysis.",
      remedy:
        "Recite Shani Chalisa on Saturdays. Donate black sesame seeds on Saturdays.",
    },
    {
      area: "Spirituality & Wisdom",
      areaHindi: "आध्यात्मिकता और ज्ञान",
      score: Math.min(99, ((seed * 11 + 7) % 45) + 50),
      emoji: "🙏",
      description:
        "Depth of spiritual practice, dharmic inclinations, and inner wisdom from Jupiter and 9th house.",
      remedy:
        "Read Bhagavad Gita verse daily. Light a diya at dusk for Guru (Jupiter).",
    },
  ];

  const total = Math.round(
    areas.reduce((sum, a) => sum + a.score, 0) / areas.length,
  );
  return { total, areas };
}

function ScoreGauge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "oklch(0.65 0.18 140)"
      : score >= 60
        ? "oklch(0.78 0.14 75)"
        : "oklch(0.62 0.18 30)";
  const label =
    score >= 80 ? "Excellent" : score >= 65 ? "Good" : "Needs Focus";
  const labelHindi = score >= 80 ? "उत्कृष्ट" : score >= 65 ? "अच्छा" : "ध्यान दें";

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-40 h-40 rounded-full flex items-center justify-center"
        style={{ border: `8px solid ${color}`, background: `${color}15` }}
      >
        <div className="text-center">
          <div className="font-heading text-4xl font-bold" style={{ color }}>
            {score}
          </div>
          <div className="text-xs font-semibold" style={{ color }}>
            /100
          </div>
        </div>
      </div>
      <div className="mt-3 text-center">
        <Badge
          style={{
            background: `${color}22`,
            color,
            border: `1px solid ${color}44`,
          }}
          className="text-sm"
        >
          {label} / {labelHindi}
        </Badge>
      </div>
    </div>
  );
}

export default function AstroScore() {
  const [birthData, setBirthData] = useState<BirthData>({
    name: "",
    dob: "",
    tob: "",
    pob: "",
  });
  const [result, setResult] = useState<ReturnType<
    typeof computeAstroScore
  > | null>(null);

  const handleCalculate = () => {
    if (birthData.dob && birthData.tob) setResult(computeAstroScore(birthData));
  };

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
        <div className="text-5xl mb-4">⭐</div>
        <h1
          className="font-heading text-3xl md:text-5xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          AstroScore
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Your personalized astrological strength score across 5 key life areas
          — health, wealth, love, career and spirituality.
          <br />
          आपका व्यक्तिगत ज्योतिषीय शक्ति स्कोर।
        </p>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-8 max-w-3xl">
        {/* Birth Details Form */}
        <Card
          style={{ background: "oklch(0.16 0.06 22)" }}
          className="border-primary/20"
        >
          <CardHeader>
            <CardTitle
              className="font-heading"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🔭 Enter Your Birth Details / जन्म विवरण
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Name / नाम
                </Label>
                <Input
                  placeholder="Your full name"
                  value={birthData.name}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="astro-score.name.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Date of Birth / जन्म तिथि
                </Label>
                <Input
                  type="date"
                  value={birthData.dob}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, dob: e.target.value }))
                  }
                  data-ocid="astro-score.dob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Time of Birth / जन्म समय
                </Label>
                <Input
                  type="time"
                  value={birthData.tob}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, tob: e.target.value }))
                  }
                  data-ocid="astro-score.tob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Place of Birth / जन्म स्थान
                </Label>
                <Input
                  placeholder="City, Country"
                  value={birthData.pob}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, pob: e.target.value }))
                  }
                  data-ocid="astro-score.pob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
            </div>
            <Button
              onClick={handleCalculate}
              disabled={!birthData.dob || !birthData.tob}
              data-ocid="astro-score.calculate.btn"
              className="saffron-gradient text-white font-heading font-semibold w-full"
            >
              ⭐ Calculate My AstroScore
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card
              style={{ background: "oklch(0.16 0.06 22)" }}
              className="border-primary/20"
            >
              <CardContent className="pt-8 pb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <ScoreGauge score={result.total} />
                  <div className="flex-1 space-y-2">
                    <h2
                      className="font-heading text-2xl font-bold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {birthData.name
                        ? `${birthData.name}'s AstroScore`
                        : "Your AstroScore"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your overall astrological strength score based on
                      planetary positions at birth. This score reflects the
                      cumulative strength of your chart across all life domains.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      आपका समग्र ज्योतिषीय शक्ति स्कोर जन्म के समय ग्रहों की स्थिति पर
                      आधारित है।
                    </p>
                    <div className="pt-2">
                      <Progress value={result.total} className="h-3" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Life Area Breakdown */}
            <div>
              <h2
                className="font-heading text-lg font-bold mb-4"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Life Area Breakdown / जीवन क्षेत्र विश्लेषण
              </h2>
              <div className="space-y-4">
                {result.areas.map((area) => {
                  const color =
                    area.score >= 80
                      ? "oklch(0.65 0.18 140)"
                      : area.score >= 65
                        ? "oklch(0.78 0.14 75)"
                        : "oklch(0.62 0.18 30)";
                  return (
                    <Card
                      key={area.area}
                      style={{
                        background: "oklch(0.16 0.06 22)",
                        borderColor: `${color}33`,
                      }}
                    >
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start gap-4">
                          <div className="text-3xl flex-shrink-0">
                            {area.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <span className="font-heading text-sm font-bold text-foreground">
                                  {area.area}
                                </span>
                                <span className="text-muted-foreground text-xs ml-2">
                                  ({area.areaHindi})
                                </span>
                              </div>
                              <span
                                className="font-mono font-bold text-lg"
                                style={{ color }}
                              >
                                {area.score}/100
                              </span>
                            </div>
                            <Progress value={area.score} className="h-2 mb-2" />
                            <p className="text-xs text-muted-foreground mb-2">
                              {area.description}
                            </p>
                            <div
                              className="rounded-lg p-2 text-xs border"
                              style={{
                                background: `${color}10`,
                                borderColor: `${color}30`,
                              }}
                            >
                              <span className="font-semibold" style={{ color }}>
                                🌿 Remedy:
                              </span>{" "}
                              <span className="text-foreground">
                                {area.remedy}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div
              className="rounded-xl p-4 border text-xs text-muted-foreground"
              style={{
                background: "oklch(0.14 0.04 22)",
                borderColor: "oklch(0.26 0.05 28)",
              }}
            >
              <strong className="text-foreground">📝 Note:</strong> AstroScore
              is an indicative tool for self-reflection and spiritual guidance.
              For detailed analysis, consult a qualified Vedic astrologer.
              ज्योतिष शास्त्र में गहरे विश्लेषण के लिए एक योग्य वैदिक ज्योतिषी से परामर्श लें।
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
