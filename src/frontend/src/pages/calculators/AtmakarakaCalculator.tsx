import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePdfExport } from "../../hooks/usePdfExport";
import { t } from "../../utils/translations";

// ─── Planet data ───────────────────────────────────────────────────────────────
const PLANETS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
] as const;
type Planet = (typeof PLANETS)[number];

const ATMAKARAKA_MEANINGS: Record<Planet, { purpose: string; career: string }> =
  {
    Sun: {
      purpose:
        "Your soul's purpose is leadership, self-expression, and authentic authority. You are here to shine your light and inspire others.",
      career:
        "You thrive in leadership roles, government, management, and any field where you can express your individuality and guide others.",
    },
    Moon: {
      purpose:
        "Your soul's journey focuses on emotional intelligence, nurturing, and creating a safe haven for those you love.",
      career:
        "You find fulfillment in caregiving, counseling, teaching, healthcare, and roles that involve supporting and nurturing communities.",
    },
    Mars: {
      purpose:
        "Your soul is driven by courage, action, and purposeful change. You are here to lead boldly and fight for what matters.",
      career:
        "You excel in entrepreneurship, sports, military, engineering, and fields requiring initiative, energy, and decisive action.",
    },
    Mercury: {
      purpose:
        "Your soul's path is communication, learning, and sharing knowledge. You are a natural teacher and bridge-builder.",
      career:
        "Writing, teaching, technology, business, media, and communication-based fields align naturally with your soul's energy.",
    },
    Jupiter: {
      purpose:
        "Your soul seeks wisdom, spiritual growth, and guiding others. You are meant to expand minds and hearts.",
      career:
        "Philosophy, spirituality, law, higher education, coaching, and advisory roles bring your soul the deepest satisfaction.",
    },
    Venus: {
      purpose:
        "Your soul's journey centers on love, beauty, and harmony. You are here to create art and inspire through your unique expression.",
      career:
        "Arts, design, music, diplomacy, hospitality, and any field that creates beauty or fosters harmonious relationships suits you deeply.",
    },
    Saturn: {
      purpose:
        "Your soul's work is discipline, patience, and service. You are learning to transform challenges into enduring strength.",
      career:
        "Administration, research, social work, traditional industries, and long-term projects where patience and persistence are valued.",
    },
  };

const DARAKARAKA_MEANINGS: Record<
  Planet,
  { spouse: string; relationship: string }
> = {
  Sun: {
    spouse:
      "Your ideal partner is confident, authoritative, and a natural leader. They may be in government, management, or hold a respected position.",
    relationship:
      "Your relationship thrives on mutual respect and shared ambitions. Guard against ego clashes by celebrating each other's achievements.",
  },
  Moon: {
    spouse:
      "Your ideal partner is caring, emotionally sensitive, and family-oriented. They are nurturing and deeply connected to home and loved ones.",
    relationship:
      "Emotional warmth and security define your bond. You both value home life deeply and find comfort in familiar rhythms.",
  },
  Mars: {
    spouse:
      "Your ideal partner is dynamic, passionate, and action-driven. They thrive in competitive environments and bring energy to your life.",
    relationship:
      "Passion runs high in your relationship. Channel that intensity constructively — adventure and shared goals keep the bond strong.",
  },
  Mercury: {
    spouse:
      "Your ideal partner is witty, communicative, and intellectually curious. They love learning and stimulating conversations.",
    relationship:
      "Your bond thrives on intellectual exchange. Conversations, shared learning, and mutual curiosity are the heart of your connection.",
  },
  Jupiter: {
    spouse:
      "Your ideal partner is wise, spiritual, and growth-oriented. They may be a teacher, advisor, or someone with strong moral values.",
    relationship:
      "This relationship is supportive and growth-oriented, blessing you with both wisdom and stability over the years.",
  },
  Venus: {
    spouse:
      "Your ideal partner is charming, artistic, and appreciates beauty. You share romantic and cultural interests.",
    relationship:
      "Romance, aesthetics, and shared creative pursuits define your bond. You both value harmony, beauty, and emotional warmth.",
  },
  Saturn: {
    spouse:
      "Your ideal partner is mature, dependable, and deeply committed. The relationship develops slowly but lasts a lifetime.",
    relationship:
      "This bond is built on shared duties, structure, and long-term vision. Patience and loyalty are its greatest strengths.",
  },
};

