// Pancha Pakshi (Five Birds) System — Tamil Siddha Astrology
// Each bird governs a cycle of time based on birth star (Nakshatra)

export interface PanchaPakshiBird {
  id: string;
  name: string;
  nameHindi: string;
  nameTamil: string;
  description: string;
  element: string;
  color: string;
  symbol: string;
  luckyDays: string[];
  unluckyHours: string[];
  favorableActivities: string[];
  unfavorableActivities: string[];
  birthStars: string[]; // Nakshatras governed by this bird
  qualities: string[];
  mantra: string;
  deity: string;
}

// ─── The Five Birds ───────────────────────────────────────────────────────────

export const PANCHA_PAKSHI_BIRDS: PanchaPakshiBird[] = [
  {
    id: "garuda",
    name: "Garuda",
    nameHindi: "गरुड़",
    nameTamil: "கருடன்",
    description:
      "The divine eagle and vehicle of Lord Vishnu. Garuda represents speed, power, and divine protection. Persons born under Garuda bird are natural leaders with strong willpower and decisive nature.",
    element: "Fire",
    color: "Golden Yellow",
    symbol: "Eagle",
    luckyDays: ["Sunday", "Tuesday"],
    unluckyHours: ["12:00–14:00", "16:00–18:00"],
    favorableActivities: [
      "Starting new ventures",
      "Leadership decisions",
      "Travelling long distances",
      "Seeking promotion",
      "Performing havan and fire rituals",
      "Dealing with authority figures",
    ],
    unfavorableActivities: [
      "Medical procedures",
      "Signing contracts",
      "Water-related activities",
    ],
    birthStars: [
      "Ashwini",
      "Magha",
      "Mula", // Ketu nakshatras
      "Bharani",
      "Purva Phalguni",
      "Purva Ashadha", // Venus
    ],
    qualities: [
      "Courageous",
      "Ambitious",
      "Protective",
      "Goal-oriented",
      "Natural authority",
    ],
    mantra: "ॐ गरुड़ाय नमः",
    deity: "Vishnu",
  },
  {
    id: "owl",
    name: "Owl",
    nameHindi: "उल्लू",
    nameTamil: "ஆந்தை",
    description:
      "The Owl represents wisdom, introspection, and night-time power. Persons of the Owl bird are deep thinkers, philosophers, and mystics. They excel in hidden knowledge and esoteric sciences.",
    element: "Earth",
    color: "Dark Brown / Black",
    symbol: "Owl",
    luckyDays: ["Saturday", "Wednesday"],
    unluckyHours: ["06:00–08:00", "18:00–20:00"],
    favorableActivities: [
      "Research and study",
      "Meditation and spiritual practices",
      "Night-time activities",
      "Astrology and occult work",
      "Investment decisions",
      "Financial planning",
    ],
    unfavorableActivities: [
      "Public speaking",
      "New social introductions",
      "Physical confrontations",
    ],
    birthStars: [
      "Krittika",
      "Uttara Phalguni",
      "Uttara Ashadha", // Sun
      "Rohini",
      "Hasta",
      "Shravana", // Moon
    ],
    qualities: [
      "Wise",
      "Intuitive",
      "Mysterious",
      "Persistent",
      "Detail-oriented",
    ],
    mantra: "ॐ शनैश्चराय नमः",
    deity: "Shani Dev",
  },
  {
    id: "crow",
    name: "Crow",
    nameHindi: "कौआ",
    nameTamil: "காகம்",
    description:
      "The Crow is associated with Saturn and represents adaptability, resourcefulness, and social intelligence. Crow persons are clever, communicative, and excellent at reading situations and people.",
    element: "Air",
    color: "Black / Grey",
    symbol: "Crow",
    luckyDays: ["Saturday", "Friday"],
    unluckyHours: ["08:00–10:00", "20:00–22:00"],
    favorableActivities: [
      "Communication and negotiations",
      "Group activities",
      "Political work",
      "Gathering information",
      "Social events",
      "Legal matters",
    ],
    unfavorableActivities: [
      "Starting independent work",
      "Solo travel",
      "Creative pursuits requiring solitude",
    ],
    birthStars: [
      "Ardra",
      "Swati",
      "Shatabhisha", // Rahu
      "Punarvasu",
      "Vishakha",
      "Purva Bhadrapada", // Jupiter
    ],
    qualities: ["Clever", "Adaptable", "Social", "Observant", "Strategic"],
    mantra: "ॐ शनि राहवे नमः",
    deity: "Shani / Rahu",
  },
  {
    id: "cock",
    name: "Cock (Rooster)",
    nameHindi: "मुर्गा",
    nameTamil: "சேவல்",
    description:
      "The Cock heralds dawn and represents alertness, courage, and vocal strength. Cock persons are early risers, courageous fighters, and natural administrators. They lead by example with great energy.",
    element: "Fire / Ether",
    color: "Red / Orange",
    symbol: "Rooster",
    luckyDays: ["Tuesday", "Thursday"],
    unluckyHours: ["10:00–12:00", "22:00–00:00"],
    favorableActivities: [
      "Competitive activities",
      "Sports and physical work",
      "Morning rituals",
      "Taking new initiatives",
      "Speaking in public",
      "Debates and arguments",
    ],
    unfavorableActivities: [
      "Secret operations",
      "Diplomacy requiring patience",
      "Night-time decisions",
    ],
    birthStars: [
      "Mrigashira",
      "Chitra",
      "Dhanishtha", // Mars
      "Ashlesha",
      "Jyeshtha",
      "Revati", // Mercury / Moon
    ],
    qualities: ["Courageous", "Energetic", "Alert", "Competitive", "Vocal"],
    mantra: "ॐ मंगलाय नमः",
    deity: "Mangal (Mars)",
  },
  {
    id: "peacock",
    name: "Peacock",
    nameHindi: "मोर",
    nameTamil: "மயில்",
    description:
      "The Peacock, national bird of India and vehicle of Lord Kartikeya, represents grace, beauty, and creative expression. Peacock persons are artistic, graceful, and attract abundance naturally.",
    element: "Water",
    color: "Multi-color / Blue-Green",
    symbol: "Peacock",
    luckyDays: ["Monday", "Thursday", "Friday"],
    unluckyHours: ["14:00–16:00", "00:00–02:00"],
    favorableActivities: [
      "Creative work and arts",
      "Marriage and romance",
      "Performing arts",
      "Starting spiritual practices",
      "Rain-related rituals",
      "Childbirth ceremonies",
    ],
    unfavorableActivities: [
      "Aggressive confrontations",
      "Industrial work",
      "Heavy physical labor",
    ],
    birthStars: [
      "Pushya",
      "Anuradha",
      "Uttara Bhadrapada", // Saturn
      "Purva Phalguni",
      "Purva Ashadha",
      "Bharani", // Venus (overlap)
    ],
    qualities: ["Graceful", "Artistic", "Magnetic", "Intuitive", "Prosperous"],
    mantra: "ॐ शुक्राय नमः",
    deity: "Kartikeya / Shukra",
  },
];

