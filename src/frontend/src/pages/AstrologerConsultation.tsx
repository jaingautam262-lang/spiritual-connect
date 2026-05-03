import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Search, Shield, Star } from "lucide-react";
import { useState } from "react";
import {
  ASTROLOGER_SEED_DATA,
  type AstrologerSeed,
  INDIAN_STATES_FILTER,
  WORLD_COUNTRIES_FILTER,
} from "../data/astrologerSeedData";
import { useGetAllAstrologers } from "../hooks/useQueries";

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => i).map((i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5"
          style={{
            fill:
              i < Math.floor(rating) ? "oklch(0.78 0.14 75)" : "transparent",
            color: "oklch(0.78 0.14 75)",
          }}
        />
      ))}
      <span
        className="text-xs font-bold ml-1"
        style={{ color: "oklch(0.68 0.20 48)" }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function AstrologerCard({
  ast,
  index,
}: { ast: AstrologerSeed; index: number }) {
  const bgHues = [48, 55, 30, 60, 40];
  const hue = bgHues[index % bgHues.length];
  return (
    <div
      className="rounded-2xl p-5 flex flex-col transition-all hover:scale-[1.01]"
      data-ocid={`astrologer.item.${index + 1}`}
      style={{
        background: "oklch(0.22 0.06 25)",
        border: "1px solid oklch(0.30 0.06 30 / 0.5)",
        boxShadow: "0 2px 12px oklch(0.10 0.04 20 / 0.3)",
      }}
    >
      {/* Avatar */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="h-14 w-14 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
          style={{
            background: `linear-gradient(135deg, oklch(0.55 0.18 ${hue} / 0.3), oklch(0.70 0.16 ${hue} / 0.2))`,
            border: `2px solid oklch(0.68 0.20 ${hue} / 0.5)`,
            color: `oklch(0.78 0.14 ${hue})`,
          }}
        >
          {ast.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3
              className="font-bold text-sm truncate"
              style={{ color: "oklch(0.88 0.06 75)" }}
            >
              {ast.name}
            </h3>
            {ast.is_verified && (
              <Shield
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: "oklch(0.55 0.18 160)" }}
              />
            )}
          </div>
          <p className="text-xs" style={{ color: "oklch(0.60 0.06 60)" }}>
            📍 {ast.state}, {ast.country}
          </p>
        </div>
      </div>

      {/* Rating row */}
      <div className="flex items-center justify-between mb-2">
        <StarRating rating={ast.rating} />
        <span className="text-xs" style={{ color: "oklch(0.55 0.06 60)" }}>
          ({ast.reviews_count.toLocaleString()} reviews)
        </span>
      </div>

      {/* Specialization chips */}
      <div className="flex flex-wrap gap-1 mb-2">
        {ast.specialization.slice(0, 2).map((s) => (
          <Badge
            key={s}
            className="text-xs px-1.5 py-0 font-normal"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              color: "oklch(0.75 0.15 48)",
              border: "1px solid oklch(0.68 0.20 48 / 0.25)",
            }}
          >
            {s}
          </Badge>
        ))}
        {ast.specialization.length > 2 && (
          <span className="text-xs" style={{ color: "oklch(0.55 0.06 60)" }}>
            +{ast.specialization.length - 2}
          </span>
        )}
      </div>

      {/* Languages & Experience */}
      <p className="text-xs mb-1" style={{ color: "oklch(0.62 0.06 65)" }}>
        🗣️ {ast.languages.slice(0, 3).join(", ")}
      </p>
      <p
        className="text-xs mb-3 flex-1 line-clamp-2"
        style={{ color: "oklch(0.60 0.04 65)" }}
      >
        {ast.bio}
      </p>

      {/* Stats row */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <span style={{ color: "oklch(0.60 0.06 60)" }}>
          {ast.experience_years} yrs exp
        </span>
        <Badge
          className="text-xs"
          style={{
            background:
              ast.mode === "Online"
                ? "oklch(0.40 0.14 160 / 0.2)"
                : ast.mode === "Offline"
                  ? "oklch(0.45 0.15 25 / 0.2)"
                  : "oklch(0.45 0.15 220 / 0.2)",
            color:
              ast.mode === "Online"
                ? "oklch(0.68 0.18 160)"
                : ast.mode === "Offline"
                  ? "oklch(0.72 0.16 25)"
                  : "oklch(0.68 0.14 220)",
            border: "none",
          }}
        >
          {ast.mode}
        </Badge>
        <span className="font-bold" style={{ color: "oklch(0.78 0.14 75)" }}>
          ₹{ast.fee_per_hour.toLocaleString()}/hr
        </span>
      </div>

      {/* CTA */}
      <Link
        to="/book-consultation"
        search={{
          astrologerId: ast.id,
          astrologerName: encodeURIComponent(ast.name),
          rate: String(Math.round(ast.fee_per_hour / 60)),
        }}
        data-ocid={`astrologer.book_button.${index + 1}`}
        className="w-full py-2 rounded-full text-center text-xs font-bold transition-all"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
          color: "white",
          boxShadow: "0 2px 8px oklch(0.68 0.20 48 / 0.3)",
        }}
      >
        📅 Book Consultation
      </Link>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  ocid,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
      style={
        active
          ? { background: "oklch(0.68 0.20 48)", color: "white" }
          : {
              background: "oklch(0.25 0.06 25 / 0.8)",
              color: "oklch(0.72 0.05 70)",
              border: "1px solid oklch(0.35 0.06 30 / 0.5)",
            }
      }
    >
      {label}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AstrologerConsultation() {
  const { data: backendAstrologers = [], isLoading } = useGetAllAstrologers();

  const [searchQuery, setSearchQuery] = useState("");
  const [regionTab, setRegionTab] = useState<"India" | "International">(
    "India",
  );
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [selectedFaith, setSelectedFaith] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  // Merge backend + seed (backend overrides seed on same id)
  const seedIds = new Set(ASTROLOGER_SEED_DATA.map((a) => a.id));
  const backendConverted: AstrologerSeed[] = backendAstrologers
    .map((a) => ({
      id: a.id,
      name: a.name,
      initials: a.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      state: "India",
      country: "India",
      region: "India" as const,
      specialization: a.specializations,
      languages: a.languages,
      experience_years: Number(a.experienceYears),
      rating: a.rating,
      reviews_count: 0,
      fee_per_hour: a.perMinuteRate * 60,
      mode: "Online" as const,
      faith_expertise: "General" as const,
      is_verified: true,
      bio: a.bio,
    }))
    .filter((a) => !seedIds.has(a.id));

  const allAstrologers = [...ASTROLOGER_SEED_DATA, ...backendConverted];

  const ALL_SPECS = Array.from(
    new Set(allAstrologers.flatMap((a) => a.specialization)),
  ).sort();
  const visibleSpecs = showAllSpecs ? ALL_SPECS : ALL_SPECS.slice(0, 10);

  const filtered = allAstrologers.filter((a) => {
    if (a.region !== regionTab) return false;
    if (
      regionTab === "India" &&
      selectedState !== "All States" &&
      a.state !== selectedState
    )
      return false;
    if (
      regionTab === "International" &&
      selectedCountry !== "All Countries" &&
      a.country !== selectedCountry
    )
      return false;
    if (
      selectedSpec &&
      !a.specialization.some((s) =>
        s.toLowerCase().includes(selectedSpec.toLowerCase()),
      )
    )
      return false;
    if (selectedFaith !== "All" && a.faith_expertise !== selectedFaith)
      return false;
    if (selectedMode !== "All" && a.mode !== selectedMode) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (
        !a.name.toLowerCase().includes(q) &&
        !a.bio.toLowerCase().includes(q) &&
        !a.specialization.some((s) => s.toLowerCase().includes(q))
      )
        return false;
    }
    return true;
  });

  return (
    <div data-ocid="astrologer.page">
      {/* Banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "260px" }}
      >
        <img
          src="/assets/generated/consultation-banner.dim_1200x400.png"
          alt="Astrologer Consultation"
          className="w-full h-64 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.78))",
          }}
        >
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🧘 Consult an Astrologer
          </h1>
          <p
            className="text-base mb-4"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            India's largest verified network of spiritual experts
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              to="/book-consultation"
              data-ocid="astrologer.book_consultation_cta"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
                boxShadow: "0 2px 12px oklch(0.68 0.20 48 / 0.4)",
              }}
            >
              📅 Book Consultation
            </Link>
            <Link
              to="/tantra-remedies"
              data-ocid="astrologer.tantra_link"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all"
              style={{
                background: "oklch(0.22 0.06 25 / 0.8)",
                color: "oklch(0.78 0.14 75)",
                border: "1px solid oklch(0.40 0.08 48 / 0.6)",
              }}
            >
              🕯️ Tantra Remedies
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats bar */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
          {[
            {
              icon: "🧘",
              label: "Verified Experts",
              value: `${allAstrologers.filter((a) => a.is_verified).length}+`,
            },
            { icon: "🌏", label: "Countries", value: "12+" },
            { icon: "⭐", label: "Avg Rating", value: "4.8" },
            { icon: "🗣️", label: "Languages", value: "20+" },
            { icon: "📅", label: "Bookings Done", value: "50K+" },
            { icon: "🏆", label: "Years Exp (avg)", value: "18" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.30 0.06 30 / 0.4)",
              }}
            >
              <div className="text-xl mb-1">{stat.icon}</div>
              <div
                className="font-bold text-sm"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "oklch(0.55 0.05 60)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar Filters ───────────────────────────────────────────── */}
          <aside className="lg:w-64 shrink-0" data-ocid="astrologer.filters">
            <div
              className="rounded-2xl p-5 sticky top-24"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.30 0.06 30 / 0.5)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="font-bold text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  🔍 Filter Astrologers
                </h2>
                {(selectedSpec ||
                  selectedFaith !== "All" ||
                  selectedMode !== "All" ||
                  selectedState !== "All States" ||
                  selectedCountry !== "All Countries") && (
                  <button
                    type="button"
                    data-ocid="astrologer.clear_filters"
                    onClick={() => {
                      setSelectedSpec(null);
                      setSelectedFaith("All");
                      setSelectedMode("All");
                      setSelectedState("All States");
                      setSelectedCountry("All Countries");
                      setSearchQuery("");
                    }}
                    className="text-xs underline"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5"
                  style={{ color: "oklch(0.55 0.06 60)" }}
                />
                <Input
                  data-ocid="astrologer.search_input"
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 text-xs h-8"
                  style={{
                    background: "oklch(0.18 0.04 20)",
                    border: "1px solid oklch(0.35 0.06 30 / 0.5)",
                    color: "oklch(0.85 0.04 70)",
                  }}
                />
              </div>

              {/* Region tabs */}
              <div className="mb-4">
                <h3
                  className="font-bold text-xs uppercase tracking-wider mb-2"
                  style={{ color: "oklch(0.65 0.10 65)" }}
                >
                  Region
                </h3>
                <div className="flex gap-2">
                  {(["India", "International"] as const).map((r) => (
                    <FilterChip
                      key={r}
                      label={r}
                      active={regionTab === r}
                      onClick={() => {
                        setRegionTab(r);
                        setSelectedState("All States");
                        setSelectedCountry("All Countries");
                      }}
                      ocid={`astrologer.region_tab_${r.toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>

              {/* State / Country */}
              {regionTab === "India" ? (
                <div className="mb-4">
                  <h3
                    className="font-bold text-xs uppercase tracking-wider mb-2"
                    style={{ color: "oklch(0.65 0.10 65)" }}
                  >
                    State
                  </h3>
                  <select
                    data-ocid="astrologer.state_select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full text-xs rounded-lg px-3 py-2"
                    style={{
                      background: "oklch(0.18 0.04 20)",
                      border: "1px solid oklch(0.35 0.06 30 / 0.5)",
                      color: "oklch(0.85 0.04 70)",
                    }}
                  >
                    {INDIAN_STATES_FILTER.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="mb-4">
                  <h3
                    className="font-bold text-xs uppercase tracking-wider mb-2"
                    style={{ color: "oklch(0.65 0.10 65)" }}
                  >
                    Country
                  </h3>
                  <select
                    data-ocid="astrologer.country_select"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full text-xs rounded-lg px-3 py-2"
                    style={{
                      background: "oklch(0.18 0.04 20)",
                      border: "1px solid oklch(0.35 0.06 30 / 0.5)",
                      color: "oklch(0.85 0.04 70)",
                    }}
                  >
                    {WORLD_COUNTRIES_FILTER.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Faith */}
              <div className="mb-4">
                <h3
                  className="font-bold text-xs uppercase tracking-wider mb-2"
                  style={{ color: "oklch(0.65 0.10 65)" }}
                >
                  Faith Expertise
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {["All", "Hindu", "Jain", "Sikh", "General"].map((f) => (
                    <FilterChip
                      key={f}
                      label={f}
                      active={selectedFaith === f}
                      onClick={() => setSelectedFaith(f)}
                      ocid={`astrologer.faith_${f.toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div className="mb-4">
                <h3
                  className="font-bold text-xs uppercase tracking-wider mb-2"
                  style={{ color: "oklch(0.65 0.10 65)" }}
                >
                  Consultation Mode
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {["All", "Online", "Offline", "Both"].map((m) => (
                    <FilterChip
                      key={m}
                      label={m}
                      active={selectedMode === m}
                      onClick={() => setSelectedMode(m)}
                      ocid={`astrologer.mode_${m.toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>

              {/* Specialty */}
              <div className="mb-2">
                <h3
                  className="font-bold text-xs uppercase tracking-wider mb-2"
                  style={{ color: "oklch(0.65 0.10 65)" }}
                >
                  Specialty
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {visibleSpecs.map((s) => (
                    <FilterChip
                      key={s}
                      label={s}
                      active={selectedSpec === s}
                      onClick={() =>
                        setSelectedSpec(selectedSpec === s ? null : s)
                      }
                      ocid={`astrologer.spec_${s.toLowerCase().replace(/\s+/g, "-")}`}
                    />
                  ))}
                </div>
                {ALL_SPECS.length > 10 && (
                  <button
                    type="button"
                    onClick={() => setShowAllSpecs(!showAllSpecs)}
                    className="mt-2 flex items-center gap-1 text-xs"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    {showAllSpecs ? (
                      <>
                        <ChevronUp className="h-3 w-3" /> Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3" /> +
                        {ALL_SPECS.length - 10} more
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* ── Main Grid ─────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2
                  className="font-bold text-lg"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {regionTab === "India"
                    ? "🇮🇳 Indian Astrologers"
                    : "🌍 International Astrologers"}
                </h2>
                <p className="text-sm" style={{ color: "oklch(0.60 0.05 65)" }}>
                  {filtered.length} expert{filtered.length !== 1 ? "s" : ""}{" "}
                  found
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                  <Skeleton key={i} className="h-72 rounded-2xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                data-ocid="astrologer.empty_state"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px dashed oklch(0.35 0.06 30)",
                }}
              >
                <p className="text-4xl mb-3">🔭</p>
                <p
                  className="font-bold mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  No astrologers found
                </p>
                <p
                  className="text-sm mb-4"
                  style={{ color: "oklch(0.55 0.05 60)" }}
                >
                  Try adjusting your filters
                </p>
                <Button
                  data-ocid="astrologer.clear_filters_button"
                  onClick={() => {
                    setSelectedSpec(null);
                    setSelectedFaith("All");
                    setSelectedMode("All");
                    setSelectedState("All States");
                    setSelectedCountry("All Countries");
                    setSearchQuery("");
                  }}
                  size="sm"
                  style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                data-ocid="astrologer.grid"
              >
                {filtered.map((ast, idx) => (
                  <AstrologerCard key={ast.id} ast={ast} index={idx} />
                ))}
              </div>
            )}

            {/* Browse by state section */}
            <div
              className="mt-12 pt-8"
              style={{ borderTop: "1px solid oklch(0.28 0.06 28 / 0.4)" }}
            >
              <h3
                className="font-bold text-sm mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🇮🇳 Find Astrologers by Indian State
              </h3>
              <div
                className="flex flex-wrap gap-2 mb-6"
                data-ocid="astrologer.state_links"
              >
                {INDIAN_STATES_FILTER.slice(1).map((state) => (
                  <button
                    type="button"
                    key={state}
                    onClick={() => {
                      setRegionTab("India");
                      setSelectedState(state);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-xs px-3 py-1 rounded-full transition-all hover:opacity-80"
                    style={{
                      background: "oklch(0.25 0.06 25)",
                      color: "oklch(0.70 0.08 70)",
                      border: "1px solid oklch(0.32 0.06 30 / 0.5)",
                    }}
                  >
                    {state}
                  </button>
                ))}
              </div>

              <h3
                className="font-bold text-sm mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🌍 International Astrologers
              </h3>
              <div
                className="flex flex-wrap gap-2"
                data-ocid="astrologer.country_links"
              >
                {WORLD_COUNTRIES_FILTER.slice(1).map((country) => (
                  <button
                    type="button"
                    key={country}
                    onClick={() => {
                      setRegionTab("International");
                      setSelectedCountry(country);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-xs px-3 py-1 rounded-full transition-all hover:opacity-80"
                    style={{
                      background: "oklch(0.25 0.06 25)",
                      color: "oklch(0.70 0.08 70)",
                      border: "1px solid oklch(0.32 0.06 30 / 0.5)",
                    }}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
