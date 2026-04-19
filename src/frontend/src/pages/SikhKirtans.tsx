import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Music,
  Pause,
  Play,
  Volume2,
} from "lucide-react";
import { useRef, useState } from "react";
import { type SikhKirtanEntry, sikhKirtansData } from "../data/sikhKirtansData";

type Section = "gurmukhi" | "roman" | "english";

interface EntryState {
  isPlaying: boolean;
  progress: number;
  open: Record<Section, boolean>;
}

function AudioPlayer({
  isPlaying,
  progress,
  onToggle,
  audioCredit,
}: {
  isPlaying: boolean;
  progress: number;
  onToggle: () => void;
  audioCredit: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-muted/30 rounded-xl border border-border">
      <Button
        size="icon"
        className="w-9 h-9 rounded-full bg-primary flex-shrink-0"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 text-primary-foreground" />
        ) : (
          <Play className="w-3.5 h-3.5 text-primary-foreground ml-0.5" />
        )}
      </Button>
      <div className="flex-1 min-w-0">
        <div className="w-full bg-muted rounded-full h-1.5 mb-1">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{isPlaying ? "▶ Playing…" : "Paused"}</span>
          <span className="flex items-center gap-1">
            <Volume2 className="w-3 h-3" /> {audioCredit}
          </span>
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
      aria-label={`Copy ${label}`}
    >
      <Copy className="w-3 h-3" />
      {copied ? "Copied!" : `Copy ${label}`}
    </button>
  );
}

function CollapsibleSection({
  title,
  content,
  isOpen,
  onToggle,
  copyLabel,
  fontClass,
}: {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  copyLabel: string;
  fontClass?: string;
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-2.5 bg-muted/20 hover:bg-muted/40 transition-colors text-left"
        onClick={onToggle}
      >
        <span className="text-sm font-medium text-foreground">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-background">
          <div
            className={`whitespace-pre-line text-sm leading-relaxed text-foreground mb-3 ${fontClass ?? ""}`}
          >
            {content}
          </div>
          <CopyButton text={content} label={copyLabel} />
        </div>
      )}
    </div>
  );
}

function KirtanCard({ entry }: { entry: SikhKirtanEntry }) {
  const [state, setState] = useState<EntryState>({
    isPlaying: false,
    progress: 0,
    open: { gurmukhi: false, roman: false, english: false },
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlay = () => {
    if (state.isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setState((s) => ({ ...s, isPlaying: false }));
    } else {
      setState((s) => ({ ...s, isPlaying: true }));
      intervalRef.current = setInterval(() => {
        setState((s) => {
          if (s.progress >= 100) {
            clearInterval(intervalRef.current!);
            return { ...s, isPlaying: false, progress: 0 };
          }
          return { ...s, progress: s.progress + 0.4 };
        });
      }, 200);
    }
  };

  const toggleSection = (sec: Section) =>
    setState((s) => ({
      ...s,
      open: { ...s.open, [sec]: !s.open[sec] },
    }));

  return (
    <div
      className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors"
      data-ocid="kirtan.card"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className="text-xs shrink-0"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
                color: "oklch(0.78 0.14 75)",
              }}
            >
              {entry.type === "nitnem" ? "Nitnem" : "Kirtan"}
            </Badge>
          </div>
          <h3 className="font-semibold text-foreground mt-1 leading-snug">
            {entry.title}
          </h3>
          <p
            className="text-base mt-0.5"
            style={{ fontFamily: "'Noto Sans Gurmukhi', sans-serif" }}
          >
            {entry.titleGurmukhi}
          </p>
        </div>
        <Music className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
      </div>

      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        {entry.description}
      </p>

      <AudioPlayer
        isPlaying={state.isPlaying}
        progress={state.progress}
        onToggle={togglePlay}
        audioCredit={entry.audioCredit}
      />

      <div className="mt-3 space-y-2">
        <CollapsibleSection
          title="Gurmukhi / ਗੁਰਮੁਖੀ"
          content={entry.gurmukhi}
          isOpen={state.open.gurmukhi}
          onToggle={() => toggleSection("gurmukhi")}
          copyLabel="Gurmukhi"
          fontClass="gurmukhi-text"
        />
        <CollapsibleSection
          title="Roman Transliteration"
          content={entry.romanTransliteration}
          isOpen={state.open.roman}
          onToggle={() => toggleSection("roman")}
          copyLabel="Transliteration"
        />
        <CollapsibleSection
          title="English Meaning"
          content={entry.englishMeaning}
          isOpen={state.open.english}
          onToggle={() => toggleSection("english")}
          copyLabel="English"
        />
      </div>
    </div>
  );
}

export default function SikhKirtans() {
  const kirtans = sikhKirtansData.filter((e) => e.type === "kirtan");
  const nitnem = sikhKirtansData.filter((e) => e.type === "nitnem");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="relative py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.28 0.10 50) 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-3">🕌</div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Sikh Kirtans &amp; Nitnem
          </h1>
          <p
            className="text-sm md:text-base"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            Gurbani — the divine word. Gurmukhi lyrics, Roman transliteration
            &amp; English meaning.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Kirtans Section */}
        <section className="mb-14" id="kirtans">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-1 h-7 rounded-full"
              style={{ background: "oklch(0.78 0.14 75)" }}
            />
            <h2 className="text-xl font-bold text-foreground">
              Kirtans
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({kirtans.length} shabads)
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kirtans.map((entry) => (
              <KirtanCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>

        {/* Nitnem Section */}
        <section id="nitnem">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-1 h-7 rounded-full"
              style={{ background: "oklch(0.68 0.20 48)" }}
            />
            <h2 className="text-xl font-bold text-foreground">
              Nitnem — Daily Prayers
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({nitnem.length} prayers)
              </span>
            </h2>
          </div>
          <div className="bg-muted/20 border border-border rounded-xl p-4 mb-5 text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">ਨਿਤਨੇਮ (Nitnem)</strong> — Daily
            Sikh prayers to be recited every day: Japji Sahib &amp; Jaap Sahib
            in the morning, Chaupai Sahib in the evening, and Kirtan Sohila at
            bedtime.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nitnem.map((entry) => (
              <KirtanCard key={entry.id} entry={entry} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
