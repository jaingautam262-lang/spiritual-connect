import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const trustBadges = [
  "50,000+ Consultations",
  "TEDx Speaker",
  "Vastu Vishwakarma Award",
  "Featured on News18, Dainik Bhaskar",
];

const moolankData: Record<
  number,
  {
    planet: string;
    gemstone: string;
    gemEmoji: string;
    rudraksha: string;
    rudrakshaEmoji: string;
    color: string;
    benefits: string[];
    mantra: string;
  }
> = {
  1: {
    planet: "Sun",
    gemstone: "Ruby (Manik)",
    gemEmoji: "❤️",
    rudraksha: "1 Mukhi Rudraksha",
    rudrakshaEmoji: "☀️",
    color: "oklch(0.55 0.22 25)",
    benefits: [
      "Leadership and authority",
      "Confidence and self-esteem",
      "Government favor and recognition",
      "Good health and vitality",
    ],
    mantra: "Om Suryaya Namah",
  },
  2: {
    planet: "Moon",
    gemstone: "Pearl (Moti)",
    gemEmoji: "🤍",
    rudraksha: "2 Mukhi Rudraksha",
    rudrakshaEmoji: "🌙",
    color: "oklch(0.60 0.04 220)",
    benefits: [
      "Emotional stability and peace",
      "Strong intuition",
      "Mother's blessings",
      "Mental clarity and calm",
    ],
    mantra: "Om Chandraya Namah",
  },
  3: {
    planet: "Jupiter",
    gemstone: "Yellow Sapphire (Pukhraj)",
    gemEmoji: "💛",
    rudraksha: "5 Mukhi Rudraksha",
    rudrakshaEmoji: "📿",
    color: "oklch(0.72 0.18 88)",
    benefits: [
      "Wisdom and knowledge",
      "Prosperity and abundance",
      "Spiritual growth",
      "Success in higher education",
    ],
    mantra: "Om Guruve Namah",
  },
  4: {
    planet: "Rahu",
    gemstone: "Hessonite (Gomed)",
    gemEmoji: "🟠",
    rudraksha: "8 Mukhi Rudraksha",
    rudrakshaEmoji: "⚡",
    color: "oklch(0.65 0.18 48)",
    benefits: [
      "Protection from Rahu's malefic effects",
      "Clarity and focus",
      "Success in foreign lands",
      "Remove confusion",
    ],
    mantra: "Om Rahave Namah",
  },
  5: {
    planet: "Mercury",
    gemstone: "Emerald (Panna)",
    gemEmoji: "💚",
    rudraksha: "4 Mukhi Rudraksha",
    rudrakshaEmoji: "💚",
    color: "oklch(0.55 0.18 145)",
    benefits: [
      "Sharp intellect and communication",
      "Business and trading success",
      "Creativity and writing",
      "Logical thinking",
    ],
    mantra: "Om Budhaya Namah",
  },
  6: {
    planet: "Venus",
    gemstone: "Diamond / Opal",
    gemEmoji: "💎",
    rudraksha: "6 Mukhi Rudraksha",
    rudrakshaEmoji: "💛",
    color: "oklch(0.78 0.08 320)",
    benefits: [
      "Love and relationships",
      "Artistic talent",
      "Beauty and luxury",
      "Harmony in partnerships",
    ],
    mantra: "Om Shukraya Namah",
  },
  7: {
    planet: "Ketu",
    gemstone: "Cat's Eye (Lehsunia)",
    gemEmoji: "🌟",
    rudraksha: "9 Mukhi Rudraksha",
    rudrakshaEmoji: "🌺",
    color: "oklch(0.60 0.14 165)",
    benefits: [
      "Deep spiritual insight",
      "Moksha and liberation",
      "Strong intuition",
      "Past life karma resolution",
    ],
    mantra: "Om Ketave Namah",
  },
  8: {
    planet: "Saturn",
    gemstone: "Blue Sapphire (Neelam)",
    gemEmoji: "💙",
    rudraksha: "7 Mukhi Rudraksha",
    rudrakshaEmoji: "🪐",
    color: "oklch(0.42 0.18 268)",
    benefits: [
      "Discipline and hard work",
      "Career advancement",
      "Justice and fairness",
      "Remove Sade Sati effects",
    ],
    mantra: "Om Shanaischaraya Namah",
  },
  9: {
    planet: "Mars",
    gemstone: "Red Coral (Moonga)",
    gemEmoji: "🪸",
    rudraksha: "3 Mukhi Rudraksha",
    rudrakshaEmoji: "🔥",
    color: "oklch(0.55 0.22 28)",
    benefits: [
      "Courage and fearlessness",
      "Physical strength",
      "Career in military/sports",
      "Remove Mars-related obstacles",
    ],
    mantra: "Om Kujaya Namah",
  },
};

function calcMoolank(day: number): number {
  let n = day;
  while (n > 9)
    n = String(n)
      .split("")
      .reduce((s, d) => s + Number(d), 0);
  return n === 0 ? 9 : n;
}

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

