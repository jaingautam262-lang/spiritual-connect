// Chaldean Numerology Utility Functions

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

export function getChaldeanValue(letter: string): number {
  return CHALDEAN_MAP[letter.toUpperCase()] || 0;
}

export function calculateChaldeanNameNumber(name: string): number {
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .reduce((acc, ch) => acc + getChaldeanValue(ch), 0);
  return reduceToSingleDigit(sum);
}

export function reduceToSingleDigit(num: number): number {
  let current = num;
  while (current > 9) {
    current = current
      .toString()
      .split("")
      .reduce((a, d) => a + Number.parseInt(d), 0);
  }
  return current;
}

export function calculateMoolank(dob: string): number {
  // Moolank = day of birth reduced to single digit
  const parts = dob.split("-");
  if (parts.length < 3) return 0;
  const day = Number.parseInt(parts[2]);
  return reduceToSingleDigit(day);
}

export function calculateBhagyank(dob: string): number {
  // Bhagyank = sum of all digits in full date
  const digits = dob
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceToSingleDigit(sum);
}

export function extractLoShuNumbers(dob: string): number[] {
  return dob
    .replace(/[^0-9]/g, "")
    .split("")
    .map(Number)
    .filter((n) => n >= 1 && n <= 9);
}

export function getRulingPlanet(num: number): string {
  const planets: Record<number, string> = {
    1: "Sun (Surya)",
    2: "Moon (Chandra)",
    3: "Jupiter (Guru)",
    4: "Rahu",
    5: "Mercury (Budh)",
    6: "Venus (Shukra)",
    7: "Ketu",
    8: "Saturn (Shani)",
    9: "Mars (Mangal)",
  };
  return planets[num] || "Unknown";
}

export function calculateCompatibility(
  name1: string,
  dob1: string,
  name2: string,
  dob2: string,
): number {
  const n1 = calculateChaldeanNameNumber(name1);
  const b1 = calculateBhagyank(dob1);
  const n2 = calculateChaldeanNameNumber(name2);
  const b2 = calculateBhagyank(dob2);
  const diff = Math.abs(n1 + b1 - (n2 + b2));
  const maxDiff = 18;
  return Math.round(((maxDiff - diff) / maxDiff) * 100);
}

export function generateNameSuggestions(
  baseName: string,
  targetNumbers: number[] = [1, 5, 6, 9],
): Array<{ name: string; number: number }> {
  const suggestions: Array<{ name: string; number: number }> = [];
  const vowels = ["a", "e", "i", "o", "u", "aa", "ee"];
  const suffixes = ["a", "i", "an", "in", "on", "al", "el"];

  for (const suffix of suffixes) {
    const candidate = baseName + suffix;
    const num = calculateChaldeanNameNumber(candidate);
    if (
      targetNumbers.includes(num) &&
      !suggestions.find((s) => s.name === candidate)
    ) {
      suggestions.push({ name: candidate, number: num });
    }
    if (suggestions.length >= 5) break;
  }

  // Try removing last letter
  if (baseName.length > 3) {
    const shorter = baseName.slice(0, -1);
    const num = calculateChaldeanNameNumber(shorter);
    if (targetNumbers.includes(num)) {
      suggestions.push({ name: shorter, number: num });
    }
  }

  // Try doubling last vowel
  const lastChar = baseName.slice(-1).toLowerCase();
  if (vowels.includes(lastChar)) {
    const doubled = baseName + lastChar;
    const num = calculateChaldeanNameNumber(doubled);
    if (targetNumbers.includes(num)) {
      suggestions.push({ name: doubled, number: num });
    }
  }

  return suggestions.slice(0, 5);
}
