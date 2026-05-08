// ─── Numerology Bracelet Data ──────────────────────────────────────────────────
// 77 products across 5 categories: Moolank, Personal Year, Natural Purpose,
// Single Crystal, Anklets

export interface NumerologyBracelet {
  id: string;
  sku: string;
  name: string;
  nameHi: string;
  price: number;
  mrp: number;
  category:
    | "moolank"
    | "personal-year"
    | "natural-purpose"
    | "single-crystal"
    | "anklet";
  moolank?: number[];
  personalYear?: number[];
  purpose?: string;
  stone: string;
  benefits: string[];
  description: string;
  descriptionHi: string;
  emoji: string;
  badge?: string;
  isNew?: boolean;
  emiEligible: boolean;
}

// ─── Category: Moolank 1–9 ─────────────────────────────────────────────────────
export const MOOLANK_BRACELETS: NumerologyBracelet[] = [
  {
    id: "nm-001",
    sku: "NM001",
    name: "Black Tourmaline Moolank 1 Bracelet",
    nameHi: "ब्लैक टूमालाइन मूलांक १ ब्रेसलेट",
    price: 699,
    mrp: 999,
    category: "moolank",
    moolank: [1],
    stone: "Black Tourmaline",
    emoji: "🖤",
    benefits: [
      "Enhances leadership qualities",
      "Provides strong protection",
      "Boosts confidence and willpower",
    ],
    description:
      "Black Tourmaline bracelet specially energized for Moolank 1 (born 1, 10, 19, 28). Amplifies leadership, drive, and protective energy.",
    descriptionHi:
      "मूलांक १ (1, 10, 19, 28 को जन्मे) के लिए विशेष रूप से ऊर्जावान ब्लैक टूमालाइन ब्रेसलेट। नेतृत्व, दृढ़ता और सुरक्षा ऊर्जा को बढ़ाता है।",
    badge: "Bestseller",
    emiEligible: true,
  },
  {
    id: "nm-002",
    sku: "NM002",
    name: "Pearl Bracelet Moolank 2",
    nameHi: "मोती ब्रेसलेट मूलांक २",
    price: 899,
    mrp: 1299,
    category: "moolank",
    moolank: [2],
    stone: "Pearl",
    emoji: "🤍",
    benefits: [
      "Calms emotions and mind",
      "Enhances intuition",
      "Promotes harmony in relationships",
    ],
    description:
      "Natural Pearl bracelet for Moolank 2 (born 2, 11, 20, 29). Governed by the Moon, it promotes peace, intuition, and emotional balance.",
    descriptionHi:
      "मूलांक २ (2, 11, 20, 29 को जन्मे) के लिए प्राकृतिक मोती ब्रेसलेट। चंद्र द्वारा शासित, यह शांति, अंतर्ज्ञान और भावनात्मक संतुलन को बढ़ावा देता है।",
    badge: "Trending",
    emiEligible: true,
  },
  {
    id: "nm-003",
    sku: "NM003",
    name: "Yellow Agate Moolank 3 Bracelet",
    nameHi: "पीला अगेट मूलांक ३ ब्रेसलेट",
    price: 599,
    mrp: 899,
    category: "moolank",
    moolank: [3],
    stone: "Yellow Agate",
    emoji: "💛",
    benefits: [
      "Attracts abundance and prosperity",
      "Boosts creativity and optimism",
      "Enhances wisdom",
    ],
    description:
      "Yellow Agate bracelet for Moolank 3 (born 3, 12, 21, 30). Ruled by Jupiter, amplifies creativity, prosperity and wisdom.",
    descriptionHi:
      "मूलांक ३ (3, 12, 21, 30 को जन्मे) के लिए पीला अगेट ब्रेसलेट। गुरु द्वारा शासित, रचनात्मकता, समृद्धि और ज्ञान को बढ़ाता है।",
    emiEligible: false,
  },
  {
    id: "nm-004",
    sku: "NM004",
    name: "Green Aventurine Moolank 4 Bracelet",
    nameHi: "हरा एवेंचुरिन मूलांक ४ ब्रेसलेट",
    price: 649,
    mrp: 949,
    category: "moolank",
    moolank: [4],
    stone: "Green Aventurine",
    emoji: "💚",
    benefits: [
      "Stabilizes emotions",
      "Brings luck and opportunity",
      "Grounds energy for practical results",
    ],
    description:
      "Green Aventurine bracelet for Moolank 4 (born 4, 13, 22, 31). Ruled by Rahu/Uranus, brings stability, luck, and new opportunities.",
    descriptionHi:
      "मूलांक ४ (4, 13, 22, 31 को जन्मे) के लिए हरा एवेंचुरिन ब्रेसलेट। राहु द्वारा शासित, स्थिरता, भाग्य और नए अवसर लाता है।",
    badge: "New Arrival",
    isNew: true,
    emiEligible: false,
  },
  {
    id: "nm-005",
    sku: "NM005",
    name: "Blue Sapphire String Moolank 5",
    nameHi: "नीला नीलम धागा मूलांक ५",
    price: 1299,
    mrp: 1799,
    category: "moolank",
    moolank: [5],
    stone: "Blue Sapphire",
    emoji: "💙",
    benefits: [
      "Sharpens intellect and communication",
      "Increases adaptability",
      "Protects during travel",
    ],
    description:
      "Blue Sapphire String bracelet for Moolank 5 (born 5, 14, 23). Ruled by Mercury, enhances communication, wit, and adaptability.",
    descriptionHi:
      "मूलांक ५ (5, 14, 23 को जन्मे) के लिए नीला नीलम ब्रेसलेट। बुध द्वारा शासित, संचार, बुद्धि और अनुकूलनशीलता को बढ़ाता है।",
    badge: "Bestseller",
    emiEligible: true,
  },
  {
    id: "nm-006",
    sku: "NM006",
    name: "Emerald Chip Moolank 6 Bracelet",
    nameHi: "पन्ना चिप मूलांक ६ ब्रेसलेट",
    price: 1099,
    mrp: 1499,
    category: "moolank",
    moolank: [6],
    stone: "Emerald",
    emoji: "💚",
    benefits: [
      "Enhances love and romance",
      "Promotes beauty and creativity",
      "Brings harmony in relationships",
    ],
    description:
      "Emerald Chip bracelet for Moolank 6 (born 6, 15, 24). Ruled by Venus, fosters love, beauty, creativity, and harmonious relationships.",
    descriptionHi:
      "मूलांक ६ (6, 15, 24 को जन्मे) के लिए पन्ना चिप ब्रेसलेट। शुक्र द्वारा शासित, प्रेम, सौंदर्य, रचनात्मकता और सामंजस्यपूर्ण संबंध बढ़ाता है।",
    emiEligible: true,
  },
  {
    id: "nm-007",
    sku: "NM007",
    name: "Cat's Eye Chip Moolank 7 Bracelet",
    nameHi: "लहसुनिया चिप मूलांक ७ ब्रेसलेट",
    price: 999,
    mrp: 1399,
    category: "moolank",
    moolank: [7],
    stone: "Cat's Eye",
    emoji: "🟡",
    benefits: [
      "Deepens spiritual insight",
      "Enhances psychic abilities",
      "Provides protection from negative energies",
    ],
    description:
      "Cat's Eye Chip bracelet for Moolank 7 (born 7, 16, 25). Ruled by Ketu, deepens spiritual awareness and psychic sensitivity.",
    descriptionHi:
      "मूलांक ७ (7, 16, 25 को जन्मे) के लिए लहसुनिया चिप ब्रेसलेट। केतु द्वारा शासित, आध्यात्मिक जागरूकता और मानसिक संवेदनशीलता गहरी करता है।",
    badge: "Trending",
    emiEligible: true,
  },
  {
    id: "nm-008",
    sku: "NM008",
    name: "Red Coral Chip Moolank 8 Bracelet",
    nameHi: "लाल मूंगा चिप मूलांक ८ ब्रेसलेट",
    price: 849,
    mrp: 1199,
    category: "moolank",
    moolank: [8],
    stone: "Red Coral",
    emoji: "🔴",
    benefits: [
      "Builds discipline and patience",
      "Removes Saturn-related obstacles",
      "Strengthens determination",
    ],
    description:
      "Red Coral Chip bracelet for Moolank 8 (born 8, 17, 26). Ruled by Saturn, builds discipline, patience, and removes life obstacles.",
    descriptionHi:
      "मूलांक ८ (8, 17, 26 को जन्मे) के लिए लाल मूंगा चिप ब्रेसलेट। शनि द्वारा शासित, अनुशासन, धैर्य बढ़ाता है और जीवन की बाधाओं को दूर करता है।",
    emiEligible: true,
  },
  {
    id: "nm-009",
    sku: "NM009",
    name: "Ruby Chip Moolank 9 Bracelet",
    nameHi: "माणिक्य चिप मूलांक ९ ब्रेसलेट",
    price: 1199,
    mrp: 1699,
    category: "moolank",
    moolank: [9],
    stone: "Ruby",
    emoji: "❤️",
    benefits: [
      "Enhances courage and passion",
      "Boosts energy and vitality",
      "Promotes leadership qualities",
    ],
    description:
      "Ruby Chip bracelet for Moolank 9 (born 9, 18, 27). Ruled by Mars, amplifies courage, passion, and dynamic energy.",
    descriptionHi:
      "मूलांक ९ (9, 18, 27 को जन्मे) के लिए माणिक्य चिप ब्रेसलेट। मंगल द्वारा शासित, साहस, जुनून और गतिशील ऊर्जा को बढ़ाता है।",
    badge: "Bestseller",
    emiEligible: true,
  },
];

