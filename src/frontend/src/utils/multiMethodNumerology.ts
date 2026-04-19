// Multi-Method Numerology Utility Functions
// Supports Pythagorean, Chaldean, Sepharial, and Modern methods

// ─── PYTHAGOREAN (standard A=1...Z=26 then 1-9) ───────────────────────────
const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

// ─── CHALDEAN (ancient Babylonian, no 9 assigned) ─────────────────────────
const CHALDEAN_MAP: Record<string, number> = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8,
};

// ─── SEPHARIAL (variant of Chaldean popular in Western astrology) ──────────
const SEPHARIAL_MAP: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 8,
  G: 3,
  H: 5,
  I: 1,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 7,
  P: 8,
  Q: 1,
  R: 2,
  S: 3,
  T: 4,
  U: 6,
  V: 6,
  W: 6,
  X: 5,
  Y: 1,
  Z: 7,
};

// ─── MODERN (Pythagorean with 9 included for Z) ───────────────────────────
const MODERN_MAP: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 9,
};

export type NumerologyMethod =
  | "pythagorean"
  | "chaldean"
  | "sepharial"
  | "modern";

export const METHOD_LABELS: Record<NumerologyMethod, string> = {
  pythagorean: "Pythagorean",
  chaldean: "Chaldean",
  sepharial: "Sepharial",
  modern: "Modern",
};

export const METHOD_DESCRIPTIONS: Record<NumerologyMethod, string> = {
  pythagorean: "सबसे प्रचलित पश्चिमी विधि। A=1 से Z=26 तक वर्णमाला क्रम।",
  chaldean: "प्राचीन बेबीलोनियन विधि। 9 को पवित्र मानकर exclude किया जाता है।",
  sepharial: "पाश्चात्य ज्योतिष में प्रयुक्त Chaldean का परिष्कृत रूप।",
  modern: "आधुनिक Western numerology। Pythagorean जैसी पर Z=9 सहित।",
};

const MAPS: Record<NumerologyMethod, Record<string, number>> = {
  pythagorean: PYTHAGOREAN_MAP,
  chaldean: CHALDEAN_MAP,
  sepharial: SEPHARIAL_MAP,
  modern: MODERN_MAP,
};

export function getLetterValue(
  letter: string,
  method: NumerologyMethod,
): number {
  return MAPS[method][letter.toUpperCase()] || 0;
}

export function reduceNumber(num: number, keepMasterNumbers = true): number {
  if (keepMasterNumbers && (num === 11 || num === 22 || num === 33)) return num;
  let current = num;
  while (current > 9) {
    if (
      keepMasterNumbers &&
      (current === 11 || current === 22 || current === 33)
    )
      break;
    current = String(current)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  }
  return current;
}

// Name Number (Expression Number)
export function calculateNameNumber(
  name: string,
  method: NumerologyMethod,
): { total: number; reduced: number; breakdown: string } {
  const cleaned = name.toUpperCase().replace(/[^A-Z]/g, "");
  let total = 0;
  const parts: string[] = [];
  for (const ch of cleaned.split("")) {
    const v = getLetterValue(ch, method);
    total += v;
    parts.push(`${ch}=${v}`);
  }
  return { total, reduced: reduceNumber(total), breakdown: parts.join(" + ") };
}

// Destiny Number = full name (all letters including middle name)
export function calculateDestinyNumber(
  fullName: string,
  method: NumerologyMethod,
): { total: number; reduced: number } {
  const result = calculateNameNumber(fullName, method);
  return { total: result.total, reduced: result.reduced };
}

// Mulank (Root/Life Path Number) = day of birth digit reduced
export function calculateMulankMultiMethod(dob: string): {
  mulank: number;
  lifePath: number;
} {
  const parts = dob.split("-");
  if (parts.length < 3) return { mulank: 0, lifePath: 0 };
  const day = Number.parseInt(parts[2], 10);
  const mulank = reduceNumber(day);
  const allDigits = dob
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  const sum = allDigits.reduce((a, b) => a + b, 0);
  const lifePath = reduceNumber(sum);
  return { mulank, lifePath };
}

// Soul Number = only vowels
export function calculateSoulNumber(
  name: string,
  method: NumerologyMethod,
): number {
  const VOWELS = new Set(["A", "E", "I", "O", "U"]);
  const cleaned = name.toUpperCase().replace(/[^A-Z]/g, "");
  const sum = cleaned
    .split("")
    .filter((c) => VOWELS.has(c))
    .reduce((a, c) => a + getLetterValue(c, method), 0);
  return reduceNumber(sum);
}

// Personality Number = only consonants
export function calculatePersonalityNumber(
  name: string,
  method: NumerologyMethod,
): number {
  const VOWELS = new Set(["A", "E", "I", "O", "U"]);
  const cleaned = name.toUpperCase().replace(/[^A-Z]/g, "");
  const sum = cleaned
    .split("")
    .filter((c) => !VOWELS.has(c))
    .reduce((a, c) => a + getLetterValue(c, method), 0);
  return reduceNumber(sum);
}

