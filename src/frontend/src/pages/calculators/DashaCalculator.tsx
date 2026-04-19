import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePdfExport } from "@/hooks/usePdfExport";
import { useState } from "react";

// ─── Nakshatra + Dasha Data ────────────────────────────────────────────────────
const NAKSHATRAS = [
  { name: "Ashwini", ruler: "Ketu", years: 7 },
  { name: "Bharani", ruler: "Venus", years: 20 },
  { name: "Krittika", ruler: "Sun", years: 6 },
  { name: "Rohini", ruler: "Moon", years: 10 },
  { name: "Mrigashira", ruler: "Mars", years: 7 },
  { name: "Ardra", ruler: "Rahu", years: 18 },
  { name: "Punarvasu", ruler: "Jupiter", years: 16 },
  { name: "Pushya", ruler: "Saturn", years: 19 },
  { name: "Ashlesha", ruler: "Mercury", years: 17 },
  { name: "Magha", ruler: "Ketu", years: 7 },
  { name: "Purva Phalguni", ruler: "Venus", years: 20 },
  { name: "Uttara Phalguni", ruler: "Sun", years: 6 },
  { name: "Hasta", ruler: "Moon", years: 10 },
  { name: "Chitra", ruler: "Mars", years: 7 },
  { name: "Swati", ruler: "Rahu", years: 18 },
  { name: "Vishakha", ruler: "Jupiter", years: 16 },
  { name: "Anuradha", ruler: "Saturn", years: 19 },
  { name: "Jyeshtha", ruler: "Mercury", years: 17 },
  { name: "Mula", ruler: "Ketu", years: 7 },
  { name: "Purva Ashadha", ruler: "Venus", years: 20 },
  { name: "Uttara Ashadha", ruler: "Sun", years: 6 },
  { name: "Shravana", ruler: "Moon", years: 10 },
  { name: "Dhanishtha", ruler: "Mars", years: 7 },
  { name: "Shatabhisha", ruler: "Rahu", years: 18 },
  { name: "Purva Bhadrapada", ruler: "Jupiter", years: 16 },
  { name: "Uttara Bhadrapada", ruler: "Saturn", years: 19 },
  { name: "Revati", ruler: "Mercury", years: 17 },
];

const DASHA_ORDER = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
];
const DASHA_YEARS: Record<string, number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

const MAHADASHA_INTERPRETATIONS: Record<string, string> = {
  Sun: "The Sun Mahadasha (6 years) brings leadership opportunities, government recognition, and a stronger sense of self. This is a period of authority, confidence, and possibly conflict with authority figures. Health and vitality are highlighted.",
  Moon: "The Moon Mahadasha (10 years) emphasizes emotional life, family matters, and intuition. Home, mother, and emotional wellbeing take center stage. Travel and changes in residence are common. Mental peace requires attention.",
  Mars: "The Mars Mahadasha (7 years) ignites energy, ambition, and competitive drive. Career gains through effort and courage are possible. Property matters and siblings are highlighted. Avoid impulsive decisions and accidents.",
  Rahu: "The Rahu Mahadasha (18 years) brings dramatic life changes, foreign connections, and unconventional experiences. Ambition peaks, and unexpected events shape destiny. This period can bring both sudden gains and sudden losses.",
  Jupiter:
    "The Jupiter Mahadasha (16 years) is one of the most auspicious periods, bringing wisdom, spiritual growth, marriage, children, and prosperity. Teachers and mentors appear. Religious and educational pursuits flourish.",
  Saturn:
    "The Saturn Mahadasha (19 years) tests patience and builds lasting foundations. Hard work pays off slowly but surely. Career discipline and responsibility increase. Health challenges may arise but strengthen character.",
  Mercury:
    "The Mercury Mahadasha (17 years) enhances communication, business, and intellectual pursuits. Writing, trading, and learning are favored. Short travels and sibling relationships come into focus.",
  Ketu: "The Ketu Mahadasha (7 years) brings spiritual insights and detachment from materialism. Past-life karma surfaces. Introspection and inner growth are highlighted. Unexpected separations and health concerns may arise.",
  Venus:
    "The Venus Mahadasha (20 years) is the longest and often the most enjoyable — bringing love, beauty, luxury, and creative success. Relationships flourish and material comforts abound. Arts and cultural pursuits thrive.",
};