// ─── Category: Personal Year 1–9 ──────────────────────────────────────────────
export const PERSONAL_YEAR_BRACELETS: NumerologyBracelet[] = [
  {
    id: "nyp-001",
    sku: "NYP001",
    name: "Sunstone Personal Year 1 Bracelet",
    nameHi: "सनस्टोन व्यक्तिगत वर्ष १ ब्रेसलेट",
    price: 749,
    mrp: 1099,
    category: "personal-year",
    personalYear: [1],
    stone: "Sunstone",
    emoji: "☀️",
    benefits: [
      "New beginnings energy",
      "Boosts initiative and leadership",
      "Clears path for fresh starts",
    ],
    description:
      "Sunstone bracelet for Personal Year 1 — a year of new beginnings, independence and planting seeds for the future.",
    descriptionHi:
      "व्यक्तिगत वर्ष १ के लिए सनस्टोन ब्रेसलेट — नई शुरुआत, स्वतंत्रता और भविष्य के बीज बोने का वर्ष।",
    badge: "New Arrival",
    isNew: true,
    emiEligible: true,
  },
  {
    id: "nyp-002",
    sku: "NYP002",
    name: "Moonstone Personal Year 2 Bracelet",
    nameHi: "मूनस्टोन व्यक्तिगत वर्ष २ ब्रेसलेट",
    price: 799,
    mrp: 1149,
    category: "personal-year",
    personalYear: [2],
    stone: "Moonstone",
    emoji: "🌙",
    benefits: [
      "Supports patience and cooperation",
      "Enhances intuition",
      "Harmonizes partnerships",
    ],
    description:
      "Moonstone bracelet for Personal Year 2 — a year of patience, cooperation, and developing relationships.",
    descriptionHi:
      "व्यक्तिगत वर्ष २ के लिए मूनस्टोन ब्रेसलेट — धैर्य, सहयोग और संबंधों को विकसित करने का वर्ष।",
    emiEligible: true,
  },
  {
    id: "nyp-003",
    sku: "NYP003",
    name: "Citrine Personal Year 3 Bracelet",
    nameHi: "सिट्रिन व्यक्तिगत वर्ष ३ ब्रेसलेट",
    price: 699,
    mrp: 999,
    category: "personal-year",
    personalYear: [3],
    stone: "Citrine",
    emoji: "✨",
    benefits: [
      "Amplifies joy and creativity",
      "Boosts self-expression",
      "Attracts social opportunities",
    ],
    description:
      "Citrine bracelet for Personal Year 3 — a year of creativity, self-expression, and social expansion.",
    descriptionHi:
      "व्यक्तिगत वर्ष ३ के लिए सिट्रिन ब्रेसलेट — रचनात्मकता, आत्म-अभिव्यक्ति और सामाजिक विस्तार का वर्ष।",
    badge: "Trending",
    emiEligible: false,
  },
  {
    id: "nyp-004",
    sku: "NYP004",
    name: "Hematite Personal Year 4 Bracelet",
    nameHi: "हेमेटाइट व्यक्तिगत वर्ष ४ ब्रेसलेट",
    price: 549,
    mrp: 799,
    category: "personal-year",
    personalYear: [4],
    stone: "Hematite",
    emoji: "⚫",
    benefits: [
      "Grounds energy for hard work",
      "Promotes discipline and organization",
      "Stabilizes foundation-building",
    ],
    description:
      "Hematite bracelet for Personal Year 4 — a year of hard work, discipline, and building solid foundations.",
    descriptionHi:
      "व्यक्तिगत वर्ष ४ के लिए हेमेटाइट ब्रेसलेट — कड़ी मेहनत, अनुशासन और मजबूत नींव बनाने का वर्ष।",
    emiEligible: false,
  },
  {
    id: "nyp-005",
    sku: "NYP005",
    name: "Turquoise Personal Year 5 Bracelet",
    nameHi: "फ़िरोज़ा व्यक्तिगत वर्ष ५ ब्रेसलेट",
    price: 799,
    mrp: 1149,
    category: "personal-year",
    personalYear: [5],
    stone: "Turquoise",
    emoji: "🔵",
    benefits: [
      "Supports freedom and adventure",
      "Enhances adaptability",
      "Clears blocks for change",
    ],
    description:
      "Turquoise bracelet for Personal Year 5 — a year of change, freedom, and exciting new adventures.",
    descriptionHi:
      "व्यक्तिगत वर्ष ५ के लिए फ़िरोज़ा ब्रेसलेट — परिवर्तन, स्वतंत्रता और रोमांचकारी नए रोमांच का वर्ष।",
    badge: "Bestseller",
    emiEligible: true,
  },
  {
    id: "nyp-006",
    sku: "NYP006",
    name: "Rose Quartz Personal Year 6 Bracelet",
    nameHi: "रोज़ क्वार्ट्ज़ व्यक्तिगत वर्ष ६ ब्रेसलेट",
    price: 649,
    mrp: 949,
    category: "personal-year",
    personalYear: [6],
    stone: "Rose Quartz",
    emoji: "🌸",
    benefits: [
      "Deepens love and family bonds",
      "Promotes responsibility and nurturing",
      "Heals relationships",
    ],
    description:
      "Rose Quartz bracelet for Personal Year 6 — a year of love, family, responsibility, and service.",
    descriptionHi:
      "व्यक्तिगत वर्ष ६ के लिए रोज़ क्वार्ट्ज़ ब्रेसलेट — प्रेम, परिवार, जिम्मेदारी और सेवा का वर्ष।",
    emiEligible: false,
  },
  {
    id: "nyp-007",
    sku: "NYP007",
    name: "Amethyst Personal Year 7 Bracelet",
    nameHi: "एमेथिस्ट व्यक्तिगत वर्ष ७ ब्रेसलेट",
    price: 899,
    mrp: 1299,
    category: "personal-year",
    personalYear: [7],
    stone: "Amethyst",
    emoji: "💜",
    benefits: [
      "Deepens introspection and analysis",
      "Enhances spiritual insight",
      "Supports meditation practice",
    ],
    description:
      "Amethyst bracelet for Personal Year 7 — a year of inner reflection, spiritual growth, and deep analysis.",
    descriptionHi:
      "व्यक्तिगत वर्ष ७ के लिए एमेथिस्ट ब्रेसलेट — आंतरिक प्रतिबिंब, आध्यात्मिक विकास और गहन विश्लेषण का वर्ष।",
    badge: "Trending",
    emiEligible: true,
  },
  {
    id: "nyp-008",
    sku: "NYP008",
    name: "Obsidian Personal Year 8 Bracelet",
    nameHi: "ओब्सीडियन व्यक्तिगत वर्ष ८ ब्रेसलेट",
    price: 699,
    mrp: 999,
    category: "personal-year",
    personalYear: [8],
    stone: "Obsidian",
    emoji: "🖤",
    benefits: [
      "Attracts material success",
      "Amplifies power and authority",
      "Protects during ambitious pursuits",
    ],
    description:
      "Obsidian bracelet for Personal Year 8 — a year of material achievement, power, and financial success.",
    descriptionHi:
      "व्यक्तिगत वर्ष ८ के लिए ओब्सीडियन ब्रेसलेट — भौतिक उपलब्धि, शक्ति और वित्तीय सफलता का वर्ष।",
    emiEligible: false,
  },
  {
    id: "nyp-009",
    sku: "NYP009",
    name: "Clear Quartz Personal Year 9 Bracelet",
    nameHi: "स्पष्ट क्वार्ट्ज़ व्यक्तिगत वर्ष ९ ब्रेसलेट",
    price: 749,
    mrp: 1099,
    category: "personal-year",
    personalYear: [9],
    stone: "Clear Quartz",
    emoji: "🔮",
    benefits: [
      "Supports completion and release",
      "Amplifies spiritual wisdom",
      "Clears for new cycles",
    ],
    description:
      "Clear Quartz bracelet for Personal Year 9 — a year of completion, release, and preparing for a new 9-year cycle.",
    descriptionHi:
      "व्यक्तिगत वर्ष ९ के लिए स्पष्ट क्वार्ट्ज़ ब्रेसलेट — पूर्णता, मुक्ति और एक नए ९-वर्षीय चक्र की तैयारी का वर्ष।",
    badge: "New Arrival",
    isNew: true,
    emiEligible: true,
  },
];

