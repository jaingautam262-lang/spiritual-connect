/**
 * ContentCard.tsx
 * Reusable bilingual spiritual content display card.
 * Handles: aarti, chalisa, stotra, mantra, kavach, ashtakam, stuti, sahasranama.
 *
 * Language behaviour:
 *   lang='hi'  → titleHindi (or title), text in Devanagari, meaningHindi primary
 *   lang='en'  → title in English, text in Devanagari, meaningEnglish primary
 *   Transliteration is always shown below the Devanagari text.
 */
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export interface ContentCardProps {
  title: string;
  titleHindi?: string;
  text: string;
  transliteration?: string;
  meaningHindi?: string;
  meaningEnglish?: string;
  showOriginalScript?: boolean;
  className?: string;
}

export function ContentCard({
  title,
  titleHindi,
  text,
  transliteration,
  meaningHindi,
  meaningEnglish,
  className = "",
}: ContentCardProps) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayTitle = isHindi ? titleHindi || title : title;
  const primaryMeaning = isHindi
    ? meaningHindi || meaningEnglish || ""
    : meaningEnglish || meaningHindi || "";

  // Collapse long texts — show first 800 chars when collapsed
  const COLLAPSE_THRESHOLD = 800;
  const isLong = text.length > COLLAPSE_THRESHOLD;
  const displayText =
    isLong && !expanded ? `${text.slice(0, COLLAPSE_THRESHOLD)}\n\n…` : text;
  const displayTranslit =
    transliteration && isLong && !expanded
      ? `${transliteration.slice(0, COLLAPSE_THRESHOLD)}\n\n…`
      : transliteration;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  async function handleShare() {
    const shareData = {
      title: displayTitle,
      text: `${displayTitle}\n\n${text.slice(0, 300)}…`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — ignore
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(`${displayTitle}\n\n${text}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        border: "1px solid oklch(0.78 0.14 75 / 0.22)",
        boxShadow: "0 4px 24px oklch(0.62 0.18 48 / 0.08)",
      }}
    >
      {/* Gold top bar */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
        }}
      />

      {/* Header */}
      <div
        className="px-6 py-4 flex items-start justify-between gap-3"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.09 28) 0%, oklch(0.26 0.08 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.14)",
        }}
      >
        <div className="min-w-0">
          <h2
            className="font-heading font-bold text-lg md:text-xl leading-snug"
            style={{ color: "oklch(0.88 0.10 70)" }}
          >
            {displayTitle}
          </h2>
          {isHindi && title !== titleHindi && titleHindi && (
            <p
              className="text-sm mt-0.5 font-body"
              style={{ color: "oklch(0.70 0.06 60)" }}
            >
              {title}
            </p>
          )}
          {!isHindi && titleHindi && (
            <p
              className="text-sm mt-0.5"
              style={{
                color: "oklch(0.70 0.06 60)",
                fontFamily: "'Noto Sans Devanagari', serif",
              }}
            >
              {titleHindi}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="h-8 w-8 p-0 rounded-full"
            style={{ color: "oklch(0.78 0.14 75 / 0.8)" }}
            aria-label={isHindi ? "कॉपी करें" : "Copy text"}
            data-ocid="content_card.copy_button"
          >
            {copied ? (
              <Check
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.65 0.18 145)" }}
              />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleShare}
            className="h-8 w-8 p-0 rounded-full"
            style={{ color: "oklch(0.78 0.14 75 / 0.8)" }}
            aria-label={isHindi ? "शेयर करें" : "Share"}
            data-ocid="content_card.share_button"
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Meaning / Description */}
      {primaryMeaning && (
        <div
          className="px-6 py-3"
          style={{
            background: "oklch(0.78 0.14 75 / 0.06)",
            borderBottom: "1px solid oklch(0.78 0.14 75 / 0.10)",
          }}
        >
          <p
            className="text-sm font-body leading-relaxed"
            style={{
              color: "oklch(0.82 0.06 65)",
              fontFamily: isHindi ? "'Noto Sans Devanagari', serif" : "inherit",
            }}
          >
            {primaryMeaning}
          </p>
        </div>
      )}

      {/* Devanagari Text */}
      <div
        className="px-6 pt-5 pb-3"
        style={{ background: "oklch(0.18 0.07 22)" }}
      >
        <p
          className="text-[10px] uppercase tracking-widest font-heading mb-3"
          style={{ color: "oklch(0.68 0.14 75 / 0.7)" }}
        >
          {isHindi ? "मूल पाठ" : "Original Text"}
        </p>
        <pre
          className="whitespace-pre-wrap font-devanagari leading-loose text-base md:text-lg"
          style={{
            color: "oklch(0.92 0.04 70)",
            fontFamily: "'Noto Sans Devanagari', serif",
            letterSpacing: "0.01em",
          }}
        >
          {displayText}
        </pre>
      </div>

      {/* Transliteration */}
      {transliteration && (
        <div
          className="px-6 pt-3 pb-4"
          style={{
            background: "oklch(0.18 0.07 22)",
            borderTop: "1px solid oklch(0.78 0.14 75 / 0.08)",
          }}
        >
          <p
            className="text-[10px] uppercase tracking-widest font-heading mb-2"
            style={{ color: "oklch(0.68 0.14 75 / 0.5)" }}
          >
            {isHindi ? "रोमन लिप्यंतरण" : "Roman Transliteration"}
          </p>
          <pre
            className="whitespace-pre-wrap font-body text-sm leading-loose"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            {displayTranslit}
          </pre>
        </div>
      )}

      {/* Expand / Collapse toggle */}
      {isLong && (
        <div
          className="px-6 pb-4"
          style={{ background: "oklch(0.18 0.07 22)" }}
        >
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-heading font-semibold transition-opacity hover:opacity-80"
            style={{ color: "oklch(0.78 0.14 75)" }}
            data-ocid="content_card.expand_button"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3.5 w-3.5" />
                {isHindi ? "कम दिखाएं" : "Show less"}
              </>
            ) : (
              <>
                <ChevronDown className="h-3.5 w-3.5" />
                {isHindi ? "पूरा पाठ देखें" : "Read full text"}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ContentCard;
