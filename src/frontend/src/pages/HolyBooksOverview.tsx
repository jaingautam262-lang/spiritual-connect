import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type Faith,
  faithBg,
  faithColors,
  faithStats,
  holyBooks,
} from "@/data/holyBooksData";
import {
  BookMarked,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Languages,
  Library,
  Search,
  Sparkles,
  Star,
  User2,
} from "lucide-react";
import { useMemo, useState } from "react";

const faithIcons: Record<string, string> = {
  Hindu: "🕉️",
  Jain: "☸️",
  Sikh: "☬",
};

const categoryIcons: Record<string, string> = {
  Vedas: "📖",
  Vedanta: "🔮",
  Itihasas: "📜",
  Mahapuranas: "📚",
  "Jain Agamas": "☸️",
  "Jain Philosophy": "⚖️",
  "Sikh Granths": "☬",
};

export default function HolyBooksOverview() {
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [faithFilter, setFaithFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const faithOptions: Array<{ label: string; value: string; count: number }> = [
    { label: "सभी (All)", value: "All", count: faithStats.total },
    { label: "Hindu", value: "Hindu", count: faithStats.Hindu },
    { label: "Jain", value: "Jain", count: faithStats.Jain },
    { label: "Sikh", value: "Sikh", count: faithStats.Sikh },
  ];

  const filtered = useMemo(() => {
    let books =
      faithFilter === "All"
        ? holyBooks
        : holyBooks.filter((b) => b.faith === faithFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.titleHindi.includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.significance.toLowerCase().includes(q) ||
          b.keyTeachings.some((t) => t.toLowerCase().includes(q)) ||
          b.category.toLowerCase().includes(q),
      );
    }
    return books;
  }, [faithFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/15 border border-primary-foreground/20 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Library className="h-4 w-4" />
            Sacred Scriptures Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 font-display leading-tight">
            पवित्र ग्रंथ संग्रह
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-2">
            Holy Books of Hinduism, Jainism &amp; Sikhism
          </p>
          <p className="text-primary-foreground/60 text-sm">
            हिंदू, जैन और सिख धर्म के पवित्र ग्रंथों का संपूर्ण परिचय
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              {
                value: faithStats.total,
                label: "Sacred Scriptures",
                icon: "📚",
              },
              { value: faithStats.Hindu, label: "Hindu Texts", icon: "🕉️" },
              { value: faithStats.Jain, label: "Jain Texts", icon: "☸️" },
              { value: faithStats.Sikh, label: "Sikh Granths", icon: "☬" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-5 py-3 text-center min-w-[110px]"
              >
                <div className="text-xl mb-0.5">{s.icon}</div>
                <div className="text-2xl font-bold font-display">{s.value}</div>
                <div className="text-xs text-primary-foreground/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter + Search Bar */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border shadow-sm py-3 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3">
          {/* Faith Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {faithOptions.map((opt) => (
              <button
                type="button"
                key={opt.value}
                data-ocid={`faith-filter-${opt.value.toLowerCase()}`}
                onClick={() => setFaithFilter(opt.value)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${
                  faithFilter === opt.value
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {opt.value !== "All" && (
                  <span className="text-xs">{faithIcons[opt.value]}</span>
                )}
                {opt.label}
                <span
                  className={`text-xs rounded-full px-1.5 py-0 font-mono ${
                    faithFilter === opt.value
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {opt.count}
                </span>
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative ml-auto sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              data-ocid="holy-books-search"
              placeholder="Search by name, deity, teaching…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm border-border bg-background"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-5xl mx-auto px-4 pt-5 pb-1 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {filtered.length}
          </span>{" "}
          ग्रंथ मिले
          {searchQuery && (
            <span className="ml-2 text-xs">
              — "<span className="text-primary">{searchQuery}</span>" के लिए
            </span>
          )}
        </p>
        {faithFilter !== "All" && (
          <Badge
            variant="outline"
            className={`text-xs ${faithColors[faithFilter as Faith] || ""}`}
          >
            {faithIcons[faithFilter]} {faithFilter}
          </Badge>
        )}
      </div>

      {/* Book List */}
      <div className="max-w-5xl mx-auto px-4 py-4 pb-16">
        {filtered.length === 0 ? (
          <div
            data-ocid="holy-books-empty"
            className="text-center py-20 text-muted-foreground"
          >
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg font-medium">कोई परिणाम नहीं मिला</p>
            <p className="text-sm mt-1">कृपया अलग खोज शब्द आजमाएं</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((book) => {
              const isOpen = expandedBook === book.id;
              return (
                <article
                  key={book.id}
                  data-ocid={`holy-book-${book.id}`}
                  className={`bg-card rounded-2xl border overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "border-primary/40 shadow-md"
                      : "border-border shadow-sm hover:border-primary/30 hover:shadow"
                  }`}
                >
                  {/* Book Header — Clickable */}
                  <button
                    type="button"
                    className="w-full text-left p-5 hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedBook(isOpen ? null : book.id)}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className="text-3xl shrink-0 mt-0.5 leading-none"
                        aria-hidden
                      >
                        {book.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-foreground font-display">
                            {book.titleHindi}
                          </h3>
                          <span className="text-muted-foreground text-sm">
                            ({book.title})
                          </span>
                          <Badge
                            variant="outline"
                            className={`text-xs shrink-0 ${faithColors[book.faith] || ""}`}
                          >
                            {faithIcons[book.faith]} {book.faith}
                          </Badge>
                          {book.hasFullText && (
                            <Badge className="text-xs bg-primary/10 text-primary border-primary/20 shrink-0">
                              <Star className="h-3 w-3 mr-1" />
                              Full Text Available
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                            {categoryIcons[book.category]} {book.category}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Languages className="h-3 w-3" />
                            {book.language}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {book.period}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-2 leading-relaxed">
                          {book.significance}
                        </p>
                      </div>
                      <div className="shrink-0 text-primary/60 mt-1">
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Detail */}
                  {isOpen && (
                    <div
                      className={`border-t border-border bg-gradient-to-br ${faithBg[book.faith] || "from-muted/30 to-muted/10"} p-5 space-y-5`}
                    >
                      {/* Author + Overview */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-card rounded-xl border border-border p-4">
                          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <User2 className="h-3.5 w-3.5" />
                            रचयिता / Author
                          </h4>
                          <p className="text-sm text-foreground">
                            {book.author}
                          </p>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-4">
                          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5" />
                            संरचना / Structure
                          </h4>
                          <p className="text-sm text-foreground">
                            {book.structure}
                          </p>
                        </div>
                      </div>

                      {/* Overview */}
                      <div className="bg-card rounded-xl border border-border p-4">
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <BookMarked className="h-3.5 w-3.5" />
                          परिचय / Overview
                        </h4>
                        <p className="text-sm text-foreground leading-relaxed">
                          {book.overview}
                        </p>
                      </div>

                      {/* Key Teachings + Notable Chapters */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-card rounded-xl border border-border p-4">
                          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5" />
                            मुख्य शिक्षाएँ / Key Teachings
                          </h4>
                          <ul className="space-y-2">
                            {book.keyTeachings.map((t, i) => (
                              <li
                                key={`teaching-${book.id}-${i}`}
                                className="flex items-start gap-2 text-sm text-foreground"
                              >
                                <span className="text-primary shrink-0 mt-0.5 text-xs">
                                  ◆
                                </span>
                                <span className="leading-relaxed">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-card rounded-xl border border-border p-4">
                          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5" />
                            प्रमुख अध्याय / Notable Chapters
                          </h4>
                          <ul className="space-y-2">
                            {book.notableChapters.map((c, i) => (
                              <li
                                key={`chapter-${book.id}-${i}`}
                                className="flex items-start gap-2 text-sm text-foreground"
                              >
                                <span className="text-accent-foreground/60 shrink-0 mt-0.5 text-xs">
                                  ▸
                                </span>
                                <span className="leading-relaxed">{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Sectarian Notes */}
                      <div className="bg-primary/5 border border-primary/15 rounded-xl p-4">
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                          📌 Sectarian Notes
                        </h4>
                        <p className="text-sm text-foreground leading-relaxed">
                          {book.sectarianNotes}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {book.hasFullText ? (
                          <Button
                            size="sm"
                            data-ocid={`read-fulltext-${book.id}`}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => {
                              window.location.href =
                                book.id === "bhagavad-gita"
                                  ? "/holy-books-reader"
                                  : "/holy-books";
                            }}
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            पूर्ण पाठ पढ़ें (Read Full Text)
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            data-ocid={`coming-soon-${book.id}`}
                            className="border-border text-muted-foreground cursor-default"
                            disabled
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Full Text — Coming Soon
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          data-ocid={`collapse-${book.id}`}
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => setExpandedBook(null)}
                        >
                          <ChevronUp className="h-4 w-4 mr-1.5" />
                          Collapse
                        </Button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
