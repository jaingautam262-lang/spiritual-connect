import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TEMPLE_DIRECTORY, type Temple } from "@/data/holyBooksData";
import {
  Building2,
  CalendarDays,
  Clock,
  MapPin,
  Search,
  Star,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type FaithFilter = "All" | "Hindu" | "Jain" | "Sikh";
type ViewMode = "faith" | "state";

// ── Style maps ────────────────────────────────────────────────────────────────

const FAITH_COLORS: Record<
  string,
  { bg: string; text: string; border: string; accent: string }
> = {
  Hindu: {
    bg: "oklch(0.68 0.20 48 / 0.12)",
    text: "oklch(0.72 0.18 48)",
    border: "oklch(0.68 0.20 48 / 0.35)",
    accent: "oklch(0.68 0.20 48)",
  },
  Jain: {
    bg: "oklch(0.55 0.18 145 / 0.12)",
    text: "oklch(0.55 0.16 145)",
    border: "oklch(0.55 0.18 145 / 0.35)",
    accent: "oklch(0.55 0.18 145)",
  },
  Sikh: {
    bg: "oklch(0.45 0.15 250 / 0.12)",
    text: "oklch(0.60 0.16 250)",
    border: "oklch(0.45 0.15 250 / 0.35)",
    accent: "oklch(0.55 0.18 250)",
  },
};

const FAITH_ICONS: Record<string, string> = {
  Hindu: "🛕",
  Jain: "☸️",
  Sikh: "🪯",
};

const SPECIAL_TAGS = [
  "Jyotirlinga",
  "Char Dham",
  "Shakti Peetha",
  "Panch Tirth",
  "Panch Kalyanak",
  "Takht",
  "Akal Takht",
  "UNESCO",
  "Divya Desam",
  "Panch Kalyanak",
  "Arupadaiveedu",
];

function SpecialBadge({ tag }: { tag: string }) {
  const isSpecial = SPECIAL_TAGS.some((s) => tag.includes(s));
  if (!isSpecial) return null;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
      style={{
        background: "oklch(0.78 0.14 75 / 0.15)",
        color: "oklch(0.78 0.14 75)",
        border: "1px solid oklch(0.78 0.14 75 / 0.30)",
      }}
    >
      <Star className="h-2 w-2 fill-current" />
      {tag}
    </span>
  );
}

// ── Temple Card ───────────────────────────────────────────────────────────────

