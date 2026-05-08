// Dhwani Astro — Brand Landing Page Data

export interface DhwaniAstroCollection {
  id: string;
  name: string;
  nameHindi: string;
  emoji: string;
  count: number;
  categoryParam: string;
  description: string;
  descriptionHindi: string;
  color: string;
}

export interface DhwaniFeaturedProduct {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  badge?: string;
  emoji: string;
  category: string;
}

export interface DhwaniTestimonial {
  id: string;
  name: string;
  rating: number;
  date: string;
  product: string;
  review: string;
  city: string;
}

export const dhwaniAstroCollections: DhwaniAstroCollection[] = [
  {
    id: "stones",
    name: "Stone Coins & Zodiac",
    nameHindi: "पत्थर सिक्के और राशि",
    emoji: "🪨",
    count: 30,
    categoryParam: "stones-tumbles",
    description: "Zodiac coins and stone pendants for daily wear",
    descriptionHindi: "राशि सिक्के और स्टोन पेंडेंट",
    color: "from-amber-50 to-stone-50",
  },
  {
    id: "stickers",
    name: "Mobile/Laptop Stickers",
    nameHindi: "मोबाइल/लैपटॉप स्टिकर",
    emoji: "📱",
    count: 18,
    categoryParam: "stickers",
    description: "Crystal energy stickers for your devices",
    descriptionHindi: "डिवाइस के लिए क्रिस्टल स्टिकर",
    color: "from-blue-50 to-indigo-50",
  },
  {
    id: "tumbles",
    name: "Stones & Tumbles",
    nameHindi: "पत्थर और टम्बल्स",
    emoji: "💎",
    count: 9,
    categoryParam: "stones-tumbles",
    description: "Raw and tumbled healing crystals",
    descriptionHindi: "कच्चे और पॉलिश हीलिंग क्रिस्टल",
    color: "from-purple-50 to-pink-50",
  },
  {
    id: "towers",
    name: "Crystal Towers",
    nameHindi: "क्रिस्टल टावर",
    emoji: "🗼",
    count: 2,
    categoryParam: "towers",
    description: "Education and 7 Chakra crystal towers",
    descriptionHindi: "शिक्षा और 7 चक्र क्रिस्टल टावर",
    color: "from-teal-50 to-green-50",
  },
  {
    id: "candles",
    name: "Crystal Candles",
    nameHindi: "क्रिस्टल मोमबत्ती",
    emoji: "🕯️",
    count: 8,
    categoryParam: "candles",
    description: "Rose Quartz tealight stands and candle holders",
    descriptionHindi: "रोज़ क्वार्ट्ज़ टीलाइट स्टैंड",
    color: "from-rose-50 to-red-50",
  },
  {
    id: "trees",
    name: "Crystal Trees",
    nameHindi: "क्रिस्टल वृक्ष",
    emoji: "🌳",
    count: 21,
    categoryParam: "trees",
    description: "Crystal and brass feng shui trees",
    descriptionHindi: "क्रिस्टल और पीतल फेंगशुई वृक्ष",
    color: "from-emerald-50 to-green-50",
  },
  {
    id: "turtles",
    name: "Crystal Turtles",
    nameHindi: "क्रिस्टल कछुआ",
    emoji: "🐢",
    count: 9,
    categoryParam: "turtles",
    description: "Vastu feng shui turtles for protection",
    descriptionHindi: "वास्तु फेंगशुई कछुए",
    color: "from-green-50 to-lime-50",
  },
  {
    id: "turquoise",
    name: "Turquoise Collection",
    nameHindi: "फ़िरोज़ा संग्रह",
    emoji: "🩵",
    count: 30,
    categoryParam: "turquoise",
    description: "Genuine turquoise jewellery and decor",
    descriptionHindi: "असली फ़िरोज़ा आभूषण और सजावट",
    color: "from-cyan-50 to-blue-50",
  },
  {
    id: "vastu",
    name: "Vastu Products",
    nameHindi: "वास्तु उत्पाद",
    emoji: "🏠",
    count: 108,
    categoryParam: "vastu",
    description: "108 vastu products for home harmony",
    descriptionHindi: "घर के लिए 108 वास्तु उत्पाद",
    color: "from-yellow-50 to-amber-50",
  },
  {
    id: "kamdhenu",
    name: "Kamdhenu Cow",
    nameHindi: "कामधेनु गाय",
    emoji: "🐄",
    count: 5,
    categoryParam: "kamdhenu",
    description: "Divine wish-fulfilling cow idols",
    descriptionHindi: "दिव्य कामधेनु गाय प्रतिमाएं",
    color: "from-orange-50 to-yellow-50",
  },
  {
    id: "elephant",
    name: "Lucky Elephant",
    nameHindi: "भाग्यशाली हाथी",
    emoji: "🐘",
    count: 6,
    categoryParam: "elephant",
    description: "Feng shui elephants for luck and strength",
    descriptionHindi: "भाग्य और शक्ति के लिए फेंगशुई हाथी",
    color: "from-gray-50 to-slate-50",
  },
  {
    id: "yantras",
    name: "Sacred Yantras",
    nameHindi: "पवित्र यंत्र",
    emoji: "✨",
    count: 41,
    categoryParam: "yantras",
    description: "Energized yantras for all purposes",
    descriptionHindi: "सभी उद्देश्यों के लिए ऊर्जावान यंत्र",
    color: "from-gold-50 to-amber-50",
  },
];

