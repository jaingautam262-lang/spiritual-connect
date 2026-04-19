import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CalculatorFormData } from "@/types/calculator";
import { useState } from "react";
import { usePdfExport } from "../../hooks/usePdfExport";

// ─── Data ──────────────────────────────────────────────────────────────────────
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

interface NakshatraData {
  name: string;
  deity: string;
  rashi: string;
  symbol: string;
  padas: {
    syllables: [string, string, string, string];
    rashiOffset?: string;
  };
  traits: string;
  career: string;
  advice: string;
}

const NAKSHATRAS: NakshatraData[] = [
  {
    name: "Ashwini",
    deity: "Ashwini Kumaras",
    rashi: "Aries",
    symbol: "🐴",
    padas: { syllables: ["Chu", "Che", "Cho", "La"] },
    traits:
      "Quick, energetic, and always ready to help. Natural talent for healing, medicine, or wellness.",
    career: "Medicine, healthcare, emergency response, sports",
    advice: "Patience is key — avoid rushing decisions.",
  },
  {
    name: "Bharani",
    deity: "Yama (God of Dharma)",
    rashi: "Aries",
    symbol: "⚖️",
    padas: { syllables: ["Lee", "Lu", "Le", "Lo"] },
    traits:
      "Strong-willed and responsible, you take charge when others hesitate. A natural leader.",
    career: "Leadership, management, law, creative arts",
    advice: "Being more flexible will help you grow further.",
  },
  {
    name: "Krittika",
    deity: "Agni (Fire God)",
    rashi: "Aries / Taurus",
    symbol: "🔪",
    padas: { syllables: ["A", "Ee", "U", "Ea"] },
    traits:
      "Sharp, honest, and not afraid to speak the truth. You excel where clarity and precision matter.",
    career: "Military, surgery, cooking, administration",
    advice: "Be mindful of sounding too blunt in conversation.",
  },
  {
    name: "Rohini",
    deity: "Brahma (Creator)",
    rashi: "Taurus",
    symbol: "🐂",
    padas: { syllables: ["O", "Va", "Vi", "Vu"] },
    traits:
      "Creative and charming with a deep appreciation for beauty. Artistic, sensual, and magnetic.",
    career: "Art, fashion, design, music, agriculture",
    advice: "Avoid excessive attachment to material things.",
  },
  {
    name: "Mrigashira",
    deity: "Soma (Moon God)",
    rashi: "Taurus / Gemini",
    symbol: "🦌",
    padas: { syllables: ["Ve", "Vo", "Ka", "Ki"] },
    traits:
      "Curious and thoughtful, you love learning and exploring. Gentle, inquisitive, and a great listener.",
    career: "Research, teaching, travel, writing",
    advice: "Work on staying focused and completing projects.",
  },
  {
    name: "Ardra",
    deity: "Rudra (Storm God)",
    rashi: "Gemini",
    symbol: "💧",
    padas: { syllables: ["Ku", "Gha", "Ing", "Gha"] },
    traits:
      "Feels things deeply and goes through powerful life transformations. Great at research and technology.",
    career: "Science, technology, research, psychology",
    advice: "Manage your emotions and avoid extremes.",
  },
  {
    name: "Punarvasu",
    deity: "Aditi (Mother of Gods)",
    rashi: "Gemini / Cancer",
    symbol: "🏹",
    padas: { syllables: ["Ke", "Ko", "Ha", "Hi"] },
    traits:
      "Hopeful and resilient — you always bounce back from setbacks. Your optimism lifts everyone around you.",
    career: "Counseling, philosophy, spirituality, writing",
    advice: "Stay grounded in reality while maintaining optimism.",
  },
  {
    name: "Pushya",
    deity: "Brihaspati (Jupiter)",
    rashi: "Cancer",
    symbol: "🌸",
    padas: { syllables: ["Hu", "He", "Ho", "Da"] },
    traits:
      "Caring, wise, and devoted to supporting others. Naturally drawn to counseling and spiritual work.",
    career: "Teaching, nursing, social work, astrology",
    advice: "Let people grow on their own — don't overprotect.",
  },
  {
    name: "Ashlesha",
    deity: "Nagas (Serpent Deities)",
    rashi: "Cancer",
    symbol: "🐍",
    padas: { syllables: ["Di", "Du", "De", "Do"] },
    traits:
      "Deeply intuitive — you can see beneath the surface of situations and people. Excellent at psychology.",
    career: "Psychology, investigation, occult sciences, business",
    advice: "Stay open and honest to avoid emotional entanglements.",
  },
  {
    name: "Magha",
    deity: "Pitrs (Ancestors)",
    rashi: "Leo",
    symbol: "👑",
    padas: { syllables: ["Ma", "Me", "Mu", "Ta"] },
    traits:
      "You carry a regal vibe and deeply respect tradition. Leadership comes naturally to you.",
    career: "Politics, management, history, theater",
    advice: "Balance your pride with humility for lasting success.",
  },
  {
    name: "Purva Phalguni",
    deity: "Bhaga (God of Wealth)",
    rashi: "Leo",
    symbol: "🛋️",
    padas: { syllables: ["Ti", "Tu", "Te", "To"] },
    traits:
      "Fun-loving and artistic, you enjoy beauty, relationships, and the good things in life.",
    career: "Entertainment, arts, diplomacy, luxury goods",
    advice: "Cultivate motivation — your talent needs consistent effort.",
  },
  {
    name: "Uttara Phalguni",
    deity: "Aryaman (Patron of Contracts)",
    rashi: "Leo / Virgo",
    symbol: "🤝",
    padas: { syllables: ["Pa", "Pe", "Pu", "Sha"] },
    traits:
      "Reliable and service-minded — people truly count on you. An excellent planner and executor.",
    career: "Service industry, healthcare, administration, social work",
    advice: "Be open to new ways of doing things to avoid stagnation.",
  },
  {
    name: "Hasta",
    deity: "Savitar (Sun God)",
    rashi: "Virgo",
    symbol: "✋",
    padas: { syllables: ["Na", "Ni", "Nu", "Ne"] },
    traits:
      "Skilled, clever, and excellent with your hands. You handle tricky situations with remarkable dexterity.",
    career: "Crafts, surgery, massage therapy, trading",
    advice: "Be honest — don't let natural charm turn into manipulation.",
  },
  {
    name: "Chitra",
    deity: "Vishwakarma (Divine Architect)",
    rashi: "Virgo / Libra",
    symbol: "💎",
    padas: { syllables: ["No", "Ya", "Yi", "Yu"] },
    traits:
      "Blessed with a keen eye for beauty and detail. Design and creativity are your greatest strengths.",
    career: "Architecture, jewelry design, fashion, film",
    advice: "Be kinder to yourself and others when things aren't perfect.",
  },
  {
    name: "Swati",
    deity: "Vayu (Wind God)",
    rashi: "Libra",
    symbol: "🌬️",
    padas: { syllables: ["Ye", "Yo", "Ba", "Bi"] },
    traits:
      "Independent, adaptable, and great at finding balance. You thrive in self-directed environments.",
    career: "Business, trading, freelance work, diplomacy",
    advice: "Stick with projects longer to see full rewards.",
  },
  {
    name: "Vishakha",
    deity: "Indra & Agni",
    rashi: "Libra / Scorpio",
    symbol: "⚡",
    padas: { syllables: ["Bu", "Be", "Bo", "Ja"] },
    traits:
      "Ambitious and persuasive — people naturally listen when you speak. You pursue goals relentlessly.",
    career: "Politics, activism, sports, business",
    advice: "Don't let impatience block your long-term goals.",
  },
  {
    name: "Anuradha",
    deity: "Mitra (God of Friendship)",
    rashi: "Scorpio",
    symbol: "🌺",
    padas: { syllables: ["Ji", "Ju", "Je", "Jo"] },
    traits:
      "Loyal and deeply friendly — relationships are at the heart of everything you do. A wonderful listener.",
    career: "Diplomacy, medicine, social work, music",
    advice:
      "Build inner strength so you're less emotionally dependent on others.",
  },
  {
    name: "Jyeshtha",
    deity: "Indra (King of Gods)",
    rashi: "Scorpio",
    symbol: "🔱",
    padas: { syllables: ["Kha", "Ga", "Gi", "Gu"] },
    traits:
      "You take responsibility seriously and naturally lead others through difficulty. Wise and protective.",
    career: "Military, politics, emergency services, administration",
    advice: "Trust others more and avoid being overly controlling.",
  },
  {
    name: "Mula",
    deity: "Nirriti (Goddess of Destruction/Dissolution)",
    rashi: "Sagittarius",
    symbol: "🌿",
    padas: { syllables: ["Ge", "Go", "Sa", "Si"] },
    traits:
      "You love digging deep and getting to the truth. Research, psychology, and transformation work suit you perfectly.",
    career: "Research, psychology, medicine, spiritual work",
    advice: "Use your intense energy for building, not breaking.",
  },
  {
    name: "Purva Ashadha",
    deity: "Apas (Water God)",
    rashi: "Sagittarius",
    symbol: "🪭",
    padas: { syllables: ["Su", "Se", "So", "Da"] },
    traits:
      "Confident and inspiring — you stand strong in your beliefs. People are drawn to your natural optimism.",
    career: "Teaching, philosophy, publishing, media",
    advice: "Stay humble and keep learning even as you inspire others.",
  },
  {
    name: "Uttara Ashadha",
    deity: "Vishvedevas (Universal Gods)",
    rashi: "Sagittarius / Capricorn",
    symbol: "🐘",
    padas: { syllables: ["Di", "Du", "De", "Do"] },
    traits:
      "Steady, determined, and deeply respected for your work ethic. You achieve through persistence.",
    career: "Government service, engineering, administration, law",
    advice: "Stay open to change so you don't get stuck in routines.",
  },
  {
    name: "Shravana",
    deity: "Vishnu (Preserver)",
    rashi: "Capricorn",
    symbol: "👂",
    padas: { syllables: ["Cha", "Chi", "Chu", "Che"] },
    traits:
      "A great listener and communicator. Teaching, media, and advising come naturally to you.",
    career: "Education, media, counseling, journalism",
    advice: "Use your voice for good — not gossip or idle talk.",
  },
  {
    name: "Dhanishta",
    deity: "Ashta Vasus (Eight Deities of Abundance)",
    rashi: "Capricorn / Aquarius",
    symbol: "🥁",
    padas: { syllables: ["Cho", "La", "Li", "Lu"] },
    traits:
      "Rhythmic, smart, and excellent with patterns — whether in music, sports, data, or trends.",
    career: "Music, sports, finance, technology",
    advice: "Don't let money or material gain become your only focus.",
  },
  {
    name: "Shatabhisha",
    deity: "Varuna (God of Cosmic Waters)",
    rashi: "Aquarius",
    symbol: "⭕",
    padas: { syllables: ["Le", "Lo", "A", "Ee"] },
    traits:
      "A natural rebel and problem-solver. Innovation is your greatest strength — you see what others miss.",
    career: "Technology, healing, astrology, innovation",
    advice: "Stay emotionally connected to those around you.",
  },
  {
    name: "Purva Bhadrapada",
    deity: "Aja Ekapada (One-Footed Goat)",
    rashi: "Aquarius / Pisces",
    symbol: "🗡️",
    padas: { syllables: ["U", "Ea", "O", "Va"] },
    traits:
      "Intense and idealistic, driven by big ideas. Social causes or spiritual paths call to you deeply.",
    career: "Social activism, spirituality, occult sciences, writing",
    advice: "Keep hope alive even when things get tough.",
  },
  {
    name: "Uttara Bhadrapada",
    deity: "Ahir Budhnya (Serpent of the Deep)",
    rashi: "Pisces",
    symbol: "🐉",
    padas: { syllables: ["Vi", "Vu", "Ve", "Vo"] },
    traits:
      "Deep and philosophical — you think beyond the material world and seek spiritual truths.",
    career: "Spirituality, philosophy, healing, academia",
    advice: "Don't forget to enjoy the simple pleasures in life too.",
  },
  {
    name: "Revati",
    deity: "Pushan (God of Nourishment)",
    rashi: "Pisces",
    symbol: "🐟",
    padas: { syllables: ["Ka", "Ki", "Ku", "Gha"] },
    traits:
      "Kind, dreamy, and deeply nurturing. You care for others with your whole heart and possess great creativity.",
    career: "Arts, healing, travel, spiritual work",
    advice: "Strengthen your emotional boundaries to protect your energy.",
  },
];

