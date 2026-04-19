import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, CheckCircle, Star } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePdfExport } from "../../hooks/usePdfExport";
import type { CalculatorFormData } from "../../types/calculator";
import { t } from "../../utils/translations";

// ─── Date/Time option arrays ───────────────────────────────────────────────────
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => String(currentYear - i));
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINS_SECS = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

// ─── Kaal Sarp Dosh Types ─────────────────────────────────────────────────────
interface DoshType {
  name: string;
  rahuHouse: string;
  ketuHouse: string;
  shortDesc: string;
  effects: string[];
  remedies: string[];
}

const DOSH_TYPES: DoshType[] = [
  {
    name: "Anant Kaal Sarp Dosh",
    rahuHouse: "1st House",
    ketuHouse: "7th House",
    shortDesc:
      "Rahu in the 1st house affects self-identity and partnerships. Relationships and self-confidence may face repeated challenges until clarity is achieved.",
    effects: [
      "Challenges in personal identity and self-confidence",
      "Strained marital or business partnerships",
      "Recurring health fluctuations without clear diagnosis",
      "Difficulty feeling settled in one place or role",
    ],
    remedies: [
      "Recite Maha Mrityunjaya mantra 108 times daily",
      "Perform Rudrabhishek on Mondays, especially during Shravan",
      "Donate black clothes and iron items on Saturdays",
      "Wear a silver Nag ring on the little finger of the right hand after astrological consultation",
    ],
  },
  {
    name: "Kulik Kaal Sarp Dosh",
    rahuHouse: "2nd House",
    ketuHouse: "8th House",
    shortDesc:
      "Rahu in the 2nd house creates financial instability and family tensions. Money may flow in but not accumulate due to unexpected expenses.",
    effects: [
      "Financial instability despite consistent efforts",
      "Family disputes over money or property",
      "Speech-related issues or misunderstandings",
      "Sudden unexpected expenses eroding savings",
    ],
    remedies: [
      "Chant 'Om Namah Shivaya' 108 times daily",
      "Feed crows and black ants on Saturdays",
      "Donate black sesame seeds (til) on Shani Amavasya",
      "Keep a Rahu-Ketu yantra energized by a priest at home",
    ],
  },
  {
    name: "Vasuki Kaal Sarp Dosh",
    rahuHouse: "3rd House",
    ketuHouse: "9th House",
    shortDesc:
      "Rahu in the 3rd house creates friction with siblings and challenges in short travels. One's beliefs and faith may be repeatedly tested.",
    effects: [
      "Sibling relationships become strained or competitive",
      "Short journeys bring unexpected obstacles",
      "Philosophical beliefs frequently questioned",
      "Communication efforts often misunderstood",
    ],
    remedies: [
      "Chant the Sarpa Sooktam from the Atharva Veda weekly",
      "Light a mustard oil lamp on Saturdays near the main entrance",
      "Offer milk and Durva grass to Nag Devata on Nag Panchami",
      "Perform Kaal Sarp Dosh Puja at Trimbakeshwar temple",
    ],
  },
  {
    name: "Shankhpal Kaal Sarp Dosh",
    rahuHouse: "4th House",
    ketuHouse: "10th House",
    shortDesc:
      "Rahu in the 4th house disrupts domestic peace and career stability. Property disputes and maternal relationship challenges are common.",
    effects: [
      "Career growth plateaus despite hard work",
      "Property disputes or relocation challenges",
      "Distance from mother or maternal family",
      "Lack of peace in domestic life",
    ],
    remedies: [
      "Recite Vishnu Sahasranama every Monday morning",
      "Perform Ganesha puja before beginning any new project",
      "Plant a Tulsi plant at home and water it daily",
      "Visit Kalahasti Rahu-Ketu temple in Andhra Pradesh",
    ],
  },
  {
    name: "Padma Kaal Sarp Dosh",
    rahuHouse: "5th House",
    ketuHouse: "11th House",
    shortDesc:
      "Rahu in the 5th house brings delays in education, challenges with children, and creative blocks. Social income and gains may remain elusive.",
    effects: [
      "Delays or obstacles in children's progress",
      "Creative endeavors face unexpected hurdles",
      "Academic setbacks or difficulty in competitive exams",
      "Gains from networks or social circles prove elusive",
    ],
    remedies: [
      "Chant Gayatri mantra 108 times at sunrise daily",
      "Donate study materials to underprivileged children",
      "Perform Santana Gopala puja for child-related issues",
      "Wear a Hessonite (Gomed) gemstone only after astrological guidance",
    ],
  },
  {
    name: "Mahapadma Kaal Sarp Dosh",
    rahuHouse: "6th House",
    ketuHouse: "12th House",
    shortDesc:
      "Rahu in the 6th house brings persistent health issues, hidden enemies, and legal challenges. Spiritual growth, however, can emerge strongly through these trials.",
    effects: [
      "Persistent health challenges with delayed recovery",
      "Hidden adversaries or unexpected legal disputes",
      "Frequent expenses without clear source",
      "Subconscious fears or recurring nightmares",
    ],
    remedies: [
      "Visit Shiva temple on Mondays and pour milk over the Shivling",
      "Chant Om Sarpa Devaya Namaha 108 times daily",
      "Fast on Nag Panchami and offer prayers to Nag Devata",
      "Energize and place a copper serpent (Nag) idol in the prayer room",
    ],
  },
];

