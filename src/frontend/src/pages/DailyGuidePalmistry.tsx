import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const LINES = [
  {
    id: "life",
    name: "Life Line",
    nameHi: "जीवन रेखा",
    location:
      "Curves around the thumb from between the index finger and thumb to the wrist.",
    meaning:
      "Represents vitality, major life changes, and overall life path. A long, deep life line indicates good health and resilience. A short or faint line doesn't mean a short life — it indicates a need for caution and self-care.",
    emoji: "❤️",
  },
  {
    id: "head",
    name: "Head Line",
    nameHi: "मस्तिष्क रेखा",
    location:
      "Runs horizontally across the middle of the palm, starting from the index finger side.",
    meaning:
      "Represents intelligence, communication style, and thirst for knowledge. A long, clear head line indicates analytical thinking. A curved line suggests creativity and intuition, while a straight line points to logical, systematic thinking.",
    emoji: "🧠",
  },
  {
    id: "heart",
    name: "Heart Line",
    nameHi: "हृदय रेखा",
    location: "Located at the top of the palm, below the fingers.",
    meaning:
      "Represents emotional life, relationships, and matters of the heart. A long, deep heart line suggests strong emotions and lasting relationships. A short line may indicate a more practical approach to love. Chains or breaks in the heart line can indicate emotional upheavals or heartbreaks.",
    emoji: "💛",
  },
  {
    id: "fate",
    name: "Fate Line",
    nameHi: "भाग्य रेखा",
    location:
      "Runs vertically through the center of the palm, from the base toward the middle finger.",
    meaning:
      "Represents career path, life purpose, and how much fate influences your life. A strong, unbroken fate line suggests a clear sense of purpose. Breaks indicate career changes. Not everyone has a visible fate line — this simply means you create your own destiny through free will.",
    emoji: "⭐",
  },
  {
    id: "sun",
    name: "Sun Line",
    nameHi: "सूर्य रेखा",
    location:
      "Runs vertically below the ring finger, parallel to the fate line.",
    meaning:
      "Represents fame, success, artistic talent, and public recognition. A prominent Sun line suggests charisma and potential for achievement. This line amplifies whatever the fate line shows — a person with both lines has tremendous potential for success and recognition in their field.",
    emoji: "☀️",
  },
];

const PALM_ASCII = `
   \u25b3 Index  Middle  Ring  Little
   |  \u2554\u2550\u2550\u2550\u2557 \u2554\u2550\u2550\u2550\u2557 \u2554\u2550\u2550\u2550\u2557 \u2554\u2550\u2550\u2557
   |  \u2551   \u2551 \u2551   \u2551 \u2551   \u2551 \u2551  \u2551
   |  \u255a\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u255d
   |  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
   |  \u2502  Heart Line  \u25c0\u2502
   |  \u2502 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2502
  Thumb \u2502 Head Line \u25c0 \u2502
   \u2502   \u2502 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2502
   \u2502   \u2502  Fate Line \u2191  \u2502
   \u255a\u2550\u2550\u2557 \u2502  Sun Line \u2191  \u2502
       \u2502             \u2502
       \u2502 Life Line \u25cc  \u2502
       \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518
`;

export default function DailyGuidePalmistry() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  const selected = LINES.find((l) => l.id === selectedLine);

  return (
    <div className="min-h-screen bg-background">
      <div className="spiritual-gradient py-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            data-ocid="palmistry.back_button"
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
            {language === "hi" ? "हस्तरेखा मार्गदर्शिका" : "Palm Reading Guide"}
          </h1>
          <p className="text-sm mt-2" style={{ color: "oklch(0.85 0.02 80)" }}>
            {language === "hi"
              ? "अपने हाथ की मुख्य रेखाओं का अर्थ"
              : "Understand the 5 major lines of your palm"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Palm diagram */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-heading font-bold text-sm mb-3 text-center text-muted-foreground uppercase tracking-wider">
                {language === "hi" ? "हाथ का नक्शा" : "Hand Diagram"}
              </h3>
              <pre className="text-xs text-muted-foreground leading-relaxed overflow-x-auto">
                {PALM_ASCII}
              </pre>
            </div>
            <div className="mt-4 space-y-2">
              {LINES.map((line, i) => (
                <button
                  type="button"
                  key={line.id}
                  data-ocid={`palmistry.line.${i + 1}`}
                  onClick={() => setSelectedLine(line.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                    selectedLine === line.id
                      ? "border-primary bg-primary/10"
                      : "bg-card border-border hover:border-primary/40"
                  }`}
                >
                  <span className="text-xl">{line.emoji}</span>
                  <span className="text-sm font-medium">
                    {language === "hi" ? line.nameHi : line.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="flex-1 min-w-0">
            {selected ? (
              <div
                data-ocid="palmistry.detail_card"
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="text-5xl mb-4">{selected.emoji}</div>
                <h2
                  className="font-heading font-bold text-xl mb-1"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {language === "hi" ? selected.nameHi : selected.name}
                </h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      {language === "hi" ? "स्थान" : "Location"}
                    </p>
                    <p className="text-sm">{selected.location}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      {language === "hi" ? "अर्थ" : "Meaning"}
                    </p>
                    <p className="text-sm leading-relaxed">
                      {selected.meaning}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                data-ocid="palmistry.empty_state"
                className="h-full flex items-center justify-center text-center p-10"
              >
                <div>
                  <div className="text-6xl mb-4">✋</div>
                  <p className="text-muted-foreground">
                    {language === "hi"
                      ? "एक रेखा चुनें जानकारी पाने के लिए"
                      : "Select a line to see its meaning"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
