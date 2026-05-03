import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  Heart,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  DAAN_FAITH_TABS,
  DAAN_SEVA_DATA,
  type DaanFaith,
  type DaanSevaEntry,
} from "../data/daanSevaData";

const FAITH_BADGE: Record<DaanFaith, string> = {
  Hindu: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Jain: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Sikh: "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

function DaanCard({ entry }: { entry: DaanSevaEntry }) {
  const [expanded, setExpanded] = useState(false);
  const { language } = useLanguage();
  const t = (hi: string, en: string) => (language === "hi" ? hi : en);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all"
      style={{
        background: "oklch(0.18 0.05 30 / 0.9)",
        borderColor: "oklch(0.75 0.14 75 / 0.15)",
      }}
      data-ocid={`daan.card.${entry.id}`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className="text-3xl flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl"
            style={{ background: "oklch(0.25 0.08 40 / 0.8)" }}
          >
            {entry.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground text-base">
                {entry.name}
              </h3>
              <Badge className={`text-xs border ${FAITH_BADGE[entry.faith]}`}>
                {entry.faith}
              </Badge>
            </div>
            <p className="text-sm text-amber-300/70 mb-2">{entry.nameHindi}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {entry.significance}
            </p>

            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 text-amber-400" />
              <span className="line-clamp-1">{entry.tithi_occasion}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-amber-300/80 mt-4 hover:text-amber-300 transition-colors"
          onClick={() => setExpanded(!expanded)}
          data-ocid={`daan.expand_button.${entry.id}`}
        >
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
          {expanded
            ? t("कम दिखाएं", "Show less")
            : t("विस्तार से जानें", "Learn more")}
        </button>
      </div>

      {expanded && (
        <div
          className="px-5 pb-5 space-y-4 border-t"
          style={{ borderColor: "oklch(0.75 0.14 75 / 0.1)" }}
        >
          {/* Benefits */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-foreground">
                {t("लाभ", "Benefits")}
              </span>
            </div>
            <ul className="space-y-1.5">
              {entry.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* How to perform */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-foreground">
                {t("कैसे करें", "How to Perform")}
              </span>
            </div>
            <ol className="space-y-2">
              {entry.how_to_perform.map((step, idx) => (
                <li
                  key={step}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "oklch(0.72 0.18 55 / 0.25)",
                      color: "oklch(0.90 0.15 75)",
                    }}
                  >
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Scripture ref */}
          {entry.scripturalRef && (
            <div
              className="rounded-lg p-3 flex items-start gap-2"
              style={{ background: "oklch(0.20 0.06 30 / 0.6)" }}
            >
              <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground italic">
                {entry.scripturalRef}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DaanSeva() {
  const { language } = useLanguage();
  const [tab, setTab] = useState<DaanFaith | "All">("All");
  const t = (hi: string, en: string) => (language === "hi" ? hi : en);

  const filtered =
    tab === "All"
      ? DAAN_SEVA_DATA
      : DAAN_SEVA_DATA.filter((d) => d.faith === tab);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.04 30)" }}>
      {/* Hero */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 40 / 0.9) 0%, oklch(0.14 0.06 30) 100%)",
        }}
      >
        <div className="text-5xl mb-3">🙏</div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {t("दान और सेवा", "Daan & Seva")}
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-4">
          {t(
            "हिंदू, जैन और सिख परंपराओं में दान और सेवा के प्रकार, महत्व और विधि",
            "Types, significance and methods of charity and service in Hindu, Jain and Sikh traditions",
          )}
        </p>
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mt-6">
          <div className="text-center">
            <p className="text-xl font-bold text-amber-400">10</p>
            <p className="text-xs text-muted-foreground">
              {t("हिंदू दान", "Hindu Daan")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-purple-400">4</p>
            <p className="text-xs text-muted-foreground">
              {t("जैन दान", "Jain Dana")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-blue-400">4</p>
            <p className="text-xs text-muted-foreground">
              {t("सिख सेवा", "Sikh Seva")}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Tabs value={tab} onValueChange={(v) => setTab(v as DaanFaith | "All")}>
          <TabsList
            className="flex flex-wrap gap-1 h-auto p-1 mb-6"
            style={{ background: "oklch(0.18 0.05 30 / 0.8)" }}
          >
            {DAAN_FAITH_TABS.map((ft) => (
              <TabsTrigger
                key={ft.value}
                value={ft.value}
                className="flex items-center gap-1.5 text-xs"
                data-ocid={`daan.tab.${ft.value.toLowerCase()}`}
              >
                {ft.emoji}{" "}
                {t(
                  ft.label.split(" / ")[0],
                  ft.label.split(" / ")[1] || ft.label,
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {DAAN_FAITH_TABS.map((ft) => (
            <TabsContent key={ft.value} value={ft.value}>
              {filtered.length === 0 ? (
                <div className="text-center py-16" data-ocid="daan.empty_state">
                  <div className="text-4xl mb-3">🙏</div>
                  <p className="text-muted-foreground">
                    {t("कोई परिणाम नहीं", "No entries found")}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filtered.map((entry) => (
                    <DaanCard key={entry.id} entry={entry} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Inspirational quote */}
        <div
          className="mt-10 rounded-xl p-6 text-center border"
          style={{
            background: "oklch(0.18 0.06 35 / 0.6)",
            borderColor: "oklch(0.75 0.14 75 / 0.15)",
          }}
        >
          <div className="text-3xl mb-3">🌟</div>
          <blockquote className="text-base font-medium text-foreground italic mb-2">
            {t(
              '"दान देने से धन कम नहीं होता, बल्कि बढ़ता है।"',
              '"Charity does not diminish wealth — it multiplies it."',
            )}
          </blockquote>
          <p className="text-xs text-muted-foreground">
            {t("— विष्णु पुराण", "— Vishnu Purana")}
          </p>
        </div>
      </div>
    </div>
  );
}
