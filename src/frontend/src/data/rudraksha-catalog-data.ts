// rudraksha-catalog-data.ts — Complete Nepal + Indonesia Rudraksha catalog

export interface RudrakshaEntry {
  id: string;
  mukhiCount: number;
  name: string;
  nameHindi: string;
  origin: "Nepal" | "Indonesia";
  rulingDeity: string;
  rulingPlanet: string;
  benefits: string;
  priceRange: string;
  imageUrl: string;
  certificateInfo: string;
  authenticityCheck: string;
  recommendedFor: string;
}

export const NEPAL_RUDRAKSHA: RudrakshaEntry[] = [
  {
    id: "nepal-1",
    mukhiCount: 1,
    name: "1 Mukhi Rudraksha (Nepal)",
    nameHindi: "एक मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Shiva",
    rulingPlanet: "Sun (Surya)",
    benefits:
      "Ek Mukhi Rudraksha is the most powerful and rare of all beads, representing the supreme consciousness of Lord Shiva. It bestows moksha (liberation), removes all sins, and brings profound spiritual awakening. The wearer gains exceptional clarity, leadership, and unwavering focus. It is particularly effective for removing ego, calming the mind, and opening the Sahasrara chakra. Regular wear brings divine protection, success in all endeavors, and destroys all planetary doshas simultaneously.",
    priceRange: "₹5,000 – ₹50,000",
    imageUrl: "/assets/images/rudraksha/nepal-1-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "Float test, X-ray, + expert verification",
    recommendedFor:
      "Spiritual seekers, leaders, those with weak Sun, Sahasrara chakra activation, moksha seekers",
  },
  {
    id: "nepal-2",
    mukhiCount: 2,
    name: "2 Mukhi Rudraksha (Nepal)",
    nameHindi: "दो मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Ardhanarishvara (Shiva-Parvati)",
    rulingPlanet: "Moon (Chandra)",
    benefits:
      "Do Mukhi Rudraksha represents the divine union of Shiva and Shakti (Ardhanarishvara). It brings harmony in relationships, strengthens marital bonds, and blesses couples with understanding and love. Excellent for emotional stability, mental peace, and curing lunar disorders. Helps with relationship issues, unites separated partners, heals emotional wounds, and promotes fertility. Activates the Ajna (third eye) chakra and enhances intuition and clairvoyance.",
    priceRange: "₹500 – ₹3,000",
    imageUrl: "/assets/images/rudraksha/nepal-2-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Married couples, those with Moon problems, emotional healing, relationship issues",
  },
  {
    id: "nepal-3",
    mukhiCount: 3,
    name: "3 Mukhi Rudraksha (Nepal)",
    nameHindi: "तीन मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Agni (Brahma-Vishnu-Mahesh)",
    rulingPlanet: "Mars (Mangal)",
    benefits:
      "Teen Mukhi Rudraksha represents the divine trinity (Brahma, Vishnu, Mahesh) and is ruled by Agni (fire god). It burns away past sins, removes ancestral curses, and provides liberation from the cycle of birth. Excellent for boosting confidence, curing blood disorders, and increasing metabolism. Highly effective for students struggling with memory and concentration. Removes the negative effects of Mars, cures skin diseases, and provides energy and vitality.",
    priceRange: "₹250 – ₹1,500",
    imageUrl: "/assets/images/rudraksha/nepal-3-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test + visual inspection",
    recommendedFor:
      "Students, those with Mars dosha, blood disorders, lack of confidence, ancestral curse removal",
  },
  {
    id: "nepal-4",
    mukhiCount: 4,
    name: "4 Mukhi Rudraksha (Nepal)",
    nameHindi: "चार मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Brahma",
    rulingPlanet: "Mercury (Budh)",
    benefits:
      "Char Mukhi Rudraksha is ruled by Lord Brahma and blessed by Mercury. It significantly enhances intellectual abilities, memory power, and communication skills. Perfect for students, teachers, writers, and speakers. Removes the malefic effects of Mercury, cures nervous system disorders, and improves lung health. Activates the Vishuddha (throat) chakra, enables clear expression, and bestows creative intelligence. Highly recommended for those appearing in competitive examinations.",
    priceRange: "₹200 – ₹1,200",
    imageUrl: "/assets/images/rudraksha/nepal-4-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test + visual inspection",
    recommendedFor:
      "Students, teachers, writers, Mercury weak in chart, throat issues, competitive exams",
  },
  {
    id: "nepal-5",
    mukhiCount: 5,
    name: "5 Mukhi Rudraksha (Nepal)",
    nameHindi: "पाँच मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Panchmukhi Shiva (Kalagni Rudra)",
    rulingPlanet: "Jupiter (Guru)",
    benefits:
      "Panch Mukhi Rudraksha is the most commonly worn Rudraksha and represents the five elements and five senses. Ruled by Jupiter, it brings wisdom, health, prosperity, and spiritual growth. It purifies blood, regulates blood pressure, and benefits the heart. Removes the malefic effects of Jupiter, improves financial stability, and blesses with children. Excellent for meditation, reduces stress and anxiety, and enhances overall wellbeing. Safe for all age groups to wear.",
    priceRange: "₹100 – ₹500",
    imageUrl: "/assets/images/rudraksha/nepal-5-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "General health and prosperity, all age groups, Jupiter weak in chart, meditation practitioners",
  },
  {
    id: "nepal-6",
    mukhiCount: 6,
    name: "6 Mukhi Rudraksha (Nepal)",
    nameHindi: "छः मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Kartikeya (Skanda)",
    rulingPlanet: "Venus (Shukra)",
    benefits:
      "Chah Mukhi Rudraksha is ruled by Lord Kartikeya and Venus. It bestows courage, willpower, and leadership qualities. Excellent for those in defense, sports, and competitive fields. Strengthens reproductive health, brings marital harmony, and blesses with progeny. Removes Venus-related problems like relationship issues, skin problems, and kidney disorders. Activates the Manipura (solar plexus) chakra, enhances self-confidence, and improves artistic talents.",
    priceRange: "₹300 – ₹2,000",
    imageUrl: "/assets/images/rudraksha/nepal-6-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Athletes, defense personnel, Venus weak in chart, relationship issues, artistic pursuits",
  },
  {
    id: "nepal-7",
    mukhiCount: 7,
    name: "7 Mukhi Rudraksha (Nepal)",
    nameHindi: "सात मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Goddess Mahalakshmi",
    rulingPlanet: "Saturn (Shani)",
    benefits:
      "Saat Mukhi Rudraksha is the bead of Goddess Mahalakshmi and is one of the most powerful for wealth attraction. It removes Shani (Saturn) doshas including Sade Sati, Dhaiya, and Shani Mahadasha effects. Brings abundant wealth, removes financial obstacles, and blesses with continuous prosperity. Highly effective for business growth, career advancement, and overcoming debt. Activates the Svadhisthana chakra and improves reproductive health.",
    priceRange: "₹400 – ₹3,000",
    imageUrl: "/assets/images/rudraksha/nepal-7-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Wealth attraction, Saturn problems, Sade Sati, business growth, debt relief",
  },
  {
    id: "nepal-8",
    mukhiCount: 8,
    name: "8 Mukhi Rudraksha (Nepal)",
    nameHindi: "आठ मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Ganesha",
    rulingPlanet: "Rahu",
    benefits:
      "Aath Mukhi Rudraksha is blessed by Lord Ganesha and removes all obstacles from life. It counteracts the malefic effects of Rahu including Ketu Mahadasha and Rahu Kaal. Provides protection against black magic, evil eye, and negative energies. Bestows success in new ventures, helps overcome legal issues, and removes sudden obstacles. Excellent for writers, artists, and those in media and technology fields. Activates the Muladhara chakra.",
    priceRange: "₹600 – ₹4,000",
    imageUrl: "/assets/images/rudraksha/nepal-8-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Obstacle removal, Rahu dosha, black magic protection, new business ventures, technology fields",
  },
  {
    id: "nepal-9",
    mukhiCount: 9,
    name: "9 Mukhi Rudraksha (Nepal)",
    nameHindi: "नौ मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Goddess Durga (Nav Durga)",
    rulingPlanet: "Ketu",
    benefits:
      "Nav Mukhi Rudraksha is blessed by all nine forms of Goddess Durga. It provides divine feminine power, courage, and protection. Counteracts Ketu-related problems, spiritual confusion, and past-life karmic issues. Highly effective for those suffering from fear, anxiety, and psychological disorders. Activates all chakras simultaneously, accelerates spiritual evolution, and provides protection from all types of enemies. Blesses with worldly pleasures and eventual moksha.",
    priceRange: "₹800 – ₹5,000",
    imageUrl: "/assets/images/rudraksha/nepal-9-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Divine protection, Ketu dosha, fear and anxiety, spiritual growth, enemy protection",
  },
  {
    id: "nepal-10",
    mukhiCount: 10,
    name: "10 Mukhi Rudraksha (Nepal)",
    nameHindi: "दस मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Vishnu (Dashavatara)",
    rulingPlanet: "All planets (Navagraha)",
    benefits:
      "Das Mukhi Rudraksha represents Lord Vishnu's ten incarnations (Dashavatar) and pacifies all nine planets simultaneously. It is a powerful protector that removes all planetary doshas. Provides peace, removes fear, calms the mind, and brings divine blessings. Excellent for those facing multiple planetary problems at once. Protects from evil spirits, bad dreams, and negative environments. Helps in legal matters, court cases, and restoring lost reputation.",
    priceRange: "₹1,000 – ₹7,000",
    imageUrl: "/assets/images/rudraksha/nepal-10-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "All-planet dosha, court cases, fear, negative energy protection, reputation restoration",
  },
  {
    id: "nepal-11",
    mukhiCount: 11,
    name: "11 Mukhi Rudraksha (Nepal)",
    nameHindi: "ग्यारह मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Eleven Rudras (Ekadasha Rudra)",
    rulingPlanet: "All planets (balanced)",
    benefits:
      "Gyarah Mukhi Rudraksha is blessed by eleven Rudras and is one of the rarest beads. It bestows the wisdom and courage of Lord Hanuman, making the wearer fearless and capable. Excellent for those in adventure sports, military, and high-risk professions. Removes all planetary doshas, increases physical strength, and sharpens intellect. Highly effective for meditation, awakening kundalini, and accelerating spiritual progress. Brings success in all endeavors.",
    priceRange: "₹3,000 – ₹20,000",
    imageUrl: "/assets/images/rudraksha/nepal-11-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "X-ray + float test + expert verification",
    recommendedFor:
      "Fearlessness, spiritual advancement, military/defense, kundalini activation, rare planetary doshas",
  },
  {
    id: "nepal-12",
    mukhiCount: 12,
    name: "12 Mukhi Rudraksha (Nepal)",
    nameHindi: "बारह मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Surya (Sun God)",
    rulingPlanet: "Sun (Surya)",
    benefits:
      "Barah Mukhi Rudraksha channels the power of the twelve Adityas (Sun forms) and is considered the Sun bead. Highly effective for leadership, authority, and government favor. Removes all Sun-related problems including weak vitality, eye disorders, and bone issues. Blesses with radiant health, commanding personality, and success in politics or administration. Removes ego while bestowing rightful authority and fame. Excellent for those seeking promotions or leadership roles.",
    priceRange: "₹2,500 – ₹15,000",
    imageUrl: "/assets/images/rudraksha/nepal-12-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Leadership, government favor, Sun weak in chart, authority, politics and administration",
  },
  {
    id: "nepal-13",
    mukhiCount: 13,
    name: "13 Mukhi Rudraksha (Nepal)",
    nameHindi: "तेरह मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Indra / Lord Kamadeva",
    rulingPlanet: "Venus (Shukra)",
    benefits:
      "Terah Mukhi Rudraksha is one of the rarest and most powerful beads, blessed by Kamadeva (god of love) and Lord Indra. It fulfills all material desires, blesses with charisma, and removes all obstacles in love and marriage. Provides extraordinary powers of attraction and persuasion. Excellent for those in creative fields, diplomacy, and entertainment. Removes Venus dosha, brings marital bliss, and blesses with progeny. Activates all desires into reality.",
    priceRange: "₹5,000 – ₹35,000",
    imageUrl: "/assets/images/rudraksha/nepal-13-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "X-ray + float test + expert verification",
    recommendedFor:
      "Love and marriage, Venus problems, charisma, creative fields, desire fulfillment",
  },
  {
    id: "nepal-14",
    mukhiCount: 14,
    name: "14 Mukhi Rudraksha (Nepal)",
    nameHindi: "चौदह मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Hanuman / Shiva",
    rulingPlanet: "Saturn (Shani)",
    benefits:
      "Chaudah Mukhi Rudraksha (Deva Mani) is worn at the top of the head and is considered the most auspicious bead after the 1 Mukhi. It opens the third eye (Ajna chakra), enhances intuition, and provides divine foresight. Removes Saturn dosha, Sade Sati, and all karmic debts. Brings extraordinary success in all fields, protects from all dangers, and bestows divine wisdom. Highly recommended for spiritual masters and those seeking enlightenment.",
    priceRange: "₹8,000 – ₹55,000",
    imageUrl: "/assets/images/rudraksha/nepal-14-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "X-ray + float test + expert verification",
    recommendedFor:
      "Third eye opening, Saturn problems, Sade Sati, divine wisdom, spiritual enlightenment",
  },
  {
    id: "nepal-15",
    mukhiCount: 15,
    name: "15 Mukhi Rudraksha (Nepal)",
    nameHindi: "पंद्रह मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Pashupati Shiva",
    rulingPlanet: "Mercury (Budh)",
    benefits:
      "Pandrah Mukhi Rudraksha is blessed by Pashupatinath (Lord of all beings) and is excellent for healers, doctors, and veterinarians. It provides mastery over all living beings, deep compassion, and healing abilities. Removes Mercury problems, improves communication, and enhances intelligence. Activates the Vishudha chakra for pure expression. Excellent for overcoming addictions, healing chronic diseases, and spiritual healing abilities. Very rare and precious.",
    priceRange: "₹10,000 – ₹60,000",
    imageUrl: "/assets/images/rudraksha/nepal-15-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "X-ray + float test + expert verification",
    recommendedFor:
      "Healers, doctors, Mercury problems, healing abilities, chronic disease, addiction recovery",
  },
  {
    id: "nepal-16",
    mukhiCount: 16,
    name: "16 Mukhi Rudraksha (Nepal)",
    nameHindi: "सोलह मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Ram (Mahadev)",
    rulingPlanet: "Moon (Chandra)",
    benefits:
      "Solah Mukhi Rudraksha is blessed by Lord Ram — the ideal of truth, justice, and virtue. It removes all fears, protects from thieves and accidents, and bestows victory over enemies. Provides immense mental peace, cures sleep disorders, and removes Moon-related problems. Excellent for those in judiciary, law, and governance. Makes the wearer victorious in all legal matters and restores lost wealth and property. Brings divine grace and righteous living.",
    priceRange: "₹12,000 – ₹70,000",
    imageUrl: "/assets/images/rudraksha/nepal-16-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "X-ray + float test + expert verification",
    recommendedFor:
      "Fear removal, legal matters, Moon problems, judiciary, property disputes, enemy protection",
  },
  {
    id: "nepal-17",
    mukhiCount: 17,
    name: "17 Mukhi Rudraksha (Nepal)",
    nameHindi: "सत्रह मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Vishwakarma (God of Crafts)",
    rulingPlanet: "Saturn (Shani)",
    benefits:
      "Satrah Mukhi Rudraksha is blessed by Vishwakarma — the divine architect — and is excellent for engineers, architects, and builders. It brings sudden unexpected wealth, fulfills all worldly desires, and removes Shani's malefic effects. Highly beneficial for those in construction, real estate, and manufacturing industries. Provides excellent concentration, technical skills, and creative abilities. One of the rarest beads — finding an authentic one is considered a divine blessing.",
    priceRange: "₹15,000 – ₹80,000",
    imageUrl: "/assets/images/rudraksha/nepal-17-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "X-ray + float test + expert verification",
    recommendedFor:
      "Engineers, architects, Saturn problems, real estate, sudden wealth, technical fields",
  },
  {
    id: "nepal-18",
    mukhiCount: 18,
    name: "18 Mukhi Rudraksha (Nepal)",
    nameHindi: "अठारह मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Mother Earth (Bhumi Devi)",
    rulingPlanet: "Rahu",
    benefits:
      "Atharah Mukhi Rudraksha represents Mother Earth and is blessed by Bhumi Devi. It provides immense stability, grounding, and connection to earthly abundance. Excellent for farmers, land owners, and those dealing in real estate. Removes Rahu dosha, relieves skin diseases, and cures digestive disorders. Provides extraordinary physical stamina, determination, and the ability to accumulate wealth steadily. Extremely rare bead that bestows earth's blessings upon the wearer.",
    priceRange: "₹18,000 – ₹100,000",
    imageUrl: "/assets/images/rudraksha/nepal-18-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "X-ray + float test + expert verification",
    recommendedFor:
      "Farmers, land owners, real estate, Rahu dosha, physical stamina, earth energy grounding",
  },
  {
    id: "nepal-19",
    mukhiCount: 19,
    name: "19 Mukhi Rudraksha (Nepal)",
    nameHindi: "उन्नीस मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Vishnu (Narayana)",
    rulingPlanet: "Mercury + Venus (combined)",
    benefits:
      "Unnees Mukhi Rudraksha is blessed by Lord Narayana (Vishnu) and combines the powers of Mercury and Venus. It provides prosperity, contentment, and divine grace. Excellent for those seeking both material success and spiritual peace simultaneously. Removes all obstacles, cures chronic diseases, and blesses with progeny. The wearer is respected and honored everywhere. One of the most precious and rare Rudraksha beads — considered a divine gift.",
    priceRange: "₹20,000 – ₹120,000",
    imageUrl: "/assets/images/rudraksha/nepal-19-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "X-ray + float test + expert verification",
    recommendedFor:
      "Combined prosperity + spiritual growth, chronic diseases, progeny, honor and respect",
  },
  {
    id: "nepal-20",
    mukhiCount: 20,
    name: "20 Mukhi Rudraksha (Nepal)",
    nameHindi: "बीस मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Brahma (Creator)",
    rulingPlanet: "All planets (supreme balance)",
    benefits:
      "Bees Mukhi Rudraksha is blessed by Lord Brahma — the creator of the universe — and is among the rarest of all Rudraksha beads. It activates the highest creative potential in the wearer. Excellent for artists, scientists, researchers, and spiritual seekers at advanced levels. Removes all planetary influences and creates a cosmic shield. Provides extraordinary creative intelligence, spiritual wisdom, and the ability to manifest reality. Considered equal to performing 1000 Ashwamedha Yagnas.",
    priceRange: "₹25,000 – ₹150,000",
    imageUrl: "/assets/images/rudraksha/nepal-20-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report + lab analysis",
    authenticityCheck: "X-ray + float test + expert verification",
    recommendedFor:
      "Creative intelligence, scientific research, advanced spirituality, manifestation, all planetary balance",
  },
  {
    id: "nepal-21",
    mukhiCount: 21,
    name: "21 Mukhi Rudraksha (Nepal)",
    nameHindi: "इक्कीस मुखी रुद्राक्ष (नेपाल)",
    origin: "Nepal",
    rulingDeity: "Lord Kubera (God of Wealth)",
    rulingPlanet: "All nine planets (complete)",
    benefits:
      "Ikkis Mukhi Rudraksha is the rarest and most powerful of all Rudraksha beads, blessed by Lord Kubera — the divine treasurer. It attracts unlimited wealth, removes all financial obstacles permanently, and bestows divine favor. Wearing this bead makes one equivalent to Lord Kubera himself. Provides supreme protection against all negative forces, removes all planetary doshas together, and grants all four goals of life (Dharma, Artha, Kama, Moksha). This bead is extremely rare and considered priceless.",
    priceRange: "₹50,000 – ₹500,000+",
    imageUrl: "/assets/images/rudraksha/nepal-21-mukhi.jpg",
    certificateInfo:
      "GIA-certified authenticity report + full lab analysis + provenance documentation",
    authenticityCheck:
      "X-ray + CT scan + expert panel verification + DNA testing",
    recommendedFor:
      "Supreme wealth attraction, all planetary doshas, divine protection, moksha, complete life balance",
  },
];

