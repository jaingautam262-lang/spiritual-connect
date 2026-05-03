// Kaka (Crow) tantric and spiritual products

export interface KakaProduct {
  id: string;
  name: string;
  category: "kaka";
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

export const KAKA_PRODUCTS: KakaProduct[] = [
  {
    id: "kaka-001",
    name: "Kaka Bhushundi Yantra \u2014 \u0915\u093e\u0915 \u092d\u0941\u0936\u0941\u0923\u094d\u0921\u093f \u092f\u0902\u0924\u094d\u0930",
    category: "kaka",
    price: 1500,
    mrp: 2100,
    discountPercent: 29,
    description:
      "Kaka Bhushundi Yantra (\u0915\u093e\u0915 \u092d\u0941\u0936\u0941\u0923\u094d\u0921\u093f \u092f\u0902\u0924\u094d\u0930) \u2014 sacred copper yantra engraved with Kaka Bhushundi's bija mantras for wish fulfillment and protection from negative forces. Purified and energized with Vedic rites.",
    benefits:
      "Wish fulfillment, protection from negative energies, removes obstacles, grants divine knowledge",
    material: "Pure Copper",
    image: "/images/kaka-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "kaka-002",
    name: "Crow Feather Bundle \u2014 \u0915\u093e\u0915 \u092a\u0902\u0916 \u0938\u092e\u0942\u0939",
    category: "kaka",
    price: 800,
    mrp: 1100,
    discountPercent: 27,
    description:
      "Crow Feather Bundle (\u0915\u093e\u0915 \u092a\u0902\u0916) \u2014 5 natural black crow feathers used in tantric sadhana and ritual practices. Sourced ethically, purified with Vedic mantras. Essential tantra samagri for Kaka rituals.",
    benefits:
      "Tantra sadhana aid, removes doshas, protective ritual tool, enhances black magic protection",
    material: "Natural Crow Feathers",
    image: "/images/kaka-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "kaka-003",
    name: "Kaka Tantric Protection Kavach \u2014 \u0915\u093e\u0915 \u0924\u093e\u0902\u0924\u094d\u0930\u093f\u0915 \u0915\u0935\u091a",
    category: "kaka",
    price: 1200,
    mrp: 1800,
    discountPercent: 33,
    description:
      "Kaka Tantric Protection Kavach (\u0915\u093e\u0915 \u0915\u0935\u091a) \u2014 brass pendant carved with the sacred crow symbol and Kaka Bhushundi mantras. Acts as a powerful shield against evil eye, negative energies, and psychic attacks.",
    benefits:
      "Evil eye protection, shields against negative energies, spiritual armor, psychic protection",
    material: "Brass",
    image: "/images/kaka-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "kaka-004",
    name: "Kaka Mala 108 Beads \u2014 \u0915\u093e\u0915 \u092e\u093e\u0932\u093e",
    category: "kaka",
    price: 1800,
    mrp: 2500,
    discountPercent: 28,
    description:
      "Kaka Mala (\u0915\u093e\u0915 \u092e\u093e\u0932\u093e) \u2014 108-bead mala crafted from black crow bone replica wood, energized for negative energy removal and tantric japa. Used by sadhaks for Kaka Bhushundi mantra recitation.",
    benefits:
      "Negative energy removal, tantric japa, psychic protection, connects to crow deity energy",
    material: "Black Wood (Crow Bone Replica)",
    image: "/images/kaka-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "kaka-005",
    name: "Kaka Bhushundi Idol \u2014 \u0915\u093e\u0915 \u092d\u0941\u0936\u0941\u0923\u094d\u0921\u093f \u092e\u0942\u0930\u094d\u0924\u093f",
    category: "kaka",
    price: 2500,
    mrp: 3500,
    discountPercent: 29,
    description:
      "Kaka Bhushundi Idol (\u0915\u093e\u0915 \u092d\u0941\u0936\u0941\u0923\u094d\u0921\u093f \u092e\u0942\u0930\u094d\u0924\u093f) \u2014 black metal crow figurine for altar worship and tantric sadhana. Represents the divine crow sage Kaka Bhushundi who narrated the Ramayana to Garuda. Energized with Vedic rituals.",
    benefits:
      "Sacred altar piece, grants wisdom, fulfills wishes, powerful protection talisman",
    material: "Black Metal",
    image: "/images/kaka-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "kaka-006",
    name: "Kaka Wish Fulfillment Kit \u2014 \u0915\u093e\u0915 \u0907\u091a\u094d\u091b\u093e\u092a\u0942\u0930\u094d\u0924\u093f \u0915\u093f\u091f",
    category: "kaka",
    price: 3500,
    mrp: 5000,
    discountPercent: 30,
    description:
      "Kaka Wish Fulfillment Kit (\u0915\u093e\u0915 \u0907\u091a\u094d\u091b\u093e\u092a\u0942\u0930\u094d\u0924\u093f \u0938\u092e\u094d\u092a\u0942\u0930\u094d\u0923 \u0915\u093f\u091f) \u2014 complete tantric kit containing Kaka Bhushundi Yantra + Kaka Mala + Crow Feather + Step-by-step ritual instructions. Everything needed for Kaka sadhana.",
    benefits:
      "Complete wish fulfillment sadhana, combines all Kaka energies, beginner-friendly with instructions",
    material: "Copper, Black Wood, Natural Feather",
    image: "/images/kaka-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "kaka-007",
    name: "Vayu Dev Crow Yantra \u2014 \u0935\u093e\u092f\u0941 \u0926\u0947\u0935 \u0915\u093e\u0915 \u092f\u0902\u0924\u094d\u0930",
    category: "kaka",
    price: 1100,
    mrp: 1600,
    discountPercent: 31,
    description:
      "Vayu Dev Crow Yantra (\u0935\u093e\u092f\u0941 \u0926\u0947\u0935 \u0915\u093e\u0915 \u092f\u0902\u0924\u094d\u0930) \u2014 copper yantra engraved with the sacred geometry connecting Vayu Dev and the divine crow. Used for air element balancing, travel protection, and wish fulfillment.",
    benefits:
      "Air element balance, travel protection, wish manifestation, Vayu Dev blessings",
    material: "Pure Copper",
    image: "/images/kaka-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
  {
    id: "kaka-008",
    name: "Kaka Gutika \u2014 \u0915\u093e\u0915 \u0917\u0941\u091f\u093f\u0915\u093e",
    category: "kaka",
    price: 900,
    mrp: 1300,
    discountPercent: 31,
    description:
      "Kaka Gutika (\u0915\u093e\u0915 \u0917\u0941\u091f\u093f\u0915\u093e) \u2014 set of 5 black protective beads energized with Kaka Bhushundi mantras. Carried in a black cloth pouch for continuous protection against evil spirits, black magic, and negative influences.",
    benefits:
      "Continuous protection from evil eye, black magic shield, removes negative influences",
    material: "Black Protective Beads",
    image: "/images/kaka-placeholder.jpg",
    inStock: true,
    cashback: true,
  },
];
