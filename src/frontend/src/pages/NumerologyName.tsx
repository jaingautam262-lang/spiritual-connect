import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/useLanguage";
import { ChevronDown, ChevronUp, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type System = "pythagorean" | "chaldean" | "sepharial" | "modern";

const PYTH_MAP: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};
const CHALD_MAP: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 8,
  G: 3,
  H: 5,
  I: 1,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 7,
  P: 8,
  Q: 1,
  R: 2,
  S: 3,
  T: 4,
  U: 6,
  V: 6,
  W: 6,
  X: 5,
  Y: 1,
  Z: 7,
};
const SEPH_MAP: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26,
};
const MODERN_MAP = PYTH_MAP;

const SYSTEM_MAPS: Record<System, Record<string, number>> = {
  pythagorean: PYTH_MAP,
  chaldean: CHALD_MAP,
  sepharial: SEPH_MAP,
  modern: MODERN_MAP,
};

function reduceToSingle(n: number, masterNumbers = [11, 22, 33]): number {
  let val = n;
  while (val > 9 && !masterNumbers.includes(val)) {
    val = String(val)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  }
  return val;
}

function calculateNameNumber(name: string, system: System): number {
  const map = SYSTEM_MAPS[system];
  const letters = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("");
  let total = 0;
  for (const ch of letters) {
    if (system === "sepharial") total += map[ch] ?? 0;
    else total += map[ch] ?? 0;
  }
  return reduceToSingle(total);
}

const NUMBER_DATA: Record<
  number,
  {
    traits: string;
    strengths: string;
    challenges: string;
    lucky: { colors: string[]; numbers: number[]; compatible: number[] };
    hi: { traits: string; strengths: string; challenges: string };
  }
