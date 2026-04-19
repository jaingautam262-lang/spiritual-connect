import { ChevronDown, ChevronUp, Edit2, Loader2, Star } from "lucide-react";
// VedicDashboard — Personalized Vedic Astrology Dashboard
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { LIFE_PREDICTIONS } from "../data/lifePredictionsData";
import { useAstrology } from "../hooks/useAstrology";
import type { BirthData } from "../hooks/useAstrology";
import { useNumerology } from "../hooks/useNumerology";
import { SpeakerButton } from "../hooks/useSpeaker";
import { NAKSHATRAS, ZODIAC_SIGNS } from "../utils/vedicAstrology";

// ─── City Presets ─────────────────────────────────────────────────────────────
const CITY_PRESETS: Record<string, { lat: number; lng: number }> = {
  delhi: { lat: 28.6139, lng: 77.209 },
  mumbai: { lat: 19.076, lng: 72.8777 },
  chennai: { lat: 13.0827, lng: 80.2707 },
  kolkata: { lat: 22.5726, lng: 88.3639 },
  bangalore: { lat: 12.9716, lng: 77.5946 },
  surat: { lat: 21.1702, lng: 72.8311 },
  ahmedabad: { lat: 23.0225, lng: 72.5714 },
  pune: { lat: 18.5204, lng: 73.8567 },
  hyderabad: { lat: 17.385, lng: 78.4867 },
  jaipur: { lat: 26.9124, lng: 75.7873 },
};

function detectCity(pob: string): { lat: number; lng: number } | null {
  const lower = pob.toLowerCase().trim();
  for (const [city, coords] of Object.entries(CITY_PRESETS)) {
    if (lower.includes(city)) return coords;
  }
  return null;
}

// ─── Panel Component ──────────────────────────────────────────────────────────
interface PanelProps {
  id: string;
  title: string;
  speakerText: string;
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
}

function Panel({
  id,
  title,
  speakerText,
  children,
  expanded,
  onToggle,
}: PanelProps) {
  return (
    <div
      data-ocid={`${id}.panel`}
      className="rounded-xl ornamental-border bg-card mb-5 overflow-hidden"
      style={{ animation: "chartFadeIn 0.5s ease both" }}
    >
      <button
        type="button"
        data-ocid={`${id}.toggle`}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="font-heading text-base font-semibold text-foreground flex items-center gap-2">
          <Star className="w-4 h-4 text-primary shrink-0" />
          {title}
        </span>
        <span className="flex items-center gap-2">
          <SpeakerButton text={speakerText} size="sm" />
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </span>
      </button>
      {expanded && (
        <div className="px-5 pb-5 border-t border-border/50">{children}</div>
      )}
    </div>
  );
}

// ─── Planet Symbol Map ────────────────────────────────────────────────────────
const PLANET_ABBR: Record<string, string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
};
const PLANET_COLOR: Record<string, string> = {
  Sun: "#FF9933",
  Moon: "#C0C0C0",
  Mars: "#FF4444",
  Mercury: "#00A86B",
  Jupiter: "#FFD700",
  Venus: "#FF69B4",
  Saturn: "#888888",
  Rahu: "#4B0082",
  Ketu: "#8B4513",
};
const MULANK_PLANETS: Record<
  number,
  { planet: string; planetHi: string; color: string }
> = {
  1: { planet: "Sun", planetHi: "सूर्य", color: "#FF9933" },
  2: { planet: "Moon", planetHi: "चंद्र", color: "#C0C0C0" },
  3: { planet: "Jupiter", planetHi: "गुरु", color: "#FFD700" },
  4: { planet: "Rahu", planetHi: "राहु", color: "#4B0082" },
  5: { planet: "Mercury", planetHi: "बुध", color: "#00A86B" },
  6: { planet: "Venus", planetHi: "शुक्र", color: "#FF69B4" },
  7: { planet: "Ketu", planetHi: "केतु", color: "#8B4513" },
  8: { planet: "Saturn", planetHi: "शनि", color: "#888888" },
  9: { planet: "Mars", planetHi: "मंगल", color: "#FF4444" },
};

// ─── North Indian Lagna Chart SVG ─────────────────────────────────────────────
interface LagnaChartProps {
  planetPositions: Record<
    string,
    { sign: number; degree: number; retrograde?: boolean }
  >;
  ascendantSign: number;
}

