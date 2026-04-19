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

// ─── Grid Layout ───────────────────────────────────────────────────────────────
// Lo Shu Grid positions: [4][9][2] / [3][5][7] / [8][1][6]
const GRID_POSITIONS = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

interface DigitMeaning {
  position: string;
  aspect: string;
  present: string;
  missing: string;
}

const DIGIT_MEANINGS: Record<number, DigitMeaning> = {
  1: {
    position: "Lower Middle",
    aspect: "Communication & Willpower",
    present: "Strong communicator, determined, leadership",
    missing: "Difficulty expressing oneself, lack of confidence",
  },
  2: {
    position: "Lower Right",
    aspect: "Intuition & Sensitivity",
    present: "Intuitive, empathetic, spiritually aware",
    missing: "Difficulty trusting instincts, emotional imbalance",
  },
  3: {
    position: "Upper Left",
    aspect: "Action & Intellect",
    present: "Sharp mind, action-oriented, practical",
    missing: "Lack of motivation, difficulty taking action",
  },
  4: {
    position: "Middle Left",
    aspect: "Organization & Practicality",
    present: "Organized, methodical, disciplined",
    missing: "Disorganized, lack of practicality",
  },
  5: {
    position: "Center",
    aspect: "Balance & Emotional Freedom",
    present: "Balanced, adaptable, emotionally intelligent",
    missing: "Emotional instability, difficulty finding balance",
  },
  6: {
    position: "Middle Right",
    aspect: "Creativity & Home",
    present: "Creative, loving, family-oriented",
    missing: "Relationship difficulties, lack of creativity",
  },
  7: {
    position: "Lower Left",
    aspect: "Spiritual Learning",
    present: "Spiritually inclined, philosophical, introspective",
    missing: "Skeptical, materialistic, lacks spiritual connection",
  },
  8: {
    position: "Upper Right",
    aspect: "Wisdom & Responsibility",
    present: "Wise, responsible, deeply insightful",
    missing: "Impractical, poor judgment",
  },
  9: {
    position: "Upper Middle",
    aspect: "Ambition & Humanitarianism",
    present: "Ambitious, compassionate, idealistic",
    missing: "Lack of ambition, self-centeredness",
  },
};

// ─── Calculation Logic ─────────────────────────────────────────────────────────
function extractDobDigits(day: number, month: number, year: number): number[] {
  const dobStr = `${String(day).padStart(2, "0")}${String(month).padStart(2, "0")}${year}`;
  return dobStr
    .split("")
    .map((c) => Number.parseInt(c, 10))
    .filter((d) => d >= 1 && d <= 9);
}

function countFrequencies(digits: number[]): Record<number, number> {
  const freq: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) freq[i] = 0;
  for (const d of digits) {
    if (d >= 1 && d <= 9) freq[d]++;
  }
  return freq;
}

function reduceToSingle(input: number): number {
  let n = input;
  while (n > 9 && n !== 11 && n !== 22) {
    n = String(n)
      .split("")
      .reduce((s, c) => s + Number.parseInt(c, 10), 0);
  }
  return n;
}

function calcLifePath(day: number, month: number, year: number): number {
  const sum = day + month + year;
  return reduceToSingle(sum);
}

// ─── Sub-components ────────────────────────────────────────────────────────────
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
      className="rounded-2xl p-6 space-y-3"
      style={{
        background: alternate
          ? "oklch(0.20 0.055 25 / 0.7)"
          : "oklch(0.22 0.06 25 / 0.5)",
        border: "1px solid oklch(0.78 0.14 75 / 0.10)",
      }}
    >
      <h2
        className="font-heading text-xl font-bold mb-2"
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

