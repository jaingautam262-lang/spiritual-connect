import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TEMPLES_DATA } from "@/data/temples-data";
import { useLanguage } from "@/hooks/useLanguage";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin, Phone, Star } from "lucide-react";

const FAITH_COLORS: Record<
  string,
  { bg: string; text: string; border: string; accent: string }
> = {
  Hindu: {
    bg: "oklch(0.68 0.20 48 / 0.12)",
    text: "oklch(0.72 0.18 48)",
    border: "oklch(0.68 0.20 48 / 0.35)",
    accent: "oklch(0.68 0.20 48)",
  },
  Jain: {
    bg: "oklch(0.55 0.18 145 / 0.12)",
    text: "oklch(0.55 0.16 145)",
    border: "oklch(0.55 0.18 145 / 0.35)",
    accent: "oklch(0.55 0.18 145)",
  },
  Sikh: {
    bg: "oklch(0.45 0.15 250 / 0.12)",
    text: "oklch(0.60 0.16 250)",
    border: "oklch(0.45 0.15 250 / 0.35)",
    accent: "oklch(0.55 0.18 250)",
  },
};

const FAITH_ICONS: Record<string, string> = {
  Hindu: "🛕",
  Jain: "☸️",
  Sikh: "🪯",
};

const SPECIAL_TAGS = [
  "Jyotirlinga",
  "Char Dham",
  "Shakti Peetha",
  "Panch Tirth",
  "Takht",
  "Akal Takht",
  "UNESCO",
  "Divya Desam",
];

