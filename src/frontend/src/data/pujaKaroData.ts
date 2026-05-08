// PoojaKaro — Unified Puja Services Data

export interface SankalpaSevaCard {
  id: string;
  templeName: string;
  templeNameHindi: string;
  deity: string;
  deityHindi: string;
  location: string;
  price: number;
  benefits: string[];
  benefitsHindi: string[];
  priests: number;
  duration: string;
}

export interface ChadhavaCard {
  id: string;
  offeringType: string;
  offeringTypeHindi: string;
  temple: string;
  templeHindi: string;
  significance: string;
  significanceHindi: string;
  price: number;
  items: string[];
}

export interface HomePujaCard {
  id: string;
  pujaName: string;
  pujaNameHindi: string;
  duration: string;
  priests: number;
  price: number;
  features: string[];
  featuresHindi: string[];
}

export interface PujaItem {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  emoji: string;
  description: string;
}

export interface FlowerMalaProduct {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  type: "fresh" | "dry" | "subscription";
  description: string;
  descriptionHindi: string;
}

export interface PriestProfile {
  id: string;
  name: string;
  experience: string;
  specialization: string;
  rating: number;
  reviews: number;
  imageEmoji: string;
}

export const sankalpaSevas: SankalpaSevaCard[] = [
  {
    id: "PK001",
    templeName: "Kashi Vishwanath Temple",
    templeNameHindi: "काशी विश्वनाथ मंदिर",
    deity: "Lord Shiva",
    deityHindi: "भगवान शिव",
    location: "Varanasi, Uttar Pradesh",
    price: 2100,
    benefits: [
      "Moksha & liberation",
      "Health & longevity",
      "Relief from grief",
      "Spiritual awakening",
    ],
    benefitsHindi: [
      "मोक्ष और मुक्ति",
      "स्वास्थ्य और दीर्घायु",
      "दुख से राहत",
      "आध्यात्मिक जागृति",
    ],
    priests: 2,
    duration: "45 minutes",
  },
  {
    id: "PK002",
    templeName: "Tirupati Balaji Temple",
    templeNameHindi: "तिरुपति बालाजी मंदिर",
    deity: "Lord Venkateswara",
    deityHindi: "भगवान वेंकटेश्वर",
    location: "Tirupati, Andhra Pradesh",
    price: 2501,
    benefits: [
      "Wealth & prosperity",
      "Fulfillment of wishes",
      "Removal of debts",
      "Career success",
    ],
    benefitsHindi: ["धन और समृद्धि", "इच्छाओं की पूर्ति", "ऋण मुक्ति", "करियर सफलता"],
    priests: 3,
    duration: "60 minutes",
  },
  {
    id: "PK003",
    templeName: "Siddhivinayak Temple",
    templeNameHindi: "सिद्धिविनायक मंदिर",
    deity: "Lord Ganesha",
    deityHindi: "भगवान गणेश",
    location: "Mumbai, Maharashtra",
    price: 1801,
    benefits: [
      "Remove obstacles",
      "New beginnings",
      "Business success",
      "Education blessing",
    ],
    benefitsHindi: ["बाधाएं दूर", "नई शुरुआत", "व्यापार सफलता", "शिक्षा में आशीर्वाद"],
    priests: 2,
    duration: "30 minutes",
  },
  {
    id: "PK004",
    templeName: "Vaishno Devi Temple",
    templeNameHindi: "वैष्णो देवी मंदिर",
    deity: "Mata Vaishno Devi",
    deityHindi: "माता वैष्णो देवी",
    location: "Katra, Jammu & Kashmir",
    price: 2100,
    benefits: [
      "Protection & safety",
      "Family harmony",
      "Health & wellness",
      "Divine blessings",
    ],
    benefitsHindi: ["सुरक्षा", "पारिवारिक सौहार्द", "स्वास्थ्य", "दिव्य आशीर्वाद"],
    priests: 3,
    duration: "45 minutes",
  },
];

