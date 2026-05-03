import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Download, Info, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  MEHNDI_DESIGNS,
  MEHNDI_OCCASIONS,
  MEHNDI_STYLES,
  type MehndiComplexity,
  type MehndiDesign,
  type MehndiStyle,
} from "../data/mehndiData";

const COMPLEXITY_COLORS: Record<MehndiComplexity, string> = {
  Easy: "bg-green-500/20 text-green-300 border-green-500/30",
  Medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Complex: "bg-red-500/20 text-red-300 border-red-500/30",
};

const STYLE_EMOJIS: Record<MehndiStyle, string> = {
  Bridal: "👰",
  Festival: "🎊",
  Arabic: "🌺",
  Rajasthani: "🏜️",
  Moroccan: "⭐",
  Simple: "🌸",
};

function DesignCard({
  design,
  onSelect,
}: { design: MehndiDesign; onSelect: (d: MehndiDesign) => void }) {
  return (
    <button
      type="button"
      className="rounded-xl border overflow-hidden cursor-pointer transition-all hover:border-amber-500/40 hover:-translate-y-0.5 hover:shadow-lg w-full text-left"
      style={{
        background: "oklch(0.18 0.05 30 / 0.9)",
        borderColor: "oklch(0.75 0.14 75 / 0.15)",
      }}
      onClick={() => onSelect(design)}
      data-ocid={`mehndi.card.${design.id}`}
    >
      {/* Placeholder design area */}
      <div
        className="h-40 flex flex-col items-center justify-center gap-2 relative"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 35 / 0.8) 0%, oklch(0.16 0.06 25) 100%)",
        }}
      >
        <span className="text-5xl">{design.emoji}</span>
        <span className="text-xs text-amber-300/60 font-medium">
          {design.style} Style
        </span>
        <div className="absolute top-3 right-3">
          <Badge
            className={`text-xs border ${COMPLEXITY_COLORS[design.complexity]}`}
          >
            {design.complexity}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
          {design.name}
        </h3>
        <p className="text-xs text-amber-300/70 mb-2">{design.nameHindi}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {design.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3 text-amber-400" />
            {design.timeRequired}
          </div>
          <Badge
            variant="outline"
            className="text-xs border-amber-500/20 text-amber-300/70"
          >
            {design.occasion}
          </Badge>
        </div>
      </div>
    </button>
  );
}

