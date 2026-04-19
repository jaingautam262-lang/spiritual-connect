// Logo Creator — Sacred Symbols Library and Alignment Utilities

export interface SacredSymbol {
  id: string;
  name: string;
  nameHi: string;
  svgPath: string;
  numerologyNumber: number;
  planet: string;
  element: string;
  category: "vedic" | "zodiac" | "navgraha" | "geometry" | "jain" | "sikh";
}

export interface NumerologyAlignment {
  score: number;
  alignedNumbers: number[];
  description: string;
  descriptionHi: string;
}

export interface AstrologyAlignment {
  score: number;
  alignedPlanets: string[];
  description: string;
  descriptionHi: string;
}

export interface LoShuActivation {
  score: number;
  activatedNumbers: number[];
  description: string;
  descriptionHi: string;
}

// SVG paths for sacred symbols (simplified geometric representations)
const OM_PATH =
  "M25 10 Q35 5 40 15 Q45 10 50 20 Q55 10 50 0 Q40-5 30 5 Q20 10 25 10 M30 20 Q25 30 30 35 Q35 40 40 35 M38 30 L38 45";
const SWASTIKA_PATH =
  "M20 20 L40 20 L40 10 L50 10 L50 30 L40 30 L40 50 L30 50 L30 30 L10 30 L10 20 L20 20 M20 20 L20 10";
const LOTUS_PATH =
  "M35 40 Q25 20 35 10 Q45 20 35 40 M35 40 Q15 35 10 25 Q25 25 35 40 M35 40 Q55 35 60 25 Q45 25 35 40 M35 40 Q20 50 15 45 Q25 35 35 40 M35 40 Q50 50 55 45 Q45 35 35 40";
const TRISHUL_PATH =
  "M35 60 L35 15 M25 25 Q30 15 35 20 Q40 15 45 25 M30 30 L40 30 M28 35 L42 35";
const CHAKRA_PATH =
  "M35 35 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0-40 0 M35 35 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0-24 0 M35 15 L35 35 M35 55 L35 35 M15 35 L35 35 M55 35 L35 35";
const SRI_YANTRA_PATH =
  "M35 10 L15 45 L55 45 Z M35 60 L15 25 L55 25 Z M35 15 L20 40 L50 40 Z M35 55 L20 30 L50 30 Z";
const HAMSA_PATH =
  "M35 55 Q25 40 25 25 Q35 15 45 25 Q45 40 35 55 M27 40 Q25 35 27 30 M43 40 Q45 35 43 30 M35 25 Q30 22 35 18 Q40 22 35 25";
const ANKH_PATH =
  "M35 60 L35 30 M25 40 L45 40 M35 25 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0-16 0";
const MANDALA_PATH =
  "M35 35 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0-40 0 M35 15 L35 55 M15 35 L55 35 M20 20 L50 50 M50 20 L20 50 M35 35 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0-20 0";

