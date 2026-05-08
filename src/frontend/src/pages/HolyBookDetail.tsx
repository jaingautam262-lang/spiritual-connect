import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type HolyBook,
  faithBg,
  faithColors,
  holyBooks,
} from "@/data/holyBooksData";
import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  CalendarDays,
  Globe,
  Languages,
  Sparkles,
  User2,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const faithIcons: Record<string, string> = {
  Hindu: "🕉️",
  Jain: "☸️",
  Sikh: "☬",
};

function NotFound({ bookId }: { bookId: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-6xl">📚</div>
        <h1 className="text-2xl font-bold text-foreground">Book not found</h1>
        <p className="text-muted-foreground text-sm">
          No book with ID "{bookId}"
        </p>
        <Button
          variant="outline"
          onClick={() => {
            window.location.href = "/holy-books-overview";
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Overview
        </Button>
      </div>
    </div>
  );
}

export default function HolyBookDetail() {
  const { bookId } = useParams({ strict: false }) as { bookId?: string };
  const { t } = useLanguage();

  const book: HolyBook | undefined = holyBooks.find((b) => b.id === bookId);

  if (!book) return <NotFound bookId={bookId ?? ""} />;

  const faithIcon = faithIcons[book.faith] ?? "📖";
  const faithColor = faithColors[book.faith] ?? "";
  const bgClass = faithBg[book.faith] ?? "from-muted/30 to-muted/10";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 mb-6 gap-1.5"
            onClick={() => {
              window.location.href = "/holy-books-overview";
            }}
            data-ocid="back-to-overview-button"
          >
            <ArrowLeft className="h-4 w-4" />
            पवित्र ग्रंथ संग्रह
          </Button>

          <div className="flex items-start gap-5">
            <span className="text-6xl shrink-0 leading-none mt-1" aria-hidden>
              {book.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className={`text-xs border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground ${faithColor}`}
                >
                  {faithIcon} {book.faith}
                </Badge>
                <span className="text-xs text-primary-foreground/60 bg-primary-foreground/10 px-2 py-0.5 rounded-full">
                  {book.category}
                </span>
                {book.hasFullText && (
                  <Badge className="text-xs bg-yellow-400/20 text-yellow-200 border-yellow-400/30">
                    ✨ Full Text Available
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-1">
                {book.titleHindi}
              </h1>
              {book.titleOriginal && (
                <p className="text-primary-foreground/60 italic text-sm mb-2">
                  {book.titleOriginal}
                </p>
              )}
              <p className="text-lg text-primary-foreground/80">{book.title}</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1.5">
              <Languages className="h-4 w-4" />
              {book.language}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {book.period}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Significance */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            महत्व / Significance
          </h2>
          <p className="text-foreground leading-relaxed">{book.significance}</p>
        </div>

        {/* Author + Structure */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
              <User2 className="h-4 w-4" />
              रचयिता / Author
            </h2>
            <p className="text-foreground text-sm leading-relaxed">
              {book.author}
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              संरचना / Structure
            </h2>
            <p className="text-foreground text-sm leading-relaxed">
              {book.structure}
            </p>
          </div>
        </div>

        {/* Overview */}
        <div
          className={`bg-gradient-to-br ${bgClass} border border-border rounded-2xl p-6`}
        >
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            परिचय / Overview
          </h2>
          <p className="text-foreground leading-relaxed">{book.overview}</p>
        </div>

        {/* Key Teachings + Notable Chapters */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              मुख्य शिक्षाएँ / Key Teachings
            </h2>
            <ul className="space-y-3">
              {book.keyTeachings.map((teaching, i) => (
                <li
                  key={`teaching-${book.id}-${i}`}
                  className="flex items-start gap-2.5 text-sm text-foreground"
                >
                  <span className="text-primary shrink-0 mt-0.5">◆</span>
                  <span className="leading-relaxed">{teaching}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              प्रमुख अध्याय / Notable Chapters
            </h2>
            <ul className="space-y-3">
              {book.notableChapters.map((chapter, i) => (
                <li
                  key={`chapter-${book.id}-${i}`}
                  className="flex items-start gap-2.5 text-sm text-foreground"
                >
                  <span className="text-accent-foreground/60 shrink-0 mt-0.5">
                    ▸
                  </span>
                  <span className="leading-relaxed">{chapter}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sectarian Notes */}
        <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4" />📌 Sectarian Notes & Traditions
          </h2>
          <p className="text-foreground text-sm leading-relaxed">
            {book.sectarianNotes}
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-wrap gap-3 pt-2"
          data-ocid="holy-book-detail.actions"
        >
          {book.hasFullText ? (
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                window.location.href = `/holy-books-reader/${book.id}`;
              }}
              data-ocid="holy-book-detail.read-button"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              पूर्ण पाठ पढ़ें — Read Full Text
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5"
              onClick={() => {
                window.location.href = `/holy-books-reader/${book.id}`;
              }}
              data-ocid="holy-book-detail.reader-button"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              पाठक में खोलें — Open in Reader
            </Button>
          )}
          <Button
            size="lg"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => {
              window.location.href = "/holy-books-overview";
            }}
            data-ocid="holy-book-detail.back-button"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {t("back") || "Back to Overview"}
          </Button>
        </div>

        {/* Browse Other Books */}
        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            More Sacred Scriptures
          </h3>
          <div className="flex flex-wrap gap-2">
            {holyBooks
              .filter((b) => b.id !== book.id)
              .slice(0, 8)
              .map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    window.location.href = `/holy-books-overview/${b.id}`;
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-foreground"
                  data-ocid={`related-book-${b.id}`}
                >
                  <span>{b.icon}</span>
                  {b.title}
                </button>
              ))}
            <button
              type="button"
              onClick={() => {
                window.location.href = "/holy-books-overview";
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-dashed border-primary/30 text-primary hover:bg-primary/5 transition-all"
              data-ocid="view-all-books-button"
            >
              View All →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