export const dhwaniFeaturedProducts: DhwaniFeaturedProduct[] = [
  {
    id: "DA-ST001",
    name: "Aries Zodiac Stone Coin",
    nameHindi: "मेष राशि स्टोन सिक्का",
    price: 299,
    mrp: 449,
    rating: 4.7,
    reviews: 234,
    badge: "Best Seller",
    emoji: "♈",
    category: "Stone",
  },
  {
    id: "DA-TR001",
    name: "Rose Quartz Crystal Tree",
    nameHindi: "रोज़ क्वार्ट्ज़ क्रिस्टल वृक्ष",
    price: 699,
    mrp: 999,
    rating: 4.8,
    reviews: 312,
    badge: "Trending",
    emoji: "🌸",
    category: "Tree",
  },
  {
    id: "DA-TT001",
    name: "Green Jade Feng Shui Turtle",
    nameHindi: "हरा जेड फेंगशुई कछुआ",
    price: 499,
    mrp: 749,
    rating: 4.6,
    reviews: 167,
    emoji: "🐢",
    category: "Turtle",
  },
  {
    id: "DA-TQ001",
    name: "Natural Turquoise Bracelet",
    nameHindi: "प्राकृतिक फ़िरोज़ा कड़ा",
    price: 799,
    mrp: 1199,
    rating: 4.7,
    reviews: 198,
    badge: "New",
    emoji: "🩵",
    category: "Turquoise",
  },
  {
    id: "DA-VP001",
    name: "Vastu Pyramid Set",
    nameHindi: "वास्तु पिरामिड सेट",
    price: 599,
    mrp: 899,
    rating: 4.5,
    reviews: 145,
    emoji: "🔺",
    category: "Vastu",
  },
  {
    id: "DA-YN001",
    name: "Shree Yantra — Gold Plated",
    nameHindi: "श्री यंत्र — गोल्ड प्लेटेड",
    price: 1499,
    mrp: 2299,
    rating: 4.9,
    reviews: 456,
    badge: "Sacred",
    emoji: "✨",
    category: "Yantra",
  },
  {
    id: "DA-CN001",
    name: "Rose Quartz Tealight Candle Stand",
    nameHindi: "रोज़ क्वार्ट्ज़ टीलाइट स्टैंड",
    price: 399,
    mrp: 599,
    rating: 4.6,
    reviews: 289,
    emoji: "🕯️",
    category: "Candle",
  },
  {
    id: "DA-TU001",
    name: "Amethyst Tumble Stone",
    nameHindi: "अमेथिस्ट टम्बल पत्थर",
    price: 199,
    mrp: 299,
    rating: 4.5,
    reviews: 223,
    emoji: "💜",
    category: "Tumble",
  },
  {
    id: "DA-SK001",
    name: "Om Crystal Energy Sticker",
    nameHindi: "ओम क्रिस्टल एनर्जी स्टिकर",
    price: 149,
    mrp: 229,
    rating: 4.3,
    reviews: 178,
    emoji: "📱",
    category: "Sticker",
  },
  {
    id: "DA-TW001",
    name: "7 Chakra Bonded Tower",
    nameHindi: "7 चक्र बॉन्डेड टावर",
    price: 899,
    mrp: 1349,
    rating: 4.8,
    reviews: 134,
    badge: "New",
    emoji: "🗼",
    category: "Tower",
  },
  {
    id: "DA-KC001",
    name: "Kamdhenu Cow — Crystal",
    nameHindi: "कामधेनु गाय — क्रिस्टल",
    price: 1299,
    mrp: 1999,
    rating: 4.7,
    reviews: 89,
    emoji: "🐄",
    category: "Kamdhenu",
  },
  {
    id: "DA-EL001",
    name: "White Jade Lucky Elephant",
    nameHindi: "सफेद जेड भाग्यशाली हाथी",
    price: 749,
    mrp: 1099,
    rating: 4.6,
    reviews: 112,
    emoji: "🐘",
    category: "Elephant",
  },
  {
    id: "DA-ST015",
    name: "7 Chakra Zodiac Coin Set",
    nameHindi: "7 चक्र राशि सिक्का सेट",
    price: 999,
    mrp: 1499,
    rating: 4.7,
    reviews: 234,
    badge: "Combo",
    emoji: "🌈",
    category: "Stone",
  },
  {
    id: "DA-TR010",
    name: "Amethyst Crystal Money Tree",
    nameHindi: "अमेथिस्ट क्रिस्टल मनी ट्री",
    price: 849,
    mrp: 1299,
    rating: 4.8,
    reviews: 167,
    emoji: "💜",
    category: "Tree",
  },
  {
    id: "DA-VP050",
    name: "Vastu Tortoise with Plate",
    nameHindi: "वास्तु कछुआ प्लेट के साथ",
    price: 699,
    mrp: 1099,
    rating: 4.5,
    reviews: 145,
    emoji: "🐢",
    category: "Vastu",
  },
];