// ─── Category: Natural Purpose (7 products) ────────────────────────────────────
export const NATURAL_PURPOSE_BRACELETS: NumerologyBracelet[] = [
  {
    id: "nnp-001",
    sku: "NNP001",
    name: "Anxiety Relief Crystal Bracelet",
    nameHi: "चिंता राहत क्रिस्टल ब्रेसलेट",
    price: 849,
    mrp: 1199,
    category: "natural-purpose",
    purpose: "Anxiety Relief",
    stone: "Amethyst + Blue Lace Agate",
    emoji: "💜",
    benefits: [
      "Calms anxiety and stress",
      "Promotes emotional stability",
      "Soothes nervous system",
    ],
    description:
      "Combination of Amethyst and Blue Lace Agate specifically selected to calm anxiety, reduce stress, and promote emotional balance.",
    descriptionHi:
      "एमेथिस्ट और ब्लू लेस अगेट का संयोजन विशेष रूप से चिंता को शांत करने, तनाव कम करने और भावनात्मक संतुलन को बढ़ावा देने के लिए चुना गया।",
    badge: "Bestseller",
    emiEligible: true,
  },
  {
    id: "nnp-002",
    sku: "NNP002",
    name: "Love & Relationships Bracelet",
    nameHi: "प्रेम और रिश्ते ब्रेसलेट",
    price: 799,
    mrp: 1149,
    category: "natural-purpose",
    purpose: "Love & Relationships",
    stone: "Rose Quartz + Rhodonite",
    emoji: "🌹",
    benefits: [
      "Attracts loving relationships",
      "Opens heart chakra",
      "Heals emotional wounds",
    ],
    description:
      "Rose Quartz and Rhodonite combination to open the heart chakra, attract love, and heal past relationship wounds.",
    descriptionHi:
      "रोज़ क्वार्ट्ज़ और रोडोनाइट का संयोजन हृदय चक्र को खोलने, प्रेम को आकर्षित करने और पुराने रिश्तों के घावों को ठीक करने के लिए।",
    emiEligible: true,
  },
  {
    id: "nnp-003",
    sku: "NNP003",
    name: "Money Magnet Bracelet",
    nameHi: "मनी मैग्नेट ब्रेसलेट",
    price: 999,
    mrp: 1399,
    category: "natural-purpose",
    purpose: "Money Magnet",
    stone: "Pyrite + Citrine + Green Aventurine",
    emoji: "💰",
    benefits: [
      "Attracts wealth and abundance",
      "Boosts financial luck",
      "Removes money blocks",
    ],
    description:
      "Triple combination of Pyrite, Citrine, and Green Aventurine — the ultimate wealth-attraction bracelet for financial abundance.",
    descriptionHi:
      "पाइराइट, सिट्रिन और हरे एवेंचुरिन का त्रि-संयोजन — वित्तीय प्रचुरता के लिए अंतिम धन-आकर्षण ब्रेसलेट।",
    badge: "Bestseller",
    emiEligible: true,
  },
  {
    id: "nnp-004",
    sku: "NNP004",
    name: "Protection Bracelet",
    nameHi: "सुरक्षा ब्रेसलेट",
    price: 749,
    mrp: 1099,
    category: "natural-purpose",
    purpose: "Protection",
    stone: "Black Tourmaline + Obsidian",
    emoji: "🛡️",
    benefits: [
      "Shields from negative energies",
      "Wards off evil eye",
      "Creates protective aura",
    ],
    description:
      "Black Tourmaline and Obsidian combined for powerful psychic protection against negative energies, evil eye, and psychic attacks.",
    descriptionHi:
      "नकारात्मक ऊर्जाओं, बुरी नजर और मानसिक हमलों के खिलाफ शक्तिशाली मानसिक सुरक्षा के लिए ब्लैक टूमालाइन और ओब्सीडियन का संयोजन।",
    badge: "Trending",
    emiEligible: true,
  },
  {
    id: "nnp-005",
    sku: "NNP005",
    name: "Confidence Booster Bracelet",
    nameHi: "आत्मविश्वास बढ़ाने वाला ब्रेसलेट",
    price: 699,
    mrp: 999,
    category: "natural-purpose",
    purpose: "Confidence",
    stone: "Tiger Eye + Carnelian",
    emoji: "🐯",
    benefits: [
      "Builds self-confidence and courage",
      "Boosts motivation and drive",
      "Overcomes fear and self-doubt",
    ],
    description:
      "Tiger Eye and Carnelian together create a powerful confidence-building bracelet for those needing courage and motivation.",
    descriptionHi:
      "टाइगर आई और कार्नेलियन मिलकर एक शक्तिशाली आत्मविश्वास बढ़ाने वाला ब्रेसलेट बनाते हैं उन लोगों के लिए जिन्हें साहस और प्रेरणा चाहिए।",
    emiEligible: false,
  },
  {
    id: "nnp-006",
    sku: "NNP006",
    name: "Health Healing Bracelet",
    nameHi: "स्वास्थ्य उपचार ब्रेसलेट",
    price: 849,
    mrp: 1199,
    category: "natural-purpose",
    purpose: "Health Healing",
    stone: "Malachite + Bloodstone + Clear Quartz",
    emoji: "💚",
    benefits: [
      "Supports physical healing",
      "Boosts immune system",
      "Promotes overall wellbeing",
    ],
    description:
      "Malachite, Bloodstone, and Clear Quartz trinity for holistic health support, immune strengthening, and physical healing acceleration.",
    descriptionHi:
      "समग्र स्वास्थ्य सहायता, प्रतिरक्षा मजबूती और शारीरिक उपचार त्वरण के लिए मैलाकाइट, ब्लडस्टोन और स्पष्ट क्वार्ट्ज़ की त्रिमूर्ति।",
    emiEligible: true,
  },
  {
    id: "nnp-007",
    sku: "NNP007",
    name: "Spiritual Awakening Bracelet",
    nameHi: "आध्यात्मिक जागरण ब्रेसलेट",
    price: 999,
    mrp: 1399,
    category: "natural-purpose",
    purpose: "Spiritual Awakening",
    stone: "Labradorite + Kyanite + Selenite",
    emoji: "🌟",
    benefits: [
      "Activates third eye chakra",
      "Deepens meditation and spiritual practice",
      "Connects to higher consciousness",
    ],
    description:
      "Labradorite, Kyanite, and Selenite combined to activate spiritual awakening, deepen meditation, and connect to higher realms of consciousness.",
    descriptionHi:
      "आध्यात्मिक जागरण को सक्रिय करने, ध्यान को गहरा करने और चेतना के उच्च क्षेत्रों से जुड़ने के लिए लैब्राडोराइट, काइनाइट और सेलेनाइट का संयोजन।",
    badge: "New Arrival",
    isNew: true,
    emiEligible: true,
  },
];

