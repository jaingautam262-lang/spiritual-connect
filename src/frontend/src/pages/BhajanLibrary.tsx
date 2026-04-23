import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Heart,
  Languages,
  ListMusic,
  Mic,
  MicOff,
  Music,
  Pause,
  Play,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Star,
  Volume2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BHAJAN_CATEGORIES,
  type BhajanRich,
  RICH_BHAJANS,
} from "../data/bhajanData";
import { JAIN_BHAJANS, type JainBhajanRich } from "../data/bhajanData_jain";

type AnyBhajan = BhajanRich | JainBhajanRich;

const ALL_BHAJANS: AnyBhajan[] = [...RICH_BHAJANS, ...JAIN_BHAJANS];

const JAIN_CATEGORIES = [
  { id: "jain", label: "Jain", labelHi: "जैन", emoji: "🕊️" },
  {
    id: "jain-chalisa",
    label: "Jain Chalisa",
    labelHi: "जैन चालीसा",
    emoji: "📿",
  },
] as const;

const ALL_CATEGORIES = [...BHAJAN_CATEGORIES, ...JAIN_CATEGORIES];

// ── Speech Recognition helper ─────────────────────────────────────────────────
type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  onresult:
    | ((e: {
        results: { [key: number]: { [key: number]: { transcript: string } } };
      }) => void)
    | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function createSpeechRecognition(): SpeechRecognitionInstance | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!SR) return null;
  return new SR() as SpeechRecognitionInstance;
}

const CATEGORY_COLORS: Record<string, string> = {
  krishna: "bg-blue-100 text-blue-800 border-blue-200",
  ram: "bg-green-100 text-green-800 border-green-200",
  shiv: "bg-purple-100 text-purple-800 border-purple-200",
  hanuman: "bg-orange-100 text-orange-800 border-orange-200",
  devi: "bg-pink-100 text-pink-800 border-pink-200",
  ganesh: "bg-yellow-100 text-yellow-800 border-yellow-200",
  satsang: "bg-teal-100 text-teal-800 border-teal-200",
  jain: "bg-amber-100 text-amber-800 border-amber-200",
  "jain-chalisa": "bg-orange-100 text-orange-900 border-orange-300",
};

const CATEGORY_EMOJI: Record<string, string> = {
  krishna: "🦚",
  ram: "🏹",
  shiv: "🔱",
  hanuman: "🐒",
  devi: "🌸",
  ganesh: "🐘",
  satsang: "🙏",
  jain: "🕊️",
  "jain-chalisa": "📿",
};

const PAGE_SIZE = 12;

