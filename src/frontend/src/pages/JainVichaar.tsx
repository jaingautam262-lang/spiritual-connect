import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  type JainDiaryEntry,
  acharyaVardhamanSagarQuotes,
  acharyaVidyasagarHaiku,
  acharyaVidyasagarMaharajQuotes,
  brahmachariBhaiyadiaryEntries,
  muniKshamasagarGallery,
  muniKshamasagarPoems,
  muniKshamasagarQuotes,
} from "../data/jainVichaarData";

type TabId = "kshamasagar" | "vardhamansagar" | "vidyasagar" | "annubhaiya";

const TABS: { id: TabId; label: string; subtitle: string; emoji: string }[] = [
  {
    id: "kshamasagar",
    label: "मुनिश्री क्षमासागर जी",
    subtitle: "विचार एवं काव्य",
    emoji: "🙏",
  },
  {
    id: "vardhamansagar",
    label: "आचार्य वर्धमान सागर जी",
    subtitle: "24 सुविचार",
    emoji: "📿",
  },
  {
    id: "vidyasagar",
    label: "आचार्य विद्यासागर महाराज जी",
    subtitle: "सुविचार और हाइकू",
    emoji: "🌸",
  },
  {
    id: "annubhaiya",
    label: "ब्रह्मचारी अन्नु भैया",
    subtitle: "डायरी के पन्ने",
    emoji: "📖",
  },
];

const DIARY_CATS: { key: JainDiaryEntry["category"]; label: string }[] = [
  { key: "shishtachar", label: "शिष्टाचार" },
  { key: "parvarish", label: "परवरिश" },
  { key: "swarnimSutra", label: "स्वर्णिम सूत्र" },
  { key: "jeevanDarshan", label: "जीवन दर्शन" },
];

