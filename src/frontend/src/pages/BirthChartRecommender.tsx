import { useState } from "react";

// ─── Rashi data ───────────────────────────────────────────────────────────────

interface RashiInfo {
  name: string;
  nameHi: string;
  english: string;
  mantra: string;
  gemstone: string;
  finger: string;
  metal: string;
  weight: string;
  chantDay: string;
  chantTime: string;
  chantCount: number;
  deity: string;
  color: string;
  element: string;
}

const RASHI_DATA: RashiInfo[] = [
  {
    name: "Mesha (Mesh)",
    nameHi: "मेष",
    english: "Aries",
    mantra: "Om Aim Hreem Kleem Chamundaye Viche",
    gemstone: "Red Coral",
    finger: "Ring Finger",
    metal: "Gold",
    weight: "3–9 Ratti",
    chantDay: "Tuesday",
    chantTime: "Morning",
    chantCount: 108,
    deity: "Mangal (Mars)",
    color: "Red",
    element: "Fire",
  },
  {
    name: "Vrishabha",
    nameHi: "वृषभ",
    english: "Taurus",
    mantra: "Om Shrim Hreem Kleem Shriye Namaha",
    gemstone: "Diamond / White Sapphire",
    finger: "Middle Finger",
    metal: "Silver",
    weight: "0.5–1 Carat",
    chantDay: "Friday",
    chantTime: "Morning or Evening",
    chantCount: 108,
    deity: "Shukra (Venus)",
    color: "White/Cream",
    element: "Earth",
  },
  {
    name: "Mithuna",
    nameHi: "मिथुन",
    english: "Gemini",
    mantra: "Om Aim Saraswatyai Namaha",
    gemstone: "Emerald",
    finger: "Little Finger",
    metal: "Gold",
    weight: "2–4 Ratti",
    chantDay: "Wednesday",
    chantTime: "Morning",
    chantCount: 108,
    deity: "Budha (Mercury)",
    color: "Green",
    element: "Air",
  },
  {
    name: "Karka",
    nameHi: "कर्क",
    english: "Cancer",
    mantra: "Om Shrim Hreem Kleem Shriye Namaha",
    gemstone: "Pearl",
    finger: "Little Finger",
    metal: "Silver",
    weight: "3–6 Ratti",
    chantDay: "Monday",
    chantTime: "Evening",
    chantCount: 108,
    deity: "Chandra (Moon)",
    color: "White",
    element: "Water",
  },
  {
    name: "Simha",
    nameHi: "सिंह",
    english: "Leo",
    mantra: "Om Hreem Hreem Suryaya Namaha",
    gemstone: "Ruby",
    finger: "Ring Finger",
    metal: "Gold",
    weight: "3–6 Ratti",
    chantDay: "Sunday",
    chantTime: "Morning",
    chantCount: 108,
    deity: "Surya (Sun)",
    color: "Golden Yellow",
    element: "Fire",
  },
  {
    name: "Kanya",
    nameHi: "कन्या",
    english: "Virgo",
    mantra: "Om Aim Saraswatyai Namaha",
    gemstone: "Emerald",
    finger: "Little Finger",
    metal: "Gold",
    weight: "3–5 Ratti",
    chantDay: "Wednesday",
    chantTime: "Morning",
    chantCount: 108,
    deity: "Budha (Mercury)",
    color: "Green/Brown",
    element: "Earth",
  },
  {
    name: "Tula",
    nameHi: "तुला",
    english: "Libra",
    mantra: "Om Shrim Hreem Kleem Mahalakshmyai Namaha",
    gemstone: "Diamond / White Sapphire",
    finger: "Middle Finger",
    metal: "Silver",
    weight: "0.5–1 Carat",
    chantDay: "Friday",
    chantTime: "Morning or Evening",
    chantCount: 108,
    deity: "Shukra (Venus)",
    color: "Pastel Blue",
    element: "Air",
  },
  {
    name: "Vrishchika",
    nameHi: "वृश्चिक",
    english: "Scorpio",
    mantra: "Om Namah Shivaya",
    gemstone: "Red Coral",
    finger: "Ring Finger",
    metal: "Gold",
    weight: "6–12 Ratti",
    chantDay: "Tuesday",
    chantTime: "Morning",
    chantCount: 108,
    deity: "Mangal (Mars)",
    color: "Red/Dark",
    element: "Water",
  },
  {
    name: "Dhanu",
    nameHi: "धनु",
    english: "Sagittarius",
    mantra: "Om Aim Hreem Kleem Brihaspate Namaha",
    gemstone: "Yellow Sapphire",
    finger: "Index Finger",
    metal: "Gold",
    weight: "3–5 Ratti",
    chantDay: "Thursday",
    chantTime: "Morning",
    chantCount: 108,
    deity: "Guru (Jupiter)",
    color: "Yellow",
    element: "Fire",
  },
  {
    name: "Makara",
    nameHi: "मकर",
    english: "Capricorn",
    mantra: "Om Sham Shanicharaya Namaha",
    gemstone: "Blue Sapphire",
    finger: "Middle Finger",
    metal: "Iron / Five-metal alloy",
    weight: "4–7 Ratti",
    chantDay: "Saturday",
    chantTime: "Evening",
    chantCount: 108,
    deity: "Shani (Saturn)",
    color: "Black/Dark Blue",
    element: "Earth",
  },
  {
    name: "Kumbha",
    nameHi: "कुम्भ",
    english: "Aquarius",
    mantra: "Om Sham Shanicharaya Namaha",
    gemstone: "Blue Sapphire",
    finger: "Middle Finger",
    metal: "Iron / Five-metal alloy",
    weight: "5–8 Ratti",
    chantDay: "Saturday",
    chantTime: "Evening",
    chantCount: 108,
    deity: "Shani (Saturn)",
    color: "Blue",
    element: "Air",
  },
  {
    name: "Meena",
    nameHi: "मीन",
    english: "Pisces",
    mantra: "Om Namo Bhagavate Vasudevaya",
    gemstone: "Yellow Sapphire",
    finger: "Index Finger",
    metal: "Gold",
    weight: "4–6 Ratti",
    chantDay: "Thursday",
    chantTime: "Morning",
    chantCount: 108,
    deity: "Guru (Jupiter)",
    color: "Sea Green",
    element: "Water",
  },
];

