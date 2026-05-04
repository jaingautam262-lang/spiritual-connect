import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, XCircle } from "lucide-react";
import { motion } from "motion/react";

const REPORT_SECTIONS = [
  {
    icon: "📅",
    title: "DOB & Life Path Analysis",
    desc: "Understand your life direction, strengths, and life purpose",
  },
  {
    icon: "📆",
    title: "Personal Year Enhancement Guidance",
    desc: "Align your actions with your current personal year energy",
  },
  {
    icon: "📱",
    title: "Mobile Number Analysis",
    desc: "Identify hidden blocks affecting money & relationships",
  },
  {
    icon: "🎨",
    title: "Mobile Cover Colour Recommendation",
    desc: "Simple daily energy alignment",
  },
  {
    icon: "💼",
    title: "Profession Guidance",
    desc: "Reduced confusion, clearer decisions",
  },
  {
    icon: "🔤",
    title: "Birth Number & Name Analysis",
    desc: "Reveal how your name and numbers influence growth and decisions",
  },
  {
    icon: "🌿",
    title: "Personalised Remedies & Corrections",
    desc: "Simple, practical remedies to reduce blocks and enhance results",
  },
  {
    icon: "🍀",
    title: "Lucky Dates, Days & Colours",
    desc: "Better timing, fewer mistakes",
  },
  {
    icon: "🔋",
    title: "Phone Charging Direction (DOB-based)",
    desc: "Better balance & consistency",
  },
  {
    icon: "📞",
    title: "1:1 Personal Call",
    desc: "Understand everything clearly and apply it right",
  },
];

const WHY_CHOOSE = [
  {
    icon: <XCircle className="text-red-400" size={20} />,
    text: "No AI-generated interpretations",
  },
  {
    icon: <XCircle className="text-red-400" size={20} />,
    text: "No one-size-fits-all remedies",
  },
  {
    icon: <XCircle className="text-red-400" size={20} />,
    text: "No surface-level predictions",
  },
  {
    icon: <CheckCircle className="text-green-400" size={20} />,
    text: "Clear decoding, correction, and direction",
  },
  {
    icon: <CheckCircle className="text-green-400" size={20} />,
    text: "Based on your unique numerical blueprint",
  },
  {
    icon: <CheckCircle className="text-green-400" size={20} />,
    text: "Manually analysed, handwritten, tailored only for you",
  },
];

function OrderButton({ label = "Order Your Report Now" }: { label?: string }) {
  return (
    <Button
      data-ocid="numerology.order_button"
      size="lg"
      className="px-10 py-5 text-lg font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
        color: "oklch(0.14 0.04 30)",
      }}
    >
      {label}
    </Button>
  );
}

export default function NumerologyReportPage() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.04 30)" }}>
      {/* Hero */}
      <div
        className="py-20 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.16 0.06 30) 0%, oklch(0.20 0.09 40) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 80%, oklch(0.68 0.2 48 / 0.12) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <Badge
            className="mb-4 text-sm px-4 py-1"
            style={{
              background: "oklch(0.62 0.18 48 / 0.2)",
              color: "oklch(0.78 0.14 75)",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
          >
            🌟 Original Report by India's Most Trusted Numerologist
          </Badge>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            What Do Your Numbers Say About You?
          </h1>
          <p className="text-xl mb-3" style={{ color: "oklch(0.82 0.06 75)" }}>
            Your Personalized Guide to Career, Money &amp; Relationships
          </p>
          <p className="text-lg mb-8" style={{ color: "oklch(0.65 0.05 70)" }}>
            Decoded Through Pure Numerology{" "}
            <span style={{ color: "oklch(0.62 0.18 48)" }}>
              — No Software. No Guesswork.
            </span>
          </p>
          <div className="flex items-center justify-center gap-3 mb-8">
            <span
              className="text-3xl font-bold"
              style={{ color: "oklch(0.62 0.18 48)" }}
            >
              ₹999
            </span>
            <span
              className="text-xl line-through"
              style={{ color: "oklch(0.45 0.04 50)" }}
            >
              ₹2,999
            </span>
            <Badge
              style={{ background: "oklch(0.55 0.22 28)", color: "white" }}
            >
              67% OFF
            </Badge>
          </div>
          <OrderButton label="Reveal My Personal Numerology Report →" />
          <p className="mt-4 text-sm" style={{ color: "oklch(0.55 0.04 60)" }}>
            Why keep guessing when clarity is possible?
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* What is it */}
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="rounded-2xl p-8"
            style={{
              background: "oklch(0.18 0.06 30)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{
                color: "oklch(0.78 0.14 75)",
                fontFamily: "Cinzel, serif",
              }}
            >
              What Is the Customized Numerology Report?
            </h2>
            <p
              className="text-lg mb-4"
              style={{ color: "oklch(0.78 0.05 75)" }}
            >
              Numerology doesn't just talk about luck. It explains why things
              work or don't in your life.
            </p>
            <p className="mb-6" style={{ color: "oklch(0.68 0.04 70)" }}>
              This personalized report helps you decode your personal number
              system so you can finally understand:
            </p>
            <ul className="space-y-3">
              {[
                "How your Date of Birth shapes your career direction and decision-making",
                "Why certain years feel heavy and what's changing ahead",
                "Which numbers support your growth, and which silently block it",
                "How your mobile number influences money, love, and relationships",
                "What simple corrections bring alignment instead of struggle",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Star
                    className="mt-1 flex-shrink-0"
                    size={16}
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  />
                  <span style={{ color: "oklch(0.78 0.05 75)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Inside Your Report */}
        <section className="pb-16">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            Inside Your Personalised Report
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {REPORT_SECTIONS.map((sec, i) => (
              <motion.div
                key={sec.title}
                className="rounded-xl p-5 flex gap-4"
                style={{
                  background: "oklch(0.18 0.06 30)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1 }}
              >
                <div className="text-3xl flex-shrink-0">{sec.icon}</div>
                <div>
                  <div
                    className="font-semibold mb-1"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {sec.title}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "oklch(0.62 0.04 65)" }}
                  >
                    {sec.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose */}
        <section className="pb-16">
          <div
            className="rounded-2xl p-8"
            style={{
              background: "oklch(0.18 0.06 30)",
              border: "1px solid oklch(0.68 0.2 48 / 0.25)",
            }}
          >
            <h2
              className="text-2xl font-bold mb-6 text-center"
              style={{
                color: "oklch(0.78 0.14 75)",
                fontFamily: "Cinzel, serif",
              }}
            >
              Why Choose This Numerology Report?
            </h2>
            <p
              className="text-center mb-6"
              style={{ color: "oklch(0.68 0.04 70)" }}
            >
              A Pure Numerology-Based System… Built for Personal Accuracy!
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {WHY_CHOOSE.map((item) => (
                <div key={item.text} className="flex items-center gap-3 py-2">
                  {item.icon}
                  <span style={{ color: "oklch(0.80 0.04 75)" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span
              className="text-4xl font-bold"
              style={{ color: "oklch(0.62 0.18 48)" }}
            >
              ₹999
            </span>
            <span
              className="text-2xl line-through"
              style={{ color: "oklch(0.40 0.04 50)" }}
            >
              ₹2,999
            </span>
          </div>
          <OrderButton />
          <p className="mt-4 text-sm" style={{ color: "oklch(0.45 0.04 55)" }}>
            Note: This is the original Customized Numerology Report. Beware of
            generic software reports and imitations.
          </p>
        </section>
      </div>
    </div>
  );
}