// ─── Category: Single Crystal (44 products) ────────────────────────────────────
const singleCrystalData: Array<{
  sku: string;
  name: string;
  nameHi: string;
  stone: string;
  price: number;
  mrp: number;
  emoji: string;
  badge?: string;
  isNew?: boolean;
  benefits: string[];
  description: string;
  descriptionHi: string;
}> = [
  {
    sku: "NSC001",
    name: "Amethyst Bracelet",
    nameHi: "एमेथिस्ट ब्रेसलेट",
    stone: "Amethyst",
    price: 599,
    mrp: 899,
    emoji: "💜",
    badge: "Bestseller",
    benefits: [
      "Calms mind and reduces stress",
      "Enhances intuition",
      "Promotes restful sleep",
    ],
    description:
      "Natural Amethyst bracelet for calm, clarity, and spiritual connection.",
    descriptionHi: "शांति, स्पष्टता और आध्यात्मिक संबंध के लिए प्राकृतिक एमेथिस्ट ब्रेसलेट।",
  },
  {
    sku: "NSC002",
    name: "Rose Quartz Bracelet",
    nameHi: "रोज़ क्वार्ट्ज़ ब्रेसलेट",
    stone: "Rose Quartz",
    price: 549,
    mrp: 849,
    emoji: "🌸",
    badge: "Bestseller",
    benefits: [
      "Opens heart chakra",
      "Attracts unconditional love",
      "Heals emotional wounds",
    ],
    description:
      "Rose Quartz bracelet to open the heart and attract loving energy.",
    descriptionHi: "हृदय खोलने और प्रेम ऊर्जा आकर्षित करने के लिए रोज़ क्वार्ट्ज़ ब्रेसलेट।",
  },
  {
    sku: "NSC003",
    name: "Tiger Eye Bracelet",
    nameHi: "टाइगर आई ब्रेसलेट",
    stone: "Tiger Eye",
    price: 649,
    mrp: 949,
    emoji: "🐯",
    badge: "Trending",
    benefits: ["Boosts confidence", "Sharpens focus", "Attracts good luck"],
    description: "Tiger Eye bracelet for courage, focus, and good fortune.",
    descriptionHi: "साहस, ध्यान और सौभाग्य के लिए टाइगर आई ब्रेसलेट।",
  },
  {
    sku: "NSC004",
    name: "Black Tourmaline Bracelet",
    nameHi: "ब्लैक टूमालाइन ब्रेसलेट",
    stone: "Black Tourmaline",
    price: 699,
    mrp: 999,
    emoji: "🖤",
    badge: "Bestseller",
    benefits: [
      "Provides strong protection",
      "Absorbs negative energy",
      "Grounds and balances",
    ],
    description: "Black Tourmaline bracelet for powerful psychic protection.",
    descriptionHi: "शक्तिशाली मानसिक सुरक्षा के लिए ब्लैक टूमालाइन ब्रेसलेट।",
  },
  {
    sku: "NSC005",
    name: "Lapis Lazuli Bracelet",
    nameHi: "लापीस लाज़ुली ब्रेसलेट",
    stone: "Lapis Lazuli",
    price: 799,
    mrp: 1149,
    emoji: "💙",
    benefits: [
      "Enhances wisdom and truth",
      "Activates third eye",
      "Promotes self-expression",
    ],
    description: "Lapis Lazuli bracelet for wisdom, truth, and mental clarity.",
    descriptionHi: "ज्ञान, सत्य और मानसिक स्पष्टता के लिए लापीस लाज़ुली ब्रेसलेट।",
  },
  {
    sku: "NSC006",
    name: "Pyrite Bracelet",
    nameHi: "पाइराइट ब्रेसलेट",
    stone: "Pyrite",
    price: 749,
    mrp: 1099,
    emoji: "✨",
    badge: "Bestseller",
    benefits: [
      "Attracts wealth and success",
      "Boosts confidence",
      "Shields from negativity",
    ],
    description:
      "Pyrite (Fool's Gold) bracelet for wealth attraction and confidence.",
    descriptionHi: "धन आकर्षण और आत्मविश्वास के लिए पाइराइट (मूर्खों का सोना) ब्रेसलेट।",
  },
  {
    sku: "NSC007",
    name: "Citrine Bracelet",
    nameHi: "सिट्रिन ब्रेसलेट",
    stone: "Citrine",
    price: 649,
    mrp: 949,
    emoji: "🌟",
    badge: "Trending",
    benefits: [
      "Attracts abundance",
      "Boosts creativity and optimism",
      "Dispels negative energy",
    ],
    description: "Citrine bracelet — the Merchant Stone for abundance and joy.",
    descriptionHi: "प्रचुरता और खुशी के लिए सिट्रिन ब्रेसलेट — व्यापारी पत्थर।",
  },
  {
    sku: "NSC008",
    name: "Clear Quartz Bracelet",
    nameHi: "स्पष्ट क्वार्ट्ज़ ब्रेसलेट",
    stone: "Clear Quartz",
    price: 499,
    mrp: 749,
    emoji: "🔮",
    benefits: [
      "Amplifies all intentions",
      "Purifies aura",
      "Enhances clarity and focus",
    ],
    description:
      "Clear Quartz bracelet — the Master Healer that amplifies energy and intentions.",
    descriptionHi:
      "स्पष्ट क्वार्ट्ज़ ब्रेसलेट — मास्टर हीलर जो ऊर्जा और इरादों को बढ़ाता है।",
  },
  {
    sku: "NSC009",
    name: "Moonstone Bracelet",
    nameHi: "मूनस्टोन ब्रेसलेट",
    stone: "Moonstone",
    price: 849,
    mrp: 1199,
    emoji: "🌙",
    badge: "New Arrival",
    isNew: true,
    benefits: [
      "Enhances intuition",
      "Balances emotions",
      "Supports new beginnings",
    ],
    description:
      "Moonstone bracelet for emotional balance, intuition, and new beginnings.",
    descriptionHi: "भावनात्मक संतुलन, अंतर्ज्ञान और नई शुरुआत के लिए मूनस्टोन ब्रेसलेट।",
  },
  {
    sku: "NSC010",
    name: "Obsidian Bracelet",
    nameHi: "ओब्सीडियन ब्रेसलेट",
    stone: "Obsidian",
    price: 599,
    mrp: 899,
    emoji: "🖤",
    benefits: [
      "Strong protective shield",
      "Releases negativity",
      "Grounds and centers energy",
    ],
    description:
      "Obsidian bracelet for grounding, protection, and releasing past trauma.",
    descriptionHi:
      "भू-संपर्क, सुरक्षा और पुराने आघात को मुक्त करने के लिए ओब्सीडियन ब्रेसलेट।",
  },
  {
    sku: "NSC011",
    name: "Malachite Bracelet",
    nameHi: "मैलाकाइट ब्रेसलेट",
    stone: "Malachite",
    price: 899,
    mrp: 1299,
    emoji: "💚",
    benefits: [
      "Supports transformation",
      "Protects during travel",
      "Amplifies heart energy",
    ],
    description:
      "Malachite bracelet — the Stone of Transformation for growth and change.",
    descriptionHi: "मैलाकाइट ब्रेसलेट — विकास और परिवर्तन के लिए परिवर्तन का पत्थर।",
  },
  {
    sku: "NSC012",
    name: "Labradorite Bracelet",
    nameHi: "लैब्राडोराइट ब्रेसलेट",
    stone: "Labradorite",
    price: 999,
    mrp: 1399,
    emoji: "🌈",
    badge: "Trending",
    benefits: [
      "Awakens magical abilities",
      "Enhances psychic powers",
      "Protects aura",
    ],
    description:
      "Labradorite bracelet for magical transformation, psychic enhancement, and aura protection.",
    descriptionHi:
      "जादुई परिवर्तन, मानसिक वृद्धि और आभा सुरक्षा के लिए लैब्राडोराइट ब्रेसलेट।",
  },
  {
    sku: "NSC013",
    name: "Red Jasper Bracelet",
    nameHi: "लाल जैस्पर ब्रेसलेट",
    stone: "Red Jasper",
    price: 549,
    mrp: 849,
    emoji: "🔴",
    benefits: [
      "Boosts stamina and energy",
      "Grounds scattered energy",
      "Activates root chakra",
    ],
    description:
      "Red Jasper bracelet for stamina, grounding, and root chakra activation.",
    descriptionHi: "सहनशक्ति, भू-संपर्क और मूल चक्र सक्रियण के लिए लाल जैस्पर ब्रेसलेट।",
  },
  {
    sku: "NSC014",
    name: "Amazonite Bracelet",
    nameHi: "अमेजोनाइट ब्रेसलेट",
    stone: "Amazonite",
    price: 649,
    mrp: 949,
    emoji: "💚",
    benefits: ["Soothes anxiety", "Enhances communication", "Promotes harmony"],
    description:
      "Amazonite bracelet for soothing anxiety, clear communication, and balanced energy.",
    descriptionHi:
      "चिंता शांत करने, स्पष्ट संचार और संतुलित ऊर्जा के लिए अमेजोनाइट ब्रेसलेट।",
  },
  {
    sku: "NSC015",
    name: "Sodalite Bracelet",
    nameHi: "सोडालाइट ब्रेसलेट",
    stone: "Sodalite",
    price: 599,
    mrp: 899,
    emoji: "🔵",
    benefits: [
      "Enhances logic and truth",
      "Calms overactive mind",
      "Promotes self-trust",
    ],
    description:
      "Sodalite bracelet for logic, truth-seeking, and calming an overactive mind.",
    descriptionHi:
      "तर्क, सत्य-खोज और अत्यधिक सक्रिय मन को शांत करने के लिए सोडालाइट ब्रेसलेट।",
  },
  {
    sku: "NSC016",
    name: "Rhodonite Bracelet",
    nameHi: "रोडोनाइट ब्रेसलेट",
    stone: "Rhodonite",
    price: 699,
    mrp: 999,
    emoji: "🌹",
    badge: "New Arrival",
    isNew: true,
    benefits: [
      "Heals emotional wounds",
      "Promotes forgiveness",
      "Opens heart to compassion",
    ],
    description:
      "Rhodonite bracelet for emotional healing, forgiveness, and compassionate love.",
    descriptionHi: "भावनात्मक उपचार, क्षमा और करुणामय प्रेम के लिए रोडोनाइट ब्रेसलेट।",
  },
  {
    sku: "NSC017",
    name: "Turquoise Bracelet",
    nameHi: "फ़िरोज़ा ब्रेसलेट",
    stone: "Turquoise",
    price: 849,
    mrp: 1199,
    emoji: "🔵",
    badge: "Bestseller",
    benefits: [
      "Protects during travel",
      "Enhances communication",
      "Brings luck and prosperity",
    ],
    description:
      "Turquoise bracelet — the ancient protection and luck stone for travelers and communicators.",
    descriptionHi:
      "फ़िरोज़ा ब्रेसलेट — यात्रियों और संचारकों के लिए प्राचीन सुरक्षा और भाग्य का पत्थर।",
  },
  {
    sku: "NSC018",
    name: "Hematite Bracelet",
    nameHi: "हेमेटाइट ब्रेसलेट",
    stone: "Hematite",
    price: 499,
    mrp: 749,
    emoji: "⚫",
    benefits: [
      "Grounds and protects",
      "Boosts focus and concentration",
      "Balances root chakra",
    ],
    description:
      "Hematite bracelet for powerful grounding, focus, and protective energy.",
    descriptionHi: "शक्तिशाली भू-संपर्क, ध्यान और सुरक्षात्मक ऊर्जा के लिए हेमेटाइट ब्रेसलेट।",
  },
  {
    sku: "NSC019",
    name: "Aquamarine Bracelet",
    nameHi: "एक्वामेरीन ब्रेसलेट",
    stone: "Aquamarine",
    price: 1099,
    mrp: 1499,
    emoji: "🌊",
    badge: "Trending",
    benefits: [
      "Enhances courage and clarity",
      "Promotes calm communication",
      "Protects at sea",
    ],
    description:
      "Aquamarine bracelet for courage, clarity, and calm communication.",
    descriptionHi: "साहस, स्पष्टता और शांत संचार के लिए एक्वामेरीन ब्रेसलेट।",
  },
  {
    sku: "NSC020",
    name: "Fluorite Bracelet",
    nameHi: "फ्लोराइट ब्रेसलेट",
    stone: "Fluorite",
    price: 699,
    mrp: 999,
    emoji: "💚",
    benefits: [
      "Clears mental confusion",
      "Enhances focus and study",
      "Absorbs negative energy",
    ],
    description:
      "Fluorite bracelet — the Genius Stone for mental clarity, focus, and learning.",
    descriptionHi:
      "फ्लोराइट ब्रेसलेट — मानसिक स्पष्टता, ध्यान और सीखने के लिए प्रतिभा पत्थर।",
  },
  {
    sku: "NSC021",
    name: "Sunstone Bracelet",
    nameHi: "सनस्टोन ब्रेसलेट",
    stone: "Sunstone",
    price: 899,
    mrp: 1299,
    emoji: "☀️",
    badge: "New Arrival",
    isNew: true,
    benefits: [
      "Boosts joy and vitality",
      "Inspires leadership",
      "Clears negativity",
    ],
    description:
      "Sunstone bracelet for joy, vitality, and inspiring leadership energy.",
    descriptionHi: "खुशी, जीवन शक्ति और प्रेरणादायक नेतृत्व ऊर्जा के लिए सनस्टोन ब्रेसलेट।",
  },
  {
    sku: "NSC022",
    name: "Carnelian Bracelet",
    nameHi: "कार्नेलियन ब्रेसलेट",
    stone: "Carnelian",
    price: 599,
    mrp: 899,
    emoji: "🟠",
    badge: "Bestseller",
    benefits: [
      "Boosts creativity and motivation",
      "Activates sacral chakra",
      "Inspires courage",
    ],
    description:
      "Carnelian bracelet for creativity, motivation, and sacral chakra activation.",
    descriptionHi: "रचनात्मकता, प्रेरणा और त्रिक चक्र सक्रियण के लिए कार्नेलियन ब्रेसलेट।",
  },
  {
    sku: "NSC023",
    name: "Angelite Bracelet",
    nameHi: "एंजेलाइट ब्रेसलेट",
    stone: "Angelite",
    price: 849,
    mrp: 1199,
    emoji: "👼",
    badge: "Trending",
    benefits: [
      "Connects to angelic realms",
      "Promotes peace and serenity",
      "Enhances spiritual communication",
    ],
    description:
      "Angelite bracelet for connecting with angels, peace, and spiritual communication.",
    descriptionHi: "देवदूतों से जुड़ने, शांति और आध्यात्मिक संचार के लिए एंजेलाइट ब्रेसलेट।",
  },
  {
    sku: "NSC024",
    name: "Peridot Bracelet",
    nameHi: "पेरिडॉट ब्रेसलेट",
    stone: "Peridot",
    price: 799,
    mrp: 1149,
    emoji: "💚",
    benefits: [
      "Attracts abundance",
      "Releases negative patterns",
      "Promotes confidence",
    ],
    description:
      "Peridot bracelet for abundance, positive transformation, and confidence.",
    descriptionHi: "प्रचुरता, सकारात्मक परिवर्तन और आत्मविश्वास के लिए पेरिडॉट ब्रेसलेट।",
  },
  {
    sku: "NSC025",
    name: "Opalite Bracelet",
    nameHi: "ओपलाइट ब्रेसलेट",
    stone: "Opalite",
    price: 549,
    mrp: 849,
    emoji: "🌟",
    benefits: [
      "Enhances spiritual communication",
      "Promotes optimism",
      "Calms emotions",
    ],
    description:
      "Opalite bracelet for spiritual communication, optimism, and emotional calm.",
    descriptionHi: "आध्यात्मिक संचार, आशावाद और भावनात्मक शांति के लिए ओपलाइट ब्रेसलेट।",
  },
  {
    sku: "NSC026",
    name: "Kyanite Bracelet",
    nameHi: "काइनाइट ब्रेसलेट",
    stone: "Kyanite",
    price: 899,
    mrp: 1299,
    emoji: "💙",
    badge: "New Arrival",
    isNew: true,
    benefits: [
      "Aligns all chakras",
      "Never needs cleansing",
      "Enhances meditation",
    ],
    description:
      "Kyanite bracelet — the only crystal that never needs cleansing. Aligns all chakras instantly.",
    descriptionHi:
      "काइनाइट ब्रेसलेट — एकमात्र क्रिस्टल जिसे कभी सफाई की आवश्यकता नहीं होती। सभी चक्रों को तुरंत संरेखित करता है।",
  },
  {
    sku: "NSC027",
    name: "Lepidolite Bracelet",
    nameHi: "लेपिडोलाइट ब्रेसलेट",
    stone: "Lepidolite",
    price: 799,
    mrp: 1149,
    emoji: "💜",
    benefits: [
      "Natural lithium content calms anxiety",
      "Promotes restful sleep",
      "Supports transition and change",
    ],
    description:
      "Lepidolite bracelet — the natural anxiety relief crystal with lithium-rich composition.",
    descriptionHi:
      "लेपिडोलाइट ब्रेसलेट — लिथियम-समृद्ध संरचना के साथ प्राकृतिक चिंता राहत क्रिस्टल।",
  },
  {
    sku: "NSC028",
    name: "Prehnite Bracelet",
    nameHi: "प्रेहनाइट ब्रेसलेट",
    stone: "Prehnite",
    price: 699,
    mrp: 999,
    emoji: "💚",
    benefits: [
      "Promotes unconditional love",
      "Enhances precognition",
      "Heals the healer",
    ],
    description:
      "Prehnite bracelet for unconditional love, healing, and spiritual foresight.",
    descriptionHi:
      "बिना शर्त प्यार, उपचार और आध्यात्मिक दूरदर्शिता के लिए प्रेहनाइट ब्रेसलेट।",
  },
  {
    sku: "NSC029",
    name: "Garnet Bracelet",
    nameHi: "गार्नेट ब्रेसलेट",
    stone: "Garnet",
    price: 899,
    mrp: 1299,
    emoji: "❤️",
    badge: "Trending",
    benefits: [
      "Ignites passion and energy",
      "Boosts vitality",
      "Attracts love and commitment",
    ],
    description:
      "Garnet bracelet for passion, vitality, and deep committed love.",
    descriptionHi: "जुनून, जीवन शक्ति और गहरे प्रतिबद्ध प्रेम के लिए गार्नेट ब्रेसलेट।",
  },
  {
    sku: "NSC030",
    name: "Unakite Bracelet",
    nameHi: "युनाकाइट ब्रेसलेट",
    stone: "Unakite",
    price: 549,
    mrp: 849,
    emoji: "🌿",
    benefits: [
      "Balances emotions and spirituality",
      "Supports pregnancy and fertility",
      "Promotes patient persistence",
    ],
    description:
      "Unakite bracelet for emotional balance, fertility support, and patient determination.",
    descriptionHi:
      "भावनात्मक संतुलन, प्रजनन सहायता और धैर्यपूर्ण दृढ़ संकल्प के लिए युनाकाइट ब्रेसलेट।",
  },
  {
    sku: "NSC031",
    name: "Septarian Bracelet",
    nameHi: "सेप्टेरियन ब्रेसलेट",
    stone: "Septarian",
    price: 999,
    mrp: 1399,
    emoji: "🌿",
    badge: "New Arrival",
    isNew: true,
    benefits: [
      "Grounds and protects",
      "Enhances public speaking",
      "Promotes patience",
    ],
    description:
      "Septarian bracelet — ancient nodule stone for grounding, patience, and confidence in speaking.",
    descriptionHi:
      "सेप्टेरियन ब्रेसलेट — भू-संपर्क, धैर्य और भाषण में आत्मविश्वास के लिए प्राचीन गाँठ पत्थर।",
  },
  {
    sku: "NSC032",
    name: "Bronzite Bracelet",
    nameHi: "ब्रोंजाइट ब्रेसलेट",
    stone: "Bronzite",
    price: 699,
    mrp: 999,
    emoji: "🤎",
    benefits: [
      "Deflects negative energy back to sender",
      "Promotes certainty and action",
      "Grounds energy",
    ],
    description:
      "Bronzite bracelet for self-determination, grounding, and bouncing back negativity.",
    descriptionHi:
      "आत्म-निर्धारण, भू-संपर्क और नकारात्मकता को वापस उछालने के लिए ब्रोंजाइट ब्रेसलेट।",
  },
  {
    sku: "NSC033",
    name: "Thulite Bracelet",
    nameHi: "थुलाइट ब्रेसलेट",
    stone: "Thulite",
    price: 849,
    mrp: 1199,
    emoji: "🌺",
    badge: "New Arrival",
    isNew: true,
    benefits: [
      "Promotes joy and happiness",
      "Enhances performance and creativity",
      "Supports healing",
    ],
    description:
      "Thulite bracelet for joy, happiness, and creative performance enhancement.",
    descriptionHi: "खुशी, प्रसन्नता और रचनात्मक प्रदर्शन वृद्धि के लिए थुलाइट ब्रेसलेट।",
  },
  {
    sku: "NSC034",
    name: "Quantum Quattro Bracelet",
    nameHi: "क्वांटम क्वात्रो ब्रेसलेट",
    stone: "Quantum Quattro",
    price: 1199,
    mrp: 1699,
    emoji: "🌈",
    badge: "Trending",
    benefits: [
      "Master healer combination",
      "Clears all energy blockages",
      "Activates all chakras",
    ],
    description:
      "Quantum Quattro — rare 5-mineral combination for master healing and complete chakra activation.",
    descriptionHi:
      "क्वांटम क्वात्रो — मास्टर हीलिंग और संपूर्ण चक्र सक्रियण के लिए दुर्लभ 5-खनिज संयोजन।",
  },
  {
    sku: "NSC035",
    name: "Blue Kyanite Bracelet",
    nameHi: "ब्लू काइनाइट ब्रेसलेट",
    stone: "Blue Kyanite",
    price: 999,
    mrp: 1399,
    emoji: "💙",
    benefits: [
      "Activates throat chakra",
      "Enhances communication and truth",
      "Aligns all chakras",
    ],
    description:
      "Blue Kyanite bracelet for throat chakra activation and authentic communication.",
    descriptionHi: "कंठ चक्र सक्रियण और प्रामाणिक संचार के लिए ब्लू काइनाइट ब्रेसलेट।",
  },
  {
    sku: "NSC036",
    name: "Chrysocolla Bracelet",
    nameHi: "क्राइसोकोला ब्रेसलेट",
    stone: "Chrysocolla",
    price: 1099,
    mrp: 1499,
    emoji: "🔵",
    badge: "Trending",
    benefits: [
      "Promotes calm and wisdom",
      "Enhances feminine energy",
      "Supports communication",
    ],
    description:
      "Chrysocolla bracelet for calm wisdom, feminine empowerment, and clear communication.",
    descriptionHi:
      "शांत ज्ञान, स्त्री सशक्तिकरण और स्पष्ट संचार के लिए क्राइसोकोला ब्रेसलेट।",
  },
  {
    sku: "NSC037",
    name: "Golden Healer Quartz Bracelet",
    nameHi: "गोल्डन हीलर क्वार्ट्ज़ ब्रेसलेट",
    stone: "Golden Healer Quartz",
    price: 1299,
    mrp: 1799,
    emoji: "🌟",
    badge: "Bestseller",
    benefits: [
      "Master healing crystal",
      "Connects to universal life force",
      "Clears and activates all chakras",
    ],
    description:
      "Golden Healer Quartz bracelet — the master healer for complete energetic restoration.",
    descriptionHi:
      "गोल्डन हीलर क्वार्ट्ज़ ब्रेसलेट — संपूर्ण ऊर्जावान पुनर्स्थापना के लिए मास्टर हीलर।",
  },
  {
    sku: "NSC038",
    name: "Rainbow Moonstone Bracelet",
    nameHi: "रेनबो मूनस्टोन ब्रेसलेट",
    stone: "Rainbow Moonstone",
    price: 1099,
    mrp: 1499,
    emoji: "🌈",
    badge: "New Arrival",
    isNew: true,
    benefits: [
      "Enhances feminine power",
      "Promotes new beginnings",
      "Brings good luck",
    ],
    description:
      "Rainbow Moonstone bracelet for divine feminine energy, new beginnings, and celestial luck.",
    descriptionHi:
      "दिव्य स्त्री ऊर्जा, नई शुरुआत और आकाशीय भाग्य के लिए रेनबो मूनस्टोन ब्रेसलेट।",
  },
  {
    sku: "NSC039",
    name: "Blue Lace Agate Bracelet",
    nameHi: "ब्लू लेस अगेट ब्रेसलेट",
    stone: "Blue Lace Agate",
    price: 649,
    mrp: 949,
    emoji: "💙",
    benefits: [
      "Calms anxiety and stress",
      "Softens communication",
      "Promotes inner peace",
    ],
    description:
      "Blue Lace Agate bracelet for gentle calming, soft communication, and inner peace.",
    descriptionHi: "कोमल शांति, नरम संचार और आंतरिक शांति के लिए ब्लू लेस अगेट ब्रेसलेट।",
  },
  {
    sku: "NSC040",
    name: "Green Jade Bracelet",
    nameHi: "हरा जेड ब्रेसलेट",
    stone: "Green Jade",
    price: 899,
    mrp: 1299,
    emoji: "💚",
    badge: "Bestseller",
    benefits: [
      "Attracts luck and prosperity",
      "Promotes harmony and longevity",
      "Protects against harm",
    ],
    description:
      "Green Jade bracelet — the ancient luck stone for prosperity, harmony, and protection.",
    descriptionHi:
      "हरा जेड ब्रेसलेट — समृद्धि, सामंजस्य और सुरक्षा के लिए प्राचीन भाग्य पत्थर।",
  },
  {
    sku: "NSC041",
    name: "Black Obsidian Bracelet",
    nameHi: "ब्लैक ओब्सीडियन ब्रेसलेट",
    stone: "Black Obsidian",
    price: 649,
    mrp: 949,
    emoji: "🖤",
    badge: "Trending",
    benefits: [
      "Deep psychic protection",
      "Reveals hidden truths",
      "Cuts negative cords",
    ],
    description:
      "Black Obsidian bracelet for deep protection, truth-revealing, and cutting energetic ties.",
    descriptionHi:
      "गहरी सुरक्षा, सत्य-प्रकटीकरण और ऊर्जावान बंधन काटने के लिए ब्लैक ओब्सीडियन ब्रेसलेट।",
  },
  {
    sku: "NSC042",
    name: "White Howlite Bracelet",
    nameHi: "व्हाइट हॉलाइट ब्रेसलेट",
    stone: "White Howlite",
    price: 499,
    mrp: 749,
    emoji: "🤍",
    benefits: [
      "Calms overactive mind",
      "Promotes patience",
      "Supports sleep and meditation",
    ],
    description:
      "White Howlite bracelet for stillness, patience, and deeply restful sleep.",
    descriptionHi: "शांति, धैर्य और गहरी आरामदायक नींद के लिए व्हाइट हॉलाइट ब्रेसलेट।",
  },
  {
    sku: "NSC043",
    name: "Dalmatian Jasper Bracelet",
    nameHi: "डालमेशियन जैस्पर ब्रेसलेट",
    stone: "Dalmatian Jasper",
    price: 599,
    mrp: 899,
    emoji: "🌟",
    benefits: [
      "Brings joy and playfulness",
      "Deepens loyalty",
      "Grounds excess energy",
    ],
    description:
      "Dalmatian Jasper bracelet for joy, loyalty, and grounding scattered energy.",
    descriptionHi:
      "खुशी, वफादारी और बिखरी ऊर्जा को जमीन पर लाने के लिए डालमेशियन जैस्पर ब्रेसलेट।",
  },
  {
    sku: "NSC044",
    name: "Ocean Jasper Bracelet",
    nameHi: "ओशन जैस्पर ब्रेसलेट",
    stone: "Ocean Jasper",
    price: 799,
    mrp: 1149,
    emoji: "🌊",
    badge: "New Arrival",
    isNew: true,
    benefits: [
      "Promotes joy and positive thinking",
      "Supports circular patterns",
      "Brings renewed hope",
    ],
    description:
      "Ocean Jasper bracelet for joy, positive thinking, and renewed hope and perspective.",
    descriptionHi:
      "खुशी, सकारात्मक सोच और नई आशा और दृष्टिकोण के लिए ओशन जैस्पर ब्रेसलेट।",
  },
];

