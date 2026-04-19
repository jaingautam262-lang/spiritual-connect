import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { type JainKatha, jainKathayen } from "../data/jain-kathayen-data";

const categoryColors: Record<string, string> = {
  "पर्व कथा": "oklch(0.72 0.18 60)",
  "नीति कथा": "oklch(0.62 0.18 180)",
  "आचार्य कथा": "oklch(0.62 0.18 48)",
  "त्याग कथा": "oklch(0.62 0.18 280)",
  "भक्ति कथा": "oklch(0.62 0.18 350)",
  "मोक्ष कथा": "oklch(0.62 0.18 120)",
};

function KathaCard({
  katha,
  onClick,
}: { katha: JainKatha; onClick: () => void }) {
  const color = categoryColors[katha.category] ?? "oklch(0.68 0.20 48)";
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`katha-card-${katha.id}`}
      className="w-full text-left bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all duration-200 group"
      style={{ boxShadow: "0 1px 4px oklch(0 0 0 / 0.04)" }}
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
          {katha.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge
              variant="outline"
              className="text-xs"
              style={{ borderColor: `${color}/0.4`, color }}
            >
              {katha.category}
            </Badge>
          </div>
          <h3 className="font-display font-bold text-foreground text-base leading-snug">
            {katha.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 italic">
            {katha.subtitle}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
        {katha.significance}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">
          नैतिक: {katha.moral.slice(0, 50)}...
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

function KathaDetail({
  katha,
  onBack,
}: { katha: JainKatha; onBack: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
        style={{ color: "oklch(0.55 0.18 48)" }}
        data-ocid="katha-back-btn"
      >
        <ArrowLeft className="h-4 w-4" />
        वापस जाएँ
      </button>

      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
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
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              border: "2px solid oklch(0.78 0.14 75 / 0.4)",
            }}
          >
            {katha.icon}
          </div>
          <div>
            <h1
              className="font-display text-2xl font-bold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {katha.title}
            </h1>
            <p className="text-sm" style={{ color: "oklch(0.70 0.06 60)" }}>
              {katha.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.78 0.14 75 / 0.07)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            महत्त्व
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            {katha.significance}
          </p>
        </div>
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.68 0.20 48 / 0.07)",
            border: "1px solid oklch(0.68 0.20 48 / 0.2)",
          }}
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            नैतिक शिक्षा
          </p>
          <p className="text-sm text-foreground leading-relaxed italic">
            {katha.moral}
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <pre
          className="whitespace-pre-wrap text-sm leading-loose text-foreground"
          style={{
            fontFamily: "'Noto Sans Devanagari', 'Lato', serif",
            letterSpacing: "0.01em",
          }}
        >
          {katha.fullText}
        </pre>
      </div>
    </div>
  );
}

export default function JainKathayen() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<JainKatha | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("सभी");

  const categories = [
    "सभी",
    ...Array.from(new Set(jainKathayen.map((k) => k.category))),
  ];

  const filtered = jainKathayen.filter((k) => {
    const matchesSearch =
      k.title.toLowerCase().includes(search.toLowerCase()) ||
      k.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "सभी" || k.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  if (selected) {
    return (
      <div className="min-h-screen bg-background">
        <KathaDetail katha={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-12 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 60%, oklch(0.30 0.10 35) 100%)",
        }}
      >
        <div className="text-5xl mb-4">📜</div>
        <h1
          className="font-display text-3xl md:text-4xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          जैन कथाएँ
        </h1>
        <p
          className="text-base max-w-xl mx-auto"
          style={{ color: "oklch(0.78 0.14 75 / 0.75)" }}
        >
          महापुरुषों की प्रेरणादायक जीवन-कथाएँ — भक्ति, त्याग और मोक्ष-मार्ग की शिक्षाएँ
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="कथा खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              data-ocid="katha-search"
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
              data-ocid={`katha-filter-${cat}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-5">
          {filtered.length} कथाएँ
        </p>

        {filtered.length === 0 ? (
          <div
            className="text-center py-20 rounded-xl border border-border"
            data-ocid="katha-empty"
          >
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-muted-foreground">कोई कथा नहीं मिली</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((katha) => (
              <KathaCard
                key={katha.id}
                katha={katha}
                onClick={() => setSelected(katha)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
