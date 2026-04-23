import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Feather,
  MessageSquare,
  Printer,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import {
  type JainDiaryEntry,
  type JainHaiku,
  type JainPoem,
  type JainQuote,
  acharyaVardhamanSagarQuotes,
  acharyaVidyasagarHaiku,
  acharyaVidyasagarMaharajQuotes,
  brahmachariBhaiyadiaryEntries,
  muniKshamasagarPoems,
  muniKshamasagarQuotes,
} from "../data/jainVichaarData";

type PersonKey =
  | "kshamasagar"
  | "vardhamansagar"
  | "vidyasagar"
  | "brahmacharibhaiya";

interface PersonConfig {
  key: PersonKey;
  name: string;
  subtitle: string;
  tradition: string;
  icon: string;
  color: string;
  quotes?: JainQuote[];
  poems?: JainPoem[];
  haiku?: JainHaiku[];
  diary?: JainDiaryEntry[];
}

const persons: Record<PersonKey, PersonConfig> = {
  kshamasagar: {
    key: "kshamasagar",
    name: "मुनिश्री क्षमासागर जी",
    subtitle: "दिगंबर जैन मुनि — क्षमा और अहिंसा के प्रणेता",
    tradition: "दिगंबर",
    icon: "🕊️",
    color: "oklch(0.72 0.18 55)",
    quotes: muniKshamasagarQuotes,
    poems: muniKshamasagarPoems,
  },
  vardhamansagar: {
    key: "vardhamansagar",
    name: "आचार्य वर्धमान सागर जी",
    subtitle: "दिगंबर जैन आचार्य — आगम-साधना के पथिक",
    tradition: "दिगंबर",
    icon: "📖",
    color: "oklch(0.68 0.16 45)",
    quotes: acharyaVardhamanSagarQuotes,
  },
  vidyasagar: {
    key: "vidyasagar",
    name: "आचार्य श्री विद्यासागर महाराज",
    subtitle: "दिगंबर जैन आचार्य — साहित्य-साधना और वीतरागता के मूर्तिमान रूप",
    tradition: "दिगंबर",
    icon: "✨",
    color: "oklch(0.75 0.15 65)",
    quotes: acharyaVidyasagarMaharajQuotes,
    haiku: acharyaVidyasagarHaiku,
  },
  brahmacharibhaiya: {
    key: "brahmacharibhaiya",
    name: "ब्रह्मचारी अन्नू भैया",
    subtitle: "जैन जीवन-दर्शन — व्यावहारिक मार्गदर्शन",
    tradition: "श्रावक परंपरा",
    icon: "🌸",
    color: "oklch(0.65 0.14 75)",
    diary: brahmachariBhaiyadiaryEntries,
  },
};

const diaryCategories: Record<JainDiaryEntry["category"], string> = {
  shishtachar: "शिष्टाचार",
  parvarish: "परवरिश",
  swarnimSutra: "स्वर्णिम सूत्र",
  jeevanDarshan: "जीवन दर्शन",
};

const diaryCategoryColors: Record<JainDiaryEntry["category"], string> = {
  shishtachar: "oklch(0.65 0.18 48)",
  parvarish: "oklch(0.60 0.15 200)",
  swarnimSutra: "oklch(0.70 0.16 75)",
  jeevanDarshan: "oklch(0.65 0.14 140)",
};

