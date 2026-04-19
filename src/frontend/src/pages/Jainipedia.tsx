import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { type JainTerm, jainTerms } from "../data/jainipediaData";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const CATEGORIES: JainTerm["category"][] = [
  "Philosophy",
  "Conduct",
  "Rituals",
  "Fundamentals",
  "Cosmology",
  "Saints",
];

const CATEGORY_COLORS: Record<JainTerm["category"], string> = {
  Philosophy: "oklch(0.55 0.14 250)",
  Conduct: "oklch(0.50 0.16 140)",
  Rituals: "oklch(0.58 0.18 48)",
  Fundamentals: "oklch(0.52 0.14 30)",
  Cosmology: "oklch(0.52 0.14 290)",
  Saints: "oklch(0.55 0.16 20)",
};

const CATEGORY_BG: Record<JainTerm["category"], string> = {
  Philosophy: "oklch(0.55 0.14 250 / 0.12)",
  Conduct: "oklch(0.50 0.16 140 / 0.12)",
  Rituals: "oklch(0.68 0.20 48 / 0.15)",
  Fundamentals: "oklch(0.52 0.14 30 / 0.15)",
  Cosmology: "oklch(0.52 0.14 290 / 0.12)",
  Saints: "oklch(0.55 0.16 20 / 0.15)",
};

