import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { getNadiById } from "@/data/nadiData";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const CHAPTER_ICONS: Record<number, string> = {
  1: "☀️",
  2: "👨‍👩‍👧‍👦",
  3: "⚔️",
  4: "🏠",
  5: "🌱",
  6: "⚖️",
  7: "💍",
  8: "⏳",
  9: "🌟",
  10: "💼",
  11: "💰",
  12: "🚪",
};

export default function NadiDetail() {
  const params = useParams({ strict: false }) as { nadiId?: string };
  const nadiId = params.nadiId ?? "";
  const { language } = useLanguage();
  const isHi = language === "hi";

  const nadi = getNadiById(nadiId);
  const [activeChapter, setActiveChapter] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const chapter = nadi?.chapters.find((c) => c.number === activeChapter);

  function goToChapter(num: number) {
    setActiveChapter(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!nadi) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4">
        <span className="text-5xl">📜</span>
        <h2 className="font-display text-2xl font-bold text-foreground">
          {isHi ? "नाड़ी नहीं मिली" : "Nadi Not Found"}
        </h2>
        <p className="text-muted-foreground text-center">
          {isHi
            ? "यह नाड़ी संग्रह में उपलब्ध नहीं है।"
            : "This Nadi is not available in our collection."}
        </p>
        <Link to="/nadi-collection">
          <Button variant="default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isHi ? "नाड़ी संग्रह" : "Nadi Collection"}
          </Button>
        </Link>
      </div>
    );
  }

  function ChapterSidebarContent() {
    return (
      <>
        <div className="px-4 py-4 border-b border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
            {isHi ? "सभी अध्याय" : "All Chapters"}
          </p>
          <p className="font-display font-bold text-foreground text-sm">
            {isHi ? nadi!.nameHi : nadi!.name}
          </p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-1">
            {nadi!.chapters.map((ch) => {
              const isActive = ch.number === activeChapter;
              return (
                <button
                  type="button"
                  key={ch.number}
                  data-ocid={`nadi_detail.chapter.${ch.number}`}
                  onClick={() => {
                    goToChapter(ch.number);
                    setSidebarOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      goToChapter(ch.number);
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full text-left rounded-lg px-3 py-2.5 flex items-start gap-2.5 transition-colors duration-200 ${
                    isActive
                      ? "bg-primary/15 border border-primary/30 text-primary"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-base leading-none mt-0.5 shrink-0">
                    {CHAPTER_ICONS[ch.number]}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className={`text-xs font-bold font-mono ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {isHi ? `अ.${ch.number}` : `Ch.${ch.number}`}
                      </span>
                    </div>
                    <span className="text-xs leading-snug font-medium block truncate">
                      {isHi ? ch.titleHi : ch.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/nadi-collection" data-ocid="nadi_detail.back_link">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isHi ? "नाड़ी संग्रह" : "Nadi Collection"}
              </span>
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <h1 className="font-display font-bold text-foreground text-sm sm:text-base truncate flex-1">
            {isHi ? nadi.nameHi : nadi.name}
          </h1>
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setSidebarOpen((o) => !o)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSidebarOpen((o) => !o);
            }}
            aria-label="Toggle chapter list"
            data-ocid="nadi_detail.sidebar_toggle"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close sidebar"
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm w-full h-full cursor-default"
              onClick={() => setSidebarOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setSidebarOpen(false);
              }}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border flex flex-col shadow-2xl"
              data-ocid="nadi_detail.sidebar"
            >
              <ChapterSidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto flex">
        {/* Desktop Sidebar */}
        <aside
          className="hidden lg:flex flex-col w-72 shrink-0 border-r border-border bg-card/50 sticky top-[57px] h-[calc(100vh-57px)] overflow-hidden"
          data-ocid="nadi_detail.sidebar"
        >
          <ChapterSidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0" ref={contentRef}>
          {/* Nadi Header */}
          <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b border-border px-6 py-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="font-mono text-xs">
                  {isHi
                    ? `अध्याय ${activeChapter} / 12`
                    : `Chapter ${activeChapter} / 12`}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-primary/40 text-primary text-xs"
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  {isHi ? nadi.sageHi : nadi.sage}
                </Badge>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                {isHi ? nadi.nameHi : nadi.name}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                {isHi ? nadi.descriptionHi : nadi.description}
              </p>
            </div>
          </div>

          {/* Chapter Content */}
          <AnimatePresence mode="wait">
            {chapter && (
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="px-6 py-8 max-w-3xl"
                data-ocid={`nadi_detail.chapter_content.${activeChapter}`}
              >
                {/* Chapter heading */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center shrink-0">
                    <span className="text-2xl">
                      {CHAPTER_ICONS[chapter.number]}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {isHi
                          ? `कांडम ${chapter.number}`
                          : `Kandam ${chapter.number}`}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                      {isHi ? chapter.titleHi : chapter.title}
                    </h3>
                  </div>
                </div>

                {/* Sanskrit / Tamil header */}
                <div className="bg-muted/40 border border-border rounded-lg px-5 py-3 mb-6 text-center">
                  <p
                    className="text-muted-foreground text-sm font-medium tracking-wide"
                    style={{ fontFamily: "'Noto Sans Devanagari', serif" }}
                  >
                    {`॥ ${isHi ? chapter.titleHi : chapter.title} — ${isHi ? nadi.nameHi : nadi.name} ॥`}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider mb-2">
                    {isHi ? "विषय संक्षेप" : "Chapter Overview"}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-primary/40 pl-4">
                    {isHi ? chapter.descriptionHi : chapter.description}
                  </p>
                </div>

                <Separator className="mb-6" />

                {/* Full Content */}
                <div>
                  <h4 className="font-display font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
                    {isHi ? "नाड़ी प्रकाशन" : "Nadi Revelation"}
                  </h4>
                  <p className="text-foreground leading-loose text-base">
                    {isHi ? chapter.contentHi : chapter.content}
                  </p>
                </div>

                {/* Significance callout */}
                <div className="mt-8 bg-accent/10 border border-accent/30 rounded-xl px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0">🪷</span>
                    <div>
                      <p className="font-display font-semibold text-foreground text-sm mb-1">
                        {isHi ? "नाड़ी महत्व" : "Nadi Significance"}
                      </p>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {nadi.significance}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Prev / Next Navigation */}
          <div className="px-6 pb-12">
            <Separator className="mb-6" />
            <div className="flex items-center justify-between gap-4 max-w-3xl">
              {activeChapter > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => goToChapter(activeChapter - 1)}
                  className="flex items-center gap-2"
                  data-ocid="nadi_detail.prev_chapter"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {isHi
                      ? `अ.${activeChapter - 1}: ${nadi.chapters[activeChapter - 2]?.titleHi}`
                      : `Ch.${activeChapter - 1}: ${nadi.chapters[activeChapter - 2]?.title}`}
                  </span>
                  <span className="sm:hidden">{isHi ? "पिछला" : "Prev"}</span>
                </Button>
              ) : (
                <div />
              )}

              <span className="text-xs text-muted-foreground font-mono shrink-0">
                {activeChapter} / 12
              </span>

              {activeChapter < 12 ? (
                <Button
                  variant="outline"
                  onClick={() => goToChapter(activeChapter + 1)}
                  className="flex items-center gap-2"
                  data-ocid="nadi_detail.next_chapter"
                >
                  <span className="hidden sm:inline">
                    {isHi
                      ? `अ.${activeChapter + 1}: ${nadi.chapters[activeChapter]?.titleHi}`
                      : `Ch.${activeChapter + 1}: ${nadi.chapters[activeChapter]?.title}`}
                  </span>
                  <span className="sm:hidden">{isHi ? "अगला" : "Next"}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Link to="/nadi-collection">
                  <Button
                    variant="default"
                    data-ocid="nadi_detail.finish_button"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {isHi ? "सभी नाड़ियाँ" : "All Nadis"}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
