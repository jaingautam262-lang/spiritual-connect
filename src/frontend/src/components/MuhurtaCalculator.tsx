import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const ACTIVITIES = [
  {
    value: "marriage",
    label: "💍 Marriage / Vivah",
    preferredTithis: [2, 5, 7, 10, 11, 13],
    preferredNaks: [3, 7, 12, 21, 26],
  },
  {
    value: "griha",
    label: "🏠 Griha Pravesh",
    preferredTithis: [2, 3, 5, 7, 10, 11],
    preferredNaks: [3, 7, 10, 12, 16, 21],
  },
  {
    value: "business",
    label: "💼 Business Start",
    preferredTithis: [2, 5, 7, 10, 11, 12],
    preferredNaks: [3, 7, 12, 16, 21, 22],
  },
  {
    value: "travel",
    label: "✈️ Travel / Yatra",
    preferredTithis: [2, 3, 5, 7, 10],
    preferredNaks: [7, 12, 16, 21, 22, 26],
  },
  {
    value: "surgery",
    label: "🏥 Surgery / Medical",
    preferredTithis: [3, 5, 7, 10, 11],
    preferredNaks: [7, 10, 12, 21, 22],
  },
  {
    value: "property",
    label: "🏗️ Buy Property",
    preferredTithis: [2, 5, 7, 10, 11, 12],
    preferredNaks: [3, 7, 10, 12, 16],
  },
  {
    value: "vehicle",
    label: "🚗 Buy Vehicle",
    preferredTithis: [2, 3, 5, 7, 10, 11],
    preferredNaks: [7, 10, 12, 21, 22],
  },
  {
    value: "interview",
    label: "👔 Interview / Job",
    preferredTithis: [2, 5, 7, 10, 11],
    preferredNaks: [3, 7, 12, 16, 21],
  },
  {
    value: "exam",
    label: "📚 Exam / Education",
    preferredTithis: [2, 5, 7, 10, 11, 12],
    preferredNaks: [3, 7, 12, 16, 21],
  },
  {
    value: "naming",
    label: "👶 Birth Name Ceremony",
    preferredTithis: [2, 3, 5, 7, 10, 11],
    preferredNaks: [3, 7, 10, 12, 21, 26],
  },
  {
    value: "thread",
    label: "🧵 Thread Ceremony",
    preferredTithis: [2, 3, 5, 7, 10, 11],
    preferredNaks: [3, 7, 12, 16, 21],
  },
  {
    value: "investment",
    label: "📈 Investment",
    preferredTithis: [2, 5, 7, 10, 11, 12],
    preferredNaks: [3, 7, 12, 16, 21, 22],
  },
];

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

const YOGAS = [
  "Vishkumbha",
  "Preeti",
  "Ayushman",
  "Saubhagya",
  "Shobhana",
  "Atiganda",
  "Sukarma",
  "Dhriti",
  "Shula",
  "Ganda",
  "Vridhi",
  "Dhruva",
  "Vyaghata",
  "Harshana",
  "Vajra",
  "Siddhi",
  "Vyatipata",
  "Variyana",
  "Parigha",
  "Shiva",
  "Siddha",
  "Sadhya",
  "Shubha",
  "Shukla",
  "Brahma",
  "Indra",
  "Vaidhriti",
];

const RAHU_KAAL: Record<number, { start: string; end: string }> = {
  0: { start: "17:00", end: "18:30" }, // Sunday
  1: { start: "07:30", end: "09:00" }, // Monday
  2: { start: "15:00", end: "16:30" }, // Tuesday
  3: { start: "12:00", end: "13:30" }, // Wednesday
  4: { start: "13:30", end: "15:00" }, // Thursday
  5: { start: "10:30", end: "12:00" }, // Friday
  6: { start: "09:00", end: "10:30" }, // Saturday
};

