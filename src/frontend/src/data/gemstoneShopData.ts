// Gemstone Shop Data — 32 certified Navgrah gemstones

export interface GemstoneInfo {
  id: string;
  name: string;
  nameHindi: string;
  alternateNames: string;
  color: string;
  colorHex: string;
  planet: string;
  zodiacSigns: string[];
  emoji: string;
  price: number;
  mrp: number;
  description: string;
  benefits: string;
}

export const GEMSTONES: GemstoneInfo[] = [
  {
    id: "blue-sapphire",
    name: "Blue Sapphire",
    nameHindi: "नीलम",
    alternateNames: "Neelam",
    color: "Blue",
    colorHex: "#1F4E9E",
    planet: "Saturn",
    zodiacSigns: ["Capricorn", "Aquarius"],
    emoji: "💙",
    price: 19600,
    mrp: 25000,
    description:
      "Blue Sapphire (Neelam) is the most powerful Saturn gemstone in Vedic astrology. It brings rapid results — both positive and negative — so it must be worn after careful astrological consultation. When it suits the wearer, it bestows immense wealth, fame, discipline, and career success.",
    benefits:
      "Career acceleration, financial gains, discipline, focus, protection from Saturn\u2019s malefic effects, success in legal matters.",
  },
  {
    id: "ruby",
    name: "Ruby",
    nameHindi: "माणिक्य",
    alternateNames: "Manik",
    color: "Red",
    colorHex: "#C0392B",
    planet: "Sun",
    zodiacSigns: ["Leo"],
    emoji: "❤️",
    price: 14500,
    mrp: 18000,
    description:
      "Ruby (Manik) is the gemstone of the Sun — the king of planets. It radiates royal energy, boosts self-confidence, and strengthens leadership qualities. Worn by rulers and spiritual leaders throughout history, Ruby connects the wearer to divine light and paternal blessings.",
    benefits:
      "Leadership, confidence, vitality, government favour, father\u2019s blessings, fame, strong willpower.",
  },
  {
    id: "yellow-sapphire",
    name: "Yellow Sapphire",
    nameHindi: "पुखराज",
    alternateNames: "Pukhraj",
    color: "Yellow",
    colorHex: "#F1C40F",
    planet: "Jupiter",
    zodiacSigns: ["Sagittarius", "Pisces"],
    emoji: "💛",
    price: 12330,
    mrp: 16000,
    description:
      "Yellow Sapphire (Pukhraj) is the gemstone of Jupiter — the Guru of the gods. It is one of the most auspicious stones, recommended for wisdom, higher education, marriage, and spiritual growth. It blesses the wearer with prosperity and divine guidance.",
    benefits:
      "Wisdom, prosperity, marriage, children, higher education, spiritual growth, financial abundance.",
  },
  {
    id: "emerald",
    name: "Emerald",
    nameHindi: "पन्ना",
    alternateNames: "Panna",
    color: "Green",
    colorHex: "#27AE60",
    planet: "Mercury",
    zodiacSigns: ["Gemini", "Virgo"],
    emoji: "💚",
    price: 9800,
    mrp: 13000,
    description:
      "Emerald (Panna) is the gemstone of Mercury — the planet of intellect and communication. It enhances mental agility, creative thinking, and eloquence. Highly recommended for students, writers, businesspeople, and anyone in communication-based professions.",
    benefits:
      "Intellect, communication, memory, business acumen, creative thinking, education, skin health.",
  },
  {
    id: "pearl",
    name: "Pearl",
    nameHindi: "मोती",
    alternateNames: "Moti",
    color: "White",
    colorHex: "#F8F9FA",
    planet: "Moon",
    zodiacSigns: ["Cancer"],
    emoji: "🤍",
    price: 3500,
    mrp: 5000,
    description:
      "Pearl (Moti) is the gemstone of the Moon — the planet of emotions, mind, and motherhood. It calms the mind, balances emotions, and enhances intuition. Natural Pearl is especially beneficial for those with a weak Moon in their birth chart.",
    benefits:
      "Emotional balance, calm mind, intuition, mother\u2019s blessings, sleep improvement, mental peace.",
  },
  {
    id: "red-coral",
    name: "Red Coral",
    nameHindi: "मूंगा",
    alternateNames: "Moonga",
    color: "Orange",
    colorHex: "#E74C3C",
    planet: "Mars",
    zodiacSigns: ["Aries", "Scorpio"],
    emoji: "🪸",
    price: 8785,
    mrp: 11000,
    description:
      "Red Coral (Moonga) is the gemstone of Mars — the planet of courage, energy, and action. It boosts vitality, courage, and physical stamina. Essential for those with a weak Mars who face obstacles, low energy, or delays in ambitions.",
    benefits:
      "Courage, physical energy, drive, victory over enemies, protection from accidents, blood health.",
  },
  {
    id: "hessonite",
    name: "Hessonite",
    nameHindi: "गोमेद",
    alternateNames: "Gomed",
    color: "Brown",
    colorHex: "#CA6F1E",
    planet: "Rahu",
    zodiacSigns: ["Gemini", "Virgo"],
    emoji: "🟤",
    price: 4200,
    mrp: 5500,
    description:
      "Hessonite (Gomed) is the gemstone of Rahu — the shadow planet of ambition and unconventional success. It cuts through confusion, helps the wearer navigate complex situations, and activates powerful transformations in career and life path.",
    benefits:
      "Career transformation, focus, clarity, financial growth, protection from Rahu\u2019s negative effects.",
  },
  {
    id: "amethyst",
    name: "Amethyst",
    nameHindi: "जामुनिया",
    alternateNames: "Jamunia",
    color: "Purple",
    colorHex: "#9B59B6",
    planet: "Saturn",
    zodiacSigns: ["Capricorn", "Aquarius"],
    emoji: "💜",
    price: 2500,
    mrp: 3200,
    description:
      "Amethyst (Jamunia) is an upashaman stone for Saturn — a softer, more accessible substitute for Blue Sapphire. It promotes calmness, mental clarity, and spiritual awareness. Excellent for those going through Sade Sati or Shani Mahadasha.",
    benefits:
      "Peace of mind, clarity, spiritual growth, protection from negativity, improved sleep, healing energy.",
  },
  {
    id: "turquoise",
    name: "Turquoise",
    nameHindi: "फ़िरोज़ा",
    alternateNames: "Feroza",
    color: "Blue",
    colorHex: "#1ABC9C",
    planet: "Venus",
    zodiacSigns: ["Taurus", "Libra"],
    emoji: "🩵",
    price: 3200,
    mrp: 4200,
    description:
      "Turquoise (Feroza) is a protective Venus stone known across many ancient civilisations. It shields the wearer from evil eye and negative energies, enhances communication, and brings good fortune. Highly valued in Persian, Tibetan, and Indian healing traditions.",
    benefits:
      "Protection, good fortune, communication, creativity, love harmony, balancing energy.",
  },
  {
    id: "moonstone",
    name: "Moonstone",
    nameHindi: "चंद्रकांत मणि",
    alternateNames: "Chandrakant Mani",
    color: "White",
    colorHex: "#D6E9F8",
    planet: "Moon",
    zodiacSigns: ["Cancer"],
    emoji: "🌙",
    price: 2800,
    mrp: 3600,
    description:
      "Moonstone is the stone of feminine energy, intuition, and lunar cycles. It enhances emotional intelligence, supports fertility, and helps the wearer attune to their inner rhythms. An excellent substitute for Pearl for those who cannot wear natural Moti.",
    benefits:
      "Emotional healing, intuition, feminine energy, fertility, lunar connection, calm.",
  },
  {
    id: "opal",
    name: "Opal",
    nameHindi: "दूधिया पत्थर",
    alternateNames: "Dudhiya Patthar",
    color: "Multi",
    colorHex: "#E8D5B0",
    planet: "Venus",
    zodiacSigns: ["Taurus", "Libra"],
    emoji: "🌈",
    price: 5500,
    mrp: 7000,
    description:
      "Opal is a mystical Venus stone known for its play-of-colour phenomenon. It enhances creativity, passion, and artistic expression. Opal brings love and romance into the wearer\u2019s life and is considered a powerful stone for those in creative professions.",
    benefits:
      "Creativity, love, romance, artistic expression, confidence, social charm.",
  },
  {
    id: "green-onyx",
    name: "Green Onyx",
    nameHindi: "हरा हकीक",
    alternateNames: "Hara Hakik",
    color: "Green",
    colorHex: "#2ECC71",
    planet: "Mercury",
    zodiacSigns: ["Gemini", "Virgo"],
    emoji: "🟢",
    price: 1800,
    mrp: 2400,
    description:
      "Green Onyx is a Mercury stone that promotes mental strength, focus, and emotional stability. It is widely used as an affordable substitute for Emerald and is particularly helpful for those seeking to improve their communication and decision-making abilities.",
    benefits:
      "Focus, mental clarity, decision-making, communication, calmness, nervous system balance.",
  },
  {
    id: "cats-eye",
    name: "Cats Eye",
    nameHindi: "लहसुनिया",
    alternateNames: "Lehsunia",
    color: "Brown",
    colorHex: "#8B7355",
    planet: "Ketu",
    zodiacSigns: ["Scorpio", "Pisces"],
    emoji: "🟡",
    price: 7475,
    mrp: 9500,
    description:
      "Cat\u2019s Eye (Lehsunia) is the gemstone of Ketu — the planet of past karma, spirituality, and mystical wisdom. It grants the wearer sharp intuition, protection from hidden enemies, and relief from Ketu Mahadasha. Known for sudden reversals of fortune in the wearer\u2019s favour.",
    benefits:
      "Spiritual protection, intuition, past-life clarity, relief from Ketu effects, hidden knowledge.",
  },
  {
    id: "natural-diamond",
    name: "Natural Diamond",
    nameHindi: "हीरा",
    alternateNames: "Heera",
    color: "White",
    colorHex: "#A8C4E0",
    planet: "Venus",
    zodiacSigns: ["Taurus", "Libra"],
    emoji: "💎",
    price: 85000,
    mrp: 110000,
    description:
      "Natural Diamond (Heera) is the most powerful Venus gemstone. It amplifies beauty, luxury, romance, and artistic gifts. A well-chosen Diamond bestows extraordinary wealth, social status, and a magnetic personality. Used by royalty and divine beings across all traditions.",
    benefits:
      "Luxury, love, artistic talent, social status, beauty, wealth, Venus blessings.",
  },
  {
    id: "natural-alexandrite",
    name: "Natural Alexandrite",
    nameHindi: "अलेक्ज़ेंड्राइट",
    alternateNames: "Alexandrite",
    color: "Green",
    colorHex: "#229954",
    planet: "Mercury",
    zodiacSigns: ["Gemini", "Virgo"],
    emoji: "🔮",
    price: 22000,
    mrp: 28000,
    description:
      "Natural Alexandrite is a rare colour-changing gemstone — green in daylight, red in incandescent light. It is associated with Mercury and Jupiter and is revered for its ability to balance dualities: reason and intuition, wealth and wisdom. Extremely rare and highly prized.",
    benefits:
      "Balance, adaptability, intuition, intellectual power, good fortune, rare Mercury/Jupiter synergy.",
  },
  {
    id: "green-tourmaline",
    name: "Green Tourmaline",
    nameHindi: "हरा टूमलाइन",
    alternateNames: "Hara Tourmaline",
    color: "Green",
    colorHex: "#2ECC71",
    planet: "Mercury",
    zodiacSigns: ["Gemini", "Virgo"],
    emoji: "🌿",
    price: 6500,
    mrp: 8500,
    description:
      "Green Tourmaline is a vibrant Mercury stone associated with growth, healing, and prosperity. It is an excellent substitute for Emerald and is used in crystal healing to activate the heart chakra, promote vitality, and attract abundance.",
    benefits:
      "Heart healing, abundance, vitality, growth, Mercury enhancement, chakra balancing.",
  },
  {
    id: "padparadscha",
    name: "Padparadscha Stone",
    nameHindi: "पद्मराग",
    alternateNames: "Padmarag",
    color: "Orange",
    colorHex: "#F39C12",
    planet: "Sun",
    zodiacSigns: ["Leo"],
    emoji: "🌸",
    price: 32000,
    mrp: 40000,
    description:
      "Padparadscha is the rarest form of Sapphire — a unique blend of pink and orange reminiscent of a lotus flower at dawn. Associated with the Sun, it carries a divine feminine energy that is warm, creative, and illuminating. Extremely rare and coveted by collectors worldwide.",
    benefits:
      "Creativity, divine feminine energy, warmth, leadership, love, Sun\u2019s blessings.",
  },
  {
    id: "peridot",
    name: "Peridot Stone",
    nameHindi: "ओलिविन",
    alternateNames: "Olivine",
    color: "Green",
    colorHex: "#7ED348",
    planet: "Mercury",
    zodiacSigns: ["Gemini", "Virgo"],
    emoji: "🫒",
    price: 4200,
    mrp: 5500,
    description:
      "Peridot is a Mercury stone associated with abundance, renewal, and healing. It is one of only two gemstones (the other being Diamond) that forms deep in the Earth\u2019s mantle. Peridot is believed to ward off jealousy, attract prosperity, and promote inner growth.",
    benefits:
      "Prosperity, healing, renewal, jealousy protection, inner growth, emotional clarity.",
  },
  {
    id: "pink-sapphire",
    name: "Pink Sapphire",
    nameHindi: "गुलाबी नीलम",
    alternateNames: "Gulabi Neelam",
    color: "Pink",
    colorHex: "#E91E8C",
    planet: "Venus",
    zodiacSigns: ["Taurus", "Libra"],
    emoji: "🌸",
    price: 18000,
    mrp: 23000,
    description:
      "Pink Sapphire is a beautiful Venus gemstone that resonates with love, compassion, and feminine energy. It opens the heart chakra, attracts romantic love, and brings joy and emotional healing. Recommended for those going through relationship challenges or seeking lasting love.",
    benefits:
      "Love, compassion, emotional healing, joy, romance, feminine energy, heart chakra.",
  },
  {
    id: "yellow-topaz",
    name: "Yellow Topaz",
    nameHindi: "पीला पुखराज",
    alternateNames: "Peela Pukhraj",
    color: "Yellow",
    colorHex: "#F39C12",
    planet: "Jupiter",
    zodiacSigns: ["Sagittarius", "Pisces"],
    emoji: "💛",
    price: 3800,
    mrp: 5000,
    description:
      "Yellow Topaz is an excellent substitute for Yellow Sapphire (Pukhraj). It carries Jupiter\u2019s energy of wisdom, abundance, and spiritual growth at a more accessible price point. Ideal for students, educators, and seekers of higher knowledge and prosperity.",
    benefits:
      "Wisdom, prosperity, education, marriage, Jupiter blessings, good fortune.",
  },
  {
    id: "zircon",
    name: "Zircon",
    nameHindi: "ज़िरकन",
    alternateNames: "Jarkan",
    color: "White",
    colorHex: "#BDC3C7",
    planet: "Venus",
    zodiacSigns: ["Taurus", "Libra"],
    emoji: "✨",
    price: 4500,
    mrp: 6000,
    description:
      "Zircon (Jarkan) is a natural gemstone used as an early substitute for Diamond. It is associated with Venus and is believed to bring wisdom, honour, and wealth. Natural Zircon has brilliant fire and lustre — not to be confused with synthetic Cubic Zirconia.",
    benefits:
      "Wisdom, wealth, honour, confidence, Venus energy, mental clarity.",
  },
  {
    id: "white-topaz",
    name: "White Topaz",
    nameHindi: "सफ़ेद पुखराज",
    alternateNames: "Safed Pukhraj",
    color: "White",
    colorHex: "#ECF0F1",
    planet: "Venus",
    zodiacSigns: ["Taurus", "Libra"],
    emoji: "🤍",
    price: 3200,
    mrp: 4200,
    description:
      "White Topaz is a purifying Venus stone that brings clarity, amplification of intentions, and a clean, focused energy. It is used as an affordable substitute for Diamond and is excellent for meditation, manifestation, and attracting positive relationships.",
    benefits:
      "Clarity, purification, manifestation, love, positive energy, Venus blessings.",
  },
  {
    id: "spinel",
    name: "Spinel Stone",
    nameHindi: "स्पिनल",
    alternateNames: "Spinel",
    color: "Red",
    colorHex: "#C0392B",
    planet: "Mars",
    zodiacSigns: ["Aries", "Scorpio"],
    emoji: "🔴",
    price: 7200,
    mrp: 9500,
    description:
      "Spinel is a powerful Mars gemstone that comes in a range of colours — red Spinel is the most prized and was historically confused with Ruby by royalty. It boosts vitality, courage, and leadership energy. Red Spinel is used as a powerful substitute for Ruby (Manik).",
    benefits:
      "Vitality, courage, leadership, energy, Mars remediation, ambition.",
  },
  {
    id: "pitambari",
    name: "Pitambari",
    nameHindi: "पीतांबरी",
    alternateNames: "Pitambari Neelam",
    color: "Yellow",
    colorHex: "#E8C547",
    planet: "Jupiter",
    zodiacSigns: ["Sagittarius"],
    emoji: "🌟",
    price: 15000,
    mrp: 20000,
    description:
      "Pitambari (Bi-colour Sapphire) is an extraordinary gemstone showing both yellow and blue colours — combining the energies of Jupiter (yellow) and Saturn (blue) in one stone. It is extremely rare and is said to bring both wisdom and discipline to the wearer simultaneously.",
    benefits:
      "Jupiter and Saturn harmony, dual planetary benefits, wisdom, discipline, rare good fortune.",
  },
  {
    id: "sulemani-red-hakik",
    name: "Sulemani Red Hakik",
    nameHindi: "सुलेमानी लाल हकीक",
    alternateNames: "Red Aqeeq",
    color: "Red",
    colorHex: "#8B0000",
    planet: "Mars",
    zodiacSigns: ["Aries"],
    emoji: "🔴",
    price: 2800,
    mrp: 3800,
    description:
      "Sulemani Red Hakik (Red Agate) is a protective Mars stone deeply revered in Vedic and Islamic healing traditions. It guards against negative energies, evil eye, and psychic attacks. It strengthens the base chakra and promotes physical stamina and courage.",
    benefits:
      "Protection, courage, base chakra, stamina, Mars energy, negativity shield.",
  },
  {
    id: "iolite",
    name: "Iolite",
    nameHindi: "नीली",
    alternateNames: "Neeli",
    color: "Blue",
    colorHex: "#6A5ACD",
    planet: "Saturn",
    zodiacSigns: ["Capricorn", "Aquarius"],
    emoji: "🫐",
    price: 3500,
    mrp: 4600,
    description:
      "Iolite (Neeli) is a beautiful violet-blue gemstone and an affordable substitute for Blue Sapphire. Called the \u2018Viking\u2019s Compass,\u2019 it enhances inner vision, direction-finding ability, and intuition. It helps the wearer navigate life transitions with clarity and confidence.",
    benefits:
      "Inner vision, direction, intuition, Saturn remedy, clarity in transitions, focus.",
  },
  {
    id: "sulemani-black-hakik",
    name: "Sulemani Black Hakik",
    nameHindi: "सुलेमानी काला हकीक",
    alternateNames: "Black Aqeeq",
    color: "Black",
    colorHex: "#1A1A2E",
    planet: "Saturn",
    zodiacSigns: ["Capricorn"],
    emoji: "⚫",
    price: 2400,
    mrp: 3200,
    description:
      "Sulemani Black Hakik (Black Agate) is a powerful Saturn stone used across Vedic and Sufi healing traditions. It provides deep grounding, shields against negative energies and evil eye, and supports those going through Sade Sati or Saturn\u2019s difficult transits.",
    benefits:
      "Grounding, Saturn remedy, protection, evil eye shield, Sade Sati relief, stability.",
  },
  {
    id: "blue-topaz",
    name: "Blue Topaz",
    nameHindi: "नीला पुखराज",
    alternateNames: "Neela Pukhraj",
    color: "Blue",
    colorHex: "#3498DB",
    planet: "Jupiter",
    zodiacSigns: ["Sagittarius"],
    emoji: "🔵",
    price: 4200,
    mrp: 5500,
    description:
      "Blue Topaz is a serene Jupiter stone associated with truth, wisdom, and the higher mind. It enhances communication skills, helps in academic pursuits, and brings a sense of calm clarity to the mind. Used in meditation to access higher states of consciousness.",
    benefits:
      "Truth, wisdom, communication, higher mind, calm clarity, academic success.",
  },
  {
    id: "citrine",
    name: "Citrine",
    nameHindi: "सुनेला",
    alternateNames: "Sunela",
    color: "Yellow",
    colorHex: "#F1C40F",
    planet: "Jupiter",
    zodiacSigns: ["Leo", "Sagittarius"],
    emoji: "🟡",
    price: 3200,
    mrp: 4200,
    description:
      "Citrine (Sunela) is known as the \u2018Merchant\u2019s Stone\u2019 — a Jupiter gemstone that attracts wealth, success, and positive energy. It is one of the few crystals that does not hold negative energy and is used extensively in manifestation practices and business environments.",
    benefits:
      "Wealth, success, positive energy, manifestation, business growth, Jupiter blessings.",
  },
  {
    id: "blue-corundum",
    name: "Blue Corundum",
    nameHindi: "नीला कोरन्डम",
    alternateNames: "Neela Corundum",
    color: "Blue",
    colorHex: "#2C3E8C",
    planet: "Saturn",
    zodiacSigns: ["Capricorn", "Aquarius"],
    emoji: "🔵",
    price: 8500,
    mrp: 11000,
    description:
      "Blue Corundum is a lower-grade Saturn stone in the same mineral family as Blue Sapphire (both are Corundum). It provides Saturn energy at a more accessible price and is used for Sade Sati remedies, career discipline, and grounding overactive minds.",
    benefits:
      "Saturn discipline, grounding, career focus, Sade Sati relief, mental clarity.",
  },
  {
    id: "white-sapphire",
    name: "White Sapphire",
    nameHindi: "सफ़ेद पुखराज",
    alternateNames: "Safed Pukhraj",
    color: "White",
    colorHex: "#EAF2FF",
    planet: "Venus",
    zodiacSigns: ["Taurus", "Libra"],
    emoji: "💎",
    price: 16000,
    mrp: 21000,
    description:
      "White Sapphire (Safed Pukhraj) is the most preferred substitute for Diamond in Vedic astrology. It carries the purity and power of Venus energy — attracting love, luxury, art, and social grace — without the extremely high cost of natural Diamond.",
    benefits:
      "Love, luxury, art, social grace, Venus blessings, clarity, purity.",
  },
  {
    id: "brown-sapphire",
    name: "Brown Sapphire",
    nameHindi: "भूरा नीलम",
    alternateNames: "Bhura Neelam",
    color: "Brown",
    colorHex: "#7D5A3C",
    planet: "Saturn",
    zodiacSigns: ["Capricorn", "Aquarius"],
    emoji: "🟫",
    price: 6500,
    mrp: 8500,
    description:
      "Brown Sapphire is a grounding Saturn stone that carries the stabilising and disciplining energy of Shani Deva. It is used for those who need to build patience, perseverance, and long-term focus. A calmer Saturn stone for gradual but steady life improvements.",
    benefits:
      "Grounding, patience, perseverance, Saturn remedy, stability, long-term focus.",
  },
];

