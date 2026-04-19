import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, Mic, MicOff, Search, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import BenefitsSection from "../components/BenefitsSection";
import { findBenefitsByTitle } from "../data/content-benefits-data";
import { part12Stotras } from "../data/part12Stotras";
import { part13Stotras } from "../data/part13Stotras";
import { part14Stotras } from "../data/part14Stotras";
import { part15Stotras } from "../data/part15Stotras";
import { part16Stotras } from "../data/part16Stotras";
import { part17Stotras } from "../data/part17Stotras";
import { part18Stotras } from "../data/part18Stotras";
import { part19Stotras } from "../data/part19Stotras";
import { part20Stotras } from "../data/part20Stotras";
import { part21Stotras } from "../data/part21Stotras";
import { part22aStotras } from "../data/part22aStotras";
import { part22bStotras } from "../data/part22bStotras";
import { part23aStotras } from "../data/part23aStotras";
import { part23bStotras } from "../data/part23bStotras";
import { part24aStotras } from "../data/part24aStotras";
import { part24bStotras } from "../data/part24bStotras";
import { part25Stotras } from "../data/part25Stotras";
import { part26Stotras } from "../data/part26Stotras";
import { part27Stotras } from "../data/part27Stotras";
import { sahasranamaData } from "../data/sahasranamaData";
import { type Stotra, stotraData } from "../data/stotraData";

