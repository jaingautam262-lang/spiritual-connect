import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Palette, Search, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import {
  GREETING_CARDS,
  type GreetingCard,
  PAINTINGS,
  PAINTING_STYLES,
  type Painting,
  type PaintingStyle,
} from "../data/paintingsData";

const STYLE_COLORS: Record<PaintingStyle, string> = {
  Madhubani: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Warli: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Pichwai: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Tanjore: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Mughal: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Contemporary: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

function PaintingCard({
  painting,
  onSelect,
}: { painting: Painting; onSelect: (p: Painting) => void }) {
  return (
    <button
      type="button"
      className="rounded-xl border overflow-hidden cursor-pointer transition-all hover:border-amber-500/40 hover:-translate-y-0.5 hover:shadow-lg text-left w-full"
      style={{
        background: "oklch(0.18 0.05 30 / 0.9)",
        borderColor: "oklch(0.75 0.14 75 / 0.15)",
      }}
      onClick={() => onSelect(painting)}
      data-ocid={`painting.card.${painting.id}`}
    >
      <div
        className="h-40 flex flex-col items-center justify-center gap-2 relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 35 / 0.8) 0%, oklch(0.16 0.06 25) 100%)",
        }}
      >
        <span className="text-5xl">{painting.emoji}</span>
        <div className="absolute top-3 left-3">
          <Badge className={`text-xs border ${STYLE_COLORS[painting.style]}`}>
            {painting.style}
          </Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
          {painting.name}
        </h3>
        <p className="text-xs text-amber-300/70 mb-1">{painting.nameHindi}</p>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
          {painting.description}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Palette className="w-3 h-3 text-amber-400" />
          {painting.origin}
        </div>
      </div>
    </button>
  );
}

