import { useLanguage } from "../contexts/LanguageContext";

const SUNRISE_DATA: Record<string, number[]> = {
  "New Delhi": [
    7.17, 7.02, 6.28, 5.47, 5.16, 5.18, 5.35, 5.53, 6.1, 6.24, 6.42, 7.02,
  ],
  Mumbai: [
    7.13, 6.58, 6.28, 6.01, 5.48, 5.58, 6.13, 6.21, 6.16, 6.12, 6.17, 6.54,
  ],
  Chennai: [
    6.27, 6.19, 6.07, 5.58, 5.56, 5.57, 6.0, 6.02, 5.55, 5.47, 5.48, 6.11,
  ],
  Kolkata: [
    6.17, 5.59, 5.31, 5.03, 4.48, 4.52, 5.07, 5.24, 5.33, 5.4, 6.0, 6.19,
  ],
  Bengaluru: [
    6.53, 6.39, 6.14, 5.51, 5.44, 5.53, 6.06, 6.12, 6.03, 5.57, 6.01, 6.32,
  ],
  Hyderabad: [
    6.45, 6.3, 6.05, 5.43, 5.36, 5.44, 5.59, 6.06, 5.58, 5.5, 5.54, 6.26,
  ],
  Jaipur: [
    7.19, 7.04, 6.3, 5.5, 5.19, 5.21, 5.37, 5.55, 6.11, 6.25, 6.44, 7.04,
  ],
  Ahmedabad: [
    7.22, 7.06, 6.3, 5.5, 5.2, 5.26, 5.42, 5.56, 6.09, 6.2, 6.4, 7.05,
  ],
};
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function fmtTime(dec: number) {
  const h = Math.floor(dec);
  const m = Math.round((dec - h) * 100);
  return `${h}:${m.toString().padStart(2, "0")}`;
}

export default function HinduSunrisePage() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const cities = Object.keys(SUNRISE_DATA);
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
          <div className="text-5xl mb-4">🌅</div>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.90 0.05 65)" }}
          >
            {isHindi ? "सूर्योदय समय" : "Sunrise Times India"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.65 0.05 58)" }}>
            {isHindi
              ? "प्रमुख शहरों के सूर्योदय समय 2026"
              : "Monthly sunrise times for major Indian cities 2026"}
          </p>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8 max-w-5xl overflow-x-auto">
        <table className="w-full text-xs" data-ocid="sunrise.table">
          <thead>
            <tr
              style={{
                background: "oklch(0.20 0.08 22)",
                color: "oklch(0.68 0.14 75)",
              }}
            >
              <th
                className="px-3 py-3 text-left font-bold uppercase tracking-wider border-b"
                style={{ borderColor: "oklch(0.28 0.08 28)" }}
              >
                {isHindi ? "शहर" : "City"}
              </th>
              {MONTHS.map((m) => (
                <th
                  key={m}
                  className="px-2 py-3 font-bold border-b"
                  style={{ borderColor: "oklch(0.28 0.08 28)" }}
                >
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cities.map((city, ci) => (
              <tr
                key={city}
                style={{
                  background:
                    ci % 2 === 0
                      ? "oklch(0.16 0.05 22)"
                      : "oklch(0.17 0.06 22)",
                }}
                data-ocid={`sunrise.city.item.${ci + 1}`}
              >
                <td
                  className="px-3 py-3 font-semibold"
                  style={{ color: "oklch(0.82 0.06 65)" }}
                >
                  {city}
                </td>
                {SUNRISE_DATA[city].map((t) => (
                  <td
                    key={`${city}-${t}`}
                    className="px-2 py-3 text-center"
                    style={{ color: "oklch(0.68 0.04 55)" }}
                  >
                    {fmtTime(t)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs mt-3" style={{ color: "oklch(0.42 0.04 50)" }}>
          * {isHindi ? "समय अनुमानित IST हैं।" : "Times are approximate (IST)."}
        </p>
      </div>
    </div>
  );
}
