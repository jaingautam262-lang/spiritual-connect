import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const ROTATING_WORDS = [
  "Awareness",
  "Technology",
  "Intuition",
  "Transformation",
  "Intelligence",
  "Wisdom",
  "Foresight",
  "Evolution",
];

const FEATURES = [
  {
    icon: "💰",
    title: "Financial Predictions",
    desc: "On-demand financial guidance for wealth decisions",
  },
  {
    icon: "💼",
    title: "Career Guidance",
    desc: "Navigate career shifts with Vedic precision",
  },
  {
    icon: "❤️",
    title: "Love & Relationships",
    desc: "Compatibility, timing, and deepest connections",
  },
  {
    icon: "🏥",
    title: "Health Insights",
    desc: "Planetary influences on mind, body and vitality",
  },
  {
    icon: "🕉️",
    title: "Spiritual Growth",
    desc: "Awaken your highest potential through Vedic wisdom",
  },
];

const CHAKRA_COLORS = [
  "#9b59b6", // Crown - violet
  "#6c5ce7", // Third Eye - indigo
  "#0984e3", // Throat - blue
  "#00b894", // Heart - green
  "#fdcb6e", // Solar Plexus - yellow
  "#e17055", // Sacral - orange
  "#d63031", // Root - red
];

function RotatingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % ROTATING_WORDS.length),
      1800,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="inline-block font-bold"
        style={{ color: "oklch(0.68 0.2 48)" }}
      >
        {ROTATING_WORDS[idx]}
      </motion.span>
    </AnimatePresence>
  );
}

