import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// DivisionalTab.tsx — D1–D60 chart selector with North Indian SVG
import React, { useState } from "react";
import type { DivisionalCharts, PlanetData } from "../../utils/vedicAstrology";
import { ZODIAC_SIGNS } from "../../utils/vedicAstrology";
import NorthIndianChart from "./NorthIndianChart";

interface Props {
  divisional: DivisionalCharts;
}

const DIVISIONAL_INFO: Array<{
  key: keyof DivisionalCharts;
  label: string;
  purpose: string;
  lord: string;
}> = [
  {
    key: "D1",
    label: "D1 — Rasi",
    purpose: "Overall life and general personality",
    lord: "Ascendant Lord",
  },
  {
    key: "D2",
    label: "D2 — Hora",
    purpose: "Wealth and finances",
    lord: "Sun & Moon",
  },
  {
    key: "D3",
    label: "D3 — Drekkana",
    purpose: "Siblings and courage",
    lord: "Mars",
  },
  {
    key: "D4",
    label: "D4 — Chaturthamsa",
    purpose: "Fortune and property",
    lord: "Moon",
  },
  {
    key: "D5",
    label: "D5 — Panchamamsa",
    purpose: "Children and creativity",
    lord: "Jupiter",
  },
  {
    key: "D6",
    label: "D6 — Shashthamsa",
    purpose: "Health and enemies",
    lord: "Mercury",
  },
  {
    key: "D7",
    label: "D7 — Saptamamsa",
    purpose: "Children and grandchildren",
    lord: "Jupiter",
  },
  {
    key: "D8",
    label: "D8 — Ashtamamsa",
    purpose: "Obstacles and longevity",
    lord: "Saturn",
  },
  {
    key: "D9",
    label: "D9 — Navamsa",
    purpose: "Marriage, dharma, and inner nature",
    lord: "Venus",
  },
  {
    key: "D10",
    label: "D10 — Dasamsa",
    purpose: "Career and profession",
    lord: "Sun",
  },
  {
    key: "D11",
    label: "D11 — Rudramsa",
    purpose: "Death and transformation",
    lord: "Rudra",
  },
  {
    key: "D12",
    label: "D12 — Dwadasamsa",
    purpose: "Parents and ancestral karma",
    lord: "Jupiter",
  },
  {
    key: "D16",
    label: "D16 — Shodasamsa",
    purpose: "Vehicles, luxury, and comforts",
    lord: "Venus",
  },
  {
    key: "D20",
    label: "D20 — Vimshamsa",
    purpose: "Spiritual progress and worship",
    lord: "Vishnu",
  },
  {
    key: "D24",
    label: "D24 — Siddhamsa",
    purpose: "Education and learning",
    lord: "Jupiter/Mercury",
  },
  {
    key: "D27",
    label: "D27 — Bhamsa",
    purpose: "Physical strength and prowess",
    lord: "Mars",
  },
  {
    key: "D30",
    label: "D30 — Trimsamsa",
    purpose: "Misfortune and evil karma",
    lord: "Mars/Saturn/Jupiter/Mercury/Venus",
  },
  {
    key: "D40",
    label: "D40 — Khavedamsa",
    purpose: "Maternal ancestry and auspiciousness",
    lord: "Moon",
  },
  {
    key: "D45",
    label: "D45 — Akshavedamsa",
    purpose: "Paternal ancestry and character",
    lord: "Sun",
  },
  {
    key: "D60",
    label: "D60 — Shashtiamsa",
    purpose: "Past karma and accumulated merits",
    lord: "All Planets",
  },
];

function chartToHousePlanets(
  chart: Record<string, PlanetData>,
): Record<number, string[]> {
  const ABBR: Record<string, string> = {
    Sun: "Su",
    Moon: "Mo",
    Mars: "Ma",
    Mercury: "Me",
    Jupiter: "Ju",
    Venus: "Ve",
    Saturn: "Sa",
    Rahu: "Ra",
    Ketu: "Ke",
    Uranus: "Ur",
    Neptune: "Ne",
    Pluto: "Pl",
    ASC: "ASC",
  };
  const hp: Record<number, string[]> = {};
  for (let i = 1; i <= 12; i++) hp[i] = [];
  for (const [planet, data] of Object.entries(chart)) {
    const sign = data.sign;
    if (hp[sign]) hp[sign].push(ABBR[planet] ?? planet.slice(0, 2));
  }
  return hp;
}

export default function DivisionalTab({ divisional }: Props) {
  const [selected, setSelected] = useState<keyof DivisionalCharts>("D1");
  const info =
    DIVISIONAL_INFO.find((d) => d.key === selected) ?? DIVISIONAL_INFO[0];

  const chartData = divisional[selected];
  const housePlanets = chartToHousePlanets(
    chartData as Record<string, PlanetData>,
  );

  return (
    <div className="space-y-6">
      {/* Selector buttons */}
      <Card className="border-2" style={{ borderColor: "#D4AF37" }}>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-1.5">
            {DIVISIONAL_INFO.map(({ key }) => (
              <button
                key={key}
                type="button"
                data-ocid={`divisional.${key}.button`}
                onClick={() => setSelected(key)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded transition-colors"
                style={{
                  background:
                    selected === key ? "#FF9933" : "rgba(212,175,55,0.12)",
                  color: selected === key ? "#fff" : "#D4AF37",
                  border: `1px solid ${selected === key ? "#FF9933" : "#D4AF37"}`,
                }}
              >
                {key}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart display */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2" style={{ borderColor: "#D4AF37" }}>
          <CardHeader className="pb-2">
            <CardTitle
              className="text-sm font-bold"
              style={{ color: "#FF9933" }}
            >
              {info.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <NorthIndianChart housePlanets={housePlanets} size={320} />
          </CardContent>
        </Card>

        <Card className="border-2" style={{ borderColor: "#D4AF37" }}>
          <CardHeader className="pb-2">
            <CardTitle
              className="text-sm font-bold"
              style={{ color: "#FF9933" }}
            >
              Chart Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Purpose</p>
              <p className="text-sm font-semibold text-foreground">
                {info.purpose}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Ruling Planet / Deity
              </p>
              <p className="text-sm font-semibold" style={{ color: "#D4AF37" }}>
                {info.lord}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                Planetary Positions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(chartData as Record<string, PlanetData>).map(
                  ([p, d]) => (
                    <span
                      key={p}
                      className="text-[10px] px-2 py-0.5 rounded font-semibold"
                      style={{
                        background: "rgba(255,153,51,0.15)",
                        color: "#FF9933",
                        border: "1px solid rgba(255,153,51,0.3)",
                      }}
                    >
                      {p}: {ZODIAC_SIGNS[d.sign - 1]?.name ?? "?"}
                    </span>
                  ),
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
