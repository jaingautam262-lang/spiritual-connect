import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

const ROOMS = [
  "Bedroom",
  "Kitchen",
  "Living Room",
  "Office",
  "Entrance",
] as const;
type Room = (typeof ROOMS)[number];

const DIRECTIONS = [
  "North",
  "South",
  "East",
  "West",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
] as const;
type Direction = (typeof DIRECTIONS)[number];

type VastuTip = { positive: string[]; avoid: string[]; remedy: string };
const VASTU_DATA: Partial<Record<Room, Partial<Record<Direction, VastuTip>>>> =
  {
    Bedroom: {
      "South-West": {
        positive: [
          "Best direction for master bedroom — brings stability and grounding.",
          "Promotes restful sleep and strong relationships.",
          "Head while sleeping should point South.",
        ],
        avoid: [
          "Avoid mirrors on South or East walls.",
          "Don't place a TV directly opposite the bed.",
        ],
        remedy:
          "Place a pair of rose quartz crystals on the bedside table to enhance love and harmony.",
      },
      North: {
        positive: [
          "Associated with wealth and career growth.",
          "Good for young adults and students.",
        ],
        avoid: [
          "Avoid sleeping with head toward North as it disturbs the body's magnetic alignment.",
        ],
        remedy:
          "Use green or blue colors in North-facing bedroom walls for positive energy.",
      },
      "South-East": {
        positive: ["Linked to fire energy — brings passion and vitality."],
        avoid: [
          "Avoid storing water containers here.",
          "Don't place mirrors facing the bed.",
        ],
        remedy:
          "Place a small crystal bowl with rock salt in this corner to neutralize excess fire energy.",
      },
    },
    Kitchen: {
      "South-East": {
        positive: [
          "The most ideal direction for kitchens (associated with fire and Agni Devata).",
          "Promotes healthy digestion and family well-being.",
        ],
        avoid: [
          "Avoid black color on kitchen walls.",
          "Don't place water containers near the stove.",
        ],
        remedy:
          "Keep the kitchen clean and organized. Place a red/orange fruit bowl on the counter for positive fire energy.",
      },
      "North-West": {
        positive: [
          "Second-best location for kitchens.",
          "Brings movement and air energy to cooking.",
        ],
        avoid: ["Avoid heavy decorations that block airflow."],
        remedy:
          "Use white or cream colors for walls. Keep windows open during cooking to channel Vayu energy.",
      },
      North: {
        positive: [
          "North is governed by Kubera — some prosperity energy flows here.",
        ],
        avoid: [
          "Not ideal — water (North) and fire (kitchen) conflict. This can cause financial instability.",
        ],
        remedy:
          "Place a powerful Shree Yantra near the entrance to counteract the directional conflict.",
      },
    },
    "Living Room": {
      North: {
        positive: [
          "Excellent for living rooms — promotes wealth and social connections.",
          "Ideal for receiving guests and business discussions.",
        ],
        avoid: ["Avoid dark furniture and heavy curtains that block light."],
        remedy:
          "Use yellow or golden accents in the North area. Place a money plant here for prosperity.",
      },
      East: {
        positive: [
          "Best direction for windows and natural light.",
          "Brings fresh energy and health.",
          "Good for morning family activities.",
        ],
        avoid: ["Avoid cluttering the East side of the living room."],
        remedy:
          "Keep the East wall uncluttered. Hang a sunrise image or painting to amplify positive energy.",
      },
      "North-East": {
        positive: [
          "The auspicious 'Ishaan Kona' — divine energy corner.",
          "Perfect for placing a small altar or prayer space.",
        ],
        avoid: [
          "Absolutely avoid toilets or storage in this zone.",
          "Never keep heavy furniture here.",
        ],
        remedy:
          "Place a crystal pyramid or Shree Yantra here. Keep this corner clean and free from clutter.",
      },
    },
    Office: {
      North: {
        positive: [
          "Best direction for office — associated with career and wealth (Kubera's domain).",
          "Face North while working for best concentration.",
        ],
        avoid: ["Avoid storage of waste or garbage in the North."],
        remedy:
          "Place a north-facing mirror on the North wall to amplify career opportunities. Use a green plant.",
      },
      East: {
        positive: [
          "Second-best for offices — Sun rises in East, bringing fresh productive energy.",
          "Creative work flourishes here.",
        ],
        avoid: ["Avoid dark wall colors on the East side."],
        remedy:
          "Keep windows on the East side open in mornings. Place a Citrine crystal on your desk.",
      },
      South: {
        positive: ["Fame and recognition associated with South direction."],
        avoid: [
          "Avoid sitting with your back to the South without a solid wall behind you.",
          "Avoid placing the main door in South.",
        ],
        remedy:
          "Place a Bagua mirror facing South to deflect negative energy. Keep red-colored items here.",
      },
    },
    Entrance: {
      North: {
        positive: [
          "Highly auspicious for main entrance.",
          "Attracts wealth and opportunities.",
        ],
        avoid: ["Avoid dark colors at North entrance."],
        remedy:
          "Place a Kuber Yantra near the North entrance for wealth attraction.",
      },
      East: {
        positive: [
          "Second most auspicious for main door.",
          "Morning sun energizes incoming visitors.",
        ],
        avoid: ["Keep East entrance well-lit and free of obstructions."],
        remedy: "Hang wind chimes and place a welcoming mat.",
      },
      "North-East": {
        positive: [
          "Divine and auspicious direction.",
          "Invites blessings and spiritual protection.",
        ],
        avoid: ["Never block or clutter this entrance."],
        remedy:
          "Place a sacred symbol (Om, Swastik) at the North-East entrance.",
      },
      South: {
        positive: ["Can be made auspicious with proper remedies."],
        avoid: [
          "Not ideal for main entrance — associated with Yama.",
          "Avoid red door colors.",
        ],
        remedy:
          "Place a large Vastu pyramid outside the South entrance to neutralize negative energy.",
      },
    },
  };

