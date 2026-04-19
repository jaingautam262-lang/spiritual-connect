import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// AstroScoreTab.tsx — AstroScore with animated ring + life area bars
import React, { useEffect, useRef, useState } from "react";
import { SpeakerButton } from "../../hooks/useSpeaker";
import type { AvkahadaData } from "../../utils/vedicAstrology";

interface Props {
  score: number;
  avkahada: AvkahadaData | null;
  language: string;
}

const LIFE_AREAS = [
  {
    key: "health",
    en: "Health & Vitality",
    hi: "स्वास्थ्य और ऊर्जा",
    weight: 0.2,
    desc: {
      en: "Physical vitality based on Lagna and Sun placement.",
      hi: "लग्न और सूर्य स्थिति से शारीरिक जीवन शक्ति।",
    },
  },
  {
    key: "career",
    en: "Career & Success",
    hi: "करियर और सफलता",
    weight: 0.22,
    desc: {
      en: "Professional growth from 10th house and Saturn.",
      hi: "दशम भाव और शनि से व्यावसायिक विकास।",
    },
  },
  {
    key: "wealth",
    en: "Wealth & Finance",
    hi: "धन और वित्त",
    weight: 0.2,
    desc: {
      en: "Material prosperity from 2nd and 11th house analysis.",
      hi: "द्वितीय और एकादश भाव से भौतिक समृद्धि।",
    },
  },
  {
    key: "love",
    en: "Love & Relationships",
    hi: "प्रेम और रिश्ते",
    weight: 0.18,
    desc: {
      en: "Partnership quality from Venus and 7th house.",
      hi: "शुक्र और सप्तम भाव से साझेदारी की गुणवत्ता।",
    },
  },
  {
    key: "spiritual",
    en: "Spiritual Growth",
    hi: "आध्यात्मिक विकास",
    weight: 0.2,
    desc: {
      en: "Soul progress from 9th and 12th house, Ketu.",
      hi: "नवम और द्वादश भाव और केतु से आत्मिक प्रगति।",
    },
  },
];

const REMEDIES = [
  "Recite Aditya Hridayam every Sunday at sunrise for health and vitality.",
  "Offer water to the Sun (Arghya) at dawn to strengthen your Lagna lord.",
  "Chant the Mahamrityunjaya Mantra 108 times on Mondays for protection and longevity.",
];

function ScoreRing({ score }: { score: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let frame = 0;
    const total = 60;
    const interval = setInterval(() => {
      frame++;
      setDisplayScore(Math.round((score * frame) / total));
      if (frame >= total) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [score]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = 180;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 70;
    const lineWidth = 14;

    ctx.clearRect(0, 0, size, size);

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(212,175,55,0.15)";
    ctx.lineWidth = lineWidth;
    ctx.stroke();

    // Score arc
    const endAngle = -Math.PI / 2 + (2 * Math.PI * displayScore) / 100;
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    if (displayScore >= 71) {
      gradient.addColorStop(0, "#22c55e");
      gradient.addColorStop(1, "#16a34a");
    } else if (displayScore >= 41) {
      gradient.addColorStop(0, "#D4AF37");
      gradient.addColorStop(1, "#FF9933");
    } else {
      gradient.addColorStop(0, "#ef4444");
      gradient.addColorStop(1, "#f97316");
    }

    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI / 2, endAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();
  }, [displayScore]);

  const color = score >= 71 ? "#22c55e" : score >= 41 ? "#D4AF37" : "#ef4444";

  return (
    <div className="relative inline-flex items-center justify-center">
      <canvas ref={canvasRef} />
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {displayScore}
        </span>
        <span className="text-xs text-muted-foreground">/100</span>
      </div>
    </div>
  );
}

export default function AstroScoreTab({ score, avkahada, language }: Props) {
  const strongest = LIFE_AREAS.reduce((prev, cur) =>
    Math.round(score * cur.weight * (100 / 20)) >
    Math.round(score * prev.weight * (100 / 20))
      ? cur
      : prev,
  );
  const speakerText = `Your AstroScore is ${score} out of 100. Your strongest area is ${strongest.en}. Your Paya is ${avkahada?.paya ?? "unknown"} and Gana is ${avkahada?.gana ?? "unknown"}.`;

  return (
    <div className="space-y-6">
      {/* Score ring */}
      <Card className="border-2" style={{ borderColor: "#D4AF37" }}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-bold" style={{ color: "#FF9933" }}>
            AstroScore — ज्योतिष स्कोर
          </CardTitle>
          <SpeakerButton text={speakerText} size="sm" />
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <ScoreRing score={score} />
          <div className="text-center">
            <p className="text-sm font-semibold text-muted-foreground">
              {score >= 71
                ? "Excellent — उत्तम"
                : score >= 41
                  ? "Good — अच्छा"
                  : "Needs Attention — ध्यान दें"}
            </p>
            {avkahada && (
              <p className="text-xs text-muted-foreground mt-1">
                Paya: <span style={{ color: "#D4AF37" }}>{avkahada.paya}</span>{" "}
                · Gana:{" "}
                <span style={{ color: "#FF9933" }}>{avkahada.gana}</span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Life area sub-scores */}
      <Card className="border-2" style={{ borderColor: "#D4AF37" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold" style={{ color: "#FF9933" }}>
            Life Area Scores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {LIFE_AREAS.map((area) => {
            const areaScore = Math.min(
              100,
              Math.round(score * area.weight * 5),
            );
            const barColor =
              areaScore >= 71
                ? "#22c55e"
                : areaScore >= 41
                  ? "#D4AF37"
                  : "#ef4444";
            return (
              <div key={area.key} data-ocid={`astroscore.${area.key}.bar`}>
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "#FF9933" }}
                  >
                    {language === "hi" ? area.hi : area.en}
                  </span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: barColor }}
                  >
                    {areaScore}
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${areaScore}%`, background: barColor }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {language === "hi" ? area.desc.hi : area.desc.en}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Remedies */}
      <Card className="border-2" style={{ borderColor: "#D4AF37" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold" style={{ color: "#FF9933" }}>
            Remedies — उपाय
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {REMEDIES.map((remedy, remedyIdx) => (
              <li key={remedy.slice(0, 20)} className="flex gap-3 items-start">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#D4AF37", color: "#1a0a00" }}
                >
                  {remedyIdx + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed">
                  {remedy}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
