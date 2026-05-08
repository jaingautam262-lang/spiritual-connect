import { useLanguage } from "../contexts/LanguageContext";

const PANCHAK_TYPES = [
  {
    name: "Mrityu Panchak",
    nameHi: "मृत्यु पंचक",
    nakshatra: "Dhanishtha",
    nakshatraHi: "धनिष्ठा",
    avoid: "Avoid travel to the south, new ventures.",
    avoidHi: "दक्षिण यात्रा और नए कार्य न करें।",
    color: "oklch(0.68 0.20 48)",
  },
  {
    name: "Agni Panchak",
    nameHi: "अग्नि पंचक",
    nakshatra: "Shatabhisha",
    nakshatraHi: "शतभिषा",
    avoid: "Avoid fire-related work, cooking large feasts.",
    avoidHi: "अग्नि संबंधी कार्य और बड़े भोज से बचें।",
    color: "oklch(0.68 0.20 28)",
  },
  {
    name: "Raja Panchak",
    nameHi: "राज पंचक",
    nakshatra: "Purva Bhadrapada",
    nakshatraHi: "पूर्व भाद्रपद",
    avoid: "Avoid govt dealings, building construction.",
    avoidHi: "सरकारी कार्य और निर्माण कार्य से बचें।",
    color: "oklch(0.68 0.14 75)",
  },
  {
    name: "Chora Panchak",
    nameHi: "चोर पंचक",
    nakshatra: "Uttara Bhadrapada",
    nakshatraHi: "उत्तर भाद्रपद",
    avoid: "Avoid buying valuables, long journeys.",
    avoidHi: "कीमती सामान खरीदना और लंबी यात्रा न करें।",
    color: "oklch(0.55 0.18 265)",
  },
  {
    name: "Rog Panchak",
    nameHi: "रोग पंचक",
    nakshatra: "Revati",
    nakshatraHi: "रेवती",
    avoid: "Avoid medical operations, health risks.",
    avoidHi: "शल्य चिकित्सा और स्वास्थ्य जोखिम से बचें।",
    color: "oklch(0.60 0.18 145)",
  },
];

const PANCHAK_2026 = [
  { month: "January", monthHi: "जनवरी", dates: "Jan 4–8, Jan 31–Feb 4" },
  { month: "February", monthHi: "फरवरी", dates: "Jan 31–Feb 4, Feb 27–Mar 3" },
  { month: "March", monthHi: "मार्च", dates: "Feb 27–Mar 3, Mar 26–Mar 30" },
  { month: "April", monthHi: "अप्रैल", dates: "Mar 26–30, Apr 22–26" },
  { month: "May", monthHi: "मई", dates: "Apr 22–26, May 20–24" },
  { month: "June", monthHi: "जून", dates: "May 20–24, Jun 16–20" },
];

export default function PanchakPage() {
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
          <div className="text-5xl mb-4">🌙</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "पंचक" : "Panchak"}
          </h1>
          <p
            className="text-sm md:text-base"
            style={{ color: "oklch(0.65 0.05 58)" }}
          >
            {isHindi
              ? "5 विशेष नक्षत्र — प्रकार, नियम और 2026 तिथियाँ"
              : "5 special nakshatras — types, rules, and 2026 dates"}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        {/* What is Panchak */}
        <div
          className="rounded-2xl p-6 border"
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
              ? "पंचक वह काल है जब चंद्रमा धनिष्ठा से रेवती नक्षत्र तक (कुंभ और मीन राशि) भ्रमण करता है। पंचक में 5 नक्षत्र आते हैं और यह काल लगभग 5 दिन चलता है।"
              : "Panchak is the period when the Moon transits from Dhanishtha to Revati nakshatra (Aquarius and Pisces). It spans 5 nakshatras and lasts approximately 5 days each lunar month."}
          </p>
        </div>

        {/* Panchak Types */}
        <section data-ocid="panchak.types.section">
          <h2
            className="font-heading font-bold text-xl mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {isHindi ? "पंचक के प्रकार" : "Types of Panchak"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {PANCHAK_TYPES.map((pt, i) => (
              <div
                key={pt.name}
                className="rounded-2xl p-5 border"
                style={{
                  background: "oklch(0.17 0.06 22)",
                  borderColor: `${pt.color} / 0.35`,
                }}
                data-ocid={`panchak.type.item.${i + 1}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: pt.color }}
                  />
                  <h3
                    className="font-heading font-bold text-sm"
                    style={{ color: "oklch(0.88 0.06 65)" }}
                  >
                    {isHindi ? pt.nameHi : pt.name}
                  </h3>
                </div>
                <p className="text-xs mb-2" style={{ color: pt.color }}>
                  ⭐ {isHindi ? pt.nakshatraHi : pt.nakshatra}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.62 0.04 55)" }}>
                  {isHindi ? pt.avoidHi : pt.avoid}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2026 Dates */}
        <section data-ocid="panchak.dates.section">
          <h2
            className="font-heading font-bold text-xl mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📅{" "}
            {isHindi
              ? "2026 पंचक तिथियाँ (अनुमानित)"
              : "2026 Panchak Dates (Approximate)"}
          </h2>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "oklch(0.28 0.08 30)" }}
          >
            {PANCHAK_2026.map((p, i) => (
              <div
                key={p.month}
                className="flex items-center justify-between px-5 py-4 border-b"
                style={{
                  background:
                    i % 2 === 0 ? "oklch(0.17 0.06 22)" : "oklch(0.16 0.05 22)",
                  borderColor: "oklch(0.24 0.06 24)",
                }}
                data-ocid={`panchak.date.item.${i + 1}`}
              >
                <p
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.78 0.06 60)" }}
                >
                  {isHindi ? p.monthHi : p.month}
                </p>
                <p
                  className="text-sm font-mono"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {p.dates}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "oklch(0.45 0.04 50)" }}>
            *{" "}
            {isHindi
              ? "ये तिथियाँ अनुमानित हैं। सटीक तिथियों के लिए पंचांग देखें।"
              : "These are approximate dates. Check your local Panchang for exact timings."}
          </p>
        </section>

        {/* Dos and Don'ts */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.17 0.06 22)",
              borderColor: "oklch(0.55 0.18 145 / 0.35)",
            }}
          >
            <h3
              className="font-heading font-bold text-base mb-3"
              style={{ color: "oklch(0.68 0.18 145)" }}
            >
              ✅ {isHindi ? "क्या करें" : "Do's"}
            </h3>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "oklch(0.68 0.04 55)" }}
            >
              {(isHindi
                ? [
                    "पूजा-पाठ करें",
                    "ध्यान और भजन करें",
                    "परिवार को समय दें",
                    "दान-धर्म करें",
                  ]
                : [
                    "Perform puja and meditation",
                    "Chant mantras and bhajans",
                    "Spend time with family",
                    "Give charity and donate",
                  ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.17 0.06 22)",
              borderColor: "oklch(0.68 0.20 48 / 0.35)",
            }}
          >
            <h3
              className="font-heading font-bold text-base mb-3"
              style={{ color: "oklch(0.68 0.20 48)" }}
            >
              ❌ {isHindi ? "क्या न करें" : "Don'ts"}
            </h3>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "oklch(0.68 0.04 55)" }}
            >
              {(isHindi
                ? [
                    "मृतदाह संस्कार से बचें",
                    "नई इमारत की नींव न डालें",
                    "लंबी यात्रा से बचें",
                    "नए कपड़े न खरीदें",
                  ]
                : [
                    "Avoid last rites when possible",
                    "Don't lay building foundations",
                    "Avoid long journeys south",
                    "Avoid buying new clothes",
                  ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