// Approximate Moon-sign Rashi by birth month (solar approximation)
function getRashiFromDOB(date: Date): RashiInfo {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const idx = [
    [1, 14, 10],
    [1, 15, 11],
    [2, 14, 10],
    [2, 15, 11],
    [3, 14, 11],
    [3, 15, 0],
    [4, 14, 0],
    [4, 15, 1],
    [5, 14, 1],
    [5, 15, 2],
    [6, 14, 2],
    [6, 15, 3],
    [7, 14, 3],
    [7, 15, 4],
    [8, 14, 4],
    [8, 15, 5],
    [9, 14, 5],
    [9, 15, 6],
    [10, 14, 6],
    [10, 15, 7],
    [11, 14, 7],
    [11, 15, 8],
    [12, 14, 8],
    [12, 15, 9],
  ].find(([m, d]) => month === m && day < d);
  if (idx) return RASHI_DATA[idx[2]];
  // fallback: map month directly
  const fallbackMap: Record<number, number> = {
    1: 9,
    2: 10,
    3: 11,
    4: 0,
    5: 1,
    6: 2,
    7: 3,
    8: 4,
    9: 5,
    10: 6,
    11: 7,
    12: 8,
  };
  return RASHI_DATA[fallbackMap[month] ?? 0];
}

const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishtha",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

const ASCENDANTS = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Karka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrishchika",
  "Dhanu",
  "Makara",
  "Kumbha",
  "Meena",
];

function getNakshatra(date: Date): string {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return NAKSHATRAS[dayOfYear % 27];
}

function getAscendant(date: Date): string {
  const seed = date.getFullYear() % 12;
  return ASCENDANTS[seed % 12];
}

// ─── Result Display ───────────────────────────────────────────────────────────

