import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

const _NAKSHATRAS = [
  "अश्विनी",
  "भरणी",
  "कृत्तिका",
  "रोहिणी",
  "मृगशिरा",
  "आर्द्रा",
  "पुनर्वसु",
  "पुष्य",
  "आश्लेषा",
  "मघा",
  "पूर्व फाल्गुनी",
  "उत्तर फाल्गुनी",
  "हस्त",
  "चित्रा",
  "स्वाति",
  "विशाखा",
  "अनुराधा",
  "ज्येष्ठा",
  "मूल",
  "पूर्वाषाढ़ा",
  "उत्तराषाढ़ा",
  "श्रवण",
  "धनिष्ठा",
  "शतभिषा",
  "पूर्वभाद्रपदा",
  "उत्तरभाद्रपदा",
  "रेवती",
];

const RASHIS = [
  "मेष",
  "वृषभ",
  "मिथुन",
  "कर्क",
  "सिंह",
  "कन्या",
  "तुला",
  "वृश्चिक",
  "धनु",
  "मकर",
  "कुंभ",
  "मीन",
];

const LORDS = ["केतु", "शुक्र", "सूर्य", "चंद्र", "मंगल", "राहु", "गुरु", "शनि", "बुध"];

const YONI_ANIMALS = [
  "घोड़ा",
  "हाथी",
  "मेड़़ा",
  "सर्प",
  "कुत्ता",
  "बिल्ली",
  "चूहा",
  "गाय",
  "महिष",
  "शेर",
  "बाघ",
  "हिरन",
  "बंदर",
  "नेवला",
];

const nakIdx = (dob: Date): number => {
  const d = dob.getDate();
  const m = dob.getMonth() + 1;
  const y = dob.getFullYear() % 100;
  return (d + m + y) % 27;
};

const _getRashi = (nakIdx: number): string =>
  RASHIS[Math.floor(nakIdx / 2.25) % 12];
const getRashiIdx = (nakIdx: number): number => Math.floor(nakIdx / 2.25) % 12;

interface KootResult {
  name: string;
  maxPoints: number;
  obtainedPoints: number;
  description: string;
  status: "excellent" | "good" | "average" | "poor";
}

function calcVarna(nak: number): number {
  return nak % 4;
}
function calcVashya(nak: number): number {
  return nak % 6;
}
function calcYoni(nak: number): number {
  return nak % 14;
}
function calcGana(nak: number): number {
  return nak % 3;
}
function calcNadi(nak: number): number {
  return nak % 3;
}
function calcBhakoot(boyRashi: number, girlRashi: number): number {
  const diff = Math.abs(boyRashi - girlRashi);
  if ([1, 3, 7, 9, 11].includes(diff) || diff === 0) return 7;
  if (diff === 2) return 4;
  return 0;
}
function calcGrahaMaitri(boyNak: number, girlNak: number): number {
  const boyLord = boyNak % 9;
  const girlLord = girlNak % 9;
  const diff = Math.abs(boyLord - girlLord);
  if (diff === 0) return 5;
  if (diff <= 2) return 4;
  if (diff <= 4) return 3;
  return 1;
}
function calcTara(boyNak: number, girlNak: number): number {
  const t = ((girlNak - boyNak + 27) % 27) / 3;
  const tier = Math.floor(t) % 3;
  if (tier === 0) return 3;
  if (tier === 1) return 1.5;
  return 0;
}

