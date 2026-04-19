import { ChevronDown, ChevronRight, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";
import type { CalculatorFormData } from "../../types/calculator";

// ── Types ──────────────────────────────────────────────────────────────────

interface SunSignResult {
  westernSign: string;
  vedicSign: string;
  symbol: string;
  element: string;
  rulingPlanet: string;
  dateRange: string;
  positiveTraits: string[];
  negativeTraits: string[];
  description: string;
}

interface SignInfo {
  name: string;
  symbol: string;
  dates: string;
  element: string;
  rulingPlanet: string;
  positiveTraits: string[];
  negativeTraits: string[];
  description: string;
  emoji: string;
}

// ── Static Data ────────────────────────────────────────────────────────────

const SIGNS: SignInfo[] = [
  {
    name: "Aries",
    symbol: "♈",
    dates: "Mar 21 – Apr 19",
    element: "Fire",
    rulingPlanet: "Mars",
    emoji: "🐏",
    description:
      "Bold and ambitious, Aries dives headfirst into even the most challenging situations.",
    positiveTraits: ["Courageous", "Determined", "Confident", "Enthusiastic"],
    negativeTraits: ["Impatient", "Short-tempered", "Impulsive", "Aggressive"],
  },
  {
    name: "Taurus",
    symbol: "♉",
    dates: "Apr 20 – May 20",
    element: "Earth",
    rulingPlanet: "Venus",
    emoji: "🐂",
    description:
      "Reliable and practical, Taurus enjoys relaxing in serene, bucolic environments.",
    positiveTraits: ["Reliable", "Patient", "Practical", "Devoted"],
    negativeTraits: [
      "Stubborn",
      "Possessive",
      "Uncompromising",
      "Materialistic",
    ],
  },
  {
    name: "Gemini",
    symbol: "♊",
    dates: "May 21 – Jun 20",
    element: "Air",
    rulingPlanet: "Mercury",
    emoji: "👯",
    description:
      "Curious and adaptable, Gemini is spontaneous, playful, and adorably erratic.",
    positiveTraits: ["Adaptable", "Outgoing", "Intelligent", "Versatile"],
    negativeTraits: ["Indecisive", "Nervous", "Inconsistent", "Superficial"],
  },
  {
    name: "Cancer",
    symbol: "♋",
    dates: "Jun 21 – Jul 22",
    element: "Water",
    rulingPlanet: "Moon",
    emoji: "🦀",
    description:
      "Deeply intuitive and sentimental, Cancer can be one of the most challenging signs to know.",
    positiveTraits: ["Tenacious", "Loyal", "Empathetic", "Persuasive"],
    negativeTraits: ["Moody", "Pessimistic", "Suspicious", "Manipulative"],
  },
  {
    name: "Leo",
    symbol: "♌",
    dates: "Jul 23 – Aug 22",
    element: "Fire",
    rulingPlanet: "Sun",
    emoji: "🦁",
    description:
      "Creative, passionate and generous, Leo loves theatrical gestures and grand celebrations.",
    positiveTraits: ["Creative", "Passionate", "Generous", "Warm-hearted"],
    negativeTraits: ["Arrogant", "Stubborn", "Inflexible", "Self-centered"],
  },
  {
    name: "Virgo",
    symbol: "♍",
    dates: "Aug 23 – Sep 22",
    element: "Earth",
    rulingPlanet: "Mercury",
    emoji: "🌾",
    description:
      "Logical, practical and systematic in their approach to life, Virgo appreciates order.",
    positiveTraits: ["Loyal", "Analytical", "Kind", "Hardworking"],
    negativeTraits: ["Overly critical", "Worry-prone", "Stubborn", "Shy"],
  },
  {
    name: "Libra",
    symbol: "♎",
    dates: "Sep 23 – Oct 22",
    element: "Air",
    rulingPlanet: "Venus",
    emoji: "⚖️",
    description:
      "Peaceful and fair, Libra hates being alone and is happiest paired in a harmonious relationship.",
    positiveTraits: ["Cooperative", "Diplomatic", "Gracious", "Social"],
    negativeTraits: [
      "Indecisive",
      "Avoids confrontation",
      "Self-pitying",
      "Resentful",
    ],
  },
  {
    name: "Scorpio",
    symbol: "♏",
    dates: "Oct 23 – Nov 21",
    element: "Water",
    rulingPlanet: "Pluto",
    emoji: "🦂",
    description:
      "Brave, resourceful and passionate, Scorpio leads with emotional intelligence.",
    positiveTraits: [
      "Resourceful",
      "Brave",
      "Passionate",
      "Stubborn (in good way)",
    ],
    negativeTraits: ["Distrusting", "Jealous", "Secretive", "Violent"],
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    dates: "Nov 22 – Dec 21",
    element: "Fire",
    rulingPlanet: "Jupiter",
    emoji: "🏹",
    description:
      "Extroverted and optimistic, Sagittarius loves change and interaction with the world.",
    positiveTraits: ["Generous", "Idealistic", "Humorous", "Adventurous"],
    negativeTraits: ["Impatient", "Tactless", "Overconfident", "Careless"],
  },
  {
    name: "Capricorn",
    symbol: "♑",
    dates: "Dec 22 – Jan 19",
    element: "Earth",
    rulingPlanet: "Saturn",
    emoji: "🐐",
    description:
      "Responsible and disciplined, Capricorn excels at managing and organizing both time and people.",
    positiveTraits: ["Responsible", "Disciplined", "Self-control", "Ambitious"],
    negativeTraits: [
      "Know-it-all",
      "Unforgiving",
      "Condescending",
      "Pessimistic",
    ],
  },
  {
    name: "Aquarius",
    symbol: "♒",
    dates: "Jan 20 – Feb 18",
    element: "Air",
    rulingPlanet: "Uranus",
    emoji: "🏺",
    description:
      "Progressive and original, Aquarius isn't afraid to be different and embraces revolutionary ideas.",
    positiveTraits: ["Progressive", "Original", "Independent", "Humanitarian"],
    negativeTraits: ["Uncompromising", "Aloof", "Temperamental", "Detached"],
  },
  {
    name: "Pisces",
    symbol: "♓",
    dates: "Feb 19 – Mar 20",
    element: "Water",
    rulingPlanet: "Neptune",
    emoji: "🐟",
    description:
      "Intuitive, artistic and empathetic, Pisces is deeply connected to all creatures of the world.",
    positiveTraits: ["Compassionate", "Artistic", "Intuitive", "Wise"],
    negativeTraits: [
      "Fearful",
      "Overly trusting",
      "Sad",
      "Desire to escape reality",
    ],
  },
];

// Vedic offset: Vedic sun sign is ~23° behind Western (roughly one sign behind)
const VEDIC_OFFSET_MAP: Record<string, string> = {
  Aries: "Pisces",
  Taurus: "Aries",
  Gemini: "Taurus",
  Cancer: "Gemini",
  Leo: "Cancer",
  Virgo: "Leo",
  Libra: "Virgo",
  Scorpio: "Libra",
  Sagittarius: "Scorpio",
  Capricorn: "Sagittarius",
  Aquarius: "Capricorn",
  Pisces: "Aquarius",
};

const ELEMENT_COLORS: Record<string, string> = {
  Fire: "oklch(0.68 0.20 48)",
  Earth: "oklch(0.62 0.12 130)",
  Air: "oklch(0.70 0.10 220)",
  Water: "oklch(0.60 0.14 260)",
};

const DAYS = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => String(CURRENT_YEAR - i));
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const SECONDS = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

