// VedicCharts.tsx — Advanced Astrology Panels
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import AshtakvargaTab from "../components/vedic/AshtakvargaTab";
import AstroScoreTab from "../components/vedic/AstroScoreTab";
import DivisionalTab from "../components/vedic/DivisionalTab";
import NorthIndianChart from "../components/vedic/NorthIndianChart";
import { useLanguage } from "../contexts/LanguageContext";
import { ASCENDANT_DESCRIPTIONS } from "../data/ascendantDescriptions";
import { NAKSHATRA_DESCRIPTIONS } from "../data/nakshatraDescriptions";
import { useAstrology } from "../hooks/useAstrology";
import type { BirthData } from "../hooks/useAstrology";
import { SpeakerButton } from "../hooks/useSpeaker";
import {
  NAKSHATRAS,
  getNakshatra,
  getZodiacSign,
} from "../utils/vedicAstrology";

const PLANET_NAMES: Record<string, { en: string; hi: string; abbr: string }> = {
  ASC: { en: "Ascendant", hi: "लग्न", abbr: "ASC" },
  Sun: { en: "Sun", hi: "सूर्य", abbr: "Su" },
  Moon: { en: "Moon", hi: "चंद्र", abbr: "Mo" },
  Mars: { en: "Mars", hi: "मंगल", abbr: "Ma" },
  Mercury: { en: "Mercury", hi: "बुध", abbr: "Me" },
  Jupiter: { en: "Jupiter", hi: "बृहस्पति", abbr: "Ju" },
  Venus: { en: "Venus", hi: "शुक्र", abbr: "Ve" },
  Saturn: { en: "Saturn", hi: "शनि", abbr: "Sa" },
  Rahu: { en: "Rahu", hi: "राहु", abbr: "Ra" },
  Ketu: { en: "Ketu", hi: "केतु", abbr: "Ke" },
  Uranus: { en: "Uranus", hi: "यूरेनस", abbr: "Ur" },
  Neptune: { en: "Neptune", hi: "नेपच्यून", abbr: "Ne" },
  Pluto: { en: "Pluto", hi: "प्लूटो", abbr: "Pl" },
};

