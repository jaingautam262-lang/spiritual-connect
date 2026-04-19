import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  CATEGORY_META,
  type PalmistryCategory,
  type PalmistryEntry,
  SEED_PALMISTRY,
} from "../data/palmistryData";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryFilter = "All" | PalmistryCategory;

// ─── Interactive SVG Palm Diagram ─────────────────────────────────────────────

const PALM_LINES = [
  {
    id: "heart",
    labelEn: "Heart Line",
    labelHi: "हृदय रेखा",
    color: "oklch(0.72 0.18 15)",
    // curved horizontal line near top
    d: "M 70 95 Q 110 88 150 92 Q 185 96 210 105",
    highlightD: "M 70 95 Q 110 88 150 92 Q 185 96 210 105",
  },
  {
    id: "head",
    labelEn: "Head Line",
    labelHi: "मस्तिष्क रेखा",
    color: "oklch(0.78 0.14 75)",
    d: "M 75 135 Q 130 130 175 138 Q 200 142 215 150",
    highlightD: "M 75 135 Q 130 130 175 138 Q 200 142 215 150",
  },
  {
    id: "life",
    labelEn: "Life Line",
    labelHi: "जीवन रेखा",
    color: "oklch(0.68 0.20 48)",
    d: "M 100 75 Q 80 120 75 165 Q 72 200 80 240",
    highlightD: "M 100 75 Q 80 120 75 165 Q 72 200 80 240",
  },
  {
    id: "fate",
    labelEn: "Fate Line",
    labelHi: "भाग्य रेखा",
    color: "oklch(0.65 0.15 200)",
    d: "M 145 260 L 148 190 L 150 130 L 148 90",
    highlightD: "M 145 260 L 148 190 L 150 130 L 148 90",
  },
  {
    id: "health",
    labelEn: "Health Line",
    labelHi: "स्वास्थ्य रेखा",
    color: "oklch(0.72 0.16 175)",
    d: "M 200 200 Q 185 170 172 145 Q 160 120 152 95",
    highlightD: "M 200 200 Q 185 170 172 145 Q 160 120 152 95",
  },
];