// ── Helpers ────────────────────────────────────────────────────────────────

function getWesternSign(day: number, month: number): SignInfo | null {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return SIGNS[0]; // Aries
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return SIGNS[1]; // Taurus
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return SIGNS[2]; // Gemini
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return SIGNS[3]; // Cancer
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return SIGNS[4]; // Leo
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return SIGNS[5]; // Virgo
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return SIGNS[6]; // Libra
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return SIGNS[7]; // Scorpio
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return SIGNS[8]; // Sagittarius
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return SIGNS[9]; // Capricorn
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return SIGNS[10]; // Aquarius
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
    return SIGNS[11]; // Pisces
  return null;
}

function calculateSunSign(form: CalculatorFormData): SunSignResult | null {
  const day = Number.parseInt(form.dob.day);
  const month = Number.parseInt(form.dob.month);
  if (!day || !month) return null;
  const western = getWesternSign(day, month);
  if (!western) return null;
  const vedicName = VEDIC_OFFSET_MAP[western.name] ?? western.name;
  return {
    westernSign: western.name,
    vedicSign: vedicName,
    symbol: western.symbol,
    element: western.element,
    rulingPlanet: western.rulingPlanet,
    dateRange: western.dates,
    positiveTraits: western.positiveTraits,
    negativeTraits: western.negativeTraits,
    description: western.description,
  };
}

