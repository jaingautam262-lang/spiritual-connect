import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Calculator } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const NUMBER_MEANINGS: Record<
  number,
  { en: string; hi: string; theme: string }
> = {
  1: {
    theme: "Leadership & New Beginnings",
    en: "A powerful day for taking initiative. Start new projects, make important decisions, and assert your individuality. The energy of 1 supports independence and creative thinking.",
    hi: "आज नए कार्य शुरू करने का दिन है। नेतृत्व और नइ शुरुआत की उर्जा प्रबल है।",
  },
  2: {
    theme: "Cooperation & Sensitivity",
    en: "A day for partnerships and emotional healing. Collaborate, listen, and nurture relationships. Diplomacy and patience are your strengths today.",
    hi: "आज सहयोग और संवेदनशीलता का दिन है। संबंधों को मजबूत करें।",
  },
  3: {
    theme: "Creativity & Expression",
    en: "Your creative energy is at its peak today. Express yourself through art, music, writing, or conversation. Joy and optimism are your companions.",
    hi: "आज रचनात्मकता और अभिव्यक्ति का दिन है। अपने विचार खुलकर सांझा करें।",
  },
  4: {
    theme: "Stability & Hard Work",
    en: "A grounding day for building solid foundations. Focus on practical matters, systems, and routines. Hard work invested today yields long-term rewards.",
    hi: "आज कठिन परिश्रम और स्थिरता का दिन है। जीवन की पक्की नींव डालें।",
  },
  5: {
    theme: "Change & Freedom",
    en: "Expect the unexpected! A dynamic day full of change, adventure, and new experiences. Embrace flexibility and avoid rigid plans.",
    hi: "आज बदलाव और स्वतंत्रता का दिन है। नए अनुभवों के लिए तैयार रहें।",
  },
  6: {
    theme: "Love & Responsibility",
    en: "Home, family, and love are highlighted today. Take responsibility with grace. Beauty, harmony, and service to others bring deep fulfillment.",
    hi: "आज प्रेम, परिवार और जिम्मेदारी का दिन है। घर और परिवार को समय दें।",
  },
  7: {
    theme: "Introspection & Wisdom",
    en: "A spiritual and introspective day. Withdraw from noise, meditate, and seek deeper truths. Your intuition is at its sharpest today.",
    hi: "आज आध्यात्म और आत्म-ज्ञान का दिन है। मेडिटेशन और शांति की ओर जाएं।",
  },
  8: {
    theme: "Power & Achievement",
    en: "A powerful day for business, finance, and manifesting goals. Ambition and authority are amplified. Think and act in terms of long-term abundance.",
    hi: "आज शक्ति और सफलता का दिन है। व्यापार और वित्त में सकारात्मक निर्णय लें।",
  },
  9: {
    theme: "Completion & Compassion",
    en: "A day for closing cycles, giving, and universal love. Let go of what no longer serves you. Compassion and wisdom are your gifts today.",
    hi: "आज समाप्ति और करुणा का दिन है। जो काम नहीं आता उसे छोड़ दें।",
  },
  11: {
    theme: "Master Number: Illumination",
    en: "You carry Master Number 11 energy today — heightened intuition, spiritual insight, and psychic abilities. Your presence inspires others. Trust your visions.",
    hi: "आज मास्टर नंबर 11 की उर्जा है — आध्यात्मिक दृष्टि और अंतर्ज्ञान उच्च है।",
  },
  22: {
    theme: "Master Number: Master Builder",
    en: "Master Number 22 brings extraordinary potential for manifesting large-scale visions into reality. Think beyond the ordinary. You are a master builder today.",
    hi: "मास्टर नंबर 22 की उर्जा बड़े सपने साकार करने की शक्ति देती है।",
  },
  33: {
    theme: "Master Number: Master Teacher",
    en: "Master Number 33 brings divine compassion and teaching ability. Your wisdom heals others today. Spiritual service is your highest calling.",
    hi: "मास्टर नंबर 33 की उर्जा दिव्य मार्गदर्शन देती है।",
  },
};

function reduceToSingleDigit(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  if (n < 10) return n;
  return reduceToSingleDigit(
    String(n)
      .split("")
      .reduce((acc, d) => acc + Number.parseInt(d, 10), 0),
  );
}

