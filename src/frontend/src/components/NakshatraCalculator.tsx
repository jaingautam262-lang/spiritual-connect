import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const NAKSHATRAS = [
  {
    name: "अश्विनी",
    lord: "केतु",
    rashi: "मेष",
    gana: "देव",
    nadi: "आदि",
    varna: "वैश्य",
    luckyColor: "लाल",
    luckyGem: "लहसुनिया",
    symbol: "🐴",
  },
  {
    name: "भरणी",
    lord: "शुक्र",
    rashi: "मेष",
    gana: "मानुष",
    nadi: "अन्त्य",
    varna: "क्षत्रिय",
    luckyColor: "गुलाबी",
    luckyGem: "हीरा",
    symbol: "⚰️",
  },
  {
    name: "कृत्तिका",
    lord: "सूर्य",
    rashi: "वृषभ",
    gana: "राक्षस",
    nadi: "मध्य",
    varna: "ब्राह्मण",
    luckyColor: "लाल",
    luckyGem: "माणिक",
    symbol: "🔥",
  },
  {
    name: "रोहिणी",
    lord: "चंद्र",
    rashi: "वृषभ",
    gana: "मानुष",
    nadi: "आदि",
    varna: "शूद्र",
    luckyColor: "सफेद",
    luckyGem: "मोती",
    symbol: "🐮",
  },
  {
    name: "मृगशिरा",
    lord: "मंगल",
    rashi: "मिथुन",
    gana: "देव",
    nadi: "अन्त्य",
    varna: "वैश्य",
    luckyColor: "हरा",
    luckyGem: "मूंगा",
    symbol: "🦌",
  },
  {
    name: "आर्द्रा",
    lord: "राहु",
    rashi: "मिथुन",
    gana: "मानुष",
    nadi: "मध्य",
    varna: "वैश्य",
    luckyColor: "नीला",
    luckyGem: "गोमेद",
    symbol: "💎",
  },
  {
    name: "पुनर्वसु",
    lord: "गुरु",
    rashi: "कर्क",
    gana: "देव",
    nadi: "आदि",
    varna: "वैश्य",
    luckyColor: "पीला",
    luckyGem: "पुखराज",
    symbol: "🏹",
  },
  {
    name: "पुष्य",
    lord: "शनि",
    rashi: "कर्क",
    gana: "देव",
    nadi: "अन्त्य",
    varna: "क्षत्रिय",
    luckyColor: "नीला",
    luckyGem: "नीलम",
    symbol: "🌸",
  },
  {
    name: "आश्लेषा",
    lord: "बुध",
    rashi: "कर्क",
    gana: "राक्षस",
    nadi: "मध्य",
    varna: "क्षत्रिय",
    luckyColor: "हरा",
    luckyGem: "पन्ना",
    symbol: "🐍",
  },
  {
    name: "मघा",
    lord: "केतु",
    rashi: "सिंह",
    gana: "राक्षस",
    nadi: "आदि",
    varna: "शूद्र",
    luckyColor: "लाल",
    luckyGem: "लहसुनिया",
    symbol: "👑",
  },
  {
    name: "पूर्व फाल्गुनी",
    lord: "शुक्र",
    rashi: "सिंह",
    gana: "मानुष",
    nadi: "अन्त्य",
    varna: "ब्राह्मण",
    luckyColor: "गुलाबी",
    luckyGem: "हीरा",
    symbol: "🛏️",
  },
  {
    name: "उत्तर फाल्गुनी",
    lord: "सूर्य",
    rashi: "कन्या",
    gana: "मानुष",
    nadi: "मध्य",
    varna: "क्षत्रिय",
    luckyColor: "नारंगी",
    luckyGem: "माणिक",
    symbol: "🛏️",
  },
  {
    name: "हस्त",
    lord: "चंद्र",
    rashi: "कन्या",
    gana: "देव",
    nadi: "आदि",
    varna: "वैश्य",
    luckyColor: "हरा",
    luckyGem: "मोती",
    symbol: "✋",
  },
  {
    name: "चित्रा",
    lord: "मंगल",
    rashi: "तुला",
    gana: "राक्षस",
    nadi: "अन्त्य",
    varna: "वैश्य",
    luckyColor: "बैंगनी",
    luckyGem: "मूंगा",
    symbol: "💫",
  },
  {
    name: "स्वाति",
    lord: "राहु",
    rashi: "तुला",
    gana: "देव",
    nadi: "मध्य",
    varna: "वैश्य",
    luckyColor: "काला",
    luckyGem: "गोमेद",
    symbol: "🌿",
  },
  {
    name: "विशाखा",
    lord: "गुरु",
    rashi: "वृश्चिक",
    gana: "राक्षस",
    nadi: "आदि",
    varna: "क्षत्रिय",
    luckyColor: "पीला",
    luckyGem: "पुखराज",
    symbol: "🌳",
  },
  {
    name: "अनुराधा",
    lord: "शनि",
    rashi: "वृश्चिक",
    gana: "देव",
    nadi: "अन्त्य",
    varna: "शूद्र",
    luckyColor: "नीला",
    luckyGem: "नीलम",
    symbol: "🌟",
  },
  {
    name: "ज्येष्ठा",
    lord: "बुध",
    rashi: "वृश्चिक",
    gana: "राक्षस",
    nadi: "मध्य",
    varna: "वैश्य",
    luckyColor: "हरा",
    luckyGem: "पन्ना",
    symbol: "🏆",
  },
  {
    name: "मूल",
    lord: "केतु",
    rashi: "धनु",
    gana: "राक्षस",
    nadi: "आदि",
    varna: "क्षत्रिय",
    luckyColor: "भूरा",
    luckyGem: "लहसुनिया",
    symbol: "🌿",
  },
  {
    name: "पूर्वाषाढ़ा",
    lord: "शुक्र",
    rashi: "धनु",
    gana: "मानुष",
    nadi: "अन्त्य",
    varna: "ब्राह्मण",
    luckyColor: "सफेद",
    luckyGem: "हीरा",
    symbol: "💧",
  },
  {
    name: "उत्तराषाढ़ा",
    lord: "सूर्य",
    rashi: "मकर",
    gana: "मानुष",
    nadi: "मध्य",
    varna: "क्षत्रिय",
    luckyColor: "तांबई",
    luckyGem: "माणिक",
    symbol: "🐘",
  },
  {
    name: "श्रवण",
    lord: "चंद्र",
    rashi: "मकर",
    gana: "देव",
    nadi: "आदि",
    varna: "वैश्य",
    luckyColor: "सफेद",
    luckyGem: "मोती",
    symbol: "👂",
  },
  {
    name: "धनिष्ठा",
    lord: "मंगल",
    rashi: "कुम्भ",
    gana: "राक्षस",
    nadi: "अन्त्य",
    varna: "वैश्य",
    luckyColor: "लाल",
    luckyGem: "मूंगा",
    symbol: "🥁",
  },
  {
    name: "शतभिषा",
    lord: "राहु",
    rashi: "कुम्भ",
    gana: "राक्षस",
    nadi: "मध्य",
    varna: "वैश्य",
    luckyColor: "काला",
    luckyGem: "गोमेद",
    symbol: "⭕",
  },
  {
    name: "पूर्वभाद्रपदा",
    lord: "गुरु",
    rashi: "मीन",
    gana: "मानुष",
    nadi: "आदि",
    varna: "ब्राह्मण",
    luckyColor: "पीला",
    luckyGem: "पुखराज",
    symbol: "🔱",
  },
  {
    name: "उत्तरभाद्रपदा",
    lord: "शनि",
    rashi: "मीन",
    gana: "मानुष",
    nadi: "अन्त्य",
    varna: "क्षत्रिय",
    luckyColor: "नीला",
    luckyGem: "नीलम",
    symbol: "🐍",
  },
  {
    name: "रेवती",
    lord: "बुध",
    rashi: "मीन",
    gana: "देव",
    nadi: "मध्य",
    varna: "वैश्य",
    luckyColor: "हरा",
    luckyGem: "पन्ना",
    symbol: "🐟",
  },
];

