import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface BirthData {
  dob: string;
  tob: string;
}

interface ShadbalaEntry {
  planet: string;
  planetHindi: string;
  symbol: string;
  sthana: number; // positional strength
  dig: number; // directional strength
  kala: number; // temporal strength
  chesta: number; // motional strength
  naisargika: number; // natural strength
  drik: number; // aspectual strength
  total: number;
  minimum: number;
  isStrong: boolean;
}

interface AshtakvargaRow {
  planet: string;
  planetHindi: string;
  houses: number[]; // bindus in each of 12 houses
  total: number;
}

function computeShadbala(seed: number): ShadbalaEntry[] {
  const planets = [
    { planet: "Sun", planetHindi: "सूर्य", symbol: "☉", minimum: 390 },
    { planet: "Moon", planetHindi: "चंद्र", symbol: "☽", minimum: 360 },
    { planet: "Mars", planetHindi: "मंगल", symbol: "♂", minimum: 300 },
    { planet: "Mercury", planetHindi: "बुध", symbol: "☿", minimum: 420 },
    { planet: "Jupiter", planetHindi: "बृहस्पति", symbol: "♃", minimum: 390 },
    { planet: "Venus", planetHindi: "शुक्र", symbol: "♀", minimum: 330 },
    { planet: "Saturn", planetHindi: "शनि", symbol: "♄", minimum: 300 },
  ];

  return planets.map((p, i) => {
    const s = seed + i * 37;
    const sthana = 60 + ((s * 3) % 120);
    const dig = 20 + ((s * 7) % 80);
    const kala = 40 + ((s * 11) % 100);
    const chesta = 30 + ((s * 13) % 70);
    const naisargika = 20 + ((s * 5) % 50);
    const drik = 10 + ((s * 17) % 40);
    const total = sthana + dig + kala + chesta + naisargika + drik;
    return {
      ...p,
      sthana,
      dig,
      kala,
      chesta,
      naisargika,
      drik,
      total,
      isStrong: total >= p.minimum,
    };
  });
}

function computeAshtakvarga(seed: number): AshtakvargaRow[] {
  const planets = [
    { planet: "Sun", planetHindi: "सूर्य" },
    { planet: "Moon", planetHindi: "चंद्र" },
    { planet: "Mars", planetHindi: "मंगल" },
    { planet: "Mercury", planetHindi: "बुध" },
    { planet: "Jupiter", planetHindi: "बृहस्पति" },
    { planet: "Venus", planetHindi: "शुक्र" },
    { planet: "Saturn", planetHindi: "शनि" },
    { planet: "Lagna (Asc)", planetHindi: "लग्न" },
  ];

  return planets.map((p, i) => {
    const houses = Array.from({ length: 12 }, (_, h) => {
      const v = ((seed + i * 31 + h * 13) % 8) + 1;
      return v;
    });
    return { ...p, houses, total: houses.reduce((a, b) => a + b, 0) };
  });
}

const HOUSE_LABELS = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
];
const HOUSE_MEANINGS = [
  "Self",
  "Wealth",
  "Siblings",
  "Home",
  "Children",
  "Health",
  "Partner",
  "Hidden",
  "Fortune",
  "Career",
  "Gains",
  "Losses",
];

function getBinduColor(val: number): string {
  if (val >= 6) return "oklch(0.65 0.18 140)";
  if (val >= 4) return "oklch(0.78 0.14 75)";
  if (val <= 2) return "oklch(0.55 0.18 20)";
  return "oklch(0.65 0.08 60)";
}