function ChakraOrbs() {
  return (
    <div className="flex flex-col items-center gap-3 py-8">
      {CHAKRA_COLORS.map((color, i) => (
        <motion.div
          key={color}
          className="rounded-full"
          style={{
            width: 40 + (6 - i) * 6,
            height: 40 + (6 - i) * 6,
            background: `radial-gradient(circle, ${color}ee 0%, ${color}66 60%, transparent 100%)`,
            boxShadow: `0 0 20px ${color}88, 0 0 40px ${color}44`,
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

function MatrixText() {
  const [matrix, setMatrix] = useState("1010110101101001");
  useEffect(() => {
    const t = setInterval(() => {
      setMatrix(
        Array.from({ length: 16 }, () =>
          Math.random() > 0.5 ? "1" : "0",
        ).join(""),
      );
    }, 200);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className="font-mono text-sm"
      style={{ color: "oklch(0.62 0.18 48 / 0.7)" }}
    >
      {matrix}
    </span>
  );
}

export default function AstrologerLanding() {
  return (
    <div className="min-h-screen" style={{ background: "oklch(0.10 0.04 25)" }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-24 px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.12 0.06 25) 0%, oklch(0.18 0.09 40) 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/assets/generated/astrology-hero.dim_1200x600.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.12,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, oklch(0.68 0.2 48 / 0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              className="mb-6 px-5 py-2 text-sm font-semibold"
              style={{
                background: "oklch(0.62 0.18 48 / 0.15)",
                color: "oklch(0.78 0.14 75)",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
              }}
            >
              ✨ ACCURACY: 97.3%
            </Badge>
            <h1
              className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
              style={{
                color: "oklch(0.92 0.05 80)",
                fontFamily: "Cinzel, serif",
              }}
            >
              Delivering Highly
              <br />
              <span style={{ color: "oklch(0.78 0.14 75)" }}>
                Accurate Predictions
              </span>
            </h1>
            <p
              className="text-xl mb-3"
              style={{ color: "oklch(0.72 0.05 70)" }}
            >
              Predictive intelligence for a smarter future.
            </p>
            <p
              className="text-lg mb-10"
              style={{ color: "oklch(0.60 0.04 60)" }}
            >
              Gain clarity. Act wisely.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                data-ocid="astro.ask_destiny_button"
                size="lg"
                className="px-10 py-5 text-lg font-bold rounded-xl hover:scale-105 transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                  color: "oklch(0.12 0.04 25)",
                }}
              >
                Ask Your Destiny →
              </Button>
              <Link to="/numerology-report">
                <Button
                  data-ocid="astro.free_prediction_button"
                  variant="outline"
                  size="lg"
                  className="px-10 py-5 text-lg font-semibold rounded-xl hover:scale-105 transition-transform"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.5)",
                    color: "oklch(0.78 0.14 75)",
                    background: "transparent",
                  }}
                >
                  Try a Free Prediction
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Block */}
      <section
        className="py-20 px-4"
        style={{ background: "oklch(0.14 0.05 28)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-6">🔮</div>
            <h2
              className="text-3xl font-bold mb-6"
              style={{
                color: "oklch(0.78 0.14 75)",
                fontFamily: "Cinzel, serif",
              }}
            >
              Our Vision
            </h2>
            <blockquote
              className="text-lg italic mb-8 max-w-3xl mx-auto"
              style={{ color: "oklch(0.78 0.05 75)", lineHeight: 1.8 }}
            >
              &ldquo;Our vision is to empower individuals to realize their true
              destiny by fostering critical thinking, enabling conscious
              decision-making, and heightening self-awareness of their energy
              and consciousness.&rdquo;
            </blockquote>
            <div className="flex flex-wrap justify-center gap-3">
              {ROTATING_WORDS.map((word) => (
                <Badge
                  key={word}
                  className="text-sm px-4 py-1"
                  style={{
                    background: "oklch(0.62 0.18 48 / 0.15)",
                    color: "oklch(0.72 0.12 55)",
                    border: "1px solid oklch(0.62 0.18 48 / 0.25)",
                  }}
                >
                  {word}
                </Badge>
              ))}
            </div>
            <p
              className="mt-8 text-2xl font-semibold"
              style={{ color: "oklch(0.85 0.04 75)" }}
            >
              The Future is&nbsp;
              <span className="italic" style={{ color: "oklch(0.68 0.2 48)" }}>
                Intuitive.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission + Chakra Visualization */}
      <section
        className="py-20 px-4"
        style={{ background: "oklch(0.12 0.05 28)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl font-bold mb-6"
                style={{
                  color: "oklch(0.78 0.14 75)",
                  fontFamily: "Cinzel, serif",
                }}
              >
                Our Mission
              </h2>
              <blockquote
                className="text-base italic mb-6"
                style={{
                  color: "oklch(0.72 0.05 70)",
                  lineHeight: 1.9,
                  borderLeft: "3px solid oklch(0.62 0.18 48)",
                  paddingLeft: "1.25rem",
                }}
              >
                &ldquo;To prove the ancient Vedic sciences as a pure science by
                using advanced AI and synthesized algorithms, bridging the Vedas
                with modern lifestyles to deliver highly accurate predictions
                and hidden knowledge that enhance people's experiences.&rdquo;
              </blockquote>
              <div className="flex flex-wrap gap-2">
                {["Consciousness", "Energy", "Spirit", "Balance"].map((w) => (
                  <Badge
                    key={w}
                    className="px-3 py-1"
                    style={{
                      background: "oklch(0.55 0.18 140 / 0.15)",
                      color: "oklch(0.65 0.16 140)",
                      border: "1px solid oklch(0.55 0.18 140 / 0.3)",
                    }}
                  >
                    {w}
                  </Badge>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <ChakraOrbs />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data/AI/Neural Bridge */}
      <section
        className="py-20 px-4"
        style={{ background: "oklch(0.14 0.05 28)" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8"
            style={{
              background: "oklch(0.16 0.06 28)",
              border: "1px solid oklch(0.62 0.18 48 / 0.3)",
            }}
          >
            <div className="text-center mb-8">
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {["Data", "AI", "Neural", "Digital", "Bridge"].map((w) => (
                  <Badge
                    key={w}
                    className="px-3 py-1"
                    style={{
                      background: "oklch(0.62 0.18 48 / 0.12)",
                      color: "oklch(0.62 0.18 48)",
                      border: "1px solid oklch(0.62 0.18 48 / 0.25)",
                    }}
                  >
                    {w}
                  </Badge>
                ))}
              </div>
              <div
                className="font-mono text-xl mb-2"
                style={{ color: "oklch(0.72 0.05 70)" }}
              >
                DATA INPUT → AI PROCESSING → PREDICTIONS
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                {
                  label: "ACCURACY",
                  value: "97.3%",
                  color: "oklch(0.62 0.18 48)",
                },
                {
                  label: "REPORTS DELIVERED",
                  value: "50,000+",
                  color: "oklch(0.78 0.14 75)",
                },
                {
                  label: "HAPPY CLIENTS",
                  value: "98.1%",
                  color: "oklch(0.55 0.18 140)",
                },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-3xl font-bold"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.55 0.04 60)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <MatrixText />
            </div>
            <p
              className="text-center mt-4 text-lg font-semibold"
              style={{ color: "oklch(0.72 0.05 70)" }}
            >
              Clarity. | Intelligence. | Action.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section
        className="py-20 px-4"
        style={{ background: "oklch(0.12 0.05 28)" }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl font-bold mb-3"
              style={{
                color: "oklch(0.78 0.14 75)",
                fontFamily: "Cinzel, serif",
              }}
            >
              Features That Transform Your Journey
            </h2>
            <p style={{ color: "oklch(0.60 0.04 60)" }}>
              Discover how we combine ancient wisdom with cutting-edge
              technology
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                data-ocid={`astro.feature_card.${i + 1}`}
                className="rounded-2xl p-6"
                style={{
                  background: "oklch(0.16 0.06 28)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  borderColor: "oklch(0.62 0.18 48 / 0.4)",
                }}
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ color: "oklch(0.88 0.05 75)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.60 0.04 60)" }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section
        className="py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 30), oklch(0.22 0.1 40))",
          borderTop: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            Ready to Know Your Destiny?
          </h2>
          <p className="mb-8" style={{ color: "oklch(0.65 0.04 65)" }}>
            The rotating word is: <RotatingWord />
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/kundli-report">
              <Button
                data-ocid="astro.kundli_cta_button"
                size="lg"
                className="px-10 py-5 text-base font-bold rounded-xl hover:scale-105 transition-transform"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                  color: "oklch(0.12 0.04 25)",
                }}
              >
                Get Your Kundli Report
              </Button>
            </Link>
            <Link to="/numerology-report">
              <Button
                data-ocid="astro.numerology_cta_button"
                variant="outline"
                size="lg"
                className="px-10 py-5 text-base font-semibold rounded-xl hover:scale-105 transition-transform"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.4)",
                  color: "oklch(0.78 0.14 75)",
                  background: "transparent",
                }}
              >
                Numerology Report
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
