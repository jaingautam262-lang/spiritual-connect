import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { usePdfExport } from "../../hooks/usePdfExport";
import { t } from "../../utils/translations";

// ─── Calculation ───────────────────────────────────────────────────────────────
function calcJulianDay(
  year: number,
  month: number,
  day: number,
  hour: number,
): number {
  return (
    367 * year -
    Math.floor((7 * (year + Math.floor((month + 9) / 12))) / 4) +
    Math.floor((275 * month) / 9) +
    day +
    1721013.5 +
    hour / 24.0
  );
}

type MoonPhaseResult = {
  phaseName: string;
  moonAge: number;
  illumination: number;
  phaseDescription: string;
  phaseSymbol: string;
};

function calcMoonPhase(
  year: number,
  month: number,
  day: number,
  hour: number,
): MoonPhaseResult {
  const jdn = calcJulianDay(year, month, day, hour);
  const referenceNewMoon = 2451550.1;
  const synodicMonth = 29.53058867;
  let diff = jdn - referenceNewMoon;
  let moonAge = diff % synodicMonth;
  if (moonAge < 0) moonAge += synodicMonth;

  let illumination: number;
  if (moonAge <= 14.77) {
    illumination = (moonAge / 14.77) * 100;
  } else {
    illumination = ((synodicMonth - moonAge) / 14.77) * 100;
  }
  illumination = Math.max(0, Math.min(100, illumination));

  let phaseName: string;
  let phaseSymbol: string;
  let phaseDescription: string;

  if (moonAge < 1.85) {
    phaseName = "New Moon";
    phaseSymbol = "●";
    phaseDescription =
      "Born under the New Moon, you carry a pioneering spirit. You are naturally drawn to new beginnings and fresh starts. Your intuition is strong, and you excel at setting powerful intentions.";
  } else if (moonAge < 7.38) {
    phaseName = "Waxing Crescent";
    phaseSymbol = "◐";
    phaseDescription =
      "Born under the Waxing Crescent, you are a builder at heart. Patient and persistent, you grow steadily toward your goals. You have an inner strength that thrives on gradual progress.";
  } else if (moonAge < 9.22) {
    phaseName = "First Quarter";
    phaseSymbol = "◑";
    phaseDescription =
      "Born under the First Quarter Moon, you are a person of action and decisiveness. You thrive under pressure and have a remarkable ability to push through challenges.";
  } else if (moonAge < 14.77) {
    phaseName = "Waxing Gibbous";
    phaseSymbol = "◕";
    phaseDescription =
      "Born under the Waxing Gibbous Moon, you are a perfectionist and analyst. You have a gift for refining and improving everything you touch.";
  } else if (moonAge < 16.61) {
    phaseName = "Full Moon";
    phaseSymbol = "○";
    phaseDescription =
      "Born under the Full Moon, you are emotionally expressive and deeply intuitive. People are drawn to your radiant energy and natural charisma.";
  } else if (moonAge < 22.15) {
    phaseName = "Waning Gibbous";
    phaseSymbol = "◔";
    phaseDescription =
      "Born under the Waning Gibbous Moon, you are wise and generous. You love to share knowledge and experiences with others.";
  } else if (moonAge < 23.99) {
    phaseName = "Last Quarter";
    phaseSymbol = "◒";
    phaseDescription =
      "Born under the Last Quarter Moon, you are thoughtful and reflective. You have a gift for releasing what no longer serves you and making space for growth.";
  } else {
    phaseName = "Waning Crescent";
    phaseSymbol = "◓";
    phaseDescription =
      "Born under the Waning Crescent Moon, you are deeply spiritual and intuitive. You carry a quiet wisdom that guides both yourself and others.";
  }

  return { phaseName, moonAge, illumination, phaseDescription, phaseSymbol };
}

// ─── Shared sub-components ─────────────────────────────────────────────────────
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

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
        style={{ color: "oklch(0.65 0.08 60)" }}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
        style={{
          background: "oklch(0.20 0.05 25)",
          border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          color: value ? "oklch(0.90 0.03 80)" : "oklch(0.55 0.04 60)",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-heading font-semibold mb-1.5 uppercase tracking-wider"
        style={{ color: "oklch(0.65 0.08 60)" }}
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
        style={{
          background: "oklch(0.20 0.05 25)",
          border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          color: "oklch(0.90 0.03 80)",
        }}
      />
    </div>
  );
}