function SectionCard({
  title,
  children,
  speaker,
}: { title: string; children: React.ReactNode; speaker?: string }) {
  return (
    <Card
      className="border-2"
      style={{ borderColor: "#D4AF37", background: "var(--card)" }}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between gap-2 flex-wrap">
        <CardTitle className="text-sm font-bold" style={{ color: "#FF9933" }}>
          {title}
        </CardTitle>
        {speaker && <SpeakerButton text={speaker} size="sm" />}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// ── NO DATA STATE ─────────────────────────────────────────────────────────────
function NoData() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="text-6xl">🔭</div>
      <h2 className="text-2xl font-bold" style={{ color: "#FF9933" }}>
        No Birth Data Found
      </h2>
      <p className="text-muted-foreground max-w-md">
        Please fill your birth details first on the Vedic Dashboard to access
        advanced charts.
      </p>
      <a href="/horoscope">
        <Button style={{ background: "#FF9933", color: "#fff" }}>
          Go to Vedic Dashboard
        </Button>
      </a>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function VedicCharts() {
  const { language } = useLanguage();
  const [birthData, setBirthData] = useState<BirthData | null>(null);

  useEffect(() => {
    // Try sessionStorage then localStorage
    const raw =
      sessionStorage.getItem("sc-birth-data") ||
      localStorage.getItem("sc-birth-data");
    if (raw) {
      try {
        setBirthData(JSON.parse(raw));
      } catch {
        setBirthData(null);
      }
    }
  }, []);

  const astro = useAstrology(birthData);

  if (!birthData) return <NoData />;

  const pp = astro.planetPositions;
  const lagna = astro.lagna;
  const lagnaSign = lagna?.sign ?? 1;
  const moonNakshatra = pp?.Moon.nakshatra ?? 1;
  const moonPada = pp?.Moon.pada ?? 1;
  const ascDesc = ASCENDANT_DESCRIPTIONS[lagnaSign - 1];
  const nakDesc = NAKSHATRA_DESCRIPTIONS[moonNakshatra - 1];
  const lagnaSignInfo = getZodiacSign(lagnaSign);
  const nakInfo = getNakshatra(moonNakshatra);

  return (
    <div
      className="min-h-screen py-6 px-4"
      style={{ background: "var(--background)" }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div
          className="rounded-xl p-4 flex items-center justify-between flex-wrap gap-3"
          style={{
            background: "linear-gradient(135deg,#1a0a00,#2d1200)",
            border: "2px solid #D4AF37",
          }}
        >
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#D4AF37" }}>
              ज्योतिष विश्लेषण — Advanced Vedic Charts
            </h1>
            <p className="text-sm mt-1" style={{ color: "#FF9933" }}>
              {birthData.name} · {birthData.dob} · {birthData.tob} ·{" "}
              {birthData.pob}
            </p>
          </div>
          <Badge
            className="text-sm px-3 py-1"
            style={{ background: "#D4AF37", color: "#1a0a00" }}
          >
            {lagnaSignInfo.name} Lagna · {nakInfo.name} Nakshatra
          </Badge>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="charts">
          <TabsList
            className="flex flex-wrap gap-1 h-auto mb-6 p-1 bg-card border-2"
            style={{ borderColor: "#D4AF37" }}
          >
            {[
              { val: "charts", label: "Charts" },
              { val: "planetary", label: "Planetary" },
              { val: "dasha", label: "Dasha Tables" },
              { val: "ashtakvarga", label: "Ashtakvarga" },
              { val: "divisional", label: "Divisional" },
              { val: "ascendant", label: "Ascendant" },
              { val: "nakshatra", label: "Nakshatra" },
              { val: "astroscore", label: "AstroScore" },
            ].map((t) => (
              <TabsTrigger
                key={t.val}
                value={t.val}
                data-ocid={`vedic_charts.${t.val}.tab`}
                className="text-xs font-semibold data-[state=active]:text-white"
                style={
                  { "--tw-data-active-bg": "#FF9933" } as React.CSSProperties
                }
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* TAB 1: CHARTS */}
          <TabsContent
            value="charts"
            className="space-y-6"
            data-ocid="vedic_charts.charts.panel"
          >
            <ChartsTab astro={astro} language={language} />
          </TabsContent>

          {/* TAB 2: PLANETARY */}
          <TabsContent
            value="planetary"
            data-ocid="vedic_charts.planetary.panel"
          >
            <PlanetaryTab astro={astro} language={language} />
          </TabsContent>

          {/* TAB 3: DASHA TABLES */}
          <TabsContent value="dasha" data-ocid="vedic_charts.dasha.panel">
            <DashaTab astro={astro} language={language} />
          </TabsContent>

          {/* TAB 4: ASHTAKVARGA */}
          <TabsContent
            value="ashtakvarga"
            data-ocid="vedic_charts.ashtakvarga.panel"
          >
            {astro.ashtakvarga ? (
              <AshtakvargaTab
                ashtakvarga={astro.ashtakvarga}
                language={language}
              />
            ) : (
              <p className="text-muted-foreground">Calculating...</p>
            )}
          </TabsContent>

          {/* TAB 5: DIVISIONAL */}
          <TabsContent
            value="divisional"
            data-ocid="vedic_charts.divisional.panel"
          >
            {astro.allDivisionalCharts ? (
              <DivisionalTab divisional={astro.allDivisionalCharts} />
            ) : (
              <p className="text-muted-foreground">Calculating...</p>
            )}
          </TabsContent>

          {/* TAB 6: ASCENDANT */}
          <TabsContent
            value="ascendant"
            data-ocid="vedic_charts.ascendant.panel"
          >
            {ascDesc && (
              <AscendantTab
                desc={ascDesc}
                language={language}
                lagnaSign={lagnaSign}
              />
            )}
          </TabsContent>

          {/* TAB 7: NAKSHATRA */}
          <TabsContent
            value="nakshatra"
            data-ocid="vedic_charts.nakshatra.panel"
          >
            {nakDesc && (
              <NakshatraTab
                desc={nakDesc}
                language={language}
                moonNakshatra={moonNakshatra}
                moonPada={moonPada}
              />
            )}
          </TabsContent>

          {/* TAB 8: ASTROSCORE */}
          <TabsContent
            value="astroscore"
            data-ocid="vedic_charts.astroscore.panel"
          >
            <AstroScoreTab
              score={astro.astroScore}
              avkahada={astro.avkahada}
              language={language}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ── CHARTS TAB ────────────────────────────────────────────────────────────────
function ChartsTab({
  astro,
}: { astro: ReturnType<typeof useAstrology>; language: string }) {
  const pp = astro.planetPositions;
  const navamsa = astro.navamsa;

  const d9Houses: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) d9Houses[i] = [];
  if (pp) {
    for (const [planet, data] of Object.entries(navamsa)) {
      const sign = data.sign;
      if (!d9Houses[sign]) d9Houses[sign] = [];
      d9Houses[sign].push(PLANET_NAMES[planet]?.abbr ?? planet.slice(0, 2));
    }
  }

  const d9SpeakerText = pp
    ? Object.entries(navamsa)
        .map(([p, d]) => `${p} in ${getZodiacSign(d.sign).name}`)
        .join(", ")
    : "No data";

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard
          title="Navamsa Chart (D9) — नवमांश चार्ट"
          speaker={d9SpeakerText}
        >
          <NorthIndianChart housePlanets={d9Houses} />
        </SectionCard>

        <SectionCard title="Chalit Table (House Cusps) — चलित चार्ट">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ background: "#1a0a00", color: "#D4AF37" }}>
                  {[
                    "House",
                    "Sign Start",
                    "Deg Start",
                    "Sign Mid",
                    "Deg Mid",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-2 py-1.5 border border-border/30 text-left font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {astro.houseCusps.map((cusp, i) => (
                  <tr
                    key={cusp.house}
                    className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}
                  >
                    <td
                      className="px-2 py-1 border border-border/20 font-bold"
                      style={{ color: "#FF9933" }}
                    >
                      {cusp.house}
                    </td>
                    <td className="px-2 py-1 border border-border/20">
                      {getZodiacSign(cusp.signStart).name}
                    </td>
                    <td className="px-2 py-1 border border-border/20">
                      {cusp.degreeStart.toFixed(2)}°
                    </td>
                    <td className="px-2 py-1 border border-border/20">
                      {getZodiacSign(cusp.signMid).name}
                    </td>
                    <td className="px-2 py-1 border border-border/20">
                      {cusp.degreeMid.toFixed(2)}°
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

// ── PLANETARY TAB ─────────────────────────────────────────────────────────────
function PlanetaryTab({
  astro,
  language,
}: { astro: ReturnType<typeof useAstrology>; language: string }) {
  const pp = astro.planetPositions;
  const lagna = astro.lagna;
  const ALL_PLANETS = [
    "ASC",
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
    "Rahu",
    "Ketu",
    "Uranus",
    "Neptune",
    "Pluto",
  ] as const;

  const speakerText = pp
    ? `Sun is in ${getZodiacSign(pp.Sun.sign).name} at ${pp.Sun.degree.toFixed(1)} degrees. Moon is in ${getZodiacSign(pp.Moon.sign).name}. Mars is in ${getZodiacSign(pp.Mars.sign).name}.`
    : "No data";

  return (
    <SectionCard title="Planetary Positions — ग्रह स्थिति" speaker={speakerText}>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-collapse min-w-[600px]">
          <thead>
            <tr style={{ background: "#1a0a00", color: "#D4AF37" }}>
              {[
                "Planet / ग्रह",
                "Sign / राशि",
                "Degree",
                "Longitude",
                "Nakshatra / नक्षत्र",
                "Pada",
                "Lord",
                "Retro",
              ].map((h) => (
                <th
                  key={h}
                  className="px-2 py-2 border border-border/30 text-left font-semibold text-[11px]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_PLANETS.map((planet, i) => {
              const data =
                planet === "ASC" ? lagna : pp?.[planet as keyof typeof pp];
              if (!data) return null;
              const sign = getZodiacSign(data.sign);
              const nakshatraData = getNakshatra(data.nakshatra);
              const pname = PLANET_NAMES[planet];
              return (
                <tr
                  key={planet}
                  className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}
                >
                  <td
                    className="px-2 py-1.5 border border-border/20 font-semibold"
                    style={{ color: "#FF9933" }}
                  >
                    {language === "hi" ? pname?.hi : pname?.en}
                  </td>
                  <td className="px-2 py-1.5 border border-border/20">
                    {language === "hi" ? sign.nameHi : sign.name}
                  </td>
                  <td className="px-2 py-1.5 border border-border/20">
                    {data.degree.toFixed(2)}°
                  </td>
                  <td className="px-2 py-1.5 border border-border/20">
                    {data.longitude.toFixed(2)}°
                  </td>
                  <td className="px-2 py-1.5 border border-border/20">
                    {language === "hi"
                      ? nakshatraData.nameHi
                      : nakshatraData.name}
                  </td>
                  <td className="px-2 py-1.5 border border-border/20">
                    {data.pada}
                  </td>
                  <td className="px-2 py-1.5 border border-border/20">
                    {nakshatraData.lord}
                  </td>
                  <td className="px-2 py-1.5 border border-border/20 text-center">
                    {data.retrograde ? (
                      <span style={{ color: "#FF9933" }} className="font-bold">
                        ℞
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

// ── DASHA TAB ─────────────────────────────────────────────────────────────────
function DashaTab({
  astro,
}: { astro: ReturnType<typeof useAstrology>; language: string }) {
  const now = new Date();
  const mahadashas = astro.mahadashas;
  const currentMaha = mahadashas.find(
    (d) => d.startDate <= now && d.endDate >= now,
  );

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", { year: "numeric", month: "short" });

  function getStatus(d: { startDate: Date; endDate: Date }) {
    if (d.endDate < now) return "completed";
    if (d.startDate > now) return "upcoming";
    return "running";
  }

  const statusStyles: Record<string, string> = {
    running:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    completed: "text-muted-foreground",
    upcoming: "text-yellow-700 dark:text-yellow-300",
  };

  const speakerText = currentMaha
    ? `Currently running ${currentMaha.lord} Mahadasha from ${formatDate(currentMaha.startDate)} to ${formatDate(currentMaha.endDate)}.`
    : "No current dasha";

  return (
    <div className="space-y-6">
      <SectionCard title="Mahadasha Periods — महादशा" speaker={speakerText}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr style={{ background: "#1a0a00", color: "#D4AF37" }}>
                {["Planet", "Start", "End", "Duration (yrs)", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-2 py-2 border border-border/30 text-left font-semibold"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {mahadashas.map((md, i) => {
                const status = getStatus(md);
                return (
                  <tr
                    key={md.lord}
                    className={`${i % 2 === 0 ? "bg-card" : "bg-muted/20"} ${status === "running" ? "ring-1 ring-inset ring-orange-400/40" : ""}`}
                  >
                    <td
                      className="px-2 py-1.5 border border-border/20 font-semibold"
                      style={{ color: "#FF9933" }}
                    >
                      {md.lord}
                    </td>
                    <td className="px-2 py-1.5 border border-border/20">
                      {formatDate(md.startDate)}
                    </td>
                    <td className="px-2 py-1.5 border border-border/20">
                      {formatDate(md.endDate)}
                    </td>
                    <td className="px-2 py-1.5 border border-border/20">
                      {md.years}
                    </td>
                    <td className="px-2 py-1.5 border border-border/20">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusStyles[status]}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {currentMaha && (
        <SectionCard
          title={`${currentMaha.lord} Mahadasha — Antardasha Periods`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ background: "#1a0a00", color: "#D4AF37" }}>
                  {["Antardasha Lord", "Start", "End", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-2 py-2 border border-border/30 text-left font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentMaha.antardashas.map((ad, i) => {
                  const status = getStatus(ad);
                  const isCurrentAntar =
                    ad.startDate <= now && ad.endDate >= now;
                  return (
                    <tr
                      key={`${ad.lord}-${i}`}
                      className={
                        isCurrentAntar
                          ? "ring-1 ring-inset ring-orange-400/60"
                          : i % 2 === 0
                            ? "bg-card"
                            : "bg-muted/20"
                      }
                      style={
                        isCurrentAntar
                          ? { background: "rgba(255,153,51,0.1)" }
                          : {}
                      }
                    >
                      <td
                        className="px-2 py-1.5 border border-border/20 font-semibold"
                        style={{
                          color: isCurrentAntar ? "#FF9933" : undefined,
                        }}
                      >
                        {ad.lord}
                      </td>
                      <td className="px-2 py-1.5 border border-border/20">
                        {formatDate(ad.startDate)}
                      </td>
                      <td className="px-2 py-1.5 border border-border/20">
                        {formatDate(ad.endDate)}
                      </td>
                      <td className="px-2 py-1.5 border border-border/20">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusStyles[status]}`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
}

// ── ASCENDANT TAB ─────────────────────────────────────────────────────────────
function AscendantTab({
  desc,
  language,
  lagnaSign,
}: {
  desc: (typeof ASCENDANT_DESCRIPTIONS)[number];
  language: string;
  lagnaSign: number;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpen((o) => ({ ...o, [key]: !o[key] }));
  const signInfo = getZodiacSign(lagnaSign);

  const sections = [
    {
      key: "appearance",
      title: "Physical Appearance",
      titleHi: "शारीरिक रूप",
      content: desc.physicalAppearance,
    },
    { key: "health", title: "Health", titleHi: "स्वास्थ्य", content: desc.health },
    {
      key: "temperament",
      title: "Temperament & Personality",
      titleHi: "स्वभाव और व्यक्तित्व",
      content: desc.temperament,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2" style={{ borderColor: "#D4AF37" }}>
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <p className="text-lg font-bold" style={{ color: "#D4AF37" }}>
              Your Lagna (Ascendant) is
            </p>
            <h2
              className="text-3xl font-bold mt-1"
              style={{ color: "#FF9933" }}
            >
              {signInfo.name} / {desc.nameHi}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Ruled by {signInfo.lord} · {signInfo.element} Element
            </p>
          </div>
        </CardContent>
      </Card>

      {sections.map((sec) => (
        <Card
          key={sec.key}
          className="border-2 cursor-pointer"
          style={{ borderColor: "#D4AF37" }}
          data-ocid={`ascendant.${sec.key}.card`}
        >
          <CardHeader
            className="flex flex-row items-center justify-between pb-2 cursor-pointer"
            onClick={() => toggle(sec.key)}
          >
            <CardTitle
              className="text-sm font-bold"
              style={{ color: "#FF9933" }}
            >
              {language === "hi" ? sec.titleHi : sec.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <SpeakerButton
                text={language === "hi" ? sec.content.hi : sec.content.en}
                lang={language === "hi" ? "hi-IN" : "en-IN"}
                size="sm"
              />
              <span style={{ color: "#D4AF37" }}>
                {open[sec.key] ? "▲" : "▼"}
              </span>
            </div>
          </CardHeader>
          {open[sec.key] && (
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground">
                {language === "hi" ? sec.content.hi : sec.content.en}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}

// ── NAKSHATRA TAB ─────────────────────────────────────────────────────────────
function NakshatraTab({
  desc,
  language,
  moonNakshatra,
  moonPada,
}: {
  desc: (typeof NAKSHATRA_DESCRIPTIONS)[number];
  language: string;
  moonNakshatra: number;
  moonPada: number;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setOpen((o) => ({ ...o, [key]: !o[key] }));
  const nakInfo =
    NAKSHATRAS.find((n) => n.num === moonNakshatra) || NAKSHATRAS[0];

  const sections = [
    {
      key: "prediction",
      title: "General Prediction",
      titleHi: "सामान्य भविष्यवाणी",
      content: desc.prediction,
    },
    {
      key: "education",
      title: "Education & Income",
      titleHi: "शिक्षा और आय",
      content: desc.educationIncome,
    },
    {
      key: "family",
      title: "Family Life",
      titleHi: "पारिवारिक जीवन",
      content: desc.familyLife,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2" style={{ borderColor: "#D4AF37" }}>
        <CardContent className="p-6">
          <div className="text-center mb-2">
            <p className="text-lg font-bold" style={{ color: "#D4AF37" }}>
              Your Birth Nakshatra is
            </p>
            <h2
              className="text-3xl font-bold mt-1"
              style={{ color: "#FF9933" }}
            >
              {nakInfo.name} / {desc.nameHi}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Pada {moonPada} · Nakshatra Lord:{" "}
              <span style={{ color: "#D4AF37" }}>{nakInfo.lord}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Symbol: {nakInfo.symbol} · Gana: {nakInfo.gana} · Yoni:{" "}
              {nakInfo.yoni}
            </p>
          </div>
        </CardContent>
      </Card>

      {sections.map((sec) => (
        <Card
          key={sec.key}
          className="border-2 cursor-pointer"
          style={{ borderColor: "#D4AF37" }}
          data-ocid={`nakshatra.${sec.key}.card`}
        >
          <CardHeader
            className="flex flex-row items-center justify-between pb-2"
            onClick={() => toggle(sec.key)}
          >
            <CardTitle
              className="text-sm font-bold"
              style={{ color: "#FF9933" }}
            >
              {language === "hi" ? sec.titleHi : sec.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <SpeakerButton
                text={language === "hi" ? sec.content.hi : sec.content.en}
                lang={language === "hi" ? "hi-IN" : "en-IN"}
                size="sm"
              />
              <span style={{ color: "#D4AF37" }}>
                {open[sec.key] ? "▲" : "▼"}
              </span>
            </div>
          </CardHeader>
          {open[sec.key] && (
            <CardContent>
              <p className="text-sm leading-relaxed">
                {language === "hi" ? sec.content.hi : sec.content.en}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
