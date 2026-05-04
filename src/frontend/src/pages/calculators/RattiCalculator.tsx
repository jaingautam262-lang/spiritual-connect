import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiRefreshCw } from "react-icons/fi";
import { useLanguage } from "../../contexts/LanguageContext";

// Conversion constants (1 Ratti = 0.1215 g, 1 Carat = 0.2 g)
// 1 Carat = 1.6461 Ratti, 1 Tola = 11.6638 g
const UNIT_TO_GRAM: Record<string, number> = {
  carat: 0.2,
  ratti: 0.1215,
  gram: 1,
  milligram: 0.001,
  tola: 11.6638,
};

const unitOptions = ["Carat", "Ratti", "Gram", "Milligram", "Tola"];

const gemstones = [
  { name: "None", emoji: "⬜", planet: "Generic", minRatti: null },
  { name: "Pukhraj", emoji: "💛", planet: "Jupiter", minRatti: 4 },
  { name: "Neelam", emoji: "💙", planet: "Saturn", minRatti: 4 },
  { name: "Panna", emoji: "💚", planet: "Mercury", minRatti: 3 },
  { name: "Manik", emoji: "❤️", planet: "Sun", minRatti: 3 },
  { name: "Moti", emoji: "🤍", planet: "Moon", minRatti: 4 },
  { name: "Moonga", emoji: "🪸", planet: "Mars", minRatti: 6 },
  { name: "Gomed", emoji: "🟠", planet: "Rahu", minRatti: 6 },
  { name: "Lehsunia", emoji: "🌟", planet: "Ketu", minRatti: 4 },
];

