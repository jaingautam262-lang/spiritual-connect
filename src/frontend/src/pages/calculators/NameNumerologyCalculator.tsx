import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";

// ── Types ────────────────────────────────────────────────────────────────────

type SystemType = "pythagorean" | "chaldean" | "sepharial";

interface NumerologyResult {
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  lifePathNumber: number;
  destinyExplanation: string;
  soulUrgeExplanation: string;
  personalityExplanation: string;
  lifePathExplanation: string;
}

// ── Numerology Engine ────────────────────────────────────────────────────────

const PYTHAGOREAN: Record<string, number> = {
  A: 1,
  J: 1,
  S: 1,
  B: 2,
  K: 2,
  T: 2,
  C: 3,
  L: 3,
  U: 3,
  D: 4,
  M: 4,
  V: 4,
  E: 5,
  N: 5,
  W: 5,
  F: 6,
  O: 6,
  X: 6,
  G: 7,
  P: 7,
  Y: 7,
  H: 8,
  Q: 8,
  Z: 8,
  I: 9,
  R: 9,
};

const CHALDEAN: Record<string, number> = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8,
};

const SEPHARIAL: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

function reduce(num: number): number {
  let n = num;
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split("")
      .reduce((s, d) => s + Number.parseInt(d, 10), 0);
  }
  return n;
}

function letterValue(ch: string, map: Record<string, number>): number {
  return map[ch.toUpperCase()] ?? 0;
}

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

function calcSoulUrge(name: string, map: Record<string, number>): number {
  const sum = name
    .toUpperCase()
    .split("")
    .filter((c) => VOWELS.has(c))
    .reduce((s, c) => s + letterValue(c, map), 0);
  return reduce(sum);
}

function calcPersonality(name: string, map: Record<string, number>): number {
  const sum = name
    .toUpperCase()
    .split("")
    .filter((c) => /[A-Z]/.test(c) && !VOWELS.has(c))
    .reduce((s, c) => s + letterValue(c, map), 0);
  return reduce(sum);
}

function calcDestiny(name: string, map: Record<string, number>): number {
  const sum = name
    .toUpperCase()
    .split("")
    .filter((c) => /[A-Z]/.test(c))
    .reduce((s, c) => s + letterValue(c, map), 0);
  return reduce(sum);
}

function calcLifePath(dob: string): number {
  const digits = dob.replace(/\D/g, "").split("").map(Number);
  return reduce(digits.reduce((s, d) => s + d, 0));
}

const NUMBER_MEANINGS: Record<
  number,
  { destiny: string; soul: string; personality: string; lifepath: string }