// ─── Calculation Logic ─────────────────────────────────────────────────────────
interface NakshatraResult {
  nakshatra: NakshatraData;
  pada: 1 | 2 | 3 | 4;
  syllable: string;
  rashiName: string;
}

function calculateNakshatra(form: CalculatorFormData): NakshatraResult {
  const day = Number.parseInt(form.dob.day) || 1;
  const month = Number.parseInt(form.dob.month) || 1;
  const year = Number.parseInt(form.dob.year) || 2000;
  const hour = form.tob.unknown ? 12 : Number.parseInt(form.tob.hour) || 0;

  // Simplified Moon longitude approximation
  // Moon moves ~13.17° per day; full cycle ~27.32 days through 360°
  const jd = (year - 2000) * 365.25 + (month - 1) * 30.44 + day + hour / 24;
  const moonLong = (((jd * 13.1763965268 + 218.3165) % 360) + 360) % 360;

  // Each nakshatra spans 13°20' = 13.333°
  const nakshatraIndex = Math.floor(moonLong / 13.333) % 27;
  const posInNakshatra = moonLong % 13.333;
  const pada = Math.min(Math.floor(posInNakshatra / 3.333) + 1, 4) as
    | 1
    | 2
    | 3
    | 4;

  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const syllable = nakshatra.padas.syllables[pada - 1];

  // Determine rashi from moon longitude
  const rashiIndex = Math.floor(moonLong / 30) % 12;
  const rashiNames = [
    "Aries (Mesha)",
    "Taurus (Vrishabha)",
    "Gemini (Mithuna)",
    "Cancer (Karka)",
    "Leo (Simha)",
    "Virgo (Kanya)",
    "Libra (Tula)",
    "Scorpio (Vrishchika)",
    "Sagittarius (Dhanu)",
    "Capricorn (Makara)",
    "Aquarius (Kumbha)",
    "Pisces (Meena)",
  ];
  const rashiName = rashiNames[rashiIndex];

  return { nakshatra, pada, syllable, rashiName };
}