function PalmDiagram({ language }: { language: "hi" | "en" }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 290 300"
        className="w-full max-w-[280px]"
        style={{ filter: "drop-shadow(0 4px 24px oklch(0.78 0.14 75 / 0.15))" }}
        role="img"
        aria-label="Palm diagram with major lines highlighted"
      >
        {/* Palm silhouette */}
        <path
          d="M 85 260 Q 70 280 80 295 Q 100 305 120 290 Q 130 275 130 260
             L 130 120 Q 130 80 145 65 Q 155 55 165 65 L 165 120
             L 167 80 Q 167 55 180 50 Q 195 50 195 80 L 195 120
             L 196 90 Q 197 65 210 65 Q 222 65 220 90 L 218 120
             L 218 100 Q 220 80 230 80 Q 240 82 237 110 L 230 145
             Q 235 165 232 200 Q 228 240 215 260 L 215 260
             Q 195 285 170 290 Q 145 290 130 285 Q 110 285 85 260 Z"
          fill="oklch(0.22 0.08 28)"
          stroke="oklch(0.78 0.14 75 / 0.3)"
          strokeWidth="1.5"
        />
        {/* Thumb silhouette */}
        <path
          d="M 85 260 Q 70 230 65 200 Q 60 170 68 145 Q 72 120 85 115 Q 95 110 100 125 L 100 200"
          fill="oklch(0.22 0.08 28)"
          stroke="oklch(0.78 0.14 75 / 0.3)"
          strokeWidth="1.5"
        />

        {/* Palm lines */}
        {PALM_LINES.map((line) => (
          <g key={line.id}>
            {/* Glow layer when hovered */}
            {hovered === line.id && (
              <path
                d={line.d}
                stroke={line.color}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                opacity="0.3"
              />
            )}
            <path
              d={line.d}
              stroke={hovered === line.id ? line.color : `${line.color}`}
              strokeWidth={hovered === line.id ? "3" : "1.8"}
              fill="none"
              strokeLinecap="round"
              style={{
                cursor: "pointer",
                transition: "stroke-width 0.2s, opacity 0.2s",
                opacity: hovered && hovered !== line.id ? 0.35 : 1,
              }}
              onMouseEnter={() => setHovered(line.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={line.labelEn}
            />
          </g>
        ))}

        {/* Hover label */}
        {hovered &&
          (() => {
            const line = PALM_LINES.find((l) => l.id === hovered);
            if (!line) return null;
            return (
              <g>
                <rect
                  x="50"
                  y="8"
                  width="190"
                  height="28"
                  rx="6"
                  fill="oklch(0.14 0.06 22 / 0.95)"
                  stroke={line.color}
                  strokeWidth="1"
                />
                <text
                  x="145"
                  y="27"
                  textAnchor="middle"
                  fontSize="11"
                  fill={line.color}
                  fontFamily="sans-serif"
                  fontWeight="600"
                >
                  {language === "hi" ? line.labelHi : line.labelEn}
                </text>
              </g>
            );
          })()}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 justify-center">
        {PALM_LINES.map((line) => (
          <button
            type="button"
            key={line.id}
            onMouseEnter={() => setHovered(line.id)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading transition-all duration-150"
            style={{
              border: `1px solid ${line.color}50`,
              background:
                hovered === line.id
                  ? `${line.color}20`
                  : "oklch(0.18 0.07 22 / 0.8)",
              color: line.color,
              scale: hovered === line.id ? "1.05" : "1",
            }}
            data-ocid={`palmistry.diagram.${line.id}`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: line.color }}
            />
            {language === "hi" ? line.labelHi : line.labelEn}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

function PalmistryCard({
  entry,
  index,
  lang,
  onClick,
}: {
  entry: PalmistryEntry;
  index: number;
  lang: "hi" | "en";
  onClick: () => void;
}) {
  const meta = CATEGORY_META[entry.category];
  return (
    <button
      type="button"
      data-ocid={`palmistry.item.${index + 1}`}
      onClick={onClick}
      className="text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.02] group cursor-pointer w-full"
      style={{
        background: "oklch(0.20 0.07 24)",
        borderColor: "oklch(0.78 0.14 75 / 0.15)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = meta.border;
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 20px ${meta.bg}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.78 0.14 75 / 0.15)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl leading-none">{entry.icon}</span>
        <span
          className="text-xs font-heading font-semibold px-2 py-0.5 rounded-full border"
          style={{
            background: meta.bg,
            color: meta.color,
            borderColor: meta.border,
          }}
        >
          {lang === "hi" ? meta.labelHi : meta.labelEn}
        </span>
      </div>

      {/* Titles */}
      <h3
        className="font-heading font-bold text-base mb-1 group-hover:underline"
        style={{ color: "oklch(0.88 0.06 75)" }}
      >
        {lang === "hi" ? entry.titleHi : entry.titleEn}
      </h3>
      <p
        className="font-body text-sm mb-3"
        style={{ color: "oklch(0.68 0.06 60)" }}
      >
        {lang === "hi" ? entry.titleEn : entry.titleHi}
      </p>

      {/* Short description */}
      <p
        className="font-body text-xs leading-relaxed line-clamp-2"
        style={{ color: "oklch(0.62 0.04 55)" }}
      >
        {lang === "hi" ? entry.shortDescHi : entry.shortDescEn}
      </p>
    </button>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({
  entry,
  onClose,
}: {
  entry: PalmistryEntry;
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const meta = CATEGORY_META[entry.category];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg max-h-[90vh] overflow-y-auto border"
        style={{
          background: "oklch(0.16 0.07 22)",
          borderColor: meta.border,
        }}
        data-ocid="palmistry.dialog"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">{entry.icon}</span>
            <div className="flex-1 min-w-0">
              <DialogTitle
                className="font-heading text-lg leading-tight"
                style={{ color: "oklch(0.88 0.08 70)" }}
              >
                {language === "hi" ? entry.titleHi : entry.titleEn}
              </DialogTitle>
              <p
                className="text-sm font-body mt-0.5"
                style={{ color: "oklch(0.65 0.06 55)" }}
              >
                {language === "hi" ? entry.titleEn : entry.titleHi}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 rounded-full p-1 transition-colors"
              style={{ color: "oklch(0.60 0.05 55)" }}
              data-ocid="palmistry.close_button"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Category badge */}
          <span
            className="inline-block text-xs font-heading px-3 py-0.5 rounded-full border w-fit"
            style={{
              background: meta.bg,
              color: meta.color,
              borderColor: meta.border,
            }}
          >
            {language === "hi" ? meta.labelHi : meta.labelEn}
          </span>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Description */}
          <div>
            <h4
              className="text-xs font-heading uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.60 0.06 55)" }}
            >
              {language === "hi" ? "विवरण" : "Description"}
            </h4>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.82 0.04 65)" }}
            >
              {language === "hi" ? entry.descriptionHi : entry.descriptionEn}
            </p>
          </div>

          {/* Characteristics */}
          {(entry.characteristicsEn || entry.characteristicsHi) && (
            <div>
              <h4
                className="text-xs font-heading uppercase tracking-wider mb-2"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                {language === "hi" ? "विशेषताएं" : "Characteristics"}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(language === "hi"
                  ? entry.characteristicsHi
                  : entry.characteristicsEn
                )
                  ?.split(" · ")
                  .map((trait) => (
                    <span
                      key={trait}
                      className="text-xs font-body px-2.5 py-0.5 rounded-full border"
                      style={{
                        background: meta.bg,
                        color: meta.color,
                        borderColor: meta.border,
                      }}
                    >
                      {trait}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Location on palm */}
          {entry.locationOnPalm && (
            <div>
              <h4
                className="text-xs font-heading uppercase tracking-wider mb-1"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                {language === "hi" ? "हाथ में स्थान" : "Location on Palm"}
              </h4>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.72 0.05 60)" }}
              >
                {entry.locationOnPalm}
              </p>
            </div>
          )}

          {/* Benefits */}
          {(entry.benefitsEn || entry.benefitsHi) && (
            <div
              className="rounded-lg p-4 border"
              style={{
                background: "oklch(0.14 0.05 22 / 0.6)",
                borderColor: meta.border,
              }}
            >
              <h4
                className="text-xs font-heading uppercase tracking-wider mb-1"
                style={{ color: meta.color }}
              >
                {language === "hi"
                  ? "✨ लाभ और महत्व"
                  : "✨ Benefits & Significance"}
              </h4>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.78 0.04 65)" }}
              >
                {language === "hi" ? entry.benefitsHi : entry.benefitsEn}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="font-heading text-xs"
            style={{
              borderColor: meta.border,
              color: meta.color,
            }}
            data-ocid="palmistry.cancel_button"
          >
            {language === "hi" ? "बंद करें" : "Close"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Intro Cards ──────────────────────────────────────────────────────────────

const INTRO_CARDS = [
  {
    icon: "🤲",
    titleEn: "What is Palmistry?",
    titleHi: "हस्तरेखा क्या है?",
    descEn:
      "The practice of reading one's palm to reveal information about life, health, career, and relationships. Known as Chiromancy, its roots lie in India, China, and ancient Israel.",
    descHi:
      "हाथ की रेखाओं को पढ़कर जीवन, स्वास्थ्य, करियर और संबंधों के बारे में जानकारी प्राप्त करने की विद्या। चिरोमेंसी के नाम से भी जाना जाता है।",
  },
  {
    icon: "🖐️",
    titleEn: "Which Hand to Read?",
    titleHi: "कौन सा हाथ देखें?",
    descEn:
      "The dominant hand reveals your active karma and present life path. The passive hand shows inherited traits and the soul's innate gifts. Together they paint the complete picture.",
    descHi:
      "प्रमुख हाथ आपके सक्रिय कर्म और वर्तमान जीवन पथ को दर्शाता है। निष्क्रिय हाथ विरासत में मिले गुणों को। दोनों मिलकर संपूर्ण चित्र बनाते हैं।",
  },
  {
    icon: "📿",
    titleEn: "Vedic Palmistry",
    titleHi: "वैदिक हस्त शास्त्र",
    descEn:
      "Hasta Samudrika Shastra — an integral part of Vedic Astrology. Planetary mounts on the palm connect each region to cosmic energies. Reading both together gives deep life insight.",
    descHi:
      "हस्त सामुद्रिक शास्त्र — वैदिक ज्योतिष का अविभाज्य अंग। हथेली पर ग्रहीय पर्वत प्रत्येक क्षेत्र को ब्रह्मांडीय ऊर्जाओं से जोड़ते हैं।",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PalmistryReading() {
  const { language } = useLanguage();
  const lang = language as "hi" | "en";

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [selected, setSelected] = useState<PalmistryEntry | null>(null);

  const filtered = useMemo(() => {
    return SEED_PALMISTRY.filter((entry) => {
      const matchesCat =
        categoryFilter === "All" || entry.category === categoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        entry.titleEn.toLowerCase().includes(q) ||
        entry.titleHi.toLowerCase().includes(q) ||
        entry.shortDescEn.toLowerCase().includes(q) ||
        entry.shortDescHi.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const categories: {
    value: CategoryFilter;
    labelEn: string;
    labelHi: string;
  }[] = [
    { value: "All", labelEn: "All", labelHi: "सभी" },
    { value: "palm_type", labelEn: "Palm Types", labelHi: "हाथ के प्रकार" },
    { value: "major_line", labelEn: "Major Lines", labelHi: "प्रमुख रेखाएं" },
    { value: "minor_line", labelEn: "Minor Lines", labelHi: "गौण रेखाएं" },
    {
      value: "characteristics",
      labelEn: "Characteristics",
      labelHi: "विशेषताएं",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.09 28) 0%, oklch(0.26 0.11 42) 50%, oklch(0.20 0.09 28) 100%)",
        }}
        data-ocid="palmistry.hero"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, oklch(0.78 0.14 75) 0%, transparent 55%), radial-gradient(circle at 75% 50%, oklch(0.68 0.20 48) 0%, transparent 55%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-6xl mb-4">🖐️</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {lang === "hi" ? "हस्तरेखा शास्त्र" : "Palmistry Guide"}
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)" }}
          >
            {lang === "hi" ? "Hasta Samudrika Shastra" : "हस्त सामुद्रिक शास्त्र"}
          </p>
          <p
            className="font-body text-sm mt-3 max-w-lg mx-auto leading-relaxed"
            style={{ color: "oklch(0.68 0.06 60)" }}
          >
            {lang === "hi"
              ? "हाथ की रेखाओं, पर्वतों और उंगलियों में छिपे जीवन के रहस्यों को जानें — वैदिक ज्योतिष की प्राचीन विद्या के साथ"
              : "Discover the ancient Vedic science of reading palms — palm lines, mounts, and finger characteristics that reveal life's secrets"}
          </p>
          {/* Divider */}
          <div className="flex items-center gap-3 mt-5 justify-center">
            <div
              className="h-px w-16"
              style={{ background: "oklch(0.78 0.14 75 / 0.4)" }}
            />
            <span style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}>ॐ</span>
            <div
              className="h-px w-16"
              style={{ background: "oklch(0.78 0.14 75 / 0.4)" }}
            />
          </div>
          <p
            className="mt-3 text-sm font-heading"
            style={{ color: "oklch(0.62 0.06 58)" }}
          >
            {filtered.length} {lang === "hi" ? "प्रविष्टियां" : "entries"}
          </p>
        </div>
      </section>

      {/* ── Intro Cards ─────────────────────────────────────────────────────── */}
      <section className="py-8 px-4" data-ocid="palmistry.intro_section">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INTRO_CARDS.map((card) => (
            <div
              key={card.titleEn}
              className="rounded-xl p-5 border"
              style={{
                background: "oklch(0.18 0.07 24)",
                borderColor: "oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3
                className="font-heading font-semibold text-base mb-1"
                style={{ color: "oklch(0.88 0.08 70)" }}
              >
                {lang === "hi" ? card.titleHi : card.titleEn}
              </h3>
              <p
                className="text-xs font-body leading-relaxed"
                style={{ color: "oklch(0.65 0.04 55)" }}
              >
                {lang === "hi" ? card.descHi : card.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interactive Palm Diagram ─────────────────────────────────────────── */}
      <section
        className="py-8 px-4 border-y"
        style={{ borderColor: "oklch(0.78 0.14 75 / 0.10)" }}
        data-ocid="palmistry.diagram_section"
      >
        <div className="container mx-auto">
          <h2
            className="font-heading font-semibold text-xl mb-6 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {lang === "hi"
              ? "🗺️ हस्त रेखा आरेख — Hover to Explore"
              : "🗺️ Palm Diagram — Hover to Explore"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
            <PalmDiagram language={lang} />
            <div className="space-y-3">
              {PALM_LINES.map((line) => (
                <div
                  key={line.id}
                  className="flex items-start gap-3 p-3 rounded-lg border"
                  style={{
                    background: "oklch(0.17 0.06 23 / 0.8)",
                    borderColor: `${line.color}30`,
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5"
                    style={{ background: line.color }}
                  />
                  <div>
                    <p
                      className="font-heading text-sm font-semibold"
                      style={{ color: line.color }}
                    >
                      {lang === "hi" ? line.labelHi : line.labelEn}
                    </p>
                    <p
                      className="font-body text-xs"
                      style={{ color: "oklch(0.60 0.04 55)" }}
                    >
                      {lang === "hi" ? line.labelEn : line.labelHi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Search + Filter ───────────────────────────────────────────── */}
      <section
        className="sticky top-16 z-30 py-4 px-4 border-b"
        style={{
          background: "oklch(0.18 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.15)",
        }}
        data-ocid="palmistry.filter_section"
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.60 0.06 55)" }}
              />
              <Input
                data-ocid="palmistry.search_input"
                type="text"
                placeholder={
                  lang === "hi"
                    ? "रेखा या प्रकार खोजें..."
                    : "Search line or type..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border font-body"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.90 0.04 70)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label="Clear search"
                >
                  <X
                    className="h-4 w-4"
                    style={{ color: "oklch(0.60 0.06 55)" }}
                  />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <Tabs
              value={categoryFilter}
              onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}
            >
              <TabsList
                className="flex-wrap h-auto"
                style={{ background: "oklch(0.22 0.07 24)" }}
              >
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.value}
                    value={cat.value}
                    data-ocid={`palmistry.${cat.value}.tab`}
                    className="text-xs font-heading"
                  >
                    {lang === "hi" ? cat.labelHi : cat.labelEn}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* ── Card Grid ────────────────────────────────────────────────────────── */}
      <section className="py-10 px-4" data-ocid="palmistry.grid_section">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div
              data-ocid="palmistry.empty_state"
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🖐️</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                {lang === "hi"
                  ? "कोई परिणाम नहीं मिला"
                  : "No results found for your search."}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 font-heading text-xs"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("All");
                }}
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.3)",
                  color: "oklch(0.78 0.14 75)",
                }}
                data-ocid="palmistry.reset_button"
              >
                {lang === "hi" ? "फ़िल्टर हटाएं" : "Clear Filters"}
              </Button>
            </div>
          ) : (
            <>
              {/* Group by category if showing All */}
              {categoryFilter === "All" ? (
                (
                  [
                    "palm_type",
                    "major_line",
                    "minor_line",
                    "characteristics",
                  ] as PalmistryCategory[]
                ).map((cat) => {
                  const group = filtered.filter((e) => e.category === cat);
                  if (!group.length) return null;
                  const meta = CATEGORY_META[cat];
                  return (
                    <div key={cat} className="mb-10">
                      <div className="flex items-center gap-3 mb-5">
                        <h2
                          className="font-heading font-semibold text-lg"
                          style={{ color: meta.color }}
                        >
                          {lang === "hi" ? meta.labelHi : meta.labelEn}
                        </h2>
                        <Badge
                          className="font-heading text-xs"
                          style={{
                            background: meta.bg,
                            color: meta.color,
                            border: `1px solid ${meta.border}`,
                          }}
                        >
                          {group.length}
                        </Badge>
                        <div
                          className="flex-1 h-px"
                          style={{ background: `${meta.border}` }}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {group.map((entry, idx) => (
                          <PalmistryCard
                            key={entry.id}
                            entry={entry}
                            index={idx}
                            lang={lang}
                            onClick={() => setSelected(entry)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filtered.map((entry, idx) => (
                    <PalmistryCard
                      key={entry.id}
                      entry={entry}
                      index={idx}
                      lang={lang}
                      onClick={() => setSelected(entry)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Vedic Info Banner ─────────────────────────────────────────────────── */}
      <section
        className="py-10 px-4 border-t"
        style={{
          background: "oklch(0.17 0.07 24)",
          borderColor: "oklch(0.78 0.14 75 / 0.10)",
        }}
        data-ocid="palmistry.vedic_section"
      >
        <div className="container mx-auto max-w-2xl text-center">
          <div className="text-4xl mb-4">📿</div>
          <h3
            className="font-heading font-bold text-xl mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {lang === "hi" ? "हस्त सामुद्रिक शास्त्र" : "Hasta Samudrika Shastra"}
          </h3>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.68 0.05 58)" }}
          >
            {lang === "hi"
              ? "हस्तरेखा विद्या वैदिक ज्योतिष का एक अभिन्न अंग है। इस विद्या में हाथ की रेखाओं, पर्वतों और उंगलियों का विश्लेषण करके जीवन के विभिन्न पहलुओं — जैसे स्वास्थ्य, करियर, विवाह और भाग्य — की जानकारी प्राप्त की जाती है। अपने हाथ में ब्रह्मांड की ऊर्जाओं का प्रतिबिंब देखें।"
              : "Palmistry is an innate part of Vedic Astrology. Through the analysis of palm lines, mounts, and finger characteristics, we gain insight into health, career, marriage, and fate. See the reflection of cosmic energies in your own hands."}
          </p>
        </div>
      </section>

      {/* ── Detail Modal ─────────────────────────────────────────────────────── */}
      {selected && (
        <DetailModal entry={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
