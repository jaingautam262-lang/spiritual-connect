import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  type EncyclopediaVolume,
  type QAPair,
  jainEncyclopediaData,
} from "../data/jainEncyclopediaData";

function QAItem({ qa, index }: { qa: QAPair; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        border: "1px solid oklch(0.85 0.04 70)",
        boxShadow: open ? "0 2px 12px oklch(0.62 0.18 48 / 0.06)" : "none",
      }}
    >
      <button
        type="button"
        data-ocid={`jain_enc.qa_item.${index}`}
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between px-5 py-4 text-left transition-colors gap-3"
        style={{
          background: open
            ? "linear-gradient(135deg, oklch(0.94 0.035 80), oklch(0.91 0.045 75))"
            : "oklch(0.96 0.015 82)",
        }}
      >
        <span
          className="font-heading font-semibold text-sm leading-snug"
          style={{ color: "oklch(0.28 0.10 25)" }}
        >
          {qa.question}
        </span>
        <span className="flex-shrink-0 mt-0.5">
          {open ? (
            <ChevronUp
              className="h-4 w-4"
              style={{ color: "oklch(0.55 0.12 50)" }}
            />
          ) : (
            <ChevronDown
              className="h-4 w-4"
              style={{ color: "oklch(0.55 0.12 50)" }}
            />
          )}
        </span>
      </button>
      {open && (
        <div
          className="px-5 py-5"
          style={{ background: "oklch(0.99 0.006 82)" }}
        >
          <p
            className="font-body text-sm leading-relaxed whitespace-pre-wrap"
            style={{
              color: "oklch(0.25 0.06 28)",
              fontFamily: "'Noto Sans Devanagari', sans-serif",
            }}
          >
            {qa.answer}
          </p>
          {qa.relatedTopics && qa.relatedTopics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {qa.relatedTopics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 rounded-full text-xs font-heading"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.10)",
                    color: "oklch(0.45 0.10 55)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function VolumeCard({
  volume,
  isActive,
  onClick,
}: {
  volume: EncyclopediaVolume;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-ocid={`jain_enc.volume.${volume.id}`}
      onClick={onClick}
      className="w-full text-left rounded-xl border transition-all duration-200 p-3 flex items-center gap-3"
      style={{
        background: isActive
          ? "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.12), oklch(0.78 0.14 75 / 0.08))"
          : "oklch(0.98 0.008 80)",
        borderColor: isActive
          ? "oklch(0.68 0.20 48 / 0.5)"
          : "oklch(0.88 0.04 70)",
        boxShadow: isActive ? "0 2px 8px oklch(0.62 0.18 48 / 0.10)" : "none",
      }}
    >
      <span className="text-xl flex-shrink-0">{volume.icon}</span>
      <div className="min-w-0">
        <p
          className="text-xs font-heading font-bold truncate"
          style={{
            color: isActive ? "oklch(0.45 0.18 42)" : "oklch(0.38 0.08 35)",
          }}
        >
          Vol. {volume.volumeNumber} — {volume.titleEn}
        </p>
        <p
          className="text-xs font-body truncate"
          style={{ color: "oklch(0.55 0.05 50)" }}
        >
          {volume.titleHi}
        </p>
      </div>
      {isActive && (
        <BookOpen
          className="h-3.5 w-3.5 flex-shrink-0 ml-auto"
          style={{ color: "oklch(0.55 0.18 48)" }}
        />
      )}
    </button>
  );
}

export default function JainEncyclopedia() {
  const [activeVolumeId, setActiveVolumeId] = useState(
    jainEncyclopediaData[0].id,
  );
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeVolume = useMemo(
    () =>
      jainEncyclopediaData.find((v) => v.id === activeVolumeId) ??
      jainEncyclopediaData[0],
    [activeVolumeId],
  );

  const filteredQA = useMemo(() => {
    if (!search.trim()) return activeVolume.qaPairs;
    const q = search.toLowerCase();
    return activeVolume.qaPairs.filter(
      (qa) =>
        qa.question.toLowerCase().includes(q) ||
        qa.answer.toLowerCase().includes(q) ||
        (qa.relatedTopics ?? []).some((t) => t.toLowerCase().includes(q)),
    );
  }, [search, activeVolume]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Hero */}
      <div
        className="relative py-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 60%, oklch(0.30 0.10 35) 100%)",
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10"
          style={{ background: "oklch(0.78 0.14 75)" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10"
          style={{ background: "oklch(0.68 0.20 48)" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-5xl mb-3">📚</div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            जैन विश्वकोश
          </h1>
          <p
            className="font-body text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            Jain Encyclopedia — 10 volumes covering Jain philosophy, history,
            cosmology, and practice
          </p>
          <div
            className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-heading"
            style={{
              background: "oklch(0.78 0.14 75 / 0.12)",
              border: "1px solid oklch(0.78 0.14 75 / 0.25)",
              color: "oklch(0.78 0.14 75)",
            }}
          >
            10 खंड •{" "}
            {jainEncyclopediaData.reduce((a, v) => a + v.qaPairs.length, 0)}{" "}
            प्रश्नोत्तर
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile: Volume Selector toggle */}
        <div className="lg:hidden mb-4">
          <button
            type="button"
            data-ocid="jain_enc.mobile_sidebar_toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border font-heading font-semibold text-sm"
            style={{
              background: "oklch(0.99 0.008 80)",
              borderColor: "oklch(0.85 0.04 70)",
              color: "oklch(0.28 0.10 25)",
            }}
          >
            <span>
              {activeVolume.icon} Vol. {activeVolume.volumeNumber} —{" "}
              {activeVolume.titleHi}
            </span>
            {sidebarOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {sidebarOpen && (
            <div
              className="mt-2 space-y-1.5 rounded-xl border p-3"
              style={{
                background: "oklch(0.99 0.008 80)",
                borderColor: "oklch(0.85 0.04 70)",
              }}
            >
              {jainEncyclopediaData.map((vol) => (
                <VolumeCard
                  key={vol.id}
                  volume={vol}
                  isActive={vol.id === activeVolumeId}
                  onClick={() => {
                    setActiveVolumeId(vol.id);
                    setSearch("");
                    setSidebarOpen(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div
              className="rounded-2xl border p-4 sticky top-24"
              style={{
                background: "oklch(0.99 0.008 80)",
                borderColor: "oklch(0.88 0.04 70)",
              }}
            >
              <p
                className="text-xs font-heading font-bold uppercase tracking-wider mb-3 px-1"
                style={{ color: "oklch(0.55 0.04 50)" }}
              >
                10 Volumes
              </p>
              <div className="space-y-1.5">
                {jainEncyclopediaData.map((vol) => (
                  <VolumeCard
                    key={vol.id}
                    volume={vol}
                    isActive={vol.id === activeVolumeId}
                    onClick={() => {
                      setActiveVolumeId(vol.id);
                      setSearch("");
                    }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Volume Header */}
            <div
              className="rounded-2xl overflow-hidden mb-6"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.26 0.08 28) 100%)",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                boxShadow: "0 8px 32px oklch(0.62 0.18 48 / 0.12)",
              }}
            >
              <div
                className="h-1.5"
                style={{
                  background:
                    "linear-gradient(90deg, oklch(0.68 0.20 48), oklch(0.78 0.14 75), oklch(0.72 0.18 60), oklch(0.78 0.14 75), oklch(0.68 0.20 48))",
                }}
              />
              <div className="p-6 flex items-center gap-5">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.15)",
                    border: "2px solid oklch(0.78 0.14 75 / 0.4)",
                  }}
                >
                  {activeVolume.icon}
                </div>
                <div>
                  <div
                    className="text-xs font-heading font-semibold mb-0.5"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Volume {activeVolume.volumeNumber} of 10
                  </div>
                  <h2
                    className="font-heading text-xl md:text-2xl font-bold mb-1"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    {activeVolume.titleEn}
                  </h2>
                  <p
                    className="text-sm font-body"
                    style={{ color: "oklch(0.70 0.06 60)" }}
                  >
                    {activeVolume.titleHi} — {activeVolume.qaPairs.length}{" "}
                    प्रश्नोत्तर
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div
              className="rounded-xl p-4 mb-5"
              style={{
                background: "oklch(0.78 0.14 75 / 0.07)",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <p
                className="text-sm font-body leading-relaxed"
                style={{ color: "oklch(0.35 0.06 35)" }}
              >
                {activeVolume.description}
              </p>
            </div>

            {/* Search */}
            <div className="mb-5 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
                style={{ color: "oklch(0.55 0.04 50)" }}
              />
              <Input
                data-ocid="jain_enc.search_input"
                placeholder="इस खंड में खोजें (Q&A, विषय)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 font-body"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  borderColor: "oklch(0.85 0.04 70)",
                  color: "oklch(0.22 0.06 28)",
                }}
              />
            </div>

            {/* Volume Navigation */}
            <div className="flex items-center justify-between mb-5">
              <p
                className="text-xs font-body"
                style={{ color: "oklch(0.55 0.04 50)" }}
              >
                {filteredQA.length} प्रश्नोत्तर {search ? "(खोज परिणाम)" : ""}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  data-ocid="jain_enc.prev_volume"
                  disabled={activeVolume.volumeNumber === 1}
                  onClick={() => {
                    const idx = jainEncyclopediaData.findIndex(
                      (v) => v.id === activeVolumeId,
                    );
                    if (idx > 0) {
                      setActiveVolumeId(jainEncyclopediaData[idx - 1].id);
                      setSearch("");
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all disabled:opacity-40"
                  style={{
                    background: "oklch(0.94 0.025 80)",
                    color: "oklch(0.45 0.08 45)",
                    border: "1px solid oklch(0.85 0.04 70)",
                  }}
                >
                  <ArrowLeft className="h-3 w-3" /> पिछला
                </button>
                <button
                  type="button"
                  data-ocid="jain_enc.next_volume"
                  disabled={activeVolume.volumeNumber === 10}
                  onClick={() => {
                    const idx = jainEncyclopediaData.findIndex(
                      (v) => v.id === activeVolumeId,
                    );
                    if (idx < jainEncyclopediaData.length - 1) {
                      setActiveVolumeId(jainEncyclopediaData[idx + 1].id);
                      setSearch("");
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all disabled:opacity-40"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                    border: "1px solid oklch(0.68 0.20 48)",
                  }}
                >
                  अगला <ArrowLeft className="h-3 w-3 rotate-180" />
                </button>
              </div>
            </div>

            {/* Q&A List */}
            {filteredQA.length === 0 ? (
              <div
                data-ocid="jain_enc.empty_state"
                className="text-center py-16 rounded-2xl border"
                style={{
                  background: "oklch(0.99 0.008 80)",
                  borderColor: "oklch(0.85 0.04 70)",
                }}
              >
                <div className="text-5xl mb-4">🔍</div>
                <p
                  className="font-heading text-lg"
                  style={{ color: "oklch(0.40 0.04 40)" }}
                >
                  कोई परिणाम नहीं मिला
                </p>
                <p
                  className="font-body text-sm mt-1"
                  style={{ color: "oklch(0.60 0.04 50)" }}
                >
                  अलग शब्द से खोजें या खोज साफ़ करें
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredQA.map((qa, i) => (
                  <QAItem
                    key={`${activeVolumeId}-${qa.question.slice(0, 20)}`}
                    qa={qa}
                    index={i}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