function DesignModal({
  design,
  onClose,
}: { design: MehndiDesign; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-xl max-h-[90vh] overflow-y-auto border"
        style={{
          background: "oklch(0.14 0.05 30)",
          borderColor: "oklch(0.75 0.14 75 / 0.25)",
        }}
        data-ocid="mehndi.dialog"
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{design.emoji}</span>
            <div>
              <DialogTitle className="text-lg text-foreground">
                {design.name}
              </DialogTitle>
              <p className="text-amber-300/70 text-sm">{design.nameHindi}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex flex-wrap gap-2">
            <Badge className={`border ${COMPLEXITY_COLORS[design.complexity]}`}>
              {design.complexity}
            </Badge>
            <Badge
              variant="outline"
              className="border-amber-500/25 text-amber-300/70"
            >
              {design.style}
            </Badge>
            <Badge
              variant="outline"
              className="border-amber-500/25 text-amber-300/70"
            >
              {design.occasion}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3 text-amber-400" />
              {design.timeRequired}
            </div>
          </div>

          <div
            className="rounded-lg p-4"
            style={{ background: "oklch(0.20 0.06 30 / 0.7)" }}
          >
            <p className="text-sm text-muted-foreground">
              {design.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <span>🎨</span> Design Elements
            </h4>
            <div className="flex flex-wrap gap-2">
              {design.elements.map((el) => (
                <Badge
                  key={el}
                  variant="outline"
                  className="text-xs border-amber-500/20 text-amber-200/70"
                >
                  {el}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" /> Expert Tips
            </h4>
            <ul className="space-y-2">
              {design.tips.map((tip, tipIdx) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">
                    {tipIdx + 1}.
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Button
            className="flex-1"
            style={{
              background: "oklch(0.72 0.18 55)",
              color: "oklch(0.10 0.03 30)",
            }}
            data-ocid="mehndi.download_button"
            onClick={() => alert("Image download feature coming soon!")}
          >
            <Download className="w-4 h-4 mr-2" /> Download Design
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            style={{ borderColor: "oklch(0.75 0.14 75 / 0.3)" }}
            data-ocid="mehndi.close_button"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MehndiCollection() {
  const { language } = useLanguage();
  const [search, setSearch] = useState("");
  const [styleFilter, setStyleFilter] = useState<MehndiStyle | "All">("All");
  const [complexityFilter, setComplexityFilter] = useState<
    MehndiComplexity | "All"
  >("All");
  const [selected, setSelected] = useState<MehndiDesign | null>(null);

  const t = (hi: string, en: string) => (language === "hi" ? hi : en);

  const filtered = useMemo(() => {
    return MEHNDI_DESIGNS.filter((d) => {
      if (styleFilter !== "All" && d.style !== styleFilter) return false;
      if (complexityFilter !== "All" && d.complexity !== complexityFilter)
        return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.style.toLowerCase().includes(q) ||
          d.occasion.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [styleFilter, complexityFilter, search]);

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
        <div className="text-5xl mb-3">🌿</div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {t("मेहंदी संग्रह", "Mehndi Collection")}
        </h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          {t(
            "दुल्हन, त्योहार, अरबी, राजस्थानी और सरल मेहंदी डिज़ाइन — टिप्स और तकनीक के साथ",
            "Bridal, festival, Arabic, Rajasthani and simple designs — with tips and techniques",
          )}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {MEHNDI_STYLES.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={styleFilter === s ? "default" : "outline"}
              onClick={() => setStyleFilter(styleFilter === s ? "All" : s)}
              className="text-xs gap-1.5"
              style={
                styleFilter === s
                  ? {
                      background: "oklch(0.72 0.18 55)",
                      color: "oklch(0.10 0.03 30)",
                    }
                  : { borderColor: "oklch(0.75 0.14 75 / 0.25)" }
              }
              data-ocid={`mehndi.style_tab.${s.toLowerCase()}`}
            >
              {STYLE_EMOJIS[s]} {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("मेहंदी खोजें...", "Search designs...")}
              className="pl-9"
              style={{
                background: "oklch(0.18 0.05 30)",
                borderColor: "oklch(0.75 0.14 75 / 0.2)",
              }}
              data-ocid="mehndi.search_input"
            />
          </div>
          <Select
            value={complexityFilter}
            onValueChange={(v) =>
              setComplexityFilter(v as MehndiComplexity | "All")
            }
          >
            <SelectTrigger
              className="w-36"
              style={{
                background: "oklch(0.18 0.05 30)",
                borderColor: "oklch(0.75 0.14 75 / 0.2)",
              }}
              data-ocid="mehndi.complexity_select"
            >
              <SelectValue placeholder="Complexity" />
            </SelectTrigger>
            <SelectContent style={{ background: "oklch(0.18 0.05 30)" }}>
              <SelectItem value="All">All Levels</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Complex">Complex</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground ml-auto">
            {filtered.length} {t("डिज़ाइन", "designs")}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16" data-ocid="mehndi.empty_state">
            <div className="text-5xl mb-3">🌿</div>
            <p className="text-muted-foreground">
              {t("कोई डिज़ाइन नहीं मिला", "No designs found")}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearch("");
                setStyleFilter("All");
                setComplexityFilter("All");
              }}
              data-ocid="mehndi.clear_filters_button"
            >
              {t("फ़िल्टर हटाएं", "Clear filters")}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((design, i) => (
              <div key={design.id} data-ocid={`mehndi.item.${i + 1}`}>
                <DesignCard design={design} onSelect={setSelected} />
              </div>
            ))}
          </div>
        )}

        {/* Tips section */}
        <div
          className="mt-10 rounded-xl p-6 border"
          style={{
            background: "oklch(0.18 0.06 35 / 0.6)",
            borderColor: "oklch(0.75 0.14 75 / 0.15)",
          }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {t("🌿 मेहंदी लगाने के सुझाव", "🌿 General Mehndi Tips")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                hi: "मेहंदी लगाने से पहले त्वचा को साफ और तेल-रहित रखें",
                en: "Keep skin clean and oil-free before application",
              },
              {
                hi: "सूखने के बाद नींबू-चीनी का मिश्रण लगाएं गहरे रंग के लिए",
                en: "Apply lemon-sugar mix after drying for deeper color",
              },
              {
                hi: "मेहंदी उतारते समय खुरचें, पानी से न धोएं",
                en: "Scrape off dried mehndi; don't wash immediately",
              },
              {
                hi: "सोने से पहले टिशू में लपेटें रंग गहरा करने के लिए",
                en: "Wrap in tissue overnight for darker staining",
              },
            ].map((tip) => (
              <div
                key={tip.en}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-amber-400 flex-shrink-0">✓</span>
                {language === "hi" ? tip.hi : tip.en}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <DesignModal design={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