> = {
  1: {
    traits: "Leadership, independence, originality",
    strengths: "Pioneering spirit, determination, courage",
    challenges: "Stubbornness, ego, impatience",
    lucky: {
      colors: ["Red", "Orange", "Gold"],
      numbers: [1, 10, 19],
      compatible: [1, 3, 5, 9],
    },
    hi: {
      traits: "नेतृत्व, स्वतंत्रता, मौलिकता",
      strengths: "अग्रणी भावना, दृढ़ता, साहस",
      challenges: "हठधर्मिता, अहंकार, अधीरता",
    },
  },
  2: {
    traits: "Cooperation, balance, sensitivity",
    strengths: "Diplomacy, intuition, adaptability",
    challenges: "Over-sensitivity, indecision, dependency",
    lucky: {
      colors: ["White", "Cream", "Silver"],
      numbers: [2, 11, 20],
      compatible: [2, 4, 6, 8],
    },
    hi: {
      traits: "सहयोग, संतुलन, संवेदनशीलता",
      strengths: "कूटनीति, अंतर्ज्ञान, अनुकूलनशीलता",
      challenges: "अति-संवेदनशीलता, अनिर्णय, निर्भरता",
    },
  },
  3: {
    traits: "Creativity, communication, joy",
    strengths: "Expressiveness, optimism, social charm",
    challenges: "Scattered energy, superficiality, mood swings",
    lucky: {
      colors: ["Yellow", "Saffron", "Purple"],
      numbers: [3, 12, 21],
      compatible: [1, 3, 5, 9],
    },
    hi: {
      traits: "रचनात्मकता, संचार, आनंद",
      strengths: "अभिव्यंजना, आशावाद, सामाजिक आकर्षण",
      challenges: "बिखरी ऊर्जा, सतहीपन, मूड स्विंग",
    },
  },
  4: {
    traits: "Stability, hard work, discipline",
    strengths: "Reliability, patience, practicality",
    challenges: "Rigidity, over-caution, resistance to change",
    lucky: {
      colors: ["Green", "Brown", "Grey"],
      numbers: [4, 13, 22],
      compatible: [2, 4, 6, 8],
    },
    hi: {
      traits: "स्थिरता, कड़ी मेहनत, अनुशासन",
      strengths: "विश्वसनीयता, धैर्य, व्यावहारिकता",
      challenges: "कठोरता, अत्यधिक सावधानी, परिवर्तन का प्रतिरोध",
    },
  },
  5: {
    traits: "Freedom, adventure, versatility",
    strengths: "Adaptability, curiosity, resourcefulness",
    challenges: "Restlessness, impulsiveness, inconsistency",
    lucky: {
      colors: ["Blue", "Turquoise", "Silver"],
      numbers: [5, 14, 23],
      compatible: [1, 3, 5, 7],
    },
    hi: {
      traits: "स्वतंत्रता, साहस, बहुमुखता",
      strengths: "अनुकूलनशीलता, जिज्ञासा, साधन-संपन्नता",
      challenges: "अस्थिरता, आवेग, असंगति",
    },
  },
  6: {
    traits: "Harmony, responsibility, nurturing",
    strengths: "Compassion, loyalty, healing energy",
    challenges: "Self-sacrifice, perfectionism, interference",
    lucky: {
      colors: ["Rose", "Pink", "Indigo"],
      numbers: [6, 15, 24],
      compatible: [2, 4, 6, 8],
    },
    hi: {
      traits: "सामंजस्य, जिम्मेदारी, पोषण",
      strengths: "करुणा, वफादारी, उपचार ऊर्जा",
      challenges: "आत्म-बलिदान, पूर्णतावाद, हस्तक्षेप",
    },
  },
  7: {
    traits: "Introspection, spirituality, wisdom",
    strengths: "Analytical mind, intuition, depth",
    challenges: "Isolation, secretiveness, skepticism",
    lucky: {
      colors: ["Violet", "Purple", "Grey"],
      numbers: [7, 16, 25],
      compatible: [1, 5, 7, 9],
    },
    hi: {
      traits: "आत्मनिरीक्षण, आध्यात्मिकता, ज्ञान",
      strengths: "विश्लेषणात्मक मन, अंतर्ज्ञान, गहराई",
      challenges: "एकांत, गोपनीयता, संदेहवाद",
    },
  },
  8: {
    traits: "Ambition, authority, material success",
    strengths: "Business acumen, resilience, vision",
    challenges: "Workaholic tendencies, power struggles, materialism",
    lucky: {
      colors: ["Black", "Navy", "Dark Brown"],
      numbers: [8, 17, 26],
      compatible: [2, 4, 6, 8],
    },
    hi: {
      traits: "महत्वाकांक्षा, अधिकार, भौतिक सफलता",
      strengths: "व्यापार कौशल, लचीलापन, दृष्टिकोण",
      challenges: "वर्कहोलिक प्रवृत्ति, सत्ता संघर्ष, भौतिकवाद",
    },
  },
  9: {
    traits: "Compassion, humanitarianism, wisdom",
    strengths: "Universal love, idealism, creativity",
    challenges: "Impracticality, emotional volatility, letting go",
    lucky: {
      colors: ["Red", "Crimson", "Gold"],
      numbers: [9, 18, 27],
      compatible: [1, 3, 6, 9],
    },
    hi: {
      traits: "करुणा, मानवतावाद, ज्ञान",
      strengths: "सार्वभौमिक प्रेम, आदर्शवाद, रचनात्मकता",
      challenges: "अव्यावहारिकता, भावनात्मक अस्थिरता",
    },
  },
  11: {
    traits: "Intuition, inspiration, spiritual insight",
    strengths: "Psychic sensitivity, visionary ideas",
    challenges: "Anxiety, self-doubt, over-idealism",
    lucky: {
      colors: ["Silver", "White", "Gold"],
      numbers: [11, 2, 29],
      compatible: [2, 11, 22],
    },
    hi: {
      traits: "अंतर्ज्ञान, प्रेरणा, आध्यात्मिक अंतर्दृष्टि",
      strengths: "मानसिक संवेदनशीलता, दूरदर्शी विचार",
      challenges: "चिंता, आत्म-संदेह",
    },
  },
  22: {
    traits: "Master builder, large-scale vision",
    strengths: "Practical idealism, manifestation power",
    challenges: "Overwhelm, rigidity, high pressure",
    lucky: {
      colors: ["Earth Tones", "Gold", "Navy"],
      numbers: [22, 4, 40],
      compatible: [4, 22, 33],
    },
    hi: {
      traits: "मास्टर बिल्डर, व्यापक दृष्टिकोण",
      strengths: "व्यावहारिक आदर्शवाद",
      challenges: "अत्यधिक दबाव, कठोरता",
    },
  },
  33: {
    traits: "Master teacher, selfless service",
    strengths: "Healing, nurturing, divine love",
    challenges: "Martyrdom, idealism beyond reality",
    lucky: {
      colors: ["Rose Gold", "Violet", "White"],
      numbers: [33, 6, 15],
      compatible: [6, 11, 33],
    },
    hi: {
      traits: "मास्टर शिक्षक, निस्वार्थ सेवा",
      strengths: "उपचार, पोषण, दिव्य प्रेम",
      challenges: "शहादत, असांसारिक आदर्शवाद",
    },
  },
};

