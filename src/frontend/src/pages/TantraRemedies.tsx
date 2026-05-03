import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookOpen,
  ChevronRight,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  TANTRA_PROBLEMS,
  type TantraProblem,
  type TantraRemedy,
} from "../data/tantraData";

// ─── Sub-components ───────────────────────────────────────────────────────────

const REMEDY_ICONS: Record<TantraRemedy["type"], string> = {
  Mantra: "🔔",
  Yantra: "🔯",
  Ritual: "🪔",
  Gemstone: "💎",
};

const REMEDY_COLORS: Record<TantraRemedy["type"], string> = {
  Mantra: "oklch(0.55 0.18 220)",
  Yantra: "oklch(0.55 0.18 280)",
  Ritual: "oklch(0.68 0.20 48)",
  Gemstone: "oklch(0.55 0.18 160)",
};

function RemedyBadge({ type }: { type: TantraRemedy["type"] }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium"
      style={{
        background: `${REMEDY_COLORS[type]}22`,
        color: REMEDY_COLORS[type],
        border: `1px solid ${REMEDY_COLORS[type]}44`,
      }}
    >
      {REMEDY_ICONS[type]} {type}
    </span>
  );
}

function ProblemCard({
  problem,
  index,
}: { problem: TantraProblem; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const colorMap: Record<string, { bg: string; accent: string }> = {
    red: { bg: "oklch(0.30 0.08 20)", accent: "oklch(0.65 0.20 20)" },
    amber: { bg: "oklch(0.28 0.08 48)", accent: "oklch(0.72 0.18 55)" },
    blue: { bg: "oklch(0.25 0.08 230)", accent: "oklch(0.60 0.15 230)" },
    purple: { bg: "oklch(0.25 0.08 280)", accent: "oklch(0.60 0.15 280)" },
    slate: { bg: "oklch(0.25 0.04 250)", accent: "oklch(0.60 0.08 250)" },
    green: { bg: "oklch(0.25 0.08 160)", accent: "oklch(0.60 0.18 160)" },
    orange: { bg: "oklch(0.28 0.10 35)", accent: "oklch(0.68 0.18 35)" },
  };

  const colors = colorMap[problem.color] ?? colorMap.amber;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      data-ocid={`tantra.item.${index + 1}`}
      style={{
        background: "oklch(0.22 0.06 25)",
        border: "1px solid oklch(0.32 0.08 48 / 0.3)",
        boxShadow: "0 2px 12px oklch(0.10 0.04 20 / 0.3)",
      }}
    >
      {/* Header */}
      <button
        type="button"
        className="w-full p-4 flex items-start justify-between gap-3 cursor-pointer text-left"
        style={{ background: `${colors.bg}88` }}
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setExpanded(!expanded);
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl">{problem.emoji}</span>
          <div className="min-w-0">
            <h3
              className="font-bold text-sm truncate"
              style={{ color: colors.accent }}
            >
              {problem.name}
            </h3>
            <p className="text-xs" style={{ color: "oklch(0.60 0.05 60)" }}>
              {problem.nameHindi} • {problem.category}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {problem.expert_consultation_recommended && (
            <Badge
              className="text-xs hidden sm:flex"
              style={{
                background: "oklch(0.68 0.20 48 / 0.15)",
                color: "oklch(0.75 0.16 48)",
                border: "none",
              }}
            >
              Expert Advised
            </Badge>
          )}
          <ChevronRight
            className="h-4 w-4 transition-transform"
            style={{
              color: colors.accent,
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          />
        </div>
      </button>

      {/* Collapsed preview */}
      {!expanded && (
        <div className="px-4 py-3">
          <p
            className="text-xs line-clamp-2"
            style={{ color: "oklch(0.65 0.04 65)" }}
          >
            {problem.overview}
          </p>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-2 text-xs font-medium"
            style={{ color: colors.accent }}
            data-ocid={`tantra.expand_button.${index + 1}`}
          >
            View signs & remedies →
          </button>
        </div>
      )}

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Ethical note */}
          <div
            className="rounded-lg p-3 flex gap-2"
            style={{
              background: "oklch(0.28 0.10 55 / 0.3)",
              border: "1px solid oklch(0.68 0.18 55 / 0.3)",
            }}
          >
            <AlertTriangle
              className="h-4 w-4 shrink-0 mt-0.5"
              style={{ color: "oklch(0.78 0.18 55)" }}
            />
            <p
              className="text-xs leading-relaxed"
              style={{ color: "oklch(0.80 0.08 65)" }}
            >
              {problem.ethical_note}
            </p>
          </div>

          {/* Overview */}
          <div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.72 0.04 65)" }}
            >
              {problem.overview}
            </p>
          </div>

          {/* Signs */}
          <div>
            <h4
              className="font-bold text-xs uppercase tracking-wider mb-2"
              style={{ color: colors.accent }}
            >
              ⚠️ Signs & Symptoms
            </h4>
            <ul className="space-y-1.5">
              {problem.signs.map((sign) => (
                <li
                  key={sign}
                  className="flex items-start gap-2 text-xs"
                  style={{ color: "oklch(0.72 0.04 65)" }}
                >
                  <span
                    className="mt-0.5 shrink-0"
                    style={{ color: colors.accent }}
                  >
                    •
                  </span>
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          {/* Remedies */}
          <div>
            <h4
              className="font-bold text-xs uppercase tracking-wider mb-2"
              style={{ color: colors.accent }}
            >
              ✨ Remedies & Solutions
            </h4>
            <div className="space-y-2.5">
              {problem.remedies.map((remedy) => (
                <div
                  key={remedy.description.slice(0, 30)}
                  className="rounded-xl p-3"
                  style={{
                    background: "oklch(0.19 0.05 22)",
                    border: "1px solid oklch(0.30 0.06 30 / 0.4)",
                  }}
                >
                  <RemedyBadge type={remedy.type} />
                  <p
                    className="text-xs mt-1.5 leading-relaxed"
                    style={{ color: "oklch(0.70 0.04 65)" }}
                  >
                    {remedy.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {problem.expert_consultation_recommended && (
            <Link
              to="/astrologer"
              data-ocid={`tantra.consult_button.${index + 1}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-sm font-bold transition-all"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              <Users className="h-4 w-4" />
              Consult an Expert Astrologer
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const CATEGORY_FILTERS = [
  "All",
  "Negative Energy",
  "Energy Imbalance",
  "Space Energy",
  "Spiritual Interference",
  "Astrological Obstacle",
  "Birth Chart Dosha",
  "Karmic Debt",
  "Marriage Dosha",
  "Ancestral Karma",
  "Planetary Transit",
  "Ethical Education",
];

export default function TantraRemedies() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? TANTRA_PROBLEMS
      : TANTRA_PROBLEMS.filter((p) => p.category === activeCategory);

  return (
    <div data-ocid="tantra.page">
      {/* Hero */}
      <div
        className="relative w-full py-16 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 30), oklch(0.16 0.06 20), oklch(0.20 0.10 45))",
        }}
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🕯️</div>
          <h1
            className="font-decorative text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Tantra & Spiritual Remedies
          </h1>
          <p
            className="text-base mb-2"
            style={{ color: "oklch(0.75 0.06 70)" }}
          >
            तंत्र दोष निवारण — Educational Guide to Spiritual Protection
          </p>
          <p className="text-sm mb-6" style={{ color: "oklch(0.60 0.05 60)" }}>
            Ancient knowledge of doshas, their signs, and dharmic remedies — for
            awareness & protection
          </p>
          <Link
            to="/astrologer"
            data-ocid="tantra.hero_consult_cta"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            🧘 Consult a Verified Astrologer
          </Link>
        </div>
      </div>

      {/* Disclaimer banner */}
      <div
        className="px-4 py-3"
        style={{
          background: "oklch(0.28 0.10 55 / 0.4)",
          borderBottom: "1px solid oklch(0.68 0.18 55 / 0.3)",
        }}
      >
        <div className="container mx-auto flex items-start gap-3">
          <Shield
            className="h-4 w-4 shrink-0 mt-0.5"
            style={{ color: "oklch(0.78 0.18 55)" }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{ color: "oklch(0.82 0.06 70)" }}
          >
            <strong style={{ color: "oklch(0.88 0.14 60)" }}>
              Educational Disclaimer:
            </strong>{" "}
            This information is for educational purposes only. Always consult a
            qualified spiritual advisor before following any remedy. Spiritual
            problems may overlap with medical or psychological issues — seek
            professional help when needed.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "📚", label: "Problem Categories", value: "12" },
            { icon: "🔔", label: "Mantra Remedies", value: "20+" },
            { icon: "🔯", label: "Yantra Solutions", value: "15+" },
            { icon: "🪔", label: "Ritual Practices", value: "25+" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4 text-center"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.30 0.06 30 / 0.4)",
              }}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div
                className="font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {s.value}
              </div>
              <div className="text-xs" style={{ color: "oklch(0.55 0.05 60)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Category filter */}
        <div className="mb-6" data-ocid="tantra.category_filters">
          <h2
            className="font-bold text-sm mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                type="button"
                key={cat}
                data-ocid={`tantra.filter_${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={
                  activeCategory === cat
                    ? { background: "oklch(0.68 0.20 48)", color: "white" }
                    : {
                        background: "oklch(0.22 0.06 25)",
                        color: "oklch(0.70 0.06 65)",
                        border: "1px solid oklch(0.35 0.06 30 / 0.5)",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          data-ocid="tantra.grid"
        >
          {filtered.map((problem, idx) => (
            <ProblemCard key={problem.id} problem={problem} index={idx} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 30), oklch(0.22 0.08 48))",
            border: "1px solid oklch(0.40 0.12 48 / 0.4)",
          }}
        >
          <BookOpen
            className="h-8 w-8 mx-auto mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          />
          <h3
            className="font-bold text-lg mb-2"
            style={{ color: "oklch(0.88 0.10 75)" }}
          >
            Need Personalized Guidance?
          </h3>
          <p className="text-sm mb-5" style={{ color: "oklch(0.65 0.05 65)" }}>
            Connect with verified astrologers who specialize in dosh nivaran,
            remedies, and spiritual counseling.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/astrologer"
              data-ocid="tantra.bottom_consult_cta"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              <Star className="h-4 w-4" />
              Consult Expert Astrologer
            </Link>
            <Link
              to="/yantras"
              data-ocid="tantra.yantra_link"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm"
              style={{
                background: "oklch(0.22 0.06 25)",
                color: "oklch(0.78 0.14 75)",
                border: "1px solid oklch(0.40 0.08 48 / 0.5)",
              }}
            >
              🔯 Yantra Library
            </Link>
            <Link
              to="/kavach"
              data-ocid="tantra.kavach_link"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm"
              style={{
                background: "oklch(0.22 0.06 25)",
                color: "oklch(0.78 0.14 75)",
                border: "1px solid oklch(0.40 0.08 48 / 0.5)",
              }}
            >
              🛡️ Kavach Library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
