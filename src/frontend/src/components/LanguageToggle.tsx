import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import type { Language } from "../contexts/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  function handleSetLanguage(lang: Language) {
    setLanguage(lang);
    // Also persist to the 'lang' key for legacy localStorage readers
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    // Dispatch a custom event so any non-React consumers can react
    window.dispatchEvent(
      new CustomEvent("languagechange", { detail: { lang } }),
    );
  }

  return (
    <div
      className="flex items-center rounded-full overflow-hidden border"
      style={{
        border: "1px solid oklch(0.78 0.14 75 / 0.3)",
        background: "oklch(0.78 0.14 75 / 0.06)",
      }}
      data-ocid="lang.toggle"
    >
      <Globe
        className="h-3.5 w-3.5 ml-2 flex-shrink-0"
        style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
      />
      <button
        type="button"
        onClick={() => handleSetLanguage("hi")}
        className="px-2.5 py-1 text-xs font-heading font-semibold transition-all duration-200"
        style={{
          background:
            language === "hi"
              ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
              : "transparent",
          color:
            language === "hi"
              ? "oklch(0.99 0.005 80)"
              : "oklch(0.78 0.14 75 / 0.7)",
        }}
        aria-label="हिंदी में बदलें"
        data-ocid="lang.toggle.hindi"
      >
        हि
      </button>
      <button
        type="button"
        onClick={() => handleSetLanguage("en")}
        className="px-2.5 py-1 text-xs font-heading font-semibold transition-all duration-200"
        style={{
          background:
            language === "en"
              ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
              : "transparent",
          color:
            language === "en"
              ? "oklch(0.99 0.005 80)"
              : "oklch(0.78 0.14 75 / 0.7)",
        }}
        aria-label="Switch to English"
        data-ocid="lang.toggle.english"
      >
        EN
      </button>
    </div>
  );
}
