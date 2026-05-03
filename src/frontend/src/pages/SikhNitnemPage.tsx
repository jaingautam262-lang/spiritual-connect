import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { type NitnemEntry, SIKH_NITNEM } from "../data/sikhNitnem";

const authorColors: Record<string, string> = {
  "Guru Nanak Dev Ji": "oklch(0.55 0.18 260)",
  "Guru Gobind Singh Ji": "oklch(0.55 0.18 20)",
  "Guru Amar Das Ji": "oklch(0.50 0.16 140)",
  "Guru Arjan Dev Ji": "oklch(0.52 0.18 200)",
};

function getAuthorColor(author: string): string {
  for (const [key, color] of Object.entries(authorColors)) {
    if (author.includes(key)) return color;
  }
  return "oklch(0.55 0.12 75)";
}

const nitnemIcons: Record<string, string> = {
  "japji-sahib": "🌅",
  "chaupai-sahib": "🛡️",
  "anand-sahib": "🎵",
  "rehras-sahib": "🌇",
  "sukhmani-sahib": "💎",
};

function DetailView({
  entry,
  onBack,
}: {
  entry: NitnemEntry;
  onBack: () => void;
}) {
  const icon = nitnemIcons[entry.id] ?? "🙏";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Header */}
      <div
        className="relative py-12 px-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.06 245) 0%, oklch(0.22 0.08 258) 50%, oklch(0.26 0.08 60) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 75% 30%, oklch(0.65 0.18 260) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-5 hover:bg-white/10"
            style={{ color: "oklch(0.85 0.10 75)" }}
            data-ocid="nitnem.back_button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Nitnem
          </Button>
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
              style={{
                background: "oklch(0.78 0.14 75 / 0.15)",
                border: "2px solid oklch(0.78 0.14 75 / 0.35)",
              }}
            >
              {icon}
            </div>
            <div>
              <h1
                className="text-3xl font-bold mb-2 font-heading"
                style={{ color: "oklch(0.90 0.16 75)" }}
              >
                {entry.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  style={{
                    background: "oklch(0.55 0.18 260 / 0.35)",
                    color: "oklch(0.85 0.12 260)",
                    border: "1px solid oklch(0.55 0.18 260 / 0.6)",
                  }}
                >
                  Sikh
                </Badge>
                <Badge
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.25)",
                    color: "oklch(0.90 0.14 75)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.5)",
                  }}
                >
                  Nitnem
                </Badge>
                <span
                  className="text-sm font-body"
                  style={{ color: "oklch(0.75 0.10 70)" }}
                >
                  {entry.author.split(",")[0].trim()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Significance */}
        <div
          className="rounded-xl p-5 mb-6 border"
          style={{
            background: "oklch(0.55 0.18 260 / 0.06)",
            borderColor: "oklch(0.55 0.18 260 / 0.25)",
          }}
        >
          <h3
            className="font-bold mb-2 flex items-center gap-2 font-heading"
            style={{ color: "oklch(0.40 0.18 258)" }}
          >
            <Star className="h-4 w-4" />
            Significance
          </h3>
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.35 0.05 50)" }}
          >
            {entry.significance}
          </p>
        </div>

        {/* Best Time */}
        <div
          className="rounded-xl p-4 mb-6 flex items-center gap-3 border"
          style={{
            background: "oklch(0.68 0.20 48 / 0.07)",
            borderColor: "oklch(0.68 0.20 48 / 0.25)",
          }}
        >
          <Clock
            className="h-5 w-5 flex-shrink-0"
            style={{ color: "oklch(0.62 0.18 48)" }}
          />
          <div>
            <p
              className="text-xs font-heading font-semibold uppercase tracking-wide"
              style={{ color: "oklch(0.62 0.18 48)" }}
            >
              Best Time to Recite
            </p>
            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.35 0.05 50)" }}
            >
              {entry.bestTime}
            </p>
          </div>
        </div>

        {/* Verses */}
        <div
          className="rounded-2xl overflow-hidden border mb-6"
          style={{ borderColor: "oklch(0.85 0.04 70)" }}
        >
          <div
            className="px-5 py-4 border-b flex items-center gap-2"
            style={{
              background: "oklch(0.94 0.025 80)",
              borderColor: "oklch(0.85 0.04 70)",
            }}
          >
            <BookOpen
              className="h-4 w-4"
              style={{ color: "oklch(0.55 0.18 260)" }}
            />
            <span
              className="font-heading font-semibold text-sm"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {entry.title} — Selected Verses
            </span>
          </div>
          <div
            className="divide-y"
            style={{
              background: "oklch(0.99 0.008 80)",
              borderColor: "oklch(0.88 0.04 70)",
            }}
          >
            {entry.verses.map((verse, idx) => (
              <motion.div
                key={`${entry.id}-${verse.num}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="p-6"
                data-ocid={`nitnem.verse.${idx + 1}`}
              >
                {/* Verse number */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading flex-shrink-0"
                    style={{
                      background: "oklch(0.55 0.18 260 / 0.12)",
                      color: "oklch(0.40 0.18 258)",
                      border: "1px solid oklch(0.55 0.18 260 / 0.3)",
                    }}
                  >
                    {verse.num}
                  </span>
                  <span
                    className="text-xs font-heading uppercase tracking-wider"
                    style={{ color: "oklch(0.58 0.06 50)" }}
                  >
                    Pauri {verse.num}
                  </span>
                </div>

                {/* Gurmukhi */}
                <div
                  className="rounded-lg p-4 mb-3 border"
                  style={{
                    background: "oklch(0.55 0.18 260 / 0.04)",
                    borderColor: "oklch(0.55 0.18 260 / 0.18)",
                  }}
                >
                  <p
                    className="text-sm leading-loose font-body"
                    style={{
                      color: "oklch(0.22 0.06 28)",
                      fontFamily:
                        "'Noto Sans Gurmukhi', 'Gurbani Akhar', sans-serif",
                      fontSize: "1rem",
                      lineHeight: "1.9",
                    }}
                  >
                    {verse.gurmukhi}
                  </p>
                </div>

                {/* Transliteration */}
                <div
                  className="rounded-lg p-3 mb-3 border"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.05)",
                    borderColor: "oklch(0.68 0.20 48 / 0.18)",
                  }}
                >
                  <p
                    className="text-xs font-heading font-semibold mb-1 uppercase tracking-wide"
                    style={{ color: "oklch(0.62 0.18 48)" }}
                  >
                    Roman Transliteration
                  </p>
                  <p
                    className="text-sm font-body leading-relaxed italic"
                    style={{ color: "oklch(0.40 0.06 50)" }}
                  >
                    {verse.romanTransliteration}
                  </p>
                </div>

                {/* English Translation */}
                <div
                  className="rounded-lg p-3 border"
                  style={{
                    background: "oklch(0.97 0.015 85)",
                    borderColor: "oklch(0.85 0.04 70)",
                  }}
                >
                  <p
                    className="text-xs font-heading font-semibold mb-1 uppercase tracking-wide"
                    style={{ color: "oklch(0.50 0.06 50)" }}
                  >
                    English Translation
                  </p>
                  <p
                    className="text-sm font-body leading-relaxed"
                    style={{ color: "oklch(0.35 0.05 50)" }}
                  >
                    {verse.english}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Author note */}
        <div
          className="rounded-xl p-4 text-center border"
          style={{
            background: "oklch(0.55 0.18 260 / 0.05)",
            borderColor: "oklch(0.55 0.18 260 / 0.18)",
          }}
        >
          <p
            className="text-sm font-body"
            style={{ color: "oklch(0.40 0.06 50)" }}
          >
            Composed by{" "}
            <span
              className="font-semibold"
              style={{ color: getAuthorColor(entry.author) }}
            >
              {entry.author}
            </span>
          </p>
          <p
            className="text-xs mt-1 font-body"
            style={{ color: "oklch(0.60 0.04 50)" }}
          >
            Selected verses shown. Complete text available in Sri Guru Granth
            Sahib Ji.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SikhNitnemPage() {
  const [selected, setSelected] = useState<NitnemEntry | null>(null);

  if (selected) {
    return (
      <AnimatePresence mode="wait">
        <DetailView
          key={selected.id}
          entry={selected}
          onBack={() => setSelected(null)}
        />
      </AnimatePresence>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Hero Banner */}
      <div
        className="relative py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.06 245) 0%, oklch(0.22 0.08 258) 55%, oklch(0.28 0.10 60) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 60%, oklch(0.78 0.14 75) 0%, transparent 55%), radial-gradient(circle at 80% 20%, oklch(0.65 0.18 260) 0%, transparent 45%)",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🙏</div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.90 0.16 75)" }}
          >
            Sikh Nitnem
          </h1>
          <p
            className="font-body text-base max-w-xl mx-auto mb-5"
            style={{ color: "oklch(0.78 0.14 75 / 0.75)" }}
          >
            Sacred daily prayers — Japji, Chaupai, Anand, Rehras & Sukhmani
            Sahib with Gurmukhi text, Roman transliteration and English
            translation
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Badge
              style={{
                background: "oklch(0.55 0.18 260 / 0.3)",
                color: "oklch(0.85 0.12 260)",
                border: "1px solid oklch(0.55 0.18 260 / 0.6)",
              }}
            >
              Sikh
            </Badge>
            <Badge
              style={{
                background: "oklch(0.68 0.20 48 / 0.25)",
                color: "oklch(0.90 0.14 75)",
                border: "1px solid oklch(0.68 0.20 48 / 0.5)",
              }}
            >
              {SIKH_NITNEM.length} Prayers
            </Badge>
            <Badge
              style={{
                background: "oklch(0.45 0.12 140 / 0.25)",
                color: "oklch(0.75 0.14 140)",
                border: "1px solid oklch(0.45 0.12 140 / 0.5)",
              }}
            >
              Gurmukhi + Translation
            </Badge>
          </div>
        </div>
      </div>

      {/* Prayer Cards */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIKH_NITNEM.map((entry, idx) => {
            const icon = nitnemIcons[entry.id] ?? "🙏";
            const authorColor = getAuthorColor(entry.author);
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-2xl overflow-hidden border cursor-pointer group hover:shadow-xl transition-all duration-300"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  borderColor: "oklch(0.88 0.08 75 / 0.8)",
                }}
                onClick={() => setSelected(entry)}
                data-ocid={`nitnem.item.${idx + 1}`}
              >
                {/* Blue-gold top bar */}
                <div
                  className="h-1 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.55 0.18 260), oklch(0.68 0.20 48), oklch(0.55 0.18 260))",
                  }}
                />

                {/* Card Header */}
                <div
                  className="p-5"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.16 0.06 245) 0%, oklch(0.22 0.08 258) 100%)",
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{icon}</span>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        className="text-xs"
                        style={{
                          background: "oklch(0.55 0.18 260 / 0.35)",
                          color: "oklch(0.85 0.12 260)",
                          border: "1px solid oklch(0.55 0.18 260 / 0.6)",
                        }}
                      >
                        Sikh
                      </Badge>
                      <Badge
                        className="text-xs"
                        style={{
                          background: "oklch(0.68 0.20 48 / 0.25)",
                          color: "oklch(0.90 0.14 75)",
                          border: "1px solid oklch(0.68 0.20 48 / 0.4)",
                        }}
                      >
                        Nitnem
                      </Badge>
                    </div>
                  </div>
                  <h3
                    className="font-bold text-xl font-heading"
                    style={{ color: "oklch(0.90 0.16 75)" }}
                  >
                    {entry.title}
                  </h3>
                  <p
                    className="text-sm mt-1 font-body"
                    style={{ color: authorColor }}
                  >
                    {entry.author.split(",")[0].trim()}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Best time */}
                  <div
                    className="flex items-center gap-2 text-xs rounded-lg px-3 py-2 mb-3 border"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.07)",
                      borderColor: "oklch(0.68 0.20 48 / 0.22)",
                      color: "oklch(0.52 0.14 50)",
                    }}
                  >
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    <span className="font-body">{entry.bestTime}</span>
                  </div>

                  {/* Significance snippet */}
                  <p
                    className="text-xs leading-relaxed line-clamp-3 font-body mb-4"
                    style={{ color: "oklch(0.45 0.06 50)" }}
                  >
                    {entry.significance}
                  </p>

                  {/* Verse count + read CTA */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-heading font-medium"
                      style={{ color: "oklch(0.60 0.08 50)" }}
                    >
                      {entry.verses.length} verses shown
                    </span>
                    <span
                      className="text-xs font-heading font-semibold group-hover:underline"
                      style={{ color: "oklch(0.55 0.18 260)" }}
                    >
                      Read Prayer →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info footer */}
        <div
          className="mt-10 rounded-xl p-6 text-center border"
          style={{
            background: "oklch(0.55 0.18 260 / 0.05)",
            borderColor: "oklch(0.55 0.18 260 / 0.18)",
          }}
        >
          <p
            className="text-sm font-body"
            style={{ color: "oklch(0.40 0.06 50)" }}
          >
            🙏 Nitnem are the daily prayers for Sikhs, recited at fixed times
            each day. Each prayer is from the Sri Guru Granth Sahib Ji or Dasam
            Granth Sahib.
          </p>
        </div>
      </div>
    </div>
  );
}
