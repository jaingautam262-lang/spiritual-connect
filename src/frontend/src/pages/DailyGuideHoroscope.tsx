import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const RASHIS = [
  { id: "aries", en: "Aries", hi: "मेष", symbol: "♈" },
  { id: "taurus", en: "Taurus", hi: "वृषभ", symbol: "♉" },
  { id: "gemini", en: "Gemini", hi: "मिथुन", symbol: "♊" },
  { id: "cancer", en: "Cancer", hi: "कर्क", symbol: "♋" },
  { id: "leo", en: "Leo", hi: "सिंह", symbol: "♌" },
  { id: "virgo", en: "Virgo", hi: "कन्या", symbol: "♍" },
  { id: "libra", en: "Libra", hi: "तुला", symbol: "♎" },
  { id: "scorpio", en: "Scorpio", hi: "वृश्चिक", symbol: "♏" },
  { id: "sagittarius", en: "Sagittarius", hi: "धनु", symbol: "♐" },
  { id: "capricorn", en: "Capricorn", hi: "मकर", symbol: "♑" },
  { id: "aquarius", en: "Aquarius", hi: "कुंभ", symbol: "♒" },
  { id: "pisces", en: "Pisces", hi: "मीन", symbol: "♓" },
];

// Day-of-week + rashi prediction matrix (7 days × 12 rashis)
const PREDICTIONS: Record<string, string[]> = {
  aries: [
    "Today brings new energy for Aries. Take bold initiatives in career.",
    "Your intuition is sharp today. Trust your gut in decisions.",
    "Financial opportunities may arise. Stay alert and act wisely.",
    "Midweek brings emotional clarity. Relationships improve.",
    "Creative ideas flow freely. Express yourself confidently.",
    "Rest and reflect today. Plan for the week ahead.",
    "A spiritual Sunday brings inner peace. Meditate in the morning.",
  ],
  taurus: [
    "Steady progress in financial matters. Patience pays off today.",
    "Focus on home and family. A loved one needs your attention.",
    "Career advancement possible. Present your ideas clearly.",
    "Health needs attention. Eat well and rest adequately.",
    "Romance is highlighted today. Spend time with your partner.",
    "A good day for creative pursuits. Art and music uplift you.",
    "Nature heals you today. Spend time outdoors.",
  ],
  gemini: [
    "Communication brings success. Write, speak, and connect.",
    "New learning opportunity appears. Embrace it wholeheartedly.",
    "Social connections bring joy. Reconnect with old friends.",
    "Mental clarity at peak. Important decisions can be made.",
    "Travel may be on the horizon. Short trips are favorable.",
    "Dual nature works in your favor today. Balance logic and heart.",
    "Express your thoughts freely. Writing brings clarity.",
  ],
  cancer: [
    "Home and family are blessed today. Domestic harmony prevails.",
    "Emotional intelligence guides you. Be compassionate today.",
    "Financial security improves. Savings bring peace of mind.",
    "Nurturing others brings deep satisfaction today.",
    "Your intuition is at its strongest. Listen to inner voice.",
    "Old memories surface. Process them with kindness.",
    "Spiritual devotion brings peace. Visit a temple or pray.",
  ],
  leo: [
    "Leadership opportunities arise. Step up with confidence.",
    "Recognition comes your way. Your talents are noticed.",
    "Creative expression is powerful. Let your light shine.",
    "Social life is vibrant. Attend gatherings and network.",
    "Generosity pays back manifold. Give freely today.",
    "Romance blossoms. Your charisma attracts admiration.",
    "Spiritual practice amplifies your natural radiance.",
  ],
  virgo: [
    "Attention to detail brings success. Perfectionism serves you.",
    "Health routines pay off. Your body thanks your discipline.",
    "Work projects progress well. Stay focused and methodical.",
    "Analysis reveals hidden solutions. Think deeply.",
    "Service to others brings fulfillment. Help someone today.",
    "Practical matters sort themselves out. Trust the process.",
    "Simplicity and routine ground you today.",
  ],
  libra: [
    "Balance in relationships is key. Diplomacy resolves conflicts.",
    "Artistic sensibilities shine. Beauty surrounds you.",
    "Justice and fairness guide your decisions today.",
    "Partnership matters improve. Collaboration brings success.",
    "Social harmony is within reach. Be the peacemaker.",
    "Aesthetic pursuits bring joy. Decorate, create, beautify.",
    "Inner and outer balance achieved. Peace permeates your day.",
  ],
  scorpio: [
    "Deep transformation is underway. Embrace the change.",
    "Research and investigation yield results today.",
    "Hidden matters come to light. Truth is on your side.",
    "Emotional depth is your strength. Feel fully and heal.",
    "Power dynamics shift in your favor today.",
    "Regeneration and renewal theme your weekend.",
    "Spiritual depth resonates. Explore your inner darkness with light.",
  ],
  sagittarius: [
    "Expansion and optimism mark your Monday. Think big!",
    "Higher learning beckons. Study, teach, or philosophize.",
    "Adventure awaits. Even a short journey uplifts you.",
    "Foreign connections bring opportunity today.",
    "Your philosophy guides someone. Share your wisdom.",
    "Freedom and exploration define your Saturday.",
    "Spiritual quest deepens. Seek higher meaning.",
  ],
  capricorn: [
    "Ambition drives success today. Climb steadily.",
    "Responsibility handled with grace brings rewards.",
    "Long-term goals advance. Patience is your superpower.",
    "Authority figures support you today. Seek mentorship.",
    "Discipline and structure create the freedom you seek.",
    "Work-life balance needs attention today.",
    "Tradition and roots ground you. Honor your heritage.",
  ],
  aquarius: [
    "Innovation and originality stand out today. Be unique.",
    "Community involvement brings fulfilment. Serve a cause.",
    "Technology and social media work in your favor.",
    "Humanitarian impulses guide your Wednesday.",
    "Friendship circles expand. New connections are meaningful.",
    "Intellectual pursuits bring breakthroughs today.",
    "Visionary thinking opens new horizons. Dream big.",
  ],
  pisces: [
    "Intuition and dreams carry messages. Pay attention.",
    "Compassion flows freely. Offer healing to those in need.",
    "Creative and spiritual gifts are heightened today.",
    "Boundaries need gentle reinforcement. Say no with love.",
    "Artistic expression releases blocked emotions.",
    "Solitude and reflection bring deep insights.",
    "Spiritual connection peaks today. Meditate and pray.",
  ],
};

