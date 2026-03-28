import { useState } from "react";
import { NUMBER_INTERPRETATIONS } from "../data/numerologyInterpretations";
import {
  getRulingPlanet,
  reduceToSingleDigit,
} from "../utils/chaldeanNumerology";

export default function MobileNumerology() {
  const [mobile, setMobile] = useState("");
  const [result, setResult] = useState<{ sum: number; planet: string } | null>(
    null,
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = mobile.replace(/[^0-9]/g, "");
    if (digits.length < 10) return;
    const sum = reduceToSingleDigit(
      digits.split("").reduce((a, d) => a + Number.parseInt(d), 0),
    );
    setResult({ sum, planet: getRulingPlanet(sum) });
  };

  const interp = result
    ? NUMBER_INTERPRETATIONS.find((n) => n.number === result.sum)
    : null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2
          className="font-heading text-xl font-bold mb-4 text-center"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          📱 Mobile Numerology
        </h2>
        <form onSubmit={handleCalculate} className="flex gap-4">
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
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

      {result && interp && (
        <div className="ornamental-border rounded-2xl p-6 bg-card text-center">
          <div
            className="text-6xl font-decorative font-bold mb-3"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            {result.sum}
          </div>
          <h3
            className="font-heading font-bold text-xl mb-1"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            {interp.name}
          </h3>
          <p
            className="font-heading text-sm mb-4"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            Ruling Planet: {result.planet}
          </p>
          <p
            className="font-body text-sm leading-relaxed mb-4"
            style={{ color: "oklch(0.30 0.06 30)" }}
          >
            {interp.description}
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
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
                Strengths
              </p>
              {interp.strengths.map((s) => (
                <p key={s} className="text-xs font-body">
                  ✓ {s}
                </p>
              ))}
            </div>
            <div
              className="p-3 rounded-lg"
              style={{
                background: "oklch(0.55 0.22 25 / 0.08)",
                border: "1px solid oklch(0.55 0.22 25 / 0.2)",
              }}
            >
              <p
                className="font-heading font-semibold text-xs mb-2"
                style={{ color: "oklch(0.55 0.22 25)" }}
              >
                Challenges
              </p>
              {interp.challenges.map((c) => (
                <p key={c} className="text-xs font-body">
                  • {c}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
