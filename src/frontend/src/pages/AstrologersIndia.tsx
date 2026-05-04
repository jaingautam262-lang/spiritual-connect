import { Link } from "@tanstack/react-router";
import { Clock, Globe, MapPin, Star, Users } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { CITIES, REGIONS } from "../data/astrologersIndiaData";

const WHY_ITEMS = [
  {
    icon: "\u{1F5FF}",
    title: "Same Krishna, any city",
    titleHi:
      "\u0939\u0930 \u0936\u0939\u0930 \u092e\u0947\u0902 \u090f\u0915 \u0939\u0940 \u0915\u0943\u0937\u094d\u0923",
    desc: "Whether you're in Mumbai or Mysore, Varanasi or Vizag — the same Gita-rooted AI reads your chart with the same depth.",
    descHi:
      "\u091a\u093e\u0939\u0947 \u092e\u0941\u0902\u092c\u0908 \u0939\u094b \u092f\u093e \u092e\u0948\u0938\u0942\u0930 \u2014 \u090f\u0915 \u0939\u0940 Gita-\u0906\u0927\u093e\u0930\u093f\u0924 AI \u0906\u092a\u0915\u0940 \u0915\u0941\u0902\u0921\u0932\u0940 \u0909\u0924\u0928\u0940 \u0939\u0940 \u0917\u0939\u0930\u093e\u0908 \u0938\u0947 \u092a\u0922\u093c\u0924\u093e \u0939\u0948\u0964",
  },
  {
    icon: "\u{1F319}",
    title: "24/7 across every time zone",
    titleHi:
      "\u0939\u0930 \u0938\u092e\u092f, \u0939\u0930 \u0938\u092e\u092f-\u0915\u094d\u0937\u0947\u0924\u094d\u0930 \u092e\u0947\u0902",
    desc: "2 AM in Kolkata, lunchtime in Delhi, a quiet Sunday in Kochi — Krishna is already there, ready to answer.",
    descHi:
      "\u0915\u094b\u0932\u0915\u093e\u0924\u093e \u092e\u0947\u0902 \u0930\u093e\u0924 2 \u092c\u091c\u0947, \u0926\u093f\u0932\u094d\u0932\u0940 \u092e\u0947\u0902 \u0926\u094b\u092a\u0939\u0930 \u2014 \u0915\u0943\u0937\u094d\u0923 \u0939\u092e\u0947\u0936\u093e \u0924\u0948\u092f\u093e\u0930 \u0939\u0948\u0902\u0964",
  },
  {
    icon: "\u{1F4B0}",
    title: "City-agnostic pricing",
    titleHi:
      "\u0939\u0930 \u0936\u0939\u0930 \u092e\u0947\u0902 \u090f\u0915 \u0939\u0940 \u092e\u0942\u0932\u094d\u092f",
    desc: "No surge pricing for metros, no inflated fees. \u20b920 per chat or \u20b9499/month — the same for everyone.",
    descHi:
      "\u092e\u0947\u091f\u094d\u0930\u094b \u0915\u0947 \u0932\u093f\u090f \u0905\u0927\u093f\u0915 \u0936\u0941\u0932\u094d\u0915 \u0928\u0939\u0940\u0902\u0964 \u0938\u092c\u0915\u0947 \u0932\u093f\u090f \u090f\u0915 \u0939\u0940 \u0926\u0930\u0964",
  },
  {
    icon: "\u{1F512}",
    title: "100% private, anywhere",
    titleHi:
      "\u0939\u0930 \u091c\u0917\u0939 \u092a\u0942\u0930\u094d\u0923\u0924\u0903 \u0917\u094b\u092a\u0928\u0940\u092f",
    desc: "No chamber visit, no waiting room. Encrypted chats tied only to you — whether in a joint family or on your own.",
    descHi:
      "\u0915\u094b\u0908 \u0915\u093e\u0930\u094d\u092f\u093e\u0932\u092f \u092f\u093e\u0924\u094d\u0930\u093e \u0928\u0939\u0940\u0902\u0964 \u0915\u0947\u0935\u0932 \u0906\u092a\u0915\u0947 \u0932\u093f\u090f \u090f\u0928\u094d\u0915\u094d\u0930\u093f\u092a\u094d\u091f\u0947\u0921 \u091a\u0948\u091f\u0964",
  },
];