// ─── Calculation logic ─────────────────────────────────────────────────────────
interface KaalSarpResult {
  hasDosha: boolean;
  doshType: DoshType | null;
  severity: "Mild" | "Moderate" | "Severe";
  severityScore: number;
}

function calculateKaalSarpDosh(form: CalculatorFormData): KaalSarpResult {
  const day = Number.parseInt(form.dob.day || "1");
  const month = Number.parseInt(form.dob.month || "1");
  const year = Number.parseInt(form.dob.year || "1990");

  const rahuPos = (day + month) % 12;
  const ketuPos = (day * 2 + (year % 100)) % 12;

  const diff = Math.abs(rahuPos - ketuPos);
  const hasDosha = diff >= 5 && diff <= 7;

  if (!hasDosha) {
    return {
      hasDosha: false,
      doshType: null,
      severity: "Mild",
      severityScore: 0,
    };
  }

  const typeIndex = Math.floor(rahuPos / 2) % DOSH_TYPES.length;
  const doshType = DOSH_TYPES[typeIndex];

  const severityIndex = rahuPos % 3;
  const severity: "Mild" | "Moderate" | "Severe" =
    severityIndex === 0 ? "Mild" : severityIndex === 1 ? "Moderate" : "Severe";
  const severityScore =
    severityIndex === 0 ? 35 : severityIndex === 1 ? 65 : 90;

  return { hasDosha, doshType, severity, severityScore };
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function InfoSection({
  title,
  children,
  alternate,
}: {
  title: string;
  children: React.ReactNode;
  alternate?: boolean;
}) {
  return (
    <section
      className="rounded-2xl p-6 space-y-3"
      style={{
        background: alternate
          ? "oklch(0.20 0.055 25 / 0.7)"
          : "oklch(0.22 0.06 25 / 0.5)",
        border: "1px solid oklch(0.78 0.14 75 / 0.10)",
      }}
    >
      <h2
        className="font-heading text-xl font-bold mb-2"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {title}
      </h2>
      <div
        className="font-body text-sm leading-relaxed space-y-3"
        style={{ color: "oklch(0.72 0.04 65)" }}
      >
        {children}
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Can Kaal Sarp Dosh be removed permanently?",
    a: "Kaal Sarp Dosh cannot be removed permanently as it is a fixed natal chart configuration, but its negative effects can be significantly reduced through consistent spiritual practices, proper remedies, and living a dharmic life. Regular Rudrabhishek, temple visits, mantra chanting, and astrologically prescribed gemstones are among the most effective long-term remedies. Many people experience dramatic improvements in their life circumstances after following appropriate remedies with faith and consistency.",
  },
  {
    q: "Which celebrities have Kaal Sarp Dosh?",
    a: "Several highly successful individuals across various fields are believed to have had Kaal Sarp Dosh in their birth charts. This includes historical figures, spiritual leaders, and modern achievers in politics, entertainment, and business. Their success demonstrates that this configuration, while challenging, can be channelled into extraordinary determination and spiritual depth. The dosh often drives people toward profound personal transformation and achievement through perseverance.",
  },
  {
    q: "Is Kaal Sarp Dosh always bad?",
    a: "Kaal Sarp Dosh is not always negative and its effects depend entirely on the specific type, planetary placements, and individual birth chart context. Many people with this configuration develop exceptional resilience, spiritual awareness, and determination to overcome obstacles. When properly understood and worked with through appropriate remedies, this dosh can actually catalyze profound personal growth and even lead to remarkable achievements in life.",
  },
  {
    q: "What is the difference between partial and full Kaal Sarp Dosh?",
    a: "Full Kaal Sarp Dosh occurs when all seven major planets are completely hemmed between Rahu and Ketu with no planet outside this axis, creating stronger and more consistent effects throughout life. Partial Kaal Sarp Dosh happens when most planets are between Rahu and Ketu but one or two planets fall outside the axis, reducing the intensity and providing some relief periods. Full dosh typically requires more comprehensive remedies while partial dosh may respond to simpler practices.",
  },
  {
    q: "How does Kaal Sarp Dosh affect marriage?",
    a: "Kaal Sarp Dosh can create delays in marriage, challenges in finding the right partner, or difficulties after marriage depending on its type and intensity. Anant type, with Rahu in the 7th house, most directly affects partnerships and marriage. However, proper matching of horoscopes, performing Kaal Sarp Dosh puja before marriage, and following remedies can significantly reduce these effects. Many people with this dosh lead very successful and happy married lives after taking appropriate precautions.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function KaalSarpDoshCalculator() {
  const { language } = useLanguage();
  const { exportToPdf } = usePdfExport();

  const [form, setForm] = useState<CalculatorFormData>({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    tob: { hour: "", minute: "", second: "", unknown: false },
    placeOfBirth: "",
  });
  const [result, setResult] = useState<KaalSarpResult | null>(null);

  const updateDob = (field: keyof CalculatorFormData["dob"], val: string) =>
    setForm((f) => ({ ...f, dob: { ...f.dob, [field]: val } }));
  const updateTob = (
    field: keyof CalculatorFormData["tob"],
    val: string | boolean,
  ) => setForm((f) => ({ ...f, tob: { ...f.tob, [field]: val } }));

  const canCalculate =
    form.name.trim() && form.dob.day && form.dob.month && form.dob.year;

  const handleCalculate = () => {
    if (!canCalculate) return;
    setResult(calculateKaalSarpDosh(form));
  };

  const labelStyle = { color: "oklch(0.78 0.14 75)" };
  const inputStyle = {
    background: "oklch(0.18 0.04 25)",
    borderColor: "oklch(0.35 0.08 25)",
    color: "oklch(0.90 0.04 60)",
  };
  const selectContentStyle = {
    background: "oklch(0.22 0.06 25)",
    border: "1px solid oklch(0.35 0.08 25)",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.04 22)" }}
      data-ocid="kaal-sarp-calculator-page"
    >
      {/* ── Hero ── */}
      <div
        className="py-10 px-4 text-center"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.18 0.06 22) 0%, oklch(0.14 0.04 22) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.15)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star
              className="h-4 w-4"
              style={{ color: "oklch(0.78 0.14 75)" }}
            />
            <span
              className="font-heading text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.60 0.08 60)" }}
            >
              Vedic Astrology
            </span>
          </div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.92 0.10 75)" }}
          >
            {t("calculator.kaalSarpDosh", language)} Calculator
          </h1>
          <p
            className="font-body text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.68 0.05 60)" }}
          >
            Are you facing repeated obstacles despite your best efforts? Do
            setbacks seem to come in cycles, no matter how hard you work?
            Understanding this powerful planetary configuration through a Kaal
            Sarp Dosh calculator can help you gain clarity and take the right
            steps toward balance and harmony.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* ── Form Card ── */}
        <Card
          style={{
            background: "oklch(0.20 0.05 25)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
        >
          <CardContent className="pt-6 space-y-5">
            <h2
              className="font-heading text-lg font-bold"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              Calculate Your Kaal Sarp Yog
            </h2>

            {/* Name */}
            <div className="space-y-1.5">
              <Label
                className="font-heading text-sm font-semibold"
                style={labelStyle}
              >
                {t("calculator.yourName", language)} *
              </Label>
              <Input
                placeholder={t("calculator.enterName", language)}
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                style={inputStyle}
                data-ocid="kaal-sarp-calc.name_input"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <Label
                className="font-heading text-sm font-semibold"
                style={labelStyle}
              >
                {t("calculator.gender", language)} *
              </Label>
              <Select
                value={form.gender}
                onValueChange={(v) => setForm((f) => ({ ...f, gender: v }))}
              >
                <SelectTrigger
                  style={inputStyle}
                  data-ocid="kaal-sarp-calc.gender_select"
                >
                  <SelectValue
                    placeholder={t("calculator.selectGender", language)}
                  />
                </SelectTrigger>
                <SelectContent style={selectContentStyle}>
                  {[
                    { val: "Male", label: t("calculator.male", language) },
                    { val: "Female", label: t("calculator.female", language) },
                    { val: "Other", label: t("calculator.other", language) },
                  ].map((g) => (
                    <SelectItem
                      key={g.val}
                      value={g.val}
                      style={{ color: "oklch(0.85 0.04 60)" }}
                    >
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <Label
                className="font-heading text-sm font-semibold"
                style={labelStyle}
              >
                {t("calculator.dateOfBirth", language)} *
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {/* Day */}
                <Select
                  value={form.dob.day}
                  onValueChange={(v) => updateDob("day", v)}
                >
                  <SelectTrigger
                    style={inputStyle}
                    data-ocid="kaal-sarp-calc.dob_day"
                  >
                    <SelectValue placeholder={t("calculator.day", language)} />
                  </SelectTrigger>
                  <SelectContent style={selectContentStyle}>
                    {DAYS.map((d) => (
                      <SelectItem
                        key={d}
                        value={d}
                        style={{ color: "oklch(0.85 0.04 60)" }}
                      >
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Month */}
                <Select
                  value={form.dob.month}
                  onValueChange={(v) => updateDob("month", v)}
                >
                  <SelectTrigger
                    style={inputStyle}
                    data-ocid="kaal-sarp-calc.dob_month"
                  >
                    <SelectValue
                      placeholder={t("calculator.month", language)}
                    />
                  </SelectTrigger>
                  <SelectContent style={selectContentStyle}>
                    {MONTHS.map((m, i) => (
                      <SelectItem
                        key={m}
                        value={String(i + 1)}
                        style={{ color: "oklch(0.85 0.04 60)" }}
                      >
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Year */}
                <Select
                  value={form.dob.year}
                  onValueChange={(v) => updateDob("year", v)}
                >
                  <SelectTrigger
                    style={inputStyle}
                    data-ocid="kaal-sarp-calc.dob_year"
                  >
                    <SelectValue placeholder={t("calculator.year", language)} />
                  </SelectTrigger>
                  <SelectContent style={selectContentStyle}>
                    {YEARS.map((y) => (
                      <SelectItem
                        key={y}
                        value={y}
                        style={{ color: "oklch(0.85 0.04 60)" }}
                      >
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time of Birth */}
            <div className="space-y-2">
              <Label
                className="font-heading text-sm font-semibold"
                style={labelStyle}
              >
                {t("calculator.timeOfBirth", language)}
              </Label>
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="tob-unknown"
                  checked={form.tob.unknown}
                  onCheckedChange={(v) => updateTob("unknown", Boolean(v))}
                  data-ocid="kaal-sarp-calc.tob_unknown_checkbox"
                />
                <label
                  htmlFor="tob-unknown"
                  className="font-body text-xs cursor-pointer"
                  style={{ color: "oklch(0.68 0.05 60)" }}
                >
                  {t("calculator.dontKnowTime", language)}
                </label>
              </div>

              {!form.tob.unknown && (
                <div className="grid grid-cols-3 gap-2">
                  <Select
                    value={form.tob.hour}
                    onValueChange={(v) => updateTob("hour", v)}
                  >
                    <SelectTrigger
                      style={inputStyle}
                      data-ocid="kaal-sarp-calc.tob_hour"
                    >
                      <SelectValue
                        placeholder={t("calculator.hour", language)}
                      />
                    </SelectTrigger>
                    <SelectContent style={selectContentStyle}>
                      {HOURS.map((h) => (
                        <SelectItem
                          key={h}
                          value={h}
                          style={{ color: "oklch(0.85 0.04 60)" }}
                        >
                          {h}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={form.tob.minute}
                    onValueChange={(v) => updateTob("minute", v)}
                  >
                    <SelectTrigger
                      style={inputStyle}
                      data-ocid="kaal-sarp-calc.tob_minute"
                    >
                      <SelectValue
                        placeholder={t("calculator.minute", language)}
                      />
                    </SelectTrigger>
                    <SelectContent style={selectContentStyle}>
                      {MINS_SECS.map((m) => (
                        <SelectItem
                          key={m}
                          value={m}
                          style={{ color: "oklch(0.85 0.04 60)" }}
                        >
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={form.tob.second}
                    onValueChange={(v) => updateTob("second", v)}
                  >
                    <SelectTrigger
                      style={inputStyle}
                      data-ocid="kaal-sarp-calc.tob_second"
                    >
                      <SelectValue
                        placeholder={t("calculator.second", language)}
                      />
                    </SelectTrigger>
                    <SelectContent style={selectContentStyle}>
                      {MINS_SECS.map((s) => (
                        <SelectItem
                          key={s}
                          value={s}
                          style={{ color: "oklch(0.85 0.04 60)" }}
                        >
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Place of Birth */}
            <div className="space-y-1.5">
              <Label
                className="font-heading text-sm font-semibold"
                style={labelStyle}
              >
                {t("calculator.placeOfBirth", language)} *
              </Label>
              <Input
                placeholder={t("calculator.enterPlace", language)}
                value={form.placeOfBirth}
                onChange={(e) =>
                  setForm((f) => ({ ...f, placeOfBirth: e.target.value }))
                }
                style={inputStyle}
                data-ocid="kaal-sarp-calc.place_input"
              />
            </div>

            {/* Calculate Button */}
            <button
              type="button"
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="w-full py-3 rounded-xl font-heading font-bold text-sm tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                boxShadow: "0 4px 16px oklch(0.62 0.18 48 / 0.25)",
              }}
              data-ocid="kaal-sarp-calc.calculate_button"
            >
              {t("calculator.calculate", language)} Kaal Sarp Dosh
            </button>
          </CardContent>
        </Card>

        {/* ── Results ── */}
        {result && (
          <div
            id="kaal-sarp-results"
            className="rounded-2xl p-6 space-y-5"
            style={{
              background: result.hasDosha
                ? "oklch(0.18 0.07 25 / 0.6)"
                : "oklch(0.18 0.05 145 / 0.3)",
              border: result.hasDosha
                ? "2px solid oklch(0.68 0.20 48 / 0.5)"
                : "2px solid oklch(0.60 0.18 145 / 0.5)",
            }}
            data-ocid="kaal-sarp-calc.result"
          >
            {result.hasDosha && result.doshType ? (
              <>
                {/* Header */}
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className="h-6 w-6 shrink-0 mt-0.5"
                    style={{ color: "oklch(0.72 0.20 48)" }}
                  />
                  <div>
                    <h3
                      className="font-heading text-xl font-bold"
                      style={{ color: "oklch(0.92 0.10 75)" }}
                    >
                      {result.doshType.name}
                    </h3>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      <Badge
                        style={{
                          background:
                            result.severity === "Severe"
                              ? "oklch(0.62 0.22 25 / 0.25)"
                              : result.severity === "Moderate"
                                ? "oklch(0.72 0.20 48 / 0.25)"
                                : "oklch(0.78 0.14 75 / 0.20)",
                          color:
                            result.severity === "Severe"
                              ? "oklch(0.62 0.22 25)"
                              : result.severity === "Moderate"
                                ? "oklch(0.72 0.20 48)"
                                : "oklch(0.78 0.14 75)",
                          border: "1px solid currentColor",
                        }}
                      >
                        {result.severity} Intensity
                      </Badge>
                      <Badge
                        style={{
                          background: "oklch(0.22 0.06 25)",
                          color: "oklch(0.72 0.04 65)",
                          border: "1px solid oklch(0.35 0.08 25)",
                        }}
                      >
                        Rahu: {result.doshType.rahuHouse}
                      </Badge>
                      <Badge
                        style={{
                          background: "oklch(0.22 0.06 25)",
                          color: "oklch(0.72 0.04 65)",
                          border: "1px solid oklch(0.35 0.08 25)",
                        }}
                      >
                        Ketu: {result.doshType.ketuHouse}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Severity bar */}
                <div className="space-y-1.5">
                  <div
                    className="flex justify-between font-heading text-xs font-semibold"
                    style={{ color: "oklch(0.65 0.05 60)" }}
                  >
                    <span>Intensity Level</span>
                    <span style={{ color: "oklch(0.72 0.20 48)" }}>
                      {result.severityScore}%
                    </span>
                  </div>
                  <div
                    className="w-full h-2.5 rounded-full overflow-hidden"
                    style={{ background: "oklch(0.18 0.04 25)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${result.severityScore}%`,
                        background:
                          "linear-gradient(90deg, oklch(0.78 0.14 75), oklch(0.72 0.20 48))",
                      }}
                    />
                  </div>
                </div>

                {/* Short description */}
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.78 0.06 60)" }}
                >
                  {result.doshType.shortDesc}
                </p>

                {/* Effects */}
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: "oklch(0.17 0.04 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                  }}
                >
                  <h4
                    className="font-heading text-sm font-bold mb-2"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Key Effects
                  </h4>
                  <ul className="space-y-1.5">
                    {result.doshType.effects.map((effect) => (
                      <li
                        key={effect}
                        className="flex gap-2 font-body text-xs leading-relaxed"
                        style={{ color: "oklch(0.72 0.04 65)" }}
                      >
                        <span
                          style={{
                            color: "oklch(0.72 0.20 48)",
                            marginTop: "2px",
                          }}
                        >
                          •
                        </span>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Remedies */}
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: "oklch(0.17 0.05 145 / 0.2)",
                    border: "1px solid oklch(0.60 0.18 145 / 0.20)",
                  }}
                >
                  <h4
                    className="font-heading text-sm font-bold mb-2"
                    style={{ color: "oklch(0.65 0.18 145)" }}
                  >
                    Recommended Remedies
                  </h4>
                  <ul className="space-y-1.5">
                    {result.doshType.remedies.map((remedy) => (
                      <li
                        key={remedy}
                        className="flex gap-2 font-body text-xs leading-relaxed"
                        style={{ color: "oklch(0.72 0.04 65)" }}
                      >
                        <span
                          style={{
                            color: "oklch(0.65 0.18 145)",
                            marginTop: "2px",
                          }}
                        >
                          ✓
                        </span>
                        {remedy}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer note */}
                <p
                  className="font-body text-xs italic text-center"
                  style={{ color: "oklch(0.58 0.05 60)" }}
                >
                  This is a simplified assessment. Consult an experienced
                  astrologer on Spiritual Connect for a comprehensive birth
                  chart analysis and personalized guidance.
                </p>
              </>
            ) : (
              <>
                {/* No Dosh */}
                <div className="flex items-center gap-3">
                  <CheckCircle
                    className="h-6 w-6 shrink-0"
                    style={{ color: "oklch(0.60 0.18 145)" }}
                  />
                  <h3
                    className="font-heading text-xl font-bold"
                    style={{ color: "oklch(0.65 0.18 145)" }}
                  >
                    {t("calculator.doshAbsent", language)}
                  </h3>
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.75 0.05 65)" }}
                >
                  Based on your birth details, the planets are not fully hemmed
                  between Rahu and Ketu. This is a positive indication that you
                  are not under the direct influence of Kaal Sarp Dosh. Your
                  life's challenges arise from other planetary influences that
                  can be explored through a detailed birth chart reading.
                </p>
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "oklch(0.17 0.04 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                  }}
                >
                  <h4
                    className="font-heading text-sm font-bold mb-2"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    General Rahu-Ketu Guidance
                  </h4>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: "oklch(0.68 0.04 62)" }}
                  >
                    Even without Kaal Sarp Dosh, Rahu and Ketu continue to
                    influence your karmic path. Rahu drives worldly ambition
                    while Ketu governs spiritual liberation. Regular meditation,
                    charitable acts, and following dharmic principles help
                    harmonise these shadow planets in your life journey.
                  </p>
                </div>
              </>
            )}

            {/* Export PDF */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "kaal-sarp-results",
                    "kaal-sarp-dosh-result",
                    "Kaal Sarp Dosh Calculator Result",
                  )
                }
                className="flex-1 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="kaal-sarp-calc.export_pdf_button"
              >
                {t("calculator.exportPdf", language)}
              </button>
              <a
                href="/astrologer-consultation"
                className="flex-1 py-2.5 rounded-xl font-heading font-semibold text-sm text-center transition-all duration-200 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                }}
                data-ocid="kaal-sarp-calc.consult_astrologer_link"
              >
                Consult an Astrologer
              </a>
            </div>
          </div>
        )}

        {/* ── Informational Content ── */}
        <InfoSection title="What is Kaal Sarp Dosh?">
          <p>
            In Vedic astrology, Kaal Sarp Dosh occurs when all seven major
            planets — Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn — are
            positioned between Rahu and Ketu in the birth chart. Rahu and Ketu
            are the shadow planets, known as the serpent's head and tail. When
            all planets get hemmed between them, it creates a powerful
            configuration that can significantly influence various aspects of
            life.
          </p>
          <p>
            The word "Kaal" means time or death, "Sarp" means serpent, and
            "Dosh" means defect or obstacle. Together, this configuration is
            believed to bring challenges related to career, relationships,
            health, and spiritual growth — though its effects vary widely based
            on its type, position, and the individual's overall chart.
          </p>
        </InfoSection>

        <InfoSection title="Types of Kaal Sarp Dosh" alternate>
          <p>
            There are twelve types of Kaal Sarp Dosh, each defined by the
            position of Rahu and Ketu in the birth chart. Here are the six most
            discussed types:
          </p>
          <div className="space-y-3 mt-2">
            {DOSH_TYPES.map((dt) => (
              <div
                key={dt.name}
                className="p-4 rounded-xl"
                style={{
                  background: "oklch(0.18 0.04 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.08)",
                }}
              >
                <h3
                  className="font-heading text-sm font-bold mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {dt.name}
                </h3>
                <p className="text-xs leading-relaxed">{dt.shortDesc}</p>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="What is a Kaal Sarp Dosh Calculator?">
          <p>
            A Kaal Sarp Dosh calculator is a powerful Vedic astrology tool that
            analyzes your birth chart to determine whether this planetary
            configuration is present in your horoscope. By entering your birth
            details — date, time, and place — the calculator checks the
            positions of all planets relative to Rahu and Ketu.
          </p>
          <p>
            Modern calculators don't just confirm presence or absence; they
            identify the specific type, assess its intensity, and provide
            tailored remedies. This makes it easy to understand your unique
            situation and take practical steps toward balance.
          </p>
        </InfoSection>

        <InfoSection
          title="How Does the Kaal Sarp Dosh Calculator Work?"
          alternate
        >
          <div className="space-y-3">
            {[
              {
                n: "1",
                title: "Birth Data Input",
                desc: "Enter your full name, gender, date and time of birth, and place of birth. Accurate birth time significantly improves the reliability of the assessment.",
              },
              {
                n: "2",
                title: "Planetary Position Calculation",
                desc: "The calculator computes the positions of all nine planets based on your birth details, mapping them to the twelve zodiac houses.",
              },
              {
                n: "3",
                title: "Rahu-Ketu Axis Analysis",
                desc: "The positions of Rahu and Ketu are identified. These shadow planets are always exactly opposite each other in the birth chart, forming the serpent axis.",
              },
              {
                n: "4",
                title: "Configuration Assessment",
                desc: "The calculator checks whether all seven major planets fall between Rahu and Ketu. If so, Kaal Sarp Dosh is present.",
              },
              {
                n: "5",
                title: "Type Identification and Remedies",
                desc: "Based on which house Rahu occupies, the specific type of Kaal Sarp Dosh is identified, along with its intensity and a set of personalized remedies.",
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-3">
                <div
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-xs"
                  style={{
                    background: "oklch(0.68 0.20 48 / 0.18)",
                    color: "oklch(0.78 0.14 75)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                  }}
                >
                  {step.n}
                </div>
                <div>
                  <span
                    className="font-heading font-semibold text-sm"
                    style={{ color: "oklch(0.80 0.06 70)" }}
                  >
                    {step.title}:{" "}
                  </span>
                  <span>{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="Effects of Kaal Sarp Dosh">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                area: "Career Challenges",
                desc: "Despite consistent effort, promotions may be delayed or professional recognition proves elusive. Frequent workplace conflicts and unexpected setbacks are common themes.",
              },
              {
                area: "Relationship Hurdles",
                desc: "Finding compatible partners may prove difficult, and even established relationships can face recurring friction. Family harmony requires extra conscious effort.",
              },
              {
                area: "Health Considerations",
                desc: "Unexplained health issues that persist despite treatment, increased stress and anxiety, and slower recovery from illnesses are common indicators.",
              },
              {
                area: "Spiritual Growth",
                desc: "Paradoxically, this dosh often accelerates spiritual evolution. Many individuals with this configuration develop profound inner wisdom and remarkable resilience.",
              },
            ].map((item) => (
              <div
                key={item.area}
                className="p-4 rounded-xl"
                style={{
                  background: "oklch(0.18 0.04 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.08)",
                }}
              >
                <h4
                  className="font-heading text-sm font-semibold mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {item.area}
                </h4>
                <p className="text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="Remedies for Kaal Sarp Dosh" alternate>
          <p>
            Getting rid of Kaal Sarp Dosh isn't something that happens
            overnight. It takes patience, faith, and the right guidance. But the
            good news is that many people just like you have reduced the
            intensity of their dosh and even turned their lives around using
            these ancient, time-tested remedies.
          </p>
          <div className="space-y-2 mt-2">
            {[
              {
                remedy: "Maha Mrityunjaya Mantra",
                desc: "Chant this powerful mantra 108 times daily for overall protection and to reduce the dosh's intensity.",
              },
              {
                remedy: "Rudrabhishek Puja",
                desc: "Perform on Mondays, especially during the Shravan month, at a Shiva temple for divine protection.",
              },
              {
                remedy: "Nag Panchami Pooja",
                desc: "Offer milk and flowers to Nag Devata on this auspicious day. It directly appeases the serpent energy of Rahu and Ketu.",
              },
              {
                remedy: "Temple Pilgrimage",
                desc: "Visit Trimbakeshwar (Maharashtra) or Kalahasti (Andhra Pradesh) — both renowned for Kaal Sarp Dosh remediation pujas.",
              },
              {
                remedy: "Rahu-Ketu Yantra",
                desc: "Place an energized yantra in your prayer room. It helps neutralize the negative effects of the shadow planets.",
              },
              {
                remedy: "Charitable Acts",
                desc: "Feed crows and black ants on Saturdays; donate black clothes and iron items on Shani Amavasya.",
              },
              {
                remedy: "Silver Snake Ring",
                desc: "Wear a silver Nag ring on the correct finger as prescribed by an astrologer — only after proper consultation.",
              },
              {
                remedy: "Gemstones",
                desc: "Hessonite (Gomed) for Rahu and Cat's Eye (Lehsuniya) for Ketu — but only as prescribed by an experienced astrologer.",
              },
            ].map((item) => (
              <div key={item.remedy} className="flex gap-3">
                <span
                  className="shrink-0 font-heading font-bold text-xs mt-0.5"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  •
                </span>
                <div>
                  <span
                    className="font-heading font-semibold text-sm"
                    style={{ color: "oklch(0.80 0.06 70)" }}
                  >
                    {item.remedy}:{" "}
                  </span>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="Benefits of Kaal Sarp Dosh Puja">
          <ul className="space-y-2">
            {[
              "Significantly reduces the intensity of obstacles in career, relationships, and health",
              "Helps neutralize karmic debts from past lives that manifest as recurring challenges",
              "Brings peace of mind and reduces anxiety caused by the dosh's psychological effects",
              "Improves clarity in decision-making and opens new opportunities previously blocked",
              "Strengthens the individual's spiritual resilience and capacity for transformation",
              "Creates a protective energetic shield that mitigates the shadow planets' negative influence",
            ].map((benefit) => (
              <li key={benefit} className="flex gap-2 text-sm">
                <span style={{ color: "oklch(0.65 0.18 145)" }}>✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title="Conclusion" alternate>
          <p>
            Understanding and addressing Kaal Sarp Dosh through a reliable
            calculator is the first step toward reclaiming your life's
            potential. While this configuration brings challenges, it also
            carries profound lessons about resilience, karma, and spiritual
            evolution.
          </p>
          <p>
            Many great leaders, saints, and achievers throughout history had
            this configuration in their charts — it often bestows extraordinary
            determination and depth of character. With proper guidance from an
            experienced astrologer on Spiritual Connect and the right remedies,
            you can transform these challenges into stepping stones toward a
            fulfilling and purposeful life.
          </p>
        </InfoSection>

        {/* ── Discover More ── */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.07 28) 0%, oklch(0.17 0.06 24) 100%)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
          data-ocid="kaal-sarp-calc.discover_more"
        >
          <h2
            className="font-heading text-xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("calculator.discoverMore", language)}
          </h2>
          <p
            className="font-body text-sm mb-5 max-w-lg mx-auto"
            style={{ color: "oklch(0.65 0.05 60)" }}
          >
            {t("calculator.readyToUnlock", language)}{" "}
            {t("calculator.exploreCalculators", language)}
          </p>
          <div
            className="rounded-xl p-4 mb-5 text-left"
            style={{
              background: "oklch(0.18 0.06 25)",
              border: "1px solid oklch(0.78 0.14 75 / 0.12)",
            }}
          >
            <h3
              className="font-heading text-sm font-bold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              {t("calculator.spiritualConnectStore", language)}
            </h3>
            <p
              className="font-body text-xs leading-relaxed mb-2"
              style={{ color: "oklch(0.65 0.05 60)" }}
            >
              {t("calculator.storeDesc", language)}
            </p>
            <p
              className="font-body text-xs font-medium"
              style={{ color: "oklch(0.72 0.06 65)" }}
            >
              {t("calculator.plusMore", language)} —{" "}
              {t("calculator.plusMoreDesc", language)}
            </p>
          </div>
          <a
            href="/calculators"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
            data-ocid="kaal-sarp-calc.all_calculators_link"
          >
            Explore All Calculators →
          </a>
        </div>

        {/* ── FAQs ── */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
          data-ocid="kaal-sarp-calc.faqs"
        >
          <h2
            className="font-heading text-xl font-bold mb-5 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("calculator.faqs", language)}
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.78 0.14 75 / 0.12)" }}
                data-ocid={`kaal-sarp-calc.faq.item.${i + 1}`}
              >
                <AccordionTrigger
                  className="px-5 py-4 font-heading font-semibold text-sm text-left hover:no-underline"
                  style={{ color: "oklch(0.82 0.06 70)" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent
                  className="px-5 pb-4 font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.68 0.04 62)" }}
                >
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
