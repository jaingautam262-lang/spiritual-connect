import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePdfExport } from "@/hooks/usePdfExport";
import { useState } from "react";

// ─── Numerology Data ──────────────────────────────────────────────────────────
const COMPATIBLE_PAIRS: Record<number, number[]> = {
  1: [1, 5, 7],
  2: [2, 4, 8],
  3: [3, 6, 9],
  4: [2, 4, 8],
  5: [1, 5, 7],
  6: [3, 6, 9],
  7: [1, 5, 7],
  8: [2, 4, 8],
  9: [3, 6, 9],
};

const VEHICLE_NUMBER_MEANINGS: Record<number, string> = {
  1: "Number 1 vehicles bring leadership energy. They suit confident, ambitious people who are natural leaders.",
  2: "Number 2 vehicles bring balance and harmony. Ideal for family-oriented, cooperative, and diplomatic individuals.",
  3: "Number 3 vehicles bring creativity and joy. Perfect for optimistic, expressive, and artistic personalities.",
  4: "Number 4 vehicles bring stability and security. Excellent for practical, disciplined, and reliable individuals.",
  5: "Number 5 vehicles bring adventure and freedom. Great for dynamic, freedom-loving, and versatile personalities.",
  6: "Number 6 vehicles bring love and responsibility. Suited for caring, nurturing, and family-focused individuals.",
  7: "Number 7 vehicles bring spiritual insight. Perfect for introspective, analytical, and spiritually inclined people.",
  8: "Number 8 vehicles bring financial power. Excellent for ambitious, business-minded, and success-driven individuals.",
  9: "Number 9 vehicles bring humanitarian energy. Ideal for compassionate, giving, and wisdom-seeking personalities.",
};

const LUCKY_COLORS: Record<number, string[]> = {
  1: ["Gold", "Orange", "Yellow"],
  2: ["White", "Silver", "Cream"],
  3: ["Yellow", "Gold", "Citrine"],
  4: ["Blue", "Grey", "Black"],
  5: ["Green", "White", "Turquoise"],
  6: ["Pink", "Light Blue", "Pastel Green"],
  7: ["Violet", "Purple", "White"],
  8: ["Dark Blue", "Black", "Dark Grey"],
  9: ["Red", "Maroon", "Gold"],
};

const LIFE_PATH_MEANINGS: Record<number, string> = {
  1: "You are a born leader — independent, ambitious, and determined. Your life path thrives on originality and initiative.",
  2: "You are a natural diplomat — cooperative, sensitive, and relationship-oriented. Harmony and balance define your path.",
  3: "You are a creative communicator — expressive, joyful, and socially gifted. Self-expression is your greatest gift.",
  4: "You are a builder — practical, disciplined, and hardworking. Stability and order are your foundations.",
  5: "You are an adventurer — dynamic, curious, and free-spirited. Change and freedom fuel your journey.",
  6: "You are a nurturer — caring, responsible, and family-devoted. Service and love define your life purpose.",
  7: "You are a seeker — introspective, analytical, and spiritually inclined. Wisdom and inner truth guide your path.",
  8: "You are a powerhouse — ambitious, authoritative, and materially focused. Success and achievement are your calling.",
  9: "You are a humanitarian — compassionate, wise, and universally minded. Service to the greater good fulfills you.",
};

// ─── Calculation Logic ────────────────────────────────────────────────────────
function reduceToSingle(input: number): number {
  let n = input;
  while (n > 9) {
    n = String(n)
      .split("")
      .reduce((acc, d) => acc + Number.parseInt(d, 10), 0);
  }
  return n;
}

function calcVehicleDigit(regNumber: string): number {
  const digits = regNumber
    .split("")
    .filter((c) => c >= "0" && c <= "9")
    .map((c) => Number.parseInt(c, 10));
  if (digits.length === 0) return 0;
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceToSingle(sum);
}

function calcLifePath(day: number, month: number, year: number): number {
  const all = `${day}${month}${year}`
    .split("")
    .reduce((a, d) => a + Number.parseInt(d, 10), 0);
  return reduceToSingle(all);
}

type CompatibilityLevel = "High" | "Medium" | "Low";

interface VehicleResult {
  vehicleDigit: number;
  lifePath: number;
  compatibility: CompatibilityLevel;
  vehicleMeaning: string;
  lifePathMeaning: string;
  luckyColors: string[];
  advice: string;
}

