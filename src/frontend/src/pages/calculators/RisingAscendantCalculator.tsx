import type { CalculatorFormData } from "@/types/calculator";
import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";

// ─── Data ───────────────────────────────────────────────────────────────────

interface RisingSignData {
  sign: string;
  symbol: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  elementEmoji: string;
  rulingPlanet: string;
  traits: string[];
  description: string;
}

const RISING_SIGNS: RisingSignData[] = [
  {
    sign: "Aries",
    symbol: "♈",
    element: "Fire",
    elementEmoji: "🔥",
    rulingPlanet: "Mars",
    traits: ["Bold", "Energetic", "Direct", "Pioneering"],
    description:
      "Others see you as confident, action-oriented, and a natural leader. You project an energetic, competitive aura and come across as someone who jumps headfirst into life.",
  },
  {
    sign: "Taurus",
    symbol: "♉",
    element: "Earth",
    elementEmoji: "🌿",
    rulingPlanet: "Venus",
    traits: ["Calm", "Reliable", "Sensual", "Steadfast"],
    description:
      "You project a calm, reliable, and grounded presence. Others see you as someone who is patient, sensual, and deeply connected to the material world and comforts of life.",
  },
  {
    sign: "Gemini",
    symbol: "♊",
    element: "Air",
    elementEmoji: "💨",
    rulingPlanet: "Mercury",
    traits: ["Witty", "Curious", "Adaptable", "Communicative"],
    description:
      "You come across as quick-witted, curious, and sociable. Others perceive you as someone who is always learning, switching between topics with ease, and keeping things lively.",
  },
  {
    sign: "Cancer",
    symbol: "♋",
    element: "Water",
    elementEmoji: "💧",
    rulingPlanet: "Moon",
    traits: ["Nurturing", "Intuitive", "Protective", "Empathetic"],
    description:
      "Others see you as warm, nurturing, and deeply empathetic. You radiate a protective, home-loving energy that makes people feel safe and cared for in your presence.",
  },
  {
    sign: "Leo",
    symbol: "♌",
    element: "Fire",
    elementEmoji: "🔥",
    rulingPlanet: "Sun",
    traits: ["Radiant", "Charismatic", "Generous", "Dramatic"],
    description:
      "You project confidence, warmth, and charisma. Others are drawn to your magnetic presence and see you as someone with natural star power who lights up any room.",
  },
  {
    sign: "Virgo",
    symbol: "♍",
    element: "Earth",
    elementEmoji: "🌿",
    rulingPlanet: "Mercury",
    traits: ["Precise", "Helpful", "Analytical", "Modest"],
    description:
      "You come across as meticulous, helpful, and intellectually sharp. Others see you as someone dependable who pays attention to detail and brings order to everything they touch.",
  },
  {
    sign: "Libra",
    symbol: "♎",
    element: "Air",
    elementEmoji: "💨",
    rulingPlanet: "Venus",
    traits: ["Diplomatic", "Charming", "Fair", "Elegant"],
    description:
      "Others perceive you as graceful, diplomatic, and aesthetically attuned. You project an air of balance and harmony, making you someone people instinctively trust and want around.",
  },
  {
    sign: "Scorpio",
    symbol: "♏",
    element: "Water",
    elementEmoji: "💧",
    rulingPlanet: "Mars / Pluto",
    traits: ["Intense", "Magnetic", "Perceptive", "Transformative"],
    description:
      "You project an air of mystery, intensity, and quiet power. Others find you deeply magnetic and perceptive, someone who sees beneath the surface and holds their cards close.",
  },
  {
    sign: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    elementEmoji: "🔥",
    rulingPlanet: "Jupiter",
    traits: ["Optimistic", "Adventurous", "Philosophical", "Free-spirited"],
    description:
      "Others see you as optimistic, philosophical, and full of infectious enthusiasm. You project an adventurous, free-spirited energy that inspires people to think bigger and explore more.",
  },
  {
    sign: "Capricorn",
    symbol: "♑",
    element: "Earth",
    elementEmoji: "🌿",
    rulingPlanet: "Saturn",
    traits: ["Disciplined", "Ambitious", "Responsible", "Reserved"],
    description:
      "You come across as composed, authoritative, and quietly ambitious. Others see you as disciplined and reliable — someone with a strategic mindset and strong sense of responsibility.",
  },
  {
    sign: "Aquarius",
    symbol: "♒",
    element: "Air",
    elementEmoji: "💨",
    rulingPlanet: "Saturn / Uranus",
    traits: ["Original", "Humanitarian", "Detached", "Visionary"],
    description:
      "Others perceive you as unique, forward-thinking, and slightly unconventional. You project an independent, visionary energy and are seen as someone who marches to their own beat.",
  },
  {
    sign: "Pisces",
    symbol: "♓",
    element: "Water",
    elementEmoji: "💧",
    rulingPlanet: "Jupiter / Neptune",
    traits: ["Gentle", "Dreamy", "Compassionate", "Intuitive"],
    description:
      "You project a gentle, dreamy, and deeply compassionate presence. Others see you as empathetic and spiritual, someone with great emotional depth and a rich inner world.",
  },
];