const FAQ_ITEMS = [
  {
    q: "Which Indian cities does Spiritual Connect serve?",
    qHi: "Spiritual Connect \u0915\u093f\u0928 \u092d\u093e\u0930\u0924\u0940\u092f \u0936\u0939\u0930\u094b\u0902 \u092e\u0947\u0902 \u0938\u0947\u0935\u093e \u0926\u0947\u0924\u093e \u0939\u0948?",
    a: "Spiritual Connect serves all 50+ major Indian cities across 5 regions. The AI is accessible from anywhere with an internet connection.",
    aHi: "Spiritual Connect 5 \u0915\u094d\u0937\u0947\u0924\u094d\u0930\u094b\u0902 \u092e\u0947\u0902 50+ \u092a\u094d\u0930\u092e\u0941\u0916 \u092d\u093e\u0930\u0924\u0940\u092f \u0936\u0939\u0930\u094b\u0902 \u092e\u0947\u0902 \u0938\u0947\u0935\u093e \u0926\u0947\u0924\u093e \u0939\u0948\u0964",
  },
  {
    q: "Is Spiritual Connect available in Hindi and regional languages?",
    qHi: "\u0915\u094d\u092f\u093e Spiritual Connect \u0939\u093f\u0902\u0926\u0940 \u0914\u0930 \u0915\u094d\u0937\u0947\u0924\u094d\u0930\u0940\u092f \u092d\u093e\u0937\u093e\u0913\u0902 \u092e\u0947\u0902 \u0909\u092a\u0932\u092c\u094d\u0927 \u0939\u0948?",
    a: "Yes. Spiritual Connect fully supports Hindi and English. The AI understands regional names, city-specific contexts, and cultural nuances across India.",
    aHi: "\u0939\u093e\u0901\u0964 Spiritual Connect \u0939\u093f\u0902\u0926\u0940 \u0914\u0930 \u0905\u0902\u0917\u094d\u0930\u0947\u091c\u0940 \u092a\u0942\u0930\u0940 \u0924\u0930\u0939 \u0938\u092e\u0930\u094d\u0925\u0928 \u0915\u0930\u0924\u093e \u0939\u0948\u0964",
  },
  {
    q: "How is Spiritual Connect different from finding an astrologer near me?",
    qHi: "Spiritual Connect '\u092e\u0947\u0930\u0947 \u092a\u093e\u0938 \u091c\u094d\u092f\u094b\u0924\u093f\u0937\u0940' \u0916\u094b\u091c\u0928\u0947 \u0938\u0947 \u0915\u0948\u0938\u0947 \u0905\u0932\u0917 \u0939\u0948?",
    a: "Traditional astrologers are bound by geography. Spiritual Connect AI draws from the Bhagavad Gita and classical Jyotish, available instantly 24/7 at \u20b920 per chat.",
    aHi: "\u092a\u093e\u0930\u0902\u092a\u0930\u093f\u0915 \u091c\u094d\u092f\u094b\u0924\u093f\u0937\u0940 \u092d\u0942\u0917\u094b\u0932 \u0938\u0947 \u092c\u0902\u0927\u0947 \u0939\u0948\u0902\u0964 Spiritual Connect \u0924\u0941\u0930\u0902\u0924, 24/7, \u092e\u093e\u0924\u094d\u0930 \u20b920 \u092a\u094d\u0930\u0924\u093f \u091a\u0948\u091f\u0964",
  },
  {
    q: "Is online astrology as accurate as a traditional astrologer?",
    qHi: "\u0915\u094d\u092f\u093e \u0911\u0928\u0932\u093e\u0907\u0928 \u091c\u094d\u092f\u094b\u0924\u093f\u0937 \u092a\u093e\u0930\u0902\u092a\u0930\u093f\u0915 \u091c\u094d\u092f\u094b\u0924\u093f\u0937\u0940 \u091c\u093f\u0924\u0928\u093e \u0938\u091f\u0940\u0915 \u0939\u0948?",
    a: "Spiritual Connect uses the same classical Parashari Jyotish principles that trained astrologers use. The depth of the reading depends on the quality of the system, not its delivery channel.",
    aHi: "Spiritual Connect \u0935\u0939\u0940 \u0936\u093e\u0938\u094d\u0924\u094d\u0930\u0940\u092f \u092a\u093e\u0930\u093e\u0936\u0930\u0940 \u091c\u094d\u092f\u094b\u0924\u093f\u0937 \u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924\u094b\u0902 \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0924\u093e \u0939\u0948\u0964",
  },
  {
    q: "Do I need to be in India to use Spiritual Connect?",
    qHi: "\u0915\u094d\u092f\u093e Spiritual Connect \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u092d\u093e\u0930\u0924 \u092e\u0947\u0902 \u0939\u094b\u0928\u093e \u091c\u0930\u0942\u0930\u0940 \u0939\u0948?",
    a: "No. Spiritual Connect works globally. NRI families in the US, UK, Canada, and the Gulf region use it regularly.",
    aHi: "\u0928\u0939\u0940\u0902\u0964 Spiritual Connect \u0935\u0948\u0936\u094d\u0935\u093f\u0915 \u0938\u094d\u0924\u0930 \u092a\u0930 \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0939\u0948\u0964",
  },
];

