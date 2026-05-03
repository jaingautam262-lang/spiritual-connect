import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bell, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import type { MantraItem } from "../data/mantraData";
import { SEED_MANTRAS } from "../data/mantraData";
import { useGetAllDevotionalContents } from "../hooks/useQueries";

type FaithFilter = "All" | "Hindu" | "Jain" | "Sikh";

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

export default function Mantra() {
  const [searchQuery, setSearchQuery] = useState("");
  const [faithFilter, setFaithFilter] = useState<FaithFilter>("All");
  const [selectedMantra, setSelectedMantra] = useState<MantraItem | null>(null);
  const [activeTab, setActiveTab] = useState<
    "mantra" | "transliteration" | "meaning"
  >("mantra");
  const { data: backendContents = [] } = useGetAllDevotionalContents();
  const { t } = useLanguage();

  const backendMantras: MantraItem[] = backendContents
    .filter((c) => c.contentType === "mantra")
    .map((c) => ({
      id: c.id,
      titleEn: c.title,
      titleHi: c.title,
      deity: c.deity,
      faith: "Hindu" as const,
      mantraText: c.lyrics,
      transliteration: "",
      meaning: "",
      description: `${c.lyrics.slice(0, 120)}...`,
    }));

  const allMantras = useMemo(() => {
    const combined = [...SEED_MANTRAS, ...backendMantras];
    const unique = new Map(combined.map((m) => [m.id, m]));
    return Array.from(unique.values());
  }, [backendMantras]);

  const filtered = useMemo(() => {
    return allMantras.filter((m) => {
      const matchesFaith = faithFilter === "All" || m.faith === faithFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        m.titleEn.toLowerCase().includes(q) ||
        m.titleHi.toLowerCase().includes(q) ||
        m.deity.toLowerCase().includes(q);
      return matchesFaith && matchesSearch;
    });
  }, [allMantras, faithFilter, searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.05 22)" }}>
      {/* Hero */}
      <section
        className="relative py-16 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.12 170) 0%, oklch(0.24 0.10 155) 50%, oklch(0.18 0.12 170) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, oklch(0.65 0.18 160) 0%, transparent 60%), radial-gradient(circle at 75% 50%, oklch(0.78 0.14 75) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto text-center relative z-10">
          <div className="text-6xl mb-4">🔔</div>
          <h1
            className="font-decorative text-4xl md:text-5xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("mantra")} {t("all") === "सभी" ? "संग्रह" : "Sangrah"}
          </h1>
          <p
            className="font-body text-xl mb-1"
            style={{ color: "oklch(0.88 0.08 65)", fontFamily: "serif" }}
          >
            मंत्र संग्रह
          </p>
          <p
            className="font-body text-sm mt-3"
            style={{ color: "oklch(0.68 0.06 60)" }}
          >
            {filtered.length} Sacred Mantras — Sanskrit text, transliteration &
            meaning
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
                data-ocid="mantra.search_input"
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
            <div className="flex gap-1.5">
              {(["All", "Hindu", "Jain", "Sikh"] as FaithFilter[]).map((f) => (
                <button
                  type="button"
                  key={f}
                  data-ocid={`mantra.${f.toLowerCase()}.tab`}
                  onClick={() => setFaithFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-heading font-medium transition-all"
                  style={{
                    background:
                      faithFilter === f
                        ? "oklch(0.55 0.18 160)"
                        : "oklch(0.22 0.07 24)",
                    color: faithFilter === f ? "white" : "oklch(0.78 0.06 60)",
                    border: "1px solid",
                    borderColor:
                      faithFilter === f
                        ? "oklch(0.55 0.18 160)"
                        : "oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  {f === "All" ? t("all") : t(f.toLowerCase())}
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
            <div data-ocid="mantra.empty_state" className="text-center py-20">
              <div className="text-5xl mb-4">🔔</div>
              <p
                className="font-heading text-lg"
                style={{ color: "oklch(0.60 0.06 55)" }}
              >
                {t("noMantrasFound")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((mantra, idx) => {
                const faithStyle = FAITH_COLORS[mantra.faith];
                return (
                  <button
                    type="button"
                    key={mantra.id}
                    data-ocid={`mantra.item.${idx + 1}`}
                    onClick={() => {
                      setSelectedMantra(mantra);
                      setActiveTab("mantra");
                    }}
                    className="text-left p-5 rounded-xl border transition-all duration-200 hover:scale-[1.02] group cursor-pointer"
                    style={{
                      background: "oklch(0.20 0.07 24)",
                      borderColor: "oklch(0.78 0.14 75 / 0.15)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.55 0.18 160 / 0.45)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 0 20px oklch(0.55 0.18 160 / 0.10)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "oklch(0.78 0.14 75 / 0.15)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <Bell
                        className="h-5 w-5 mt-0.5"
                        style={{ color: "oklch(0.55 0.18 160)" }}
                      />
                      <span
                        className="text-xs font-heading font-semibold px-2 py-0.5 rounded-full border"
                        style={{
                          background: faithStyle.bg,
                          color: faithStyle.text,
                          borderColor: faithStyle.border,
                        }}
                      >
                        {mantra.faith}
                      </span>
                    </div>
                    <h3
                      className="font-heading font-bold text-base mb-1 group-hover:underline"
                      style={{ color: "oklch(0.88 0.06 75)" }}
                    >
                      {mantra.titleEn}
                    </h3>
                    <p
                      className="font-body text-sm mb-2"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {mantra.titleHi}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs mb-3 font-body"
                      style={{
                        borderColor: "oklch(0.55 0.18 160 / 0.3)",
                        color: "oklch(0.55 0.18 160)",
                      }}
                    >
                      {mantra.deity}
                    </Badge>
                    {/* Mantra preview */}
                    <div
                      className="p-3 rounded-lg mb-3"
                      style={{
                        background: "oklch(0.24 0.07 26)",
                        borderLeft: "3px solid oklch(0.55 0.18 160 / 0.5)",
                      }}
                    >
                      <p
                        className="font-body text-xs leading-relaxed line-clamp-3"
                        style={{
                          color: "oklch(0.75 0.04 65)",
                          fontFamily: "serif",
                        }}
                      >
                        {mantra.mantraText.split("\n").slice(0, 2).join("\n")}
                        ...
                      </p>
                    </div>
                    <p
                      className="font-body text-xs leading-relaxed line-clamp-2"
                      style={{ color: "oklch(0.60 0.04 55)" }}
                    >
                      {mantra.description}
                    </p>
                    <div className="mt-4 flex gap-3 text-xs font-heading">
                      <span style={{ color: "oklch(0.55 0.18 160)" }}>
                        Sanskrit
                      </span>
                      <span style={{ color: "oklch(0.50 0.04 50)" }}>·</span>
                      <span style={{ color: "oklch(0.55 0.18 160)" }}>
                        Transliteration
                      </span>
                      <span style={{ color: "oklch(0.50 0.04 50)" }}>·</span>
                      <span style={{ color: "oklch(0.55 0.18 160)" }}>
                        {t("readFullMantra")}
                      </span>
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
        open={!!selectedMantra}
        onOpenChange={(open) => !open && setSelectedMantra(null)}
      >
        <DialogContent
          className="max-w-2xl max-h-[85vh] overflow-y-auto"
          data-ocid="mantra.dialog"
          style={{
            background: "oklch(0.18 0.07 22)",
            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
          }}
        >
          {selectedMantra && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <DialogTitle
                      className="font-decorative text-xl"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {selectedMantra.titleEn}
                    </DialogTitle>
                    <p
                      className="font-body text-sm mt-1"
                      style={{
                        color: "oklch(0.70 0.06 65)",
                        fontFamily: "serif",
                      }}
                    >
                      {selectedMantra.titleHi}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className="font-body"
                      style={{
                        background: FAITH_COLORS[selectedMantra.faith].bg,
                        color: FAITH_COLORS[selectedMantra.faith].text,
                      }}
                    >
                      {selectedMantra.faith}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-body"
                      style={{
                        borderColor: "oklch(0.55 0.18 160 / 0.4)",
                        color: "oklch(0.55 0.18 160)",
                      }}
                    >
                      {selectedMantra.deity}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <p
                className="font-body text-sm mt-2"
                style={{ color: "oklch(0.65 0.04 55)" }}
              >
                {selectedMantra.description}
              </p>

              {/* Tab buttons */}
              <div className="flex gap-2 mt-3">
                {[
                  { key: "mantra", label: "मंत्र (Sanskrit)" },
                  { key: "transliteration", label: "Transliteration" },
                  { key: "meaning", label: "Meaning" },
                ].map((tab) => (
                  <Button
                    key={tab.key}
                    data-ocid={`mantra.${tab.key}.tab`}
                    size="sm"
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className="font-heading text-xs"
                    style={
                      activeTab === tab.key
                        ? { background: "oklch(0.55 0.18 160)", color: "white" }
                        : {
                            borderColor: "oklch(0.55 0.18 160 / 0.4)",
                            color: "oklch(0.55 0.18 160)",
                            background: "transparent",
                            border: "1px solid",
                          }
                    }
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>

              <div
                className="mt-4 p-5 rounded-xl border"
                style={{
                  background: "oklch(0.22 0.07 24)",
                  borderColor: "oklch(0.55 0.18 160 / 0.20)",
                }}
              >
                <pre
                  className="font-body text-sm leading-relaxed whitespace-pre-wrap"
                  style={{
                    color: "oklch(0.88 0.04 70)",
                    fontFamily: activeTab === "mantra" ? "serif" : "inherit",
                    fontSize: activeTab === "mantra" ? "1.05rem" : "0.875rem",
                  }}
                >
                  {activeTab === "mantra" && selectedMantra.mantraText}
                  {activeTab === "transliteration" &&
                    (selectedMantra.transliteration ||
                      "Transliteration not available.")}
                  {activeTab === "meaning" &&
                    (selectedMantra.meaning || "Meaning not available.")}
                </pre>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  data-ocid="mantra.close_button"
                  variant="outline"
                  onClick={() => setSelectedMantra(null)}
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