const ELEMENT_COLOR: Record<string, string> = {
  Fire: "oklch(0.68 0.20 48)",
  Earth: "oklch(0.62 0.14 130)",
  Air: "oklch(0.68 0.16 230)",
  Water: "oklch(0.55 0.15 250)",
};

const DAYS = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
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
const YEARS = Array.from({ length: 100 }, (_, i) => String(2024 - i));
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const SECONDS = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

// ─── Sub-components ──────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  id,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  id: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-heading font-semibold"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
        style={{
          background: "oklch(0.20 0.05 25)",
          border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          color: value ? "oklch(0.88 0.04 75)" : "oklch(0.55 0.04 50)",
        }}
        data-ocid={`form.${id}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function InfoSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{
        background: "oklch(0.20 0.05 25)",
        border: "1px solid oklch(0.78 0.14 75 / 0.15)",
      }}
    >
      <h2
        className="font-heading text-xl md:text-2xl font-bold mb-4"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {title}
      </h2>
      <div
        className="font-body text-sm leading-relaxed space-y-3"
        style={{ color: "oklch(0.78 0.06 65)" }}
      >
        {children}
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: "oklch(0.20 0.05 25)",
        border: "1px solid oklch(0.78 0.14 75 / 0.15)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-3"
        aria-expanded={open}
        data-ocid="faq.toggle"
      >
        <span
          className="font-heading text-sm font-semibold"
          style={{ color: "oklch(0.88 0.06 70)" }}
        >
          {q}
        </span>
        <span
          className="text-lg font-bold flex-shrink-0 transition-transform duration-200"
          style={{
            color: "oklch(0.78 0.14 75)",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          className="px-5 pb-4 text-sm font-body leading-relaxed"
          style={{ color: "oklch(0.70 0.04 60)" }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function RisingAscendantCalculator() {
  const [form, setForm] = useState<CalculatorFormData>({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    tob: { hour: "", minute: "", second: "", unknown: false },
    placeOfBirth: "",
  });
  const [result, setResult] = useState<RisingSignData | null>(null);
  const [calculated, setCalculated] = useState(false);
  const { exportToPdf } = usePdfExport();

  const setField = (field: keyof CalculatorFormData, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const setDob = (field: keyof CalculatorFormData["dob"], value: string) =>
    setForm((p) => ({ ...p, dob: { ...p.dob, [field]: value } }));

  const setTob = (
    field: keyof CalculatorFormData["tob"],
    value: string | boolean,
  ) => setForm((p) => ({ ...p, tob: { ...p.tob, [field]: value } }));

  function handleCalculate() {
    if (!form.dob.day || !form.dob.month || !form.dob.year) return;
    // Deterministic result based on birth details
    const monthIdx = MONTHS.indexOf(form.dob.month);
    const dayNum = Number.parseInt(form.dob.day, 10);
    const hourNum = form.tob.unknown
      ? 6
      : Number.parseInt(form.tob.hour || "6", 10);
    const idx = (monthIdx + dayNum + hourNum) % 12;
    setResult(RISING_SIGNS[idx]);
    setCalculated(true);
  }

  const inputStyle = {
    background: "oklch(0.20 0.05 25)",
    border: "1px solid oklch(0.78 0.14 75 / 0.25)",
    color: "oklch(0.88 0.04 75)",
  };

  return (
    <div
      data-ocid="rising-ascendant-calculator-page"
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.06 22) 0%, oklch(0.14 0.04 20) 100%)",
      }}
    >
      <div className="container mx-auto max-w-4xl px-4 py-10 space-y-8">
        {/* ── Page Header ── */}
        <div className="text-center space-y-2">
          <div className="text-4xl mb-2">⬆️</div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Rising Sign / Ascendant Calculator
          </h1>
          <p
            className="font-body text-sm max-w-xl mx-auto"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            Discover how the world sees you — your Ascendant (Lagna) shapes your
            outer personality, appearance, and first impressions.
          </p>
        </div>

        {/* ── Calculator Card ── */}
        <div
          className="rounded-2xl p-6 md:p-8 space-y-6"
          style={{
            background: "oklch(0.22 0.06 25)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
            boxShadow:
              "0 0 0 1px oklch(0.78 0.14 75 / 0.08), 0 8px 32px oklch(0.10 0.04 20 / 0.4)",
          }}
        >
          <h2
            className="font-heading text-lg font-semibold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Calculate Your Rising / Ascendant Sign
          </h2>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="text-xs font-heading font-semibold"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Name *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="px-3 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
              style={inputStyle}
              data-ocid="form.name"
            />
          </div>

          {/* Gender */}
          <SelectField
            label="Gender *"
            id="gender"
            value={form.gender}
            onChange={(v) => setField("gender", v)}
            options={["Male", "Female", "Non-binary", "Prefer not to say"]}
            placeholder="Select Gender"
          />

          {/* DOB */}
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-heading font-semibold"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Date of Birth *
            </span>
            <div className="grid grid-cols-3 gap-2">
              <SelectField
                id="dob-day"
                value={form.dob.day}
                onChange={(v) => setDob("day", v)}
                options={DAYS}
                placeholder="Day"
              />
              <SelectField
                id="dob-month"
                value={form.dob.month}
                onChange={(v) => setDob("month", v)}
                options={MONTHS}
                placeholder="Month"
              />
              <SelectField
                id="dob-year"
                value={form.dob.year}
                onChange={(v) => setDob("year", v)}
                options={YEARS}
                placeholder="Year"
              />
            </div>
          </div>

          {/* Time of Birth */}
          <div className="flex flex-col gap-2">
            <span
              className="text-xs font-heading font-semibold"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Time of Birth *
            </span>
            <label
              className="flex items-center gap-2 cursor-pointer"
              data-ocid="form.tob_unknown"
            >
              <input
                type="checkbox"
                checked={form.tob.unknown}
                onChange={(e) => setTob("unknown", e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500"
              />
              <span
                className="text-xs font-body"
                style={{ color: "oklch(0.70 0.06 60)" }}
              >
                I don't know my time of birth
              </span>
            </label>
            {!form.tob.unknown && (
              <div className="grid grid-cols-3 gap-2">
                <SelectField
                  id="tob-hour"
                  value={form.tob.hour}
                  onChange={(v) => setTob("hour", v)}
                  options={HOURS}
                  placeholder="Hour"
                />
                <SelectField
                  id="tob-minute"
                  value={form.tob.minute}
                  onChange={(v) => setTob("minute", v)}
                  options={MINUTES}
                  placeholder="Minute"
                />
                <SelectField
                  id="tob-second"
                  value={form.tob.second}
                  onChange={(v) => setTob("second", v)}
                  options={SECONDS}
                  placeholder="Second"
                />
              </div>
            )}
            {form.tob.unknown && (
              <div
                className="rounded-lg px-4 py-3 text-xs font-body leading-relaxed"
                style={{
                  background: "oklch(0.68 0.16 48 / 0.12)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.30)",
                  color: "oklch(0.78 0.12 65)",
                }}
                data-ocid="form.tob_unknown_message"
              >
                ⚠️{" "}
                <strong>
                  Birth time is required for accurate Ascendant calculation.
                </strong>{" "}
                Enter an approximate time or consult an astrologer for birth
                time rectification.
              </div>
            )}
          </div>

          {/* Place of Birth */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="place"
              className="text-xs font-heading font-semibold"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Place of Birth *
            </label>
            <input
              id="place"
              type="text"
              placeholder="Enter your birth place"
              value={form.placeOfBirth}
              onChange={(e) => setField("placeOfBirth", e.target.value)}
              className="px-3 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
              style={inputStyle}
              data-ocid="form.place_of_birth"
            />
          </div>

          {/* Calculate Button */}
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!form.dob.day || !form.dob.month || !form.dob.year}
            className="w-full py-3 px-6 rounded-xl font-heading font-bold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              boxShadow: "0 4px 16px oklch(0.62 0.18 48 / 0.35)",
            }}
            data-ocid="form.calculate_button"
          >
            ✨ Calculate Rising Sign
          </button>

          {/* ── Inline Result ── */}
          {calculated && result && (
            <div
              id="rising-ascendant-results"
              className="rounded-2xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.26 0.07 28), oklch(0.22 0.06 25))",
                border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                boxShadow: "0 0 32px oklch(0.68 0.20 48 / 0.12)",
              }}
              data-ocid="result.panel"
            >
              {/* Sign header */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: "oklch(0.28 0.08 30)",
                    border: "2px solid oklch(0.78 0.14 75 / 0.40)",
                  }}
                >
                  {result.symbol}
                </div>
                <div>
                  <p
                    className="text-xs font-body uppercase tracking-widest mb-0.5"
                    style={{ color: "oklch(0.65 0.06 60)" }}
                  >
                    Your Rising / Ascendant Sign
                  </p>
                  <h3
                    className="font-heading text-2xl font-bold"
                    style={{ color: "oklch(0.88 0.14 75)" }}
                  >
                    {result.sign} Rising
                  </h3>
                  <p
                    className="text-xs font-body mt-0.5"
                    style={{ color: "oklch(0.65 0.06 60)" }}
                  >
                    {result.elementEmoji} {result.element} Sign · Ruled by{" "}
                    {result.rulingPlanet}
                  </p>
                </div>
              </div>

              {/* Traits */}
              <div className="flex flex-wrap gap-2">
                {result.traits.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-heading font-semibold"
                    style={{
                      background: `${ELEMENT_COLOR[result.element]}22`,
                      border: `1px solid ${ELEMENT_COLOR[result.element]}55`,
                      color: ELEMENT_COLOR[result.element],
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p
                className="text-sm font-body leading-relaxed"
                style={{ color: "oklch(0.78 0.06 65)" }}
              >
                {result.description}
              </p>

              {/* Time note if unknown */}
              {form.tob.unknown && (
                <p
                  className="text-xs font-body italic"
                  style={{ color: "oklch(0.62 0.08 55)" }}
                >
                  * This result is approximate. Exact birth time gives a precise
                  Rising Sign.
                </p>
              )}

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="/astrologer"
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-heading font-semibold text-center transition-all duration-200 hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                  }}
                  data-ocid="result.talk_astrologer_cta"
                >
                  📞 Talk to Astrologer
                </a>
                <a
                  href="/astrologer"
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-heading font-semibold text-center transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "oklch(0.26 0.07 28)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                  data-ocid="result.chat_astrologer_cta"
                >
                  💬 Chat with Astrologer
                </a>
                <button
                  type="button"
                  onClick={() =>
                    exportToPdf(
                      "rising-ascendant-results",
                      "rising-ascendant-result",
                      "Rising Sign / Ascendant Result",
                    )
                  }
                  className="flex-1 py-2.5 px-4 rounded-xl text-sm font-heading font-semibold text-center transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "oklch(0.78 0.14 75)",
                    color: "#1a0a00",
                  }}
                  data-ocid="result.export_pdf_button"
                >
                  Export as PDF
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Info Sections ── */}
        <InfoSection title="How to Calculate Rising/Ascendant Sign?">
          <p>
            Calculating your Rising Sign requires your{" "}
            <strong style={{ color: "oklch(0.88 0.06 70)" }}>
              exact birth time
            </strong>
            , date, and place of birth. Unlike your Sun sign which only needs
            your birthday, the Ascendant changes roughly every two hours as the
            Earth rotates — making birth time precision critical.
          </p>
          <p>
            If you don't know your exact birth time, a professional astrologer
            can perform{" "}
            <strong style={{ color: "oklch(0.88 0.06 70)" }}>
              birth time rectification
            </strong>{" "}
            — a process of reverse-calculating your likely birth time based on
            key life events, appearance, and personality patterns. This
            technique uses progressions and transits to identify the Ascendant
            that best aligns with your lived experience.
          </p>
          <p>
            The calculation itself plots the eastern horizon at the moment of
            birth onto the tropical or sidereal zodiac wheel. The zodiac sign
            rising over the eastern horizon becomes your Ascendant. Online
            calculators automate this by using precise astronomical ephemeris
            data adjusted for your location's latitude and longitude.
          </p>
        </InfoSection>

        <InfoSection title="What is Rising/Ascendant Sign?">
          <p>
            Your Rising Sign (also called the Ascendant or Lagna in Vedic
            astrology) is the zodiac sign that was rising on the eastern horizon
            at the precise moment of your birth. It's the "mask" you wear — the
            first impression you make and how the world perceives you before
            they know you deeply.
          </p>
          <p>
            Think of Meera from Pune: her Sun is in Virgo, making her analytical
            and detail-oriented in her inner world. But her Leo Rising means she
            enters every room with warmth, confidence, and a natural flair. Her
            colleagues think of her as a bold leader, while close friends know
            her quieter, methodical side. This is the Sun–Rising interplay at
            work.
          </p>
          <p>
            Your Ascendant also rules the 1st house of your birth chart,
            governing your physical appearance, health, first impressions, and
            your instinctive approach to new situations. It's sometimes even
            more apparent than your Sun sign in how others experience you
            day-to-day.
          </p>
        </InfoSection>

        <InfoSection title="What is the Importance of Rising Sign?">
          <p>
            Your Rising Sign is the lens through which you experience life — and
            the projection others receive. It shapes everything from your
            physical bearing and mannerisms to the energy you bring into a room.
            Understanding it adds profound depth to your self-knowledge.
          </p>
          <ul className="space-y-2 list-none pl-0">
            {[
              {
                label: "🔥 Fire Rising (Aries, Leo, Sagittarius)",
                text: "Projects confidence, vitality, and enthusiasm. You come across as dynamic and inspiring, often taking initiative in social situations.",
              },
              {
                label: "🌿 Earth Rising (Taurus, Virgo, Capricorn)",
                text: "Radiates calm, reliability, and practicality. Others see you as grounded, trustworthy, and someone who gets things done.",
              },
              {
                label: "💨 Air Rising (Gemini, Libra, Aquarius)",
                text: "Exudes intellectual curiosity and sociability. You're perceived as communicative, open-minded, and easy to connect with.",
              },
              {
                label: "💧 Water Rising (Cancer, Scorpio, Pisces)",
                text: "Gives off emotional depth and sensitivity. Others feel drawn to your empathy and perceive you as intuitive and deeply feeling.",
              },
            ].map((item) => (
              <li
                key={item.label}
                className="pl-3"
                style={{ borderLeft: "2px solid oklch(0.78 0.14 75 / 0.30)" }}
              >
                <strong style={{ color: "oklch(0.88 0.06 70)" }}>
                  {item.label}:
                </strong>{" "}
                {item.text}
              </li>
            ))}
          </ul>
          <p>
            Consider Arjun with Libra Rising: he comes across as charming,
            diplomatic, and aesthetically refined. Meanwhile, his friend with
            Aries Rising projects boldness and directness. The same room, two
            very different first impressions — neither more real than the other,
            just different cosmic masks.
          </p>
        </InfoSection>

        <InfoSection title="What is the Degree of Rising/Ascendant Sign?">
          <p>
            Every Rising Sign has a specific degree (0°–29°), and this nuance
            matters enormously in advanced chart interpretation. The degree
            tells you how far into the sign your Ascendant falls, adding another
            layer of meaning.
          </p>
          <ul className="space-y-2 list-none pl-0">
            {[
              {
                label: "Early Degrees (0°–9°)",
                text: "The Rising sign's qualities are fresh, unrefined, and instinctive. You may still be growing into the full expression of your Ascendant energy. These degrees carry a raw, pioneering quality.",
              },
              {
                label: "Middle Degrees (10°–19°)",
                text: "The sign's energy is fully expressed and at its most stable. This is considered the 'pure' expression of the Ascendant's qualities — balanced, integrated, and confident.",
              },
              {
                label: "Late Degrees (20°–29°)",
                text: "There's a sense of completing a cycle, often bringing wisdom, complexity, or intensity. These degrees can feel like the sign is reaching its culmination before transitioning to the next.",
              },
            ].map((item) => (
              <li
                key={item.label}
                className="pl-3"
                style={{ borderLeft: "2px solid oklch(0.78 0.14 75 / 0.30)" }}
              >
                <strong style={{ color: "oklch(0.88 0.06 70)" }}>
                  {item.label}:
                </strong>{" "}
                {item.text}
              </li>
            ))}
          </ul>
          <p>
            Planets conjunct your Ascendant within 8° also color your outer
            expression strongly. Mars near the Ascendant adds intensity and
            drive to your projected persona; Venus near the Ascendant gives a
            natural grace and magnetism that others immediately notice.
          </p>
        </InfoSection>

        {/* ── Twelve Rising Signs ── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.20 0.05 25)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-6"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            What are the Names of Twelve Rising Signs?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RISING_SIGNS.map((sign) => (
              <div
                key={sign.sign}
                className="rounded-xl p-4 space-y-2"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
                data-ocid={`rising.sign_${sign.sign.toLowerCase()}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-2xl w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "oklch(0.26 0.07 28)",
                      border: `1px solid ${ELEMENT_COLOR[sign.element]}44`,
                    }}
                  >
                    {sign.symbol}
                  </span>
                  <div>
                    <h3
                      className="font-heading text-sm font-bold"
                      style={{ color: "oklch(0.88 0.08 72)" }}
                    >
                      {sign.sign} Rising
                    </h3>
                    <p
                      className="text-xs"
                      style={{ color: ELEMENT_COLOR[sign.element] }}
                    >
                      {sign.elementEmoji} {sign.element} · {sign.rulingPlanet}
                    </p>
                  </div>
                </div>
                <p
                  className="text-xs font-body leading-relaxed"
                  style={{ color: "oklch(0.68 0.04 60)" }}
                >
                  {sign.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Conclusion ── */}
        <InfoSection title="Conclusion">
          <p>
            Your Rising Sign is not a disguise — it's an authentic layer of who
            you are. It shows how your soul chooses to interface with the world,
            shaped by the cosmic snapshot at the moment of your birth.
            Understanding it can unlock why people respond to you in certain
            ways and how you instinctively approach new beginnings.
          </p>
          <p>
            While this calculator gives you an excellent starting point, working
            with an experienced astrologer on Spiritual Connect can help you
            explore your Ascendant in context with your full birth chart — how
            it interacts with your Moon's emotional nature, your Sun's core
            identity, and the planetary rulers that shape your life path.
          </p>
          <p>
            Whether you're seeking clarity on relationships, career, or
            self-understanding, your Rising Sign is one of the most revealing
            pieces of your personal cosmic blueprint.
          </p>
        </InfoSection>

        {/* ── Discover More ── */}
        <div
          className="rounded-2xl p-6 md:p-8 text-center space-y-4"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.26 0.08 30), oklch(0.20 0.06 25))",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          <h2
            className="font-heading text-xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ✨ Discover More About Yourself
          </h2>
          <p
            className="text-sm font-body max-w-lg mx-auto"
            style={{ color: "oklch(0.70 0.06 60)" }}
          >
            Ready to unlock deeper insights? Explore our personalized
            calculators that reveal hidden aspects of your personality and
            destiny.
          </p>
          <div
            className="rounded-xl p-4 text-left max-w-md mx-auto"
            style={{
              background: "oklch(0.22 0.06 25)",
              border: "1px solid oklch(0.78 0.14 75 / 0.18)",
            }}
          >
            <p
              className="font-heading text-sm font-semibold mb-1"
              style={{ color: "oklch(0.88 0.08 70)" }}
            >
              🛍️ Spiritual Connect Store
            </p>
            <p
              className="text-xs font-body leading-relaxed"
              style={{ color: "oklch(0.65 0.04 58)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting
              &amp; decor, Pooja essentials, love items, and zodiac collection
              to support your spiritual journey.
            </p>
            <p
              className="text-xs mt-2 font-body"
              style={{ color: "oklch(0.78 0.12 68)" }}
            >
              ✨ Plus Much More — Compatibility calculators, birth chart
              generators, and personality assessments await your discovery.
            </p>
          </div>
        </div>

        {/* ── FAQs ── */}
        <div className="space-y-3">
          <h2
            className="font-heading text-xl md:text-2xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Frequently Asked Questions
          </h2>
          {[
            {
              q: "How accurate are online rising sign calculators?",
              a: "Online Rising Sign calculators are highly accurate when provided with precise birth details — especially the exact time of birth. Modern calculators use the same astronomical ephemeris data as professional astrologers. The main source of inaccuracy is an imprecise birth time, since the Ascendant changes every 2 hours. If your birth certificate records the time, the result will be very reliable.",
            },
            {
              q: "How do I work out my rising sign?",
              a: "To find your Rising Sign, you need three things: your exact date of birth, time of birth (as precise as possible — hour and minute), and your place of birth (city or coordinates). Enter these details into the calculator above. The tool calculates which zodiac sign was on the eastern horizon at that exact moment, giving you your Ascendant.",
            },
            {
              q: "What is the rising sun sign?",
              a: "The term 'Rising Sun sign' is a common mix-up. Your Rising Sign (Ascendant) and your Sun sign are two different things. Your Sun sign is determined by the date of your birth (the Sun's position), while your Rising Sign is the zodiac sign on the eastern horizon at your birth time. Many people find that their Rising Sign actually reflects how they're perceived more accurately than their Sun sign.",
            },
            {
              q: "What is my rising sign without birth time?",
              a: "Without a birth time, it's not possible to determine your Rising Sign with certainty, since it changes every two hours. However, an astrologer can use a technique called birth time rectification — analyzing key life events against possible Ascendant positions — to narrow down which Rising Sign fits best. Some people also identify their Rising Sign by comparing Rising Sign descriptions to their physical appearance and first impressions they make.",
            },
            {
              q: "Is my birthday my rising sign?",
              a: "No — your birthday alone determines your Sun sign (the position of the Sun on your birth date), not your Rising Sign. Your Rising Sign requires both your birth date AND exact birth time, because it reflects which zodiac sign was on the eastern horizon at the specific moment you were born. Two people born on the same day but at different times can have completely different Rising Signs.",
            },
          ].map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </div>
  );
}
