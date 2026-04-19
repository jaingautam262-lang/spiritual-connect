// NorthIndianChart.tsx — North Indian diamond chart (reusable for any divisional)
import React from "react";

interface Props {
  housePlanets: Record<number, string[]>;
  size?: number;
}

const GRID_LAYOUT = [
  1, 12, 11, 10, 2, -1, -2, 9, 3, -3, -4, 8, 4, 5, 6, 7,
] as const;

export default function NorthIndianChart({ housePlanets, size = 360 }: Props) {
  const cellSize = size / 4;

  return (
    <div
      className="mx-auto rounded overflow-hidden"
      style={{
        width: size,
        height: size,
        background: "#1a0800",
        border: "2px solid #D4AF37",
        display: "grid",
        gridTemplateColumns: `repeat(4, ${cellSize}px)`,
        gridTemplateRows: `repeat(4, ${cellSize}px)`,
      }}
    >
      {GRID_LAYOUT.map((house) => {
        const isCenter = house < 0;
        const planets = isCenter ? [] : (housePlanets[house] ?? []);
        const borderStyle = "1px solid rgba(212,175,55,0.35)";

        return (
          <div
            key={`cell-${house}`}
            style={{
              borderRight: borderStyle,
              borderBottom: borderStyle,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2px",
              background: isCenter ? "rgba(26,8,0,0.6)" : undefined,
              position: "relative",
            }}
          >
            {!isCenter && (
              <span
                style={{
                  position: "absolute",
                  top: 3,
                  left: 4,
                  fontSize: 9,
                  color: "rgba(212,175,55,0.5)",
                  fontWeight: 600,
                }}
              >
                {house}
              </span>
            )}
            {planets.map((p) => (
              <span
                key={p}
                style={{
                  fontSize: 9,
                  color: "#FF9933",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  textAlign: "center",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}
