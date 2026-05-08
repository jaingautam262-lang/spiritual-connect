import { useMemo, useState } from "react";

// ─── Types ───
type Planet =
  | "Asc"
  | "Sun"
  | "Moon"
  | "Mars"
  | "Mercury"
  | "Jupiter"
  | "Venus"
  | "Saturn"
  | "Rahu"
  | "Ketu";
type Sign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

interface PlanetData {
  planet: Planet;
  abbr: string;
  sign: Sign;
  degree: number;
  nakshatra: string;
  house: number;
  retrograde: boolean;
  signLord: string;
  nakshatraLord: string;
  subLord: string;
  subSubLord: string;
}

const SIGNS: Sign[] = [
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
const SIGN_ABBR: Record<Sign, string> = {
  Aries: "Ar",
  Taurus: "Ta",
  Gemini: "Ge",
  Cancer: "Ca",
  Leo: "Le",
  Virgo: "Vi",
  Libra: "Li",
  Scorpio: "Sc",
  Sagittarius: "Sa",
  Capricorn: "Cp",
  Aquarius: "Aq",
  Pisces: "Pi",
};

// Pre-filled sample data (Asc Scorpio, Sun Libra, Moon Capricorn, etc.)
const SAMPLE_PLANETS: PlanetData[] = [
  {
    planet: "Asc",
    abbr: "Asc",
    sign: "Scorpio",
    degree: 14.32,
    nakshatra: "Anuradha",
    house: 1,
    retrograde: false,
    signLord: "Mars",
    nakshatraLord: "Saturn",
    subLord: "Mercury",
    subSubLord: "Venus",
  },
  {
    planet: "Sun",
    abbr: "Su",
    sign: "Libra",
    degree: 22.15,
    nakshatra: "Vishakha",
    house: 12,
    retrograde: false,
    signLord: "Venus",
    nakshatraLord: "Jupiter",
    subLord: "Moon",
    subSubLord: "Mars",
  },
  {
    planet: "Moon",
    abbr: "Mo",
    sign: "Capricorn",
    degree: 8.44,
    nakshatra: "Shravana",
    house: 3,
    retrograde: false,
    signLord: "Saturn",
    nakshatraLord: "Moon",
    subLord: "Jupiter",
    subSubLord: "Saturn",
  },
  {
    planet: "Mars",
    abbr: "Ma",
    sign: "Scorpio",
    degree: 7.5,
    nakshatra: "Anuradha",
    house: 1,
    retrograde: false,
    signLord: "Mars",
    nakshatraLord: "Saturn",
    subLord: "Venus",
    subSubLord: "Rahu",
  },
  {
    planet: "Mercury",
    abbr: "Me",
    sign: "Scorpio",
    degree: 18.22,
    nakshatra: "Jyeshtha",
    house: 1,
    retrograde: false,
    signLord: "Mars",
    nakshatraLord: "Mercury",
    subLord: "Saturn",
    subSubLord: "Moon",
  },
  {
    planet: "Jupiter",
    abbr: "Ju",
    sign: "Scorpio",
    degree: 25.1,
    nakshatra: "Jyeshtha",
    house: 1,
    retrograde: false,
    signLord: "Mars",
    nakshatraLord: "Mercury",
    subLord: "Rahu",
    subSubLord: "Jupiter",
  },
  {
    planet: "Venus",
    abbr: "Ve",
    sign: "Virgo",
    degree: 11.35,
    nakshatra: "Hasta",
    house: 11,
    retrograde: false,
    signLord: "Mercury",
    nakshatraLord: "Moon",
    subLord: "Mars",
    subSubLord: "Sun",
  },
  {
    planet: "Saturn",
    abbr: "Sa",
    sign: "Cancer",
    degree: 16.28,
    nakshatra: "Pushya",
    house: 9,
    retrograde: true,
    signLord: "Moon",
    nakshatraLord: "Saturn",
    subLord: "Jupiter",
    subSubLord: "Mercury",
  },
  {
    planet: "Rahu",
    abbr: "Ra",
    sign: "Capricorn",
    degree: 21.05,
    nakshatra: "Shravana",
    house: 3,
    retrograde: true,
    signLord: "Saturn",
    nakshatraLord: "Moon",
    subLord: "Venus",
    subSubLord: "Saturn",
  },
  {
    planet: "Ketu",
    abbr: "Ke",
    sign: "Cancer",
    degree: 21.05,
    nakshatra: "Ashlesha",
    house: 9,
    retrograde: true,
    signLord: "Moon",
    nakshatraLord: "Mercury",
    subLord: "Venus",
    subSubLord: "Saturn",
  },
];

// Shadbala approximate values
const SHADBALA_DATA = [
  { planet: "Sun", shadbala: 7.23, required: 6.5, ratio: 1.11 },
  { planet: "Moon", shadbala: 5.44, required: 6.0, ratio: 0.91 },
  { planet: "Mars", shadbala: 8.12, required: 5.0, ratio: 1.62 },
  { planet: "Mercury", shadbala: 7.05, required: 7.0, ratio: 1.01 },
  { planet: "Jupiter", shadbala: 8.88, required: 6.5, ratio: 1.37 },
  { planet: "Venus", shadbala: 5.9, required: 5.5, ratio: 1.07 },
  { planet: "Saturn", shadbala: 4.22, required: 5.0, ratio: 0.84 },
];

// Ashtakavarga sample points (8 planets × 12 signs)
const ASHTAK_PLANETS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Asc",
];
const ASHTAK_SIGNS = SIGNS;
const ASHTAK_DATA: Record<string, number[]> = {
  Sun: [4, 3, 5, 2, 4, 3, 5, 4, 3, 2, 4, 5],
  Moon: [3, 4, 4, 5, 3, 2, 4, 5, 4, 3, 5, 4],
  Mars: [2, 3, 5, 4, 3, 4, 2, 5, 3, 4, 4, 3],
  Mercury: [4, 5, 4, 3, 5, 4, 3, 4, 5, 3, 4, 4],
  Jupiter: [5, 3, 4, 5, 4, 3, 5, 4, 3, 5, 4, 4],
  Venus: [3, 4, 3, 4, 5, 4, 3, 3, 4, 4, 5, 3],
  Saturn: [2, 3, 3, 2, 3, 4, 4, 3, 3, 2, 3, 4],
  Asc: [3, 4, 3, 4, 5, 3, 4, 3, 4, 3, 4, 3],
};

