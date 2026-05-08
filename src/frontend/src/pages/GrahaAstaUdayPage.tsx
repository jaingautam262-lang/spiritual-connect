import { useLanguage } from "../contexts/LanguageContext";

const COMBUSTION_2026 = [
  {
    planet: "Mercury",
    planetHi: "बुध",
    periods: [
      "Feb 8 – Feb 28",
      "Jun 1 – Jun 24",
      "Sep 17 – Oct 10",
      "Dec 29 – Jan 2027",
    ],
    impact:
      "Avoid signing contracts, starting education, financial dealings during Mercury combustion.",
    impactHi: "बुध अस्त में अनुबंध, शिक्षा और वित्तीय कार्य से बचें।",
  },
  {
    planet: "Venus",
    planetHi: "शुक्र",
    periods: ["Mar 31 – Apr 27", "Nov 7 – Dec 6"],
    impact:
      "Avoid marriages, artistic ventures, luxury purchases during Venus combustion.",
    impactHi: "शुक्र अस्त में विवाह, कला और विलासिता से बचें।",
  },
  {
    planet: "Jupiter",
    planetHi: "बृहस्पति",
    periods: ["Mar 7 – Apr 20"],
    impact:
      "Guru Asta: Avoid new beginnings, guru initiation, annaprashan, upanayana ceremonies.",
    impactHi: "गुरु अस्त: नई शुरुआत, गुरु दीक्षा, अन्नप्राशन, उपनयन से बचें।",
  },
  {
    planet: "Mars",
    planetHi: "मंगल",
    periods: ["Jan 4 – Feb 19", "Aug 29 – Oct 5"],
    impact:
      "Avoid surgery, land disputes, aggressive ventures during Mars combustion.",
    impactHi: "मंगल अस्त में शल्य चिकित्सा, भूमि विवाद, आक्रामक कार्य से बचें।",
  },
];

export default function GrahaAstaUdayPage() {
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
          <div className="text-5xl mb-4">☀️</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "ग्रह अस्त और उदय 2026" : "Graha Asta & Uday 2026"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "ग्रहों की दहन (combustion) अवधि"
              : "Planetary combustion periods in 2026"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        <div
          className="rounded-2xl p-5 border"
          style={{
            background: "oklch(0.18 0.09 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: "oklch(0.70 0.05 58)" }}
          >
            {isHindi
              ? "ग्रह अस्त (प्रदाहन) वह स्थिति है जब कोई ग्रह सूर्य के निकट आ जाता है और उसकी शक्ति कम हो जाती है।"
              : "Graha Asta (combustion) occurs when a planet comes too close to the Sun and its energy diminishes. During these periods, activities related to the planet should be reduced. Uday means the planet emerges from the Sun's rays and regains strength."}
          </p>
        </div>
        {COMBUSTION_2026.map((c, i) => (
          <div
            key={c.planet}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "oklch(0.28 0.08 30)" }}
            data-ocid={`asta.planet.item.${i + 1}`}
          >
            <div
              className="px-5 py-4 border-b"
              style={{
                background: "oklch(0.18 0.07 22)",
                borderColor: "oklch(0.28 0.08 28)",
              }}
            >
              <h3
                className="font-heading font-bold text-base"
                style={{ color: "oklch(0.85 0.06 65)" }}
              >
                {isHindi ? c.planetHi : c.planet} —{" "}
                {isHindi ? "अस्त अवधि" : "Combustion Periods"}
              </h3>
            </div>
            <div className="p-5" style={{ background: "oklch(0.16 0.05 22)" }}>
              <div className="flex flex-wrap gap-2 mb-3">
                {c.periods.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.10)",
                      borderColor: "oklch(0.68 0.20 48 / 0.30)",
                      color: "oklch(0.78 0.14 65)",
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
              <p className="text-sm" style={{ color: "oklch(0.65 0.04 55)" }}>
                {isHindi ? c.impactHi : c.impact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
