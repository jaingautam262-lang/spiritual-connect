import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Heart, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteKundaliMatch,
  useGetKundaliMatches,
  useSaveKundaliMatch,
} from "../hooks/useQueries";
import type { KundaliMatchInput } from "../types/backend-types";

// ── Hardcoded Nakshatra Lookup Table ──────────────────────────────────────────
const NAKSHATRA_DATA = [
  {
    idx: 0,
    name: "अश्विनी",
    nameEn: "Ashwini",
    rashi: 0,
    lord: "केतु",
    nadi: 0,
    gana: 0,
    varna: 1,
    yoni: 0,
  },
  {
    idx: 1,
    name: "भरणी",
    nameEn: "Bharani",
    rashi: 0,
    lord: "शुक्र",
    nadi: 1,
    gana: 2,
    varna: 2,
    yoni: 1,
  },
  {
    idx: 2,
    name: "कृत्तिका",
    nameEn: "Krittika",
    rashi: 1,
    lord: "सूर्य",
    nadi: 2,
    gana: 2,
    varna: 1,
    yoni: 2,
  },
  {
    idx: 3,
    name: "रोहिणी",
    nameEn: "Rohini",
    rashi: 1,
    lord: "चंद्र",
    nadi: 0,
    gana: 0,
    varna: 1,
    yoni: 6,
  },
  {
    idx: 4,
    name: "मृगशिरा",
    nameEn: "Mrigashira",
    rashi: 2,
    lord: "मंगल",
    nadi: 1,
    gana: 0,
    varna: 1,
    yoni: 6,
  },
  {
    idx: 5,
    name: "आर्द्रा",
    nameEn: "Ardra",
    rashi: 2,
    lord: "राहु",
    nadi: 2,
    gana: 2,
    varna: 2,
    yoni: 3,
  },
  {
    idx: 6,
    name: "पुनर्वसु",
    nameEn: "Punarvasu",
    rashi: 3,
    lord: "गुरु",
    nadi: 0,
    gana: 0,
    varna: 3,
    yoni: 4,
  },
  {
    idx: 7,
    name: "पुष्य",
    nameEn: "Pushya",
    rashi: 3,
    lord: "शनि",
    nadi: 1,
    gana: 0,
    varna: 1,
    yoni: 2,
  },
  {
    idx: 8,
    name: "आश्लेषा",
    nameEn: "Ashlesha",
    rashi: 3,
    lord: "बुध",
    nadi: 2,
    gana: 2,
    varna: 2,
    yoni: 3,
  },
  {
    idx: 9,
    name: "मघा",
    nameEn: "Magha",
    rashi: 4,
    lord: "केतु",
    nadi: 0,
    gana: 2,
    varna: 1,
    yoni: 0,
  },
  {
    idx: 10,
    name: "पूर्व फाल्गुनी",
    nameEn: "Purva Phalguni",
    rashi: 4,
    lord: "शुक्र",
    nadi: 1,
    gana: 1,
    varna: 2,
    yoni: 0,
  },
  {
    idx: 11,
    name: "उत्तर फाल्गुनी",
    nameEn: "Uttara Phalguni",
    rashi: 5,
    lord: "सूर्य",
    nadi: 2,
    gana: 1,
    varna: 1,
    yoni: 1,
  },
  {
    idx: 12,
    name: "हस्त",
    nameEn: "Hasta",
    rashi: 5,
    lord: "चंद्र",
    nadi: 0,
    gana: 0,
    varna: 3,
    yoni: 7,
  },
  {
    idx: 13,
    name: "चित्रा",
    nameEn: "Chitra",
    rashi: 6,
    lord: "मंगल",
    nadi: 1,
    gana: 2,
    varna: 1,
    yoni: 9,
  },
  {
    idx: 14,
    name: "स्वाति",
    nameEn: "Swati",
    rashi: 6,
    lord: "राहु",
    nadi: 2,
    gana: 0,
    varna: 2,
    yoni: 7,
  },
  {
    idx: 15,
    name: "विशाखा",
    nameEn: "Vishakha",
    rashi: 7,
    lord: "गुरु",
    nadi: 0,
    gana: 2,
    varna: 1,
    yoni: 10,
  },
  {
    idx: 16,
    name: "अनुराधा",
    nameEn: "Anuradha",
    rashi: 7,
    lord: "शनि",
    nadi: 1,
    gana: 0,
    varna: 1,
    yoni: 11,
  },
  {
    idx: 17,
    name: "ज्येष्ठा",
    nameEn: "Jyeshtha",
    rashi: 7,
    lord: "बुध",
    nadi: 2,
    gana: 2,
    varna: 1,
    yoni: 11,
  },
  {
    idx: 18,
    name: "मूल",
    nameEn: "Mula",
    rashi: 8,
    lord: "केतु",
    nadi: 0,
    gana: 2,
    varna: 2,
    yoni: 4,
  },
  {
    idx: 19,
    name: "पूर्वाषाढ़ा",
    nameEn: "Purva Ashadha",
    rashi: 8,
    lord: "शुक्र",
    nadi: 1,
    gana: 1,
    varna: 2,
    yoni: 12,
  },
  {
    idx: 20,
    name: "उत्तराषाढ़ा",
    nameEn: "Uttara Ashadha",
    rashi: 9,
    lord: "सूर्य",
    nadi: 2,
    gana: 1,
    varna: 1,
    yoni: 8,
  },
  {
    idx: 21,
    name: "श्रवण",
    nameEn: "Shravana",
    rashi: 9,
    lord: "चंद्र",
    nadi: 0,
    gana: 0,
    varna: 1,
    yoni: 12,
  },
  {
    idx: 22,
    name: "धनिष्ठा",
    nameEn: "Dhanishtha",
    rashi: 10,
    lord: "मंगल",
    nadi: 1,
    gana: 2,
    varna: 1,
    yoni: 5,
  },
  {
    idx: 23,
    name: "शतभिषा",
    nameEn: "Shatabhisha",
    rashi: 10,
    lord: "राहु",
    nadi: 2,
    gana: 2,
    varna: 2,
    yoni: 7,
  },
  {
    idx: 24,
    name: "पूर्वभाद्रपदा",
    nameEn: "Purva Bhadrapada",
    rashi: 11,
    lord: "गुरु",
    nadi: 0,
    gana: 1,
    varna: 3,
    yoni: 5,
  },
  {
    idx: 25,
    name: "उत्तरभाद्रपदा",
    nameEn: "Uttara Bhadrapada",
    rashi: 11,
    lord: "शनि",
    nadi: 1,
    gana: 0,
    varna: 1,
    yoni: 8,
  },
  {
    idx: 26,
    name: "रेवती",
    nameEn: "Revati",
    rashi: 11,
    lord: "बुध",
    nadi: 2,
    gana: 0,
    varna: 1,
    yoni: 1,
  },
] as const;