const YAMAGANDA: Record<number, { start: string; end: string }> = {
  0: { start: "12:00", end: "13:30" },
  1: { start: "10:30", end: "12:00" },
  2: { start: "09:00", end: "10:30" },
  3: { start: "07:30", end: "09:00" },
  4: { start: "06:00", end: "07:30" },
  5: { start: "15:00", end: "16:30" },
  6: { start: "13:30", end: "15:00" },
};

const GULIKA_KAAL: Record<number, { start: string; end: string }> = {
  0: { start: "15:00", end: "16:30" },
  1: { start: "13:30", end: "15:00" },
  2: { start: "12:00", end: "13:30" },
  3: { start: "10:30", end: "12:00" },
  4: { start: "09:00", end: "10:30" },
  5: { start: "07:30", end: "09:00" },
  6: { start: "06:00", end: "07:30" },
};

const WEEKDAY_SCORES: number[] = [8, 13, 10, 15, 15, 13, 8];
const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const NAKSHATRA_SCORES: number[] = [
  15, 5, 12, 20, 14, 6, 16, 20, 8, 10, 12, 16, 18, 12, 14, 12, 16, 8, 6, 12, 16,
  18, 14, 10, 12, 16, 18,
];

const YOGA_SCORES: number[] = [
  5, 10, 12, 12, 12, 5, 12, 12, 5, 5, 12, 12, 5, 12, 5, 15, 3, 10, 5, 10, 15,
  12, 12, 10, 12, 12, 3,
];

function computeSeed(date: Date): number {
  return date.getFullYear() * 400 + (date.getMonth() + 1) * 31 + date.getDate();
}

function computeMuhurtaScore(date: Date, activityValue: string) {
  const seed = computeSeed(date);
  const dayNum = date.getDate();
  const weekday = date.getDay();
  const activity = ACTIVITIES.find((a) => a.value === activityValue);

  // Tithi score (day of month mapped to lunar day)
  const tithi = dayNum % 15 === 0 ? 15 : dayNum % 15;
  const tithiScore = Math.round((tithi / 15) * 20);

  // Nakshatra score
  const nakshatraIdx = seed % 27;
  const nakshatraBaseScore = NAKSHATRA_SCORES[nakshatraIdx];
  const nakBonusFromActivity = activity?.preferredNaks.includes(nakshatraIdx)
    ? 4
    : 0;
  const nakshatraScore = Math.min(
    20,
    nakshatraBaseScore + nakBonusFromActivity,
  );

  // Yoga score
  const yogaIdx = (seed * 7 + 13) % 27;
  const yogaScore = YOGA_SCORES[yogaIdx];

  // Vara (weekday) score
  const varaScore = WEEKDAY_SCORES[weekday];

  // Lagna score (deterministic seed)
  const lagnaScore = 10 + (seed % 21);

  const total =
    tithiScore + nakshatraScore + yogaScore + varaScore + lagnaScore;

  let grade: "A" | "B" | "C" | "D";
  if (total >= 80) grade = "A";
  else if (total >= 65) grade = "B";
  else if (total >= 50) grade = "C";
  else grade = "D";

  return {
    grade,
    total,
    breakdown: [
      {
        label: "Tithi",
        score: tithiScore,
        max: 20,
        note: `Tithi ${tithi} (${tithi === 15 ? "Purnima" : tithi === 0 ? "Amavasya" : "Shukla/Krishna"})`,
      },
      {
        label: "Nakshatra",
        score: nakshatraScore,
        max: 20,
        note: NAKSHATRAS[nakshatraIdx],
      },
      { label: "Yoga", score: yogaScore, max: 15, note: YOGAS[yogaIdx] },
      {
        label: "Vara/Weekday",
        score: varaScore,
        max: 15,
        note: WEEKDAY_NAMES[weekday],
      },
      { label: "Lagna", score: lagnaScore, max: 30, note: "Lagna strength" },
    ],
    rahukaal: RAHU_KAAL[weekday],
    yamaganda: YAMAGANDA[weekday],
    gulikaKaal: GULIKA_KAAL[weekday],
    nakshatra: NAKSHATRAS[nakshatraIdx],
    yoga: YOGAS[yogaIdx],
  };
}

