import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Flame,
  Search,
  Tag,
  User,
} from "lucide-react";
import { useMemo, useState } from "react";
import { type BlogArticle, blogArticles } from "../data/blog-data";
import {
  type BlogArticleNew,
  NEW_CATEGORY_META,
  type NewCategory,
  blogArticlesNew,
} from "../data/blog-data-new";
import { usePublishedBlogArticles } from "../hooks/useQueries";

const ARTICLES_PER_PAGE = 9;

type LegacyCategory =
  | "spiritual-articles"
  | "puja-guides"
  | "astrology-tips"
  | "festival-guides"
  | "health-spirituality";

const LEGACY_CATEGORIES: {
  value: LegacyCategory;
  label: string;
  labelHindi: string;
  emoji: string;
}[] = [
  {
    value: "spiritual-articles",
    label: "Spiritual Articles",
    labelHindi: "आध्यात्मिक लेख",
    emoji: "🕉️",
  },
  {
    value: "puja-guides",
    label: "Puja Guides",
    labelHindi: "पूजा गाइड",
    emoji: "🪔",
  },
  {
    value: "astrology-tips",
    label: "Astrology Tips",
    labelHindi: "ज्योतिष सुझाव",
    emoji: "🪐",
  },
  {
    value: "festival-guides",
    label: "Festival Guides",
    labelHindi: "त्योहार गाइड",
    emoji: "🎉",
  },
  {
    value: "health-spirituality",
    label: "Health & Spirituality",
    labelHindi: "स्वास्थ्य & आध्यात्म",
    emoji: "🌿",
  },
];

const ALL_CATEGORIES: {
  value: string;
  label: string;
  labelHindi: string;
  emoji: string;
}[] = [
  { value: "all", label: "All Articles", labelHindi: "सभी लेख", emoji: "📖" },
  ...LEGACY_CATEGORIES,
  ...(
    Object.entries(NEW_CATEGORY_META) as [
      NewCategory,
      (typeof NEW_CATEGORY_META)[NewCategory],
    ][]
  ).map(([id, meta]) => ({
    value: id,
    label: meta.nameEn,
    labelHindi: meta.nameHi,
    emoji: meta.emoji,
  })),
];

const LEGACY_COLORS: Record<string, string> = {
  "spiritual-articles": "oklch(0.68 0.18 48)",
  "puja-guides": "oklch(0.58 0.16 30)",
  "astrology-tips": "oklch(0.52 0.14 240)",
  "festival-guides": "oklch(0.55 0.16 145)",
  "health-spirituality": "oklch(0.55 0.14 160)",
};

const NEW_CATEGORY_COLORS: Record<NewCategory, string> = {
  "dharmik-gyan": "oklch(0.62 0.18 40)",
  stotra: "oklch(0.58 0.15 280)",
  "tithi-rituals": "oklch(0.58 0.16 30)",
  "bhagwan-legends": "oklch(0.60 0.18 50)",
  "hindu-mantra": "oklch(0.55 0.14 240)",
  "astrology-sc": "oklch(0.52 0.14 240)",
  "aarti-blog": "oklch(0.62 0.16 38)",
  "temples-of-bharat": "oklch(0.55 0.16 20)",
  "crystals-gems": "oklch(0.55 0.16 195)",
  vastu: "oklch(0.55 0.14 145)",
  jewellery: "oklch(0.55 0.18 330)",
  "rudraksha-blog": "oklch(0.50 0.14 165)",
  bracelets: "oklch(0.58 0.16 60)",
};

function getCategoryColor(category: string): string {
  return (
    LEGACY_COLORS[category] ??
    NEW_CATEGORY_COLORS[category as NewCategory] ??
    "oklch(0.68 0.18 48)"
  );
}

function getCategoryLabel(category: string, lang: "en" | "hi"): string {
  const legacy = LEGACY_CATEGORIES.find((c) => c.value === category);
  if (legacy) return lang === "hi" ? legacy.labelHindi : legacy.label;
  const newMeta = NEW_CATEGORY_META[category as NewCategory];
  if (newMeta) return lang === "hi" ? newMeta.nameHi : newMeta.nameEn;
  return category;
}

function getCategoryEmoji(category: string): string {
  const legacy = LEGACY_CATEGORIES.find((c) => c.value === category);
  if (legacy) return legacy.emoji;
  return NEW_CATEGORY_META[category as NewCategory]?.emoji ?? "📄";
}

// Unified article shape for display
interface DisplayArticle {
  id: string;
  slug: string;
  title: string;
  titleHi?: string;
  excerpt: string;
  category: string;
  author: string;
  tags: string[];
  publishDate: string;
  isPopular?: boolean;
}

