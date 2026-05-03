// Karungali (Black Ebony Wood) products \u2014 South Indian tradition

export interface KarungaliProduct {
  id: string;
  name: string;
  category: "karungali";
  price: number;
  mrp: number;
  discountPercent: number;
  description: string;
  benefits: string;
  material: string;
  image: string;
  inStock: boolean;
  cashback: boolean;
}

export interface KarungaliInfo {
  about: string;
  origin: string;
  benefits: string[];
  care: string;
  authenticity: string;
}

export const KARUNGALI_INFO: KarungaliInfo = {
  about:
    "Karungali (\u0b95\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bbe\u0bb2\u0bbf), also known as Black Ebony or Ebony Wood, is a rare and precious wood used in South Indian spiritual traditions for centuries. Revered in Tamil Siddha traditions, Karungali items are believed to carry powerful protective and healing vibrations. The dense black wood is naturally resistant to negative energies and is considered a direct conductor of divine protection.",
  origin: "Tamil Nadu, South India",
  benefits: [
    "Powerful protection against negative energies and evil eye",
    "Promotes physical health and immunity",
    "Removes fear, anxiety, and psychic disturbances",
    "Attracts positive energy and good fortune",
    "Balances the Muladhara (root) chakra",
    "Connects to the blessings of Murugan, Kali, and Siddha traditions",
    "Natural antimicrobial properties support health",
  ],
  care: "Keep Karungali items away from direct sunlight to preserve color. Clean gently with a dry soft cloth. Energize periodically by placing under moonlight on Pournami (full moon) nights. Avoid contact with perfumes and chemicals.",
  authenticity:
    "All Spiritual Connect Karungali products are sourced directly from certified artisans in Tamil Nadu. Each piece comes with an authenticity certificate. Genuine Karungali sinks in water \u2014 a key indicator of authentic black ebony wood.",
};

export const KARUNGALI_PRODUCTS: KarungaliProduct[] = [
  {
    id: "kgl-001",
    name: "Karungali Mala 108 Beads \u2014 \u0b95\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bbe\u0bb2\u0bbf \u0bae\u0bbe\u0bb2\u0bc8",
    category: "karungali",
    price: 3500,
    mrp: 5000,
    discountPercent: 30,
    description:
      "Karungali Mala (\u0b95\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bbe\u0bb2\u0bbf \u0bae\u0bbe\u0bb2\u0bc8) \u2014 108-bead mala handcrafted from authentic Karungali (Black Ebony) wood. Used for japa meditation, spiritual protection, and daily prayers. Each bead is smooth-polished and naturally fragrant.",
    benefits:
      "Protection from negative energies, health improvement, removes fear, japa meditation aid",
    material: "Karungali (Black Ebony Wood)",
    image: "/images/karungali-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "kgl-002",
    name: "Karungali Bracelet \u2014 \u0b95\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bbe\u0bb2\u0bbf \u0b95\u0bc8\u0bb5\u0bb3\u0bc8\u0baf\u0bb2\u0bcd",
    category: "karungali",
    price: 1200,
    mrp: 1800,
    discountPercent: 33,
    description:
      "Karungali Bracelet (\u0b95\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bbe\u0bb2\u0bbf \u0b95\u0bc8\u0bb5\u0bb3\u0bc8\u0baf\u0bb2\u0bcd) \u2014 wrist protection bracelet made with 11mm Karungali beads. Elastic thread for comfortable daily wear. Protects the wearer from evil eye and negative vibrations throughout the day.",
    benefits:
      "Wrist protection, evil eye shield, continuous protection throughout the day",
    material: "Karungali (Black Ebony Wood)",
    image: "/images/karungali-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "kgl-003",
    name: "Karungali Pendant \u2014 Om/Trishul",
    category: "karungali",
    price: 1800,
    mrp: 2500,
    discountPercent: 28,
    description:
      "Karungali Pendant (\u0b95\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bbe\u0bb2\u0bbf \u0baa\u0ba4\u0b95\u0bcd\u0b95\u0bae\u0bcd) \u2014 hand-carved Om or Trishul symbol pendant on genuine Karungali wood. Comes with black cotton cord. A powerful personal talisman for evil eye protection and spiritual shielding.",
    benefits:
      "Personal protection talisman, evil eye shield, connects to Shiva's energy",
    material: "Karungali (Black Ebony Wood)",
    image: "/images/karungali-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "kgl-004",
    name: "Karungali Ganesha Idol 2 inch",
    category: "karungali",
    price: 4500,
    mrp: 6500,
    discountPercent: 31,
    description:
      "Karungali Ganesha Idol \u2014 2-inch hand-carved Black Ebony Ganesha idol. Each piece is unique, carved by master artisans of Tamil Nadu. Perfect for home altar, office puja, or gifting.",
    benefits:
      "Removes obstacles, brings prosperity, sacred altar piece, unique artisan creation",
    material: "Karungali (Black Ebony Wood)",
    image: "/images/karungali-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "kgl-005",
    name: "Karungali Shivalingam",
    category: "karungali",
    price: 2800,
    mrp: 4000,
    discountPercent: 30,
    description:
      "Karungali Shivalingam \u2014 3-inch Black Ebony Shivalingam carved from solid Karungali wood. Represents Lord Shiva in his most sacred form. Ideal for daily Shiva puja and meditation.",
    benefits:
      "Shiva's blessings, spiritual evolution, moksha, health and longevity",
    material: "Karungali (Black Ebony Wood)",
    image: "/images/karungali-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "kgl-006",
    name: "Karungali Combo Set \u2014 Mala + Bracelet + Pendant",
    category: "karungali",
    price: 5500,
    mrp: 8000,
    discountPercent: 31,
    description:
      "Karungali Full Protection Combo \u2014 complete set of Karungali Mala (108 beads) + Bracelet + Pendant. The ultimate Karungali protection kit providing full-body spiritual shielding.",
    benefits:
      "Complete body protection, full karungali energy field, maximum negative energy removal",
    material: "Karungali (Black Ebony Wood)",
    image: "/images/karungali-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
  {
    id: "kgl-007",
    name: "Karungali Wand \u2014 Energy Healing",
    category: "karungali",
    price: 2200,
    mrp: 3200,
    discountPercent: 31,
    description:
      "Karungali Wand \u2014 energy healing wand crafted from Karungali wood, following South Indian Siddha healing traditions. Used for aura cleansing, space clearing, and directing healing energy during sessions.",
    benefits:
      "Aura cleansing, space clearing, energy healing sessions, Siddha tradition tool",
    material: "Karungali (Black Ebony Wood)",
    image: "/images/karungali-placeholder.jpg",
    inStock: true,
    cashback: false,
  },
];
