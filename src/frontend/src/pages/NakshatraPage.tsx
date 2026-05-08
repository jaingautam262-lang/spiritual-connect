import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const NAKSHATRAS = [
  {
    no: 1,
    name: "Ashwini",
    nameHi: "अश्विनी",
    deity: "Ashwini Kumars",
    deityHi: "अश्विनी कुमार",
    planet: "Ketu",
    planetHi: "केतु",
    rashi: "Aries",
    rashiHi: "मेष",
    quality: "Dharma",
  },
  {
    no: 2,
    name: "Bharani",
    nameHi: "भरणी",
    deity: "Yama",
    deityHi: "यम",
    planet: "Venus",
    planetHi: "शुक्र",
    rashi: "Aries",
    rashiHi: "मेष",
    quality: "Artha",
  },
  {
    no: 3,
    name: "Krittika",
    nameHi: "कृत्तिका",
    deity: "Agni",
    deityHi: "अग्नि",
    planet: "Sun",
    planetHi: "सूर्य",
    rashi: "Aries/Taurus",
    rashiHi: "मेष/वृष",
    quality: "Kama",
  },
  {
    no: 4,
    name: "Rohini",
    nameHi: "रोहिणी",
    deity: "Brahma",
    deityHi: "ब्रह्मा",
    planet: "Moon",
    planetHi: "चंद्र",
    rashi: "Taurus",
    rashiHi: "वृष",
    quality: "Moksha",
  },
  {
    no: 5,
    name: "Mrigashira",
    nameHi: "मृगशिरा",
    deity: "Soma",
    deityHi: "सोम",
    planet: "Mars",
    planetHi: "मंगल",
    rashi: "Taurus/Gemini",
    rashiHi: "वृष/मिथुन",
    quality: "Dharma",
  },
  {
    no: 6,
    name: "Ardra",
    nameHi: "आर्द्रा",
    deity: "Rudra",
    deityHi: "रुद्र",
    planet: "Rahu",
    planetHi: "राहु",
    rashi: "Gemini",
    rashiHi: "मिथुन",
    quality: "Artha",
  },
  {
    no: 7,
    name: "Punarvasu",
    nameHi: "पुनर्वसु",
    deity: "Aditi",
    deityHi: "अदिति",
    planet: "Jupiter",
    planetHi: "बृहस्पति",
    rashi: "Gemini/Cancer",
    rashiHi: "मिथुन/कर्क",
    quality: "Kama",
  },
  {
    no: 8,
    name: "Pushya",
    nameHi: "पुष्य",
    deity: "Brihaspati",
    deityHi: "बृहस्पति",
    planet: "Saturn",
    planetHi: "शनि",
    rashi: "Cancer",
    rashiHi: "कर्क",
    quality: "Moksha",
  },
  {
    no: 9,
    name: "Ashlesha",
    nameHi: "आश्लेषा",
    deity: "Sarpa",
    deityHi: "सर्प",
    planet: "Mercury",
    planetHi: "बुध",
    rashi: "Cancer",
    rashiHi: "कर्क",
    quality: "Dharma",
  },
  {
    no: 10,
    name: "Magha",
    nameHi: "मघा",
    deity: "Pitru",
    deityHi: "पितृ",
    planet: "Ketu",
    planetHi: "केतु",
    rashi: "Leo",
    rashiHi: "सिंह",
    quality: "Artha",
  },
  {
    no: 11,
    name: "Purva Phalguni",
    nameHi: "पूर्वाफाल्गुनी",
    deity: "Bhaga",
    deityHi: "भग",
    planet: "Venus",
    planetHi: "शुक्र",
    rashi: "Leo",
    rashiHi: "सिंह",
    quality: "Kama",
  },
  {
    no: 12,
    name: "Uttara Phalguni",
    nameHi: "उत्तराफाल्गुनी",
    deity: "Aryaman",
    deityHi: "अर्यमान",
    planet: "Sun",
    planetHi: "सूर्य",
    rashi: "Leo/Virgo",
    rashiHi: "सिंह/कन्या",
    quality: "Moksha",
  },
  {
    no: 13,
    name: "Hasta",
    nameHi: "हस्त",
    deity: "Savitar",
    deityHi: "सवितर",
    planet: "Moon",
    planetHi: "चंद्र",
    rashi: "Virgo",
    rashiHi: "कन्या",
    quality: "Dharma",
  },
  {
    no: 14,
    name: "Chitra",
    nameHi: "चित्रा",
    deity: "Vishwakarma",
    deityHi: "विश्वकर्मा",
    planet: "Mars",
    planetHi: "मंगल",
    rashi: "Virgo/Libra",
    rashiHi: "कन्या/तुला",
    quality: "Artha",
  },
  {
    no: 15,
    name: "Swati",
    nameHi: "स्वाती",
    deity: "Vayu",
    deityHi: "वायु",
    planet: "Rahu",
    planetHi: "राहु",
    rashi: "Libra",
    rashiHi: "तुला",
    quality: "Kama",
  },
  {
    no: 16,
    name: "Vishakha",
    nameHi: "विशाखा",
    deity: "Indra-Agni",
    deityHi: "इंद्राग्नि",
    planet: "Jupiter",
    planetHi: "बृहस्पति",
    rashi: "Libra/Scorpio",
    rashiHi: "तुला/वृश्चिक",
    quality: "Dharma",
  },
  {
    no: 17,
    name: "Anuradha",
    nameHi: "अनुराधा",
    deity: "Mitra",
    deityHi: "मित्र",
    planet: "Saturn",
    planetHi: "शनि",
    rashi: "Scorpio",
    rashiHi: "वृश्चिक",
    quality: "Artha",
  },
  {
    no: 18,
    name: "Jyeshtha",
    nameHi: "ज्येष्ठा",
    deity: "Indra",
    deityHi: "इंद्र",
    planet: "Mercury",
    planetHi: "बुध",
    rashi: "Scorpio",
    rashiHi: "वृश्चिक",
    quality: "Kama",
  },
  {
    no: 19,
    name: "Moola",
    nameHi: "मूल",
    deity: "Nirriti",
    deityHi: "निरृति",
    planet: "Ketu",
    planetHi: "केतु",
    rashi: "Sagittarius",
    rashiHi: "धनु",
    quality: "Moksha",
  },
  {
    no: 20,
    name: "Purva Ashadha",
    nameHi: "पूर्वाषाढ़",
    deity: "Apas",
    deityHi: "अप",
    planet: "Venus",
    planetHi: "शुक्र",
    rashi: "Sagittarius",
    rashiHi: "धनु",
    quality: "Dharma",
  },
  {
    no: 21,
    name: "Uttara Ashadha",
    nameHi: "उत्तराषाढ़",
    deity: "Vishwedeva",
    deityHi: "विश्वेदेव",
    planet: "Sun",
    planetHi: "सूर्य",
    rashi: "Sagittarius/Capricorn",
    rashiHi: "धनु/मकर",
    quality: "Artha",
  },
  {
    no: 22,
    name: "Shravana",
    nameHi: "श्रवण",
    deity: "Vishnu",
    deityHi: "विष्णु",
    planet: "Moon",
    planetHi: "चंद्र",
    rashi: "Capricorn",
    rashiHi: "मकर",
    quality: "Kama",
  },
  {
    no: 23,
    name: "Dhanishtha",
    nameHi: "धनिष्ठा",
    deity: "Ashta Vasus",
    deityHi: "अष्ट वसु",
    planet: "Mars",
    planetHi: "मंगल",
    rashi: "Capricorn/Aquarius",
    rashiHi: "मकर/कुंभ",
    quality: "Moksha",
  },
  {
    no: 24,
    name: "Shatabhisha",
    nameHi: "शतभिषा",
    deity: "Varuna",
    deityHi: "वरुण",
    planet: "Rahu",
    planetHi: "राहु",
    rashi: "Aquarius",
    rashiHi: "कुंभ",
    quality: "Dharma",
  },
  {
    no: 25,
    name: "Purva Bhadrapada",
    nameHi: "पूर्व भाद्रपद",
    deity: "Aja Ekapada",
    deityHi: "अजैकपाद",
    planet: "Jupiter",
    planetHi: "बृहस्पति",
    rashi: "Aquarius/Pisces",
    rashiHi: "कुंभ/मीन",
    quality: "Artha",
  },
  {
    no: 26,
    name: "Uttara Bhadrapada",
    nameHi: "उत्तर भाद्रपद",
    deity: "Ahirbudhnya",
    deityHi: "अहिर्बुध्न्य",
    planet: "Saturn",
    planetHi: "शनि",
    rashi: "Pisces",
    rashiHi: "मीन",
    quality: "Kama",
  },
  {
    no: 27,
    name: "Revati",
    nameHi: "रेवती",
    deity: "Pusha",
    deityHi: "पूषा",
    planet: "Mercury",
    planetHi: "बुध",
    rashi: "Pisces",
    rashiHi: "मीन",
    quality: "Moksha",
  },
];

