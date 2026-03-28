import { useState } from "react";
import { calculateCompatibility } from "../utils/chaldeanNumerology";

export default function NameCompatibility() {
  const [form, setForm] = useState({
    name1: "",
    dob1: "",
    name2: "",
    dob2: "",
  });
  const [score, setScore] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name1 || !form.name2) return;
    setScore(
      calculateCompatibility(form.name1, form.dob1, form.name2, form.dob2),
    );
  };

  const getLabel = (s: number) =>
    s >= 80
      ? "Excellent Match"
      : s >= 65
        ? "Good Match"
        : s >= 50
          ? "Moderate Match"
          : "Challenging Match";
  const getColor = (s: number) =>
    s >= 80
      ? "oklch(0.65 0.16 140)"
      : s >= 65
        ? "oklch(0.68 0.20 48)"
        : s >= 50
          ? "oklch(0.78 0.14 75)"
          : "oklch(0.55 0.22 25)";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="ornamental-border rounded-2xl p-6 bg-card mb-6">
        <h2
          className="font-heading text-xl font-bold mb-4 text-center"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          💑 Name Compatibility
        </h2>
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="compat-name1"
                className="block text-xs font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Person 1 Name
              </label>
              <input
                id="compat-name1"
                type="text"
                value={form.name1}
                onChange={(e) => setForm({ ...form, name1: e.target.value })}
                placeholder="Full name"
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="compat-dob1"
                className="block text-xs font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Date of Birth
              </label>
              <input
                id="compat-dob1"
                type="date"
                value={form.dob1}
                onChange={(e) => setForm({ ...form, dob1: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
              />
            </div>
            <div>
              <label
                htmlFor="compat-name2"
                className="block text-xs font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Person 2 Name
              </label>
              <input
                id="compat-name2"
                type="text"
                value={form.name2}
                onChange={(e) => setForm({ ...form, name2: e.target.value })}
                placeholder="Full name"
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
                required
              />
            </div>
            <div>
              <label
                htmlFor="compat-dob2"
                className="block text-xs font-heading font-semibold mb-1"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Date of Birth
              </label>
              <input
                id="compat-dob2"
                type="date"
                value={form.dob2}
                onChange={(e) => setForm({ ...form, dob2: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border text-sm font-body focus:outline-none bg-background"
                style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
              />
            </div>
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
            Calculate Compatibility
          </button>
        </form>
      </div>

      {score !== null && (
        <div className="ornamental-border rounded-2xl p-8 bg-card text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <title>Compatibility Score</title>
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="oklch(0.93 0.02 75)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={getColor(score)}
                strokeWidth="8"
                strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-decorative font-bold text-3xl"
                style={{ color: getColor(score) }}
              >
                {score}%
              </span>
            </div>
          </div>
          <h3
            className="font-heading font-bold text-xl mb-2"
            style={{ color: getColor(score) }}
          >
            {getLabel(score)}
          </h3>
          <p className="font-body text-sm text-muted-foreground">
            {score >= 80
              ? "Exceptional compatibility! Your numerological energies are in perfect harmony."
              : score >= 65
                ? "Good compatibility. Your energies complement each other well."
                : score >= 50
                  ? "Moderate compatibility. With understanding and effort, this relationship can thrive."
                  : "Challenging compatibility. Awareness and communication are key to making this work."}
          </p>
        </div>
      )}
    </div>
  );
}
