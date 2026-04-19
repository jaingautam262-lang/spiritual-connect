import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Clock,
  Home,
  Save,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { PANCH_BHUTA, VASTU_DIRECTIONS, VASTU_ROOMS } from "../data/vastuData";
import {
  useCreateVastuRoomCheck,
  useGetMyVastuRoomChecks,
} from "../hooks/useQueries";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface VastuAnalysisResult {
  complianceScore: number;
  issues: Array<{
    title: string;
    titleHi: string;
    severity: "high" | "medium" | "low";
    remedy: string;
    remedyHi: string;
  }>;
  positives: Array<{ text: string; textHi: string }>;
  elementBalance: Record<string, number>;
  idealDirection: string;
  planetaryRuler: string;
}

const ROOM_TYPES = [
  { value: "Living Room", label: "Living Room", labelHi: "बैठक" },
  { value: "Bedroom", label: "Master Bedroom", labelHi: "शयन कक्ष" },
  { value: "Kitchen", label: "Kitchen", labelHi: "रसोई" },
  { value: "Bathroom", label: "Bathroom / Toilet", labelHi: "स्नानघर" },
  { value: "Puja Room", label: "Puja Room", labelHi: "पूजा कक्ष" },
  { value: "Study Room", label: "Study Room", labelHi: "अध्ययन कक्ष" },
  { value: "Store Room", label: "Store Room", labelHi: "भंडार कक्ष" },
  { value: "Dining Room", label: "Dining Room", labelHi: "भोजन कक्ष" },
  { value: "Garage", label: "Garage", labelHi: "गैरेज" },
];

const DIRECTIONS = [
  { value: "N", label: "N", labelFull: "North" },
  { value: "NE", label: "NE", labelFull: "North-East" },
  { value: "E", label: "E", labelFull: "East" },
  { value: "SE", label: "SE", labelFull: "South-East" },
  { value: "S", label: "S", labelFull: "South" },
  { value: "SW", label: "SW", labelFull: "South-West" },
  { value: "W", label: "W", labelFull: "West" },
  { value: "NW", label: "NW", labelFull: "North-West" },
];

// Maps compass position for each direction
const COMPASS_POSITIONS: Record<
  string,
  { top: string; left: string; transform: string }
> = {
  N: { top: "4%", left: "50%", transform: "translate(-50%,-50%)" },
  NE: { top: "15%", left: "82%", transform: "translate(-50%,-50%)" },
  E: { top: "50%", left: "94%", transform: "translate(-50%,-50%)" },
  SE: { top: "82%", left: "82%", transform: "translate(-50%,-50%)" },
  S: { top: "94%", left: "50%", transform: "translate(-50%,-50%)" },
  SW: { top: "82%", left: "18%", transform: "translate(-50%,-50%)" },
  W: { top: "50%", left: "8%", transform: "translate(-50%,-50%)" },
  NW: { top: "15%", left: "18%", transform: "translate(-50%,-50%)" },
};

// Compliance rules: which direction is ideal for which room
const ROOM_DIRECTION_RULES: Record<
  string,
  { ideal: string[]; acceptable: string[]; avoid: string[] }
> = {
  "Puja Room": {
    ideal: ["NE", "E"],
    acceptable: ["N"],
    avoid: ["S", "SW", "SE"],
  },
  "Study Room": {
    ideal: ["NE", "N", "E"],
    acceptable: ["W", "NW"],
    avoid: ["S", "SW"],
  },
  Kitchen: { ideal: ["SE"], acceptable: ["NW"], avoid: ["NE", "SW", "N"] },
  Bedroom: { ideal: ["SW", "S"], acceptable: ["W", "NW"], avoid: ["NE", "SE"] },
  "Living Room": { ideal: ["N", "E", "NE"], acceptable: ["SE"], avoid: ["SW"] },
  Bathroom: { ideal: ["NW", "W"], acceptable: ["E"], avoid: ["NE", "SW"] },
  "Store Room": {
    ideal: ["S", "SW", "W"],
    acceptable: ["NW"],
    avoid: ["NE", "E"],
  },
  "Dining Room": { ideal: ["W", "E"], acceptable: ["N"], avoid: ["SW", "SE"] },
  Garage: { ideal: ["NW", "SE"], acceptable: ["W"], avoid: ["NE", "SW"] },
};

// Element balance: each direction enhances specific elements
const DIRECTION_ELEMENTS: Record<string, string[]> = {
  N: ["Water", "Earth"],
  NE: ["Water", "Space"],
  E: ["Fire", "Light"],
  SE: ["Fire"],
  S: ["Fire", "Earth"],
  SW: ["Earth"],
  W: ["Air", "Earth"],
  NW: ["Air", "Water"],
};

