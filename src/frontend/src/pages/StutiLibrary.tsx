import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { type Stuti, stutiData } from "@/data/stutiData";
import { ArrowLeft, Search, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import BenefitsSection from "../components/BenefitsSection";
import FavouriteButton from "../components/FavouriteButton";
import { findBenefitsByTitle } from "../data/content-benefits-data";

const stutis: Stuti[] = stutiData;

export default function StutiLibrary() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Stuti | null>(null);
  const [activeTab, setActiveTab] = useState<
    "text" | "meaning" | "benefits" | "deityInfo"
  >("text");
  const benefitsData = selected ? findBenefitsByTitle(selected.name) : null;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return stutis.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.deity.toLowerCase().includes(q) ||
        s.faith.toLowerCase().includes(q),
    );
  }, [search]);

  if (selected) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "oklch(0.11 0.04 45)",
          color: "oklch(0.92 0.05 75)",
          fontFamily: "'Noto Sans Devanagari', sans-serif",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 20px" }}>
          <button
            type="button"
            data-ocid="stuti.close_button"
            onClick={() => setSelected(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              color: "oklch(0.72 0.14 75)",
              cursor: "pointer",
              fontSize: 15,
              marginBottom: 24,
              padding: 0,
            }}
          >
            <ArrowLeft size={18} />
            वापस जाएँ
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1
              style={{
                fontSize: "clamp(22px, 5vw, 32px)",
                fontWeight: 700,
                color: "oklch(0.88 0.18 75)",
                marginBottom: 6,
              }}
            >
              {selected.name}
            </h1>
            <p style={{ color: "oklch(0.65 0.10 70)", marginBottom: 20 }}>
              {selected.deity}
            </p>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 24,
              }}
            >
              {(
                [
                  { key: "text", label: "पाठ" },
                  { key: "meaning", label: "अर्थ" },
                  { key: "benefits", label: "लाभ" },
                  { key: "deityInfo", label: "देवता परिचय" },
                ] as const
              ).map((tab) => (
                <button
                  type="button"
                  key={tab.key}
                  data-ocid="stuti.tab"
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 20,
                    border: "1px solid",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: activeTab === tab.key ? 700 : 400,
                    background:
                      activeTab === tab.key
                        ? "oklch(0.55 0.20 70)"
                        : "oklch(0.16 0.05 45)",
                    color:
                      activeTab === tab.key
                        ? "oklch(0.98 0.01 75)"
                        : "oklch(0.72 0.12 70)",
                    borderColor:
                      activeTab === tab.key
                        ? "oklch(0.55 0.20 70)"
                        : "oklch(0.28 0.06 50)",
                    transition: "all 0.2s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "oklch(0.15 0.05 45)",
                  borderRadius: 16,
                  padding: "24px 28px",
                  border: "1px solid oklch(0.28 0.08 55)",
                  lineHeight: 1.9,
                  fontSize: 16,
                  whiteSpace: "pre-wrap",
                  color: "oklch(0.88 0.06 70)",
                }}
              >
                {activeTab === "text" && selected.text}
                {activeTab === "meaning" && selected.meaning}
                {activeTab === "benefits" && (
                  <>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {selected.benefits}
                    </div>
                    {benefitsData && (
                      <div style={{ marginTop: 24 }}>
                        <BenefitsSection
                          benefits={benefitsData.benefits}
                          bestTime={benefitsData.bestTime}
                          repetitions={benefitsData.repetitions}
                          deityBlessings={benefitsData.deityBlessings}
                          occasions={benefitsData.occasions}
                          contentName={selected.name}
                        />
                      </div>
                    )}
                  </>
                )}
                {activeTab === "deityInfo" && selected.deityInfo}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "oklch(0.11 0.04 45)",
        color: "oklch(0.92 0.05 75)",
        fontFamily: "'Noto Sans Devanagari', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <div style={{ fontSize: 44, marginBottom: 10 }}>🙏</div>
          <h1
            style={{
              fontSize: "clamp(26px, 6vw, 40px)",
              fontWeight: 800,
              color: "oklch(0.88 0.18 75)",
              marginBottom: 8,
            }}
          >
            स्तुति संग्रह
          </h1>
          <p style={{ color: "oklch(0.65 0.10 70)", fontSize: 16 }}>
            {stutis.length} स्तुतियाँ — हिंदी पाठ, अर्थ, लाभ एवं देवता परिचय सहित
          </p>
        </motion.div>

        {/* Search */}
        <div
          style={{
            position: "relative",
            maxWidth: 480,
            margin: "0 auto 32px",
          }}
        >
          <Search
            size={18}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "oklch(0.55 0.10 70)",
              pointerEvents: "none",
            }}
          />
          <Input
            data-ocid="stuti.search_input"
            placeholder="स्तुति या देवता खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              paddingLeft: 44,
              background: "oklch(0.16 0.05 45)",
              border: "1px solid oklch(0.30 0.08 55)",
              color: "oklch(0.90 0.05 70)",
              borderRadius: 12,
              height: 46,
              fontSize: 15,
            }}
          />
        </div>

        {/* Grid */}
        <AnimatePresence>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {filtered.map((stuti, i) => (
              <motion.div
                key={stuti.id}
                data-ocid={`stuti.item.${i + 1}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onClick={() => {
                  setSelected(stuti);
                  setActiveTab("text");
                }}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.16 0.06 50), oklch(0.20 0.08 60))",
                  border: "1px solid oklch(0.30 0.10 60)",
                  borderRadius: 16,
                  padding: "20px 18px",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  position: "relative",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 8px 28px oklch(0.50 0.20 70 / 0.25)",
                }}
              >
                <div style={{ position: "absolute", top: 10, right: 10 }}>
                  <FavouriteButton
                    item={{
                      id: stuti.id,
                      type: "stuti",
                      title: stuti.name,
                      subtitle: stuti.deity,
                      path: "/stuti",
                      icon: "🌸",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 28,
                    marginBottom: 10,
                    filter: "drop-shadow(0 0 6px oklch(0.70 0.18 75 / 0.4))",
                  }}
                >
                  🌸
                </div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "oklch(0.88 0.16 75)",
                    marginBottom: 4,
                  }}
                >
                  {stuti.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    marginBottom: 12,
                    color: "oklch(0.65 0.10 70)",
                  }}
                >
                  {stuti.deity}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Badge
                    style={{
                      background: "oklch(0.55 0.20 75 / 0.15)",
                      color: "oklch(0.75 0.16 75)",
                      border: "1px solid oklch(0.55 0.20 75 / 0.25)",
                      fontSize: 11,
                    }}
                  >
                    <Star size={10} style={{ marginRight: 3 }} />
                    अर्थ सहित
                  </Badge>
                  <Badge
                    style={{
                      background: "oklch(0.45 0.15 50 / 0.15)",
                      color: "oklch(0.70 0.15 55)",
                      border: "1px solid oklch(0.45 0.15 50 / 0.25)",
                      fontSize: 11,
                    }}
                  >
                    लाभ
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div
            data-ocid="stuti.empty_state"
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "oklch(0.55 0.08 60)",
            }}
          >
            कोई स्तुति नहीं मिली।
          </div>
        )}
      </div>
    </div>
  );
}
