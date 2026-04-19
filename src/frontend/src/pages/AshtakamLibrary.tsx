import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { type Ashtakam, ashtakamDataA } from "@/data/ashtakamDataA";
import { ashtakamDataB } from "@/data/ashtakamDataB";
import { ashtakamDataC } from "@/data/ashtakamDataC";
import { ArrowLeft, Search, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import BenefitsSection from "../components/BenefitsSection";
import { findBenefitsByTitle } from "../data/content-benefits-data";

const ashtakams: Ashtakam[] = [
  ...ashtakamDataA,
  ...ashtakamDataB,
  ...ashtakamDataC,
];

export default function AshtakamLibrary() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Ashtakam | null>(null);
  const [activeTab, setActiveTab] = useState<
    "text" | "meaning" | "benefits" | "deity"
  >("text");
  const benefitsData = selected ? findBenefitsByTitle(selected.name) : null;

  const filtered = useMemo(() => {
    if (!search.trim()) return ashtakams;
    const q = search.toLowerCase();
    return ashtakams.filter(
      (a) =>
        a.name.toLowerCase().includes(q) || a.deity.toLowerCase().includes(q),
    );
  }, [search]);

  if (selected) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, oklch(0.13 0.04 30), oklch(0.18 0.06 45))",
          color: "oklch(0.95 0.03 80)",
          fontFamily: "'Noto Sans Devanagari', serif",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
          <button
            type="button"
            onClick={() => setSelected(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              color: "oklch(0.75 0.15 75)",
              cursor: "pointer",
              fontSize: 15,
              marginBottom: 20,
              padding: 0,
            }}
          >
            <ArrowLeft size={18} />
            अष्टकम सूची पर वापस
          </button>

          {/* Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, oklch(0.20 0.08 45), oklch(0.16 0.06 30))",
              border: "1px solid oklch(0.55 0.20 75 / 0.3)",
              borderRadius: 16,
              padding: "24px",
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>🕉️</div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "oklch(0.85 0.18 75)",
                margin: "0 0 8px",
              }}
            >
              {selected.name}
            </h1>
            <p
              style={{ color: "oklch(0.70 0.12 75)", margin: 0, fontSize: 15 }}
            >
              {selected.deity}
            </p>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            {(["text", "meaning", "benefits", "deity"] as const).map((tab) => {
              const labels = {
                text: "पाठ",
                meaning: "अर्थ",
                benefits: "लाभ",
                deity: "देवता परिचय",
              };
              return (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 20,
                    border: "1px solid",
                    borderColor:
                      activeTab === tab
                        ? "oklch(0.75 0.20 75)"
                        : "oklch(0.40 0.10 75 / 0.4)",
                    background:
                      activeTab === tab
                        ? "oklch(0.75 0.20 75)"
                        : "oklch(0.20 0.06 30)",
                    color:
                      activeTab === tab
                        ? "oklch(0.10 0.04 30)"
                        : "oklch(0.80 0.10 75)",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div
            style={{
              background: "oklch(0.17 0.05 30)",
              border: "1px solid oklch(0.55 0.20 75 / 0.15)",
              borderRadius: 12,
              padding: "24px",
            }}
          >
            {activeTab === "text" && (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "'Noto Sans Devanagari', serif",
                  fontSize: 15,
                  lineHeight: 2,
                  color: "oklch(0.90 0.04 80)",
                  margin: 0,
                }}
              >
                {selected.text}
              </pre>
            )}
            {activeTab === "meaning" && (
              <div>
                <h3 style={{ color: "oklch(0.85 0.18 75)", marginTop: 0 }}>
                  अर्थ एवं भावार्थ
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.9,
                    color: "oklch(0.88 0.04 80)",
                    marginBottom: 12,
                  }}
                >
                  {selected.meaning}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "oklch(0.65 0.10 75)",
                    fontStyle: "italic",
                  }}
                >
                  (प्रत्येक श्लोक का हिंदी अनुवाद पाठ टैब में दिया गया है।)
                </p>
              </div>
            )}
            {activeTab === "benefits" && (
              <div>
                <h3 style={{ color: "oklch(0.85 0.18 75)", marginTop: 0 }}>
                  🌟 पाठ के लाभ
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 2.0,
                    color: "oklch(0.88 0.04 80)",
                  }}
                >
                  {selected.benefits}
                </p>
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
              </div>
            )}
            {activeTab === "deity" && (
              <div>
                <h3 style={{ color: "oklch(0.85 0.18 75)", marginTop: 0 }}>
                  देवता परिचय
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.9,
                    color: "oklch(0.88 0.04 80)",
                  }}
                >
                  {selected.deityInfo}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, oklch(0.13 0.04 30), oklch(0.18 0.06 45))",
        color: "oklch(0.95 0.03 80)",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🕉️</div>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 700,
              background:
                "linear-gradient(90deg, oklch(0.85 0.18 75), oklch(0.75 0.20 55))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 8px",
            }}
          >
            अष्टकम संग्रह
          </h1>
          <p style={{ color: "oklch(0.65 0.10 75)", margin: "0 0 4px" }}>
            बैच 1 — {ashtakams.length} अष्टकम
          </p>
          <p style={{ color: "oklch(0.55 0.08 60)", fontSize: 13, margin: 0 }}>
            हिंदी पाठ · अर्थ · लाभ · देवता परिचय
          </p>
        </div>

        {/* Search */}
        <div
          style={{ position: "relative", maxWidth: 400, margin: "0 auto 32px" }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "oklch(0.55 0.10 75)",
            }}
          />
          <Input
            placeholder="अष्टकम या देवता खोजें..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              paddingLeft: 36,
              background: "oklch(0.18 0.06 35)",
              border: "1px solid oklch(0.55 0.20 75 / 0.25)",
              color: "oklch(0.90 0.04 80)",
              borderRadius: 24,
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
            {filtered.map((ashtakam, i) => (
              <motion.div
                key={ashtakam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  setSelected(ashtakam);
                  setActiveTab("text");
                }}
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.20 0.08 40), oklch(0.16 0.06 28))",
                  border: "1px solid oklch(0.55 0.20 75 / 0.20)",
                  borderRadius: 14,
                  padding: "22px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                whileHover={{
                  borderColor: "oklch(0.75 0.20 75 / 0.50)",
                  scale: 1.02,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "oklch(0.55 0.20 75 / 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    🕉️
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        margin: "0 0 6px",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "oklch(0.88 0.14 75)",
                        lineHeight: 1.3,
                      }}
                    >
                      {ashtakam.name}
                    </h3>
                    <p
                      style={{
                        margin: "0 0 10px",
                        fontSize: 13,
                        color: "oklch(0.65 0.10 70)",
                      }}
                    >
                      {ashtakam.deity}
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "oklch(0.55 0.08 60)",
            }}
          >
            कोई अष्टकम नहीं मिला।
          </div>
        )}
      </div>
    </div>
  );
}
