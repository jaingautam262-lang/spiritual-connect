import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Search, Sparkles, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import BenefitsSection from "../components/BenefitsSection";
import FavouriteButton from "../components/FavouriteButton";
import { findBenefitsByTitle } from "../data/content-benefits-data";
import { part12Stotras } from "../data/part12Stotras";
import { part13Stotras } from "../data/part13Stotras";
import { part14Stotras } from "../data/part14Stotras";
import { part15Stotras } from "../data/part15Stotras";
import { part16Stotras } from "../data/part16Stotras";
import { part17Stotras } from "../data/part17Stotras";
import { part18Stotras } from "../data/part18Stotras";
import { part19Stotras } from "../data/part19Stotras";
import { part20Stotras } from "../data/part20Stotras";
import { part21Stotras } from "../data/part21Stotras";
import { part22aStotras } from "../data/part22aStotras";
import { part22bStotras } from "../data/part22bStotras";
import { part23aStotras } from "../data/part23aStotras";
import { part23bStotras } from "../data/part23bStotras";
import { part24aStotras } from "../data/part24aStotras";
import { part24bStotras } from "../data/part24bStotras";
import { part25Stotras } from "../data/part25Stotras";
import { part26Stotras } from "../data/part26Stotras";
import { part27Stotras } from "../data/part27Stotras";
import {
  SAHASRANAMA_BATCH,
  type SahasranamaBatchEntry,
} from "../data/sahasranamaBatch";
import { sahasranamaData } from "../data/sahasranamaData";
import { type Stotra, stotraData } from "../data/stotraData";

// Union type for display
type SahasranamEntry = Stotra | SahasranamaBatchEntry;

function isBatchEntry(e: SahasranamEntry): e is SahasranamaBatchEntry {
  return "totalNames" in e;
}

const deityIcons: Record<string, string> = {
  Vishnu: "🪷",
  Ganesha: "🐘",
  "Gayatri Mata": "🌞",
  Durga: "⚡",
  Shiva: "🔱",
  Lakshmi: "🌸",
  "Tulsi Mata": "🌿",
  Kali: "⚪",
  "Lalita Tripura Sundari": "👑",
  Hanuman: "🙏",
  "काल भैरव": "🔱",
  कुबेर: "💰",
  विष्णु: "🪷",
  लक्ष्मी: "🌸",
  ललिता: "🌹",
  दुर्गा: "⚡",
  शिव: "🔱",
  सरस्वती: "📚",
  हनुमान: "🙏",
  काली: "⚪",
};

function getDeityIcon(deity: string): string {
  for (const [key, icon] of Object.entries(deityIcons)) {
    if (deity.includes(key) || key.includes(deity)) return icon;
  }
  return "🕉️";
}

