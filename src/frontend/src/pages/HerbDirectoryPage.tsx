import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Herb, HerbUseFilter } from "@/data/herbDirectory";
import {
  HERB_USE_LABELS,
  filterHerbs,
  herbDirectory,
} from "@/data/herbDirectory";
import { ChevronDown, ChevronUp, Leaf, Search } from "lucide-react";
import { useMemo, useState } from "react";

// ─── Availability badge colors ───────────────────────────────────────────────
const AVAILABILITY_CONFIG: Record<
  Herb["availability"],
  { label: string; className: string }
> = {
  Common: {
    label: "Common",
    className:
      "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300",
  },
  Moderate: {
    label: "Moderate",
    className:
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300",
  },
  Rare: {
    label: "Rare",
    className:
      "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300",
  },
};

const USE_BADGE_CONFIG: Record<
  "puja" | "havan" | "healing" | "spiritual",
  string
> = {
  puja: "bg-primary/10 text-primary border-primary/20",
  havan: "bg-orange-100 text-orange-700 border-orange-200",
  healing: "bg-teal-100 text-teal-700 border-teal-200",
  spiritual: "bg-purple-100 text-purple-700 border-purple-200",
};

const USE_FILTERS: { label: string; value: HerbUseFilter }[] = [
  { label: "All", value: "all" },
  { label: "Puja", value: "puja" },
  { label: "Havan", value: "havan" },
  { label: "Healing", value: "healing" },
  { label: "Spiritual", value: "spiritual" },
];

const AVAILABILITY_FILTERS = ["All", "Common", "Moderate", "Rare"] as const;
type UIAvailFilter = (typeof AVAILABILITY_FILTERS)[number];

