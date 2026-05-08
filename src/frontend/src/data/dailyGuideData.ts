// ─── Daily Guide Data ─────────────────────────────────────────────────────────
// Static seed data for the 6 Daily Guide inline tools

export interface ZodiacInfo {
  sign: string;
  signHi: string;
  symbol: string;
  emoji: string;
  dates: string;
  element: string;
  lucky: string;
  prediction: string;
  predictionHi: string;
}

export const ZODIAC_DATA: ZodiacInfo[] = [
  {
    sign: "Aries",
    signHi: "मेष",
    symbol: "♈",
    emoji: "🐏",
    dates: "Mar 21–Apr 19",
    element: "Fire",
    lucky: "Tuesday",
    prediction:
      "Today brings fresh energy and bold initiatives. Trust your instincts and take the lead in new projects. A financial opportunity may appear — act swiftly but with due diligence.",
    predictionHi:
      "आज ताज़ी ऊर्जा और साहसी पहल का दिन है। अपनी अंतर्प्रेरणा पर विश्वास करें और नए प्रोजेक्ट में आगे बढ़ें। एक वित्तीय अवसर सामने आ सकता है — सावधानी से, लेकिन तुरंत कार्य करें।",
  },
  {
    sign: "Taurus",
    signHi: "वृषभ",
    symbol: "♉",
    emoji: "🐂",
    dates: "Apr 20–May 20",
    element: "Earth",
    lucky: "Friday",
    prediction:
      "Stability and comfort are your themes today. Focus on practical matters and avoid impulsive spending. A loved one needs your support — be the anchor they rely on.",
    predictionHi:
      "आज स्थिरता और आराम आपकी थीम है। व्यावहारिक मामलों पर ध्यान दें और आवेगशील खर्च से बचें। एक प्रियजन को आपकी सहायता चाहिए — उनका सहारा बनें।",
  },
  {
    sign: "Gemini",
    signHi: "मिथुन",
    symbol: "♊",
    emoji: "👯",
    dates: "May 21–Jun 20",
    element: "Air",
    lucky: "Wednesday",
    prediction:
      "Communication flows easily today. Share your ideas — they will be well received. A short journey or a meaningful conversation could shift your perspective in a wonderful way.",
    predictionHi:
      "आज संवाद सुगमता से होता है। अपने विचार साझा करें — वे अच्छे से स्वीकार किए जाएंगे। एक छोटी यात्रा या अर्थपूर्ण बातचीत आपके दृष्टिकोण को अद्भुत ढंग से बदल सकती है।",
  },
  {
    sign: "Cancer",
    signHi: "कर्क",
    symbol: "♋",
    emoji: "🦀",
    dates: "Jun 21–Jul 22",
    element: "Water",
    lucky: "Monday",
    prediction:
      "Emotional sensitivity is heightened — trust your feelings and let your intuition guide important decisions. Home and family matters come to the forefront. Nurture yourself first.",
    predictionHi:
      "भावनात्मक संवेदनशीलता बढ़ी हुई है — अपनी भावनाओं पर भरोसा करें और महत्वपूर्ण निर्णयों में अपनी अंतर्दृष्टि को मार्गदर्शक बनने दें। घर और परिवार के मामले सामने आते हैं। पहले स्वयं की देखभाल करें।",
  },
  {
    sign: "Leo",
    signHi: "सिंह",
    symbol: "♌",
    emoji: "🦁",
    dates: "Jul 23–Aug 22",
    element: "Fire",
    lucky: "Sunday",
    prediction:
      "Your natural charisma shines brightly today. Leadership opportunities arise — step into the spotlight with confidence. Creative projects gain momentum. Recognition is coming your way.",
    predictionHi:
      "आज आपका स्वाभाविक आकर्षण चमकता है। नेतृत्व के अवसर सामने आते हैं — आत्मविश्वास के साथ केंद्र में आएं। रचनात्मक प्रोजेक्ट गति पाते हैं। पहचान आपकी ओर आ रही है।",
  },
  {
    sign: "Virgo",
    signHi: "कन्या",
    symbol: "♍",
    emoji: "🌾",
    dates: "Aug 23–Sep 22",
    element: "Earth",
    lucky: "Wednesday",
    prediction:
      "Attention to detail pays off today. Review plans carefully before committing. Health matters deserve attention — small adjustments to routine can yield big improvements. Help a colleague.",
    predictionHi:
      "आज विवरण पर ध्यान देना फायदेमंद होगा। प्रतिबद्ध होने से पहले योजनाओं की सावधानी से समीक्षा करें। स्वास्थ्य मामलों पर ध्यान दें — दिनचर्या में छोटे बदलाव बड़े सुधार ला सकते हैं।",
  },
  {
    sign: "Libra",
    signHi: "तुला",
    symbol: "♎",
    emoji: "⚖️",
    dates: "Sep 23–Oct 22",
    element: "Air",
    lucky: "Friday",
    prediction:
      "Balance and harmony are your guiding principles today. Negotiations go well — seek fair outcomes for all. A romantic development adds sweetness to your day. Beauty and art inspire you.",
    predictionHi:
      "संतुलन और सामंजस्य आज आपके मार्गदर्शक सिद्धांत हैं। बातचीत अच्छे से होती है — सभी के लिए उचित परिणाम खोजें। एक रोमांटिक घटनाक्रम आपके दिन में मिठास जोड़ता है।",
  },
  {
    sign: "Scorpio",
    signHi: "वृश्चिक",
    symbol: "♏",
    emoji: "🦂",
    dates: "Oct 23–Nov 21",
    element: "Water",
    lucky: "Tuesday",
    prediction:
      "Deep transformation is underway. Trust the process even if surface appearances are confusing. Research and investigation yield valuable results. A power dynamic shifts in your favor today.",
    predictionHi:
      "गहरा परिवर्तन जारी है। प्रक्रिया पर भरोसा करें, भले ही सतही दिखावट भ्रामक हो। शोध और जांच मूल्यवान परिणाम देती है। आज एक शक्ति गतिशीलता आपके पक्ष में बदल जाती है।",
  },
  {
    sign: "Sagittarius",
    signHi: "धनु",
    symbol: "♐",
    emoji: "🏹",
    dates: "Nov 22–Dec 21",
    element: "Fire",
    lucky: "Thursday",
    prediction:
      "Expansion and adventure call to you. Philosophical discussions spark new ideas. Travel plans come together smoothly. Your optimism is contagious — inspire others with your vision today.",
    predictionHi:
      "विस्तार और साहस आपको बुला रहे हैं। दार्शनिक चर्चाएं नए विचारों को जगाती हैं। यात्रा की योजनाएं सुचारू रूप से बनती हैं। आपका आशावाद संक्रामक है — आज अपने दृष्टिकोण से दूसरों को प्रेरित करें।",
  },
  {
    sign: "Capricorn",
    signHi: "मकर",
    symbol: "♑",
    emoji: "🐐",
    dates: "Dec 22–Jan 19",
    element: "Earth",
    lucky: "Saturday",
    prediction:
      "Hard work pays tangible dividends today. Long-term goals make visible progress. Professional reputation strengthens. An elder or mentor offers invaluable advice — listen carefully and take notes.",
    predictionHi:
      "आज कड़ी मेहनत के ठोस परिणाम मिलते हैं। दीर्घकालिक लक्ष्यों में दृश्य प्रगति होती है। पेशेवर प्रतिष्ठा मजबूत होती है। एक बड़ा या गुरु अमूल्य सलाह देते हैं — ध्यान से सुनें।",
  },
  {
    sign: "Aquarius",
    signHi: "कुंभ",
    symbol: "♒",
    emoji: "🏺",
    dates: "Jan 20–Feb 18",
    element: "Air",
    lucky: "Saturday",
    prediction:
      "Innovation and originality set you apart today. Group activities and community work bring fulfillment. Unexpected connections open new pathways. Your unconventional solutions impress everyone.",
    predictionHi:
      "आज नवाचार और मौलिकता आपको अलग बनाती है। सामूहिक गतिविधियां और सामुदायिक कार्य तृप्ति लाते हैं। अप्रत्याशित संबंध नए रास्ते खोलते हैं।",
  },
  {
    sign: "Pisces",
    signHi: "मीन",
    symbol: "♓",
    emoji: "🐟",
    dates: "Feb 19–Mar 20",
    element: "Water",
    lucky: "Thursday",
    prediction:
      "Imagination and spiritual sensitivity peak today. Creative and artistic endeavors are highly favored. Set clear boundaries in relationships. Meditation or quiet reflection reveals deep wisdom.",
    predictionHi:
      "आज कल्पना और आध्यात्मिक संवेदनशीलता चरम पर है। रचनात्मक और कलात्मक प्रयास अत्यधिक अनुकूल हैं। रिश्तों में स्पष्ट सीमाएं निर्धारित करें। ध्यान या शांत चिंतन गहरी बुद्धि प्रकट करता है।",
  },
];

