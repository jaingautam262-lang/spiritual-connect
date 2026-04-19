import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Search, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { SuktamMiniPlayer } from "../components/SuktamMiniPlayer";
import {
  ALL_SUKTAMS,
  type SuktamEntryExtended,
} from "../data/suktamData_newBatch";

type VedaFilter =
  | "All"
  | "Rigveda"
  | "Yajurveda"
  | "Atharvaveda"
  | "Tantric"
  | "Jain";
type GroupFilter = "All" | "अ-ध" | "न-भ" | "भ-व" | "व-ह";

const groupLabels: Record<string, string> = {
  "अ-ध": "अ से ध",
  "न-भ": "न से भ",
  "भ-व": "भ से व",
  "व-ह": "व से ह",
};

const vedaChipStyle = (veda: string) => {
  if (veda.includes("Rigveda")) return "oklch(0.45 0.18 200)";
  if (veda.includes("Yajurveda")) return "oklch(0.50 0.20 150)";
  if (veda.includes("Atharvaveda")) return "oklch(0.55 0.20 48)";
  if (veda.includes("Tantric")) return "oklch(0.45 0.22 320)";
  if (veda.includes("Jain")) return "oklch(0.45 0.18 200)";
  return "oklch(0.45 0.15 75)";
};

const vedaMatchesFilter = (vedaSource: string, filter: VedaFilter) => {
  if (filter === "All") return true;
  if (filter === "Rigveda") return vedaSource.includes("Rigveda");
  if (filter === "Yajurveda") return vedaSource.includes("Yajurveda");
  if (filter === "Atharvaveda") return vedaSource.includes("Atharvaveda");
  if (filter === "Tantric") return vedaSource.includes("Tantric");
  if (filter === "Jain") return vedaSource.includes("Jain");
  return true;
};

