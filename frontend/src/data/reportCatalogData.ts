export interface ReportCatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  deliveryDays: number;
  icon: string;
}

export const REPORT_CATALOG: ReportCatalogItem[] = [
  { id: 'birth-chart', name: 'Birth Chart (Janam Kundli)', description: 'Complete natal chart with planetary positions, house analysis, and life predictions.', price: 499, category: 'Core', deliveryDays: 2, icon: '🌟' },
  { id: 'varshphal', name: 'Varshphal (Solar Return)', description: 'Annual horoscope based on solar return. Predictions for the coming year.', price: 599, category: 'Annual', deliveryDays: 3, icon: '☀️' },
  { id: 'lal-kitab', name: 'Lal Kitab Report', description: 'Ancient Lal Kitab analysis with unique remedies for life challenges.', price: 699, category: 'Remedial', deliveryDays: 3, icon: '📕' },
  { id: 'sade-sati', name: 'Sade Sati Analysis', description: 'Detailed analysis of Saturn\'s 7.5-year transit and its effects on your life.', price: 399, category: 'Transit', deliveryDays: 2, icon: '🪐' },
  { id: 'raj-yog', name: 'Raj Yog Report', description: 'Identify powerful Raj Yogas in your chart for wealth, power, and success.', price: 549, category: 'Yoga', deliveryDays: 2, icon: '👑' },
  { id: 'kaal-sarp', name: 'Kaal Sarp Dosh Report', description: 'Analysis of Kaal Sarp Dosh with remedies and auspicious timings.', price: 449, category: 'Dosh', deliveryDays: 2, icon: '🐍' },
  { id: 'rahu-ketu', name: 'Rahu-Ketu Transit Report', description: 'Impact of Rahu and Ketu transit on your life, career, and relationships.', price: 499, category: 'Transit', deliveryDays: 2, icon: '🌑' },
  { id: 'mangal-dosh', name: 'Mangal Dosh Report', description: 'Manglik analysis with marriage compatibility and remedies.', price: 349, category: 'Dosh', deliveryDays: 1, icon: '♂️' },
  { id: 'nakshatra', name: 'Nakshatra Report', description: 'Deep dive into your birth nakshatra, its characteristics, and life path.', price: 399, category: 'Core', deliveryDays: 2, icon: '⭐' },
  { id: 'daily-prediction', name: 'Daily Prediction Report', description: 'Personalized daily predictions for 30 days based on your birth chart.', price: 299, category: 'Prediction', deliveryDays: 1, icon: '📅' },
  { id: 'love-compatibility', name: 'Love Compatibility Report', description: 'Detailed compatibility analysis for couples based on birth charts.', price: 599, category: 'Relationship', deliveryDays: 3, icon: '❤️' },
  { id: 'wealth', name: 'Wealth & Finance Report', description: 'Financial prospects, wealth yogas, and investment timing analysis.', price: 649, category: 'Finance', deliveryDays: 3, icon: '💰' },
  { id: 'education', name: 'Education Report', description: 'Academic prospects, suitable fields of study, and career guidance.', price: 449, category: 'Career', deliveryDays: 2, icon: '🎓' },
  { id: 'health', name: 'Health Report', description: 'Health vulnerabilities, favorable periods, and preventive measures.', price: 499, category: 'Health', deliveryDays: 2, icon: '🏥' },
  { id: 'palmistry', name: 'Palmistry Report', description: 'Hand analysis report based on uploaded palm image with life line, heart line, and fate line readings.', price: 799, category: 'Palmistry', deliveryDays: 5, icon: '✋' },
  { id: 'life-report', name: 'Personalized Life Report', description: 'Comprehensive 50+ page life report covering all aspects: career, love, health, finance, and spirituality.', price: 1499, category: 'Premium', deliveryDays: 7, icon: '📖' },
];
