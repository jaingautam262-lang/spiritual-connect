import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const KEYWORD_INTERPRETATIONS: Record<string, string> = {
  job: "The chart indicates a good period for job-related matters. The 10th house significators are favorable. Expect positive developments in career in the coming weeks.",
  career:
    "Career and professional growth are favored. The Sun and Saturn are in supportive positions for your query. Take initiative and showcase your talents.",
  money:
    "Financial matters show positive indications. The 2nd and 11th house significators point to income growth. Be cautious with investments in the short term.",
  love: "The Venus significator is activated in the current chart. Romantic matters are promising. Openness and communication will help manifest this energy.",
  marriage:
    "The 7th house and its significator indicate favorable timing for marriage discussions. Family meetings and introductions could bear fruit soon.",
  health:
    "The chart suggests paying attention to diet and rest. The 6th house is under mild stress. Preventive care and regular exercise will keep issues at bay.",
  travel:
    "The 9th and 12th house lords support travel plans. Your query about a journey shows positive indicators. Proceed with planning.",
  education:
    "Mercury and Jupiter are well-placed for educational queries. Studies and competitive exams show positive indications. Focus and persistence will bring rewards.",
  property:
    "The 4th house significators indicate property matters need patience. The timing suggests waiting 3-6 more months before signing any agreements.",
  business:
    "The current chart shows entrepreneurial energy. Your business query has favorable indications in the medium term. Build your foundation carefully.",
  loan: "The 12th and 6th house lords suggest financial obligations require careful management. Clearing existing debts before taking on new ones is advised.",
  family:
    "The 4th house of home and family is well-aspected. Family harmony and domestic bliss are indicated. A family gathering or celebration may be on the horizon.",
};

const DEFAULT_INTERPRETATION =
  "The current moment carries significant cosmic energy for your query. The planetary positions at this time suggest that careful deliberation and trust in your intuition will serve you well. Seek guidance from wise counsel and proceed with clear intention.";

function getInterpretation(question: string): string {
  const lower = question.toLowerCase();
  for (const [keyword, interpretation] of Object.entries(
    KEYWORD_INTERPRETATIONS,
  )) {
    if (lower.includes(keyword)) return interpretation;
  }
  return DEFAULT_INTERPRETATION;
}

function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
}

export default function DailyGuidePrashnaKundli() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<{
    time: string;
    interpretation: string;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setResult({
      time: getCurrentTime(),
      interpretation: getInterpretation(question),
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="spiritual-gradient py-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            data-ocid="prashna_kundli.back_button"
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
            {language === "hi" ? "प्रश्न कुंडली" : "Prashna Kundli"}
          </h1>
          <p className="text-sm mt-2" style={{ color: "oklch(0.85 0.02 80)" }}>
            {language === "hi"
              ? "अपना प्रश्न केवल एक बार पूछें — वर्तमान समय की ग्रहावस्था उत्तर देती है"
              : "Ask your question once with full focus — the current time reveals the answer"}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-card border border-border rounded-2xl p-8">
          <form
            data-ocid="prashna_kundli.question_form"
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <Label
                htmlFor="pk-question"
                className="font-heading font-semibold"
              >
                {language === "hi" ? "अपना प्रश्न लिखें:" : "Write your question:"}
              </Label>
              <Input
                id="pk-question"
                data-ocid="prashna_kundli.question_input"
                placeholder={
                  language === "hi"
                    ? "जैसे: क्या मेरी नौकरी लगेगी?"
                    : "e.g. Will I get the job?"
                }
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-2 text-base"
              />
            </div>
            <Button
              type="submit"
              data-ocid="prashna_kundli.submit_button"
              className="w-full btn-spiritual flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {language === "hi" ? "प्रश्न करें" : "Ask Question"}
            </Button>
          </form>

          {result && (
            <div
              data-ocid="prashna_kundli.result_card"
              className="mt-8 pt-8 border-t border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="font-heading font-bold text-lg"
                  style={{ color: "oklch(0.35 0.12 25)" }}
                >
                  {language === "hi" ? "उत्तर" : "Interpretation"}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {language === "hi" ? "समय:" : "Time:"} {result.time}
                </span>
              </div>
              <blockquote
                className="border-l-4 pl-4 italic"
                style={{ borderColor: "oklch(0.78 0.14 75)" }}
              >
                <p className="text-sm leading-relaxed">
                  {result.interpretation}
                </p>
              </blockquote>
              <p className="text-xs text-muted-foreground mt-3">
                {language === "hi"
                  ? "नोट: यह सामान्य मार्गदर्शन है। विस्तृत विश्लेषण के लिए विशेषज्ञ ज्योतिषी से संपर्क करें"
                  : "Note: This is general guidance. For detailed analysis, consult a professional astrologer."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
