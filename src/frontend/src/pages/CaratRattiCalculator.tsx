import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  FiAlertCircle,
  FiBook,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiRefreshCw,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

// Conversion constants
const CARAT_TO_RATTI = 1.09375;
const RATTI_TO_CARAT = 0.9143;
const CARAT_TO_GRAM = 0.2;
const CARAT_TO_MG = 200;

type Field = "carat" | "ratti" | "gram" | "mg";

const conversionFacts = [
  { category: "Carat ↔ Ratti", left: "1 Carat", right: "1.09375 Ratti" },
  { category: "Carat ↔ Ratti", left: "1 Ratti", right: "0.9143 Carat" },
  { category: "Carat ↔ Gram", left: "1 Carat", right: "0.2 Gram" },
  { category: "Carat ↔ Gram", left: "1 Gram", right: "5 Carats" },
  { category: "Carat ↔ Milligram", left: "1 Carat", right: "200 mg" },
  { category: "Carat ↔ Milligram", left: "1000 mg", right: "5 Carats" },
];

const knowledgeCards = [
  {
    icon: "💎",
    title: "About Carats",
    body: "The carat is the international standard for measuring gemstone weight. One carat equals 200 milligrams. The term derives from carob seeds, used by ancient traders as counterweights. In 1907, the metric carat was internationally standardized at exactly 200 milligrams.",
  },
  {
    icon: "🌿",
    title: "About Ratti",
    body: "Ratti is a traditional Indian unit for measuring gemstones, especially in Vedic astrology. Derived from the seeds of the Gunja plant (Abrus precatorius), one ratti equals approximately 0.9143 carats. It remains widely used for recommending gemstone weights in Vedic practice.",
  },
  {
    icon: "🔮",
    title: "Astrological Significance",
    body: "In Vedic astrology, astrologers recommend gemstone weights in ratti based on your birth chart. Converting to carats ensures you purchase the correct size for maximum astrological benefits. Different planets require different minimum weights for full effect.",
  },
  {
    icon: "💰",
    title: "Pricing Transparency",
    body: "Understanding weight conversions helps you compare prices accurately across sellers. Gemstone prices are typically quoted per carat internationally, making this knowledge essential for value assessment and informed purchasing decisions.",
  },
];

const quickRef = [
  {
    label: "Small Gemstone",
    sub: "Delicate jewelry",
    ratti: 3,
    carats: 2.74,
    grams: 0.548,
    useCase: "Rings, Pendants",
    color: "from-teal-500/20 to-cyan-500/20",
  },
  {
    label: "Medium Gemstone",
    sub: "Standard size",
    ratti: 5,
    carats: 4.57,
    grams: 0.914,
    useCase: "Most Popular",
    color: "from-blue-500/20 to-indigo-500/20",
    popular: true,
  },
  {
    label: "Large Gemstone",
    sub: "Premium quality",
    ratti: 7,
    carats: 6.4,
    grams: 1.28,
    useCase: "Statement Pieces",
    color: "from-purple-500/20 to-violet-500/20",
  },
];

const expertTips = [
  {
    icon: "🔭",
    title: "Astrological Recommendation",
    body: "Always consult an astrologer for the ideal weight based on your birth chart. Typically recommended in Ratti for Vedic gemstone therapy.",
  },
  {
    icon: "⚖️",
    title: "Body Weight Calculation",
    body: "General rule: 1/10th to 1/12th of your body weight in kg equals recommended gemstone weight in Ratti. E.g., 60kg = 5–6 Ratti.",
  },
  {
    icon: "👁️",
    title: "Visual Appearance",
    body: "Consider how the gemstone will look on your finger or neck. Larger stones make bolder statements. Balance aesthetics with astrological requirements.",
  },
  {
    icon: "💵",
    title: "Budget Considerations",
    body: "Gemstone prices increase exponentially with carat weight. A smaller, high-quality gemstone often offers better value than a larger, flawed one.",
  },
];

const mistakes = [
  {
    icon: "⚠️",
    title: "Confusing Carat with Karat",
    body: "Carat measures gemstone weight (200mg), while karat measures gold purity (24k = pure gold). Don't mix them up when purchasing!",
  },
  {
    icon: "📏",
    title: "Ignoring Density Differences",
    body: "Same carat weight looks different on different gemstones. A 5-carat sapphire is smaller than a 5-carat emerald because sapphire is denser.",
  },
  {
    icon: "📋",
    title: "Buying Without Certification",
    body: "Always ask for a certified lab report verifying the gemstone's weight, origin, and authenticity. Reputable labs include GIA, IGI, and GRS.",
  },
  {
    icon: "🎯",
    title: "Focusing Only on Weight",
    body: "Quality matters more than size. A smaller, high-quality gemstone with strong color and clarity is more valuable and astrologically potent.",
  },
];

