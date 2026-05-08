import { useLanguage } from "../contexts/LanguageContext";

export default function TamilPanchangamPage() {
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
          <div className="text-5xl mb-4">🌞</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "तमिल पंचांगम" : "Tamil Panchangam"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "तमिल कैलेंडर — विक्रम संवत और तमिल तीथि"
              : "Tamil calendar system — months, nakshatras, cities"}
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
              ? "तमिल पंचांगम तमिल नाडु और दक्षिण भारत में प्रयुक्त होने वाली दैनिक पंचांग प्रणाली है। यह सौर कैलेंडर पर आधारित है।"
              : "Tamil Panchangam is the daily almanac used in Tamil Nadu and South India. It follows a solar calendar system (Surya Siddhanta) and uses unique Tamil month names corresponding to the zodiac signs."}
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
              📅 {isHindi ? "तमिल माह" : "Tamil Months"}
            </h3>
            <div className="space-y-2">
              {[
                ["Chithirai", "Apr-May"],
                ["Vaikasi", "May-Jun"],
                ["Aani", "Jun-Jul"],
                ["Aadi", "Jul-Aug"],
                ["Aavani", "Aug-Sep"],
                ["Purattasi", "Sep-Oct"],
                ["Aippasi", "Oct-Nov"],
                ["Karthigai", "Nov-Dec"],
                ["Margazhi", "Dec-Jan"],
                ["Thai", "Jan-Feb"],
                ["Maasi", "Feb-Mar"],
                ["Panguni", "Mar-Apr"],
              ].map(([month, period]) => (
                <div
                  key={month}
                  className="flex justify-between text-sm"
                  style={{ color: "oklch(0.68 0.04 55)" }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: "oklch(0.82 0.06 65)" }}
                  >
                    {month}
                  </span>
                  <span>{period}</span>
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
              🏧 {isHindi ? "तमिल नाडु के मुख्य शहर" : "Tamil Nadu Major Cities"}
            </h3>
            <div className="space-y-2">
              {[
                "Chennai",
                "Coimbatore",
                "Madurai",
                "Trichy",
                "Salem",
                "Erode",
                "Tirunelveli",
                "Vellore",
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
            📖{" "}
            {isHindi ? "तमिल पंचांगम के 5 अंग" : "5 Elements of Tamil Panchangam"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              ["Tithi", "तिथि"],
              ["Vara", "वार"],
              ["Nakshatra", "नक्षत्र"],
              ["Yoga", "योग"],
              ["Karana", "करण"],
            ].map(([en, hi]) => (
              <div
                key={en}
                className="text-center p-3 rounded-xl border"
                style={{
                  background: "oklch(0.16 0.05 22)",
                  borderColor: "oklch(0.26 0.07 26)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                <p className="font-bold text-sm">{en}</p>
                <p className="text-xs" style={{ color: "oklch(0.60 0.04 55)" }}>
                  {hi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
