import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Copy,
  Flower2,
  Share2,
} from "lucide-react";
import { useRef, useState } from "react";
import {
  aartiClosing,
  aartiNames52,
  aartiOpening,
  nagapashYantra,
  names108,
  paathSections,
  shantiPathInstructions,
  shantiPathLines,
  shantiPathPrakritVerse,
  uvasaggaharamStotra,
} from "../data/padmavatiVratKathaData";

type TabId =
  | "shanti"
  | "yantra"
  | "uvasaggaharam"
  | "paath33"
  | "names108"
  | "katha"
  | "aarti";

const TABS: { id: TabId; label: string; emoji: string }[] = [
  { id: "shanti", label: "शान्ति पाठ", emoji: "🕉️" },
  { id: "yantra", label: "नागपाश यंत्र", emoji: "🐍" },
  { id: "uvasaggaharam", label: "उवसग्गहर स्तोत्र", emoji: "📿" },
  { id: "paath33", label: "33 पाठ", emoji: "📖" },
  { id: "names108", label: "108 नाम", emoji: "🌸" },
  { id: "katha", label: "व्रत कथा", emoji: "📜" },
  { id: "aarti", label: "आरती", emoji: "🪔" },
];

// Gold accent color token for inline styles
const gold = "oklch(0.78 0.14 75)";
const goldFaint = "oklch(0.78 0.14 75 / 0.08)";
const goldBorder = "oklch(0.78 0.14 75 / 0.25)";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-base font-bold mb-3 text-center"
      style={{ color: gold }}
    >
      {children}
    </h3>
  );
}

function MantraBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-4 my-3 border text-center"
      style={{ background: goldFaint, borderColor: goldBorder }}
    >
      <p
        className="text-sm font-semibold leading-relaxed whitespace-pre-wrap"
        style={{ color: gold }}
      >
        {children}
      </p>
    </div>
  );
}

