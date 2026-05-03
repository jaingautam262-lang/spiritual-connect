import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { TEMPLES_DATA } from "../data/temples-data";

const FAITH_TABS = ["All", "Hindu", "Jain", "Sikh"] as const;
type FaithFilter = (typeof FAITH_TABS)[number];

function TempleCard({
  temple,
  index,
}: { temple: (typeof TEMPLES_DATA)[0]; index: number }) {
  const faithColors: Record<string, { bg: string; text: string; dot: string }> =
    {
      Hindu: {
        bg: "oklch(0.68 0.20 48 / 0.12)",
        text: "oklch(0.75 0.16 48)",
        dot: "oklch(0.68 0.20 48)",
      },
      Jain: {
        bg: "oklch(0.55 0.18 220 / 0.12)",
        text: "oklch(0.65 0.14 220)",
        dot: "oklch(0.55 0.18 220)",
      },
      Sikh: {
        bg: "oklch(0.55 0.18 160 / 0.12)",
        text: "oklch(0.60 0.18 160)",
        dot: "oklch(0.55 0.18 160)",
      },
    };
  const fc = faithColors[temple.faith] ?? faithColors.Hindu;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3 transition-all hover:scale-[1.005]"
      data-ocid={`temple.item.${index + 1}`}
      style={{
        background: "oklch(0.22 0.06 25)",
        border: "1px solid oklch(0.30 0.06 30 / 0.5)",
        boxShadow: "0 2px 10px oklch(0.10 0.04 20 / 0.25)",
      }}
    >
      {/* Temple icon + header */}
      <div className="flex items-start gap-3">
        <div
          className="h-12 w-12 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: fc.bg, border: `1.5px solid ${fc.dot}33` }}
        >
          {temple.faith === "Hindu"
            ? "🛕"
            : temple.faith === "Jain"
              ? "🏛️"
              : "🕌"}
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className="font-bold text-sm leading-tight mb-0.5"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            {temple.name}
          </h3>
          <p className="text-xs" style={{ color: "oklch(0.60 0.06 60)" }}>
            📍 {temple.city}, {temple.state}
          </p>
        </div>
      </div>

      {/* Faith + deity badges */}
      <div className="flex flex-wrap gap-1.5">
        <Badge
          className="text-xs px-2 py-0.5"
          style={{ background: fc.bg, color: fc.text, border: "none" }}
        >
          {temple.faith}
        </Badge>
        <Badge
          className="text-xs px-2 py-0.5 font-normal"
          style={{
            background: "oklch(0.25 0.06 25 / 0.8)",
            color: "oklch(0.68 0.06 65)",
            border: "1px solid oklch(0.35 0.06 30 / 0.4)",
          }}
        >
          {temple.deity}
        </Badge>
      </div>

      {/* Description */}
      <p
        className="text-xs line-clamp-2 leading-relaxed"
        style={{ color: "oklch(0.65 0.04 65)" }}
      >
        {temple.shortDescription}
      </p>

      {/* Benefits */}
      {temple.benefits.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {temple.benefits.slice(0, 3).map((b) => (
            <span
              key={b}
              className="text-xs px-1.5 py-0.5 rounded-md"
              style={{
                background: "oklch(0.78 0.14 75 / 0.08)",
                color: "oklch(0.72 0.10 70)",
              }}
            >
              ✦ {b}
            </span>
          ))}
        </div>
      )}

      {/* Timings */}
      <div
        className="flex items-center gap-1.5 text-xs"
        style={{ color: "oklch(0.58 0.06 65)" }}
      >
        <span>🕐</span>
        <span className="truncate">{temple.timings}</span>
      </div>
    </div>
  );
}

