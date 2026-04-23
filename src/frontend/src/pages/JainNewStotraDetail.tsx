import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle, Clock, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  type JainNewStotra,
  jainNewStotraData,
} from "../data/jainNewStotraData";

function YantraGrid({ grid }: { grid: { value: string }[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-collapse" aria-label="Yantra Grid">
        <tbody>
          {grid.map((row) => (
            <tr key={row.map((c) => c.value).join("-")}>
              {row.map((cell) => (
                <td
                  key={cell.value}
                  className="w-16 h-16 text-center text-xs font-mono border align-middle"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.4)",
                    background: "oklch(0.22 0.06 45)",
                    color: "oklch(0.88 0.12 75)",
                  }}
                >
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TijaypahutatView({ stotra }: { stotra: JainNewStotra }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {stotra.verses.map((verse) => (
          <Card
            key={verse.number}
            className="p-5 border-border bg-card"
            data-ocid={`stotra-detail.verse.${verse.number}`}
          >
            <div className="flex gap-3 mb-3">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 h-5 flex items-center"
                style={{
                  background: "oklch(0.62 0.18 48 / 0.15)",
                  color: "oklch(0.62 0.18 48)",
                }}
              >
                {verse.number}
              </span>
            </div>
            <p
              className="text-foreground text-base leading-loose whitespace-pre-line font-body mb-3"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              {verse.text}
            </p>
            {verse.meaning && (
              <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 italic">
                {verse.meaning}
              </p>
            )}
          </Card>
        ))}
      </div>

      {stotra.yantraGrid && (
        <div className="mt-8">
          <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-2xl">🔮</span> यंत्र मंडल (5×5)
          </h3>
          <Card
            className="p-6 border-border bg-card"
            data-ocid="stotra-detail.yantra.grid"
          >
            <YantraGrid grid={stotra.yantraGrid} />
            <p className="text-xs text-muted-foreground text-center mt-4">
              यह यंत्र मंडल 70 तीर्थंकरों का प्रतीक है — तीनों क्षेत्रों के जिनेंद्र भगवान
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}

function VajrapanjaraView({ stotra }: { stotra: JainNewStotra }) {
  return (
    <div className="space-y-4">
      {stotra.verses.map((verse) => (
        <Card
          key={verse.number}
          className="p-5 border-border bg-card"
          data-ocid={`stotra-detail.verse.${verse.number}`}
        >
          <div className="flex gap-3 items-start">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-1"
              style={{
                background: "oklch(0.62 0.18 48 / 0.15)",
                color: "oklch(0.62 0.18 48)",
              }}
            >
              {verse.number}
            </span>
            <div className="flex-1">
              <p
                className="text-foreground text-base leading-loose whitespace-pre-line font-body mb-2"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                {verse.text}
              </p>
              {verse.meaning && (
                <p className="text-sm text-muted-foreground leading-relaxed italic border-t border-border pt-2">
                  {verse.meaning}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function MangalastakView({ stotra }: { stotra: JainNewStotra }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stotra.verses.map((verse) => (
        <Card
          key={verse.number}
          className="p-5 border-border bg-card"
          data-ocid={`stotra-detail.verse.${verse.number}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.62 0.18 48 / 0.15)",
                color: "oklch(0.62 0.18 48)",
              }}
            >
              {verse.number}
            </span>
          </div>
          <p
            className="text-sm text-foreground leading-loose whitespace-pre-line mb-3"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            {verse.text}
          </p>
          {verse.meaning && (
            <p className="text-xs text-muted-foreground leading-relaxed italic border-t border-border pt-2">
              {verse.meaning}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}

function AradhanaView({ stotra }: { stotra: JainNewStotra }) {
  return (
    <div className="space-y-4">
      {stotra.verses.map((verse) => (
        <Card
          key={verse.number}
          className="p-5 border-border bg-card"
          data-ocid={`stotra-detail.verse.${verse.number}`}
        >
          <div className="flex gap-3 items-start">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-1"
              style={{
                background: "oklch(0.62 0.18 48 / 0.15)",
                color: "oklch(0.62 0.18 48)",
              }}
            >
              {verse.number}
            </span>
            <div className="flex-1">
              <p
                className="text-foreground text-base leading-loose whitespace-pre-line mb-2"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                {verse.text}
              </p>
              {verse.meaning && (
                <p className="text-sm text-muted-foreground leading-relaxed italic border-t border-border pt-2">
                  अर्थ: {verse.meaning}
                </p>
              )}
              {verse.benefit && (
                <div className="flex items-start gap-2 mt-2 pt-2 border-t border-border">
                  <CheckCircle
                    className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                    style={{ color: "oklch(0.62 0.18 48)" }}
                  />
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.62 0.18 48)" }}
                  >
                    {verse.benefit}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
      {stotra.closingMantra && (
        <Card
          className="p-5 border-primary/30 text-center"
          style={{ background: "oklch(0.62 0.18 48 / 0.08)" }}
        >
          <p className="text-sm text-muted-foreground mb-2">मुख्य मंत्र</p>
          <p
            className="text-lg font-bold text-foreground"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            {stotra.closingMantra}
          </p>
        </Card>
      )}
    </div>
  );
}

function ParasIktisaView({ stotra }: { stotra: JainNewStotra }) {
  return (
    <div className="space-y-3">
      {stotra.verses.map((verse) => (
        <div
          key={verse.number}
          className="flex gap-3 py-3 border-b border-border/50 last:border-0"
          data-ocid={`stotra-detail.verse.${verse.number}`}
        >
          <span
            className="text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "oklch(0.62 0.18 48 / 0.15)",
              color: "oklch(0.62 0.18 48)",
            }}
          >
            {verse.number}
          </span>
          <p
            className="text-sm text-foreground leading-loose whitespace-pre-line"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            {verse.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function GenericView({ stotra }: { stotra: JainNewStotra }) {
  return (
    <div className="space-y-4">
      {stotra.verses.map((verse) => (
        <Card
          key={verse.number}
          className="p-5 border-border bg-card"
          data-ocid={`stotra-detail.verse.${verse.number}`}
        >
          <div className="flex gap-3 items-start">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-1"
              style={{
                background: "oklch(0.62 0.18 48 / 0.15)",
                color: "oklch(0.62 0.18 48)",
              }}
            >
              {verse.number}
            </span>
            <div className="flex-1">
              <p
                className="text-foreground text-base leading-loose whitespace-pre-line"
                style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
              >
                {verse.text}
              </p>
              {verse.meaning && (
                <p className="text-sm text-muted-foreground leading-relaxed italic mt-2 border-t border-border pt-2">
                  {verse.meaning}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function renderContent(stotra: JainNewStotra) {
  if (stotra.id === "tijaypahutt-stotra")
    return <TijaypahutatView stotra={stotra} />;
  if (stotra.id === "vajrapanjara-stotra")
    return <VajrapanjaraView stotra={stotra} />;
  if (stotra.id === "mangalashtak-stotra")
    return <MangalastakView stotra={stotra} />;
  if (stotra.id === "aradhana-stotra") return <AradhanaView stotra={stotra} />;
  if (stotra.id === "paras-iktisa-bhajan")
    return <ParasIktisaView stotra={stotra} />;
  if (stotra.id === "nakoda-bhairav-prarthana")
    return <GenericView stotra={stotra} />;
  if (stotra.id === "padmavati-mantra-stotra")
    return <VajrapanjaraView stotra={stotra} />;
  return null;
}

export default function JainNewStotraDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const stotra = jainNewStotraData.find((s) => s.id === id);

  const handleCopy = () => {
    if (!stotra) return;
    const text = stotra.verses
      .map((v) => `${v.number}. ${v.text}`)
      .join("\n\n");
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("स्तोत्र कॉपी किया गया।"));
  };

  const handleShare = () => {
    if (navigator.share && stotra) {
      navigator.share({ title: stotra.title, url: window.location.href });
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("लिंक कॉपी किया गया।"));
    }
  };

  if (!stotra) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            स्तोत्र नहीं मिला
          </h2>
          <p className="text-muted-foreground mb-4">यह स्तोत्र उपलब्ध नहीं है।</p>
          <Link to="/jain-stotra-sangrah">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" /> वापस जाएं
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isComingSoon = stotra.status === "coming-soon";

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">
            होम
          </Link>
          <span>/</span>
          <Link
            to="/jain-stotra-sangrah"
            className="hover:text-foreground transition-colors"
          >
            जैन स्तोत्र संग्रह
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{stotra.title}</span>
        </div>
      </div>

      {/* Hero */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 35), oklch(0.22 0.08 45), oklch(0.18 0.05 30))",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
            <Badge variant="secondary">{stotra.language}</Badge>
            {isComingSoon && (
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" /> शीघ्र आ रहा है
              </Badge>
            )}
          </div>
          <h1
            className="text-3xl md:text-5xl font-display font-bold mb-3"
            style={{ color: "oklch(0.88 0.12 75)" }}
            data-ocid="stotra-detail.hero.title"
          >
            {stotra.title}
          </h1>
          {stotra.intro && (
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              {stotra.intro}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Description + Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {stotra.description && (
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {stotra.description}
            </p>
          )}
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={isComingSoon}
              data-ocid="stotra-detail.copy.button"
            >
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              कॉपी करें
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              data-ocid="stotra-detail.share.button"
            >
              शेयर करें
            </Button>
          </div>
        </div>

        {/* Content */}
        {isComingSoon ? (
          <Card
            className="p-10 text-center border-border bg-card"
            data-ocid="stotra-detail.coming-soon"
          >
            <div className="text-5xl mb-4">📜</div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              {stotra.title}
            </h3>
            <p className="text-muted-foreground mb-4">{stotra.description}</p>
            <Badge variant="secondary" className="gap-1.5">
              <Clock className="h-3 w-3" /> शीघ्र उपलब्ध होगा
            </Badge>
          </Card>
        ) : (
          renderContent(stotra)
        )}

        {/* Back Link */}
        <div className="mt-10 pt-6 border-t border-border">
          <Link to="/jain-stotra-sangrah" data-ocid="stotra-detail.back.link">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              जैन स्तोत्र संग्रह पर वापस जाएं
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
