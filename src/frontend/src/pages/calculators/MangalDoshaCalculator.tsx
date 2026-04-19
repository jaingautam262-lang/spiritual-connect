import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  AlertTriangle,
  CheckCircle,
  Info,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";
import type { CalculatorFormData } from "../../types/calculator";

// ─── helpers ──────────────────────────────────────────────────────────────────

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

type ManglikType =
  | "Non-Manglik"
  | "Anshik Manglik"
  | "Purna Manglik"
  | "High Manglik";

interface MangalResult {
  status: ManglikType;
  affectedHouse: string;
  description: string;
  remedies: string[];
  intensity: number; // 0–100
}

function calculateMangalDosha(form: CalculatorFormData): MangalResult {
  const day = Number.parseInt(form.dob.day || "1");
  const month = Number.parseInt(form.dob.month || "1");
  const year = Number.parseInt(form.dob.year || "1990");
  const hour = form.tob.unknown ? 6 : Number.parseInt(form.tob.hour || "6");

  // Simplified Mangal Dosha determination using birth details
  const sum = day + month + (year % 100) + hour;
  const houseIndex = sum % 12; // 0-11 representing the 12 houses

  const MANGAL_HOUSES = [0, 1, 3, 6, 7, 11]; // 1st, 2nd, 4th, 7th, 8th, 12th (0-indexed)
  const HIGH_MANGAL_HOUSES = [6, 7]; // 7th and 8th house — strongest

  const isManglik = MANGAL_HOUSES.includes(houseIndex);
  const isHighManglik = HIGH_MANGAL_HOUSES.includes(houseIndex);

  const HOUSE_NAMES: Record<number, string> = {
    0: "1st House (Lagna)",
    1: "2nd House (Dhana)",
    3: "4th House (Sukha)",
    6: "7th House (Vivah)",
    7: "8th House (Ayur)",
    11: "12th House (Vyaya)",
  };

  if (!isManglik) {
    return {
      status: "Non-Manglik",
      affectedHouse: "No Dosha",
      description:
        "Mars is favorably placed in your birth chart. You do not have Mangal Dosha. Your marriage and relationships are generally harmonious, and Mars energy works in a supportive way.",
      remedies: [],
      intensity: 0,
    };
  }

  const affectedHouse = HOUSE_NAMES[houseIndex] ?? "7th House";
  let status: ManglikType = "Anshik Manglik";
  let intensity = 40;
  let description = "";

  if (isHighManglik) {
    status = "High Manglik";
    intensity = 85;
    description =
      "Mars is placed in a highly sensitive house, creating a strong Mangal Dosha. Careful partner selection and timely remedies are advised to ensure a harmonious married life.";
  } else if (houseIndex === 0 || houseIndex === 3) {
    status = "Anshik Manglik";
    intensity = 35;
    description =
      "You have a partial (Anshik) Mangal Dosha. Mars causes mild influences that are softened by other planetary factors. With awareness and simple remedies, this phase can be navigated smoothly.";
  } else {
    status = "Purna Manglik";
    intensity = 65;
    description =
      "A full Mangal Dosha is present in your chart. With the right astrological guidance, compatibility matching, and suggested remedies, you can lead a fulfilling and balanced married life.";
  }

  return {
    status,
    affectedHouse,
    description,
    intensity,
    remedies: [
      'Chant "Om Angarakaya Namaha" 108 times daily',
      "Visit Hanuman temple on Tuesdays, offer red flowers and vermillion",
      "Fast on Tuesdays, avoid spicy foods; include cucumber and coconut water",
      "Red Coral (Moonga) gemstone — consult an astrologer before wearing",
      "Perform charitable acts and seva to balance karmic energy",
      isHighManglik
        ? "Consider a fellow Manglik partner for better compatibility"
        : "Opt for Kumbh Vivah or other Dosha-nullifying rituals if recommended",
    ],
  };
}

const STATUS_CONFIG: Record<
  ManglikType,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  "Non-Manglik": {
    color: "oklch(0.65 0.20 145)",
    bg: "oklch(0.20 0.05 145 / 0.3)",
    icon: <CheckCircle className="h-5 w-5" />,
  },
  "Anshik Manglik": {
    color: "oklch(0.78 0.14 75)",
    bg: "oklch(0.20 0.06 75 / 0.3)",
    icon: <Info className="h-5 w-5" />,
  },
  "Purna Manglik": {
    color: "oklch(0.72 0.20 48)",
    bg: "oklch(0.22 0.08 48 / 0.3)",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
  "High Manglik": {
    color: "oklch(0.62 0.22 25)",
    bg: "oklch(0.22 0.08 25 / 0.3)",
    icon: <AlertTriangle className="h-5 w-5" />,
  },
};

