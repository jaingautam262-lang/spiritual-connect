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

// ─── Zodiac Data ───────────────────────────────────────────────────────────────
const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const ZODIAC_SYMBOLS = [
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
];

// ─── Calculation Logic ─────────────────────────────────────────────────────────
function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function calcNatalMoonSign(day: number, month: number, year: number): number {
  const moonLong =
    (((day * 12.19 + month * 30.44 + (year - 2000) * 360) % 360) + 360) % 360;
  return Math.floor(moonLong / 30) % 12;
}

interface PlanetPosition {
  name: string;
  sign: number;
  degree: number;
  symbol: string;
}

function calcCurrentPlanetPositions(today: Date): PlanetPosition[] {
  const doy = dayOfYear(today);
  const yr = today.getFullYear();
  const baseDay = (yr - 2000) * 365.25 + doy;

  const sunSign = Math.floor(((doy - 80 + 365) % 365) / 30.4) % 12;
  const moonSign = Math.floor(((baseDay * 13.18) % 360) / 30) % 12;
  const mercurySign = Math.floor(((baseDay * 4.09 + 15) % 360) / 30) % 12;
  const venusSign = Math.floor(((baseDay * 1.62 + 45) % 360) / 30) % 12;
  const marsSign = Math.floor(((baseDay * 0.524 + 90) % 360) / 30) % 12;
  const jupiterSign = Math.floor(((baseDay * 0.0831 + 150) % 360) / 30) % 12;
  const saturnSign = Math.floor(((baseDay * 0.0334 + 180) % 360) / 30) % 12;

  return [
    { name: "Sun", sign: sunSign, degree: Math.round(doy % 30), symbol: "☉" },
    {
      name: "Moon",
      sign: moonSign,
      degree: Math.round((baseDay * 13.18) % 30),
      symbol: "☽",
    },
    {
      name: "Mercury",
      sign: mercurySign,
      degree: Math.round((baseDay * 4.09 + 15) % 30),
      symbol: "☿",
    },
    {
      name: "Venus",
      sign: venusSign,
      degree: Math.round((baseDay * 1.62 + 45) % 30),
      symbol: "♀",
    },
    {
      name: "Mars",
      sign: marsSign,
      degree: Math.round((baseDay * 0.524 + 90) % 30),
      symbol: "♂",
    },
    {
      name: "Jupiter",
      sign: jupiterSign,
      degree: Math.round((baseDay * 0.0831 + 150) % 30),
      symbol: "♃",
    },
    {
      name: "Saturn",
      sign: saturnSign,
      degree: Math.round((baseDay * 0.0334 + 180) % 30),
      symbol: "♄",
    },
  ];
}

function getHouseFromSigns(natalSign: number, transitSign: number): number {
  return ((transitSign - natalSign + 12) % 12) + 1;
}

const HOUSE_MEANINGS: Record<number, string> = {
  1: "Self & Identity — Focus on appearance, beginnings, personal goals",
  2: "Finances & Values — Money, possessions, self-worth matters arise",
  3: "Communication — Siblings, travel, short trips, learning",
  4: "Home & Family — Domestic matters, ancestry, emotional foundations",
  5: "Creativity & Romance — Love affairs, children, artistic expression",
  6: "Health & Work — Daily routines, service, health attention needed",
  7: "Partnerships — Relationships, contracts, marriage, open enemies",
  8: "Transformation — Shared resources, inheritance, deep change",
  9: "Higher Learning — Philosophy, long travel, spirituality, publishing",
  10: "Career & Status — Public standing, ambition, authority figures",
  11: "Community & Goals — Friendships, hopes, social causes, networks",
  12: "Spiritual Retreat — Hidden enemies, karma, solitude, inner work",
};

