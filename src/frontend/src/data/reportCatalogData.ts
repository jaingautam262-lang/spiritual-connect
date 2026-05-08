export interface ReportCatalogItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  deliveryDays: number;
  icon: string;
}

// Legacy catalog (kept for backward compatibility)
export const REPORT_CATALOG: ReportCatalogItem[] = [
  {
    id: "birth-chart",
    name: "Birth Chart (Janam Kundli)",
    description:
      "Complete natal chart with planetary positions, house analysis, and life predictions.",
    price: 499,
    category: "Core",
    deliveryDays: 2,
    icon: "🌟",
  },
  {
    id: "varshphal",
    name: "Varshphal (Solar Return)",
    description:
      "Annual horoscope based on solar return. Predictions for the coming year.",
    price: 599,
    category: "Annual",
    deliveryDays: 3,
    icon: "☀️",
  },
  {
    id: "lal-kitab",
    name: "Lal Kitab Report",
    description:
      "Ancient Lal Kitab analysis with unique remedies for life challenges.",
    price: 699,
    category: "Remedial",
    deliveryDays: 3,
    icon: "📕",
  },
  {
    id: "sade-sati",
    name: "Sade Sati Analysis",
    description:
      "Detailed analysis of Saturn's 7.5-year transit and its effects on your life.",
    price: 399,
    category: "Transit",
    deliveryDays: 2,
    icon: "🪐",
  },
  {
    id: "raj-yog",
    name: "Raj Yog Report",
    description:
      "Identify powerful Raj Yogas in your chart for wealth, power, and success.",
    price: 549,
    category: "Yoga",
    deliveryDays: 2,
    icon: "👑",
  },
  {
    id: "kaal-sarp",
    name: "Kaal Sarp Dosh Report",
    description:
      "Analysis of Kaal Sarp Dosh with remedies and auspicious timings.",
    price: 449,
    category: "Dosh",
    deliveryDays: 2,
    icon: "🐍",
  },
  {
    id: "rahu-ketu",
    name: "Rahu-Ketu Transit Report",
    description:
      "Impact of Rahu and Ketu transit on your life, career, and relationships.",
    price: 499,
    category: "Transit",
    deliveryDays: 2,
    icon: "🌑",
  },
  {
    id: "mangal-dosh",
    name: "Mangal Dosh Report",
    description: "Manglik analysis with marriage compatibility and remedies.",
    price: 349,
    category: "Dosh",
    deliveryDays: 1,
    icon: "♂️",
  },
  {
    id: "nakshatra",
    name: "Nakshatra Report",
    description:
      "Deep dive into your birth nakshatra, its characteristics, and life path.",
    price: 399,
    category: "Core",
    deliveryDays: 2,
    icon: "⭐",
  },
  {
    id: "daily-prediction",
    name: "Daily Prediction Report",
    description:
      "Personalized daily predictions for 30 days based on your birth chart.",
    price: 299,
    category: "Prediction",
    deliveryDays: 1,
    icon: "📅",
  },
  {
    id: "love-compatibility",
    name: "Love Compatibility Report",
    description:
      "Detailed compatibility analysis for couples based on birth charts.",
    price: 599,
    category: "Relationship",
    deliveryDays: 3,
    icon: "❤️",
  },
  {
    id: "wealth",
    name: "Wealth & Finance Report",
    description:
      "Financial prospects, wealth yogas, and investment timing analysis.",
    price: 649,
    category: "Finance",
    deliveryDays: 3,
    icon: "💰",
  },
  {
    id: "education",
    name: "Education Report",
    description:
      "Academic prospects, suitable fields of study, and career guidance.",
    price: 449,
    category: "Career",
    deliveryDays: 2,
    icon: "🎓",
  },
  {
    id: "health",
    name: "Health Report",
    description:
      "Health vulnerabilities, favorable periods, and preventive measures.",
    price: 499,
    category: "Health",
    deliveryDays: 2,
    icon: "🏥",
  },
  {
    id: "palmistry",
    name: "Palmistry Report",
    description:
      "Hand analysis report based on uploaded palm image with life line, heart line, and fate line readings.",
    price: 799,
    category: "Palmistry",
    deliveryDays: 5,
    icon: "✋",
  },
  {
    id: "life-report",
    name: "Personalized Life Report",
    description:
      "Comprehensive 50+ page life report covering all aspects: career, love, health, finance, and spirituality.",
    price: 1499,
    category: "Premium",
    deliveryDays: 7,
    icon: "📖",
  },
];

// ─── ENHANCED REPORT CATALOG ───
export interface ReportCatalog {
  id: string;
  title: string;
  titleHindi: string;
  category:
    | "remedies-vastu"
    | "planets-nakshatra"
    | "health"
    | "timing"
    | "career"
    | "love-marriage"
    | "money-luck";
  price: number;
  deliveryMethod: "whatsapp" | "email" | "both";
  deliveryTime: string;
  description: string;
  descriptionHindi: string;
  whatYouGet: string[];
  faq: { q: string; a: string }[];
  testimonials: { name: string; rating: number; review: string }[];
  sampleContent: string;
  stripePriceId?: string;
  popular?: boolean;
  icon: string;
}

