// Vedic Astrology Calculation Engine — Client-side, Jean Meeus algorithms

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface PlanetData {
  sign: number; // 1–12
  degree: number; // 0–29.99
  longitude: number; // 0–359.99
  nakshatra: number; // 1–27
  pada: number; // 1–4
  retrograde: boolean;
}

export interface PlanetPositions {
  ASC: PlanetData;
  Sun: PlanetData;
  Moon: PlanetData;
  Mars: PlanetData;
  Mercury: PlanetData;
  Jupiter: PlanetData;
  Venus: PlanetData;
  Saturn: PlanetData;
  Rahu: PlanetData;
  Ketu: PlanetData;
  Uranus: PlanetData;
  Neptune: PlanetData;
  Pluto: PlanetData;
}

export interface DashaBalance {
  lord: string;
  remainingYears: number;
  remainingMonths: number;
  remainingDays: number;
  totalYears: number;
}

export interface AntarDasha {
  lord: string;
  startDate: Date;
  endDate: Date;
  years: number;
}

export interface MahaDasha {
  lord: string;
  startDate: Date;
  endDate: Date;
  years: number;
  antardashas: AntarDasha[];
}

export interface AvkahadaData {
  paya: string; // Gold/Silver/Copper/Iron
  varna: string; // Brahmin/Kshatriya/Vaishya/Shudra
  yoni: string; // 14 Yonis
  gana: string; // Deva/Manav/Rakshasa
  vasya: string; // Chatushpada/Jalchar/Manav/Vanchar/Keeta
  nadi: string; // Aadi/Madhya/Antya
  tatva: string; // Fire/Earth/Air/Water
  varga: string; // based on nakshatra
}

export interface ShadowPlanetData {
  Dhuma: PlanetData;
  Vyatipata: PlanetData;
  Parivesh: PlanetData;
  Indrachapa: PlanetData;
  Upaketu: PlanetData;
}

export interface HouseCusp {
  house: number;
  signStart: number;
  degreeStart: number;
  signMid: number;
  degreeMid: number;
}

export interface DivisionalCharts {
  D1: PlanetPositions;
  D2: Record<string, PlanetData>;
  D3: Record<string, PlanetData>;
  D4: Record<string, PlanetData>;
  D5: Record<string, PlanetData>;
  D6: Record<string, PlanetData>;
  D7: Record<string, PlanetData>;
  D8: Record<string, PlanetData>;
  D9: Record<string, PlanetData>;
  D10: Record<string, PlanetData>;
  D11: Record<string, PlanetData>;
  D12: Record<string, PlanetData>;
  D16: Record<string, PlanetData>;
  D20: Record<string, PlanetData>;
  D24: Record<string, PlanetData>;
  D27: Record<string, PlanetData>;
  D30: Record<string, PlanetData>;
  D40: Record<string, PlanetData>;
  D45: Record<string, PlanetData>;
  D60: Record<string, PlanetData>;
}