export const INDONESIA_RUDRAKSHA: RudrakshaEntry[] = [
  {
    id: "indo-1",
    mukhiCount: 1,
    name: "1 Mukhi Rudraksha (Indonesia)",
    nameHindi: "एक मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Lord Shiva",
    rulingPlanet: "Sun (Surya)",
    benefits:
      "Indonesian 1 Mukhi Rudraksha (often found in round/half moon shape) carries powerful Shiva energy and Sun blessings. More affordable than Nepal variety but equally spiritually effective. Enhances spiritual consciousness, removes ego, and provides divine protection. Excellent for meditation and focusing the mind. Removes Sun-related problems and bestows clarity, leadership, and inner strength.",
    priceRange: "₹1,500 – ₹15,000",
    imageUrl: "/assets/images/rudraksha/indo-1-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test + visual inspection",
    recommendedFor:
      "Meditation, Sun problems, spiritual consciousness, leadership",
  },
  {
    id: "indo-2",
    mukhiCount: 2,
    name: "2 Mukhi Rudraksha (Indonesia)",
    nameHindi: "दो मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Ardhanarishvara",
    rulingPlanet: "Moon (Chandra)",
    benefits:
      "Indonesian 2 Mukhi Rudraksha brings harmony in relationships and emotional stability. More commonly available than Nepal variety. Excellent for married couples, emotional healing, and Moon-related problems. Strengthens bonds between partners, calms the mind, and improves intuition.",
    priceRange: "₹150 – ₹800",
    imageUrl: "/assets/images/rudraksha/indo-2-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "Married couples, emotional stability, Moon problems, relationship harmony",
  },
  {
    id: "indo-3",
    mukhiCount: 3,
    name: "3 Mukhi Rudraksha (Indonesia)",
    nameHindi: "तीन मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Lord Agni",
    rulingPlanet: "Mars (Mangal)",
    benefits:
      "Indonesian 3 Mukhi Rudraksha burns karmic debts and increases physical vitality. Removes past-life sins, boosts confidence, and cures blood-related disorders. Very affordable and widely recommended for students and those with Mars-related problems. Energizes the body and improves metabolic functions.",
    priceRange: "₹80 – ₹400",
    imageUrl: "/assets/images/rudraksha/indo-3-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "Students, Mars dosha, confidence boost, past karma removal, blood disorders",
  },
  {
    id: "indo-4",
    mukhiCount: 4,
    name: "4 Mukhi Rudraksha (Indonesia)",
    nameHindi: "चार मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Lord Brahma",
    rulingPlanet: "Mercury (Budh)",
    benefits:
      "Indonesian 4 Mukhi Rudraksha enhances intellectual abilities and communication skills. Ruled by Brahma and Mercury, it improves memory, speech, and analytical thinking. Affordable choice for students and professionals. Removes Mercury dosha, improves academic performance, and enhances logical reasoning.",
    priceRange: "₹80 – ₹400",
    imageUrl: "/assets/images/rudraksha/indo-4-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "Students, Mercury weak, communication improvement, academic excellence",
  },
  {
    id: "indo-5",
    mukhiCount: 5,
    name: "5 Mukhi Rudraksha (Indonesia)",
    nameHindi: "पाँच मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Panchmukhi Shiva",
    rulingPlanet: "Jupiter (Guru)",
    benefits:
      "Indonesian 5 Mukhi Rudraksha is the most popular and widely available bead worldwide. Brings health, happiness, and peace to all. Removes Jupiter dosha and provides general wellbeing. Very affordable and recommended as a first Rudraksha for beginners. Safe for all ages, improves overall health, and promotes spiritual development.",
    priceRange: "₹50 – ₹200",
    imageUrl: "/assets/images/rudraksha/indo-5-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "Beginners, general wellbeing, all age groups, Jupiter weak, health improvement",
  },
  {
    id: "indo-6",
    mukhiCount: 6,
    name: "6 Mukhi Rudraksha (Indonesia)",
    nameHindi: "छः मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Lord Kartikeya",
    rulingPlanet: "Venus (Shukra)",
    benefits:
      "Indonesian 6 Mukhi Rudraksha provides courage, willpower, and removes Venus dosha. Excellent for those facing relationship problems and seeking marital harmony. More affordable than Nepal variety, widely used in combination malas. Improves artistic abilities and brings success in creative endeavors.",
    priceRange: "₹100 – ₹600",
    imageUrl: "/assets/images/rudraksha/indo-6-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "Relationship issues, Venus problems, courage, creative pursuits, marital harmony",
  },
  {
    id: "indo-7",
    mukhiCount: 7,
    name: "7 Mukhi Rudraksha (Indonesia)",
    nameHindi: "सात मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Goddess Mahalakshmi",
    rulingPlanet: "Saturn (Shani)",
    benefits:
      "Indonesian 7 Mukhi is ruled by Goddess Lakshmi and brings wealth and prosperity. Very effective for removing Shani dosha and Sade Sati effects. Attracts financial abundance, removes obstacles in business, and helps overcome debt. Affordable and widely recommended for wealth attraction. Suitable for use in combination with other beads.",
    priceRange: "₹150 – ₹800",
    imageUrl: "/assets/images/rudraksha/indo-7-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "Wealth attraction, Saturn problems, Sade Sati, business growth, debt relief",
  },
  {
    id: "indo-8",
    mukhiCount: 8,
    name: "8 Mukhi Rudraksha (Indonesia)",
    nameHindi: "आठ मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Lord Ganesha",
    rulingPlanet: "Rahu",
    benefits:
      "Indonesian 8 Mukhi Rudraksha removes all obstacles and Rahu doshas. Provides Ganesha's blessings for new beginnings and success. Excellent protection from black magic and negative energies. More affordable than Nepal variety. Recommended for those facing sudden obstacles in business or career.",
    priceRange: "₹200 – ₹1,000",
    imageUrl: "/assets/images/rudraksha/indo-8-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "Obstacle removal, Rahu dosha, new beginnings, business obstacles, negative energy protection",
  },
  {
    id: "indo-9",
    mukhiCount: 9,
    name: "9 Mukhi Rudraksha (Indonesia)",
    nameHindi: "नौ मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Goddess Durga",
    rulingPlanet: "Ketu",
    benefits:
      "Indonesian 9 Mukhi provides Durga's protection and removes Ketu dosha. Excellent for those suffering from fear, anxiety, and spiritual confusion. Provides courage, protection from enemies, and spiritual clarity. Affordable alternative to Nepal 9 Mukhi. Widely used in combination malas for complete planetary coverage.",
    priceRange: "₹250 – ₹1,200",
    imageUrl: "/assets/images/rudraksha/indo-9-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "Fear and anxiety, Ketu dosha, divine protection, enemy protection, spiritual clarity",
  },
  {
    id: "indo-10",
    mukhiCount: 10,
    name: "10 Mukhi Rudraksha (Indonesia)",
    nameHindi: "दस मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Lord Vishnu",
    rulingPlanet: "All planets",
    benefits:
      "Indonesian 10 Mukhi balances all planetary energies and is blessed by Vishnu. Removes fear, provides peace, and protects from evil. Excellent for those with multiple planetary doshas. More affordable than Nepal variety while providing comprehensive planetary protection. Recommended in combination malas.",
    priceRange: "₹300 – ₹1,500",
    imageUrl: "/assets/images/rudraksha/indo-10-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test",
    recommendedFor:
      "All planetary doshas, fear removal, comprehensive protection, multiple doshas",
  },
  {
    id: "indo-11",
    mukhiCount: 11,
    name: "11 Mukhi Rudraksha (Indonesia)",
    nameHindi: "ग्यारह मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Eleven Rudras",
    rulingPlanet: "All planets (balanced)",
    benefits:
      "Indonesian 11 Mukhi provides courage of Lord Hanuman and blessings of all eleven Rudras. Removes all planetary doshas and provides fearlessness. Excellent for physical strength, mental courage, and spiritual advancement. More affordable than Nepal variety for achieving similar benefits in spiritual practice.",
    priceRange: "₹800 – ₹4,000",
    imageUrl: "/assets/images/rudraksha/indo-11-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Fearlessness, spiritual advancement, physical strength, all planetary balance",
  },
  {
    id: "indo-12",
    mukhiCount: 12,
    name: "12 Mukhi Rudraksha (Indonesia)",
    nameHindi: "बारह मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Lord Surya",
    rulingPlanet: "Sun (Surya)",
    benefits:
      "Indonesian 12 Mukhi channels twelve Adityas and the Sun's power. Provides leadership qualities, removes Sun dosha, and improves health. Excellent for those seeking authority and recognition in their field. More affordable alternative to Nepal 12 Mukhi while offering comparable benefits.",
    priceRange: "₹600 – ₹3,500",
    imageUrl: "/assets/images/rudraksha/indo-12-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Leadership, Sun weak, authority, recognition, health improvement",
  },
  {
    id: "indo-13",
    mukhiCount: 13,
    name: "13 Mukhi Rudraksha (Indonesia)",
    nameHindi: "तेरह मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Lord Indra / Kamadeva",
    rulingPlanet: "Venus (Shukra)",
    benefits:
      "Indonesian 13 Mukhi provides Kamadeva's blessings for love and attraction. Fulfills desires, removes Venus dosha, and brings marital harmony. Excellent for those in creative and artistic fields. More accessible than Nepal variety for manifesting desires and improving romantic relationships.",
    priceRange: "₹1,500 – ₹8,000",
    imageUrl: "/assets/images/rudraksha/indo-13-mukhi.jpg",
    certificateInfo: "Basic authenticity certificate",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Love and marriage, Venus problems, desire fulfillment, creative fields, marital harmony",
  },
  {
    id: "indo-14",
    mukhiCount: 14,
    name: "14 Mukhi Rudraksha (Indonesia)",
    nameHindi: "चौदह मुखी रुद्राक्ष (इंडोनेशिया)",
    origin: "Indonesia",
    rulingDeity: "Lord Hanuman / Shiva",
    rulingPlanet: "Saturn (Shani)",
    benefits:
      "Indonesian 14 Mukhi is the Deva Mani bead that opens the third eye and removes Saturn dosha. Provides divine intuition, removes Sade Sati, and bestows spiritual wisdom. More affordable than Nepal variety. Excellent for those seeking to enhance intuition and remove Saturn's malefic influence from their lives.",
    priceRange: "₹2,000 – ₹12,000",
    imageUrl: "/assets/images/rudraksha/indo-14-mukhi.jpg",
    certificateInfo: "GIA-certified authenticity report",
    authenticityCheck: "Float test + expert verification",
    recommendedFor:
      "Third eye opening, Saturn problems, Sade Sati, divine intuition, spiritual wisdom",
  },
];

export const ALL_RUDRAKSHA_CATALOG = [
  ...NEPAL_RUDRAKSHA,
  ...INDONESIA_RUDRAKSHA,
];
