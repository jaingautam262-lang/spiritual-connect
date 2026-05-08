import { useLanguage } from "../contexts/LanguageContext";

const TRANSITS_2026 = [
  {
    planet: "Jupiter",
    planetHi: "बृहस्पति",
    from: "Taurus",
    fromHi: "वृष",
    to: "Gemini",
    toHi: "मिथुन",
    date: "May 2025 (continues through 2026)",
    dateHi: "मई 2025 से जारी",
    impact:
      "Business expansion, communication, education boost for many signs.",
    impactHi: "व्यापार, संचार और शिक्षा का विस्तार।",
  },
  {
    planet: "Saturn",
    planetHi: "शनि",
    from: "Aquarius",
    fromHi: "कुंभ",
    to: "Pisces",
    toHi: "मीन",
    date: "March 29, 2025 – continues 2026",
    dateHi: "29 मार्च 2025 से जारी",
    impact: "Discipline in Pisces. Test for Pisces and Virgo rising.",
    impactHi: "मीन राशि में अनुशासन। मीन और कन्या लग्न के लिए परीक्षा।",
  },
  {
    planet: "Rahu",
    planetHi: "राहु",
    from: "Aries",
    fromHi: "मेष",
    to: "Pisces",
    toHi: "मीन",
    date: "October 2023 – continuing 2026",
    dateHi: "अक्टूबर 2023 से जारी",
    impact: "Spiritual confusion, foreign connections for Pisces rising.",
    impactHi: "आध्यात्मिक निभ्रमता, विदेशी संबंध।",
  },
  {
    planet: "Ketu",
    planetHi: "केतु",
    from: "Libra",
    fromHi: "तुला",
    to: "Virgo",
    toHi: "कन्या",
    date: "October 2023 – continuing 2026",
    dateHi: "अक्टूबर 2023 से जारी",
    impact: "Detachment from relationships, health focus for Virgo rising.",
    impactHi: "संबंधों से विरक्ति, कन्या लग्न के लिए स्वास्थ्य पर ध्यान।",
  },
  {
    planet: "Mars",
    planetHi: "मंगल",
    from: "Cancer",
    fromHi: "कर्क",
    to: "Leo",
    toHi: "सिंह",
    date: "Around May 2026",
    dateHi: "लगभग मई 2026",
    impact: "Energy, initiative, potential for Leo and Aries.",
    impactHi: "उर्जा, सिंह और मेष के लिए शुभ।",
  },
];

export default function GrahaGocharaPage() {
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
          <div className="text-5xl mb-4">🪐</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "ग्रह गोचर 2026" : "Graha Gochara 2026"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "मुख्य ग्रहों का राशि परिवर्तन 2026"
              : "Major planetary sign changes in 2026"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-4">
        {TRANSITS_2026.map((t, i) => (
          <div
            key={t.planet}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "oklch(0.28 0.08 30)" }}
            data-ocid={`gochara.item.${i + 1}`}
          >
            <div
              className="flex items-center gap-4 px-5 py-4 border-b"
              style={{
                background: "oklch(0.18 0.07 22)",
                borderColor: "oklch(0.28 0.08 28)",
              }}
            >
              <div className="flex-1">
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: "oklch(0.85 0.06 65)" }}
                >
                  {isHindi ? t.planetHi : t.planet}
                </h3>
                <p className="text-xs" style={{ color: "oklch(0.68 0.14 75)" }}>
                  {isHindi ? `${t.fromHi} → ${t.toHi}` : `${t.from} → ${t.to}`}{" "}
                  · {isHindi ? t.dateHi : t.date}
                </p>
              </div>
            </div>
            <div
              className="px-5 py-4"
              style={{ background: "oklch(0.16 0.05 22)" }}
            >
              <p className="text-sm" style={{ color: "oklch(0.68 0.04 55)" }}>
                {isHindi ? t.impactHi : t.impact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
