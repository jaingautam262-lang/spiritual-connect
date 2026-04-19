import type { ProductWithMRP } from "./shopData_new";

export const ASTROLOGY_SERVICES: ProductWithMRP[] = [
  {
    id: "as-001",
    name: "Ask Astrologer (Rajyog Analysis)",
    category: "Astrology Services",
    price: 1100,
    mrp: 1600,
    sku: "AS06050003",
    description:
      "Consult our expert astrologers for a personalized Rajyog analysis of your birth chart. Discover powerful yogas in your kundali that can unlock wealth, success and prosperity. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Identifies Rajyog in kundali, Wealth & career guidance, Personalized remedies, Expert vedic analysis",
    astrologicalPurpose: "Jupiter, Sun — Rajyog planetary combinations",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-002",
    name: "Astro Rajyoga Full Report",
    category: "Astrology Services",
    price: 3100,
    mrp: 5100,
    sku: "AS06050004",
    description:
      "A comprehensive 30+ page Rajyoga report detailing all wealth and success yogas present in your birth chart. Includes timing of activation, planetary periods and dosha remedies. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "30-page detailed report, Rajyog activation timings, Dosha remedies included, Career & wealth projections",
    astrologicalPurpose: "Jupiter, Venus, Sun — all yoga-forming planets",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-003",
    name: "Bhrigu Patrika (30-Year Prediction)",
    category: "Astrology Services",
    price: 2100,
    mrp: 5100,
    sku: "AS06050006",
    description:
      "Based on the ancient Bhrigu Samhita tradition, this report provides a detailed 30-year life prediction covering career, marriage, health and finance. Each life event is analyzed through planetary transits and dasha periods. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "30-year life roadmap, Marriage & career timing, Health & wealth predictions, Ancient Bhrigu methodology",
    astrologicalPurpose: "All 9 planets — multi-decade transit analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-004",
    name: "Birth Chart Analysis Report",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    sku: "AS06050007",
    description:
      "A thorough analysis of your Lagna, Rashi, planetary placements, houses and their effects on your life. Includes ascendant sign interpretation, benefic/malefic planet positions and dashas. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Complete kundali interpretation, Planetary strength analysis, House-wise predictions, Dasha & antardasha timing",
    astrologicalPurpose: "All 12 houses, Lagna lord, Rashi lord",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-005",
    name: "Business Problems Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    sku: "AS06050008",
    description:
      "Expert astrological consultation addressing business setbacks, partnership disputes, financial losses and professional stagnation. Receive targeted remedies including gemstones, mantras and Vastu tips. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Business problem diagnosis, Partnership harmony tips, Financial turnaround remedies, Vastu & gemstone advice",
    astrologicalPurpose:
      "Mercury, Jupiter, Saturn — commerce and growth planets",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-006",
    name: "Career Problems Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    sku: "AS06050009",
    description:
      "Comprehensive astrological assessment of career stagnation, job loss, promotions delayed and professional dissatisfaction. Covers the 10th house, Dashamesh and Saturn/Sun placements for career clarity. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Career path clarity, Promotion timing guidance, Job switch analysis, Mantra & gemstone remedies",
    astrologicalPurpose: "Saturn, Sun, Mercury — 10th house career analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-007",
    name: "Career Report Horoscope",
    category: "Astrology Services",
    price: 2300,
    mrp: 3300,
    sku: "AS06050010",
    description:
      "A dedicated horoscope report focused entirely on your career trajectory, suitable professions, periods of growth and obstacles. Includes 5-year career forecast with recommended action periods. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "5-year career forecast, Suitable profession guidance, Growth period timings, Obstacle removal remedies",
    astrologicalPurpose: "Saturn, Sun, Mercury, Mars — career planets",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-008",
    name: "Critical Life Problems Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    sku: "AS06050012",
    description:
      "For those facing multiple simultaneous life crises — health, finance and family all at once — this in-depth consultation identifies the root planetary cause and provides multi-layered remedies. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Root cause identification, Multi-domain remedy plan, Gemstone & puja prescriptions, Urgent life guidance",
    astrologicalPurpose: "Rahu, Ketu, Saturn — karmic disruption planets",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-009",
    name: "Education Problems Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    sku: "AS06050013",
    description:
      "Targeted consultation for students and parents facing academic difficulties, memory issues, distraction and exam failure patterns. Analyzes the 4th and 5th houses along with Mercury and Jupiter placement. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Academic performance boost, Memory & focus remedies, Exam success timing, Saraswati mantra prescription",
    astrologicalPurpose:
      "Mercury, Jupiter, Moon — education and intellect planets",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-010",
    name: "Emergency Astro Call (Urgent)",
    category: "Astrology Services",
    price: 3100,
    mrp: 11000,
    sku: "AS06050015",
    description:
      "Priority consultation for urgent life situations requiring immediate astrological guidance. Our senior astrologers analyze your chart on priority and provide instant remedies via email. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Priority senior astrologer assigned, Urgent remedies within 24hrs, Emergency muhurta selection, Immediate protective mantras",
    astrologicalPurpose: "All planets — emergency crisis analysis",
    stock: BigInt(50),
    createdAt: BigInt(0),
  },
  {
    id: "as-011",
    name: "Enemy / Shatru Problems Consultation",
    category: "Astrology Services",
    price: 3100,
    mrp: 3100,
    sku: "AS06050016",
    description:
      "Astrological consultation to identify and neutralize hidden enemies, workplace saboteurs and rivals affecting your progress. Includes protective kavach recommendations and Hanuman/Bhairav remedies. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Enemy neutralization remedies, Protective kavach prescription, Workplace harmony tips, Bhairav puja guidance",
    astrologicalPurpose: "Mars, Rahu, Saturn — 6th house enemy analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-012",
    name: "Financial Report Consultation",
    category: "Astrology Services",
    price: 2300,
    mrp: 3300,
    sku: "AS06050018",
    description:
      "A comprehensive financial horoscope report covering wealth accumulation potential, investment timing, debt patterns and Dhana yogas present in your chart. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Wealth potential analysis, Investment timing guidance, Debt clearance remedies, Dhana yoga identification",
    astrologicalPurpose:
      "Jupiter, Venus, 2nd & 11th house lords — wealth planets",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-013",
    name: "Health Problems Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    sku: "AS06050019",
    description:
      "Astrological analysis of chronic health issues, disease patterns and vitality levels based on the 6th house, Ascendant and Sun placement. Includes Ayurvedic dosha correlation and mantra/gemstone healing. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Health pattern analysis, Disease period timing, Healing gemstone prescription, Protective mantra guidance",
    astrologicalPurpose: "Sun, Moon, Mars — 6th house health analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-014",
    name: "Janam Kundali Full Analysis (10yr)",
    category: "Astrology Services",
    price: 499,
    mrp: 1100,
    sku: "AS06050020",
    description:
      "Complete Janam Kundali with 10-year detailed prediction covering all major life areas. Includes Lagna chart, planetary positions, D9 Navamsa and Dasha-Antardasha timeline. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Complete kundali chart, 10-year prediction, D9 Navamsa analysis, Dasha-Antardasha timeline",
    astrologicalPurpose: "All 9 planets — complete natal chart analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-015",
    name: "Janam Kundali + 5yr Prediction",
    category: "Astrology Services",
    price: 299,
    mrp: 1100,
    sku: "AS06050022",
    description:
      "Entry-level kundali report with 5-year prediction ideal for those seeking basic astrological guidance. Covers ascendant, planetary positions and major upcoming events. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Birth chart creation, 5-year forecast, Key life event timing, Beginner-friendly report",
    astrologicalPurpose: "All 9 planets — basic natal chart",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-016",
    name: "Kundali Darpan (20-Year Prediction)",
    category: "Astrology Services",
    price: 999,
    mrp: 2100,
    sku: "AS06050023",
    description:
      "The Kundali Darpan is a mirror of your destiny — a 20-year predictive report covering career, marriage, health, children and spiritual growth milestones. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "20-year life forecast, Marriage & career milestones, Health & children predictions, Spiritual growth timeline",
    astrologicalPurpose:
      "All 9 planets across all 12 houses — long-range analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-017",
    name: "Loan / Debt Problems Consultation",
    category: "Astrology Services",
    price: 2300,
    mrp: 3300,
    sku: "AS06050025",
    description:
      "Astrological consultation specifically designed for those struggling with debt traps, recurring loans and financial burden. Analyzes the 8th and 12th house patterns along with Rahu and Saturn afflictions. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Debt trap diagnosis, Loan clearance timing, Rahu-Saturn remedy plan, Financial protection mantras",
    astrologicalPurpose:
      "Saturn, Rahu, 8th & 12th house — debt and loss analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-018",
    name: "Marital Problems Consultation",
    category: "Astrology Services",
    price: 2300,
    mrp: 3300,
    sku: "AS06050028",
    description:
      "Expert consultation for couples facing discord, separation threats, compatibility issues and delayed marriage resolution. Analyzes the 7th house, Venus, Mars and Mangal Dosha factors. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Compatibility analysis, Mangal Dosha remedy, Marriage harmony guidance, Separation prevention mantras",
    astrologicalPurpose: "Venus, Mars, Jupiter — 7th house marital analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-019",
    name: "Match Making Horoscope Report",
    category: "Astrology Services",
    price: 499,
    mrp: 1100,
    sku: "AS06050029",
    description:
      "Detailed Kundali matching report using the traditional Ashtakoot method analyzing 36 gunas for marriage compatibility. Covers Mangal Dosha, longevity of partner and financial compatibility. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "36 guna matching, Mangal Dosha check, Partner longevity analysis, Marriage timing guidance",
    astrologicalPurpose: "Moon, Venus, Mars — Ashtakoot compatibility matching",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-020",
    name: "Match Making 30yr Report",
    category: "Astrology Services",
    price: 1600,
    mrp: 2100,
    sku: "AS06050030",
    description:
      "Extended matchmaking report with 30-year post-marriage life predictions for both partners — covering finances, children, career and health milestones as a couple. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "30-year couple forecast, Children & family timing, Joint financial predictions, Compatibility depth analysis",
    astrologicalPurpose: "Moon, Venus, Jupiter — long-range marital analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-021",
    name: "Talk to Experts (Tantra/Vastu/Puja)",
    category: "Astrology Services",
    price: 1600,
    mrp: 3100,
    sku: "AS06050041",
    description:
      "Personalized consultation with specialists in Tantra, Vastu Shastra and Puja Vidhi. Get customized home correction advice, puja prescriptions and tantric remedies for your specific situation. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Vastu home correction tips, Tantra problem remedies, Custom puja vidhi, Expert specialist access",
    astrologicalPurpose: "All planets — Vastu, Tantra and ritual alignment",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-022",
    name: "Wealth Problems Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    sku: "AS06050049",
    description:
      "Specialized consultation for persistent poverty, financial losses and inability to accumulate wealth despite hard work. Analyzes Dhana yoga, Lakshmi sthana and Jupiter-Venus afflictions. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Wealth blockage diagnosis, Lakshmi puja prescription, Dhana yoga activation, Prosperity gemstone advice",
    astrologicalPurpose: "Jupiter, Venus, 2nd house — Dhana sthana analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-023",
    name: "Yearly Report / Varshphal",
    category: "Astrology Services",
    price: 2145,
    mrp: 3200,
    sku: "AS06050050",
    description:
      "Solar return chart analysis for the coming year, providing month-by-month predictions for career, health, relationships and finance. Includes Varshphal Lagna and Mudda Dasha interpretation. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Month-by-month 12-month forecast, Solar return chart, Varshphal Lagna analysis, Key opportunity months",
    astrologicalPurpose: "Sun — solar return chart and yearly Varshphal",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-024",
    name: "Pregnancy Issues Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    description:
      "Astrological consultation for couples facing delayed conception, miscarriage patterns or pregnancy-related anxiety. Analyzes the 5th house, Jupiter, Moon and Putrakaraka for childbirth timing. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Conception timing guidance, Pregnancy protection remedies, Putrakaraka analysis, Santana Gopala mantra",
    astrologicalPurpose: "Jupiter, Moon, 5th house — Putra sthana analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-025",
    name: "Love Problems Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    description:
      "Expert guidance for love relationships facing obstacles, family opposition, breakups and communication problems. Analyzes Venus, 5th and 7th house placements and Shukra Dasha timing. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Relationship obstacle removal, Venus strengthening remedies, Love timing guidance, Compatibility analysis",
    astrologicalPurpose:
      "Venus, Moon, 5th & 7th house — love and romance analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-026",
    name: "Tantra Problems Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    description:
      "Specialized consultation for those affected by black magic, nazar dosh, tantric attacks and unexplained suffering. Expert tantric astrologers identify the planetary afflictions enabling such influences and prescribe counter-measures. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Black magic diagnosis, Protective kavach remedies, Rahu-Ketu affliction analysis, Counter-tantric prescriptions",
    astrologicalPurpose: "Rahu, Ketu, Saturn — malefic affliction analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-027",
    name: "Life Problems Consultation",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    description:
      "General life consultation covering all major areas — career, relationships, health and spirituality — for those feeling stuck or confused about life direction. Provides a holistic astrological overview with actionable remedies. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Holistic life overview, All-domain remedies, Life purpose clarity, Spiritual growth guidance",
    astrologicalPurpose: "All 9 planets — complete life path analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-028",
    name: "Marriage Problems Consultation",
    category: "Astrology Services",
    price: 2300,
    mrp: 3300,
    description:
      "Astrological consultation for married couples dealing with ongoing conflicts, trust issues, in-law problems and marital dissatisfaction. Focuses on 7th house afflictions, Kalatra Dosha and remedial rituals. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "7th house conflict analysis, Kalatra Dosha remedy, In-law harmony tips, Marriage strengthening rituals",
    astrologicalPurpose:
      "Venus, Jupiter, 7th house — marriage stability analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-029",
    name: "Horoscope Rajyoga Analysis",
    category: "Astrology Services",
    price: 3100,
    mrp: 5100,
    description:
      "Premium analysis identifying all Rajyogas, Dhana Yogas and Pancha Mahapurusha Yogas in your birth chart. Includes timing of yoga activation and the life areas most likely to flourish. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "All major yogas identified, Activation timing analysis, Pancha Mahapurusha yoga check, Premium detailed report",
    astrologicalPurpose:
      "Jupiter, Sun, Mars, Venus, Saturn — yoga-forming planets",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
  {
    id: "as-030",
    name: "Horoscope Reports (Full)",
    category: "Astrology Services",
    price: 2100,
    mrp: 3100,
    description:
      "A complete and comprehensive horoscope report covering birth chart, D9 Navamsa, D10 Dashamsa, planetary strengths, Ashtakavarga and major life predictions across all domains. Results are emailed within 48–72 hours by expert astrologers.",
    benefits:
      "Multi-divisional chart analysis, Ashtakavarga scoring, All life-domain predictions, Comprehensive remedy plan",
    astrologicalPurpose:
      "All 9 planets across D1, D9, D10 — multi-chart analysis",
    stock: BigInt(100),
    createdAt: BigInt(0),
  },
];
