import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, Pause, Play, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { blogArticles } from "../data/blogData";
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

export default function BlogArticle() {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [ttsReady, setTtsReady] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const article = blogArticles.find((a) => a.slug === slug);
  const related = article
    ? blogArticles
        .filter((a) => a.slug !== slug && a.category === article.category)
        .slice(0, 3)
    : [];

  // Auto-play TTS on article open
  useEffect(() => {
    if (!article) return;
    const textToSpeak = article.ttsText ?? article.excerpt;
    if (!textToSpeak || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = article.language === "Hindi" ? "hi-IN" : "en-US";
    utterance.rate = 0.9;

    // Pick language-appropriate voice when available
    const voices = window.speechSynthesis.getVoices();
    const langCode = article.language === "Hindi" ? "hi" : "en";
    const preferred = voices.find((v) => v.lang.startsWith(langCode));
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    setTtsReady(true);

    // Small delay to let voices load
    const timer = setTimeout(() => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }, 600);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    };
  }, [article]);

  function toggleTTS() {
    if (!utteranceRef.current) return;
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else {
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utteranceRef.current);
      }
      setIsPlaying(true);
    }
  }

  function handleShare() {
    if (navigator.share && article) {
      void navigator.share({ title: article.title, url: window.location.href });
    } else {
      void navigator.clipboard.writeText(window.location.href);
    }
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">
            {language === "hi" ? "लेख नहीं मिला" : "Article not found"}
          </p>
          <Button
            className="mt-4"
            onClick={() => void navigate({ to: "/blog" })}
          >
            {language === "hi" ? "वापस जाएं" : "Back to Blog"}
          </Button>
        </div>
      </div>
    );
  }

  const title =
    language === "hi" && article.titleHi ? article.titleHi : article.title;
  const color =
    CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.Spirituality;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="spiritual-gradient py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            type="button"
            data-ocid="blog.back_button"
            onClick={() => void navigate({ to: "/blog" })}
            className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
            style={{ color: "oklch(0.85 0.02 80)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "hi" ? "ब्लॉग पर वापस" : "Back to Blog"}
          </button>
          <Badge className={`text-xs mb-3 border ${color}`}>
            {article.category}
          </Badge>
          <h1
            className={`font-heading text-2xl md:text-4xl font-bold mb-3 ${
              article.language === "Hindi" ? "devanagari" : ""
            }`}
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {title}
          </h1>
          {language !== "hi" && article.titleHi && (
            <p
              className="text-sm devanagari mb-3"
              style={{ color: "oklch(0.85 0.02 80)" }}
            >
              {article.titleHi}
            </p>
          )}
          <div
            className="flex items-center gap-4 text-sm"
            style={{ color: "oklch(0.75 0.03 70)" }}
          >
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.publishDate}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Body */}
          <div className="flex-1 min-w-0">
            {/* TTS Bar */}
            {ttsReady && (
              <div
                data-ocid="blog.tts_bar"
                className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3 mb-8"
              >
                <button
                  type="button"
                  data-ocid="blog.tts_toggle"
                  onClick={toggleTTS}
                  className={`speaker-btn ${isPlaying ? "playing" : ""}`}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {isPlaying
                      ? language === "hi"
                        ? "आलेख पढ़ा जा रहा है..."
                        : "🔊 Reading article..."
                      : language === "hi"
                        ? "सुनने के लिए दबाएं"
                        : "Press to listen"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {article.language === "Hindi"
                      ? "Hindi (hi-IN)"
                      : "English (en-US)"}
                  </p>
                </div>
                <button
                  type="button"
                  data-ocid="blog.share_button"
                  onClick={handleShare}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            )}

            {/* Article Content */}
            <div
              className={`prose prose-sm max-w-none space-y-4 ${
                article.language === "Hindi" ? "devanagari" : ""
              }`}
              style={{
                lineHeight: article.language === "Hindi" ? "2" : "1.75",
              }}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: article HTML from local data
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border">
                <h3
                  className="font-heading font-bold text-xl mb-6"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {language === "hi" ? "संबंधित लेख" : "Related Articles"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {related.map((a) => (
                    <button
                      type="button"
                      key={a.id}
                      data-ocid={`blog.related_article.${a.id}`}
                      onClick={() =>
                        void navigate({
                          to: "/blog/$slug",
                          params: { slug: a.slug },
                        })
                      }
                      className="blog-card text-left p-4 hover:border-primary/40 transition-colors"
                    >
                      <Badge className={`text-xs mb-2 border ${color}`}>
                        {a.category}
                      </Badge>
                      <p
                        className="font-heading font-semibold text-sm line-clamp-2"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        {language === "hi" && a.titleHi ? a.titleHi : a.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {a.readTime}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-4">
              <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                {language === "hi" ? "हालिया लेख" : "Recent Posts"}
              </h3>
              <ul className="space-y-3">
                {blogArticles.slice(0, 6).map((a) => (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() =>
                        void navigate({
                          to: "/blog/$slug",
                          params: { slug: a.slug },
                        })
                      }
                      className={`text-left text-sm transition-colors line-clamp-2 ${
                        a.slug === slug
                          ? "font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {language === "hi" && a.titleHi ? a.titleHi : a.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