export default function Jainipedia() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<
    JainTerm["category"] | null
  >(null);
  const termRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const setTermRef = useCallback(
    (id: string) => (el: HTMLDivElement | null) => {
      termRefs.current[id] = el;
    },
    [],
  );

  const filteredTerms = useMemo(() => {
    return jainTerms.filter((t) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.termHi.includes(q) ||
        t.definition.toLowerCase().includes(q);
      const matchLetter =
        !activeLetter || t.term.toUpperCase().startsWith(activeLetter);
      const matchCategory = !activeCategory || t.category === activeCategory;
      return matchSearch && matchLetter && matchCategory;
    });
  }, [search, activeLetter, activeCategory]);

  const usedLetters = useMemo(
    () => new Set(jainTerms.map((t) => t.term[0].toUpperCase())),
    [],
  );

  const clearAll = () => {
    setSearch("");
    setActiveLetter(null);
    setActiveCategory(null);
  };

  const scrollToTerm = (id: string) => {
    const el = termRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.style.outline = "2px solid oklch(0.78 0.14 75)";
      setTimeout(() => {
        el.style.outline = "";
      }, 2000);
    }
  };

  const hasActiveFilter = !!search || !!activeLetter || !!activeCategory;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Hero */}
      <div
        className="relative py-14 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 22) 0%, oklch(0.24 0.09 32) 50%, oklch(0.20 0.08 25) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 50%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <p className="text-4xl mb-2" aria-hidden="true">
            🕉
          </p>
          <h1
            className="font-decorative text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Jainipedia
          </h1>
          <p
            className="font-body text-base md:text-lg mb-1"
            style={{ color: "oklch(0.88 0.04 75)" }}
          >
            जैन शब्दकोश — A Comprehensive Jain Glossary
          </p>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.65 0.04 60)" }}
          >
            {jainTerms.length}+ terms across Philosophy, Conduct, Rituals & more
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search + Filters */}
        <div
          className="rounded-2xl p-5 mb-6 border"
          style={{
            background: "oklch(0.99 0.008 80)",
            borderColor: "oklch(0.85 0.04 70)",
            boxShadow: "0 2px 12px oklch(0.62 0.18 48 / 0.06)",
          }}
        >
          {/* Search */}
          <div className="relative mb-4">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-base pointer-events-none"
              aria-hidden="true"
            >
              🔍
            </span>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms, definitions, Sanskrit…"
              className="pl-9 font-body"
              style={{ borderColor: "oklch(0.85 0.04 70)" }}
              data-ocid="jainipedia.search_input"
              aria-label="Search Jain terms"
            />
          </div>

          {/* A–Z Filter */}
          <div className="mb-4">
            <p
              className="text-xs font-heading uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.48 0.04 40)" }}
            >
              A–Z Browse
            </p>
            <div className="flex flex-wrap gap-1" aria-label="Filter by letter">
              {ALPHABET.map((letter) => {
                const active = activeLetter === letter;
                const available = usedLetters.has(letter);
                return (
                  <button
                    key={letter}
                    type="button"
                    disabled={!available}
                    onClick={() => setActiveLetter(active ? null : letter)}
                    className="w-7 h-7 rounded text-xs font-heading font-bold transition-all duration-150"
                    style={{
                      background: active
                        ? "oklch(0.62 0.18 48)"
                        : available
                          ? "oklch(0.93 0.02 75)"
                          : "transparent",
                      color: active
                        ? "white"
                        : available
                          ? "oklch(0.30 0.06 35)"
                          : "oklch(0.75 0.02 70)",
                      border: `1px solid ${active ? "oklch(0.62 0.18 48)" : available ? "oklch(0.82 0.04 70)" : "oklch(0.88 0.02 75)"}`,
                      cursor: available ? "pointer" : "not-allowed",
                    }}
                    data-ocid={`jainipedia.letter_${letter}`}
                    aria-pressed={active}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <p
              className="text-xs font-heading uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.48 0.04 40)" }}
            >
              Category
            </p>
            <div
              className="flex flex-wrap gap-2"
              aria-label="Filter by category"
            >
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(active ? null : cat)}
                    className="px-3 py-1 rounded-full text-xs font-heading font-semibold transition-all duration-150 border"
                    style={{
                      background: active
                        ? CATEGORY_COLORS[cat]
                        : CATEGORY_BG[cat],
                      color: active ? "white" : CATEGORY_COLORS[cat],
                      borderColor: CATEGORY_COLORS[cat],
                    }}
                    data-ocid={`jainipedia.category_${cat}`}
                    aria-pressed={active}
                  >
                    {cat}
                  </button>
                );
              })}

              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="px-3 py-1 rounded-full text-xs font-heading font-semibold border transition-all duration-150 hover:bg-red-50"
                  style={{
                    borderColor: "oklch(0.55 0.22 25)",
                    color: "oklch(0.55 0.22 25)",
                  }}
                  data-ocid="jainipedia.clear_filters"
                >
                  ✕ Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p
            className="text-sm font-body"
            style={{ color: "oklch(0.48 0.04 40)" }}
          >
            Showing{" "}
            <strong style={{ color: "oklch(0.30 0.06 35)" }}>
              {filteredTerms.length}
            </strong>{" "}
            of {jainTerms.length} terms
          </p>
        </div>

        {/* Terms grid */}
        {filteredTerms.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{
              background: "oklch(0.99 0.008 80)",
              borderColor: "oklch(0.85 0.04 70)",
            }}
            data-ocid="jainipedia.empty_state"
          >
            <p className="text-4xl mb-3" aria-hidden="true">
              🔎
            </p>
            <p
              className="font-heading text-lg font-semibold mb-1"
              style={{ color: "oklch(0.30 0.06 35)" }}
            >
              No terms found
            </p>
            <p
              className="font-body text-sm mb-4"
              style={{ color: "oklch(0.48 0.04 40)" }}
            >
              Try a different search or clear the filters
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="px-5 py-2 rounded-full text-sm font-heading font-semibold"
              style={{
                background: "oklch(0.62 0.18 48)",
                color: "white",
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term, idx) => (
              <motion.div
                key={term.id}
                ref={setTermRef(term.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.4) }}
                id={`term-${term.id}`}
                className="rounded-xl border p-5 transition-all duration-200 hover:shadow-md"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  borderColor: "oklch(0.85 0.04 70)",
                }}
                data-ocid="jainipedia.term_card"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <h2
                      className="font-heading font-bold text-lg leading-tight"
                      style={{ color: "oklch(0.22 0.06 30)" }}
                    >
                      {term.term}
                    </h2>
                    <p
                      className="font-body text-sm mt-0.5"
                      style={{ color: "oklch(0.55 0.08 45)" }}
                    >
                      {term.termHi}
                    </p>
                  </div>
                  <Badge
                    className="shrink-0 text-xs font-heading font-semibold border-0 mt-0.5"
                    style={{
                      background: CATEGORY_BG[term.category],
                      color: CATEGORY_COLORS[term.category],
                    }}
                  >
                    {term.category}
                  </Badge>
                </div>

                {/* Definition */}
                <p
                  className="font-body text-sm leading-relaxed mb-3"
                  style={{ color: "oklch(0.35 0.04 35)" }}
                >
                  {term.definition}
                </p>

                {/* Hindi definition */}
                <p
                  className="font-body text-sm leading-relaxed mb-4 pb-3 border-b"
                  style={{
                    color: "oklch(0.45 0.06 40)",
                    borderColor: "oklch(0.90 0.02 72)",
                  }}
                >
                  {term.definitionHi}
                </p>

                {/* Related Terms */}
                {term.relatedTerms.length > 0 && (
                  <div>
                    <p
                      className="text-xs font-heading uppercase tracking-wider mb-2"
                      style={{ color: "oklch(0.55 0.04 50)" }}
                    >
                      Related Terms
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {term.relatedTerms.map((relId) => {
                        const relTerm = jainTerms.find((t) => t.id === relId);
                        if (!relTerm) return null;
                        return (
                          <button
                            key={relId}
                            type="button"
                            onClick={() => scrollToTerm(relId)}
                            className="px-2.5 py-0.5 rounded-full text-xs font-heading transition-all duration-150 hover:shadow-sm border"
                            style={{
                              background: "oklch(0.94 0.025 80)",
                              color: "oklch(0.62 0.18 48)",
                              borderColor: "oklch(0.78 0.14 75 / 0.3)",
                            }}
                            data-ocid="jainipedia.related_term_link"
                            aria-label={`Go to ${relTerm.term}`}
                          >
                            {relTerm.term}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Footer note */}
        <p
          className="text-center text-xs font-body mt-8 pb-4"
          style={{ color: "oklch(0.60 0.04 50)" }}
        >
          जैनिपीडिया — {jainTerms.length} terms covering Jain philosophy, ethics
          & tradition
        </p>
      </div>
    </div>
  );
}