> = {
  1: {
    destiny:
      "Leader & Pioneer — you are destined to blaze trails and inspire others with original ideas.",
    soul: "Your soul craves independence, authority, and the freedom to create your own path.",
    personality:
      "Others see you as confident, decisive, and self-sufficient — a natural leader.",
    lifepath:
      "Your life journey is about leadership, self-reliance, and pioneering new beginnings.",
  },
  2: {
    destiny:
      "Diplomat & Peacemaker — your purpose is to harmonise, cooperate, and build bridges.",
    soul: "Your soul yearns for partnership, balance, and deep emotional connection.",
    personality:
      "Others perceive you as gentle, cooperative, and highly intuitive.",
    lifepath:
      "Your life path calls you toward partnerships, diplomacy, and finding inner balance.",
  },
  3: {
    destiny:
      "Creator & Communicator — you are destined to inspire through art, words, and joyful expression.",
    soul: "Your soul burns with creative energy and the desire to bring beauty into the world.",
    personality:
      "Others see you as charming, witty, and creatively expressive.",
    lifepath:
      "Your life path is one of creativity, self-expression, and spreading joy.",
  },
  4: {
    destiny:
      "Builder & Organiser — your purpose is to create stable, lasting foundations for others.",
    soul: "Your soul seeks order, security, and the satisfaction of disciplined hard work.",
    personality:
      "Others see you as reliable, methodical, and deeply trustworthy.",
    lifepath:
      "Your life path is about building solid foundations through discipline and practicality.",
  },
  5: {
    destiny:
      "Freedom-Seeker & Adventurer — you are destined for variety, travel, and transformative change.",
    soul: "Your soul craves freedom, sensory experience, and the thrill of the unknown.",
    personality:
      "Others see you as dynamic, versatile, and magnetically adventurous.",
    lifepath:
      "Your life path is a journey of freedom, adaptability, and embracing change.",
  },
  6: {
    destiny:
      "Nurturer & Healer — your purpose is to serve, protect, and create harmonious home environments.",
    soul: "Your soul yearns to love, nurture, and take care of those around you.",
    personality:
      "Others see you as warm, responsible, and a devoted caregiver.",
    lifepath:
      "Your life path is centred on family, responsibility, and compassionate service.",
  },
  7: {
    destiny:
      "Seeker & Philosopher — you are destined for deep research, spiritual wisdom, and inner truth.",
    soul: "Your soul seeks knowledge, solitude, and a profound understanding of life's mysteries.",
    personality:
      "Others see you as analytical, introspective, and mysteriously wise.",
    lifepath:
      "Your life path is a quest for spiritual depth, analytical truth, and hidden wisdom.",
  },
  8: {
    destiny:
      "Achiever & Executive — your purpose is to master material power and use it with integrity.",
    soul: "Your soul craves achievement, authority, and tangible recognition of your efforts.",
    personality:
      "Others see you as ambitious, authoritative, and powerfully self-possessed.",
    lifepath:
      "Your life path leads through material mastery, ambition, and leadership in the world.",
  },
  9: {
    destiny:
      "Humanitarian & Visionary — you are destined to serve humanity and inspire global transformation.",
    soul: "Your soul yearns to give unconditionally, heal wounds, and leave the world better.",
    personality:
      "Others see you as compassionate, idealistic, and magnetically generous.",
    lifepath:
      "Your life path is one of universal love, selfless service, and broad-minded wisdom.",
  },
  11: {
    destiny:
      "Spiritual Messenger — your purpose is to inspire and illuminate others with visionary insight.",
    soul: "Your soul seeks spiritual enlightenment and a higher calling beyond the ordinary.",
    personality:
      "Others sense your intuitive, idealistic, and deeply spiritual nature.",
    lifepath:
      "Your life path is a master number journey of intuition, inspiration, and spiritual leadership.",
  },
  22: {
    destiny:
      "Master Builder — you are destined to turn grand dreams into lasting reality on a large scale.",
    soul: "Your soul craves the power to create systems, movements, or institutions that endure.",
    personality:
      "Others see you as visionary yet practical — a rare combination of dreamer and doer.",
    lifepath:
      "Your life path is the Master Builder's journey: manifesting the impossible into reality.",
  },
  33: {
    destiny:
      "Master Teacher — your purpose is to uplift humanity through compassionate wisdom and teaching.",
    soul: "Your soul seeks to heal, teach, and raise the spiritual consciousness of those you touch.",
    personality: "Others see you as saintly, nurturing, and profoundly giving.",
    lifepath:
      "Your life path is the rarest of all — the Master Teacher, here to serve humanity's highest good.",
  },
};

function getMap(system: SystemType): Record<string, number> {
  if (system === "chaldean") return CHALDEAN;
  if (system === "sepharial") return SEPHARIAL;
  return PYTHAGOREAN;
}

function getMeaning(
  num: number,
  key: keyof (typeof NUMBER_MEANINGS)[1],
): string {
  const entry = NUMBER_MEANINGS[num];
  return entry
    ? entry[key]
    : `Number ${num} — a unique vibration with its own deep significance.`;
}

function compute(
  name: string,
  dob: string,
  system: SystemType,
): NumerologyResult {
  const map = getMap(system);
  const destiny = calcDestiny(name, map);
  const soul = calcSoulUrge(name, map);
  const personality = calcPersonality(name, map);
  const lifePath = calcLifePath(dob);
  return {
    destinyNumber: destiny,
    soulUrgeNumber: soul,
    personalityNumber: personality,
    lifePathNumber: lifePath,
    destinyExplanation: getMeaning(destiny, "destiny"),
    soulUrgeExplanation: getMeaning(soul, "soul"),
    personalityExplanation: getMeaning(personality, "personality"),
    lifePathExplanation: getMeaning(lifePath, "lifepath"),
  };
}

// ── Shared UI Components ─────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-heading text-2xl md:text-3xl font-bold mb-4"
      style={{ color: "oklch(0.78 0.14 75)" }}
    >
      {children}
    </h2>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 mb-4"
      style={{
        background: "oklch(0.20 0.05 28)",
        border: "1px solid oklch(0.78 0.14 75 / 0.18)",
      }}
    >
      {children}
    </div>
  );
}

function ResultNumberCard({
  label,
  number,
  explanation,
  icon,
}: { label: string; number: number; explanation: string; icon: string }) {
  return (
    <div
      className="rounded-xl p-5 flex gap-4 items-start"
      style={{
        background: "oklch(0.22 0.06 28)",
        border: "1px solid oklch(0.78 0.14 75 / 0.3)",
      }}
    >
      <div
        className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold font-heading"
        style={{
          background: "oklch(0.62 0.18 48 / 0.2)",
          color: "oklch(0.78 0.14 75)",
          border: "2px solid oklch(0.78 0.14 75 / 0.4)",
        }}
      >
        {number}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{icon}</span>
          <span
            className="font-heading font-semibold text-sm"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {label}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "oklch(0.80 0.03 70)" }}
        >
          {explanation}
        </p>
      </div>
    </div>
  );
}

