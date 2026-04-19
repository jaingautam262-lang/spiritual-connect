import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";
import StoryViewer from "../components/StoryViewer";
import { type WebStory, webStoriesData } from "../data/web-stories-data";
import { usePublishedWebStories } from "../hooks/useQueries";

const CATEGORY_META: Record<
  string,
  { label: string; labelHindi: string; emoji: string }
> = {
  festivals: { label: "Festivals", labelHindi: "त्योहार", emoji: "🎉" },
  deities: { label: "Deities", labelHindi: "देवी-देवता", emoji: "🛕" },
  mantras: { label: "Mantras", labelHindi: "मंत्र", emoji: "🕉️" },
  vrat: { label: "Vrat", labelHindi: "व्रत", emoji: "🙏" },
};

const FILTERS = [
  { value: "all", label: "All Stories", labelHindi: "सभी" },
  { value: "festivals", label: "Festivals", labelHindi: "त्योहार" },
  { value: "deities", label: "Deities", labelHindi: "देवी-देवता" },
  { value: "mantras", label: "Mantras", labelHindi: "मंत्र" },
  { value: "vrat", label: "Vrat", labelHindi: "व्रत" },
] as const;

function StoryCard({
  story,
  index,
  lang,
  onOpen,
}: {
  story: WebStory;
  index: number;
  lang: "en" | "hi";
  onOpen: (index: number) => void;
}) {
  const catMeta = CATEGORY_META[story.category];
  const title = lang === "hi" ? story.titleHindi : story.title;

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="flex flex-col items-center gap-2 group focus:outline-none"
      aria-label={`Open story: ${title}`}
      data-ocid="web_stories.story_card"
    >
      {/* Circle thumbnail */}
      <div
        className="relative h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden border-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
        style={{
          borderColor: "oklch(0.68 0.18 48)",
          boxShadow: "0 0 0 3px oklch(0.68 0.18 48 / 0.25)",
          background: story.bgColor,
        }}
      >
        {/* Gradient bg */}
        <div
          className="absolute inset-0 flex items-center justify-center text-4xl"
          style={{ background: story.bgColor }}
        >
          {catMeta?.emoji}
        </div>
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* Slide count badge */}
        <div
          className="absolute bottom-1.5 right-1.5 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: "oklch(0.68 0.18 48)", color: "white" }}
        >
          {story.slides.length}
        </div>
      </div>

      {/* Title */}
      <p
        className="text-xs font-semibold text-center leading-snug max-w-[90px] line-clamp-2 group-hover:text-amber-300 transition-colors"
        style={{ color: "oklch(0.80 0.05 70)" }}
      >
        {title}
      </p>

      {/* Category badge */}
      <Badge
        className="text-xs px-2 py-0 pointer-events-none"
        style={{
          background: "oklch(0.68 0.18 48 / 0.18)",
          color: "oklch(0.78 0.14 75)",
          border: "none",
        }}
      >
        {catMeta?.emoji} {lang === "hi" ? catMeta?.labelHindi : catMeta?.label}
      </Badge>
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-24 w-24 md:h-28 md:w-28 rounded-full" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-4 w-16 rounded-full" />
    </div>
  );
}

export default function WebStoriesPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [filter, setFilter] = useState<string>("all");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedStoryIdx, setSelectedStoryIdx] = useState(0);

  const { data: backendStories, isLoading } = usePublishedWebStories();

  const allStories: WebStory[] = useMemo(() => {
    if (backendStories && backendStories.length > 0) return backendStories;
    return webStoriesData;
  }, [backendStories]);

  const filtered = useMemo(() => {
    if (filter === "all") return allStories;
    return allStories.filter((s) => s.category === filter);
  }, [allStories, filter]);

  const handleOpenStory = (indexInFiltered: number) => {
    setSelectedStoryIdx(indexInFiltered);
    setViewerOpen(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.13 0.05 25)" }}>
      {/* Header */}
      <section
        className="py-14 px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.10 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p
                className="text-xs uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
              >
                ✨ Spiritual Stories
              </p>
              <h1
                className="text-3xl md:text-4xl font-heading font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {lang === "hi" ? "वेब स्टोरीज़" : "Web Stories"}
              </h1>
              <p
                className="mt-2 text-sm"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                {lang === "hi"
                  ? "त्योहारों, देवी-देवताओं, मंत्रों और व्रतों पर दृश्य कहानियाँ"
                  : "Visual stories on festivals, deities, mantras, and sacred fasts"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
              className="px-4 py-2 rounded-full text-sm font-semibold border transition-all"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                color: "oklch(0.78 0.14 75)",
                background: "oklch(0.78 0.14 75 / 0.08)",
              }}
              data-ocid="web_stories.language_toggle"
            >
              {lang === "en" ? "हिन्दी" : "English"}
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section
        className="px-4 py-4 border-b"
        style={{
          background: "oklch(0.16 0.06 22 / 0.95)",
          borderColor: "oklch(0.78 0.14 75 / 0.12)",
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background:
                    filter === f.value
                      ? "oklch(0.68 0.18 48)"
                      : "oklch(0.22 0.08 28)",
                  color: filter === f.value ? "white" : "oklch(0.75 0.05 60)",
                  border: `1px solid ${filter === f.value ? "transparent" : "oklch(0.78 0.14 75 / 0.15)"}`,
                }}
                data-ocid="web_stories.category_filter"
              >
                {lang === "hi" ? f.labelHindi : f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="px-4 py-12">
        <div className="container mx-auto max-w-5xl">
          {isLoading ? (
            <div className="flex flex-wrap gap-8 justify-center">
              {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((sk) => (
                <SkeletonCard key={sk} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-4xl block mb-4">📖</span>
              <p
                className="font-heading"
                style={{ color: "oklch(0.65 0.04 60)" }}
              >
                {lang === "hi" ? "कोई स्टोरी नहीं मिली" : "No stories found"}
              </p>
            </div>
          ) : (
            <>
              <p
                className="text-xs mb-8"
                style={{ color: "oklch(0.55 0.04 50)" }}
              >
                {lang === "hi"
                  ? `${filtered.length} स्टोरीज़`
                  : `${filtered.length} stories`}
              </p>

              {/* Row layout like Instagram */}
              <div className="flex flex-wrap gap-8 justify-start">
                {filtered.map((story, i) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    index={i}
                    lang={lang}
                    onOpen={handleOpenStory}
                  />
                ))}
              </div>

              {/* How to use hint */}
              <div
                className="mt-12 rounded-xl p-5 border text-center"
                style={{
                  background: "oklch(0.18 0.07 28 / 0.5)",
                  borderColor: "oklch(0.78 0.14 75 / 0.1)",
                }}
              >
                <p className="text-sm" style={{ color: "oklch(0.65 0.04 60)" }}>
                  {lang === "hi"
                    ? "💡 किसी भी स्टोरी पर tap करें • बाएं/दाएं tap करके navigate करें • 5 सेकंड में auto-advance"
                    : "💡 Tap any story to open • Tap left/right to navigate • Auto-advances every 5 seconds"}
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Story Viewer */}
      {viewerOpen && filtered.length > 0 && (
        <StoryViewer
          stories={filtered}
          initialStoryIndex={selectedStoryIdx}
          lang={lang}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </div>
  );
}
