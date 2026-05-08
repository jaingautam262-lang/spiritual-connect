import { useLanguage } from "../contexts/LanguageContext";

const EQUINOXES_SOLSTICES = [
  {
    id: "vernal",
    name: "Vernal Equinox",
    nameHi: "वसंत विषुव",
    date: "March 20, 2026",
    dateHi: "20 मार्च 2026",
    icon: "🌸",
    time: "~05:46 UTC",
    significance:
      "Day and night are equal. Sun crosses the celestial equator northward. Marks the start of astronomical spring in the Northern Hemisphere.",
    sigHi:
      "दिन और रात बराबर। स्वर्गीय विषुवत पर सूर्य उत्तर की ओर गुजरता है। वसंत का आरंभ।",
    hinduSig:
      "Vasant Navratri begins. Chaitra Shukla Pratipada — Hindu New Year (Vikram Samvat).",
    hinduSigHi: "वसंत नवरात्रि शुरू। चैत्र शुक्ल प्रतिपदा — हिंदू नव वर्ष।",
  },
  {
    id: "summer",
    name: "Summer Solstice",
    nameHi: "ग्रीष्म अयनांत",
    date: "June 21, 2026",
    dateHi: "21 जून 2026",
    icon: "☀️",
    time: "~02:24 UTC",
    significance:
      "Longest day of the year. Sun reaches its northernmost point (Tropic of Cancer). Start of astronomical summer.",
    sigHi: "वर्ष का सबसे लंबा दिन। सूर्य उत्तरतम बिंदु पर।",
    hinduSig:
      "Dakshinayana begins. Sun enters Karka (Cancer) rashi. Chaturmas begins soon after.",
    hinduSigHi: "दक्षिणायन शुरू। सूर्य कर्क राशि में प्रवेश। चातुर्मास शीघ्र शुरू।",
  },
  {
    id: "autumnal",
    name: "Autumnal Equinox",
    nameHi: "शरद विषुव",
    date: "September 22, 2026",
    dateHi: "22 सितंबर 2026",
    icon: "🍁",
    time: "~15:05 UTC",
    significance:
      "Day and night equal again. Sun moves southward. Start of astronomical autumn.",
    sigHi: "पुनः दिन-रात बराबर। सूर्य दक्षिण की ओर।",
    hinduSig:
      "Sharad Navratri begins around this time. Pitru Paksha ends with Sarvapitri Amavasya.",
    hinduSigHi: "शारद नवरात्रि इसी समय शुरू। पितृ पक्ष सर्वपित्री अमावस्या से समाप्त।",
  },
  {
    id: "winter",
    name: "Winter Solstice",
    nameHi: "शीतकालीन अयनांत",
    date: "December 21, 2026",
    dateHi: "21 दिसंबर 2026",
    icon: "❄️",
    time: "~20:50 UTC",
    significance:
      "Shortest day. Sun at southernmost point. Start of astronomical winter.",
    sigHi: "सबसे छोटा दिन। सूर्य दक्षिणतम बिंदु पर।",
    hinduSig:
      "Uttarayana countdown begins. Makar Sankranti (Jan 14, 2027) follows. Paush month sadhana.",
    hinduSigHi: "उत्तरायण की उलटी गिनती। मकर संक्रांति (14 जनवरी 2027) आने वाली।",
  },
];

function EquinoxSolsticePage({ pageId }: { pageId: string }) {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const data = EQUINOXES_SOLSTICES.find((e) => e.id === pageId)!;
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
          <div className="text-5xl mb-4">{data.icon}</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? data.nameHi : data.name}
          </h1>
          <p
            className="font-heading font-bold text-xl"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {isHindi ? data.dateHi : data.date}
          </p>
          <p className="text-sm mt-1" style={{ color: "oklch(0.55 0.04 50)" }}>
            ⏰ {data.time}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-3xl space-y-6">
        {[
          {
            icon: "🌍",
            title: isHindi ? "वैज्ञानिक महत्व" : "Astronomical Significance",
            text: isHindi ? data.sigHi : data.significance,
          },
          {
            icon: "📗",
            title: isHindi ? "हिंदू धार्मिक महत्व" : "Hindu Religious Significance",
            text: isHindi ? data.hinduSigHi : data.hinduSig,
          },
        ].map((s) => (
          <div
            key={s.title}
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
              <span>{s.icon}</span>
              {s.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.68 0.04 55)" }}
            >
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function VernalEquinoxPage() {
  return <EquinoxSolsticePage pageId="vernal" />;
}
export function SummerSolsticePage() {
  return <EquinoxSolsticePage pageId="summer" />;
}
export function AutumnalEquinoxPage() {
  return <EquinoxSolsticePage pageId="autumnal" />;
}
export function WinterSolsticePage() {
  return <EquinoxSolsticePage pageId="winter" />;
}
export default VernalEquinoxPage;