export default function NumerologyName() {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [name, setName] = useState("");
  const [system, setSystem] = useState<System>("pythagorean");
  const [result, setResult] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [history] = useState<
    { name: string; number: number; system: string }[]
  >([]);

  function handleCalculate() {
    if (!name.trim()) return;
    const num = calculateNameNumber(name, system);
    setResult(num);
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    toast.success(isHi ? "लिंक कॉपी हो गया!" : "Link copied!");
  }

  const numData = result ? NUMBER_DATA[result] : null;

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="numerology-name.page"
    >
      <div className="bg-card border-b py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {isHi ? "नाम अंकज्योतिष" : "Name Numerology"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isHi
              ? "अपने नाम से जीवन पथ अंक जानें"
              : "Discover your Life Path Number from your name"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {isHi ? "अपना नाम दर्ज करें" : "Enter Your Name"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-input">
                    {isHi ? "पूरा नाम" : "Full Name"}
                  </Label>
                  <Input
                    id="name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={
                      isHi ? "अपना पूरा नाम लिखें" : "Enter your full name"
                    }
                    data-ocid="numerology-name.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isHi ? "सिस्टम चुनें" : "Choose System"}</Label>
                  <Tabs
                    value={system}
                    onValueChange={(v) => setSystem(v as System)}
                  >
                    <TabsList className="grid grid-cols-2 w-full h-auto">
                      <TabsTrigger value="pythagorean" className="text-xs">
                        Pythagorean
                      </TabsTrigger>
                      <TabsTrigger value="chaldean" className="text-xs">
                        Chaldean
                      </TabsTrigger>
                      <TabsTrigger value="sepharial" className="text-xs">
                        Sepharial
                      </TabsTrigger>
                      <TabsTrigger value="modern" className="text-xs">
                        Modern
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCalculate}
                  data-ocid="numerology-name.submit_button"
                >
                  {isHi ? "गणना करें" : "Calculate"}
                </Button>
              </CardContent>
            </Card>

            {history.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {isHi ? "पिछली गणनाएं" : "Past Calculations"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {history.map((h, i) => (
                      <div
                        key={`history-${i}-${h.name}`}
                        className="flex justify-between text-sm border-b pb-1"
                      >
                        <span>{h.name}</span>
                        <Badge>{h.number}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Result Panel */}
          <div>
            {result !== null && numData ? (
              <Card className="border-primary/30">
                <CardContent className="pt-6 space-y-4">
                  <div className="text-center">
                    <div className="text-7xl font-display font-bold text-primary mb-2">
                      {result}
                    </div>
                    <div className="text-base font-semibold text-foreground">
                      {isHi ? "आपका नाम अंक" : "Your Name Number"}
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {isHi ? "व्यक्तित्व" : "Traits"}
                      </div>
                      <div>{isHi ? numData.hi.traits : numData.traits}</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {isHi ? "ताकत" : "Strengths"}
                      </div>
                      <div>
                        {isHi ? numData.hi.strengths : numData.strengths}
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-1">
                        {isHi ? "चुनौतियां" : "Challenges"}
                      </div>
                      <div>
                        {isHi ? numData.hi.challenges : numData.challenges}
                      </div>
                    </div>
                    <div className="p-3 bg-accent/20 rounded-lg space-y-1">
                      <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                        {isHi ? "शुभ" : "Lucky"}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {numData.lucky.colors.map((c) => (
                          <Badge key={c} variant="outline" className="text-xs">
                            {c}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isHi ? "अनुकूल अंक: " : "Compatible: "}
                        {numData.lucky.compatible.join(", ")}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between text-sm font-medium py-2 border-t"
                    onClick={() => setExpanded(!expanded)}
                  >
                    <span>
                      {isHi
                        ? `अंक ${result} का अर्थ`
                        : `What does Number ${result} mean?`}
                    </span>
                    {expanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expanded && (
                    <div className="text-sm text-muted-foreground leading-relaxed">
                      {isHi
                        ? `अंक ${result} वाले व्यक्ति ${numData.hi.traits.toLowerCase()} की विशेषता रखते हैं। इनकी मुख्य ताकत ${numData.hi.strengths.toLowerCase()} है।`
                        : `People with Number ${result} are characterized by ${numData.traits.toLowerCase()}. Their core strengths are ${numData.strengths.toLowerCase()}.`}
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleShare}
                      data-ocid="numerology-name.share_button"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      {isHi ? "शेयर करें" : "Share"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-16 text-center text-muted-foreground">
                  <div className="text-4xl mb-3">🔢</div>
                  <p className="text-sm">
                    {isHi
                      ? "नाम डालें और गणना करें"
                      : "Enter your name and calculate"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
