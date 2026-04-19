import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

type ChartStyle = "north" | "south";

const PLANETS = [
  {
    symbol: "☉",
    name: "Sun",
    sign: "Pisces",
    degrees: "28.3°",
    nakshatra: "Revati",
    pada: "Pada 4",
    status: "About to leave Pisces",
    highlight: true,
  },
  {
    symbol: "🌙",
    name: "Moon",
    sign: "Capricorn",
    degrees: "24.1°",
    nakshatra: "Dhanishtha",
    pada: "Pada 1",
    status: "",
    highlight: false,
  },
  {
    symbol: "☿",
    name: "Mercury",
    sign: "Pisces",
    degrees: "2.1°",
    nakshatra: "Purva Bhadrapada",
    pada: "Pada 4",
    status: "",
    highlight: false,
  },
  {
    symbol: "♀",
    name: "Venus",
    sign: "Aries",
    degrees: "21.5°",
    nakshatra: "Bharani",
    pada: "Pada 3",
    status: "",
    highlight: false,
  },
  {
    symbol: "♂",
    name: "Mars",
    sign: "Pisces",
    degrees: "7.8°",
    nakshatra: "Uttara Bhadrapada",
    pada: "Pada 2",
    status: "",
    highlight: false,
  },
  {
    symbol: "♃",
    name: "Jupiter",
    sign: "Gemini",
    degrees: "22.5°",
    nakshatra: "Punarvasu",
    pada: "Pada 1",
    status: "",
    highlight: false,
  },
  {
    symbol: "♄",
    name: "Saturn",
    sign: "Pisces",
    degrees: "12.7°",
    nakshatra: "Uttara Bhadrapada",
    pada: "Pada 3",
    status: "",
    highlight: false,
  },
  {
    symbol: "☊",
    name: "Rahu",
    sign: "Aquarius",
    degrees: "12.6°",
    nakshatra: "Shatabhisha",
    pada: "Pada 2",
    status: "",
    highlight: false,
  },
  {
    symbol: "☋",
    name: "Ketu",
    sign: "Leo",
    degrees: "12.6°",
    nakshatra: "Magha",
    pada: "Pada 4",
    status: "",
    highlight: false,
  },
];

// South Indian chart: fixed zodiac signs. Layout:
// Row1: Sag(9) | Cap(10) | Aqu(11) | Pis(12)
// Row2: Sco(8) | center  | center  | Ari(1)
// Row3: Lib(7) | center  | center  | Tau(2)
// Row4: Vir(6) | Leo(5)  | Can(4)  | Gem(3)
const SIGN_PLANETS: Record<string, string[]> = {
  Pisces: ["Su", "Ma", "Me", "Sa"],
  Capricorn: ["Mo"],
  Aries: ["Ve"],
  Gemini: ["Ju"],
  Aquarius: ["Ra"],
  Leo: ["Ke"],
};

