import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";
import type { CalculatorFormData } from "../../types/calculator";

// ── Data ──────────────────────────────────────────────────────────────────────

interface PlanetaryDeity {
  planet: string;
  symbol: string;
  deities: string;
  quality: string;
  color: string;
  story: { name: string; city: string; profession: string; insight: string };
  practice: string;
}

const PLANETARY_DEITIES: PlanetaryDeity[] = [
  {
    planet: "Sun",
    symbol: "☀️",
    deities: "Lord Shiva, Lord Rama, Surya Dev",
    quality: "Sovereignty, vitality, dharma",
    color: "oklch(0.75 0.20 55)",
    story: {
      name: "Arjun",
      city: "Lucknow",
      profession: "government officer",
      insight:
        "Devotion to Lord Rama gave him the courage to uphold justice even when it was costly, aligning his career with his soul's dignity.",
    },
    practice: "Surya Namaskar at dawn, chant Aditya Hridayam on Sundays.",
  },
  {
    planet: "Moon",
    symbol: "🌙",
    deities: "Goddess Parvati, Bal Gopal (Krishna)",
    quality: "Nurturing, emotional wisdom, compassion",
    color: "oklch(0.72 0.08 200)",
    story: {
      name: "Priya",
      city: "Chennai",
      profession: "teacher",
      insight:
        "Through her devotion to Parvati, Priya found emotional equilibrium that made her the most sought-after teacher in her school.",
    },
    practice:
      "Offer white flowers to Devi on Mondays; meditate on the full moon.",
  },
  {
    planet: "Mars",
    symbol: "🔴",
    deities: "Lord Hanuman, Goddess Durga, Lord Kartikeya",
    quality: "Courage, discipline, protection",
    color: "oklch(0.60 0.22 22)",
    story: {
      name: "Vikram",
      city: "Mumbai",
      profession: "police officer",
      insight:
        "Vikram's devotion to Hanuman channelled his fierce energy into justice and bravery, giving him strength in the most dangerous situations.",
    },
    practice: "Recite Hanuman Chalisa every Tuesday; light a mustard-oil lamp.",
  },
  {
    planet: "Mercury",
    symbol: "💚",
    deities: "Lord Ganesha, Goddess Saraswati",
    quality: "Intellect, communication, creativity",
    color: "oklch(0.62 0.18 140)",
    story: {
      name: "Ravi",
      city: "Hyderabad",
      profession: "software developer",
      insight:
        "Ravi began praying to Ganesha before every complex project — soon his code reviews became effortless and his communication improved dramatically.",
    },
    practice: "Chant Om Gam Ganapataye Namaha 108 times on Wednesdays.",
  },
  {
    planet: "Jupiter",
    symbol: "🟡",
    deities: "Lord Vishnu, Lord Dakshinamurthy",
    quality: "Wisdom, grace, divine knowledge",
    color: "oklch(0.78 0.14 75)",
    story: {
      name: "Sunita",
      city: "Kolkata",
      profession: "professor",
      insight:
        "Deepening her devotion to Vishnu gave Sunita a profound sense of purpose; students started seeking her guidance beyond academics.",
    },
    practice: "Read Vishnu Sahasranama on Thursdays; offer yellow flowers.",
  },
  {
    planet: "Venus",
    symbol: "💖",
    deities: "Goddess Lakshmi, Lord Krishna (romantic form)",
    quality: "Love, beauty, harmony, abundance",
    color: "oklch(0.68 0.16 330)",
    story: {
      name: "Anjali",
      city: "Jaipur",
      profession: "interior designer",
      insight:
        "Anjali's devotion to Lakshmi brought not only business success but infused her spaces with a peaceful, joyful energy clients deeply felt.",
    },
    practice:
      "Offer lotus or lotus petals to Lakshmi on Fridays; chant Sri Suktam.",
  },
  {
    planet: "Saturn",
    symbol: "🪐",
    deities: "Lord Shiva (ascetic form), Lord Ayyappa, Goddess Kali",
    quality: "Discipline, perseverance, karmic clarity",
    color: "oklch(0.55 0.10 250)",
    story: {
      name: "Mohan",
      city: "Delhi",
      profession: "businessman",
      insight:
        "Facing repeated delays, Mohan turned to Shiva worship. Patience became his greatest asset; eventually, his hard work earned long-lasting success.",
    },
    practice:
      "Light sesame-oil lamps on Saturdays; chant Maha Mrityunjaya Mantra.",
  },
  {
    planet: "Rahu",
    symbol: "☊",
    deities: "Goddess Kali, Lord Bhairav",
    quality: "Transformation, fearlessness, hidden power",
    color: "oklch(0.48 0.12 280)",
    story: {
      name: "Deepak",
      city: "Pune",
      profession: "entrepreneur",
      insight:
        "Deepak initially feared Kali's fierce form, but through devotion he discovered that her energy protected him through crisis after crisis.",
    },
    practice:
      "Offer dark blue flowers on Saturdays; meditate on Kali's protective light.",
  },
  {
    planet: "Ketu",
    symbol: "☋",
    deities: "Lord Shiva (destroyer aspect), Goddess Chinnamasta",
    quality: "Moksha, mysticism, inner surrender",
    color: "oklch(0.52 0.08 50)",
    story: {
      name: "Ramesh",
      city: "Bangalore",
      profession: "doctor",
      insight:
        "Despite worldly success Ramesh felt spiritually empty. Through Shiva meditation and yoga he found true peace — balancing duty with inner surrender.",
    },
    practice:
      "Practice deep meditation; observe silence on Tuesdays for inner withdrawal.",
  },
];

