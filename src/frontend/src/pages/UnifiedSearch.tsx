import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, Filter, Search, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  type ContentType,
  type FilterFaith,
  type SearchResult,
  useUnifiedSearch,
} from "../hooks/useUnifiedSearch";

const faithOptions: FilterFaith[] = ["All", "Hindu", "Jain", "Sikh"];

const typeIcons: Record<ContentType, string> = {
  Aarti: "🧘",
  Chalisa: "📖",
  Mantra: "🔔",
  Stotra: "💿",
  Kavach: "🛡️",
  Ashtakam: "🕉️",
  Stuti: "🌸",
  Sahasranama: "🙏",
  Bhajan: "🎵",
  Suktam: "📜",
  VratKatha: "🪔",
  Temple: "🛕",
  Blog: "📝",
};

const typeLabels: Record<ContentType, { hi: string; en: string }> = {
  Aarti: { hi: "आरती", en: "Aarti" },
  Chalisa: { hi: "चालीसा", en: "Chalisa" },
  Mantra: { hi: "मंत्र", en: "Mantra" },
  Stotra: { hi: "स्तोत्र", en: "Stotra" },
  Kavach: { hi: "कवच", en: "Kavach" },
  Ashtakam: { hi: "अष्टकम", en: "Ashtakam" },
  Stuti: { hi: "स्तुति", en: "Stuti" },
  Sahasranama: { hi: "सहस्रनाम", en: "Sahasranama" },
  Bhajan: { hi: "भजन", en: "Bhajan" },
  Suktam: { hi: "सूक्तम", en: "Suktam" },
  VratKatha: { hi: "व्रत कथा", en: "Vrat Katha" },
  Temple: { hi: "मंदिर", en: "Temple" },
  Blog: { hi: "ब्लॉग", en: "Blog" },
};

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        const testRegex = new RegExp(
          `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
          "gi",
        );
        return testRegex.test(part) ? (
          <mark
            key={`${i}-${part}`}
            style={{
              background: "oklch(0.78 0.14 75 / 0.3)",
              color: "oklch(0.35 0.12 25)",
              borderRadius: "2px",
              padding: "0 1px",
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={`${i}-${part}`}>{part}</span>
        );
      })}
    </>
  );
}

function ResultCard({
  result,
  query,
}: { result: SearchResult; query: string }) {
  return (
    <Link
      to={result.path}
      className="block rounded-xl p-4 transition-all duration-200 hover:scale-[1.01] group"
      style={{
        background: "oklch(0.99 0.008 80)",
        border: "1px solid oklch(0.85 0.04 70)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor =
          "oklch(0.78 0.14 75 / 0.5)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 4px 16px oklch(0.62 0.18 48 / 0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.borderColor =
          "oklch(0.85 0.04 70)";
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
      }}
      data-ocid={`search.result.${result.type}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">
          {typeIcons[result.type]}
        </span>
        <div className="flex-1 min-w-0">
          <h4
            className="font-heading font-semibold text-sm leading-snug mb-0.5 truncate"
            style={{ color: "oklch(0.25 0.06 30)" }}
          >
            <HighlightText text={result.title} query={query} />
          </h4>
          {result.subtitle && (
            <p
              className="text-xs font-body mb-1"
              style={{ color: "oklch(0.55 0.06 50)" }}
            >
              <HighlightText text={result.subtitle} query={query} />
            </p>
          )}
          {result.description && (
            <p
              className="text-xs font-body line-clamp-1"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              <HighlightText
                text={result.description.slice(0, 120)}
                query={query}
              />
            </p>
          )}
        </div>
        <BookOpen
          className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "oklch(0.62 0.18 48)" }}
        />
      </div>
    </Link>
  );
}

