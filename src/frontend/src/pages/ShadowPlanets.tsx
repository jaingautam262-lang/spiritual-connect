import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const aprakashaGrahas = [
  {
    id: "dhuma",
    name: "Dhuma",
    meaning: "Smoke",
    description:
      "Represents confusion, illusions, and hidden enemies. Can indicate areas where clarity is needed.",
    calculation: "13°20' + Sun's longitude",
    symbol: "☁",
  },
  {
    id: "vyatipata",
    name: "Vyatipata",
    meaning: "Calamity",
    description:
      "Indicates potential difficulties, obstacles, and areas requiring extra caution.",
    calculation: "360° − Dhuma's longitude",
    symbol: "⚡",
  },
  {
    id: "parivesha",
    name: "Parivesha",
    meaning: "Halo",
    description:
      "Represents protection, divine grace, and positive influences that surround difficulties.",
    calculation: "180° + Vyatipata's longitude",
    symbol: "◎",
  },
  {
    id: "indrachapa",
    name: "Indrachapa",
    meaning: "Rainbow",
    description:
      "Indicates hope, promise, and positive outcomes after challenges.",
    calculation: "180° + Parivesha's longitude",
    symbol: "🌈",
  },
  {
    id: "upaketu",
    name: "Upaketu",
    meaning: "Sub-Ketu",
    description:
      "A secondary Ketu-like influence, often indicating spiritual insights and detachment.",
    calculation: "16°40' + Rahu's longitude",
    symbol: "☋",
  },
];

const upagrahas = [
  {
    name: "Kala",
    description:
      "Represents time, death, and transformation. Influences timing of events.",
    rules: "Time consciousness, deadlines, transformative periods",
    color: "from-amber-900/40 to-amber-800/20",
  },
  {
    name: "Mrityu",
    description:
      "Indicates areas of potential danger or endings that lead to new beginnings.",
    rules: "Transformation, endings, rebirth, caution areas",
    color: "from-red-900/40 to-red-800/20",
  },
  {
    name: "Artha",
    description: "Related to wealth, resources, and material pursuits.",
    rules: "Financial matters, resources, material success",
    color: "from-yellow-900/40 to-yellow-800/20",
  },
  {
    name: "Yama",
    description: "Represents discipline, restrictions, and moral boundaries.",
    rules: "Self-discipline, moral choices, restrictions",
    color: "from-slate-800/60 to-slate-700/30",
  },
  {
    name: "Gulika",
    description:
      "A malefic influence that can indicate areas of challenge or delay.",
    rules: "Obstacles, delays, areas requiring extra effort",
    color: "from-purple-900/40 to-purple-800/20",
  },
  {
    name: "Mandi",
    description:
      "Represents sluggishness, delays, and areas where progress is slow.",
    rules: "Slow progress, patience required, steady work",
    color: "from-indigo-900/40 to-indigo-800/20",
  },
];

const shadowPositions = [
  { symbol: "Dh", name: "Dhoom", zodiac: "Aquarius", degree: "28° 45' 12\"" },
  { symbol: "Vy", name: "Vyatipata", zodiac: "Taurus", degree: "01° 14' 48\"" },
  {
    symbol: "Pv",
    name: "Parivesha",
    zodiac: "Scorpio",
    degree: "01° 14' 48\"",
  },
  { symbol: "In", name: "Indrachapa", zodiac: "Leo", degree: "28° 45' 12\"" },
  { symbol: "Up", name: "Upaketu", zodiac: "Virgo", degree: "15° 25' 12\"" },
  { symbol: "Ka", name: "Kala", zodiac: "Libra", degree: "14° 34' 48\"" },
  { symbol: "Mr", name: "Mrityu", zodiac: "Scorpio", degree: "19° 44' 24\"" },
  {
    symbol: "Ar",
    name: "Ardhaprahara",
    zodiac: "Sagittarius",
    degree: "08° 03' 36\"",
  },
  {
    symbol: "Ya",
    name: "Yamaghantaka",
    zodiac: "Sagittarius",
    degree: "28° 30' 36\"",
  },
  { symbol: "Gu", name: "Gulika", zodiac: "Aquarius", degree: "19° 38' 24\"" },
  { symbol: "Ma", name: "Mandi", zodiac: "Aquarius", degree: "19° 38' 24\"" },
];

// Map zodiac sign → house index (0-based, starting from Aries = house 0)
const zodiacHouseMap: Record<string, number> = {
  Aries: 0,
  Taurus: 1,
  Gemini: 2,
  Cancer: 3,
  Leo: 4,
  Virgo: 5,
  Libra: 6,
  Scorpio: 7,
  Sagittarius: 8,
  Capricorn: 9,
  Aquarius: 10,
  Pisces: 11,
};

