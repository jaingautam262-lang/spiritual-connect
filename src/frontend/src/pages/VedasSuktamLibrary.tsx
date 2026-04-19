import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SuktamMiniPlayer } from "../components/SuktamMiniPlayer";
import { suktamData } from "../data/suktamData";
import { vedasOverview } from "../data/vedaOverviewData";

const VEDA_FILTERS = ["All", "Rigveda", "Samaveda", "Yajurveda", "Atharvaveda"];

const vedaColorMap: Record<string, string> = {
  Rigveda: "oklch(0.68 0.20 48)",
  Samaveda: "oklch(0.60 0.15 260)",
  Yajurveda: "oklch(0.55 0.15 155)",
  Atharvaveda: "oklch(0.60 0.15 300)",
};

const vedaBgMap: Record<string, string> = {
  Rigveda: "oklch(0.68 0.20 48 / 0.12)",
  Samaveda: "oklch(0.60 0.15 260 / 0.12)",
  Yajurveda: "oklch(0.55 0.15 155 / 0.12)",
  Atharvaveda: "oklch(0.60 0.15 300 / 0.12)",
};

export default function VedasSuktamLibrary() {
  const [search, setSearch] = useState("");
  const [vedaFilter, setVedaFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return suktamData.filter((s) => {
      const matchesVeda = vedaFilter === "All" || s.vedaSource === vedaFilter;
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.nameHindi.includes(q) ||
        s.deity.toLowerCase().includes(q) ||
        s.deityHindi.includes(q);
      return matchesVeda && matchesSearch;
    });
  }, [search, vedaFilter]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.06 22) 0%, oklch(0.22 0.08 28) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="container mx-auto max-w-3xl">
          <span className="text-5xl block mb-3" role="img" aria-label="Om">
            🕉️
          </span>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Vedas & Suktam Library
          </h1>
          <p
            className="text-sm md:text-base font-body mb-1"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            वेद एवं सूक्त पुस्तकालय
          </p>
          <p
            className="text-xs font-body italic mt-2"
            style={{ color: "oklch(0.68 0.20 48 / 0.8)" }}
          >
            "सम्पूर्णमृषिवाक्यं तु सूक्तमित्यसभिधीयते"
          </p>
          <p
            className="text-xs font-body mt-1"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            Complete collection of Vedic Suktams with meanings and benefits
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="vedas">
          <TabsList
            className="mb-8 w-full max-w-sm mx-auto grid grid-cols-2"
            style={{ background: "oklch(0.20 0.06 22)" }}
          >
            <TabsTrigger
              value="vedas"
              className="font-heading text-sm"
              data-ocid="tabs.vedas"
            >
              📜 Four Vedas
            </TabsTrigger>
            <TabsTrigger
              value="suktams"
              className="font-heading text-sm"
              data-ocid="tabs.suktams"
            >
              🙏 Suktam Library
            </TabsTrigger>
          </TabsList>

          {/* ── Tab 1: Vedas Overview ── */}
          <TabsContent value="vedas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vedasOverview.map((veda) => (
                <div
                  key={veda.id}
                  className="rounded-2xl border p-6 transition-all hover:shadow-lg"
                  style={{
                    background: "oklch(0.18 0.06 22)",
                    borderColor: "oklch(0.78 0.14 75 / 0.15)",
                  }}
                  data-ocid={`veda.card.${veda.id}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-3xl">{veda.icon}</span>
                        <div>
                          <h2
                            className="font-heading text-xl font-bold"
                            style={{ color: "oklch(0.78 0.14 75)" }}
                          >
                            {veda.name}
                          </h2>
                          <p
                            className="text-sm font-body"
                            style={{ color: "oklch(0.68 0.20 48)" }}
                          >
                            {veda.nameHindi}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Badge
                      className="text-xs font-body"
                      style={{
                        background:
                          vedaBgMap[veda.name] ?? "oklch(0.68 0.20 48 / 0.15)",
                        color: vedaColorMap[veda.name] ?? "oklch(0.68 0.20 48)",
                        border: `1px solid ${vedaColorMap[veda.name] ?? "oklch(0.68 0.20 48)"}33`,
                      }}
                    >
                      Hindu
                    </Badge>
                  </div>

                  {/* Meta */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { label: "Language", value: veda.language },
                      { label: "Period", value: veda.period },
                      {
                        label: "Suktams",
                        value: veda.totalSuktams.toLocaleString(),
                      },
                      {
                        label: "Mantras",
                        value: veda.totalMantras.toLocaleString(),
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-lg px-3 py-2"
                        style={{ background: "oklch(0.14 0.05 20)" }}
                      >
                        <p
                          className="text-xs font-body"
                          style={{ color: "oklch(0.55 0.04 50)" }}
                        >
                          {label}
                        </p>
                        <p
                          className="text-xs font-semibold font-body truncate"
                          style={{ color: "oklch(0.88 0.06 75)" }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Significance */}
                  <p
                    className="text-sm font-body leading-relaxed mb-3 line-clamp-3"
                    style={{ color: "oklch(0.75 0.04 60)" }}
                  >
                    {veda.significance}
                  </p>

                  {/* Hindi */}
                  <p
                    className="text-xs font-body italic mb-4"
                    style={{ color: "oklch(0.65 0.04 50)" }}
                  >
                    {veda.significanceHindi}
                  </p>

                  {/* Structure */}
                  <div
                    className="rounded-lg p-3 mb-4"
                    style={{ background: "oklch(0.14 0.05 20)" }}
                  >
                    <p
                      className="text-xs font-semibold font-body mb-1 uppercase tracking-wide"
                      style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
                    >
                      Structure
                    </p>
                    <p
                      className="text-xs font-body"
                      style={{ color: "oklch(0.75 0.04 60)" }}
                    >
                      {veda.structure}
                    </p>
                  </div>

                  {/* Key Topics */}
                  <div>
                    <p
                      className="text-xs font-semibold font-body mb-2 uppercase tracking-wide"
                      style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
                    >
                      Key Topics
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {veda.keyTopics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs font-body px-2 py-0.5 rounded-full"
                          style={{
                            background: "oklch(0.68 0.20 48 / 0.1)",
                            color: "oklch(0.78 0.14 75)",
                            border: "1px solid oklch(0.68 0.20 48 / 0.2)",
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suktam info block */}
            <div
              className="mt-8 rounded-2xl border p-6"
              style={{
                background: "oklch(0.18 0.06 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <h3
                className="font-heading text-lg font-bold mb-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                सूक्त क्या होता है? — What is a Suktam?
              </h3>
              <p
                className="text-sm font-body leading-relaxed mb-3"
                style={{ color: "oklch(0.75 0.04 60)" }}
              >
                A{" "}
                <strong style={{ color: "oklch(0.78 0.14 75)" }}>Suktam</strong>{" "}
                (सूक्तम्) is a collection of Vedic hymns (mantras) addressed to a
                particular deity or cosmic principle. The word comes from{" "}
                <em>su</em> (well/good) + <em>ukta</em> (spoken) — meaning
                "well-spoken" or a perfectly composed divine hymn. As the Vedic
                saying goes:
              </p>
              <blockquote
                className="italic text-sm font-body border-l-2 pl-4 mb-3"
                style={{
                  borderColor: "oklch(0.68 0.20 48)",
                  color: "oklch(0.68 0.20 48 / 0.9)",
                }}
              >
                "सम्पूर्णमृषिवाक्यं तु सूक्तमित्यसभिधीयते" — A complete utterance of a
                Rishi (sage) is called a Suktam.
              </blockquote>
              <p
                className="text-sm font-body leading-relaxed"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                Suktams should be recited with purity, devotion, and
                cleanliness. Evening recitation is considered especially
                auspicious. Regular recitation brings karmic merit, pleases the
                deities, fulfills intentions, and creates a positive atmosphere.
              </p>
            </div>
          </TabsContent>

          {/* ── Tab 2: Suktam Library ── */}
          <TabsContent value="suktams">
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                />
                <Input
                  placeholder="Search by name, deity… / नाम, देवता खोजें…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 font-body text-sm"
                  style={{
                    background: "oklch(0.18 0.06 22)",
                    borderColor: "oklch(0.78 0.14 75 / 0.2)",
                    color: "oklch(0.88 0.06 75)",
                  }}
                  data-ocid="suktam.search"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {VEDA_FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setVedaFilter(f)}
                    className="px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all"
                    style={{
                      background:
                        vedaFilter === f
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.18 0.06 22)",
                      color: vedaFilter === f ? "white" : "oklch(0.75 0.04 60)",
                      border: `1px solid ${vedaFilter === f ? "oklch(0.68 0.20 48)" : "oklch(0.78 0.14 75 / 0.2)"}`,
                    }}
                    data-ocid={`filter.${f.toLowerCase()}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Result count */}
            <p
              className="text-xs font-body mb-4"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              Showing {filtered.length} of {suktamData.length} Suktams
            </p>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div
                className="text-center py-16 rounded-2xl border"
                style={{
                  background: "oklch(0.18 0.06 22)",
                  borderColor: "oklch(0.78 0.14 75 / 0.1)",
                }}
                data-ocid="suktam.empty_state"
              >
                <BookOpen
                  className="h-10 w-10 mx-auto mb-3 opacity-30"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                />
                <p
                  className="font-heading text-lg"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  No Suktams found
                </p>
                <p
                  className="text-sm font-body mt-1"
                  style={{ color: "oklch(0.45 0.03 40)" }}
                >
                  Try a different search or filter
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((suktam) => {
                  const isOpen = expanded === suktam.id;
                  return (
                    <div
                      key={suktam.id}
                      className="rounded-2xl border transition-all hover:shadow-md"
                      style={{
                        background: "oklch(0.18 0.06 22)",
                        borderColor: isOpen
                          ? "oklch(0.68 0.20 48 / 0.5)"
                          : "oklch(0.78 0.14 75 / 0.15)",
                      }}
                      data-ocid={`suktam.card.${suktam.id}`}
                    >
                      {/* Card Header */}
                      <button
                        type="button"
                        className="w-full text-left p-4"
                        onClick={() => setExpanded(isOpen ? null : suktam.id)}
                        data-ocid={`suktam.toggle.${suktam.id}`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="min-w-0">
                            <h3
                              className="font-heading text-base font-semibold truncate"
                              style={{ color: "oklch(0.78 0.14 75)" }}
                            >
                              {suktam.name}
                            </h3>
                            <p
                              className="text-sm font-body"
                              style={{ color: "oklch(0.68 0.20 48)" }}
                            >
                              {suktam.nameHindi}
                            </p>
                          </div>
                          <span
                            className="shrink-0 text-xs font-body px-2 py-0.5 rounded-full"
                            style={{
                              background:
                                vedaBgMap[suktam.vedaSource] ??
                                "oklch(0.68 0.20 48 / 0.12)",
                              color:
                                vedaColorMap[suktam.vedaSource] ??
                                "oklch(0.68 0.20 48)",
                              border: `1px solid ${vedaColorMap[suktam.vedaSource] ?? "oklch(0.68 0.20 48)"}33`,
                            }}
                          >
                            {suktam.vedaSource}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className="text-xs font-body"
                            style={{ color: "oklch(0.60 0.04 50)" }}
                          >
                            🕉️ {suktam.deity} ({suktam.deityHindi})
                          </span>
                          <span
                            className="text-xs font-body"
                            style={{ color: "oklch(0.60 0.04 50)" }}
                          >
                            · {suktam.totalMantras} mantras
                          </span>
                        </div>
                      </button>

                      {/* Expanded Content */}
                      {isOpen && (
                        <div
                          className="px-4 pb-4 space-y-3 border-t"
                          style={{ borderColor: "oklch(0.78 0.14 75 / 0.1)" }}
                        >
                          {/* Mini Player */}
                          <div className="pt-3">
                            <SuktamMiniPlayer
                              suktamId={suktam.id}
                              suktamName={suktam.name}
                              suktamNameHindi={suktam.nameHindi}
                              deity={suktam.deity}
                            />
                          </div>

                          <p
                            className="text-sm font-body leading-relaxed"
                            style={{ color: "oklch(0.75 0.04 60)" }}
                          >
                            {suktam.shortDescription}
                          </p>

                          <div
                            className="rounded-lg p-3"
                            style={{ background: "oklch(0.14 0.05 20)" }}
                          >
                            <p
                              className="text-xs font-semibold font-body mb-1 uppercase tracking-wide"
                              style={{ color: "oklch(0.68 0.20 48)" }}
                            >
                              Benefits / लाभ
                            </p>
                            <p
                              className="text-xs font-body leading-relaxed"
                              style={{ color: "oklch(0.70 0.04 60)" }}
                            >
                              {suktam.benefits}
                            </p>
                          </div>

                          <div
                            className="rounded-lg p-3"
                            style={{ background: "oklch(0.14 0.05 20)" }}
                          >
                            <p
                              className="text-xs font-semibold font-body mb-1 uppercase tracking-wide"
                              style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
                            >
                              First Mantra (Transliteration)
                            </p>
                            <p
                              className="text-xs font-body italic leading-relaxed"
                              style={{ color: "oklch(0.78 0.14 75 / 0.85)" }}
                            >
                              {suktam.transliteration}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
