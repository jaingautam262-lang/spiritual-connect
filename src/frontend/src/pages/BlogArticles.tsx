import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { BookOpen, Calendar, Clock, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { hindiArticles } from "../data/hindiArticlesData";
import { useLanguage } from "../hooks/useLanguage";

const CATEGORIES = [
  { value: "all", label: "सभी", labelEn: "All" },
  { value: "आध्यात्मिक", label: "आध्यात्मिक", labelEn: "Spiritual" },
  { value: "पौराणिक", label: "पौराणिक", labelEn: "Mythological" },
  {
    value: "विज्ञान और धर्म",
    label: "विज्ञान और धर्म",
    labelEn: "Science & Religion",
  },
];

export default function BlogArticles() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return hindiArticles.filter((a) => {
      const matchCat =
        activeCategory === "all" || a.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.titleEn.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-4xl">🕉️</span>
            <h1 className="text-3xl font-display font-bold text-primary">
              {hi ? "दिव्य ज्ञान लेख" : "Divya Gyan Articles"}
            </h1>
            <p className="text-muted-foreground max-w-xl text-sm">
              {hi
                ? "हिंदी में आध्यात्मिक, पौराणिक और ज्ञानवर्धक लेखों का संग्रह"
                : "A collection of spiritual, mythological and enlightening articles in Hindi"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={hi ? "लेख खोजें..." : "Search articles..."}
              className="pl-9"
              data-ocid="blog.search_input"
            />
          </div>
          <div
            className="flex flex-wrap gap-2"
            data-ocid="blog.category_filter"
          >
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                data-ocid={`blog.category.${i + 1}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                }`}
              >
                {hi ? cat.label : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <p className="text-sm text-muted-foreground mb-6">
          {hi
            ? `${filtered.length} लेख मिले`
            : `${filtered.length} article${filtered.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Articles Grid */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="blog.empty_state"
          >
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-muted-foreground">
              {hi ? "कोई लेख नहीं मिला" : "No articles found"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, idx) => (
              <Link
                key={article.id}
                to="/hindi-blog/$articleId"
                params={{ articleId: article.id }}
                data-ocid={`blog.item.${idx + 1}`}
                className="group bg-card rounded-2xl border border-border hover:border-primary/40 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
              >
                {/* Color accent header */}
                <div className="h-2 bg-gradient-to-r from-primary to-accent" />

                <div className="p-5 flex flex-col flex-1 gap-3">
                  {/* Category + read time */}
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium bg-primary/10 text-primary border-primary/20"
                    >
                      {article.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {hi ? article.title : article.titleEn}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString(
                        hi ? "hi-IN" : "en-IN",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </span>
                    <span className="text-xs text-primary font-medium group-hover:underline">
                      {hi ? "पढ़ें →" : "Read →"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-card rounded-2xl border border-border p-8">
          <span className="text-3xl">🙏</span>
          <h3 className="font-display font-semibold text-foreground text-xl mt-3 mb-2">
            {hi ? "कृष्ण AI से जुड़ें" : "Connect with Krishna AI"}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {hi
              ? "भगवद्गीता के ज्ञान पर आधारित AI से अपने जीवन के प्रश्न पूछें"
              : "Ask life questions guided by the wisdom of Bhagavad Gita AI"}
          </p>
          <Link
            to="/ask-krishna"
            data-ocid="blog.krishna_ai_cta"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            {hi ? "कृष्ण से पूछें" : "Ask Krishna"}
          </Link>
        </div>
      </div>
    </div>
  );
}