function BatchDetailView({
  entry,
  onBack,
}: {
  entry: SahasranamaBatchEntry;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Detail Header */}
      <div
        className="relative py-12 px-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.28 0.12 35) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-5 text-amber-300 hover:text-amber-100 hover:bg-white/10"
            data-ocid="sahasranam.back_button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sahasranamas
          </Button>
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
              style={{
                background: "oklch(0.78 0.14 75 / 0.15)",
                border: "2px solid oklch(0.78 0.14 75 / 0.35)",
              }}
            >
              {getDeityIcon(entry.deity)}
            </div>
            <div>
              <h1
                className="text-3xl font-bold mb-2 font-heading"
                style={{ color: "oklch(0.90 0.16 75)" }}
              >
                {entry.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.35)",
                    color: "oklch(0.95 0.12 80)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.6)",
                  }}
                >
                  {entry.faith}
                </Badge>
                <span
                  className="text-sm font-body"
                  style={{ color: "oklch(0.75 0.10 70)" }}
                >
                  Deity: {entry.deity}
                </span>
                <span
                  className="text-sm font-semibold font-body"
                  style={{ color: "oklch(0.90 0.16 75)" }}
                >
                  {entry.totalNames.toLocaleString()} Names
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
            background: "oklch(0.78 0.14 75 / 0.08)",
            borderColor: "oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          <h3
            className="font-bold mb-2 flex items-center gap-2 font-heading"
            style={{ color: "oklch(0.50 0.18 50)" }}
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

        {/* Sample Names Grid */}
        <div
          className="rounded-xl overflow-hidden mb-6 border"
          style={{ borderColor: "oklch(0.85 0.04 70)" }}
        >
          <div
            className="px-5 py-4 border-b flex items-center justify-between"
            style={{
              background: "oklch(0.94 0.025 80)",
              borderColor: "oklch(0.85 0.04 70)",
            }}
          >
            <span
              className="font-heading font-semibold text-sm"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              <BookOpen className="inline h-4 w-4 mr-1 mb-0.5" />
              Sample Names — {entry.totalNames.toLocaleString()} Total
            </span>
          </div>
          <div className="p-5" style={{ background: "oklch(0.99 0.008 80)" }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-5">
              {entry.sampleNames.map((name, idx) => (
                <div
                  key={name}
                  className="rounded-lg p-3 text-center border"
                  style={{
                    background: "oklch(0.97 0.015 75)",
                    borderColor: "oklch(0.85 0.06 70)",
                  }}
                >
                  <div
                    className="text-sm font-bold leading-tight font-devanagari"
                    style={{ color: "oklch(0.25 0.10 30)" }}
                  >
                    {name}
                  </div>
                  {entry.transliteration[idx] && (
                    <div
                      className="text-xs mt-1 font-body"
                      style={{ color: "oklch(0.58 0.06 50)" }}
                    >
                      {entry.transliteration[idx]}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p
              className="text-xs text-center font-body italic"
              style={{ color: "oklch(0.58 0.06 50)" }}
            >
              Showing 10 of {entry.totalNames.toLocaleString()} sacred names
            </p>
          </div>
        </div>

        {/* Meaning */}
        <div
          className="rounded-xl p-5 mb-6 border"
          style={{
            background: "oklch(0.98 0.012 80)",
            borderColor: "oklch(0.88 0.08 75)",
          }}
        >
          <h3
            className="font-bold mb-2 font-heading"
            style={{ color: "oklch(0.50 0.18 50)" }}
          >
            🔉 Meaning & Context
          </h3>
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.35 0.05 50)" }}
          >
            {entry.meaning}
          </p>
        </div>

        {/* Benefits */}
        <div
          className="rounded-xl p-5 mb-6 border"
          style={{
            background: "oklch(0.97 0.015 85)",
            borderColor: "oklch(0.88 0.08 75)",
          }}
        >
          <h3
            className="font-bold mb-3 flex items-center gap-2 font-heading"
            style={{ color: "oklch(0.50 0.18 50)" }}
          >
            <Sparkles className="h-4 w-4" />
            Benefits of Recitation
          </h3>
          <ul className="space-y-2">
            {entry.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 text-sm font-body"
                style={{ color: "oklch(0.35 0.05 50)" }}
              >
                <span style={{ color: "oklch(0.68 0.20 48)" }}>✦</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* BenefitsSection from CMS if available */}
        {(() => {
          const bd = findBenefitsByTitle(entry.title);
          return bd ? (
            <BenefitsSection
              className="mb-8"
              benefits={bd.benefits}
              bestTime={bd.bestTime}
              repetitions={bd.repetitions}
              deityBlessings={bd.deityBlessings}
              occasions={bd.occasions}
              contentName={entry.title}
            />
          ) : null;
        })()}

        {/* Footer note */}
        <p
          className="text-xs text-center font-body italic mt-4"
          style={{ color: "oklch(0.60 0.04 50)" }}
        >
          Complete text of {entry.totalNames.toLocaleString()} names available
          in printed editions and audio versions.
        </p>
      </div>
    </motion.div>
  );
}

function LegacyDetailView({
  stotra,
  onBack,
}: {
  stotra: Stotra;
  onBack: () => void;
}) {
  const benefitsData = findBenefitsByTitle(stotra.title);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      <div
        className="relative py-12 px-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.28 0.12 35) 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-4 text-amber-300 hover:text-amber-100 hover:bg-white/10"
            data-ocid="sahasranam.back_button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            वापस जाएं
          </Button>
          <div className="text-5xl mb-3">{getDeityIcon(stotra.deity)}</div>
          <h1
            className="text-3xl font-bold mb-2 font-heading"
            style={{ color: "oklch(0.90 0.16 75)" }}
          >
            {stotra.title}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Badge
              style={{
                background: "oklch(0.68 0.20 48 / 0.35)",
                color: "oklch(0.95 0.12 80)",
                border: "1px solid oklch(0.68 0.20 48 / 0.6)",
              }}
            >
              {stotra.faith}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {stotra.benefits && (
          <div
            className="rounded-xl p-5 mb-6 border"
            style={{
              background: "oklch(0.97 0.015 85)",
              borderColor: "oklch(0.88 0.08 75)",
            }}
          >
            <h3
              className="font-bold mb-2 flex items-center gap-2 font-heading"
              style={{ color: "oklch(0.50 0.18 50)" }}
            >
              <Star className="h-4 w-4" />
              पाठ के लाभ
            </h3>
            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.35 0.05 50)" }}
            >
              {stotra.benefits}
            </p>
          </div>
        )}

        <div
          className="rounded-xl p-6 mb-6 border"
          style={{
            background: "oklch(0.99 0.008 80)",
            borderColor: "oklch(0.88 0.08 75)",
          }}
          data-ocid="sahasranam.detail.panel"
        >
          <h3
            className="font-bold text-xl mb-4 flex items-center gap-2 font-heading"
            style={{ color: "oklch(0.50 0.18 50)" }}
          >
            <BookOpen className="h-5 w-5" />
            {stotra.title}
          </h3>
          <pre
            className="whitespace-pre-wrap font-sans text-base leading-loose"
            style={{
              color: "oklch(0.25 0.05 30)",
              fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif",
            }}
          >
            {stotra.fullText}
          </pre>
        </div>

        {stotra.meaning && (
          <div
            className="rounded-xl p-5 mb-6 border"
            style={{
              background: "oklch(0.98 0.012 80)",
              borderColor: "oklch(0.88 0.08 75)",
            }}
          >
            <h3
              className="font-bold mb-2 font-heading"
              style={{ color: "oklch(0.50 0.18 50)" }}
            >
              🔉 अर्थ एवं विवेचन
            </h3>
            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.35 0.05 50)" }}
            >
              {stotra.meaning}
            </p>
          </div>
        )}

        {benefitsData && (
          <BenefitsSection
            className="mb-8"
            benefits={benefitsData.benefits}
            bestTime={benefitsData.bestTime}
            repetitions={benefitsData.repetitions}
            deityBlessings={benefitsData.deityBlessings}
            occasions={benefitsData.occasions}
            contentName={stotra.title}
          />
        )}
      </div>
    </motion.div>
  );
}

