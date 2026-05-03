export type PaintingStyle =
  | "Madhubani"
  | "Warli"
  | "Pichwai"
  | "Tanjore"
  | "Mughal"
  | "Contemporary";

export interface Painting {
  id: string;
  name: string;
  nameHindi: string;
  style: PaintingStyle;
  deity: string;
  origin: string;
  description: string;
  significance: string;
  colors: string[];
  emoji: string;
}

export interface GreetingCard {
  id: string;
  festival: string;
  festivalHindi: string;
  language_support: string[];
  emoji: string;
  primaryColor: string;
  message_templates: string[];
}

export const PAINTINGS: Painting[] = [
  // ── Madhubani ─────────────────────────────────────────────────────────────
  {
    id: "md001",
    name: "Radha Krishna Madhubani",
    nameHindi: "राधा कृष्ण मधुबनी",
    style: "Madhubani",
    deity: "Radha Krishna",
    origin: "Mithila, Bihar",
    description:
      "Vivid Madhubani depiction of Radha and Krishna in their eternal dance (Raas Leela), surrounded by flowering trees and peacocks. Bold black outlines filled with natural earth colors create the distinctive Mithila style.",
    significance:
      "Madhubani paintings from Bihar's Mithila region are painted by women for auspicious occasions, particularly weddings. They traditionally depict divine love, nature, and mythological scenes from the Epics and Puranas.",
    colors: ["Turmeric yellow", "Indigo blue", "Sindoor red", "Black outline"],
    emoji: "🎨",
  },
  {
    id: "md002",
    name: "Durga Mahishasura Mardini Madhubani",
    nameHindi: "दुर्गा महिषासुरमर्दिनी मधुबनी",
    style: "Madhubani",
    deity: "Goddess Durga",
    origin: "Mithila, Bihar",
    description:
      "A powerful Madhubani portrayal of Goddess Durga seated on her lion mount, wielding ten weapons, defeating Mahishasura. Concentric border patterns and stylized animals fill the composition.",
    significance:
      "This painting is traditionally created for Navratri and Dussehra. The bold, fearless depiction of Durga embodies divine feminine power (Shakti) and the triumph of good over evil.",
    colors: ["Vermillion", "Peacock green", "Ochre yellow", "White", "Black"],
    emoji: "🦁",
  },
  {
    id: "md003",
    name: "Ganesha Madhubani",
    nameHindi: "गणेश मधुबनी",
    style: "Madhubani",
    deity: "Lord Ganesha",
    origin: "Mithila, Bihar",
    description:
      "Cheerful Madhubani Ganesha with his characteristic large ears, trunk, and modak, surrounded by mice and lotus flowers. Fish motifs — considered highly auspicious in Mithila — frame the composition.",
    significance:
      "Ganesha is traditionally the first deity invoked in Mithila art. Fish (matsya) are symbols of good luck in Madhubani tradition and are always present at edges of auspicious paintings.",
    colors: [
      "Saffron orange",
      "Mustard yellow",
      "Forest green",
      "Pink accents",
    ],
    emoji: "🐘",
  },

  // ── Warli ─────────────────────────────────────────────────────────────────
  {
    id: "w001",
    name: "Warli Village Life Mural",
    nameHindi: "वर्ली ग्राम जीवन भित्ति चित्र",
    style: "Warli",
    deity: "Palghat (Warli fertility goddess)",
    origin: "Dahanu, Maharashtra",
    description:
      "Minimalist white-on-ochre Warli tribal painting depicting the complete cycle of village life — harvest, dance, marriage ceremony, and daily rituals. Stick figures in triangular bodies perform the Tarpa dance around a central tree.",
    significance:
      "Warli art is one of India's oldest tribal art forms, dating to the 10th century CE. Traditionally painted on mud walls for weddings and harvests, the circular Tarpa dance symbolizes the continuity of life and community.",
    colors: ["White on ochre/brown", "Red earth background", "Black outlines"],
    emoji: "🌾",
  },
  {
    id: "w002",
    name: "Warli Wedding Ceremony",
    nameHindi: "वर्ली विवाह समारोह",
    style: "Warli",
    deity: "Palghat",
    origin: "Dahanu, Maharashtra",
    description:
      "Traditional Warli wedding (Lagna Chitre) painting featuring Palghat Devi in the center flanked by the wedding couple, musicians playing dhol and tarpa, and dancing village community.",
    significance:
      "Warli wedding paintings are considered essential for Warli tribal ceremonies. The central Palghat figure blesses the union. These paintings are traditionally created by married women (suvasinis) on interior walls.",
    colors: ["White on mud wall", "Natural ochre base", "Earth tones"],
    emoji: "💒",
  },

  // ── Pichwai ───────────────────────────────────────────────────────────────
  {
    id: "p001",
    name: "Pichwai Govardhan Leela",
    nameHindi: "पिछवाई गोवर्धन लीला",
    style: "Pichwai",
    deity: "Shri Nathji (Krishna)",
    origin: "Nathdwara, Rajasthan",
    description:
      "Exquisite Pichwai depicting Lord Shrinathji holding Mount Govardhan aloft to shelter cows and devotees from Indra's rains. Thousands of cows, devotees, and stylized trees create a dense, jewel-like composition.",
    significance:
      "Pichwai (meaning 'behind the image') are large devotional cloth paintings hung behind the image of Shrinathji at the Nathdwara temple. Each Pichwai corresponds to a specific season, festival, or leela (divine play) of Krishna.",
    colors: [
      "Ultramarine blue",
      "Gold leaf",
      "Ivory white",
      "Forest green",
      "Crimson",
    ],
    emoji: "🏔️",
  },
  {
    id: "p002",
    name: "Pichwai Lotus Pool (Kamal Talai)",
    nameHindi: "पिछवाई कमल तलाई",
    style: "Pichwai",
    deity: "Shri Nathji",
    origin: "Nathdwara, Rajasthan",
    description:
      "A lustrous Pichwai of Shrinathji standing in a pool of lotus flowers under a rain of golden blossoms. Cows graze in the background while devotees adorn Krishna with flower garlands.",
    significance:
      "The Kamal Talai (Lotus Pool) Pichwai is displayed during the Phalgun (spring/Holi) season. Lotus represents purity and divine beauty in Vaishnava tradition; this painting celebrates Krishna's joyful nature.",
    colors: ["Pink lotuses", "Night blue water", "Gold", "Saffron"],
    emoji: "🪷",
  },
  {
    id: "p003",
    name: "Pichwai Raas Mandal",
    nameHindi: "पिछवाई रास मंडल",
    style: "Pichwai",
    deity: "Shri Nathji / Radha Krishna",
    origin: "Nathdwara, Rajasthan",
    description:
      "Grand Pichwai depicting the Maha Raas Leela in a circular mandala of gopis and Krishna, with divine musical instruments floating in the night sky filled with stars and moonlight.",
    significance:
      "The Raas Mandal Pichwai is displayed during Sharad Purnima (autumn full moon) when the Maha Raas Leela is celebrated. It represents the highest form of divine love — the soul's union with God.",
    colors: [
      "Midnight blue sky",
      "Gold ornaments",
      "Crimson gopi garments",
      "Moonwhite",
    ],
    emoji: "🌕",
  },

  // ── Tanjore ───────────────────────────────────────────────────────────────
  {
    id: "t001",
    name: "Tanjore Balakrishna",
    nameHindi: "तंजौर बालकृष्ण",
    style: "Tanjore",
    deity: "Baby Krishna (Balakrishna)",
    origin: "Thanjavur, Tamil Nadu",
    description:
      "Classic Tanjore painting of baby Krishna crawling with butter in hand, gold embossed background, semi-precious stone inlays, and jewel-decorated arched frame typical of the Thanjavur court tradition.",
    significance:
      "Tanjore paintings are a classical South Indian art form originating in 1600 CE. Patronized by Marathas of Thanjavur, they are notable for their richness, surface richness, and use of real gold leaf and gemstones.",
    colors: [
      "24-karat gold leaf",
      "Brilliant red",
      "Royal blue",
      "Ivory white",
      "Emerald green",
    ],
    emoji: "👶",
  },
  {
    id: "t002",
    name: "Tanjore Mahalakshmi",
    nameHindi: "तंजौर महालक्ष्मी",
    style: "Tanjore",
    deity: "Goddess Mahalakshmi",
    origin: "Thanjavur, Tamil Nadu",
    description:
      "Resplendent Tanjore Mahalakshmi seated on a pink lotus, four hands holding lotus, pot of gold, and bestowing blessings. Heavy gold embossing, jeweled crown, and pearl borders frame the regal composition.",
    significance:
      "Lakshmi Tanjore paintings are considered extremely auspicious for homes and businesses. They are traditionally gifted at weddings and Diwali. The gold-heavy style symbolizes divine abundance and prosperity.",
    colors: [
      "Heavy 22K gold embossing",
      "Pink lotus",
      "Red garments",
      "Green gems",
      "Ivory",
    ],
    emoji: "💰",
  },
  {
    id: "t003",
    name: "Tanjore Nataraja",
    nameHindi: "तंजौर नटराज",
    style: "Tanjore",
    deity: "Lord Shiva (Nataraja)",
    origin: "Thanjavur, Tamil Nadu",
    description:
      "Majestic Tanjore Nataraja depicting Lord Shiva in his cosmic dance within a ring of fire (Prabhamandala), trampling the demon Apasmara, with hair flying and drum in hand.",
    significance:
      "The Nataraja form of Shiva represents the cosmic cycle of creation and destruction. Tanjore Nataraja paintings are particularly prized in Tamil Nadu and are considered among the most sacred images in South Indian Shaivism.",
    colors: [
      "Fire gold",
      "Deep blue",
      "Crimson",
      "Silver embossing",
      "Pearl white",
    ],
    emoji: "💫",
  },

  // ── Mughal ────────────────────────────────────────────────────────────────
  {
    id: "mu001",
    name: "Mughal Portrait — Emperor Akbar",
    nameHindi: "मुगल चित्र — सम्राट अकबर",
    style: "Mughal",
    deity: "Historical — Emperor Akbar",
    origin: "Agra / Delhi, Mughal Empire",
    description:
      "Detailed Mughal miniature portrait of Emperor Akbar in court regalia, rendered with meticulous brushwork showing the characteristic fine stippling, jewel-like colors, and courtly landscape background of Akbari atelier.",
    significance:
      "Mughal miniature painting reached its zenith under Emperor Akbar (1556–1605) who established the imperial atelier (karkhana) and merged Persian, Indian, and European painting traditions into a unique Mughal style.",
    colors: [
      "Lapis lazuli blue",
      "Malachite green",
      "Vermillion",
      "Gold",
      "Ivory",
    ],
    emoji: "👑",
  },
  {
    id: "mu002",
    name: "Mughal Ramayana Scene",
    nameHindi: "मुगल रामायण चित्र",
    style: "Mughal",
    deity: "Rama, Sita, Lakshmana",
    origin: "Mughal Empire, 16th–17th Century",
    description:
      "A Mughal-style miniature depicting a scene from the Ramayana, rendered in the Akbari tradition with characteristic Mughal landscape, architectural arches, and the Persian-influenced figural style of the imperial atelier.",
    significance:
      "The Mughal atelier under Akbar produced illuminated manuscripts of Hindu epics including the Razmnama (Mahabharata) and Ramayana, creating a unique synthesis of Hindu subject matter with Persian pictorial tradition.",
    colors: [
      "Persian blue",
      "Gold leaf",
      "Sage green",
      "Burnt sienna",
      "White highlights",
    ],
    emoji: "🏹",
  },

  // ── Contemporary ──────────────────────────────────────────────────────────
  {
    id: "c001",
    name: "Contemporary Ganesha Abstract",
    nameHindi: "समकालीन गणेश अमूर्त चित्र",
    style: "Contemporary",
    deity: "Lord Ganesha",
    origin: "Contemporary India",
    description:
      "Modern abstract interpretation of Ganesha using bold geometric shapes, expressive brushwork, and vibrant Fauvist colors. The iconic silhouette of Ganesha emerges from layered textures and fluid paint.",
    significance:
      "Contemporary religious art bridges ancient devotional imagery with modern artistic sensibility, making sacred subjects accessible to younger generations while preserving their spiritual essence.",
    colors: [
      "Vibrant orange",
      "Electric blue",
      "Hot pink",
      "Gold accents",
      "White space",
    ],
    emoji: "🎭",
  },
  {
    id: "c002",
    name: "Digital Watercolor Goddess Durga",
    nameHindi: "समकालीन देवी दुर्गा चित्र",
    style: "Contemporary",
    deity: "Goddess Durga",
    origin: "Contemporary India",
    description:
      "A contemporary mixed-media portrayal of Goddess Durga combining traditional iconography with modern watercolor techniques, gradient washes, and fine ink detailing. Soft and powerful simultaneously.",
    significance:
      "Contemporary paintings of the Goddess bring feminine divine power into modern consciousness. This style appeals to urban devotees who connect with traditional deities through a modern artistic language.",
    colors: [
      "Watercolor washes",
      "Indigo gradients",
      "Rose gold",
      "Deep violet",
      "Silver ink",
    ],
    emoji: "💜",
  },
];