function SouthIndianChart({ isTransit }: { isTransit: boolean }) {
  const cellClass =
    "border border-[oklch(var(--border))] min-h-[64px] p-1.5 text-xs flex flex-col gap-0.5 relative";
  const signLabelClass =
    "text-[10px] text-[oklch(var(--muted-foreground))] font-medium leading-tight";
  const planetClass =
    "text-[11px] font-bold text-[oklch(var(--primary))] leading-tight";

  const cell = (sign: string) => {
    const abbrs = isTransit ? (SIGN_PLANETS[sign] ?? []) : [];
    return (
      <div className={cellClass} key={sign}>
        <span className={signLabelClass}>{sign.slice(0, 3)}</span>
        <div className="flex flex-wrap gap-0.5 mt-0.5">
          {abbrs.map((p) => (
            <span key={p} className={planetClass}>
              {p}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const centerCell = (
    <div className="border border-[oklch(var(--border))] bg-[oklch(var(--muted)/0.3)]" />
  );

  return (
    <div className="grid grid-cols-4 w-full aspect-square max-w-[280px] mx-auto rounded-sm overflow-hidden">
      {/* Row 1 */}
      {cell("Sagittarius")}
      {cell("Capricorn")}
      {cell("Aquarius")}
      {cell("Pisces")}
      {/* Row 2 */}
      {cell("Scorpio")}
      {centerCell}
      {centerCell}
      {cell("Aries")}
      {/* Row 3 */}
      {cell("Libra")}
      {centerCell}
      {centerCell}
      {cell("Taurus")}
      {/* Row 4 */}
      {cell("Virgo")}
      {cell("Leo")}
      {cell("Cancer")}
      {cell("Gemini")}
    </div>
  );
}

function NorthIndianChart({ isTransit }: { isTransit: boolean }) {
  const cellClass =
    "border border-[oklch(var(--border))] min-h-[48px] p-1 text-xs flex flex-col gap-0.5 relative";
  const signLabelClass = "text-[10px] text-[oklch(var(--muted-foreground))]";
  const planetClass = "text-[11px] font-bold text-[oklch(var(--primary))]";

  const houseSign: Record<number, string> = {
    1: "Scorpio",
    2: "Sagittarius",
    3: "Capricorn",
    4: "Aquarius",
    5: "Pisces",
    6: "Aries",
    7: "Taurus",
    8: "Gemini",
    9: "Cancer",
    10: "Leo",
    11: "Virgo",
    12: "Libra",
  };

  const cell = (house: number) => {
    const sign = houseSign[house];
    const abbrs = isTransit ? (SIGN_PLANETS[sign] ?? []) : [];
    return (
      <div className={cellClass} key={house}>
        <span className={signLabelClass}>{house}</span>
        <div className="flex flex-wrap gap-0.5">
          {abbrs.map((p) => (
            <span key={p} className={planetClass}>
              {p}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // North Indian diamond layout (4x4 with triangular houses)
  return (
    <div className="grid grid-cols-4 w-full aspect-square max-w-[280px] mx-auto rounded-sm overflow-hidden">
      {cell(12)}
      {cell(1)}
      {cell(2)}
      {cell(3)}
      {cell(11)}
      <div className="border border-[oklch(var(--border))] bg-[oklch(var(--muted)/0.2)] col-span-2" />
      {cell(4)}
      {cell(10)}
      <div className="border border-[oklch(var(--border))] bg-[oklch(var(--muted)/0.2)] col-span-2" />
      {cell(5)}
      {cell(9)}
      {cell(8)}
      {cell(7)}
      {cell(6)}
    </div>
  );
}

function ChartPanel({
  title,
  subtitle,
  badge,
  badgeVariant,
  dateLabel,
  isTransit,
}: {
  title: string;
  subtitle: string;
  badge: string;
  badgeVariant: "default" | "secondary" | "destructive" | "outline";
  dateLabel: string;
  isTransit: boolean;
}) {
  const [style, setStyle] = useState<ChartStyle>("south");

  return (
    <div className="bg-[oklch(var(--card)/0.6)] border border-[oklch(var(--border))] rounded-xl p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-[oklch(var(--foreground))] text-sm">
            {title}
          </h3>
          <p className="text-[oklch(var(--muted-foreground))] text-xs">
            {subtitle}
          </p>
        </div>
        <Badge variant={badgeVariant} className="text-xs shrink-0">
          {badge}
        </Badge>
      </div>

      {/* Toggle */}
      <div className="flex gap-1.5">
        {(["north", "south"] as ChartStyle[]).map((s) => (
          <button
            key={s}
            type="button"
            data-ocid={`chart-style-${s}-${isTransit ? "transit" : "birth"}`}
            onClick={() => setStyle(s)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors duration-200 ${
              style === s
                ? "bg-[oklch(var(--primary))] text-[oklch(var(--primary-foreground))]"
                : "bg-[oklch(var(--muted))] text-[oklch(var(--muted-foreground))] hover:bg-[oklch(var(--accent)/0.4)]"
            }`}
          >
            {s === "north" ? "North" : "South"}
          </button>
        ))}
      </div>

      {/* Date label */}
      <p className="text-[10px] text-[oklch(var(--muted-foreground))] font-mono">
        {style === "south" ? "South Indian" : "North Indian"} • {dateLabel}
      </p>

      {/* Chart */}
      {style === "south" ? (
        <SouthIndianChart isTransit={isTransit} />
      ) : (
        <NorthIndianChart isTransit={isTransit} />
      )}
    </div>
  );
}

export default function CurrentTransits() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString("en-IN", { hour12: false });

  return (
    <div className="min-h-screen bg-[oklch(var(--background))] text-[oklch(var(--foreground))]">
      {/* Page Header */}
      <div className="bg-[oklch(var(--card))] border-b border-[oklch(var(--border))] px-4 py-5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold font-display text-[oklch(var(--primary))]">
              Current Transits
            </h1>
            <p className="text-[oklch(var(--muted-foreground))] text-sm mt-0.5">
              Real-time planetary positions
            </p>
          </div>
          {/* LIVE indicator */}
          <div className="flex items-center gap-2 bg-[oklch(var(--card))] border border-[oklch(var(--border))] rounded-lg px-3 py-2 shrink-0">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-green-500 font-bold text-xs tracking-widest">
              LIVE
            </span>
            <span className="text-[oklch(var(--muted-foreground))] text-xs font-mono">
              •
            </span>
            <span className="font-mono text-xs text-[oklch(var(--foreground))]">
              {timeStr}
            </span>
            <span className="text-[oklch(var(--muted-foreground))] text-xs font-mono">
              •
            </span>
            <span className="font-mono text-xs text-[oklch(var(--muted-foreground))]">
              12/04/2026
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        {/* Birth vs Transit Comparison */}
        <section>
          <h2 className="text-lg font-semibold font-display text-[oklch(var(--foreground))] mb-4">
            Birth vs Transit Comparison
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartPanel
              title="Birth Chart"
              subtitle="Your natal positions"
              badge="Static Positions"
              badgeVariant="secondary"
              dateLabel="Static"
              isTransit={false}
            />
            <ChartPanel
              title="Transit Chart"
              subtitle="Current planetary positions"
              badge="Live"
              badgeVariant="default"
              dateLabel="2026-04-12 16:42"
              isTransit={true}
            />
          </div>
        </section>

        {/* Live Planet Positions Table */}
        <section data-ocid="live-planet-positions">
          <div className="bg-[oklch(var(--card))] border border-[oklch(var(--border))] rounded-xl overflow-hidden">
            {/* Table Header Bar */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[oklch(var(--primary)/0.12)] border-b border-[oklch(var(--border))] flex-wrap">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[oklch(var(--foreground))]">
                  Live Planet Positions
                </h3>
                <span className="text-[oklch(var(--muted-foreground))] text-xs font-mono">
                  2026-04-12 16:42
                </span>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-xs">
                1 Transitioning
              </Badge>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[oklch(var(--primary)/0.18)]">
                    <th className="text-left px-4 py-2.5 font-semibold text-[oklch(var(--foreground))] border-b border-[oklch(var(--border))]">
                      Planet
                    </th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[oklch(var(--foreground))] border-b border-[oklch(var(--border))]">
                      Sign
                    </th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[oklch(var(--foreground))] border-b border-[oklch(var(--border))]">
                      Degrees
                    </th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[oklch(var(--foreground))] border-b border-[oklch(var(--border))] hidden sm:table-cell">
                      Nakshatra
                    </th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[oklch(var(--foreground))] border-b border-[oklch(var(--border))] hidden md:table-cell">
                      Pada
                    </th>
                    <th className="text-left px-4 py-2.5 font-semibold text-[oklch(var(--foreground))] border-b border-[oklch(var(--border))]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PLANETS.map((planet, idx) => (
                    <tr
                      key={planet.name}
                      data-ocid={`planet-row-${planet.name.toLowerCase()}`}
                      className={`
                        border-b border-[oklch(var(--border)/0.5)] transition-colors
                        ${
                          planet.highlight
                            ? "bg-amber-50 dark:bg-amber-950/30"
                            : idx % 2 === 0
                              ? "bg-[oklch(var(--background))]"
                              : "bg-[oklch(var(--muted)/0.3)]"
                        }
                      `}
                    >
                      <td className="px-4 py-2.5 font-medium text-[oklch(var(--foreground))]">
                        <span className="flex items-center gap-2">
                          <span className="text-base">{planet.symbol}</span>
                          <span>{planet.name}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-[oklch(var(--foreground))]">
                        {planet.sign}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[oklch(var(--primary))] font-semibold">
                        {planet.degrees}
                      </td>
                      <td className="px-4 py-2.5 text-[oklch(var(--muted-foreground))] hidden sm:table-cell">
                        {planet.nakshatra}
                      </td>
                      <td className="px-4 py-2.5 text-[oklch(var(--muted-foreground))] hidden md:table-cell">
                        {planet.pada}
                      </td>
                      <td className="px-4 py-2.5">
                        {planet.status ? (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border border-amber-300 text-xs font-medium">
                            {planet.status}
                          </Badge>
                        ) : (
                          <span className="text-[oklch(var(--muted-foreground))]">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Transit Information Footer */}
        <section>
          <div className="bg-[oklch(var(--card))] border border-[oklch(var(--border))] rounded-xl p-4">
            <h3 className="text-sm font-semibold text-[oklch(var(--foreground))] mb-3 flex items-center gap-2">
              <span className="inline-block w-1.5 h-4 rounded-full bg-[oklch(var(--primary))]" />
              Transit Information
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Date", value: "2026-04-12" },
                { label: "Time", value: "16:42" },
                { label: "Location", value: "Mohali, Punjab, India" },
                { label: "Coordinates", value: "30.70, 76.72" },
                { label: "Last Updated", value: "12 Apr 2026, 16:42:46" },
              ].map((info) => (
                <div
                  key={info.label}
                  className="bg-[oklch(var(--muted)/0.4)] rounded-lg px-3 py-2"
                >
                  <p className="text-[10px] text-[oklch(var(--muted-foreground))] uppercase tracking-wide font-medium">
                    {info.label}
                  </p>
                  <p className="text-sm text-[oklch(var(--foreground))] font-mono mt-0.5 break-words">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