// Voice search support detection
type SpeechRecognitionConstructor = new () => {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult:
    | ((event: {
        results: {
          [index: number]: { [index: number]: { transcript: string } };
        };
      }) => void)
    | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as typeof window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

const deityIcons: Record<string, string> = {
  "काल भैरव": "🔱",
  कुबेर: "💰",
  "गजानन (गणेश)": "🐘",
  गणेश: "🐘",
  "गुरु (बृहस्पति)": "🌟",
  "गोपाल (कृष्ण)": "🎵",
  विष्णु: "🪷",
  लक्ष्मी: "🌸",
  ललिता: "🌹",
  "ललिता त्रिपुरसुन्दरी": "🌹",
  दुर्गा: "⚡",
  शिव: "🔱",
  सरस्वती: "📚",
  हनुमान: "🙏",
  काली: "⚪",
  गंगा: "🌊",
  सूर्य: "☀️",
  नर्मदा: "🌊",
  तुलसी: "🌿",
  कृष्ण: "🎵",
  "त्रिपुरा भैरवी": "🔥",
  नरसिंह: "🦁",
  भैरव: "🔱",
  वाराही: "🐗",
  "वेंकटेश्वर (बालाजी)": "🙏",
  तारा: "⭐",
  धूमावती: "💨",
};

function getDeityIcon(deity: string): string {
  for (const [key, icon] of Object.entries(deityIcons)) {
    if (deity.includes(key) || key.includes(deity)) return icon;
  }
  return "🕉️";
}

export default function SahasranamLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [faithFilter, setFaithFilter] = useState("All");
  const [selectedSahasranam, setSelectedSahasranam] = useState<Stotra | null>(
    null,
  );
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const recognitionRef =
    useRef<InstanceType<SpeechRecognitionConstructor> | null>(null);

  const SpeechRecognitionClass = getSpeechRecognition();
  const voiceSupported = !!SpeechRecognitionClass;

  const sahasranams = useMemo(() => {
    const allStotras = [
      ...stotraData,
      ...part12Stotras,
      ...part13Stotras,
      ...part14Stotras,
      ...part15Stotras,
      ...part16Stotras,
      ...part17Stotras,
      ...part18Stotras,
      ...part19Stotras,
      ...part20Stotras,
      ...part21Stotras,
      ...part22aStotras,
      ...part22bStotras,
      ...part23aStotras,
      ...part23bStotras,
      ...part24aStotras,
      ...part24bStotras,
      ...part25Stotras,
      ...part26Stotras,
      ...part27Stotras,
    ].filter(
      (s) =>
        s.type === "Sahasranam" ||
        s.type === "sahasranam" ||
        s.type === "Sahasranama",
    );

    // Merge with new dedicated sahasranama data — deduplicate by id
    const existingIds = new Set(allStotras.map((s) => s.id));
    const newEntries = sahasranamaData.filter((s) => !existingIds.has(s.id));
    return [...allStotras, ...newEntries];
  }, []);

  const faithOptions = [
    "All",
    ...Array.from(new Set(sahasranams.map((s) => s.faith))),
  ];

  const filtered = sahasranams.filter((s) => {
    const matchSearch =
      !searchQuery ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.deity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFaith = faithFilter === "All" || s.faith === faithFilter;
    return matchSearch && matchFaith;
  });

  const startVoiceSearch = () => {
    if (!SpeechRecognitionClass) {
      setVoiceError("आपका ब्राउज़र वॉयस सर्च को सपोर्ट नहीं करता।");
      return;
    }
    setVoiceError("");
    const recognition = new SpeechRecognitionClass();
    recognition.lang = "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: {
      results: { [index: number]: { [index: number]: { transcript: string } } };
    }) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setVoiceError("वॉयस पहचान में त्रुटि हुई। दोबारा प्रयास करें।");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopVoiceSearch = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  if (selectedSahasranam) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="detail"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-[oklch(0.97_0.015_85)]"
        >
          {/* Detail Header */}
          <div
            className="relative py-12 px-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.28 0.12 35) 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-amber-400 to-orange-600" />
            <div className="relative max-w-4xl mx-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSahasranam(null)}
                className="mb-4 text-amber-300 hover:text-amber-100 hover:bg-white/10"
                data-ocid="sahasranam.back_button"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                वापस जाएं
              </Button>
              <div className="text-5xl mb-3">
                {getDeityIcon(selectedSahasranam.deity)}
              </div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "oklch(0.90 0.16 75)" }}
              >
                {selectedSahasranam.title}
              </h1>
              <div className="flex items-center justify-center gap-2 mt-3">
                <Badge
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.35)",
                    color: "oklch(0.95 0.12 80)",
                    border: "1px solid oklch(0.68 0.20 48 / 0.6)",
                  }}
                >
                  {selectedSahasranam.faith}
                </Badge>
                <Badge
                  style={{
                    background: "oklch(0.45 0.10 200 / 0.35)",
                    color: "oklch(0.85 0.10 200)",
                    border: "1px solid oklch(0.45 0.10 200 / 0.6)",
                  }}
                >
                  {selectedSahasranam.type}
                </Badge>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* 108 Name Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-4 mb-6 border"
              style={{
                background: "oklch(0.97 0.015 75)",
                borderColor: "oklch(0.78 0.14 75 / 0.6)",
              }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: "oklch(0.50 0.18 50)" }}
              >
                प्रथम १०२ पावन नाम
              </p>
              <p className="text-sm" style={{ color: "oklch(0.40 0.10 50)" }}>
                यह सहस्रनाम के प्रथम <strong>१०२ पावन नाम</strong> हिंदी अर्थ सहित
                प्रस्तुत हैं। पूर्ण <strong>१०००+ नाम</strong> भी उपलब्ध हैं।
              </p>
            </motion.div>

            {/* Benefits */}
            {selectedSahasranam.benefits && (
              <div
                className="rounded-xl p-5 mb-6 border"
                style={{
                  background: "oklch(0.97 0.015 85)",
                  borderColor: "oklch(0.88 0.08 75)",
                }}
              >
                <h3
                  className="font-bold mb-2 flex items-center gap-2"
                  style={{ color: "oklch(0.50 0.18 50)" }}
                >
                  <Star className="h-4 w-4" />
                  पाठ के लाभ
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.35 0.05 50)" }}>
                  {selectedSahasranam.benefits}
                </p>
              </div>
            )}

            {/* Full Text */}
            <div
              className="rounded-xl p-6 mb-6 border"
              style={{
                background: "white",
                borderColor: "oklch(0.88 0.08 75)",
              }}
              data-ocid="sahasranam.detail.panel"
            >
              <h3
                className="font-bold text-xl mb-4 flex items-center gap-2"
                style={{ color: "oklch(0.50 0.18 50)" }}
              >
                <BookOpen className="h-5 w-5" />
                {selectedSahasranam.title}
              </h3>
              <pre
                className="whitespace-pre-wrap font-sans text-base leading-loose"
                style={{
                  color: "oklch(0.25 0.05 30)",
                  fontFamily: "'Noto Sans Devanagari', 'Mangal', sans-serif",
                }}
              >
                {selectedSahasranam.fullText}
              </pre>
            </div>

            {/* Meaning */}
            {selectedSahasranam.meaning && (
              <div
                className="rounded-xl p-5 mb-6 border"
                style={{
                  background: "oklch(0.98 0.012 80)",
                  borderColor: "oklch(0.88 0.08 75)",
                }}
              >
                <h3
                  className="font-bold mb-2"
                  style={{ color: "oklch(0.50 0.18 50)" }}
                >
                  🔉 अर्थ एवं विवेचन
                </h3>
                <p className="text-sm" style={{ color: "oklch(0.35 0.05 50)" }}>
                  {selectedSahasranam.meaning}
                </p>
              </div>
            )}

            {/* Benefits Section */}
            {(() => {
              const bd = findBenefitsByTitle(selectedSahasranam.title);
              return bd ? (
                <BenefitsSection
                  className="mb-8"
                  benefits={bd.benefits}
                  bestTime={bd.bestTime}
                  repetitions={bd.repetitions}
                  deityBlessings={bd.deityBlessings}
                  occasions={bd.occasions}
                  contentName={selectedSahasranam.title}
                />
              ) : null;
            })()}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.97 0.015 85)" }}
    >
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-16 px-6 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.30 0.14 38) 60%, oklch(0.25 0.10 30) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="text-6xl mb-4"
          >
            🕉️
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-3"
            style={{ color: "oklch(0.90 0.16 75)" }}
          >
            सहस्रनाम लाइब्रेरी
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base mb-6"
            style={{ color: "oklch(0.75 0.10 70)" }}
          >
            ८०+ पवित्र सहस्रनाम — देवी-देवताओं के हज़ार पावन नामों का संग्रह
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Badge
              className="text-base px-6 py-2"
              style={{
                background: "oklch(0.68 0.20 48 / 0.25)",
                color: "oklch(0.90 0.14 75)",
                border: "1px solid oklch(0.78 0.14 75 / 0.5)",
              }}
            >
              ८०+ सहस्रनाम उपलब्ध
            </Badge>
          </motion.div>
        </div>
      </motion.div>

      {/* Notice Banner */}
      <div
        className="py-3 px-6 text-center text-sm font-medium"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.68 0.20 48 / 0.15) 0%, oklch(0.78 0.14 75 / 0.20) 100%)",
          color: "oklch(0.45 0.18 48)",
          borderBottom: "1px solid oklch(0.68 0.20 48 / 0.3)",
        }}
      >
        ⚠️ प्रत्येक सहस्रनाम के प्रथम १०२ पावन नाम हिंदी अर्थ सहित — पूर्ण १०००+ नाम उपलब्ध
        हैं
      </div>

      {/* Search & Filters */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(0.60 0.10 50)" }}
            />
            <Input
              placeholder={isListening ? "सुन रहा हूँ..." : "देवता या नाम से खोजें..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-11"
              style={{
                borderColor: isListening
                  ? "oklch(0.65 0.22 30)"
                  : "oklch(0.78 0.14 75 / 0.6)",
                background: isListening ? "oklch(0.98 0.015 30)" : "white",
              }}
              data-ocid="sahasranam.search_input"
            />
            {voiceSupported && (
              <button
                type="button"
                onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-all"
                style={{
                  color: isListening
                    ? "oklch(0.65 0.22 30)"
                    : "oklch(0.60 0.10 50)",
                  background: isListening
                    ? "oklch(0.65 0.22 30 / 0.12)"
                    : "transparent",
                }}
                title={isListening ? "सुनना बंद करें" : "आवाज़ से खोजें"}
                data-ocid="sahasranam.voice_search_button"
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {faithOptions.map((faith) => (
              <Button
                key={faith}
                variant={faithFilter === faith ? "default" : "outline"}
                size="sm"
                onClick={() => setFaithFilter(faith)}
                style={
                  faithFilter === faith
                    ? {
                        background: "oklch(0.68 0.20 48)",
                        color: "white",
                        border: "1px solid oklch(0.68 0.20 48)",
                      }
                    : {
                        borderColor: "oklch(0.78 0.14 75 / 0.6)",
                        color: "oklch(0.50 0.18 50)",
                      }
                }
                data-ocid={"sahasranam.faith.tab"}
              >
                {faith}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Voice error */}
        {voiceError && (
          <div
            className="mb-4 px-4 py-2 rounded-lg text-sm"
            style={{
              background: "oklch(0.95 0.05 25)",
              color: "oklch(0.50 0.18 25)",
              border: "1px solid oklch(0.80 0.10 25 / 0.4)",
            }}
            data-ocid="sahasranam.voice_error_state"
          >
            ⚠️ {voiceError}
          </div>
        )}

        {/* Count */}
        <p className="text-sm mb-6" style={{ color: "oklch(0.55 0.08 50)" }}>
          {filtered.length} सहस्रनाम मिले
        </p>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="sahasranam.empty_state">
            <div className="text-5xl mb-4">🕉️</div>
            <p style={{ color: "oklch(0.55 0.08 50)" }}>कोई सहस्रनाम नहीं मिला</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((sahasranam, idx) => (
              <motion.div
                key={sahasranam.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                className="rounded-2xl overflow-hidden border cursor-pointer group hover:shadow-xl transition-all duration-300"
                style={{
                  background: "white",
                  borderColor: "oklch(0.88 0.08 75 / 0.8)",
                }}
                onClick={() => setSelectedSahasranam(sahasranam as Stotra)}
                data-ocid={`sahasranam.item.${idx + 1}`}
              >
                {/* Card Header */}
                <div
                  className="p-5 relative"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.20 0.08 22) 0%, oklch(0.28 0.12 35) 100%)",
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl">
                      {getDeityIcon(sahasranam.deity)}
                    </span>
                    <Badge
                      className="text-xs"
                      style={{
                        background: "oklch(0.68 0.20 48 / 0.35)",
                        color: "oklch(0.95 0.12 80)",
                        border: "1px solid oklch(0.68 0.20 48 / 0.6)",
                      }}
                    >
                      {sahasranam.faith}
                    </Badge>
                  </div>
                  <h3
                    className="font-bold text-lg leading-tight"
                    style={{ color: "oklch(0.90 0.16 75)" }}
                  >
                    {sahasranam.title}
                  </h3>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "oklch(0.75 0.10 70)" }}
                  >
                    {sahasranam.deity}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* 108 Note */}
                  <div
                    className="flex items-center gap-2 text-xs font-medium mb-3 rounded-lg px-3 py-2"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.08)",
                      color: "oklch(0.50 0.18 50)",
                      border: "1px solid oklch(0.68 0.20 48 / 0.2)",
                    }}
                  >
                    <span>⚠️</span>
                    <span>१०२ नाम सहित | पूर्ण १०००+ नाम उपलब्ध</span>
                  </div>

                  <p
                    className="text-xs leading-relaxed line-clamp-3"
                    style={{ color: "oklch(0.45 0.06 50)" }}
                  >
                    {sahasranam.description}
                  </p>

                  <div
                    className="mt-4 flex items-center text-sm font-medium group-hover:underline"
                    style={{ color: "oklch(0.55 0.18 50)" }}
                  >
                    पढ़ें →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
