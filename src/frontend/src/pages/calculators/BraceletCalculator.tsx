import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import type { FormEvent } from "react";
import FavouriteButton from "../../components/FavouriteButton";
import { useLanguage } from "../../contexts/LanguageContext";

const bracelets = [
  {
    id: "bracelet-1",
    name: "Dhan Yog Bracelet",
    emoji: "🟡",
    purpose: "Wealth & Abundance",
    moolank: [1, 8, 9],
  },
  {
    id: "bracelet-2",
    name: "Pyrite Bracelet",
    emoji: "✨",
    purpose: "Prosperity & Success",
    moolank: [1, 4, 8],
  },
  {
    id: "bracelet-3",
    name: "Tiger's Eye Bracelet",
    emoji: "🟤",
    purpose: "Protection & Courage",
    moolank: [1, 3, 9],
  },
  {
    id: "bracelet-4",
    name: "5 Mukhi Rudraksha Bracelet",
    emoji: "📿",
    purpose: "Spiritual Growth",
    moolank: [5, 3, 7],
  },
  {
    id: "bracelet-5",
    name: "Black Onyx Bracelet",
    emoji: "⚫",
    purpose: "Protection & Grounding",
    moolank: [4, 7, 8],
  },
  {
    id: "bracelet-6",
    name: "Clear Quartz + Amethyst Bracelet",
    emoji: "💜",
    purpose: "Clarity & Intuition",
    moolank: [2, 7, 6],
  },
  {
    id: "bracelet-7",
    name: "Green Aventurine Bracelet",
    emoji: "💚",
    purpose: "Luck & Opportunity",
    moolank: [3, 5, 6],
  },
  {
    id: "bracelet-8",
    name: "Howlite Bracelet",
    emoji: "⚪",
    purpose: "Inner Peace & Calm",
    moolank: [2, 6, 7],
  },
  {
    id: "bracelet-9",
    name: "Sodalite Bracelet",
    emoji: "💙",
    purpose: "Communication & Truth",
    moolank: [5, 3, 8],
  },
  {
    id: "bracelet-10",
    name: "Rhodonite Bracelet",
    emoji: "🩷",
    purpose: "Love & Emotional Healing",
    moolank: [2, 6, 9],
  },
  {
    id: "bracelet-11",
    name: "Rose Quartz Bracelet",
    emoji: "🌸",
    purpose: "Love & Relationships",
    moolank: [2, 6, 5],
  },
  {
    id: "bracelet-12",
    name: "Red Jasper Bracelet",
    emoji: "🔴",
    purpose: "Energy & Strength",
    moolank: [9, 3, 1],
  },
];

const purposeBracelets: Record<string, string[]> = {
  "Wealth & Abundance": ["bracelet-1", "bracelet-2", "bracelet-3"],
  Protection: ["bracelet-5", "bracelet-3", "bracelet-12"],
  "Love & Relationships": ["bracelet-11", "bracelet-10", "bracelet-6"],
  "Clarity & Focus": ["bracelet-6", "bracelet-9", "bracelet-8"],
  "Spiritual Growth": ["bracelet-4", "bracelet-6", "bracelet-8"],
  "Health & Healing": ["bracelet-10", "bracelet-8", "bracelet-7"],
  "Career Success": ["bracelet-2", "bracelet-3", "bracelet-9"],
};

function calcMoolank(day: number): number {
  let n = day;
  while (n > 9)
    n = String(n)
      .split("")
      .reduce((s, d) => s + Number(d), 0);
  return n === 0 ? 9 : n;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  dob: string;
  birthTime: string;
  birthPlace: string;
  unknownTime: boolean;
  timeAMPM: string;
  purpose: string;
}