function getDayNumber(dateStr: string): number {
  const digits = dateStr.replace(/-/g, "").split("").map(Number);
  return reduceToSingleDigit(digits.reduce((a, b) => a + b, 0));
}

export default function DailyGuideNumerology() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<{
    dayNumber: number;
    personalDay?: number;
  } | null>(null);

  function calculate() {
    const dayNumber = getDayNumber(todayDate);
    let personalDay: number | undefined;
    if (birthDate) {
      // Personal Day = Day Number + Life Path reduced
      const lpDigits = birthDate.replace(/-/g, "").split("").map(Number);
      const lifePath = reduceToSingleDigit(lpDigits.reduce((a, b) => a + b, 0));
      personalDay = reduceToSingleDigit(dayNumber + lifePath);
    }
    setResult({ dayNumber, personalDay });
  }

  const meaning = result ? NUMBER_MEANINGS[result.dayNumber] : null;
  const personalMeaning = result?.personalDay
    ? NUMBER_MEANINGS[result.personalDay]
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="spiritual-gradient py-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            data-ocid="numerology_guide.back_button"
            onClick={() => void navigate({ to: "/daily-guide" })}
            className="flex items-center gap-2 text-sm mb-4 mx-auto hover:opacity-80 transition-opacity"
            style={{ color: "oklch(0.85 0.02 80)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "hi" ? "वापस" : "Back"}
          </button>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold"
            style={{ color: "oklch(0.99 0.005 80)" }}
          >
            {language === "hi" ? "दैनिक अंकज्योतिष" : "Daily Numerology"}
          </h1>
          <p className="text-sm mt-2" style={{ color: "oklch(0.85 0.02 80)" }}>
            {language === "hi"
              ? "आज के अंक का महत्व जानें"
              : "Discover the energy of today's number"}
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="bg-card border border-border rounded-2xl p-8 space-y-5">
          <div>
            <Label htmlFor="ng-today" className="font-heading font-semibold">
              {language === "hi" ? "आज की तारीख:" : "Today's Date:"}
            </Label>
            <input
              id="ng-today"
              type="date"
              data-ocid="numerology_guide.today_input"
              value={todayDate}
              onChange={(e) => setTodayDate(e.target.value)}
              className="mt-2 w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <div>
            <Label htmlFor="ng-birth" className="font-heading font-semibold">
              {language === "hi"
                ? "जन्म तिथि (विकल्प):"
                : "Your Birth Date (Optional):"}
            </Label>
            <input
              id="ng-birth"
              type="date"
              data-ocid="numerology_guide.birth_input"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-2 w-full px-4 py-2 rounded-lg border border-border bg-background"
            />
          </div>
          <Button
            type="button"
            data-ocid="numerology_guide.calculate_button"
            onClick={calculate}
            className="w-full btn-spiritual flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            {language === "hi" ? "अंक गणना करें" : "Calculate"}
          </Button>
        </div>

        {result && meaning && (
          <div className="mt-8 space-y-5">
            <div
              data-ocid="numerology_guide.day_number_card"
              className="bg-card border rounded-2xl p-8 text-center"
              style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {language === "hi" ? "आज का अंक" : "Day Number"}
              </p>
              <div
                className="text-6xl font-heading font-bold mb-2"
                style={{ color: "oklch(0.62 0.18 48)" }}
              >
                {result.dayNumber}
              </div>
              <p
                className="font-heading font-semibold text-lg mb-3"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                {meaning.theme}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {language === "hi" ? meaning.hi : meaning.en}
              </p>
            </div>

            {result.personalDay && personalMeaning && (
              <div
                data-ocid="numerology_guide.personal_day_card"
                className="bg-card border rounded-2xl p-8 text-center border-primary/20"
              >
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {language === "hi"
                    ? "आपका व्यक्तिगत दिन अंक"
                    : "Your Personal Day Number"}
                </p>
                <div
                  className="text-5xl font-heading font-bold mb-2"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {result.personalDay}
                </div>
                <p
                  className="font-heading font-semibold text-lg mb-3"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {personalMeaning.theme}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {language === "hi" ? personalMeaning.hi : personalMeaning.en}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
