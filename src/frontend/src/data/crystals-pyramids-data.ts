// crystals-pyramids-data.ts — Complete crystal and pyramid catalog

export interface CrystalEntry {
  id: string;
  name: string;
  nameHindi: string;
  color: string;
  chakra: string;
  properties: string;
  uses: string;
  priceRange: string;
  formsAvailable: Array<
    | "raw"
    | "tumbled"
    | "sphere"
    | "pyramid"
    | "cluster"
    | "wand"
    | "tower"
    | "plate"
  >;
}

export interface PyramidEntry {
  id: string;
  name: string;
  nameHindi: string;
  material: string;
  sizes: string[];
  useCases: Array<
    "vastu" | "healing" | "meditation" | "energy-grid" | "manifestation"
  >;
  benefits: string;
  howToUse: string;
  price: number;
  originalPrice: number;
  imageUrl?: string;
}

export const CRYSTALS_CATALOG: CrystalEntry[] = [
  {
    id: "crystal-rose-quartz",
    name: "Rose Quartz",
    nameHindi: "गुलाबी स्फटिक",
    color: "Pink to pale pink",
    chakra: "Anahata (Heart Chakra)",
    properties:
      "Unconditional love, emotional healing, self-love, compassion, nurturing energy, feminine energy, fertility, forgiveness",
    uses: "Attract romantic love, heal heartbreak, improve relationships, mother-child bonding, self-love rituals, fertility support, forgiveness practice, Goddess worship",
    priceRange: "₹150 – ₹3,000 (by size and form)",
    formsAvailable: ["raw", "tumbled", "sphere", "pyramid", "cluster"],
  },
  {
    id: "crystal-amethyst",
    name: "Amethyst",
    nameHindi: "जामुनी स्फटिक",
    color: "Purple to violet (light to dark)",
    chakra: "Ajna (Third Eye) + Sahasrara (Crown)",
    properties:
      "Spiritual protection, psychic abilities, intuition, stress relief, sobriety from addictions, peaceful sleep, higher consciousness, meditation enhancement",
    uses: "Meditation rooms, bedroom for peaceful sleep, protection from negative energies, third eye activation, addiction recovery support, healing grids, altar decoration",
    priceRange: "₹200 – ₹5,000 (by size and form)",
    formsAvailable: ["raw", "tumbled", "sphere", "pyramid", "cluster", "wand"],
  },
  {
    id: "crystal-clear-quartz",
    name: "Clear Quartz (Sphatik)",
    nameHindi: "स्फटिक (शुद्ध)",
    color: "Colorless to white, transparent",
    chakra: "All chakras (Master Healer)",
    properties:
      "Amplification of energy and intentions, clarity, purification, healing acceleration, spiritual connection, universal energy, programmable with any intention",
    uses: "Amplifying other crystals, meditation, manifesting intentions, healing grids, Lakshmi puja (Sphatik mala), Shiva worship, altar centerpiece, crystal programming",
    priceRange: "₹200 – ₹5,000 (by size and form)",
    formsAvailable: [
      "raw",
      "tumbled",
      "sphere",
      "pyramid",
      "cluster",
      "wand",
      "tower",
    ],
  },
  {
    id: "crystal-black-tourmaline",
    name: "Black Tourmaline",
    nameHindi: "काला टूर्मलाइन",
    color: "Black",
    chakra: "Muladhara (Root Chakra)",
    properties:
      "Protection from negative energies, EMF shielding, grounding, dispelling fear, cleansing the aura, neutralizing negative thoughts, psychic protection, stabilizing",
    uses: "Place at home entrance for protection, EMF/radiation shielding near electronics, grounding practices, protection from black magic, purifying spaces, Vastu correction",
    priceRange: "₹300 – ₹6,000 (by size and form)",
    formsAvailable: ["raw", "tumbled", "tower"],
  },
  {
    id: "crystal-citrine",
    name: "Citrine",
    nameHindi: "सुनहरा स्फटिक / सिट्रिन",
    color: "Yellow to golden orange",
    chakra: "Manipura (Solar Plexus)",
    properties:
      "Abundance, wealth, positivity, creativity, confidence, joy, motivation, self-expression, manifesting financial goals, never holds negative energy",
    uses: "Wealth corner of home/office (Feng Shui), cash box or wallet, business spaces, creative workspaces, solar plexus healing, abundance grids, prosperity rituals",
    priceRange: "₹200 – ₹5,000 (by size and form)",
    formsAvailable: ["raw", "tumbled", "sphere", "pyramid", "cluster", "tower"],
  },
  {
    id: "crystal-pyrite",
    name: "Pyrite (Fool's Gold)",
    nameHindi: "पायराइट",
    color: "Gold to brassy yellow, metallic",
    chakra: "Manipura (Solar Plexus)",
    properties:
      "Wealth magnetism, mental clarity, confidence, willpower, protection, Feng Shui wealth activator, stimulates intellect, enhances memory and focus",
    uses: "Wealth corners in home/office, business settings, study desk for focus, protection from negative energies, combining with other wealth crystals in grids",
    priceRange: "₹300 – ₹8,000 (by size and form)",
    formsAvailable: ["raw", "tumbled", "sphere", "pyramid", "cluster"],
  },
  {
    id: "crystal-tiger-eye",
    name: "Tiger Eye",
    nameHindi: "टाइगर आई",
    color: "Golden brown with silk-like bands (chatoyancy)",
    chakra: "Manipura (Solar Plexus) + Muladhara",
    properties:
      "Courage, confidence, decision-making, luck, wealth attraction, willpower, clear intention, protection during travel, dispelling fear",
    uses: "Carry for courage, travel protection, decision-making support, business meetings, solar plexus activation, combining with wealth crystals, protection grids",
    priceRange: "₹200 – ₹4,000 (by size and form)",
    formsAvailable: ["raw", "tumbled", "sphere", "pyramid"],
  },
  {
    id: "crystal-lapis-lazuli",
    name: "Lapis Lazuli",
    nameHindi: "लाजवर्त",
    color: "Deep blue with golden pyrite flecks and white calcite",
    chakra: "Ajna (Third Eye) + Vishuddha (Throat)",
    properties:
      "Wisdom, truth, spiritual enlightenment, intellectual abilities, honest communication, inner power, past-life recall, connection to higher self",
    uses: "Meditation, throat and third eye activation, intellectual work spaces, truth-seeking rituals, spiritual study rooms, communication healing, Goddess Saraswati offerings",
    priceRange: "₹500 – ₹10,000 (by size and form)",
    formsAvailable: ["raw", "tumbled", "sphere", "pyramid"],
  },
  {
    id: "crystal-sodalite",
    name: "Sodalite",
    nameHindi: "सोडालाइट",
    color: "Royal blue with white veins",
    chakra: "Ajna (Third Eye) + Vishuddha (Throat)",
    properties:
      "Logic, rational thinking, objectivity, self-expression, calmness, truth, communication clarity, reducing panic, enhancing academic performance",
    uses: "Study desk and exam preparation, communication improvement, panic management, academic spaces, public speaking practice, scientific work, throat chakra healing",
    priceRange: "₹200 – ₹4,000 (by size and form)",
    formsAvailable: ["raw", "tumbled", "sphere", "pyramid"],
  },
  {
    id: "crystal-moonstone",
    name: "Moonstone",
    nameHindi: "चंद्रकांत मणि",
    color: "White to peach to grey with blue adularescence",
    chakra: "Sahasrara (Crown) + Ajna",
    properties:
      "Feminine energy, intuition, fertility, new beginnings, emotional balance, cyclical rhythm, psychic perception, dream work, Moon energy",
    uses: "Full moon rituals, fertility support, emotional healing, lunar energy work, women's health, dream enhancement (place under pillow), Moon Goddess worship, astrology practice",
    priceRange: "₹400 – ₹8,000 (by size and form)",
    formsAvailable: ["tumbled", "sphere", "pyramid"],
  },
  {
    id: "crystal-obsidian",
    name: "Black Obsidian",
    nameHindi: "काला ओब्सीडियन",
    color: "Black, glossy volcanic glass",
    chakra: "Muladhara (Root Chakra)",
    properties:
      "Truth, psychic protection, shadow work, releasing past trauma, seeing through illusions, Vastu correction, space clearing, powerful shield against negativity",
    uses: "Vastu correction at home entrance, protection from black magic, shadow work and self-reflection (scrying), clearing spaces of stagnant energy, releasing past trauma",
    priceRange: "₹200 – ₹4,000 (by size and form)",
    formsAvailable: ["raw", "tumbled", "sphere", "pyramid"],
  },
];