function toDisplay(a: BlogArticle | BlogArticleNew): DisplayArticle {
  if ("titleHindi" in a) {
    // Legacy BlogArticle
    return {
      id: a.id,
      slug: a.slug,
      title: a.title,
      titleHi: a.titleHindi,
      excerpt: a.excerpt,
      category: a.category,
      author: a.author,
      tags: a.tags,
      publishDate: a.publishDate,
      isPopular: false,
    };
  }
  // BlogArticleNew
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    titleHi: a.titleHi,
    excerpt: a.excerpt,
    category: a.category,
    author: a.author,
    tags: a.tags,
    publishDate: a.publishDate,
    isPopular: a.isPopular,
  };
}

function ArticleCard({
  article,
  lang,
  compact = false,
}: { article: DisplayArticle; lang: "en" | "hi"; compact?: boolean }) {
  const color = getCategoryColor(article.category);
  const displayTitle =
    lang === "hi" && article.titleHi ? article.titleHi : article.title;

  return (
    <article
      className={`rounded-2xl overflow-hidden border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group ${compact ? "min-w-[260px] max-w-[280px]" : ""}`}
      style={{
        background: "oklch(0.18 0.07 28 / 0.8)",
        borderColor: "oklch(0.78 0.14 75 / 0.12)",
      }}
      data-ocid="blog.article_card"
    >
      {/* Image area */}
      <div
        className={`relative overflow-hidden flex items-center justify-center text-5xl ${compact ? "h-36" : "h-44"}`}
        style={{
          background: `linear-gradient(140deg, ${color}33 0%, ${color}66 100%)`,
        }}
      >
        <span className="opacity-60 group-hover:scale-110 transition-transform duration-500">
          {getCategoryEmoji(article.category)}
        </span>
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold"
          style={{ background: `${color}cc`, color: "oklch(0.95 0.01 80)" }}
        >
          {getCategoryLabel(article.category, lang)}
        </div>
        {article.isPopular && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
            style={{
              background: "oklch(0.68 0.18 48)",
              color: "white",
            }}
          >
            <Flame className="h-3 w-3" />
            {lang === "hi" ? "लोकप्रिय" : "Popular"}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h2
          className="font-heading font-semibold text-base leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors"
          style={{ color: "oklch(0.88 0.06 75)" }}
        >
          {displayTitle}
        </h2>
        <p
          className="text-sm leading-relaxed line-clamp-3 flex-1"
          style={{ color: "oklch(0.65 0.04 60)" }}
        >
          {article.excerpt}
        </p>

        <div
          className="flex items-center gap-3 text-xs"
          style={{ color: "oklch(0.55 0.04 50)" }}
        >
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(article.publishDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.12)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link to="/blog/$slug" params={{ slug: article.slug }}>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-1 text-xs font-semibold gap-1"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
              color: "oklch(0.78 0.14 75)",
              background: "transparent",
            }}
            data-ocid="blog.read_more_button"
          >
            <BookOpen className="h-3.5 w-3.5" />
            {lang === "hi" ? "पूरा पढ़ें" : "Read More"}
          </Button>
        </Link>
      </div>
    </article>
  );
}