export default function TempleDetail() {
  const { language } = useLanguage();
  const params = useParams({ strict: false }) as { id?: string };
  const temple = TEMPLES_DATA.find((t) => t.id === (params.id ?? ""));

  if (!temple) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: "oklch(0.14 0.05 22)" }}
      >
        <div className="text-6xl">🛕</div>
        <h2
          className="font-display text-2xl font-bold"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Temple not found
        </h2>
        <Link to="/temples">
          <Button
            variant="outline"
            style={{
              borderColor: "oklch(0.78 0.14 75 / 0.3)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const style = FAITH_COLORS[temple.faith] ?? FAITH_COLORS.Hindu;
  const specialTag = temple.benefits.find((t) =>
    SPECIAL_TAGS.some((s) => t.includes(s)),
  );

  // nearby temples — same faith, different id, max 4
  const nearby = TEMPLES_DATA.filter(
    (t) => t.faith === temple.faith && t.id !== temple.id,
  ).slice(0, 4);

  const isHindi = language === "hi";

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero banner */}
      <section
        className="relative py-14 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 30) 0%, oklch(0.26 0.10 50) 50%, oklch(0.20 0.08 30) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto relative z-10">
          {/* Back link */}
          <Link
            to="/temples"
            data-ocid="temple-detail.back_button"
            className="inline-flex items-center gap-2 text-sm mb-6 hover:underline transition-colors"
            style={{ color: "oklch(0.65 0.06 60)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            {isHindi ? "मंदिर निर्देशिका" : "Temple Directory"}
          </Link>

          {/* Main header */}
          <div className="flex items-start gap-5 flex-col sm:flex-row">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0"
              style={{
                background: style.bg,
                border: `1px solid ${style.border}`,
              }}
            >
              {FAITH_ICONS[temple.faith] ?? "🛕"}
            </div>
            <div className="min-w-0">
              <h1
                className="font-display text-3xl md:text-4xl font-bold mb-1 leading-tight"
                style={{ color: "oklch(0.78 0.14 75)" }}
                data-ocid="temple-detail.name"
              >
                {temple.name}
              </h1>
              {temple.nameHindi && (
                <p
                  className="text-xl mb-3"
                  style={{ color: "oklch(0.82 0.08 65)", fontFamily: "serif" }}
                >
                  {temple.nameHindi}
                </p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center gap-1 text-sm"
                  style={{ color: "oklch(0.60 0.04 55)" }}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {temple.city}
                  {temple.state ? `, ${temple.state}` : ""}
                </span>
                <Badge
                  className="text-xs"
                  style={{
                    background: style.bg,
                    color: style.text,
                    border: `1px solid ${style.border}`,
                  }}
                >
                  {temple.faith}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    borderColor: "oklch(0.68 0.20 48 / 0.35)",
                    color: "oklch(0.68 0.20 48)",
                  }}
                >
                  {temple.deity}
                </Badge>
                {specialTag && (
                  <span
                    className="inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.78 0.14 75 / 0.15)",
                      color: "oklch(0.78 0.14 75)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.30)",
                    }}
                  >
                    <Star className="h-2.5 w-2.5 fill-current" />
                    {specialTag}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* History & Significance */}
              <div
                className="p-6 rounded-2xl border"
                style={{
                  background: "oklch(0.20 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <h2
                  className="font-display text-lg font-semibold mb-4"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {isHindi ? "इतिहास एवं महत्व" : "History & Significance"}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.80 0.04 65)" }}
                >
                  {temple.shortDescription}
                </p>
              </div>

              {/* Tags */}
              {temple.benefits.length > 0 && (
                <div
                  className="p-5 rounded-2xl border"
                  style={{
                    background: "oklch(0.20 0.07 24)",
                    borderColor: "oklch(0.78 0.14 75 / 0.12)",
                  }}
                >
                  <h2
                    className="font-semibold text-sm mb-3"
                    style={{ color: "oklch(0.60 0.04 60)" }}
                  >
                    {isHindi ? "विशेषताएं" : "Highlights & Tags"}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {temple.benefits.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: style.bg,
                          color: style.text,
                          border: `1px solid ${style.border}`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby same-faith */}
              {nearby.length > 0 && (
                <div>
                  <h2
                    className="font-display text-base font-semibold mb-4"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {isHindi
                      ? `अन्य ${temple.faith === "Sikh" ? "गुरुद्वारे" : "मंदिर"}`
                      : `More ${temple.faith} ${temple.faith === "Sikh" ? "Gurdwaras" : "Temples"}`}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nearby.map((t, idx) => {
                      const nStyle =
                        FAITH_COLORS[t.faith] ?? FAITH_COLORS.Hindu;
                      return (
                        <a
                          key={t.id}
                          href={`/temples/${t.id}`}
                          data-ocid={`temple-detail.nearby.item.${idx + 1}`}
                          className="flex items-start gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02]"
                          style={{
                            background: "oklch(0.20 0.07 24)",
                            borderColor: "oklch(0.78 0.14 75 / 0.10)",
                            textDecoration: "none",
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                            style={{
                              background: nStyle.bg,
                              border: `1px solid ${nStyle.border}`,
                            }}
                          >
                            {FAITH_ICONS[t.faith]}
                          </div>
                          <div className="min-w-0">
                            <p
                              className="text-xs font-semibold leading-tight line-clamp-1"
                              style={{ color: "oklch(0.85 0.06 70)" }}
                            >
                              {t.name}
                            </p>
                            <p
                              className="text-[10px] mt-0.5 truncate"
                              style={{ color: "oklch(0.56 0.04 55)" }}
                            >
                              {t.city}, {t.state}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Timings */}
              {temple.timings && (
                <div
                  className="p-5 rounded-2xl border"
                  style={{
                    background: "oklch(0.21 0.07 26)",
                    borderColor: "oklch(0.68 0.20 48 / 0.2)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock
                      className="h-4 w-4"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    />
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.68 0.20 48)" }}
                    >
                      {isHindi ? "दर्शन समय" : "Darshan Timings"}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.80 0.04 65)" }}
                  >
                    {temple.timings}
                  </p>
                </div>
              )}

              {/* Contact placeholder */}
              <div
                className="p-5 rounded-2xl border"
                style={{
                  background: "oklch(0.21 0.07 26)",
                  borderColor: "oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Phone
                    className="h-4 w-4"
                    style={{ color: "oklch(0.65 0.10 145)" }}
                  />
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: "oklch(0.65 0.10 145)" }}
                  >
                    {isHindi ? "संपर्क" : "Contact"}
                  </h3>
                </div>
                <p className="text-xs" style={{ color: "oklch(0.55 0.04 55)" }}>
                  +91 00000 00000
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "oklch(0.55 0.04 55)" }}
                >
                  {temple.city}, {temple.state}
                </p>
              </div>

              {/* Location */}
              <div
                className="p-5 rounded-2xl border"
                style={{
                  background: "oklch(0.21 0.07 26)",
                  borderColor: "oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4" style={{ color: style.accent }} />
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: style.accent }}
                  >
                    {isHindi ? "स्थान" : "Location"}
                  </h3>
                </div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "oklch(0.82 0.05 65)" }}
                >
                  {temple.city}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "oklch(0.55 0.04 55)" }}
                >
                  {temple.state}, India
                </p>
              </div>

              {/* Back CTA */}
              <Link to="/temples">
                <Button
                  data-ocid="temple-detail.back_to_directory"
                  className="w-full mt-2 text-sm font-medium"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.15)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.35)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                >
                  {isHindi ? "← सभी मंदिर" : "← All Temples"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
