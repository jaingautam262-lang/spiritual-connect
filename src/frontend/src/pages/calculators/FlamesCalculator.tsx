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

// ─── FLAMES Algorithm ──────────────────────────────────────────────────────────
function calculateFlames(name1: string, name2: string): string {
  const n1 = name1.toLowerCase().replace(/\s/g, "");
  const n2 = name2.toLowerCase().replace(/\s/g, "");

  const arr1 = n1.split("");
  const arr2 = n2.split("");

  for (let i = 0; i < arr1.length; i++) {
    const idx = arr2.indexOf(arr1[i]);
    if (idx !== -1) {
      arr1[i] = "";
      arr2[idx] = "";
    }
  }

  const remaining =
    arr1.filter((c) => c !== "").length + arr2.filter((c) => c !== "").length;

  if (remaining === 0) return "L";

  const flames = ["F", "L", "A", "M", "E", "S"];
  let flamesCopy = [...flames];
  let idx = 0;

  while (flamesCopy.length > 1) {
    idx = (idx + remaining - 1) % flamesCopy.length;
    flamesCopy.splice(idx, 1);
    if (idx === flamesCopy.length) idx = 0;
  }

  return flamesCopy[0];
}

// ─── FLAMES result config ──────────────────────────────────────────────────────
interface FlamesResult {
  letter: string;
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
  compatibilityScore: number;
}