// ── Featured Carousel ─────────────────────────────────────────────────────────
function FeaturedCarousel({
  featured,
  onSelect,
}: {
  featured: AnyBhajan[];
  onSelect: (b: AnyBhajan) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () =>
    setActiveIdx((i) => (i - 1 + featured.length) % featured.length);
  const next = () => setActiveIdx((i) => (i + 1) % featured.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  });

  const b = featured[activeIdx];
  if (!b) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card border border-amber-200 shadow-lg mb-8">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-orange-50/60 to-yellow-50/80" />
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_20%_50%,theme(colors.amber.400),transparent_50%),radial-gradient(circle_at_80%_50%,theme(colors.orange.400),transparent_50%)]" />

      <div className="relative p-6 md:p-8">
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2 bg-amber-500/10 rounded-full">
            <Star className="w-4 h-4 text-amber-600" fill="currentColor" />
          </div>
          <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">
            Featured Bhajan
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display leading-tight mb-1">
              {b.titleHi}
            </h2>
            <p className="text-base text-muted-foreground mb-3">{b.titleEn}</p>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_COLORS[b.category] ?? ""}`}
              >
                {CATEGORY_EMOJI[b.category] ?? "🕉️"}{" "}
                {ALL_CATEGORIES.find((c) => c.id === b.category)?.label}
              </span>
              <span className="text-xs text-muted-foreground">
                🎵 {b.artist}
              </span>
            </div>
            <p className="text-sm text-foreground/70 line-clamp-2 font-hindi leading-relaxed">
              {b.lyricsHi.split("\n")[0]}
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
              onClick={() => onSelect(b)}
              data-ocid="featured-play-btn"
            >
              <Play className="w-4 h-4 mr-2" fill="currentColor" />
              Play Now
            </Button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-4">
          {featured.map((feat, i) => (
            <button
              key={feat.id}
              type="button"
              className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-6 bg-amber-600" : "w-1.5 bg-amber-300"}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        type="button"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors"
        onClick={prev}
        aria-label="Previous"
      >
        <ChevronLeft className="w-4 h-4 text-amber-700" />
      </button>
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow flex items-center justify-center hover:bg-white transition-colors"
        onClick={next}
        aria-label="Next"
      >
        <ChevronRight className="w-4 h-4 text-amber-700" />
      </button>
    </div>
  );
}

// ── Lyrics Detail Panel ───────────────────────────────────────────────────────
function LyricsPanel({
  bhajan,
  onClose,
}: { bhajan: AnyBhajan; onClose: () => void }) {
  const [tab, setTab] = useState<"hindi" | "transliteration" | "english">(
    "hindi",
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-border">
        {/* Header */}
        <div className="flex items-start gap-3 p-4 border-b border-border">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-foreground truncate font-display">
              {bhajan.titleHi}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {bhajan.titleEn} • {bhajan.artist}
            </p>
          </div>
          <span
            className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_COLORS[bhajan.category] ?? ""}`}
          >
            {CATEGORY_EMOJI[bhajan.category] ?? "🕉️"}{" "}
            {ALL_CATEGORIES.find((c) => c.id === bhajan.category)?.label}
          </span>
          <button
            type="button"
            className="flex-shrink-0 w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-3 border-b border-border bg-muted/30">
          {(
            [
              { id: "hindi", label: "हिंदी", icon: "🇮🇳" },
              { id: "transliteration", label: "Roman", icon: "🔤" },
              { id: "english", label: "English Meaning", icon: "🌐" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                tab === t.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setTab(t.id)}
              data-ocid={`lyrics-tab-${t.id}`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Lyrics content */}
        <div className="flex-1 overflow-y-auto p-5">
          {tab === "hindi" && (
            <pre className="whitespace-pre-wrap text-base leading-loose text-foreground font-hindi">
              {bhajan.lyricsHi}
            </pre>
          )}
          {tab === "transliteration" && (
            <pre className="whitespace-pre-wrap text-sm leading-loose text-foreground font-body italic">
              {bhajan.transliteration}
            </pre>
          )}
          {tab === "english" && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Languages className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                    English Meaning
                  </span>
                </div>
              </div>
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-body">
                {bhajan.lyricsEn}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function BhajanLibrary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isListening, setIsListening] = useState(false);
  const [currentBhajan, setCurrentBhajan] = useState<AnyBhajan>(ALL_BHAJANS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [progress, setProgress] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [playerTab, setPlayerTab] = useState<"playlist" | "lyrics">("playlist");
  const [detailBhajan, setDetailBhajan] = useState<AnyBhajan | null>(null);
  const [page, setPage] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const filterKeyRef = useRef(`${search}|${activeCategory}`);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = ALL_BHAJANS.filter((b) => {
    const matchCat = activeCategory === "all" || b.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      b.titleHi.toLowerCase().includes(q) ||
      b.titleEn.toLowerCase().includes(q) ||
      b.artist.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featured = ALL_BHAJANS.filter((b) => b.isFeatured);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const newFilterKey = `${search}|${activeCategory}`;
  if (filterKeyRef.current !== newFilterKey) {
    filterKeyRef.current = newFilterKey;
    if (page !== 1) setPage(1);
  }
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // ── Player progress ────────────────────────────────────────────────────────
  const stopProgress = useCallback(() => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    stopProgress();
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          stopProgress();
          setIsPlaying(false);
          return 0;
        }
        return p + 0.5;
      });
    }, 150);
  }, [stopProgress]);

  useEffect(() => {
    if (isPlaying) startProgress();
    else stopProgress();
    return stopProgress;
  }, [isPlaying, startProgress, stopProgress]);

  const handlePlayPause = () => setIsPlaying((p) => !p);

  const handleNext = () => {
    setProgress(0);
    setIsPlaying(false);
    if (isShuffle) {
      setCurrentBhajan(filtered[Math.floor(Math.random() * filtered.length)]);
    } else {
      const idx = filtered.findIndex((b) => b.id === currentBhajan.id);
      setCurrentBhajan(filtered[(idx + 1) % filtered.length] ?? filtered[0]);
    }
  };

  const handlePrev = () => {
    setProgress(0);
    setIsPlaying(false);
    const idx = filtered.findIndex((b) => b.id === currentBhajan.id);
    setCurrentBhajan(
      filtered[(idx - 1 + filtered.length) % filtered.length] ?? filtered[0],
    );
  };

  const handleSelectTrack = (b: AnyBhajan) => {
    setCurrentBhajan(b);
    setProgress(0);
    setIsPlaying(true);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── Voice search ───────────────────────────────────────────────────────────
  const startVoiceSearch = () => {
    const recognition = createSpeechRecognition();
    if (!recognition) {
      alert("Voice search is not supported in your browser.");
      return;
    }
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.onresult = (e) => {
      setSearch(e.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopVoiceSearch = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-72 overflow-hidden">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        <img
          src="/assets/generated/bhajan-library-banner.dim_1200x400.png"
          alt="Bhajan Library"
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/75 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-400/20 rounded-full backdrop-blur-sm border border-amber-300/30">
              <Music className="w-7 h-7 text-amber-300" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display">
              भजन लाइब्रेरी
            </h1>
          </div>
          <p className="text-amber-200 text-sm md:text-lg font-body">
            Bhajan Library — Divine melodies for the soul
          </p>
          <div className="flex gap-3 mt-3 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <Music className="w-3 h-3" /> {ALL_BHAJANS.length}+ Bhajans
            </span>
            <span>•</span>
            <span>9 Categories</span>
            <span>•</span>
            <span>Hindi + English</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Carousel */}
        {featured.length > 0 && (
          <FeaturedCarousel
            featured={featured}
            onSelect={(b) => handleSelectTrack(b)}
          />
        )}

        {/* Search + Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search bhajans by title, deity, artist..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="bhajan-search-input"
            />
          </div>
          <Button
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            className="flex-shrink-0"
            onClick={isListening ? stopVoiceSearch : startVoiceSearch}
            title={isListening ? "Stop listening" : "Voice search in Hindi"}
            data-ocid="voice-search-btn"
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </Button>
        </div>

        {isListening && (
          <p className="text-sm text-primary mb-4 animate-pulse">
            🎙️ सुन रहे हैं... भजन का नाम या देवी देवता बोलें
          </p>
        )}

        {/* Category Tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none"
          data-ocid="category-tabs"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
              onClick={() => setActiveCategory(cat.id)}
              data-ocid={`cat-tab-${cat.id}`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.labelHi}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* ── Player Panel ─────────────────────────────────────────────── */}
          <div className="xl:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-lg sticky top-4">
              {/* Album Art */}
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center mb-4 border border-amber-200 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,theme(colors.amber.300),transparent)]" />
                <div className="text-center relative z-10">
                  <div className="text-6xl mb-2">
                    {CATEGORY_EMOJI[currentBhajan.category] ?? "🕉️"}
                  </div>
                  <p className="text-xs text-amber-700 font-semibold tracking-wide">
                    {
                      ALL_CATEGORIES.find(
                        (c) => c.id === currentBhajan.category,
                      )?.label
                    }
                  </p>
                </div>
                {isPlaying && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-1 bg-amber-500 rounded-full animate-bounce"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          height: `${8 + (i % 3) * 8}px`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div className="text-center mb-4">
                <h3 className="font-bold text-base text-foreground leading-tight mb-0.5 font-display">
                  {currentBhajan.titleHi}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {currentBhajan.artist}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div
                  className="w-full bg-muted rounded-full h-1.5 cursor-pointer group"
                  role="slider"
                  aria-label="Playback progress"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = ((e.clientX - rect.left) / rect.width) * 100;
                    setProgress(Math.max(0, Math.min(100, pct)));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight")
                      setProgress((p) => Math.min(100, p + 5));
                    if (e.key === "ArrowLeft")
                      setProgress((p) => Math.max(0, p - 5));
                  }}
                >
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>
                    {Math.floor((progress * 3.6) / 60)}:
                    {String(Math.floor((progress * 3.6) % 60)).padStart(2, "0")}
                  </span>
                  <span>6:00</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    isShuffle ? "text-primary" : "text-muted-foreground"
                  }
                  onClick={() => setIsShuffle((s) => !s)}
                  data-ocid="shuffle-btn"
                >
                  <Shuffle className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  data-ocid="prev-btn"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                  onClick={handlePlayPause}
                  data-ocid="play-pause-btn"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  data-ocid="next-btn"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    isRepeat ? "text-primary" : "text-muted-foreground"
                  }
                  onClick={() => setIsRepeat((r) => !r)}
                  data-ocid="repeat-btn"
                >
                  <Repeat className="w-4 h-4" />
                </Button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 mb-4">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1 bg-muted rounded-full h-1">
                  <div className="bg-primary/60 h-1 rounded-full w-3/4" />
                </div>
              </div>

              {/* View Lyrics */}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs border-amber-200 text-amber-700 hover:bg-amber-50"
                onClick={() => setDetailBhajan(currentBhajan)}
                data-ocid="view-lyrics-btn"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                View Full Lyrics (Hindi / English)
              </Button>

              {/* Tabs */}
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${playerTab === "playlist" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  onClick={() => setPlayerTab("playlist")}
                >
                  <ListMusic className="w-3 h-3 inline mr-1" />
                  Playlist
                </button>
                <button
                  type="button"
                  className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${playerTab === "lyrics" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  onClick={() => setPlayerTab("lyrics")}
                >
                  📜 Lyrics
                </button>
              </div>

              {playerTab === "lyrics" && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg max-h-40 overflow-y-auto">
                  <pre className="text-xs text-foreground whitespace-pre-wrap font-hindi leading-relaxed">
                    {currentBhajan.lyricsHi}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* ── Bhajan List ───────────────────────────────────────────────── */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="font-semibold text-foreground flex items-center gap-2"
                data-ocid="bhajan-list-heading"
              >
                <ListMusic className="w-4 h-4 text-primary" />
                <span>
                  {activeCategory === "all"
                    ? "सभी भजन"
                    : ALL_CATEGORIES.find((c) => c.id === activeCategory)
                        ?.labelHi}
                </span>
                <span className="text-sm text-muted-foreground font-normal">
                  ({filtered.length} bhajans)
                </span>
              </h2>
              <span className="text-xs text-muted-foreground">
                Page {safePage}/{totalPages}
              </span>
            </div>

            {/* Bhajan cards */}
            <div className="space-y-2" data-ocid="bhajan-list">
              {paginated.length === 0 && (
                <div
                  className="text-center py-16 text-muted-foreground"
                  data-ocid="empty-state"
                >
                  <Music className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No bhajans found</p>
                  <p className="text-sm">Try a different search or category</p>
                </div>
              )}

              {paginated.map((b) => {
                const isActive = b.id === currentBhajan.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    className={`w-full flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border text-left group ${
                      isActive
                        ? "bg-primary/10 border-primary/30 shadow-sm"
                        : "bg-card border-border hover:bg-muted/50 hover:border-amber-200"
                    }`}
                    onClick={() => handleSelectTrack(b)}
                    data-ocid={`bhajan-row-${b.id}`}
                  >
                    {/* Track number / play indicator */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground group-hover:bg-amber-100 group-hover:text-amber-700"
                      }`}
                    >
                      {isActive && isPlaying ? (
                        <span className="animate-pulse">▶</span>
                      ) : (
                        (CATEGORY_EMOJI[b.category] ?? "🕉️")
                      )}
                    </div>

                    {/* Title + artist */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold text-sm truncate font-display ${isActive ? "text-primary" : "text-foreground"}`}
                      >
                        {b.titleHi}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {b.titleEn} • {b.artist}
                      </p>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span
                        className={`hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_COLORS[b.category] ?? ""}`}
                      >
                        {ALL_CATEGORIES.find((c) => c.id === b.category)?.label}
                      </span>
                      {/* Lyrics button */}
                      <button
                        type="button"
                        className="p-1.5 rounded-full text-muted-foreground hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailBhajan(b);
                        }}
                        aria-label="View lyrics"
                        data-ocid={`view-lyrics-${b.id}`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                      {/* Favorite */}
                      <button
                        type="button"
                        className={`p-1.5 rounded-full transition-colors ${
                          favorites.has(b.id)
                            ? "text-red-500"
                            : "text-muted-foreground hover:text-red-400 hover:bg-red-50"
                        }`}
                        onClick={(e) => toggleFavorite(b.id, e)}
                        aria-label="Toggle favorite"
                        data-ocid={`fav-${b.id}`}
                      >
                        <Heart
                          className="w-3.5 h-3.5"
                          fill={favorites.has(b.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className="flex items-center justify-between mt-6 pt-4 border-t border-border"
                data-ocid="pagination"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  data-ocid="prev-page-btn"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        type="button"
                        className={`w-8 h-8 text-xs rounded-lg font-medium transition-colors ${
                          p === safePage
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                        onClick={() => setPage(p)}
                        data-ocid={`page-btn-${p}`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  data-ocid="next-page-btn"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lyrics Modal */}
      {detailBhajan && (
        <LyricsPanel
          bhajan={detailBhajan}
          onClose={() => setDetailBhajan(null)}
        />
      )}
    </div>
  );
}
