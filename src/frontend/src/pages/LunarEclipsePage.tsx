import { useLanguage } from "../contexts/LanguageContext";

const LUNAR_ECLIPSES_2026 = [
  {
    date: "March 3, 2026",
    dateHi: "3 मार्च 2026",
    type: "Total Lunar Eclipse",
    typeHi: "खग्रास चंद्र ग्रहण",
    time: "~21:30 UTC",
    timeHi: "~3:00 प्रातः IST (4 मार्च)",
    visibility: "Americas, Europe, Africa, W. Asia",
    visibilityHi: "अमेरिका, यूरोप, अम्रीका, पश्चिम एशिया",
    visibleIndia: true,
    nakshatra: "Purva Bhadrapada",
    nakshatraHi: "पूर्व भाद्रपद",
    rashi: "Aquarius",
    rashiHi: "कुंभ",
    sutak: "9 hours before eclipse",
    sutakHi: "ग्रहण से 9 घंटे पहले",
    notes: "Visible from India in pre-dawn hours of March 4.",
    notesHi: "4 मार्च की सुबह भारत से दिखेगा।",
  },
  {
    date: "August 28, 2026",
    dateHi: "28 अगस्त 2026",
    type: "Partial Lunar Eclipse",
    typeHi: "आंशिक चंद्र ग्रहण",
    time: "~04:00 UTC",
    timeHi: "~09:30 IST",
    visibility: "Africa, Europe, Asia, Australia",
    visibilityHi: "अम्रीका, यूरोप, एशिया, ऑस्ट्रेलिया",
    visibleIndia: true,
    nakshatra: "Shravana",
    nakshatraHi: "श्रवण",
    rashi: "Capricorn",
    rashiHi: "मकर",
    sutak: "Applicable (visible from India)",
    sutakHi: "सूतक लागू (भारत में दृश्य)",
    notes: "Partial eclipse visible from India during daytime.",
    notesHi: "आंशिक ग्रहण भारत में दिन के समय दिखेगा।",
  },
];

export default function LunarEclipsePage() {
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
          <div className="text-5xl mb-4">🌕</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "चंद्र ग्रहण 2026" : "Lunar Eclipse 2026"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "तिथि, सूतक और धार्मिक महत्व"
              : "Dates, sutak, and spiritual significance"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {LUNAR_ECLIPSES_2026.map((e, idx) => (
          <div
            key={e.date}
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "oklch(0.28 0.08 30)" }}
            data-ocid={`lunar_eclipse.item.${idx + 1}`}
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
                  style={{ color: "oklch(0.68 0.14 265)" }}
                >
                  {isHindi ? e.typeHi : e.type}
                </p>
                <h2
                  className="font-heading font-bold text-xl"
                  style={{ color: "oklch(0.88 0.06 65)" }}
                >
                  {isHindi ? e.dateHi : e.date}
                </h2>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  ⏰ {isHindi ? e.timeHi : e.time}
                </p>
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
                  ? `✓ ${isHindi ? "भारत में" : "India"}`
                  : `✕ ${isHindi ? "नहीं" : "Not India"}`}
              </span>
            </div>
            <div
              className="p-6 grid sm:grid-cols-2 gap-4"
              style={{ background: "oklch(0.16 0.05 22)" }}
            >
              {[
                [
                  isHindi ? "दृश्यता" : "Visibility",
                  isHindi ? e.visibilityHi : e.visibility,
                ],
                [
                  isHindi ? "नक्षत्र/राशि" : "Nakshatra/Rashi",
                  isHindi
                    ? `${e.nakshatraHi} / ${e.rashiHi}`
                    : `${e.nakshatra} / ${e.rashi}`,
                ],
                [isHindi ? "सूतक" : "Sutak", isHindi ? e.sutakHi : e.sutak],
                [isHindi ? "नोट्स" : "Notes", isHindi ? e.notesHi : e.notes],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.55 0.04 50)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.70 0.04 55)" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
