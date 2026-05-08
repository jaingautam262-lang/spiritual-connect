import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { LIFE_REPORT_CONFIGS } from "../types/lifeReports";

type ReportPath =
  | "/life-reports/daily-horoscope"
  | "/life-reports/love-compatibility"
  | "/life-reports/career"
  | "/life-reports/financial"
  | "/life-reports/marriage"
  | "/life-reports/health"
  | "/life-reports/childbirth"
  | "/life-reports/job-vs-business"
  | "/life-reports/personality"
  | "/life-reports/transit-impact";

const REPORT_PATHS: Record<string, ReportPath> = {
  "daily-horoscope": "/life-reports/daily-horoscope",
  "love-compatibility": "/life-reports/love-compatibility",
  career: "/life-reports/career",
  financial: "/life-reports/financial",
  marriage: "/life-reports/marriage",
  health: "/life-reports/health",
  childbirth: "/life-reports/childbirth",
  "job-vs-business": "/life-reports/job-vs-business",
  personality: "/life-reports/personality",
  "transit-impact": "/life-reports/transit-impact",
};

export default function LifeReportsIndex() {
  const categories = [
    {
      label: "ग्रह और नक्षत्र",
      ids: ["daily-horoscope", "transit-impact", "personality"],
    },
    {
      label: "प्रेम और विवाह",
      ids: ["love-compatibility", "marriage", "childbirth"],
    },
    {
      label: "करियर और धन",
      ids: ["career", "financial", "job-vs-business"],
    },
    {
      label: "स्वास्थ्य",
      ids: ["health"],
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Header Banner */}
      <div
        className="py-16 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 22), oklch(0.30 0.10 30))",
        }}
      >
        {/* decorative stars */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {[
            "top-8 left-10",
            "top-12 right-16",
            "bottom-10 left-1/4",
            "bottom-8 right-1/3",
          ].map((pos) => (
            <Star
              key={pos}
              className={`absolute h-3 w-3 opacity-30 ${pos}`}
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
          ))}
        </div>
        <div className="max-w-3xl mx-auto relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star
              className="h-5 w-5"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <span
              className="font-body text-sm tracking-widest uppercase"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              वैदिक ज्योतिष
            </span>
            <Star
              className="h-5 w-5"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
          </div>
          <h1
            className="font-heading text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "oklch(0.96 0.01 80)" }}
          >
            जीवन रिपोर्ट्स
          </h1>
          <p
            className="font-body text-lg mb-6"
            style={{ color: "oklch(0.72 0.08 65)" }}
          >
            अपनी कुंडली के अनुसार जीवन के हर पहलू की विस्तृत ज्योतिषीय जानकारी
          </p>
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-heading font-bold text-sm"
            style={{
              background: "oklch(0.78 0.14 75)",
              color: "oklch(0.12 0.04 28)",
            }}
          >
            <Sparkles className="h-4 w-4" />
            ₹99 से शुरू · 24–48 घंटे में डिलीवरी
          </div>
        </div>
      </div>

      {/* Category sections */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {categories.map((cat) => {
          const reports = LIFE_REPORT_CONFIGS.filter((r) =>
            cat.ids.includes(r.id),
          );
          if (!reports.length) return null;
          return (
            <section
              key={cat.label}
              data-ocid={`life-reports.category.${cat.label}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <h2
                  className="font-heading text-xl font-bold"
                  style={{ color: "oklch(0.22 0.08 22)" }}
                >
                  {cat.label}
                </h2>
                <div
                  className="flex-1 h-px"
                  style={{ background: "oklch(0.85 0.04 70)" }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {reports.map((report) => (
                  <Link
                    key={report.id}
                    to={REPORT_PATHS[report.id]}
                    data-ocid={`life-reports.${report.id}.card`}
                    className="group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{
                      background: "oklch(0.99 0.008 80)",
                      borderColor: "oklch(0.87 0.03 72)",
                    }}
                  >
                    {/* Card top band */}
                    <div
                      className="h-2"
                      style={{
                        background:
                          "linear-gradient(90deg, oklch(0.78 0.14 75), oklch(0.65 0.22 48))",
                      }}
                    />
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <span
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                          style={{ background: "oklch(0.94 0.03 78)" }}
                          role="img"
                          aria-label={report.title}
                        >
                          {report.icon}
                        </span>
                        <span
                          className="px-3 py-1 rounded-full font-heading font-bold text-sm"
                          style={{
                            background: "oklch(0.94 0.04 75)",
                            color: "oklch(0.50 0.15 42)",
                          }}
                        >
                          ₹{report.price}
                        </span>
                      </div>
                      <h3
                        className="font-heading text-lg font-bold mb-1"
                        style={{ color: "oklch(0.22 0.08 22)" }}
                      >
                        {report.titleHindi}
                      </h3>
                      <p
                        className="font-body text-xs mb-3"
                        style={{ color: "oklch(0.58 0.08 48)" }}
                      >
                        {report.title}
                      </p>
                      <p
                        className="font-body text-sm mb-4 leading-relaxed flex-1"
                        style={{ color: "oklch(0.38 0.04 35)" }}
                      >
                        {report.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {report.includedSections.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2 py-0.5 rounded-full font-body"
                            style={{
                              background: "oklch(0.93 0.02 75)",
                              color: "oklch(0.45 0.06 38)",
                            }}
                          >
                            {s}
                          </span>
                        ))}
                        {report.includedSections.length > 3 && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-body"
                            style={{ color: "oklch(0.55 0.06 40)" }}
                          >
                            +{report.includedSections.length - 3} और
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-1 text-sm font-heading font-semibold group-hover:gap-2 transition-all mt-auto"
                        style={{ color: "oklch(0.60 0.18 48)" }}
                      >
                        देखें <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Trust bar */}
      <div className="py-10 px-4" style={{ background: "oklch(0.22 0.07 28)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🏅", label: "10,000+ रिपोर्ट्स", sub: "वितरित" },
            { icon: "⚡", label: "24–48 घंटे", sub: "डिलीवरी" },
            { icon: "🔒", label: "100% गोपनीय", sub: "और सुरक्षित" },
            { icon: "⭐", label: "4.9/5 रेटिंग", sub: "ग्राहक संतुष्टि" },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-2xl mb-1">{item.icon}</div>
              <p
                className="font-heading font-bold text-sm"
                style={{ color: "oklch(0.88 0.06 72)" }}
              >
                {item.label}
              </p>
              <p
                className="font-body text-xs"
                style={{ color: "oklch(0.62 0.05 55)" }}
              >
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
