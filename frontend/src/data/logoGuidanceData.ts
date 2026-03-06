export interface LogoGuidance {
  rashi: string;
  planet: string;
  colors: Array<{ name: string; hex: string }>;
  symbols: string[];
  designElements: string[];
  fonts: string[];
}

export const LOGO_GUIDANCE: LogoGuidance[] = [
  { rashi: 'Aries (Mesh)', planet: 'Mars', colors: [{ name: 'Crimson Red', hex: '#DC143C' }, { name: 'Orange', hex: '#FF6B00' }, { name: 'Gold', hex: '#D4AF37' }], symbols: ['Ram', 'Arrow', 'Triangle', 'Flame'], designElements: ['Bold lines', 'Dynamic angles', 'Upward pointing shapes'], fonts: ['Bold sans-serif', 'Strong geometric'] },
  { rashi: 'Taurus (Vrishabh)', planet: 'Venus', colors: [{ name: 'Forest Green', hex: '#228B22' }, { name: 'Rose Pink', hex: '#FF69B4' }, { name: 'Ivory', hex: '#FFFFF0' }], symbols: ['Bull', 'Lotus', 'Earth', 'Diamond'], designElements: ['Rounded curves', 'Natural motifs', 'Elegant flourishes'], fonts: ['Elegant serif', 'Flowing script'] },
  { rashi: 'Gemini (Mithun)', planet: 'Mercury', colors: [{ name: 'Yellow', hex: '#FFD700' }, { name: 'Light Blue', hex: '#87CEEB' }, { name: 'Silver', hex: '#C0C0C0' }], symbols: ['Twins', 'Wings', 'Infinity', 'Pen'], designElements: ['Dual elements', 'Dynamic movement', 'Clean lines'], fonts: ['Modern sans-serif', 'Playful display'] },
  { rashi: 'Cancer (Kark)', planet: 'Moon', colors: [{ name: 'Silver White', hex: '#F5F5F5' }, { name: 'Pearl', hex: '#EAE0C8' }, { name: 'Sea Blue', hex: '#006994' }], symbols: ['Crab', 'Moon', 'Water', 'Shell'], designElements: ['Curved shapes', 'Flowing water motifs', 'Soft gradients'], fonts: ['Soft rounded', 'Gentle script'] },
  { rashi: 'Leo (Simha)', planet: 'Sun', colors: [{ name: 'Royal Gold', hex: '#D4AF37' }, { name: 'Saffron', hex: '#FF6B00' }, { name: 'Royal Purple', hex: '#7851A9' }], symbols: ['Lion', 'Sun', 'Crown', 'Star'], designElements: ['Majestic proportions', 'Radiant sunburst', 'Bold symmetry'], fonts: ['Regal serif', 'Decorative caps'] },
  { rashi: 'Virgo (Kanya)', planet: 'Mercury', colors: [{ name: 'Navy Blue', hex: '#000080' }, { name: 'Forest Green', hex: '#228B22' }, { name: 'Beige', hex: '#F5F5DC' }], symbols: ['Maiden', 'Wheat', 'Caduceus', 'Grid'], designElements: ['Precise geometry', 'Clean minimalism', 'Detailed patterns'], fonts: ['Clean sans-serif', 'Precise geometric'] },
  { rashi: 'Libra (Tula)', planet: 'Venus', colors: [{ name: 'Rose Pink', hex: '#FF69B4' }, { name: 'Sky Blue', hex: '#87CEEB' }, { name: 'Lavender', hex: '#E6E6FA' }], symbols: ['Scales', 'Balance', 'Lotus', 'Dove'], designElements: ['Balanced symmetry', 'Elegant curves', 'Harmonious proportions'], fonts: ['Elegant serif', 'Balanced display'] },
  { rashi: 'Scorpio (Vrishchik)', planet: 'Mars', colors: [{ name: 'Deep Maroon', hex: '#800000' }, { name: 'Black', hex: '#1C1C1C' }, { name: 'Dark Red', hex: '#8B0000' }], symbols: ['Scorpion', 'Eagle', 'Phoenix', 'Serpent'], designElements: ['Intense contrasts', 'Mysterious depth', 'Transformative symbols'], fonts: ['Bold dramatic', 'Gothic display'] },
  { rashi: 'Sagittarius (Dhanu)', planet: 'Jupiter', colors: [{ name: 'Royal Purple', hex: '#7851A9' }, { name: 'Turquoise', hex: '#40E0D0' }, { name: 'Gold', hex: '#D4AF37' }], symbols: ['Archer', 'Arrow', 'Horse', 'Flame'], designElements: ['Expansive design', 'Upward movement', 'Global motifs'], fonts: ['Bold adventurous', 'Strong display'] },
  { rashi: 'Capricorn (Makar)', planet: 'Saturn', colors: [{ name: 'Dark Grey', hex: '#696969' }, { name: 'Black', hex: '#1C1C1C' }, { name: 'Dark Brown', hex: '#5C4033' }], symbols: ['Goat', 'Mountain', 'Diamond', 'Clock'], designElements: ['Structured geometry', 'Timeless design', 'Strong foundations'], fonts: ['Classic serif', 'Authoritative display'] },
  { rashi: 'Aquarius (Kumbh)', planet: 'Saturn', colors: [{ name: 'Electric Blue', hex: '#7DF9FF' }, { name: 'Violet', hex: '#EE82EE' }, { name: 'Silver', hex: '#C0C0C0' }], symbols: ['Water Bearer', 'Waves', 'Lightning', 'Star'], designElements: ['Futuristic design', 'Wave patterns', 'Innovative shapes'], fonts: ['Modern geometric', 'Futuristic display'] },
  { rashi: 'Pisces (Meen)', planet: 'Jupiter', colors: [{ name: 'Sea Green', hex: '#2E8B57' }, { name: 'Aqua', hex: '#00FFFF' }, { name: 'Lavender', hex: '#E6E6FA' }], symbols: ['Fish', 'Waves', 'Lotus', 'Moon'], designElements: ['Flowing curves', 'Water motifs', 'Dreamy gradients'], fonts: ['Flowing script', 'Soft rounded'] },
];