function analyzeVastu(
  roomType: string,
  direction: string,
  widthFt: number,
  lengthFt: number,
): VastuAnalysisResult {
  const rules = ROOM_DIRECTION_RULES[roomType];
  const issues: VastuAnalysisResult["issues"] = [];
  const positives: VastuAnalysisResult["positives"] = [];
  let score = 50; // base

  // Direction compliance
  if (rules) {
    if (rules.ideal.includes(direction)) {
      score += 30;
      positives.push({
        text: `${direction} is the ideal direction for ${roomType}.`,
        textHi: `${direction} दिशा ${roomType} के लिए सर्वोत्तम है।`,
      });
    } else if (rules.acceptable.includes(direction)) {
      score += 15;
      positives.push({
        text: `${direction} is an acceptable direction for ${roomType}.`,
        textHi: `${direction} दिशा ${roomType} के लिए स्वीकार्य है।`,
      });
    } else if (rules.avoid.includes(direction)) {
      score -= 25;
      const vastuDir = VASTU_DIRECTIONS.find((d) =>
        d.directionOrRoom.includes(
          direction === "NE"
            ? "North-East"
            : direction === "NW"
              ? "North-West"
              : direction === "SE"
                ? "South-East"
                : direction === "SW"
                  ? "South-West"
                  : "",
        ),
      );
      issues.push({
        title: `Wrong direction for ${roomType}`,
        titleHi: `${roomType} की दिशा गलत है`,
        severity: "high",
        remedy: `Move the ${roomType} to ${rules.ideal.join(" or ")} direction. ${vastuDir?.remediesEn ?? ""}`,
        remedyHi: `${roomType} को ${rules.ideal.join(" या ")} दिशा में स्थानांतरित करें।`,
      });
    }
  }

  // Dimension ratio check (ideal: 1:1.5 to 1:2)
  const ratio =
    lengthFt > 0 && widthFt > 0
      ? Math.max(widthFt, lengthFt) / Math.min(widthFt, lengthFt)
      : 1;
  if (ratio > 2.5) {
    score -= 10;
    issues.push({
      title: "Unfavorable room proportions",
      titleHi: "कक्ष के अनुपात अनुकूल नहीं",
      severity: "medium",
      remedy:
        "Ideal room ratio is 1:1.5 to 1:2. Consider partitioning or redesigning the space.",
      remedyHi:
        "आदर्श कक्ष अनुपात 1:1.5 से 1:2 है। विभाजन या पुनः डिज़ाइन पर विचार करें।",
    });
  } else if (ratio >= 1 && ratio <= 2) {
    score += 10;
    positives.push({
      text: "Room dimensions are Vastu-compliant (ideal ratio).",
      textHi: "कक्ष के आयाम वास्तु-अनुरूप हैं (आदर्श अनुपात)।",
    });
  }

  // Puja-specific rule: never in SW
  if (roomType === "Puja Room" && ["SW", "S"].includes(direction)) {
    score -= 15;
    issues.push({
      title: "Puja room in inauspicious direction",
      titleHi: "पूजा कक्ष अशुभ दिशा में",
      severity: "high",
      remedy:
        "Move puja room to NE (Ishan Kona) — the most sacred corner ruled by Jupiter.",
      remedyHi:
        "पूजा कक्ष को NE (ईशान कोण) में स्थानांतरित करें — बृहस्पति का पवित्र कोण।",
    });
  }

  // Kitchen-specific: never in NE
  if (roomType === "Kitchen" && direction === "NE") {
    score -= 20;
    issues.push({
      title: "Kitchen in sacred NE — most severe Vastu defect",
      titleHi: "पवित्र NE में रसोई — सबसे गंभीर वास्तु दोष",
      severity: "high",
      remedy:
        "Immediately relocate kitchen to SE. This is the most severe vastu defect.",
      remedyHi: "रसोई को तत्काल SE में स्थानांतरित करें। यह सबसे गंभीर वास्तु दोष है।",
    });
  }

  // Element balance
  const activeElements = DIRECTION_ELEMENTS[direction] ?? [];
  const elementBalance: Record<string, number> = {
    "Prithvi (Earth)": 20,
    "Jal (Water)": 20,
    "Agni (Fire)": 20,
    "Vayu (Air)": 20,
    "Akash (Space)": 20,
  };
  for (const el of activeElements) {
    if (el === "Earth") elementBalance["Prithvi (Earth)"] += 16;
    if (el === "Water") elementBalance["Jal (Water)"] += 16;
    if (el === "Fire" || el === "Light") elementBalance["Agni (Fire)"] += 16;
    if (el === "Air") elementBalance["Vayu (Air)"] += 16;
    if (el === "Space") elementBalance["Akash (Space)"] += 16;
  }

  // Find the direction data
  const dirData = VASTU_DIRECTIONS.find((d) => {
    const map: Record<string, string> = {
      N: "North",
      S: "South",
      E: "East",
      W: "West",
      NE: "North-East",
      NW: "North-West",
      SE: "South-East",
      SW: "South-West",
    };
    return d.directionOrRoom.includes(map[direction] ?? direction);
  });

  const clampedScore = Math.max(0, Math.min(100, score));

  return {
    complianceScore: clampedScore,
    issues,
    positives,
    elementBalance,
    idealDirection: rules?.ideal.join(", ") ?? direction,
    planetaryRuler: dirData?.planetaryRuler ?? "—",
  };
}