export const chadhavaSevas: ChadhavaCard[] = [
  {
    id: "PK-CH001",
    offeringType: "Phool Mala Chadhava",
    offeringTypeHindi: "फूल माला चढ़ावा",
    temple: "Kashi Vishwanath",
    templeHindi: "काशी विश्वनाथ",
    significance:
      "Fresh marigold garlands offered to Lord Shiva with full devotion and Vedic mantras.",
    significanceHindi:
      "पूर्ण भक्ति और वैदिक मंत्रों के साथ भगवान शिव को ताजे गेंदे के फूल की माला",
    price: 501,
    items: [
      "Fresh marigold mala",
      "Bel leaves",
      "Dhatura flowers",
      "Vibhuti prasad",
    ],
  },
  {
    id: "PK-CH002",
    offeringType: "Dry Fruit Prasad",
    offeringTypeHindi: "ड्राई फ्रूट प्रसाद",
    temple: "Tirupati Balaji",
    templeHindi: "तिरुपति बालाजी",
    significance:
      "Premium dry fruit box as chadhava for Lord Venkateswara. Blessed and returned as prasad.",
    significanceHindi:
      "प्रीमियम ड्राई फ्रूट बॉक्स भगवान वेंकटेश्वर को समर्पित, प्रसाद के रूप में वापस",
    price: 751,
    items: ["Dry fruit box 500g", "Coconut", "Camphor", "Ladoo prasad"],
  },
  {
    id: "PK-CH003",
    offeringType: "Modak Chadhava",
    offeringTypeHindi: "मोदक चढ़ावा",
    temple: "Siddhivinayak",
    templeHindi: "सिद्धिविनायक",
    significance:
      "21 modaks offered to Lord Ganesha — his favourite sweet. Fulfills all heartfelt desires.",
    significanceHindi:
      "भगवान गणेश को 21 मोदक अर्पित — उनकी पसंदीदा मिठाई। सभी मनोकामनाएं पूरी होती हैं",
    price: 1001,
    items: ["21 modak", "Durva grass", "Red flowers", "Sindoor prasad"],
  },
  {
    id: "PK-CH004",
    offeringType: "Chunri & Shringar",
    offeringTypeHindi: "चुनरी और श्रृंगार",
    temple: "Vaishno Devi",
    templeHindi: "वैष्णो देवी",
    significance:
      "Sacred red chunri and full shringar offerings to Mata Vaishno Devi for divine blessings.",
    significanceHindi: "माता वैष्णो देवी को पवित्र लाल चुनरी और पूर्ण श्रृंगार",
    price: 1101,
    items: ["Red chunri", "Shringar box", "Coconut", "Prasad distribution"],
  },
];

export const homePujas: HomePujaCard[] = [
  {
    id: "PK-HP001",
    pujaName: "Satyanarayan Puja",
    pujaNameHindi: "सत्यनारायण पूजा",
    duration: "2-3 hours",
    priests: 2,
    price: 5100,
    features: [
      "All puja samagri included",
      "Panchamrit abhishek",
      "Katha recitation",
      "Prasad distribution",
    ],
    featuresHindi: [
      "सभी पूजा सामग्री शामिल",
      "पंचामृत अभिषेक",
      "कथा वाचन",
      "प्रसाद वितरण",
    ],
  },
  {
    id: "PK-HP002",
    pujaName: "Griha Pravesh Puja",
    pujaNameHindi: "गृह प्रवेश पूजा",
    duration: "3-4 hours",
    priests: 3,
    price: 8100,
    features: [
      "Vastu shanti ritual",
      "Havan kund",
      "Navagraha puja",
      "All materials included",
    ],
    featuresHindi: [
      "वास्तु शांति विधि",
      "हवन कुंड",
      "नवग्रह पूजा",
      "सभी सामग्री शामिल",
    ],
  },
  {
    id: "PK-HP003",
    pujaName: "Ganesh Puja for Business",
    pujaNameHindi: "व्यापार गणेश पूजा",
    duration: "1.5-2 hours",
    priests: 1,
    price: 3100,
    features: [
      "Ganesh sthapana",
      "21 modak offering",
      "Durva grass ritual",
      "Prosperity yantra included",
    ],
    featuresHindi: [
      "गणेश स्थापना",
      "21 मोदक अर्पण",
      "दूर्वा अर्पण",
      "समृद्धि यंत्र शामिल",
    ],
  },
  {
    id: "PK-HP004",
    pujaName: "Navgraha Shanti Puja",
    pujaNameHindi: "नवग्रह शांति पूजा",
    duration: "2-3 hours",
    priests: 2,
    price: 6100,
    features: [
      "All 9 graha worship",
      "Graha yantra",
      "Vedic mantra recitation",
      "Gem recommendation",
    ],
    featuresHindi: [
      "सभी 9 ग्रहों की पूजा",
      "ग्रह यंत्र",
      "वैदिक मंत्र पाठ",
      "रत्न अनुशंसा",
    ],
  },
];