export default function BraceletCalculator() {
  useLanguage();
  const [tab, setTab] = useState<"Birth" | "Purpose">("Birth");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    dob: "",
    birthTime: "",
    birthPlace: "",
    unknownTime: false,
    timeAMPM: "AM",
    purpose: "Wealth & Abundance",
  });
  const [placeSelected, setPlaceSelected] = useState(false);
  const [recommended, setRecommended] = useState<string[] | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (tab === "Birth") {
      const day = form.dob ? new Date(form.dob).getDate() : 5;
      const mk = calcMoolank(day);
      const recs = bracelets
        .filter((b) => b.moolank.includes(mk))
        .slice(0, 3)
        .map((b) => b.id);
      setRecommended(
        recs.length > 0 ? recs : ["bracelet-1", "bracelet-7", "bracelet-11"],
      );
    } else {
      setRecommended(
        purposeBracelets[form.purpose] ?? [
          "bracelet-1",
          "bracelet-7",
          "bracelet-11",
        ],
      );
    }
    setTimeout(
      () =>
        document
          .getElementById("bracelet-result")
          ?.scrollIntoView({ behavior: "smooth" }),
      100,
    );
  }

  const recommendedBracelets = recommended
    ? bracelets.filter((b) => recommended.includes(b.id))
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.12 280) 0%, oklch(0.28 0.10 300) 50%, oklch(0.18 0.08 260) 100%)",
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
              📿 Powered by Moolank Numerology · Spiritual Connect
            </Badge>
            <h1
              className="font-heading text-3xl md:text-5xl font-bold mb-3"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Lucky Bracelet Calculator
            </h1>
            <p
              className="font-body text-lg max-w-2xl mx-auto mb-2"
              style={{ color: "oklch(0.85 0.04 280)" }}
            >
              Discover the Bracelet That Unlocks Your Luck, Enhances Your Wisdom
              & Aligns Your True Purpose
            </p>
            <p
              className="font-body text-sm max-w-xl mx-auto"
              style={{ color: "oklch(0.80 0.04 280)" }}
            >
              Enter your birth details or choose your life purpose — Spiritual
              Connect's prescription engine recommends the exact bracelet for
              you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section
        className="py-12 bg-background"
        data-ocid="bracelet.form.section"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <Card
            className="border shadow-lg"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
          >
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label
                    htmlFor="b-name"
                    className="font-heading text-sm font-semibold"
                  >
                    Your name
                  </Label>
                  <Input
                    id="b-name"
                    placeholder="Gautam JAIN"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="bracelet.name.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="b-email"
                    className="font-heading text-sm font-semibold"
                  >
                    Your email
                  </Label>
                  <Input
                    id="b-email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="bracelet.email.input"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="b-phone"
                    className="font-heading text-sm font-semibold"
                  >
                    Your phone number
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
                      id="b-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="flex-1"
                      data-ocid="bracelet.phone.input"
                    />
                  </div>
                </div>

                {/* Tabs */}
                <div>
                  <Label className="font-heading text-sm font-semibold">
                    Bracelet Suggestion By
                  </Label>
                  <div className="flex gap-2 mt-2">
                    {(["Birth", "Purpose"] as const).map((tb) => (
                      <button
                        key={tb}
                        type="button"
                        onClick={() => setTab(tb)}
                        className="px-5 py-2 rounded-full font-heading text-sm font-semibold transition-all"
                        style={
                          tab === tb
                            ? {
                                background:
                                  "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                                color: "white",
                              }
                            : {
                                background: "oklch(0.96 0.005 75)",
                                color: "oklch(0.45 0.08 40)",
                                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                              }
                        }
                        data-ocid={`bracelet.tab.${tb.toLowerCase()}`}
                      >
                        {tb}
                      </button>
                    ))}
                  </div>
                </div>

                {tab === "Birth" ? (
                  <>
                    <div>
                      <Label
                        htmlFor="b-dob"
                        className="font-heading text-sm font-semibold"
                      >
                        Enter your birth date
                      </Label>
                      <Input
                        id="b-dob"
                        type="date"
                        value={form.dob}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, dob: e.target.value }))
                        }
                        className="mt-1"
                        data-ocid="bracelet.dob.input"
                      />
                    </div>
                    <div>
                      <Label className="font-heading text-sm font-semibold">
                        Enter your birth time
                      </Label>
                      <div className="flex gap-2 mt-1 items-center">
                        <Input
                          type="time"
                          value={form.birthTime}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              birthTime: e.target.value,
                            }))
                          }
                          disabled={form.unknownTime}
                          className="flex-1"
                          style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                          data-ocid="bracelet.birth_time.input"
                        />
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
                          data-ocid="bracelet.unknown_time.checkbox"
                        />
                        I don't know the birth time
                      </label>
                    </div>
                    <div>
                      <Label
                        htmlFor="b-place"
                        className="font-heading text-sm font-semibold"
                      >
                        Enter your birth place
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="b-place"
                          placeholder="City, State, Country"
                          value={form.birthPlace}
                          onChange={(e) => {
                            setForm((f) => ({
                              ...f,
                              birthPlace: e.target.value,
                            }));
                            setPlaceSelected(false);
                          }}
                          onBlur={() => {
                            if (form.birthPlace) setPlaceSelected(true);
                          }}
                          className="pr-24"
                          style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                          data-ocid="bracelet.birth_place.input"
                        />
                        {placeSelected && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-body text-emerald-600">
                            ✓ Location selected
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <Label className="font-heading text-sm font-semibold">
                      Select Your Life Purpose
                    </Label>
                    <select
                      value={form.purpose}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, purpose: e.target.value }))
                      }
                      className="w-full border rounded-md px-3 py-2 text-sm font-body mt-1"
                      style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                      data-ocid="bracelet.purpose.select"
                    >
                      {Object.keys(purposeBracelets).map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full font-heading font-bold py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                    color: "white",
                  }}
                  data-ocid="bracelet.submit_button"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Result */}
          {recommendedBracelets.length > 0 && (
            <motion.div
              id="bracelet-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
              data-ocid="bracelet.result.section"
            >
              <h2
                className="font-heading text-2xl font-bold text-center mb-6"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Your Recommended Bracelets
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedBracelets.map((b, i) => (
                  <Card
                    key={b.id}
                    className="border"
                    style={{
                      borderColor:
                        i === 0
                          ? "oklch(0.78 0.14 75 / 0.6)"
                          : "oklch(0.78 0.14 75 / 0.25)",
                      background:
                        i === 0
                          ? "linear-gradient(135deg, oklch(0.96 0.015 75), oklch(0.98 0.01 60))"
                          : undefined,
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{b.emoji}</div>
                      {i === 0 && (
                        <Badge
                          className="mb-2 text-xs"
                          style={{
                            background: "oklch(0.62 0.18 48)",
                            color: "white",
                          }}
                        >
                          ⭐ Best Match
                        </Badge>
                      )}
                      <h3 className="font-heading text-sm font-bold text-foreground">
                        {b.name}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        {b.purpose}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bracelet Grid */}
      <section
        className="py-12"
        style={{ background: "oklch(0.97 0.008 75 / 0.4)" }}
        data-ocid="bracelet.products.section"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <h2
            className="font-heading text-2xl font-bold text-center mb-2"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            📿 Our Bracelets
          </h2>
          <p className="font-body text-center text-muted-foreground mb-8">
            41 natural crystal & Rudraksha bracelets
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {bracelets.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                data-ocid={`bracelet.item.${i + 1}`}
              >
                <Card
                  className="border hover:shadow-md transition-all"
                  style={{ borderColor: "oklch(0.78 0.14 75 / 0.25)" }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{b.emoji}</div>
                    <h3 className="font-heading text-xs font-bold text-foreground mb-1 leading-tight">
                      {b.name}
                    </h3>
                    <p className="font-body text-[10px] text-muted-foreground mb-3">
                      {b.purpose}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        className="font-heading text-xs px-3"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.62 0.18 48), oklch(0.78 0.14 75))",
                          color: "white",
                        }}
                        data-ocid={`bracelet.view_button.${i + 1}`}
                      >
                        View Details
                      </Button>
                      <FavouriteButton
                        item={{
                          id: b.id,
                          type: "product",
                          title: b.name,
                          path: "/bracelet-calculator",
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/shop" data-ocid="bracelet.view_all.link">
              <Button
                variant="outline"
                className="font-heading px-8"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.5)",
                  color: "oklch(0.45 0.15 40)",
                }}
              >
                View All Bracelets →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