// ─── Compliance Gauge ──────────────────────────────────────────────────────────

function ComplianceGauge({ score }: { score: number }) {
  const color =
    score >= 75
      ? "oklch(0.65 0.20 145)"
      : score >= 50
        ? "oklch(0.75 0.20 75)"
        : "oklch(0.60 0.22 30)";
  const label =
    score >= 75
      ? "Vastu Compliant"
      : score >= 50
        ? "Partially Compliant"
        : "Needs Attention";
  const labelHi =
    score >= 75 ? "वास्तु अनुकूल" : score >= 50 ? "आंशिक अनुकूल" : "सुधार आवश्यक";

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className="flex flex-col items-center gap-2"
      data-ocid="vastu_checker.score_gauge"
    >
      <svg
        width="130"
        height="130"
        viewBox="0 0 130 130"
        aria-label={`Compliance score: ${score} out of 100`}
      >
        <title>Vastu Compliance Score: {score}/100</title>
        <circle
          cx="65"
          cy="65"
          r={radius}
          fill="none"
          stroke="oklch(0.25 0.04 40)"
          strokeWidth="12"
        />
        <circle
          cx="65"
          cy="65"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text
          x="65"
          y="58"
          textAnchor="middle"
          fill={color}
          fontSize="22"
          fontWeight="700"
        >
          {score}
        </text>
        <text
          x="65"
          y="74"
          textAnchor="middle"
          fill="oklch(0.75 0.06 60)"
          fontSize="10"
        >
          /100
        </text>
      </svg>
      <div className="text-center">
        <p className="font-heading font-bold text-sm" style={{ color }}>
          {label}
        </p>
        <p
          className="text-xs font-body"
          style={{ color: "oklch(0.70 0.04 55)" }}
        >
          {labelHi}
        </p>
      </div>
    </div>
  );
}

// ─── Element Balance Bar ────────────────────────────────────────────────────────

