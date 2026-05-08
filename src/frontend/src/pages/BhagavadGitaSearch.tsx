import TTSAudioPlayer from "@/components/TTSAudioPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gitaChapters } from "@/data/bhagavadGitaData";
import { type GitaVerse, gitaVerses } from "@/data/bhagavadGitaVerses";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Search, Share2, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

// Merge all verse sources — new verses file + representative verses from gitaChapters
type VerseResult = GitaVerse & {
  chapterTitleHi: string;
  chapterTitleEn: string;
  chapterSlug: string;
};

const chapterMeta = new Map(
  gitaChapters.map((c) => [
    c.chapterNumber,
    {
      titleHi: c.titleHi,
      titleEn: c.titleEn,
      slug: `chapter-${c.chapterNumber}`,
    },
  ]),
);

const allVerses: VerseResult[] = gitaVerses.map((v) => ({
  ...v,
  chapterTitleHi: chapterMeta.get(v.chapter)?.titleHi ?? `अध्याय ${v.chapter}`,
  chapterTitleEn: chapterMeta.get(v.chapter)?.titleEn ?? `Chapter ${v.chapter}`,
  chapterSlug: chapterMeta.get(v.chapter)?.slug ?? `chapter-${v.chapter}`,
}));

const chapterOptions = gitaChapters.map((c) => ({
  value: c.chapterNumber,
  labelHi: `अध्याय ${c.chapterNumber} — ${c.titleHi}`,
  labelEn: `Chapter ${c.chapterNumber} — ${c.titleEn}`,
}));

const en = {
  title: "Search the Bhagavad Gita",
  subtitle:
    "Find any verse by keyword in Sanskrit, Hindi, or English. Try '2.47' or 'karma'.",
  backToAll: "All Chapters",
  placeholder: "Search by keyword or verse number (e.g. 2.47)...",
  filterChapter: "All Chapters",
  results: "results",
  noResults: "No verses found",
  noResultsSub: "Try different keywords or remove the chapter filter.",
  suggestion: "Suggestion: Try 'karma', 'soul', 'duty', 'devotion'",
  transliteration: "Transliteration",
  hindiMeaning: "Hindi Meaning",
  share: "WhatsApp",
  listen: "Listen",
  goToChapter: "Go to chapter",
  chapter: "Chapter",
  famous: "Famous",
};

const hi = {
  title: "भगवद्गीता में खोजें",
  subtitle:
    "संस्कृत, हिंदी या अंग्रेज़ी में कीवर्ड से कोई भी श्लोक खोजें। '2.47' या 'कर्म' आज़माएं।",
  backToAll: "सभी अध्याय",
  placeholder: "श्लोक खोजें (e.g. 2.47, कर्म, soul)...",
  filterChapter: "सभी अध्याय",
  results: "परिणाम",
  noResults: "कोई श्लोक नहीं मिला",
  noResultsSub: "अलग कीवर्ड आज़माएं या अध्याय फ़िल्टर हटाएं।",
  suggestion: "सुझाव: 'कर्म', 'आत्मा', 'धर्म', 'भक्ति' जैसे शब्द आज़माएं",
  transliteration: "रोमन लिपि",
  hindiMeaning: "हिंदी अर्थ",
  share: "WhatsApp",
  listen: "सुनें",
  goToChapter: "अध्याय पर जाएं",
  chapter: "अध्याय",
  famous: "प्रसिद्ध",
};

