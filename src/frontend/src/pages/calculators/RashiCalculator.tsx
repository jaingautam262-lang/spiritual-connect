import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import type { CalculatorFormData } from "@/types/calculator";
import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";

// ─── Data ────────────────────────────────────────────────────────────────────

const RASHIS = [
  {
    id: "mesh",
    name: "Mesh",
    hindi: "मेष",
    en: "Aries",
    symbol: "♈",
    lord: "Mars (मंगल)",
    element: "Fire (अग्नि)",
    quality: "Cardinal (चर)",
    color: "oklch(0.62 0.22 25)",
    traits: "Bold, energetic, pioneering, courageous, impulsive",
    compatible: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
    story:
      "Amit from Chandigarh always charged headfirst into every challenge — launching his startup at 22, winning debates, and leading his college cricket team. When he discovered he was Mesh Rashi, everything clicked. His boldness wasn't recklessness; it was Mars energy pushing him to pioneer.",
    characteristics:
      "You are a natural leader — fearless, ambitious, and always ready to initiate. You thrive in dynamic environments and often inspire others through your enthusiasm. Your challenge is patience: slow down to let your ideas fully ripen.",
  },
  {
    id: "vrishabh",
    name: "Vrishabh",
    hindi: "वृषभ",
    en: "Taurus",
    symbol: "♉",
    lord: "Venus (शुक्र)",
    element: "Earth (पृथ्वी)",
    quality: "Fixed (स्थिर)",
    color: "oklch(0.60 0.16 130)",
    traits: "Reliable, patient, artistic, stubborn, comfort-loving",
    compatible: ["Virgo", "Capricorn", "Cancer", "Pisces"],
    story:
      "Pooja from Lucknow built a successful home bakery through sheer persistence — perfecting each recipe over months, never rushing. Her Vrishabh Rashi explained her extraordinary patience, love of beauty, and unwavering commitment to quality over speed.",
    characteristics:
      "You are grounded and dependable, with a deep appreciation for beauty, comfort, and the finer things in life. Loyalty runs in your veins. Your challenge is flexibility — the world changes, and adapting is strength, not surrender.",
  },
  {
    id: "mithun",
    name: "Mithun",
    hindi: "मिथुन",
    en: "Gemini",
    symbol: "♊",
    lord: "Mercury (बुध)",
    element: "Air (वायु)",
    quality: "Mutable (द्विस्वभाव)",
    color: "oklch(0.58 0.18 200)",
    traits: "Versatile, curious, witty, communicative, restless",
    compatible: ["Libra", "Aquarius", "Aries", "Leo"],
    story:
      "Ravi from Bengaluru had three blogs, two side-projects, and was learning Spanish — all at once. Friends called him scattered; his Mithun Rashi called it gift. Mercury's duality made him a brilliant communicator who could connect dots others couldn't even see.",
    characteristics:
      "Your mind is electric — curious, quick, and always hungry for new ideas. You adapt easily and excel at communication. Your challenge is focus: channel your versatile energy into depth, not just breadth.",
  },
  {
    id: "kark",
    name: "Kark",
    hindi: "कर्क",
    en: "Cancer",
    symbol: "♋",
    lord: "Moon (चंद्र)",
    element: "Water (जल)",
    quality: "Cardinal (चर)",
    color: "oklch(0.58 0.10 220)",
    traits: "Nurturing, intuitive, emotional, protective, loyal",
    compatible: ["Scorpio", "Pisces", "Taurus", "Virgo"],
    story:
      "Deepika from Kolkata always knew when her family needed her — before anyone said a word. As a nurse, her empathy transformed patient care. Her Kark Rashi explained her Moon-ruled soul: deeply intuitive, fiercely protective, and endlessly nurturing.",
    characteristics:
      "You feel everything deeply and care fiercely for those you love. Your home is your sanctuary. Your intuition is your superpower. Your challenge is self-care: you give so much to others — remember to protect your own emotional reserves.",
  },
  {
    id: "simha",
    name: "Simha",
    hindi: "सिंह",
    en: "Leo",
    symbol: "♌",
    lord: "Sun (सूर्य)",
    element: "Fire (अग्नि)",
    quality: "Fixed (स्थिर)",
    color: "oklch(0.72 0.22 55)",
    traits: "Confident, generous, dramatic, ambitious, warm-hearted",
    compatible: ["Aries", "Sagittarius", "Gemini", "Libra"],
    story:
      "Vikram from Mumbai walked into every room like he owned it — charismatic, generous, and magnetic. His team followed him not from obligation but from genuine admiration. His Simha Rashi explained it perfectly: Sun-ruled, born to shine and inspire.",
    characteristics:
      "You radiate confidence and warmth. Natural performers and leaders, Leos are generous with praise and loyalty. Your challenge is ego: true leadership means lifting others into the spotlight, not always standing in it yourself.",
  },
  {
    id: "kanya",
    name: "Kanya",
    hindi: "कन्या",
    en: "Virgo",
    symbol: "♍",
    lord: "Mercury (बुध)",
    element: "Earth (पृथ्वी)",
    quality: "Mutable (द्विस्वभाव)",
    color: "oklch(0.62 0.16 130)",
    traits: "Analytical, practical, diligent, critical, health-conscious",
    compatible: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
    story:
      "Neha from Pune could spot a typo in a 50-page report in 3 minutes flat. Her attention to detail made her an exceptional data analyst. Her Kanya Rashi — ruled by Mercury's precise, earthy side — explained her systematic mind and relentless drive for perfection.",
    characteristics:
      "You have a brilliant analytical mind and a gift for improving systems. You notice what others miss. Your challenge is self-criticism: the same high standards you apply to work can become harsh self-judgment. Extend yourself some grace.",
  },
  {
    id: "tula",
    name: "Tula",
    hindi: "तुला",
    en: "Libra",
    symbol: "♎",
    lord: "Venus (शुक्र)",
    element: "Air (वायु)",
    quality: "Cardinal (चर)",
    color: "oklch(0.60 0.16 300)",
    traits: "Diplomatic, fair-minded, social, gracious, indecisive",
    compatible: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
    story:
      "Arjun from Jaipur was the friend everyone called when they had a dispute — he could see all sides and find solutions that left everyone feeling heard. His Tula Rashi, ruled by Venus, made him a natural peacemaker with an eye for beauty and justice.",
    characteristics:
      "You are the diplomat of the zodiac — charming, fair, and relationship-oriented. Beauty and harmony are your love languages. Your challenge is decisiveness: your ability to see all perspectives can leave you stuck at the crossroads. Trust your instincts.",
  },
  {
    id: "vrischik",
    name: "Vrischik",
    hindi: "वृश्चिक",
    en: "Scorpio",
    symbol: "♏",
    lord: "Mars (मंगल)",
    element: "Water (जल)",
    quality: "Fixed (स्थिर)",
    color: "oklch(0.52 0.20 22)",
    traits: "Intense, passionate, resourceful, secretive, determined",
    compatible: ["Cancer", "Pisces", "Virgo", "Capricorn"],
    story:
      "Pradeep from Varanasi went through three career reinventions by 35 — each time emerging stronger. His Vrischik Rashi explained his phoenix-like nature: Mars-driven intensity and deep water-sign emotional power made transformation his natural state.",
    characteristics:
      "You possess extraordinary depth, passion, and resilience. You see through surface appearances to the truth beneath. Your challenge is trust: letting people in fully, rather than keeping your depths hidden, unlocks your greatest power.",
  },
  {
    id: "dhanu",
    name: "Dhanu",
    hindi: "धनु",
    en: "Sagittarius",
    symbol: "♐",
    lord: "Jupiter (गुरु)",
    element: "Fire (अग्नि)",
    quality: "Mutable (द्विस्वभाव)",
    color: "oklch(0.65 0.18 75)",
    traits: "Optimistic, adventurous, philosophical, freedom-loving, blunt",
    compatible: ["Aries", "Leo", "Libra", "Aquarius"],
    story:
      "Anita from Hyderabad quit a safe corporate job to backpack through 14 countries, writing a travel memoir that became a bestseller. Her Dhanu Rashi — ruled by expansive Jupiter — explained her boundless optimism, philosophical outlook, and hunger for freedom.",
    characteristics:
      "You are the eternal optimist — adventurous, philosophical, and always chasing the horizon. Your enthusiasm is contagious. Your challenge is follow-through: the excitement of starting is easy; the wisdom is in finishing what you begin.",
  },
  {
    id: "makar",
    name: "Makar",
    hindi: "मकर",
    en: "Capricorn",
    symbol: "♑",
    lord: "Saturn (शनि)",
    element: "Earth (पृथ्वी)",
    quality: "Cardinal (चर)",
    color: "oklch(0.52 0.10 245)",
    traits: "Ambitious, disciplined, practical, responsible, reserved",
    compatible: ["Taurus", "Virgo", "Scorpio", "Pisces"],
    story:
      "Rajiv from Delhi worked methodically for 12 years to become a partner at his law firm — never cutting corners, always building. His Makar Rashi, governed by disciplined Saturn, was the blueprint: patient ambition, structural thinking, and relentless work ethic.",
    characteristics:
      "You climb mountains with steady, purposeful steps. Discipline and responsibility are your anchors. Your challenge is softness: your strength can sometimes come across as coldness. Let people see the warmth beneath your professional armor.",
  },
  {
    id: "kumbh",
    name: "Kumbh",
    hindi: "कुम्भ",
    en: "Aquarius",
    symbol: "♒",
    lord: "Saturn (शनि)",
    element: "Air (वायु)",
    quality: "Fixed (स्थिर)",
    color: "oklch(0.55 0.16 255)",
    traits: "Progressive, humanitarian, independent, eccentric, intellectual",
    compatible: ["Gemini", "Libra", "Aries", "Sagittarius"],
    story:
      "Sanjay from Ahmedabad launched an NGO that brought solar-powered libraries to 40 remote villages — not for fame, but because he saw the gap and felt compelled to fill it. His Kumbh Rashi explained his humanitarian vision, independent thinking, and systematic innovation.",
    characteristics:
      "You are ahead of your time — visionary, humanitarian, and intellectually independent. You care deeply about society. Your challenge is emotional connection: your universal love is vast, but nurturing one-on-one intimacy requires conscious attention.",
  },
  {
    id: "meen",
    name: "Meen",
    hindi: "मीन",
    en: "Pisces",
    symbol: "♓",
    lord: "Jupiter (गुरु)",
    element: "Water (जल)",
    quality: "Mutable (द्विस्वभाव)",
    color: "oklch(0.58 0.14 230)",
    traits: "Compassionate, artistic, intuitive, gentle, selfless",
    compatible: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
    story:
      "Kavya from Kochi channeled her childhood sorrows into paintings that moved audiences to tears — her art a bridge between worlds. Her Meen Rashi, ruled by Jupiter's mystical waters, explained her extraordinary empathy, spiritual depth, and creative gift.",
    characteristics:
      "You feel the full spectrum of human emotion and translate it into beauty. Your empathy is your gift and your vulnerability. Your challenge is boundaries: your porous nature absorbs others' pain. Learning to protect your energy is your sacred work.",
  },
];

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
const YEARS = Array.from({ length: 100 }, (_, i) =>
  String(new Date().getFullYear() - i),
);
const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const SECONDS = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

