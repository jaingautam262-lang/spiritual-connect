import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { useMemo, useState } from "react";
import { type BlogArticle, blogArticles } from "../data/blog-data";
import {
  useBlogArticleBySlug,
  usePublishedBlogArticles,
} from "../hooks/useQueries";

const CATEGORY_META: Record<
  string,
  { emoji: string; label: string; labelHindi: string }
> = {
  "spiritual-articles": {
    emoji: "🕉️",
    label: "Spiritual Articles",
    labelHindi: "आध्यात्मिक लेख",
  },
  "puja-guides": { emoji: "🪔", label: "Puja Guides", labelHindi: "पूजा गाइड" },
  "astrology-tips": {
    emoji: "🪐",
    label: "Astrology Tips",
    labelHindi: "ज्योतिष सुझाव",
  },
  "festival-guides": {
    emoji: "🎉",
    label: "Festival Guides",
    labelHindi: "त्योहार गाइड",
  },
  "health-spirituality": {
    emoji: "🌿",
    label: "Health & Spirituality",
    labelHindi: "स्वास्थ्य & आध्यात्म",
  },
};

function RelatedCard({
  article,
  lang,
}: { article: BlogArticle; lang: "en" | "hi" }) {
  const meta = CATEGORY_META[article.category];
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: article.slug }}
      className="flex gap-3 p-4 rounded-xl border transition-all hover:border-amber-500/30 group"
      style={{
        background: "oklch(0.18 0.07 28 / 0.6)",
        borderColor: "oklch(0.78 0.14 75 / 0.12)",
      }}
      data-ocid="blog.related_article_link"
    >
      <div
        className="h-14 w-14 shrink-0 rounded-lg flex items-center justify-center text-2xl"
        style={{ background: "oklch(0.68 0.18 48 / 0.15)" }}
      >
        {meta?.emoji ?? "📖"}
      </div>
      <div className="min-w-0">
        <p
          className="text-sm font-semibold line-clamp-2 group-hover:text-amber-300 transition-colors"
          style={{ color: "oklch(0.85 0.06 75)" }}
        >
          {lang === "hi" ? article.titleHindi : article.title}
        </p>
        <p className="text-xs mt-1" style={{ color: "oklch(0.55 0.04 50)" }}>
          {article.author}
        </p>
      </div>
    </Link>
  );
}

export default function BlogDetail() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const [lang, setLang] = useState<"en" | "hi">("en");

  const { data: backendArticle, isLoading } = useBlogArticleBySlug(slug);
  const { data: allBackendArticles } = usePublishedBlogArticles();

  const article = useMemo<BlogArticle | null>(() => {
    if (backendArticle) return backendArticle;
    return blogArticles.find((a) => a.slug === slug) ?? null;
  }, [backendArticle, slug]);

  const allArticles = useMemo<BlogArticle[]>(() => {
    if (allBackendArticles && allBackendArticles.length > 0)
      return allBackendArticles;
    return blogArticles;
  }, [allBackendArticles]);

  const related = useMemo<BlogArticle[]>(() => {
    if (!article) return [];
    return allArticles
      .filter((a) => a.id !== article.id && a.category === article.category)
      .slice(0, 3);
  }, [article, allArticles]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen px-4 py-10"
        style={{ background: "oklch(0.13 0.05 25)" }}
      >
        <div className="container mx-auto max-w-4xl">
          <Skeleton className="h-8 w-40 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-8 rounded-2xl" />
          <div className="space-y-4">
            {["l1", "l2", "l3", "l4", "l5", "l6"].map((sk) => (
              <Skeleton key={sk} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "oklch(0.13 0.05 25)" }}
      >
        <span className="text-4xl">📭</span>
        <h1
          className="text-xl font-heading"
          style={{ color: "oklch(0.85 0.06 75)" }}
        >
          Article not found
        </h1>
        <Link to="/blog">
          <Button
            variant="outline"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.4)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  const meta = CATEGORY_META[article.category];
  const displayTitle = lang === "hi" ? article.titleHindi : article.title;
  const displayContent = lang === "hi" ? article.contentHindi : article.content;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.13 0.05 25)" }}>
      {/* Hero */}
      <section
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.10 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          {/* Back + Lang */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/blog" data-ocid="blog.back_link">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.3)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {lang === "hi" ? "ब्लॉग पर वापस" : "Back to Blog"}
              </Button>
            </Link>
            <button
              type="button"
              onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
              className="px-4 py-1.5 rounded-full text-xs font-semibold border transition-all"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                color: "oklch(0.78 0.14 75)",
                background: "oklch(0.78 0.14 75 / 0.08)",
              }}
              data-ocid="blog_detail.language_toggle"
            >
              {lang === "en" ? "हिन्दी" : "English"}
            </button>
          </div>

          {/* Category badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "oklch(0.68 0.18 48 / 0.2)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            <span>{meta?.emoji}</span>
            <span>{lang === "hi" ? meta?.labelHindi : meta?.label}</span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl md:text-4xl font-heading font-bold leading-tight mb-5"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            {displayTitle}
          </h1>

          {/* Meta row */}
          <div
            className="flex flex-wrap gap-4 text-xs"
            style={{ color: "oklch(0.60 0.04 55)" }}
          >
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(article.publishDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-10">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Article Body */}
            <div className="lg:col-span-2">
              <div
                className="prose prose-sm max-w-none leading-relaxed"
                style={
                  {
                    color: "oklch(0.80 0.04 65)",
                    "--tw-prose-headings": "oklch(0.85 0.10 68)",
                    "--tw-prose-strong": "oklch(0.78 0.14 75)",
                  } as React.CSSProperties
                }
                // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled internal content
                dangerouslySetInnerHTML={{ __html: displayContent }}
              />

              {/* Tags */}
              {article.tags.length > 0 && (
                <div
                  className="mt-8 pt-6 border-t"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.12)" }}
                >
                  <p
                    className="text-xs mb-3 flex items-center gap-1.5"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    <Tag className="h-3.5 w-3.5" />
                    {lang === "hi" ? "टैग:" : "Tags:"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: "oklch(0.78 0.14 75 / 0.12)",
                          color: "oklch(0.78 0.14 75)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — Related */}
            <aside className="lg:col-span-1">
              {related.length > 0 && (
                <div
                  className="rounded-2xl p-5 border sticky top-24"
                  style={{
                    background: "oklch(0.18 0.07 28 / 0.6)",
                    borderColor: "oklch(0.78 0.14 75 / 0.12)",
                  }}
                >
                  <h3
                    className="text-sm font-heading font-bold mb-4"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {lang === "hi" ? "संबंधित लेख" : "Related Articles"}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {related.map((rel) => (
                      <RelatedCard key={rel.id} article={rel} lang={lang} />
                    ))}
                  </div>
                  <Link
                    to="/blog"
                    className="block mt-5 text-center text-xs underline"
                    style={{ color: "oklch(0.68 0.18 48)" }}
                  >
                    {lang === "hi" ? "सभी लेख देखें →" : "View all articles →"}
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
