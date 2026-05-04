import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { useState } from "react";
import type { FormEvent } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLanguage } from "../../contexts/LanguageContext";

const trustBadges = [
  "50,000+ Consultations",
  "TEDx Speaker",
  "Vastu Vishwakarma Award",
  "Featured on News18, Dainik Bhaskar",
];

const rudrakshaByMonth: Record<
  number,
  {
    mukhi: string;
    name: string;
    planet: string;
    benefit: string;
    emoji: string;
  }
> = {
  1: {
    mukhi: "1 Mukhi (Ek Mukhi)",
    name: "1 Mukhi",
    planet: "Sun",
    benefit:
      "Spiritual liberation, connects to divine consciousness, promotes inner peace",
    emoji: "☀️",
  },
  2: {
    mukhi: "2 Mukhi",
    name: "2 Mukhi",
    planet: "Moon",
    benefit: "Unity, harmony in relationships, emotional balance and peace",
    emoji: "🌙",
  },
  3: {
    mukhi: "3 Mukhi",
    name: "3 Mukhi",
    planet: "Mars",
    benefit: "Boosts confidence, courage, and burns away past negativity",
    emoji: "🔥",
  },
  4: {
    mukhi: "4 Mukhi",
    name: "4 Mukhi",
    planet: "Mercury",
    benefit: "Enhances memory, intellect, communication and knowledge",
    emoji: "💚",
  },
  5: {
    mukhi: "5 Mukhi",
    name: "5 Mukhi",
    planet: "Jupiter",
    benefit: "Health, wisdom, protection — most universal and powerful",
    emoji: "📿",
  },
  6: {
    mukhi: "6 Mukhi",
    name: "6 Mukhi",
    planet: "Venus",
    benefit: "Attracts love, beauty, harmony and creative success",
    emoji: "💛",
  },
  7: {
    mukhi: "7 Mukhi",
    name: "7 Mukhi",
    planet: "Saturn",
    benefit: "Removes obstacles, bestows luck and financial prosperity",
    emoji: "🪐",
  },
  8: {
    mukhi: "8 Mukhi",
    name: "8 Mukhi",
    planet: "Rahu",
    benefit: "Removes obstacles, grounding energy, protects from black magic",
    emoji: "⚡",
  },
  9: {
    mukhi: "9 Mukhi",
    name: "9 Mukhi",
    planet: "Ketu",
    benefit: "Divine energy, courage, spiritual power and fearlessness",
    emoji: "🌺",
  },
  10: {
    mukhi: "5 Mukhi",
    name: "5 Mukhi",
    planet: "Jupiter",
    benefit: "Health, wisdom, protection — most universal and powerful",
    emoji: "📿",
  },
  11: {
    mukhi: "1 Mukhi (Ek Mukhi)",
    name: "1 Mukhi",
    planet: "Sun",
    benefit: "Spiritual liberation, connects to divine consciousness",
    emoji: "☀️",
  },
  12: {
    mukhi: "3 Mukhi",
    name: "3 Mukhi",
    planet: "Mars",
    benefit: "Boosts confidence, courage, and burns away past negativity",
    emoji: "🔥",
  },
};

const featuredRudraksha = [
  {
    mukhi: "1",
    name: "Ek Mukhi Rudraksha",
    emoji: "☀️",
    benefit:
      "Represents Lord Shiva. Connects to divine consciousness, promotes liberation and inner peace.",
    planet: "Sun",
  },
  {
    mukhi: "2",
    name: "Do Mukhi Rudraksha",
    emoji: "🌙",
    benefit:
      "Represents Ardhanarishvara. Promotes unity, harmony, emotional balance and heals relationships.",
    planet: "Moon",
  },
  {
    mukhi: "3",
    name: "Teen Mukhi Rudraksha",
    emoji: "🔥",
    benefit:
      "Represents Agni Dev. Boosts confidence, burns past karma, enhances self-esteem.",
    planet: "Mars",
  },
  {
    mukhi: "4",
    name: "Char Mukhi Rudraksha",
    emoji: "💚",
    benefit:
      "Represents Lord Brahma. Enhances intellect, memory, communication and academic success.",
    planet: "Mercury",
  },
];