export const ENHANCED_REPORTS: ReportCatalog[] = [
  // ─── REMEDIES, VASTU & RUDRAKSHA ───
  {
    id: "rudraksha-selection",
    title: "Rudraksha Selection Report",
    titleHindi: "रुद्राक्ष चयन रिपोर्ट",
    category: "remedies-vastu",
    price: 199,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Personalized Rudraksha recommendation based on your birth chart. Discover which mukhi Rudraksha is best suited for your planetary positions and life goals.",
    descriptionHindi: "आपकी जन्म कुंडली के आधार पर व्यक्तिगत रुद्राक्ष अनुशंसा।",
    whatYouGet: [
      "Best Rudraksha mukhi for your birth chart",
      "Detailed benefits for your specific planetary positions",
      "How to wear and energize your Rudraksha",
      "Mantra for activation",
      "Dos and don'ts for maximum benefit",
    ],
    faq: [
      {
        q: "Can I wear multiple Rudraksha?",
        a: "Yes, multiple mukhi Rudraksha can be worn together based on your chart needs.",
      },
      {
        q: "How long before I see results?",
        a: "Most people notice positive changes within 40 days of regular wearing with proper mantras.",
      },
      {
        q: "Is this report personalized?",
        a: "Yes, our expert astrologers analyze your specific birth chart to give customized recommendations.",
      },
    ],
    testimonials: [
      {
        name: "Rajesh Sharma",
        rating: 5,
        review:
          "Excellent report! The 7 mukhi Rudraksha recommendation changed my life. Business improved within 2 months.",
      },
      {
        name: "Priya Singh",
        rating: 5,
        review:
          "Very detailed and accurate. The mantra guidance was extremely helpful.",
      },
    ],
    sampleContent:
      "Based on your ascendant Scorpio and Moon in Capricorn, the 7 Mukhi Rudraksha (Saturn) is highly recommended...",
    stripePriceId: "price_placeholder",
    icon: "📿",
  },
  {
    id: "vastu-dosh-analysis",
    title: "Vastu Dosh Analysis",
    titleHindi: "वास्तु दोष विश्लेषण",
    category: "remedies-vastu",
    price: 299,
    deliveryMethod: "both",
    deliveryTime: "48 hours",
    description:
      "Comprehensive Vastu analysis of your home or office. Identify Vastu doshas and get practical remedies without major structural changes.",
    descriptionHindi:
      "आपके घर या कार्यालय का संपूर्ण वास्तु विश्लेषण। बिना निर्माण परिवर्तन के सरल उपाय।",
    whatYouGet: [
      "Complete direction-wise Vastu analysis",
      "Identification of all Vastu doshas",
      "Easy remedies using Yantras, plants, and colors",
      "Room-by-room recommendations",
      "Vastu tips for prosperity and health",
    ],
    faq: [
      {
        q: "Do I need to share floor plan?",
        a: "Yes, sharing a basic floor plan or photo helps our experts give accurate Vastu analysis.",
      },
      {
        q: "Are structural changes required?",
        a: "No. Most Vastu remedies are simple: rearranging furniture, adding plants, using yantras.",
      },
      {
        q: "How soon will remedies work?",
        a: "Vastu remedies show results within 3-6 months when properly implemented.",
      },
    ],
    testimonials: [
      {
        name: "Amit Gupta",
        rating: 5,
        review:
          "After following the Vastu remedies, constant family disputes stopped. Home became peaceful.",
      },
      {
        name: "Sunita Verma",
        rating: 4,
        review:
          "Good detailed analysis. Business improved after placing suggested Yantra in north direction.",
      },
    ],
    sampleContent:
      "Your main entrance in the South-West direction creates financial instability. Remedy: Place a Vastu Yantra on the main door...",
    stripePriceId: "price_placeholder",
    icon: "🏠",
  },
  {
    id: "gemstone-recommendation",
    title: "Gemstone Recommendation",
    titleHindi: "रत्न अनुशंसा रिपोर्ट",
    category: "remedies-vastu",
    price: 249,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Expert gemstone recommendation based on your birth chart. Know which Navratna gems are beneficial and which to avoid.",
    descriptionHindi:
      "जन्म कुंडली के आधार पर रत्न अनुशंसा। जानें कौन सा रत्न आपके लिए लाभदायक है।",
    whatYouGet: [
      "Recommended primary gemstone with carat weight",
      "Supporting secondary gemstones",
      "Gemstones to strictly avoid for your chart",
      "Metal (gold/silver/copper) for setting",
      "Finger to wear and day/time of wearing",
    ],
    faq: [
      {
        q: "Should I wear all 9 Navratnas?",
        a: "No! Wearing wrong gemstones can harm you. Only chart-specific gems should be worn.",
      },
      {
        q: "What carat weight is recommended?",
        a: "Minimum 2-3 carats for most gemstones. Our report specifies exact weight.",
      },
      {
        q: "Natural vs lab-grown gemstones?",
        a: "Natural gemstones are always preferred for astrological purposes.",
      },
    ],
    testimonials: [
      {
        name: "Deepika Mehta",
        rating: 5,
        review:
          "Was wearing wrong gemstone for years! This report saved me. Yellow Sapphire brought job promotion.",
      },
      {
        name: "Vikas Joshi",
        rating: 5,
        review:
          "Very detailed report. The metal and finger specification was very useful.",
      },
    ],
    sampleContent:
      "Your Jupiter is exalted in Cancer in the 9th house. Yellow Sapphire (Pukhraj) of minimum 3 carats in gold is strongly recommended...",
    stripePriceId: "price_placeholder",
    popular: true,
    icon: "💎",
  },
  {
    id: "yantra-selection",
    title: "Yantra Selection Report",
    titleHindi: "यंत्र चयन रिपोर्ट",
    category: "remedies-vastu",
    price: 149,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Find the perfect Yantra for your goals. Personalized Yantra recommendations for wealth, protection, love, and success.",
    descriptionHindi: "अपने लक्ष्यों के लिए सही यंत्र खोजें। व्यक्तिगत यंत्र अनुशंसा।",
    whatYouGet: [
      "Primary Yantra for your main life challenge",
      "Installation direction and method",
      "Activation mantra for each Yantra",
      "Daily worship routine",
      "Expected timeline for results",
    ],
    faq: [
      {
        q: "Where to place the Yantra?",
        a: "Direction depends on the Yantra type. Our report specifies exact placement.",
      },
      {
        q: "Does Yantra need daily worship?",
        a: "Yes, daily worship with the provided mantra activates and maintains the Yantra's energy.",
      },
      {
        q: "How long does a Yantra last?",
        a: "A properly energized copper or brass Yantra lasts years.",
      },
    ],
    testimonials: [
      {
        name: "Neha Agarwal",
        rating: 5,
        review:
          "Shri Yantra placement as suggested brought amazing prosperity. Highly recommended!",
      },
      {
        name: "Rakesh Kumar",
        rating: 4,
        review:
          "Good guidance on Yantra placement. Very easy to follow instructions.",
      },
    ],
    sampleContent:
      "For your ascendant Scorpio, the Baglamukhi Yantra in the South direction will provide powerful protection...",
    stripePriceId: "price_placeholder",
    icon: "🔮",
  },
  {
    id: "mantra-sadhana-guide",
    title: "Mantra Sadhana Guide",
    titleHindi: "मंत्र साधना मार्गदर्शिका",
    category: "remedies-vastu",
    price: 129,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Personalized mantra practice guide based on your birth chart. Specific mantras for your planetary positions with proper procedures.",
    descriptionHindi: "जन्म कुंडली के आधार पर व्यक्तिगत मंत्र साधना मार्गदर्शिका।",
    whatYouGet: [
      "Primary mantra for your ascendant lord",
      "Secondary mantras for weak planets",
      "Daily japa count and timing",
      "Sadhana procedure and rules",
      "Specific festival days for intensified practice",
    ],
    faq: [
      {
        q: "How many mantras should I chant daily?",
        a: "Our guide recommends 108 or 1008 repetitions based on your available time and chart requirements.",
      },
      {
        q: "Can beginners follow this guide?",
        a: "Yes, the guide is written for all levels with step-by-step instructions.",
      },
      {
        q: "Are Sanskrit mantras necessary?",
        a: "Sanskrit mantras are most effective. We provide both with proper pronunciation guidance.",
      },
    ],
    testimonials: [
      {
        name: "Anjali Tiwari",
        rating: 5,
        review:
          "The Shani mantra sadhana guidance was very structured. Noticed positive changes in 3 months.",
      },
      {
        name: "Suresh Patel",
        rating: 5,
        review:
          "Excellent practical guide. The timing recommendations were very helpful.",
      },
    ],
    sampleContent:
      'Your primary mantra: "Om Namah Shivaya" - 108 times daily at sunrise. For your debilitated Sun, additionally chant Surya mantra...',
    stripePriceId: "price_placeholder",
    icon: "🕉️",
  },
  {
    id: "complete-remedies-package",
    title: "Complete Remedies Package",
    titleHindi: "संपूर्ण उपाय पैकेज",
    category: "remedies-vastu",
    price: 499,
    deliveryMethod: "both",
    deliveryTime: "48 hours",
    description:
      "Complete remedial package combining Rudraksha, gemstone, Yantra, mantra, and Vastu recommendations in one comprehensive report.",
    descriptionHindi: "रुद्राक्ष, रत्न, यंत्र, मंत्र और वास्तु सभी उपाय एक रिपोर्ट में।",
    whatYouGet: [
      "Rudraksha recommendation",
      "Gemstone selection with wearing instructions",
      "Yantra placement guide",
      "Personalized mantra sadhana",
      "Key Vastu remedies for your home",
    ],
    faq: [
      {
        q: "Is this package better than individual reports?",
        a: "Yes! A combined analysis ensures all remedies work harmoniously without conflict.",
      },
      {
        q: "Do I need to implement all remedies at once?",
        a: "No. We prioritize remedies in order of urgency.",
      },
      {
        q: "Is consultation included?",
        a: "The report includes a 15-minute follow-up consultation via WhatsApp.",
      },
    ],
    testimonials: [
      {
        name: "Kavya Nair",
        rating: 5,
        review:
          "Best investment! Complete package helped me transform multiple areas of life simultaneously.",
      },
      {
        name: "Arjun Reddy",
        rating: 5,
        review: "Worth every rupee. Very detailed and actionable remedies.",
      },
    ],
    sampleContent:
      "Priority Remedies: 1. Wear 7 Mukhi Rudraksha immediately. 2. Yellow Sapphire (3 carats) within 40 days. 3. Place Shri Yantra in North-East...",
    stripePriceId: "price_placeholder",
    popular: true,
    icon: "✨",
  },

  // ─── PLANETS & NAKSHATRA ───
  {
    id: "detailed-kundli-analysis",
    title: "Detailed Kundli Analysis",
    titleHindi: "विस्तृत कुंडली विश्लेषण",
    category: "planets-nakshatra",
    price: 499,
    deliveryMethod: "both",
    deliveryTime: "48 hours",
    description:
      "Full birth chart analysis covering all 12 houses, planetary positions, aspects, yogas, and predictions for major life areas.",
    descriptionHindi: "सभी 12 भावों, ग्रह स्थितियों, योगों का संपूर्ण विश्लेषण।",
    whatYouGet: [
      "Complete house-by-house analysis",
      "All planetary dignities and weaknesses",
      "Major yogas (Raj, Dhana, Vipareet)",
      "Predictions for career, marriage, health, finance",
      "Current dasha influence and timing",
    ],
    faq: [
      {
        q: "What information do I need to provide?",
        a: "Name, date of birth, exact time of birth, and place of birth.",
      },
      {
        q: "Is birth time really important?",
        a: "Yes, even a 4-minute difference can change the ascendant. Provide as accurate a birth time as possible.",
      },
      {
        q: "How many pages is the report?",
        a: "Typically 15-25 pages covering all aspects of your birth chart.",
      },
    ],
    testimonials: [
      {
        name: "Meera Krishnan",
        rating: 5,
        review:
          "Astonishingly accurate. The career predictions were spot on. Extremely detailed report.",
      },
      {
        name: "Rahul Dubey",
        rating: 5,
        review:
          "The Kundli analysis helped me understand my life path clearly.",
      },
    ],
    sampleContent:
      "Your Ascendant is Scorpio with Mars as your ascendant lord placed in the 1st house. Strong, determined personality with natural leadership qualities...",
    stripePriceId: "price_placeholder",
    popular: true,
    icon: "📊",
  },
  {
    id: "nakshatra-reading",
    title: "Nakshatra Reading",
    titleHindi: "नक्षत्र पाठ",
    category: "planets-nakshatra",
    price: 299,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Deep analysis of your birth Nakshatra, its pada, deity, ruling planet, and complete character analysis.",
    descriptionHindi: "जन्म नक्षत्र, पाद, देवता और ग्रह का गहन विश्लेषण।",
    whatYouGet: [
      "Birth Nakshatra name and significance",
      "Nakshatra pada and its effects",
      "Character traits and personality profile",
      "Compatible Nakshatras for relationships",
      "Favorable career paths based on Nakshatra",
    ],
    faq: [
      {
        q: "What is a Nakshatra?",
        a: "The Moon's position at birth falls in one of 27 Nakshatras (lunar mansions).",
      },
      {
        q: "Is Nakshatra reading same as Sun sign?",
        a: "No. Nakshatra is based on Moon position in Vedic astrology and is more precise.",
      },
      {
        q: "Can Nakshatra change?",
        a: "Your birth Nakshatra is fixed for life.",
      },
    ],
    testimonials: [
      {
        name: "Pooja Sharma",
        rating: 5,
        review:
          "The Nakshatra analysis described my personality so accurately, I was amazed!",
      },
      {
        name: "Kiran Bala",
        rating: 4,
        review:
          "Good insight into Nakshatra traits. Career guidance was very helpful.",
      },
    ],
    sampleContent:
      "Your Moon is in Shravana Nakshatra (22nd Nakshatra), ruled by the Moon and associated with listening, learning and communication...",
    stripePriceId: "price_placeholder",
    icon: "⭐",
  },
  {
    id: "saturn-report",
    title: "Saturn Report (Shani)",
    titleHindi: "शनि रिपोर्ट",
    category: "planets-nakshatra",
    price: 399,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Comprehensive Saturn analysis including Sade Sati, Dhaiya, house position, and karmic lessons.",
    descriptionHindi: "शनि की स्थिति, साढ़ेसाती, ढैय्या और कर्मिक पाठों का विश्लेषण।",
    whatYouGet: [
      "Saturn's position and strength in your chart",
      "Current Sade Sati or Dhaiya status",
      "Karma lessons Saturn wants you to learn",
      "Career and discipline insights",
      "Shani remedies specific to your chart",
    ],
    faq: [
      {
        q: "Is Sade Sati always bad?",
        a: "No. Sade Sati brings challenges but also transformation and growth.",
      },
      {
        q: "When does my Sade Sati end?",
        a: "The report specifies exact start and end dates based on Saturn's transit over your Moon sign.",
      },
      {
        q: "What are the remedies for Shani?",
        a: "Feed black sesame to birds on Saturdays, light mustard oil lamp, and specific mantras.",
      },
    ],
    testimonials: [
      {
        name: "Dinesh Kumar",
        rating: 5,
        review:
          "Saturn report helped me understand why certain years were difficult. Great karma insight.",
      },
      {
        name: "Lata Mishra",
        rating: 5,
        review: "Sade Sati remedies really helped. Life became much smoother.",
      },
    ],
    sampleContent:
      "Your Saturn is in Cancer (4th house) — this Saturn in a watery sign creates challenges related to property and mother. You are currently in Sade Sati phase until...",
    stripePriceId: "price_placeholder",
    icon: "🪐",
  },
  {
    id: "rahu-ketu-axis",
    title: "Rahu-Ketu Axis Report",
    titleHindi: "राहु-केतु अक्ष रिपोर्ट",
    category: "planets-nakshatra",
    price: 349,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Analysis of Rahu-Ketu nodal axis, karmic past lives, and future soul direction.",
    descriptionHindi: "राहु-केतु की धुरी का विश्लेषण, पिछले जन्म और आत्मा की दिशा।",
    whatYouGet: [
      "Rahu and Ketu house positions and effects",
      "Past life karma indicated by Ketu",
      "Soul's purpose indicated by Rahu",
      "Karmic lessons for this lifetime",
      "Rahu-Ketu transit impact on current chart",
    ],
    faq: [
      {
        q: "Are Rahu and Ketu real planets?",
        a: "They are shadow planets (lunar nodes) — mathematical points, highly significant in Vedic astrology.",
      },
      {
        q: "What does Ketu in 9th house mean?",
        a: "Ketu in your 9th house indicates strong spiritual inclination and past-life religious merit.",
      },
      {
        q: "How often does Rahu-Ketu change signs?",
        a: "Every 18 months, causing significant life shifts.",
      },
    ],
    testimonials: [
      {
        name: "Sanjay Tiwari",
        rating: 5,
        review:
          "Rahu-Ketu axis analysis gave me profound insight into why certain patterns repeat in my life.",
      },
      {
        name: "Ritu Singh",
        rating: 4,
        review:
          "Very deep spiritual analysis. Helped me understand my life purpose.",
      },
    ],
    sampleContent:
      "Your Rahu is in Capricorn (3rd house) — soul direction: develop communication and business networking in this life. Ketu in Cancer (9th house) shows past-life spiritual merit...",
    stripePriceId: "price_placeholder",
    icon: "🌑",
  },
  {
    id: "jupiter-report",
    title: "Jupiter Blessing Report",
    titleHindi: "बृहस्पति आशीर्वाद रिपोर्ट",
    category: "planets-nakshatra",
    price: 299,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Analysis of Jupiter's position, strength, and blessings in your chart. Best timing for education, marriage, and fortune.",
    descriptionHindi:
      "बृहस्पति की स्थिति, बल और कृपा। शिक्षा, विवाह और भाग्य का सर्वोत्तम समय।",
    whatYouGet: [
      "Jupiter's house and sign strength",
      "Education and wisdom prospects",
      "Marriage and children timing",
      "Financial fortune periods",
      "Jupiter transit predictions for next 12 months",
    ],
    faq: [
      {
        q: "Is Jupiter the most benefic planet?",
        a: "Jupiter is considered the greatest benefic in Vedic astrology, ruling wisdom, wealth, and blessings.",
      },
      {
        q: "When is Jupiter at its strongest?",
        a: "Jupiter is exalted in Cancer and powerful in Sagittarius and Pisces.",
      },
      {
        q: "What if Jupiter is weak in my chart?",
        a: "The report recommends specific remedies to strengthen Jupiter.",
      },
    ],
    testimonials: [
      {
        name: "Mohan Lal",
        rating: 5,
        review:
          "Jupiter report predicted my business boom period accurately. Remarkable!",
      },
      {
        name: "Geeta Sharma",
        rating: 5,
        review: "Marriage timing prediction was absolutely correct.",
      },
    ],
    sampleContent:
      "Your Jupiter is in Scorpio (1st house) — this creates a philosophical, expansive personality. Jupiter aspects your 5th house (children) and 7th house (marriage)...",
    stripePriceId: "price_placeholder",
    icon: "🌟",
  },
  {
    id: "navamsha-analysis",
    title: "Navamsha Analysis",
    titleHindi: "नवांश विश्लेषण",
    category: "planets-nakshatra",
    price: 449,
    deliveryMethod: "both",
    deliveryTime: "48 hours",
    description:
      "In-depth D9 chart analysis for marriage, relationships, and spiritual evolution.",
    descriptionHindi:
      "विवाह, रिश्तों और आत्मिक विकास के लिए नवांश (D9) का गहन विश्लेषण।",
    whatYouGet: [
      "Complete Navamsha (D9) chart analysis",
      "Marriage partner characteristics",
      "Strength of marriage in the chart",
      "Timing of marriage from Navamsha",
      "Spiritual potential indicated",
    ],
    faq: [
      {
        q: "Why is Navamsha important for marriage?",
        a: "Navamsha is the primary chart for assessing marriage, spouse qualities, and relationship longevity.",
      },
      {
        q: "Is Navamsha more important than D1?",
        a: "Both are needed. D1 shows the event, D9 shows the quality and nature.",
      },
      {
        q: "Can Navamsha predict divorce?",
        a: "Yes, certain planetary positions in Navamsha indicate relationship challenges.",
      },
    ],
    testimonials: [
      {
        name: "Anita Bhatt",
        rating: 5,
        review:
          "Navamsha analysis accurately described my husband's characteristics even before I met him.",
      },
      {
        name: "Vijay Malhotra",
        rating: 4,
        review: "Very insightful analysis of relationship patterns.",
      },
    ],
    sampleContent:
      "In your Navamsha chart, the 7th lord Venus is exalted in Pisces, indicating a devoted, artistic and spiritual spouse...",
    stripePriceId: "price_placeholder",
    icon: "💫",
  },
  {
    id: "lagna-lord-analysis",
    title: "Lagna Lord Analysis",
    titleHindi: "लग्न स्वामी विश्लेषण",
    category: "planets-nakshatra",
    price: 249,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Detailed analysis of your ascendant lord, its placement, strength, and impact on your entire life.",
    descriptionHindi: "लग्न स्वामी की स्थिति, बल और आपके जीवन पर प्रभाव।",
    whatYouGet: [
      "Ascendant lord position and strength",
      "How it affects your personality",
      "Career guidance from ascendant lord",
      "Health indications",
      "Timing of major life events",
    ],
    faq: [
      {
        q: "What is the Lagna lord?",
        a: "The planet that rules your ascendant sign is your Lagna lord. It is the most important planet in your chart.",
      },
      {
        q: "My Lagna lord is debilitated — is that bad?",
        a: "A debilitated Lagna lord creates challenges but the report identifies Neecha Bhanga yogas and remedies.",
      },
      {
        q: "Can I strengthen my Lagna lord?",
        a: "Yes! Wearing the associated gemstone and chanting its mantra strengthens it.",
      },
    ],
    testimonials: [
      {
        name: "Suman Devi",
        rating: 5,
        review:
          "Lagna lord analysis revealed why my health fluctuates. Remedies helped significantly.",
      },
      {
        name: "Harish Goyal",
        rating: 5,
        review:
          "Very accurate personality analysis. Career guidance was spot on.",
      },
    ],
    sampleContent:
      "Your Lagna lord is Mars (for Scorpio ascendant) placed in the 1st house — extremely powerful. You are strong-willed, courageous...",
    stripePriceId: "price_placeholder",
    icon: "⬆️",
  },
  {
    id: "yogas-birth-chart",
    title: "Yogas in Birth Chart",
    titleHindi: "जन्म कुंडली के योग",
    category: "planets-nakshatra",
    price: 399,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Identify all special planetary combinations (Yogas) in your chart — Raj Yoga, Dhana Yoga, Gaja Kesari, and more.",
    descriptionHindi: "राज योग, धन योग, गजकेसरी आदि सभी योगों की पहचान।",
    whatYouGet: [
      "All Raj Yogas present in your chart",
      "Dhana (wealth) Yogas analysis",
      "Malefic Yogas (Kaal Sarp, Pitra Dosh)",
      "When each Yoga will activate",
      "How to maximize each Yoga's potential",
    ],
    faq: [
      {
        q: "How many Yogas can one chart have?",
        a: "A chart can have dozens of Yogas. Our report focuses on the 10-15 most significant ones.",
      },
      {
        q: "Does Raj Yoga guarantee success?",
        a: "Raj Yoga indicates strong potential for success, but it must be activated by the right Dasha period.",
      },
      {
        q: "What is Gaja Kesari Yoga?",
        a: "Jupiter in a kendra from Moon creates this powerful wealth and wisdom Yoga.",
      },
    ],
    testimonials: [
      {
        name: "Prabha Nair",
        rating: 5,
        review:
          "Discovered 3 Raj Yogas in my chart I didn't know about! Now I know when to expect major success.",
      },
      {
        name: "Aakash Malhotra",
        rating: 5,
        review:
          "Yoga analysis was incredibly detailed. The activation timing is very useful.",
      },
    ],
    sampleContent:
      "Your chart contains a powerful Gaja Kesari Yoga (Jupiter in Scorpio in 1st house, Moon in Capricorn in 3rd house). This Yoga will fully activate during Jupiter mahadasha...",
    stripePriceId: "price_placeholder",
    popular: true,
    icon: "👑",
  },
  {
    id: "comprehensive-planet-report",
    title: "Comprehensive Planet Report",
    titleHindi: "संपूर्ण ग्रह रिपोर्ट",
    category: "planets-nakshatra",
    price: 2149,
    deliveryMethod: "both",
    deliveryTime: "48 hours",
    description:
      "Complete analysis of all 9 planets in your chart — their strength, effects, and predictions for the next 5 years.",
    descriptionHindi: "सभी 9 ग्रहों का संपूर्ण विश्लेषण और 5 वर्षों की भविष्यवाणी।",
    whatYouGet: [
      "Individual analysis of all 9 planets",
      "Planetary strengths and weaknesses table",
      "Major predictions for next 5 years",
      "Best remedies for each weak planet",
      "Yearly timeline of key events",
    ],
    faq: [
      {
        q: "Is this the most comprehensive report?",
        a: "Yes! This is our flagship report covering all planetary influences with 5-year predictions.",
      },
      {
        q: "How accurate are 5-year predictions?",
        a: "Vedic astrology is highly accurate for timing. Major events are reliably predicted.",
      },
      {
        q: "Does this include a consultation?",
        a: "Yes, a 30-minute online consultation is included.",
      },
    ],
    testimonials: [
      {
        name: "Dr. Rajesh Mishra",
        rating: 5,
        review:
          "Incredibly accurate 5-year predictions. The planet-by-planet analysis is masterful.",
      },
      {
        name: "Shobha Rani",
        rating: 5,
        review:
          "Best investment in my spiritual journey. Every prediction so far has been accurate.",
      },
    ],
    sampleContent:
      "PLANET ANALYSIS: Sun (Libra, 12th house) — debilitated, creates father relationship issues. Moon (Capricorn, 3rd house) — strong, ambitious mind. Mars (Scorpio, 1st house) — exalted...",
    stripePriceId: "price_placeholder",
    popular: true,
    icon: "🌌",
  },

  // ─── HEALTH ───
  {
    id: "health-prediction",
    title: "Health Prediction Report",
    titleHindi: "स्वास्थ्य भविष्यवाणी रिपोर्ट",
    category: "health",
    price: 199,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Astrological health analysis identifying vulnerable body areas, disease-prone periods, and preventive measures.",
    descriptionHindi:
      "ज्योतिषीय स्वास्थ्य विश्लेषण — कमजोर अंग, रोगग्रस्त काल और बचाव के उपाय।",
    whatYouGet: [
      "Vulnerable body areas from your chart",
      "Disease-prone dasha periods",
      "Mental health indicators",
      "Dietary and lifestyle recommendations",
      "Preventive astrological remedies",
    ],
    faq: [
      {
        q: "Can astrology predict specific diseases?",
        a: "Astrology identifies vulnerable areas and timing. It is a preventive tool, not a medical diagnosis.",
      },
      {
        q: "Which planet causes most health issues?",
        a: "Saturn, Rahu, Ketu and the 6th/8th house lords primarily indicate health challenges.",
      },
      {
        q: "What if my health planet is strong?",
        a: "A strong 1st lord and benefic Sun/Moon indicate good overall vitality.",
      },
    ],
    testimonials: [
      {
        name: "Dr. Alka Sharma",
        rating: 4,
        review:
          "Predicted my knee problems (Saturn related) years before they manifested. Preventive remedies helped.",
      },
      {
        name: "Ramesh Yadav",
        rating: 5,
        review:
          "Health report helped me understand my energy cycles. Highly recommended.",
      },
    ],
    sampleContent:
      "With Saturn in Cancer (4th house) and Ketu in Cancer, your chart indicates potential weakness in chest/lungs and digestive system. Peak health challenges during Saturn dasha...",
    stripePriceId: "price_placeholder",
    icon: "🏥",
  },

  // ─── TIMING ───
  {
    id: "daily-horoscope-monthly",
    title: "Daily Horoscope (1 Month)",
    titleHindi: "दैनिक राशिफल (1 माह)",
    category: "timing",
    price: 39,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Personalized daily horoscope for 30 days based on your specific birth chart (not generic Sun sign).",
    descriptionHindi:
      "30 दिन का व्यक्तिगत दैनिक राशिफल — सामान्य नहीं, आपकी कुंडली के आधार पर।",
    whatYouGet: [
      "30 days of personalized daily predictions",
      "Lucky days highlighted for each week",
      "Days to avoid major decisions",
      "Monthly overview summary",
      "PDF format for easy reference",
    ],
    faq: [
      {
        q: "Is this the same as generic newspaper horoscope?",
        a: "No! This is based on YOUR specific birth chart. Much more accurate and personalized.",
      },
      {
        q: "Can I use this for business decisions?",
        a: "Yes, the report highlights your peak power days for important meetings and launches.",
      },
      {
        q: "When will I receive my report?",
        a: "Within 24 hours of order and birth details submission.",
      },
    ],
    testimonials: [
      {
        name: "Nandita Roy",
        rating: 5,
        review:
          "Incredibly accurate daily predictions! Much better than generic horoscopes.",
      },
      {
        name: "Vivek Soni",
        rating: 4,
        review:
          "Great value. Used it to plan business meetings and got excellent results.",
      },
    ],
    sampleContent:
      "May 5 (Monday): Strong day for negotiations. Moon in Scorpio activates your 1st house. Avoid major financial decisions after 3 PM. Lucky color: Red...",
    stripePriceId: "price_placeholder",
    icon: "📅",
  },
  {
    id: "weekly-predictions",
    title: "Weekly Predictions (3 Months)",
    titleHindi: "साप्ताहिक भविष्यवाणी (3 माह)",
    category: "timing",
    price: 99,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Week-by-week personalized predictions for 3 months covering career, relationships, health, and finances.",
    descriptionHindi: "3 माह की साप्ताहिक व्यक्तिगत भविष्यवाणी।",
    whatYouGet: [
      "12 weeks of personalized predictions",
      "Best weeks for job changes and investments",
      "Relationship and love forecasts",
      "Health and energy level predictions",
      "Monthly summary for each of the 3 months",
    ],
    faq: [
      {
        q: "How is weekly more useful than daily?",
        a: "Weekly predictions help in planning. You know which weeks to be aggressive and which to be cautious.",
      },
      {
        q: "What if I want to extend beyond 3 months?",
        a: "You can purchase the 12-month Monthly Forecast report for full year coverage.",
      },
    ],
    testimonials: [
      {
        name: "Ashok Jain",
        rating: 5,
        review:
          "Weekly predictions helped me plan my work calendar perfectly. Highly accurate!",
      },
    ],
    sampleContent:
      "Week 1 (May 5-11): Excellent period for career advancement. Venus transit supports professional relationships...",
    stripePriceId: "price_placeholder",
    icon: "📆",
  },
  {
    id: "monthly-forecast-year",
    title: "Monthly Forecast (1 Year)",
    titleHindi: "मासिक भविष्यवाणी (1 वर्ष)",
    category: "timing",
    price: 199,
    deliveryMethod: "both",
    deliveryTime: "48 hours",
    description:
      "Month-by-month personalized forecast for the entire year based on your birth chart and planetary transits.",
    descriptionHindi: "पूरे वर्ष की माह-दर-माह व्यक्तिगत भविष्यवाणी।",
    whatYouGet: [
      "12 months of personalized forecasts",
      "Best months for major life decisions",
      "Travel and relocation timing",
      "Financial opportunity months",
      "Annual overview and key dates",
    ],
    faq: [
      {
        q: "Does the report cover all life areas?",
        a: "Yes, each monthly prediction covers career, finance, relationships, and health.",
      },
      {
        q: "When does the 1-year period start?",
        a: "From the date of your order or from your specified start month.",
      },
    ],
    testimonials: [
      {
        name: "Kamla Devi",
        rating: 5,
        review:
          "The monthly forecast has been 85% accurate! Best astrological investment.",
      },
      {
        name: "Sudhir Kapoor",
        rating: 4,
        review:
          "Very helpful for planning major life decisions throughout the year.",
      },
    ],
    sampleContent:
      "JUNE 2025: Career peak period. Jupiter transit over your 10th house brings promotion opportunities. JULY 2025: Financial caution advised...",
    stripePriceId: "price_placeholder",
    icon: "🗓️",
  },
  {
    id: "annual-varshphal",
    title: "Annual Varshphal Report",
    titleHindi: "वार्षिक वर्षफल रिपोर्ट",
    category: "timing",
    price: 299,
    deliveryMethod: "both",
    deliveryTime: "48 hours",
    description:
      "Annual solar return chart (Varshphal) analysis showing the year's major themes, opportunities, and challenges.",
    descriptionHindi:
      "वार्षिक सौर कुंडली विश्लेषण — वर्ष के प्रमुख विषय, अवसर और चुनौतियां।",
    whatYouGet: [
      "Varshphal (solar return) chart for current year",
      "Year Lord (Varshesh) analysis",
      "Monthly Mudda Dasha predictions",
      "Tri-rashi analysis",
      "Annual remedies for challenges",
    ],
    faq: [
      {
        q: "What is Varshphal?",
        a: "Varshphal is a special annual chart created when the Sun returns to its birth position.",
      },
      {
        q: "Is Varshphal different from transit predictions?",
        a: "Yes. Varshphal is a standalone chart providing annual-specific insights.",
      },
    ],
    testimonials: [
      {
        name: "Rohit Agarwal",
        rating: 5,
        review:
          "Varshphal report predicted job change and foreign travel accurately!",
      },
      {
        name: "Bharti Singh",
        rating: 5,
        review: "Yearly remedies from Varshphal have been very effective.",
      },
    ],
    sampleContent:
      "Your Varshphal 2025-26: Year Lord is Mercury — communication, business deals, and education are highlighted. Mudda Dasha: Sun (Jan-Feb): Authority and recognition...",
    stripePriceId: "price_placeholder",
    popular: true,
    icon: "☀️",
  },
  {
    id: "dasha-period-analysis",
    title: "Dasha Period Analysis",
    titleHindi: "दशा अवधि विश्लेषण",
    category: "timing",
    price: 399,
    deliveryMethod: "both",
    deliveryTime: "48 hours",
    description:
      "Detailed analysis of your current and upcoming Mahadasha and Antardasha periods with predictions.",
    descriptionHindi: "वर्तमान और आगामी महादशा-अंतर्दशा का विस्तृत विश्लेषण।",
    whatYouGet: [
      "Current Mahadasha analysis",
      "Upcoming Dasha sequence for 20 years",
      "Best and challenging periods identified",
      "Career and financial peaks by Dasha",
      "Dasha-specific remedies",
    ],
    faq: [
      {
        q: "What is Mahadasha?",
        a: "Mahadasha is a major planetary period lasting 6-20 years. It heavily influences life events.",
      },
      {
        q: "Which Dasha is best for marriage?",
        a: "Typically Venus and Jupiter dashas bring marriage. Our report specifies for your unique chart.",
      },
    ],
    testimonials: [
      {
        name: "Shiv Kumar",
        rating: 5,
        review:
          "Dasha analysis perfectly explained my career struggles during Saturn mahadasha.",
      },
      {
        name: "Uma Shankar",
        rating: 5,
        review:
          "Knowing upcoming Dasha periods helped me plan my investments wisely.",
      },
    ],
    sampleContent:
      "Current Mahadasha: Saturn (until 2028). Current Antardasha: Jupiter — brings expansion and wisdom. Career breakthrough expected in early 2026...",
    stripePriceId: "price_placeholder",
    icon: "⏳",
  },
  {
    id: "sade-sati-report",
    title: "Sade Sati Report",
    titleHindi: "साढ़ेसाती रिपोर्ट",
    category: "timing",
    price: 249,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Complete Sade Sati analysis — Saturn's 7.5-year cycle over your Moon sign with phase-by-phase predictions.",
    descriptionHindi: "चंद्र राशि पर शनि के साढ़े सात वर्ष का संपूर्ण विश्लेषण।",
    whatYouGet: [
      "Whether you are in Sade Sati now",
      "Phase of Sade Sati (1st, 2nd, 3rd)",
      "Challenges and opportunities each phase brings",
      "Sade Sati start and end dates",
      "Powerful Sade Sati remedies",
    ],
    faq: [
      {
        q: "Is Sade Sati the worst period?",
        a: "Not necessarily. Saturn teaches discipline and growth. Many people achieve great success during Sade Sati.",
      },
      {
        q: "I have Moon in Capricorn — am I in Sade Sati?",
        a: "Yes! With Saturn in Pisces currently, Moon in Capricorn natives are in the 3rd phase (most intense).",
      },
    ],
    testimonials: [
      {
        name: "Gita Kaul",
        rating: 5,
        review: "Sade Sati remedies reduced my struggles significantly.",
      },
      {
        name: "Mohan Das",
        rating: 4,
        review:
          "Good explanation of Sade Sati phases. Phase-wise guidance was very helpful.",
      },
    ],
    sampleContent:
      "Your Moon is in Capricorn. Saturn is currently in Pisces (3rd house from Moon). You are in Phase 3 of Sade Sati — the culmination phase. This phase ends in November 2025...",
    stripePriceId: "price_placeholder",
    icon: "🪐",
  },
  {
    id: "antardasha-timing",
    title: "Antardasha Timing Report",
    titleHindi: "अंतर्दशा टाइमिंग रिपोर्ट",
    category: "timing",
    price: 349,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Detailed sub-period (Antardasha) analysis within your current Mahadasha for precise event timing.",
    descriptionHindi: "महादशा के अंतर्गत अंतर्दशाओं का सटीक विश्लेषण।",
    whatYouGet: [
      "All Antardasha periods listed with dates",
      "Best Antardashas for major decisions",
      "Career opportunities by Antardasha",
      "Love and marriage windows",
      "Financial peaks and challenges",
    ],
    faq: [
      {
        q: "How long does an Antardasha last?",
        a: "Antardasha periods range from a few months to 3+ years.",
      },
      {
        q: "Can I predict marriage timing from Antardasha?",
        a: "Yes! Marriage typically occurs during Venus or Jupiter Antardasha within a favorable Mahadasha.",
      },
    ],
    testimonials: [
      {
        name: "Rekha Jha",
        rating: 5,
        review: "Antardasha timing was incredibly precise for my career shift.",
      },
      {
        name: "Anil Saxena",
        rating: 4,
        review:
          "Good detailed breakdown of sub-periods. Helped me plan major decisions.",
      },
    ],
    sampleContent:
      "Saturn Mahadasha (2023-2042): Current Antardasha — Saturn/Jupiter (Aug 2025 - Nov 2027). Highly productive period for career advancement and wealth accumulation...",
    stripePriceId: "price_placeholder",
    icon: "🔢",
  },

  // ─── CAREER & EDUCATION ───
  {
    id: "career-path-report",
    title: "Career Path Report",
    titleHindi: "करियर पथ रिपोर्ट",
    category: "career",
    price: 199,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Best career path based on your birth chart — identify your natural talents, ideal profession, and timing for career growth.",
    descriptionHindi:
      "जन्म कुंडली से सर्वोत्तम करियर — प्राकृतिक प्रतिभा, आदर्श पेशा और विकास का समय।",
    whatYouGet: [
      "Ideal career sectors based on chart",
      "10th house lord analysis for career",
      "Best timing for job change or promotion",
      "Entrepreneurship vs employment indicators",
      "Career remedies to overcome obstacles",
    ],
    faq: [
      {
        q: "Which house indicates career?",
        a: "The 10th house is primary for career. The 2nd (income) and 6th (service) are also analyzed.",
      },
      {
        q: "Can astrology predict government job?",
        a: "Yes. Strong Sun, well-placed 10th lord, and certain yogas indicate government service potential.",
      },
      {
        q: "What if I'm already in a wrong career?",
        a: "The report gives timing for career transitions and what fields align better with your chart.",
      },
    ],
    testimonials: [
      {
        name: "Manish Tripathi",
        rating: 5,
        review:
          "Career report confirmed my artistic talents and right timing for starting my own business.",
      },
      {
        name: "Sapna Gupta",
        rating: 5,
        review: "Changed my career as suggested and thriving now.",
      },
    ],
    sampleContent:
      "Your 10th lord Sun is in Libra (12th house) — indicates work in foreign lands or behind-the-scenes roles. Strong Mercury in Scorpio suggests IT, research, or finance careers...",
    stripePriceId: "price_placeholder",
    icon: "💼",
  },
  {
    id: "education-abroad-report",
    title: "Education & Abroad Report",
    titleHindi: "शिक्षा और विदेश रिपोर्ट",
    category: "career",
    price: 199,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Analysis of higher education prospects, ideal study fields, and foreign settlement/travel timing.",
    descriptionHindi:
      "उच्च शिक्षा, अध्ययन क्षेत्र और विदेश यात्रा/बसाव का ज्योतिषीय विश्लेषण।",
    whatYouGet: [
      "4th and 5th house education analysis",
      "Best subjects for higher education",
      "9th and 12th house foreign travel analysis",
      "Best timing for abroad plans",
      "Remedies to achieve educational goals",
    ],
    faq: [
      {
        q: "Which houses indicate foreign travel?",
        a: "The 9th house (long journeys) and 12th house (foreign lands, settlement) are key.",
      },
      {
        q: "Can astrology predict abroad settlement?",
        a: "Yes. Rahu in the 12th house often indicates strong foreign prospects.",
      },
    ],
    testimonials: [
      {
        name: "Pradeep Nair",
        rating: 5,
        review:
          "Abroad report predicted my USA opportunity timing exactly. Got my visa in the predicted window!",
      },
      {
        name: "Deepa Menon",
        rating: 4,
        review:
          "Good analysis of my education prospects. Chose the right field and thriving.",
      },
    ],
    sampleContent:
      "Your 9th house (Rahu in Capricorn) strongly indicates foreign connections. Jupiter transit over Pisces in 2025-26 is an excellent window for foreign plans...",
    stripePriceId: "price_placeholder",
    icon: "✈️",
  },

  // ─── LOVE, MARRIAGE & FAMILY ───
  {
    id: "kundali-matching",
    title: "Kundali Matching Report",
    titleHindi: "कुंडली मिलान रिपोर्ट",
    category: "love-marriage",
    price: 299,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Complete Vedic compatibility analysis between two birth charts. Ashtakoot matching with 36-point scoring.",
    descriptionHindi: "अष्टकूट मिलान सहित दो कुंडलियों का संपूर्ण वैदिक अनुकूलता विश्लेषण।",
    whatYouGet: [
      "Ashtakoot score (out of 36 points)",
      "All 8 Kootas individually explained",
      "Mangal Dosha analysis for both",
      "Overall compatibility assessment",
      "Remedies if score is low",
    ],
    faq: [
      {
        q: "What score is acceptable for marriage?",
        a: "A score of 18+ is acceptable. 24+ is good. 30+ is excellent.",
      },
      {
        q: "Is Mangal Dosha cancellation real?",
        a: "Yes! Many combinations cancel Mangal Dosha. Our report checks all cancellation rules.",
      },
      {
        q: "Can people with low score marry?",
        a: "Yes, with proper astrological remedies.",
      },
    ],
    testimonials: [
      {
        name: "Ankita Sharma",
        rating: 5,
        review:
          "Kundali matching gave us confidence to proceed with our relationship. Very detailed!",
      },
      {
        name: "Vinod Mehta",
        rating: 5,
        review:
          "Our score was 28/36. Excellent report that accurately predicted our compatibility.",
      },
    ],
    sampleContent:
      "Varna: 2/1 (Good). Vashya: 2/2 (Excellent). Tara: 3/3 (Excellent). Yoni: 3/4 (Good). Gana: 6/6 (Excellent). Bhakoot: 0/7 (Issues noted). Total: 21/36...",
    stripePriceId: "price_placeholder",
    popular: true,
    icon: "💑",
  },
  {
    id: "marriage-timing",
    title: "Marriage Timing Report",
    titleHindi: "विवाह समय रिपोर्ट",
    category: "love-marriage",
    price: 249,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Precise astrological timing for when marriage is most likely to happen based on Dasha, transits, and Navamsha.",
    descriptionHindi: "दशा, गोचर और नवांश के आधार पर विवाह का सटीक समय।",
    whatYouGet: [
      "Most likely marriage years from chart",
      "7th house analysis for marriage prospects",
      "Navamsha indicators for marriage timing",
      "Current Dasha favorability for marriage",
      "Remedies to remove marriage obstacles",
    ],
    faq: [
      {
        q: "What if I have marriage delay in chart?",
        a: "Saturn in 7th or malefic influence on 7th lord causes delays. Specific remedies are given.",
      },
      {
        q: "Can inter-caste marriage be predicted?",
        a: "Yes! Rahu's influence on 7th house often indicates unconventional marriage.",
      },
      {
        q: "What is the best age for marriage astrologically?",
        a: "It varies by chart. Your report gives specific age ranges when marriage is most likely.",
      },
    ],
    testimonials: [
      {
        name: "Kavitha Reddy",
        rating: 5,
        review:
          "Marriage timing prediction was accurate to within 2 months! Amazing!",
      },
      {
        name: "Sunil Bose",
        rating: 5,
        review:
          "Was worried about marriage delay. Report explained the reason and remedies. Got married next year!",
      },
    ],
    sampleContent:
      "Your 7th lord Venus is in Virgo — Venus in debilitation delays marriage. However, Neecha Bhanga Yoga is present. Most favorable window: Mid 2025 to early 2026...",
    stripePriceId: "price_placeholder",
    popular: true,
    icon: "💍",
  },
  {
    id: "spouse-description",
    title: "Spouse Description Report",
    titleHindi: "जीवनसाथी विवरण रिपोर्ट",
    category: "love-marriage",
    price: 199,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Astrological description of your future spouse — physical appearance, personality, profession, and family background.",
    descriptionHindi:
      "जीवनसाथी का ज्योतिषीय विवरण — रूप, स्वभाव, पेशा और पारिवारिक पृष्ठभूमि।",
    whatYouGet: [
      "Physical characteristics of spouse",
      "Personality and temperament",
      "Likely profession",
      "Direction from which spouse comes",
      "First letter of spouse's name (Navamsha based)",
    ],
    faq: [
      {
        q: "Can astrology really describe future spouse?",
        a: "The 7th house, its lord, Navamsha chart, and Darakaraka planet describe spouse characteristics accurately.",
      },
      {
        q: "What is Darakaraka?",
        a: "The planet with the lowest degree in your chart is your Darakaraka — it specifically describes your spouse.",
      },
    ],
    testimonials: [
      {
        name: "Divya Kapoor",
        rating: 5,
        review:
          "Spouse description was 90% accurate! Even the profession prediction was right.",
      },
      {
        name: "Ajay Mehta",
        rating: 5,
        review:
          "The physical description and personality traits were spot on for my wife.",
      },
    ],
    sampleContent:
      "Your Darakaraka is Venus (21° Virgo). Spouse characteristics: Medium height, pleasant appearance, artistic talents or love for beauty...",
    stripePriceId: "price_placeholder",
    icon: "💝",
  },
  {
    id: "love-life-analysis",
    title: "Love Life Analysis",
    titleHindi: "प्रेम जीवन विश्लेषण",
    category: "love-marriage",
    price: 199,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Analysis of your love life patterns, relationship strengths, challenges, and upcoming romantic opportunities.",
    descriptionHindi:
      "प्रेम जीवन के पैटर्न, रिश्ते की ताकत और आगामी रोमांटिक अवसरों का विश्लेषण।",
    whatYouGet: [
      "5th house (romance) analysis",
      "Current love life dasha periods",
      "Compatibility patterns based on your chart",
      "Best timing for romantic opportunities",
      "Relationship karma and lessons",
    ],
    faq: [
      {
        q: "Which planet governs romance?",
        a: "Venus is the primary planet for love. The 5th house lord and Moon also significantly influence romantic life.",
      },
      {
        q: "Can love marriage be seen in chart?",
        a: "Yes. Venus-Mars conjunction and Rahu in 7th or 5th house often indicate love marriages.",
      },
    ],
    testimonials: [
      {
        name: "Pallavi Bhat",
        rating: 4,
        review:
          "Love life analysis was very insightful. Helped me understand relationship patterns I was repeating.",
      },
      {
        name: "Arun Sharma",
        rating: 5,
        review:
          "Romantic timing prediction was accurate. Met my partner exactly in the predicted window!",
      },
    ],
    sampleContent:
      "Your 5th lord Jupiter in Scorpio (1st house) creates strong romantic desires. Current Venus mahadasha (2023-2043) is an excellent overall period for love life...",
    stripePriceId: "price_placeholder",
    icon: "❤️",
  },
  {
    id: "child-birth-timing",
    title: "Child Birth Timing",
    titleHindi: "संतान प्राप्ति समय",
    category: "love-marriage",
    price: 249,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Analysis of Santan Yoga in your chart — when is child birth most likely and remedies if there are delays.",
    descriptionHindi: "संतान योग विश्लेषण — संतान का उचित समय और विलंब के उपाय।",
    whatYouGet: [
      "5th house Santan Yoga analysis",
      "Best timing for child birth",
      "Indicators of child birth challenges",
      "Jupiter transit and child birth connection",
      "Santana Gopal remedies if needed",
    ],
    faq: [
      {
        q: "Which house indicates children?",
        a: "The 5th house is the primary house for children. Its lord and Jupiter's placement are crucial.",
      },
      {
        q: "Can IVF success be predicted?",
        a: "Medical procedures are indicated by 8th house connections. Our report gives optimal timing for fertility treatments.",
      },
    ],
    testimonials: [
      {
        name: "Rekha Pillai",
        rating: 5,
        review:
          "After 5 years of trying, followed child birth remedies from this report. Blessed with a baby in 8 months!",
      },
      {
        name: "Sanjiv Kumar",
        rating: 5,
        review:
          "Timing prediction was accurate. Our daughter was born in the predicted window.",
      },
    ],
    sampleContent:
      "Your 5th house is Pisces with no planets but 5th lord Jupiter is strong in the 1st house. Child birth is strongly indicated. Most favorable periods: Jupiter antardasha windows...",
    stripePriceId: "price_placeholder",
    icon: "👶",
  },
  {
    id: "family-harmony",
    title: "Family Harmony Report",
    titleHindi: "पारिवारिक सौहार्द रिपोर्ट",
    category: "love-marriage",
    price: 129,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Analysis of family relationships — parents, siblings, spouse, and children — and remedies for harmony.",
    descriptionHindi:
      "माता-पिता, भाई-बहन, पति/पत्नी और संतान के साथ संबंधों का विश्लेषण।",
    whatYouGet: [
      "4th house (mother) and 9th house (father) analysis",
      "3rd house (siblings) relationship patterns",
      "Reasons for family conflicts from chart",
      "Best remedies for family harmony",
      "Timing of family challenges",
    ],
    faq: [
      {
        q: "Can family conflicts be reduced with astrology?",
        a: "Yes! Many family disputes are Pitra Dosha or Shani related. Specific remedies significantly reduce conflicts.",
      },
      {
        q: "Which planet causes family problems?",
        a: "Afflicted Moon (4th house), Saturn, Rahu and the 4th house lord are primary indicators.",
      },
    ],
    testimonials: [
      {
        name: "Savita Devi",
        rating: 5,
        review:
          "Family harmony report identified our issue as Pitra Dosha. After Pitra Tarpan, relations improved remarkably.",
      },
      {
        name: "Mukesh Sharma",
        rating: 4,
        review:
          "Good analysis of family dynamics. The remedies were practical and effective.",
      },
    ],
    sampleContent:
      "Your 4th lord Saturn in Cancer creates emotional distance with mother. This is a classical Pitra Dosha indicator. Performing monthly Shraadh will significantly improve family harmony...",
    stripePriceId: "price_placeholder",
    icon: "👨‍👩‍👧‍👦",
  },

  // ─── MONEY & LUCK ───
  {
    id: "wealth-yoga-report",
    title: "Wealth Yoga Report",
    titleHindi: "धन योग रिपोर्ट",
    category: "money-luck",
    price: 199,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Identify all wealth-giving Yogas in your chart — Dhana Yoga, Lakshmi Yoga, and when they activate.",
    descriptionHindi: "धन योग, लक्ष्मी योग आदि की पहचान और सक्रियण का समय।",
    whatYouGet: [
      "All Dhana (wealth) Yogas identified",
      "Lakshmi Yoga and Kubera Yoga analysis",
      "Best periods for financial growth",
      "Investment timing guidance",
      "Remedies to activate dormant Yogas",
    ],
    faq: [
      {
        q: "Does Dhana Yoga guarantee wealth?",
        a: "Dhana Yoga gives the potential for wealth. It must be activated by the right Dasha.",
      },
      {
        q: "My chart has no Dhana Yoga — am I destined to be poor?",
        a: "No! Many people become wealthy without classic Dhana Yogas through hard work and planetary transits.",
      },
    ],
    testimonials: [
      {
        name: "Naresh Jain",
        rating: 5,
        review:
          "Discovered powerful Dhana Yoga I never knew about! Investments in the suggested period gave 3x returns.",
      },
      {
        name: "Lakshmi Devi",
        rating: 5,
        review:
          "Wealth Yoga report was eye-opening. Changed my financial planning completely.",
      },
    ],
    sampleContent:
      "Your chart contains Lakshmi Yoga: 9th lord (Moon) is strong and 1st lord (Mars) is in 1st house. Additionally, Dhana Yoga: 2nd and 11th lords conjoined in 11th house...",
    stripePriceId: "price_placeholder",
    icon: "💰",
  },
  {
    id: "luck-factor-analysis",
    title: "Luck Factor Analysis",
    titleHindi: "भाग्य कारक विश्लेषण",
    category: "money-luck",
    price: 149,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Analysis of your lucky periods, lucky colors, numbers, directions, and days for maximizing fortune.",
    descriptionHindi: "शुभ काल, शुभ रंग, अंक, दिशा और दिन का विश्लेषण।",
    whatYouGet: [
      "Your luckiest years (by Dasha)",
      "Lucky colors, numbers, and gemstones",
      "Lucky days of the week",
      "Favorable directions for your goals",
      "Lucky timing during each day",
    ],
    faq: [
      {
        q: "How are lucky colors determined?",
        a: "Lucky colors are derived from your ascendant lord, Moon sign, and Sun sign planets.",
      },
      {
        q: "Can changing lifestyle per lucky factors really help?",
        a: "Yes! Aligning with favorable energies amplifies success.",
      },
    ],
    testimonials: [
      {
        name: "Rita Singh",
        rating: 5,
        review:
          "Started wearing lucky color and using favorable day for meetings. Business improved 40%!",
      },
      {
        name: "Pradeep Malhotra",
        rating: 4,
        review:
          "Luck factor analysis was very practical and easy to implement.",
      },
    ],
    sampleContent:
      "Your Luck Summary: Lucky Colors: Red (Mars/Scorpio), Yellow (Jupiter). Lucky Numbers: 1, 9. Lucky Day: Tuesday (Mars day). Lucky Direction: South...",
    stripePriceId: "price_placeholder",
    icon: "🍀",
  },
  {
    id: "business-success-report",
    title: "Business Success Report",
    titleHindi: "व्यापार सफलता रिपोर्ट",
    category: "money-luck",
    price: 199,
    deliveryMethod: "both",
    deliveryTime: "24 hours",
    description:
      "Business prospects, ideal business type, best timing to start/expand, and partnership analysis.",
    descriptionHindi:
      "व्यापार संभावना, उचित व्यापार प्रकार, शुरू करने का सही समय और साझेदारी विश्लेषण।",
    whatYouGet: [
      "Business vs job suitability from chart",
      "Best business types for your planetary profile",
      "Ideal timing to start or expand business",
      "Partnership indicators (7th house analysis)",
      "Business remedies and lucky directions",
    ],
    faq: [
      {
        q: "Can astrology predict business failure?",
        a: "Challenging periods can be identified. With advance knowledge and remedies, losses can be minimized.",
      },
      {
        q: "Which planets favor business?",
        a: "Mercury (trade), Mars (enterprise), Jupiter (expansion), and a strong 7th house lord favor business success.",
      },
      {
        q: "What if my chart shows employee tendency?",
        a: "We identify the optimal balance and specific niches where you thrive independently.",
      },
    ],
    testimonials: [
      {
        name: "Rajan Agarwal",
        rating: 5,
        review:
          "Business report identified the perfect timing to launch. Revenue doubled in the first year!",
      },
      {
        name: "Sundar Subramanian",
        rating: 5,
        review:
          "Suggested business type aligned perfectly with my skills. Very accurate analysis.",
      },
    ],
    sampleContent:
      "Your 10th lord Sun in Libra (12th house) with Mercury in Scorpio strongly favors IT consulting, research, or spiritual/healing business. Best launch window: Oct-Nov 2025...",
    stripePriceId: "price_placeholder",
    popular: true,
    icon: "📈",
  },
];

export const REPORT_CATEGORIES = [
  { id: "all", label: "All Reports", labelHindi: "सभी रिपोर्ट" },
  {
    id: "remedies-vastu",
    label: "Remedies & Vastu",
    labelHindi: "उपाय और वास्तु",
    icon: "🔮",
  },
  {
    id: "planets-nakshatra",
    label: "Planets & Nakshatra",
    labelHindi: "ग्रह और नक्षत्र",
    icon: "🌌",
  },
  { id: "health", label: "Health", labelHindi: "स्वास्थ्य", icon: "🏥" },
  { id: "timing", label: "Timing", labelHindi: "समय", icon: "⏳" },
  { id: "career", label: "Career", labelHindi: "करियर", icon: "💼" },
  {
    id: "love-marriage",
    label: "Love & Marriage",
    labelHindi: "प्रेम और विवाह",
    icon: "💑",
  },
  {
    id: "money-luck",
    label: "Money & Luck",
    labelHindi: "धन और भाग्य",
    icon: "💰",
  },
] as const;
