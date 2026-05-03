export interface YantraEntry {
  id: string;
  name: string;
  hindi_name: string;
  deity: string;
  faith: "Hindu" | "Jain";
  material: "Copper" | "Silver" | "Gold" | "Paper";
  shape_description: string;
  benefits: string[];
  placement: string;
  activation_mantra: string;
  puja_procedure: string[];
  price_range: string;
  emoji: string;
  category: string;
}

export const yantraList: YantraEntry[] = [
  {
    id: "shri-yantra",
    name: "Shri Yantra",
    hindi_name: "श्री यंत्र",
    deity: "Lalita Tripurasundari (Devi)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "Nine interlocking triangles radiating from a central Bindu point. Four upward triangles (Shiva) and five downward triangles (Shakti) form 43 smaller triangles, enclosed by two lotus rings (8 and 16 petals) and three concentric circles, all within a square Bhupura with four gates.",
    benefits: [
      "The most powerful yantra for wealth, prosperity, and material abundance",
      "Removes obstacles and attracts Lakshmi's grace",
      "Harmonizes the home and business environment with divine energy",
      "Accelerates spiritual growth and awakens Kundalini Shakti",
    ],
    placement:
      "East-facing wall of puja room, or on a wooden pedestal facing East. Can also be placed in office or business facing the main entrance. Never place on the floor.",
    activation_mantra:
      "ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः",
    puja_procedure: [
      "Clean the yantra with Ganga Jal and wipe dry with a clean red/yellow cloth",
      "Place on a wooden board facing East, light a ghee lamp and incense sticks",
      "Offer fresh red flowers, vermilion (kumkum), and sandal paste to the yantra",
      "Chant the activation mantra 108 times daily for 21 days to fully energize",
    ],
    price_range: "₹500–5,000",
    emoji: "🔯",
    category: "Shakti",
  },
  {
    id: "kuber-yantra",
    name: "Kuber Yantra",
    hindi_name: "कुबेर यंत्र",
    deity: "Kubera (God of Wealth)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "A 3×3 magic square containing the numbers 2–3–7, 9–5–1, 4–6–8, each row, column, and diagonal summing to 12. Enclosed within a lotus border and inscribed with the Kuber Beej Mantra in Sanskrit script.",
    benefits: [
      "Attracts sudden wealth, financial gains, and business prosperity",
      "Removes financial obstacles and debts",
      "Brings abundant material blessings and treasury growth",
      "Activates the NNE (North-North-East) wealth corner of the home",
    ],
    placement:
      "North direction of home or business — the direction of Kubera. Place on a clean elevated surface in the treasury room, safe, or cash counter.",
    activation_mantra:
      "ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा",
    puja_procedure: [
      "Wash the yantra with Panchamrit (milk, honey, curd, ghee, sugar) and Ganga Jal",
      "Place on yellow cloth facing North with a gold coin beneath it",
      "Light yellow candles or camphor and offer yellow flowers and sweets",
      "Chant the mantra 108 times every Thursday for best results",
    ],
    price_range: "₹300–2,000",
    emoji: "💰",
    category: "Wealth",
  },
  {
    id: "mahalakshmi-yantra",
    name: "Mahalakshmi Yantra",
    hindi_name: "महालक्ष्मी यंत्र",
    deity: "Mahalakshmi",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "Central Shatkona (Star of David — two interlocking triangles) within concentric circles of eight and sixteen lotus petals. The Bhupura (outer square) bears the Ashtakshar Lakshmi mantra inscribed around all four sides.",
    benefits: [
      "Invokes Goddess Lakshmi's direct blessings for wealth and fortune",
      "Removes Daridrya (poverty) and financial stagnation",
      "Brings harmony, beauty, and abundance into the home",
      "Especially powerful for Diwali Puja and Friday worship",
    ],
    placement:
      "Puja room, East or North wall. Also effective near a cash locker or business entrance, facing the main door.",
    activation_mantra: "ॐ श्रीं महालक्ष्म्यै नमः",
    puja_procedure: [
      "Purify yantra with Ganga Jal and dry with pink or yellow cloth on a Friday",
      "Place fresh lotus or marigold flowers and light a ghee lamp with five wicks",
      "Apply kumkum and turmeric paste on the central Bindu point",
      "Chant the Mahalakshmi mantra 1,008 times during Navratri for maximum effect",
    ],
    price_range: "₹400–3,000",
    emoji: "🌸",
    category: "Wealth",
  },
  {
    id: "surya-yantra",
    name: "Surya Yantra",
    hindi_name: "सूर्य यंत्र",
    deity: "Surya Dev (Sun God)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "A 3×3 magic square with numbers 1–9 arranged so each row and column sums to 15 (the solar number). Set within concentric circles of solar rays, lotus petals, and the Surya Beej Mantra inscribed in Devanagari.",
    benefits: [
      "Strengthens the Sun in the horoscope and removes Surya Dosha",
      "Grants authority, recognition, and career advancement",
      "Improves eyesight, heart health, and bone strength",
      "Enhances self-confidence, willpower, and spiritual illumination",
    ],
    placement:
      "East wall of puja room, facing West (so it faces East when you look at it). Best placed in the office or study room for career success.",
    activation_mantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
    puja_procedure: [
      "Clean yantra on a Sunday morning with raw milk mixed with Ganga Jal",
      "Place on a copper or wooden platform facing East",
      "Offer red flowers, red sandalwood paste, and light a ghee lamp",
      "Chant the Surya Beej mantra 7,000 times over 21 Sundays for full activation",
    ],
    price_range: "₹300–2,500",
    emoji: "☀️",
    category: "Planetary",
  },
  {
    id: "navgrah-yantra",
    name: "Navgrah Yantra",
    hindi_name: "नवग्रह यंत्र",
    deity:
      "Nine Planets (Surya, Chandra, Mangal, Budha, Brihaspati, Shukra, Shani, Rahu, Ketu)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "Nine separate planetary magic squares arranged in a 3×3 grid pattern. The Sun square is at the center, surrounded by Moon (NE), Mars (E), Mercury (SE), Jupiter (S), Venus (SW), Saturn (W), Rahu (NW), and Ketu (N). Each square has unique numbers and planetary bija mantras.",
    benefits: [
      "Balances all nine planetary influences simultaneously",
      "Removes all Navagraha Doshas at once",
      "Comprehensive protection from all planetary afflictions",
      "Ideal for those with multiple planetary problems in the birth chart",
    ],
    placement:
      "Central puja room or meditation space. Place all nine planets in their directional positions relative to center. Activate at planetary confluence times (Navagraha Homam).",
    activation_mantra:
      "ॐ नवग्रहाय नमः — followed by individual planetary mantras in order",
    puja_procedure: [
      "Perform Navgraha Puja on a Sunday that falls in Shukla Paksha",
      "Use nine separate oil lamps with nine colors of flowers",
      "Chant each planetary mantra 108 times in the traditional planetary order",
      "Perform every Sunday for 9 weeks for complete activation",
    ],
    price_range: "₹800–8,000",
    emoji: "🪐",
    category: "Planetary",
  },
  {
    id: "bagalamukhi-yantra",
    name: "Bagalamukhi Yantra",
    hindi_name: "बगलामुखी यंत्र",
    deity: "Bagalamukhi (8th Mahavidya)",
    faith: "Hindu",
    material: "Gold",
    shape_description:
      "Central downward-pointing triangle (Yoni) within two concentric triangles forming a hexagram, surrounded by eight lotus petals and sixteen petals, enclosed by the Bhupura. The yantra is written in yellow on a yellow background using turmeric paste — representing Bagalamukhi's solar yellow color.",
    benefits: [
      "Paralyzes enemies and protects from all hostile forces",
      "Wins court cases, legal disputes, and competitive examinations",
      "Silences critics and opponents effectively",
      "Most powerful yantra for protection against black magic and evil forces",
    ],
    placement:
      "Puja room facing East, or kept in the pocket/wallet for personal protection. Also placed at the main entrance of home or office for protection.",
    activation_mantra:
      "ॐ ह्लीं बगलामुखी सर्वदुष्टानाम् वाचं मुखं पदं स्तम्भय जिव्हां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा",
    puja_procedure: [
      "Perform on a Tuesday or Amavasya night facing North",
      "Use yellow mustard seeds, yellow flowers, and yellow cloth for the altar",
      "Light a havan fire and offer ghee, yellow mustard, and sesame",
      "Chant the Bagalamukhi mantra 108 × 10 = 1,080 times for complete activation",
    ],
    price_range: "₹1,000–15,000",
    emoji: "🌟",
    category: "Protection",
  },
  {
    id: "kali-yantra",
    name: "Kali Yantra",
    hindi_name: "काली यंत्र",
    deity: "Mahakali (1st Mahavidya)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "Concentric circles of 8 and 16 lotus petals surrounding a central Shatkona (hexagram) with the Kali Beej \"Krim\" written within. The entire yantra is dark blue-black in color, representing Kali's primordial darkness. Enclosed in the Bhupura with Mahakali's 1,000-name cipher.",
    benefits: [
      "Destroys ego, ignorance, and all forms of negativity",
      "Grants liberation (Moksha) and fearlessness",
      "Protects from black magic, spirits, and severe planetary afflictions",
      "Awakens Kundalini energy and accelerates spiritual transformation",
    ],
    placement:
      "Puja room or meditation room, preferably facing South (Kali's direction). Keep in dark blue cloth when not in active worship.",
    activation_mantra: "ॐ क्रीं काल्यै नमः",
    puja_procedure: [
      "Activate on Kali Puja night (Amavasya in Kartik month) or any Amavasya",
      "Offer black sesame seeds, red hibiscus flowers, and a ghee lamp",
      "Chant Kali mantra 1,008 times in a dark room lit only by the lamp",
      "Maintain reverence and purity of mind throughout the ritual",
    ],
    price_range: "₹500–5,000",
    emoji: "🖤",
    category: "Shakti",
  },
  {
    id: "ganesh-yantra",
    name: "Ganesh Yantra",
    hindi_name: "गणेश यंत्र",
    deity: "Ganesh (Vighnaharta)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      'Central upward triangle representing Ganesha\'s cosmic form, surrounded by six petals symbolizing his six divine attributes (Siddhi, Buddhi, Riddhi, Vighnanashak, Mangalkar, Prathamesh). Enclosed in three concentric circles with the Ganesha Beej mantra "Gam" inscribed throughout, within a square Bhupura.',
    benefits: [
      "Removes all obstacles (Vighna Nashak) from new beginnings and endeavors",
      "Brings success, intelligence, and wisdom to academic pursuits",
      "Best yantra for new business launches, home purchase, or marriage",
      "First yantra to activate before any other for maximum effectiveness",
    ],
    placement:
      "Near the main entrance of home or business, facing the door. Also place at the start of any new project or venture.",
    activation_mantra: "ॐ गं गणपतये नमः",
    puja_procedure: [
      "Perform on Ganesh Chaturthi or any Wednesday/Chaturthi tithi",
      "Offer durva grass, modak (sweet dumpling), and red flowers",
      "Light an oil lamp and incense in the morning after bath",
      'Chant "Om Gam Ganapataye Namah" 1,008 times for 21 consecutive days',
    ],
    price_range: "₹300–3,000",
    emoji: "🐘",
    category: "Removal of Obstacles",
  },
  {
    id: "saraswati-yantra",
    name: "Saraswati Yantra",
    hindi_name: "सरस्वती यंत्र",
    deity: "Saraswati (Goddess of Knowledge)",
    faith: "Hindu",
    material: "Silver",
    shape_description:
      "An upward-pointing Shatkona (six-pointed star) inscribed with Saraswati's Beej mantra \"Aim\" at the center. Surrounded by lotus petals in white and cream tones, with the Saraswati Vandana inscribed in the outer ring. The Bhupura bears the four Vedas' names at each gate.",
    benefits: [
      "Bestows wisdom, eloquence, and mastery of arts and sciences",
      "Enhances memory, concentration, and academic achievement",
      "Removes speech disorders and improves communication",
      "Ideal for students, musicians, writers, and scholars",
    ],
    placement:
      "Study room or library, facing East. Place near books, musical instruments, or on the study table. Especially effective during exam periods.",
    activation_mantra: "ॐ ऐं महासरस्वत्यै नमः",
    puja_procedure: [
      "Activate on Vasant Panchami or any Thursday in Shukla Paksha",
      "Offer white flowers, white sweets (kheer), and sandalwood",
      "Place new books and pen/paper beside the yantra during activation",
      'Chant "Om Aim Saraswatyai Namah" 1,008 times facing East',
    ],
    price_range: "₹400–4,000",
    emoji: "📚",
    category: "Knowledge",
  },
  {
    id: "durga-yantra",
    name: "Durga Yantra",
    hindi_name: "दुर्गा यंत्र",
    deity: "Durga (Navadurga)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "Nine concentric lotus petals (Navadurga) surrounding a central Bindu, enclosed in three circles and the Bhupura. Each petal bears one of Durga's nine forms: Shailaputri, Brahmacharini, Chandraghanta, Kushmanda, Skandamata, Katyayani, Kaalratri, Mahagauri, Siddhidatri.",
    benefits: [
      "Protects from all negative forces, black magic, and evil eyes",
      "Grants victory over enemies and difficult situations",
      "Removes fear, illness, and all forms of Durga Dosha",
      "Most effective yantra during Navratri periods",
    ],
    placement:
      "Main entrance or puja room, facing East or North. Protects the entire household when placed at the threshold.",
    activation_mantra: "ॐ दुं दुर्गायै नमः",
    puja_procedure: [
      "Best activated during Navratri on Ashtami or Navami tithi",
      "Offer red flowers, red chunri, and sindoor to the yantra",
      "Light nine oil lamps (one for each Navadurga)",
      "Chant the Durga Saptashati or Navarn mantra 108 times",
    ],
    price_range: "₹400–4,000",
    emoji: "🔱",
    category: "Protection",
  },
  {
    id: "hanuman-yantra",
    name: "Hanuman Yantra",
    hindi_name: "हनुमान यंत्र",
    deity: "Hanuman (Pavanputra)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "A central Panchmukhi Hanuman face (five-headed form) drawn within a triangular configuration, surrounded by the Hanuman Chalisa verses condensed into beej-form inscriptions. The outer boundary bears protective Sanskrit verses from the Ram Raksha Stotra.",
    benefits: [
      "Ultimate protection from ghosts, evil spirits, and black magic",
      "Grants immense courage, strength, and fearlessness",
      "Removes all Shani (Saturn) and Rahu-Ketu afflictions",
      "Brings success in Hanuman Chalisa recitation and sadhana",
    ],
    placement:
      "Main entrance door or puja room. Extremely effective when placed facing South (Hanuman's directional domain).",
    activation_mantra: "ॐ हं हनुमते नमः",
    puja_procedure: [
      "Activate on a Tuesday or Hanuman Jayanti in Shukla Paksha",
      "Offer red sindoor, jasmine oil, and red flowers to the yantra",
      "Light a mustard oil lamp and incense in the morning after bath",
      'Chant Hanuman Chalisa 11 times followed by "Om Hum Hanumate Namah" 108 times',
    ],
    price_range: "₹300–3,000",
    emoji: "🐒",
    category: "Protection",
  },
  {
    id: "vishnu-yantra",
    name: "Vishnu Yantra",
    hindi_name: "विष्णु यंत्र",
    deity: "Vishnu (Preserver of Universe)",
    faith: "Hindu",
    material: "Gold",
    shape_description:
      "Central Shatkona representing the Sudarshana Chakra, surrounded by 12 lotus petals (12 forms of Vishnu). The outer ring contains the Vishnu Sahasranama condensed cipher. The Bhupura has the four Vedic directions with Garuda, Shesha Nag, Lotus, and Sudarshana at the gates.",
    benefits: [
      "Preserves family harmony, dharma, and cosmic balance in the home",
      "Grants Moksha (liberation) and removal of all sins",
      "Especially powerful on Ekadashi and Vaikunta Ekadashi",
      "Protects from all adharmic influences",
    ],
    placement:
      "Puja room, facing East. Place near the Tulsi plant or at the altar where Vishnu or Krishna is worshipped.",
    activation_mantra: "ॐ नमो भगवते वासुदेवाय",
    puja_procedure: [
      "Activate on Ekadashi or Vaikunta Ekadashi in Shukla Paksha",
      "Offer Tulsi leaves, yellow flowers, and sandalwood paste",
      'Read the Vishnu Sahasranama or chant "Om Namo Bhagavate Vasudevaya" 1,008 times',
      "Maintain strict vegetarianism and celibacy during the 11-day activation period",
    ],
    price_range: "₹500–8,000",
    emoji: "🐚",
    category: "Dharma",
  },
  {
    id: "shiv-yantra",
    name: "Shiv Yantra",
    hindi_name: "शिव यंत्र",
    deity: "Shiva (Mahadev)",
    faith: "Hindu",
    material: "Silver",
    shape_description:
      'The Shiva Yantra features the Shiva Lingam symbol at the center, surrounded by the Panchakshar mantra "Namah Shivaya" in a circular arrangement. Eight downward-pointing triangles represent the eight forms of Shiva (Ashtamurti). The outer Bhupura has the sacred Rudra cipher at each gate.',
    benefits: [
      "Removes all sins and negative karmas from past lives",
      "Grants Shiva's direct blessings for health, peace, and liberation",
      "Most powerful during Maha Shivratri and Pradosh Vrat",
      "Neutralizes all planetary doshas when placed with Shivling",
    ],
    placement:
      "Puja room or Shivling altar, facing North (Shiva's direction). Must be placed on a white cloth.",
    activation_mantra: "ॐ नमः शिवाय",
    puja_procedure: [
      "Activate on Maha Shivratri or any Pradosh Vrat (13th lunar day)",
      "Perform Rudrabhishek: pour milk, honey, Ganga Jal, and bel leaves on the yantra",
      'Chant "Om Namah Shivaya" 1,008 times in a continuous session',
      "Keep a Shivling nearby for maximum Shiva energy activation",
    ],
    price_range: "₹400–5,000",
    emoji: "⚡",
    category: "Shiva",
  },
  {
    id: "ram-yantra",
    name: "Ram Yantra",
    hindi_name: "राम यंत्र",
    deity: "Lord Ram (Maryada Purushottam)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      'The sacred "Ram" in Devanagari script placed within a central triangle, surrounded by the Ram Raksha Stotra inscribed in concentric rings of lotus petals. The Bhupura bears 108 names of Ram at its boundary. A golden trident (Trishul) marks the four directional gateways.',
    benefits: [
      "Brings righteousness, truth, and dharmic order to the household",
      "Removes all planetary afflictions through Ram's divine grace",
      "Protects from all calamities and grants ultimate victory",
      "Ideal for those going through legal battles or injustice",
    ],
    placement:
      "Puja room or meditation space, facing East. Especially effective in homes where Ram Navami is celebrated.",
    activation_mantra: "श्री राम जय राम जय जय राम",
    puja_procedure: [
      "Activate on Ram Navami or any auspicious Tuesday/Sunday",
      "Offer tulsi leaves, yellow flowers, and panchamrit",
      "Read Ram Raksha Stotra or Ramayan verses for 9 consecutive days",
      'Chant "Shri Ram Jai Ram Jai Jai Ram" 10,800 times over 9 days',
    ],
    price_range: "₹300–3,000",
    emoji: "🏹",
    category: "Dharma",
  },
  {
    id: "mangal-yantra",
    name: "Mangal Yantra",
    hindi_name: "मंगल यंत्र",
    deity: "Mangal Deva (Mars)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      'The Mangal Yantra is a 3×3 magic square with numbers arranged so each row sums to 15. The central number 5 is replaced by the Mars Beej "Kram". The entire yantra is inscribed in red on a copper plate with the Mangal Gayatri mantra around the border.',
    benefits: [
      "Removes Mangal Dosha and reduces marital problems",
      "Grants courage, energy, and competitive success",
      "Protects from accidents, violence, and sudden injuries",
      "Beneficial for athletes, military personnel, and surgeons",
    ],
    placement: "South direction of home or puja room. Place on red cloth.",
    activation_mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
    puja_procedure: [
      "Activate on Tuesday in Shukla Paksha at sunrise",
      "Offer red flowers, red lentils (masoor dal), and a red cloth",
      "Light a ghee lamp and perform havan if possible",
      "Chant the Mangal Beej mantra 7,000 times over 40 days",
    ],
    price_range: "₹300–2,500",
    emoji: "🔴",
    category: "Planetary",
  },
  {
    id: "shani-yantra",
    name: "Shani Yantra",
    hindi_name: "शनि यंत्र",
    deity: "Shani Deva (Saturn)",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "A 3×3 Saturnic magic square where each row sums to 15 using Saturn's numbers. The central Beej \"Shram\" is inscribed in dark blue. Surrounded by Shani's eight directional deities and enclosed in the Bhupura with the Shani Stotra verses.",
    benefits: [
      "Reduces Sade Sati malefic effects and Saturn's harsh transit impacts",
      "Grants karma correction, justice, and righteous outcomes",
      "Brings discipline, patience, and long-term success",
      "Removes fear of Saturday, Shani Dasha, and judicial problems",
    ],
    placement:
      "West direction of home or puja room (Saturn's direction). Place on black or dark blue cloth.",
    activation_mantra: "ॐ शं शनिश्चराय नमः",
    puja_procedure: [
      "Activate on Saturday during Shani Pradosh or Amavasya",
      "Offer sesame seeds (til), black sesame oil, and mustard in an iron lamp",
      "Donate black cloth, sesame, and oil to the needy on the same day",
      "Chant the Shani Beej mantra 23,000 times over one Shani Dasha period",
    ],
    price_range: "₹300–3,000",
    emoji: "⚫",
    category: "Planetary",
  },
  {
    id: "vastu-yantra",
    name: "Vastu Yantra",
    hindi_name: "वास्तु यंत्र",
    deity: "Vastu Purusha",
    faith: "Hindu",
    material: "Copper",
    shape_description:
      "A sacred geometric grid representing the 45 Vastu Devatas (divine energies) of the eight directions plus the center (Brahma Sthana). The central 3×3 Brahmasthana contains the Vastu Purusha's cosmic body, surrounded by the 32 outer Vastu Devatas at the boundary.",
    benefits: [
      "Corrects all Vastu defects in home, office, and commercial spaces",
      "Brings peace, prosperity, and positive energy to the living space",
      "Neutralizes directional imbalances without structural changes",
      "Ideal as a single remedy for multiple Vastu problems",
    ],
    placement:
      "Central point (Brahmasthan) of the home, buried under the floor or placed on the floor at center. Also effective when placed in the puja room.",
    activation_mantra: "ॐ वास्तु पुरुषाय नमः",
    puja_procedure: [
      "Perform Vastu Puja on the day of Griha Pravesh or any auspicious day",
      "Place the yantra at the exact center of the building or room",
      "Chant the Vastu Purusha mantra 108 times",
      "Perform ongoing monthly puja on each Purnima (full moon)",
    ],
    price_range: "₹500–6,000",
    emoji: "🏠",
    category: "Vastu",
  },
  // Jain Yantras
  {
    id: "namokar-yantra",
    name: "Namokar Yantra",
    hindi_name: "णमोकार यंत्र",
    deity: "Panch Parameshthi (Arihant, Siddha, Acharya, Upadhyaya, Sadhu)",
    faith: "Jain",
    material: "Silver",
    shape_description:
      'The most sacred Jain yantra, featuring the five lines of the Namokar Mantra arranged in a pentagonal star formation. Each point of the star corresponds to one of the Panch Parameshthi. The central Bindu represents the soul\'s journey toward Moksha. The outer ring bears "Om" in Jain Prakrit script.',
    benefits: [
      "The most powerful Jain mantra yantra for protection and liberation",
      "Removes all sins and karmic bondage from multiple lives",
      "Grants peace, courage, and divine guidance in difficult times",
      "Central to all Jain puja, meditation, and daily practice",
    ],
    placement:
      "Central altar in Jain puja room or temple. Should face East. Worship daily with pure water, saffron, and white flowers.",
    activation_mantra:
      "णमो अरिहंताणं णमो सिद्धाणं णमो आइरियाणं णमो उवज्झायाणं णमो लोए सव्व साहूणं",
    puja_procedure: [
      "Clean with pure water and place on a white silk cloth facing East",
      "Offer ashtadravya (eight substances): Jal, Chandan, Akshat, Pushpa, Deepa, Dhoop, Naivedya, Fal",
      "Recite the complete Namokar Mantra 108 times as Mala Jap",
      "Perform Paryushana and Samvatsari special puja for maximum spiritual benefit",
    ],
    price_range: "₹800–10,000",
    emoji: "🙏",
    category: "Jain Liberation",
  },
  {
    id: "siddhachakra-yantra",
    name: "Siddhachakra Yantra",
    hindi_name: "सिद्धचक्र यंत्र",
    deity:
      "Nine Supreme Beings (Arihant, Siddha, Acharya, Upadhyaya, Sadhu + 4 Dharms)",
    faith: "Jain",
    material: "Silver",
    shape_description:
      "A circular yantra with nine concentric petals arranged in the Navapad formation. The center holds the Arihant symbol, surrounded by the eight other divine entities in their respective petals. The outer ring features the Siddhachakra mantra in ancient Ardha Magadhi script with lotus border.",
    benefits: [
      "The most sacred Jain mandala for all-round spiritual protection",
      "Cures diseases, removes obstacles, and grants Navapad blessings",
      "Central to Ayambil Oli Puja (the 9-day Jain fasting ritual)",
      "Grants fulfillment of righteous wishes (satvik kamna purti)",
    ],
    placement:
      "Jain temple or home puja room. Worshipped during Ayambil Oli and Paryushana Parva. Keep wrapped in white cloth when not in use.",
    activation_mantra: "ॐ ह्रीं नमः सिद्धचक्राय",
    puja_procedure: [
      "Perform Siddhachakra Puja with complete Ashtadravya during Ayambil Oli",
      "Fast (Upvas) on the first and last day of the nine-day worship period",
      "Perform Abhisheka (sacred bath) of the yantra with Panchamrit on Navami",
      "Conclude with Kshamapana — seeking forgiveness from all beings",
    ],
    price_range: "₹1,000–12,000",
    emoji: "🌐",
    category: "Jain Liberation",
  },
  {
    id: "navadev-yantra",
    name: "Navadev Yantra",
    hindi_name: "नवदेव यंत्र",
    deity: "Nine Jain Devatas (Siddhachakra + Ashtamahal Devi)",
    faith: "Jain",
    material: "Copper",
    shape_description:
      "Nine connected geometric chambers, each representing one of the nine supreme divine beings in Jain cosmology. The central chamber holds the Navadev Beej yantra — a complex pattern of intersecting circles and triangles. Each chamber is inscribed with the corresponding deity's Jain mantra in ancient Prakrit.",
    benefits: [
      "Brings blessings from all nine Jain divine beings simultaneously",
      "Especially effective for removing health problems and family conflicts",
      "Supports the Navpad Oli Aaradhana fasting ritual",
      "Grants protection for the entire family throughout the year",
    ],
    placement:
      "Home puja room or Jain Derasar (temple). Best placed in the Northeast corner of the worship space.",
    activation_mantra: "ॐ ह्रीं नमः पञ्चपरमेष्ठिभ्यः",
    puja_procedure: [
      "Install during Mahamastak Abhisheka or any auspicious Jain tithi",
      "Perform Snatra Puja (sacred bath ritual) with five sacred liquids",
      "Offer white flowers, incense, and non-violent Naivedya (fruits and sweets)",
      "Observe five essential vows (Panchanuvratas) throughout the worship period",
    ],
    price_range: "₹600–8,000",
    emoji: "✨",
    category: "Jain Liberation",
  },
];
