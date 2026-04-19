import { Clock, Flame, Heart, Repeat, Sparkles, Star } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export interface BenefitsData {
  benefits: string[];
  bestTime: string;
  repetitions: string;
  deityBlessings: string;
  occasions: string[];
  contentName?: string;
}

interface BenefitsSectionProps extends BenefitsData {
  className?: string;
}

export default function BenefitsSection({
  benefits,
  bestTime,
  repetitions,
  deityBlessings,
  occasions,
  contentName,
  className = "",
}: BenefitsSectionProps) {
  const { language } = useLanguage();

  const labels = {
    title: language === "hi" ? "लाभ एवं महत्व" : "Benefits & Significance",
    spiritualBenefits:
      language === "hi" ? "🌟 आध्यात्मिक लाभ" : "🌟 Spiritual Benefits",
    bestTime: language === "hi" ? "⏰ सर्वश्रेष्ठ समय" : "⏰ Best Time to Chant",
    repetitions: language === "hi" ? "🔁 जप संख्या" : "🔁 Repetitions",
    deityBlessings: language === "hi" ? "🙏 देवता कृपा" : "🙏 Deity Blessings",
    occasions: language === "hi" ? "🎉 अवसर" : "🎉 Occasions for Chanting",
  };

  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        border: "1px solid oklch(0.78 0.14 75 / 0.3)",
        background: "oklch(0.98 0.012 80)",
      }}
      data-ocid="benefits.section"
    >
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center gap-2"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.12), oklch(0.78 0.14 75 / 0.08))",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <Sparkles
          className="h-5 w-5"
          style={{ color: "oklch(0.68 0.20 48)" }}
        />
        <h3
          className="font-heading font-bold text-base"
          style={{ color: "oklch(0.35 0.12 25)" }}
        >
          {labels.title}
          {contentName && (
            <span className="ml-1 font-normal text-sm opacity-70">
              — {contentName}
            </span>
          )}
        </h3>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Spiritual Benefits */}
        {benefits.length > 0 && (
          <div
            className="rounded-xl p-4 col-span-1 md:col-span-2"
            style={{
              background: "oklch(0.68 0.20 48 / 0.06)",
              border: "1px solid oklch(0.68 0.20 48 / 0.2)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Star
                className="h-4 w-4 flex-shrink-0"
                style={{
                  color: "oklch(0.68 0.20 48)",
                  fill: "oklch(0.68 0.20 48)",
                }}
              />
              <span
                className="font-heading font-semibold text-sm"
                style={{ color: "oklch(0.45 0.15 40)" }}
              >
                {labels.spiritualBenefits}
              </span>
            </div>
            <ul className="space-y-1.5">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 text-sm font-body"
                  style={{ color: "oklch(0.35 0.06 35)" }}
                >
                  <span
                    className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0"
                    style={{ background: "oklch(0.68 0.20 48)" }}
                  />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Best Time */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.78 0.14 75 / 0.06)",
            border: "1px solid oklch(0.78 0.14 75 / 0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock
              className="h-4 w-4"
              style={{ color: "oklch(0.55 0.14 65)" }}
            />
            <span
              className="font-heading font-semibold text-xs uppercase tracking-wide"
              style={{ color: "oklch(0.50 0.12 60)" }}
            >
              {labels.bestTime}
            </span>
          </div>
          <p
            className="text-sm font-body"
            style={{ color: "oklch(0.35 0.06 35)" }}
          >
            {bestTime}
          </p>
        </div>

        {/* Repetitions */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.55 0.12 200 / 0.06)",
            border: "1px solid oklch(0.55 0.12 200 / 0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Repeat
              className="h-4 w-4"
              style={{ color: "oklch(0.40 0.12 200)" }}
            />
            <span
              className="font-heading font-semibold text-xs uppercase tracking-wide"
              style={{ color: "oklch(0.35 0.10 200)" }}
            >
              {labels.repetitions}
            </span>
          </div>
          <p
            className="text-sm font-body font-semibold"
            style={{ color: "oklch(0.35 0.06 35)" }}
          >
            {repetitions}
          </p>
        </div>

        {/* Deity Blessings */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "oklch(0.65 0.16 140 / 0.06)",
            border: "1px solid oklch(0.65 0.16 140 / 0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Heart
              className="h-4 w-4"
              style={{ color: "oklch(0.45 0.14 140)" }}
            />
            <span
              className="font-heading font-semibold text-xs uppercase tracking-wide"
              style={{ color: "oklch(0.38 0.12 140)" }}
            >
              {labels.deityBlessings}
            </span>
          </div>
          <p
            className="text-sm font-body"
            style={{ color: "oklch(0.35 0.06 35)" }}
          >
            {deityBlessings}
          </p>
        </div>

        {/* Occasions */}
        {occasions.length > 0 && (
          <div
            className="rounded-xl p-4"
            style={{
              background: "oklch(0.62 0.18 48 / 0.06)",
              border: "1px solid oklch(0.62 0.18 48 / 0.2)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Flame
                className="h-4 w-4"
                style={{ color: "oklch(0.60 0.18 45)" }}
              />
              <span
                className="font-heading font-semibold text-xs uppercase tracking-wide"
                style={{ color: "oklch(0.48 0.15 40)" }}
              >
                {labels.occasions}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {occasions.map((occ) => (
                <span
                  key={occ}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-heading"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.12)",
                    color: "oklch(0.45 0.14 40)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.25)",
                  }}
                >
                  {occ}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
