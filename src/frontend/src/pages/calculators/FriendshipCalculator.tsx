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

// ─── Pythagorean Mapping ───────────────────────────────────────────────────────
function letterToNum(ch: string): number {
  const code = ch.toUpperCase().charCodeAt(0) - 64;
  if (code < 1 || code > 26) return 0;
  return code;
}

function reduceToSingle(input: number): number {
  let n = input;
  if (n === 11 || n === 22) return n;
  while (n > 9) {
    n = String(n)
      .split("")
      .reduce((s, c) => s + Number.parseInt(c, 10), 0);
    if (n === 11 || n === 22) return n;
  }
  return n;
}

function calcExpressionNumber(name: string): number {
  const sum = name
    .toUpperCase()
    .split("")
    .filter((c) => c >= "A" && c <= "Z")
    .reduce((acc, c) => acc + letterToNum(c), 0);
  return reduceToSingle(sum);
}

function calcLifePathFromDate(
  day: number,
  month: number,
  year: number,
): number {
  const sum = day + month + year;
  return reduceToSingle(sum);
}

// ─── Compatibility Table ───────────────────────────────────────────────────────
const COMPAT_TABLE: Record<string, number> = {
  "1-1": 75,
  "1-2": 55,
  "1-3": 80,
  "1-4": 50,
  "1-5": 85,
  "1-6": 60,
  "1-7": 70,
  "1-8": 65,
  "1-9": 55,
  "2-2": 80,
  "2-3": 65,
  "2-4": 75,
  "2-5": 55,
  "2-6": 85,
  "2-7": 70,
  "2-8": 60,
  "2-9": 70,
  "3-3": 85,
  "3-4": 55,
  "3-5": 75,
  "3-6": 80,
  "3-7": 65,
  "3-8": 60,
  "3-9": 80,
  "4-4": 75,
  "4-5": 55,
  "4-6": 65,
  "4-7": 70,
  "4-8": 85,
  "4-9": 60,
  "5-5": 80,
  "5-6": 65,
  "5-7": 75,
  "5-8": 55,
  "5-9": 70,
  "6-6": 85,
  "6-7": 70,
  "6-8": 60,
  "6-9": 80,
  "7-7": 80,
  "7-8": 65,
  "7-9": 75,
  "8-8": 85,
  "8-9": 60,
  "9-9": 80,
};

function getCompatScore(n1: number, n2: number): number {
  const key1 = `${Math.min(n1, n2)}-${Math.max(n1, n2)}`;
  return COMPAT_TABLE[key1] ?? 60;
}

function calcFriendshipScore(
  expr1: number,
  expr2: number,
  lp1: number | null,
  lp2: number | null,
): number {
  let base = getCompatScore(
    expr1 > 9 ? Number.parseInt(String(expr1)[0], 10) : expr1,
    expr2 > 9 ? Number.parseInt(String(expr2)[0], 10) : expr2,
  );
  if (lp1 !== null && lp2 !== null) {
    const lpBase = getCompatScore(
      lp1 > 9 ? Number.parseInt(String(lp1)[0], 10) : lp1,
      lp2 > 9 ? Number.parseInt(String(lp2)[0], 10) : lp2,
    );
    base = Math.round((base + lpBase) / 2);
  }
  return Math.min(100, base);
}

interface FriendshipResult {
  score: number;
  label: string;
  description: string;
  color: string;
  borderColor: string;
  bgColor: string;
  yourExpr: number;
  friendExpr: number;
  yourLP: number | null;
  friendLP: number | null;
}

