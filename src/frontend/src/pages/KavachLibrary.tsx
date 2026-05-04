import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { kavachBatch2025 } from "@/data/kavachBatch2025";
import { type Kavach, kavachDataA } from "@/data/kavachDataA";
import { kavachDataB } from "@/data/kavachDataB";
import { kavachData_C } from "@/data/kavachData_C";
import { ArrowLeft, Search, Shield, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import AudioPlayer from "../components/AudioPlayer";
import BenefitsSection from "../components/BenefitsSection";
import { ContentCard } from "../components/ContentCard";
import FavouriteButton from "../components/FavouriteButton";
import WhatsAppShare from "../components/WhatsAppShare";
import { useLanguage } from "../contexts/LanguageContext";
import { findBenefitsByTitle } from "../data/content-benefits-data";

const kavachs: Kavach[] = [
  ...kavachDataA,
  ...kavachDataB,
  ...kavachData_C,
  ...kavachBatch2025,
];

const faithColors: Record<string, string> = {
  हिंदू: "oklch(0.55 0.20 48)",
  Hindu: "oklch(0.55 0.20 48)",
  जैन: "oklch(0.45 0.18 200)",
  Jain: "oklch(0.45 0.18 200)",
  सिख: "oklch(0.50 0.20 150)",
  Sikh: "oklch(0.50 0.20 150)",
};

export default function KavachLibrary() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Kavach | null>(null);
  const benefitsData = selected ? findBenefitsByTitle(selected.name) : null;
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return kavachs;
    return kavachs.filter(
      (k) =>
        k.name.includes(search) ||
        k.deity.includes(search) ||
        k.name.toLowerCase().includes(q) ||
        k.deity.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.20 0.08 22)" }}>
      {/* Hero Banner */}
      <div
        className="py-12 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.09 22) 0%, oklch(0.24 0.10 35) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shield
              className="h-10 w-10"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <h1
              className="text-4xl font-bold"
              style={{
                color: "oklch(0.78 0.14 75)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {isHindi ? "कवच लाइब्रेरी" : "Kavach Library"}
            </h1>
            <Shield
              className="h-10 w-10"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
          </div>
          <p className="text-lg mb-1" style={{ color: "oklch(0.88 0.06 75)" }}>
            {isHindi ? "दिव्य सुरक्षा कवच" : "Kavach Library"}
          </p>
          <p
            className="text-sm max-w-xl mx-auto"
            style={{ color: "oklch(0.70 0.06 60)" }}
          >
            {isHindi
              ? "दिव्य कवचों का संग्रह — शरीर और आत्मा की रक्षा के लिए"
              : "Collection of divine Kavachs — for protection of body and soul"}
          </p>
          <div
            className="mt-4 text-xs font-semibold"
            style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
          >
            {kavachs.length} {isHindi ? "कवच उपलब्ध" : "Kavachs available"}
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {selected ? (
            /* Detail View */
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Breadcrumb */}
              <div
                className="flex items-center gap-2 mb-6 text-sm"
                style={{ color: "oklch(0.70 0.06 60)" }}
              >
                <button
                  type="button"
                  data-ocid="kavach.link"
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-1 hover:underline transition-colors"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isHindi ? "कवच लाइब्रेरी" : "Kavach Library"}
                </button>
                <span>›</span>
                <span style={{ color: "oklch(0.88 0.06 75)" }}>
                  {selected.name}
                </span>
              </div>

              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "oklch(0.24 0.08 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                }}
              >
                {/* Detail Header */}
                <div
                  className="px-8 py-6"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.22 0.09 28) 0%, oklch(0.28 0.10 40) 100%)",
                    borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          style={{
                            background:
                              faithColors[selected.faith] ||
                              "oklch(0.68 0.20 48)",
                            color: "white",
                            border: "none",
                          }}
                        >
                          {selected.faith}
                        </Badge>
                      </div>
                      <h2
                        className="text-3xl font-bold mb-1"
                        style={{
                          color: "oklch(0.78 0.14 75)",
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        {selected.name}
                      </h2>
                      <p
                        className="text-base"
                        style={{ color: "oklch(0.88 0.06 75)" }}
                      >
                        {isHindi ? "देवता:" : "Deity:"} {selected.deity}
                      </p>
                    </div>
                    <button
                      type="button"
                      data-ocid="kavach.close_button"
                      onClick={() => setSelected(null)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                      style={{
                        background: "oklch(0.78 0.14 75 / 0.15)",
                        color: "oklch(0.78 0.14 75)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                      }}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      {isHindi ? "वापस" : "Back"}
                    </button>
                  </div>
                </div>

                {/* Benefits inline */}
                <div
                  className="mx-8 mt-6 mb-4 p-4 rounded-xl"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.08)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Star
                      className="h-5 w-5"
                      style={{
                        color: "oklch(0.78 0.14 75)",
                        fill: "oklch(0.78 0.14 75)",
                      }}
                    />
                    <h3
                      className="text-base font-bold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {isHindi ? "फल एवं लाभ" : "Benefits & Results"}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.88 0.06 75)" }}
                  >
                    {selected.benefits}
                  </p>
                </div>

                {/* Full Text via ContentCard */}
                <div className="px-8 pb-8">
                  <ContentCard title={selected.name} text={selected.text} />

                  {/* WhatsApp Share */}
                  <div className="mt-4 flex items-center gap-3">
                    <WhatsAppShare title={selected.name} />
                  </div>

                  {/* Audio Playback */}
                  <div className="mt-6">
                    <p
                      className="text-sm font-semibold mb-2"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      ॐ Audio Playback
                    </p>
                    <AudioPlayer
                      title={selected.name}
                      audioUrl=""
                      hasMockAudio={true}
                      youtubeSearchQuery={`${selected.name} kavach`}
                    />
                  </div>

                  {/* BenefitsSection */}
                  {benefitsData && (
                    <div className="mt-6">
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
              </div>
            </motion.div>
          ) : (
            /* List View */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search Bar */}
              <div className="mb-8 relative max-w-lg mx-auto">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                  style={{ color: "oklch(0.70 0.06 60)" }}
                />
                <Input
                  data-ocid="kavach.search_input"
                  placeholder={
                    isHindi ? "कवच या देवता खोजें..." : "Search kavach or deity..."
                  }
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 py-3 text-base rounded-full border"
                  style={{
                    background: "oklch(0.24 0.08 25)",
                    borderColor: "oklch(0.78 0.14 75 / 0.25)",
                    color: "oklch(0.92 0.04 75)",
                  }}
                />
              </div>

              {/* Results count */}
              {search && (
                <p
                  className="text-sm mb-4 text-center"
                  style={{ color: "oklch(0.70 0.06 60)" }}
                >
                  {filtered.length} {isHindi ? "परिणाम मिले" : "results found"}
                </p>
              )}

              {/* Cards Grid */}
              {filtered.length === 0 ? (
                <div
                  data-ocid="kavach.empty_state"
                  className="text-center py-16"
                  style={{ color: "oklch(0.60 0.04 50)" }}
                >
                  <Shield className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">
                    {isHindi ? "कोई कवच नहीं मिला" : "No kavach found"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filtered.map((kavach, index) => (
                    <motion.div
                      key={kavach.id}
                      data-ocid={`kavach.item.${index + 1}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      style={{ position: "relative" }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          zIndex: 10,
                        }}
                      >
                        <FavouriteButton
                          item={{
                            id: kavach.id,
                            type: "kavach",
                            title: kavach.name,
                            subtitle: kavach.deity,
                            path: "/kavach",
                            icon: "🛡️",
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelected(kavach)}
                        className="w-full text-left rounded-xl p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg group"
                        style={{
                          background: "oklch(0.24 0.08 25)",
                          border: "1px solid oklch(0.78 0.14 75 / 0.18)",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = "oklch(0.78 0.14 75 / 0.45)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "oklch(0.26 0.09 27)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.borderColor = "oklch(0.78 0.14 75 / 0.18)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "oklch(0.24 0.08 25)";
                        }}
                      >
                        {/* Shield Icon */}
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                          style={{
                            background: "oklch(0.78 0.14 75 / 0.12)",
                            border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                          }}
                        >
                          <Shield
                            className="h-6 w-6"
                            style={{ color: "oklch(0.78 0.14 75)" }}
                          />
                        </div>

                        {/* Faith Badge */}
                        <Badge
                          className="mb-2 text-xs"
                          style={{
                            background:
                              faithColors[kavach.faith] ||
                              "oklch(0.68 0.20 48)",
                            color: "white",
                            border: "none",
                          }}
                        >
                          {kavach.faith}
                        </Badge>

                        {/* Name */}
                        <h3
                          className="font-bold text-base mb-1 leading-snug"
                          style={{ color: "oklch(0.88 0.08 75)" }}
                        >
                          {kavach.name}
                        </h3>

                        {/* Deity */}
                        <p
                          className="text-sm mb-3"
                          style={{ color: "oklch(0.70 0.06 60)" }}
                        >
                          {kavach.deity}
                        </p>

                        {/* Benefits preview */}
                        <p
                          className="text-xs leading-relaxed line-clamp-2"
                          style={{ color: "oklch(0.65 0.05 55)" }}
                        >
                          {kavach.benefits}
                        </p>

                        {/* Read more */}
                        <div
                          className="mt-3 text-xs font-medium flex items-center gap-1"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          {isHindi ? "पाठ पढ़ें \u2192" : "Read Kavach \u2192"}
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
