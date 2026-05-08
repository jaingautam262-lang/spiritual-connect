export interface AstroReport {
  id: string;
  slug: string;
  title: string;
  titleHi?: string;
  category: string;
  price: number;
  priceDisplay: string;
  description: string;
  deliveryTime: string;
  deliveryMethod: string;
  sampleIncluded: boolean;
  faq: { q: string; a: string }[];
  testimonials: { name: string; rating: number; review: string }[];
  whatYouGet: string[];
  featured?: boolean;
}

export const astroReports: AstroReport[] = [
  // REMEDIES, VASTU & RUDRAKSHA
  {
    id: "1",
    slug: "lal-kitab-remedies-report",
    title: "Lal Kitab Remedies Report",
    titleHi: "लाल किताब उपाय रिपोर्ट",
    category: "Remedies & Vastu",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Personalized Lal Kitab remedies based on your birth chart. Discover easy, effective remedies for debt clearance, career growth, relationship harmony, and overall well-being.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    featured: true,
    whatYouGet: [
      "Lal Kitab chart analysis",
      "Top 10 personalized remedies",
      "Daily, weekly and annual remedies",
      "Planetary positions and their effects",
      "Easy home remedies with common items",
    ],
    faq: [
      {
        q: "What details are required?",
        a: "Full name, date of birth, time of birth, and place of birth.",
      },
      {
        q: "How are Lal Kitab remedies different?",
        a: "Lal Kitab remedies use simple household items and actions instead of expensive gemstones.",
      },
    ],
    testimonials: [
      {
        name: "Ritu Agarwal",
        rating: 5,
        review:
          "The remedies were simple and I saw results within a month. Very accurate chart analysis!",
      },
      {
        name: "Vikash Sharma",
        rating: 5,
        review: "Detailed report with practical remedies. Highly recommend.",
      },
      {
        name: "Priya Singh",
        rating: 4,
        review:
          "Good report, delivered on time. The remedies are easy to follow.",
      },
    ],
  },
  {
    id: "2",
    slug: "vastu-dosh-remedies-report",
    title: "Vastu Dosh Remedies Report",
    titleHi: "वास्तु दोष उपाय रिपोर्ट",
    category: "Remedies & Vastu",
    price: 249,
    priceDisplay: "₹249",
    description:
      "Detailed Vastu defect analysis of your home or office and practical correction tips to restore positive energy flow and prosperity.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "Vastu map analysis",
      "Room-wise dosh identification",
      "Simple correction tips",
      "Recommended crystals and yantras",
      "Color therapy suggestions",
    ],
    faq: [
      {
        q: "Do I need to provide floor plan?",
        a: "A rough sketch or description of your home layout is sufficient.",
      },
      {
        q: "Can Vastu dosh be corrected without demolition?",
        a: "Yes, 95% of Vastu doshas can be corrected without structural changes.",
      },
    ],
    testimonials: [
      {
        name: "Manish Kumar",
        rating: 5,
        review:
          "After following the Vastu tips, there's a noticeable positive change at home.",
      },
      {
        name: "Sunita Devi",
        rating: 4,
        review: "Good analysis. The corrections were practical and affordable.",
      },
      {
        name: "Rakesh Patel",
        rating: 5,
        review:
          "Business improved after making the suggested changes. Very grateful.",
      },
    ],
  },
  {
    id: "3",
    slug: "gemstone-recommendation-report",
    title: "Gemstone Recommendation Report",
    titleHi: "रत्न अनुशंसा रिपोर्ट",
    category: "Remedies & Vastu",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Find the right gemstone based on your planetary positions. Wearing the correct gemstone can amplify your strengths and reduce planetary malefic effects.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "Primary gemstone recommendation",
      "Secondary alternatives",
      "Metal and weight specifications",
      "Wearing instructions and mantras",
      "Gemstones to avoid",
    ],
    faq: [
      {
        q: "Should I wear all recommended gemstones?",
        a: "Typically we recommend 1-2 primary gemstones. Wearing too many can be counterproductive.",
      },
      {
        q: "How long before I see results?",
        a: "Most people notice effects within 40-90 days of wearing the correct gemstone.",
      },
    ],
    testimonials: [
      {
        name: "Neha Gupta",
        rating: 5,
        review:
          "Wore the recommended pearl and my anxiety reduced significantly within weeks!",
      },
      {
        name: "Arjun Mehta",
        rating: 5,
        review:
          "The yellow sapphire recommendation was spot on. Career took off.",
      },
      {
        name: "Kavita Joshi",
        rating: 4,
        review: "Detailed report with clear instructions. Very helpful.",
      },
    ],
  },
  {
    id: "4",
    slug: "rudraksha-recommendation-report",
    title: "Rudraksha Recommendation Report",
    titleHi: "रुद्राक्ष अनुशंसा रिपोर्ट",
    category: "Remedies & Vastu",
    price: 149,
    priceDisplay: "₹149",
    description:
      "Best Rudraksha beads for your unique birth chart. Rudraksha beads carry divine energy that aligns with specific planets and life goals.",
    deliveryTime: "Within 24 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Primary Rudraksha recommendation",
      "Combination for multiple goals",
      "Wearing protocol and mantras",
      "Cleansing and energization guidance",
      "Mukhi significance explained",
    ],
    faq: [
      {
        q: "What mukhi Rudraksha is best for general well-being?",
        a: "5 mukhi Rudraksha is considered safe and beneficial for everyone.",
      },
      {
        q: "Can Rudraksha be worn by women?",
        a: "Yes, Rudraksha can be worn by anyone regardless of gender.",
      },
    ],
    testimonials: [
      {
        name: "Suresh Verma",
        rating: 5,
        review:
          "The 11 mukhi recommendation was perfect for my business goals.",
      },
      {
        name: "Pooja Sharma",
        rating: 5,
        review:
          "Wearing the recommended Rudraksha has brought noticeable peace of mind.",
      },
      {
        name: "Dinesh Nair",
        rating: 4,
        review: "Quick report, easy to follow guidance.",
      },
    ],
  },
  {
    id: "5",
    slug: "annual-remedies-report",
    title: "Annual Remedies Report",
    titleHi: "वार्षिक उपाय रिपोर्ट",
    category: "Remedies & Vastu",
    price: 299,
    priceDisplay: "₹299",
    description:
      "Complete yearly remedies plan covering all 12 months. Includes planetary transits, auspicious dates, and customized remedies for the year ahead.",
    deliveryTime: "Within 72 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "Month-by-month remedies",
      "Key planetary transit dates",
      "Fasting schedule recommendation",
      "Monthly mantra practice",
      "Annual puja suggestions",
    ],
    faq: [
      {
        q: "Is this different from an annual horoscope?",
        a: "Yes — this focuses specifically on remedies and actions, not predictions.",
      },
    ],
    testimonials: [
      {
        name: "Amit Jain",
        rating: 5,
        review: "Following the annual plan has made 2025 my best year yet!",
      },
      {
        name: "Geeta Kumari",
        rating: 5,
        review: "Comprehensive report with actionable monthly guidance.",
      },
      {
        name: "Rajesh Mishra",
        rating: 4,
        review: "Very detailed. Takes some time to read but worth it.",
      },
    ],
  },
  {
    id: "6",
    slug: "yantra-recommendation-report",
    title: "Yantra Recommendation Report",
    titleHi: "यंत्र अनुशंसा रिपोर्ट",
    category: "Remedies & Vastu",
    price: 129,
    priceDisplay: "₹129",
    description:
      "Suitable yantras for your specific goals and birth chart. Yantras are sacred geometric tools that harmonize planetary energies.",
    deliveryTime: "Within 24 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Primary yantra recommendation",
      "Placement instructions",
      "Energization protocol",
      "Specific mantras for the yantra",
      "Goal-based alternatives",
    ],
    faq: [
      {
        q: "Where should I place the yantra?",
        a: "Placement instructions are customized based on your home direction and birth chart.",
      },
    ],
    testimonials: [
      {
        name: "Poonam Singh",
        rating: 5,
        review: "The Shree Yantra recommendation transformed my living space.",
      },
      {
        name: "Hemant Rao",
        rating: 4,
        review: "Good report with clear installation guidance.",
      },
      {
        name: "Anita Kapoor",
        rating: 5,
        review:
          "Business improved after placing the recommended yantra in my office.",
      },
    ],
  },
  // PLANETS & NAKSHATRA
  {
    id: "7",
    slug: "kundli-analysis-report",
    title: "Kundli Analysis Report",
    titleHi: "कुंडली विश्लेषण रिपोर्ट",
    category: "Planets & Nakshatra",
    price: 599,
    priceDisplay: "₹599",
    description:
      "Detailed birth chart interpretation covering all 12 houses, planetary placements, major yogas, and life predictions across career, relationships, health, and finances.",
    deliveryTime: "Within 72 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    featured: true,
    whatYouGet: [
      "Complete birth chart",
      "All 12 houses analyzed",
      "Major and minor yogas",
      "Strength and weakness analysis",
      "Life predictions in 5 areas",
    ],
    faq: [
      {
        q: "Is exact birth time required?",
        a: "Yes, for accurate house calculations. Even ±15 minutes can change the ascendant.",
      },
      {
        q: "How detailed is the report?",
        a: "Our Kundli Analysis report is typically 20-25 pages.",
      },
    ],
    testimonials: [
      {
        name: "Vivek Kumar",
        rating: 5,
        review:
          "Incredibly accurate. The astrologer predicted something about my career that happened 2 months later.",
      },
      {
        name: "Anjali Sharma",
        rating: 5,
        review: "Best kundli analysis I've ever received. Worth every rupee.",
      },
      {
        name: "Mohan Das",
        rating: 5,
        review:
          "Detailed and insightful. Changed my perspective on my life path.",
      },
    ],
  },
  {
    id: "8",
    slug: "navamsa-chart-report",
    title: "Navamsa Chart Report",
    titleHi: "नवांश चार्ट रिपोर्ट",
    category: "Planets & Nakshatra",
    price: 399,
    priceDisplay: "₹399",
    description:
      "D9 chart analysis for marriage prospects, dharma, and spiritual growth. The Navamsa is the most important divisional chart in Vedic astrology.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "D9 Navamsa chart",
      "Marriage prospects analysis",
      "Spouse characteristics",
      "Spiritual path indicators",
      "Combined D1 + D9 insights",
    ],
    faq: [
      {
        q: "What is Navamsa used for?",
        a: "Navamsa shows marriage, dharma, and the deeper spiritual purpose behind your natal chart.",
      },
    ],
    testimonials: [
      {
        name: "Rekha Pandey",
        rating: 5,
        review: "The spouse description was uncannily accurate!",
      },
      {
        name: "Sanjay Tiwari",
        rating: 4,
        review: "Very insightful for understanding my spiritual path.",
      },
      {
        name: "Nisha Rao",
        rating: 5,
        review: "Excellent report. Helped me understand my marriage timing.",
      },
    ],
  },
  {
    id: "9",
    slug: "career-planet-report",
    title: "Career Planet Report",
    titleHi: "करियर ग्रह रिपोर्ट",
    category: "Planets & Nakshatra",
    price: 299,
    priceDisplay: "₹299",
    description:
      "Planets influencing your career path. Identify your strongest career sectors, ideal workplace environments, and timing for career breakthroughs.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "10th house detailed analysis",
      "Career sectors analysis",
      "Best timing for career moves",
      "Planetary strengths for career",
      "Job vs business guidance",
    ],
    faq: [
      {
        q: "Can this help if I'm confused about career choice?",
        a: "Yes, this is specifically designed to clarify career direction based on planetary indications.",
      },
    ],
    testimonials: [
      {
        name: "Rohan Gupta",
        rating: 5,
        review:
          "Switched careers based on this report and it was the best decision of my life!",
      },
      {
        name: "Meena Joshi",
        rating: 5,
        review: "Very detailed and accurate career analysis.",
      },
      {
        name: "Aakash Singh",
        rating: 4,
        review: "Good report with clear guidance on career timing.",
      },
    ],
  },
  {
    id: "10",
    slug: "nakshatra-profile-report",
    title: "Nakshatra Profile Report",
    titleHi: "नक्षत्र प्रोफाइल रिपोर्ट",
    category: "Planets & Nakshatra",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Deep dive into your birth Nakshatra — its ruling deity, characteristics, strengths, weaknesses, compatible Nakshatras, and life path guidance.",
    deliveryTime: "Within 24 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Nakshatra characteristics",
      "Deity and mythology",
      "Strengths and weaknesses",
      "Compatible Nakshatras",
      "Career and relationship guidance",
    ],
    faq: [
      {
        q: "What is a Nakshatra?",
        a: "Nakshatra is the lunar mansion (star sign) in Vedic astrology. There are 27 Nakshatras.",
      },
    ],
    testimonials: [
      {
        name: "Divya Krishnan",
        rating: 5,
        review:
          "So accurate! Felt like the report was written specifically for me.",
      },
      {
        name: "Tushar Bhatt",
        rating: 4,
        review: "Interesting deep dive into Nakshatra characteristics.",
      },
      {
        name: "Swati Iyer",
        rating: 5,
        review: "This report helped me understand myself much better.",
      },
    ],
  },
  {
    id: "11",
    slug: "planetary-strengths-report",
    title: "Planetary Strengths Report",
    titleHi: "ग्रह बल रिपोर्ट",
    category: "Planets & Nakshatra",
    price: 349,
    priceDisplay: "₹349",
    description:
      "Shadbala (six-fold planetary strength) and dignity analysis. Know exactly which planets are supporting you and which are creating challenges.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "Shadbala calculation",
      "Planetary dignity table",
      "Strongest and weakest planets",
      "How to strengthen weak planets",
      "Timing for planetary remedies",
    ],
    faq: [
      {
        q: "What is Shadbala?",
        a: "Shadbala is a numerical measure of a planet's total strength in your chart, accounting for 6 different types of strength.",
      },
    ],
    testimonials: [
      {
        name: "Kunal Agarwal",
        rating: 5,
        review:
          "Very technical yet well-explained. Great for serious astrology students.",
      },
      {
        name: "Renu Sharma",
        rating: 4,
        review:
          "Helped me understand why certain areas of life were challenging.",
      },
      {
        name: "Praveen Nair",
        rating: 5,
        review:
          "Excellent analysis. The remedies for weak planets were very practical.",
      },
    ],
  },
  {
    id: "12",
    slug: "kp-system-report",
    title: "KP System Report",
    titleHi: "KP सिस्टम रिपोर्ट",
    category: "Planets & Nakshatra",
    price: 499,
    priceDisplay: "₹499",
    description:
      "KP (Krishnamurti Paddhati) astrology personalized reading — highly precise for timing events in career, marriage, finance, and health.",
    deliveryTime: "Within 72 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "KP chart calculation",
      "Sub-lord analysis",
      "Event timing for key life areas",
      "Significators for your query",
      "Annual dasha periods",
    ],
    faq: [
      {
        q: "Is KP astrology more accurate than Vedic?",
        a: "KP is a refinement of Vedic astrology that focuses on precise event timing using sub-lords.",
      },
    ],
    testimonials: [
      {
        name: "Anil Kumar",
        rating: 5,
        review: "The KP predictions were spot on for my marriage timing!",
      },
      {
        name: "Sunita Rao",
        rating: 5,
        review: "Very precise system. The astrologer was thorough.",
      },
      {
        name: "Girish Patel",
        rating: 4,
        review:
          "Good report. Takes a bit to understand KP but the explanations helped.",
      },
    ],
  },
  {
    id: "13",
    slug: "dasha-predictions-report",
    title: "Dasha Predictions Report",
    titleHi: "दशा भविष्यवाणी रिपोर्ट",
    category: "Planets & Nakshatra",
    price: 599,
    priceDisplay: "₹599",
    description:
      "Current and upcoming Mahadasha and Antardasha analysis. Understand what each planetary period will bring and how to navigate it successfully.",
    deliveryTime: "Within 72 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    featured: true,
    whatYouGet: [
      "Current dasha analysis",
      "Next 3 dasha periods",
      "Antardasha breakdown",
      "Opportunities and challenges per period",
      "Remedies for challenging dashas",
    ],
    faq: [
      {
        q: "What is a Mahadasha?",
        a: "Mahadasha is a major planetary period (6-20 years) that significantly influences your life direction.",
      },
    ],
    testimonials: [
      {
        name: "Harsha Reddy",
        rating: 5,
        review: "Understanding my dasha helped me make much better decisions.",
      },
      {
        name: "Padma Swamy",
        rating: 5,
        review: "The upcoming period analysis was very helpful for planning.",
      },
      {
        name: "Santosh Verma",
        rating: 5,
        review:
          "Best investment — this report guided my financial decisions for 3 years.",
      },
    ],
  },
  {
    id: "14",
    slug: "retrograde-planets-report",
    title: "Retrograde Planets Report",
    titleHi: "वक्री ग्रह रिपोर्ट",
    category: "Planets & Nakshatra",
    price: 249,
    priceDisplay: "₹249",
    description:
      "Impact of retrograde planets in your birth chart on various life areas and practical remedies to minimize challenges and maximize their hidden gifts.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Retrograde planets identified",
      "Effects on each life area",
      "Hidden gifts of retrogrades",
      "Remedies and timing",
      "Current transit retrogrades impact",
    ],
    faq: [
      {
        q: "Are retrograde planets bad?",
        a: "Not at all — retrogrades create internal depth and often grant mastery in specific areas over time.",
      },
    ],
    testimonials: [
      {
        name: "Vijay Kumar",
        rating: 4,
        review:
          "Interesting perspective on my retrograde Saturn. Made sense of lifelong patterns.",
      },
      {
        name: "Smita Ghosh",
        rating: 5,
        review: "Finally understood why relationships have been challenging!",
      },
      {
        name: "Rajan Iyer",
        rating: 5,
        review: "Very insightful. The hidden gifts section was eye-opening.",
      },
    ],
  },
  {
    id: "15",
    slug: "full-kundli-premium-report",
    title: "Full Kundli Premium Report",
    titleHi: "पूर्ण कुंडली प्रीमियम रिपोर्ट",
    category: "Planets & Nakshatra",
    price: 2149,
    priceDisplay: "₹2,149",
    description:
      "Comprehensive 50+ page analysis covering every aspect of your life — the most detailed personalized astrology report we offer.",
    deliveryTime: "Within 7 days",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    featured: true,
    whatYouGet: [
      "Complete birth chart",
      "Navamsa, Dashamsa, and other divisional charts",
      "Complete dasha analysis (10 years)",
      "Detailed remedies",
      "Life timeline predictions",
    ],
    faq: [
      {
        q: "Why does this take 7 days?",
        a: "This is a hand-crafted, deeply personalized analysis that requires extensive research and preparation.",
      },
    ],
    testimonials: [
      {
        name: "Deepa Nair",
        rating: 5,
        review:
          "Worth every rupee. This is a life document I refer to regularly.",
      },
      {
        name: "Mahesh Sharma",
        rating: 5,
        review:
          "Incredibly detailed. The astrologer clearly spent many hours on this.",
      },
      {
        name: "Lata Menon",
        rating: 5,
        review:
          "A masterpiece of astrological analysis. Highly recommend to serious seekers.",
      },
    ],
  },
  // HEALTH
  {
    id: "16",
    slug: "health-astrology-report",
    title: "Health Astrology Report",
    titleHi: "स्वास्थ्य ज्योतिष रिपोर्ट",
    category: "Health",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Planetary indicators of health vulnerabilities and constitutional strengths. Combine Ayurveda and Jyotish for holistic health guidance.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "Health-prone areas analysis",
      "Favorable and unfavorable periods",
      "Ayurvedic constitution (Prakriti)",
      "Dietary recommendations",
      "Preventive remedies",
    ],
    faq: [
      {
        q: "Is this a substitute for medical advice?",
        a: "No. This is complementary guidance. Always consult qualified medical professionals for health decisions.",
      },
    ],
    testimonials: [
      {
        name: "Nandita Roy",
        rating: 5,
        review:
          "The dietary recommendations aligned perfectly with what my doctor suggested!",
      },
      {
        name: "Srinivas Murthy",
        rating: 4,
        review:
          "Interesting astrological perspective on health. Practical suggestions.",
      },
      {
        name: "Kamla Devi",
        rating: 5,
        review:
          "Helped me understand my health patterns from a different angle.",
      },
    ],
  },
  // TIMING
  {
    id: "17",
    slug: "daily-panchang-report",
    title: "Daily Panchang Report",
    titleHi: "दैनिक पंचांग रिपोर्ट",
    category: "Timing",
    price: 39,
    priceDisplay: "₹39",
    description:
      "One month of daily panchang with Tithi, Vara, Nakshatra, Yoga, and Karana — personalized for your location.",
    deliveryTime: "Within 24 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "30 days of daily panchang",
      "Auspicious and inauspicious timings",
      "Fasting days",
      "Festival alerts",
      "Personalized for your city",
    ],
    faq: [
      {
        q: "Which city is this personalized for?",
        a: "You provide your city and we calculate Sunrise/Sunset times accordingly.",
      },
    ],
    testimonials: [
      {
        name: "Rashmi Singh",
        rating: 5,
        review:
          "So convenient! I check this every morning before starting my day.",
      },
      {
        name: "Bharat Chauhan",
        rating: 5,
        review: "Accurate timings. Very helpful for scheduling important work.",
      },
      {
        name: "Anita Jain",
        rating: 4,
        review: "Good value report. Delivered quickly.",
      },
    ],
  },
  {
    id: "18",
    slug: "weekly-forecast-report",
    title: "Weekly Forecast Report",
    titleHi: "साप्ताहिक पूर्वानुमान रिपोर्ट",
    category: "Timing",
    price: 99,
    priceDisplay: "₹99",
    description:
      "4-week planetary forecast covering career, relationships, health, and finances based on your Rashi and current transits.",
    deliveryTime: "Within 24 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "4-week weekly breakdown",
      "Day-by-day energy forecast",
      "Best days for important decisions",
      "Challenging days to be aware of",
      "Weekly mantra recommendation",
    ],
    faq: [
      {
        q: "Is this personalized to my chart?",
        a: "Yes, it uses both your Rashi and Lagna for accurate personalization.",
      },
    ],
    testimonials: [
      {
        name: "Pallavi Kulkarni",
        rating: 5,
        review:
          "I always schedule meetings on the 'green days' and it really works!",
      },
      {
        name: "Saurabh Mishra",
        rating: 4,
        review: "Good weekly overview. Helped me navigate a difficult month.",
      },
      {
        name: "Tanvi Shah",
        rating: 5,
        review: "Very accurate and detailed. Great value.",
      },
    ],
  },
  {
    id: "19",
    slug: "monthly-horoscope-report",
    title: "Monthly Horoscope Report",
    titleHi: "मासिक राशिफल रिपोर्ट",
    category: "Timing",
    price: 149,
    priceDisplay: "₹149",
    description:
      "Detailed monthly prediction for all major life areas — specific to your birth chart, not just sun sign generics.",
    deliveryTime: "Within 24 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Monthly overview",
      "Career predictions",
      "Love and relationship guidance",
      "Health alerts",
      "Financial opportunities",
    ],
    faq: [
      {
        q: "Is this different from generic monthly horoscopes?",
        a: "Yes — this is based on your specific birth chart, not general Rashi predictions.",
      },
    ],
    testimonials: [
      {
        name: "Madhuri Patil",
        rating: 5,
        review:
          "So much more accurate than the generic horoscopes I used to read!",
      },
      {
        name: "Sanjay Rawat",
        rating: 5,
        review: "Monthly planning becomes so much easier with this report.",
      },
      {
        name: "Archana Bose",
        rating: 4,
        review: "Good monthly guidance. Delivered quickly.",
      },
    ],
  },
  {
    id: "20",
    slug: "annual-horoscope-report",
    title: "Annual Horoscope Report",
    titleHi: "वार्षिक राशिफल रिपोर्ट",
    category: "Timing",
    price: 299,
    priceDisplay: "₹299",
    description:
      "Complete year ahead forecast — career, relationships, finances, health, and spiritual growth for the next 12 months.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    featured: true,
    whatYouGet: [
      "Year overview",
      "Quarter-by-quarter breakdown",
      "Major events likely in the year",
      "Opportunity windows",
      "Annual remedies plan",
    ],
    faq: [
      {
        q: "Which year is covered?",
        a: "The current Vedic year from your birthday or from January 1, as per your preference.",
      },
    ],
    testimonials: [
      {
        name: "Harish Pandey",
        rating: 5,
        review:
          "I buy this every year now. It's become part of my annual planning.",
      },
      {
        name: "Savita Desai",
        rating: 5,
        review:
          "Incredibly accurate year-ahead forecast. Helped me plan finances.",
      },
      {
        name: "Ravi Shankar",
        rating: 5,
        review: "Best annual horoscope available. Very detailed.",
      },
    ],
  },
  {
    id: "21",
    slug: "auspicious-muhurat-report",
    title: "Auspicious Muhurat Report",
    titleHi: "शुभ मुहूर्त रिपोर्ट",
    category: "Timing",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Best dates for your upcoming event — marriage, griha pravesh, business launch, travel, surgery, interview, or any important occasion.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Top 5 auspicious dates",
      "Exact timing for each date",
      "What to avoid on those days",
      "Preparatory rituals",
      "Alternative dates if primary unavailable",
    ],
    faq: [
      {
        q: "What event types can you find muhurat for?",
        a: "Marriage, Griha Pravesh, business launch, travel, buying property, surgery, or any significant event.",
      },
    ],
    testimonials: [
      {
        name: "Shalini Khanna",
        rating: 5,
        review:
          "Our wedding day chosen by this muhurat was absolutely perfect!",
      },
      {
        name: "Vinod Sharma",
        rating: 5,
        review:
          "Business launched on the suggested date and it's been thriving.",
      },
      {
        name: "Preethi Anand",
        rating: 4,
        review: "Quick report with good alternative dates. Helpful.",
      },
    ],
  },
  {
    id: "22",
    slug: "transit-impact-report",
    title: "Transit Impact Report",
    titleHi: "गोचर प्रभाव रिपोर्ट",
    category: "Timing",
    price: 249,
    priceDisplay: "₹249",
    description:
      "How current planetary transits are impacting your specific birth chart. Understand the current cosmic weather for your unique situation.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "All 9 planets transit analysis",
      "Saturn and Jupiter transit focus",
      "Next 6 months outlook",
      "Action recommendations",
      "Month-wise transit highlights",
    ],
    faq: [
      {
        q: "How often should I get this report?",
        a: "Ideally every 6 months, especially when Saturn or Jupiter changes signs.",
      },
    ],
    testimonials: [
      {
        name: "Radha Krishna",
        rating: 5,
        review:
          "The Saturn transit analysis explained so much about the past 2 years!",
      },
      {
        name: "Mukesh Verma",
        rating: 5,
        review: "Very insightful. Helped me understand a challenging period.",
      },
      {
        name: "Sheela Bhat",
        rating: 4,
        review: "Good transit analysis. Practical advice on how to navigate.",
      },
    ],
  },
  {
    id: "23",
    slug: "new-year-predictions-report",
    title: "New Year Predictions Report",
    titleHi: "नव वर्ष भविष्यवाणी रिपोर्ट",
    category: "Timing",
    price: 399,
    priceDisplay: "₹399",
    description:
      "Complete year 2026 predictions covering all life areas with specific dates for major events, opportunities, and challenges.",
    deliveryTime: "Within 72 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "2026 yearly overview",
      "Career and finance forecast",
      "Love and marriage predictions",
      "Health and wellness guide",
      "Auspicious dates for 2026",
    ],
    faq: [
      {
        q: "Is this for Vedic or Western New Year?",
        a: "We offer both Vedic (Chaitra Shukla Pratipada) and Gregorian January 1 predictions.",
      },
    ],
    testimonials: [
      {
        name: "Neeraj Joshi",
        rating: 5,
        review:
          "Ordered for 2025 and the predictions were surprisingly accurate!",
      },
      {
        name: "Kaveri Rajan",
        rating: 5,
        review: "A wonderful way to start the year with spiritual awareness.",
      },
      {
        name: "Ashwin Mehta",
        rating: 4,
        review:
          "Good comprehensive report for the year. Detailed and insightful.",
      },
    ],
  },
  // CAREER & EDUCATION
  {
    id: "24",
    slug: "career-guidance-report",
    title: "Career Guidance Report",
    titleHi: "करियर मार्गदर्शन रिपोर्ट",
    category: "Career & Education",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Career direction based on your astrological chart — ideal professions, business vs. job, favorable sectors, and timing for career changes.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "Best career sectors for you",
      "Job vs business analysis",
      "Leadership potential",
      "Ideal work environment",
      "Career change timing",
    ],
    faq: [
      {
        q: "Can astrology tell me exactly what career to choose?",
        a: "Astrology reveals your natural talents and favorable sectors. The final choice is always yours.",
      },
    ],
    testimonials: [
      {
        name: "Aryan Singh",
        rating: 5,
        review:
          "Switched to the suggested field and my career growth accelerated immediately!",
      },
      {
        name: "Preethi Kaur",
        rating: 5,
        review: "The job vs business analysis was very clear and helpful.",
      },
      {
        name: "Nikhil Rao",
        rating: 4,
        review: "Good guidance on timing for career moves.",
      },
    ],
  },
  {
    id: "25",
    slug: "education-prospects-report",
    title: "Education Prospects Report",
    titleHi: "शिक्षा संभावना रिपोर्ट",
    category: "Career & Education",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Academic and learning planets analysis. Identify your strongest subjects, ideal study methods, timing for exams, and higher education prospects.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Strongest academic subjects",
      "Ideal study methods for your chart",
      "Best periods for exams",
      "Foreign education prospects",
      "Academic challenge remedies",
    ],
    faq: [
      {
        q: "Is this useful for school students?",
        a: "Yes, this is especially helpful for students choosing subjects or streams.",
      },
    ],
    testimonials: [
      {
        name: "Anjali Mishra",
        rating: 5,
        review: "My daughter chose science as suggested and is thriving!",
      },
      {
        name: "Shubham Verma",
        rating: 5,
        review:
          "The exam timing advice was perfect. Cleared my competitive exam!",
      },
      {
        name: "Preeti Gupta",
        rating: 4,
        review: "Good analysis of academic strengths and weaknesses.",
      },
    ],
  },
  // LOVE, MARRIAGE & FAMILY
  {
    id: "26",
    slug: "love-compatibility-report",
    title: "Love Compatibility Report",
    titleHi: "प्रेम अनुकूलता रिपोर्ट",
    category: "Love & Marriage",
    price: 149,
    priceDisplay: "₹149",
    description:
      "Romantic compatibility analysis between two individuals — emotional compatibility, physical attraction, long-term potential, and challenges.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Compatibility score",
      "Emotional and mental compatibility",
      "Physical and Venus compatibility",
      "Relationship challenges",
      "Making it work guidance",
    ],
    faq: [
      {
        q: "Do both partners need to provide details?",
        a: "Yes, we need birth details for both individuals for accurate compatibility analysis.",
      },
    ],
    testimonials: [
      {
        name: "Isha Malhotra",
        rating: 5,
        review:
          "The compatibility report described our relationship dynamics perfectly!",
      },
      {
        name: "Rohit Kapoor",
        rating: 4,
        review:
          "Good analysis. The challenges section was particularly accurate.",
      },
      {
        name: "Tara Singh",
        rating: 5,
        review:
          "Got confidence to pursue the relationship after this report. No regrets!",
      },
    ],
  },
  {
    id: "27",
    slug: "marriage-timing-report",
    title: "Marriage Timing Report",
    titleHi: "विवाह समय रिपोर्ट",
    category: "Love & Marriage",
    price: 199,
    priceDisplay: "₹199",
    description:
      "When will you marry? Chart-based marriage timing analysis with specific year predictions and favorable periods for meeting your life partner.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "Marriage period analysis",
      "Most favorable years",
      "7th house and Venus analysis",
      "Obstacles and their remedies",
      "What your chart says about marriage",
    ],
    faq: [
      {
        q: "Is marriage guaranteed in the predicted period?",
        a: "Astrology shows favorable windows. Active effort and readiness are equally important.",
      },
    ],
    testimonials: [
      {
        name: "Pooja Sharma",
        rating: 5,
        review: "Got married in the exact year predicted! Incredible accuracy.",
      },
      {
        name: "Rahul Mehta",
        rating: 5,
        review:
          "The remedies for delayed marriage helped. Now happily married.",
      },
      {
        name: "Seema Gupta",
        rating: 4,
        review:
          "Detailed analysis with practical remedies for marriage obstacles.",
      },
    ],
  },
  {
    id: "28",
    slug: "kundli-matching-report",
    title: "Kundli Matching Report",
    titleHi: "कुंडली मिलान रिपोर्ट",
    category: "Love & Marriage",
    price: 129,
    priceDisplay: "₹129",
    description:
      "Gun Milan (Ashtakoot) compatibility analysis plus in-depth chart-based compatibility beyond just the score.",
    deliveryTime: "Within 24 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Ashtakoot (36-point) score",
      "Manglik analysis",
      "Individual chart compatibility",
      "Areas needing remedies",
      "Overall verdict",
    ],
    faq: [
      {
        q: "What's a good Ashtakoot score?",
        a: "18+ is considered acceptable, 24+ is good, 28+ is excellent for marriage.",
      },
    ],
    testimonials: [
      {
        name: "Sumit Agarwal",
        rating: 5,
        review:
          "The detailed analysis beyond just the score was very insightful.",
      },
      {
        name: "Priya Narayan",
        rating: 5,
        review: "Quick delivery and very accurate assessment.",
      },
      {
        name: "Vikram Singh",
        rating: 4,
        review: "Good report. The manglik analysis was particularly helpful.",
      },
    ],
  },
  {
    id: "29",
    slug: "spouse-characteristics-report",
    title: "Spouse Characteristics Report",
    titleHi: "जीवनसाथी लक्षण रिपोर्ट",
    category: "Love & Marriage",
    price: 149,
    priceDisplay: "₹149",
    description:
      "What your birth chart reveals about your future/current spouse — their physical appearance, personality, profession, and family background.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Physical description indicators",
      "Personality and nature",
      "Likely profession/background",
      "From which direction to find partner",
      "When they will come into your life",
    ],
    faq: [
      {
        q: "How accurate are spouse characteristics predictions?",
        a: "These are based on 7th house lord, Venus, and Navamsa analysis — generally quite accurate for major traits.",
      },
    ],
    testimonials: [
      {
        name: "Kiran Rao",
        rating: 5,
        review: "The physical description matched my partner almost exactly!",
      },
      {
        name: "Suresh Iyer",
        rating: 4,
        review: "Very interesting. The profession indicator was accurate.",
      },
      {
        name: "Meena Pillai",
        rating: 5,
        review: "Incredible accuracy on the personality description!",
      },
    ],
  },
  {
    id: "30",
    slug: "manglik-dosha-report",
    title: "Manglik Dosha Report",
    titleHi: "मांगलिक दोष रिपोर्ट",
    category: "Love & Marriage",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Mangal Dosha analysis and remedies — understand if you have Manglik Dosha, its severity, and effective remedies for harmonious marriage.",
    deliveryTime: "Within 24 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Manglik status determination",
      "Severity analysis",
      "Cancellation factors check",
      "Compatibility with non-Manglik partners",
      "Effective remedies",
    ],
    faq: [
      {
        q: "Is Manglik Dosha really that serious?",
        a: "It varies greatly by severity. Most cases have cancellation factors that reduce or eliminate the dosha.",
      },
    ],
    testimonials: [
      {
        name: "Ritu Singh",
        rating: 5,
        review:
          "Very relieved to know my Manglik dosha is cancelled. Report was thorough.",
      },
      {
        name: "Pratap Sharma",
        rating: 5,
        review: "The remedies worked. Happily married for 3 years now!",
      },
      {
        name: "Deepa Menon",
        rating: 4,
        review: "Good detailed analysis. Put to rest many worries.",
      },
    ],
  },
  {
    id: "31",
    slug: "family-harmony-report",
    title: "Family Harmony Report",
    titleHi: "पारिवारिक सौहार्द रिपोर्ट",
    category: "Love & Marriage",
    price: 299,
    priceDisplay: "₹299",
    description:
      "Family dynamics from your birth chart — relationship with parents, siblings, in-laws, and children. Understand recurring patterns and how to heal them.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Parent relationship analysis",
      "Sibling dynamics",
      "In-law relationship indicators",
      "Children prospects",
      "Ancestral karma and remedies",
    ],
    faq: [
      {
        q: "Can this help with family conflict?",
        a: "Yes, understanding the astrological roots of conflict patterns often helps in addressing them.",
      },
    ],
    testimonials: [
      {
        name: "Nalini Sharma",
        rating: 5,
        review:
          "The analysis of my relationship with my mother was incredibly accurate!",
      },
      {
        name: "Hemant Joshi",
        rating: 4,
        review: "Very insightful report on family dynamics.",
      },
      {
        name: "Usha Bhat",
        rating: 5,
        review:
          "The ancestral karma section was eye-opening. Helped resolve old patterns.",
      },
    ],
  },
  // MONEY & LUCK
  {
    id: "32",
    slug: "wealth-yoga-report",
    title: "Wealth Yoga Report",
    titleHi: "धन योग रिपोर्ट",
    category: "Money & Luck",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Dhana Yogas (wealth combinations) in your birth chart — what your chart says about your wealth potential and how to activate these yogas.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "All Dhana yogas identified",
      "Strength of each yoga",
      "When yogas will activate",
      "How to maximize wealth potential",
      "Remedies for financial blockers",
    ],
    faq: [
      {
        q: "What are Dhana Yogas?",
        a: "Dhana Yogas are planetary combinations in your chart that indicate potential for wealth creation.",
      },
    ],
    testimonials: [
      {
        name: "Arun Kumar",
        rating: 5,
        review:
          "The wealth yoga analysis helped me understand why business took off at 32!",
      },
      {
        name: "Sonal Jain",
        rating: 5,
        review:
          "Very encouraging report. The activation timing for my yogas was spot on.",
      },
      {
        name: "Vinay Sharma",
        rating: 4,
        review: "Good analysis of wealth potential and obstacles.",
      },
    ],
  },
  {
    id: "33",
    slug: "lucky-number-color-report",
    title: "Lucky Number & Color Report",
    titleHi: "शुभ संख्या और रंग रिपोर्ट",
    category: "Money & Luck",
    price: 129,
    priceDisplay: "₹129",
    description:
      "Your numerologically and astrologically determined lucky numbers, colors, days, directions, and metals for maximizing positive energy.",
    deliveryTime: "Within 24 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: false,
    whatYouGet: [
      "Lucky numbers (primary + secondary)",
      "Power colors for you",
      "Lucky days of the week",
      "Favorable directions",
      "Lucky metals and gemstones",
    ],
    faq: [
      {
        q: "How should I use lucky numbers?",
        a: "Use them for important dates, addresses, phone numbers, vehicle numbers, and any significant decisions.",
      },
    ],
    testimonials: [
      {
        name: "Sumitra Devi",
        rating: 5,
        review:
          "Started wearing my lucky color to interviews and got placed immediately!",
      },
      {
        name: "Kartik Soni",
        rating: 5,
        review:
          "Simple but effective. My lucky number keeps showing up in positive situations.",
      },
      {
        name: "Rekha Trivedi",
        rating: 4,
        review: "Fun and useful report. Practical and easy to apply.",
      },
    ],
  },
  {
    id: "34",
    slug: "financial-forecast-report",
    title: "Financial Forecast Report",
    titleHi: "वित्तीय पूर्वानुमान रिपोर्ट",
    category: "Money & Luck",
    price: 199,
    priceDisplay: "₹199",
    description:
      "Money prospects for the year ahead — income, savings, investment opportunities, financial risks, and best months for financial decisions.",
    deliveryTime: "Within 48 hours",
    deliveryMethod: "WhatsApp + Email",
    sampleIncluded: true,
    whatYouGet: [
      "Annual financial overview",
      "Month-wise income forecast",
      "Investment timing",
      "Risk periods to avoid",
      "Remedies for financial growth",
    ],
    faq: [
      {
        q: "Can this predict exact amounts?",
        a: "Astrology predicts favorable or challenging periods, not exact amounts. Think of it as a weather forecast for your finances.",
      },
    ],
    testimonials: [
      {
        name: "Mohan Rao",
        rating: 5,
        review:
          "The investment timing advice helped me make a great return on stock market!",
      },
      {
        name: "Shilpa Joshi",
        rating: 5,
        review:
          "The risk period warnings saved me from a bad investment decision.",
      },
      {
        name: "Shalendra Singh",
        rating: 4,
        review: "Good financial forecast. The remedies were practical.",
      },
    ],
  },
];

export const reportCategories = [
  "All",
  "Remedies & Vastu",
  "Planets & Nakshatra",
  "Health",
  "Timing",
  "Career & Education",
  "Love & Marriage",
  "Money & Luck",
];
