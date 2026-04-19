import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const RASHIS = [
  {
    name: "मेष",
    symbol: "♈",
    en: "Aries",
    lord: "मंगल",
    element: "अग्नि",
    quality: "चर",
    color: "oklch(0.55 0.22 20)",
  },
  {
    name: "वृषभ",
    symbol: "♉",
    en: "Taurus",
    lord: "शुक्र",
    element: "पृथ्वी",
    quality: "स्थिर",
    color: "oklch(0.60 0.16 130)",
  },
  {
    name: "मिथुन",
    symbol: "♊",
    en: "Gemini",
    lord: "बुध",
    element: "वायु",
    quality: "द्विस्वभाव",
    color: "oklch(0.60 0.18 200)",
  },
  {
    name: "कर्क",
    symbol: "♋",
    en: "Cancer",
    lord: "चंद्र",
    element: "जल",
    quality: "चर",
    color: "oklch(0.60 0.08 200)",
  },
  {
    name: "सिंह",
    symbol: "♌",
    en: "Leo",
    lord: "सूर्य",
    element: "अग्नि",
    quality: "स्थिर",
    color: "oklch(0.72 0.22 55)",
  },
  {
    name: "कन्या",
    symbol: "♍",
    en: "Virgo",
    lord: "बुध",
    element: "पृथ्वी",
    quality: "द्विस्वभाव",
    color: "oklch(0.62 0.18 130)",
  },
  {
    name: "तुला",
    symbol: "♎",
    en: "Libra",
    lord: "शुक्र",
    element: "वायु",
    quality: "चर",
    color: "oklch(0.60 0.16 305)",
  },
  {
    name: "वृश्चिक",
    symbol: "♏",
    en: "Scorpio",
    lord: "मंगल",
    element: "जल",
    quality: "स्थिर",
    color: "oklch(0.55 0.20 20)",
  },
  {
    name: "धनु",
    symbol: "♐",
    en: "Sagittarius",
    lord: "गुरु",
    element: "अग्नि",
    quality: "द्विस्वभाव",
    color: "oklch(0.62 0.18 75)",
  },
  {
    name: "मकर",
    symbol: "♑",
    en: "Capricorn",
    lord: "शनि",
    element: "पृथ्वी",
    quality: "चर",
    color: "oklch(0.55 0.10 240)",
  },
  {
    name: "कुम्भ",
    symbol: "♒",
    en: "Aquarius",
    lord: "शनि",
    element: "वायु",
    quality: "स्थिर",
    color: "oklch(0.55 0.16 250)",
  },
  {
    name: "मीन",
    symbol: "♓",
    en: "Pisces",
    lord: "गुरु",
    element: "जल",
    quality: "द्विस्वभाव",
    color: "oklch(0.60 0.14 230)",
  },
];

// Sun sign by month (Western-based approximation)
const SUN_SIGNS: Record<number, number> = {
  1: 9,
  2: 10,
  3: 11,
  4: 0,
  5: 1,
  6: 2,
  7: 3,
  8: 4,
  9: 5,
  10: 6,
  11: 7,
  12: 8,
};

// Moon rashi based on simplified calculation
const getMoonRashi = (dob: Date): number => {
  const d = dob.getDate();
  const m = dob.getMonth() + 1;
  const y = dob.getFullYear() % 100;
  return (d + m + y + 3) % 12;
};

// Vedic Rashi (Janma Rashi) based on nakshatra
const getJanmaRashi = (dob: Date): number => {
  const d = dob.getDate();
  const m = dob.getMonth() + 1;
  const y = dob.getFullYear() % 100;
  return (d + m + y) % 12;
};

// Lagna (Ascendant) approximation
const getLagna = (dob: Date): number => {
  const h = dob.getHours ? dob.getHours() : 6;
  return (Math.floor(h / 2) + getJanmaRashi(dob)) % 12;
};

interface RashiResult {
  rashi: (typeof RASHIS)[0];
  type: string;
  description: string;
}

