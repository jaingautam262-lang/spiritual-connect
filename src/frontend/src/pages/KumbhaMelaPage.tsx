import { useLanguage } from "../contexts/LanguageContext";

const LOCATIONS = [
  {
    city: "Prayagraj",
    cityHi: "प्रयागराज",
    rivers: "Ganga, Yamuna, Saraswati",
    riversHi: "गंगा, यमुना, सरस्वती",
    type: "Maha Kumbh Mela",
    typeHi: "महा कुंभ मेला",
    next: "2025 (Jan-Feb)",
    nextHi: "2025 (जन-फरवरी)",
    cycle: "Every 12 years",
    cycleHi: "प्रति 12 वर्ष",
  },
  {
    city: "Haridwar",
    cityHi: "हरिद्वार",
    rivers: "Ganga",
    riversHi: "गंगा",
    type: "Kumbh Mela",
    typeHi: "कुंभ मेला",
    next: "2034",
    nextHi: "2034",
    cycle: "Every 12 years",
    cycleHi: "प्रति 12 वर्ष",
  },
  {
    city: "Ujjain",
    cityHi: "उज्जैन",
    rivers: "Shipra",
    riversHi: "शिप्रा",
    type: "Simhastha Kumbh",
    typeHi: "सिंहस्थ कुंभ",
    next: "2028",
    nextHi: "2028",
    cycle: "Every 12 years",
    cycleHi: "प्रति 12 वर्ष",
  },
  {
    city: "Nasik (Nashik)",
    cityHi: "नासिक (नाशिक)",
    rivers: "Godavari",
    riversHi: "गोदावरी",
    type: "Simhastha Kumbh",
    typeHi: "सिंहस्थ कुंभ",
    next: "2027",
    nextHi: "2027",
    cycle: "Every 12 years",
    cycleHi: "प्रति 12 वर्ष",
  },
];

export default function KumbhaMelaPage() {
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
          <div className="text-5xl mb-4">🌊</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "कुंभ मेला" : "Kumbha Mela"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "विश्व का सबसे बड़ा तीर्थयात्रा — 4 पवित्र स्थान"
              : "World's largest pilgrimage — 4 sacred locations"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
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
              ? "कुंभ मेला विश्व का सबसे बड़ा धार्मिक सम्मेलन है। यह हर 12 वर्षों में होता है। अमृत की बूंदें जिन स्थानों पर गिरीं वहां कुंभ मेला आयोजित होता है।"
              : "Kumbha Mela is the world's largest religious gathering held every 12 years. Pilgrims take a holy dip believing it cleanses sins and grants moksha. The festival is held at 4 sacred locations."}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {LOCATIONS.map((loc, i) => (
            <div
              key={loc.city}
              className="rounded-2xl p-6 border"
              style={{
                background: "oklch(0.17 0.06 22)",
                borderColor: "oklch(0.28 0.08 28)",
              }}
              data-ocid={`kumbha.location.item.${i + 1}`}
            >
              <h3
                className="font-heading font-bold text-lg mb-3"
                style={{ color: "oklch(0.85 0.06 65)" }}
              >
                {isHindi ? loc.cityHi : loc.city}
              </h3>
              <div className="space-y-2 text-sm">
                {(
                  [
                    [
                      isHindi ? "नदी" : "River",
                      isHindi ? loc.riversHi : loc.rivers,
                    ],
                    [
                      isHindi ? "मेला प्रकार" : "Type",
                      isHindi ? loc.typeHi : loc.type,
                    ],
                    [
                      isHindi ? "अगला" : "Next",
                      isHindi ? loc.nextHi : loc.next,
                    ],
                    [
                      isHindi ? "चक्र" : "Cycle",
                      isHindi ? loc.cycleHi : loc.cycle,
                    ],
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span style={{ color: "oklch(0.55 0.04 50)" }}>
                      {label}
                    </span>
                    <span
                      className="font-semibold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
