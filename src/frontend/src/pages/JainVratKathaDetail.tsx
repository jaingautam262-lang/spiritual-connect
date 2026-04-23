import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  Home,
  Star,
} from "lucide-react";
import { useState } from "react";
import { jainVratKathas } from "../data/jainVratKathaData";

type Lang = "hi" | "en";

export default function JainVratKathaDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const [lang, setLang] = useState<Lang>("hi");

  const index = jainVratKathas.findIndex((k) => k.id === id);
  const katha = jainVratKathas[index];
  const prev = index > 0 ? jainVratKathas[index - 1] : null;
  const next =
    index < jainVratKathas.length - 1 ? jainVratKathas[index + 1] : null;

  if (!katha) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-20">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-lg font-semibold text-foreground mb-2">
            कथा नहीं मिली
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Katha not found for id: {id}
          </p>
          <Link to="/jain-vrat-kathas">
            <Button variant="outline" size="sm">
              ← जैन व्रत कथाएं
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const storyText = lang === "hi" ? katha.fullTextHi : katha.fullTextEn;
  const hasStory = !!storyText;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 22) 0%, oklch(0.24 0.08 40) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-xs mb-6 flex-wrap"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
            >
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight
              className="w-3 h-3"
              style={{ color: "oklch(0.78 0.14 75 / 0.4)" }}
            />
            <Link
              to="/jain-vrat-kathas"
              className="hover:opacity-80 transition-opacity"
              style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
            >
              जैन व्रत कथाएं
            </Link>
            <ChevronRight
              className="w-3 h-3"
              style={{ color: "oklch(0.78 0.14 75 / 0.4)" }}
            />
            <span
              className="truncate max-w-[160px]"
              style={{ color: "oklch(0.88 0.06 75)" }}
            >
              {katha.titleHi}
            </span>
          </nav>

          {/* Title */}
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
              style={{
                background: "oklch(0.78 0.14 75 / 0.15)",
                color: "oklch(0.78 0.14 75)",
              }}
            >
              {katha.number}
            </div>
            <div>
              <Badge
                variant="outline"
                className="text-[10px] mb-2"
                style={{
                  borderColor: "oklch(0.78 0.14 75 / 0.4)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                {katha.category}
              </Badge>
              <h1
                className="text-2xl md:text-3xl font-bold leading-tight"
                style={{ color: "oklch(0.88 0.08 75)" }}
              >
                {katha.titleHi}
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "oklch(0.78 0.14 75 / 0.65)" }}
              >
                {katha.titleEn}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div
            className="flex flex-wrap gap-4 mt-5 text-xs"
            style={{ color: "oklch(0.78 0.14 75 / 0.6)" }}
          >
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {katha.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />{" "}
              {lang === "hi"
                ? `कथा ${katha.number} / ${jainVratKathas.length}`
                : `Katha ${katha.number} of ${jainVratKathas.length}`}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Language Toggle */}
        <div
          className="flex gap-2 p-1 rounded-xl w-fit"
          style={{ background: "oklch(0.78 0.14 75 / 0.08)" }}
        >
          <button
            type="button"
            onClick={() => setLang("hi")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              lang === "hi"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="jain-vrat-detail.lang_hi"
          >
            हिंदी
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              lang === "en"
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="jain-vrat-detail.lang_en"
          >
            English
          </button>
        </div>

        {/* Description */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm text-foreground leading-relaxed">
            {lang === "hi" ? katha.descriptionHi : katha.descriptionEn}
          </p>
        </div>

        {/* Story Section */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div
            className="px-5 py-3 border-b border-border flex items-center gap-2"
            style={{ background: "oklch(0.78 0.14 75 / 0.06)" }}
          >
            <BookOpen
              className="w-4 h-4"
              style={{ color: "oklch(0.65 0.15 55)" }}
            />
            <h2 className="font-semibold text-sm text-foreground">
              {lang === "hi" ? "व्रत कथा" : "Vrat Katha"}
            </h2>
          </div>
          <div className="p-5">
            {hasStory ? (
              <div className="space-y-3">
                {storyText.split("\n").map((line) => {
                  if (!line.trim()) return null;
                  const isVerse =
                    line.includes("॥") ||
                    line.includes("||") ||
                    line.startsWith("नमो");
                  return (
                    <p
                      key={line.substring(0, 40)}
                      className={`text-sm leading-relaxed ${
                        isVerse
                          ? "font-medium text-center italic"
                          : "text-foreground"
                      }`}
                      style={
                        isVerse ? { color: "oklch(0.65 0.15 55)" } : undefined
                      }
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center py-10 gap-3 text-center">
                <span className="text-4xl">📿</span>
                <p className="text-sm font-medium text-muted-foreground">
                  {lang === "hi"
                    ? "पूर्ण कथा शीघ्र आएगी"
                    : "Full story coming soon"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {lang === "hi"
                    ? "यह कथा संग्रह में जोड़ी जा रही है।"
                    : "This story is being added to the collection."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Vrat Vidhi */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div
            className="px-5 py-3 border-b border-border flex items-center gap-2"
            style={{ background: "oklch(0.78 0.14 75 / 0.06)" }}
          >
            <Calendar
              className="w-4 h-4"
              style={{ color: "oklch(0.65 0.15 55)" }}
            />
            <h2 className="font-semibold text-sm text-foreground">
              {lang === "hi" ? "व्रत विधि" : "Vrat Vidhi (Procedure)"}
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-2">
              {(lang === "hi" ? katha.vratVidhiHi : katha.vratVidhiEn)
                .split("।")
                .filter(Boolean)
                .map((step, i) => (
                  <div key={step.substring(0, 30)} className="flex gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full text-xs flex items-center justify-center flex-shrink-0 font-semibold"
                      style={{
                        background: "oklch(0.78 0.14 75 / 0.12)",
                        color: "oklch(0.65 0.15 55)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">
                      {step.trim()}।
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Mantra */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div
            className="px-5 py-3 border-b border-border flex items-center gap-2"
            style={{ background: "oklch(0.78 0.14 75 / 0.06)" }}
          >
            <Star
              className="w-4 h-4"
              style={{ color: "oklch(0.65 0.15 55)" }}
            />
            <h2 className="font-semibold text-sm text-foreground">
              {lang === "hi" ? "व्रत मंत्र" : "Vrat Mantra"}
            </h2>
          </div>
          <div className="p-5">
            <div
              className="rounded-xl p-4 text-center border"
              style={{
                background: "oklch(0.78 0.14 75 / 0.06)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <p
                className="text-base font-semibold leading-relaxed"
                style={{ color: "oklch(0.65 0.15 55)" }}
              >
                {katha.mantraHi}
              </p>
            </div>
            {lang === "en" && katha.mantraEn && (
              <div className="mt-3 rounded-lg p-3 bg-muted/40 border border-border">
                <p className="text-sm text-muted-foreground italic">
                  {katha.mantraEn}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Phala (Benefits) */}
        <section className="bg-card border border-border rounded-2xl overflow-hidden">
          <div
            className="px-5 py-3 border-b border-border flex items-center gap-2"
            style={{ background: "oklch(0.78 0.14 75 / 0.06)" }}
          >
            <Star
              className="w-4 h-4"
              style={{ color: "oklch(0.65 0.15 55)" }}
            />
            <h2 className="font-semibold text-sm text-foreground">
              {lang === "hi" ? "व्रत का फल" : "Benefits of the Vrat"}
            </h2>
          </div>
          <div className="p-5">
            <div
              className="rounded-xl p-4 border flex gap-3"
              style={{
                background: "oklch(0.78 0.14 75 / 0.06)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <span className="text-2xl flex-shrink-0">🌟</span>
              <p className="text-sm text-foreground leading-relaxed">
                {lang === "hi" ? katha.phalaHi : katha.phalaEn}
              </p>
            </div>
          </div>
        </section>

        {/* Prev / Next Navigation */}
        <div className="flex items-center gap-3 pt-2">
          {prev ? (
            <Link
              to="/jain-vrat-katha-detail/$id"
              params={{ id: prev.id }}
              className="flex-1"
              data-ocid="jain-vrat-detail.prev_button"
            >
              <Button
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-3 px-4"
              >
                <ArrowLeft className="w-4 h-4 flex-shrink-0" />
                <span className="text-left min-w-0">
                  <span className="block text-xs text-muted-foreground">
                    {lang === "hi" ? "पिछली कथा" : "Previous Katha"}
                  </span>
                  <span className="block text-sm font-medium truncate">
                    {prev.titleHi}
                  </span>
                </span>
              </Button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {next ? (
            <Link
              to="/jain-vrat-katha-detail/$id"
              params={{ id: next.id }}
              className="flex-1"
              data-ocid="jain-vrat-detail.next_button"
            >
              <Button
                variant="outline"
                className="w-full justify-end gap-2 h-auto py-3 px-4"
              >
                <span className="text-right min-w-0">
                  <span className="block text-xs text-muted-foreground">
                    {lang === "hi" ? "अगली कथा" : "Next Katha"}
                  </span>
                  <span className="block text-sm font-medium truncate">
                    {next.titleHi}
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Button>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Back Link */}
        <div className="text-center pt-2 pb-6">
          <Link to="/jain-vrat-kathas" data-ocid="jain-vrat-detail.back_link">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              {lang === "hi" ? "सभी जैन व्रत कथाएं" : "All Jain Vrat Kathas"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
