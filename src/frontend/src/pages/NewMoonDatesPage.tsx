import { useLanguage } from "../contexts/LanguageContext";

const AMAVASYA_2026 = [
  {
    date: "Jan 29",
    name: "Mauni Amavasya",
    nameHi: "मौनी अमावस्या",
    sig: "Silence vow, Kumbh dip",
    sigHi: "मौन व्रत, कुंभ स्नान",
  },
  {
    date: "Feb 28",
    name: "Phalguna Amavasya",
    nameHi: "फाल्गुन अमावस्या",
    sig: "Pitru tarpan",
    sigHi: "पितृ तर्पण",
  },
  {
    date: "Mar 29",
    name: "Chaitra Amavasya",
    nameHi: "चैत्र अमावस्या",
    sig: "Sheetala Ashtami nearby",
    sigHi: "शीतला अष्टमी समीप",
  },
  {
    date: "Apr 28",
    name: "Vaishakha Amavasya",
    nameHi: "वैशाख अमावस्या",
    sig: "Vaishakha bathing rites",
    sigHi: "वैशाख स्नान विधि",
  },
  {
    date: "May 27",
    name: "Jyeshtha Amavasya",
    nameHi: "ज्येष्ठ अमावस्या",
    sig: "Pitru tarpan",
    sigHi: "पितृ तर्पण",
  },
  {
    date: "Jun 25",
    name: "Hariyali Amavasya",
    nameHi: "हरियाली अमावस्या",
    sig: "Tree planting, greenery",
    sigHi: "वृक्षारोपण",
  },
  {
    date: "Jul 25",
    name: "Shravana Amavasya",
    nameHi: "श्रावण अमावस्या",
    sig: "Shiva puja",
    sigHi: "शिव पूजा",
  },
  {
    date: "Aug 23",
    name: "Pithori Amavasya",
    nameHi: "पिठोरी अमावस्या",
    sig: "Women's vrat for children",
    sigHi: "महिलाओं का व्रत",
  },
  {
    date: "Sep 22",
    name: "Sarvapitri Amavasya",
    nameHi: "सर्वपित्री अमावस्या",
    sig: "Mahalaya / end of Pitru Paksha",
    sigHi: "महालया / पितृ पक्ष समाप्ति",
  },
  {
    date: "Oct 21",
    name: "Kartik Amavasya",
    nameHi: "कार्तिक अमावस्या",
    sig: "Diwali / Lakshmi Puja",
    sigHi: "दीपावली / लक्ष्मी पूजा",
  },
  {
    date: "Nov 20",
    name: "Margashirsha Amavasya",
    nameHi: "मार्गशीर्ष अमावस्या",
    sig: "Pitru tarpan",
    sigHi: "पितृ तर्पण",
  },
  {
    date: "Dec 20",
    name: "Paush Amavasya",
    nameHi: "पौष अमावस्या",
    sig: "Winter sacred dip",
    sigHi: "शीतकालीन स्नान",
  },
];

export default function NewMoonDatesPage() {
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
          <div className="text-5xl mb-4">🌑</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "अमावस्या 2026" : "Amavasya 2026"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "2026 की सभी अमावस्या और उनका महत्व"
              : "All Amavasya dates and their significance"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "oklch(0.28 0.08 30)" }}
          data-ocid="newmoon.list"
        >
          {AMAVASYA_2026.map((a, i) => (
            <div
              key={a.date}
              className="flex items-start gap-4 px-5 py-4 border-b"
              style={{
                background:
                  i % 2 === 0 ? "oklch(0.17 0.06 22)" : "oklch(0.16 0.05 22)",
                borderColor: "oklch(0.22 0.05 22)",
              }}
              data-ocid={`newmoon.item.${i + 1}`}
            >
              <div className="flex-shrink-0 w-14">
                <p
                  className="font-heading font-bold text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {a.date}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.85 0.06 65)" }}
                >
                  {isHindi ? a.nameHi : a.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.58 0.04 50)" }}
                >
                  {isHindi ? a.sigHi : a.sig}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
