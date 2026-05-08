import { useLanguage } from "../contexts/LanguageContext";

const RITUS = [
  {
    name: "Vasanta",
    nameHi: "वसंत",
    months: "Chaitra, Vaishakha",
    monthsHi: "चैत्र, वैशाख",
    english: "Spring",
    period: "Mar-May",
    icon: "🌸",
    festivals: "Holi, Ram Navami, Akshaya Tritiya",
    festivalsHi: "होली, राम नवमी, अक्षय तृतीया",
  },
  {
    name: "Grishma",
    nameHi: "ग्रीष्म",
    months: "Jyeshtha, Ashadha",
    monthsHi: "ज्येष्ठ, आषाढ़",
    english: "Summer",
    period: "May-Jul",
    icon: "☀️",
    festivals: "Nirjala Ekadashi, Guru Purnima",
    festivalsHi: "निर्जला एकादशी, गुरु पूर्णिमा",
  },
  {
    name: "Varsha",
    nameHi: "वर्षा",
    months: "Shravana, Bhadrapada",
    monthsHi: "श्रावण, भाद्रपद",
    english: "Monsoon",
    period: "Jul-Sep",
    icon: "🌧️",
    festivals: "Raksha Bandhan, Janmashtami, Ganesh Chaturthi",
    festivalsHi: "रक्षाबंधन, जन्माष्टमी, गणेश चतुर्थी",
  },
  {
    name: "Sharad",
    nameHi: "शरद्",
    months: "Ashwin, Kartik",
    monthsHi: "आश्विन, कार्तिक",
    english: "Autumn",
    period: "Sep-Nov",
    icon: "🍁",
    festivals: "Navratri, Dussehra, Diwali",
    festivalsHi: "नवरात्रि, दशहरा, दीपावली",
  },
  {
    name: "Hemanta",
    nameHi: "हेमंत",
    months: "Margashirsha, Paush",
    monthsHi: "मार्गशीर्ष, पौष",
    english: "Pre-winter",
    period: "Nov-Jan",
    icon: "🍂",
    festivals: "Dattatreya Jayanti, Geeta Jayanti",
    festivalsHi: "दत्तात्रेय जयंती, गीता जयंती",
  },
  {
    name: "Shishira",
    nameHi: "शिशिर",
    months: "Magha, Phalguna",
    monthsHi: "माघ, फाल्गुन",
    english: "Winter",
    period: "Jan-Mar",
    icon: "❄️",
    festivals: "Maha Shivaratri, Mauni Amavasya",
    festivalsHi: "महा शिवरात्रि, मौनी अमावस्या",
  },
];

export default function IndianSeasonsPage() {
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
          <div className="text-5xl mb-4">🌱</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "षट् रितुएं" : "Shat Ritu — Six Indian Seasons"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "छह रितु, मास और त्योहार"
              : "Six ritus, their months, and festivals"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid sm:grid-cols-2 gap-5">
          {RITUS.map((r, i) => (
            <div
              key={r.name}
              className="rounded-2xl p-6 border"
              style={{
                background: "oklch(0.17 0.06 22)",
                borderColor: "oklch(0.28 0.08 28)",
              }}
              data-ocid={`seasons.ritu.item.${i + 1}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{r.icon}</span>
                <div>
                  <h3
                    className="font-heading font-bold text-lg"
                    style={{ color: "oklch(0.85 0.06 65)" }}
                  >
                    {isHindi ? r.nameHi : r.name}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.68 0.14 75)" }}
                  >
                    {r.english} · {r.period}
                  </p>
                </div>
              </div>
              <p
                className="text-sm mb-2"
                style={{ color: "oklch(0.62 0.04 55)" }}
              >
                📅 {isHindi ? r.monthsHi : r.months}
              </p>
              <p className="text-xs" style={{ color: "oklch(0.55 0.04 50)" }}>
                🎉 {isHindi ? r.festivalsHi : r.festivals}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
