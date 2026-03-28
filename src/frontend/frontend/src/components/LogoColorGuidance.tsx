import { useState } from "react";
import { LOGO_GUIDANCE } from "../data/logoGuidanceData";

export default function LogoColorGuidance() {
  const [selectedRashi, setSelectedRashi] = useState("");
  const guidance = LOGO_GUIDANCE.find((g) => g.rashi === selectedRashi);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2
          className="font-heading text-xl font-bold mb-4 text-center"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          🎨 Logo Color & Design Guidance
        </h2>
        <div>
          <label
            htmlFor="logo-rashi"
            className="block text-sm font-heading font-semibold mb-2"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Select Your Rashi (Zodiac Sign)
          </label>
          <select
            id="logo-rashi"
            value={selectedRashi}
            onChange={(e) => setSelectedRashi(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
          >
            <option value="">-- Select Rashi --</option>
            {LOGO_GUIDANCE.map((g) => (
              <option key={g.rashi} value={g.rashi}>
                {g.rashi}
              </option>
            ))}
          </select>
        </div>
      </div>

      {guidance && (
        <div className="space-y-4">
          <div className="ornamental-border rounded-2xl p-6 bg-card">
            <h3
              className="font-heading font-bold text-lg mb-1"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {guidance.rashi}
            </h3>
            <p className="text-sm font-body text-muted-foreground mb-4">
              Ruling Planet: {guidance.planet}
            </p>

            <div className="mb-4">
              <p
                className="font-heading font-semibold text-sm mb-3"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Lucky Colors for Logo
              </p>
              <div className="flex flex-wrap gap-3">
                {guidance.colors.map((color) => (
                  <div
                    key={color.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                    style={{ borderColor: "oklch(0.78 0.14 75 / 0.2)" }}
                  >
                    <div
                      className="h-6 w-6 rounded-full border border-white/20 shadow-sm"
                      style={{ background: color.hex }}
                    />
                    <span
                      className="font-heading text-xs font-semibold"
                      style={{ color: "oklch(0.35 0.12 25)" }}
                    >
                      {color.name}
                    </span>
                    <span className="text-xs font-body text-muted-foreground">
                      {color.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  Auspicious Symbols
                </p>
                {guidance.symbols.map((s) => (
                  <p key={s} className="text-xs font-body">
                    ✦ {s}
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
                  Design Elements
                </p>
                {guidance.designElements.map((d) => (
                  <p key={d} className="text-xs font-body">
                    • {d}
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
                  Recommended Fonts
                </p>
                {guidance.fonts.map((f) => (
                  <p key={f} className="text-xs font-body">
                    • {f}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