// ── Suktam Card ──────────────────────────────────────────────────────────────
function SuktamCard({
  suktam,
  index,
  onSelect,
}: {
  suktam: SuktamEntryExtended;
  index: number;
  onSelect: (s: SuktamEntryExtended) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-xl border p-4 flex flex-col gap-2 cursor-pointer group transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: "oklch(0.22 0.08 22)",
        borderColor: "oklch(0.78 0.14 75 / 0.18)",
      }}
      onClick={() => onSelect(suktam)}
      data-ocid="suktam.card"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3
            className="text-base font-bold leading-snug"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "'Noto Serif Devanagari', serif",
            }}
          >
            {suktam.nameHindi}
          </h3>
          <p
            className="text-xs mt-0.5 truncate"
            style={{ color: "oklch(0.70 0.06 60)" }}
          >
            {suktam.name}
          </p>
        </div>
        <span
          className="text-xs font-mono px-1.5 py-0.5 rounded shrink-0"
          style={{
            background: "oklch(0.78 0.14 75 / 0.12)",
            color: "oklch(0.78 0.14 75)",
          }}
        >
          {suktam.totalMantras} मंत्र
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{
            background: `${vedaChipStyle(suktam.vedaSource)}22`,
            color: vedaChipStyle(suktam.vedaSource),
            border: `1px solid ${vedaChipStyle(suktam.vedaSource)}44`,
          }}
        >
          {suktam.deity}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{
            background: "oklch(0.78 0.14 75 / 0.08)",
            color: "oklch(0.78 0.14 75 / 0.70)",
          }}
        >
          {suktam.vedaSource.split(" ")[0]}
        </span>
      </div>

      <p
        className="text-xs line-clamp-2 flex-1"
        style={{ color: "oklch(0.68 0.05 55)" }}
      >
        {suktam.shortDescription}
      </p>

      <button
        type="button"
        className="self-start text-xs font-semibold px-3 py-1 rounded-lg transition-all duration-200 mt-1 group-hover:shadow-md"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
          color: "white",
        }}
        data-ocid="suktam.read_button"
      >
        पढ़ें →
      </button>
    </motion.div>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function SuktamModal({
  suktam,
  onClose,
}: {
  suktam: SuktamEntryExtended | null;
  onClose: () => void;
}) {
  if (!suktam) return null;
  return (
    <Dialog open={!!suktam} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{
          background: "oklch(0.20 0.08 22)",
          border: "1px solid oklch(0.78 0.14 75 / 0.25)",
        }}
        data-ocid="suktam.modal"
      >
        <DialogHeader className="shrink-0">
          <DialogTitle
            className="text-xl font-bold"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "'Noto Serif Devanagari', serif",
            }}
          >
            {suktam.nameHindi}
          </DialogTitle>
          <p className="text-sm" style={{ color: "oklch(0.70 0.06 60)" }}>
            {suktam.name}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: `${vedaChipStyle(suktam.vedaSource)}22`,
                color: vedaChipStyle(suktam.vedaSource),
                border: `1px solid ${vedaChipStyle(suktam.vedaSource)}55`,
              }}
            >
              {suktam.deityHindi} · {suktam.deity}
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: "oklch(0.78 0.14 75 / 0.10)",
                color: "oklch(0.78 0.14 75 / 0.80)",
                border: "1px solid oklch(0.78 0.14 75 / 0.20)",
              }}
            >
              {suktam.vedaSource}
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: "oklch(0.55 0.20 48 / 0.15)",
                color: "oklch(0.68 0.20 48)",
                border: "1px solid oklch(0.55 0.20 48 / 0.30)",
              }}
            >
              {suktam.totalMantras} मंत्र
            </span>
          </div>
        </DialogHeader>

        {/* ── Mini Player ─────────────────────────────────────────── */}
        <div className="shrink-0 px-0 pb-2">
          <SuktamMiniPlayer
            suktamId={suktam.id}
            suktamName={suktam.name}
            suktamNameHindi={suktam.nameHindi}
            deity={suktam.deity}
          />
        </div>

        <div className="overflow-y-auto flex-1 min-h-0 pr-1">
          <Tabs defaultValue="fullText" className="w-full">
            <TabsList
              className="w-full mb-4 grid grid-cols-4 shrink-0"
              style={{
                background: "oklch(0.15 0.06 20)",
                border: "1px solid oklch(0.78 0.14 75 / 0.15)",
              }}
            >
              {[
                { value: "fullText", label: "संस्कृत पाठ" },
                { value: "transliteration", label: "Transliteration" },
                { value: "meaning", label: "Meaning" },
                { value: "benefits", label: "लाभ" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-xs data-[state=active]:text-amber-300"
                  style={{ color: "oklch(0.70 0.05 60)" }}
                  data-ocid={`suktam.tab.${tab.value}`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="fullText">
              <div
                className="rounded-lg p-4 text-sm leading-relaxed whitespace-pre-line"
                style={{
                  background: "oklch(0.15 0.06 20)",
                  color: "oklch(0.88 0.06 75)",
                  fontFamily: "'Noto Serif Devanagari', serif",
                  fontSize: "0.95rem",
                  lineHeight: "2",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                {suktam.fullText}
              </div>
            </TabsContent>

            <TabsContent value="transliteration">
              <div
                className="rounded-lg p-4 text-sm leading-relaxed whitespace-pre-line italic"
                style={{
                  background: "oklch(0.15 0.06 20)",
                  color: "oklch(0.80 0.08 75)",
                  fontFamily: "'Georgia', serif",
                  lineHeight: "2",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                {suktam.transliteration}
              </div>
            </TabsContent>

            <TabsContent value="meaning">
              <div
                className="rounded-lg p-4 text-sm leading-relaxed"
                style={{
                  background: "oklch(0.15 0.06 20)",
                  color: "oklch(0.85 0.04 60)",
                  lineHeight: "1.8",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                {suktam.meaning}
              </div>
            </TabsContent>

            <TabsContent value="benefits">
              <div
                className="rounded-lg p-4"
                style={{
                  background: "oklch(0.15 0.06 20)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                }}
              >
                <p
                  className="text-xs font-semibold mb-3 uppercase tracking-wider"
                  style={{ color: "oklch(0.78 0.14 75 / 0.60)" }}
                >
                  इस सूक्तम् के लाभ
                </p>
                <ul className="space-y-2">
                  {suktam.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Star
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                        fill="oklch(0.78 0.14 75 / 0.3)"
                      />
                      <span style={{ color: "oklch(0.82 0.05 60)" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SuktamLibrary() {
  const [search, setSearch] = useState("");
  const [vedaFilter, setVedaFilter] = useState<VedaFilter>("All");
  const [groupFilter, setGroupFilter] = useState<GroupFilter>("All");
  const [selected, setSelected] = useState<SuktamEntryExtended | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_SUKTAMS.filter((s) => {
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.nameHindi.includes(search) ||
        s.deity.toLowerCase().includes(q) ||
        s.deityHindi.includes(search) ||
        s.shortDescription.includes(search);
      const matchesVeda = vedaMatchesFilter(s.vedaSource, vedaFilter);
      const matchesGroup =
        groupFilter === "All" || s.alphabetGroup === groupFilter;
      return matchesSearch && matchesVeda && matchesGroup;
    });
  }, [search, vedaFilter, groupFilter]);

  const groups = useMemo(() => {
    const order: SuktamEntryExtended["alphabetGroup"][] = [
      "अ-ध",
      "न-भ",
      "भ-व",
      "व-ह",
    ];
    return order
      .map((g) => ({
        group: g,
        items: filtered.filter((s) => s.alphabetGroup === g),
      }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const vedaOptions: VedaFilter[] = [
    "All",
    "Rigveda",
    "Yajurveda",
    "Atharvaveda",
    "Tantric",
    "Jain",
  ];

  const groupOptions: GroupFilter[] = ["All", "अ-ध", "न-भ", "भ-व", "व-ह"];

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.20 0.08 22)" }}>
      {/* ── Hero Banner ──────────────────────────────────────────────────── */}
      <div
        className="py-12 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.09 22) 0%, oklch(0.26 0.10 35) 50%, oklch(0.20 0.08 22) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        {/* decorative Om */}
        <div
          className="absolute top-4 left-8 text-6xl opacity-[0.06] select-none pointer-events-none font-bold"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          ॐ
        </div>
        <div
          className="absolute bottom-4 right-8 text-6xl opacity-[0.06] select-none pointer-events-none font-bold"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          ॐ
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen
              className="h-9 w-9"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <h1
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{
                color: "oklch(0.78 0.14 75)",
                fontFamily: "'Noto Serif Devanagari', serif",
              }}
            >
              सूक्तम् — Vedic Suktam Library
            </h1>
            <BookOpen
              className="h-9 w-9"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
          </div>

          {/* Sanskrit shloka */}
          <p
            className="text-base italic mb-1 mt-2"
            style={{
              color: "oklch(0.68 0.20 48)",
              fontFamily: "'Noto Serif Devanagari', serif",
            }}
          >
            "सम्पूर्णमृषिवाक्यं तु सूक्तमित्यभिधीयते"
          </p>
          <p className="text-xs mb-5" style={{ color: "oklch(0.65 0.05 55)" }}>
            A complete composition of Vedic seers is called a Suktam
          </p>

          {/* Benefit chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {[
              "पूर्व जन्म के कर्म फल",
              "देवता प्रसन्न",
              "संकल्प पूर्ति",
              "सकारात्मक वातावरण",
            ].map((b) => (
              <span
                key={b}
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.12)",
                  color: "oklch(0.88 0.08 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                }}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Notes row */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: "oklch(0.68 0.05 55)" }}
            >
              🌅 सर्वोत्तम समय: प्रातः एवं सायं काल
            </span>
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: "oklch(0.68 0.05 55)" }}
            >
              🧘 पूर्ण पवित्रता के साथ पाठ करें
            </span>
          </div>

          {/* Count badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.20), oklch(0.78 0.14 75 / 0.15))",
              border: "1px solid oklch(0.78 0.14 75 / 0.30)",
              color: "oklch(0.88 0.08 75)",
            }}
            data-ocid="suktam.count_badge"
          >
            <Star
              className="h-4 w-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            ४३ सूक्तम् | 43 Suktams
          </div>
        </motion.div>
      </div>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <div
        className="sticky top-16 z-30 px-4 py-3 border-b"
        style={{
          background: "oklch(0.18 0.07 22 / 0.96)",
          backdropFilter: "blur(12px)",
          borderColor: "oklch(0.78 0.14 75 / 0.12)",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.65 0.05 55)" }}
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="सूक्तम् या देवता खोजें…"
              className="pl-9 text-sm"
              style={{
                background: "oklch(0.22 0.08 22)",
                border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                color: "oklch(0.88 0.06 75)",
              }}
              data-ocid="suktam.search_input"
            />
          </div>

          {/* Veda filter */}
          <div className="flex gap-1.5 flex-wrap">
            {vedaOptions.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVedaFilter(v)}
                className="text-xs px-2.5 py-1 rounded-lg transition-all duration-150 font-medium"
                style={
                  vedaFilter === v
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                        color: "white",
                      }
                    : {
                        background: "oklch(0.24 0.08 22)",
                        color: "oklch(0.75 0.06 60)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                      }
                }
                data-ocid="suktam.veda_filter"
              >
                {v}
              </button>
            ))}
          </div>

          {/* Group filter */}
          <div className="flex gap-1.5 flex-wrap">
            {groupOptions.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroupFilter(g)}
                className="text-xs px-2.5 py-1 rounded-lg transition-all duration-150 font-medium"
                style={
                  groupFilter === g
                    ? {
                        background: "oklch(0.78 0.14 75)",
                        color: "oklch(0.15 0.06 20)",
                      }
                    : {
                        background: "oklch(0.24 0.08 22)",
                        color: "oklch(0.75 0.06 60)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                      }
                }
                data-ocid="suktam.group_filter"
              >
                {g === "All" ? "All" : groupLabels[g]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div
            className="text-center py-20"
            style={{ color: "oklch(0.60 0.05 55)" }}
            data-ocid="suktam.empty_state"
          >
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">कोई सूक्तम् नहीं मिला</p>
            <p className="text-sm mt-1">खोज शब्द बदलें या फ़िल्टर हटाएं</p>
          </div>
        ) : (
          <AnimatePresence>
            {groups.map((group) => (
              <div key={group.group} className="mb-10">
                {/* Section divider */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="h-px flex-1"
                    style={{ background: "oklch(0.78 0.14 75 / 0.20)" }}
                  />
                  <span
                    className="text-sm font-bold px-4 py-1.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.20), oklch(0.78 0.14 75 / 0.15))",
                      color: "oklch(0.78 0.14 75)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                      fontFamily: "'Noto Serif Devanagari', serif",
                    }}
                    data-ocid="suktam.group_label"
                  >
                    {groupLabels[group.group]} ({group.items.length})
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ background: "oklch(0.78 0.14 75 / 0.20)" }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {group.items.map((suktam, i) => (
                    <SuktamCard
                      key={suktam.id}
                      suktam={suktam}
                      index={i}
                      onSelect={setSelected}
                    />
                  ))}
                </div>
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* ── Detail Modal ─────────────────────────────────────────────────── */}
      <SuktamModal suktam={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