function NorthIndianChart({ planetPositions, ascendantSign }: LagnaChartProps) {
  const SIZE = 360;
  const C = SIZE / 2;

  // Map house -> sign
  const houseSign: Record<number, number> = {};
  for (let h = 1; h <= 12; h++) {
    houseSign[h] = ((ascendantSign - 1 + h - 1) % 12) + 1;
  }

  // Map sign -> planet abbreviations
  const signPlanets: Record<number, string[]> = {};
  for (let s = 1; s <= 12; s++) signPlanets[s] = [];
  for (const [planet, data] of Object.entries(planetPositions)) {
    if (planet === "ASC") continue;
    const abbr = PLANET_ABBR[planet] || planet.slice(0, 2);
    if (!signPlanets[data.sign]) signPlanets[data.sign] = [];
    signPlanets[data.sign].push(abbr);
  }

  // North Indian chart house polygons: fixed house positions, signs rotate
  const chartBoxes: Array<{ h: number; poly: string; cx: number; cy: number }> =
    [
      {
        h: 1,
        poly: `${C},0 ${SIZE},${C} ${C},${C} 0,${C}`,
        cx: C,
        cy: C * 0.42,
      },
      {
        h: 2,
        poly: `${C},0 ${SIZE},0 ${SIZE},${C}`,
        cx: C * 1.65,
        cy: C * 0.35,
      },
      {
        h: 3,
        poly: `${SIZE},0 ${SIZE},${SIZE} ${SIZE},${C}`,
        cx: C * 1.88,
        cy: C,
      },
      {
        h: 4,
        poly: `${SIZE},${C} ${SIZE},${SIZE} ${C},${C}`,
        cx: C * 1.65,
        cy: C * 1.65,
      },
      {
        h: 5,
        poly: `${C},${C} ${SIZE},${SIZE} ${C},${SIZE} 0,${SIZE}`,
        cx: C,
        cy: C * 1.58,
      },
      {
        h: 6,
        poly: `0,${SIZE} ${C},${SIZE} ${C},${C}`,
        cx: C * 0.35,
        cy: C * 1.65,
      },
      { h: 7, poly: `0,${C} 0,${SIZE} ${C},${C}`, cx: C * 0.12, cy: C },
      { h: 8, poly: `0,${C} ${C},${C} 0,0`, cx: C * 0.35, cy: C * 0.35 },
      { h: 9, poly: `0,0 ${C},0 ${C},${C}`, cx: C * 0.2, cy: C * 0.2 },
      { h: 10, poly: `${C},0 ${SIZE},0 ${C},${C}`, cx: C * 1.5, cy: C * 0.18 },
      {
        h: 11,
        poly: `${SIZE},0 ${SIZE},${C} ${C},${C}`,
        cx: C * 1.88,
        cy: C * 0.35,
      },
      { h: 12, poly: `${C},0 0,0 0,${C} ${C},${C}`, cx: C * 0.5, cy: C * 0.45 },
    ];

  return (
    <div className="flex justify-center">
      <svg
        width="100%"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="max-w-sm mx-auto rounded-lg"
        style={{ background: "oklch(0.97 0.015 85)" }}
        aria-label="North Indian Lagna Chart"
        role="img"
      >
        <title>North Indian Birth Chart (Kundali)</title>
        {chartBoxes.map(({ h, poly, cx, cy }) => {
          const isAsc = h === 1;
          const signNum = houseSign[h];
          const planetsHere = signPlanets[signNum] || [];
          const zodiac = ZODIAC_SIGNS.find((z) => z.num === signNum);
          return (
            <g key={`house-${h}`}>
              <polygon
                points={poly}
                fill={isAsc ? "oklch(0.68 0.2 48 / 0.12)" : "transparent"}
                stroke="oklch(0.78 0.14 75)"
                strokeWidth="1.5"
              />
              <text
                x={cx}
                y={cy - 8}
                textAnchor="middle"
                fontSize="9"
                fill="oklch(0.55 0.04 45)"
                fontFamily="sans-serif"
              >
                {h}
              </text>
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontSize="8"
                fill="oklch(0.48 0.04 40)"
                fontFamily="sans-serif"
              >
                {zodiac?.nameHi?.slice(0, 3)}
              </text>
              {planetsHere.slice(0, 4).map((p, pi) => {
                const pKey =
                  Object.keys(PLANET_ABBR).find((k) => PLANET_ABBR[k] === p) ||
                  "Sun";
                const offsetX = pi % 2 === 0 ? -10 : 10;
                const offsetY = cy + 16 + Math.floor(pi / 2) * 12;
                return (
                  <text
                    key={`${h}-${pKey}`}
                    x={cx + offsetX}
                    y={offsetY}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="bold"
                    fill={PLANET_COLOR[pKey] || "#FF9933"}
                    fontFamily="sans-serif"
                  >
                    {p}
                  </text>
                );
              })}
            </g>
          );
        })}
        <text
          x={C}
          y={18}
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="oklch(0.62 0.18 48)"
          fontFamily="sans-serif"
        >
          Asc
        </text>
      </svg>
    </div>
  );
}

// ─── Lo Shu Grid Display ──────────────────────────────────────────────────────
const LO_SHU_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