export default function BhagavadGitaSearch() {
  const { language } = useLanguage();
  const t = language === "hi" ? hi : en;
  const [query, setQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allVerses.filter((verse) => {
      const matchesQuery =
        !q ||
        verse.sanskrit.toLowerCase().includes(q) ||
        verse.hindi.toLowerCase().includes(q) ||
        verse.english.toLowerCase().includes(q) ||
        verse.transliteration.toLowerCase().includes(q) ||
        `${verse.chapter}.${verse.verse}`.includes(q);
      const matchesChapter =
        !selectedChapter || verse.chapter === selectedChapter;
      return matchesQuery && matchesChapter;
    });
  }, [query, selectedChapter]);

  function handleShare(verse: VerseResult) {
    const verseId = `${verse.chapter}.${verse.verse}`;
    const text = `🙏 भगवद्गीता ${verseId}\n\n${verse.sanskrit}\n\n${verse.hindi}\n\nSpiritualConnect पर पढ़ें`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  }

  const hasSearch = query.trim().length > 0 || selectedChapter !== null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-card border-b py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/bhagavad-gita"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            data-ocid="gita-search.back_link"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToAll}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-7 w-7 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                {t.title}
              </h1>
            </div>
            <p className="text-muted-foreground mb-8">{t.subtitle}</p>

            {/* Search Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.placeholder}
                  className="pl-10 pr-10"
                  data-ocid="gita-search.search_input"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                    data-ocid="gita-search.clear_button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <select
                value={selectedChapter ?? ""}
                onChange={(e) =>
                  setSelectedChapter(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
                className="border border-input bg-background text-foreground rounded-md px-3 py-2 text-sm min-w-40 focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="gita-search.chapter_select"
              >
                <option value="">{t.filterChapter}</option>
                {chapterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {language === "hi" ? opt.labelHi : opt.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Active filters */}
            {hasSearch && (
              <div className="flex flex-wrap gap-2 mt-3 items-center">
                <span className="text-sm text-muted-foreground">
                  {results.length} {t.results}
                </span>
                {selectedChapter && (
                  <button
                    type="button"
                    onClick={() => setSelectedChapter(null)}
                    className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                    data-ocid="gita-search.clear_chapter_filter"
                  >
                    {t.chapter} {selectedChapter}
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {!hasSearch ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
              data-ocid="gita-search.idle_state"
            >
              <BookOpen className="h-16 w-16 text-primary/30 mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">
                {language === "hi" ? "भगवद्गीता खोजें" : "Search the Gita"}
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                {t.suggestion}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {[
                  "karma",
                  "soul",
                  "devotion",
                  "duty",
                  "कर्म",
                  "आत्मा",
                  "भक्ति",
                  "2.47",
                  "18.66",
                ].map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => setQuery(kw)}
                    className="text-sm px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    data-ocid={`gita-search.suggestion_${kw}`}
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : results.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
              data-ocid="gita-search.empty_state"
            >
              <Search className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">
                {t.noResults}
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                {t.noResultsSub}
              </p>
              <p className="text-xs text-muted-foreground">{t.suggestion}</p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {results.map((verse, idx) => (
                <motion.div
                  key={`${verse.chapter}.${verse.verse}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  data-ocid={`gita-search.result.${idx + 1}`}
                >
                  <div className="rounded-2xl border-2 border-border hover:border-primary/40 overflow-hidden transition-all duration-300">
                    {/* Verse header */}
                    <div className="bg-primary/5 border-b border-primary/20 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <span className="text-xs font-bold">
                            {verse.chapter}.{verse.verse}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {t.chapter} {verse.chapter}
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {language === "hi"
                              ? verse.chapterTitleHi
                              : verse.chapterTitleEn}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {verse.isFamous && (
                          <Badge className="bg-accent text-accent-foreground text-xs gap-1">
                            <Star className="h-3 w-3 fill-current" />
                            {verse.famousTag ?? t.famous}
                          </Badge>
                        )}
                        <Link
                          to="/bhagavad-gita/$chapterId"
                          params={{ chapterId: verse.chapterSlug }}
                          data-ocid={`gita-search.go_to_chapter.${idx + 1}`}
                        >
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="text-xs gap-1"
                          >
                            <BookOpen className="h-3 w-3" />
                            {t.goToChapter}
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Sanskrit */}
                    <div className="bg-primary/5 border-b border-primary/10 px-5 py-5">
                      <p className="font-devanagari text-[1.25rem] leading-loose text-foreground text-center whitespace-pre-line">
                        {verse.sanskrit}
                      </p>
                    </div>

                    {/* Transliteration */}
                    <div className="bg-background/60 border-b border-border px-5 py-3">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                        {t.transliteration}
                      </p>
                      <p className="text-sm italic text-muted-foreground leading-relaxed">
                        {verse.transliteration}
                      </p>
                    </div>

                    {/* Hindi */}
                    <div className="bg-card border-b border-border px-5 py-3">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                        {t.hindiMeaning}
                      </p>
                      <p className="font-devanagari text-base font-semibold text-primary leading-relaxed">
                        {verse.hindi}
                      </p>
                    </div>

                    {/* English */}
                    <div className="bg-muted/30 px-5 py-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        English
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {verse.english}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="bg-card border-t border-border px-5 py-3 flex items-center gap-3 flex-wrap">
                      <div className="flex-1">
                        <TTSAudioPlayer
                          text={verse.sanskrit}
                          language="hi-IN"
                          title={`${t.listen} ${verse.chapter}.${verse.verse}`}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleShare(verse)}
                        data-ocid={`gita-search.share_button.${idx + 1}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200"
                        aria-label={t.share}
                      >
                        <Share2 className="h-4 w-4" />
                        {t.share}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