// ── Sub-components ─────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-heading font-semibold uppercase tracking-wider"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none appearance-none cursor-pointer"
        style={{
          background: "oklch(0.20 0.05 24)",
          border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          color: value ? "oklch(0.88 0.04 75)" : "oklch(0.50 0.04 50)",
        }}
        data-ocid={`sun-sign.${id}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultCard({
  result,
  name,
  onExportPdf,
}: { result: SunSignResult; name: string; onExportPdf: () => void }) {
  const elementColor = ELEMENT_COLORS[result.element] ?? "oklch(0.68 0.20 48)";
  return (
    <div
      id="sun-sign-results"
      className="rounded-2xl border p-6 mt-6 space-y-5"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.07 28) 0%, oklch(0.20 0.06 24) 100%)",
        borderColor: "oklch(0.78 0.14 75 / 0.30)",
      }}
      data-ocid="sun-sign.result_card"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
          style={{ background: "oklch(0.68 0.20 48 / 0.15)" }}
        >
          {SIGNS.find((s) => s.name === result.westernSign)?.emoji ??
            result.symbol}
        </div>
        <div>
          <p
            className="text-xs font-body mb-0.5"
            style={{ color: "oklch(0.60 0.06 55)" }}
          >
            {name}'s Sun Sign
          </p>
          <h3
            className="font-heading text-2xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {result.westernSign} {result.symbol}
          </h3>
          <p
            className="text-sm font-body mt-0.5"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            {result.dateRange}
          </p>
        </div>
      </div>

      {/* Signs Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-xl p-3"
          style={{ background: "oklch(0.18 0.05 24)" }}
        >
          <p
            className="text-xs font-body mb-1"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            Western Sun Sign
          </p>
          <p
            className="font-heading font-semibold text-sm"
            style={{ color: "oklch(0.88 0.04 75)" }}
          >
            {result.westernSign} {result.symbol}
          </p>
        </div>
        <div
          className="rounded-xl p-3"
          style={{ background: "oklch(0.18 0.05 24)" }}
        >
          <p
            className="text-xs font-body mb-1"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            Vedic Sun Sign
          </p>
          <p
            className="font-heading font-semibold text-sm"
            style={{ color: "oklch(0.88 0.04 75)" }}
          >
            {result.vedicSign}
          </p>
        </div>
        <div
          className="rounded-xl p-3"
          style={{ background: "oklch(0.18 0.05 24)" }}
        >
          <p
            className="text-xs font-body mb-1"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            Element
          </p>
          <p
            className="font-heading font-semibold text-sm"
            style={{ color: elementColor }}
          >
            {result.element}
          </p>
        </div>
        <div
          className="rounded-xl p-3"
          style={{ background: "oklch(0.18 0.05 24)" }}
        >
          <p
            className="text-xs font-body mb-1"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            Ruling Planet
          </p>
          <p
            className="font-heading font-semibold text-sm"
            style={{ color: "oklch(0.88 0.04 75)" }}
          >
            {result.rulingPlanet}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-sm font-body leading-relaxed"
        style={{ color: "oklch(0.72 0.04 60)" }}
      >
        {result.description}
      </p>

      {/* Traits */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p
            className="text-xs font-heading font-semibold uppercase tracking-wider mb-2"
            style={{ color: "oklch(0.65 0.15 140)" }}
          >
            Positive Traits
          </p>
          <ul className="space-y-1">
            {result.positiveTraits.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-sm font-body"
                style={{ color: "oklch(0.78 0.04 65)" }}
              >
                <span style={{ color: "oklch(0.65 0.15 140)" }}>✦</span> {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p
            className="text-xs font-heading font-semibold uppercase tracking-wider mb-2"
            style={{ color: "oklch(0.62 0.18 30)" }}
          >
            Negative Traits
          </p>
          <ul className="space-y-1">
            {result.negativeTraits.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-sm font-body"
                style={{ color: "oklch(0.78 0.04 65)" }}
              >
                <span style={{ color: "oklch(0.62 0.18 30)" }}>✦</span> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-3 flex-wrap pt-1">
        <a
          href="/astrologer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all hover:opacity-90"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
          }}
          data-ocid="sun-sign.talk_to_astrologer"
        >
          <Phone className="h-4 w-4" />
          Talk to Astrologer
        </a>
        <a
          href="/astrologer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all hover:opacity-90"
          style={{
            background: "oklch(0.68 0.20 48 / 0.12)",
            color: "oklch(0.78 0.14 75)",
            border: "1px solid oklch(0.78 0.14 75 / 0.30)",
          }}
          data-ocid="sun-sign.chat_with_astrologer"
        >
          <MessageCircle className="h-4 w-4" />
          Chat with Astrologer
        </a>
        <button
          type="button"
          onClick={onExportPdf}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all hover:opacity-90"
          style={{ background: "oklch(0.78 0.14 75)", color: "#1a0a00" }}
          data-ocid="sun-sign.export_pdf_button"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}

function SignCard({ sign }: { sign: SignInfo }) {
  const [expanded, setExpanded] = useState(false);
  const elementColor = ELEMENT_COLORS[sign.element] ?? "oklch(0.68 0.20 48)";
  return (
    <div
      className="rounded-xl border transition-all duration-200"
      style={{
        background: expanded ? "oklch(0.24 0.06 26)" : "oklch(0.20 0.05 24)",
        borderColor: expanded
          ? "oklch(0.78 0.14 75 / 0.28)"
          : "oklch(0.78 0.14 75 / 0.12)",
      }}
      data-ocid="sun-sign.sign_card"
    >
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-3 p-4 text-left"
        aria-expanded={expanded}
      >
        <span className="text-2xl flex-shrink-0">{sign.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-heading font-bold text-sm"
              style={{ color: "oklch(0.88 0.04 75)" }}
            >
              {sign.symbol} {sign.name}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-heading"
              style={{
                background: `${elementColor}20`,
                color: elementColor,
              }}
            >
              {sign.element}
            </span>
          </div>
          <p
            className="text-xs font-body mt-0.5"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            {sign.dates} · {sign.rulingPlanet}
          </p>
        </div>
        {expanded ? (
          <ChevronDown
            className="h-4 w-4 flex-shrink-0"
            style={{ color: "oklch(0.78 0.14 75)" }}
          />
        ) : (
          <ChevronRight
            className="h-4 w-4 flex-shrink-0"
            style={{ color: "oklch(0.45 0.04 50)" }}
          />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            {sign.description}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div
              className="rounded-lg p-3"
              style={{ background: "oklch(0.18 0.05 24)" }}
            >
              <p
                className="text-xs font-heading font-semibold mb-2 uppercase tracking-wide"
                style={{ color: "oklch(0.65 0.15 140)" }}
              >
                Positive Traits
              </p>
              <ul className="space-y-1">
                {sign.positiveTraits.map((t) => (
                  <li
                    key={t}
                    className="text-xs font-body flex items-center gap-1.5"
                    style={{ color: "oklch(0.75 0.04 65)" }}
                  >
                    <span style={{ color: "oklch(0.65 0.15 140)" }}>✦</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-lg p-3"
              style={{ background: "oklch(0.18 0.05 24)" }}
            >
              <p
                className="text-xs font-heading font-semibold mb-2 uppercase tracking-wide"
                style={{ color: "oklch(0.62 0.18 30)" }}
              >
                Negative Traits
              </p>
              <ul className="space-y-1">
                {sign.negativeTraits.map((t) => (
                  <li
                    key={t}
                    className="text-xs font-body flex items-center gap-1.5"
                    style={{ color: "oklch(0.75 0.04 65)" }}
                  >
                    <span style={{ color: "oklch(0.62 0.18 30)" }}>✦</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FAQItem({
  q,
  a,
  index,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl border transition-all duration-200 overflow-hidden"
      style={{
        background: isOpen ? "oklch(0.24 0.06 26)" : "oklch(0.20 0.05 24)",
        borderColor: isOpen
          ? "oklch(0.78 0.14 75 / 0.30)"
          : "oklch(0.78 0.14 75 / 0.12)",
      }}
      data-ocid="sun-sign.faq_item"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-4 text-left"
        aria-expanded={isOpen}
        data-ocid="sun-sign.faq_toggle"
      >
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
          style={{
            background: "oklch(0.68 0.20 48 / 0.15)",
            color: "oklch(0.78 0.14 75)",
          }}
        >
          {index + 1}
        </span>
        <p
          className="flex-1 text-sm font-heading font-medium leading-snug pr-2"
          style={{ color: "oklch(0.88 0.04 75)" }}
        >
          {q}
        </p>
        {isOpen ? (
          <ChevronDown
            className="flex-shrink-0 h-4 w-4 mt-0.5"
            style={{ color: "oklch(0.78 0.14 75)" }}
          />
        ) : (
          <ChevronRight
            className="flex-shrink-0 h-4 w-4 mt-0.5"
            style={{ color: "oklch(0.55 0.04 50)" }}
          />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pl-[52px]">
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.72 0.04 60)" }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

function InfoSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2
        className="font-heading text-xl font-bold"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function SunSignCalculator() {
  const [form, setForm] = useState<CalculatorFormData>({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    tob: { hour: "", minute: "", second: "", unknown: false },
    placeOfBirth: "",
  });
  const [result, setResult] = useState<SunSignResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { exportToPdf } = usePdfExport();

  const setDob = (field: keyof CalculatorFormData["dob"], val: string) =>
    setForm((p) => ({ ...p, dob: { ...p.dob, [field]: val } }));
  const setTob = (
    field: keyof CalculatorFormData["tob"],
    val: string | boolean,
  ) => setForm((p) => ({ ...p, tob: { ...p.tob, [field]: val } }));

  const handleCalculate = () => {
    const res = calculateSunSign(form);
    setResult(res);
  };

  const faqs = [
    {
      q: "Can sun sign help choose a career?",
      a: "Yes, your sun sign can offer valuable insights into your natural strengths and working style. For example, detail-oriented Virgo and analytical Capricorn often excel in structured roles, while creative Gemini and imaginative Pisces thrive in artistic or communication fields. Use it as a self-awareness tool alongside practical skills and interests.",
    },
    {
      q: "Are certain signs more compatible with each other?",
      a: "Traditionally, signs of the same element tend to harmonize — Fire with Fire (Aries, Leo, Sagittarius), Earth with Earth, and so on. Air signs tend to bond well with Fire signs, while Water signs connect with Earth signs. However, true compatibility depends on the entire birth chart, not just the sun sign.",
    },
    {
      q: "How does sun sign affect family relationships?",
      a: "Your sun sign reflects your core identity and communication style, which directly impacts how you relate to family members. A Leo might be the natural leader in the family, while a Cancer nurtures and protects. Understanding your family members' sun signs can bring empathy and reduce conflicts by revealing why each person reacts differently.",
    },
    {
      q: "Can knowing someone's sun sign help understand their love behavior?",
      a: "Absolutely! Sun signs reveal fundamental personality traits that show up in romantic relationships. Scorpios tend to be intensely loyal and passionate but can be jealous. Libras seek balance and harmony in partnerships. While sun signs give a useful starting point, deeper compatibility analysis through the Venus and Moon signs provides richer insight into love behavior.",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.06 22) 0%, oklch(0.14 0.04 20) 100%)",
      }}
    >
      <div className="container mx-auto max-w-3xl px-4 py-10 space-y-12">
        {/* ── Page Header ── */}
        <div
          className="text-center space-y-3"
          data-ocid="sun-sign-calculator-page"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-heading font-semibold uppercase tracking-wider mb-2"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              color: "oklch(0.78 0.14 75)",
              border: "1px solid oklch(0.78 0.14 75 / 0.20)",
            }}
          >
            ☀️ Sun Sign Calculator
          </div>
          <h1
            className="font-heading text-3xl sm:text-4xl font-bold leading-tight"
            style={{ color: "oklch(0.92 0.04 80)" }}
          >
            Free Sun Sign Calculator
          </h1>
          <p
            className="text-sm font-body leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            Discover your Western and Vedic Sun Sign based on your date of
            birth. Understand your core personality, strengths, and the cosmic
            energy that drives you.
          </p>
        </div>

        {/* ── Calculator Form ── */}
        <div
          className="rounded-2xl border p-6 space-y-5"
          style={{
            background: "oklch(0.22 0.06 25)",
            borderColor: "oklch(0.78 0.14 75 / 0.20)",
          }}
        >
          <h2
            className="font-heading text-lg font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Calculate Your Sun Sign
          </h2>

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="sun-name"
              className="text-xs font-heading font-semibold uppercase tracking-wider"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Name *
            </label>
            <input
              id="sun-name"
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Enter your full name"
              className="w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none"
              style={{
                background: "oklch(0.20 0.05 24)",
                border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                color: "oklch(0.88 0.04 75)",
              }}
              data-ocid="sun-sign.name_input"
            />
          </div>

          {/* Gender */}
          <SelectField
            label="Gender *"
            id="gender"
            value={form.gender}
            onChange={(v) => setForm((p) => ({ ...p, gender: v }))}
            placeholder="Select Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />

          {/* Date of Birth */}
          <div className="flex flex-col gap-1.5">
            <span
              className="text-xs font-heading font-semibold uppercase tracking-wider"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Date of Birth *
            </span>
            <div className="grid grid-cols-3 gap-3">
              <SelectField
                label=""
                id="dob-day"
                value={form.dob.day}
                onChange={(v) => setDob("day", v)}
                placeholder="Day"
                options={DAYS.map((d) => ({ value: d, label: d }))}
              />
              <SelectField
                label=""
                id="dob-month"
                value={form.dob.month}
                onChange={(v) => setDob("month", v)}
                placeholder="Month"
                options={MONTHS}
              />
              <SelectField
                label=""
                id="dob-year"
                value={form.dob.year}
                onChange={(v) => setDob("year", v)}
                placeholder="Year"
                options={YEARS.map((y) => ({ value: y, label: y }))}
              />
            </div>
          </div>

          {/* Time of Birth */}
          <div className="flex flex-col gap-2">
            <span
              className="text-xs font-heading font-semibold uppercase tracking-wider"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Time of Birth
            </span>
            <label
              className="flex items-center gap-2 cursor-pointer w-fit"
              data-ocid="sun-sign.tob_unknown_toggle"
            >
              <input
                type="checkbox"
                checked={form.tob.unknown}
                onChange={(e) => setTob("unknown", e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500"
              />
              <span
                className="text-sm font-body"
                style={{ color: "oklch(0.65 0.06 60)" }}
              >
                I don't know my time of birth
              </span>
            </label>
            {!form.tob.unknown && (
              <div className="grid grid-cols-3 gap-3">
                <SelectField
                  label=""
                  id="tob-hour"
                  value={form.tob.hour}
                  onChange={(v) => setTob("hour", v)}
                  placeholder="Hour"
                  options={HOURS.map((h) => ({ value: h, label: h }))}
                />
                <SelectField
                  label=""
                  id="tob-minute"
                  value={form.tob.minute}
                  onChange={(v) => setTob("minute", v)}
                  placeholder="Minute"
                  options={MINUTES.map((m) => ({ value: m, label: m }))}
                />
                <SelectField
                  label=""
                  id="tob-second"
                  value={form.tob.second}
                  onChange={(v) => setTob("second", v)}
                  placeholder="Second"
                  options={SECONDS.map((s) => ({ value: s, label: s }))}
                />
              </div>
            )}
          </div>

          {/* Place of Birth */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="sun-place"
              className="text-xs font-heading font-semibold uppercase tracking-wider"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Place of Birth *
            </label>
            <input
              id="sun-place"
              type="text"
              value={form.placeOfBirth}
              onChange={(e) =>
                setForm((p) => ({ ...p, placeOfBirth: e.target.value }))
              }
              placeholder="Enter your birth place"
              className="w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none"
              style={{
                background: "oklch(0.20 0.05 24)",
                border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                color: "oklch(0.88 0.04 75)",
              }}
              data-ocid="sun-sign.place_input"
            />
          </div>

          {/* Calculate Button */}
          <button
            type="button"
            onClick={handleCalculate}
            className="w-full py-3 rounded-xl font-heading font-bold text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="sun-sign.calculate_btn"
          >
            ☀️ Calculate My Sun Sign
          </button>

          {/* Inline Result */}
          {result && (
            <ResultCard
              result={result}
              name={form.name || "Your"}
              onExportPdf={() =>
                exportToPdf(
                  "sun-sign-results",
                  "sun-sign-calculator-result",
                  "Sun Sign Calculator Result",
                )
              }
            />
          )}
        </div>

        {/* ── Informational Sections ── */}
        <InfoSection title="How Does a Sun Sign Calculator Work?">
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            A Sun Sign Calculator determines your zodiac sign based on the
            position of the Sun at your birth. The Sun takes approximately one
            month to transit through each of the 12 zodiac signs, completing a
            full cycle in a year. By entering your birth date, the calculator
            identifies which sign the Sun occupied, revealing your Western Sun
            Sign.
          </p>
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            For the Vedic (Sidereal) Sun Sign, the calculator applies a
            correction called the Ayanamsa — approximately 23°. This accounts
            for the precession of the Earth's axis, shifting your Vedic sign
            roughly one sign earlier than the Western sign. Both systems offer
            valuable but different perspectives on your solar nature.
          </p>
        </InfoSection>

        <InfoSection title="What is a Sun Sign?">
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            Your Sun Sign is the zodiac constellation the Sun was passing
            through at the moment of your birth. It's the most widely recognized
            element in astrology — the sign people are typically referring to
            when they say "I'm a Scorpio" or "She's a Gemini." The Sun
            represents your core identity, your conscious ego, and the essence
            of who you are.
          </p>
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            While your full birth chart includes positions of the Moon, planets,
            and rising sign — each adding layers of complexity — the Sun Sign is
            the foundation. It governs your vitality, your creative expression,
            and the journey toward your highest self.
          </p>
        </InfoSection>

        <InfoSection title="Why is Your Sun Sign Important?">
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            Your Sun Sign illuminates the path you're meant to walk in this
            lifetime. It's not about predicting the future — it's about
            understanding your strengths, blind spots, and the lessons you're
            here to learn. Take Rahul, an Aries from Pune. He always found
            himself leading group projects naturally, thriving on challenges
            others found stressful. Once he understood that Aries is ruled by
            Mars and thrives on initiative, he stopped apologizing for his
            boldness and channeled it into building his own startup.
          </p>
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            Knowing your Sun Sign helps you make better decisions in
            relationships, career, and personal growth. It validates patterns
            you've noticed in yourself and others, and provides a language for
            understanding human behavior through a cosmic lens.
          </p>
        </InfoSection>

        <InfoSection title="How to Find Your Sun Sign">
          <div
            className="rounded-xl p-5 space-y-3"
            style={{
              background: "oklch(0.20 0.05 24)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            {[
              {
                step: "1",
                text: "Know your exact birth date (day, month, year).",
              },
              {
                step: "2",
                text: "Identify which zodiac date range includes your birthday.",
              },
              {
                step: "3",
                text: "If born on a cusp (sign boundary dates), birth time helps determine the exact sign.",
              },
              {
                step: "4",
                text: "Use this calculator above for both Western and Vedic Sun Sign results instantly.",
              },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.18)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                >
                  {step}
                </span>
                <p
                  className="text-sm font-body"
                  style={{ color: "oklch(0.75 0.04 65)" }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </InfoSection>

        {/* ── 12 Signs Section ── */}
        <InfoSection title="What are the 12 Sun Signs in Astrology?">
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            The zodiac consists of 12 signs, each with unique characteristics,
            strengths, and challenges. Click on any sign to explore its traits
            in detail.
          </p>
          <div className="space-y-2 mt-2">
            {SIGNS.map((sign) => (
              <SignCard key={sign.name} sign={sign} />
            ))}
          </div>
        </InfoSection>

        {/* ── Born on a Cusp ── */}
        <InfoSection title="Born on a Cusp?">
          <div
            className="rounded-xl p-5"
            style={{
              background: "oklch(0.20 0.05 24)",
              border: "1px solid oklch(0.68 0.20 48 / 0.20)",
            }}
          >
            <p
              className="text-sm font-body leading-relaxed"
              style={{ color: "oklch(0.72 0.04 60)" }}
            >
              Being born "on a cusp" means your birthday falls within two to
              three days of the Sun moving from one zodiac sign to the next. For
              example, if you were born on April 19–21, you might be right at
              the transition between Aries and Taurus. In these cases, the Sun's
              exact position at your birth time determines your true sign —
              which is why birth time matters.
            </p>
            <p
              className="text-sm font-body leading-relaxed mt-3"
              style={{ color: "oklch(0.72 0.04 60)" }}
            >
              People born on a cusp often feel they identify with traits of both
              adjacent signs. Astrologers note that you can only truly belong to
              one sign — but the energy of the neighboring sign's final or first
              degrees can subtly influence your personality. An astrologer can
              help you determine your true Sun Sign if you were born on a cusp
              day.
            </p>
          </div>
        </InfoSection>

        {/* ── Conclusion ── */}
        <InfoSection title="Conclusion">
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            Your Sun Sign is more than a fun personality label — it's a window
            into your soul's mission for this lifetime. Understanding whether
            you're a fiery Aries charging ahead or a thoughtful Virgo analyzing
            every detail can transform how you see yourself and interact with
            others. Both Western and Vedic astrology offer rich, complementary
            perspectives on your solar energy.
          </p>
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            While this calculator gives you a powerful starting point, a full
            birth chart reading with an experienced astrologer on Spiritual
            Connect can unlock deeper dimensions — including how your Sun
            interacts with your Moon, Rising sign, and planets to create the
            unique cosmic fingerprint that is you.
          </p>
        </InfoSection>

        {/* ── Discover More ── */}
        <div
          className="rounded-2xl border p-6 space-y-4"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.07 28), oklch(0.20 0.06 24))",
            borderColor: "oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          <h2
            className="font-heading text-xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Discover More About Yourself
          </h2>
          <p
            className="text-sm font-body"
            style={{ color: "oklch(0.68 0.04 58)" }}
          >
            Ready to unlock deeper insights? Explore our personalized
            calculators that reveal hidden aspects of your personality and
            destiny.
          </p>
          <div
            className="rounded-xl p-4"
            style={{
              background: "oklch(0.18 0.05 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.12)",
            }}
          >
            <p
              className="font-heading font-semibold text-sm mb-1"
              style={{ color: "oklch(0.82 0.06 70)" }}
            >
              Spiritual Connect Store
            </p>
            <p
              className="text-xs font-body leading-relaxed"
              style={{ color: "oklch(0.60 0.04 55)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting &
              decor, Pooja essentials, love items, and zodiac collection to
              support your spiritual journey.
            </p>
            <p
              className="text-xs font-heading font-semibold mt-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              ✨ Plus Much More
            </p>
            <p
              className="text-xs font-body mt-0.5"
              style={{ color: "oklch(0.55 0.04 50)" }}
            >
              Compatibility calculators, birth chart generators, and personality
              assessments await your discovery.
            </p>
          </div>
          <a
            href="/calculator-index"
            className="inline-block px-6 py-2.5 rounded-xl text-sm font-heading font-bold transition-all hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="sun-sign.explore_calculators"
          >
            Explore All Calculators →
          </a>
        </div>

        {/* ── FAQs ── */}
        <section className="space-y-4">
          <h2
            className="font-heading text-xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3" data-ocid="sun-sign.faqs">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                index={idx}
                isOpen={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