// ─── Pancha Pakshi Activity Types ─────────────────────────────────────────────

export const ACTIVITY_TYPES = [
  "ruling", // Most powerful — best for important activities
  "eating", // Second in power
  "walking", // Medium power
  "sleeping", // Reduced power — avoid important work
  "dying", // Weakest — avoid all important activities
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export interface HourlyPeriod {
  from: string; // HH:MM
  to: string; // HH:MM
  activity: ActivityType;
  recommendation: string;
}

// Activity descriptions
export const ACTIVITY_DESCRIPTIONS: Record<
  ActivityType,
  { label: string; strength: number; advice: string }
> = {
  ruling: {
    label: "Ruling (Aadhi Pakkam)",
    strength: 5,
    advice:
      "Most powerful period. Ideal for all important activities, decisions, and new starts.",
  },
  eating: {
    label: "Eating (Bhojana)",
    strength: 4,
    advice:
      "Second strongest. Good for meeting people, eating, and moderate activities.",
  },
  walking: {
    label: "Walking (Bhramana)",
    strength: 3,
    advice: "Medium strength. Routine work is fine; avoid critical decisions.",
  },
  sleeping: {
    label: "Sleeping (Nidra)",
    strength: 2,
    advice: "Weak period. Rest and routine only; postpone important work.",
  },
  dying: {
    label: "Dying (Mrityu)",
    strength: 1,
    advice:
      "Most unfavorable. Avoid all critical activities, travels, and new ventures.",
  },
};

// ─── Nakshatra → Bird mapping ─────────────────────────────────────────────────

export const NAKSHATRA_BIRD_MAP: Record<string, string> = {
  Ashwini: "garuda",
  Bharani: "garuda",
  Krittika: "owl",
  Rohini: "owl",
  Mrigashira: "cock",
  Ardra: "crow",
  Punarvasu: "crow",
  Pushya: "peacock",
  Ashlesha: "cock",
  Magha: "garuda",
  "Purva Phalguni": "garuda",
  "Uttara Phalguni": "owl",
  Hasta: "owl",
  Chitra: "cock",
  Swati: "crow",
  Vishakha: "crow",
  Anuradha: "peacock",
  Jyeshtha: "cock",
  Mula: "garuda",
  "Purva Ashadha": "garuda",
  "Uttara Ashadha": "owl",
  Shravana: "owl",
  Dhanishtha: "cock",
  Shatabhisha: "crow",
  "Purva Bhadrapada": "crow",
  "Uttara Bhadrapada": "peacock",
  Revati: "cock",
};

export function getBirdByNakshatra(
  nakshatra: string,
): PanchaPakshiBird | undefined {
  const birdId = NAKSHATRA_BIRD_MAP[nakshatra];
  return birdId ? PANCHA_PAKSHI_BIRDS.find((b) => b.id === birdId) : undefined;
}

export function getBirdById(id: string): PanchaPakshiBird | undefined {
  return PANCHA_PAKSHI_BIRDS.find((b) => b.id === id);
}