export interface PalmMount {
  id: string;
  name: string;
  nameHi: string;
  planet: string;
  planetHi: string;
  location: string;
  locationHi: string;
  meaning: string;
  meaningHi: string;
  wellDeveloped: string;
  wellDevelopedHi: string;
  underdeveloped: string;
  underdevelopedHi: string;
  color: string;
}

export const PALM_MOUNTS: PalmMount[] = [
  {
    id: "jupiter",
    name: "Mount of Jupiter",
    nameHi: "बृहस्पति पर्वत",
    planet: "Jupiter",
    planetHi: "बृहस्पति",
    location: "Base of index finger",
    locationHi: "तर्जनी की जड़ में",
    meaning: "Ambition, leadership, and spiritual development",
    meaningHi: "महत्वाकांक्षा, नेतृत्व और आध्यात्मिक विकास",
    wellDeveloped: "Strong leadership, ambition, and spiritual inclination",
    wellDevelopedHi: "मजबूत नेतृत्व, महत्वाकांक्षा और आध्यात्मिक झुकाव",
    underdeveloped: "Lack of confidence and ambition",
    underdevelopedHi: "आत्मविश्वास और महत्वाकांक्षा की कमी",
    color: "oklch(0.68 0.16 55)",
  },
  {
    id: "saturn",
    name: "Mount of Saturn",
    nameHi: "शनि पर्वत",
    planet: "Saturn",
    planetHi: "शनि",
    location: "Base of middle finger",
    locationHi: "मध्यमा की जड़ में",
    meaning: "Wisdom, seriousness, and life lessons",
    meaningHi: "ज्ञान, गंभीरता और जीवन के पाठ",
    wellDeveloped: "Wisdom, prudence, and analytical mind",
    wellDevelopedHi: "ज्ञान, विवेक और विश्लेषणात्मक मन",
    underdeveloped: "Lack of responsibility and direction",
    underdevelopedHi: "जिम्मेदारी और दिशा की कमी",
    color: "oklch(0.42 0.08 50)",
  },
  {
    id: "sun",
    name: "Mount of Sun",
    nameHi: "सूर्य पर्वत",
    planet: "Sun",
    planetHi: "सूर्य",
    location: "Base of ring finger",
    locationHi: "अनामिका की जड़ में",
    meaning: "Fame, creativity, and artistic talents",
    meaningHi: "प्रसिद्धि, रचनात्मकता और कलात्मक प्रतिभाएं",
    wellDeveloped: "Artistic talent, success, and positive outlook",
    wellDevelopedHi: "कलात्मक प्रतिभा, सफलता और सकारात्मक दृष्टिकोण",
    underdeveloped: "Lack of creativity and recognition",
    underdevelopedHi: "रचनात्मकता और पहचान की कमी",
    color: "oklch(0.80 0.18 65)",
  },
  {
    id: "mercury",
    name: "Mount of Mercury",
    nameHi: "बुध पर्वत",
    planet: "Mercury",
    planetHi: "बुध",
    location: "Base of little finger",
    locationHi: "कनिष्ठा की जड़ में",
    meaning: "Communication, business acumen, and intelligence",
    meaningHi: "संचार, व्यावसायिक कुशलता और बुद्धिमत्ता",
    wellDeveloped: "Excellent communicator, business skills",
    wellDevelopedHi: "उत्कृष्ट संचारक, व्यावसायिक कौशल",
    underdeveloped: "Communication blocks and missed opportunities",
    underdevelopedHi: "संचार बाधाएं और खोए हुए अवसर",
    color: "oklch(0.65 0.14 85)",
  },
  {
    id: "venus",
    name: "Mount of Venus",
    nameHi: "शुक्र पर्वत",
    planet: "Venus",
    planetHi: "शुक्र",
    location: "Base of thumb (fleshy pad)",
    locationHi: "अंगूठे की जड़ (मांसल भाग)",
    meaning: "Love, passion, sensuality, and life energy",
    meaningHi: "प्रेम, जुनून, संवेदनशीलता और जीवन ऊर्जा",
    wellDeveloped: "Warm, loving, passionate, and energetic",
    wellDevelopedHi: "गर्म, प्यार करने वाला, जुनूनी और ऊर्जावान",
    underdeveloped: "Cold, unaffectionate, low vitality",
    underdevelopedHi: "ठंडा, स्नेहरहित, कम जीवन शक्ति",
    color: "oklch(0.78 0.12 70)",
  },
  {
    id: "moon",
    name: "Mount of Moon",
    nameHi: "चंद्र पर्वत",
    planet: "Moon",
    planetHi: "चंद्र",
    location: "Bottom outer edge of palm",
    locationHi: "हथेली का निचला बाहरी किनारा",
    meaning: "Intuition, imagination, and subconscious mind",
    meaningHi: "अंतर्ज्ञान, कल्पना और अवचेतन मन",
    wellDeveloped: "Strong intuition, creativity, and emotional depth",
    wellDevelopedHi: "मजबूत अंतर्ज्ञान, रचनात्मकता और भावनात्मक गहराई",
    underdeveloped: "Lack of imagination and intuitive ability",
    underdevelopedHi: "कल्पना और अंतर्ज्ञान क्षमता की कमी",
    color: "oklch(0.92 0.04 85)",
  },
  {
    id: "mars_upper",
    name: "Upper Mount of Mars",
    nameHi: "उच्च मंगल पर्वत",
    planet: "Mars",
    planetHi: "मंगल",
    location: "Between head and heart lines (outer)",
    locationHi: "मस्तक और हृदय रेखा के बीच (बाहरी)",
    meaning: "Moral courage, endurance, and resistance",
    meaningHi: "नैतिक साहस, धैर्य और प्रतिरोध",
    wellDeveloped: "Persistent, resilient, emotionally courageous",
    wellDevelopedHi: "दृढ़, लचीला, भावनात्मक रूप से साहसी",
    underdeveloped: "Timidity, lack of resistance",
    underdevelopedHi: "डरपोकपन, प्रतिरोध की कमी",
    color: "oklch(0.55 0.20 28)",
  },
  {
    id: "mars_lower",
    name: "Lower Mount of Mars",
    nameHi: "निम्न मंगल पर्वत",
    planet: "Mars",
    planetHi: "मंगल",
    location: "Between thumb and index finger (inner)",
    locationHi: "अंगूठे और तर्जनी के बीच (भीतरी)",
    meaning: "Physical courage, aggression, and action",
    meaningHi: "शारीरिक साहस, आक्रामकता और कार्य",
    wellDeveloped: "Courageous, assertive, physically active",
    wellDevelopedHi: "साहसी, दृढ़, शारीरिक रूप से सक्रिय",
    underdeveloped: "Cowardice and lack of initiative",
    underdevelopedHi: "कायरता और पहल की कमी",
    color: "oklch(0.55 0.20 28)",
  },
];