function PopularArticlesSection({
  articles,
  lang,
}: { articles: DisplayArticle[]; lang: "en" | "hi" }) {
  const popular = articles.filter((a) => a.isPopular).slice(0, 6);
  if (popular.length === 0) return null;

  return (
    <section className="px-4 py-10" data-ocid="blog.popular_section">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.68 0.18 48), oklch(0.72 0.20 55))",
              color: "white",
            }}
          >
            <Flame className="h-4 w-4" />
            {lang === "hi" ? "लोकप्रिय लेख" : "Popular Articles"}
          </div>
          <div
            className="h-px flex-1"
            style={{ background: "oklch(0.78 0.14 75 / 0.2)" }}
          />
          <span className="text-xs" style={{ color: "oklch(0.55 0.04 50)" }}>
            {lang === "hi" ? "पाठकों की पसंद" : "Reader Favorites"}
          </span>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {popular.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              lang={lang}
              compact={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
        <div
          key={sk}
          className="rounded-2xl overflow-hidden border"
          style={{
            background: "oklch(0.18 0.07 28 / 0.8)",
            borderColor: "oklch(0.78 0.14 75 / 0.12)",
          }}
        >
          <Skeleton className="h-44 w-full" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-8 w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogSection() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [page, setPage] = useState(1);

  const { data: backendArticles, isLoading } = usePublishedBlogArticles();

  // Merge all articles into unified display format
  const allArticles: DisplayArticle[] = useMemo(() => {
    const legacySource: BlogArticle[] =
      backendArticles && backendArticles.length > 0
        ? backendArticles
        : blogArticles;
    const legacy = legacySource.map(toDisplay);
    const newArts = blogArticlesNew.map(toDisplay);
    return [...legacy, ...newArts];
  }, [backendArticles]);

  const filtered = useMemo(() => {
    return allArticles.filter((a) => {
      const matchesCat =
        activeCategory === "all" || a.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        (a.titleHi ?? "").includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [allArticles, activeCategory, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ARTICLES_PER_PAGE),
  );
  const paginated = filtered.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE,
  );

  const handleCategoryChange = (val: string) => {
    setActiveCategory(val);
    setPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  // Show popular section only on "All" with no search active
  const showPopular = activeCategory === "all" && !search;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.13 0.05 25)" }}>
      {/* Header */}
      <section
        className="py-16 px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.10 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
              >
                📖 Spiritual Wisdom
              </p>
              <h1
                className="text-3xl md:text-4xl font-heading font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {lang === "hi" ? "आध्यात्मिक ब्लॉग" : "Spiritual Blog"}
              </h1>
              <p
                className="mt-2 text-sm"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                {lang === "hi"
                  ? "पूजा विधि, ज्योतिष, त्योहार और आध्यात्मिक ज्ञान"
                  : "Puja guides, astrology insights, festival wisdom, and spiritual knowledge"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
              className="px-4 py-2 rounded-full text-sm font-semibold border transition-all hover:opacity-90"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                color: "oklch(0.78 0.14 75)",
                background: "oklch(0.78 0.14 75 / 0.08)",
              }}
              data-ocid="blog.language_toggle"
            >
              {lang === "en" ? "हिन्दी" : "English"}
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-lg">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.60 0.04 50)" }}
            />
            <Input
              placeholder={lang === "hi" ? "लेख खोजें..." : "Search articles..."}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 rounded-full border-0 text-sm"
              style={{
                background: "oklch(0.22 0.08 28 / 0.8)",
                color: "oklch(0.88 0.06 75)",
              }}
              data-ocid="blog.search_input"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section
        className="px-4 py-4 border-b sticky top-16 z-30"
        style={{
          background: "oklch(0.16 0.06 22 / 0.95)",
          borderColor: "oklch(0.78 0.14 75 / 0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleCategoryChange(cat.value)}
                className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background:
                    activeCategory === cat.value
                      ? "oklch(0.68 0.18 48)"
                      : "oklch(0.22 0.08 28)",
                  color:
                    activeCategory === cat.value
                      ? "white"
                      : "oklch(0.75 0.05 60)",
                  border: `1px solid ${activeCategory === cat.value ? "transparent" : "oklch(0.78 0.14 75 / 0.15)"}`,
                }}
                data-ocid="blog.category_filter"
              >
                {cat.emoji} {lang === "hi" ? cat.labelHindi : cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles (shown only on "all" view with no search) */}
      {!isLoading && showPopular && (
        <PopularArticlesSection articles={allArticles} lang={lang} />
      )}

      {/* Divider before main grid when popular section shown */}
      {showPopular && !isLoading && (
        <div
          className="mx-4 mb-2"
          style={{ borderTop: "1px solid oklch(0.78 0.14 75 / 0.10)" }}
        />
      )}

      {/* Articles Grid */}
      <section className="px-4 py-10">
        <div className="container mx-auto max-w-6xl">
          {isLoading ? (
            <LoadingSkeleton />
          ) : paginated.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen
                className="h-12 w-12 mx-auto mb-4 opacity-30"
                style={{ color: "oklch(0.78 0.14 75)" }}
              />
              <p
                className="text-base font-heading"
                style={{ color: "oklch(0.65 0.04 60)" }}
              >
                {lang === "hi" ? "कोई लेख नहीं मिला" : "No articles found"}
              </p>
              <button
                type="button"
                onClick={() => {
                  handleCategoryChange("all");
                  handleSearch("");
                }}
                className="mt-4 text-sm underline"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {lang === "hi" ? "फ़िल्टर हटाएं" : "Clear filters"}
              </button>
            </div>
          ) : (
            <>
              <p
                className="text-xs mb-6"
                style={{ color: "oklch(0.55 0.04 50)" }}
              >
                {lang === "hi"
                  ? `${filtered.length} लेख मिले`
                  : `${filtered.length} article${filtered.length !== 1 ? "s" : ""} found`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((article) => (
                  <ArticleCard key={article.id} article={article} lang={lang} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{
                      borderColor: "oklch(0.78 0.14 75 / 0.3)",
                      color: "oklch(0.78 0.14 75)",
                    }}
                    data-ocid="blog.prev_page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const p = page <= 4 ? i + 1 : page + i - 3;
                    return p <= totalPages ? p : null;
                  })
                    .filter((p): p is number => p !== null)
                    .map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p)}
                        className="h-8 w-8 rounded-full text-sm font-semibold transition-all"
                        style={{
                          background:
                            page === p ? "oklch(0.68 0.18 48)" : "transparent",
                          color: page === p ? "white" : "oklch(0.75 0.05 60)",
                          border: `1px solid ${page === p ? "transparent" : "oklch(0.78 0.14 75 / 0.2)"}`,
                        }}
                        data-ocid="blog.page_number"
                      >
                        {p}
                      </button>
                    ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    style={{
                      borderColor: "oklch(0.78 0.14 75 / 0.3)",
                      color: "oklch(0.78 0.14 75)",
                    }}
                    data-ocid="blog.next_page"
                  >
                    <ChevronRight className="h-4 w-4" />
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