export interface AshtakvargaTable {
  planets: Record<string, number[]>; // planet -> 12 sign scores
  sarvashtakvarga: number[]; // total for 12 signs
  binduCount: Record<string, number>; // planet -> total bindus
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

export const ZODIAC_SIGNS = [
  {
    num: 1,
    name: "Aries",
    nameHi: "मेष",
    element: "Fire",
    lord: "Mars",
    lordHi: "मंगल",
  },
  {
    num: 2,
    name: "Taurus",
    nameHi: "वृषभ",
    element: "Earth",
    lord: "Venus",
    lordHi: "शुक्र",
  },
  {
    num: 3,
    name: "Gemini",
    nameHi: "मिथुन",
    element: "Air",
    lord: "Mercury",
    lordHi: "बुध",
  },
  {
    num: 4,
    name: "Cancer",
    nameHi: "कर्क",
    element: "Water",
    lord: "Moon",
    lordHi: "चंद्र",
  },
  {
    num: 5,
    name: "Leo",
    nameHi: "सिंह",
    element: "Fire",
    lord: "Sun",
    lordHi: "सूर्य",
  },
  {
    num: 6,
    name: "Virgo",
    nameHi: "कन्या",
    element: "Earth",
    lord: "Mercury",
    lordHi: "बुध",
  },
  {
    num: 7,
    name: "Libra",
    nameHi: "तुला",
    element: "Air",
    lord: "Venus",
    lordHi: "शुक्र",
  },
  {
    num: 8,
    name: "Scorpio",
    nameHi: "वृश्चिक",
    element: "Water",
    lord: "Mars",
    lordHi: "मंगल",
  },
  {
    num: 9,
    name: "Sagittarius",
    nameHi: "धनु",
    element: "Fire",
    lord: "Jupiter",
    lordHi: "गुरु",
  },
  {
    num: 10,
    name: "Capricorn",
    nameHi: "मकर",
    element: "Earth",
    lord: "Saturn",
    lordHi: "शनि",
  },
  {
    num: 11,
    name: "Aquarius",
    nameHi: "कुंभ",
    element: "Air",
    lord: "Saturn",
    lordHi: "शनि",
  },
  {
    num: 12,
    name: "Pisces",
    nameHi: "मीन",
    element: "Water",
    lord: "Jupiter",
    lordHi: "गुरु",
  },
];

export const NAKSHATRAS = [
  {
    num: 1,
    name: "Ashwini",
    nameHi: "अश्विनी",
    lord: "Ketu",
    symbol: "Horse head",
    gana: "Deva",
    yoni: "Horse",
  },
  {
    num: 2,
    name: "Bharani",
    nameHi: "भरणी",
    lord: "Venus",
    symbol: "Yoni",
    gana: "Manav",
    yoni: "Elephant",
  },
  {
    num: 3,
    name: "Krittika",
    nameHi: "कृत्तिका",
    lord: "Sun",
    symbol: "Razor/flame",
    gana: "Rakshasa",
    yoni: "Sheep",
  },
  {
    num: 4,
    name: "Rohini",
    nameHi: "रोहिणी",
    lord: "Moon",
    symbol: "Chariot",
    gana: "Manav",
    yoni: "Serpent",
  },
  {
    num: 5,
    name: "Mrigashira",
    nameHi: "मृगशिरा",
    lord: "Mars",
    symbol: "Deer head",
    gana: "Deva",
    yoni: "Serpent",
  },
  {
    num: 6,
    name: "Ardra",
    nameHi: "आर्द्रा",
    lord: "Rahu",
    symbol: "Teardrop",
    gana: "Manav",
    yoni: "Dog",
  },
  {
    num: 7,
    name: "Punarvasu",
    nameHi: "पुनर्वसु",
    lord: "Jupiter",
    symbol: "Quiver",
    gana: "Deva",
    yoni: "Cat",
  },
  {
    num: 8,
    name: "Pushya",
    nameHi: "पुष्य",
    lord: "Saturn",
    symbol: "Flower",
    gana: "Deva",
    yoni: "Sheep",
  },
  {
    num: 9,
    name: "Ashlesha",
    nameHi: "आश्लेषा",
    lord: "Mercury",
    symbol: "Serpent",
    gana: "Rakshasa",
    yoni: "Cat",
  },
  {
    num: 10,
    name: "Magha",
    nameHi: "मघा",
    lord: "Ketu",
    symbol: "Throne",
    gana: "Rakshasa",
    yoni: "Rat",
  },
  {
    num: 11,
    name: "Purva Phalguni",
    nameHi: "पूर्वा फाल्गुनी",
    lord: "Venus",
    symbol: "Hammock",
    gana: "Manav",
    yoni: "Rat",
  },
  {
    num: 12,
    name: "Uttara Phalguni",
    nameHi: "उत्तरा फाल्गुनी",
    lord: "Sun",
    symbol: "Bed",
    gana: "Manav",
    yoni: "Cow",
  },
  {
    num: 13,
    name: "Hasta",
    nameHi: "हस्त",
    lord: "Moon",
    symbol: "Hand",
    gana: "Deva",
    yoni: "Buffalo",
  },
  {
    num: 14,
    name: "Chitra",
    nameHi: "चित्रा",
    lord: "Mars",
    symbol: "Pearl",
    gana: "Rakshasa",
    yoni: "Tiger",
  },
  {
    num: 15,
    name: "Swati",
    nameHi: "स्वाती",
    lord: "Rahu",
    symbol: "Coral",
    gana: "Deva",
    yoni: "Buffalo",
  },
  {
    num: 16,
    name: "Vishakha",
    nameHi: "विशाखा",
    lord: "Jupiter",
    symbol: "Triumphal arch",
    gana: "Rakshasa",
    yoni: "Tiger",
  },
  {
    num: 17,
    name: "Anuradha",
    nameHi: "अनुराधा",
    lord: "Saturn",
    symbol: "Lotus",
    gana: "Deva",
    yoni: "Deer",
  },
  {
    num: 18,
    name: "Jyeshtha",
    nameHi: "ज्येष्ठा",
    lord: "Mercury",
    symbol: "Earring",
    gana: "Rakshasa",
    yoni: "Deer",
  },
  {
    num: 19,
    name: "Mula",
    nameHi: "मूल",
    lord: "Ketu",
    symbol: "Roots",
    gana: "Rakshasa",
    yoni: "Dog",
  },
  {
    num: 20,
    name: "Purva Ashadha",
    nameHi: "पूर्वाषाढ़ा",
    lord: "Venus",
    symbol: "Elephant tusk",
    gana: "Manav",
    yoni: "Monkey",
  },
  {
    num: 21,
    name: "Uttara Ashadha",
    nameHi: "उत्तराषाढ़ा",
    lord: "Sun",
    symbol: "Elephant tusk",
    gana: "Manav",
    yoni: "Mongoose",
  },
  {
    num: 22,
    name: "Shravana",
    nameHi: "श्रवण",
    lord: "Moon",
    symbol: "Ear/Vishnu steps",
    gana: "Deva",
    yoni: "Monkey",
  },
  {
    num: 23,
    name: "Dhanishta",
    nameHi: "धनिष्ठा",
    lord: "Mars",
    symbol: "Drum",
    gana: "Rakshasa",
    yoni: "Lion",
  },
  {
    num: 24,
    name: "Shatabhisha",
    nameHi: "शतभिषा",
    lord: "Rahu",
    symbol: "Empty circle",
    gana: "Rakshasa",
    yoni: "Horse",
  },
  {
    num: 25,
    name: "Purva Bhadrapada",
    nameHi: "पूर्वा भाद्रपदा",
    lord: "Jupiter",
    symbol: "Sword/two legs",
    gana: "Manav",
    yoni: "Lion",
  },
  {
    num: 26,
    name: "Uttara Bhadrapada",
    nameHi: "उत्तरा भाद्रपदा",
    lord: "Saturn",
    symbol: "Back legs of cot",
    gana: "Manav",
    yoni: "Cow",
  },
  {
    num: 27,
    name: "Revati",
    nameHi: "रेवती",
    lord: "Mercury",
    symbol: "Fish/drum",
    gana: "Deva",
    yoni: "Elephant",
  },
];

// Vimshottari Dasha sequence and years
const DASHA_SEQUENCE = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
];
const DASHA_YEARS: Record<string, number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};
const NAKSHATRA_DASHA_LORD = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
];

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}
function normalizeAngle(angle: number): number {
  let a = angle % 360;
  if (a < 0) a += 360;
  return a;
}