const MONTHS = [
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

interface IshtaResult {
  name: string;
  planet: PlanetaryDeity;
  deity: string;
  significance: string;
  practice: string;
}

function deriveResult(form: CalculatorFormData): IshtaResult | null {
  if (!form.name || !form.dob.day || !form.dob.month || !form.dob.year)
    return null;
  const day = Number.parseInt(form.dob.day);
  const month = Number.parseInt(form.dob.month);
  const year = Number.parseInt(form.dob.year);
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year))
    return null;

  // Simplified Atma Karaka approximation: sum of digits maps to planet index
  const sum = (day + month + (year % 100)) % 9;
  const idx = sum === 0 ? 0 : sum - 1;
  const planet = PLANETARY_DEITIES[idx % PLANETARY_DEITIES.length];

  return {
    name: form.name,
    planet,
    deity: planet.deities.split(",")[0].trim(),
    significance: `Your soul's journey in this lifetime resonates with the energy of ${planet.planet}. This planet reflects your Atma Karaka — the deepest calling of your spirit.`,
    practice: planet.practice,
  };
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-heading font-bold mb-4"
      style={{ color: "oklch(0.78 0.14 75)" }}
    >
      {children}
    </h2>
  );
}

function InfoSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="py-10 border-b"
      style={{ borderColor: "oklch(0.78 0.14 75 / 0.12)" }}
    >
      <SectionHeading>{title}</SectionHeading>
      <div
        className="font-body text-sm leading-relaxed space-y-3"
        style={{ color: "oklch(0.82 0.03 75)" }}
      >
        {children}
      </div>
    </section>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

const DAYS = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const YEARS = Array.from({ length: 100 }, (_, i) =>
  String(new Date().getFullYear() - i),
);
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const SECONDS = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

const selectClass =
  "w-full rounded-md px-3 py-2 text-sm border focus:outline-none focus:ring-2 font-body";
const selectStyle = {
  background: "oklch(0.22 0.06 25)",
  borderColor: "oklch(0.78 0.14 75 / 0.25)",
  color: "oklch(0.88 0.04 75)",
};