function ResultCard({
  rashi,
  nakshatra,
  ascendant,
}: { rashi: RashiInfo; nakshatra: string; ascendant: string }) {
  return (
    <div className="space-y-4" data-ocid="birthchart.result.card">
      {/* Rashi summary */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          borderColor: "oklch(0.35 0.12 48)",
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 26), oklch(0.16 0.06 22))",
        }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.10 30), oklch(0.18 0.08 25))",
            borderColor: "oklch(0.35 0.12 48)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{
                background: "oklch(0.68 0.20 48 / 0.15)",
                border: "2px solid oklch(0.68 0.20 48 / 0.40)",
              }}
            >
              ⭐
            </div>
            <div>
              <h3
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {rashi.name}{" "}
                <span style={{ color: "oklch(0.55 0.06 55)" }}>
                  ({rashi.english})
                </span>
              </h3>
              <p className="text-sm" style={{ color: "oklch(0.68 0.10 65)" }}>
                {rashi.nameHi} · {rashi.element} Sign
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-3 gap-3">
          {[
            { label: "Moon Sign", value: rashi.name },
            { label: "Nakshatra", value: nakshatra },
            { label: "Ascendant", value: ascendant },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-3 border"
              style={{
                background: "oklch(0.17 0.05 22)",
                borderColor: "oklch(0.26 0.07 28)",
              }}
            >
              <p className="text-xs" style={{ color: "oklch(0.50 0.04 50)" }}>
                {label}
              </p>
              <p
                className="font-heading font-bold text-sm mt-0.5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mantra */}
      <div
        className="rounded-2xl border p-5"
        style={{
          background: "oklch(0.17 0.06 22)",
          borderColor: "oklch(0.35 0.12 48)",
        }}
        data-ocid="birthchart.mantra.card"
      >
        <p
          className="text-xs font-semibold mb-2"
          style={{ color: "oklch(0.55 0.06 55)" }}
        >
          ✨ Recommended Mantra
        </p>
        <div
          className="rounded-xl px-4 py-3 text-center mb-3"
          style={{
            background: "oklch(0.68 0.20 48 / 0.08)",
            border: "1px solid oklch(0.68 0.20 48 / 0.25)",
          }}
        >
          <p
            className="font-heading font-bold text-base"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {rashi.mantra}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Count", value: `${rashi.chantCount} times` },
            { label: "Best Day", value: rashi.chantDay },
            { label: "Timing", value: rashi.chantTime },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-2.5 border text-center"
              style={{
                background: "oklch(0.15 0.05 20)",
                borderColor: "oklch(0.26 0.07 28)",
              }}
            >
              <p className="text-xs" style={{ color: "oklch(0.50 0.04 50)" }}>
                {label}
              </p>
              <p
                className="text-xs font-semibold mt-0.5"
                style={{ color: "oklch(0.68 0.10 65)" }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: "oklch(0.45 0.04 46)" }}>
          🕉 Ruling Deity:{" "}
          <strong style={{ color: "oklch(0.68 0.20 48)" }}>
            {rashi.deity}
          </strong>
        </p>
      </div>

      {/* Gemstone */}
      <div
        className="rounded-2xl border p-5"
        style={{
          background: "oklch(0.17 0.06 22)",
          borderColor: "oklch(0.35 0.12 48)",
        }}
        data-ocid="birthchart.gemstone.card"
      >
        <p
          className="text-xs font-semibold mb-3"
          style={{ color: "oklch(0.55 0.06 55)" }}
        >
          💎 Gemstone Recommendation
        </p>
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
            style={{
              background: "oklch(0.68 0.20 48 / 0.12)",
              border: "2px solid oklch(0.68 0.20 48 / 0.35)",
            }}
          >
            💠
          </div>
          <div>
            <p
              className="font-heading font-bold text-lg"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {rashi.gemstone}
            </p>
            <p className="text-xs" style={{ color: "oklch(0.55 0.06 55)" }}>
              Lucky Color: {rashi.color}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Wear On", value: rashi.finger },
            { label: "Metal", value: rashi.metal },
            { label: "Min. Weight", value: rashi.weight },
            { label: "Element", value: rashi.element },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-2.5 border"
              style={{
                background: "oklch(0.15 0.05 20)",
                borderColor: "oklch(0.26 0.07 28)",
              }}
            >
              <p className="text-xs" style={{ color: "oklch(0.50 0.04 50)" }}>
                {label}
              </p>
              <p
                className="text-xs font-semibold mt-0.5"
                style={{ color: "oklch(0.68 0.10 65)" }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p
        className="text-xs text-center"
        style={{ color: "oklch(0.40 0.04 42)" }}
      >
        ⚠️ This is an approximate calculation based on birth date. For a precise
        Kundali, consult a qualified Jyotishi.
      </p>
    </div>
  );
}

