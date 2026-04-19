import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";

// ─── Algorithm ────────────────────────────────────────────────────────────────
function nameToNumber(name: string): number {
  return name
    .toUpperCase()
    .split("")
    .filter((c) => c >= "A" && c <= "Z")
    .reduce((acc, c) => acc + (c.charCodeAt(0) - 64), 0);
}

function calcLovePercent(name1: string, name2: string): number {
  const n1 = nameToNumber(name1);
  const n2 = nameToNumber(name2);
  const combined = n1 + n2;
  // Map to 0–100 range using a deterministic modulo formula
  const raw = (combined * 37 + 13) % 101;
  // Ensure it stays in 0–100
  return Math.abs(raw);
}

// ─── Love Quote of the Day ─────────────────────────────────────────────────────
const LOVE_QUOTES = [
  {
    quote: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn",
  },
  {
    quote:
      "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou",
  },
  {
    quote:
      "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    author: "Dr. Seuss",
  },
  {
    quote: "To love and be loved is to feel the sun from both sides.",
    author: "David Viscott",
  },
  {
    quote:
      "The greatest happiness of life is the conviction that we are loved; loved for ourselves, or rather, loved in spite of ourselves.",
    author: "Victor Hugo",
  },
];

function getLoveQuote() {
  const dayIndex = Math.floor(Date.now() / 86400000) % LOVE_QUOTES.length;
  return LOVE_QUOTES[dayIndex];
}

// ─── Result helpers ────────────────────────────────────────────────────────────
function getResultConfig(percent: number) {
  if (percent >= 75) {
    return {
      color: "oklch(0.60 0.18 145)",
      border: "oklch(0.60 0.18 145 / 0.35)",
      bg: "oklch(0.20 0.08 145 / 0.25)",
      label: "Deeply Compatible",
      emoji: "💖",
      message:
        "The stars align beautifully for you both! Your energies resonate on a soul level. This bond carries the warmth of a thousand suns — nurture it with trust and communication.",
    };
  }
  if (percent >= 45) {
    return {
      color: "oklch(0.78 0.16 75)",
      border: "oklch(0.78 0.16 75 / 0.35)",
      bg: "oklch(0.20 0.08 75 / 0.25)",
      label: "Good Compatibility",
      emoji: "💛",
      message:
        "There's a warm spark between you! With patience and understanding, this connection can bloom into something truly special. Celebrate your differences — they're your strength.",
    };
  }
  return {
    color: "oklch(0.65 0.20 32)",
    border: "oklch(0.65 0.20 32 / 0.35)",
    bg: "oklch(0.20 0.08 32 / 0.25)",
    label: "Building Compatibility",
    emoji: "🤍",
    message:
      "Every great love story takes time and effort. This is an invitation to learn each other deeply. Patience, respect, and genuine communication can transform any connection.",
  };
}

// ─── Heart Beat Animation (inline CSS keyframes via style tag) ─────────────────
const HEART_KEYFRAMES = `
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14%  { transform: scale(1.3); }
  28%  { transform: scale(1); }
  42%  { transform: scale(1.2); }
  70%  { transform: scale(1); }
}
.animate-heartbeat { animation: heartbeat 1.4s ease-in-out infinite; }
`;

// ─── Sub-components ────────────────────────────────────────────────────────────
function GenderSelector({
  value,
  onChange,
  label,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  id: string;
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
      <div className="flex gap-2">
        {["Male", "Female"].map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onChange(g)}
            className="flex-1 py-2.5 rounded-lg text-sm font-heading font-semibold transition-all duration-200"
            style={{
              background:
                value === g
                  ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                  : "oklch(0.22 0.06 25)",
              color: value === g ? "white" : "oklch(0.65 0.06 60)",
              border:
                value === g
                  ? "1px solid oklch(0.78 0.14 75 / 0.3)"
                  : "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
            aria-pressed={value === g}
          >
            {g === "Male" ? "♂ Male" : "♀ Female"}
          </button>
        ))}
      </div>
    </div>
  );
}

function NameInput({
  value,
  onChange,
  placeholder,
  label,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
  id: string;
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
        data-ocid="love-calc.name_input"
      />
    </div>
  );
}

