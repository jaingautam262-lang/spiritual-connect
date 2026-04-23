import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

// ─── Archetype data ───────────────────────────────────────────────────────────
interface Archetype {
  planet: string;
  name: string;
  tagline: string;
  desc: string;
  fields: string[];
  color: string;
  icon: string;
}

const archetypes: Record<string, Archetype> = {
  Sun: {
    planet: "Sun",
    name: "Leadership & Government",
    tagline: "Born to lead, built to inspire",
    desc: "Your 10th house lord is the Sun — planet of authority, visibility, and power. You're drawn to roles where you set direction and earn respect. Government service, executive leadership, politics, administration, and public-facing careers align with your soul's purpose.",
    fields: [
      "Government / IAS / IPS",
      "CEO / Executive Leadership",
      "Politics & Public Administration",
      "Medicine (Surgery / Senior roles)",
    ],
    color: "oklch(0.78 0.18 55)",
    icon: "☀",
  },
  Moon: {
    planet: "Moon",
    name: "Healing & Hospitality",
    tagline: "Nurture is your superpower",
    desc: "Your 10th lord is the Moon — planet of empathy, care, and emotional intelligence. You excel in roles that involve nurturing others: healthcare, counselling, hospitality, food, and the public sector. Your career path thrives on human connection.",
    fields: [
      "Healthcare & Nursing",
      "Counselling & Psychology",
      "Hotels & Hospitality",
      "Food & Nutrition",
      "Social Work",
    ],
    color: "oklch(0.78 0.10 240)",
    icon: "☽",
  },
  Mars: {
    planet: "Mars",
    name: "Engineering & Military",
    tagline: "Precision, courage, and execution",
    desc: "Your 10th lord is Mars — planet of action, courage, and drive. You're wired for high-stakes environments that demand decisiveness. Engineering, defence, sports, real estate, and entrepreneurship are your natural domains.",
    fields: [
      "Engineering & Manufacturing",
      "Military / Police / Defence",
      "Sports & Athletics",
      "Real Estate & Construction",
      "Entrepreneurship",
    ],
    color: "oklch(0.65 0.22 25)",
    icon: "♂",
  },
  Mercury: {
    planet: "Mercury",
    name: "Communication & Business",
    tagline: "Words and numbers are your currency",
    desc: "Your 10th lord is Mercury — planet of intellect, communication, and trade. You thrive in fast-moving, analytical environments. Business, media, writing, finance, technology, and consulting suit your quick and versatile mind.",
    fields: [
      "Business & Commerce",
      "Media & Journalism",
      "Finance & Accounting",
      "Technology & Software",
      "Consulting & Advisory",
    ],
    color: "oklch(0.78 0.14 145)",
    icon: "☿",
  },
  Jupiter: {
    planet: "Jupiter",
    name: "Teaching & Finance",
    tagline: "Wisdom is your legacy",
    desc: "Your 10th lord is Jupiter — planet of wisdom, expansion, and dharma. You're drawn to roles that involve knowledge transfer, ethics, and growth. Teaching, law, banking, philosophy, and spiritual leadership align with your calling.",
    fields: [
      "Education & Academia",
      "Law & Judiciary",
      "Banking & Finance",
      "Consulting & Coaching",
      "Spirituality & Philosophy",
    ],
    color: "oklch(0.78 0.16 80)",
    icon: "♃",
  },
  Venus: {
    planet: "Venus",
    name: "Arts & Luxury",
    tagline: "Beauty is your calling",
    desc: "Your 10th lord is Venus — planet of beauty, creativity, and refinement. You're gifted for careers that create pleasure and aesthetic value. Fashion, film, music, architecture, luxury brands, and diplomacy let your talents flourish.",
    fields: [
      "Arts, Fashion & Film",
      "Music & Performing Arts",
      "Architecture & Interior Design",
      "Luxury Brands & Beauty",
      "Diplomacy & Relations",
    ],
    color: "oklch(0.72 0.18 340)",
    icon: "♀",
  },
  Saturn: {
    planet: "Saturn",
    name: "Labor & Justice",
    tagline: "Discipline builds empires",
    desc: "Your 10th lord is Saturn — planet of discipline, structure, and karma. Your success comes through persistence and mastery. Law, labour relations, engineering, social reform, and long-term institutional work are paths where you'll build lasting impact.",
    fields: [
      "Law & Judiciary",
      "Civil Engineering & Infrastructure",
      "Social Reform & NGOs",
      "Labour & Trade Unions",
      "Government Services",
    ],
    color: "oklch(0.60 0.08 240)",
    icon: "♄",
  },
  Rahu: {
    planet: "Rahu",
    name: "Technology & Innovation",
    tagline: "Disrupt, innovate, transform",
    desc: "Your 10th lord dispositor points toward Rahu — the planet of innovation, technology, and unconventional success. You're drawn to cutting-edge fields: tech, startups, digital media, foreign collaborations, and industries that didn't exist a decade ago.",
    fields: [
      "Technology & AI / Machine Learning",
      "Startups & Venture",
      "Digital Media & Content",
      "International Business",
      "Research & Disruption",
    ],
    color: "oklch(0.70 0.12 280)",
    icon: "☊",
  },
  Ketu: {
    planet: "Ketu",
    name: "Spirituality & Research",
    tagline: "Truth-seeker, depth-finder",
    desc: "Your 10th lord dispositor points toward Ketu — the planet of liberation, mysticism, and deep research. You're drawn to the unseen and the profound. Spirituality, occult sciences, academic research, healing arts, and investigative work align with your path.",
    fields: [
      "Spiritual Teaching & Healing",
      "Occult Sciences & Astrology",
      "Academic Research & Philosophy",
      "Investigation & Forensics",
      "Medicine & Alternative Therapies",
    ],
    color: "oklch(0.68 0.14 190)",
    icon: "☋",
  },
};

