import { useState } from "react";
import {
  LO_SHU_GRID_LAYOUT,
  LO_SHU_INTERPRETATIONS,
} from "../data/numerologyInterpretations";
import { mapNameToLoShu } from "../utils/businessNumerology";

export default function BusinessLoShuGrid() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{
    grid: number[][];
    present: number[];
    missing: number[];
  } | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setResult(mapNameToLoShu(name));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2
          className="font-heading text-xl font-bold mb-4 text-center"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          🔢 Lo Shu Grid for Business
        </h2>
        <form onSubmit={handleAnalyze} className="flex gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter business name"
            className="flex-1 px-4 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            required
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full font-heading font-bold text-sm"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            Analyze
          </button>
        </form>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="ornamental-border rounded-2xl p-6 bg-card">
            <h3
              className="font-heading font-bold text-lg mb-4 text-center"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Lo Shu Grid — {name}
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
              {/* Grid */}
              <div>
                <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
                  {LO_SHU_GRID_LAYOUT.flat().map((num) => {
                    const isPresent = result.present.includes(num);
                    const count =
                      result.grid[
                        Math.floor(LO_SHU_GRID_LAYOUT.flat().indexOf(num) / 3)
                      ][LO_SHU_GRID_LAYOUT.flat().indexOf(num) % 3];
                    return (
                      <div
                        key={num}
                        className="h-14 w-14 rounded-xl flex flex-col items-center justify-center border-2 transition-all"
                        style={{
                          borderColor: isPresent
                            ? "oklch(0.68 0.20 48)"
                            : "oklch(0.78 0.14 75 / 0.2)",
                          background: isPresent
                            ? "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.15), oklch(0.78 0.14 75 / 0.1))"
                            : "oklch(0.94 0.025 80)",
                        }}
                      >
                        <span
                          className="font-decorative font-bold text-xl leading-none"
                          style={{
                            color: isPresent
                              ? "oklch(0.68 0.20 48)"
                              : "oklch(0.70 0.04 60)",
                          }}
                        >
                          {num}
                        </span>
                        {count > 0 && (
                          <span
                            className="text-xs font-heading"
                            style={{ color: "oklch(0.68 0.20 48)" }}
                          >
                            ×{count}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interpretations */}
              <div className="flex-1 space-y-2 max-w-sm">
                {result.present.length > 0 && (
                  <div>
                    <p
                      className="font-heading font-semibold text-xs mb-2"
                      style={{ color: "oklch(0.45 0.14 140)" }}
                    >
                      Strengths (Present Numbers)
                    </p>
                    {result.present.map((n) => (
                      <div
                        key={n}
                        className="text-xs font-body p-2 rounded-lg mb-1"
                        style={{
                          background: "oklch(0.65 0.16 140 / 0.06)",
                          border: "1px solid oklch(0.65 0.16 140 / 0.15)",
                        }}
                      >
                        <span
                          className="font-heading font-bold"
                          style={{ color: "oklch(0.45 0.14 140)" }}
                        >
                          {n}:{" "}
                        </span>
                        {LO_SHU_INTERPRETATIONS[n]?.present}
                      </div>
                    ))}
                  </div>
                )}
                {result.missing.length > 0 && (
                  <div>
                    <p
                      className="font-heading font-semibold text-xs mb-2"
                      style={{ color: "oklch(0.55 0.22 25)" }}
                    >
                      Missing Numbers — Remedies
                    </p>
                    {result.missing.map((n) => (
                      <div
                        key={n}
                        className="text-xs font-body p-2 rounded-lg mb-1"
                        style={{
                          background: "oklch(0.55 0.22 25 / 0.06)",
                          border: "1px solid oklch(0.55 0.22 25 / 0.15)",
                        }}
                      >
                        <span
                          className="font-heading font-bold"
                          style={{ color: "oklch(0.55 0.22 25)" }}
                        >
                          {n}:{" "}
                        </span>
                        {LO_SHU_INTERPRETATIONS[n]?.missing}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
