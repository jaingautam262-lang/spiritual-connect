import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import BenefitsSection from "../components/BenefitsSection";
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
  type Stotra as StotraEntry,
  stotraData,
  stotraTypes,
} from "../data/stotraData";

const typeColors: Record<string, { bg: string; text: string; border: string }> =
  {
    Stotram: {
      bg: "oklch(0.62 0.18 48 / 0.15)",
      text: "oklch(0.52 0.18 48)",
      border: "oklch(0.62 0.18 48 / 0.3)",
    },
    Ashtakam: {
      bg: "oklch(0.55 0.12 200 / 0.15)",
      text: "oklch(0.40 0.12 200)",
      border: "oklch(0.55 0.12 200 / 0.3)",
    },
    Stotra: {
      bg: "oklch(0.65 0.16 140 / 0.15)",
      text: "oklch(0.42 0.14 140)",
      border: "oklch(0.65 0.16 140 / 0.3)",
    },
  };

const deityIcons: Record<string, string> = {
  आदिनाथ: "🔯",
  पार्श्वनाथ: "🐍",
  "पंच परमेष्ठी": "🙏",
  Navagraha: "🌟",
  Shiva: "🔱",
  Rama: "🏹",
  Lakshmi: "🪷",
  Devi: "🌸",
  Bhairav: "⚔️",
  Ganesha: "🐘",
  Pitru: "🪔",
  Vishnu: "🌀",
  Surya: "☀️",
  Annapurna: "🍚",
  Kali: "🔪",
  "Lalita Devi": "👑",
  Ganga: "🌊",
  Shani: "⚖️",
};

function TypeBadge({ type }: { type: string }) {
  const color = typeColors[type] ?? typeColors.Stotram;
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-heading tracking-wide"
      style={{
        background: color.bg,
        color: color.text,
        border: `1px solid ${color.border}`,
      }}
    >
      {type}
    </span>
  );
}

function StotraCard({
  stotra,
  index,
  onClick,
}: {
  stotra: StotraEntry;
  index: number;
  onClick: () => void;
}) {
  const icon = deityIcons[stotra.deity] ?? "📿";
  return (
    <button
      type="button"
      data-ocid={`stotra.item.${index + 1}`}
      onClick={onClick}
      className="w-full text-left rounded-xl border transition-all duration-300 overflow-hidden group focus:outline-none focus-visible:ring-2"
      style={{
        background: "oklch(0.99 0.008 80)",
        borderColor: "oklch(0.85 0.04 70)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "oklch(0.78 0.14 75 / 0.6)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow =
          "0 6px 24px oklch(0.62 0.18 48 / 0.15), 0 0 0 1px oklch(0.78 0.14 75 / 0.2)";
        (e.currentTarget as HTMLButtonElement).style.transform =
          "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "oklch(0.85 0.04 70)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
        (e.currentTarget as HTMLButtonElement).style.transform = "";
      }}
    >
      {/* Gold top bar */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48), oklch(0.78 0.14 75))",
        }}
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ background: "oklch(0.94 0.025 80)" }}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-heading font-bold text-base leading-tight mb-1 truncate"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              {stotra.title}
            </h3>
            <p
              className="text-xs font-body"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              {stotra.deity}
            </p>
          </div>
          <TypeBadge type={stotra.type} />
        </div>
        <p
          className="text-sm font-body leading-relaxed line-clamp-2"
          style={{ color: "oklch(0.40 0.04 40)" }}
        >
          {stotra.description}
        </p>
        <div
          className="mt-4 pt-3 border-t flex items-center justify-between"
          style={{ borderColor: "oklch(0.85 0.04 70)" }}
        >
          <span
            className="text-xs font-heading tracking-wide"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            {stotra.faith}
          </span>
          <span
            className="text-xs font-heading font-semibold flex items-center gap-1"
            style={{ color: "oklch(0.62 0.18 48)" }}
          >
            Read Stotra <BookOpen className="h-3 w-3" />
          </span>
        </div>
      </div>
    </button>
  );
}