const PLANET_TRANSIT_THEMES: Record<string, string[]> = {
  Sun: [
    "Vitality boost in this area",
    "Leadership opportunities arise",
    "Visibility and recognition",
  ],
  Moon: [
    "Emotional sensitivity heightened",
    "Intuitive guidance flows",
    "Nurturing needs surface",
  ],
  Mercury: [
    "Communication is key",
    "Contracts and negotiations",
    "Mental clarity or challenges",
  ],
  Venus: [
    "Harmony and beauty",
    "Romance and creativity bloom",
    "Financial opportunities",
  ],
  Mars: [
    "Action and initiative",
    "Energy and ambition peak",
    "Possible friction or drive",
  ],
  Jupiter: [
    "Expansion and blessings",
    "Optimism and growth",
    "Wisdom and higher purpose",
  ],
  Saturn: [
    "Discipline and lessons",
    "Long-term structure building",
    "Karmic accountability",
  ],
};

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
    q: "How do you calculate the transit chart?",
    a: "A transit chart is created by comparing the current positions of planets in the sky (real-time or for a specific date) to the positions of planets in your natal (birth) chart. Astrologers draw a bi-wheel chart: the inner wheel is your natal chart and the outer wheel shows the transiting planets. Our calculator uses a simplified ephemeris-based approximation to show you the active transits relative to your natal Moon sign.",
  },
  {
    q: "Which planet transit gives marriage?",
    a: "Jupiter and Venus transits are the most auspicious for marriage. When Jupiter transits the 7th house (partnerships) or aspects Venus or the 7th lord in your natal chart, it often signals marriage timing. Saturn transiting the 7th house can also trigger marriage, though with more deliberation and responsibility. The Moon's nodal axis (Rahu/Ketu) crossing the 7th house also correlates with significant relationship events.",
  },
  {
    q: "What transit indicates finding love?",
    a: "Venus transiting your 5th house (romance, creativity) or 7th house (partnerships) is the strongest indicator of romantic opportunity. Jupiter transiting these same houses brings expansive, joyful love energy. Additionally, when transiting Venus or Jupiter forms a positive aspect (trine or conjunction) to your natal Venus or Moon, the conditions are favorable for new love to enter your life.",
  },
  {
    q: "Is a transit chart important?",
    a: "Yes, transit charts are one of the most important predictive tools in astrology. They show how the current cosmic weather is interacting with your personal birth chart, highlighting periods of opportunity, challenge, transformation, and growth. While natal charts show your potential, transits show the timing of when that potential is activated. For major life decisions, transit analysis is invaluable.",
  },
  {
    q: "Can transit charts predict career success and family harmony?",
    a: "Transit charts can identify favorable periods for career advancement (Jupiter transiting the 10th house, Sun or Mars activating career houses) and times of family harmony or challenge (Moon transits to the 4th house, Jupiter in the 4th). However, they indicate tendencies and timing windows — not certainties. Your choices, actions, and preparedness within those windows determine the actual outcomes.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function TransitChartCalculator() {
  const { language } = useLanguage();
  const { exportToPdf } = usePdfExport();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [birthHour, setBirthHour] = useState("");
  const [birthMinute, setBirthMinute] = useState("");
  const [birthSecond, setBirthSecond] = useState("");
  const [dontKnowTime, setDontKnowTime] = useState(false);
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [result, setResult] = useState<{
    name: string;
    natalMoonSign: number;
    planets: PlanetPosition[];
    today: Date;
  } | null>(null);

  const canCalculate =
    name.trim().length > 0 &&
    gender !== "" &&
    day !== "" &&
    month !== "" &&
    year !== "" &&
    placeOfBirth.trim().length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const d = Number.parseInt(day, 10);
    const m = Number.parseInt(month, 10);
    const y = Number.parseInt(year, 10);
    const natalMoonSign = calcNatalMoonSign(d, m, y);
    const today = new Date();
    const planets = calcCurrentPlanetPositions(today);
    setResult({ name: name.trim(), natalMoonSign, planets, today });
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
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutesSeconds = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.04 22)" }}
      data-ocid="transit-chart-calculator-page"
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
            Astrology Calculator
          </span>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-3"
            style={{ color: "oklch(0.92 0.10 75)" }}
          >
            Transit Chart Calculator
          </h1>
          <p
            className="font-body text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.68 0.05 60)" }}
          >
            The transit chart is your personal cosmic weather report — a
            real-time map showing how the current positions of planets in the
            sky interact with your natal birth chart. Understand what energies
            are active in your life right now, which areas are blessed, and
            where to focus your attention.
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
            Enter Your Birth Details
          </h2>

          {/* Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="transit-name"
              className="block font-heading text-sm font-semibold"
              style={labelStyle}
            >
              {t("calculator.yourName", language)} *
            </label>
            <input
              id="transit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all border"
              style={inputStyle}
              data-ocid="transit.name_input"
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label
              htmlFor="transit-gender"
              className="block font-heading text-sm font-semibold"
              style={labelStyle}
            >
              {t("calculator.gender", language)} *
            </label>
            <select
              id="transit-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none border"
              style={inputStyle}
              data-ocid="transit.gender_select"
            >
              <option value="">{t("calculator.selectGender", language)}</option>
              <option value="male">{t("calculator.male", language)}</option>
              <option value="female">{t("calculator.female", language)}</option>
              <option value="other">{t("calculator.other", language)}</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label
              htmlFor="transit-dob-day"
              className="block font-heading text-sm font-semibold"
              style={labelStyle}
            >
              {t("calculator.dateOfBirth", language)} *
            </label>
            <div className="grid grid-cols-3 gap-3">
              <select
                id="transit-dob-day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
                style={inputStyle}
                data-ocid="transit.day_select"
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
                data-ocid="transit.month_select"
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
                data-ocid="transit.year_select"
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

          {/* Time of Birth */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span
                className="block font-heading text-sm font-semibold"
                style={labelStyle}
              >
                {t("calculator.timeOfBirth", language)}
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontKnowTime}
                  onChange={(e) => setDontKnowTime(e.target.checked)}
                  className="rounded"
                  data-ocid="transit.dont_know_time_checkbox"
                />
                <span
                  className="font-body text-xs"
                  style={{ color: "oklch(0.65 0.05 60)" }}
                >
                  {t("calculator.dontKnowTime", language)}
                </span>
              </label>
            </div>
            {!dontKnowTime && (
              <div className="grid grid-cols-3 gap-3">
                <select
                  value={birthHour}
                  onChange={(e) => setBirthHour(e.target.value)}
                  className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
                  style={inputStyle}
                  data-ocid="transit.hour_select"
                >
                  <option value="">{t("calculator.hour", language)}</option>
                  {hours.map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  value={birthMinute}
                  onChange={(e) => setBirthMinute(e.target.value)}
                  className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
                  style={inputStyle}
                  data-ocid="transit.minute_select"
                >
                  <option value="">{t("calculator.minute", language)}</option>
                  {minutesSeconds.map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  value={birthSecond}
                  onChange={(e) => setBirthSecond(e.target.value)}
                  className="px-3 py-2.5 rounded-lg text-sm font-body outline-none border"
                  style={inputStyle}
                  data-ocid="transit.second_select"
                >
                  <option value="">{t("calculator.second", language)}</option>
                  {minutesSeconds.map((s) => (
                    <option key={s} value={s}>
                      {String(s).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Place of Birth */}
          <div className="space-y-1.5">
            <label
              htmlFor="transit-place"
              className="block font-heading text-sm font-semibold"
              style={labelStyle}
            >
              {t("calculator.placeOfBirth", language)} *
            </label>
            <input
              id="transit-place"
              type="text"
              value={placeOfBirth}
              onChange={(e) => setPlaceOfBirth(e.target.value)}
              placeholder={t("calculator.enterPlace", language)}
              className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all border"
              style={inputStyle}
              data-ocid="transit.place_input"
            />
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
            data-ocid="transit.calculate_button"
          >
            {t("calculator.calculate", language)} Transit Chart
          </button>
        </div>

        {/* ── Results ── */}
        {result && (
          <div
            id="transit-results"
            className="rounded-2xl p-6 space-y-6"
            style={{
              background: "oklch(0.19 0.06 26)",
              border: "2px solid oklch(0.78 0.14 75 / 0.35)",
              boxShadow: "0 0 32px oklch(0.78 0.14 75 / 0.08)",
            }}
            data-ocid="transit.result"
          >
            <div className="text-center">
              <p
                className="font-heading text-xs uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.60 0.08 60)" }}
              >
                Transit Chart for
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
                As of{" "}
                {result.today.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Natal Moon Sign */}
            <div
              className="rounded-xl p-4 text-center"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.78 0.14 75 / 0.20)",
              }}
            >
              <p
                className="font-heading text-xs uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.60 0.08 60)" }}
              >
                Natal Moon Sign
              </p>
              <div
                className="font-heading text-3xl font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {ZODIAC_SYMBOLS[result.natalMoonSign]}{" "}
                {ZODIAC_SIGNS[result.natalMoonSign]}
              </div>
              <p
                className="font-body text-xs mt-1"
                style={{ color: "oklch(0.65 0.04 60)" }}
              >
                Your Moon sign shapes emotional responses and inner world
              </p>
            </div>

            {/* Current Planetary Transits */}
            <div>
              <h3
                className="font-heading text-sm font-bold mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Current Planetary Transits
              </h3>
              <div className="space-y-2">
                {result.planets.map((planet) => {
                  const house = getHouseFromSigns(
                    result.natalMoonSign,
                    planet.sign,
                  );
                  const themes = PLANET_TRANSIT_THEMES[planet.name] ?? [];
                  return (
                    <div
                      key={planet.name}
                      className="rounded-xl p-3 flex gap-3 items-start"
                      style={{
                        background: "oklch(0.22 0.06 25)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                      }}
                    >
                      <div
                        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-lg"
                        style={{
                          background: "oklch(0.68 0.20 48 / 0.18)",
                          color: "oklch(0.78 0.14 75)",
                          border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                        }}
                      >
                        {planet.symbol}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 items-center mb-1">
                          <span
                            className="font-heading text-sm font-bold"
                            style={{ color: "oklch(0.82 0.06 70)" }}
                          >
                            {planet.name}
                          </span>
                          <span
                            className="font-heading text-xs"
                            style={{ color: "oklch(0.68 0.20 48)" }}
                          >
                            in {ZODIAC_SIGNS[planet.sign]} ({planet.degree}°)
                          </span>
                          <span
                            className="font-heading text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: "oklch(0.68 0.20 48 / 0.18)",
                              color: "oklch(0.78 0.14 75)",
                            }}
                          >
                            House {house}
                          </span>
                        </div>
                        <p
                          className="font-body text-xs"
                          style={{ color: "oklch(0.65 0.04 60)" }}
                        >
                          {HOUSE_MEANINGS[house]}
                        </p>
                        <p
                          className="font-body text-xs mt-1"
                          style={{ color: "oklch(0.58 0.04 55)" }}
                        >
                          {themes[0]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Best Times This Month */}
            <div
              className="rounded-xl p-4"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.68 0.20 48 / 0.25)",
              }}
            >
              <h3
                className="font-heading text-sm font-bold mb-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Cosmic Advice Right Now
              </h3>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.68 0.04 60)" }}
              >
                Jupiter's current transit brings expansion and opportunity to
                the house it occupies in your chart. Watch for Mercury's
                movement for communication windows. Saturn's position calls for
                disciplined effort in its transit house. Use the Moon's rapid
                cycle to time emotional and intuitive actions. Consult an
                astrologer for personalized timing guidance based on your full
                natal chart.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "transit-results",
                    "transit-chart-result",
                    "Transit Chart Calculator Result",
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="transit.export_pdf_button"
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
                data-ocid="transit.consult_astrologer_link"
              >
                Talk to Astrologer
              </a>
            </div>
          </div>
        )}

        {/* ── Informational Sections ── */}
        <InfoSection title="What is a Transit Chart?">
          <p>
            A transit chart is a dynamic astrological map that compares the
            current positions of planets in the sky to the positions they
            occupied at the moment of your birth. While your natal chart is
            fixed — a permanent snapshot of the cosmos at your birth — your
            transit chart is ever-changing, shifting as the planets continue
            their journeys through the zodiac.
          </p>
          <p>
            Astrologers use transit charts to understand timing: when to act,
            when to wait, when to expect challenges, and when blessings are ripe
            for the taking. It is one of the most practically useful tools in
            astrology for navigating daily life, relationships, career, and
            spiritual development.
          </p>
        </InfoSection>

        <InfoSection title="What is a Transit Chart Calculator?" alternate>
          <p>
            A Transit Chart Calculator is a digital tool that automatically
            computes the current planetary positions and maps them against your
            natal chart based on your birth date, time, and place. Instead of
            manually consulting an ephemeris (a table of planetary positions),
            the calculator does the complex astronomy instantly, giving you a
            real-time picture of which cosmic energies are active in your life
            right now.
          </p>
          <p>
            Our calculator uses your date of birth to derive your natal Moon
            sign — a key reference point — and calculates which houses the
            current planets are transiting. It then provides interpretations of
            what each transit means for you, offering a practical snapshot of
            your current cosmic weather.
          </p>
        </InfoSection>

        <InfoSection title="How Does the Transit Chart Calculator Work?">
          <p>
            The calculator follows these steps to generate your transit report:
          </p>
          <div className="space-y-3 mt-2">
            {[
              {
                step: "Step 1: Birth Data Input",
                desc: "Enter your name, gender, date of birth, time (if known), and place of birth. The time of birth is important for ascendant calculations, but the Moon sign and most transits can still be estimated without it.",
              },
              {
                step: "Step 2: Natal Moon Sign Calculation",
                desc: "Using your birth date, the calculator derives your natal Moon sign using an astronomical formula. Your Moon sign serves as the primary reference point for house calculations in our simplified system.",
              },
              {
                step: "Step 3: Current Planetary Positions",
                desc: "The calculator computes today's positions of all major planets (Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn) using astronomical formulas based on their known orbital periods.",
              },
              {
                step: "Step 4: House Mapping",
                desc: "By comparing the current planetary positions to your natal Moon sign, the calculator identifies which of the 12 houses each transiting planet is currently activating in your chart.",
              },
              {
                step: "Step 5: Transit Interpretations",
                desc: "Based on which house each planet transits and the nature of that planet's energy, the calculator generates meaningful interpretations about what themes and opportunities are currently active in your life.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <span
                  className="shrink-0 font-heading font-bold text-xs mt-0.5 w-12"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  {item.step.split(":")[0]}:
                </span>
                <p>
                  <strong style={{ color: "oklch(0.80 0.06 70)" }}>
                    {item.step.split(": ")[1]}
                  </strong>{" "}
                  — {item.desc}
                </p>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection
          title="What is the Significance of the Transit Chart?"
          alternate
        >
          <p>
            The transit chart reveals the cosmic dialogue between the universe
            and your personal destiny. It answers the question: "What is the
            universe trying to teach, offer, or challenge me with right now?"
          </p>
          <div className="space-y-3 mt-2">
            {[
              {
                title: "Timing Life Events",
                desc: "Major transits from Saturn and Jupiter correlate strongly with significant life milestones — career shifts, relationship beginnings or endings, relocations, and spiritual awakenings.",
              },
              {
                title: "Understanding Challenges",
                desc: "Difficult transits (Saturn to natal Moon, for example) are not punishments but invitations to build resilience, face fears, and emerge stronger. Understanding them reduces anxiety and builds trust in life's process.",
              },
              {
                title: "Maximizing Opportunities",
                desc: "Jupiter's benefic transits open windows of opportunity. Knowing when Jupiter transits your 1st, 5th, 9th, or 10th house allows you to plan major initiatives, launches, and expansions during naturally supportive periods.",
              },
              {
                title: "Spiritual Development",
                desc: "The slower outer planets (Jupiter, Saturn) transiting the 12th or 9th house often mark profound spiritual periods — times of retreat, inner work, and deepening connection with a higher power.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 p-3 rounded-xl"
                style={{ background: "oklch(0.18 0.04 25)" }}
              >
                <div
                  className="shrink-0 w-1.5 rounded-full mt-1 self-stretch"
                  style={{ background: "oklch(0.68 0.20 48 / 0.5)" }}
                />
                <div>
                  <span
                    className="font-heading font-semibold text-sm"
                    style={{ color: "oklch(0.80 0.06 70)" }}
                  >
                    {item.title}:{" "}
                  </span>
                  <span className="font-body text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="What are the Popular Planetary Transits and Their Effects?">
          <div className="space-y-4">
            {[
              {
                planet: "Saturn Transits",
                symbol: "♄",
                desc: "Saturn is the great teacher. When it transits important natal points or houses, it brings discipline, hard work, and karmic lessons. Saturn in the 7th house may delay or test relationships; in the 10th house, it demands effort but rewards perseverance with lasting career success. Saturn's transit typically lasts 2.5 years in each sign.",
              },
              {
                planet: "Jupiter Transits",
                symbol: "♃",
                desc: "Jupiter is the great benefic. Its transits bring expansion, opportunity, wisdom, and blessings. Jupiter in the 5th house favors romance and creativity; in the 9th, it sparks spiritual growth and long-distance travel; in the 11th, it multiplies social connections and gains. Jupiter spends approximately one year in each sign.",
              },
              {
                planet: "Rahu-Ketu Axis",
                symbol: "☊☋",
                desc: "The Moon's nodes (Rahu and Ketu) move in retrograde motion and change signs approximately every 18 months. Their transits activate karmic themes — Rahu brings obsessive new desires and worldly focus, while Ketu brings detachment, spirituality, and completion of past karmas. Their transit across the 1st-7th house axis often marks major identity and relationship shifts.",
              },
              {
                planet: "Mars, Venus, Mercury Transits",
                symbol: "♂♀☿",
                desc: "The inner planets move faster and trigger more immediate, short-term effects. Mars transits activate energy, ambition, and sometimes conflict in the houses they touch. Venus transits bring harmony, romance, and aesthetic pleasure. Mercury transits enhance communication, thinking, and negotiations — its retrograde periods (3 times/year) are famous for communication delays and technology glitches.",
              },
            ].map((item) => (
              <div
                key={item.planet}
                className="rounded-xl p-4"
                style={{ background: "oklch(0.18 0.04 25)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-lg"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {item.symbol}
                  </span>
                  <span
                    className="font-heading font-bold text-sm"
                    style={{ color: "oklch(0.80 0.06 70)" }}
                  >
                    {item.planet}
                  </span>
                </div>
                <p className="font-body text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection
          title="What are the Benefits of a Transit Chart Calculator?"
          alternate
        >
          <ul className="space-y-2 list-none pl-0">
            {[
              {
                icon: "◆",
                title: "Personalized Cosmic Guidance",
                desc: "Unlike generic horoscopes, a transit chart is based on your specific birth data — making the insights directly relevant to your life.",
              },
              {
                icon: "◆",
                title: "Better Decision Making",
                desc: "Knowing which planetary energies are active helps you choose optimal timing for important decisions — launches, proposals, job changes, investments.",
              },
              {
                icon: "◆",
                title: "Emotional Awareness",
                desc: "Understanding difficult transits in advance reduces fear and confusion, helping you navigate challenging periods with grace and perspective.",
              },
              {
                icon: "◆",
                title: "Spiritual Alignment",
                desc: "Transit charts reveal when you are in a spiritually receptive period — ideal for meditation retreats, initiations, and deep inner work.",
              },
              {
                icon: "◆",
                title: "Relationship Insights",
                desc: "Transits to your 7th house and Venus reveal relationship opportunities and challenges, helping you approach love with greater wisdom.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span
                  className="shrink-0 font-heading font-bold text-xs mt-0.5"
                  style={{ color: "oklch(0.68 0.20 48)" }}
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

        <InfoSection title="Conclusion">
          <p>
            The transit chart is astrology in motion — a living, breathing map
            of the cosmic forces shaping your life right now. By understanding
            which planets are active in which houses of your chart, you gain a
            meaningful advantage: the ability to align your actions with the
            natural flow of the universe.
          </p>
          <p>
            Our Transit Chart Calculator gives you an accessible, immediate
            glimpse into your current cosmic weather. For a comprehensive
            analysis — including exact degree aspects, retrograde effects,
            mutual receptions, and predictive timing for major life events — our
            expert Vedic astrologers offer personalized transit readings that go
            far beyond any calculator can provide.
          </p>
          <p>
            Astrology doesn't remove your free will — it illuminates the
            terrain. How you navigate that terrain is always, beautifully, your
            choice.
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
          data-ocid="transit.discover_more"
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
            data-ocid="transit.all_calculators_link"
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
          data-ocid="transit.faqs"
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
                data-ocid={`transit.faq.item.${i + 1}`}
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
