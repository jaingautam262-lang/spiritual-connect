// Divine Hindu Store Data
// Get 100% Cashback in Your Divine Wallet

export interface DivineHinduProduct {
  id: string;
  name: string;
  nameHindi: string;
  category: string;
  price: number;
  mrp: number;
  cashback: boolean;
  cashbackAmount?: number;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  inStock: boolean;
  isBestSeller?: boolean;
}

export interface DivineHinduReview {
  id: string;
  name: string;
  product: string;
  date: string;
  rating: number;
  review: string;
  verified: boolean;
}

export interface DivineHinduCollection {
  id: string;
  name: string;
  nameHindi: string;
  count: number;
  link: string;
  emoji: string;
  color: string;
}

export const divineHinduBestSellers: DivineHinduProduct[] = [
  {
    id: "DH-SB001",
    name: "Black Tourmaline Stone Bracelet",
    nameHindi: "काली टूमलाइन पत्थर कड़ा",
    category: "Stone Bracelet",
    price: 599,
    mrp: 899,
    cashback: false,
    rating: 4.8,
    reviews: 345,
    badge: "Best Seller",
    description: "Protection and grounding. Shields from EMF and negativity.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-SB002",
    name: "Tiger Eye Stone Bracelet",
    nameHindi: "टाइगर आई पत्थर कड़ा",
    category: "Stone Bracelet",
    price: 549,
    mrp: 849,
    cashback: false,
    rating: 4.7,
    reviews: 289,
    badge: "Trending",
    description: "Confidence, willpower and courage stone.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-SB003",
    name: "Rose Quartz Stone Bracelet",
    nameHindi: "रोज़ क्वार्ट्ज़ पत्थर कड़ा",
    category: "Stone Bracelet",
    price: 499,
    mrp: 749,
    cashback: false,
    rating: 4.9,
    reviews: 512,
    badge: "Top Seller",
    description: "Love, compassion and emotional healing stone.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-RS001",
    name: "Aries Rashi Bracelet",
    nameHindi: "मेष राशि कड़ा",
    category: "Rashi Bracelet",
    price: 699,
    mrp: 1049,
    cashback: false,
    rating: 4.6,
    reviews: 167,
    description: "Carnelian and red jasper for Aries energy.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-KP001",
    name: "Shree Yantra Karungali Pendant",
    nameHindi: "श्री यंत्र करुंगाली पेंडेंट",
    category: "Karungali",
    price: 899,
    mrp: 1349,
    cashback: true,
    cashbackAmount: 899,
    rating: 4.9,
    reviews: 423,
    badge: "100% Cashback",
    description: "Ebony wood Shree Yantra pendant. Divine energy.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-JM001",
    name: "5 Mukhi Rudraksha Mala",
    nameHindi: "5 मुखी रुद्राक्ष माला",
    category: "Jaap Mala",
    price: 1299,
    mrp: 1999,
    cashback: true,
    cashbackAmount: 1299,
    rating: 4.8,
    reviews: 234,
    badge: "100% Cashback",
    description: "108 bead 5 Mukhi Rudraksha Mala. Shiva blessed.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-SJ001",
    name: "Murugan Vel Kada — Gold Plated",
    nameHindi: "मुरुगन वेल कड़ा — सोना मढ़ा",
    category: "Spiritual Jewellery",
    price: 799,
    mrp: 1199,
    cashback: false,
    rating: 4.7,
    reviews: 189,
    description: "Lord Murugan divine Vel shaped gold-plated kada.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-ID001",
    name: "Brass Hanuman Ji Idol",
    nameHindi: "पीतल हनुमान जी प्रतिमा",
    category: "Idol",
    price: 1499,
    mrp: 2299,
    cashback: true,
    cashbackAmount: 1499,
    rating: 4.9,
    reviews: 312,
    badge: "100% Cashback",
    description: "Premium brass Hanuman Ji idol. 6 inch height.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-CO001",
    name: "Crystal Tree + Yantra Combo",
    nameHindi: "क्रिस्टल ट्री + यंत्र कॉम्बो",
    category: "Combo",
    price: 1799,
    mrp: 2799,
    cashback: true,
    cashbackAmount: 1799,
    rating: 4.8,
    reviews: 156,
    badge: "Combo Offer",
    description: "Rose Quartz crystal tree with Shree Yantra plate.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-NR001",
    name: "Nirakar Rudraksha Pendant",
    nameHindi: "निराकार रुद्राक्ष पेंडेंट",
    category: "Pendant",
    price: 999,
    mrp: 1499,
    cashback: true,
    cashbackAmount: 999,
    rating: 4.7,
    reviews: 198,
    badge: "100% Cashback",
    description: "Natural Rudraksha formless pendant. Shiva energy.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-ANK001",
    name: "Tiger Eye Anklet",
    nameHindi: "टाइगर आई पायल",
    category: "Anklet",
    price: 449,
    mrp: 699,
    cashback: false,
    rating: 4.5,
    reviews: 234,
    description: "Golden Tiger Eye anklet for confidence and power.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-SJ010",
    name: "Gold Om & Trishul Pendant",
    nameHindi: "गोल्ड ओम और त्रिशूल पेंडेंट",
    category: "Pendant",
    price: 1199,
    mrp: 1849,
    cashback: false,
    rating: 4.8,
    reviews: 267,
    badge: "Gold Plated",
    description: "18K gold plated Om and Trishul pendant.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-SB010",
    name: "Amethyst Calming Bracelet",
    nameHindi: "अमेथिस्ट शांत करने वाला कड़ा",
    category: "Stone Bracelet",
    price: 549,
    mrp: 849,
    cashback: false,
    rating: 4.6,
    reviews: 198,
    description: "Purple amethyst for stress relief and clarity.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-RS012",
    name: "Scorpio Rashi + FREE Selenite Plate",
    nameHindi: "वृश्चिक राशि + मुफ्त सेलेनाइट प्लेट",
    category: "Rashi Combo",
    price: 999,
    mrp: 1499,
    cashback: false,
    rating: 4.8,
    reviews: 134,
    badge: "FREE Gift",
    description:
      "Scorpio rashi bracelet with complimentary selenite cleansing plate.",
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "DH-NC001",
    name: "Karungali Mala + Rudraksha Combo",
    nameHindi: "करुंगाली माला + रुद्राक्ष कॉम्बो",
    category: "Combo",
    price: 2499,
    mrp: 3799,
    cashback: true,
    cashbackAmount: 2499,
    rating: 4.9,
    reviews: 89,
    badge: "100% Cashback",
    description: "Premium combo for maximum spiritual benefit.",
    inStock: true,
    isBestSeller: true,
  },
];