export const ALL_COLORS = [
  "Blue",
  "Red",
  "Yellow",
  "Green",
  "White",
  "Purple",
  "Pink",
  "Orange",
  "Brown",
  "Black",
  "Multi",
] as const;

export const ALL_PLANETS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
] as const;

export const ALL_ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Legacy exports — kept for backward compatibility with existing product cards
export type GemstoneType =
  | "AMETHYST"
  | "BLUE_SAPPHIRE"
  | "BLUE_SPINEL"
  | "CATS_EYE"
  | "CORAL"
  | "CRYSTAL"
  | "DIAMOND"
  | "EMERALD"
  | "GREEN_TOURMALINE"
  | "HESSONITE"
  | "LAPIS_LAZULI"
  | "PEARL"
  | "RUBY"
  | "SULEMANI_HAKIK"
  | "TOPAZ"
  | "UNAKITE"
  | "YELLOW_SAPPHIRE"
  | "YEMENI_HAKIK";

export interface GemstoneTypeInfo {
  name: string;
  nameHindi: string;
  planet: string;
  color: string;
}

export const GEMSTONE_TYPE_INFO: Record<GemstoneType, GemstoneTypeInfo> = {
  AMETHYST: {
    name: "Amethyst",
    nameHindi: "कटेला",
    planet: "Saturn",
    color: "#9B59B6",
  },
  BLUE_SAPPHIRE: {
    name: "Blue Sapphire",
    nameHindi: "नीलम",
    planet: "Saturn",
    color: "#1F4E9E",
  },
  BLUE_SPINEL: {
    name: "Blue Spinel",
    nameHindi: "नीली",
    planet: "Saturn",
    color: "#2980B9",
  },
  CATS_EYE: {
    name: "Cat's Eye",
    nameHindi: "लेसुनिया",
    planet: "Ketu",
    color: "#8B7355",
  },
  CORAL: { name: "Coral", nameHindi: "मंगा", planet: "Mars", color: "#E74C3C" },
  CRYSTAL: {
    name: "Crystal",
    nameHindi: "स्फटिक",
    planet: "Moon",
    color: "#ECF0F1",
  },
  DIAMOND: {
    name: "Diamond",
    nameHindi: "हीरा",
    planet: "Venus",
    color: "#A8C4E0",
  },
  EMERALD: {
    name: "Emerald",
    nameHindi: "पत्रा",
    planet: "Mercury",
    color: "#27AE60",
  },
  GREEN_TOURMALINE: {
    name: "Green Tourmaline",
    nameHindi: "हरा टूमलाइन",
    planet: "Mercury",
    color: "#2ECC71",
  },
  HESSONITE: {
    name: "Hessonite",
    nameHindi: "गौमेद",
    planet: "Rahu",
    color: "#CA6F1E",
  },
  LAPIS_LAZULI: {
    name: "Lapis Lazuli",
    nameHindi: "लाजवर्त",
    planet: "Saturn",
    color: "#1B4F72",
  },
  PEARL: { name: "Pearl", nameHindi: "मोती", planet: "Moon", color: "#F8F9FA" },
  RUBY: { name: "Ruby", nameHindi: "माणिक्य", planet: "Sun", color: "#C0392B" },
  SULEMANI_HAKIK: {
    name: "Sulemani Hakik",
    nameHindi: "सुलेमानी हकीक",
    planet: "Rahu",
    color: "#2C3E50",
  },
  TOPAZ: {
    name: "Topaz",
    nameHindi: "सुनेहेला",
    planet: "Jupiter",
    color: "#F39C12",
  },
  UNAKITE: {
    name: "Unakite",
    nameHindi: "उनाकाइट",
    planet: "Venus",
    color: "#6D8B6A",
  },
  YELLOW_SAPPHIRE: {
    name: "Yellow Sapphire",
    nameHindi: "पुखराज",
    planet: "Jupiter",
    color: "#F1C40F",
  },
  YEMENI_HAKIK: {
    name: "Yemeni Hakik",
    nameHindi: "यमनी हकीक",
    planet: "Rahu",
    color: "#641E16",
  },
};