function toPlanetData(longitude: number, retrograde = false): PlanetData {
  const lon = normalizeAngle(longitude);
  const sign = Math.floor(lon / 30) + 1;
  const degree = lon % 30;
  const nakshatraIndex = Math.floor(lon / (360 / 27));
  const nakshatra = nakshatraIndex + 1;
  const padaFraction = (lon % (360 / 27)) / (360 / 27 / 4);
  const pada = Math.floor(padaFraction) + 1;
  return {
    sign,
    degree,
    longitude: lon,
    nakshatra,
    pada: Math.min(pada, 4),
    retrograde,
  };
}

// ─── JULIAN DAY ──────────────────────────────────────────────────────────────

export function calculateJulianDay(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
): number {
  const h = hour + minute / 60 + second / 3600;
  let y = year;
  let m = month;
  if (m <= 2) {
    y--;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    h / 24 +
    B -
    1524.5
  );
}

// ─── AYANAMSA ────────────────────────────────────────────────────────────────

function getLahiriAyanamsa(jd: number): number {
  const t = (jd - 2451545.0) / 36525;
  const year = 2000 + t * 100;
  return 23.85 + (year - 2000) * 0.0139722;
}

// ─── PLANET POSITIONS (Jean Meeus simplified) ────────────────────────────────

function sunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T;
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  const Mr = toRad(M);
  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * Mr) +
    0.000289 * Math.sin(3 * Mr);
  return normalizeAngle(L0 + C);
}

function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 218.3164477 + 481267.88123421 * T;
  const M = 357.5291092 + 35999.0502909 * T;
  const Mp = 134.9633964 + 477198.8675055 * T;
  const D = 297.8501921 + 445267.1114034 * T;
  const F = 93.272095 + 483202.0175233 * T;
  const Mr = toRad(M);
  const Mpr = toRad(Mp);
  const Dr = toRad(D);
  const Fr = toRad(F);
  const lon =
    L0 +
    6.288774 * Math.sin(Mpr) +
    1.274027 * Math.sin(2 * Dr - Mpr) +
    0.658314 * Math.sin(2 * Dr) +
    0.213618 * Math.sin(2 * Mpr) -
    0.185116 * Math.sin(Mr) -
    0.114332 * Math.sin(2 * Fr) +
    0.058793 * Math.sin(2 * Dr - 2 * Mpr) +
    0.057066 * Math.sin(2 * Dr - Mr - Mpr) +
    0.053322 * Math.sin(2 * Dr + Mpr) +
    0.045758 * Math.sin(2 * Dr - Mr) -
    0.040923 * Math.sin(Mr - Mpr) -
    0.03472 * Math.sin(Dr) -
    0.030383 * Math.sin(Mr + Mpr);
  return normalizeAngle(lon);
}

