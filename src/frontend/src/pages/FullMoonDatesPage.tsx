import { useLanguage } from "../contexts/LanguageContext";

const PURNIMA_2026 = [
  {
    date: "Jan 13",
    name: "Paush Purnima",
    nameHi: "पौष पूर्णिमा",
    festival: "Maghi Mela",
    festivalHi: "माघी मेला",
  },
  {
    date: "Feb 12",
    name: "Magha Purnima",
    nameHi: "माघ पूर्णिमा",
    festival: "Holy dip at Prayagraj",
    festivalHi: "प्रयागराज स्नान",
  },
  {
    date: "Mar 3",
    name: "Phalguna Purnima",
    nameHi: "फाल्गुन पूर्णिमा",
    festival: "Holi",
    festivalHi: "होली",
  },
  {
    date: "Apr 1",
    name: "Chaitra Purnima",
    nameHi: "चैत्र पूर्णिमा",
    festival: "Hanuman Jayanti",
    festivalHi: "हनुमान जयंती",
  },
  {
    date: "May 1",
    name: "Vaishakha Purnima",
    nameHi: "वैशाख पूर्णिमा",
    festival: "Buddha Purnima",
    festivalHi: "बुद्ध पूर्णिमा",
  },
  {
    date: "May 31",
    name: "Jyeshtha Purnima",
    nameHi: "ज्येष्ठ पूर्णिमा",
    festival: "Vat Savitri Vrat",
    festivalHi: "वट सावित्री व्रत",
  },
  {
    date: "Jun 29",
    name: "Ashadha Purnima",
    nameHi: "आषाढ़ पूर्णिमा",
    festival: "Guru Purnima",
    festivalHi: "गुरु पूर्णिमा",
  },
  {
    date: "Jul 29",
    name: "Shravana Purnima",
    nameHi: "श्रावण पूर्णिमा",
    festival: "Raksha Bandhan",
    festivalHi: "रक्षाबंधन",
  },
  {
    date: "Aug 28",
    name: "Bhadrapada Purnima",
    nameHi: "भाद्रपद पूर्णिमा",
    festival: "Lunar Eclipse (Partial)",
    festivalHi: "आंशिक चंद्रग्रहण",
  },
  {
    date: "Sep 26",
    name: "Ashwin Purnima",
    nameHi: "आश्विन पूर्णिमा",
    festival: "Sharad Purnima",
    festivalHi: "शरद पूर्णिमा",
  },
  {
    date: "Oct 26",
    name: "Kartik Purnima",
    nameHi: "कार्तिक पूर्णिमा",
    festival: "Dev Diwali, Guru Nanak Jayanti",
    festivalHi: "देव दीवाली",
  },
  {
    date: "Nov 24",
    name: "Margashirsha Purnima",
    nameHi: "मार्गशीर्ष पूर्णिमा",
    festival: "Dattatreya Jayanti",
    festivalHi: "दत्तात्रेय जयंती",
  },
  {
    date: "Dec 24",
    name: "Paush Purnima",
    nameHi: "पौष पूर्णिमा",
    festival: "Winter Purnima, sacred dip",
    festivalHi: "शीतकालीन स्नान",
  },
];

export default function FullMoonDatesPage() {
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
            {isHindi ? "पूर्णिमा 2026" : "Full Moon (Purnima) 2026"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "2026 की सभी पूर्णिमा और संबंधित त्योहार"
              : "All 13 Purnima dates with festivals"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "oklch(0.28 0.08 30)" }}
          data-ocid="fullmoon.list"
        >
          {PURNIMA_2026.map((p, i) => (
            <div
              key={p.date}
              className="flex items-start gap-4 px-5 py-4 border-b"
              style={{
                background:
                  i % 2 === 0 ? "oklch(0.17 0.06 22)" : "oklch(0.16 0.05 22)",
                borderColor: "oklch(0.22 0.05 22)",
              }}
              data-ocid={`fullmoon.item.${i + 1}`}
            >
              <div className="flex-shrink-0 w-14">
                <p
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {p.date}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.85 0.06 65)" }}
                >
                  {isHindi ? p.nameHi : p.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.58 0.04 50)" }}
                >
                  {isHindi ? p.festivalHi : p.festival}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
