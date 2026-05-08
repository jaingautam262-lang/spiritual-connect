import { useLanguage } from "../contexts/LanguageContext";

export default function AbhijitNakshatraPage() {
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
          <div className="text-5xl mb-4">⭐</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "अभिजित नक्षत्र" : "Abhijit Nakshatra"}
          </h1>
          <p
            className="text-sm md:text-base"
            style={{ color: "oklch(0.65 0.05 58)" }}
          >
            {isHindi
              ? "28वाँ नक्षत्र — विजय का मुहूर्त"
              : "The 28th nakshatra — muhurat of victory"}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Timing Card */}
        <div
          className="rounded-2xl p-6 border"
          style={{
            background: "oklch(0.18 0.09 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.3)",
          }}
          data-ocid="abhijit.timing.card"
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ⏰ {isHindi ? "अभिजित काल" : "Abhijit Muhurat Timing"}
          </p>
          <p
            className="font-heading font-bold text-2xl mb-1"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi
              ? "11:48 – 12:36 (सौर मध्याह्न)"
              : "11:48 AM – 12:36 PM (Solar Noon)"}
          </p>
          <p className="text-xs" style={{ color: "oklch(0.55 0.04 50)" }}>
            {isHindi
              ? "अनुमानित समय — स्थानीय सूर्योदय के आधार पर बदलता है"
              : "Approximate — varies based on local sunrise time"}
          </p>
        </div>

        {/* Info Sections */}
        {[
          {
            title: isHindi
              ? "अभिजित नक्षत्र क्या है?"
              : "What is Abhijit Nakshatra?",
            icon: "🌟",
            content: isHindi
              ? "अभिजित 28वाँ नक्षत्र है जो उत्तराषाढ़ा और श्रवण के बीच स्थित है। यह भगवान ब्रह्मा का नक्षत्र माना जाता है। 'अभिजित' का अर्थ है 'विजयी।' यह नक्षत्र केवल मुहूर्त शास्त्र में ही प्रयुक्त होता है, ज्योतिष गणना में नहीं।"
              : "Abhijit is the 28th nakshatra positioned between Uttara Ashadha and Shravana. It is considered the nakshatra of Lord Brahma. The name means 'Victorious.' It is used only in muhurat calculations (auspicious timing), not in standard horoscope analysis.",
          },
          {
            title: isHindi ? "शुभ कार्य" : "Auspicious Activities",
            icon: "✅",
            content: isHindi
              ? "अभिजित मुहूर्त में नए व्यवसाय का आरंभ, यात्रा, विवाह प्रस्ताव, परीक्षा, महत्त्वपूर्ण बैठकें, और कोर्ट केस शुरू करना शुभ माना जाता है।"
              : "Starting a new business, travel, marriage proposals, examinations, important meetings, and legal proceedings are considered especially auspicious during Abhijit muhurat.",
          },
          {
            title: isHindi ? "बुधवार पर अभिजित" : "Abhijit on Wednesdays",
            icon: "⚠️",
            content: isHindi
              ? "बुधवार के दिन अभिजित मुहूर्त शुभ नहीं माना जाता। इस दिन अन्य शुभ मुहूर्त का उपयोग करें।"
              : "Abhijit muhurat is NOT considered auspicious on Wednesdays. Use an alternative muhurat on that day.",
          },
          {
            title: isHindi ? "गणना" : "Calculation",
            icon: "📐",
            content: isHindi
              ? "अभिजित का समय सूर्य की स्थानीय याम्योत्तर (LAN) से 24 मिनट पहले और 24 मिनट बाद तक होता है। यह लगभग मध्यान्ह के आसपास पड़ता है।"
              : "Abhijit spans approximately 24 minutes before and 24 minutes after Local Apparent Noon (solar noon). Exact timing depends on the location and varies day by day.",
          },
        ].map((section) => (
          <div
            key={section.title}
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.17 0.06 22)",
              borderColor: "oklch(0.28 0.08 28)",
            }}
          >
            <h3
              className="font-heading font-bold text-base mb-3 flex items-center gap-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              <span>{section.icon}</span>
              {section.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.68 0.04 55)" }}
            >
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