function TempleCard({
  temple,
  idx,
  onClick,
}: {
  temple: Temple;
  idx: number;
  onClick: () => void;
}) {
  const style = FAITH_COLORS[temple.faith] ?? FAITH_COLORS.Hindu;
  const specialTag = temple.tags.find((t) =>
    SPECIAL_TAGS.some((s) => t.includes(s)),
  );

  return (
    <button
      type="button"
      data-ocid={`temples.item.${idx + 1}`}
      onClick={onClick}
      className="text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.02] group cursor-pointer flex flex-col"
      style={{
        background: "oklch(0.20 0.07 24)",
        borderColor: "oklch(0.78 0.14 75 / 0.15)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = style.border;
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 18px ${style.bg}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.78 0.14 75 / 0.15)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
          style={{ background: style.bg, border: `1px solid ${style.border}` }}
        >
          {FAITH_ICONS[temple.faith] ?? "🛕"}
        </div>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full border"
          style={{
            background: style.bg,
            color: style.text,
            borderColor: style.border,
          }}
        >
          {temple.faith}
        </span>
      </div>

      {/* Name */}
      <h3
        className="font-bold text-sm mb-1 group-hover:underline leading-tight"
        style={{ color: "oklch(0.90 0.06 70)" }}
      >
        {temple.name}
      </h3>

      {/* Location */}
      <div className="flex items-center gap-1 mb-2">
        <MapPin
          className="h-3 w-3 shrink-0"
          style={{ color: "oklch(0.55 0.05 55)" }}
        />
        <p
          className="text-xs truncate"
          style={{ color: "oklch(0.60 0.04 55)" }}
        >
          {temple.city}
          {temple.state ? `, ${temple.state}` : ""}
        </p>
      </div>

      {/* Deity */}
      <Badge
        variant="outline"
        className="text-xs mb-2 w-fit max-w-full truncate"
        style={{
          borderColor: "oklch(0.68 0.20 48 / 0.25)",
          color: "oklch(0.72 0.16 55)",
        }}
      >
        {temple.deity}
      </Badge>

      {/* Special badge */}
      {specialTag && (
        <div className="mb-2">
          <SpecialBadge tag={specialTag} />
        </div>
      )}

      {/* History excerpt */}
      <p
        className="text-xs leading-relaxed line-clamp-2 flex-1"
        style={{ color: "oklch(0.58 0.04 55)" }}
      >
        {temple.history}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-2">
        {temple.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
            style={{
              background: style.bg,
              color: style.text,
              border: `1px solid ${style.border}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        {temple.visitingHours && (
          <span
            className="text-[10px] flex items-center gap-1"
            style={{ color: "oklch(0.55 0.05 60)" }}
          >
            <Clock className="h-2.5 w-2.5" />
            {temple.visitingHours.split("(")[0].split(",")[0].trim()}
          </span>
        )}
        <span
          className="text-xs font-semibold ml-auto"
          style={{ color: style.accent }}
        >
          Details →
        </span>
      </div>
    </button>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────────────────

function TempleModal({
  temple,
  onClose,
}: { temple: Temple | null; onClose: () => void }) {
  if (!temple) return null;
  const style = FAITH_COLORS[temple.faith] ?? FAITH_COLORS.Hindu;
  const specialTag = temple.tags.find((t) =>
    SPECIAL_TAGS.some((s) => t.includes(s)),
  );

  return (
    <Dialog open={!!temple} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[85vh] overflow-y-auto"
        data-ocid="temples.dialog"
        style={{
          background: "oklch(0.18 0.07 22)",
          border: "1px solid oklch(0.78 0.14 75 / 0.22)",
        }}
      >
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{
                background: style.bg,
                border: `1px solid ${style.border}`,
              }}
            >
              {FAITH_ICONS[temple.faith] ?? "🛕"}
            </div>
            <div className="min-w-0">
              <DialogTitle
                className="font-display text-xl leading-tight"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {temple.name}
              </DialogTitle>
              <div className="flex items-center gap-1 mt-1">
                <MapPin
                  className="h-3 w-3 shrink-0"
                  style={{ color: "oklch(0.55 0.04 55)" }}
                />
                <p className="text-sm" style={{ color: "oklch(0.60 0.04 55)" }}>
                  {temple.city}
                  {temple.state ? `, ${temple.state}` : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-wrap mt-3">
            <Badge
              className="text-xs"
              style={{
                background: style.bg,
                color: style.text,
                border: `1px solid ${style.border}`,
              }}
            >
              {temple.faith}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                borderColor: "oklch(0.68 0.20 48 / 0.35)",
                color: "oklch(0.68 0.20 48)",
              }}
            >
              {temple.deity}
            </Badge>
            {specialTag && <SpecialBadge tag={specialTag} />}
          </div>
        </DialogHeader>

        {/* Darshan timings */}
        {temple.visitingHours && (
          <div
            className="p-3 rounded-lg border mt-3 flex items-start gap-3"
            style={{
              background: "oklch(0.21 0.07 26)",
              borderColor: "oklch(0.68 0.20 48 / 0.2)",
            }}
          >
            <Clock
              className="h-4 w-4 shrink-0 mt-0.5"
              style={{ color: "oklch(0.68 0.20 48)" }}
            />
            <div>
              <p
                className="text-xs font-semibold mb-0.5"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                Darshan Timings
              </p>
              <p className="text-sm" style={{ color: "oklch(0.78 0.04 65)" }}>
                {temple.visitingHours}
              </p>
            </div>
          </div>
        )}

        {/* Best time */}
        {temple.bestTime && (
          <div
            className="p-3 rounded-lg border mt-2 flex items-start gap-3"
            style={{
              background: "oklch(0.21 0.07 26)",
              borderColor: "oklch(0.68 0.20 48 / 0.2)",
            }}
          >
            <CalendarDays
              className="h-4 w-4 shrink-0 mt-0.5"
              style={{ color: "oklch(0.68 0.20 48)" }}
            />
            <div>
              <p
                className="text-xs font-semibold mb-0.5"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                Best Time to Visit
              </p>
              <p className="text-sm" style={{ color: "oklch(0.78 0.04 65)" }}>
                {temple.bestTime}
              </p>
            </div>
          </div>
        )}

        {/* History */}
        <div
          className="mt-4 p-5 rounded-xl border"
          style={{
            background: "oklch(0.21 0.07 26)",
            borderColor: "oklch(0.78 0.14 75 / 0.1)",
          }}
        >
          <h4
            className="font-semibold text-sm mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            History &amp; Significance
          </h4>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.78 0.04 65)" }}
          >
            {temple.history}
          </p>
        </div>

        {/* Tags */}
        {temple.tags.length > 0 && (
          <div className="mt-4">
            <p
              className="text-xs font-semibold mb-2"
              style={{ color: "oklch(0.60 0.04 60)" }}
            >
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {temple.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: style.bg,
                    color: style.text,
                    border: `1px solid ${style.border}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button
            data-ocid="temples.close_button"
            variant="outline"
            onClick={onClose}
            className="text-sm"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TempleDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [faithFilter, setFaithFilter] = useState<FaithFilter>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("faith");
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [tagFilter, setTagFilter] = useState<string>("All");

  const allTemples = TEMPLE_DIRECTORY;

  const hinduCount = allTemples.filter((t) => t.faith === "Hindu").length;
  const jainCount = allTemples.filter((t) => t.faith === "Jain").length;
  const sikhCount = allTemples.filter((t) => t.faith === "Sikh").length;

  const popularTags = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of TEMPLE_DIRECTORY) {
      for (const tag of t.tags) {
        if (SPECIAL_TAGS.some((s) => tag.includes(s))) {
          counts[tag] = (counts[tag] ?? 0) + 1;
        }
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, []);

  const filtered = useMemo(() => {
    return allTemples.filter((t) => {
      const matchesFaith = faithFilter === "All" || t.faith === faithFilter;
      const matchesTag =
        tagFilter === "All" || t.tags.some((tag) => tag === tagFilter);
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q) ||
        t.state.toLowerCase().includes(q) ||
        t.deity.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesFaith && matchesTag && matchesSearch;
    });
  }, [allTemples, faithFilter, tagFilter, searchQuery]);

  const groupedByState = useMemo(() => {
    if (viewMode !== "state") return null;
    const groups: Record<string, Temple[]> = {};
    for (const t of filtered) {
      const key = t.state || "Other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(t);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered, viewMode]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero */}
      <section
        className="relative py-14 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 30) 0%, oklch(0.26 0.10 50) 50%, oklch(0.20 0.08 30) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-5xl mb-3">🛕</div>
          <h1
            className="font-display text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Temple Directory
          </h1>
          <p
            className="text-xl mb-4"
            style={{ color: "oklch(0.85 0.07 65)", fontFamily: "serif" }}
          >
            मंदिर निर्देशिका
          </p>

          {/* Count pill */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-3"
            style={{
              background: "oklch(0.78 0.14 75 / 0.10)",
              borderColor: "oklch(0.78 0.14 75 / 0.35)",
            }}
          >
            <span className="text-xl">🛕</span>
            <span
              className="font-bold text-sm tracking-wide"
              style={{ color: "oklch(0.88 0.12 72)" }}
            >
              {allTemples.length}+ Sacred Sites
            </span>
            <span style={{ color: "oklch(0.55 0.05 55)" }}>·</span>
            <span
              className="font-semibold text-xs"
              style={{ color: "oklch(0.78 0.10 65)" }}
            >
              3 Faiths · All India
            </span>
          </div>

          {/* Faith stats */}
          <div className="flex gap-2 flex-wrap justify-center mt-2">
            {[
              {
                label: "Hindu Temples",
                count: hinduCount,
                color: "oklch(0.72 0.18 48)",
              },
              {
                label: "Jain Temples",
                count: jainCount,
                color: "oklch(0.55 0.16 145)",
              },
              {
                label: "Sikh Gurdwaras",
                count: sikhCount,
                color: "oklch(0.60 0.16 250)",
              },
            ].map(({ label, count, color }) => (
              <span
                key={label}
                className="font-semibold text-xs px-3 py-1.5 rounded-full border"
                style={{
                  background: `${color.replace(")", " / 0.12)")}`,
                  borderColor: `${color.replace(")", " / 0.3)")}`,
                  color,
                }}
              >
                {count} {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section
        className="sticky top-16 z-30 py-3 px-4 border-b"
        style={{
          background: "oklch(0.17 0.06 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.12)",
        }}
      >
        <div className="container mx-auto space-y-2">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.55 0.05 55)" }}
              />
              <Input
                data-ocid="temples.search_input"
                placeholder="Search by name, city, state, deity, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border text-sm"
                style={{
                  background: "oklch(0.20 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                  color: "oklch(0.88 0.04 70)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label="Clear search"
                >
                  <X
                    className="h-4 w-4"
                    style={{ color: "oklch(0.55 0.05 55)" }}
                  />
                </button>
              )}
            </div>

            {/* Faith filter */}
            <div className="flex gap-1.5 flex-wrap justify-center">
              {(["All", "Hindu", "Jain", "Sikh"] as FaithFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  data-ocid={`temples.${f.toLowerCase()}.tab`}
                  onClick={() => setFaithFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    background:
                      faithFilter === f
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.22 0.07 24)",
                    color: faithFilter === f ? "white" : "oklch(0.72 0.05 60)",
                    border: "1px solid",
                    borderColor:
                      faithFilter === f
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.78 0.14 75 / 0.18)",
                  }}
                >
                  {f !== "All" && FAITH_ICONS[f]} {f}
                </button>
              ))}
            </div>

            {/* View mode */}
            <div
              className="flex rounded-lg border overflow-hidden shrink-0"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.18)" }}
            >
              {(["faith", "state"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  data-ocid={`temples.view.${mode}`}
                  onClick={() => setViewMode(mode)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    background:
                      viewMode === mode
                        ? "oklch(0.28 0.09 35)"
                        : "oklch(0.20 0.07 24)",
                    color:
                      viewMode === mode
                        ? "oklch(0.78 0.14 75)"
                        : "oklch(0.60 0.04 60)",
                  }}
                >
                  <Building2 className="h-3 w-3" />
                  {mode === "faith" ? "By Faith" : "By State"}
                </button>
              ))}
            </div>
          </div>

          {/* Tag quick filters */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span
              className="text-[10px] font-medium"
              style={{ color: "oklch(0.52 0.04 55)" }}
            >
              Filter:
            </span>
            <button
              type="button"
              data-ocid="temples.tag.all"
              onClick={() => setTagFilter("All")}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-all"
              style={{
                background:
                  tagFilter === "All"
                    ? "oklch(0.78 0.14 75 / 0.15)"
                    : "transparent",
                color:
                  tagFilter === "All"
                    ? "oklch(0.78 0.14 75)"
                    : "oklch(0.52 0.04 55)",
                border: "1px solid",
                borderColor:
                  tagFilter === "All"
                    ? "oklch(0.78 0.14 75 / 0.30)"
                    : "oklch(0.78 0.14 75 / 0.10)",
              }}
            >
              All Tags
            </button>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                data-ocid={`temples.tag.${tag.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setTagFilter(tagFilter === tag ? "All" : tag)}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-all"
                style={{
                  background:
                    tagFilter === tag
                      ? "oklch(0.78 0.14 75 / 0.15)"
                      : "transparent",
                  color:
                    tagFilter === tag
                      ? "oklch(0.78 0.14 75)"
                      : "oklch(0.52 0.04 55)",
                  border: "1px solid",
                  borderColor:
                    tagFilter === tag
                      ? "oklch(0.78 0.14 75 / 0.30)"
                      : "oklch(0.78 0.14 75 / 0.10)",
                }}
              >
                ★ {tag}
              </button>
            ))}
          </div>

          <p
            className="text-xs text-center"
            style={{ color: "oklch(0.52 0.04 55)" }}
          >
            {filtered.length} sacred sites found
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div data-ocid="temples.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">🛕</div>
              <p
                className="text-lg font-medium"
                style={{ color: "oklch(0.55 0.05 55)" }}
              >
                No temples found.
              </p>
              <Button
                variant="outline"
                className="mt-4 text-sm"
                onClick={() => {
                  setSearchQuery("");
                  setFaithFilter("All");
                  setTagFilter("All");
                }}
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.3)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : viewMode === "state" && groupedByState ? (
            <div className="space-y-10">
              {groupedByState.map(([state, temples]) => (
                <div key={state}>
                  <div className="flex items-center gap-3 mb-5">
                    <MapPin
                      className="h-4 w-4 shrink-0"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    />
                    <h2
                      className="font-bold text-base"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {state}
                    </h2>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "oklch(0.22 0.07 24)",
                        color: "oklch(0.55 0.04 55)",
                      }}
                    >
                      {temples.length}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ background: "oklch(0.78 0.14 75 / 0.1)" }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {temples.map((temple, idx) => (
                      <TempleCard
                        key={temple.id}
                        temple={temple}
                        idx={idx}
                        onClick={() => setSelectedTemple(temple)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((temple, idx) => (
                <TempleCard
                  key={temple.id}
                  temple={temple}
                  idx={idx}
                  onClick={() => setSelectedTemple(temple)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <TempleModal
        temple={selectedTemple}
        onClose={() => setSelectedTemple(null)}
      />
    </div>
  );
}