// ─── Static data ───────────────────────────────────────────────────────────────
const DAYS = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));
const MONTHS = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const YEARS = Array.from({ length: 100 }, (_, i) => {
  const y = new Date().getFullYear() - i;
  return { value: String(y), label: String(y) };
});
const HOURS = Array.from({ length: 24 }, (_, i) => ({
  value: String(i),
  label: String(i).padStart(2, "0"),
}));
const MINUTES = Array.from({ length: 60 }, (_, i) => ({
  value: String(i),
  label: String(i).padStart(2, "0"),
}));
const SECONDS = Array.from({ length: 60 }, (_, i) => ({
  value: String(i),
  label: String(i).padStart(2, "0"),
}));
const GENDERS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const FAQS = [
  {
    q: "Which moon phase are soulmates?",
    a: "New Moon and Full Moon are considered most powerful for soulmate connections in lunar astrology. New Moon births indicate souls destined for new beginnings together, while Full Moon births suggest intense emotional and psychic connections. However, soulmate bonds depend on complete birth chart compatibility rather than moon phase alone.",
  },
  {
    q: "Which phase of the moon will be today?",
    a: "Today's Moon phase changes daily as the Moon completes its 29.53-day cycle around Earth. You can calculate today's phase using our calculator by entering today's date. The Moon moves approximately 13 degrees daily, transitioning through all eight phases in just under a month.",
  },
  {
    q: "What is the Moon phase tonight in the UK?",
    a: "The Moon phase is the same worldwide on any given date since the Moon's position relative to the Sun affects its appearance identically from all locations on Earth. While moonrise and moonset times vary by location, the actual phase percentage and name remain constant globally.",
  },
  {
    q: "Is waning gibbous a full moon?",
    a: "No, waning gibbous occurs after Full Moon when the illuminated portion begins decreasing from above 50% back toward the Last Quarter phase. Full Moon occurs when the Moon appears completely illuminated at approximately 100%, while waning gibbous ranges from about 50-99% illumination on the decreasing side of the cycle.",
  },
  {
    q: "How do Moon phases affect family relationships and career decisions?",
    a: "Moon phases influence emotional sensitivity and decision-making capacity throughout each month. New Moon periods favor starting new family projects and career initiatives, while Full Moon amplifies emotions and communication. Waning phases support completing tasks and releasing relationships or career paths that no longer serve your growth.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function MoonPhaseCalculator() {
  const { language } = useLanguage();
  const { exportToPdf } = usePdfExport();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [dontKnowTime, setDontKnowTime] = useState(false);
  const [place, setPlace] = useState("");
  const [result, setResult] = useState<MoonPhaseResult | null>(null);
  const [submittedName, setSubmittedName] = useState("");

  const canCalculate =
    name.trim() &&
    gender &&
    day &&
    month &&
    year &&
    (dontKnowTime || hour !== "") &&
    place.trim();

  const handleCalculate = () => {
    if (!canCalculate) return;
    const h = dontKnowTime ? 12 : Number.parseInt(hour, 10);
    const res = calcMoonPhase(
      Number.parseInt(year, 10),
      Number.parseInt(month, 10),
      Number.parseInt(day, 10),
      h,
    );
    setResult(res);
    setSubmittedName(name.trim());
  };

  const handleExport = () => {
    exportToPdf(
      "moon-phase-results",
      "moon-phase-result.pdf",
      "Moon Phase Calculator Result",
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.16 0.05 22) 0%, oklch(0.13 0.04 20) 100%)",
      }}
      data-ocid="moon-phase-calculator-page"
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
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 text-2xl"
          style={{
            background: "oklch(0.20 0.06 260 / 0.35)",
            border: "1px solid oklch(0.60 0.12 260 / 0.4)",
          }}
        >
          ○
        </div>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          Moon Phase Calculator
        </h1>
        <p
          className="font-body text-sm max-w-xl mx-auto leading-relaxed"
          style={{ color: "oklch(0.62 0.06 60)" }}
        >
          Discover your birth moon phase and understand its profound influence
          on your personality, emotions, and life path.
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
          data-ocid="moon-phase.form_card"
        >
          <h2
            className="font-heading text-lg font-bold mb-6 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Calculate Your Birth Moon Phase
          </h2>

          <div className="space-y-5">
            {/* Name + Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                id="mp-name"
                label={t("calculator.yourName", language)}
                value={name}
                onChange={setName}
                placeholder={t("calculator.enterName", language)}
              />
              <SelectField
                id="mp-gender"
                label={t("calculator.gender", language)}
                value={gender}
                onChange={setGender}
                options={GENDERS}
                placeholder={t("calculator.selectGender", language)}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <p
                className="block text-xs font-heading font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "oklch(0.65 0.08 60)" }}
              >
                {t("calculator.dateOfBirth", language)}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <SelectField
                  id="mp-day"
                  label=""
                  value={day}
                  onChange={setDay}
                  options={DAYS}
                  placeholder={t("calculator.day", language)}
                />
                <SelectField
                  id="mp-month"
                  label=""
                  value={month}
                  onChange={setMonth}
                  options={MONTHS}
                  placeholder={t("calculator.month", language)}
                />
                <SelectField
                  id="mp-year"
                  label=""
                  value={year}
                  onChange={setYear}
                  options={YEARS}
                  placeholder={t("calculator.year", language)}
                />
              </div>
            </div>

            {/* Time of Birth */}
            <div>
              <p
                className="block text-xs font-heading font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "oklch(0.65 0.08 60)" }}
              >
                {t("calculator.timeOfBirth", language)}
              </p>
              <label
                className="flex items-center gap-2 mb-3 cursor-pointer"
                style={{ color: "oklch(0.65 0.06 60)" }}
              >
                <input
                  type="checkbox"
                  checked={dontKnowTime}
                  onChange={(e) => setDontKnowTime(e.target.checked)}
                  className="w-4 h-4 rounded"
                  data-ocid="moon-phase.dont_know_time_checkbox"
                />
                <span className="font-body text-sm">
                  {t("calculator.dontKnowTime", language)}
                </span>
              </label>
              {!dontKnowTime && (
                <div className="grid grid-cols-3 gap-3">
                  <SelectField
                    id="mp-hour"
                    label=""
                    value={hour}
                    onChange={setHour}
                    options={HOURS}
                    placeholder={t("calculator.hour", language)}
                  />
                  <SelectField
                    id="mp-minute"
                    label=""
                    value={minute}
                    onChange={setMinute}
                    options={MINUTES}
                    placeholder={t("calculator.minute", language)}
                  />
                  <SelectField
                    id="mp-second"
                    label=""
                    value={second}
                    onChange={setSecond}
                    options={SECONDS}
                    placeholder={t("calculator.second", language)}
                  />
                </div>
              )}
            </div>

            {/* Place of Birth */}
            <TextInput
              id="mp-place"
              label={t("calculator.placeOfBirth", language)}
              value={place}
              onChange={setPlace}
              placeholder={t("calculator.enterPlace", language)}
            />
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center mt-6">
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
              data-ocid="moon-phase.calculate_button"
            >
              Calculate Moon Phase
            </button>
          </div>
        </div>

        {/* ── Inline Result ── */}
        {result && (
          <div
            id="moon-phase-results"
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: "oklch(0.19 0.07 260 / 0.30)",
              border: "2px solid oklch(0.60 0.12 260 / 0.35)",
              boxShadow: "0 0 32px oklch(0.60 0.12 260 / 0.12)",
            }}
            data-ocid="moon-phase.result"
          >
            <div className="text-center mb-6">
              <div
                className="font-heading text-6xl mb-2"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {result.phaseSymbol}
              </div>
              <h3
                className="font-heading text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {result.phaseName}
              </h3>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.65 0.06 60)" }}
              >
                Birth Moon Phase for {submittedName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <p
                  className="font-heading text-xs uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.65 0.06 60)" }}
                >
                  Moon Age
                </p>
                <p
                  className="font-heading text-xl font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {result.moonAge.toFixed(1)} days
                </p>
              </div>
              <div
                className="rounded-xl p-4 text-center"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.15)",
                }}
              >
                <p
                  className="font-heading text-xs uppercase tracking-widest mb-1"
                  style={{ color: "oklch(0.65 0.06 60)" }}
                >
                  Illumination
                </p>
                <p
                  className="font-heading text-xl font-bold"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {result.illumination.toFixed(0)}%
                </p>
              </div>
            </div>

            <div
              className="rounded-xl p-5 mb-6"
              style={{
                background: "oklch(0.22 0.06 25)",
                border: "1px solid oklch(0.78 0.14 75 / 0.12)",
              }}
            >
              <p
                className="font-heading text-xs uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.68 0.20 48)" }}
              >
                Personality Insight
              </p>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "oklch(0.78 0.04 70)" }}
              >
                {result.phaseDescription}
              </p>
            </div>

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
                data-ocid="moon-phase.talk_astrologer_cta"
              >
                Talk to Astrologer
              </a>
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="moon-phase.export_pdf_button"
              >
                {t("calculator.exportPdf", language)}
              </button>
            </div>
          </div>
        )}

        {/* ── Informational Sections ── */}
        <InfoSection title="Moon Phase Calculator: Understanding Lunar Cycles">
          <p>
            In Indian homes, we often talk about "Amavasya" (new moon) and
            "Purnima" (full moon) with a certain reverence. From fasting to
            spiritual rituals, our traditions have always recognized the Moon's
            influence. What's fascinating is, modern tools now allow you to
            track these phases and align your lifestyle accordingly whether it's
            the best time to start something new, reflect inward, or simply take
            a breather.
          </p>
        </InfoSection>

        <InfoSection title="What are the Moon Phases?" alternate>
          <p>
            Have you ever looked up at the night sky and wondered why the Moon
            looks different every few days? One night it's a thin sliver, then a
            glowing half-circle, and before you know it, it's a full, bright
            disc lighting up the whole sky. These changes are what we call Moon
            phases, and they happen because of the way the Moon orbits around
            Earth and how sunlight reflects off its surface.
          </p>
          <p>
            As the Moon travels around Earth, different portions of its sunlit
            side become visible to us. When the Moon is between Earth and the
            Sun, we can't see the lit side at all, and that's the New Moon. As
            days pass, more of the lit side becomes visible, leading to Waxing
            phases where the Moon grows larger. Once we see the full lit side,
            we experience the Full Moon. After that, the visible portion starts
            shrinking again during the Waning phases, until we're back to a New
            Moon.
          </p>
          <p>
            This entire cycle takes about 29.5 days, which is why our months are
            roughly 30 days long. In fact, many ancient calendars, including the
            Hindu Panchang and Islamic Hijri calendar, were based on this lunar
            cycle. Each phase carries its own energy, and many people believe
            these cycles influence everything from tides to our moods and even
            important life decisions.
          </p>
        </InfoSection>

        <InfoSection title="What are All the Moon Phases?">
          {[
            {
              name: "New Moon",
              symbol: "●",
              desc: "The Moon is positioned between Earth and the Sun, making it invisible from Earth. This phase symbolizes new beginnings, fresh starts, and the perfect time to set intentions and plant seeds for future growth.",
            },
            {
              name: "Waxing Crescent",
              symbol: "◐",
              desc: "A small sliver of the Moon becomes visible on the right side. This phase encourages taking initial steps toward your goals. It's a time for intention, hope, and moving forward with optimism.",
            },
            {
              name: "First Quarter",
              symbol: "◑",
              desc: "Half of the Moon is illuminated and visible. This phase brings challenges and decisions. It's a time to take action, make choices, and push through obstacles that stand between you and your goals.",
            },
            {
              name: "Waxing Gibbous",
              symbol: "◕",
              desc: "More than half of the Moon is illuminated. This phase encourages refinement and adjustment. It's time to review progress, make improvements, and stay committed to your intentions.",
            },
            {
              name: "Full Moon",
              symbol: "○",
              desc: "The Moon is fully illuminated and visible from Earth. This powerful phase represents completion, culmination, and heightened emotions. It's a time of clarity, revelation, and celebrating achievements.",
            },
            {
              name: "Waning Gibbous",
              symbol: "◔",
              desc: "Illumination begins decreasing after the Full Moon. This phase encourages gratitude, sharing wisdom, and distributing what you've gathered. It's a time for teaching and generosity.",
            },
            {
              name: "Last Quarter",
              symbol: "◒",
              desc: "The Moon returns to half illumination, now on the left side. This phase supports release, forgiveness, and letting go of what no longer serves you. It's a time for reflection and clearing space.",
            },
            {
              name: "Waning Crescent",
              symbol: "◓",
              desc: "Only a small sliver remains visible before the New Moon. This phase encourages rest, surrender, and spiritual connection. It's time to integrate lessons learned and prepare for the next cycle.",
            },
          ].map((phase) => (
            <div
              key={phase.name}
              className="flex gap-3 items-start py-2 border-b last:border-b-0"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.08)" }}
            >
              <span
                className="flex-shrink-0 font-heading text-lg w-6 text-center mt-0.5"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                {phase.symbol}
              </span>
              <div>
                <span
                  className="font-heading font-semibold text-sm"
                  style={{ color: "oklch(0.82 0.06 70)" }}
                >
                  {phase.name}:{" "}
                </span>
                {phase.desc}
              </div>
            </div>
          ))}
        </InfoSection>

        <InfoSection
          title="Which Zodiac Sign is affected the most by changing Moon Phases?"
          alternate
        >
          <p>
            Cancer is the zodiac sign most profoundly affected by Moon phases
            since the Moon rules Cancer and directly influences its emotional
            landscape. Cancer individuals experience heightened sensitivity,
            mood shifts, and intuitive surges that closely mirror each lunar
            phase. During Full Moons, Cancer's emotional intensity peaks,
            sometimes leading to powerful breakthroughs or overwhelming
            feelings.
          </p>
          <p>
            Scorpio and Pisces, the other water signs, also experience
            significant lunar influence due to their deep emotional natures and
            psychic sensitivities. Earth signs like Taurus and Virgo feel Moon
            phases through shifts in practical matters, while fire signs
            experience changes in motivation and creative energy.
          </p>
        </InfoSection>

        <InfoSection title="What is the Moon cycle?">
          <p>
            The Moon cycle, also called the lunar cycle or synodic month, refers
            to the complete journey of the Moon through all eight phases from
            New Moon back to New Moon. This cycle takes approximately 29.53 days
            to complete and has served as the basis for calendars, agriculture,
            and spiritual practices across virtually every human civilization.
          </p>
          <p>
            During this cycle, the Moon travels through its orbit around Earth
            while Earth simultaneously orbits the Sun. The changing angle
            between the Moon, Earth, and Sun creates the varying illumination
            patterns we observe as phases. Ancient peoples used these cycles to
            time planting and harvesting, predict tides, and organize religious
            festivals and ceremonies.
          </p>
          <p>
            In Vedic astrology, the lunar month is divided into two fortnights
            called Shukla Paksha (bright fortnight, waxing) and Krishna Paksha
            (dark fortnight, waning). Each day of these fortnights, called a
            Tithi, carries specific energetic qualities that influence
            activities, ceremonies, and spiritual practices.
          </p>
        </InfoSection>

        <InfoSection title="Moon age" alternate>
          <p>
            Moon age refers to the number of days since the last New Moon,
            measured within the current lunar cycle. A Moon age of zero
            represents the New Moon, while an age of approximately 14.77 days
            corresponds to the Full Moon. The Moon's age helps astronomers and
            astrologers determine its precise phase and the intensity of its
            energetic influence.
          </p>
          <p>
            In practical terms, knowing the Moon's age helps practitioners of
            lunar astrology understand the strength of different energetic
            influences. A Moon aged between 13 and 16 days carries the powerful
            illuminated energy of the Full Moon period, while a Moon aged 0 to 2
            days embodies the fresh, beginnings-oriented energy of the New Moon.
          </p>
        </InfoSection>

        <InfoSection title="When will the Moon be visible tonight?">
          <p>
            The Moon's visibility depends on its current phase, your geographic
            location, and atmospheric conditions. During the New Moon phase, the
            Moon is not visible since it rises and sets with the Sun. During
            Waxing phases, the Moon becomes visible in the western sky after
            sunset and sets progressively later each night.
          </p>
          <p>
            At Full Moon, the Moon rises around sunset, is visible throughout
            the night, and sets near sunrise. During Waning phases, the Moon
            rises progressively later in the evening and remains visible into
            the morning hours. The Waning Crescent Moon is visible primarily in
            the eastern sky during the pre-dawn hours before disappearing into
            the New Moon phase.
          </p>
        </InfoSection>

        <InfoSection title="What is the best time to see the Moon?" alternate>
          <p>
            The best time to observe the Moon depends on your goals. For maximum
            brightness and visibility, the Full Moon is most spectacular when
            it's near the horizon just after moonrise, when atmospheric
            conditions create the famous "Moon illusion" that makes it appear
            larger than normal. This effect, though optical, creates stunning
            views particularly in open landscapes.
          </p>
          <p>
            For photographers and stargazers, the First and Last Quarter phases
            offer excellent opportunities to observe lunar mountains and craters
            along the terminator line where sunlight meets shadow. Clear nights
            with minimal light pollution provide the clearest views, and
            binoculars or a modest telescope dramatically enhance the
            experience.
          </p>
        </InfoSection>

        <InfoSection title="Which Moon phase is best for stargazing?">
          <p>
            The New Moon phase offers the absolute best conditions for
            stargazing since the dark sky is free from lunar glare that can wash
            out fainter stars, galaxies, and nebulae. Professional astronomers
            typically schedule deep sky observations during the New Moon period
            to maximize the visibility of distant celestial objects.
          </p>
          <p>
            The Waxing and Waning Crescent phases also provide reasonably dark
            skies for most of the night. Conversely, Full Moon nights are the
            worst for observing deep sky objects but are excellent for naked-eye
            lunar observation and for activities that benefit from natural
            illumination outdoors.
          </p>
        </InfoSection>

        <InfoSection title="Conclusion" alternate>
          <p>
            Understanding Moon phases connects us to rhythms that have guided
            human civilization for millennia. Whether you're aligning your
            spiritual practices with lunar cycles, exploring how your birth Moon
            phase shapes your personality, or simply appreciating the Moon's
            beauty, this ancient knowledge offers practical guidance for modern
            living.
          </p>
          <p>
            Your birth Moon phase is a unique signature in your personal
            astrological profile, offering deep insights into your emotional
            nature, intuitive gifts, and life purpose. Combined with your Sun
            sign, rising sign, and complete birth chart analysis, it creates a
            comprehensive picture of your cosmic blueprint. For deeper insights
            into how lunar influences shape your life and relationships, an
            experienced astrologer on Spiritual Connect can provide personalized
            guidance tailored to your unique chart.
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
          data-ocid="moon-phase.discover_more"
        >
          <div
            className="font-heading text-3xl mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            *
          </div>
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-2"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("calculator.discoverMore", language)}
          </h2>
          <p
            className="font-body text-sm mb-6 max-w-lg mx-auto"
            style={{ color: "oklch(0.65 0.05 60)" }}
          >
            {t("calculator.readyToUnlock", language)}{" "}
            {t("calculator.exploreCalculators", language)}
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
              {t("calculator.spiritualConnectStore", language)}
            </h3>
            <p
              className="font-body text-sm leading-relaxed mb-3"
              style={{ color: "oklch(0.65 0.05 60)" }}
            >
              {t("calculator.storeDesc", language)}
            </p>
            <p
              className="font-body text-sm font-medium"
              style={{ color: "oklch(0.72 0.06 65)" }}
            >
              {t("calculator.plusMore", language)} —{" "}
              {t("calculator.plusMoreDesc", language)}
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
            data-ocid="moon-phase.all_calculators_link"
          >
            {t("calculator.exploreCalculators", language)} →
          </a>
        </div>

        {/* ── FAQs ── */}
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
          data-ocid="moon-phase.faqs"
        >
          <h2
            className="font-heading text-xl md:text-2xl font-bold mb-6 text-center"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            {t("calculator.faqs", language)}
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.78 0.14 75 / 0.12)" }}
                data-ocid={`moon-phase.faq_item.${i + 1}`}
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
