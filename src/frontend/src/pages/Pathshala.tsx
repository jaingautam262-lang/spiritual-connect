import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { type PathshalaLesson, pathshalaLessons } from "../data/pathshala-data";

// ─── Part filter tabs ────────────────────────────────────────────────────────
type PartFilter = "All" | "Bhag-1" | "Bhag-2";

const PART_TABS: { value: PartFilter; label: string }[] = [
  { value: "All", label: "सभी | All" },
  { value: "Bhag-1", label: "भाग-1 | Bhag-1" },
  { value: "Bhag-2", label: "भाग-2 | Bhag-2" },
];

// ─── Lesson Card ─────────────────────────────────────────────────────────────
function LessonCard({
  lesson,
  expanded,
  onToggle,
}: {
  lesson: PathshalaLesson;
  expanded: boolean;
  onToggle: () => void;
}) {
  const partColor =
    lesson.part === "Bhag-1" ? "oklch(0.68 0.20 48)" : "oklch(0.55 0.16 140)";

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-200"
      style={{
        boxShadow: expanded
          ? "0 6px 24px oklch(0.62 0.18 48 / 0.12)"
          : undefined,
      }}
      data-ocid={`pathshala-lesson-${lesson.id}`}
    >
      {/* Card header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-muted/20 transition-colors"
        aria-expanded={expanded}
      >
        {/* Chapter badge circle */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.88 0.055 75))",
            border: "2px solid oklch(0.78 0.14 75 / 0.35)",
            color: "oklch(0.35 0.12 25)",
          }}
        >
          {lesson.chapterNumber}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            <Badge
              className="text-xs font-semibold"
              style={{
                background: `${partColor}22`,
                color: partColor,
                border: `1px solid ${partColor}44`,
              }}
            >
              {lesson.part}
            </Badge>
            {lesson.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h3
            className="font-display font-semibold text-base leading-snug text-foreground"
            style={{ fontFamily: "'Noto Sans Devanagari', 'Cinzel', serif" }}
          >
            {lesson.titleHi}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {lesson.titleEn}
          </p>
          {!expanded && (
            <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
              {lesson.summary}
            </p>
          )}
        </div>

        {/* Expand icon */}
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border">
          {/* Summary block */}
          <div
            className="px-5 py-4"
            style={{ background: "oklch(0.97 0.01 80 / 0.5)" }}
          >
            <p className="text-sm text-muted-foreground leading-relaxed italic mb-2">
              {lesson.summary}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                color: "oklch(0.40 0.06 35)",
                fontFamily: "'Noto Sans Devanagari', sans-serif",
              }}
            >
              {lesson.summaryHi}
            </p>
          </div>

          {/* Lesson content */}
          <div className="px-5 py-5 space-y-6">
            {/* English content */}
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                📖 Lesson
              </p>
              <div className="text-sm leading-loose text-foreground whitespace-pre-line">
                {lesson.content}
              </div>
            </div>

            {/* Hindi content */}
            <div
              className="rounded-lg p-4"
              style={{
                background: "oklch(0.96 0.02 75 / 0.6)",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                📜 हिंदी पाठ
              </p>
              <div
                className="text-sm leading-loose"
                style={{
                  color: "oklch(0.28 0.06 30)",
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  lineHeight: "1.9",
                }}
              >
                {lesson.contentHi}
              </div>
            </div>

            {/* Moral lesson */}
            <div
              className="rounded-xl p-4 flex gap-3 items-start"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.08), oklch(0.78 0.14 75 / 0.06))",
                border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              }}
            >
              <Sparkles
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                style={{ color: "oklch(0.68 0.20 48)" }}
              />
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  Moral / नैतिक शिक्षा
                </p>
                <p className="text-sm font-medium text-foreground">
                  {lesson.moralLesson}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{
                    color: "oklch(0.40 0.06 35)",
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                  }}
                >
                  {lesson.moralLessonHi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Stats bar ───────────────────────────────────────────────────────────────
function StatsBar() {
  const bhag1 = pathshalaLessons.filter((l) => l.part === "Bhag-1").length;
  const bhag2 = pathshalaLessons.filter((l) => l.part === "Bhag-2").length;
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {[
        { label: "कुल पाठ", value: pathshalaLessons.length, emoji: "📚" },
        { label: "भाग-1 पाठ", value: bhag1, emoji: "🕉️" },
        { label: "भाग-2 पाठ", value: bhag2, emoji: "🌸" },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl mb-1">{stat.emoji}</div>
          <div
            className="text-2xl font-bold font-display"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {stat.value}
          </div>
          <div
            className="text-xs font-body"
            style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function Pathshala() {
  const [partFilter, setPartFilter] = useState<PartFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return pathshalaLessons.filter((lesson) => {
      if (!lesson.isPublished) return false;
      if (partFilter !== "All" && lesson.part !== partFilter) return false;
      if (q) {
        return (
          lesson.titleEn.toLowerCase().includes(q) ||
          lesson.titleHi.includes(q) ||
          lesson.summary.toLowerCase().includes(q) ||
          lesson.summaryHi.includes(q) ||
          lesson.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [partFilter, searchQuery]);

  const handleToggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div
        className="py-14 text-center px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 55%, oklch(0.30 0.10 35) 100%)",
        }}
      >
        <div className="text-5xl mb-4 animate-float">🕉️</div>
        <h1
          className="font-display text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          पाठशाला — Pathshala
        </h1>
        <p
          className="text-lg font-body mb-1"
          style={{ color: "oklch(0.78 0.14 75 / 0.85)" }}
        >
          बाल संस्कार सौरभ
        </p>
        <p
          className="text-sm mb-8 max-w-md mx-auto"
          style={{ color: "oklch(0.78 0.14 75 / 0.55)" }}
        >
          Hindu spiritual education for children &amp; families · Bhag-1 &amp;
          Bhag-2
        </p>
        <StatsBar />
      </div>

      {/* ── Controls ─────────────────────────────────────────────────── */}
      <div
        className="sticky top-16 z-30 border-b"
        style={{
          background: "oklch(0.97 0.015 85 / 0.96)",
          borderColor: "oklch(0.85 0.04 70)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Part tabs */}
          <div
            className="flex gap-1 p-1 rounded-lg flex-shrink-0"
            style={{ background: "oklch(0.93 0.02 75)" }}
          >
            {PART_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setPartFilter(tab.value)}
                data-ocid={`pathshala-filter-${tab.value.toLowerCase()}`}
                className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200"
                style={
                  partFilter === tab.value
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.62 0.18 44))",
                        color: "white",
                        boxShadow: "0 2px 8px oklch(0.62 0.18 48 / 0.3)",
                      }
                    : { color: "oklch(0.48 0.04 40)" }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search lessons… पाठ खोजें…"
              className="pl-9 pr-9 h-9 text-sm bg-card"
              data-ocid="pathshala-search"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Lesson List ──────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-heading">
            {filtered.length} पाठ
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16" data-ocid="pathshala-empty">
            <BookOpen
              className="h-12 w-12 mx-auto mb-4 opacity-30"
              style={{ color: "oklch(0.68 0.20 48)" }}
            />
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
              कोई पाठ नहीं मिला
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try a different search term or filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setPartFilter("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Cards */}
        <div className="space-y-4">
          {filtered.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              expanded={expandedId === lesson.id}
              onToggle={() => handleToggle(lesson.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Footer note ──────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 pb-14">
        <div
          className="rounded-xl p-5 text-center"
          style={{
            background: "oklch(0.78 0.14 75 / 0.06)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <p className="text-sm text-muted-foreground">
            🙏{" "}
            <strong style={{ color: "oklch(0.45 0.12 30)" }}>
              ॐ नमः शिवाय
            </strong>{" "}
            — यह पाठशाला बाल संस्कार सौरभ की शिक्षाओं को समर्पित है। Admin CMS से नए
            पाठ जोड़े जा सकते हैं।
          </p>
        </div>
      </div>
    </div>
  );
}
