import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Search,
  Star,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { type JainStory, jainStoriesData } from "../data/jainStoriesData";

const CATEGORIES = [
  "सभी",
  "तीर्थंकर कथाएँ",
  "साधु-साध्वी कथाएँ",
  "श्रावक कथाएँ",
  "अहिंसा कथाएँ",
  "कर्म कथाएँ",
  "नीति कथाएँ",
  "प्रेरणादायक कथाएँ",
];

const PAGE_SIZE = 20;

const CATEGORY_COLORS: Record<string, string> = {
  "तीर्थंकर कथाएँ": "oklch(0.72 0.18 55)",
  "साधु-साध्वी कथाएँ": "oklch(0.62 0.18 280)",
  "श्रावक कथाएँ": "oklch(0.62 0.18 180)",
  "अहिंसा कथाएँ": "oklch(0.62 0.18 140)",
  "कर्म कथाएँ": "oklch(0.62 0.18 30)",
  "नीति कथाएँ": "oklch(0.62 0.18 220)",
  "प्रेरणादायक कथाएँ": "oklch(0.62 0.18 350)",
};

function StoryCard({
  story,
  expanded,
  onToggle,
  index,
}: {
  story: JainStory;
  expanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const catColor = CATEGORY_COLORS[story.category] ?? "oklch(0.68 0.20 48)";
  const isAvailable = story.status !== "coming-soon";

  return (
    <div
      data-ocid={`story.item.${index + 1}`}
      className={`bg-card rounded-xl border transition-all duration-200 overflow-hidden ${
        story.featured
          ? "border-primary/50 shadow-md"
          : "border-border hover:border-primary/30"
      }`}
      style={
        story.featured
          ? {
              boxShadow:
                "0 0 0 1px oklch(0.72 0.18 55 / 0.15), 0 4px 12px oklch(0 0 0 / 0.06)",
            }
          : {}
      }
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
              border: "2px solid oklch(0.78 0.14 75 / 0.35)",
            }}
          >
            📿
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <Badge
                variant="outline"
                className="text-xs"
                style={{ borderColor: `${catColor}/0.4`, color: catColor }}
              >
                {story.category}
              </Badge>
              {story.featured && (
                <Badge variant="secondary" className="text-xs gap-1">
                  <Star className="w-2.5 h-2.5" /> विशेष
                </Badge>
              )}
              {!isAvailable && (
                <Badge
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  शीघ्र आ रहा है
                </Badge>
              )}
            </div>
            <h3 className="font-display font-bold text-foreground text-base leading-snug">
              {story.title}
            </h3>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {story.summary}
        </p>

        <div className="flex items-center justify-between">
          {story.readingTime && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> {story.readingTime}
            </span>
          )}
          {isAvailable ? (
            <Button
              size="sm"
              variant={expanded ? "secondary" : "default"}
              data-ocid={`story.read_button.${index + 1}`}
              onClick={onToggle}
              className="gap-1 text-xs ml-auto"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3 h-3" /> बंद करें
                </>
              ) : (
                <>
                  <BookOpen className="w-3 h-3" /> पढ़ें
                </>
              )}
            </Button>
          ) : (
            <span className="ml-auto text-xs text-muted-foreground italic">
              शीघ्र आ रहा है…
            </span>
          )}
        </div>
      </div>

      {/* Expanded content */}
      {expanded && story.content && (
        <div
          className="px-5 pb-5 border-t border-border"
          style={{ background: "oklch(0.13 0.04 28 / 0.4)" }}
        >
          <div className="pt-4 space-y-3">
            {story.content
              .split("\n\n")
              .filter(Boolean)
              .map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="text-sm text-foreground leading-relaxed"
                >
                  {para}
                </p>
              ))}
            {story.moral && (
              <div
                className="mt-4 p-3 rounded-lg border-l-4"
                style={{
                  background: "oklch(0.22 0.06 48 / 0.25)",
                  borderLeftColor: "oklch(0.72 0.18 55)",
                }}
              >
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: "oklch(0.72 0.18 55)" }}
                >
                  🌟 नैतिक शिक्षा
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {story.moral}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function JainStoriesLibrary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("सभी");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jainStoriesData.filter((s) => {
      const matchCat =
        activeCategory === "सभी" || s.category === activeCategory;
      const matchSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
    setExpandedId(null);
  };

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
    setExpandedId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-14 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 30), oklch(0.22 0.07 45), oklch(0.18 0.05 28))",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.68 0.20 48) 0%, transparent 40%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🔱</span>
            <h1
              className="font-display text-3xl md:text-5xl font-bold"
              style={{ color: "oklch(0.88 0.10 75)" }}
            >
              जैन कथा संग्रह
            </h1>
            <span className="text-4xl">📿</span>
          </div>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            100+ प्रेरणादायक जैन कहानियाँ — तीर्थंकरों, साधुओं और श्रावकों की जीवन-गाथाएं
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>📚 {jainStoriesData.length} कथाएँ</span>
            <span>•</span>
            <span>
              ✨{" "}
              {jainStoriesData.filter((s) => s.status === "available").length}{" "}
              उपलब्ध
            </span>
            <span>•</span>
            <span>
              🌟 {jainStoriesData.filter((s) => s.featured).length} विशेष
            </span>
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="py-6 px-4 bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="stories.search_input"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="कथा खोजें..."
              className="pl-10 pr-10 bg-background"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`stories.filter.${cat}`}
                onClick={() => handleCategory(cat)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                  activeCategory === cat
                    ? "text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
                style={
                  activeCategory === cat
                    ? { background: "oklch(0.72 0.18 55)" }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories grid */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div
              data-ocid="stories.empty_state"
              className="text-center py-16 text-muted-foreground"
            >
              <span className="text-4xl block mb-3">📿</span>
              <p className="text-lg font-medium">कोई कथा नहीं मिली</p>
              <p className="text-sm mt-1">
                अपनी खोज बदलें या किसी अन्य श्रेणी का चयन करें।
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("सभी");
                }}
              >
                सभी दिखाएं
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-5">
                {filtered.length} कथाएँ मिलीं
                {activeCategory !== "सभी" && ` — ${activeCategory}`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginated.map((story, i) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    index={(page - 1) * PAGE_SIZE + i}
                    expanded={expandedId === story.id}
                    onToggle={() =>
                      setExpandedId(expandedId === story.id ? null : story.id)
                    }
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-10">
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid="stories.pagination_prev"
                    disabled={page === 1}
                    onClick={() => {
                      setPage((p) => p - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    ← पिछला
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    data-ocid="stories.pagination_next"
                    disabled={page === totalPages}
                    onClick={() => {
                      setPage((p) => p + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    अगला →
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
