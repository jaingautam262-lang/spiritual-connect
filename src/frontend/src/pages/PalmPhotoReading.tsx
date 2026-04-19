import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ChevronRight, Hand, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import {
  useCreatePalmPhotoReading,
  useGetMyPalmPhotoReadings,
} from "../hooks/useQueries";

// ─── Types ────────────────────────────────────────────────────────────────────

type LineStrength = "Strong" | "Medium" | "Weak" | "Absent";
type PalmShape = "earth" | "air" | "fire" | "water";
type HandType = "right" | "left";

interface LineAnnotation {
  id: string;
  nameEn: string;
  nameHi: string;
  descEn: string;
  descHi: string;
  category: "major" | "minor";
  strength: LineStrength;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const PALM_SHAPES: {
  id: PalmShape;
  icon: string;
  en: string;
  hi: string;
  descEn: string;
  descHi: string;
}[] = [
  {
    id: "earth",
    icon: "🌍",
    en: "Earth (Prithvi Hast)",
    hi: "पृथ्वी हस्त",
    descEn: "Square palm, short fingers — practical & stable",
    descHi: "चौकोर हथेली, छोटी उंगलियां — व्यावहारिक और स्थिर",
  },
  {
    id: "air",
    icon: "🌬️",
    en: "Air (Vayu Hast)",
    hi: "वायु हस्त",
    descEn: "Square palm, long fingers — intellectual & communicative",
    descHi: "चौकोर हथेली, लंबी उंगलियां — बौद्धिक और संचारी",
  },
  {
    id: "fire",
    icon: "🔥",
    en: "Fire (Agni Hast)",
    hi: "अग्नि हस्त",
    descEn: "Long palm, short fingers — energetic & leadership",
    descHi: "लंबी हथेली, छोटी उंगलियां — ऊर्जावान और नेतृत्वकारी",
  },
  {
    id: "water",
    icon: "🌊",
    en: "Water (Jal Hast)",
    hi: "जल हस्त",
    descEn: "Long palm, long fingers — intuitive & emotional",
    descHi: "लंबी हथेली, लंबी उंगलियां — अंतर्ज्ञानी और भावुक",
  },
];

const DEFAULT_LINES: Omit<LineAnnotation, "strength">[] = [
  {
    id: "heart",
    nameEn: "Heart Line",
    nameHi: "हृदय रेखा",
    descEn: "Love, emotions & relationships",
    descHi: "प्रेम, भावनाएं और संबंध",
    category: "major",
  },
  {
    id: "head",
    nameEn: "Head Line",
    nameHi: "मस्तिष्क रेखा",
    descEn: "Intellect, wisdom & decisions",
    descHi: "बुद्धि, विवेक और निर्णय",
    category: "major",
  },
  {
    id: "life",
    nameEn: "Life Line",
    nameHi: "जीवन रेखा",
    descEn: "Vitality, energy & life journey",
    descHi: "जीवन शक्ति, ऊर्जा और यात्रा",
    category: "major",
  },
  {
    id: "fate",
    nameEn: "Fate Line",
    nameHi: "भाग्य रेखा",
    descEn: "Destiny, career & life path",
    descHi: "भाग्य, करियर और जीवन पथ",
    category: "major",
  },
  {
    id: "sun",
    nameEn: "Sun Line",
    nameHi: "सूर्य रेखा",
    descEn: "Fame, talent & recognition",
    descHi: "यश, प्रतिभा और पहचान",
    category: "major",
  },
  {
    id: "health",
    nameEn: "Health Line",
    nameHi: "स्वास्थ्य रेखा",
    descEn: "Physical health & constitution",
    descHi: "शारीरिक स्वास्थ्य और संरचना",
    category: "minor",
  },
  {
    id: "mercury",
    nameEn: "Mercury Line",
    nameHi: "बुध रेखा",
    descEn: "Business, communication & finance",
    descHi: "व्यापार, संचार और वित्त",
    category: "minor",
  },
  {
    id: "venus",
    nameEn: "Venus Girdle",
    nameHi: "शुक्र मेखला",
    descEn: "Sensuality, creativity & passion",
    descHi: "कामुकता, रचनात्मकता और जुनून",
    category: "minor",
  },
  {
    id: "mars",
    nameEn: "Mars Line",
    nameHi: "मंगल रेखा",
    descEn: "Courage, aggression & resilience",
    descHi: "साहस, आक्रामकता और लचीलापन",
    category: "minor",
  },
  {
    id: "moon",
    nameEn: "Moon Line",
    nameHi: "चंद्र रेखा",
    descEn: "Intuition, imagination & mysticism",
    descHi: "अंतर्ज्ञान, कल्पना और रहस्यवाद",
    category: "minor",
  },
];

const STRENGTH_OPTIONS: LineStrength[] = ["Strong", "Medium", "Weak", "Absent"];

const STRENGTH_COLORS: Record<LineStrength, string> = {
  Strong: "oklch(0.55 0.18 145)",
  Medium: "oklch(0.68 0.20 48)",
  Weak: "oklch(0.65 0.15 55)",
  Absent: "oklch(0.55 0.04 50)",
};

// ─── Reading Generator ────────────────────────────────────────────────────────

function generateReading(
  palmShape: PalmShape,
  lines: LineAnnotation[],
  lang: "hi" | "en",
): { text: string; dominant: string; luckySign: string } {
  const strongLines = lines.filter((l) => l.strength === "Strong");
  const dominant = strongLines.length > 0 ? strongLines[0] : lines[0];

  const palmProfiles = {
    earth: {
      en: "Your Earth hand reveals a deeply practical, reliable, and grounded soul. You thrive in structured environments and find joy in tangible results. Your feet are firmly planted on the ground — a quality that makes you an anchor for family and colleagues alike.",
      hi: "आपका पृथ्वी हस्त एक व्यावहारिक, विश्वसनीय और स्थिर आत्मा को दर्शाता है। आप संरचित वातावरण में फलते-फूलते हैं और ठोस परिणामों में आनंद पाते हैं। आपकी जड़ें गहरी हैं — यह गुण आपको परिवार और सहकर्मियों के लिए आधारशिला बनाता है।",
    },
    air: {
      en: "Your Air hand belongs to an intellectual, articulate, and socially gifted individual. You possess rare communication skills and a restless mind that seeks knowledge. You shine in fields that demand mental agility, creativity in ideas, and the power of words.",
      hi: "आपका वायु हस्त एक बौद्धिक, वाक्पटु और सामाजिक रूप से प्रतिभाशाली व्यक्ति का प्रतीक है। आपके पास दुर्लभ संचार कौशल और एक जिज्ञासु मन है। आप उन क्षेत्रों में चमकते हैं जो मानसिक चपलता और शब्दों की शक्ति की मांग करते हैं।",
    },
    fire: {
      en: "Your Fire hand marks you as a natural leader — passionate, bold, and visionary. You possess the rare ability to inspire others with your energy and enthusiasm. You are born to take initiative, and your courage in the face of challenges defines your destiny.",
      hi: "आपका अग्नि हस्त आपको एक स्वाभाविक नेता के रूप में दर्शाता है — उत्साही, साहसी और दूरदर्शी। आपके पास अपनी ऊर्जा से दूसरों को प्रेरित करने की दुर्लभ क्षमता है। आप पहल करने के लिए जन्मे हैं।",
    },
    water: {
      en: "Your Water hand belongs to a deeply intuitive, emotionally intelligent, and creative soul. You feel the world more deeply than most and possess natural healing and artistic gifts. Your empathy and sensitivity are your greatest strengths.",
      hi: "आपका जल हस्त एक गहरे अंतर्ज्ञानी, भावनात्मक रूप से बुद्धिमान और रचनात्मक आत्मा का प्रतीक है। आप दुनिया को अधिकांश से अधिक गहराई से महसूस करते हैं और स्वाभाविक उपचार व कलात्मक प्रतिभाएं रखते हैं।",
    },
  };

  const lineInsights: Record<string, { en: string; hi: string }> = {
    heart: {
      en: "Your strong Heart Line indicates exceptional emotional depth and the capacity to love unconditionally. Relationships are your treasure — you give your heart fully and receive blessings in return.",
      hi: "आपकी मजबूत हृदय रेखा असाधारण भावनात्मक गहराई और बिना शर्त प्यार करने की क्षमता दर्शाती है। संबंध आपका खजाना हैं।",
    },
    head: {
      en: "Your powerful Head Line reveals razor-sharp intellect and analytical mastery. You are gifted with the ability to dissect complex problems and arrive at wise solutions.",
      hi: "आपकी शक्तिशाली मस्तिष्क रेखा तीक्ष्ण बुद्धि और विश्लेषणात्मक दक्षता दर्शाती है। आपके पास जटिल समस्याओं को सुलझाने की विलक्षण प्रतिभा है।",
    },
    life: {
      en: "Your deep Life Line radiates vital energy and remarkable resilience. You possess extraordinary physical vitality and will overcome life's challenges with grace and strength.",
      hi: "आपकी गहरी जीवन रेखा महत्वपूर्ण ऊर्जा और अद्भुत लचीलेपन को दर्शाती है। आप जीवन की चुनौतियों को अनुग्रह और शक्ति के साथ पार करेंगे।",
    },
    fate: {
      en: "Your clear Fate Line signals a strong sense of purpose and destiny. You are guided by unseen forces toward your highest potential — your path is marked and your success is written.",
      hi: "आपकी स्पष्ट भाग्य रेखा उद्देश्य और भाग्य की मजबूत भावना का संकेत देती है। अदृश्य शक्तियां आपको आपकी उच्चतम क्षमता की ओर मार्गदर्शन करती हैं।",
    },
    sun: {
      en: "The Sun Line in your palm is a rare blessing — it heralds public recognition, creative success, and lasting fame. Your talents are destined to shine before the world.",
      hi: "आपकी हथेली में सूर्य रेखा एक दुर्लभ आशीर्वाद है — यह सार्वजनिक पहचान, रचनात्मक सफलता और स्थायी यश का संकेत देती है।",
    },
    health: {
      en: "A strong Health Line indicates a robust constitution and natural healing ability. Take care of your body and it will serve you well through all seasons of life.",
      hi: "मजबूत स्वास्थ्य रेखा मजबूत संरचना और प्राकृतिक उपचार क्षमता दर्शाती है। अपने शरीर की देखभाल करें और यह जीवन के सभी मौसमों में आपकी सेवा करेगा।",
    },
    mercury: {
      en: "Your Mercury Line blesses you with business acumen and persuasive communication. Financial intelligence is your gift — use it wisely to build lasting prosperity.",
      hi: "आपकी बुध रेखा आपको व्यापारिक समझ और प्रेरक संचार से आशीर्वादित करती है। वित्तीय बुद्धिमत्ता आपका उपहार है।",
    },
    venus: {
      en: "The Venus Girdle in your palm speaks of deep passion, heightened aesthetic sensitivity, and intense emotional connections. You are drawn to beauty in all its forms.",
      hi: "आपकी हथेली में शुक्र मेखला गहरे जुनून, उच्च सौंदर्य संवेदनशीलता और तीव्र भावनात्मक संबंधों की बात करती है।",
    },
    mars: {
      en: "Your Mars Line infuses you with exceptional courage and warrior spirit. You rise to challenges, defend what you love, and emerge stronger from every battle.",
      hi: "आपकी मंगल रेखा आपको असाधारण साहस और योद्धा भावना से भरती है। आप चुनौतियों का सामना करते हैं और हर लड़ाई से मजबूत होकर उभरते हैं।",
    },
    moon: {
      en: "The Moon Line gifts you with powerful intuition and a deep connection to the mystical. Trust your inner voice — it is your wisest guide in all matters.",
      hi: "चंद्र रेखा आपको शक्तिशाली अंतर्ज्ञान और रहस्यमय से गहरा संबंध प्रदान करती है। अपनी आंतरिक आवाज पर भरोसा करें।",
    },
  };

  const luckySignsMap: Record<PalmShape, { en: string; hi: string }> = {
    earth: {
      en: "Green tourmaline, Thursday, Number 4, Cow seva",
      hi: "हरा टूमलाइन, गुरुवार, अंक 4, गौ सेवा",
    },
    air: {
      en: "Blue sapphire, Wednesday, Number 5, Saraswati puja",
      hi: "नीलम, बुधवार, अंक 5, सरस्वती पूजा",
    },
    fire: {
      en: "Ruby, Sunday, Number 1, Surya Arghya at sunrise",
      hi: "माणिक, रविवार, अंक 1, सूर्योदय पर सूर्य अर्घ्य",
    },
    water: {
      en: "Pearl, Monday, Number 2, Chandra darshan on Purnima",
      hi: "मोती, सोमवार, अंक 2, पूर्णिमा को चंद्र दर्शन",
    },
  };

  const lineInsight = lineInsights[dominant.id] ?? lineInsights.life;
  const luckySigns = luckySignsMap[palmShape];

  const textEn = `${palmProfiles[palmShape].en}\n\n${lineInsight.en}\n\nLucky Signs: ${luckySigns.en}`;
  const textHi = `${palmProfiles[palmShape].hi}\n\n${lineInsight.hi}\n\nशुभ संकेत: ${luckySigns.hi}`;

  return {
    text: lang === "hi" ? textHi : textEn,
    dominant: lang === "hi" ? dominant.nameHi : dominant.nameEn,
    luckySign: lang === "hi" ? luckySigns.hi : luckySigns.en,
  };
}

// ─── Step Components ──────────────────────────────────────────────────────────

function StepBadge({
  step,
  active,
  done,
}: { step: number; active: boolean; done: boolean }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
      style={{
        background: done
          ? "oklch(0.55 0.18 145)"
          : active
            ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
            : "oklch(0.28 0.06 25)",
        color: "white",
      }}
    >
      {done ? <CheckCircle2 className="w-4 h-4" /> : step}
    </div>
  );
}

