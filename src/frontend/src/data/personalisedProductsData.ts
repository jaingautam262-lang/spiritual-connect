export type PersonalisedCategory =
  | "PENDANT"
  | "KADA"
  | "PEN"
  | "RING"
  | "BRACELET"
  | "NECKLACE"
  | "KEYCHAIN"
  | "LOCKET"
  | "OTHER";

export interface PersonalisedProduct {
  id: string;
  name: string;
  nameHindi?: string;
  category: PersonalisedCategory;
  manualCode?: string;
  price: number;
  mrp?: number;
  description: string;
  benefits: string[];
  imageUrl: string;
  customisationNote: string;
  inStock: boolean;
}

export const PERSONALISED_CATEGORY_INFO: Record<
  PersonalisedCategory,
  { label: string; labelHindi: string; emoji: string }
> = {
  PENDANT: { label: "Pendant", labelHindi: "लॉकेट / पेंडेंट", emoji: "📿" },
  KADA: { label: "Kada", labelHindi: "कड़ा", emoji: "⌚" },
  PEN: { label: "Pen", labelHindi: "पेन", emoji: "✒️" },
  RING: { label: "Ring", labelHindi: "अंगूठी", emoji: "💍" },
  BRACELET: { label: "Bracelet", labelHindi: "ब्रेसलेट", emoji: "📿" },
  NECKLACE: { label: "Necklace", labelHindi: "हार", emoji: "💎" },
  KEYCHAIN: { label: "Keychain", labelHindi: "चाबी की चेन", emoji: "🔑" },
  LOCKET: { label: "Locket", labelHindi: "लॉकेट", emoji: "🔮" },
  OTHER: { label: "Other", labelHindi: "अन्य", emoji: "✨" },
};

