import {
  LO_SHU_GRID_LAYOUT,
  LO_SHU_INTERPRETATIONS,
} from "../data/numerologyInterpretations";

interface Props {
  numbers: number[];
}

export default function LoShuGrid({ numbers }: Props) {
  const presentSet = new Set(numbers);
  const missing = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !presentSet.has(n));

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
      {/* Grid */}
      <div>
        <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
          {LO_SHU_GRID_LAYOUT.flat().map((num) => {
            const isPresent = presentSet.has(num);
            const count = numbers.filter((n) => n === num).length;
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
                {count > 1 && (
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
        <div className="mt-3 flex gap-4 justify-center text-xs font-body">
          <span className="flex items-center gap-1">
            <span
              className="h-3 w-3 rounded-sm inline-block"
              style={{ background: "oklch(0.68 0.20 48 / 0.3)" }}
            />
            Present
          </span>
          <span className="flex items-center gap-1">
            <span
              className="h-3 w-3 rounded-sm inline-block"
              style={{
                background: "oklch(0.94 0.025 80)",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            />
            Missing
          </span>
        </div>
      </div>

      {/* Interpretations */}
      <div className="flex-1 space-y-2 max-w-sm">
        {missing.length > 0 && (
          <div>
            <p
              className="font-heading font-semibold text-xs mb-2"
              style={{ color: "oklch(0.55 0.22 25)" }}
            >
              Missing Numbers — Remedies
            </p>
            {missing.map((n) => (
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
        {Array.from(presentSet)
          .slice(0, 3)
          .map((n) => (
            <div
              key={n}
              className="text-xs font-body p-2 rounded-lg"
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
    </div>
  );
}