export const GREETING_CARDS: GreetingCard[] = [
  {
    id: "gc001",
    festival: "Diwali",
    festivalHindi: "दीपावली",
    emoji: "🪔",
    primaryColor: "oklch(0.75 0.18 62)",
    language_support: ["Hindi", "English", "Gujarati", "Tamil"],
    message_templates: [
      "Wishing you and your family a very Happy Diwali! May this festival of lights bring joy, prosperity, and good health to your home. 🪔✨",
      "दीपावली की हार्दिक शुभकामनाएं! माँ लक्ष्मी आपके जीवन को सुख-समृद्धि और खुशियों से भर दें। 🪔🌸",
      "May the glow of diyas light up your life and bring happiness to your heart. Happy Diwali to you and your loved ones! 💛✨",
    ],
  },
  {
    id: "gc002",
    festival: "Holi",
    festivalHindi: "होली",
    emoji: "🎨",
    primaryColor: "oklch(0.65 0.22 10)",
    language_support: ["Hindi", "English", "Marathi"],
    message_templates: [
      "Wishing you a colorful and joyous Holi! May every color of this festival bring happiness and good fortune to your life! 🌈🎨",
      "होली की हार्दिक शुभकामनाएं! रंगों से भरी इस होली में आपकी जिंदगी भी खुशियों के रंग से रंग जाए! 🌸🎉",
      "This Holi, may you be splashed with the colors of joy, love, success, and health. Happy Holi! 🎉🌺",
    ],
  },
  {
    id: "gc003",
    festival: "Navratri",
    festivalHindi: "नवरात्रि",
    emoji: "🏺",
    primaryColor: "oklch(0.70 0.20 30)",
    language_support: ["Hindi", "English", "Gujarati"],
    message_templates: [
      "Wishing you all the blessings of Maa Durga on this holy Navratri! May the Goddess fill your life with strength and success! 🙏🔱",
      "नवरात्रि की हार्दिक शुभकामनाएं! माँ दुर्गा आपको और आपके परिवार को स्वास्थ्य, सुख और समृद्धि प्रदान करें! 🌸🙏",
      "Nine nights, nine blessings — may Navratri bring you nine reasons to smile, celebrate, and be grateful! Happy Navratri! 🎊",
    ],
  },
  {
    id: "gc004",
    festival: "Dussehra",
    festivalHindi: "दशहरा",
    emoji: "🏹",
    primaryColor: "oklch(0.65 0.18 40)",
    language_support: ["Hindi", "English"],
    message_templates: [
      "Happy Dussehra! May the triumph of Lord Rama inspire you to conquer your inner demons and emerge victorious in all walks of life! 🏹🙏",
      "दशहरे की हार्दिक शुभकामनाएं! असत्य पर सत्य की विजय का यह पर्व आपके जीवन में भी नई ऊर्जा और उत्साह लाए! 🎊🌟",
      "On this Vijaya Dashami, may evil in every form be defeated and may righteousness prevail in your life! Jai Shri Ram! 🙏",
    ],
  },
  {
    id: "gc005",
    festival: "Ganesh Chaturthi",
    festivalHindi: "गणेश चतुर्थी",
    emoji: "🐘",
    primaryColor: "oklch(0.72 0.16 85)",
    language_support: ["Hindi", "English", "Marathi"],
    message_templates: [
      "Ganpati Bappa Morya! May Lord Ganesha remove all obstacles from your path and shower his blessings upon you! Happy Ganesh Chaturthi! 🙏🐘",
      "गणेश चतुर्थी की हार्दिक शुभकामनाएं! गणपति बप्पा आपके सभी कष्टों को दूर करें और आपके जीवन को सुख-समृद्धि से भर दें! 🌸",
      "May Ganapati's blessings be with you always. May this Ganesh Chaturthi bring peace, prosperity, and joy to your family! 🎉🐘",
    ],
  },
  {
    id: "gc006",
    festival: "Eid (Inclusive)",
    festivalHindi: "ईद मुबारक",
    emoji: "🌙",
    primaryColor: "oklch(0.60 0.12 220)",
    language_support: ["Urdu", "English", "Hindi"],
    message_templates: [
      "Eid Mubarak! Wishing you and your family joy, peace, and prosperity on this blessed occasion of Eid! May Allah's blessings be with you always. 🌙⭐",
      "ईद मुबारक! इस पवित्र त्योहार पर आपको और आपके परिवार को ढेर सारी खुशियां और सुख-शांति मिले! 🌸🌙",
      "May the magic of Eid bring lots of happiness in your life and may you celebrate it with all your close friends and may it fill your heart with joy! 🌙✨",
    ],
  },
  {
    id: "gc007",
    festival: "Christmas",
    festivalHindi: "क्रिसमस",
    emoji: "🎄",
    primaryColor: "oklch(0.55 0.18 145)",
    language_support: ["English", "Hindi"],
    message_templates: [
      "Wishing you a Merry Christmas filled with joy, peace, and the warmth of family! May this festive season bring you all that your heart desires! 🎄🌟",
      "क्रिसमस की हार्दिक शुभकामनाएं! यह पर्व आपके जीवन में खुशियां, प्रेम और शांति लेकर आए! 🎅🌟",
      "May Santa bring you endless happiness, may your home be full of love, and may the New Year bring you wonderful surprises! Merry Christmas! 🎁🎄",
    ],
  },
  {
    id: "gc008",
    festival: "New Year",
    festivalHindi: "नव वर्ष",
    emoji: "🎆",
    primaryColor: "oklch(0.62 0.15 280)",
    language_support: ["English", "Hindi", "All languages"],
    message_templates: [
      "Happy New Year! May the coming year bring you health, happiness, prosperity, and success in everything you do! Wishing you an amazing 2026! 🎆✨",
      "नव वर्ष की हार्दिक शुभकामनाएं! नया साल आपके जीवन में नई खुशियां, नई उपलब्धियां और नई उमंग लेकर आए! 🌟🎉",
      "As we step into a new year, may you leave behind all your worries and embrace joy, love, and new beginnings! Happy New Year! 🥂🌟",
    ],
  },
  {
    id: "gc009",
    festival: "Baisakhi",
    festivalHindi: "बैसाखी",
    emoji: "🌾",
    primaryColor: "oklch(0.75 0.20 100)",
    language_support: ["Punjabi", "Hindi", "English"],
    message_templates: [
      "Happy Baisakhi! May this harvest festival bring golden days of abundance, joy, and new beginnings for you and your family! 🌾🎊",
      "बैसाखी की हार्दिक शुभकामनाएं! यह फसल पर्व आपके जीवन में खुशहाली और समृद्धि लाए! वाहेगुरु जी का खालसा, वाहेगुरु जी की फतह! 🙏🌾",
      "Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh! May Baisakhi bring you the blessings of the Gurus and the joy of the harvest! 🌾🪯",
    ],
  },
  {
    id: "gc010",
    festival: "Pongal",
    festivalHindi: "पोंगल",
    emoji: "🌽",
    primaryColor: "oklch(0.78 0.18 55)",
    language_support: ["Tamil", "English", "Hindi"],
    message_templates: [
      "Happy Pongal! May this harvest festival bring you abundant joy, prosperity, and the sweetness of freshly made Pongal to your home! 🌾☀️",
      "பொங்கல் வாழ்த்துக்கள்! இந்த நல்ல நேரத்தில் உங்கள் வாழ்க்கையில் மகிழ்ச்சியும் செழிப்பும் நிறையட்டும்! 🌺☀️",
      "On this auspicious occasion of Thai Pongal, may the Sun God shower you and your family with warmth, health, and abundance! Happy Pongal! 🌞",
    ],
  },
];

export const PAINTING_STYLES: PaintingStyle[] = [
  "Madhubani",
  "Warli",
  "Pichwai",
  "Tanjore",
  "Mughal",
  "Contemporary",
];