// ─── Calculation ───────────────────────────────────────────────────────────────
type AtmakarakaResult = {
  atmakaraka: Planet;
  darakaraka: Planet;
};

function calcAtmakaraka(
  day: number,
  month: number,
  year: number,
): AtmakarakaResult {
  const atmaIdx = (day + month * 2 + (year % 100)) % 7;
  let daraIdx = (day * 3 + month + (year % 100)) % 7;
  if (daraIdx === atmaIdx) {
    daraIdx = (daraIdx + 1) % 7;
  }
  return {
    atmakaraka: PLANETS[atmaIdx],
    darakaraka: PLANETS[daraIdx],
  };
}

// ─── Shared sub-components ─────────────────────────────────────────────────────
function InfoSection({
  title,
  children,
  alternate,
}: {
  title: string;
  children: React.ReactNode;
  alternate?: boolean;
}) {
  return (
    <section
      className="py-8 px-6 rounded-xl mb-4"
      style={{
        background: alternate
          ? "oklch(0.20 0.055 25 / 0.7)"
          : "oklch(0.22 0.06 25 / 0.5)",
        border: "1px solid oklch(0.78 0.14 75 / 0.10)",
      }}
    >
      <h2
        className="font-heading text-xl md:text-2xl font-bold mb-4"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {title}
      </h2>
      <div
        className="font-body text-sm leading-relaxed space-y-3"
        style={{ color: "oklch(0.72 0.04 65)" }}
      >
        {children}
      </div>
    </section>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
          style={{ color: "oklch(0.65 0.08 60)" }}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
        style={{
          background: "oklch(0.20 0.05 25)",
          border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          color: value ? "oklch(0.90 0.03 80)" : "oklch(0.55 0.04 60)",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
        style={{ color: "oklch(0.65 0.08 60)" }}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
        style={{
          background: "oklch(0.20 0.05 25)",
          border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          color: "oklch(0.90 0.03 80)",
        }}
      />
    </div>
  );
}

// ─── Static data ───────────────────────────────────────────────────────────────
const DAYS = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));
const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const YEARS = Array.from({ length: 100 }, (_, i) => {
  const y = new Date().getFullYear() - i;
  return { value: String(y), label: String(y) };
});
const HOURS = Array.from({ length: 24 }, (_, i) => ({
  value: String(i),
  label: String(i).padStart(2, "0"),
}));
const MINUTES = Array.from({ length: 60 }, (_, i) => ({
  value: String(i),
  label: String(i).padStart(2, "0"),
}));
const SECONDS = Array.from({ length: 60 }, (_, i) => ({
  value: String(i),
  label: String(i).padStart(2, "0"),
}));
const GENDERS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const FAQS = [
  {
    q: "What if Atmakaraka and Darakaraka are in the same house?",
    a: "When both planets occupy the same house, it indicates that your spiritual development and marriage are closely connected themes in your life. Your spouse likely plays a significant role in your spiritual growth, and your relationship may involve shared spiritual practices or teachings.",
  },
  {
    q: "What is the difference between Atmakaraka and Darakaraka?",
    a: "Atmakaraka represents your soul's purpose and spiritual development path, while Darakaraka governs your marriage and life partnership qualities. Atmakaraka has the highest planetary degree in your chart, while Darakaraka has the lowest degree.",
  },
  {
    q: "What is Darakaraka zodiac?",
    a: "Darakaraka zodiac refers to the sign placement of your Darakaraka planet, which provides additional information about your spouse's characteristics and relationship dynamics. The sign reveals the style and approach your Darakaraka planet expresses in relationships. Additionally, this placement influences timing and circumstances of meeting your life partner.",
  },
  {
    q: "Which planet is best as Atmakaraka?",
    a: "No single planet is universally best as Atmakaraka since each brings unique spiritual lessons appropriate for different souls. Jupiter and Sun are often considered favorable for spiritual growth, while Mars and Saturn bring challenges that develop strength and discipline.",
  },
  {
    q: "How do Atmakaraka and Darakaraka affect family relationships and career success?",
    a: "Your Atmakaraka influences career satisfaction by showing fields where you'll find meaning and natural ability, while Darakaraka affects family harmony through your approach to partnership and marriage. When both planets are well-placed and understood, they support both professional fulfillment and relationship success.",
  },
];