export default function NakshatraPage() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [search, setSearch] = useState("");

  const filtered = NAKSHATRAS.filter(
    (n) =>
      n.name.toLowerCase().includes(search.toLowerCase()) ||
      n.nameHi.includes(search) ||
      n.rashi.toLowerCase().includes(search.toLowerCase()),
  );

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
          <div className="text-5xl mb-4">🌟</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "27 नक्षत्र" : "27 Nakshatras"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "वैदिक ज्योतिष के सभी नक्षत्र — देवता, ग्रह, राशि और गुण"
              : "All nakshatras of Vedic astrology — deity, planet, rashi, and quality"}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder={isHindi ? "नक्षत्र खोजें..." : "Search nakshatra..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-sm border outline-none"
            style={{
              background: "oklch(0.17 0.06 22)",
              borderColor: "oklch(0.30 0.08 28)",
              color: "oklch(0.88 0.06 65)",
            }}
            data-ocid="nakshatra.search_input"
          />
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "oklch(0.28 0.08 30)" }}
          data-ocid="nakshatra.table"
        >
          <div
            className="grid grid-cols-7 gap-0 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b"
            style={{
              background: "oklch(0.20 0.08 22)",
              borderColor: "oklch(0.28 0.08 28)",
              color: "oklch(0.68 0.14 75)",
            }}
          >
            <span>#</span>
            <span className="col-span-2">
              {isHindi ? "नक्षत्र" : "Nakshatra"}
            </span>
            <span>{isHindi ? "देवता" : "Deity"}</span>
            <span>{isHindi ? "ग्रह" : "Planet"}</span>
            <span>{isHindi ? "राशि" : "Rashi"}</span>
            <span>{isHindi ? "पुरुषार्थ" : "Purushartha"}</span>
          </div>
          {filtered.map((n, i) => (
            <div
              key={n.no}
              className="grid grid-cols-7 gap-0 px-4 py-3 text-xs border-b"
              style={{
                background:
                  i % 2 === 0 ? "oklch(0.16 0.05 22)" : "oklch(0.17 0.06 22)",
                borderColor: "oklch(0.22 0.05 22)",
              }}
              data-ocid={`nakshatra.row.${i + 1}`}
            >
              <span style={{ color: "oklch(0.55 0.04 50)" }}>{n.no}</span>
              <span
                className="col-span-2 font-semibold"
                style={{ color: "oklch(0.82 0.08 65)" }}
              >
                {isHindi ? n.nameHi : n.name}
              </span>
              <span style={{ color: "oklch(0.68 0.04 58)" }}>
                {isHindi ? n.deityHi : n.deity}
              </span>
              <span style={{ color: "oklch(0.78 0.14 75)" }}>
                {isHindi ? n.planetHi : n.planet}
              </span>
              <span style={{ color: "oklch(0.68 0.04 58)" }}>
                {isHindi ? n.rashiHi : n.rashi}
              </span>
              <span style={{ color: "oklch(0.60 0.04 50)" }}>{n.quality}</span>
            </div>
          ))}
        </div>
        <p
          className="text-xs mt-3 text-center"
          style={{ color: "oklch(0.42 0.04 50)" }}
        >
          {isHindi
            ? `${filtered.length} नक्षत्र दिखाए जा रहे हैं`
            : `Showing ${filtered.length} of 27 nakshatras`}
        </p>
      </div>
    </div>
  );
}