type MuhurtaResult = ReturnType<typeof computeMuhurtaScore> & { date: Date };

function getUpcomingMuhurtas(selectedDate: string, activityValue: string) {
  const base = selectedDate ? new Date(selectedDate) : new Date();
  const results: MuhurtaResult[] = [];
  for (let i = 0; i < 30 && results.length < 3; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() + i + 1);
    const res = computeMuhurtaScore(d, activityValue);
    if (res.grade === "A" || res.grade === "B") {
      results.push({ date: d, ...res });
    }
  }
  // Ensure at least 3 results
  let extra = 30;
  while (results.length < 3 && extra < 90) {
    const d = new Date(base);
    d.setDate(d.getDate() + extra);
    const res = computeMuhurtaScore(d, activityValue);
    results.push({ date: d, ...res });
    extra++;
  }
  return results.slice(0, 3);
}

const gradeColors: Record<string, string> = {
  A: "oklch(0.55 0.18 145)",
  B: "oklch(0.68 0.20 48)",
  C: "oklch(0.65 0.18 30)",
  D: "oklch(0.55 0.22 20)",
};

const gradeLabels: Record<string, string> = {
  A: "Excellent — अत्यंत शुभ",
  B: "Good — शुभ",
  C: "Average — सामान्य",
  D: "Avoid — वर्जित",
};