export const SINGLE_CRYSTAL_BRACELETS: NumerologyBracelet[] =
  singleCrystalData.map((d, i) => ({
    id: `nsc-${String(i + 1).padStart(3, "0")}`,
    sku: d.sku,
    name: d.name,
    nameHi: d.nameHi,
    price: d.price,
    mrp: d.mrp,
    category: "single-crystal" as const,
    stone: d.stone,
    benefits: d.benefits,
    description: d.description,
    descriptionHi: d.descriptionHi,
    emoji: d.emoji,
    badge: d.badge,
    isNew: d.isNew,
    emiEligible: d.price >= 500,
  }));

// ─── Category: Anklets (5 products) ────────────────────────────────────────────
export const NUMEROLOGY_ANKLETS: NumerologyBracelet[] = [
  {
    id: "nan-001",
    sku: "NAN001",
    name: "Crystal Anklet",
    nameHi: "क्रिस्टल पायल",
    price: 399,
    mrp: 599,
    category: "anklet",
    stone: "Mixed Crystal",
    emoji: "✨",
    benefits: [
      "Brings positive energy to feet",
      "Traditional protection for women",
      "Balances root chakra",
    ],
    description:
      "Mixed crystal anklet for positive energy, protection, and root chakra balance.",
    descriptionHi:
      "सकारात्मक ऊर्जा, सुरक्षा और मूल चक्र संतुलन के लिए मिश्रित क्रिस्टल पायल।",
    badge: "Bestseller",
    emiEligible: false,
  },
  {
    id: "nan-002",
    sku: "NAN002",
    name: "Evil Eye Anklet",
    nameHi: "ईविल आई पायल",
    price: 449,
    mrp: 649,
    category: "anklet",
    stone: "Blue Glass + Crystal",
    emoji: "👁️",
    benefits: [
      "Wards off evil eye",
      "Protects the wearer",
      "Traditional nazar protection",
    ],
    description:
      "Evil Eye anklet with blue glass beads and crystal for traditional nazar protection.",
    descriptionHi:
      "पारंपरिक नज़र सुरक्षा के लिए नीले कांच के मोतियों और क्रिस्टल के साथ ईविल आई पायल।",
    badge: "Trending",
    emiEligible: false,
  },
  {
    id: "nan-003",
    sku: "NAN003",
    name: "Moolank Anklet",
    nameHi: "मूलांक पायल",
    price: 499,
    mrp: 749,
    category: "anklet",
    stone: "Moolank Stone Set",
    emoji: "🔢",
    benefits: [
      "Personalized by birth number",
      "Enhances numerological energy at feet",
      "Unique custom piece",
    ],
    description:
      "Personalized Moolank anklet made with stones corresponding to your birth number for enhanced numerological energy.",
    descriptionHi:
      "बढ़ी हुई अंकज्योतिष ऊर्जा के लिए आपकी जन्म संख्या के अनुरूप पत्थरों से बनी व्यक्तिगत मूलांक पायल।",
    badge: "New Arrival",
    isNew: true,
    emiEligible: false,
  },
  {
    id: "nan-004",
    sku: "NAN004",
    name: "Lucky Stone Anklet",
    nameHi: "भाग्यशाली पत्थर पायल",
    price: 549,
    mrp: 799,
    category: "anklet",
    stone: "Green Aventurine + Citrine",
    emoji: "🍀",
    benefits: [
      "Attracts good luck",
      "Invites abundance",
      "Positive energy at the base",
    ],
    description:
      "Lucky Stone anklet with Green Aventurine and Citrine for attracting good luck and abundance.",
    descriptionHi:
      "सौभाग्य और प्रचुरता आकर्षित करने के लिए हरे एवेंचुरिन और सिट्रिन के साथ भाग्यशाली पत्थर पायल।",
    emiEligible: false,
  },
  {
    id: "nan-005",
    sku: "NAN005",
    name: "Gold Plated Lucky Anklet",
    nameHi: "गोल्ड प्लेटेड भाग्यशाली पायल",
    price: 699,
    mrp: 999,
    category: "anklet",
    stone: "Pyrite + Gold Plated",
    emoji: "💛",
    benefits: [
      "Gold energy attracts wealth",
      "Pyrite for abundance",
      "Elegant and spiritual",
    ],
    description:
      "Gold plated lucky anklet with Pyrite for attracting wealth and good fortune with elegance.",
    descriptionHi:
      "लालित्य के साथ धन और सौभाग्य आकर्षित करने के लिए पाइराइट के साथ सोने की चढ़ाई वाली भाग्यशाली पायल।",
    badge: "Trending",
    emiEligible: false,
  },
];