export const divineHinduCollections: DivineHinduCollection[] = [
  {
    id: "karungali",
    name: "All Karungali",
    nameHindi: "सभी करुंगाली",
    count: 231,
    link: "/shop?category=karungali",
    emoji: "🌑",
    color: "from-stone-800 to-stone-600",
  },
  {
    id: "rudraksha",
    name: "All Rudraksha",
    nameHindi: "सभी रुद्राक्ष",
    count: 218,
    link: "/shop?category=rudraksha",
    emoji: "🟤",
    color: "from-amber-700 to-amber-500",
  },
  {
    id: "pyrite-frames",
    name: "Pyrite Frames",
    nameHindi: "पाइराइट फ्रेम",
    count: 33,
    link: "/shop?category=pyrite",
    emoji: "✨",
    color: "from-yellow-600 to-yellow-400",
  },
  {
    id: "rashi-ratna",
    name: "Rashi Ratna",
    nameHindi: "राशि रत्न",
    count: 24,
    link: "/shop?category=gemstones",
    emoji: "💎",
    color: "from-blue-700 to-blue-500",
  },
];

export const divineHinduReviews: DivineHinduReview[] = [
  {
    id: "DHR001",
    name: "Ramesh Verma",
    product: "5 Mukhi Rudraksha Mala",
    date: "15 Apr 2026",
    rating: 5,
    review:
      "Genuine rudraksha mala. The quality is exceptional. Got 100% cashback in Divine Wallet as promised!",
    verified: true,
  },
  {
    id: "DHR002",
    name: "Meena Iyer",
    product: "Brass Hanuman Ji Idol",
    date: "02 May 2026",
    rating: 5,
    review:
      "Beautiful idol with divine energy. The cashback system is amazing - I used it to buy more products!",
    verified: true,
  },
  {
    id: "DHR003",
    name: "Amit Patel",
    product: "Crystal Tree + Yantra Combo",
    date: "28 Apr 2026",
    rating: 4,
    review:
      "Great combo deal. Rose Quartz tree brings positive energy. Packaging was excellent.",
    verified: true,
  },
  {
    id: "DHR004",
    name: "Sunita Sharma",
    product: "Tiger Eye Stone Bracelet",
    date: "10 May 2026",
    rating: 5,
    review:
      "Very nice quality bracelet. My husband wears it daily. The Tiger Eye stone feels authentic.",
    verified: true,
  },
  {
    id: "DHR005",
    name: "Priya Nair",
    product: "Karungali Mala + Rudraksha Combo",
    date: "05 May 2026",
    rating: 5,
    review:
      "Worth every rupee! The energy of karungali and rudraksha together is powerful. 100% cashback received!",
    verified: true,
  },
  {
    id: "DHR006",
    name: "Deepak Mishra",
    product: "Shree Yantra Pendant",
    date: "20 Apr 2026",
    rating: 5,
    review:
      "Excellent Shree Yantra pendant. Wearing it for prosperity and seeing results. Highly recommend!",
    verified: true,
  },
  {
    id: "DHR007",
    name: "Lalita Singh",
    product: "Rose Quartz Bracelet",
    date: "08 May 2026",
    rating: 4,
    review:
      "Beautiful rose quartz bracelet. Good quality and fast delivery within 2 days.",
    verified: true,
  },
  {
    id: "DHR008",
    name: "Kiran Rao",
    product: "Aries Rashi Bracelet",
    date: "14 Apr 2026",
    rating: 5,
    review:
      "Exactly as described. The rashi bracelet matches my zodiac perfectly. Love it!",
    verified: true,
  },
  {
    id: "DHR009",
    name: "Mohan Gupta",
    product: "Gold Om Trishul Pendant",
    date: "01 May 2026",
    rating: 4,
    review:
      "Gold plating quality is very good. The pendant looks premium and spiritual.",
    verified: true,
  },
  {
    id: "DHR010",
    name: "Anita Joshi",
    product: "Murugan Vel Kada",
    date: "25 Apr 2026",
    rating: 5,
    review:
      "Got this for my husband. He loves it! The kada is beautifully designed. Divine energy.",
    verified: true,
  },
  {
    id: "DHR011",
    name: "Suresh Kumar",
    product: "Black Tourmaline Bracelet",
    date: "07 May 2026",
    rating: 5,
    review:
      "Best protection bracelet I've ever worn. Genuine stone, great quality. Divine Hindu never disappoints.",
    verified: true,
  },
  {
    id: "DHR012",
    name: "Kavitha Nair",
    product: "Amethyst Bracelet",
    date: "12 May 2026",
    rating: 4,
    review:
      "Beautiful amethyst bracelet. Helps with sleep and stress. The bracelet sizing was perfect.",
    verified: true,
  },
  {
    id: "DHR013",
    name: "Vinod Sharma",
    product: "Scorpio Rashi Combo",
    date: "03 Apr 2026",
    rating: 5,
    review:
      "Scorpio rashi bracelet + selenite plate — amazing combo! The free selenite plate is a bonus.",
    verified: true,
  },
  {
    id: "DHR014",
    name: "Rekha Patel",
    product: "Nirakar Pendant",
    date: "18 Apr 2026",
    rating: 5,
    review:
      "The Nirakar Rudraksha pendant is unique and powerful. 100% cashback as promised!",
    verified: true,
  },
  {
    id: "DHR015",
    name: "Asha Yadav",
    product: "Karungali + Rudraksha Combo",
    date: "11 May 2026",
    rating: 5,
    review:
      "Best spiritual combo available. Feel the protection and blessings. Will buy again!",
    verified: true,
  },
  {
    id: "DHR016",
    name: "Naresh Mehta",
    product: "Crystal Tree Combo",
    date: "06 Apr 2026",
    rating: 4,
    review:
      "Very nice looking crystal tree. The yantra plate is genuine copper. Good gift option.",
    verified: true,
  },
  {
    id: "DHR017",
    name: "Padma Krishnan",
    product: "Tiger Eye Anklet",
    date: "23 Apr 2026",
    rating: 5,
    review:
      "Beautiful anklet! Tiger Eye stone quality is excellent. Very comfortable to wear daily.",
    verified: true,
  },
  {
    id: "DHR018",
    name: "Rajiv Sharma",
    product: "5 Mukhi Mala",
    date: "29 Apr 2026",
    rating: 5,
    review:
      "Certified genuine 5 Mukhi Rudraksha. Each bead is perfect. The mala energy is powerful!",
    verified: true,
  },
  {
    id: "DHR019",
    name: "Geeta Agarwal",
    product: "Gold Om Pendant",
    date: "16 May 2026",
    rating: 4,
    review:
      "Premium gold plated Om pendant. Wore it to temple and received many compliments.",
    verified: true,
  },
  {
    id: "DHR020",
    name: "Harish Pillai",
    product: "Brass Hanuman Idol",
    date: "10 Apr 2026",
    rating: 5,
    review:
      "Magnificent brass idol! The craftsmanship is superb. Puja room energy changed completely.",
    verified: true,
  },
];

