import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { useLanguage } from "../contexts/LanguageContext";
import { type AartiItem, SEED_AARTIS } from "../data/aartiData";
import { useGetAllDevotionalContents } from "../hooks/useQueries";

export type { AartiItem };

type FaithFilter = "All" | "Hindu" | "Jain" | "Sikh";
type LyricTab = "hindi" | "english" | "original";

const FAITH_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Hindu: {
    bg: "oklch(0.68 0.20 48 / 0.15)",
    text: "oklch(0.68 0.20 48)",
    border: "oklch(0.68 0.20 48 / 0.4)",
  },
  Jain: {
    bg: "oklch(0.55 0.18 145 / 0.15)",
    text: "oklch(0.45 0.18 145)",
    border: "oklch(0.55 0.18 145 / 0.4)",
  },
  Sikh: {
    bg: "oklch(0.45 0.15 250 / 0.15)",
    text: "oklch(0.55 0.18 250)",
    border: "oklch(0.45 0.15 250 / 0.4)",
  },
};

/** Returns true if this aarti has original-script content to display */
function hasOriginalScript(item: AartiItem): boolean {
  return !!(
    (item.faith === "Jain" && item.prakritText) ||
    (item.faith === "Sikh" && item.gurmukhi)
  );
}

/** Label for the original-script tab */
function originalScriptLabel(item: AartiItem): string {
  if (item.faith === "Sikh") return "ਗੁਰਮੁਖੀ";
  return "मूल लिपि";
}

/** Subtitle hint below the tab label */
function originalScriptSublabel(item: AartiItem): string {
  if (item.faith === "Sikh") return "Gurmukhi";
  return "Prakrit / Apabhramsha";
}

