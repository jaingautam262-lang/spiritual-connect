// bracelets-catalog-data.ts — Comprehensive bracelet catalog

export interface BraceletEntry {
  id: string;
  name: string;
  nameHindi?: string;
  purpose: string[];
  materials: string;
  benefits: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  category:
    | "dhanyog"
    | "crystal"
    | "rashi"
    | "rudraksha"
    | "chakra"
    | "karungali"
    | "combo";
  deity?: string;
  templeBlessed?: boolean;
  isNewLaunch?: boolean;
  isBestSeller?: boolean;
  reviewCount?: number;
  rating?: number;
}

export const DHANYOG_BRACELETS: BraceletEntry[] = [
  {
    id: "dhan-suraksha",
    name: "Dhan Suraksha Dhanyog Bracelet",
    nameHindi: "धन सुरक्षा धन्योग ब्रेसलेट",
    purpose: ["Wealth & Prosperity", "Protection"],
    materials:
      "Crystal combination: Pyrite, Citrine, Tiger Eye, Green Aventurine",
    benefits:
      "Protects existing wealth, prevents financial losses, shields against Dhan Nashta yoga in chart. Activates Kubera energy and creates a financial safety net for the wearer.",
    price: 999,
    originalPrice: 2001,
    discountPercent: 50,
    category: "dhanyog",
    deity: "Lord Kubera",
    isBestSeller: false,
    reviewCount: 0,
    rating: 4.5,
  },
  {
    id: "dhan-unnati",
    name: "Dhan Unnati Dhanyog Bracelet",
    nameHindi: "धन उन्नति धन्योग ब्रेसलेट",
    purpose: ["Wealth & Prosperity", "Career & Success"],
    materials: "Crystal combination: Citrine, Pyrite, Clear Quartz, Sunstone",
    benefits:
      "Promotes progressive financial growth and career advancement. Activates Dhan yoga in the birth chart and helps overcome income stagnation. Perfect for salaried professionals seeking promotions.",
    price: 999,
    originalPrice: 2001,
    discountPercent: 50,
    category: "dhanyog",
    deity: "Lord Kubera",
    reviewCount: 0,
    rating: 4.5,
  },
  {
    id: "dhanda-tejas",
    name: "Dhanda Tejas Dhanyog Bracelet",
    nameHindi: "धंधा तेजस धन्योग ब्रेसलेट",
    purpose: ["Wealth & Prosperity", "Career & Success"],
    materials:
      "Crystal combination: Tiger Eye, Pyrite, Carnelian, Gold-plated beads",
    benefits:
      "Ignites business fire (Dhanda Tejas), removes obstacles in trade and commerce. Activates the warrior energy of Mars for decisive business action. Ideal for entrepreneurs and businessmen.",
    price: 999,
    originalPrice: 2001,
    discountPercent: 50,
    category: "dhanyog",
    deity: "Lord Ganesha + Kubera",
    reviewCount: 0,
    rating: 4.5,
  },
  {
    id: "udhar-mukti",
    name: "Udhar Mukti Dhanyog Bracelet",
    nameHindi: "उधार मुक्ति धन्योग ब्रेसलेट",
    purpose: ["Wealth & Prosperity", "Peace & Mental Wellbeing"],
    materials:
      "Crystal combination: Black Tourmaline, Pyrite, Citrine, Obsidian",
    benefits:
      "Specifically designed to help overcome debt (Udhar/Karz). Removes the Rin Dosha from the birth chart, activates energy for debt repayment, and prevents new debts. Works on breaking the debt cycle.",
    price: 999,
    originalPrice: 2001,
    discountPercent: 50,
    category: "dhanyog",
    deity: "Rin Mukteshwar Mahadev",
    reviewCount: 0,
    rating: 4.5,
  },
  {
    id: "dhan-dhara",
    name: "Dhan Dhara Dhanyog Bracelet",
    nameHindi: "धन धारा धन्योग ब्रेसलेट",
    purpose: ["Wealth & Prosperity"],
    materials:
      "Crystal combination: Citrine, Green Aventurine, Yellow Sapphire chip, Clear Quartz",
    benefits:
      "Creates a continuous flow (dhara) of wealth and financial opportunities. Activates the Dhana Bhava (2nd house) of the birth chart for sustained wealth accumulation. Best for those needing steady income flow.",
    price: 999,
    originalPrice: 2001,
    discountPercent: 50,
    category: "dhanyog",
    deity: "Goddess Lakshmi",
    reviewCount: 0,
    rating: 4.5,
  },
  {
    id: "rinn-mukti",
    name: "Rinn Mukti Dhanyog Bracelet",
    nameHindi: "रिण मुक्ति धन्योग ब्रेसलेट",
    purpose: ["Wealth & Prosperity", "Peace & Mental Wellbeing"],
    materials:
      "Crystal combination: Black Tourmaline, Smoky Quartz, Pyrite, Hematite",
    benefits:
      "Removes ancestral debt (Pitru Rin) and karmic financial burdens. Activates Rinmukteshwar Mahadev's energy to free the wearer from all forms of debt — financial, emotional, and karmic. Brings lasting financial freedom.",
    price: 999,
    originalPrice: 2001,
    discountPercent: 50,
    category: "dhanyog",
    deity: "Rinmukteshwar Mahadev",
    reviewCount: 0,
    rating: 4.5,
  },
  {
    id: "srijan-lakshmi",
    name: "Srijan Lakshmi Dhanyog Bracelet",
    nameHindi: "सृजन लक्ष्मी धन्योग ब्रेसलेट",
    purpose: ["Wealth & Prosperity", "Career & Success"],
    materials:
      "Crystal combination: Rose Quartz, Citrine, Green Aventurine, Moonstone",
    benefits:
      "Invokes Goddess Lakshmi's creative abundance (Srijan Shakti). Activates the ability to create new income sources and build wealth through creativity. Perfect for artists, entrepreneurs, and those in creative fields seeking financial success.",
    price: 999,
    originalPrice: 2001,
    discountPercent: 50,
    category: "dhanyog",
    deity: "Goddess Lakshmi (Srijan Roop)",
    reviewCount: 0,
    rating: 4.5,
  },
];