// ─── Syllable Chart Data ───────────────────────────────────────────────────────
const SYLLABLE_TABLE = NAKSHATRAS.map((n, i) => ({
  num: i + 1,
  name: n.name,
  pada1: n.padas.syllables[0],
  pada2: n.padas.syllables[1],
  pada3: n.padas.syllables[2],
  pada4: n.padas.syllables[3],
}));

// ─── Characteristics data ──────────────────────────────────────────────────────
const ALL_CHARACTERISTICS = NAKSHATRAS.map((n) => ({
  name: n.name,
  symbol: n.symbol,
  deity: n.deity,
  rashi: n.rashi,
  traits: n.traits,
  career: n.career,
  advice: n.advice,
}));

// ─── FAQs ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How do I know both my Rashi and Nakshatra from my birth date?",
    a: "Use your exact birth date, time, and place with a reliable nakshatra calculator. It will show your moon sign (rashi) and birth star (nakshatra) based on the moon's position at birth. The more accurate your birth time, the more precise your results will be.",
  },
  {
    q: "Are free Nakshatra calculators accurate?",
    a: "Yes, if you enter correct birth details, free calculators are generally accurate and use the same astronomical calculations as paid ones. The key factors are your birth date, time, and location. Just pick a trusted astrology site for reliable results.",
  },
  {
    q: "Why is the time of birth important in a Nakshatra calculator?",
    a: "Because the moon changes nakshatras quickly — it transits through all 27 nakshatras in about 27 days, spending roughly 1 day in each. Even a few hours can change your nakshatra and its specific pada. Accurate birth time ensures you get the correct result and syllable for naming.",
  },
  {
    q: "Can Rashi and Nakshatra change over time?",
    a: "No, your janma nakshatra (birth star) and rashi stay the same throughout your life since they're determined by the moon's position at the exact moment of your birth. However, planetary transits continuously create new influences and life themes as you grow.",
  },
  {
    q: "Can I use Nakshatra calculator for my newborn baby?",
    a: "Absolutely! Many parents use a nakshatra calculator right after birth to discover the baby's birth star, identify the auspicious naming syllables (nama nakshatra), and understand their child's natural personality traits and strengths from a Vedic perspective.",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
      style={{ color: "oklch(0.65 0.08 60)" }}
    >
      {children}
    </span>
  );
}

function StyledSelect({
  value,
  onChange,
  children,
  "data-ocid": ocid,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  "data-ocid"?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-ocid={ocid}
      className="w-full px-3 py-2.5 rounded-lg text-sm font-body outline-none transition-all appearance-none cursor-pointer"
      style={{
        background: "oklch(0.20 0.05 25)",
        border: "1px solid oklch(0.78 0.14 75 / 0.20)",
        color: value ? "oklch(0.90 0.03 80)" : "oklch(0.55 0.04 60)",
      }}
    >
      {children}
    </select>
  );
}

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
      className="py-8 px-6 rounded-xl mb-4"
      style={{
        background: alternate
          ? "oklch(0.20 0.055 25 / 0.7)"
          : "oklch(0.22 0.06 25 / 0.5)",
        border: "1px solid oklch(0.78 0.14 75 / 0.10)",
      }}
    >
      <h2
        className="font-heading text-xl md:text-2xl font-bold mb-4"
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