// ── Pythagorean Table ────────────────────────────────────────────────────────

const PYTH_ROWS = [
  { num: 1, letters: "A, J, S" },
  { num: 2, letters: "B, K, T" },
  { num: 3, letters: "C, L, U" },
  { num: 4, letters: "D, M, V" },
  { num: 5, letters: "E, N, W" },
  { num: 6, letters: "F, O, X" },
  { num: 7, letters: "G, P, Y" },
  { num: 8, letters: "H, Q, Z" },
  { num: 9, letters: "I, R" },
];

// ── FAQ Data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Does spelling affect numerology?",
    a: "Yes, significantly. Even a single letter change alters the sum and can shift your numbers. That's why many people consult a numerologist before officially changing their name — even a minor tweak in spelling can move your Destiny Number from, say, 4 to 7.",
  },
  {
    q: "Can I use numerology to name my baby?",
    a: "Absolutely! Many Indian families use numerology to choose a baby name that harmonises with the child's Life Path Number derived from their date of birth. The goal is alignment — a name whose Destiny Number complements the Life Path creates a supportive energetic foundation.",
  },
  {
    q: "Does numerology work for all languages?",
    a: "Traditional systems (Pythagorean, Chaldean, Sepharial) were built around the Latin/English alphabet. For names in Hindi, Tamil, or other scripts, practitioners typically transliterate into English letters first. Some regional systems exist for Sanskrit or Arabic, but they are less standardised.",
  },
  {
    q: "Can numerology help find career?",
    a: "Yes — your Destiny Number often points toward professions that align with your soul's purpose. A 7 is drawn to research, philosophy, or technology; an 8 to business and finance; a 3 to the arts and communication. It's best used alongside practical self-assessment, not as a sole guide.",
  },
  {
    q: "How accurate is numerology vs astrology?",
    a: "Both are symbolic systems that draw from different cosmic languages — numbers vs. planetary positions. Numerology is quicker and requires only a name and date; astrology (especially Vedic) is more granular. Many practitioners use both together for a fuller picture. Neither is empirically 'accurate', but both offer frameworks for self-reflection that resonate deeply for many people.",
  },
];

// ── Career Numbers ────────────────────────────────────────────────────────────

const CAREER_NUMBERS = [
  { num: 1, desc: "Leadership, entrepreneurship, innovation" },
  { num: 2, desc: "Counselling, diplomacy, human resources" },
  { num: 3, desc: "Arts, writing, entertainment, teaching" },
  { num: 4, desc: "Engineering, architecture, finance, management" },
  { num: 5, desc: "Sales, travel, journalism, marketing" },
  { num: 6, desc: "Healthcare, social work, interior design, parenting" },
  { num: 7, desc: "Research, data science, philosophy, spirituality" },
  { num: 8, desc: "Business, finance, law, real estate" },
  { num: 9, desc: "Humanitarian work, international NGOs, arts with purpose" },
];

// ── Main Component ────────────────────────────────────────────────────────────