function marsLongitude(jd: number): { lon: number; retro: boolean } {
  const T = (jd - 2451545.0) / 36525;
  const L = 355.433 + 19140.299 * T;
  const M = toRad(19.373 + 19140.3 * T);
  const lon = normalizeAngle(
    L + 10.691 * Math.sin(M) + 0.623 * Math.sin(2 * M),
  );
  const retro = Math.sin(M) < -0.5;
  return { lon, retro };
}

function mercuryLongitude(jd: number): { lon: number; retro: boolean } {
  const T = (jd - 2451545.0) / 36525;
  const L = 252.251 + 149472.675 * T;
  const M = toRad(174.794 + 149472.515 * T);
  const lon = normalizeAngle(L + 23.44 * Math.sin(M) + 2.859 * Math.sin(2 * M));
  const retro = Math.sin(M) < -0.4;
  return { lon, retro };
}

function jupiterLongitude(jd: number): { lon: number; retro: boolean } {
  const T = (jd - 2451545.0) / 36525;
  const L = 34.351 + 3034.906 * T;
  const M = toRad(19.895 + 3034.906 * T);
  const lon = normalizeAngle(L + 5.555 * Math.sin(M) + 0.168 * Math.sin(2 * M));
  const retro = Math.sin(M) > 0.85;
  return { lon, retro };
}

function venusLongitude(jd: number): { lon: number; retro: boolean } {
  const T = (jd - 2451545.0) / 36525;
  const L = 181.979 + 58517.816 * T;
  const M = toRad(212.448 + 58517.803 * T);
  const lon = normalizeAngle(L + 0.724 * Math.sin(M) + 0.021 * Math.sin(2 * M));
  const retro = Math.sin(M) < -0.9;
  return { lon, retro };
}

function saturnLongitude(jd: number): { lon: number; retro: boolean } {
  const T = (jd - 2451545.0) / 36525;
  const L = 50.077 + 1222.114 * T;
  const M = toRad(316.967 + 1222.114 * T);
  const lon = normalizeAngle(L + 6.406 * Math.sin(M) + 0.319 * Math.sin(2 * M));
  const retro = Math.sin(M) > 0.8;
  return { lon, retro };
}

function rahuLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return normalizeAngle(125.044555 - 1934.1361849 * T);
}

function uranusLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return normalizeAngle(314.055 + 428.469 * T);
}

function neptuneLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return normalizeAngle(304.348 + 218.461 * T);
}

function plutoLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return normalizeAngle(238.956 + 144.96 * T);
}

// ─── LAGNA ───────────────────────────────────────────────────────────────────

export function calculateLagna(
  jd: number,
  latitude: number,
  longitude: number,
): PlanetData {
  const T = (jd - 2451545.0) / 36525;
  const RAMC = normalizeAngle(
    280.46061837 + 360.98564736629 * (jd - 2451545.0) + longitude,
  );
  const eps = 23.4392911 - 0.013004167 * T;
  const MCr = toRad(RAMC);
  const epsr = toRad(eps);
  const latR = toRad(latitude);
  const ascMc = Math.atan2(
    Math.cos(MCr),
    -(Math.sin(MCr) * Math.cos(epsr) + Math.tan(latR) * Math.sin(epsr)),
  );
  let ascDeg = toDeg(ascMc);
  if (ascDeg < 0) ascDeg += 360;
  // Simplified Asc = RAMC + correction
  const correctedAsc = normalizeAngle(RAMC + (ascDeg % 180));
  const ayanamsa = getLahiriAyanamsa(jd);
  const siderealAsc = normalizeAngle(correctedAsc - ayanamsa);
  return toPlanetData(siderealAsc);
}

// ─── MAIN CALCULATION ─────────────────────────────────────────────────────────

export function calculateSiderealPositions(
  jd: number,
  latitude = 28.6,
  longitude = 77.2,
): PlanetPositions {
  const ayanamsa = getLahiriAyanamsa(jd);
  const toSidereal = (lon: number) => normalizeAngle(lon - ayanamsa);

  const sunTrop = sunLongitude(jd);
  const moonTrop = moonLongitude(jd);
  const marsTrop = marsLongitude(jd);
  const mercuryTrop = mercuryLongitude(jd);
  const jupiterTrop = jupiterLongitude(jd);
  const venusTrop = venusLongitude(jd);
  const saturnTrop = saturnLongitude(jd);
  const rahuTrop = rahuLongitude(jd);
  const uranusTrop = uranusLongitude(jd);
  const neptuneTrop = neptuneLongitude(jd);
  const plutoTrop = plutoLongitude(jd);
  const ketuTrop = normalizeAngle(rahuTrop + 180);

  const lagna = calculateLagna(jd, latitude, longitude);

  return {
    ASC: lagna,
    Sun: toPlanetData(toSidereal(sunTrop)),
    Moon: toPlanetData(toSidereal(moonTrop)),
    Mars: toPlanetData(toSidereal(marsTrop.lon), marsTrop.retro),
    Mercury: toPlanetData(toSidereal(mercuryTrop.lon), mercuryTrop.retro),
    Jupiter: toPlanetData(toSidereal(jupiterTrop.lon), jupiterTrop.retro),
    Venus: toPlanetData(toSidereal(venusTrop.lon), venusTrop.retro),
    Saturn: toPlanetData(toSidereal(saturnTrop.lon), saturnTrop.retro),
    Rahu: toPlanetData(toSidereal(rahuTrop), false),
    Ketu: toPlanetData(toSidereal(ketuTrop), false),
    Uranus: toPlanetData(toSidereal(uranusTrop)),
    Neptune: toPlanetData(toSidereal(neptuneTrop)),
    Pluto: toPlanetData(toSidereal(plutoTrop)),
  };
}