export const bookingWorkflowSteps = [
  {
    step: 1,
    icon: "📞",
    title: "Contact Us",
    titleHindi: "संपर्क करें",
    desc: "Call or WhatsApp us with your puja requirement.",
  },
  {
    step: 2,
    icon: "📝",
    title: "Form Filling",
    titleHindi: "फ़ॉर्म भरें",
    desc: "Fill the Sankalp form with your name, gotra, and date/time.",
  },
  {
    step: 3,
    icon: "🧘",
    title: "Priest Assignment",
    titleHindi: "पुजारी नियुक्ति",
    desc: "Experienced priest assigned based on puja type and date.",
  },
  {
    step: 4,
    icon: "🔥",
    title: "Ritual Completion",
    titleHindi: "पूजा संपन्न",
    desc: "Puja performed as per Vedic rituals with your Sankalp.",
  },
  {
    step: 5,
    icon: "📹",
    title: "Video Darshan",
    titleHindi: "वीडियो दर्शन",
    desc: "Live or recorded video of your puja sent via WhatsApp.",
  },
  {
    step: 6,
    icon: "🙏",
    title: "Gratitude",
    titleHindi: "आभार",
    desc: "Prasad dispatched to your address. Blessings received!",
  },
];

export const priests: PriestProfile[] = [
  {
    id: "PR001",
    name: "Pandit Ravi Sharma",
    experience: "25 years",
    specialization: "Vedic Rituals & Kashi Vishwanath Puja",
    rating: 4.9,
    reviews: 567,
    imageEmoji: "🧙",
  },
  {
    id: "PR002",
    name: "Pandit Venkatesh Iyer",
    experience: "20 years",
    specialization: "South Indian Agama rituals & Tirupati Seva",
    rating: 4.8,
    reviews: 423,
    imageEmoji: "🕉️",
  },
  {
    id: "PR003",
    name: "Pandit Suresh Joshi",
    experience: "18 years",
    specialization: "Ganesh Puja & Griha Pravesh ceremonies",
    rating: 4.7,
    reviews: 312,
    imageEmoji: "📿",
  },
  {
    id: "PR004",
    name: "Pandit Ramesh Tripathi",
    experience: "30 years",
    specialization: "Navgraha Shanti & Vastu rituals",
    rating: 4.9,
    reviews: 678,
    imageEmoji: "🌙",
  },
  {
    id: "PR005",
    name: "Pandit Ashish Mishra",
    experience: "15 years",
    specialization: "Home puja & Satyanarayan Katha",
    rating: 4.6,
    reviews: 234,
    imageEmoji: "✨",
  },
  {
    id: "PR006",
    name: "Pandit Narayana Murthy",
    experience: "22 years",
    specialization: "Vaishno Devi puja & Devi worship",
    rating: 4.8,
    reviews: 345,
    imageEmoji: "🙏",
  },
];

