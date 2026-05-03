import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLuckWatchesForNumber } from "@/data/luckWatches";
import {
  type PlaneAnalysis,
  analyzePlanes,
  buildGrid,
  extractLoShuNumbers,
  getNumberFrequency,
} from "@/utils/loShuGrid";
import {
  calculateMulankMultiMethod,
  getLuckyDay,
  getNumberMeaning,
  reduceNumber,
} from "@/utils/multiMethodNumerology";
import { Lock, ShoppingBag, Star, TrendingUp, Zap } from "lucide-react";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getMoolankFromDob(dob: string): number {
  // dob can be DD/MM/YYYY or DD-MM-YYYY
  const parts = dob.replace(/\//g, "-").split("-");
  if (parts.length < 1) return 0;
  const day = Number.parseInt(parts[0], 10);
  return reduceNumber(day);
}

function getBhagyankFromDob(dob: string): number {
  const normalized = dob.replace(/\//g, "-");
  const { lifePath } = calculateMulankMultiMethod(normalized);
  return lifePath;
}

function getEnergyPct(
  plane: PlaneAnalysis,
  freq: Record<number, number>,
): number {
  const totalSlots = plane.numbers.length;
  const filled = plane.numbers.filter((n) => freq[n] > 0).length;
  return Math.round((filled / totalSlots) * 100);
}

const LUCKY_NUMBERS: Record<number, number[]> = {
  1: [1, 4],
  2: [2, 7],
  3: [3, 9],
  4: [1, 4],
  5: [5, 6],
  6: [5, 6],
  7: [2, 7],
  8: [4, 8],
  9: [3, 9],
};
const NEUTRAL_NUMBERS: Record<number, number[]> = {
  1: [3],
  2: [4],
  3: [1, 5],
  4: [2],
  5: [3, 1],
  6: [3, 9],
  7: [5],
  8: [1],
  9: [6],
};
const CHALLENGE_NUMBERS: Record<number, number[]> = {
  1: [5, 6, 7, 8],
  2: [1, 5, 8, 9],
  3: [2, 7, 8],
  4: [3, 5, 6, 9],
  5: [4, 7, 8, 9],
  6: [1, 4, 7, 8],
  7: [1, 3, 4, 6, 9],
  8: [2, 3, 5, 6, 9],
  9: [1, 2, 4, 5, 7, 8],
};

// ─── Lo Shu Grid ─────────────────────────────────────────────────────────────

const LO_SHU_LAYOUT = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

function NumeroscapeGrid({
  dobNumbers,
  freq,
}: {
  dobNumbers: number[];
  freq: Record<number, number>;
}) {
  const grid = buildGrid(dobNumbers);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid grid-cols-3 gap-2 w-64">
        {LO_SHU_LAYOUT.flat().map((num, idx) => {
          const row = Math.floor(idx / 3);
          const col = idx % 3;
          const isPresent = grid[row][col] !== 0;
          const count = freq[num] || 0;
          return (
            <div
              key={num}
              data-ocid={`loshu.cell.${idx + 1}`}
              className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                isPresent ? "border-primary/60" : "border-border opacity-30"
              }`}
              style={
                isPresent
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.18 48 / 0.12), oklch(0.78 0.14 75 / 0.08))",
                    }
                  : { background: "oklch(0.93 0.02 75)" }
              }
            >
              <span
                className="font-heading font-bold text-xl"
                style={{
                  color: isPresent
                    ? "oklch(0.35 0.12 25)"
                    : "oklch(0.75 0.02 70)",
                }}
              >
                {num}
              </span>
              {isPresent && count > 1 && (
                <span
                  className="text-[9px] font-bold mt-0.5"
                  style={{ color: "oklch(0.62 0.18 48)" }}
                >
                  {"•".repeat(Math.min(count, 4))}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded border-2 inline-block"
            style={{
              borderColor: "oklch(0.62 0.18 48 / 0.6)",
              background: "oklch(0.62 0.18 48 / 0.12)",
            }}
          />
          Present
        </span>
        <span className="flex items-center gap-1">
          <span
            className="w-3 h-3 rounded border-2 inline-block opacity-30"
            style={{
              borderColor: "oklch(0.85 0.04 70)",
              background: "oklch(0.93 0.02 75)",
            }}
          />
          Missing
        </span>
      </div>
    </div>
  );
}

// ─── Energy Bar ───────────────────────────────────────────────────────────────

function EnergyBar({ pct }: { pct: number }) {
  const color =
    pct >= 67
      ? "oklch(0.62 0.16 140)"
      : pct >= 34
        ? "oklch(0.72 0.18 55)"
        : "oklch(0.55 0.22 25)";
  const label = pct >= 67 ? "High" : pct >= 34 ? "Medium" : "Low";
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ background: "oklch(0.88 0.03 72)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span
        className="text-xs font-heading font-bold w-16 text-right"
        style={{ color }}
      >
        {pct}% {label}
      </span>
    </div>
  );
}

// ─── Premium Locked Card ──────────────────────────────────────────────────────

function LockedCard({ title, icon }: { title: string; icon: string }) {
  return (
    <div
      className="rounded-xl border overflow-hidden relative"
      style={{
        borderColor: "oklch(0.78 0.14 75 / 0.3)",
        background: "oklch(0.99 0.008 80)",
      }}
    >
      <div className="blur-sm pointer-events-none p-4 pb-8">
        <p
          className="font-heading font-bold text-sm"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {icon} {title}
        </p>
        <div className="mt-2 space-y-1">
          <div className="h-2 bg-muted rounded w-full" />
          <div className="h-2 bg-muted rounded w-3/4" />
          <div className="h-2 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-background/80 to-transparent">
        <Lock className="w-5 h-5" style={{ color: "oklch(0.62 0.18 48)" }} />
        <span
          className="font-heading text-xs font-bold"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          Premium
        </span>
        <Button
          size="sm"
          className="btn-spiritual rounded-lg text-xs px-3 py-1 h-7"
          data-ocid={`premium.${title.toLowerCase().replace(/[^a-z]/g, "_")}.unlock_button`}
        >
          Unlock
        </Button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface OccultYogisReportProps {
  dob: string; // DD/MM/YYYY or DD-MM-YYYY
}

export default function OccultYogisReport({ dob }: OccultYogisReportProps) {
  const moolank = getMoolankFromDob(dob);
  const bhagyank = getBhagyankFromDob(dob);
  const dobNumbers = extractLoShuNumbers(dob);
  const freq = getNumberFrequency(dobNumbers);
  const planes = analyzePlanes(dobNumbers);
  const moolankMeaning = getNumberMeaning(moolank);
  const luckyDay = getLuckyDay(moolank);
  const luckyNumbers = LUCKY_NUMBERS[moolank] || [moolank];
  const neutralNumbers = NEUTRAL_NUMBERS[moolank] || [];
  const challengeNumbers = CHALLENGE_NUMBERS[moolank] || [];
  const watches = getLuckWatchesForNumber(moolank).slice(0, 3);

  const PREMIUM_SECTIONS = [
    { title: "Signature Vibration", icon: "✍️" },
    { title: "Numero Code", icon: "🔐" },
    { title: "Crystals & Rudraksh", icon: "💎" },
    { title: "Available Numbers", icon: "🔢" },
    { title: "Mobile Number Analysis", icon: "📱" },
    { title: "Mantras & Yantras", icon: "🕉️" },
    { title: "Love Forecast", icon: "💕" },
    { title: "Career Forecast", icon: "💼" },
    { title: "Health Forecast", icon: "🌿" },
    { title: "Vaastu Recommendations", icon: "🏠" },
    { title: "7-Year Prediction", icon: "📅" },
    { title: "Success Formula", icon: "⚡" },
  ];

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* ── Header: Moolank + Bhagyank ── */}
      <div
        className="rounded-2xl ornamental-border overflow-hidden"
        data-ocid="report.header.card"
      >
        <div
          className="px-6 py-3 text-center font-heading text-xs font-bold uppercase tracking-widest"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.35 0.12 25), oklch(0.22 0.08 22))",
            color: "oklch(0.78 0.14 75)",
          }}
        >
          ॐ Numeroscope Report · {dob}
        </div>
        <div
          className="p-6"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.99 0.008 80) 0%, oklch(0.97 0.015 85 / 0.6) 100%)",
          }}
        >
          <div className="grid grid-cols-3 divide-x divide-border">
            {/* Moolank */}
            <div
              className="flex flex-col items-center px-4"
              data-ocid="report.moolank.card"
            >
              <span className="result-label">मूलांक</span>
              <span
                className="font-heading font-black leading-none mt-1"
                style={{ fontSize: "4rem", color: "oklch(0.62 0.18 48)" }}
              >
                {moolank}
              </span>
              <span className="text-xs font-heading mt-1 text-muted-foreground">
                Birth Number
              </span>
              {moolankMeaning && (
                <Badge
                  variant="outline"
                  className="mt-2 text-[10px] font-heading"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.4)",
                    color: "oklch(0.35 0.12 25)",
                  }}
                >
                  {moolankMeaning.title}
                </Badge>
              )}
            </div>

            {/* Bhagyank */}
            <div
              className="flex flex-col items-center px-4"
              data-ocid="report.bhagyank.card"
            >
              <span className="result-label">भाग्यांक</span>
              <span
                className="font-heading font-black leading-none mt-1"
                style={{ fontSize: "4rem", color: "oklch(0.45 0.15 30)" }}
              >
                {bhagyank}
              </span>
              <span className="text-xs font-heading mt-1 text-muted-foreground">
                Life Path
              </span>
              {getNumberMeaning(bhagyank) && (
                <Badge
                  variant="outline"
                  className="mt-2 text-[10px] font-heading"
                  style={{
                    borderColor: "oklch(0.62 0.18 48 / 0.4)",
                    color: "oklch(0.35 0.12 25)",
                  }}
                >
                  {getNumberMeaning(bhagyank)?.title}
                </Badge>
              )}
            </div>

            {/* Planet */}
            <div
              className="flex flex-col items-center px-4"
              data-ocid="report.planet.card"
            >
              <span className="result-label">ग्रह स्वामी</span>
              <span
                className="font-heading font-black leading-none mt-1"
                style={{ fontSize: "2.5rem", color: "oklch(0.35 0.12 25)" }}
              >
                {moolankMeaning?.planet?.split(" ")[0] || "☀️"}
              </span>
              <span className="text-xs font-heading mt-1 text-muted-foreground">
                Ruling Planet
              </span>
              <span
                className="mt-2 text-xs font-heading font-semibold text-center"
                style={{ color: "oklch(0.62 0.18 48)" }}
              >
                {moolankMeaning?.planet || "—"}
              </span>
            </div>
          </div>

          {/* Lucky / Neutral / Challenging */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div
              className="rounded-lg p-3 text-center"
              style={{
                background: "oklch(0.65 0.16 140 / 0.08)",
                border: "1px solid oklch(0.65 0.16 140 / 0.25)",
              }}
              data-ocid="report.lucky_numbers.card"
            >
              <p className="text-[10px] uppercase tracking-wider font-heading text-muted-foreground mb-1">
                Lucky Numbers
              </p>
              <p
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.45 0.14 140)" }}
              >
                {luckyNumbers.join(", ")}
              </p>
            </div>
            <div
              className="rounded-lg p-3 text-center"
              style={{
                background: "oklch(0.72 0.18 55 / 0.08)",
                border: "1px solid oklch(0.72 0.18 55 / 0.25)",
              }}
              data-ocid="report.neutral_numbers.card"
            >
              <p className="text-[10px] uppercase tracking-wider font-heading text-muted-foreground mb-1">
                Neutral Numbers
              </p>
              <p
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.52 0.16 50)" }}
              >
                {neutralNumbers.join(", ") || "—"}
              </p>
            </div>
            <div
              className="rounded-lg p-3 text-center"
              style={{
                background: "oklch(0.55 0.22 25 / 0.08)",
                border: "1px solid oklch(0.55 0.22 25 / 0.25)",
              }}
              data-ocid="report.challenge_numbers.card"
            >
              <p className="text-[10px] uppercase tracking-wider font-heading text-muted-foreground mb-1">
                Challenge Numbers
              </p>
              <p
                className="font-heading font-bold text-lg"
                style={{ color: "oklch(0.45 0.18 25)" }}
              >
                {challengeNumbers.join(", ") || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Personal Power Vibrations ── */}
      <div
        className="rounded-2xl ornamental-border overflow-hidden"
        data-ocid="report.power_vibrations.card"
      >
        <div
          className="px-5 py-2.5 flex items-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.18 48 / 0.12), oklch(0.78 0.14 75 / 0.08))",
            borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <Zap className="w-4 h-4" style={{ color: "oklch(0.62 0.18 48)" }} />
          <h3
            className="font-heading font-bold text-sm uppercase tracking-wider"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Personal Power Vibrations
          </h3>
        </div>
        <div
          className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4"
          style={{ background: "oklch(0.99 0.008 80)" }}
        >
          {[
            {
              label: "Lucky Color",
              value: moolankMeaning?.color || "—",
              icon: "🎨",
            },
            {
              label: "Lucky Gem",
              value: moolankMeaning?.gem || "—",
              icon: "💎",
            },
            { label: "Lucky Day", value: luckyDay, icon: "📅" },
            {
              label: "Planet",
              value: moolankMeaning?.planet || "—",
              icon: "🌟",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg p-3 text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.97 0.015 85), oklch(0.95 0.02 80))",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <p className="text-[10px] uppercase tracking-wider font-heading text-muted-foreground">
                {item.label}
              </p>
              <p
                className="font-heading font-semibold text-xs mt-1 leading-tight"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
        {moolankMeaning?.description && (
          <div
            className="px-5 pb-4 text-sm font-body text-center leading-relaxed text-muted-foreground"
            style={{ background: "oklch(0.99 0.008 80)" }}
          >
            {moolankMeaning.description}
          </div>
        )}
      </div>

      {/* ── Numeroscope (Lo Shu Grid) ── */}
      <div
        className="rounded-2xl ornamental-border overflow-hidden"
        data-ocid="report.numeroscope.card"
      >
        <div
          className="px-5 py-2.5 flex items-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.18 48 / 0.12), oklch(0.78 0.14 75 / 0.08))",
            borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <Star className="w-4 h-4" style={{ color: "oklch(0.62 0.18 48)" }} />
          <h3
            className="font-heading font-bold text-sm uppercase tracking-wider"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Numeroscope — Lo Shu Grid
          </h3>
        </div>
        <div
          className="p-6 flex flex-col items-center gap-4"
          style={{ background: "oklch(0.99 0.008 80)" }}
        >
          <NumeroscapeGrid dobNumbers={dobNumbers} freq={freq} />
          <p className="text-xs text-muted-foreground text-center max-w-sm font-body">
            Numbers from your date of birth:{" "}
            <strong>{dobNumbers.join(", ")}</strong>.
            {Object.entries(freq)
              .filter(([, v]) => v === 0)
              .map(([k]) => Number(k)).length > 0 && (
              <>
                {" "}
                Missing:{" "}
                <strong className="text-destructive">
                  {Object.entries(freq)
                    .filter(([, v]) => v === 0)
                    .map(([k]) => k)
                    .join(", ")}
                </strong>
                .
              </>
            )}
          </p>
        </div>
      </div>

      {/* ── 8 Plane Analyses ── */}
      <div
        className="rounded-2xl ornamental-border overflow-hidden"
        data-ocid="report.plane_analyses.card"
      >
        <div
          className="px-5 py-2.5 flex items-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.18 48 / 0.12), oklch(0.78 0.14 75 / 0.08))",
            borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <TrendingUp
            className="w-4 h-4"
            style={{ color: "oklch(0.62 0.18 48)" }}
          />
          <h3
            className="font-heading font-bold text-sm uppercase tracking-wider"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Plane Analyses
          </h3>
        </div>
        <div
          className="divide-y divide-border"
          style={{ background: "oklch(0.99 0.008 80)" }}
        >
          {planes.map((plane, i) => {
            const pct = getEnergyPct(plane, freq);
            return (
              <div
                key={plane.name}
                className="p-4"
                data-ocid={`report.plane.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p
                      className="font-heading font-bold text-sm"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {plane.name}
                    </p>
                    <p className="font-devanagari text-xs text-muted-foreground">
                      {plane.nameHi}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="shrink-0 text-[10px] font-heading"
                    style={{
                      borderColor:
                        plane.status === "COMPLETE"
                          ? "oklch(0.65 0.16 140 / 0.5)"
                          : plane.status === "PARTIAL"
                            ? "oklch(0.72 0.18 55 / 0.5)"
                            : "oklch(0.55 0.22 25 / 0.5)",
                      color:
                        plane.status === "COMPLETE"
                          ? "oklch(0.45 0.14 140)"
                          : plane.status === "PARTIAL"
                            ? "oklch(0.52 0.16 50)"
                            : "oklch(0.45 0.18 25)",
                    }}
                  >
                    {plane.status}
                  </Badge>
                </div>
                <EnergyBar pct={pct} />
                <p className="text-xs text-muted-foreground mt-2 font-body leading-relaxed">
                  Numbers [{plane.numbers.join(", ")}] — {plane.meaning}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Success Scorecard ── */}
      <div
        className="rounded-2xl ornamental-border overflow-hidden"
        data-ocid="report.scorecard.card"
      >
        <div
          className="px-5 py-2.5 flex items-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.62 0.18 48 / 0.12), oklch(0.78 0.14 75 / 0.08))",
            borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <Star className="w-4 h-4" style={{ color: "oklch(0.62 0.18 48)" }} />
          <h3
            className="font-heading font-bold text-sm uppercase tracking-wider"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Success Scorecard
          </h3>
        </div>
        <div
          className="p-5 space-y-3"
          style={{ background: "oklch(0.99 0.008 80)" }}
        >
          {planes.map((plane, i) => {
            const pct = getEnergyPct(plane, freq);
            const barColor =
              pct >= 67
                ? "oklch(0.62 0.16 140)"
                : pct >= 34
                  ? "oklch(0.72 0.18 55)"
                  : "oklch(0.55 0.22 25)";
            return (
              <div
                key={plane.name}
                className="flex items-center gap-3"
                data-ocid={`scorecard.item.${i + 1}`}
              >
                <span
                  className="font-heading text-xs w-36 shrink-0"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {plane.name}
                </span>
                <div
                  className="flex-1 h-3 rounded-full overflow-hidden"
                  style={{ background: "oklch(0.88 0.03 72)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: barColor }}
                  />
                </div>
                <span
                  className="text-xs font-bold w-8 text-right"
                  style={{ color: barColor }}
                >
                  {pct}%
                </span>
              </div>
            );
          })}
          <div className="flex gap-4 mt-3 pt-3 border-t border-border text-xs font-body">
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "oklch(0.62 0.16 140)" }}
              />
              High ≥67%
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "oklch(0.72 0.18 55)" }}
              />
              Medium 34–66%
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: "oklch(0.55 0.22 25)" }}
              />
              Low ≤33%
            </span>
          </div>
        </div>
      </div>

      {/* ── Luck Watch Recommendations ── */}
      {watches.length > 0 && (
        <div
          className="rounded-2xl ornamental-border overflow-hidden"
          data-ocid="report.luck_watches.card"
        >
          <div
            className="px-5 py-2.5 flex items-center gap-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.18 48 / 0.12), oklch(0.78 0.14 75 / 0.08))",
              borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <ShoppingBag
              className="w-4 h-4"
              style={{ color: "oklch(0.62 0.18 48)" }}
            />
            <h3
              className="font-heading font-bold text-sm uppercase tracking-wider"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Numerology Exclusive Luck Watches for Moolank {moolank}
            </h3>
          </div>
          <div
            className="p-5 space-y-4"
            style={{ background: "oklch(0.99 0.008 80)" }}
          >
            <p className="text-xs text-muted-foreground font-body">
              These timepieces are energetically aligned with your Moolank{" "}
              {moolank} vibration. Wearing the right watch activates cosmic
              timing in your favour.
            </p>
            <div className="space-y-3">
              {watches.map((watch, i) => (
                <div
                  key={watch.id}
                  className="flex items-center gap-4 rounded-xl p-3 border transition-all"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.25)",
                    background: "oklch(0.97 0.015 85 / 0.5)",
                  }}
                  data-ocid={`luck_watch.item.${i + 1}`}
                >
                  <div
                    className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center text-2xl"
                    style={{ background: "oklch(0.78 0.14 75 / 0.1)" }}
                  >
                    ⌚
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-heading font-bold text-sm truncate"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {watch.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-0.5 line-clamp-1">
                      {watch.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="font-heading font-bold text-sm"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        ₹{watch.price.toLocaleString("en-IN")}
                      </span>
                      {watch.availability === "sold-out" && (
                        <Badge
                          variant="outline"
                          className="text-[10px]"
                          style={{
                            color: "oklch(0.45 0.18 25)",
                            borderColor: "oklch(0.55 0.22 25 / 0.4)",
                          }}
                        >
                          Sold Out
                        </Badge>
                      )}
                      {watch.availability === "pre-order" && (
                        <Badge
                          variant="outline"
                          className="text-[10px]"
                          style={{
                            color: "oklch(0.52 0.16 50)",
                            borderColor: "oklch(0.72 0.18 55 / 0.4)",
                          }}
                        >
                          Pre-Order
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="shrink-0 font-heading text-xs"
                    style={{
                      borderColor: "oklch(0.78 0.14 75 / 0.4)",
                      color: "oklch(0.35 0.12 25)",
                    }}
                    data-ocid={`luck_watch.shop_button.${i + 1}`}
                  >
                    <a href="/shop">Shop Now</a>
                  </Button>
                </div>
              ))}
            </div>
            <div className="text-center pt-1">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="font-heading font-semibold text-xs"
                style={{
                  borderColor: "oklch(0.62 0.18 48 / 0.4)",
                  color: "oklch(0.62 0.18 48)",
                }}
                data-ocid="luck_watches.view_all_button"
              >
                <a href="/shop">View All Luck Watches →</a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Premium Locked Sections ── */}
      <div data-ocid="report.premium_sections.card">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex-1 h-px"
            style={{ background: "oklch(0.78 0.14 75 / 0.3)" }}
          />
          <h3
            className="font-heading font-bold text-sm uppercase tracking-widest px-3"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            🔐 Premium Report
          </h3>
          <div
            className="flex-1 h-px"
            style={{ background: "oklch(0.78 0.14 75 / 0.3)" }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PREMIUM_SECTIONS.map((section) => (
            <LockedCard
              key={section.title}
              title={section.title}
              icon={section.icon}
            />
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4 font-body">
          Unlock all 12 premium sections for a complete life-blueprint analysis.
        </p>
        <div className="text-center mt-3">
          <Button
            className="btn-spiritual rounded-xl px-8 font-heading font-bold"
            data-ocid="premium.unlock_all_button"
          >
            🔓 Unlock Full Report
          </Button>
        </div>
      </div>
    </div>
  );
}