function RashiCard({ result }: { result: RashiResult }) {
  const r = result.rashi;
  return (
    <Card
      style={{
        background: "oklch(0.16 0.04 20)",
        border: `2px solid ${r.color}`,
      }}
    >
      <CardContent className="pt-6">
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">{r.symbol}</div>
          <h2
            className="font-decorative text-3xl font-bold"
            style={{ color: r.color }}
          >
            {r.name}
          </h2>
          <p
            className="text-sm font-body"
            style={{ color: "oklch(0.65 0.04 60)" }}
          >
            {r.en}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: result.type, value: r.name },
            { label: "राशि स्वामी", value: r.lord },
            { label: "तत्त्व", value: r.element },
            { label: "गुण", value: r.quality },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded-xl text-center"
              style={{ background: "oklch(0.20 0.05 20)" }}
            >
              <div
                className="text-xs font-heading"
                style={{ color: "oklch(0.60 0.04 60)" }}
              >
                {item.label}
              </div>
              <div
                className="font-heading font-semibold text-sm mt-1"
                style={{ color: "oklch(0.85 0.08 60)" }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-3 p-3 rounded-lg"
          style={{ background: "oklch(0.20 0.05 20)" }}
        >
          <p
            className="text-xs font-body"
            style={{ color: "oklch(0.68 0.04 60)" }}
          >
            {result.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function SingleRashiCalculator({
  type,
  onCalculate,
}: {
  type: "janma" | "sun" | "moon" | "lagna";
  onCalculate: (dob: Date, time?: string) => RashiResult;
}) {
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<RashiResult | null>(null);

  const typeLabels: Record<string, string> = {
    janma: "जन्म राशि",
    sun: "सूर्य राशि",
    moon: "चंद्र राशि",
    lagna: "लग्न (उदय राशि)",
  };
  const typeOcids: Record<string, string> = {
    janma: "janma",
    sun: "sun",
    moon: "moon",
    lagna: "lagna",
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label
          className="font-heading"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          जन्म तिथि
        </Label>
        <Input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          data-ocid={`${typeOcids[type]}.dob_input`}
          style={{
            background: "oklch(0.20 0.05 20)",
            borderColor: "oklch(0.35 0.08 25)",
            color: "oklch(0.90 0.04 60)",
          }}
        />
      </div>
      {type === "lagna" && (
        <div className="space-y-2">
          <Label
            className="font-heading"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            जन्म समय (वैकल्पिक)
          </Label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            data-ocid="lagna.time_input"
            style={{
              background: "oklch(0.20 0.05 20)",
              borderColor: "oklch(0.35 0.08 25)",
              color: "oklch(0.90 0.04 60)",
            }}
          />
        </div>
      )}
      <Button
        onClick={() => {
          if (!dob) return;
          const date = new Date(dob);
          setResult(onCalculate(date, time));
        }}
        disabled={!dob}
        data-ocid={`${typeOcids[type]}.calculate_button`}
        className="w-full font-heading font-semibold"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
          color: "white",
        }}
      >
        🔮 {typeLabels[type]} जानें
      </Button>
      {result && <RashiCard result={result} />}
    </div>
  );
}

const RASHI_DESCRIPTIONS: Record<string, string> = {
  मेष: "मेष राशि के जातक साहसी, उत्साही और नेतृत्व गुणों से संपन्न होते हैं। मंगल ग्रह के प्रभाव से ये ऊर्जावान और क्रियाशील रहते हैं।",
  वृषभ: "वृषभ राशि के जातक स्थिर, धैर्यवान और भौतिक सुखों को प्राथमिकता देते हैं। शुक्र के प्रभाव से ये कला और सौंदर्य प्रेमी होते हैं।",
  मिथुन: "मिथुन राशि के जातक बौद्धिक, संचार में कुशल और बहुमुखी प्रतिभा के धनी होते हैं। बुध के प्रभाव से ये वाणिज्य में सफल रहते हैं।",
  कर्क: "कर्क राशि के जातक संवेदनशील, पारिवारिक और भावुक होते हैं। चंद्रमा के प्रभाव से ये मातृप्रेम में विश्वास रखते हैं।",
  सिंह: "सिंह राशि के जातक नेतृत्वकारी, उदार और आत्मविश्वासी होते हैं। सूर्य के प्रभाव से ये राजनीति और प्रशासन में सफल रहते हैं।",
  कन्या: "कन्या राशि के जातक विश्लेषणात्मक, व्यावहारिक और सेवाभावी होते हैं। बुध के प्रभाव से ये चिकित्सा और लेखन में पारंगत होते हैं।",
  तुला: "तुला राशि के जातक संतुलित, न्यायप्रिय और कूटनीतिज्ञ होते हैं। शुक्र के प्रभाव से ये सौंदर्य और साझेदारी में विश्वास रखते हैं।",
  वृश्चिक:
    "वृश्चिक राशि के जातक रहस्यमय, दृढ़ और गहन भावनाओं वाले होते हैं। मंगल के प्रभाव से ये शोध और तंत्र विद्या में रुचि रखते हैं।",
  धनु: "धनु राशि के जातक आशावादी, दार्शनिक और यात्रा प्रेमी होते हैं। गुरु के प्रभाव से ये धर्म और उच्च शिक्षा में सफल रहते हैं।",
  मकर: "मकर राशि के जातक महत्वाकांक्षी, अनुशासित और व्यावहारिक होते हैं। शनि के प्रभाव से ये कठिन परिश्रम से सफलता पाते हैं।",
  कुम्भ: "कुम्भ राशि के जातक मानवतावादी, प्रगतिशील और स्वतंत्र विचारक होते हैं। शनि के प्रभाव से ये समाज सेवा में आगे रहते हैं।",
  मीन: "मीन राशि के जातक आध्यात्मिक, करुणामय और कल्पनाशील होते हैं। गुरु के प्रभाव से ये ध्यान और आध्यात्मिक साधना में उत्कृष्ट होते हैं।",
};

export default function RashiCalculators() {
  const calcJanmaRashi = (dob: Date): RashiResult => {
    const idx = getJanmaRashi(dob);
    const rashi = RASHIS[idx];
    return {
      rashi,
      type: "जन्म राशि",
      description: RASHI_DESCRIPTIONS[rashi.name] || "",
    };
  };

  const calcSunRashi = (dob: Date): RashiResult => {
    const idx = SUN_SIGNS[dob.getMonth() + 1] ?? 0;
    const rashi = RASHIS[idx];
    return {
      rashi,
      type: "सूर्य राशि",
      description: `${rashi.name} सूर्य राशि — ${RASHI_DESCRIPTIONS[rashi.name] || ""}`,
    };
  };

  const calcMoonRashi = (dob: Date): RashiResult => {
    const idx = getMoonRashi(dob);
    const rashi = RASHIS[idx];
    return {
      rashi,
      type: "चंद्र राशि",
      description: `${rashi.name} चंद्र राशि — ${RASHI_DESCRIPTIONS[rashi.name] || ""}`,
    };
  };

  const calcLagna = (dob: Date): RashiResult => {
    const idx = getLagna(dob);
    const rashi = RASHIS[idx];
    return {
      rashi,
      type: "लग्न राशि",
      description: `${rashi.name} लग्न — ${RASHI_DESCRIPTIONS[rashi.name] || ""}`,
    };
  };

  return (
    <div className="space-y-4" data-ocid="rashi.section">
      <div
        className="p-4 rounded-xl"
        style={{
          background: "oklch(0.14 0.04 20)",
          border: "1px solid oklch(0.28 0.06 25)",
        }}
      >
        <h2
          className="font-heading font-bold text-lg mb-1"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          ♈ राशि / सूर्य / चंद्र / लग्न कैलकुलेटर
        </h2>
        <p
          className="text-xs font-body"
          style={{ color: "oklch(0.60 0.04 60)" }}
        >
          जन्म तिथि के आधार पर अपनी राशि जानें
        </p>
      </div>

      <Tabs defaultValue="janma">
        <TabsList
          className="w-full grid grid-cols-4 h-auto p-1 rounded-xl"
          style={{ background: "oklch(0.22 0.08 22)" }}
        >
          {[
            { value: "janma", label: "जन्म राशि" },
            { value: "sun", label: "सूर्य" },
            { value: "moon", label: "चंद्र" },
            { value: "lagna", label: "लग्न" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              data-ocid={`rashi.${tab.value}.tab`}
              className="font-heading text-xs font-semibold py-2 rounded-lg data-[state=active]:text-white transition-all"
              style={{ color: "oklch(0.70 0.04 60)" }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="janma" className="mt-4">
          <SingleRashiCalculator type="janma" onCalculate={calcJanmaRashi} />
        </TabsContent>
        <TabsContent value="sun" className="mt-4">
          <SingleRashiCalculator type="sun" onCalculate={calcSunRashi} />
        </TabsContent>
        <TabsContent value="moon" className="mt-4">
          <SingleRashiCalculator type="moon" onCalculate={calcMoonRashi} />
        </TabsContent>
        <TabsContent value="lagna" className="mt-4">
          <SingleRashiCalculator type="lagna" onCalculate={calcLagna} />
        </TabsContent>
      </Tabs>

      {/* All 12 rashis overview */}
      <Card
        style={{
          background: "oklch(0.16 0.04 20)",
          border: "1px solid oklch(0.28 0.06 25)",
        }}
      >
        <CardHeader>
          <CardTitle
            className="font-heading text-sm"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            12 राशियाँ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {RASHIS.map((r) => (
              <div
                key={r.name}
                className="p-2 rounded-lg text-center"
                style={{
                  background: "oklch(0.20 0.05 20)",
                  border: `1px solid ${r.color}33`,
                }}
              >
                <div className="text-xl" style={{ color: r.color }}>
                  {r.symbol}
                </div>
                <div
                  className="text-xs font-heading"
                  style={{ color: "oklch(0.80 0.04 60)" }}
                >
                  {r.name}
                </div>
                <div
                  className="text-xs font-body"
                  style={{ color: "oklch(0.55 0.04 60)" }}
                >
                  {r.lord}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
