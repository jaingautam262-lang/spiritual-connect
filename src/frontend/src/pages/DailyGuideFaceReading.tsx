import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const FACE_FEATURES = [
  {
    id: "forehead",
    name: "Forehead Shape",
    nameHi: "माथे का आकार",
    emoji: "👤",
    options: [
      {
        label: "Broad / Wide",
        labelHi: "चौड़ा",
        meaning:
          "Wisdom, intelligence, and leadership potential. Open-minded thinker with strong analytical skills.",
      },
      {
        label: "Narrow",
        labelHi: "संकरा",
        meaning:
          "Focused and specialized thinking. Excellent concentration but may need to broaden perspectives.",
      },
      {
        label: "High",
        labelHi: "उँचा",
        meaning:
          "Deep thinker, philosophical mind, and strong intellectual curiosity. Natural scholar.",
      },
      {
        label: "Low/Receding",
        labelHi: "नीचा",
        meaning:
          "Action-oriented. Practical doer who prefers experience over theory.",
      },
    ],
  },
  {
    id: "eyebrows",
    name: "Eyebrow Type",
    nameHi: "भौंह का प्रकार",
    emoji: "🤨",
    options: [
      {
        label: "Thick & Full",
        labelHi: "घनी और भरी",
        meaning:
          "Strong will, decisiveness, and physical vitality. Natural authority and leadership.",
      },
      {
        label: "Thin & Arched",
        labelHi: "पतली और वक्र",
        meaning:
          "Refined aesthetic sense, creativity, and sensitivity. Attuned to beauty and elegance.",
      },
      {
        label: "Straight",
        labelHi: "सीधी",
        meaning:
          "Direct, honest, and straightforward. Values clarity and dislikes ambiguity.",
      },
      {
        label: "Unibrow / Meeting",
        labelHi: "जुड़ी हुई",
        meaning:
          "Intense focus, passion, and determination. Not easily distracted from goals.",
      },
    ],
  },
  {
    id: "nose",
    name: "Nose Shape",
    nameHi: "नाक का आकार",
    emoji: "👃",
    options: [
      {
        label: "Straight / Roman",
        labelHi: "सीधी / रोमन",
        meaning:
          "Confidence, ambition, and strength. Natural leader with strong sense of self.",
      },
      {
        label: "Button / Small",
        labelHi: "छोटी / गोल",
        meaning:
          "Playful, creative, and imaginative. Youthful spirit with a love for fun.",
      },
      {
        label: "Wide Nostrils",
        labelHi: "चौड़े नथुने",
        meaning:
          "Energetic, passionate, and adventurous. High vitality and enthusiasm for life.",
      },
      {
        label: "Narrow / Pointed",
        labelHi: "संकरी / नुकीली",
        meaning:
          "Meticulous, detail-oriented, and perfectionist. High standards in all areas of life.",
      },
    ],
  },
  {
    id: "lips",
    name: "Lip Shape",
    nameHi: "होंठ का आकार",
    emoji: "👄",
    options: [
      {
        label: "Full & Plump",
        labelHi: "पूर्ण और मोटे",
        meaning:
          "Sensual, generous, and warm-hearted. Natural giver who enjoys physical pleasures.",
      },
      {
        label: "Thin",
        labelHi: "पतले",
        meaning:
          "Precise, controlled, and disciplined. Chooses words carefully, excellent communicator.",
      },
      {
        label: "Bow-shaped",
        labelHi: "धनुषाकार",
        meaning:
          "Artistic, expressive, and creative. Strong desire to communicate and connect with others.",
      },
      {
        label: "Wide",
        labelHi: "चौडे",
        meaning:
          "Sociable, expressive, and magnetic. Natural performer who loves social situations.",
      },
    ],
  },
];

export default function DailyGuideFaceReading() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  function buildProfile(): string {
    const parts: string[] = [];
    for (const feature of FACE_FEATURES) {
      const optionLabel = selected[feature.id];
      if (optionLabel) {
        const opt = feature.options.find((o) => o.label === optionLabel);
        if (opt) parts.push(opt.meaning);
      }
    }
    return parts.join(" ");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="spiritual-gradient py-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            data-ocid="face_reading.back_button"
            onClick={() => void navigate({ to: "/daily-guide" })}
            className="flex items-center gap-2 text-sm mb-4 mx-auto hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.85 0.02 80)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "hi" ? "वापस" : "Back"}
          </button>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold"
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {language === "hi" ? "मुखाकृति विज्ञान" : "Face Reading"}
          </h1>
          <p className="text-sm mt-2" style={{ color: "oklch(0.85 0.02 80)" }}>
            {language === "hi"
              ? "अपनी चेहरे की विशेषताएं चुनें"
              : "Select your facial features to get your reading"}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="space-y-8">
          {FACE_FEATURES.map((feature, fi) => (
            <div
              key={feature.id}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3
                className="font-heading font-bold text-lg mb-4 flex items-center gap-2"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                <span>{feature.emoji}</span>
                {language === "hi" ? feature.nameHi : feature.name}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {feature.options.map((opt, oi) => (
                  <button
                    type="button"
                    key={opt.label}
                    data-ocid={`face_reading.feature_${fi + 1}.option_${oi + 1}`}
                    onClick={() => {
                      setSelected((s) => ({ ...s, [feature.id]: opt.label }));
                      setShowResult(false);
                    }}
                    className={`p-3 rounded-lg border text-left text-sm transition-all ${
                      selected[feature.id] === opt.label
                        ? "border-primary bg-primary/10 font-medium"
                        : "border-border bg-background hover:border-primary/40"
                    }`}
                  >
                    {language === "hi" ? opt.labelHi : opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {Object.keys(selected).length > 0 && (
          <div className="text-center mt-8">
            <Button
              data-ocid="face_reading.get_reading_button"
              className="btn-spiritual px-8"
              onClick={() => setShowResult(true)}
            >
              {language === "hi" ? "मुखाकृति विश्लेषण देखें" : "Get My Reading"}
            </Button>
          </div>
        )}

        {showResult && (
          <div
            data-ocid="face_reading.result_card"
            className="mt-8 bg-card border border-border rounded-2xl p-8"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
          >
            <h3
              className="font-heading font-bold text-xl mb-4"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {language === "hi"
                ? "आपका व्यक्तित्व विश्लेषण"
                : "Your Personality Profile"}
            </h3>
            <p className="text-sm leading-relaxed">{buildProfile()}</p>
            {buildProfile().length === 0 && (
              <p className="text-sm text-muted-foreground">
                {language === "hi"
                  ? "कृपया अधिक विशेषताएं चुनें"
                  : "Please select more features above"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
