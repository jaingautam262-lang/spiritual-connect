import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface HouseData {
  house: number;
  sign: string;
  signAbbr: string;
  planets: string[];
}

interface Props {
  houses: HouseData[];
  title?: string;
  showToggle?: boolean;
}

const SIGN_ABBRS: Record<string, string> = {
  Aries: "Ar",
  Taurus: "Ta",
  Gemini: "Ge",
  Cancer: "Ca",
  Leo: "Le",
  Virgo: "Vi",
  Libra: "Li",
  Scorpio: "Sc",
  Sagittarius: "Sg",
  Capricorn: "Cp",
  Aquarius: "Aq",
  Pisces: "Pi",
};

// North Indian chart: 12 houses in diamond layout
// House positions (center x, center y) in a 400x400 viewBox
const _NORTH_HOUSE_POLYGONS: Record<number, string> = {
  1: "200,10 310,120 200,200 90,120", // top diamond
  2: "310,120 400,10 400,120 310,200", // right-top
  3: "400,120 400,200 310,280 310,200", // right-mid (triangle)
  4: "310,280 400,280 400,390 200,200", // right-bottom area
  5: "200,200 310,280 200,390 90,280", // bottom diamond placeholder
  6: "90,280 200,390 0,390 0,280", // left-bottom area
  7: "0,280 90,280 90,200 0,200", // left-mid
  8: "0,200 90,120 90,200 0,10", // left-top area
  9: "0,10 90,120 200,10 0,10", // left-top corner
  10: "200,10 400,10 310,120 200,200", // top-right area - override below
  11: "310,200 400,200 400,280 310,280", // right
  12: "0,200 90,120 200,200 0,280", // left
};

// Proper north indian diamond grid using triangular cells
const _NORTH_POLYS: {
  house: number;
  points: string;
  cx: number;
  cy: number;
}[] = [
  { house: 1, points: "200,0 310,110 200,200 90,110", cx: 200, cy: 100 },
  { house: 12, points: "200,0 90,110 0,0", cx: 90, cy: 45 },
  { house: 11, points: "0,0 90,110 0,200", cx: 28, cy: 100 },
  { house: 10, points: "200,0 400,0 310,110", cx: 310, cy: 45 },
  { house: 9, points: "400,0 400,200 310,110", cx: 372, cy: 100 },
  { house: 2, points: "400,0 310,110 200,200 310,290", cx: 330, cy: 150 },
  // Duplicate removal — use cleaner layout
];

// Clean North Indian 4x4 grid approach
const NI_CELLS: { house: number; row: number; col: number; span?: string }[] = [
  { house: 12, row: 0, col: 0 },
  { house: 1, row: 0, col: 1 },
  { house: 2, row: 0, col: 2 },
  { house: 3, row: 0, col: 3 },
  { house: 11, row: 1, col: 0 },
  // center top-left
  // center top-right
  { house: 4, row: 1, col: 3 },
  { house: 10, row: 2, col: 0 },
  // center bottom-left
  // center bottom-right
  { house: 5, row: 2, col: 3 },
  { house: 9, row: 3, col: 0 },
  { house: 8, row: 3, col: 1 },
  { house: 7, row: 3, col: 2 },
  { house: 6, row: 3, col: 3 },
];