function ResultSection({
  type,
  results,
  query,
  language,
}: {
  type: ContentType;
  results: SearchResult[];
  query: string;
  language: "hi" | "en";
}) {
  if (results.length === 0) return null;
  const label = typeLabels[type][language];
  return (
    <div className="mb-6" data-ocid={`search.section.${type}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base">{typeIcons[type]}</span>
        <h3
          className="font-heading font-bold text-sm uppercase tracking-wide"
          style={{ color: "oklch(0.45 0.15 40)" }}
        >
          {label}
        </h3>
        <Badge
          className="text-xs px-2 py-0"
          style={{
            background: "oklch(0.68 0.20 48 / 0.1)",
            color: "oklch(0.50 0.16 45)",
            border: "1px solid oklch(0.68 0.20 48 / 0.2)",
          }}
        >
          {results.length}
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {results.map((r) => (
          <ResultCard key={r.id} result={r} query={query} />
        ))}
      </div>
    </div>
  );
}

const ORDERED_TYPES: ContentType[] = [
  "Aarti",
  "Chalisa",
  "Mantra",
  "Stotra",
  "Kavach",
  "Ashtakam",
  "Stuti",
  "Sahasranama",
  "Bhajan",
  "Suktam",
  "VratKatha",
  "Temple",
  "Blog",
];

export default function UnifiedSearch() {
  const { language } = useLanguage();
  const {
    query,
    setQuery,
    commitSearch,
    faithFilter,
    setFaithFilter,
    results,
    totalCount,
    isLoading,
    recentSearches,
    clearRecent,
    hasQuery,
  } = useUnifiedSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const labels = {
    placeholder:
      language === "hi"
        ? "आरती, चालीसा, मंत्र, स्तोत्र खोजें..."
        : "Search aarti, chalisa, mantra, stotra...",
    recentTitle: language === "hi" ? "हाल की खोज" : "Recent Searches",
    clearAll: language === "hi" ? "सभी हटाएं" : "Clear All",
    noResults: language === "hi" ? "कोई परिणाम नहीं मिला" : "No results found",
    noResultsHint:
      language === "hi" ? "कोई अलग शब्द आज़माएं" : "Try a different search term",
    filterLabel: language === "hi" ? "धर्म फ़िल्टर" : "Faith Filter",
    resultsFor: language === "hi" ? "परिणाम" : "results for",
    all: language === "hi" ? "सभी" : "All",
    hindu: language === "hi" ? "हिंदू" : "Hindu",
    jain: language === "hi" ? "जैन" : "Jain",
    sikh: language === "hi" ? "सिख" : "Sikh",
  };

  const faithLabels: Record<FilterFaith, string> = {
    All: labels.all,
    Hindu: labels.hindu,
    Jain: labels.jain,
    Sikh: labels.sikh,
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Search Header */}
      <div
        className="sticky top-0 z-20 border-b px-4 py-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          {/* Search input */}
          <div className="relative mb-3">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
              style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder={labels.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && commitSearch(query)}
              className="w-full rounded-full py-3 pl-12 pr-10 text-sm font-body outline-none"
              style={{
                background: "oklch(0.99 0.008 80)",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                color: "oklch(0.22 0.06 28)",
              }}
              data-ocid="search.input"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:opacity-80"
                style={{ color: "oklch(0.55 0.04 50)" }}
                aria-label="Clear search"
                data-ocid="search.clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Faith filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter
              className="h-3.5 w-3.5 flex-shrink-0"
              style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
            />
            {faithOptions.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFaithFilter(f)}
                className="px-3 py-1 rounded-full text-xs font-heading font-medium transition-all duration-200"
                style={{
                  background:
                    faithFilter === f
                      ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                      : "oklch(0.78 0.14 75 / 0.1)",
                  color:
                    faithFilter === f
                      ? "oklch(0.99 0.005 80)"
                      : "oklch(0.78 0.14 75 / 0.8)",
                  border:
                    faithFilter === f
                      ? "1px solid oklch(0.68 0.20 48)"
                      : "1px solid oklch(0.78 0.14 75 / 0.2)",
                }}
                data-ocid={`search.faith.${f}`}
              >
                {faithLabels[f]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Loading */}
        {isLoading && !hasQuery && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        )}

        {/* Recent searches */}
        {!hasQuery && recentSearches.length > 0 && (
          <div className="mb-8" data-ocid="search.recent">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock
                  className="h-4 w-4"
                  style={{ color: "oklch(0.62 0.18 48)" }}
                />
                <span
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {labels.recentTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={clearRecent}
                className="flex items-center gap-1 text-xs font-body hover:opacity-70 transition-opacity"
                style={{ color: "oklch(0.55 0.04 50)" }}
                data-ocid="search.recent.clear"
              >
                <Trash2 className="h-3 w-3" />
                {labels.clearAll}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-all hover:opacity-80"
                  style={{
                    background: "oklch(0.99 0.008 80)",
                    border: "1px solid oklch(0.85 0.04 70)",
                    color: "oklch(0.40 0.06 40)",
                  }}
                  data-ocid="search.recent.item"
                >
                  <Clock className="h-3 w-3 opacity-50" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results count */}
        {hasQuery && (
          <p
            className="text-sm font-body mb-5"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            <span style={{ color: "oklch(0.62 0.18 48)", fontWeight: 600 }}>
              {totalCount}
            </span>{" "}
            {labels.resultsFor}{" "}
            <span style={{ color: "oklch(0.35 0.12 25)", fontWeight: 600 }}>
              "{query}"
            </span>
          </p>
        )}

        {/* No results */}
        {hasQuery && totalCount === 0 && !isLoading && (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{
              background: "oklch(0.99 0.008 80)",
              borderColor: "oklch(0.85 0.04 70)",
            }}
            data-ocid="search.empty_state"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p
              className="font-heading text-lg"
              style={{ color: "oklch(0.40 0.04 40)" }}
            >
              {labels.noResults}
            </p>
            <p
              className="font-body text-sm mt-1"
              style={{ color: "oklch(0.60 0.04 50)" }}
            >
              {labels.noResultsHint}
            </p>
          </div>
        )}

        {/* Grouped results */}
        {hasQuery && totalCount > 0 && (
          <div data-ocid="search.results">
            {ORDERED_TYPES.map((type) => (
              <ResultSection
                key={type}
                type={type}
                results={results[type]}
                query={query}
                language={language}
              />
            ))}
          </div>
        )}

        {/* Empty state — no query */}
        {!hasQuery && recentSearches.length === 0 && (
          <div className="text-center py-24">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "oklch(0.68 0.20 48 / 0.08)",
                border: "2px solid oklch(0.68 0.20 48 / 0.2)",
              }}
            >
              <Search
                className="h-9 w-9"
                style={{ color: "oklch(0.68 0.20 48)" }}
              />
            </div>
            <p
              className="font-heading text-xl font-bold mb-2"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {language === "hi" ? "संपूर्ण खोज" : "Universal Search"}
            </p>
            <p
              className="font-body text-sm max-w-sm mx-auto"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              {language === "hi"
                ? "आरती, चालीसा, मंत्र, स्तोत्र, कवच — सभी libraries में एक साथ खोजें"
                : "Search across Aarti, Chalisa, Mantra, Stotra, Kavach — all libraries at once"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