export const CRYSTAL_BRACELETS: BraceletEntry[] = [
  {
    id: "love-money-combo",
    name: "Love and Money Attraction Bracelet Combo",
    nameHindi: "प्रेम और धन आकर्षण ब्रेसलेट कॉम्बो",
    purpose: ["Love & Relationships", "Wealth & Prosperity"],
    materials: "Rose Quartz + Citrine dual bracelet combo (Buy 1 Get 1 FREE)",
    benefits:
      "Combines the love-attracting power of Rose Quartz with the wealth-magnetizing energy of Citrine. A complete bracelet set for both heart and material abundance. The ultimate combo for those seeking love AND prosperity simultaneously.",
    price: 1299,
    originalPrice: 3500,
    discountPercent: 63,
    category: "crystal",
    deity: "Goddess Lakshmi + Kamadeva",
    isBestSeller: true,
    reviewCount: 81,
    rating: 4.6,
  },
  {
    id: "red-garnet-bracelet",
    name: "Red Garnet Bracelet",
    nameHindi: "लाल गार्नेट ब्रेसलेट",
    purpose: [
      "Love & Relationships",
      "Career & Success",
      "Protection & Safety",
    ],
    materials: "Natural Red Garnet beads",
    benefits:
      "Red Garnet stimulates passion, courage, and vitality. Excellent for romantic relationships, overcoming depression, and restoring energy. Protects during travel and brings good fortune in new endeavors.",
    price: 1299,
    originalPrice: 1700,
    discountPercent: 24,
    category: "crystal",
    reviewCount: 131,
    rating: 4.5,
  },
  {
    id: "tiger-eye-bracelet",
    name: "Courageous Tiger Eye Stone Bracelet",
    nameHindi: "साहसी टाइगर आई ब्रेसलेट",
    purpose: ["Career & Success", "Protection & Safety"],
    materials: "Natural Tiger Eye stone beads",
    benefits:
      "Tiger Eye enhances courage, confidence, and personal power. Protects against negative energies, brings clarity of intention, and attracts luck and success. Activates the solar plexus chakra for decisive action.",
    price: 999,
    originalPrice: 1800,
    discountPercent: 45,
    category: "crystal",
    reviewCount: 114,
    rating: 4.6,
  },
  {
    id: "siddh-karungali",
    name: "Siddh Karungali Bracelet",
    nameHindi: "सिद्ध करुंगली ब्रेसलेट",
    purpose: ["Protection & Safety", "Peace & Mental Wellbeing"],
    materials: "Sacred Ebony Wood (Karungali) beads, temple blessed",
    benefits:
      "Karungali (Sacred Ebony Wood) provides powerful protection against evil eye, black magic, and negative energies. Temple-blessed at Varahi Devi Temple for maximum efficacy. Widely used in South Indian spiritual tradition for protection.",
    price: 699,
    originalPrice: 1099,
    discountPercent: 36,
    category: "karungali",
    deity: "Varahi Devi",
    templeBlessed: true,
    isBestSeller: true,
    reviewCount: 121,
    rating: 4.7,
  },
  {
    id: "soulmate-couple-bracelet",
    name: "Soulmate Couple Bracelet",
    nameHindi: "सोलमेट कपल ब्रेसलेट",
    purpose: ["Love & Relationships"],
    materials: "Rose Quartz + clear crystal matching pair (Buy 1 Get 1 FREE)",
    benefits:
      "Matching bracelet set for couples, strengthening the soulmate bond. Rose Quartz on both bracelets creates a love bridge between partners, deepening emotional connection, trust, and romantic harmony.",
    price: 899,
    originalPrice: 2100,
    discountPercent: 57,
    category: "crystal",
    deity: "Kamadeva",
    reviewCount: 115,
    rating: 4.5,
  },
  {
    id: "rose-quartz-love",
    name: "Siddh Rose Quartz Love Attraction Bracelet",
    nameHindi: "सिद्ध रोज क्वार्ट्ज प्रेम आकर्षण ब्रेसलेट",
    purpose: ["Love & Relationships"],
    materials: "Natural Rose Quartz beads, temple energized",
    benefits:
      "Rose Quartz is the ultimate love stone. This bracelet attracts romantic love, heals emotional wounds from past relationships, and promotes self-love. Temple-energized for maximum love-attraction power.",
    price: 999,
    originalPrice: 2100,
    discountPercent: 52,
    category: "crystal",
    deity: "Kamadeva + Goddess Parvati",
    templeBlessed: true,
    reviewCount: 114,
    rating: 4.6,
  },
  {
    id: "evil-eye-tourmaline",
    name: "Evil Eye Black Tourmaline Bracelet",
    nameHindi: "बुरी नज़र ब्लैक टूर्मलाइन ब्रेसलेट",
    purpose: ["Protection & Safety"],
    materials: "Natural Black Tourmaline beads with Evil Eye charm",
    benefits:
      "Combines the supreme protection of Black Tourmaline with the traditional Evil Eye (Nazar) shield. Creates a powerful double-protection barrier against black magic, evil eye, jealousy, and negative energies.",
    price: 999,
    originalPrice: 2100,
    discountPercent: 52,
    category: "crystal",
    reviewCount: 124,
    rating: 4.6,
  },
  {
    id: "citrine-wealth",
    name: "Money Attraction Citrine Bracelet",
    nameHindi: "धन आकर्षण सिट्रिन ब्रेसलेट",
    purpose: ["Wealth & Prosperity"],
    materials: "Natural Citrine beads",
    benefits:
      "Citrine — the Merchant Stone — activates the solar plexus chakra and attracts financial abundance. Never holds negative energy. Promotes positive energy, confidence, and the mindset for wealth creation.",
    price: 999,
    originalPrice: 1800,
    discountPercent: 45,
    category: "crystal",
    isBestSeller: true,
    reviewCount: 303,
    rating: 4.7,
  },
  {
    id: "raw-pyrite-bracelet",
    name: "Siddh Money Magnet Raw Pyrite Bracelet",
    nameHindi: "सिद्ध मनी मैग्नेट रॉ पायराइट ब्रेसलेट",
    purpose: ["Wealth & Prosperity"],
    materials: "Raw Pyrite beads + Green Aventurine",
    benefits:
      "Powerful combination of raw Pyrite (Fool's Gold) and Green Aventurine for maximum wealth attraction. Raw Pyrite is more potent than polished. Activates solar plexus, attracts abundance, and provides financial confidence.",
    price: 999,
    originalPrice: 1700,
    discountPercent: 41,
    category: "crystal",
    reviewCount: 79,
    rating: 4.4,
  },
  {
    id: "amethyst-healing",
    name: "Healing Aura Amethyst Bracelet",
    nameHindi: "हीलिंग ऑरा अमेथिस्ट ब्रेसलेट",
    purpose: ["Peace & Mental Wellbeing"],
    materials: "Natural Amethyst beads",
    benefits:
      "Amethyst soothes anxiety, promotes deep sleep, and enhances spiritual awareness. Protects the aura from negative energies and psychic attacks. Activates the third eye and crown chakras for higher consciousness and inner peace.",
    price: 999,
    originalPrice: 2200,
    discountPercent: 55,
    category: "crystal",
    reviewCount: 123,
    rating: 4.6,
  },
  {
    id: "lapis-wisdom",
    name: "Wisdom Lapis Lazuli Bracelet",
    nameHindi: "ज्ञान लैपिस लाजुली ब्रेसलेट",
    purpose: ["Career & Success", "Peace & Mental Wellbeing"],
    materials: "Natural Lapis Lazuli beads",
    benefits:
      "Lapis Lazuli enhances intellectual abilities, communication, and spiritual truth. Activates throat and third eye chakras for clear, wise expression. Excellent for students, teachers, and those in intellectual professions.",
    price: 999,
    originalPrice: 1700,
    discountPercent: 41,
    category: "crystal",
    reviewCount: 104,
    rating: 4.5,
  },
  {
    id: "sphatik-crystal",
    name: "Natural Sphatik Crystal Bracelet",
    nameHindi: "नेचुरल स्फटिक क्रिस्टल ब्रेसलेट",
    purpose: ["Peace & Mental Wellbeing", "Protection & Safety"],
    materials: "Natural Clear Quartz (Sphatik) beads",
    benefits:
      "Sphatik (Clear Quartz) is associated with Goddess Lakshmi and purity. Amplifies prayers and intentions, purifies the aura, and provides clarity of mind. Used in traditional Hindu practice for Lakshmi puja and Shiva worship.",
    price: 999,
    originalPrice: 1700,
    discountPercent: 41,
    category: "crystal",
    deity: "Goddess Lakshmi + Lord Shiva",
    reviewCount: 135,
    rating: 4.6,
  },
  {
    id: "money-magnet-bracelet",
    name: "Money Magnet (Dhan Yog Bracelet)",
    nameHindi: "मनी मैग्नेट (धन योग ब्रेसलेट)",
    purpose: ["Wealth & Prosperity"],
    materials:
      "6-crystal combination: Pyrite, Tiger Eye, Citrine, Clear Quartz, Green Aventurine, Jade",
    benefits:
      "The ultimate wealth bracelet combining 6 powerful crystals to create a Dhan Yoga (wealth combination). Each crystal targets a specific aspect of financial growth — from attracting opportunities to building discipline for wealth accumulation.",
    price: 1999,
    originalPrice: 3500,
    discountPercent: 43,
    category: "crystal",
    isNewLaunch: true,
    isBestSeller: true,
    reviewCount: 356,
    rating: 4.8,
  },
  {
    id: "raw-pyrite-plain",
    name: "Raw Pyrite Bracelet",
    nameHindi: "रॉ पायराइट ब्रेसलेट",
    purpose: ["Wealth & Prosperity"],
    materials: "Unpolished Raw Pyrite nuggets",
    benefits:
      "Raw (unpolished) Pyrite retains its natural energy matrix and is considered more powerful than polished. Attracts financial abundance, increases confidence, and activates solar plexus energy for wealth creation.",
    price: 899,
    originalPrice: 1800,
    discountPercent: 50,
    category: "crystal",
    reviewCount: 0,
    rating: 4.3,
  },
  {
    id: "karungali-plain",
    name: "Karungali Bracelet",
    nameHindi: "करुंगली ब्रेसलेट",
    purpose: ["Protection & Safety", "Peace & Mental Wellbeing"],
    materials: "Sacred Ebony Wood (Karungali) beads",
    benefits:
      "Traditional South Indian protective bracelet made from sacred Karungali (Ebony) wood. Provides protection from evil eye, negative energies, and bad luck. Widely recommended by astrologers for general protection and wellbeing.",
    price: 799,
    originalPrice: 1599,
    discountPercent: 50,
    category: "karungali",
    reviewCount: 0,
    rating: 4.4,
  },
  {
    id: "hematite-bracelet",
    name: "Hematite Bracelet",
    nameHindi: "हेमेटाइट ब्रेसलेट",
    purpose: ["Protection & Safety", "Peace & Mental Wellbeing"],
    materials: "Natural Hematite beads",
    benefits:
      "Hematite provides powerful grounding, reduces stress, and improves focus. Iron-rich stone beneficial for anemia and blood circulation. Protects from negative energies and promotes clear, rational thinking under pressure.",
    price: 799,
    originalPrice: 1600,
    discountPercent: 50,
    category: "crystal",
    reviewCount: 0,
    rating: 4.3,
  },
  {
    id: "money-magnet-simple",
    name: "Money Magnet Bracelet",
    nameHindi: "मनी मैग्नेट ब्रेसलेट",
    purpose: ["Wealth & Prosperity"],
    materials: "Pyrite + Citrine combination",
    benefits:
      "Simplified wealth bracelet combining Pyrite's golden abundance energy with Citrine's merchant stone power. Affordable entry into crystal wealth attraction for beginners.",
    price: 799,
    originalPrice: 1499,
    discountPercent: 47,
    category: "crystal",
    reviewCount: 0,
    rating: 4.3,
  },
];