export default function IshtaDevataCalculator() {
  const [form, setForm] = useState<CalculatorFormData>({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    tob: { hour: "", minute: "", second: "", unknown: false },
    placeOfBirth: "",
  });
  const [result, setResult] = useState<IshtaResult | null>(null);
  const { exportToPdf } = usePdfExport();

  function setDob(field: keyof CalculatorFormData["dob"], val: string) {
    setForm((f) => ({ ...f, dob: { ...f.dob, [field]: val } }));
  }
  function setTob(
    field: keyof CalculatorFormData["tob"],
    val: string | boolean,
  ) {
    setForm((f) => ({ ...f, tob: { ...f.tob, [field]: val } }));
  }

  function handleCalculate() {
    setResult(deriveResult(form));
  }

  return (
    <div
      data-ocid="ishta-devata-calculator-page"
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.04 28)" }}
    >
      {/* Hero Banner */}
      <div
        className="py-10 px-4 text-center border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <img
            src="/assets/generated/logo-om.dim_256x256.png"
            alt=""
            className="h-6 w-6 opacity-70"
          />
          <span
            className="text-xs font-body tracking-widest uppercase"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            Spiritual Connect
          </span>
        </div>
        <h1
          className="text-3xl md:text-4xl font-decorative font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Ishta Devata Calculator
        </h1>
        <p
          className="max-w-2xl mx-auto text-sm font-body leading-relaxed"
          style={{ color: "oklch(0.82 0.03 75)" }}
        >
          Have you ever felt like there's a silent force guiding you during your
          toughest moments? That comforting presence might be your Ishta Devata
          — your personal divine guide. Discover who that is through your birth
          chart in Vedic astrology.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-10">
        {/* ── Calculator Card ── */}
        <Card
          className="mb-10 shadow-xl border"
          style={{
            background: "oklch(0.18 0.05 28)",
            borderColor: "oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <CardHeader className="pb-4">
            <CardTitle
              className="text-xl font-heading"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🕉️ Calculate Your Ishta Devata
            </CardTitle>
            <p
              className="text-xs font-body"
              style={{ color: "oklch(0.65 0.04 60)" }}
            >
              Enter your birth details to discover your personal chosen deity
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Name */}
            <div className="space-y-1.5">
              <Label
                className="text-xs font-heading font-semibold tracking-wide"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Name <span style={{ color: "oklch(0.68 0.20 48)" }}>*</span>
              </Label>
              <Input
                data-ocid="calc.name_input"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="font-body"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.88 0.04 75)",
                }}
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <Label
                className="text-xs font-heading font-semibold tracking-wide"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Gender <span style={{ color: "oklch(0.68 0.20 48)" }}>*</span>
              </Label>
              <select
                data-ocid="calc.gender_select"
                value={form.gender}
                onChange={(e) =>
                  setForm((f) => ({ ...f, gender: e.target.value }))
                }
                className={selectClass}
                style={selectStyle}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <Label
                className="text-xs font-heading font-semibold tracking-wide"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Date of Birth{" "}
                <span style={{ color: "oklch(0.68 0.20 48)" }}>*</span>
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  data-ocid="calc.dob_day"
                  value={form.dob.day}
                  onChange={(e) => setDob("day", e.target.value)}
                  className={selectClass}
                  style={selectStyle}
                >
                  <option value="">Day</option>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  data-ocid="calc.dob_month"
                  value={form.dob.month}
                  onChange={(e) => setDob("month", e.target.value)}
                  className={selectClass}
                  style={selectStyle}
                >
                  <option value="">Month</option>
                  {MONTHS.map((m, i) => (
                    <option key={m} value={String(i + 1).padStart(2, "0")}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  data-ocid="calc.dob_year"
                  value={form.dob.year}
                  onChange={(e) => setDob("year", e.target.value)}
                  className={selectClass}
                  style={selectStyle}
                >
                  <option value="">Year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time of Birth */}
            <div className="space-y-1.5">
              <Label
                className="text-xs font-heading font-semibold tracking-wide"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Time of Birth
              </Label>
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="tob-unknown"
                  data-ocid="calc.tob_unknown"
                  checked={form.tob.unknown}
                  onCheckedChange={(v) => setTob("unknown", !!v)}
                />
                <label
                  htmlFor="tob-unknown"
                  className="text-xs font-body cursor-pointer"
                  style={{ color: "oklch(0.70 0.04 60)" }}
                >
                  I don't know my time of birth
                </label>
              </div>
              {!form.tob.unknown && (
                <div className="grid grid-cols-3 gap-2">
                  <select
                    data-ocid="calc.tob_hour"
                    value={form.tob.hour}
                    onChange={(e) => setTob("hour", e.target.value)}
                    className={selectClass}
                    style={selectStyle}
                  >
                    <option value="">Hour</option>
                    {HOURS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  <select
                    data-ocid="calc.tob_minute"
                    value={form.tob.minute}
                    onChange={(e) => setTob("minute", e.target.value)}
                    className={selectClass}
                    style={selectStyle}
                  >
                    <option value="">Minute</option>
                    {MINUTES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    data-ocid="calc.tob_second"
                    value={form.tob.second}
                    onChange={(e) => setTob("second", e.target.value)}
                    className={selectClass}
                    style={selectStyle}
                  >
                    <option value="">Second</option>
                    {SECONDS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Place of Birth */}
            <div className="space-y-1.5">
              <Label
                className="text-xs font-heading font-semibold tracking-wide"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Place of Birth{" "}
                <span style={{ color: "oklch(0.68 0.20 48)" }}>*</span>
              </Label>
              <Input
                data-ocid="calc.place_input"
                placeholder="Enter your birth place"
                value={form.placeOfBirth}
                onChange={(e) =>
                  setForm((f) => ({ ...f, placeOfBirth: e.target.value }))
                }
                className="font-body"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.88 0.04 75)",
                }}
              />
            </div>

            {/* Calculate Button */}
            <Button
              type="button"
              data-ocid="calc.submit_button"
              onClick={handleCalculate}
              className="w-full py-3 font-heading font-bold text-sm tracking-wider"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
                border: "none",
              }}
            >
              🕉️ Calculate My Ishta Devata
            </Button>
          </CardContent>
        </Card>

        {/* ── Inline Result ── */}
        {result && (
          <Card
            id="ishta-devata-results"
            data-ocid="calc.result_card"
            className="mb-10 border shadow-xl animate-in fade-in duration-500"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.20 0.08 28) 0%, oklch(0.24 0.07 30) 100%)",
              borderColor: "oklch(0.78 0.14 75 / 0.35)",
            }}
          >
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-2">{result.planet.symbol}</div>
                <h3
                  className="text-2xl font-decorative font-bold mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {result.name}'s Ishta Devata
                </h3>
                <p
                  className="text-lg font-heading font-semibold mb-1"
                  style={{ color: "oklch(0.88 0.08 75)" }}
                >
                  {result.deity}
                </p>
                <Badge
                  className="text-xs font-body px-3 py-1"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.15)",
                    color: "oklch(0.78 0.14 75)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                  }}
                >
                  Atma Karaka: {result.planet.planet}
                </Badge>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div
                  className="rounded-lg p-4 text-center"
                  style={{
                    background: "oklch(0.18 0.05 28)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <p
                    className="text-xs font-heading uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Deities
                  </p>
                  <p
                    className="text-sm font-body"
                    style={{ color: "oklch(0.88 0.04 75)" }}
                  >
                    {result.planet.deities}
                  </p>
                </div>
                <div
                  className="rounded-lg p-4 text-center"
                  style={{
                    background: "oklch(0.18 0.05 28)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <p
                    className="text-xs font-heading uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Soul Quality
                  </p>
                  <p
                    className="text-sm font-body"
                    style={{ color: "oklch(0.88 0.04 75)" }}
                  >
                    {result.planet.quality}
                  </p>
                </div>
                <div
                  className="rounded-lg p-4 text-center"
                  style={{
                    background: "oklch(0.18 0.05 28)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <p
                    className="text-xs font-heading uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Devotional Practice
                  </p>
                  <p
                    className="text-sm font-body"
                    style={{ color: "oklch(0.88 0.04 75)" }}
                  >
                    {result.practice}
                  </p>
                </div>
              </div>

              <div
                className="mt-4 p-4 rounded-lg"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <p
                  className="text-sm font-body leading-relaxed"
                  style={{ color: "oklch(0.82 0.03 75)" }}
                >
                  {result.significance}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  type="button"
                  data-ocid="calc.talk_astrologer_btn"
                  className="flex-1 font-heading font-semibold text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                    border: "none",
                  }}
                >
                  📞 Talk to Astrologer
                </Button>
                <Button
                  type="button"
                  data-ocid="calc.chat_astrologer_btn"
                  className="flex-1 font-heading font-semibold text-sm"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.12)",
                    color: "oklch(0.78 0.14 75)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                  }}
                >
                  💬 Chat with Astrologer
                </Button>
                <Button
                  type="button"
                  data-ocid="calc.export_pdf_button"
                  className="flex-1 font-heading font-semibold text-sm"
                  onClick={() =>
                    exportToPdf(
                      "ishta-devata-results",
                      "ishta-devata-result",
                      "Ishta Devata Result",
                    )
                  }
                  style={{
                    background: "oklch(0.78 0.14 75)",
                    color: "#1a0a00",
                    border: "none",
                  }}
                >
                  Export as PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Informational Sections ── */}
        <InfoSection title="What is the Ishta Devata Calculator?">
          <p>
            Have you ever felt a quiet pull toward a particular deity — a sense
            of comfort when you hear their name or see their image? That feeling
            might not be random. The{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              Ishta Devata Calculator
            </strong>{" "}
            helps you discover which divine energy personally resonates with
            your soul's journey, based on your Vedic birth chart. It's not about
            rituals or what your family follows — it's about your unique
            spiritual connection.
          </p>
          <p>
            This guidance comes from your <em>Atma Karaka</em> — the planet that
            carries the highest degree in your birth chart and reflects your
            soul's core purpose. By studying its deeper placement, this tool
            reveals the god or goddess who truly mirrors your inner path.
          </p>
          <p>
            Think of it as meeting your spiritual guardian — someone who's
            always been with you, silently offering support. Once you know your
            Ishta Devata, your spiritual practices — be it chanting, puja,
            meditation, or heartfelt gratitude — become more meaningful and
            centred.
          </p>
        </InfoSection>

        <InfoSection title="How Does the Ishta Devata Calculator Work?">
          <p>
            The Ishta Devata Calculator isn't just another spiritual tool — it's
            like unlocking a divine map designed just for you, based on ancient
            Vedic wisdom. With a few birth details, it opens powerful insights
            in minutes.
          </p>
          <ul className="space-y-2 pl-4 list-disc">
            <li>
              <strong style={{ color: "oklch(0.78 0.14 75)" }}>
                Step 1 — Atma Karaka:
              </strong>{" "}
              The planet holding the highest degree in your birth chart is
              identified. This planet is your soul's guiding light.
            </li>
            <li>
              <strong style={{ color: "oklch(0.78 0.14 75)" }}>
                Step 2 — Zodiac Sign:
              </strong>{" "}
              The calculator checks which sign your Atma Karaka occupies. For
              example, if it lands in Aries, you may feel drawn to Lord Hanuman
              or Maa Durga.
            </li>
            <li>
              <strong style={{ color: "oklch(0.78 0.14 75)" }}>
                Step 3 — House Placement:
              </strong>{" "}
              Where the planet sits — the 4th house of heart, or the 10th house
              of karma — adds further detail about the type of divine guidance
              your soul seeks.
            </li>
            <li>
              <strong style={{ color: "oklch(0.78 0.14 75)" }}>
                Step 4 — Conjunctions & Aspects:
              </strong>{" "}
              Planetary interactions refine the picture further, like uncovering
              your spiritual DNA.
            </li>
          </ul>
        </InfoSection>

        <InfoSection title="What is Ishta Devata?">
          <p>
            The term <em>Ishta Devata</em> comes from Sanskrit — "Ishta" means
            chosen or beloved, and "Devata" means deity. So your Ishta Devata is
            your{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              chosen beloved deity
            </strong>{" "}
            — the divine energy your heart naturally connects with, beyond
            tradition or upbringing.
          </p>
          <p>
            Unlike a Kuldevi or the popular gods everyone prays to, your Ishta
            Devata is uniquely yours — like a spiritual companion walking beside
            you from birth. This bond strengthens as you grow spiritually and
            begin recognising what your soul truly resonates with.
          </p>
          <p>
            The beauty of this concept lies in its acceptance that every soul is
            different, and so are its spiritual needs. For some it's the fierce
            strength of Goddess Durga; for others it's the loving wisdom of
            Krishna. More than a personal deity, your Ishta Devata becomes your
            inner guide — offering strength, answers, and a sense of home in
            moments of chaos.
          </p>
        </InfoSection>

        <InfoSection title="What is the Importance of Ishta Devata?">
          <p>
            Knowing your Ishta Devata transforms your spiritual journey from
            scattered to deeply focused. Instead of offering prayers here and
            there without direction, you build a special bond with one divine
            presence, making your prayers and meditation more powerful and
            meaningful.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[
              {
                icon: "🙏",
                title: "Focused Devotion",
                desc: "Concentrated spiritual energy creates stronger connections and more effective prayers.",
              },
              {
                icon: "💫",
                title: "Emotional Stability",
                desc: "Knowing you have a divine protector brings deep peace and belonging during life transitions.",
              },
              {
                icon: "🌟",
                title: "Life Purpose",
                desc: "Your Ishta Devata reveals your hidden talents and gifts aligned with your true calling.",
              },
              {
                icon: "✨",
                title: "Karma Clearing",
                desc: "Regular worship clears negative karma and attracts positivity and success.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg p-4"
                style={{
                  background: "oklch(0.20 0.06 26)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <p
                  className="font-heading font-semibold text-sm mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.70 0.04 60)" }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </InfoSection>

        {/* Planetary Influence Section */}
        <section
          className="py-10 border-b"
          style={{ borderColor: "oklch(0.78 0.14 75 / 0.12)" }}
        >
          <SectionHeading>
            How to Find Your Ishta Devata? — Planetary Influence
          </SectionHeading>
          <p
            className="font-body text-sm leading-relaxed mb-6"
            style={{ color: "oklch(0.82 0.03 75)" }}
          >
            In Vedic astrology, every planet is linked to specific divine
            energies. Discovering your Ishta Devata through your Atma Karaka can
            deepen your spiritual connection like nothing else.
          </p>
          <div className="space-y-5">
            {PLANETARY_DEITIES.map((p) => (
              <div
                key={p.planet}
                className="rounded-xl p-5"
                style={{
                  background: "oklch(0.18 0.05 28)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: `${p.color}20`,
                      border: `1px solid ${p.color}50`,
                    }}
                  >
                    {p.symbol}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3
                        className="font-heading font-bold text-base"
                        style={{ color: "oklch(0.88 0.06 75)" }}
                      >
                        {p.planet}
                      </h3>
                      <Badge
                        className="text-xs font-body"
                        style={{
                          background: `${p.color}18`,
                          color: p.color,
                          border: `1px solid ${p.color}40`,
                        }}
                      >
                        {p.quality.split(",")[0]}
                      </Badge>
                    </div>
                    <p
                      className="text-xs font-body mb-2"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      <strong>Deities:</strong> {p.deities}
                    </p>
                    <div
                      className="rounded-lg p-3 mt-2"
                      style={{
                        background: "oklch(0.22 0.06 25 / 0.6)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.08)",
                      }}
                    >
                      <p
                        className="text-xs font-body italic leading-relaxed"
                        style={{ color: "oklch(0.72 0.04 60)" }}
                      >
                        🌸{" "}
                        <strong
                          style={{
                            color: "oklch(0.78 0.14 75)",
                            fontStyle: "normal",
                          }}
                        >
                          {p.story.name}
                        </strong>{" "}
                        from {p.story.city}, a {p.story.profession}: "
                        {p.story.insight}"
                      </p>
                    </div>
                    <p
                      className="text-xs font-body mt-2"
                      style={{ color: "oklch(0.65 0.04 60)" }}
                    >
                      <strong style={{ color: "oklch(0.78 0.14 75 / 0.8)" }}>
                        Practice:
                      </strong>{" "}
                      {p.practice}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <InfoSection title="What Are Karakamsha And Kul Devta?">
          <p>
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Karakamsha</strong>{" "}
            is the sign where your Atma Karaka planet sits in the Navamsha (D9)
            chart — a powerful hint about your soul's deeper spiritual leanings
            and the divine energy that supports your growth. While your Ishta
            Devata comes from your main birth chart and guides your personal
            spiritual path, Karakamsha digs deeper into subtle patterns from the
            Navamsha chart. Together, they paint a fuller picture of your
            spiritual connections.
          </p>
          <p>
            Then there's your{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Kul Devta</strong>{" "}
            — the family deity passed down through generations. Unlike Ishta
            Devata, which is uniquely yours, Kul Devta connects you with your
            ancestral roots, offering blessings and protection from your
            lineage.
          </p>
          <p>
            Many people wonder if they should follow their Ishta Devata or Kul
            Devta. The truth is, both play important roles. Your Kul Devta keeps
            the family's spiritual energy alive, while your Ishta Devata guides
            your individual growth. Ideally, you honour both. When prioritising,
            spiritual teachers usually advise focusing on your Ishta Devata for
            personal growth, while still respecting your Kul Devta through
            family rituals and occasional prayers.
          </p>
        </InfoSection>

        {/* Conclusion */}
        <section
          className="py-10 border-b"
          style={{ borderColor: "oklch(0.78 0.14 75 / 0.12)" }}
        >
          <SectionHeading>Conclusion</SectionHeading>
          <div
            className="font-body text-sm leading-relaxed space-y-3"
            style={{ color: "oklch(0.82 0.03 75)" }}
          >
            <p>
              Your Ishta Devata Calculator isn't just another tool — it's like a
              spiritual compass pointing you toward the divine energy that truly
              resonates with your soul. Instead of guessing which deity to
              connect with, this ancient wisdom gives you a clear, personalised
              path to nurture your spiritual growth.
            </p>
            <p>
              Depending on your unique planetary influences, your Atma Karaka
              might link you to powerful guardians like Goddess Kali, who
              fiercely protects and transforms, or to gentle guides like Lord
              Krishna, whose wisdom and love inspire peace and joy. This
              connection isn't just symbolic — it becomes your source of
              strength, guidance, and clarity through life's ups and downs.
            </p>
            <p>
              But knowing your Ishta Devata is just the first step. The real
              magic unfolds as you deepen your bond through heartfelt prayer,
              meditation, and devotion. Over time, this relationship
              strengthens, supporting not only your spiritual journey but also
              your everyday challenges and goals.
            </p>
            <p>
              Everyone seeking spiritual support can consult a spiritual
              counsellor on Spiritual Connect to explore the profound guidance
              this sacred bond brings into their lives.
            </p>
          </div>
        </section>

        {/* Discover More */}
        <section
          className="py-10 rounded-xl my-8 text-center px-4"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <h2
            className="text-xl font-decorative font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Discover More About Yourself
          </h2>
          <p
            className="text-sm font-body mb-4"
            style={{ color: "oklch(0.82 0.03 75)" }}
          >
            Ready to unlock deeper insights? Explore our personalised
            calculators that reveal hidden aspects of your personality and
            destiny.
          </p>
          <div
            className="rounded-lg p-4 mb-4 text-left"
            style={{
              background: "oklch(0.18 0.05 28 / 0.6)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            <p
              className="text-sm font-heading font-semibold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🛕 Spiritual Connect Store
            </p>
            <p
              className="text-xs font-body"
              style={{ color: "oklch(0.70 0.04 60)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting &
              decor, Pooja essentials, love items, and zodiac collection to
              support your spiritual journey.
            </p>
          </div>
          <p
            className="text-xs font-body"
            style={{ color: "oklch(0.65 0.04 60)" }}
          >
            ✨ Compatibility calculators, birth chart generators, and
            personality assessments await your discovery.
          </p>
        </section>

        {/* FAQs */}
        <section className="py-8">
          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              {
                q: "How do I find my Ishta Devata?",
                a: "Your Ishta Devata is determined by identifying your Atma Karaka planet — the planet with the highest degree in your birth chart — and analysing its sign, house placement, and aspects. This calculation reveals which deity naturally connects with your soul's spiritual needs and can be done through Vedic astrology calculations or consultation with an experienced astrologer.",
              },
              {
                q: "Can you have 2 Ishta Devata?",
                a: "Traditionally, you have one primary Ishta Devata based on your Atma Karaka planet. However, some people might feel connected to multiple deities due to complex planetary influences or past-life connections. It's generally recommended to focus on one primary deity while maintaining respect for others that resonate with you spiritually.",
              },
              {
                q: "Who is the god Ishta Devata?",
                a: "Ishta Devata isn't a specific god but rather refers to your personal chosen deity based on your birth chart. It could be any form of the divine — Lord Vishnu, Goddess Durga, Lord Shiva, or others — depending on your Atma Karaka planet and its placement in your horoscope.",
              },
              {
                q: "How do I find my lucky god?",
                a: "Your lucky god is essentially your Ishta Devata, found through analysing your Atma Karaka planet in your birth chart. This deity naturally supports your spiritual growth and life goals. You can also consider your ruling planet based on your ascendant sign, which indicates beneficial divine connections for your overall well-being.",
              },
              {
                q: "How to find Ishta Devata from kundli?",
                a: "To find your Ishta Devata from your kundli, first identify the planet with the highest degree — this is your Atma Karaka. Then analyse which sign this planet occupies, its house placement, and any aspects it receives. Each planet connects to specific deities, and these additional factors refine which particular form of that deity serves as your spiritual guide.",
              },
            ].map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                data-ocid={`faq.item_${faq.q.slice(0, 20).replace(/\s+/g, "_")}`}
                className="rounded-lg border px-4"
                style={{
                  background: "oklch(0.18 0.05 28)",
                  borderColor: "oklch(0.78 0.14 75 / 0.18)",
                }}
              >
                <AccordionTrigger
                  className="text-sm font-heading font-semibold text-left py-4 hover:no-underline"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm font-body leading-relaxed pb-4"
                  style={{ color: "oklch(0.72 0.04 60)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