export const PERSONALISED_PRODUCTS: PersonalisedProduct[] = [
  // ── PENDANTS (8) ──────────────────────────────────────────────
  {
    id: "pp-001",
    name: "Name Pendant – Silver Plated",
    nameHindi: "नाम लॉकेट – सिल्वर प्लेटेड",
    category: "PENDANT",
    price: 699,
    mrp: 999,
    description:
      "Elegant silver-plated pendant with your name engraved in Hindi or English. A deeply personal spiritual keepsake.",
    benefits: [
      "Strengthens identity & confidence",
      "Abhimantrit before dispatch",
      "Lightweight & comfortable",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide your name in Hindi or English (up to 12 characters). Choose font style: Devanagari / Roman.",
    inStock: true,
  },
  {
    id: "pp-002",
    name: "Initial Pendant – Gold Plated",
    nameHindi: "इनिशियल लॉकेट – गोल्ड प्लेटेड",
    category: "PENDANT",
    price: 599,
    mrp: 799,
    description:
      "Minimalist gold-plated pendant featuring your chosen initial letter. Perfect daily-wear spiritual jewellery.",
    benefits: [
      "Lucky initial energy amplification",
      "IGP gold plating – tarnish resistant",
      "Unisex design",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide initial letter (A–Z). Choose gold or silver plating.",
    inStock: true,
  },
  {
    id: "pp-003",
    name: "Photo Pendant – Round Locket",
    nameHindi: "फोटो लॉकेट – गोल",
    category: "PENDANT",
    price: 899,
    mrp: 1299,
    description:
      "Carry your loved one or deity close to your heart in a beautifully crafted round photo locket pendant.",
    benefits: [
      "Keeps blessings of deity / loved ones near",
      "High-quality photo printing inside",
      "Sturdy clasp & chain",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Send clear photo (min 500x500 px). Choose round or oval shape.",
    inStock: true,
  },
  {
    id: "pp-004",
    name: "Zodiac Pendant – Crystal Inlaid",
    nameHindi: "राशि लॉकेट – क्रिस्टल जड़ित",
    category: "PENDANT",
    price: 799,
    mrp: 1099,
    description:
      "Beautifully engraved zodiac symbol pendant with a corresponding crystal inlay for alignment with your rashi energy.",
    benefits: [
      "Zodiac energy amplification",
      "Crystal matched to your rashi",
      "Abhimantrit with rashi mantra",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Select your zodiac sign (Aries to Pisces). Crystal colour assigned automatically by rashi.",
    inStock: true,
  },
  {
    id: "pp-005",
    name: "Om Pendant – Custom Engraved",
    nameHindi: "ॐ लॉकेट – नाम सहित",
    category: "PENDANT",
    price: 649,
    mrp: 899,
    description:
      "Sacred Om pendant with your name or mantra engraved on the reverse. Pure brass with gold polish.",
    benefits: [
      "Om vibration protection",
      "Mantra engraved on back for continuous energy",
      "Vedic abhimantrit",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name or short mantra (up to 20 characters) engraved on reverse side.",
    inStock: true,
  },
  {
    id: "pp-006",
    name: "Spiritual Symbol Pendant – Shree Yantra",
    nameHindi: "श्री यंत्र लॉकेट",
    category: "PENDANT",
    price: 999,
    mrp: 1499,
    description:
      "Precision-engraved Shree Yantra pendant in pure silver. Energised for wealth, protection and spiritual growth.",
    benefits: [
      "Shree Yantra wealth energy",
      "Pure 92.5 silver option",
      "Energised over 10,800 mantras",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Choose symbol: Shree Yantra / Ganesh / Trishul / Om Namah Shivaya. Engraving on back optional.",
    inStock: true,
  },
  {
    id: "pp-007",
    name: "Custom Shape Pendant – Any Deity",
    nameHindi: "कस्टम देवता लॉकेट",
    category: "PENDANT",
    price: 1299,
    mrp: 1799,
    description:
      "Fully customised pendant shaped as your chosen deity — Hanuman Ji, Ganesh Ji, Maa Durga and more. Hand-crafted.",
    benefits: [
      "Personal deity connection",
      "Handcrafted in India",
      "Energised with specific deity mantra",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Specify deity: Hanuman / Ganesh / Durga / Krishna / Shiv / Other. Size: small (18mm) or large (25mm).",
    inStock: true,
  },
  {
    id: "pp-008",
    name: "Birthstone Pendant – Natural Crystal",
    nameHindi: "जन्म-रत्न लॉकेट",
    category: "PENDANT",
    price: 1199,
    mrp: 1599,
    description:
      "Natural birthstone pendant matched to your birth month. Certified genuine stone, silver-framed setting.",
    benefits: [
      "Monthly gemstone resonance",
      "Certified natural stone",
      "Abhimantrit with janm tithi",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide date of birth. Stone assigned by birth month. Name engraving optional on back.",
    inStock: true,
  },
  // ── KADA / BRACELET (7) ───────────────────────────────────────
  {
    id: "pp-009",
    name: "Name Kada – IGP Gold Plated",
    nameHindi: "नाम कड़ा – गोल्ड प्लेटेड",
    category: "KADA",
    price: 1299,
    mrp: 1799,
    description:
      "Premium IGP gold-plated kada with your name elegantly engraved. A spiritual powerhouse worn on the wrist.",
    benefits: [
      "Name energy on wrist 24x7",
      "IGP tarnish-resistant plating",
      "Adjustable size",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name in Hindi or English (up to 10 characters). Wrist size (S/M/L) to be shared.",
    inStock: true,
  },
  {
    id: "pp-010",
    name: "Mantra Kada – Custom Sanskrit Mantra",
    nameHindi: "मंत्र कड़ा – संस्कृत मंत्र",
    category: "KADA",
    price: 1499,
    mrp: 1999,
    description:
      "Have your favourite Sanskrit mantra or Vedic shloka engraved on a wide-band kada. Continuously radiates mantra energy.",
    benefits: [
      "Continuous mantra vibration",
      "Wide band – maximum engraving space",
      "Brass with gold polish",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide mantra text (up to 30 characters). Choose deity association for energisation.",
    inStock: true,
  },
  {
    id: "pp-011",
    name: "Custom Engraved Kada – Name + Symbol",
    nameHindi: "कस्टम कड़ा – नाम + चिन्ह",
    category: "KADA",
    price: 1099,
    mrp: 1499,
    description:
      "Kada featuring your name alongside your chosen spiritual symbol — Om, Swastik, Trishul or Shree Yantra.",
    benefits: [
      "Dual personalisation",
      "Symbol energy + name energy",
      "Protective daily wear",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name (up to 10 chars) + symbol choice: Om / Swastik / Trishul / Shree. Finish: gold or silver.",
    inStock: true,
  },
  {
    id: "pp-012",
    name: "Couple Bracelet – Name Pair",
    nameHindi: "कपल ब्रेसलेट – नाम जोड़ी",
    category: "BRACELET",
    price: 1799,
    mrp: 2499,
    description:
      "A beautiful pair of crystal bracelets — each with one partner's name engraved. Celebrate your bond spiritually.",
    benefits: [
      "Strengthens relationship bond",
      "Rose Quartz base – love amplification",
      "Set of 2 bracelets",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide both names. Choose stone: Rose Quartz / Turquoise / Amethyst. Price is for the pair.",
    inStock: true,
  },
  {
    id: "pp-013",
    name: "Family Bracelet – 3 Names Engraved",
    nameHindi: "पारिवारिक ब्रेसलेट",
    category: "BRACELET",
    price: 1599,
    mrp: 2199,
    description:
      "Carry your family's energy wherever you go. A wide-band bracelet with up to 3 family member names engraved.",
    benefits: [
      "Family protection energy",
      "Sandalwood + metal combo band",
      "Handcrafted",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide up to 3 names (Hindi/English). Bracelet size to be specified.",
    inStock: true,
  },
  {
    id: "pp-014",
    name: "Name Bracelet – Crystal Beads",
    nameHindi: "नाम ब्रेसलेट – क्रिस्टल",
    category: "BRACELET",
    price: 899,
    mrp: 1299,
    description:
      "Crystal bead bracelet with your name in letter beads. Choose your lucky crystal colour aligned to your rashi.",
    benefits: [
      "Crystal healing + name energy",
      "Elastic – fits most wrists",
      "Abhimantrit",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide name (up to 8 characters). Stone options: Amethyst / Rose Quartz / Citrine / Green Jade.",
    inStock: true,
  },
  {
    id: "pp-015",
    name: "Rudraksha Custom Bracelet",
    nameHindi: "रुद्राक्ष कस्टम ब्रेसलेट",
    category: "BRACELET",
    price: 1399,
    mrp: 1899,
    description:
      "5 Mukhi Rudraksha bracelet with a custom silver-plated charm engraved with your name or deity. Powerful daily wear.",
    benefits: [
      "5 Mukhi Rudraksha – Shiva energy",
      "Custom charm adds personal vibration",
      "Certified Nepali Rudraksha",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Charm options: name / Om / Ganesh / Hanuman. Wrist size required.",
    inStock: true,
  },
  // ── PENS (4) ──────────────────────────────────────────────────
  {
    id: "pp-016",
    name: "Crystal Pen – Customised Name",
    nameHindi: "क्रिस्टल पेन – नाम सहित",
    category: "PEN",
    price: 849,
    mrp: 1199,
    description:
      "Abhimantrit crystal pen with your name laser-engraved on the barrel. Boosts concentration and writing success.",
    benefits: [
      "Crystal healing + name energy",
      "Smooth roller-ball tip",
      "Abhimantrit for education & business",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name/initials (up to 15 chars) on barrel. Crystal type: Clear Quartz / Amethyst / Citrine.",
    inStock: true,
  },
  {
    id: "pp-017",
    name: "Name Engraved Pyrite Pen",
    nameHindi: "नाम उत्कीर्ण पाइराइट पेन",
    category: "PEN",
    price: 899,
    mrp: 1199,
    description:
      "Premium Pyrite-tipped pen with your name engraved on gold-finish barrel. Attracts wealth & success with every signature.",
    benefits: [
      "Pyrite – wealth & success energy",
      "Professional gold finish",
      "Abhimantrit for prosperity",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name or designation engraved (up to 20 chars). Gold or silver finish barrel.",
    inStock: true,
  },
  {
    id: "pp-018",
    name: "Amethyst Pen – Customised",
    nameHindi: "एमेथिस्ट पेन – कस्टम",
    category: "PEN",
    price: 749,
    mrp: 999,
    description:
      "Elegant Amethyst crystal pen personalised with your name. Promotes clarity, calm, and creative thinking.",
    benefits: [
      "Amethyst – clarity & intuition",
      "Reduces exam anxiety",
      "Gift-ready packaging",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name or short message on barrel (up to 15 chars). Comes in gift box.",
    inStock: true,
  },
  {
    id: "pp-019",
    name: "Gold Plated Pen – Custom Engraved",
    nameHindi: "गोल्ड प्लेटेड पेन – कस्टम",
    category: "PEN",
    price: 999,
    mrp: 1399,
    description:
      "Luxury gold-plated pen with custom name and spiritual symbol engraving. Ideal corporate Diwali gift.",
    benefits: [
      "Prestige & professional image",
      "IGP gold plating on metal body",
      "Symbol + name dual engraving",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name + choose symbol: Om / Swastik / Ganesh. Bulk orders (10+) available at discount.",
    inStock: true,
  },
  // ── RINGS (5) ─────────────────────────────────────────────────
  {
    id: "pp-020",
    name: "Name Ring – Silver Plated",
    nameHindi: "नाम अंगूठी – सिल्वर",
    category: "RING",
    price: 799,
    mrp: 1099,
    description:
      "Stylish silver-plated ring with your name engraved inside the band. A continuous reminder of your spiritual identity.",
    benefits: [
      "Personal vibration on finger chakra",
      "Inner engraving – private & sacred",
      "Adjustable size",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name inside band (up to 10 chars). Ring size (US/India) required.",
    inStock: true,
  },
  {
    id: "pp-021",
    name: "Birthstone Ring – Certified Natural",
    nameHindi: "जन्म रत्न अंगूठी",
    category: "RING",
    price: 1599,
    mrp: 2199,
    description:
      "Natural birthstone ring in silver setting, assigned by birth month and energised with the corresponding planet mantra.",
    benefits: [
      "Astrological gemstone benefits",
      "Certified natural stone",
      "Planet mantra energised",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide date of birth. Stone assigned by birth month. Ring size required. Name inside band optional.",
    inStock: true,
  },
  {
    id: "pp-022",
    name: "Couple Ring Set – Matching Pair",
    nameHindi: "कपल रिंग सेट",
    category: "RING",
    price: 2499,
    mrp: 2999,
    description:
      "A perfectly matched pair of rings — each with the partner's name engraved inside. Rose Quartz stone available.",
    benefits: [
      "Relationship harmony & love",
      "Matching design for couple energy",
      "Set of 2 rings",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Both names (up to 10 chars each). Ring sizes for both. Stone: plain / Rose Quartz / Amethyst inlay.",
    inStock: true,
  },
  {
    id: "pp-023",
    name: "Initial Ring – Gold Plated",
    nameHindi: "इनिशियल रिंग – गोल्ड",
    category: "RING",
    price: 899,
    mrp: 1199,
    description:
      "Chic gold-plated initial ring with your first letter as the centrepiece. Minimalist, powerful, sacred.",
    benefits: [
      "Personal initial energy",
      "IGP gold plating",
      "Minimalist elegance",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Initial letter (A-Z). Gold or rose-gold finish. Ring size required.",
    inStock: true,
  },
  {
    id: "pp-024",
    name: "Zodiac Ring – Rashi Stone",
    nameHindi: "राशि अंगूठी",
    category: "RING",
    price: 1199,
    mrp: 1599,
    description:
      "Zodiac symbol ring with your rashi's lucky stone. Aligned to your moon sign for daily astrological protection.",
    benefits: [
      "Rashi stone benefits",
      "Zodiac symbol engraved on face",
      "Abhimantrit with rashi mantra",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide rashi (moon sign) or date of birth. Ring size required.",
    inStock: true,
  },
  // ── LOCKETS & KEYCHAINS (3) ───────────────────────────────────
  {
    id: "pp-025",
    name: "Photo Locket – Deity / Loved One",
    nameHindi: "फोटो लॉकेट",
    category: "LOCKET",
    price: 999,
    mrp: 1399,
    description:
      "Heartfelt photo locket in gold-finish metal. Carry your deity or loved one's photo as a blessing throughout the day.",
    benefits: [
      "Constant blessings of chosen deity",
      "Opens and closes smoothly",
      "Durable metal casing",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Send photo (deity or person, min 400x400 px). Shape: round / heart / oval. Gold or silver finish.",
    inStock: true,
  },
  {
    id: "pp-026",
    name: "Name Locket – Gold Finish",
    nameHindi: "नाम लॉकेट – गोल्ड",
    category: "LOCKET",
    price: 699,
    mrp: 999,
    description:
      "Elegant name locket in shining gold finish. Can be worn as pendant or kept in purse for continuous name energy.",
    benefits: [
      "Name energy amplification",
      "Light and comfortable",
      "Gold polish – long lasting",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name in Hindi or English (up to 12 chars). Finish: gold or silver.",
    inStock: true,
  },
  {
    id: "pp-027",
    name: "Custom Keychain – Name Engraved",
    nameHindi: "कस्टम चाबी की चेन",
    category: "KEYCHAIN",
    price: 499,
    mrp: 699,
    description:
      "Premium metal keychain with your name and a chosen spiritual symbol. Practical daily-carry spiritual talisman.",
    benefits: [
      "Spiritual protection on the go",
      "Durable metal – no tarnishing",
      "Meaningful corporate gift",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name (up to 12 chars) + symbol: Om / Swastik / Ganesh / Trishul. Gold or silver finish.",
    inStock: true,
  },
  // ── OTHER (3) ─────────────────────────────────────────────────
  {
    id: "pp-028",
    name: "Name Plate – Office / Home (Brass)",
    nameHindi: "नाम प्लेट – ऑफिस / घर",
    category: "OTHER",
    price: 1499,
    mrp: 1999,
    description:
      "Premium brass name plate with your name and designation engraved. Vastu-correct placement at home or office entry.",
    benefits: [
      "Vastu-correct main entrance energy",
      "Brass – auspicious material",
      "Custom size available",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name + designation + optional symbol. Dimensions (default: 10x3 inch). Wall-mount or desk-stand.",
    inStock: true,
  },
  {
    id: "pp-029",
    name: "Custom Yantra – Personal Sankalp",
    nameHindi: "कस्टम यंत्र – व्यक्तिगत संकल्प",
    category: "OTHER",
    price: 2499,
    mrp: 2999,
    description:
      "A Yantra energised specifically with your name, gotra and janm tithi. 11,000 mantra chants by certified pandit.",
    benefits: [
      "Personal sankalp increases potency 10x",
      "11,000 mantra chants on video call",
      "Copper plate with gold outline",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide: full name, gotra, date & place of birth, concern. Video call energisation included.",
    inStock: true,
  },
  {
    id: "pp-030",
    name: "Personalised Wallet Card – Yantra",
    nameHindi: "वॉलेट यंत्र कार्ड",
    category: "OTHER",
    price: 599,
    mrp: 799,
    description:
      "Wallet-sized metal card with Shree Yantra on front and your name on back. Permanent wealth and protection companion.",
    benefits: [
      "Always in your pocket",
      "Stainless steel – lifetime use",
      "Yantra on one side, name on other",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name on back (up to 20 chars). Yantra options: Shree / Kuber / Ganesh / Bagalamukhi.",
    inStock: true,
  },
  // ── EXTRAS (5 more) ───────────────────────────────────────────
  {
    id: "pp-031",
    name: "Name Necklace – 24K Gold Flash",
    nameHindi: "नाम हार – 24 कैरेट गोल्ड",
    category: "NECKLACE",
    price: 1899,
    mrp: 2499,
    description:
      "Statement necklace with your name as the centrepiece in 24K gold flash finish. Elegant temple-wear jewellery.",
    benefits: [
      "Name as focal spiritual symbol",
      "Long-lasting flash gold finish",
      "Adjustable chain length",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Name in English (up to 10 chars). Chain length: 16 / 18 / 20 inch.",
    inStock: true,
  },
  {
    id: "pp-032",
    name: "Mantra Necklace – Personal Shlok",
    nameHindi: "मंत्र हार",
    category: "NECKLACE",
    price: 1599,
    mrp: 2099,
    description:
      "A delicate necklace with your chosen mantra or shlok charm. Sacred sound crystallised as wearable jewellery.",
    benefits: [
      "Mantra vibration at heart chakra",
      "Available in Sanskrit / Hindi",
      "Blessed by certified priest",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Mantra / shlok (up to 25 chars). Pendant finish: gold / silver / rose gold.",
    inStock: true,
  },
  {
    id: "pp-033",
    name: "Personalised Rudraksha Mala",
    nameHindi: "व्यक्तिगत रुद्राक्ष माला",
    category: "NECKLACE",
    price: 1299,
    mrp: 1799,
    description:
      "108-bead Rudraksha mala with a custom silver charm bearing your name or deity. Hand-knotted for durability.",
    benefits: [
      "108 Shiva mantra beads",
      "Custom charm adds personal sankalp",
      "Certified 5 Mukhi Rudraksha",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Charm: name / Om / deity choice. Energised before dispatch. Length adjustable.",
    inStock: true,
  },
  {
    id: "pp-034",
    name: "Navgrah Crystal Bracelet – Custom",
    nameHindi: "नवग्रह क्रिस्टल ब्रेसलेट",
    category: "BRACELET",
    price: 1699,
    mrp: 2299,
    description:
      "Nine planetary crystals on a single bracelet, with your name and Janm Rashi charm. Complete astrological protection.",
    benefits: [
      "All 9 planet stones in one",
      "Birth rashi charm personalised",
      "Full horoscope protection",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide date of birth and rashi for charm personalisation. Wrist size required.",
    inStock: true,
  },
  {
    id: "pp-035",
    name: "Birth Date Numerology Bracelet",
    nameHindi: "जन्म तारीख अंकज्योतिष ब्रेसलेट",
    category: "BRACELET",
    price: 1299,
    mrp: 1699,
    description:
      "Bracelet with lucky numerology stones based on your mulank (birth number) and date of birth. Precision crafted.",
    benefits: [
      "Mulank aligned crystal selection",
      "Numerology-based color therapy",
      "Abhimantrit with number mantra",
    ],
    imageUrl: "/placeholder-personalised.jpg",
    customisationNote:
      "Provide date of birth. Mulank and stones calculated automatically. Name bead optional.",
    inStock: true,
  },
];
