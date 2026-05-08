import { useLanguage } from "../contexts/LanguageContext";

const ECLIPSES_2026 = [
  {
    date: "February 17, 2026",
    dateHi: "17 फरवरी 2026",
    type: "Annular Solar Eclipse",
    typeHi: "वलय सूर्य ग्रहण",
    visibility: "Southern S. America, S. Atlantic, Antarctica",
    visibilityHi: "दक्षिण अमेरिका, दक्षिण अटलांटिक, अंटार्कटिका",
    visibleIndia: false,
    nakshatra: "Shravana",
    nakshatraHi: "श्रवण",
    rashi: "Capricorn",
    rashiHi: "मकर",
    notes: "Not visible from India. No Sutak observed.",
    notesHi: "भारत से दिखाई नहीं। सूतक नहीं।",
  },
  {
    date: "August 12, 2026",
    dateHi: "12 अगस्त 2026",
    type: "Total Solar Eclipse",
    typeHi: "खग्रास सूर्य ग्रहण",
    visibility: "Greenland, Arctic, N. Europe, Russia",
    visibilityHi: "ग्रीनलैंड, आर्कटिक, उत्तरी यूरोप, रूसीआ",
    visibleIndia: false,
    nakshatra: "Pushya",
    nakshatraHi: "पुष्य",
    rashi: "Cancer",
    rashiHi: "कर्क",
    notes:
      "Not visible from India. Partial view possible in extreme NW India. No Sutak.",
    notesHi: "भारत से दिखाई नहीं। उत्तर-पश्चिम भारत में आंशिक संभव। सूतक नहीं।",
  },
];

export default function SolarEclipsePage() {
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
          <div className="text-5xl mb-4">🌞</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "सूर्य ग्रहण 2026" : "Solar Eclipse 2026"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "तिथि, दृश्यता और धार्मिक महत्व"
              : "Dates, visibility, and spiritual significance"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {ECLIPSES_2026.map((e, idx) => (
          <div
            key={e.date}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "oklch(0.28 0.08 30)" }}
            data-ocid={`solar_eclipse.item.${idx + 1}`}
          >
            <div
              className="px-6 py-5 border-b flex items-start justify-between gap-4 flex-wrap"
              style={{
                background: "oklch(0.18 0.08 22)",
                borderColor: "oklch(0.28 0.08 28)",
              }}
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.68 0.20 48)" }}
                >
                  {isHindi ? e.typeHi : e.type}
                </p>
                <h2
                  className="font-heading font-bold text-xl"
                  style={{ color: "oklch(0.88 0.06 65)" }}
                >
                  {isHindi ? e.dateHi : e.date}
                </h2>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  background: e.visibleIndia
                    ? "oklch(0.55 0.18 145 / 0.15)"
                    : "oklch(0.68 0.20 48 / 0.12)",
                  borderColor: e.visibleIndia
                    ? "oklch(0.55 0.18 145 / 0.4)"
                    : "oklch(0.68 0.20 48 / 0.3)",
                  color: e.visibleIndia
                    ? "oklch(0.68 0.18 145)"
                    : "oklch(0.68 0.20 48)",
                }}
              >
                {e.visibleIndia
                  ? `✓ ${isHindi ? "भारत में दिखेगा" : "Visible in India"}`
                  : `✕ ${isHindi ? "भारत में नहीं" : "Not visible in India"}`}
              </span>
            </div>
            <div
              className="p-6 grid sm:grid-cols-2 gap-4"
              style={{ background: "oklch(0.16 0.05 22)" }}
            >
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  {isHindi ? "दृश्यता" : "Visibility"}
                </p>
                <p className="text-sm" style={{ color: "oklch(0.70 0.04 55)" }}>
                  {isHindi ? e.visibilityHi : e.visibility}
                </p>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  {isHindi ? "नक्षत्र/राशि" : "Nakshatra/Rashi"}
                </p>
                <p className="text-sm" style={{ color: "oklch(0.70 0.04 55)" }}>
                  {isHindi
                    ? `${e.nakshatraHi} / ${e.rashiHi}`
                    : `${e.nakshatra} / ${e.rashi}`}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  {isHindi ? "नोट्स" : "Notes"}
                </p>
                <p className="text-sm" style={{ color: "oklch(0.68 0.04 55)" }}>
                  {isHindi ? e.notesHi : e.notes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
