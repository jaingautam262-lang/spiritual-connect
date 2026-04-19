import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { useState } from "react";
import { useGetAllAstrologers } from "../hooks/useQueries";
import type { AstrologerProfile } from "../types/backend-types";

// ─── Data ────────────────────────────────────────────────────────────────────

const PLACEHOLDER_ASTROLOGERS: AstrologerProfile[] = [
  {
    id: "ast-1",
    name: "Pandit Rajesh Sharma",
    specializations: ["Vedic Astrology", "Kundli", "Vastu"],
    bio: "Expert in Vedic astrology with 20+ years of experience helping thousands find their life path.",
    experienceYears: BigInt(20),
    rating: 4.9,
    perMinuteRate: 25,
    languages: ["Hindi", "English"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-2",
    name: "Dr. Priya Nair",
    specializations: ["Tarot Reading", "Numerology", "Palmistry"],
    bio: "Certified tarot reader and numerologist with a modern approach to ancient wisdom.",
    experienceYears: BigInt(15),
    rating: 4.8,
    perMinuteRate: 20,
    languages: ["English", "Malayalam"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-3",
    name: "Acharya Suresh Joshi",
    specializations: ["Lal Kitab Astrology", "Remedies", "Gemology"],
    bio: "Specialist in Lal Kitab remedies and gemstone therapy for life transformation.",
    experienceYears: BigInt(25),
    rating: 4.7,
    perMinuteRate: 30,
    languages: ["Hindi", "Gujarati"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-4",
    name: "Jyotishi Meera Devi",
    specializations: ["Nadi Astrology", "Marriage", "Career"],
    bio: "Expert in Nadi astrology and marriage compatibility with 18 years of practice.",
    experienceYears: BigInt(18),
    rating: 4.9,
    perMinuteRate: 35,
    languages: ["Tamil", "English"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-5",
    name: "Pandit Vikram Singh",
    specializations: ["Vaastu", "Feng Shui", "Numerology"],
    bio: "Renowned Vastu consultant for homes and businesses across India.",
    experienceYears: BigInt(22),
    rating: 4.6,
    perMinuteRate: 28,
    languages: ["Hindi", "Punjabi"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-6",
    name: "Astro Kavita Rao",
    specializations: ["KP Astrology", "Horary", "Transit"],
    bio: "Specialist in KP system and horary astrology for precise predictions.",
    experienceYears: BigInt(12),
    rating: 4.8,
    perMinuteRate: 22,
    languages: ["Telugu", "English"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-7",
    name: "Guru Anand Mishra",
    specializations: ["Vedic Astrology", "Muhurta", "Puja"],
    bio: "Expert in auspicious timing and puja rituals with 30 years of experience.",
    experienceYears: BigInt(30),
    rating: 5.0,
    perMinuteRate: 40,
    languages: ["Hindi", "Sanskrit"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-8",
    name: "Ankit Batra",
    specializations: ["Numerology", "Western Astrology", "Face Reading"],
    bio: "Specialist in Chaldean numerology and Western astrology using Lo Shu Grid.",
    experienceYears: BigInt(10),
    rating: 4.7,
    perMinuteRate: 18,
    languages: ["Hindi", "English"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-9",
    name: "Pandit Ravi Kumar",
    specializations: ["Vedic Astrology", "Kundli", "Marriage"],
    bio: "Experienced Vedic astrologer from Varanasi, expert in kundli matching and marriage timing.",
    experienceYears: BigInt(16),
    rating: 4.8,
    perMinuteRate: 24,
    languages: ["Hindi", "English"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-10",
    name: "Dr. Sunita Khanna",
    specializations: ["Psychic Reader", "Tarot Reading", "Numerology"],
    bio: "Renowned psychic reader and tarot expert helping clients in UK and India for 14 years.",
    experienceYears: BigInt(14),
    rating: 4.9,
    perMinuteRate: 32,
    languages: ["English", "Hindi"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-11",
    name: "Acharya Gopal Das",
    specializations: ["KP Astrology", "Horary", "Career"],
    bio: "KP astrology specialist based in Singapore, helping the Indian diaspora globally.",
    experienceYears: BigInt(19),
    rating: 4.7,
    perMinuteRate: 38,
    languages: ["Hindi", "English", "Tamil"],
    createdAt: BigInt(0),
  },
  {
    id: "ast-12",
    name: "Panditji Om Sharma",
    specializations: ["Vaastu", "Vedic Astrology", "Remedies"],
    bio: "Vastu Shastra expert and Vedic astrologer based in Jaipur with 24 years of experience.",
    experienceYears: BigInt(24),
    rating: 4.6,
    perMinuteRate: 26,
    languages: ["Hindi", "Rajasthani"],
    createdAt: BigInt(0),
  },
];

// ─── City/Category Data ───────────────────────────────────────────────────────

const INDIAN_CITIES = [
  // Metro / major cities (original)
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Chandigarh",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Thane",
  // New additions
  "Jaipur",
  "Nagpur",
  "Patna",
  "Ludhiana",
  "Jalandhar",
  "Amritsar",
  "Guwahati",
  "Gujarat",
  "Indore",
  "Bhubaneswar",
  "Surat",
  "Bhopal",
  "Varanasi",
  "Navi Mumbai",
  "Allahabad",
  "Ranchi",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kharagpur",
  "Jamshedpur",
  "Cuttack",
  "Kochi",
  "Howrah",
  "Dehradun",
  "Durgapur",
  "Asansol",
  "Ujjain",
  "Siliguri",
  "Jammu",
  "Udaipur",
  "Haridwar",
  "South Delhi",
  "Coimbatore",
  "Vijayawada",
  "Panchkula",
  "Salem",
  "Ambala",
  "Vellore",
  "Shimla",
];

const INTERNATIONAL_CITIES: { region: string; places: string[] }[] = [
  {
    region: "UK",
    places: ["London", "Birmingham", "Manchester", "Leeds", "Liverpool"],
  },
  {
    region: "Canada",
    places: [
      "Toronto",
      "Montreal",
      "Vancouver",
      "Calgary",
      "Edmonton",
      "Ottawa",
      "Brampton",
    ],
  },
  {
    region: "Australia",
    places: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  },
  {
    region: "Other Countries",
    places: [
      "UAE",
      "Pakistan",
      "Vietnam",
      "Greece",
      "Germany",
      "South Africa",
      "Singapore",
      "Saudi Arabia",
      "Nigeria",
      "New Zealand",
      "Nepal",
      "Mauritius",
      "Malaysia",
      "Kenya",
      "Italy",
      "Indonesia",
    ],
  },
];

const SPECIALTIES = [
  // Original
  "Vedic Astrology",
  "Kundli",
  "Numerology",
  "Tarot Reading",
  "Vastu Shastra",
  "Palmistry",
  "Nadi Astrology",
  "Marriage",
  "Career",
  "Gemology",
  "Remedies",
  "Transit",
  // New additions
  "KP Astrology",
  "Lal Kitab Astrology",
  "Western Astrology",
  "Horary",
  "Face Reading",
  "Psychic Reader",
  "Vaastu",
];

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
        className="text-xs font-heading font-semibold ml-1"
        style={{ color: "oklch(0.55 0.16 60)" }}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  items: string[];
  selected: string | null;
  onSelect: (val: string | null) => void;
  defaultShowCount?: number;
  dataOcidPrefix: string;
}

function FilterSection({
  title,
  items,
  selected,
  onSelect,
  defaultShowCount = 8,
  dataOcidPrefix,
}: FilterSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, defaultShowCount);
  const hasMore = items.length > defaultShowCount;

  return (
    <div className="mb-5">
      <h3
        className="font-heading font-bold text-xs uppercase tracking-wider mb-2"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {visible.map((item) => {
          const active = selected === item;
          return (
            <button
              type="button"
              key={item}
              data-ocid={`${dataOcidPrefix}-${item.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => onSelect(active ? null : item)}
              className="text-xs px-2.5 py-1 rounded-full font-heading transition-all"
              style={
                active
                  ? {
                      background: "oklch(0.68 0.20 48)",
                      color: "white",
                    }
                  : {
                      background: "oklch(0.25 0.06 25 / 0.8)",
                      color: "oklch(0.75 0.04 75)",
                      border: "1px solid oklch(0.35 0.06 30 / 0.5)",
                    }
              }
            >
              {item}
            </button>
          );
        })}
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-xs px-2.5 py-1 rounded-full font-heading flex items-center gap-1 transition-all"
            style={{
              background: "oklch(0.28 0.08 48 / 0.4)",
              color: "oklch(0.68 0.20 48)",
              border: "1px dashed oklch(0.68 0.20 48 / 0.4)",
            }}
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                +{items.length - defaultShowCount} more{" "}
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

interface IntlFilterSectionProps {
  selected: string | null;
  onSelect: (val: string | null) => void;
}

function IntlFilterSection({ selected, onSelect }: IntlFilterSectionProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-5">
      <h3
        className="font-heading font-bold text-xs uppercase tracking-wider mb-2"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        International
      </h3>
      {INTERNATIONAL_CITIES.slice(0, expanded ? undefined : 2).map((group) => (
        <div key={group.region} className="mb-2">
          <p
            className="text-xs font-heading mb-1"
            style={{ color: "oklch(0.60 0.08 60)" }}
          >
            {group.region}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {group.places.map((place) => {
              const active = selected === place;
              return (
                <button
                  type="button"
                  key={place}
                  data-ocid={`filter-intl-${place.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => onSelect(active ? null : place)}
                  className="text-xs px-2.5 py-1 rounded-full font-heading transition-all"
                  style={
                    active
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          background: "oklch(0.25 0.06 25 / 0.8)",
                          color: "oklch(0.75 0.04 75)",
                          border: "1px solid oklch(0.35 0.06 30 / 0.5)",
                        }
                  }
                >
                  {place}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!expanded && INTERNATIONAL_CITIES.length > 2 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-xs px-2.5 py-1 rounded-full font-heading flex items-center gap-1 mt-1"
          style={{
            background: "oklch(0.28 0.08 48 / 0.4)",
            color: "oklch(0.68 0.20 48)",
            border: "1px dashed oklch(0.68 0.20 48 / 0.4)",
          }}
        >
          +
          {INTERNATIONAL_CITIES.slice(2).reduce(
            (acc, g) => acc + g.places.length,
            0,
          )}{" "}
          more <ChevronDown className="h-3 w-3" />
        </button>
      )}
      {expanded && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="text-xs px-2.5 py-1 rounded-full font-heading flex items-center gap-1 mt-1"
          style={{
            background: "oklch(0.28 0.08 48 / 0.4)",
            color: "oklch(0.68 0.20 48)",
            border: "1px dashed oklch(0.68 0.20 48 / 0.4)",
          }}
        >
          Show less <ChevronUp className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AstrologerConsultation() {
  const { data: astrologers = [], isLoading } = useGetAllAstrologers();
  const displayAstrologers =
    astrologers.length > 0 ? astrologers : PLACEHOLDER_ASTROLOGERS;

  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const [intlFilter, setIntlFilter] = useState<string | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null);

  // When one filter group is selected, clear the other city group
  function handleCitySelect(val: string | null) {
    setCityFilter(val);
    if (val) setIntlFilter(null);
  }
  function handleIntlSelect(val: string | null) {
    setIntlFilter(val);
    if (val) setCityFilter(null);
  }

  const activeCity = cityFilter ?? intlFilter;

  const filtered = displayAstrologers.filter((ast) => {
    const matchSpec =
      !specialtyFilter ||
      ast.specializations.some((s) =>
        s.toLowerCase().includes(specialtyFilter.toLowerCase()),
      );
    // City/international filter: in a real app these would be on the profile;
    // here we filter by specialty only since city isn't a profile field.
    // We still track city selection for the UI — all astrologers shown when city selected
    // (they serve nationwide/globally).
    return matchSpec;
  });

  const hasActiveFilter = !!(activeCity || specialtyFilter);

  return (
    <div>
      {/* Banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src="/assets/generated/consultation-banner.dim_1200x400.png"
          alt="Astrologer Consultation"
          className="w-full h-72 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))",
          }}
        >
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🧘 Consult an Astrologer
          </h1>
          <p
            className="font-body text-lg mb-4"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            Book appointments with verified spiritual experts
          </p>
          <Link
            to="/book-consultation"
            data-ocid="book-consultation-cta"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-heading font-bold text-sm transition-all"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              boxShadow: "0 2px 12px oklch(0.68 0.20 48 / 0.4)",
            }}
          >
            📅 Book Consultation Now
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── Sidebar Filters ─────────────────────────────────────────── */}
          <aside className="lg:w-64 shrink-0" data-ocid="astrologer-filters">
            <div
              className="rounded-2xl p-5 sticky top-24"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.30 0.06 30 / 0.5)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  🔍 Filter Astrologers
                </h2>
                {hasActiveFilter && (
                  <button
                    type="button"
                    data-ocid="filter-clear-all"
                    onClick={() => {
                      setCityFilter(null);
                      setIntlFilter(null);
                      setSpecialtyFilter(null);
                    }}
                    className="text-xs font-heading underline"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Specialty */}
              <FilterSection
                title="Specialty"
                items={SPECIALTIES}
                selected={specialtyFilter}
                onSelect={setSpecialtyFilter}
                defaultShowCount={10}
                dataOcidPrefix="filter-spec"
              />

              {/* Indian Cities */}
              <FilterSection
                title="Indian Cities"
                items={INDIAN_CITIES}
                selected={cityFilter}
                onSelect={handleCitySelect}
                defaultShowCount={8}
                dataOcidPrefix="filter-city"
              />

              {/* International */}
              <IntlFilterSection
                selected={intlFilter}
                onSelect={handleIntlSelect}
              />
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title mb-1">Our Expert Astrologers</h2>
                <p className="section-subtitle text-sm">
                  {hasActiveFilter
                    ? `Showing astrologers${specialtyFilter ? ` in ${specialtyFilter}` : ""}${activeCity ? ` · ${activeCity}` : ""}`
                    : "Choose from our panel of verified spiritual experts"}
                </p>
              </div>
              <span
                className="text-xs font-heading px-3 py-1 rounded-full"
                style={{
                  background: "oklch(0.28 0.08 48 / 0.2)",
                  color: "oklch(0.68 0.20 48)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                }}
              >
                {filtered.length} found
              </span>
            </div>

            {/* Active filter chips */}
            {hasActiveFilter && (
              <div
                className="flex flex-wrap gap-2 mb-5"
                data-ocid="active-filters"
              >
                {specialtyFilter && (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-heading"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.15)",
                      color: "oklch(0.68 0.20 48)",
                      border: "1px solid oklch(0.68 0.20 48 / 0.3)",
                    }}
                  >
                    {specialtyFilter}
                    <button
                      type="button"
                      onClick={() => setSpecialtyFilter(null)}
                      aria-label="Remove specialty filter"
                    >
                      ✕
                    </button>
                  </span>
                )}
                {activeCity && (
                  <span
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-heading"
                    style={{
                      background: "oklch(0.55 0.16 60 / 0.15)",
                      color: "oklch(0.78 0.14 75)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                    }}
                  >
                    📍 {activeCity}
                    <button
                      type="button"
                      onClick={() => {
                        setCityFilter(null);
                        setIntlFilter(null);
                      }}
                      aria-label="Remove city filter"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => i).map((i) => (
                  <Skeleton key={i} className="h-64 rounded-2xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                data-ocid="astrologer-empty-state"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px dashed oklch(0.35 0.06 30)",
                }}
              >
                <p className="text-4xl mb-3">🔭</p>
                <p
                  className="font-heading font-bold mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  No astrologers found
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your filters
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCityFilter(null);
                    setIntlFilter(null);
                    setSpecialtyFilter(null);
                  }}
                  className="text-sm font-heading font-bold px-4 py-2 rounded-full"
                  style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                data-ocid="astrologer-grid"
              >
                {filtered.map((ast) => (
                  <div key={ast.id} className="temple-card p-5 flex flex-col">
                    <div
                      className="h-16 w-16 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.2), oklch(0.78 0.14 75 / 0.2))",
                      }}
                    >
                      🧘
                    </div>
                    <h3
                      className="font-heading font-bold text-sm text-center mb-1"
                      style={{ color: "oklch(0.22 0.08 22)" }}
                    >
                      {ast.name}
                    </h3>
                    <div className="flex justify-center mb-2">
                      <StarRating rating={ast.rating} />
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mb-3">
                      {ast.specializations.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-0.5 rounded-full font-heading"
                          style={{
                            background: "oklch(0.68 0.20 48 / 0.1)",
                            color: "oklch(0.55 0.16 48)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-body text-muted-foreground text-center mb-3 flex-1 line-clamp-2">
                      {ast.bio}
                    </p>
                    <div className="flex items-center justify-between mb-3 text-xs font-body">
                      <span className="text-muted-foreground">
                        {Number(ast.experienceYears)} yrs exp
                      </span>
                      <span
                        className="font-heading font-bold"
                        style={{ color: "oklch(0.68 0.20 48)" }}
                      >
                        ₹{ast.perMinuteRate}/min
                      </span>
                    </div>
                    <Link
                      to="/astrologer/$id"
                      params={{ id: ast.id }}
                      className="w-full py-2 rounded-full text-center text-xs font-heading font-bold transition-all mb-2"
                      style={{
                        border: "1.5px solid oklch(0.68 0.20 48 / 0.6)",
                        color: "oklch(0.55 0.16 48)",
                      }}
                    >
                      View Profile
                    </Link>
                    <Link
                      to="/book-consultation"
                      search={{
                        astrologerId: ast.id,
                        astrologerName: encodeURIComponent(ast.name),
                        rate: String(ast.perMinuteRate),
                      }}
                      data-ocid={`book-${ast.id}`}
                      className="w-full py-2 rounded-full text-center text-xs font-heading font-bold transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                        color: "white",
                      }}
                    >
                      Book Consultation
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* City Browse Links — helpful for SEO and navigation */}
            <div
              className="mt-12 pt-8"
              style={{ borderTop: "1px solid oklch(0.30 0.06 30 / 0.4)" }}
            >
              <h3
                className="font-heading font-bold text-sm mb-4"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🇮🇳 Astrologers by Indian City
              </h3>
              <div
                className="flex flex-wrap gap-2 mb-8"
                data-ocid="city-links-india"
              >
                {INDIAN_CITIES.map((city) => (
                  <button
                    type="button"
                    key={city}
                    onClick={() => {
                      handleCitySelect(city);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-xs px-3 py-1 rounded-full font-heading transition-all hover:opacity-80"
                    style={{
                      background: "oklch(0.25 0.06 25)",
                      color: "oklch(0.70 0.08 70)",
                      border: "1px solid oklch(0.32 0.06 30 / 0.5)",
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>

              <h3
                className="font-heading font-bold text-sm mb-4"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🌍 Astrologers by International Location
              </h3>
              <div className="space-y-4" data-ocid="city-links-international">
                {INTERNATIONAL_CITIES.map((group) => (
                  <div key={group.region}>
                    <p
                      className="text-xs font-heading font-semibold mb-2"
                      style={{ color: "oklch(0.60 0.08 60)" }}
                    >
                      {group.region}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.places.map((place) => (
                        <button
                          type="button"
                          key={place}
                          onClick={() => {
                            handleIntlSelect(place);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="text-xs px-3 py-1 rounded-full font-heading transition-all hover:opacity-80"
                          style={{
                            background: "oklch(0.25 0.06 25)",
                            color: "oklch(0.70 0.08 70)",
                            border: "1px solid oklch(0.32 0.06 30 / 0.5)",
                          }}
                        >
                          {place}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3
                  className="font-heading font-bold text-sm mb-4"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  🔮 Browse by Specialty
                </h3>
                <div
                  className="flex flex-wrap gap-2"
                  data-ocid="specialty-links"
                >
                  {SPECIALTIES.map((spec) => (
                    <button
                      type="button"
                      key={spec}
                      onClick={() => {
                        setSpecialtyFilter(spec);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="text-xs px-3 py-1 rounded-full font-heading transition-all hover:opacity-80"
                      style={{
                        background: "oklch(0.28 0.08 48 / 0.2)",
                        color: "oklch(0.68 0.20 48)",
                        border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                      }}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
