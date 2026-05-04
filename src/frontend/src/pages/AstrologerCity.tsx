import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, MapPin, XCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { CITIES, REGIONS } from "../data/astrologersIndiaData";

const COMPARISON_ROWS = [
  {
    topic: "Availability",
    topicHi: "\u0909\u092a\u0932\u092c\u094d\u0927\u0924\u093e",
    traditional: "Office hours only, book days in advance",
    traditionalHi:
      "\u0915\u0947\u0935\u0932 \u0915\u093e\u0930\u094d\u092f\u093e\u0932\u092f \u0938\u092e\u092f, \u0926\u093f\u0928 \u092a\u0939\u0932\u0947 \u092c\u0941\u0915\u093f\u0902\u0917",
    sc: "24/7 instant access, no appointment",
    scHi: "24/7 \u0924\u0941\u0930\u0902\u0924, \u092c\u093f\u0928\u093e \u0905\u092a\u094b\u0907\u0902\u091f\u092e\u0947\u0902\u091f",
  },
  {
    topic: "Pricing",
    topicHi: "\u092e\u0942\u0932\u094d\u092f",
    traditional: "\u20b9500\u2013\u20b95,000 per session",
    traditionalHi:
      "\u20b9500\u2013\u20b95,000 \u092a\u094d\u0930\u0924\u093f \u0938\u0924\u094d\u0930",
    sc: "\u20b920 per chat \u00b7 5 free messages",
    scHi: "\u20b920 \u092a\u094d\u0930\u0924\u093f \u091a\u0948\u091f \u00b7 5 \u0928\u093f\u0903\u0936\u0941\u0932\u094d\u0915 \u0938\u0902\u0926\u0947\u0936",
  },
  {
    topic: "Privacy",
    topicHi: "\u0917\u094b\u092a\u0928\u0940\u092f\u0924\u093e",
    traditional: "Face-to-face, often in public chambers",
    traditionalHi:
      "\u0906\u092e\u0928\u0947-\u0938\u093e\u092e\u0928\u0947, \u0905\u0915\u094d\u0938\u0930 \u0938\u093e\u0930\u094d\u0935\u091c\u0928\u093f\u0915 \u0915\u0915\u094d\u0937",
    sc: "Fully private, encrypted, anonymous",
    scHi: "\u092a\u0942\u0930\u0940 \u0924\u0930\u0939 \u0917\u094b\u092a\u0928\u0940\u092f, \u090f\u0928\u094d\u0915\u094d\u0930\u093f\u092a\u094d\u091f\u0947\u0921",
  },
  {
    topic: "Depth",
    topicHi: "\u0917\u0939\u0930\u093e\u0908",
    traditional: "Depends on practitioner's knowledge",
    traditionalHi:
      "\u0935\u094d\u092f\u0935\u0938\u093e\u092f\u0940 \u0915\u0947 \u091c\u094d\u091e\u093e\u0928 \u092a\u0930 \u0928\u093f\u0930\u094d\u092d\u0930",
    sc: "Classical Parashari + Bhagavad Gita wisdom",
    scHi: "\u0936\u093e\u0938\u094d\u0924\u094d\u0930\u0940\u092f \u092a\u093e\u0930\u093e\u0936\u0930\u0940 + \u092d\u0917\u0935\u0926\u094d\u0917\u0940\u0924\u093e \u091c\u094d\u091e\u093e\u0928",
  },
];