function getCompatibility(v: number, lp: number): CompatibilityLevel {
  if (v === 0 || lp === 0) return "Low";
  const compatible = COMPATIBLE_PAIRS[v] ?? [];
  if (compatible.includes(lp)) return "High";
  if (compatible.some((n) => Math.abs(n - lp) === 1)) return "Medium";
  return "Low";
}

function getAdvice(
  compatibility: CompatibilityLevel,
  vehicleDigit: number,
  lifePath: number,
): string {
  if (compatibility === "High") {
    return `Your vehicle number ${vehicleDigit} resonates beautifully with your life path number ${lifePath}. This vehicle aligns with your personal energy, supporting smooth journeys and positive experiences. Keep this vehicle well-maintained and it will serve you faithfully.`;
  }
  if (compatibility === "Medium") {
    return `Your vehicle number ${vehicleDigit} has a moderate relationship with your life path number ${lifePath}. You may experience some friction but also many positive journeys. Consider wearing the lucky color of your vehicle number, and maintain regular vehicle servicing.`;
  }
  return `Your vehicle number ${vehicleDigit} and life path number ${lifePath} have different energy frequencies. Consider numerological remedies: place a small yantra or sacred symbol inside the vehicle, use the lucky colors from your vehicle number, and recite a protection mantra before driving. You may also consult an astrologer about a more compatible registration plate.`;
}

// ─── Form Helpers ─────────────────────────────────────────────────────────────
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
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
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i);

const inputStyle = {
  background: "oklch(0.20 0.05 25)",
  border: "1px solid oklch(0.78 0.14 75 / 0.20)",
  color: "oklch(0.90 0.03 80)",
};

const labelStyle = { color: "oklch(0.65 0.08 60)" };

