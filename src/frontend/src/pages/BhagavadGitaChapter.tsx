import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bhagavadGitaChapters } from "@/data/bhagavadGitaChapters";
import { useLanguage } from "@/hooks/useLanguage";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Tag,
} from "lucide-react";
import { motion } from "motion/react";

const en = {
  chapter: "Chapter",
  verses: "verses",
  backToAll: "All Chapters",
  keyVerse: "Key Verse",
  transliteration: "Transliteration",
  meaning: "Meaning",
  themes: "Themes",
  related: "Related Chapters",
  ctaTitle: "Discuss this chapter with Krishna",
  ctaSub:
    "Ask Krishna how the teachings of this chapter apply to your life right now.",
  ctaBtn: "Talk to Krishna",
  prevChapter: "Previous Chapter",
  nextChapter: "Next Chapter",
  notFound: "Chapter not found",
};

const hi = {
  chapter: "अध्याय",
  verses: "श्लोक",
  backToAll: "सभी अध्याय",
  keyVerse: "प्रमुख श्लोक",
  transliteration: "रोमन लिपि",
  meaning: "अर्थ",
  themes: "विषय",
  related: "संबंधित अध्याय",
  ctaTitle: "इस अध्याय पर कृष्ण से चर्चा करें",
  ctaSub: "कृष्ण से पूछें कि इस अध्याय की शिक्षाएं अभी आपके जीवन पर कैसे लागू होती हैं।",
  ctaBtn: "कृष्ण से बात करें",
  prevChapter: "पिछला अध्याय",
  nextChapter: "अगला अध्याय",
  notFound: "अध्याय नहीं मिला",
};

export default function BhagavadGitaChapter() {
  const { language } = useLanguage();
  const t = language === "hi" ? hi : en;
  const { chapterId } = useParams({ from: "/bhagavad-gita/$chapterId" });

  const chapter = bhagavadGitaChapters.find((c) => c.slug === chapterId);

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{t.notFound}</p>
          <Link to="/bhagavad-gita">
            <Button type="button" variant="outline">
              {t.backToAll}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const prevChapter =
    chapter.id > 1 ? bhagavadGitaChapters[chapter.id - 2] : null;
  const nextChapter = chapter.id < 18 ? bhagavadGitaChapters[chapter.id] : null;
  const relatedChapters = bhagavadGitaChapters
    .filter((c) => c.id !== chapter.id && Math.abs(c.id - chapter.id) <= 2)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card border-b py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/bhagavad-gita"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToAll}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {chapter.id}
                </span>
              </div>
              <Badge variant="outline" className="text-sm">
                <BookOpen className="h-3.5 w-3.5 mr-1" />
                {chapter.verseCount} {t.verses}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-1">
              {t.chapter} {chapter.id} —{" "}
              {language === "hi" ? chapter.nameHindi : chapter.name}
            </h1>
            <p className="text-xl text-primary font-devanagari mb-1">
              {chapter.sankhyaNameDevanagari}
            </p>
            <p className="text-base text-muted-foreground italic">
              {chapter.sankhyaName}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p className="text-lg text-foreground leading-relaxed">
            {language === "hi" ? chapter.summaryHindi : chapter.summary}
          </p>
        </motion.section>

        {/* Key Verse */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-ocid="chapter.key_verse"
        >
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="h-1 w-6 bg-primary rounded-full inline-block" />
            {t.keyVerse}
          </h2>
          <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 space-y-4">
            <p className="text-xl font-devanagari text-foreground leading-relaxed text-center">
              {chapter.keyVerse.sanskrit}
            </p>
            <div className="border-t border-primary/20 pt-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                {t.transliteration}
              </p>
              <p className="text-sm italic text-muted-foreground">
                {chapter.keyVerse.transliteration}
              </p>
            </div>
            <div className="border-t border-primary/20 pt-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                {t.meaning}
              </p>
              <p className="text-base text-foreground">
                {chapter.keyVerse.meaning}
              </p>
            </div>
          </div>
        </motion.section>

        {/* Themes */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          data-ocid="chapter.themes"
        >
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            {t.themes}
          </h2>
          <div className="flex flex-wrap gap-2">
            {chapter.themes.map((theme) => (
              <Badge
                key={theme}
                variant="secondary"
                className="text-sm px-4 py-1.5"
              >
                {theme}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* Related Chapters */}
        {relatedChapters.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-bold text-foreground mb-4">
              {t.related}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedChapters.map((rel) => (
                <Link
                  key={rel.id}
                  to="/bhagavad-gita/$chapterId"
                  params={{ chapterId: rel.slug }}
                  data-ocid={`chapter.related.${rel.id}`}
                >
                  <div className="border rounded-lg p-4 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                    <p className="text-xs text-muted-foreground mb-1">
                      {t.chapter} {rel.id}
                    </p>
                    <p className="text-sm font-semibold text-foreground leading-snug">
                      {language === "hi" ? rel.nameHindi : rel.name}
                    </p>
                    <p className="text-xs text-primary mt-1">
                      {rel.sankhyaNameDevanagari}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Prev / Next */}
        <div className="flex justify-between gap-4 border-t pt-8">
          {prevChapter ? (
            <Link
              to="/bhagavad-gita/$chapterId"
              params={{ chapterId: prevChapter.slug }}
              data-ocid="chapter.prev_button"
            >
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t.prevChapter}:</span>{" "}
                {prevChapter.id}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextChapter ? (
            <Link
              to="/bhagavad-gita/$chapterId"
              params={{ chapterId: nextChapter.slug }}
              data-ocid="chapter.next_button"
            >
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
              >
                <span className="hidden sm:inline">{t.nextChapter}:</span>{" "}
                {nextChapter.id}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* CTA */}
      <section className="bg-muted/40 border-t py-14 px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <MessageCircle className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3 font-display">
            {t.ctaTitle}
          </h2>
          <p className="text-muted-foreground mb-6">{t.ctaSub}</p>
          <Link to="/ask-krishna">
            <Button
              type="button"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="chapter.ask_krishna_button"
            >
              {t.ctaBtn}
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
