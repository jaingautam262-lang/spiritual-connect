import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";
import type { CalculatorFormData } from "../../types/calculator";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SadeSatiResult {
  phase: "phase1" | "phase2" | "phase3" | "not-active";
  phaseLabel: string;
  intensity: "low" | "moderate" | "high";
  startDate: string;
  endDate: string;
  moonSign: string;
  description: string;
  remedies: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MOON_SIGNS = [
  "Aries (Mesh)",
  "Taurus (Vrishabh)",
  "Gemini (Mithun)",
  "Cancer (Karka)",
  "Leo (Simha)",
  "Virgo (Kanya)",
  "Libra (Tula)",
  "Scorpio (Vrishchik)",
  "Sagittarius (Dhanu)",
  "Capricorn (Makar)",
  "Aquarius (Kumbh)",
  "Pisces (Meen)",
];

// Saturn in Aquarius as of 2025 (~Mar 2023 – Mar 2025 approx periods)
function computeSadeSati(dob: {
  day: string;
  month: string;
  year: string;
}): SadeSatiResult {
  const day = Number.parseInt(dob.day, 10);
  const month = Number.parseInt(dob.month, 10);
  const year = Number.parseInt(dob.year, 10);
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    return notActive("Unknown");
  }

  // Approximate moon sign from birth month+day (simplified)
  const dayOfYear = Math.floor(
    (new Date(year, month - 1, day).getTime() -
      new Date(year, 0, 0).getTime()) /
      86400000,
  );
  const signIndex = Math.floor(((dayOfYear + 10) % 365) / (365 / 12)) % 12;
  const moonSign = MOON_SIGNS[signIndex] ?? "Aries (Mesh)";

  // 2025: Saturn transiting Aquarius (index 10)
  // Phase 1 → Capricorn (9), Phase 2 → Aquarius (10), Phase 3 → Pisces (11)
  if (signIndex === 9) {
    return {
      phase: "phase1",
      phaseLabel: "Phase 1 — Relationships & Foundations",
      intensity: "moderate",
      startDate: "Mar 2023",
      endDate: "Jan 2026",
      moonSign,
      description:
        "Saturn transits the sign before your Moon Sign. Family bonds, emotional foundations, and close relationships are being tested and strengthened.",
      remedies: [
        "Chant 'Om Sham Shanicharaya Namah' 108 times daily",
        "Visit Hanuman temple on Saturdays, offer sesame oil",
        "Strengthen bonds with parents and elders",
      ],
    };
  }
  if (signIndex === 10) {
    return {
      phase: "phase2",
      phaseLabel: "Phase 2 — Identity & Inner Transformation",
      intensity: "high",
      startDate: "Jan 2026",
      endDate: "Mar 2028",
      moonSign,
      description:
        "This is the peak of Sade Sati. Saturn sits directly on your Moon Sign, triggering deep emotional shifts, identity questioning, and profound inner growth.",
      remedies: [
        "Wear an iron ring or black horseshoe ring (consult astrologer before Blue Sapphire)",
        "Practice daily meditation and pranayama to manage anxiety",
        "Donate to the elderly, disabled, or underprivileged every Saturday",
      ],
    };
  }
  if (signIndex === 11) {
    return {
      phase: "phase3",
      phaseLabel: "Phase 3 — Career & Harvest of Growth",
      intensity: "moderate",
      startDate: "Mar 2028",
      endDate: "Jan 2031",
      moonSign,
      description:
        "Saturn moves past your Moon Sign. Career, public reputation, and long-term ambitions come into focus. Rewards from hard work begin to materialise.",
      remedies: [
        "Channel energy into disciplined daily routine and new skill-building",
        "Light sesame oil lamps at Saturn temples on Saturdays",
        "Avoid new risky ventures; consolidate and complete existing work",
      ],
    };
  }
  return notActive(moonSign);
}

