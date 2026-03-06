export interface PlanetaryPosition {
  planet: string;
  sign: string;
  degree: string;
  house: number;
  retrograde: boolean;
}

export interface ReportSection {
  title: string;
  content: string;
}

export interface DetailedReport {
  reportType: string;
  title: string;
  planetaryPositions: PlanetaryPosition[];
  sections: ReportSection[];
}

export const SAMPLE_PLANETARY_POSITIONS: PlanetaryPosition[] = [
  { planet: 'Sun', sign: 'Aries', degree: '15°32\'', house: 1, retrograde: false },
  { planet: 'Moon', sign: 'Cancer', degree: '22°18\'', house: 4, retrograde: false },
  { planet: 'Mars', sign: 'Scorpio', degree: '08°45\'', house: 8, retrograde: false },
  { planet: 'Mercury', sign: 'Pisces', degree: '28°12\'', house: 12, retrograde: true },
  { planet: 'Jupiter', sign: 'Sagittarius', degree: '03°55\'', house: 9, retrograde: false },
  { planet: 'Venus', sign: 'Taurus', degree: '19°30\'', house: 2, retrograde: false },
  { planet: 'Saturn', sign: 'Capricorn', degree: '11°22\'', house: 10, retrograde: false },
  { planet: 'Rahu', sign: 'Gemini', degree: '14°08\'', house: 3, retrograde: true },
  { planet: 'Ketu', sign: 'Sagittarius', degree: '14°08\'', house: 9, retrograde: true },
];

