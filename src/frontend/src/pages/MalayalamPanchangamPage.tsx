import { useLanguage } from "../contexts/LanguageContext";

export default function MalayalamPanchangamPage() {
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
          <div className="text-5xl mb-4">🌴</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "मलयालम पंचांगम" : "Malayalam Panchangam"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "केरल कैलेंडर — कोलावर्षम संवत"
              : "Kerala calendar — Kollavarsham era"}
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
              ? "केरल का पंचांगम कोलावर्षम संवत का उपयोग करता है, जो 825 ई. से शुरू हुआ था। केरल में विषु (ओणम) नव वर्ष के रूप में मनाया जाता है।"
              : "Kerala's Panchangam uses the Kollavarsham era (starting 825 CE). The Malayalam calendar is primarily solar. Vishu (Onam) is celebrated as the New Year in Kerala."}
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
              📅 {isHindi ? "मलयालम माह" : "Malayalam Months"}
            </h3>
            <div className="space-y-2">
              {[
                ["Chingam", "Aug-Sep"],
                ["Kanny", "Sep-Oct"],
                ["Thulam", "Oct-Nov"],
                ["Vrishchikam", "Nov-Dec"],
                ["Dhanu", "Dec-Jan"],
                ["Makaram", "Jan-Feb"],
                ["Kumbham", "Feb-Mar"],
                ["Meenam", "Mar-Apr"],
                ["Medam", "Apr-May"],
                ["Edavam", "May-Jun"],
                ["Mithunam", "Jun-Jul"],
                ["Karkidakam", "Jul-Aug"],
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
              🏧 {isHindi ? "केरल के मुख्य शहर" : "Kerala Major Cities"}
            </h3>
            <div className="space-y-2">
              {[
                "Thiruvananthapuram",
                "Kochi",
                "Kozhikode",
                "Thrissur",
                "Kannur",
                "Palakkad",
                "Malappuram",
                "Kollam",
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
            🌟 {isHindi ? "विशेष पर्व" : "Key Festivals"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              ["Vishu", "Malayali New Year (Apr)"],
              ["Onam", "Harvest festival (Aug-Sep)"],
              ["Thrissur Pooram", "Temple festival (Apr-May)"],
              ["Navaratri", "Saraswati Puja, Ayudha Puja"],
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