const DEFAULT_TIP: VastuTip = {
  positive: [
    "General Vastu principle: Keep spaces clean, clutter-free, and well-ventilated.",
    "Natural light and air circulation are the foundation of positive Vastu.",
  ],
  avoid: [
    "Avoid broken or non-functional items in any room.",
    "Never block natural light or airflow.",
  ],
  remedy:
    "Place a salt lamp in any room to continuously purify the energy and create a positive atmosphere.",
};

export default function DailyGuideVastu() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | "">("");
  const [direction, setDirection] = useState<Direction | "">("");
  const [result, setResult] = useState<VastuTip | null>(null);

  function getTip() {
    if (!room || !direction) return;
    const tip =
      (VASTU_DATA[room] as Record<string, VastuTip> | undefined)?.[direction] ??
      DEFAULT_TIP;
    setResult(tip);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="spiritual-gradient py-10 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            data-ocid="vastu_guide.back_button"
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
            {language === "hi" ? "वास्तु मार्गदर्शिका" : "Vastu Guide"}
          </h1>
          <p className="text-sm mt-2" style={{ color: "oklch(0.85 0.02 80)" }}>
            {language === "hi"
              ? "कमरा और दिशा चुनें वास्तु सुझाव पाएं"
              : "Select a room and direction to get Vastu tips"}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
          {/* Room Selection */}
          <div>
            <p className="font-heading font-semibold mb-3">
              {language === "hi" ? "कमरा चुनें:" : "Select Room:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {ROOMS.map((r) => (
                <button
                  type="button"
                  key={r}
                  data-ocid={`vastu_guide.room.${r.toLowerCase().replace(/ /g, "_")}`}
                  onClick={() => {
                    setRoom(r);
                    setResult(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    room === r
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Direction Selection */}
          <div>
            <p className="font-heading font-semibold mb-3">
              {language === "hi" ? "दिशा चुनें:" : "Select Direction:"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DIRECTIONS.map((d) => (
                <button
                  type="button"
                  key={d}
                  data-ocid={`vastu_guide.direction.${d.toLowerCase().replace(/-/g, "_")}`}
                  onClick={() => {
                    setDirection(d);
                    setResult(null);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                    direction === d
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary/40"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="button"
            data-ocid="vastu_guide.get_tips_button"
            disabled={!room || !direction}
            onClick={getTip}
            className="w-full btn-spiritual"
          >
            {language === "hi" ? "वास्तु सुझाव पाएं" : "Get Vastu Tips"}
          </Button>
        </div>

        {result && (
          <div data-ocid="vastu_guide.result_card" className="mt-8 space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="font-heading font-bold mb-3 text-green-700 dark:text-green-400">
                {language === "hi" ? "सकारात्मक पहलू" : "Positive Aspects"}
              </h3>
              <ul className="space-y-2">
                {result.positive.map((p) => (
                  <li key={p} className="flex gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="font-heading font-bold mb-3 text-red-700 dark:text-red-400">
                {language === "hi" ? "इनसे सावधान रहें" : "Things to Avoid"}
              </h3>
              <ul className="space-y-2">
                {result.avoid.map((a) => (
                  <li key={a} className="flex gap-2 text-sm">
                    <span className="text-red-500 mt-0.5">✗</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
              <h3 className="font-heading font-bold mb-3 text-amber-700 dark:text-amber-400">
                {language === "hi" ? "उपाय" : "Remedy"}
              </h3>
              <p className="text-sm">{result.remedy}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