function computeKoots(boyDob: Date, girlDob: Date): KootResult[] {
  const bN = nakIdx(boyDob);
  const gN = nakIdx(girlDob);
  const bR = getRashiIdx(bN);
  const gR = getRashiIdx(gN);

  const bVarna = calcVarna(bN);
  const gVarna = calcVarna(gN);
  const varnaScore = bVarna >= gVarna ? 1 : 0;

  const bVashya = calcVashya(bN);
  const gVashya = calcVashya(gN);
  const vashyaScore =
    bVashya === gVashya ? 2 : Math.abs(bVashya - gVashya) <= 1 ? 1 : 0;

  const taraScore = Math.round(calcTara(bN, gN));

  const bYoni = calcYoni(bN);
  const gYoni = calcYoni(gN);
  const yoniScore = bYoni === gYoni ? 4 : Math.abs(bYoni - gYoni) <= 2 ? 2 : 0;

  const grahaMaitriScore = calcGrahaMaitri(bN, gN);

  const bGana = calcGana(bN);
  const gGana = calcGana(gN);
  let ganaScore = 0;
  if (bGana === gGana) ganaScore = 6;
  else if ((bGana === 0 && gGana === 1) || (bGana === 1 && gGana === 0))
    ganaScore = 5;
  else if (bGana === 2 || gGana === 2) ganaScore = 1;
  else ganaScore = 3;

  const bhakootScore = calcBhakoot(bR, gR);

  const bNadi = calcNadi(bN);
  const gNadi = calcNadi(gN);
  const nadiScore = bNadi !== gNadi ? 8 : 0;

  const VARNAS = ["ब्राह्मण", "क्षत्रिय", "वैश्य", "शूद्र"];
  const GANAS = ["देव", "मानुष", "राक्षस"];
  const NADIS = ["आदि", "मध्य", "अन्त्य"];

  const getStatus = (score: number, max: number): KootResult["status"] => {
    const pct = score / max;
    if (pct >= 0.75) return "excellent";
    if (pct >= 0.5) return "good";
    if (pct >= 0.25) return "average";
    return "poor";
  };

  return [
    {
      name: "वर्ण (Varna)",
      maxPoints: 1,
      obtainedPoints: varnaScore,
      description: `वर: ${VARNAS[bVarna]}, कन्या: ${VARNAS[gVarna]}`,
      status: getStatus(varnaScore, 1),
    },
    {
      name: "वश्य (Vashya)",
      maxPoints: 2,
      obtainedPoints: vashyaScore,
      description: `सामंजस्य स्तर: ${vashyaScore}/2`,
      status: getStatus(vashyaScore, 2),
    },
    {
      name: "तारा (Tara)",
      maxPoints: 3,
      obtainedPoints: taraScore,
      description: `तारा अंतर: ${(gN - bN + 27) % 27} नक्षत्र`,
      status: getStatus(taraScore, 3),
    },
    {
      name: "योनि (Yoni)",
      maxPoints: 4,
      obtainedPoints: yoniScore,
      description: `वर: ${YONI_ANIMALS[bYoni]}, कन्या: ${YONI_ANIMALS[gYoni]}`,
      status: getStatus(yoniScore, 4),
    },
    {
      name: "ग्रह मैत्री (Graha Maitri)",
      maxPoints: 5,
      obtainedPoints: grahaMaitriScore,
      description: `वर राशीश: ${LORDS[bN % 9]}, कन्या राशीश: ${LORDS[gN % 9]}`,
      status: getStatus(grahaMaitriScore, 5),
    },
    {
      name: "गण (Gana)",
      maxPoints: 6,
      obtainedPoints: ganaScore,
      description: `वर: ${GANAS[bGana]} गण, कन्या: ${GANAS[gGana]} गण`,
      status: getStatus(ganaScore, 6),
    },
    {
      name: "भकूट (Bhakoot)",
      maxPoints: 7,
      obtainedPoints: bhakootScore,
      description: `वर राशि: ${RASHIS[bR]}, कन्या राशि: ${RASHIS[gR]}`,
      status: getStatus(bhakootScore, 7),
    },
    {
      name: "नाड़ी (Nadi)",
      maxPoints: 8,
      obtainedPoints: nadiScore,
      description:
        nadiScore === 0
          ? "⚠️ नाड़ी दोष! दोनों की नाड़ी समान है"
          : `वर: ${NADIS[bNadi]} नाड़ी, कन्या: ${NADIS[gNadi]} नाड़ी`,
      status: getStatus(nadiScore, 8),
    },
  ];
}