const FAQS = [
  {
    q: "What is Lo Shu Grid numerology?",
    a: "Lo Shu Grid is an ancient Chinese numerological system based on a 3x3 magic square. By placing the digits of your birth date into the grid, it reveals your strengths, weaknesses, and the energies governing your personality. Each cell corresponds to a specific life aspect, and the presence or absence of numbers determines your unique energetic blueprint.",
  },
  {
    q: "How accurate is Lo Shu Grid?",
    a: "Lo Shu Grid offers meaningful symbolic insights rather than precise scientific predictions. Its accuracy depends on how you use it — as a tool for self-reflection and awareness, it can be remarkably resonant. Many numerologists consider it highly accurate for identifying personality tendencies, karmic lessons, and areas needing focus. Real depth comes from combining it with a full birth chart reading.",
  },
  {
    q: "What happens if a number is repeated many times?",
    a: "Repeated numbers in the Lo Shu Grid are called 'excess' numbers. They amplify the energy of that position — for example, too many 1s can indicate an overly dominant personality or difficulty collaborating. Too many 5s (the center number) may suggest emotional overwhelm. Recognizing excess numbers helps channel those energies constructively rather than destructively.",
  },
  {
    q: "Can Lo Shu Grid predict the future?",
    a: "Lo Shu Grid is not a predictive tool in the traditional sense — it doesn't forecast specific future events. Instead, it maps your innate energetic patterns, tendencies, and potential karmic challenges. Understanding these patterns allows you to make better choices, which indirectly shapes your future. For specific predictions, Vedic astrology methods like Dasha analysis are more appropriate.",
  },
  {
    q: "How is Lo Shu Grid different from Western numerology?",
    a: "Western numerology (Pythagorean) primarily uses single numbers like Life Path, Expression, and Soul Urge numbers derived from name and DOB. Lo Shu Grid is a Chinese system that uses the full set of birth date digits mapped into a 3x3 spatial grid, revealing patterns through the presence, absence, and repetition of numbers 1–9. It gives a more visual, holistic picture of energetic balance.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LoShuGridCalculator() {
  const { language } = useLanguage();
  const { exportToPdf } = usePdfExport();

  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{
    name: string;
    freq: Record<number, number>;
    lifePath: number;
    missing: number[];
    repeated: number[];
  } | null>(null);

  const canCalculate =
    name.trim().length > 0 && day !== "" && month !== "" && year !== "";

  const handleCalculate = () => {
    if (!canCalculate) return;
    const d = Number.parseInt(day, 10);
    const m = Number.parseInt(month, 10);
    const y = Number.parseInt(year, 10);
    const digits = extractDobDigits(d, m, y);
    const freq = countFrequencies(digits);
    const lifePath = calcLifePath(d, m, y);
    const missing = Object.keys(freq)
      .map(Number)
      .filter((k) => freq[k] === 0);
    const repeated = Object.keys(freq)
      .map(Number)
      .filter((k) => freq[k] > 1);
    setResult({ name: name.trim(), freq, lifePath, missing, repeated });
  };

  const labelStyle = { color: "oklch(0.78 0.14 75)" };
  const inputStyle = {
    background: "oklch(0.18 0.04 25)",
    borderColor: "oklch(0.35 0.08 25)",
    color: "oklch(0.90 0.04 60)",
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.04 22)" }}
      data-ocid="lo-shu-grid-calculator-page"
    >
      {/* ── Hero ── */}
      <div
        className="py-10 px-4 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.18 0.06 22) 0%, oklch(0.14 0.04 22) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <span
            className="font-heading text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.60 0.08 60)" }}
          >
            Numerology Calculator
          </span>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-3"
            style={{ color: "oklch(0.92 0.10 75)" }}
          >
            Lo Shu Grid Calculator
          </h1>
          <p
            className="font-body text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.68 0.05 60)" }}
          >
            Ancient Chinese wisdom meets modern numerology in the Lo Shu Grid —
            a mystical 3x3 magic square that has been used for thousands of
            years to reveal deep insights about personality, strengths, and life
            challenges. Based on your date of birth, this powerful tool shows
            which energies are strong in your life and which ones need
            nurturing.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* ── Form Card ── */}
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{
            background: "oklch(0.20 0.05 25)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
        >
          <h2 className="font-heading text-lg font-bold" style={labelStyle}>
            Enter Your Details
          </h2>

          {/* Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="loshu-name"
              className="block font-heading text-sm font-semibold"
              style={labelStyle}
            >
              {t("calculator.yourName", language)} *
            </label>
            <input
              id="loshu-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all border"
              style={inputStyle}
              data-ocid="lo-shu.name_input"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label
              htmlFor="loshu-dob-day"
              className="block font-heading text-sm font-semibold"
              style={labelStyle}
            >
              {t("calculator.dateOfBirth", language)} *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <select
                id="loshu-dob-day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
                style={inputStyle}
                data-ocid="lo-shu.day_select"
              >
                <option value="">{t("calculator.day", language)}</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
                style={inputStyle}
                data-ocid="lo-shu.month_select"
              >
                <option value="">{t("calculator.month", language)}</option>
                {months.map((mo, i) => (
                  <option key={mo} value={i + 1}>
                    {mo}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
                style={inputStyle}
                data-ocid="lo-shu.year_select"
              >
                <option value="">{t("calculator.year", language)}</option>
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCalculate}
            disabled={!canCalculate}
            className="w-full py-3 rounded-xl font-heading font-bold text-sm tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
              boxShadow: "0 4px 16px oklch(0.62 0.18 48 / 0.25)",
            }}
            data-ocid="lo-shu.calculate_button"
          >
            {t("calculator.calculate", language)} Lo Shu Grid
          </button>
        </div>

        {/* ── Results ── */}
        {result && (
          <div
            id="lo-shu-results"
            className="rounded-2xl p-6 space-y-6"
            style={{
              background: "oklch(0.19 0.06 26)",
              border: "2px solid oklch(0.78 0.14 75 / 0.35)",
              boxShadow: "0 0 32px oklch(0.78 0.14 75 / 0.08)",
            }}
            data-ocid="lo-shu.result"
          >
            <div className="text-center">
              <p
                className="font-heading text-xs uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.60 0.08 60)" }}
              >
                Lo Shu Grid for
              </p>
              <h2
                className="font-heading text-2xl font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {result.name}
              </h2>
              <p
                className="font-body text-xs mt-1"
                style={{ color: "oklch(0.60 0.05 60)" }}
              >
                Life Path Number:{" "}
                <span
                  className="font-heading font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {result.lifePath}
                </span>
              </p>
            </div>

            {/* 3x3 Grid */}
            <div className="flex justify-center">
              <table
                className="border-collapse"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
              >
                <tbody>
                  {GRID_POSITIONS.map((row) => (
                    <tr key={`row-${row[0]}-${row[1]}-${row[2]}`}>
                      {row.map((num) => {
                        const count = result.freq[num] ?? 0;
                        const isMissing = count === 0;
                        const isStrong = count > 1;
                        return (
                          <td
                            key={`cell-${num}`}
                            className="w-24 h-24 text-center align-middle p-2"
                            style={{
                              border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                              background: isMissing
                                ? "oklch(0.18 0.04 25)"
                                : isStrong
                                  ? "oklch(0.68 0.20 48 / 0.20)"
                                  : "oklch(0.22 0.06 25)",
                            }}
                          >
                            <div
                              className="font-heading text-2xl font-bold leading-none mb-1"
                              style={{
                                color: isMissing
                                  ? "oklch(0.40 0.04 40)"
                                  : isStrong
                                    ? "oklch(0.68 0.20 48)"
                                    : "oklch(0.78 0.14 75)",
                              }}
                            >
                              {isMissing ? "-" : num.toString().repeat(count)}
                            </div>
                            <div
                              className="font-heading text-xs font-semibold"
                              style={{
                                color: isMissing
                                  ? "oklch(0.40 0.04 40)"
                                  : "oklch(0.62 0.06 62)",
                              }}
                            >
                              {num}
                            </div>
                            <div
                              className="font-body text-xs mt-0.5 leading-tight"
                              style={{
                                color: "oklch(0.52 0.04 55)",
                                fontSize: "0.6rem",
                              }}
                            >
                              {DIGIT_MEANINGS[num]?.aspect.split(" & ")[0]}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Missing Numbers */}
            {result.missing.length > 0 && (
              <div
                className="rounded-xl p-4"
                style={{
                  background: "oklch(0.18 0.04 25)",
                  border: "1px solid oklch(0.55 0.12 25 / 0.30)",
                }}
              >
                <h3
                  className="font-heading text-sm font-bold mb-3"
                  style={{ color: "oklch(0.75 0.12 48)" }}
                >
                  Missing Numbers — Areas Needing Attention
                </h3>
                <div className="space-y-2">
                  {result.missing.map((num) => (
                    <div
                      key={`missing-${num}`}
                      className="flex gap-3 items-start"
                    >
                      <span
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-sm"
                        style={{
                          background: "oklch(0.25 0.05 25)",
                          color: "oklch(0.55 0.10 40)",
                        }}
                      >
                        {num}
                      </span>
                      <div>
                        <span
                          className="font-heading text-xs font-semibold"
                          style={{ color: "oklch(0.72 0.06 60)" }}
                        >
                          {DIGIT_MEANINGS[num]?.aspect}:{" "}
                        </span>
                        <span
                          className="font-body text-xs"
                          style={{ color: "oklch(0.62 0.04 55)" }}
                        >
                          {DIGIT_MEANINGS[num]?.missing}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strong/Repeated Numbers */}
            {result.repeated.length > 0 && (
              <div
                className="rounded-xl p-4"
                style={{
                  background: "oklch(0.18 0.04 25)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                }}
              >
                <h3
                  className="font-heading text-sm font-bold mb-3"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  Strong / Repeated Numbers — Dominant Energies
                </h3>
                <div className="space-y-2">
                  {result.repeated.map((num) => (
                    <div
                      key={`repeated-${num}`}
                      className="flex gap-3 items-start"
                    >
                      <span
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-sm"
                        style={{
                          background: "oklch(0.68 0.20 48 / 0.20)",
                          color: "oklch(0.78 0.14 75)",
                        }}
                      >
                        {num}
                      </span>
                      <div>
                        <span
                          className="font-heading text-xs font-semibold"
                          style={{ color: "oklch(0.80 0.06 70)" }}
                        >
                          {DIGIT_MEANINGS[num]?.aspect}:{" "}
                        </span>
                        <span
                          className="font-body text-xs"
                          style={{ color: "oklch(0.62 0.04 55)" }}
                        >
                          {DIGIT_MEANINGS[num]?.present} (appears{" "}
                          {result.freq[num]} times)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Personality Summary */}
            <div
              className="rounded-xl p-4"
              style={{ background: "oklch(0.22 0.06 25 / 0.5)" }}
            >
              <h3
                className="font-heading text-sm font-bold mb-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Your Energetic Pattern
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.68 0.04 60)" }}
              >
                With {result.missing.length} missing number
                {result.missing.length !== 1 ? "s" : ""} and{" "}
                {result.repeated.length} dominant energ
                {result.repeated.length !== 1 ? "ies" : "y"}, your grid reflects
                a{" "}
                {result.missing.length > 3
                  ? "complex karmic journey with many areas to develop"
                  : result.missing.length === 0
                    ? "rare and complete energetic presence"
                    : "balanced yet purposeful path with specific growth areas"}
                . Focus on nurturing your missing numbers through conscious
                effort and spiritual practice.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "lo-shu-results",
                    "lo-shu-grid-result",
                    "Lo Shu Grid Calculator Result",
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="lo-shu.export_pdf_button"
              >
                {t("calculator.exportPdf", language)}
              </button>
              <a
                href="/astrologer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                }}
                data-ocid="lo-shu.consult_astrologer_link"
              >
                Talk to Astrologer
              </a>
            </div>
          </div>
        )}

        {/* ── Informational Sections ── */}
        <InfoSection title="What is the Lo Shu Grid?">
          <p>
            The Lo Shu Grid is a 3x3 magic square where all rows, columns, and
            diagonals add up to 15. In Chinese numerology, this grid is
            considered one of the most powerful tools for understanding human
            nature. The digits from your date of birth are placed into specific
            positions in the grid, and their presence, absence, or repetition
            reveals detailed insights about your life.
          </p>
          <p>
            The nine positions in the grid represent different aspects of life —
            from communication and creativity to wisdom and spirituality. When a
            number appears multiple times, that energy is amplified. When a
            number is absent, that area of life may present challenges or karmic
            lessons.
          </p>
        </InfoSection>

        <InfoSection
          title="History of Lo Shu Grid in Chinese Numerology"
          alternate
        >
          <p>
            The Lo Shu Grid has a legendary origin in ancient China, dating back
            over 4,000 years. According to legend, Emperor Yu of the Xia dynasty
            saw a divine turtle emerge from the Lo River. On its back was a
            magical pattern of dots forming the 3x3 magic square — each row,
            column, and diagonal summing to 15. This became the Lo Shu, or "Lo
            River Writing."
          </p>
          <p>
            Over millennia, Chinese scholars, Taoist priests, and Feng Shui
            masters studied the Lo Shu extensively. It became foundational in
            Chinese cosmology, Feng Shui, traditional medicine, and astrology.
            The grid was used to map energy flows in spaces, time cycles, and
            the human constitution — ultimately evolving into the numerological
            system we use today.
          </p>
        </InfoSection>

        <InfoSection title="How to Read Your Lo Shu Grid">
          <p>
            Reading the Lo Shu Grid involves understanding three key aspects:
            which numbers are present, which are absent, and which are repeated.
          </p>
          <ul className="space-y-2 list-none pl-0">
            {[
              {
                icon: "●",
                title: "Present Numbers",
                desc: "Numbers that appear once indicate a balanced expression of that energy in your life.",
              },
              {
                icon: "●●",
                title: "Repeated Numbers",
                desc: "Numbers appearing multiple times signal dominant or excess energy — powerful but needing direction.",
              },
              {
                icon: "○",
                title: "Missing Numbers",
                desc: "Absent numbers represent karmic lessons, challenges, or areas needing conscious development.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span
                  className="shrink-0 font-heading font-bold text-xs mt-0.5 w-8"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {item.icon}
                </span>
                <div>
                  <span
                    className="font-heading font-semibold text-sm"
                    style={{ color: "oklch(0.80 0.06 70)" }}
                  >
                    {item.title}:{" "}
                  </span>
                  {item.desc}
                </div>
              </li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title="Planes and Arrows in Lo Shu Grid" alternate>
          <p>
            The Lo Shu Grid is divided into three planes, each representing a
            dimension of human experience:
          </p>
          <div className="space-y-3 mt-2">
            {[
              {
                plane: "Mental Plane (3-5-7)",
                desc: "The middle row represents thinking, intellect, and mental capacity. A complete row here (all three numbers present) forms the Arrow of the Intellect.",
              },
              {
                plane: "Emotional Plane (4-9-2)",
                desc: "The top row reflects emotional sensitivity, creativity, and spiritual awareness. The Arrow of Sensitivity indicates a deeply feeling, intuitive personality.",
              },
              {
                plane: "Practical Plane (1-6-8)",
                desc: "The bottom row governs material matters, action, and communication in the physical world. The Arrow of Practicality shows strong real-world capabilities.",
              },
            ].map((item) => (
              <div key={item.plane} className="flex gap-3">
                <span
                  className="shrink-0 font-heading font-bold text-xs mt-0.5"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  {item.plane.split(" ")[0]}:
                </span>
                <p>
                  <strong style={{ color: "oklch(0.80 0.06 70)" }}>
                    {item.plane}
                  </strong>{" "}
                  — {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-2">
            When all three numbers in any row, column, or diagonal are present,
            they form an "Arrow of Pythagoras" — a special indicator of
            concentrated energy. Vertical arrows relate to thought-to-action
            (column 3-2-1 or 9-5-1), while diagonal arrows indicate unique gifts
            or challenges.
          </p>
        </InfoSection>

        <InfoSection title="Missing Numbers and Their Effects">
          <p>
            Missing numbers are not a curse — they are invitations. Each absent
            digit in your grid represents an area where life will repeatedly
            bring lessons until you develop that energy consciously. Recognizing
            your missing numbers is the first step toward spiritual and personal
            completeness.
          </p>
          <p>
            For example, someone missing number 2 may struggle with trusting
            their intuition and may benefit from meditation and emotional
            intelligence practices. Someone missing 7 may be challenged to
            explore spirituality beyond material pursuits. Through awareness and
            intentional practice, the energy of any missing number can be
            cultivated.
          </p>
        </InfoSection>

        <InfoSection title="How Lo Shu Grid Helps in Life" alternate>
          <p>
            Beyond personality insights, the Lo Shu Grid serves as a practical
            map for self-improvement. By understanding which energies are strong
            in your nature, you can align your career, relationships, and
            spiritual practice accordingly.
          </p>
          <p>
            Feng Shui practitioners also use the Lo Shu Grid to align living
            spaces with favorable energy directions based on your birth year.
            The grid's applications extend to timing decisions, choosing
            compatible partners, and identifying favorable periods for important
            life moves.
          </p>
        </InfoSection>

        <InfoSection title="Conclusion">
          <p>
            The Lo Shu Grid is one of numerology's most holistic and visually
            powerful tools. It does not just assign you a single number — it
            maps your entire energetic constitution in a spatial grid, showing
            the full landscape of your strengths and growth areas at a glance.
          </p>
          <p>
            Whether you're exploring numerology for the first time or deepening
            an existing practice, the Lo Shu Grid offers profound insight into
            the cosmic energies that shape your life. For a complete analysis
            including directional Feng Shui, Vedic astrology correlations, and
            personalized remedies, our expert astrologers can guide you with
            precision and compassion.
          </p>
        </InfoSection>

        {/* ── Discover More ── */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.07 28) 0%, oklch(0.17 0.06 24) 100%)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
          data-ocid="lo-shu.discover_more"
        >
          <h2
            className="font-heading text-xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("calculator.discoverMore", language)}
          </h2>
          <p
            className="font-body text-sm mb-5 max-w-lg mx-auto"
            style={{ color: "oklch(0.65 0.05 60)" }}
          >
            {t("calculator.readyToUnlock", language)}{" "}
            {t("calculator.exploreCalculators", language)}
          </p>
          <a
            href="/calculator-index"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
            data-ocid="lo-shu.all_calculators_link"
          >
            Explore All Calculators →
          </a>
        </div>

        {/* ── FAQs ── */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
          data-ocid="lo-shu.faqs"
        >
          <h2
            className="font-heading text-xl font-bold mb-5 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("calculator.faqs", language)}
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.78 0.14 75 / 0.12)" }}
                data-ocid={`lo-shu.faq.item.${i + 1}`}
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