const keyPrinciples = [
  "Shadow planets amplify the houses they occupy",
  "They create karmic lessons and spiritual growth opportunities",
  "Rahu brings material desires and worldly focus",
  "Ketu brings detachment and spiritual wisdom",
  "Other shadows influence specific life areas subtly",
  "Their effects are often felt during their transits and periods",
];

const analysisApproach = [
  "Study the Rahu-Ketu axis first (houses and signs)",
  "Look for conjunctions with natal planets",
  "Consider aspects from other planets",
  "Analyze the house lords where shadows are placed",
  "Study their relationship with Lagna and Moon",
  "Consider current transits for timing predictions",
];

type Tab = "overview" | "aprakasha" | "upagrahas" | "charts";

// ─── Sub-components ───────────────────────────────────────────────────────────

function InterpretationGuidelines() {
  return (
    <div className="mt-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-muted/20 p-6">
      <h3 className="font-display text-lg font-semibold text-primary mb-4">
        Interpretation Guidelines
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
            Key Principles
          </p>
          <ul className="space-y-2">
            {keyPrinciples.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
            Analysis Approach
          </p>
          <ul className="space-y-2">
            {analysisApproach.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// South Indian Kundali grid (pure CSS 4×4 grid)
function SouthIndianChart({
  planetsInHouses,
}: { planetsInHouses: Record<number, string[]> }) {
  // 16 cells: indices 0-15
  // Outer 12 houses, inner 4 cells = center (unused)
  // Cell index → house number (1-12):
  // 0=H12, 1=H1, 2=H2, 3=H3
  // 4=H11, 5=center, 6=center, 7=H4
  // 8=H10, 9=center, 10=center, 11=H5
  // 12=H9, 13=H8, 14=H7, 15=H6
  const cellRows: Array<{ key: string; house: number | null }> = [
    { key: "c0", house: 12 },
    { key: "c1", house: 1 },
    { key: "c2", house: 2 },
    { key: "c3", house: 3 },
    { key: "c4", house: 11 },
    { key: "c5", house: null },
    { key: "c6", house: null },
    { key: "c7", house: 4 },
    { key: "c8", house: 10 },
    { key: "c9", house: null },
    { key: "c10", house: null },
    { key: "c11", house: 5 },
    { key: "c12", house: 9 },
    { key: "c13", house: 8 },
    { key: "c14", house: 7 },
    { key: "c15", house: 6 },
  ];

  return (
    <div className="w-full aspect-square grid grid-cols-4 grid-rows-4 border border-primary/30 rounded-lg overflow-hidden">
      {cellRows.map(({ key, house }) => {
        const isCenter = house === null;
        const planets = house ? (planetsInHouses[house] ?? []) : [];
        return (
          <div
            key={key}
            className={`border border-primary/20 flex flex-col items-center justify-center p-1 min-h-0 ${
              isCenter
                ? "bg-gradient-to-br from-primary/10 to-accent/5"
                : "bg-card/80 hover:bg-primary/5 transition-colors"
            }`}
          >
            {!isCenter && (
              <>
                <span className="text-[9px] text-muted-foreground font-mono leading-none">
                  {house}
                </span>
                <div className="flex flex-wrap justify-center gap-0.5 mt-0.5">
                  {planets.map((p) => (
                    <span
                      key={p}
                      className="text-[8px] font-bold text-primary leading-tight"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </>
            )}
            {isCenter && (
              <span className="text-[8px] text-primary/40 font-display">॥</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Build house→planets map for S1 chart (Scorpio ascendant = house 1 = sign index 7)
function buildS1HousePlanets(): Record<number, string[]> {
  const ascendantSign = 7; // Scorpio
  const map: Record<number, string[]> = {};
  for (const pos of shadowPositions) {
    const signIndex = zodiacHouseMap[pos.zodiac] ?? 0;
    const house = ((signIndex - ascendantSign + 12) % 12) + 1;
    if (!map[house]) map[house] = [];
    map[house].push(pos.symbol);
  }
  return map;
}

// ─── Tab Content Components ────────────────────────────────────────────────────

function TabOverview() {
  return (
    <div className="space-y-8">
      {/* Primary Shadow Planets */}
      <section>
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Primary Shadow Planets
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {/* Rahu */}
          <div
            data-ocid="shadow-rahu-card"
            className="relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-900/20 via-card to-card p-6 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-amber-500/5 -translate-y-8 translate-x-8" />
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-primary flex items-center justify-center text-xl shadow-lg">
                ☊
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Rahu
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs border-amber-500/40 text-amber-600"
                  >
                    North Node
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Represents desires, obsessions, worldly achievements, and
                  material pursuits. Shows where you need to develop and grow in
                  this lifetime.
                </p>
              </div>
            </div>
          </div>

          {/* Ketu */}
          <div
            data-ocid="shadow-ketu-card"
            className="relative rounded-2xl border border-slate-500/30 bg-gradient-to-br from-slate-800/30 via-card to-card p-6 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-slate-500/5 -translate-y-8 translate-x-8" />
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-xl shadow-lg">
                ☋
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    Ketu
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs border-slate-400/40 text-slate-400"
                  >
                    South Node
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Represents past life karma, spiritual insights, detachment,
                  and moksha. Shows talents you already possess and areas to
                  release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Influence Points */}
      <section>
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Subtle Influence Points
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: "Lunar Nodes",
              desc: "Rahu (North Node) and Ketu (South Node) — primary karmic indicators",
              icon: "⊕",
            },
            {
              title: "Aprakasha Grahas",
              desc: "Invisible planets like Dhuma, Vyatipata, Parivesha, etc.",
              icon: "◉",
            },
            {
              title: "Upagrahas",
              desc: "Sub-planets like Dhuma, Vyatipata, Chandra-Ketu, etc.",
              icon: "◎",
            },
            {
              title: "Sensitive Points",
              desc: "Calculated points that influence timing and events",
              icon: "✦",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-xl border border-primary/15 bg-gradient-to-br from-card to-muted/20 p-4 hover:border-primary/30 transition-colors"
            >
              <span className="mt-0.5 text-lg text-primary flex-shrink-0">
                {item.icon}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-foreground mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <InterpretationGuidelines />
    </div>
  );
}

function TabAprakasha() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-5">
        <h2 className="font-display text-xl font-semibold text-foreground mb-1">
          Aprakasha Grahas (Invisible Planets)
        </h2>
        <p className="text-sm text-muted-foreground">
          These are mathematical points calculated from the positions of visible
          planets, representing hidden influences and karmic patterns.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {aprakashaGrahas.map((graha) => (
          <div
            key={graha.id}
            data-ocid={`aprakasha-${graha.id}`}
            className="rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-muted/20 p-5 flex flex-col gap-3 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-lg flex-shrink-0">
                {graha.symbol}
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-foreground">
                  {graha.name}
                </h3>
                <p className="text-xs text-primary font-medium">
                  {graha.meaning}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {graha.description}
            </p>
            <div className="rounded-lg bg-primary/8 border border-primary/20 px-3 py-2">
              <p className="text-xs font-mono text-accent">
                <span className="text-muted-foreground mr-1">Calculation:</span>
                {graha.calculation}
              </p>
            </div>
          </div>
        ))}
      </div>

      <InterpretationGuidelines />
    </div>
  );
}

function TabUpagrahas() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-5">
        <h2 className="font-display text-xl font-semibold text-foreground mb-1">
          Upagrahas (Sub-planets)
        </h2>
        <p className="text-sm text-muted-foreground">
          Minor planets calculated from the Sun and other celestial factors,
          influencing specific areas of life and timing.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {upagrahas.map((u) => (
          <div
            key={u.name}
            data-ocid={`upagraha-${u.name.toLowerCase()}`}
            className={`rounded-2xl border border-primary/20 bg-gradient-to-br ${u.color} p-5 hover:border-primary/40 transition-colors`}
          >
            <h3 className="font-display font-bold text-foreground mb-2">
              {u.name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {u.description}
            </p>
            <div className="flex items-start gap-2">
              <span className="text-primary text-xs font-semibold flex-shrink-0 mt-0.5">
                Rules:
              </span>
              <p className="text-xs text-muted-foreground">{u.rules}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Shadow Planet Positions Table */}
      <div className="rounded-2xl border border-primary/20 bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Shadow Planet Positions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="shadow-positions-table">
            <thead>
              <tr className="border-b border-primary/10 bg-muted/30">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide w-16">
                  Symbol
                </th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Shadow
                </th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Zodiac
                </th>
                <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                  Degree
                </th>
              </tr>
            </thead>
            <tbody>
              {shadowPositions.map((row, i) => (
                <tr
                  key={row.symbol}
                  className={`border-b border-primary/5 hover:bg-primary/5 transition-colors ${i % 2 === 0 ? "bg-card" : "bg-muted/10"}`}
                >
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-primary/15 text-primary text-xs font-bold font-mono">
                      {row.symbol}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-foreground">
                    {row.name}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {row.zodiac}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-accent text-xs">
                    {row.degree}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabCharts() {
  const [s1Style, setS1Style] = useState<"north" | "south">("south");
  const [d1Style, setD1Style] = useState<"north" | "south">("south");
  const s1HousePlanets = buildS1HousePlanets();

  return (
    <div className="space-y-6">
      {/* Chart Panels */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* S1 — Shadow Planets Chart */}
        <div
          className="rounded-2xl border border-primary/20 bg-card overflow-hidden"
          data-ocid="s1-chart-panel"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
            <div>
              <p className="font-display font-semibold text-foreground text-sm">
                Shadow Planets Chart (S1)
              </p>
              <p className="text-xs text-primary mt-0.5">
                {s1Style === "north" ? "North Indian" : "South Indian"}
              </p>
            </div>
            <div className="flex rounded-lg border border-primary/20 overflow-hidden">
              {(["north", "south"] as const).map((style) => (
                <button
                  type="button"
                  key={style}
                  onClick={() => setS1Style(style)}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    s1Style === style
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`s1-style-${style}`}
                >
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4">
            <SouthIndianChart planetsInHouses={s1HousePlanets} />
            <p className="text-center text-xs text-primary mt-2 font-semibold">
              Live Positions
            </p>
          </div>
        </div>

        {/* D1 — Birth Chart */}
        <div
          className="rounded-2xl border border-primary/20 bg-card overflow-hidden"
          data-ocid="d1-chart-panel"
        >
          <div className="flex items-center justify-between px-5 py-3 border-b border-primary/10 bg-gradient-to-r from-primary/5 to-transparent">
            <div>
              <p className="font-display font-semibold text-foreground text-sm">
                Birth Chart (D1)
              </p>
              <p className="text-xs text-primary mt-0.5">
                {d1Style === "north" ? "North Indian" : "South Indian"}
              </p>
            </div>
            <div className="flex rounded-lg border border-primary/20 overflow-hidden">
              {(["north", "south"] as const).map((style) => (
                <button
                  type="button"
                  key={style}
                  onClick={() => setD1Style(style)}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    d1Style === style
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid={`d1-style-${style}`}
                >
                  {style.charAt(0).toUpperCase() + style.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4">
            <SouthIndianChart
              planetsInHouses={{
                1: ["As", "Ve"],
                10: ["Su", "Me", "Ke"],
                3: ["Mo"],
                5: ["Ma"],
                9: ["Ju"],
                8: ["℞Sa"],
                7: ["Ra"],
              }}
            />
            <p className="text-center text-xs text-muted-foreground mt-2">
              Static Positions
            </p>
          </div>
        </div>
      </div>

      {/* Chart Interpretation */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-card to-muted/20 p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          Chart Interpretation
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          The S1 chart shows the positions of all shadow planets and sensitive
          points alongside the D1 birth chart for comparison. Pay special
          attention to:
        </p>
        <ul className="space-y-2">
          {[
            "Houses occupied by Rahu and Ketu",
            "Aspects to/from shadow planets",
            "Conjunctions with visible planets",
            "Nodal axis across houses",
            "Clusters of shadow planets",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Shadow Planet Positions Legend */}
      <div className="rounded-2xl border border-primary/15 bg-card p-5">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">
          Position Reference
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {shadowPositions.map((p) => (
            <div key={p.symbol} className="flex items-center gap-2 text-xs">
              <span className="w-6 h-6 rounded bg-primary/15 text-primary font-bold font-mono flex items-center justify-center flex-shrink-0 text-[10px]">
                {p.symbol}
              </span>
              <span className="text-muted-foreground truncate">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "aprakasha", label: "Aprakasha Grahas" },
  { id: "upagrahas", label: "Upagrahas" },
  { id: "charts", label: "Charts" },
];

export default function ShadowPlanets() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-card via-card to-background border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl shadow-md">
              ☊
            </div>
            <Badge
              variant="outline"
              className="border-primary/30 text-primary text-xs"
            >
              Vedic Astrology
            </Badge>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            Shadow Planets
          </h1>
          <p className="text-base font-medium text-primary mb-2">
            Aprakasha &amp; Upagraha
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Shadow planets are mathematical calculations that represent hidden
            or subtle influences in Vedic astrology. They include Rahu, Ketu,
            and other sensitive points that reveal karmic patterns and spiritual
            lessons.
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="sticky top-0 z-10 bg-card/90 backdrop-blur border-b border-primary/10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div
            className="flex gap-0 overflow-x-auto"
            role="tablist"
            data-ocid="shadow-tab-bar"
          >
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-ocid={`tab-${tab.id}`}
                className={`relative px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === "overview" && <TabOverview />}
        {activeTab === "aprakasha" && <TabAprakasha />}
        {activeTab === "upagrahas" && <TabUpagrahas />}
        {activeTab === "charts" && <TabCharts />}
      </div>
    </div>
  );
}
