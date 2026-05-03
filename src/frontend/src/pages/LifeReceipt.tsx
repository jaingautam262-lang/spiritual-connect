import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface ReceiptItem {
  name: string;
  score: number;
  category: string;
  impact?: string;
}

interface ReceiptData {
  overallScore: number;
  status: string;
  suggestion: string;
  items: ReceiptItem[];
}

// ── Mock / example data ────────────────────────────────────────────────────────
const EXAMPLE_RECEIPT: ReceiptData = {
  overallScore: -2,
  status: "Productive but emotionally drained",
  suggestion:
    "Tomorrow, try to protect your first hour of the day. It's your most valuable asset.",
  items: [
    {
      name: "Overworking (9hrs no break)",
      score: -7,
      category: "Energy",
      impact: "-7 Energy",
    },
    {
      name: "Gym session (with guilt)",
      score: 1,
      category: "Energy",
      impact: "+3 Energy  -2 Peace",
    },
    {
      name: "Social media scrolling",
      score: -9,
      category: "Time",
      impact: "-9 Time",
    },
    {
      name: "Deep talk with partner",
      score: 8,
      category: "Connection",
      impact: "+8 Connection",
    },
    {
      name: "Skipped lunch",
      score: -3,
      category: "Energy",
      impact: "-3 Energy",
    },
    {
      name: "Read 20 pages before bed",
      score: 4,
      category: "Peace",
      impact: "+4 Peace",
    },
  ],
};

// ── Ring SVG ───────────────────────────────────────────────────────────────────
const RING_META: Array<{ label: string; color: string; r: number }> = [
  { label: "Energy", color: "#f97316", r: 45 },
  { label: "Peace", color: "#3b82f6", r: 55 },
  { label: "Time", color: "#a855f7", r: 65 },
  { label: "Connection", color: "#22c55e", r: 75 },
  { label: "Productivity", color: "#d4a853", r: 85 },
];

function scoreToPercent(score: number) {
  return Math.max(0, Math.min(100, ((score + 10) / 20) * 100));
}

