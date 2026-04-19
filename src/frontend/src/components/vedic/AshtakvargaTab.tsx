import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// AshtakvargaTab.tsx — Ashtakvarga table with color coding
import React from "react";
import { SpeakerButton } from "../../hooks/useSpeaker";
import type { AshtakvargaTable } from "../../utils/vedicAstrology";
import { ZODIAC_SIGNS } from "../../utils/vedicAstrology";

interface Props {
  ashtakvarga: AshtakvargaTable;
  language: string;
}

function cellColor(val: number): string {
  if (val >= 5) return "rgba(34,197,94,0.25)";
  if (val >= 3) return "rgba(234,179,8,0.2)";
  return "rgba(239,68,68,0.2)";
}

export default function AshtakvargaTab({ ashtakvarga, language }: Props) {
  const planets = Object.keys(ashtakvarga.planets);

  // Find top 3 signs by sarvashtakvarga
  const sorted = [...ashtakvarga.sarvashtakvarga]
    .map((v, i) => ({ v, sign: ZODIAC_SIGNS[i] }))
    .sort((a, b) => b.v - a.v);
  const top3 = sorted
    .slice(0, 3)
    .map((s) => s.sign.name)
    .join(", ");

  const speakerText = `Your strongest signs for transits are ${top3}.`;

  return (
    <Card className="border-2" style={{ borderColor: "#D4AF37" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 flex-wrap gap-2">
        <CardTitle className="text-sm font-bold" style={{ color: "#FF9933" }}>
          Ashtakvarga — अष्टकवर्ग
        </CardTitle>
        <SpeakerButton text={speakerText} size="sm" />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[680px]">
            <thead>
              <tr style={{ background: "#1a0a00" }}>
                <th
                  className="px-2 py-1.5 border border-border/30 text-left font-semibold"
                  style={{ color: "#D4AF37" }}
                >
                  Planet
                </th>
                {ZODIAC_SIGNS.map((z) => (
                  <th
                    key={z.num}
                    className="px-1 py-1.5 border border-border/30 text-center font-semibold"
                    style={{ color: "#D4AF37" }}
                  >
                    {language === "hi"
                      ? z.nameHi.slice(0, 3)
                      : z.name.slice(0, 3)}
                  </th>
                ))}
                <th
                  className="px-2 py-1.5 border border-border/30 text-center font-bold"
                  style={{ color: "#FF9933" }}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {planets.map((planet, i) => {
                const scores = ashtakvarga.planets[planet];
                const total = ashtakvarga.binduCount[planet];
                return (
                  <tr
                    key={planet}
                    className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}
                  >
                    <td
                      className="px-2 py-1 border border-border/20 font-semibold"
                      style={{ color: "#FF9933" }}
                    >
                      {planet}
                    </td>
                    {scores.map((val, j) => (
                      <td
                        key={ZODIAC_SIGNS[j].name}
                        className="px-1 py-1 border border-border/20 text-center font-mono"
                        style={{ background: cellColor(val) }}
                      >
                        {val}
                      </td>
                    ))}
                    <td
                      className="px-2 py-1 border border-border/20 text-center font-bold"
                      style={{ color: "#D4AF37" }}
                    >
                      {total}
                    </td>
                  </tr>
                );
              })}

              {/* Sarvashtakvarga total row */}
              <tr style={{ background: "rgba(26,8,0,0.8)" }}>
                <td
                  className="px-2 py-1.5 border border-border/20 font-bold"
                  style={{ color: "#D4AF37" }}
                >
                  Total
                </td>
                {ashtakvarga.sarvashtakvarga.map((val, j) => (
                  <td
                    key={`total-${ZODIAC_SIGNS[j].name}`}
                    className="px-1 py-1.5 border border-border/20 text-center font-bold font-mono"
                    style={{
                      color:
                        val >= 28
                          ? "#22c55e"
                          : val >= 20
                            ? "#eab308"
                            : "#ef4444",
                    }}
                  >
                    {val}
                  </td>
                ))}
                <td
                  className="px-2 py-1.5 border border-border/20 text-center font-bold"
                  style={{ color: "#FF9933" }}
                >
                  {ashtakvarga.sarvashtakvarga.reduce((a, b) => a + b, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex gap-3 text-[10px] flex-wrap">
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded inline-block"
              style={{ background: "rgba(34,197,94,0.4)" }}
            />
            5–7: Favorable
          </span>
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded inline-block"
              style={{ background: "rgba(234,179,8,0.4)" }}
            />
            3–4: Moderate
          </span>
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded inline-block"
              style={{ background: "rgba(239,68,68,0.4)" }}
            />
            0–2: Challenging
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