const RASHIS = [
  "मेष",
  "वृषभ",
  "मिथुन",
  "कर्क",
  "सिंह",
  "कन्या",
  "तुला",
  "वृश्चिक",
  "धनु",
  "मकर",
  "कुंभ",
  "मीन",
];
const RASHI_EN = [
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
const GANAS = ["देव", "मानुष", "राक्षस"];
const GANA_EN = ["Deva", "Manushya", "Rakshasa"];
const NADIS = ["आदि", "मध्य", "अन्त्य"];
const VARNA_LABELS = ["ब्राह्मण", "क्षत्रिय", "वैश्य", "शूद्र"];
const YONI_ANIMALS = [
  "अश्व",
  "गज",
  "मेष",
  "सर्प",
  "श्वान",
  "मार्जार",
  "मूषक",
  "गौ",
  "महिष",
  "व्याघ्र",
  "मृग",
  "वानर",
];

// Enemy yoni pairs (0-indexed) — mutual enemies
const YONI_ENEMIES: [number, number][] = [
  [0, 7], // Ashwa-Mahish
  [1, 9], // Gaja-Simha (lion not in list — using Vyaghra as tiger)
  [2, 11], // Mesha-Vanara
  [3, 5], // Sarpa-Marjar
  [4, 11], // Shwan-Mrig? Using Mrig
  [5, 6], // Marjar-Mushak
];

function isYoniEnemy(a: number, b: number): boolean {
  return YONI_ENEMIES.some(
    ([x, y]) => (x === a && y === b) || (x === b && y === a),
  );
}

// Planet friendship table: 0=Sun,1=Moon,2=Mars,3=Mer,4=Jup,5=Ven,6=Sat,7=Rahu,8=Ketu
const LORD_MAP: Record<string, number> = {
  सूर्य: 0,
  चंद्र: 1,
  मंगल: 2,
  बुध: 3,
  गुरु: 4,
  शुक्र: 5,
  शनि: 6,
  राहु: 7,
  केतु: 8,
};
// friends[planet] = set of friend planet indices
const PLANET_FRIENDS: number[][] = [
  [1, 2, 4], // Sun
  [0, 3], // Moon
  [0, 1, 4], // Mars
  [0, 5], // Mercury
  [0, 1, 2], // Jupiter
  [3, 6], // Venus
  [3, 5], // Saturn
  [6, 5], // Rahu
  [6, 5], // Ketu
];
const PLANET_ENEMIES: number[][] = [
  [5, 6], // Sun
  [5, 6], // Moon
  [3], // Mars
  [1], // Mercury
  [3, 5], // Jupiter
  [0, 1], // Venus
  [0, 1, 2], // Saturn
  [0, 1, 2], // Rahu
  [0, 1, 2], // Ketu
];

function getPlanetRelation(
  a: number,
  b: number,
): "friend" | "neutral" | "enemy" {
  if (PLANET_FRIENDS[a].includes(b)) return "friend";
  if (PLANET_ENEMIES[a].includes(b)) return "enemy";
  return "neutral";
}

// ── Derivation from DOB ───────────────────────────────────────────────────────
export function nakIdx(dob: Date): number {
  const dayOfYear = Math.floor(
    (dob.getTime() - new Date(dob.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return (dayOfYear + dob.getFullYear()) % 27;
}

function getManglik(dob: Date): boolean {
  const m = dob.getMonth() + 1;
  const d = dob.getDate();
  return [0, 3, 6, 7, 11].includes((m + d) % 12);
}

function getSunSign(dob: Date): number {
  const m = dob.getMonth(); // 0-indexed
  const d = dob.getDate();
  const cutoffs = [21, 20, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  if (d >= cutoffs[m]) return m;
  return (m + 11) % 12;
}

function getAscendant(tob: string): number {
  if (!tob) return 0;
  const [h] = tob.split(":").map(Number);
  return h % 12;
}

function getMarsSign(dob: Date): number {
  return (dob.getDate() + dob.getMonth() + 1) % 12;
}

// ── 8-Koot Engine ─────────────────────────────────────────────────────────────
interface KootResult {
  name: string;
  nameEn: string;
  maxPoints: number;
  obtainedPoints: number;
  description: string;
  hasdosha: boolean;
  doshaName?: string;
  status: "excellent" | "good" | "average" | "poor";
}

function getStatus(score: number, max: number): KootResult["status"] {
  const pct = score / max;
  if (pct >= 0.75) return "excellent";
  if (pct >= 0.5) return "good";
  if (pct >= 0.25) return "average";
  return "poor";
}

function computeAshtakoot(
  boyDob: Date,
  girlDob: Date,
  boyGotra: string,
  girlGotra: string,
): KootResult[] {
  const bN = nakIdx(boyDob);
  const gN = nakIdx(girlDob);
  const bNak = NAKSHATRA_DATA[bN];
  const gNak = NAKSHATRA_DATA[gN];

  // Varna (max 1): boy varna >= girl varna
  const varnaScore = bNak.varna <= gNak.varna ? 1 : 0; // lower index = higher caste
  // Vasya (max 2): rashi-group matching
  function getVasyaGroup(r: number): number {
    if ([0, 1, 4, 9].includes(r)) return 0; // Chatushpad
    if ([3, 11].includes(r)) return 1; // Jalchar
    if ([2, 5, 6, 8, 10].includes(r)) return 2; // Manav
    if ([4].includes(r)) return 3; // Vanchar (Leo=4)
    if ([7].includes(r)) return 4; // Keeta
    return 2;
  }
  const bVG = getVasyaGroup(bNak.rashi);
  const gVG = getVasyaGroup(gNak.rashi);
  const vashyaScore = bVG === gVG ? 2 : Math.abs(bVG - gVG) === 1 ? 1 : 0;

  // Tara (max 3): count from boy to girl, divide by 9, check remainder
  const taraDiff = ((gN - bN + 27) % 27) + 1;
  const taraRemainder = taraDiff % 9;
  const taraScore =
    taraRemainder === 0 || [1, 3, 5, 7].includes(taraRemainder)
      ? 3
      : [2, 4, 6, 8].includes(taraRemainder)
        ? 1.5
        : 0;

  // Yoni (max 4): animal compatibility
  const bYoni = bNak.yoni;
  const gYoni = gNak.yoni;
  let yoniScore = 0;
  if (bYoni === gYoni) yoniScore = 4;
  else if (isYoniEnemy(bYoni, gYoni)) yoniScore = 0;
  else if (Math.abs(bYoni - gYoni) <= 2) yoniScore = 3;
  else yoniScore = 2;

  // Graha Maitri (max 5): rashi lords friendship
  const bLord = LORD_MAP[bNak.lord] ?? 0;
  const gLord = LORD_MAP[gNak.lord] ?? 0;
  const bToG = getPlanetRelation(bLord, gLord);
  const gToB = getPlanetRelation(gLord, bLord);
  let grahaScore = 0;
  if (bToG === "friend" && gToB === "friend") grahaScore = 5;
  else if (bToG === "friend" || gToB === "friend") grahaScore = 4;
  else if (bToG === "neutral" && gToB === "neutral") grahaScore = 3;
  else if (bToG === "enemy" || gToB === "enemy") grahaScore = 1;
  else grahaScore = 0;

  // Gana (max 6)
  const bGana = bNak.gana;
  const gGana = gNak.gana;
  let ganaScore = 0;
  if (bGana === gGana) ganaScore = 6;
  else if ((bGana === 0 && gGana === 1) || (bGana === 1 && gGana === 0))
    ganaScore = 5;
  else if ((bGana === 0 && gGana === 2) || (bGana === 2 && gGana === 0))
    ganaScore = 0;
  else if ((bGana === 1 && gGana === 2) || (bGana === 2 && gGana === 1))
    ganaScore = 0;
  else ganaScore = 3;

  // Bhakoot (max 7): dosha on 2/12, 3/11, 6/8 axis
  const bR = bNak.rashi;
  const gR = gNak.rashi;
  const bToGCount = ((gR - bR + 12) % 12) + 1;
  const gToBCount = ((bR - gR + 12) % 12) + 1;
  const doshaAxes = new Set(
    [
      [2, 12],
      [3, 11],
      [6, 8],
    ].flatMap(([a, b]) => [
      [a, b],
      [b, a],
    ]),
  );
  const bhakootDosha =
    doshaAxes.has([bToGCount, gToBCount] as unknown as never) ||
    doshaAxes.has([gToBCount, bToGCount] as unknown as never);
  // Exception: same rashi or trine (1-5-9 axis)
  const trineExc = bToGCount === 1 || bToGCount === 5 || bToGCount === 9;
  const bhakootHasDosha = bhakootDosha && !trineExc && bR !== gR;
  const bhakootScore = bhakootHasDosha ? 0 : 7;

  // Nadi (max 8): dosha if same nadi
  const bNadi = bNak.nadi;
  const gNadi = gNak.nadi;
  const nadiSameRashi = bR !== gR;
  const nadiSameGotra =
    boyGotra && girlGotra && boyGotra.toLowerCase() === girlGotra.toLowerCase();
  const nadiHasDosha = bNadi === gNadi && !nadiSameRashi && !nadiSameGotra;
  const nadiScore = bNadi !== gNadi ? 8 : nadiHasDosha ? 0 : 8; // exception cancels dosha but score still 0 per tradition

  return [
    {
      name: "वर्ण",
      nameEn: "Varna",
      maxPoints: 1,
      obtainedPoints: varnaScore,
      description: `वर: ${VARNA_LABELS[bNak.varna]}, कन्या: ${VARNA_LABELS[gNak.varna]}`,
      hasdosha: false,
      status: getStatus(varnaScore, 1),
    },
    {
      name: "वश्य",
      nameEn: "Vashya",
      maxPoints: 2,
      obtainedPoints: vashyaScore,
      description: `वर राशि समूह: ${bVG}, कन्या: ${gVG}`,
      hasdosha: false,
      status: getStatus(vashyaScore, 2),
    },
    {
      name: "तारा",
      nameEn: "Tara",
      maxPoints: 3,
      obtainedPoints: taraScore,
      description: `तारा अंतर: ${taraDiff} (शेष: ${taraRemainder})`,
      hasdosha: false,
      status: getStatus(taraScore, 3),
    },
    {
      name: "योनि",
      nameEn: "Yoni",
      maxPoints: 4,
      obtainedPoints: yoniScore,
      description: `वर: ${YONI_ANIMALS[bYoni]}, कन्या: ${YONI_ANIMALS[gYoni]}`,
      hasdosha: false,
      status: getStatus(yoniScore, 4),
    },
    {
      name: "ग्रह मैत्री",
      nameEn: "Graha Maitri",
      maxPoints: 5,
      obtainedPoints: grahaScore,
      description: `वर राशीश: ${bNak.lord}, कन्या राशीश: ${gNak.lord} — ${bToG}/${gToB}`,
      hasdosha: false,
      status: getStatus(grahaScore, 5),
    },
    {
      name: "गण",
      nameEn: "Gana",
      maxPoints: 6,
      obtainedPoints: ganaScore,
      description: `वर: ${GANAS[bGana]} गण, कन्या: ${GANAS[gGana]} गण`,
      hasdosha: false,
      status: getStatus(ganaScore, 6),
    },
    {
      name: "भकूट",
      nameEn: "Bhakoot",
      maxPoints: 7,
      obtainedPoints: bhakootScore,
      description: `वर→कन्या: ${bToGCount}, कन्या→वर: ${gToBCount}`,
      hasdosha: bhakootHasDosha,
      doshaName: "भकूट दोष",
      status: getStatus(bhakootScore, 7),
    },
    {
      name: "नाड़ी",
      nameEn: "Nadi",
      maxPoints: 8,
      obtainedPoints: nadiScore,
      description: nadiHasDosha
        ? `⚠️ नाड़ी दोष — दोनों: ${NADIS[bNadi]}`
        : `वर: ${NADIS[bNadi]}, कन्या: ${NADIS[gNadi]}`,
      hasdosha: nadiHasDosha,
      doshaName: "नाड़ी दोष",
      status: getStatus(nadiScore, 8),
    },
  ];
}

export function getCompatibilityLevel(total: number) {
  if (total >= 26)
    return {
      label: "उत्तम / Excellent",
      labelEn: "Excellent",
      pct: (total / 36) * 100,
      color: "oklch(0.55 0.18 145)",
    };
  if (total >= 18)
    return {
      label: "श्रेष्ठ / Good",
      labelEn: "Good",
      pct: (total / 36) * 100,
      color: "oklch(0.60 0.18 130)",
    };
  if (total >= 12)
    return {
      label: "सामान्य / Acceptable",
      labelEn: "Acceptable",
      pct: (total / 36) * 100,
      color: "oklch(0.68 0.20 48)",
    };
  return {
    label: "अशुभ / Poor",
    labelEn: "Poor",
    pct: (total / 36) * 100,
    color: "oklch(0.55 0.20 20)",
  };
}

// ── Form State ────────────────────────────────────────────────────────────────
interface PersonForm {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  gotra: string;
}
const emptyForm = (): PersonForm => ({
  name: "",
  dob: "",
  tob: "",
  pob: "",
  gotra: "",
});

function FieldGroup({
  label,
  labelHi,
  id,
  children,
}: { label: string; labelHi: string; id: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="flex flex-col gap-0.5">
        <span
          className="font-heading text-xs"
          style={{ color: "oklch(0.78 0.14 75)" }}
        >
          {labelHi}
        </span>
        <span
          className="font-body text-xs"
          style={{ color: "oklch(0.60 0.04 60)" }}
        >
          {label}
        </span>
      </Label>
      {children}
    </div>
  );
}

const INPUT_STYLE = {
  background: "oklch(0.20 0.05 20)",
  borderColor: "oklch(0.35 0.08 25)",
  color: "oklch(0.90 0.04 60)",
};

const STATUS_COLORS: Record<string, string> = {
  excellent: "oklch(0.55 0.18 145)",
  good: "oklch(0.60 0.18 130)",
  average: "oklch(0.68 0.20 48)",
  poor: "oklch(0.55 0.20 20)",
};
const STATUS_LABELS: Record<string, string> = {
  excellent: "उत्तम",
  good: "अच्छा",
  average: "मध्यम",
  poor: "कम",
};

// ── 7th House SAV Proxy ───────────────────────────────────────────────────────
function calc7thSAV(dob: Date): number {
  const n = nakIdx(dob);
  const r = NAKSHATRA_DATA[n].rashi;
  return ((n * 3 + r * 2) % 10) + 18;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function KundaliMatchingPage() {
  const [personA, setPersonA] = useState<PersonForm>(emptyForm());
  const [personB, setPersonB] = useState<PersonForm>(emptyForm());
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [result, setResult] = useState<{
    koots: KootResult[];
    total: number;
    aNak: number;
    bNak: number;
  } | null>(null);
  const [activeTab, setActiveTab] = useState("calculator");

  const { loginStatus } = useInternetIdentity();
  const isLoggedIn = loginStatus === "success";
  const saveMatch = useSaveKundaliMatch();
  const { data: matchHistory = [] } = useGetKundaliMatches();
  const deleteMatch = useDeleteKundaliMatch();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!personA.name) e["a.name"] = "नाम आवश्यक है";
    if (!personA.dob) e["a.dob"] = "जन्म तिथि आवश्यक है";
    if (!personA.tob) e["a.tob"] = "जन्म समय आवश्यक है";
    if (!personA.pob) e["a.pob"] = "जन्म स्थान आवश्यक है";
    if (!personB.name) e["b.name"] = "नाम आवश्यक है";
    if (!personB.dob) e["b.dob"] = "जन्म तिथि आवश्यक है";
    if (!personB.tob) e["b.tob"] = "जन्म समय आवश्यक है";
    if (!personB.pob) e["b.pob"] = "जन्म स्थान आवश्यक है";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCalculate = () => {
    if (!validate()) return;
    const dobA = new Date(personA.dob);
    const dobB = new Date(personB.dob);
    const koots = computeAshtakoot(dobA, dobB, personA.gotra, personB.gotra);
    const total = koots.reduce((s, k) => s + k.obtainedPoints, 0);
    setResult({ koots, total, aNak: nakIdx(dobA), bNak: nakIdx(dobB) });
  };

  const handleReset = () => {
    setPersonA(emptyForm());
    setPersonB(emptyForm());
    setResult(null);
    setErrors({});
  };

  const handleSave = async () => {
    if (!result || !isLoggedIn) return;
    const compat = getCompatibilityLevel(result.total);
    const payload: KundaliMatchInput = {
      personAName: personA.name,
      personBName: personB.name,
      personADob: personA.dob,
      personBDob: personB.dob,
      totalScore: result.total,
      compatibilityPct: Math.round(compat.pct),
      savedAt: BigInt(Date.now()),
    };
    try {
      await saveMatch.mutateAsync(payload);
      toast.success("मिलान सहेजा गया / Match saved successfully");
    } catch {
      toast.error("सहेजने में त्रुटि / Error saving match");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.12 0.04 20)" }}>
      {/* Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "oklch(0.16 0.06 22)",
          borderBottom: "1px solid oklch(0.25 0.07 25)",
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top, oklch(0.68 0.20 48 / 0.4), transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 py-8 relative">
          <Link
            to="/horoscope"
            className="inline-flex items-center gap-1.5 text-sm mb-5 transition-colors"
            style={{ color: "oklch(0.68 0.20 48)" }}
          >
            <ArrowLeft size={16} /> होरोस्कोप / Horoscope
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
              }}
            >
              💑
            </div>
            <div>
              <h1
                className="font-heading text-2xl md:text-3xl font-bold"
                style={{ color: "oklch(0.78 0.14 75)" }}
              >
                कुंडली मिलान
              </h1>
              <p
                className="font-body text-sm mt-0.5"
                style={{ color: "oklch(0.60 0.06 60)" }}
              >
                Kundali Matching — 36-Point Ashtakoot Analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="mb-8 h-auto p-1 rounded-xl gap-1"
            style={{ background: "oklch(0.18 0.05 22)" }}
          >
            <TabsTrigger
              value="calculator"
              data-ocid="kundali-page.tab.calculator"
              className="font-heading text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            >
              🔮 मिलान / Calculator
            </TabsTrigger>
            <TabsTrigger
              value="history"
              data-ocid="kundali-page.tab.history"
              className="font-heading text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            >
              📜 इतिहास / History
            </TabsTrigger>
          </TabsList>

          {/* ── Calculator Tab ─── */}
          <TabsContent value="calculator" className="space-y-6">
            {/* Input Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(["a", "b"] as const).map((key) => {
                const person = key === "a" ? personA : personB;
                const setPerson = key === "a" ? setPersonA : setPersonB;
                const label = key === "a" ? "वर (Groom)" : "कन्या (Bride)";
                const icon = key === "a" ? "👨" : "👩";
                return (
                  <Card
                    key={key}
                    data-ocid={`kundali-page.form.${key}`}
                    style={{
                      background: "oklch(0.16 0.04 20)",
                      border: "1px solid oklch(0.28 0.06 25)",
                    }}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle
                        className="font-heading text-base flex items-center gap-2"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        {icon} {label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FieldGroup label="Name" labelHi="नाम" id={`${key}-name`}>
                        <Input
                          id={`${key}-name`}
                          value={person.name}
                          onChange={(e) =>
                            setPerson((p) => ({ ...p, name: e.target.value }))
                          }
                          data-ocid={`kundali-page.input.${key}-name`}
                          style={INPUT_STYLE}
                          placeholder={
                            key === "a" ? "वर का नाम" : "कन्या का नाम"
                          }
                        />
                        {errors[`${key}.name`] && (
                          <p
                            className="text-xs"
                            style={{ color: "oklch(0.65 0.20 25)" }}
                          >
                            {errors[`${key}.name`]}
                          </p>
                        )}
                      </FieldGroup>
                      <FieldGroup
                        label="Date of Birth"
                        labelHi="जन्म तिथि"
                        id={`${key}-dob`}
                      >
                        <Input
                          id={`${key}-dob`}
                          type="date"
                          value={person.dob}
                          onChange={(e) =>
                            setPerson((p) => ({ ...p, dob: e.target.value }))
                          }
                          data-ocid={`kundali-page.input.${key}-dob`}
                          style={INPUT_STYLE}
                        />
                        {errors[`${key}.dob`] && (
                          <p
                            className="text-xs"
                            style={{ color: "oklch(0.65 0.20 25)" }}
                          >
                            {errors[`${key}.dob`]}
                          </p>
                        )}
                      </FieldGroup>
                      <FieldGroup
                        label="Time of Birth"
                        labelHi="जन्म समय"
                        id={`${key}-tob`}
                      >
                        <Input
                          id={`${key}-tob`}
                          type="time"
                          value={person.tob}
                          onChange={(e) =>
                            setPerson((p) => ({ ...p, tob: e.target.value }))
                          }
                          data-ocid={`kundali-page.input.${key}-tob`}
                          style={INPUT_STYLE}
                        />
                        {errors[`${key}.tob`] && (
                          <p
                            className="text-xs"
                            style={{ color: "oklch(0.65 0.20 25)" }}
                          >
                            {errors[`${key}.tob`]}
                          </p>
                        )}
                      </FieldGroup>
                      <FieldGroup
                        label="Place of Birth"
                        labelHi="जन्म स्थान"
                        id={`${key}-pob`}
                      >
                        <Input
                          id={`${key}-pob`}
                          value={person.pob}
                          onChange={(e) =>
                            setPerson((p) => ({ ...p, pob: e.target.value }))
                          }
                          data-ocid={`kundali-page.input.${key}-pob`}
                          style={INPUT_STYLE}
                          placeholder="शहर / नगर"
                        />
                        {errors[`${key}.pob`] && (
                          <p
                            className="text-xs"
                            style={{ color: "oklch(0.65 0.20 25)" }}
                          >
                            {errors[`${key}.pob`]}
                          </p>
                        )}
                      </FieldGroup>
                      <FieldGroup
                        label="Gotra (optional)"
                        labelHi="गोत्र (वैकल्पिक)"
                        id={`${key}-gotra`}
                      >
                        <Input
                          id={`${key}-gotra`}
                          value={person.gotra}
                          onChange={(e) =>
                            setPerson((p) => ({ ...p, gotra: e.target.value }))
                          }
                          data-ocid={`kundali-page.input.${key}-gotra`}
                          style={INPUT_STYLE}
                          placeholder="गोत्र"
                        />
                      </FieldGroup>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCalculate}
                data-ocid="kundali-page.btn.calculate"
                className="flex-1 font-heading font-semibold h-12 text-base"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                  color: "white",
                }}
              >
                🔮 गुण मिलान करें / Calculate
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                data-ocid="kundali-page.btn.reset"
                className="font-heading px-6"
                style={{
                  borderColor: "oklch(0.35 0.08 25)",
                  color: "oklch(0.70 0.04 60)",
                }}
              >
                साफ़ करें / Reset
              </Button>
            </div>

            {/* Results */}
            {result &&
              (() => {
                const compat = getCompatibilityLevel(result.total);
                const aNak = NAKSHATRA_DATA[result.aNak];
                const bNak = NAKSHATRA_DATA[result.bNak];
                const dobA = new Date(personA.dob);
                const dobB = new Date(personB.dob);
                const aManglik = getManglik(dobA);
                const bManglik = getManglik(dobB);
                const aASAV = calc7thSAV(dobA);
                const bSAV = calc7thSAV(dobB);
                const aAscendant = getAscendant(personA.tob);
                const bAscendant = getAscendant(personB.tob);
                const aSunSign = getSunSign(dobA);
                const bSunSign = getSunSign(dobB);
                const aMarsSign = getMarsSign(dobA);
                const bMarsSign = getMarsSign(dobB);
                const nadiKoot = result.koots[7];
                const bhakootKoot = result.koots[6];

                return (
                  <div className="space-y-6" data-ocid="kundali-page.results">
                    {/* Total Score Card */}
                    <Card
                      style={{
                        background: "oklch(0.16 0.04 20)",
                        border: `2px solid ${compat.color}`,
                      }}
                    >
                      <CardContent className="pt-8 pb-6 text-center space-y-4">
                        <div>
                          <div
                            className="font-heading font-bold"
                            style={{
                              color: compat.color,
                              fontSize: "5rem",
                              lineHeight: 1,
                            }}
                          >
                            {result.total}
                          </div>
                          <div
                            className="font-heading text-lg"
                            style={{ color: "oklch(0.65 0.04 60)" }}
                          >
                            / 36 गुण
                          </div>
                        </div>
                        <Badge
                          className="text-base px-6 py-1.5"
                          style={{ background: compat.color, color: "white" }}
                        >
                          {compat.label}
                        </Badge>
                        <Progress
                          value={compat.pct}
                          className="h-3 max-w-md mx-auto"
                        />
                        <p
                          className="font-body text-sm"
                          style={{ color: "oklch(0.65 0.06 60)" }}
                        >
                          {Math.round(compat.pct)}% सामंजस्य / Compatibility
                        </p>
                        <div className="flex justify-center gap-3">
                          <Button
                            onClick={handleSave}
                            disabled={!isLoggedIn || saveMatch.isPending}
                            data-ocid="kundali-page.btn.save"
                            className="font-heading font-semibold gap-2"
                            style={{
                              background: "oklch(0.30 0.08 45)",
                              color: "oklch(0.78 0.14 75)",
                              border: "1px solid oklch(0.40 0.10 50)",
                            }}
                          >
                            <Save size={16} />
                            {isLoggedIn ? "मिलान सहेजें / Save" : "Login to Save"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* 8 Koot Grid */}
                    <div>
                      <h2
                        className="font-heading font-bold text-lg mb-4"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        📊 अष्टकूट विश्लेषण / 8-Koot Analysis
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {result.koots.map((koot, i) => (
                          <Card
                            key={koot.nameEn}
                            data-ocid={`kundali-page.koot.${i + 1}`}
                            style={{
                              background: "oklch(0.16 0.04 20)",
                              border: `1px solid ${koot.hasdosha ? "oklch(0.55 0.20 20 / 0.6)" : "oklch(0.28 0.06 25)"}`,
                            }}
                          >
                            <CardContent className="pt-4 pb-3 space-y-2">
                              <div className="flex items-start justify-between gap-1">
                                <div>
                                  <p
                                    className="font-heading font-semibold text-sm"
                                    style={{ color: "oklch(0.85 0.04 60)" }}
                                  >
                                    {koot.name}
                                  </p>
                                  <p
                                    className="font-body text-xs"
                                    style={{ color: "oklch(0.55 0.04 55)" }}
                                  >
                                    {koot.nameEn}
                                  </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <span
                                    className="font-heading font-bold text-sm"
                                    style={{
                                      color: STATUS_COLORS[koot.status],
                                    }}
                                  >
                                    {koot.obtainedPoints}/{koot.maxPoints}
                                  </span>
                                </div>
                              </div>
                              <Progress
                                value={
                                  (koot.obtainedPoints / koot.maxPoints) * 100
                                }
                                className="h-1.5"
                              />
                              <div className="flex items-center justify-between">
                                <p
                                  className="text-xs font-body"
                                  style={{ color: "oklch(0.55 0.04 55)" }}
                                >
                                  {koot.description}
                                </p>
                              </div>
                              {koot.hasdosha && (
                                <Badge
                                  className="text-xs"
                                  style={{
                                    background: "oklch(0.55 0.20 20 / 0.2)",
                                    color: "oklch(0.72 0.18 25)",
                                  }}
                                >
                                  ⚠ {koot.doshaName}
                                </Badge>
                              )}
                              <Badge
                                className="text-xs"
                                style={{
                                  background: `${STATUS_COLORS[koot.status]}22`,
                                  color: STATUS_COLORS[koot.status],
                                }}
                              >
                                {STATUS_LABELS[koot.status]}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Nakshatra Info */}
                    <Card
                      style={{
                        background: "oklch(0.16 0.04 20)",
                        border: "1px solid oklch(0.28 0.06 25)",
                      }}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle
                          className="font-heading text-base"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          ✨ नक्षत्र जानकारी / Nakshatra Info
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: personA.name, nak: aNak },
                            { label: personB.name, nak: bNak },
                          ].map((p) => (
                            <div
                              key={p.label || p.nak.nameEn}
                              className="rounded-lg p-3"
                              style={{ background: "oklch(0.20 0.05 20)" }}
                            >
                              <p
                                className="font-heading text-xs font-semibold mb-2"
                                style={{ color: "oklch(0.78 0.14 75)" }}
                              >
                                {p.label}
                              </p>
                              <div
                                className="space-y-1 text-xs font-body"
                                style={{ color: "oklch(0.70 0.04 60)" }}
                              >
                                <div>
                                  नक्षत्र:{" "}
                                  <span
                                    style={{ color: "oklch(0.85 0.08 65)" }}
                                  >
                                    {p.nak.name} ({p.nak.nameEn})
                                  </span>
                                </div>
                                <div>
                                  राशि:{" "}
                                  <span
                                    style={{ color: "oklch(0.85 0.08 65)" }}
                                  >
                                    {RASHIS[p.nak.rashi]} (
                                    {RASHI_EN[p.nak.rashi]})
                                  </span>
                                </div>
                                <div>
                                  गण:{" "}
                                  <span
                                    style={{ color: "oklch(0.85 0.08 65)" }}
                                  >
                                    {GANAS[p.nak.gana]} ({GANA_EN[p.nak.gana]})
                                  </span>
                                </div>
                                <div>
                                  नाड़ी:{" "}
                                  <span
                                    style={{ color: "oklch(0.85 0.08 65)" }}
                                  >
                                    {NADIS[p.nak.nadi]}
                                  </span>
                                </div>
                                <div>
                                  राशि स्वामी:{" "}
                                  <span
                                    style={{ color: "oklch(0.85 0.08 65)" }}
                                  >
                                    {p.nak.lord}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* D1 Comparison Table */}
                    <Card
                      style={{
                        background: "oklch(0.16 0.04 20)",
                        border: "1px solid oklch(0.28 0.06 25)",
                      }}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle
                          className="font-heading text-base"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          🪐 D1 तुलना / D1 Chart Comparison
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr
                                style={{
                                  borderBottom: "1px solid oklch(0.28 0.06 25)",
                                }}
                              >
                                <th
                                  className="text-left py-2 font-heading"
                                  style={{ color: "oklch(0.60 0.04 60)" }}
                                >
                                  ग्रह / Planet
                                </th>
                                <th
                                  className="text-left py-2 font-heading"
                                  style={{ color: "oklch(0.78 0.14 75)" }}
                                >
                                  {personA.name || "वर"}
                                </th>
                                <th
                                  className="text-left py-2 font-heading"
                                  style={{ color: "oklch(0.78 0.14 75)" }}
                                >
                                  {personB.name || "कन्या"}
                                </th>
                              </tr>
                            </thead>
                            <tbody
                              className="font-body"
                              style={{ color: "oklch(0.70 0.04 60)" }}
                            >
                              {[
                                [
                                  "लग्न / Ascendant",
                                  RASHIS[aAscendant],
                                  RASHIS[bAscendant],
                                ],
                                [
                                  "सूर्य / Sun",
                                  RASHIS[aSunSign],
                                  RASHIS[bSunSign],
                                ],
                                [
                                  "चंद्र / Moon",
                                  RASHIS[aNak.rashi],
                                  RASHIS[bNak.rashi],
                                ],
                                [
                                  "मंगल / Mars",
                                  RASHIS[aMarsSign],
                                  RASHIS[bMarsSign],
                                ],
                              ].map(([planet, aVal, bVal]) => (
                                <tr
                                  key={planet}
                                  style={{
                                    borderBottom:
                                      "1px solid oklch(0.22 0.04 20)",
                                  }}
                                >
                                  <td className="py-2 text-xs">{planet}</td>
                                  <td
                                    className="py-2 text-xs"
                                    style={{ color: "oklch(0.85 0.08 65)" }}
                                  >
                                    {aVal}
                                  </td>
                                  <td
                                    className="py-2 text-xs"
                                    style={{ color: "oklch(0.85 0.08 65)" }}
                                  >
                                    {bVal}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Dosha Analysis */}
                    <div>
                      <h2
                        className="font-heading font-bold text-lg mb-4"
                        style={{ color: "oklch(0.78 0.14 75)" }}
                      >
                        🔥 दोष विश्लेषण / Dosha Analysis
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Nadi Dosha */}
                        <Card
                          data-ocid="kundali-page.dosha.nadi"
                          style={{
                            background: "oklch(0.16 0.04 20)",
                            border: `1px solid ${nadiKoot.hasdosha ? "oklch(0.55 0.20 20 / 0.6)" : "oklch(0.28 0.06 25)"}`,
                          }}
                        >
                          <CardContent className="pt-4 space-y-2">
                            <div className="flex items-start justify-between">
                              <p
                                className="font-heading font-semibold text-sm"
                                style={{ color: "oklch(0.85 0.04 60)" }}
                              >
                                नाड़ी दोष / Nadi Dosha
                              </p>
                              <Badge
                                style={{
                                  background: nadiKoot.hasdosha
                                    ? "oklch(0.55 0.20 20 / 0.3)"
                                    : "oklch(0.55 0.18 145 / 0.2)",
                                  color: nadiKoot.hasdosha
                                    ? "oklch(0.72 0.18 25)"
                                    : "oklch(0.55 0.18 145)",
                                }}
                              >
                                {nadiKoot.hasdosha ? "⚠ दोष" : "✓ शुभ"}
                              </Badge>
                            </div>
                            <p
                              className="text-xs font-body"
                              style={{ color: "oklch(0.60 0.04 60)" }}
                            >
                              {nadiKoot.hasdosha
                                ? "नाड़ी दोष है। महामृत्युंजय जाप, स्वर्णदान, विष्णु सहस्रनाम पाठ से दोष निवारण।"
                                : "नाड़ी भिन्न है — अत्यंत शुभ। स्वास्थ्य और संतान सुख का उत्तम योग।"}
                            </p>
                            <p
                              className="text-xs font-body"
                              style={{ color: "oklch(0.50 0.04 55)" }}
                            >
                              {nadiKoot.hasdosha
                                ? "उपाय: Mahamrityunjaya Jaap, Swarna Daan"
                                : "No Nadi Dosha — auspicious for health & progeny"}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Bhakoot Dosha */}
                        <Card
                          data-ocid="kundali-page.dosha.bhakoot"
                          style={{
                            background: "oklch(0.16 0.04 20)",
                            border: `1px solid ${bhakootKoot.hasdosha ? "oklch(0.55 0.20 20 / 0.6)" : "oklch(0.28 0.06 25)"}`,
                          }}
                        >
                          <CardContent className="pt-4 space-y-2">
                            <div className="flex items-start justify-between">
                              <p
                                className="font-heading font-semibold text-sm"
                                style={{ color: "oklch(0.85 0.04 60)" }}
                              >
                                भकूट दोष / Bhakoot Dosha
                              </p>
                              <Badge
                                style={{
                                  background: bhakootKoot.hasdosha
                                    ? "oklch(0.55 0.20 20 / 0.3)"
                                    : "oklch(0.55 0.18 145 / 0.2)",
                                  color: bhakootKoot.hasdosha
                                    ? "oklch(0.72 0.18 25)"
                                    : "oklch(0.55 0.18 145)",
                                }}
                              >
                                {bhakootKoot.hasdosha ? "⚠ दोष" : "✓ शुभ"}
                              </Badge>
                            </div>
                            <p
                              className="text-xs font-body"
                              style={{ color: "oklch(0.60 0.04 60)" }}
                            >
                              {bhakootKoot.hasdosha
                                ? "भकूट दोष है। धन-हानि और स्वास्थ्य सम्बंधी चिंताएं। रुद्राभिषेक और शांति पूजा कराएं।"
                                : "भकूट शुभ है — वित्तीय सामंजस्य और स्वास्थ्य का उत्तम योग।"}
                            </p>
                            <p
                              className="text-xs font-body"
                              style={{ color: "oklch(0.50 0.04 55)" }}
                            >
                              {bhakootKoot.hasdosha
                                ? "उपाय: Rudrabhishek, Shanti Puja"
                                : "No Bhakoot Dosha — auspicious for wealth & health"}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Manglik Dosha */}
                        <Card
                          data-ocid="kundali-page.dosha.manglik"
                          style={{
                            background: "oklch(0.16 0.04 20)",
                            border: `1px solid ${aManglik !== bManglik ? "oklch(0.68 0.20 48 / 0.6)" : "oklch(0.28 0.06 25)"}`,
                          }}
                        >
                          <CardContent className="pt-4 space-y-2">
                            <div className="flex items-start justify-between">
                              <p
                                className="font-heading font-semibold text-sm"
                                style={{ color: "oklch(0.85 0.04 60)" }}
                              >
                                मंगल दोष / Manglik
                              </p>
                              <Badge
                                style={{
                                  background:
                                    aManglik !== bManglik
                                      ? "oklch(0.68 0.20 48 / 0.2)"
                                      : "oklch(0.55 0.18 145 / 0.2)",
                                  color:
                                    aManglik !== bManglik
                                      ? "oklch(0.72 0.20 50)"
                                      : "oklch(0.55 0.18 145)",
                                }}
                              >
                                {aManglik && bManglik
                                  ? "✓ दोनों"
                                  : aManglik !== bManglik
                                    ? "⚠ एक पक्ष"
                                    : "✓ कोई नहीं"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                {
                                  label: personA.name || "वर",
                                  isManglik: aManglik,
                                },
                                {
                                  label: personB.name || "कन्या",
                                  isManglik: bManglik,
                                },
                              ].map((p) => (
                                <div
                                  key={p.label}
                                  className="rounded-md p-2 text-center text-xs"
                                  style={{ background: "oklch(0.20 0.05 20)" }}
                                >
                                  <p style={{ color: "oklch(0.60 0.04 60)" }}>
                                    {p.label}
                                  </p>
                                  <p
                                    className="font-semibold"
                                    style={{
                                      color: p.isManglik
                                        ? "oklch(0.72 0.20 25)"
                                        : "oklch(0.55 0.18 145)",
                                    }}
                                  >
                                    {p.isManglik ? "🔥 मांगलिक" : "✓ नहीं"}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <p
                              className="text-xs font-body"
                              style={{ color: "oklch(0.60 0.04 60)" }}
                            >
                              {aManglik && bManglik
                                ? "दोनों मांगलिक — दोष परस्पर नष्ट। विवाह शुभ।"
                                : aManglik !== bManglik
                                  ? "एक पक्ष मांगलिक — कुंभ विवाह, मंगल शांति हवन करें।"
                                  : "कोई मंगल दोष नहीं — विवाह के लिए अनुकूल।"}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* 7th House SAV */}
                    <Card
                      style={{
                        background: "oklch(0.16 0.04 20)",
                        border: "1px solid oklch(0.28 0.06 25)",
                      }}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle
                          className="font-heading text-base"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          🏠 सप्तम भाव SAV / 7th House SAV
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { name: personA.name || "वर", sav: aASAV },
                            { name: personB.name || "कन्या", sav: bSAV },
                          ].map((p) => (
                            <div
                              key={p.name}
                              className="rounded-lg p-3 text-center"
                              style={{ background: "oklch(0.20 0.05 20)" }}
                            >
                              <p
                                className="font-heading text-xs mb-1"
                                style={{ color: "oklch(0.65 0.04 60)" }}
                              >
                                {p.name}
                              </p>
                              <p
                                className="font-heading font-bold text-2xl"
                                style={{ color: "oklch(0.68 0.20 48)" }}
                              >
                                {p.sav}
                              </p>
                              <p
                                className="font-body text-xs"
                                style={{ color: "oklch(0.55 0.04 55)" }}
                              >
                                /28 (SAV स्कोर)
                              </p>
                              <p
                                className="font-body text-xs mt-1"
                                style={{ color: "oklch(0.60 0.04 60)" }}
                              >
                                {p.sav >= 25
                                  ? "विवाह योग उत्तम"
                                  : p.sav >= 20
                                    ? "मध्यम योग"
                                    : "विशेष उपाय आवश्यक"}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Remedies */}
                    <Card
                      style={{
                        background: "oklch(0.14 0.06 22)",
                        border: `1px solid ${compat.color}40`,
                      }}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle
                          className="font-heading text-base"
                          style={{ color: "oklch(0.78 0.14 75)" }}
                        >
                          📋 उपाय एवं अनुशंसा / Remedies & Recommendation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {result.total >= 26 ? (
                          <ul className="space-y-2">
                            {[
                              "विवाह आगे बढ़ाने की श्रेष्ठ अनुशंसा — सभी कूटों में उत्तम स्थिति।",
                              "आध्यात्मिक और वैचारिक सामंजस्य अत्यंत उच्च — दाम्पत्य जीवन सुखमय।",
                              "शुभ मुहूर्त में विवाह संपन्न कराएं — पंडितजी से तिथि निकलवाएं।",
                            ].map((r) => (
                              <li
                                key={r}
                                className="flex items-start gap-2 text-sm font-body"
                                style={{ color: "oklch(0.80 0.04 60)" }}
                              >
                                <span
                                  style={{ color: STATUS_COLORS.excellent }}
                                >
                                  ✓
                                </span>{" "}
                                {r}
                              </li>
                            ))}
                          </ul>
                        ) : result.total >= 18 ? (
                          <ul className="space-y-2">
                            {[
                              "मध्यम सामंजस्य — कमज़ोर कूटों के लिए विशेष पूजा कराएं।",
                              "नाड़ी-भकूट दोष होने पर महामृत्युंजय जाप और रुद्राभिषेक अनिवार्य।",
                              "विशेषज्ञ ज्योतिषी से विस्तृत विश्लेषण अनुशंसित — शुभ मुहूर्त चयन करें।",
                            ].map((r) => (
                              <li
                                key={r}
                                className="flex items-start gap-2 text-sm font-body"
                                style={{ color: "oklch(0.80 0.04 60)" }}
                              >
                                <span style={{ color: STATUS_COLORS.average }}>
                                  ○
                                </span>{" "}
                                {r}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="space-y-2">
                            {[
                              "गुण कम — किसी विद्वान ज्योतिषी से विस्तृत परामर्श अनिवार्य।",
                              "नाड़ी, भकूट और गण दोष जाँचें — शांति पूजा और हवन कराएं।",
                              "मंगल दोष, पितृ दोष और ग्रह दोष की शांति के उपाय करें।",
                            ].map((r) => (
                              <li
                                key={r}
                                className="flex items-start gap-2 text-sm font-body"
                                style={{ color: "oklch(0.80 0.04 60)" }}
                              >
                                <span style={{ color: STATUS_COLORS.poor }}>
                                  ⚠
                                </span>{" "}
                                {r}
                              </li>
                            ))}
                          </ul>
                        )}
                        <Separator
                          style={{ background: "oklch(0.25 0.06 25)" }}
                        />
                        <Button
                          data-ocid="kundali-page.btn.consult"
                          className="w-full font-heading font-semibold"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                            color: "white",
                          }}
                        >
                          <Heart size={16} className="mr-2" />
                          विस्तृत परामर्श के लिए ज्योतिषी से मिलें / Consult Astrologer
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                );
              })()}
          </TabsContent>

          {/* ── History Tab ─── */}
          <TabsContent value="history">
            <div data-ocid="kundali-page.history">
              {!isLoggedIn ? (
                <Card
                  style={{
                    background: "oklch(0.16 0.04 20)",
                    border: "1px solid oklch(0.28 0.06 25)",
                  }}
                >
                  <CardContent className="pt-8 pb-8 text-center space-y-4">
                    <div className="text-5xl">🔐</div>
                    <p
                      className="font-heading text-base"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      इतिहास देखने के लिए लॉगिन करें
                    </p>
                    <p
                      className="font-body text-sm"
                      style={{ color: "oklch(0.60 0.04 60)" }}
                    >
                      Login to view your saved Kundali matches
                    </p>
                  </CardContent>
                </Card>
              ) : matchHistory.length === 0 ? (
                <Card
                  style={{
                    background: "oklch(0.16 0.04 20)",
                    border: "1px solid oklch(0.28 0.06 25)",
                  }}
                >
                  <CardContent
                    className="pt-8 pb-8 text-center space-y-4"
                    data-ocid="kundali-page.history.empty"
                  >
                    <div className="text-5xl">💑</div>
                    <p
                      className="font-heading text-base"
                      style={{ color: "oklch(0.78 0.14 75)" }}
                    >
                      कोई सहेजा मिलान नहीं / No saved matches
                    </p>
                    <p
                      className="font-body text-sm"
                      style={{ color: "oklch(0.60 0.04 60)" }}
                    >
                      Calculate a match and save it to see it here
                    </p>
                    <Button
                      onClick={() => setActiveTab("calculator")}
                      data-ocid="kundali-page.history.cta"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.68 0.20 48), oklch(0.58 0.18 40))",
                        color: "white",
                      }}
                      className="font-heading font-semibold"
                    >
                      🔮 मिलान करें / Start Matching
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {matchHistory.map((match, i) => {
                    const compat = getCompatibilityLevel(match.totalScore);
                    return (
                      <Card
                        key={match.id ?? i}
                        data-ocid={`kundali-page.history.item.${i + 1}`}
                        style={{
                          background: "oklch(0.16 0.04 20)",
                          border: "1px solid oklch(0.28 0.06 25)",
                        }}
                      >
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                                style={{ background: "oklch(0.22 0.06 25)" }}
                              >
                                💑
                              </div>
                              <div className="min-w-0">
                                <p
                                  className="font-heading font-semibold text-sm truncate"
                                  style={{ color: "oklch(0.85 0.04 60)" }}
                                >
                                  {match.personAName} × {match.personBName}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <Badge
                                    className="text-xs"
                                    style={{
                                      background: `${compat.color}22`,
                                      color: compat.color,
                                    }}
                                  >
                                    {match.totalScore}/36
                                  </Badge>
                                  <Badge
                                    className="text-xs"
                                    style={{
                                      background: `${compat.color}22`,
                                      color: compat.color,
                                    }}
                                  >
                                    {match.compatibilityPct}%
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <p
                                className="text-xs font-body flex items-center gap-1"
                                style={{ color: "oklch(0.50 0.04 55)" }}
                              >
                                <Clock size={12} />
                                {new Date(
                                  Number(match.savedAt),
                                ).toLocaleDateString("hi-IN")}
                              </p>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    data-ocid={`kundali-page.history.delete.${i + 1}`}
                                    style={{ color: "oklch(0.55 0.20 20)" }}
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent
                                  style={{
                                    background: "oklch(0.18 0.05 22)",
                                    border: "1px solid oklch(0.30 0.08 25)",
                                  }}
                                >
                                  <AlertDialogHeader>
                                    <AlertDialogTitle
                                      className="font-heading"
                                      style={{ color: "oklch(0.78 0.14 75)" }}
                                    >
                                      मिलान हटाएं? / Delete Match?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription
                                      className="font-body"
                                      style={{ color: "oklch(0.65 0.04 60)" }}
                                    >
                                      "{match.personAName} × {match.personBName}
                                      " — यह मिलान स्थायी रूप से हटा दिया जाएगा।
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      className="font-heading"
                                      style={{
                                        borderColor: "oklch(0.35 0.08 25)",
                                        color: "oklch(0.70 0.04 60)",
                                      }}
                                    >
                                      रद्द करें / Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        deleteMatch.mutate(match.id ?? "")
                                      }
                                      data-ocid={`kundali-page.history.confirm-delete.${i + 1}`}
                                      style={{
                                        background: "oklch(0.55 0.20 20)",
                                        color: "white",
                                      }}
                                      className="font-heading"
                                    >
                                      हटाएं / Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
