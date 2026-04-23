import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CalcCard {
  icon: string;
  title: string;
  badge?: string;
  desc: string;
  cta: string;
  link: string;
}

interface CalcSection {
  heading: string;
  cards: CalcCard[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const sections: CalcSection[] = [
  {
    heading: "Marriage & Compatibility",
    cards: [
      {
        icon: "♥",
        title: "Kundali Matching",
        badge: "Popular",
        desc: "Will this marriage work? Enter two birth charts and see your Ashtakoot compatibility score — the same Vedic method used for centuries.",
        cta: "Check Compatibility →",
        link: "/kundali-matching",
      },
      {
        icon: "♂",
        title: "Mangal Dosha Check",
        desc: "Am I Manglik? A clear yes-or-no answer with Mars placement details and severity — no fear-mongering, just clarity.",
        cta: "Check Mangal Dosha →",
        link: "/calculator/mangal-dosha",
      },
    ],
  },
  {
    heading: "Life Phases",
    cards: [
      {
        icon: "♄",
        title: "Sade Sati Check",
        desc: "Am I in Sade Sati? Find out if Saturn's 7.5-year transit is active, which phase you're in, and when it ends.",
        cta: "Check Sade Sati →",
        link: "/calculator/sade-sati",
      },
      {
        icon: "◑",
        title: "Dasha Calculator",
        desc: "What planetary period am I in? See your current Mahadasha and Antardasha, plus a visual timeline of the next 10 years.",
        cta: "Calculate Dasha →",
        link: "/calculator/dasha",
      },
    ],
  },
  {
    heading: "Career",
    cards: [
      {
        icon: "⬡",
        title: "Career & Life Path",
        desc: "What career suits me? Your 10th house lord reveals career direction — see your top 3 archetypes and current dasha implications.",
        cta: "Explore Career Path →",
        link: "/career-path",
      },
    ],
  },
  {
    heading: "Your Chart",
    cards: [
      {
        icon: "◇",
        title: "Free Kundli",
        desc: "Your complete birth chart — beautifully rendered. See all 9 planets, their houses, signs, and degrees.",
        cta: "Generate Kundli →",
        link: "/calculator/birth-chart",
      },
      {
        icon: "✦",
        title: "Nakshatra Calculator",
        desc: "Discover your birth star — the Nakshatra that shapes your personality, instincts, and emotional nature.",
        cta: "Calculate Nakshatra →",
        link: "/calculator/nakshatra",
      },
      {
        icon: "☽",
        title: "Rashi Calculator",
        desc: "Your Moon sign in Vedic astrology — the lens through which you feel, react, and connect with the world.",
        cta: "Calculate Rashi →",
        link: "/calculator/rashi",
      },
    ],
  },
];

const steps = [
  {
    num: "01",
    title: "Share what's on your mind",
    desc: "Your name, birth details, and whatever's weighing on you. No astrology knowledge needed. Just tell us what you need clarity on.",
  },
  {
    num: "02",
    title: "We read your birth chart",
    desc: "9 planets, Navamsa D9, and dasha periods — calculated with mathematical precision. Then woven into a personal narrative about your life.",
  },
  {
    num: "03",
    title: "Your blueprint arrives",
    desc: "A stunning PDF lands in your inbox. Your birth chart, your question, your story — beautifully designed and ready to read.",
  },
];

const mirrors = [
  { label: "THE MIRROR", desc: "Your personality, unfiltered" },
  { label: "THE REVEAL", desc: "Light, shadow & hidden gifts" },
  { label: "COSMIC DNA", desc: "Your full planetary blueprint" },
  { label: "WHY NOW", desc: "Why this feeling, right now" },
  { label: "THE DEEP TRUTH", desc: "Clarity — direct and deeply personal" },
  { label: "THE MAP", desc: "Decision windows ahead" },
  { label: "TOOLKIT", desc: "Practical remedies" },
];

const faqs = [
  {
    q: "What should I share in the form?",
    a: "Whatever is genuinely on your mind. A career crossroads, a relationship that confuses you, a feeling you can't quite name. There's no wrong way to fill it in — the more honestly you share, the more personal and specific your report becomes.",
  },
  {
    q: "What if I don't know my exact birth time?",
    a: "We'll use a sunrise chart for your birth location. You'll still get a detailed, personalized report — the planetary positions in signs remain accurate. House placements may shift slightly.",
  },
  {
    q: "How is this different from free horoscope sites?",
    a: "Free sites give you the same paragraph for every Scorpio. We calculate your exact birth chart using precise Vedic algorithms, then write a narrative specifically about your life and what you shared. No two reports are alike.",
  },
  {
    q: "How long does it take to get my report?",
    a: "After payment, your report is generated and delivered to your email as a PDF. The process typically takes a few minutes while we analyze your chart and write your personalized narrative.",
  },
  {
    q: "Is my data safe?",
    a: "Completely. Your birth details and what you share are used solely to generate your report. We do not share, sell, or store your personal data beyond what's needed to deliver your report. Payment is secured by Razorpay.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div
        className="h-px flex-1"
        style={{ background: "oklch(0.78 0.14 75 / 0.20)" }}
      />
      <h2
        className="font-heading text-xs font-bold uppercase tracking-widest px-2"
        style={{ color: "oklch(0.68 0.20 48)" }}
      >
        {label}
      </h2>
      <div
        className="h-px flex-1"
        style={{ background: "oklch(0.78 0.14 75 / 0.20)" }}
      />
    </div>
  );
}

function CalcCardItem({ card }: { card: CalcCard }) {
  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 group"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.22 0.07 28), oklch(0.20 0.05 22))",
        border: "1px solid oklch(0.78 0.14 75 / 0.18)",
      }}
      data-ocid="calculator_hub.card"
    >
      {card.badge && (
        <span
          className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-heading font-bold tracking-wide"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
            color: "white",
            boxShadow: "0 2px 8px oklch(0.68 0.20 48 / 0.40)",
          }}
        >
          {card.badge}
        </span>
      )}

      <div className="flex items-center gap-3">
        <span
          className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0"
          style={{
            background: "oklch(0.68 0.20 48 / 0.12)",
            border: "1px solid oklch(0.68 0.20 48 / 0.25)",
          }}
          aria-hidden="true"
        >
          {card.icon}
        </span>
        <h3
          className="font-heading font-bold text-base"
          style={{ color: "oklch(0.90 0.08 70)" }}
        >
          {card.title}
        </h3>
      </div>

      <p
        className="text-sm leading-relaxed font-body flex-1"
        style={{ color: "oklch(0.68 0.06 60)" }}
      >
        {card.desc}
      </p>

      <Link
        to={card.link as "/"}
        className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-sm font-heading font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
          color: "white",
        }}
        data-ocid="calculator_hub.open_button"
      >
        {card.cta}
      </Link>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        border: "1px solid oklch(0.78 0.14 75 / 0.15)",
        background: open ? "oklch(0.22 0.07 28)" : "oklch(0.20 0.05 24)",
      }}
      data-ocid="calculator_hub.faq_item"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between p-5 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="font-heading font-semibold text-sm"
          style={{ color: "oklch(0.88 0.08 70)" }}
        >
          {q}
        </span>
        {open ? (
          <ChevronUp
            className="h-4 w-4 flex-shrink-0"
            style={{ color: "oklch(0.68 0.20 48)" }}
          />
        ) : (
          <ChevronDown
            className="h-4 w-4 flex-shrink-0"
            style={{ color: "oklch(0.68 0.20 48)" }}
          />
        )}
      </button>
      {open && (
        <p
          className="px-5 pb-5 text-sm leading-relaxed font-body"
          style={{ color: "oklch(0.65 0.06 58)" }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CalculatorIndex() {
  useEffect(() => {
    document.title = "Free Vedic Calculators — Spiritual Connect";
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.05 22) 0%, oklch(0.13 0.03 20) 100%)",
      }}
    >
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden py-20 px-4 text-center"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.28 0.10 48 / 0.40) 0%, transparent 70%)",
        }}
        data-ocid="calculator_hub.hero_section"
      >
        {/* Decorative orbs */}
        <div
          className="absolute top-0 left-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.20 48 / 0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-1/4 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.14 75 / 0.06) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto">
          <span
            className="text-2xl block mb-4 animate-pulse"
            style={{ color: "oklch(0.68 0.20 48)" }}
            aria-hidden="true"
          >
            ✦
          </span>

          <h1
            className="font-heading font-bold text-4xl md:text-6xl mb-4 leading-tight"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.14 70), oklch(0.68 0.20 48), oklch(0.78 0.14 75))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Free Vedic Calculators
          </h1>

          <p
            className="font-heading text-xl md:text-2xl font-semibold mb-1"
            style={{ color: "oklch(0.82 0.10 68)" }}
          >
            Bring your worries.
          </p>
          <p
            className="font-heading text-xl md:text-2xl font-semibold mb-6"
            style={{ color: "oklch(0.82 0.10 68)" }}
          >
            Let Vedic astrology show you the way.
          </p>

          <p
            className="font-body text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.62 0.06 58)" }}
          >
            No sign-ups. No fees. Just your birth details and instant clarity —
            powered by the same Vedic mathematics behind our premium reports.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div
              className="h-px w-16"
              style={{ background: "oklch(0.68 0.20 48 / 0.40)" }}
            />
            <span style={{ color: "oklch(0.68 0.20 48 / 0.60)" }}>✦</span>
            <div
              className="h-px w-16"
              style={{ background: "oklch(0.68 0.20 48 / 0.40)" }}
            />
          </div>
        </div>
      </div>

      {/* ── CALCULATOR SECTIONS ────────────────────────────────────────────── */}
      <div
        className="max-w-5xl mx-auto px-4 pb-16"
        data-ocid="calculator_hub.calculators_section"
      >
        {sections.map((section) => (
          <div key={section.heading} className="mb-12">
            <SectionDivider label={section.heading} />
            <div
              className={`grid gap-5 ${
                section.cards.length === 1
                  ? "grid-cols-1 max-w-md"
                  : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {section.cards.map((card) => (
                <CalcCardItem key={card.title} card={card} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── PREMIUM UPSELL ─────────────────────────────────────────────────── */}
      <div
        className="py-20 px-4"
        style={{ background: "oklch(0.18 0.06 25)" }}
        data-ocid="calculator_hub.upsell_section"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="font-heading font-bold text-3xl md:text-4xl mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.14 70), oklch(0.68 0.20 48))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Three simple steps. Yours forever.
          </h2>
          <p
            className="font-body text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ color: "oklch(0.62 0.06 58)" }}
          >
            No sign-ups. No apps. Just your birth details, what's on your mind,
            and a deeply personal report in your inbox.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl p-6 text-left"
                style={{
                  background: "oklch(0.22 0.07 28)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
                data-ocid="calculator_hub.step_card"
              >
                <span
                  className="font-heading font-bold text-3xl block mb-4"
                  style={{ color: "oklch(0.68 0.20 48 / 0.50)" }}
                >
                  {step.num}
                </span>
                <h3
                  className="font-heading font-bold text-base mb-3"
                  style={{ color: "oklch(0.88 0.08 70)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.62 0.06 58)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reports"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
                boxShadow: "0 4px 16px oklch(0.68 0.20 48 / 0.35)",
              }}
              data-ocid="calculator_hub.get_report_button"
            >
              Get My Personalised Report
            </Link>
            <Link
              to="/calculator-index"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:bg-white/10"
              style={{
                border: "1px solid oklch(0.78 0.14 75 / 0.30)",
                color: "oklch(0.78 0.14 75)",
              }}
              data-ocid="calculator_hub.browse_button"
            >
              Browse All Calculators
            </Link>
          </div>
        </div>
      </div>

      {/* ── WHAT'S INSIDE ──────────────────────────────────────────────────── */}
      <div
        className="py-20 px-4"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.15 0.04 20) 0%, oklch(0.17 0.06 24) 100%)",
        }}
        data-ocid="calculator_hub.whats_inside_section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="font-heading text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              What's Inside
            </p>
            <h2
              className="font-heading font-bold text-3xl md:text-4xl mb-4"
              style={{ color: "oklch(0.88 0.08 70)" }}
            >
              Not a Horoscope. A Mirror.
            </h2>
            <p
              className="font-body text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.60 0.06 58)" }}
            >
              Every page is woven around what you shared. No generic sun-sign
              fluff. This is your chart, your story, your clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mirrors.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl p-5 flex flex-col gap-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  background: "oklch(0.21 0.07 28)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
                data-ocid="calculator_hub.mirror_card"
              >
                <span
                  className="text-xs font-heading font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  {m.label}
                </span>
                <p
                  className="font-body text-sm leading-snug"
                  style={{ color: "oklch(0.70 0.06 62)" }}
                >
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <div
        className="py-20 px-4"
        style={{ background: "oklch(0.18 0.06 25)" }}
        data-ocid="calculator_hub.faq_section"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p
              className="font-heading text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              Questions
            </p>
            <h2
              className="font-heading font-bold text-2xl md:text-3xl"
              style={{ color: "oklch(0.88 0.08 70)" }}
            >
              Everything you need to know
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/reports"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 hover:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
              data-ocid="calculator_hub.final_cta_button"
            >
              Get My Report Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