export const chiefAdvisor = {
  name: "Acharya Vikas Gupta",
  nameHindi: "आचार्य विकास गुप्त",
  experience: "35+ years",
  qualification: "Kashi Vidyapith Graduate, Jyotish Visharad",
  specialization: "Vedic Astrology, Vastu Shastra, Temple Rituals",
  quote:
    "Every puja performed with devotion brings divine blessings closer to you.",
  quoteHindi: "भक्ति के साथ की गई हर पूजा आपके पास ईश्वरीय आशीर्वाद लाती है।",
};

export const pujaItems: PujaItem[] = [
  {
    id: "PI001",
    name: "Hawan Samagri (500g)",
    nameHindi: "हवन सामग्री (500 ग्राम)",
    price: 149,
    emoji: "🌿",
    description: "Pure herbal hawan samagri for all rituals.",
  },
  {
    id: "PI002",
    name: "Diyas (Pack of 12)",
    nameHindi: "दीपक (12 का पैक)",
    price: 99,
    emoji: "🪔",
    description: "Handcrafted clay diyas for aarti and puja.",
  },
  {
    id: "PI003",
    name: "Jau (Barley) 500g",
    nameHindi: "जौ 500 ग्राम",
    price: 79,
    emoji: "🌾",
    description: "Pure barley grains for havan offering.",
  },
  {
    id: "PI004",
    name: "Supari (Betel Nut)",
    nameHindi: "सुपारी",
    price: 59,
    emoji: "🤎",
    description: "Sacred betel nuts for puja rituals.",
  },
  {
    id: "PI005",
    name: "Brass Ghanti (Bell)",
    nameHindi: "पीतल घंटी",
    price: 299,
    emoji: "🔔",
    description: "Pure brass temple bell. Melodious sound.",
  },
  {
    id: "PI006",
    name: "Rakhi — Om Design",
    nameHindi: "राखी — ओम डिजाइन",
    price: 99,
    emoji: "🧡",
    description: "Sacred Om design Rakhi with Roli Chawal.",
  },
  {
    id: "PI007",
    name: "Rakhi — Ganesh Design",
    nameHindi: "राखी — गणेश डिजाइन",
    price: 119,
    emoji: "🐘",
    description: "Lord Ganesha Rakhi with blessings.",
  },
  {
    id: "PI008",
    name: "Rakhi — Rudraksha",
    nameHindi: "राखी — रुद्राक्ष",
    price: 149,
    emoji: "📿",
    description: "Rudraksha bead Rakhi. Protective and sacred.",
  },
  {
    id: "PI009",
    name: "Rakhi — Mauli Thread",
    nameHindi: "राखी — मौली धागा",
    price: 49,
    emoji: "🔴",
    description: "Traditional Mauli Rakhi with blessings.",
  },
  {
    id: "PI010",
    name: "Rakhi — Crystal Set (3)",
    nameHindi: "राखी — क्रिस्टल सेट (3)",
    price: 199,
    emoji: "💎",
    description: "3 crystal stone Rakhis. Gift set.",
  },
  {
    id: "PI011",
    name: "Rakhi — Rose Gold",
    nameHindi: "राखी — रोज़ गोल्ड",
    price: 169,
    emoji: "🌹",
    description: "Elegant rose gold plated Rakhi.",
  },
  {
    id: "PI012",
    name: "Rakhi — Kids Design",
    nameHindi: "राखी — बच्चों की",
    price: 89,
    emoji: "🌟",
    description: "Fun cartoon Rakhi for little brothers.",
  },
  {
    id: "PI013",
    name: "Camphor (Kapur) 100g",
    nameHindi: "कपूर 100 ग्राम",
    price: 69,
    emoji: "🕯️",
    description: "Pure camphor for aarti and purification.",
  },
];

