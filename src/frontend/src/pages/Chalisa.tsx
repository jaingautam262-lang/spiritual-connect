import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import { useLanguage } from "../contexts/LanguageContext";
import { SEED_CHALISAS } from "../data/chalisaData";
import type { ChalisaItem } from "../data/chalisaData";
import { useGetAllDevotionalContents } from "../hooks/useQueries";

type CategoryFilter =
  | "All"
  | "Most Popular"
  | "Devi"
  | "Shiva"
  | "Vishnu"
  | "Ganesha"
  | "Ram"
  | "Saints"
  | "Navgrah"
  | "Shakti"
  | "Krishna"
  | "Others"
  | "Jain";

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Most Popular",
  "Devi",
  "Shiva",
  "Vishnu",
  "Ganesha",
  "Ram",
  "Saints",
  "Navgrah",
  "Shakti",
  "Krishna",
  "Others",
  "Jain",
];

export default function Chalisa() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [selectedChalisa, setSelectedChalisa] = useState<ChalisaItem | null>(
    null,
  );
  const [showHindi, setShowHindi] = useState(true);
  const { data: backendContents = [] } = useGetAllDevotionalContents();
  const { t } = useLanguage();

  const backendChalisas: ChalisaItem[] = backendContents
    .filter((c) => c.contentType === "chalisa")
    .map((c) => ({
      id: c.id,
      titleEn: c.title,
      titleHi: c.title,
      deity: c.deity,
      category: "Other",
      description: `${c.lyrics.slice(0, 120)}...`,
      textHi: c.language === "hi" ? c.lyrics : "",
      textEn: c.language === "en" ? c.lyrics : c.title,
    }));

  const allChalisas = useMemo(() => {
    const combined = [...SEED_CHALISAS, ...backendChalisas];
    const unique = new Map(combined.map((c) => [c.id, c]));
    return Array.from(unique.values());
  }, [backendChalisas]);

  const filtered = useMemo(() => {
    return allChalisas.filter((c) => {
      const matchesCat =
        categoryFilter === "All" || c.category === categoryFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        c.titleEn.toLowerCase().includes(q) ||
        c.titleHi.toLowerCase().includes(q) ||
        c.deity.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [allChalisas, categoryFilter, searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.12 270) 0%, oklch(0.26 0.10 290) 50%, oklch(0.20 0.12 270) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.70 0.14 280) 0%, transparent 60%), radial-gradient(circle at 70% 50%, oklch(0.78 0.14 75) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-6xl mb-4">📖</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("chalisa")} {t("all") === "सभी" ? "संग्रह" : "Sangrah"}
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)", fontFamily: "serif" }}
          >
            चालीसा संग्रह
          </p>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "oklch(0.68 0.06 60)" }}
          >
            {filtered.length} Sacred Chalisas — 40-Verse Devotional Hymns
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
                data-ocid="chalisa.search_input"
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
            <div className="flex flex-nowrap overflow-x-auto gap-1.5 pb-1 max-w-full">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  data-ocid={`chalisa.${cat.toLowerCase().replace(/\s+/g, "_")}.tab`}
                  onClick={() => setCategoryFilter(cat)}
                  className="px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all"
                  style={{
                    background:
                      categoryFilter === cat
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.22 0.07 24)",
                    color:
                      categoryFilter === cat ? "white" : "oklch(0.78 0.06 60)",
                    border: "1px solid",
                    borderColor:
                      categoryFilter === cat
                        ? "oklch(0.68 0.20 48)"
                        : "oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  {cat === "All"
                    ? t("all")
                    : cat === "Most Popular"
                      ? t("all") === "सभी"
                        ? "सबसे लोकप्रिय"
                        : cat
                      : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div data-ocid="chalisa.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">📖</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                {t("noChalisasFound")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((chalisa, idx) => (
                <button
                  type="button"
                  key={chalisa.id}
                  data-ocid={`chalisa.item.${idx + 1}`}
                  onClick={() => {
                    setSelectedChalisa(chalisa);
                    setShowHindi(true);
                  }}
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
                    <BookOpen
                      className="h-5 w-5 mt-0.5"
                      style={{ color: "oklch(0.70 0.14 280)" }}
                    />
                    <Badge
                      variant="outline"
                      className="text-xs font-heading"
                      style={{
                        borderColor: "oklch(0.70 0.14 280 / 0.4)",
                        color: "oklch(0.70 0.14 280)",
                      }}
                    >
                      {chalisa.category}
                    </Badge>
                  </div>
                  <h3
                    className="font-heading font-bold text-base mb-1 group-hover:underline"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {chalisa.titleEn}
                  </h3>
                  <p
                    className="font-body text-sm mb-2"
                    style={{
                      color: "oklch(0.70 0.06 65)",
                      fontFamily: "serif",
                    }}
                  >
                    {chalisa.titleHi}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs mb-3 font-body"
                    style={{
                      borderColor: "oklch(0.68 0.20 48 / 0.3)",
                      color: "oklch(0.68 0.20 48)",
                    }}
                  >
                    {chalisa.deity}
                  </Badge>
                  <p
                    className="font-body text-xs leading-relaxed line-clamp-2"
                    style={{ color: "oklch(0.60 0.04 55)" }}
                  >
                    {chalisa.description}
                  </p>
                  <div
                    className="mt-4 text-xs font-heading font-semibold flex items-center gap-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    <span>{t("all") === "सभी" ? "40 श्लोक" : "40 Verses"}</span>
                    <span style={{ color: "oklch(0.50 0.04 50)" }}>·</span>
                    <span>{t("readFullChalisa")}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog
        open={!!selectedChalisa}
        onOpenChange={(open) => !open && setSelectedChalisa(null)}
      >
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="chalisa.dialog"
          style={{
            background: "oklch(0.18 0.07 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          {selectedChalisa && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <DialogTitle
                      className="font-decorative text-xl"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {selectedChalisa.titleEn}
                    </DialogTitle>
                    <p
                      className="font-body text-sm mt-1"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {selectedChalisa.titleHi}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className="font-body"
                      style={{
                        borderColor: "oklch(0.70 0.14 280 / 0.4)",
                        color: "oklch(0.70 0.14 280)",
                      }}
                    >
                      {selectedChalisa.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-body"
                      style={{
                        borderColor: "oklch(0.68 0.20 48 / 0.4)",
                        color: "oklch(0.68 0.20 48)",
                      }}
                    >
                      {selectedChalisa.deity}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex gap-2 mt-2">
                <Button
                  data-ocid="chalisa.hindi.toggle"
                  size="sm"
                  onClick={() => setShowHindi(true)}
                  className="font-heading text-xs"
                  style={
                    showHindi
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.68 0.20 48 / 0.4)",
                          color: "oklch(0.68 0.20 48)",
                          background: "transparent",
                          border: "1px solid",
                        }
                  }
                >
                  हिंदी
                </Button>
                <Button
                  data-ocid="chalisa.english.toggle"
                  size="sm"
                  onClick={() => setShowHindi(false)}
                  className="font-heading text-xs"
                  style={
                    !showHindi
                      ? { background: "oklch(0.68 0.20 48)", color: "white" }
                      : {
                          borderColor: "oklch(0.68 0.20 48 / 0.4)",
                          color: "oklch(0.68 0.20 48)",
                          background: "transparent",
                          border: "1px solid",
                        }
                  }
                >
                  English
                </Button>
              </div>

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
                    fontFamily: showHindi ? "serif" : "inherit",
                  }}
                >
                  {showHindi ? selectedChalisa.textHi : selectedChalisa.textEn}
                </pre>
              </div>

              {/* Audio Player */}
              <AudioPlayer
                title={selectedChalisa?.titleEn ?? ""}
                youtubeSearchQuery={`${selectedChalisa?.titleEn ?? ""} chalisa bhajan`}
              />

              <div className="flex justify-end mt-4">
                <Button
                  data-ocid="chalisa.close_button"
                  variant="outline"
                  onClick={() => setSelectedChalisa(null)}
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
