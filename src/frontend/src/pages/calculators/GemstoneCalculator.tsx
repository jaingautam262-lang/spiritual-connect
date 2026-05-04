import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useLanguage } from "../../contexts/LanguageContext";

const navratna = [
  {
    name: "Ruby (Manik)",
    planet: "Sun",
    emoji: "❤️",
    color: "Bright Red",
    day: "Sunday",
    metal: "Gold",
    finger: "Ring",
    minRatti: 3,
    benefit: "Leadership, power, vitality, confidence, government favor",
  },
  {
    name: "Pearl (Moti)",
    planet: "Moon",
    emoji: "🤍",
    color: "White/Cream",
    day: "Monday",
    metal: "Silver",
    finger: "Little",
    minRatti: 4,
    benefit: "Emotional balance, mother's blessings, mental peace",
  },
  {
    name: "Red Coral (Moonga)",
    planet: "Mars",
    emoji: "🪸",
    color: "Red/Orange",
    day: "Tuesday",
    metal: "Gold/Copper",
    finger: "Ring",
    minRatti: 6,
    benefit: "Courage, energy, remove obstacles, Mars energy",
  },
  {
    name: "Emerald (Panna)",
    planet: "Mercury",
    emoji: "💚",
    color: "Green",
    day: "Wednesday",
    metal: "Gold",
    finger: "Little",
    minRatti: 3,
    benefit: "Intelligence, communication, business success, creativity",
  },
  {
    name: "Yellow Sapphire (Pukhraj)",
    planet: "Jupiter",
    emoji: "💛",
    color: "Yellow",
    day: "Thursday",
    metal: "Gold",
    finger: "Index",
    minRatti: 4,
    benefit: "Wisdom, prosperity, marriage, spiritual growth",
  },
  {
    name: "Diamond (Heera)",
    planet: "Venus",
    emoji: "💎",
    color: "White/Clear",
    day: "Friday",
    metal: "White Gold/Platinum",
    finger: "Middle",
    minRatti: 0.5,
    benefit: "Love, luxury, arts, beauty, harmony in relationships",
  },
  {
    name: "Blue Sapphire (Neelam)",
    planet: "Saturn",
    emoji: "💙",
    color: "Blue",
    day: "Saturday",
    metal: "Gold/Silver",
    finger: "Middle",
    minRatti: 4,
    benefit: "Discipline, wealth, career success, remove Sade Sati",
  },
  {
    name: "Hessonite (Gomed)",
    planet: "Rahu",
    emoji: "🟠",
    color: "Honey/Orange",
    day: "Saturday",
    metal: "Silver",
    finger: "Middle",
    minRatti: 6,
    benefit: "Protection from Rahu's malefic effects, clarity, success",
  },
  {
    name: "Cat's Eye (Lehsunia)",
    planet: "Ketu",
    emoji: "🌟",
    color: "Greenish/Gold",
    day: "Thursday",
    metal: "White Gold",
    finger: "Middle",
    minRatti: 4,
    benefit: "Spiritual insight, intuition, moksha, past life karma",
  },
];

// Month-based primary stone mapping
const primaryByMonth: Record<number, number[]> = {
  1: [0, 1],
  2: [1, 3],
  3: [2, 0],
  4: [3, 4],
  5: [4, 3],
  6: [5, 4],
  7: [6, 5],
  8: [7, 6],
  9: [8, 7],
  10: [0, 4],
  11: [1, 6],
  12: [2, 4],
};

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