function NorthChart({ houses }: { houses: HouseData[] }) {
  const getHouse = (n: number) => houses.find((h) => h.house === n);
  const cellClass =
    "border border-border/60 p-1 min-h-[70px] flex flex-col items-center justify-center text-center relative";

  return (
    <div className="w-full max-w-[360px] mx-auto">
      <div className="grid grid-cols-4 border border-border">
        {NI_CELLS.map(({ house }) => {
          const h = getHouse(house);
          return (
            <div
              key={house}
              className={cellClass}
              data-ocid={`kundli.north.house.${house}`}
            >
              <span className="text-[9px] text-muted-foreground font-mono absolute top-1 left-1">
                {house}
              </span>
              <span className="text-[9px] text-primary font-semibold">
                {h?.signAbbr ?? ""}
              </span>
              <span className="text-[8px] text-foreground leading-tight mt-0.5">
                {h?.planets.join(" ") ?? ""}
              </span>
            </div>
          );
        })}
        {/* Row 1 center */}
        <div
          className="col-start-2 col-span-2 row-start-2 border border-border/60 flex items-center justify-center"
          style={{ gridRow: "2", gridColumn: "2 / 4" }}
        >
          <div className="grid grid-cols-2 w-full h-full">
            <div className="border-r border-border/60 h-[70px]" />
            <div className="h-[70px]" />
          </div>
        </div>
        {/* Row 2 center */}
        <div
          className="col-start-2 col-span-2 row-start-3 border border-border/60 flex items-center justify-center"
          style={{ gridRow: "3", gridColumn: "2 / 4" }}
        >
          <div className="grid grid-cols-2 w-full h-full">
            <div className="border-r border-border/60 h-[70px]" />
            <div className="h-[70px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// South Indian 4x4 with center 2x2 empty
// Fixed sign layout:
const SI_LAYOUT: { sign: string; row: number; col: number }[] = [
  { sign: "Pisces", row: 0, col: 0 },
  { sign: "Aries", row: 0, col: 1 },
  { sign: "Taurus", row: 0, col: 2 },
  { sign: "Gemini", row: 0, col: 3 },
  { sign: "Aquarius", row: 1, col: 0 },
  { sign: "Cancer", row: 1, col: 3 },
  { sign: "Capricorn", row: 2, col: 0 },
  { sign: "Leo", row: 2, col: 3 },
  { sign: "Sagittarius", row: 3, col: 0 },
  { sign: "Scorpio", row: 3, col: 1 },
  { sign: "Libra", row: 3, col: 2 },
  { sign: "Virgo", row: 3, col: 3 },
];

function SouthChart({ houses }: { houses: HouseData[] }) {
  const getBySign = (sign: string) => houses.find((h) => h.sign === sign);
  const cellClass =
    "border border-border/60 p-1 min-h-[70px] flex flex-col items-center justify-center text-center";

  // Build 4x4 grid array
  const grid: ((typeof SI_LAYOUT)[0] | null)[][] = Array.from(
    { length: 4 },
    () => Array.from({ length: 4 }, () => null),
  );
  for (const cell of SI_LAYOUT) grid[cell.row][cell.col] = cell;

  return (
    <div className="w-full max-w-[360px] mx-auto">
      <div className="grid grid-cols-4 border border-border">
        {grid.map((row, ri) =>
          row.map((cell, ci) => {
            if (!cell) {
              // center 2x2 empty
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed grid position
                <div key={`center-${ri}-${ci}`} className={cellClass}>
                  <span className="text-[8px] text-muted-foreground/30">·</span>
                </div>
              );
            }
            const h = getBySign(cell.sign);
            return (
              <div
                key={cell.sign}
                className={cellClass}
                data-ocid={`kundli.south.${cell.sign.toLowerCase()}`}
              >
                <span className="text-[9px] text-primary font-semibold">
                  {SIGN_ABBRS[cell.sign] ?? cell.sign.slice(0, 2)}
                </span>
                <span className="text-[8px] text-muted-foreground">
                  {h?.house ? `H${h.house}` : ""}
                </span>
                <span className="text-[8px] text-foreground leading-tight">
                  {h?.planets.join(" ") ?? ""}
                </span>
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

export function KundliChartSVG({ houses, title, showToggle = true }: Props) {
  const [format, setFormat] = useState<"north" | "south">("north");

  return (
    <div className="space-y-3">
      {(title || showToggle) && (
        <div className="flex items-center justify-between">
          {title && (
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          )}
          {showToggle && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={format === "north" ? "default" : "outline"}
                className="text-xs h-7 px-3"
                onClick={() => setFormat("north")}
                data-ocid="kundli.toggle.north"
              >
                North
              </Button>
              <Button
                size="sm"
                variant={format === "south" ? "default" : "outline"}
                className="text-xs h-7 px-3"
                onClick={() => setFormat("south")}
                data-ocid="kundli.toggle.south"
              >
                South
              </Button>
            </div>
          )}
        </div>
      )}
      {format === "north" ? (
        <NorthChart houses={houses} />
      ) : (
        <SouthChart houses={houses} />
      )}
    </div>
  );
}

export default KundliChartSVG;