function Stepper({ current }: { current: number }) {
  const { language } = useLanguage();
  const steps =
    language === "hi"
      ? ["फोटो अपलोड", "रेखा विश्लेषण", "पाठन देखें"]
      : ["Upload Photo", "Annotate Lines", "View Reading"];
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {steps.map((label, idx) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <StepBadge
              step={idx + 1}
              active={current === idx + 1}
              done={current > idx + 1}
            />
            <span
              className="text-xs font-body hidden sm:block"
              style={{
                color:
                  current === idx + 1
                    ? "oklch(0.78 0.14 75)"
                    : "oklch(0.55 0.04 50)",
              }}
            >
              {label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className="w-12 h-0.5 mb-5"
              style={{
                background:
                  current > idx + 1
                    ? "oklch(0.55 0.18 145)"
                    : "oklch(0.30 0.06 25)",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PalmPhotoReading() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"new" | "saved">("new");
  const [step, setStep] = useState(1);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [handType, setHandType] = useState<HandType>("right");
  const [palmShape, setPalmShape] = useState<PalmShape | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lines, setLines] = useState<LineAnnotation[]>(
    DEFAULT_LINES.map((l) => ({ ...l, strength: "Medium" as LineStrength })),
  );
  const [generatedReading, setGeneratedReading] = useState<{
    text: string;
    dominant: string;
    luckySign: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createReading = useCreatePalmPhotoReading();
  const { data: savedReadings, isLoading: loadingSaved } =
    useGetMyPalmPhotoReadings();

  const isHindi = language === "hi";

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error(
          isHindi ? "कृपया एक छवि फ़ाइल चुनें" : "Please select an image file",
        );
        return;
      }
      setPhotoFile(file);
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    },
    [isHindi],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect],
  );

  const handleLineStrength = (lineId: string, strength: LineStrength) => {
    setLines((prev) =>
      prev.map((l) => (l.id === lineId ? { ...l, strength } : l)),
    );
  };

  const handleGenerateReading = () => {
    if (!palmShape) {
      toast.error(
        isHindi ? "कृपया हस्त प्रकार चुनें" : "Please select your palm shape",
      );
      return;
    }
    const reading = generateReading(palmShape, lines, language);
    setGeneratedReading(reading);
    setStep(3);
  };

  const handleSaveReading = async () => {
    if (!generatedReading || !palmShape) return;
    setIsSaving(true);
    try {
      const strongLines = lines.filter((l) => l.strength === "Strong");
      const annotations = lines.map((l) => `${l.id}:${l.strength}`).join(",");
      await createReading.mutateAsync({
        photoUrl: photoUrl || "data:palm-reading/local",
        handType,
        palmShape,
        lineAnnotations: annotations,
        readingText: generateReading(palmShape, lines, "en").text,
        dominantLine: strongLines.length > 0 ? strongLines[0].id : "life",
        luckySigns: generatedReading.luckySign,
      });
      setSavedSuccess(true);
      toast.success(isHindi ? "पाठन सहेजा गया! 🙏" : "Reading saved! 🙏");
    } catch {
      toast.error(isHindi ? "सहेजने में त्रुटि हुई" : "Error saving reading");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setPhotoUrl("");
    setPhotoFile(null);
    setPalmShape(null);
    setGeneratedReading(null);
    setSavedSuccess(false);
    setLines(
      DEFAULT_LINES.map((l) => ({ ...l, strength: "Medium" as LineStrength })),
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.16 0.06 22) 0%, oklch(0.12 0.04 20) 100%)",
      }}
    >
      {/* Header */}
      <div
        className="relative overflow-hidden py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.08 28) 0%, oklch(0.18 0.07 22) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
      >
        <div className="container mx-auto text-center relative z-10">
          <div className="text-5xl mb-3">🖐️</div>
          <h1
            className="font-display text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            हस्त फोटो पाठन
          </h1>
          <p
            className="text-lg font-body mb-1"
            style={{ color: "oklch(0.68 0.08 65)" }}
          >
            Palm Photo Reading
          </p>
          <p
            className="text-sm font-body max-w-xl mx-auto"
            style={{ color: "oklch(0.55 0.04 50)" }}
          >
            {isHindi
              ? "अपने हाथ की फोटो अपलोड करें और विस्तृत वैदिक हस्तरेखा पाठन प्राप्त करें"
              : "Upload your palm photo and receive a detailed Vedic palmistry reading"}
          </p>
        </div>
        {/* Decorative glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
          style={{ background: "oklch(0.78 0.14 75)", filter: "blur(80px)" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as "new" | "saved")}
        >
          <TabsList
            className="mb-8 w-full max-w-xs mx-auto grid grid-cols-2"
            style={{ background: "oklch(0.22 0.07 25)" }}
          >
            <TabsTrigger
              value="new"
              data-ocid="palm_photo.new_reading_tab"
              style={{
                color:
                  activeTab === "new"
                    ? "oklch(0.78 0.14 75)"
                    : "oklch(0.55 0.04 50)",
              }}
            >
              {isHindi ? "नया पाठन" : "New Reading"}
            </TabsTrigger>
            <TabsTrigger
              value="saved"
              data-ocid="palm_photo.saved_readings_tab"
              style={{
                color:
                  activeTab === "saved"
                    ? "oklch(0.78 0.14 75)"
                    : "oklch(0.55 0.04 50)",
              }}
            >
              {isHindi ? "सहेजे गए" : "Saved Readings"}
            </TabsTrigger>
          </TabsList>

          {/* ── New Reading Tab ── */}
          <TabsContent value="new">
            <Stepper current={step} />

            {/* STEP 1: Upload */}
            {step === 1 && (
              <div className="space-y-6" data-ocid="palm_photo.step1_section">
                {/* Upload zone */}
                <Card
                  style={{
                    background: "oklch(0.20 0.07 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  <CardHeader>
                    <CardTitle
                      className="font-display text-lg"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {isHindi
                        ? "📸 हाथ की फोटो अपलोड करें"
                        : "📸 Upload Palm Photo"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!photoUrl ? (
                      <button
                        type="button"
                        className="w-full border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all"
                        style={{
                          borderColor: isDragging
                            ? "oklch(0.68 0.20 48)"
                            : "oklch(0.78 0.14 75 / 0.3)",
                          background: isDragging
                            ? "oklch(0.68 0.20 48 / 0.08)"
                            : "oklch(0.16 0.05 22)",
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        data-ocid="palm_photo.dropzone"
                        aria-label={
                          isHindi
                            ? "फोटो अपलोड करने के लिए क्लिक या ड्रॉप करें"
                            : "Click or drop to upload photo"
                        }
                      >
                        <Upload
                          className="w-10 h-10 mx-auto mb-3"
                          style={{ color: "oklch(0.68 0.20 48)" }}
                        />
                        <p
                          className="font-body text-sm mb-1"
                          style={{ color: "oklch(0.70 0.06 60)" }}
                        >
                          {isHindi
                            ? "ड्रैग & ड्रॉप या क्लिक करें"
                            : "Drag & drop or click to upload"}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "oklch(0.45 0.04 45)" }}
                        >
                          PNG, JPG, WEBP —{" "}
                          {isHindi ? "अधिकतम 10MB" : "Max 10MB"}
                        </p>
                        <Button
                          type="button"
                          className="mt-4"
                          data-ocid="palm_photo.upload_button"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                            color: "white",
                          }}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {isHindi ? "फोटो चुनें" : "Choose Photo"}
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleFileSelect(f);
                          }}
                        />
                      </button>
                    ) : (
                      <div className="relative">
                        <img
                          src={photoUrl}
                          alt="Uploaded palm"
                          className="w-full max-h-72 object-contain rounded-xl"
                          style={{
                            border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPhotoUrl("");
                            setPhotoFile(null);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full"
                          style={{
                            background: "oklch(0.20 0.08 22 / 0.9)",
                            color: "oklch(0.88 0.06 75)",
                          }}
                          aria-label="Remove photo"
                          data-ocid="palm_photo.remove_photo_button"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p
                          className="mt-2 text-xs text-center"
                          style={{ color: "oklch(0.55 0.18 145)" }}
                        >
                          ✓{" "}
                          {photoFile?.name ??
                            (isHindi ? "फोटो अपलोड हुई" : "Photo uploaded")}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Hand & Palm Shape Selectors */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Hand Type */}
                  <Card
                    style={{
                      background: "oklch(0.20 0.07 25)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                    }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle
                        className="font-display text-base"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {isHindi ? "✋ हाथ चुनें" : "✋ Select Hand"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-3">
                      {(["right", "left"] as HandType[]).map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setHandType(h)}
                          data-ocid={`palm_photo.hand_type_${h}`}
                          className="flex-1 py-3 rounded-xl text-sm font-heading font-semibold transition-all"
                          style={{
                            background:
                              handType === h
                                ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                                : "oklch(0.16 0.05 22)",
                            color:
                              handType === h ? "white" : "oklch(0.65 0.06 55)",
                            border: `1px solid ${handType === h ? "oklch(0.68 0.20 48)" : "oklch(0.30 0.06 25)"}`,
                          }}
                        >
                          {h === "right"
                            ? isHindi
                              ? "दायां हाथ"
                              : "Right Hand"
                            : isHindi
                              ? "बायां हाथ"
                              : "Left Hand"}
                        </button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Palm Shape */}
                  <Card
                    style={{
                      background: "oklch(0.20 0.07 25)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                    }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle
                        className="font-display text-base"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {isHindi ? "🌿 हस्त प्रकार" : "🌿 Palm Shape"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2">
                      {PALM_SHAPES.map((ps) => (
                        <button
                          key={ps.id}
                          type="button"
                          onClick={() => setPalmShape(ps.id)}
                          data-ocid={`palm_photo.palm_shape_${ps.id}`}
                          className="p-3 rounded-xl text-left transition-all"
                          style={{
                            background:
                              palmShape === ps.id
                                ? "oklch(0.68 0.20 48 / 0.15)"
                                : "oklch(0.16 0.05 22)",
                            border: `1px solid ${palmShape === ps.id ? "oklch(0.68 0.20 48 / 0.6)" : "oklch(0.28 0.06 25)"}`,
                          }}
                        >
                          <div className="text-lg mb-0.5">{ps.icon}</div>
                          <div
                            className="text-xs font-heading font-semibold"
                            style={{
                              color:
                                palmShape === ps.id
                                  ? "oklch(0.78 0.14 75)"
                                  : "oklch(0.65 0.06 55)",
                            }}
                          >
                            {isHindi ? ps.hi : ps.en}
                          </div>
                          <div
                            className="text-xs mt-0.5"
                            style={{ color: "oklch(0.45 0.04 45)" }}
                          >
                            {isHindi ? ps.descHi : ps.descEn}
                          </div>
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Button
                  onClick={() => {
                    if (!palmShape) {
                      toast.error(
                        isHindi
                          ? "कृपया हस्त प्रकार चुनें"
                          : "Please select palm shape",
                      );
                      return;
                    }
                    setStep(2);
                  }}
                  className="w-full py-3 font-heading font-bold text-base"
                  data-ocid="palm_photo.next_step1_button"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                  }}
                >
                  {isHindi ? "अगला चरण" : "Next Step"}{" "}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}

            {/* STEP 2: Line Annotation */}
            {step === 2 && (
              <div className="space-y-4" data-ocid="palm_photo.step2_section">
                <Card
                  style={{
                    background: "oklch(0.20 0.07 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  <CardHeader>
                    <CardTitle
                      className="font-display text-lg"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {isHindi ? "✍️ रेखा शक्ति चुनें" : "✍️ Rate Your Lines"}
                    </CardTitle>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.55 0.04 50)" }}
                    >
                      {isHindi
                        ? "अपने हाथ की प्रत्येक रेखा की शक्ति बताएं"
                        : "Indicate the strength of each line visible on your palm"}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(["major", "minor"] as const).map((cat) => (
                      <div key={cat}>
                        <p
                          className="text-xs font-heading font-bold uppercase tracking-wider mb-3"
                          style={{ color: "oklch(0.68 0.20 48)" }}
                        >
                          {cat === "major"
                            ? isHindi
                              ? "प्रमुख रेखाएं"
                              : "Major Lines"
                            : isHindi
                              ? "गौण रेखाएं"
                              : "Minor Lines"}
                        </p>
                        <div className="space-y-2">
                          {lines
                            .filter((l) => l.category === cat)
                            .map((line, idx) => (
                              <div
                                key={line.id}
                                className="rounded-xl p-3"
                                style={{
                                  background: "oklch(0.16 0.05 22)",
                                  border: "1px solid oklch(0.28 0.06 25)",
                                }}
                                data-ocid={`palm_photo.line_${line.id}`}
                              >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                  <div>
                                    <p
                                      className="text-sm font-heading font-semibold"
                                      style={{ color: "oklch(0.75 0.08 65)" }}
                                    >
                                      {isHindi ? line.nameHi : line.nameEn}
                                    </p>
                                    <p
                                      className="text-xs"
                                      style={{ color: "oklch(0.45 0.04 45)" }}
                                    >
                                      {isHindi ? line.descHi : line.descEn}
                                    </p>
                                  </div>
                                  <Badge
                                    className="text-xs whitespace-nowrap shrink-0"
                                    style={{
                                      background: `${STRENGTH_COLORS[line.strength]}22`,
                                      color: STRENGTH_COLORS[line.strength],
                                      border: `1px solid ${STRENGTH_COLORS[line.strength]}44`,
                                    }}
                                  >
                                    {line.strength}
                                  </Badge>
                                </div>
                                <div className="flex gap-1.5 flex-wrap">
                                  {STRENGTH_OPTIONS.map((s) => (
                                    <button
                                      key={s}
                                      type="button"
                                      onClick={() =>
                                        handleLineStrength(line.id, s)
                                      }
                                      data-ocid={`palm_photo.line_strength_${idx}_${s.toLowerCase()}`}
                                      className="px-3 py-1 rounded-full text-xs font-body transition-all"
                                      style={{
                                        background:
                                          line.strength === s
                                            ? `${STRENGTH_COLORS[s]}22`
                                            : "oklch(0.22 0.07 25)",
                                        color:
                                          line.strength === s
                                            ? STRENGTH_COLORS[s]
                                            : "oklch(0.55 0.04 50)",
                                        border: `1px solid ${line.strength === s ? `${STRENGTH_COLORS[s]}55` : "oklch(0.30 0.06 25)"}`,
                                      }}
                                    >
                                      {s}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1"
                    data-ocid="palm_photo.back_step2_button"
                    style={{
                      borderColor: "oklch(0.35 0.07 30)",
                      color: "oklch(0.65 0.06 55)",
                      background: "transparent",
                    }}
                  >
                    {isHindi ? "वापस" : "Back"}
                  </Button>
                  <Button
                    onClick={handleGenerateReading}
                    className="flex-1 font-heading font-bold"
                    data-ocid="palm_photo.generate_reading_button"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                  >
                    {isHindi ? "पाठन तैयार करें ✨" : "Generate Reading ✨"}
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Reading */}
            {step === 3 && generatedReading && (
              <div className="space-y-4" data-ocid="palm_photo.step3_section">
                {/* Palm image + shape badge */}
                <div
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: "oklch(0.20 0.07 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                  }}
                >
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Your palm"
                      className="w-20 h-20 object-cover rounded-lg"
                      style={{ border: "1px solid oklch(0.78 0.14 75 / 0.3)" }}
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-lg flex items-center justify-center text-3xl"
                      style={{ background: "oklch(0.16 0.05 22)" }}
                    >
                      🖐️
                    </div>
                  )}
                  <div>
                    <p
                      className="font-display font-bold"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {PALM_SHAPES.find((p) => p.id === palmShape)?.icon}{" "}
                      {isHindi
                        ? PALM_SHAPES.find((p) => p.id === palmShape)?.hi
                        : PALM_SHAPES.find((p) => p.id === palmShape)?.en}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.55 0.04 50)" }}
                    >
                      {handType === "right"
                        ? isHindi
                          ? "दायां हाथ"
                          : "Right Hand"
                        : isHindi
                          ? "बायां हाथ"
                          : "Left Hand"}
                    </p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {lines
                        .filter((l) => l.strength === "Strong")
                        .map((l) => (
                          <Badge
                            key={l.id}
                            className="text-xs"
                            style={{
                              background: "oklch(0.55 0.18 145 / 0.2)",
                              color: "oklch(0.55 0.18 145)",
                              border: "1px solid oklch(0.55 0.18 145 / 0.4)",
                            }}
                          >
                            {isHindi ? l.nameHi : l.nameEn}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Reading Card */}
                <Card
                  style={{
                    background:
                      "linear-gradient(160deg, oklch(0.22 0.08 28), oklch(0.18 0.06 22))",
                    border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                  }}
                  data-ocid="palm_photo.reading_card"
                >
                  <CardHeader>
                    <CardTitle
                      className="font-display text-xl"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      {isHindi ? "✨ आपका हस्त पाठन" : "✨ Your Palm Reading"}
                    </CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge
                        style={{
                          background: "oklch(0.68 0.20 48 / 0.2)",
                          color: "oklch(0.68 0.20 48)",
                          border: "1px solid oklch(0.68 0.20 48 / 0.4)",
                        }}
                      >
                        <Hand className="w-3 h-3 mr-1" />
                        {isHindi ? "प्रभावी रेखा:" : "Dominant:"}{" "}
                        {generatedReading.dominant}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {generatedReading.text.split("\n\n").map((para) => (
                      <p
                        key={para.slice(0, 30)}
                        className="font-body text-sm leading-relaxed"
                        style={{ color: "oklch(0.78 0.08 65)" }}
                      >
                        {para}
                      </p>
                    ))}

                    <div
                      className="p-4 rounded-xl mt-4"
                      style={{
                        background: "oklch(0.78 0.14 75 / 0.08)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                      }}
                    >
                      <p
                        className="text-sm font-heading font-semibold mb-1"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {isHindi ? "🌟 शुभ संकेत" : "🌟 Lucky Signs"}
                      </p>
                      <p
                        className="text-sm font-body"
                        style={{ color: "oklch(0.70 0.06 60)" }}
                      >
                        {generatedReading.luckySign}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep(2)}
                    variant="outline"
                    className="flex-1"
                    data-ocid="palm_photo.back_step3_button"
                    style={{
                      borderColor: "oklch(0.35 0.07 30)",
                      color: "oklch(0.65 0.06 55)",
                      background: "transparent",
                    }}
                  >
                    {isHindi ? "वापस" : "Back"}
                  </Button>
                  {savedSuccess ? (
                    <div
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl text-sm font-heading font-semibold"
                      style={{
                        background: "oklch(0.55 0.18 145 / 0.15)",
                        color: "oklch(0.55 0.18 145)",
                        border: "1px solid oklch(0.55 0.18 145 / 0.3)",
                      }}
                      data-ocid="palm_photo.success_state"
                    >
                      <CheckCircle2 className="w-4 h-4" />{" "}
                      {isHindi ? "सहेजा गया!" : "Saved!"}
                    </div>
                  ) : (
                    <Button
                      onClick={handleSaveReading}
                      disabled={isSaving}
                      className="flex-1 font-heading font-bold"
                      data-ocid="palm_photo.save_reading_button"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                        color: "white",
                      }}
                    >
                      {isSaving
                        ? isHindi
                          ? "सहेज रहे हैं..."
                          : "Saving..."
                        : isHindi
                          ? "पाठन सहेजें 💾"
                          : "Save Reading 💾"}
                    </Button>
                  )}
                </div>
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  className="w-full text-sm"
                  data-ocid="palm_photo.new_reading_button"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  {isHindi ? "+ नया पाठन शुरू करें" : "+ Start New Reading"}
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ── Saved Readings Tab ── */}
          <TabsContent value="saved">
            {loadingSaved ? (
              <div className="space-y-4" data-ocid="palm_photo.loading_state">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-28 w-full rounded-xl"
                    style={{ background: "oklch(0.22 0.07 25)" }}
                  />
                ))}
              </div>
            ) : !savedReadings?.length ? (
              <div
                className="text-center py-16"
                data-ocid="palm_photo.empty_state"
              >
                <div className="text-5xl mb-4">🖐️</div>
                <p
                  className="font-display text-xl font-bold mb-2"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {isHindi ? "अभी तक कोई पाठन नहीं" : "No Readings Yet"}
                </p>
                <p
                  className="text-sm font-body mb-6"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  {isHindi
                    ? "अपना पहला हस्त फोटो पाठन तैयार करें"
                    : "Create your first palm photo reading"}
                </p>
                <Button
                  onClick={() => setActiveTab("new")}
                  data-ocid="palm_photo.start_reading_button"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                  }}
                >
                  {isHindi ? "पाठन शुरू करें" : "Start Reading"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {savedReadings.map((reading, idx) => (
                  <Card
                    key={reading.id}
                    className="transition-all hover:scale-[1.01]"
                    style={{
                      background: "oklch(0.20 0.07 25)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                    }}
                    data-ocid={`palm_photo.saved_reading.${idx + 1}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-lg">
                              {PALM_SHAPES.find(
                                (p) => p.id === reading.palmShape,
                              )?.icon ?? "🖐️"}
                            </span>
                            <p
                              className="font-heading font-semibold text-sm truncate"
                              style={{ color: "oklch(0.78 0.14 75)" }}
                            >
                              {PALM_SHAPES.find(
                                (p) => p.id === reading.palmShape,
                              )?.[isHindi ? "hi" : "en"] ?? reading.palmShape}
                            </p>
                            <Badge
                              className="text-xs"
                              style={{
                                background: "oklch(0.68 0.20 48 / 0.2)",
                                color: "oklch(0.68 0.20 48)",
                                border: "1px solid oklch(0.68 0.20 48 / 0.35)",
                              }}
                            >
                              {reading.handType === "right"
                                ? isHindi
                                  ? "दायां"
                                  : "Right"
                                : isHindi
                                  ? "बायां"
                                  : "Left"}
                            </Badge>
                          </div>
                          <p
                            className="text-xs font-body line-clamp-2 mb-2"
                            style={{ color: "oklch(0.60 0.04 55)" }}
                          >
                            {reading.readingText?.split("\n")[0] ??
                              (isHindi ? "पाठन उपलब्ध है" : "Reading available")}
                          </p>
                          <p
                            className="text-xs"
                            style={{ color: "oklch(0.42 0.04 45)" }}
                          >
                            {new Date(
                              Number(reading.createdAt) / 1_000_000,
                            ).toLocaleDateString(isHindi ? "hi-IN" : "en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        {reading.photoUrl &&
                          !reading.photoUrl.startsWith("data:palm") && (
                            <img
                              src={reading.photoUrl}
                              alt="Palm"
                              className="w-16 h-16 object-cover rounded-lg shrink-0"
                              style={{
                                border: "1px solid oklch(0.30 0.07 28)",
                              }}
                            />
                          )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