export default function GemstoneCalculator() {
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
  const [primaryIndices, setPrimaryIndices] = useState<number[] | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const month = form.dob ? new Date(form.dob).getMonth() + 1 : 5;
    setPrimaryIndices(primaryByMonth[month] ?? [0, 4]);
    setTimeout(
      () =>
        document
          .getElementById("gemstone-result")
          ?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.12 220) 0%, oklch(0.28 0.10 200) 50%, oklch(0.20 0.08 240) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 60%, oklch(0.78 0.14 75) 0%, transparent 50%)",
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
              💎 VEDIC GEMSTONE GUIDE
            </Badge>
            <h1
              className="font-heading text-4xl md:text-5xl font-bold mb-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Gemstone Calculator
            </h1>
            <p
              className="font-body text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.85 0.04 200)" }}
            >
              Find Your Lucky Gemstone by Birth Details
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section
        className="py-12 bg-background"
        data-ocid="gemstone.form.section"
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
                Enter Your Birth Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="g-name"
                    className="font-heading text-sm font-semibold"
                  >
                    Name *
                  </Label>
                  <Input
                    id="g-name"
                    placeholder="FULL NAME"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="gemstone.name.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="g-email"
                    className="font-heading text-sm font-semibold"
                  >
                    E-Mail *
                  </Label>
                  <Input
                    id="g-email"
                    type="email"
                    placeholder="E-MAIL"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="gemstone.email.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="g-phone"
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
                      id="g-phone"
                      type="tel"
                      placeholder="MOBILE NUMBER"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="flex-1"
                      data-ocid="gemstone.phone.input"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="g-dob"
                    className="font-heading text-sm font-semibold"
                  >
                    Date of Birth *
                  </Label>
                  <Input
                    id="g-dob"
                    type="date"
                    required
                    value={form.dob}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, dob: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="gemstone.dob.input"
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
                      disabled={form.unknownTime}
                      className="border rounded-md px-2 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
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
                      disabled={form.unknownTime}
                      className="border rounded-md px-2 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
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
                      disabled={form.unknownTime}
                      className="border rounded-md px-2 py-2 text-sm font-body"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
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
                      data-ocid="gemstone.unknown_time.checkbox"
                    />
                    I don't know the birth time
                  </label>
                </div>
                <div>
                  <Label
                    htmlFor="g-place"
                    className="font-heading text-sm font-semibold"
                  >
                    Place of Birth *
                  </Label>
                  <Input
                    id="g-place"
                    placeholder="PLACE OF BIRTH"
                    required
                    value={form.place}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, place: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="gemstone.place.input"
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
                  data-ocid="gemstone.submit_button"
                >
                  SUBMIT
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Result */}
          {primaryIndices && (
            <motion.div
              id="gemstone-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
              data-ocid="gemstone.result.section"
            >
              <h2
                className="font-heading text-2xl font-bold text-center mb-6"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Your Recommended Gemstones
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {primaryIndices.map((idx, ri) => (
                  <Card
                    key={navratna[idx].name}
                    className="border"
                    style={{
                      borderColor:
                        ri === 0
                          ? "oklch(0.78 0.14 75 / 0.6)"
                          : "oklch(0.78 0.14 75 / 0.25)",
                      background:
                        ri === 0
                          ? "linear-gradient(135deg, oklch(0.96 0.015 75), oklch(0.98 0.01 60))"
                          : undefined,
                    }}
                  >
                    <CardContent className="p-5 text-center">
                      <div className="text-3xl mb-2">{navratna[idx].emoji}</div>
                      {ri === 0 && (
                        <Badge
                          className="mb-2 text-xs"
                          style={{
                            background: "oklch(0.62 0.18 48)",
                            color: "white",
                          }}
                        >
                          ⭐ Primary Stone
                        </Badge>
                      )}
                      {ri === 1 && (
                        <Badge
                          className="mb-2 text-xs"
                          style={{
                            background: "oklch(0.78 0.14 75 / 0.2)",
                            color: "oklch(0.45 0.15 40)",
                          }}
                          variant="outline"
                        >
                          Secondary Stone
                        </Badge>
                      )}
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {navratna[idx].name}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        Planet: {navratna[idx].planet}
                      </p>
                      <p
                        className="font-body text-xs mt-2"
                        style={{ color: "oklch(0.40 0.10 30)" }}
                      >
                        {navratna[idx].benefit}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Navratna Section */}
      <section
        className="py-12"
        style={{ background: "oklch(0.97 0.008 75 / 0.4)" }}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold text-center mb-3"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            What are Navratna Gemstones?
          </h2>
          <p className="font-body text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            The nine gemstones of Vedic astrology, each aligned with a planetary
            force. Together they form the Navratna — the sacred nine gems that
            represent the complete cosmic energy of the solar system.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {navratna.map((gem, i) => (
              <motion.div
                key={gem.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                data-ocid={`gemstone.navratna.item.${i + 1}`}
              >
                <Card
                  className="border h-full"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{gem.emoji}</span>
                      <div>
                        <h3 className="font-heading text-sm font-bold text-foreground">
                          {gem.name}
                        </h3>
                        <p className="font-body text-xs text-muted-foreground">
                          Planet: {gem.planet}
                        </p>
                      </div>
                    </div>
                    <p className="font-body text-xs text-foreground mb-2">
                      {gem.benefit}
                    </p>
                    <div className="grid grid-cols-2 gap-1 text-xs font-body text-muted-foreground">
                      <span>
                        Day:{" "}
                        <strong className="text-foreground">{gem.day}</strong>
                      </span>
                      <span>
                        Metal:{" "}
                        <strong className="text-foreground">{gem.metal}</strong>
                      </span>
                      <span>
                        Finger:{" "}
                        <strong className="text-foreground">
                          {gem.finger}
                        </strong>
                      </span>
                      <span>
                        Min:{" "}
                        <strong className="text-foreground">
                          {gem.minRatti} Ratti
                        </strong>
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How gemstones work */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2
            className="font-heading text-2xl font-bold mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            How Gemstones Work — Planetary Energy
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            In Vedic astrology, each of the nine planets (Navagraha) emits a
            specific cosmic frequency. Gemstones, formed over millions of years
            deep within the Earth, act as natural amplifiers and transmitters
            for these frequencies. When worn on specific fingers in specific
            metals on specific days, they tune your personal energy field to
            harmonize with or strengthen the corresponding planetary influence
            in your birth chart.
          </p>
          <h2
            className="font-heading text-2xl font-bold mb-4"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            How to Wear Your Gemstone
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                step: "Choose the Right Stone",
                desc: "Always have your birth chart (kundli) analyzed by a qualified Jyotishi before purchasing.",
              },
              {
                step: "Check the Metal",
                desc: "Each gemstone works best in a specific metal — Ruby in gold, Pearl in silver, Blue Sapphire in silver or gold.",
              },
              {
                step: "Wear on the Right Day",
                desc: "Energize and first wear the gem on its ruling planet's day (Ruby on Sunday, Blue Sapphire on Saturday, etc.).",
              },
              {
                step: "Chant the Mantra",
                desc: "Recite the beej mantra of the ruling planet at least 108 times while wearing the gemstone for the first time.",
              },
            ].map((item, i) => (
              <Card
                key={item.step}
                className="border"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
              >
                <CardContent className="p-4 flex gap-3">
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">
                      {item.step}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      {item.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
