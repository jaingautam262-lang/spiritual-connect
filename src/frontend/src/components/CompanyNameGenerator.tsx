import { useState } from "react";
import { BUSINESS_PURPOSES } from "../data/businessPurposeData";
import { generateCompanyNames } from "../utils/businessNumerology";

export default function CompanyNameGenerator() {
  const [form, setForm] = useState({
    ownerDob: "",
    purpose: "Wealth",
    keyword: "",
  });
  const [results, setResults] = useState<Array<{
    name: string;
    number: number;
  }> | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setResults(generateCompanyNames(form.ownerDob, form.purpose, form.keyword));
  };

  const FAVORABLE = [1, 5, 6, 9];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2
          className="font-heading text-xl font-bold mb-4 text-center"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          💡 Company Name Generator
        </h2>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cng-dob"
                className="block text-xs font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Owner Date of Birth
              </label>
              <input
                id="cng-dob"
                type="date"
                value={form.ownerDob}
                onChange={(e) => setForm({ ...form, ownerDob: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
              />
            </div>
            <div>
              <label
                htmlFor="cng-purpose"
                className="block text-xs font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Business Purpose
              </label>
              <select
                id="cng-purpose"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
              >
                {BUSINESS_PURPOSES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="cng-keyword"
              className="block text-xs font-heading font-semibold mb-1"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              Optional Keyword
            </label>
            <input
              id="cng-keyword"
              type="text"
              value={form.keyword}
              onChange={(e) => setForm({ ...form, keyword: e.target.value })}
              placeholder="e.g., Tech, Green, Royal..."
              className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full font-heading font-bold text-sm"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
          >
            Generate Names
          </button>
        </form>
      </div>

      {results && (
        <div className="space-y-3">
          <p
            className="font-heading font-semibold text-sm"
            style={{ color: "oklch(0.35 0.12 25)" }}
          >
            Generated Names ({results.length})
          </p>
          {results.map((r) => (
            <div
              key={r.name}
              className="ornamental-border rounded-xl p-4 bg-card flex items-center justify-between"
            >
              <div>
                <p
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.22 0.08 22)" }}
                >
                  {r.name}
                </p>
                <p className="text-xs font-body text-muted-foreground">
                  {FAVORABLE.includes(r.number)
                    ? "✅ Favorable number"
                    : "⚠️ Consider correction"}
                </p>
              </div>
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center font-decorative font-bold text-xl"
                style={{
                  background: FAVORABLE.includes(r.number)
                    ? "oklch(0.65 0.16 140 / 0.15)"
                    : "oklch(0.78 0.14 75 / 0.15)",
                  color: FAVORABLE.includes(r.number)
                    ? "oklch(0.45 0.14 140)"
                    : "oklch(0.55 0.16 60)",
                }}
              >
                {r.number}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