export const DETAILED_REPORTS: Record<string, DetailedReport> = {
  'birth-chart': {
    reportType: 'birth-chart',
    title: 'Birth Chart (Janam Kundli) Analysis',
    planetaryPositions: SAMPLE_PLANETARY_POSITIONS,
    sections: [
      { title: 'Lagna (Ascendant) Analysis', content: 'Your Aries ascendant makes you a natural leader with tremendous energy and drive. The first house lord Mars in the 8th house indicates transformative experiences that ultimately lead to personal growth. You possess an innate courage and pioneering spirit that sets you apart.' },
      { title: 'Career & Profession', content: 'The 10th house lord Saturn in Capricorn in its own sign is exceptionally powerful. This placement indicates a successful career in administration, government, or structured organizations. Jupiter\'s aspect on the 10th house further enhances professional prospects. Peak career years are indicated between ages 35-45.' },
      { title: 'Wealth & Finance', content: 'Venus in Taurus in the 2nd house is an excellent placement for wealth accumulation. The 2nd house lord Venus is in its own sign, indicating natural financial acumen. Multiple wealth yogas are present in your chart. Financial stability increases significantly after age 30.' },
      { title: 'Relationships & Marriage', content: 'The 7th house indicates a devoted and supportive partner. Venus\'s influence on the 7th house suggests a beautiful and harmonious marriage. The best period for marriage is indicated between ages 25-30. Your partner will be from a good family background.' },
      { title: 'Health & Vitality', content: 'The Sun in Aries gives you robust health and vitality. However, Mars in the 8th house suggests the need to be cautious about accidents and surgeries. Regular exercise and a disciplined lifestyle will ensure good health throughout life.' },
      { title: 'Remedies & Recommendations', content: 'Worship Lord Hanuman on Tuesdays. Wear Red Coral (Moonga) in gold on the ring finger of the right hand. Chant "Om Mangalaya Namah" 108 times daily. Donate red lentils on Tuesdays. Avoid starting new ventures on Saturdays.' },
    ],
  },
  'sade-sati': {
    reportType: 'sade-sati',
    title: 'Sade Sati (Saturn\'s 7.5-Year Transit) Analysis',
    planetaryPositions: SAMPLE_PLANETARY_POSITIONS,
    sections: [
      { title: 'Current Sade Sati Phase', content: 'You are currently in the second phase of Sade Sati, with Saturn transiting your natal Moon sign. This is the most intense phase, bringing challenges in career, health, and relationships. However, it also brings wisdom, discipline, and long-term rewards.' },
      { title: 'Effects on Career', content: 'Career progress may be slow during this period. Avoid changing jobs impulsively. Focus on skill development and patience. Promotions may be delayed but will come with greater rewards. Government-related work may face obstacles.' },
      { title: 'Effects on Health', content: 'Pay special attention to bone health, joints, and the nervous system. Chronic conditions may surface during this period. Regular health check-ups are advised. Yoga and meditation will be particularly beneficial.' },
      { title: 'Effects on Relationships', content: 'Relationships may face strain due to misunderstandings. Communication is key. Avoid ego clashes with family members. This period tests the strength of relationships, and those that survive will be stronger.' },
      { title: 'Remedies for Sade Sati', content: 'Worship Lord Shani (Saturn) every Saturday. Light sesame oil lamp on Saturdays. Donate black sesame seeds, black cloth, and iron items on Saturdays. Chant "Om Sham Shanicharaya Namah" 108 times. Wear Blue Sapphire or Amethyst after consulting an astrologer.' },
      { title: 'Favorable Periods', content: 'Despite the challenges, certain periods within Sade Sati are favorable. The months of March-April and September-October show improvement. Jupiter\'s transit through favorable signs will provide relief during this period.' },
    ],
  },
  'raj-yog': {
    reportType: 'raj-yog',
    title: 'Raj Yog Analysis — Yogas for Power & Success',
    planetaryPositions: SAMPLE_PLANETARY_POSITIONS,
    sections: [
      { title: 'Raj Yogas Present in Your Chart', content: 'Your birth chart contains three powerful Raj Yogas: (1) Gaja Kesari Yoga — Jupiter in Kendra from Moon, indicating fame, wisdom, and prosperity. (2) Budhaditya Yoga — Sun and Mercury conjunction, indicating intelligence and communication skills. (3) Dharma Karma Adhipati Yoga — Lords of 9th and 10th houses in conjunction, indicating exceptional career success.' },
      { title: 'Gaja Kesari Yoga Analysis', content: 'Jupiter in the 9th house forms a powerful Gaja Kesari Yoga with the Moon in the 4th house. This yoga bestows fame, wisdom, and prosperity. You will be respected in society and may achieve positions of authority. This yoga activates strongly during Jupiter\'s Mahadasha and Antardasha.' },
      { title: 'Wealth Yogas', content: 'Dhana Yoga is formed by the conjunction of 2nd and 11th house lords. Lakshmi Yoga is present due to Venus in its own sign in the 2nd house. These yogas indicate multiple sources of income and accumulation of wealth, particularly after age 35.' },
      { title: 'Activation Periods', content: 'The Raj Yogas in your chart will be most powerfully activated during: Jupiter Mahadasha (if applicable), Saturn Mahadasha (career peak), and during transits of Jupiter over your natal Sun and Moon positions. The period 2026-2030 is particularly significant.' },
      { title: 'Remedies to Strengthen Raj Yogas', content: 'Worship Lord Vishnu on Thursdays. Wear Yellow Sapphire (Pukhraj) in gold on the index finger. Chant Vishnu Sahasranama regularly. Donate yellow items on Thursdays. Perform Guru Puja on Thursdays for enhanced results.' },
    ],
  },
  'kaal-sarp': {
    reportType: 'kaal-sarp',
    title: 'Kaal Sarp Dosh Analysis',
    planetaryPositions: SAMPLE_PLANETARY_POSITIONS,
    sections: [
      { title: 'Kaal Sarp Dosh Identification', content: 'Your birth chart shows the presence of Anant Kaal Sarp Dosh, where all planets are hemmed between Rahu in the 3rd house and Ketu in the 9th house. This is one of the milder forms of Kaal Sarp Dosh, primarily affecting communication, siblings, and fortune.' },
      { title: 'Effects on Life', content: 'Kaal Sarp Dosh may cause delays in achieving goals, unexpected obstacles, and periods of struggle. However, it also bestows extraordinary determination, resilience, and the ability to overcome challenges. Many successful individuals have this dosh in their charts.' },
      { title: 'Effects on Career & Finance', content: 'Career progress may be uneven with periods of rapid advancement followed by stagnation. Financial gains may come through unconventional means. Avoid speculative investments. Business partnerships require careful evaluation.' },
      { title: 'Remedies for Kaal Sarp Dosh', content: 'Perform Kaal Sarp Dosh Puja at Trimbakeshwar (Nashik) or Ujjain. Worship Lord Shiva and offer milk on Mondays. Chant "Om Namah Shivaya" 108 times daily. Wear a silver snake ring on the little finger. Donate to snake temples and avoid harming snakes.' },
      { title: 'Auspicious Timings for Puja', content: 'The most auspicious time for Kaal Sarp Dosh Puja is during Nag Panchami, Shravan Mondays, and during solar or lunar eclipses. Performing the puja at Trimbakeshwar during these times yields maximum benefits.' },
      { title: 'Positive Aspects', content: 'Despite its challenges, Kaal Sarp Dosh also brings unique gifts: heightened intuition, spiritual inclination, and the ability to perceive hidden truths. Many great saints, leaders, and achievers have had this dosh, which ultimately pushed them toward greatness.' },
    ],
  },
};