const FLAMES_MAP: Record<string, FlamesResult> = {
  F: {
    letter: "F",
    label: "Friendship",
    color: "oklch(0.60 0.20 250)",
    borderColor: "oklch(0.60 0.20 250 / 0.4)",
    bgColor: "oklch(0.18 0.07 250 / 0.3)",
    description:
      "You two vibe best as friends. A strong friendship can last longer than many love stories, and many great relationships start as friendships.",
    compatibilityScore: 72,
  },
  L: {
    letter: "L",
    label: "Love",
    color: "oklch(0.62 0.22 20)",
    borderColor: "oklch(0.62 0.22 20 / 0.4)",
    bgColor: "oklch(0.18 0.08 20 / 0.3)",
    description:
      "There's romantic potential between you two! Emotional chemistry and strong feelings point to a beautiful connection.",
    compatibilityScore: 95,
  },
  A: {
    letter: "A",
    label: "Affection",
    color: "oklch(0.68 0.20 350)",
    borderColor: "oklch(0.68 0.20 350 / 0.4)",
    bgColor: "oklch(0.18 0.08 350 / 0.3)",
    description:
      "A warm and caring connection exists between you. It's emotionally safe, comfortable, and deeply healing.",
    compatibilityScore: 80,
  },
  M: {
    letter: "M",
    label: "Marriage",
    color: "oklch(0.78 0.14 75)",
    borderColor: "oklch(0.78 0.14 75 / 0.4)",
    bgColor: "oklch(0.18 0.07 75 / 0.3)",
    description:
      "Long-term potential! You two could truly build a beautiful future together. The universe is sending a green signal.",
    compatibilityScore: 90,
  },
  E: {
    letter: "E",
    label: "Enemy",
    color: "oklch(0.72 0.20 48)",
    borderColor: "oklch(0.72 0.20 48 / 0.4)",
    bgColor: "oklch(0.18 0.08 48 / 0.3)",
    description:
      "Your energies may clash, but opposites can attract! With awareness and mutual respect, even this connection can grow beautifully.",
    compatibilityScore: 30,
  },
  S: {
    letter: "S",
    label: "Sister/Brother",
    color: "oklch(0.65 0.18 180)",
    borderColor: "oklch(0.65 0.18 180 / 0.4)",
    bgColor: "oklch(0.18 0.07 180 / 0.3)",
    description:
      "A pure, family-like bond. You look out for each other with love and care, like siblings who have each other's backs.",
    compatibilityScore: 65,
  },
};

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
    q: "Can true love be found in Flames calculator?",
    a: "True love can be found, but it requires patience, self-awareness, and open communication rather than relying on calculators alone. However, Flames can spark conversations that help you discover compatibility with potential partners. Additionally, focusing on personal growth and genuine connections increases your chances of finding meaningful love.",
  },
  {
    q: "Is Flames calculator 100% accurate?",
    a: "Flames calculator is not scientifically accurate and should be used for entertainment rather than serious relationship decisions. However, it can provide insights into your feelings and create opportunities for meaningful conversations. Moreover, real compatibility depends on numerous factors that name-based calculations cannot measure.",
  },
  {
    q: "Can Flames results change over time?",
    a: "Yes, Flames results can change if you use different name variations or spellings, but the core algorithm remains the same for identical inputs. However, your interpretation and emotional reactions to results might evolve as you grow and gain relationship experience. Additionally, real compatibility can change as people develop new interests and values.",
  },
  {
    q: "Should I make relationship decisions based on Flames results?",
    a: "No, important relationship decisions should be based on real-world compatibility, shared values, and genuine feelings rather than game results. However, Flames can help you reflect on your emotions and expectations. Moreover, combining multiple perspectives including personal experience provides a better decision-making foundation than relying on single tools.",
  },
  {
    q: "How can I improve my chances of finding compatible partnerships?",
    a: "Focus on developing self-awareness, communication skills, and emotional intelligence while staying open to meeting different types of people. However, understanding your values and relationship goals helps you recognize compatible partners. Additionally, seeking guidance from relationship experts or astrologers can provide deeper insights into your compatibility patterns and relationship potential.",
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function FlamesCalculator() {
  const { language } = useLanguage();
  const { exportToPdf } = usePdfExport();

  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [result, setResult] = useState<FlamesResult | null>(null);

  const canCalculate =
    yourName.trim().length > 0 && partnerName.trim().length > 0;

  const handleCalculate = () => {
    if (!canCalculate) return;
    const letter = calculateFlames(yourName.trim(), partnerName.trim());
    setResult(FLAMES_MAP[letter] ?? FLAMES_MAP.F);
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
      data-ocid="flames-calculator-page"
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
            <span
              className="font-heading text-xs tracking-widest uppercase"
              style={{ color: "oklch(0.60 0.08 60)" }}
            >
              Compatibility Calculator
            </span>
          </div>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "oklch(0.92 0.10 75)" }}
          >
            FLAMES Calculator
          </h1>
          <p
            className="font-body text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.68 0.05 60)" }}
          >
            Ever found yourself scribbling names in a notebook, wondering if you
            and your crush were meant to be? The FLAMES calculator taps into
            that same fun, nostalgic feeling — revealing what kind of bond you
            and another person share.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* ── Form Card ── */}
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{
            background: "oklch(0.20 0.05 25)",
            border: "1px solid oklch(0.78 0.14 75 / 0.20)",
          }}
        >
          <h2
            className="font-heading text-lg font-bold"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            Calculate your FLAMES
          </h2>

          {/* Your Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="flames-your-name"
              className="block font-heading text-sm font-semibold"
              style={labelStyle}
            >
              {t("calculator.yourName", language)} *
            </label>
            <input
              id="flames-your-name"
              type="text"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
              style={inputStyle}
              data-ocid="flames-calc.your_name_input"
            />
          </div>

          {/* Partner Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="flames-partner-name"
              className="block font-heading text-sm font-semibold"
              style={labelStyle}
            >
              {t("calculator.partnerName", language)} *
            </label>
            <input
              id="flames-partner-name"
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Enter your partner's name"
              className="w-full px-4 py-2.5 rounded-lg text-sm font-body outline-none transition-all"
              style={inputStyle}
              data-ocid="flames-calc.partner_name_input"
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
            data-ocid="flames-calc.calculate_button"
          >
            {t("calculator.calculate", language)} FLAMES
          </button>
        </div>

        {/* ── Results ── */}
        {result && (
          <div
            id="flames-results"
            className="rounded-2xl p-6 space-y-5 text-center"
            style={{
              background: result.bgColor,
              border: `2px solid ${result.borderColor}`,
              boxShadow: `0 0 32px ${result.borderColor}`,
            }}
            data-ocid="flames-calc.result"
          >
            {/* Big letter result */}
            <div>
              <div
                className="font-heading text-7xl md:text-8xl font-bold leading-none mb-2"
                style={{ color: result.color }}
              >
                {result.letter}
              </div>
              <div
                className="font-heading text-xl font-bold"
                style={{ color: result.color }}
              >
                {result.letter} — {result.label}
              </div>
            </div>

            {/* Names */}
            <div
              className="font-heading text-base font-medium"
              style={{ color: "oklch(0.80 0.05 70)" }}
            >
              {yourName.trim()} &amp; {partnerName.trim()}
            </div>

            {/* Compatibility bar */}
            <div className="space-y-1.5">
              <div
                className="flex justify-between font-heading text-xs font-semibold"
                style={{ color: "oklch(0.65 0.05 60)" }}
              >
                <span>{t("calculator.compatibility", language)}</span>
                <span style={{ color: result.color }}>
                  {result.compatibilityScore}%
                </span>
              </div>
              <div
                className="w-full h-3 rounded-full overflow-hidden"
                style={{ background: "oklch(0.18 0.04 25)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${result.compatibilityScore}%`,
                    background: `linear-gradient(90deg, ${result.color}, oklch(0.78 0.14 75))`,
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <p
              className="font-body text-sm leading-relaxed max-w-lg mx-auto"
              style={{ color: "oklch(0.75 0.05 65)" }}
            >
              {result.description}
            </p>

            {/* Note */}
            <p
              className="font-body text-xs italic"
              style={{ color: "oklch(0.58 0.05 60)" }}
            >
              Try different name variations to explore different possible
              outcomes!
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() =>
                  exportToPdf(
                    "flames-results",
                    "flames-result",
                    "FLAMES Calculator Result",
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background: "oklch(0.22 0.06 25)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                }}
                data-ocid="flames-calc.export_pdf_button"
              >
                {t("calculator.exportPdf", language)}
              </button>
              <a
                href="/astrologer-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                }}
                data-ocid="flames-calc.consult_astrologer_link"
              >
                Talk to Astrologer
              </a>
            </div>
          </div>
        )}

        {/* ── Informational Content ── */}
        <InfoSection title="Flames Calculator: Understanding Love Compatibility">
          <p>
            If you grew up in India, chances are you've tried this game during
            school or college, giggling with friends while secretly hoping the
            result said "Love" or "Marriage." But beyond the fun, FLAMES can
            actually be a great icebreaker — it opens up light-hearted
            conversations that can sometimes lead to deeper reflections on
            compatibility.
          </p>
        </InfoSection>

        <InfoSection title="What is Flames?" alternate>
          <p>
            Remember those school days when you'd scribble names on the last
            page of your notebook, cross out matching letters, and eagerly wait
            to see what FLAMES said about your crush? It wasn't just a silly
            game — it had a whole vibe. FLAMES stands for Friendship, Love,
            Affection, Marriage, Enemy, and Sister/Brother, each representing a
            possible bond between two names.
          </p>
          <p>
            From classrooms in Delhi to college canteens in Chennai, FLAMES has
            been a go-to game for curious hearts. Whether it was about a secret
            crush or your bench partner, it added a spark to everyday life. And
            over time, it's become more than just a pastime — it's a fun way to
            explore what kind of chemistry two people might share.
          </p>
          <p>
            The idea is simple: names carry energy. FLAMES plays on that,
            turning letters into potential outcomes. And while it's not a
            science, it definitely gets people thinking and talking about what
            makes relationships click.
          </p>
        </InfoSection>

        <InfoSection title="What is a Flames Calculator?">
          <p>
            Remember the classic Flames game many of us played in school with
            pen and paper, trying to decode the future of our crushes? A Flames
            calculator takes that same nostalgic charm and gives it a modern
            twist: no scribbling, no counting, just instant results with a
            click.
          </p>
          <p>
            All you have to do is type in your name and the other person's, and
            the tool handles the rest using the age-old Flames logic. Some
            versions even throw in compatibility scores or sweet explanations
            behind what "L," "A," or "M" actually mean for your bond.
          </p>
          <p>
            Flames calculators are a fun way to spark conversations, revisit
            memories, or just enjoy a little romantic curiosity with zero maths
            involved.
          </p>
        </InfoSection>

        <InfoSection title="How Does This Flames Calculator Work?" alternate>
          <p>
            You've probably played the FLAMES game at some point with a mix of
            excitement, curiosity, and a little nervous laughter. But have you
            ever wondered how it actually works behind the scenes? The FLAMES
            calculator isn't just a fun pastime — it follows a clear logic based
            on the letters in your names.
          </p>
          <div className="space-y-3 mt-2">
            {[
              {
                step: "Step 1: Name Input",
                desc: "This is where you enter both names just the way you want them checked. The calculator breaks down each name letter by letter, so spelling makes a difference.",
              },
              {
                step: "Step 2: Letter Counting",
                desc: "Here, the tool identifies how many letters appear in both names and removes the common ones. What's left are the unmatched letters, and those become the base for the next step.",
              },
              {
                step: "Step 3: Total Calculation",
                desc: "The unique leftover letters are counted to get a final number. This number is what drives the next stage. Most calculators are pretty accurate and auto-check for errors so the count stays correct.",
              },
              {
                step: "Step 4: FLAMES Elimination",
                desc: 'Using the final number, the calculator cycles through F-L-A-M-E-S repeatedly, removing one letter each round until only one is left. That final letter is your relationship tag — like "L" for Love or "M" for Marriage.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-3">
                <div
                  className="shrink-0 font-heading font-bold text-xs mt-0.5"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {item.step.split(":")[0]}:
                </div>
                <p>
                  <strong style={{ color: "oklch(0.80 0.06 70)" }}>
                    {item.step.split(": ")[1]}
                  </strong>{" "}
                  — {item.desc}
                </p>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="What is the Meaning of Each Letter in FLAMES Calculator?">
          <p>
            You've probably tried the FLAMES game at some point — maybe during
            school days with friends or out of curiosity when thinking about
            someone special. But there's more to those letters than just fun.
            Each one gives a light-hearted peek into the kind of bond you might
            share with someone.
          </p>
          <div className="space-y-3 mt-2">
            {Object.values(FLAMES_MAP).map((item) => (
              <div
                key={item.letter}
                className="flex gap-3 p-3 rounded-xl"
                style={{ background: "oklch(0.18 0.04 25)" }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-heading font-bold text-lg"
                  style={{
                    background: item.bgColor,
                    color: item.color,
                    border: `1px solid ${item.borderColor}`,
                  }}
                >
                  {item.letter}
                </div>
                <div>
                  <span
                    className="font-heading font-semibold text-sm"
                    style={{ color: item.color }}
                  >
                    {item.letter} – {item.label}
                  </span>
                  <p className="text-xs mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection title="What Do the Results Mean?" alternate>
          <p>
            FLAMES results can be fun to explore, but they're more than just
            childhood games or quick fixes for love answers. When interpreted
            thoughtfully, they offer useful insights into how two people might
            vibe emotionally or mentally over time — but they also come with
            their limits.
          </p>
          <p>
            Positive results like Love, Marriage, or Affection usually point
            toward emotional compatibility or shared values. It means there's
            potential for deep connection, but remember it's not a shortcut to a
            perfect relationship. Real love still needs effort, honest
            communication, and mutual respect to actually work.
          </p>
          <p>
            Neutral outcomes such as Friendship often get overlooked, but in
            reality, they're underrated gems. Some of the strongest and most
            lasting relationships are built on trust, understanding, and
            companionship. Just because it's "friendship" now doesn't mean love
            can't grow from there.
          </p>
          <p>
            Challenging results like Enemy might sound scary, but don't jump to
            conclusions. This often signals personality clashes or communication
            gaps — not doom. Opposites can attract if both people are open to
            learning and adapting. Timing plays a big role too. A Flames result
            from school days won't necessarily apply to your current
            relationship.
          </p>
        </InfoSection>

        <InfoSection title="How to Use the Flames Calculator Percentage?">
          <p>
            Those percentage results add another layer to the story. These
            numbers give you a quick sense of how smooth (or tricky) a
            connection might be with someone, based on the vibes your names
            create together.
          </p>
          <ul className="space-y-2 list-none pl-0">
            {[
              {
                range: "Above 70%",
                meaning:
                  "Strong compatibility. You two naturally click, finish each other's sentences, or just feel seen.",
              },
              {
                range: "40–70%",
                meaning:
                  "There's potential, but it might take some extra understanding and effort to make things work. Like a slow-cooked biryani — takes time, but worth it.",
              },
              {
                range: "Below 40%",
                meaning:
                  "Don't panic! It might mean you have different approaches or that timing isn't perfect — but with maturity, even these connections can grow.",
              },
            ].map((item) => (
              <li key={item.range} className="flex gap-3">
                <span
                  className="shrink-0 font-heading font-bold text-xs mt-0.5 w-20"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {item.range}:
                </span>
                <span>{item.meaning}</span>
              </li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title="Why Use a Flames Calculator?" alternate>
          <p>
            Using a FLAMES calculator isn't just about reliving childhood fun —
            it can actually give you playful insight into your love life and
            help break the ice in ways you didn't expect.
          </p>
          <p>
            Ever found yourself unsure how to talk about feelings or test the
            waters with someone you like? Sharing FLAMES results can open up
            conversations in a chill, non-cringe way. It gives you something fun
            to talk about — be it love, friendship, or compatibility — which
            often leads to honest chats about expectations and values without
            feeling awkward.
          </p>
          <p>
            What makes it more personal is how your reactions reveal what you
            really feel. If a result makes you secretly happy or unexpectedly
            sad, it says something about your emotions. There's also something
            beautifully desi about it — almost every Indian teen has played
            FLAMES at some point. It's a shared tradition that connects us
            across generations.
          </p>
        </InfoSection>

        <InfoSection title="What are the Limitations of the Flames Calculator?">
          <p>
            Let's be honest — almost all of us have tried the FLAMES calculator
            at some point. But understanding its limitations can save you from
            taking it too seriously or letting it influence real-life decisions.
          </p>
          <p>
            First things first — FLAMES has zero scientific backing. It's a game
            based on letter counts, not actual emotional compatibility or
            relationship depth. The biggest drawback is that it's entirely
            name-dependent. It doesn't consider your personality, emotional
            maturity, or life goals. Even a small change like adding a nickname
            or using a married name can flip the outcome completely.
          </p>
          <p>
            Then there's the issue of oversimplification. Real relationships are
            complex — they thrive on trust, communication, values, and shared
            experiences. But FLAMES shrinks everything into just six categories,
            which can never capture the full picture. There's also a layer of
            cultural bias, and timing matters — a "Enemy" result today doesn't
            define a relationship six months from now.
          </p>
          <p>
            So, should you stop using FLAMES? Not at all. Have fun with it, joke
            about the results, or use it to start a conversation. Just remember
            it's a fun activity, not a life compass. The real insights come from
            knowing each other, talking honestly, and growing together.
          </p>
        </InfoSection>

        <InfoSection title="Conclusion" alternate>
          <p>
            The Flames calculator is a fun and lighthearted way to explore how
            your name matches with someone else's, sparking interesting
            conversations about love, friendship, and compatibility. Think of it
            as a playful game that gets people talking — but remember it's just
            one piece of the puzzle.
          </p>
          <p>
            Real relationships need more than just name-based results — they
            grow with honest communication, respect, and shared values. Whether
            your result says Friend, Love, Marriage, or even Enemy, the real
            magic lies in how you choose to connect and understand each other.
            When you're ready to dive deeper, talking to a counselor or
            astrologer on Spiritual Connect can offer clearer insights tailored
            to your unique relationship.
          </p>
          <p>
            At the end of the day, relationships are about personal growth,
            trust, and the moments you share — not just numbers or names. So
            enjoy the fun of Flames, but keep your heart open to real connection
            and meaningful conversations that truly matter.
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
          data-ocid="flames-calc.discover_more"
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
            data-ocid="flames-calc.all_calculators_link"
          >
            {t("calculator.exploreCalculators", language).split(".")[0]} →
          </a>
        </div>

        {/* ── FAQs ── */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "oklch(0.19 0.06 26)",
            border: "1px solid oklch(0.78 0.14 75 / 0.15)",
          }}
          data-ocid="flames-calc.faqs"
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
                data-ocid={`flames-calc.faq.item.${i + 1}`}
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
