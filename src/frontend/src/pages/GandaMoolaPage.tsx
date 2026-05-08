import { useLanguage } from "../contexts/LanguageContext";

const GANDA_MOOLA_NAKSHATRAS = [
  {
    no: 1,
    name: "Ashwini",
    nameHi: "अश्विनी",
    pada: "1st pada",
    pada_hi: "प्रथम चरण",
    effect: "Child born in 1st pada may be difficult for father.",
    effectHi: "प्रथम चरण में जन्म लेने वाले बच्चे के लिए पिता के लिए कठिनाई हो सकती है।",
    remedy: "Ashwini Kumar puja, feeding cows on Mondays for 27 days.",
    remedyHi: "अश्विनी कुमार पूजा, 27 सोमवार गायों को चारा खिलाएं।",
  },
  {
    no: 9,
    name: "Ashlesha",
    nameHi: "आश्लेषा",
    pada: "Last (4th) pada",
    pada_hi: "अंतिम (चतुर्थ) चरण",
    effect: "Last pada affects the mother. Remedies performed within 27 days.",
    effectHi: "अंतिम चरण माँ को प्रभावित करता है। 27 दिनों के भीतर उपाय करें।",
    remedy: "Serpent puja, Nag Panchami fasting, feed milk to snake idols.",
    remedyHi: "सर्प पूजा, नाग पंचमी व्रत, साँप की मूर्तियों को दूध चढ़ाएं।",
  },
  {
    no: 10,
    name: "Magha",
    nameHi: "मघा",
    pada: "1st pada",
    pada_hi: "प्रथम चरण",
    effect: "1st pada is inauspicious for paternal grandfather.",
    effectHi: "प्रथम चरण दादा के लिए अशुभ है।",
    remedy: "Pitru tarpan, pind daan, ancestor puja.",
    remedyHi: "पितृ तर्पण, पिंड दान, पितृ पूजा।",
  },
  {
    no: 18,
    name: "Jyeshtha",
    nameHi: "ज्येष्ठा",
    pada: "Last (4th) pada",
    pada_hi: "अंतिम (चतुर्थ) चरण",
    effect: "Last pada is inauspicious for older siblings.",
    effectHi: "अंतिम चरण बड़े भाई-बहन के लिए अशुभ है।",
    remedy: "Indra puja, donate to elder siblings on their behalf.",
    remedyHi: "इंद्र पूजा, बड़े भाई-बहन की ओर से दान करें।",
  },
  {
    no: 19,
    name: "Moola",
    nameHi: "मूल",
    pada: "1st pada",
    pada_hi: "प्रथम चरण",
    effect: "Most severe — 1st pada harms the father-in-law.",
    effectHi: "सबसे कठोर — प्रथम चरण ससुर को हानि पहुँचाता है।",
    remedy: "Ganesha puja for 27 days; Ketu shanti; Moola shanti ceremony.",
    remedyHi: "27 दिन गणेश पूजा; केतु शांति; मूल शांति संस्कार।",
  },
  {
    no: 27,
    name: "Revati",
    nameHi: "रेवती",
    pada: "Last (4th) pada",
    pada_hi: "अंतिम (चतुर्थ) चरण",
    effect: "Last pada affects maternal uncle.",
    effectHi: "अंतिम चरण मामा को प्रभावित करता है।",
    remedy: "Mercury (Budh) puja, donate green items, feed parrots.",
    remedyHi: "बुध पूजा, हरी वस्तुएं दान करें, तोतों को चारा दें।",
  },
];

export default function GandaMoolaPage() {
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
          <div className="text-5xl mb-4">⚡</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "गंड मूल नक्षत्र" : "Ganda Moola Nakshatras"}
          </h1>
          <p
            className="text-sm md:text-base"
            style={{ color: "oklch(0.65 0.05 58)" }}
          >
            {isHindi
              ? "6 संधि नक्षत्र — प्रभाव और उपाय"
              : "6 junction nakshatras — effects and remedies"}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Info card */}
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
              ? "गंड मूल वे नक्षत्र हैं जो राशि संधि पर स्थित हैं — अश्विनी, आश्लेषा, मघा, ज्येष्ठा, मूल और रेवती। इन नक्षत्रों में जन्म लेने पर एक विशेष शांति पूजा की जाती है।"
              : "Ganda Moola are the 6 nakshatras that fall at the junction of two rashis (zodiac signs). Children born under these nakshatras in specific padas undergo a Moola Shanti ceremony to mitigate potential effects on family members."}
          </p>
        </div>

        {/* Nakshatra Cards */}
        {GANDA_MOOLA_NAKSHATRAS.map((n, idx) => (
          <div
            key={n.name}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "oklch(0.28 0.10 30)" }}
            data-ocid={`gandamoola.nakshatra.item.${idx + 1}`}
          >
            <div
              className="flex items-center gap-4 px-5 py-4 border-b"
              style={{
                background: "oklch(0.18 0.07 22)",
                borderColor: "oklch(0.28 0.08 28)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border"
                style={{
                  background: "oklch(0.68 0.20 48 / 0.15)",
                  borderColor: "oklch(0.68 0.20 48 / 0.4)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                {n.no}
              </div>
              <div>
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: "oklch(0.88 0.06 65)" }}
                >
                  {isHindi ? n.nameHi : n.name}
                </h3>
                <p className="text-xs" style={{ color: "oklch(0.55 0.04 50)" }}>
                  {isHindi
                    ? `नक्षत्र ${n.no} · ${n.pada_hi}`
                    : `Nakshatra ${n.no} · ${n.pada}`}
                </p>
              </div>
            </div>
            <div
              className="p-5 grid sm:grid-cols-2 gap-4"
              style={{ background: "oklch(0.16 0.05 22)" }}
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  ⚠️ {isHindi ? "प्रभाव" : "Effect"}
                </p>
                <p className="text-sm" style={{ color: "oklch(0.72 0.04 55)" }}>
                  {isHindi ? n.effectHi : n.effect}
                </p>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.55 0.18 145)" }}
                >
                  🌿 {isHindi ? "उपाय" : "Remedy"}
                </p>
                <p className="text-sm" style={{ color: "oklch(0.72 0.04 55)" }}>
                  {isHindi ? n.remedyHi : n.remedy}
                </p>
              </div>
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
            ? "गंड मूल शांति पूजा जन्म के 27 दिन बाद या जब चंद्रमा उसी नक्षत्र पर वापस आए, तब करनी चाहिए।"
            : "The Moola Shanti ceremony should be performed on the 27th day after birth, or when the Moon returns to the same nakshatra. Consult a qualified Jyotishi."}
        </div>
      </div>
    </div>
  );
}
