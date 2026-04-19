import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { useState } from "react";
import {
  type JainStotra,
  jainStotraSangrahData,
} from "../data/jain-stotra-sangrah-data";

type Lang = "original" | "hindi" | "english";

function StotraCard({
  stotra,
  onClick,
}: { stotra: JainStotra; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`stotra-card-${stotra.id}`}
      className="w-full text-left bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all duration-200"
    >
      <div className="flex items-start gap-4 mb-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
            border: "2px solid oklch(0.78 0.14 75 / 0.3)",
          }}
        >
          {stotra.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              {stotra.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {stotra.language}
            </Badge>
          </div>
          <h3 className="font-display font-bold text-foreground text-base leading-snug">
            {stotra.titleHindi}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{stotra.title}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
        {stotra.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">
          देवता: {stotra.deity}
        </span>
        <span
          className="text-xs font-semibold flex items-center gap-1"
          style={{ color: "oklch(0.55 0.18 48)" }}
        >
          पढ़ें <BookOpen className="h-3 w-3" />
        </span>
      </div>
    </button>
  );
}

function StotraDetail({
  stotra,
  onBack,
}: { stotra: JainStotra; onBack: () => void }) {
  const [lang, setLang] = useState<Lang>("original");

  const textMap: Record<Lang, string> = {
    original: stotra.originalText,
    hindi: stotra.hindiTranslation,
    english: stotra.englishTranslation,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-semibold hover:opacity-80"
        style={{ color: "oklch(0.55 0.18 48)" }}
        data-ocid="stotra-back-btn"
      >
        <ArrowLeft className="h-4 w-4" />
        वापस जाएँ
      </button>

      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22), oklch(0.26 0.08 28))",
          border: "1px solid oklch(0.78 0.14 75 / 0.3)",
        }}
      >
        <div
          className="h-1.5"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.78 0.14 75))",
          }}
        />
        <div className="p-6 flex items-center gap-5">
          <span className="text-4xl">{stotra.icon}</span>
          <div>
            <h1
              className="font-display text-2xl font-bold"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {stotra.titleHindi}
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "oklch(0.70 0.06 60)" }}
            >
              {stotra.category} • {stotra.deity} • {stotra.language}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        {stotra.description}
      </p>

      {/* Language Toggle */}
      <div className="flex gap-2 mb-5" data-ocid="stotra-lang-toggle">
        {(["original", "hindi", "english"] as Lang[]).map((l) => (
          <Button
            key={l}
            variant={lang === l ? "default" : "outline"}
            size="sm"
            onClick={() => setLang(l)}
            className="text-xs"
          >
            {l === "original" ? "मूल पाठ" : l === "hindi" ? "हिन्दी" : "English"}
          </Button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <pre
          className="whitespace-pre-wrap text-sm leading-loose text-foreground"
          style={{
            fontFamily: "'Noto Sans Devanagari', 'Lato', serif",
            letterSpacing: "0.01em",
          }}
        >
          {textMap[lang]}
        </pre>
      </div>
    </div>
  );
}

export default function JainStotraSangrah() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("सभी");
  const [selected, setSelected] = useState<JainStotra | null>(null);

  const categories = [
    "सभी",
    ...Array.from(new Set(jainStotraSangrahData.map((s) => s.category))),
  ];

  const filtered = jainStotraSangrahData.filter((s) => {
    const matchSearch =
      s.titleHindi.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.deity.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "सभी" || s.category === activeCategory;
    return matchSearch && matchCat;
  });

  if (selected) {
    return (
      <div className="min-h-screen bg-background">
        <StotraDetail stotra={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div
        className="py-12 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22), oklch(0.26 0.08 28) 60%, oklch(0.30 0.10 35))",
        }}
      >
        <div className="text-5xl mb-4">🕉️</div>
        <h1
          className="font-display text-3xl md:text-4xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          जैन स्तोत्र संग्रह
        </h1>
        <p
          className="text-base max-w-xl mx-auto"
          style={{ color: "oklch(0.78 0.14 75 / 0.75)" }}
        >
          प्रतिक्रमण सूत्र • आवश्यक सूत्र • तीर्थ स्तोत्र • संथारा विधि
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="स्तोत्र खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="stotra-search"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="text-xs"
              data-ocid={`stotra-filter-${cat}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          {filtered.length} स्तोत्र
        </p>

        {filtered.length === 0 ? (
          <div
            className="text-center py-20 rounded-xl border border-border"
            data-ocid="stotra-empty"
          >
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-muted-foreground">कोई स्तोत्र नहीं मिला</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((stotra) => (
              <StotraCard
                key={stotra.id}
                stotra={stotra}
                onClick={() => setSelected(stotra)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
