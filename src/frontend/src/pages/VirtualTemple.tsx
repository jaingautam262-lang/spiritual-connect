import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useGetVirtualTempleConfig,
  useSaveVirtualTempleConfig,
} from "../hooks/useQueries";

// ── Bhakti score persisted to localStorage ──────────────────────────────────
const BHAKTI_KEY = "sc_bhakti_score";
function loadBhakti(): number {
  try {
    return Number.parseInt(localStorage.getItem(BHAKTI_KEY) ?? "0", 10) || 0;
  } catch {
    return 0;
  }
}
function saveBhakti(n: number) {
  try {
    localStorage.setItem(BHAKTI_KEY, String(n));
  } catch {
    // ignore
  }
}

// ── Web Audio bell ────────────────────────────────────────────────────────────
function playBell() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // ignore — user may not have interacted yet
  }
}

const OFFERINGS = [
  { id: "flowers", emoji: "🌸", label: "Phool", hindi: "फूल" },
  { id: "diya", emoji: "🪔", label: "Deepak", hindi: "दीपक" },
  { id: "prasad", emoji: "🍚", label: "Prasad", hindi: "प्रसाद" },
  { id: "incense", emoji: "🪄", label: "Dhoop", hindi: "धूप" },
  { id: "coconut", emoji: "🥥", label: "Nariyal", hindi: "नारियल" },
] as const;

const DEITY_SELECTOR = [
  { name: "Shiva", emoji: "🔱" },
  { name: "Vishnu", emoji: "🪷" },
  { name: "Durga", emoji: "⚔️" },
  { name: "Ganesha", emoji: "🐘" },
  { name: "Krishna", emoji: "🪈" },
  { name: "Ram", emoji: "🏹" },
  { name: "Hanuman", emoji: "🐒" },
  { name: "Mahavir", emoji: "🏅" },
  { name: "Guru Nanak", emoji: "✨" },
] as const;

const DEITIES = [
  "Ganesha",
  "Shiva",
  "Vishnu",
  "Durga",
  "Lakshmi",
  "Saraswati",
  "Krishna",
  "Ram",
  "Hanuman",
];
const DECOR_STYLES = ["Simple", "Traditional", "Grand"];
const BACKGROUNDS = ["Mountains", "River", "Forest", "Temple Hall"];
const ITEMS = ["Diya", "Flowers", "Incense", "Bell", "Coconut", "Fruits"];

const DEITY_EMOJIS: Record<string, string> = {
  Ganesha: "🐘",
  Shiva: "🔱",
  Vishnu: "🪷",
  Durga: "⚔️",
  Lakshmi: "🌸",
  Saraswati: "🎵",
  Krishna: "🪈",
  Ram: "🏹",
  Hanuman: "🐒",
};

const BG_EMOJIS: Record<string, string> = {
  Mountains: "🏔️",
  River: "🌊",
  Forest: "🌳",
  "Temple Hall": "🛕",
};

const ITEM_EMOJIS: Record<string, string> = {
  Diya: "🪔",
  Flowers: "🌸",
  Incense: "🕯️",
  Bell: "🔔",
  Coconut: "🥥",
  Fruits: "🍎",
};