// ─── Herb Card ────────────────────────────────────────────────────────────────
function HerbCard({ herb }: { herb: Herb }) {
  const [expanded, setExpanded] = useState(false);
  const avail = AVAILABILITY_CONFIG[herb.availability];

  return (
    <article
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
      data-ocid={`herb.item.${herb.id}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 2px, oklch(var(--border)/0.3) 2px, oklch(var(--border)/0.3) 3px)",
        backgroundSize: "12px 12px",
      }}
    >
      {/* Card inner (opaque bg overlay) */}
      <div className="bg-card/95 flex flex-col flex-1 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl shrink-0" aria-hidden="true">
              🌿
            </span>
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-foreground text-base leading-tight truncate">
                {herb.nameEnglish}
              </h3>
              <p className="text-primary font-medium text-sm mt-0.5">
                {herb.nameHindi}
              </p>
            </div>
          </div>
          <Badge
            className={`shrink-0 text-xs border ${avail.className}`}
            variant="outline"
          >
            {avail.label}
          </Badge>
        </div>

        {/* Sanskrit + botanical */}
        <div className="mb-3 space-y-0.5">
          <p className="text-muted-foreground text-xs italic">
            Sanskrit: <span className="font-medium">{herb.nameSanskrit}</span>
          </p>
          <p className="text-muted-foreground text-xs italic">
            {herb.nameBotanical}
          </p>
        </div>

        {/* Use badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {herb.uses.map((use) => (
            <span
              key={use}
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border font-medium ${USE_BADGE_CONFIG[use]}`}
            >
              {HERB_USE_LABELS[use]}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className={`text-sm text-muted-foreground leading-relaxed flex-1 ${!expanded ? "line-clamp-2" : ""}`}
        >
          {herb.description}
        </p>

        {/* Expanded detail */}
        {expanded && (
          <div className="mt-4 space-y-4 border-t border-border pt-4">
            {/* Significance */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-primary" />
                Significance
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {herb.significance}
              </p>
            </div>

            {/* Puja Uses */}
            {herb.pujaUses.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  🪔 Puja Uses
                </h4>
                <ul className="space-y-1">
                  {herb.pujaUses.map((u) => (
                    <li
                      key={u}
                      className="text-xs text-muted-foreground flex gap-2"
                    >
                      <span className="text-primary mt-0.5 shrink-0">•</span>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Havan Uses */}
            {herb.havanUses.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  🔥 Havan Uses
                </h4>
                <ul className="space-y-1">
                  {herb.havanUses.map((u) => (
                    <li
                      key={u}
                      className="text-xs text-muted-foreground flex gap-2"
                    >
                      <span className="text-orange-500 mt-0.5 shrink-0">•</span>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Healing Uses */}
            {herb.healingUses.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  🌱 Healing Uses
                </h4>
                <ul className="space-y-1">
                  {herb.healingUses.map((u) => (
                    <li
                      key={u}
                      className="text-xs text-muted-foreground flex gap-2"
                    >
                      <span className="text-teal-600 mt-0.5 shrink-0">•</span>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* All name variants */}
            <div className="bg-muted/40 rounded-lg p-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Hindi:</span>{" "}
                <span className="font-medium text-foreground">
                  {herb.nameHindi}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Sanskrit:</span>{" "}
                <span className="font-medium text-foreground italic">
                  {herb.nameSanskrit}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">English:</span>{" "}
                <span className="font-medium text-foreground">
                  {herb.nameEnglish}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Botanical:</span>{" "}
                <span className="font-medium text-foreground italic">
                  {herb.nameBotanical}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Expand / collapse */}
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 w-full text-primary hover:text-primary hover:bg-primary/10 text-xs h-8"
          onClick={() => setExpanded((e) => !e)}
          data-ocid={`herb.expand_button.${herb.id}`}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 mr-1" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 mr-1" /> View Details
            </>
          )}
        </Button>
      </div>
    </article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HerbDirectoryPage() {
  const [query, setQuery] = useState("");
  const [useFilter, setUseFilter] = useState<HerbUseFilter>("all");
  const [availFilter, setAvailFilter] = useState<UIAvailFilter>("All");

  const filtered = useMemo(() => {
    const mappedAvail = (availFilter === "All" ? "all" : availFilter) as
      | "all"
      | "Common"
      | "Moderate"
      | "Rare";
    return filterHerbs(herbDirectory, useFilter, mappedAvail, query.trim());
  }, [query, useFilter, availFilter]);

  return (
    <div className="min-h-screen bg-background" data-ocid="herb_directory.page">
      {/* Hero banner */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 text-center">
          <div className="flex justify-center mb-4">
            <span className="text-5xl" aria-hidden="true">
              🌿
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Jadi Buti — Sacred Herb Directory
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Explore India's sacred botanical heritage — herbs revered for
            millennia in puja, havan, and Ayurvedic healing
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              🪔 <span>Puja Herbs</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              🔥 <span>Havan Samagri</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              🌱 <span>Ayurvedic Healing</span>
            </span>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-muted/30 border-b border-border sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by any name — Hindi, Sanskrit, English, or botanical…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-card border-border"
              data-ocid="herb_directory.search_input"
            />
          </div>

          {/* Use filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {USE_FILTERS.map(({ label, value }) => (
              <button
                type="button"
                key={value}
                onClick={() => setUseFilter(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  useFilter === value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
                data-ocid={`herb_directory.filter.${value}`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Availability filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {AVAILABILITY_FILTERS.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => setAvailFilter(a)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  availFilter === a
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-card text-muted-foreground border-border hover:border-accent/50"
                }`}
                data-ocid={`herb_directory.availability.${a.toLowerCase()}`}
              >
                {a === "All" ? "All Availability" : a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-sm text-muted-foreground font-medium">
          Showing{" "}
          <span className="text-primary font-bold">{filtered.length}</span>{" "}
          Sacred {filtered.length === 1 ? "Herb" : "Herbs"}
          {query && (
            <span className="ml-1">
              for "<span className="text-foreground">{query}</span>"
            </span>
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filtered.length === 0 ? (
          <div
            className="text-center py-24"
            data-ocid="herb_directory.empty_state"
          >
            <span className="text-5xl mb-4 block" aria-hidden="true">
              🌾
            </span>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No herbs found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try a different name or clear your filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setUseFilter("all");
                setAvailFilter("All");
              }}
              data-ocid="herb_directory.clear_filters_button"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="herb_directory.list"
          >
            {filtered.map((herb) => (
              <HerbCard key={herb.id} herb={herb} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