function getCompatibilityLevel(total: number): {
  label: string;
  color: string;
  description: string;
} {
  if (total >= 32)
    return {
      label: "उत्तम विवाह",
      color: "oklch(0.55 0.18 145)",
      description: `36 में से ${total} गुण। अत्यंत शुभ विवाह।`,
    };
  if (total >= 27)
    return {
      label: "श्रेष्ठ",
      color: "oklch(0.60 0.18 130)",
      description: `36 में से ${total} गुण। बहुत अच्छा विवाह योग।`,
    };
  if (total >= 21)
    return {
      label: "मध्यम",
      color: "oklch(0.68 0.20 48)",
      description: `36 में से ${total} गुण। सामान्य विवाह योग।`,
    };
  if (total >= 18)
    return {
      label: "सामान्य",
      color: "oklch(0.65 0.18 60)",
      description: `36 में से ${total} गुण। विचार योग्य।`,
    };
  return {
    label: "अशुभ",
    color: "oklch(0.55 0.20 20)",
    description: `36 में से ${total} गुण। विशेष उपाय आवश्यक।`,
  };
}

export default function KundaliMatching() {
  const [boyDob, setBoyDob] = useState("");
  const [girlDob, setGirlDob] = useState("");
  const [result, setResult] = useState<{
    koots: KootResult[];
    total: number;
    boyNak: number;
    girlNak: number;
  } | null>(null);

  const handleCalculate = () => {
    if (!boyDob || !girlDob) return;
    const boyDate = new Date(boyDob);
    const girlDate = new Date(girlDob);
    const koots = computeKoots(boyDate, girlDate);
    const total = koots.reduce((sum, k) => sum + k.obtainedPoints, 0);
    setResult({
      koots,
      total,
      boyNak: nakIdx(boyDate),
      girlNak: nakIdx(girlDate),
    });
  };

  const statusColors: Record<string, string> = {
    excellent: "oklch(0.55 0.18 145)",
    good: "oklch(0.60 0.18 130)",
    average: "oklch(0.68 0.20 48)",
    poor: "oklch(0.55 0.20 20)",
  };
  const statusLabels: Record<string, string> = {
    excellent: "उत्तम",
    good: "अच्छा",
    average: "मध्यम",
    poor: "कम",
  };

  // Manglik computation
  const manglikResult = result
    ? (() => {
        const bN = result.boyNak;
        const gN = result.girlNak;
        const boyManglik = bN % 5 === 0 || bN % 7 === 1;
        const girlManglik = gN % 5 === 0 || gN % 7 === 1;
        return { boyManglik, girlManglik };
      })()
    : null;

  return (
    <div className="space-y-6" data-ocid="kundali.section">
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
            💑 36 गुण मिलान — कुंडली मिलान
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                className="font-heading"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                वर (Groom) जन्म तिथि
              </Label>
              <Input
                type="date"
                value={boyDob}
                onChange={(e) => setBoyDob(e.target.value)}
                data-ocid="kundali.boy_input"
                style={{
                  background: "oklch(0.20 0.05 20)",
                  borderColor: "oklch(0.35 0.08 25)",
                  color: "oklch(0.90 0.04 60)",
                }}
              />
            </div>
            <div className="space-y-2">
              <Label
                className="font-heading"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                कन्या (Bride) जन्म तिथि
              </Label>
              <Input
                type="date"
                value={girlDob}
                onChange={(e) => setGirlDob(e.target.value)}
                data-ocid="kundali.girl_input"
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
            disabled={!boyDob || !girlDob}
            data-ocid="kundali.calculate_button"
            className="w-full font-heading font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            🔮 गुण मिलान करें
          </Button>
        </CardContent>
      </Card>

      {result &&
        (() => {
          const compat = getCompatibilityLevel(result.total);
          return (
            <div className="space-y-4" data-ocid="kundali.result">
              {/* Total Score */}
              <Card
                style={{
                  background: "oklch(0.16 0.04 20)",
                  border: `2px solid ${compat.color}`,
                }}
              >
                <CardContent className="pt-6 text-center space-y-3">
                  <div
                    className="text-6xl font-bold font-heading"
                    style={{ color: compat.color }}
                  >
                    {result.total}
                    <span className="text-2xl text-muted-foreground">/36</span>
                  </div>
                  <Badge
                    className="text-sm px-4 py-1"
                    style={{ background: compat.color, color: "white" }}
                  >
                    {compat.label}
                  </Badge>
                  <Progress value={(result.total / 36) * 100} className="h-3" />
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(0.75 0.06 60)" }}
                  >
                    {compat.description}
                  </p>
                </CardContent>
              </Card>

              {/* 8 Koot breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.koots.map((koot, i) => (
                  <Card
                    key={koot.name}
                    data-ocid={`kundali.item.${i + 1}`}
                    style={{
                      background: "oklch(0.16 0.04 20)",
                      border: "1px solid oklch(0.28 0.06 25)",
                    }}
                  >
                    <CardContent className="pt-4 pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="font-heading font-semibold text-sm"
                          style={{ color: "oklch(0.85 0.04 60)" }}
                        >
                          {koot.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-heading font-bold text-sm"
                            style={{ color: statusColors[koot.status] }}
                          >
                            {koot.obtainedPoints}/{koot.maxPoints}
                          </span>
                          <Badge
                            className="text-xs"
                            style={{
                              background: `${statusColors[koot.status]}33`,
                              color: statusColors[koot.status],
                            }}
                          >
                            {statusLabels[koot.status]}
                          </Badge>
                        </div>
                      </div>
                      <Progress
                        value={(koot.obtainedPoints / koot.maxPoints) * 100}
                        className="h-1.5 mb-2"
                      />
                      <p
                        className="text-xs font-body"
                        style={{ color: "oklch(0.60 0.04 60)" }}
                      >
                        {koot.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {result.total < 18 && (
                <Card
                  style={{
                    background: "oklch(0.14 0.06 20)",
                    border: "1px solid oklch(0.55 0.20 20 / 0.5)",
                  }}
                >
                  <CardContent className="pt-4">
                    <p
                      className="font-heading font-semibold text-sm mb-2"
                      style={{ color: "oklch(0.75 0.18 25)" }}
                    >
                      ⚠️ उपाय सुझाव
                    </p>
                    <p
                      className="font-body text-xs"
                      style={{ color: "oklch(0.70 0.04 60)" }}
                    >
                      गुण कम हैं। किसी विद्वान ज्योतिषी से परामर्श लें। मंगल दोष जाँचें।
                      महामृत्युंजय जाप और रुद्राभिषेक से दोष शांति संभव है।
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Manglik Dosha Analysis */}
              {manglikResult && (
                <Card
                  data-ocid="kundali.manglik.card"
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
                      🔥 मंगलिक दोष विश्लेषण
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        className="rounded-lg p-3 text-center"
                        style={{
                          background: "oklch(0.20 0.05 20)",
                          border: "1px solid oklch(0.30 0.06 25)",
                        }}
                      >
                        <p
                          className="font-heading text-xs mb-2"
                          style={{ color: "oklch(0.65 0.04 60)" }}
                        >
                          वर (Groom)
                        </p>
                        <Badge
                          style={{
                            background: manglikResult.boyManglik
                              ? "oklch(0.55 0.22 20)"
                              : "oklch(0.55 0.18 145)",
                            color: "white",
                          }}
                        >
                          {manglikResult.boyManglik
                            ? "🔥 मांगलिक — हाँ"
                            : "✓ मांगलिक — नहीं"}
                        </Badge>
                      </div>
                      <div
                        className="rounded-lg p-3 text-center"
                        style={{
                          background: "oklch(0.20 0.05 20)",
                          border: "1px solid oklch(0.30 0.06 25)",
                        }}
                      >
                        <p
                          className="font-heading text-xs mb-2"
                          style={{ color: "oklch(0.65 0.04 60)" }}
                        >
                          कन्या (Bride)
                        </p>
                        <Badge
                          style={{
                            background: manglikResult.girlManglik
                              ? "oklch(0.55 0.22 20)"
                              : "oklch(0.55 0.18 145)",
                            color: "white",
                          }}
                        >
                          {manglikResult.girlManglik
                            ? "🔥 मांगलिक — हाँ"
                            : "✓ मांगलिक — नहीं"}
                        </Badge>
                      </div>
                    </div>

                    {/* Manglik conclusion */}
                    {manglikResult.boyManglik && manglikResult.girlManglik ? (
                      <div
                        className="rounded-lg p-3 text-center"
                        style={{
                          background: "oklch(0.55 0.18 145 / 0.12)",
                          border: "1px solid oklch(0.55 0.18 145 / 0.4)",
                        }}
                      >
                        <p
                          className="font-heading font-semibold text-sm"
                          style={{ color: "oklch(0.55 0.18 145)" }}
                        >
                          ✓ दोनों मांगलिक हैं — दोष नष्ट होता है ✓
                        </p>
                        <p
                          className="font-body text-xs mt-1"
                          style={{ color: "oklch(0.65 0.04 60)" }}
                        >
                          जब दोनों पक्ष मांगलिक होते हैं, तो मंगल दोष परस्पर नष्ट हो जाता
                          है।
                        </p>
                      </div>
                    ) : manglikResult.boyManglik ||
                      manglikResult.girlManglik ? (
                      <div
                        className="rounded-lg p-3"
                        style={{
                          background: "oklch(0.68 0.20 48 / 0.12)",
                          border: "1px solid oklch(0.68 0.20 48 / 0.4)",
                        }}
                      >
                        <p
                          className="font-heading font-semibold text-sm mb-2"
                          style={{ color: "oklch(0.68 0.20 48)" }}
                        >
                          ⚠️ एक पक्ष मांगलिक — उपाय आवश्यक
                        </p>
                        <p
                          className="font-body text-xs"
                          style={{ color: "oklch(0.70 0.04 60)" }}
                        >
                          उपाय: कुंभ विवाह, विष्णु पूजा, मंगल यंत्र धारण, शांति पूजा, मंगल
                          शांति हवन कराएं।
                        </p>
                      </div>
                    ) : (
                      <div
                        className="rounded-lg p-3 text-center"
                        style={{
                          background: "oklch(0.55 0.18 145 / 0.12)",
                          border: "1px solid oklch(0.55 0.18 145 / 0.4)",
                        }}
                      >
                        <p
                          className="font-heading font-semibold text-sm"
                          style={{ color: "oklch(0.55 0.18 145)" }}
                        >
                          ✓ कोई मंगल दोष नहीं ✓
                        </p>
                        <p
                          className="font-body text-xs mt-1"
                          style={{ color: "oklch(0.65 0.04 60)" }}
                        >
                          दोनों पक्षों की कुंडली में मंगल दोष नहीं है। शुभ विवाह के लिए
                          अनुकूल।
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Overall Recommendation */}
              <Card
                data-ocid="kundali.recommendation.card"
                style={{
                  background: "oklch(0.14 0.06 22)",
                  border: `1px solid ${getCompatibilityLevel(result.total).color}40`,
                }}
              >
                <CardHeader>
                  <CardTitle
                    className="font-heading text-base"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    📋 समग्र विवाह अनुशंसा
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2">
                    {result.total >= 27 ? (
                      <>
                        <li
                          className="flex items-start gap-2 font-body text-sm"
                          style={{ color: "oklch(0.80 0.04 60)" }}
                        >
                          <span className="text-green-400 mt-0.5">✓</span>
                          विवाह आगे बढ़ाने की श्रेष्ठ अनुशंसा — विवाह योग अत्यंत शुभ है
                        </li>
                        <li
                          className="flex items-start gap-2 font-body text-sm"
                          style={{ color: "oklch(0.80 0.04 60)" }}
                        >
                          <span className="text-green-400 mt-0.5">✓</span>
                          आध्यात्मिक सामंजस्य उच्च — दोनों का मनस्तत्व एवं विचार समरस है
                        </li>
                        <li
                          className="flex items-start gap-2 font-body text-sm"
                          style={{ color: "oklch(0.80 0.04 60)" }}
                        >
                          <span className="text-green-400 mt-0.5">✓</span>
                          दाम्पत्य जीवन सुखमय — संतान, समृद्धि और परस्पर सहयोग का मजबूत
                          योग
                        </li>
                      </>
                    ) : result.total >= 18 ? (
                      <>
                        <li
                          className="flex items-start gap-2 font-body text-sm"
                          style={{ color: "oklch(0.80 0.04 60)" }}
                        >
                          <span
                            style={{ color: "oklch(0.68 0.20 48)" }}
                            className="mt-0.5"
                          >
                            ○
                          </span>
                          मध्यम सामंजस्य — कमज़ोर कूटों के लिए विशेष उपाय कराएं
                        </li>
                        <li
                          className="flex items-start gap-2 font-body text-sm"
                          style={{ color: "oklch(0.80 0.04 60)" }}
                        >
                          <span
                            style={{ color: "oklch(0.68 0.20 48)" }}
                            className="mt-0.5"
                          >
                            ○
                          </span>
                          नाड़ी और भकूट दोष हो तो विशेष पूजा एवं हवन आवश्यक
                        </li>
                        <li
                          className="flex items-start gap-2 font-body text-sm"
                          style={{ color: "oklch(0.80 0.04 60)" }}
                        >
                          <span
                            style={{ color: "oklch(0.68 0.20 48)" }}
                            className="mt-0.5"
                          >
                            ○
                          </span>
                          विवाह से पहले विशेषज्ञ ज्योतिषी से विस्तृत विश्लेषण अनुशंसित
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          className="flex items-start gap-2 font-body text-sm"
                          style={{ color: "oklch(0.80 0.04 60)" }}
                        >
                          <span
                            style={{ color: "oklch(0.55 0.22 20)" }}
                            className="mt-0.5"
                          >
                            ⚠
                          </span>
                          गुण कम हने से विशेष परीक्षा आवश्यक — किसी विद्वान ज्योतिषी से
                          विस्तृत परामर्श लें
                        </li>
                        <li
                          className="flex items-start gap-2 font-body text-sm"
                          style={{ color: "oklch(0.80 0.04 60)" }}
                        >
                          <span
                            style={{ color: "oklch(0.55 0.22 20)" }}
                            className="mt-0.5"
                          >
                            ⚠
                          </span>
                          नाड़ी, भकूट और गण दोष जाँचें — शांति पूजा कराएं
                        </li>
                        <li
                          className="flex items-start gap-2 font-body text-sm"
                          style={{ color: "oklch(0.80 0.04 60)" }}
                        >
                          <span
                            style={{ color: "oklch(0.55 0.22 20)" }}
                            className="mt-0.5"
                          >
                            ⚠
                          </span>
                          इस समय विवाह से बचना उचित — विशेषज्ञ मार्गदर्शन अनिवार्य है
                        </li>
                      </>
                    )}
                  </ul>
                  <Button
                    data-ocid="kundali.consult.button"
                    className="w-full font-heading font-semibold mt-2"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                  >
                    🔮 विस्तृत ज्योतिषीय परामर्श के लिए हमारे Astrologers से मिलें
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })()}
    </div>
  );
}