// ─── AVKAHADA ────────────────────────────────────────────────────────────────

const NAKSHATRA_PAYA: Record<number, string> = {
  1: "Gold",
  2: "Gold",
  3: "Silver",
  4: "Gold",
  5: "Silver",
  6: "Copper",
  7: "Gold",
  8: "Gold",
  9: "Iron",
  10: "Iron",
  11: "Silver",
  12: "Gold",
  13: "Silver",
  14: "Copper",
  15: "Gold",
  16: "Silver",
  17: "Iron",
  18: "Copper",
  19: "Iron",
  20: "Silver",
  21: "Copper",
  22: "Gold",
  23: "Iron",
  24: "Silver",
  25: "Copper",
  26: "Iron",
  27: "Gold",
};
const NAKSHATRA_GANA: Record<number, string> = {
  1: "Deva",
  2: "Manav",
  3: "Rakshasa",
  4: "Manav",
  5: "Deva",
  6: "Manav",
  7: "Deva",
  8: "Deva",
  9: "Rakshasa",
  10: "Rakshasa",
  11: "Manav",
  12: "Manav",
  13: "Deva",
  14: "Rakshasa",
  15: "Deva",
  16: "Rakshasa",
  17: "Deva",
  18: "Rakshasa",
  19: "Rakshasa",
  20: "Manav",
  21: "Manav",
  22: "Deva",
  23: "Rakshasa",
  24: "Rakshasa",
  25: "Manav",
  26: "Manav",
  27: "Deva",
};
const NAKSHATRA_NADI: Record<number, string> = {
  1: "Aadi",
  2: "Madhya",
  3: "Antya",
  4: "Antya",
  5: "Madhya",
  6: "Aadi",
  7: "Aadi",
  8: "Madhya",
  9: "Antya",
  10: "Antya",
  11: "Madhya",
  12: "Aadi",
  13: "Aadi",
  14: "Madhya",
  15: "Antya",
  16: "Antya",
  17: "Madhya",
  18: "Aadi",
  19: "Aadi",
  20: "Madhya",
  21: "Antya",
  22: "Antya",
  23: "Madhya",
  24: "Aadi",
  25: "Aadi",
  26: "Madhya",
  27: "Antya",
};
const NAKSHATRA_YONI: Record<number, string> = {
  1: "Horse",
  2: "Elephant",
  3: "Goat",
  4: "Serpent",
  5: "Serpent",
  6: "Dog",
  7: "Cat",
  8: "Goat",
  9: "Cat",
  10: "Rat",
  11: "Rat",
  12: "Cow",
  13: "Buffalo",
  14: "Tiger",
  15: "Buffalo",
  16: "Tiger",
  17: "Deer",
  18: "Deer",
  19: "Dog",
  20: "Monkey",
  21: "Mongoose",
  22: "Monkey",
  23: "Lion",
  24: "Horse",
  25: "Lion",
  26: "Cow",
  27: "Elephant",
};
const SIGN_VARNA: Record<number, string> = {
  1: "Kshatriya",
  2: "Vaishya",
  3: "Shudra",
  4: "Brahmin",
  5: "Kshatriya",
  6: "Vaishya",
  7: "Shudra",
  8: "Brahmin",
  9: "Kshatriya",
  10: "Vaishya",
  11: "Shudra",
  12: "Brahmin",
};
const SIGN_VASYA: Record<number, string> = {
  1: "Chatushpada",
  2: "Chatushpada",
  3: "Manav",
  4: "Jalchar",
  5: "Vanchar",
  6: "Manav",
  7: "Manav",
  8: "Keeta",
  9: "Chatushpada",
  10: "Chatushpada",
  11: "Manav",
  12: "Jalchar",
};
const SIGN_TATVA: Record<number, string> = {
  1: "Fire",
  5: "Fire",
  9: "Fire",
  2: "Earth",
  6: "Earth",
  10: "Earth",
  3: "Air",
  7: "Air",
  11: "Air",
  4: "Water",
  8: "Water",
  12: "Water",
};