const faqs = [
  {
    q: "What is the difference between Carat and Ratti?",
    a: "Carat is the international standard (1 Carat = 0.2 grams = 200 mg). Ratti is the traditional Indian Vedic standard (1 Ratti = 0.1215 grams). Jyotish gemstone prescriptions are always given in Ratti, while Indian market gemstone listings typically show weight in Carats.",
  },
  {
    q: "How many Ratti is 3 Carats?",
    a: "3 Carats × 1.6461 = 4.94 Ratti. So approximately 5 Ratti. Use our converter above to get precise values.",
  },
  {
    q: "What is the minimum Ratti prescribed by Spiritual Connect?",
    a: "Minimum Ratti varies by gemstone: Ruby (Manik) — 3 Ratti, Pearl (Moti) — 4 Ratti, Red Coral (Moonga) — 6 Ratti, Emerald (Panna) — 3 Ratti, Yellow Sapphire (Pukhraj) — 4 Ratti, Diamond — 0.5 Ratti, Blue Sapphire (Neelam) — 4 Ratti, Hessonite (Gomed) — 6 Ratti, Cat's Eye (Lehsunia) — 4 Ratti.",
  },
  {
    q: "Is 1 Carat always equal to 1.646 Ratti?",
    a: "Using the traditional Vedic standard (1 Ratti = 0.1215 g) and 1 Carat = 0.2 g, we get: 1 Carat ÷ 0.1215 = 1.646 Ratti. This is the standard used in Jyotish and Vedic gemstone practice across India.",
  },
  {
    q: "Why do gemstone prices in India show per Ratti and per Carat?",
    a: "Different markets use different standards. Ratti is preferred in traditional astrology markets (Jyotish) while international gems markets use Carats. Being able to convert between both helps you compare prices from different sellers and ensure fair value.",
  },
  {
    q: "How do I use the Ratti to find the right gemstone on this website?",
    a: "Use our Moolank Calculator or Gemstone Calculator to find your recommended stone, check the minimum Ratti for that gem, then use this converter to see the equivalent in Carats when shopping.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      data-ocid={`ratti.faq.item.${index + 1}`}
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-card hover:bg-muted/40 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-ocid={`ratti.faq.toggle.${index + 1}`}
      >
        <span className="font-heading text-sm font-semibold text-foreground pr-4">
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

export default function RattiCalculator() {
  useLanguage();
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Carat");
  const [toUnit, setToUnit] = useState("Ratti");
  const [selectedGem, setSelectedGem] = useState(0);

  function convert(val: string, from: string, to: string): string {
    const n = Number.parseFloat(val);
    if (!val || Number.isNaN(n) || n < 0) return "";
    const grams = n * UNIT_TO_GRAM[from.toLowerCase()];
    const result = grams / UNIT_TO_GRAM[to.toLowerCase()];
    return Number.parseFloat(result.toFixed(6)).toString();
  }

  const converted = convert(inputValue, fromUnit, toUnit);
  const gem = gemstones[selectedGem];

  function swapUnits() {
    const prev = fromUnit;
    setFromUnit(toUnit);
    setToUnit(prev);
    setInputValue(converted);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.12 195) 0%, oklch(0.28 0.10 220) 50%, oklch(0.18 0.08 260) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              className="mb-4 px-4 py-1 text-xs font-heading"
              style={{
                background: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.78 0.14 75)",
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
              }}
              variant="outline"
            >
              ⚖️ GEMSTONE TOOLS
            </Badge>
            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Carat to Ratti Converter
            </h1>
            <p
              className="font-body text-lg max-w-2xl mx-auto mb-2"
              style={{ color: "oklch(0.85 0.04 200)" }}
            >
              Convert gemstone weight between Carat, Ratti, Gram, Milligram and
              Tola
            </p>
            <p
              className="font-body text-sm max-w-xl mx-auto"
              style={{ color: "oklch(0.80 0.04 200)" }}
            >
              Includes Spiritual Connect's minimum weight recommendations for
              each Jyotish gemstone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Box */}
      <section
        className="py-8"
        style={{ background: "oklch(0.22 0.10 195 / 0.06)" }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <Card
            className="border"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
              background: "oklch(0.96 0.015 75 / 0.5)",
            }}
          >
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {[
                  {
                    label: "1 Ratti = 0.1215 grams",
                    sub: "Traditional Indian Vedic standard",
                  },
                  {
                    label: "In Jyotish, always Ratti",
                    sub: "Vedic gemstone weight in Ratti — not Carat",
                  },
                  {
                    label: "1 Carat = 1.646 Ratti",
                    sub: "1 Carat = 0.2 grams = 1.646 Ratti",
                  },
                ].map((info) => (
                  <div key={info.label}>
                    <p
                      className="font-heading text-sm font-bold"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {info.label}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {info.sub}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Converter */}
      <section
        className="py-10 bg-background"
        data-ocid="ratti.converter.section"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <Card
            className="border shadow-lg"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
          >
            <CardHeader>
              <CardTitle
                className="font-heading text-xl text-center"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                ⚖️ Weight Converter — Carat ↔ Ratti ↔ Gram ↔ Milligram ↔ Tola
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <Label className="font-heading text-sm font-semibold">
                    Enter Value
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 3.5"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="mt-1"
                    style={{ borderColor: "oklch(0.78 0.14 75 / 0.4)" }}
                    data-ocid="ratti.input.value"
                  />
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    1 Carat = 0.2 grams
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Label className="font-heading text-sm font-semibold">
                    From / To
                  </Label>
                  <div className="flex items-center gap-2 w-full">
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="flex-1 border rounded-md px-2 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      data-ocid="ratti.from_unit.select"
                    >
                      {unitOptions.map((u) => (
                        <option key={u}>{u}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={swapUnits}
                      className="p-2 rounded-full hover:bg-muted transition-colors"
                      aria-label="Swap units"
                      data-ocid="ratti.swap.button"
                    >
                      <FiRefreshCw className="h-4 w-4 text-primary" />
                    </button>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="flex-1 border rounded-md px-2 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      data-ocid="ratti.to_unit.select"
                    >
                      {unitOptions.map((u) => (
                        <option key={u}>{u}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label className="font-heading text-sm font-semibold">
                    Converted Value
                  </Label>
                  <div
                    className="mt-1 flex items-center px-3 py-2 rounded-md border min-h-[42px]"
                    style={{
                      borderColor: "oklch(0.78 0.14 75 / 0.4)",
                      background: "oklch(0.96 0.005 75)",
                    }}
                  >
                    <span
                      className="font-heading text-lg font-bold"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {converted || "—"}
                    </span>
                    {converted && (
                      <span className="ml-2 font-body text-xs text-muted-foreground">
                        {toUnit}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    1 Ratti = 0.1215 grams
                  </p>
                </div>
              </div>

              {/* Gemstone selector */}
              <div className="mt-6">
                <Label className="font-heading text-sm font-semibold">
                  Select Gemstone (optional)
                </Label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
                  {gemstones.map((g, i) => (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => setSelectedGem(i)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs font-body transition-all ${selectedGem === i ? "border-primary" : "border-border hover:border-muted-foreground"}`}
                      style={
                        selectedGem === i
                          ? {
                              borderColor: "oklch(0.78 0.14 75 / 0.7)",
                              background: "oklch(0.78 0.14 75 / 0.1)",
                            }
                          : {}
                      }
                      data-ocid={`ratti.gem.${i}`}
                    >
                      <span className="text-xl">{g.emoji}</span>
                      <span className="text-foreground">{g.name}</span>
                      <span className="text-muted-foreground text-[10px]">
                        {g.planet}
                      </span>
                    </button>
                  ))}
                </div>

                {gem.minRatti !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <Card
                      className="border"
                      style={{
                        borderColor: "oklch(0.78 0.14 75 / 0.4)",
                        background:
                          "linear-gradient(135deg, oklch(0.96 0.015 75), oklch(0.98 0.01 60))",
                      }}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <span className="text-3xl">{gem.emoji}</span>
                        <div>
                          <p
                            className="font-heading text-sm font-bold"
                            style={{ color: "oklch(0.35 0.12 25)" }}
                          >
                            {gem.name} ({gem.planet})
                          </p>
                          <p className="font-body text-xs text-muted-foreground">
                            Minimum recommended:{" "}
                            <strong className="text-foreground">
                              {gem.minRatti} Ratti
                            </strong>{" "}
                            ={" "}
                            <strong className="text-foreground">
                              {((gem.minRatti * 0.1215) / 0.2).toFixed(2)}{" "}
                              Carats
                            </strong>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Min Ratti Table */}
      <section
        className="py-10"
        style={{ background: "oklch(0.97 0.008 75 / 0.4)" }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <h2
            className="font-heading text-2xl font-bold text-center mb-6"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Minimum Ratti Recommendations
          </h2>
          <Card
            className="border overflow-hidden"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr style={{ background: "oklch(0.22 0.10 195 / 0.08)" }}>
                    <th className="text-left px-4 py-3 font-heading text-xs uppercase tracking-wider text-muted-foreground">
                      Gemstone
                    </th>
                    <th className="text-left px-4 py-3 font-heading text-xs uppercase tracking-wider text-muted-foreground">
                      Planet
                    </th>
                    <th className="text-right px-4 py-3 font-heading text-xs uppercase tracking-wider text-muted-foreground">
                      Min Ratti
                    </th>
                    <th className="text-right px-4 py-3 font-heading text-xs uppercase tracking-wider text-muted-foreground">
                      Equiv. Carats
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gemstones.slice(1).map((g, i) => (
                    <tr
                      key={g.name}
                      className="border-t border-border hover:bg-muted/20 transition-colors"
                      data-ocid={`ratti.table.item.${i + 1}`}
                    >
                      <td className="px-4 py-3 text-foreground">
                        {g.emoji} {g.name}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {g.planet}
                      </td>
                      <td
                        className="px-4 py-3 text-right font-bold"
                        style={{ color: "oklch(0.35 0.12 25)" }}
                      >
                        {g.minRatti}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {(((g.minRatti ?? 0) * 0.1215) / 0.2).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-background" data-ocid="ratti.faq.section">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2
            className="font-heading text-2xl font-bold text-center mb-6"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Frequently Asked Questions
          </h2>
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