export const RASHI_CRYSTAL_BRACELETS: BraceletEntry[] = [
  {
    id: "rashi-mesh",
    name: "Mesh (Aries) Rashi Crystal Bracelet",
    nameHindi: "मेष राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Peace & Mental Wellbeing"],
    materials: "Red Coral chips + Carnelian",
    benefits:
      "Balances Aries energies, channels Mars energy positively. Brings confidence, energy, and protection for Mesh Rashi.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
  {
    id: "rashi-vrishabh",
    name: "Vrishabh (Taurus) Rashi Crystal Bracelet",
    nameHindi: "वृषभ राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Wealth & Prosperity"],
    materials: "Rose Quartz + Green Aventurine",
    benefits:
      "Enhances Venus energy for Taurus. Brings love, luxury, and financial stability.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
  {
    id: "rashi-mithun",
    name: "Mithun (Gemini) Rashi Crystal Bracelet",
    nameHindi: "मिथुन राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Career & Success"],
    materials: "Citrine + Lapis Lazuli + Clear Quartz",
    benefits:
      "Activates Mercury's positive effects for Gemini. Enhances communication, intelligence, and adaptability.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
    reviewCount: 0,
    rating: 4.4,
  },
  {
    id: "rashi-kark",
    name: "Kark (Cancer) Rashi Crystal Bracelet",
    nameHindi: "कर्क राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Peace & Mental Wellbeing"],
    materials: "Moonstone + Pearl chip + Rose Quartz",
    benefits:
      "Balances the Moon's influence for Cancer. Brings emotional stability, intuition, and nurturing energy.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
  {
    id: "rashi-simha",
    name: "Simha (Leo) Rashi Crystal Bracelet",
    nameHindi: "सिंह राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Career & Success"],
    materials: "Ruby chips + Sunstone + Tiger Eye",
    benefits:
      "Amplifies Sun's power for Leo. Enhances leadership, charisma, and success in all endeavors.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
  {
    id: "rashi-kanya",
    name: "Kanya (Virgo) Rashi Crystal Bracelet",
    nameHindi: "कन्या राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Career & Success"],
    materials: "Emerald chips + Peridot + Green Aventurine",
    benefits:
      "Enhances Mercury energy for Virgo. Improves analytical thinking, health, and professional precision.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
  {
    id: "rashi-tula",
    name: "Tula (Libra) Rashi Crystal Bracelet",
    nameHindi: "तुला राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Love & Relationships"],
    materials: "Rose Quartz + Opalite + Moonstone",
    benefits:
      "Balances Venus energy for Libra. Brings harmony in relationships, fairness, and aesthetic appreciation.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
  {
    id: "rashi-vrischik",
    name: "Vrischik (Scorpio) Rashi Crystal Bracelet",
    nameHindi: "वृश्चिक राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Protection & Safety"],
    materials: "Obsidian + Black Tourmaline + Garnet",
    benefits:
      "Channels Mars/Ketu energy for Scorpio. Provides transformation, protection, and deep emotional insight.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
  {
    id: "rashi-dhanu",
    name: "Dhanu (Sagittarius) Rashi Crystal Bracelet",
    nameHindi: "धनु राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Peace & Mental Wellbeing", "Career & Success"],
    materials: "Yellow Sapphire chips + Amethyst + Sodalite",
    benefits:
      "Amplifies Jupiter's blessings for Sagittarius. Brings wisdom, optimism, spiritual growth, and success.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
  {
    id: "rashi-makar",
    name: "Makar (Capricorn) Rashi Crystal Bracelet",
    nameHindi: "मकर राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Career & Success"],
    materials: "Blue Sapphire chips + Hematite + Tiger Eye",
    benefits:
      "Balances Saturn's influence for Capricorn. Enhances discipline, career progress, and material success.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
  {
    id: "rashi-kumbh",
    name: "Kumbh (Aquarius) Rashi Crystal Bracelet",
    nameHindi: "कुम्भ राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Peace & Mental Wellbeing", "Career & Success"],
    materials: "Hessonite chips + Labradorite + Amethyst",
    benefits:
      "Activates Rahu/Saturn energy for Aquarius. Brings innovation, humanitarian ideals, and spiritual insight.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
    reviewCount: 0,
    rating: 4.4,
  },
  {
    id: "rashi-meen",
    name: "Meen (Pisces) Rashi Crystal Bracelet",
    nameHindi: "मीन राशि क्रिस्टल ब्रेसलेट",
    purpose: ["Peace & Mental Wellbeing"],
    materials: "Cat's Eye chips + Moonstone + Aquamarine",
    benefits:
      "Enhances Jupiter/Ketu energy for Pisces. Brings spiritual depth, compassion, and creative intuition.",
    price: 999,
    originalPrice: 1999,
    discountPercent: 50,
    category: "rashi",
  },
];