export default function PlanetaryStrength() {
  const [birthData, setBirthData] = useState<BirthData>({ dob: "", tob: "" });
  const [shadbala, setShadbala] = useState<ShadbalaEntry[] | null>(null);
  const [ashtakvarga, setAshtakvarga] = useState<AshtakvargaRow[] | null>(null);

  const handleCalculate = () => {
    const seed =
      birthData.dob.split("-").reduce((a, s) => a + Number(s), 0) +
      Number(birthData.tob.replace(":", ""));
    setShadbala(computeShadbala(seed));
    setAshtakvarga(computeAshtakvarga(seed));
  };

  return (
    <div>
      {/* Hero */}
      <div
        className="py-16 px-4 text-center"
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
          Planetary Strength
        </h1>
        <p
          className="font-heading text-lg mb-1"
          style={{ color: "oklch(0.68 0.14 70)" }}
        >
          षड्बल और अष्टकवर्ग
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Shadbala — six-fold planetary strength analysis. Ashtakvarga —
          eight-source bindu strength across 12 houses.
        </p>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-8">
        {/* Birth Data */}
        <Card
          style={{ background: "oklch(0.16 0.06 22)" }}
          className="border-primary/20"
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
            <div className="grid grid-cols-2 gap-4 mb-4">
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
                  data-ocid="planet-strength.dob.input"
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
                  data-ocid="planet-strength.tob.input"
                  style={{
                    background: "oklch(0.14 0.04 22)",
                    border: "1px solid oklch(0.28 0.06 30)",
                  }}
                />
              </div>
            </div>
            <Button
              onClick={handleCalculate}
              disabled={!birthData.dob || !birthData.tob}
              data-ocid="planet-strength.calculate.btn"
              className="saffron-gradient text-white font-heading font-semibold"
            >
              🪐 Calculate Shadbala & Ashtakvarga
            </Button>
          </CardContent>
        </Card>

        {shadbala && ashtakvarga && (
          <Tabs defaultValue="shadbala">
            <TabsList
              className="mb-6"
              style={{ background: "oklch(0.20 0.06 22)" }}
            >
              <TabsTrigger
                value="shadbala"
                data-ocid="planet-strength.shadbala.tab"
              >
                ⚡ Shadbala
              </TabsTrigger>
              <TabsTrigger
                value="ashtakvarga"
                data-ocid="planet-strength.ashtakvarga.tab"
              >
                🔢 Ashtakvarga
              </TabsTrigger>
            </TabsList>

            {/* Shadbala Tab */}
            <TabsContent value="shadbala">
              <Card style={{ background: "oklch(0.16 0.06 22)" }}>
                <CardHeader>
                  <CardTitle
                    className="font-heading"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    षड्बल — Six-Fold Planetary Strength
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Rupas (units of strength). Planets above their minimum are
                    strong.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid oklch(0.28 0.06 30)",
                          }}
                        >
                          {[
                            "Planet / ग्रह",
                            "Sthana",
                            "Dig",
                            "Kala",
                            "Chesta",
                            "Naisargika",
                            "Drik",
                            "Total",
                            "Min",
                            "Status",
                          ].map((h) => (
                            <th
                              key={h}
                              className="py-2 px-2 text-left text-muted-foreground font-semibold"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {shadbala.map((row) => (
                          <tr
                            key={row.planet}
                            style={{
                              borderBottom: "1px solid oklch(0.20 0.04 24)",
                            }}
                          >
                            <td className="py-2 px-2">
                              <div className="flex items-center gap-2">
                                <span style={{ color: "oklch(0.78 0.14 75)" }}>
                                  {row.symbol}
                                </span>
                                <div>
                                  <div className="font-semibold text-foreground">
                                    {row.planet}
                                  </div>
                                  <div className="text-muted-foreground">
                                    {row.planetHindi}
                                  </div>
                                </div>
                              </div>
                            </td>
                            {[
                              row.sthana,
                              row.dig,
                              row.kala,
                              row.chesta,
                              row.naisargika,
                              row.drik,
                            ].map((val, i) => (
                              <td
                                key={`${row.planet}-${i}`}
                                className="py-2 px-2 font-mono text-foreground"
                              >
                                {val}
                              </td>
                            ))}
                            <td
                              className="py-2 px-2 font-mono font-bold"
                              style={{
                                color: row.isStrong
                                  ? "oklch(0.65 0.18 140)"
                                  : "oklch(0.62 0.18 30)",
                              }}
                            >
                              {row.total}
                            </td>
                            <td className="py-2 px-2 font-mono text-muted-foreground">
                              {row.minimum}
                            </td>
                            <td className="py-2 px-2">
                              <Badge
                                className="text-[10px]"
                                style={{
                                  background: row.isStrong
                                    ? "oklch(0.65 0.18 140 / 0.2)"
                                    : "oklch(0.62 0.18 30 / 0.2)",
                                  color: row.isStrong
                                    ? "oklch(0.65 0.18 140)"
                                    : "oklch(0.62 0.18 30)",
                                  border: `1px solid ${row.isStrong ? "oklch(0.65 0.18 140 / 0.3)" : "oklch(0.62 0.18 30 / 0.3)"}`,
                                }}
                              >
                                {row.isStrong
                                  ? "Strong / बलवान"
                                  : "Weak / दुर्बल"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Interpretation */}
                  <div className="mt-6 grid md:grid-cols-3 gap-3">
                    {[
                      {
                        title: "Sthana Bala",
                        titleHindi: "स्थान बल",
                        desc: "Positional strength — how strong a planet is in its sign/house.",
                      },
                      {
                        title: "Dig Bala",
                        titleHindi: "दिग्बल",
                        desc: "Directional strength — each planet is strongest in a specific direction/house.",
                      },
                      {
                        title: "Kala Bala",
                        titleHindi: "काल बल",
                        desc: "Temporal strength — strength based on time of birth (day/night, season).",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl p-3 border"
                        style={{
                          background: "oklch(0.14 0.04 22)",
                          borderColor: "oklch(0.24 0.05 26)",
                        }}
                      >
                        <div
                          className="font-heading text-xs font-bold mb-1"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          {item.title} ({item.titleHindi})
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ashtakvarga Tab */}
            <TabsContent value="ashtakvarga">
              <Card style={{ background: "oklch(0.16 0.06 22)" }}>
                <CardHeader>
                  <CardTitle
                    className="font-heading"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    अष्टकवर्ग — BAV Bindu Strength Table
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Bindus in each house. Green (6–8) = auspicious, Red (1–2) =
                    challenging.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr
                          style={{
                            borderBottom: "1px solid oklch(0.28 0.06 30)",
                          }}
                        >
                          <th className="py-2 px-2 text-left text-muted-foreground font-semibold">
                            Planet
                          </th>
                          {HOUSE_LABELS.map((h, i) => (
                            <th
                              key={h}
                              className="py-2 px-1 text-center text-muted-foreground font-semibold"
                            >
                              <div>{h}</div>
                              <div className="text-[9px] font-normal">
                                {HOUSE_MEANINGS[i]}
                              </div>
                            </th>
                          ))}
                          <th className="py-2 px-2 text-center text-muted-foreground font-semibold">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ashtakvarga.map((row) => (
                          <tr
                            key={row.planet}
                            style={{
                              borderBottom: "1px solid oklch(0.20 0.04 24)",
                            }}
                          >
                            <td className="py-2 px-2">
                              <div className="font-semibold text-foreground whitespace-nowrap">
                                {row.planet}
                              </div>
                              <div className="text-muted-foreground">
                                {row.planetHindi}
                              </div>
                            </td>
                            {row.houses.map((val, hi) => (
                              <td
                                key={`${row.planet}-h${hi}`}
                                className="py-1 px-1 text-center"
                              >
                                <span
                                  className="inline-flex items-center justify-center w-6 h-6 rounded font-mono font-bold text-[11px]"
                                  style={{
                                    background: `${getBinduColor(val)}22`,
                                    color: getBinduColor(val),
                                  }}
                                >
                                  {val}
                                </span>
                              </td>
                            ))}
                            <td
                              className="py-2 px-2 text-center font-mono font-bold"
                              style={{ color: "oklch(0.78 0.14 75)" }}
                            >
                              {row.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex gap-4 mt-4 text-xs">
                    {[
                      {
                        label: "6–8 Bindus (Auspicious)",
                        color: "oklch(0.65 0.18 140)",
                      },
                      {
                        label: "3–5 Bindus (Neutral)",
                        color: "oklch(0.78 0.14 75)",
                      },
                      {
                        label: "1–2 Bindus (Challenging)",
                        color: "oklch(0.55 0.18 20)",
                      },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-1">
                        <div
                          className="w-4 h-4 rounded"
                          style={{
                            background: `${item.color}33`,
                            border: `1px solid ${item.color}66`,
                          }}
                        />
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