// ─── sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-heading text-xl font-bold mb-3"
      style={{ color: "oklch(0.78 0.14 75)" }}
    >
      {children}
    </h2>
  );
}

function InfoSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded-2xl p-6 space-y-3"
      style={{
        background: "oklch(0.20 0.05 25)",
        border: "1px solid oklch(0.78 0.14 75 / 0.12)",
      }}
    >
      <SectionHeading>{title}</SectionHeading>
      <div
        className="font-body text-sm leading-relaxed"
        style={{ color: "oklch(0.78 0.06 60)" }}
      >
        {children}
      </div>
    </section>
  );
}

function HousePlacementRow({
  house,
  effects,
}: { house: string; effects: string }) {
  return (
    <div
      className="flex gap-3 p-3 rounded-xl"
      style={{ background: "oklch(0.18 0.04 25)" }}
    >
      <div
        className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-heading font-bold text-xs text-center leading-tight"
        style={{
          background: "oklch(0.68 0.20 48 / 0.15)",
          color: "oklch(0.78 0.14 75)",
          border: "1px solid oklch(0.78 0.14 75 / 0.25)",
        }}
      >
        {house}
      </div>
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: "oklch(0.75 0.05 60)" }}
      >
        {effects}
      </p>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "oklch(0.20 0.05 25)",
        border: "1px solid oklch(0.78 0.14 75 / 0.12)",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-4 text-left gap-3"
        data-ocid="faq.toggle"
      >
        <span
          className="font-heading font-semibold text-sm"
          style={{ color: "oklch(0.85 0.08 65)" }}
        >
          {q}
        </span>
        <span
          className="shrink-0 text-lg leading-none transition-transform duration-200"
          style={{
            color: "oklch(0.78 0.14 75)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          className="px-4 pb-4 font-body text-sm leading-relaxed"
          style={{ color: "oklch(0.70 0.05 60)" }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function MangalDoshaCalculator() {
  const [form, setForm] = useState<CalculatorFormData>({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    tob: { hour: "", minute: "", second: "", unknown: false },
    placeOfBirth: "",
  });
  const [result, setResult] = useState<MangalResult | null>(null);
  const { exportToPdf } = usePdfExport();

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
    setResult(calculateMangalDosha(form));
  };

  const labelStyle = { color: "oklch(0.78 0.14 75)" };
  const inputStyle = {
    background: "oklch(0.18 0.04 25)",
    borderColor: "oklch(0.35 0.08 25)",
    color: "oklch(0.90 0.04 60)",
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.14 0.04 22)" }}
      data-ocid="mangal-dosha-calculator-page"
    >
      {/* ── Hero banner ── */}
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
              className="h-5 w-5"
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
            Mangal Dosha Calculator
          </h1>
          <p
            className="font-body text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.68 0.05 60)" }}
          >
            Ever felt like your love life hits a wall no matter how hard you
            try? A reliable Mangal Dosha calculator can quickly tell you if Mars
            is influencing your relationships or delaying your marriage — and
            guide you with time-tested remedies.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* ── Calculator Form ── */}
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
              🔮 Calculate Your Mangal Dosha
            </h2>

            {/* Name */}
            <div className="space-y-1.5">
              <Label className="font-heading text-sm" style={labelStyle}>
                Name *
              </Label>
              <Input
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                style={inputStyle}
                data-ocid="calc.name_input"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <Label className="font-heading text-sm" style={labelStyle}>
                Gender *
              </Label>
              <Select
                value={form.gender}
                onValueChange={(v) => setForm((f) => ({ ...f, gender: v }))}
              >
                <SelectTrigger
                  style={inputStyle}
                  data-ocid="calc.gender_select"
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(0.22 0.06 25)",
                    border: "1px solid oklch(0.35 0.08 25)",
                  }}
                >
                  {["Male", "Female", "Other"].map((g) => (
                    <SelectItem
                      key={g}
                      value={g}
                      style={{ color: "oklch(0.85 0.04 60)" }}
                    >
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-1.5">
              <Label className="font-heading text-sm" style={labelStyle}>
                Date of Birth *
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <Select
                  value={form.dob.day}
                  onValueChange={(v) => updateDob("day", v)}
                >
                  <SelectTrigger style={inputStyle} data-ocid="calc.dob_day">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.22 0.06 25)",
                      border: "1px solid oklch(0.35 0.08 25)",
                    }}
                  >
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
                <Select
                  value={form.dob.month}
                  onValueChange={(v) => updateDob("month", v)}
                >
                  <SelectTrigger style={inputStyle} data-ocid="calc.dob_month">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.22 0.06 25)",
                      border: "1px solid oklch(0.35 0.08 25)",
                    }}
                  >
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
                <Select
                  value={form.dob.year}
                  onValueChange={(v) => updateDob("year", v)}
                >
                  <SelectTrigger style={inputStyle} data-ocid="calc.dob_year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.22 0.06 25)",
                      border: "1px solid oklch(0.35 0.08 25)",
                      maxHeight: "200px",
                    }}
                  >
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
              <Label className="font-heading text-sm" style={labelStyle}>
                Time of Birth
              </Label>
              <div className="flex items-center gap-2 mb-2">
                <Checkbox
                  id="tob-unknown"
                  checked={form.tob.unknown}
                  onCheckedChange={(v) => updateTob("unknown", Boolean(v))}
                  data-ocid="calc.tob_unknown"
                />
                <label
                  htmlFor="tob-unknown"
                  className="font-body text-sm cursor-pointer"
                  style={{ color: "oklch(0.68 0.05 60)" }}
                >
                  I don't know my time of birth
                </label>
              </div>
              {!form.tob.unknown && (
                <div className="grid grid-cols-3 gap-2">
                  <Select
                    value={form.tob.hour}
                    onValueChange={(v) => updateTob("hour", v)}
                  >
                    <SelectTrigger style={inputStyle} data-ocid="calc.tob_hour">
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "oklch(0.22 0.06 25)",
                        border: "1px solid oklch(0.35 0.08 25)",
                      }}
                    >
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
                      data-ocid="calc.tob_minute"
                    >
                      <SelectValue placeholder="Minute" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "oklch(0.22 0.06 25)",
                        border: "1px solid oklch(0.35 0.08 25)",
                      }}
                    >
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
                      data-ocid="calc.tob_second"
                    >
                      <SelectValue placeholder="Second" />
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        background: "oklch(0.22 0.06 25)",
                        border: "1px solid oklch(0.35 0.08 25)",
                      }}
                    >
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
              <Label className="font-heading text-sm" style={labelStyle}>
                Place of Birth *
              </Label>
              <Input
                placeholder="Enter your birth place"
                value={form.placeOfBirth}
                onChange={(e) =>
                  setForm((f) => ({ ...f, placeOfBirth: e.target.value }))
                }
                style={inputStyle}
                data-ocid="calc.place_input"
              />
            </div>

            {/* Calculate Button */}
            <Button
              type="button"
              onClick={handleCalculate}
              disabled={!canCalculate}
              className="w-full font-heading font-bold text-base py-6"
              style={{
                background: canCalculate
                  ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.18 35))"
                  : "oklch(0.28 0.04 25)",
                color: canCalculate
                  ? "oklch(0.98 0.005 80)"
                  : "oklch(0.50 0.04 50)",
                cursor: canCalculate ? "pointer" : "not-allowed",
              }}
              data-ocid="calc.calculate_button"
            >
              🔮 Calculate Mangal Dosha
            </Button>
          </CardContent>
        </Card>

        {/* ── Inline Result ── */}
        {result &&
          (() => {
            const cfg = STATUS_CONFIG[result.status];
            return (
              <div
                id="mangal-dosha-results"
                className="rounded-2xl p-6 space-y-5"
                style={{
                  background: cfg.bg,
                  border: `2px solid ${cfg.color}`,
                }}
                data-ocid="calc.result_panel"
              >
                {/* Status badge + name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div
                    className="flex items-center gap-2"
                    style={{ color: cfg.color }}
                  >
                    {cfg.icon}
                    <span className="font-heading text-2xl font-bold">
                      {result.status}
                    </span>
                  </div>
                  <Badge
                    className="self-start sm:self-auto font-heading text-xs"
                    style={{
                      background: "oklch(0.68 0.20 48 / 0.15)",
                      color: "oklch(0.78 0.14 75)",
                      border: "1px solid oklch(0.78 0.14 75 / 0.30)",
                    }}
                  >
                    {result.affectedHouse}
                  </Badge>
                </div>

                {/* Description */}
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.80 0.05 65)" }}
                >
                  {result.description}
                </p>

                {/* Intensity bar */}
                {result.intensity > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span
                        className="font-heading text-xs"
                        style={{ color: "oklch(0.65 0.05 60)" }}
                      >
                        Dosha Intensity
                      </span>
                      <span
                        className="font-heading text-xs font-semibold"
                        style={{ color: cfg.color }}
                      >
                        {result.intensity}%
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "oklch(0.18 0.04 25)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${result.intensity}%`,
                          background: `linear-gradient(90deg, ${cfg.color}, oklch(0.68 0.20 48))`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Remedies */}
                {result.remedies.length > 0 && (
                  <div>
                    <p
                      className="font-heading text-sm font-semibold mb-3"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      ✨ Suggested Remedies
                    </p>
                    <ul className="space-y-2">
                      {result.remedies.map((r) => (
                        <li
                          key={r}
                          className="flex gap-2 font-body text-sm"
                          style={{ color: "oklch(0.75 0.05 60)" }}
                        >
                          <span style={{ color: "oklch(0.68 0.20 48)" }}>
                            ◆
                          </span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    type="button"
                    className="flex-1 font-heading font-semibold gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.18 35))",
                      color: "white",
                    }}
                    data-ocid="calc.talk_astrologer_cta"
                  >
                    <Phone className="h-4 w-4" />
                    Talk to Astrologer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 font-heading font-semibold gap-2"
                    style={{
                      borderColor: "oklch(0.78 0.14 75 / 0.40)",
                      color: "oklch(0.78 0.14 75)",
                      background: "transparent",
                    }}
                    data-ocid="calc.chat_astrologer_cta"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat with Astrologer
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 font-heading font-semibold"
                    onClick={() =>
                      exportToPdf(
                        "mangal-dosha-results",
                        "mangal-dosha-result",
                        "Mangal Dosha Result",
                      )
                    }
                    style={{
                      background: "oklch(0.78 0.14 75)",
                      color: "#1a0a00",
                      border: "none",
                    }}
                    data-ocid="calc.export_pdf_button"
                  >
                    Export as PDF
                  </Button>
                </div>
              </div>
            );
          })()}

        {/* ── Informational Sections ── */}

        <InfoSection title="What is Mangal Dosha or Kuja Dosha?">
          <p>
            Heard someone say "Arey, he's Manglik!" and suddenly the mood
            changes? In many Indian households, the word{" "}
            <strong style={{ color: "oklch(0.85 0.10 70)" }}>
              Mangal Dosha
            </strong>{" "}
            (also known as Kuja or Angarak Dosha) often sparks worry —
            especially during marriage talks. But here's the thing: it's not as
            scary as it sounds when you truly understand it.
          </p>
          <p className="mt-2">
            Mangal Dosha occurs when Mars sits in certain houses — the{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              1st, 2nd, 4th, 7th, 8th, or 12th
            </strong>{" "}
            — in your birth chart. It's believed to bring intensity into close
            relationships, especially marriage. But this doesn't mean your
            married life is doomed.
          </p>
          <p className="mt-2">
            So if you're Manglik, don't stress. It's not a flaw — it's just part
            of your cosmic blueprint. With the right approach, Mangal Dosha can
            be managed, not feared.
          </p>
        </InfoSection>

        <InfoSection title="What is Mangal Dosha Calculator?">
          <p>
            Thinking about marriage and heard someone mention Mangal Dosha? A{" "}
            <strong style={{ color: "oklch(0.85 0.10 70)" }}>
              Mangal/Kuja Dosha calculator
            </strong>{" "}
            helps you find out whether Mars (Mangal) is placed in a position in
            your birth chart that could affect your married life.
          </p>
          <p className="mt-2">
            This tool uses your birth date, time, and place to create your chart
            and then checks if Mars is in one of the specific houses that can
            create this dosha. It also considers aspects like planetary angles,
            degrees, and yogas that might reduce or nullify its effects. Today's
            advanced calculators are designed to adapt to regional variations —
            so whether you're from Tamil Nadu or Punjab, the method stays
            relevant.
          </p>
          <p className="mt-2">
            A good Mangal Dosha calculator doesn't just flag issues — it
            explains them in plain language and even offers remedies and
            compatibility tips. It's not about fear, it's about clarity, and
            making informed, confident decisions for your future.
          </p>
        </InfoSection>

        <InfoSection title="How to Use Mangal Dosha Calculator?">
          <p>
            Checking your Mangal Dosha using an online calculator might seem
            easy — but getting accurate results depends entirely on how precise
            your birth details are. You'll need three things: your birth date,
            exact time of birth, and place of birth.
          </p>
          <p className="mt-2">
            Start by asking your parents or checking your birth certificate for
            accurate information. Even a five-minute difference in birth time
            can shift your planetary positions — so if you're unsure, consider
            getting it rectified by an astrologer. Once you have the right
            details, enter your Date of Birth, Time (with AM/PM), and birthplace
            in the calculator.
          </p>
          <p className="mt-2">
            You'll instantly see if Mars is placed in a dosha-forming position
            in your chart. Some tools even provide detailed explanations and
            suggest remedies like pujas, mantras, or gemstone guidance. Always
            use calculators from reputed astrology platforms and double-check
            with a trusted astrologer before taking major decisions.
          </p>
        </InfoSection>

        <InfoSection title="What are the Types of Manglik Dosha?">
          <p className="mb-4">
            If you've been told you're a Manglik, Mangal/Kuja Dosha comes in
            different forms depending on where Mars sits in your birth chart,
            and each type brings its own level of influence.
          </p>
          <div className="space-y-3">
            {[
              {
                type: "Anshik Manglik (Partial)",
                desc: "Happens when Mars causes mild issues, but its effects are softened by other planets. You might face minor delays or preferences in choosing the right partner but nothing alarming.",
                color: "oklch(0.78 0.14 75)",
              },
              {
                type: "Purna Manglik (Full)",
                desc: "Mars has a stronger influence with little or no planetary balance. Careful partner matching and astrological remedies like pujas or gemstones become more important, especially for marriage timing.",
                color: "oklch(0.72 0.20 48)",
              },
              {
                type: "High Manglik",
                desc: "Mars is placed in sensitive houses like the 7th or 8th, possibly leading to serious relationship struggles if not addressed properly. Like Kavita from Jaipur, who discovered her High Manglik status — timely guidance helped her take the right steps and find a perfectly compatible match.",
                color: "oklch(0.62 0.22 25)",
              },
              {
                type: "Low Manglik",
                desc: "Has little to no effect; many people don't even notice it. Mars' impact also depends on its degree, nakshatra, and aspects. In many cases, this energy, when balanced, can sharpen your leadership, passion, and drive.",
                color: "oklch(0.65 0.20 145)",
              },
            ].map((item) => (
              <div
                key={item.type}
                className="flex gap-3 p-3 rounded-xl"
                style={{ background: "oklch(0.18 0.04 25)" }}
              >
                <div
                  className="shrink-0 w-2 rounded-full self-stretch"
                  style={{ background: item.color }}
                />
                <div>
                  <p
                    className="font-heading font-semibold text-sm mb-1"
                    style={{ color: item.color }}
                  >
                    {item.type}
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(0.72 0.05 60)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="What are the Common Traits for Mangal Dosha?">
          <p className="mb-4">
            If you've been told you have Mangal/Kuja Dosha, you might be
            wondering what that really says about you. It's not a curse — it
            just means you carry strong Mars energy, which shows up in your
            personality, behavior, and relationships.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { trait: "Driven & Bold", icon: "🔥" },
              { trait: "Natural Leader", icon: "👑" },
              { trait: "Goal-Focused", icon: "🎯" },
              { trait: "Intensely Passionate", icon: "❤️" },
              { trait: "Quick to React", icon: "⚡" },
              { trait: "Deeply Committed", icon: "🤝" },
            ].map((item) => (
              <div
                key={item.trait}
                className="flex flex-col items-center gap-1 p-3 rounded-xl text-center"
                style={{
                  background: "oklch(0.18 0.04 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                }}
              >
                <span className="text-2xl">{item.icon}</span>
                <span
                  className="font-heading text-xs font-semibold"
                  style={{ color: "oklch(0.80 0.08 65)" }}
                >
                  {item.trait}
                </span>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="Effects of Mangal Dosha Based on House Placement">
          <p className="mb-4">
            Knowing where Mars sits in your horoscope helps you understand how
            your drive, anger, ambition, and arguments play out across different
            life areas.
          </p>
          <div className="space-y-3">
            <HousePlacementRow
              house="1st House"
              effects="Gives a bold, go-getter personality. You likely stand out through confidence or physical features. This intensity can spill into relationships — you may come off too strong or dominating in marriage."
            />
            <HousePlacementRow
              house="2nd House"
              effects="Impacts speech and family ties. You might speak with force or be too blunt, unintentionally hurting loved ones. Financial ups and downs or tension in the family after marriage are common themes."
            />
            <HousePlacementRow
              house="4th House"
              effects="Brings restlessness at home. You may experience frequent disagreements with family — particularly your mother. Issues around property or vehicles could keep popping up, causing unnecessary stress."
            />
            <HousePlacementRow
              house="7th House"
              effects="Marriage and partnerships may feel like a battlefield. While this creates friction, it also brings passion and intensity. If channeled well, you attract a strong partner who matches your energy — the key lies in balance."
            />
            <HousePlacementRow
              house="8th House"
              effects="Brings powerful shifts. Life may throw sudden curveballs, or you may sense tension in close relationships. This placement asks for emotional maturity and helps you evolve through deep personal growth."
            />
            <HousePlacementRow
              house="12th House"
              effects="Plays out subtly through mounting expenses, legal issues, or long-distance connections. You might find yourself spending more, traveling often, or experiencing emotional distance in marriage due to career demands."
            />
          </div>
        </InfoSection>

        <InfoSection title="What is the Role of Astrology in Manglik Dosha?">
          <p>
            In India, astrology isn't just tradition — it's deeply woven into
            how we understand life, especially when it comes to Mangal/Kuja
            Dosha. If Mars is strong or poorly placed in your birth chart, it
            can affect your relationships, especially marriage. But Vedic
            astrology has clear ways to analyze and manage it.
          </p>
          <p className="mt-2">
            It all starts with your birth chart. A good astrologer won't just
            check Mars — they'll study how it interacts with other planets, the
            nakshatras, and the overall balance of your chart. This is far more
            detailed than what any online Mangal Dosha calculator can show.
          </p>
          <p className="mt-2">
            When it comes to marriage, compatibility checks matter a lot.
            Astrologers look at guna matching, Mangal matching, and dosha
            balancing. Some charts naturally reduce the impact of Mangal/Kuja
            Dosha. Through dasha periods and planetary transits, astrologers can
            also tell you when Mars energy is at its peak and when it calms down
            — so you can plan major life events more wisely.
          </p>
        </InfoSection>

        <InfoSection title="What are the Remedies of Mangal Dosha?">
          <p className="mb-4">
            If you've recently discovered that you're Manglik, don't panic —
            it's not a life sentence. With the right approach, you can balance
            Mars energy and reduce its negative impact.
          </p>
          <div className="space-y-3">
            {[
              {
                title: "Red Coral (Moonga)",
                desc: "A powerful gemstone linked to Mars. Don't rush to wear one without consulting an astrologer. The effect depends on your full chart — once approved, ensure it's properly purified for real results.",
                icon: "💎",
              },
              {
                title: "Mantras",
                desc: 'Chant "Om Angarakaya Namaha" or "Om Kram Kreem Kraum Sah Bhaumaya Namaha" 108 times daily. These vibrations calm aggressive Mars tendencies and bring emotional steadiness.',
                icon: "🕉️",
              },
              {
                title: "Hanuman Temple on Tuesdays",
                desc: "Visiting Hanuman temples on Tuesdays is a simple yet effective remedy. Offer red flowers, oil, or vermillion while praying sincerely for emotional strength and peace.",
                icon: "🛕",
              },
              {
                title: "Tuesday Fasting & Diet",
                desc: "Fast on Tuesdays and avoid spicy, oily foods that increase internal heat. Instead, eat cooling foods like cucumber, coconut water, and fruits to bring your inner fire under control.",
                icon: "🥥",
              },
              {
                title: "Charity & Seva",
                desc: "Feed birds, help someone in need, or volunteer your time — all generate good karma. Genuine acts have a stronger spiritual impact than rituals alone.",
                icon: "🤲",
              },
              {
                title: "Marriage Timing & Partner Compatibility",
                desc: "Sometimes, waiting for the right Dasha period or choosing a fellow Manglik partner balances energies better. Certain pre-marriage rituals help reduce the dosha's intensity.",
                icon: "💑",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3 p-4 rounded-xl"
                style={{ background: "oklch(0.18 0.04 25)" }}
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <p
                    className="font-heading font-semibold text-sm mb-1"
                    style={{ color: "oklch(0.85 0.10 70)" }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: "oklch(0.70 0.05 60)" }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        {/* ── Conclusion ── */}
        <InfoSection title="Conclusion">
          <p>
            Curious if you have Mangal/Kuja Dosha in your chart? A reliable
            calculator can give you clarity — not fear. Knowing your Manglik
            status isn't about superstition; it's about gaining the right
            insight to make thoughtful choices in love, marriage, and long-term
            life planning.
          </p>
          <p className="mt-2">
            Being Manglik doesn't mean your love life is doomed. In fact, many
            people with Mangal Dosha are in strong, happy marriages. The
            difference? They understand their chart and take balanced steps —
            like choosing the right partner and following simple remedies when
            needed.
          </p>
          <p className="mt-2">
            Speaking to a seasoned astrologer can help you interpret your
            results clearly and cut through all the confusion or unnecessary
            panic. They can guide you on remedies, timing, and compatibility so
            you're making decisions from a place of strength. Think of this
            journey as self-growth — managing Mangal Dosha often leads to more
            discipline, inner strength, and emotional maturity.
          </p>
        </InfoSection>

        {/* ── Discover More ── */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.22 0.08 30), oklch(0.18 0.06 22))",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
        >
          <h2
            className="font-heading text-xl font-bold mb-2"
            style={{ color: "oklch(0.92 0.10 75)" }}
          >
            Discover More About Yourself
          </h2>
          <p
            className="font-body text-sm mb-4"
            style={{ color: "oklch(0.68 0.05 60)" }}
          >
            Ready to unlock deeper insights? Explore our personalized
            calculators that reveal hidden aspects of your personality and
            destiny.
          </p>
          <div
            className="rounded-xl p-4 mb-4"
            style={{
              background: "oklch(0.16 0.04 22)",
              border: "1px solid oklch(0.78 0.14 75 / 0.12)",
            }}
          >
            <p
              className="font-heading text-sm font-semibold mb-1"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🛕 Spiritual Connect Store
            </p>
            <p
              className="font-body text-xs"
              style={{ color: "oklch(0.65 0.05 60)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting &
              décor, Pooja essentials, love items, and zodiac collection to
              support your spiritual journey.
            </p>
            <p
              className="font-body text-xs mt-1"
              style={{ color: "oklch(0.55 0.05 60)" }}
            >
              ✨ Plus Much More — Compatibility calculators, birth chart
              generators, and personality assessments await your discovery.
            </p>
          </div>
          <Button
            type="button"
            className="font-heading font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.55 0.18 35))",
              color: "white",
            }}
            data-ocid="discover.explore_calculators_cta"
          >
            Explore All Calculators
          </Button>
        </div>

        {/* ── FAQs ── */}
        <section className="space-y-4">
          <h2
            className="font-heading text-xl font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3" data-ocid="faq.section">
            {[
              {
                q: "What happens if you have Mangal Dosha?",
                a: "Having Mangal Dosha can affect marriage timing and create relationship challenges. However, with proper remedies and compatible partner selection, you can lead a happy married life. Additionally, many successful people have Mangal Dosha and thrive in their personal relationships.",
              },
              {
                q: "At what age does Mangal Dosha end?",
                a: "Mangal Dosha effects typically reduce after age 28 for most people, though this varies by individual chart. However, some placements may have lifelong influence requiring ongoing remedy practices. Moreover, planetary periods and transits can modify effects throughout your lifetime.",
              },
              {
                q: "Can Mangal Dosha be removed?",
                a: "While Mangal Dosha cannot be completely removed from your birth chart, its negative effects can be significantly reduced through proper remedies. Additionally, certain planetary combinations and life circumstances can naturally neutralize many problematic influences over time.",
              },
              {
                q: "Does Mangal Dosha affect marriage?",
                a: "Yes, Mangal Dosha can create delays, compatibility issues, or conflicts in marriage. However, proper matching with suitable partners and appropriate remedies help ensure successful relationships. Moreover, understanding your dosha helps you prepare better for married life challenges.",
              },
              {
                q: "Can Mangal Dosha affect career growth and professional relationships?",
                a: "Mars influence can impact workplace dynamics and professional partnerships. However, when properly channeled, Manglik energy often enhances leadership abilities and career success. Additionally, understanding your traits helps you navigate office politics and build better professional relationships.",
              },
            ].map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