const gemstoneLinks = [
  {
    name: "Blue Sapphire",
    subtitle: "Wealth & Success",
    planet: "Saturn",
    path: "/gemstones/blue-sapphire",
    color: "from-blue-600/30 to-indigo-600/30",
    badge: "Premium",
    emoji: "💙",
  },
  {
    name: "Ruby",
    subtitle: "Leadership & Power",
    planet: "Sun",
    path: "/gemstones/ruby",
    color: "from-red-600/30 to-rose-600/30",
    badge: "Premium",
    emoji: "❤️",
  },
  {
    name: "Emerald",
    subtitle: "Communication & Wisdom",
    planet: "Mercury",
    path: "/gemstones/emerald",
    color: "from-emerald-600/30 to-green-600/30",
    badge: "Premium",
    emoji: "💚",
  },
  {
    name: "Yellow Sapphire",
    subtitle: "Prosperity & Knowledge",
    planet: "Jupiter",
    path: "/gemstones/yellow-sapphire",
    color: "from-yellow-500/30 to-amber-500/30",
    badge: "Premium",
    emoji: "💛",
  },
];

const faqs = [
  {
    q: "How many Ratti are in 1 Carat?",
    a: "1 Carat equals 1.09375 Ratti. This is a precise conversion ratio used universally in the gemstone industry. So if you have a 5-carat gemstone, it would be approximately 5.47 Ratti.",
  },
  {
    q: "Which unit should I use when buying gemstones?",
    a: "For astrological purposes, use Ratti as recommended by Vedic astrologers. For international purchases or comparing prices globally, use Carats as it's the standard unit worldwide. Our calculator helps you convert between both seamlessly.",
  },
  {
    q: "How do I calculate the right gemstone weight for me?",
    a: "The traditional method is to divide your body weight (in kg) by 10 to 12 to get the recommended Ratti. For example, if you weigh 60kg, a gemstone between 5–6 Ratti (4.5–5.5 carats) would be appropriate. Always consult a qualified astrologer for personalized recommendations.",
  },
  {
    q: "Is a heavier gemstone always better?",
    a: "Not necessarily. While weight is important for astrological effects, quality factors like clarity, color, and cut are equally crucial. A smaller, high-quality gemstone with good energy is more effective than a larger, flawed stone. Balance size with quality and your budget.",
  },
  {
    q: "Why do different gemstones of the same carat look different in size?",
    a: "Gemstones have different densities. A 5-carat diamond will appear smaller than a 5-carat emerald because diamond is denser. Carat measures weight, not size. Sapphires and rubies (corundum) are denser than emeralds, so they appear smaller at the same carat weight.",
  },
  {
    q: "Can I wear a gemstone lighter than recommended?",
    a: "While lighter gemstones may have reduced astrological effects, it's better to wear a lighter, high-quality, natural gemstone than nothing at all. If budget is a concern, prioritize quality over weight. Consult your astrologer for minimum weight recommendations specific to your needs.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      data-ocid={`faq.item.${index + 1}`}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-card hover:bg-muted/40 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-ocid={`faq.toggle.${index + 1}`}
      >
        <span className="font-heading text-sm md:text-base font-semibold text-foreground pr-4">
          {faq.q}
        </span>
        {open ? (
          <FiChevronUp className="shrink-0 text-primary" />
        ) : (
          <FiChevronDown className="shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="px-5 py-4 bg-muted/20 border-t border-border">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {faq.a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function CaratRattiCalculator() {
  const [carat, setCarat] = useState("");
  const [ratti, setRatti] = useState("");
  const [gram, setGram] = useState("");
  const [mg, setMg] = useState("");

  function fmt(val: number) {
    if (!Number.isFinite(val) || Number.isNaN(val)) return "";
    return Number.parseFloat(val.toFixed(6)).toString();
  }

  function handleChange(field: Field, raw: string) {
    const val = Number.parseFloat(raw);
    if (raw === "" || raw === ".") {
      setCarat(field === "carat" ? raw : "");
      setRatti(field === "ratti" ? raw : "");
      setGram(field === "gram" ? raw : "");
      setMg(field === "mg" ? raw : "");
      return;
    }
    if (Number.isNaN(val)) return;

    if (field === "carat") {
      setCarat(raw);
      setRatti(fmt(val * CARAT_TO_RATTI));
      setGram(fmt(val * CARAT_TO_GRAM));
      setMg(fmt(val * CARAT_TO_MG));
    } else if (field === "ratti") {
      setRatti(raw);
      const c = val * RATTI_TO_CARAT;
      setCarat(fmt(c));
      setGram(fmt(c * CARAT_TO_GRAM));
      setMg(fmt(c * CARAT_TO_MG));
    } else if (field === "gram") {
      setGram(raw);
      const c = val / CARAT_TO_GRAM;
      setCarat(fmt(c));
      setRatti(fmt(c * CARAT_TO_RATTI));
      setMg(fmt(c * CARAT_TO_MG));
    } else if (field === "mg") {
      setMg(raw);
      const c = val / CARAT_TO_MG;
      setCarat(fmt(c));
      setRatti(fmt(c * CARAT_TO_RATTI));
      setGram(fmt(c * CARAT_TO_GRAM));
    }
  }

  function handleReset() {
    setCarat("");
    setRatti("");
    setGram("");
    setMg("");
  }

  const fields: {
    id: Field;
    label: string;
    badge: string;
    placeholder: string;
    hint: string;
  }[] = [
    {
      id: "carat",
      label: "Carat",
      badge: "Most Common",
      placeholder: "Enter carats",
      hint: "1 Carat = 1.09375 Ratti",
    },
    {
      id: "ratti",
      label: "Ratti",
      badge: "Traditional",
      placeholder: "Enter ratti",
      hint: "1 Ratti = 0.9143 Carat",
    },
    {
      id: "gram",
      label: "Gram",
      badge: "Weight",
      placeholder: "Enter grams",
      hint: "1 Carat = 0.2 Gram",
    },
    {
      id: "mg",
      label: "Milligram",
      badge: "Precise",
      placeholder: "Enter milligrams",
      hint: "1 Carat = 200 Milligrams",
    },
  ];

  const fieldValues: Record<Field, string> = { carat, ratti, gram, mg };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.12 195) 0%, oklch(0.28 0.10 220) 40%, oklch(0.18 0.08 260) 100%)",
        }}
        data-ocid="carat-ratti.hero"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.68 0.2 48) 0%, transparent 40%)",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              className="mb-4 px-4 py-1 text-xs font-heading tracking-wider border"
              style={{
                background: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.78 0.14 75)",
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
              }}
            >
              ⚖️ GEMSTONE TOOLS
            </Badge>
            <h1
              className="font-heading text-4xl md:text-6xl font-bold mb-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Carat to Ratti Calculator
            </h1>
            <p
              className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "oklch(0.85 0.04 200)" }}
            >
              Convert gemstone weights instantly with precision accuracy.
              Essential tool for gemstone buyers and sellers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Calculator */}
      <section
        className="py-14 bg-background"
        data-ocid="carat-ratti.calculator.section"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="font-heading text-2xl md:text-3xl font-bold text-center mb-2"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Weight Conversion Calculator
            </h2>
            <p className="font-body text-center text-muted-foreground mb-8">
              Enter any value below and watch all units convert automatically
            </p>
            <Card
              className="border shadow-lg"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            >
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                  {fields.map((f) => (
                    <div key={f.id} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`calc-${f.id}`}
                          className="font-heading text-sm font-semibold text-foreground"
                        >
                          {f.label}
                        </label>
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-0"
                        >
                          {f.badge}
                        </Badge>
                      </div>
                      <Input
                        id={`calc-${f.id}`}
                        type="number"
                        min="0"
                        step="any"
                        placeholder={f.placeholder}
                        value={fieldValues[f.id]}
                        onChange={(e) => handleChange(f.id, e.target.value)}
                        className="font-body text-sm h-11"
                        style={{ borderColor: "oklch(0.78 0.14 75 / 0.4)" }}
                        data-ocid={`carat-ratti.${f.id}.input`}
                      />
                      <span className="font-body text-xs text-muted-foreground">
                        {f.hint}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="font-heading text-sm gap-2 px-6"
                    style={{
                      borderColor: "oklch(0.62 0.18 48 / 0.5)",
                      color: "oklch(0.62 0.18 48)",
                    }}
                    data-ocid="carat-ratti.reset_button"
                  >
                    <FiRefreshCw size={14} />
                    Reset Calculator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Conversion Reference */}
      <section
        className="py-12"
        style={{ background: "oklch(0.97 0.008 200 / 0.5)" }}
        data-ocid="carat-ratti.reference.section"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold text-center mb-8"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Conversion Reference
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {conversionFacts.map((fact, i) => (
              <motion.div
                key={fact.left}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                data-ocid={`carat-ratti.ref.item.${i + 1}`}
              >
                <Card
                  className="border text-center"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
                >
                  <CardContent className="p-4">
                    <Badge
                      className="mb-3 text-xs font-heading"
                      style={{
                        background: "oklch(0.22 0.10 195 / 0.15)",
                        color: "oklch(0.28 0.12 195)",
                        borderColor: "oklch(0.28 0.12 195 / 0.3)",
                      }}
                      variant="outline"
                    >
                      {fact.category}
                    </Badge>
                    <div className="font-heading text-base font-bold text-foreground">
                      {fact.left}
                    </div>
                    <div
                      className="font-body text-sm my-1"
                      style={{ color: "oklch(0.62 0.18 48)" }}
                    >
                      =
                    </div>
                    <div
                      className="font-heading text-base font-bold"
                      style={{ color: "oklch(0.35 0.15 25)" }}
                    >
                      {fact.right}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Knowledge */}
      <section
        className="py-14 bg-background"
        data-ocid="carat-ratti.knowledge.section"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 justify-center mb-2">
            <FiInfo className="text-primary" />
            <h2
              className="font-heading text-2xl md:text-3xl font-bold"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Essential Knowledge
            </h2>
          </div>
          <p className="font-body text-center text-muted-foreground mb-8">
            Why Accurate Weight Conversion Matters
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {knowledgeCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`carat-ratti.knowledge.item.${i + 1}`}
              >
                <Card
                  className="border h-full"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
                >
                  <CardHeader className="pb-2">
                    <div className="text-2xl mb-1">{card.icon}</div>
                    <CardTitle className="font-heading text-base font-bold text-foreground">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {card.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section
        className="py-12"
        style={{ background: "oklch(0.22 0.10 195 / 0.06)" }}
        data-ocid="carat-ratti.quickref.section"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Quick Reference
          </h2>
          <p className="font-body text-center text-muted-foreground mb-8">
            Common Gemstone Weight Conversions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {quickRef.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                data-ocid={`carat-ratti.quickref.item.${i + 1}`}
              >
                <Card
                  className={`border relative overflow-hidden bg-gradient-to-br ${item.color}`}
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                >
                  {item.popular && (
                    <div className="absolute top-2 right-2">
                      <Badge
                        className="text-xs font-heading"
                        style={{
                          background: "oklch(0.62 0.18 48)",
                          color: "white",
                        }}
                      >
                        ⭐ Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="font-heading text-sm font-bold text-foreground mb-0.5">
                      {item.label}
                    </div>
                    <div className="font-body text-xs text-muted-foreground mb-3">
                      {item.sub}
                    </div>
                    <div
                      className="font-heading text-3xl font-black mb-1"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {item.ratti} Ratti
                    </div>
                    <div
                      className="font-heading text-lg font-bold mb-3"
                      style={{ color: "oklch(0.28 0.12 195)" }}
                    >
                      {item.carats} Carats
                    </div>
                    <div className="space-y-1 text-xs font-body text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Weight</span>
                        <span className="font-semibold text-foreground">
                          {item.grams} Grams
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Use Case</span>
                        <span className="font-semibold text-foreground">
                          {item.useCase}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Tips */}
      <section
        className="py-14 bg-background"
        data-ocid="carat-ratti.tips.section"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 justify-center mb-2">
            <FiTrendingUp className="text-primary" />
            <h2
              className="font-heading text-2xl md:text-3xl font-bold"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Expert Tips
            </h2>
          </div>
          <p className="font-body text-center text-muted-foreground mb-10">
            Essential Gemstone Buying Guide
          </p>

          {/* What to Consider */}
          <h3
            className="font-heading text-lg font-semibold mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            <FiCheckCircle className="inline mr-2 text-emerald-600" />
            What to Consider When Choosing Weight
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {expertTips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`carat-ratti.tip.item.${i + 1}`}
              >
                <Card
                  className="border"
                  style={{ borderColor: "oklch(0.62 0.16 120 / 0.3)" }}
                >
                  <CardContent className="p-4 flex gap-3">
                    <span className="text-xl shrink-0">{tip.icon}</span>
                    <div>
                      <div className="font-heading text-sm font-bold text-foreground mb-1">
                        {tip.title}
                      </div>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        {tip.body}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Common Mistakes */}
          <h3
            className="font-heading text-lg font-semibold mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            <FiAlertCircle className="inline mr-2 text-amber-500" />
            Common Mistakes to Avoid
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mistakes.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`carat-ratti.mistake.item.${i + 1}`}
              >
                <Card
                  className="border"
                  style={{ borderColor: "oklch(0.68 0.2 48 / 0.3)" }}
                >
                  <CardContent className="p-4 flex gap-3">
                    <span className="text-xl shrink-0">{m.icon}</span>
                    <div>
                      <div className="font-heading text-sm font-bold text-foreground mb-1">
                        {m.title}
                      </div>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        {m.body}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section
        className="py-12"
        style={{ background: "oklch(0.22 0.10 195 / 0.06)" }}
        data-ocid="carat-ratti.history.section"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-2 justify-center mb-8">
            <FiBook className="text-primary" />
            <h2
              className="font-heading text-2xl md:text-3xl font-bold"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Historical Context
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Origin of Carat",
                icon: "🌱",
                body: "The word 'carat' comes from the carob seed, which ancient traders used as counterweights on their balance scales. These seeds were remarkably uniform in weight, making them perfect for measuring precious gemstones. In 1907, the metric carat was internationally standardized at exactly 200 milligrams.",
              },
              {
                title: "Origin of Ratti",
                icon: "🪴",
                body: "Ratti is a traditional Indian unit derived from the red and black seeds of the Gunja plant (Abrus precatorius). These seeds were historically used in India for weighing gold and gemstones. The measurement has been preserved in Vedic astrology, where gemstone recommendations are still given in Ratti.",
              },
              {
                title: "Modern Usage",
                icon: "🌍",
                body: "Today, while the international jewelry industry primarily uses carats, Ratti remains prevalent in India, especially for astrological gemstones. Understanding both measurements is essential for anyone interested in authentic gemstone astrology or purchasing gemstones from Indian sellers.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`carat-ratti.history.item.${i + 1}`}
              >
                <Card
                  className="border h-full"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
                >
                  <CardHeader className="pb-2">
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <CardTitle className="font-heading text-base font-bold text-foreground">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {item.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Gemstones Widget */}
      <section
        className="py-14 bg-background"
        data-ocid="carat-ratti.gemstones.section"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-2 justify-center mb-2">
            <FiStar className="text-primary" />
            <h2
              className="font-heading text-2xl md:text-3xl font-bold"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Premium Selection
            </h2>
          </div>
          <p className="font-body text-center text-muted-foreground mb-8">
            Our Top Selling Gemstones — Calculate the perfect weight for your
            chosen gemstone
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {gemstoneLinks.map((gem, i) => (
              <motion.div
                key={gem.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`carat-ratti.gemstone.item.${i + 1}`}
              >
                <Link
                  to={gem.path}
                  data-ocid={`carat-ratti.gemstone.link.${i + 1}`}
                >
                  <Card
                    className={`border cursor-pointer hover:shadow-md transition-all group bg-gradient-to-br ${gem.color}`}
                    style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                  >
                    <CardContent className="p-5 text-center">
                      <div className="text-3xl mb-2">{gem.emoji}</div>
                      <Badge
                        className="text-xs font-heading mb-2"
                        style={{
                          background: "oklch(0.62 0.18 48 / 0.15)",
                          color: "oklch(0.45 0.15 40)",
                          borderColor: "oklch(0.62 0.18 48 / 0.3)",
                        }}
                        variant="outline"
                      >
                        {gem.badge}
                      </Badge>
                      <div className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        {gem.name}
                      </div>
                      <div className="font-body text-xs text-muted-foreground mt-1">
                        {gem.subtitle}
                      </div>
                      <div
                        className="font-body text-xs mt-1"
                        style={{ color: "oklch(0.28 0.12 195)" }}
                      >
                        Planet: {gem.planet}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/shop" data-ocid="carat-ratti.explore_gemstones.link">
              <Button
                className="font-heading px-8 py-2.5"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                  color: "white",
                }}
              >
                Explore All Gemstones
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-12"
        style={{ background: "oklch(0.22 0.10 195 / 0.06)" }}
        data-ocid="carat-ratti.faq.section"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold text-center mb-2"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="font-body text-center text-muted-foreground mb-8">
            Everything You Need to Know
          </p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