const PLANET_COLORS: Record<string, string> = {
  Sun: "oklch(0.72 0.18 65)",
  Moon: "oklch(0.78 0.10 225)",
  Mars: "oklch(0.60 0.22 25)",
  Rahu: "oklch(0.50 0.08 280)",
  Jupiter: "oklch(0.68 0.16 90)",
  Saturn: "oklch(0.55 0.08 250)",
  Mercury: "oklch(0.62 0.16 155)",
  Ketu: "oklch(0.58 0.12 35)",
  Venus: "oklch(0.68 0.18 345)",
};

// ─── Calculation Logic ─────────────────────────────────────────────────────────
interface DashaEntry {
  planet: string;
  startDate: Date;
  endDate: Date;
}

interface DashaResult {
  nakshatra: string;
  currentMahadasha: string;
  mahadashaEnd: Date;
  currentAntarDasha: string;
  antarDashaEnd: Date;
  timeline: DashaEntry[];
  interpretation: string;
}

function calcDasha(day: number, month: number, year: number): DashaResult {
  // Simplified moon longitude
  const moonLong =
    (((day * 12.19 + month * 30 + (year - 2000) * 0.985) % 360) + 360) % 360;
  const nakshatraIdx = Math.floor(moonLong / 13.333) % 27;
  const nakshatra = NAKSHATRAS[nakshatraIdx];

  // Elapsed fraction in current nakshatra
  const elapsed = (moonLong % 13.333) / 13.333;
  const firstDashaRemaining = nakshatra.years * (1 - elapsed);

  const birthDate = new Date(year, month - 1, day);

  // Build full 120-year dasha timeline
  const startIdx = DASHA_ORDER.indexOf(nakshatra.ruler);
  const timeline: DashaEntry[] = [];
  let cursor = new Date(birthDate);
  // First dasha — partial
  const firstEnd = new Date(cursor);
  firstEnd.setFullYear(
    firstEnd.getFullYear() + Math.floor(firstDashaRemaining),
  );
  firstEnd.setMonth(
    firstEnd.getMonth() + Math.round((firstDashaRemaining % 1) * 12),
  );
  timeline.push({
    planet: DASHA_ORDER[startIdx],
    startDate: new Date(cursor),
    endDate: new Date(firstEnd),
  });
  cursor = new Date(firstEnd);

  for (let i = 1; i < 9; i++) {
    const planet = DASHA_ORDER[(startIdx + i) % 9];
    const yrs = DASHA_YEARS[planet];
    const end = new Date(cursor);
    end.setFullYear(end.getFullYear() + yrs);
    timeline.push({
      planet,
      startDate: new Date(cursor),
      endDate: new Date(end),
    });
    cursor = new Date(end);
  }

  const today = new Date();

  // Find current Mahadasha
  let currentMaha = timeline[timeline.length - 1];
  for (const entry of timeline) {
    if (today >= entry.startDate && today < entry.endDate) {
      currentMaha = entry;
      break;
    }
  }

  // Calculate Antar Dasha within current Mahadasha
  const mahaIdx = DASHA_ORDER.indexOf(currentMaha.planet);
  const mahaDurationMs =
    currentMaha.endDate.getTime() - currentMaha.startDate.getTime();
  let antarCursor = new Date(currentMaha.startDate);
  let currentAntar = currentMaha.planet;
  let antarEnd = new Date(currentMaha.endDate);

  for (let i = 0; i < 9; i++) {
    const antarPlanet = DASHA_ORDER[(mahaIdx + i) % 9];
    const fraction = DASHA_YEARS[antarPlanet] / 120;
    const antarMs = mahaDurationMs * fraction;
    const aEnd = new Date(antarCursor.getTime() + antarMs);
    if (today >= antarCursor && today < aEnd) {
      currentAntar = antarPlanet;
      antarEnd = aEnd;
      break;
    }
    antarCursor = aEnd;
  }

  return {
    nakshatra: nakshatra.name,
    currentMahadasha: currentMaha.planet,
    mahadashaEnd: currentMaha.endDate,
    currentAntarDasha: currentAntar,
    antarDashaEnd: antarEnd,
    timeline,
    interpretation: MAHADASHA_INTERPRETATIONS[currentMaha.planet] ?? "",
  };
}