function notActive(moonSign: string): SadeSatiResult {
  return {
    phase: "not-active",
    phaseLabel: "Sade Sati Not Currently Active",
    intensity: "low",
    startDate: "—",
    endDate: "—",
    moonSign,
    description:
      "You are not currently undergoing Sade Sati. Saturn is not transiting your Moon Sign or adjacent signs at this time. Keep maintaining spiritual practices for continued wellbeing.",
    remedies: [
      "Recite Shani Chalisa on Saturdays for continued protection",
      "Donate black sesame seeds to the needy on Saturdays",
      "Maintain a regular spiritual practice for sustained wellbeing",
    ],
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormField({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="text-xs font-heading font-semibold uppercase tracking-wider"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

const inputStyle = {
  background: "oklch(0.20 0.05 24)",
  border: "1px solid oklch(0.78 0.14 75 / 0.22)",
  color: "oklch(0.88 0.04 75)",
};

const selectStyle = {
  ...inputStyle,
  appearance: "none" as const,
};

function SelectInput({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none transition-colors cursor-pointer"
      style={selectStyle}
    >
      {children}
    </select>
  );
}

function InfoSection({
  title,
  icon,
  children,
}: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 border"
      style={{
        background: "oklch(0.20 0.05 24)",
        borderColor: "oklch(0.78 0.14 75 / 0.14)",
      }}
    >
      <h2
        className="font-heading text-lg font-bold flex items-center gap-2 mb-3"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        <span>{icon}</span> {title}
      </h2>
      <div
        className="font-body text-sm leading-relaxed space-y-3"
        style={{ color: "oklch(0.72 0.04 60)" }}
      >
        {children}
      </div>
    </div>
  );
}

function PhaseCard({
  phase,
  title,
  duration,
  focus,
  description,
  intensity,
}: {
  phase: string;
  title: string;
  duration: string;
  focus: string;
  description: string;
  intensity: "moderate" | "high" | "mild";
}) {
  const intensityColors: Record<string, { bg: string; text: string }> = {
    mild: { bg: "oklch(0.35 0.08 140 / 0.20)", text: "oklch(0.65 0.14 140)" },
    moderate: { bg: "oklch(0.35 0.10 75 / 0.20)", text: "oklch(0.78 0.14 75)" },
    high: { bg: "oklch(0.35 0.12 25 / 0.20)", text: "oklch(0.70 0.18 30)" },
  };
  const ic = intensityColors[intensity];
  return (
    <div
      className="rounded-xl p-5 border"
      style={{
        background: "oklch(0.22 0.06 25)",
        borderColor: "oklch(0.78 0.14 75 / 0.16)",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <span
            className="text-xs font-heading font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.55 0.06 50)" }}
          >
            {phase}
          </span>
          <h3
            className="font-heading font-bold text-base mt-0.5"
            style={{ color: "oklch(0.88 0.04 75)" }}
          >
            {title}
          </h3>
        </div>
        <span
          className="flex-shrink-0 text-xs font-heading font-semibold px-2 py-1 rounded-full"
          style={{ background: ic.bg, color: ic.text }}
        >
          {intensity === "high"
            ? "Peak"
            : intensity === "moderate"
              ? "Moderate"
              : "Mild"}
        </span>
      </div>
      <p
        className="text-xs font-heading mb-2"
        style={{ color: "oklch(0.65 0.12 60)" }}
      >
        ⏱ {duration} · Focus: {focus}
      </p>
      <p
        className="text-sm font-body leading-relaxed"
        style={{ color: "oklch(0.70 0.04 60)" }}
      >
        {description}
      </p>
    </div>
  );
}

function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.q ?? null);
  return (
    <div className="space-y-3">
      {items.map((item, itemIdx) => {
        const isOpen = open === item.q;
        return (
          <div
            key={item.q}
            className="rounded-xl border overflow-hidden transition-all duration-200"
            style={{
              background: isOpen
                ? "oklch(0.24 0.06 26)"
                : "oklch(0.20 0.05 24)",
              borderColor: isOpen
                ? "oklch(0.78 0.14 75 / 0.30)"
                : "oklch(0.78 0.14 75 / 0.12)",
            }}
            data-ocid="sade-sati.faq_item"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.q)}
              className="w-full flex items-start gap-3 p-4 text-left"
              aria-expanded={isOpen}
              data-ocid="sade-sati.faq_toggle"
            >
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.15)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                {itemIdx + 1}
              </span>
              <p
                className="flex-1 text-sm font-heading font-medium pr-2 leading-snug"
                style={{ color: "oklch(0.88 0.04 75)" }}
              >
                {item.q}
              </p>
              {isOpen ? (
                <ChevronDown
                  className="flex-shrink-0 h-4 w-4 mt-0.5"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                />
              ) : (
                <ChevronRight
                  className="flex-shrink-0 h-4 w-4 mt-0.5"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                />
              )}
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pl-[52px]">
                <p
                  className="text-sm font-body leading-relaxed"
                  style={{ color: "oklch(0.72 0.04 60)" }}
                >
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
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
const years = Array.from({ length: 100 }, (_, i) =>
  String(new Date().getFullYear() - i),
);
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const seconds = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

const phaseColors: Record<SadeSatiResult["phase"], string> = {
  phase1: "oklch(0.68 0.20 48)",
  phase2: "oklch(0.60 0.18 30)",
  phase3: "oklch(0.65 0.14 140)",
  "not-active": "oklch(0.65 0.12 200)",
};

const phaseIcons: Record<SadeSatiResult["phase"], string> = {
  phase1: "🌒",
  phase2: "🌕",
  phase3: "🌖",
  "not-active": "⭐",
};

const intensityLabel: Record<SadeSatiResult["intensity"], string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High — Peak Phase",
};

const faqItems = [
  {
    q: "How to calculate your Sade Sati period?",
    a: "To calculate your Sade Sati, you need your Moon sign from your birth chart. Then check Saturn's current position — when it transits through the sign before your Moon sign, your Moon sign itself, and the sign after, that 7.5-year cycle is your Sade Sati. Each sign lasts roughly 2.5 years.",
  },
  {
    q: "Which rashi has Sade Sati now (2025)?",
    a: "As of 2025, Saturn is transiting Aquarius. This means Capricorn (Phase 1), Aquarius (Phase 2 — peak), and Pisces (Phase 3) Moon signs are currently experiencing Sade Sati. Capricorn and Aquarius Moon signs may find this somewhat more manageable as Saturn rules these signs.",
  },
  {
    q: "What happens in the first 2.5 years of Sade Sati?",
    a: "The first 2.5 years typically bring changes in relationships, family dynamics, and emotional foundations. You may take on more family responsibilities, experience shifts in close friendships, or question your emotional support system. This phase tests your emotional maturity and builds inner resilience.",
  },
  {
    q: "Which rashi is most affected by Sade Sati?",
    a: "Currently Aquarius Moon signs are in the peak second phase, which is typically the most intense period. However, experience varies by individual chart. Aries and Leo Moon signs may feel Saturn's energy more acutely due to tension with their ruling planets (Mars and Sun respectively).",
  },
  {
    q: "How many times does Sade Sati come in a lifetime?",
    a: "Most people experience Sade Sati two to three times in their lifetime. Saturn takes approximately 29.5 years to complete one full zodiac cycle. So if you live to 90, you could experience it up to three times — each occurrence bringing its own unique lessons suited to that phase of your life.",
  },
];

export default function SadeSatiCalculator() {
  const [form, setForm] = useState<CalculatorFormData>({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    tob: { hour: "", minute: "", second: "", unknown: false },
    placeOfBirth: "",
  });
  const [result, setResult] = useState<SadeSatiResult | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const { exportToPdf } = usePdfExport();

  const update = <K extends keyof CalculatorFormData>(
    key: K,
    value: CalculatorFormData[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateDob = (field: keyof CalculatorFormData["dob"], value: string) =>
    setForm((prev) => ({ ...prev, dob: { ...prev.dob, [field]: value } }));

  const updateTob = (
    field: keyof CalculatorFormData["tob"],
    value: string | boolean,
  ) => setForm((prev) => ({ ...prev, tob: { ...prev.tob, [field]: value } }));

  const validate = () => {
    const e: Partial<Record<string, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.gender) e.gender = "Please select gender";
    if (!form.dob.day || !form.dob.month || !form.dob.year)
      e.dob = "Complete date of birth required";
    if (!form.tob.unknown && (!form.tob.hour || !form.tob.minute))
      e.tob = "Please enter time or check 'I don't know'";
    if (!form.placeOfBirth.trim()) e.place = "Place of birth is required";
    return e;
  };

  const handleCalculate = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setResult(computeSadeSati(form.dob));
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.06 22) 0%, oklch(0.14 0.04 20) 100%)",
      }}
      data-ocid="sade-sati-calculator-page"
    >
      <div className="container mx-auto max-w-3xl space-y-8">
        {/* ── Page Header ── */}
        <div className="text-center space-y-2">
          <div className="text-5xl mb-2">🪐</div>
          <h1
            className="font-heading text-3xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Shani Sade Sati Calculator
          </h1>
          <p
            className="font-body text-sm max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            Discover if you're in Saturn's 7.5-year transformative cycle, which
            phase you're in, and how to navigate it with wisdom.
          </p>
        </div>

        {/* ── Calculator Form ── */}
        <div
          className="rounded-2xl p-6 border space-y-5"
          style={{
            background: "oklch(0.20 0.05 24)",
            borderColor: "oklch(0.78 0.14 75 / 0.20)",
          }}
          data-ocid="sade-sati.form"
        >
          <h2
            className="font-heading text-base font-bold"
            style={{ color: "oklch(0.88 0.04 75)" }}
          >
            Calculate your Shani Sade Sati here
          </h2>

          {/* Name */}
          <FormField label="Name *">
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none"
              style={inputStyle}
              data-ocid="sade-sati.input_name"
            />
            {errors.name && (
              <p className="text-xs" style={{ color: "oklch(0.65 0.18 30)" }}>
                {errors.name}
              </p>
            )}
          </FormField>

          {/* Gender */}
          <FormField label="Gender *">
            <SelectInput
              value={form.gender}
              onChange={(v) => update("gender", v)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </SelectInput>
            {errors.gender && (
              <p className="text-xs" style={{ color: "oklch(0.65 0.18 30)" }}>
                {errors.gender}
              </p>
            )}
          </FormField>

          {/* Date of Birth */}
          <FormField label="Date of Birth *">
            <div className="grid grid-cols-3 gap-2">
              <SelectInput
                value={form.dob.day}
                onChange={(v) => updateDob("day", v)}
              >
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </SelectInput>
              <SelectInput
                value={form.dob.month}
                onChange={(v) => updateDob("month", v)}
              >
                <option value="">Month</option>
                {months.map((m, i) => (
                  <option key={m} value={String(i + 1)}>
                    {m}
                  </option>
                ))}
              </SelectInput>
              <SelectInput
                value={form.dob.year}
                onChange={(v) => updateDob("year", v)}
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </SelectInput>
            </div>
            {errors.dob && (
              <p className="text-xs" style={{ color: "oklch(0.65 0.18 30)" }}>
                {errors.dob}
              </p>
            )}
          </FormField>

          {/* Time of Birth */}
          <FormField label="Time of Birth *">
            <label
              className="flex items-center gap-2 mb-2 cursor-pointer"
              data-ocid="sade-sati.tob_unknown"
            >
              <input
                type="checkbox"
                checked={form.tob.unknown}
                onChange={(e) => updateTob("unknown", e.target.checked)}
                className="w-4 h-4 rounded accent-amber-500"
              />
              <span
                className="text-sm font-body"
                style={{ color: "oklch(0.72 0.04 60)" }}
              >
                I don't know my time of birth
              </span>
            </label>
            {!form.tob.unknown && (
              <div className="grid grid-cols-3 gap-2">
                <SelectInput
                  value={form.tob.hour}
                  onChange={(v) => updateTob("hour", v)}
                >
                  <option value="">Hour</option>
                  {hours.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </SelectInput>
                <SelectInput
                  value={form.tob.minute}
                  onChange={(v) => updateTob("minute", v)}
                >
                  <option value="">Minute</option>
                  {minutes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </SelectInput>
                <SelectInput
                  value={form.tob.second}
                  onChange={(v) => updateTob("second", v)}
                >
                  <option value="">Second</option>
                  {seconds.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </SelectInput>
              </div>
            )}
            {errors.tob && (
              <p className="text-xs" style={{ color: "oklch(0.65 0.18 30)" }}>
                {errors.tob}
              </p>
            )}
          </FormField>

          {/* Place of Birth */}
          <FormField label="Place of Birth *">
            <input
              type="text"
              value={form.placeOfBirth}
              onChange={(e) => update("placeOfBirth", e.target.value)}
              placeholder="Enter your birth place"
              className="w-full px-3 py-2.5 rounded-xl text-sm font-body outline-none"
              style={inputStyle}
              data-ocid="sade-sati.input_place"
            />
            {errors.place && (
              <p className="text-xs" style={{ color: "oklch(0.65 0.18 30)" }}>
                {errors.place}
              </p>
            )}
          </FormField>

          {/* Calculate Button */}
          <button
            type="button"
            onClick={handleCalculate}
            className="w-full py-3 rounded-xl font-heading font-bold text-sm tracking-wide transition-all hover:opacity-90 active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="sade-sati.calculate_btn"
          >
            🪐 Calculate Sade Sati
          </button>
        </div>

        {/* ── Inline Result ── */}
        {result && (
          <div
            id="sade-sati-results"
            className="rounded-2xl p-6 border space-y-5"
            style={{
              background: "oklch(0.22 0.07 26)",
              borderColor: `${phaseColors[result.phase]} / 0.35`,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            data-ocid="sade-sati.result"
          >
            {/* Header */}
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${phaseColors[result.phase]} / 0.12` }}
              >
                {phaseIcons[result.phase]}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-heading uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.55 0.06 50)" }}
                >
                  Sade Sati Status for {form.name}
                </p>
                <h3
                  className="font-heading text-xl font-bold leading-snug"
                  style={{ color: phaseColors[result.phase] }}
                >
                  {result.phaseLabel}
                </h3>
                <p
                  className="text-xs font-body mt-1"
                  style={{ color: "oklch(0.65 0.06 60)" }}
                >
                  Moon Sign:{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {result.moonSign}
                  </span>
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Intensity", value: intensityLabel[result.intensity] },
                { label: "Phase Start", value: result.startDate },
                { label: "Phase End", value: result.endDate },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-3 text-center"
                  style={{
                    background: "oklch(0.18 0.05 22)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                  }}
                >
                  <p
                    className="text-xs font-heading uppercase tracking-wide mb-1"
                    style={{ color: "oklch(0.55 0.06 50)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm font-heading font-bold"
                    style={{ color: "oklch(0.88 0.04 75)" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p
              className="text-sm font-body leading-relaxed"
              style={{ color: "oklch(0.72 0.04 60)" }}
            >
              {result.description}
            </p>

            {/* Top 3 Remedies */}
            <div>
              <h4
                className="font-heading text-sm font-bold mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ✨ Top 3 Recommended Remedies
              </h4>
              <div className="space-y-2">
                {result.remedies.map((remedy, remedyIdx) => (
                  <div key={remedy} className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{
                        background: "oklch(0.68 0.20 48 / 0.18)",
                        color: "oklch(0.78 0.14 75)",
                      }}
                    >
                      {remedyIdx + 1}
                    </span>
                    <p
                      className="text-sm font-body"
                      style={{ color: "oklch(0.75 0.04 65)" }}
                    >
                      {remedy}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/astrologer"
                className="flex-1 py-2.5 rounded-xl font-heading font-semibold text-sm text-center transition-all hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
                data-ocid="sade-sati.cta_talk"
              >
                📞 Talk to Astrologer
              </a>
              <a
                href="/astrologer"
                className="flex-1 py-2.5 rounded-xl font-heading font-semibold text-sm text-center transition-all hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.30)",
                }}
                data-ocid="sade-sati.cta_chat"
              >
                💬 Chat with Astrologer
              </a>
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "sade-sati-results",
                    "sade-sati-result",
                    "Shani Sade Sati Result",
                  )
                }
                className="flex-1 py-2.5 rounded-xl font-heading font-semibold text-sm text-center transition-all hover:opacity-90"
                style={{ background: "oklch(0.78 0.14 75)", color: "#1a0a00" }}
                data-ocid="sade-sati.export_pdf_button"
              >
                Export as PDF
              </button>
            </div>
          </div>
        )}

        {/* ── Informational Sections ── */}

        {/* Intro paragraph */}
        <div
          className="font-body text-sm leading-relaxed"
          style={{ color: "oklch(0.65 0.06 60)" }}
        >
          <p>
            If you've been wondering why certain years feel heavier — like
            nothing goes your way — Sade Sati might be the reason. This 7.5-year
            Saturn cycle brings deep lessons, delays, and emotional growth. By
            knowing exactly when it starts and ends, you can navigate this
            period with clarity and strength.
          </p>
        </div>

        <InfoSection title="What is Sade Sati Dosha?" icon="🪐">
          <p>
            Sade Sati isn't just some distant astrology term — it's a real,
            personal phase that shapes your life deeply. It starts when Saturn
            travels through your Moon sign and the signs just before and after
            it, lasting about 7.5 years. But don't think of it as only tough
            times. Saturn acts like a strict but wise teacher who's there to
            help you grow.
          </p>
          <p>
            Despite its reputation, Sade Sati isn't a curse. It's more like the
            universe's way of pushing you toward growth, resilience, and
            realigning with your true purpose. Because everyone's birth chart is
            unique, how this period plays out depends on your own cosmic
            blueprint.
          </p>
        </InfoSection>

        <InfoSection title="What is the Shani Sade Sati Period?" icon="⏳">
          <p>
            Shani Sade Sati is a cosmic phase lasting about 7.5 years. It
            happens when Saturn moves through the zodiac sign just before your
            Moon sign, your Moon sign itself, and the one right after. Since
            Saturn spends roughly 2.5 years in each sign, this journey becomes a
            major period of change and growth.
          </p>
          <p>
            This isn't just a random occurrence — it's part of Saturn's slow,
            steady 29.5-year cycle around the zodiac. That's why many people
            experience Sade Sati two or even three times in their lifetime, each
            time bringing its own unique lessons suited to that phase of life.
          </p>
        </InfoSection>

        <InfoSection title="Why is Sade Sati Duration 7.5 Years?" icon="🌳">
          <p>
            Saturn's journey through the zodiac takes about 29.5 years to
            complete one full circle, spending around 2.5 years in each sign.
            Sade Sati covers three signs — the one before your Moon sign, your
            Moon sign, and the one after — making it a 7.5-year period of deep
            transformation.
          </p>
          <p>
            This slow, steady pace isn't by chance. Saturn, often called the
            cosmic teacher, moves deliberately because true growth doesn't
            happen overnight. It's like planting a banyan tree — you don't see
            the roots, but they're growing strong and steady beneath the
            surface, preparing you for real, lasting change. During these
            phases, Saturn touches different areas: first your relationships,
            then your inner self, and finally your career and legacy.
          </p>
        </InfoSection>

        {/* Phases */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.20 0.05 24)",
            borderColor: "oklch(0.78 0.14 75 / 0.14)",
          }}
        >
          <h2
            className="font-heading text-lg font-bold flex items-center gap-2 mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🌙 Phases of Shani Sade Sati
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-5"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            Sade Sati comes in three distinct phases, each lasting around 2.5
            years — like chapters in a powerful story unfolding in your life.
            Every phase brings its own mix of challenges, lessons, and chances
            to grow.
          </p>
          <div className="space-y-4">
            <PhaseCard
              phase="Phase 1"
              title="Relationships & Emotional Foundations"
              duration="~2.5 years"
              focus="Family, Close Relationships"
              description="Saturn moves into the sign before your Moon sign. This period stirs up your emotions, bringing family ties, close relationships, and your sense of security into sharper focus. You might notice subtle changes in how you connect with loved ones. Some friendships may drift away while others grow stronger."
              intensity="moderate"
            />
            <PhaseCard
              phase="Phase 2 — Peak"
              title="Identity & Inner Transformation"
              duration="~2.5 years"
              focus="Emotions, Mindset, Self-identity"
              description="Saturn steps into your Moon sign — the toughest part of the cycle. Now Saturn isn't just passing by; it's directly tapping into your emotions and sense of who you are. Things that once seemed important may lose their meaning. You may question beliefs or habits you've followed for years. Stay open, and you'll emerge wiser and stronger."
              intensity="high"
            />
            <PhaseCard
              phase="Phase 3"
              title="Career, Reputation & Harvest"
              duration="~2.5 years"
              focus="Career, Public Life, Long-term Goals"
              description="Saturn moves past your Moon sign. The focus shifts outward — career, public reputation, and long-term ambitions. By this time, you've done substantial inner work. Now Saturn watches how you translate that inner transformation into real-life actions. Rewards for hard work begin to materialise. It's Saturn's way of saying: you've earned this."
              intensity="mild"
            />
          </div>
        </div>

        {/* Effects */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.20 0.05 24)",
            borderColor: "oklch(0.78 0.14 75 / 0.14)",
          }}
        >
          <h2
            className="font-heading text-lg font-bold flex items-center gap-2 mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ⚖️ Effects of Sade Sati
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "oklch(0.22 0.06 25)",
                borderColor: "oklch(0.65 0.14 140 / 0.25)",
              }}
            >
              <h3
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.65 0.14 140)" }}
              >
                ✅ Positive Effects
              </h3>
              <ul
                className="space-y-2 font-body text-sm"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                {[
                  "Career advancement through disciplined effort — not luck",
                  "Spiritual awakening and deeper self-reflection",
                  "Deeper, more meaningful friendships (shallow ones fade)",
                  "Long-term success through steady, consistent work",
                  "Greater emotional resilience and inner strength",
                  "Drawn to meditation, Vedanta, or life's bigger purpose",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "oklch(0.65 0.14 140)" }}
                    >
                      ✦
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "oklch(0.22 0.06 25)",
                borderColor: "oklch(0.60 0.18 30 / 0.25)",
              }}
            >
              <h3
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.70 0.18 30)" }}
              >
                ⚠️ Challenging Effects
              </h3>
              <ul
                className="space-y-2 font-body text-sm"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                {[
                  "Progress feels slow — plans delayed, approvals take time",
                  "Financial strain or unexpected expenses",
                  "Physical fatigue, stress-related health concerns",
                  "Mood swings and anxiety (especially Phase 2)",
                  "Relationship tensions or distance from loved ones",
                  "Feeling emotionally burdened or misunderstood",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "oklch(0.70 0.18 30)" }}
                    >
                      ✦
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Rashis affected */}
        <InfoSection
          title="Which Rashis Are Affected by Saturn? (2025)"
          icon="♄"
        >
          <p>
            In 2025, Saturn is in Aquarius, which means if your Moon sign is{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              Capricorn, Aquarius, or Pisces
            </strong>
            , you are in the middle of Sade Sati. Capricorn and Aquarius are
            ruled by Saturn itself, so those Moon signs may experience this
            phase as more manageable — like a strict but fair teacher they
            already know.
          </p>
          <p>
            If you have an{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              Aries or Leo Moon sign
            </strong>
            , Saturn's influence may feel tougher when it eventually arrives, as
            its energy clashes with ruling planets Mars (Aries) and Sun (Leo).
            But this doesn't mean your journey will be all struggles — it means
            you need to be a bit more mindful and proactive with remedies.
          </p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { sign: "Capricorn ♑", phase: "Phase 1", status: "Active" },
              {
                sign: "Aquarius ♒",
                phase: "Phase 2 — Peak",
                status: "Active",
              },
              { sign: "Pisces ♓", phase: "Phase 3", status: "Active" },
            ].map(({ sign, phase, status }) => (
              <div
                key={sign}
                className="rounded-xl p-3 text-center"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.18)",
                }}
              >
                <p
                  className="font-heading text-sm font-bold"
                  style={{ color: "oklch(0.88 0.04 75)" }}
                >
                  {sign}
                </p>
                <p
                  className="text-xs font-body mt-1"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  {phase}
                </p>
                <p
                  className="text-xs font-heading font-semibold mt-1"
                  style={{ color: "oklch(0.65 0.14 140)" }}
                >
                  {status}
                </p>
              </div>
            ))}
          </div>
        </InfoSection>

        {/* Remedies */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.20 0.05 24)",
            borderColor: "oklch(0.78 0.14 75 / 0.14)",
          }}
        >
          <h2
            className="font-heading text-lg font-bold flex items-center gap-2 mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🕯️ Remedies for Shani Sade Sati
          </h2>
          <div className="space-y-3">
            {[
              {
                icon: "💎",
                title: "Blue Sapphire (Neelam)",
                desc: "A powerful gemstone linked to Saturn — but not a one-size-fits-all solution. It can magnify both good and bad effects. Always consult a trusted astrologer before wearing. Safer alternatives include iron rings or black horseshoe rings, which connect you to Saturn's energy more gently.",
              },
              {
                icon: "🙏",
                title: "Mantra Chanting",
                desc: 'Chant "Om Sham Shanicharaya Namah" 108 times daily. Many find it genuinely brings peace amid chaos — like tuning your inner radio to a frequency where Saturn\'s energy feels less heavy and more supportive.',
              },
              {
                icon: "❤️",
                title: "Seva & Charity",
                desc: "Help the elderly, disabled, or those in need. Whether it's volunteering at an old-age home, donating to a local charity, or lending a hand to a neighbor — these acts of genuine kindness generate positive karma that Saturn rewards.",
              },
              {
                icon: "⏰",
                title: "Discipline & Routine",
                desc: "Saturn loves structure. A steady routine — regular sleep, balanced meals, daily exercise, and mindful habits — keeps your body strong and your mind grounded through the ups and downs of this phase.",
              },
              {
                icon: "🛕",
                title: "Saturn Temples on Saturdays",
                desc: "Visit Saturn temples on Saturdays and light sesame oil lamps. This simple, time-honored practice is reported by many to bring a sense of centeredness and peace during challenging Sade Sati periods.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p
                    className="font-heading font-bold text-sm mb-1"
                    style={{ color: "oklch(0.88 0.04 75)" }}
                  >
                    {title}
                  </p>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: "oklch(0.70 0.04 60)" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.20 0.05 24)",
            borderColor: "oklch(0.78 0.14 75 / 0.14)",
          }}
        >
          <h2
            className="font-heading text-lg font-bold flex items-center gap-2 mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📋 Do's and Don'ts During Sade Sati
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "oklch(0.22 0.06 25)",
                borderColor: "oklch(0.60 0.18 30 / 0.22)",
              }}
            >
              <h3
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.70 0.18 30)" }}
              >
                🚫 Avoid These
              </h3>
              <ul
                className="space-y-2 font-body text-sm"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                {[
                  "Pause major decisions — especially in Phase 2 (marriage, job changes, big investments)",
                  "Don't rely solely on your own judgment — lean on trusted advisors and mentors",
                  "Don't neglect your health — stress can accumulate; rest and eat well",
                  "Avoid starting multiple new ventures — finish what you've started first",
                  "Don't fall into negative thought patterns — protect your mental state",
                  "Don't isolate yourself — stay connected with family and close friends",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="flex-shrink-0"
                      style={{ color: "oklch(0.70 0.18 30)" }}
                    >
                      ✗
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "oklch(0.22 0.06 25)",
                borderColor: "oklch(0.65 0.14 140 / 0.22)",
              }}
            >
              <h3
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.65 0.14 140)" }}
              >
                ✅ Embrace These
              </h3>
              <ul
                className="space-y-2 font-body text-sm"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                {[
                  "Reflect and go inward — use meditation, yoga, or pranayama for self-discovery",
                  "Strengthen your spiritual side — connect deeply with mindfulness and traditional practices",
                  "Build practical skills — learn something new, refine your craft, commit to routines",
                  "Nurture close relationships — lean on family and trusted friends for support",
                  "Practice patience — progress may feel slow, but steady effort brings long-term rewards",
                  "Give back — do seva or charitable acts; it uplifts others and brings deep meaning",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="flex-shrink-0"
                      style={{ color: "oklch(0.65 0.14 140)" }}
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <InfoSection title="Conclusion" icon="🌟">
          <p>
            Using a Shani Sade Sati calculator to understand where you are in
            this 7.5-year journey gives you clarity and a sense of direction.
            While it might feel heavy at times, each phase has something to
            teach you — and the lessons you learn can shape a much stronger,
            wiser version of yourself.
          </p>
          <p>
            The first phase may shake up your relationships or test your
            emotional strength. The second, when Saturn sits in your Moon sign,
            often feels the heaviest — but it's also when deep inner shifts take
            place. By the third phase, you'll likely start seeing those changes
            bear fruit, helping you move forward with new clarity, purpose, and
            direction.
          </p>
          <p>
            Being guided by someone who truly understands Vedic astrology makes
            all the difference. Consult an experienced astrologer on Spiritual
            Connect who can tailor advice specifically for your chart and
            present circumstances.
          </p>
        </InfoSection>

        {/* Discover More */}
        <div
          className="rounded-2xl p-6 border text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.07 26), oklch(0.20 0.06 30))",
            borderColor: "oklch(0.78 0.14 75 / 0.22)",
          }}
          data-ocid="sade-sati.discover_more"
        >
          <div className="text-4xl mb-3">✨</div>
          <h2
            className="font-heading text-xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Discover More About Yourself
          </h2>
          <p
            className="font-body text-sm mb-4 max-w-md mx-auto leading-relaxed"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            Ready to unlock deeper insights? Explore our personalized
            calculators that reveal hidden aspects of your personality and
            destiny.
          </p>

          <div
            className="rounded-xl p-4 mb-4 text-left"
            style={{
              background: "oklch(0.18 0.05 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.12)",
            }}
          >
            <p
              className="font-heading text-sm font-bold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🛕 Spiritual Connect Store
            </p>
            <p
              className="font-body text-xs leading-relaxed"
              style={{ color: "oklch(0.65 0.06 60)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting
              &amp; decor, Pooja essentials, love items, and zodiac collection
              to support your spiritual journey.
            </p>
          </div>

          <p
            className="font-body text-sm italic mb-4"
            style={{ color: "oklch(0.65 0.08 60)" }}
          >
            ✨ Plus Much More — Compatibility calculators, birth chart
            generators, and personality assessments await your discovery.
          </p>

          <a
            href="/calculator-index"
            className="inline-block px-6 py-2.5 rounded-xl font-heading font-bold text-sm transition-all hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="sade-sati.explore_calculators"
          >
            Explore All Calculators →
          </a>
        </div>

        {/* FAQs */}
        <div>
          <h2
            className="font-heading text-xl font-bold mb-4 flex items-center gap-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ❓ Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </div>
  );
}
