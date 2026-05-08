import { useLanguage } from "../contexts/LanguageContext";

const PLANETS_2026 = [
  {
    name: "Sun",
    nameHi: "सूर्य",
    symbol: "☉",
    position: "Transits all 12 signs throughout 2026",
    posHi: "2026 में सभी 12 राशियों में गोचर",
    note: "1 month per sign",
    noteHi: "प्रति राशि 1 माह",
  },
  {
    name: "Moon",
    nameHi: "चंद्र",
    symbol: "☽",
    position: "Transits all signs monthly",
    posHi: "मासिक गोचर सभी राशियों में",
    note: "~2.25 days per sign",
    noteHi: "प्रति राशि ~2.25 दिन",
  },
  {
    name: "Mars",
    nameHi: "मंगल",
    symbol: "♂",
    position: "Cancer to Leo (May 2026)",
    posHi: "कर्क से सिंह (May 2026)",
    note: "~1.5-2 months per sign",
    noteHi: "~1.5-2 माह",
  },
  {
    name: "Mercury",
    nameHi: "बुध",
    symbol: "☿",
    position: "Frequent sign changes; often near Sun",
    posHi: "बार-बार राशि परिवर्तन",
    note: "~3 weeks avg",
    noteHi: "~3 सप्ताह",
  },
  {
    name: "Venus",
    nameHi: "शुक्र",
    symbol: "♀",
    position: "Pisces (early) to Taurus by mid-2026",
    posHi: "मीन से वृष (2026 मध्यतक)",
    note: "~3-4 weeks per sign",
    noteHi: "~3-4 सप्ताह",
  },
  {
    name: "Jupiter",
    nameHi: "बृहस्पति",
    symbol: "♃",
    position: "Gemini through most of 2026",
    posHi: "2026 के अधिकांश समय मिथुन",
    note: "~12 months per sign",
    noteHi: "~12 माह",
  },
  {
    name: "Saturn",
    nameHi: "शनि",
    symbol: "♄",
    position: "Aquarius/Pisces transition year",
    posHi: "कुंभ/मीन परिवर्तन वर्ष",
    note: "~2.5 years per sign",
    noteHi: "~2.5 वर्ष",
  },
  {
    name: "Rahu",
    nameHi: "राहु",
    symbol: "☊",
    position: "Pisces (retrograde throughout 2026)",
    posHi: "मीन (वक्री गति)",
    note: "18 months per sign",
    noteHi: "18 माह",
  },
  {
    name: "Ketu",
    nameHi: "केतु",
    symbol: "☋",
    position: "Virgo (opposite Rahu, always retrograde)",
    posHi: "कन्या (सदा वक्री)",
    note: "18 months per sign",
    noteHi: "18 माह",
  },
];

export default function PlanetaryPositionsPage() {
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
            {isHindi ? "ग्रहों की स्थिति 2026" : "Planetary Positions 2026"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "9 ग्रहों की राशि स्थिति"
              : "Approximate positions for all 9 grahas in 2026"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "oklch(0.28 0.08 30)" }}
          data-ocid="planets.table"
        >
          <div
            className="grid grid-cols-4 gap-0 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b"
            style={{
              background: "oklch(0.20 0.08 22)",
              borderColor: "oklch(0.28 0.08 28)",
              color: "oklch(0.68 0.14 75)",
            }}
          >
            <span>{isHindi ? "ग्रह" : "Planet"}</span>
            <span className="col-span-2">
              {isHindi ? "2026 स्थिति" : "2026 Position"}
            </span>
            <span>{isHindi ? "गति" : "Speed"}</span>
          </div>
          {PLANETS_2026.map((p, i) => (
            <div
              key={p.name}
              className="grid grid-cols-4 gap-0 px-4 py-4 border-b"
              style={{
                background:
                  i % 2 === 0 ? "oklch(0.16 0.05 22)" : "oklch(0.17 0.06 22)",
                borderColor: "oklch(0.22 0.05 22)",
              }}
              data-ocid={`planets.row.${i + 1}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.symbol}</span>
                <span
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.82 0.08 65)" }}
                >
                  {isHindi ? p.nameHi : p.name}
                </span>
              </div>
              <div
                className="col-span-2 text-sm"
                style={{ color: "oklch(0.70 0.04 55)" }}
              >
                {isHindi ? p.posHi : p.position}
              </div>
              <div className="text-xs" style={{ color: "oklch(0.78 0.14 75)" }}>
                {isHindi ? p.noteHi : p.note}
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-4 rounded-xl p-4 border text-xs"
          style={{
            background: "oklch(0.18 0.06 22)",
            borderColor: "oklch(0.30 0.08 28)",
            color: "oklch(0.52 0.04 50)",
          }}
        >
          ⚠️{" "}
          {isHindi
            ? "इंगित स्थितियाँ अनुमानित हैं। सटीक स्थिति के लिए Swiss Ephemeris देखें।"
            : "Positions are approximate. Consult Swiss Ephemeris or a Jyotishi for exact positions."}
        </div>
      </div>
    </div>
  );
}