export default function NameNumerologyCalculator() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [system, setSystem] = useState<SystemType>("pythagorean");
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { exportToPdf } = usePdfExport();

  function handleCalculate() {
    if (!name.trim() || !dob.trim()) return;
    setResult(compute(name.trim(), dob.trim(), system));
  }

  const bgPage = { background: "oklch(0.14 0.04 28)" };
  const goldText = { color: "oklch(0.78 0.14 75)" };
  const mutedText = { color: "oklch(0.72 0.03 65)" };

  return (
    <div data-ocid="name-numerology-calculator-page" style={bgPage}>
      {/* ── Hero Banner ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 220,
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 25) 0%, oklch(0.16 0.06 22) 60%, oklch(0.12 0.04 20) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 80% 30%, oklch(0.62 0.18 48) 0%, transparent 50%)",
          }}
        />
        <div className="relative container mx-auto px-4 py-14 text-center">
          <div className="text-4xl mb-3">🔢</div>
          <h1
            className="font-heading text-3xl md:text-5xl font-bold mb-3"
            style={goldText}
          >
            Name Numerology Calculator
          </h1>
          <p
            className="font-body text-base md:text-lg max-w-2xl mx-auto"
            style={mutedText}
          >
            Discover your Destiny, Soul Urge, Personality &amp; Life Path
            numbers through the ancient science of numerology.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* ── Calculator Card ── */}
        <Card
          className="mb-10 overflow-hidden"
          style={{
            background: "oklch(0.19 0.055 27)",
            border: "1px solid oklch(0.78 0.14 75 / 0.35)",
          }}
        >
          <div
            className="px-6 py-4 border-b"
            style={{
              background: "oklch(0.22 0.07 26)",
              borderColor: "oklch(0.78 0.14 75 / 0.25)",
            }}
          >
            <h2 className="font-heading text-xl font-semibold" style={goldText}>
              Calculate Your Numerology Numbers
            </h2>
            <p className="text-sm mt-0.5" style={mutedText}>
              Enter your full name as used in official documents for the most
              accurate reading.
            </p>
          </div>
          <CardContent className="p-6 space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <Label
                className="font-heading font-semibold text-sm"
                style={goldText}
              >
                Full Name *
              </Label>
              <Input
                data-ocid="name-input"
                placeholder="e.g. Rajat Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <Label
                className="font-heading font-semibold text-sm"
                style={goldText}
              >
                Date of Birth * (DD/MM/YYYY)
              </Label>
              <Input
                data-ocid="dob-input"
                placeholder="e.g. 15/08/1992"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* System Selector */}
            <div className="space-y-1.5">
              <Label
                className="font-heading font-semibold text-sm"
                style={goldText}
              >
                Numerology System
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {(["pythagorean", "chaldean", "sepharial"] as SystemType[]).map(
                  (s) => (
                    <button
                      key={s}
                      type="button"
                      data-ocid={`system-${s}`}
                      onClick={() => setSystem(s)}
                      className="rounded-lg py-2.5 px-3 text-sm font-heading font-semibold transition-all duration-200 capitalize border"
                      style={
                        system === s
                          ? {
                              background: "oklch(0.62 0.18 48 / 0.25)",
                              color: "oklch(0.78 0.14 75)",
                              borderColor: "oklch(0.78 0.14 75 / 0.6)",
                            }
                          : {
                              background: "oklch(0.18 0.04 28)",
                              color: "oklch(0.65 0.04 60)",
                              borderColor: "oklch(0.30 0.06 30)",
                            }
                      }
                    >
                      {s}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Calculate */}
            <Button
              type="button"
              data-ocid="calculate-btn"
              onClick={handleCalculate}
              disabled={!name.trim() || !dob.trim()}
              className="w-full font-heading font-bold text-base py-5 transition-all duration-200"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.2 48) 0%, oklch(0.58 0.18 40) 100%)",
                color: "oklch(0.99 0.005 80)",
                border: "none",
              }}
            >
              ✨ Calculate My Numbers
            </Button>
          </CardContent>
        </Card>

        {/* ── Inline Result ── */}
        {result && (
          <div
            id="name-numerology-results"
            data-ocid="numerology-result"
            className="mb-10 rounded-2xl overflow-hidden"
            style={{
              border: "1px solid oklch(0.78 0.14 75 / 0.4)",
              background: "oklch(0.17 0.05 27)",
            }}
          >
            <div
              className="px-6 py-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.25 0.08 28) 0%, oklch(0.20 0.06 26) 100%)",
                borderBottom: "1px solid oklch(0.78 0.14 75 / 0.25)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌟</span>
                <div>
                  <h3
                    className="font-heading text-lg font-bold"
                    style={goldText}
                  >
                    Your Numerology Reading
                  </h3>
                  <p className="text-xs" style={mutedText}>
                    {name} · {system.charAt(0).toUpperCase() + system.slice(1)}{" "}
                    System
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 grid gap-4 sm:grid-cols-2">
              <ResultNumberCard
                label="Destiny Number"
                number={result.destinyNumber}
                explanation={result.destinyExplanation}
                icon="🎯"
              />
              <ResultNumberCard
                label="Soul Urge Number"
                number={result.soulUrgeNumber}
                explanation={result.soulUrgeExplanation}
                icon="💫"
              />
              <ResultNumberCard
                label="Personality Number"
                number={result.personalityNumber}
                explanation={result.personalityExplanation}
                icon="🪞"
              />
              <ResultNumberCard
                label="Life Path Number"
                number={result.lifePathNumber}
                explanation={result.lifePathExplanation}
                icon="🛤️"
              />
            </div>
            {/* CTA Buttons */}
            <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                data-ocid="talk-astrologer-btn"
                className="flex-1 font-heading font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.2 48), oklch(0.58 0.18 40))",
                  color: "oklch(0.99 0.005 80)",
                  border: "none",
                }}
              >
                📞 Talk to Astrologer
              </Button>
              <Button
                type="button"
                data-ocid="chat-astrologer-btn"
                variant="outline"
                className="flex-1 font-heading font-semibold border"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.5)",
                  color: "oklch(0.78 0.14 75)",
                  background: "transparent",
                }}
              >
                💬 Chat with Astrologer
              </Button>
              <Button
                type="button"
                data-ocid="export-pdf-btn"
                className="flex-1 font-heading font-semibold"
                onClick={() =>
                  exportToPdf(
                    "name-numerology-results",
                    "name-numerology-result",
                    "Name Numerology Result",
                  )
                }
                style={{
                  background: "oklch(0.78 0.14 75)",
                  color: "#1a0a00",
                  border: "none",
                }}
              >
                Export as PDF
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            INFORMATIONAL SECTIONS
        ════════════════════════════════════════════════════════════════════ */}

        {/* What Is a Numerology Calculator? */}
        <section className="mb-10">
          <SectionHeading>What Is a Numerology Calculator?</SectionHeading>
          <InfoCard>
            <p className="font-body leading-relaxed" style={mutedText}>
              A numerology calculator is a tool that translates the letters in
              your name — and the digits in your date of birth — into
              single-digit (or master-number) values, revealing hidden patterns
              in your life. Unlike a horoscope that needs your exact birth time
              and place, numerology needs only your name and birthday, making it
              one of the most accessible forms of self-knowledge. The roots go
              back thousands of years to Pythagorean Greece, ancient Chaldean
              Babylon, and Vedic India, where scholars believed that numbers
              carry vibrational energy that shapes personality, destiny, and
              relationships.
            </p>
            <p className="font-body leading-relaxed mt-3" style={mutedText}>
              Today's online calculators do the heavy arithmetic in seconds —
              but the interpretive wisdom behind each number remains the same
              ancient science, now available to anyone with a name and a
              birthdate.
            </p>
          </InfoCard>
        </section>

        {/* How Does a Numerology Name Calculator Work? */}
        <section className="mb-10">
          <SectionHeading>
            How Does a Numerology Name Calculator Work?
          </SectionHeading>
          <InfoCard>
            <p className="font-body leading-relaxed" style={mutedText}>
              Each letter in your name is assigned a digit according to the
              chosen system. Those digits are added together and repeatedly
              reduced (digit sum) until a single digit or master number (11, 22,
              33) remains. Your date of birth follows the same reduction process
              for the Life Path Number.
            </p>
            <p className="font-body leading-relaxed mt-3" style={mutedText}>
              <strong style={goldText}>Example — RAJAT (Pythagorean):</strong>{" "}
              R=9, A=1, J=1, A=1, T=2 → Sum = 14 → 1+4 ={" "}
              <strong style={goldText}>5</strong>. Destiny Number 5 belongs to
              the freedom-seeker, adventurer, and communicator.
            </p>
          </InfoCard>
        </section>

        {/* Pythagorean System Table */}
        <section className="mb-10">
          <SectionHeading>The Pythagorean System</SectionHeading>
          <InfoCard>
            <p className="font-body leading-relaxed mb-5" style={mutedText}>
              The most widely used system in the West. Numbers 1–9 are assigned
              sequentially to the alphabet. Simple, logical, and
              beginner-friendly.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm rounded-lg overflow-hidden">
                <thead>
                  <tr style={{ background: "oklch(0.25 0.08 28)" }}>
                    <th
                      className="px-4 py-2.5 text-left font-heading font-semibold"
                      style={goldText}
                    >
                      Number
                    </th>
                    <th
                      className="px-4 py-2.5 text-left font-heading font-semibold"
                      style={goldText}
                    >
                      Letters
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PYTH_ROWS.map((row, i) => (
                    <tr
                      key={row.num}
                      style={{
                        background:
                          i % 2 === 0
                            ? "oklch(0.19 0.05 27)"
                            : "oklch(0.22 0.06 28)",
                      }}
                    >
                      <td
                        className="px-4 py-2.5 font-bold font-heading"
                        style={goldText}
                      >
                        {row.num}
                      </td>
                      <td className="px-4 py-2.5 font-body" style={mutedText}>
                        {row.letters}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InfoCard>
        </section>

        {/* Chaldean System */}
        <section className="mb-10">
          <SectionHeading>The Chaldean System</SectionHeading>
          <InfoCard>
            <p className="font-body leading-relaxed" style={mutedText}>
              The Chaldean system, born in ancient Mesopotamia, assigns numbers
              based on the <em>vibrational energy</em> of each letter rather
              than simple alphabetical sequence. The number 9 is considered
              sacred and is never assigned directly to a letter. This system is
              regarded as more spiritually accurate but also more complex.
            </p>
            <p className="font-body leading-relaxed mt-3" style={mutedText}>
              <strong style={goldText}>Priya's story:</strong> Priya, a Mumbai
              marketing executive, calculated her Life Path under the Chaldean
              system and discovered it was 9 — the universal humanitarian. She
              had always felt unfulfilled chasing quarterly targets. Seeing her
              chart validated her pull toward purpose-driven work, and she
              eventually transitioned to a nonprofit focused on rural education.
              "The number didn't make the decision," she says, "but it gave me
              the language to trust what I already felt."
            </p>
          </InfoCard>
        </section>

        {/* Key Numbers */}
        <section className="mb-10">
          <SectionHeading>Key Numbers in Your Numerology Chart</SectionHeading>
          <div className="space-y-4">
            <InfoCard>
              <h3
                className="font-heading font-bold text-lg mb-2"
                style={goldText}
              >
                🎯 Destiny Number (Expression Number)
              </h3>
              <p className="font-body leading-relaxed" style={mutedText}>
                Calculated from all letters in your full birth name, this number
                reveals your life's overarching purpose — what you are here to
                do. A person with Destiny Number{" "}
                <strong style={goldText}>7</strong> is the natural researcher:
                drawn to libraries, laboratories, philosophy, and the quiet
                corners of the internet where truth hides. They find meaning not
                in the spotlight but in deep understanding.
              </p>
            </InfoCard>
            <InfoCard>
              <h3
                className="font-heading font-bold text-lg mb-2"
                style={goldText}
              >
                💫 Soul Urge Number (Heart's Desire)
              </h3>
              <p className="font-body leading-relaxed" style={mutedText}>
                Derived from the vowels in your name, this number reflects what
                your inner self truly craves — beyond what the world expects of
                you.
              </p>
              <p className="font-body leading-relaxed mt-2" style={mutedText}>
                <strong style={goldText}>Raj's story:</strong> Raj had a
                successful corporate career (Destiny 1 — the achiever) but felt
                hollow. His Soul Urge turned out to be{" "}
                <strong style={goldText}>8</strong> — craving recognition and
                material power, yes — but also a deep hunger to be seen as
                significant. Once he understood this, he stopped fighting the
                ambition and channelled it into building his own company. The
                hunger became his engine, not his shame.
              </p>
            </InfoCard>
            <InfoCard>
              <h3
                className="font-heading font-bold text-lg mb-2"
                style={goldText}
              >
                🪞 Personality Number
              </h3>
              <p className="font-body leading-relaxed" style={mutedText}>
                Calculated from the consonants, this number shows the mask you
                wear — how strangers and first impressions perceive you — before
                they know your inner world. It shapes first dates, job
                interviews, and networking introductions.
              </p>
            </InfoCard>
            <InfoCard>
              <h3
                className="font-heading font-bold text-lg mb-2"
                style={goldText}
              >
                🛤️ Birth Date / Life Path Number
              </h3>
              <p className="font-body leading-relaxed" style={mutedText}>
                The most important number in numerology. Derived entirely from
                your date of birth, it describes the broad highway your life
                travels — the recurring themes, lessons, and types of experience
                you will encounter across your lifetime. Unlike your name
                numbers, it cannot be changed.
              </p>
            </InfoCard>
          </div>
        </section>

        {/* How Name Number Influences Life */}
        <section className="mb-10">
          <SectionHeading>How Your Name Number Influences Life</SectionHeading>

          {/* Career */}
          <InfoCard>
            <h3
              className="font-heading font-bold text-lg mb-4"
              style={goldText}
            >
              💼 Career Guidance by Destiny Number
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {CAREER_NUMBERS.map((c) => (
                <div
                  key={c.num}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: "oklch(0.17 0.045 27)" }}
                >
                  <Badge
                    className="shrink-0 font-heading font-bold text-xs h-6 w-6 flex items-center justify-center rounded-full p-0"
                    style={{
                      background: "oklch(0.62 0.18 48 / 0.25)",
                      color: "oklch(0.78 0.14 75)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.4)",
                    }}
                  >
                    {c.num}
                  </Badge>
                  <span className="text-sm font-body" style={mutedText}>
                    {c.desc}
                  </span>
                </div>
              ))}
            </div>
          </InfoCard>

          {/* Relationships */}
          <InfoCard>
            <h3
              className="font-heading font-bold text-lg mb-2"
              style={goldText}
            >
              ❤️ Relationships
            </h3>
            <p className="font-body leading-relaxed" style={mutedText}>
              Numbers carry complementary vibrations. For example, a{" "}
              <strong style={goldText}>2</strong> (the deep feeler who craves
              partnership) pairs naturally with a{" "}
              <strong style={goldText}>6</strong> (the nurturing caregiver) —
              both value harmony and emotional security above achievement.
              Friction often appears when a freedom-loving 5 partners with a
              home-building 4 without mutual awareness of their different core
              needs.
            </p>
          </InfoCard>

          {/* Personal Challenges */}
          <InfoCard>
            <h3
              className="font-heading font-bold text-lg mb-2"
              style={goldText}
            >
              ⚡ Personal Challenges
            </h3>
            <p className="font-body leading-relaxed" style={mutedText}>
              <strong style={goldText}>Kavita's story:</strong> Kavita, a
              freelance journalist from Pune, had Destiny Number{" "}
              <strong style={goldText}>5</strong> — adventure, freedom, variety.
              She loved it… until she realised she had started seventeen
              projects in two years and finished none. Her challenge number
              confirmed what her friends whispered: she scattered her energy.
              Understanding this didn't fix the habit overnight, but it gave her
              a framework — every project now gets a 90-day commitment before
              she's allowed to pivot. Small structure, big results.
            </p>
          </InfoCard>
        </section>

        {/* Improving Your Life */}
        <section className="mb-10">
          <SectionHeading>
            Improving Your Life Through Numerology
          </SectionHeading>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: "💪",
                title: "Working With Strengths",
                body: "Your Destiny Number highlights innate gifts. Rather than fighting your nature, lean into it. A 3 trying to work in isolation will always feel wrong — but put that same 3 in a communication-heavy role and watch them thrive.",
              },
              {
                icon: "🤝",
                title: "Understanding Relationships",
                body: "Comparing your Life Path and Soul Urge with a partner's numbers reveals where energies harmonise and where friction is built in — not as doom, but as awareness. Forewarned couples prepare rather than explode.",
              },
              {
                icon: "🗓️",
                title: "Making Important Decisions",
                body: "Personal Year cycles (calculated from your Life Path and the current calendar year) indicate whether this is a year for planting seeds, harvesting, or resting. Aligning big moves with supportive years dramatically improves outcomes.",
              },
              {
                icon: "✏️",
                title: "Is Your Current Name Working?",
                body: "Meera, a graphic designer in Bengaluru, was operating under a Number 7 name — analytical, solitary, perfect for research but poor for client-facing creative work. She added an 'a' to her professional name, shifting it to 3. Within eight months her referral network had tripled. Small edit, big energetic realignment.",
              },
            ].map(({ icon, title, body }) => (
              <InfoCard key={title}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{icon}</span>
                  <h3
                    className="font-heading font-bold text-base"
                    style={goldText}
                  >
                    {title}
                  </h3>
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={mutedText}
                >
                  {body}
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Choosing the Right Calculator */}
        <section className="mb-10">
          <SectionHeading>Choosing the Right Calculator</SectionHeading>
          <InfoCard>
            <p className="font-body leading-relaxed mb-4" style={mutedText}>
              Not all numerology calculators are equal. Here's what to look for
              in a reliable tool:
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: "⚖️",
                  title: "Multiple Systems",
                  body: "A good calculator offers Pythagorean, Chaldean, and Sepharial options. Each system has different cultural roots and interpretive emphasis — cross-checking two systems deepens accuracy.",
                },
                {
                  icon: "📊",
                  title: "Comprehensive Results",
                  body: "Look for tools that return at minimum: Destiny, Soul Urge, Personality, and Life Path numbers. Advanced tools add Personal Year, Karmic Debt, and Master Number flags.",
                },
                {
                  icon: "📖",
                  title: "Detailed Interpretations",
                  body: "Raw numbers without context are nearly useless. A quality calculator explains the meaning of each number in plain, relevant language — not vague platitudes.",
                },
                {
                  icon: "🔤",
                  title: "Name Modification Suggestions",
                  body: "Premium tools go further: they show how changing even one letter in your name would shift your numbers, helping you make conscious adjustments if desired.",
                },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: "oklch(0.17 0.045 27)" }}
                >
                  <span className="text-xl shrink-0">{icon}</span>
                  <div>
                    <h4
                      className="font-heading font-semibold text-sm mb-1"
                      style={goldText}
                    >
                      {title}
                    </h4>
                    <p className="font-body text-sm" style={mutedText}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </InfoCard>
        </section>

        {/* Common Questions */}
        <section className="mb-10">
          <SectionHeading>Common Questions About Numerology</SectionHeading>
          <div className="space-y-3">
            {[
              {
                q: "Should I use my nickname or legal name?",
                a: "Always start with your full name exactly as it appears on your birth certificate — this is your Destiny Number. Your nickname or commonly used name gives your 'active' vibration, which can be equally illuminating, but use both for a complete picture.",
              },
              {
                q: "Does my last name matter?",
                a: "Yes. Your Destiny Number uses every letter — first, middle, and last. Your last name carries ancestral/family energy; your first name reflects individual expression. Together they form the complete blueprint.",
              },
              {
                q: "Can numerology predict the future?",
                a: "Not in a deterministic sense. Numerology describes tendencies, cycles, and archetypal patterns — not specific events. Think of it as weather forecasting: it can say 'a storm is likely in Q3' but not 'you will lose your job on October 15'.",
              },
              {
                q: "How often should I recalculate?",
                a: "Your core numbers (Life Path, full-name Destiny) are fixed for life. But your Personal Year number changes every calendar year, so recalculating it annually — especially around your birthday — is valuable for planning.",
              },
              {
                q: "What are master numbers?",
                a: "11, 22, and 33 are not reduced to a single digit because they carry amplified energy. 11 is the Intuitive Messenger; 22 is the Master Builder; 33 is the Master Teacher. They come with heightened potential but also greater challenge.",
              },
            ].map(({ q, a }) => (
              <InfoCard key={q}>
                <h4
                  className="font-heading font-semibold text-sm mb-1.5"
                  style={goldText}
                >
                  Q: {q}
                </h4>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={mutedText}
                >
                  {a}
                </p>
              </InfoCard>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-10">
          <SectionHeading>Conclusion</SectionHeading>
          <InfoCard>
            <p className="font-body leading-relaxed" style={mutedText}>
              Numerology is not a crystal ball — it is a mirror. The numbers
              derived from your name and birth date don't dictate your fate;
              they illuminate the landscape you are already walking. Whether you
              use this tool for fun, self-reflection, career planning, or
              spiritual growth, the real value is the awareness it seeds. When
              you understand why you gravitate toward certain experiences,
              relationships, or career paths, you can lean into your strengths,
              navigate your challenges with more grace, and make decisions that
              feel aligned rather than arbitrary.
            </p>
            <p className="font-body leading-relaxed mt-3" style={mutedText}>
              Use this calculator as a starting point. For personalised depth —
              especially when making major life decisions — a conversation with
              an experienced numerologist or astrologer on Spiritual Connect can
              unlock insights no algorithm captures on its own.
            </p>
          </InfoCard>
        </section>

        {/* Discover More About Yourself */}
        <section
          className="mb-10 rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 28) 0%, oklch(0.18 0.06 25) 100%)",
            border: "1px solid oklch(0.78 0.14 75 / 0.3)",
          }}
        >
          <div className="p-8 text-center">
            <h2
              className="font-heading text-2xl md:text-3xl font-bold mb-3"
              style={goldText}
            >
              Discover More About Yourself
            </h2>
            <p className="font-body mb-6 max-w-xl mx-auto" style={mutedText}>
              Ready to unlock deeper insights? Explore our personalised
              calculators that reveal hidden aspects of your personality and
              destiny.
            </p>
            <div
              className="rounded-xl p-5 mb-6 text-left"
              style={{
                background: "oklch(0.16 0.05 26)",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <h3
                className="font-heading font-bold text-base mb-2"
                style={goldText}
              >
                🛕 Spiritual Connect Store
              </h3>
              <p className="font-body text-sm" style={mutedText}>
                Browse our spiritual marketplace featuring sacred idols, evil
                eye protection, Rudraksha beads, healing crystals, spiritual
                gifting &amp; décor, Pooja essentials, love items, and zodiac
                collection to support your spiritual journey.
              </p>
              <p
                className="font-body text-sm mt-2 font-semibold"
                style={{ color: "oklch(0.72 0.18 55)" }}
              >
                ✨ Plus Much More
              </p>
              <p className="font-body text-sm" style={mutedText}>
                Compatibility calculators, birth chart generators, and
                personality assessments await your discovery.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                type="button"
                data-ocid="explore-calculators-btn"
                className="font-heading font-semibold"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.2 48), oklch(0.58 0.18 40))",
                  color: "oklch(0.99 0.005 80)",
                  border: "none",
                }}
              >
                🔮 Explore All Calculators
              </Button>
              <Button
                type="button"
                data-ocid="visit-shop-btn"
                variant="outline"
                className="font-heading font-semibold border"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.5)",
                  color: "oklch(0.78 0.14 75)",
                  background: "transparent",
                }}
              >
                🛕 Visit Spiritual Shop
              </Button>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div
                key={faq.q}
                data-ocid={`faq-item-${i}`}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.78 0.14 75 / 0.2)" }}
              >
                <button
                  type="button"
                  data-ocid={`faq-toggle-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
                  style={{
                    background:
                      openFaq === i
                        ? "oklch(0.22 0.07 27)"
                        : "oklch(0.19 0.055 27)",
                  }}
                >
                  <span
                    className="font-heading font-semibold text-sm pr-4"
                    style={goldText}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 text-lg transition-transform duration-200"
                    style={{
                      ...goldText,
                      transform:
                        openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    className="px-5 py-4"
                    style={{ background: "oklch(0.17 0.045 27)" }}
                  >
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={mutedText}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