const nakIdx = (dob: Date): number => {
  const d = dob.getDate();
  const m = dob.getMonth() + 1;
  const y = dob.getFullYear() % 100;
  return (d + m + y) % 27;
};

const getPada = (dob: Date): number => {
  return (dob.getDate() % 4) + 1;
};

const GANA_COLORS: Record<string, string> = {
  देव: "oklch(0.62 0.18 75)",
  मानुष: "oklch(0.60 0.14 200)",
  राक्षस: "oklch(0.55 0.20 20)",
};

export default function NakshatraCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<
    ((typeof NAKSHATRAS)[0] & { pada: number; index: number }) | null
  >(null);

  const handleCalculate = () => {
    if (!dob) return;
    const date = new Date(dob);
    const idx = nakIdx(date);
    const pada = getPada(date);
    setResult({ ...NAKSHATRAS[idx], pada, index: idx });
  };

  return (
    <div className="space-y-6" data-ocid="nakshatra.section">
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
            ⭐ नक्षत्र कैलकुलेटर
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
              data-ocid="nakshatra.dob_input"
              style={{
                background: "oklch(0.20 0.05 20)",
                borderColor: "oklch(0.35 0.08 25)",
                color: "oklch(0.90 0.04 60)",
              }}
            />
          </div>
          <Button
            onClick={handleCalculate}
            disabled={!dob}
            data-ocid="nakshatra.calculate_button"
            className="w-full font-heading font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            ✨ नक्षत्र जानें
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4" data-ocid="nakshatra.result">
          {/* Main result */}
          <Card
            style={{
              background: "oklch(0.16 0.04 20)",
              border: "2px solid oklch(0.68 0.20 48)",
            }}
          >
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-2">{result.symbol}</div>
                <h2
                  className="font-decorative text-3xl font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {result.name} नक्षत्र
                </h2>
                <p
                  className="font-body text-sm mt-1"
                  style={{ color: "oklch(0.65 0.06 60)" }}
                >
                  नक्षत्र संख्या: {result.index + 1}/27 | पाद: {result.pada}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: "जन्म नक्षत्र", value: result.name, icon: "⭐" },
                  { label: "नक्षत्र स्वामी", value: result.lord, icon: "🪐" },
                  { label: "जन्म राशि", value: result.rashi, icon: "♈" },
                  { label: "पाद", value: `${result.pada}वाँ`, icon: "📍" },
                  { label: "गण", value: result.gana, icon: "🌀" },
                  { label: "नाड़ी", value: result.nadi, icon: "💫" },
                  { label: "वर्ण", value: result.varna, icon: "🎭" },
                  { label: "शुभ रंग", value: result.luckyColor, icon: "🎨" },
                  { label: "शुभ रत्न", value: result.luckyGem, icon: "💎" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl text-center"
                    style={{ background: "oklch(0.20 0.05 20)" }}
                  >
                    <div className="text-lg mb-1">{item.icon}</div>
                    <div
                      className="text-xs font-heading"
                      style={{ color: "oklch(0.60 0.04 60)" }}
                    >
                      {item.label}
                    </div>
                    <div
                      className="font-heading font-semibold text-sm mt-0.5"
                      style={{
                        color:
                          item.label === "गण"
                            ? GANA_COLORS[result.gana]
                            : "oklch(0.85 0.08 60)",
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nakshatra interpretation */}
          <Card
            style={{
              background: "oklch(0.16 0.04 20)",
              border: "1px solid oklch(0.28 0.06 25)",
            }}
          >
            <CardContent className="pt-4">
              <h3
                className="font-heading font-semibold mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🔮 नक्षत्र फल
              </h3>
              <div className="space-y-3">
                <div
                  className="p-3 rounded-lg"
                  style={{ background: "oklch(0.20 0.05 20)" }}
                >
                  <p
                    className="text-xs font-body"
                    style={{ color: "oklch(0.70 0.04 60)" }}
                  >
                    <strong style={{ color: "oklch(0.85 0.08 60)" }}>
                      {result.name} नक्षत्र
                    </strong>{" "}
                    में जन्में जातक
                    {result.lord} ग्रह के प्रभाव में आते हैं। इनकी राशि {result.rashi} है
                    और ये {result.gana} गण के हैं।
                    {result.nadi} नाड़ी के कारण विवाह में नाड़ी मिलान विशेष ध्यान देना
                    चाहिए।
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.2)",
                      color: "oklch(0.68 0.20 48)",
                    }}
                  >
                    शुभ रत्न: {result.luckyGem}
                  </Badge>
                  <Badge
                    style={{
                      background: "oklch(0.62 0.18 75 / 0.2)",
                      color: "oklch(0.62 0.18 75)",
                    }}
                  >
                    शुभ रंग: {result.luckyColor}
                  </Badge>
                  <Badge
                    style={{
                      background: `${GANA_COLORS[result.gana]}33`,
                      color: GANA_COLORS[result.gana],
                    }}
                  >
                    {result.gana} गण
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