export interface VastuRoomData {
  direction: string;
  directionHi: string;
  roomType: string;
  roomTypeHi: string;
  score: number;
  colors: string[];
  deity: string;
  deityHi: string;
  element: string;
  elementHi: string;
  tips: string[];
  tipsHi: string[];
}

export const VASTU_GRID: VastuRoomData[] = [
  {
    direction: "North",
    directionHi: "उत्तर",
    roomType: "Living Room",
    roomTypeHi: "बैठक कक्ष",
    score: 90,
    colors: ["#4169E1", "#00CED1", "#87CEEB"],
    deity: "Kuber (God of Wealth)",
    deityHi: "कुबेर (धन के देवता)",
    element: "Water",
    elementHi: "जल",
    tips: [
      "Keep this area clutter-free for wealth flow",
      "Place a water feature or aquarium",
      "Use blue and green tones in decor",
    ],
    tipsHi: [
      "धन प्रवाह के लिए इस क्षेत्र को अव्यवस्थित रखें",
      "जल स्रोत या मछलीघर रखें",
      "सजावट में नीले और हरे रंग का उपयोग करें",
    ],
  },
  {
    direction: "North",
    directionHi: "उत्तर",
    roomType: "Bedroom",
    roomTypeHi: "शयन कक्ष",
    score: 65,
    colors: ["#98FB98", "#E0E0E0"],
    deity: "Kuber",
    deityHi: "कुबेर",
    element: "Water",
    elementHi: "जल",
    tips: [
      "Avoid bedroom in far north — it reduces sleep quality",
      "If unavoidable, use light greens and whites",
      "Head pointing south or east for good sleep",
    ],
    tipsHi: [
      "उत्तर में शयन कक्ष से बचें — यह नींद की गुणवत्ता कम करता है",
      "यदि अपरिहार्य हो तो हल्के हरे और सफेद रंग का उपयोग करें",
      "अच्छी नींद के लिए सिर दक्षिण या पूर्व की ओर रखें",
    ],
  },
  {
    direction: "East",
    directionHi: "पूर्व",
    roomType: "Living Room",
    roomTypeHi: "बैठक कक्ष",
    score: 95,
    colors: ["#FFD700", "#FFA500", "#FFFACD"],
    deity: "Indra (King of Gods)",
    deityHi: "इंद्र (देवराज)",
    element: "Air",
    elementHi: "वायु",
    tips: [
      "East living room is most auspicious",
      "Keep large windows to welcome morning sunlight",
      "Place family photos or sacred art on east wall",
    ],
    tipsHi: [
      "पूर्व में बैठक कक्ष सबसे शुभ है",
      "प्रातःकालीन सूर्यप्रकाश के लिए बड़ी खिड़कियां रखें",
      "पूर्वी दीवार पर परिवार की तस्वीरें या पवित्र कला रखें",
    ],
  },
  {
    direction: "East",
    directionHi: "पूर्व",
    roomType: "Puja Room",
    roomTypeHi: "पूजा कक्ष",
    score: 100,
    colors: ["#FFD700", "#FF8C00"],
    deity: "Surya / Indra",
    deityHi: "सूर्य / इंद्र",
    element: "Air",
    elementHi: "वायु",
    tips: [
      "Best direction for puja room — face east while praying",
      "Avoid clutter and dark corners",
      "Use yellow and saffron colors for positive energy",
    ],
    tipsHi: [
      "पूजा कक्ष के लिए सर्वोत्तम दिशा — पूजा करते समय पूर्व की ओर मुख करें",
      "अव्यवस्था और अंधेरे कोनों से बचें",
      "सकारात्मक ऊर्जा के लिए पीले और केसरी रंग का उपयोग करें",
    ],
  },
  {
    direction: "South",
    directionHi: "दक्षिण",
    roomType: "Bedroom",
    roomTypeHi: "शयन कक्ष",
    score: 88,
    colors: ["#DC143C", "#FF6347", "#FFA07A"],
    deity: "Yama (Lord of Dharma)",
    deityHi: "यम (धर्म के देवता)",
    element: "Fire",
    elementHi: "अग्नि",
    tips: [
      "South bedroom brings good rest and prosperity",
      "Head pointing south is considered auspicious",
      "Use warm earth tones — avoid black or dark colors",
    ],
    tipsHi: [
      "दक्षिण में शयन कक्ष अच्छी नींद और समृद्धि लाता है",
      "सिर दक्षिण की ओर रखना शुभ माना जाता है",
      "गर्म मिट्टी के रंग उपयोग करें — काले या गहरे रंग से बचें",
    ],
  },
  {
    direction: "West",
    directionHi: "पश्चिम",
    roomType: "Dining Room",
    roomTypeHi: "भोजन कक्ष",
    score: 82,
    colors: ["#9370DB", "#C8A2C8", "#E6E6FA"],
    deity: "Varuna (God of Water)",
    deityHi: "वरुण (जल देवता)",
    element: "Space",
    elementHi: "आकाश",
    tips: [
      "West dining room supports family bonding",
      "Avoid mirrors directly facing the dining table",
      "White or silver tones enhance the Varuna energy",
    ],
    tipsHi: [
      "पश्चिम में भोजन कक्ष पारिवारिक बंधन को मजबूत करता है",
      "भोजन तालिका के सामने दर्पण लगाने से बचें",
      "सफेद या चांदी के रंग वरुण ऊर्जा को बढ़ाते हैं",
    ],
  },
  {
    direction: "Northeast",
    directionHi: "उत्तर-पूर्व",
    roomType: "Puja Room",
    roomTypeHi: "पूजा कक्ष",
    score: 98,
    colors: ["#FFD700", "#FFF8DC", "#FFFFF0"],
    deity: "Shiva / Brahma",
    deityHi: "शिव / ब्रह्मा",
    element: "Water",
    elementHi: "जल",
    tips: [
      "Eshaan (NE) corner is the most sacred zone",
      "Ideal for puja room, meditation, or water feature",
      "Keep it absolutely clean and free from toilets",
    ],
    tipsHi: [
      "ईशान (उत्तर-पूर्व) कोना सबसे पवित्र क्षेत्र है",
      "पूजा कक्ष, ध्यान या जल स्रोत के लिए आदर्श",
      "इसे बिल्कुल साफ रखें और शौचालय से मुक्त रखें",
    ],
  },
  {
    direction: "Southeast",
    directionHi: "दक्षिण-पूर्व",
    roomType: "Kitchen",
    roomTypeHi: "रसोई",
    score: 95,
    colors: ["#FF4500", "#FF6347", "#FF8C00"],
    deity: "Agni (Fire God)",
    deityHi: "अग्नि (अग्नि देवता)",
    element: "Fire",
    elementHi: "अग्नि",
    tips: [
      "Southeast kitchen aligns with Agni — ideal placement",
      "Cook facing east for maximum positive energy",
      "Keep the kitchen clean and avoid clutter on stove",
    ],
    tipsHi: [
      "दक्षिण-पूर्व रसोई अग्नि के साथ संरेखित है — आदर्श स्थान",
      "अधिकतम सकारात्मक ऊर्जा के लिए पूर्व की ओर मुंह करके पकाएं",
      "रसोई साफ रखें और चूल्हे पर अव्यवस्था से बचें",
    ],
  },
];