export const SACRED_SYMBOLS: SacredSymbol[] = [
  // Vedic Symbols
  {
    id: "om",
    name: "Om (ॐ)",
    nameHi: "ओम",
    svgPath: OM_PATH,
    numerologyNumber: 1,
    planet: "Sun",
    element: "Ether",
    category: "vedic",
  },
  {
    id: "swastika",
    name: "Swastika",
    nameHi: "स्वास्तिक",
    svgPath: SWASTIKA_PATH,
    numerologyNumber: 4,
    planet: "Jupiter",
    element: "Fire",
    category: "vedic",
  },
  {
    id: "lotus",
    name: "Lotus",
    nameHi: "कमल",
    svgPath: LOTUS_PATH,
    numerologyNumber: 8,
    planet: "Moon",
    element: "Water",
    category: "vedic",
  },
  {
    id: "trishul",
    name: "Trishul",
    nameHi: "त्रिशूल",
    svgPath: TRISHUL_PATH,
    numerologyNumber: 3,
    planet: "Mars",
    element: "Fire",
    category: "vedic",
  },
  {
    id: "chakra",
    name: "Sudarshana Chakra",
    nameHi: "सुदर्शन चक्र",
    svgPath: CHAKRA_PATH,
    numerologyNumber: 6,
    planet: "Vishnu/Sun",
    element: "Ether",
    category: "vedic",
  },
  {
    id: "sri_yantra",
    name: "Sri Yantra",
    nameHi: "श्री यंत्र",
    svgPath: SRI_YANTRA_PATH,
    numerologyNumber: 9,
    planet: "Venus",
    element: "Earth",
    category: "vedic",
  },
  {
    id: "hamsa",
    name: "Hamsa / Swan",
    nameHi: "हंस",
    svgPath: HAMSA_PATH,
    numerologyNumber: 2,
    planet: "Moon",
    element: "Water",
    category: "vedic",
  },
  {
    id: "ankh",
    name: "Ankh / Life Symbol",
    nameHi: "अनख (जीवन प्रतीक)",
    svgPath: ANKH_PATH,
    numerologyNumber: 7,
    planet: "Saturn",
    element: "Earth",
    category: "vedic",
  },
  {
    id: "mandala",
    name: "Sacred Mandala",
    nameHi: "पवित्र मंडल",
    svgPath: MANDALA_PATH,
    numerologyNumber: 5,
    planet: "Mercury",
    element: "Air",
    category: "geometry",
  },
  // Zodiac symbols (12 signs)
  {
    id: "zodiac_aries",
    name: "Aries ♈",
    nameHi: "मेष",
    svgPath: "M30 50 Q35 20 35 20 Q35 20 40 50 M20 35 L50 35",
    numerologyNumber: 1,
    planet: "Mars",
    element: "Fire",
    category: "zodiac",
  },
  {
    id: "zodiac_taurus",
    name: "Taurus ♉",
    nameHi: "वृषभ",
    svgPath:
      "M35 35 m-15 0 a15 15 0 1 0 30 0 a15 15 0 1 0-30 0 M25 25 Q20 15 30 12 M45 25 Q50 15 40 12",
    numerologyNumber: 2,
    planet: "Venus",
    element: "Earth",
    category: "zodiac",
  },
  {
    id: "zodiac_gemini",
    name: "Gemini ♊",
    nameHi: "मिथुन",
    svgPath:
      "M25 20 L25 50 M45 20 L45 50 M25 20 L45 20 M25 35 L45 35 M25 50 L45 50",
    numerologyNumber: 3,
    planet: "Mercury",
    element: "Air",
    category: "zodiac",
  },
  {
    id: "zodiac_cancer",
    name: "Cancer ♋",
    nameHi: "कर्क",
    svgPath:
      "M20 30 Q25 20 35 25 Q45 30 50 40 M50 40 Q45 50 35 45 Q25 40 20 30",
    numerologyNumber: 4,
    planet: "Moon",
    element: "Water",
    category: "zodiac",
  },
  {
    id: "zodiac_leo",
    name: "Leo ♌",
    nameHi: "सिंह",
    svgPath:
      "M20 35 Q25 25 35 30 Q45 25 50 35 M50 35 Q55 50 45 55 M45 55 Q40 60 35 55",
    numerologyNumber: 5,
    planet: "Sun",
    element: "Fire",
    category: "zodiac",
  },
  {
    id: "zodiac_virgo",
    name: "Virgo ♍",
    nameHi: "कन्या",
    svgPath:
      "M25 20 L25 55 M25 35 Q30 30 40 32 Q50 35 50 45 Q50 55 40 55 M25 20 Q35 15 45 20",
    numerologyNumber: 6,
    planet: "Mercury",
    element: "Earth",
    category: "zodiac",
  },
  {
    id: "zodiac_libra",
    name: "Libra ♎",
    nameHi: "तुला",
    svgPath: "M15 40 L55 40 M35 40 L35 20 M20 35 Q35 25 50 35 M15 50 L55 50",
    numerologyNumber: 7,
    planet: "Venus",
    element: "Air",
    category: "zodiac",
  },
  {
    id: "zodiac_scorpio",
    name: "Scorpio ♏",
    nameHi: "वृश्चिक",
    svgPath:
      "M20 35 L20 50 M20 35 L40 35 Q50 35 50 45 Q50 55 40 55 M50 45 Q55 45 55 55 Q50 60 45 55",
    numerologyNumber: 8,
    planet: "Mars",
    element: "Water",
    category: "zodiac",
  },
  {
    id: "zodiac_sagittarius",
    name: "Sagittarius ♐",
    nameHi: "धनु",
    svgPath: "M20 50 L50 20 M35 20 L50 20 L50 35 M30 40 L40 40",
    numerologyNumber: 9,
    planet: "Jupiter",
    element: "Fire",
    category: "zodiac",
  },
  {
    id: "zodiac_capricorn",
    name: "Capricorn ♑",
    nameHi: "मकर",
    svgPath:
      "M20 45 Q25 25 35 30 Q45 35 50 30 Q55 25 50 40 Q45 55 35 55 Q25 55 20 45",
    numerologyNumber: 1,
    planet: "Saturn",
    element: "Earth",
    category: "zodiac",
  },
  {
    id: "zodiac_aquarius",
    name: "Aquarius ♒",
    nameHi: "कुंभ",
    svgPath:
      "M15 35 Q25 25 35 35 Q45 45 55 35 M15 45 Q25 35 35 45 Q45 55 55 45",
    numerologyNumber: 2,
    planet: "Saturn",
    element: "Air",
    category: "zodiac",
  },
  {
    id: "zodiac_pisces",
    name: "Pisces ♓",
    nameHi: "मीन",
    svgPath:
      "M35 35 m-18 0 a18 18 0 0 0 18-18 M35 35 m18 0 a18 18 0 0 0-18 18 M17 35 L53 35",
    numerologyNumber: 3,
    planet: "Jupiter",
    element: "Water",
    category: "zodiac",
  },
  // Navgraha symbols (9 planets)
  {
    id: "surya",
    name: "Surya (Sun)",
    nameHi: "सूर्य",
    svgPath:
      "M35 35 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0-24 0 M35 10 L35 20 M35 50 L35 60 M10 35 L20 35 M50 35 L60 35 M18 18 L25 25 M45 45 L52 52 M52 18 L45 25 M25 45 L18 52",
    numerologyNumber: 1,
    planet: "Sun",
    element: "Fire",
    category: "navgraha",
  },
  {
    id: "chandra",
    name: "Chandra (Moon)",
    nameHi: "चंद्र",
    svgPath: "M45 15 Q20 15 20 35 Q20 55 45 55 Q30 55 30 35 Q30 15 45 15 Z",
    numerologyNumber: 2,
    planet: "Moon",
    element: "Water",
    category: "navgraha",
  },
  {
    id: "mangal",
    name: "Mangal (Mars)",
    nameHi: "मंगल",
    svgPath:
      "M35 35 m-15 0 a15 15 0 1 0 30 0 a15 15 0 1 0-30 0 M46 24 L55 15 M48 15 L55 15 L55 22",
    numerologyNumber: 9,
    planet: "Mars",
    element: "Fire",
    category: "navgraha",
  },
  {
    id: "budh",
    name: "Budh (Mercury)",
    nameHi: "बुध",
    svgPath:
      "M35 35 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0-24 0 M35 23 Q30 15 35 10 Q40 15 35 23 M35 47 L35 58 M28 52 L42 52",
    numerologyNumber: 5,
    planet: "Mercury",
    element: "Earth",
    category: "navgraha",
  },
  {
    id: "guru",
    name: "Guru (Jupiter)",
    nameHi: "गुरु",
    svgPath:
      "M25 25 L25 55 M25 40 L45 40 Q55 40 55 32 Q55 25 45 25 M45 55 L55 45",
    numerologyNumber: 3,
    planet: "Jupiter",
    element: "Ether",
    category: "navgraha",
  },
  {
    id: "shukra",
    name: "Shukra (Venus)",
    nameHi: "शुक्र",
    svgPath:
      "M35 35 m-15 0 a15 15 0 1 0 30 0 a15 15 0 1 0-30 0 M35 50 L35 60 M28 56 L42 56",
    numerologyNumber: 6,
    planet: "Venus",
    element: "Water",
    category: "navgraha",
  },
  {
    id: "shani",
    name: "Shani (Saturn)",
    nameHi: "शनि",
    svgPath: "M45 25 L25 25 Q20 35 25 45 Q30 55 40 55 M20 35 L50 35",
    numerologyNumber: 8,
    planet: "Saturn",
    element: "Air",
    category: "navgraha",
  },
  {
    id: "rahu",
    name: "Rahu (North Node)",
    nameHi: "राहु",
    svgPath: "M20 35 Q20 20 35 20 Q50 20 50 35 M20 35 L20 50 M50 35 L50 50",
    numerologyNumber: 4,
    planet: "Rahu",
    element: "Air",
    category: "navgraha",
  },
  {
    id: "ketu",
    name: "Ketu (South Node)",
    nameHi: "केतु",
    svgPath:
      "M20 20 Q20 35 35 35 Q50 35 50 20 M20 35 Q20 45 35 50 Q45 55 50 50 M30 55 L40 60 M32 60 L38 65",
    numerologyNumber: 7,
    planet: "Ketu",
    element: "Fire",
    category: "navgraha",
  },
];

