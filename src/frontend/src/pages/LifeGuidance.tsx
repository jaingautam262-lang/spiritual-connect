import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { lifeGuidanceTopics } from "../data/lifeGuidanceData";

export default function LifeGuidance() {
  const { language } = useLanguage();
  const hi = language === "hi";

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.13 0.05 25)" }}>
      {/* Hero */}
      <section
        className="py-16 px-4 text-center"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.10 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            🕉️ {hi ? "जीवन मार्गदर्शन" : "Life Guidance"}
          </p>
          <h1
            className="text-3xl md:text-5xl font-heading font-bold mb-4"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.78 0.14 75), oklch(0.82 0.16 60))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {hi ? "मन में क्या है?" : "What's on Your Mind?"}
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.75 0.05 55)" }}
          >
            {hi
              ? "कृष्ण की भगवद्गीता की शिक्षाओं में जीवन की हर चुनौती का उत्तर है। एक विषय चुनें।"
              : "Krishna's Bhagavad Gita wisdom has answers for every challenge in life. Choose a topic to explore His guidance."}
          </p>
        </div>
      </section>

      {/* Topic Grid */}
      <section className="px-4 py-14">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifeGuidanceTopics.map((topic, idx) => (
              <Link
                key={topic.id}
                to="/life-guidance/$topic"
                params={{ topic: topic.slug }}
                data-ocid={`life-guidance.topic.${idx + 1}`}
              >
                <article
                  className="group h-full rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                  style={{
                    background: "oklch(0.18 0.07 28 / 0.8)",
                    borderColor: "oklch(0.78 0.14 75 / 0.12)",
                  }}
                >
                  <div className="text-4xl">{topic.emoji}</div>
                  <div className="flex-1">
                    <h2
                      className="font-heading font-semibold text-base leading-snug mb-2 group-hover:text-amber-300 transition-colors"
                      style={{ color: "oklch(0.88 0.06 75)" }}
                    >
                      {hi ? topic.titleHindi : topic.title}
                    </h2>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.65 0.04 60)" }}
                    >
                      {hi ? topic.subtitleHindi : topic.subtitle}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs font-semibold mt-auto pt-2"
                    style={{
                      borderTop: "1px solid oklch(0.78 0.14 75 / 0.1)",
                      color: "oklch(0.78 0.14 75)",
                    }}
                  >
                    {hi ? "अन्वेषण करें" : "Explore"}
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-5xl">
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.22 0.09 30) 0%, oklch(0.28 0.12 40) 100%)",
              border: "1px solid oklch(0.78 0.14 75 / 0.15)",
            }}
            data-ocid="life-guidance.cta_section"
          >
            <div className="text-4xl mb-4">🙏</div>
            <h3
              className="text-xl font-heading font-bold mb-2"
              style={{ color: "oklch(0.88 0.06 75)" }}
            >
              {hi ? "अपना विषय नहीं दिखा?" : "Don't See Your Topic?"}
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "oklch(0.70 0.04 60)" }}
            >
              {hi
                ? "कृष्ण से सीधे पूछें और अपनी विशेष स्थिति पर व्यक्तिगत ज्ञान पाएं।"
                : "Talk to Krishna directly and receive personalized wisdom about your specific situation."}
            </p>
            <Link
              to="/ask-krishna"
              data-ocid="life-guidance.ask_krishna_button"
            >
              <button
                type="button"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.68 0.18 48), oklch(0.72 0.20 55))",
                  color: "oklch(0.12 0.03 30)",
                }}
              >
                <MessageCircle className="h-4 w-4" />
                {hi ? "कृष्ण से बात करें" : "Talk to Krishna Free"}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