function QuoteCard({ quote, index }: { quote: JainQuote; index: number }) {
  return (
    <div
      data-ocid={`vichaar.quote.item.${index}`}
      className="rounded-2xl p-5"
      style={{
        background: "oklch(0.18 0.05 28 / 0.6)",
        border: "1px solid oklch(0.78 0.14 75 / 0.18)",
      }}
    >
      <div className="flex gap-3 items-start">
        <span
          className="text-4xl leading-none flex-shrink-0 mt-0.5 font-display"
          style={{ color: "oklch(0.78 0.14 75 / 0.4)" }}
        >
          "
        </span>
        <div>
          <p className="text-foreground text-base leading-relaxed font-body">
            {quote.text}
          </p>
          {quote.source && (
            <p className="text-xs text-muted-foreground mt-2">
              — {quote.source}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function PoemCard({ poem, index }: { poem: JainPoem; index: number }) {
  return (
    <div
      data-ocid={`vichaar.poem.item.${index}`}
      className="rounded-2xl p-5"
      style={{
        background: "oklch(0.62 0.18 48 / 0.08)",
        border: "1px solid oklch(0.62 0.18 48 / 0.2)",
      }}
    >
      <h4
        className="font-display font-semibold mb-3 text-base"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {poem.title}
      </h4>
      <p className="text-foreground text-sm leading-loose whitespace-pre-line font-body">
        {poem.text}
      </p>
      {poem.meaning && (
        <p className="text-muted-foreground text-xs mt-3 leading-relaxed italic">
          अर्थ: {poem.meaning}
        </p>
      )}
    </div>
  );
}

function HaikuCard({ haiku, index }: { haiku: JainHaiku; index: number }) {
  return (
    <div
      data-ocid={`vichaar.haiku.item.${index}`}
      className="rounded-2xl p-5"
      style={{
        background: "oklch(0.18 0.05 28 / 0.6)",
        border: "1px solid oklch(0.78 0.14 75 / 0.15)",
      }}
    >
      <h4
        className="text-xs font-semibold mb-2 tracking-wide uppercase"
        style={{ color: "oklch(0.72 0.16 65)" }}
      >
        {haiku.title}
      </h4>
      <p className="text-foreground text-lg leading-relaxed whitespace-pre-line font-display font-semibold mb-2">
        {haiku.haiku}
      </p>
      <p className="text-muted-foreground text-xs leading-relaxed italic">
        {haiku.meaning}
      </p>
    </div>
  );
}

function DiaryCard({ entry, index }: { entry: JainDiaryEntry; index: number }) {
  return (
    <div
      data-ocid={`vichaar.diary.item.${index}`}
      className="rounded-2xl p-5"
      style={{
        background: "oklch(0.18 0.05 28 / 0.6)",
        border: "1px solid oklch(0.78 0.14 75 / 0.15)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: `${diaryCategoryColors[entry.category]} / 0.15`,
            color: diaryCategoryColors[entry.category],
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: `${diaryCategoryColors[entry.category]} / 0.3`,
          }}
        >
          {diaryCategories[entry.category]}
        </span>
      </div>
      <h4 className="font-semibold text-foreground text-sm mb-2">
        {entry.title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {entry.content}
      </p>
      {entry.verse && (
        <p
          className="text-xs mt-3 font-display italic"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          ✦ {entry.verse}
        </p>
      )}
    </div>
  );
}

export default function JainVicharQuoteDetail() {
  const { person } = useParams({ strict: false }) as { person: string };
  const config = persons[person as PersonKey];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: config?.name ?? "जैन विचार",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("लिंक कॉपी हो गया!");
    }
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-20">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-40" />
          <p className="text-lg font-semibold text-foreground mb-2">
            विचार नहीं मिले
          </p>
          <Link to="/jain-vichaar">
            <Button variant="outline" size="sm">
              ← जैन विचार
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 22) 0%, oklch(0.24 0.08 40) 100%)",
        }}
      >
        <div className="text-4xl mb-4">{config.icon}</div>
        <Badge
          className="mb-3 text-xs"
          style={{
            background: "oklch(0.78 0.14 75 / 0.15)",
            color: "oklch(0.78 0.14 75)",
            borderColor: "oklch(0.78 0.14 75 / 0.3)",
          }}
        >
          {config.tradition}
        </Badge>
        <h1
          className="text-2xl md:text-3xl font-display font-bold mb-2"
          style={{ color: "oklch(0.92 0.06 75)" }}
        >
          {config.name}
        </h1>
        <p className="text-sm text-white/55 max-w-lg mx-auto mb-6">
          {config.subtitle}
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/jain-vichaar" data-ocid="vichaar.back_button">
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> वापस जाएं
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.print()}
            data-ocid="vichaar.print_button"
            className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" /> प्रिंट करें
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleShare}
            data-ocid="vichaar.share_button"
            className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent text-xs"
          >
            <Share2 className="w-3.5 h-3.5 mr-1.5" /> शेयर करें
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Vidyasagar — Tabbed (Quotes + Haiku) */}
        {config.key === "vidyasagar" && (
          <Tabs defaultValue="quotes" data-ocid="vichaar.tabs">
            <TabsList className="bg-card border border-border rounded-xl p-1.5 mb-8 w-full">
              <TabsTrigger
                value="quotes"
                data-ocid="vichaar.tab.quotes"
                className="flex-1 flex items-center gap-1.5 text-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" /> विचार (
                {config.quotes?.length ?? 0})
              </TabsTrigger>
              <TabsTrigger
                value="haiku"
                data-ocid="vichaar.tab.haiku"
                className="flex-1 flex items-center gap-1.5 text-sm"
              >
                <Feather className="w-3.5 h-3.5" /> हाइकु (
                {config.haiku?.length ?? 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" data-ocid="vichaar.quotes.section">
              <div className="space-y-4">
                {config.quotes?.map((q, i) => (
                  <QuoteCard key={q.id} quote={q} index={i + 1} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="haiku" data-ocid="vichaar.haiku.section">
              <div className="grid sm:grid-cols-2 gap-4">
                {config.haiku?.map((h, i) => (
                  <HaikuCard key={h.id} haiku={h} index={i + 1} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Kshamasagar — Quotes + Poems */}
        {config.key === "kshamasagar" && (
          <Tabs defaultValue="quotes" data-ocid="vichaar.tabs">
            <TabsList className="bg-card border border-border rounded-xl p-1.5 mb-8 w-full">
              <TabsTrigger
                value="quotes"
                data-ocid="vichaar.tab.quotes"
                className="flex-1 flex items-center gap-1.5 text-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" /> विचार (
                {config.quotes?.length ?? 0})
              </TabsTrigger>
              <TabsTrigger
                value="poems"
                data-ocid="vichaar.tab.poems"
                className="flex-1 flex items-center gap-1.5 text-sm"
              >
                <Feather className="w-3.5 h-3.5" /> कविताएं (
                {config.poems?.length ?? 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quotes" data-ocid="vichaar.quotes.section">
              <div className="space-y-4">
                {config.quotes?.map((q, i) => (
                  <QuoteCard key={q.id} quote={q} index={i + 1} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="poems" data-ocid="vichaar.poems.section">
              <div className="space-y-4">
                {config.poems?.map((p, i) => (
                  <PoemCard key={p.id} poem={p} index={i + 1} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Vardhamansagar — Only Quotes */}
        {config.key === "vardhamansagar" && (
          <div data-ocid="vichaar.quotes.section" className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare
                className="w-4 h-4"
                style={{ color: config.color }}
              />
              <h2 className="font-display font-bold text-foreground text-lg">
                {config.quotes?.length} विचार
              </h2>
            </div>
            {config.quotes?.map((q, i) => (
              <QuoteCard key={q.id} quote={q} index={i + 1} />
            ))}
          </div>
        )}

        {/* BrahmachariiBhaiya — Categorized diary */}
        {config.key === "brahmacharibhaiya" && (
          <div data-ocid="vichaar.diary.section">
            <Tabs defaultValue="shishtachar" data-ocid="vichaar.diary.tabs">
              <TabsList className="flex flex-wrap h-auto gap-1.5 bg-card border border-border rounded-xl p-2 mb-8">
                {(
                  Object.keys(diaryCategories) as JainDiaryEntry["category"][]
                ).map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    data-ocid={`vichaar.diary.tab.${cat}`}
                    className="text-xs px-3 py-2"
                  >
                    {diaryCategories[cat]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {(
                Object.keys(diaryCategories) as JainDiaryEntry["category"][]
              ).map((cat) => (
                <TabsContent
                  key={cat}
                  value={cat}
                  data-ocid={`vichaar.diary.${cat}.section`}
                >
                  <div className="space-y-4">
                    {config.diary
                      ?.filter((e) => e.category === cat)
                      .map((e, i) => (
                        <DiaryCard key={e.id} entry={e} index={i + 1} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