export const flowerMalaProducts: FlowerMalaProduct[] = [
  {
    id: "FM001",
    name: "Fresh Rose Garland",
    nameHindi: "ताज़ा गुलाब माला",
    price: 151,
    type: "fresh",
    description: "Fresh red roses garland. Available daily morning.",
    descriptionHindi: "ताज़ा लाल गुलाब की माला। हर सुबह उपलब्ध।",
  },
  {
    id: "FM002",
    name: "Marigold Mala (Jai Mala)",
    nameHindi: "गेंदे की माला (जयमाला)",
    price: 101,
    type: "fresh",
    description: "Traditional marigold garland for puja.",
    descriptionHindi: "पूजा के लिए पारंपरिक गेंदे की माला",
  },
  {
    id: "FM003",
    name: "Lotus Flower Offering",
    nameHindi: "कमल फूल अर्पण",
    price: 251,
    type: "fresh",
    description: "Sacred lotus flowers for Lakshmi puja.",
    descriptionHindi: "लक्ष्मी पूजा के लिए पवित्र कमल",
  },
  {
    id: "FM004",
    name: "Dry Harsingar Flowers",
    nameHindi: "सूखे हरसिंगार फूल",
    price: 99,
    type: "dry",
    description: "Dried Parijat/Harsingar for Vishnu puja.",
    descriptionHindi: "विष्णु पूजा के लिए सूखे परिजात",
  },
  {
    id: "FM005",
    name: "Dry Gulab Petals",
    nameHindi: "सूखी गुलाब पंखुड़ियां",
    price: 79,
    type: "dry",
    description: "Dried rose petals for decorating puja thali.",
    descriptionHindi: "पूजा थाली सजावट के लिए सूखी पंखुड़ियां",
  },
  {
    id: "FM006",
    name: "Dry Kamal Kesar",
    nameHindi: "सूखा कमल केसर",
    price: 149,
    type: "dry",
    description: "Lotus seed head for auspicious rituals.",
    descriptionHindi: "शुभ अनुष्ठानों के लिए कमल के बीज",
  },
  {
    id: "FM007",
    name: "Daily Puja Flower Kit",
    nameHindi: "दैनिक पूजा फूल किट",
    price: 199,
    type: "fresh",
    description: "Mixed fresh flowers for daily home puja.",
    descriptionHindi: "दैनिक घर पूजा के लिए मिश्रित ताज़े फूल",
  },
  {
    id: "FM008",
    name: "Bel Patra Bundle",
    nameHindi: "बेल पत्र बंडल",
    price: 51,
    type: "fresh",
    description: "Fresh Bel leaves (30 pcs) for Shiva puja.",
    descriptionHindi: "शिव पूजा के लिए ताज़े बेल पत्ते (30 नग)",
  },
  {
    id: "FM009",
    name: "Durva Grass Bundle",
    nameHindi: "दूर्वा घास बंडल",
    price: 41,
    type: "fresh",
    description: "Fresh Durva grass (21 bunches) for Ganesh puja.",
    descriptionHindi: "गणेश पूजा के लिए ताज़ा दूर्वा (21 गुच्छे)",
  },
  {
    id: "FM010",
    name: "Tulsi Leaves Pack",
    nameHindi: "तुलसी पत्ती पैक",
    price: 61,
    type: "fresh",
    description: "Fresh Tulsi leaves (108 pcs) for Vishnu puja.",
    descriptionHindi: "विष्णु पूजा के लिए ताज़ी तुलसी (108 नग)",
  },
];

export const subscriptionPackages = [
  {
    id: "SUB001",
    name: "Weekly Puja Kit",
    nameHindi: "साप्ताहिक पूजा किट",
    price: 399,
    period: "per week",
    items: ["Fresh flowers", "Incense sticks", "Camphor", "Bel Patra"],
    popular: false,
  },
  {
    id: "SUB002",
    name: "Monthly Devotion Pack",
    nameHindi: "मासिक भक्ति पैक",
    price: 1299,
    period: "per month",
    items: [
      "Daily flower kit (30 days)",
      "Hawan samagri",
      "Puja items",
      "Seasonal specials",
    ],
    popular: true,
  },
  {
    id: "SUB003",
    name: "Festive Season Pack",
    nameHindi: "त्योहार सीजन पैक",
    price: 2499,
    period: "per quarter",
    items: [
      "Festival-specific flowers",
      "Special offerings",
      "Priority delivery",
      "WhatsApp reminders",
    ],
    popular: false,
  },
];