export const LUCKY_NUMBER_DATA: Record<
  number,
  {
    color: string;
    colorHi: string;
    day: string;
    dayHi: string;
    gem: string;
    gemHi: string;
    metal: string;
    metalHi: string;
    planet: string;
    planetHi: string;
    affirmation: string;
    affirmationHi: string;
  }
> = {
  1: {
    color: "Golden Yellow",
    colorHi: "सुनहरा पीला",
    day: "Sunday",
    dayHi: "रविवार",
    gem: "Ruby",
    gemHi: "माणिक्य",
    metal: "Gold",
    metalHi: "सोना",
    planet: "Sun",
    planetHi: "सूर्य",
    affirmation: "I lead with courage and vision.",
    affirmationHi: "मैं साहस और दृष्टि के साथ नेतृत्व करता/करती हूं।",
  },
  2: {
    color: "Cream / Silver",
    colorHi: "क्रीम / चांदी",
    day: "Monday",
    dayHi: "सोमवार",
    gem: "Pearl",
    gemHi: "मोती",
    metal: "Silver",
    metalHi: "चांदी",
    planet: "Moon",
    planetHi: "चंद्र",
    affirmation: "I trust my intuition and embrace harmony.",
    affirmationHi:
      "मैं अपनी अंतर्दृष्टि पर भरोसा करता/करती हूं और सामंजस्य अपनाता/अपनाती हूं।",
  },
  3: {
    color: "Yellow",
    colorHi: "पीला",
    day: "Thursday",
    dayHi: "बृहस्पतिवार",
    gem: "Yellow Sapphire",
    gemHi: "पुखराज",
    metal: "Gold",
    metalHi: "सोना",
    planet: "Jupiter",
    planetHi: "बृहस्पति",
    affirmation: "I expand my knowledge and share my wisdom.",
    affirmationHi: "मैं अपना ज्ञान बढ़ाता/बढ़ाती हूं और अपनी बुद्धि साझा करता/करती हूं।",
  },
  4: {
    color: "Blue / Grey",
    colorHi: "नीला / ग्रे",
    day: "Saturday",
    dayHi: "शनिवार",
    gem: "Hessonite",
    gemHi: "गोमेद",
    metal: "Iron",
    metalHi: "लोहा",
    planet: "Rahu",
    planetHi: "राहु",
    affirmation: "I build solid foundations with discipline and patience.",
    affirmationHi: "मैं अनुशासन और धैर्य से मजबूत नींव बनाता/बनाती हूं।",
  },
  5: {
    color: "Green / Parrot Green",
    colorHi: "हरा / तोते जैसा हरा",
    day: "Wednesday",
    dayHi: "बुधवार",
    gem: "Emerald",
    gemHi: "पन्ना",
    metal: "Mercury (Parad)",
    metalHi: "पारद",
    planet: "Mercury",
    planetHi: "बुध",
    affirmation: "I adapt easily and communicate with clarity.",
    affirmationHi: "मैं आसानी से अनुकूल होता/होती हूं और स्पष्टता से संवाद करता/करती हूं।",
  },
  6: {
    color: "Pink / White",
    colorHi: "गुलाबी / सफेद",
    day: "Friday",
    dayHi: "शुक्रवार",
    gem: "Diamond / Opal",
    gemHi: "हीरा / ओपल",
    metal: "Silver",
    metalHi: "चांदी",
    planet: "Venus",
    planetHi: "शुक्र",
    affirmation: "I attract love, beauty, and abundance into my life.",
    affirmationHi: "मैं अपने जीवन में प्रेम, सौंदर्य और प्रचुरता को आकर्षित करता/करती हूं।",
  },
  7: {
    color: "Violet / Purple",
    colorHi: "बैंगनी / बैंगनी",
    day: "Monday",
    dayHi: "सोमवार",
    gem: "Cat's Eye",
    gemHi: "लहसुनिया",
    metal: "Iron",
    metalHi: "लोहा",
    planet: "Ketu",
    planetHi: "केतु",
    affirmation: "I deepen my spiritual wisdom and trust the universe.",
    affirmationHi:
      "मैं अपनी आध्यात्मिक बुद्धि को गहरा करता/करती हूं और ब्रह्मांड पर भरोसा करता/करती हूं।",
  },
  8: {
    color: "Dark Blue / Black",
    colorHi: "गहरा नीला / काला",
    day: "Saturday",
    dayHi: "शनिवार",
    gem: "Blue Sapphire",
    gemHi: "नीलम",
    metal: "Iron / Lead",
    metalHi: "लोहा / सीसा",
    planet: "Saturn",
    planetHi: "शनि",
    affirmation: "I overcome obstacles with perseverance and rise higher.",
    affirmationHi: "मैं दृढ़ता से बाधाओं को पार करता/करती हूं और ऊंचा उठता/उठती हूं।",
  },
  9: {
    color: "Red / Crimson",
    colorHi: "लाल / सुर्ख",
    day: "Tuesday",
    dayHi: "मंगलवार",
    gem: "Red Coral",
    gemHi: "मूंगा",
    metal: "Copper",
    metalHi: "तांबा",
    planet: "Mars",
    planetHi: "मंगल",
    affirmation: "I act with courage and serve the greater good.",
    affirmationHi:
      "मैं साहस के साथ कार्य करता/करती हूं और अधिक भले की सेवा करता/करती हूं।",
  },
};