function PaintingModal({
  painting,
  onClose,
}: { painting: Painting; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto border"
        style={{
          background: "oklch(0.14 0.05 30)",
          borderColor: "oklch(0.75 0.14 75 / 0.25)",
        }}
        data-ocid="painting.dialog"
      >
        <DialogHeader>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{painting.emoji}</span>
            <div>
              <DialogTitle className="text-lg text-foreground">
                {painting.name}
              </DialogTitle>
              <p className="text-amber-300/70 text-sm">{painting.nameHindi}</p>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex flex-wrap gap-2">
            <Badge className={`border ${STYLE_COLORS[painting.style]}`}>
              {painting.style}
            </Badge>
            <Badge
              variant="outline"
              className="border-amber-500/25 text-amber-300/70"
            >
              {painting.deity}
            </Badge>
            <Badge
              variant="outline"
              className="border-amber-500/25 text-amber-300/70"
            >
              {painting.origin}
            </Badge>
          </div>
          <div
            className="rounded-lg p-4"
            style={{ background: "oklch(0.20 0.06 30 / 0.7)" }}
          >
            <p className="text-sm text-muted-foreground">
              {painting.description}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Significance
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {painting.significance}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Traditional Colors
            </h4>
            <div className="flex flex-wrap gap-2">
              {painting.colors.map((c) => (
                <Badge
                  key={c}
                  variant="outline"
                  className="text-xs border-amber-500/20 text-amber-200/70"
                >
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <Button
            className="flex-1"
            style={{
              background: "oklch(0.72 0.18 55)",
              color: "oklch(0.10 0.03 30)",
            }}
            onClick={() => alert("Download feature coming soon!")}
            data-ocid="painting.download_button"
          >
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            style={{ borderColor: "oklch(0.75 0.14 75 / 0.3)" }}
            data-ocid="painting.close_button"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function GreetingCardDisplay({ card }: { card: GreetingCard }) {
  const [userName, setUserName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const finalMessage = userName.trim()
    ? `Dear ${userName},\n\n${card.message_templates[selectedTemplate]}`
    : card.message_templates[selectedTemplate];

  const copyMessage = () => {
    navigator.clipboard
      .writeText(finalMessage)
      .then(() => toast.success("Message copied!"));
  };

  return (
    <div
      className="rounded-xl border p-5 space-y-4"
      style={{
        background: "oklch(0.18 0.05 30 / 0.9)",
        borderColor: "oklch(0.75 0.14 75 / 0.15)",
      }}
      data-ocid={`greeting.card.${card.id}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl">{card.emoji}</span>
        <div>
          <h3 className="font-semibold text-foreground">{card.festival}</h3>
          <p className="text-amber-300/70 text-sm">{card.festivalHindi}</p>
          <div className="flex gap-1 mt-1">
            {card.language_support.map((lang) => (
              <Badge
                key={lang}
                variant="outline"
                className="text-xs border-amber-500/20 text-amber-200/60 py-0"
              >
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Template selector */}
      <div className="space-y-2">
        {card.message_templates.map((tmpl, idx) => (
          <button
            key={tmpl.slice(0, 30)}
            type="button"
            onClick={() => setSelectedTemplate(idx)}
            className={`w-full text-left text-xs p-3 rounded-lg border transition-all ${selectedTemplate === idx ? "border-amber-500/50 bg-amber-500/10" : "border-border"}`}
            style={
              selectedTemplate !== idx
                ? { borderColor: "oklch(0.75 0.14 75 / 0.12)" }
                : {}
            }
            data-ocid={`greeting.template.${idx + 1}`}
          >
            {tmpl.slice(0, 80)}...
          </button>
        ))}
      </div>

      {/* Customizer */}
      <div>
        <label
          htmlFor={`greeting-name-${card.id}`}
          className="text-xs text-muted-foreground block mb-1"
        >
          Recipient's name (optional)
        </label>
        <Input
          id={`greeting-name-${card.id}`}
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter name..."
          className="text-sm h-8"
          style={{
            background: "oklch(0.14 0.04 30)",
            borderColor: "oklch(0.75 0.14 75 / 0.2)",
          }}
          data-ocid="greeting.name_input"
        />
      </div>

      <div
        className="rounded-lg p-3 text-sm text-muted-foreground whitespace-pre-line"
        style={{ background: "oklch(0.14 0.04 30 / 0.8)" }}
      >
        {finalMessage}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 text-xs"
          style={{
            background: "oklch(0.72 0.18 55)",
            color: "oklch(0.10 0.03 30)",
          }}
          onClick={copyMessage}
          data-ocid="greeting.copy_button"
        >
          <Copy className="w-3 h-3 mr-1" /> Copy Message
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-xs"
          style={{ borderColor: "oklch(0.75 0.14 75 / 0.3)" }}
          onClick={() => alert("Download card feature coming soon!")}
          data-ocid="greeting.download_button"
        >
          <Download className="w-3 h-3 mr-1" /> Card
        </Button>
      </div>
    </div>
  );
}

export default function PaintingsGreetings() {
  const { language } = useLanguage();
  const [paintingSearch, setPaintingSearch] = useState("");
  const [styleFilter, setStyleFilter] = useState<PaintingStyle | "All">("All");
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(
    null,
  );

  const t = (hi: string, en: string) => (language === "hi" ? hi : en);

  const filteredPaintings = PAINTINGS.filter((p) => {
    if (styleFilter !== "All" && p.style !== styleFilter) return false;
    if (paintingSearch.trim()) {
      const q = paintingSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.deity.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
        <div className="text-5xl mb-3">🎨</div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {t("चित्रकला एवं शुभकामनाएं", "Paintings & Greetings")}
        </h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          {t(
            "भारतीय चित्रकला शैलियां और पर्व शुभकामना संदेश",
            "Indian art styles and festival greeting card messages",
          )}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="paintings">
          <TabsList
            className="mb-6"
            style={{ background: "oklch(0.18 0.05 30 / 0.8)" }}
          >
            <TabsTrigger value="paintings" data-ocid="paintings.tab">
              🎨 {t("चित्रकला", "Paintings")} ({PAINTINGS.length})
            </TabsTrigger>
            <TabsTrigger value="greetings" data-ocid="greetings.tab">
              💌 {t("शुभकामना कार्ड", "Greeting Cards")} ({GREETING_CARDS.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="paintings">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={paintingSearch}
                  onChange={(e) => setPaintingSearch(e.target.value)}
                  placeholder={t("चित्र खोजें...", "Search paintings...")}
                  className="pl-9"
                  style={{
                    background: "oklch(0.18 0.05 30)",
                    borderColor: "oklch(0.75 0.14 75 / 0.2)",
                  }}
                  data-ocid="paintings.search_input"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={styleFilter === "All" ? "default" : "outline"}
                  onClick={() => setStyleFilter("All")}
                  className="text-xs"
                  style={
                    styleFilter === "All"
                      ? {
                          background: "oklch(0.72 0.18 55)",
                          color: "oklch(0.10 0.03 30)",
                        }
                      : { borderColor: "oklch(0.75 0.14 75 / 0.25)" }
                  }
                  data-ocid="paintings.filter.all"
                >
                  All
                </Button>
                {PAINTING_STYLES.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={styleFilter === s ? "default" : "outline"}
                    onClick={() => setStyleFilter(s)}
                    className="text-xs"
                    style={
                      styleFilter === s
                        ? {
                            background: "oklch(0.72 0.18 55)",
                            color: "oklch(0.10 0.03 30)",
                          }
                        : { borderColor: "oklch(0.75 0.14 75 / 0.25)" }
                    }
                    data-ocid={`paintings.filter.${s.toLowerCase()}`}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            {filteredPaintings.length === 0 ? (
              <div
                className="text-center py-16"
                data-ocid="paintings.empty_state"
              >
                <div className="text-5xl mb-3">🎨</div>
                <p className="text-muted-foreground">
                  {t("कोई चित्र नहीं मिला", "No paintings found")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPaintings.map((p) => (
                  <PaintingCard
                    key={p.id}
                    painting={p}
                    onSelect={setSelectedPainting}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="greetings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {GREETING_CARDS.map((card) => (
                <GreetingCardDisplay key={card.id} card={card} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedPainting && (
        <PaintingModal
          painting={selectedPainting}
          onClose={() => setSelectedPainting(null)}
        />
      )}
    </div>
  );
}