function LoShuGridDisplay({
  loShuNumbers,
  numberFrequency,
}: { loShuNumbers: number[]; numberFrequency: Record<number, number> }) {
  const presentSet = new Set(loShuNumbers);
  return (
    <div className="grid grid-cols-3 gap-1.5 w-36">
      {LO_SHU_LAYOUT.map((row) =>
        row.map((num) => {
          const present = presentSet.has(num);
          const freq = numberFrequency[num] || 0;
          return (
            <div
              key={num}
              className={[
                "w-10 h-10 flex items-center justify-center rounded-lg font-bold text-base relative",
                present
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground",
              ].join(" ")}
            >
              {num}
              {freq > 1 && (
                <span className="absolute -top-1 -right-1 text-[9px] bg-accent text-accent-foreground rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {freq}
                </span>
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}

// ─── Dasha Tree ───────────────────────────────────────────────────────────────
function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function getDiff(from: Date, to: Date) {
  const ms = to.getTime() - from.getTime();
  if (ms <= 0) return "Completed";
  const days = ms / 86400000;
  const years = Math.floor(days / 365.25);
  const months = Math.floor((days % 365.25) / 30.4);
  if (years > 0) return `${years}y ${months}m remaining`;
  return `${months}m remaining`;
}

interface DashaItemProps {
  lord: string;
  startDate: Date;
  endDate: Date;
  years: number;
  isCurrent: boolean;
  itemIndex: number;
  antardashas?: Array<{
    lord: string;
    startDate: Date;
    endDate: Date;
    years: number;
  }>;
}

function DashaItem({
  lord,
  startDate,
  endDate,
  isCurrent,
  itemIndex,
  antardashas,
}: DashaItemProps) {
  const [open, setOpen] = useState(isCurrent);
  const now = new Date();

  return (
    <div
      className={[
        "rounded-lg border mb-2 overflow-hidden",
        isCurrent ? "border-primary bg-primary/5" : "border-border",
      ].join(" ")}
    >
      <button
        type="button"
        data-ocid={`dasha.item.${itemIndex + 1}`}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left"
      >
        <span className="flex items-center gap-2">
          {isCurrent && (
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
          )}
          <span
            className={[
              "font-semibold text-sm",
              isCurrent ? "text-primary" : "text-foreground",
            ].join(" ")}
          >
            {lord} Mahadasha
          </span>
          {isCurrent && (
            <span className="text-xs text-muted-foreground">
              ({getDiff(now, endDate)})
            </span>
          )}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          {formatDate(startDate)} – {formatDate(endDate)}
          {open ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </span>
      </button>
      {open && antardashas && (
        <div className="border-t border-border/50 bg-muted/20 px-4 py-2 space-y-1">
          {antardashas.map((ad) => {
            const adCurrent = ad.startDate <= now && ad.endDate >= now;
            return (
              <div
                key={`${ad.lord}-${ad.startDate.getTime()}`}
                className={[
                  "flex items-center justify-between rounded px-2 py-1 text-xs",
                  adCurrent
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                <span>
                  {adCurrent && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1 animate-pulse" />
                  )}
                  {ad.lord} Antardasha
                </span>
                <span>
                  {formatDate(ad.startDate)} – {formatDate(ad.endDate)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Form Input with Label ────────────────────────────────────────────────────
interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  hint?: string;
}
function FormField({ id: _id, label, children, hint }: FormFieldProps) {
  return (
    <div>
      <p className="block text-xs font-semibold text-foreground mb-1.5">
        {label}
      </p>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface FormData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  lat: string;
  lng: string;
  gender: "M" | "F" | "O";
}

const EMPTY_FORM: FormData = {
  name: "",
  dob: "",
  tob: "",
  pob: "",
  lat: "28.6139",
  lng: "77.2090",
  gender: "M",
};

export default function VedicDashboard() {
  const { language } = useLanguage();
  const hi = language === "hi";

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const astro = useAstrology(birthData);
  const num = useNumerology(birthData);

  const togglePanel = useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isFormValid =
    form.name.trim() &&
    form.dob &&
    form.tob &&
    form.pob.trim() &&
    form.lat &&
    form.lng;

  const handlePobChange = (pob: string) => {
    setForm((f) => {
      const coords = detectCity(pob);
      return {
        ...f,
        pob,
        lat: coords ? String(coords.lat) : f.lat,
        lng: coords ? String(coords.lng) : f.lng,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setBirthData({
        name: form.name.trim(),
        dob: form.dob,
        tob: form.tob,
        pob: form.pob.trim(),
        latitude: Number.parseFloat(form.lat) || 28.6139,
        longitude: Number.parseFloat(form.lng) || 77.209,
        gender: form.gender,
      });
      setLoading(false);
      setExpanded({
        dob: true,
        loshu: true,
        name: true,
        year: true,
        avkahada: true,
        lagna: true,
        shadow: true,
        dasha: true,
      });
    }, 500);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleReset = () => {
    setBirthData(null);
    setExpanded({});
  };

  // ─── Derived values ───────────────────────────────────────────────────────
  const mulankInfo = MULANK_PLANETS[num.mulank] || MULANK_PLANETS[1];
  const bhagyankInfo = MULANK_PLANETS[num.bhagyank] || MULANK_PLANETS[1];
  const lifePred = LIFE_PREDICTIONS[num.mulank];

  const now = new Date();
  const currentMaha = astro.mahadashas.find(
    (d) => d.startDate <= now && d.endDate >= now,
  );
  const currentAntar = currentMaha?.antardashas.find(
    (d) => d.startDate <= now && d.endDate >= now,
  );

  const lagnaSign = astro.lagna?.sign ?? 1;
  const lagnaZodiac = ZODIAC_SIGNS.find((z) => z.num === lagnaSign);
  const moonNakshatra = astro.planetPositions?.Moon?.nakshatra ?? 1;
  const moonNakshatraData = NAKSHATRAS.find((n) => n.num === moonNakshatra);

  const shadowPlanetDesc: Record<string, string> = {
    Dhuma:
      "Smoky planet — causes confusion, delays, and obstacles. Weakens mental clarity.",
    Vyatipata:
      "Inverse catastrophe point — sudden reversals, accidents, and misfortunes.",
    Parivesh:
      "Encircling cloud — creates separation from loved ones and travel difficulties.",
    Indrachapa:
      "Indra's bow — governs hidden fears, secret enemies, and karmic debts.",
    Upaketu:
      "Secondary Ketu — intensifies spiritual yearning, losses, and moksha karmas.",
  };

  // ─── Input Form ───────────────────────────────────────────────────────────
  if (!birthData) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🪐</div>
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
              {hi ? "वैदिक जन्मपत्री" : "Vedic Birth Chart"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {hi
                ? "अपनी जन्म कुंडली, दशा और अंक विश्लेषण प्राप्त करें"
                : "Get your personalized Kundali, Dasha & Numerology analysis"}
            </p>
          </div>

          <form onSubmit={handleSubmit} data-ocid="vedic.form">
            <div className="ornamental-border rounded-2xl bg-card p-6 shadow-lg space-y-4">
              <FormField id="name" label={hi ? "पूरा नाम *" : "Full Name *"}>
                <input
                  id="vedic-name"
                  data-ocid="vedic.name_input"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder={hi ? "अपना पूरा नाम लिखें" : "Enter your full name"}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  id="dob"
                  label={hi ? "जन्म तिथि *" : "Date of Birth *"}
                >
                  <input
                    id="vedic-dob"
                    data-ocid="vedic.dob_input"
                    type="date"
                    value={form.dob}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, dob: e.target.value }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </FormField>
                <FormField
                  id="tob"
                  label={hi ? "जन्म समय *" : "Time of Birth *"}
                >
                  <input
                    id="vedic-tob"
                    data-ocid="vedic.tob_input"
                    type="time"
                    value={form.tob}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, tob: e.target.value }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </FormField>
              </div>

              <FormField
                id="pob"
                label={hi ? "जन्म स्थान *" : "Place of Birth *"}
                hint={
                  hi
                    ? "सटीक चार्ट के लिए शहर का नाम लिखें"
                    : "Enter city name for accurate chart"
                }
              >
                <input
                  id="vedic-pob"
                  data-ocid="vedic.pob_input"
                  type="text"
                  value={form.pob}
                  onChange={(e) => handlePobChange(e.target.value)}
                  placeholder={
                    hi
                      ? "शहर का नाम लिखें (जैसे Delhi, Mumbai)"
                      : "Enter city name (e.g. Delhi, Mumbai)"
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </FormField>

              <div className="grid grid-cols-2 gap-3">
                <FormField id="lat" label={hi ? "अक्षांश" : "Latitude"}>
                  <input
                    id="vedic-lat"
                    data-ocid="vedic.lat_input"
                    type="number"
                    step="0.0001"
                    value={form.lat}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lat: e.target.value }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </FormField>
                <FormField id="lng" label={hi ? "देशांतर" : "Longitude"}>
                  <input
                    id="vedic-lng"
                    data-ocid="vedic.lng_input"
                    type="number"
                    step="0.0001"
                    value={form.lng}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, lng: e.target.value }))
                    }
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </FormField>
              </div>

              <FormField id="gender" label={hi ? "लिंग *" : "Gender *"}>
                <select
                  id="vedic-gender"
                  data-ocid="vedic.gender_select"
                  value={form.gender}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      gender: e.target.value as "M" | "F" | "O",
                    }))
                  }
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="M">{hi ? "पुरुष" : "Male"}</option>
                  <option value="F">{hi ? "महिला" : "Female"}</option>
                  <option value="O">{hi ? "अन्य" : "Other"}</option>
                </select>
              </FormField>

              <button
                data-ocid="vedic.submit_button"
                type="submit"
                disabled={!isFormValid || loading}
                className={[
                  "w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                  "gold-gradient text-white shadow-md",
                  !isFormValid || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90",
                ].join(" ")}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {hi ? "गणना हो रही है..." : "Calculating..."}
                  </span>
                ) : hi ? (
                  "🪐 कुंडली देखें"
                ) : (
                  "🪐 Calculate My Chart"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard State ──────────────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 ornamental-border rounded-xl bg-card px-5 py-3">
        <div>
          <h1 className="font-heading text-lg font-bold text-foreground">
            {birthData.name}
          </h1>
          <p className="text-xs text-muted-foreground">
            {birthData.dob} · {birthData.tob} · {birthData.pob}
          </p>
        </div>
        <button
          data-ocid="vedic.edit_button"
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-semibold"
        >
          <Edit2 className="w-3.5 h-3.5" />
          {hi ? "संपादित करें" : "Edit Details"}
        </button>
      </div>

      {loading && (
        <div data-ocid="vedic.loading_state" className="space-y-3 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      )}

      {/* PANEL 1: DOB Analysis */}
      <Panel
        id="dob"
        title={hi ? "DOB विश्लेषण — अंक विश्लेषण" : "DOB Analysis — अंक विश्लेषण"}
        speakerText={`Your Mulank is ${num.mulank}, ruled by ${mulankInfo.planet}. Your Bhagyank is ${num.bhagyank}, ruled by ${bhagyankInfo.planet}.`}
        expanded={expanded.dob ?? true}
        onToggle={() => togglePanel("dob")}
      >
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: hi ? "मूलांक (Psychic)" : "Mulank (Psychic)",
                value: num.mulank,
                info: mulankInfo,
              },
              {
                label: hi ? "भाग्यांक (Destiny)" : "Bhagyank (Destiny)",
                value: num.bhagyank,
                info: bhagyankInfo,
              },
            ].map(({ label, value, info }) => (
              <div
                key={label}
                className="rounded-xl bg-muted/30 border border-border/50 p-4 text-center relative"
              >
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <div
                  className="text-4xl font-bold mb-1"
                  style={{ color: info.color }}
                >
                  {String(value).padStart(2, "0")}
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground">
                    {info.planet}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / {info.planetHi}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <SpeakerButton
                    text={`Your ${label} is ${value}, ruled by ${info.planet}`}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted/20 rounded-lg p-3 text-xs space-y-1">
            <p className="font-semibold text-foreground mb-2">
              {hi ? "गणना विधि:" : "Calculation:"}
            </p>
            <p className="text-muted-foreground">
              Mulank = Day digits reduced → {birthData.dob.split("-")[2]} ={" "}
              <strong>{num.mulank}</strong>
            </p>
            <p className="text-muted-foreground">
              Bhagyank = Full DOB digits reduced →{" "}
              {birthData.dob.replace(/-/g, "")} ={" "}
              <strong>{num.bhagyank}</strong>
            </p>
          </div>

          {lifePred && (
            <div className="rounded-lg border border-border/50 p-4 space-y-2">
              <p className="text-xs font-semibold text-primary mb-2">
                {hi ? "व्यक्तित्व विश्लेषण:" : "Personality Analysis:"}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {hi ? lifePred.character.hi : lifePred.character.en}
              </p>
              <p className="text-xs text-muted-foreground">
                {hi ? lifePred.career.hi : lifePred.career.en}
              </p>
            </div>
          )}
        </div>
      </Panel>

      {/* PANEL 2: Lo Shu Grid */}
      <Panel
        id="loshu"
        title={hi ? "Lo Shu Grid — लो शू ग्रिड" : "Lo Shu Grid — लो शू ग्रिड"}
        speakerText={`Your Lo Shu Grid shows ${num.loShuNumbers.join(", ")}. Missing numbers: ${num.missingNumbers.join(", ")}.`}
        expanded={expanded.loshu ?? true}
        onToggle={() => togglePanel("loshu")}
      >
        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-6 items-start">
            <LoShuGridDisplay
              loShuNumbers={num.loShuNumbers}
              numberFrequency={num.numberFrequency}
            />
            <div className="flex-1 min-w-48 space-y-2">
              <p className="text-xs font-semibold text-foreground">
                {hi ? "संख्या आवृत्ति:" : "Number Frequency:"}
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div key={n} className="flex items-center gap-1 text-xs">
                    <span className="font-bold text-foreground w-3">{n}</span>
                    <span className="text-muted-foreground">
                      × {num.numberFrequency[n] || 0}
                    </span>
                  </div>
                ))}
              </div>
              {num.missingNumbers.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground">
                    {hi ? "अनुपस्थित अंक:" : "Missing Numbers:"}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {num.missingNumbers.map((n) => (
                      <span
                        key={n}
                        className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-bold"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground">
              {hi ? "तल विश्लेषण:" : "Plane Analysis:"}
            </p>
            <div className="grid gap-2">
              {num.planeAnalysis.map((plane) => (
                <div
                  key={plane.name}
                  className="flex items-center gap-3 rounded-lg bg-muted/20 border border-border/40 px-3 py-2"
                >
                  <span
                    className={[
                      "text-xs font-bold px-2 py-0.5 rounded-full shrink-0",
                      plane.status === "COMPLETE"
                        ? "bg-primary/20 text-primary"
                        : plane.status === "PARTIAL"
                          ? "bg-accent/30 text-accent-foreground"
                          : "bg-muted text-muted-foreground",
                    ].join(" ")}
                  >
                    {plane.status}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {hi ? plane.nameHi : plane.name} (
                      {plane.numbers.join("-")})
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {hi ? plane.meaningHi : plane.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      {/* PANEL 3: Name Analysis */}
      <Panel
        id="name"
        title={hi ? "नाम विश्लेषण — Chaldean" : "Name Analysis — नाम विश्लेषण"}
        speakerText={`Your Chaldean name number is ${num.nameNumber}. The name ${birthData.name} has a numerological value of ${num.nameNumber}.`}
        expanded={expanded.name ?? true}
        onToggle={() => togglePanel("name")}
      >
        <div className="mt-4 space-y-4">
          <div className="rounded-xl bg-muted/30 border border-border/50 p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              {hi ? "नाम अंक (Chaldean)" : "Name Number (Chaldean)"}
            </p>
            <div
              className="text-5xl font-bold mb-1"
              style={{ color: "#D4AF37" }}
            >
              {String(num.nameNumber).padStart(2, "0")}
            </div>
            <p className="text-sm font-semibold text-foreground">
              {birthData.name}
            </p>
          </div>
          <div className="bg-muted/20 rounded-lg p-3 text-xs text-muted-foreground leading-relaxed">
            {hi
              ? "Chaldean पद्धति में प्रत्येक अक्षर का एक अंकीय मान होता है (1-8)। आपके नाम के सभी अक्षरों के मूल्यों का योग करके एकल अंक तक घटाया जाता है।"
              : "In the Chaldean system, each letter has a numeric value (1–8). The sum of all letter values in your name is reduced to a single digit."}
          </div>
        </div>
      </Panel>

      {/* PANEL 4: Personal Year */}
      <Panel
        id="year"
        title={
          hi ? "Personal Year — व्यक्तिगत वर्ष" : "Personal Year & Running Age"
        }
        speakerText={`Your personal year number is ${num.personalYear}. You are currently ${num.runningAge} years old.`}
        expanded={expanded.year ?? true}
        onToggle={() => togglePanel("year")}
      >
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-muted/30 border border-border/50 p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              {hi ? "व्यक्तिगत वर्ष" : "Personal Year"}
            </p>
            <div className="text-4xl font-bold mb-1 text-primary">
              {num.personalYear}
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date().getFullYear()}
            </p>
          </div>
          <div className="rounded-xl bg-muted/30 border border-border/50 p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              {hi ? "चलती आयु" : "Running Age"}
            </p>
            <div className="text-4xl font-bold mb-1 text-accent-foreground">
              {num.runningAge}
            </div>
            <p className="text-xs text-muted-foreground">
              {hi ? "वर्ष" : "Years"}
            </p>
          </div>
        </div>
        <div className="mt-3 bg-muted/20 rounded-lg p-3 text-xs text-muted-foreground">
          {hi
            ? "Personal Year = (जन्म दिन + जन्म माह + वर्तमान वर्ष के अंकों का योग) एकल अंक तक घटाया"
            : "Personal Year = (Day + Month + Current Year digits reduced to single digit)"}
        </div>
      </Panel>

      {/* PANEL 5: Avkahada Chakra */}
      <Panel
        id="avkahada"
        title={
          hi ? "अवकहड़ा चक्र — Avkahada Chakra" : "Avkahada Chakra — अवकहड़ा चक्र"
        }
        speakerText={`Your Lagna is ${lagnaZodiac?.name ?? ""}, Nakshatra is ${moonNakshatraData?.name ?? ""}, Gana is ${astro.avkahada?.gana ?? ""}.`}
        expanded={expanded.avkahada ?? true}
        onToggle={() => togglePanel("avkahada")}
      >
        {astro.avkahada && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-primary mb-2">
                  {hi ? "अवकहड़ा चक्र" : "Avkahada Chakra"}
                </p>
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-border/40">
                    {(
                      [
                        ["Paya", astro.avkahada.paya],
                        ["Varna", astro.avkahada.varna],
                        ["Yoni", astro.avkahada.yoni],
                        ["Gana", astro.avkahada.gana],
                        ["Vasya", astro.avkahada.vasya],
                        ["Nadi", astro.avkahada.nadi],
                        ["Tatva", astro.avkahada.tatva],
                        [
                          "Lagna",
                          lagnaZodiac
                            ? `${lagnaZodiac.nameHi} (${lagnaZodiac.name})`
                            : "-",
                        ],
                        [
                          "Lagna Lord",
                          lagnaZodiac
                            ? `${lagnaZodiac.lordHi} (${lagnaZodiac.lord})`
                            : "-",
                        ],
                        [
                          "Rasi",
                          ZODIAC_SIGNS.find(
                            (z) =>
                              z.num === (astro.planetPositions?.Moon.sign || 1),
                          )?.nameHi || "-",
                        ],
                        [
                          "Nakshatra-Pada",
                          moonNakshatraData
                            ? `${moonNakshatraData.nameHi} - ${astro.planetPositions?.Moon.pada}`
                            : "-",
                        ],
                        ["Nakshatra Lord", moonNakshatraData?.lord || "-"],
                      ] as [string, string][]
                    ).map(([k, v]) => (
                      <tr key={k}>
                        <td className="py-1.5 pr-2 text-muted-foreground font-medium w-1/2">
                          {k}
                        </td>
                        <td className="py-1.5 text-foreground font-semibold">
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-xs font-semibold text-primary mb-2">
                  {hi ? "बुनियादी विवरण" : "Basic Details"}
                </p>
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-border/40">
                    {(
                      [
                        [
                          hi ? "लिंग" : "Sex",
                          birthData.gender === "M"
                            ? hi
                              ? "पुरुष"
                              : "Male"
                            : birthData.gender === "F"
                              ? hi
                                ? "महिला"
                                : "Female"
                              : hi
                                ? "अन्य"
                                : "Other",
                        ],
                        [hi ? "जन्म तिथि" : "Date of Birth", birthData.dob],
                        [hi ? "जन्म समय" : "Time of Birth", birthData.tob],
                        [
                          hi ? "जन्म दिन" : "Day of Birth",
                          new Date(birthData.dob).toLocaleDateString("en-IN", {
                            weekday: "long",
                          }),
                        ],
                        [hi ? "जन्म स्थान" : "Place of Birth", birthData.pob],
                        [hi ? "सूर्योदय" : "Sunrise", "~6:00 AM"],
                        [hi ? "सूर्यास्त" : "Sunset", "~6:30 PM"],
                      ] as [string, string][]
                    ).map(([k, v]) => (
                      <tr key={k}>
                        <td className="py-1.5 pr-2 text-muted-foreground font-medium w-1/2">
                          {k}
                        </td>
                        <td className="py-1.5 text-foreground font-semibold">
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                <p className="text-xs font-semibold text-primary mb-2">
                  {hi ? "शुभ बिंदु" : "Favourable Points"}
                </p>
                <div className="space-y-1 text-xs">
                  {(
                    [
                      ["Lucky Numbers", "1, 3, 9"],
                      ["Good Years", "1, 10, 28"],
                      ["Lucky Metal", "Gold"],
                      [
                        "Lucky Stone",
                        moonNakshatraData?.lord === "Moon"
                          ? "Pearl"
                          : moonNakshatraData?.lord === "Sun"
                            ? "Ruby"
                            : "Yellow Sapphire",
                      ],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <span className="text-muted-foreground shrink-0">
                        {k}:
                      </span>
                      <span className="text-foreground font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3">
                <p className="text-xs font-semibold text-destructive mb-2">
                  {hi ? "घातक (अशुभ)" : "Ghatak (Malefics)"}
                </p>
                <div className="space-y-1 text-xs">
                  {(
                    [
                      ["Bad Day", "Saturday"],
                      ["Bad Month", "8th month"],
                      [
                        "Bad Nakshatra",
                        moonNakshatraData?.name
                          ? `Opposite of ${moonNakshatraData.name}`
                          : "-",
                      ],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <span className="text-muted-foreground shrink-0">
                        {k}:
                      </span>
                      <span className="text-foreground font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Panel>

      {/* PANEL 6: Lagna Chart */}
      <Panel
        id="lagna"
        title={
          hi
            ? "लग्न चार्ट — North Indian"
            : "Lagna Chart (Birth Chart) — लग्न चार्ट"
        }
        speakerText={`Your Lagna is ${lagnaZodiac?.name ?? ""}. Sun is in ${ZODIAC_SIGNS.find((z) => z.num === (astro.planetPositions?.Sun.sign || 1))?.name ?? ""}. Moon is in ${ZODIAC_SIGNS.find((z) => z.num === (astro.planetPositions?.Moon.sign || 1))?.name ?? ""}.`}
        expanded={expanded.lagna ?? true}
        onToggle={() => togglePanel("lagna")}
      >
        <div className="mt-4">
          {astro.planetPositions && (
            <NorthIndianChart
              planetPositions={
                astro.planetPositions as unknown as Record<
                  string,
                  { sign: number; degree: number; retrograde?: boolean }
                >
              }
              ascendantSign={lagnaSign}
            />
          )}
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs">
            {Object.entries(PLANET_ABBR).map(([planet, abbr]) => {
              const pos =
                astro.planetPositions?.[
                  planet as keyof typeof astro.planetPositions
                ];
              if (!pos) return null;
              const sign = ZODIAC_SIGNS.find((z) => z.num === pos.sign);
              return (
                <div key={planet} className="flex items-center gap-1">
                  <span
                    className="font-bold w-5"
                    style={{ color: PLANET_COLOR[planet] }}
                  >
                    {abbr}
                  </span>
                  <span className="text-muted-foreground truncate">
                    {sign?.nameHi}
                  </span>
                  {pos.retrograde && (
                    <span className="text-destructive font-bold text-[10px]">
                      R
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Panel>

      {/* PANEL 7: Shadow Planets */}
      <Panel
        id="shadow"
        title={hi ? "छाया ग्रह — Shadow Planets" : "Shadow Planets — छाया ग्रह"}
        speakerText="Shadow planets: Dhuma, Vyatipata, Parivesh, Indrachapa, and Upaketu influence hidden karmas."
        expanded={expanded.shadow ?? true}
        onToggle={() => togglePanel("shadow")}
      >
        {astro.shadowPlanets && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 text-muted-foreground font-semibold">
                    {hi ? "ग्रह" : "Planet"}
                  </th>
                  <th className="text-left py-2 text-muted-foreground font-semibold">
                    {hi ? "राशि" : "Sign"}
                  </th>
                  <th className="text-left py-2 text-muted-foreground font-semibold">
                    {hi ? "अंश" : "Degree"}
                  </th>
                  <th className="text-left py-2 text-muted-foreground font-semibold hidden sm:table-cell">
                    {hi ? "विवरण" : "Significance"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {(
                  Object.entries(astro.shadowPlanets) as Array<
                    [string, { sign: number; degree: number }]
                  >
                ).map(([name, data]) => {
                  const sign = ZODIAC_SIGNS.find((z) => z.num === data.sign);
                  return (
                    <tr key={name} data-ocid={`shadow.${name.toLowerCase()}`}>
                      <td className="py-2 font-semibold text-foreground">
                        {name}
                      </td>
                      <td className="py-2 text-foreground">
                        {hi ? sign?.nameHi : sign?.name}
                      </td>
                      <td className="py-2 text-muted-foreground">
                        {data.degree.toFixed(1)}°
                      </td>
                      <td className="py-2 text-muted-foreground hidden sm:table-cell max-w-xs">
                        {shadowPlanetDesc[name] || ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {/* PANEL 8: Vimshottari Dasha */}
      <Panel
        id="dasha"
        title={
          hi
            ? "विंशोत्तरी दशा — Vimshottari Dasha"
            : "Vimshottari Dasha — विंशोत्तरी दशा"
        }
        speakerText={`You are currently in ${currentMaha?.lord ?? ""} Mahadasha${currentAntar ? `, ${currentAntar.lord} Antardasha` : ""}.`}
        expanded={expanded.dasha ?? true}
        onToggle={() => togglePanel("dasha")}
      >
        <div className="mt-4 space-y-3">
          {currentMaha && (
            <div className="rounded-xl bg-primary/10 border border-primary/30 p-4 mb-4">
              <p className="text-xs font-semibold text-primary mb-1">
                {hi ? "वर्तमान महादशा" : "Current Mahadasha"}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xl font-bold text-primary">
                  {currentMaha.lord}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(currentMaha.startDate)} —{" "}
                  {formatDate(currentMaha.endDate)}
                </span>
              </div>
              {currentAntar && (
                <div className="mt-2 pt-2 border-t border-primary/20">
                  <span className="text-xs text-muted-foreground">
                    {hi ? "अंतर्दशा: " : "Antardasha: "}
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "#FF9933" }}
                  >
                    {currentAntar.lord}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({getDiff(now, currentAntar.endDate)})
                  </span>
                </div>
              )}
            </div>
          )}

          {astro.mahadashas.map((d, i) => {
            const isCurr = d.startDate <= now && d.endDate >= now;
            return (
              <DashaItem
                key={`${d.lord}-${d.startDate.getTime()}`}
                lord={d.lord}
                startDate={d.startDate}
                endDate={d.endDate}
                years={d.years}
                isCurrent={isCurr}
                itemIndex={i}
                antardashas={d.antardashas}
              />
            );
          })}
        </div>
      </Panel>

      <div className="text-center mt-6 py-4 border-t border-border/40">
        <p className="text-xs text-muted-foreground">
          ✦{" "}
          {hi
            ? "सभी गणनाएं लाहिरी अयनांश (सायन पद्धति) पर आधारित हैं"
            : "All calculations are based on Lahiri Ayanamsa (sidereal system)"}{" "}
          ✦
        </p>
      </div>
    </div>
  );
}
