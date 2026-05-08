import { useLanguage } from "../contexts/LanguageContext";

const RETROGRADES_2026 = [
  {
    planet: "Mercury",
    planetHi: "बुध",
    symbol: "☿",
    periods: ["Jan 26 – Feb 20", "May 28 – Jun 21", "Sep 22 – Oct 15"],
    sign: "Aquarius/Capricorn, Gemini, Libra",
    signHi: "कुंभ/मकर, मिथुन, तुला",
    effect:
      "Communication delays, tech glitches, travel disruptions. Avoid signing contracts.",
    effectHi: "संचार विलंब, तकनीकी समस्याएं। अनुबंध न करें।",
  },
  {
    planet: "Venus",
    planetHi: "शुक्र",
    symbol: "♀",
    periods: ["Jul 23 – Sep 7"],
    sign: "Virgo/Leo",
    signHi: "कन्या/सिंह",
    effect:
      "Relationship reviews, beauty or luxury delays. Avoid starting romance.",
    effectHi: "संबंधों की समीक्षा। नए संबंध न बनाएं।",
  },
  {
    planet: "Jupiter",
    planetHi: "बृहस्पति",
    symbol: "♃",
    periods: ["Oct 9, 2025 – Feb 4, 2026"],
    sign: "Gemini (ends in Taurus)",
    signHi: "मिथुन (वृष में समाप्त)",
    effect: "Review expansion plans. Good for inner spiritual growth.",
    effectHi: "विस्तार योजनाओं की समीक्षा। आंतरिक विकास शुभ।",
  },
  {
    planet: "Saturn",
    planetHi: "शनि",
    symbol: "♄",
    periods: ["Jun 7 – Oct 27, 2026"],
    sign: "Pisces",
    signHi: "मीन",
    effect: "Restructure foundations. Long-term karma correction period.",
    effectHi: "नींव पुनर्निर्माण। दीर्घकालीन कर्म सुधार्ना काल।",
  },
];

export default function GrahaVakriMargiPage() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.14 0.06 20) 0%, oklch(0.12 0.04 20) 100%)",
      }}
    >
      <section
        className="py-12 px-4 text-center border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22), oklch(0.16 0.07 28))",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🔄</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "ग्रह वक्री और मार्गी 2026" : "Graha Vakri & Margi 2026"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "2026 की सभी वक्री (Retrograde) अवधियाँ"
              : "All retrograde periods in 2026 with effects"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-4">
        {RETROGRADES_2026.map((r, i) => (
          <div
            key={r.planet}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "oklch(0.28 0.08 30)" }}
            data-ocid={`vakri.planet.item.${i + 1}`}
          >
            <div
              className="flex items-center gap-3 px-5 py-4 border-b"
              style={{
                background: "oklch(0.18 0.07 22)",
                borderColor: "oklch(0.28 0.08 28)",
              }}
            >
              <span className="text-xl">{r.symbol}</span>
              <div>
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: "oklch(0.85 0.06 65)" }}
                >
                  {isHindi ? r.planetHi : r.planet}
                </h3>
                <p className="text-xs" style={{ color: "oklch(0.68 0.14 75)" }}>
                  {isHindi ? r.signHi : r.sign}
                </p>
              </div>
            </div>
            <div className="p-5" style={{ background: "oklch(0.16 0.05 22)" }}>
              <div className="flex flex-wrap gap-2 mb-3">
                {r.periods.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      background: "oklch(0.55 0.18 265 / 0.10)",
                      borderColor: "oklch(0.55 0.18 265 / 0.30)",
                      color: "oklch(0.78 0.12 265)",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="text-sm" style={{ color: "oklch(0.65 0.04 55)" }}>
                {isHindi ? r.effectHi : r.effect}
              </p>
            </div>
          </div>
        ))}
        <div
          className="rounded-xl p-4 border text-xs"
          style={{
            background: "oklch(0.18 0.06 22)",
            borderColor: "oklch(0.30 0.08 28)",
            color: "oklch(0.52 0.04 50)",
          }}
        >
          ⚠️{" "}
          {isHindi
            ? "वक्री ग्रह अवधि अनुमानित हैं। सटीक तिथियों के लिए Swiss Ephemeris देखें।"
            : "Retrograde dates are approximate based on mean motion. Use Swiss Ephemeris for exact dates."}
        </div>
      </div>
    </div>
  );
}