const COMPAT_COLORS: Record<CompatibilityLevel, string> = {
  High: "oklch(0.62 0.18 145)",
  Medium: "oklch(0.72 0.16 75)",
  Low: "oklch(0.60 0.20 25)",
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function SelectField({
  value,
  onChange,
  children,
  ariaLabel,
}: {
  value: string | number;
  onChange: (v: string) => void;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 px-3 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
      style={inputStyle}
    >
      {children}
    </select>
  );
}

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

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How do I know if my vehicle number is lucky?",
    a: "Calculate the single-digit sum of all numeric digits in your registration plate. Then calculate your Life Path number (sum of all digits in your date of birth, reduced to a single digit). If your vehicle number and life path number are numerologically compatible — such as both belonging to the same elemental group (1-5-7, 2-4-8, or 3-6-9) — your vehicle number is considered lucky for you.",
  },
  {
    q: "Which number is most lucky for vehicles?",
    a: "Number 1 is considered highly auspicious for new beginnings and leadership. Number 6 is excellent for family vehicles and safe travel. Number 9 is revered in many traditions for its completeness and universal energy. However, the luckiest number ultimately depends on your personal numerology — specifically your life path number and what numerological frequencies align with yours.",
  },
  {
    q: "Can I change my vehicle number for better luck?",
    a: "In many states, you can apply for a preferred or fancy registration number through your regional transport office (RTO) by paying a fee. This allows you to choose a number that aligns with your numerological profile. Alternatively, you can apply numerological remedies to your existing vehicle — like using lucky colors, placing protective symbols, and performing vehicle puja — to harmonize the energy.",
  },
  {
    q: "Does vehicle number affect accidents?",
    a: "Numerology suggests that incompatible vehicle numbers may create subtle energy friction, potentially contributing to stress while driving or unfavorable experiences. However, accidents are primarily caused by driver behavior, road conditions, and mechanical issues. A numerologically favorable vehicle number may support calm, focused driving — but safety ultimately comes from mindful driving practices.",
  },
  {
    q: "What if my vehicle number adds to a master number like 11 or 22?",
    a: "In some numerology systems, master numbers 11, 22, and 33 are not reduced further because they carry amplified energy. Number 11 is the Master Intuition number, associated with heightened spiritual awareness. Number 22 is the Master Builder, associated with manifesting grand ambitions. If your vehicle number sums to a master number, it is considered especially powerful — though the high vibration requires conscious, responsible use.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LuckyVehicleCalculator() {
  const { exportToPdf } = usePdfExport();

  const [name, setName] = useState("");
  const [vehicleReg, setVehicleReg] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [result, setResult] = useState<VehicleResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const canCalculate =
    name.trim() && vehicleReg.trim() && birthDay && birthMonth && birthYear;

  function handleCalculate() {
    if (!canCalculate) return;
    const vDigit = calcVehicleDigit(vehicleReg);
    const lp = calcLifePath(
      Number.parseInt(birthDay, 10),
      Number.parseInt(birthMonth, 10),
      Number.parseInt(birthYear, 10),
    );
    if (vDigit === 0) return;
    const compatibility = getCompatibility(vDigit, lp);
    setResult({
      vehicleDigit: vDigit,
      lifePath: lp,
      compatibility,
      vehicleMeaning: VEHICLE_NUMBER_MEANINGS[vDigit] ?? "",
      lifePathMeaning: LIFE_PATH_MEANINGS[lp] ?? "",
      luckyColors: LUCKY_COLORS[vDigit] ?? [],
      advice: getAdvice(compatibility, vDigit, lp),
    });
    setSubmitted(true);
    setTimeout(() => {
      document
        .getElementById("vehicle-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.05 22) 0%, oklch(0.13 0.04 20) 100%)",
      }}
      data-ocid="vehicle-calculator-page"
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
        <div className="text-4xl mb-3" style={{ color: "oklch(0.78 0.14 75)" }}>
          &#128663;
        </div>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Lucky Vehicle Number Calculator
        </h1>
        <p
          className="font-body text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.62 0.06 60)" }}
        >
          Discover whether your vehicle registration number aligns with your
          personal numerology and life path energy.
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
        >
          <h2
            className="font-heading text-lg font-bold mb-6 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Check Your Vehicle&apos;s Lucky Number
          </h2>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="vehicle-name"
                className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
                style={labelStyle}
              >
                Your Name *
              </label>
              <input
                id="vehicle-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
                style={inputStyle}
                data-ocid="vehicle-calc.name_input"
              />
            </div>

            {/* Vehicle Registration Number */}
            <div>
              <label
                htmlFor="vehicle-reg"
                className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
                style={labelStyle}
              >
                Vehicle Registration Number *{" "}
                <span
                  className="font-devanagari font-normal normal-case ml-1"
                  style={{ color: "oklch(0.58 0.06 60)" }}
                >
                  / वाहन पंजीकरण संख्या
                </span>
              </label>
              <input
                id="vehicle-reg"
                type="text"
                value={vehicleReg}
                onChange={(e) => setVehicleReg(e.target.value.toUpperCase())}
                placeholder="e.g. MH 12 AB 3456"
                className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
                style={inputStyle}
                data-ocid="vehicle-calc.registration_input"
              />
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.55 0.04 55)" }}
              >
                Only the numeric digits are used in calculation.
              </p>
            </div>

            {/* Date of Birth */}
            <div>
              <p
                className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
                style={labelStyle}
              >
                Date of Birth *
              </p>
              <div className="flex gap-2">
                <SelectField
                  value={birthDay}
                  onChange={setBirthDay}
                  ariaLabel="Birth Day"
                >
                  <option value="">Day</option>
                  {DAYS.map((d) => (
                    <option key={String(d)} value={String(d)}>
                      {d}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  value={birthMonth}
                  onChange={setBirthMonth}
                  ariaLabel="Birth Month"
                >
                  <option value="">Month</option>
                  {MONTHS.map((m, i) => (
                    <option key={m} value={String(i + 1)}>
                      {m}
                    </option>
                  ))}
                </SelectField>
                <SelectField
                  value={birthYear}
                  onChange={setBirthYear}
                  ariaLabel="Birth Year"
                >
                  <option value="">Year</option>
                  {YEARS.map((y) => (
                    <option key={String(y)} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </SelectField>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center pt-2">
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
                data-ocid="vehicle-calc.calculate_button"
              >
                Check My Lucky Number
              </button>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        {submitted && result && (
          <div
            id="vehicle-results"
            className="rounded-2xl p-6 md:p-8 space-y-6"
            style={{
              background: "oklch(0.19 0.06 26)",
              border: `2px solid ${COMPAT_COLORS[result.compatibility]} / 0.40`,
              boxShadow: "0 0 40px oklch(0.62 0.18 48 / 0.12)",
            }}
            data-ocid="vehicle-calc.results"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2
                className="font-heading text-xl font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Your Vehicle Reading
              </h2>
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "vehicle-results",
                    `vehicle-reading-${name.replace(/\s+/g, "-").toLowerCase()}`,
                    `Lucky Vehicle Number Reading for ${name}`,
                  )
                }
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-heading font-semibold transition-all duration-200 hover:opacity-80"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.30)",
                }}
                data-ocid="vehicle-calc.export_pdf_button"
              >
                Export PDF
              </button>
            </div>

            {/* Top summary row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Vehicle Digit */}
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <p
                  className="font-heading text-xs uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.65 0.08 60)" }}
                >
                  Vehicle Number
                </p>
                <p
                  className="font-heading text-4xl font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {result.vehicleDigit}
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "oklch(0.62 0.05 60)" }}
                >
                  {vehicleReg}
                </p>
              </div>

              {/* Life Path */}
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <p
                  className="font-heading text-xs uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.65 0.08 60)" }}
                >
                  Your Life Path
                </p>
                <p
                  className="font-heading text-4xl font-bold"
                  style={{ color: "oklch(0.68 0.16 90)" }}
                >
                  {result.lifePath}
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "oklch(0.62 0.05 60)" }}
                >
                  {birthDay}/{birthMonth}/{birthYear}
                </p>
              </div>

              {/* Compatibility */}
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: `1px solid ${COMPAT_COLORS[result.compatibility]} / 0.35`,
                }}
              >
                <p
                  className="font-heading text-xs uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.65 0.08 60)" }}
                >
                  Compatibility
                </p>
                <p
                  className="font-heading text-3xl font-bold"
                  style={{ color: COMPAT_COLORS[result.compatibility] }}
                >
                  {result.compatibility}
                </p>
                <div
                  className="w-16 h-2 rounded-full mx-auto mt-2"
                  style={{
                    background:
                      result.compatibility === "High"
                        ? "oklch(0.62 0.18 145)"
                        : result.compatibility === "Medium"
                          ? "oklch(0.72 0.16 75)"
                          : "oklch(0.60 0.20 25)",
                  }}
                />
              </div>
            </div>

            {/* Vehicle Meaning */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "oklch(0.20 0.065 28)",
                border: "1px solid oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <h3
                className="font-heading text-base font-bold mb-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Vehicle Number {result.vehicleDigit} — Energy Profile
              </h3>
              <p
                className="font-body text-sm leading-relaxed mb-3"
                style={{ color: "oklch(0.72 0.04 65)" }}
              >
                {result.vehicleMeaning}
              </p>
              <h3
                className="font-heading text-base font-bold mb-2"
                style={{ color: "oklch(0.68 0.16 90)" }}
              >
                Life Path {result.lifePath} — Your Personal Energy
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.72 0.04 65)" }}
              >
                {result.lifePathMeaning}
              </p>
            </div>

            {/* Lucky Colors */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "oklch(0.20 0.055 25)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <h3
                className="font-heading text-base font-bold mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Lucky Colors for Your Vehicle
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.luckyColors.map((color) => (
                  <span
                    key={color}
                    className="px-3 py-1.5 rounded-full text-sm font-heading font-semibold"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.15)",
                      color: "oklch(0.78 0.14 75)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                    }}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Advice */}
            <div
              className="rounded-xl p-5"
              style={{
                background: `${COMPAT_COLORS[result.compatibility]} / 0.08`,
                border: `1px solid ${COMPAT_COLORS[result.compatibility]} / 0.25`,
              }}
            >
              <h3
                className="font-heading text-base font-bold mb-2"
                style={{ color: COMPAT_COLORS[result.compatibility] }}
              >
                Personalized Advice
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.72 0.04 65)" }}
              >
                {result.advice}
              </p>
            </div>

            {/* CTAs */}
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
                data-ocid="vehicle-calc.talk_astrologer_cta"
              >
                Talk to Astrologer
              </a>
              <a
                href="/astrologer-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="vehicle-calc.chat_astrologer_cta"
              >
                Chat with Astrologer
              </a>
            </div>
          </div>
        )}

        {/* ─── Informational Content ────────────────────────────────────────── */}
        <InfoSection title="Have you ever wondered why some vehicles just 'click'?">
          <p>
            Have you ever wondered why some vehicles feel like they just
            &quot;click&quot; with you while others seem to bring constant
            trouble? In Indian numerology and Vedic astrology, your
            vehicle&apos;s registration number carries a specific energy
            vibration that can either align with or work against your personal
            lucky numbers.
          </p>
          <p>
            From ancient times, numbers have been understood as carriers of
            cosmic energy. Every digit from 1 to 9 has unique characteristics
            and planetary rulerships. The vehicle you drive accompanies you
            through your most important journeys — it makes profound sense to
            ensure its numerical energy supports rather than undermines yours.
          </p>
        </InfoSection>

        <InfoSection
          title="What is a Lucky Vehicle Number Calculator?"
          alternate
        >
          <p>
            A Lucky Vehicle Number Calculator is a numerology-based tool that
            analyzes the digits of your vehicle&apos;s registration number and
            compares them against your personal numerological profile —
            primarily your Life Path number derived from your date of birth.
          </p>
          <p>
            The calculator reduces your vehicle number and life path to single
            digits, then checks whether these two numbers are compatible
            according to traditional numerological pairing principles. The
            result tells you whether your vehicle&apos;s energy naturally
            supports your personal vibration or creates energetic friction.
          </p>
          <p>
            This tool is widely used in India before purchasing a new vehicle,
            selecting a registration number, or understanding why a particular
            vehicle has brought specific experiences into someone&apos;s life.
          </p>
        </InfoSection>

        <InfoSection title="How Does Vehicle Numerology Work?">
          <p>
            Vehicle numerology operates on the same principles as personal
            numerology. Every digit carries the energy of a specific planet: 1
            is ruled by the Sun, 2 by the Moon, 3 by Jupiter, 4 by Rahu, 5 by
            Mercury, 6 by Venus, 7 by Ketu, 8 by Saturn, and 9 by Mars.
          </p>
          <p>
            These planetary energies interact with your own planetary profile as
            defined by your date of birth. When your vehicle&apos;s planetary
            ruler is friendly toward your life path&apos;s planetary ruler, the
            vehicle supports your journeys energetically. When they conflict,
            the vehicle may create subtle resistance.
          </p>
          <p>
            Numerology also suggests that your vehicle reflects your current
            karmic state — the numbers you are drawn to and the vehicles you end
            up with are rarely coincidental from a cosmic perspective.
          </p>
        </InfoSection>

        <InfoSection title="How to Calculate Your Vehicle Number" alternate>
          <p>
            Calculating your vehicle number is simple. Take your full
            registration plate — for example, &quot;MH 12 AB 3456&quot; — and
            extract all the numeric digits: 1, 2, 3, 4, 5, 6.
          </p>
          <p>
            Add all these digits together: 1+2+3+4+5+6 = 21. Then reduce the
            result to a single digit by adding the digits again: 2+1 = 3. Your
            vehicle number is 3, ruled by Jupiter — bringing creativity, growth,
            and optimism to your journeys.
          </p>
          <p>
            Your Life Path number is calculated similarly: take your date of
            birth (for example, 15/08/1990) and add all digits: 1+5+0+8+1+9+9+0
            = 33, then 3+3 = 6. Your Life Path number is 6. Compare these two
            numbers using the compatibility matrix to determine your
            vehicle&apos;s alignment.
          </p>
        </InfoSection>

        <InfoSection title="Which Vehicle Numbers are Lucky?">
          <p>
            While every number has its own gifts, certain vehicle numbers are
            broadly considered favorable across different life purposes. Number
            1 vehicles are excellent for professionals and business owners who
            need confidence and authority on the road.
          </p>
          <p>
            Number 6 vehicles are widely favored for family cars, offering
            protective, nurturing energy that keeps families safe. Number 9
            vehicles carry a divine, complete energy and are considered
            universally protective. Number 5 vehicles are excellent for those
            who travel frequently, as they carry Mercury&apos;s restless,
            adaptable energy.
          </p>
          <p>
            Numbers 4 and 8 are more austere, associated with Saturn&apos;s
            discipline. They can be very reliable and durable vehicles but may
            require extra care and maintenance attention.
          </p>
        </InfoSection>

        <InfoSection
          title="Vehicle Number and Life Path Compatibility"
          alternate
        >
          <p>
            The core of vehicle numerology lies in compatibility between your
            vehicle number and your life path number. Numbers that share the
            same elemental group — 1, 5, and 7 (the fire group), 2, 4, and 8
            (the earth group), or 3, 6, and 9 (the water group) — are naturally
            compatible with each other.
          </p>
          <p>
            A Life Path 1 person driving a vehicle with number 5 or 7 will
            likely experience smooth, empowering journeys. A Life Path 3 person
            with a number 9 vehicle benefits from Jupiter&apos;s and Mars&apos;
            combined expansive and decisive energies.
          </p>
          <p>
            Cross-group combinations may still work well in practice, especially
            when other astrological and numerological factors are favorable.
            This calculator provides a starting point for self-awareness rather
            than a final verdict.
          </p>
        </InfoSection>

        <InfoSection title="Effects of Different Vehicle Numbers">
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Number 1:</strong>{" "}
            Sun-ruled. Brings authority, independence, and leadership energy to
            every journey. Excellent for solo travelers and executives.
          </p>
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Number 2:</strong>{" "}
            Moon-ruled. Emotionally sensitive, favors peaceful, harmonious
            travel. Best for family-oriented individuals.
          </p>
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Number 3:</strong>{" "}
            Jupiter-ruled. Brings joy, growth, and good fortune on journeys.
            Associated with learning and exploration.
          </p>
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Number 4:</strong>{" "}
            Rahu-ruled. Brings intensity and sudden changes. Durable and
            reliable but may require extra attention and repairs.
          </p>
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Number 5:</strong>{" "}
            Mercury-ruled. Quick, versatile, and adaptable. Excellent for
            business travel and frequent commuters.
          </p>
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Number 6:</strong>{" "}
            Venus-ruled. Comfortable, beautiful, and protective. Among the most
            favored for personal and family vehicles.
          </p>
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Number 7:</strong>{" "}
            Ketu-ruled. Spiritual, introspective energy. May attract unusual or
            serendipitous experiences during travel.
          </p>
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Number 8:</strong>{" "}
            Saturn-ruled. Long-lasting and durable but demanding. Ownership
            requires discipline and regular servicing.
          </p>
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Number 9:</strong>{" "}
            Mars-ruled. Powerful and dynamic energy. Considered universally
            protective and complete.
          </p>
        </InfoSection>

        <InfoSection title="How to Choose a Lucky Vehicle Number?" alternate>
          <p>
            If you have the opportunity to choose a vehicle registration number
            — either through an RTO fancy number application or when purchasing
            a new vehicle — use numerological compatibility as your guide.
          </p>
          <p>
            First, calculate your Life Path number from your date of birth. Then
            select a registration number whose digits, when summed and reduced,
            produce a number compatible with your life path. Prioritize numbers
            in the same elemental group as your life path number.
          </p>
          <p>
            Beyond compatibility, also consider the ruling planet of your
            preferred vehicle number and check whether that planet is
            well-positioned in your birth chart. A number ruled by a strong
            planet in your natal chart will serve you especially well.
          </p>
        </InfoSection>

        <InfoSection title="Conclusion">
          <p>
            Vehicle numerology is a fascinating and practical application of
            Vedic numerological principles to everyday life. While a lucky
            vehicle number cannot guarantee perfectly smooth journeys, it can
            subtly align your vehicle&apos;s energy with your personal vibration
            — supporting confidence, safety, and positive experiences on the
            road.
          </p>
          <p>
            Use this calculator as a starting point for self-awareness. Whether
            you are purchasing a new vehicle, analyzing your existing car, or
            simply exploring the hidden dimensions of numerology, the insights
            here offer a meaningful perspective that combines ancient wisdom
            with modern curiosity.
          </p>
          <p>
            For a deeper analysis — including how planetary periods in your
            Dasha cycle interact with your vehicle&apos;s number, and what
            astrological remedies can strengthen the energy — a personalized
            reading with an experienced astrologer will provide the most
            complete guidance.
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
          data-ocid="vehicle-calc.discover_more"
        >
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Discover More About Yourself
          </h2>
          <p
            className="font-body text-sm mb-6 max-w-lg mx-auto"
            style={{ color: "oklch(0.65 0.05 60)" }}
          >
            Ready to unlock deeper insights? Explore our personalized
            calculators that reveal hidden aspects of your personality and
            destiny.
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
              Spiritual Connect Store
            </h3>
            <p
              className="font-body text-sm leading-relaxed mb-3"
              style={{ color: "oklch(0.65 0.05 60)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting
              &amp; décor, Pooja essentials, and zodiac collection.
            </p>
            <p
              className="font-body text-sm font-medium"
              style={{ color: "oklch(0.72 0.06 65)" }}
            >
              Plus Much More — Compatibility calculators, birth chart
              generators, and personality assessments await your discovery.
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
            data-ocid="vehicle-calc.all_calculators_link"
          >
            Explore All Calculators
          </a>
        </div>

        {/* ── FAQs ── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
          data-ocid="vehicle-calc.faqs"
        >
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-6 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.78 0.14 75 / 0.12)" }}
                data-ocid="vehicle-calc.faq_item"
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