export default function MoolankCalculator() {
  useLanguage();
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<{ moolank: number } | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!day) return;
    const mk = calcMoolank(Number(day));
    setResult({ moolank: mk });
    setTimeout(
      () =>
        document
          .getElementById("moolank-result")
          ?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  }

  const data = result ? moolankData[result.moolank] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.12 30) 0%, oklch(0.28 0.10 45) 50%, oklch(0.18 0.08 55) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.78 0.14 75) 0%, transparent 50%)",
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
              🔢 NUMEROLOGY TOOLS
            </Badge>
            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Moolank Gemstone Calculator
            </h1>
            <p
              className="font-body text-lg max-w-xl mx-auto mb-6"
              style={{ color: "oklch(0.85 0.04 75)" }}
            >
              Find Your Moolank Number by Birth Date
            </p>
            <p
              className="font-body text-sm max-w-2xl mx-auto mb-6"
              style={{ color: "oklch(0.80 0.04 75)" }}
            >
              Enter your date of birth. Your Moolank (birth number) reveals the
              exact gemstone and Rudraksha prescribed for you.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {trustBadges.map((b) => (
                <Badge
                  key={b}
                  className="text-xs font-body px-3 py-1"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.15)",
                    color: "oklch(0.78 0.14 75)",
                    borderColor: "oklch(0.78 0.14 75 / 0.3)",
                  }}
                  variant="outline"
                >
                  {b}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-background" data-ocid="moolank.form.section">
        <div className="container mx-auto px-4 max-w-lg">
          <Card
            className="border shadow-lg"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
          >
            <CardHeader>
              <CardTitle
                className="font-heading text-xl text-center"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Calculate My Moolank
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="m-name"
                    className="font-heading text-sm font-semibold"
                  >
                    Your Name (optional)
                  </Label>
                  <Input
                    id="m-name"
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                    data-ocid="moolank.name.input"
                  />
                </div>
                <div>
                  <Label className="font-heading text-sm font-semibold">
                    Date of Birth *
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <select
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      required
                      className="border rounded-md px-3 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      data-ocid="moolank.day.select"
                    >
                      <option value="">DD</option>
                      {days.map((d) => (
                        <option key={d} value={d}>
                          {String(d).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      data-ocid="moolank.month.select"
                    >
                      <option value="">MM</option>
                      {months.map((m, i) => (
                        <option key={m} value={i + 1}>
                          {String(i + 1).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="border rounded-md px-3 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      data-ocid="moolank.year.select"
                    >
                      <option value="">YYYY</option>
                      {years.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full font-heading font-bold py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                    color: "white",
                  }}
                  data-ocid="moolank.submit_button"
                >
                  Calculate My Moolank & Recommendations →
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Result */}
          {result && data && (
            <motion.div
              id="moolank-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
              data-ocid="moolank.result.section"
            >
              {/* Moolank Number */}
              <div className="text-center mb-6">
                <Badge
                  className="mb-3 text-xs font-heading"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.2)",
                    color: "oklch(0.45 0.15 40)",
                    borderColor: "oklch(0.78 0.14 75 / 0.4)",
                  }}
                  variant="outline"
                >
                  ✨ Your Moolank
                </Badge>
                <div
                  className="text-8xl font-black font-heading mb-2"
                  style={{ color: data.color }}
                >
                  {result.moolank}
                </div>
                <p className="font-body text-lg text-foreground">
                  Ruling Planet: <strong>{data.planet}</strong>
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Mantra: <em>{data.mantra}</em>
                </p>
              </div>

              {/* Gemstone + Rudraksha cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Card
                  className="border"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.4)",
                    background:
                      "linear-gradient(135deg, oklch(0.96 0.015 75), oklch(0.98 0.01 60))",
                  }}
                >
                  <CardContent className="p-5 text-center">
                    <div className="text-4xl mb-2">{data.gemEmoji}</div>
                    <Badge
                      className="mb-2 text-xs"
                      style={{
                        background: "oklch(0.62 0.18 48)",
                        color: "white",
                      }}
                    >
                      💎 Recommended Gemstone
                    </Badge>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {data.gemstone}
                    </h3>
                    <Link
                      to="/gemstone-shop"
                      data-ocid="moolank.shop_gemstone.link"
                    >
                      <Button
                        className="mt-4 font-heading text-sm"
                        size="sm"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                          color: "white",
                        }}
                      >
                        Shop Now →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
                <Card
                  className="border"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.4)",
                    background:
                      "linear-gradient(135deg, oklch(0.96 0.015 75), oklch(0.98 0.01 60))",
                  }}
                >
                  <CardContent className="p-5 text-center">
                    <div className="text-4xl mb-2">{data.rudrakshaEmoji}</div>
                    <Badge
                      className="mb-2 text-xs"
                      style={{
                        background: "oklch(0.62 0.18 48)",
                        color: "white",
                      }}
                    >
                      📿 Recommended Rudraksha
                    </Badge>
                    <h3 className="font-heading text-xl font-bold text-foreground">
                      {data.rudraksha}
                    </h3>
                    <Link to="/shop" data-ocid="moolank.shop_rudraksha.link">
                      <Button
                        className="mt-4 font-heading text-sm"
                        size="sm"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                          color: "white",
                        }}
                      >
                        Shop Now →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Benefits */}
              <Card
                className="border"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
              >
                <CardContent className="p-5">
                  <h3
                    className="font-heading text-base font-bold mb-3"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    Benefits for Moolank {result.moolank}
                  </h3>
                  <ul className="space-y-2">
                    {data.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 font-body text-sm text-foreground"
                      >
                        <span className="text-amber-500">✦</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Moolank Reference Table */}
      <section
        className="py-12"
        style={{ background: "oklch(0.97 0.008 75 / 0.4)" }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <h2
            className="font-heading text-2xl font-bold text-center mb-8"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            All 9 Moolank Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(moolankData).map(([mk, d], i) => (
              <motion.div
                key={mk}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                data-ocid={`moolank.ref.item.${i + 1}`}
              >
                <Card
                  className="border"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
                >
                  <CardContent className="p-4 flex gap-3 items-center">
                    <div
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black font-heading text-white text-lg"
                      style={{ background: d.color }}
                    >
                      {mk}
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-foreground">
                        {d.planet}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {d.gemEmoji} {d.gemstone}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {d.rudrakshaEmoji} {d.rudraksha}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
