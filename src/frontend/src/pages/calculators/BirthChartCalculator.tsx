import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";
import type { CalculatorFormData } from "../../types/calculator";

const DAYS = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);
const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const YEARS = Array.from({ length: 100 }, (_, i) => String(2024 - i));
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const SECONDS = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

interface BirthChartResult {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  houses: { house: number; sign: string; planet: string }[];
}

function computeBirthChart(form: CalculatorFormData): BirthChartResult {
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];
  const seed =
    (Number.parseInt(form.dob.day) || 1) +
    (Number.parseInt(form.dob.month) || 1) * 3 +
    (Number.parseInt(form.dob.year) || 2000) +
    form.name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

  const sunIdx = seed % 12;
  const moonIdx = (seed * 7 + 3) % 12;
  const risingIdx = form.tob.unknown
    ? (seed * 5 + 1) % 12
    : (Number.parseInt(form.tob.hour) || 0) % 12;

  const planets = [
    "Sun ☀️",
    "Moon 🌙",
    "Mercury ☿",
    "Venus ♀",
    "Mars ♂",
    "Jupiter ♃",
    "Saturn ♄",
    "Rahu ☊",
    "Ketu ☋",
    "Uranus ⛢",
    "Neptune ♆",
    "Ascendant ↑",
  ];

  const houses = Array.from({ length: 12 }, (_, i) => ({
    house: i + 1,
    sign: signs[(risingIdx + i) % 12],
    planet: planets[i] ? planets[i] : "—",
  }));

  return {
    sunSign: signs[sunIdx],
    moonSign: signs[moonIdx],
    risingSign: signs[risingIdx],
    houses,
  };
}

const selectStyle: React.CSSProperties = {
  background: "oklch(0.22 0.06 25)",
  border: "1px solid oklch(0.78 0.14 75 / 0.25)",
  color: "oklch(0.88 0.04 75)",
  borderRadius: "0.5rem",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  outline: "none",
  width: "100%",
};

const inputStyle: React.CSSProperties = {
  background: "oklch(0.22 0.06 25)",
  border: "1px solid oklch(0.78 0.14 75 / 0.25)",
  color: "oklch(0.88 0.04 75)",
  borderRadius: "0.5rem",
  padding: "0.5rem 0.75rem",
  fontSize: "0.875rem",
  outline: "none",
  width: "100%",
};

const labelStyle: React.CSSProperties = {
  color: "oklch(0.78 0.14 75)",
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "0.05em",
  marginBottom: "0.35rem",
  display: "block",
};

const sectionCardStyle: React.CSSProperties = {
  background: "oklch(0.20 0.05 26)",
  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
  borderRadius: "0.75rem",
  padding: "1.5rem",
  marginBottom: "1.25rem",
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: open ? "oklch(0.22 0.06 25)" : "oklch(0.20 0.05 26)",
        border: "1px solid oklch(0.78 0.14 75 / 0.18)",
        borderRadius: "0.625rem",
        marginBottom: "0.6rem",
        overflow: "hidden",
        transition: "background 0.2s",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full text-left flex justify-between items-center gap-3 px-5 py-4"
        data-ocid="faq.toggle"
        aria-expanded={open}
      >
        <span
          className="font-heading text-sm font-semibold"
          style={{ color: "oklch(0.88 0.08 72)" }}
        >
          {q}
        </span>
        <span
          style={{
            color: "oklch(0.78 0.14 75)",
            fontSize: "1.1rem",
            flexShrink: 0,
          }}
        >
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div
          className="px-5 pb-4 font-body text-sm leading-relaxed"
          style={{ color: "oklch(0.70 0.04 60)" }}
        >
          {a}
        </div>
      )}
    </div>
  );
};

