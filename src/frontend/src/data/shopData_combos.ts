// Spiritual combo packs and bundle deals

export interface ComboPack {
  id: string;
  name: string;
  category: "combo";
  description: string;
  components: string[];
  totalMrp: number;
  price: number;
  discountPercent: number;
  savings: number;
  occasion: string;
  purpose: string;
  image: string;
  cashback: boolean;
}

export const COMBO_PACKS: ComboPack[] = [
  {
    id: "combo-001",
    name: "Navgraha Protection Combo",
    category: "combo",
    description:
      "Complete Navgraha protection set for pacifying all nine planetary deities and removing malefic planetary influences. Includes 9 individual Navgraha yantras, a full 108-bead Navgraha mala, and a complete Navgraha puja kit with all required samagri.",
    components: [
      "9 Navgraha Yantra Set (Copper Engraved)",
      "Navgraha Mala 108 Beads",
      "Navgraha Puja Kit with Samagri",
    ],
    totalMrp: 8500,
    price: 5500,
    discountPercent: 35,
    savings: 3000,
    occasion: "Graha Shanti, Saturn Sade Sati, Rahu/Ketu Transit",
    purpose: "Planetary protection and graha shanti",
    image: "/images/combo-placeholder.jpg",
    cashback: true,
  },
  {
    id: "combo-002",
    name: "Rudraksha + Yantra Wealth Combo",
    category: "combo",
    description:
      "Powerful wealth attraction combo combining the spiritual potency of Rudraksha with sacred yantras for Lakshmi and Kubera. Wear the Rudraksha mala daily while keeping the Shri Yantra and Kuber Yantra in your home or business.",
    components: [
      "5-Mukhi Rudraksha Mala (108 Beads, Nepal)",
      "Shri Yantra (Copper, Energized)",
      "Kuber Yantra (Brass, Energized)",
    ],
    totalMrp: 11000,
    price: 7200,
    discountPercent: 35,
    savings: 3800,
    occasion: "Dhanteras, Akshaya Tritiya, Business Start",
    purpose: "Wealth attraction and financial abundance",
    image: "/images/combo-placeholder.jpg",
    cashback: true,
  },
  {
    id: "combo-003",
    name: "Complete Puja Kit Combo",
    category: "combo",
    description:
      "Everything you need for daily home puja in one complete kit. Includes Panchamrit (5 sacred liquids), Havan Samagri, premium Agarbatti Set, decorative brass Diya, and an engraved brass Puja Thali. Perfect for beginners and gifting.",
    components: [
      "Panchamrit Kit (5 items)",
      "Havan Samagri (500g)",
      "Premium Agarbatti Set (10 fragrances)",
      "Brass Diya (decorative)",
      "Engraved Brass Puja Thali",
    ],
    totalMrp: 5800,
    price: 3800,
    discountPercent: 34,
    savings: 2000,
    occasion: "Navratri, Diwali, Daily Puja, New Home",
    purpose: "Complete daily puja setup",
    image: "/images/combo-placeholder.jpg",
    cashback: true,
  },
  {
    id: "combo-004",
    name: "Gemstone Prosperity Combo",
    category: "combo",
    description:
      "Lab-certified tri-gemstone prosperity set combining Pukhraj (Yellow Sapphire for Jupiter), Moti (Pearl for Moon), and Panna (Emerald for Mercury) in silver settings. Includes GIA-style certificates for each stone.",
    components: [
      "Pukhraj (Yellow Sapphire) 4 Ratti in Silver Ring",
      "Moti (Pearl) 5 Ratti in Silver Pendant",
      "Panna (Emerald) 4 Ratti in Silver Ring",
      "Lab Certificates for all 3 gemstones",
    ],
    totalMrp: 18000,
    price: 12000,
    discountPercent: 33,
    savings: 6000,
    occasion: "Akshaya Tritiya, Birthday Gift, Wedding Gift",
    purpose: "Prosperity, intelligence, and emotional balance",
    image: "/images/combo-placeholder.jpg",
    cashback: true,
  },
  {
    id: "combo-005",
    name: "Protection Combo",
    category: "combo",
    description:
      "Comprehensive protection bundle combining tantric and astrological shields. Kali Yantra for divine protection, Black Tourmaline Crystal for EMF and negative energy blocking, Ketu Kavach for Ketu dosha removal, and a Protection Mala.",
    components: [
      "Kali Yantra (Copper Engraved)",
      "Black Tourmaline Crystal (100g raw)",
      "Ketu Kavach Pendant",
      "Protection Mala (Black Onyx, 108 beads)",
    ],
    totalMrp: 7000,
    price: 4500,
    discountPercent: 36,
    savings: 2500,
    occasion: "Evil Eye Protection, Moving to New Place, General Shield",
    purpose: "Multi-layer spiritual protection",
    image: "/images/combo-placeholder.jpg",
    cashback: true,
  },
  {
    id: "combo-006",
    name: "Crystal Healing Combo",
    category: "combo",
    description:
      "Complete chakra healing crystal set with Rose Quartz (heart chakra), Amethyst (third eye), Citrine (solar plexus), and Clear Quartz Cluster (crown chakra amplifier). All natural, unpolished specimens with healing guide.",
    components: [
      "Rose Quartz Tumble (100g) \u2014 Heart Chakra",
      "Amethyst Tumble (100g) \u2014 Third Eye Chakra",
      "Natural Citrine Point (50g) \u2014 Solar Plexus",
      "Clear Quartz Cluster (150g) \u2014 Crown Chakra",
      "Crystal Healing Guide Booklet",
    ],
    totalMrp: 9000,
    price: 6000,
    discountPercent: 33,
    savings: 3000,
    occasion: "Meditation, Healing Practice, Yoga Studio",
    purpose: "Chakra balancing and energy healing",
    image: "/images/combo-placeholder.jpg",
    cashback: true,
  },
  {
    id: "combo-007",
    name: "Mother's Day Special Combo",
    category: "combo",
    description:
      "Divine gift for the most sacred bond \u2014 this special combo honors the divine mother within. Includes a Lakshmi Murti for abundance, Crystal Mala for peace, Lakshmi Yantra for prosperity, and a floral puja thali. Comes in special Mother's Day gift packaging.",
    components: [
      "Lakshmi Murti (Brass, 4 inch)",
      "Crystal Mala (108 beads, Sphatik)",
      "Lakshmi Yantra (Gold-plated)",
      "Floral Puja Thali with Accessories",
    ],
    totalMrp: 8500,
    price: 5500,
    discountPercent: 35,
    savings: 3000,
    occasion: "Mother's Day \u2014 Special Gift Packaging Included",
    purpose: "Blessing and honoring mothers with divine grace",
    image: "/images/combo-placeholder.jpg",
    cashback: true,
  },
];
