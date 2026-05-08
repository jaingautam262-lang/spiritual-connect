import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, Clock, Search, Volume2 } from "lucide-react";
import { useState } from "react";
import { blogArticles } from "../data/blogData";
import type { BlogArticle } from "../data/blogData";
import { useLanguage } from "../hooks/useLanguage";

const CATEGORY_COLORS: Record<string, string> = {
  Spirituality: "bg-primary/10 text-primary border-primary/20",
  "Bhagavad Gita": "bg-accent/20 text-accent-foreground border-accent/30",
  Meditation: "bg-secondary text-secondary-foreground border-secondary",
  Career: "bg-muted text-muted-foreground border-border",
  Relationships: "bg-primary/10 text-primary border-primary/20",
  Marriage: "bg-accent/20 text-accent-foreground border-accent/30",
  Peace: "bg-secondary text-secondary-foreground border-secondary",
};

const PAGE_SIZE = 6;
const CATEGORIES = [
  "All",
  "Spirituality",
  "Bhagavad Gita",
  "Meditation",
  "Career",
  "Relationships",
  "Marriage",
  "Peace",
];

export default function BlogList() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [langFilter, setLangFilter] = useState<"All" | "Hindi" | "English">(
    "All",
  );
  const [page, setPage] = useState(1);

  const filtered = blogArticles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchLang =
      langFilter === "All" ||
      a.language === langFilter ||
      a.language === "Both";
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      (a.titleHi ?? "").includes(q) ||
      a.excerpt.toLowerCase().includes(q);
    return matchCat && matchLang && matchSearch;
  });

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  function goToArticle(slug: string) {
    void navigate({ to: "/blog/$slug", params: { slug } });
  }

  const recentPosts = blogArticles.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <div className="spiritual-gradient py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {language === "hi" ? "आध्यात्मिक लेख" : "Spiritual Articles"}
          </p>
          <h1
            className="font-heading text-3xl md:text-5xl font-bold"
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {language === "hi" ? "आध्यात्मिक ब्लॉग" : "Spiritual Blog"}
          </h1>
          <p className="mt-3 text-sm" style={{ color: "oklch(0.85 0.02 80)" }}>
            {language === "hi"
              ? "ज्ञान, आध्यात्म, मेडिटेशन और जीवन की गहराइयों पर विचार"
              : "Insights on spirituality, wisdom, meditation and the depths of life"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            {/* Search */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                {language === "hi" ? "खोजें" : "Search"}
              </h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  data-ocid="blog.search_input"
                  placeholder={
                    language === "hi" ? "लेख खोजें..." : "Search articles..."
                  }
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Language filter */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                {language === "hi" ? "भाषा" : "Language"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(["All", "Hindi", "English"] as const).map((l) => (
                  <button
                    type="button"
                    key={l}
                    data-ocid={`blog.lang_filter.${l.toLowerCase()}`}
                    onClick={() => {
                      setLangFilter(l);
                      setPage(1);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      langFilter === l
                        ? "btn-spiritual"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {l === "All" ? (language === "hi" ? "सभी" : "All") : l}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                {language === "hi" ? "श्रेणियाँ" : "Categories"}
              </h3>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        setPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeCategory === cat
                          ? "font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      style={
                        activeCategory === cat
                          ? { color: "oklch(0.62 0.18 48)" }
                          : {}
                      }
                    >
                      {cat === "All"
                        ? language === "hi"
                          ? "सभी"
                          : "All"
                        : cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                {language === "hi" ? "हालिया लेख" : "Recent Posts"}
              </h3>
              <ul className="space-y-3">
                {recentPosts.map((a) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => goToArticle(a.slug)}
                      className="text-left text-sm font-medium hover:text-primary transition-colors line-clamp-2"
                    >
                      {language === "hi" && a.titleHi ? a.titleHi : a.title}
                    </button>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {a.publishDate}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  data-ocid={`blog.category_tab.${cat.toLowerCase().replace(/ /g, "_")}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setPage(1);
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    activeCategory === cat
                      ? "btn-spiritual border-transparent"
                      : "bg-card text-muted-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {cat === "All" ? (language === "hi" ? "सभी" : "All") : cat}
                </button>
              ))}
            </div>

            {/* Article grid */}
            {visible.length === 0 ? (
              <div
                data-ocid="blog.empty_state"
                className="text-center py-16 text-muted-foreground"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-heading font-semibold">
                  {language === "hi" ? "कोई लेख नहीं मिला" : "No articles found"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visible.map((article, i) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={i + 1}
                    language={language}
                    onRead={goToArticle}
                  />
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-10">
                <Button
                  data-ocid="blog.load_more_button"
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                >
                  {language === "hi" ? "और लेख देखें" : "Load More Articles"}
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  index,
  language,
  onRead,
}: {
  article: BlogArticle;
  index: number;
  language: string;
  onRead: (slug: string) => void;
}) {
  const title =
    language === "hi" && article.titleHi ? article.titleHi : article.title;
  const color =
    CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.Spirituality;

  return (
    <article
      data-ocid={`blog.item.${index}`}
      className="blog-card flex flex-col h-full group cursor-pointer"
      onClick={() => onRead(article.slug)}
      onKeyUp={(e) => {
        if (e.key === "Enter") onRead(article.slug);
      }}
    >
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge className={`text-xs font-medium border ${color}`}>
            {article.category}
          </Badge>
          {(article.language === "Hindi" || article.language === "Both") && (
            <span
              className="inline-flex items-center gap-1 text-xs"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              <Volume2 className="w-3 h-3" />
              TTS
            </span>
          )}
          {article.featured && (
            <Badge className="text-xs bg-accent/20 text-accent-foreground border-accent/30">
              ★ Featured
            </Badge>
          )}
        </div>

        <h2
          className="font-heading font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {title}
        </h2>
        {language !== "hi" && article.titleHi && (
          <p className="text-sm devanagari mb-2 text-muted-foreground line-clamp-1">
            {article.titleHi}
          </p>
        )}

        <p
          className={`text-sm text-muted-foreground line-clamp-3 flex-1 mb-4 ${
            article.language === "Hindi" ? "devanagari" : ""
          }`}
        >
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">{article.author}</span>
            <span className="mx-1">•</span>
            <span className="inline-flex items-center gap-0.5">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
          <Button
            size="sm"
            data-ocid={`blog.read_button.${index}`}
            className="btn-spiritual text-xs px-3 py-1 h-auto"
            onClick={(e) => {
              e.stopPropagation();
              onRead(article.slug);
            }}
          >
            {language === "hi" ? "पढ़ें" : "Read More"}
          </Button>
        </div>
      </div>
    </article>
  );
}