export function calculateAvkahada(
  moonNakshatra: number,
  moonPada: number,
  lagnaSign: number,
): AvkahadaData {
  return {
    paya: NAKSHATRA_PAYA[moonNakshatra] || "Gold",
    varna: SIGN_VARNA[lagnaSign] || "Brahmin",
    yoni: NAKSHATRA_YONI[moonNakshatra] || "Horse",
    gana: NAKSHATRA_GANA[moonNakshatra] || "Deva",
    vasya:
      SIGN_VASYA[
        moonNakshatra <= 9 ? Math.ceil(moonNakshatra / 3) * 2 - 1 : 1
      ] || "Manav",
    nadi: NAKSHATRA_NADI[moonNakshatra] || "Aadi",
    tatva: SIGN_TATVA[lagnaSign] || "Fire",
    varga: `${moonPada}/${4}`,
  };
}

// ─── DASHA CALCULATION ───────────────────────────────────────────────────────

function dashaLordFromNakshatra(nakshatra: number): string {
  return NAKSHATRA_DASHA_LORD[(nakshatra - 1) % 9];
}

export function calculateDashaBalance(
  moonNakshatra: number,
  moonDegreeInNakshatra: number,
  _birthDate: Date,
): DashaBalance {
  const lord = dashaLordFromNakshatra(moonNakshatra);
  const totalYears = DASHA_YEARS[lord];
  const nakshatraSpan = 360 / 27; // 13.333 degrees
  const fraction = moonDegreeInNakshatra / nakshatraSpan;
  const remainingFraction = 1 - fraction;
  const remainingTotalDays = remainingFraction * totalYears * 365.25;
  const remainingYears = Math.floor(remainingTotalDays / 365.25);
  const remainingMonths = Math.floor((remainingTotalDays % 365.25) / 30.4375);
  const remainingDays = Math.floor(remainingTotalDays % 30.4375);
  return { lord, remainingYears, remainingMonths, remainingDays, totalYears };
}

export function calculateVimshottariDasha(
  birthDate: Date,
  moonNakshatra: number,
  moonDegreeInNakshatra: number,
): MahaDasha[] {
  const balance = calculateDashaBalance(
    moonNakshatra,
    moonDegreeInNakshatra,
    birthDate,
  );
  const startLordIndex = DASHA_SEQUENCE.indexOf(balance.lord);
  const dashas: MahaDasha[] = [];

  // First dasha starts at birth
  let currentDate = new Date(birthDate);
  // Adjust for remaining balance — first dasha starts earlier
  const totalFirstDays = balance.totalYears * 365.25;
  const balanceDays =
    balance.remainingYears * 365.25 +
    balance.remainingMonths * 30.4375 +
    balance.remainingDays;
  const firstDashaStartOffset = totalFirstDays - balanceDays;
  currentDate = new Date(
    birthDate.getTime() - firstDashaStartOffset * 86400000,
  );

  for (let i = 0; i < 9; i++) {
    const lordIndex = (startLordIndex + i) % 9;
    const lord = DASHA_SEQUENCE[lordIndex];
    const years = DASHA_YEARS[lord];
    const endDate = new Date(currentDate.getTime() + years * 365.25 * 86400000);

    // Calculate antardashas
    const antardashas: AntarDasha[] = [];
    let adStart = new Date(currentDate);
    for (let j = 0; j < 9; j++) {
      const adLordIndex = (lordIndex + j) % 9;
      const adLord = DASHA_SEQUENCE[adLordIndex];
      const adYears = (years * DASHA_YEARS[adLord]) / 120;
      const adEnd = new Date(adStart.getTime() + adYears * 365.25 * 86400000);
      antardashas.push({
        lord: adLord,
        startDate: new Date(adStart),
        endDate: adEnd,
        years: adYears,
      });
      adStart = adEnd;
    }

    dashas.push({
      lord,
      startDate: new Date(currentDate),
      endDate,
      years,
      antardashas,
    });
    currentDate = endDate;
  }

  return dashas;
}

// ─── SHADOW PLANETS ──────────────────────────────────────────────────────────

export function calculateShadowPlanets(
  jd: number,
  _lagnaLongitude: number,
): ShadowPlanetData {
  const sunLon = normalizeAngle(sunLongitude(jd) - getLahiriAyanamsa(jd));
  const dhuma = normalizeAngle(sunLon + 133.333);
  const vyatipata = normalizeAngle(360 - dhuma);
  const parivesh = normalizeAngle(vyatipata + 180);
  const indrachapa = normalizeAngle(360 - parivesh);
  const upaketu = normalizeAngle(sunLon - 30);
  return {
    Dhuma: toPlanetData(dhuma),
    Vyatipata: toPlanetData(vyatipata),
    Parivesh: toPlanetData(parivesh),
    Indrachapa: toPlanetData(indrachapa),
    Upaketu: toPlanetData(upaketu),
  };
}