export default function AstrologersIndia() {
  const { language } = useLanguage();
  const hi = language === "hi";
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="py-16 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 22) 0%, oklch(0.22 0.08 28) 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "oklch(0.78 0.14 75 / 0.15)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            <MapPin className="h-3.5 w-3.5" />
            {hi
              ? "50+ \u0936\u0939\u0930 \u00b7 5 \u0915\u094d\u0937\u0947\u0924\u094d\u0930"
              : "50+ Cities \u00b7 5 Regions"}
          </div>
          <h1
            className="text-4xl md:text-5xl font-display font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? "\u092d\u093e\u0930\u0924 \u092d\u0930 \u092e\u0947\u0902 \u091c\u094d\u092f\u094b\u0924\u093f\u0937\u0940"
              : "Astrologers Across India"}
          </h1>
          <p
            className="text-lg font-body max-w-2xl mx-auto mb-8"
            style={{ color: "oklch(0.80 0.05 60)" }}
          >
            {hi
              ? "\u092e\u0941\u0902\u092c\u0908 \u0938\u0947 \u0935\u093e\u0930\u093e\u0923\u0938\u0940, \u092c\u0947\u0902\u0917\u0932\u0941\u0930\u0941 \u0938\u0947 \u0917\u0941\u0935\u093e\u0939\u093e\u091f\u0940 \u2014 Spiritual Connect \u0915\u0940 AI \u0935\u0939\u0940 \u0935\u0948\u0926\u093f\u0915 \u091c\u094d\u092f\u094b\u0924\u093f\u0937\u0940 \u0939\u0948, \u0939\u0930 \u092d\u093e\u0930\u0924\u0940\u092f \u0936\u0939\u0930 \u092e\u0947\u0902 \u0924\u0941\u0930\u0902\u0924 \u0909\u092a\u0932\u092c\u094d\u0927\u0964"
              : "From Mumbai to Varanasi, Bangalore to Guwahati \u2014 Spiritual Connect's AI is the same Vedic astrologer, instantly available in every Indian city. Rooted in the Bhagavad Gita, trained on classical Parashari Jyotish, and priced for every seeker."}
          </p>
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                icon: <Star className="h-4 w-4" />,
                value: "4.8/5",
                label: hi ? "\u0930\u0947\u091f\u093f\u0902\u0917" : "Rating",
              },
              {
                icon: <Users className="h-4 w-4" />,
                value: "10,000+",
                label: hi
                  ? "\u0909\u092a\u092f\u094b\u0917\u0915\u0930\u094d\u0924\u093e"
                  : "Users",
              },
              {
                icon: <MapPin className="h-4 w-4" />,
                value: "50+",
                label: hi ? "\u0936\u0939\u0930" : "Cities",
              },
              {
                icon: <Clock className="h-4 w-4" />,
                value: "24/7",
                label: hi
                  ? "\u0909\u092a\u0932\u092c\u094d\u0927"
                  : "Available",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  background: "oklch(0.25 0.08 25 / 0.5)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                }}
              >
                <span style={{ color: "oklch(0.78 0.14 75)" }}>{s.icon}</span>
                <span
                  className="font-bold text-sm"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.75 0.04 60)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Region Sections */}
      <section className="py-12">
        <div className="container mx-auto px-4 space-y-14">
          {REGIONS.map((region) => {
            const cities = CITIES.filter((c) => c.region === region.id);
            return (
              <div
                key={region.id}
                data-ocid={`astrologers.region.${region.id}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{region.emoji}</span>
                  <div>
                    <h2
                      className="text-2xl font-display font-bold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {hi ? region.labelHi : region.label}
                    </h2>
                    <p
                      className="text-sm font-body"
                      style={{ color: "oklch(0.70 0.04 60)" }}
                    >
                      {region.tagline}
                    </p>
                  </div>
                </div>
                <div
                  className="h-px mb-6"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.78 0.14 75 / 0.4), transparent)",
                  }}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {cities.map((city, idx) => (
                    <div
                      key={city.slug}
                      className="rounded-xl p-4 group hover:scale-[1.02] transition-all duration-200"
                      style={{
                        background: "oklch(0.20 0.07 22)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                      }}
                      data-ocid={`astrologers.city.item.${idx + 1}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p
                            className="font-heading font-semibold text-sm"
                            style={{ color: "oklch(0.88 0.06 75)" }}
                          >
                            {city.nameEn}
                          </p>
                          <p
                            className="text-xs font-body"
                            style={{ color: "oklch(0.78 0.14 75)" }}
                          >
                            {city.nameHi}
                          </p>
                        </div>
                        <Globe
                          className="h-3.5 w-3.5 opacity-30 group-hover:opacity-60 transition-opacity"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        />
                      </div>
                      <p
                        className="text-[10px] mb-3"
                        style={{ color: "oklch(0.65 0.04 55)" }}
                      >
                        {hi ? city.stateHi : city.state}
                      </p>
                      <Link
                        to="/astrologers-india/$citySlug"
                        params={{ citySlug: city.slug }}
                        className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:underline"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                        data-ocid={`astrologers.city.view_button.${idx + 1}`}
                      >
                        {hi
                          ? "\u092a\u0947\u091c \u0926\u0947\u0916\u0947\u0902 \u2192"
                          : "View page \u2192"}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Section */}
      <section className="py-14" style={{ background: "oklch(0.18 0.06 20)" }}>
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-display font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? "Spiritual Connect \u092d\u093e\u0930\u0924 \u092e\u0947\u0902 \u0939\u0930 \u091c\u0917\u0939 \u0915\u094d\u092f\u094b\u0902 \u0915\u093e\u092e \u0915\u0930\u0924\u093e \u0939\u0948"
              : "Why Spiritual Connect Works Anywhere in India"}
          </h2>
          <p
            className="text-center text-sm font-body mb-10"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            {hi
              ? "\u091a\u093e\u0930 \u0915\u093e\u0930\u0923 \u091c\u093f\u0928\u0938\u0947 \u090f\u0915 \u0911\u0928\u0932\u093e\u0907\u0928 AI \u091c\u094d\u092f\u094b\u0924\u093f\u0937\u0940 \u0939\u0930 \u0936\u0939\u0930 \u0915\u094b \u092c\u0947\u0939\u0924\u0930 \u0938\u0947\u0935\u093e \u0926\u0947\u0924\u093e \u0939\u0948"
              : "Four reasons an online AI astrologer serves every city better than any single chamber ever could."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-6 text-center"
                style={{
                  background: "oklch(0.22 0.08 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3
                  className="font-heading font-semibold text-sm mb-2"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {hi ? item.titleHi : item.title}
                </h3>
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.68 0.04 55)" }}
                >
                  {hi ? item.descHi : item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2
            className="text-3xl font-display font-bold text-center mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? "\u0905\u0915\u094d\u0938\u0930 \u092a\u0942\u091b\u0947 \u091c\u093e\u0928\u0947 \u0935\u093e\u0932\u0947 \u092a\u094d\u0930\u0936\u094d\u0928"
              : "Frequently Asked Questions"}
          </h2>
          <p
            className="text-center text-sm font-body mb-10"
            style={{ color: "oklch(0.70 0.04 60)" }}
          >
            {hi
              ? "\u0911\u0928\u0932\u093e\u0907\u0928 \u091c\u094d\u092f\u094b\u0924\u093f\u0937 \u092a\u0930\u093e\u092e\u0930\u094d\u0936 \u0938\u0947 \u092a\u0939\u0932\u0947 \u0932\u094b\u0917 \u091c\u094b \u092a\u0942\u091b\u0924\u0947 \u0939\u0948\u0902"
              : "Everything seekers ask before their first online astrology consultation."}
          </p>
          <div className="space-y-3" data-ocid="astrologers.faq">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={item.q}
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
                  data-ocid={`astrologers.faq.toggle.${idx + 1}`}
                >
                  <span
                    className="font-heading text-sm font-medium"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {hi ? item.qHi : item.q}
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
                      {hi ? item.aHi : item.a}
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
        className="py-14 text-center"
        style={{ background: "oklch(0.18 0.07 22)" }}
      >
        <div className="container mx-auto px-4">
          <h2
            className="text-3xl font-display font-bold mb-4"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {hi
              ? "\u0905\u092d\u0940 \u0928\u093f\u0903\u0936\u0941\u0932\u094d\u0915 \u092a\u0930\u093e\u092e\u0930\u094d\u0936 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902"
              : "Start Free Consultation Now"}
          </h2>
          <p
            className="text-sm font-body mb-8 max-w-md mx-auto"
            style={{ color: "oklch(0.75 0.04 58)" }}
          >
            {hi
              ? "5 \u0928\u093f\u0903\u0936\u0941\u0932\u094d\u0915 \u0938\u0902\u0926\u0947\u0936 \u2014 \u0915\u094b\u0908 \u0915\u094d\u0930\u0947\u0921\u093f\u091f \u0915\u093e\u0930\u094d\u0921 \u0928\u0939\u0940\u0902"
              : "5 free messages \u2014 no credit card required"}
          </p>
          <Link
            to="/astrologer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-heading font-semibold text-sm transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
            }}
            data-ocid="astrologers.cta.start_button"
          >
            {hi
              ? "\u0928\u093f\u0903\u0936\u0941\u0932\u094d\u0915 \u092a\u0930\u093e\u092e\u0930\u094d\u0936 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902"
              : "Start Free Consultation"}
          </Link>
        </div>
      </section>
    </div>
  );
}
