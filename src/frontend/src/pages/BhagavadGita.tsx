import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { bhagavadGitaChapters } from "@/data/bhagavadGitaChapters";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@tanstack/react-router";
import { BookOpen, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const en = {
  title: "All 18 Chapters of the Bhagavad Gita",
  subtitle:
    "Explore Krishna's complete teaching to Arjuna — from the battlefield dilemma to ultimate liberation.",
  chapter: "Chapter",
  verses: "verses",
  read: "Read Chapter",
  cta: "Want Personalized Guidance from Krishna?",
  ctaSub:
    "Reading the Gita is powerful. But imagine Krishna speaking directly to you, about your specific situation, using wisdom from all 18 chapters.",
  ctaBtn: "Talk to Krishna — 5 Free Messages",
};

const hi = {
  title: "भगवद्गीता के सभी 18 अध्याय",
  subtitle: "युद्धक्षेत्र के द्वंद्व से लेकर परम मुक्ति तक — कृष्ण की अर्जुन को सम्पूर्ण शिक्षा",
  chapter: "अध्याय",
  verses: "श्लोक",
  read: "अध्याय पढ़ें",
  cta: "क्या आप कृष्ण से व्यक्तिगत मार्गदर्शन चाहते हैं?",
  ctaSub:
    "गीता पढ़ना शक्तिशाली है। लेकिन कल्पना करें कि कृष्ण सीधे आपसे, आपकी विशेष परिस्थिति के बारे में बात कर रहे हैं।",
  ctaBtn: "कृष्ण से बात करें — 5 मुफ्त संदेश",
};

export default function BhagavadGita() {
  const { language } = useLanguage();
  const t = language === "hi" ? hi : en;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-card border-b py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
            Complete Guide
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight font-display">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-ocid="gita.list"
        >
          {bhagavadGitaChapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (index % 6) * 0.07 }}
              data-ocid={`gita.item.${chapter.id}`}
            >
              <Card className="h-full flex flex-col border hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <div className="bg-primary/5 border-b px-5 pt-5 pb-4 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                    <span className="text-xs text-muted-foreground leading-none">
                      {t.chapter}
                    </span>
                    <span className="text-xl font-bold text-primary leading-none">
                      {chapter.id}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <Badge variant="outline" className="text-xs mb-1">
                      {chapter.verseCount} {t.verses}
                    </Badge>
                    <h2 className="text-base font-semibold text-foreground leading-snug">
                      {language === "hi" ? chapter.nameHindi : chapter.name}
                    </h2>
                  </div>
                </div>
                <div className="px-5 py-4 flex-1 flex flex-col gap-3">
                  <div>
                    <p className="text-xs font-medium text-primary">
                      {chapter.sankhyaName}
                    </p>
                    <p className="text-sm text-muted-foreground font-devanagari">
                      {chapter.sankhyaNameDevanagari}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                    {language === "hi" ? chapter.summaryHindi : chapter.summary}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {chapter.themes.slice(0, 2).map((theme) => (
                      <Badge
                        key={theme}
                        variant="secondary"
                        className="text-xs"
                      >
                        {theme}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    to="/bhagavad-gita/$chapterId"
                    params={{ chapterId: chapter.slug }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="w-full mt-1 hover:bg-primary hover:text-primary-foreground transition-colors"
                      data-ocid={`gita.read_button.${chapter.id}`}
                    >
                      {t.read}
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/40 border-t py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <MessageCircle className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-display">
            {t.cta}
          </h2>
          <p className="text-muted-foreground mb-6">{t.ctaSub}</p>
          <Link to="/ask-krishna">
            <Button
              type="button"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="gita.ask_krishna_button"
            >
              {t.ctaBtn}
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