export const PYRAMIDS_CATALOG: PyramidEntry[] = [
  {
    id: "pyramid-crystal-small",
    name: "Crystal Pyramid (Small)",
    nameHindi: "क्रिस्टल पिरामिड (छोटा)",
    material: "Clear Quartz / Rose Quartz / Amethyst (options)",
    sizes: ["2 inch", "3 inch"],
    useCases: ["healing", "meditation", "manifestation"],
    benefits:
      "Small crystal pyramids amplify energy and intentions placed beneath them. Perfect for desk use, personal altars, and manifesting specific goals. The pyramid shape focuses energy upward through the apex. Used in crystal healing sessions placed on chakra points.",
    howToUse:
      "Write your intention on paper, place under the pyramid. Use during meditation by holding or placing before you. Place on altar for energy amplification.",
    price: 599,
    originalPrice: 1200,
    imageUrl: "/assets/images/pyramids/crystal-small.jpg",
  },
  {
    id: "pyramid-crystal-medium",
    name: "Crystal Pyramid (Medium)",
    nameHindi: "क्रिस्टल पिरामिड (मध्यम)",
    material: "Clear Quartz / Rose Quartz / Amethyst / Citrine",
    sizes: ["4 inch", "5 inch"],
    useCases: ["healing", "meditation", "manifestation", "energy-grid"],
    benefits:
      "Medium crystal pyramids are ideal for room energy correction and home altars. Strong enough to influence a room's energy field. Excellent for Vastu correction, meditation rooms, and as the centerpiece of crystal grids.",
    howToUse:
      "Place in center of room to harmonize energy. Use as focal point for crystal grids. Place on Vastu correction points. Use during meditation sessions.",
    price: 1299,
    originalPrice: 2500,
    imageUrl: "/assets/images/pyramids/crystal-medium.jpg",
  },
  {
    id: "pyramid-crystal-large",
    name: "Crystal Pyramid (Large)",
    nameHindi: "क्रिस्टल पिरामिड (बड़ा)",
    material: "Clear Quartz / Citrine / Amethyst cluster",
    sizes: ["6 inch", "8 inch", "10 inch"],
    useCases: ["vastu", "healing", "meditation", "energy-grid"],
    benefits:
      "Large crystal pyramids are powerful space energizers. They influence the entire home's energy field and are excellent for Vastu correction. Suitable for puja rooms, meditation halls, and yoga studios. Creates a powerful vortex of positive energy.",
    howToUse:
      "Place in puja room or main area of home. Use for complete home Vastu correction. Set as centerpiece of large crystal grids for maximum amplification.",
    price: 2999,
    originalPrice: 5999,
    imageUrl: "/assets/images/pyramids/crystal-large.jpg",
  },
  {
    id: "pyramid-vastu-copper",
    name: "Vastu Pyramid (Copper)",
    nameHindi: "वास्तु पिरामिड (तांबा)",
    material: "Pure copper",
    sizes: ["1.5 inch", "3 inch"],
    useCases: ["vastu"],
    benefits:
      "Copper Vastu pyramids are the most traditional Vastu correction tools. Copper is associated with Venus and conducts energy powerfully. Used for correcting directional imbalances in homes and offices. Highly effective for relationship and wealth Vastu zones.",
    howToUse:
      "Bury small pyramids at the corners of property or room as instructed by Vastu expert. Place in relevant directional zone for targeted correction.",
    price: 799,
    originalPrice: 1600,
    imageUrl: "/assets/images/pyramids/vastu-copper.jpg",
  },
  {
    id: "pyramid-vastu-brass",
    name: "Vastu Pyramid (Brass)",
    nameHindi: "वास्तु पिरामिड (पीतल)",
    material: "Brass (Pital)",
    sizes: ["2 inch", "4 inch"],
    useCases: ["vastu", "meditation"],
    benefits:
      "Brass Vastu pyramids combine copper and zinc for a powerful Vastu correction tool. Considered auspicious in Hindu tradition as brass is used in puja items. Excellent for wealth zone corrections (North, North-East) and general home Vastu balancing.",
    howToUse:
      "Place in North or North-East direction of home for wealth. Use in pairs at entrance for protection. Consult Vastu expert for specific placement.",
    price: 699,
    originalPrice: 1400,
    imageUrl: "/assets/images/pyramids/vastu-brass.jpg",
  },
  {
    id: "pyramid-vastu-crystal-set",
    name: "9 Pyramid Vastu Set",
    nameHindi: "9 पिरामिड वास्तु सेट",
    material: "Clear Quartz crystal",
    sizes: ["1 inch each"],
    useCases: ["vastu", "energy-grid"],
    benefits:
      "The complete 9-pyramid Vastu set is used to energize all 9 zones of a home/office according to Vastu Shastra (8 directions + center). Creates a powerful energy grid that harmonizes all aspects of life simultaneously — health, wealth, relationships, career, and spirituality.",
    howToUse:
      "Place one pyramid in each of the 9 directional zones of home as per Vastu map. Center pyramid in the Brahmasthana (center). Energize on auspicious day.",
    price: 1299,
    originalPrice: 2599,
    imageUrl: "/assets/images/pyramids/9-pyramid-set.jpg",
  },
  {
    id: "pyramid-lakshmi-yantra",
    name: "Lakshmi Yantra Pyramid",
    nameHindi: "लक्ष्मी यंत्र पिरामिड",
    material: "Crystal with Lakshmi Yantra engraved on base",
    sizes: ["3 inch", "5 inch"],
    useCases: ["vastu", "manifestation", "meditation"],
    benefits:
      "Combines the sacred geometry of Lakshmi Yantra with the amplifying power of crystal pyramid. The Yantra on the base radiates Lakshmi energy upward through the pyramid apex, creating a powerful wealth and prosperity vortex. Excellent for business and home wealth zones.",
    howToUse:
      "Place in North or North-East direction of home or office. Worship Goddess Lakshmi through the pyramid. Recite Sri Lakshmi Ashtakam or Mahalakshmi Stotram facing the pyramid.",
    price: 1199,
    originalPrice: 2299,
    imageUrl: "/assets/images/pyramids/lakshmi-yantra.jpg",
  },
  {
    id: "pyramid-shri-yantra",
    name: "Shri Yantra Pyramid",
    nameHindi: "श्री यंत्र पिरामिड",
    material: "Crystal / Gold-plated brass",
    sizes: ["4 inch", "6 inch"],
    useCases: ["vastu", "manifestation", "meditation", "healing"],
    benefits:
      "The Shri Yantra is the most sacred and powerful yantra in Hindu tradition, representing the cosmic form of Goddess Tripura Sundari (Lalita). When combined with pyramid geometry, it becomes an extraordinarily powerful manifestation tool. Attracts wealth, success, removes all obstacles, and accelerates spiritual growth.",
    howToUse:
      "Place in the most important room of the house or puja room facing East. Worship daily with Kumkum, flowers, and incense. Recite Sri Suktam or Lalita Sahasranama.",
    price: 1499,
    originalPrice: 2999,
    imageUrl: "/assets/images/pyramids/shri-yantra.jpg",
  },
  {
    id: "pyramid-orgone",
    name: "Orgone Pyramid",
    nameHindi: "ऑर्गोन पिरामिड",
    material: "Resin + metal shavings + quartz crystal + copper coil",
    sizes: ["3 inch", "5 inch"],
    useCases: ["healing", "energy-grid", "vastu"],
    benefits:
      "Orgone pyramids combine the energy principles of Wilhelm Reich's orgone theory with crystal and metal energy. They convert negative energy (DOR) into positive life force energy (OR). Excellent for EMF protection, space healing, improving sleep quality, and enhancing meditation. Handcrafted with crystals and metals for layered energy benefits.",
    howToUse:
      "Place near electronic devices for EMF protection. Use in bedroom for improved sleep and positive dreams. Place in meditation space to enhance energy. Keep near plants to promote growth.",
    price: 999,
    originalPrice: 2000,
    imageUrl: "/assets/images/pyramids/orgone.jpg",
  },
];