// ─── Combined export ────────────────────────────────────────────────────────────
export const ALL_NUMEROLOGY_BRACELETS: NumerologyBracelet[] = [
  ...MOOLANK_BRACELETS,
  ...PERSONAL_YEAR_BRACELETS,
  ...NATURAL_PURPOSE_BRACELETS,
  ...SINGLE_CRYSTAL_BRACELETS,
  ...NUMEROLOGY_ANKLETS,
];

export const NUMEROLOGY_BRACELET_CATEGORIES = [
  {
    id: "moolank",
    label: "Moolank (1–9)",
    labelHi: "मूलांक (१–९)",
    count: 9,
    emoji: "🔢",
  },
  {
    id: "personal-year",
    label: "Personal Year",
    labelHi: "व्यक्तिगत वर्ष",
    count: 9,
    emoji: "📅",
  },
  {
    id: "natural-purpose",
    label: "Natural Purpose",
    labelHi: "प्राकृतिक उद्देश्य",
    count: 7,
    emoji: "🌿",
  },
  {
    id: "single-crystal",
    label: "Single Crystal",
    labelHi: "एकल क्रिस्टल",
    count: 44,
    emoji: "💎",
  },
  { id: "anklet", label: "Anklets", labelHi: "पायल", count: 5, emoji: "✨" },
];
