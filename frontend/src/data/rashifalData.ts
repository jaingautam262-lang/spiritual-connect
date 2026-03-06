export interface RashiInfo {
  id: string;
  name: string;
  hindiName: string;
  symbol: string;
  element: string;
  rulingPlanet: string;
  dates: string;
  daily: string;
  weekly: string;
  yearly: string;
}

export const RASHIS: RashiInfo[] = [
  {
    id: 'aries', name: 'Aries', hindiName: 'Mesh', symbol: '♈', element: 'Fire', rulingPlanet: 'Mars',
    dates: 'Mar 21 – Apr 19',
    daily: 'Today brings new opportunities in your career. Your energy levels are high and you may receive good news from a distant place. Avoid conflicts with colleagues. Lucky color: Red. Lucky number: 9.',
    weekly: 'This week favors financial decisions. A long-pending matter will be resolved. Your health needs attention — avoid overexertion. Relationships with family members will improve. Business partnerships look promising.',
    yearly: '2026 is a transformative year for Aries. Career advancement is strongly indicated in the first half. Financial gains through investments are likely. Marriage prospects are favorable for singles. Health requires consistent attention throughout the year.',
  },
  {
    id: 'taurus', name: 'Taurus', hindiName: 'Vrishabh', symbol: '♉', element: 'Earth', rulingPlanet: 'Venus',
    dates: 'Apr 20 – May 20',
    daily: 'Financial matters require careful attention today. A creative project may gain momentum. Spend quality time with loved ones. Lucky color: Green. Lucky number: 6.',
    weekly: 'Venus blesses your relationships this week. Financial stability improves. A property-related matter may come to a positive conclusion. Health is generally good but watch your diet.',
    yearly: '2026 brings stability and growth for Taurus. Property and real estate investments are favored. Love life flourishes in the second quarter. Career changes are possible but well-supported by planetary positions.',
  },
  {
    id: 'gemini', name: 'Gemini', hindiName: 'Mithun', symbol: '♊', element: 'Air', rulingPlanet: 'Mercury',
    dates: 'May 21 – Jun 20',
    daily: 'Communication is your strength today. New connections may prove beneficial. Avoid making hasty decisions. Lucky color: Yellow. Lucky number: 5.',
    weekly: 'Mercury enhances your intellectual abilities this week. Travel plans may materialize. Business communication yields positive results. Siblings may need your support.',
    yearly: '2026 is excellent for Gemini in terms of communication and networking. New business ventures are favored. Education and learning opportunities abound. Relationships require more attention in the latter half.',
  },
  {
    id: 'cancer', name: 'Cancer', hindiName: 'Kark', symbol: '♋', element: 'Water', rulingPlanet: 'Moon',
    dates: 'Jun 21 – Jul 22',
    daily: 'Home and family matters take center stage. Emotional balance is key. A creative endeavor brings satisfaction. Lucky color: White. Lucky number: 2.',
    weekly: 'The Moon blesses your domestic life. Property matters are favorable. Emotional healing is possible this week. Career progress is steady. Avoid lending money.',
    yearly: '2026 brings domestic happiness for Cancer. Home renovation or purchase is indicated. Career growth is gradual but steady. Health of family members requires attention. Spiritual practices bring inner peace.',
  },
  {
    id: 'leo', name: 'Leo', hindiName: 'Simha', symbol: '♌', element: 'Fire', rulingPlanet: 'Sun',
    dates: 'Jul 23 – Aug 22',
    daily: 'Your leadership qualities shine today. Recognition at work is likely. Romance is in the air. Lucky color: Gold. Lucky number: 1.',
    weekly: 'The Sun empowers your confidence this week. Career advancement is strongly indicated. Creative projects receive appreciation. Love life is vibrant and exciting.',
    yearly: '2026 is a year of recognition and achievement for Leo. Career peaks in the third quarter. Financial gains through multiple sources. Love and marriage are highly favored. Health is robust throughout the year.',
  },
  {
    id: 'virgo', name: 'Virgo', hindiName: 'Kanya', symbol: '♍', element: 'Earth', rulingPlanet: 'Mercury',
    dates: 'Aug 23 – Sep 22',
    daily: 'Attention to detail serves you well today. Health routines should be maintained. A practical solution to a problem emerges. Lucky color: Navy Blue. Lucky number: 5.',
    weekly: 'Mercury sharpens your analytical mind this week. Work projects require precision. Health improvements are noted. Financial planning yields good results.',
    yearly: '2026 brings professional excellence for Virgo. Service-oriented work is highly rewarded. Health consciousness leads to improved wellbeing. Relationships deepen with honest communication.',
  },
  {
    id: 'libra', name: 'Libra', hindiName: 'Tula', symbol: '♎', element: 'Air', rulingPlanet: 'Venus',
    dates: 'Sep 23 – Oct 22',
    daily: 'Balance and harmony are your themes today. Legal matters may be resolved favorably. Partnerships flourish. Lucky color: Pink. Lucky number: 6.',
    weekly: 'Venus brings beauty and harmony to your life this week. Business partnerships are favorable. Creative arts and aesthetics are highlighted. Romantic relationships deepen.',
    yearly: '2026 is a year of partnerships and balance for Libra. Business collaborations are highly successful. Marriage and committed relationships are strengthened. Financial balance is achieved through careful planning.',
  },
  {
    id: 'scorpio', name: 'Scorpio', hindiName: 'Vrishchik', symbol: '♏', element: 'Water', rulingPlanet: 'Mars',
    dates: 'Oct 23 – Nov 21',
    daily: 'Deep insights guide your decisions today. Research and investigation yield results. Avoid power struggles. Lucky color: Maroon. Lucky number: 9.',
    weekly: 'Mars intensifies your focus this week. Hidden matters come to light. Financial gains through inheritance or joint ventures are possible. Transformation is the theme.',
    yearly: '2026 brings profound transformation for Scorpio. Career changes lead to better opportunities. Financial gains through investments and inheritance. Spiritual awakening is a key theme of the year.',
  },
  {
    id: 'sagittarius', name: 'Sagittarius', hindiName: 'Dhanu', symbol: '♐', element: 'Fire', rulingPlanet: 'Jupiter',
    dates: 'Nov 22 – Dec 21',
    daily: 'Expansion and optimism define your day. Travel or higher education may be on your mind. Philosophical discussions are enriching. Lucky color: Purple. Lucky number: 3.',
    weekly: 'Jupiter expands your horizons this week. Travel opportunities arise. Higher education and spiritual learning are favored. Financial luck is above average.',
    yearly: '2026 is expansive and fortunate for Sagittarius. Jupiter\'s blessings bring career growth and financial prosperity. Travel to foreign lands is indicated. Spiritual growth is a major theme.',
  },
  {
    id: 'capricorn', name: 'Capricorn', hindiName: 'Makar', symbol: '♑', element: 'Earth', rulingPlanet: 'Saturn',
    dates: 'Dec 22 – Jan 19',
    daily: 'Discipline and hard work pay off today. Career matters require your full attention. Avoid shortcuts. Lucky color: Black. Lucky number: 8.',
    weekly: 'Saturn rewards your perseverance this week. Career advancement through hard work. Financial discipline leads to savings. Health requires attention — rest adequately.',
    yearly: '2026 is a year of achievement through discipline for Capricorn. Career peaks in the second half. Financial stability is achieved. Property investments are favorable. Health requires consistent care.',
  },
  {
    id: 'aquarius', name: 'Aquarius', hindiName: 'Kumbh', symbol: '♒', element: 'Air', rulingPlanet: 'Saturn',
    dates: 'Jan 20 – Feb 18',
    daily: 'Innovation and originality are your strengths today. Social causes may inspire you. Technology-related matters are favorable. Lucky color: Electric Blue. Lucky number: 4.',
    weekly: 'Rahu and Saturn influence your week with unexpected changes. Social networking brings opportunities. Humanitarian work is rewarding. Financial matters need careful attention.',
    yearly: '2026 brings innovation and social progress for Aquarius. Technology and science-related careers flourish. Social connections lead to unexpected opportunities. Spiritual and humanitarian pursuits are deeply fulfilling.',
  },
  {
    id: 'pisces', name: 'Pisces', hindiName: 'Meen', symbol: '♓', element: 'Water', rulingPlanet: 'Jupiter',
    dates: 'Feb 19 – Mar 20',
    daily: 'Intuition and creativity guide you today. Spiritual practices bring peace. Artistic endeavors are favored. Lucky color: Sea Green. Lucky number: 7.',
    weekly: 'Jupiter and Neptune enhance your spiritual sensitivity this week. Creative projects flourish. Charitable work brings inner satisfaction. Relationships are harmonious.',
    yearly: '2026 is spiritually enriching for Pisces. Creative and artistic careers reach new heights. Spiritual practices deepen. Love and compassion guide all relationships. Financial gains through creative work.',
  },
];