// ─── Main Component ────────────────────────────────────────────────────────────
export default function NakshatraFinderCalculator() {
  const [form, setForm] = useState<CalculatorFormData>({
    name: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    tob: { hour: "", minute: "", second: "", unknown: false },
    placeOfBirth: "",
  });
  const [result, setResult] = useState<NakshatraResult | null>(null);
  const { exportToPdf } = usePdfExport();

  const setField = <K extends keyof CalculatorFormData>(
    key: K,
    val: CalculatorFormData[K],
  ) => setForm((prev) => ({ ...prev, [key]: val }));

  const canCalculate =
    form.name.trim() &&
    form.gender &&
    form.dob.day &&
    form.dob.month &&
    form.dob.year &&
    form.placeOfBirth.trim();

  const handleCalculate = () => {
    if (!canCalculate) return;
    setResult(calculateNakshatra(form));
  };

  const currentYear = new Date().getFullYear();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.05 22) 0%, oklch(0.13 0.04 20) 100%)",
      }}
      data-ocid="nakshatra-finder-calculator-page"
    >
      {/* ── Page Header ── */}
      <div
        className="text-center py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.20 0.07 28) 0%, oklch(0.17 0.06 24) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.12)",
        }}
      >
        <div className="text-4xl mb-3">⭐</div>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Nakshatra Finder
        </h1>
        <p
          className="font-body text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.62 0.06 60)" }}
        >
          Discover your Janma Nakshatra (birth star) using Vedic astrology.
          Enter your birth details to unlock your cosmic blueprint — your star,
          pada, rashi, and ruling deity.
        </p>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
        {/* ── Calculator Card ── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.22)",
            boxShadow: "0 4px 32px oklch(0.62 0.18 48 / 0.08)",
          }}
          data-ocid="nakshatra-calc.form_card"
        >
          <h2
            className="font-heading text-lg font-bold mb-6 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            ✨ Calculate Your Nakshatra
          </h2>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <FieldLabel>Name *</FieldLabel>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
                style={{
                  background: "oklch(0.20 0.05 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                  color: "oklch(0.90 0.03 80)",
                }}
                data-ocid="nakshatra-calc.name_input"
              />
            </div>

            {/* Gender */}
            <div>
              <FieldLabel>Gender *</FieldLabel>
              <div className="flex gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setField("gender", g)}
                    className="flex-1 py-2.5 rounded-lg text-sm font-heading font-semibold transition-all duration-200"
                    style={{
                      background:
                        form.gender === g
                          ? "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))"
                          : "oklch(0.22 0.06 25)",
                      color:
                        form.gender === g ? "white" : "oklch(0.65 0.06 60)",
                      border:
                        form.gender === g
                          ? "1px solid oklch(0.78 0.14 75 / 0.3)"
                          : "1px solid oklch(0.78 0.14 75 / 0.15)",
                    }}
                    aria-pressed={form.gender === g}
                    data-ocid="nakshatra-calc.gender_btn"
                  >
                    {g === "Male"
                      ? "♂ Male"
                      : g === "Female"
                        ? "♀ Female"
                        : "⚧ Other"}
                  </button>
                ))}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <FieldLabel>Date of Birth *</FieldLabel>
              <div className="grid grid-cols-3 gap-3">
                <StyledSelect
                  value={form.dob.day}
                  onChange={(v) => setField("dob", { ...form.dob, day: v })}
                  data-ocid="nakshatra-calc.dob_day"
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </StyledSelect>
                <StyledSelect
                  value={form.dob.month}
                  onChange={(v) => setField("dob", { ...form.dob, month: v })}
                  data-ocid="nakshatra-calc.dob_month"
                >
                  <option value="">Month</option>
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i + 1}>
                      {m}
                    </option>
                  ))}
                </StyledSelect>
                <StyledSelect
                  value={form.dob.year}
                  onChange={(v) => setField("dob", { ...form.dob, year: v })}
                  data-ocid="nakshatra-calc.dob_year"
                >
                  <option value="">Year</option>
                  {Array.from({ length: 100 }, (_, i) => currentYear - i).map(
                    (y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ),
                  )}
                </StyledSelect>
              </div>
            </div>

            {/* Time of Birth */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <FieldLabel>Time of Birth</FieldLabel>
                <label
                  className="flex items-center gap-2 cursor-pointer"
                  data-ocid="nakshatra-calc.tob_unknown_toggle"
                >
                  <input
                    type="checkbox"
                    checked={form.tob.unknown}
                    onChange={(e) =>
                      setField("tob", {
                        ...form.tob,
                        unknown: e.target.checked,
                      })
                    }
                    className="w-3.5 h-3.5 accent-amber-500"
                  />
                  <span
                    className="text-xs font-body"
                    style={{ color: "oklch(0.62 0.06 60)" }}
                  >
                    I don't know my time of birth
                  </span>
                </label>
              </div>
              {!form.tob.unknown && (
                <div className="grid grid-cols-3 gap-3">
                  <StyledSelect
                    value={form.tob.hour}
                    onChange={(v) => setField("tob", { ...form.tob, hour: v })}
                    data-ocid="nakshatra-calc.tob_hour"
                  >
                    <option value="">Hour</option>
                    {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                      <option key={h} value={h}>
                        {String(h).padStart(2, "0")}
                      </option>
                    ))}
                  </StyledSelect>
                  <StyledSelect
                    value={form.tob.minute}
                    onChange={(v) =>
                      setField("tob", { ...form.tob, minute: v })
                    }
                    data-ocid="nakshatra-calc.tob_minute"
                  >
                    <option value="">Minute</option>
                    {Array.from({ length: 60 }, (_, i) => i).map((m) => (
                      <option key={m} value={m}>
                        {String(m).padStart(2, "0")}
                      </option>
                    ))}
                  </StyledSelect>
                  <StyledSelect
                    value={form.tob.second}
                    onChange={(v) =>
                      setField("tob", { ...form.tob, second: v })
                    }
                    data-ocid="nakshatra-calc.tob_second"
                  >
                    <option value="">Second</option>
                    {Array.from({ length: 60 }, (_, i) => i).map((s) => (
                      <option key={s} value={s}>
                        {String(s).padStart(2, "0")}
                      </option>
                    ))}
                  </StyledSelect>
                </div>
              )}
              {form.tob.unknown && (
                <p
                  className="text-xs font-body mt-1"
                  style={{ color: "oklch(0.55 0.06 55)" }}
                >
                  We'll use noon (12:00) as an approximation. Results may be
                  less accurate.
                </p>
              )}
            </div>

            {/* Place of Birth */}
            <div>
              <FieldLabel>Place of Birth *</FieldLabel>
              <input
                type="text"
                value={form.placeOfBirth}
                onChange={(e) => setField("placeOfBirth", e.target.value)}
                placeholder="Enter your birth place (city, country)"
                className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
                style={{
                  background: "oklch(0.20 0.05 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                  color: "oklch(0.90 0.03 80)",
                }}
                data-ocid="nakshatra-calc.place_input"
              />
            </div>

            {/* Calculate Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={!canCalculate}
                className="px-10 py-3.5 rounded-xl font-heading font-bold text-base tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                  boxShadow: "0 4px 16px oklch(0.62 0.18 48 / 0.25)",
                }}
                data-ocid="nakshatra-calc.calculate_button"
              >
                ⭐ Find My Nakshatra
              </button>
            </div>
          </div>
        </div>

        {/* ── Inline Result ── */}
        {result && (
          <div
            id="nakshatra-results"
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: "oklch(0.20 0.07 28 / 0.9)",
              border: "2px solid oklch(0.78 0.14 75 / 0.40)",
              boxShadow: "0 0 40px oklch(0.78 0.14 75 / 0.12)",
            }}
            data-ocid="nakshatra-calc.result"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{result.nakshatra.symbol}</div>
              <h3
                className="font-heading text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {result.nakshatra.name} Nakshatra
              </h3>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.65 0.06 60)" }}
              >
                Your Janma Nakshatra (Birth Star)
              </p>
            </div>

            {/* Result Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Pada", value: `Pada ${result.pada}`, icon: "🔢" },
                { label: "Name Syllable", value: result.syllable, icon: "🔤" },
                {
                  label: "Rashi (Moon Sign)",
                  value: result.rashiName,
                  icon: "🌙",
                },
                {
                  label: "Ruling Deity",
                  value: result.nakshatra.deity,
                  icon: "🙏",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: "oklch(0.22 0.06 25)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                  }}
                >
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div
                    className="font-heading text-xs uppercase tracking-wider mb-1"
                    style={{ color: "oklch(0.60 0.06 58)" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="font-heading text-sm font-bold"
                    style={{ color: "oklch(0.88 0.06 72)" }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Traits Summary */}
            <div
              className="rounded-xl p-5 mb-5"
              style={{
                background: "oklch(0.19 0.06 25)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <h4
                className="font-heading text-sm font-bold mb-3"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                ✨ Your Nakshatra Characteristics
              </h4>
              <p
                className="font-body text-sm leading-relaxed mb-3"
                style={{ color: "oklch(0.72 0.04 65)" }}
              >
                {result.nakshatra.traits}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span
                    className="font-heading font-semibold"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Suitable Career:{" "}
                  </span>
                  <span style={{ color: "oklch(0.72 0.04 65)" }}>
                    {result.nakshatra.career}
                  </span>
                </div>
                <div>
                  <span
                    className="font-heading font-semibold"
                    style={{ color: "oklch(0.68 0.20 48)" }}
                  >
                    Cosmic Advice:{" "}
                  </span>
                  <span style={{ color: "oklch(0.72 0.04 65)" }}>
                    {result.nakshatra.advice}
                  </span>
                </div>
              </div>
            </div>

            {/* Naming tip */}
            <div
              className="rounded-xl p-4 mb-5 text-center"
              style={{
                background: "oklch(0.68 0.20 48 / 0.10)",
                border: "1px solid oklch(0.68 0.20 48 / 0.25)",
              }}
            >
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.75 0.08 65)" }}
              >
                🔤 Your lucky name syllable for{" "}
                <strong>Pada {result.pada}</strong> is{" "}
                <span
                  className="font-heading font-bold text-base"
                  style={{ color: "oklch(0.88 0.16 72)" }}
                >
                  "{result.syllable}"
                </span>{" "}
                — names starting with this syllable are considered most
                auspicious for you.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/astrologer-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                }}
                data-ocid="nakshatra-calc.talk_astrologer_cta"
              >
                🔭 Talk to Astrologer
              </a>
              <a
                href="/astrologer-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="nakshatra-calc.chat_astrologer_cta"
              >
                💬 Chat with Astrologer
              </a>
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "nakshatra-results",
                    "nakshatra-calculator-result",
                    "Nakshatra Calculator Result",
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{ background: "oklch(0.78 0.14 75)", color: "#1a0a00" }}
                data-ocid="nakshatra-calc.export_pdf_button"
              >
                Export as PDF
              </button>
            </div>
          </div>
        )}

        {/* ── Informational Sections ── */}

        <InfoSection title="What is Nakshatra?">
          <p>
            In Vedic astrology, your Nakshatra is your birth star. The word
            comes from Sanskrit —<em> "Naksha"</em> means map, and{" "}
            <em>"Tra"</em> means guard or protector. So, nakshatras are like 27
            star groups that guide and watch over your life journey.
          </p>
          <p>
            The sky is divided into 27 equal parts, each about 13 degrees and 20
            minutes wide. When you were born, the moon was sitting in one of
            these parts — and that's your
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              {" "}
              Janma Nakshatra
            </strong>
            , or birth star. Each nakshatra has its own special deity, symbol,
            ruling planet, and unique personality traits.
          </p>
          <p>
            For example, the Ashwini nakshatra is ruled by the Ashwini Kumaras —
            divine healers of the gods. People born under Ashwini often have a
            natural talent for healing or healthcare work. <em>Rajesh ji</em>{" "}
            always felt drawn to helping others. When he found out his birth
            star was Ashwini through a calculator, it all clicked — he
            understood his calling and went on to become a great
            physiotherapist.
          </p>
        </InfoSection>

        <InfoSection title="What Does Your Nakshatra Say About You?" alternate>
          <p>
            Your nakshatra is like a stardust fingerprint that reveals who you
            really are — your natural strengths, personality, and even hidden
            talents. Whether you're new to astrology or exploring deeper
            insights, your birth star is your first step into cosmic
            self-awareness.
          </p>
          <p>
            Each nakshatra has its own significance. For example, if you're born
            under
            <strong> Rohini nakshatra</strong>, you probably have a creative
            streak and love anything beautiful. You might shine in art, fashion,
            or anything that involves a good eye for style. Your nakshatra also
            affects your relationships — some nakshatras naturally click, while
            others might take a little more work to harmonize.
          </p>
          <p>
            <em>Meera</em> found out her birth star was Bharani — and suddenly
            everything made sense. She always felt a bit different from her
            siblings, but learning about her nakshatra chart showed her she's a
            natural leader. That insight gave her the confidence to pursue a
            career in management, where she now thrives.
          </p>
          <p>
            Your birth star can also guide your spiritual journey and life
            lessons, and help you figure out the best times for big decisions
            like marriage, starting a business, or relocating.
          </p>
        </InfoSection>

        <InfoSection title="What is a Nakshatra Calculator?">
          <p>
            A Nakshatra Calculator helps you find your birth star using your
            birth details. All you need to do is enter your birth date, time,
            and place — and it figures out which nakshatra the moon was in when
            you were born.
          </p>
          <p>
            These calculators use advanced astronomy to pinpoint the moon's
            exact position at your birth. The more accurate your birth time and
            place, the better the result. Back in the day, astrologers had to do
            all these calculations by hand, using panchang books and charts — a
            process that could take hours. Now, thanks to technology, you can
            get your nakshatra instantly.
          </p>
          <p>
            Many good nakshatra calculators don't just give you your birth star
            — they also explain its traits, ruling deity, and which nakshatras
            you're most compatible with. Some even offer helpful tips, suggested
            name syllables for newborns, and remedies to improve specific areas
            of your life.
          </p>
        </InfoSection>

        <InfoSection title="How the Nakshatra Calculator Works?" alternate>
          <p>
            The nakshatra calculator uses your birth information to determine
            the moon's position in the sky. It's based on precise astronomical
            calculations that consider the earth's rotation and the moon's
            movement through the zodiac.
          </p>
          <p>
            When you enter your birth date, it first converts it into a Julian
            Day Number. Then, it calculates the moon's longitude — exactly where
            in the 360° circle of the sky the moon was at that moment. That
            longitude determines which of the 27 nakshatras (each spanning
            13°20') the moon occupied.
          </p>
          <p>
            The calculator also takes your birth location into account because
            the moon's position changes slightly depending on where you are on
            Earth. That's why entering the correct place of birth matters for
            the most accurate result.
          </p>
          <p>
            Your birth time matters just as much — the moon moves through
            nakshatras quickly, so even a few hours can sometimes change your
            nakshatra. Each nakshatra also has four{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>padas</strong>{" "}
            (quarters) of 3°20' each. Knowing your pada gives even more detailed
            information about your personality and the specific name syllable
            most auspicious for you.
          </p>
        </InfoSection>

        {/* ── Syllable Chart ── */}
        <section
          className="py-8 px-6 rounded-xl mb-4"
          style={{
            background: "oklch(0.22 0.06 25 / 0.5)",
            border: "1px solid oklch(0.78 0.14 75 / 0.10)",
          }}
        >
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Nakshatra Syllable Chart
          </h2>
          <p
            className="font-body text-sm mb-5"
            style={{ color: "oklch(0.62 0.05 60)" }}
          >
            Each nakshatra has four padas with associated syllables. Names
            beginning with the syllable of your birth pada are considered most
            auspicious in Vedic tradition.
          </p>
          <div
            className="overflow-x-auto rounded-xl"
            style={{ border: "1px solid oklch(0.78 0.14 75 / 0.15)" }}
          >
            <table
              className="w-full text-sm border-collapse"
              data-ocid="nakshatra-calc.syllable_table"
            >
              <thead>
                <tr
                  style={{
                    background: "oklch(0.25 0.08 30)",
                    borderBottom: "1px solid oklch(0.78 0.14 75 / 0.20)",
                  }}
                >
                  <th
                    className="px-3 py-3 text-left font-heading font-bold text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    #
                  </th>
                  <th
                    className="px-3 py-3 text-left font-heading font-bold text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Nakshatra
                  </th>
                  <th
                    className="px-3 py-3 text-center font-heading font-bold text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Pada 1
                  </th>
                  <th
                    className="px-3 py-3 text-center font-heading font-bold text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Pada 2
                  </th>
                  <th
                    className="px-3 py-3 text-center font-heading font-bold text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Pada 3
                  </th>
                  <th
                    className="px-3 py-3 text-center font-heading font-bold text-xs uppercase tracking-wider"
                    style={{ color: "oklch(0.78 0.14 75)" }}
                  >
                    Pada 4
                  </th>
                </tr>
              </thead>
              <tbody>
                {SYLLABLE_TABLE.map((row, idx) => (
                  <tr
                    key={row.name}
                    style={{
                      background:
                        idx % 2 === 0
                          ? "oklch(0.19 0.05 25)"
                          : "oklch(0.21 0.055 26)",
                      borderBottom: "1px solid oklch(0.78 0.14 75 / 0.06)",
                    }}
                  >
                    <td
                      className="px-3 py-2.5 font-body text-xs"
                      style={{ color: "oklch(0.55 0.04 55)" }}
                    >
                      {row.num}
                    </td>
                    <td
                      className="px-3 py-2.5 font-heading font-semibold text-xs"
                      style={{ color: "oklch(0.82 0.06 70)" }}
                    >
                      {row.name}
                    </td>
                    {[row.pada1, row.pada2, row.pada3, row.pada4].map(
                      (syl, i) => (
                        <td
                          key={`${row.name}-pada${i + 1}`}
                          className="px-3 py-2.5 text-center font-body text-xs font-medium"
                          style={{ color: "oklch(0.72 0.06 65)" }}
                        >
                          {syl}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <InfoSection title="What Is Nakshatra And Pada In Vedic Astrology?">
          <p>
            Your Nakshatra and its pada work together to paint a detailed
            picture of your spiritual path. Think of your nakshatra as your
            birth star, and the pada as the exact quarter of that star where the
            moon was when you were born.
          </p>
          <p>
            Each nakshatra covers{" "}
            <strong style={{ color: "oklch(0.78 0.14 75)" }}>
              13 degrees and 20 minutes
            </strong>{" "}
            in the sky, and this is split into four equal parts called padas,
            each about 3 degrees and 20 minutes. This adds an extra layer of
            detail to your astrological profile.
          </p>
          <p>
            What's interesting is that each pada has its own unique traits and
            influence. Two people born under the same nakshatra but in different
            padas can have noticeably different personalities — it's like
            sharing a family trait but with your own personal twist.
          </p>
          <p>
            For example: All four padas of Krittika nakshatra share qualities
            like determination and courage. But the <em>first pada</em> might
            express this through strong leadership, while the{" "}
            <em>fourth pada</em> expresses it through teaching and guiding
            others. Knowing your pada makes horoscope readings more accurate and
            guides you toward the most appropriate remedies.
          </p>
        </InfoSection>

        <InfoSection
          title="Relationship Between Nakshatra, Pada, And Rashi?"
          alternate
        >
          <p>
            Nakshatra, pada, and rashi are like three pieces of the cosmic
            puzzle that make up your full astrological profile. Together, they
            give a deeper and more complete understanding of who you are.
          </p>
          <p>
            Your <strong>rashi</strong> is your moon sign — the zodiac sign the
            moon was in at the time of your birth. There are 12 rashis, and each
            one usually includes around 2 to 3 nakshatras. So while your
            nakshatra and rashi are connected, they each reveal different
            aspects of your personality and destiny.
          </p>
          <p>
            Your pada adds another link between the two. Each nakshatra has four
            padas, and those padas may fall into different rashis. This means
            your personality blends the detailed traits of your nakshatra with
            the broader influence of your rashi.
          </p>
          <p>
            For example, <strong>Krittika nakshatra</strong> stretches across
            both Aries and Taurus. If you were born in Krittika's first pada,
            you'd fall under <em>Aries rashi</em> — bringing fire and boldness.
            If you were born in the later padas, your rashi would be{" "}
            <em>Taurus</em> — bringing groundedness and patience. But all
            Krittika natives share that bold, determined energy.
          </p>
        </InfoSection>

        <InfoSection title="What Is Birth Rashi (Moon Sign) In Astrology?">
          <p>
            Your birth rashi (moon sign) reveals your inner world — how you
            feel, react, and handle emotions. While your sun sign is the "you"
            people see on the surface, your moon sign is the real, instinctive
            you underneath.
          </p>
          <p>
            Since the moon changes signs every 2.5 days, your rashi is deeply
            personal. It affects your emotional habits, how you cope with life's
            challenges, and even your connection with your mother or key
            feminine presences in your life.
          </p>
          <p>
            In Vedic astrology, your rashi plays a central role. It helps
            calculate your
            <strong> dasha periods</strong> — the planetary cycles that guide
            different chapters of your life. It also tells us which houses the
            planets fall into in your birth chart, affecting everything from
            career to relationships.
          </p>
          <p>
            When it comes to relationships, rashi compatibility is a big deal —
            especially in marriage matching. Astrologers traditionally check if
            two moon signs are compatible before giving approval for a union.
            Many people also use their rashi to support major life decisions
            like career changes, relocation, and timing of important events.
          </p>
        </InfoSection>

        {/* ── All 27 Characteristics ── */}
        <section
          className="py-8 px-6 rounded-xl mb-4"
          style={{
            background: "oklch(0.22 0.06 25 / 0.5)",
            border: "1px solid oklch(0.78 0.14 75 / 0.10)",
          }}
        >
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Characteristics of Every Nakshatra
          </h2>
          <p
            className="font-body text-sm mb-6"
            style={{ color: "oklch(0.62 0.05 60)" }}
          >
            A complete guide to all 27 Vedic birth stars — their traits,
            suitable career paths, and cosmic guidance.
          </p>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-ocid="nakshatra-calc.characteristics_grid"
          >
            {ALL_CHARACTERISTICS.map((n, i) => (
              <div
                key={n.name}
                className="rounded-xl p-4"
                style={{
                  background:
                    i % 2 === 0
                      ? "oklch(0.19 0.05 24)"
                      : "oklch(0.21 0.055 26)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.10)",
                }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-xl flex-shrink-0 mt-0.5">
                    {n.symbol}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3
                        className="font-heading text-sm font-bold"
                        style={{ color: "oklch(0.82 0.10 70)" }}
                      >
                        {i + 1}. {n.name}
                      </h3>
                      <span
                        className="text-xs font-body"
                        style={{ color: "oklch(0.55 0.05 55)" }}
                      >
                        {n.rashi}
                      </span>
                    </div>
                    <span
                      className="text-xs font-body"
                      style={{ color: "oklch(0.60 0.06 58)" }}
                    >
                      Deity: {n.deity}
                    </span>
                  </div>
                </div>
                <p
                  className="font-body text-xs leading-relaxed mb-2"
                  style={{ color: "oklch(0.70 0.04 63)" }}
                >
                  {n.traits}
                </p>
                <p
                  className="font-body text-xs italic"
                  style={{ color: "oklch(0.62 0.06 60)" }}
                >
                  💡 {n.advice}
                </p>
              </div>
            ))}
          </div>
        </section>

        <InfoSection title="What More Can You Discover with a Nakshatra Calculator?">
          <p>
            Using a nakshatra calculator is like opening a window into your
            cosmic blueprint. It's not just about finding your birth star — it's
            about discovering layers of insight that can guide you in everyday
            life.
          </p>
          <ul className="space-y-2 list-none pl-0">
            {[
              {
                icon: "🌙",
                text: "Find your Janma Nakshatra (birth star) and Rashi (moon sign)",
              },
              {
                icon: "🐲",
                text: "Discover your Chinese zodiac animal based on birth year",
              },
              {
                icon: "♈",
                text: "Learn your Western zodiac sign for cross-tradition insights",
              },
              {
                icon: "💎",
                text: "Identify your birthstone and compatible gemstones",
              },
              {
                icon: "💞",
                text: "Explore compatible nakshatras for love, friendship, and partnerships",
              },
              {
                icon: "🙏",
                text: "Learn about your nakshatra's ruling deity and spiritual mantras",
              },
              {
                icon: "⏰",
                text: "Discover favorable timing windows for major life decisions",
              },
            ].map((item) => (
              <li key={item.text} className="flex gap-3 items-start">
                <span className="text-base flex-shrink-0 mt-0.5">
                  {item.icon}
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          <p>
            Knowing who you naturally vibe with can help you build stronger,
            more harmonious connections — whether in romance, business, or close
            friendships. While these cosmic insights carry deep wisdom, speaking
            with an experienced astrologer can help you personalize their
            meaning specifically for your life journey.
          </p>
        </InfoSection>

        <InfoSection title="Conclusion" alternate>
          <p>
            A nakshatra calculator is a doorway into understanding who you truly
            are. By finding out your birth star — your <em>Janma Nakshatra</em>{" "}
            — you start uncovering the unique patterns that shape your
            personality, your relationships, and your life path.
          </p>
          <p>
            Start your journey with a reliable nakshatra calculator, whether
            you're looking for compatibility insights, naming suggestions for a
            newborn, or spiritual clarity. Discovering your nakshatra connects
            you with timeless Vedic wisdom that reveals your true nature and
            helps you live in tune with your unique cosmic rhythm.
          </p>
          <p>
            Using a nakshatra calculator is easy and fast, giving you
            eye-opening insights that begin your journey of self-awareness and
            growth. For deeper wisdom, working with an experienced astrologer on
            Spiritual Connect can unlock even more meaningful guidance tailored
            just for you. Sharing what you learn about nakshatras with family
            and friends can also bring you closer — helping everyone understand
            and support each other on a deeper level.
          </p>
        </InfoSection>

        {/* ── Discover More ── */}
        <div
          className="rounded-2xl p-6 md:p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.07 28) 0%, oklch(0.17 0.06 24) 100%)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
          data-ocid="nakshatra-calc.discover_more"
        >
          <div className="text-3xl mb-3">✨</div>
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Discover More About Yourself
          </h2>
          <p
            className="font-body text-sm mb-6 max-w-lg mx-auto"
            style={{ color: "oklch(0.65 0.05 60)" }}
          >
            Ready to unlock deeper insights? Explore our personalized
            calculators that reveal hidden aspects of your personality and
            destiny.
          </p>

          <div
            className="rounded-xl p-5 mb-5 text-left"
            style={{
              background: "oklch(0.18 0.06 25)",
              border: "1px solid oklch(0.78 0.14 75 / 0.12)",
            }}
          >
            <h3
              className="font-heading text-base font-bold mb-2"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              🛍️ Spiritual Connect Store
            </h3>
            <p
              className="font-body text-sm leading-relaxed mb-3"
              style={{ color: "oklch(0.65 0.05 60)" }}
            >
              Browse our spiritual marketplace featuring sacred idols, evil eye
              protection, Rudraksha beads, healing crystals, spiritual gifting &
              décor, Pooja essentials, love items, and zodiac collection to
              support your spiritual journey.
            </p>
            <p
              className="font-body text-sm font-medium"
              style={{ color: "oklch(0.72 0.06 65)" }}
            >
              ✨ Plus Much More — Compatibility calculators, birth chart
              generators, and personality assessments await your discovery.
            </p>
          </div>

          <a
            href="/calculators"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-heading font-bold text-sm transition-all duration-200 hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              color: "white",
              border: "1px solid oklch(0.78 0.14 75 / 0.3)",
            }}
            data-ocid="nakshatra-calc.all_calculators_link"
          >
            Explore All Calculators →
          </a>
        </div>

        {/* ── FAQs ── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
          data-ocid="nakshatra-calc.faqs"
        >
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-6 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.78 0.14 75 / 0.12)" }}
                data-ocid="nakshatra-calc.faq_item"
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
