import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { jainOriginalAartis } from "../data/jainOriginalAartis";

const CARD_BG = "oklch(0.20 0.07 22)";
const BORDER = "oklch(0.78 0.14 75 / 0.2)";
const GOLD = "oklch(0.78 0.14 75)";
const SAFFRON = "oklch(0.68 0.20 48)";
const MUTED = "oklch(0.65 0.04 55)";

function AartiCard({ aarti }: { aarti: (typeof jainOriginalAartis)[number] }) {
  const [expanded, setExpanded] = useState(false);
  const [lang, setLang] = useState<
    "devanagari" | "roman" | "hindi" | "english"
  >("devanagari");

  const scriptBadge =
    aarti.originalScript === "Sanskrit"
      ? {
          bg: "oklch(0.55 0.18 260 / 0.2)",
          color: "oklch(0.75 0.12 260)",
          border: "oklch(0.55 0.18 260 / 0.3)",
        }
      : aarti.originalScript === "Apabhramsha"
        ? {
            bg: "oklch(0.55 0.18 145 / 0.2)",
            color: "oklch(0.72 0.12 145)",
            border: "oklch(0.55 0.18 145 / 0.3)",
          }
        : {
            bg: "oklch(0.68 0.20 48 / 0.2)",
            color: "oklch(0.85 0.12 60)",
            border: "oklch(0.68 0.20 48 / 0.3)",
          };

  const displayText = (() => {
    if (lang === "devanagari") return aarti.text;
    if (lang === "roman") return aarti.textRoman;
    if (lang === "hindi") return aarti.meaningHindi;
    return aarti.meaningEnglish;
  })();

  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all duration-200"
      style={{ background: CARD_BG, borderColor: BORDER }}
      data-ocid={`jain_aarti.card.${aarti.id}`}
    >
      {/* Header */}
      <div
        className="px-5 pt-5 pb-4"
        style={{
          background: "oklch(0.22 0.08 22)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg"
            style={{
              background: `${SAFFRON}22`,
              border: `1.5px solid ${SAFFRON}55`,
            }}
          >
            🕉️
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className="font-decorative text-lg font-bold leading-tight"
              style={{ color: GOLD }}
            >
              {aarti.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: MUTED }}>
              {aarti.deity}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            style={{
              background: scriptBadge.bg,
              color: scriptBadge.color,
              border: `1px solid ${scriptBadge.border}`,
            }}
          >
            {aarti.originalScript}
          </Badge>
          <Badge
            style={{
              background: "oklch(0.55 0.15 200 / 0.2)",
              color: "oklch(0.75 0.10 200)",
              border: "1px solid oklch(0.55 0.15 200 / 0.3)",
            }}
          >
            Jain
          </Badge>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="flex border-b" style={{ borderColor: BORDER }}>
        {(["devanagari", "roman", "hindi", "english"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setLang(tab)}
            className="flex-1 py-2 text-[11px] font-heading font-semibold uppercase tracking-wide transition-all"
            style={{
              background: lang === tab ? `${SAFFRON}22` : "transparent",
              color: lang === tab ? GOLD : MUTED,
              borderBottom:
                lang === tab ? `2px solid ${SAFFRON}` : "2px solid transparent",
            }}
            data-ocid={`jain_aarti.lang_tab.${tab}`}
          >
            {tab === "devanagari"
              ? "देवनागरी"
              : tab === "roman"
                ? "Roman"
                : tab === "hindi"
                  ? "हिंदी"
                  : "English"}
          </button>
        ))}
      </div>

      {/* Text Content */}
      <div className="p-5">
        <div
          className="rounded-xl p-4 mb-4 leading-relaxed"
          style={{
            background: "oklch(0.17 0.06 20)",
            border: `1px solid ${BORDER}`,
          }}
        >
          <pre
            className="whitespace-pre-wrap text-sm font-body"
            style={{
              color:
                lang === "devanagari"
                  ? "oklch(0.90 0.06 75)"
                  : "oklch(0.80 0.04 65)",
              fontFamily:
                lang === "devanagari"
                  ? "'Noto Sans Devanagari', serif"
                  : "inherit",
              lineHeight: "1.9",
              maxHeight: expanded ? "none" : "14rem",
              overflow: expanded ? "visible" : "hidden",
            }}
          >
            {displayText}
          </pre>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full py-2 text-xs font-heading font-semibold rounded-lg transition-all"
          style={{
            background: `${SAFFRON}18`,
            color: GOLD,
            border: `1px solid ${BORDER}`,
          }}
          data-ocid={`jain_aarti.expand_button.${aarti.id}`}
        >
          {expanded ? "▲ Show Less" : "▼ Read Full Text"}
        </button>
      </div>
    </div>
  );
}

export default function JainOriginalAartiPage() {
  const [search, setSearch] = useState("");

  const filtered = jainOriginalAartis.filter(
    (a) =>
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.deity.toLowerCase().includes(search.toLowerCase()) ||
      a.originalScript.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 20)" }}>
      {/* Hero */}
      <div
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.16 0.06 20) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-4xl mb-3">🕉️</div>
          <h1
            className="font-decorative text-3xl md:text-4xl font-bold mb-2"
            style={{ color: GOLD }}
          >
            जैन आरती — मूल भाषा में
          </h1>
          <p
            className="text-base mb-1"
            style={{ color: "oklch(0.88 0.06 75)" }}
          >
            Jain Aartis in Original Script
          </p>
          <p
            className="text-sm max-w-2xl mx-auto mb-8"
            style={{ color: MUTED }}
          >
            Authentic Jain devotional hymns in original Prakrit, Sanskrit &amp;
            Apabhramsha — with Roman transliteration, Hindi &amp; English
            meaning.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: MUTED }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, deity, or script..."
              className="pl-10"
              style={{
                background: "oklch(0.22 0.07 22)",
                borderColor: "oklch(0.78 0.14 75 / 0.2)",
                color: "oklch(0.90 0.04 70)",
              }}
              data-ocid="jain_aarti.search_input"
            />
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div
        className="py-4 px-4"
        style={{
          background: "oklch(0.55 0.15 200 / 0.12)",
          borderBottom: "1px solid oklch(0.55 0.15 200 / 0.2)",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <p
            className="text-xs text-center"
            style={{ color: "oklch(0.72 0.10 200)" }}
          >
            📿 जैन आरतियाँ मूल प्राकृत / अपभ्रंश / संस्कृत भाषा में प्रस्तुत की गई हैं। प्रत्येक
            आरती को देवनागरी, रोमन लिप्यंतरण, हिंदी अर्थ और अंग्रेजी अर्थ में देखें।
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto max-w-4xl px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="jain_aarti.empty_state">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg" style={{ color: MUTED }}>
              No aartis found
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            data-ocid="jain_aarti.list"
          >
            {filtered.map((aarti) => (
              <AartiCard key={aarti.id} aarti={aarti} />
            ))}
          </div>
        )}

        {/* Note */}
        <div
          className="mt-10 rounded-xl p-5 text-center"
          style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
        >
          <p className="text-sm" style={{ color: MUTED }}>
            🙏 ये आरतियाँ जैन परम्परा की पवित्र धरोहर हैं। अधिक जैन साहित्य के लिए &nbsp;
            <a
              href="/jain-stotra-sangrah"
              className="underline"
              style={{ color: GOLD }}
            >
              जैन स्तोत्र संग्रह
            </a>
            &nbsp;और&nbsp;
            <a href="/jain-pujan" className="underline" style={{ color: GOLD }}>
              जैन पूजन
            </a>
            &nbsp;देखें।
          </p>
        </div>
      </div>
    </div>
  );
}
