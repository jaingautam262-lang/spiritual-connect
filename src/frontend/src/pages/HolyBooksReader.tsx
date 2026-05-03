import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BHAGAVAD_GITA_CHAPTERS,
  type GitaChapter,
  type GitaVerse,
  gitaOverview,
} from "@/data/bhagavadGitaData";
import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Crown,
  Info,
  Library,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────

type BookId =
  | "bhagavad-gita"
  | "ramayana"
  | "mahabharata"
  | "guru-granth"
  | "kalpa-sutra";

interface BookOption {
  id: BookId;
  title: string;
  titleHi: string;
  icon: string;
  available: boolean;
  faith: string;
}

interface BookmarkedVerse {
  bookId: BookId;
  chapterNumber: number;
  verseId: string;
  sanskrit: string;
  english: string;
  titleEn: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────────────────────────────────

const BOOKS: BookOption[] = [
  {
    id: "bhagavad-gita",
    title: "Bhagavad Gita",
    titleHi: "श्रीमद्भगवद्गीता",
    icon: "🌸",
    available: true,
    faith: "Hindu",
  },
  {
    id: "ramayana",
    title: "Valmiki Ramayana",
    titleHi: "वाल्मीकि रामायण",
    icon: "🏹",
    available: false,
    faith: "Hindu",
  },
  {
    id: "mahabharata",
    title: "Mahabharata",
    titleHi: "महाभारत",
    icon: "⚔️",
    available: false,
    faith: "Hindu",
  },
  {
    id: "guru-granth",
    title: "Guru Granth Sahib Ji",
    titleHi: "श्री गुरु ग्रंथ साहिब जी",
    icon: "☬",
    available: false,
    faith: "Sikh",
  },
  {
    id: "kalpa-sutra",
    title: "Kalpa Sutra",
    titleHi: "कल्प सूत्र",
    icon: "📜",
    available: false,
    faith: "Jain",
  },
];

const STORAGE_KEY = "holy-books-reader-bookmarks";

const SAMPLE_VERSES: GitaVerse[] = [
  {
    verseId: "Sample 1",
    sanskrit: "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः",
    transliteration: "dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ",
    hindi: "धर्मभूमि कुरुक्षेत्र में एकत्रित, युद्ध की इच्छा रखने वाले...",
    english:
      "On the field of righteousness, Kurukshetra, assembled ready for battle...",
    isKeyVerse: false,
  },
  {
    verseId: "Sample 2",
    sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्",
    transliteration: "śreyān svadharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt",
    hindi:
      "भले ही अपना धर्म दोषपूर्ण क्यों न हो, वह दूसरे के अच्छे से अनुष्ठित धर्म से श्रेष्ठ है।",
    english:
      "Better is one's own dharma, even if imperfectly performed, than the dharma of another, even if well performed.",
    isKeyVerse: true,
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// Hooks
// ──────────────────────────────────────────────────────────────────────────────

function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedVerse[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  const save = (updated: BookmarkedVerse[]) => {
    setBookmarks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const toggle = (verse: BookmarkedVerse) => {
    const exists = bookmarks.some(
      (b) => b.verseId === verse.verseId && b.bookId === verse.bookId,
    );
    save(
      exists
        ? bookmarks.filter(
            (b) => !(b.verseId === verse.verseId && b.bookId === verse.bookId),
          )
        : [...bookmarks, verse],
    );
  };

  const isBookmarked = (bookId: BookId, verseId: string) =>
    bookmarks.some((b) => b.bookId === bookId && b.verseId === verseId);

  return { bookmarks, toggle, isBookmarked };
}

// ──────────────────────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────────────────────

function VerseCard({
  verse,
  bookId,
  chapterNumber,
  chapterTitleEn,
  isBookmarked,
  onBookmark,
  onDetail,
}: {
  verse: GitaVerse;
  bookId: BookId;
  chapterNumber: number;
  chapterTitleEn: string;
  isBookmarked: boolean;
  onBookmark: (v: BookmarkedVerse) => void;
  onDetail: (v: GitaVerse) => void;
}) {
  return (
    <div
      data-ocid={`verse-${verse.verseId}`}
      className={`rounded-xl border p-4 space-y-3 transition-all ${
        verse.isKeyVerse
          ? "border-yellow-300/40 bg-gradient-to-br from-yellow-50/40 to-amber-50/20"
          : "border-border bg-card"
      }`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {verse.verseId}
          </span>
          {verse.isKeyVerse && (
            <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300 gap-1">
              <Star className="h-3 w-3 fill-yellow-600 text-yellow-600" />
              Key Verse
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            onClick={() =>
              onBookmark({
                bookId,
                chapterNumber,
                verseId: verse.verseId,
                sanskrit: verse.sanskrit,
                english: verse.english,
                titleEn: chapterTitleEn,
              })
            }
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          <button
            type="button"
            aria-label="View verse detail"
            onClick={() => onDetail(verse)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <Info className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Sanskrit */}
      <p
        className="text-lg leading-relaxed font-devanagari text-foreground"
        lang="sa"
      >
        {verse.sanskrit}
      </p>

      {/* Transliteration */}
      <p className="text-xs text-muted-foreground italic leading-relaxed font-mono">
        {verse.transliteration}
      </p>

      {/* Hindi */}
      <div className="bg-muted/40 rounded-lg p-3">
        <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
          हिंदी
        </p>
        <p className="text-sm text-foreground leading-relaxed">{verse.hindi}</p>
      </div>

      {/* English */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
          English
        </p>
        <p className="text-sm text-foreground leading-relaxed">
          {verse.english}
        </p>
      </div>

      {verse.isKeyVerse && verse.keyVerseNote && (
        <div className="bg-yellow-50/60 border border-yellow-200/60 rounded-lg p-3">
          <p className="text-xs font-semibold text-yellow-800 mb-1">
            📌 Significance
          </p>
          <p className="text-xs text-yellow-900 leading-relaxed">
            {verse.keyVerseNote}
          </p>
        </div>
      )}
    </div>
  );
}

function ChapterAccordion({
  chapter,
  bookId,
  isOpen,
  onToggle,
  isBookmarked,
  onBookmark,
  onDetail,
}: {
  chapter: GitaChapter;
  bookId: BookId;
  isOpen: boolean;
  onToggle: () => void;
  isBookmarked: (id: string) => boolean;
  onBookmark: (v: BookmarkedVerse) => void;
  onDetail: (v: GitaVerse) => void;
}) {
  const keyCount = chapter.representativeVerses.filter(
    (v) => v.isKeyVerse,
  ).length;

  return (
    <div
      data-ocid={`chapter-${chapter.chapterNumber}`}
      className={`rounded-xl border overflow-hidden transition-all ${
        isOpen
          ? "border-primary/30 shadow-md"
          : "border-border hover:border-primary/20"
      }`}
    >
      <button
        type="button"
        className="w-full text-left p-4 bg-card hover:bg-muted/30 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
            {chapter.chapterNumber}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-bold text-foreground text-sm" lang="sa">
                {chapter.titleSanskrit}
              </h3>
              <span className="text-muted-foreground text-xs">
                — {chapter.titleEn}
              </span>
            </div>
            <p className="text-xs text-foreground/80 mb-1.5 font-medium">
              {chapter.titleHi}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                {chapter.verseCount} verses
              </span>
              <span className="text-xs bg-accent/10 text-accent-foreground px-2 py-0.5 rounded-full">
                {chapter.theme}
              </span>
              {keyCount > 0 && (
                <span className="text-xs bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-yellow-600 text-yellow-600" />
                  {keyCount} key verse{keyCount > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 text-muted-foreground mt-1">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border bg-background/50 p-4 space-y-4">
          {/* Summary */}
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              Chapter Summary
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {chapter.summary}
            </p>
          </div>

          {/* Representative Verses */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Crown className="h-3.5 w-3.5" />
              Representative Verses (First 5 + Key Verses)
            </p>
            <div className="space-y-3">
              {chapter.representativeVerses.map((verse) => (
                <VerseCard
                  key={verse.verseId}
                  verse={verse}
                  bookId={bookId}
                  chapterNumber={chapter.chapterNumber}
                  chapterTitleEn={chapter.titleEn}
                  isBookmarked={isBookmarked(verse.verseId)}
                  onBookmark={onBookmark}
                  onDetail={onDetail}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VerseDetailModal({
  verse,
  open,
  onClose,
}: {
  verse: GitaVerse | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!verse) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-primary font-mono">{verse.verseId}</span>
            {verse.isKeyVerse && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs gap-1">
                <Star className="h-3 w-3 fill-yellow-600 text-yellow-600" />
                Key Verse
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 mt-2">
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              संस्कृत / Sanskrit
            </p>
            <p
              className="text-2xl leading-relaxed font-devanagari text-foreground"
              lang="sa"
            >
              {verse.sanskrit}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Transliteration
            </p>
            <p className="text-sm italic text-muted-foreground leading-relaxed font-mono bg-muted/40 rounded-lg p-3">
              {verse.transliteration}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              हिंदी अनुवाद
            </p>
            <p className="text-base text-foreground leading-relaxed">
              {verse.hindi}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              English Translation
            </p>
            <p className="text-base text-foreground leading-relaxed">
              {verse.english}
            </p>
          </div>
          {verse.isKeyVerse && verse.keyVerseNote && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-xs font-semibold text-yellow-800 mb-2 uppercase tracking-wider">
                📌 Commentary & Significance
              </p>
              <p className="text-sm text-yellow-900 leading-relaxed">
                {verse.keyVerseNote}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ComingSoonBook({ book }: { book: BookOption }) {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6 text-center">
        <div className="text-5xl mb-3">{book.icon}</div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {book.titleHi}
        </h2>
        <p className="text-muted-foreground mb-4">{book.title}</p>
        <Badge variant="outline" className="text-xs">
          Full Text — Coming Soon
        </Badge>
      </div>

      <div className="bg-muted/30 border border-border rounded-xl p-4">
        <p className="text-sm font-medium text-foreground mb-3">
          Structure Preview
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {[
            "Chapter 1",
            "Chapter 2",
            "Chapter 3",
            "Chapter 4",
            "Chapter 5",
            "...",
          ].map((c) => (
            <div
              key={c}
              className="bg-card rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground text-center"
            >
              {c}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Sample verses from {book.title}:
        </p>
      </div>

      <div className="space-y-3">
        {SAMPLE_VERSES.map((v) => (
          <div
            key={v.verseId}
            className="bg-card border border-border rounded-xl p-4 opacity-70"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {v.verseId}
              </span>
              {v.isKeyVerse && (
                <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200 gap-1">
                  <Star className="h-3 w-3" />
                  Key
                </Badge>
              )}
            </div>
            <p
              className="text-base text-foreground mb-2 font-devanagari"
              lang="sa"
            >
              {v.sanskrit}
            </p>
            <p className="text-xs italic text-muted-foreground mb-2">
              {v.transliteration}
            </p>
            <p className="text-sm text-foreground">{v.english}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookmarksPanel({
  bookmarks,
  onRemove,
}: { bookmarks: BookmarkedVerse[]; onRemove: (v: BookmarkedVerse) => void }) {
  if (bookmarks.length === 0) {
    return (
      <div data-ocid="bookmarks-empty" className="text-center py-16">
        <Bookmark className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
        <p className="text-lg font-medium text-muted-foreground">
          No bookmarks yet
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Click the bookmark icon on any verse to save it here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((b) => (
        <div
          key={`${b.bookId}-${b.verseId}`}
          data-ocid={`bookmark-${b.verseId}`}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {b.verseId}
              </span>
              <span className="text-xs text-muted-foreground">
                {b.titleEn} · Ch {b.chapterNumber}
              </span>
            </div>
            <button
              type="button"
              aria-label="Remove bookmark"
              onClick={() => onRemove(b)}
              className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p
            className="text-sm font-devanagari text-foreground mb-1 line-clamp-2"
            lang="sa"
          >
            {b.sanskrit}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {b.english}
          </p>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────────────────────────────────────

export default function HolyBooksReader() {
  const [selectedBook, setSelectedBook] = useState<BookId>("bhagavad-gita");
  const [openChapter, setOpenChapter] = useState<number | null>(1);
  const [detailVerse, setDetailVerse] = useState<GitaVerse | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const { bookmarks, toggle, isBookmarked } = useBookmarks();

  const currentBook = useMemo(
    () => BOOKS.find((b) => b.id === selectedBook)!,
    [selectedBook],
  );

  const prevBook = useState(selectedBook);
  if (prevBook[0] !== selectedBook) {
    prevBook[1](selectedBook);
    setOpenChapter(null);
  }

  const handleDetail = (v: GitaVerse) => {
    setDetailVerse(v);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 border border-primary-foreground/20 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Library className="h-4 w-4" />
            Sacred Scripture Reader
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-display">
            पवित्र ग्रंथ पाठक
          </h1>
          <p className="text-primary-foreground/80">
            Holy Books — Verse by Verse · Sanskrit · Transliteration · Hindi ·
            English
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="reader">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <TabsList className="bg-muted/50 border border-border">
              <TabsTrigger
                value="reader"
                data-ocid="tab-reader"
                className="gap-1.5"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Reader
              </TabsTrigger>
              <TabsTrigger
                value="bookmarks"
                data-ocid="tab-bookmarks"
                className="gap-1.5"
              >
                <Bookmark className="h-3.5 w-3.5" />
                My Bookmarks
                {bookmarks.length > 0 && (
                  <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full px-1.5">
                    {bookmarks.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="reader">
            {/* Book Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
              {BOOKS.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  data-ocid={`book-selector-${book.id}`}
                  onClick={() => book.available && setSelectedBook(book.id)}
                  disabled={!book.available}
                  className={`relative rounded-xl border p-3 text-center transition-all ${
                    selectedBook === book.id
                      ? "border-primary bg-primary/10 shadow-sm"
                      : book.available
                        ? "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                        : "border-border bg-muted/20 opacity-60 cursor-default"
                  }`}
                >
                  <div className="text-2xl mb-1">{book.icon}</div>
                  <p className="text-xs font-medium text-foreground line-clamp-1">
                    {book.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {book.faith}
                  </p>
                  {!book.available && (
                    <span className="absolute top-1 right-1 text-[9px] bg-muted text-muted-foreground px-1 rounded">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Book Header */}
            <div className="bg-card border border-border rounded-2xl p-5 mb-5">
              <div className="flex items-start gap-4">
                <span className="text-4xl shrink-0">{currentBook.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {currentBook.titleHi}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-2">
                    {currentBook.title}
                  </p>
                  {currentBook.id === "bhagavad-gita" && (
                    <div className="flex flex-wrap gap-2">
                      {[
                        `${gitaOverview.chapters} Chapters`,
                        `${gitaOverview.verses} Verses`,
                        gitaOverview.language,
                        gitaOverview.narrator,
                      ].map((meta) => (
                        <span
                          key={meta}
                          className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full"
                        >
                          {meta}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chapter Index or Coming Soon */}
            {currentBook.available ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-foreground">
                    18 Chapters — Chapter Index
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground"
                    onClick={() => setOpenChapter(null)}
                  >
                    Collapse All
                  </Button>
                </div>
                <div className="space-y-2">
                  {BHAGAVAD_GITA_CHAPTERS.map((chapter) => (
                    <ChapterAccordion
                      key={chapter.chapterNumber}
                      chapter={chapter}
                      bookId="bhagavad-gita"
                      isOpen={openChapter === chapter.chapterNumber}
                      onToggle={() =>
                        setOpenChapter(
                          openChapter === chapter.chapterNumber
                            ? null
                            : chapter.chapterNumber,
                        )
                      }
                      isBookmarked={(id) => isBookmarked("bhagavad-gita", id)}
                      onBookmark={toggle}
                      onDetail={handleDetail}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <ComingSoonBook book={currentBook} />
            )}
          </TabsContent>

          <TabsContent value="bookmarks">
            <BookmarksPanel bookmarks={bookmarks} onRemove={toggle} />
          </TabsContent>
        </Tabs>
      </div>

      <VerseDetailModal
        verse={detailVerse}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
