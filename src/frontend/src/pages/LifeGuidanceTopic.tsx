import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, MessageCircle } from "lucide-react";
import FavouriteButton from "../components/FavouriteButton";
import WhatsAppShare from "../components/WhatsAppShare";
import { useLanguage } from "../contexts/LanguageContext";
import { findTopicBySlug, lifeGuidanceTopics } from "../data/lifeGuidanceData";

export default function LifeGuidanceTopic() {
  const { topic: slug } = useParams({ from: "/life-guidance/$topic" });
  const { language } = useLanguage();
  const hi = language === "hi";

  const topic = findTopicBySlug(slug);

  if (!topic) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
        style={{ background: "oklch(0.13 0.05 25)" }}
        data-ocid="life-guidance-topic.not_found"
      >
        <div className="text-6xl">🙏</div>
        <h1
          className="text-2xl font-heading font-bold"
          style={{ color: "oklch(0.88 0.06 75)" }}
        >
          {hi ? "विषय नहीं मिला" : "Topic not found"}
        </h1>
        <Link to="/life-guidance">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "oklch(0.68 0.18 48)",
              color: "oklch(0.12 0.03 30)",
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            {hi ? "वापस जाएं" : "Go Back"}
          </button>
        </Link>
      </div>
    );
  }

  const relatedTopics = lifeGuidanceTopics
    .filter((t) => t.id !== topic.id)
    .slice(0, 3);

  const pageTitle = hi ? topic.titleHindi : topic.title;
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.13 0.05 25)" }}>
      {/* Hero */}
      <section
        className="py-14 px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.10 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <Link
            to="/life-guidance"
            className="inline-flex items-center gap-1.5 text-xs mb-6 hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
            data-ocid="life-guidance-topic.back_link"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {hi ? "जीवन मार्गदर्शन" : "Life Guidance"}
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <div className="text-6xl md:text-7xl shrink-0">{topic.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                {topic.gitaChaptersRef.map((ref) => (
                  <span
                    key={ref}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "oklch(0.68 0.18 48 / 0.18)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                      color: "oklch(0.82 0.14 55)",
                    }}
                  >
                    📖 {ref}
                  </span>
                ))}
              </div>
              <h1
                className="text-2xl md:text-4xl font-heading font-bold mb-2"
                style={{ color: "oklch(0.88 0.06 75)" }}
              >
                {hi ? topic.titleHindi : topic.title}
              </h1>
              <p
                className="text-sm md:text-base leading-relaxed mb-4"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                {hi ? topic.subtitleHindi : topic.subtitle}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <FavouriteButton
                  item={{
                    id: `life-guidance-${topic.id}`,
                    type: "stuti",
                    title: pageTitle,
                    path: `/life-guidance/${topic.slug}`,
                  }}
                />
                <WhatsAppShare title={pageTitle} url={pageUrl} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-8">
            {/* Intro */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.18 0.07 28 / 0.6)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
              data-ocid="life-guidance-topic.intro"
            >
              <p
                className="text-base leading-relaxed font-medium"
                style={{ color: "oklch(0.80 0.06 60)" }}
              >
                {topic.content.intro}
              </p>
            </div>

            {/* Sections */}
            {topic.content.sections.map((section, idx) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: section order is stable
                key={idx}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
                data-ocid={`life-guidance-topic.section.${idx + 1}`}
              >
                <div
                  className="px-6 py-4"
                  style={{ background: "oklch(0.22 0.09 32 / 0.7)" }}
                >
                  <h2
                    className="font-heading font-bold text-lg"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {section.heading}
                  </h2>
                </div>

                {section.verse && (
                  <div
                    className="mx-6 mt-4 px-5 py-4 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.18 48 / 0.12) 0%, oklch(0.72 0.20 55 / 0.18) 100%)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.22)",
                    }}
                  >
                    <p
                      className="font-heading text-base font-semibold mb-2 text-center"
                      style={{ color: "oklch(0.82 0.14 55)" }}
                    >
                      {section.verse}
                    </p>
                    {section.verseTranslation && (
                      <p
                        className="text-xs text-center leading-relaxed italic"
                        style={{ color: "oklch(0.70 0.06 55)" }}
                      >
                        {section.verseTranslation}
                      </p>
                    )}
                  </div>
                )}

                <div className="px-6 py-5">
                  <p
                    className="text-sm leading-loose"
                    style={{ color: "oklch(0.72 0.04 55)" }}
                  >
                    {section.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Key Practices */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.20 0.08 28 / 0.6)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
              data-ocid="life-guidance-topic.key_practices"
            >
              <div className="flex items-center gap-2 mb-5">
                <BookOpen
                  className="h-5 w-5"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                />
                <h3
                  className="font-heading font-bold text-base"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  {hi ? "मुख्य अभ्यास" : "Key Practices"}
                </h3>
              </div>
              <ol className="space-y-3">
                {topic.content.keyPractices.map((practice, idx) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: practice order is stable
                    key={idx}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    data-ocid={`life-guidance-topic.practice.${idx + 1}`}
                  >
                    <span
                      className="shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "oklch(0.68 0.18 48 / 0.18)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                        color: "oklch(0.82 0.14 55)",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span style={{ color: "oklch(0.72 0.04 55)" }}>
                      {practice}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA */}
            <div
              className="rounded-2xl p-7 text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.22 0.09 30) 0%, oklch(0.28 0.12 40) 100%)",
                border: "1px solid oklch(0.78 0.14 75 / 0.15)",
              }}
              data-ocid="life-guidance-topic.cta"
            >
              <div className="text-3xl mb-3">🙏</div>
              <p
                className="text-sm mb-5"
                style={{ color: "oklch(0.70 0.04 60)" }}
              >
                {hi
                  ? "अपनी स्थिति पर व्यक्तिगत मार्गदर्शन के लिए कृष्ण से बात करें।"
                  : "Ready for personalized guidance on your specific situation?"}
              </p>
              <Link to="/ask-krishna">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.68 0.18 48), oklch(0.72 0.20 55))",
                    color: "oklch(0.12 0.03 30)",
                  }}
                  data-ocid="life-guidance-topic.ask_krishna_button"
                >
                  <MessageCircle className="h-4 w-4" />
                  {hi ? "कृष्ण से पूछें" : topic.content.cta}
                </button>
              </Link>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            {/* Related Topics */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "oklch(0.18 0.07 28 / 0.7)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <h3
                className="font-heading font-bold text-sm mb-4"
                style={{ color: "oklch(0.88 0.06 75)" }}
              >
                {hi ? "संबंधित विषय" : "Related Topics"}
              </h3>
              <div className="space-y-2">
                {relatedTopics.map((t, idx) => (
                  <Link
                    key={t.id}
                    to="/life-guidance/$topic"
                    params={{ topic: t.slug }}
                    data-ocid={`life-guidance-topic.related.${idx + 1}`}
                  >
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:opacity-80 cursor-pointer"
                      style={{
                        background: "oklch(0.22 0.08 28 / 0.6)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.08)",
                      }}
                    >
                      <span className="text-xl">{t.emoji}</span>
                      <span
                        className="text-xs font-medium leading-snug line-clamp-2"
                        style={{ color: "oklch(0.80 0.05 60)" }}
                      >
                        {hi ? t.titleHindi : t.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Share */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "oklch(0.18 0.07 28 / 0.7)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <h3
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.88 0.06 75)" }}
              >
                {hi ? "शेयर करें" : "Share"}
              </h3>
              <WhatsAppShare title={pageTitle} url={pageUrl} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
