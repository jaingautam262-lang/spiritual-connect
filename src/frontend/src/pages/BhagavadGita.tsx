import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { bhagavadGitaChapters } from "@/data/bhagavadGitaChapters";
import {
  type GitaVerse,
  famousVerses,
  searchVerses,
} from "@/data/bhagavadGitaVerses";
import { useLanguage } from "@/hooks/useLanguage";
import { Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, MessageCircle, Search, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const devanagariNumerals = [
  "०",
  "१",
  "२",
  "३",
  "४",
  "५",
  "६",
  "७",
  "८",
  "९",
  "१०",
  "११",
  "१२",
  "१३",
  "१४",
  "१५",
  "१६",
  "१७",
  "१८",
];

const en = {
  title: "Bhagavad Gita — All 18 Chapters",
  subtitle:
    "Explore Krishna's complete teaching to Arjuna — from the battlefield dilemma to ultimate liberation.",
  stats: "18 Chapters",
  statsVerses: "700 Verses",
  statsYogas: "6 Yogas",
  famousTitle: "Famous Verses",
  famousSub: "The most celebrated shlokas from the Gita",
  allChapters: "All 18 Chapters",
  searchPlaceholder: "Search by keyword or verse (e.g. 2.47)...",
  searchBtn: "Search all verses",
  verses: "verses",
  read: "Read Chapter",
  cta: "Want Personalized Guidance from Krishna?",
  ctaSub:
    "Reading the Gita is powerful. But imagine Krishna speaking directly to you, about your specific situation.",
  ctaBtn: "Talk to Krishna — 5 Free Messages",
  chapter: "Chapter",
  transliteration: "Transliteration",
  goToChapter: "Go to chapter",
  famousTag: "Famous",
};

const hi = {
  title: "भगवद्गीता — सभी 18 अध्याय",
  subtitle: "युद्धक्षेत्र के द्वंद्व से लेकर परम मुक्ति तक — कृष्ण की अर्जुन को सम्पूर्ण शिक्षा",
  stats: "18 अध्याय",
  statsVerses: "700 श्लोक",
  statsYogas: "6 योग",
  famousTitle: "प्रसिद्ध श्लोक",
  famousSub: "गीता के सबसे प्रसिद्ध श्लोक",
  allChapters: "सभी 18 अध्याय",
  searchPlaceholder: "श्लोक खोजें (e.g. 2.47, कर्म, karma)...",
  searchBtn: "सभी श्लोक खोजें",
  verses: "श्लोक",
  read: "अध्याय पढ़ें",
  cta: "क्या आप कृष्ण से व्यक्तिगत मार्गदर्शन चाहते हैं?",
  ctaSub: "गीता पढ़ना शक्तिशाली है। लेकिन कल्पना करें कि कृष्ण सीधे आपसे बात कर रहे हैं।",
  ctaBtn: "कृष्ण से बात करें — 5 मुफ़्त संदेश",
  chapter: "अध्याय",
  transliteration: "रोमन लिपि",
  goToChapter: "अध्याय पर जाएं",
  famousTag: "प्रसिद्ध",
};

function FamousVerseCard({
  verse,
  t,
  language,
}: { verse: GitaVerse; t: typeof en; language: string }) {
  const chapterNum = verse.chapter;
  const chapterSlug = `chapter-${chapterNum}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border-2 border-primary/40 bg-primary/5 overflow-hidden flex flex-col"
      data-ocid={`gita.famous_verse.${verse.chapter}_${verse.verse}`}
    >
      {/* Header */}
      <div className="bg-primary/10 border-b border-primary/20 px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-primary fill-primary" />
          <span className="text-xs font-bold text-primary">
            {t.chapter} {verse.chapter}.{verse.verse}
          </span>
        </div>
        {verse.famousTag && (
          <Badge
            variant="outline"
            className="text-xs border-primary/40 text-primary"
          >
            {verse.famousTag}
          </Badge>
        )}
      </div>
      {/* Sanskrit */}
      <div className="px-5 py-4 flex-1">
        <p className="font-devanagari text-lg leading-loose text-foreground text-center whitespace-pre-line">
          {verse.sanskrit.length > 160
            ? `${verse.sanskrit.substring(0, 160)}...`
            : verse.sanskrit}
        </p>
      </div>
      {/* Hindi/English meaning */}
      <div className="bg-card border-t border-border px-5 py-3">
        <p className="text-sm font-devanagari text-primary font-medium leading-relaxed">
          {language === "hi" ? verse.hindi : verse.english}
        </p>
      </div>
      {/* Go to chapter */}
      <div className="bg-muted/30 border-t border-border px-5 py-2.5 flex justify-end">
        <Link
          to="/bhagavad-gita/$chapterId"
          params={{ chapterId: chapterSlug }}
          data-ocid={`gita.famous_verse_link.${verse.chapter}_${verse.verse}`}
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
          >
            <BookOpen className="h-3 w-3" />
            {t.goToChapter} {verse.chapter}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function BhagavadGita() {
  const { language } = useLanguage();
  const t = language === "hi" ? hi : en;
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GitaVerse[] | null>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      void navigate({ to: "/gita/search", search: { q: searchQuery.trim() } });
    }
  }

  function handleInstantSearch(q: string) {
    setSearchQuery(q);
    if (q.trim().length >= 2) {
      setSearchResults(searchVerses(q).slice(0, 4));
    } else {
      setSearchResults(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-card border-b py-14 px-4 text-center">
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
            श्रीमद्भगवद्गीता
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight font-display">
            {t.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {t.subtitle}
          </p>

          {/* Stats Banner */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { label: t.stats, icon: "18" },
              { label: t.statsVerses, icon: "१००" },
              { label: t.statsYogas, icon: "6" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2"
              >
                <span className="text-base font-bold text-primary font-devanagari">
                  {stat.icon}
                </span>
                <span className="text-sm font-medium text-primary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Search */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => handleInstantSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-10 pr-24 h-12 text-base"
                data-ocid="gita.search_input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults(null);
                  }}
                  className="absolute right-24 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <Button
                type="submit"
                size="sm"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground"
                data-ocid="gita.search_submit_button"
              >
                {t.searchBtn}
              </Button>
            </div>

            {/* Instant results dropdown */}
            <AnimatePresence>
              {searchResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute left-0 right-0 top-full mt-1 bg-card border rounded-xl shadow-xl z-50 overflow-hidden"
                  data-ocid="gita.instant_results"
                >
                  {searchResults.map((v) => (
                    <Link
                      key={`${v.chapter}.${v.verse}`}
                      to="/bhagavad-gita/$chapterId"
                      params={{ chapterId: `chapter-${v.chapter}` }}
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults(null);
                      }}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-primary/10 transition-colors border-b last:border-0"
                      data-ocid={`gita.instant_result.${v.chapter}_${v.verse}`}
                    >
                      <span className="shrink-0 w-12 text-xs font-bold text-primary mt-0.5">
                        {v.chapter}.{v.verse}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-devanagari text-foreground line-clamp-1">
                          {v.sanskrit}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {v.english}
                        </p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    to="/gita/search"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults(null);
                    }}
                    className="block text-center px-4 py-2.5 text-xs text-primary font-semibold hover:bg-primary/5 transition-colors"
                  >
                    <Search className="inline h-3 w-3 mr-1" />
                    {t.searchBtn} →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </section>

      {/* Famous Verses */}
      <section className="bg-muted/30 border-b py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-6 w-6 text-primary fill-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                {t.famousTitle}
              </h2>
            </div>
            <p className="text-muted-foreground">{t.famousSub}</p>
          </motion.div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            data-ocid="gita.famous_verses_list"
          >
            {famousVerses.map((verse) => (
              <FamousVerseCard
                key={`${verse.chapter}.${verse.verse}`}
                verse={verse}
                t={t}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Grid */}
      <section className="max-w-7xl mx-auto px-4 py-14" id="chapter-1">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-foreground mb-8 font-display flex items-center gap-2"
        >
          <span className="h-1 w-6 bg-primary rounded-full inline-block" />
          {t.allChapters}
        </motion.h2>
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
              <Card className="h-full flex flex-col border-2 border-border hover:border-primary/50 hover:shadow-[0_0_24px_oklch(0.62_0.18_48_/_0.18)] transition-all duration-300 overflow-hidden group">
                {/* Chapter Header */}
                <div className="bg-primary/5 border-b px-5 pt-5 pb-4 flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex flex-col items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-xl font-bold text-primary font-devanagari leading-none">
                      {devanagariNumerals[chapter.id]}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Badge
                      variant="outline"
                      className="text-xs mb-1.5 border-primary/30 text-primary"
                    >
                      {chapter.verseCount} {t.verses}
                    </Badge>
                    <h2 className="text-base font-bold text-foreground leading-snug font-display">
                      {language === "hi" ? chapter.nameHindi : chapter.name}
                    </h2>
                    <p className="text-xs text-primary mt-0.5 font-devanagari">
                      {chapter.sankhyaNameDevanagari}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 py-4 flex-1 flex flex-col gap-3">
                  <p className="text-xs text-muted-foreground italic">
                    {chapter.sankhyaName}
                  </p>
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