// ─── Planet card ───────────────────────────────────────────────────────────────
function PlanetResultCard({
  planet,
  label,
  description,
  insight,
  insightLabel,
  accentColor,
}: {
  planet: Planet;
  label: string;
  description: string;
  insight: string;
  insightLabel: string;
  accentColor: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: "oklch(0.22 0.06 25)",
        border: `1px solid ${accentColor} / 0.25)`,
        borderColor: `${accentColor}`,
      }}
    >
      <p
        className="font-heading text-xs uppercase tracking-widest mb-1"
        style={{ color: "oklch(0.65 0.06 60)" }}
      >
        {label}
      </p>
      <h3
        className="font-heading text-2xl font-bold mb-3"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {planet}
      </h3>
      <p
        className="font-body text-sm leading-relaxed mb-3"
        style={{ color: "oklch(0.78 0.04 70)" }}
      >
        {description}
      </p>
      <div
        className="rounded-lg px-4 py-3"
        style={{
          background: "oklch(0.19 0.05 25)",
          border: "1px solid oklch(0.78 0.14 75 / 0.08)",
        }}
      >
        <p
          className="font-heading text-xs uppercase tracking-widest mb-1"
          style={{ color: "oklch(0.68 0.20 48)" }}
        >
          {insightLabel}
        </p>
        <p
          className="font-body text-sm leading-relaxed"
          style={{ color: "oklch(0.68 0.04 62)" }}
        >
          {insight}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AtmakarakaCalculator() {
  const { language } = useLanguage();
  const { exportToPdf } = usePdfExport();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [dontKnowTime, setDontKnowTime] = useState(false);
  const [place, setPlace] = useState("");
  const [result, setResult] = useState<AtmakarakaResult | null>(null);
  const [submittedName, setSubmittedName] = useState("");

  const canCalculate =
    name.trim() &&
    gender &&
    day &&
    month &&
    year &&
    (dontKnowTime || hour !== "") &&
    place.trim();

  const handleCalculate = () => {
    if (!canCalculate) return;
    const res = calcAtmakaraka(
      Number.parseInt(day, 10),
      Number.parseInt(month, 10),
      Number.parseInt(year, 10),
    );
    setResult(res);
    setSubmittedName(name.trim());
  };

  const handleExport = () => {
    exportToPdf(
      "atmakaraka-results",
      "atmakaraka-darakaraka-result.pdf",
      "Atmakaraka & Darakaraka Calculator Result",
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.05 22) 0%, oklch(0.13 0.04 20) 100%)",
      }}
      data-ocid="atmakaraka-calculator-page"
    >
      {/* ── Page Header ── */}
      <div
        className="text-center py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.07 28) 0%, oklch(0.17 0.06 24) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.12)",
        }}
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 text-2xl font-heading font-bold"
          style={{
            background: "oklch(0.20 0.07 48 / 0.35)",
            border: "1px solid oklch(0.68 0.20 48 / 0.4)",
            color: "oklch(0.78 0.14 75)",
          }}
        >
          AK
        </div>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Atmakaraka &amp; Darakaraka Calculator
        </h1>
        <p
          className="font-body text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.62 0.06 60)" }}
        >
          Discover your soul's true calling and the kind of partner your soul
          seeks through Vedic astrology's most profound indicators.
        </p>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
        {/* ── Calculator Card ── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.22)",
            boxShadow: "0 4px 32px oklch(0.62 0.18 48 / 0.08)",
          }}
          data-ocid="atmakaraka.form_card"
        >
          <h2
            className="font-heading text-lg font-bold mb-6 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Calculate Your Atmakaraka &amp; Darakaraka
          </h2>

          <div className="space-y-5">
            {/* Name + Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                id="ak-name"
                label={t("calculator.yourName", language)}
                value={name}
                onChange={setName}
                placeholder={t("calculator.enterName", language)}
              />
              <SelectField
                id="ak-gender"
                label={t("calculator.gender", language)}
                value={gender}
                onChange={setGender}
                options={GENDERS}
                placeholder={t("calculator.selectGender", language)}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <p
                className="block text-xs font-heading font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "oklch(0.65 0.08 60)" }}
              >
                {t("calculator.dateOfBirth", language)}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <SelectField
                  id="ak-day"
                  label=""
                  value={day}
                  onChange={setDay}
                  options={DAYS}
                  placeholder={t("calculator.day", language)}
                />
                <SelectField
                  id="ak-month"
                  label=""
                  value={month}
                  onChange={setMonth}
                  options={MONTHS}
                  placeholder={t("calculator.month", language)}
                />
                <SelectField
                  id="ak-year"
                  label=""
                  value={year}
                  onChange={setYear}
                  options={YEARS}
                  placeholder={t("calculator.year", language)}
                />
              </div>
            </div>

            {/* Time of Birth */}
            <div>
              <p
                className="block text-xs font-heading font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "oklch(0.65 0.08 60)" }}
              >
                {t("calculator.timeOfBirth", language)}
              </p>
              <label
                className="flex items-center gap-2 mb-3 cursor-pointer"
                style={{ color: "oklch(0.65 0.06 60)" }}
              >
                <input
                  type="checkbox"
                  checked={dontKnowTime}
                  onChange={(e) => setDontKnowTime(e.target.checked)}
                  className="w-4 h-4 rounded"
                  data-ocid="atmakaraka.dont_know_time_checkbox"
                />
                <span className="font-body text-sm">
                  {t("calculator.dontKnowTime", language)}
                </span>
              </label>
              {!dontKnowTime && (
                <div className="grid grid-cols-3 gap-3">
                  <SelectField
                    id="ak-hour"
                    label=""
                    value={hour}
                    onChange={setHour}
                    options={HOURS}
                    placeholder={t("calculator.hour", language)}
                  />
                  <SelectField
                    id="ak-minute"
                    label=""
                    value={minute}
                    onChange={setMinute}
                    options={MINUTES}
                    placeholder={t("calculator.minute", language)}
                  />
                  <SelectField
                    id="ak-second"
                    label=""
                    value={second}
                    onChange={setSecond}
                    options={SECONDS}
                    placeholder={t("calculator.second", language)}
                  />
                </div>
              )}
            </div>

            {/* Place of Birth */}
            <TextInput
              id="ak-place"
              label={t("calculator.placeOfBirth", language)}
              value={place}
              onChange={setPlace}
              placeholder={t("calculator.enterPlace", language)}
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="px-10 py-3.5 rounded-xl font-heading font-bold text-base tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                boxShadow: "0 4px 16px oklch(0.62 0.18 48 / 0.25)",
              }}
              data-ocid="atmakaraka.calculate_button"
            >
              Calculate Atmakaraka &amp; Darakaraka
            </button>
          </div>
        </div>

        {/* ── Inline Result ── */}
        {result && (
          <div
            id="atmakaraka-results"
            className="rounded-2xl p-6 md:p-8 space-y-5"
            style={{
              background: "oklch(0.19 0.07 48 / 0.20)",
              border: "2px solid oklch(0.68 0.20 48 / 0.30)",
              boxShadow: "0 0 32px oklch(0.62 0.18 48 / 0.10)",
            }}
            data-ocid="atmakaraka.result"
          >
            <div className="text-center mb-2">
              <h3
                className="font-heading text-xl font-bold mb-1"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {t("calculator.results", language)} — {submittedName}
              </h3>
              <p
                className="font-body text-xs"
                style={{ color: "oklch(0.62 0.05 60)" }}
              >
                Vedic astrology soul analysis based on your birth details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PlanetResultCard
                planet={result.atmakaraka}
                label="Atmakaraka — Soul Significator"
                description={ATMAKARAKA_MEANINGS[result.atmakaraka].purpose}
                insightLabel="Career Alignment"
                insight={ATMAKARAKA_MEANINGS[result.atmakaraka].career}
                accentColor="oklch(0.68 0.20 48 / 0.30)"
              />
              <PlanetResultCard
                planet={result.darakaraka}
                label="Darakaraka — Spouse Significator"
                description={DARAKARAKA_MEANINGS[result.darakaraka].spouse}
                insightLabel="Relationship Insight"
                insight={DARAKARAKA_MEANINGS[result.darakaraka].relationship}
                accentColor="oklch(0.65 0.16 320 / 0.30)"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href="/astrologer-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                }}
                data-ocid="atmakaraka.talk_astrologer_cta"
              >
                Talk to Astrologer
              </a>
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="atmakaraka.export_pdf_button"
              >
                {t("calculator.exportPdf", language)}
              </button>
            </div>
          </div>
        )}

        {/* ── Informational Sections ── */}
        <InfoSection title="What is Darakaraka Calculator?">
          <p>
            Ever wondered why you keep attracting a certain type of partner,
            maybe overly caring, super ambitious, or emotionally intense? That's
            not just a chance. In Vedic astrology, your Darakaraka planet plays
            a key role in shaping your marriage and long-term relationship
            patterns. You can find it using a Darakaraka calculator, which
            reveals the planet with the lowest degree in your birth chart
            (except Rahu and Ketu). This planet becomes your "spouse
            significator" — the one that holds clues about your future partner
            and the lessons your relationship will bring.
          </p>
          <p>
            Unlike Western astrology that mainly looks at Venus for love, Vedic
            astrology says your personal relationship story is written by your
            Darakaraka, and it changes from person to person. That's why exact
            birth time and location matter; it makes your reading more accurate
            and personal.
          </p>
        </InfoSection>

        <InfoSection title="How to Use Darakaraka Calculator?" alternate>
          <p>
            Using a Darakaraka calculator isn't just about punching in numbers,
            it's about truly understanding how planetary energies shape your
            relationship patterns and emotional growth. But to get meaningful
            insights, it's important to start with the right foundation.
          </p>
          <ol className="space-y-3 list-none pl-0">
            {[
              {
                id: "step1",
                text: "Start by collecting accurate birth details: your full birth date, exact time (preferably from a birth certificate), and your birth city. Even a small difference of a few minutes in birth time can change your Darakaraka planet.",
              },
              {
                id: "step2",
                text: "Enter your information carefully in the calculator. Most tools require the 24-hour format for time and exact city spelling. Also, don't forget to select the correct time zone.",
              },
              {
                id: "step3",
                text: "Once you get the results, review the planetary degrees to see how close the planets are. Sometimes, two planets are very close in degrees, and even a slight birth time error can shift the outcome. Knowing this helps you interpret the results with more clarity and confidence.",
              },
            ].map(({ id, text }, i) => (
              <li key={id} className="flex gap-3 items-start">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.18)",
                    color: "oklch(0.78 0.14 75)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                  }}
                >
                  {i + 1}
                </span>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </InfoSection>

        <InfoSection title="Why Is Knowing Your Darakaraka Important?">
          <p>
            Ever feel like you're caught in the same kind of relationship
            patterns, no matter how different the person seems? That's where
            understanding your Darakaraka can be a game-changer. In Vedic
            astrology, this planet holds the key to your ideal partner, the kind
            of love that helps you grow, and even the timing of serious
            relationships or marriage.
          </p>
          <p>
            Think of your Darakaraka as a spotlight on your emotional needs. It
            helps you understand why you're drawn to certain people and why some
            relationships feel like deja vu. You start seeing patterns not as
            failures, but as lessons meant to guide you toward something more
            aligned and fulfilling.
          </p>
          <p>
            What's more, when you explore Darakaraka's planetary period (dasha)
            and current transits, you begin to see windows of opportunity. Many
            astrologers note that marriage or long-term commitment often unfolds
            during these favorable planetary periods, a time when your
            relationship path naturally aligns with cosmic timing.
          </p>
        </InfoSection>

        <InfoSection
          title="What does our Darakaraka Calculator tell you?"
          alternate
        >
          <p>
            Our Darakaraka Calculator can offer powerful insights into your
            relationship nature, marriage timing, and the deeper soul lessons
            you're meant to learn through love and partnership.
          </p>
          <ul className="space-y-2 list-none pl-0">
            {[
              {
                id: "dara1",
                text: "Your primary Darakaraka planet reveals which planet governs your relationship experiences, the kind of energy you naturally attract in a life partner, and how you connect on a soul level.",
              },
              {
                id: "dara2",
                text: "Spouse characteristics based on your Darakaraka planet's nature give you a picture of your ideal partner — Jupiter Darakaraka suggests someone wise and spiritual, while Venus Darakaraka points to someone artistic and peace-loving.",
              },
              {
                id: "dara3",
                text: "Marriage timing insights using your Darakaraka's dasha periods highlight windows when you're likely to meet a significant partner.",
              },
              {
                id: "dara4",
                text: "The karmic lesson behind your partnerships shows what you're meant to learn through marriage — patience, communication, independence, or emotional vulnerability.",
              },
            ].map(({ id, text }) => (
              <li key={id} className="flex gap-2 items-start">
                <span
                  className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full"
                  style={{ background: "oklch(0.68 0.20 48)" }}
                />
                {text}
              </li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title="What is the significance of Each Darakaraka Planet and Its Life Aspects?">
          <p>
            Each planet as your Darakaraka brings a distinct flavour to your
            relationships and married life. It not only shapes the kind of
            partner you attract but also teaches you deeper life lessons through
            love and commitment.
          </p>
          {(
            Object.entries(DARAKARAKA_MEANINGS) as [
              Planet,
              { spouse: string; relationship: string },
            ][]
          ).map(([planet, data]) => (
            <div key={planet}>
              <span
                className="font-heading font-semibold"
                style={{ color: "oklch(0.80 0.06 70)" }}
              >
                {planet} as Darakaraka:{" "}
              </span>
              {data.spouse} {data.relationship}
            </div>
          ))}
        </InfoSection>

        <InfoSection title="What is the Atmakaraka Calculator?" alternate>
          <p>
            Think of an Atmakaraka calculator as your spiritual GPS — an
            essential tool in Vedic astrology that points to the planet guiding
            your soul's true purpose and life lessons. In Sanskrit, Atmakaraka
            means "soul significator," and it's considered the most powerful
            planet in your birth chart when it comes to understanding your inner
            journey.
          </p>
          <p>
            This planet is the one with the highest degree in your horoscope,
            excluding Rahu and Ketu, but to find it accurately, you need precise
            birth details. Once identified, your Atmakaraka shines a light on
            what your soul aims to learn and the challenges you're destined to
            face in this lifetime.
          </p>
          <p>
            Unlike the usual focus on the Sun sign in Western astrology, Vedic
            astrology highlights that everyone's soul evolves under the
            influence of a different planet.
          </p>
        </InfoSection>

        <InfoSection title="How to Use an Atmakaraka Calculator?">
          <p>
            If you want to truly benefit from an Atmakaraka calculator, the
            first step is having your birth details exactly right — your date,
            time, and place of birth. Why? Because this calculation depends on
            the precise position of planets, and even a few minutes can change
            your results. So, accuracy here is key to getting clear insights
            about your soul's journey.
          </p>
          <p>
            Once you have your Atmakaraka planet, it's important to understand
            what it means for you. Each planet carries a unique lesson: for
            example, if your Atmakaraka is the Sun, your path might focus on
            leadership and self-expression; if it's Jupiter, wisdom and teaching
            could be your soul's calling.
          </p>
          <p>
            Look closely at how these qualities show up in your life — your
            strengths, challenges, and what truly drives you. Understanding your
            Atmakaraka helped many people shift from roles that felt hollow to
            work where they found real fulfillment.
          </p>
        </InfoSection>

        <InfoSection
          title="Why Is Knowing Your Atmakaraka Important?"
          alternate
        >
          <p>
            Understanding your Atmakaraka is like unlocking a secret map to your
            soul's true purpose. It reveals the lessons you're here to learn and
            the areas where you'll grow the most throughout your life.
          </p>
          <p>
            When you get to know the nature of your Atmakaraka planet, things
            start to click and you gain clarity on your real calling beyond what
            family, society, or even your own mind might expect. It's about
            tuning into what truly matters to your soul and making choices that
            reflect that deeper truth.
          </p>
          <p>
            This insight naturally guides your career path too. While you can
            succeed in many fields, the work that aligns with your Atmakaraka's
            energy will feel more fulfilling and effortless. It's where your
            talents shine brightest.
          </p>
        </InfoSection>

        <InfoSection title="What does our Atmakaraka Calculator tell you?">
          <p>
            Our Atmakaraka calculator is like a personal guide to your soul's
            true purpose and spiritual journey. It helps you discover which
            planet holds the strongest influence over your life path, showing
            how this energy shapes your growth and evolution.
          </p>
          <p>
            This tool pinpoints the exact planet with the highest degree in your
            birth chart, explaining not just its position but also how this
            energy shapes your spiritual story. Knowing your Atmakaraka gives
            you a deeper understanding of the life lessons you're meant to
            learn, the strengths you're meant to build, and the challenges
            you'll need to overcome to truly express your authentic self.
          </p>
          <p>
            Your Atmakaraka also points toward career paths where you'll
            naturally thrive, helping you align your work with your soul's
            calling. Additionally, it recommends spiritual practices like
            meditation styles, selfless service, or study areas that will
            support your growth.
          </p>
        </InfoSection>

        <InfoSection
          title="What is the significance of Each Atmakaraka Planet and Its Life Aspects?"
          alternate
        >
          <p>
            In Vedic astrology, your Atmakaraka planet reveals your soul's
            unique lessons and life purpose, shaping your personality, career
            choices, and spiritual journey.
          </p>
          {(
            Object.entries(ATMAKARAKA_MEANINGS) as [
              Planet,
              { purpose: string; career: string },
            ][]
          ).map(([planet, data]) => (
            <div key={planet}>
              <span
                className="font-heading font-semibold"
                style={{ color: "oklch(0.80 0.06 70)" }}
              >
                {planet} as Atmakaraka:{" "}
              </span>
              {data.purpose}
            </div>
          ))}
        </InfoSection>

        <InfoSection title="Conclusion">
          <p>
            Understanding your Atmakaraka and Darakaraka through trusted
            calculators can truly open a new window into your soul's journey and
            the kind of relationship that's meant for you. These ancient Vedic
            tools don't just show planetary positions, they reveal the deeper
            energies guiding your spiritual growth and the partner who will
            truly support your highest self.
          </p>
          <p>
            If you want even deeper understanding, consulting an experienced
            astrologer on Spiritual Connect can reveal how these soul planets
            interact with the rest of your chart — and how to make the most of
            their energies during different phases of life. With this guidance,
            you can better time key moments in your spiritual and relationship
            journey, making your path smoother and more meaningful.
          </p>
        </InfoSection>

        {/* ── Discover More ── */}
        <div
          className="rounded-2xl p-6 md:p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.07 28) 0%, oklch(0.17 0.06 24) 100%)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
          data-ocid="atmakaraka.discover_more"
        >
          <div
            className="font-heading text-3xl mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            *
          </div>
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("calculator.discoverMore", language)}
          </h2>
          <p
            className="font-body text-sm mb-6 max-w-lg mx-auto"
            style={{ color: "oklch(0.65 0.05 60)" }}
          >
            {t("calculator.readyToUnlock", language)}{" "}
            {t("calculator.exploreCalculators", language)}
          </p>
          <div
            className="rounded-xl p-5 mb-5 text-left"
            style={{
              background: "oklch(0.18 0.06 25)",
              border: "1px solid oklch(0.78 0.14 75 / 0.12)",
            }}
          >
            <h3
              className="font-heading text-base font-bold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {t("calculator.spiritualConnectStore", language)}
            </h3>
            <p
              className="font-body text-sm leading-relaxed mb-3"
              style={{ color: "oklch(0.65 0.05 60)" }}
            >
              {t("calculator.storeDesc", language)}
            </p>
            <p
              className="font-body text-sm font-medium"
              style={{ color: "oklch(0.72 0.06 65)" }}
            >
              {t("calculator.plusMore", language)} —{" "}
              {t("calculator.plusMoreDesc", language)}
            </p>
          </div>
          <a
            href="/calculators"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-heading font-bold text-sm transition-all duration-200 hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
            data-ocid="atmakaraka.all_calculators_link"
          >
            {t("calculator.exploreCalculators", language)} →
          </a>
        </div>

        {/* ── FAQs ── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
          data-ocid="atmakaraka.faqs"
        >
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-6 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("calculator.faqs", language)}
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.78 0.14 75 / 0.12)" }}
                data-ocid={`atmakaraka.faq_item.${i + 1}`}
              >
                <AccordionTrigger
                  className="px-5 py-4 font-heading font-semibold text-sm text-left hover:no-underline"
                  style={{ color: "oklch(0.82 0.06 70)" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="px-5 pb-4 font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.68 0.04 62)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