function AvatarPlaceholder({
  name,
  size = "lg",
}: { name: string; size?: "sm" | "lg" }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const dim = size === "lg" ? "w-24 h-24 text-2xl" : "w-14 h-14 text-sm";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-display font-bold flex-shrink-0`}
      style={{
        background:
          "linear-gradient(135deg, oklch(0.28 0.08 45), oklch(0.35 0.10 55))",
        border: "3px solid oklch(0.78 0.14 75 / 0.4)",
        color: "oklch(0.88 0.10 75)",
      }}
    >
      {initials}
    </div>
  );
}

function QuoteCard({
  text,
  source,
  idx,
}: { text: string; source?: string; idx?: number }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors duration-200">
      {idx !== undefined && (
        <span
          className="block text-3xl font-display font-black mb-2 leading-none"
          style={{ color: "oklch(0.72 0.18 55 / 0.35)" }}
        >
          {String(idx + 1).padStart(2, "0")}
        </span>
      )}
      <div className="relative">
        <span
          className="absolute -top-2 -left-1 text-5xl leading-none font-serif"
          style={{ color: "oklch(0.78 0.14 75 / 0.4)" }}
        >
          "
        </span>
        <p className="text-base text-foreground leading-relaxed pl-5 pt-1 italic">
          {text}
        </p>
      </div>
      {source && (
        <p
          className="mt-3 text-xs text-right"
          style={{ color: "oklch(0.72 0.18 55)" }}
        >
          — {source}
        </p>
      )}
    </div>
  );
}

function HaikuCard({
  haiku,
  title,
  meaning,
  idx,
}: { haiku: string; title: string; meaning: string; idx: number }) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
      style={{ borderLeft: "3px solid oklch(0.72 0.18 55 / 0.4)" }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h4
          className="font-display font-bold text-sm"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          {idx + 1}. {title}
        </h4>
        <span className="text-xs text-muted-foreground flex-shrink-0">
          हाइकू
        </span>
      </div>
      <pre
        className="text-base leading-8 font-body whitespace-pre-wrap mb-3"
        style={{ color: "oklch(0.92 0.015 80)", fontFamily: "inherit" }}
      >
        {haiku}
      </pre>
      <p className="text-xs text-muted-foreground border-t border-border pt-2 mt-2 leading-relaxed">
        {meaning}
      </p>
    </div>
  );
}

function Tab1Kshamasagar() {
  return (
    <div className="space-y-10">
      {/* Bio */}
      <div className="flex items-center gap-5 p-6 bg-card border border-border rounded-xl">
        <AvatarPlaceholder name="मुनिश्री क्षमासागर" />
        <div>
          <h2
            className="font-display text-xl font-bold mb-1"
            style={{ color: "oklch(0.88 0.10 75)" }}
          >
            मुनिश्री क्षमासागर जी
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            दिगंबर जैन परंपरा के विद्वान आचार्य। क्षमा, अहिंसा और संयम के जीवंत प्रतीक। उनके
            प्रवचनों ने लाखों श्रद्धालुओं के जीवन को परिवर्तित किया है।
          </p>
        </div>
      </div>

      {/* Quotes */}
      <div>
        <h3
          className="font-display text-lg font-bold mb-4 flex items-center gap-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          💬 सुविचार
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {muniKshamasagarQuotes.map((q) => (
            <QuoteCard key={q.id} text={q.text} source={q.source} />
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <h3
          className="font-display text-lg font-bold mb-4 flex items-center gap-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          🖼️ फोटो गैलरी
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {muniKshamasagarGallery.map((img) => (
            <div
              key={img.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div
                className="aspect-square flex items-center justify-center text-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.22 0.06 45), oklch(0.28 0.08 55))",
                }}
              >
                🙏
              </div>
              <p className="p-2 text-xs text-center text-muted-foreground leading-snug">
                {img.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Poems */}
      <div>
        <h3
          className="font-display text-lg font-bold mb-4 flex items-center gap-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          📜 काव्य
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {muniKshamasagarPoems.map((poem) => (
            <div
              key={poem.id}
              className="bg-card border border-border rounded-xl p-5"
              style={{ borderTop: "3px solid oklch(0.72 0.18 55 / 0.5)" }}
            >
              <h4
                className="font-display font-bold mb-3"
                style={{ color: "oklch(0.88 0.10 75)" }}
              >
                {poem.title}
              </h4>
              <pre className="text-sm leading-7 whitespace-pre-wrap font-body text-foreground">
                {poem.text}
              </pre>
              {poem.meaning && (
                <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-2">
                  {poem.meaning}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tab2VardhamanSagar() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-5 p-6 bg-card border border-border rounded-xl">
        <AvatarPlaceholder name="आचार्य वर्धमान सागर" />
        <div>
          <h2
            className="font-display text-xl font-bold mb-1"
            style={{ color: "oklch(0.88 0.10 75)" }}
          >
            आचार्य वर्धमान सागर जी
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            जैन दर्शन और आगम के प्रकांड पंडित। उनके 24 सुविचार जीवन की हर परिस्थिति में
            मार्गदर्शन करते हैं।
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {acharyaVardhamanSagarQuotes.map((q, i) => (
          <QuoteCard key={q.id} text={q.text} idx={i} />
        ))}
      </div>
    </div>
  );
}

function Tab3VidyasagarMaharaj() {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-5 p-6 bg-card border border-border rounded-xl">
        <AvatarPlaceholder name="आचार्य विद्यासागर" />
        <div>
          <h2
            className="font-display text-xl font-bold mb-1"
            style={{ color: "oklch(0.88 0.10 75)" }}
          >
            आचार्य श्री विद्यासागर महाराज जी
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            दिगंबर जैन परंपरा के महान आचार्य। साहित्य, दर्शन और आध्यात्म के अप्रतिम साधक।
            उनके हाइकू काव्य जैन दर्शन को सरल भाषा में प्रस्तुत करते हैं।
          </p>
        </div>
      </div>

      {/* Quotes */}
      <div>
        <h3
          className="font-display text-lg font-bold mb-4"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          💬 सुविचार
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {acharyaVidyasagarMaharajQuotes.map((q) => (
            <QuoteCard key={q.id} text={q.text} source={q.source} />
          ))}
        </div>
      </div>

      {/* Haiku */}
      <div>
        <h3
          className="font-display text-lg font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          🌸 हाइकू काव्य संग्रह
        </h3>
        <p className="text-sm text-muted-foreground mb-5">
          तीन पंक्तियों में गहरे दार्शनिक सत्य — आचार्य जी के{" "}
          {acharyaVidyasagarHaiku.length} हाइकू
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {acharyaVidyasagarHaiku.map((h, i) => (
            <HaikuCard
              key={h.id}
              haiku={h.haiku}
              title={h.title}
              meaning={h.meaning}
              idx={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Tab4AnnuBhaiya() {
  const [activeCat, setActiveCat] =
    useState<JainDiaryEntry["category"]>("shishtachar");

  const filtered = brahmachariBhaiyadiaryEntries.filter(
    (e) => e.category === activeCat,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-5 p-6 bg-card border border-border rounded-xl">
        <AvatarPlaceholder name="ब्रह्मचारी अन्नु" />
        <div>
          <h2
            className="font-display text-xl font-bold mb-1"
            style={{ color: "oklch(0.88 0.10 75)" }}
          >
            ब्रह्मचारी अन्नु भैया की डायरी
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            जैन जीवन-दर्शन को सरल और व्यावहारिक भाषा में प्रस्तुत करते हुए डायरी के पन्नों से
            जीवन के मूल्य।
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {DIARY_CATS.map((cat) => (
          <button
            key={cat.key}
            type="button"
            data-ocid={`diary.filter.${cat.key}`}
            onClick={() => setActiveCat(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 ${
              activeCat === cat.key
                ? "text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
            style={
              activeCat === cat.key ? { background: "oklch(0.72 0.18 55)" } : {}
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Diary entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((entry, i) => (
          <div
            key={entry.id}
            data-ocid={`diary.item.${i + 1}`}
            className="bg-card border border-border rounded-xl overflow-hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 27px, oklch(0.78 0.14 75 / 0.06) 27px, oklch(0.78 0.14 75 / 0.06) 28px)",
            }}
          >
            <div className="p-5">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-lg mt-0.5">📝</span>
                <h4
                  className="font-display font-bold text-base leading-snug"
                  style={{ color: "oklch(0.88 0.10 75)" }}
                >
                  {entry.title}
                </h4>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {entry.content}
              </p>
              {entry.verse && (
                <div
                  className="text-xs italic px-3 py-2 rounded border-l-2"
                  style={{
                    color: "oklch(0.72 0.18 55)",
                    borderLeftColor: "oklch(0.72 0.18 55 / 0.5)",
                    background: "oklch(0.22 0.06 48 / 0.2)",
                  }}
                >
                  ✦ {entry.verse}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function JainVichaar() {
  const [activeTab, setActiveTab] = useState<TabId>("kshamasagar");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="py-12 px-4 relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 30), oklch(0.22 0.07 45), oklch(0.18 0.05 28))",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.78 0.14 75) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <h1
            className="font-display text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.88 0.10 75)" }}
          >
            जैन विचार
          </h1>
          <p className="text-base text-muted-foreground">
            महान आचार्यों के अमृत-वचन, काव्य और जीवन-दर्शन
          </p>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                data-ocid={`vichaar.tab.${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
                style={
                  activeTab === tab.id
                    ? { background: "oklch(0.72 0.18 55)" }
                    : {}
                }
              >
                <span>{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {activeTab === "kshamasagar" && <Tab1Kshamasagar />}
          {activeTab === "vardhamansagar" && <Tab2VardhamanSagar />}
          {activeTab === "vidyasagar" && <Tab3VidyasagarMaharaj />}
          {activeTab === "annubhaiya" && <Tab4AnnuBhaiya />}
        </div>
      </section>
    </div>
  );
}