// ─── HOUSE CUSPS (Whole Sign) ─────────────────────────────────────────────────

export function calculateHouseCusps(lagnaLongitude: number): HouseCusp[] {
  const cusps: HouseCusp[] = [];
  const lagnaSign = Math.floor(lagnaLongitude / 30) + 1;
  for (let i = 0; i < 12; i++) {
    const signNum = ((lagnaSign - 1 + i) % 12) + 1;
    cusps.push({
      house: i + 1,
      signStart: signNum,
      degreeStart: 0,
      signMid: signNum,
      degreeMid: 15,
    });
  }
  return cusps;
}

// ─── NAVAMSA ─────────────────────────────────────────────────────────────────

export function calculateNavamsa(longitude: number): { sign: number } {
  const lon = normalizeAngle(longitude);
  const sign = Math.floor(lon / 30) + 1;
  const degInSign = lon % 30;
  const navamsaIndex = Math.floor(degInSign / (30 / 9));
  // Navamsa starting sign depends on element of the rasi
  const fireStart = [1, 9, 5]; // Aries, Sag, Leo start from Aries (1)
  const earthStart = [2, 10, 6]; // Taurus, Cap, Virgo start from Capricorn (10)
  const airStart = [3, 11, 7]; // Gemini, Aqua, Libra start from Libra (7)
  const waterStart = [4, 12, 8]; // Cancer, Pisces, Sco start from Cancer (4)
  let startSign = 1;
  if (fireStart.includes(sign)) startSign = 1;
  else if (earthStart.includes(sign)) startSign = 10;
  else if (airStart.includes(sign)) startSign = 7;
  else if (waterStart.includes(sign)) startSign = 4;
  const navamsaSign = ((startSign - 1 + navamsaIndex) % 12) + 1;
  return { sign: navamsaSign };
}

// ─── DIVISIONAL CHARTS ───────────────────────────────────────────────────────

function calculateDivisionalSign(longitude: number, division: number): number {
  const lon = normalizeAngle(longitude);
  const sign = Math.floor(lon / 30) + 1;
  const degInSign = lon % 30;
  const partSize = 30 / division;
  const partIndex = Math.floor(degInSign / partSize);
  return ((sign - 1 + partIndex) % 12) + 1;
}

function divisionalPositions(
  positions: PlanetPositions,
  division: number,
): Record<string, PlanetData> {
  const planets = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
    "Rahu",
    "Ketu",
    "ASC",
  ] as const;
  const result: Record<string, PlanetData> = {};
  for (const p of planets) {
    const lon = positions[p].longitude;
    const newSign = calculateDivisionalSign(lon, division);
    result[p] = toPlanetData((newSign - 1) * 30 + (lon % 30));
  }
  return result;
}

export function calculateAllDivisionalCharts(
  positions: PlanetPositions,
): DivisionalCharts {
  return {
    D1: positions,
    D2: divisionalPositions(positions, 2),
    D3: divisionalPositions(positions, 3),
    D4: divisionalPositions(positions, 4),
    D5: divisionalPositions(positions, 5),
    D6: divisionalPositions(positions, 6),
    D7: divisionalPositions(positions, 7),
    D8: divisionalPositions(positions, 8),
    D9: divisionalPositions(positions, 9),
    D10: divisionalPositions(positions, 10),
    D11: divisionalPositions(positions, 11),
    D12: divisionalPositions(positions, 12),
    D16: divisionalPositions(positions, 16),
    D20: divisionalPositions(positions, 20),
    D24: divisionalPositions(positions, 24),
    D27: divisionalPositions(positions, 27),
    D30: divisionalPositions(positions, 30),
    D40: divisionalPositions(positions, 40),
    D45: divisionalPositions(positions, 45),
    D60: divisionalPositions(positions, 60),
  };
}

// ─── ASHTAKVARGA ─────────────────────────────────────────────────────────────