function monthsDiff(a: Date, b: Date): number {
  return (
    (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  );
}

function yearsDiff(a: Date, b: Date): number {
  return Math.max(0, Math.floor(monthsDiff(a, b) / 12));
}

// ─── Form Helpers ──────────────────────────────────────────────────────────────
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
const YEARS = Array.from({ length: 120 }, (_, i) => CURRENT_YEAR - i);
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const SECONDS = Array.from({ length: 60 }, (_, i) => i);

const inputStyle = {
  background: "oklch(0.20 0.05 25)",
  border: "1px solid oklch(0.78 0.14 75 / 0.20)",
  color: "oklch(0.90 0.03 80)",
};

const labelStyle = {
  color: "oklch(0.65 0.08 60)",
};

// ─── Sub-components ────────────────────────────────────────────────────────────
function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
      style={labelStyle}
    >
      {children}
    </label>
  );
}

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

// ─── FAQs ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How to calculate Dasha period?",
    a: "Vimshottari Dasha is calculated based on the Moon's position at birth. The nakshatra occupied by the Moon determines the ruling planet and the starting Mahadasha. The elapsed portion of that nakshatra gives the remaining years of the first Dasha. Each Mahadasha then follows in a fixed sequence: Ketu (7 yrs), Venus (20), Sun (6), Moon (10), Mars (7), Rahu (18), Jupiter (16), Saturn (19), Mercury (17) — totaling 120 years.",
  },
  {
    q: "Which Mahadasha is lucky?",
    a: "Jupiter Mahadasha is widely considered the most auspicious, bringing wisdom, prosperity, spiritual growth, and beneficial life events. Venus Mahadasha is also very favorable, often associated with love, material success, and creative fulfillment. However, the experience depends heavily on Jupiter's or Venus's placement and strength in your individual birth chart.",
  },
  {
    q: "Which Dasha comes first?",
    a: "The first Dasha depends entirely on the Moon's nakshatra at the time of birth. For example, if you are born with the Moon in Ashwini, your first Dasha is Ketu (7 years). If born in Rohini, it is Moon Dasha (10 years). You typically begin mid-way through the first Dasha based on how much of that nakshatra the Moon had already traversed.",
  },
  {
    q: "Which Dasha is good for money?",
    a: "Jupiter, Venus, and Mercury Mahadashas are generally favorable for financial growth. Jupiter brings opportunities and prosperity, Venus brings luxury and material comfort, and Mercury enhances business acumen and trade. The 2nd, 6th, 10th, and 11th house lords' Dasha periods are especially significant for income and wealth accumulation.",
  },
  {
    q: "Can Dasha periods be changed or remedied?",
    a: "You cannot change Dasha periods — they are determined by your birth chart. However, you can mitigate challenging influences through Vedic remedies: wearing gemstones corresponding to the ruling planet, performing specific pujas, chanting mantras, observing fasts, and charitable acts aligned with the planet's nature. Consulting a qualified Jyotishi provides the most personalized remedial guidance.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function DashaCalculator() {
  const { exportToPdf } = usePdfExport();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthHour, setBirthHour] = useState("0");
  const [birthMinute, setBirthMinute] = useState("0");
  const [birthSecond, setBirthSecond] = useState("0");
  const [unknownTime, setUnknownTime] = useState(false);
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [result, setResult] = useState<DashaResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const canCalculate =
    name.trim() && birthDay && birthMonth && birthYear && placeOfBirth.trim();

  function handleCalculate() {
    if (!canCalculate) return;
    const r = calcDasha(
      Number.parseInt(birthDay, 10),
      Number.parseInt(birthMonth, 10),
      Number.parseInt(birthYear, 10),
    );
    setResult(r);
    setSubmitted(true);
    setTimeout(() => {
      document
        .getElementById("dasha-results")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  const today = new Date();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.05 22) 0%, oklch(0.13 0.04 20) 100%)",
      }}
      data-ocid="dasha-calculator-page"
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
          &#9737;
        </div>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Vimshottari Dasha Calculator
        </h1>
        <p
          className="font-body text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.62 0.06 60)" }}
        >
          Discover your current Mahadasha, Antar Dasha, and complete 120-year
          planetary timeline based on Vedic astrology.
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
            Calculate Your Vimshottari Dasha
          </h2>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <FieldLabel htmlFor="dasha-name">Name *</FieldLabel>
              <input
                id="dasha-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
                style={inputStyle}
                data-ocid="dasha-calc.name_input"
              />
            </div>

            {/* Gender */}
            <div>
              <p
                className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
                style={labelStyle}
              >
                Gender *
              </p>
              <div className="flex gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-heading font-semibold transition-all duration-200"
                    style={{
                      background:
                        gender === g
                          ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                          : "oklch(0.22 0.06 25)",
                      color: gender === g ? "white" : "oklch(0.65 0.06 60)",
                      border:
                        gender === g
                          ? "1px solid oklch(0.78 0.14 75 / 0.3)"
                          : "1px solid oklch(0.78 0.14 75 / 0.15)",
                    }}
                    aria-pressed={gender === g}
                    data-ocid={`dasha-calc.gender_${g.toLowerCase()}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
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

            {/* Time of Birth */}
            <div>
              <p
                className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
                style={labelStyle}
              >
                Time of Birth
              </p>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  id="unknown-time"
                  checked={unknownTime}
                  onChange={(e) => setUnknownTime(e.target.checked)}
                  className="rounded"
                  data-ocid="dasha-calc.unknown_time_checkbox"
                />
                <label
                  htmlFor="unknown-time"
                  className="text-sm font-body cursor-pointer"
                  style={{ color: "oklch(0.70 0.05 60)" }}
                >
                  I don&apos;t know my time of birth
                </label>
              </div>
              {!unknownTime && (
                <div className="flex gap-2">
                  <SelectField
                    value={birthHour}
                    onChange={setBirthHour}
                    ariaLabel="Birth Hour"
                  >
                    {HOURS.map((h) => (
                      <option key={String(h)} value={String(h)}>
                        {String(h).padStart(2, "0")} Hr
                      </option>
                    ))}
                  </SelectField>
                  <SelectField
                    value={birthMinute}
                    onChange={setBirthMinute}
                    ariaLabel="Birth Minute"
                  >
                    {MINUTES.map((m) => (
                      <option key={String(m)} value={String(m)}>
                        {String(m).padStart(2, "0")} Min
                      </option>
                    ))}
                  </SelectField>
                  <SelectField
                    value={birthSecond}
                    onChange={setBirthSecond}
                    ariaLabel="Birth Second"
                  >
                    {SECONDS.map((s) => (
                      <option key={String(s)} value={String(s)}>
                        {String(s).padStart(2, "0")} Sec
                      </option>
                    ))}
                  </SelectField>
                </div>
              )}
            </div>

            {/* Place of Birth */}
            <div>
              <FieldLabel htmlFor="dasha-place">Place of Birth *</FieldLabel>
              <input
                id="dasha-place"
                type="text"
                value={placeOfBirth}
                onChange={(e) => setPlaceOfBirth(e.target.value)}
                placeholder="Enter your birth place"
                className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
                style={inputStyle}
                data-ocid="dasha-calc.place_input"
              />
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
                data-ocid="dasha-calc.calculate_button"
              >
                Calculate My Dasha
              </button>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        {submitted && result && (
          <div
            id="dasha-results"
            className="rounded-2xl p-6 md:p-8 space-y-6"
            style={{
              background: "oklch(0.19 0.06 26)",
              border: "2px solid oklch(0.78 0.14 75 / 0.30)",
              boxShadow: "0 0 40px oklch(0.62 0.18 48 / 0.12)",
            }}
            data-ocid="dasha-calc.results"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2
                className="font-heading text-xl font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Your Dasha Reading
              </h2>
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "dasha-results",
                    `dasha-reading-${name.replace(/\s+/g, "-").toLowerCase()}`,
                    `Vimshottari Dasha Reading for ${name}`,
                  )
                }
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-heading font-semibold transition-all duration-200 hover:opacity-80"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.30)",
                }}
                data-ocid="dasha-calc.export_pdf_button"
              >
                Export PDF
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Birth Nakshatra */}
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
                  Birth Nakshatra
                </p>
                <p
                  className="font-heading text-xl font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {result.nakshatra}
                </p>
              </div>

              {/* Current Mahadasha */}
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: `1px solid ${PLANET_COLORS[result.currentMahadasha] ?? "oklch(0.78 0.14 75)"} / 0.35`,
                }}
              >
                <p
                  className="font-heading text-xs uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.65 0.08 60)" }}
                >
                  Current Mahadasha
                </p>
                <p
                  className="font-heading text-xl font-bold"
                  style={{
                    color:
                      PLANET_COLORS[result.currentMahadasha] ??
                      "oklch(0.78 0.14 75)",
                  }}
                >
                  {result.currentMahadasha}
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "oklch(0.62 0.05 60)" }}
                >
                  {yearsDiff(today, result.mahadashaEnd)} yrs remaining
                </p>
              </div>

              {/* Current Antar Dasha */}
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: `1px solid ${PLANET_COLORS[result.currentAntarDasha] ?? "oklch(0.78 0.14 75)"} / 0.35`,
                }}
              >
                <p
                  className="font-heading text-xs uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.65 0.08 60)" }}
                >
                  Current Antar Dasha
                </p>
                <p
                  className="font-heading text-xl font-bold"
                  style={{
                    color:
                      PLANET_COLORS[result.currentAntarDasha] ??
                      "oklch(0.78 0.14 75)",
                  }}
                >
                  {result.currentAntarDasha}
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "oklch(0.62 0.05 60)" }}
                >
                  {Math.max(0, monthsDiff(today, result.antarDashaEnd))} months
                  remaining
                </p>
              </div>
            </div>

            {/* Interpretation */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "oklch(0.20 0.065 28)",
                border: "1px solid oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <h3
                className="font-heading text-base font-bold mb-2"
                style={{
                  color:
                    PLANET_COLORS[result.currentMahadasha] ??
                    "oklch(0.78 0.14 75)",
                }}
              >
                {result.currentMahadasha} Mahadasha Interpretation
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.72 0.04 65)" }}
              >
                {result.interpretation}
              </p>
            </div>

            {/* Upcoming Dasha */}
            {(() => {
              const idx = result.timeline.findIndex(
                (e) =>
                  e.planet === result.currentMahadasha &&
                  today >= e.startDate &&
                  today < e.endDate,
              );
              const next = result.timeline[idx + 1];
              if (!next) return null;
              return (
                <div
                  className="rounded-xl p-5 flex items-center gap-4"
                  style={{
                    background: "oklch(0.20 0.055 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                  }}
                >
                  <div>
                    <p
                      className="font-heading text-xs uppercase tracking-widest mb-1"
                      style={{ color: "oklch(0.65 0.08 60)" }}
                    >
                      Upcoming Mahadasha
                    </p>
                    <p
                      className="font-heading text-lg font-bold"
                      style={{
                        color:
                          PLANET_COLORS[next.planet] ?? "oklch(0.78 0.14 75)",
                      }}
                    >
                      {next.planet}
                    </p>
                    <p
                      className="font-body text-xs"
                      style={{ color: "oklch(0.62 0.05 60)" }}
                    >
                      Starts: {next.startDate.toLocaleDateString("en-IN")} —
                      Lasts {DASHA_YEARS[next.planet]} years
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Full Timeline */}
            <div>
              <h3
                className="font-heading text-base font-bold mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Your Complete Dasha Timeline
              </h3>
              <div className="space-y-2">
                {result.timeline.map((entry, i) => {
                  const isCurrent =
                    today >= entry.startDate && today < entry.endDate;
                  return (
                    <div
                      key={`${entry.planet}-${i}`}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 transition-all"
                      style={{
                        background: isCurrent
                          ? "oklch(0.24 0.08 32)"
                          : "oklch(0.21 0.055 26)",
                        border: isCurrent
                          ? `1px solid ${PLANET_COLORS[entry.planet] ?? "oklch(0.78 0.14 75)"}`
                          : "1px solid oklch(0.78 0.14 75 / 0.08)",
                      }}
                      data-ocid={`dasha-calc.timeline.item.${i + 1}`}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background:
                            PLANET_COLORS[entry.planet] ??
                            "oklch(0.78 0.14 75)",
                        }}
                      />
                      <span
                        className="font-heading font-semibold text-sm flex-1"
                        style={{
                          color: isCurrent
                            ? (PLANET_COLORS[entry.planet] ??
                              "oklch(0.78 0.14 75)")
                            : "oklch(0.75 0.05 65)",
                        }}
                      >
                        {entry.planet}
                        {isCurrent && (
                          <span
                            className="ml-2 text-xs px-1.5 py-0.5 rounded"
                            style={{
                              background: "oklch(0.68 0.20 48 / 0.20)",
                              color: "oklch(0.78 0.14 75)",
                            }}
                          >
                            Current
                          </span>
                        )}
                      </span>
                      <span
                        className="font-body text-xs"
                        style={{ color: "oklch(0.58 0.05 55)" }}
                      >
                        {entry.startDate.getFullYear()} —{" "}
                        {entry.endDate.getFullYear()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
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
                data-ocid="dasha-calc.talk_astrologer_cta"
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
                data-ocid="dasha-calc.chat_astrologer_cta"
              >
                Chat with Astrologer
              </a>
            </div>
          </div>
        )}

        {/* ─── Informational Content ─────────────────────────────────────────── */}
        <InfoSection title="What is Vimshottari Dasha?">
          <p>
            Vimshottari Dasha is one of the most widely used planetary period
            systems in Vedic astrology. The word "Vimshottari" means 120 in
            Sanskrit, representing the total cycle of 120 years covered by this
            system. It is based on the Moon's position in a specific Nakshatra
            (lunar mansion) at the time of birth.
          </p>
          <p>
            In Vedic astrology, your life is divided into planetary periods
            ruled by nine planets: Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter,
            Saturn, and Mercury. Each of these planets rules a specific number
            of years in this 120-year cycle, and these periods are known as
            Mahadashas. Within each Mahadasha, there are sub-periods called
            Antar Dashas, and further sub-sub-periods called Pratyantar Dashas.
          </p>
          <p>
            The Vimshottari Dasha system is considered highly accurate for
            predicting the timing of significant life events because it
            correlates cosmic cycles with individual experience in a precise and
            systematic way.
          </p>
        </InfoSection>

        <InfoSection title="What is Vimshottari Dasha Cycle?" alternate>
          <p>
            The Vimshottari Dasha Cycle spans 120 years and moves through nine
            planetary periods in a fixed sequence. The cycle begins with the
            planet ruling the birth Nakshatra and continues through all nine
            planets before repeating.
          </p>
          <p>
            The fixed order and durations are: Ketu (7 years), Venus (20 years),
            Sun (6 years), Moon (10 years), Mars (7 years), Rahu (18 years),
            Jupiter (16 years), Saturn (19 years), and Mercury (17 years). This
            totals exactly 120 years — the assumed maximum human lifespan in
            classical Vedic thought.
          </p>
          <p>
            Since no person completes the full 120-year cycle in a single
            lifetime, your chart shows only the relevant portion. The starting
            point is determined by which nakshatra the Moon occupied at birth
            and what fraction of that nakshatra had already elapsed.
          </p>
        </InfoSection>

        <InfoSection title="How Does Vimshottari Dasha Impact Your Life?">
          <p>
            Each planetary period activates the themes associated with its
            ruling planet and the houses it governs in your birth chart. A
            Jupiter Dasha, for example, tends to bring expansion, education,
            spirituality, and children — but only if Jupiter is well-placed in
            your natal chart.
          </p>
          <p>
            The Dasha system doesn't work in isolation — it interacts with your
            entire birth chart. A planet that is exalted or in its own sign will
            give very different results than a planet that is debilitated or
            afflicted. This is why the same Dasha produces vastly different
            outcomes for different individuals.
          </p>
          <p>
            Beyond individual planets, the Dasha of the 2nd lord may bring
            financial changes, the 7th lord's Dasha may bring relationship
            developments, and the 10th lord's Dasha often correlates with career
            milestones. Understanding which planet rules which life area for you
            specifically requires studying your complete birth chart.
          </p>
        </InfoSection>

        <InfoSection
          title="Why Knowing Your Vimshottari Dasha Is Important?"
          alternate
        >
          <p>
            Knowing your current Dasha provides a powerful lens through which to
            understand the timing of life events. Without this knowledge, you
            may feel confused about why certain periods seem filled with
            opportunities while others feel blocked or challenging.
          </p>
          <p>
            With Dasha awareness, you can proactively prepare for major periods,
            channel planetary energies wisely, and make more informed decisions.
            If you know a Saturn Dasha is approaching, you can begin laying
            disciplined foundations. If Venus Dasha is near, you can open your
            heart to love and creativity.
          </p>
          <p>
            Dasha knowledge also helps you avoid unnecessarily blaming yourself
            during difficult periods — sometimes cosmic timing simply demands
            patience, reflection, and inner work rather than external action.
          </p>
        </InfoSection>

        <InfoSection title="What are the Results obtained through Vimshottari Dasha?">
          <p>
            The results of Vimshottari Dasha are comprehensive and cover every
            major area of life. Career advancements, financial gains and losses,
            marriage, childbirth, health challenges, foreign travel, spiritual
            awakening, and even losses — all can be timed using the Dasha system
            in conjunction with planetary transits.
          </p>
          <p>
            The most important life events — marriage, career peaks, property
            acquisition, and health crises — typically occur when the Dasha lord
            activates specific sensitive points in the birth chart through
            conjunction, aspect, or transit.
          </p>
          <p>
            Experienced astrologers also look at the Dasha of the Atmakaraka
            (soul significator planet), the Dasha in the Navamsha chart (the
            divisional chart of marriage), and the yogas (special planetary
            combinations) that become activated during specific Dashas.
          </p>
        </InfoSection>

        <InfoSection title="What is Mahadasha?">
          <p>
            Mahadasha literally means "great period" in Sanskrit. It refers to
            the primary planetary period in the Vimshottari system — the major
            chapter of your life currently being written by a specific planet. A
            Mahadasha can last anywhere from 6 to 20 years depending on the
            ruling planet.
          </p>
          <p>
            During a Mahadasha, the qualities, themes, and karmic lessons
            associated with that planet become dominant in your experience. The
            planet acts as a cosmic director, coloring your perceptions, shaping
            opportunities, and presenting challenges aligned with its natural
            significations.
          </p>
        </InfoSection>

        <InfoSection title="What is the Maha Dasha Cycle?" alternate>
          <p>
            The Maha Dasha cycle follows the same nine-planet sequence as the
            full Vimshottari cycle. Starting from your birth nakshatra's ruling
            planet, the Mahadashas unfold in a predictable order, each giving
            way to the next after its allotted years are complete.
          </p>
          <p>
            Most people experience between four and six Mahadashas in their
            lifetime. Understanding this sequence allows you to anticipate the
            major thematic shifts in your life — from the expansive optimism of
            Jupiter to the disciplined testing of Saturn, or from the spiritual
            detachment of Ketu to the indulgent abundance of Venus.
          </p>
        </InfoSection>

        <InfoSection title="How Does Maha Dasha Impact Your Life?">
          <p>
            The Mahadasha of a benefic planet — Jupiter, Venus, or a strong Moon
            — typically brings growth, opportunities, relationships, and
            prosperity. The Mahadasha of a malefic planet — Saturn, Rahu, Ketu,
            or an afflicted Mars — tends to bring tests, delays, separations,
            and transformative challenges.
          </p>
          <p>
            Yet every Mahadasha, regardless of its nature, serves a purpose.
            Saturn Dasha builds enduring character. Rahu Dasha breaks old
            patterns and introduces new possibilities. Ketu Dasha strips away
            attachments to reveal deeper spiritual truth. The wisdom lies in
            working with the energy of the current Dasha rather than against it.
          </p>
        </InfoSection>

        <InfoSection
          title="Why Knowing Your Maha Dasha Is Important?"
          alternate
        >
          <p>
            Your Mahadasha is the single most important timing factor in your
            astrological life map. It tells you which planet is currently
            directing your soul's journey and what karmic themes are being
            worked through in this phase.
          </p>
          <p>
            This knowledge helps you align your efforts with cosmic timing —
            starting businesses during Mercury or Jupiter Dashas, focusing on
            relationships during Venus Dasha, and building discipline during
            Saturn Dasha. Misaligned effort — pushing career ambition during a
            deeply spiritual Ketu Dasha, for example — often yields frustration.
          </p>
        </InfoSection>

        <InfoSection title="What are the Results obtained through Maha Dasha?">
          <p>
            The results of each Mahadasha depend on the planet's strength, house
            placement, and the yogas it forms in your birth chart. A well-placed
            Jupiter Mahadasha can bring marriage, wealth, spiritual leadership,
            and children. A challenged Saturn Mahadasha may bring career
            obstacles, health concerns, and the slow dissolution of structures
            that no longer serve growth.
          </p>
          <p>
            In every case, the Mahadasha activates your karma — bringing forward
            the seeds planted in past lives or earlier in this life for harvest,
            transformation, or release. Understanding your Mahadasha helps you
            meet these moments with awareness and intention.
          </p>
        </InfoSection>

        <InfoSection title="What is Antar Dasha?">
          <p>
            Antar Dasha, also known as the sub-period or Bhukti, is the
            secondary planetary period within a Mahadasha. While the Mahadasha
            sets the broad theme for years, the Antar Dasha fine-tunes the
            experience by adding the flavor of a second planet.
          </p>
          <p>
            Within each Mahadasha, all nine planets rule successive Antar Dashas
            in the same fixed sequence. The duration of each Antar Dasha is
            proportional to the ratio of the sub-lord's years to 120, applied to
            the total Mahadasha duration.
          </p>
        </InfoSection>

        <InfoSection title="What is Antar Dasha Cycle?" alternate>
          <p>
            The Antar Dasha cycle mirrors the Mahadasha sequence but operates
            within the span of a single Mahadasha. For example, within a Jupiter
            Mahadasha (16 years), the Antar Dashas cycle through all nine
            planets starting from Jupiter itself, with each lasting a
            proportional fraction of those 16 years.
          </p>
          <p>
            These sub-periods allow for much more precise predictions. An event
            may be signified by the Mahadasha lord but actually manifests during
            a specific Antar Dasha when the supporting energies align to bring
            it into reality.
          </p>
        </InfoSection>

        <InfoSection title="How Does Antar Dasha Impact Your Life?">
          <p>
            The Antar Dasha creates a blend of two planetary energies. If you
            are in Jupiter Mahadasha with Venus Antar Dasha, this period blends
            Jupiter's wisdom and expansion with Venus's love and beauty — making
            it a particularly favorable time for marriage, artistic endeavors,
            and spiritual growth through devotion.
          </p>
          <p>
            Conversely, a Saturn Mahadasha with Rahu Antar Dasha may intensify
            challenges, bringing delays compounded by confusion, sudden changes,
            or unconventional situations. Yet even this combination has its
            gifts — deep karmic clearing and breakthrough insights.
          </p>
        </InfoSection>

        <InfoSection
          title="Why Knowing Your Antar Dasha Is Important?"
          alternate
        >
          <p>
            For precise timing of life events — knowing not just the year but
            the approximate month a major development may occur — the Antar
            Dasha is essential. Career changes, relationship milestones, health
            events, and spiritual awakenings frequently correspond to specific
            Antar Dasha periods.
          </p>
          <p>
            Knowing your Antar Dasha helps you fine-tune your strategy. Even
            within a challenging Mahadasha, certain Antar Dashas provide windows
            of opportunity and ease. Recognizing these windows allows you to
            time important decisions, initiatives, and rituals for maximum
            effectiveness.
          </p>
        </InfoSection>

        <InfoSection title="What are the Results obtained through Antar Dasha?">
          <p>
            Antar Dashas often correspond directly to specific events. Marriage
            frequently occurs during Venus Antar Dasha or Jupiter Antar Dasha
            within a favorable Mahadasha. Financial windfalls may appear during
            a Mercury or Jupiter Antar Dasha. Spiritual transformations tend to
            coincide with Ketu or Saturn Antar Dashas.
          </p>
          <p>
            The results are always shaped by both the Mahadasha and Antar Dasha
            lords' positions in the birth chart, the current transits, and the
            individual's free will and effort. Astrology reveals tendencies and
            timing — the quality of the experience is always influenced by
            consciousness and choice.
          </p>
        </InfoSection>

        <InfoSection title="Conclusion">
          <p>
            The Vimshottari Dasha system is one of Vedic astrology's most
            profound contributions to self-understanding. By mapping your life's
            cosmic timeline — from birth Nakshatra through the Mahadasha and
            Antar Dasha cycles — it provides a framework for understanding why
            certain periods feel expansive, why others demand patience, and what
            karma is ripening in the present moment.
          </p>
          <p>
            Use this calculator as a starting point for self-reflection. For
            deeper interpretation — including how your specific planetary
            placements, yogas, and natal chart shape the quality of each Dasha —
            a personalized reading with an experienced Vedic astrologer will
            offer the most meaningful and accurate guidance for your unique
            journey.
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
          data-ocid="dasha-calc.discover_more"
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
            data-ocid="dasha-calc.all_calculators_link"
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
          data-ocid="dasha-calc.faqs"
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
                data-ocid="dasha-calc.faq_item"
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