function TextBlock({ text }: { text: string }) {
  return (
    <div className="space-y-1.5">
      {text.split("\n").map((line, i) => {
        const key = `line-${i}-${line.substring(0, 16)}`;
        if (!line.trim()) return <div key={key} className="h-2" />;
        const isVerse =
          line.includes("॥") ||
          line.includes("||") ||
          line.startsWith("णमो") ||
          line.startsWith("ॐ") ||
          (line.startsWith("•") === false && line.match(/^[०-९]+\./));
        return (
          <p
            key={key}
            className={`text-sm leading-relaxed ${
              isVerse ? "text-center font-medium italic" : "text-foreground"
            }`}
            style={isVerse ? { color: gold } : undefined}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ─── SHANTI PATH TAB ────────────────────────────────────────────────────────
function ShantiPathTab() {
  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div
        className="rounded-xl p-4 border"
        style={{ background: goldFaint, borderColor: goldBorder }}
      >
        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg">📋</span>
          <h4 className="font-semibold text-sm" style={{ color: gold }}>
            पाठ विधि
          </h4>
        </div>
        <p className="text-sm text-foreground leading-relaxed">
          {shantiPathInstructions}
        </p>
      </div>

      {/* Lines */}
      <div>
        <SectionHeading>शान्ति पाठ अनुक्रम</SectionHeading>
        <div className="space-y-2">
          {shantiPathLines.map((line) => (
            <div
              key={line.code + line.text.substring(0, 12)}
              className="flex items-start gap-3 p-3 rounded-lg border"
              style={{ background: goldFaint, borderColor: goldBorder }}
            >
              <span
                className="w-9 h-6 rounded text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "oklch(0.68 0.24 61 / 0.2)",
                  color: gold,
                }}
              >
                {line.code}
              </span>
              <p
                className="text-sm font-medium leading-relaxed"
                style={{ color: gold }}
              >
                {line.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prakrit Verse */}
      <div>
        <SectionHeading>प्राकृत श्लोक</SectionHeading>
        <MantraBox>{shantiPathPrakritVerse}</MantraBox>
      </div>
    </div>
  );
}

// ─── YANTRA TAB ─────────────────────────────────────────────────────────────
function YantraTab() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-1" style={{ color: gold }}>
          {nagapashYantra.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {nagapashYantra.description}
        </p>
      </div>

      {/* Visual Yantra */}
      <div className="flex justify-center">
        <div
          className="border-4 rounded-xl p-1 w-64"
          style={{ borderColor: gold }}
        >
          <div
            className="border-2 rounded-lg p-1"
            style={{ borderColor: goldBorder }}
          >
            <div
              className="border rounded-md p-4"
              style={{ borderColor: goldBorder, background: goldFaint }}
            >
              {/* Top row */}
              <div className="grid grid-cols-3 gap-1 mb-2">
                {["ह्रीं", "श्रीं", "क्लीं"].map((s) => (
                  <div
                    key={s}
                    className="h-10 flex items-center justify-center text-sm font-bold border rounded"
                    style={{ borderColor: goldBorder, color: gold }}
                  >
                    {s}
                  </div>
                ))}
              </div>
              {/* Center */}
              <div className="flex items-center gap-1 mb-2">
                <div
                  className="flex-1 h-10 flex items-center justify-center text-xs border rounded"
                  style={{ borderColor: goldBorder, color: gold }}
                >
                  णमो
                </div>
                <div
                  className="w-14 h-14 flex items-center justify-center text-2xl font-bold border-2 rounded-full"
                  style={{
                    borderColor: gold,
                    color: gold,
                    background: "oklch(0.68 0.24 61 / 0.15)",
                  }}
                >
                  ॐ
                </div>
                <div
                  className="flex-1 h-10 flex items-center justify-center text-xs border rounded"
                  style={{ borderColor: goldBorder, color: gold }}
                >
                  णमो
                </div>
              </div>
              {/* Bottom row */}
              <div className="grid grid-cols-3 gap-1">
                {["पासाय", "🐍", "नमः"].map((s) => (
                  <div
                    key={s}
                    className="h-10 flex items-center justify-center text-sm font-bold border rounded"
                    style={{ borderColor: goldBorder, color: gold }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionHeading>यंत्र मंत्र</SectionHeading>
        <MantraBox>{nagapashYantra.yantraMantra}</MantraBox>
      </div>

      <div>
        <SectionHeading>यंत्र पूजन विधि</SectionHeading>
        <div className="text-sm text-foreground leading-relaxed bg-muted/30 rounded-lg p-4 border border-border">
          {nagapashYantra.usage}
        </div>
      </div>
    </div>
  );
}

// ─── UVASAGGAHARAM TAB ───────────────────────────────────────────────────────
function UvasaggaharamTab() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-1" style={{ color: gold }}>
          {uvasaggaharamStotra.title}
        </h3>
        <div className="mt-2 rounded-lg p-3 bg-muted/30 border border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            💡 {uvasaggaharamStotra.note}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {uvasaggaharamStotra.verses.map((v) => (
          <div
            key={v.number}
            className="rounded-xl p-4 border"
            style={{ background: goldFaint, borderColor: goldBorder }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 mx-auto"
              style={{
                background: "oklch(0.68 0.24 61 / 0.2)",
                color: gold,
              }}
            >
              {v.number}
            </div>
            <p
              className="text-sm font-medium text-center leading-loose whitespace-pre-line"
              style={{ color: gold }}
            >
              {v.text}
            </p>
          </div>
        ))}
      </div>

      <div>
        <SectionHeading>बीजमन्त्र</SectionHeading>
        <MantraBox>{uvasaggaharamStotra.bijMantra}</MantraBox>
      </div>
    </div>
  );
}

// ─── 33 PAATH TAB ────────────────────────────────────────────────────────────
function PaathAccordion({
  section,
  index,
}: {
  section: { number: number; title: string; text: string };
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      data-ocid={`padmavati.paath.item.${index + 1}`}
    >
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
        onClick={() => setOpen((v) => !v)}
        data-ocid={`padmavati.paath.toggle.${index + 1}`}
      >
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{
            background: "oklch(0.68 0.24 61 / 0.15)",
            color: gold,
          }}
        >
          {section.number}
        </span>
        <span className="flex-1 text-sm font-medium text-foreground">
          {section.title}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 border-t border-border">
          <TextBlock text={section.text} />
        </div>
      )}
    </div>
  );
}

function Paath33Tab() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-4">
        सभी ३३ पाठ/स्तोत्र/आरती/भजन — किसी भी पाठ पर क्लिक करके पूर्ण पाठ देखें।
      </p>
      {paathSections.map((section, i) => (
        <PaathAccordion key={section.number} section={section} index={i} />
      ))}
    </div>
  );
}