// ─── Info Sections ─────────────────────────────────────────────────────────────
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

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is the love calculator true?",
    a: "Love calculators are a fun, light-hearted tool — not a scientific measurement. They work by combining name vibrations through numerological methods. While they can offer surprising coincidences, real compatibility grows from mutual respect, shared values, and genuine effort. Think of it as a playful cosmic nudge, not a verdict.",
  },
  {
    q: "How to calculate love percentage?",
    a: "Our calculator assigns numerical values to each letter in both names (A=1 through Z=26), sums them, and applies a harmonic formula to produce a 0–100% result. The number reflects the energetic resonance between the two names. Enter both names and click 'Calculate Love %' to see your result instantly.",
  },
  {
    q: "What is a love meter calculator?",
    a: "A love meter calculator is a digital tool that estimates the romantic compatibility between two people — usually based on their names, birthdates, or both. It's inspired by numerology and the idea that names carry unique vibrations. Our version uses letter-to-number mapping to generate a compatibility percentage in seconds.",
  },
  {
    q: "How can I take a love compatibility test?",
    a: "Simply enter your name and your partner's name in the fields above, select genders, and click 'Calculate Love %'. Your compatibility percentage will appear right on the page along with a personalized message. For deeper insights, consider a full Vedic kundali matching reading with an experienced astrologer.",
  },
  {
    q: "Can love calculators predict marriage success?",
    a: "No calculator can definitively predict marriage success — that depends on real-world factors like communication, trust, values, and life circumstances. However, numerological tools can highlight energetic patterns and potential areas of harmony or tension. For accurate marriage compatibility, Vedic astrology's kundali matching (guna milan) is a much more comprehensive approach.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LoveCalculator() {
  const [yourName, setYourName] = useState("");
  const [yourGender, setYourGender] = useState("Male");
  const [partnerName, setPartnerName] = useState("");
  const [partnerGender, setPartnerGender] = useState("Female");
  const [result, setResult] = useState<null | {
    percent: number;
    yourName: string;
    partnerName: string;
  }>(null);

  const { exportToPdf } = usePdfExport();

  const handleCalculate = () => {
    const n1 = yourName.trim();
    const n2 = partnerName.trim();
    if (!n1 || !n2) return;
    const percent = calcLovePercent(n1, n2);
    setResult({ percent, yourName: n1, partnerName: n2 });
  };

  const resultConfig = result ? getResultConfig(result.percent) : null;
  const quote = getLoveQuote();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.05 22) 0%, oklch(0.13 0.04 20) 100%)",
      }}
      data-ocid="love-calculator-page"
    >
      <style>{HEART_KEYFRAMES}</style>

      {/* ── Page Header ── */}
      <div
        className="text-center py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.07 28) 0%, oklch(0.17 0.06 24) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.12)",
        }}
      >
        <div className="text-4xl mb-3 animate-heartbeat inline-block">💕</div>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Love Calculator
        </h1>
        <p
          className="font-body text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.62 0.06 60)" }}
        >
          Discover the cosmic compatibility between two names. Enter your
          details and uncover what the universe says about your love connection.
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
            ❤ Calculate Your Love Compatibility
          </h2>

          {/* Two-column form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Column 1 — Your details */}
            <div
              className="rounded-xl p-5 space-y-4"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <p
                className="font-heading text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                Your Details
              </p>
              <NameInput
                id="your-name"
                label="Your Name"
                value={yourName}
                onChange={setYourName}
                placeholder="Enter your full name"
              />
              <GenderSelector
                id="your-gender"
                label="Your Gender"
                value={yourGender}
                onChange={setYourGender}
              />
            </div>

            {/* Column 2 — Partner details */}
            <div
              className="rounded-xl p-5 space-y-4"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <p
                className="font-heading text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                Partner's Details
              </p>
              <NameInput
                id="partner-name"
                label="Partner's Name"
                value={partnerName}
                onChange={setPartnerName}
                placeholder="Enter partner's full name"
              />
              <GenderSelector
                id="partner-gender"
                label="Partner's Gender"
                value={partnerGender}
                onChange={setPartnerGender}
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!yourName.trim() || !partnerName.trim()}
              className="px-10 py-3.5 rounded-xl font-heading font-bold text-base tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                boxShadow: "0 4px 16px oklch(0.62 0.18 48 / 0.25)",
              }}
              data-ocid="love-calc.calculate_button"
            >
              💖 Calculate Love %
            </button>
          </div>
        </div>

        {/* ── Inline Result ── */}
        {result && resultConfig && (
          <div
            id="love-results"
            className="rounded-2xl p-6 md:p-8 text-center transition-all"
            style={{
              background: resultConfig.bg,
              border: `2px solid ${resultConfig.border}`,
              boxShadow: `0 0 32px ${resultConfig.border}`,
            }}
            data-ocid="love-calc.result"
          >
            {/* Heart + Percentage */}
            <div className="mb-4">
              <div className="text-5xl mb-3 animate-heartbeat inline-block">
                {resultConfig.emoji}
              </div>
              <div
                className="font-heading text-6xl md:text-7xl font-bold mb-1"
                style={{ color: resultConfig.color }}
              >
                {result.percent}%
              </div>
              <div
                className="font-heading text-sm font-semibold uppercase tracking-widest"
                style={{ color: resultConfig.color }}
              >
                {resultConfig.label}
              </div>
            </div>

            {/* Names */}
            <div
              className="font-heading text-base font-medium mb-4"
              style={{ color: "oklch(0.80 0.05 70)" }}
            >
              {result.yourName} &amp; {result.partnerName}
            </div>

            {/* Progress bar */}
            <div
              className="w-full max-w-sm mx-auto h-3 rounded-full mb-5 overflow-hidden"
              style={{ background: "oklch(0.18 0.04 25)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${result.percent}%`,
                  background: `linear-gradient(90deg, ${resultConfig.color}, oklch(0.78 0.14 75))`,
                }}
              />
            </div>

            {/* Message */}
            <p
              className="font-body text-sm leading-relaxed max-w-lg mx-auto mb-6"
              style={{ color: "oklch(0.72 0.04 65)" }}
            >
              {resultConfig.message}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/astrologer-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                }}
                data-ocid="love-calc.talk_astrologer_cta"
              >
                🔭 Talk to Astrologer
              </a>
              <a
                href="/astrologer-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="love-calc.chat_astrologer_cta"
              >
                💬 Chat with Astrologer
              </a>
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "love-results",
                    "love-calculator-result",
                    "Love Compatibility Result",
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{ background: "oklch(0.78 0.14 75)", color: "#1a0a00" }}
                data-ocid="love-calc.export_pdf_button"
              >
                Export as PDF
              </button>
            </div>
          </div>
        )}

        {/* ── Love Quote of the Day ── (shown after result) */}
        {result && (
          <div
            className="rounded-xl px-6 py-5 text-center"
            style={{
              background: "oklch(0.20 0.06 28)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
            data-ocid="love-calc.quote"
          >
            <p
              className="font-heading text-xs uppercase tracking-widest mb-3"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              ✨ Love Quote of the Day
            </p>
            <blockquote
              className="font-body text-sm md:text-base italic leading-relaxed mb-2"
              style={{ color: "oklch(0.82 0.04 75)" }}
            >
              "{quote.quote}"
            </blockquote>
            <cite
              className="font-heading text-xs font-semibold not-italic"
              style={{ color: "oklch(0.65 0.08 60)" }}
            >
              — {quote.author}
            </cite>
          </div>
        )}

        {/* ── Informational Sections ── */}
        <InfoSection title="What is Love?">
          <p>
            Love is one of the most profound human experiences — a force that
            transcends language, culture, and time. In its deepest sense, love
            is not just a feeling but a conscious choice, a commitment to see
            another person fully and cherish them for who they are.
          </p>
          <p>
            Ancient Indian philosophy speaks of love as <em>prema</em> — a
            selfless, unconditional devotion that connects souls across
            lifetimes. Whether it's the tender warmth of companionship, the
            electric spark of romance, or the deep roots of spiritual union,
            love in all its forms is the very fabric of a meaningful life.
          </p>
          <p>
            Vedic astrology has always recognized love as a cosmic phenomenon —
            shaped by the positions of Venus (Shukra), the Moon, and the 7th and
            5th houses of your birth chart. Understanding these influences can
            help you navigate love with greater wisdom and clarity.
          </p>
        </InfoSection>

        <InfoSection title="What is a Love Calculator by Name?" alternate>
          <p>
            A Love Calculator by name is a numerology-inspired tool that
            estimates romantic compatibility between two people based on the
            vibrational energy of their names. Every letter carries a numerical
            value, and these values — when combined — reveal the harmonic
            resonance between two individuals.
          </p>
          <p>
            This concept draws from ancient traditions where names were believed
            to hold the essence of a person's destiny. In Vedic numerology, your
            name is not random — it carries frequencies that interact with the
            universe and with others around you.
          </p>
          <p>
            While it's a fun and revealing exercise, think of it as a cosmic
            conversation starter rather than a final verdict. Real love is built
            on effort, trust, and alignment — the calculator simply offers a
            glimpse into the energetic blueprint.
          </p>
        </InfoSection>

        <InfoSection title="How Does Our Love Calculator Work?">
          <p className="font-semibold" style={{ color: "oklch(0.78 0.14 75)" }}>
            Our calculator follows a simple yet meaningful 6-step process:
          </p>
          <ol className="space-y-2 list-none pl-0">
            {[
              {
                n: "1",
                t: "Enter Both Names",
                d: "Type your name and your partner's name into the two input fields.",
              },
              {
                n: "2",
                t: "Letter Mapping",
                d: "Each letter is converted to a number (A=1, B=2 ... Z=26), capturing the unique vibrational signature of each name.",
              },
              {
                n: "3",
                t: "Sum Calculation",
                d: "The numerical values for all letters in each name are summed, creating a single vibration number per person.",
              },
              {
                n: "4",
                t: "Combine & Harmonize",
                d: "The two vibration numbers are combined using a harmonic formula that mirrors numerological compatibility principles.",
              },
              {
                n: "5",
                t: "Generate Percentage",
                d: "The combined value is mapped to a 0–100% scale, representing the energetic resonance between both names.",
              },
              {
                n: "6",
                t: "Interpret Your Result",
                d: "You receive a compatibility percentage, color-coded label, and a personalized message explaining what the numbers reveal.",
              },
            ].map((step) => (
              <li key={step.n} className="flex gap-3 items-start">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.18)",
                    color: "oklch(0.78 0.14 75)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                  }}
                >
                  {step.n}
                </span>
                <div>
                  <span
                    className="font-heading font-semibold"
                    style={{ color: "oklch(0.80 0.06 70)" }}
                  >
                    {step.t}:{" "}
                  </span>
                  {step.d}
                </div>
              </li>
            ))}
          </ol>
        </InfoSection>

        <InfoSection title="Benefits of Using a Love Calculator" alternate>
          <ul className="space-y-3 list-none pl-0">
            {[
              {
                icon: "⚡",
                title: "Quick & Easy",
                desc: "Get instant results in seconds — no complex inputs or lengthy questionnaires needed.",
              },
              {
                icon: "😄",
                title: "Fun & Light-Hearted",
                desc: "A delightful way to explore romantic energy with a smile. Great for couples and curious souls alike.",
              },
              {
                icon: "🔍",
                title: "Gives Relationship Clues",
                desc: "Numerological patterns can reveal subtle energetic dynamics that might reflect real-life relationship tendencies.",
              },
              {
                icon: "🤔",
                title: "Helps When Confused",
                desc: "When feelings are uncertain, a fun external perspective — even a playful one — can help clarify your thoughts.",
              },
              {
                icon: "🪞",
                title: "Learn More About Yourself",
                desc: "Understanding your name's vibration can offer insight into your own personality and what you seek in a partner.",
              },
              {
                icon: "💬",
                title: "Great Conversation Starter",
                desc: "Share your result with your partner and spark a meaningful (or hilarious) discussion about your connection.",
              },
              {
                icon: "💪",
                title: "Real Love Needs Effort",
                desc: "No calculator replaces genuine love. The best result is your own commitment to grow, communicate, and cherish each other.",
              },
            ].map((b) => (
              <li key={b.title} className="flex gap-3 items-start">
                <span className="text-xl flex-shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <span
                    className="font-heading font-semibold"
                    style={{ color: "oklch(0.80 0.06 70)" }}
                  >
                    {b.title}:{" "}
                  </span>
                  {b.desc}
                </div>
              </li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title="Conclusion">
          <p>
            Love is one of life's greatest mysteries — beautiful, complex, and
            endlessly rewarding. While a Love Calculator offers a fun and
            numerologically inspired glimpse into compatibility, it's only a
            starting point. The real magic happens when two people choose each
            other with intention, care, and patience.
          </p>
          <p>
            Whether your result was 92% or 34%, remember: numbers reflect
            patterns, not destiny. Use this tool as a conversation opener, a
            moment of reflection, or simply a smile-inducing discovery. Your
            love story is yours to write.
          </p>
          <p>
            For deeper compatibility insights — including kundali matching, Guna
            Milan, Venus and Mars analysis, and the most auspicious marriage
            timing — connecting with an experienced astrologer on Spiritual
            Connect can illuminate your path with genuine, personalized wisdom.
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
          data-ocid="love-calc.discover_more"
        >
          <div className="text-3xl mb-3">✨</div>
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

          {/* Spiritual Connect Store */}

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
              🛍️ Spiritual Connect Store
            </h3>
            <p
              className="font-body text-sm leading-relaxed mb-3"
              style={{ color: "oklch(0.65 0.05 60)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting &
              décor, Pooja essentials, love items, and zodiac collection to
              support your spiritual journey.
            </p>
            <p
              className="font-body text-sm font-medium"
              style={{ color: "oklch(0.72 0.06 65)" }}
            >
              ✨ Plus Much More — Compatibility calculators, birth chart
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
            data-ocid="love-calc.all_calculators_link"
          >
            Explore All Calculators →
          </a>
        </div>

        {/* ── FAQs ── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
          data-ocid="love-calc.faqs"
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
                data-ocid="love-calc.faq_item"
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