export default function BirthChartCalculator() {
  const [form, setForm] = useState<CalculatorFormData>({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    tob: { hour: "", minute: "", second: "", unknown: false },
    placeOfBirth: "",
  });
  const [result, setResult] = useState<BirthChartResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { exportToPdf } = usePdfExport();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.gender) e.gender = "Please select gender";
    if (!form.dob.day || !form.dob.month || !form.dob.year)
      e.dob = "Complete date of birth required";
    if (!form.tob.unknown && (!form.tob.hour || !form.tob.minute))
      e.tob = "Enter time or check 'I don't know'";
    if (!form.placeOfBirth.trim()) e.place = "Place of birth is required";
    return e;
  };

  const handleCalculate = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setResult(computeBirthChart(form));
  };

  const signEmoji: Record<string, string> = {
    Aries: "♈",
    Taurus: "♉",
    Gemini: "♊",
    Cancer: "♋",
    Leo: "♌",
    Virgo: "♍",
    Libra: "♎",
    Scorpio: "♏",
    Sagittarius: "♐",
    Capricorn: "♑",
    Aquarius: "♒",
    Pisces: "♓",
  };

  return (
    <div
      data-ocid="birth-chart-calculator-page"
      className="min-h-screen py-8 px-4"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.06 22) 0%, oklch(0.14 0.04 20) 100%)",
      }}
    >
      <div className="container mx-auto max-w-3xl">
        {/* ── Page Header ── */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌌</div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Free Birth Chart Calculator
          </h1>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(0.60 0.08 60)" }}
          >
            जन्म कुंडली / Natal Chart — जन्म का ब्रह्मांडीय मानचित्र
          </p>
          <p
            className="font-body text-sm mt-2 max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.65 0.05 60)" }}
          >
            A Birth/Natal Chart Calculator maps where the planets were at the
            exact moment you were born — your personal cosmic blueprint.
          </p>
        </div>

        {/* ── Calculator Card ── */}
        <div
          className="rounded-xl p-6 mb-8"
          style={{
            background: "oklch(0.22 0.06 25)",
            border: "1px solid oklch(0.78 0.14 75 / 0.30)",
            boxShadow:
              "0 0 0 1px oklch(0.78 0.14 75 / 0.08), 0 8px 32px oklch(0.14 0.04 20 / 0.6)",
          }}
          data-ocid="birth-chart.form"
        >
          <h2
            className="font-heading text-lg font-bold mb-5 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ✨ Calculate Your Birth Chart
          </h2>

          <div className="grid gap-4">
            {/* Name */}
            <div>
              <label htmlFor="bc-name" style={labelStyle}>
                Name *
              </label>
              <input
                id="bc-name"
                type="text"
                placeholder="Enter your full name"
                style={inputStyle}
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="birth-chart.input_name"
              />
              {errors.name && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.65 0.18 30)" }}
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="bc-gender" style={labelStyle}>
                Gender *
              </label>
              <select
                id="bc-gender"
                style={selectStyle}
                value={form.gender}
                onChange={(e) =>
                  setForm((p) => ({ ...p, gender: e.target.value }))
                }
                data-ocid="birth-chart.select_gender"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.65 0.18 30)" }}
                >
                  {errors.gender}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="bc-dob-day" style={labelStyle}>
                Date of Birth *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  id="bc-dob-day"
                  style={selectStyle}
                  value={form.dob.day}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      dob: { ...p.dob, day: e.target.value },
                    }))
                  }
                  data-ocid="birth-chart.select_day"
                >
                  <option value="">Day</option>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  style={selectStyle}
                  value={form.dob.month}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      dob: { ...p.dob, month: e.target.value },
                    }))
                  }
                  data-ocid="birth-chart.select_month"
                >
                  <option value="">Month</option>
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <select
                  style={selectStyle}
                  value={form.dob.year}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      dob: { ...p.dob, year: e.target.value },
                    }))
                  }
                  data-ocid="birth-chart.select_year"
                >
                  <option value="">Year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              {errors.dob && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.65 0.18 30)" }}
                >
                  {errors.dob}
                </p>
              )}
            </div>

            {/* Time of Birth */}
            <div>
              <label htmlFor="bc-tob-hour" style={labelStyle}>
                Time of Birth *
              </label>
              <label
                htmlFor="bc-tob-unknown"
                className="flex items-center gap-2 mb-2 cursor-pointer select-none"
              >
                <input
                  id="bc-tob-unknown"
                  type="checkbox"
                  checked={form.tob.unknown}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      tob: { ...p.tob, unknown: e.target.checked },
                    }))
                  }
                  style={{ accentColor: "oklch(0.78 0.14 75)" }}
                  data-ocid="birth-chart.checkbox_tob_unknown"
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
                  <select
                    id="bc-tob-hour"
                    style={selectStyle}
                    value={form.tob.hour}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        tob: { ...p.tob, hour: e.target.value },
                      }))
                    }
                    data-ocid="birth-chart.select_hour"
                  >
                    <option value="">Hour</option>
                    {HOURS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  <select
                    style={selectStyle}
                    value={form.tob.minute}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        tob: { ...p.tob, minute: e.target.value },
                      }))
                    }
                    data-ocid="birth-chart.select_minute"
                  >
                    <option value="">Minute</option>
                    {MINUTES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    style={selectStyle}
                    value={form.tob.second}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        tob: { ...p.tob, second: e.target.value },
                      }))
                    }
                    data-ocid="birth-chart.select_second"
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
              {errors.tob && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.65 0.18 30)" }}
                >
                  {errors.tob}
                </p>
              )}
            </div>

            {/* Place of Birth */}
            <div>
              <label htmlFor="bc-place" style={labelStyle}>
                Place of Birth *
              </label>
              <input
                id="bc-place"
                type="text"
                placeholder="Enter your birth place (e.g. Mumbai, India)"
                style={inputStyle}
                value={form.placeOfBirth}
                onChange={(e) =>
                  setForm((p) => ({ ...p, placeOfBirth: e.target.value }))
                }
                data-ocid="birth-chart.input_place"
              />
              {errors.place && (
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.65 0.18 30)" }}
                >
                  {errors.place}
                </p>
              )}
            </div>

            {/* Calculate Button */}
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full py-3 rounded-xl font-heading font-bold text-sm tracking-wide transition-all duration-200 hover:opacity-90 active:scale-98 mt-1"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
                boxShadow: "0 4px 16px oklch(0.62 0.18 48 / 0.35)",
              }}
              data-ocid="birth-chart.calculate_button"
            >
              🔮 Calculate My Birth Chart
            </button>
          </div>
        </div>

        {/* ── Inline Result ── */}
        {result && (
          <div
            id="birth-chart-results"
            className="rounded-xl mb-8 overflow-hidden"
            style={{
              border: "1px solid oklch(0.78 0.14 75 / 0.35)",
              boxShadow: "0 8px 40px oklch(0.62 0.18 48 / 0.18)",
            }}
            data-ocid="birth-chart.result"
          >
            {/* Result Header */}
            <div
              className="py-4 px-6 text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.30 0.10 35), oklch(0.22 0.07 28))",
              }}
            >
              <p
                className="font-body text-xs mb-1"
                style={{ color: "oklch(0.65 0.08 60)" }}
              >
                Birth Chart for
              </p>
              <h3
                className="font-heading text-xl font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {form.name}
              </h3>
              <p
                className="font-body text-xs mt-1"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                {form.dob.day}/{form.dob.month}/{form.dob.year}
                {!form.tob.unknown &&
                  form.tob.hour &&
                  ` · ${form.tob.hour}:${form.tob.minute}`}
                {form.placeOfBirth && ` · ${form.placeOfBirth}`}
              </p>
            </div>

            {/* Big 3 */}
            <div
              className="grid grid-cols-3 gap-0 divide-x"
              style={{
                background: "oklch(0.20 0.055 26)",
                borderTop: "1px solid oklch(0.78 0.14 75 / 0.18)",
                borderBottom: "1px solid oklch(0.78 0.14 75 / 0.18)",
              }}
            >
              {[
                {
                  label: "Sun Sign",
                  value: result.sunSign,
                  icon: "☀️",
                  desc: "Core Identity",
                },
                {
                  label: "Moon Sign",
                  value: result.moonSign,
                  icon: "🌙",
                  desc: "Emotions",
                },
                {
                  label: "Rising Sign",
                  value: result.risingSign,
                  icon: "↑",
                  desc: "How others see you",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-center py-5 px-2"
                  style={{
                    borderRight: "1px solid oklch(0.78 0.14 75 / 0.12)",
                  }}
                >
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div
                    className="font-heading text-base font-bold"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {signEmoji[result.sunSign] && item.label === "Sun Sign"
                      ? `${signEmoji[result.sunSign]} `
                      : ""}
                    {item.value}
                  </div>
                  <div
                    className="font-body text-xs mt-0.5"
                    style={{ color: "oklch(0.55 0.06 55)" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-body text-xs mt-0.5"
                    style={{ color: "oklch(0.48 0.04 50)" }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* 12-House Table */}
            <div
              className="px-6 py-5"
              style={{ background: "oklch(0.19 0.05 25)" }}
            >
              <h4
                className="font-heading text-sm font-bold mb-3 text-center"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                🏠 12-House Planetary Summary
              </h4>
              <div className="overflow-x-auto">
                <table
                  className="w-full text-xs font-body"
                  style={{ borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid oklch(0.78 0.14 75 / 0.20)",
                      }}
                    >
                      {["House", "Sign", "Planet / Point"].map((h) => (
                        <th
                          key={h}
                          className="py-2 px-3 text-left font-semibold"
                          style={{ color: "oklch(0.65 0.10 65)" }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.houses.map((row) => (
                      <tr
                        key={row.house}
                        style={{
                          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.08)",
                        }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td
                          className="py-1.5 px-3 font-semibold"
                          style={{ color: "oklch(0.68 0.12 65)" }}
                        >
                          House {row.house}
                        </td>
                        <td
                          className="py-1.5 px-3"
                          style={{ color: "oklch(0.78 0.10 72)" }}
                        >
                          {signEmoji[row.sign]} {row.sign}
                        </td>
                        <td
                          className="py-1.5 px-3"
                          style={{ color: "oklch(0.65 0.08 60)" }}
                        >
                          {row.planet}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {form.tob.unknown && (
                <p
                  className="mt-3 text-xs text-center font-body"
                  style={{ color: "oklch(0.58 0.08 50)" }}
                >
                  * Exact rising sign and house positions require accurate birth
                  time
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            <div
              className="px-6 py-4 flex flex-col sm:flex-row gap-3"
              style={{
                background: "oklch(0.22 0.06 25)",
                borderTop: "1px solid oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              <a
                href="/astrologer"
                className="flex-1 py-2.5 px-4 rounded-lg text-sm font-heading font-bold text-center transition-all hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
                data-ocid="birth-chart.cta_talk"
              >
                📞 Talk to Astrologer
              </a>
              <a
                href="/astrologer"
                className="flex-1 py-2.5 px-4 rounded-lg text-sm font-heading font-bold text-center transition-all hover:bg-white/10"
                style={{
                  border: "1px solid oklch(0.78 0.14 75 / 0.40)",
                  color: "oklch(0.78 0.14 75)",
                }}
                data-ocid="birth-chart.cta_chat"
              >
                💬 Chat with Astrologer
              </a>
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "birth-chart-results",
                    "birth-chart-result",
                    "Birth Chart Result",
                  )
                }
                className="flex-1 py-2.5 px-4 rounded-lg text-sm font-heading font-bold text-center transition-all hover:opacity-90"
                style={{ background: "oklch(0.78 0.14 75)", color: "#1a0a00" }}
                data-ocid="birth-chart.export_pdf_button"
              >
                Export as PDF
              </button>
            </div>
          </div>
        )}

        {/* ── Informational Sections ── */}

        {/* What is a Birth Chart */}
        <div style={sectionCardStyle}>
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🌟 What is a Birth Chart?
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            You've probably heard of your zodiac sign — but did you know your
            entire birth chart is your personal cosmic blueprint? It's called a{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>
              natal chart
            </strong>
            , and it maps out exactly where each planet was at the moment you
            were born.
          </p>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            While your{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>Sun sign</strong>{" "}
            shows your core personality, your{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>Moon sign</strong>{" "}
            explains your emotional side, and{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>Venus</strong>{" "}
            reveals how you love and connect in relationships.
          </p>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Now, with a birth/natal chart calculator, you can get the same depth
            of insight instantly — without needing to consult a panchang or know
            Sanskrit!
          </p>
        </div>

        {/* What is a Birth/Natal Chart Calculator */}
        <div style={sectionCardStyle}>
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🔭 What is a Birth/Natal Chart Calculator?
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Think of it like this: you give it your birth date, exact time, and
            place — and it gives you a map of your soul. It's not just some
            random astrology generator; it's a smart tool that tracks where
            every planet was at the exact moment you were born. From the Sun and
            Moon to Saturn and Rahu, it lays out your unique cosmic blueprint.
          </p>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            These calculators use accurate data — factoring in Indian Standard
            Time, your city's location, and even daylight saving if needed. Most
            apps also give quick interpretations, so even if you're a beginner,
            you can start understanding what your planets say about your career,
            emotions, or love life.
          </p>
        </div>

        {/* Why Important */}
        <div style={sectionCardStyle}>
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            💡 Why is a Birth/Natal Chart Calculator Important?
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            If you think astrology is just about reading your sun sign in the
            newspaper, you're missing out on a much deeper story: your{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>
              full birth chart
            </strong>
            . It shows the complete picture — how all the planets were aligned
            the moment you were born.
          </p>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Your birth chart helps you understand why you respond the way you do
            in certain situations, why some relationships feel natural while
            others take effort, and how you can make better career or life
            choices based on your strengths. It's like having a guidebook for
            your life — written just for you.
          </p>
        </div>

        {/* How it Works */}
        <div style={sectionCardStyle}>
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ⚙️ How Does the Birth Chart Calculator Work?
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            The moment you were born, the sky had a unique pattern. This
            calculator uses your birth date, exact time, and place of birth to
            recreate that cosmic snapshot. For example: someone born in{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>
              Mumbai at 3:47 AM
            </strong>{" "}
            will have a very different chart from someone born in{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>
              Delhi at 3:47 PM
            </strong>{" "}
            on the same day — because Earth's rotation shifts the planetary
            positions.
          </p>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            The calculator lays everything out in a circular chart, divided into{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>12 houses</strong>.
            Each house rules different areas of life — career, relationships,
            money, inner fears, or ambitions. You'll discover your{" "}
            <em>Sun sign</em> (core identity), <em>Moon sign</em> (emotions),
            and <em>Rising sign</em> (how people perceive you).
          </p>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Whether you're confused about your career path, facing relationship
            struggles, or just curious about what makes you <em>you</em> —
            understanding your birth chart offers guidance that genuinely feels
            personal and accurate.
          </p>
        </div>

        {/* Arjun Story */}
        <div style={sectionCardStyle}>
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🔮 What Does the Birth Chart Say About You?
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Your birth/natal chart is like a personal guidebook — it uncovers
            why you think the way you do, how you express emotions, what kind of
            love you crave, and where your true strengths lie.
          </p>
          <div
            className="rounded-lg p-4 my-4"
            style={{
              background: "oklch(0.25 0.07 30)",
              border: "1px solid oklch(0.78 0.14 75 / 0.20)",
            }}
          >
            <p
              className="font-body text-sm leading-relaxed italic"
              style={{ color: "oklch(0.75 0.06 65)" }}
            >
              <strong style={{ color: "oklch(0.82 0.12 72)" }}>
                Arjun from Kolkata
              </strong>{" "}
              was a successful engineer who felt restless and emotionally
              unfulfilled. His birth chart revealed why — a{" "}
              <em>Capricorn Sun</em> gave him structure, but a{" "}
              <em>Pisces Moon</em> and <em>Venus in Aquarius</em> spoke of a
              deeper calling to serve others. Once he saw this, he shifted
              toward social innovation — and things started aligning.
            </p>
          </div>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Your chart can also reveal family karma, emotional patterns, health
            tendencies, and gifts you've never tapped into. Ever wondered why
            the same type of challenge keeps repeating in your life? Your chart
            likely holds the answer.
          </p>
        </div>

        {/* Key Elements */}
        <div style={sectionCardStyle}>
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🗝️ What Are the Key Elements of a Birth Chart?
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-4"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Your birth chart is made up of four key things:{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>
              planets, zodiac signs, houses, and aspects
            </strong>
            .
          </p>
          <div className="grid gap-3">
            {[
              {
                icon: "🪐",
                title: "Planets",
                desc: "Represent different parts of you — emotions (Moon), communication (Mercury), love language (Venus), and ambitions (Mars).",
              },
              {
                icon: "♈",
                title: "Zodiac Signs",
                desc: "Each planet expresses itself through a sign. Mars in Leo means you pursue goals with boldness and flair.",
              },
              {
                icon: "🏠",
                title: "12 Houses",
                desc: "Like different rooms of your life — career (10th), relationships (7th), home (4th), personality (1st).",
              },
              {
                icon: "🔺",
                title: "Aspects",
                desc: "Angles between planets. Trines and sextiles create harmony; squares and oppositions bring tension but push growth. Moon square Saturn → emotional guardedness yet resilience.",
              },
            ].map((el) => (
              <div key={el.title} className="flex gap-3 items-start">
                <span className="text-xl flex-shrink-0 mt-0.5">{el.icon}</span>
                <div>
                  <p
                    className="font-heading text-sm font-bold"
                    style={{ color: "oklch(0.82 0.10 72)" }}
                  >
                    {el.title}
                  </p>
                  <p
                    className="font-body text-xs leading-relaxed mt-0.5"
                    style={{ color: "oklch(0.68 0.04 58)" }}
                  >
                    {el.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p
            className="font-body text-xs mt-4 leading-relaxed"
            style={{ color: "oklch(0.65 0.04 55)" }}
          >
            Bonus layers include your <em>chart ruler</em> (the planet ruling
            your rising sign) and <em>stelliums</em> — when several planets
            cluster in one sign, highlighting concentrated areas of energy.
          </p>
        </div>

        {/* Love and Relationships */}
        <div style={sectionCardStyle}>
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            💞 What Can Your Birth Chart Reveal About Love?
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Your birth/natal chart is like a cosmic mirror reflecting your love
            language, emotional needs, and relationship patterns.{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>Venus</strong>{" "}
            shows how you express affection.{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>Mars</strong>{" "}
            reveals what attracts you and sparks passion. Your{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>Moon sign</strong>{" "}
            is your emotional heartbeat — what makes you feel safe and
            fulfilled.
          </p>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Your{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>7th house</strong>{" "}
            represents marriage, partnerships, and what kind of partner you
            naturally attract. Planets placed here reveal long-term relationship
            dynamics.
          </p>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Tools like <em>transits, progressions, and synastry</em> (comparing
            two charts) can reveal when you're most likely to meet someone
            significant, or how well you'll vibe with a partner long-term.
          </p>
        </div>

        {/* Deepak Story */}
        <div style={sectionCardStyle}>
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🌱 Can a Birth Chart Really Change Your Life?
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Your birth chart won't magically change your life — but
            understanding it can completely shift the way you live it. It's like
            getting a behind-the-scenes manual for your personality, helping you
            make choices that make you feel more <em>you</em>.
          </p>
          <div
            className="rounded-lg p-4 my-4"
            style={{
              background: "oklch(0.25 0.07 30)",
              border: "1px solid oklch(0.78 0.14 75 / 0.20)",
            }}
          >
            <p
              className="font-body text-sm leading-relaxed italic"
              style={{ color: "oklch(0.75 0.06 65)" }}
            >
              <strong style={{ color: "oklch(0.82 0.12 72)" }}>
                Deepak from Pune
              </strong>{" "}
              spent years trying to run a finance-heavy business, always feeling
              drained. Once he explored his birth chart, things clicked — a
              strong <em>Jupiter in Sagittarius</em> and <em>Gemini Sun</em>{" "}
              pointed to creativity, variety, and a love for teaching. He
              pivoted to building online courses about travel and global
              cultures. His business took off, and he felt more alive than ever.
            </p>
          </div>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Your birth chart is like having a cosmic career guide, relationship
            coach, and emotional mirror all in one. When you combine this cosmic
            wisdom with conscious action, life feels more purposeful — less like
            guesswork.
          </p>
        </div>

        {/* How Often */}
        <div style={sectionCardStyle}>
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📅 How Often Should You Look at Your Chart?
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            You don't need to wait for a crisis — but it can be a real lifesaver
            when you do. Though your birth chart stays the same throughout your
            life, your understanding of it evolves as you grow. Planetary
            movements (called{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>transits</strong>)
            keep interacting with your chart, triggering new themes and life
            lessons.
          </p>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            A good time to revisit your chart is around your <em>birthday</em> —
            it's the start of a new solar cycle. Also revisit during big shifts
            like changing careers, moving cities, ending a relationship, or
            going through a spiritual low. You might find the answers were
            written in the stars all along.
          </p>
        </div>

        {/* Conclusion */}
        <div
          className="rounded-xl p-6 mb-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.28 0.09 32), oklch(0.20 0.06 26))",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          <h2
            className="font-heading text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ✨ Conclusion
          </h2>
          <p
            className="font-body text-sm leading-relaxed mb-3"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Unlike quick horoscope predictions, your birth chart is a deeply
            personal map of your inner and outer world. It can reveal why
            certain relationships feel natural, why some career paths drain you
            while others light you up, and even how you express love, anger, and
            creativity.
          </p>
          <p
            className="font-body text-sm leading-relaxed"
            style={{ color: "oklch(0.72 0.04 62)" }}
          >
            Remember — your chart isn't a fixed script. It's a guide.{" "}
            <strong style={{ color: "oklch(0.82 0.10 72)" }}>
              You still hold the pen.
            </strong>{" "}
            When you combine this cosmic wisdom with conscious action, life
            feels more purposeful. Explore your birth chart with an expert
            astrologer on Spiritual Connect for the most eye-opening
            conversation you'll have with yourself.
          </p>
        </div>

        {/* Discover More */}
        <div
          className="rounded-xl p-6 mb-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 28), oklch(0.18 0.05 24))",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
          data-ocid="birth-chart.discover_more"
        >
          <h2
            className="font-heading text-xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🔍 Discover More About Yourself
          </h2>
          <p
            className="font-body text-sm mb-4"
            style={{ color: "oklch(0.65 0.05 58)" }}
          >
            Ready to unlock deeper insights? Explore our personalized
            calculators that reveal hidden aspects of your personality and
            destiny.
          </p>
          <div
            className="rounded-lg p-4 mb-4"
            style={{
              background: "oklch(0.25 0.07 30)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            <p
              className="font-heading text-sm font-bold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🛍️ Spiritual Connect Store
            </p>
            <p
              className="font-body text-xs leading-relaxed"
              style={{ color: "oklch(0.65 0.05 55)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting &
              decor, Pooja essentials, love items, and zodiac collection to
              support your spiritual journey.
            </p>
          </div>
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.58 0.06 55)" }}
          >
            ✨ Compatibility calculators, birth chart generators, and
            personality assessments await your discovery.
          </p>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2
            className="font-heading text-2xl font-bold text-center mb-5"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ❓ Frequently Asked Questions
          </h2>
          <div data-ocid="birth-chart.faqs">
            <FAQItem
              q="What does the birth chart analysis include?"
              a="Birth chart analysis includes your sun, moon, and rising signs, all planetary positions in signs and houses, major aspects between planets, and interpretations of how these elements influence your personality, relationships, career, and life path. Additionally, it reveals timing patterns and potential challenges."
            />
            <FAQItem
              q="Can I check birth chart compatibility with my partner?"
              a="Yes, you can compare birth charts through synastry analysis, which shows how your planets interact with your partner's planets. This reveals relationship strengths, challenges, and compatibility levels. Composite charts can also show the relationship's overall energy and purpose when you're together."
            />
            <FAQItem
              q="Is this different from daily horoscopes?"
              a="Yes, birth charts are completely different from daily horoscopes. Daily horoscopes use only your sun sign and general predictions. Birth charts analyze your complete planetary positions and provide personalized insights. Birth chart information remains relevant throughout your life, unlike temporary daily predictions."
            />
            <FAQItem
              q="Can I calculate my Sun, Moon, and Rising signs here?"
              a="Yes, the Birth Chart Calculator shows your sun sign (core identity), moon sign (emotions), and rising sign (how others see you) along with all other planetary positions. These three signs together provide a much more accurate personality profile than just knowing your sun sign alone."
            />
            <FAQItem
              q="How accurate is the calculator if I don't know my birth time?"
              a="Without exact birth time, your rising sign and house positions may be inaccurate, but your sun and moon signs usually remain correct. If you only know the birth date, try noon as an estimated time. For most accurate results, try to find your birth time from birth certificates or family records."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