export const cashbackSteps = [
  {
    step: 1,
    icon: "🛒",
    title: "Buy Product",
    titleHindi: "उत्पाद खरीदें",
    desc: "Purchase any eligible product from Divine Hindu store.",
    descHindi: "Divine Hindu स्टोर से कोई भी eligible उत्पाद खरीदें",
  },
  {
    step: 2,
    icon: "💰",
    title: "Cashback Credited",
    titleHindi: "कैशबैक जमा",
    desc: "100% cashback is credited to your Divine Wallet within 48 hours.",
    descHindi: "48 घंटे में 100% कैशबैक Divine Wallet में जमा",
  },
  {
    step: 3,
    icon: "👛",
    title: "Wallet Balance",
    titleHindi: "वॉलेट बैलेंस",
    desc: "Check your Divine Wallet balance in your account dashboard.",
    descHindi: "अपने डैशबोर्ड में Divine Wallet बैलेंस देखें",
  },
  {
    step: 4,
    icon: "🎁",
    title: "Redeem on Next Purchase",
    titleHindi: "अगली खरीद पर रिडीम",
    desc: "Use wallet balance on your next Divine Hindu purchase.",
    descHindi: "अगली Divine Hindu खरीद पर वॉलेट बैलेंस उपयोग करें",
  },
];
