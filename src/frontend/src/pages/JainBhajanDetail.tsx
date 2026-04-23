import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Copy,
  Home,
  Music,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { jainBhajanLyricsData } from "../data/jainBhajanLyricsData";

interface Verse {
  id: string;
  isRefrain: boolean;
  number: number | null;
  text: string;
}
function parseVerses(lyrics: string): Verse[] {
  const blocks = lyrics.trim().split(/\n\n+/);
  let verseNum = 0;
  return blocks.map((block, blockIdx) => {
    const isRefrain =
      block.includes("॥टेक॥") ||
      block.startsWith("(टेक") ||
      block.toLowerCase().includes("refrain") ||
      (blockIdx === 0 && !block.match(/\d+$/m));
    if (!isRefrain) verseNum++;
    const clean = block
      .replace(/॥टेक॥/g, "")
      .replace(/\(टेक[^)]*\)/g, "")
      .trim();
    const id = isRefrain ? `refrain-${blockIdx}` : `verse-${verseNum}`;
    return { id, isRefrain, number: isRefrain ? null : verseNum, text: clean };
  });
}

export default function JainBhajanDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const [copied, setCopied] = useState(false);

  const index = jainBhajanLyricsData.findIndex((b) => b.id === id);
  const bhajan = jainBhajanLyricsData[index];
  const prev = index > 0 ? jainBhajanLyricsData[index - 1] : null;
  const next =
    index < jainBhajanLyricsData.length - 1
      ? jainBhajanLyricsData[index + 1]
      : null;

  if (!bhajan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-20">
          <Music className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-lg font-semibold text-foreground mb-2">
            भजन नहीं मिला
          </p>
          <p className="text-sm text-muted-foreground mb-6">ID: {id}</p>
          <Link to="/bhajan-library">
            <Button variant="outline" size="sm">
              ← भजन पुस्तकालय
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const verses = parseVerses(bhajan.lyrics);

  const handleCopy = () => {
    navigator.clipboard.writeText(bhajan.lyrics).then(() => {
      setCopied(true);
      toast.success("भजन कॉपी हो गया!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: bhajan.title,
        text: bhajan.lyrics.slice(0, 200),
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("लिंक कॉपी हो गया!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 22) 0%, oklch(0.24 0.08 40) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-xs text-white/50 mb-6 flex-wrap"
            aria-label="breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-white/80 transition-colors flex items-center gap-1"
            >
              <Home className="w-3 h-3" /> मुख्य पृष्ठ
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              to="/bhajan-library"
              className="hover:text-white/80 transition-colors"
            >
              भजन पुस्तकालय
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70 truncate max-w-[180px]">
              {bhajan.title}
            </span>
          </nav>

          {/* Gold decoration */}
          <div className="flex justify-center mb-4">
            <span className="text-3xl">🕉️</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3 justify-center">
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
              {bhajan.category}
            </Badge>
            {bhajan.featured && (
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-xs">
                ✦ विशेष
              </Badge>
            )}
          </div>

          <h1
            className="text-2xl md:text-3xl font-display font-bold text-center mb-2 leading-snug"
            style={{ color: "oklch(0.92 0.06 75)" }}
          >
            {bhajan.title}
          </h1>

          <p
            className="text-center text-sm mb-6"
            style={{ color: "oklch(0.78 0.12 60)" }}
          >
            देवता: {bhajan.deity}
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              data-ocid="bhajan.copy_button"
              className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs"
            >
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              {copied ? "कॉपी हो गया!" : "लिरिक्स कॉपी करें"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleShare}
              data-ocid="bhajan.share_button"
              className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              शेयर करें
            </Button>
          </div>
        </div>
      </div>

      {/* Lyrics */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div
          className="rounded-2xl p-6 md:p-8 mb-8"
          style={{
            background: "oklch(0.18 0.05 28 / 0.6)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <h2
            className="text-base font-semibold mb-6 text-center flex items-center justify-center gap-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            <Music className="w-4 h-4" /> पूर्ण भजन
          </h2>

          <div className="space-y-6">
            {verses.map((v) =>
              v.isRefrain ? (
                <div
                  key={v.id}
                  data-ocid={`bhajan.${v.id}`}
                  className="rounded-xl px-5 py-4"
                  style={{
                    background: "oklch(0.62 0.18 48 / 0.12)",
                    border: "1px solid oklch(0.62 0.18 48 / 0.25)",
                  }}
                >
                  <span
                    className="text-xs font-semibold block mb-2"
                    style={{ color: "oklch(0.72 0.18 55)" }}
                  >
                    ॥ टेक ॥
                  </span>
                  <p className="text-foreground leading-loose text-base whitespace-pre-line font-body">
                    {v.text}
                  </p>
                </div>
              ) : (
                <div
                  key={v.id}
                  data-ocid={`bhajan.verse.${v.number}`}
                  className="flex gap-4"
                >
                  <div
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-1"
                    style={{
                      background: "oklch(0.78 0.14 75 / 0.15)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                      color: "oklch(0.78 0.14 75)",
                    }}
                  >
                    {v.number}
                  </div>
                  <p className="text-foreground leading-loose text-base whitespace-pre-line font-body flex-1 min-w-0">
                    {v.text}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Transliteration */}
        {bhajan.transliteration && (
          <div
            className="rounded-2xl p-6 mb-8"
            style={{
              background: "oklch(0.2 0.04 28 / 0.5)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            <h3
              className="text-sm font-semibold mb-4 flex items-center gap-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🔤 Roman Transliteration
            </h3>
            <p className="text-muted-foreground text-sm leading-loose whitespace-pre-line font-mono">
              {bhajan.transliteration}
            </p>
          </div>
        )}

        {/* English Meaning */}
        {bhajan.englishMeaning && (
          <div
            className="rounded-2xl p-6 mb-8"
            style={{
              background: "oklch(0.2 0.04 28 / 0.5)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            <h3
              className="text-sm font-semibold mb-4 flex items-center gap-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🌐 English Meaning
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {bhajan.englishMeaning}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {prev ? (
            <Link
              to="/jain-bhajan/$id"
              params={{ id: prev.id }}
              data-ocid="bhajan.prev_button"
            >
              <div
                className="rounded-xl p-4 hover:border-primary/40 transition-all duration-200 cursor-pointer h-full flex flex-col justify-between"
                style={{
                  background: "oklch(0.18 0.05 28)",
                  border: "1px solid oklch(0.28 0.06 30)",
                }}
              >
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> पिछला भजन
                </div>
                <p className="text-sm font-semibold text-foreground line-clamp-2">
                  {prev.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {prev.deity}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              to="/jain-bhajan/$id"
              params={{ id: next.id }}
              data-ocid="bhajan.next_button"
            >
              <div
                className="rounded-xl p-4 hover:border-primary/40 transition-all duration-200 cursor-pointer h-full flex flex-col justify-between text-right"
                style={{
                  background: "oklch(0.18 0.05 28)",
                  border: "1px solid oklch(0.28 0.06 30)",
                }}
              >
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 justify-end">
                  अगला भजन <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm font-semibold text-foreground line-clamp-2">
                  {next.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {next.deity}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className="flex justify-center">
          <Link to="/bhajan-library" data-ocid="bhajan.back_button">
            <Button
              variant="outline"
              className="border-border hover:border-primary/40"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              भजन पुस्तकालय पर वापस जाएं
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