// ─── ALIGNMENT CALCULATIONS ──────────────────────────────────────────────────

export function getNumerologyAlignment(
  symbolIds: string[],
  mulank: number,
  bhagyank: number,
): NumerologyAlignment {
  const symbols = SACRED_SYMBOLS.filter((s) => symbolIds.includes(s.id));
  const numbers = symbols.map((s) => s.numerologyNumber);
  const aligned = numbers.filter((n) => n === mulank || n === bhagyank);
  const score = Math.min(100, 30 + aligned.length * 25);
  return {
    score,
    alignedNumbers: [...new Set(aligned)],
    description:
      aligned.length > 0
        ? `${aligned.length} symbol(s) align with your Mulank (${mulank}) or Bhagyank (${bhagyank})`
        : "Add symbols matching your Mulank or Bhagyank for better alignment",
    descriptionHi:
      aligned.length > 0
        ? `${aligned.length} प्रतीक आपके मूलांक (${mulank}) या भाग्यांक (${bhagyank}) से मेल खाते हैं`
        : "बेहतर संरेखण के लिए अपने मूलांक या भाग्यांक से मेल खाने वाले प्रतीक जोड़ें",
  };
}

export function getAstrologyAlignment(
  colors: string[],
  lagnaSign: number,
  moonSign: number,
): AstrologyAlignment {
  const planetColors: Record<string, string[]> = {
    Sun: ["#FF9933", "#FF6600", "#FFD700"],
    Moon: ["#C0C0C0", "#FFFFFF", "#F0F0F0"],
    Mars: ["#FF0000", "#CC0000", "#FF4444"],
    Mercury: ["#00A86B", "#008000", "#90EE90"],
    Jupiter: ["#FFD700", "#FFAA00", "#FFA500"],
    Venus: ["#FF69B4", "#FFC0CB", "#FFB6C1"],
    Saturn: ["#1C1C1C", "#4B4B4B", "#808080"],
    Rahu: ["#4B0082", "#800080", "#9400D3"],
    Ketu: ["#8B4513", "#A0522D", "#D2691E"],
  };
  const lagnaLord =
    [
      "Mars",
      "Venus",
      "Mercury",
      "Moon",
      "Sun",
      "Mercury",
      "Venus",
      "Mars",
      "Jupiter",
      "Saturn",
      "Saturn",
      "Jupiter",
    ][lagnaSign - 1] || "Sun";
  const moonLord =
    [
      "Mars",
      "Venus",
      "Mercury",
      "Moon",
      "Sun",
      "Mercury",
      "Venus",
      "Mars",
      "Jupiter",
      "Saturn",
      "Saturn",
      "Jupiter",
    ][moonSign - 1] || "Moon";
  const aligned = colors.filter(
    (c) =>
      (planetColors[lagnaLord] || []).some(
        (pc) => pc.toLowerCase() === c.toLowerCase(),
      ) ||
      (planetColors[moonLord] || []).some(
        (pc) => pc.toLowerCase() === c.toLowerCase(),
      ),
  );
  const score = Math.min(100, 30 + aligned.length * 20);
  return {
    score,
    alignedPlanets: [lagnaLord, moonLord].filter(
      (v, i, a) => a.indexOf(v) === i,
    ),
    description: `Lagna lord ${lagnaLord} and Moon lord ${moonLord} alignment`,
    descriptionHi: `लग्नेश ${lagnaLord} और चंद्र राशीश ${moonLord} संरेखण`,
  };
}

export function getLoShuActivation(
  symbolIds: string[],
  missingNumbers: number[],
): LoShuActivation {
  const symbols = SACRED_SYMBOLS.filter((s) => symbolIds.includes(s.id));
  const numbers = symbols.map((s) => s.numerologyNumber);
  const activated = numbers.filter((n) => missingNumbers.includes(n));
  const score = Math.min(100, 30 + activated.length * 30);
  return {
    score,
    activatedNumbers: [...new Set(activated)],
    description:
      activated.length > 0
        ? `Activates ${activated.join(", ")} in your Lo Shu Grid`
        : "No missing Lo Shu numbers are being activated",
    descriptionHi:
      activated.length > 0
        ? `आपके लो शू ग्रिड में ${activated.join(", ")} को सक्रिय करता है`
        : "कोई भी अनुपस्थित लो शू संख्या सक्रिय नहीं हो रही है",
  };
}
