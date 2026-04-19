import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const PLANETS = ["केतु", "शुक्र", "सूर्य", "चंद्र", "मंगल", "राहु", "गुरु", "शनि", "बुध"];
const DASHA_YEARS: Record<string, number> = {
  केतु: 7,
  शुक्र: 20,
  सूर्य: 6,
  चंद्र: 10,
  मंगल: 7,
  राहु: 18,
  गुरु: 16,
  शनि: 19,
  बुध: 17,
};
const DASHA_TOTAL = 120;

const PLANET_ICONS: Record<string, string> = {
  केतु: "☊",
  शुक्र: "♀",
  सूर्य: "☀",
  चंद्र: "🌙",
  मंगल: "♂",
  राहु: "☋",
  गुरु: "♃",
  शनि: "♄",
  बुध: "☿",
};
const PLANET_COLORS: Record<string, string> = {
  केतु: "oklch(0.55 0.18 30)",
  शुक्र: "oklch(0.60 0.16 305)",
  सूर्य: "oklch(0.70 0.22 55)",
  चंद्र: "oklch(0.65 0.08 200)",
  मंगल: "oklch(0.55 0.22 20)",
  राहु: "oklch(0.50 0.12 270)",
  गुरु: "oklch(0.62 0.18 75)",
  शनि: "oklch(0.55 0.10 240)",
  बुध: "oklch(0.60 0.18 145)",
};

const nakIdx = (dob: Date): number => {
  const d = dob.getDate();
  const m = dob.getMonth() + 1;
  const y = dob.getFullYear() % 100;
  return (d + m + y) % 27;
};

interface DashaPeriod {
  planet: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  antardashas: AntarDasha[];
}

interface AntarDasha {
  planet: string;
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
}