export default function DailyGuideHoroscope() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedRashi, setSelectedRashi] = useState<string | null>(null);

  const today = new Date();
  const dow = today.getDay(); // 0=Sun, 1=Mon ...

  const prediction = selectedRashi
    ? (PREDICTIONS[selectedRashi]?.[dow] ?? "")
    : "";

  return (
    <div className="min-h-screen bg-background">
      <div className="spiritual-gradient py-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            data-ocid="daily_horoscope.back_button"
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
            {language === "hi" ? "दैनिक राशिफल" : "Daily Horoscope"}
          </h1>
          <p className="text-sm mt-2" style={{ color: "oklch(0.85 0.02 80)" }}>
            {today.toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-center text-muted-foreground mb-6">
          {language === "hi" ? "अपनी राशि चुनें:" : "Select your Rashi:"}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
          {RASHIS.map((r) => (
            <button
              type="button"
              key={r.id}
              data-ocid={`daily_horoscope.rashi.${r.id}`}
              onClick={() => setSelectedRashi(r.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                selectedRashi === r.id
                  ? "border-primary bg-primary/10"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <span className="text-2xl">{r.symbol}</span>
              <span className="text-xs font-medium">
                {language === "hi" ? r.hi : r.en}
              </span>
            </button>
          ))}
        </div>

        {selectedRashi && (
          <div
            data-ocid="daily_horoscope.prediction_card"
            className="bg-card border border-border rounded-2xl p-8 text-center animate-float"
            style={{ borderColor: "oklch(0.78 0.14 75 / 0.3)" }}
          >
            <div className="text-5xl mb-4">
              {RASHIS.find((r) => r.id === selectedRashi)?.symbol}
            </div>
            <h2
              className="font-heading font-bold text-xl mb-1"
              style={{ color: "oklch(0.35 0.12 25)" }}
            >
              {language === "hi"
                ? RASHIS.find((r) => r.id === selectedRashi)?.hi
                : RASHIS.find((r) => r.id === selectedRashi)?.en}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              {today.toLocaleDateString("en-IN", { weekday: "long" })}
            </p>
            <p className="text-base leading-relaxed">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}
