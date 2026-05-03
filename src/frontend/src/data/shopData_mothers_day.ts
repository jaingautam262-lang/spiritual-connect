// Mother's Day spiritual gift collection

export interface MothersDayProduct {
  id: string;
  name: string;
  category: "mothers_day";
  price: number;
  mrp: number;
  discountPercent: number;
  description: string;
  giftNote: string;
  benefits: string;
  image: string;
  inStock: boolean;
  cashback: boolean;
}

export const MOTHERS_DAY_COLLECTION: MothersDayProduct[] = [
  {
    id: "mday-001",
    name: "Lakshmi Blessing Gift Set",
    category: "mothers_day",
    price: 5500,
    mrp: 8000,
    discountPercent: 31,
    description:
      "The ultimate divine blessing for your mother \u2014 a complete Lakshmi devotion set. Includes an intricately crafted brass Lakshmi Murti, a 108-bead crystal (Sphatik) mala for daily prayers, and a gold-plated Lakshmi Yantra for home prosperity.",
    giftNote:
      "Comes with special Mother's Day gift wrapping and a personalized blessing card",
    benefits:
      "Invokes Goddess Lakshmi's blessings for health, prosperity, and happiness in the home",
    image: "/images/mothers-day-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "mday-002",
    name: "Mother's Divine Crystal Set",
    category: "mothers_day",
    price: 3800,
    mrp: 5500,
    discountPercent: 31,
    description:
      "Three healing crystals chosen for a mother's wellbeing \u2014 Rose Quartz for unconditional love, Amethyst for peace and calm, and Moonstone for feminine intuition and emotional balance. Presented in a premium purple velvet pouch.",
    giftNote:
      "Comes with special Mother's Day gift wrapping and a personalized blessing card",
    benefits:
      "Promotes love, emotional balance, inner peace, and feminine divine energy",
    image: "/images/mothers-day-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "mday-003",
    name: "Saraswati Wisdom Gift Box",
    category: "mothers_day",
    price: 4200,
    mrp: 6000,
    discountPercent: 30,
    description:
      "Honor the wisdom and knowledge within your mother \u2014 Saraswati Brass Idol for Vidya and Kala, a Crystal Pen for inspired writing, and a Saraswati Yantra for activating the energy of learning and creativity in your home.",
    giftNote:
      "Comes with special Mother's Day gift wrapping and a personalized blessing card",
    benefits:
      "Invokes Goddess Saraswati's blessings for wisdom, creativity, and artistic expression",
    image: "/images/mothers-day-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "mday-004",
    name: "Golden Puja Thali Set",
    category: "mothers_day",
    price: 2800,
    mrp: 4200,
    discountPercent: 33,
    description:
      "Beautifully engraved brass puja thali with complete accessories \u2014 diya, small kalash, incense holder, and akshata plate \u2014 all in a coordinated brass set. Gift-wrapped in premium saffron fabric with lotus motif ribbon.",
    giftNote:
      "Comes with special Mother's Day gift wrapping and a personalized blessing card",
    benefits:
      "Elevates daily puja practice, brings divine grace, enhances spiritual routine",
    image: "/images/mothers-day-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "mday-005",
    name: "Tulsi Mala + Rudraksha Bracelet Set",
    category: "mothers_day",
    price: 2500,
    mrp: 3600,
    discountPercent: 31,
    description:
      "Sacred pairing for a mother's daily prayers \u2014 authentic Tulsi mala (108 beads) for Vishnu/Krishna japa and a 5-mukhi Rudraksha bracelet for health, peace, and Shiva's blessings. A deeply personal spiritual gift.",
    giftNote:
      "Comes with special Mother's Day gift wrapping and a personalized blessing card",
    benefits:
      "Daily prayer support, protection, health blessings, deepens spiritual practice",
    image: "/images/mothers-day-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "mday-006",
    name: "Spiritual Fragrance Gift Box",
    category: "mothers_day",
    price: 2000,
    mrp: 3000,
    discountPercent: 33,
    description:
      "A sensory journey into divine fragrance \u2014 premium Sandalwood Agarbatti, Dhoop sticks in 5 varieties (Champa, Rose, Mogra, Jasmine, Havan), and Kapoor (camphor) sampler. Transforms any space into a sacred sanctuary.",
    giftNote:
      "Comes with special Mother's Day gift wrapping and a personalized blessing card",
    benefits:
      "Creates sacred ambiance, calms the mind, invites divine presence in the home",
    image: "/images/mothers-day-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "mday-007",
    name: "Navratna Blessing Set",
    category: "mothers_day",
    price: 8000,
    mrp: 12000,
    discountPercent: 33,
    description:
      "The most auspicious spiritual gift \u2014 a Navratna (nine gemstone) beaded mala featuring all 9 astrological gemstones (Ruby, Pearl, Coral, Emerald, Yellow Sapphire, Diamond substitute, Blue Sapphire, Hessonite, Cat's Eye). Comes with individual stone meaning card and velvet pouch.",
    giftNote:
      "Comes with special Mother's Day gift wrapping and a personalized blessing card",
    benefits:
      "Blessings of all 9 planets, comprehensive protection, prosperity, and divine grace",
    image: "/images/mothers-day-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "mday-008",
    name: "Complete Aarti Kit Gift Box",
    category: "mothers_day",
    price: 3200,
    mrp: 4800,
    discountPercent: 33,
    description:
      "Everything for a complete, beautiful aarti ceremony \u2014 brass aarti thali, 5-wick diya, camphor holder, bell, flowers holder, and premium agarbatti. All presented in a beautifully decorated gift box with a personalized greeting card slot.",
    giftNote:
      "Comes with special Mother's Day gift wrapping and a personalized blessing card",
    benefits:
      "Complete aarti ritual support, enhances daily devotion, brings blessings and positivity",
    image: "/images/mothers-day-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
];