export const SPECIALTY_BRACELETS: BraceletEntry[] = [
  {
    id: "seven-chakra",
    name: "7 Chakra Bracelet",
    nameHindi: "सप्त चक्र ब्रेसलेट",
    purpose: ["Peace & Mental Wellbeing"],
    materials:
      "7 crystals: Garnet, Carnelian, Citrine, Aventurine, Lapis Lazuli, Blue Sapphire chip, Amethyst",
    benefits:
      "Balances all seven chakras simultaneously. One crystal per chakra — root to crown. Promotes complete physical, emotional, and spiritual wellbeing. Excellent for energy healers and those new to crystal healing.",
    price: 1199,
    originalPrice: 2500,
    discountPercent: 52,
    category: "chakra",
  },
  {
    id: "navratna-bracelet",
    name: "Navratna Bracelet (9 Gemstones)",
    nameHindi: "नवरत्न ब्रेसलेट",
    purpose: ["Career & Success", "Wealth & Prosperity", "Protection & Safety"],
    materials:
      "9 Navratna gemstone chips: Ruby, Pearl, Coral, Emerald, Yellow Sapphire, Diamond/White Sapphire, Blue Sapphire, Hessonite, Cat's Eye",
    benefits:
      "Balances all nine planetary energies simultaneously. The complete astrological remedy in a single bracelet. Provides protection from all planetary doshas, attracts overall prosperity, and maintains cosmic balance in life.",
    price: 2499,
    originalPrice: 4999,
    discountPercent: 50,
    category: "crystal",
    deity: "Navagraha",
    isBestSeller: true,
  },
  {
    id: "panchadhatu-bracelet",
    name: "Panchadhatu Bracelet",
    nameHindi: "पंचधातु ब्रेसलेट",
    purpose: ["Protection & Safety", "Peace & Mental Wellbeing"],
    materials: "Five metals: Gold, Silver, Copper, Iron, Zinc alloy",
    benefits:
      "Panchadhatu (five metals) bracelet is a traditional Vedic remedy for multiple planetary problems. Contains energies of Sun (gold), Moon (silver), Mars (copper), Saturn (iron), and mixed metals for Jupiter. Provides comprehensive planetary protection.",
    price: 899,
    originalPrice: 1800,
    discountPercent: 50,
    category: "crystal",
    deity: "Navagraha",
  },
  {
    id: "copper-bracelet",
    name: "Copper Magnetic Bracelet",
    nameHindi: "तांबे का ब्रेसलेट",
    purpose: ["Peace & Mental Wellbeing", "Protection & Safety"],
    materials: "Pure copper with magnetic elements",
    benefits:
      "Pure copper has been used in Ayurveda and folk medicine for centuries. Associated with planet Venus and Lord Shiva. Provides anti-inflammatory benefits, improves circulation, and is considered auspicious for health and Venus-related remedies.",
    price: 499,
    originalPrice: 999,
    discountPercent: 50,
    category: "crystal",
    deity: "Lord Shiva + Venus",
  },
  {
    id: "rudraksha-bracelet-men",
    name: "Rudraksha Bracelet For Men",
    nameHindi: "पुरुषों के लिए रुद्राक्ष ब्रेसलेट",
    purpose: ["Protection & Safety", "Peace & Mental Wellbeing"],
    materials: "5 Mukhi Rudraksha beads (Nepal), silver spacers",
    benefits:
      "Traditional Rudraksha bracelet providing protection, peace, and Jupiter blessings. 5 Mukhi beads — the most spiritually versatile — are suitable for all zodiac signs. Brings health, spirituality, and removes negative energy.",
    price: 799,
    originalPrice: 1500,
    discountPercent: 47,
    category: "rudraksha",
    deity: "Lord Shiva",
    isBestSeller: true,
  },
  {
    id: "rudraksha-bracelet-women",
    name: "Rudraksha Bracelet For Women",
    nameHindi: "महिलाओं के लिए रुद्राक्ष ब्रेसलेट",
    purpose: [
      "Protection & Safety",
      "Peace & Mental Wellbeing",
      "Love & Relationships",
    ],
    materials: "5 Mukhi and 2 Mukhi Rudraksha beads, rose gold spacers",
    benefits:
      "Specially designed for women with 5 Mukhi (Jupiter, general protection) and 2 Mukhi (Moon, emotional balance) Rudraksha combination. Provides protection, emotional stability, and harmonious relationships.",
    price: 899,
    originalPrice: 1800,
    discountPercent: 50,
    category: "rudraksha",
    deity: "Lord Shiva + Goddess Parvati",
    isBestSeller: true,
  },
];

export const ALL_BRACELETS = [
  ...DHANYOG_BRACELETS,
  ...CRYSTAL_BRACELETS,
  ...RASHI_CRYSTAL_BRACELETS,
  ...SPECIALTY_BRACELETS,
];
