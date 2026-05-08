import TTSAudioPlayer from "@/components/TTSAudioPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bhagavadGitaChapters } from "@/data/bhagavadGitaChapters";
import { gitaChapters } from "@/data/bhagavadGitaData";
import { type GitaVerse, getChapterVerses } from "@/data/bhagavadGitaVerses";
import { useLanguage } from "@/hooks/useLanguage";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns2,
  List,
  MessageCircle,
  Search,
  Share2,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const BOOKMARKS_KEY = "gita_bookmarked_verses";

function getBookmarks(): string[] {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function toggleBookmark(verseId: string): boolean {
  const marks = getBookmarks();
  const idx = marks.indexOf(verseId);
  if (idx >= 0) marks.splice(idx, 1);
  else marks.push(verseId);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(marks));
  return idx < 0;
}

const en = {
  chapter: "Chapter",
  verses: "verses",
  backToAll: "All Chapters",
  keyVerse: "Key Verse",
  transliteration: "Transliteration",
  meaning: "Meaning",
  themes: "Themes",
  ctaTitle: "Discuss this chapter with Krishna",
  ctaSub:
    "Ask Krishna how the teachings of this chapter apply to your life right now.",
  ctaBtn: "Talk to Krishna",
  prevChapter: "Previous Chapter",
  nextChapter: "Next Chapter",
  notFound: "Chapter not found",
  famousVerses: "Famous Verses",
  allVerses: "All Verses",
  scrollMode: "Scroll Mode",
  pageMode: "Page Mode",
  keyTeachings: "Key Teachings",
  whyMatters: "Why This Matters Today",
  jumpToVerse: "Jump to chapter",
  searchVerse: "Search verse...",
  bookmark: "Bookmark",
  bookmarked: "Bookmarked",
  listenVerse: "Listen",
  verse: "Verse",
  progress: "Progress",
  prevVerse: "Previous",
  nextVerse: "Next",
  famous: "Famous",
  summary: "Summary",
};

const hi = {
  chapter: "अध्याय",
  verses: "श्लोक",
  backToAll: "सभी अध्याय",
  keyVerse: "प्रमुख श्लोक",
  transliteration: "रोमन लिपि",
  meaning: "अर्थ",
  themes: "विषय",
  ctaTitle: "इस अध्याय पर कृष्ण से चर्चा करें",
  ctaSub: "कृष्ण से पूछें कि इस अध्याय की शिक्षाएं अभी आपके जीवन पर कैसे लागू होती हैं।",
  ctaBtn: "कृष्ण से बात करें",
  prevChapter: "पिछला अध्याय",
  nextChapter: "अगला अध्याय",
  notFound: "अध्याय नहीं मिला",
  famousVerses: "प्रसिद्ध श्लोक",
  allVerses: "सभी श्लोक",
  scrollMode: "स्क्रोल मोड",
  pageMode: "पेज मोड",
  keyTeachings: "मुख्य शिक्षाएं",
  whyMatters: "आज यह क्यों महत्वपूर्ण है",
  jumpToVerse: "अध्याय पर जाएं",
  searchVerse: "श्लोक खोजें...",
  bookmark: "बुकमार्क",
  bookmarked: "बुकमार्क हो गया",
  listenVerse: "सुनें",
  verse: "श्लोक",
  progress: "प्रगति",
  prevVerse: "पिछला",
  nextVerse: "अगला",
  famous: "प्रसिद्ध",
  summary: "सार",
};

type ViewMode = "scroll" | "page";