function ElementBalanceBar({
  label,
  value,
  color,
}: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="font-body" style={{ color: "oklch(0.80 0.06 60)" }}>
          {label}
        </span>
        <span className="font-heading font-semibold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div
        className="h-2 rounded-full"
        style={{ background: "oklch(0.22 0.04 40)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${Math.min(value, 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function VastuRoomChecker() {
  const [step, setStep] = useState(1);
  const [floorPlanUrl, setFloorPlanUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [roomType, setRoomType] = useState("Living Room");
  const [width, setWidth] = useState("12");
  const [length, setLength] = useState("15");
  const [direction, setDirection] = useState("E");
  const [mainActivity, setMainActivity] = useState("");
  const [result, setResult] = useState<VastuAnalysisResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const saveCheck = useCreateVastuRoomCheck();
  const { data: pastChecks = [], isLoading: loadingHistory } =
    useGetMyVastuRoomChecks();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFloorPlanUrl(url);
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = () => {
    const w = Number.parseFloat(width) || 12;
    const l = Number.parseFloat(length) || 15;
    const analysis = analyzeVastu(roomType, direction, w, l);
    setResult(analysis);
    setStep(3);
  };

  const handleSave = async () => {
    if (!result) return;
    await saveCheck.mutateAsync({
      floorPlanUrl,
      roomType,
      roomDimensions: `${width}ft × ${length}ft`,
      entranceDirection: direction,
      complianceScore: result.complianceScore,
      issuesJson: JSON.stringify(result.issues),
      remediesJson: JSON.stringify(result.positives),
      elementBalance: JSON.stringify(result.elementBalance),
    });
    toast.success("वास्तु जांच सहेजी गई! / Vastu check saved!");
  };

  const scoreColor = (score: number) =>
    score >= 75
      ? "oklch(0.65 0.20 145)"
      : score >= 50
        ? "oklch(0.75 0.20 75)"
        : "oklch(0.60 0.22 30)";

  const selectedDirLabel = DIRECTIONS.find((d) => d.value === direction);

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.04 30)" }}>
      {/* Page Header */}
      <div
        className="py-8 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.07 30) 0%, oklch(0.22 0.09 45) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.2)",
        }}
        data-ocid="vastu_checker.page"
      >
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Home
              className="h-8 w-8"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <h1
              className="font-decorative text-2xl md:text-3xl"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              वास्तु कक्ष अनुपालन जांचक
            </h1>
          </div>
          <p
            className="text-sm font-body"
            style={{ color: "oklch(0.70 0.05 60)" }}
          >
            Vastu Room Compliance Checker — Panch Bhuta Balance & Direction
            Analysis
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="check" className="w-full">
          <TabsList
            className="w-full mb-6"
            style={{ background: "oklch(0.18 0.05 30)" }}
            data-ocid="vastu_checker.tab"
          >
            <TabsTrigger
              value="check"
              className="flex-1"
              data-ocid="vastu_checker.check_tab"
            >
              🏠 New Check / नई जांच
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex-1"
              data-ocid="vastu_checker.history_tab"
            >
              📋 Past Checks / पुरानी जांचें
            </TabsTrigger>
          </TabsList>

          {/* ─── Check Tab ─────────────────────────────────────────────────────── */}
          <TabsContent value="check">
            {/* Stepper */}
            <div
              className="flex items-center justify-center gap-0 mb-8"
              data-ocid="vastu_checker.stepper"
            >
              {[
                { n: 1, label: "Floor Plan", labelHi: "फ्लोर प्लान" },
                { n: 2, label: "Room Details", labelHi: "कक्ष विवरण" },
                { n: 3, label: "Analysis", labelHi: "विश्लेषण" },
              ].map((s, i) => (
                <div key={s.n} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => step > s.n && setStep(s.n)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all duration-300"
                      style={{
                        background:
                          step >= s.n
                            ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                            : "oklch(0.20 0.05 30)",
                        color: step >= s.n ? "white" : "oklch(0.55 0.04 50)",
                        border:
                          step === s.n
                            ? "2px solid oklch(0.78 0.14 75)"
                            : "2px solid transparent",
                      }}
                    >
                      {s.n}
                    </div>
                    <span
                      className="text-xs font-body hidden sm:block"
                      style={{
                        color:
                          step >= s.n
                            ? "oklch(0.78 0.14 75)"
                            : "oklch(0.50 0.04 50)",
                      }}
                    >
                      {s.label}
                    </span>
                  </button>
                  {i < 2 && (
                    <div
                      className="w-12 h-0.5 mx-1 rounded"
                      style={{
                        background:
                          step > s.n
                            ? "oklch(0.68 0.20 48)"
                            : "oklch(0.25 0.04 40)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1 — Floor Plan Upload */}
            {step === 1 && (
              <Card
                className="p-6 rounded-xl"
                style={{
                  background: "oklch(0.17 0.05 30)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
                data-ocid="vastu_checker.step1"
              >
                <h2
                  className="font-heading font-bold text-lg mb-1"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  Step 1: Floor Plan Upload / फ्लोर प्लान अपलोड
                </h2>
                <p
                  className="text-xs font-body mb-6"
                  style={{ color: "oklch(0.62 0.04 55)" }}
                >
                  Upload a sketch or photo of your floor plan (optional).
                  Accepts JPG, PNG.
                </p>

                <button
                  type="button"
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all hover:border-opacity-80 w-full"
                  style={{
                    borderColor: "oklch(0.78 0.14 75 / 0.30)",
                    background: "oklch(0.15 0.04 30)",
                  }}
                  onClick={() => fileRef.current?.click()}
                  data-ocid="vastu_checker.dropzone"
                  aria-label="Upload floor plan"
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="animate-spin rounded-full h-8 w-8 border-b-2"
                        style={{ borderColor: "oklch(0.78 0.14 75)" }}
                      />
                      <p
                        className="text-sm"
                        style={{ color: "oklch(0.70 0.05 60)" }}
                      >
                        Uploading...
                      </p>
                    </div>
                  ) : previewUrl ? (
                    <div className="space-y-3">
                      <img
                        src={previewUrl}
                        alt="Floor plan"
                        className="max-h-40 mx-auto rounded-lg object-contain"
                      />
                      <p
                        className="text-xs font-body"
                        style={{ color: "oklch(0.65 0.12 75)" }}
                      >
                        ✓ Floor plan uploaded
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <Upload
                        className="h-10 w-10"
                        style={{ color: "oklch(0.78 0.14 75 / 0.5)" }}
                      />
                      <p
                        className="font-heading font-medium"
                        style={{ color: "oklch(0.75 0.06 60)" }}
                      >
                        Click to upload floor plan
                      </p>
                      <p
                        className="text-xs font-body"
                        style={{ color: "oklch(0.55 0.04 50)" }}
                      >
                        JPG, PNG — or skip to continue with manual input
                      </p>
                    </div>
                  )}
                </button>

                <div className="flex gap-3 mt-6">
                  <Button
                    className="flex-1"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                    onClick={() => setStep(2)}
                    data-ocid="vastu_checker.next_button"
                  >
                    {previewUrl ? "Continue with Plan" : "Skip & Continue"}{" "}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2 — Room Details */}
            {step === 2 && (
              <Card
                className="p-6 rounded-xl"
                style={{
                  background: "oklch(0.17 0.05 30)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
                data-ocid="vastu_checker.step2"
              >
                <h2
                  className="font-heading font-bold text-lg mb-1"
                  style={{ color: "oklch(0.88 0.06 75)" }}
                >
                  Step 2: Room Details / कक्ष विवरण
                </h2>
                <p
                  className="text-xs font-body mb-6"
                  style={{ color: "oklch(0.62 0.04 55)" }}
                >
                  Enter your room details for Vastu compliance analysis.
                </p>

                <div className="space-y-6">
                  {/* Room Type */}
                  <div>
                    <Label
                      className="text-sm font-heading font-semibold mb-2 block"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      Room Type / कक्ष प्रकार
                    </Label>
                    <div
                      className="grid grid-cols-3 gap-2"
                      data-ocid="vastu_checker.room_type_select"
                    >
                      {ROOM_TYPES.map((rt) => (
                        <button
                          key={rt.value}
                          type="button"
                          onClick={() => setRoomType(rt.value)}
                          className="px-3 py-2.5 rounded-lg text-xs font-heading text-left transition-all"
                          style={{
                            background:
                              roomType === rt.value
                                ? "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.3), oklch(0.58 0.18 40 / 0.3))"
                                : "oklch(0.20 0.04 30)",
                            border: `1px solid ${roomType === rt.value ? "oklch(0.68 0.20 48)" : "oklch(0.78 0.14 75 / 0.10)"}`,
                            color:
                              roomType === rt.value
                                ? "oklch(0.88 0.12 75)"
                                : "oklch(0.70 0.04 55)",
                          }}
                        >
                          <span className="block">{rt.label}</span>
                          <span className="block opacity-70 text-[10px]">
                            {rt.labelHi}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div>
                    <Label
                      className="text-sm font-heading font-semibold mb-2 block"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      Room Dimensions / कक्ष माप (in feet)
                    </Label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <Label
                          className="text-xs font-body mb-1 block"
                          style={{ color: "oklch(0.65 0.04 55)" }}
                        >
                          Width (चौड़ाई)
                        </Label>
                        <Input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="font-body"
                          placeholder="12"
                          style={{
                            background: "oklch(0.15 0.03 30)",
                            borderColor: "oklch(0.78 0.14 75 / 0.20)",
                            color: "oklch(0.88 0.04 70)",
                          }}
                          data-ocid="vastu_checker.width_input"
                        />
                      </div>
                      <span
                        className="text-lg font-heading mt-4"
                        style={{ color: "oklch(0.65 0.08 65)" }}
                      >
                        ×
                      </span>
                      <div className="flex-1">
                        <Label
                          className="text-xs font-body mb-1 block"
                          style={{ color: "oklch(0.65 0.04 55)" }}
                        >
                          Length (लंबाई)
                        </Label>
                        <Input
                          type="number"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="font-body"
                          placeholder="15"
                          style={{
                            background: "oklch(0.15 0.03 30)",
                            borderColor: "oklch(0.78 0.14 75 / 0.20)",
                            color: "oklch(0.88 0.04 70)",
                          }}
                          data-ocid="vastu_checker.length_input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Entrance Direction — Visual Compass */}
                  <div>
                    <Label
                      className="text-sm font-heading font-semibold mb-2 block"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      Entrance Direction / प्रवेश दिशा
                    </Label>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      {/* Compass visual */}
                      <div
                        className="relative mx-auto sm:mx-0"
                        style={{ width: 160, height: 160 }}
                      >
                        {/* Compass ring */}
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle, oklch(0.20 0.06 35) 0%, oklch(0.16 0.04 30) 100%)",
                            border: "2px solid oklch(0.78 0.14 75 / 0.25)",
                          }}
                        />
                        {/* Center dot */}
                        <div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                          style={{ background: "oklch(0.68 0.20 48)" }}
                        />
                        {/* Direction buttons */}
                        {DIRECTIONS.map((d) => {
                          const pos = COMPASS_POSITIONS[d.value];
                          const isSelected = direction === d.value;
                          return (
                            <button
                              key={d.value}
                              type="button"
                              onClick={() => setDirection(d.value)}
                              className="absolute text-xs font-heading font-bold rounded-full w-7 h-7 flex items-center justify-center transition-all"
                              style={{
                                top: pos.top,
                                left: pos.left,
                                transform: pos.transform,
                                background: isSelected
                                  ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                                  : "oklch(0.22 0.05 32)",
                                color: isSelected
                                  ? "white"
                                  : "oklch(0.72 0.06 60)",
                                border: isSelected
                                  ? "2px solid oklch(0.78 0.14 75)"
                                  : "1px solid oklch(0.78 0.14 75 / 0.15)",
                                zIndex: 2,
                              }}
                              data-ocid={`vastu_checker.direction.${d.value}`}
                            >
                              {d.label}
                            </button>
                          );
                        })}
                      </div>
                      {/* Selected direction info */}
                      <div className="flex-1">
                        <div
                          className="rounded-lg p-4 space-y-2"
                          style={{ background: "oklch(0.20 0.06 35)" }}
                        >
                          <p
                            className="font-heading font-bold text-sm"
                            style={{ color: "oklch(0.78 0.14 75)" }}
                          >
                            Selected: {selectedDirLabel?.labelFull}
                          </p>
                          {VASTU_DIRECTIONS.find((d2) =>
                            d2.directionOrRoom.includes(
                              direction === "NE"
                                ? "North-East"
                                : direction === "NW"
                                  ? "North-West"
                                  : direction === "SE"
                                    ? "South-East"
                                    : direction === "SW"
                                      ? "South-West"
                                      : direction === "N"
                                        ? "North"
                                        : direction === "S"
                                          ? "South"
                                          : direction === "E"
                                            ? "East"
                                            : "West",
                            ),
                          ) &&
                            (() => {
                              const dirData = VASTU_DIRECTIONS.find((d2) =>
                                d2.directionOrRoom.includes(
                                  direction === "NE"
                                    ? "North-East"
                                    : direction === "NW"
                                      ? "North-West"
                                      : direction === "SE"
                                        ? "South-East"
                                        : direction === "SW"
                                          ? "South-West"
                                          : direction === "N"
                                            ? "North"
                                            : direction === "S"
                                              ? "South"
                                              : direction === "E"
                                                ? "East"
                                                : "West",
                                ),
                              );
                              return dirData ? (
                                <>
                                  <p
                                    className="text-xs font-body"
                                    style={{ color: "oklch(0.68 0.05 55)" }}
                                  >
                                    Planet:{" "}
                                    <span
                                      style={{ color: "oklch(0.78 0.14 75)" }}
                                    >
                                      {dirData.planetaryRuler}
                                    </span>
                                  </p>
                                  <p
                                    className="text-xs font-body"
                                    style={{ color: "oklch(0.68 0.05 55)" }}
                                  >
                                    {dirData.shortDesc}
                                  </p>
                                </>
                              ) : null;
                            })()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Activity */}
                  <div>
                    <Label
                      className="text-sm font-heading font-semibold mb-2 block"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      Main Activity / मुख्य गतिविधि
                    </Label>
                    <Input
                      value={mainActivity}
                      onChange={(e) => setMainActivity(e.target.value)}
                      placeholder="e.g. Sleeping, Cooking, Prayer, Study..."
                      style={{
                        background: "oklch(0.15 0.03 30)",
                        borderColor: "oklch(0.78 0.14 75 / 0.20)",
                        color: "oklch(0.88 0.04 70)",
                      }}
                      data-ocid="vastu_checker.activity_input"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-0"
                    style={{
                      background: "oklch(0.20 0.04 30)",
                      color: "oklch(0.70 0.04 55)",
                    }}
                  >
                    ← Back
                  </Button>
                  <Button
                    className="flex-1"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                      color: "white",
                    }}
                    onClick={handleAnalyze}
                    data-ocid="vastu_checker.analyze_button"
                  >
                    🔍 Analyze Vastu / वास्तु विश्लेषण करें
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3 — Results */}
            {step === 3 && result && (
              <div className="space-y-5" data-ocid="vastu_checker.results">
                {/* Score card */}
                <Card
                  className="p-6 rounded-xl"
                  style={{
                    background: "oklch(0.17 0.05 30)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <ComplianceGauge score={result.complianceScore} />
                    <div className="flex-1 space-y-3">
                      <div>
                        <h2
                          className="font-heading font-bold text-lg"
                          style={{ color: "oklch(0.88 0.06 75)" }}
                        >
                          {roomType} —{" "}
                          {
                            DIRECTIONS.find((d) => d.value === direction)
                              ?.labelFull
                          }
                        </h2>
                        <p
                          className="text-xs font-body mt-0.5"
                          style={{ color: "oklch(0.62 0.04 55)" }}
                        >
                          {width}ft × {length}ft | Ideal:{" "}
                          {result.idealDirection} | Ruler:{" "}
                          {result.planetaryRuler}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          style={{
                            background: "oklch(0.20 0.06 35)",
                            color: "oklch(0.78 0.14 75)",
                            border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                          }}
                        >
                          {result.issues.length} issues found
                        </Badge>
                        <Badge
                          style={{
                            background: "oklch(0.18 0.10 145 / 0.3)",
                            color: "oklch(0.70 0.18 145)",
                            border: "1px solid oklch(0.65 0.20 145 / 0.3)",
                          }}
                        >
                          {result.positives.length} positives
                        </Badge>
                      </div>
                      <Button
                        onClick={handleSave}
                        disabled={saveCheck.isPending}
                        size="sm"
                        className="flex items-center gap-2"
                        style={{
                          background:
                            "linear-gradient(135deg, oklch(0.55 0.18 145), oklch(0.45 0.15 155))",
                          color: "white",
                        }}
                        data-ocid="vastu_checker.save_button"
                      >
                        <Save className="h-4 w-4" />
                        {saveCheck.isPending
                          ? "Saving..."
                          : "Save Result / सहेजें"}
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Issues */}
                {result.issues.length > 0 && (
                  <Card
                    className="p-5 rounded-xl"
                    style={{
                      background: "oklch(0.17 0.05 30)",
                      border: "1px solid oklch(0.60 0.22 30 / 0.25)",
                    }}
                    data-ocid="vastu_checker.issues_section"
                  >
                    <h3
                      className="font-heading font-bold text-sm mb-4 flex items-center gap-2"
                      style={{ color: "oklch(0.80 0.18 35)" }}
                    >
                      <AlertTriangle className="h-4 w-4" /> Issues Found / दोष (
                      {result.issues.length})
                    </h3>
                    <div className="space-y-3">
                      {result.issues.map((issue) => (
                        <div
                          key={issue.title}
                          className="rounded-lg p-4"
                          style={{
                            background:
                              issue.severity === "high"
                                ? "oklch(0.18 0.08 25)"
                                : issue.severity === "medium"
                                  ? "oklch(0.18 0.08 55)"
                                  : "oklch(0.18 0.06 50)",
                            border: `1px solid ${issue.severity === "high" ? "oklch(0.60 0.22 30 / 0.35)" : "oklch(0.75 0.18 65 / 0.25)"}`,
                          }}
                          data-ocid="vastu_checker.issue"
                        >
                          <div className="flex items-start gap-2">
                            <XCircle
                              className="h-4 w-4 mt-0.5 flex-shrink-0"
                              style={{
                                color:
                                  issue.severity === "high"
                                    ? "oklch(0.60 0.22 30)"
                                    : "oklch(0.75 0.18 65)",
                              }}
                            />
                            <div>
                              <p
                                className="text-sm font-heading font-semibold"
                                style={{ color: "oklch(0.85 0.06 70)" }}
                              >
                                {issue.title}
                              </p>
                              <p
                                className="text-xs font-body mt-0.5"
                                style={{ color: "oklch(0.65 0.04 55)" }}
                              >
                                {issue.titleHi}
                              </p>
                              <p
                                className="text-xs font-body mt-2 leading-relaxed"
                                style={{ color: "oklch(0.72 0.04 60)" }}
                              >
                                <span style={{ color: "oklch(0.75 0.14 75)" }}>
                                  Remedy:{" "}
                                </span>
                                {issue.remedy}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Positives */}
                {result.positives.length > 0 && (
                  <Card
                    className="p-5 rounded-xl"
                    style={{
                      background: "oklch(0.17 0.05 30)",
                      border: "1px solid oklch(0.65 0.20 145 / 0.20)",
                    }}
                  >
                    <h3
                      className="font-heading font-bold text-sm mb-4 flex items-center gap-2"
                      style={{ color: "oklch(0.70 0.18 145)" }}
                    >
                      <CheckCircle className="h-4 w-4" /> Positive Aspects / शुभ
                      पहलू
                    </h3>
                    <div className="space-y-2">
                      {result.positives.map((pos) => (
                        <div key={pos.text} className="flex items-start gap-2">
                          <CheckCircle
                            className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"
                            style={{ color: "oklch(0.65 0.20 145)" }}
                          />
                          <p
                            className="text-xs font-body"
                            style={{ color: "oklch(0.75 0.05 60)" }}
                          >
                            {pos.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Element Balance */}
                <Card
                  className="p-5 rounded-xl"
                  style={{
                    background: "oklch(0.17 0.05 30)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <h3
                    className="font-heading font-bold text-sm mb-4"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    🌍 Panch Bhuta Balance / पंचभूत संतुलन
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(result.elementBalance).map(([el, val]) => {
                      const colors: Record<string, string> = {
                        "Prithvi (Earth)": "oklch(0.65 0.14 55)",
                        "Jal (Water)": "oklch(0.65 0.18 220)",
                        "Agni (Fire)": "oklch(0.70 0.22 35)",
                        "Vayu (Air)": "oklch(0.70 0.14 195)",
                        "Akash (Space)": "oklch(0.68 0.10 280)",
                      };
                      return (
                        <ElementBalanceBar
                          key={el}
                          label={el}
                          value={val}
                          color={colors[el] ?? "oklch(0.65 0.10 60)"}
                        />
                      );
                    })}
                  </div>
                </Card>

                {/* Vastu Tips from data */}
                <Card
                  className="p-5 rounded-xl"
                  style={{
                    background: "oklch(0.17 0.05 30)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <h3
                    className="font-heading font-bold text-sm mb-4"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    💡 Vastu Tips / वास्तु सुझाव
                  </h3>
                  <div className="space-y-2">
                    {PANCH_BHUTA.slice(0, 2).map((el) => (
                      <div
                        key={el.id}
                        className="text-xs font-body leading-relaxed p-3 rounded-lg"
                        style={{
                          background: "oklch(0.20 0.05 35)",
                          color: "oklch(0.72 0.04 60)",
                        }}
                      >
                        <span
                          className="font-heading font-semibold mr-2"
                          style={{ color: "oklch(0.75 0.10 70)" }}
                        >
                          {el.symbol} {el.titleEn}:
                        </span>
                        {el.tipsEn}
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStep(1);
                      setResult(null);
                      setPreviewUrl("");
                      setFloorPlanUrl("");
                    }}
                    className="flex-1 border-0"
                    style={{
                      background: "oklch(0.20 0.04 30)",
                      color: "oklch(0.70 0.04 55)",
                    }}
                    data-ocid="vastu_checker.new_check_button"
                  >
                    + New Check
                  </Button>
                  <Button
                    onClick={() => setStep(2)}
                    className="flex-1"
                    style={{
                      background: "oklch(0.22 0.07 40)",
                      color: "oklch(0.80 0.08 65)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                    }}
                    data-ocid="vastu_checker.edit_button"
                  >
                    ✏️ Edit Details
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* ─── History Tab ─────────────────────────────────────────────────────── */}
          <TabsContent
            value="history"
            data-ocid="vastu_checker.history_section"
          >
            {loadingHistory ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="h-24 w-full rounded-xl"
                    style={{ background: "oklch(0.20 0.04 30)" }}
                  />
                ))}
              </div>
            ) : pastChecks.length === 0 ? (
              <div
                className="text-center py-16 rounded-xl"
                style={{
                  background: "oklch(0.17 0.04 30)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                }}
                data-ocid="vastu_checker.history_empty_state"
              >
                <Home
                  className="h-12 w-12 mx-auto mb-4 opacity-30"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                />
                <h3
                  className="font-heading font-semibold text-base mb-1"
                  style={{ color: "oklch(0.70 0.06 60)" }}
                >
                  No saved checks yet / कोई सहेजी जांच नहीं
                </h3>
                <p
                  className="text-xs font-body"
                  style={{ color: "oklch(0.50 0.04 50)" }}
                >
                  Run a vastu analysis and save it to see your history here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastChecks.map((check, idx) => {
                  const score =
                    typeof check.complianceScore === "bigint"
                      ? Number(check.complianceScore)
                      : check.complianceScore;
                  const color = scoreColor(score);
                  return (
                    <Card
                      key={check.id}
                      className="p-5 rounded-xl"
                      style={{
                        background: "oklch(0.17 0.05 30)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.12)",
                      }}
                      data-ocid={`vastu_checker.history_item.${idx + 1}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4
                              className="font-heading font-bold text-sm"
                              style={{ color: "oklch(0.82 0.08 70)" }}
                            >
                              {check.roomType}
                            </h4>
                            <Badge
                              style={{
                                background: "oklch(0.20 0.06 35)",
                                color: "oklch(0.75 0.10 65)",
                                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                                fontSize: "10px",
                              }}
                            >
                              {check.entranceDirection}
                            </Badge>
                            <Badge
                              style={{
                                background: `${color}22`,
                                color,
                                border: `1px solid ${color}44`,
                                fontSize: "10px",
                              }}
                            >
                              Score: {score}/100
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <p
                              className="text-xs font-body"
                              style={{ color: "oklch(0.60 0.04 50)" }}
                            >
                              📐 {check.roomDimensions}
                            </p>
                            <Separator orientation="vertical" className="h-3" />
                            <p
                              className="flex items-center gap-1 text-xs font-body"
                              style={{ color: "oklch(0.55 0.04 50)" }}
                            >
                              <Clock className="h-3 w-3" />
                              {new Date(
                                Number(check.createdAt) / 1_000_000,
                              ).toLocaleDateString("en-IN")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className="text-xl font-heading font-bold"
                            style={{ color }}
                          >
                            {score}
                          </div>
                          <div
                            className="text-[10px] font-body"
                            style={{ color: "oklch(0.55 0.04 50)" }}
                          >
                            /100
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