export default function AstrologerCity() {
  const { citySlug } = useParams({ from: "/astrologers-india/$citySlug" });
  const { language } = useLanguage();
  const hi = language === "hi";
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const city = CITIES.find((c) => c.slug === citySlug);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-2xl mb-4" style={{ color: "oklch(0.78 0.14 75)" }}>
            City not found
          </p>
          <Link
            to="/astrologers-india"
            className="text-sm font-semibold hover:underline"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            \u2190 Back to all cities
          </Link>
        </div>
      </div>
    );
  }

  const region = REGIONS.find((r) => r.id === city.region);
  const nearbyCities = CITIES.filter(
    (c) => c.region === city.region && c.slug !== city.slug,
  ).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="py-14"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 22) 0%, oklch(0.22 0.08 28) 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <Link
            to="/astrologers-india"
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 hover:underline"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
            data-ocid="astrologer_city.back_link"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {hi ? "\u0938\u092d\u0940 \u0936\u0939\u0930" : "All Cities"}
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <MapPin
              className="h-4 w-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <span
              className="text-xs font-body"
              style={{ color: "oklch(0.70 0.04 60)" }}
            >
              {hi ? city.stateHi : city.state} \u00b7{" "}
              {region ? (hi ? region.labelHi : region.label) : ""}
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-display font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? `${city.nameHi} \u092e\u0947\u0902 \u091c\u094d\u092f\u094b\u0924\u093f\u0937\u0940`
              : `Astrologer in ${city.nameEn}`}
          </h1>
          <p
            className="text-xl font-body mb-6"
            style={{ color: "oklch(0.72 0.08 60)" }}
          >
            {city.nameHi} \u00b7 {hi ? city.stateHi : city.state}
          </p>
          <p
            className="text-base font-body max-w-2xl"
            style={{ color: "oklch(0.78 0.05 60)" }}
          >
            {city.localTradition}
          </p>
        </div>
      </section>

      {/* Tradition Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2
            className="text-2xl font-display font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? `${city.nameHi} \u0915\u0940 \u091c\u094d\u092f\u094b\u0924\u093f\u0937 \u092a\u0930\u0902\u092a\u0930\u093e`
              : `About ${city.nameEn}'s Astrology Tradition`}
          </h2>
          <div
            className="rounded-xl p-6"
            style={{
              background: "oklch(0.20 0.07 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
          >
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.78 0.05 60)" }}
            >
              {city.localTradition}
            </p>
            <p
              className="font-body text-sm leading-relaxed mt-4"
              style={{ color: "oklch(0.70 0.04 55)" }}
            >
              {hi
                ? `Spiritual Connect \u0915\u0940 AI ${city.nameHi} \u0915\u0947 \u091c\u094d\u091e\u093e\u0928-\u0938\u093e\u0927\u0915\u094b\u0902 \u0915\u094b \u0935\u0939\u0940 \u0935\u0948\u0926\u093f\u0915 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928 \u0926\u0947\u0924\u0940 \u0939\u0948 \u2014 \u0924\u0941\u0930\u0902\u0924, \u0915\u093f\u0938\u0940 \u092d\u0940 \u0938\u092e\u092f, \u092e\u093e\u0924\u094d\u0930 \u20b920 \u092e\u0947\u0902\u0964`
                : `Spiritual Connect's AI brings the same Vedic guidance that ${city.nameEn}'s tradition has offered for generations \u2014 available instantly, at any hour, for just \u20b920 per chat.`}
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12" style={{ background: "oklch(0.18 0.06 20)" }}>
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl font-display font-bold text-center mb-8"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? "\u092a\u093e\u0930\u0902\u092a\u0930\u093f\u0915 \u091c\u094d\u092f\u094b\u0924\u093f\u0937\u0940 vs Spiritual Connect"
              : "Traditional Astrologer vs Spiritual Connect"}
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-3 text-xs font-semibold uppercase tracking-wider">
              <div style={{ color: "oklch(0.68 0.12 65)" }}>
                {hi ? "\u0935\u093f\u0937\u092f" : "Topic"}
              </div>
              <div
                className="text-center"
                style={{ color: "oklch(0.65 0.04 50)" }}
              >
                {hi
                  ? `${city.nameHi} \u0915\u0947 \u0938\u094d\u0925\u093e\u0928\u0940\u092f \u091c\u094d\u092f\u094b\u0924\u093f\u0937\u0940`
                  : `Local ${city.nameEn} Astrologer`}
              </div>
              <div
                className="text-center"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Spiritual Connect
              </div>
            </div>
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={row.topic}
                className="grid grid-cols-3 gap-4 py-3 text-sm"
                style={{
                  borderTop:
                    idx > 0 ? "1px solid oklch(0.78 0.14 75 / 0.1)" : "none",
                }}
                data-ocid={`astrologer_city.comparison.row.${idx + 1}`}
              >
                <div
                  className="font-semibold font-heading"
                  style={{ color: "oklch(0.80 0.05 65)" }}
                >
                  {hi ? row.topicHi : row.topic}
                </div>
                <div
                  className="flex items-start gap-1.5"
                  style={{ color: "oklch(0.65 0.04 50)" }}
                >
                  <XCircle
                    className="h-4 w-4 flex-shrink-0 mt-0.5"
                    style={{ color: "oklch(0.60 0.15 25)" }}
                  />
                  <span className="font-body text-xs">
                    {hi ? row.traditionalHi : row.traditional}
                  </span>
                </div>
                <div
                  className="flex items-start gap-1.5"
                  style={{ color: "oklch(0.78 0.05 60)" }}
                >
                  <CheckCircle
                    className="h-4 w-4 flex-shrink-0 mt-0.5"
                    style={{ color: "oklch(0.75 0.14 150)" }}
                  />
                  <span className="font-body text-xs">
                    {hi ? row.scHi : row.sc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City FAQ */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2
            className="text-2xl font-display font-bold mb-8"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? `${city.nameHi} \u2014 \u0905\u0915\u094d\u0938\u0930 \u092a\u0942\u091b\u0947 \u091c\u093e\u0928\u0947 \u0935\u093e\u0932\u0947 \u092a\u094d\u0930\u0936\u094d\u0928`
              : `${city.nameEn} \u2014 Frequently Asked Questions`}
          </h2>
          <div className="space-y-3" data-ocid="astrologer_city.faq">
            {city.faqItems.map((item, idx) => (
              <div
                key={item.question}
                className="rounded-xl overflow-hidden"
                style={{
                  border: "1px solid oklch(0.78 0.14 75 / 0.18)",
                  background: "oklch(0.20 0.07 22)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  data-ocid={`astrologer_city.faq.toggle.${idx + 1}`}
                >
                  <span
                    className="font-heading text-sm font-medium"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="text-lg flex-shrink-0"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {faqOpen === idx ? "\u2212" : "+"}
                  </span>
                </button>
                {faqOpen === idx && (
                  <div className="px-5 pb-5">
                    <p
                      className="text-sm font-body"
                      style={{ color: "oklch(0.75 0.04 58)" }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-12 text-center"
        style={{ background: "oklch(0.20 0.07 22)" }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl font-display font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? `${city.nameHi} \u0938\u0947 \u0928\u093f\u0903\u0936\u0941\u0932\u094d\u0915 \u092a\u0930\u093e\u092e\u0930\u094d\u0936 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902`
              : `Start Free Consultation from ${city.nameEn}`}
          </h2>
          <p
            className="text-sm font-body mb-6 max-w-md mx-auto"
            style={{ color: "oklch(0.72 0.04 55)" }}
          >
            {hi
              ? "5 \u0928\u093f\u0903\u0936\u0941\u0932\u094d\u0915 \u0938\u0902\u0926\u0947\u0936 \u00b7 \u0915\u094d\u0930\u0947\u0921\u093f\u091f \u0915\u093e\u0930\u094d\u0921 \u0928\u0939\u0940\u0902"
              : "5 free messages \u00b7 No credit card required"}
          </p>
          <Link
            to="/astrologer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-heading font-semibold text-sm transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="astrologer_city.cta.start_button"
          >
            {hi
              ? "\u0928\u093f\u0903\u0936\u0941\u0932\u094d\u0915 \u092a\u0930\u093e\u092e\u0930\u094d\u0936 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902"
              : "Start Free Consultation"}
          </Link>
        </div>
      </section>

      {/* Browse Other Cities */}
      {nearbyCities.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2
              className="text-xl font-display font-bold mb-6"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {hi
                ? "\u0905\u0928\u094d\u092f \u0936\u0939\u0930 \u0926\u0947\u0916\u0947\u0902"
                : "Browse Other Cities"}
              {region && (
                <span
                  className="text-sm font-body ml-2"
                  style={{ color: "oklch(0.65 0.04 55)" }}
                >
                  \u2014 {hi ? region.labelHi : region.label}
                </span>
              )}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {nearbyCities.map((c, idx) => (
                <Link
                  key={c.slug}
                  to="/astrologers-india/$citySlug"
                  params={{ citySlug: c.slug }}
                  className="rounded-xl p-4 text-center group hover:scale-[1.03] transition-all duration-200"
                  style={{
                    background: "oklch(0.20 0.07 22)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                  data-ocid={`astrologer_city.nearby.item.${idx + 1}`}
                >
                  <p
                    className="font-heading font-semibold text-xs mb-0.5"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {c.nameEn}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {c.nameHi}
                  </p>
                  <p
                    className="text-[10px] mt-1"
                    style={{ color: "oklch(0.60 0.04 50)" }}
                  >
                    {hi ? c.stateHi : c.state}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/astrologers-india"
                className="text-sm font-semibold hover:underline"
                style={{ color: "oklch(0.78 0.14 75)" }}
                data-ocid="astrologer_city.all_cities_link"
              >
                {hi
                  ? "\u0938\u092d\u0940 50+ \u0936\u0939\u0930 \u0926\u0947\u0916\u0947\u0902 \u2192"
                  : "View all 50+ cities \u2192"}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