export const dhwaniTestimonials: DhwaniTestimonial[] = [
  {
    id: "DT001",
    name: "Sunita Agrawal",
    rating: 5,
    date: "12 Apr 2026",
    product: "Shree Yantra Gold",
    review:
      "Absolutely divine! The Shree Yantra has transformed the energy of my home. Business improved within a month!",
    city: "Jaipur",
  },
  {
    id: "DT002",
    name: "Manoj Sharma",
    rating: 5,
    date: "03 May 2026",
    product: "7 Chakra Tree",
    review:
      "Beautiful crystal tree. Feel a positive vibration whenever I sit near it. Dhwani Astro products are genuine!",
    city: "Delhi",
  },
  {
    id: "DT003",
    name: "Priya Verma",
    rating: 4,
    date: "28 Apr 2026",
    product: "Turquoise Bracelet",
    review:
      "Very nice quality turquoise. The stone feels genuine and the bracelet is well made. Fast delivery too!",
    city: "Mumbai",
  },
  {
    id: "DT004",
    name: "Rajesh Patel",
    rating: 5,
    date: "15 May 2026",
    product: "Vastu Pyramid Set",
    review:
      "Using the vastu pyramid set in my office. The energy shift is noticeable. Highly recommend Dhwani Astro!",
    city: "Ahmedabad",
  },
  {
    id: "DT005",
    name: "Ananya Singh",
    rating: 5,
    date: "07 May 2026",
    product: "Rose Quartz Tree",
    review:
      "The crystal tree is so pretty! Got it as a gift and everyone who comes home asks about it.",
    city: "Lucknow",
  },
  {
    id: "DT006",
    name: "Vikram Nair",
    rating: 4,
    date: "20 Apr 2026",
    product: "Amethyst Tumble",
    review:
      "Authentic stones, reasonable prices. Been buying from Dhwani Astro for 2 years now. Never disappointed.",
    city: "Bangalore",
  },
];

export const dhwaniTrustPillars = [
  {
    icon: "🙏",
    title: "Pran Pratistha Energized",
    titleHindi: "प्राण प्रतिष्ठा",
    desc: "All products energized with Vedic mantras by expert priests before dispatch.",
    descHindi: "सभी उत्पाद विशेषज्ञ पुजारियों द्वारा ऊर्जावान",
  },
  {
    icon: "💎",
    title: "Real & Authentic Stones",
    titleHindi: "असली और प्रामाणिक पत्थर",
    desc: "Lab-tested genuine crystals sourced from certified mines worldwide.",
    descHindi: "प्रमाणित खानों से प्रयोगशाला-परीक्षित असली क्रिस्टल",
  },
  {
    icon: "🚀",
    title: "Fast & Safe Delivery",
    titleHindi: "तेज़ और सुरक्षित डिलीवरी",
    desc: "Orders dispatched within 24 hours. Tracked shipping pan-India.",
    descHindi: "24 घंटे में ऑर्डर भेजा जाता है",
  },
  {
    icon: "✅",
    title: "100% Authentic Guarantee",
    titleHindi: "100% प्रामाणिकता गारंटी",
    desc: "Money-back guarantee on all products. No questions asked.",
    descHindi: "सभी उत्पादों पर मनी-बैक गारंटी",
  },
];