export const MOBILE_FEEDBACK: Record<
  number,
  {
    favorable: boolean;
    summary: string;
    summaryHi: string;
    suggestions: string[];
    suggestionsHi: string[];
  }
> = {
  1: {
    favorable: true,
    summary:
      "Number 1 sum: Leadership energy. Good for entrepreneurs and executives.",
    summaryHi: "अंक १ योग: नेतृत्व ऊर्जा। उद्यमियों और अधिकारियों के लिए अच्छा।",
    suggestions: [
      "Great for starting new ventures",
      "Supports decisive action",
    ],
    suggestionsHi: [
      "नए उद्यम शुरू करने के लिए बढ़िया",
      "निर्णायक कार्रवाई का समर्थन करता है",
    ],
  },
  2: {
    favorable: true,
    summary:
      "Number 2 sum: Harmony and cooperation. Good for partnerships and relationships.",
    summaryHi: "अंक २ योग: सामंजस्य और सहयोग। साझेदारी और रिश्तों के लिए अच्छा।",
    suggestions: [
      "Excellent for business partnerships",
      "Helps in diplomatic roles",
    ],
    suggestionsHi: [
      "व्यावसायिक साझेदारी के लिए उत्कृष्ट",
      "कूटनीतिक भूमिकाओं में मदद करता है",
    ],
  },
  3: {
    favorable: true,
    summary:
      "Number 3 sum: Creative and expressive energy. Great for artists and communicators.",
    summaryHi:
      "अंक ३ योग: रचनात्मक और अभिव्यंजक ऊर्जा। कलाकारों और संचारकों के लिए बढ़िया।",
    suggestions: [
      "Boosts creative projects",
      "Social and networking activities thrive",
    ],
    suggestionsHi: [
      "रचनात्मक परियोजनाओं को बढ़ावा देता है",
      "सामाजिक और नेटवर्किंग गतिविधियां फलती-फूलती हैं",
    ],
  },
  4: {
    favorable: false,
    summary:
      "Number 4 sum: Rahu influence. Can bring sudden disruptions — use with caution.",
    summaryHi:
      "अंक ४ योग: राहु प्रभाव। अचानक व्यवधान ला सकता है — सावधानी से उपयोग करें।",
    suggestions: [
      "Add a digit to make sum 5 or 6",
      "Prefix or suffix a single digit to the number",
    ],
    suggestionsHi: [
      "योग को ५ या ६ बनाने के लिए एक अंक जोड़ें",
      "संख्या में एकल अंक उपसर्ग या प्रत्यय जोड़ें",
    ],
  },
  5: {
    favorable: true,
    summary:
      "Number 5 sum: Mercury energy. Excellent for business and communication.",
    summaryHi: "अंक ५ योग: बुध ऊर्जा। व्यवसाय और संचार के लिए उत्कृष्ट।",
    suggestions: [
      "Best sum for most professions",
      "Ideal for salespeople and networkers",
    ],
    suggestionsHi: [
      "अधिकांश व्यवसायों के लिए सर्वोत्तम योग",
      "सेल्सपर्सन और नेटवर्कर के लिए आदर्श",
    ],
  },
  6: {
    favorable: true,
    summary:
      "Number 6 sum: Venus energy. Good for creative fields and luxury businesses.",
    summaryHi:
      "अंक ६ योग: शुक्र ऊर्जा। रचनात्मक क्षेत्रों और विलासिता व्यवसायों के लिए अच्छा।",
    suggestions: [
      "Great for artists and fashion professionals",
      "Enhances relationships and social life",
    ],
    suggestionsHi: [
      "कलाकारों और फैशन पेशेवरों के लिए बढ़िया",
      "रिश्तों और सामाजिक जीवन को बढ़ाता है",
    ],
  },
  7: {
    favorable: true,
    summary:
      "Number 7 sum: Spiritual and introspective energy. Good for researchers and healers.",
    summaryHi:
      "अंक ७ योग: आध्यात्मिक और आत्मनिरीक्षण ऊर्जा। शोधकर्ताओं और हीलर के लिए अच्छा।",
    suggestions: [
      "Excellent for spiritual and healing professions",
      "Supports research and writing",
    ],
    suggestionsHi: [
      "आध्यात्मिक और उपचार व्यवसायों के लिए उत्कृष्ट",
      "शोध और लेखन का समर्थन करता है",
    ],
  },
  8: {
    favorable: false,
    summary:
      "Number 8 sum: Saturn influence. Can create financial blocks and delays.",
    summaryHi: "अंक ८ योग: शनि प्रभाव। वित्तीय बाधाएं और देरी पैदा कर सकता है।",
    suggestions: [
      "Try changing to sum 9 or 5",
      "Consult a numerologist for best adjustment",
    ],
    suggestionsHi: [
      "योग को ९ या ५ में बदलने की कोशिश करें",
      "सर्वोत्तम समायोजन के लिए किसी अंकज्योतिषी से सलाह लें",
    ],
  },
  9: {
    favorable: true,
    summary:
      "Number 9 sum: Mars energy. Powerful for achievers and those in competitive fields.",
    summaryHi:
      "अंक ९ योग: मंगल ऊर्जा। प्राप्तकर्ताओं और प्रतिस्पर्धी क्षेत्रों में लोगों के लिए शक्तिशाली।",
    suggestions: [
      "Excellent for leaders and athletes",
      "Boosts courage and determination",
    ],
    suggestionsHi: ["नेताओं और एथलीटों के लिए उत्कृष्ट", "साहस और दृढ़ संकल्प को बढ़ाता है"],
  },
  0: {
    favorable: false,
    summary: "Please enter a valid mobile number to analyze.",
    summaryHi: "विश्लेषण के लिए कृपया एक वैध मोबाइल नंबर दर्ज करें।",
    suggestions: [],
    suggestionsHi: [],
  },
};

