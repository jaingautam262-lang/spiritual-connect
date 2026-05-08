import { useLanguage } from "../contexts/LanguageContext";

const MARRIAGE_SEASONS = [
  {
    months: "January 15 – March 7",
    monthsHi: "15 जनवरी – 7 मार्च",
    note: "Post Makar Sankranti season. Best months for weddings.",
    noteHi: "मकर संक्रांति के बाद विवाह का शुभ काल।",
    quality: "excellent",
  },
  {
    months: "March 7 – April 13",
    monthsHi: "7 मार्च – 13 अप्रैल",
    note: "Kharmas (Sun in Pisces) — No weddings during this period.",
    noteHi: "खरमास (सूर्य मीन राशि) — विवाह निषिद्ध।",
    quality: "inauspicious",
  },
  {
    months: "April 13 – June 2026",
    monthsHi: "13 अप्रैल – जून 2026",
    note: "Post Kharmas. Limited auspicious dates before Adhik Maas.",
    noteHi: "खरमास के बाद। अधिक मास से पहले सीमित तिथियाँ।",
    quality: "moderate",
  },
  {
    months: "July – October 2026",
    monthsHi: "जुलाई – अक्टूबर  2026",
    note: "Chaturmas — No weddings. Shravan, Bhadrapada, Ashwin.",
    noteHi: "चातुर्मास — विवाह निषिद्ध। श्रावण, भाद्रपद, आश्विन।",
    quality: "inauspicious",
  },
  {
    months: "November 2026 – January 2027",
    monthsHi: "नवंबर 2026 – जनवरी 2027",
    note: "Post Chaturmas season. Excellent for weddings.",
    noteHi: "चातुर्मास के बाद। विवाह के लिए उत्तम।",
    quality: "excellent",
  },
];

const GUIDANCE = [
  {
    titleEn: "Nakshatra",
    titleHi: "नक्षत्र",
    textEn:
      "Best: Rohini, Mrigashira, Magha, Uttara Phalguni, Hasta, Swati, Anuradha, Mool, Uttara Ashadha, Uttara Bhadrapada, Revati.",
    textHi:
      "शुभ: रोहिणी, मृगशिरा, मघा, उत्तरा फाल्गुनी, हस्त, स्वाती, अनुराधा, मूल, उत्तराषाढ़, उत्तरा भाद्रपद, रेवती।",
  },
  {
    titleEn: "Tithi",
    titleHi: "तिथि",
    textEn:
      "Best: Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Dwadashi, Trayodashi.",
    textHi: "शुभ: द्वितीया, तृतीया, पंचमी, सप्तमी, दशमी, एकादशी, द्वादशी, त्रयोदशी।",
  },
  {
    titleEn: "Day (Vara)",
    titleHi: "वार",
    textEn: "Best: Monday, Wednesday, Thursday, Friday.",
    textHi: "शुभ: सोमवार, बुधवार, गुरुवार, शुक्रवार।",
  },
  {
    titleEn: "Lagna (Ascendant)",
    titleHi: "लग्न",
    textEn: "Best: Taurus, Gemini, Cancer, Virgo, Libra, Aquarius.",
    textHi: "शुभ: वृष, मिथुन, कर्क, कन्या, तुला, कुंभ।",
  },
];

const COLOR_MAP: Record<string, string> = {
  excellent: "oklch(0.55 0.18 145 / 0.35)",
  moderate: "oklch(0.68 0.18 75 / 0.35)",
  inauspicious: "oklch(0.68 0.20 48 / 0.35)",
};

export default function MarriageDatesPage() {
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
          <div className="text-5xl mb-4">💍</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "विवाह दिन 2026" : "Auspicious Marriage Dates 2026"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "शुभ विवाह काल और मार्गदर्शन"
              : "Auspicious wedding seasons and Vedic guidance"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {MARRIAGE_SEASONS.map((s, i) => (
          <div
            key={s.months}
            className="rounded-2xl p-5 border"
            style={{
              background: "oklch(0.17 0.06 22)",
              borderColor: COLOR_MAP[s.quality],
            }}
            data-ocid={`marriage.season.item.${i + 1}`}
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: "oklch(0.85 0.06 65)" }}
                >
                  {isHindi ? s.monthsHi : s.months}
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: "oklch(0.65 0.04 55)" }}
                >
                  {isHindi ? s.noteHi : s.note}
                </p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  background: COLOR_MAP[s.quality],
                  borderColor: COLOR_MAP[s.quality],
                  color:
                    s.quality === "inauspicious"
                      ? "oklch(0.80 0.14 28)"
                      : s.quality === "excellent"
                        ? "oklch(0.80 0.16 145)"
                        : "oklch(0.80 0.14 75)",
                }}
              >
                {s.quality === "excellent"
                  ? isHindi
                    ? "शुभ"
                    : "Auspicious"
                  : s.quality === "inauspicious"
                    ? isHindi
                      ? "निषिद्ध"
                      : "Restricted"
                    : isHindi
                      ? "मध्यम"
                      : "Limited"}
              </span>
            </div>
          </div>
        ))}
        <section>
          <h2
            className="font-heading font-bold text-xl mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            📖 {isHindi ? "वैदिक विवाह मार्गदर्शन" : "Vedic Wedding Guidance"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {GUIDANCE.map((g, i) => (
              <div
                key={g.titleEn}
                className="rounded-2xl p-5 border"
                style={{
                  background: "oklch(0.17 0.06 22)",
                  borderColor: "oklch(0.28 0.08 28)",
                }}
                data-ocid={`marriage.guidance.item.${i + 1}`}
              >
                <h3
                  className="font-heading font-bold text-sm mb-2"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {isHindi ? g.titleHi : g.titleEn}
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.65 0.04 55)" }}>
                  {isHindi ? g.textHi : g.textEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
