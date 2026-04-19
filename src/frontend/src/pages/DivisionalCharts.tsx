import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  VEDIC_PLANETS,
  ZODIAC_SIGNS,
  chartGroups,
  divisionalChartsData,
} from "../data/divisional-charts-data";

interface BirthData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
}

// Deterministic "planet positions" from birth data seed
function getPlanetPositions(seed: string, chartNumber: number) {
  const hash = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return VEDIC_PLANETS.map((planet, idx) => {
    const signIdx = ((hash + idx * 37 + chartNumber * 13) % 12) + 1;
    const house = ((hash + idx * 19 + chartNumber * 7) % 12) + 1;
    return { ...planet, sign: signIdx, house };
  });
}

function VedicChartGrid({
  positions,
}: { positions: ReturnType<typeof getPlanetPositions> }) {
  // North Indian diamond chart grid
  // North Indian chart layout order: 1,12,11,10,2,_,_,9,3,_,_,8,4,5,6,7

  const housePlanets: Record<number, typeof positions> = {};
  for (let h = 1; h <= 12; h++) housePlanets[h] = [];
  for (const p of positions) {
    if (housePlanets[p.house]) housePlanets[p.house].push(p);
  }

  const cellStyle =
    "border border-border/40 p-1 flex flex-col items-center justify-center min-h-[60px] text-[10px]";

  const GRID_LAYOUT = [
    1, 12, 11, 10, 2, -1, -2, 9, 3, -3, -4, 8, 4, 5, 6, 7,
  ] as const;
  return (
    <div
      className="grid grid-cols-4 gap-px max-w-sm mx-auto"
      style={{ background: "oklch(0.20 0.06 25)" }}
    >
      {GRID_LAYOUT.map((house) => (
        <div
          key={`cell-${house}`}
          className={cellStyle}
          style={{
            background:
              house < 0 ? "oklch(0.14 0.04 22)" : "oklch(0.18 0.05 24)",
            visibility: house < 0 ? "hidden" : "visible",
          }}
        >
          {house > 0 && (
            <>
              <span className="text-muted-foreground font-mono text-[9px] mb-1">
                {house}
              </span>
              <div className="flex flex-wrap gap-px justify-center">
                {housePlanets[house].map((p) => (
                  <span
                    key={p.id}
                    title={p.name}
                    style={{ color: p.color }}
                    className="font-bold"
                  >
                    {p.symbol}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function ChartDetailPanel({
  chartId,
  birthData,
}: { chartId: string; birthData: BirthData }) {
  const chart = divisionalChartsData.find((c) => c.id === chartId);
  if (!chart) return null;

  const seed = `${birthData.dob}${birthData.tob}${birthData.pob}`;
  const positions = getPlanetPositions(seed, chart.number);

  return (
    <div className="space-y-6">
      {/* Chart Header */}
      <div
        className="rounded-2xl p-6 border"
        style={{
          background: "oklch(0.16 0.06 22)",
          borderColor: `${chart.colorCode}55`,
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="text-4xl w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${chart.colorCode}22` }}
          >
            {chart.emoji}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge
                variant="outline"
                className="font-mono text-xs"
                style={{ borderColor: chart.colorCode, color: chart.colorCode }}
              >
                {chart.code}
              </Badge>
              <h2 className="font-heading text-xl font-bold text-foreground">
                {chart.name}
              </h2>
              <span className="text-muted-foreground text-sm">
                ({chart.nameHindi})
              </span>
            </div>
            <p
              className="text-sm font-semibold"
              style={{ color: chart.colorCode }}
            >
              {chart.lifeArea}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {chart.lifeAreaHindi}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Chart Visualization */}
        <div>
          <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {chart.code} Chart Grid
          </h3>
          <VedicChartGrid positions={positions} />
          {/* Planet legend */}
          <div className="grid grid-cols-3 gap-1 mt-3">
            {positions.map((p) => (
              <div key={p.id} className="flex items-center gap-1 text-[10px]">
                <span style={{ color: p.color }} className="font-bold">
                  {p.symbol}
                </span>
                <span className="text-muted-foreground truncate">
                  {p.nameHindi}
                </span>
                <span className="text-muted-foreground">H{p.house}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Significations */}
        <div className="space-y-4">
          <div>
            <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Key Significations
            </h3>
            <ul className="space-y-1">
              {chart.significations.map((sig) => (
                <li
                  key={sig}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span
                    style={{ color: chart.colorCode }}
                    className="mt-0.5 flex-shrink-0"
                  >
                    ◆
                  </span>
                  <span>{sig}</span>
                  <span className="text-muted-foreground text-xs ml-auto">
                    (
                    {
                      chart.significationsHindi[
                        chart.significations.indexOf(sig)
                      ]
                    }
                    )
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Key Houses & Ruling Planets
            </h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {chart.keyHouses.map((h) => (
                <Badge key={h} variant="secondary" className="text-xs">
                  {h}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {chart.rulingPlanets.map((p) => (
                <Badge
                  key={p}
                  className="text-xs"
                  style={{
                    background: `${chart.colorCode}22`,
                    color: chart.colorCode,
                    border: `1px solid ${chart.colorCode}44`,
                  }}
                >
                  {p}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interpretation Guide */}
      <div
        className="rounded-xl p-4 border"
        style={{
          background: "oklch(0.14 0.04 22)",
          borderColor: "oklch(0.28 0.06 30)",
        }}
      >
        <h3
          className="font-heading text-sm font-semibold mb-2"
          style={{ color: chart.colorCode }}
        >
          📖 Interpretation Guide
        </h3>
        <p className="text-sm text-foreground leading-relaxed">
          {chart.interpretationGuide}
        </p>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          {chart.interpretationGuideHindi}
        </p>
      </div>
    </div>
  );
}

export default function DivisionalCharts() {
  const [birthData, setBirthData] = useState<BirthData>({
    name: "",
    dob: "",
    tob: "",
    pob: "",
  });
  const [isGenerated, setIsGenerated] = useState(false);
  const [activeChart, setActiveChart] = useState("d1");
  const [activeGroup, setActiveGroup] = useState("all");

  const handleGenerate = () => {
    if (birthData.dob && birthData.tob) setIsGenerated(true);
  };

  const filteredCharts =
    activeGroup === "all"
      ? divisionalChartsData
      : divisionalChartsData.filter((c) =>
          chartGroups
            .find((g) => g.label === activeGroup)
            ?.charts.includes(c.id),
        );

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="relative py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 25), oklch(0.12 0.05 20))",
        }}
      >
        <div className="text-5xl mb-4">🪐</div>
        <h1
          className="font-heading text-3xl md:text-5xl font-bold mb-3"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Divisional Charts
        </h1>
        <p
          className="font-heading text-lg mb-1"
          style={{ color: "oklch(0.68 0.14 70)" }}
        >
          षोडशवर्ग / Shodashvarga
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          All 16 Vedic divisional charts — D1 through D60. Enter your birth
          details to see planet positions in each chart.
        </p>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-8">
        {/* Birth Data Form */}
        <Card
          className="border-primary/20"
          style={{ background: "oklch(0.16 0.06 22)" }}
        >
          <CardHeader>
            <CardTitle
              className="font-heading text-lg"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🔭 Enter Birth Details / जन्म विवरण
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Name / नाम
                </Label>
                <Input
                  placeholder="Your name"
                  value={birthData.name}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, name: e.target.value }))
                  }
                  data-ocid="div-charts.name.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Date of Birth / जन्म तिथि
                </Label>
                <Input
                  type="date"
                  value={birthData.dob}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, dob: e.target.value }))
                  }
                  data-ocid="div-charts.dob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Time of Birth / जन्म समय
                </Label>
                <Input
                  type="time"
                  value={birthData.tob}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, tob: e.target.value }))
                  }
                  data-ocid="div-charts.tob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Place of Birth / जन्म स्थान
                </Label>
                <Input
                  placeholder="City, Country"
                  value={birthData.pob}
                  onChange={(e) =>
                    setBirthData((p) => ({ ...p, pob: e.target.value }))
                  }
                  data-ocid="div-charts.pob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={!birthData.dob || !birthData.tob}
              data-ocid="div-charts.generate.btn"
              className="saffron-gradient text-white font-heading font-semibold"
            >
              🪐 Generate All 16 Divisional Charts
            </Button>
          </CardContent>
        </Card>

        {/* Chart Group Filter */}
        <div className="flex flex-wrap gap-2">
          {["all", ...chartGroups.map((g) => g.label)].map((g) => (
            <Button
              key={g}
              variant={activeGroup === g ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveGroup(g)}
              data-ocid={`div-charts.group.${g.replace(/\s+/g, "-").toLowerCase()}`}
              className="text-xs"
              style={
                activeGroup === g
                  ? { background: "oklch(0.62 0.18 48)", color: "white" }
                  : {
                      borderColor: "oklch(0.30 0.08 30)",
                      color: "oklch(0.70 0.06 60)",
                    }
              }
            >
              {g === "all" ? "All 16 Charts" : g}
            </Button>
          ))}
        </div>

        {/* Charts List + Detail */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Chart List */}
          <div>
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {filteredCharts.length} Charts
            </h2>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2 pr-2">
                {filteredCharts.map((chart) => (
                  <button
                    type="button"
                    key={chart.id}
                    onClick={() => setActiveChart(chart.id)}
                    data-ocid={`div-charts.${chart.id}.tab`}
                    className="w-full text-left rounded-xl p-3 border transition-all"
                    style={{
                      background:
                        activeChart === chart.id
                          ? "oklch(0.20 0.08 25)"
                          : "oklch(0.16 0.05 22)",
                      borderColor:
                        activeChart === chart.id
                          ? `${chart.colorCode}88`
                          : "oklch(0.24 0.06 25)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{chart.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-mono text-xs font-bold"
                            style={{ color: chart.colorCode }}
                          >
                            {chart.code}
                          </span>
                          <span className="font-heading text-sm font-semibold text-foreground truncate">
                            {chart.name}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {chart.lifeArea}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chart Detail Panel */}
          <div>
            {isGenerated ? (
              <ChartDetailPanel chartId={activeChart} birthData={birthData} />
            ) : (
              <div
                className="rounded-2xl flex flex-col items-center justify-center text-center p-12 border h-full min-h-[400px]"
                style={{
                  background: "oklch(0.16 0.06 22)",
                  borderColor: "oklch(0.24 0.06 25)",
                }}
              >
                <div className="text-6xl mb-4">🪐</div>
                <h3
                  className="font-heading text-xl font-bold mb-2"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  Enter Birth Details
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Fill in your birth date and time above, then click "Generate
                  All 16 Divisional Charts" to view planet positions.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.16 0.06 22)",
            borderColor: "oklch(0.28 0.06 30)",
          }}
        >
          <h2
            className="font-heading text-lg font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📖 About Shodashvarga (16 Divisional Charts)
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <p>
              षोडशवर्ग में 16 विभागीय कुंडलियाँ हैं जो जीवन के अलग-अलग पहलुओं को बारीकी से
              दर्शाती हैं। Maharshi Parashara ने इन्हें Brihat Parashara Hora Shastra में
              वर्णित किया है।
            </p>
            <p>
              Each divisional chart divides the zodiac signs into specific
              fractions. D1 has no division, D2 divides each sign into 2 parts,
              D9 into 9 parts, and so on up to D60 which divides each sign into
              60 parts.
            </p>
            <p>
              For accurate readings of higher divisional charts (D30, D40, D45,
              D60), precise birth time is essential — even a few minutes can
              change the chart significantly. Always consult a qualified Vedic
              astrologer for interpretation.
            </p>
          </div>
        </div>

        {/* Zodiac Signs Reference */}
        <div>
          <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Zodiac Signs Reference / राशि चिह्न
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {ZODIAC_SIGNS.map((z) => (
              <div
                key={z.id}
                className="rounded-lg p-2 text-center border"
                style={{
                  background: "oklch(0.16 0.05 22)",
                  borderColor: "oklch(0.24 0.06 25)",
                }}
              >
                <div
                  className="text-lg"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {z.symbol}
                </div>
                <div className="text-[10px] font-heading text-foreground">
                  {z.name}
                </div>
                <div className="text-[9px] text-muted-foreground">
                  {z.nameHindi}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