export const NAME_VIBRATION_MAP: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};

export const VIBRATION_CAREERS: Record<
  number,
  { careers: string[]; careersHi: string[]; color: string; colorHi: string }
> = {
  1: {
    careers: ["CEO/Director", "Military Officer", "Entrepreneur", "Politician"],
    careersHi: ["सीईओ/निदेशक", "सैन्य अधिकारी", "उद्यमी", "राजनेता"],
    color: "Gold / Orange",
    colorHi: "सोना / नारंगी",
  },
  2: {
    careers: ["Counselor", "Diplomat", "Nurse", "Artist", "Musician"],
    careersHi: ["काउंसलर", "राजनयिक", "नर्स", "कलाकार", "संगीतकार"],
    color: "Silver / White",
    colorHi: "चांदी / सफेद",
  },
  3: {
    careers: ["Writer", "Teacher", "Actor", "Journalist", "Lawyer"],
    careersHi: ["लेखक", "शिक्षक", "अभिनेता", "पत्रकार", "वकील"],
    color: "Yellow / Light Blue",
    colorHi: "पीला / हल्का नीला",
  },
  4: {
    careers: ["Engineer", "Accountant", "Scientist", "Builder", "Programmer"],
    careersHi: ["इंजीनियर", "लेखाकार", "वैज्ञानिक", "निर्माता", "प्रोग्रामर"],
    color: "Blue / Grey",
    colorHi: "नीला / ग्रे",
  },
  5: {
    careers: [
      "Sales",
      "Marketing",
      "Travel Agent",
      "Public Relations",
      "Trader",
    ],
    careersHi: ["बिक्री", "विपणन", "ट्रैवल एजेंट", "जनसंपर्क", "व्यापारी"],
    color: "Green / Turquoise",
    colorHi: "हरा / फ़िरोज़ा",
  },
  6: {
    careers: [
      "Doctor",
      "Fashion Designer",
      "Interior Decorator",
      "Chef",
      "Social Worker",
    ],
    careersHi: ["डॉक्टर", "फैशन डिज़ाइनर", "इंटीरियर डेकोरेटर", "शेफ", "समाज सेवक"],
    color: "Pink / Rose",
    colorHi: "गुलाबी / गुलाब",
  },
  7: {
    careers: [
      "Astrologer",
      "Researcher",
      "Psychologist",
      "Healer",
      "Philosopher",
    ],
    careersHi: ["ज्योतिषी", "शोधकर्ता", "मनोवैज्ञानिक", "हीलर", "दार्शनिक"],
    color: "Violet / Purple",
    colorHi: "बैंगनी / जामुनी",
  },
  8: {
    careers: [
      "Banker",
      "Real Estate",
      "Judge",
      "Corporate Executive",
      "Finance",
    ],
    careersHi: ["बैंकर", "रियल एस्टेट", "न्यायाधीश", "कॉर्पोरेट कार्यकारी", "वित्त"],
    color: "Dark Blue / Black",
    colorHi: "गहरा नीला / काला",
  },
  9: {
    careers: ["Doctor", "Surgeon", "Military", "Social Reformer", "Athlete"],
    careersHi: ["डॉक्टर", "सर्जन", "सैन्य", "समाज सुधारक", "एथलीट"],
    color: "Red / Crimson",
    colorHi: "लाल / सुर्ख",
  },
};