export default function MuhurtaCalculator() {
  const [activity, setActivity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [result, setResult] = useState<ReturnType<
    typeof computeMuhurtaScore
  > | null>(null);
  const [upcoming, setUpcoming] = useState<
    Array<{ date: Date } & ReturnType<typeof computeMuhurtaScore>>
  >([]);

  const handleCalculate = () => {
    if (!activity || !selectedDate) return;
    const date = new Date(selectedDate);
    const res = computeMuhurtaScore(date, activity);
    setResult(res);
    setUpcoming(getUpcomingMuhurtas(selectedDate, activity));
  };

  return (
    <div className="space-y-6" data-ocid="muhurta.section">
      {/* Input card */}
      <Card
        style={{
          background: "oklch(0.16 0.04 20)",
          border: "1px solid oklch(0.28 0.06 25)",
        }}
      >
        <CardHeader>
          <CardTitle
            className="font-heading"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🕐 मुहूर्त कैलकुलेटर — Muhurta Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                className="font-heading"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                कार्य चुनें (Activity)
              </Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger
                  data-ocid="muhurta.activity.select"
                  style={{
                    background: "oklch(0.20 0.05 20)",
                    borderColor: "oklch(0.35 0.08 25)",
                    color: "oklch(0.90 0.04 60)",
                  }}
                >
                  <SelectValue placeholder="कार्य चुनें..." />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(0.20 0.05 20)",
                    borderColor: "oklch(0.35 0.08 25)",
                  }}
                >
                  {ACTIVITIES.map((a) => (
                    <SelectItem
                      key={a.value}
                      value={a.value}
                      style={{ color: "oklch(0.90 0.04 60)" }}
                    >
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                className="font-heading"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                तिथि चुनें (Date)
              </Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                data-ocid="muhurta.date.input"
                style={{
                  background: "oklch(0.20 0.05 20)",
                  borderColor: "oklch(0.35 0.08 25)",
                  color: "oklch(0.90 0.04 60)",
                }}
              />
            </div>
          </div>
          <Button
            onClick={handleCalculate}
            disabled={!activity || !selectedDate}
            data-ocid="muhurta.calculate.button"
            className="w-full font-heading font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            🔮 मुहूर्त गणना करें
          </Button>
        </CardContent>
      </Card>

      {result && (
        <>
          {/* Grade + Total */}
          <Card
            style={{
              background: "oklch(0.16 0.04 20)",
              border: `2px solid ${gradeColors[result.grade]}`,
            }}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-center">
                  <div
                    className="text-7xl font-bold font-heading"
                    style={{ color: gradeColors[result.grade] }}
                  >
                    {result.grade}
                  </div>
                  <Badge
                    className="mt-2 text-xs"
                    style={{
                      background: gradeColors[result.grade],
                      color: "white",
                    }}
                  >
                    {gradeLabels[result.grade]}
                  </Badge>
                </div>
                <div className="flex-1 w-full">
                  <p
                    className="font-heading text-sm mb-3"
                    style={{ color: "oklch(0.70 0.04 60)" }}
                  >
                    कुल अंक:{" "}
                    <span
                      className="font-bold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {result.total}/100
                    </span>
                  </p>
                  <div className="space-y-2">
                    {result.breakdown.map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span
                          className="font-heading text-xs w-28 shrink-0"
                          style={{ color: "oklch(0.75 0.04 60)" }}
                        >
                          {item.label}
                        </span>
                        <div
                          className="flex-1 h-2 rounded-full overflow-hidden"
                          style={{ background: "oklch(0.22 0.06 25)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(item.score / item.max) * 100}%`,
                              background: gradeColors[result.grade],
                            }}
                          />
                        </div>
                        <span
                          className="font-heading text-xs w-12 text-right shrink-0"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          {item.score}/{item.max}
                        </span>
                        <span
                          className="font-body text-xs"
                          style={{ color: "oklch(0.60 0.04 60)" }}
                        >
                          {item.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inauspicious times */}
          <Card
            style={{
              background: "oklch(0.16 0.04 20)",
              border: "1px solid oklch(0.28 0.06 25)",
            }}
          >
            <CardHeader>
              <CardTitle
                className="font-heading text-base"
                style={{ color: "oklch(0.75 0.18 25)" }}
              >
                ⚠️ अशुभ काल — Inauspicious Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: "Rahu Kaal", icon: "☄️", times: result.rahukaal },
                  { label: "Yamaganda", icon: "⛔", times: result.yamaganda },
                  {
                    label: "Gulika Kaal",
                    icon: "🚫",
                    times: result.gulikaKaal,
                  },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="rounded-lg p-3 text-center"
                    style={{
                      background: "oklch(0.55 0.22 20 / 0.12)",
                      border: "1px solid oklch(0.55 0.22 20 / 0.3)",
                    }}
                  >
                    <div className="text-2xl mb-1">{t.icon}</div>
                    <p
                      className="font-heading font-bold text-sm mb-1"
                      style={{ color: "oklch(0.75 0.18 25)" }}
                    >
                      {t.label}
                    </p>
                    <p
                      className="font-body text-xs"
                      style={{ color: "oklch(0.60 0.04 60)" }}
                    >
                      {t.times.start} – {t.times.end}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming muhurtas */}
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
                ✨ आगामी शुभ मुहूर्त — Upcoming Auspicious Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcoming.map((item, i) => (
                  <div
                    key={item.date.toISOString()}
                    data-ocid={`muhurta.item.${i + 1}`}
                    className="flex items-center justify-between rounded-lg p-3"
                    style={{
                      background: "oklch(0.20 0.06 25)",
                      border: `1px solid ${gradeColors[item.grade]}33`,
                    }}
                  >
                    <div>
                      <p
                        className="font-heading font-semibold text-sm"
                        style={{ color: "oklch(0.85 0.04 60)" }}
                      >
                        {item.date.toLocaleDateString("en-IN", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <p
                        className="font-body text-xs mt-0.5"
                        style={{ color: "oklch(0.60 0.04 60)" }}
                      >
                        Nakshatra: {item.nakshatra} · Yoga: {item.yoga}
                      </p>
                    </div>
                    <Badge
                      style={{
                        background: gradeColors[item.grade],
                        color: "white",
                        minWidth: "2rem",
                        textAlign: "center",
                      }}
                    >
                      {item.grade}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