function DetailView({
  stotra,
  onBack,
}: { stotra: StotraEntry; onBack: () => void }) {
  const icon = deityIcons[stotra.deity] ?? "📿";
  const benefitsData = findBenefitsByTitle(stotra.title);
  return (
    <div className="max-w-3xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        data-ocid="stotra.back_button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-heading font-semibold transition-colors hover:opacity-80"
        style={{ color: "oklch(0.62 0.18 48)" }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Stotras
      </button>

      {/* Header card */}
      <div
        className="rounded-2xl overflow-hidden mb-6"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
          border: "1px solid oklch(0.78 0.14 75 / 0.3)",
          boxShadow: "0 8px 32px oklch(0.62 0.18 48 / 0.15)",
        }}
      >
        <div
          className="h-1"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48), oklch(0.78 0.14 75))",
          }}
        />
        <div className="p-8 flex items-center gap-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              border: "2px solid oklch(0.78 0.14 75 / 0.3)",
            }}
          >
            {icon}
          </div>
          <div>
            <h1
              className="font-heading text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {stotra.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <TypeBadge type={stotra.type} />
              <span
                className="text-sm font-body"
                style={{ color: "oklch(0.70 0.06 60)" }}
              >
                Deity: {stotra.deity}
              </span>
              <span
                className="text-sm font-body"
                style={{ color: "oklch(0.70 0.06 60)" }}
              >
                Faith: {stotra.faith}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        className="rounded-xl p-5 mb-6"
        style={{
          background: "oklch(0.78 0.14 75 / 0.08)",
          border: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="flex items-start gap-2">
          <Star
            className="h-4 w-4 flex-shrink-0 mt-0.5"
            style={{ color: "oklch(0.78 0.14 75)" }}
          />
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.35 0.06 35)" }}
          >
            {stotra.description}
          </p>
        </div>
      </div>

      {/* Full text */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          border: "1px solid oklch(0.85 0.04 70)",
          boxShadow: "0 2px 12px oklch(0.62 0.18 48 / 0.06)",
        }}
      >
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
          style={{
            background: "oklch(0.94 0.025 80)",
            borderColor: "oklch(0.85 0.04 70)",
          }}
        >
          <span
            className="font-heading font-semibold text-sm"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            पूर्ण पाठ — Full Text
          </span>
        </div>
        <div
          className="p-6 md:p-8"
          style={{ background: "oklch(0.99 0.008 80)" }}
        >
          <pre
            className="whitespace-pre-wrap font-body text-base md:text-lg leading-loose font-devanagari"
            style={{
              color: "oklch(0.22 0.06 28)",
              letterSpacing: "0.01em",
            }}
          >
            {stotra.fullText}
          </pre>
        </div>
      </div>

      {/* Benefits Section */}
      {benefitsData && (
        <BenefitsSection
          className="mt-6"
          benefits={benefitsData.benefits}
          bestTime={benefitsData.bestTime}
          repetitions={benefitsData.repetitions}
          deityBlessings={benefitsData.deityBlessings}
          occasions={benefitsData.occasions}
          contentName={stotra.title}
        />
      )}
    </div>
  );
}

export default function Stotra() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [selected, setSelected] = useState<StotraEntry | null>(null);

  const allStotras = useMemo(() => {
    const raw = [
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
    ];
    // Deduplicate by id — keep first occurrence (canonical source wins)
    const seen = new Set<string>();
    return raw.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });
  }, []);

  const filtered = allStotras.filter((s) => {
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.deity.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === "All" || s.type === activeType;
    return matchSearch && matchType;
  });

  if (selected) {
    return (
      <div
        className="min-h-screen"
        style={{ background: "oklch(0.97 0.015 85)" }}
      >
        <div className="container mx-auto px-4 py-8">
          <DetailView stotra={selected} onBack={() => setSelected(null)} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Banner */}
      <div
        className="relative py-14 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 60%, oklch(0.30 0.10 35) 100%)",
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
          style={{ background: "oklch(0.78 0.14 75)" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10"
          style={{ background: "oklch(0.68 0.20 48)" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-5xl mb-4">📿</div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Stotra Library
          </h1>
          <p
            className="font-body text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            Sacred hymns of praise — explore powerful Sanskrit stotras,
            ashtakams, and protective recitations
          </p>
          <div
            className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-heading"
            style={{
              background: "oklch(0.78 0.14 75 / 0.12)",
              border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            {allStotras.length} Stotras • Hindu
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.55 0.04 50)" }}
            />
            <Input
              data-ocid="stotra.search_input"
              placeholder="Search by title or deity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 font-body"
              style={{
                background: "oklch(0.99 0.008 80)",
                borderColor: "oklch(0.85 0.04 70)",
                color: "oklch(0.22 0.06 28)",
              }}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {stotraTypes.map((t) => (
              <button
                key={t}
                type="button"
                data-ocid="stotra.filter.tab"
                onClick={() => setActiveType(t)}
                className="px-4 py-1.5 rounded-full text-sm font-heading font-medium transition-all duration-200"
                style={{
                  background:
                    activeType === t
                      ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                      : "oklch(0.94 0.025 80)",
                  color:
                    activeType === t
                      ? "oklch(0.99 0.005 80)"
                      : "oklch(0.45 0.04 40)",
                  border:
                    activeType === t
                      ? "1px solid oklch(0.68 0.20 48)"
                      : "1px solid oklch(0.85 0.04 70)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <p
          className="text-sm font-body mb-6"
          style={{ color: "oklch(0.55 0.04 50)" }}
        >
          Showing {filtered.length} of {allStotras.length} stotras
        </p>

        {filtered.length === 0 ? (
          <div
            data-ocid="stotra.empty_state"
            className="text-center py-20 rounded-2xl border"
            style={{
              background: "oklch(0.99 0.008 80)",
              borderColor: "oklch(0.85 0.04 70)",
            }}
          >
            <div className="text-5xl mb-4">🔍</div>
            <p
              className="font-heading text-lg"
              style={{ color: "oklch(0.40 0.04 40)" }}
            >
              No stotras found
            </p>
            <p
              className="font-body text-sm mt-1"
              style={{ color: "oklch(0.60 0.04 50)" }}
            >
              Try a different search or filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((stotra, i) => (
              <StotraCard
                key={stotra.id}
                stotra={stotra}
                index={i}
                onClick={() => setSelected(stotra)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