// Simplified moon rashi calculation
function calculateRashi(day: number, month: number, year: number): number {
  const y = year % 100;
  return (day + month + y + 4) % 12;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormField({
  label,
  children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label
        className="font-heading text-sm"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

const selectStyle = {
  background: "oklch(0.20 0.05 25)",
  borderColor: "oklch(0.32 0.07 28)",
  color: "oklch(0.90 0.04 65)",
};

function RashiResult({
  rashi,
  onExportPdf,
}: { rashi: (typeof RASHIS)[0]; onExportPdf: () => void }) {
  return (
    <div
      id="rashi-results"
      className="mt-6 rounded-2xl overflow-hidden"
      style={{
        border: `2px solid ${rashi.color}40`,
        background: "oklch(0.16 0.04 22)",
      }}
      data-ocid="rashi-result"
    >
      {/* Header */}
      <div
        className="px-6 py-5 text-center"
        style={{
          background: `${rashi.color}18`,
          borderBottom: `1px solid ${rashi.color}30`,
        }}
      >
        <div className="text-6xl mb-2">{rashi.symbol}</div>
        <h3
          className="font-heading text-3xl font-bold"
          style={{ color: rashi.color }}
        >
          {rashi.hindi} — {rashi.name}
        </h3>
        <p className="text-lg mt-1" style={{ color: "oklch(0.75 0.04 65)" }}>
          {rashi.en} Moon Sign
        </p>
      </div>

      {/* Attributes grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5">
        {[
          { label: "Rashi Lord", value: rashi.lord },
          { label: "Element", value: rashi.element },
          { label: "Nature", value: rashi.quality },
          {
            label: "Compatible",
            value: rashi.compatible.slice(0, 2).join(", "),
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-3 text-center"
            style={{ background: "oklch(0.21 0.05 24)" }}
          >
            <div
              className="text-xs font-heading mb-1"
              style={{ color: "oklch(0.58 0.05 60)" }}
            >
              {item.label}
            </div>
            <div
              className="text-sm font-semibold font-heading"
              style={{ color: "oklch(0.88 0.06 65)" }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Traits */}
      <div className="px-5 pb-3">
        <div className="flex flex-wrap gap-2">
          {rashi.traits.split(", ").map((t) => (
            <Badge
              key={t}
              className="text-xs font-body"
              style={{
                background: `${rashi.color}20`,
                color: rashi.color,
                border: `1px solid ${rashi.color}40`,
              }}
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>

      {/* Characteristics */}
      <div className="px-5 pb-4">
        <div
          className="rounded-xl p-4"
          style={{ background: "oklch(0.21 0.05 24)" }}
        >
          <p
            className="text-sm font-body leading-relaxed"
            style={{ color: "oklch(0.78 0.04 65)" }}
          >
            {rashi.characteristics}
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div
        className="px-5 pb-5 flex flex-col sm:flex-row gap-3"
        style={{
          borderTop: `1px solid ${rashi.color}20`,
          paddingTop: "1.25rem",
        }}
      >
        <button
          type="button"
          className="btn-spiritual flex-1 px-5 py-2.5 rounded-lg text-sm font-heading font-semibold"
          data-ocid="talk-astrologer-btn"
        >
          🔮 Talk to Astrologer
        </button>
        <button
          type="button"
          className="btn-gold flex-1 px-5 py-2.5 rounded-lg text-sm font-heading font-semibold"
          data-ocid="chat-astrologer-btn"
        >
          💬 Chat with Astrologer
        </button>
        <button
          type="button"
          onClick={onExportPdf}
          className="flex-1 px-5 py-2.5 rounded-lg text-sm font-heading font-semibold transition-all hover:opacity-90"
          style={{ background: "oklch(0.78 0.14 75)", color: "#1a0a00" }}
          data-ocid="rashi-calc.export_pdf_button"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function InfoSection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-8">
      <h2
        className="font-heading text-2xl md:text-3xl font-bold mb-4"
        style={{ color: "oklch(0.78 0.14 75)" }}
      >
        {title}
      </h2>
      <div
        className="font-body text-base leading-relaxed space-y-3"
        style={{ color: "oklch(0.78 0.04 65)" }}
      >
        {children}
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: string }) {
  return (
    <div
      className="rounded-xl p-4 my-4 border-l-4"
      style={{
        background: "oklch(0.19 0.05 26)",
        borderLeftColor: "oklch(0.72 0.18 55)",
      }}
    >
      <p
        className="text-sm font-body italic leading-relaxed"
        style={{ color: "oklch(0.72 0.04 65)" }}
      >
        {story}
      </p>
    </div>
  );
}

function RashiMeaningCard({
  rashi,
  index,
}: { rashi: (typeof RASHIS)[0]; index: number }) {
  return (
    <Card
      className="overflow-hidden"
      style={{
        background: "oklch(0.17 0.04 24)",
        border: `1px solid ${rashi.color}30`,
      }}
    >
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{rashi.symbol}</span>
          <div>
            <h3
              className="font-heading font-bold text-lg"
              style={{ color: rashi.color }}
            >
              {index + 1}. {rashi.hindi} / {rashi.name}
            </h3>
            <p
              className="text-xs font-body"
              style={{ color: "oklch(0.60 0.04 60)" }}
            >
              {rashi.en} · Lord: {rashi.lord}
            </p>
          </div>
        </div>
        <p
          className="text-sm font-body mb-3 leading-relaxed"
          style={{ color: "oklch(0.75 0.04 65)" }}
        >
          {rashi.characteristics}
        </p>
        <StoryCard story={rashi.story} />
      </CardContent>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const emptyForm: CalculatorFormData = {
  name: "",
  gender: "",
  dob: { day: "", month: "", year: "" },
  tob: { hour: "", minute: "", second: "", unknown: false },
  placeOfBirth: "",
};

export default function RashiCalculator() {
  const [form, setForm] = useState<CalculatorFormData>(emptyForm);
  const [result, setResult] = useState<(typeof RASHIS)[0] | null>(null);
  const { exportToPdf } = usePdfExport();

  const setDob = (field: keyof typeof form.dob, val: string) =>
    setForm((f) => ({ ...f, dob: { ...f.dob, [field]: val } }));
  const setTob = (field: keyof typeof form.tob, val: string | boolean) =>
    setForm((f) => ({ ...f, tob: { ...f.tob, [field]: val } }));

  const handleCalculate = () => {
    const { day, month, year } = form.dob;
    if (!day || !month || !year) return;
    const monthIndex = MONTHS.indexOf(month) + 1;
    const idx = calculateRashi(
      Number.parseInt(day),
      monthIndex,
      Number.parseInt(year),
    );
    setResult(RASHIS[idx]);
  };

  const inputStyle = {
    background: "oklch(0.20 0.05 25)",
    borderColor: "oklch(0.32 0.07 28)",
    color: "oklch(0.90 0.04 65)",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "oklch(0.14 0.04 22)",
        color: "oklch(0.90 0.04 65)",
      }}
      data-ocid="rashi-calculator-page"
    >
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-2">
        {/* ── Page Title ── */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌙</div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Rashi / Moon Sign Calculator
          </h1>
          <p
            className="font-body text-base max-w-2xl mx-auto"
            style={{ color: "oklch(0.68 0.04 65)" }}
          >
            Discover your Janma Rashi — the Moon Sign that shapes your emotions,
            instincts, and inner world.
          </p>
        </div>

        {/* ── Calculator Card ── */}
        <Card
          style={{
            background: "oklch(0.17 0.05 24)",
            border: "1px solid oklch(0.32 0.07 28)",
          }}
        >
          <CardContent className="p-6 space-y-5">
            {/* Name */}
            <FormField label="Name *">
              <Input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                style={inputStyle}
                data-ocid="rashi-calc.name_input"
              />
            </FormField>

            {/* Gender */}
            <FormField label="Gender *">
              <Select
                onValueChange={(v) => setForm((f) => ({ ...f, gender: v }))}
                value={form.gender}
              >
                <SelectTrigger
                  style={selectStyle}
                  data-ocid="rashi-calc.gender_select"
                >
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "oklch(0.20 0.05 25)",
                    borderColor: "oklch(0.32 0.07 28)",
                  }}
                >
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            {/* Date of Birth */}
            <FormField label="Date of Birth *">
              <div className="grid grid-cols-3 gap-3">
                <Select
                  onValueChange={(v) => setDob("day", v)}
                  value={form.dob.day}
                >
                  <SelectTrigger
                    style={selectStyle}
                    data-ocid="rashi-calc.dob_day"
                  >
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.20 0.05 25)",
                      borderColor: "oklch(0.32 0.07 28)",
                    }}
                  >
                    {DAYS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(v) => setDob("month", v)}
                  value={form.dob.month}
                >
                  <SelectTrigger
                    style={selectStyle}
                    data-ocid="rashi-calc.dob_month"
                  >
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.20 0.05 25)",
                      borderColor: "oklch(0.32 0.07 28)",
                    }}
                  >
                    {MONTHS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(v) => setDob("year", v)}
                  value={form.dob.year}
                >
                  <SelectTrigger
                    style={selectStyle}
                    data-ocid="rashi-calc.dob_year"
                  >
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      background: "oklch(0.20 0.05 25)",
                      borderColor: "oklch(0.32 0.07 28)",
                    }}
                  >
                    {YEARS.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormField>

            {/* Time of Birth */}
            <FormField label="Time of Birth">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Checkbox
                    id="tob-unknown"
                    checked={form.tob.unknown}
                    onCheckedChange={(v) => setTob("unknown", !!v)}
                    data-ocid="rashi-calc.tob_unknown"
                  />
                  <Label
                    htmlFor="tob-unknown"
                    className="text-sm font-body cursor-pointer"
                    style={{ color: "oklch(0.68 0.04 65)" }}
                  >
                    I don't know my time of birth
                  </Label>
                </div>
                {!form.tob.unknown && (
                  <div className="grid grid-cols-3 gap-3">
                    <Select
                      onValueChange={(v) => setTob("hour", v)}
                      value={form.tob.hour}
                    >
                      <SelectTrigger
                        style={selectStyle}
                        data-ocid="rashi-calc.tob_hour"
                      >
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          background: "oklch(0.20 0.05 25)",
                          borderColor: "oklch(0.32 0.07 28)",
                        }}
                      >
                        {HOURS.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(v) => setTob("minute", v)}
                      value={form.tob.minute}
                    >
                      <SelectTrigger
                        style={selectStyle}
                        data-ocid="rashi-calc.tob_minute"
                      >
                        <SelectValue placeholder="Minute" />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          background: "oklch(0.20 0.05 25)",
                          borderColor: "oklch(0.32 0.07 28)",
                        }}
                      >
                        {MINUTES.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={(v) => setTob("second", v)}
                      value={form.tob.second}
                    >
                      <SelectTrigger
                        style={selectStyle}
                        data-ocid="rashi-calc.tob_second"
                      >
                        <SelectValue placeholder="Second" />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          background: "oklch(0.20 0.05 25)",
                          borderColor: "oklch(0.32 0.07 28)",
                        }}
                      >
                        {SECONDS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </FormField>

            {/* Place of Birth */}
            <FormField label="Place of Birth *">
              <Input
                type="text"
                placeholder="Enter your birth place"
                value={form.placeOfBirth}
                onChange={(e) =>
                  setForm((f) => ({ ...f, placeOfBirth: e.target.value }))
                }
                style={inputStyle}
                data-ocid="rashi-calc.place_input"
              />
            </FormField>

            {/* Calculate Button */}
            <Button
              type="button"
              onClick={handleCalculate}
              className="w-full py-3 text-base font-heading font-bold btn-spiritual rounded-xl"
              style={{ minHeight: "3rem" }}
              data-ocid="rashi-calc.calculate_btn"
            >
              🌙 Calculate My Rashi
            </Button>

            {/* Inline Result */}
            {result && (
              <RashiResult
                rashi={result}
                onExportPdf={() =>
                  exportToPdf(
                    "rashi-results",
                    "rashi-calculator-result",
                    "Rashi / Moon Sign Result",
                  )
                }
              />
            )}
          </CardContent>
        </Card>

        {/* ── Divider ── */}
        <div
          className="py-4"
          style={{ borderTop: "1px solid oklch(0.28 0.06 28)" }}
        />

        {/* ── Informational Sections ── */}

        <InfoSection title="What is Rashi / Moon Sign?">
          <p>
            In Vedic astrology, your{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Rashi</strong>{" "}
            (also called Janma Rashi or Moon Sign) is determined by the position
            of the Moon at the exact moment of your birth. The Moon moves
            through all 12 zodiac signs roughly every 27-28 days, spending about
            2.5 days in each sign. This means your Rashi is highly personal —
            even people born on the same day in different cities can have
            different Rashis.
          </p>
          <p>
            Unlike the Western Sun Sign — which changes monthly — your Rashi
            changes every 2-3 days, making it a far more nuanced and personal
            indicator. It governs your emotional landscape, your instinctive
            reactions, your relationship with your mother, and the type of
            environment where you feel most at home.
          </p>
          <p>
            Your Rashi is the foundation of Vedic astrology. It determines which
            "house" each planet occupies in your birth chart, shapes your dasha
            (planetary period) calculations, and is the primary reference for
            all astrological predictions in Jyotish.
          </p>
        </InfoSection>

        <InfoSection title="What is My Rashi by Name?">
          <p>
            In traditional Vedic practice, babies were given names whose first
            syllable corresponded to their Janma Nakshatra — the birth star that
            determines the Rashi. This naming tradition, called{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              Namakarana Samskara
            </strong>
            , was a sacred ceremony performed on the 11th or 12th day after
            birth.
          </p>
          <p>
            For example, children born under{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              Vrishabh (Taurus) Rashi
            </strong>{" "}
            were traditionally named starting with syllables like:{" "}
            <em style={{ color: "oklch(0.72 0.12 70)" }}>
              I, U, E, O, Va, Vi, Vu, Ve, Vo
            </em>
            . A child named <em>Usha</em> or <em>Vinita</em> might carry
            Vrishabh energy in their name.
          </p>
          <p>
            Similarly, for{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              Kark (Cancer) Rashi
            </strong>
            , the associated name syllables are:{" "}
            <em style={{ color: "oklch(0.72 0.12 70)" }}>
              Hi, Hu, He, Ho, Da, Di, Du, De, Do
            </em>
            . Names like <em>Deepa</em>, <em>Hitesh</em>, or <em>Dolly</em>{" "}
            carry this lunar energy.
          </p>
          <p>
            While this naming tradition has become less common in modern
            families, many astrologers still recommend naming children by their
            birth star syllable to align their life energy with their cosmic
            blueprint.
          </p>
        </InfoSection>

        <InfoSection title="What is My Rashi by Date of Birth?">
          <p>
            Finding your Rashi by date of birth alone gives a good approximation
            but may not be fully precise — because the Moon can change signs
            within the same day. This is why birth time also matters.
          </p>
          <StoryCard story="Consider Kavita and Meera — both born on June 22nd. But Kavita was born at 2 AM in Delhi, and Meera at 11 PM in Chennai. The Moon crossed from Gemini into Cancer that day around 4 PM. Kavita's chart shows Mithun (Gemini) Rashi, while Meera's shows Kark (Cancer) Rashi — same birth date, different Moon Signs, different emotional personalities entirely." />
          <p>
            Astrologers calculate Rashi by tracking the precise longitude of the
            Moon in the zodiac belt. The 360° zodiac is divided into 12 equal
            parts of 30° each — one for each Rashi. When the Moon is between 60°
            and 90°, it's in Mithun (Gemini). When it crosses 90°, it enters
            Kark (Cancer).
          </p>
          <p>
            Online Rashi calculators do this calculation instantly. For the most
            accurate result, always provide your exact birth date, time, and
            place.
          </p>
        </InfoSection>

        <InfoSection title="What is My Rashi by Date of Birth and Time?">
          <p>
            The Moon travels approximately{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              12–15 degrees per day
            </strong>{" "}
            through the zodiac. This means it can move from one Rashi to another
            within a single day — making birth time critically important for an
            accurate calculation.
          </p>
          <StoryCard story="Take someone born on September 17th. The Moon entered Virgo (Kanya) at 6 AM and moved into Libra (Tula) by 6 PM. A person born at 4 AM has Kanya Rashi — analytical, precise, practical. A person born at 8 PM has Tula Rashi — diplomatic, artistic, harmony-seeking. Same birthday, completely different emotional blueprints." />
          <StoryCard story="Rohit from Pune had always identified with Aquarius traits — visionary, eccentric, independent. But when he got a precise calculation using his exact birth time (3:42 AM, not the approximated 6 AM his parents remembered), his Rashi turned out to be Capricorn (Makar). The more disciplined, structured Capricorn description resonated far more deeply with who he truly was." />
          <p>
            This is why birth certificates, family records, or hospital records
            are so valuable in astrology. Even a 30-minute difference can shift
            your Rashi. If you're unsure of your exact birth time, an
            experienced astrologer can perform "birth time rectification" using
            key life events.
          </p>
        </InfoSection>

        <InfoSection title="How to Check Rashi by Date of Birth?">
          <div className="space-y-4">
            {[
              {
                step: "Step 1",
                title: "Gather your birth details",
                desc: "You'll need your full date of birth, the exact time of birth (to the minute if possible), and the city or place of birth. More precision means more accuracy.",
              },
              {
                step: "Step 2",
                title: "Enter details in the calculator above",
                desc: "Use the form at the top of this page. Select your day, month, and year from the dropdowns. Enter your birth time (or tick 'I don't know' for an approximation). Type your birth city.",
              },
              {
                step: "Step 3",
                title: "Click Calculate and interpret your result",
                desc: "Your Janma Rashi will appear instantly with your Moon sign symbol, Hindi name, ruling planet, element, compatible signs, and a detailed personality interpretation tailored to your sign.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex gap-4 p-4 rounded-xl"
                style={{ background: "oklch(0.19 0.05 26)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-heading font-bold text-sm"
                  style={{
                    background: "oklch(0.68 0.2 48)",
                    color: "oklch(0.14 0.04 22)",
                  }}
                >
                  {step.split(" ")[1]}
                </div>
                <div>
                  <h4
                    className="font-heading font-semibold mb-1"
                    style={{ color: "oklch(0.85 0.08 65)" }}
                  >
                    {title}
                  </h4>
                  <p
                    className="text-sm font-body"
                    style={{ color: "oklch(0.72 0.04 65)" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="What is the Importance of Knowing Your Rashi?">
          <p>
            Your Rashi is far more than an astrological curiosity — it's the
            lens through which Vedic astrology reads your entire life. Here's
            why knowing it matters:
          </p>
          <ul className="space-y-2 pl-4">
            {[
              "Emotional intelligence: Your Rashi reveals your default emotional patterns — how you love, how you grieve, how you seek comfort. Cancer (Kark) Rashi individuals build deep, lasting bonds; Gemini (Mithun) Rashi individuals need variety and intellectual stimulation in relationships.",
              "Relationship compatibility: In Vedic matchmaking, Rashi compatibility (Rashi Koot) is central. Two compatible Moon signs create natural emotional harmony — you understand each other without words.",
              "Timing of events: All Vedic dasha systems are calculated from your Moon's position at birth. Your Mahadasha, Antardasha, and transit predictions are all anchored to your Rashi.",
              "Daily guidance: Daily horoscopes (Rashifal) are most accurate when based on your Rashi — not your Sun sign. Knowing your Rashi makes newspaper/app horoscopes actually relevant.",
              "Spiritual practices: Different Rashis respond to different mantras, gemstones, and deities. Knowing yours helps you choose the practices that genuinely support your growth.",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm"
                style={{ color: "oklch(0.75 0.04 65)" }}
              >
                <span style={{ color: "oklch(0.72 0.18 55)", flexShrink: 0 }}>
                  ✦
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title="What is Planet Moon and Rashi Lord?">
          <p>
            In Vedic astrology, the Moon (Chandra) is considered the most
            important planet — more so than the Sun. It is the karaka
            (significator) of mind, emotions, mother, nourishment, and the
            subconscious. The Moon's sign in your chart — your Rashi — is the
            primary identifier of your inner world.
          </p>
          <p>
            Each Rashi has a{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>Rashi Lord</strong>{" "}
            (the ruling planet). This planet's strength and position in your
            chart colors how you express your Rashi's energy:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            {[
              {
                rashi: "Simha (Leo)",
                lord: "Sun (Sūrya)",
                effect:
                  "Strong Sun brings confidence, leadership, and vitality",
              },
              {
                rashi: "Vrischik (Scorpio)",
                lord: "Mars (Maṅgal)",
                effect:
                  "Strong Mars brings intensity, courage, and deep passions",
              },
              {
                rashi: "Kark (Cancer)",
                lord: "Moon (Candra)",
                effect:
                  "The Moon rules Cancer itself — pure emotional depth and intuition",
              },
              {
                rashi: "Mithun (Gemini)",
                lord: "Mercury (Budha)",
                effect:
                  "Mercury brings intellect, communication skills, and adaptability",
              },
            ].map(({ rashi, lord, effect }) => (
              <div
                key={rashi}
                className="rounded-xl p-4"
                style={{
                  background: "oklch(0.19 0.05 26)",
                  border: "1px solid oklch(0.30 0.06 28)",
                }}
              >
                <div
                  className="font-heading font-semibold text-sm mb-1"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {rashi}
                </div>
                <div
                  className="text-xs font-body mb-1"
                  style={{ color: "oklch(0.68 0.12 60)" }}
                >
                  Lord: {lord}
                </div>
                <div
                  className="text-xs font-body"
                  style={{ color: "oklch(0.68 0.04 65)" }}
                >
                  {effect}
                </div>
              </div>
            ))}
          </div>
          <p>
            When your Rashi Lord is strong (well-placed, in its own sign,
            exalted), you express your Moon Sign's best qualities naturally.
            When it's weak or challenged, you may struggle with certain
            emotional patterns — but understanding this is the first step to
            conscious growth.
          </p>
        </InfoSection>

        {/* All 12 Rashis */}
        <section className="py-8">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-6"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            What is the Meaning Behind Each Rashi?
          </h2>
          <div className="space-y-5">
            {RASHIS.map((rashi, i) => (
              <RashiMeaningCard key={rashi.id} rashi={rashi} index={i} />
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <InfoSection title="Conclusion">
          <p>
            Your Rashi — your Janma Moon Sign — is one of the most powerful
            tools for self-understanding in Vedic astrology. It's not just a
            label; it's a map of your inner emotional architecture. From the
            bold fire of Mesh (Aries) to the compassionate waters of Meen
            (Pisces), each of the 12 rashis carries a unique cosmic frequency
            that shapes how you experience and respond to life.
          </p>
          <p>
            Knowing your Rashi helps you understand why you feel the way you
            feel, why certain relationships light you up while others drain you,
            and what spiritual practices and environments genuinely support your
            wellbeing. It's the foundation of all Vedic astrological analysis —
            from daily Rashifal to lifetime dasha predictions.
          </p>
          <p>
            Use the calculator above to discover your Moon Sign instantly. And
            for deeper, personalized insights — career, relationships, timing,
            remedies — connect with an experienced astrologer on Spiritual
            Connect who can read your full birth chart and guide your unique
            journey.
          </p>
        </InfoSection>

        {/* Discover More / Store Collection */}
        <section
          className="rounded-2xl p-6 my-4 text-center"
          style={{
            background: "oklch(0.19 0.05 26)",
            border: "1px solid oklch(0.32 0.07 28)",
          }}
        >
          <h2
            className="font-heading text-2xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Discover More About Yourself
          </h2>
          <p
            className="font-body text-sm mb-4"
            style={{ color: "oklch(0.68 0.04 65)" }}
          >
            Ready to unlock deeper insights? Explore our personalized
            calculators that reveal hidden aspects of your personality and
            destiny.
          </p>
          <div
            className="rounded-xl p-4 mb-4 text-left"
            style={{
              background: "oklch(0.16 0.04 22)",
              border: "1px solid oklch(0.30 0.06 28)",
            }}
          >
            <h3
              className="font-heading font-semibold mb-2"
              style={{ color: "oklch(0.72 0.18 55)" }}
            >
              ✨ Spiritual Connect Store
            </h3>
            <p
              className="font-body text-sm leading-relaxed"
              style={{ color: "oklch(0.70 0.04 65)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting &
              décor, Pooja essentials, love items, and zodiac collection to
              support your spiritual journey. ✨ Plus Much More — Compatibility
              calculators, birth chart generators, and personality assessments
              await your discovery.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              className="btn-spiritual px-6 py-2.5 rounded-xl text-sm font-heading font-semibold"
              data-ocid="explore-calculators-btn"
            >
              🔮 Explore All Calculators
            </button>
            <button
              type="button"
              className="btn-gold px-6 py-2.5 rounded-xl text-sm font-heading font-semibold"
              data-ocid="visit-store-btn"
            >
              🛒 Visit Spiritual Store
            </button>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="py-8">
          <h2
            className="font-heading text-2xl md:text-3xl font-bold mb-6"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="space-y-3"
            data-ocid="rashi-faqs"
          >
            {[
              {
                id: "faq-1",
                q: "What is my Rashi by month and date?",
                a: "While you can get a rough estimate using only your birth month and date, it may not be fully accurate. The Moon changes signs every 2-3 days, so two people born in the same month can have different Rashis. For a reliable result, you also need your birth time and place. Use the calculator above with all three details for the most accurate Janma Rashi.",
              },
              {
                id: "faq-2",
                q: "How can I know my Rashi by date of birth?",
                a: "Enter your date of birth, time of birth, and place of birth in the Rashi calculator at the top of this page. The calculator determines the Moon's zodiac position at your birth and identifies your Janma Rashi. The more precise your birth time, the more accurate your result — since the Moon can shift signs within a single day.",
              },
              {
                id: "faq-3",
                q: "How to know Rashi of a newborn baby?",
                a: "For a newborn, note the exact date, time (to the minute), and hospital location at birth. Enter these details in the Rashi calculator. Many Indian families also consult a family astrologer for the Namakarana (naming ceremony) to find the Rashi, Nakshatra, and the auspicious first syllable for the baby's name — a beautiful tradition that connects the child to their cosmic blueprint.",
              },
              {
                id: "faq-4",
                q: "Does Rashi change during a lifetime?",
                a: "No — your Janma Rashi (birth Moon sign) is fixed for life. It is determined by the Moon's position at the exact moment of your birth and never changes. However, the Moon continues its monthly journey through all 12 rashis, creating what astrologers call Gochar (transits). When the transiting Moon visits your Rashi, it can trigger emotions and events, but your fundamental Janma Rashi remains constant.",
              },
              {
                id: "faq-5",
                q: "Can two people have the same Rashi but different personalities?",
                a: "Absolutely — and this is one of the most important nuances of Vedic astrology. Your Rashi is just one piece of a complex birth chart. Two people with the same Moon sign will have different rising signs (Lagnas), different planetary placements, different Nakshatras, different dashas, and different family backgrounds. These factors combine to create a completely unique personality. Two Kark (Cancer) Rashis might both be nurturing and intuitive, but one might be a quiet introvert and the other a lively social caretaker.",
              },
            ].map(({ id, q, a }) => (
              <AccordionItem
                key={id}
                value={id}
                className="rounded-xl overflow-hidden"
                style={{
                  background: "oklch(0.17 0.04 24)",
                  border: "1px solid oklch(0.30 0.06 28)",
                }}
                data-ocid={`faq-${id}`}
              >
                <AccordionTrigger
                  className="px-5 py-4 font-heading font-semibold text-left hover:no-underline"
                  style={{ color: "oklch(0.85 0.06 65)" }}
                >
                  {q}
                </AccordionTrigger>
                <AccordionContent
                  className="px-5 pb-4 font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.72 0.04 65)" }}
                >
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