export default function TempleDirectoryPage() {
  const [faithFilter, setFaithFilter] = useState<FaithFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");

  const allStates = useMemo(() => {
    const states = Array.from(new Set(TEMPLES_DATA.map((t) => t.state))).sort();
    return ["All States", ...states];
  }, []);

  const filtered = useMemo(() => {
    return TEMPLES_DATA.filter((t) => {
      if (faithFilter !== "All" && t.faith !== faithFilter) return false;
      if (stateFilter !== "All States" && t.state !== stateFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !t.name.toLowerCase().includes(q) &&
          !t.nameHindi.toLowerCase().includes(q) &&
          !t.deity.toLowerCase().includes(q) &&
          !t.city.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [faithFilter, stateFilter, searchQuery]);

  const counts = useMemo(
    () => ({
      All: TEMPLES_DATA.length,
      Hindu: TEMPLES_DATA.filter((t) => t.faith === "Hindu").length,
      Jain: TEMPLES_DATA.filter((t) => t.faith === "Jain").length,
      Sikh: TEMPLES_DATA.filter((t) => t.faith === "Sikh").length,
    }),
    [],
  );

  return (
    <div data-ocid="temple.page">
      {/* Hero */}
      <div
        className="relative w-full py-14 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 30), oklch(0.18 0.06 20), oklch(0.22 0.10 48))",
        }}
      >
        <div className="text-5xl mb-4">🛕</div>
        <h1
          className="font-decorative text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Temple & Tirtha Directory
        </h1>
        <p className="text-base mb-1" style={{ color: "oklch(0.75 0.06 70)" }}>
          मंदिर एवं तीर्थ निर्देशिका
        </p>
        <p className="text-sm" style={{ color: "oklch(0.58 0.05 60)" }}>
          Explore sacred temples of Hindu, Jain, and Sikh faiths — India and
          beyond
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto mt-6 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "oklch(0.55 0.06 60)" }}
          />
          <Input
            data-ocid="temple.search_input"
            placeholder="Search by name, deity, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 text-sm rounded-full"
            style={{
              background: "oklch(0.18 0.04 20 / 0.9)",
              border: "1px solid oklch(0.35 0.06 30 / 0.5)",
              color: "oklch(0.88 0.04 70)",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {(["All", "Hindu", "Jain", "Sikh"] as const).map((faith) => (
            <button
              key={faith}
              type="button"
              data-ocid={`temple.faith_stat_${faith.toLowerCase()}`}
              onClick={() => setFaithFilter(faith)}
              className="rounded-xl p-3 text-center transition-all"
              style={
                faithFilter === faith
                  ? {
                      background: "oklch(0.68 0.20 48 / 0.25)",
                      border: "1.5px solid oklch(0.68 0.20 48 / 0.6)",
                    }
                  : {
                      background: "oklch(0.22 0.06 25)",
                      border: "1px solid oklch(0.30 0.06 30 / 0.4)",
                    }
              }
            >
              <div
                className="font-bold text-lg"
                style={{
                  color:
                    faithFilter === faith
                      ? "oklch(0.78 0.14 75)"
                      : "oklch(0.70 0.08 70)",
                }}
              >
                {counts[faith]}
              </div>
              <div className="text-xs" style={{ color: "oklch(0.55 0.05 60)" }}>
                {faith === "All" ? "All Temples" : `${faith} Temples`}
              </div>
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div
          className="flex flex-wrap items-center gap-3 mb-6"
          data-ocid="temple.filters"
        >
          {/* Faith tabs */}
          <div className="flex gap-2">
            {FAITH_TABS.map((f) => (
              <button
                key={f}
                type="button"
                data-ocid={`temple.faith_tab_${f.toLowerCase()}`}
                onClick={() => setFaithFilter(f)}
                className="text-xs px-4 py-1.5 rounded-full font-medium transition-all"
                style={
                  faithFilter === f
                    ? { background: "oklch(0.68 0.20 48)", color: "white" }
                    : {
                        background: "oklch(0.22 0.06 25)",
                        color: "oklch(0.70 0.06 65)",
                        border: "1px solid oklch(0.35 0.06 30 / 0.5)",
                      }
                }
              >
                {f}
              </button>
            ))}
          </div>

          {/* State filter */}
          <select
            data-ocid="temple.state_select"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="text-xs rounded-lg px-3 py-1.5 ml-auto"
            style={{
              background: "oklch(0.20 0.05 22)",
              border: "1px solid oklch(0.35 0.06 30 / 0.5)",
              color: "oklch(0.80 0.04 70)",
            }}
          >
            {allStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p
            className="text-sm font-medium"
            style={{ color: "oklch(0.65 0.06 65)" }}
          >
            {filtered.length} temple{filtered.length !== 1 ? "s" : ""} found
            {faithFilter !== "All" ? ` · ${faithFilter}` : ""}
            {stateFilter !== "All States" ? ` · ${stateFilter}` : ""}
          </p>
          {(searchQuery ||
            faithFilter !== "All" ||
            stateFilter !== "All States") && (
            <button
              type="button"
              data-ocid="temple.clear_filters"
              onClick={() => {
                setSearchQuery("");
                setFaithFilter("All");
                setStateFilter("All States");
              }}
              className="text-xs underline"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            className="rounded-2xl p-12 text-center"
            data-ocid="temple.empty_state"
            style={{
              background: "oklch(0.22 0.06 25)",
              border: "1px dashed oklch(0.35 0.06 30)",
            }}
          >
            <p className="text-4xl mb-3">🔍</p>
            <p
              className="font-bold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              No temples found
            </p>
            <p
              className="text-sm mb-4"
              style={{ color: "oklch(0.55 0.05 60)" }}
            >
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="temple.grid"
          >
            {filtered.map((temple, idx) => (
              <TempleCard key={temple.id} temple={temple} index={idx} />
            ))}
          </div>
        )}

        {/* Faith-specific sections */}
        <div className="mt-12 space-y-6">
          <h2
            className="font-bold text-lg"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Browse by Faith
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                faith: "Hindu" as const,
                emoji: "🛕",
                title: "Hindu Temples",
                desc: "Jyotirlingas, Char Dham, Shakti Peethas, and more",
              },
              {
                faith: "Jain" as const,
                emoji: "🏛️",
                title: "Jain Tirthas",
                desc: "Shatrunjaya, Girnar, Shikharji, and sacred Panch Tirthas",
              },
              {
                faith: "Sikh" as const,
                emoji: "🕌",
                title: "Sikh Gurudwaras",
                desc: "Takhts, historical Gurudwaras, and sacred shrines",
              },
            ].map(({ faith, emoji, title, desc }) => (
              <button
                key={faith}
                type="button"
                data-ocid={`temple.faith_section_${faith.toLowerCase()}`}
                onClick={() => {
                  setFaithFilter(faith);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-xl p-5 text-left transition-all hover:scale-[1.02]"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.30 0.06 30 / 0.5)",
                }}
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {title}
                </h3>
                <p className="text-xs" style={{ color: "oklch(0.60 0.05 60)" }}>
                  {desc}
                </p>
                <p
                  className="text-xs mt-2 font-medium"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  {counts[faith]} temples →
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