export default function Aarti() {
  const [searchQuery, setSearchQuery] = useState("");
  const [faithFilter, setFaithFilter] = useState<FaithFilter>("All");
  const [selectedAarti, setSelectedAarti] = useState<AartiItem | null>(null);
  const [activeTab, setActiveTab] = useState<LyricTab>("hindi");
  const { data: backendContents = [] } = useGetAllDevotionalContents();
  const { t } = useLanguage();

  const backendAartis: AartiItem[] = backendContents
    .filter((c) => c.contentType === "aarti")
    .map((c) => ({
      id: c.id,
      titleEn: c.title,
      titleHi: c.title,
      deity: c.deity,
      faith: "Hindu" as const,
      description: `${c.lyrics.slice(0, 120)}...`,
      lyricsHi: c.language === "hi" ? c.lyrics : "",
      lyricsEn: c.language === "en" ? c.lyrics : c.title,
    }));

  const allAartis = useMemo(() => {
    const combined = [...SEED_AARTIS, ...backendAartis];
    const unique = new Map(combined.map((a) => [a.id, a]));
    return Array.from(unique.values());
  }, [backendAartis]);

  const filtered = useMemo(() => {
    return allAartis.filter((a) => {
      const matchesFaith = faithFilter === "All" || a.faith === faithFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        a.titleEn.toLowerCase().includes(q) ||
        a.titleHi.toLowerCase().includes(q) ||
        a.deity.toLowerCase().includes(q);
      return matchesFaith && matchesSearch;
    });
  }, [allAartis, faithFilter, searchQuery]);

  function openAarti(aarti: AartiItem) {
    setSelectedAarti(aarti);
    setActiveTab("hindi");
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero Banner */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.10 30) 0%, oklch(0.28 0.12 45) 50%, oklch(0.22 0.10 30) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(0.78 0.14 75) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.68 0.20 48) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-6xl mb-4">🪔</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("aarti")} {t("all") === "सभी" ? "संग्रह" : "Sangrah"}
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)" }}
          >
            आरती संग्रह
          </p>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "oklch(0.68 0.06 60)" }}
          >
            {filtered.length} Sacred Aartis — Hindu · Jain · Sikh
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section
        className="sticky top-16 z-30 py-4 px-4 border-b"
        style={{
          background: "oklch(0.18 0.07 22)",
          borderColor: "oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.60 0.06 55)" }}
              />
              <Input
                data-ocid="aarti.search_input"
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border font-body"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  borderColor: "oklch(0.78 0.14 75 / 0.25)",
                  color: "oklch(0.90 0.04 70)",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X
                    className="h-4 w-4"
                    style={{ color: "oklch(0.60 0.06 55)" }}
                  />
                </button>
              )}
            </div>
            <Tabs
              value={faithFilter}
              onValueChange={(v) => setFaithFilter(v as FaithFilter)}
            >
              <TabsList style={{ background: "oklch(0.22 0.07 24)" }}>
                {(["All", "Hindu", "Jain", "Sikh"] as FaithFilter[]).map(
                  (f) => (
                    <TabsTrigger
                      key={f}
                      value={f}
                      data-ocid={`aarti.${f.toLowerCase()}.tab`}
                      className="text-xs font-heading"
                    >
                      {f === "All" ? t("all") : t(f.toLowerCase())}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div data-ocid="aarti.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">🪔</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                {t("noAartisFound")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((aarti, idx) => {
                const faithStyle = FAITH_COLORS[aarti.faith];
                return (
                  <button
                    type="button"
                    key={aarti.id}
                    data-ocid={`aarti.item.${idx + 1}`}
                    onClick={() => openAarti(aarti)}
                    className="text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.02] group cursor-pointer"
                    style={{
                      background: "oklch(0.20 0.07 24)",
                      borderColor: "oklch(0.78 0.14 75 / 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.78 0.14 75 / 0.45)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 20px oklch(0.78 0.14 75 / 0.10)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.78 0.14 75 / 0.15)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Flame
                        className="h-5 w-5 mt-0.5"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      />
                      <span
                        className="text-xs font-heading font-semibold px-2 py-0.5 rounded-full border"
                        style={{
                          background: faithStyle.bg,
                          color: faithStyle.text,
                          borderColor: faithStyle.border,
                        }}
                      >
                        {aarti.faith}
                      </span>
                    </div>
                    <h3
                      className="font-heading font-bold text-base mb-1 group-hover:underline"
                      style={{ color: "oklch(0.88 0.06 75)" }}
                    >
                      {aarti.titleEn}
                    </h3>
                    <p
                      className="font-body text-sm mb-2"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {aarti.titleHi}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs mb-3 font-body"
                      style={{
                        borderColor: "oklch(0.68 0.20 48 / 0.3)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {aarti.deity}
                    </Badge>
                    <p
                      className="font-body text-xs leading-relaxed line-clamp-2"
                      style={{ color: "oklch(0.60 0.04 55)" }}
                    >
                      {aarti.description}
                    </p>
                    {hasOriginalScript(aarti) && (
                      <div
                        className="mt-2 text-xs font-heading px-2 py-0.5 rounded-full inline-flex items-center gap-1 border"
                        style={{
                          background: "oklch(0.55 0.18 145 / 0.1)",
                          borderColor: "oklch(0.55 0.18 145 / 0.3)",
                          color: "oklch(0.55 0.18 145)",
                        }}
                      >
                        <span>✦</span>
                        <span>
                          {aarti.faith === "Sikh"
                            ? t("gurmukhiAvailable")
                            : t("prakritAvailable")}
                        </span>
                      </div>
                    )}
                    <div
                      className="mt-4 text-xs font-heading font-semibold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {t("readFullAarti")}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedAarti}
        onOpenChange={(open) => !open && setSelectedAarti(null)}
      >
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="aarti.dialog"
          style={{
            background: "oklch(0.18 0.07 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          {selectedAarti && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <DialogTitle
                      className="font-decorative text-xl"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {selectedAarti.titleEn}
                    </DialogTitle>
                    <p
                      className="font-body text-sm mt-1"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {selectedAarti.titleHi}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge
                      className="font-body"
                      style={{
                        background: FAITH_COLORS[selectedAarti.faith].bg,
                        color: FAITH_COLORS[selectedAarti.faith].text,
                      }}
                    >
                      {selectedAarti.faith}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-body"
                      style={{
                        borderColor: "oklch(0.68 0.20 48 / 0.4)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {selectedAarti.deity}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              {/* Tab switcher — 2 or 3 tabs depending on content */}
              <div className="flex gap-2 mt-2 flex-wrap">
                <Button
                  data-ocid="aarti.hindi.toggle"
                  size="sm"
                  variant={activeTab === "hindi" ? "default" : "outline"}
                  onClick={() => setActiveTab("hindi")}
                  className="font-heading text-xs"
                  style={
                    activeTab === "hindi"
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.68 0.20 48 / 0.4)",
                          color: "oklch(0.68 0.20 48)",
                        }
                  }
                >
                  हिंदी
                </Button>
                <Button
                  data-ocid="aarti.english.toggle"
                  size="sm"
                  variant={activeTab === "english" ? "default" : "outline"}
                  onClick={() => setActiveTab("english")}
                  className="font-heading text-xs"
                  style={
                    activeTab === "english"
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.68 0.20 48 / 0.4)",
                          color: "oklch(0.68 0.20 48)",
                        }
                  }
                >
                  English
                </Button>
                {hasOriginalScript(selectedAarti) && (
                  <Button
                    data-ocid="aarti.original.toggle"
                    size="sm"
                    variant={activeTab === "original" ? "default" : "outline"}
                    onClick={() => setActiveTab("original")}
                    className="font-heading text-xs"
                    style={
                      activeTab === "original"
                        ? {
                            background: "oklch(0.45 0.18 145)",
                            color: "white",
                          }
                        : {
                            borderColor: "oklch(0.45 0.18 145 / 0.5)",
                            color: "oklch(0.45 0.18 145)",
                          }
                    }
                  >
                    {originalScriptLabel(selectedAarti)}
                    <span
                      className="ml-1 text-[10px] opacity-70"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      ({originalScriptSublabel(selectedAarti)})
                    </span>
                  </Button>
                )}
              </div>

              {/* Hindi / English lyric view */}
              {activeTab !== "original" && (
                <div
                  className="mt-4 p-5 rounded-xl border"
                  style={{
                    background: "oklch(0.22 0.07 24)",
                    borderColor: "oklch(0.78 0.14 75 / 0.12)",
                  }}
                >
                  <pre
                    className="font-body text-sm leading-relaxed whitespace-pre-wrap"
                    style={{
                      color: "oklch(0.88 0.04 70)",
                      fontFamily: activeTab === "hindi" ? "serif" : "inherit",
                    }}
                  >
                    {activeTab === "hindi"
                      ? selectedAarti.lyricsHi
                      : selectedAarti.lyricsEn}
                  </pre>
                </div>
              )}

              {/* Original Script view — 2 columns: script | transliteration */}
              {activeTab === "original" && hasOriginalScript(selectedAarti) && (
                <div
                  className="mt-4 rounded-xl border overflow-hidden"
                  style={{
                    borderColor: "oklch(0.45 0.18 145 / 0.25)",
                  }}
                >
                  {/* Header row */}
                  <div
                    className="grid grid-cols-2 border-b"
                    style={{
                      background: "oklch(0.22 0.07 24)",
                      borderColor: "oklch(0.45 0.18 145 / 0.2)",
                    }}
                  >
                    <div
                      className="px-4 py-2 text-xs font-heading font-semibold border-r"
                      style={{
                        color: "oklch(0.45 0.18 145)",
                        borderColor: "oklch(0.45 0.18 145 / 0.2)",
                      }}
                    >
                      {selectedAarti.faith === "Sikh"
                        ? "ਗੁਰਮੁਖੀ ਲਿਪੀ — Gurmukhi Script"
                        : "प्राकृत / अपभ्रंश लिपि — Original Script"}
                    </div>
                    <div
                      className="px-4 py-2 text-xs font-heading font-semibold"
                      style={{ color: "oklch(0.68 0.06 60)" }}
                    >
                      Roman Transliteration
                    </div>
                  </div>

                  {/* Content row */}
                  <div
                    className="grid grid-cols-2"
                    style={{ background: "oklch(0.20 0.07 24)" }}
                  >
                    {/* Left: original script */}
                    <div
                      className="p-4 border-r"
                      style={{ borderColor: "oklch(0.45 0.18 145 / 0.15)" }}
                    >
                      <pre
                        className="text-sm leading-[1.9] whitespace-pre-wrap"
                        style={{
                          color: "oklch(0.90 0.04 70)",
                          fontFamily:
                            selectedAarti.faith === "Sikh"
                              ? "'Noto Sans Gurmukhi', serif"
                              : "serif",
                          fontSize:
                            selectedAarti.faith === "Sikh" ? "1rem" : "0.9rem",
                        }}
                      >
                        {selectedAarti.faith === "Sikh"
                          ? selectedAarti.gurmukhi
                          : selectedAarti.prakritText}
                      </pre>
                    </div>

                    {/* Right: transliteration */}
                    <div className="p-4">
                      {selectedAarti.originalTranslit ? (
                        <pre
                          className="font-body text-sm leading-[1.9] whitespace-pre-wrap"
                          style={{ color: "oklch(0.72 0.04 65)" }}
                        >
                          {selectedAarti.originalTranslit}
                        </pre>
                      ) : (
                        <p
                          className="font-body text-xs italic"
                          style={{ color: "oklch(0.55 0.04 55)" }}
                        >
                          Transliteration not yet available. The original script
                          is shown on the left.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer note */}
                  <div
                    className="px-4 py-2 text-xs font-body border-t"
                    style={{
                      background: "oklch(0.22 0.07 24)",
                      borderColor: "oklch(0.45 0.18 145 / 0.15)",
                      color: "oklch(0.55 0.04 55)",
                    }}
                  >
                    {selectedAarti.faith === "Sikh"
                      ? "ਗੁਰਬਾਣੀ — Gurbani in original Gurmukhi script as preserved in Sri Guru Granth Sahib Ji"
                      : "मूल प्राकृत / अपभ्रंश — Original Jain devotional language as composed by ancient Acharyas"}
                  </div>
                </div>
              )}

              {/* Audio Player */}
              <AudioPlayer
                title={selectedAarti?.titleEn ?? ""}
                youtubeSearchQuery={`${selectedAarti?.titleEn ?? ""} aarti bhajan`}
              />

              <div className="flex justify-end mt-4">
                <Button
                  data-ocid="aarti.close_button"
                  variant="outline"
                  onClick={() => setSelectedAarti(null)}
                  className="font-heading text-sm"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.3)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
