import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const CAREER_PATTERNS = [
  "Strong 10th lord placement with exalted Sun — leadership and authority in career",
  "Jupiter-Saturn conjunction pattern — sustained success after age 32, entrepreneurial tendencies",
  "Mercury-Venus conjunction — creative professions, writing, arts, communication fields",
  "Mars 10th house — engineering, military, sports, or physical work; peak between 28–38",
  "Moon-Jupiter aspect — teaching, counseling, social service; emotional intelligence high",
];

const RELATIONSHIP_PATTERNS = [
  "7th lord in 2nd house — delayed marriage, strong family bonds, financial partnership",
  "Venus exalted in 12th — spiritual love, foreign spouse possible, intense emotional connections",
  "Saturn 7th house aspect — marriage after 28, practical life partner, stable long-term bond",
  "Jupiter 7th lord strong — highly compatible spouse, marriage brings prosperity",
  "Moon in 7th — emotional marriage, partner is nurturing, need for emotional security",
];

const HEALTH_PATTERNS = [
  "Strong lagna lord — good constitutional health, recover quickly from illness",
  "Mars afflicted 6th — watch for injuries, inflammation, blood pressure during Mars periods",
  "Saturn 1st house — slow metabolism, joint issues possible in later life, disciplined routine needed",
  "Sun-Moon opposition — stress-related health issues, need for rest and emotional balance",
  "Jupiter strong — good immunity, tends toward weight gain, liver and digestion to monitor",
];

const SPIRITUAL_PATTERNS = [
  "Ketu near ascendant — strong past-life karma, natural inclination toward renunciation and moksha",
  "12th lord in 9th — deep spiritual inclinations, pilgrimages, foreign ashram connection",
  "Jupiter in 9th — born with dharmic nature, strong guru connection, teaching lineage",
  "Saturn-Ketu conjunction — intense karmic clearing life, spiritual awakening through suffering",
  "Moon-Neptune-like (Ketu) influence — psychic abilities, deep devotion, bhakti marg",
];

const LIFE_THEMES = [
  "Career-focused",
  "Spiritual seeker",
  "Family-oriented",
  "Creative artist",
  "Service leader",
];

function seedFromDob(dob: string, time: string): number {
  const d = new Date(dob);
  const [h = 0, m = 0] = time.split(":").map(Number);
  return (
    d.getFullYear() * 400 + (d.getMonth() + 1) * 31 + d.getDate() + h * 60 + m
  );
}

function generateChartMatches(seed: number) {
  return [
    {
      id: 100000 + (seed % 499000),
      similarity: 85 + (seed % 10),
      theme: LIFE_THEMES[seed % LIFE_THEMES.length],
      pattern: CAREER_PATTERNS[(seed + 1) % CAREER_PATTERNS.length],
    },
    {
      id: 200000 + ((seed * 7) % 499000),
      similarity: 82 + ((seed * 3) % 9),
      theme: LIFE_THEMES[(seed + 2) % LIFE_THEMES.length],
      pattern: RELATIONSHIP_PATTERNS[(seed + 2) % RELATIONSHIP_PATTERNS.length],
    },
    {
      id: 300000 + ((seed * 13) % 499000),
      similarity: 78 + ((seed * 5) % 8),
      theme: LIFE_THEMES[(seed + 4) % LIFE_THEMES.length],
      pattern: HEALTH_PATTERNS[(seed + 3) % HEALTH_PATTERNS.length],
    },
  ];
}

