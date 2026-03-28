import { useState } from "react";
import { analyzeBusinessName } from "../utils/businessNumerology";
import type { BusinessAnalysis } from "../utils/businessNumerology";

export default function BusinessNameAnalyzer() {
  const [form, setForm] = useState({ businessName: "", ownerDob: "" });
  const [result, setResult] = useState<BusinessAnalysis | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.businessName) return;
    setResult(analyzeBusinessName(form.businessName, form.ownerDob));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2
          className="font-heading text-xl font-bold mb-4 text-center"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          🔍 Business Name Analyzer
        </h2>
        <form
          onSubmit={handleAnalyze}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            placeholder="Business Name"
            className="flex-1 px-4 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            required
          />
          <input
            type="date"
            value={form.ownerDob}
            onChange={(e) => setForm({ ...form, ownerDob: e.target.value })}
            className="flex-1 px-4 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
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
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Chaldean Value", value: result.chaldeanValue },
              { label: "Owner Moolank", value: result.ownerMoolank },
              { label: "Owner Bhagyank", value: result.ownerBhagyank },
              {
                label: "Compatibility",
                value: `${result.compatibilityScore}%`,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="ornamental-border rounded-xl p-4 bg-card text-center"
              >
                <p className="font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {item.label}
                </p>
                <div
                  className="font-decorative font-bold text-3xl"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="ornamental-border rounded-2xl p-6 bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "oklch(0.68 0.20 48 / 0.1)" }}
              >
                🪐
              </div>
              <div>
                <h3
                  className="font-heading font-bold"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {result.businessName}
                </h3>
                <p className="text-sm font-body text-muted-foreground">
                  Ruling Planet: {result.rulingPlanet} • {result.compatibility}{" "}
                  Compatibility
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div
                className="p-3 rounded-lg"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.08)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                }}
              >
                <p
                  className="font-heading font-semibold text-xs mb-2"
                  style={{ color: "oklch(0.55 0.16 60)" }}
                >
                  Lucky Days
                </p>
                {result.luckyDays.map((d) => (
                  <p key={d} className="text-xs font-body">
                    ✓ {d}
                  </p>
                ))}
              </div>
              <div
                className="p-3 rounded-lg"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.08)",
                  border: "1px solid oklch(0.68 0.20 48 / 0.2)",
                }}
              >
                <p
                  className="font-heading font-semibold text-xs mb-2"
                  style={{ color: "oklch(0.55 0.16 48)" }}
                >
                  Lucky Colors
                </p>
                {result.luckyColors.map((c) => (
                  <p key={c} className="text-xs font-body">
                    ✓ {c}
                  </p>
                ))}
              </div>
              <div
                className="p-3 rounded-lg"
                style={{
                  background: "oklch(0.65 0.16 140 / 0.08)",
                  border: "1px solid oklch(0.65 0.16 140 / 0.2)",
                }}
              >
                <p
                  className="font-heading font-semibold text-xs mb-2"
                  style={{ color: "oklch(0.45 0.14 140)" }}
                >
                  Lucky Gemstones
                </p>
                {result.luckyGemstones.map((g) => (
                  <p key={g} className="text-xs font-body">
                    💎 {g}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p
                className="font-heading font-semibold text-sm mb-2"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Recommendations
              </p>
              {result.recommendations.map((rec) => (
                <p
                  key={rec}
                  className="text-sm font-body flex gap-2"
                  style={{ color: "oklch(0.30 0.06 30)" }}
                >
                  <span style={{ color: "oklch(0.68 0.20 48)" }}>•</span> {rec}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
