import { Link } from "@tanstack/react-router";
import { useLanguage } from "../contexts/LanguageContext";

interface SamskaraPageProps {
  emoji: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  descEn: string;
  descHi: string;
  timing: { en: string; hi: string };
  nakshatra: { en: string; hi: string };
  tithi: { en: string; hi: string };
  lagna: { en: string; hi: string };
  avoid: { en: string; hi: string };
  ritual: { steps: string[]; stepsHi: string[] };
  mantra: {
    text: string;
    translit: string;
    meaningEn: string;
    meaningHi: string;
    titleEn: string;
    titleHi: string;
  };
  significanceEn: string;
  significanceHi: string;
  order: number;
}

export default function SamskaraPage({
  emoji,
  titleEn,
  titleHi,
  subtitleEn,
  subtitleHi,
  descEn,
  descHi,
  timing,
  nakshatra,
  tithi,
  lagna,
  avoid,
  ritual,
  mantra,
  significanceEn,
  significanceHi,
  order,
}: SamskaraPageProps) {
  const { language } = useLanguage();
  const hi = language === "hi";

  const items = [
    {
      icon: "⏰",
      labelEn: "Timing",
      labelHi: "समय",
      value: hi ? timing.hi : timing.en,
    },
    {
      icon: "🌙",
      labelEn: "Best Nakshatra",
      labelHi: "शुभ नक्षत्र",
      value: hi ? nakshatra.hi : nakshatra.en,
    },
    {
      icon: "📅",
      labelEn: "Best Tithi",
      labelHi: "शुभ तिथि",
      value: hi ? tithi.hi : tithi.en,
    },
    {
      icon: "🪐",
      labelEn: "Best Lagna",
      labelHi: "शुभ लग्न",
      value: hi ? lagna.hi : lagna.en,
    },
    {
      icon: "🚫",
      labelEn: "Avoid",
      labelHi: "वर्जित",
      value: hi ? avoid.hi : avoid.en,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.04 22)" }}>
      <div
        className="py-12 px-4 text-center border-b"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 22) 0%, oklch(0.22 0.08 35) 100%)",
          borderColor: "oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "oklch(0.68 0.12 65)" }}
        >
          {hi ? `${order}वाँ संस्कार` : `Samskara ${order} of 16`}
        </div>
        <div className="text-5xl mb-4">{emoji}</div>
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          {hi ? titleHi : titleEn}
        </h1>
        <p className="text-lg" style={{ color: "oklch(0.70 0.08 65)" }}>
          {hi ? subtitleHi : subtitleEn}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Description */}
        <div
          className="rounded-xl p-6 border"
          style={{
            background: "oklch(0.18 0.07 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <p
            className="text-base leading-relaxed"
            style={{ color: "oklch(0.82 0.05 65)" }}
          >
            {hi ? descHi : descEn}
          </p>
        </div>

        {/* Significance */}
        <div
          className="rounded-xl p-6 border"
          style={{
            background: "oklch(0.18 0.07 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h2
            className="text-xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ✨ {hi ? "महत्व" : "Significance"}
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: "oklch(0.82 0.05 65)" }}
          >
            {hi ? significanceHi : significanceEn}
          </p>
        </div>

        {/* Auspicious Conditions */}
        <div
          className="rounded-xl p-6 border"
          style={{
            background: "oklch(0.18 0.07 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🌟 {hi ? "शुभ परिस्थितियाँ" : "Auspicious Conditions"}
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.labelEn}
                className="flex gap-3 p-3 rounded-lg"
                style={{ background: "oklch(0.22 0.06 28 / 0.5)" }}
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p
                    className="font-semibold text-sm mb-0.5"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {hi ? item.labelHi : item.labelEn}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.78 0.06 60)" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ritual Steps */}
        <div
          className="rounded-xl p-6 border"
          style={{
            background: "oklch(0.18 0.07 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🪔 {hi ? "विधि" : "Ritual Procedure"}
          </h2>
          <ol className="space-y-2">
            {(hi ? ritual.stepsHi : ritual.steps).map((step) => (
              <li key={step.slice(0, 40)} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "oklch(0.68 0.20 48)", color: "white" }}
                >
                  {(hi ? ritual.stepsHi : ritual.steps).indexOf(step) + 1}
                </span>
                <p
                  className="text-sm pt-0.5"
                  style={{ color: "oklch(0.82 0.05 65)" }}
                >
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mantra */}
        <div
          className="rounded-xl p-6 border"
          style={{
            background: "oklch(0.20 0.08 35 / 0.4)",
            borderColor: "oklch(0.78 0.14 75 / 0.3)",
          }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🕉️ {hi ? mantra.titleHi : mantra.titleEn}
          </h2>
          <p
            className="text-lg font-serif leading-relaxed mb-3"
            style={{ color: "oklch(0.88 0.10 75)" }}
          >
            {mantra.text}
          </p>
          <p
            className="text-sm italic mb-2"
            style={{ color: "oklch(0.70 0.08 65)" }}
          >
            {mantra.translit}
          </p>
          <p className="text-sm" style={{ color: "oklch(0.65 0.06 55)" }}>
            {hi ? mantra.meaningHi : mantra.meaningEn}
          </p>
        </div>

        {/* All 16 Samskaras nav */}
        <div
          className="rounded-xl p-6 border"
          style={{
            background: "oklch(0.18 0.07 22)",
            borderColor: "oklch(0.78 0.14 75 / 0.15)",
          }}
        >
          <h2
            className="text-lg font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi ? "सोलह संस्कार" : "All 16 Samskaras"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { to: "/garbhadhana", en: "Garbhadhana", hi: "गर्भाधान", n: 1 },
              { to: "/punsavana", en: "Punsavana", hi: "पुंसवन", n: 2 },
              { to: "/seemanta", en: "Seemanta", hi: "सीमन्त", n: 3 },
              { to: "/jaat-karma", en: "Jaat Karma", hi: "जातकर्म", n: 4 },
              { to: "/namakarana", en: "Namakarana", hi: "नामकरण", n: 5 },
              { to: "/nishkramana", en: "Nishkramana", hi: "निष्क्रमण", n: 6 },
              { to: "/annaprashana", en: "Annaprashana", hi: "अन्नप्राशन", n: 7 },
              { to: "/karnavedha", en: "Karnavedha", hi: "कर्णवेध", n: 8 },
              { to: "/mundana", en: "Mundana", hi: "मुण्डन", n: 9 },
              { to: "/vidyarambha", en: "Vidyarambha", hi: "विद्यारम्भ", n: 10 },
              {
                to: "/akshararambha",
                en: "Akshararambha",
                hi: "अक्षरारम्भ",
                n: 11,
              },
              { to: "/janeu-upanayana", en: "Upanayana", hi: "उपनयन", n: 12 },
              { to: "/vivaha-lagna", en: "Vivaha", hi: "विवाह", n: 13 },
              {
                to: "/shashthi-puja",
                en: "Shashthi Puja",
                hi: "षष्ठी पूजा",
                n: 14,
              },
              { to: "/stanapana", en: "Stanapana", hi: "स्तनपान", n: 15 },
              { to: "/nisheka", en: "Nisheka", hi: "निषेक", n: 16 },
            ].map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="text-xs px-2 py-1.5 rounded border text-center transition-colors hover:bg-white/10"
                style={{
                  color: "oklch(0.78 0.06 60)",
                  borderColor: "oklch(0.78 0.14 75 / 0.2)",
                }}
              >
                {s.n}. {hi ? s.hi : s.en}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