// ─── Simplified 10th lord calculation ────────────────────────────────────────
// Uses birth month to determine approximate Lagna, then 10th house lord

const lagnaFromMonth: Record<number, string> = {
  1: "Capricorn",
  2: "Aquarius",
  3: "Pisces",
  4: "Aries",
  5: "Taurus",
  6: "Gemini",
  7: "Cancer",
  8: "Leo",
  9: "Virgo",
  10: "Libra",
  11: "Scorpio",
  12: "Sagittarius",
};

const signLords: Record<string, string> = {
  Aries: "Mars",
  Taurus: "Venus",
  Gemini: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Virgo: "Mercury",
  Libra: "Venus",
  Scorpio: "Mars",
  Sagittarius: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Saturn",
  Pisces: "Jupiter",
};

const signOrder = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

function get10thLordPlanet(birthDate: string): string {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const lagna = lagnaFromMonth[month] ?? "Aries";
  const lagnaIdx = signOrder.indexOf(lagna);
  const tenthSignIdx = (lagnaIdx + 9) % 12;
  const tenthSign = signOrder[tenthSignIdx];
  // Rahu/Ketu: use birth year for variation
  const year = date.getFullYear();
  const planet = signLords[tenthSign];
  // For Scorpio/Taurus lagna, optionally modulate to Rahu/Ketu
  if (year % 19 < 2 && planet === "Saturn") return "Rahu";
  if (year % 19 < 2 && planet === "Jupiter") return "Ketu";
  return planet;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CareerPathCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [result, setResult] = useState<Archetype | null>(null);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    document.title = "Career & Life Path Calculator — Spiritual Connect";
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const planet = get10thLordPlanet(birthDate);
    setResult(archetypes[planet] ?? archetypes.Sun);
    setCalculated(true);
  };

  const handleReset = () => {
    setBirthDate("");
    setBirthTime("");
    setBirthPlace("");
    setResult(null);
    setCalculated(false);
  };

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.05 22) 0%, oklch(0.13 0.03 20) 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="text-3xl block mb-4"
            style={{ color: "oklch(0.68 0.20 48)" }}
            aria-hidden="true"
          >
            ⬡
          </span>
          <h1
            className="font-heading font-bold text-3xl md:text-4xl mb-3"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.14 70), oklch(0.68 0.20 48))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Career & Life Path
          </h1>
          <p
            className="font-body text-sm md:text-base leading-relaxed max-w-md mx-auto"
            style={{ color: "oklch(0.62 0.06 58)" }}
          >
            Your 10th house lord reveals the direction your soul came here to
            work in. Enter your birth details for instant clarity.
          </p>
        </div>

        {/* Form */}
        {!calculated && (
          <form
            onSubmit={handleCalculate}
            className="rounded-2xl p-7 flex flex-col gap-5"
            style={{
              background: "oklch(0.21 0.07 28)",
              border: "1px solid oklch(0.78 0.14 75 / 0.18)",
            }}
            data-ocid="career_calc.form"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="birthDate"
                className="font-heading text-xs font-semibold uppercase tracking-wide"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Date of Birth{" "}
                <span style={{ color: "oklch(0.68 0.20 48)" }}>*</span>
              </label>
              <input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all"
                style={{
                  background: "oklch(0.17 0.05 22)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                  color: "oklch(0.88 0.04 75)",
                  colorScheme: "dark",
                }}
                data-ocid="career_calc.birth_date_input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="birthTime"
                className="font-heading text-xs font-semibold uppercase tracking-wide"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Birth Time{" "}
                <span
                  className="font-body normal-case font-normal text-xs"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  (optional — improves accuracy)
                </span>
              </label>
              <input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all"
                style={{
                  background: "oklch(0.17 0.05 22)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                  color: "oklch(0.88 0.04 75)",
                  colorScheme: "dark",
                }}
                data-ocid="career_calc.birth_time_input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="birthPlace"
                className="font-heading text-xs font-semibold uppercase tracking-wide"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                Birth Place{" "}
                <span
                  className="font-body normal-case font-normal text-xs"
                  style={{ color: "oklch(0.55 0.04 50)" }}
                >
                  (optional)
                </span>
              </label>
              <input
                id="birthPlace"
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="e.g. Mumbai, India"
                className="w-full px-4 py-3 rounded-xl text-sm font-body outline-none transition-all placeholder:opacity-40"
                style={{
                  background: "oklch(0.17 0.05 22)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.20)",
                  color: "oklch(0.88 0.04 75)",
                }}
                data-ocid="career_calc.birth_place_input"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-xl mt-2"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
                boxShadow: "0 4px 16px oklch(0.68 0.20 48 / 0.30)",
              }}
              data-ocid="career_calc.submit_button"
            >
              Reveal My Career Path →
            </button>
          </form>
        )}

        {/* Result */}
        {calculated && result && (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid oklch(0.78 0.14 75 / 0.18)" }}
            data-ocid="career_calc.result_section"
          >
            {/* Result header */}
            <div
              className="px-7 py-6 text-center"
              style={{
                background: `radial-gradient(ellipse 100% 100% at 50% 0%, ${result.color.replace(")", " / 0.18)")} 0%, oklch(0.22 0.07 28) 100%)`,
              }}
            >
              <span
                className="text-4xl block mb-3"
                style={{ color: result.color }}
                aria-hidden="true"
              >
                {result.icon}
              </span>
              <p
                className="font-heading text-xs font-bold uppercase tracking-widest mb-1"
                style={{ color: result.color }}
              >
                Your 10th House Lord: {result.planet}
              </p>
              <h2
                className="font-heading font-bold text-2xl md:text-3xl mb-2"
                style={{ color: "oklch(0.92 0.08 72)" }}
              >
                {result.name}
              </h2>
              <p
                className="font-body text-sm italic"
                style={{ color: "oklch(0.70 0.06 62)" }}
              >
                "{result.tagline}"
              </p>
            </div>

            <div
              className="px-7 py-6 flex flex-col gap-6"
              style={{ background: "oklch(0.21 0.07 28)" }}
            >
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.68 0.06 60)" }}
              >
                {result.desc}
              </p>

              {/* Career fields */}
              <div>
                <p
                  className="font-heading text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: result.color }}
                >
                  Top Career Domains
                </p>
                <div className="flex flex-col gap-2">
                  {result.fields.map((field) => (
                    <div
                      key={field}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                      style={{
                        background: "oklch(0.18 0.05 22)",
                        border: `1px solid ${result.color.replace(")", " / 0.20)")}`,
                      }}
                    >
                      <span style={{ color: result.color }} aria-hidden="true">
                        ✦
                      </span>
                      <span
                        className="font-body text-sm"
                        style={{ color: "oklch(0.78 0.06 65)" }}
                      >
                        {field}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 pt-2">
                <Link
                  to="/reports"
                  className="w-full py-3.5 rounded-xl font-heading font-bold text-sm transition-all duration-200 hover:opacity-90 text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                    color: "white",
                    boxShadow: "0 4px 16px oklch(0.68 0.20 48 / 0.30)",
                  }}
                  data-ocid="career_calc.get_full_report_button"
                >
                  Get Your Full Career Report →
                </Link>
                <Link
                  to="/book-consultation"
                  className="w-full py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:bg-white/10 text-center"
                  style={{
                    border: "1px solid oklch(0.78 0.14 75 / 0.25)",
                    color: "oklch(0.78 0.14 75)",
                  }}
                  data-ocid="career_calc.consult_button"
                >
                  Consult an Astrologer
                </Link>
                <button
                  type="button"
                  onClick={handleReset}
                  className="font-body text-xs transition-colors hover:underline text-center"
                  style={{ color: "oklch(0.52 0.04 50)" }}
                  data-ocid="career_calc.recalculate_button"
                >
                  ← Try different birth details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <p
          className="text-center text-xs mt-6 leading-relaxed font-body"
          style={{ color: "oklch(0.45 0.03 50)" }}
        >
          This calculator uses a simplified Vedic approximation based on your
          birth month. For a precise 10th house analysis with exact birth time,
          consult our full report.
        </p>
      </div>
    </div>
  );
}