function VerseCard({
  verse,
  idx,
  isActive,
  bookmarks,
  onBookmark,
  onShare,
  verseRef,
  t,
}: {
  verse: GitaVerse;
  idx: number;
  isActive: boolean;
  bookmarks: string[];
  onBookmark: (id: string) => void;
  onShare: (v: GitaVerse) => void;
  verseRef: (el: HTMLDivElement | null) => void;
  t: typeof en;
}) {
  const verseId = `${verse.chapter}.${verse.verse}`;
  return (
    <motion.div
      ref={verseRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      data-ocid={`chapter.verse.${idx + 1}`}
    >
      <div
        className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
          isActive
            ? "border-primary/60 shadow-[0_0_32px_oklch(0.62_0.18_48_/_0.15)]"
            : "border-border hover:border-primary/30"
        }`}
      >
        {/* Verse number badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
            <span className="text-xs font-bold font-devanagari">{verseId}</span>
          </div>
        </div>

        {/* Famous badge */}
        {verse.isFamous && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-accent text-accent-foreground text-xs gap-1">
              <Star className="h-3 w-3 fill-current" />
              {verse.famousTag ?? t.famous}
            </Badge>
          </div>
        )}

        {/* Sanskrit */}
        <div className="bg-primary/5 border-b border-primary/20 pt-16 pb-6 px-6">
          <p className="font-devanagari text-[1.35rem] leading-loose text-foreground text-center whitespace-pre-line">
            {verse.sanskrit}
          </p>
        </div>

        {/* Transliteration */}
        <div className="bg-background/60 border-b border-border px-6 py-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
            {t.transliteration}
          </p>
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            {verse.transliteration}
          </p>
        </div>

        {/* Hindi */}
        <div className="bg-card border-b border-border px-6 py-4">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">
            हिंदी अर्थ
          </p>
          <p className="font-devanagari text-base font-semibold text-primary leading-relaxed">
            {verse.hindi}
          </p>
        </div>

        {/* English */}
        <div className="bg-muted/30 px-6 py-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
            English
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {verse.english}
          </p>
        </div>

        {/* Actions */}
        <div className="bg-card border-t border-border px-6 py-3 flex items-center gap-2 flex-wrap">
          <div className="flex-1">
            <TTSAudioPlayer
              text={verse.sanskrit}
              language="hi-IN"
              title={`${t.listenVerse} ${verseId}`}
            />
          </div>
          <button
            type="button"
            onClick={() => onBookmark(verseId)}
            data-ocid={`chapter.bookmark_button.${idx + 1}`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
              bookmarks.includes(verseId)
                ? "bg-accent/20 border-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-primary/50"
            }`}
            aria-label={bookmarks.includes(verseId) ? t.bookmarked : t.bookmark}
          >
            {bookmarks.includes(verseId) ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {bookmarks.includes(verseId) ? t.bookmarked : t.bookmark}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onShare(verse)}
            data-ocid={`chapter.share_button.${idx + 1}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-200"
            aria-label="Share on WhatsApp"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BhagavadGitaChapter() {
  const { language } = useLanguage();
  const t = language === "hi" ? hi : en;
  const { chapterId } = useParams({ from: "/bhagavad-gita/$chapterId" });

  const chapter = bhagavadGitaChapters.find((c) => c.slug === chapterId);
  const gitaData = gitaChapters.find(
    (c) => chapter && c.chapterNumber === chapter.id,
  );

  const [viewMode, setViewMode] = useState<ViewMode>("scroll");
  const [pageVerseIdx, setPageVerseIdx] = useState(0);
  const [activeVerseIdx, setActiveVerseIdx] = useState(0);
  const [bookmarks, setBookmarks] = useState<string[]>(() => getBookmarks());
  const [showChapterNav, setShowChapterNav] = useState(false);
  const [verseSearch, setVerseSearch] = useState("");
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get verses from new verses file, fall back to gitaData
  const newVerses = useMemo(
    () => (chapter ? getChapterVerses(chapter.id) : []),
    [chapter],
  );
  const fallbackVerses = useMemo(
    () =>
      (gitaData?.representativeVerses ?? []).map((v) => ({
        chapter: gitaData?.chapterNumber ?? 0,
        verse: Number.parseInt(v.verseId.split(".")[1] ?? "1"),
        sanskrit: v.sanskrit,
        transliteration: v.transliteration,
        hindi: v.hindi,
        english: v.english,
        isFamous: v.isKeyVerse,
        famousTag: v.keyVerseNote ? v.keyVerseNote.substring(0, 40) : undefined,
      })),
    [gitaData],
  );
  const verses: GitaVerse[] = newVerses.length > 0 ? newVerses : fallbackVerses;

  const filteredVerses = useMemo(() => {
    const q = verseSearch.trim().toLowerCase();
    if (!q) return verses;
    return verses.filter(
      (v) =>
        v.sanskrit.toLowerCase().includes(q) ||
        v.hindi.toLowerCase().includes(q) ||
        v.english.toLowerCase().includes(q) ||
        `${v.chapter}.${v.verse}`.includes(q),
    );
  }, [verses, verseSearch]);

  const famousVersesInChapter = verses.filter((v) => v.isFamous);
  const totalVerses = filteredVerses.length;
  const progress =
    totalVerses > 0
      ? Math.round(((activeVerseIdx + 1) / totalVerses) * 100)
      : 0;

  // Scroll observer
  useEffect(() => {
    if (viewMode !== "scroll" || !verseRefs.current.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = verseRefs.current.findIndex((r) => r === entry.target);
            if (idx >= 0) setActiveVerseIdx(idx);
          }
        }
      },
      { threshold: 0.5 },
    );
    for (const ref of verseRefs.current) if (ref) observer.observe(ref);
    return () => observer.disconnect();
  }, [viewMode]);

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

  function handleBookmark(verseId: string) {
    toggleBookmark(verseId);
    setBookmarks(getBookmarks());
  }

  function handleShare(verse: GitaVerse) {
    const verseId = `${verse.chapter}.${verse.verse}`;
    const text = `🙏 भगवद्गीता ${verseId}\n\n${verse.sanskrit}\n\n${verse.hindi}\n\nSpiritualConnect पर पढ़ें`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  }

  function scrollToVerse(idx: number) {
    verseRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setActiveVerseIdx(idx);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-card border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              to="/bhagavad-gita"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors shrink-0"
              data-ocid="chapter.back_link"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{t.backToAll}</span>
            </Link>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-primary">
                  {t.chapter} {chapter.id}
                </span>
                <span className="text-sm text-foreground font-medium truncate">
                  — {language === "hi" ? chapter.nameHindi : chapter.name}
                </span>
                <Badge variant="outline" className="text-xs shrink-0">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {chapter.verseCount} {t.verses}
                </Badge>
              </div>
              {totalVerses > 0 && viewMode === "scroll" && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {activeVerseIdx + 1}/{totalVerses}
                  </span>
                </div>
              )}
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("scroll")}
                data-ocid="chapter.scroll_mode_button"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "scroll"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label={t.scrollMode}
                title={t.scrollMode}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("page")}
                data-ocid="chapter.page_mode_button"
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "page"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label={t.pageMode}
                title={t.pageMode}
              >
                <Columns2 className="h-4 w-4" />
              </button>
            </div>

            {/* Chapter jump */}
            <div className="relative shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowChapterNav(!showChapterNav)}
                data-ocid="chapter.jump_dropdown"
                className="text-xs gap-1"
              >
                {t.jumpToVerse}
                <ChevronDown className="h-3 w-3" />
              </Button>
              {showChapterNav && (
                <div
                  className="absolute right-0 top-full mt-1 bg-card border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto w-56"
                  data-ocid="chapter.jump_menu"
                >
                  {bhagavadGitaChapters.map((c) => (
                    <Link
                      key={c.id}
                      to="/bhagavad-gita/$chapterId"
                      params={{ chapterId: c.slug }}
                      onClick={() => setShowChapterNav(false)}
                      className={`block px-4 py-2.5 text-sm hover:bg-primary/10 transition-colors ${
                        c.id === chapter.id
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-foreground"
                      }`}
                      data-ocid={`chapter.jump.${c.id}`}
                    >
                      {t.chapter} {c.id} —{" "}
                      {language === "hi" ? c.nameHindi : c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Introduction */}
      <section className="bg-card border-b py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-primary font-devanagari mb-1">
              {chapter.sankhyaNameDevanagari}
            </p>
            <p className="text-base text-muted-foreground italic mb-4">
              {chapter.sankhyaName}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground font-display mb-4">
              {t.chapter} {chapter.id} —{" "}
              {language === "hi" ? chapter.nameHindi : chapter.name}
            </h1>

            {/* Summary */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                {t.summary}
              </p>
              <p className="text-base text-foreground leading-relaxed max-w-2xl">
                {language === "hi" ? chapter.summaryHindi : chapter.summary}
              </p>
            </div>

            {/* Key Teachings */}
            {gitaData && (
              <div className="mb-5 p-5 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm font-bold text-primary mb-3 flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-primary" />
                  {t.keyTeachings}
                </p>
                <ul className="space-y-2">
                  {(gitaData.representativeVerses?.slice(0, 3) ?? []).map(
                    (v, idx) => (
                      <li
                        key={v.verseId}
                        className="flex gap-2 text-sm text-foreground"
                      >
                        <span className="text-primary font-bold shrink-0">
                          {idx + 1}.
                        </span>
                        <span className="font-devanagari">{v.hindi}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}

            {/* Themes */}
            {chapter.themes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {chapter.themes.map((theme) => (
                  <Badge key={theme} variant="secondary" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Verses section */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Famous verses strip */}
        {famousVersesInChapter.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary fill-primary" />
              {t.famousVerses} ({famousVersesInChapter.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {famousVersesInChapter.map((v) => (
                <button
                  key={`${v.chapter}.${v.verse}`}
                  type="button"
                  onClick={() => {
                    const idx = filteredVerses.findIndex(
                      (fv) => fv.verse === v.verse,
                    );
                    if (idx >= 0) {
                      if (viewMode === "scroll") scrollToVerse(idx);
                      else setPageVerseIdx(idx);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
                  data-ocid={`chapter.famous_verse_tag.${v.verse}`}
                >
                  <Star className="h-3 w-3 fill-primary" />
                  {v.chapter}.{v.verse} {v.famousTag ? `— ${v.famousTag}` : ""}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Verses section */}
        {verses.length > 0 ? (
          <>
            {/* Header + controls */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="h-1 w-6 bg-primary rounded-full inline-block" />
                {t.allVerses} ({verses.length})
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={verseSearch}
                    onChange={(e) => setVerseSearch(e.target.value)}
                    placeholder={t.searchVerse}
                    className="pl-8 pr-7 h-8 text-xs w-44"
                    data-ocid="chapter.verse_search"
                  />
                  {verseSearch && (
                    <button
                      type="button"
                      onClick={() => setVerseSearch("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label="Clear"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Scroll mode: verse navigation pills */}
            {viewMode === "scroll" && (
              <div
                className="flex flex-wrap gap-2"
                data-ocid="chapter.verse_nav"
              >
                {filteredVerses.map((v, idx) => (
                  <button
                    key={`${v.chapter}.${v.verse}`}
                    type="button"
                    onClick={() => scrollToVerse(idx)}
                    data-ocid={`chapter.verse_pill.${idx + 1}`}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                      activeVerseIdx === idx
                        ? "bg-primary text-primary-foreground border-primary"
                        : v.isFamous
                          ? "border-primary/50 text-primary bg-primary/5 hover:bg-primary/20"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                    }`}
                  >
                    {v.chapter}.{v.verse}
                    {v.isFamous && (
                      <Star className="inline h-2.5 w-2.5 ml-1 fill-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* PAGE MODE */}
            {viewMode === "page" && filteredVerses.length > 0 && (
              <motion.div
                key="page-mode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* Page controls */}
                <div className="flex items-center justify-between bg-card border rounded-xl px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setPageVerseIdx((i) => Math.max(0, i - 1))}
                    disabled={pageVerseIdx === 0}
                    data-ocid="chapter.page_prev_button"
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground disabled:opacity-30 hover:text-primary transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t.prevVerse}
                  </button>
                  <span className="text-sm font-semibold text-foreground">
                    {pageVerseIdx + 1} / {filteredVerses.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPageVerseIdx((i) =>
                        Math.min(filteredVerses.length - 1, i + 1),
                      )
                    }
                    disabled={pageVerseIdx === filteredVerses.length - 1}
                    data-ocid="chapter.page_next_button"
                    className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground disabled:opacity-30 hover:text-primary transition-colors"
                  >
                    {t.nextVerse}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={pageVerseIdx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    {filteredVerses[pageVerseIdx] && (
                      <VerseCard
                        verse={filteredVerses[pageVerseIdx]}
                        idx={pageVerseIdx}
                        isActive
                        bookmarks={bookmarks}
                        onBookmark={handleBookmark}
                        onShare={handleShare}
                        verseRef={() => null}
                        t={t}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* SCROLL MODE */}
            {viewMode === "scroll" && (
              <motion.div
                key="scroll-mode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {filteredVerses.map((verse, idx) => (
                  <VerseCard
                    key={`${verse.chapter}.${verse.verse}`}
                    verse={verse}
                    idx={idx}
                    isActive={activeVerseIdx === idx}
                    bookmarks={bookmarks}
                    onBookmark={handleBookmark}
                    onShare={handleShare}
                    verseRef={(el) => {
                      verseRefs.current[idx] = el;
                    }}
                    t={t}
                  />
                ))}
              </motion.div>
            )}
          </>
        ) : (
          /* Fallback key verse */
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
        )}

        {/* Prev / Next navigation */}
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
