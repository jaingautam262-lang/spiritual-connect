import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Search, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  type CalculatorCategory,
  type CalculatorEntry,
  calculators,
} from "../data/calculatorIndexData";

const FAVORITES_KEY = "sc_calculator_favorites";
const RECENT_KEY = "sc_calculator_recent";

function useLocalStorageSet(key: string) {
  const [items, setItems] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]") as string[];
    } catch {
      return [];
    }
  });

  const toggle = (id: string) => {
    setItems((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  const add = (id: string) => {
    setItems((prev) => {
      const filtered = prev.filter((x) => x !== id);
      const next = [id, ...filtered].slice(0, 6);
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return { items, toggle, add };
}

type TabType = "all" | CalculatorCategory;

function CalculatorCard({
  calc,
  isFavorite,
  onToggleFavorite,
  onOpen,
}: {
  calc: CalculatorEntry;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpen: () => void;
}) {
  const categoryColor =
    calc.category === "astrology"
      ? {
          bg: "oklch(0.68 0.20 48 / 0.15)",
          text: "oklch(0.78 0.14 75)",
          border: "oklch(0.78 0.14 75 / 0.25)",
        }
      : calc.category === "love"
        ? {
            bg: "oklch(0.65 0.22 15 / 0.15)",
            text: "oklch(0.75 0.18 15)",
            border: "oklch(0.75 0.18 15 / 0.25)",
          }
        : {
            bg: "oklch(0.55 0.15 240 / 0.15)",
            text: "oklch(0.70 0.12 240)",
            border: "oklch(0.70 0.12 240 / 0.25)",
          };

  return (
    <div
      className="relative rounded-xl border p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-lg group"
      style={{
        background: "oklch(0.22 0.06 25)",
        borderColor: calc.isLive
          ? "oklch(0.78 0.14 75 / 0.18)"
          : "oklch(0.78 0.14 75 / 0.10)",
        opacity: calc.isLive ? 1 : 0.82,
      }}
      data-ocid="calculator.card"
    >
      {/* Coming Soon badge */}
      {!calc.isLive && (
        <span
          className="absolute top-3 right-10 text-xs px-2 py-0.5 rounded-full font-body font-semibold"
          style={{
            background: "oklch(0.55 0.15 240 / 0.20)",
            color: "oklch(0.70 0.12 240)",
            border: "1px solid oklch(0.70 0.12 240 / 0.30)",
          }}
        >
          Coming Soon
        </span>
      )}

      {/* Favorite */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        className="absolute top-3 right-3 p-1.5 rounded-full transition-colors hover:bg-white/10"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        data-ocid="calculator.favorite_toggle"
      >
        <Heart
          className="h-4 w-4 transition-colors"
          style={{
            color: isFavorite ? "oklch(0.68 0.20 48)" : "oklch(0.55 0.04 50)",
            fill: isFavorite ? "oklch(0.68 0.20 48)" : "transparent",
          }}
        />
      </button>

      {/* Icon + Name */}
      <div className="flex items-start gap-3 pr-8">
        <span className="text-3xl leading-none">{calc.icon}</span>
        <div className="min-w-0">
          <h3
            className="font-heading font-semibold text-sm leading-tight"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {calc.name}
          </h3>
          <p
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.60 0.08 60)" }}
          >
            {calc.nameHindi}
          </p>
        </div>
      </div>

      {/* Category badge */}
      <span
        className="self-start text-xs px-2 py-0.5 rounded-full font-body capitalize"
        style={{
          background: categoryColor.bg,
          color: categoryColor.text,
          border: `1px solid ${categoryColor.border}`,
        }}
      >
        {calc.category}
      </span>

      {/* Description */}
      <p
        className="text-xs leading-relaxed line-clamp-2"
        style={{ color: "oklch(0.70 0.04 60)" }}
      >
        {calc.description}
      </p>

      {/* Input Fields */}
      {calc.inputFields.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {calc.inputFields.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-xs px-2 py-0.5 rounded font-body"
              style={{
                background: "oklch(0.18 0.05 22)",
                color: "oklch(0.60 0.06 60)",
                border: "1px solid oklch(0.78 0.14 75 / 0.10)",
              }}
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Purpose Tags */}
      <div className="flex flex-wrap gap-1 mt-auto">
        {calc.purpose.slice(0, 2).map((p) => (
          <span
            key={p}
            className="text-xs"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            • {p}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-1">
        {calc.isLive ? (
          <Link
            to={calc.route as "/"}
            onClick={onOpen}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-heading font-semibold transition-all duration-200 hover:opacity-90 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="calculator.open_button"
          >
            Open Calculator
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="flex-1 py-2 px-3 rounded-lg text-xs font-heading font-semibold cursor-not-allowed"
            style={{
              background: "oklch(0.28 0.04 30)",
              color: "oklch(0.50 0.04 50)",
            }}
            data-ocid="calculator.open_button_disabled"
          >
            Coming Soon
          </button>
        )}
        <Link
          to="/calculator-faq/$calculatorId"
          params={{ calculatorId: calc.id }}
          className="py-2 px-3 rounded-lg text-xs font-heading font-medium transition-all duration-200 hover:bg-white/10"
          style={{
            color: "oklch(0.78 0.14 75)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
          data-ocid="calculator.faq_link"
        >
          FAQ
        </Link>
      </div>
    </div>
  );
}

export default function CalculatorIndex() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { items: favorites, toggle: toggleFavorite } =
    useLocalStorageSet(FAVORITES_KEY);
  const { items: recent, add: addRecent } = useLocalStorageSet(RECENT_KEY);

  const filtered = useMemo(() => {
    let list =
      activeTab === "all"
        ? calculators
        : calculators.filter((c) => c.category === activeTab);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.nameHindi.includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.includes(q),
      );
    }
    return list;
  }, [query, activeTab]);

  const favoriteCalcs = useMemo(
    () => calculators.filter((c) => favorites.includes(c.id)),
    [favorites],
  );

  const recentCalcs = useMemo(
    () =>
      recent
        .map((id) => calculators.find((c) => c.id === id))
        .filter(Boolean) as CalculatorEntry[],
    [recent],
  );

  const handleOpen = (calc: CalculatorEntry) => {
    if (!calc.isLive) return;
    addRecent(calc.id);
    void navigate({ to: calc.route as "/" });
  };

  const liveCount = calculators.filter((c) => c.isLive).length;

  const tabs: {
    value: TabType;
    label: string;
    labelHindi: string;
    count: number;
  }[] = [
    {
      value: "all",
      label: "All Calculators",
      labelHindi: "सभी",
      count: calculators.length,
    },
    {
      value: "astrology",
      label: "Astrology",
      labelHindi: "ज्योतिष",
      count: calculators.filter((c) => c.category === "astrology").length,
    },
    {
      value: "numerology",
      label: "Numerology",
      labelHindi: "अंक विज्ञान",
      count: calculators.filter((c) => c.category === "numerology").length,
    },
    {
      value: "love",
      label: "Love & Friendship",
      labelHindi: "प्रेम",
      count: calculators.filter((c) => c.category === "love").length,
    },
  ];

  useEffect(() => {
    document.title = "All Calculators — SpiritualConnect";
  }, []);

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.06 22) 0%, oklch(0.14 0.04 20) 100%)",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🔢 All Calculators
          </h1>
          <p
            className="font-body text-sm mb-1"
            style={{ color: "oklch(0.60 0.08 60)" }}
          >
            सभी कैलकुलेटर — ज्योतिष, अंक विज्ञान एवं प्रेम
          </p>
          <p
            className="font-body text-sm max-w-xl mx-auto"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            Discover your cosmic blueprint with {calculators.length} specialized
            tools — {liveCount} live now, more coming soon.
          </p>
        </div>

        {/* Search */}
        <div
          className="relative max-w-lg mx-auto mb-8"
          data-ocid="calculator.search"
        >
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
            style={{ color: "oklch(0.55 0.04 50)" }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators... (e.g. Nakshatra, Love, Dosha)"
            className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-body outline-none transition-all"
            style={{
              background: "oklch(0.22 0.06 25)",
              border: "1px solid oklch(0.78 0.14 75 / 0.20)",
              color: "oklch(0.88 0.04 75)",
            }}
            data-ocid="calculator.search_input"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-4 w-4" style={{ color: "oklch(0.55 0.04 50)" }} />
            </button>
          )}
        </div>

        {/* Favorites Strip */}
        {favoriteCalcs.length > 0 && (
          <div className="mb-8">
            <h2
              className="font-heading text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              <Heart
                className="h-4 w-4"
                style={{
                  color: "oklch(0.68 0.20 48)",
                  fill: "oklch(0.68 0.20 48)",
                }}
              />
              Favorites
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {favoriteCalcs.map((calc) => (
                <button
                  key={calc.id}
                  type="button"
                  onClick={() => handleOpen(calc)}
                  className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-medium transition-colors hover:bg-white/10"
                  style={{
                    background: "oklch(0.22 0.06 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                    color: "oklch(0.88 0.04 75)",
                  }}
                  data-ocid="calculator.favorite_chip"
                >
                  <span>{calc.icon}</span>
                  <span>{calc.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recently Used */}
        {recentCalcs.length > 0 && (
          <div className="mb-8">
            <h2
              className="font-heading text-sm font-semibold mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              <Star
                className="h-4 w-4"
                style={{ color: "oklch(0.68 0.20 48)" }}
              />
              Recently Used
            </h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recentCalcs.map((calc) => (
                <button
                  key={calc.id}
                  type="button"
                  onClick={() => handleOpen(calc)}
                  className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-heading font-medium transition-colors hover:bg-white/10"
                  style={{
                    background: "oklch(0.22 0.06 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                    color: "oklch(0.80 0.06 60)",
                  }}
                  data-ocid="calculator.recent_chip"
                >
                  <span>{calc.icon}</span>
                  <span>{calc.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div
          className="flex gap-2 mb-6 overflow-x-auto pb-1"
          data-ocid="calculator.category_tabs"
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all duration-200"
              style={{
                background:
                  activeTab === tab.value
                    ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                    : "oklch(0.22 0.06 25)",
                color:
                  activeTab === tab.value ? "white" : "oklch(0.70 0.06 60)",
                border: `1px solid ${activeTab === tab.value ? "transparent" : "oklch(0.78 0.14 75 / 0.18)"}`,
              }}
              data-ocid="calculator.tab"
            >
              {tab.label}
              <span
                className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                style={{
                  background:
                    activeTab === tab.value
                      ? "rgba(255,255,255,0.2)"
                      : "oklch(0.30 0.06 30)",
                  color:
                    activeTab === tab.value ? "white" : "oklch(0.60 0.06 60)",
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results count */}
        {query && (
          <p
            className="text-xs mb-4 font-body"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
            {query}"
          </p>
        )}

        {/* Live / Coming Soon split indicator */}
        {!query && activeTab === "all" && (
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-body"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                style={{ background: "oklch(0.68 0.20 48)" }}
              />
              {liveCount} live
            </span>
            <span
              className="text-xs font-body"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                style={{ background: "oklch(0.55 0.15 240 / 0.60)" }}
              />
              {calculators.length - liveCount} coming soon
            </span>
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((calc) => (
              <CalculatorCard
                key={calc.id}
                calc={calc}
                isFavorite={favorites.includes(calc.id)}
                onToggleFavorite={() => toggleFavorite(calc.id)}
                onOpen={() => handleOpen(calc)}
              />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-xl"
            style={{
              background: "oklch(0.22 0.06 25)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
            data-ocid="calculator.empty_state"
          >
            <p className="text-4xl mb-4">🔍</p>
            <p
              className="font-heading text-base font-semibold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              No calculators found
            </p>
            <p
              className="text-sm font-body"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              Try a different search term or browse by category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