const benefits = [
  "Enhances the results of your efforts by attracting positive energy",
  "Shields you from negativity and unwanted influences",
  "Supports physical health and promotes emotional balance",
  "Helps reduce the adverse effects of planetary influences like Saturn and Rahu",
  "Acts as a protective energy against accidents and misfortunes",
  "Boosts courage, confidence, determination, and inner strength",
  "Aids in balancing the body's chakras and aligning energy flow",
  "Attracts success, prosperity, and abundance",
  "Deepens spiritual awareness and strengthens connection with inner self",
  "Calms the nervous system and reduces stress and anxiety",
];

const wearingSteps = [
  "Choose the right Rudraksha based on your birth chart through proper analysis — random selection may not provide optimal results.",
  "Purchase from a reliable source with proper certification to ensure authenticity and originality.",
  "Each Rudraksha is associated with a specific planet. Monday mornings (dedicated to Lord Shiva) are generally the most auspicious time for first wearing.",
  "Before wearing, purify and energize the bead by washing with clean water, milk, or honey and chanting appropriate mantras.",
  "Your intention and faith play a key role. The stronger your belief and connection, the more impactful the Rudraksha will be.",
];

const types = [
  {
    mukhi: "1 Mukhi",
    deity: "Lord Shiva",
    benefit: "Liberation, divine consciousness",
  },
  {
    mukhi: "2 Mukhi",
    deity: "Ardhanarishvara",
    benefit: "Unity, harmony, relationships",
  },
  {
    mukhi: "3 Mukhi",
    deity: "Agni Dev",
    benefit: "Confidence, courage, burn karma",
  },
  {
    mukhi: "4 Mukhi",
    deity: "Lord Brahma",
    benefit: "Intellect, memory, communication",
  },
  {
    mukhi: "5 Mukhi",
    deity: "Lord Shiva",
    benefit: "Health, wisdom, universal protection",
  },
  {
    mukhi: "6 Mukhi",
    deity: "Lord Kartikeya",
    benefit: "Love, beauty, creative success",
  },
  {
    mukhi: "7 Mukhi",
    deity: "Goddess Lakshmi",
    benefit: "Luck, prosperity, remove obstacles",
  },
  {
    mukhi: "8 Mukhi",
    deity: "Lord Ganesha",
    benefit: "Overcome obstacles, stability",
  },
  {
    mukhi: "9 Mukhi",
    deity: "Goddess Durga",
    benefit: "Courage, spiritual power, fearlessness",
  },
  {
    mukhi: "10 Mukhi",
    deity: "Lord Vishnu",
    benefit: "Peace, protection from evil",
  },
  {
    mukhi: "11 Mukhi",
    deity: "Ekadash Rudra",
    benefit: "Wisdom, adventurous spirit",
  },
  {
    mukhi: "12 Mukhi",
    deity: "Lord Surya",
    benefit: "Leadership, power, radiance",
  },
  {
    mukhi: "13 Mukhi",
    deity: "Kamadeva",
    benefit: "Fulfillment of wishes, charisma",
  },
  {
    mukhi: "14 Mukhi",
    deity: "Lord Shiva (Deva Mani)",
    benefit: "Intuition, protection, supreme blessings",
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  dob: string;
  timeHH: string;
  timeMM: string;
  timeAMPM: string;
  unknownTime: boolean;
  place: string;
}

interface Result {
  mukhi: string;
  planet: string;
  benefit: string;
  emoji: string;
  name: string;
}

export default function RudrakshaCalculator() {
  useLanguage();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    timeHH: "01",
    timeMM: "00",
    timeAMPM: "AM",
    unknownTime: false,
    place: "",
  });
  const [result, setResult] = useState<Result | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const month = form.dob ? new Date(form.dob).getMonth() + 1 : 5;
    setResult(rudrakshaByMonth[month] ?? rudrakshaByMonth[5]);
    setTimeout(() => {
      document
        .getElementById("rudraksha-result")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.12 35) 0%, oklch(0.28 0.10 45) 50%, oklch(0.20 0.08 25) 100%)",
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
              className="mb-4 px-4 py-1 text-xs font-heading tracking-wider border"
              style={{
                background: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.78 0.14 75)",
                borderColor: "oklch(0.78 0.14 75 / 0.4)",
              }}
            >
              📿 SPIRITUAL TOOLS
            </Badge>
            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Lucky Rudraksha Calculator
            </h1>
            <p
              className="font-body text-lg max-w-xl mx-auto mb-6"
              style={{ color: "oklch(0.85 0.04 75)" }}
            >
              Rudraksha Suggestion By Birth
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
      <section
        className="py-12 bg-background"
        data-ocid="rudraksha.form.section"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <Card
            className="border shadow-lg"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
          >
            <CardHeader>
              <CardTitle
                className="font-heading text-xl text-center"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Enter Your Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="r-name"
                    className="font-heading text-sm font-semibold"
                  >
                    Name *
                  </Label>
                  <Input
                    id="r-name"
                    placeholder="FULL NAME"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="rudraksha.name.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="r-email"
                    className="font-heading text-sm font-semibold"
                  >
                    E-Mail *
                  </Label>
                  <Input
                    id="r-email"
                    type="email"
                    placeholder="E-MAIL"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="rudraksha.email.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="r-phone"
                    className="font-heading text-sm font-semibold"
                  >
                    Phone *
                  </Label>
                  <div className="flex gap-2 mt-1">
                    <span
                      className="flex items-center px-3 py-2 rounded-md border text-sm font-body text-muted-foreground"
                      style={{
                        borderColor: "oklch(0.78 0.14 75 / 0.3)",
                        background: "oklch(0.96 0.005 75)",
                      }}
                    >
                      IN (+91)
                    </span>
                    <Input
                      id="r-phone"
                      type="tel"
                      placeholder="MOBILE NUMBER"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="flex-1"
                      data-ocid="rudraksha.phone.input"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="r-dob"
                    className="font-heading text-sm font-semibold"
                  >
                    Date of Birth *
                  </Label>
                  <Input
                    id="r-dob"
                    type="date"
                    required
                    value={form.dob}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, dob: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="rudraksha.dob.input"
                  />
                </div>
                <div>
                  <Label className="font-heading text-sm font-semibold">
                    Birth Time
                  </Label>
                  <div className="flex gap-2 mt-1 items-center">
                    <select
                      value={form.timeHH}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, timeHH: e.target.value }))
                      }
                      className="border rounded-md px-2 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      disabled={form.unknownTime}
                    >
                      {Array.from({ length: 12 }, (_, i) =>
                        String(i + 1).padStart(2, "0"),
                      ).map((h) => (
                        <option key={h}>{h}</option>
                      ))}
                    </select>
                    <select
                      value={form.timeMM}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, timeMM: e.target.value }))
                      }
                      className="border rounded-md px-2 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      disabled={form.unknownTime}
                    >
                      {["00", "15", "30", "45"].map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={form.timeAMPM}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, timeAMPM: e.target.value }))
                      }
                      className="border rounded-md px-2 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      disabled={form.unknownTime}
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 mt-2 text-sm font-body text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.unknownTime}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          unknownTime: e.target.checked,
                        }))
                      }
                      data-ocid="rudraksha.unknown_time.checkbox"
                    />
                    I don't know the birth time
                  </label>
                </div>
                <div>
                  <Label
                    htmlFor="r-place"
                    className="font-heading text-sm font-semibold"
                  >
                    Place of Birth *
                  </Label>
                  <Input
                    id="r-place"
                    placeholder="PLACE OF BIRTH"
                    required
                    value={form.place}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, place: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="rudraksha.place.input"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full font-heading font-bold text-base py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                    color: "white",
                  }}
                  data-ocid="rudraksha.submit_button"
                >
                  SUBMIT
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Result */}
          {result && (
            <motion.div
              id="rudraksha-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
              data-ocid="rudraksha.result.section"
            >
              <Card
                className="border shadow-xl"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.5)",
                  background:
                    "linear-gradient(135deg, oklch(0.96 0.015 75) 0%, oklch(0.98 0.01 60) 100%)",
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-3">{result.emoji}</div>
                  <Badge
                    className="mb-3"
                    style={{
                      background: "oklch(0.78 0.14 75 / 0.2)",
                      color: "oklch(0.45 0.15 40)",
                      borderColor: "oklch(0.78 0.14 75 / 0.4)",
                    }}
                    variant="outline"
                  >
                    ✨ Your Recommended Rudraksha
                  </Badge>
                  <h2
                    className="font-heading text-3xl font-bold mb-2"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {result.mukhi}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground mb-1">
                    Ruling Planet: <strong>{result.planet}</strong>
                  </p>
                  <p
                    className="font-body text-base"
                    style={{ color: "oklch(0.40 0.10 30)" }}
                  >
                    {result.benefit}
                  </p>
                  <Button
                    className="mt-6 font-heading"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                      color: "white",
                    }}
                    data-ocid="rudraksha.shop_now.button"
                  >
                    Shop Now →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* What is Calculator */}
      <section
        className="py-12"
        style={{ background: "oklch(0.97 0.008 75 / 0.4)" }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            What is the Lucky Rudraksha Calculator?
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-6">
            The Lucky Rudraksha Calculator is a free online tool designed to
            help you discover which mukhi rudraksha aligns best with your
            personality and life path. Rudraksha beads are known for their
            powerful spiritual energy and are often worn to improve health,
            mental balance, and overall well-being. Choosing the right rudraksha
            isn't always simple. With so many varieties available, people often
            struggle with questions like authenticity, suitability, and
            effectiveness. That's exactly where this calculator comes in. At
            Spiritual Connect, the aim is to make this ancient wisdom accessible
            to everyone. This tool analyzes your birth chart and provides
            personalized recommendations, helping you select the most compatible
            rudraksha based on astrological insights.
          </p>
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            What is Rudraksha?
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed">
            Rudraksha is a sacred seed obtained from the tree Elaeocarpus
            ganitrus, commonly found in mountainous regions. According to
            mythology, it is believed to have originated from the tears of Lord
            Shiva, making it deeply significant in spiritual traditions. The
            word "Rudraksha" itself is derived from Rudra (another name for Lord
            Shiva) and Aksha (meaning tears). These beads are not just symbolic
            but are considered powerful tools that can help reduce stress,
            remove negativity, and support both material and spiritual growth.
          </p>
        </div>
      </section>

      {/* Types */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-6"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Types of Rudraksha
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {types.map((type, i) => (
              <motion.div
                key={type.mukhi}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="border"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
                >
                  <CardContent className="p-4 flex gap-3 items-start">
                    <Badge
                      className="shrink-0 font-heading"
                      style={{
                        background: "oklch(0.78 0.14 75 / 0.2)",
                        color: "oklch(0.45 0.15 40)",
                      }}
                    >
                      {type.mukhi}
                    </Badge>
                    <div>
                      <p className="font-heading text-sm font-semibold text-foreground">
                        {type.deity}
                      </p>
                      <p className="font-body text-xs text-muted-foreground">
                        {type.benefit}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured 4 */}
      <section
        className="py-12"
        style={{ background: "oklch(0.97 0.008 75 / 0.4)" }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <h2
            className="font-heading text-2xl font-bold text-center mb-8"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Featured Rudraksha Beads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredRudraksha.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`rudraksha.featured.item.${i + 1}`}
              >
                <Card
                  className="border text-center h-full"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                >
                  <CardContent className="p-5">
                    <div className="text-4xl mb-2">{r.emoji}</div>
                    <Badge
                      className="mb-2 text-xs"
                      style={{
                        background: "oklch(0.78 0.14 75 / 0.15)",
                        color: "oklch(0.45 0.15 40)",
                      }}
                    >
                      {r.mukhi} Mukhi
                    </Badge>
                    <h3 className="font-heading text-sm font-bold text-foreground mb-2">
                      {r.name}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground">
                      {r.benefit}
                    </p>
                    <p
                      className="font-body text-xs mt-2"
                      style={{ color: "oklch(0.28 0.12 195)" }}
                    >
                      Planet: {r.planet}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className="font-heading text-2xl font-bold mb-6"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Benefits of Wearing Rudraksha
          </h2>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 font-body text-sm text-foreground"
              >
                <span className="shrink-0 text-base">✅</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Wearing Process */}
      <section
        className="py-12"
        style={{ background: "oklch(0.97 0.008 75 / 0.4)" }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className="font-heading text-2xl font-bold mb-6"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Wearing Process of Rudraksha
          </h2>
          <ol className="space-y-4">
            {wearingSteps.map((step, i) => (
              <li key={step.slice(0, 20)} className="flex items-start gap-4">
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                  }}
                >
                  {i + 1}
                </span>
                <p className="font-body text-sm text-foreground leading-relaxed pt-1">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