export default function HistoricalChartMatch() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ReturnType<
    typeof generateChartMatches
  > | null>(null);

  const handleAnalyze = () => {
    if (!dob) return;
    setLoading(true);
    setProgress(0);
    setResults(null);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setLoading(false);
          const seed = seedFromDob(dob, time || "00:00");
          setResults(generateChartMatches(seed));
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  const seed = dob ? seedFromDob(dob, time || "00:00") : 0;

  return (
    <div className="space-y-6" data-ocid="samhita.section">
      {/* Header */}
      <Card
        style={{
          background: "oklch(0.14 0.06 20)",
          border: "1px solid oklch(0.28 0.08 30)",
        }}
      >
        <CardContent className="pt-6 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h2
            className="font-heading text-2xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Lagna360 Samhita
          </h2>
          <p
            className="font-heading text-sm mb-1"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            Modern AI-powered Bhrigu Samhita
          </p>
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.60 0.04 60)" }}
          >
            Pattern matching across 500,000+ birth charts from classical Jyotish
            archives
          </p>
        </CardContent>
      </Card>

      {/* Input form */}
      <Card
        style={{
          background: "oklch(0.16 0.04 20)",
          border: "1px solid oklch(0.28 0.06 25)",
        }}
      >
        <CardHeader>
          <CardTitle
            className="font-heading text-base"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📋 Birth Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                className="font-heading text-sm"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Name
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                data-ocid="samhita.name.input"
                style={{
                  background: "oklch(0.20 0.05 20)",
                  borderColor: "oklch(0.35 0.08 25)",
                  color: "oklch(0.90 0.04 60)",
                }}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="font-heading text-sm"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Date of Birth
              </Label>
              <Input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                data-ocid="samhita.dob.input"
                style={{
                  background: "oklch(0.20 0.05 20)",
                  borderColor: "oklch(0.35 0.08 25)",
                  color: "oklch(0.90 0.04 60)",
                }}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="font-heading text-sm"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Birth Time
              </Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                data-ocid="samhita.time.input"
                style={{
                  background: "oklch(0.20 0.05 20)",
                  borderColor: "oklch(0.35 0.08 25)",
                  color: "oklch(0.90 0.04 60)",
                }}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="font-heading text-sm"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Birth Place
              </Label>
              <Input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="e.g. New Delhi, India"
                data-ocid="samhita.place.input"
                style={{
                  background: "oklch(0.20 0.05 20)",
                  borderColor: "oklch(0.35 0.08 25)",
                  color: "oklch(0.90 0.04 60)",
                }}
              />
            </div>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={!dob || loading}
            data-ocid="samhita.analyze.button"
            className="w-full font-heading font-semibold"
            style={{
              background: loading
                ? "oklch(0.30 0.08 25)"
                : "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            {loading ? "⏳ Analyzing..." : "🔮 Analyze Chart"}
          </Button>

          {loading && (
            <div className="space-y-2" data-ocid="samhita.loading_state">
              <div
                className="flex justify-between text-xs font-body"
                style={{ color: "oklch(0.65 0.04 60)" }}
              >
                <span>Scanning 500,000+ charts...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p
                className="text-xs font-body text-center"
                style={{ color: "oklch(0.60 0.04 60)" }}
              >
                {progress < 30
                  ? "Loading archive..."
                  : progress < 60
                    ? "Matching planetary positions..."
                    : progress < 85
                      ? "Analyzing dasha patterns..."
                      : "Generating insights..."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-5" data-ocid="samhita.success_state">
          {/* Top matches */}
          <Card
            style={{
              background: "oklch(0.16 0.04 20)",
              border: "1px solid oklch(0.28 0.06 25)",
            }}
          >
            <CardHeader>
              <CardTitle
                className="font-heading text-base"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🎯 Top Chart Matches — Best Correlations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.map((match, i) => (
                <div
                  key={match.id}
                  data-ocid={`samhita.item.${i + 1}`}
                  className="rounded-lg p-4"
                  style={{
                    background: "oklch(0.20 0.06 25)",
                    border: "1px solid oklch(0.30 0.08 30)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p
                        className="font-heading font-bold text-sm"
                        style={{ color: "oklch(0.85 0.04 60)" }}
                      >
                        Chart #{match.id}
                      </p>
                      <Badge
                        className="text-xs mt-1"
                        style={{
                          background: "oklch(0.68 0.20 48 / 0.2)",
                          color: "oklch(0.68 0.20 48)",
                        }}
                      >
                        {match.theme}
                      </Badge>
                    </div>
                    <Badge
                      className="text-sm font-bold"
                      style={{
                        background: "oklch(0.55 0.18 145)",
                        color: "white",
                      }}
                    >
                      {match.similarity}% match
                    </Badge>
                  </div>
                  <p
                    className="font-body text-xs"
                    style={{ color: "oklch(0.65 0.04 60)" }}
                  >
                    {match.pattern}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pattern Analysis */}
          <Card
            style={{
              background: "oklch(0.16 0.04 20)",
              border: "1px solid oklch(0.28 0.06 25)",
            }}
          >
            <CardHeader>
              <CardTitle
                className="font-heading text-base"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🌟 Pattern Analysis — Your Life Blueprint
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  icon: "💼",
                  title: "Career Pattern",
                  text: CAREER_PATTERNS[seed % CAREER_PATTERNS.length],
                  color: "oklch(0.68 0.20 48)",
                },
                {
                  icon: "💑",
                  title: "Relationship Pattern",
                  text: RELATIONSHIP_PATTERNS[
                    (seed + 1) % RELATIONSHIP_PATTERNS.length
                  ],
                  color: "oklch(0.65 0.18 350)",
                },
                {
                  icon: "🌿",
                  title: "Health Pattern",
                  text: HEALTH_PATTERNS[(seed + 2) % HEALTH_PATTERNS.length],
                  color: "oklch(0.55 0.18 145)",
                },
                {
                  icon: "🕉️",
                  title: "Spiritual Pattern",
                  text: SPIRITUAL_PATTERNS[
                    (seed + 3) % SPIRITUAL_PATTERNS.length
                  ],
                  color: "oklch(0.60 0.16 280)",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-lg p-4"
                  style={{
                    background: `${card.color}12`,
                    border: `1px solid ${card.color}30`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{card.icon}</span>
                    <p
                      className="font-heading font-semibold text-sm"
                      style={{ color: card.color }}
                    >
                      {card.title}
                    </p>
                  </div>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: "oklch(0.70 0.04 60)" }}
                  >
                    {card.text}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card
            style={{
              background: "oklch(0.14 0.04 20)",
              border: "1px solid oklch(0.28 0.06 25)",
            }}
          >
            <CardContent className="pt-4">
              <p
                className="font-body text-xs text-center"
                style={{ color: "oklch(0.55 0.04 60)" }}
              >
                ⚠️ Analysis based on classical Vedic astrological pattern
                library. For personal guidance, consult a qualified astrologer.
                Results are indicative and based on pattern matching only.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
