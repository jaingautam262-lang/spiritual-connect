import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  Clock,
  Share2,
  User,
} from "lucide-react";
import { hindiArticles } from "../data/hindiArticlesData";
import { useLanguage } from "../hooks/useLanguage";

export default function BlogArticleDetail() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const { articleId } = useParams({ from: "/hindi-blog/$articleId" });

  const currentIdx = hindiArticles.findIndex((a) => a.id === articleId);
  const article = hindiArticles[currentIdx];

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <span className="text-5xl">🕉️</span>
        <h1 className="text-xl font-semibold text-foreground">
          {hi ? "लेख नहीं मिला" : "Article not found"}
        </h1>
        <Link to="/hindi-blog" className="text-primary hover:underline text-sm">
          {hi ? "← वापस जाएं" : "← Go back"}
        </Link>
      </div>
    );
  }

  const prevArticle = currentIdx > 0 ? hindiArticles[currentIdx - 1] : null;
  const nextArticle =
    currentIdx < hindiArticles.length - 1
      ? hindiArticles[currentIdx + 1]
      : null;

  const relatedArticles = hindiArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <Link
            to="/hindi-blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
            data-ocid="article.back_link"
          >
            <ChevronLeft className="w-4 h-4" />
            {hi ? "सभी लेख" : "All Articles"}
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main article */}
          <article className="flex-1 min-w-0">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                {article.category}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {article.readTime}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {new Date(article.date).toLocaleDateString(
                  hi ? "hi-IN" : "en-IN",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 leading-tight">
              {hi ? article.title : article.titleEn}
            </h1>

            {/* Author + Share */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleShare}
                data-ocid="article.share_button"
                className="flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                {hi ? "शेयर करें" : "Share"}
              </Button>
            </div>

            {/* Excerpt */}
            <p className="text-base text-muted-foreground leading-relaxed mb-6 italic border-l-4 border-primary/40 pl-4 bg-primary/5 py-3 rounded-r-lg">
              {article.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-sm max-w-none text-foreground leading-relaxed space-y-4">
              {article.content.split("\n\n").map((para, i) => {
                const trimmed = para.trim();
                if (!trimmed) return null;
                // Detect headings (short lines ending in specific patterns)
                if (
                  trimmed.length < 80 &&
                  !trimmed.includes("।") &&
                  (i === 0 || para.startsWith("\n"))
                ) {
                  return (
                    <h2
                      key={`h-${i}-${trimmed.slice(0, 10)}`}
                      className="text-lg font-display font-semibold text-primary mt-6 mb-2"
                    >
                      {trimmed}
                    </h2>
                  );
                }
                return (
                  <p
                    key={`p-${i}-${trimmed.slice(0, 10)}`}
                    className="text-foreground leading-relaxed"
                  >
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Prev / Next navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {prevArticle ? (
                <Link
                  to="/hindi-blog/$articleId"
                  params={{ articleId: prevArticle.id }}
                  data-ocid="article.prev_link"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {hi ? "पिछला लेख" : "Previous"}
                    </p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-1">
                      {hi ? prevArticle.title : prevArticle.titleEn}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextArticle ? (
                <Link
                  to="/hindi-blog/$articleId"
                  params={{ articleId: nextArticle.id }}
                  data-ocid="article.next_link"
                  className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors group text-right justify-end"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {hi ? "अगला लेख" : "Next"}
                    </p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary line-clamp-1">
                      {hi ? nextArticle.title : nextArticle.titleEn}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                  {hi ? "संबंधित लेख" : "Related Articles"}
                </h3>
                <div className="space-y-3">
                  {relatedArticles.map((rel, idx) => (
                    <Link
                      key={rel.id}
                      to="/hindi-blog/$articleId"
                      params={{ articleId: rel.id }}
                      data-ocid={`sidebar.related.${idx + 1}`}
                      className="block group"
                    >
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {hi ? rel.title : rel.titleEn}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {rel.readTime}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Krishna AI CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 p-5 text-center">
              <span className="text-3xl">🙏</span>
              <h3 className="font-display font-semibold text-foreground mt-2 mb-1 text-base">
                {hi ? "कृष्ण AI" : "Krishna AI"}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {hi
                  ? "भगवद्गीता पर आधारित AI से अपने प्रश्न पूछें"
                  : "Ask your questions to Gita-based AI"}
              </p>
              <Link
                to="/ask-krishna"
                data-ocid="sidebar.krishna_ai_link"
                className="inline-block px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {hi ? "पूछें" : "Ask Now"}
              </Link>
            </div>

            {/* All articles */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 text-sm">
                {hi ? "सभी लेख" : "All Articles"}
              </h3>
              <div className="space-y-2">
                {hindiArticles.slice(0, 6).map((a, idx) => (
                  <Link
                    key={a.id}
                    to="/hindi-blog/$articleId"
                    params={{ articleId: a.id }}
                    data-ocid={`sidebar.all_articles.${idx + 1}`}
                    className={`block text-sm py-1 transition-colors ${
                      a.id === articleId
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {hi ? a.title : a.titleEn}
                  </Link>
                ))}
              </div>
              <Link
                to="/hindi-blog"
                data-ocid="sidebar.view_all_link"
                className="block text-xs text-primary font-medium mt-3 hover:underline"
              >
                {hi ? "सभी देखें →" : "View all →"}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