function RingVisualization({
  items,
  overallScore,
}: { items: ReceiptItem[]; overallScore: number }) {
  const catScores: Record<string, number[]> = {};
  for (const it of items) {
    if (!catScores[it.category]) catScores[it.category] = [];
    catScores[it.category].push(it.score);
  }
  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const ringScores: Record<string, number> = {
    Energy: catScores.Energy ? avg(catScores.Energy) : 0,
    Peace: catScores.Peace ? avg(catScores.Peace) : 3,
    Time: catScores.Time ? avg(catScores.Time) : -2,
    Connection: catScores.Connection ? avg(catScores.Connection) : 5,
    Productivity: catScores.Productivity ? avg(catScores.Productivity) : 2,
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        className="overflow-visible"
        aria-label="Daily score ring visualization"
        role="img"
      >
        {RING_META.map((ring) => {
          const score = ringScores[ring.label] ?? 0;
          const pct = scoreToPercent(score);
          const circ = 2 * Math.PI * ring.r;
          const dash = (pct / 100) * circ;
          return (
            <g key={ring.label}>
              <circle
                cx={120}
                cy={120}
                r={ring.r}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <circle
                cx={120}
                cy={120}
                r={ring.r}
                fill="none"
                stroke={ring.color}
                strokeWidth="8"
                strokeDasharray={`${dash} ${circ}`}
                strokeLinecap="round"
                transform="rotate(-90 120 120)"
                style={{
                  transition: "stroke-dasharray 0.8s ease",
                  opacity: 0.9,
                }}
              />
              <text
                x={120 + ring.r + 6}
                y={124}
                fontSize="9"
                fill={ring.color}
                fontFamily="monospace"
              >
                {ring.label}
              </text>
            </g>
          );
        })}
        <text
          x="120"
          y="113"
          textAnchor="middle"
          fontSize="28"
          fontWeight="bold"
          fill={overallScore >= 0 ? "#22c55e" : "#ef4444"}
          fontFamily="monospace"
        >
          {overallScore > 0 ? `+${overallScore}` : overallScore}
        </text>
        <text
          x="120"
          y="132"
          textAnchor="middle"
          fontSize="10"
          fill="#9ca3af"
          fontFamily="monospace"
        >
          / 10
        </text>
      </svg>
      <div className="flex flex-wrap gap-2 justify-center">
        {RING_META.map((r) => (
          <span
            key={r.label}
            className="text-xs font-mono flex items-center gap-1"
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: r.color }}
            />
            <span style={{ color: r.color }}>{r.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Receipt Output ─────────────────────────────────────────────────────────────
function ReceiptOutput({
  data,
  onClose,
}: { data: ReceiptData; onClose: () => void }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleShare = async () => {
    const lines = data.items.map(
      (i) => `${i.name}: ${i.score > 0 ? "+" : ""}${i.score}/10`,
    );
    const text = `LIFE RECEIPT — ${dateStr}\nOverall Score: ${data.overallScore}/10\nStatus: ${data.status}\n\n${lines.join("\n")}\n\nSuggestion: ${data.suggestion}`;
    try {
      await navigator.clipboard.writeText(text);
      alert("Receipt copied to clipboard!");
    } catch {
      alert("Could not copy — please select and copy manually.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto" data-ocid="receipt.output">
      <div
        className="rounded-lg overflow-hidden border"
        style={{
          background: "#111",
          borderColor: "#333",
          fontFamily: "Courier New, monospace",
        }}
      >
        {/* Header */}
        <div
          className="px-6 pt-6 pb-4 text-center border-b"
          style={{ borderColor: "#333" }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-1"
            style={{ color: "#d4a853" }}
          >
            ◈ vol. 01 — self-awareness engine ◈
          </p>
          <h2
            className="text-2xl font-bold tracking-widest mb-1"
            style={{ color: "#f5f0e8" }}
          >
            LIFE RECEIPT
          </h2>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            {dateStr}
          </p>
          <p className="text-xs" style={{ color: "#6b7280" }}>
            {timeStr}
          </p>
        </div>
        {/* Ring + Overall Score */}
        <div
          className="px-6 py-6 border-b text-center"
          style={{ borderColor: "#333", background: "#0d0d0d" }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "#9ca3af" }}
          >
            Overall Score
          </p>
          <RingVisualization
            items={data.items}
            overallScore={data.overallScore}
          />
          <div className="mt-4">
            <span
              className="text-4xl font-bold font-mono"
              style={{ color: data.overallScore >= 0 ? "#22c55e" : "#ef4444" }}
            >
              {data.overallScore > 0
                ? `+${data.overallScore}`
                : data.overallScore}
            </span>
            <span className="text-xl font-mono" style={{ color: "#6b7280" }}>
              {" "}
              / 10
            </span>
          </div>
          <p className="text-sm mt-2" style={{ color: "#9ca3af" }}>
            {data.overallScore < 0
              ? "Draining day"
              : data.overallScore < 4
                ? "Mixed day"
                : "Positive day"}
          </p>
          <div
            className="flex items-center justify-center gap-2 mt-2 text-xs font-mono"
            style={{ color: "#6b7280" }}
          >
            <span>−10</span>
            <span>←────</span>
            <span style={{ color: "#f5f0e8" }}>0</span>
            <span>────→</span>
            <span>+10</span>
          </div>
        </div>
        {/* Per-item scores */}
        <div className="px-6 py-4 border-b" style={{ borderColor: "#333" }}>
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "#9ca3af" }}
          >
            Line Items
          </p>
          {data.items.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center py-1.5 border-b last:border-0 text-sm font-mono"
              style={{ borderColor: "#222" }}
            >
              <span
                style={{ color: "#e5e7eb" }}
                className="truncate pr-4 max-w-xs"
              >
                {item.name}
              </span>
              <span
                style={{ color: item.score >= 0 ? "#22c55e" : "#ef4444" }}
                className="whitespace-nowrap font-bold"
              >
                {item.score > 0 ? `+${item.score}` : item.score} / 10
              </span>
            </div>
          ))}
        </div>
        {/* Impact table */}
        <div className="px-6 py-4 border-b" style={{ borderColor: "#333" }}>
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "#9ca3af" }}
          >
            Impact Breakdown
          </p>
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b" style={{ borderColor: "#333" }}>
                <th
                  className="text-left py-1.5 pr-4 font-normal"
                  style={{ color: "#6b7280" }}
                >
                  Item
                </th>
                <th
                  className="text-right py-1.5 font-normal"
                  style={{ color: "#6b7280" }}
                >
                  Impact
                </th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr
                  key={item.name}
                  className="border-b last:border-0"
                  style={{ borderColor: "#1f1f1f" }}
                >
                  <td className="py-1.5 pr-4" style={{ color: "#d1d5db" }}>
                    {item.name.length > 22
                      ? `${item.name.slice(0, 22)}…`
                      : item.name}
                  </td>
                  <td
                    className="py-1.5 text-right"
                    style={{ color: item.score >= 0 ? "#22c55e" : "#ef4444" }}
                  >
                    {item.impact ??
                      `${item.score > 0 ? "+" : ""}${item.score} ${item.category}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Day Status + Suggestion */}
        <div className="px-6 py-4 border-b" style={{ borderColor: "#333" }}>
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "#9ca3af" }}
          >
            Day Status
          </p>
          <p
            className="text-sm font-mono font-bold mb-4"
            style={{ color: "#f5f0e8" }}
          >
            "{data.status}"
          </p>
          <div
            className="rounded p-3"
            style={{ background: "#1a1a1a", border: "1px solid #2a2a2a" }}
          >
            <p className="text-xs font-mono" style={{ color: "#d4a853" }}>
              💡 Suggestion
            </p>
            <p className="text-sm font-mono mt-1" style={{ color: "#d1d5db" }}>
              {data.suggestion}
            </p>
          </div>
        </div>
        {/* Locked strategies */}
        <div
          className="px-6 py-4 border-b relative"
          style={{ borderColor: "#333" }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "#9ca3af" }}
          >
            AI Strategy Preview
          </p>
          <div className="space-y-2 blur-sm opacity-50 select-none pointer-events-none">
            <div
              className="rounded p-3 text-xs font-mono"
              style={{ background: "#1a1a1a" }}
            >
              🔒 Emotional drain detected: When your day drains more than it
              gives, the key isn't to push harder — it's to create a
              micro-recovery window…
            </div>
            <div
              className="rounded p-3 text-xs font-mono"
              style={{ background: "#1a1a1a" }}
            >
              🔒 Energy deficit pattern: Your energy output exceeded input
              today. Tomorrow, protect your first 90 minutes…
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="rounded-lg px-4 py-2 text-center"
              style={{ background: "#0a0a0aee" }}
            >
              <p className="text-2xl mb-1">🔒</p>
              <p
                className="text-xs font-mono font-bold"
                style={{ color: "#d4a853" }}
              >
                Premium strategies locked
              </p>
            </div>
          </div>
        </div>
        {/* Footer actions */}
        <div
          className="px-6 py-4 flex flex-wrap gap-3 justify-between items-center"
          style={{ background: "#0d0d0d" }}
        >
          <p className="text-xs font-mono" style={{ color: "#4b5563" }}>
            ◉ LifeReceipt™ — self-awareness engine ◉
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="text-xs font-mono px-4 py-2 rounded transition-all"
              style={{
                background: "#1f1f1f",
                color: "#f5f0e8",
                border: "1px solid #333",
              }}
              data-ocid="receipt.share_button"
            >
              Share ↗
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-mono px-4 py-2 rounded transition-all"
              style={{
                background: "#1f1f1f",
                color: "#9ca3af",
                border: "1px solid #222",
              }}
              data-ocid="receipt.close_button"
            >
              ✕ Close
            </button>
          </div>
        </div>
      </div>
      {/* Premium CTA */}
      <div
        className="mt-4 rounded-lg p-4 text-center"
        style={{ background: "#1a1a0a", border: "1px solid #d4a85333" }}
      >
        <p className="text-sm font-mono mb-2" style={{ color: "#d4a853" }}>
          Unlock full strategies →
        </p>
        <button
          type="button"
          className="text-sm font-mono font-bold px-6 py-2 rounded-lg transition-all"
          style={{ background: "#d4a853", color: "#0a0a0a" }}
          data-ocid="receipt.premium_cta_button"
        >
          Start Free Trial — 3 Days Premium
        </button>
      </div>
    </div>
  );
}

// ── Premium badge ──────────────────────────────────────────────────────────────
function PremiumBadge() {
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded ml-2 align-middle"
      style={{
        background: "#d4a85322",
        color: "#d4a853",
        border: "1px solid #d4a85344",
      }}
    >
      Premium
    </span>
  );
}

// ── Heatmap grid ──────────────────────────────────────────────────────────────
const HEATMAP_DATA: number[][] = Array.from({ length: 12 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => {
    const base =
      Math.sin((week * 7 + day) * 0.4) * 4 + Math.cos(week * 0.8) * 3;
    return Math.round(
      Math.max(-10, Math.min(10, base + (Math.random() > 0.7 ? 3 : -1))),
    );
  }),
);

function heatColor(score: number) {
  if (score >= 6) return "#15803d";
  if (score >= 3) return "#22c55e";
  if (score >= 0) return "#4b5563";
  if (score >= -3) return "#dc2626";
  return "#7f1d1d";
}

// ── Static data arrays ────────────────────────────────────────────────────────
const HERO_TAGLINES = [
  "You're losing hours of your life without even realizing it",
  "This receipt shows exactly where you wasted your day",
  "Your daily life… in numbers (and you're going to like it)",
  "Detects invisible energy drains",
  "Visualize your day like never before",
  "Discover hidden patterns",
  "Share your receipt in editorial style",
];

const COMPARISON_ROWS = [
  {
    feature: "Level of precision",
    good: "Specialized & based on emotional science. Analysis focused on real self-awareness.",
    bad: "Standard, probabilistic responses. Can miss important issues.",
  },
  {
    feature: "Structure of analysis",
    good: "Clear, visual, and actionable results. You know exactly what step to take.",
    bad: "Dense blocks of text. Unstructured answers can generate confusion.",
  },
  {
    feature: "Capability to detect emotions",
    good: "High (Focused on blind spots). Identifies hidden patterns instantly.",
    bad: "Low (Tends to be overly agreeable). Not designed for this type of analysis.",
  },
  {
    feature: "Quality of strategies",
    good: "Personalized & science-backed. Protects your time and mental energy.",
    bad: "Generic self-help advice. A mistake here can cost months of progress.",
  },
];

const HOW_STEPS = [
  {
    num: "01",
    title: "Write your day",
    desc: "Tell us what happened — raw, honest, unfiltered. No structure needed.",
  },
  {
    num: "02",
    title: "AI analyzes it",
    desc: "Our AI decodes your energy flows, time sinks, and emotional patterns.",
  },
  {
    num: "03",
    title: "Get your LifeReceipt",
    desc: "A beautiful, shareable receipt that reveals what your day really cost you.",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus Thorne",
    loc: "Seattle, WA",
    quote:
      "I used to feel guilty every Sunday because I felt like I did 'nothing'. LifeReceipt showed me that my energy wasn't disappearing—it was being drained by micro-decisions I wasn't even tracking. Seeing it as a receipt changed how I value my rest.",
  },
  {
    name: "Elena Rodriguez",
    loc: "Austin, TX",
    quote:
      "As a founder, I'm used to tracking revenue, but I never tracked my own burnout. This app caught a 'spending leak' in my emotional energy that my calendar completely missed. It's the first time productivity software actually felt human.",
  },
  {
    name: "Naomi Park",
    loc: "Brooklyn, NY",
    quote:
      "The interface is so clean it's almost meditative. Most apps add to my digital noise, but LifeReceipt actually helps me filter it. I finally have a clear answer when I ask myself why I'm exhausted at 4 PM.",
  },
  {
    name: "Sarah Jenkins",
    loc: "Palo Alto, CA",
    quote:
      "I was skeptical about another tracker, but the AI insights are eerily accurate. It pointed out that my 'quick' morning emails were costing me 40% of my daily creative focus. That realization alone is worth ten times the subscription.",
  },
  {
    name: "David Miller",
    loc: "Chicago, IL",
    quote:
      "Finally, an app that understands energy is more important than time. The 'Life Receipt' format is genius—it makes my day-to-day choices feel tangible. I've stopped overcommitting because I can finally see the literal price of my YES.",
  },
];

const STRATEGY_CARDS = [
  {
    trigger: "Poor sleep quality → -5 Energy",
    strategy:
      "Try the 10-3-2-1 rule: no caffeine 10hrs before bed, no food 3hrs, no work 2hrs, no screens 1hr.",
    badge: "Energy Recovery",
    pct: "78%",
  },
  {
    trigger: "Stress & anxiety → -6 Peace",
    strategy:
      "Box breathing (4-4-4-4) for 3 minutes. Research shows it activates your parasympathetic nervous system within 90 seconds.",
    badge: "Peace Restoration",
    pct: "85%",
  },
  {
    trigger: "Overworking (9hrs) → -7 Energy",
    strategy:
      "Implement the Pomodoro boundary: after 4 focused blocks, take a 30-min nature walk. Your brain consolidates learning during rest.",
    badge: "Burnout Prevention",
    pct: "72%",
  },
  {
    trigger: "Social media scrolling → -9 Time",
    strategy:
      "Replace the first 15 min of scrolling with a voice note to someone you care about. Same dopamine, real connection.",
    badge: "Time Reclaimed",
    pct: "91%",
  },
];

const STREAK_ROWS = [
  {
    cat: "Energy",
    days: 5,
    msg: "You've maintained positive Energy for 5 days straight! Net +3 today.",
    color: "#f97316",
  },
  {
    cat: "Peace",
    days: 3,
    msg: "Positive Peace for 3 days straight! Net +2 today.",
    color: "#3b82f6",
  },
  {
    cat: "Connection",
    days: 7,
    msg: "You've maintained positive Connection for 7 days straight! Net +4 today.",
    color: "#22c55e",
  },
  {
    cat: "Productivity",
    days: 4,
    msg: "Positive Productivity for 4 days straight! Net +2 today.",
    color: "#d4a853",
  },
  {
    cat: "Time",
    days: 2,
    msg: "Positive Time for 2 days straight! Net +1 today.",
    color: "#a855f7",
  },
];

const BADGES = [
  { emoji: "🌅", name: "Early Bird", desc: "5-day morning routine streak" },
  { emoji: "🧘", name: "Zen Master", desc: "10 days of positive Peace" },
  { emoji: "⚡", name: "Power Week", desc: "7 days above +3 score" },
  { emoji: "🔥", name: "On Fire", desc: "14-day reflection streak" },
];

const BENCHMARKS = [
  {
    cat: "Energy",
    yours: 6.2,
    avg: 4.1,
    msg: "Your Energy is higher than 78% of users this week",
    rank: "Top 22%",
    color: "#f97316",
  },
  {
    cat: "Peace",
    yours: 3.8,
    avg: 5.2,
    msg: "Below average — 65% of similar users improved with meditation",
    rank: "Top 65%",
    color: "#3b82f6",
  },
  {
    cat: "Productivity",
    yours: 7.1,
    avg: 5.5,
    msg: "Top 18%! Your work patterns are highly effective",
    rank: "Top 18%",
    color: "#d4a853",
  },
  {
    cat: "Connection",
    yours: 4.5,
    avg: 4.8,
    msg: "Slightly below avg — try one extra meaningful conversation",
    rank: "Top 55%",
    color: "#22c55e",
  },
  {
    cat: "Time",
    yours: 5.9,
    avg: 4.3,
    msg: "Better time management than most — keep protecting boundaries",
    rank: "Top 29%",
    color: "#a855f7",
  },
];

interface Challenge {
  title: string;
  status: "active" | "upcoming";
  desc: string;
  based: string;
  gain: string;
  unlockMsg?: string;
}

const CHALLENGES: Challenge[] = [
  {
    title: "The 'Done' List",
    status: "active",
    desc: "Write down three tasks you successfully completed today, no matter how small, to shift focus from perceived failure to actual effort.",
    based: "Self-Blame for Performance Impact",
    gain: "+4 Peace, +2 Self-Compassion",
  },
  {
    title: "Sanctuary Shield",
    status: "active",
    desc: "Create a physical buffer by cleaning your immediate space or using noise-canceling headphones to reclaim your personal 'territory' for one hour.",
    based: "Toxic Workplace Environment",
    gain: "+5 Peace, +3 Focus",
  },
  {
    title: "Nervous System Reset",
    status: "upcoming",
    desc: "Perform 5 minutes of 'Box Breathing' (inhale 4, hold 4, exhale 4, hold 4) to manually reset your nervous system from fight-or-flight.",
    based: "Emotional Shock / Fight-or-Flight",
    gain: "+6 Energy, +4 Calm",
    unlockMsg: "Unlocks after completing Sanctuary Shield",
  },
  {
    title: "Cognitive Eraser",
    status: "upcoming",
    desc: "Engage in a 'Monotasking Sprint'—turn off all notifications and work on one single, non-work-related hobby or task that brings you joy.",
    based: "Disrupted Workflow & Focus",
    gain: "+7 Productivity, +3 Flow State",
    unlockMsg: "Unlocks tomorrow morning",
  },
];

const PREMIUM_FEATURES = [
  "AI mitigation strategies",
  "Streak & habit tracker",
  "Mood heatmap",
  "Anonymous benchmarking",
  "Daily micro-challenges",
  "Voice-to-Receipt",
  "Weekly & monthly trends",
  "Exclusive visual themes",
];

const VOICE_TRANSCRIPT = [
  { t: "0:03", txt: "Today was kind of rough honestly…" },
  { t: "0:08", txt: "I woke up late again, skipped breakfast" },
  { t: "0:14", txt: "But then I had a really great call with my mom" },
  { t: "0:22", txt: "Work was intense, like 10 hours straight" },
  { t: "0:30", txt: "Went for a walk after though, that helped a lot" },
];

const VOICE_SENTIMENT = [
  { label: "Stress Level", val: "Medium-High" },
  { label: "Emotional Tone", val: "Reflective" },
  { label: "Energy in Voice", val: "Low" },
  { label: "Positivity Shift", val: "Improving" },
];

// ── Main page component ────────────────────────────────────────────────────────
export default function LifeReceipt() {
  const [dayText, setDayText] = useState("");
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(false);
  const generatorRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(
    new Set(),
  );

  async function buildReceipt(): Promise<ReceiptData> {
    await new Promise((r) => setTimeout(r, 1800));
    const offset = Math.floor(Math.random() * 3) - 1;
    return {
      ...EXAMPLE_RECEIPT,
      overallScore: Math.max(
        -10,
        Math.min(10, EXAMPLE_RECEIPT.overallScore + offset),
      ),
      items: EXAMPLE_RECEIPT.items.map((it) => ({
        ...it,
        score: Math.max(
          -10,
          Math.min(10, it.score + Math.floor(Math.random() * 3) - 1),
        ),
      })),
    };
  }

  async function handleGenerate() {
    if (!dayText.trim()) return;
    setLoading(true);
    setReceipt(null);
    try {
      const data = await buildReceipt();
      setReceipt(data);
      setTimeout(
        () =>
          receiptRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        100,
      );
    } finally {
      setLoading(false);
    }
  }

  function handleExample() {
    setReceipt(EXAMPLE_RECEIPT);
    setTimeout(
      () =>
        receiptRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      100,
    );
  }

  function toggleChallenge(idx: number) {
    setCompletedChallenges((prev) => {
      const s = new Set(prev);
      if (s.has(idx)) {
        s.delete(idx);
      } else {
        s.add(idx);
      }
      return s;
    });
  }

  return (
    <div
      style={{ background: "#0a0a0a", color: "#f5f0e8", minHeight: "100vh" }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center"
        style={{
          background:
            "linear-gradient(180deg, #0a0a0a 0%, #0f0f08 60%, #0a0a0a 100%)",
        }}
        data-ocid="life_receipt.hero.section"
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #d4a853 0%, transparent 60%), radial-gradient(circle at 70% 70%, #d4a853 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-3xl">
          <p
            className="text-xs tracking-[0.3em] uppercase font-mono mb-2"
            style={{ color: "#d4a853" }}
          >
            AI-powered daily analysis
          </p>
          <p
            className="text-xs tracking-[0.2em] font-mono mb-10"
            style={{ color: "#6b7280" }}
          >
            vol. 01 — self-awareness engine
          </p>
          <h1 className="font-mono text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
            <span className="block" style={{ color: "#f5f0e8" }}>
              Your day
            </span>
            <span className="block italic" style={{ color: "#d4a853" }}>
              is not what
            </span>
            <span className="block" style={{ color: "#f5f0e8" }}>
              you think.
            </span>
          </h1>
          <p
            className="text-lg md:text-xl font-mono mb-8"
            style={{ color: "#9ca3af" }}
          >
            Today you spent 6 hours… and you don't know on what.
          </p>
          <ul className="text-left inline-block mb-10 space-y-2">
            {HERO_TAGLINES.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 text-sm font-mono"
                style={{ color: "#9ca3af" }}
              >
                <span style={{ color: "#d4a853" }}>◈</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              type="button"
              onClick={() =>
                generatorRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="px-8 py-3 rounded-lg font-mono font-bold text-sm tracking-widest uppercase transition-all"
              style={{ background: "#d4a853", color: "#0a0a0a" }}
              data-ocid="hero.generate_button"
            >
              Generate my receipt now
            </button>
            <button
              type="button"
              onClick={handleExample}
              className="px-8 py-3 rounded-lg font-mono font-bold text-sm tracking-widest uppercase transition-all"
              style={{
                border: "1px solid #d4a853",
                color: "#d4a853",
                background: "transparent",
              }}
              data-ocid="hero.example_button"
            >
              See a real example
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { val: "600+", label: "Receipts generated" },
              { val: "4.7", label: "User rating" },
              { val: "62%", label: "Weekly active users" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-4 text-center"
                style={{ background: "#111", border: "1px solid #222" }}
              >
                <p
                  className="text-2xl font-mono font-black"
                  style={{ color: "#d4a853" }}
                >
                  {s.val}
                </p>
                <p
                  className="text-xs font-mono mt-1"
                  style={{ color: "#6b7280" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI THAT REMEMBERS ─────────────────────────────────────────── */}
      <section
        className="px-6 py-20 max-w-3xl mx-auto"
        style={{ borderTop: "1px solid #1a1a1a" }}
      >
        <p
          className="text-3xl font-mono font-bold mb-2"
          style={{ color: "#f5f0e8" }}
        >
          🧠 AI That Remembers
        </p>
        <p className="text-base font-mono mb-4" style={{ color: "#d4a853" }}>
          This AI doesn't forget. It tracks your patterns week after week.
        </p>
        <p
          className="text-sm font-mono mb-8 leading-relaxed"
          style={{ color: "#9ca3af" }}
        >
          Most AI tools analyze one conversation and move on. LifeReceipt builds
          a persistent profile of your habits, energy drains, and blind spots —
          so it can tell you what you can't see yourself.
        </p>
        <div
          className="rounded-lg p-6"
          style={{
            background: "#111",
            border: "1px solid #d4a85333",
            fontFamily: "Courier New, monospace",
          }}
        >
          <p
            className="text-sm leading-relaxed italic mb-3"
            style={{ color: "#e5e7eb" }}
          >
            "You haven't mentioned exercise in 4 weeks. Last time you worked out
            regularly, your average score was +5. Now it's −1."
          </p>
          <p className="text-xs" style={{ color: "#d4a853" }}>
            — Your AI, after your 5th receipt
          </p>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────── */}
      <section
        className="px-6 py-20 max-w-4xl mx-auto"
        style={{ borderTop: "1px solid #1a1a1a" }}
      >
        <h2
          className="text-2xl font-mono font-bold mb-8 text-center"
          style={{ color: "#f5f0e8" }}
        >
          LifeReceipt™ vs Generic AI
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono border-collapse">
            <thead>
              <tr>
                <th
                  className="py-3 px-4 text-left text-xs uppercase tracking-wider"
                  style={{ color: "#6b7280", borderBottom: "1px solid #222" }}
                >
                  Feature
                </th>
                <th
                  className="py-3 px-4 text-left text-xs uppercase tracking-wider"
                  style={{
                    color: "#d4a853",
                    borderBottom: "2px solid #d4a85366",
                    background: "#d4a85308",
                  }}
                >
                  LifeReceipt™ ✓
                </th>
                <th
                  className="py-3 px-4 text-left text-xs uppercase tracking-wider"
                  style={{ color: "#6b7280", borderBottom: "1px solid #222" }}
                >
                  Generic AI (ChatGPT/Claude)
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.feature}
                  style={{ borderBottom: "1px solid #1a1a1a" }}
                >
                  <td
                    className="py-4 px-4 text-xs font-bold"
                    style={{ color: "#9ca3af" }}
                  >
                    {row.feature}
                  </td>
                  <td
                    className="py-4 px-4 text-xs"
                    style={{
                      color: "#e5e7eb",
                      background: "#d4a85306",
                      borderLeft: "2px solid #d4a85344",
                    }}
                  >
                    ✓ {row.good}
                  </td>
                  <td
                    className="py-4 px-4 text-xs"
                    style={{ color: "#6b7280" }}
                  >
                    ✗ {row.bad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section
        className="px-6 py-20"
        style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest font-mono mb-2 text-center"
            style={{ color: "#6b7280" }}
          >
            Simple process
          </p>
          <h2
            className="text-2xl font-mono font-bold mb-2 text-center"
            style={{ color: "#f5f0e8" }}
          >
            How it works
          </h2>
          <p
            className="text-sm font-mono mb-10 text-center"
            style={{ color: "#9ca3af" }}
          >
            Most people have no idea how they're really living their day. Three
            steps to clarity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-lg p-6"
                style={{ background: "#111", border: "1px solid #222" }}
              >
                <p
                  className="text-3xl font-mono font-black mb-3"
                  style={{ color: "#d4a85344" }}
                >
                  {step.num}
                </p>
                <p
                  className="font-mono font-bold mb-2"
                  style={{ color: "#f5f0e8" }}
                >
                  {step.title}
                </p>
                <p className="text-sm font-mono" style={{ color: "#9ca3af" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section
        className="px-6 py-20 max-w-5xl mx-auto"
        style={{ borderTop: "1px solid #1a1a1a" }}
      >
        <h2
          className="text-2xl font-mono font-bold mb-2 text-center"
          style={{ color: "#f5f0e8" }}
        >
          Real users, real receipts
        </h2>
        <p
          className="text-sm font-mono mb-10 text-center"
          style={{ color: "#9ca3af" }}
        >
          What people are saying
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="rounded-lg p-5"
              style={{ background: "#111", border: "1px solid #222" }}
              data-ocid={`testimonial.item.${i + 1}`}
            >
              <p
                className="text-xs font-mono mb-4 leading-relaxed italic"
                style={{ color: "#d1d5db" }}
              >
                "{t.quote}"
              </p>
              <p
                className="text-xs font-mono font-bold"
                style={{ color: "#d4a853" }}
              >
                {t.name}
              </p>
              <p className="text-xs font-mono" style={{ color: "#4b5563" }}>
                {t.loc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RECEIPT GENERATOR ─────────────────────────────────────────── */}
      <section
        ref={generatorRef}
        className="px-6 py-20"
        style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}
        data-ocid="life_receipt.generator.section"
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs tracking-widest uppercase font-mono mb-2 text-center"
            style={{ color: "#d4a853" }}
          >
            ✨ Free — No signup required
          </p>
          <h2
            className="text-2xl font-mono font-bold mb-2 text-center"
            style={{ color: "#f5f0e8" }}
          >
            Try your first LifeReceipt for free, right here.
          </h2>
          <p
            className="text-sm font-mono mb-8 text-center"
            style={{ color: "#9ca3af" }}
          >
            No account, no credit card. Get a real receipt of your day before
            deciding if you want the 3-day Premium free trial.
          </p>
          <div
            className="rounded-lg p-1 mb-4"
            style={{ background: "#111", border: "1px solid #222" }}
          >
            <p
              className="text-xs font-mono px-3 pt-3 pb-1"
              style={{ color: "#4b5563" }}
            >
              Your turn — How was your day?
            </p>
            <Textarea
              value={dayText}
              onChange={(e) => setDayText(e.target.value)}
              placeholder="Example: Today I worked 9 hours straight, went to the gym but felt guilty, lost 1 hour on social media, had a deep conversation with my partner, skipped lunch…"
              rows={6}
              className="resize-none border-0 focus-visible:ring-0 text-sm font-mono"
              style={{
                background: "#111",
                color: "#e5e7eb",
                caretColor: "#d4a853",
              }}
              data-ocid="generator.day_input"
            />
          </div>
          <div className="flex gap-3 mb-8">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading || !dayText.trim()}
              className="flex-1 py-3 rounded-lg font-mono font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-40"
              style={{ background: "#d4a853", color: "#0a0a0a" }}
              data-ocid="generator.print_button"
            >
              {loading ? "Analyzing…" : "Print my receipt"}
            </button>
            <button
              type="button"
              onClick={handleExample}
              className="px-6 py-3 rounded-lg font-mono font-bold text-sm uppercase tracking-widest transition-all"
              style={{
                border: "1px solid #333",
                color: "#9ca3af",
                background: "transparent",
              }}
              data-ocid="generator.example_button"
            >
              Example
            </button>
          </div>
          {loading && (
            <div
              className="text-center py-8 font-mono"
              style={{ color: "#d4a853" }}
              data-ocid="generator.loading_state"
            >
              <p className="text-lg tracking-widest mb-2">ANALYZING</p>
              <p className="text-xs animate-pulse" style={{ color: "#6b7280" }}>
                ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
              </p>
              <p className="text-xs mt-2" style={{ color: "#4b5563" }}>
                Decoding your energy flows and emotional patterns…
              </p>
            </div>
          )}
          {receipt && (
            <div ref={receiptRef}>
              <ReceiptOutput data={receipt} onClose={() => setReceipt(null)} />
            </div>
          )}
        </div>
      </section>

      {/* ── PREMIUM FEATURES ──────────────────────────────────────────── */}
      <section
        className="px-6 py-20 max-w-5xl mx-auto"
        style={{ borderTop: "1px solid #1a1a1a" }}
      >
        <p
          className="text-xs uppercase tracking-widest font-mono mb-2 text-center"
          style={{ color: "#6b7280" }}
        >
          Premium
        </p>
        <h2
          className="text-2xl font-mono font-bold mb-2 text-center"
          style={{ color: "#f5f0e8" }}
        >
          Everything you unlock with Premium
        </h2>
        <p
          className="text-sm font-mono mb-14 text-center"
          style={{ color: "#9ca3af" }}
        >
          More than a receipt — a complete system to understand, track, and
          improve your daily life.
        </p>

        {/* 7a Persistent Memory */}
        <div
          className="mb-16 rounded-xl p-8"
          style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}
        >
          <h3
            className="text-xl font-mono font-bold mb-1"
            style={{ color: "#f5f0e8" }}
          >
            Persistent Memory — Week After Week
          </h3>
          <p className="text-sm font-mono mb-4" style={{ color: "#9ca3af" }}>
            Your AI connects the dots across all your receipts, detecting hidden
            cycles and recurring triggers.
          </p>
          <div
            className="rounded-lg p-5"
            style={{
              background: "#111",
              border: "1px solid #d4a85322",
              fontFamily: "Courier New, monospace",
            }}
          >
            <p
              className="text-sm italic leading-relaxed mb-2"
              style={{ color: "#e5e7eb" }}
            >
              "This is the third Tuesday in a row your Energy drops after
              meetings with your boss. There's a pattern here."
            </p>
            <p className="text-xs" style={{ color: "#d4a853" }}>
              — Your AI, after your 3rd receipt
            </p>
          </div>
        </div>

        {/* 7b AI Mitigation Strategies */}
        <div className="mb-16">
          <h3
            className="text-xl font-mono font-bold mb-1"
            style={{ color: "#f5f0e8" }}
          >
            AI Mitigation Strategies <PremiumBadge />
          </h3>
          <p className="text-sm font-mono mb-6" style={{ color: "#9ca3af" }}>
            Don't just see what drained you — get personalized, science-backed
            strategies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {STRATEGY_CARDS.map((s) => (
              <div
                key={s.trigger}
                className="rounded-lg p-5"
                style={{ background: "#111", border: "1px solid #222" }}
              >
                <p
                  className="text-xs font-mono font-bold mb-2"
                  style={{ color: "#ef4444" }}
                >
                  {s.trigger}
                </p>
                <p
                  className="text-sm font-mono mb-3 leading-relaxed"
                  style={{ color: "#d1d5db" }}
                >
                  {s.strategy}
                </p>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    background: "#22c55e18",
                    color: "#22c55e",
                    border: "1px solid #22c55e33",
                  }}
                >
                  {s.badge} — {s.pct} effective
                </span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              className="px-6 py-2 rounded-lg font-mono font-bold text-sm transition-all"
              style={{
                background: "#d4a85322",
                color: "#d4a853",
                border: "1px solid #d4a85344",
              }}
              data-ocid="strategies.premium_cta_button"
            >
              Unlock personalized strategies with Premium →
            </button>
          </div>
        </div>

        {/* 7c Streak Tracker */}
        <div className="mb-16">
          <h3
            className="text-xl font-mono font-bold mb-1"
            style={{ color: "#f5f0e8" }}
          >
            Pattern Streaks &amp; Habit Tracker <PremiumBadge />
          </h3>
          <p className="text-sm font-mono mb-6" style={{ color: "#9ca3af" }}>
            Track your positive and negative patterns across 5 life categories
            automatically.
          </p>
          <div className="space-y-3 mb-6">
            {STREAK_ROWS.map((s) => (
              <div
                key={s.cat}
                className="rounded-lg p-4 flex items-center gap-4"
                style={{ background: "#111", border: "1px solid #222" }}
              >
                <div className="text-center min-w-[60px]">
                  <p
                    className="text-2xl font-mono font-black"
                    style={{ color: s.color }}
                  >
                    {s.days}
                  </p>
                  <p className="text-xs font-mono" style={{ color: "#4b5563" }}>
                    days
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-mono font-bold mb-1"
                    style={{ color: s.color }}
                  >
                    {s.cat}
                  </p>
                  <p
                    className="text-xs font-mono truncate"
                    style={{ color: "#9ca3af" }}
                  >
                    {s.msg}
                  </p>
                </div>
                <div
                  className="w-16 h-2 rounded-full overflow-hidden"
                  style={{ background: "#1a1a1a" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(s.days / 7) * 100}%`,
                      background: s.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p
            className="text-sm font-mono font-bold mb-3"
            style={{ color: "#f5f0e8" }}
          >
            Earned Badges
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BADGES.map((b) => (
              <div
                key={b.name}
                className="rounded-lg p-4 text-center"
                style={{ background: "#111", border: "1px solid #222" }}
              >
                <p className="text-2xl mb-1">{b.emoji}</p>
                <p
                  className="text-xs font-mono font-bold mb-1"
                  style={{ color: "#d4a853" }}
                >
                  {b.name}
                </p>
                <p className="text-xs font-mono" style={{ color: "#6b7280" }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7d Mood Heatmap */}
        <div className="mb-16">
          <h3
            className="text-xl font-mono font-bold mb-1"
            style={{ color: "#f5f0e8" }}
          >
            Mood Heatmap <PremiumBadge />
          </h3>
          <p className="text-sm font-mono mb-6" style={{ color: "#9ca3af" }}>
            A visual calendar of your emotional landscape. Spot weekly patterns,
            seasonal trends.
          </p>
          <div
            className="rounded-xl p-6"
            style={{
              background: "#0d0d0d",
              border: "1px solid #1a1a1a",
              overflowX: "auto",
            }}
          >
            <p className="text-xs font-mono mb-3" style={{ color: "#6b7280" }}>
              Last 12 weeks
            </p>
            <div className="flex gap-1 mb-2">
              <div className="w-8" />
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div
                  key={d}
                  className="w-6 text-center text-xs font-mono"
                  style={{ color: "#4b5563" }}
                >
                  {d.slice(0, 1)}
                </div>
              ))}
            </div>
            {HEATMAP_DATA.map((week, wi) => (
              <div
                key={`week-${wi + 1}`}
                className="flex gap-1 mb-1 items-center"
              >
                <div
                  className="w-8 text-xs font-mono text-right pr-1"
                  style={{ color: "#4b5563" }}
                >
                  W{wi + 1}
                </div>
                {week.map((score, di) => (
                  <div
                    key={`cell-${wi}-${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][di]}`}
                    className="w-6 h-6 rounded-sm"
                    title={`Score: ${score}`}
                    style={{ background: heatColor(score), opacity: 0.85 }}
                  />
                ))}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs font-mono" style={{ color: "#6b7280" }}>
                Low
              </span>
              {[-8, -4, 0, 4, 8].map((v) => (
                <div
                  key={`legend-${v}`}
                  className="w-4 h-4 rounded-sm"
                  style={{ background: heatColor(v) }}
                />
              ))}
              <span className="text-xs font-mono" style={{ color: "#6b7280" }}>
                High
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { label: "Best day", val: "Thursdays", sub: "avg +4.2" },
              { label: "Worst day", val: "Mondays", sub: "avg -1.8" },
              { label: "Best week", val: "Week 7", sub: "+5.1 avg" },
              { label: "Trend", val: "Improving ↑", sub: "+12% vs last month" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-3 text-center"
                style={{ background: "#111", border: "1px solid #222" }}
              >
                <p className="text-xs font-mono" style={{ color: "#6b7280" }}>
                  {s.label}
                </p>
                <p
                  className="text-sm font-mono font-bold mt-1"
                  style={{ color: "#d4a853" }}
                >
                  {s.val}
                </p>
                <p className="text-xs font-mono" style={{ color: "#9ca3af" }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7e Daily Micro-Challenges */}
        <div className="mb-16">
          <h3
            className="text-xl font-mono font-bold mb-1"
            style={{ color: "#f5f0e8" }}
          >
            Daily Micro-Challenges <PremiumBadge />
          </h3>
          <p className="text-sm font-mono mb-6" style={{ color: "#9ca3af" }}>
            AI-generated small challenges to break negative cycles, with impact
            tracking.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHALLENGES.map((c, idx) => (
              <div
                key={c.title}
                className="rounded-lg p-5"
                style={{
                  background: "#111",
                  border: `1px solid ${c.status === "active" ? "#d4a85344" : "#222"}`,
                  opacity: c.status === "upcoming" ? 0.7 : 1,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <p
                    className="text-sm font-mono font-bold"
                    style={{ color: "#f5f0e8" }}
                  >
                    {c.title}
                  </p>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      background:
                        c.status === "active" ? "#22c55e18" : "#1a1a1a",
                      color: c.status === "active" ? "#22c55e" : "#6b7280",
                      border: `1px solid ${c.status === "active" ? "#22c55e33" : "#333"}`,
                    }}
                  >
                    {c.status}
                  </span>
                </div>
                <p
                  className="text-xs font-mono mb-3 leading-relaxed"
                  style={{ color: "#9ca3af" }}
                >
                  {c.desc}
                </p>
                <p
                  className="text-xs font-mono mb-1"
                  style={{ color: "#6b7280" }}
                >
                  Based on: {c.based}
                </p>
                <p
                  className="text-xs font-mono mb-3"
                  style={{ color: "#22c55e" }}
                >
                  {c.gain}
                </p>
                {c.status === "active" ? (
                  <button
                    type="button"
                    onClick={() => toggleChallenge(idx)}
                    className="text-xs font-mono px-4 py-1.5 rounded transition-all"
                    style={{
                      background: completedChallenges.has(idx)
                        ? "#22c55e22"
                        : "#d4a85322",
                      color: completedChallenges.has(idx)
                        ? "#22c55e"
                        : "#d4a853",
                      border: `1px solid ${completedChallenges.has(idx) ? "#22c55e44" : "#d4a85344"}`,
                    }}
                    data-ocid={`challenge.complete_button.${idx + 1}`}
                  >
                    {completedChallenges.has(idx)
                      ? "✓ Completed"
                      : "Mark as Completed"}
                  </button>
                ) : (
                  <p className="text-xs font-mono" style={{ color: "#4b5563" }}>
                    {c.unlockMsg}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 7f Anonymous Benchmarking */}
        <div className="mb-16">
          <h3
            className="text-xl font-mono font-bold mb-1"
            style={{ color: "#f5f0e8" }}
          >
            Anonymous Benchmarking <PremiumBadge />
          </h3>
          <p className="text-sm font-mono mb-6" style={{ color: "#9ca3af" }}>
            See how your metrics compare with users who have similar patterns.
            Fully anonymized.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {BENCHMARKS.map((m) => (
              <div
                key={m.cat}
                className="rounded-lg p-4"
                style={{ background: "#111", border: "1px solid #222" }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p
                    className="text-sm font-mono font-bold"
                    style={{ color: m.color }}
                  >
                    {m.cat}
                  </p>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      background: `${m.color}18`,
                      color: m.color,
                      border: `1px solid ${m.color}33`,
                    }}
                  >
                    {m.rank}
                  </span>
                </div>
                <div className="flex gap-4 mb-2">
                  <div>
                    <p
                      className="text-xs font-mono"
                      style={{ color: "#4b5563" }}
                    >
                      You
                    </p>
                    <p
                      className="text-xl font-mono font-black"
                      style={{ color: m.color }}
                    >
                      {m.yours}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-mono"
                      style={{ color: "#4b5563" }}
                    >
                      avg
                    </p>
                    <p
                      className="text-xl font-mono font-black"
                      style={{ color: "#6b7280" }}
                    >
                      {m.avg}
                    </p>
                  </div>
                </div>
                <p
                  className="text-xs font-mono leading-relaxed"
                  style={{ color: "#9ca3af" }}
                >
                  {m.msg}
                </p>
              </div>
            ))}
          </div>
          <p
            className="text-xs font-mono text-center"
            style={{ color: "#4b5563" }}
          >
            Based on 12,847 anonymous users · Updated weekly
          </p>
        </div>

        {/* 7g Voice-to-Receipt Mockup */}
        <div className="mb-16">
          <h3
            className="text-xl font-mono font-bold mb-1"
            style={{ color: "#f5f0e8" }}
          >
            Voice-to-Receipt <PremiumBadge />
          </h3>
          <p className="text-sm font-mono mb-6" style={{ color: "#9ca3af" }}>
            Speak your day instead of typing. AI transcribes, analyzes vocal
            tone and emotional patterns. (Visual mockup)
          </p>
          <div
            className="rounded-xl p-6"
            style={{ background: "#0d0d0d", border: "1px solid #1a1a1a" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "#ef444422",
                    border: "2px solid #ef4444",
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: "#ef4444" }}
                  />
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-red-500 opacity-40 animate-ping" />
              </div>
              <p className="font-mono font-bold" style={{ color: "#ef4444" }}>
                Recording · 0:34
              </p>
            </div>
            <div
              className="rounded-lg p-4 mb-6 space-y-2"
              style={{ background: "#111", border: "1px solid #222" }}
            >
              {VOICE_TRANSCRIPT.map((line) => (
                <div key={line.t} className="flex gap-3 text-sm font-mono">
                  <span
                    className="text-xs"
                    style={{ color: "#4b5563", minWidth: "2.5rem" }}
                  >
                    {line.t}
                  </span>
                  <span style={{ color: "#d1d5db" }}>{line.txt}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {VOICE_SENTIMENT.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg p-3 text-center"
                  style={{ background: "#111", border: "1px solid #222" }}
                >
                  <p className="text-xs font-mono" style={{ color: "#6b7280" }}>
                    {s.label}
                  </p>
                  <p
                    className="text-sm font-mono font-bold mt-1"
                    style={{ color: "#d4a853" }}
                  >
                    {s.val}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="rounded-lg p-4 mb-4"
              style={{ background: "#111", border: "1px solid #d4a85322" }}
            >
              <p
                className="text-xs font-mono mb-1"
                style={{ color: "#d4a853" }}
              >
                Voice Insight
              </p>
              <p
                className="text-sm font-mono leading-relaxed"
                style={{ color: "#d1d5db" }}
              >
                Your tone shifted from stressed to calm when talking about your
                walk. Physical movement appears to be a strong emotional reset
                for you.
              </p>
            </div>
            <p className="text-xs font-mono" style={{ color: "#6b7280" }}>
              Detected in voice but not in text:{" "}
              <span style={{ color: "#9ca3af" }}>
                Fatigue, Nostalgia, Relief
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL PREMIUM CTA ─────────────────────────────────────────── */}
      <section
        className="px-6 py-24 text-center"
        style={{ background: "#0d0d0d", borderTop: "1px solid #1a1a1a" }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="text-xs uppercase tracking-widest font-mono mb-3"
            style={{ color: "#6b7280" }}
          >
            See the full picture
          </p>
          <h2
            className="text-3xl md:text-4xl font-mono font-black mb-3 leading-tight"
            style={{ color: "#f5f0e8" }}
          >
            One receipt is a snapshot.
            <br />
            <span style={{ color: "#d4a853" }}>Patterns are power.</span>
          </h2>
          <p className="text-sm font-mono mb-10" style={{ color: "#9ca3af" }}>
            Unlock AI strategies, trends, and exclusive themes.
          </p>
          <div
            className="rounded-xl p-6 mb-10 text-left"
            style={{ background: "#111", border: "1px solid #222" }}
          >
            <p
              className="text-sm font-mono font-bold mb-3"
              style={{ color: "#f5f0e8" }}
            >
              Persistent Memory — Week After Week
            </p>
            <p
              className="text-xs font-mono mb-4 leading-relaxed"
              style={{ color: "#9ca3af" }}
            >
              Your AI connects the dots across all your receipts, detecting
              hidden cycles and recurring triggers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PREMIUM_FEATURES.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 text-sm font-mono"
                  style={{ color: "#d1d5db" }}
                >
                  <span style={{ color: "#22c55e" }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="px-10 py-4 rounded-xl font-mono font-black text-base uppercase tracking-widest transition-all hover:scale-105"
            style={{
              background: "#d4a853",
              color: "#0a0a0a",
              boxShadow: "0 0 40px #d4a85344",
            }}
            data-ocid="final_cta.start_trial_button"
          >
            Unlock all → Start free trial
          </button>
          <p className="text-xs font-mono mt-4" style={{ color: "#4b5563" }}>
            3-day free trial · No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer
        className="py-8 text-center border-t"
        style={{ borderColor: "#1a1a1a", background: "#0a0a0a" }}
      >
        <p className="text-xs font-mono" style={{ color: "#4b5563" }}>
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#d4a853" }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
