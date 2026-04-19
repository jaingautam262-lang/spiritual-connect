import type { ScriptMode } from "../contexts/LanguageContext";
import { useLanguage } from "../contexts/LanguageContext";

interface ScriptSelectorProps {
  value?: ScriptMode;
  onChange?: (mode: ScriptMode) => void;
  compact?: boolean;
}

const scriptOptions: { key: ScriptMode; hiLabel: string; enLabel: string }[] = [
  { key: "devanagari", hiLabel: "मूल", enLabel: "Original" },
  { key: "transliteration", hiLabel: "रोमन", enLabel: "Roman" },
  { key: "english", hiLabel: "अंग्रेज़ी", enLabel: "English" },
];

export default function ScriptSelector({
  value,
  onChange,
  compact = false,
}: ScriptSelectorProps) {
  const { language, scriptMode, setScriptMode } = useLanguage();
  const active = value ?? scriptMode;
  const handleChange = onChange ?? setScriptMode;

  return (
    <div
      className="inline-flex rounded-full overflow-hidden gap-0.5 p-0.5"
      style={{
        background: "oklch(0.78 0.14 75 / 0.08)",
        border: "1px solid oklch(0.78 0.14 75 / 0.2)",
      }}
      data-ocid="script.selector"
    >
      {scriptOptions.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => handleChange(opt.key)}
          className="rounded-full transition-all duration-200"
          style={{
            padding: compact ? "4px 10px" : "6px 14px",
            fontSize: compact ? "11px" : "12px",
            fontWeight: active === opt.key ? 700 : 500,
            background:
              active === opt.key
                ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                : "transparent",
            color:
              active === opt.key
                ? "oklch(0.99 0.005 80)"
                : "oklch(0.62 0.08 50)",
          }}
          aria-label={language === "hi" ? opt.hiLabel : opt.enLabel}
          data-ocid={`script.${opt.key}`}
        >
          {language === "hi" ? opt.hiLabel : opt.enLabel}
        </button>
      ))}
    </div>
  );
}