function computeDashas(dob: Date): DashaPeriod[] {
  const nak = nakIdx(dob);
  const startPlanetIdx = nak % 9;
  const now = new Date();

  // Fraction of first dasha elapsed at birth
  // Using a simplified approach: assume 50% of dasha elapsed
  const _yearsPerDay = DASHA_TOTAL / (27 * 360);
  const daysIntoNak = (dob.getDate() % 13) + 1;
  const fractionElapsed = (daysIntoNak / 13) * 0.7;

  const dashas: DashaPeriod[] = [];
  let currentDate = new Date(dob);

  // Subtract fraction elapsed from first dasha
  const firstPlanet = PLANETS[startPlanetIdx];
  const firstDashaYears = DASHA_YEARS[firstPlanet];
  const yearsElapsed = firstDashaYears * fractionElapsed;
  currentDate = new Date(
    dob.getFullYear() - yearsElapsed,
    dob.getMonth(),
    dob.getDate(),
  );

  for (let i = 0; i < 9; i++) {
    const pIdx = (startPlanetIdx + i) % 9;
    const planet = PLANETS[pIdx];
    const years = DASHA_YEARS[planet];

    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    endDate.setFullYear(endDate.getFullYear() + years);

    const isCurrent = startDate <= now && now < endDate;

    // Compute Antardashas
    const antardashas: AntarDasha[] = [];
    let aDate = new Date(startDate);
    for (let j = 0; j < 9; j++) {
      const apIdx = (pIdx + j) % 9;
      const aPlanet = PLANETS[apIdx];
      const aYears = (DASHA_YEARS[planet] * DASHA_YEARS[aPlanet]) / DASHA_TOTAL;

      const aStart = new Date(aDate);
      const aEnd = new Date(aDate);
      aEnd.setDate(aEnd.getDate() + Math.round(aYears * 365.25));

      antardashas.push({
        planet: aPlanet,
        startDate: aStart,
        endDate: aEnd,
        isCurrent: aStart <= now && now < aEnd,
      });

      aDate = new Date(aEnd);
    }

    dashas.push({ planet, startDate, endDate, isCurrent, antardashas });
    currentDate = new Date(endDate);
  }

  return dashas;
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString("hi-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function DashaCalculator() {
  const [dob, setDob] = useState("");
  const [dashas, setDashas] = useState<DashaPeriod[] | null>(null);
  const [expandedDasha, setExpandedDasha] = useState<string | null>(null);

  const handleCalculate = () => {
    if (!dob) return;
    const result = computeDashas(new Date(dob));
    setDashas(result);
    const current = result.find((d) => d.isCurrent);
    if (current) setExpandedDasha(current.planet);
  };

  return (
    <div className="space-y-6" data-ocid="dasha.section">
      <Card
        style={{
          background: "oklch(0.16 0.04 20)",
          border: "1px solid oklch(0.28 0.06 25)",
        }}
      >
        <CardHeader>
          <CardTitle
            className="font-heading"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ⏳ विंशोत्तरी दशा कैलकुलेटर
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label
              className="font-heading"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              जन्म तिथि
            </Label>
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              data-ocid="dasha.dob_input"
              style={{
                background: "oklch(0.20 0.05 20)",
                borderColor: "oklch(0.35 0.08 25)",
                color: "oklch(0.90 0.04 60)",
              }}
            />
          </div>
          <Button
            onClick={handleCalculate}
            disabled={!dob}
            data-ocid="dasha.calculate_button"
            className="w-full font-heading font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            🪐 दशा गणना करें
          </Button>
        </CardContent>
      </Card>

      {dashas && (
        <div className="space-y-3" data-ocid="dasha.result">
          <p
            className="text-sm font-heading"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            विंशोत्तरी दशा क्रम (कुल 120 वर्ष)
          </p>
          {dashas.map((dasha, i) => {
            const pColor = PLANET_COLORS[dasha.planet];
            const isExpanded = expandedDasha === dasha.planet;
            const currentAntardasha = dasha.antardashas.find(
              (a) => a.isCurrent,
            );

            return (
              <Card
                key={dasha.planet}
                data-ocid={`dasha.item.${i + 1}`}
                style={{
                  background: dasha.isCurrent
                    ? "oklch(0.18 0.08 30)"
                    : "oklch(0.16 0.04 20)",
                  border: dasha.isCurrent
                    ? `2px solid ${pColor}`
                    : "1px solid oklch(0.28 0.06 25)",
                }}
              >
                <CardContent className="pt-4 pb-3">
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() =>
                      setExpandedDasha(isExpanded ? null : dasha.planet)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {PLANET_ICONS[dasha.planet]}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="font-heading font-bold"
                              style={{ color: pColor }}
                            >
                              {dasha.planet} महादशा
                            </span>
                            {dasha.isCurrent && (
                              <Badge
                                style={{ background: pColor, color: "white" }}
                                className="text-xs"
                              >
                                ▶ चल रही
                              </Badge>
                            )}
                          </div>
                          <p
                            className="text-xs font-body"
                            style={{ color: "oklch(0.60 0.04 60)" }}
                          >
                            {fmtDate(dasha.startDate)} →{" "}
                            {fmtDate(dasha.endDate)} (
                            {DASHA_YEARS[dasha.planet]} वर्ष)
                          </p>
                        </div>
                      </div>
                      <span style={{ color: pColor }}>
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div
                      className="mt-3 pl-4 border-l-2 space-y-2"
                      style={{ borderColor: pColor }}
                    >
                      <p
                        className="text-xs font-heading"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        अंतर्दशा क्रम:
                      </p>
                      {dasha.antardashas.map((antar) => (
                        <div
                          key={antar.planet}
                          className="flex items-center justify-between py-1.5 px-2 rounded"
                          style={{
                            background: antar.isCurrent
                              ? "oklch(0.22 0.08 35)"
                              : "transparent",
                            border: antar.isCurrent
                              ? `1px solid ${PLANET_COLORS[antar.planet]}`
                              : "none",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {PLANET_ICONS[antar.planet]}
                            </span>
                            <span
                              className="text-xs font-heading"
                              style={{
                                color: antar.isCurrent
                                  ? PLANET_COLORS[antar.planet]
                                  : "oklch(0.75 0.04 60)",
                              }}
                            >
                              {antar.planet}
                              {antar.isCurrent && " ← वर्तमान"}
                            </span>
                          </div>
                          <span
                            className="text-xs font-body"
                            style={{ color: "oklch(0.55 0.04 60)" }}
                          >
                            {fmtDate(antar.startDate)} →{" "}
                            {fmtDate(antar.endDate)}
                          </span>
                        </div>
                      ))}

                      {dasha.isCurrent && currentAntardasha && (
                        <div
                          className="mt-2 p-2 rounded"
                          style={{ background: "oklch(0.14 0.04 20)" }}
                        >
                          <p
                            className="text-xs font-body"
                            style={{ color: "oklch(0.68 0.20 48)" }}
                          >
                            🔮 वर्तमान स्थिति: <strong>{dasha.planet}</strong>{" "}
                            महादशा में <strong>{currentAntardasha.planet}</strong>{" "}
                            अंतर्दशा चल रही है।
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