const gold = "oklch(0.68 0.20 48)";
const saffron = "oklch(0.62 0.18 48)";
const cardBg = "oklch(0.99 0.008 80)";
const borderColor = "oklch(0.78 0.14 75 / 0.25)";

// ─── North Indian Chart ───
// Houses in North Indian diamond layout (fixed house positions, signs rotate)
// House positions in the grid (row, col, span info)
const _NORTH_POSITIONS = [
  // house index: [row1, col1, row2, col2] — triangle corners within 4x4 grid
  // We'll use a simplified fixed-grid representation
  { house: 1, label: "1", pos: "top-center" },
  { house: 2, label: "2", pos: "top-right-inner" },
];

// Compute which planets are in each house
function getPlanetsInHouse(house: number, planets: PlanetData[]) {
  return planets.filter((p) => p.house === house);
}

function NorthIndianChart({ planets }: { planets: PlanetData[] }) {
  // 4x4 grid with 12 houses in diamond pattern
  // Layout: corners cut, 12 diamond cells
  // Standard North Indian layout:
  //  [12][1][2]
  //  [11][  ][3]
  //  [10][9][8][7][6][5][4] — simplified 4x4
  // Actually the standard North Indian is a 3x3 grid with diagonals:
  const _houseLayout: (number | null)[][] = [
    [12, 1, 2],
    [11, null, 3],
    [10, 9, 8],
    // row 4 is 7 6 5 4 going bottom (use different row)
  ];
  // Simplified version: use a flat 4x4 with specific positions
  // Houses in cells:
  //  row0: 12 | 1  | 2
  //  row1: 11 | (center diagonal) | 3
  //  row2: 10 | 5 diagonal center | 4 (actually 4 is bottom-right)
  //  Alternative clean representation:
  const _cells: Array<{ house: number | null; row: number; col: number }> = [
    { house: 12, row: 0, col: 0 },
    { house: 1, row: 0, col: 1 },
    { house: 2, row: 0, col: 2 },
    { house: 11, row: 1, col: 0 },
    { house: null, row: 1, col: 1 },
    { house: 3, row: 1, col: 2 },
    { house: 10, row: 2, col: 0 },
    { house: 9, row: 2, col: 1 },
    { house: 4, row: 2, col: 2 },
  ];
  // We need 4 more houses (5,6,7,8) — add a 4th row or use a 4×4 grid
  const cells4x4: Array<{ house: number | null; row: number; col: number }> = [
    { house: 12, row: 0, col: 0 },
    { house: 1, row: 0, col: 1 },
    { house: 2, row: 0, col: 2 },
    { house: 3, row: 0, col: 3 },
    { house: 11, row: 1, col: 0 },
    { house: null, row: 1, col: 1 },
    { house: null, row: 1, col: 2 },
    { house: 4, row: 1, col: 3 },
    { house: 10, row: 2, col: 0 },
    { house: null, row: 2, col: 1 },
    { house: null, row: 2, col: 2 },
    { house: 5, row: 2, col: 3 },
    { house: 9, row: 3, col: 0 },
    { house: 8, row: 3, col: 1 },
    { house: 7, row: 3, col: 2 },
    { house: 6, row: 3, col: 3 },
  ];

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs text-muted-foreground mb-2">
        North Indian Style — Houses Fixed
      </p>
      <div
        className="grid grid-cols-4 gap-px"
        style={{
          background: borderColor,
          border: `2px solid ${borderColor}`,
          width: "100%",
          maxWidth: 340,
        }}
      >
        {cells4x4.map(({ house, row, col }) => {
          const hPlanets = house ? getPlanetsInHouse(house, planets) : [];
          const isCenter = !house;
          return (
            <div
              key={`${row}-${col}`}
              className="flex flex-col p-1.5 min-h-[72px] relative"
              style={{
                background: isCenter ? "oklch(0.78 0.14 75 / 0.08)" : cardBg,
              }}
            >
              {house && (
                <span
                  className="text-xs font-heading font-bold absolute top-1 left-1.5"
                  style={{ color: "oklch(0.68 0.20 48 / 0.5)" }}
                >
                  {house}
                </span>
              )}
              {isCenter && row === 1 && (
                <div className="flex items-center justify-center h-full">
                  <div
                    className="w-8 h-8 rotate-45"
                    style={{ border: `2px solid ${borderColor}` }}
                  />
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-0.5">
                {hPlanets.map((p) => (
                  <span
                    key={p.planet}
                    className="text-xs font-heading font-bold"
                    style={{
                      color:
                        p.planet === "Rahu" ||
                        p.planet === "Ketu" ||
                        p.planet === "Saturn"
                          ? "oklch(0.45 0.15 30)"
                          : saffron,
                    }}
                  >
                    {p.abbr}
                    {p.retrograde ? "®" : ""}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SouthIndianChart({ planets }: { planets: PlanetData[] }) {
  // South Indian: 4x3 grid — signs fixed starting Aries top-left (skipping corners)
  // Signs in order: Pisces(top-left adjacent), Aries, Taurus, Gemini top row
  // Then: Aquarius, [corner], [corner], Cancer
  // etc.
  const southGrid: Array<{ sign: Sign | null; row: number; col: number }> = [
    { sign: "Pisces", row: 0, col: 0 },
    { sign: "Aries", row: 0, col: 1 },
    { sign: "Taurus", row: 0, col: 2 },
    { sign: "Gemini", row: 0, col: 3 },
    { sign: "Aquarius", row: 1, col: 0 },
    { sign: null, row: 1, col: 1 },
    { sign: null, row: 1, col: 2 },
    { sign: "Cancer", row: 1, col: 3 },
    { sign: "Capricorn", row: 2, col: 0 },
    { sign: null, row: 2, col: 1 },
    { sign: null, row: 2, col: 2 },
    { sign: "Leo", row: 2, col: 3 },
    { sign: "Sagittarius", row: 3, col: 0 },
    { sign: "Scorpio", row: 3, col: 1 },
    { sign: "Libra", row: 3, col: 2 },
    { sign: "Virgo", row: 3, col: 3 },
  ];

  const planetsBySign: Record<string, PlanetData[]> = {};
  for (const p of planets) {
    if (!planetsBySign[p.sign]) planetsBySign[p.sign] = [];
    planetsBySign[p.sign].push(p);
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs text-muted-foreground mb-2">
        South Indian Style — Signs Fixed
      </p>
      <div
        className="grid grid-cols-4 gap-px"
        style={{
          background: borderColor,
          border: `2px solid ${borderColor}`,
          width: "100%",
          maxWidth: 340,
        }}
      >
        {southGrid.map(({ sign, row, col }) => {
          const signPlanets = sign ? (planetsBySign[sign] ?? []) : [];
          const isCenter = !sign;
          const isAsc = sign && signPlanets.some((p) => p.planet === "Asc");
          return (
            <div
              key={`${row}-${col}`}
              className="flex flex-col p-1.5 min-h-[72px]"
              style={{
                background: isCenter
                  ? "oklch(0.78 0.14 75 / 0.08)"
                  : isAsc
                    ? "oklch(0.68 0.20 48 / 0.08)"
                    : cardBg,
              }}
            >
              {sign && (
                <span
                  className="text-xs font-heading font-semibold"
                  style={{ color: "oklch(0.48 0.04 40)" }}
                >
                  {SIGN_ABBR[sign]}
                </span>
              )}
              <div className="flex flex-wrap gap-0.5 mt-0.5">
                {signPlanets.map((p) => (
                  <span
                    key={p.planet}
                    className="text-xs font-heading font-bold"
                    style={{
                      color:
                        p.planet === "Rahu" ||
                        p.planet === "Ketu" ||
                        p.planet === "Saturn"
                          ? "oklch(0.45 0.15 30)"
                          : saffron,
                    }}
                  >
                    {p.abbr}
                    {p.retrograde ? "®" : ""}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const TABS = [
  { id: "input", label: "Birth Details", labelHi: "जन्म विवरण" },
  { id: "chart", label: "Kundli Chart", labelHi: "कुंडली चार्ट" },
  { id: "planets", label: "Planetary Positions", labelHi: "ग्रह स्थिति" },
  { id: "kp", label: "KP Sub-Lords", labelHi: "KP सब-लॉर्ड" },
  { id: "shadbala", label: "Shadbala", labelHi: "षड्बल" },
  { id: "ashtakavarga", label: "Ashtakavarga", labelHi: "अष्टकवर्ग" },
];

export default function KundliCalculator() {
  const [activeTab, setActiveTab] = useState("chart");
  const [chartStyle, setChartStyle] = useState<"north" | "south">("north");
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [form, setForm] = useState({ name: "", dob: "", tob: "", pob: "" });
  const [_calculated, setCalculated] = useState(true); // Show sample data by default

  const planets = SAMPLE_PLANETS;

  const sarvashtakavarga = useMemo(() => {
    return ASHTAK_SIGNS.map((_, signIdx) =>
      ASHTAK_PLANETS.reduce(
        (sum, p) => sum + (ASHTAK_DATA[p]?.[signIdx] ?? 0),
        0,
      ),
    );
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="py-8 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 25), oklch(0.25 0.08 30))",
        }}
      >
        <h1
          className="font-decorative text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          🔮 Kundli Calculator
        </h1>
        <p
          className="font-body text-sm"
          style={{ color: "oklch(0.75 0.04 75)" }}
        >
          {lang === "en"
            ? "Vedic Birth Chart with KP System Analysis"
            : "KP प्रणाली सहित वैदिक जन्म कुंडली"}
        </p>
        <div className="flex items-center justify-center gap-3 mt-3">
          <button
            type="button"
            onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
            className="text-xs px-4 py-1.5 rounded-full border transition-colors"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.4)",
              color: "oklch(0.85 0.04 75)",
            }}
          >
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="border-b overflow-x-auto"
        style={{ borderColor, background: cardBg }}
      >
        <div className="flex gap-1 px-4 pt-2 min-w-max" data-ocid="kundli.tab">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 text-xs font-heading font-semibold border-b-2 transition-colors whitespace-nowrap"
              style={
                activeTab === tab.id
                  ? { borderBottomColor: gold, color: gold }
                  : {
                      borderBottomColor: "transparent",
                      color: "oklch(0.48 0.04 40)",
                    }
              }
              data-ocid={`kundli.tab.${tab.id}`}
            >
              {lang === "en" ? tab.label : tab.labelHi}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* TAB: Birth Details */}
        {activeTab === "input" && (
          <div className="max-w-md mx-auto">
            <div
              className="rounded-2xl p-6"
              style={{ background: cardBg, border: `1px solid ${borderColor}` }}
            >
              <h2
                className="font-heading font-bold text-lg mb-5"
                style={{ color: "oklch(0.22 0.08 22)" }}
              >
                {lang === "en" ? "Enter Birth Details" : "जन्म विवरण दर्ज करें"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="kundli-name"
                    className="block text-sm font-heading font-semibold mb-1.5"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {lang === "en" ? "Full Name" : "पूरा नाम"}
                  </label>
                  <input
                    id="kundli-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none bg-background"
                    style={{ borderColor }}
                    data-ocid="kundli.name_input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="kundli-dob"
                    className="block text-sm font-heading font-semibold mb-1.5"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {lang === "en" ? "Date of Birth" : "जन्म तिथि"}
                  </label>
                  <input
                    id="kundli-dob"
                    type="date"
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none bg-background"
                    style={{ borderColor }}
                    data-ocid="kundli.dob_input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="kundli-tob"
                    className="block text-sm font-heading font-semibold mb-1.5"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {lang === "en" ? "Time of Birth" : "जन्म समय"}
                  </label>
                  <input
                    id="kundli-tob"
                    type="time"
                    value={form.tob}
                    onChange={(e) => setForm({ ...form, tob: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none bg-background"
                    style={{ borderColor }}
                    data-ocid="kundli.tob_input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="kundli-pob"
                    className="block text-sm font-heading font-semibold mb-1.5"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {lang === "en" ? "Place of Birth" : "जन्म स्थान"}
                  </label>
                  <input
                    id="kundli-pob"
                    type="text"
                    value={form.pob}
                    onChange={(e) => setForm({ ...form, pob: e.target.value })}
                    placeholder="City, State, Country"
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none bg-background"
                    style={{ borderColor }}
                    data-ocid="kundli.pob_input"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCalculated(true);
                    setActiveTab("chart");
                  }}
                  className="w-full py-3 rounded-xl font-heading font-bold text-sm transition-all hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${gold}, oklch(0.58 0.18 40))`,
                    color: "white",
                  }}
                  data-ocid="kundli.calculate_button"
                >
                  🔮 {lang === "en" ? "Calculate Kundli" : "कुंडली बनाएं"}
                </button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                {lang === "en"
                  ? "Sample chart shown with Asc Scorpio positions"
                  : "नमूना चार्ट: लग्न वृश्चिक के साथ दिखाया गया है"}
              </p>
            </div>
          </div>
        )}

        {/* TAB: Chart */}
        {activeTab === "chart" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.22 0.08 22)" }}
              >
                {lang === "en" ? "Birth Chart" : "जन्म कुंडली"}
              </h2>
              <div className="flex gap-2" data-ocid="kundli.chart_style_toggle">
                {(["north", "south"] as const).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setChartStyle(style)}
                    className="px-4 py-1.5 rounded-full text-xs font-heading font-semibold border transition-all"
                    style={
                      chartStyle === style
                        ? {
                            background: saffron,
                            color: "white",
                            borderColor: saffron,
                          }
                        : { background: cardBg, borderColor }
                    }
                    data-ocid={`kundli.chart_style.${style}`}
                  >
                    {style === "north"
                      ? lang === "en"
                        ? "North"
                        : "उत्तर"
                      : lang === "en"
                        ? "South"
                        : "दक्षिण"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                {chartStyle === "north" ? (
                  <NorthIndianChart planets={planets} />
                ) : (
                  <SouthIndianChart planets={planets} />
                )}
              </div>
              {/* Legend */}
              <div className="space-y-3">
                <h3
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {lang === "en"
                    ? "Planetary Positions Summary"
                    : "ग्रह स्थिति सारांश"}
                </h3>
                <div className="space-y-2">
                  {planets
                    .filter((p) => p.planet !== "Asc")
                    .map((p) => (
                      <div
                        key={p.planet}
                        className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg"
                        style={{
                          background: "oklch(0.97 0.015 85)",
                          border: `1px solid ${borderColor}`,
                        }}
                      >
                        <span
                          className="font-heading font-bold"
                          style={{ color: saffron }}
                        >
                          {p.abbr}
                        </span>
                        <span className="font-body text-xs">{p.sign}</span>
                        <span className="font-body text-xs text-muted-foreground">
                          H{p.house}
                        </span>
                        {p.retrograde && (
                          <span
                            className="text-xs px-1.5 py-0.5 rounded font-bold"
                            style={{
                              background: "oklch(0.55 0.22 25 / 0.1)",
                              color: "oklch(0.55 0.22 25)",
                            }}
                          >
                            R
                          </span>
                        )}
                      </div>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  ® = Retrograde planet
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Planetary Positions */}
        {activeTab === "planets" && (
          <div>
            <h2
              className="font-heading font-bold text-lg mb-5"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              {lang === "en" ? "Planetary Positions" : "ग्रह स्थिति तालिका"}
            </h2>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${borderColor}` }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      style={{
                        background: `linear-gradient(135deg, ${gold}, oklch(0.58 0.18 40))`,
                      }}
                    >
                      {[
                        "Planet",
                        "Sign",
                        "Degree",
                        "Nakshatra",
                        "House",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left font-heading font-bold text-white text-xs"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {planets.map((p, i) => (
                      <tr
                        key={p.planet}
                        style={{
                          background:
                            i % 2 === 0 ? cardBg : "oklch(0.97 0.015 85)",
                        }}
                      >
                        <td className="px-4 py-3">
                          <span
                            className="font-heading font-bold text-sm"
                            style={{ color: saffron }}
                          >
                            {p.planet}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-body text-sm">
                          {p.sign}
                        </td>
                        <td className="px-4 py-3 font-body text-sm">
                          {p.degree.toFixed(2)}°
                        </td>
                        <td className="px-4 py-3 font-body text-sm">
                          {p.nakshatra}
                        </td>
                        <td className="px-4 py-3 font-heading font-semibold text-sm">
                          H{p.house}
                        </td>
                        <td className="px-4 py-3">
                          {p.retrograde ? (
                            <span
                              className="text-xs px-2 py-0.5 rounded font-bold"
                              style={{
                                background: "oklch(0.55 0.22 25 / 0.1)",
                                color: "oklch(0.55 0.22 25)",
                              }}
                            >
                              Retrograde (R)
                            </span>
                          ) : (
                            <span
                              className="text-xs px-2 py-0.5 rounded"
                              style={{
                                background: "oklch(0.65 0.16 140 / 0.1)",
                                color: "oklch(0.55 0.16 140)",
                              }}
                            >
                              Direct
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: KP Sub-Lords */}
        {activeTab === "kp" && (
          <div>
            <h2
              className="font-heading font-bold text-lg mb-2"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              {lang === "en" ? "KP Sub-Lords Table" : "KP सब-लॉर्ड तालिका"}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              {lang === "en"
                ? "KP (Krishnamurti Paddhati) system — Nakshatra sub-lord analysis for precision prediction"
                : "KP प्रणाली — सटीक भविष्यवाणी के लिए नक्षत्र सब-लॉर्ड विश्लेषण"}
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${borderColor}` }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      style={{
                        background: `linear-gradient(135deg, ${gold}, oklch(0.58 0.18 40))`,
                      }}
                    >
                      {[
                        "Planet",
                        "Degree",
                        "Sign Lord",
                        "Nakshatra Lord",
                        "Sub Lord",
                        "Sub-Sub Lord",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-3 text-left font-heading font-bold text-white text-xs"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {planets.map((p, i) => (
                      <tr
                        key={p.planet}
                        style={{
                          background:
                            i % 2 === 0 ? cardBg : "oklch(0.97 0.015 85)",
                        }}
                      >
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="font-heading font-bold text-sm"
                              style={{ color: saffron }}
                            >
                              {p.planet}
                            </span>
                            {p.retrograde && (
                              <span
                                className="text-xs px-1 rounded font-bold"
                                style={{
                                  background: "oklch(0.55 0.22 25 / 0.1)",
                                  color: "oklch(0.55 0.22 25)",
                                }}
                              >
                                R
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3 font-body text-xs">
                          {p.degree.toFixed(2)}° {SIGN_ABBR[p.sign]}
                        </td>
                        <td className="px-3 py-3 font-body text-sm">
                          {p.signLord}
                        </td>
                        <td className="px-3 py-3 font-body text-sm">
                          {p.nakshatraLord}
                        </td>
                        <td
                          className="px-3 py-3 font-body text-sm font-semibold"
                          style={{ color: saffron }}
                        >
                          {p.subLord}
                        </td>
                        <td className="px-3 py-3 font-body text-sm">
                          {p.subSubLord}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              R = Retrograde. Sub Lord is the primary KP significator.
            </p>
          </div>
        )}

        {/* TAB: Shadbala */}
        {activeTab === "shadbala" && (
          <div>
            <h2
              className="font-heading font-bold text-lg mb-2"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              {lang === "en"
                ? "Shadbala — Six-fold Planetary Strength"
                : "षड्बल — षटविध ग्रह बल"}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              {lang === "en"
                ? "Shadbala measures the combined strength of planets across 6 parameters (in Rupas/Virupas)"
                : "षड्बल 6 पहलुओं पर ग्रहों की संयुक्त शक्ति मापता है"}
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${borderColor}` }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      style={{
                        background: `linear-gradient(135deg, ${gold}, oklch(0.58 0.18 40))`,
                      }}
                    >
                      {[
                        "Planet",
                        "Shadbala (Rupas)",
                        "Required (Rupas)",
                        "Ratio",
                        "Strength",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left font-heading font-bold text-white text-xs"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SHADBALA_DATA.map((row, i) => {
                      const strong = row.ratio >= 1;
                      return (
                        <tr
                          key={row.planet}
                          style={{
                            background:
                              i % 2 === 0 ? cardBg : "oklch(0.97 0.015 85)",
                          }}
                        >
                          <td
                            className="px-4 py-3 font-heading font-bold text-sm"
                            style={{ color: saffron }}
                          >
                            {row.planet}
                          </td>
                          <td className="px-4 py-3 font-body text-sm">
                            {row.shadbala.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 font-body text-sm text-muted-foreground">
                            {row.required.toFixed(1)}
                          </td>
                          <td
                            className="px-4 py-3 font-body text-sm font-semibold"
                            style={{
                              color: strong
                                ? "oklch(0.55 0.16 140)"
                                : "oklch(0.55 0.22 25)",
                            }}
                          >
                            {row.ratio.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-bold"
                              style={
                                strong
                                  ? {
                                      background: "oklch(0.65 0.16 140 / 0.12)",
                                      color: "oklch(0.55 0.16 140)",
                                    }
                                  : {
                                      background: "oklch(0.55 0.22 25 / 0.1)",
                                      color: "oklch(0.55 0.22 25)",
                                    }
                              }
                            >
                              {strong ? "✓ Strong" : "✗ Weak"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Ratio ≥ 1.0 = Sufficient strength. Rahu and Ketu are not included
              in traditional Shadbala.
            </p>
          </div>
        )}

        {/* TAB: Ashtakavarga */}
        {activeTab === "ashtakavarga" && (
          <div>
            <h2
              className="font-heading font-bold text-lg mb-2"
              style={{ color: "oklch(0.22 0.08 22)" }}
            >
              {lang === "en"
                ? "Ashtakavarga — 8-Planet Benefic Points"
                : "अष्टकवर्ग — 8-ग्रह शुभ बिंदु"}
            </h2>
            <p className="text-sm text-muted-foreground mb-5">
              {lang === "en"
                ? "Points (0-8) contributed by each planet to each sign. Higher points = more favorable."
                : "हर ग्रह द्वारा हर राशि को दिए गए बिंदु। अधिक बिंदु = अधिक अनुकूल।"}
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${borderColor}` }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr
                      style={{
                        background: `linear-gradient(135deg, ${gold}, oklch(0.58 0.18 40))`,
                      }}
                    >
                      <th
                        className="px-3 py-2.5 text-left font-heading font-bold text-white sticky left-0"
                        style={{
                          background: `linear-gradient(135deg, ${gold}, oklch(0.58 0.18 40))`,
                        }}
                      >
                        Planet
                      </th>
                      {ASHTAK_SIGNS.map((s) => (
                        <th
                          key={s}
                          className="px-2 py-2.5 font-heading font-bold text-white text-center"
                        >
                          {SIGN_ABBR[s]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ASHTAK_PLANETS.map((planet, pi) => (
                      <tr
                        key={planet}
                        style={{
                          background:
                            pi % 2 === 0 ? cardBg : "oklch(0.97 0.015 85)",
                        }}
                      >
                        <td
                          className="px-3 py-2.5 font-heading font-bold"
                          style={{ color: saffron }}
                        >
                          {planet}
                        </td>
                        {(ASHTAK_DATA[planet] ?? []).map((pts, si) => (
                          <td
                            key={`${planet}-house${si + 1}-${pts}`}
                            className="px-2 py-2.5 text-center font-body"
                            style={
                              pts >= 4
                                ? {
                                    color: "oklch(0.55 0.16 140)",
                                    fontWeight: 600,
                                  }
                                : pts <= 2
                                  ? { color: "oklch(0.55 0.22 25)" }
                                  : {}
                            }
                          >
                            {pts}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* Sarvashtakavarga total */}
                    <tr style={{ background: "oklch(0.68 0.20 48 / 0.08)" }}>
                      <td
                        className="px-3 py-2.5 font-heading font-bold text-xs"
                        style={{ color: gold }}
                      >
                        Total
                      </td>
                      {sarvashtakavarga.map((total, si) => (
                        <td
                          key={`sarva-house${si + 1}-${total}`}
                          className="px-2 py-2.5 text-center font-heading font-bold"
                          style={
                            total >= 28
                              ? { color: "oklch(0.55 0.16 140)" }
                              : total <= 22
                                ? { color: "oklch(0.55 0.22 25)" }
                                : { color: gold }
                          }
                        >
                          {total}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-4 mt-3 text-xs">
              <span style={{ color: "oklch(0.55 0.16 140)" }}>
                ● Green = High (≥4 per planet / ≥28 total)
              </span>
              <span style={{ color: "oklch(0.55 0.22 25)" }}>
                ● Red = Low (≤2 per planet / ≤22 total)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