export interface GemstoneShopProduct {
  sku: string;
  gemstoneType: GemstoneType;
  shape: string;
  weightRatti?: number;
  priceINR: number;
  mrp?: number;
  gsCode?: string;
  description: string;
  imageUrl: string;
  nameHindi: string;
  benefits?: string[];
}

const IMG = "/placeholder-gemstone.jpg";

export const GEMSTONE_PRODUCTS: GemstoneShopProduct[] = [
  {
    sku: "T0010",
    gemstoneType: "AMETHYST",
    shape: "Pear Cut",
    priceINR: 2500,
    imageUrl: IMG,
    nameHindi: "कटेला",
    description:
      "Natural Amethyst — Pear Cut. Saturn stone for peace, clarity, and spiritual growth.",
  },
  {
    sku: "T0011",
    gemstoneType: "AMETHYST",
    shape: "Round",
    priceINR: 3200,
    imageUrl: IMG,
    nameHindi: "कटेला",
    description:
      "Natural Amethyst — Round. Promotes calm mind and protection from negative energy.",
  },
  {
    sku: "NEDGE",
    gemstoneType: "BLUE_SAPPHIRE",
    shape: "Baguette",
    priceINR: 19600,
    imageUrl: IMG,
    nameHindi: "नीलम",
    description:
      "Natural Blue Sapphire — Baguette. Powerful Saturn stone for career and fortune.",
  },
  {
    sku: "NESIA",
    gemstoneType: "BLUE_SAPPHIRE",
    shape: "Oval",
    priceINR: 35000,
    imageUrl: IMG,
    nameHindi: "नीलम",
    description:
      "Natural Blue Sapphire — Oval. Certified Neelam for Shani remedies.",
  },
  {
    sku: "HLOOD",
    gemstoneType: "BLUE_SPINEL",
    shape: "Oval",
    priceINR: 4123,
    imageUrl: IMG,
    nameHindi: "नीली",
    description:
      "Natural Blue Spinel — Oval. Affordable Saturn alternative to Neelam.",
  },
  {
    sku: "CT1001",
    gemstoneType: "CATS_EYE",
    shape: "Oval",
    priceINR: 2633,
    imageUrl: IMG,
    nameHindi: "लेसुनिया",
    description:
      "Natural Cat's Eye — Oval. Ketu stone for spiritual protection and intuition.",
  },
  {
    sku: "TIGGE",
    gemstoneType: "CATS_EYE",
    shape: "Round",
    priceINR: 7475,
    imageUrl: IMG,
    nameHindi: "लेसुनिया",
    description:
      "Natural Cat's Eye — Round. Premium chatoyant Chrysoberyl for Ketu dosha.",
  },
  {
    sku: "MLIDAT",
    gemstoneType: "CORAL",
    shape: "Triangle",
    priceINR: 8785,
    imageUrl: IMG,
    nameHindi: "मंगा",
    description:
      "Natural Red Coral — Triangle. Mangal stone for courage and vitality.",
  },
  {
    sku: "DIAM01",
    gemstoneType: "DIAMOND",
    shape: "Round",
    priceINR: 85000,
    imageUrl: IMG,
    nameHindi: "हीरा",
    description: "Natural Diamond — Round. Most powerful Venus gemstone.",
  },
  {
    sku: "EM001",
    gemstoneType: "EMERALD",
    shape: "Oval",
    priceINR: 9800,
    imageUrl: IMG,
    nameHindi: "पन्ना",
    description:
      "Natural Emerald — Oval. Mercury stone for intellect and communication.",
  },
  {
    sku: "GT001",
    gemstoneType: "GREEN_TOURMALINE",
    shape: "Oval",
    priceINR: 6500,
    imageUrl: IMG,
    nameHindi: "हरा टूमलाइन",
    description:
      "Natural Green Tourmaline — Oval. Mercury stone for growth and healing.",
  },
  {
    sku: "HES001",
    gemstoneType: "HESSONITE",
    shape: "Oval",
    priceINR: 4200,
    imageUrl: IMG,
    nameHindi: "गौमेद",
    description:
      "Natural Hessonite — Oval. Rahu stone for career transformation.",
  },
  {
    sku: "PEARL01",
    gemstoneType: "PEARL",
    shape: "Round",
    priceINR: 3500,
    imageUrl: IMG,
    nameHindi: "मोती",
    description: "Natural Pearl — Round. Moon stone for emotional balance.",
  },
  {
    sku: "RUB01",
    gemstoneType: "RUBY",
    shape: "Oval",
    priceINR: 14500,
    imageUrl: IMG,
    nameHindi: "माणिक्य",
    description: "Natural Ruby — Oval. Sun stone for leadership and vitality.",
  },
  {
    sku: "SH001",
    gemstoneType: "SULEMANI_HAKIK",
    shape: "Oval",
    priceINR: 2800,
    imageUrl: IMG,
    nameHindi: "सुलेमानी हकीक",
    description:
      "Sulemani Red Hakik — Oval. Mars stone for protection and courage.",
  },
  {
    sku: "TAX010",
    gemstoneType: "TOPAZ",
    shape: "Oval",
    priceINR: 2310,
    imageUrl: IMG,
    nameHindi: "सुनेहेला",
    description:
      "Natural Topaz — Oval. Jupiter stone for wisdom and prosperity.",
  },
  {
    sku: "UN001",
    gemstoneType: "UNAKITE",
    shape: "Oval",
    priceINR: 4275,
    imageUrl: IMG,
    nameHindi: "उनाकाइट",
    description:
      "Natural Unakite — Oval. Venus stone for love and emotional healing.",
  },
  {
    sku: "YS001",
    gemstoneType: "YELLOW_SAPPHIRE",
    shape: "Cushion",
    priceINR: 12330,
    imageUrl: IMG,
    nameHindi: "पुखराज",
    description:
      "Natural Yellow Sapphire — Cushion. Jupiter stone for prosperity.",
  },
  {
    sku: "YH001",
    gemstoneType: "YEMENI_HAKIK",
    shape: "Oval",
    priceINR: 10688,
    imageUrl: IMG,
    nameHindi: "यमनी हकीख",
    description:
      "Natural Yemeni Hakik — Oval. Rahu stone for protection and spiritual power.",
  },
];

export function getUniquePlanets(): string[] {
  const planets = new Set<string>();
  for (const info of Object.values(GEMSTONE_TYPE_INFO)) {
    planets.add(info.planet);
  }
  return Array.from(planets).sort();
}

export function getCountByType(): Record<GemstoneType, number> {
  const counts = {} as Record<GemstoneType, number>;
  for (const p of GEMSTONE_PRODUCTS) {
    counts[p.gemstoneType] = (counts[p.gemstoneType] ?? 0) + 1;
  }
  return counts;
}
