import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const CHAKRAS = [
  {
    id: "crown",
    name: "Crown Chakra",
    hindi: "सहस्रार",
    color: "#9b59b6",
    bgClass: "bg-purple-600",
    symbol: "🌸",
    element: "Cosmic Energy",
    mantra: "AUM",
    crystal: "Amethyst, Clear Quartz",
    yoga: "Savasana, Headstand",
    foods: "Fasting, Light foods",
    position: "top",
    questions: [
      "Do you feel connected to something larger than yourself?",
      "Do you experience moments of pure awareness or bliss?",
      "Do you have a sense of purpose and spiritual direction?",
      "Can you accept things beyond your control with peace?",
      "Do you trust in the flow of life and the universe?",
      "Do you feel grateful and appreciative regularly?",
      "Do you experience clarity and open-mindedness often?",
    ],
  },
  {
    id: "thirdEye",
    name: "Third Eye Chakra",
    hindi: "आज्ञा",
    color: "#6c5ce7",
    bgClass: "bg-indigo-600",
    symbol: "👁",
    element: "Light",
    mantra: "OM",
    crystal: "Lapis Lazuli, Sodalite",
    yoga: "Child's Pose, Eagle Pose",
    foods: "Blueberries, Purple grapes",
    position: "forehead",
    questions: [
      "Do you trust your intuition and gut feelings?",
      "Do you have vivid dreams or strong visualization abilities?",
      "Are you able to see the bigger picture in situations?",
      "Do you often sense things before they happen?",
      "Can you distinguish between illusion and reality easily?",
      "Do you have clear vision for your future?",
      "Do you meditate or practice mindfulness regularly?",
    ],
  },
  {
    id: "throat",
    name: "Throat Chakra",
    hindi: "विशुद्ध",
    color: "#0984e3",
    bgClass: "bg-blue-600",
    symbol: "🔵",
    element: "Ether",
    mantra: "HAM",
    crystal: "Aquamarine, Blue Lace Agate",
    yoga: "Fish Pose, Plow Pose",
    foods: "Blueberries, Sea vegetables",
    position: "throat",
    questions: [
      "Do you express yourself clearly and confidently?",
      "Can you speak your truth without fear of judgment?",
      "Do you listen actively and empathetically to others?",
      "Are you able to set clear boundaries with others?",
      "Do you communicate your needs effectively?",
      "Do you feel heard and understood by people around you?",
      "Are you comfortable with silence and reflection?",
    ],
  },
  {
    id: "heart",
    name: "Heart Chakra",
    hindi: "अनाहत",
    color: "#00b894",
    bgClass: "bg-green-600",
    symbol: "💚",
    element: "Air",
    mantra: "YAM",
    crystal: "Rose Quartz, Green Aventurine",
    yoga: "Camel Pose, Bridge Pose",
    foods: "Leafy greens, Broccoli",
    position: "chest",
    questions: [
      "Do you give and receive love freely and openly?",
      "Are you able to forgive yourself and others easily?",
      "Do you feel compassion towards all living beings?",
      "Do you nurture healthy, balanced relationships?",
      "Are you able to love yourself unconditionally?",
      "Do you feel joy and gratitude in everyday moments?",
      "Can you empathize with others' pain and struggles?",
    ],
  },
  {
    id: "solarPlexus",
    name: "Solar Plexus Chakra",
    hindi: "मणिपुर",
    color: "#fdcb6e",
    bgClass: "bg-yellow-500",
    symbol: "☀️",
    element: "Fire",
    mantra: "RAM",
    crystal: "Citrine, Tiger's Eye",
    yoga: "Warrior Pose, Boat Pose",
    foods: "Yellow peppers, Bananas",
    position: "stomach",
    questions: [
      "Do you feel confident and self-assured in your abilities?",
      "Can you make decisions without overthinking?",
      "Do you feel in control of your life and choices?",
      "Are you able to stand up for yourself when needed?",
      "Do you feel motivated and energetic most days?",
      "Can you handle criticism without feeling crushed?",
      "Do you pursue your goals with determination?",
    ],
  },
  {
    id: "sacral",
    name: "Sacral Chakra",
    hindi: "स्वाधिष्ठान",
    color: "#e17055",
    bgClass: "bg-orange-500",
    symbol: "🔶",
    element: "Water",
    mantra: "VAM",
    crystal: "Carnelian, Orange Calcite",
    yoga: "Pigeon Pose, Hip Circles",
    foods: "Oranges, Sweet potatoes",
    position: "lower-abdomen",
    questions: [
      "Do you embrace creativity and artistic expression?",
      "Are you comfortable with your emotions and feelings?",
      "Do you experience pleasure and joy in daily activities?",
      "Can you adapt to change without excessive resistance?",
      "Do you have healthy boundaries in relationships?",
      "Are you in touch with your desires and passions?",
      "Do you feel a sense of flow and movement in life?",
    ],
  },
  {
    id: "root",
    name: "Root Chakra",
    hindi: "मूलाधार",
    color: "#d63031",
    bgClass: "bg-red-600",
    symbol: "🔺",
    element: "Earth",
    mantra: "LAM",
    crystal: "Red Jasper, Black Tourmaline",
    yoga: "Mountain Pose, Warrior I",
    foods: "Root vegetables, Red fruits",
    position: "base",
    questions: [
      "Do you feel safe and secure in your daily life?",
      "Are your basic needs (food, shelter, finances) stable?",
      "Do you feel grounded and present in your body?",
      "Are you comfortable with physical activity and exercise?",
      "Do you feel a strong connection to family and community?",
      "Can you handle life challenges without excessive fear?",
      "Do you trust that your needs will be met?",
    ],
  },
];