// ─── 108 NAMES TAB ───────────────────────────────────────────────────────────
function Names108Tab() {
  const [copied, setCopied] = useState<number | null>(null);
  const handleCopy = (mantra: string, num: number) => {
    navigator.clipboard.writeText(mantra);
    setCopied(num);
    setTimeout(() => setCopied(null), 1500);
  };
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-4 text-center">
        माता पद्मावती के १०८ नाम — जाप्य मंत्र
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {names108.map((item) => (
          <button
            type="button"
            key={item.number}
            className="flex items-center gap-2 p-2.5 rounded-lg border border-border hover:border-primary/40 transition-colors text-left group"
            style={{ background: goldFaint }}
            onClick={() => handleCopy(item.mantra, item.number)}
            data-ocid={`padmavati.name.item.${item.number}`}
            title="क्लिक करके कॉपी करें"
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              style={{
                background: "oklch(0.68 0.24 61 / 0.2)",
                color: gold,
              }}
            >
              {item.number}
            </span>
            <span
              className="flex-1 text-xs font-medium leading-tight"
              style={{ color: gold }}
            >
              {copied === item.number ? "✓ कॉपी हो गया" : item.mantra}
            </span>
            <Copy className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── VRAT KATHA TAB ─────────────────────────────────────────────────────────
function VratKathaTab() {
  const chapters = paathSections.filter(
    (p) => p.number >= 20 && p.number <= 23,
  );
  const vidhi = paathSections.find((p) => p.number === 25);
  const phala = paathSections.find((p) => p.number === 27);
  return (
    <div className="space-y-6">
      {chapters.map((ch) => (
        <div key={ch.number}>
          <SectionHeading>{ch.title}</SectionHeading>
          <TextBlock text={ch.text} />
        </div>
      ))}
      {vidhi && (
        <div>
          <SectionHeading>{vidhi.title}</SectionHeading>
          <TextBlock text={vidhi.text} />
        </div>
      )}
      {phala && (
        <div>
          <SectionHeading>{phala.title}</SectionHeading>
          <div
            className="rounded-xl p-4 border"
            style={{ background: goldFaint, borderColor: goldBorder }}
          >
            <TextBlock text={phala.text} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AARTI TAB ───────────────────────────────────────────────────────────────
function AartiTab() {
  return (
    <div className="space-y-6">
      <div>
        <SectionHeading>आरती — पद्मावती माता</SectionHeading>
        <MantraBox>{aartiOpening}</MantraBox>
      </div>

      <div>
        <SectionHeading>५२ ईश्वरी नाम</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {aartiNames52.map((item) => (
            <div
              key={item.number}
              className="flex items-center gap-2 p-2.5 rounded-lg border"
              style={{ background: goldFaint, borderColor: goldBorder }}
              data-ocid={`padmavati.aarti_name.item.${item.number}`}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{
                  background: "oklch(0.68 0.24 61 / 0.2)",
                  color: gold,
                }}
              >
                {item.number}
              </span>
              <div className="min-w-0">
                <p
                  className="text-xs font-semibold leading-tight truncate"
                  style={{ color: gold }}
                >
                  {item.name}
                </p>
                <p className="text-[10px] text-muted-foreground">— जय हो</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeading>आरती समापन</SectionHeading>
        <MantraBox>{aartiClosing}</MantraBox>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function PadmavatiVratKatha() {
  const [activeTab, setActiveTab] = useState<TabId>("shanti");
  const [copied, setCopied] = useState(false);
  const tabBarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Scroll tab button into view when selected
  const scrollActiveTabIntoView = () => {
    const bar = tabBarRef.current;
    if (!bar) return;
    const active = bar.querySelector('[data-active="true"]') as HTMLElement;
    if (active) {
      active.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      scrollActiveTabIntoView();
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <div
        className="relative py-12 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 22) 0%, oklch(0.22 0.09 38) 60%, oklch(0.20 0.07 30) 100%)",
        }}
        data-ocid="padmavati.hero"
      >
        {/* Decorative rings */}
        <div
          className="absolute top-4 left-4 w-24 h-24 rounded-full opacity-10 border-2"
          style={{ borderColor: gold }}
          aria-hidden
        />
        <div
          className="absolute bottom-4 right-4 w-16 h-16 rounded-full opacity-10 border-2"
          style={{ borderColor: gold }}
          aria-hidden
        />

        {/* Breadcrumb */}
        <nav
          className="flex items-center justify-center gap-1 text-xs mb-5 flex-wrap"
          aria-label="Breadcrumb"
        >
          {["होम", "जैन विभाग", "पद्मावती व्रत कथा"].map((crumb, i, arr) => (
            <span key={crumb} className="flex items-center gap-1">
              <span
                className={
                  i === arr.length - 1
                    ? "font-medium"
                    : "text-muted-foreground hover:underline cursor-pointer"
                }
                style={i === arr.length - 1 ? { color: gold } : undefined}
              >
                {crumb}
              </span>
              {i < arr.length - 1 && (
                <span className="text-muted-foreground">/</span>
              )}
            </span>
          ))}
        </nav>

        <div className="text-5xl mb-3">🐍</div>
        <h1
          className="text-2xl md:text-3xl font-bold mb-1 leading-snug"
          style={{ color: gold }}
        >
          महादेवी श्री पद्मावती माता
        </h1>
        <h2 className="text-lg md:text-xl font-semibold text-foreground mb-1">
          व्रत कथा
        </h2>
        <p
          className="text-sm mb-4"
          style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
        >
          श्री रश्मि जी महाराज द्वारा संयोजित
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {["जैन परम्परा", "पार्श्वनाथ शासन देवी", "107 पाठ", "108 नाम"].map((b) => (
            <Badge
              key={b}
              variant="outline"
              className="text-xs"
              style={{
                borderColor: goldBorder,
                color: gold,
                background: goldFaint,
              }}
            >
              {b}
            </Badge>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1 text-xs h-8"
            onClick={handleShare}
            data-ocid="padmavati.share_button"
            style={{ borderColor: goldBorder, color: gold }}
          >
            <Share2 className="w-3 h-3" />
            {copied ? "लिंक कॉपी हुआ!" : "Share"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1 text-xs h-8"
            onClick={() => window.print()}
            data-ocid="padmavati.print_button"
            style={{ borderColor: goldBorder, color: gold }}
          >
            <BookOpen className="w-3 h-3" />
            Print
          </Button>
        </div>
      </div>

      {/* ── Sticky Tab Bar ── */}
      <div
        className="sticky top-0 z-20 bg-card border-b border-border shadow-sm"
        data-ocid="padmavati.tab_bar"
      >
        <div
          ref={tabBarRef}
          className="flex overflow-x-auto scrollbar-hide px-2 py-2 gap-1 max-w-5xl mx-auto"
          role="tablist"
          aria-label="Padmavati sections"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              data-active={activeTab === tab.id ? "true" : "false"}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              style={
                activeTab === tab.id
                  ? {
                      background: goldFaint,
                      color: gold,
                      border: `1px solid ${goldBorder}`,
                    }
                  : {}
              }
              onClick={() => handleTabChange(tab.id)}
              data-ocid={`padmavati.tab.${tab.id}`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="max-w-3xl mx-auto px-4 py-8"
        data-ocid="padmavati.content"
      >
        {/* Section title */}
        <div className="flex items-center gap-2 mb-6">
          <Flower2 className="w-5 h-5 flex-shrink-0" style={{ color: gold }} />
          <h2 className="text-base font-bold" style={{ color: gold }}>
            {TABS.find((t) => t.id === activeTab)?.emoji}{" "}
            {TABS.find((t) => t.id === activeTab)?.label}
          </h2>
        </div>

        {activeTab === "shanti" && <ShantiPathTab />}
        {activeTab === "yantra" && <YantraTab />}
        {activeTab === "uvasaggaharam" && <UvasaggaharamTab />}
        {activeTab === "paath33" && <Paath33Tab />}
        {activeTab === "names108" && <Names108Tab />}
        {activeTab === "katha" && <VratKathaTab />}
        {activeTab === "aarti" && <AartiTab />}
      </div>

      {/* ── Footer note ── */}
      <div className="bg-muted/30 border-t border-border py-6 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          🙏 जय महादेवी श्री पद्मावती माता — जय पार्श्वनाथ भगवान
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          ॐ ह्रीं श्रीं पद्मावत्यै नमः
        </p>
      </div>
    </div>
  );
}