// Number meanings (Hindi)
const NUMBER_MEANINGS_HI: Record<
  number,
  {
    title: string;
    planet: string;
    color: string;
    gem: string;
    description: string;
  }
> = {
  1: {
    title: "नेता",
    planet: "☀️ सूर्य",
    color: "🔴 लाल / सोना",
    gem: "💎 माणिक्य",
    description: "नेतृत्व, स्वतंत्रता, नई शुरुआत। आत्मविश्वास और उद्यमशीलता का प्रतीक।",
  },
  2: {
    title: "कूटनीतिज्ञ",
    planet: "🌙 चंद्र",
    color: "⚪ सफेद / क्रीम",
    gem: "💎 मोती",
    description:
      "सहयोग, संवेदनशीलता, भावनात्मक बुद्धिमत्ता। साझेदारी और कूटनीति में उत्कृष्ट।",
  },
  3: {
    title: "सृजनशील",
    planet: "🪐 गुरु (बृहस्पति)",
    color: "🟡 पीला / बैंगनी",
    gem: "💎 पुखराज",
    description: "रचनात्मकता, अभिव्यक्ति, आनंद। स्वाभाविक संचारक और कलाकार।",
  },
  4: {
    title: "निर्माता",
    planet: "☿ राहु",
    color: "🟫 भूरा / नारंगी",
    gem: "💎 गोमेद",
    description: "स्थिरता, परिश्रम, व्यावहारिकता। ठोस नींव बनाने में कुशल।",
  },
  5: {
    title: "स्वतंत्र",
    planet: "☿ बुध",
    color: "🟢 हरा / नीला",
    gem: "💎 पन्ना",
    description: "स्वतंत्रता, साहस, बहुमुखी प्रतिभा। परिवर्तन और यात्रा प्रिय।",
  },
  6: {
    title: "पोषक",
    planet: "♀️ शुक्र",
    color: "🔵 नीला / इंडिगो",
    gem: "💎 हीरा",
    description: "जिम्मेदारी, पोषण, सौंदर्य। परिवार और समुदाय के प्रति समर्पित।",
  },
  7: {
    title: "रहस्यवादी",
    planet: "🌑 केतु",
    color: "🟣 बैंगनी / ग्रे",
    gem: "💎 लहसुनिया",
    description: "आध्यात्मिकता, अंतर्दृष्टि, विश्लेषण। आध्यात्मिक खोज और ज्ञान में रुचि।",
  },
  8: {
    title: "शक्तिशाली",
    planet: "🪐 शनि",
    color: "⚫ काला / गहरा नीला",
    gem: "💎 नीलम",
    description: "शक्ति, महत्वाकांक्षा, व्यावसायिक सफलता। भौतिक जगत में सिद्धि।",
  },
  9: {
    title: "विश्वप्रेमी",
    planet: "♂️ मंगल",
    color: "🔴 लाल / गुलाबी",
    gem: "💎 मूंगा",
    description: "मानवता, करुणा, पूर्णता। वैश्विक चेतना और सेवा भाव।",
  },
  11: {
    title: "प्रेरणादाता (मास्टर)",
    planet: "🌙 चंद्र / ☀️ सूर्य",
    color: "⚪ चांदी / सोना",
    gem: "💎 मोती + माणिक्य",
    description: "मास्टर नंबर 11: उच्च आध्यात्मिक जागरूकता, प्रेरणा और दूरदर्शिता।",
  },
  22: {
    title: "महान निर्माता (मास्टर)",
    planet: "🪐 शनि + ♀️ शुक्र",
    color: "🟡 सोना / इंडिगो",
    gem: "💎 नीलम + हीरा",
    description:
      "मास्टर नंबर 22: बड़े स्तर पर निर्माण और वास्तविकता में सपने लाने की शक्ति।",
  },
  33: {
    title: "गुरु (मास्टर)",
    planet: "🪐 गुरु + ♂️ मंगल",
    color: "🔵 रॉयल ब्लू / गोल्ड",
    gem: "💎 पुखराज + मूंगा",
    description: "मास्टर नंबर 33: उच्चतम करुणा, आत्म-बलिदान और आध्यात्मिक शिक्षक।",
  },
};

export function getNumberMeaning(num: number) {
  return NUMBER_MEANINGS_HI[num] || NUMBER_MEANINGS_HI[reduceNumber(num)];
}

// Lucky day names for number
const LUCKY_DAYS: Record<number, string> = {
  1: "रविवार",
  2: "सोमवार",
  3: "गुरुवार",
  4: "शनिवार",
  5: "बुधवार",
  6: "शुक्रवार",
  7: "सोमवार",
  8: "शनिवार",
  9: "मंगलवार",
  11: "सोमवार",
  22: "शनिवार",
  33: "गुरुवार",
};

export function getLuckyDay(num: number): string {
  return LUCKY_DAYS[num] || LUCKY_DAYS[reduceNumber(num)] || "-";
}