export default function VirtualTemple() {
  const { identity } = useInternetIdentity();
  const principal = identity?.getPrincipal() ?? null;
  const { data: savedConfig } = useGetVirtualTempleConfig(principal);
  const saveConfig = useSaveVirtualTempleConfig();

  const [deity, setDeity] = useState("Ganesha");
  const [decorStyle, setDecorStyle] = useState("Traditional");
  const [background, setBackground] = useState("Temple Hall");
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "Diya",
    "Flowers",
  ]);

  // ── NEW: bhakti & interactive state ─────────────────────────────────────
  const [bhakti, setBhakti] = useState<number>(loadBhakti);
  const [selectedDeity, setSelectedDeity] = useState("Shiva");
  const [animating, setAnimating] = useState<string | null>(null);

  const addBhakti = (points: number, id: string) => {
    setBhakti((prev) => {
      const next = prev + points;
      saveBhakti(next);
      return next;
    });
    setAnimating(id);
    setTimeout(() => setAnimating(null), 600);
  };

  useEffect(() => {
    if (savedConfig) {
      setDeity(savedConfig.deity);
      setDecorStyle(savedConfig.decorStyle);
      setBackground(savedConfig.background);
      setSelectedItems(savedConfig.items);
    }
  }, [savedConfig]);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleSave = async () => {
    if (!identity) {
      toast.error("Please login to save your temple");
      return;
    }
    try {
      await saveConfig.mutateAsync({
        userId: identity.getPrincipal(),
        deity,
        decorStyle,
        background,
        items: selectedItems,
        updatedAt: BigInt(Date.now()) * BigInt(1_000_000),
      });
      toast.success("Temple configuration saved!");
    } catch {
      toast.error("Failed to save temple");
    }
  };

  return (
    <div>
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "280px" }}
      >
        <img
          src="/assets/generated/virtual-temple-bg.dim_800x500.png"
          alt="Virtual Temple"
          className="w-full h-72 object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.18 0.06 25 / 0.5), oklch(0.12 0.04 20 / 0.75))",
          }}
        >
          <h1
            className="font-decorative text-3xl md:text-5xl font-bold mb-3"
            style={{ color: "oklch(0.78 0.14 75)" }}
          >
            🏠 My Virtual Temple
          </h1>
          <p
            className="font-body text-lg"
            style={{ color: "oklch(0.85 0.04 75)" }}
          >
            Create your personalized digital home temple
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Temple Preview */}
          <div className="ornamental-border rounded-2xl overflow-hidden bg-card">
            <div
              className="relative h-80 flex flex-col items-center justify-center"
              style={{
                background:
                  background === "Mountains"
                    ? "linear-gradient(to bottom, oklch(0.55 0.08 220), oklch(0.75 0.06 200))"
                    : background === "River"
                      ? "linear-gradient(to bottom, oklch(0.65 0.10 220), oklch(0.55 0.12 200))"
                      : background === "Forest"
                        ? "linear-gradient(to bottom, oklch(0.45 0.12 140), oklch(0.60 0.10 130))"
                        : "linear-gradient(to bottom, oklch(0.22 0.08 22), oklch(0.35 0.10 30))",
              }}
            >
              <div className="text-center">
                <div className="text-6xl mb-2 animate-float">
                  {DEITY_EMOJIS[deity]}
                </div>
                <p
                  className="font-decorative font-bold text-lg mb-4"
                  style={{ color: "oklch(0.78 0.14 75)" }}
                >
                  {deity}
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {selectedItems.map((item) => (
                    <span
                      key={item}
                      className="text-2xl animate-float"
                      style={{ animationDelay: `${Math.random() * 2}s` }}
                    >
                      {ITEM_EMOJIS[item]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-3 right-3 text-2xl opacity-50">
                {BG_EMOJIS[background]}
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 py-2 text-center text-xs font-heading"
                style={{
                  background: "oklch(0.18 0.06 22 / 0.7)",
                  color: "oklch(0.78 0.14 75)",
                }}
              >
                {decorStyle} Style • {background} Background
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="space-y-6">
            {!identity && (
              <div
                className="p-3 rounded-lg text-sm font-body text-center"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.1)",
                  color: "oklch(0.55 0.16 60)",
                }}
              >
                Please login to save your temple configuration
              </div>
            )}

            <div>
              <h3
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Choose Deity
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {DEITIES.map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDeity(d)}
                    className="p-3 rounded-xl border text-center transition-all"
                    style={{
                      borderColor:
                        deity === d
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.78 0.14 75 / 0.2)",
                      background:
                        deity === d
                          ? "oklch(0.68 0.20 48 / 0.1)"
                          : "oklch(0.99 0.008 80)",
                    }}
                  >
                    <div className="text-xl mb-1">{DEITY_EMOJIS[d]}</div>
                    <p
                      className="font-heading text-xs font-semibold"
                      style={{
                        color:
                          deity === d
                            ? "oklch(0.68 0.20 48)"
                            : "oklch(0.35 0.12 25)",
                      }}
                    >
                      {d}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Decor Style
              </h3>
              <div className="flex gap-3">
                {DECOR_STYLES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setDecorStyle(s)}
                    className="flex-1 py-2 rounded-full font-heading text-sm font-semibold border transition-all"
                    style={{
                      borderColor:
                        decorStyle === s
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.78 0.14 75 / 0.2)",
                      background:
                        decorStyle === s
                          ? "oklch(0.68 0.20 48 / 0.1)"
                          : "transparent",
                      color:
                        decorStyle === s
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.35 0.12 25)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Background
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUNDS.map((bg) => (
                  <button
                    type="button"
                    key={bg}
                    onClick={() => setBackground(bg)}
                    className="py-2 px-3 rounded-xl border font-heading text-sm font-semibold flex items-center gap-2 transition-all"
                    style={{
                      borderColor:
                        background === bg
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.78 0.14 75 / 0.2)",
                      background:
                        background === bg
                          ? "oklch(0.68 0.20 48 / 0.1)"
                          : "oklch(0.99 0.008 80)",
                      color:
                        background === bg
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.35 0.12 25)",
                    }}
                  >
                    {BG_EMOJIS[bg]} {bg}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="font-heading font-bold text-sm mb-3"
                style={{ color: "oklch(0.35 0.12 25)" }}
              >
                Add Items
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {ITEMS.map((item) => {
                  const selected = selectedItems.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleItem(item)}
                      className="p-2 rounded-xl border text-center transition-all"
                      style={{
                        borderColor: selected
                          ? "oklch(0.68 0.20 48)"
                          : "oklch(0.78 0.14 75 / 0.2)",
                        background: selected
                          ? "oklch(0.68 0.20 48 / 0.1)"
                          : "oklch(0.99 0.008 80)",
                      }}
                    >
                      <div className="text-xl mb-0.5">{ITEM_EMOJIS[item]}</div>
                      <p
                        className="font-heading text-xs font-semibold"
                        style={{
                          color: selected
                            ? "oklch(0.68 0.20 48)"
                            : "oklch(0.35 0.12 25)",
                        }}
                      >
                        {item}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={saveConfig.isPending || !identity}
              className="w-full py-3 rounded-full font-heading font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                color: "white",
              }}
            >
              <Save className="h-4 w-4" />
              {saveConfig.isPending ? "Saving..." : "Save My Temple"}
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          NEW SECTION 1 — Deity Selector (9 circular buttons)
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="py-10"
        style={{ background: "oklch(0.97 0.01 75)" }}
        data-ocid="deity-selector-section"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2
              className="font-decorative text-2xl font-bold"
              style={{ color: "oklch(0.42 0.14 30)" }}
            >
              देवता चुनें — Choose Your Deity
            </h2>
            <p
              className="font-body text-sm mt-1"
              style={{ color: "oklch(0.55 0.08 40)" }}
            >
              Selected deity:{" "}
              <span style={{ color: "oklch(0.68 0.20 48)", fontWeight: 700 }}>
                {selectedDeity}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {DEITY_SELECTOR.map((d) => {
              const active = selectedDeity === d.name;
              return (
                <button
                  type="button"
                  key={d.name}
                  onClick={() => setSelectedDeity(d.name)}
                  data-ocid={`deity-btn-${d.name.toLowerCase().replace(" ", "-")}`}
                  className="flex flex-col items-center gap-1 transition-all duration-200"
                  style={{ outline: "none" }}
                >
                  <span
                    className="flex items-center justify-center rounded-full text-2xl transition-all duration-200"
                    style={{
                      width: 60,
                      height: 60,
                      border: active
                        ? "3px solid oklch(0.68 0.20 48)"
                        : "2px solid oklch(0.78 0.14 75 / 0.3)",
                      background: active
                        ? "linear-gradient(135deg, oklch(0.68 0.20 48 / 0.18), oklch(0.78 0.14 75 / 0.12))"
                        : "oklch(0.99 0.008 80)",
                      boxShadow: active
                        ? "0 0 0 4px oklch(0.68 0.20 48 / 0.15)"
                        : "none",
                      transform: active ? "scale(1.12)" : "scale(1)",
                    }}
                  >
                    {d.emoji}
                  </span>
                  <span
                    className="font-heading text-xs font-semibold"
                    style={{
                      color: active
                        ? "oklch(0.58 0.18 40)"
                        : "oklch(0.45 0.10 30)",
                    }}
                  >
                    {d.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          NEW SECTION 2 — Bhakti Score + Bell
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="py-8"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 22), oklch(0.26 0.10 30))",
        }}
        data-ocid="bhakti-score-section"
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-8">
          {/* Score display */}
          <div className="text-center">
            <p
              className="font-body text-sm mb-1 tracking-widest uppercase"
              style={{ color: "oklch(0.78 0.14 75 / 0.7)" }}
            >
              भक्ति अंक
            </p>
            <p
              className="font-decorative text-6xl font-bold"
              style={{
                color: "oklch(0.78 0.14 75)",
                textShadow: "0 0 24px oklch(0.68 0.20 48 / 0.6)",
              }}
              data-ocid="bhakti-score-display"
            >
              {bhakti}
            </p>
            <p
              className="font-body text-xs mt-1"
              style={{ color: "oklch(0.78 0.14 75 / 0.5)" }}
            >
              Bhakti Score
            </p>
          </div>

          {/* Bell */}
          <button
            type="button"
            data-ocid="bell-button"
            onClick={() => {
              playBell();
              addBhakti(5, "bell");
            }}
            className="flex flex-col items-center gap-2 transition-transform duration-150 active:scale-90"
            style={{
              transform:
                animating === "bell"
                  ? "scale(1.25) rotate(-15deg)"
                  : "scale(1)",
              outline: "none",
            }}
          >
            <span
              className="flex items-center justify-center rounded-full text-4xl"
              style={{
                width: 80,
                height: 80,
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                boxShadow: "0 4px 20px oklch(0.68 0.20 48 / 0.4)",
              }}
            >
              🔔
            </span>
            <span
              className="font-heading text-xs font-bold tracking-wide"
              style={{ color: "oklch(0.78 0.14 75)" }}
            >
              घंटी बजाएं +5
            </span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          NEW SECTION 3 — Virtual Offerings Panel
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="py-10"
        style={{ background: "oklch(0.98 0.012 75)" }}
        data-ocid="virtual-offerings-section"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2
              className="font-decorative text-2xl font-bold"
              style={{ color: "oklch(0.42 0.14 30)" }}
            >
              🙏 Virtual Offerings — आभासी चढ़ावा
            </h2>
            <p
              className="font-body text-sm mt-1"
              style={{ color: "oklch(0.55 0.08 40)" }}
            >
              Offer to {selectedDeity} and earn bhakti points
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            {OFFERINGS.map((o) => {
              const isAnim = animating === o.id;
              return (
                <button
                  type="button"
                  key={o.id}
                  data-ocid={`offering-btn-${o.id}`}
                  onClick={() => addBhakti(10, o.id)}
                  className="flex flex-col items-center gap-2 rounded-2xl px-5 py-4 border transition-all duration-200"
                  style={{
                    borderColor: isAnim
                      ? "oklch(0.68 0.20 48)"
                      : "oklch(0.78 0.14 75 / 0.25)",
                    background: isAnim
                      ? "oklch(0.68 0.20 48 / 0.12)"
                      : "oklch(0.99 0.008 80)",
                    transform: isAnim ? "scale(1.18)" : "scale(1)",
                    boxShadow: isAnim
                      ? "0 4px 20px oklch(0.68 0.20 48 / 0.35)"
                      : "0 1px 4px oklch(0 0 0 / 0.06)",
                    opacity: isAnim ? 0.85 : 1,
                  }}
                >
                  <span
                    className="text-4xl"
                    style={{
                      filter: isAnim
                        ? "drop-shadow(0 0 8px oklch(0.68 0.20 48))"
                        : "none",
                    }}
                  >
                    {o.emoji}
                  </span>
                  <span
                    className="font-heading text-sm font-bold"
                    style={{ color: "oklch(0.35 0.12 25)" }}
                  >
                    {o.hindi}
                  </span>
                  <span
                    className="font-body text-xs"
                    style={{ color: "oklch(0.55 0.08 40)" }}
                  >
                    {o.label} +10
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
