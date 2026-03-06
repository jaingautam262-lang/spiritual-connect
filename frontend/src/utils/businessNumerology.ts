import {
  calculateChaldeanNameNumber,
  calculateMoolank,
  calculateBhagyank,
  getRulingPlanet,
  generateNameSuggestions,
  getChaldeanValue,
} from './chaldeanNumerology';

export interface BusinessAnalysis {
  businessName: string;
  chaldeanValue: number;
  rulingPlanet: string;
  ownerMoolank: number;
  ownerBhagyank: number;
  compatibility: string;
  compatibilityScore: number;
  luckyDays: string[];
  luckyColors: string[];
  luckyGemstones: string[];
  recommendations: string[];
}

export function analyzeBusinessName(businessName: string, ownerDob: string): BusinessAnalysis {
  const chaldeanValue = calculateChaldeanNameNumber(businessName);
  const rulingPlanet = getRulingPlanet(chaldeanValue);
  const ownerMoolank = calculateMoolank(ownerDob);
  const ownerBhagyank = calculateBhagyank(ownerDob);

  const compatibilityMap: Record<string, { score: number; label: string }> = {
    '1-1': { score: 90, label: 'Excellent' }, '1-5': { score: 85, label: 'Very Good' },
    '1-9': { score: 88, label: 'Excellent' }, '2-6': { score: 82, label: 'Very Good' },
    '3-3': { score: 78, label: 'Good' }, '5-5': { score: 80, label: 'Good' },
    '6-6': { score: 85, label: 'Very Good' }, '9-9': { score: 90, label: 'Excellent' },
  };

  const key = `${chaldeanValue}-${ownerMoolank}`;
  const compat = compatibilityMap[key] || { score: 65, label: 'Moderate' };

  const luckyDaysMap: Record<number, string[]> = {
    1: ['Sunday', 'Monday'], 2: ['Monday', 'Friday'], 3: ['Thursday', 'Tuesday'],
    4: ['Sunday', 'Saturday'], 5: ['Wednesday', 'Friday'], 6: ['Friday', 'Wednesday'],
    7: ['Monday', 'Sunday'], 8: ['Saturday', 'Sunday'], 9: ['Tuesday', 'Thursday'],
  };

  const luckyColorsMap: Record<number, string[]> = {
    1: ['Gold', 'Orange', 'Yellow'], 2: ['White', 'Silver', 'Cream'],
    3: ['Yellow', 'Purple', 'Gold'], 4: ['Blue', 'Grey', 'Electric Blue'],
    5: ['Green', 'Light Blue', 'White'], 6: ['Pink', 'White', 'Light Blue'],
    7: ['Violet', 'Purple', 'White'], 8: ['Black', 'Dark Blue', 'Grey'],
    9: ['Red', 'Crimson', 'Orange'],
  };

  const luckyGemstonesMap: Record<number, string[]> = {
    1: ['Ruby', 'Sunstone'], 2: ['Pearl', 'Moonstone'], 3: ['Yellow Sapphire', 'Citrine'],
    4: ['Hessonite', 'Gomed'], 5: ['Emerald', 'Green Aventurine'], 6: ['Diamond', 'Opal'],
    7: ["Cat's Eye", 'Chrysoberyl'], 8: ['Blue Sapphire', 'Amethyst'], 9: ['Red Coral', 'Carnelian'],
  };

  return {
    businessName,
    chaldeanValue,
    rulingPlanet,
    ownerMoolank,
    ownerBhagyank,
    compatibility: compat.label,
    compatibilityScore: compat.score,
    luckyDays: luckyDaysMap[chaldeanValue] || ['Monday', 'Friday'],
    luckyColors: luckyColorsMap[chaldeanValue] || ['Gold', 'White'],
    luckyGemstones: luckyGemstonesMap[chaldeanValue] || ['Citrine', 'Quartz'],
    recommendations: [
      `Your business name vibrates with the energy of ${rulingPlanet}.`,
      `Best days to launch or sign contracts: ${(luckyDaysMap[chaldeanValue] || ['Monday']).join(', ')}.`,
      `Use ${(luckyColorsMap[chaldeanValue] || ['Gold'])[0]} prominently in your branding.`,
      `Wear ${(luckyGemstonesMap[chaldeanValue] || ['Citrine'])[0]} for enhanced business luck.`,
    ],
  };
}

export function correctBusinessName(name: string): Array<{ name: string; number: number; improvement: string }> {
  const suggestions = generateNameSuggestions(name, [1, 5, 6, 9]);
  return suggestions.map((s) => ({
    ...s,
    improvement: `Number ${s.number} brings ${getNumberMeaning(s.number)}`,
  }));
}

export function generateCompanyNames(
  ownerDob: string,
  purpose: string,
  keyword: string
): Array<{ name: string; number: number }> {
  const purposeKeywords: Record<string, string[]> = {
    Wealth: ['Dhan', 'Lakshmi', 'Samridhi', 'Artha', 'Vridhi', 'Kosh'],
    Fame: ['Yash', 'Kirti', 'Prabhav', 'Gaurav', 'Pratap', 'Tej'],
    Stability: ['Sthir', 'Dhruv', 'Nishtha', 'Adhar', 'Mool', 'Stambh'],
    Creativity: ['Srijan', 'Kala', 'Rachna', 'Nava', 'Udaya', 'Pratibha'],
    Leadership: ['Neta', 'Agra', 'Pramukh', 'Shreshtha', 'Uttam', 'Shikhar'],
    Healing: ['Arogya', 'Swasth', 'Chikitsa', 'Aushadh', 'Jeevan', 'Prana'],
  };

  const words = purposeKeywords[purpose] || purposeKeywords['Wealth'];
  const results: Array<{ name: string; number: number }> = [];

  for (const word of words) {
    const base = keyword ? `${keyword} ${word}` : word;
    const num = calculateChaldeanNameNumber(base);
    results.push({ name: base, number: num });
    if (results.length >= 8) break;
  }

  // Add keyword-based suggestions
  if (keyword) {
    const num = calculateChaldeanNameNumber(keyword);
    results.unshift({ name: keyword, number: num });
  }

  return results.slice(0, 8);
}

export function mapNameToLoShu(name: string): { grid: number[][]; present: number[]; missing: number[] } {
  const loShuPositions: Record<number, [number, number]> = {
    4: [0, 0], 9: [0, 1], 2: [0, 2],
    3: [1, 0], 5: [1, 1], 7: [1, 2],
    8: [2, 0], 1: [2, 1], 6: [2, 2],
  };

  const grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const presentSet = new Set<number>();

  name.toUpperCase().replace(/[^A-Z]/g, '').split('').forEach((ch) => {
    const val = getChaldeanValue(ch);
    if (val >= 1 && val <= 9) {
      const pos = loShuPositions[val];
      if (pos) {
        grid[pos[0]][pos[1]]++;
        presentSet.add(val);
      }
    }
  });

  const present = Array.from(presentSet).sort((a, b) => a - b);
  const missing = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => !presentSet.has(n));

  return { grid, present, missing };
}

function getNumberMeaning(num: number): string {
  const meanings: Record<number, string> = {
    1: 'leadership and new beginnings', 2: 'harmony and partnerships',
    3: 'creativity and growth', 4: 'stability and hard work',
    5: 'freedom and versatility', 6: 'love and responsibility',
    7: 'wisdom and spirituality', 8: 'power and material success',
    9: 'completion and universal love',
  };
  return meanings[num] || 'positive energy';
}
