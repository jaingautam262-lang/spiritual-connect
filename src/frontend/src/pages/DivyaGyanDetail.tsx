import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, Share2, Volume2 } from "lucide-react";
import { useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import TTSAudioPlayer from "../components/TTSAudioPlayer";
import { divyaGyanArticles } from "../data/divyaGyanData";

export default function DivyaGyanDetail() {
  const { slug } = useParams({ from: "/divya-gyan/$slug" });
  const [showTTS, setShowTTS] = useState(false);

  const article = divyaGyanArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.97 0.015 85)" }}
      >
        <div className="text-center">
          <p
            className="font-heading text-2xl font-bold mb-4"
            style={{ color: "oklch(0.35 0.08 28)" }}
          >
            लेख नहीं मिला
          </p>
          <Link
            to="/divya-gyan"
            className="font-body text-sm"
            style={{ color: "oklch(0.62 0.18 48)" }}
          >
            ← वापस जाएं
          </Link>
        </div>
      </div>
    );
  }

  const fullText = article.content
    .map((s) => (s.heading ? `${s.heading}. ${s.text}` : s.text))
    .join(" ");

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Header */}
      <div
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 22), oklch(0.32 0.10 28))",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            to="/divya-gyan"
            className="inline-flex items-center gap-2 text-sm font-body mb-6 opacity-80 hover:opacity-100 transition-opacity"
            style={{ color: "oklch(0.78 0.12 70)" }}
          >
            <ArrowLeft className="h-4 w-4" /> दिव्य ज्ञान
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs px-3 py-1 rounded-full font-body"
              style={{
                background: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.78 0.14 75)",
              }}
            >
              {article.category}
            </span>
            <span
              className="flex items-center gap-1 text-xs font-body"
              style={{ color: "oklch(0.65 0.06 60)" }}
            >
              <Clock className="h-3 w-3" /> {article.readTime} मिनट
            </span>
          </div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-2 leading-snug"
            style={{ color: "oklch(0.95 0.015 85)" }}
          >
            {article.titleHindi}
          </h1>
          <p
            className="font-body text-base"
            style={{ color: "oklch(0.75 0.08 65)" }}
          >
            {article.summary}
          </p>
        </div>
      </div>

      {/* Audio section */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        {article.audioUrl ? (
          <AudioPlayer title={article.titleHindi} audioUrl={article.audioUrl} />
        ) : (
          <div>
            <button
              type="button"
              onClick={() => setShowTTS(!showTTS)}
              data-ocid="divya-gyan-detail.tts_toggle"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body transition-all duration-200 hover:scale-105"
              style={{
                background: showTTS
                  ? "linear-gradient(135deg, oklch(0.78 0.14 75), oklch(0.68 0.20 48))"
                  : "oklch(0.93 0.02 75)",
                color: showTTS ? "oklch(0.12 0.04 28)" : "oklch(0.45 0.06 38)",
                border: "1px solid oklch(0.85 0.04 70)",
              }}
            >
              <Volume2 className="h-4 w-4" />
              {showTTS ? "TTS बंद करें" : "AI आवाज़ में सुनें"}
            </button>
            {showTTS && (
              <TTSAudioPlayer
                text={fullText}
                language="hi-IN"
                title={article.titleHindi}
              />
            )}
          </div>
        )}
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.99 0.008 80)",
            border: "1px solid oklch(0.85 0.04 70)",
          }}
        >
          {article.content.map((section, idx) => (
            <div
              key={`section-${idx}-${section.type}`}
              className={section.type === "quote" ? "my-6" : "mb-6"}
            >
              {section.heading && (
                <h2
                  className="font-heading text-xl font-bold mb-3"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {section.heading}
                </h2>
              )}
              {section.type === "quote" ? (
                <blockquote
                  className="border-l-4 pl-4 py-2 italic font-body"
                  style={{
                    borderColor: "oklch(0.78 0.14 75)",
                    background: "oklch(0.94 0.025 80)",
                    color: "oklch(0.35 0.08 28)",
                    borderRadius: "0 0.5rem 0.5rem 0",
                  }}
                >
                  {section.text}
                </blockquote>
              ) : section.type === "list" ? (
                <ul className="space-y-2">
                  {section.text
                    .split("\n")
                    .filter(Boolean)
                    .map((item, i) => (
                      <li
                        key={`li-${i}-${item.slice(0, 15)}`}
                        className="flex items-start gap-2 font-body text-sm"
                        style={{ color: "oklch(0.30 0.05 32)" }}
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ background: "oklch(0.68 0.20 48)" }}
                        />
                        {item.replace(/^[•\-*]\s*/, "")}
                      </li>
                    ))}
                </ul>
              ) : (
                <p
                  className="font-body leading-relaxed"
                  style={{
                    color:
                      section.type === "intro"
                        ? "oklch(0.28 0.06 30)"
                        : "oklch(0.35 0.04 35)",
                    fontSize: section.type === "intro" ? "1rem" : "0.9375rem",
                  }}
                >
                  {section.text}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-body"
                style={{
                  background: "oklch(0.93 0.02 75)",
                  color: "oklch(0.48 0.06 40)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share + Back */}
        <div
          className="flex items-center justify-between mt-8 pt-6"
          style={{ borderTop: "1px solid oklch(0.85 0.04 70)" }}
        >
          <Link
            to="/divya-gyan"
            className="inline-flex items-center gap-2 text-sm font-body transition-colors hover:underline"
            style={{ color: "oklch(0.62 0.18 48)" }}
          >
            <ArrowLeft className="h-4 w-4" /> सभी लेख
          </Link>
          <button
            type="button"
            onClick={() =>
              navigator.share?.({
                title: article.titleHindi,
                url: window.location.href,
              })
            }
            className="inline-flex items-center gap-2 text-sm font-body"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            <Share2 className="h-4 w-4" /> साझा करें
          </button>
        </div>
      </div>
    </div>
  );
}
