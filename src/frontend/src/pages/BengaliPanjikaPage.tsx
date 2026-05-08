import { useLanguage } from "../contexts/LanguageContext";

export default function BengaliPanjikaPage() {
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
          <div className="text-5xl mb-4">🏵️</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "बंगाली पंजिका" : "Bengali Panjika"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "बंगाली कैलेंडर — शकाब्द संवत"
              : "Bengali calendar — Shaka and Bangla era"}
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
              ? "बंगाली पंजिका सौर और चंद्र दोनों कैलेंडर पर आधारित है। बंगाली नव वर्ष (पोइला बोइशाख) 15 अप्रैल को मनाया जाता है।"
              : "The Bengali Panjika combines both solar and lunar calendars. Bengali New Year (Pohela Boishakh) is celebrated on April 15 (in India). Major festivals include Durga Puja, Kali Puja, and Saraswati Puja."}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.17 0.06 22)",
              borderColor: "oklch(0.28 0.08 28)",
            }}
          >
            <h3
              className="font-heading font-bold text-base mb-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              📅 {isHindi ? "बंगाली माह" : "Bengali Months"}
            </h3>
            <div className="space-y-2">
              {[
                ["Boishakh", "Apr-May"],
                ["Jyoishtho", "May-Jun"],
                ["Asharh", "Jun-Jul"],
                ["Shrabon", "Jul-Aug"],
                ["Bhadro", "Aug-Sep"],
                ["Ashshin", "Sep-Oct"],
                ["Kartik", "Oct-Nov"],
                ["Ogrohayon", "Nov-Dec"],
                ["Poush", "Dec-Jan"],
                ["Magh", "Jan-Feb"],
                ["Falgun", "Feb-Mar"],
                ["Chaitra", "Mar-Apr"],
              ].map(([month, period]) => (
                <div key={month} className="flex justify-between text-sm">
                  <span
                    className="font-semibold"
                    style={{ color: "oklch(0.82 0.06 65)" }}
                  >
                    {month}
                  </span>
                  <span style={{ color: "oklch(0.60 0.04 55)" }}>{period}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="rounded-2xl p-6 border"
            style={{
              background: "oklch(0.17 0.06 22)",
              borderColor: "oklch(0.28 0.08 28)",
            }}
          >
            <h3
              className="font-heading font-bold text-base mb-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🏧 {isHindi ? "मुख्य शहर" : "Major Cities"}
            </h3>
            <div className="space-y-2">
              {[
                "Kolkata",
                "Siliguri",
                "Howrah",
                "Durgapur",
                "Asansol",
                "Malda",
                "Agartala",
                "Dhaka (BD)",
              ].map((city) => (
                <div
                  key={city}
                  className="text-sm"
                  style={{ color: "oklch(0.68 0.04 55)" }}
                >
                  • {city}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="rounded-2xl p-5 border"
          style={{
            background: "oklch(0.17 0.06 22)",
            borderColor: "oklch(0.28 0.08 28)",
          }}
        >
          <h3
            className="font-heading font-bold text-base mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🌟 {isHindi ? "प्रमुख त्योहार" : "Key Bengali Festivals"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              ["Durga Puja", "Oct (Ashwin/Kartik)"],
              ["Kali Puja", "Kartik Amavasya"],
              ["Saraswati Puja", "Vasant Panchami"],
              ["Pohela Boishakh", "Bengali New Year (Apr 15)"],
            ].map(([name, desc]) => (
              <div
                key={name}
                className="p-3 rounded-xl border"
                style={{
                  background: "oklch(0.16 0.05 22)",
                  borderColor: "oklch(0.26 0.07 26)",
                }}
              >
                <p
                  className="font-semibold text-sm"
                  style={{ color: "oklch(0.80 0.08 65)" }}
                >
                  {name}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.58 0.04 50)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