// Classical Ashtakvarga beneficial positions (1-indexed from own sign)
const ASHTAKVARGA_BENEFICS: Record<string, Record<string, number[]>> = {
  Sun: {
    Sun: [1, 2, 4, 7, 8, 9, 10, 11],
    Moon: [3, 6, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [3, 5, 6, 9, 10, 11, 12],
    Jupiter: [5, 6, 9, 11],
    Venus: [6, 7, 12],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Lagna: [3, 4, 6, 10, 11, 12],
  },
  Moon: {
    Sun: [3, 6, 7, 8, 10, 11],
    Moon: [1, 3, 6, 7, 10, 11],
    Mars: [2, 3, 5, 6, 9, 10, 11],
    Mercury: [1, 3, 4, 5, 7, 8, 10, 11],
    Jupiter: [1, 4, 7, 8, 10, 11, 12],
    Venus: [3, 4, 5, 7, 9, 10, 11],
    Saturn: [3, 5, 6, 11],
    Lagna: [3, 6, 10, 11],
  },
  Mars: {
    Sun: [3, 5, 6, 10, 11],
    Moon: [3, 6, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [3, 5, 6, 11],
    Jupiter: [6, 10, 11, 12],
    Venus: [6, 8, 11, 12],
    Saturn: [1, 4, 7, 8, 9, 10, 11],
    Lagna: [1, 3, 6, 10, 11],
  },
  Mercury: {
    Sun: [5, 6, 9, 11, 12],
    Moon: [2, 4, 6, 8, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [1, 3, 5, 6, 9, 10, 11, 12],
    Jupiter: [6, 8, 11, 12],
    Venus: [1, 2, 3, 4, 5, 8, 9, 11],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Lagna: [1, 2, 4, 6, 8, 10, 11],
  },
  Jupiter: {
    Sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
    Moon: [2, 5, 7, 9, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [1, 2, 4, 5, 6, 9, 10, 11],
    Jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
    Venus: [2, 5, 6, 9, 10, 11],
    Saturn: [3, 5, 6, 12],
    Lagna: [1, 2, 4, 5, 6, 7, 9, 10, 11],
  },
  Venus: {
    Sun: [8, 11, 12],
    Moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
    Mars: [3, 4, 6, 9, 11, 12],
    Mercury: [3, 5, 6, 9, 11],
    Jupiter: [5, 8, 9, 10, 11],
    Venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
    Saturn: [3, 4, 5, 8, 9, 10, 11],
    Lagna: [1, 2, 3, 4, 5, 8, 9, 11],
  },
  Saturn: {
    Sun: [1, 2, 4, 7, 8, 10, 11],
    Moon: [3, 6, 11],
    Mars: [3, 5, 6, 10, 11, 12],
    Mercury: [6, 8, 9, 10, 11, 12],
    Jupiter: [5, 6, 11, 12],
    Venus: [6, 11, 12],
    Saturn: [3, 5, 6, 11],
    Lagna: [1, 3, 4, 6, 10, 11],
  },
};

function getPlanetSign(positions: PlanetPositions, planet: string): number {
  const p = positions[planet as keyof PlanetPositions];
  return p ? p.sign : 1;
}

export function calculateAshtakvarga(
  positions: PlanetPositions,
): AshtakvargaTable {
  const planetList = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
  ];
  const referenceList = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
    "Lagna",
  ];
  const planetScores: Record<string, number[]> = {};
  const binduCount: Record<string, number> = {};

  for (const planet of planetList) {
    const scores = new Array(12).fill(0);
    const beneficPositions = ASHTAKVARGA_BENEFICS[planet];

    for (const ref of referenceList) {
      const refSign =
        ref === "Lagna" ? positions.ASC.sign : getPlanetSign(positions, ref);
      const relativePositions = beneficPositions[ref] || [];
      for (const relPos of relativePositions) {
        const targetSign = ((refSign - 1 + relPos - 1) % 12) + 1;
        scores[targetSign - 1]++;
      }
    }

    planetScores[planet] = scores;
    binduCount[planet] = scores.reduce((a, b) => a + b, 0);
  }

  const sarvashtakvarga = new Array(12).fill(0);
  for (const planet of planetList) {
    for (let i = 0; i < 12; i++) {
      sarvashtakvarga[i] += planetScores[planet][i];
    }
  }

  return { planets: planetScores, sarvashtakvarga, binduCount };
}

// ─── ASTRO SCORE ──────────────────────────────────────────────────────────────

export function calculateAstroScore(
  _positions: PlanetPositions,
  avkahada: AvkahadaData,
  dashaLord: string,
): number {
  let score = 50;
  // Bonus for Gold/Silver Paya
  if (avkahada.paya === "Gold") score += 15;
  else if (avkahada.paya === "Silver") score += 10;
  else if (avkahada.paya === "Copper") score += 5;
  // Deva gana bonus
  if (avkahada.gana === "Deva") score += 10;
  else if (avkahada.gana === "Manav") score += 5;
  // Beneficial dasha lords
  const beneficLords = ["Jupiter", "Venus", "Mercury", "Moon"];
  if (beneficLords.includes(dashaLord)) score += 10;
  // Cap at 100
  return Math.min(100, Math.max(0, score));
}

// ─── LOOKUP HELPERS ───────────────────────────────────────────────────────────

export function getZodiacSign(num: number) {
  return ZODIAC_SIGNS.find((s) => s.num === num) || ZODIAC_SIGNS[0];
}

export function getNakshatra(num: number) {
  return NAKSHATRAS.find((n) => n.num === num) || NAKSHATRAS[0];
}