export default function SahasranamLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [faithFilter, setFaithFilter] = useState("All");
  const [selected, setSelected] = useState<SahasranamEntry | null>(null);

  const sahasranams = useMemo(() => {
    // Collect legacy stotra-based sahasranamas
    const legacyStotraEntries: Stotra[] = [
      ...stotraData,
      ...part12Stotras,
      ...part13Stotras,
      ...part14Stotras,
      ...part15Stotras,
      ...part16Stotras,
      ...part17Stotras,
      ...part18Stotras,
      ...part19Stotras,
      ...part20Stotras,
      ...part21Stotras,
      ...part22aStotras,
      ...part22bStotras,
      ...part23aStotras,
      ...part23bStotras,
      ...part24aStotras,
      ...part24bStotras,
      ...part25Stotras,
      ...part26Stotras,
      ...part27Stotras,
    ].filter(
      (s) =>
        s.type === "Sahasranam" ||
        s.type === "sahasranam" ||
        s.type === "Sahasranama",
    );

    // Merge with dedicated sahasranamaData entries
    const existingIds = new Set(legacyStotraEntries.map((s) => s.id));
    const fromData = sahasranamaData.filter((s) => !existingIds.has(s.id));
    const legacyAll = [...legacyStotraEntries, ...fromData];

    // Merge with SAHASRANAMA_BATCH — deduplicate by id
    const legacyIds = new Set(legacyAll.map((s) => s.id));
    const newBatchEntries = SAHASRANAMA_BATCH.filter(
      (s) => !legacyIds.has(s.id),
    );

    return [...legacyAll, ...newBatchEntries] as SahasranamEntry[];
  }, []);

  const faithOptions = [
    "All",
    ...Array.from(new Set(sahasranams.map((s) => s.faith))),
  ];

  const filtered = sahasranams.filter((s) => {
    const title = s.title.toLowerCase();
    const deity = s.deity.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !searchQuery ||
      title.includes(q) ||
      deity.includes(q) ||
      (isBatchEntry(s)
        ? s.significance.toLowerCase().includes(q)
        : (s.description ?? "").toLowerCase().includes(q));
    const matchFaith = faithFilter === "All" || s.faith === faithFilter;
    return matchSearch && matchFaith;
  });

  if (selected) {
    return (
      <AnimatePresence mode="wait">
        {isBatchEntry(selected) ? (
          <BatchDetailView
            key={selected.id}
            entry={selected}
            onBack={() => setSelected(null)}
          />
        ) : (
          <LegacyDetailView
            key={selected.id}
            stotra={selected as Stotra}
            onBack={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-16 px-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.30 0.14 38) 60%, oklch(0.25 0.10 30) 100%)",
        }}
      >
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="text-6xl mb-4"
          >
            🕉️
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-3 font-heading"
            style={{ color: "oklch(0.90 0.16 75)" }}
          >
            Sahasranama Library
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base mb-6 font-body"
            style={{ color: "oklch(0.75 0.10 70)" }}
          >
            80+ sacred sahasranamas — the thousand divine names of deities
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Badge
              className="text-base px-6 py-2"
              style={{
                background: "oklch(0.68 0.20 48 / 0.25)",
                color: "oklch(0.90 0.14 75)",
                border: "1px solid oklch(0.78 0.14 75 / 0.5)",
              }}
            >
              {sahasranams.length} Sahasranamas
            </Badge>
          </motion.div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.60 0.10 50)" }}
            />
            <Input
              placeholder="Search by deity or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 font-body"
              style={{
                borderColor: "oklch(0.78 0.14 75 / 0.6)",
                background: "oklch(0.99 0.008 80)",
              }}
              data-ocid="sahasranam.search_input"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {faithOptions.map((faith) => (
              <Button
                key={faith}
                variant={faithFilter === faith ? "default" : "outline"}
                size="sm"
                onClick={() => setFaithFilter(faith)}
                style={
                  faithFilter === faith
                    ? {
                        background: "oklch(0.68 0.20 48)",
                        color: "white",
                        border: "1px solid oklch(0.68 0.20 48)",
                      }
                    : {
                        borderColor: "oklch(0.78 0.14 75 / 0.6)",
                        color: "oklch(0.50 0.18 50)",
                      }
                }
                data-ocid="sahasranam.faith.tab"
              >
                {faith}
              </Button>
            ))}
          </div>
        </motion.div>

        <p
          className="text-sm mb-6 font-body"
          style={{ color: "oklch(0.55 0.08 50)" }}
        >
          {filtered.length} sahasranamas found
        </p>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="sahasranam.empty_state">
            <div className="text-5xl mb-4">🕉️</div>
            <p className="font-body" style={{ color: "oklch(0.55 0.08 50)" }}>
              No sahasranamas found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                className="rounded-2xl overflow-hidden border cursor-pointer group hover:shadow-xl transition-all duration-300"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  borderColor: "oklch(0.88 0.08 75 / 0.8)",
                }}
                onClick={() => setSelected(entry)}
                data-ocid={`sahasranam.item.${idx + 1}`}
              >
                {/* Gold top bar */}
                <div
                  className="h-1 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48), oklch(0.78 0.14 75))",
                  }}
                />
                {/* Card Header */}
                <div
                  className="p-5"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.28 0.12 35) 100%)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl">
                      {getDeityIcon(entry.deity)}
                    </span>
                    <div className="flex flex-col items-end gap-1">
                      <FavouriteButton
                        item={{
                          id: entry.id,
                          type: "sahasranam",
                          title: entry.title,
                          subtitle: entry.deity,
                          path: "/sahasranam",
                          icon: "🕉️",
                        }}
                      />
                      <Badge
                        className="text-xs"
                        style={{
                          background: "oklch(0.68 0.20 48 / 0.35)",
                          color: "oklch(0.95 0.12 80)",
                          border: "1px solid oklch(0.68 0.20 48 / 0.6)",
                        }}
                      >
                        {entry.faith}
                      </Badge>
                      {isBatchEntry(entry) && (
                        <span
                          className="text-xs font-semibold font-heading"
                          style={{ color: "oklch(0.90 0.14 75)" }}
                        >
                          {entry.totalNames.toLocaleString()} names
                        </span>
                      )}
                    </div>
                  </div>
                  <h3
                    className="font-bold text-lg leading-tight font-heading"
                    style={{ color: "oklch(0.90 0.16 75)" }}
                  >
                    {entry.title}
                  </h3>
                  <p
                    className="text-sm mt-1 font-body"
                    style={{ color: "oklch(0.75 0.10 70)" }}
                  >
                    {entry.deity}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {isBatchEntry(entry) ? (
                    <>
                      {/* Sample names preview */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {entry.sampleNames.slice(0, 4).map((name) => (
                          <span
                            key={name}
                            className="text-xs px-2 py-0.5 rounded-full border font-devanagari"
                            style={{
                              background: "oklch(0.97 0.015 75)",
                              borderColor: "oklch(0.85 0.06 70)",
                              color: "oklch(0.30 0.10 30)",
                            }}
                          >
                            {name}
                          </span>
                        ))}
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-body"
                          style={{ color: "oklch(0.58 0.06 50)" }}
                        >
                          +{entry.totalNames - 4} more…
                        </span>
                      </div>
                      <p
                        className="text-xs leading-relaxed line-clamp-2 font-body"
                        style={{ color: "oklch(0.45 0.06 50)" }}
                      >
                        {entry.meaning}
                      </p>
                    </>
                  ) : (
                    <p
                      className="text-xs leading-relaxed line-clamp-3 font-body"
                      style={{ color: "oklch(0.45 0.06 50)" }}
                    >
                      {(entry as Stotra).description}
                    </p>
                  )}

                  <div
                    className="mt-4 flex items-center text-sm font-medium group-hover:underline font-body"
                    style={{ color: "oklch(0.55 0.18 50)" }}
                  >
                    Read Sahasranama →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
