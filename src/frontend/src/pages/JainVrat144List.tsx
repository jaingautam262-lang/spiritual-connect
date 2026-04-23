import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Home, Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  type JainVrat144Entry,
  jainVrat144List,
} from "../data/jainVratKathaData";

const CATEGORIES: {
  value: JainVrat144Entry["category"] | "All";
  label: string;
  labelEn: string;
}[] = [
  { value: "All", label: "सभी", labelEn: "All" },
  { value: "Parv", label: "पर्व", labelEn: "Festival" },
  { value: "Jayanti", label: "जयंती", labelEn: "Jayanti" },
  { value: "Tapas", label: "तप", labelEn: "Austerity" },
  { value: "Nityakarma", label: "नित्यकर्म", labelEn: "Daily Vow" },
  { value: "Tithi", label: "तिथि व्रत", labelEn: "Tithi Vrat" },
];

const CATEGORY_COLORS: Record<JainVrat144Entry["category"], string> = {
  Parv: "oklch(0.68 0.14 50)",
  Jayanti: "oklch(0.65 0.15 55)",
  Tapas: "oklch(0.60 0.17 30)",
  Nityakarma: "oklch(0.62 0.12 200)",
  Tithi: "oklch(0.55 0.10 280)",
};

function VratCard({
  entry,
  index,
}: { entry: JainVrat144Entry; index: number }) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors group"
      data-ocid={`jain-144.item.${index + 1}`}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{
            background: "oklch(0.78 0.14 75 / 0.10)",
            color: "oklch(0.65 0.15 55)",
          }}
        >
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors">
              {entry.name}
            </h3>
            <Badge
              variant="outline"
              className="text-[9px] px-1.5 py-0 h-4 flex-shrink-0"
              style={{
                borderColor: `${CATEGORY_COLORS[entry.category]} / 0.4`,
                color: CATEGORY_COLORS[entry.category],
              }}
            >
              {CATEGORIES.find((c) => c.value === entry.category)?.label ??
                entry.category}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground mb-1">
            {entry.nameEn}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {entry.brief}
          </p>
          {entry.hasDetailPage && entry.detailId && (
            <Link
              to="/jain-vrat-katha-detail/$id"
              params={{ id: entry.detailId }}
              className="inline-flex items-center gap-1 mt-2 text-xs font-medium transition-colors hover:underline"
              style={{ color: "oklch(0.65 0.15 55)" }}
              data-ocid={`jain-144.detail_link.${index + 1}`}
            >
              <BookOpen className="w-3 h-3" /> पूरी कथा पढ़ें
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JainVrat144List() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    JainVrat144Entry["category"] | "All"
  >("All");
  const [showOnlyWithDetail, setShowOnlyWithDetail] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return jainVrat144List.filter((v) => {
      const matchSearch =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.nameEn.toLowerCase().includes(q) ||
        v.brief.toLowerCase().includes(q) ||
        v.briefEn.toLowerCase().includes(q);
      const matchCat =
        activeCategory === "All" || v.category === activeCategory;
      const matchDetail = !showOnlyWithDetail || v.hasDetailPage;
      return matchSearch && matchCat && matchDetail;
    });
  }, [search, activeCategory, showOnlyWithDetail]);

  const withDetail = jainVrat144List.filter((v) => v.hasDetailPage).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 22) 0%, oklch(0.24 0.08 40) 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav
            className="flex items-center justify-center gap-1.5 text-xs mb-5 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="flex items-center gap-1 hover:opacity-80"
              style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
            >
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight
              className="w-3 h-3"
              style={{ color: "oklch(0.78 0.14 75 / 0.4)" }}
            />
            <Link
              to="/jain-vrat-kathas"
              className="hover:opacity-80"
              style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
            >
              जैन व्रत कथाएं
            </Link>
            <ChevronRight
              className="w-3 h-3"
              style={{ color: "oklch(0.78 0.14 75 / 0.4)" }}
            />
            <span style={{ color: "oklch(0.88 0.06 75)" }}>144 व्रत सूची</span>
          </nav>

          <div className="text-5xl mb-4">📿</div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            144 जैन व्रत संदर्भ सूची
          </h1>
          <p
            className="text-sm md:text-base mb-4"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            Jain Vrat Reference List — Complete directory of 144 Jain vrats
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
              {jainVrat144List.length} कुल व्रत / Total Vrats
            </Badge>
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.25)",
                color: "oklch(0.78 0.14 75 / 0.7)",
              }}
            >
              {withDetail} पूर्ण कथा / Full Stories
            </Badge>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative max-w-md mb-5" data-ocid="jain-144.search">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="व्रत खोजें / Search vrats…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="jain-144.search_input"
          />
        </div>

        {/* Category Filter */}
        <fieldset className="flex flex-wrap gap-2 mb-5 border-0 p-0 m-0">
          <legend className="sr-only">Category filter</legend>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.value}
              variant={activeCategory === cat.value ? "default" : "outline"}
              size="sm"
              className="text-xs h-7 px-3"
              onClick={() => setActiveCategory(cat.value)}
              data-ocid={`jain-144.category.${cat.value.toLowerCase()}`}
            >
              {cat.label}
            </Button>
          ))}
        </fieldset>

        {/* Toggle — only with full story */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-card border border-border rounded-xl">
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showOnlyWithDetail}
              onChange={(e) => setShowOnlyWithDetail(e.target.checked)}
              className="accent-primary"
              data-ocid="jain-144.show_with_detail_toggle"
            />
            केवल पूर्ण कथा वाले / Only with full story
          </label>
          <span className="text-xs text-muted-foreground ml-auto">
            {filtered.length} व्रत / {filtered.length} vrats
          </span>
        </div>

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="jain-144.empty_state"
          >
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">कोई व्रत नहीं मिला</p>
            <p className="text-sm mt-1">No vrats found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((entry) => (
              <VratCard
                key={entry.id}
                entry={entry}
                index={jainVrat144List.indexOf(entry)}
              />
            ))}
          </div>
        )}

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link to="/jain-vrat-kathas" data-ocid="jain-144.back_link">
            <Button variant="outline" size="sm" className="gap-2">
              ← जैन व्रत कथाएं
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
