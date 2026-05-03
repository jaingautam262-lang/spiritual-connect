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
import { BookOpen, MapPin, Search, Star, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  ALL_GURUS,
  type Guru,
  type GuruFaith,
  HINDU_GURUS,
  JAIN_ACHARYAS,
  SIKH_GURUS,
} from "../data/guruData";

const FAITH_TABS: {
  value: GuruFaith | "All";
  label: string;
  labelHi: string;
  emoji: string;
  count: number;
}[] = [
  {
    value: "All",
    label: "All Gurus",
    labelHi: "सभी गुरु",
    emoji: "🕉️",
    count: ALL_GURUS.length,
  },
  {
    value: "Hindu",
    label: "Hindu Saints",
    labelHi: "हिंदू संत",
    emoji: "🔱",
    count: HINDU_GURUS.length,
  },
  {
    value: "Jain",
    label: "Jain Acharyas",
    labelHi: "जैन आचार्य",
    emoji: "☸️",
    count: JAIN_ACHARYAS.length,
  },
  {
    value: "Sikh",
    label: "Sikh Gurus",
    labelHi: "सिख गुरु",
    emoji: "🪯",
    count: SIKH_GURUS.length,
  },
];

const FAITH_BADGE_CLASSES: Record<GuruFaith, string> = {
  Hindu: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Jain: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Sikh: "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

function GuruCard({
  guru,
  onSelect,
}: { guru: Guru; onSelect: (g: Guru) => void }) {
  return (
    <button
      type="button"
      className="rounded-xl border p-5 cursor-pointer transition-all hover:border-amber-500/40 hover:shadow-lg hover:-translate-y-0.5 text-left w-full"
      style={{
        background: "oklch(0.18 0.05 30 / 0.9)",
        borderColor: "oklch(0.75 0.14 75 / 0.15)",
      }}
      onClick={() => onSelect(guru)}
      data-ocid={`guru.card.${guru.id}`}
    >
      <div className="flex items-start gap-4">
        <div
          className="text-3xl flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl"
          style={{ background: "oklch(0.25 0.08 40 / 0.8)" }}
        >
          {guru.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground text-base">
              {guru.name}
            </h3>
            <Badge
              className={`text-xs border ${FAITH_BADGE_CLASSES[guru.faith]}`}
            >
              {guru.faith}
            </Badge>
          </div>
          <p className="text-sm text-amber-300/70 font-medium mb-1">
            {guru.nameHindi}
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            {guru.period} · {guru.tradition}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {guru.known_for}
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <MapPin className="w-3 h-3 text-amber-400/60" />
            <span className="text-xs text-muted-foreground">
              {guru.birth_place}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function GuruModal({ guru, onClose }: { guru: Guru; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto border"
        style={{
          background: "oklch(0.14 0.05 30)",
          borderColor: "oklch(0.75 0.14 75 / 0.25)",
        }}
        data-ocid="guru.dialog"
      >
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div
              className="text-4xl w-16 h-16 flex items-center justify-center rounded-xl flex-shrink-0"
              style={{ background: "oklch(0.22 0.08 40)" }}
            >
              {guru.emoji}
            </div>
            <div>
              <DialogTitle className="text-xl text-foreground">
                {guru.name}
              </DialogTitle>
              <p className="text-amber-300/80 text-sm">{guru.nameHindi}</p>
              <p className="text-muted-foreground text-xs mt-1">
                {guru.period} · {guru.tradition}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          <div
            className="rounded-lg p-4"
            style={{ background: "oklch(0.20 0.06 30 / 0.7)" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">
                Known For
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{guru.known_for}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-foreground">
                Core Teachings
              </span>
            </div>
            <ul className="space-y-2">
              {guru.teachings.map((teaching) => (
                <li
                  key={teaching}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{teaching}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Biography
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {guru.biography}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-muted-foreground">Birth Place:</span>
            <span className="text-foreground font-medium">
              {guru.birth_place}
            </span>
          </div>
        </div>

        <Button
          onClick={onClose}
          variant="outline"
          className="mt-4 w-full"
          style={{ borderColor: "oklch(0.75 0.14 75 / 0.3)" }}
          data-ocid="guru.close_button"
        >
          <X className="w-4 h-4 mr-2" /> Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default function GurugDirectory() {
  const { language } = useLanguage();
  const [tab, setTab] = useState<GuruFaith | "All">("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Guru | null>(null);

  const t = (hi: string, en: string) => (language === "hi" ? hi : en);

  const filtered = useMemo(() => {
    const base =
      tab === "All" ? ALL_GURUS : ALL_GURUS.filter((g) => g.faith === tab);
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.nameHindi.includes(q) ||
        g.tradition.toLowerCase().includes(q) ||
        g.known_for.toLowerCase().includes(q),
    );
  }, [tab, search]);

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
          {t("गुरु निर्देशिका", "Guru Directory")}
        </h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          {t(
            "हिंदू संत, जैन आचार्य और सिख गुरुओं की जीवनी, शिक्षाएं और उनके योगदान",
            "Biographies, teachings and contributions of Hindu Saints, Jain Acharyas and Sikh Gurus",
          )}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("गुरु खोजें...", "Search gurus...")}
            className="pl-9"
            style={{
              background: "oklch(0.18 0.05 30)",
              borderColor: "oklch(0.75 0.14 75 / 0.2)",
            }}
            data-ocid="guru.search_input"
          />
        </div>

        {/* Tabs */}
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as GuruFaith | "All")}
          className="mb-6"
        >
          <TabsList
            className="flex flex-wrap gap-1 h-auto p-1"
            style={{ background: "oklch(0.18 0.05 30 / 0.8)" }}
          >
            {FAITH_TABS.map((ft) => (
              <TabsTrigger
                key={ft.value}
                value={ft.value}
                className="flex items-center gap-1.5 text-xs"
                data-ocid={`guru.tab.${ft.value.toLowerCase()}`}
              >
                {ft.emoji} {t(ft.labelHi, ft.label)}
                <span className="ml-1 opacity-60 text-xs">({ft.count})</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {FAITH_TABS.map((ft) => (
            <TabsContent key={ft.value} value={ft.value}>
              {filtered.length === 0 ? (
                <div className="text-center py-16" data-ocid="guru.empty_state">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-muted-foreground">
                    {t("कोई गुरु नहीं मिला", "No gurus found")}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((guru) => (
                    <GuruCard
                      key={guru.id}
                      guru={guru}
                      onSelect={setSelected}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-4 mt-8 rounded-xl p-4"
          style={{
            background: "oklch(0.18 0.05 30 / 0.6)",
            borderColor: "oklch(0.75 0.14 75 / 0.1)",
          }}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400">
              {HINDU_GURUS.length}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("हिंदू संत", "Hindu Saints")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              {JAIN_ACHARYAS.length}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("जैन आचार्य", "Jain Acharyas")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {SIKH_GURUS.length}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("सिख गुरु", "Sikh Gurus")}
            </p>
          </div>
        </div>
      </div>

      {selected && (
        <GuruModal guru={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