type Answer = "yes" | "no" | "sometimes";

function calcScore(answers: Answer[]): number {
  if (!answers.length) return 0;
  const pts = answers.reduce(
    (s, a) => s + (a === "yes" ? 2 : a === "sometimes" ? 1 : 0),
    0,
  );
  return Math.round((pts / (answers.length * 2)) * 100);
}

function StatusBadge({ score }: { score: number }) {
  if (score >= 75)
    return (
      <Badge style={{ background: "oklch(0.62 0.18 140)" }}>Balanced ✓</Badge>
    );
  if (score >= 45)
    return <Badge style={{ background: "oklch(0.68 0.2 48)" }}>Moderate</Badge>;
  return (
    <Badge style={{ background: "oklch(0.50 0.22 28)" }}>Needs Healing</Badge>
  );
}

export default function ChakraAssessment() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [currentChakra, setCurrentChakra] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Record<string, Answer[]>>({});

  const chakra = CHAKRAS[currentChakra];
  const totalQuestions = CHAKRAS.length * 7;
  const answeredSoFar = currentChakra * 7 + currentQ;
  const progress = Math.round((answeredSoFar / totalQuestions) * 100);

  function handleAnswer(a: Answer) {
    const prev = allAnswers[chakra.id] ?? [];
    const updated = { ...allAnswers, [chakra.id]: [...prev, a] };
    setAllAnswers(updated);
    if (currentQ < 6) {
      setCurrentQ(currentQ + 1);
    } else if (currentChakra < CHAKRAS.length - 1) {
      setCurrentChakra(currentChakra + 1);
      setCurrentQ(0);
    } else {
      setPhase("results");
    }
  }

  function restart() {
    setPhase("intro");
    setCurrentChakra(0);
    setCurrentQ(0);
    setAllAnswers({});
  }

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.14 0.04 30)" }}>
      {/* Header */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 30) 0%, oklch(0.22 0.08 40) 100%)",
          borderBottom: "1px solid oklch(0.78 0.14 75 / 0.3)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-5xl mb-3">🕉️</div>
          <h1
            className="text-4xl font-bold mb-2"
            style={{
              color: "oklch(0.78 0.14 75)",
              fontFamily: "Cinzel, serif",
            }}
          >
            {t("chakraAssessment")}
          </h1>
          <p className="text-lg" style={{ color: "oklch(0.75 0.06 75)" }}>
            {t("chakraSubtitle")}
          </p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div
                className="rounded-2xl p-8 mb-8"
                style={{
                  background: "oklch(0.20 0.06 30)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.2)",
                }}
              >
                <p
                  className="text-lg mb-6"
                  style={{ color: "oklch(0.80 0.05 75)" }}
                >
                  This assessment evaluates all 7 chakras through 49
                  introspective questions. Answer honestly to receive
                  personalized healing recommendations.
                </p>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {CHAKRAS.map((c) => (
                    <div
                      key={c.id}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
                        style={{ background: c.color, opacity: 0.85 }}
                      >
                        {c.symbol}
                      </div>
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.65 0.05 75)" }}
                      >
                        {c.hindi}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                data-ocid="chakra.start_button"
                size="lg"
                className="px-10 py-4 text-lg font-semibold rounded-xl"
                style={{
                  background: "oklch(0.62 0.18 48)",
                  color: "oklch(0.99 0.005 80)",
                }}
                onClick={() => setPhase("quiz")}
              >
                {t("beginAssessment")}
              </Button>
            </motion.div>
          )}

          {phase === "quiz" && (
            <motion.div
              key={`q-${currentChakra}-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress */}
              <div className="mb-6">
                <div
                  className="flex justify-between text-sm mb-2"
                  style={{ color: "oklch(0.65 0.05 75)" }}
                >
                  <span>
                    {t("question")} {answeredSoFar + 1} of {totalQuestions}
                  </span>
                  <span>
                    {progress}% {t("complete")}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Chakra Badge */}
              <div
                className="rounded-2xl p-6 mb-6"
                style={{
                  background: `${chakra.color}18`,
                  border: `1px solid ${chakra.color}50`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: chakra.color }}
                  >
                    {chakra.symbol}
                  </div>
                  <div>
                    <div
                      className="font-bold text-lg"
                      style={{ color: chakra.color }}
                    >
                      {chakra.name}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "oklch(0.65 0.05 75)" }}
                    >
                      {chakra.hindi} · Question {currentQ + 1}/7
                    </div>
                  </div>
                </div>
                <p
                  className="text-xl font-medium"
                  style={{ color: "oklch(0.90 0.03 75)" }}
                >
                  {chakra.questions[currentQ]}
                </p>
              </div>

              {/* Answer Buttons */}
              <div className="grid grid-cols-3 gap-4">
                {(["yes", "sometimes", "no"] as Answer[]).map((a) => (
                  <Button
                    key={a}
                    data-ocid={`chakra.answer_${a}`}
                    onClick={() => handleAnswer(a)}
                    className="py-6 text-base font-semibold rounded-xl capitalize transition-all hover:scale-105"
                    style={{
                      background:
                        a === "yes"
                          ? "oklch(0.55 0.18 140)"
                          : a === "sometimes"
                            ? "oklch(0.55 0.18 75)"
                            : "oklch(0.40 0.15 28)",
                      color: "oklch(0.99 0.005 80)",
                    }}
                  >
                    {a === "yes"
                      ? "✅ Yes"
                      : a === "sometimes"
                        ? "🔸 Sometimes"
                        : "❌ No"}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2
                className="text-3xl font-bold text-center mb-2"
                style={{
                  color: "oklch(0.78 0.14 75)",
                  fontFamily: "Cinzel, serif",
                }}
              >
                {t("yourChakraReport")}
              </h2>
              <p
                className="text-center mb-8"
                style={{ color: "oklch(0.65 0.05 75)" }}
              >
                {t("energyBalanceResult")}
              </p>

              {/* Body Diagram + Scores */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Score Bars */}
                <div className="space-y-4">
                  {CHAKRAS.map((c) => {
                    const score = calcScore(allAnswers[c.id] ?? []);
                    return (
                      <div key={c.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className="flex items-center gap-2 text-sm font-medium"
                            style={{ color: "oklch(0.85 0.05 75)" }}
                          >
                            <span>{c.symbol}</span> {c.name}
                          </span>
                          <StatusBadge score={score} />
                        </div>
                        <div
                          className="h-3 rounded-full overflow-hidden"
                          style={{ background: "oklch(0.25 0.04 30)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: c.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                          />
                        </div>
                        <div
                          className="text-right text-xs mt-0.5"
                          style={{ color: "oklch(0.60 0.05 75)" }}
                        >
                          {score}%
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chakra Body Diagram */}
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  {CHAKRAS.map((c) => {
                    const score = calcScore(allAnswers[c.id] ?? []);
                    return (
                      <motion.div
                        key={c.id}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: CHAKRAS.indexOf(c) * 0.1 }}
                      >
                        <div
                          className="rounded-full flex items-center justify-center font-bold text-sm"
                          style={{
                            width: score > 60 ? 52 : score > 30 ? 40 : 30,
                            height: score > 60 ? 52 : score > 30 ? 40 : 30,
                            background: c.color,
                            opacity: 0.4 + (score / 100) * 0.6,
                            color: "white",
                            boxShadow: `0 0 ${score / 5}px ${c.color}`,
                            transition: "all 0.5s",
                          }}
                        >
                          {c.symbol}
                        </div>
                        <span
                          className="text-xs"
                          style={{ color: "oklch(0.60 0.05 75)" }}
                        >
                          {c.hindi}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Healing Suggestions */}
              <h3
                className="text-xl font-bold mb-4"
                style={{
                  color: "oklch(0.78 0.14 75)",
                  fontFamily: "Cinzel, serif",
                }}
              >
                {t("healingRecommendations")}
              </h3>
              <div className="space-y-4 mb-8">
                {CHAKRAS.filter(
                  (c) => calcScore(allAnswers[c.id] ?? []) < 75,
                ).map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl p-5"
                    style={{
                      background: `${c.color}12`,
                      border: `1px solid ${c.color}40`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{c.symbol}</span>
                      <span className="font-bold" style={{ color: c.color }}>
                        {c.name}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.60 0.05 75)" }}
                      >
                        ({calcScore(allAnswers[c.id] ?? [])}%)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div
                          className="font-semibold mb-1"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          🕉 Mantra
                        </div>
                        <div style={{ color: "oklch(0.80 0.04 75)" }}>
                          {c.mantra}
                        </div>
                      </div>
                      <div>
                        <div
                          className="font-semibold mb-1"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          💎 Crystals
                        </div>
                        <div style={{ color: "oklch(0.80 0.04 75)" }}>
                          {c.crystal}
                        </div>
                      </div>
                      <div>
                        <div
                          className="font-semibold mb-1"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          🧘 Yoga
                        </div>
                        <div style={{ color: "oklch(0.80 0.04 75)" }}>
                          {c.yoga}
                        </div>
                      </div>
                      <div>
                        <div
                          className="font-semibold mb-1"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          🥗 Foods
                        </div>
                        <div style={{ color: "oklch(0.80 0.04 75)" }}>
                          {c.foods}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {CHAKRAS.every(
                  (c) => calcScore(allAnswers[c.id] ?? []) >= 75,
                ) && (
                  <div
                    className="rounded-xl p-6 text-center"
                    style={{
                      background: "oklch(0.55 0.18 140 / 0.15)",
                      border: "1px solid oklch(0.55 0.18 140 / 0.4)",
                    }}
                  >
                    <div className="text-4xl mb-3">🌟</div>
                    <p
                      className="text-lg font-bold"
                      style={{ color: "oklch(0.70 0.18 140)" }}
                    >
                      {t("allChakrasBalanced")}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-center">
                <Button
                  data-ocid="chakra.restart_button"
                  onClick={restart}
                  size="lg"
                  className="px-8 py-3 rounded-xl font-semibold"
                  style={{ background: "oklch(0.62 0.18 48)", color: "white" }}
                >
                  {t("takeAssessmentAgain")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
