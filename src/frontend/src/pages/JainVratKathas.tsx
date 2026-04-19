import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Search,
  Share2,
  Tag,
} from "lucide-react";
import { useState } from "react";
import {
  type JainVratKatha,
  jainVratKathasData,
} from "../data/jainVratKathasData";

type TabKey = "katha" | "vidhi" | "mantra" | "phala";

const TABS: { key: TabKey; labelHi: string; labelEn: string }[] = [
  { key: "katha", labelHi: "कथा", labelEn: "Story" },
  { key: "vidhi", labelHi: "व्रत विधि", labelEn: "Vrat Vidhi" },
  { key: "mantra", labelHi: "मंत्र", labelEn: "Mantra" },
  { key: "phala", labelHi: "फल", labelEn: "Phala" },
];

function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    const url = `${window.location.href.split("#")[0]}#jvk`;
    navigator.clipboard.writeText(`${title} — ${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
      aria-label="Share"
    >
      <Share2 className="w-3 h-3" />
      {copied ? "Copied!" : "Share"}
    </button>
  );
}

function KathaContent({
  entry,
  tab,
  lang,
}: {
  entry: JainVratKatha;
  tab: TabKey;
  lang: "hi" | "en";
}) {
  if (entry.isPlaceholder && tab === "katha") {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-2 text-center">
        <span className="text-3xl">📿</span>
        <p className="text-sm text-muted-foreground">पूर्ण पाठ शीघ्र आएगा</p>
        <p className="text-xs text-muted-foreground">Full text coming soon</p>
      </div>
    );
  }

  if (tab === "katha") {
    const text = lang === "hi" ? entry.fullTextHi : entry.fullTextEn;
    if (!text) {
      return (
        <p className="text-sm text-muted-foreground italic">
          {lang === "hi" ? "अनुवाद शीघ्र आएगा।" : "Translation coming soon."}
        </p>
      );
    }
    return (
      <div className="prose prose-sm max-w-none space-y-3">
        {text.split("\n").map((line, i) => {
          if (!line.trim()) return null;
          const isVerse =
            line.includes("॥") || line.includes("||") || line.startsWith("नमो");
          const key = `line-${i}-${line.substring(0, 20)}`;
          return (
            <p
              key={key}
              className={`text-sm leading-relaxed ${
                isVerse
                  ? "text-primary font-medium text-center italic"
                  : "text-foreground"
              }`}
            >
              {line}
            </p>
          );
        })}
      </div>
    );
  }

  if (tab === "vidhi") {
    const text = lang === "hi" ? entry.vratVidhiHi : entry.vratVidhiEn;
    return (
      <div className="space-y-2">
        {text
          .split("।")
          .filter(Boolean)
          .map((step, i) => (
            <div
              key={`step-${i}-${step.substring(0, 15)}`}
              className="flex gap-2"
            >
              <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center flex-shrink-0 font-semibold">
                {i + 1}
              </span>
              <p className="text-sm text-foreground leading-relaxed">
                {step.trim()}।
              </p>
            </div>
          ))}
      </div>
    );
  }

  if (tab === "mantra") {
    const hiText = entry.mantraHi;
    const enText = entry.mantraEn;
    return (
      <div className="space-y-4">
        <div
          className="rounded-xl p-4 text-center border"
          style={{
            background: "oklch(0.78 0.14 75 / 0.06)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <p
            className="text-base font-semibold leading-relaxed"
            style={{ color: "oklch(0.65 0.15 55)" }}
          >
            {hiText}
          </p>
        </div>
        {lang === "en" && enText && (
          <div className="rounded-lg p-3 bg-muted/40 border border-border">
            <p className="text-sm text-muted-foreground italic">{enText}</p>
          </div>
        )}
      </div>
    );
  }

  if (tab === "phala") {
    const text = lang === "hi" ? entry.phalaHi : entry.phalaEn;
    return (
      <div
        className="rounded-xl p-4 border flex gap-3"
        style={{
          background: "oklch(0.78 0.14 75 / 0.06)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <span className="text-2xl flex-shrink-0">🌟</span>
        <p className="text-sm text-foreground leading-relaxed">{text}</p>
      </div>
    );
  }

  return null;
}

function KathaCard({
  entry,
  index,
}: {
  entry: JainVratKatha;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<TabKey>("katha");
  const [lang, setLang] = useState<"hi" | "en">("hi");

  const previewText = lang === "hi" ? entry.descriptionHi : entry.descriptionEn;

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
      id={entry.id}
      data-ocid={`jain-vrat.item.${index + 1}`}
    >
      {/* Card Header */}
      <button
        type="button"
        className="w-full text-left p-5 flex items-start gap-4"
        onClick={() => setExpanded((v) => !v)}
        data-ocid={`jain-vrat.expand_button.${index + 1}`}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
          style={{
            background: "oklch(0.78 0.14 75 / 0.12)",
            color: "oklch(0.65 0.15 55)",
          }}
        >
          {entry.number}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground text-sm leading-snug">
                  {entry.titleHi}
                </h3>
                {entry.isPlaceholder && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 h-4 bg-muted text-muted-foreground border-border"
                    data-ocid={`jain-vrat.placeholder_badge.${index + 1}`}
                  >
                    शीघ्र आएगा
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {entry.titleEn}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
              <Badge
                variant="outline"
                className="text-[10px] hidden sm:inline-flex"
              >
                {entry.category}
              </Badge>
              {expanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>
          {!expanded && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
              {previewText}
            </p>
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4">
          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {entry.duration}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {entry.category}
            </span>
          </div>

          {/* Language Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setLang("hi")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                lang === "hi"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
              data-ocid="jain-vrat.lang_hi"
            >
              हिंदी
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
              data-ocid="jain-vrat.lang_en"
            >
              English
            </button>
          </div>

          {/* Section Tabs */}
          <div
            className="flex gap-1 mb-4 p-1 rounded-xl"
            style={{ background: "oklch(0.78 0.14 75 / 0.06)" }}
            role="tablist"
          >
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  tab === t.key
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`jain-vrat.tab.${t.key}`}
              >
                <span className="block text-center">
                  {lang === "hi" ? t.labelHi : t.labelEn}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[80px]">
            <KathaContent entry={entry} tab={tab} lang={lang} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3" />
              <span>
                {lang === "hi"
                  ? `कथा ${entry.number} / 40`
                  : `Katha ${entry.number} of 40`}
              </span>
            </div>
            <ShareButton title={entry.titleHi} />
          </div>
        </div>
      )}
    </div>
  );
}

const ALL_CATEGORIES = "सभी / All";

export default function JainVratKathas() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [showPlaceholders, setShowPlaceholders] = useState(true);

  const categories = [
    ALL_CATEGORIES,
    ...Array.from(new Set(jainVratKathasData.map((k) => k.category))),
  ];

  const filtered = jainVratKathasData.filter((k) => {
    const matchesSearch =
      k.titleHi.toLowerCase().includes(search.toLowerCase()) ||
      k.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      k.category.toLowerCase().includes(search.toLowerCase()) ||
      k.descriptionHi.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === ALL_CATEGORIES || k.category === activeCategory;
    const matchesPlaceholder = showPlaceholders || !k.isPlaceholder;
    return matchesSearch && matchesCategory && matchesPlaceholder;
  });

  const fullCount = jainVratKathasData.filter((k) => !k.isPlaceholder).length;
  const placeholderCount = jainVratKathasData.filter(
    (k) => k.isPlaceholder,
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="relative py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 22) 0%, oklch(0.24 0.08 40) 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-3">🙏</div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            जैन व्रत कथाएं
          </h1>
          <p
            className="text-sm md:text-base mb-1"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            Jain Vrat Kathas — 40 sacred stories of vows and auspicious
            observances
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                color: "oklch(0.78 0.14 75)",
                background: "oklch(0.78 0.14 75 / 0.1)",
              }}
            >
              {fullCount} पूर्ण कथाएं / Full Kathas
            </Badge>
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.25)",
                color: "oklch(0.78 0.14 75 / 0.7)",
              }}
            >
              {placeholderCount} शीघ्र आएगा / Coming Soon
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10" id="jvk">
        {/* Stats Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">
              {jainVratKathasData.length}
            </span>
            <span className="text-muted-foreground">Total Kathas</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showPlaceholders}
              onChange={(e) => setShowPlaceholders(e.target.checked)}
              className="accent-primary"
              data-ocid="jain-vrat.show_placeholders_toggle"
            />
            शीघ्र आएगा / Coming Soon दिखाएं
          </label>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-5" data-ocid="jain-vrat.search">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="कथा खोजें / Search kathas…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="jain-vrat.search_input"
          />
        </div>

        {/* Category Filter */}
        <fieldset className="flex flex-wrap gap-2 mb-8 border-0 p-0 m-0">
          <legend className="sr-only">Category filter</legend>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              className="text-xs h-7 px-3"
              onClick={() => setActiveCategory(cat)}
              data-ocid={`jain-vrat.category_filter.${cat.replace(/[\s/]/g, "_").toLowerCase()}`}
            >
              {cat}
            </Button>
          ))}
        </fieldset>

        {/* Results Count */}
        {(search || activeCategory !== ALL_CATEGORIES) && (
          <p className="text-sm text-muted-foreground mb-4">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {search ? ` for "${search}"` : ""}
            {activeCategory !== ALL_CATEGORIES ? ` in "${activeCategory}"` : ""}
          </p>
        )}

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="jain-vrat.empty_state"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">कोई कथा नहीं मिली</p>
            <p className="text-sm mt-1">No kathas found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((katha) => (
              <KathaCard
                key={katha.id}
                entry={katha}
                index={jainVratKathasData.indexOf(katha)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