function getResultConfig(score: number): {
  label: string;
  description: string;
  color: string;
  borderColor: string;
  bgColor: string;
} {
  if (score >= 90)
    return {
      label: "Cosmic Friends",
      description:
        "A once-in-a-lifetime connection. Your souls recognize each other across time and space. This friendship carries the frequency of destiny — rare, transformative, and deeply cherished.",
      color: "oklch(0.60 0.18 145)",
      borderColor: "oklch(0.60 0.18 145 / 0.4)",
      bgColor: "oklch(0.18 0.07 145 / 0.25)",
    };
  if (score >= 75)
    return {
      label: "Best Friends",
      description:
        "Deep mutual understanding and loyalty define this bond. You intuitively know each other's needs and show up without being asked. This friendship is a true pillar of both your lives.",
      color: "oklch(0.78 0.14 75)",
      borderColor: "oklch(0.78 0.14 75 / 0.4)",
      bgColor: "oklch(0.18 0.07 75 / 0.25)",
    };
  if (score >= 60)
    return {
      label: "Good Friends",
      description:
        "A solid, comfortable friendship built on shared interests and mutual respect. You enjoy each other's company and create good memories together. This bond has wonderful growth potential.",
      color: "oklch(0.60 0.20 250)",
      borderColor: "oklch(0.60 0.20 250 / 0.4)",
      bgColor: "oklch(0.18 0.07 250 / 0.25)",
    };
  if (score >= 45)
    return {
      label: "Casual Friends",
      description:
        "This friendship works with effort and understanding. You may have different approaches or communication styles, but with patience and openness, something meaningful can be built.",
      color: "oklch(0.72 0.20 48)",
      borderColor: "oklch(0.72 0.20 48 / 0.4)",
      bgColor: "oklch(0.18 0.08 48 / 0.25)",
    };
  return {
    label: "Challenging",
    description:
      "Growth through differences is the theme here. Your energies pull in different directions, which creates friction — but also the potential for profound learning if both commit to understanding.",
    color: "oklch(0.65 0.18 20)",
    borderColor: "oklch(0.65 0.18 20 / 0.4)",
    bgColor: "oklch(0.18 0.07 20 / 0.25)",
  };
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
    q: "How does the friendship calculator work?",
    a: "Our friendship calculator uses Pythagorean numerology to derive Expression Numbers from both names. These numbers, which range from 1–9 (or 11/22 for master numbers), reflect core personality vibrations. We then compare them using a compatibility table that maps the harmonic resonance between each pair of numbers. If birth dates are provided, Life Path Numbers are also factored in to refine the result.",
  },
  {
    q: "Can numerology really determine friendship compatibility?",
    a: "Numerology offers a symbolic lens through which to understand energetic patterns between two people. It doesn't determine friendship scientifically, but it can reveal natural tendencies, complementary strengths, and potential friction points. Many people find it resonates with real-life dynamics. Think of it as a mirror for self-reflection rather than a verdict.",
  },
  {
    q: "What are the 5 types of friendship this calculator identifies?",
    a: "Our calculator identifies five tiers: Cosmic Friends (90–100%) — rare, soul-level connections; Best Friends (75–89%) — deep loyalty and mutual understanding; Good Friends (60–74%) — comfortable, growing bonds; Casual Friends (45–59%) — works with effort; and Challenging (below 45%) — growth through friction and differences.",
  },
  {
    q: "Why do planetary influences matter in friendship?",
    a: "In Vedic astrology, each number 1–9 is associated with a ruling planet — the Sun governs 1, the Moon governs 2, Jupiter governs 3, and so on. Planetary energies shape personality traits and life themes. When two friends have numerologically compatible planetary rulers, their natural energies flow together more harmoniously, creating ease and mutual support in the friendship.",
  },
  {
    q: "What is the 11th house and its role in friendships?",
    a: "In Vedic astrology, the 11th house (Labha Bhava) governs friendships, social networks, gains, and collective goals. A strong 11th house with benefic planets like Jupiter or Venus suggests naturally rich, fulfilling friendships. The 11th house lord's placement also shows the quality and nature of friendships one attracts. Our numerology calculator complements this by adding a name-based vibrational layer to the analysis.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function FriendshipCalculator() {
  const { language } = useLanguage();
  const { exportToPdf } = usePdfExport();

  const [yourName, setYourName] = useState("");
  const [friendName, setFriendName] = useState("");
  const [yourDay, setYourDay] = useState("");
  const [yourMonth, setYourMonth] = useState("");
  const [yourYear, setYourYear] = useState("");
  const [friendDay, setFriendDay] = useState("");
  const [friendMonth, setFriendMonth] = useState("");
  const [friendYear, setFriendYear] = useState("");
  const [result, setResult] = useState<FriendshipResult | null>(null);

  const canCalculate =
    yourName.trim().length > 0 && friendName.trim().length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const expr1 = calcExpressionNumber(yourName.trim());
    const expr2 = calcExpressionNumber(friendName.trim());

    let lp1: number | null = null;
    let lp2: number | null = null;
    if (yourDay && yourMonth && yourYear) {
      lp1 = calcLifePathFromDate(
        Number.parseInt(yourDay, 10),
        Number.parseInt(yourMonth, 10),
        Number.parseInt(yourYear, 10),
      );
    }
    if (friendDay && friendMonth && friendYear) {
      lp2 = calcLifePathFromDate(
        Number.parseInt(friendDay, 10),
        Number.parseInt(friendMonth, 10),
        Number.parseInt(friendYear, 10),
      );
    }

    const score = calcFriendshipScore(expr1, expr2, lp1, lp2);
    const config = getResultConfig(score);
    setResult({
      score,
      yourExpr: expr1,
      friendExpr: expr2,
      yourLP: lp1,
      friendLP: lp2,
      ...config,
    });
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

  const STRENGTHS = [
    "Natural ease and comfort in each other's presence",
    "Complementary energies that balance and uplift",
    "Strong potential for long-term, enduring connection",
  ];
  const CHALLENGES = [
    "May need to consciously bridge communication differences",
    "Different life rhythms could require patience and flexibility",
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.04 22)" }}
      data-ocid="friendship-calculator-page"
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
            Compatibility Calculator
          </span>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-3"
            style={{ color: "oklch(0.92 0.10 75)" }}
          >
            Friendship Calculator
          </h1>
          <p
            className="font-body text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.68 0.05 60)" }}
          >
            Friendship is one of the most precious gifts in life — a bond that
            transcends blood, culture, and circumstance. Through the lens of
            numerology, discover the cosmic compatibility between you and your
            friend. Enter both names to reveal the energetic resonance of your
            connection.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* ── Form Card ── */}
        <div
          className="rounded-2xl p-6 space-y-6"
          style={{
            background: "oklch(0.20 0.05 25)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
        >
          <h2 className="font-heading text-lg font-bold" style={labelStyle}>
            Calculate Friendship Compatibility
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Your Details */}
            <div
              className="rounded-xl p-4 space-y-4"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <p
                className="font-heading text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                Your Details
              </p>
              <div className="space-y-1.5">
                <label
                  htmlFor="friend-your-name"
                  className="block font-heading text-sm font-semibold"
                  style={labelStyle}
                >
                  {t("calculator.yourName", language)} *
                </label>
                <input
                  id="friend-your-name"
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all border"
                  style={inputStyle}
                  data-ocid="friendship.your_name_input"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="friendship-your-dob-day"
                  className="block font-heading text-sm font-semibold"
                  style={labelStyle}
                >
                  {t("calculator.dateOfBirth", language)} (optional)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    id="friendship-your-dob-day"
                    value={yourDay}
                    onChange={(e) => setYourDay(e.target.value)}
                    className="px-2 py-2 rounded-lg text-xs font-body outline-none border"
                    style={inputStyle}
                    data-ocid="friendship.your_day_select"
                  >
                    <option value="">{t("calculator.day", language)}</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    value={yourMonth}
                    onChange={(e) => setYourMonth(e.target.value)}
                    className="px-2 py-2 rounded-lg text-xs font-body outline-none border"
                    style={inputStyle}
                    data-ocid="friendship.your_month_select"
                  >
                    <option value="">{t("calculator.month", language)}</option>
                    {months.map((mo, i) => (
                      <option key={mo} value={i + 1}>
                        {mo.slice(0, 3)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={yourYear}
                    onChange={(e) => setYourYear(e.target.value)}
                    className="px-2 py-2 rounded-lg text-xs font-body outline-none border"
                    style={inputStyle}
                    data-ocid="friendship.your_year_select"
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
            </div>

            {/* Friend Details */}
            <div
              className="rounded-xl p-4 space-y-4"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <p
                className="font-heading text-xs font-bold uppercase tracking-widest"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                Friend's Details
              </p>
              <div className="space-y-1.5">
                <label
                  htmlFor="friend-name"
                  className="block font-heading text-sm font-semibold"
                  style={labelStyle}
                >
                  Friend's Name *
                </label>
                <input
                  id="friend-name"
                  type="text"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  placeholder="Enter friend's full name"
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all border"
                  style={inputStyle}
                  data-ocid="friendship.friend_name_input"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="friendship-friend-dob-day"
                  className="block font-heading text-sm font-semibold"
                  style={labelStyle}
                >
                  Friend's {t("calculator.dateOfBirth", language)} (optional)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    id="friendship-friend-dob-day"
                    value={friendDay}
                    onChange={(e) => setFriendDay(e.target.value)}
                    className="px-2 py-2 rounded-lg text-xs font-body outline-none border"
                    style={inputStyle}
                    data-ocid="friendship.friend_day_select"
                  >
                    <option value="">{t("calculator.day", language)}</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    value={friendMonth}
                    onChange={(e) => setFriendMonth(e.target.value)}
                    className="px-2 py-2 rounded-lg text-xs font-body outline-none border"
                    style={inputStyle}
                    data-ocid="friendship.friend_month_select"
                  >
                    <option value="">{t("calculator.month", language)}</option>
                    {months.map((mo, i) => (
                      <option key={mo} value={i + 1}>
                        {mo.slice(0, 3)}
                      </option>
                    ))}
                  </select>
                  <select
                    value={friendYear}
                    onChange={(e) => setFriendYear(e.target.value)}
                    className="px-2 py-2 rounded-lg text-xs font-body outline-none border"
                    style={inputStyle}
                    data-ocid="friendship.friend_year_select"
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
            data-ocid="friendship.calculate_button"
          >
            {t("calculator.calculate", language)} Friendship Compatibility
          </button>
        </div>

        {/* ── Results ── */}
        {result && (
          <div
            id="friendship-results"
            className="rounded-2xl p-6 space-y-5"
            style={{
              background: result.bgColor,
              border: `2px solid ${result.borderColor}`,
              boxShadow: `0 0 32px ${result.borderColor}`,
            }}
            data-ocid="friendship.result"
          >
            <div className="text-center">
              <div
                className="font-heading text-7xl font-bold leading-none mb-2"
                style={{ color: result.color }}
              >
                {result.score}%
              </div>
              <div
                className="font-heading text-xl font-bold mb-1"
                style={{ color: result.color }}
              >
                {result.label}
              </div>
              <div
                className="font-heading text-sm"
                style={{ color: "oklch(0.80 0.05 70)" }}
              >
                {yourName.trim()} &amp; {friendName.trim()}
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-3 rounded-full overflow-hidden"
              style={{ background: "oklch(0.18 0.04 25)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${result.score}%`,
                  background: `linear-gradient(90deg, ${result.color}, oklch(0.78 0.14 75))`,
                }}
              />
            </div>

            <p
              className="font-body text-sm leading-relaxed text-center max-w-lg mx-auto"
              style={{ color: "oklch(0.75 0.05 65)" }}
            >
              {result.description}
            </p>

            {/* Numerology Numbers */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: yourName.trim(),
                  expr: result.yourExpr,
                  lp: result.yourLP,
                },
                {
                  label: friendName.trim(),
                  expr: result.friendExpr,
                  lp: result.friendLP,
                },
              ].map((person) => (
                <div
                  key={person.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "oklch(0.18 0.04 25 / 0.6)" }}
                >
                  <p
                    className="font-heading text-xs font-semibold mb-2 truncate"
                    style={{ color: "oklch(0.68 0.06 62)" }}
                  >
                    {person.label}
                  </p>
                  <p
                    className="font-heading text-xs"
                    style={{ color: "oklch(0.65 0.05 60)" }}
                  >
                    Expression:{" "}
                    <span className="font-bold" style={{ color: result.color }}>
                      {person.expr}
                    </span>
                  </p>
                  {person.lp !== null && (
                    <p
                      className="font-heading text-xs mt-1"
                      style={{ color: "oklch(0.65 0.05 60)" }}
                    >
                      Life Path:{" "}
                      <span
                        className="font-bold"
                        style={{ color: result.color }}
                      >
                        {person.lp}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Strengths & Challenges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className="rounded-xl p-4"
                style={{ background: "oklch(0.18 0.04 25 / 0.5)" }}
              >
                <h3
                  className="font-heading text-xs font-bold uppercase tracking-wide mb-2"
                  style={{ color: "oklch(0.60 0.18 145)" }}
                >
                  Friendship Strengths
                </h3>
                <ul className="space-y-1.5">
                  {STRENGTHS.map((s) => (
                    <li
                      key={s}
                      className="flex gap-2 items-start font-body text-xs"
                      style={{ color: "oklch(0.72 0.04 65)" }}
                    >
                      <span style={{ color: "oklch(0.60 0.18 145)" }}>+</span>{" "}
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-xl p-4"
                style={{ background: "oklch(0.18 0.04 25 / 0.5)" }}
              >
                <h3
                  className="font-heading text-xs font-bold uppercase tracking-wide mb-2"
                  style={{ color: "oklch(0.72 0.20 48)" }}
                >
                  Potential Challenges
                </h3>
                <ul className="space-y-1.5">
                  {CHALLENGES.map((c) => (
                    <li
                      key={c}
                      className="flex gap-2 items-start font-body text-xs"
                      style={{ color: "oklch(0.72 0.04 65)" }}
                    >
                      <span style={{ color: "oklch(0.72 0.20 48)" }}>~</span>{" "}
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "friendship-results",
                    "friendship-result",
                    "Friendship Compatibility Result",
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="friendship.export_pdf_button"
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
                data-ocid="friendship.consult_astrologer_link"
              >
                Talk to Astrologer
              </a>
            </div>
          </div>
        )}

        {/* ── Informational Sections ── */}
        <InfoSection title="What is a Friendship Calculator?">
          <p>
            A Friendship Calculator is a numerology-based tool that measures the
            compatibility between two people as friends. Unlike romance-focused
            calculators, it focuses on the vibrational harmony of your
            expression numbers — the numerological sum of your names — to reveal
            how well your energies align in the context of friendship, trust,
            and mutual support.
          </p>
          <p>
            In Vedic numerology, every name carries a unique frequency. When two
            people's name frequencies resonate harmoniously, it creates natural
            ease in communication, shared values, and emotional understanding —
            the pillars of any great friendship.
          </p>
        </InfoSection>

        <InfoSection title="How Does the Friendship Calculator Work?" alternate>
          <p>
            The calculator uses the Pythagorean numerology system to assign
            values to each letter of your name (A=1 through Z=26). These values
            are summed and reduced to a single digit — your Expression Number.
            The same is done for your friend's name.
          </p>
          <p>
            A compatibility matrix then evaluates how these two numbers interact
            energetically. If date of birth is provided, Life Path Numbers are
            also calculated and factored in, producing a more refined result
            that accounts for both personality (name) and destiny (birth date)
            compatibility.
          </p>
        </InfoSection>

        <InfoSection title="What Are the 5 Types of Friendship This Calculator Identifies?">
          <div className="space-y-3">
            {[
              {
                range: "90–100%",
                label: "Cosmic Friends",
                desc: "A rare soul-level connection that transcends ordinary friendship. These bonds feel destined and are profoundly transformative for both people.",
              },
              {
                range: "75–89%",
                label: "Best Friends",
                desc: "Deep, loyal, and enduring. You understand each other without needing to explain, and your bond is a genuine source of strength and joy.",
              },
              {
                range: "60–74%",
                label: "Good Friends",
                desc: "Comfortable and enriching. You share interests, enjoy each other's company, and have a solid foundation for a growing friendship.",
              },
              {
                range: "45–59%",
                label: "Casual Friends",
                desc: "Friendly and pleasant, but may require more conscious effort to deepen. Different rhythms don't prevent connection — they just require patience.",
              },
              {
                range: "Below 45%",
                label: "Challenging",
                desc: "Growth through contrast. These relationships push both people to expand beyond their comfort zones, offering valuable lessons in tolerance and perspective.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-3 p-3 rounded-xl"
                style={{ background: "oklch(0.18 0.04 25)" }}
              >
                <div className="shrink-0">
                  <span
                    className="font-heading font-bold text-xs"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    {item.range}
                  </span>
                </div>
                <div>
                  <span
                    className="font-heading font-semibold text-sm"
                    style={{ color: "oklch(0.80 0.06 70)" }}
                  >
                    {item.label}:{" "}
                  </span>
                  <span className="font-body text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection
          title="Why Planetary Influences Matter in Friendship?"
          alternate
        >
          <p>
            In Vedic astrology and numerology, every number from 1 to 9 is
            governed by a planetary ruler. The Sun (1) brings leadership and
            ego; the Moon (2) brings emotion and intuition; Jupiter (3) brings
            wisdom and expansion; Rahu (4) brings unconventional energy; Mercury
            (5) brings communication; Venus (6) brings love and aesthetics; Ketu
            (7) brings spirituality; Saturn (8) brings discipline; and Mars (9)
            brings courage and action.
          </p>
          <p>
            When two friends have numerologically compatible planetary rulers —
            such as the Sun (1) and Jupiter (3), or Venus (6) and the Moon (2) —
            their natural energies flow together with greater ease, creating
            friendships where both feel seen, supported, and inspired.
          </p>
        </InfoSection>

        <InfoSection title="What Role Does the 11th House Play in Friendships?">
          <p>
            In Vedic astrology, the 11th house (Labha Bhava) is the house of
            gains, social networks, and friendships. A well-placed 11th house
            with benefic planets like Jupiter, Venus, or the Moon indicates a
            person who naturally attracts quality friendships and thrives in
            social settings.
          </p>
          <p>
            The 11th house lord's placement also shapes the nature of one's
            social circle — in the 9th house, friends become spiritual guides;
            in the 7th, friendships can evolve into partnerships. Understanding
            your 11th house through a full birth chart reading provides the
            deepest insights into your friendship patterns, while our numerology
            calculator adds an accessible, complementary layer of understanding.
          </p>
        </InfoSection>

        <InfoSection title="Conclusion" alternate>
          <p>
            The Friendship Calculator offers a beautiful,
            numerologically-grounded way to explore the compatibility between
            you and someone you care about. While numbers give us useful
            patterns and tendencies, the true quality of any friendship is built
            through presence, reciprocity, and the willingness to show up for
            each other through life's many seasons.
          </p>
          <p>
            Whether your score is 95% or 48%, real friendships are cultivated —
            not given. Use this calculator as a starting point for reflection,
            not a final verdict. And for deeper astrological insights into your
            social nature, 11th house analysis, and friendship timing, our
            expert astrologers are here to guide you.
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
          data-ocid="friendship.discover_more"
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
            data-ocid="friendship.all_calculators_link"
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
          data-ocid="friendship.faqs"
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
                data-ocid={`friendship.faq.item.${i + 1}`}
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