// ─── History Panel (Full Mode Placeholder) ────────────────────────────────────

function HistoryPanel() {
  return (
    <div
      className="rounded-2xl border p-6 text-center"
      style={{
        background: "oklch(0.17 0.06 22)",
        borderColor: "oklch(0.28 0.07 28)",
      }}
      data-ocid="birthchart.history.empty_state"
    >
      <p className="text-3xl mb-2">📋</p>
      <p
        className="font-heading font-bold"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        No saved recommendations
      </p>
      <p className="text-xs mt-1" style={{ color: "oklch(0.50 0.04 50)" }}>
        Login and generate your first chart to save results here.
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BirthChartRecommender() {
  const [activeTab, setActiveTab] = useState<"generate" | "history">(
    "generate",
  );
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [tobUnknown, setTobUnknown] = useState(false);
  const [place, setPlace] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<{
    rashi: RashiInfo;
    nakshatra: string;
    ascendant: string;
  } | null>(null);
  const [isLoggedIn] = useState(false);

  function handleGenerate() {
    if (!dob) return;
    const date = new Date(dob);
    const rashi = getRashiFromDOB(date);
    const nakshatra = getNakshatra(date);
    const ascendant = getAscendant(date);
    setResult({ rashi, nakshatra, ascendant });
  }

  return (
    <div style={{ background: "oklch(0.13 0.04 20)", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "180px",
          background:
            "linear-gradient(135deg, oklch(0.16 0.08 25), oklch(0.22 0.12 40), oklch(0.18 0.08 28))",
        }}
        data-ocid="birthchart.header"
      >
        <div
          className="absolute top-0 inset-x-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.68 0.20 48), oklch(0.78 0.14 75), oklch(0.68 0.20 48), transparent)",
          }}
        />
        <div className="flex flex-col items-center justify-center text-center px-4 py-8 gap-2">
          <h1
            className="font-decorative text-3xl md:text-4xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Birth Chart Recommender
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.68 0.10 65)" }}
          >
            जन्म कुंडली रेकमेंडर
          </p>
          <p className="text-xs" style={{ color: "oklch(0.55 0.06 55)" }}>
            Discover your Rashi, Mantra & Gemstone based on your birth details
          </p>
        </div>
        <div
          className="absolute bottom-0 inset-x-0 h-1"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.78 0.14 75 / 0.4), transparent)",
          }}
        />
      </div>

      {/* Tabs */}
      <div
        className="border-b"
        style={{
          background: "oklch(0.16 0.06 22)",
          borderColor: "oklch(0.28 0.08 30)",
        }}
      >
        <div className="container mx-auto px-4 max-w-2xl flex">
          {(["generate", "history"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="px-5 py-3 text-sm font-bold transition-all border-b-2"
              style={
                activeTab === tab
                  ? {
                      borderColor: "oklch(0.68 0.20 48)",
                      color: "oklch(0.78 0.14 75)",
                    }
                  : { borderColor: "transparent", color: "oklch(0.50 0.04 50)" }
              }
              data-ocid={`birthchart.${tab}.tab`}
            >
              {tab === "generate"
                ? "🔮 Generate Chart"
                : "📋 My Recommendations"}
              {tab === "history" && !isLoggedIn && (
                <span className="ml-1 text-xs opacity-60">
                  (Login required)
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl py-6 space-y-5">
        {activeTab === "generate" ? (
          <>
            {/* Form */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                borderColor: "oklch(0.35 0.12 48)",
                background: "oklch(0.16 0.06 22)",
              }}
              data-ocid="birthchart.form.card"
            >
              <div
                className="px-5 py-4 border-b"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.20 0.09 28), oklch(0.18 0.07 24))",
                  borderColor: "oklch(0.35 0.12 48)",
                }}
              >
                <h2
                  className="font-heading font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  Step 1 — Enter Birth Details
                </h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label
                    htmlFor="birthchart-name"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    Name (optional)
                  </label>
                  <input
                    id="birthchart-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name..."
                    className="w-full rounded-xl px-4 py-2.5 text-sm border outline-none"
                    style={{
                      background: "oklch(0.15 0.05 20)",
                      borderColor: "oklch(0.30 0.08 28)",
                      color: "oklch(0.82 0.06 65)",
                      colorScheme: "dark",
                    }}
                    data-ocid="birthchart.name.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="birthchart-dob"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    Date of Birth{" "}
                    <span style={{ color: "oklch(0.65 0.20 20)" }}>*</span>
                  </label>
                  <input
                    id="birthchart-dob"
                    type="date"
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                      setResult(null);
                    }}
                    className="w-full rounded-xl px-4 py-2.5 text-sm border outline-none"
                    style={{
                      background: "oklch(0.15 0.05 20)",
                      borderColor: "oklch(0.30 0.08 28)",
                      color: "oklch(0.82 0.06 65)",
                      colorScheme: "dark",
                    }}
                    data-ocid="birthchart.dob.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="birthchart-tob"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    Time of Birth
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      id="birthchart-tob"
                      type="time"
                      value={tob}
                      onChange={(e) => setTob(e.target.value)}
                      disabled={tobUnknown}
                      className="flex-1 rounded-xl px-4 py-2.5 text-sm border outline-none disabled:opacity-40"
                      style={{
                        background: "oklch(0.15 0.05 20)",
                        borderColor: "oklch(0.30 0.08 28)",
                        color: "oklch(0.82 0.06 65)",
                        colorScheme: "dark",
                      }}
                      data-ocid="birthchart.tob.input"
                    />
                    <label
                      className="flex items-center gap-2 text-xs cursor-pointer"
                      style={{ color: "oklch(0.60 0.04 55)" }}
                    >
                      <input
                        type="checkbox"
                        checked={tobUnknown}
                        onChange={(e) => setTobUnknown(e.target.checked)}
                        className="w-4 h-4"
                        data-ocid="birthchart.tob.unknown.checkbox"
                      />
                      Unknown
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="birthchart-place"
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    Place of Birth
                  </label>
                  <input
                    id="birthchart-place"
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="City, Country..."
                    className="w-full rounded-xl px-4 py-2.5 text-sm border outline-none"
                    style={{
                      background: "oklch(0.15 0.05 20)",
                      borderColor: "oklch(0.30 0.08 28)",
                      color: "oklch(0.82 0.06 65)",
                      colorScheme: "dark",
                    }}
                    data-ocid="birthchart.place.input"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!dob}
                  className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.60 0.22 42))",
                    color: "white",
                  }}
                  data-ocid="birthchart.generate.submit_button"
                >
                  ✨ Generate Recommendations
                </button>
              </div>
            </div>

            {/* Result */}
            {result && (
              <div data-ocid="birthchart.result.section">
                <h2
                  className="font-heading font-bold text-base mb-3"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  Step 2 — Your Recommendations
                  {name && (
                    <span style={{ color: "oklch(0.55 0.06 55)" }}>
                      {" "}
                      for {name}
                    </span>
                  )}
                </h2>
                <ResultCard
                  rashi={result.rashi}
                  nakshatra={result.nakshatra}
                  ascendant={result.ascendant}
                />
              </div>
            )}
          </>
        ) : (
          <HistoryPanel />
        )}
      </div>
    </div>
  );
}
